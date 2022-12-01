"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopHandlingTestErrors = exports.startHandlingTestErrors = exports.removeRunningTest = exports.addRunningTest = exports.registerErrorHandlers = exports.handleUnexpectedError = exports.formatError = void 0;
const test_run_1 = require("../errors/test-run");
const util_1 = __importDefault(require("util"));
const runningTests = {};
let handlingTestErrors = false;
function printErrorMessagesAndTerminate(...messages) {
    // eslint-disable-next-line no-console
    messages.map(msg => console.log(msg));
    // eslint-disable-next-line no-process-exit
    setTimeout(() => process.exit(1), 0);
}
function handleTestRunError(ErrorCtor, message) {
    Object.values(runningTests).forEach(testRun => {
        testRun.addError(new ErrorCtor(message));
        removeRunningTest(testRun);
    });
}
function handleError(ErrorCtor, message) {
    if (handlingTestErrors)
        handleTestRunError(ErrorCtor, message);
    else
        printErrorMessagesAndTerminate(message);
}
function formatUnhandledRejectionReason(reason) {
    const reasonType = typeof reason;
    const isPrimitiveType = reasonType !== 'object' && reasonType !== 'function';
    if (isPrimitiveType)
        return String(reason);
    if (reason instanceof Error)
        return reason.stack;
    return util_1.default.inspect(reason, { depth: 2, breakLength: Infinity });
}
function formatError(ErrorCtor, error) {
    if (ErrorCtor === test_run_1.UncaughtExceptionError)
        return error.stack;
    if (ErrorCtor === test_run_1.UnhandledPromiseRejectionError)
        return formatUnhandledRejectionReason(error);
    return error;
}
exports.formatError = formatError;
function handleUnexpectedError(ErrorCtor, error) {
    try {
        const formattedError = typeof error === 'string' ? error : formatError(ErrorCtor, error);
        handleError(ErrorCtor, formattedError);
    }
    catch (e) {
        printErrorMessagesAndTerminate(error, e);
    }
}
exports.handleUnexpectedError = handleUnexpectedError;
function registerErrorHandlers() {
    process.on('unhandledRejection', e => handleUnexpectedError(test_run_1.UnhandledPromiseRejectionError, e));
    process.on('uncaughtException', e => handleUnexpectedError(test_run_1.UncaughtExceptionError, e));
}
exports.registerErrorHandlers = registerErrorHandlers;
function addRunningTest(testRun) {
    runningTests[testRun.id] = testRun;
}
exports.addRunningTest = addRunningTest;
function removeRunningTest(testRun) {
    if (testRun)
        delete runningTests[testRun.id];
}
exports.removeRunningTest = removeRunningTest;
function startHandlingTestErrors() {
    handlingTestErrors = true;
}
exports.startHandlingTestErrors = startHandlingTestErrors;
function stopHandlingTestErrors() {
    handlingTestErrors = false;
}
exports.stopHandlingTestErrors = stopHandlingTestErrors;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlLWVycm9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9oYW5kbGUtZXJyb3JzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlEQUE0RjtBQUM1RixnREFBd0I7QUFFeEIsTUFBTSxZQUFZLEdBQU8sRUFBRSxDQUFDO0FBQzVCLElBQUksa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0FBRS9CLFNBQVMsOEJBQThCLENBQUUsR0FBRyxRQUFRO0lBQ2hELHNDQUFzQztJQUN0QyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRXRDLDJDQUEyQztJQUMzQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBRSxTQUFTLEVBQUUsT0FBTztJQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMxQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFekMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUUsU0FBUyxFQUFFLE9BQU87SUFDcEMsSUFBSSxrQkFBa0I7UUFDbEIsa0JBQWtCLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDOztRQUV2Qyw4QkFBOEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBRUQsU0FBUyw4QkFBOEIsQ0FBRSxNQUFNO0lBQzNDLE1BQU0sVUFBVSxHQUFRLE9BQU8sTUFBTSxDQUFDO0lBQ3RDLE1BQU0sZUFBZSxHQUFHLFVBQVUsS0FBSyxRQUFRLElBQUksVUFBVSxLQUFLLFVBQVUsQ0FBQztJQUU3RSxJQUFJLGVBQWU7UUFDZixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUxQixJQUFJLE1BQU0sWUFBWSxLQUFLO1FBQ3ZCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQztJQUV4QixPQUFPLGNBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUNyRSxDQUFDO0FBRUQsU0FBZ0IsV0FBVyxDQUFFLFNBQVMsRUFBRSxLQUFLO0lBQ3pDLElBQUksU0FBUyxLQUFLLGlDQUFzQjtRQUNwQyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFFdkIsSUFBSSxTQUFTLEtBQUsseUNBQThCO1FBQzVDLE9BQU8sOEJBQThCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFakQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQVJELGtDQVFDO0FBRUQsU0FBZ0IscUJBQXFCLENBQUUsU0FBUyxFQUFFLEtBQUs7SUFDbkQsSUFBSTtRQUNBLE1BQU0sY0FBYyxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXpGLFdBQVcsQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7S0FDMUM7SUFDRCxPQUFPLENBQUMsRUFBRTtRQUNOLDhCQUE4QixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztLQUM1QztBQUNMLENBQUM7QUFURCxzREFTQztBQUVELFNBQWdCLHFCQUFxQjtJQUNqQyxPQUFPLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMscUJBQXFCLENBQUMseUNBQThCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRyxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMscUJBQXFCLENBQUMsaUNBQXNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzRixDQUFDO0FBSEQsc0RBR0M7QUFFRCxTQUFnQixjQUFjLENBQUUsT0FBTztJQUNuQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztBQUN2QyxDQUFDO0FBRkQsd0NBRUM7QUFFRCxTQUFnQixpQkFBaUIsQ0FBRSxPQUFPO0lBQ3RDLElBQUksT0FBTztRQUNQLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBSEQsOENBR0M7QUFFRCxTQUFnQix1QkFBdUI7SUFDbkMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0FBQzlCLENBQUM7QUFGRCwwREFFQztBQUVELFNBQWdCLHNCQUFzQjtJQUNsQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7QUFDL0IsQ0FBQztBQUZELHdEQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVW5oYW5kbGVkUHJvbWlzZVJlamVjdGlvbkVycm9yLCBVbmNhdWdodEV4Y2VwdGlvbkVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL3Rlc3QtcnVuJztcbmltcG9ydCB1dGlsIGZyb20gJ3V0aWwnO1xuXG5jb25zdCBydW5uaW5nVGVzdHMgICAgID0ge307XG5sZXQgaGFuZGxpbmdUZXN0RXJyb3JzID0gZmFsc2U7XG5cbmZ1bmN0aW9uIHByaW50RXJyb3JNZXNzYWdlc0FuZFRlcm1pbmF0ZSAoLi4ubWVzc2FnZXMpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgIG1lc3NhZ2VzLm1hcChtc2cgPT4gY29uc29sZS5sb2cobXNnKSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvY2Vzcy1leGl0XG4gICAgc2V0VGltZW91dCgoKSA9PiBwcm9jZXNzLmV4aXQoMSksIDApO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVUZXN0UnVuRXJyb3IgKEVycm9yQ3RvciwgbWVzc2FnZSkge1xuICAgIE9iamVjdC52YWx1ZXMocnVubmluZ1Rlc3RzKS5mb3JFYWNoKHRlc3RSdW4gPT4ge1xuICAgICAgICB0ZXN0UnVuLmFkZEVycm9yKG5ldyBFcnJvckN0b3IobWVzc2FnZSkpO1xuXG4gICAgICAgIHJlbW92ZVJ1bm5pbmdUZXN0KHRlc3RSdW4pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVFcnJvciAoRXJyb3JDdG9yLCBtZXNzYWdlKSB7XG4gICAgaWYgKGhhbmRsaW5nVGVzdEVycm9ycylcbiAgICAgICAgaGFuZGxlVGVzdFJ1bkVycm9yKEVycm9yQ3RvciwgbWVzc2FnZSk7XG4gICAgZWxzZVxuICAgICAgICBwcmludEVycm9yTWVzc2FnZXNBbmRUZXJtaW5hdGUobWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFVuaGFuZGxlZFJlamVjdGlvblJlYXNvbiAocmVhc29uKSB7XG4gICAgY29uc3QgcmVhc29uVHlwZSAgICAgID0gdHlwZW9mIHJlYXNvbjtcbiAgICBjb25zdCBpc1ByaW1pdGl2ZVR5cGUgPSByZWFzb25UeXBlICE9PSAnb2JqZWN0JyAmJiByZWFzb25UeXBlICE9PSAnZnVuY3Rpb24nO1xuXG4gICAgaWYgKGlzUHJpbWl0aXZlVHlwZSlcbiAgICAgICAgcmV0dXJuIFN0cmluZyhyZWFzb24pO1xuXG4gICAgaWYgKHJlYXNvbiBpbnN0YW5jZW9mIEVycm9yKVxuICAgICAgICByZXR1cm4gcmVhc29uLnN0YWNrO1xuXG4gICAgcmV0dXJuIHV0aWwuaW5zcGVjdChyZWFzb24sIHsgZGVwdGg6IDIsIGJyZWFrTGVuZ3RoOiBJbmZpbml0eSB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEVycm9yIChFcnJvckN0b3IsIGVycm9yKSB7XG4gICAgaWYgKEVycm9yQ3RvciA9PT0gVW5jYXVnaHRFeGNlcHRpb25FcnJvcilcbiAgICAgICAgcmV0dXJuIGVycm9yLnN0YWNrO1xuXG4gICAgaWYgKEVycm9yQ3RvciA9PT0gVW5oYW5kbGVkUHJvbWlzZVJlamVjdGlvbkVycm9yKVxuICAgICAgICByZXR1cm4gZm9ybWF0VW5oYW5kbGVkUmVqZWN0aW9uUmVhc29uKGVycm9yKTtcblxuICAgIHJldHVybiBlcnJvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVVuZXhwZWN0ZWRFcnJvciAoRXJyb3JDdG9yLCBlcnJvcikge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZEVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogZm9ybWF0RXJyb3IoRXJyb3JDdG9yLCBlcnJvcik7XG5cbiAgICAgICAgaGFuZGxlRXJyb3IoRXJyb3JDdG9yLCBmb3JtYXR0ZWRFcnJvcik7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHByaW50RXJyb3JNZXNzYWdlc0FuZFRlcm1pbmF0ZShlcnJvciwgZSk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJFcnJvckhhbmRsZXJzICgpIHtcbiAgICBwcm9jZXNzLm9uKCd1bmhhbmRsZWRSZWplY3Rpb24nLCBlID0+IGhhbmRsZVVuZXhwZWN0ZWRFcnJvcihVbmhhbmRsZWRQcm9taXNlUmVqZWN0aW9uRXJyb3IsIGUpKTtcbiAgICBwcm9jZXNzLm9uKCd1bmNhdWdodEV4Y2VwdGlvbicsIGUgPT4gaGFuZGxlVW5leHBlY3RlZEVycm9yKFVuY2F1Z2h0RXhjZXB0aW9uRXJyb3IsIGUpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFJ1bm5pbmdUZXN0ICh0ZXN0UnVuKSB7XG4gICAgcnVubmluZ1Rlc3RzW3Rlc3RSdW4uaWRdID0gdGVzdFJ1bjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVJ1bm5pbmdUZXN0ICh0ZXN0UnVuKSB7XG4gICAgaWYgKHRlc3RSdW4pXG4gICAgICAgIGRlbGV0ZSBydW5uaW5nVGVzdHNbdGVzdFJ1bi5pZF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydEhhbmRsaW5nVGVzdEVycm9ycyAoKSB7XG4gICAgaGFuZGxpbmdUZXN0RXJyb3JzID0gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BIYW5kbGluZ1Rlc3RFcnJvcnMgKCkge1xuICAgIGhhbmRsaW5nVGVzdEVycm9ycyA9IGZhbHNlO1xufVxuIl19