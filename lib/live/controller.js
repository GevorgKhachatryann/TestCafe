"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const logger_1 = __importDefault(require("./logger"));
const file_watcher_1 = __importDefault(require("./file-watcher"));
const keyboard_observer_1 = __importDefault(require("./keyboard-observer"));
const types_1 = require("../errors/types");
const runtime_1 = require("../errors/runtime");
class LiveModeController extends events_1.default {
    constructor(runner) {
        super();
        this.running = false;
        this.restarting = false;
        this.watchingPaused = false;
        this.stopping = false;
        this.logger = new logger_1.default();
        this.runner = runner;
        this.keyboardObserver = this._createKeyboardObserver();
        this.fileWatcher = this._createFileWatcher();
    }
    _isTestFilesNotFoundError(err) {
        // @ts-ignore
        return runtime_1.GeneralError.isGeneralError(err) && err.code === types_1.RUNTIME_ERRORS.testFilesNotFound;
    }
    init(files) {
        this.keyboardObserver.push(this);
        this._initFileWatching(files);
        this._setRunning();
        return Promise.resolve()
            .then(() => this.logger.writeIntroMessage(files));
    }
    dispose() {
        this.fileWatcher.stop();
        this.keyboardObserver.remove(this);
    }
    runTests(sourceChanged) {
        if (this.watchingPaused || this.running)
            return Promise.resolve();
        this._setRunning();
        this.logger.writeRunTestsMessage(sourceChanged);
        return this.runner.runTests();
    }
    onTestRunDone(err) {
        this.running = false;
        if (this._isTestFilesNotFoundError(err))
            throw err;
        if (!this.restarting)
            this.logger.writeTestsFinishedMessage();
        if (err)
            this.logger.err(err);
    }
    toggleWatching() {
        this.watchingPaused = !this.watchingPaused;
        this.logger.writeToggleWatchingMessage(!this.watchingPaused);
    }
    stop() {
        if (!this.runner || !this.running) {
            this.logger.writeNothingToStopMessage();
            return Promise.resolve();
        }
        this.logger.writeStopRunningMessage();
        return this.runner.suspend()
            .then(() => {
            this.restarting = false;
            this.running = false;
        });
    }
    restart() {
        if (this.restarting || this.watchingPaused)
            return Promise.resolve();
        this.restarting = true;
        if (this.running) {
            return this.stop()
                .then(() => this.logger.writeTestsFinishedMessage())
                .then(() => this.runTests());
        }
        return this.runTests();
    }
    exit() {
        if (this.stopping)
            return Promise.resolve();
        this.logger.writeExitMessage();
        this.stopping = true;
        return this.runner ? this.runner.exit() : Promise.resolve();
    }
    addFileToWatches(filename) {
        this.fileWatcher.addFile(this, filename);
    }
    _createFileWatcher() {
        return new file_watcher_1.default();
    }
    _createKeyboardObserver() {
        return new keyboard_observer_1.default();
    }
    _initFileWatching(files) {
        files.forEach(file => this.addFileToWatches(file));
    }
    _setRunning() {
        this.running = true;
        this.restarting = false;
        this.stopping = false;
    }
}
exports.default = LiveModeController;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saXZlL2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBa0M7QUFDbEMsc0RBQThCO0FBQzlCLGtFQUF5QztBQUN6Qyw0RUFBZ0U7QUFFaEUsMkNBQWlEO0FBQ2pELCtDQUFpRDtBQUdqRCxNQUFNLGtCQUFtQixTQUFRLGdCQUFZO0lBZXpDLFlBQW9CLE1BQXNCO1FBQ3RDLEtBQUssRUFBRSxDQUFDO1FBRVIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGdCQUFNLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDdkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBakJPLHlCQUF5QixDQUFFLEdBQVU7UUFDekMsYUFBYTtRQUNiLE9BQU8sc0JBQVksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxzQkFBYyxDQUFDLGlCQUFpQixDQUFDO0lBQzdGLENBQUM7SUFnQk0sSUFBSSxDQUFFLEtBQWU7UUFDeEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVqQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFOUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5C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QUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDaEUsQ0FBQztJQUVNLGdCQUFnQixDQUFFLFFBQWdCO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRVMsa0JBQWtCO1FBQ3hCLE9BQU8sSUFBSSxzQkFBVyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVTLHVCQUF1QjtRQUM3QixPQUFPLElBQUksMkJBQTZCLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRU8saUJBQWlCLENBQUUsS0FBZTtRQUN0QyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVPLFdBQVc7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDO0NBQ0o7QUFFRCxrQkFBZSxrQkFBa0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRzJztcbmltcG9ydCBMb2dnZXIgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IEZpbGVXYXRjaGVyIGZyb20gJy4vZmlsZS13YXRjaGVyJztcbmltcG9ydCBMaXZlTW9kZUtleWJvYXJkRXZlbnRPYnNlcnZlciBmcm9tICcuL2tleWJvYXJkLW9ic2VydmVyJztcbmltcG9ydCBMaXZlTW9kZVJ1bm5lciBmcm9tICcuL3Rlc3QtcnVubmVyJztcbmltcG9ydCB7IFJVTlRJTUVfRVJST1JTIH0gZnJvbSAnLi4vZXJyb3JzL3R5cGVzJztcbmltcG9ydCB7IEdlbmVyYWxFcnJvciB9IGZyb20gJy4uL2Vycm9ycy9ydW50aW1lJztcblxuXG5jbGFzcyBMaXZlTW9kZUNvbnRyb2xsZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIHByaXZhdGUgcnVubmluZzogYm9vbGVhbjtcbiAgICBwcml2YXRlIHJlc3RhcnRpbmc6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSB3YXRjaGluZ1BhdXNlZDogYm9vbGVhbjtcbiAgICBwcml2YXRlIHN0b3BwaW5nOiBib29sZWFuO1xuICAgIHByaXZhdGUgbG9nZ2VyOiBMb2dnZXI7XG4gICAgcHJpdmF0ZSByZWFkb25seSBydW5uZXI6IExpdmVNb2RlUnVubmVyO1xuICAgIHByaXZhdGUga2V5Ym9hcmRPYnNlcnZlcjogTGl2ZU1vZGVLZXlib2FyZEV2ZW50T2JzZXJ2ZXI7XG4gICAgcHJpdmF0ZSBmaWxlV2F0Y2hlcjogRmlsZVdhdGNoZXI7XG5cbiAgICBwcml2YXRlIF9pc1Rlc3RGaWxlc05vdEZvdW5kRXJyb3IgKGVycjogRXJyb3IpOiBib29sZWFuIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gR2VuZXJhbEVycm9yLmlzR2VuZXJhbEVycm9yKGVycikgJiYgZXJyLmNvZGUgPT09IFJVTlRJTUVfRVJST1JTLnRlc3RGaWxlc05vdEZvdW5kO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAocnVubmVyOiBMaXZlTW9kZVJ1bm5lcikge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlc3RhcnRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53YXRjaGluZ1BhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0b3BwaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgICAgICB0aGlzLnJ1bm5lciA9IHJ1bm5lcjtcblxuICAgICAgICB0aGlzLmtleWJvYXJkT2JzZXJ2ZXIgPSB0aGlzLl9jcmVhdGVLZXlib2FyZE9ic2VydmVyKCk7XG4gICAgICAgIHRoaXMuZmlsZVdhdGNoZXIgPSB0aGlzLl9jcmVhdGVGaWxlV2F0Y2hlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0IChmaWxlczogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdGhpcy5rZXlib2FyZE9ic2VydmVyLnB1c2godGhpcyk7XG5cbiAgICAgICAgdGhpcy5faW5pdEZpbGVXYXRjaGluZyhmaWxlcyk7XG5cbiAgICAgICAgdGhpcy5fc2V0UnVubmluZygpO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5sb2dnZXIud3JpdGVJbnRyb01lc3NhZ2UoZmlsZXMpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzcG9zZSAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlsZVdhdGNoZXIuc3RvcCgpO1xuXG4gICAgICAgIHRoaXMua2V5Ym9hcmRPYnNlcnZlci5yZW1vdmUodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJ1blRlc3RzIChzb3VyY2VDaGFuZ2VkPzogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAodGhpcy53YXRjaGluZ1BhdXNlZCB8fCB0aGlzLnJ1bm5pbmcpXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgICAgICAgdGhpcy5fc2V0UnVubmluZygpO1xuXG4gICAgICAgIHRoaXMubG9nZ2VyLndyaXRlUnVuVGVzdHNNZXNzYWdlKHNvdXJjZUNoYW5nZWQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJ1bm5lci5ydW5UZXN0cygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblRlc3RSdW5Eb25lIChlcnI6IEVycm9yKTogdm9pZCB7XG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1Rlc3RGaWxlc05vdEZvdW5kRXJyb3IoZXJyKSlcbiAgICAgICAgICAgIHRocm93IGVycjtcblxuICAgICAgICBpZiAoIXRoaXMucmVzdGFydGluZylcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndyaXRlVGVzdHNGaW5pc2hlZE1lc3NhZ2UoKTtcblxuICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyKGVycik7XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZVdhdGNoaW5nICgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53YXRjaGluZ1BhdXNlZCA9ICF0aGlzLndhdGNoaW5nUGF1c2VkO1xuXG4gICAgICAgIHRoaXMubG9nZ2VyLndyaXRlVG9nZ2xlV2F0Y2hpbmdNZXNzYWdlKCF0aGlzLndhdGNoaW5nUGF1c2VkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RvcCAoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICghdGhpcy5ydW5uZXIgfHwgIXRoaXMucnVubmluZykge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud3JpdGVOb3RoaW5nVG9TdG9wTWVzc2FnZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvZ2dlci53cml0ZVN0b3BSdW5uaW5nTWVzc2FnZSgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJ1bm5lci5zdXNwZW5kKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RhcnRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXN0YXJ0ICgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKHRoaXMucmVzdGFydGluZyB8fCB0aGlzLndhdGNoaW5nUGF1c2VkKVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXG4gICAgICAgIHRoaXMucmVzdGFydGluZyA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMucnVubmluZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RvcCgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5sb2dnZXIud3JpdGVUZXN0c0ZpbmlzaGVkTWVzc2FnZSgpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMucnVuVGVzdHMoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5ydW5UZXN0cygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBleGl0ICgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RvcHBpbmcpXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgICAgICAgdGhpcy5sb2dnZXIud3JpdGVFeGl0TWVzc2FnZSgpO1xuXG4gICAgICAgIHRoaXMuc3RvcHBpbmcgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJ1bm5lciA/IHRoaXMucnVubmVyLmV4aXQoKSA6IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRGaWxlVG9XYXRjaGVzIChmaWxlbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlsZVdhdGNoZXIuYWRkRmlsZSh0aGlzLCBmaWxlbmFtZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9jcmVhdGVGaWxlV2F0Y2hlciAoKTogRmlsZVdhdGNoZXIge1xuICAgICAgICByZXR1cm4gbmV3IEZpbGVXYXRjaGVyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9jcmVhdGVLZXlib2FyZE9ic2VydmVyICgpOiBMaXZlTW9kZUtleWJvYXJkRXZlbnRPYnNlcnZlciB7XG4gICAgICAgIHJldHVybiBuZXcgTGl2ZU1vZGVLZXlib2FyZEV2ZW50T2JzZXJ2ZXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0RmlsZVdhdGNoaW5nIChmaWxlczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgZmlsZXMuZm9yRWFjaChmaWxlID0+IHRoaXMuYWRkRmlsZVRvV2F0Y2hlcyhmaWxlKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2V0UnVubmluZyAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdGFydGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0b3BwaW5nID0gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMaXZlTW9kZUNvbnRyb2xsZXI7XG4iXX0=