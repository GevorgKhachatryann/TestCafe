"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const test_run_controller_1 = __importDefault(require("./test-run-controller"));
const controller_1 = __importDefault(require("./controller"));
const runner_1 = __importDefault(require("../runner"));
const bootstrapper_1 = __importDefault(require("./bootstrapper"));
const parse_file_list_1 = __importDefault(require("../utils/parse-file-list"));
const runtime_1 = require("../errors/runtime");
const types_1 = require("../errors/types");
class LiveModeRunner extends runner_1.default {
    constructor({ proxy, browserConnectionGateway, configuration, compilerService }) {
        super({ proxy, browserConnectionGateway, configuration, compilerService });
        this.stopping = false;
        this.runnerTaskPromise = null;
        this.stopInfiniteWaiting = lodash_1.noop;
        this.rejectInfiniteWaiting = lodash_1.noop;
        this.assets = null;
        this.testRunController = new test_run_controller_1.default();
        this.controller = this._createController();
        this.embeddingOptions({
            TestRunCtor: this.testRunController.TestRunCtor,
            assets: [],
        });
        this.controller = this._createController();
        this.configurationCache = null;
    }
    runTests(isFirstRun = false) {
        let runError = null;
        return this._finishPreviousTestRuns()
            .then(() => {
            return this._validateRunnableConfiguration(isFirstRun);
        })
            .then(() => {
            const expectedTestCount = this.configurationCache.tests.length;
            this.testRunController.setExpectedTestCount(expectedTestCount);
        })
            .then(() => {
            this.runnerTaskPromise = super.run(this.opts);
            return this.runnerTaskPromise;
        })
            .catch(err => {
            this.setBootstrappingError(null);
            runError = err;
        })
            .then(() => {
            this.runnerTaskPromise = null;
            this.controller.onTestRunDone(runError);
        });
    }
    _validateRunOptions() {
        return super._validateRunOptions()
            .catch(err => {
            this.rejectInfiniteWaiting(err);
        });
    }
    _createRunnableConfiguration() {
        if (this.configurationCache)
            return Promise.resolve(this.configurationCache);
        return super._createRunnableConfiguration()
            .then(configuration => {
            this.configurationCache = configuration;
            return configuration;
        })
            .catch(err => {
            this.rejectInfiniteWaiting(err);
        });
    }
    setBootstrappingError(err) {
        this.bootstrappingError = err;
    }
    run(options) {
        this.configurationCache = null;
        if (this._running)
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.cannotRunLiveModeRunnerMultipleTimes);
        this._running = this._waitUntilExit()
            .then(() => {
            return this._dispose();
        })
            .then(() => {
            delete this._running;
        });
        this.opts = Object.assign({}, this.opts, options);
        this._setConfigurationOptions()
            .then(() => this._setBootstrapperOptions())
            .then(() => (0, parse_file_list_1.default)(this.bootstrapper.sources, process.cwd()))
            .then(files => {
            return this.controller.init(files);
        })
            .then(() => this._createRunnableConfiguration())
            .then(() => this.runTests(true));
        return this._running;
    }
    suspend() {
        if (!this.runnerTaskPromise)
            return Promise.resolve();
        this.stopping = true;
        this.testRunController.stop();
        this.runnerTaskPromise.cancel();
        return this.testRunController.allTestsCompletePromise
            .then(() => {
            this.stopping = false;
            this.controller.onTestRunDone();
        });
    }
    stop() {
        return super.stop()
            .then(() => {
            return this.controller.exit();
        });
    }
    exit() {
        if (this.runnerTaskPromise)
            this.runnerTaskPromise.cancel();
        return Promise.resolve()
            .then(() => this.stopInfiniteWaiting())
            .then(() => this._running);
    }
    async _finishPreviousTestRuns() {
        var _a;
        if (!((_a = this.configurationCache) === null || _a === void 0 ? void 0 : _a.tests))
            return;
        this.testRunController.run();
    }
    _validateRunnableConfiguration(isFirstRun) {
        if (isFirstRun) {
            if (this.bootstrappingError)
                return Promise.reject(this.bootstrappingError);
            else if (!this.configurationCache) {
                // NOTE: Such errors handled in process.on('unhandledRejection') handler.
                return Promise.reject(null);
            }
            return Promise.resolve();
        }
        return this.bootstrapper._getTests()
            .then(tests => {
            this.configurationCache.tests = tests;
            return this.bootstrappingError ? Promise.reject(this.bootstrappingError) : Promise.resolve();
        });
    }
    _createTask(tests, browserConnectionGroups, proxy, opts) {
        opts.live = true;
        return super._createTask(tests, browserConnectionGroups, proxy, opts, this.warningLog);
    }
    _createBootstrapper(browserConnectionGateway, compilerService, messageBus) {
        return new bootstrapper_1.default(this, browserConnectionGateway, compilerService, messageBus);
    }
    _createController() {
        return new controller_1.default(this);
    }
    _waitUntilExit() {
        return new Promise((resolve, reject) => {
            this.stopInfiniteWaiting = resolve;
            this.rejectInfiniteWaiting = reject;
        });
    }
    _disposeAssets(browserSet, reporters, testedApp) {
        this.assets = { browserSet, reporters, testedApp };
        return Promise.resolve();
    }
    _dispose() {
        this.controller.dispose();
        if (!this.assets)
            return Promise.resolve();
        const { browserSet, reporters, testedApp } = this.assets;
        return super._disposeAssets(browserSet, reporters, testedApp);
    }
}
exports.default = LiveModeRunner;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1ydW5uZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGl2ZS90ZXN0LXJ1bm5lci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG1DQUE4QjtBQUM5QixnRkFBOEQ7QUFDOUQsOERBQThDO0FBQzlDLHVEQUErQjtBQUMvQixrRUFBa0Q7QUFDbEQsK0VBQXFEO0FBQ3JELCtDQUFpRDtBQUNqRCwyQ0FBaUQ7QUFFakQsTUFBTSxjQUFlLFNBQVEsZ0JBQU07SUFDL0IsWUFBYSxFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFO1FBQzVFLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztRQUUzRSxJQUFJLENBQUMsUUFBUSxHQUFnQixLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLGlCQUFpQixHQUFPLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsbUJBQW1CLEdBQUssYUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxhQUFJLENBQUM7UUFFbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksNkJBQXlCLEVBQUUsQ0FBQztRQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFVLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBR2xELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztZQUNsQixXQUFXLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVc7WUFDL0MsTUFBTSxFQUFPLEVBQUU7U0FDbEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBVyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFRCxRQUFRLENBQUUs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QUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXpELE9BQU8sS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Q0FDSjtBQUVELGtCQUFlLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG5vb3AgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IExpdmVNb2RlVGVzdFJ1bkNvbnRyb2xsZXIgZnJvbSAnLi90ZXN0LXJ1bi1jb250cm9sbGVyJztcbmltcG9ydCBMaXZlTW9kZUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyJztcbmltcG9ydCBSdW5uZXIgZnJvbSAnLi4vcnVubmVyJztcbmltcG9ydCBMaXZlTW9kZUJvb3RzdHJhcHBlciBmcm9tICcuL2Jvb3RzdHJhcHBlcic7XG5pbXBvcnQgcGFyc2VGaWxlTGlzdCBmcm9tICcuLi91dGlscy9wYXJzZS1maWxlLWxpc3QnO1xuaW1wb3J0IHsgR2VuZXJhbEVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL3J1bnRpbWUnO1xuaW1wb3J0IHsgUlVOVElNRV9FUlJPUlMgfSBmcm9tICcuLi9lcnJvcnMvdHlwZXMnO1xuXG5jbGFzcyBMaXZlTW9kZVJ1bm5lciBleHRlbmRzIFJ1bm5lciB7XG4gICAgY29uc3RydWN0b3IgKHsgcHJveHksIGJyb3dzZXJDb25uZWN0aW9uR2F0ZXdheSwgY29uZmlndXJhdGlvbiwgY29tcGlsZXJTZXJ2aWNlIH0pIHtcbiAgICAgICAgc3VwZXIoeyBwcm94eSwgYnJvd3NlckNvbm5lY3Rpb25HYXRld2F5LCBjb25maWd1cmF0aW9uLCBjb21waWxlclNlcnZpY2UgfSk7XG5cbiAgICAgICAgdGhpcy5zdG9wcGluZyAgICAgICAgICAgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ydW5uZXJUYXNrUHJvbWlzZSAgICAgPSBudWxsO1xuICAgICAgICB0aGlzLnN0b3BJbmZpbml0ZVdhaXRpbmcgICA9IG5vb3A7XG4gICAgICAgIHRoaXMucmVqZWN0SW5maW5pdGVXYWl0aW5nID0gbm9vcDtcblxuICAgICAgICB0aGlzLmFzc2V0cyA9IG51bGw7XG5cbiAgICAgICAgdGhpcy50ZXN0UnVuQ29udHJvbGxlciA9IG5ldyBMaXZlTW9kZVRlc3RSdW5Db250cm9sbGVyKCk7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciAgICAgICAgPSB0aGlzLl9jcmVhdGVDb250cm9sbGVyKCk7XG5cblxuICAgICAgICB0aGlzLmVtYmVkZGluZ09wdGlvbnMoe1xuICAgICAgICAgICAgVGVzdFJ1bkN0b3I6IHRoaXMudGVzdFJ1bkNvbnRyb2xsZXIuVGVzdFJ1bkN0b3IsXG4gICAgICAgICAgICBhc3NldHM6ICAgICAgW10sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgICAgICAgICA9IHRoaXMuX2NyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uQ2FjaGUgPSBudWxsO1xuICAgIH1cblxuICAgIHJ1blRlc3RzIChpc0ZpcnN0UnVuID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IHJ1bkVycm9yID0gbnVsbDtcblxuICAgICAgICByZXR1cm4gdGhpcy5fZmluaXNoUHJldmlvdXNUZXN0UnVucygpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlUnVubmFibGVDb25maWd1cmF0aW9uKGlzRmlyc3RSdW4pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBleHBlY3RlZFRlc3RDb3VudCA9IHRoaXMuY29uZmlndXJhdGlvbkNhY2hlLnRlc3RzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIHRoaXMudGVzdFJ1bkNvbnRyb2xsZXIuc2V0RXhwZWN0ZWRUZXN0Q291bnQoZXhwZWN0ZWRUZXN0Q291bnQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bm5lclRhc2tQcm9taXNlID0gc3VwZXIucnVuKHRoaXMub3B0cyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ydW5uZXJUYXNrUHJvbWlzZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJvb3RzdHJhcHBpbmdFcnJvcihudWxsKTtcblxuICAgICAgICAgICAgICAgIHJ1bkVycm9yID0gZXJyO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bm5lclRhc2tQcm9taXNlID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbGxlci5vblRlc3RSdW5Eb25lKHJ1bkVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIF92YWxpZGF0ZVJ1bk9wdGlvbnMgKCkge1xuICAgICAgICByZXR1cm4gc3VwZXIuX3ZhbGlkYXRlUnVuT3B0aW9ucygpXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlamVjdEluZmluaXRlV2FpdGluZyhlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZVJ1bm5hYmxlQ29uZmlndXJhdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb25DYWNoZSlcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5jb25maWd1cmF0aW9uQ2FjaGUpO1xuXG4gICAgICAgIHJldHVybiBzdXBlci5fY3JlYXRlUnVubmFibGVDb25maWd1cmF0aW9uKClcbiAgICAgICAgICAgIC50aGVuKGNvbmZpZ3VyYXRpb24gPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbkNhY2hlID0gY29uZmlndXJhdGlvbjtcblxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWd1cmF0aW9uO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVqZWN0SW5maW5pdGVXYWl0aW5nKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRCb290c3RyYXBwaW5nRXJyb3IgKGVycikge1xuICAgICAgICB0aGlzLmJvb3RzdHJhcHBpbmdFcnJvciA9IGVycjtcbiAgICB9XG5cbiAgICBydW4gKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uQ2FjaGUgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLl9ydW5uaW5nKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEdlbmVyYWxFcnJvcihSVU5USU1FX0VSUk9SUy5jYW5ub3RSdW5MaXZlTW9kZVJ1bm5lck11bHRpcGxlVGltZXMpO1xuXG4gICAgICAgIHRoaXMuX3J1bm5pbmcgPSB0aGlzLl93YWl0VW50aWxFeGl0KClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGlzcG9zZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fcnVubmluZztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5fc2V0Q29uZmlndXJhdGlvbk9wdGlvbnMoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fc2V0Qm9vdHN0cmFwcGVyT3B0aW9ucygpKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gcGFyc2VGaWxlTGlzdCh0aGlzLmJvb3RzdHJhcHBlci5zb3VyY2VzLCBwcm9jZXNzLmN3ZCgpKSlcbiAgICAgICAgICAgIC50aGVuKGZpbGVzID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLmluaXQoZmlsZXMpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX2NyZWF0ZVJ1bm5hYmxlQ29uZmlndXJhdGlvbigpKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5ydW5UZXN0cyh0cnVlKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3J1bm5pbmc7XG4gICAgfVxuXG4gICAgc3VzcGVuZCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5ydW5uZXJUYXNrUHJvbWlzZSlcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblxuICAgICAgICB0aGlzLnN0b3BwaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZXN0UnVuQ29udHJvbGxlci5zdG9wKCk7XG4gICAgICAgIHRoaXMucnVubmVyVGFza1Byb21pc2UuY2FuY2VsKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudGVzdFJ1bkNvbnRyb2xsZXIuYWxsVGVzdHNDb21wbGV0ZVByb21pc2VcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BwaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIub25UZXN0UnVuRG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RvcCAoKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5zdG9wKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLmV4aXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGV4aXQgKCkge1xuICAgICAgICBpZiAodGhpcy5ydW5uZXJUYXNrUHJvbWlzZSlcbiAgICAgICAgICAgIHRoaXMucnVubmVyVGFza1Byb21pc2UuY2FuY2VsKCk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLnN0b3BJbmZpbml0ZVdhaXRpbmcoKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3J1bm5pbmcpO1xuICAgIH1cblxuICAgIGFzeW5jIF9maW5pc2hQcmV2aW91c1Rlc3RSdW5zICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZ3VyYXRpb25DYWNoZT8udGVzdHMpIHJldHVybjtcblxuICAgICAgICB0aGlzLnRlc3RSdW5Db250cm9sbGVyLnJ1bigpO1xuICAgIH1cblxuICAgIF92YWxpZGF0ZVJ1bm5hYmxlQ29uZmlndXJhdGlvbiAoaXNGaXJzdFJ1bikge1xuICAgICAgICBpZiAoaXNGaXJzdFJ1bikge1xuICAgICAgICAgICAgaWYgKHRoaXMuYm9vdHN0cmFwcGluZ0Vycm9yKVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh0aGlzLmJvb3RzdHJhcHBpbmdFcnJvcik7XG5cbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLmNvbmZpZ3VyYXRpb25DYWNoZSkge1xuICAgICAgICAgICAgICAgIC8vIE5PVEU6IFN1Y2ggZXJyb3JzIGhhbmRsZWQgaW4gcHJvY2Vzcy5vbigndW5oYW5kbGVkUmVqZWN0aW9uJykgaGFuZGxlci5cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobnVsbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmJvb3RzdHJhcHBlci5fZ2V0VGVzdHMoKVxuICAgICAgICAgICAgLnRoZW4odGVzdHMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbkNhY2hlLnRlc3RzID0gdGVzdHM7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ib290c3RyYXBwaW5nRXJyb3IgPyBQcm9taXNlLnJlamVjdCh0aGlzLmJvb3RzdHJhcHBpbmdFcnJvcikgOiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9jcmVhdGVUYXNrICh0ZXN0cywgYnJvd3NlckNvbm5lY3Rpb25Hcm91cHMsIHByb3h5LCBvcHRzKSB7XG4gICAgICAgIG9wdHMubGl2ZSA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHN1cGVyLl9jcmVhdGVUYXNrKHRlc3RzLCBicm93c2VyQ29ubmVjdGlvbkdyb3VwcywgcHJveHksIG9wdHMsIHRoaXMud2FybmluZ0xvZyk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUJvb3RzdHJhcHBlciAoYnJvd3NlckNvbm5lY3Rpb25HYXRld2F5LCBjb21waWxlclNlcnZpY2UsIG1lc3NhZ2VCdXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMaXZlTW9kZUJvb3RzdHJhcHBlcih0aGlzLCBicm93c2VyQ29ubmVjdGlvbkdhdGV3YXksIGNvbXBpbGVyU2VydmljZSwgbWVzc2FnZUJ1cyk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNvbnRyb2xsZXIgKCkge1xuICAgICAgICByZXR1cm4gbmV3IExpdmVNb2RlQ29udHJvbGxlcih0aGlzKTtcbiAgICB9XG5cbiAgICBfd2FpdFVudGlsRXhpdCAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3BJbmZpbml0ZVdhaXRpbmcgICA9IHJlc29sdmU7XG4gICAgICAgICAgICB0aGlzLnJlamVjdEluZmluaXRlV2FpdGluZyA9IHJlamVjdDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2Rpc3Bvc2VBc3NldHMgKGJyb3dzZXJTZXQsIHJlcG9ydGVycywgdGVzdGVkQXBwKSB7XG4gICAgICAgIHRoaXMuYXNzZXRzID0geyBicm93c2VyU2V0LCByZXBvcnRlcnMsIHRlc3RlZEFwcCB9O1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBfZGlzcG9zZSAoKSB7XG4gICAgICAgIHRoaXMuY29udHJvbGxlci5kaXNwb3NlKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmFzc2V0cylcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblxuICAgICAgICBjb25zdCB7IGJyb3dzZXJTZXQsIHJlcG9ydGVycywgdGVzdGVkQXBwIH0gPSB0aGlzLmFzc2V0cztcblxuICAgICAgICByZXR1cm4gc3VwZXIuX2Rpc3Bvc2VBc3NldHMoYnJvd3NlclNldCwgcmVwb3J0ZXJzLCB0ZXN0ZWRBcHApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGl2ZU1vZGVSdW5uZXI7XG4iXX0=