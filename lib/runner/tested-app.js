"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const execa_1 = require("execa");
const lodash_1 = require("lodash");
const tree_kill_1 = __importDefault(require("tree-kill"));
const os_family_1 = __importDefault(require("os-family"));
const delay_1 = __importDefault(require("../utils/delay"));
const runtime_1 = require("../errors/runtime");
const types_1 = require("../errors/types");
const resolve_path_relatively_cwd_1 = __importDefault(require("../utils/resolve-path-relatively-cwd"));
const debug_1 = __importDefault(require("debug"));
const MODULES_BIN_DIR = (0, resolve_path_relatively_cwd_1.default)('./node_modules/.bin');
const ENV_PATH_KEY = (function () {
    if (os_family_1.default.win) {
        let pathKey = 'Path';
        Object.keys(process.env).forEach(key => {
            if (key.toLowerCase() === 'path')
                pathKey = key;
        });
        return pathKey;
    }
    return 'PATH';
})();
class TestedApp {
    constructor() {
        this._process = null;
        this._killed = false;
        this._stdoutLogger = (0, debug_1.default)('testcafe:tested-app:stdout');
        this._stderrLogger = (0, debug_1.default)('testcafe:tested-app:stderr');
        this.errorPromise = null;
    }
    async _run(command) {
        const env = Object.assign({}, process.env);
        const path = env[ENV_PATH_KEY] || '';
        const pathParts = path.split(path_1.delimiter);
        pathParts.unshift(MODULES_BIN_DIR);
        env[ENV_PATH_KEY] = pathParts.join(path_1.delimiter);
        this._process = (0, execa_1.command)(command, { shell: true, env });
        if (this._process.stdout)
            this._process.stdout.on('data', data => this._stdoutLogger(String(data)));
        if (this._process.stderr)
            this._process.stderr.on('data', data => this._stderrLogger(String(data)));
        try {
            await this._process;
        }
        catch (err) {
            if (this._killed)
                return;
            const message = err.stack || String(err);
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.testedAppFailedWithError, message);
        }
    }
    async start(command, initDelay) {
        // NOTE: We should not resolve it if no error was thrown
        this.errorPromise = this
            ._run(command)
            .then(() => new Promise(lodash_1.noop));
        await Promise.race([
            (0, delay_1.default)(initDelay),
            this.errorPromise,
        ]);
    }
    async kill() {
        this._killed = true;
        const killPromise = new Promise(resolve => (0, tree_kill_1.default)(this._process.pid, 'SIGTERM', resolve));
        await killPromise;
    }
}
exports.default = TestedApp;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGVkLWFwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydW5uZXIvdGVzdGVkLWFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLCtCQUFrRDtBQUNsRCxpQ0FBZ0Q7QUFDaEQsbUNBQThCO0FBQzlCLDBEQUE2QjtBQUM3QiwwREFBMkI7QUFDM0IsMkRBQW1DO0FBQ25DLCtDQUFpRDtBQUNqRCwyQ0FBaUQ7QUFDakQsdUdBQTRFO0FBQzVFLGtEQUFnQztBQUVoQyxNQUFNLGVBQWUsR0FBRyxJQUFBLHFDQUF3QixFQUFDLHFCQUFxQixDQUFDLENBQUM7QUFFeEUsTUFBTSxZQUFZLEdBQUcsQ0FBQztJQUNsQixJQUFJLG1CQUFFLENBQUMsR0FBRyxFQUFFO1FBQ1IsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBRXJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuQyxJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNO2dCQUM1QixPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUM7S0FDbEI7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDO0FBR0wsTUFBcUIsU0FBUztJQVExQjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQVksSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQWEsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQU8sSUFBQSxlQUFXLEVBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsYUFBYSxHQUFPLElBQUEsZUFBVyxFQUFDLDRCQUE0QixDQUFDLENBQUM7UUFFbkUsSUFBSSxDQUFDLFlBQVksR0FBUSxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUVPLEtBQUssQ0FBQyxJQUFJLENBQUUsT0FBZTtRQUMvQixNQUFNLEdBQUcsR0FBUyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakQsTUFBTSxJQUFJLEdBQVEsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFhLENBQUMsQ0FBQztRQUU1QyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRW5DLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFhLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUEsZUFBWSxFQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUU1RCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTTtZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTlFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNO1lBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFOUUsSUFBSTtZQUNBLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN2QjtRQUNELE9BQU8sR0FBUSxFQUFFO1lBQ2IsSUFBSSxJQUFJLENBQUMsT0FBTztnQkFDWixPQUFPO1lBRVgsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFekMsTUFBTSxJQUFJLHNCQUFZLENBQUMsc0JBQWMsQ0FBQyx3QkFBd0IsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUM1RTtJQUNMLENBQUM7SUFFTSxLQUFLLENBQUMsS0FBSyxDQUFFLE9BQWUsRUFBRSxTQUFpQjtRQUNsRCx3REFBd0Q7UUFDeEQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJO2FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDYixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxPQUFPLENBQUMsYUFBSSxDQUFDLENBQUMsQ0FBQztRQUVuQyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDZixJQUFBLGVBQUssRUFBQyxTQUFTLENBQUM7WUFDaEIsSUFBSSxDQUFDLFlBQVk7U0FDcEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFFcEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFBLG1CQUFJLEVBQUUsSUFBSSxDQUFDLFFBQXlCLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRTFHLE1BQU0sV0FBVyxDQUFDO0lBQ3RCLENBQUM7Q0FDSjtBQWxFRCw0QkFrRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGlsZFByb2Nlc3MgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCB7IGRlbGltaXRlciBhcyBwYXRoRGVsaW1pdGVyIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBjb21tYW5kIGFzIHNwYXduQ29tbWFuZCB9IGZyb20gJ2V4ZWNhJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGtpbGwgZnJvbSAndHJlZS1raWxsJztcbmltcG9ydCBPUyBmcm9tICdvcy1mYW1pbHknO1xuaW1wb3J0IGRlbGF5IGZyb20gJy4uL3V0aWxzL2RlbGF5JztcbmltcG9ydCB7IEdlbmVyYWxFcnJvciB9IGZyb20gJy4uL2Vycm9ycy9ydW50aW1lJztcbmltcG9ydCB7IFJVTlRJTUVfRVJST1JTIH0gZnJvbSAnLi4vZXJyb3JzL3R5cGVzJztcbmltcG9ydCByZXNvbHZlUGF0aFJlbGF0aXZlbHlDd2QgZnJvbSAnLi4vdXRpbHMvcmVzb2x2ZS1wYXRoLXJlbGF0aXZlbHktY3dkJztcbmltcG9ydCBkZWJ1Z0xvZ2dlciBmcm9tICdkZWJ1Zyc7XG5cbmNvbnN0IE1PRFVMRVNfQklOX0RJUiA9IHJlc29sdmVQYXRoUmVsYXRpdmVseUN3ZCgnLi9ub2RlX21vZHVsZXMvLmJpbicpO1xuXG5jb25zdCBFTlZfUEFUSF9LRVkgPSAoZnVuY3Rpb24gKCkge1xuICAgIGlmIChPUy53aW4pIHtcbiAgICAgICAgbGV0IHBhdGhLZXkgPSAnUGF0aCc7XG5cbiAgICAgICAgT2JqZWN0LmtleXMocHJvY2Vzcy5lbnYpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ3BhdGgnKVxuICAgICAgICAgICAgICAgIHBhdGhLZXkgPSBrZXk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwYXRoS2V5O1xuICAgIH1cblxuICAgIHJldHVybiAnUEFUSCc7XG59KSgpO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RlZEFwcCB7XG4gICAgcHJpdmF0ZSBfa2lsbGVkOiBib29sZWFuO1xuICAgIHByaXZhdGUgX3Byb2Nlc3M6IG51bGwgfCBDaGlsZFByb2Nlc3M7XG4gICAgcHJpdmF0ZSBfc3Rkb3V0TG9nZ2VyOiBkZWJ1Zy5EZWJ1Z2dlcjtcbiAgICBwcml2YXRlIF9zdGRlcnJMb2dnZXI6IGRlYnVnLkRlYnVnZ2VyO1xuXG4gICAgcHVibGljIGVycm9yUHJvbWlzZTogbnVsbCB8IFByb21pc2U8dm9pZD47XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCkge1xuICAgICAgICB0aGlzLl9wcm9jZXNzICAgICAgICAgID0gbnVsbDtcbiAgICAgICAgdGhpcy5fa2lsbGVkICAgICAgICAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zdGRvdXRMb2dnZXIgICAgID0gZGVidWdMb2dnZXIoJ3Rlc3RjYWZlOnRlc3RlZC1hcHA6c3Rkb3V0Jyk7XG4gICAgICAgIHRoaXMuX3N0ZGVyckxvZ2dlciAgICAgPSBkZWJ1Z0xvZ2dlcigndGVzdGNhZmU6dGVzdGVkLWFwcDpzdGRlcnInKTtcblxuICAgICAgICB0aGlzLmVycm9yUHJvbWlzZSAgICAgID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIF9ydW4gKGNvbW1hbmQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBlbnYgICAgICAgPSBPYmplY3QuYXNzaWduKHt9LCBwcm9jZXNzLmVudik7XG4gICAgICAgIGNvbnN0IHBhdGggICAgICA9IGVudltFTlZfUEFUSF9LRVldIHx8ICcnO1xuICAgICAgICBjb25zdCBwYXRoUGFydHMgPSBwYXRoLnNwbGl0KHBhdGhEZWxpbWl0ZXIpO1xuXG4gICAgICAgIHBhdGhQYXJ0cy51bnNoaWZ0KE1PRFVMRVNfQklOX0RJUik7XG5cbiAgICAgICAgZW52W0VOVl9QQVRIX0tFWV0gPSBwYXRoUGFydHMuam9pbihwYXRoRGVsaW1pdGVyKTtcblxuICAgICAgICB0aGlzLl9wcm9jZXNzID0gc3Bhd25Db21tYW5kKGNvbW1hbmQsIHsgc2hlbGw6IHRydWUsIGVudiB9KTtcblxuICAgICAgICBpZiAodGhpcy5fcHJvY2Vzcy5zdGRvdXQpXG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzLnN0ZG91dC5vbignZGF0YScsIGRhdGEgPT4gdGhpcy5fc3Rkb3V0TG9nZ2VyKFN0cmluZyhkYXRhKSkpO1xuXG4gICAgICAgIGlmICh0aGlzLl9wcm9jZXNzLnN0ZGVycilcbiAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3Muc3RkZXJyLm9uKCdkYXRhJywgZGF0YSA9PiB0aGlzLl9zdGRlcnJMb2dnZXIoU3RyaW5nKGRhdGEpKSk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3Byb2Nlc3M7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fa2lsbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVyci5zdGFjayB8fCBTdHJpbmcoZXJyKTtcblxuICAgICAgICAgICAgdGhyb3cgbmV3IEdlbmVyYWxFcnJvcihSVU5USU1FX0VSUk9SUy50ZXN0ZWRBcHBGYWlsZWRXaXRoRXJyb3IsIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHN0YXJ0IChjb21tYW5kOiBzdHJpbmcsIGluaXREZWxheTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIC8vIE5PVEU6IFdlIHNob3VsZCBub3QgcmVzb2x2ZSBpdCBpZiBubyBlcnJvciB3YXMgdGhyb3duXG4gICAgICAgIHRoaXMuZXJyb3JQcm9taXNlID0gdGhpc1xuICAgICAgICAgICAgLl9ydW4oY29tbWFuZClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IG5ldyBQcm9taXNlKG5vb3ApKTtcblxuICAgICAgICBhd2FpdCBQcm9taXNlLnJhY2UoW1xuICAgICAgICAgICAgZGVsYXkoaW5pdERlbGF5KSxcbiAgICAgICAgICAgIHRoaXMuZXJyb3JQcm9taXNlLFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMga2lsbCAoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMuX2tpbGxlZCA9IHRydWU7XG5cbiAgICAgICAgY29uc3Qga2lsbFByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IGtpbGwoKHRoaXMuX3Byb2Nlc3MgYXMgQ2hpbGRQcm9jZXNzKS5waWQsICdTSUdURVJNJywgcmVzb2x2ZSkpO1xuXG4gICAgICAgIGF3YWl0IGtpbGxQcm9taXNlO1xuICAgIH1cbn1cbiJdfQ==