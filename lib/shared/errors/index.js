"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowNotFoundError = exports.SwitchToWindowPredicateError = exports.CannotCloseWindowWithoutParentError = exports.CannotCloseWindowWithChildrenError = exports.CloseChildWindowError = exports.CannotSwitchToWindowError = exports.ChildWindowIsNotLoadedError = exports.ChildWindowNotFoundError = exports.CurrentIframeIsNotLoadedError = exports.ActionIframeIsNotLoadedError = exports.ActionElementNotIframeError = exports.InvalidElementScreenshotDimensionsError = exports.ActionInvalidScrollTargetError = exports.ActionElementIsNotFileInputError = exports.ActionCannotFindFileToUploadError = exports.ActionIncorrectKeysError = exports.ActionRootContainerNotFoundError = exports.ActionElementNonContentEditableError = exports.ActionElementNotTextAreaError = exports.ActionElementNonEditableError = exports.ActionAdditionalSelectorMatchesWrongNodeTypeError = exports.ActionAdditionalElementIsInvisibleError = exports.ActionAdditionalElementNotFoundError = exports.ActionSelectorMatchesWrongNodeTypeError = exports.ActionElementIsInvisibleError = exports.ActionElementNotFoundError = exports.ActionInvalidObjectPropertyError = exports.ActionFunctionOptionError = exports.ActionObjectOptionError = exports.ActionUrlSearchParamsOptionError = exports.ActionUrlOptionError = exports.ActionNumberOptionError = exports.ActionDateOptionError = exports.ActionStringOrRegexOptionError = exports.ActionStringOptionError = exports.ActionSpeedOptionError = exports.ActionBooleanOptionError = exports.ActionPositiveIntegerOptionError = exports.ActionIntegerOptionError = exports.UncaughtErrorInCustomClientScriptLoadedFromModule = exports.UncaughtErrorInCustomClientScriptCode = exports.UncaughtErrorInCustomDOMPropertyCode = exports.UncaughtErrorInClientFunctionCode = exports.UncaughtErrorOnPage = exports.CannotObtainInfoForElementSpecifiedBySelectorError = exports.InvalidSelectorResultError = exports.SelectorErrorBase = exports.DomNodeClientFunctionResultError = exports.ClientFunctionExecutionInterruptionError = exports.TestRunErrorBase = void 0;
exports.UncaughtErrorInNativeDialogHandler = exports.NativeDialogNotHandledError = exports.CurrentIframeIsInvisibleError = exports.CurrentIframeNotFoundError = exports.CannotRestoreChildWindowError = exports.ChildWindowClosedBeforeSwitchingError = exports.PreviousWindowNotFoundError = exports.ParentWindowNotFoundError = void 0;
// -------------------------------------------------------------
// WARNING: this file is used by both the client and the server.
// Do not use any browser or node-specific API!
// -------------------------------------------------------------
const types_1 = require("../../errors/types");
// Base
//--------------------------------------------------------------------
class TestRunErrorBase {
    constructor(code, callsite) {
        this.code = code;
        this.isTestCafeError = true;
        this.callsite = callsite || null;
    }
}
exports.TestRunErrorBase = TestRunErrorBase;
class ActionOptionErrorBase extends TestRunErrorBase {
    constructor(code, optionName, actualValue) {
        super(code);
        this.optionName = optionName;
        this.actualValue = actualValue;
    }
}
// Client function errors
//--------------------------------------------------------------------
class ClientFunctionExecutionInterruptionError extends TestRunErrorBase {
    constructor(instantiationCallsiteName, callsite) {
        super(types_1.TEST_RUN_ERRORS.clientFunctionExecutionInterruptionError, callsite);
        this.instantiationCallsiteName = instantiationCallsiteName;
    }
}
exports.ClientFunctionExecutionInterruptionError = ClientFunctionExecutionInterruptionError;
class DomNodeClientFunctionResultError extends TestRunErrorBase {
    constructor(instantiationCallsiteName, callsite) {
        super(types_1.TEST_RUN_ERRORS.domNodeClientFunctionResultError, callsite);
        this.instantiationCallsiteName = instantiationCallsiteName;
    }
}
exports.DomNodeClientFunctionResultError = DomNodeClientFunctionResultError;
// Selector errors
//--------------------------------------------------------------------
class SelectorErrorBase extends TestRunErrorBase {
    constructor(code, { apiFnChain, apiFnIndex }, callsite) {
        super(code, callsite);
        this.apiFnChain = apiFnChain;
        this.apiFnIndex = apiFnIndex;
    }
}
exports.SelectorErrorBase = SelectorErrorBase;
class InvalidSelectorResultError extends TestRunErrorBase {
    constructor(callsite) {
        super(types_1.TEST_RUN_ERRORS.invalidSelectorResultError, callsite);
    }
}
exports.InvalidSelectorResultError = InvalidSelectorResultError;
class CannotObtainInfoForElementSpecifiedBySelectorError extends SelectorErrorBase {
    constructor(callsite, apiFnArgs) {
        super(types_1.TEST_RUN_ERRORS.cannotObtainInfoForElementSpecifiedBySelectorError, apiFnArgs, callsite);
    }
}
exports.CannotObtainInfoForElementSpecifiedBySelectorError = CannotObtainInfoForElementSpecifiedBySelectorError;
// Uncaught errors
//--------------------------------------------------------------------
class UncaughtErrorOnPage extends TestRunErrorBase {
    constructor(errStack, pageDestUrl) {
        super(types_1.TEST_RUN_ERRORS.uncaughtErrorOnPage);
        this.errStack = errStack;
        this.pageDestUrl = pageDestUrl;
    }
}
exports.UncaughtErrorOnPage = UncaughtErrorOnPage;
class UncaughtErrorInClientFunctionCode extends TestRunErrorBase {
    constructor(instantiationCallsiteName, err, callsite) {
        super(types_1.TEST_RUN_ERRORS.uncaughtErrorInClientFunctionCode, callsite);
        this.errMsg = String(err);
        this.instantiationCallsiteName = instantiationCallsiteName;
    }
}
exports.UncaughtErrorInClientFunctionCode = UncaughtErrorInClientFunctionCode;
class UncaughtErrorInCustomDOMPropertyCode extends TestRunErrorBase {
    constructor(instantiationCallsiteName, err, prop, callsite) {
        super(types_1.TEST_RUN_ERRORS.uncaughtErrorInCustomDOMPropertyCode, callsite);
        this.errMsg = String(err);
        this.property = prop;
        this.instantiationCallsiteName = instantiationCallsiteName;
    }
}
exports.UncaughtErrorInCustomDOMPropertyCode = UncaughtErrorInCustomDOMPropertyCode;
class UncaughtErrorInCustomClientScriptCode extends TestRunErrorBase {
    constructor(err) {
        super(types_1.TEST_RUN_ERRORS.uncaughtErrorInCustomClientScriptCode);
        this.errMsg = String(err);
    }
}
exports.UncaughtErrorInCustomClientScriptCode = UncaughtErrorInCustomClientScriptCode;
class UncaughtErrorInCustomClientScriptLoadedFromModule extends TestRunErrorBase {
    constructor(err, moduleName) {
        super(types_1.TEST_RUN_ERRORS.uncaughtErrorInCustomClientScriptCodeLoadedFromModule);
        this.errMsg = String(err);
        this.moduleName = moduleName;
    }
}
exports.UncaughtErrorInCustomClientScriptLoadedFromModule = UncaughtErrorInCustomClientScriptLoadedFromModule;
// Action parameters errors
//--------------------------------------------------------------------
// Options errors
//--------------------------------------------------------------------
class ActionIntegerOptionError extends ActionOptionErrorBase {
    constructor(optionName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionIntegerOptionError, optionName, actualValue);
    }
}
exports.ActionIntegerOptionError = ActionIntegerOptionError;
class ActionPositiveIntegerOptionError extends ActionOptionErrorBase {
    constructor(optionName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionPositiveIntegerOptionError, optionName, actualValue);
    }
}
exports.ActionPositiveIntegerOptionError = ActionPositiveIntegerOptionError;
class ActionBooleanOptionError extends ActionOptionErrorBase {
    constructor(optionName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionBooleanOptionError, optionName, actualValue);
    }
}
exports.ActionBooleanOptionError = ActionBooleanOptionError;
class ActionSpeedOptionError extends ActionOptionErrorBase {
    constructor(optionName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionSpeedOptionError, optionName, actualValue);
    }
}
exports.ActionSpeedOptionError = ActionSpeedOptionError;
class ActionStringOptionError extends ActionOptionErrorBase {
    constructor(optionName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionStringOptionError, optionName, actualValue);
    }
}
exports.ActionStringOptionError = ActionStringOptionError;
class ActionStringOrRegexOptionError extends ActionOptionErrorBase {
    constructor(optionName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionStringOrRegexOptionError, optionName, actualValue);
    }
}
exports.ActionStringOrRegexOptionError = ActionStringOrRegexOptionError;
class ActionDateOptionError extends ActionOptionErrorBase {
    constructor(optionName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionDateOptionError, optionName, actualValue);
    }
}
exports.ActionDateOptionError = ActionDateOptionError;
class ActionNumberOptionError extends ActionOptionErrorBase {
    constructor(optionName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionNumberOptionError, optionName, actualValue);
    }
}
exports.ActionNumberOptionError = ActionNumberOptionError;
class ActionUrlOptionError extends ActionOptionErrorBase {
    constructor(optionName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionUrlOptionError, optionName, actualValue);
    }
}
exports.ActionUrlOptionError = ActionUrlOptionError;
class ActionUrlSearchParamsOptionError extends ActionOptionErrorBase {
    constructor(optionName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionUrlSearchParamsOptionError, optionName, actualValue);
    }
}
exports.ActionUrlSearchParamsOptionError = ActionUrlSearchParamsOptionError;
class ActionObjectOptionError extends ActionOptionErrorBase {
    constructor(optionName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionObjectOptionError, optionName, actualValue);
    }
}
exports.ActionObjectOptionError = ActionObjectOptionError;
class ActionFunctionOptionError extends ActionOptionErrorBase {
    constructor(optionName, actualValue) {
        super(types_1.TEST_RUN_ERRORS.actionFunctionOptionError, optionName, actualValue);
    }
}
exports.ActionFunctionOptionError = ActionFunctionOptionError;
class ActionInvalidObjectPropertyError extends TestRunErrorBase {
    constructor(objectName, propertyName, availableProperties) {
        super(types_1.TEST_RUN_ERRORS.actionInvalidObjectPropertyError);
        this.objectName = objectName;
        this.propertyName = propertyName;
        this.availableProperties = availableProperties;
    }
}
exports.ActionInvalidObjectPropertyError = ActionInvalidObjectPropertyError;
// Action execution errors
//--------------------------------------------------------------------
class ActionElementNotFoundError extends SelectorErrorBase {
    constructor(callsite, apiFnArgs) {
        super(types_1.TEST_RUN_ERRORS.actionElementNotFoundError, apiFnArgs, callsite);
    }
}
exports.ActionElementNotFoundError = ActionElementNotFoundError;
class ActionElementIsInvisibleError extends TestRunErrorBase {
    constructor(callsite) {
        super(types_1.TEST_RUN_ERRORS.actionElementIsInvisibleError, callsite);
    }
}
exports.ActionElementIsInvisibleError = ActionElementIsInvisibleError;
class ActionSelectorMatchesWrongNodeTypeError extends TestRunErrorBase {
    constructor(nodeDescription) {
        super(types_1.TEST_RUN_ERRORS.actionSelectorMatchesWrongNodeTypeError);
        this.nodeDescription = nodeDescription;
    }
}
exports.ActionSelectorMatchesWrongNodeTypeError = ActionSelectorMatchesWrongNodeTypeError;
class ActionAdditionalElementNotFoundError extends SelectorErrorBase {
    constructor(argumentName, apiFnArgs) {
        super(types_1.TEST_RUN_ERRORS.actionAdditionalElementNotFoundError, apiFnArgs);
        this.argumentName = argumentName;
    }
}
exports.ActionAdditionalElementNotFoundError = ActionAdditionalElementNotFoundError;
class ActionAdditionalElementIsInvisibleError extends TestRunErrorBase {
    constructor(argumentName) {
        super(types_1.TEST_RUN_ERRORS.actionAdditionalElementIsInvisibleError);
        this.argumentName = argumentName;
    }
}
exports.ActionAdditionalElementIsInvisibleError = ActionAdditionalElementIsInvisibleError;
class ActionAdditionalSelectorMatchesWrongNodeTypeError extends TestRunErrorBase {
    constructor(argumentName, nodeDescription) {
        super(types_1.TEST_RUN_ERRORS.actionAdditionalSelectorMatchesWrongNodeTypeError);
        this.argumentName = argumentName;
        this.nodeDescription = nodeDescription;
    }
}
exports.ActionAdditionalSelectorMatchesWrongNodeTypeError = ActionAdditionalSelectorMatchesWrongNodeTypeError;
class ActionElementNonEditableError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.actionElementNonEditableError);
    }
}
exports.ActionElementNonEditableError = ActionElementNonEditableError;
class ActionElementNotTextAreaError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.actionElementNotTextAreaError);
    }
}
exports.ActionElementNotTextAreaError = ActionElementNotTextAreaError;
class ActionElementNonContentEditableError extends TestRunErrorBase {
    constructor(argumentName) {
        super(types_1.TEST_RUN_ERRORS.actionElementNonContentEditableError);
        this.argumentName = argumentName;
    }
}
exports.ActionElementNonContentEditableError = ActionElementNonContentEditableError;
class ActionRootContainerNotFoundError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.actionRootContainerNotFoundError);
    }
}
exports.ActionRootContainerNotFoundError = ActionRootContainerNotFoundError;
class ActionIncorrectKeysError extends TestRunErrorBase {
    constructor(argumentName) {
        super(types_1.TEST_RUN_ERRORS.actionIncorrectKeysError);
        this.argumentName = argumentName;
    }
}
exports.ActionIncorrectKeysError = ActionIncorrectKeysError;
class ActionCannotFindFileToUploadError extends TestRunErrorBase {
    constructor(filePaths, scannedFilePaths) {
        super(types_1.TEST_RUN_ERRORS.actionCannotFindFileToUploadError);
        this.filePaths = filePaths;
        this.scannedFilePaths = scannedFilePaths;
    }
}
exports.ActionCannotFindFileToUploadError = ActionCannotFindFileToUploadError;
class ActionElementIsNotFileInputError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.actionElementIsNotFileInputError);
    }
}
exports.ActionElementIsNotFileInputError = ActionElementIsNotFileInputError;
class ActionInvalidScrollTargetError extends TestRunErrorBase {
    constructor(scrollTargetXValid, scrollTargetYValid) {
        super(types_1.TEST_RUN_ERRORS.actionInvalidScrollTargetError);
        if (!scrollTargetXValid) {
            if (!scrollTargetYValid)
                this.properties = 'scrollTargetX and scrollTargetY properties';
            else
                this.properties = 'scrollTargetX property';
        }
        else
            this.properties = 'scrollTargetY property';
    }
}
exports.ActionInvalidScrollTargetError = ActionInvalidScrollTargetError;
class InvalidElementScreenshotDimensionsError extends TestRunErrorBase {
    constructor(width, height) {
        super(types_1.TEST_RUN_ERRORS.invalidElementScreenshotDimensionsError);
        const widthIsInvalid = width <= 0;
        const heightIsInvalid = height <= 0;
        if (widthIsInvalid) {
            if (heightIsInvalid) {
                this.verb = 'are';
                this.dimensions = 'width and height';
            }
            else {
                this.verb = 'is';
                this.dimensions = 'width';
            }
        }
        else {
            this.verb = 'is';
            this.dimensions = 'height';
        }
    }
}
exports.InvalidElementScreenshotDimensionsError = InvalidElementScreenshotDimensionsError;
// Iframe errors
//--------------------------------------------------------------------
class ActionElementNotIframeError extends TestRunErrorBase {
    constructor(callsite) {
        super(types_1.TEST_RUN_ERRORS.actionElementNotIframeError, callsite);
    }
}
exports.ActionElementNotIframeError = ActionElementNotIframeError;
class ActionIframeIsNotLoadedError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.actionIframeIsNotLoadedError);
    }
}
exports.ActionIframeIsNotLoadedError = ActionIframeIsNotLoadedError;
class CurrentIframeIsNotLoadedError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.currentIframeIsNotLoadedError);
    }
}
exports.CurrentIframeIsNotLoadedError = CurrentIframeIsNotLoadedError;
class ChildWindowNotFoundError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.childWindowNotFoundError);
    }
}
exports.ChildWindowNotFoundError = ChildWindowNotFoundError;
class ChildWindowIsNotLoadedError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.childWindowIsNotLoadedError);
    }
}
exports.ChildWindowIsNotLoadedError = ChildWindowIsNotLoadedError;
class CannotSwitchToWindowError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.cannotSwitchToWindowError);
    }
}
exports.CannotSwitchToWindowError = CannotSwitchToWindowError;
class CloseChildWindowError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.closeChildWindowError);
    }
}
exports.CloseChildWindowError = CloseChildWindowError;
class CannotCloseWindowWithChildrenError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.cannotCloseWindowWithChildrenError);
    }
}
exports.CannotCloseWindowWithChildrenError = CannotCloseWindowWithChildrenError;
class CannotCloseWindowWithoutParentError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.cannotCloseWindowWithoutParent);
    }
}
exports.CannotCloseWindowWithoutParentError = CannotCloseWindowWithoutParentError;
class SwitchToWindowPredicateError extends TestRunErrorBase {
    constructor(errMsg) {
        super(types_1.TEST_RUN_ERRORS.switchToWindowPredicateError);
        this.errMsg = errMsg;
    }
}
exports.SwitchToWindowPredicateError = SwitchToWindowPredicateError;
class WindowNotFoundError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.targetWindowNotFoundError);
    }
}
exports.WindowNotFoundError = WindowNotFoundError;
class ParentWindowNotFoundError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.parentWindowNotFoundError);
    }
}
exports.ParentWindowNotFoundError = ParentWindowNotFoundError;
class PreviousWindowNotFoundError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.previousWindowNotFoundError);
    }
}
exports.PreviousWindowNotFoundError = PreviousWindowNotFoundError;
class ChildWindowClosedBeforeSwitchingError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.childWindowClosedBeforeSwitchingError);
    }
}
exports.ChildWindowClosedBeforeSwitchingError = ChildWindowClosedBeforeSwitchingError;
class CannotRestoreChildWindowError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.cannotRestoreChildWindowError);
    }
}
exports.CannotRestoreChildWindowError = CannotRestoreChildWindowError;
class CurrentIframeNotFoundError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.currentIframeNotFoundError);
    }
}
exports.CurrentIframeNotFoundError = CurrentIframeNotFoundError;
class CurrentIframeIsInvisibleError extends TestRunErrorBase {
    constructor() {
        super(types_1.TEST_RUN_ERRORS.currentIframeIsInvisibleError);
    }
}
exports.CurrentIframeIsInvisibleError = CurrentIframeIsInvisibleError;
// Native dialog errors
//--------------------------------------------------------------------
class NativeDialogNotHandledError extends TestRunErrorBase {
    constructor(dialogType, url) {
        super(types_1.TEST_RUN_ERRORS.nativeDialogNotHandledError);
        this.dialogType = dialogType;
        this.pageUrl = url;
    }
}
exports.NativeDialogNotHandledError = NativeDialogNotHandledError;
class UncaughtErrorInNativeDialogHandler extends TestRunErrorBase {
    constructor(dialogType, errMsg, url) {
        super(types_1.TEST_RUN_ERRORS.uncaughtErrorInNativeDialogHandler);
        this.dialogType = dialogType;
        this.errMsg = errMsg;
        this.pageUrl = url;
    }
}
exports.UncaughtErrorInNativeDialogHandler = UncaughtErrorInNativeDialogHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2hhcmVkL2Vycm9ycy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsZ0VBQWdFO0FBQ2hFLGdFQUFnRTtBQUNoRSwrQ0FBK0M7QUFDL0MsZ0VBQWdFO0FBQ2hFLDhDQUFxRDtBQUVyRCxPQUFPO0FBQ1Asc0VBQXNFO0FBQ3RFLE1BQWEsZ0JBQWdCO0lBQ3pCLFlBQWEsSUFBSSxFQUFFLFFBQVE7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBYyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBVSxRQUFRLElBQUksSUFBSSxDQUFDO0lBQzVDLENBQUM7Q0FDSjtBQU5ELDRDQU1DO0FBRUQsTUFBTSxxQkFBc0IsU0FBUSxnQkFBZ0I7SUFDaEQsWUFBYSxJQUFJLEVBQUUsVUFBVSxFQUFFLFdBQVc7UUFDdEMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRVosSUFBSSxDQUFDLFVBQVUsR0FBSSxVQUFVLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDbkMsQ0FBQztDQUNKO0FBR0QseUJBQXlCO0FBQ3pCLHNFQUFzRTtBQUN0RSxNQUFhLHdDQUF5QyxTQUFRLGdCQUFnQjtJQUMxRSxZQUFhLHlCQUF5QixFQUFFLFFBQVE7UUFDNUMsS0FBSyxDQUFDLHVCQUFlLENBQUMsd0NBQXdDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFMUUsSUFBSSxDQUFDLHlCQUF5QixHQUFHLHlCQUF5QixDQUFDO0lBQy9ELENBQUM7Q0FDSjtBQU5ELDRGQU1DO0FBRUQsTUFBYSxnQ0FBaUMsU0FBUSxnQkFBZ0I7SUFDbEUsWUFBYSx5QkFBeUIsRUFBRSxRQUFRO1FBQzVDLEtBQUssQ0FBQyx1QkFBZSxDQUFDLGdDQUFnQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRWxFLElBQUksQ0FBQyx5QkFBeUIsR0FBRyx5QkFBeUIsQ0FBQztJQUMvRCxDQUFDO0NBQ0o7QUFORCw0RUFNQztBQUVELGtCQUFrQjtBQUNsQixzRUFBc0U7QUFDdEUsTUFBYSxpQkFBa0IsU0FBUSxnQkFBZ0I7SUFDbkQsWUFBYSxJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsUUFBUTtRQUNuRCxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXRCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7Q0FDSjtBQVBELDhDQU9DO0FBRUQsTUFBYSwwQkFBMkIsU0FBUSxnQkFBZ0I7SUFDNUQsWUFBYSxRQUFRO1FBQ2pCLEtBQUssQ0FBQyx1QkFBZSxDQUFDLDBCQUEwQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Q0FDSjtBQUpELGdFQUlDO0FBRUQsTUFBYSxrREFBbUQsU0FBUSxpQkFBaUI7SUFDckYsWUFBYSxRQUFRLEVBQUUsU0FBUztRQUM1QixLQUFLLENBQUMsdUJBQWUsQ0FBQyxrREFBa0QsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbkcsQ0FBQztDQUNKO0FBSkQsZ0hBSUM7QUFHRCxrQkFBa0I7QUFDbEIsc0VBQXNFO0FBQ3RFLE1BQWEsbUJBQW9CLFNBQVEsZ0JBQWdCO0lBQ3JELFlBQWEsUUFBUSxFQUFFLFdBQVc7UUFDOUIsS0FBSyxDQUFDLHVCQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsUUFBUSxHQUFNLFFBQVEsQ0FBQztRQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNuQyxDQUFDO0NBQ0o7QUFQRCxrREFPQztBQUVELE1BQWEsaUNBQWtDLFNBQVEsZ0JBQWdCO0lBQ25FLFlBQWEseUJBQXlCLEVBQUUsR0FBRyxFQUFFLFFBQVE7UUFDakQsS0FBSyxDQUFDLHVCQUFlLENBQUMsaUNBQWlDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFbkUsSUFBSSxDQUFDLE1BQU0sR0FBc0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyx5QkFBeUIsQ0FBQztJQUMvRCxDQUFDO0NBQ0o7QUFQRCw4RUFPQztBQUVELE1BQWEsb0NBQXFDLFNBQVEsZ0JBQWdCO0lBQ3RFLFlBQWEseUJBQXlCLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRO1FBQ3ZELEtBQUssQ0FBQyx1QkFBZSxDQUFDLG9DQUFvQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXRFLElBQUksQ0FBQyxNQUFNLEdBQXNCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFvQixJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLHlCQUF5QixHQUFHLHlCQUF5QixDQUFDO0lBQy9ELENBQUM7Q0FDSjtBQVJELG9GQVFDO0FBRUQsTUFBYSxxQ0FBc0MsU0FBUSxnQkFBZ0I7SUFDdkUsWUFBYSxHQUFHO1FBQ1osS0FBSyxDQUFDLHVCQUFlLENBQUMscUNBQXFDLENBQUMsQ0FBQztRQUU3RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7QUFORCxzRkFNQztBQUVELE1BQWEsaURBQWtELFNBQVEsZ0JBQWdCO0lBQ25GLFlBQWEsR0FBRyxFQUFFLFVBQVU7UUFDeEIsS0FBSyxDQUFDLHVCQUFlLENBQUMscURBQXFELENBQUMsQ0FBQztRQUU3RSxJQUFJLENBQUMsTUFBTSxHQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0NBQ0o7QUFQRCw4R0FPQztBQUdELDJCQUEyQjtBQUMzQixzRUFBc0U7QUFDdEUsaUJBQWlCO0FBQ2pCLHNFQUFzRTtBQUN0RSxNQUFhLHdCQUF5QixTQUFRLHFCQUFxQjtJQUMvRCxZQUFhLFVBQVUsRUFBRSxXQUFXO1FBQ2hDLEtBQUssQ0FBQyx1QkFBZSxDQUFDLHdCQUF3QixFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM3RSxDQUFDO0NBQ0o7QUFKRCw0REFJQztBQUVELE1BQWEsZ0NBQWlDLFNBQVEscUJBQXFCO0lBQ3ZFLFlBQWEsVUFBVSxFQUFFLFdBQVc7UUFDaEMsS0FBSyxDQUFDLHVCQUFlLENBQUMsZ0NBQWdDLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7Q0FDSjtBQUpELDRFQUlDO0FBRUQsTUFBYSx3QkFBeUIsU0FBUSxxQkFBcUI7SUFDL0QsWUFBYSxVQUFVLEVBQUUsV0FBVztRQUNoQyxLQUFLLENBQUMsdUJBQWUsQ0FBQyx3QkFBd0IsRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDN0UsQ0FBQztDQUNKO0FBSkQsNERBSUM7QUFFRCxNQUFhLHNCQUF1QixTQUFRLHFCQUFxQjtJQUM3RCxZQUFhLFVBQVUsRUFBRSxXQUFXO1FBQ2hDLEtBQUssQ0FBQyx1QkFBZSxDQUFDLHNCQUFzQixFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMzRSxDQUFDO0NBQ0o7QUFKRCx3REFJQztBQUVELE1BQWEsdUJBQXdCLFNBQVEscUJBQXFCO0lBQzlELFlBQWEsVUFBVSxFQUFFLFdBQVc7UUFDaEMsS0FBSyxDQUFDLHVCQUFlLENBQUMsdUJBQXVCLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzVFLENBQUM7Q0FDSjtBQUpELDBEQUlDO0FBQ0QsTUFBYSw4QkFBK0IsU0FBUSxxQkFBcUI7SUFDckUsWUFBYSxVQUFVLEVBQUUsV0FBVztRQUNoQyxLQUFLLENBQUMsdUJBQWUsQ0FBQyw4QkFBOEIsRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDbkYsQ0FBQztDQUNKO0FBSkQsd0VBSUM7QUFFRCxNQUFhLHFCQUFzQixTQUFRLHFCQUFxQjtJQUM1RCxZQUFhLFVBQVUsRUFBRSxXQUFXO1FBQ2hDLEtBQUssQ0FBQyx1QkFBZSxDQUFDLHFCQUFxQixFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMxRSxDQUFDO0NBQ0o7QUFKRCxzREFJQztBQUVELE1BQWEsdUJBQXdCLFNBQVEscUJBQXFCO0lBQzlELFlBQWEsVUFBVSxFQUFFLFdBQVc7UUFDaEMsS0FBSyxDQUFDLHVCQUFlLENBQUMsdUJBQXVCLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzVFLENBQUM7Q0FDSjtBQUpELDBEQUlDO0FBRUQsTUFBYSxvQkFBcUIsU0FBUSxxQkFBcUI7SUFDM0QsWUFBYSxVQUFVLEVBQUUsV0FBVztRQUNoQyxLQUFLLENBQUMsdUJBQWUsQ0FBQyxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDekUsQ0FBQztDQUNKO0FBSkQsb0RBSUM7QUFFRCxNQUFhLGdDQUFpQyxTQUFRLHFCQUFxQjtJQUN2RSxZQUFhLFVBQVUsRUFBRSxXQUFXO1FBQ2hDLEtBQUssQ0FBQyx1QkFBZSxDQUFDLGdDQUFnQyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNyRixDQUFDO0NBQ0o7QUFKRCw0RUFJQztBQUVELE1BQWEsdUJBQXdCLFNBQVEscUJBQXFCO0lBQzlELFlBQWEsVUFBVSxFQUFFLFdBQVc7UUFDaEMsS0FBSyxDQUFDLHVCQUFlLENBQUMsdUJBQXVCLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzVFLENBQUM7Q0FDSjtBQUpELDBEQUlDO0FBRUQsTUFBYSx5QkFBMEIsU0FBUSxxQkFBcUI7SUFDaEUsWUFBYSxVQUFVLEVBQUUsV0FBVztRQUNoQyxLQUFLLENBQUMsdUJBQWUsQ0FBQyx5QkFBeUIsRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDOUUsQ0FBQztDQUNKO0FBSkQsOERBSUM7QUFFRCxNQUFhLGdDQUFpQyxTQUFRLGdCQUFnQjtJQUNsRSxZQUFhLFVBQVUsRUFBRSxZQUFZLEVBQUUsbUJBQW1CO1FBQ3RELEtBQUssQ0FBQyx1QkFBZSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLFVBQVUsR0FBWSxVQUFVLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksR0FBVSxZQUFZLENBQUM7UUFDeEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO0lBQ25ELENBQUM7Q0FDSjtBQVJELDRFQVFDO0FBRUQsMEJBQTBCO0FBQzFCLHNFQUFzRTtBQUN0RSxNQUFhLDBCQUEyQixTQUFRLGlCQUFpQjtJQUM3RCxZQUFhLFFBQVEsRUFBRSxTQUFTO1FBQzVCLEtBQUssQ0FBQyx1QkFBZSxDQUFDLDBCQUEwQixFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzRSxDQUFDO0NBQ0o7QUFKRCxnRUFJQztBQUVELE1BQWEsNkJBQThCLFNBQVEsZ0JBQWdCO0lBQy9ELFlBQWEsUUFBUTtRQUNqQixLQUFLLENBQUMsdUJBQWUsQ0FBQyw2QkFBNkIsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNuRSxDQUFDO0NBQ0o7QUFKRCxzRUFJQztBQUVELE1BQWEsdUNBQXdDLFNBQVEsZ0JBQWdCO0lBQ3pFLFlBQWEsZUFBZTtRQUN4QixLQUFLLENBQUMsdUJBQWUsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBRS9ELElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0lBQzNDLENBQUM7Q0FDSjtBQU5ELDBGQU1DO0FBRUQsTUFBYSxvQ0FBcUMsU0FBUSxpQkFBaUI7SUFDdkUsWUFBYSxZQUFZLEVBQUUsU0FBUztRQUNoQyxLQUFLLENBQUMsdUJBQWUsQ0FBQyxvQ0FBb0MsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV2RSxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNyQyxDQUFDO0NBQ0o7QUFORCxvRkFNQztBQUVELE1BQWEsdUNBQXdDLFNBQVEsZ0JBQWdCO0lBQ3pFLFlBQWEsWUFBWTtRQUNyQixLQUFLLENBQUMsdUJBQWUsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBRS9ELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ3JDLENBQUM7Q0FDSjtBQU5ELDBGQU1DO0FBRUQsTUFBYSxpREFBa0QsU0FBUSxnQkFBZ0I7SUFDbkYsWUFBYSxZQUFZLEVBQUUsZUFBZTtRQUN0QyxLQUFLLENBQUMsdUJBQWUsQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO1FBRXpFLElBQUksQ0FBQyxZQUFZLEdBQU0sWUFBWSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0lBQzNDLENBQUM7Q0FDSjtBQVBELDhHQU9DO0FBRUQsTUFBYSw2QkFBOEIsU0FBUSxnQkFBZ0I7SUFDL0Q7UUFDSSxLQUFLLENBQUMsdUJBQWUsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDSjtBQUpELHNFQUlDO0FBRUQsTUFBYSw2QkFBOEIsU0FBUSxnQkFBZ0I7SUFDL0Q7UUFDSSxLQUFLLENBQUMsdUJBQWUsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDSjtBQUpELHNFQUlDO0FBRUQsTUFBYSxvQ0FBcUMsU0FBUSxnQkFBZ0I7SUFDdEUsWUFBYSxZQUFZO1FBQ3JCLEtBQUssQ0FBQyx1QkFBZSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFFNUQsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDckMsQ0FBQztDQUNKO0FBTkQsb0ZBTUM7QUFFRCxNQUFhLGdDQUFpQyxTQUFRLGdCQUFnQjtJQUNsRTtRQUNJLEtBQUssQ0FBQyx1QkFBZSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztDQUNKO0FBSkQsNEVBSUM7QUFFRCxNQUFhLHdCQUF5QixTQUFRLGdCQUFnQjtJQUMxRCxZQUFhLFlBQVk7UUFDckIsS0FBSyxDQUFDLHVCQUFlLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUVoRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNyQyxDQUFDO0NBQ0o7QUFORCw0REFNQztBQUVELE1BQWEsaUNBQWtDLFNBQVEsZ0JBQWdCO0lBQ25FLFlBQWEsU0FBUyxFQUFFLGdCQUFnQjtRQUNwQyxLQUFLLENBQUMsdUJBQWUsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBRXpELElBQUksQ0FBQyxTQUFTLEdBQVUsU0FBUyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztJQUM3QyxDQUFDO0NBQ0o7QUFQRCw4RUFPQztBQUVELE1BQWEsZ0NBQWlDLFNBQVEsZ0JBQWdCO0lBQ2xFO1FBQ0ksS0FBSyxDQUFDLHVCQUFlLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0NBQ0o7QUFKRCw0RUFJQztBQUVELE1BQWEsOEJBQStCLFNBQVEsZ0JBQWdCO0lBQ2hFLFlBQWEsa0JBQWtCLEVBQUUsa0JBQWtCO1FBQy9DLEtBQUssQ0FBQyx1QkFBZSxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFFdEQsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ3JCLElBQUksQ0FBQyxrQkFBa0I7Z0JBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsNENBQTRDLENBQUM7O2dCQUUvRCxJQUFJLENBQUMsVUFBVSxHQUFHLHdCQUF3QixDQUFDO1NBQ2xEOztZQUVHLElBQUksQ0FBQyxVQUFVLEdBQUcsd0JBQXdCLENBQUM7SUFDbkQsQ0FBQztDQUNKO0FBYkQsd0VBYUM7QUFFRCxNQUFhLHVDQUF3QyxTQUFRLGdCQUFnQjtJQUN6RSxZQUFhLEtBQUssRUFBRSxNQUFNO1FBQ3RCLEtBQUssQ0FBQyx1QkFBZSxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFFL0QsTUFBTSxjQUFjLEdBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNuQyxNQUFNLGVBQWUsR0FBRyxNQUFNLElBQUksQ0FBQyxDQUFDO1FBRXBDLElBQUksY0FBYyxFQUFFO1lBQ2hCLElBQUksZUFBZSxFQUFFO2dCQUNqQixJQUFJLENBQUMsSUFBSSxHQUFTLEtBQUssQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQzthQUN4QztpQkFDSTtnQkFDRCxJQUFJLENBQUMsSUFBSSxHQUFTLElBQUksQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7YUFDN0I7U0FDSjthQUNJO1lBQ0QsSUFBSSxDQUFDLElBQUksR0FBUyxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7U0FDOUI7SUFDTCxDQUFDO0NBQ0o7QUF0QkQsMEZBc0JDO0FBR0QsZ0JBQWdCO0FBQ2hCLHNFQUFzRTtBQUN0RSxNQUFhLDJCQUE0QixTQUFRLGdCQUFnQjtJQUM3RCxZQUFhLFFBQVE7UUFDakIsS0FBSyxDQUFDLHVCQUFlLENBQUMsMkJBQTJCLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDakUsQ0FBQztDQUNKO0FBSkQsa0VBSUM7QUFFRCxNQUFhLDRCQUE2QixTQUFRLGdCQUFnQjtJQUM5RDtRQUNJLEtBQUssQ0FBQyx1QkFBZSxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUNKO0FBSkQsb0VBSUM7QUFFRCxNQUFhLDZCQUE4QixTQUFRLGdCQUFnQjtJQUMvRDtRQUNJLEtBQUssQ0FBQyx1QkFBZSxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDekQsQ0FBQztDQUNKO0FBSkQsc0VBSUM7QUFFRCxNQUFhLHdCQUF5QixTQUFRLGdCQUFnQjtJQUMxRDtRQUNJLEtBQUssQ0FBQyx1QkFBZSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDcEQsQ0FBQztDQUNKO0FBSkQsNERBSUM7QUFFRCxNQUFhLDJCQUE0QixTQUFRLGdCQUFnQjtJQUM3RDtRQUNJLEtBQUssQ0FBQyx1QkFBZSxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDdkQsQ0FBQztDQUNKO0FBSkQsa0VBSUM7QUFFRCxNQUFhLHlCQUEwQixTQUFRLGdCQUFnQjtJQUMzRDtRQUNJLEtBQUssQ0FBQyx1QkFBZSxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDckQsQ0FBQztDQUNKO0FBSkQsOERBSUM7QUFFRCxNQUFhLHFCQUFzQixTQUFRLGdCQUFnQjtJQUN2RDtRQUNJLEtBQUssQ0FBQyx1QkFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNKO0FBSkQsc0RBSUM7QUFFRCxNQUFhLGtDQUFtQyxTQUFRLGdCQUFnQjtJQUNwRTtRQUNJLEtBQUssQ0FBQyx1QkFBZSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztDQUNKO0FBSkQsZ0ZBSUM7QUFFRCxNQUFhLG1DQUFvQyxTQUFRLGdCQUFnQjtJQUNyRTtRQUNJLEtBQUssQ0FBQyx1QkFBZSxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDMUQsQ0FBQztDQUNKO0FBSkQsa0ZBSUM7QUFFRCxNQUFhLDRCQUE2QixTQUFRLGdCQUFnQjtJQUM5RCxZQUFhLE1BQU07UUFDZixLQUFLLENBQUMsdUJBQWUsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7Q0FDSjtBQU5ELG9FQU1DO0FBRUQsTUFBYSxtQkFBb0IsU0FBUSxnQkFBZ0I7SUFDckQ7UUFDSSxLQUFLLENBQUMsdUJBQWUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FDSjtBQUpELGtEQUlDO0FBRUQsTUFBYSx5QkFBMEIsU0FBUSxnQkFBZ0I7SUFDM0Q7UUFDSSxLQUFLLENBQUMsdUJBQWUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FDSjtBQUpELDhEQUlDO0FBRUQsTUFBYSwyQkFBNEIsU0FBUSxnQkFBZ0I7SUFDN0Q7UUFDSSxLQUFLLENBQUMsdUJBQWUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Q0FDSjtBQUpELGtFQUlDO0FBRUQsTUFBYSxxQ0FBc0MsU0FBUSxnQkFBZ0I7SUFDdkU7UUFDSSxLQUFLLENBQUMsdUJBQWUsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Q0FDSjtBQUpELHNGQUlDO0FBRUQsTUFBYSw2QkFBOEIsU0FBUSxnQkFBZ0I7SUFDL0Q7UUFDSSxLQUFLLENBQUMsdUJBQWUsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDSjtBQUpELHNFQUlDO0FBRUQsTUFBYSwwQkFBMkIsU0FBUSxnQkFBZ0I7SUFDNUQ7UUFDSSxLQUFLLENBQUMsdUJBQWUsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FDSjtBQUpELGdFQUlDO0FBRUQsTUFBYSw2QkFBOEIsU0FBUSxnQkFBZ0I7SUFDL0Q7UUFDSSxLQUFLLENBQUMsdUJBQWUsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDSjtBQUpELHNFQUlDO0FBR0QsdUJBQXVCO0FBQ3ZCLHNFQUFzRTtBQUN0RSxNQUFhLDJCQUE0QixTQUFRLGdCQUFnQjtJQUM3RCxZQUFhLFVBQVUsRUFBRSxHQUFHO1FBQ3hCLEtBQUssQ0FBQyx1QkFBZSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBTSxHQUFHLENBQUM7SUFDMUIsQ0FBQztDQUNKO0FBUEQsa0VBT0M7QUFFRCxNQUFhLGtDQUFtQyxTQUFRLGdCQUFnQjtJQUNwRSxZQUFhLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRztRQUNoQyxLQUFLLENBQUMsdUJBQWUsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBRTFELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQU8sTUFBTSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQU0sR0FBRyxDQUFDO0lBQzFCLENBQUM7Q0FDSjtBQVJELGdGQVFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gV0FSTklORzogdGhpcyBmaWxlIGlzIHVzZWQgYnkgYm90aCB0aGUgY2xpZW50IGFuZCB0aGUgc2VydmVyLlxuLy8gRG8gbm90IHVzZSBhbnkgYnJvd3NlciBvciBub2RlLXNwZWNpZmljIEFQSSFcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmltcG9ydCB7IFRFU1RfUlVOX0VSUk9SUyB9IGZyb20gJy4uLy4uL2Vycm9ycy90eXBlcyc7XG5cbi8vIEJhc2Vcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBjbGFzcyBUZXN0UnVuRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoY29kZSwgY2FsbHNpdGUpIHtcbiAgICAgICAgdGhpcy5jb2RlICAgICAgICAgICAgPSBjb2RlO1xuICAgICAgICB0aGlzLmlzVGVzdENhZmVFcnJvciA9IHRydWU7XG4gICAgICAgIHRoaXMuY2FsbHNpdGUgICAgICAgID0gY2FsbHNpdGUgfHwgbnVsbDtcbiAgICB9XG59XG5cbmNsYXNzIEFjdGlvbk9wdGlvbkVycm9yQmFzZSBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChjb2RlLCBvcHRpb25OYW1lLCBhY3R1YWxWYWx1ZSkge1xuICAgICAgICBzdXBlcihjb2RlKTtcblxuICAgICAgICB0aGlzLm9wdGlvbk5hbWUgID0gb3B0aW9uTmFtZTtcbiAgICAgICAgdGhpcy5hY3R1YWxWYWx1ZSA9IGFjdHVhbFZhbHVlO1xuICAgIH1cbn1cblxuXG4vLyBDbGllbnQgZnVuY3Rpb24gZXJyb3JzXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5leHBvcnQgY2xhc3MgQ2xpZW50RnVuY3Rpb25FeGVjdXRpb25JbnRlcnJ1cHRpb25FcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChpbnN0YW50aWF0aW9uQ2FsbHNpdGVOYW1lLCBjYWxsc2l0ZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuY2xpZW50RnVuY3Rpb25FeGVjdXRpb25JbnRlcnJ1cHRpb25FcnJvciwgY2FsbHNpdGUpO1xuXG4gICAgICAgIHRoaXMuaW5zdGFudGlhdGlvbkNhbGxzaXRlTmFtZSA9IGluc3RhbnRpYXRpb25DYWxsc2l0ZU5hbWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRG9tTm9kZUNsaWVudEZ1bmN0aW9uUmVzdWx0RXJyb3IgZXh0ZW5kcyBUZXN0UnVuRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoaW5zdGFudGlhdGlvbkNhbGxzaXRlTmFtZSwgY2FsbHNpdGUpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmRvbU5vZGVDbGllbnRGdW5jdGlvblJlc3VsdEVycm9yLCBjYWxsc2l0ZSk7XG5cbiAgICAgICAgdGhpcy5pbnN0YW50aWF0aW9uQ2FsbHNpdGVOYW1lID0gaW5zdGFudGlhdGlvbkNhbGxzaXRlTmFtZTtcbiAgICB9XG59XG5cbi8vIFNlbGVjdG9yIGVycm9yc1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGNsYXNzIFNlbGVjdG9yRXJyb3JCYXNlIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGNvZGUsIHsgYXBpRm5DaGFpbiwgYXBpRm5JbmRleCB9LCBjYWxsc2l0ZSkge1xuICAgICAgICBzdXBlcihjb2RlLCBjYWxsc2l0ZSk7XG5cbiAgICAgICAgdGhpcy5hcGlGbkNoYWluID0gYXBpRm5DaGFpbjtcbiAgICAgICAgdGhpcy5hcGlGbkluZGV4ID0gYXBpRm5JbmRleDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnZhbGlkU2VsZWN0b3JSZXN1bHRFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChjYWxsc2l0ZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuaW52YWxpZFNlbGVjdG9yUmVzdWx0RXJyb3IsIGNhbGxzaXRlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYW5ub3RPYnRhaW5JbmZvRm9yRWxlbWVudFNwZWNpZmllZEJ5U2VsZWN0b3JFcnJvciBleHRlbmRzIFNlbGVjdG9yRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoY2FsbHNpdGUsIGFwaUZuQXJncykge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuY2Fubm90T2J0YWluSW5mb0ZvckVsZW1lbnRTcGVjaWZpZWRCeVNlbGVjdG9yRXJyb3IsIGFwaUZuQXJncywgY2FsbHNpdGUpO1xuICAgIH1cbn1cblxuXG4vLyBVbmNhdWdodCBlcnJvcnNcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBjbGFzcyBVbmNhdWdodEVycm9yT25QYWdlIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGVyclN0YWNrLCBwYWdlRGVzdFVybCkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMudW5jYXVnaHRFcnJvck9uUGFnZSk7XG5cbiAgICAgICAgdGhpcy5lcnJTdGFjayAgICA9IGVyclN0YWNrO1xuICAgICAgICB0aGlzLnBhZ2VEZXN0VXJsID0gcGFnZURlc3RVcmw7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVW5jYXVnaHRFcnJvckluQ2xpZW50RnVuY3Rpb25Db2RlIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGluc3RhbnRpYXRpb25DYWxsc2l0ZU5hbWUsIGVyciwgY2FsbHNpdGUpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLnVuY2F1Z2h0RXJyb3JJbkNsaWVudEZ1bmN0aW9uQ29kZSwgY2FsbHNpdGUpO1xuXG4gICAgICAgIHRoaXMuZXJyTXNnICAgICAgICAgICAgICAgICAgICA9IFN0cmluZyhlcnIpO1xuICAgICAgICB0aGlzLmluc3RhbnRpYXRpb25DYWxsc2l0ZU5hbWUgPSBpbnN0YW50aWF0aW9uQ2FsbHNpdGVOYW1lO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFVuY2F1Z2h0RXJyb3JJbkN1c3RvbURPTVByb3BlcnR5Q29kZSBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChpbnN0YW50aWF0aW9uQ2FsbHNpdGVOYW1lLCBlcnIsIHByb3AsIGNhbGxzaXRlKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy51bmNhdWdodEVycm9ySW5DdXN0b21ET01Qcm9wZXJ0eUNvZGUsIGNhbGxzaXRlKTtcblxuICAgICAgICB0aGlzLmVyck1zZyAgICAgICAgICAgICAgICAgICAgPSBTdHJpbmcoZXJyKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eSAgICAgICAgICAgICAgICAgID0gcHJvcDtcbiAgICAgICAgdGhpcy5pbnN0YW50aWF0aW9uQ2FsbHNpdGVOYW1lID0gaW5zdGFudGlhdGlvbkNhbGxzaXRlTmFtZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBVbmNhdWdodEVycm9ySW5DdXN0b21DbGllbnRTY3JpcHRDb2RlIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGVycikge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMudW5jYXVnaHRFcnJvckluQ3VzdG9tQ2xpZW50U2NyaXB0Q29kZSk7XG5cbiAgICAgICAgdGhpcy5lcnJNc2cgPSBTdHJpbmcoZXJyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBVbmNhdWdodEVycm9ySW5DdXN0b21DbGllbnRTY3JpcHRMb2FkZWRGcm9tTW9kdWxlIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGVyciwgbW9kdWxlTmFtZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMudW5jYXVnaHRFcnJvckluQ3VzdG9tQ2xpZW50U2NyaXB0Q29kZUxvYWRlZEZyb21Nb2R1bGUpO1xuXG4gICAgICAgIHRoaXMuZXJyTXNnICAgICA9IFN0cmluZyhlcnIpO1xuICAgICAgICB0aGlzLm1vZHVsZU5hbWUgPSBtb2R1bGVOYW1lO1xuICAgIH1cbn1cblxuXG4vLyBBY3Rpb24gcGFyYW1ldGVycyBlcnJvcnNcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wdGlvbnMgZXJyb3JzXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5leHBvcnQgY2xhc3MgQWN0aW9uSW50ZWdlck9wdGlvbkVycm9yIGV4dGVuZHMgQWN0aW9uT3B0aW9uRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAob3B0aW9uTmFtZSwgYWN0dWFsVmFsdWUpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvbkludGVnZXJPcHRpb25FcnJvciwgb3B0aW9uTmFtZSwgYWN0dWFsVmFsdWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFjdGlvblBvc2l0aXZlSW50ZWdlck9wdGlvbkVycm9yIGV4dGVuZHMgQWN0aW9uT3B0aW9uRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAob3B0aW9uTmFtZSwgYWN0dWFsVmFsdWUpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvblBvc2l0aXZlSW50ZWdlck9wdGlvbkVycm9yLCBvcHRpb25OYW1lLCBhY3R1YWxWYWx1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uQm9vbGVhbk9wdGlvbkVycm9yIGV4dGVuZHMgQWN0aW9uT3B0aW9uRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAob3B0aW9uTmFtZSwgYWN0dWFsVmFsdWUpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvbkJvb2xlYW5PcHRpb25FcnJvciwgb3B0aW9uTmFtZSwgYWN0dWFsVmFsdWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFjdGlvblNwZWVkT3B0aW9uRXJyb3IgZXh0ZW5kcyBBY3Rpb25PcHRpb25FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChvcHRpb25OYW1lLCBhY3R1YWxWYWx1ZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuYWN0aW9uU3BlZWRPcHRpb25FcnJvciwgb3B0aW9uTmFtZSwgYWN0dWFsVmFsdWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFjdGlvblN0cmluZ09wdGlvbkVycm9yIGV4dGVuZHMgQWN0aW9uT3B0aW9uRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAob3B0aW9uTmFtZSwgYWN0dWFsVmFsdWUpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvblN0cmluZ09wdGlvbkVycm9yLCBvcHRpb25OYW1lLCBhY3R1YWxWYWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEFjdGlvblN0cmluZ09yUmVnZXhPcHRpb25FcnJvciBleHRlbmRzIEFjdGlvbk9wdGlvbkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKG9wdGlvbk5hbWUsIGFjdHVhbFZhbHVlKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5hY3Rpb25TdHJpbmdPclJlZ2V4T3B0aW9uRXJyb3IsIG9wdGlvbk5hbWUsIGFjdHVhbFZhbHVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25EYXRlT3B0aW9uRXJyb3IgZXh0ZW5kcyBBY3Rpb25PcHRpb25FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChvcHRpb25OYW1lLCBhY3R1YWxWYWx1ZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuYWN0aW9uRGF0ZU9wdGlvbkVycm9yLCBvcHRpb25OYW1lLCBhY3R1YWxWYWx1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uTnVtYmVyT3B0aW9uRXJyb3IgZXh0ZW5kcyBBY3Rpb25PcHRpb25FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChvcHRpb25OYW1lLCBhY3R1YWxWYWx1ZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuYWN0aW9uTnVtYmVyT3B0aW9uRXJyb3IsIG9wdGlvbk5hbWUsIGFjdHVhbFZhbHVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25VcmxPcHRpb25FcnJvciBleHRlbmRzIEFjdGlvbk9wdGlvbkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKG9wdGlvbk5hbWUsIGFjdHVhbFZhbHVlKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5hY3Rpb25VcmxPcHRpb25FcnJvciwgb3B0aW9uTmFtZSwgYWN0dWFsVmFsdWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFjdGlvblVybFNlYXJjaFBhcmFtc09wdGlvbkVycm9yIGV4dGVuZHMgQWN0aW9uT3B0aW9uRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAob3B0aW9uTmFtZSwgYWN0dWFsVmFsdWUpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvblVybFNlYXJjaFBhcmFtc09wdGlvbkVycm9yLCBvcHRpb25OYW1lLCBhY3R1YWxWYWx1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uT2JqZWN0T3B0aW9uRXJyb3IgZXh0ZW5kcyBBY3Rpb25PcHRpb25FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChvcHRpb25OYW1lLCBhY3R1YWxWYWx1ZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuYWN0aW9uT2JqZWN0T3B0aW9uRXJyb3IsIG9wdGlvbk5hbWUsIGFjdHVhbFZhbHVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25GdW5jdGlvbk9wdGlvbkVycm9yIGV4dGVuZHMgQWN0aW9uT3B0aW9uRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAob3B0aW9uTmFtZSwgYWN0dWFsVmFsdWUpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvbkZ1bmN0aW9uT3B0aW9uRXJyb3IsIG9wdGlvbk5hbWUsIGFjdHVhbFZhbHVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25JbnZhbGlkT2JqZWN0UHJvcGVydHlFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChvYmplY3ROYW1lLCBwcm9wZXJ0eU5hbWUsIGF2YWlsYWJsZVByb3BlcnRpZXMpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvbkludmFsaWRPYmplY3RQcm9wZXJ0eUVycm9yKTtcblxuICAgICAgICB0aGlzLm9iamVjdE5hbWUgICAgICAgICAgPSBvYmplY3ROYW1lO1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSAgICAgICAgPSBwcm9wZXJ0eU5hbWU7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlUHJvcGVydGllcyA9IGF2YWlsYWJsZVByb3BlcnRpZXM7XG4gICAgfVxufVxuXG4vLyBBY3Rpb24gZXhlY3V0aW9uIGVycm9yc1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGNsYXNzIEFjdGlvbkVsZW1lbnROb3RGb3VuZEVycm9yIGV4dGVuZHMgU2VsZWN0b3JFcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChjYWxsc2l0ZSwgYXBpRm5BcmdzKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5hY3Rpb25FbGVtZW50Tm90Rm91bmRFcnJvciwgYXBpRm5BcmdzLCBjYWxsc2l0ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uRWxlbWVudElzSW52aXNpYmxlRXJyb3IgZXh0ZW5kcyBUZXN0UnVuRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoY2FsbHNpdGUpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvbkVsZW1lbnRJc0ludmlzaWJsZUVycm9yLCBjYWxsc2l0ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uU2VsZWN0b3JNYXRjaGVzV3JvbmdOb2RlVHlwZUVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKG5vZGVEZXNjcmlwdGlvbikge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuYWN0aW9uU2VsZWN0b3JNYXRjaGVzV3JvbmdOb2RlVHlwZUVycm9yKTtcblxuICAgICAgICB0aGlzLm5vZGVEZXNjcmlwdGlvbiA9IG5vZGVEZXNjcmlwdGlvbjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25BZGRpdGlvbmFsRWxlbWVudE5vdEZvdW5kRXJyb3IgZXh0ZW5kcyBTZWxlY3RvckVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGFyZ3VtZW50TmFtZSwgYXBpRm5BcmdzKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5hY3Rpb25BZGRpdGlvbmFsRWxlbWVudE5vdEZvdW5kRXJyb3IsIGFwaUZuQXJncyk7XG5cbiAgICAgICAgdGhpcy5hcmd1bWVudE5hbWUgPSBhcmd1bWVudE5hbWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uQWRkaXRpb25hbEVsZW1lbnRJc0ludmlzaWJsZUVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGFyZ3VtZW50TmFtZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuYWN0aW9uQWRkaXRpb25hbEVsZW1lbnRJc0ludmlzaWJsZUVycm9yKTtcblxuICAgICAgICB0aGlzLmFyZ3VtZW50TmFtZSA9IGFyZ3VtZW50TmFtZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25BZGRpdGlvbmFsU2VsZWN0b3JNYXRjaGVzV3JvbmdOb2RlVHlwZUVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGFyZ3VtZW50TmFtZSwgbm9kZURlc2NyaXB0aW9uKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5hY3Rpb25BZGRpdGlvbmFsU2VsZWN0b3JNYXRjaGVzV3JvbmdOb2RlVHlwZUVycm9yKTtcblxuICAgICAgICB0aGlzLmFyZ3VtZW50TmFtZSAgICA9IGFyZ3VtZW50TmFtZTtcbiAgICAgICAgdGhpcy5ub2RlRGVzY3JpcHRpb24gPSBub2RlRGVzY3JpcHRpb247XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uRWxlbWVudE5vbkVkaXRhYmxlRXJyb3IgZXh0ZW5kcyBUZXN0UnVuRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5hY3Rpb25FbGVtZW50Tm9uRWRpdGFibGVFcnJvcik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uRWxlbWVudE5vdFRleHRBcmVhRXJyb3IgZXh0ZW5kcyBUZXN0UnVuRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5hY3Rpb25FbGVtZW50Tm90VGV4dEFyZWFFcnJvcik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uRWxlbWVudE5vbkNvbnRlbnRFZGl0YWJsZUVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKGFyZ3VtZW50TmFtZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuYWN0aW9uRWxlbWVudE5vbkNvbnRlbnRFZGl0YWJsZUVycm9yKTtcblxuICAgICAgICB0aGlzLmFyZ3VtZW50TmFtZSA9IGFyZ3VtZW50TmFtZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25Sb290Q29udGFpbmVyTm90Rm91bmRFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvblJvb3RDb250YWluZXJOb3RGb3VuZEVycm9yKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25JbmNvcnJlY3RLZXlzRXJyb3IgZXh0ZW5kcyBUZXN0UnVuRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoYXJndW1lbnROYW1lKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5hY3Rpb25JbmNvcnJlY3RLZXlzRXJyb3IpO1xuXG4gICAgICAgIHRoaXMuYXJndW1lbnROYW1lID0gYXJndW1lbnROYW1lO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFjdGlvbkNhbm5vdEZpbmRGaWxlVG9VcGxvYWRFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChmaWxlUGF0aHMsIHNjYW5uZWRGaWxlUGF0aHMpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvbkNhbm5vdEZpbmRGaWxlVG9VcGxvYWRFcnJvcik7XG5cbiAgICAgICAgdGhpcy5maWxlUGF0aHMgICAgICAgID0gZmlsZVBhdGhzO1xuICAgICAgICB0aGlzLnNjYW5uZWRGaWxlUGF0aHMgPSBzY2FubmVkRmlsZVBhdGhzO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFjdGlvbkVsZW1lbnRJc05vdEZpbGVJbnB1dEVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuYWN0aW9uRWxlbWVudElzTm90RmlsZUlucHV0RXJyb3IpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFjdGlvbkludmFsaWRTY3JvbGxUYXJnZXRFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChzY3JvbGxUYXJnZXRYVmFsaWQsIHNjcm9sbFRhcmdldFlWYWxpZCkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuYWN0aW9uSW52YWxpZFNjcm9sbFRhcmdldEVycm9yKTtcblxuICAgICAgICBpZiAoIXNjcm9sbFRhcmdldFhWYWxpZCkge1xuICAgICAgICAgICAgaWYgKCFzY3JvbGxUYXJnZXRZVmFsaWQpXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gJ3Njcm9sbFRhcmdldFggYW5kIHNjcm9sbFRhcmdldFkgcHJvcGVydGllcyc7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gJ3Njcm9sbFRhcmdldFggcHJvcGVydHknO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllcyA9ICdzY3JvbGxUYXJnZXRZIHByb3BlcnR5JztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnZhbGlkRWxlbWVudFNjcmVlbnNob3REaW1lbnNpb25zRXJyb3IgZXh0ZW5kcyBUZXN0UnVuRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuaW52YWxpZEVsZW1lbnRTY3JlZW5zaG90RGltZW5zaW9uc0Vycm9yKTtcblxuICAgICAgICBjb25zdCB3aWR0aElzSW52YWxpZCAgPSB3aWR0aCA8PSAwO1xuICAgICAgICBjb25zdCBoZWlnaHRJc0ludmFsaWQgPSBoZWlnaHQgPD0gMDtcblxuICAgICAgICBpZiAod2lkdGhJc0ludmFsaWQpIHtcbiAgICAgICAgICAgIGlmIChoZWlnaHRJc0ludmFsaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlcmIgICAgICAgPSAnYXJlJztcbiAgICAgICAgICAgICAgICB0aGlzLmRpbWVuc2lvbnMgPSAnd2lkdGggYW5kIGhlaWdodCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlcmIgICAgICAgPSAnaXMnO1xuICAgICAgICAgICAgICAgIHRoaXMuZGltZW5zaW9ucyA9ICd3aWR0aCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZlcmIgICAgICAgPSAnaXMnO1xuICAgICAgICAgICAgdGhpcy5kaW1lbnNpb25zID0gJ2hlaWdodCc7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLy8gSWZyYW1lIGVycm9yc1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGNsYXNzIEFjdGlvbkVsZW1lbnROb3RJZnJhbWVFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChjYWxsc2l0ZSkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuYWN0aW9uRWxlbWVudE5vdElmcmFtZUVycm9yLCBjYWxsc2l0ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uSWZyYW1lSXNOb3RMb2FkZWRFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmFjdGlvbklmcmFtZUlzTm90TG9hZGVkRXJyb3IpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEN1cnJlbnRJZnJhbWVJc05vdExvYWRlZEVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuY3VycmVudElmcmFtZUlzTm90TG9hZGVkRXJyb3IpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENoaWxkV2luZG93Tm90Rm91bmRFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmNoaWxkV2luZG93Tm90Rm91bmRFcnJvcik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2hpbGRXaW5kb3dJc05vdExvYWRlZEVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuY2hpbGRXaW5kb3dJc05vdExvYWRlZEVycm9yKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYW5ub3RTd2l0Y2hUb1dpbmRvd0Vycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuY2Fubm90U3dpdGNoVG9XaW5kb3dFcnJvcik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2xvc2VDaGlsZFdpbmRvd0Vycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuY2xvc2VDaGlsZFdpbmRvd0Vycm9yKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYW5ub3RDbG9zZVdpbmRvd1dpdGhDaGlsZHJlbkVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuY2Fubm90Q2xvc2VXaW5kb3dXaXRoQ2hpbGRyZW5FcnJvcik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2Fubm90Q2xvc2VXaW5kb3dXaXRob3V0UGFyZW50RXJyb3IgZXh0ZW5kcyBUZXN0UnVuRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5jYW5ub3RDbG9zZVdpbmRvd1dpdGhvdXRQYXJlbnQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFN3aXRjaFRvV2luZG93UHJlZGljYXRlRXJyb3IgZXh0ZW5kcyBUZXN0UnVuRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoZXJyTXNnKSB7XG4gICAgICAgIHN1cGVyKFRFU1RfUlVOX0VSUk9SUy5zd2l0Y2hUb1dpbmRvd1ByZWRpY2F0ZUVycm9yKTtcblxuICAgICAgICB0aGlzLmVyck1zZyA9IGVyck1zZztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBXaW5kb3dOb3RGb3VuZEVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMudGFyZ2V0V2luZG93Tm90Rm91bmRFcnJvcik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGFyZW50V2luZG93Tm90Rm91bmRFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLnBhcmVudFdpbmRvd05vdEZvdW5kRXJyb3IpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByZXZpb3VzV2luZG93Tm90Rm91bmRFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLnByZXZpb3VzV2luZG93Tm90Rm91bmRFcnJvcik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2hpbGRXaW5kb3dDbG9zZWRCZWZvcmVTd2l0Y2hpbmdFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLmNoaWxkV2luZG93Q2xvc2VkQmVmb3JlU3dpdGNoaW5nRXJyb3IpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhbm5vdFJlc3RvcmVDaGlsZFdpbmRvd0Vycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuY2Fubm90UmVzdG9yZUNoaWxkV2luZG93RXJyb3IpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEN1cnJlbnRJZnJhbWVOb3RGb3VuZEVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuY3VycmVudElmcmFtZU5vdEZvdW5kRXJyb3IpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEN1cnJlbnRJZnJhbWVJc0ludmlzaWJsZUVycm9yIGV4dGVuZHMgVGVzdFJ1bkVycm9yQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcihURVNUX1JVTl9FUlJPUlMuY3VycmVudElmcmFtZUlzSW52aXNpYmxlRXJyb3IpO1xuICAgIH1cbn1cblxuXG4vLyBOYXRpdmUgZGlhbG9nIGVycm9yc1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGNsYXNzIE5hdGl2ZURpYWxvZ05vdEhhbmRsZWRFcnJvciBleHRlbmRzIFRlc3RSdW5FcnJvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChkaWFsb2dUeXBlLCB1cmwpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLm5hdGl2ZURpYWxvZ05vdEhhbmRsZWRFcnJvcik7XG5cbiAgICAgICAgdGhpcy5kaWFsb2dUeXBlID0gZGlhbG9nVHlwZTtcbiAgICAgICAgdGhpcy5wYWdlVXJsICAgID0gdXJsO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFVuY2F1Z2h0RXJyb3JJbk5hdGl2ZURpYWxvZ0hhbmRsZXIgZXh0ZW5kcyBUZXN0UnVuRXJyb3JCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoZGlhbG9nVHlwZSwgZXJyTXNnLCB1cmwpIHtcbiAgICAgICAgc3VwZXIoVEVTVF9SVU5fRVJST1JTLnVuY2F1Z2h0RXJyb3JJbk5hdGl2ZURpYWxvZ0hhbmRsZXIpO1xuXG4gICAgICAgIHRoaXMuZGlhbG9nVHlwZSA9IGRpYWxvZ1R5cGU7XG4gICAgICAgIHRoaXMuZXJyTXNnICAgICA9IGVyck1zZztcbiAgICAgICAgdGhpcy5wYWdlVXJsICAgID0gdXJsO1xuICAgIH1cbn1cbiJdfQ==