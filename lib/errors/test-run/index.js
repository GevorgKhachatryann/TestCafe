"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleWindowsModeIsNotAvailableInRemoteBrowserError = exports.MultipleWindowsModeIsDisabledError = exports.RequestHookNotImplementedMethodError = exports.RequestHookUnhandledError = exports.RequestHookBaseError = exports.SetNativeDialogHandlerCodeWrongTypeError = exports.RoleSwitchInRoleInitializerError = exports.ForbiddenCharactersInScreenshotPathError = exports.WindowDimensionsOverflowError = exports.UncaughtTestCafeErrorInCustomScript = exports.UncaughtErrorInCustomScript = exports.ActionSkipJsErrorsArgumentTypeError = exports.ActionUrlArgumentError = exports.ActionRequiredCookieArguments = exports.ActionUrlsCookieArgumentError = exports.ActionUrlCookieArgumentError = exports.ActionCookieArgumentsError = exports.ActionCookieArgumentError = exports.ActionUnsupportedDeviceTypeError = exports.SetTestSpeedArgumentError = exports.ActionStringArrayElementError = exports.ActionStringOrStringArrayArgumentError = exports.ActionPositiveIntegerArgumentError = exports.ActionFunctionArgumentError = exports.ActionRoleArgumentError = exports.ActionIntegerArgumentError = exports.ActionNullableStringArgumentError = exports.ActionStringArgumentError = exports.ActionOptionsTypeError = exports.ActionBooleanArgumentError = exports.AssertionUnawaitedPromiseError = exports.AssertionWithoutMethodCallError = exports.AssertionExecutableArgumentError = exports.ExternalAssertionLibraryError = exports.UncaughtExceptionError = exports.UnhandledPromiseRejectionError = exports.UncaughtNonErrorObjectInTestCode = exports.UncaughtErrorInTestCode = exports.RunTimeoutError = exports.TestTimeoutError = exports.TimeoutError = exports.PageLoadError = exports.ActionSelectorError = exports.MissingAwaitError = void 0;
const types_1 = require("../types");
const diff = __importStar(require("../../utils/diff/"));
const errors_1 = require("../../shared/errors");
__exportStar(require("../../shared/errors"), exports);
// Base
//--------------------------------------------------------------------
class ActionArgumentErrorBase extends errors_1.TestRunErrorBase {
    constructor(code, argumentName, actualValue) {
        super(code);
        this.argumentName = argumentName;
        this.actualValue = actualValue;
    }
}
// Synchronization errors
//--------------------------------------------------------------------
class MissingAwaitError extends errors_1.TestRunErrorBase {
    constructor(callsite) {
        super(types_1.TEST_RUN_ERRORS.missingAwaitError);
        this.callsite = callsite;
    }
}
exports.MissingAwaitError = MissingAwaitError;
// Selector errors
//--------------------------------------------------------------------
class ActionSelectorError extends errors_1.TestRunErrorBase {
    constructor(selectorName, err, isAPIError) {
        super(types_1.TEST_RUN_ERRORS.actionSelectorError);
        this.selectorName = selectorName;
        this.errMsg = isAPIError ? err.rawMessage : err.message;
        this.originError = err;
    }
}
exports.ActionSelectorError = ActionSelectorError;
// Page errors
//--------------------------------------------------------------------
class PageLoadError extends errors_1.TestRunErrorBase {
    constructor(errMsg, url) {
        super(types_1.TEST_RUN_ERRORS.pageLoadError);
        this.url = url;
        this.errMsg = errMsg;
    }
}
exports.PageLoadError = PageLoadError;
// Timeout errors
//--------------------------------------------------------------------
class TimeoutError extends errors_1.TestRunErrorBase {
    constructor(timeout, scope) {
        super(types_1.TEST_RUN_ERRORS.executionTimeoutExceeded);
        this.timeout = timeout;
        this.scope = scope;
    }
}
exports.TimeoutError = TimeoutError;
class TestTimeoutError extends TimeoutError {
    constructor(timeout) {
        super(timeout, 'Test');
    }
}
exports.TestTimeoutError = TestTimeoutError;
class RunTimeoutError extends TimeoutError {
    constructor(timeout) {
        super(timeout, 'Run');
    }
}
exports.RunTimeoutError = RunTimeoutError;
// Uncaught errors
//--------------------------------------------------------------------
class UncaughtErrorInTestCode extends errors_1.TestRunErrorBase {
    constructor(err, callsite) {
        super(types_1.TEST_RUN_ERRORS.uncaughtErrorInTestCode);
        this.errMsg = String(err.rawMessage || err);
        this.callsite = err.callsite || callsite;
        this.originError = err;
    }
}
exports.UncaughtErrorInTestCode = UncaughtErrorInTestCode;
class UncaughtNonErrorObjectInTestCode extends errors_1.TestRunErrorBase {
    constructor(obj) {
        super(types_1.TEST_RUN_ERRORS.uncaughtNonErrorObjectInTestCode);
        this.objType = typeof obj;
        this.objStr = String(obj);
    }
}
exports.UncaughtNonErrorObjectInTestCode = UncaughtNonErrorObjectInTestCode;
class UnhandledPromiseRejectionError extends errors_1.TestRunErrorBase {
    constructor(err) {
        super(types_1.TEST_RUN_ERRORS.unhandledPromiseRejection);
        this.errMsg = String(err);
    }
}
exports.UnhandledPromiseRejectionError = UnhandledPromiseRejectionError;
class UncaughtExceptionError extends errors_1.TestRunErrorBase {
    constructor(err) {
        super(types_1.TEST_RUN_ERRORS.uncaughtException);
        this.errMsg = String(err);
    }
}
exports.UncaughtExceptionError = UncaughtExceptionError;
// Assertion errors
//--------------------------------------------------------------------
class ExternalAssertionLibraryError extends errors_1.TestRunErrorBase {
    constructor(err, callsite) {
        super(types_1.TEST_RUN_ERRORS.externalAssertionLibraryError);
        this.errMsg = String(err);
        this.diff = (err === null || err === void 0 ? void 0 : err.showDiff) && diff.generate(err.actual, err.expected);
        this.callsite = callsite;
    }
}
exports.ExternalAssertionLibraryError = ExternalAssertionLibraryError;
class AssertionExecutableArgumentError extends ActionArgumentErrorBase {
    constructor(argumentName, argumentValue, err, isAPIError) {
        super(types_1.TEST_RUN_ERRORS.assertionExecutableArgumentError, argumentName, argumentValue);
        this.errMsg = isAPIError ? err.rawMessage : err.message;
        this.originError = err;
    }
}
exports.AssertionExecutableArgumentError = AssertionExecutableArgumentError;
class AssertionWithoutMethodCallError extends errors_1.TestRunErrorBase {
    constructor(callsite) {
        super(types_1.TEST_RUN_ERRORS.assertionWithoutMethodCallError);
        this.callsite = callsite;
    }
}
exports.AssertionWithoutMethodCallError = AssertionWithoutMethodCallError;
class AssertionUnawaitedPromiseError extends errors_1.TestRunErrorBase {
    constructor(callsite) {
        super(types_1.TEST_RUN_ERRORS.assertionUnawaitedPromiseError);
        this.callsite = callsite;
    }
}
exports.AssertionUnawaitedPromiseError = AssertionUnawaitedPromiseError;
// Action parameters errors
//--------------------------------------------------------------------
// Options errors
//--------------------------------------------------------------------
class ActionBooleanArgumentError extends ActionArgumentErrorBase {
    constructor(argumentName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionBooleanArgumentError, argumentName, actualValue);
    }
}
exports.ActionBooleanArgumentError = ActionBooleanArgumentError;
class ActionOptionsTypeError extends errors_1.TestRunErrorBase {
    constructor(actualType) {
        super(types_1.TEST_RUN_ERRORS.actionOptionsTypeError);
        this.actualType = actualType;
    }
}
exports.ActionOptionsTypeError = ActionOptionsTypeError;
// Arguments errors
class ActionStringArgumentError extends ActionArgumentErrorBase {
    constructor(argumentName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionStringArgumentError, argumentName, actualValue);
    }
}
exports.ActionStringArgumentError = ActionStringArgumentError;
class ActionNullableStringArgumentError extends ActionArgumentErrorBase {
    constructor(argumentName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionNullableStringArgumentError, argumentName, actualValue);
    }
}
exports.ActionNullableStringArgumentError = ActionNullableStringArgumentError;
class ActionIntegerArgumentError extends ActionArgumentErrorBase {
    constructor(argumentName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionIntegerArgumentError, argumentName, actualValue);
    }
}
exports.ActionIntegerArgumentError = ActionIntegerArgumentError;
class ActionRoleArgumentError extends ActionArgumentErrorBase {
    constructor(argumentName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionRoleArgumentError, argumentName, actualValue);
    }
}
exports.ActionRoleArgumentError = ActionRoleArgumentError;
class ActionFunctionArgumentError extends ActionArgumentErrorBase {
    constructor(argumentName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionFunctionArgumentError, argumentName, actualValue);
    }
}
exports.ActionFunctionArgumentError = ActionFunctionArgumentError;
class ActionPositiveIntegerArgumentError extends ActionArgumentErrorBase {
    constructor(argumentName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionPositiveIntegerArgumentError, argumentName, actualValue);
    }
}
exports.ActionPositiveIntegerArgumentError = ActionPositiveIntegerArgumentError;
class ActionStringOrStringArrayArgumentError extends ActionArgumentErrorBase {
    constructor(argumentName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionStringOrStringArrayArgumentError, argumentName, actualValue);
    }
}
exports.ActionStringOrStringArrayArgumentError = ActionStringOrStringArrayArgumentError;
class ActionStringArrayElementError extends ActionArgumentErrorBase {
    constructor(argumentName, actualValue, elementIndex) {
        super(types_1.TEST_RUN_ERRORS.actionStringArrayElementError, argumentName, actualValue);
        this.elementIndex = elementIndex;
    }
}
exports.ActionStringArrayElementError = ActionStringArrayElementError;
class SetTestSpeedArgumentError extends ActionArgumentErrorBase {
    constructor(argumentName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.setTestSpeedArgumentError, argumentName, actualValue);
    }
}
exports.SetTestSpeedArgumentError = SetTestSpeedArgumentError;
class ActionUnsupportedDeviceTypeError extends ActionArgumentErrorBase {
    constructor(argumentName, argumentValue) {
        super(types_1.TEST_RUN_ERRORS.actionUnsupportedDeviceTypeError, argumentName, argumentValue);
    }
}
exports.ActionUnsupportedDeviceTypeError = ActionUnsupportedDeviceTypeError;
class ActionCookieArgumentError extends errors_1.TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.actionCookieArgumentError);
    }
}
exports.ActionCookieArgumentError = ActionCookieArgumentError;
class ActionCookieArgumentsError extends errors_1.TestRunErrorBase {
    constructor(index, value) {
        super(types_1.TEST_RUN_ERRORS.actionCookieArgumentsError);
        this.index = index;
        this.actualValue = value;
    }
}
exports.ActionCookieArgumentsError = ActionCookieArgumentsError;
class ActionUrlCookieArgumentError extends errors_1.TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.actionUrlCookieArgumentError);
    }
}
exports.ActionUrlCookieArgumentError = ActionUrlCookieArgumentError;
class ActionUrlsCookieArgumentError extends errors_1.TestRunErrorBase {
    constructor(index, value) {
        super(types_1.TEST_RUN_ERRORS.actionUrlsCookieArgumentError);
        this.index = index;
        this.actualValue = value;
    }
}
exports.ActionUrlsCookieArgumentError = ActionUrlsCookieArgumentError;
class ActionRequiredCookieArguments extends errors_1.TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.actionRequiredCookieArguments);
    }
}
exports.ActionRequiredCookieArguments = ActionRequiredCookieArguments;
class ActionUrlArgumentError extends errors_1.TestRunErrorBase {
    constructor(argumentName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionUrlArgumentError);
        this.argumentName = argumentName;
        this.actualValue = actualValue;
    }
}
exports.ActionUrlArgumentError = ActionUrlArgumentError;
class ActionSkipJsErrorsArgumentTypeError extends errors_1.TestRunErrorBase {
    constructor(argumentName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionSkipJsErrorsArgumentError);
        this.argumentName = argumentName;
        this.actualValue = actualValue;
    }
}
exports.ActionSkipJsErrorsArgumentTypeError = ActionSkipJsErrorsArgumentTypeError;
// Action execution errors
//--------------------------------------------------------------------
class UncaughtErrorInCustomScript extends errors_1.TestRunErrorBase {
    constructor(err, expression, line, column, callsite) {
        super(types_1.TEST_RUN_ERRORS.uncaughtErrorInCustomScript);
        this.callsite = callsite;
        this.expression = expression;
        this.line = line;
        this.column = column;
        this.originError = err;
        this.errMsg = err.message || String(err);
    }
}
exports.UncaughtErrorInCustomScript = UncaughtErrorInCustomScript;
class UncaughtTestCafeErrorInCustomScript extends errors_1.TestRunErrorBase {
    constructor(err, expression, line, column, callsite) {
        super(types_1.TEST_RUN_ERRORS.uncaughtTestCafeErrorInCustomScript);
        this.callsite = callsite;
        this.expression = expression;
        this.line = line;
        this.column = column;
        this.originError = err;
        this.errCallsite = err.callsite;
    }
}
exports.UncaughtTestCafeErrorInCustomScript = UncaughtTestCafeErrorInCustomScript;
class WindowDimensionsOverflowError extends errors_1.TestRunErrorBase {
    constructor(callsite) {
        super(types_1.TEST_RUN_ERRORS.windowDimensionsOverflowError);
        this.callsite = callsite;
    }
}
exports.WindowDimensionsOverflowError = WindowDimensionsOverflowError;
class ForbiddenCharactersInScreenshotPathError extends errors_1.TestRunErrorBase {
    constructor(screenshotPath, forbiddenCharsList) {
        super(types_1.TEST_RUN_ERRORS.forbiddenCharactersInScreenshotPathError);
        this.screenshotPath = screenshotPath;
        this.forbiddenCharsList = forbiddenCharsList;
    }
}
exports.ForbiddenCharactersInScreenshotPathError = ForbiddenCharactersInScreenshotPathError;
class RoleSwitchInRoleInitializerError extends errors_1.TestRunErrorBase {
    constructor(callsite) {
        super(types_1.TEST_RUN_ERRORS.roleSwitchInRoleInitializerError);
        this.callsite = callsite;
    }
}
exports.RoleSwitchInRoleInitializerError = RoleSwitchInRoleInitializerError;
// Native dialog errors
//--------------------------------------------------------------------
class SetNativeDialogHandlerCodeWrongTypeError extends errors_1.TestRunErrorBase {
    constructor(actualType) {
        super(types_1.TEST_RUN_ERRORS.setNativeDialogHandlerCodeWrongTypeError);
        this.actualType = actualType;
    }
}
exports.SetNativeDialogHandlerCodeWrongTypeError = SetNativeDialogHandlerCodeWrongTypeError;
class RequestHookBaseError extends errors_1.TestRunErrorBase {
    constructor(code, hookClassName, methodName) {
        super(code);
        this.hookClassName = hookClassName;
        this.methodName = methodName;
    }
}
exports.RequestHookBaseError = RequestHookBaseError;
class RequestHookUnhandledError extends RequestHookBaseError {
    constructor(err, hookClassName, methodName) {
        super(types_1.TEST_RUN_ERRORS.requestHookUnhandledError, hookClassName, methodName);
        this.errMsg = String(err);
    }
}
exports.RequestHookUnhandledError = RequestHookUnhandledError;
class RequestHookNotImplementedMethodError extends RequestHookBaseError {
    constructor(methodName, hookClassName) {
        super(types_1.TEST_RUN_ERRORS.requestHookNotImplementedError, hookClassName, methodName);
    }
}
exports.RequestHookNotImplementedMethodError = RequestHookNotImplementedMethodError;
class MultipleWindowsModeIsDisabledError extends errors_1.TestRunErrorBase {
    constructor(methodName) {
        super(types_1.TEST_RUN_ERRORS.multipleWindowsModeIsDisabledError);
        this.methodName = methodName;
    }
}
exports.MultipleWindowsModeIsDisabledError = MultipleWindowsModeIsDisabledError;
class MultipleWindowsModeIsNotAvailableInRemoteBrowserError extends errors_1.TestRunErrorBase {
    constructor(methodName) {
        super(types_1.TEST_RUN_ERRORS.multipleWindowsModeIsNotSupportedInRemoteBrowserError);
        this.methodName = methodName;
    }
}
exports.MultipleWindowsModeIsNotAvailableInRemoteBrowserError = MultipleWindowsModeIsNotAvailableInRemoteBrowserError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXJyb3JzL3Rlc3QtcnVuL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0NBQTJDO0FBQzNDLHdEQUEwQztBQUMxQyxnREFBdUQ7QUFDdkQsc0RBQW9DO0FBRXBDLE9BQU87QUFDUCxzRUFBc0U7QUFDdEUsTUFBTSx1QkFBd0IsU0FBUSx5QkFBZ0I7SUFDbEQsWUFBYSxJQUFJLEVBQUUsWUFBWSxFQUFFLFdBQVc7UUFDeEMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRVosSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBSSxXQUFXLENBQUM7SUFDcEMsQ0FBQztDQUNKO0FBR0QseUJBQXlCO0FBQ3pCLHNFQUFzRTtBQUN0RSxNQUFhLGlCQUFrQixTQUFRLHlCQUFnQjtJQUNuRCxZQUFhLFFBQVE7UUFDakIsS0FBSyxDQUFDLHVCQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUV6QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0NBQ0o7QUFORCw4Q0FNQztBQUdELGtCQUFrQjtBQUNsQixzRUFBc0U7QUFDdEUsTUFBYSxtQkFBb0IsU0FBUSx5QkFBZ0I7SUFDckQsWUFBYSxZQUFZLEVBQUUsR0FBRyxFQUFFLFVBQVU7UUFDdEMsS0FBSyxDQUFDLHVCQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFTLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUM5RCxJQUFJLENBQUMsV0FBVyxHQUFJLEdBQUcsQ0FBQztJQUM1QixDQUFD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USxvQkFBb0I7SUFDL0QsWUFBYSxHQUFHLEVBQUUsYUFBYSxFQUFFLFVBQVU7UUFDdkMsS0FBSyxDQUFDLHVCQUFlLENBQUMseUJBQXlCLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRTVFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDSjtBQU5ELDhEQU1DO0FBRUQsTUFBYSxvQ0FBcUMsU0FBUSxvQkFBb0I7SUFDMUUsWUFBYSxVQUFVLEVBQUUsYUFBYTtRQUNsQyxLQUFLLENBQUMsdUJBQWUsQ0FBQyw4QkFBOEIsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDckYsQ0FBQztDQUNKO0FBSkQsb0ZBSUM7QUFFRCxNQUFhLGtDQUFtQyxTQUFRLHlCQUFnQjtJQUNwRSxZQUFhLFVBQVU7UUFDbkIsS0FBSyxDQUFDLHVCQUFlLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUUxRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0NBQ0o7QUFORCxnRkFNQztBQUVELE1BQWEscURBQXNELFNBQVEseUJBQWdCO0lBQ3ZGLFlBQWEsVUFBVTtRQUNuQixLQUFLLENBQUMsdUJBQWUsQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1FBRTdFLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7Q0FDSjtBQU5ELHNIQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVEVTVF9SVU5fRVJST1JTIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0ICogYXMgZGlmZiBmcm9tICcuLi8uLi91dGlscy9kaWZmLyc7XG5pbXBvcnQgeyBUZXN0UnVuRXJyb3JCYXNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2Vycm9ycyc7XG5leHBvcnQgKiBmcm9tICcuLi8uLi9zaGFyZWQvZXJyb3JzJztcblxuLy8gQmFzZVxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuY2xhc3MgQWN0aW9uQXJndW1lbnRFcnJvckJhc2UgZXh0ZW5kcyBUZXN0UnVuRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoY29kZSwgYXJndW1lbnROYW1lLCBhY3R1YWxWYWx1ZSkge1xuICAgICAgICBzdXBlcihjb2RlKTtcblxuICAgICAgICB0aGlzLmFyZ3VtZW50TmFtZSA9IGFyZ3VtZW50TmFtZTtcbiAgICAgICAgdGhpcy5hY3R1YWxWYWx1ZSAgPSBhY3R1YWxWYWx1ZTtcbiAgICB9XG59XG5cblxuLy8gU3luY2hyb25pemF0aW9uIGVycm9yc1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGNsYXNzIE1pc3NpbmdBd2FpdEVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGNhbGxzaXRlKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5taXNzaW5nQXdhaXRFcnJvcik7XG5cbiAgICAgICAgdGhpcy5jYWxsc2l0ZSA9IGNhbGxzaXRlO1xuICAgIH1cbn1cblxuXG4vLyBTZWxlY3RvciBlcnJvcnNcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBjbGFzcyBBY3Rpb25TZWxlY3RvckVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKHNlbGVjdG9yTmFtZSwgZXJyLCBpc0FQSUVycm9yKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5hY3Rpb25TZWxlY3RvckVycm9yKTtcblxuICAgICAgICB0aGlzLnNlbGVjdG9yTmFtZSA9IHNlbGVjdG9yTmFtZTtcbiAgICAgICAgdGhpcy5lcnJNc2cgICAgICAgPSBpc0FQSUVycm9yID8gZXJyLnJhd01lc3NhZ2UgOiBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhpcy5vcmlnaW5FcnJvciAgPSBlcnI7XG4gICAgfVxufVxuXG5cbi8vIFBhZ2UgZXJyb3JzXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5leHBvcnQgY2xhc3MgUGFnZUxvYWRFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChlcnJNc2csIHVybCkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMucGFnZUxvYWRFcnJvcik7XG5cbiAgICAgICAgdGhpcy51cmwgICAgPSB1cmw7XG4gICAgICAgIHRoaXMuZXJyTXNnID0gZXJyTXNnO1xuICAgIH1cbn1cblxuLy8gVGltZW91dCBlcnJvcnNcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBjbGFzcyBUaW1lb3V0RXJyb3IgZXh0ZW5kcyBUZXN0UnVuRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAodGltZW91dCwgc2NvcGUpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmV4ZWN1dGlvblRpbWVvdXRFeGNlZWRlZCk7XG5cbiAgICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcbiAgICAgICAgdGhpcy5zY29wZSAgID0gc2NvcGU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGVzdFRpbWVvdXRFcnJvciBleHRlbmRzIFRpbWVvdXRFcnJvciB7XG4gICAgY29uc3RydWN0b3IgKHRpbWVvdXQpIHtcbiAgICAgICAgc3VwZXIodGltZW91dCwgJ1Rlc3QnKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSdW5UaW1lb3V0RXJyb3IgZXh0ZW5kcyBUaW1lb3V0RXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yICh0aW1lb3V0KSB7XG4gICAgICAgIHN1cGVyKHRpbWVvdXQsICdSdW4nKTtcbiAgICB9XG59XG5cbi8vIFVuY2F1Z2h0IGVycm9yc1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGNsYXNzIFVuY2F1Z2h0RXJyb3JJblRlc3RDb2RlIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGVyciwgY2FsbHNpdGUpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLnVuY2F1Z2h0RXJyb3JJblRlc3RDb2RlKTtcblxuICAgICAgICB0aGlzLmVyck1zZyAgICAgID0gU3RyaW5nKGVyci5yYXdNZXNzYWdlIHx8IGVycik7XG4gICAgICAgIHRoaXMuY2FsbHNpdGUgICAgPSBlcnIuY2FsbHNpdGUgfHwgY2FsbHNpdGU7XG4gICAgICAgIHRoaXMub3JpZ2luRXJyb3IgPSBlcnI7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVW5jYXVnaHROb25FcnJvck9iamVjdEluVGVzdENvZGUgZXh0ZW5kcyBUZXN0UnVuRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAob2JqKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy51bmNhdWdodE5vbkVycm9yT2JqZWN0SW5UZXN0Q29kZSk7XG5cbiAgICAgICAgdGhpcy5vYmpUeXBlID0gdHlwZW9mIG9iajtcbiAgICAgICAgdGhpcy5vYmpTdHIgID0gU3RyaW5nKG9iaik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVW5oYW5kbGVkUHJvbWlzZVJlamVjdGlvbkVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGVycikge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMudW5oYW5kbGVkUHJvbWlzZVJlamVjdGlvbik7XG5cbiAgICAgICAgdGhpcy5lcnJNc2cgPSBTdHJpbmcoZXJyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBVbmNhdWdodEV4Y2VwdGlvbkVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGVycikge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMudW5jYXVnaHRFeGNlcHRpb24pO1xuXG4gICAgICAgIHRoaXMuZXJyTXNnID0gU3RyaW5nKGVycik7XG4gICAgfVxufVxuXG5cbi8vIEFzc2VydGlvbiBlcnJvcnNcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBjbGFzcyBFeHRlcm5hbEFzc2VydGlvbkxpYnJhcnlFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChlcnIsIGNhbGxzaXRlKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5leHRlcm5hbEFzc2VydGlvbkxpYnJhcnlFcnJvcik7XG5cbiAgICAgICAgdGhpcy5lcnJNc2cgICA9IFN0cmluZyhlcnIpO1xuICAgICAgICB0aGlzLmRpZmYgICAgID0gZXJyPy5zaG93RGlmZiAmJiBkaWZmLmdlbmVyYXRlKGVyci5hY3R1YWwsIGVyci5leHBlY3RlZCk7XG4gICAgICAgIHRoaXMuY2FsbHNpdGUgPSBjYWxsc2l0ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBc3NlcnRpb25FeGVjdXRhYmxlQXJndW1lbnRFcnJvciBleHRlbmRzIEFjdGlvbkFyZ3VtZW50RXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoYXJndW1lbnROYW1lLCBhcmd1bWVudFZhbHVlLCBlcnIsIGlzQVBJRXJyb3IpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFzc2VydGlvbkV4ZWN1dGFibGVBcmd1bWVudEVycm9yLCBhcmd1bWVudE5hbWUsIGFyZ3VtZW50VmFsdWUpO1xuXG4gICAgICAgIHRoaXMuZXJyTXNnICAgICAgPSBpc0FQSUVycm9yID8gZXJyLnJhd01lc3NhZ2UgOiBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhpcy5vcmlnaW5FcnJvciA9IGVycjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBc3NlcnRpb25XaXRob3V0TWV0aG9kQ2FsbEVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGNhbGxzaXRlKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5hc3NlcnRpb25XaXRob3V0TWV0aG9kQ2FsbEVycm9yKTtcblxuICAgICAgICB0aGlzLmNhbGxzaXRlID0gY2FsbHNpdGU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQXNzZXJ0aW9uVW5hd2FpdGVkUHJvbWlzZUVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGNhbGxzaXRlKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5hc3NlcnRpb25VbmF3YWl0ZWRQcm9taXNlRXJyb3IpO1xuXG4gICAgICAgIHRoaXMuY2FsbHNpdGUgPSBjYWxsc2l0ZTtcbiAgICB9XG59XG5cblxuLy8gQWN0aW9uIHBhcmFtZXRlcnMgZXJyb3JzXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcHRpb25zIGVycm9yc1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGNsYXNzIEFjdGlvbkJvb2xlYW5Bcmd1bWVudEVycm9yIGV4dGVuZHMgQWN0aW9uQXJndW1lbnRFcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChhcmd1bWVudE5hbWUsIGFjdHVhbFZhbHVlKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5hY3Rpb25Cb29sZWFuQXJndW1lbnRFcnJvciwgYXJndW1lbnROYW1lLCBhY3R1YWxWYWx1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uT3B0aW9uc1R5cGVFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChhY3R1YWxUeXBlKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5hY3Rpb25PcHRpb25zVHlwZUVycm9yKTtcblxuICAgICAgICB0aGlzLmFjdHVhbFR5cGUgPSBhY3R1YWxUeXBlO1xuICAgIH1cbn1cblxuXG4vLyBBcmd1bWVudHMgZXJyb3JzXG5leHBvcnQgY2xhc3MgQWN0aW9uU3RyaW5nQXJndW1lbnRFcnJvciBleHRlbmRzIEFjdGlvbkFyZ3VtZW50RXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoYXJndW1lbnROYW1lLCBhY3R1YWxWYWx1ZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuYWN0aW9uU3RyaW5nQXJndW1lbnRFcnJvciwgYXJndW1lbnROYW1lLCBhY3R1YWxWYWx1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uTnVsbGFibGVTdHJpbmdBcmd1bWVudEVycm9yIGV4dGVuZHMgQWN0aW9uQXJndW1lbnRFcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChhcmd1bWVudE5hbWUsIGFjdHVhbFZhbHVlKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5hY3Rpb25OdWxsYWJsZVN0cmluZ0FyZ3VtZW50RXJyb3IsIGFyZ3VtZW50TmFtZSwgYWN0dWFsVmFsdWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFjdGlvbkludGVnZXJBcmd1bWVudEVycm9yIGV4dGVuZHMgQWN0aW9uQXJndW1lbnRFcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChhcmd1bWVudE5hbWUsIGFjdHVhbFZhbHVlKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5hY3Rpb25JbnRlZ2VyQXJndW1lbnRFcnJvciwgYXJndW1lbnROYW1lLCBhY3R1YWxWYWx1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uUm9sZUFyZ3VtZW50RXJyb3IgZXh0ZW5kcyBBY3Rpb25Bcmd1bWVudEVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGFyZ3VtZW50TmFtZSwgYWN0dWFsVmFsdWUpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvblJvbGVBcmd1bWVudEVycm9yLCBhcmd1bWVudE5hbWUsIGFjdHVhbFZhbHVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25GdW5jdGlvbkFyZ3VtZW50RXJyb3IgZXh0ZW5kcyBBY3Rpb25Bcmd1bWVudEVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGFyZ3VtZW50TmFtZSwgYWN0dWFsVmFsdWUpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvbkZ1bmN0aW9uQXJndW1lbnRFcnJvciwgYXJndW1lbnROYW1lLCBhY3R1YWxWYWx1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uUG9zaXRpdmVJbnRlZ2VyQXJndW1lbnRFcnJvciBleHRlbmRzIEFjdGlvbkFyZ3VtZW50RXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoYXJndW1lbnROYW1lLCBhY3R1YWxWYWx1ZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuYWN0aW9uUG9zaXRpdmVJbnRlZ2VyQXJndW1lbnRFcnJvciwgYXJndW1lbnROYW1lLCBhY3R1YWxWYWx1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uU3RyaW5nT3JTdHJpbmdBcnJheUFyZ3VtZW50RXJyb3IgZXh0ZW5kcyBBY3Rpb25Bcmd1bWVudEVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGFyZ3VtZW50TmFtZSwgYWN0dWFsVmFsdWUpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvblN0cmluZ09yU3RyaW5nQXJyYXlBcmd1bWVudEVycm9yLCBhcmd1bWVudE5hbWUsIGFjdHVhbFZhbHVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25TdHJpbmdBcnJheUVsZW1lbnRFcnJvciBleHRlbmRzIEFjdGlvbkFyZ3VtZW50RXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoYXJndW1lbnROYW1lLCBhY3R1YWxWYWx1ZSwgZWxlbWVudEluZGV4KSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5hY3Rpb25TdHJpbmdBcnJheUVsZW1lbnRFcnJvciwgYXJndW1lbnROYW1lLCBhY3R1YWxWYWx1ZSk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50SW5kZXggPSBlbGVtZW50SW5kZXg7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2V0VGVzdFNwZWVkQXJndW1lbnRFcnJvciBleHRlbmRzIEFjdGlvbkFyZ3VtZW50RXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoYXJndW1lbnROYW1lLCBhY3R1YWxWYWx1ZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuc2V0VGVzdFNwZWVkQXJndW1lbnRFcnJvciwgYXJndW1lbnROYW1lLCBhY3R1YWxWYWx1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uVW5zdXBwb3J0ZWREZXZpY2VUeXBlRXJyb3IgZXh0ZW5kcyBBY3Rpb25Bcmd1bWVudEVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGFyZ3VtZW50TmFtZSwgYXJndW1lbnRWYWx1ZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuYWN0aW9uVW5zdXBwb3J0ZWREZXZpY2VUeXBlRXJyb3IsIGFyZ3VtZW50TmFtZSwgYXJndW1lbnRWYWx1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uQ29va2llQXJndW1lbnRFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvbkNvb2tpZUFyZ3VtZW50RXJyb3IpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFjdGlvbkNvb2tpZUFyZ3VtZW50c0Vycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuYWN0aW9uQ29va2llQXJndW1lbnRzRXJyb3IpO1xuXG4gICAgICAgIHRoaXMuaW5kZXggICAgICAgPSBpbmRleDtcbiAgICAgICAgdGhpcy5hY3R1YWxWYWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFjdGlvblVybENvb2tpZUFyZ3VtZW50RXJyb3IgZXh0ZW5kcyBUZXN0UnVuRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5hY3Rpb25VcmxDb29raWVBcmd1bWVudEVycm9yKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25VcmxzQ29va2llQXJndW1lbnRFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvblVybHNDb29raWVBcmd1bWVudEVycm9yKTtcblxuICAgICAgICB0aGlzLmluZGV4ICAgICAgID0gaW5kZXg7XG4gICAgICAgIHRoaXMuYWN0dWFsVmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25SZXF1aXJlZENvb2tpZUFyZ3VtZW50cyBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvblJlcXVpcmVkQ29va2llQXJndW1lbnRzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25VcmxBcmd1bWVudEVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGFyZ3VtZW50TmFtZSwgYWN0dWFsVmFsdWUpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvblVybEFyZ3VtZW50RXJyb3IpO1xuXG4gICAgICAgIHRoaXMuYXJndW1lbnROYW1lID0gYXJndW1lbnROYW1lO1xuICAgICAgICB0aGlzLmFjdHVhbFZhbHVlICA9IGFjdHVhbFZhbHVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFjdGlvblNraXBKc0Vycm9yc0FyZ3VtZW50VHlwZUVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGFyZ3VtZW50TmFtZSwgYWN0dWFsVmFsdWUpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvblNraXBKc0Vycm9yc0FyZ3VtZW50RXJyb3IpO1xuXG4gICAgICAgIHRoaXMuYXJndW1lbnROYW1lID0gYXJndW1lbnROYW1lO1xuICAgICAgICB0aGlzLmFjdHVhbFZhbHVlICA9IGFjdHVhbFZhbHVlO1xuICAgIH1cbn1cblxuLy8gQWN0aW9uIGV4ZWN1dGlvbiBlcnJvcnNcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBjbGFzcyBVbmNhdWdodEVycm9ySW5DdXN0b21TY3JpcHQgZXh0ZW5kcyBUZXN0UnVuRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoZXJyLCBleHByZXNzaW9uLCBsaW5lLCBjb2x1bW4sIGNhbGxzaXRlKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy51bmNhdWdodEVycm9ySW5DdXN0b21TY3JpcHQpO1xuXG4gICAgICAgIHRoaXMuY2FsbHNpdGUgICA9IGNhbGxzaXRlO1xuICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xuICAgICAgICB0aGlzLmxpbmUgICAgICAgPSBsaW5lO1xuICAgICAgICB0aGlzLmNvbHVtbiAgICAgPSBjb2x1bW47XG5cbiAgICAgICAgdGhpcy5vcmlnaW5FcnJvciA9IGVycjtcbiAgICAgICAgdGhpcy5lcnJNc2cgICAgICA9IGVyci5tZXNzYWdlIHx8IFN0cmluZyhlcnIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFVuY2F1Z2h0VGVzdENhZmVFcnJvckluQ3VzdG9tU2NyaXB0IGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGVyciwgZXhwcmVzc2lvbiwgbGluZSwgY29sdW1uLCBjYWxsc2l0ZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMudW5jYXVnaHRUZXN0Q2FmZUVycm9ySW5DdXN0b21TY3JpcHQpO1xuXG4gICAgICAgIHRoaXMuY2FsbHNpdGUgICA9IGNhbGxzaXRlO1xuICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xuICAgICAgICB0aGlzLmxpbmUgICAgICAgPSBsaW5lO1xuICAgICAgICB0aGlzLmNvbHVtbiAgICAgPSBjb2x1bW47XG5cbiAgICAgICAgdGhpcy5vcmlnaW5FcnJvciA9IGVycjtcbiAgICAgICAgdGhpcy5lcnJDYWxsc2l0ZSA9IGVyci5jYWxsc2l0ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBXaW5kb3dEaW1lbnNpb25zT3ZlcmZsb3dFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChjYWxsc2l0ZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMud2luZG93RGltZW5zaW9uc092ZXJmbG93RXJyb3IpO1xuXG4gICAgICAgIHRoaXMuY2FsbHNpdGUgPSBjYWxsc2l0ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGb3JiaWRkZW5DaGFyYWN0ZXJzSW5TY3JlZW5zaG90UGF0aEVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKHNjcmVlbnNob3RQYXRoLCBmb3JiaWRkZW5DaGFyc0xpc3QpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmZvcmJpZGRlbkNoYXJhY3RlcnNJblNjcmVlbnNob3RQYXRoRXJyb3IpO1xuXG4gICAgICAgIHRoaXMuc2NyZWVuc2hvdFBhdGggICAgID0gc2NyZWVuc2hvdFBhdGg7XG4gICAgICAgIHRoaXMuZm9yYmlkZGVuQ2hhcnNMaXN0ID0gZm9yYmlkZGVuQ2hhcnNMaXN0O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJvbGVTd2l0Y2hJblJvbGVJbml0aWFsaXplckVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGNhbGxzaXRlKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5yb2xlU3dpdGNoSW5Sb2xlSW5pdGlhbGl6ZXJFcnJvcik7XG5cbiAgICAgICAgdGhpcy5jYWxsc2l0ZSA9IGNhbGxzaXRlO1xuICAgIH1cbn1cblxuXG4vLyBOYXRpdmUgZGlhbG9nIGVycm9yc1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGNsYXNzIFNldE5hdGl2ZURpYWxvZ0hhbmRsZXJDb2RlV3JvbmdUeXBlRXJyb3IgZXh0ZW5kcyBUZXN0UnVuRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoYWN0dWFsVHlwZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuc2V0TmF0aXZlRGlhbG9nSGFuZGxlckNvZGVXcm9uZ1R5cGVFcnJvcik7XG5cbiAgICAgICAgdGhpcy5hY3R1YWxUeXBlID0gYWN0dWFsVHlwZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0SG9va0Jhc2VFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChjb2RlLCBob29rQ2xhc3NOYW1lLCBtZXRob2ROYW1lKSB7XG4gICAgICAgIHN1cGVyKGNvZGUpO1xuXG4gICAgICAgIHRoaXMuaG9va0NsYXNzTmFtZSA9IGhvb2tDbGFzc05hbWU7XG4gICAgICAgIHRoaXMubWV0aG9kTmFtZSAgICA9IG1ldGhvZE5hbWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVxdWVzdEhvb2tVbmhhbmRsZWRFcnJvciBleHRlbmRzIFJlcXVlc3RIb29rQmFzZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvciAoZXJyLCBob29rQ2xhc3NOYW1lLCBtZXRob2ROYW1lKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5yZXF1ZXN0SG9va1VuaGFuZGxlZEVycm9yLCBob29rQ2xhc3NOYW1lLCBtZXRob2ROYW1lKTtcblxuICAgICAgICB0aGlzLmVyck1zZyA9IFN0cmluZyhlcnIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlcXVlc3RIb29rTm90SW1wbGVtZW50ZWRNZXRob2RFcnJvciBleHRlbmRzIFJlcXVlc3RIb29rQmFzZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvciAobWV0aG9kTmFtZSwgaG9va0NsYXNzTmFtZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMucmVxdWVzdEhvb2tOb3RJbXBsZW1lbnRlZEVycm9yLCBob29rQ2xhc3NOYW1lLCBtZXRob2ROYW1lKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNdWx0aXBsZVdpbmRvd3NNb2RlSXNEaXNhYmxlZEVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKG1ldGhvZE5hbWUpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLm11bHRpcGxlV2luZG93c01vZGVJc0Rpc2FibGVkRXJyb3IpO1xuXG4gICAgICAgIHRoaXMubWV0aG9kTmFtZSA9IG1ldGhvZE5hbWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVXaW5kb3dzTW9kZUlzTm90QXZhaWxhYmxlSW5SZW1vdGVCcm93c2VyRXJyb3IgZXh0ZW5kcyBUZXN0UnVuRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAobWV0aG9kTmFtZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMubXVsdGlwbGVXaW5kb3dzTW9kZUlzTm90U3VwcG9ydGVkSW5SZW1vdGVCcm93c2VyRXJyb3IpO1xuXG4gICAgICAgIHRoaXMubWV0aG9kTmFtZSA9IG1ldGhvZE5hbWU7XG4gICAgfVxufVxuXG4iXX0=