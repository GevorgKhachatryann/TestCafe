"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const delay_1 = __importDefault(require("../utils/delay"));
const thennable_1 = require("../utils/thennable");
const test_run_1 = require("../errors/test-run");
const re_executable_promise_1 = __importDefault(require("../utils/re-executable-promise"));
const get_fn_1 = __importDefault(require("./get-fn"));
const marker_1 = require("../services/serialization/replicator/transforms/function-marker-transform/marker");
const marker_2 = require("../services/serialization/replicator/transforms/promise-marker-transform/marker");
const ASSERTION_DELAY = 200;
class AssertionExecutor extends events_1.EventEmitter {
    constructor(command, timeout, callsite) {
        super();
        this.command = command;
        this.timeout = timeout;
        this.callsite = callsite;
        this.startTime = null;
        this.passed = false;
        this.inRetry = false;
        const fn = (0, get_fn_1.default)(this.command);
        const actualCommand = this.command.actual;
        if (actualCommand instanceof re_executable_promise_1.default)
            this.fn = this._wrapFunction(fn);
        else if (!this.command.options.allowUnawaitedPromise && this._isPromise(actualCommand))
            throw new test_run_1.AssertionUnawaitedPromiseError(this.callsite);
        else
            this.fn = fn;
    }
    _isPromise(val) {
        return (0, thennable_1.isThennable)(val) ||
            val === Symbol.for(marker_2.PROMISE_MARKER_DESCRIPTION);
    }
    _getTimeLeft() {
        const executionTime = new Date().getTime() - this.startTime; // eslint-disable-line @typescript-eslint/no-extra-parens
        return this.timeout - executionTime;
    }
    _onExecutionFinished() {
        if (this.inRetry)
            this.emit('end-assertion-retries', this.passed);
    }
    _wrapFunction(fn) {
        return async () => {
            const resultPromise = this.command.actual;
            while (!this.passed) {
                this.command.actual = await resultPromise._reExecute();
                try {
                    fn();
                    this.passed = true;
                    this._onExecutionFinished();
                }
                catch (err) {
                    if (this._getTimeLeft() <= 0) {
                        this._onExecutionFinished();
                        throw err;
                    }
                    await (0, delay_1.default)(ASSERTION_DELAY);
                    this.inRetry = true;
                    this.emit('start-assertion-retries', this._getTimeLeft());
                }
            }
        };
    }
    _onBeforeRun() {
        if (this.command.actual !== Symbol.for(marker_1.FUNCTION_MARKER_DESCRIPTION))
            return;
        this.emit('non-serializable-actual-value', this);
    }
    async run() {
        this._onBeforeRun();
        this.startTime = new Date().getTime();
        try {
            await this.fn();
        }
        catch (err) {
            if (err.name === 'AssertionError' || err.constructor.name === 'AssertionError')
                throw new test_run_1.ExternalAssertionLibraryError(err, this.callsite);
            if (err.isTestCafeError)
                err.callsite = this.callsite;
            throw err;
        }
    }
}
exports.default = AssertionExecutor;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXNzZXJ0aW9ucy9leGVjdXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG1DQUFzQztBQUN0QywyREFBbUM7QUFDbkMsa0RBQWlEO0FBQ2pELGlEQUFtRztBQUNuRywyRkFBaUU7QUFDakUsc0RBQTZCO0FBRzdCLDZHQUErSDtBQUMvSCw0R0FBNkg7QUFFN0gsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFDO0FBRTVCLE1BQXFCLGlCQUFrQixTQUFRLHFCQUFZO0lBU3ZELFlBQW9CLE9BQXlCLEVBQUUsT0FBZSxFQUFFLFFBQXdCO1FBQ3BGLEtBQUssRUFBRSxDQUFDO1FBRVIsSUFBSSxDQUFDLE9BQU8sR0FBSSxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBSSxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBTSxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBSyxLQUFLLENBQUM7UUFFdkIsTUFBTSxFQUFFLEdBQWMsSUFBQSxnQkFBSyxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUUxQyxJQUFJLGFBQWEsWUFBWSwrQkFBbUI7WUFDNUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUNsRixNQUFNLElBQUkseUNBQThCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztZQUV4RCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU8sVUFBVSxDQUFFLEdBQVk7UUFDNUIsT0FBTyxJQUFBLHVCQUFXLEVBQUMsR0FBRyxDQUFDO1lBQ25CLEdBQUcsS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLG1DQUEwQixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVPLFlBQVk7UUFDaEIsTUFBTSxhQUFhLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBSSxJQUFJLENBQUMsU0FBb0IsQ0FBQyxDQUFDLHlEQUF5RDtRQUVsSSxPQUFPLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO0lBQ3hDLENBQUM7SUFFTyxvQkFBb0I7UUFDeEIsSUFBSSxJQUFJLENBQUMsT0FBTztZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFTyxhQUFhLENBQUUsRUFBWTtRQUMvQixPQUFPLEtBQUssSUFBSSxFQUFFO1lBQ2QsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUE2QixDQUFDO1lBRWpFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFFdkQsSUFBSTtvQkFDQSxFQUFFLEVBQUUsQ0FBQztvQkFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDbkIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7aUJBQy9CO2dCQUVELE9BQU8sR0FBRyxFQUFFO29CQUNSLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRTt3QkFDMUIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7d0JBQzVCLE1BQU0sR0FBRyxDQUFDO3FCQUNiO29CQUVELE1BQU0sSUFBQSxlQUFLLEVBQUMsZUFBZSxDQUFDLENBQUM7b0JBRTdCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO2lCQUM3RDthQUNKO1FBQ0wsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVPLFlBQVk7UUFDaEIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLG9DQUEyQixDQUFDO1lBQy9ELE9BQU87UUFFWCxJQUFJLENBQUMsSUFBSSxDQUFDLCtCQUErQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTSxLQUFLLENBQUMsR0FBRztRQUNaLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFdEMsSUFBSTtZQUNBLE1BQU0sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ25CO1FBRUQsT0FBTyxHQUFRLEVBQUU7WUFDYixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssZ0JBQWdCLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssZ0JBQWdCO2dCQUMxRSxNQUFNLElBQUksd0NBQTZCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVoRSxJQUFJLEdBQUcsQ0FBQyxlQUFlO2dCQUNuQixHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFFakMsTUFBTSxHQUFHLENBQUM7U0FDYjtJQUNMLENBQUM7Q0FDSjtBQXJHRCxvQ0FxR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IGRlbGF5IGZyb20gJy4uL3V0aWxzL2RlbGF5JztcbmltcG9ydCB7IGlzVGhlbm5hYmxlIH0gZnJvbSAnLi4vdXRpbHMvdGhlbm5hYmxlJztcbmltcG9ydCB7IEV4dGVybmFsQXNzZXJ0aW9uTGlicmFyeUVycm9yLCBBc3NlcnRpb25VbmF3YWl0ZWRQcm9taXNlRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvdGVzdC1ydW4nO1xuaW1wb3J0IFJlRXhlY3V0YWJsZVByb21pc2UgZnJvbSAnLi4vdXRpbHMvcmUtZXhlY3V0YWJsZS1wcm9taXNlJztcbmltcG9ydCBnZXRGbiBmcm9tICcuL2dldC1mbic7XG5pbXBvcnQgeyBBc3NlcnRpb25Db21tYW5kIH0gZnJvbSAnLi4vdGVzdC1ydW4vY29tbWFuZHMvYXNzZXJ0aW9uJztcbmltcG9ydCB7IENhbGxzaXRlUmVjb3JkIH0gZnJvbSAnY2FsbHNpdGUtcmVjb3JkJztcbmltcG9ydCB7IEZVTkNUSU9OX01BUktFUl9ERVNDUklQVElPTiB9IGZyb20gJy4uL3NlcnZpY2VzL3NlcmlhbGl6YXRpb24vcmVwbGljYXRvci90cmFuc2Zvcm1zL2Z1bmN0aW9uLW1hcmtlci10cmFuc2Zvcm0vbWFya2VyJztcbmltcG9ydCB7IFBST01JU0VfTUFSS0VSX0RFU0NSSVBUSU9OIH0gZnJvbSAnLi4vc2VydmljZXMvc2VyaWFsaXphdGlvbi9yZXBsaWNhdG9yL3RyYW5zZm9ybXMvcHJvbWlzZS1tYXJrZXItdHJhbnNmb3JtL21hcmtlcic7XG5cbmNvbnN0IEFTU0VSVElPTl9ERUxBWSA9IDIwMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXNzZXJ0aW9uRXhlY3V0b3IgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIHB1YmxpYyByZWFkb25seSBjb21tYW5kOiBBc3NlcnRpb25Db21tYW5kO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdGltZW91dDogbnVtYmVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FsbHNpdGU6IENhbGxzaXRlUmVjb3JkO1xuICAgIHByaXZhdGUgc3RhcnRUaW1lOiBudW1iZXIgfCBudWxsO1xuICAgIHByaXZhdGUgcGFzc2VkOiBib29sZWFuO1xuICAgIHByaXZhdGUgaW5SZXRyeTogYm9vbGVhbjtcbiAgICBwdWJsaWMgZm46IEZ1bmN0aW9uO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yIChjb21tYW5kOiBBc3NlcnRpb25Db21tYW5kLCB0aW1lb3V0OiBudW1iZXIsIGNhbGxzaXRlOiBDYWxsc2l0ZVJlY29yZCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuY29tbWFuZCAgPSBjb21tYW5kO1xuICAgICAgICB0aGlzLnRpbWVvdXQgID0gdGltZW91dDtcbiAgICAgICAgdGhpcy5jYWxsc2l0ZSA9IGNhbGxzaXRlO1xuXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5wYXNzZWQgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pblJldHJ5ICAgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBmbiAgICAgICAgICAgID0gZ2V0Rm4odGhpcy5jb21tYW5kKTtcbiAgICAgICAgY29uc3QgYWN0dWFsQ29tbWFuZCA9IHRoaXMuY29tbWFuZC5hY3R1YWw7XG5cbiAgICAgICAgaWYgKGFjdHVhbENvbW1hbmQgaW5zdGFuY2VvZiBSZUV4ZWN1dGFibGVQcm9taXNlKVxuICAgICAgICAgICAgdGhpcy5mbiA9IHRoaXMuX3dyYXBGdW5jdGlvbihmbik7XG4gICAgICAgIGVsc2UgaWYgKCF0aGlzLmNvbW1hbmQub3B0aW9ucy5hbGxvd1VuYXdhaXRlZFByb21pc2UgJiYgdGhpcy5faXNQcm9taXNlKGFjdHVhbENvbW1hbmQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFzc2VydGlvblVuYXdhaXRlZFByb21pc2VFcnJvcih0aGlzLmNhbGxzaXRlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5mbiA9IGZuO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lzUHJvbWlzZSAodmFsOiB1bmtub3duKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc1RoZW5uYWJsZSh2YWwpIHx8XG4gICAgICAgICAgICB2YWwgPT09IFN5bWJvbC5mb3IoUFJPTUlTRV9NQVJLRVJfREVTQ1JJUFRJT04pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFRpbWVMZWZ0ICgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBleGVjdXRpb25UaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSAodGhpcy5zdGFydFRpbWUgYXMgbnVtYmVyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXh0cmEtcGFyZW5zXG5cbiAgICAgICAgcmV0dXJuIHRoaXMudGltZW91dCAtIGV4ZWN1dGlvblRpbWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25FeGVjdXRpb25GaW5pc2hlZCAoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmluUmV0cnkpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2VuZC1hc3NlcnRpb24tcmV0cmllcycsIHRoaXMucGFzc2VkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF93cmFwRnVuY3Rpb24gKGZuOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICAgICAgcmV0dXJuIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdFByb21pc2UgPSB0aGlzLmNvbW1hbmQuYWN0dWFsIGFzIFJlRXhlY3V0YWJsZVByb21pc2U7XG5cbiAgICAgICAgICAgIHdoaWxlICghdGhpcy5wYXNzZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmQuYWN0dWFsID0gYXdhaXQgcmVzdWx0UHJvbWlzZS5fcmVFeGVjdXRlKCk7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhc3NlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uRXhlY3V0aW9uRmluaXNoZWQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9nZXRUaW1lTGVmdCgpIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29uRXhlY3V0aW9uRmluaXNoZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRlbGF5KEFTU0VSVElPTl9ERUxBWSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pblJldHJ5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdzdGFydC1hc3NlcnRpb24tcmV0cmllcycsIHRoaXMuX2dldFRpbWVMZWZ0KCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vbkJlZm9yZVJ1biAoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNvbW1hbmQuYWN0dWFsICE9PSBTeW1ib2wuZm9yKEZVTkNUSU9OX01BUktFUl9ERVNDUklQVElPTikpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5lbWl0KCdub24tc2VyaWFsaXphYmxlLWFjdHVhbC12YWx1ZScsIHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBydW4gKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLl9vbkJlZm9yZVJ1bigpO1xuXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZm4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgICAgICAgaWYgKGVyci5uYW1lID09PSAnQXNzZXJ0aW9uRXJyb3InIHx8IGVyci5jb25zdHJ1Y3Rvci5uYW1lID09PSAnQXNzZXJ0aW9uRXJyb3InKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeHRlcm5hbEFzc2VydGlvbkxpYnJhcnlFcnJvcihlcnIsIHRoaXMuY2FsbHNpdGUpO1xuXG4gICAgICAgICAgICBpZiAoZXJyLmlzVGVzdENhZmVFcnJvcilcbiAgICAgICAgICAgICAgICBlcnIuY2FsbHNpdGUgPSB0aGlzLmNhbGxzaXRlO1xuXG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=