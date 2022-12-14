"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hook_1 = __importDefault(require("../hook"));
const testcafe_hammerhead_1 = require("testcafe-hammerhead");
const runtime_1 = require("../../../errors/runtime");
const types_1 = require("../../../errors/types");
const warning_message_1 = __importDefault(require("../../../notifications/warning-message"));
class RequestMock extends hook_1.default {
    constructor() {
        super([]);
        this._pendingRequestFilterRuleInit = null;
        this.mocks = new Map();
    }
    async onRequest(event) {
        const mock = this.mocks.get(event.requestFilterRule.id);
        await event.setMock(mock);
    }
    async onResponse(event) {
        if (event.isSameOriginPolicyFailed && this._warningLog)
            this._warningLog.addWarning(warning_message_1.default.requestMockCORSValidationFailed, RequestMock.name, event.requestFilterRule);
    }
    // API
    onRequestTo(requestFilterRuleInit) {
        if (this._pendingRequestFilterRuleInit)
            throw new runtime_1.APIError('onRequestTo', types_1.RUNTIME_ERRORS.requestHookConfigureAPIError, RequestMock.name, "The 'respond' method was not called after 'onRequestTo'. You must call the 'respond' method to provide the mocked response.");
        this._pendingRequestFilterRuleInit = requestFilterRuleInit;
        return this;
    }
    respond(body, statusCode, headers) {
        if (!this._pendingRequestFilterRuleInit)
            throw new runtime_1.APIError('respond', types_1.RUNTIME_ERRORS.requestHookConfigureAPIError, RequestMock.name, "The 'onRequestTo' method was not called before 'respond'. You must call the 'onRequestTo' method to provide the URL requests to which are mocked.");
        const mock = new testcafe_hammerhead_1.ResponseMock(body, statusCode, headers);
        const rule = new testcafe_hammerhead_1.RequestFilterRule(this._pendingRequestFilterRuleInit);
        this._requestFilterRules.push(rule);
        this.mocks.set(rule.id, mock);
        this._pendingRequestFilterRuleInit = null;
        return this;
    }
}
exports.default = RequestMock;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3JlcXVlc3QtaG9va3MvcmVxdWVzdC1tb2NrL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbURBQWtDO0FBRWxDLDZEQU02QjtBQUU3QixxREFBbUQ7QUFDbkQsaURBQXVEO0FBQ3ZELDZGQUFxRTtBQUdyRSxNQUFxQixXQUFZLFNBQVEsY0FBVztJQUloRDtRQUNJLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVWLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBMkIsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRU0sS0FBSyxDQUFDLFNBQVMsQ0FBRSxLQUFtQjtRQUN2QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFpQixDQUFDO1FBRXhFLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBRSxLQUFvQjtRQUN6QyxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsSUFBSSxJQUFJLENBQUMsV0FBVztZQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyx5QkFBZSxDQUFDLCtCQUErQixFQUFFLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDaEksQ0FBQztJQUVELE1BQU07SUFDQyxXQUFXLENBQUUscUJBQTRDO1FBQzVELElBQUksSUFBSSxDQUFDLDZCQUE2QjtZQUNsQyxNQUFNLElBQUksa0JBQVEsQ0FBQyxhQUFhLEVBQUUsc0JBQWMsQ0FBQyw0QkFBNEIsRUFBRSxXQUFXLENBQUMsSUFBSSxFQUFFLDZIQUE2SCxDQUFDLENBQUM7UUFFcE8sSUFBSSxDQUFDLDZCQUE2QixHQUFHLHFCQUFxQixDQUFDO1FBRTNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxPQUFPLENBQUUsSUFBdUIsRUFBRSxVQUFtQixFQUFFLE9BQWdCO1FBQzFFLElBQUksQ0FBQyxJQUFJLENBQUMsNkJBQTZCO1lBQ25DLE1BQU0sSUFBSSxrQkFBUSxDQUFDLFNBQVMsRUFBRSxzQkFBYyxDQUFDLDRCQUE0QixFQUFFLFdBQVcsQ0FBQyxJQUFJLEVBQUUsbUpBQW1KLENBQUMsQ0FBQztRQUV0UCxNQUFNLElBQUksR0FBRyxJQUFJLGtDQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6RCxNQUFNLElBQUksR0FBRyxJQUFJLHVDQUFpQixDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBRXZFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUU5QixJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDO1FBRTFDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQTlDRCw4QkE4Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVxdWVzdEhvb2sgZnJvbSAnLi4vaG9vayc7XG5cbmltcG9ydCB7XG4gICAgUmVzcG9uc2VNb2NrLFxuICAgIFJlcXVlc3RFdmVudCxcbiAgICBSZXNwb25zZUV2ZW50LFxuICAgIFJlcXVlc3RGaWx0ZXJSdWxlSW5pdCxcbiAgICBSZXF1ZXN0RmlsdGVyUnVsZSxcbn0gZnJvbSAndGVzdGNhZmUtaGFtbWVyaGVhZCc7XG5cbmltcG9ydCB7IEFQSUVycm9yIH0gZnJvbSAnLi4vLi4vLi4vZXJyb3JzL3J1bnRpbWUnO1xuaW1wb3J0IHsgUlVOVElNRV9FUlJPUlMgfSBmcm9tICcuLi8uLi8uLi9lcnJvcnMvdHlwZXMnO1xuaW1wb3J0IFdBUk5JTkdfTUVTU0FHRSBmcm9tICcuLi8uLi8uLi9ub3RpZmljYXRpb25zL3dhcm5pbmctbWVzc2FnZSc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVxdWVzdE1vY2sgZXh0ZW5kcyBSZXF1ZXN0SG9vayB7XG4gICAgcHJpdmF0ZSBfcGVuZGluZ1JlcXVlc3RGaWx0ZXJSdWxlSW5pdDogbnVsbCB8IFJlcXVlc3RGaWx0ZXJSdWxlSW5pdDtcbiAgICBwdWJsaWMgbW9ja3M6IE1hcDxzdHJpbmcsIFJlc3BvbnNlTW9jaz47XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcihbXSk7XG5cbiAgICAgICAgdGhpcy5fcGVuZGluZ1JlcXVlc3RGaWx0ZXJSdWxlSW5pdCA9IG51bGw7XG4gICAgICAgIHRoaXMubW9ja3MgICAgICAgICAgICAgICAgICAgICAgICAgPSBuZXcgTWFwKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIG9uUmVxdWVzdCAoZXZlbnQ6IFJlcXVlc3RFdmVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBtb2NrID0gdGhpcy5tb2Nrcy5nZXQoZXZlbnQucmVxdWVzdEZpbHRlclJ1bGUuaWQpIGFzIFJlc3BvbnNlTW9jaztcblxuICAgICAgICBhd2FpdCBldmVudC5zZXRNb2NrKG1vY2spO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBvblJlc3BvbnNlIChldmVudDogUmVzcG9uc2VFdmVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAoZXZlbnQuaXNTYW1lT3JpZ2luUG9saWN5RmFpbGVkICYmIHRoaXMuX3dhcm5pbmdMb2cpXG4gICAgICAgICAgICB0aGlzLl93YXJuaW5nTG9nLmFkZFdhcm5pbmcoV0FSTklOR19NRVNTQUdFLnJlcXVlc3RNb2NrQ09SU1ZhbGlkYXRpb25GYWlsZWQsIFJlcXVlc3RNb2NrLm5hbWUsIGV2ZW50LnJlcXVlc3RGaWx0ZXJSdWxlKTtcbiAgICB9XG5cbiAgICAvLyBBUElcbiAgICBwdWJsaWMgb25SZXF1ZXN0VG8gKHJlcXVlc3RGaWx0ZXJSdWxlSW5pdDogUmVxdWVzdEZpbHRlclJ1bGVJbml0KTogUmVxdWVzdE1vY2sge1xuICAgICAgICBpZiAodGhpcy5fcGVuZGluZ1JlcXVlc3RGaWx0ZXJSdWxlSW5pdClcbiAgICAgICAgICAgIHRocm93IG5ldyBBUElFcnJvcignb25SZXF1ZXN0VG8nLCBSVU5USU1FX0VSUk9SUy5yZXF1ZXN0SG9va0NvbmZpZ3VyZUFQSUVycm9yLCBSZXF1ZXN0TW9jay5uYW1lLCBcIlRoZSAncmVzcG9uZCcgbWV0aG9kIHdhcyBub3QgY2FsbGVkIGFmdGVyICdvblJlcXVlc3RUbycuIFlvdSBtdXN0IGNhbGwgdGhlICdyZXNwb25kJyBtZXRob2QgdG8gcHJvdmlkZSB0aGUgbW9ja2VkIHJlc3BvbnNlLlwiKTtcblxuICAgICAgICB0aGlzLl9wZW5kaW5nUmVxdWVzdEZpbHRlclJ1bGVJbml0ID0gcmVxdWVzdEZpbHRlclJ1bGVJbml0O1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNwb25kIChib2R5OiBzdHJpbmcgfCBGdW5jdGlvbiwgc3RhdHVzQ29kZT86IG51bWJlciwgaGVhZGVycz86IG9iamVjdCk6IFJlcXVlc3RNb2NrIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wZW5kaW5nUmVxdWVzdEZpbHRlclJ1bGVJbml0KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKCdyZXNwb25kJywgUlVOVElNRV9FUlJPUlMucmVxdWVzdEhvb2tDb25maWd1cmVBUElFcnJvciwgUmVxdWVzdE1vY2submFtZSwgXCJUaGUgJ29uUmVxdWVzdFRvJyBtZXRob2Qgd2FzIG5vdCBjYWxsZWQgYmVmb3JlICdyZXNwb25kJy4gWW91IG11c3QgY2FsbCB0aGUgJ29uUmVxdWVzdFRvJyBtZXRob2QgdG8gcHJvdmlkZSB0aGUgVVJMIHJlcXVlc3RzIHRvIHdoaWNoIGFyZSBtb2NrZWQuXCIpO1xuXG4gICAgICAgIGNvbnN0IG1vY2sgPSBuZXcgUmVzcG9uc2VNb2NrKGJvZHksIHN0YXR1c0NvZGUsIGhlYWRlcnMpO1xuICAgICAgICBjb25zdCBydWxlID0gbmV3IFJlcXVlc3RGaWx0ZXJSdWxlKHRoaXMuX3BlbmRpbmdSZXF1ZXN0RmlsdGVyUnVsZUluaXQpO1xuXG4gICAgICAgIHRoaXMuX3JlcXVlc3RGaWx0ZXJSdWxlcy5wdXNoKHJ1bGUpO1xuICAgICAgICB0aGlzLm1vY2tzLnNldChydWxlLmlkLCBtb2NrKTtcblxuICAgICAgICB0aGlzLl9wZW5kaW5nUmVxdWVzdEZpbHRlclJ1bGVJbml0ID0gbnVsbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iXX0=