"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const lodash_1 = require("lodash");
const test_run_1 = require("./test-run");
const test_run_state_1 = __importDefault(require("./test-run-state"));
class LiveModeTestRunController extends events_1.default {
    constructor() {
        super();
        this.testWrappers = [];
        this.expectedTestCount = 0;
        this._testRunCtor = null;
        this.testRuns = {};
        this.allTestsCompletePromise = Promise.resolve();
        this.completeAllRunningTests = lodash_1.noop;
        this.on('all-tests-complete', () => this.completeAllRunningTests());
    }
    get TestRunCtor() {
        if (!this._testRunCtor) {
            this._testRunCtor = (0, test_run_1.TestRunCtorFactory)({
                created: testRun => this._onTestRunCreated(testRun),
                done: (testRun, forced) => this._onTestRunDone(testRun, forced),
                readyToNext: testRun => this._onTestRunReadyToNext(testRun),
            });
        }
        return this._testRunCtor;
    }
    setExpectedTestCount(testCount) {
        this.expectedTestCount = testCount;
    }
    _getTestRuns() {
        return [].concat(...Object.values(this.testRuns));
    }
    run() {
        const readyToNextPromises = [];
        const testRuns = [].concat(...Object.values(this.testRuns));
        testRuns.forEach(testRun => {
            if (testRun.finish) {
                readyToNextPromises.push(testRun.readyToNextPromise);
                testRun.finish();
            }
        });
        this.testRuns = {};
        return Promise.all(readyToNextPromises);
    }
    stop() {
        this._getTestRuns().forEach(testRun => {
            testRun.stop();
        });
    }
    _getTestWrapper(test) {
        return this.testWrappers.find(w => w.test === test);
    }
    _onTestRunCreated(testRun) {
        this.allTestsCompletePromise = new Promise(resolve => {
            this.completeAllRunningTests = resolve;
        });
        const connectionId = testRun.browserConnection.id;
        this.testRuns[connectionId] = this.testRuns[connectionId] || [];
        this.testRuns[connectionId].push(testRun);
    }
    _onTestRunDone(testRun) {
        testRun.state = test_run_state_1.default.done;
        const testWillBeRestarted = !this._isTestFinished(testRun);
        const hasRunningTestsInOtherBrowsers = this._getTestRuns().some(t => t.state !== test_run_state_1.default.done);
        if (!hasRunningTestsInOtherBrowsers && !testWillBeRestarted)
            this.emit('all-tests-complete');
        const browserTestRuns = this.testRuns[testRun.browserConnection.id];
        const tests = (0, lodash_1.uniq)(browserTestRuns.map(t => t.test));
        testRun.readyToNextPromise = new Promise(resolve => {
            testRun.setReadyToNext = resolve;
        });
        const isLastTestRun = tests.length >= this.expectedTestCount;
        if (testWillBeRestarted || !isLastTestRun)
            return Promise.resolve();
        return new Promise(resolve => {
            testRun.finish = () => {
                testRun.finish = null;
                resolve();
            };
        });
    }
    _onTestRunReadyToNext(testRun) {
        testRun.setReadyToNext();
    }
    _isTestFinished(testRun) {
        const { quarantine, errs } = testRun;
        if (!quarantine)
            return true;
        return quarantine.isFirstAttemptSuccessful(errs) || quarantine.isThresholdReached(errs);
    }
}
exports.default = LiveModeTestRunController;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1ydW4tY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saXZlL3Rlc3QtcnVuLWNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBa0M7QUFDbEMsbUNBQW9DO0FBQ3BDLHlDQUFnRDtBQUNoRCxzRUFBOEM7QUFFOUMsTUFBTSx5QkFBMEIsU0FBUSxnQkFBWTtJQUNoRDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBRVIsSUFBSSxDQUFDLFlBQVksR0FBUSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxHQUFRLElBQUksQ0FBQztRQUU5QixJQUFJLENBQUMsUUFBUSxHQUFrQixFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqRCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsYUFBSSxDQUFDO1FBRXBDLElBQUksQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFBLDZCQUFrQixFQUFDO2dCQUNuQyxPQUFPLEVBQU0sT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO2dCQUN2RCxJQUFJLEVBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7Z0JBQ3RFLFdBQVcsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENB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Q0FBQyxrQkFBa0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMvQyxPQUFPLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBRTdELElBQUksbUJBQW1CLElBQUksQ0FBQyxhQUFhO1lBQ3JDLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRTdCLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDekIsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7Z0JBQ2xCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUV0QixPQUFPLEVBQUUsQ0FBQztZQUNkLENBQUMsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHFCQUFxQixDQUFFLE9BQU87UUFDMUIsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxlQUFlLENBQUUsT0FBTztRQUNwQixNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUVyQyxJQUFJLENBQUMsVUFBVTtZQUNYLE9BQU8sSUFBSSxDQUFDO1FBRWhCLE9BQU8sVUFBVSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RixDQUFDO0NBQ0o7QUFFRCxrQkFBZSx5QkFBeUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRzJztcbmltcG9ydCB7IG5vb3AsIHVuaXEgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgVGVzdFJ1bkN0b3JGYWN0b3J5IH0gZnJvbSAnLi90ZXN0LXJ1bic7XG5pbXBvcnQgVEVTVF9SVU5fU1RBVEUgZnJvbSAnLi90ZXN0LXJ1bi1zdGF0ZSc7XG5cbmNsYXNzIExpdmVNb2RlVGVzdFJ1bkNvbnRyb2xsZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnRlc3RXcmFwcGVycyAgICAgID0gW107XG4gICAgICAgIHRoaXMuZXhwZWN0ZWRUZXN0Q291bnQgPSAwO1xuICAgICAgICB0aGlzLl90ZXN0UnVuQ3RvciAgICAgID0gbnVsbDtcblxuICAgICAgICB0aGlzLnRlc3RSdW5zICAgICAgICAgICAgICAgID0ge307XG4gICAgICAgIHRoaXMuYWxsVGVzdHNDb21wbGV0ZVByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgdGhpcy5jb21wbGV0ZUFsbFJ1bm5pbmdUZXN0cyA9IG5vb3A7XG5cbiAgICAgICAgdGhpcy5vbignYWxsLXRlc3RzLWNvbXBsZXRlJywgKCkgPT4gdGhpcy5jb21wbGV0ZUFsbFJ1bm5pbmdUZXN0cygpKTtcbiAgICB9XG5cbiAgICBnZXQgVGVzdFJ1bkN0b3IgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3Rlc3RSdW5DdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl90ZXN0UnVuQ3RvciA9IFRlc3RSdW5DdG9yRmFjdG9yeSh7XG4gICAgICAgICAgICAgICAgY3JlYXRlZDogICAgIHRlc3RSdW4gPT4gdGhpcy5fb25UZXN0UnVuQ3JlYXRlZCh0ZXN0UnVuKSxcbiAgICAgICAgICAgICAgICBkb25lOiAgICAgICAgKHRlc3RSdW4sIGZvcmNlZCkgPT4gdGhpcy5fb25UZXN0UnVuRG9uZSh0ZXN0UnVuLCBmb3JjZWQpLFxuICAgICAgICAgICAgICAgIHJlYWR5VG9OZXh0OiB0ZXN0UnVuID0+IHRoaXMuX29uVGVzdFJ1blJlYWR5VG9OZXh0KHRlc3RSdW4pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fdGVzdFJ1bkN0b3I7XG4gICAgfVxuXG4gICAgc2V0RXhwZWN0ZWRUZXN0Q291bnQgKHRlc3RDb3VudCkge1xuICAgICAgICB0aGlzLmV4cGVjdGVkVGVzdENvdW50ID0gdGVzdENvdW50O1xuICAgIH1cblxuICAgIF9nZXRUZXN0UnVucyAoKSB7XG4gICAgICAgIHJldHVybiBbXS5jb25jYXQoLi4uT2JqZWN0LnZhbHVlcyh0aGlzLnRlc3RSdW5zKSk7XG4gICAgfVxuXG4gICAgcnVuICgpIHtcbiAgICAgICAgY29uc3QgcmVhZHlUb05leHRQcm9taXNlcyA9IFtdO1xuXG4gICAgICAgIGNvbnN0IHRlc3RSdW5zID0gW10uY29uY2F0KC4uLk9iamVjdC52YWx1ZXModGhpcy50ZXN0UnVucykpO1xuXG4gICAgICAgIHRlc3RSdW5zLmZvckVhY2godGVzdFJ1biA9PiB7XG4gICAgICAgICAgICBpZiAodGVzdFJ1bi5maW5pc2gpIHtcbiAgICAgICAgICAgICAgICByZWFkeVRvTmV4dFByb21pc2VzLnB1c2godGVzdFJ1bi5yZWFkeVRvTmV4dFByb21pc2UpO1xuICAgICAgICAgICAgICAgIHRlc3RSdW4uZmluaXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudGVzdFJ1bnMgPSB7fTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocmVhZHlUb05leHRQcm9taXNlcyk7XG4gICAgfVxuXG4gICAgc3RvcCAoKSB7XG4gICAgICAgIHRoaXMuX2dldFRlc3RSdW5zKCkuZm9yRWFjaCh0ZXN0UnVuID0+IHtcbiAgICAgICAgICAgIHRlc3RSdW4uc3RvcCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfZ2V0VGVzdFdyYXBwZXIgKHRlc3QpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVzdFdyYXBwZXJzLmZpbmQodyA9PiB3LnRlc3QgPT09IHRlc3QpO1xuICAgIH1cblxuICAgIF9vblRlc3RSdW5DcmVhdGVkICh0ZXN0UnVuKSB7XG4gICAgICAgIHRoaXMuYWxsVGVzdHNDb21wbGV0ZVByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGVBbGxSdW5uaW5nVGVzdHMgPSByZXNvbHZlO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjb25uZWN0aW9uSWQgPSB0ZXN0UnVuLmJyb3dzZXJDb25uZWN0aW9uLmlkO1xuXG4gICAgICAgIHRoaXMudGVzdFJ1bnNbY29ubmVjdGlvbklkXSA9IHRoaXMudGVzdFJ1bnNbY29ubmVjdGlvbklkXSB8fCBbXTtcblxuICAgICAgICB0aGlzLnRlc3RSdW5zW2Nvbm5lY3Rpb25JZF0ucHVzaCh0ZXN0UnVuKTtcbiAgICB9XG5cbiAgICBfb25UZXN0UnVuRG9uZSAodGVzdFJ1bikge1xuICAgICAgICB0ZXN0UnVuLnN0YXRlID0gVEVTVF9SVU5fU1RBVEUuZG9uZTtcblxuICAgICAgICBjb25zdCB0ZXN0V2lsbEJlUmVzdGFydGVkICAgICAgICAgICAgPSAhdGhpcy5faXNUZXN0RmluaXNoZWQodGVzdFJ1bik7XG4gICAgICAgIGNvbnN0IGhhc1J1bm5pbmdUZXN0c0luT3RoZXJCcm93c2VycyA9IHRoaXMuX2dldFRlc3RSdW5zKCkuc29tZSh0ID0+IHQuc3RhdGUgIT09IFRFU1RfUlVOX1NUQVRFLmRvbmUpO1xuXG4gICAgICAgIGlmICghaGFzUnVubmluZ1Rlc3RzSW5PdGhlckJyb3dzZXJzICYmICF0ZXN0V2lsbEJlUmVzdGFydGVkKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdhbGwtdGVzdHMtY29tcGxldGUnKTtcblxuICAgICAgICBjb25zdCBicm93c2VyVGVzdFJ1bnMgPSB0aGlzLnRlc3RSdW5zW3Rlc3RSdW4uYnJvd3NlckNvbm5lY3Rpb24uaWRdO1xuICAgICAgICBjb25zdCB0ZXN0cyAgICAgICAgICAgPSB1bmlxKGJyb3dzZXJUZXN0UnVucy5tYXAodCA9PiB0LnRlc3QpKTtcblxuICAgICAgICB0ZXN0UnVuLnJlYWR5VG9OZXh0UHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGVzdFJ1bi5zZXRSZWFkeVRvTmV4dCA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGlzTGFzdFRlc3RSdW4gPSB0ZXN0cy5sZW5ndGggPj0gdGhpcy5leHBlY3RlZFRlc3RDb3VudDtcblxuICAgICAgICBpZiAodGVzdFdpbGxCZVJlc3RhcnRlZCB8fCAhaXNMYXN0VGVzdFJ1bilcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0ZXN0UnVuLmZpbmlzaCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0ZXN0UnVuLmZpbmlzaCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfb25UZXN0UnVuUmVhZHlUb05leHQgKHRlc3RSdW4pIHtcbiAgICAgICAgdGVzdFJ1bi5zZXRSZWFkeVRvTmV4dCgpO1xuICAgIH1cblxuICAgIF9pc1Rlc3RGaW5pc2hlZCAodGVzdFJ1bikge1xuICAgICAgICBjb25zdCB7IHF1YXJhbnRpbmUsIGVycnMgfSA9IHRlc3RSdW47XG5cbiAgICAgICAgaWYgKCFxdWFyYW50aW5lKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHF1YXJhbnRpbmUuaXNGaXJzdEF0dGVtcHRTdWNjZXNzZnVsKGVycnMpIHx8IHF1YXJhbnRpbmUuaXNUaHJlc2hvbGRSZWFjaGVkKGVycnMpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGl2ZU1vZGVUZXN0UnVuQ29udHJvbGxlcjtcbiJdfQ==