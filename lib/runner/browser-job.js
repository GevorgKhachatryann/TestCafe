"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const async_event_emitter_1 = __importDefault(require("../utils/async-event-emitter"));
const test_run_controller_1 = __importDefault(require("./test-run-controller"));
const session_controller_1 = __importDefault(require("../test-run/session-controller"));
const browser_job_result_1 = __importDefault(require("./browser-job-result"));
const test_run_hook_controller_1 = __importDefault(require("./test-run-hook-controller"));
var BrowserJobStatus;
(function (BrowserJobStatus) {
    BrowserJobStatus[BrowserJobStatus["initialized"] = 0] = "initialized";
    BrowserJobStatus[BrowserJobStatus["starting"] = 1] = "starting";
    BrowserJobStatus[BrowserJobStatus["started"] = 2] = "started";
})(BrowserJobStatus || (BrowserJobStatus = {}));
class BrowserJob extends async_event_emitter_1.default {
    constructor({ tests, browserConnections, proxy, screenshots, warningLog, fixtureHookController, opts, compilerService, messageBus, }) {
        var _a;
        super();
        this._status = BrowserJobStatus.initialized;
        this._startTime = new Date();
        this._total = 0;
        this._passed = 0;
        this._opts = opts;
        this._proxy = proxy;
        this.browserConnections = browserConnections;
        this._screenshots = screenshots;
        this.warningLog = warningLog;
        this.fixtureHookController = fixtureHookController;
        this._result = null;
        this._messageBus = messageBus;
        this._testRunHook = new test_run_hook_controller_1.default(tests, (_a = opts.hooks) === null || _a === void 0 ? void 0 : _a.testRun);
        this._testRunControllerQueue = tests.map((test, index) => this._createTestRunController(test, index, compilerService));
        this._completionQueue = [];
        this._reportsPending = [];
        this._connectionErrorListener = (error) => this._setResult(browser_job_result_1.default.errored, error);
        this._resolveWaitingLastTestInFixture = null;
        this.browserConnections.map(bc => bc.once('error', this._connectionErrorListener));
    }
    _createTestRunController(test, index, compilerService) {
        const testRunController = new test_run_controller_1.default({
            test,
            index: index + 1,
            proxy: this._proxy,
            screenshots: this._screenshots,
            warningLog: this.warningLog,
            fixtureHookController: this.fixtureHookController,
            opts: this._opts,
            messageBus: this._messageBus,
            compilerService,
            testRunHook: this._testRunHook,
        });
        testRunController.on('test-run-create', async (testRunInfo) => {
            await this.emit('test-run-create', testRunInfo);
        });
        testRunController.on('test-run-ready', async () => {
            await this.emit('test-run-ready', testRunController);
        });
        testRunController.on('test-run-restart', async () => this._onTestRunRestart(testRunController));
        testRunController.on('test-run-before-done', async () => {
            await this.emit('test-run-before-done', testRunController);
        });
        testRunController.on('test-run-done', async () => this._onTestRunDone(testRunController));
        testRunController.on('test-action-done', async (args) => {
            await this.emit('test-action-done', args);
        });
        return testRunController;
    }
    async _setResult(status, data) {
        if (this._result)
            return;
        this._result = { status, data };
        this.browserConnections.forEach(bc => bc.removeListener('error', this._connectionErrorListener));
        await Promise.all(this.browserConnections.map(bc => bc.reportJobResult(this._result.status, this._result.data)));
    }
    _addToCompletionQueue(testRunInfo) {
        this._completionQueue.push(testRunInfo);
    }
    _removeFromCompletionQueue(testRunInfo) {
        (0, lodash_1.pull)(this._completionQueue, testRunInfo);
    }
    async _onTestRunRestart(testRunController) {
        this._removeFromCompletionQueue(testRunController);
        this._testRunControllerQueue.unshift(testRunController);
        await this.emit('test-run-restart', testRunController);
    }
    async _onTestRunDone(testRunController) {
        this._total++;
        if (!testRunController.testRun.errs.length)
            this._passed++;
        while (this._completionQueue.length && this._completionQueue[0].done) {
            testRunController = this._completionQueue.shift();
            await this.emit('test-run-done', testRunController.testRun);
            (0, lodash_1.pull)(this._reportsPending, testRunController);
            if (!this._reportsPending.length && this._resolveWaitingLastTestInFixture) {
                this._resolveWaitingLastTestInFixture();
                this._resolveWaitingLastTestInFixture = null;
            }
        }
        if (!this._completionQueue.length && !this.hasQueuedTestRuns) {
            if (!this._opts.live)
                session_controller_1.default.closeSession(testRunController.testRun);
            this
                ._setResult(browser_job_result_1.default.done, { total: this._total, passed: this._passed })
                .then(() => this.emit('done'));
        }
    }
    async _isNextTestRunAvailable(testRunController) {
        // NOTE: event task start is currently executing,
        // so test run is temporary blocked
        if (this._status === BrowserJobStatus.starting)
            return false;
        // NOTE: before hook for test run fixture is currently
        // executing, so test run is temporary blocked
        const isBlocked = testRunController.blocked;
        const isConcurrency = this._opts.concurrency > 1;
        const hasIncompleteTestRuns = this._completionQueue.some(controller => !controller.done);
        const needWaitLastTestInFixture = this._reportsPending.some(controller => controller.test.fixture !== testRunController.test.fixture);
        if (isBlocked || (hasIncompleteTestRuns || needWaitLastTestInFixture) && !isConcurrency) {
            const disablePageReloads = testRunController.test.disablePageReloads ||
                this._opts.disablePageReloads && testRunController.test.disablePageReloads !== false;
            if (!needWaitLastTestInFixture || !disablePageReloads)
                return false;
            // NOTE: if we have `disablePageReloads` enabled and the next test is from next
            // fixture, then we need to wait until all reporters finished to prevent
            // redirecting to the `idle` page
            await new Promise(resolve => {
                this._resolveWaitingLastTestInFixture = resolve;
            });
        }
        return true;
    }
    // API
    get hasQueuedTestRuns() {
        return !!this._testRunControllerQueue.length;
    }
    get currentTestRun() {
        return this._completionQueue.length ? this._completionQueue[0].testRun : null;
    }
    async popNextTestRunInfo(connection) {
        while (this._testRunControllerQueue.length) {
            const testRunController = this._testRunControllerQueue[0];
            const isNextTestRunAvailable = await this._isNextTestRunAvailable(testRunController);
            if (!isNextTestRunAvailable)
                break;
            this._reportsPending.push(testRunController);
            this._testRunControllerQueue.shift();
            this._addToCompletionQueue(testRunController);
            if (this._status === BrowserJobStatus.initialized) {
                this._status = BrowserJobStatus.starting;
                this._startTime = new Date();
                await this.emit('start', this._startTime);
                this._status = BrowserJobStatus.started;
            }
            const testRunUrl = await testRunController.start(connection, this._startTime);
            if (testRunUrl) {
                return {
                    testRunId: testRunController.testRun.id,
                    url: testRunUrl,
                };
            }
        }
        return null;
    }
    abort() {
        this.clearListeners();
        this._setResult(browser_job_result_1.default.aborted);
        this.browserConnections.map(bc => bc.removeJob(this));
    }
}
exports.default = BrowserJob;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci1qb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcnVubmVyL2Jyb3dzZXItam9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbUNBQXdDO0FBQ3hDLHVGQUE2RDtBQUM3RCxnRkFBc0Q7QUFDdEQsd0ZBQStEO0FBUS9ELDhFQUFvRDtBQUlwRCwwRkFBK0Q7QUFXL0QsSUFBSyxnQkFBbUQ7QUFBeEQsV0FBSyxnQkFBZ0I7SUFBRyxxRUFBVyxDQUFBO0lBQUUsK0RBQVEsQ0FBQTtJQUFFLDZEQUFPLENBQUE7QUFBQyxDQUFDLEVBQW5ELGdCQUFnQixLQUFoQixnQkFBZ0IsUUFBbUM7QUFFeEQsTUFBcUIsVUFBVyxTQUFRLDZCQUFpQjtJQW9CckQsWUFBb0IsRUFDaEIsS0FBSyxFQUNMLGtCQUFrQixFQUNsQixLQUFLLEVBQ0wsV0FBVyxFQUNYLFVBQVUsRUFDVixxQkFBcUIsRUFDckIsSUFBSSxFQUNKLGVBQWUsRUFDZixVQUFVLEdBQ0c7O1FBQ2IsS0FBSyxFQUFFLENBQUM7UUFFUixJQUFJLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztRQUM1QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFFN0IsSUFBSSxDQUFDLE1BQU0sR0FBa0IsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQWlCLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFtQixJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBa0IsS0FBSyxDQUFDO1FBQ25DLElBQUksQ0FBQyxrQkFBa0IsR0FBTSxrQkFBa0IsQ0FBQztRQUNoRCxJQUFJLENBQUMsWUFBWSxHQUFZLFdBQVcsQ0FBQztRQUN6QyxJQUFJLENBQUMsVUFBVSxHQUFjLFVBQVUsQ0FBQztRQUN4QyxJQUFJLENBQUMscUJBQXFCLEdBQUcscUJBQXFCLENBQUM7UUFDbkQsSUFBSSxD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QUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO2FBQzNDO1lBRUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU5RSxJQUFJLFVBQVUsRUFBRTtnQkFDWixPQUFPO29CQUNILFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDdkMsR0FBRyxFQUFRLFVBQVU7aUJBQ3hCLENBQUM7YUFDTDtTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLEtBQUs7UUFDUixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyw0QkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7Q0FDSjtBQXJPRCw2QkFxT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwdWxsIGFzIHJlbW92ZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgQXN5bmNFdmVudEVtaXR0ZXIgZnJvbSAnLi4vdXRpbHMvYXN5bmMtZXZlbnQtZW1pdHRlcic7XG5pbXBvcnQgVGVzdFJ1bkNvbnRyb2xsZXIgZnJvbSAnLi90ZXN0LXJ1bi1jb250cm9sbGVyJztcbmltcG9ydCBTZXNzaW9uQ29udHJvbGxlciBmcm9tICcuLi90ZXN0LXJ1bi9zZXNzaW9uLWNvbnRyb2xsZXInO1xuaW1wb3J0IEJyb3dzZXJDb25uZWN0aW9uIGZyb20gJy4uL2Jyb3dzZXIvY29ubmVjdGlvbic7XG5pbXBvcnQgeyBQcm94eSB9IGZyb20gJ3Rlc3RjYWZlLWhhbW1lcmhlYWQnO1xuaW1wb3J0IFRlc3QgZnJvbSAnLi4vYXBpL3N0cnVjdHVyZS90ZXN0JztcbmltcG9ydCBTY3JlZW5zaG90cyBmcm9tICcuLi9zY3JlZW5zaG90cyc7XG5pbXBvcnQgV2FybmluZ0xvZyBmcm9tICcuLi9ub3RpZmljYXRpb25zL3dhcm5pbmctbG9nJztcbmltcG9ydCBGaXh0dXJlSG9va0NvbnRyb2xsZXIgZnJvbSAnLi9maXh0dXJlLWhvb2stY29udHJvbGxlcic7XG5pbXBvcnQgeyBEaWN0aW9uYXJ5IH0gZnJvbSAnLi4vY29uZmlndXJhdGlvbi9pbnRlcmZhY2VzJztcbmltcG9ydCBCcm93c2VySm9iUmVzdWx0IGZyb20gJy4vYnJvd3Nlci1qb2ItcmVzdWx0JztcbmltcG9ydCBDb21waWxlclNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvY29tcGlsZXIvaG9zdCc7XG5pbXBvcnQgeyBCcm93c2VySm9iSW5pdCB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgTWVzc2FnZUJ1cyBmcm9tICcuLi91dGlscy9tZXNzYWdlLWJ1cyc7XG5pbXBvcnQgVGVzdFJ1bkhvb2tDb250cm9sbGVyIGZyb20gJy4vdGVzdC1ydW4taG9vay1jb250cm9sbGVyJztcbmltcG9ydCBUZXN0UnVuIGZyb20gJy4uL3Rlc3QtcnVuJztcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCB7IFRlc3RSdW4gYXMgTGVnYWN5VGVzdFJ1biB9IGZyb20gJ3Rlc3RjYWZlLWxlZ2FjeS1hcGknO1xuaW1wb3J0IHsgTmV4dFRlc3RSdW5JbmZvIH0gZnJvbSAnLi4vc2hhcmVkL3R5cGVzJztcblxuaW50ZXJmYWNlIEJyb3dzZXJKb2JSZXN1bHRJbmZvIHtcbiAgICBzdGF0dXM6IEJyb3dzZXJKb2JSZXN1bHQ7XG4gICAgZGF0YT86IGFueTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG59XG5cbmVudW0gQnJvd3NlckpvYlN0YXR1cyB7IGluaXRpYWxpemVkLCBzdGFydGluZywgc3RhcnRlZCB9XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJyb3dzZXJKb2IgZXh0ZW5kcyBBc3luY0V2ZW50RW1pdHRlciB7XG4gICAgcHJpdmF0ZSBfc3RhdHVzOiBCcm93c2VySm9iU3RhdHVzO1xuICAgIHByaXZhdGUgX3N0YXJ0VGltZTogRGF0ZTtcbiAgICBwcml2YXRlIF90b3RhbDogbnVtYmVyO1xuICAgIHByaXZhdGUgX3Bhc3NlZDogbnVtYmVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX29wdHM6IERpY3Rpb25hcnk8T3B0aW9uVmFsdWU+O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Byb3h5OiBQcm94eTtcbiAgICBwdWJsaWMgcmVhZG9ubHkgYnJvd3NlckNvbm5lY3Rpb25zOiBCcm93c2VyQ29ubmVjdGlvbltdO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX3NjcmVlbnNob3RzOiBTY3JlZW5zaG90cztcbiAgICBwdWJsaWMgcmVhZG9ubHkgd2FybmluZ0xvZzogV2FybmluZ0xvZztcbiAgICBwdWJsaWMgcmVhZG9ubHkgZml4dHVyZUhvb2tDb250cm9sbGVyOiBGaXh0dXJlSG9va0NvbnRyb2xsZXI7XG4gICAgcHJpdmF0ZSBfcmVzdWx0OiBCcm93c2VySm9iUmVzdWx0SW5mbyB8IG51bGw7XG4gICAgcHJpdmF0ZSByZWFkb25seSBfdGVzdFJ1bkNvbnRyb2xsZXJRdWV1ZTogVGVzdFJ1bkNvbnRyb2xsZXJbXTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9yZXBvcnRzUGVuZGluZzogVGVzdFJ1bkNvbnRyb2xsZXJbXTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb25uZWN0aW9uRXJyb3JMaXN0ZW5lcjogKGVycm9yOiBFcnJvcikgPT4gdm9pZDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb21wbGV0aW9uUXVldWU6IFRlc3RSdW5Db250cm9sbGVyW107XG4gICAgcHJpdmF0ZSBfcmVzb2x2ZVdhaXRpbmdMYXN0VGVzdEluRml4dHVyZTogRnVuY3Rpb24gfCBudWxsO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX21lc3NhZ2VCdXM6IE1lc3NhZ2VCdXM7XG4gICAgcHJpdmF0ZSByZWFkb25seSBfdGVzdFJ1bkhvb2s6IFRlc3RSdW5Ib29rQ29udHJvbGxlcjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoe1xuICAgICAgICB0ZXN0cyxcbiAgICAgICAgYnJvd3NlckNvbm5lY3Rpb25zLFxuICAgICAgICBwcm94eSxcbiAgICAgICAgc2NyZWVuc2hvdHMsXG4gICAgICAgIHdhcm5pbmdMb2csXG4gICAgICAgIGZpeHR1cmVIb29rQ29udHJvbGxlcixcbiAgICAgICAgb3B0cyxcbiAgICAgICAgY29tcGlsZXJTZXJ2aWNlLFxuICAgICAgICBtZXNzYWdlQnVzLFxuICAgIH06IEJyb3dzZXJKb2JJbml0KSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fc3RhdHVzID0gQnJvd3NlckpvYlN0YXR1cy5pbml0aWFsaXplZDtcbiAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcblxuICAgICAgICB0aGlzLl90b3RhbCAgICAgICAgICAgICAgICA9IDA7XG4gICAgICAgIHRoaXMuX3Bhc3NlZCAgICAgICAgICAgICAgID0gMDtcbiAgICAgICAgdGhpcy5fb3B0cyAgICAgICAgICAgICAgICAgPSBvcHRzO1xuICAgICAgICB0aGlzLl9wcm94eSAgICAgICAgICAgICAgICA9IHByb3h5O1xuICAgICAgICB0aGlzLmJyb3dzZXJDb25uZWN0aW9ucyAgICA9IGJyb3dzZXJDb25uZWN0aW9ucztcbiAgICAgICAgdGhpcy5fc2NyZWVuc2hvdHMgICAgICAgICAgPSBzY3JlZW5zaG90cztcbiAgICAgICAgdGhpcy53YXJuaW5nTG9nICAgICAgICAgICAgPSB3YXJuaW5nTG9nO1xuICAgICAgICB0aGlzLmZpeHR1cmVIb29rQ29udHJvbGxlciA9IGZpeHR1cmVIb29rQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5fcmVzdWx0ICAgICAgICAgICAgICAgPSBudWxsO1xuICAgICAgICB0aGlzLl9tZXNzYWdlQnVzICAgICAgICAgICA9IG1lc3NhZ2VCdXM7XG4gICAgICAgIHRoaXMuX3Rlc3RSdW5Ib29rICAgICAgICAgID0gbmV3IFRlc3RSdW5Ib29rQ29udHJvbGxlcih0ZXN0cywgKG9wdHMuaG9va3MgYXMgR2xvYmFsSG9va3MpPy50ZXN0UnVuKTtcblxuICAgICAgICB0aGlzLl90ZXN0UnVuQ29udHJvbGxlclF1ZXVlID0gdGVzdHMubWFwKCh0ZXN0LCBpbmRleCkgPT4gdGhpcy5fY3JlYXRlVGVzdFJ1bkNvbnRyb2xsZXIodGVzdCwgaW5kZXgsIGNvbXBpbGVyU2VydmljZSkpO1xuXG4gICAgICAgIHRoaXMuX2NvbXBsZXRpb25RdWV1ZSA9IFtdO1xuICAgICAgICB0aGlzLl9yZXBvcnRzUGVuZGluZyAgPSBbXTtcblxuICAgICAgICB0aGlzLl9jb25uZWN0aW9uRXJyb3JMaXN0ZW5lciA9IChlcnJvcjogRXJyb3IpID0+IHRoaXMuX3NldFJlc3VsdChCcm93c2VySm9iUmVzdWx0LmVycm9yZWQsIGVycm9yKTtcblxuICAgICAgICB0aGlzLl9yZXNvbHZlV2FpdGluZ0xhc3RUZXN0SW5GaXh0dXJlID0gbnVsbDtcblxuICAgICAgICB0aGlzLmJyb3dzZXJDb25uZWN0aW9ucy5tYXAoYmMgPT4gYmMub25jZSgnZXJyb3InLCB0aGlzLl9jb25uZWN0aW9uRXJyb3JMaXN0ZW5lcikpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZVRlc3RSdW5Db250cm9sbGVyICh0ZXN0OiBUZXN0LCBpbmRleDogbnVtYmVyLCBjb21waWxlclNlcnZpY2U/OiBDb21waWxlclNlcnZpY2UpOiBUZXN0UnVuQ29udHJvbGxlciB7XG4gICAgICAgIGNvbnN0IHRlc3RSdW5Db250cm9sbGVyID0gbmV3IFRlc3RSdW5Db250cm9sbGVyKHtcbiAgICAgICAgICAgIHRlc3QsXG4gICAgICAgICAgICBpbmRleDogICAgICAgICAgICAgICAgIGluZGV4ICsgMSxcbiAgICAgICAgICAgIHByb3h5OiAgICAgICAgICAgICAgICAgdGhpcy5fcHJveHksXG4gICAgICAgICAgICBzY3JlZW5zaG90czogICAgICAgICAgIHRoaXMuX3NjcmVlbnNob3RzLFxuICAgICAgICAgICAgd2FybmluZ0xvZzogICAgICAgICAgICB0aGlzLndhcm5pbmdMb2csXG4gICAgICAgICAgICBmaXh0dXJlSG9va0NvbnRyb2xsZXI6IHRoaXMuZml4dHVyZUhvb2tDb250cm9sbGVyLFxuICAgICAgICAgICAgb3B0czogICAgICAgICAgICAgICAgICB0aGlzLl9vcHRzLFxuICAgICAgICAgICAgbWVzc2FnZUJ1czogICAgICAgICAgICB0aGlzLl9tZXNzYWdlQnVzLFxuICAgICAgICAgICAgY29tcGlsZXJTZXJ2aWNlLFxuICAgICAgICAgICAgdGVzdFJ1bkhvb2s6ICAgICAgICAgICB0aGlzLl90ZXN0UnVuSG9vayxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGVzdFJ1bkNvbnRyb2xsZXIub24oJ3Rlc3QtcnVuLWNyZWF0ZScsIGFzeW5jIHRlc3RSdW5JbmZvID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZW1pdCgndGVzdC1ydW4tY3JlYXRlJywgdGVzdFJ1bkluZm8pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGVzdFJ1bkNvbnRyb2xsZXIub24oJ3Rlc3QtcnVuLXJlYWR5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5lbWl0KCd0ZXN0LXJ1bi1yZWFkeScsIHRlc3RSdW5Db250cm9sbGVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRlc3RSdW5Db250cm9sbGVyLm9uKCd0ZXN0LXJ1bi1yZXN0YXJ0JywgYXN5bmMgKCkgPT4gdGhpcy5fb25UZXN0UnVuUmVzdGFydCh0ZXN0UnVuQ29udHJvbGxlcikpO1xuICAgICAgICB0ZXN0UnVuQ29udHJvbGxlci5vbigndGVzdC1ydW4tYmVmb3JlLWRvbmUnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmVtaXQoJ3Rlc3QtcnVuLWJlZm9yZS1kb25lJywgdGVzdFJ1bkNvbnRyb2xsZXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGVzdFJ1bkNvbnRyb2xsZXIub24oJ3Rlc3QtcnVuLWRvbmUnLCBhc3luYyAoKSA9PiB0aGlzLl9vblRlc3RSdW5Eb25lKHRlc3RSdW5Db250cm9sbGVyKSk7XG5cbiAgICAgICAgdGVzdFJ1bkNvbnRyb2xsZXIub24oJ3Rlc3QtYWN0aW9uLWRvbmUnLCBhc3luYyBhcmdzID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZW1pdCgndGVzdC1hY3Rpb24tZG9uZScsIGFyZ3MpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGVzdFJ1bkNvbnRyb2xsZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfc2V0UmVzdWx0IChzdGF0dXM6IEJyb3dzZXJKb2JSZXN1bHQsIGRhdGE/OiBhbnkpOiBQcm9taXNlPHZvaWQ+IHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGlmICh0aGlzLl9yZXN1bHQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fcmVzdWx0ID0geyBzdGF0dXMsIGRhdGEgfTtcblxuICAgICAgICB0aGlzLmJyb3dzZXJDb25uZWN0aW9ucy5mb3JFYWNoKGJjID0+IGJjLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIHRoaXMuX2Nvbm5lY3Rpb25FcnJvckxpc3RlbmVyKSk7XG5cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5icm93c2VyQ29ubmVjdGlvbnMubWFwKGJjID0+IGJjLnJlcG9ydEpvYlJlc3VsdCgodGhpcy5fcmVzdWx0IGFzIEJyb3dzZXJKb2JSZXN1bHRJbmZvKS5zdGF0dXMsICh0aGlzLl9yZXN1bHQgYXMgQnJvd3NlckpvYlJlc3VsdEluZm8pLmRhdGEpKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYWRkVG9Db21wbGV0aW9uUXVldWUgKHRlc3RSdW5JbmZvOiBUZXN0UnVuQ29udHJvbGxlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9jb21wbGV0aW9uUXVldWUucHVzaCh0ZXN0UnVuSW5mbyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVtb3ZlRnJvbUNvbXBsZXRpb25RdWV1ZSAodGVzdFJ1bkluZm86IFRlc3RSdW5Db250cm9sbGVyKTogdm9pZCB7XG4gICAgICAgIHJlbW92ZSh0aGlzLl9jb21wbGV0aW9uUXVldWUsIHRlc3RSdW5JbmZvKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIF9vblRlc3RSdW5SZXN0YXJ0ICh0ZXN0UnVuQ29udHJvbGxlcjogVGVzdFJ1bkNvbnRyb2xsZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbUNvbXBsZXRpb25RdWV1ZSh0ZXN0UnVuQ29udHJvbGxlcik7XG4gICAgICAgIHRoaXMuX3Rlc3RSdW5Db250cm9sbGVyUXVldWUudW5zaGlmdCh0ZXN0UnVuQ29udHJvbGxlcik7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5lbWl0KCd0ZXN0LXJ1bi1yZXN0YXJ0JywgdGVzdFJ1bkNvbnRyb2xsZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgX29uVGVzdFJ1bkRvbmUgKHRlc3RSdW5Db250cm9sbGVyOiBUZXN0UnVuQ29udHJvbGxlcik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLl90b3RhbCsrO1xuXG4gICAgICAgIGlmICghdGVzdFJ1bkNvbnRyb2xsZXIudGVzdFJ1bi5lcnJzLmxlbmd0aClcbiAgICAgICAgICAgIHRoaXMuX3Bhc3NlZCsrO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLl9jb21wbGV0aW9uUXVldWUubGVuZ3RoICYmIHRoaXMuX2NvbXBsZXRpb25RdWV1ZVswXS5kb25lKSB7XG4gICAgICAgICAgICB0ZXN0UnVuQ29udHJvbGxlciA9IHRoaXMuX2NvbXBsZXRpb25RdWV1ZS5zaGlmdCgpIGFzIFRlc3RSdW5Db250cm9sbGVyO1xuXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmVtaXQoJ3Rlc3QtcnVuLWRvbmUnLCB0ZXN0UnVuQ29udHJvbGxlci50ZXN0UnVuKTtcblxuICAgICAgICAgICAgcmVtb3ZlKHRoaXMuX3JlcG9ydHNQZW5kaW5nLCB0ZXN0UnVuQ29udHJvbGxlcik7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5fcmVwb3J0c1BlbmRpbmcubGVuZ3RoICYmIHRoaXMuX3Jlc29sdmVXYWl0aW5nTGFzdFRlc3RJbkZpeHR1cmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNvbHZlV2FpdGluZ0xhc3RUZXN0SW5GaXh0dXJlKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNvbHZlV2FpdGluZ0xhc3RUZXN0SW5GaXh0dXJlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fY29tcGxldGlvblF1ZXVlLmxlbmd0aCAmJiAhdGhpcy5oYXNRdWV1ZWRUZXN0UnVucykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9vcHRzLmxpdmUpXG4gICAgICAgICAgICAgICAgU2Vzc2lvbkNvbnRyb2xsZXIuY2xvc2VTZXNzaW9uKHRlc3RSdW5Db250cm9sbGVyLnRlc3RSdW4pO1xuXG4gICAgICAgICAgICB0aGlzXG4gICAgICAgICAgICAgICAgLl9zZXRSZXN1bHQoQnJvd3NlckpvYlJlc3VsdC5kb25lLCB7IHRvdGFsOiB0aGlzLl90b3RhbCwgcGFzc2VkOiB0aGlzLl9wYXNzZWQgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmVtaXQoJ2RvbmUnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIF9pc05leHRUZXN0UnVuQXZhaWxhYmxlICh0ZXN0UnVuQ29udHJvbGxlcjogVGVzdFJ1bkNvbnRyb2xsZXIpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgLy8gTk9URTogZXZlbnQgdGFzayBzdGFydCBpcyBjdXJyZW50bHkgZXhlY3V0aW5nLFxuICAgICAgICAvLyBzbyB0ZXN0IHJ1biBpcyB0ZW1wb3JhcnkgYmxvY2tlZFxuICAgICAgICBpZiAodGhpcy5fc3RhdHVzID09PSBCcm93c2VySm9iU3RhdHVzLnN0YXJ0aW5nKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIC8vIE5PVEU6IGJlZm9yZSBob29rIGZvciB0ZXN0IHJ1biBmaXh0dXJlIGlzIGN1cnJlbnRseVxuICAgICAgICAvLyBleGVjdXRpbmcsIHNvIHRlc3QgcnVuIGlzIHRlbXBvcmFyeSBibG9ja2VkXG4gICAgICAgIGNvbnN0IGlzQmxvY2tlZCAgICAgICAgICAgICAgICAgPSB0ZXN0UnVuQ29udHJvbGxlci5ibG9ja2VkO1xuICAgICAgICBjb25zdCBpc0NvbmN1cnJlbmN5ICAgICAgICAgICAgID0gdGhpcy5fb3B0cy5jb25jdXJyZW5jeSBhcyBudW1iZXIgPiAxO1xuICAgICAgICBjb25zdCBoYXNJbmNvbXBsZXRlVGVzdFJ1bnMgICAgID0gdGhpcy5fY29tcGxldGlvblF1ZXVlLnNvbWUoY29udHJvbGxlciA9PiAhY29udHJvbGxlci5kb25lKTtcbiAgICAgICAgY29uc3QgbmVlZFdhaXRMYXN0VGVzdEluRml4dHVyZSA9IHRoaXMuX3JlcG9ydHNQZW5kaW5nLnNvbWUoY29udHJvbGxlciA9PiBjb250cm9sbGVyLnRlc3QuZml4dHVyZSAhPT0gdGVzdFJ1bkNvbnRyb2xsZXIudGVzdC5maXh0dXJlKTtcblxuICAgICAgICBpZiAoaXNCbG9ja2VkIHx8IChoYXNJbmNvbXBsZXRlVGVzdFJ1bnMgfHwgbmVlZFdhaXRMYXN0VGVzdEluRml4dHVyZSkgJiYgIWlzQ29uY3VycmVuY3kpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpc2FibGVQYWdlUmVsb2FkcyA9IHRlc3RSdW5Db250cm9sbGVyLnRlc3QuZGlzYWJsZVBhZ2VSZWxvYWRzIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0cy5kaXNhYmxlUGFnZVJlbG9hZHMgJiYgdGVzdFJ1bkNvbnRyb2xsZXIudGVzdC5kaXNhYmxlUGFnZVJlbG9hZHMgIT09IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoIW5lZWRXYWl0TGFzdFRlc3RJbkZpeHR1cmUgfHwgIWRpc2FibGVQYWdlUmVsb2FkcylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIE5PVEU6IGlmIHdlIGhhdmUgYGRpc2FibGVQYWdlUmVsb2Fkc2AgZW5hYmxlZCBhbmQgdGhlIG5leHQgdGVzdCBpcyBmcm9tIG5leHRcbiAgICAgICAgICAgIC8vIGZpeHR1cmUsIHRoZW4gd2UgbmVlZCB0byB3YWl0IHVudGlsIGFsbCByZXBvcnRlcnMgZmluaXNoZWQgdG8gcHJldmVudFxuICAgICAgICAgICAgLy8gcmVkaXJlY3RpbmcgdG8gdGhlIGBpZGxlYCBwYWdlXG4gICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNvbHZlV2FpdGluZ0xhc3RUZXN0SW5GaXh0dXJlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gQVBJXG4gICAgcHVibGljIGdldCBoYXNRdWV1ZWRUZXN0UnVucyAoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX3Rlc3RSdW5Db250cm9sbGVyUXVldWUubGVuZ3RoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY3VycmVudFRlc3RSdW4gKCk6IExlZ2FjeVRlc3RSdW4gfCBUZXN0UnVuIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wbGV0aW9uUXVldWUubGVuZ3RoID8gdGhpcy5fY29tcGxldGlvblF1ZXVlWzBdLnRlc3RSdW4gOiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBwb3BOZXh0VGVzdFJ1bkluZm8gKGNvbm5lY3Rpb246IEJyb3dzZXJDb25uZWN0aW9uKTogUHJvbWlzZTxOZXh0VGVzdFJ1bkluZm8gfCBudWxsPiB7XG4gICAgICAgIHdoaWxlICh0aGlzLl90ZXN0UnVuQ29udHJvbGxlclF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgdGVzdFJ1bkNvbnRyb2xsZXIgPSB0aGlzLl90ZXN0UnVuQ29udHJvbGxlclF1ZXVlWzBdO1xuXG4gICAgICAgICAgICBjb25zdCBpc05leHRUZXN0UnVuQXZhaWxhYmxlID0gYXdhaXQgdGhpcy5faXNOZXh0VGVzdFJ1bkF2YWlsYWJsZSh0ZXN0UnVuQ29udHJvbGxlcik7XG5cbiAgICAgICAgICAgIGlmICghaXNOZXh0VGVzdFJ1bkF2YWlsYWJsZSlcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgdGhpcy5fcmVwb3J0c1BlbmRpbmcucHVzaCh0ZXN0UnVuQ29udHJvbGxlcik7XG4gICAgICAgICAgICB0aGlzLl90ZXN0UnVuQ29udHJvbGxlclF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICB0aGlzLl9hZGRUb0NvbXBsZXRpb25RdWV1ZSh0ZXN0UnVuQ29udHJvbGxlcik7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9zdGF0dXMgPT09IEJyb3dzZXJKb2JTdGF0dXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0dXMgPSBCcm93c2VySm9iU3RhdHVzLnN0YXJ0aW5nO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0VGltZSAgID0gbmV3IERhdGUoKTtcblxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZW1pdCgnc3RhcnQnLCB0aGlzLl9zdGFydFRpbWUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdHVzID0gQnJvd3NlckpvYlN0YXR1cy5zdGFydGVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB0ZXN0UnVuVXJsID0gYXdhaXQgdGVzdFJ1bkNvbnRyb2xsZXIuc3RhcnQoY29ubmVjdGlvbiwgdGhpcy5fc3RhcnRUaW1lKTtcblxuICAgICAgICAgICAgaWYgKHRlc3RSdW5VcmwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0ZXN0UnVuSWQ6IHRlc3RSdW5Db250cm9sbGVyLnRlc3RSdW4uaWQsXG4gICAgICAgICAgICAgICAgICAgIHVybDogICAgICAgdGVzdFJ1blVybCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGFib3J0ICgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbGVhckxpc3RlbmVycygpO1xuICAgICAgICB0aGlzLl9zZXRSZXN1bHQoQnJvd3NlckpvYlJlc3VsdC5hYm9ydGVkKTtcbiAgICAgICAgdGhpcy5icm93c2VyQ29ubmVjdGlvbnMubWFwKGJjID0+IGJjLnJlbW92ZUpvYih0aGlzKSk7XG4gICAgfVxufVxuIl19