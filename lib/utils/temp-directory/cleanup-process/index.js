"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const debug_1 = __importDefault(require("debug"));
const promisify_event_1 = __importDefault(require("promisify-event"));
const promisified_functions_1 = require("../../promisified-functions");
const commands_1 = __importDefault(require("./commands"));
const WORKER_PATH = require.resolve('./worker');
const WORKER_STDIO_CONFIG = ['ignore', 'pipe', 'pipe', 'ipc'];
const DEBUG_LOGGER = (0, debug_1.default)('testcafe:utils:temp-directory:cleanup-process');
class CleanupProcess {
    constructor() {
        this.worker = null;
        this.initialized = false;
        this.initPromise = Promise.resolve(void 0);
        this.errorPromise = null;
        this.messageCounter = 0;
        this.pendingResponses = {};
    }
    _sendMessage(id, msg) {
        return Promise.race([
            (0, promisified_functions_1.sendMessageToChildProcess)(this.worker, Object.assign({ id }, msg)),
            this._waitProcessError(),
        ]);
    }
    _onResponse(response) {
        const pendingResponse = this.pendingResponses[response.id];
        if (response.error) {
            if (pendingResponse)
                pendingResponse.control.reject(response.error);
            else
                this.pendingResponses[response.id] = Promise.reject(response.error);
        }
        else if (pendingResponse)
            pendingResponse.control.resolve();
        else
            this.pendingResponses[response.id] = Promise.resolve();
    }
    async _waitResponse(id) {
        if (!this.pendingResponses[id]) {
            const promiseControl = {};
            this.pendingResponses[id] = new Promise((resolve, reject) => {
                Object.assign(promiseControl, { resolve, reject });
            });
            this.pendingResponses[id].control = promiseControl;
        }
        try {
            await this.pendingResponses[id];
        }
        finally {
            delete this.pendingResponses[id];
        }
    }
    async _waitResponseForMessage(msg) {
        const currentId = this.messageCounter;
        this.messageCounter++;
        await this._sendMessage(currentId, msg);
        await this._waitResponse(currentId);
    }
    _waitProcessExit() {
        return (0, promisify_event_1.default)(this.worker, 'exit')
            .then(exitCode => Promise.reject(new Error(`Worker process terminated with code ${exitCode}`)));
    }
    _waitProcessError() {
        if (this.errorPromise)
            return this.errorPromise;
        this.errorPromise = (0, promisify_event_1.default)(this.worker, 'error');
        this.errorPromise.then(() => {
            this.errorPromise = null;
        });
        return this.errorPromise;
    }
    _setupWorkerEventHandlers() {
        this.worker.on('message', message => this._onResponse(message));
        this.worker.stdout.on('data', data => DEBUG_LOGGER('Worker process stdout:\n', String(data)));
        this.worker.stderr.on('data', data => DEBUG_LOGGER('Worker process stderr:\n', String(data)));
    }
    _unrefWorkerProcess() {
        this.worker.unref();
        this.worker.stdout.unref();
        this.worker.stderr.unref();
        const channel = this.worker.channel || this.worker._channel;
        channel.unref();
    }
    _handleProcessError(error) {
        this.initialized = false;
        DEBUG_LOGGER(error);
    }
    init() {
        this.initPromise = this.initPromise
            .then(async (initialized) => {
            if (initialized !== void 0)
                return initialized;
            this.worker = (0, child_process_1.spawn)(process.argv0, [WORKER_PATH], { detached: true, stdio: WORKER_STDIO_CONFIG });
            this._setupWorkerEventHandlers();
            this._unrefWorkerProcess();
            const exitPromise = this._waitProcessExit();
            try {
                await Promise.race([
                    this._waitResponseForMessage({ command: commands_1.default.init }),
                    this._waitProcessError(),
                    exitPromise,
                ]);
                this.initialized = true;
                exitPromise.catch(error => this._handleProcessError(error));
                this.worker.on('error', error => this._handleProcessError(error));
            }
            catch (e) {
                DEBUG_LOGGER('Failed to start cleanup process');
                DEBUG_LOGGER(e);
                this.initialized = false;
            }
            return this.initialized;
        });
        return this.initPromise;
    }
    async addDirectory(path) {
        if (!this.initialized)
            return;
        try {
            await this._waitResponseForMessage({ command: commands_1.default.add, path });
        }
        catch (e) {
            DEBUG_LOGGER(`Failed to add the ${path} directory to cleanup process`);
            DEBUG_LOGGER(e);
        }
    }
    async removeDirectory(path) {
        if (!this.initialized)
            return;
        try {
            await this._waitResponseForMessage({ command: commands_1.default.remove, path });
        }
        catch (e) {
            DEBUG_LOGGER(`Failed to remove the ${path} directory in cleanup process`);
            DEBUG_LOGGER(e);
        }
    }
}
exports.default = new CleanupProcess();
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbHMvdGVtcC1kaXJlY3RvcnkvY2xlYW51cC1wcm9jZXNzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaURBQXNDO0FBQ3RDLGtEQUEwQjtBQUMxQixzRUFBNkM7QUFDN0MsdUVBQXdFO0FBQ3hFLDBEQUFrQztBQUdsQyxNQUFNLFdBQVcsR0FBVyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3hELE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUU5RCxNQUFNLFlBQVksR0FBRyxJQUFBLGVBQUssRUFBQywrQ0FBK0MsQ0FBQyxDQUFDO0FBRTVFLE1BQU0sY0FBYztJQUNoQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQVMsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUksS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXpCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELFlBQVksQ0FBRSxFQUFFLEVBQUUsR0FBRztRQUNqQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDaEIsSUFBQSxpREFBeUIsRUFBQyxJQUFJLENBQUMsTUFBTSxrQkFBSSxFQUFFLElBQUssR0FBRyxFQUFHO1lBQ3RELElBQUksQ0FBQyxpQkFBaUIsRUFBRTtTQUMzQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsV0FBVyxDQUFFLFFBQVE7UUFDakIsTUFBTSxlQUFlLEdBQUcsSUFB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cUJBQXFCLElBQUksK0JBQStCLENBQUMsQ0FBQztZQUN2RSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLGVBQWUsQ0FBRSxJQUFJO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztZQUNqQixPQUFPO1FBRVgsSUFBSTtZQUNBLE1BQU0sSUFBSSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsT0FBTyxFQUFFLGtCQUFRLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDMUU7UUFDRCxPQUFPLENBQUMsRUFBRTtZQUNOLFlBQVksQ0FBQyx3QkFBd0IsSUFBSSwrQkFBK0IsQ0FBQyxDQUFDO1lBQzFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQjtJQUNMLENBQUM7Q0FDSjtBQUVELGtCQUFlLElBQUksY0FBYyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzcGF3biB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBwcm9taXNpZnlFdmVudCBmcm9tICdwcm9taXNpZnktZXZlbnQnO1xuaW1wb3J0IHsgc2VuZE1lc3NhZ2VUb0NoaWxkUHJvY2VzcyB9IGZyb20gJy4uLy4uL3Byb21pc2lmaWVkLWZ1bmN0aW9ucyc7XG5pbXBvcnQgQ09NTUFORFMgZnJvbSAnLi9jb21tYW5kcyc7XG5cblxuY29uc3QgV09SS0VSX1BBVEggICAgICAgICA9IHJlcXVpcmUucmVzb2x2ZSgnLi93b3JrZXInKTtcbmNvbnN0IFdPUktFUl9TVERJT19DT05GSUcgPSBbJ2lnbm9yZScsICdwaXBlJywgJ3BpcGUnLCAnaXBjJ107XG5cbmNvbnN0IERFQlVHX0xPR0dFUiA9IGRlYnVnKCd0ZXN0Y2FmZTp1dGlsczp0ZW1wLWRpcmVjdG9yeTpjbGVhbnVwLXByb2Nlc3MnKTtcblxuY2xhc3MgQ2xlYW51cFByb2Nlc3Mge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy53b3JrZXIgICAgICAgPSBudWxsO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkICA9IGZhbHNlO1xuICAgICAgICB0aGlzLmluaXRQcm9taXNlICA9IFByb21pc2UucmVzb2x2ZSh2b2lkIDApO1xuICAgICAgICB0aGlzLmVycm9yUHJvbWlzZSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5tZXNzYWdlQ291bnRlciA9IDA7XG5cbiAgICAgICAgdGhpcy5wZW5kaW5nUmVzcG9uc2VzID0ge307XG4gICAgfVxuXG4gICAgX3NlbmRNZXNzYWdlIChpZCwgbXNnKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJhY2UoW1xuICAgICAgICAgICAgc2VuZE1lc3NhZ2VUb0NoaWxkUHJvY2Vzcyh0aGlzLndvcmtlciwgeyBpZCwgLi4ubXNnIH0pLFxuICAgICAgICAgICAgdGhpcy5fd2FpdFByb2Nlc3NFcnJvcigpLFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBfb25SZXNwb25zZSAocmVzcG9uc2UpIHtcbiAgICAgICAgY29uc3QgcGVuZGluZ1Jlc3BvbnNlID0gdGhpcy5wZW5kaW5nUmVzcG9uc2VzW3Jlc3BvbnNlLmlkXTtcblxuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChwZW5kaW5nUmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgcGVuZGluZ1Jlc3BvbnNlLmNvbnRyb2wucmVqZWN0KHJlc3BvbnNlLmVycm9yKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmdSZXNwb25zZXNbcmVzcG9uc2UuaWRdID0gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBlbmRpbmdSZXNwb25zZSlcbiAgICAgICAgICAgIHBlbmRpbmdSZXNwb25zZS5jb250cm9sLnJlc29sdmUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5wZW5kaW5nUmVzcG9uc2VzW3Jlc3BvbnNlLmlkXSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIGFzeW5jIF93YWl0UmVzcG9uc2UgKGlkKSB7XG4gICAgICAgIGlmICghdGhpcy5wZW5kaW5nUmVzcG9uc2VzW2lkXSkge1xuICAgICAgICAgICAgY29uc3QgcHJvbWlzZUNvbnRyb2wgPSB7fTtcblxuICAgICAgICAgICAgdGhpcy5wZW5kaW5nUmVzcG9uc2VzW2lkXSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHByb21pc2VDb250cm9sLCB7IHJlc29sdmUsIHJlamVjdCB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdSZXNwb25zZXNbaWRdLmNvbnRyb2wgPSBwcm9taXNlQ29udHJvbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBlbmRpbmdSZXNwb25zZXNbaWRdO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMucGVuZGluZ1Jlc3BvbnNlc1tpZF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBfd2FpdFJlc3BvbnNlRm9yTWVzc2FnZSAobXNnKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJZCA9IHRoaXMubWVzc2FnZUNvdW50ZXI7XG5cbiAgICAgICAgdGhpcy5tZXNzYWdlQ291bnRlcisrO1xuXG4gICAgICAgIGF3YWl0IHRoaXMuX3NlbmRNZXNzYWdlKGN1cnJlbnRJZCwgbXNnKTtcbiAgICAgICAgYXdhaXQgdGhpcy5fd2FpdFJlc3BvbnNlKGN1cnJlbnRJZCk7XG4gICAgfVxuXG4gICAgX3dhaXRQcm9jZXNzRXhpdCAoKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlFdmVudCh0aGlzLndvcmtlciwgJ2V4aXQnKVxuICAgICAgICAgICAgLnRoZW4oZXhpdENvZGUgPT4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGBXb3JrZXIgcHJvY2VzcyB0ZXJtaW5hdGVkIHdpdGggY29kZSAke2V4aXRDb2RlfWApKSk7XG4gICAgfVxuXG4gICAgX3dhaXRQcm9jZXNzRXJyb3IgKCkge1xuICAgICAgICBpZiAodGhpcy5lcnJvclByb21pc2UpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lcnJvclByb21pc2U7XG5cbiAgICAgICAgdGhpcy5lcnJvclByb21pc2UgPSBwcm9taXNpZnlFdmVudCh0aGlzLndvcmtlciwgJ2Vycm9yJyk7XG5cbiAgICAgICAgdGhpcy5lcnJvclByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVycm9yUHJvbWlzZSA9IG51bGw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmVycm9yUHJvbWlzZTtcbiAgICB9XG5cbiAgICBfc2V0dXBXb3JrZXJFdmVudEhhbmRsZXJzICgpIHtcbiAgICAgICAgdGhpcy53b3JrZXIub24oJ21lc3NhZ2UnLCBtZXNzYWdlID0+IHRoaXMuX29uUmVzcG9uc2UobWVzc2FnZSkpO1xuXG4gICAgICAgIHRoaXMud29ya2VyLnN0ZG91dC5vbignZGF0YScsIGRhdGEgPT4gREVCVUdfTE9HR0VSKCdXb3JrZXIgcHJvY2VzcyBzdGRvdXQ6XFxuJywgU3RyaW5nKGRhdGEpKSk7XG4gICAgICAgIHRoaXMud29ya2VyLnN0ZGVyci5vbignZGF0YScsIGRhdGEgPT4gREVCVUdfTE9HR0VSKCdXb3JrZXIgcHJvY2VzcyBzdGRlcnI6XFxuJywgU3RyaW5nKGRhdGEpKSk7XG4gICAgfVxuXG4gICAgX3VucmVmV29ya2VyUHJvY2VzcyAoKSB7XG4gICAgICAgIHRoaXMud29ya2VyLnVucmVmKCk7XG4gICAgICAgIHRoaXMud29ya2VyLnN0ZG91dC51bnJlZigpO1xuICAgICAgICB0aGlzLndvcmtlci5zdGRlcnIudW5yZWYoKTtcblxuICAgICAgICBjb25zdCBjaGFubmVsID0gdGhpcy53b3JrZXIuY2hhbm5lbCB8fCB0aGlzLndvcmtlci5fY2hhbm5lbDtcblxuICAgICAgICBjaGFubmVsLnVucmVmKCk7XG4gICAgfVxuXG4gICAgX2hhbmRsZVByb2Nlc3NFcnJvciAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gICAgICAgIERFQlVHX0xPR0dFUihlcnJvcik7XG4gICAgfVxuXG4gICAgaW5pdCAoKSB7XG4gICAgICAgIHRoaXMuaW5pdFByb21pc2UgPSB0aGlzLmluaXRQcm9taXNlXG4gICAgICAgICAgICAudGhlbihhc3luYyBpbml0aWFsaXplZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYWxpemVkICE9PSB2b2lkIDApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbml0aWFsaXplZDtcblxuICAgICAgICAgICAgICAgIHRoaXMud29ya2VyID0gc3Bhd24ocHJvY2Vzcy5hcmd2MCwgW1dPUktFUl9QQVRIXSwgeyBkZXRhY2hlZDogdHJ1ZSwgc3RkaW86IFdPUktFUl9TVERJT19DT05GSUcgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9zZXR1cFdvcmtlckV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91bnJlZldvcmtlclByb2Nlc3MoKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGV4aXRQcm9taXNlID0gdGhpcy5fd2FpdFByb2Nlc3NFeGl0KCk7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBQcm9taXNlLnJhY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2FpdFJlc3BvbnNlRm9yTWVzc2FnZSh7IGNvbW1hbmQ6IENPTU1BTkRTLmluaXQgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl93YWl0UHJvY2Vzc0Vycm9yKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBleGl0UHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgZXhpdFByb21pc2UuY2F0Y2goZXJyb3IgPT4gdGhpcy5faGFuZGxlUHJvY2Vzc0Vycm9yKGVycm9yKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JrZXIub24oJ2Vycm9yJywgZXJyb3IgPT4gdGhpcy5faGFuZGxlUHJvY2Vzc0Vycm9yKGVycm9yKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIERFQlVHX0xPR0dFUignRmFpbGVkIHRvIHN0YXJ0IGNsZWFudXAgcHJvY2VzcycpO1xuICAgICAgICAgICAgICAgICAgICBERUJVR19MT0dHRVIoZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluaXRpYWxpemVkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdFByb21pc2U7XG4gICAgfVxuXG4gICAgYXN5bmMgYWRkRGlyZWN0b3J5IChwYXRoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fd2FpdFJlc3BvbnNlRm9yTWVzc2FnZSh7IGNvbW1hbmQ6IENPTU1BTkRTLmFkZCwgcGF0aCB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgREVCVUdfTE9HR0VSKGBGYWlsZWQgdG8gYWRkIHRoZSAke3BhdGh9IGRpcmVjdG9yeSB0byBjbGVhbnVwIHByb2Nlc3NgKTtcbiAgICAgICAgICAgIERFQlVHX0xPR0dFUihlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHJlbW92ZURpcmVjdG9yeSAocGF0aCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3dhaXRSZXNwb25zZUZvck1lc3NhZ2UoeyBjb21tYW5kOiBDT01NQU5EUy5yZW1vdmUsIHBhdGggfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIERFQlVHX0xPR0dFUihgRmFpbGVkIHRvIHJlbW92ZSB0aGUgJHtwYXRofSBkaXJlY3RvcnkgaW4gY2xlYW51cCBwcm9jZXNzYCk7XG4gICAgICAgICAgICBERUJVR19MT0dHRVIoZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBDbGVhbnVwUHJvY2VzcygpO1xuIl19