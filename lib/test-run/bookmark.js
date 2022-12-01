"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phase_1 = __importDefault(require("../test-run/phase"));
const types_1 = require("../errors/types");
const testcafe_hammerhead_1 = require("testcafe-hammerhead");
const actions_1 = require("./commands/actions");
const test_run_1 = require("../errors/test-run");
const default_values_1 = require("../configuration/default-values");
class TestRunBookmark {
    constructor(testRun, role) {
        this.testRun = testRun;
        this.role = role;
        this.url = testcafe_hammerhead_1.SPECIAL_BLANK_PAGE;
        this.ctx = null;
        this.fixtureCtx = null;
        this.dialogHandler = null;
        this.iframeSelector = null;
        this.speed = default_values_1.DEFAULT_SPEED_VALUE;
        this.pageLoadTimeout = 0;
        this.consoleMessages = null;
        this.dialogHandler = this.testRun.activeDialogHandler;
        this.iframeSelector = this.testRun.activeIframeSelector;
        this.speed = this.testRun.speed;
        this.pageLoadTimeout = this.testRun.pageLoadTimeout;
        this.consoleMessages = this.testRun.consoleMessages;
    }
    async _initCtxs() {
        if (this.testRun.compilerService) {
            this.ctx = await this.testRun.compilerService.getCtx({ testRunId: this.testRun.id });
            this.fixtureCtx = await this.testRun.compilerService.getFixtureCtx({ testRunId: this.testRun.id });
        }
        else {
            this.ctx = this.testRun.ctx;
            this.fixtureCtx = this.testRun.fixtureCtx;
        }
    }
    async _restoreCtxs() {
        if (this.testRun.compilerService) {
            await this.testRun.compilerService.setCtx({
                testRunId: this.testRun.id,
                value: this.ctx,
            });
            await this.testRun.compilerService.setFixtureCtx({
                testRunId: this.testRun.id,
                value: this.fixtureCtx,
            });
        }
        else {
            this.testRun.ctx = this.ctx;
            this.testRun.fixtureCtx = this.fixtureCtx;
        }
    }
    async init() {
        await this._initCtxs();
        if (this.testRun.activeIframeSelector)
            await this.testRun.executeCommand(new actions_1.SwitchToMainWindowCommand());
        if (!this.role.opts.preserveUrl)
            await this.role.setCurrentUrlAsRedirectUrl(this.testRun);
    }
    async _restoreDialogHandler() {
        if (this.testRun.activeDialogHandler !== this.dialogHandler) {
            const restoreDialogCommand = new actions_1.SetNativeDialogHandlerCommand({ dialogHandler: { fn: this.dialogHandler } });
            await this.testRun.executeCommand(restoreDialogCommand);
        }
    }
    async _restoreSpeed() {
        if (this.testRun.speed !== this.speed) {
            const restoreSpeedCommand = new actions_1.SetTestSpeedCommand({ speed: this.speed });
            await this.testRun.executeCommand(restoreSpeedCommand);
        }
    }
    async _restorePageLoadTimeout() {
        if (this.testRun.pageLoadTimeout !== this.pageLoadTimeout) {
            const restorePageLoadTimeoutCommand = new actions_1.SetPageLoadTimeoutCommand({ duration: this.pageLoadTimeout });
            await this.testRun.executeCommand(restorePageLoadTimeoutCommand);
        }
    }
    async _restoreWorkingFrame() {
        if (this.testRun.activeIframeSelector !== this.iframeSelector) {
            const switchWorkingFrameCommand = this.iframeSelector ?
                new actions_1.SwitchToIframeCommand({ selector: this.iframeSelector }) :
                new actions_1.SwitchToMainWindowCommand();
            try {
                await this.testRun.executeCommand(switchWorkingFrameCommand);
            }
            catch (err) {
                if (err.code === types_1.TEST_RUN_ERRORS.actionElementNotFoundError)
                    throw new test_run_1.CurrentIframeNotFoundError();
                if (err.code === types_1.TEST_RUN_ERRORS.actionIframeIsNotLoadedError)
                    throw new test_run_1.CurrentIframeIsNotLoadedError();
                throw err;
            }
        }
    }
    async _restorePage(url, stateSnapshot) {
        await this.testRun.navigateToUrl(url, true, JSON.stringify(stateSnapshot));
    }
    _setConsoleMessages() {
        this.testRun.consoleMessages = this.consoleMessages;
    }
    _setPhase(value) {
        this.testRun.phase = value;
    }
    async restore(callsite, stateSnapshot) {
        const prevPhase = await this.testRun.phase;
        this._setPhase(phase_1.default.inBookmarkRestore);
        await this._restoreCtxs();
        this._setConsoleMessages();
        try {
            await this._restoreSpeed();
            await this._restorePageLoadTimeout();
            await this._restoreDialogHandler();
            const preserveUrl = this.role.opts.preserveUrl;
            const redirectUrl = preserveUrl
                ? this.role.redirectUrl
                : this.role.redirectUrl[this.testRun.test.id];
            await this._restorePage(redirectUrl, stateSnapshot);
            if (!preserveUrl)
                await this._restoreWorkingFrame();
        }
        catch (err) {
            err.callsite = callsite;
            throw err;
        }
        this._setPhase(prevPhase);
    }
}
exports.default = TestRunBookmark;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va21hcmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdC1ydW4vYm9va21hcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBK0M7QUFDL0MsMkNBQWtEO0FBQ2xELDZEQUF3RTtBQUV4RSxnREFNNEI7QUFFNUIsaURBQStGO0FBSS9GLG9FQUFzRTtBQUt0RSxNQUFxQixlQUFlO0lBWWhDLFlBQW9CLE9BQWdCLEVBQUUsSUFBVTtRQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFXLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFjLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxHQUFlLHdDQUFrQixDQUFDO1FBQzFDLElBQUksQ0FBQyxHQUFHLEdBQWUsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQVEsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUssSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUksSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQWEsb0NBQW1CLENBQUM7UUFDM0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDO1FBQ3hELElBQUksQ0FBQyxjQUFjLEdBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztRQUN6RCxJQUFJLENBQUMsS0FBSyxHQUFhLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7UUFDcEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQXlDLENBQUM7SUFDbEYs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QUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKO0FBNUpELGtDQTRKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBURVNUX1JVTl9QSEFTRSBmcm9tICcuLi90ZXN0LXJ1bi9waGFzZSc7XG5pbXBvcnQgeyBURVNUX1JVTl9FUlJPUlMgfSBmcm9tICcuLi9lcnJvcnMvdHlwZXMnO1xuaW1wb3J0IHsgU1BFQ0lBTF9CTEFOS19QQUdFLCBTdGF0ZVNuYXBzaG90IH0gZnJvbSAndGVzdGNhZmUtaGFtbWVyaGVhZCc7XG5cbmltcG9ydCB7XG4gICAgU3dpdGNoVG9NYWluV2luZG93Q29tbWFuZCxcbiAgICBTd2l0Y2hUb0lmcmFtZUNvbW1hbmQsXG4gICAgU2V0TmF0aXZlRGlhbG9nSGFuZGxlckNvbW1hbmQsXG4gICAgU2V0VGVzdFNwZWVkQ29tbWFuZCxcbiAgICBTZXRQYWdlTG9hZFRpbWVvdXRDb21tYW5kLFxufSBmcm9tICcuL2NvbW1hbmRzL2FjdGlvbnMnO1xuXG5pbXBvcnQgeyBDdXJyZW50SWZyYW1lTm90Rm91bmRFcnJvciwgQ3VycmVudElmcmFtZUlzTm90TG9hZGVkRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvdGVzdC1ydW4nO1xuaW1wb3J0IFRlc3RSdW4gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgeyBFeGVjdXRlQ2xpZW50RnVuY3Rpb25Db21tYW5kLCBFeGVjdXRlU2VsZWN0b3JDb21tYW5kIH0gZnJvbSAnLi9jb21tYW5kcy9vYnNlcnZhdGlvbic7XG5pbXBvcnQgUm9sZSwgeyBSZWRpcmVjdFVybCB9IGZyb20gJy4uL3JvbGUvcm9sZSc7XG5pbXBvcnQgeyBERUZBVUxUX1NQRUVEX1ZBTFVFIH0gZnJvbSAnLi4vY29uZmlndXJhdGlvbi9kZWZhdWx0LXZhbHVlcyc7XG5pbXBvcnQgQnJvd3NlckNvbnNvbGVNZXNzYWdlcyBmcm9tICcuL2Jyb3dzZXItY29uc29sZS1tZXNzYWdlcyc7XG5pbXBvcnQgeyBDb21tYW5kQmFzZSB9IGZyb20gJy4vY29tbWFuZHMvYmFzZSc7XG5pbXBvcnQgeyBDYWxsc2l0ZVJlY29yZCB9IGZyb20gJ2NhbGxzaXRlLXJlY29yZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RSdW5Cb29rbWFyayB7XG4gICAgcHJpdmF0ZSByZWFkb25seSB0ZXN0UnVuOiBUZXN0UnVuO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcm9sZTogUm9sZTtcbiAgICBwcml2YXRlIHVybDogc3RyaW5nO1xuICAgIHByaXZhdGUgY3R4OiBvYmplY3QgfCBudWxsO1xuICAgIHByaXZhdGUgZml4dHVyZUN0eDogb2JqZWN0IHwgbnVsbDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRpYWxvZ0hhbmRsZXI6IEV4ZWN1dGVDbGllbnRGdW5jdGlvbkNvbW1hbmQgfCBudWxsO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgaWZyYW1lU2VsZWN0b3I6IEV4ZWN1dGVTZWxlY3RvckNvbW1hbmQgfCBudWxsO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc3BlZWQ6IG51bWJlcjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBhZ2VMb2FkVGltZW91dDogbnVtYmVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY29uc29sZU1lc3NhZ2VzOiBCcm93c2VyQ29uc29sZU1lc3NhZ2VzIHwgbnVsbDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAodGVzdFJ1bjogVGVzdFJ1biwgcm9sZTogUm9sZSkge1xuICAgICAgICB0aGlzLnRlc3RSdW4gICAgICAgICA9IHRlc3RSdW47XG4gICAgICAgIHRoaXMucm9sZSAgICAgICAgICAgID0gcm9sZTtcbiAgICAgICAgdGhpcy51cmwgICAgICAgICAgICAgPSBTUEVDSUFMX0JMQU5LX1BBR0U7XG4gICAgICAgIHRoaXMuY3R4ICAgICAgICAgICAgID0gbnVsbDtcbiAgICAgICAgdGhpcy5maXh0dXJlQ3R4ICAgICAgPSBudWxsO1xuICAgICAgICB0aGlzLmRpYWxvZ0hhbmRsZXIgICA9IG51bGw7XG4gICAgICAgIHRoaXMuaWZyYW1lU2VsZWN0b3IgID0gbnVsbDtcbiAgICAgICAgdGhpcy5zcGVlZCAgICAgICAgICAgPSBERUZBVUxUX1NQRUVEX1ZBTFVFO1xuICAgICAgICB0aGlzLnBhZ2VMb2FkVGltZW91dCA9IDA7XG4gICAgICAgIHRoaXMuY29uc29sZU1lc3NhZ2VzID0gbnVsbDtcbiAgICAgICAgdGhpcy5kaWFsb2dIYW5kbGVyICAgPSB0aGlzLnRlc3RSdW4uYWN0aXZlRGlhbG9nSGFuZGxlcjtcbiAgICAgICAgdGhpcy5pZnJhbWVTZWxlY3RvciAgPSB0aGlzLnRlc3RSdW4uYWN0aXZlSWZyYW1lU2VsZWN0b3I7XG4gICAgICAgIHRoaXMuc3BlZWQgICAgICAgICAgID0gdGhpcy50ZXN0UnVuLnNwZWVkO1xuICAgICAgICB0aGlzLnBhZ2VMb2FkVGltZW91dCA9IHRoaXMudGVzdFJ1bi5wYWdlTG9hZFRpbWVvdXQ7XG4gICAgICAgIHRoaXMuY29uc29sZU1lc3NhZ2VzID0gdGhpcy50ZXN0UnVuLmNvbnNvbGVNZXNzYWdlcyBhcyBCcm93c2VyQ29uc29sZU1lc3NhZ2VzO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgX2luaXRDdHhzICgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKHRoaXMudGVzdFJ1bi5jb21waWxlclNlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4ICAgICAgICA9IGF3YWl0IHRoaXMudGVzdFJ1bi5jb21waWxlclNlcnZpY2UuZ2V0Q3R4KHsgdGVzdFJ1bklkOiB0aGlzLnRlc3RSdW4uaWQgfSk7XG4gICAgICAgICAgICB0aGlzLmZpeHR1cmVDdHggPSBhd2FpdCB0aGlzLnRlc3RSdW4uY29tcGlsZXJTZXJ2aWNlLmdldEZpeHR1cmVDdHgoeyB0ZXN0UnVuSWQ6IHRoaXMudGVzdFJ1bi5pZCB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3R4ICAgICAgICA9IHRoaXMudGVzdFJ1bi5jdHg7XG4gICAgICAgICAgICB0aGlzLmZpeHR1cmVDdHggPSB0aGlzLnRlc3RSdW4uZml4dHVyZUN0eCBhcyBvYmplY3Q7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIF9yZXN0b3JlQ3R4cyAoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICh0aGlzLnRlc3RSdW4uY29tcGlsZXJTZXJ2aWNlKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnRlc3RSdW4uY29tcGlsZXJTZXJ2aWNlLnNldEN0eCh7XG4gICAgICAgICAgICAgICAgdGVzdFJ1bklkOiB0aGlzLnRlc3RSdW4uaWQsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICAgICB0aGlzLmN0eCBhcyBvYmplY3QsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudGVzdFJ1bi5jb21waWxlclNlcnZpY2Uuc2V0Rml4dHVyZUN0eCh7XG4gICAgICAgICAgICAgICAgdGVzdFJ1bklkOiB0aGlzLnRlc3RSdW4uaWQsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICAgICB0aGlzLmZpeHR1cmVDdHggYXMgb2JqZWN0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRlc3RSdW4uY3R4ICAgICAgICA9IHRoaXMuY3R4IGFzIG9iamVjdDtcbiAgICAgICAgICAgIHRoaXMudGVzdFJ1bi5maXh0dXJlQ3R4ID0gdGhpcy5maXh0dXJlQ3R4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGluaXQgKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLl9pbml0Q3R4cygpO1xuXG4gICAgICAgIGlmICh0aGlzLnRlc3RSdW4uYWN0aXZlSWZyYW1lU2VsZWN0b3IpXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnRlc3RSdW4uZXhlY3V0ZUNvbW1hbmQobmV3IFN3aXRjaFRvTWFpbldpbmRvd0NvbW1hbmQoKSBhcyBDb21tYW5kQmFzZSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnJvbGUub3B0cy5wcmVzZXJ2ZVVybClcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucm9sZS5zZXRDdXJyZW50VXJsQXNSZWRpcmVjdFVybCh0aGlzLnRlc3RSdW4pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgX3Jlc3RvcmVEaWFsb2dIYW5kbGVyICgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKHRoaXMudGVzdFJ1bi5hY3RpdmVEaWFsb2dIYW5kbGVyICE9PSB0aGlzLmRpYWxvZ0hhbmRsZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3RvcmVEaWFsb2dDb21tYW5kID0gbmV3IFNldE5hdGl2ZURpYWxvZ0hhbmRsZXJDb21tYW5kKHsgZGlhbG9nSGFuZGxlcjogeyBmbjogdGhpcy5kaWFsb2dIYW5kbGVyIH0gfSk7XG5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMudGVzdFJ1bi5leGVjdXRlQ29tbWFuZChyZXN0b3JlRGlhbG9nQ29tbWFuZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIF9yZXN0b3JlU3BlZWQgKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAodGhpcy50ZXN0UnVuLnNwZWVkICE9PSB0aGlzLnNwZWVkKSB7XG4gICAgICAgICAgICBjb25zdCByZXN0b3JlU3BlZWRDb21tYW5kID0gbmV3IFNldFRlc3RTcGVlZENvbW1hbmQoeyBzcGVlZDogdGhpcy5zcGVlZCB9KTtcblxuICAgICAgICAgICAgYXdhaXQgdGhpcy50ZXN0UnVuLmV4ZWN1dGVDb21tYW5kKHJlc3RvcmVTcGVlZENvbW1hbmQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfcmVzdG9yZVBhZ2VMb2FkVGltZW91dCAoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICh0aGlzLnRlc3RSdW4ucGFnZUxvYWRUaW1lb3V0ICE9PSB0aGlzLnBhZ2VMb2FkVGltZW91dCkge1xuICAgICAgICAgICAgY29uc3QgcmVzdG9yZVBhZ2VMb2FkVGltZW91dENvbW1hbmQgPSBuZXcgU2V0UGFnZUxvYWRUaW1lb3V0Q29tbWFuZCh7IGR1cmF0aW9uOiB0aGlzLnBhZ2VMb2FkVGltZW91dCB9KTtcblxuICAgICAgICAgICAgYXdhaXQgdGhpcy50ZXN0UnVuLmV4ZWN1dGVDb21tYW5kKHJlc3RvcmVQYWdlTG9hZFRpbWVvdXRDb21tYW5kKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgX3Jlc3RvcmVXb3JraW5nRnJhbWUgKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAodGhpcy50ZXN0UnVuLmFjdGl2ZUlmcmFtZVNlbGVjdG9yICE9PSB0aGlzLmlmcmFtZVNlbGVjdG9yKSB7XG4gICAgICAgICAgICBjb25zdCBzd2l0Y2hXb3JraW5nRnJhbWVDb21tYW5kID0gdGhpcy5pZnJhbWVTZWxlY3RvciA/XG4gICAgICAgICAgICAgICAgbmV3IFN3aXRjaFRvSWZyYW1lQ29tbWFuZCh7IHNlbGVjdG9yOiB0aGlzLmlmcmFtZVNlbGVjdG9yIH0pIDpcbiAgICAgICAgICAgICAgICBuZXcgU3dpdGNoVG9NYWluV2luZG93Q29tbWFuZCgpO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMudGVzdFJ1bi5leGVjdXRlQ29tbWFuZChzd2l0Y2hXb3JraW5nRnJhbWVDb21tYW5kIGFzIENvbW1hbmRCYXNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnIuY29kZSA9PT0gVEVTVF9SVU5fRVJST1JTLmFjdGlvbkVsZW1lbnROb3RGb3VuZEVycm9yKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQ3VycmVudElmcmFtZU5vdEZvdW5kRXJyb3IoKTtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIuY29kZSA9PT0gVEVTVF9SVU5fRVJST1JTLmFjdGlvbklmcmFtZUlzTm90TG9hZGVkRXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBDdXJyZW50SWZyYW1lSXNOb3RMb2FkZWRFcnJvcigpO1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfcmVzdG9yZVBhZ2UgKHVybDogc3RyaW5nLCBzdGF0ZVNuYXBzaG90OiBTdGF0ZVNuYXBzaG90KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IHRoaXMudGVzdFJ1bi5uYXZpZ2F0ZVRvVXJsKHVybCwgdHJ1ZSwgSlNPTi5zdHJpbmdpZnkoc3RhdGVTbmFwc2hvdCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NldENvbnNvbGVNZXNzYWdlcyAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGVzdFJ1bi5jb25zb2xlTWVzc2FnZXMgPSB0aGlzLmNvbnNvbGVNZXNzYWdlcyBhcyBCcm93c2VyQ29uc29sZU1lc3NhZ2VzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NldFBoYXNlICh2YWx1ZTogVEVTVF9SVU5fUEhBU0UpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50ZXN0UnVuLnBoYXNlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlc3RvcmUgKGNhbGxzaXRlOiBDYWxsc2l0ZVJlY29yZCwgc3RhdGVTbmFwc2hvdDogU3RhdGVTbmFwc2hvdCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBwcmV2UGhhc2UgPSBhd2FpdCB0aGlzLnRlc3RSdW4ucGhhc2U7XG5cbiAgICAgICAgdGhpcy5fc2V0UGhhc2UoVEVTVF9SVU5fUEhBU0UuaW5Cb29rbWFya1Jlc3RvcmUpO1xuICAgICAgICBhd2FpdCB0aGlzLl9yZXN0b3JlQ3R4cygpO1xuICAgICAgICB0aGlzLl9zZXRDb25zb2xlTWVzc2FnZXMoKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fcmVzdG9yZVNwZWVkKCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9yZXN0b3JlUGFnZUxvYWRUaW1lb3V0KCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9yZXN0b3JlRGlhbG9nSGFuZGxlcigpO1xuXG4gICAgICAgICAgICBjb25zdCBwcmVzZXJ2ZVVybCA9IHRoaXMucm9sZS5vcHRzLnByZXNlcnZlVXJsO1xuXG4gICAgICAgICAgICBjb25zdCByZWRpcmVjdFVybCA9IHByZXNlcnZlVXJsXG4gICAgICAgICAgICAgICAgPyB0aGlzLnJvbGUucmVkaXJlY3RVcmwgYXMgc3RyaW5nXG4gICAgICAgICAgICAgICAgOiAodGhpcy5yb2xlLnJlZGlyZWN0VXJsIGFzIFJlZGlyZWN0VXJsKVt0aGlzLnRlc3RSdW4udGVzdC5pZF07XG5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3Jlc3RvcmVQYWdlKHJlZGlyZWN0VXJsLCBzdGF0ZVNuYXBzaG90KTtcblxuICAgICAgICAgICAgaWYgKCFwcmVzZXJ2ZVVybClcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9yZXN0b3JlV29ya2luZ0ZyYW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgICAgICBlcnIuY2FsbHNpdGUgPSBjYWxsc2l0ZTtcblxuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2V0UGhhc2UocHJldlBoYXNlKTtcbiAgICB9XG59XG4iXX0=