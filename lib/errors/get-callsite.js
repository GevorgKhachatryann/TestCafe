"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallsiteForError = exports.getCallsiteForMethod = void 0;
const callsite_record_1 = __importDefault(require("callsite-record"));
const stack_cleaning_hook_1 = __importDefault(require("./stack-cleaning-hook"));
const source_map_support_1 = require("source-map-support");
const STACK_TRACE_LIMIT = 2000;
function getCallsite(options) {
    const originalStackCleaningEnabled = stack_cleaning_hook_1.default.enabled;
    const originalStackTraceLimit = Error.stackTraceLimit;
    stack_cleaning_hook_1.default.enabled = false;
    Error.stackTraceLimit = STACK_TRACE_LIMIT;
    const callsiteRecord = (0, callsite_record_1.default)(options);
    Error.stackTraceLimit = originalStackTraceLimit;
    stack_cleaning_hook_1.default.enabled = originalStackCleaningEnabled;
    return callsiteRecord;
}
function getCallsiteForMethod(methodName, typeName) {
    return getCallsite({ byFunctionName: methodName, typeName, processFrameFn: source_map_support_1.wrapCallSite });
}
exports.getCallsiteForMethod = getCallsiteForMethod;
function getCallsiteForError(error, isCallsiteFrame) {
    // NOTE: "source-map-support" process this kind of error automatically, cause
    // in this case there is an appeal to "err.stack" inside "callsite-record" which
    // provokes wrapping of frames, so there is no need to specify "processFrameFn".
    return getCallsite({ forError: error, isCallsiteFrame });
}
exports.getCallsiteForError = getCallsiteForError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNhbGxzaXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Vycm9ycy9nZXQtY2FsbHNpdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0VBQW1EO0FBQ25ELGdGQUFzRDtBQUN0RCwyREFBa0Q7QUFFbEQsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUM7QUFFL0IsU0FBUyxXQUFXLENBQUUsT0FBTztJQUN6QixNQUFNLDRCQUE0QixHQUFHLDZCQUFpQixDQUFDLE9BQU8sQ0FBQztJQUMvRCxNQUFNLHVCQUF1QixHQUFRLEtBQUssQ0FBQyxlQUFlLENBQUM7SUFFM0QsNkJBQWlCLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNsQyxLQUFLLENBQUMsZUFBZSxHQUFPLGlCQUFpQixDQUFDO0lBRTlDLE1BQU0sY0FBYyxHQUFHLElBQUEseUJBQW9CLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFFckQsS0FBSyxDQUFDLGVBQWUsR0FBTyx1QkFBdUIsQ0FBQztJQUNwRCw2QkFBaUIsQ0FBQyxPQUFPLEdBQUcsNEJBQTRCLENBQUM7SUFFekQsT0FBTyxjQUFjLENBQUM7QUFDMUIsQ0FBQztBQUVELFNBQWdCLG9CQUFvQixDQUFFLFVBQVUsRUFBRSxRQUFRO0lBQ3RELE9BQU8sV0FBVyxDQUFDLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLGlDQUFZLEVBQUUsQ0FBQyxDQUFDO0FBQy9GLENBQUM7QUFGRCxvREFFQztBQUVELFNBQWdCLG1CQUFtQixDQUFFLEtBQUssRUFBRSxlQUFlO0lBQ3ZELDZFQUE2RTtJQUM3RSxnRkFBZ0Y7SUFDaEYsZ0ZBQWdGO0lBQ2hGLE9BQU8sV0FBVyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFMRCxrREFLQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVDYWxsc2l0ZVJlY29yZCBmcm9tICdjYWxsc2l0ZS1yZWNvcmQnO1xuaW1wb3J0IHN0YWNrQ2xlYW5pbmdIb29rIGZyb20gJy4vc3RhY2stY2xlYW5pbmctaG9vayc7XG5pbXBvcnQgeyB3cmFwQ2FsbFNpdGUgfSBmcm9tICdzb3VyY2UtbWFwLXN1cHBvcnQnO1xuXG5jb25zdCBTVEFDS19UUkFDRV9MSU1JVCA9IDIwMDA7XG5cbmZ1bmN0aW9uIGdldENhbGxzaXRlIChvcHRpb25zKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxTdGFja0NsZWFuaW5nRW5hYmxlZCA9IHN0YWNrQ2xlYW5pbmdIb29rLmVuYWJsZWQ7XG4gICAgY29uc3Qgb3JpZ2luYWxTdGFja1RyYWNlTGltaXQgICAgICA9IEVycm9yLnN0YWNrVHJhY2VMaW1pdDtcblxuICAgIHN0YWNrQ2xlYW5pbmdIb29rLmVuYWJsZWQgPSBmYWxzZTtcbiAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgICAgID0gU1RBQ0tfVFJBQ0VfTElNSVQ7XG5cbiAgICBjb25zdCBjYWxsc2l0ZVJlY29yZCA9IGNyZWF0ZUNhbGxzaXRlUmVjb3JkKG9wdGlvbnMpO1xuXG4gICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ICAgICA9IG9yaWdpbmFsU3RhY2tUcmFjZUxpbWl0O1xuICAgIHN0YWNrQ2xlYW5pbmdIb29rLmVuYWJsZWQgPSBvcmlnaW5hbFN0YWNrQ2xlYW5pbmdFbmFibGVkO1xuXG4gICAgcmV0dXJuIGNhbGxzaXRlUmVjb3JkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2FsbHNpdGVGb3JNZXRob2QgKG1ldGhvZE5hbWUsIHR5cGVOYW1lKSB7XG4gICAgcmV0dXJuIGdldENhbGxzaXRlKHsgYnlGdW5jdGlvbk5hbWU6IG1ldGhvZE5hbWUsIHR5cGVOYW1lLCBwcm9jZXNzRnJhbWVGbjogd3JhcENhbGxTaXRlIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2FsbHNpdGVGb3JFcnJvciAoZXJyb3IsIGlzQ2FsbHNpdGVGcmFtZSkge1xuICAgIC8vIE5PVEU6IFwic291cmNlLW1hcC1zdXBwb3J0XCIgcHJvY2VzcyB0aGlzIGtpbmQgb2YgZXJyb3IgYXV0b21hdGljYWxseSwgY2F1c2VcbiAgICAvLyBpbiB0aGlzIGNhc2UgdGhlcmUgaXMgYW4gYXBwZWFsIHRvIFwiZXJyLnN0YWNrXCIgaW5zaWRlIFwiY2FsbHNpdGUtcmVjb3JkXCIgd2hpY2hcbiAgICAvLyBwcm92b2tlcyB3cmFwcGluZyBvZiBmcmFtZXMsIHNvIHRoZXJlIGlzIG5vIG5lZWQgdG8gc3BlY2lmeSBcInByb2Nlc3NGcmFtZUZuXCIuXG4gICAgcmV0dXJuIGdldENhbGxzaXRlKHsgZm9yRXJyb3I6IGVycm9yLCBpc0NhbGxzaXRlRnJhbWUgfSk7XG59XG4iXX0=