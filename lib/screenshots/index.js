"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const moment_1 = __importDefault(require("moment"));
const capturer_1 = __importDefault(require("./capturer"));
const path_pattern_1 = __importDefault(require("../utils/path-pattern"));
const get_common_path_1 = __importDefault(require("../utils/get-common-path"));
const default_extension_1 = __importDefault(require("./default-extension"));
const temp_directory_1 = __importDefault(require("../utils/temp-directory"));
const create_safe_listener_1 = __importDefault(require("../utils/create-safe-listener"));
const debug_1 = __importDefault(require("debug"));
const events_1 = require("events");
const DEBUG_LOGGER = (0, debug_1.default)('testcafe:screenshots');
const TEMP_DIR_PREFIX = 'screenshots';
class Screenshots extends events_1.EventEmitter {
    constructor({ enabled, path, pathPattern, fullPage, thumbnails, autoTakeOnFails, messageBus }) {
        super();
        this.enabled = enabled;
        this.screenshotsPath = path;
        this.screenshotsPattern = pathPattern;
        this.fullPage = fullPage;
        this.thumbnails = thumbnails;
        this.testEntries = [];
        this.now = (0, moment_1.default)();
        this.tempDirectory = new temp_directory_1.default(TEMP_DIR_PREFIX);
        this.autoTakeOnFails = autoTakeOnFails;
        this._assignEventHandlers(messageBus);
    }
    _createSafeListener(listener) {
        return (0, create_safe_listener_1.default)(this, listener, DEBUG_LOGGER);
    }
    _assignEventHandlers(messageBus) {
        messageBus.once('start', this._createSafeListener(this._onMessageBusStart));
    }
    async _onMessageBusStart() {
        await this.tempDirectory.init();
    }
    _addTestEntry(test) {
        const testEntry = {
            test: test,
            testRuns: {},
            screenshots: [],
        };
        this.testEntries.push(testEntry);
        return testEntry;
    }
    _getTestEntry(test) {
        return (0, lodash_1.find)(this.testEntries, entry => entry.test === test);
    }
    _ensureTestEntry(test) {
        let testEntry = this._getTestEntry(test);
        if (!testEntry)
            testEntry = this._addTestEntry(test);
        return testEntry;
    }
    getScreenshotsInfo(test) {
        return this._getTestEntry(test).screenshots;
    }
    hasCapturedFor(test) {
        return this.getScreenshotsInfo(test).length > 0;
    }
    getPathFor(test) {
        const testEntry = this._getTestEntry(test);
        const screenshotPaths = testEntry.screenshots.map(screenshot => screenshot.screenshotPath);
        return (0, get_common_path_1.default)(screenshotPaths);
    }
    createCapturerFor(test, testIndex, quarantine, connection, warningLog) {
        const testEntry = this._ensureTestEntry(test);
        const pathPattern = new path_pattern_1.default(this.screenshotsPattern, default_extension_1.default, {
            testIndex,
            quarantineAttempt: quarantine ? quarantine.getNextAttemptNumber() : null,
            now: this.now,
            fixture: test.fixture.name,
            test: test.name,
            parsedUserAgent: connection.browserInfo.parsedUserAgent,
        });
        return new capturer_1.default(this.screenshotsPath, testEntry, connection, pathPattern, this.fullPage, this.thumbnails, warningLog, this.tempDirectory.path, this.autoTakeOnFails);
    }
    addTestRun(test, testRun) {
        const testEntry = this._getTestEntry(test);
        testEntry.testRuns[testRun.browserConnection.id] = testRun;
    }
}
exports.default = Screenshots;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NyZWVuc2hvdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtQ0FBOEI7QUFDOUIsb0RBQTRCO0FBQzVCLDBEQUFrQztBQUNsQyx5RUFBZ0Q7QUFDaEQsK0VBQXFEO0FBQ3JELDRFQUErRDtBQUMvRCw2RUFBb0Q7QUFDcEQseUZBQStEO0FBQy9ELGtEQUEwQjtBQUMxQixtQ0FBc0M7QUFFdEMsTUFBTSxZQUFZLEdBQUcsSUFBQSxlQUFLLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUVuRCxNQUFNLGVBQWUsR0FBRyxhQUFhLENBQUM7QUFFdEMsTUFBcUIsV0FBWSxTQUFRLHFCQUFZO0lBQ2pELFlBQWEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUU7UUFDMUYsS0FBSyxFQUFFLENBQUM7UUFFUixJQUFJLENBQUMsT0FBTyxHQUFjLE9BQU8sQ0FBQztRQUNsQyxJQUFJLENBQUMsZUFBZSxHQUFNLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsV0FBVyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQWEsUUFBUSxDQUFDO1FBQ25DLElBQUksQ0FBQyxVQUFVLEdBQVcsVUFBVSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQVUsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLEdBQWtCLElBQUEsZ0JBQU0sR0FBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQVEsSUFBSSx3QkFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxlQUFlLEdBQU0sZUFBZSxDQUFDO1FBRTFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsbUJBQW1CLENBQUUsUUFB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QUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdLLENBQUM7SUFFRCxVQUFVLENBQUUsSUFBSSxFQUFFLE9BQU87UUFDckIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7SUFDL0QsQ0FBQztDQUNKO0FBeEZELDhCQXdGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZpbmQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IENhcHR1cmVyIGZyb20gJy4vY2FwdHVyZXInO1xuaW1wb3J0IFBhdGhQYXR0ZXJuIGZyb20gJy4uL3V0aWxzL3BhdGgtcGF0dGVybic7XG5pbXBvcnQgZ2V0Q29tbW9uUGF0aCBmcm9tICcuLi91dGlscy9nZXQtY29tbW9uLXBhdGgnO1xuaW1wb3J0IERFRkFVTFRfU0NSRUVOU0hPVF9FWFRFTlNJT04gZnJvbSAnLi9kZWZhdWx0LWV4dGVuc2lvbic7XG5pbXBvcnQgVGVtcERpcmVjdG9yeSBmcm9tICcuLi91dGlscy90ZW1wLWRpcmVjdG9yeSc7XG5pbXBvcnQgY3JlYXRlU2FmZUxpc3RlbmVyIGZyb20gJy4uL3V0aWxzL2NyZWF0ZS1zYWZlLWxpc3RlbmVyJztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuXG5jb25zdCBERUJVR19MT0dHRVIgPSBkZWJ1ZygndGVzdGNhZmU6c2NyZWVuc2hvdHMnKTtcblxuY29uc3QgVEVNUF9ESVJfUFJFRklYID0gJ3NjcmVlbnNob3RzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NyZWVuc2hvdHMgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yICh7IGVuYWJsZWQsIHBhdGgsIHBhdGhQYXR0ZXJuLCBmdWxsUGFnZSwgdGh1bWJuYWlscywgYXV0b1Rha2VPbkZhaWxzLCBtZXNzYWdlQnVzIH0pIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmVuYWJsZWQgICAgICAgICAgICA9IGVuYWJsZWQ7XG4gICAgICAgIHRoaXMuc2NyZWVuc2hvdHNQYXRoICAgID0gcGF0aDtcbiAgICAgICAgdGhpcy5zY3JlZW5zaG90c1BhdHRlcm4gPSBwYXRoUGF0dGVybjtcbiAgICAgICAgdGhpcy5mdWxsUGFnZSAgICAgICAgICAgPSBmdWxsUGFnZTtcbiAgICAgICAgdGhpcy50aHVtYm5haWxzICAgICAgICAgPSB0aHVtYm5haWxzO1xuICAgICAgICB0aGlzLnRlc3RFbnRyaWVzICAgICAgICA9IFtdO1xuICAgICAgICB0aGlzLm5vdyAgICAgICAgICAgICAgICA9IG1vbWVudCgpO1xuICAgICAgICB0aGlzLnRlbXBEaXJlY3RvcnkgICAgICA9IG5ldyBUZW1wRGlyZWN0b3J5KFRFTVBfRElSX1BSRUZJWCk7XG4gICAgICAgIHRoaXMuYXV0b1Rha2VPbkZhaWxzICAgID0gYXV0b1Rha2VPbkZhaWxzO1xuXG4gICAgICAgIHRoaXMuX2Fzc2lnbkV2ZW50SGFuZGxlcnMobWVzc2FnZUJ1cyk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZVNhZmVMaXN0ZW5lciAobGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVNhZmVMaXN0ZW5lcih0aGlzLCBsaXN0ZW5lciwgREVCVUdfTE9HR0VSKTtcbiAgICB9XG5cbiAgICBfYXNzaWduRXZlbnRIYW5kbGVycyAobWVzc2FnZUJ1cykge1xuICAgICAgICBtZXNzYWdlQnVzLm9uY2UoJ3N0YXJ0JywgdGhpcy5fY3JlYXRlU2FmZUxpc3RlbmVyKHRoaXMuX29uTWVzc2FnZUJ1c1N0YXJ0KSk7XG4gICAgfVxuXG4gICAgYXN5bmMgX29uTWVzc2FnZUJ1c1N0YXJ0ICgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy50ZW1wRGlyZWN0b3J5LmluaXQoKTtcbiAgICB9XG5cbiAgICBfYWRkVGVzdEVudHJ5ICh0ZXN0KSB7XG4gICAgICAgIGNvbnN0IHRlc3RFbnRyeSA9IHtcbiAgICAgICAgICAgIHRlc3Q6ICAgICAgICB0ZXN0LFxuICAgICAgICAgICAgdGVzdFJ1bnM6ICAgIHt9LFxuICAgICAgICAgICAgc2NyZWVuc2hvdHM6IFtdLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMudGVzdEVudHJpZXMucHVzaCh0ZXN0RW50cnkpO1xuXG4gICAgICAgIHJldHVybiB0ZXN0RW50cnk7XG4gICAgfVxuXG4gICAgX2dldFRlc3RFbnRyeSAodGVzdCkge1xuICAgICAgICByZXR1cm4gZmluZCh0aGlzLnRlc3RFbnRyaWVzLCBlbnRyeSA9PiBlbnRyeS50ZXN0ID09PSB0ZXN0KTtcbiAgICB9XG5cbiAgICBfZW5zdXJlVGVzdEVudHJ5ICh0ZXN0KSB7XG4gICAgICAgIGxldCB0ZXN0RW50cnkgPSB0aGlzLl9nZXRUZXN0RW50cnkodGVzdCk7XG5cbiAgICAgICAgaWYgKCF0ZXN0RW50cnkpXG4gICAgICAgICAgICB0ZXN0RW50cnkgPSB0aGlzLl9hZGRUZXN0RW50cnkodGVzdCk7XG5cbiAgICAgICAgcmV0dXJuIHRlc3RFbnRyeTtcbiAgICB9XG5cbiAgICBnZXRTY3JlZW5zaG90c0luZm8gKHRlc3QpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFRlc3RFbnRyeSh0ZXN0KS5zY3JlZW5zaG90cztcbiAgICB9XG5cbiAgICBoYXNDYXB0dXJlZEZvciAodGVzdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTY3JlZW5zaG90c0luZm8odGVzdCkubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBnZXRQYXRoRm9yICh0ZXN0KSB7XG4gICAgICAgIGNvbnN0IHRlc3RFbnRyeSAgICAgICA9IHRoaXMuX2dldFRlc3RFbnRyeSh0ZXN0KTtcbiAgICAgICAgY29uc3Qgc2NyZWVuc2hvdFBhdGhzID0gdGVzdEVudHJ5LnNjcmVlbnNob3RzLm1hcChzY3JlZW5zaG90ID0+IHNjcmVlbnNob3Quc2NyZWVuc2hvdFBhdGgpO1xuXG4gICAgICAgIHJldHVybiBnZXRDb21tb25QYXRoKHNjcmVlbnNob3RQYXRocyk7XG4gICAgfVxuXG4gICAgY3JlYXRlQ2FwdHVyZXJGb3IgKHRlc3QsIHRlc3RJbmRleCwgcXVhcmFudGluZSwgY29ubmVjdGlvbiwgd2FybmluZ0xvZykge1xuICAgICAgICBjb25zdCB0ZXN0RW50cnkgICA9IHRoaXMuX2Vuc3VyZVRlc3RFbnRyeSh0ZXN0KTtcbiAgICAgICAgY29uc3QgcGF0aFBhdHRlcm4gPSBuZXcgUGF0aFBhdHRlcm4odGhpcy5zY3JlZW5zaG90c1BhdHRlcm4sIERFRkFVTFRfU0NSRUVOU0hPVF9FWFRFTlNJT04sIHtcbiAgICAgICAgICAgIHRlc3RJbmRleCxcbiAgICAgICAgICAgIHF1YXJhbnRpbmVBdHRlbXB0OiBxdWFyYW50aW5lID8gcXVhcmFudGluZS5nZXROZXh0QXR0ZW1wdE51bWJlcigpIDogbnVsbCxcbiAgICAgICAgICAgIG5vdzogICAgICAgICAgICAgICB0aGlzLm5vdyxcbiAgICAgICAgICAgIGZpeHR1cmU6ICAgICAgICAgICB0ZXN0LmZpeHR1cmUubmFtZSxcbiAgICAgICAgICAgIHRlc3Q6ICAgICAgICAgICAgICB0ZXN0Lm5hbWUsXG4gICAgICAgICAgICBwYXJzZWRVc2VyQWdlbnQ6ICAgY29ubmVjdGlvbi5icm93c2VySW5mby5wYXJzZWRVc2VyQWdlbnQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXcgQ2FwdHVyZXIodGhpcy5zY3JlZW5zaG90c1BhdGgsIHRlc3RFbnRyeSwgY29ubmVjdGlvbiwgcGF0aFBhdHRlcm4sIHRoaXMuZnVsbFBhZ2UsIHRoaXMudGh1bWJuYWlscywgd2FybmluZ0xvZywgdGhpcy50ZW1wRGlyZWN0b3J5LnBhdGgsIHRoaXMuYXV0b1Rha2VPbkZhaWxzKTtcbiAgICB9XG5cbiAgICBhZGRUZXN0UnVuICh0ZXN0LCB0ZXN0UnVuKSB7XG4gICAgICAgIGNvbnN0IHRlc3RFbnRyeSA9IHRoaXMuX2dldFRlc3RFbnRyeSh0ZXN0KTtcblxuICAgICAgICB0ZXN0RW50cnkudGVzdFJ1bnNbdGVzdFJ1bi5icm93c2VyQ29ubmVjdGlvbi5pZF0gPSB0ZXN0UnVuO1xuICAgIH1cbn1cbiJdfQ==