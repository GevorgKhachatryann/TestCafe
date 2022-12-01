"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const types_1 = require("../types");
const utils_1 = require("./utils");
const string_1 = require("../../utils/string");
const EXTERNAL_LINKS = {
    createNewIssue: 'https://github.com/DevExpress/testcafe/issues/new?template=bug-report.md',
    troubleshootNetwork: 'https://go.devexpress.com/TestCafe_FAQ_ARequestHasFailed.aspx',
    viewportSizes: 'https://github.com/DevExpress/device-specs/blob/master/viewport-sizes.json',
    skipJsErrorsRecipes: 'https://testcafe.io/documentation/404038/recipes/debugging/skip-javascript-errors',
};
exports.default = {
    [types_1.TEST_RUN_ERRORS.actionIntegerOptionError]: err => `
        The "${err.optionName}" option is expected to be an integer, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionPositiveIntegerOptionError]: err => `
        The "${err.optionName}" option is expected to be a positive integer, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionBooleanOptionError]: err => `
        The "${err.optionName}" option is expected to be a boolean value, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionSpeedOptionError]: err => `
        The "${err.optionName}" option is expected to be a number between 0.01 and 1, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.pageLoadError]: err => `
        Failed to load the page at ${(0, utils_1.formatUrl)(err.url)}.
        Increase the value of the "pageRequestTimeout" variable, enable the "retryTestPages" option, or use quarantine mode to perform additional attempts to execute this test.
        You can find troubleshooting information for this issue at ${(0, utils_1.formatUrl)(EXTERNAL_LINKS.troubleshootNetwork)}.

        Error details:
        ${err.errMsg}
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtErrorOnPage]: err => `
        A JavaScript error occurred on ${(0, utils_1.formatUrl)(err.pageDestUrl)}.
        Repeat test actions in the browser and check the console for errors.
        Enable the “skipJsErrors” option to ignore JavaScript errors during test execution. Learn more: ${(0, utils_1.formatUrl)(EXTERNAL_LINKS.skipJsErrorsRecipes)}
        If the website only throws this error when you test it with TestCafe, please create a new issue at:
        ${(0, utils_1.formatUrl)(EXTERNAL_LINKS.createNewIssue)}.

        JavaScript error details:
        ${(0, utils_1.replaceLeadingSpacesWithNbsp)((0, lodash_1.escape)(err.errStack))}
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtErrorInTestCode]: err => `
        ${(0, lodash_1.escape)(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.nativeDialogNotHandledError]: err => `
        A native ${err.dialogType} dialog was invoked on page ${(0, utils_1.formatUrl)(err.pageUrl)}, but no handler was set for it. Use the "setNativeDialogHandler" function to introduce a handler function for native dialogs.
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtErrorInNativeDialogHandler]: err => `
        An error occurred in the native dialog handler called for a native ${err.dialogType} dialog on page ${(0, utils_1.formatUrl)(err.pageUrl)}:

        ${(0, lodash_1.escape)(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.setTestSpeedArgumentError]: err => `
        Speed is expected to be a number between 0.01 and 1, but ${err.actualValue} was passed.
    `,
    [types_1.TEST_RUN_ERRORS.setNativeDialogHandlerCodeWrongTypeError]: err => `
        The native dialog handler is expected to be a function, ClientFunction or null, but it was ${err.actualType}.
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtErrorInClientFunctionCode]: err => `
        An error occurred in ${err.instantiationCallsiteName} code:

        ${(0, lodash_1.escape)(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtErrorInCustomDOMPropertyCode]: err => `
        An error occurred when trying to calculate a custom Selector property "${err.property}":

        ${(0, lodash_1.escape)(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.clientFunctionExecutionInterruptionError]: err => `
        ${err.instantiationCallsiteName} execution was interrupted by page unload. This problem may appear if you trigger page navigation from ${err.instantiationCallsiteName} code.
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtNonErrorObjectInTestCode]: err => `
        Uncaught ${err.objType} "${(0, lodash_1.escape)(err.objStr)}" was thrown. Throw Error instead.
    `,
    [types_1.TEST_RUN_ERRORS.unhandledPromiseRejection]: err => `
        Unhandled promise rejection:

        ${(0, lodash_1.escape)(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtException]: err => `
        Uncaught exception:

        ${(0, lodash_1.escape)(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.actionOptionsTypeError]: err => `
        Action options is expected to be an object, null or undefined but it was ${err.actualType}.
    `,
    [types_1.TEST_RUN_ERRORS.actionStringArgumentError]: err => `
        The "${err.argumentName}" argument is expected to be a non-empty string, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionBooleanArgumentError]: err => `
        The "${err.argumentName}" argument is expected to be a boolean value, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionNullableStringArgumentError]: err => `
        The "${err.argumentName}" argument is expected to be a null or a string, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionStringOrStringArrayArgumentError]: err => `
        The "${err.argumentName}" argument is expected to be a non-empty string or a string array, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionStringArrayElementError]: err => `
        Elements of the "${err.argumentName}" argument are expected to be non-empty strings, but the element at index ${err.elementIndex} was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionRequiredCookieArguments]: () => `
        The mandatory "cookies" argument is missing.
    `,
    [types_1.TEST_RUN_ERRORS.actionCookieArgumentError]: () => `
        The value of the "cookies" argument does not belong to an acceptable data type: Object, String, or Array of objects or strings.
    `,
    [types_1.TEST_RUN_ERRORS.actionCookieArgumentsError]: err => `
        The value of cookie number ${err.index + 1} (${err.actualValue}) does not belong to an acceptable data type: Object or String.
    `,
    [types_1.TEST_RUN_ERRORS.actionUrlCookieArgumentError]: () => `
        Could not parse the url parameter. Check the value for formatting errors.
    `,
    [types_1.TEST_RUN_ERRORS.actionUrlsCookieArgumentError]: err => `
        Could not parse url number ${err.index + 1} (${err.actualValue}). Check the value for formatting errors.
    `,
    [types_1.TEST_RUN_ERRORS.actionIntegerArgumentError]: err => `
        The "${err.argumentName}" argument is expected to be an integer, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionRoleArgumentError]: err => `
        The "${err.argumentName}" argument is expected to be a Role instance, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionFunctionArgumentError]: err => `
        The "${err.argumentName}" argument is expected to be a function, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionPositiveIntegerArgumentError]: err => `
        The "${err.argumentName}" argument is expected to be a positive integer, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionElementNotFoundError]: (err, viewportWidth) => `
        The specified selector does not match any element in the DOM tree.

        ${(0, utils_1.formatSelectorCallstack)(err.apiFnChain, err.apiFnIndex, viewportWidth)}
    `,
    [types_1.TEST_RUN_ERRORS.actionElementIsInvisibleError]: () => `
        The element that matches the specified selector is not visible.
    `,
    [types_1.TEST_RUN_ERRORS.actionSelectorMatchesWrongNodeTypeError]: err => `
        The specified selector is expected to match a DOM element, but it matches a ${err.nodeDescription} node.
    `,
    [types_1.TEST_RUN_ERRORS.actionAdditionalElementNotFoundError]: (err, viewportWidth) => `
        The specified "${err.argumentName}" does not match any element in the DOM tree.

        ${(0, utils_1.formatSelectorCallstack)(err.apiFnChain, err.apiFnIndex, viewportWidth)}
    `,
    [types_1.TEST_RUN_ERRORS.actionAdditionalElementIsInvisibleError]: err => `
        The element that matches the specified "${err.argumentName}" is not visible.
    `,
    [types_1.TEST_RUN_ERRORS.actionAdditionalSelectorMatchesWrongNodeTypeError]: err => `
        The specified "${err.argumentName}" is expected to match a DOM element, but it matches a ${err.nodeDescription} node.
    `,
    [types_1.TEST_RUN_ERRORS.actionElementNonEditableError]: () => `
        The action element is expected to be editable (an input, textarea or element with the contentEditable attribute).
    `,
    [types_1.TEST_RUN_ERRORS.actionElementNonContentEditableError]: err => `
        The element that matches the specified "${err.argumentName}" is expected to have the contentEditable attribute enabled or the entire document should be in design mode.
    `,
    [types_1.TEST_RUN_ERRORS.actionRootContainerNotFoundError]: () => `
        Content between the action elements cannot be selected because the root container for the selection range cannot be found, i.e. these elements do not have a common ancestor with the contentEditable attribute.
    `,
    [types_1.TEST_RUN_ERRORS.actionElementIsNotFileInputError]: () => `
        The specified selector does not match a file input element.
    `,
    [types_1.TEST_RUN_ERRORS.actionCannotFindFileToUploadError]: err => `
        Cannot find the following file(s) to upload:
        ${err.filePaths.map(path => (0, lodash_1.escape)(path)).join('\n')}

        The following locations were scanned for the missing upload files:
        ${err.scannedFilePaths.map(path => (0, lodash_1.escape)(path)).join('\n')}

        Ensure these files exist or change the working directory.
    `,
    [types_1.TEST_RUN_ERRORS.actionElementNotTextAreaError]: () => `
        The action element is expected to be a &lt;textarea&gt;.
    `,
    [types_1.TEST_RUN_ERRORS.actionElementNotIframeError]: () => `
        The action element is expected to be an &lt;iframe&gt.
    `,
    [types_1.TEST_RUN_ERRORS.actionIncorrectKeysError]: err => `
        The "${err.argumentName}" argument contains an incorrect key or key combination.
    `,
    [types_1.TEST_RUN_ERRORS.actionUnsupportedDeviceTypeError]: err => `
        The "${err.argumentName}" argument specifies an unsupported "${err.actualValue}" device. For a list of supported devices, refer to ${(0, utils_1.formatUrl)(EXTERNAL_LINKS.viewportSizes)}.
    `,
    [types_1.TEST_RUN_ERRORS.actionInvalidScrollTargetError]: err => `
        Unable to scroll to the specified point because a point with the specified ${err.properties} is not located inside the element's cropping region.
    `,
    [types_1.TEST_RUN_ERRORS.actionIframeIsNotLoadedError]: () => `
        Content of the iframe to which you are switching did not load.
    `,
    [types_1.TEST_RUN_ERRORS.currentIframeIsNotLoadedError]: () => `
        Content of the iframe in which the test is currently operating did not load.
    `,
    [types_1.TEST_RUN_ERRORS.currentIframeNotFoundError]: () => `
        The iframe in which the test is currently operating does not exist anymore.
    `,
    [types_1.TEST_RUN_ERRORS.currentIframeIsInvisibleError]: () => `
        The iframe in which the test is currently operating is not visible anymore.
    `,
    [types_1.TEST_RUN_ERRORS.missingAwaitError]: () => `
        A call to an async function is not awaited. Use the "await" keyword before actions, assertions or chains of them to ensure that they run in the right sequence.
    `,
    [types_1.TEST_RUN_ERRORS.externalAssertionLibraryError]: err => `
        ${(0, lodash_1.escape)(err.errMsg)}

        ${(0, utils_1.renderDiff)(err.diff)}
    `,
    [types_1.TEST_RUN_ERRORS.domNodeClientFunctionResultError]: err => `
       ${err.instantiationCallsiteName} cannot return DOM elements. Use Selector functions for this purpose.
    `,
    [types_1.TEST_RUN_ERRORS.invalidSelectorResultError]: () => `
        Function that specifies a selector can only return a DOM node, an array of nodes, NodeList, HTMLCollection, null or undefined. Use ClientFunction to return other values.
    `,
    [types_1.TEST_RUN_ERRORS.actionSelectorError]: err => `
        Action "${err.selectorName}" argument error:

        ${(0, lodash_1.escape)(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.cannotObtainInfoForElementSpecifiedBySelectorError]: (err, viewportWidth) => `
        Cannot obtain information about the node because the specified selector does not match any node in the DOM tree.

        ${(0, utils_1.formatSelectorCallstack)(err.apiFnChain, err.apiFnIndex, viewportWidth)}
    `,
    [types_1.TEST_RUN_ERRORS.windowDimensionsOverflowError]: () => `
        Unable to resize the window because the specified size exceeds the screen size. On macOS, a window cannot be larger than the screen.
    `,
    [types_1.TEST_RUN_ERRORS.forbiddenCharactersInScreenshotPathError]: err => `
        There are forbidden characters in the "${err.screenshotPath}" screenshot path:
        ${(0, utils_1.renderForbiddenCharsList)(err.forbiddenCharsList)}
    `,
    [types_1.TEST_RUN_ERRORS.invalidElementScreenshotDimensionsError]: err => `
         Unable to capture an element image because the resulting image ${err.dimensions} ${err.verb} zero or negative.
    `,
    [types_1.TEST_RUN_ERRORS.roleSwitchInRoleInitializerError]: () => `
        Role cannot be switched while another role is being initialized.
    `,
    [types_1.TEST_RUN_ERRORS.assertionExecutableArgumentError]: err => `
        Cannot evaluate the "${err.actualValue}" expression in the "${err.argumentName}" parameter because of the following error:

        ${err.errMsg}
    `,
    [types_1.TEST_RUN_ERRORS.assertionWithoutMethodCallError]: () => `
        An assertion method is not specified.
    `,
    [types_1.TEST_RUN_ERRORS.assertionUnawaitedPromiseError]: () => `
        Attempted to run assertions on a Promise object. Did you forget to await it? If not, pass "{ allowUnawaitedPromise: true }" to the assertion options.
    `,
    [types_1.TEST_RUN_ERRORS.requestHookNotImplementedError]: err => `
        You should implement the "${err.methodName}" method in the "${err.hookClassName}" class.
    `,
    [types_1.TEST_RUN_ERRORS.requestHookUnhandledError]: err => `
        An unhandled error occurred in the "${err.methodName}" method of the "${err.hookClassName}" class:

        ${(0, lodash_1.escape)(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtErrorInCustomClientScriptCode]: err => `
        An error occurred in a script injected into the tested page:

        ${(0, lodash_1.escape)(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtErrorInCustomClientScriptCodeLoadedFromModule]: err => `
        An error occurred in the '${err.moduleName}' module injected into the tested page. Make sure that this module can be executed in the browser environment.

        Error details:
        ${(0, lodash_1.escape)(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtErrorInCustomScript]: err => `
        An unhandled error occurred in the custom script:

        Error details: ${(0, lodash_1.escape)(err.errMsg)}

        ${(0, utils_1.formatExpressionMessage)(err.expression, err.line, err.column)}
    `,
    [types_1.TEST_RUN_ERRORS.childWindowIsNotLoadedError]: () => `
        The page in the child window is not loaded.
    `,
    [types_1.TEST_RUN_ERRORS.childWindowNotFoundError]: () => `
        The child window is not found.
    `,
    [types_1.TEST_RUN_ERRORS.cannotSwitchToWindowError]: () => `
        Cannot switch to the window.
    `,
    [types_1.TEST_RUN_ERRORS.closeChildWindowError]: () => `
        An error occurred while closing child windows.
    `,
    [types_1.TEST_RUN_ERRORS.childWindowClosedBeforeSwitchingError]: () => `
        The child window was closed before TestCafe could switch to it.
    `,
    [types_1.TEST_RUN_ERRORS.cannotCloseWindowWithChildrenError]: () => `
        Cannot close a window that has an open child window.
    `,
    [types_1.TEST_RUN_ERRORS.targetWindowNotFoundError]: () => `
        Cannot find the window specified in the action parameters.
    `,
    [types_1.TEST_RUN_ERRORS.parentWindowNotFoundError]: () => `
        Cannot find the parent window. Make sure that the tested window was opened from another window.
    `,
    [types_1.TEST_RUN_ERRORS.previousWindowNotFoundError]: () => `
        Cannot find the previous window. Make sure that the previous window is opened.
    `,
    [types_1.TEST_RUN_ERRORS.switchToWindowPredicateError]: err => `
        An error occurred inside the "switchToWindow" argument function.

        Error details:
        ${(0, lodash_1.escape)(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.multipleWindowsModeIsDisabledError]: err => `
        Multi-window mode is disabled. To use the "${err.methodName}" method, remove the "disableMultipleWindows" option.
    `,
    [types_1.TEST_RUN_ERRORS.multipleWindowsModeIsNotSupportedInRemoteBrowserError]: err => `
        Multi-window mode is supported only in locally-installed Chrome, Chromium, Edge 84+ and Firefox. Run tests in these browsers to use the "${err.methodName}" method.
    `,
    [types_1.TEST_RUN_ERRORS.cannotCloseWindowWithoutParent]: () => `
        Cannot close the window because it does not have a parent. The parent window was closed or you are attempting to close the root browser window where tests were launched.
    `,
    [types_1.TEST_RUN_ERRORS.cannotRestoreChildWindowError]: () => `
        Failed to restore connection to window within the allocated timeout.
    `,
    [types_1.TEST_RUN_ERRORS.executionTimeoutExceeded]: err => {
        return `${err.scope} timeout of ${err.timeout}ms exceeded.`;
    },
    [types_1.TEST_RUN_ERRORS.actionStringOptionError]: err => `
        The value of the "${err.optionName}" option belongs to an unsupported data type (${err.actualValue}). The "${err.optionName}" option only accepts String type values.
    `,
    [types_1.TEST_RUN_ERRORS.actionStringOrRegexOptionError]: err => `
        The value of the "${err.optionName}" option belongs to an unsupported data type (${err.actualValue}). The "${err.optionName}" option only accepts String or Regex type values.
    `,
    [types_1.TEST_RUN_ERRORS.actionDateOptionError]: err => `
        The value of the "${err.optionName}" option belongs to an unsupported data type (${err.actualValue}). The "${err.optionName}" option only accepts Date type values.
    `,
    [types_1.TEST_RUN_ERRORS.actionNumberOptionError]: err => `
        The value of the "${err.optionName}" option belongs to an unsupported data type (${err.actualValue}). The "${err.optionName}" option only accepts Number type values.
    `,
    [types_1.TEST_RUN_ERRORS.actionUrlOptionError]: err => `
        The value of the "${err.optionName}" option belongs to an unsupported data type (${err.actualValue}). The "${err.optionName}" option only accepts string or URL types values.
    `,
    [types_1.TEST_RUN_ERRORS.actionUrlSearchParamsOptionError]: err => `
        The value of the "${err.optionName}" option belongs to an unsupported data type (${err.actualValue}). The "${err.optionName}" option only accepts object or URLSearchParams types values.
    `,
    [types_1.TEST_RUN_ERRORS.actionObjectOptionError]: err => `
        The value of the "${err.optionName}" option belongs to an unsupported data type (${err.actualValue}). The "${err.optionName}" option only accepts object types values.
    `,
    [types_1.TEST_RUN_ERRORS.actionUrlArgumentError]: err => `
        The "${err.argumentName}" argument is expected to be an URL or a string, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionSkipJsErrorsArgumentError]: err => `
        Cannot execute the skipJsErrors method. The value of the "${err.argumentName}" argument belongs to an unsupported type (${err.actualValue}). The "${err.argumentName}" supports the following data types: Boolean, Object, Function.
    `,
    [types_1.TEST_RUN_ERRORS.actionFunctionOptionError]: err => `
        The value of the "${err.optionName}" option belongs to an unsupported data type (${err.actualValue}). The "${err.optionName}" option only accepts function types values.
    `,
    [types_1.TEST_RUN_ERRORS.actionInvalidObjectPropertyError]: err => `
        The "${err.objectName}" object does not support the "${err.propertyName}" property.
        To proceed, remove invalid options from your code or check your test for spelling errors.
        The "${err.objectName}" object supports the following options:
        ${(0, string_1.getConcatenatedValuesString)(err.availableProperties, ',\n')}.
    `,
};
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Vycm9ycy90ZXN0LXJ1bi90ZW1wbGF0ZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBOEM7QUFDOUMsb0NBQTJDO0FBQzNDLG1DQU9pQjtBQUNqQiwrQ0FBaUU7QUFHakUsTUFBTSxjQUFjLEdBQUc7SUFDbkIsY0FBYyxFQUFPLDBFQUEwRTtJQUMvRixtQkFBbUIsRUFBRSwrREFBK0Q7SUFDcEYsYUFBYSxFQUFRLDRFQUE0RTtJQUNqRyxtQkFBbUIsRUFBRSxtRkFBbUY7Q0FDM0csQ0FBQztBQUVGLGtCQUFlO0lBQ1gsQ0FBQyx1QkFBZSxDQUFDLHdCQUF3QixDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztlQUN4QyxHQUFHLENBQUMsVUFBVSxxREFBcUQsR0FBRyxDQUFDLFdBQVc7S0FDNUY7SUFFRCxDQUFDLHVCQUFlLENBQUMsZ0NBQWdDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO2VBQ2hELEdBQUcsQ0FBQyxVQUFVLDZEQUE2RCxHQUFHLENBQUMsV0FBVztLQUNwRztJQUVELENBQUMsdUJBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7ZUFDeEMsR0FBRyxDQUFDLFVBQVUsMERBQTBELEdBQUcsQ0FBQyxXQUFXO0tBQ2pHO0lBRUQsQ0FBQyx1QkFBZSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztlQUN0QyxHQUFHLENBQUMsVUFBVSxzRUFBc0UsR0FBRyxDQUFDLFdBQVc7S0FDN0c7SUFFRCxDQUFDLHVCQUFlLENBQUMsYUFBYSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztxQ0FDUCxJQUFBLGlCQUFTLEVBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQzs7cUVBRWMsSUFBQSxpQkFBUyxFQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQzs7O1VBR3hH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RSxDQUFDO29FQUNNLEdBQUcsQ0FBQyxZQUFZLDhDQUE4QyxHQUFHLENBQUMsV0FBVyxXQUFXLEdBQUcsQ0FBQyxZQUFZO0tBQ3ZLO0lBRUQsQ0FBQyx1QkFBZSxDQUFDLHlCQUF5QixDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQzs0QkFDNUIsR0FBRyxDQUFDLFVBQVUsaURBQWlELEdBQUcsQ0FBQyxXQUFXLFdBQVcsR0FBRyxDQUFDLFVBQVU7S0FDOUg7SUFFRCxDQUFDLHVCQUFlLENBQUMsZ0NBQWdDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO2VBQ2hELEdBQUcsQ0FBQyxVQUFVLGtDQUFrQyxHQUFHLENBQUMsWUFBWTs7ZUFFaEUsR0FBRyxDQUFDLFVBQVU7VUFDbkIsSUFBQSxvQ0FBMkIsRUFBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDO0tBQ2hFO0NBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVzY2FwZSBhcyBlc2NhcGVIdG1sIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFRFU1RfUlVOX0VSUk9SUyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7XG4gICAgcmVuZGVyRm9yYmlkZGVuQ2hhcnNMaXN0LFxuICAgIHJlbmRlckRpZmYsXG4gICAgZm9ybWF0U2VsZWN0b3JDYWxsc3RhY2ssXG4gICAgZm9ybWF0VXJsLFxuICAgIHJlcGxhY2VMZWFkaW5nU3BhY2VzV2l0aE5ic3AsXG4gICAgZm9ybWF0RXhwcmVzc2lvbk1lc3NhZ2UsXG59IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgZ2V0Q29uY2F0ZW5hdGVkVmFsdWVzU3RyaW5nIH0gZnJvbSAnLi4vLi4vdXRpbHMvc3RyaW5nJztcblxuXG5jb25zdCBFWFRFUk5BTF9MSU5LUyA9IHtcbiAgICBjcmVhdGVOZXdJc3N1ZTogICAgICAnaHR0cHM6Ly9naXRodWIuY29tL0RldkV4cHJlc3MvdGVzdGNhZmUvaXNzdWVzL25ldz90ZW1wbGF0ZT1idWctcmVwb3J0Lm1kJyxcbiAgICB0cm91Ymxlc2hvb3ROZXR3b3JrOiAnaHR0cHM6Ly9nby5kZXZleHByZXNzLmNvbS9UZXN0Q2FmZV9GQVFfQVJlcXVlc3RIYXNGYWlsZWQuYXNweCcsXG4gICAgdmlld3BvcnRTaXplczogICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9EZXZFeHByZXNzL2RldmljZS1zcGVjcy9ibG9iL21hc3Rlci92aWV3cG9ydC1zaXplcy5qc29uJyxcbiAgICBza2lwSnNFcnJvcnNSZWNpcGVzOiAnaHR0cHM6Ly90ZXN0Y2FmZS5pby9kb2N1bWVudGF0aW9uLzQwNDAzOC9yZWNpcGVzL2RlYnVnZ2luZy9za2lwLWphdmFzY3JpcHQtZXJyb3JzJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvbkludGVnZXJPcHRpb25FcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFRoZSBcIiR7ZXJyLm9wdGlvbk5hbWV9XCIgb3B0aW9uIGlzIGV4cGVjdGVkIHRvIGJlIGFuIGludGVnZXIsIGJ1dCBpdCB3YXMgJHtlcnIuYWN0dWFsVmFsdWV9LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvblBvc2l0aXZlSW50ZWdlck9wdGlvbkVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIFwiJHtlcnIub3B0aW9uTmFtZX1cIiBvcHRpb24gaXMgZXhwZWN0ZWQgdG8gYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyLCBidXQgaXQgd2FzICR7ZXJyLmFjdHVhbFZhbHVlfS5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hY3Rpb25Cb29sZWFuT3B0aW9uRXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBUaGUgXCIke2Vyci5vcHRpb25OYW1lfVwiIG9wdGlvbiBpcyBleHBlY3RlZCB0byBiZSBhIGJvb2xlYW4gdmFsdWUsIGJ1dCBpdCB3YXMgJHtlcnIuYWN0dWFsVmFsdWV9LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvblNwZWVkT3B0aW9uRXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBUaGUgXCIke2Vyci5vcHRpb25OYW1lfVwiIG9wdGlvbiBpcyBleHBlY3RlZCB0byBiZSBhIG51bWJlciBiZXR3ZWVuIDAuMDEgYW5kIDEsIGJ1dCBpdCB3YXMgJHtlcnIuYWN0dWFsVmFsdWV9LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLnBhZ2VMb2FkRXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBGYWlsZWQgdG8gbG9hZCB0aGUgcGFnZSBhdCAke2Zvcm1hdFVybChlcnIudXJsKX0uXG4gICAgICAgIEluY3JlYXNlIHRoZSB2YWx1ZSBvZiB0aGUgXCJwYWdlUmVxdWVzdFRpbWVvdXRcIiB2YXJpYWJsZSwgZW5hYmxlIHRoZSBcInJldHJ5VGVzdFBhZ2VzXCIgb3B0aW9uLCBvciB1c2UgcXVhcmFudGluZSBtb2RlIHRvIHBlcmZvcm0gYWRkaXRpb25hbCBhdHRlbXB0cyB0byBleGVjdXRlIHRoaXMgdGVzdC5cbiAgICAgICAgWW91IGNhbiBmaW5kIHRyb3VibGVzaG9vdGluZyBpbmZvcm1hdGlvbiBmb3IgdGhpcyBpc3N1ZSBhdCAke2Zvcm1hdFVybChFWFRFUk5BTF9MSU5LUy50cm91Ymxlc2hvb3ROZXR3b3JrKX0uXG5cbiAgICAgICAgRXJyb3IgZGV0YWlsczpcbiAgICAgICAgJHtlcnIuZXJyTXNnfVxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLnVuY2F1Z2h0RXJyb3JPblBhZ2VdOiBlcnIgPT4gYFxuICAgICAgICBBIEphdmFTY3JpcHQgZXJyb3Igb2NjdXJyZWQgb24gJHtmb3JtYXRVcmwoZXJyLnBhZ2VEZXN0VXJsKX0uXG4gICAgICAgIFJlcGVhdCB0ZXN0IGFjdGlvbnMgaW4gdGhlIGJyb3dzZXIgYW5kIGNoZWNrIHRoZSBjb25zb2xlIGZvciBlcnJvcnMuXG4gICAgICAgIEVuYWJsZSB0aGUg4oCcc2tpcEpzRXJyb3Jz4oCdIG9wdGlvbiB0byBpZ25vcmUgSmF2YVNjcmlwdCBlcnJvcnMgZHVyaW5nIHRlc3QgZXhlY3V0aW9uLiBMZWFybiBtb3JlOiAke2Zvcm1hdFVybChFWFRFUk5BTF9MSU5LUy5za2lwSnNFcnJvcnNSZWNpcGVzKX1cbiAgICAgICAgSWYgdGhlIHdlYnNpdGUgb25seSB0aHJvd3MgdGhpcyBlcnJvciB3aGVuIHlvdSB0ZXN0IGl0IHdpdGggVGVzdENhZmUsIHBsZWFzZSBjcmVhdGUgYSBuZXcgaXNzdWUgYXQ6XG4gICAgICAgICR7Zm9ybWF0VXJsKEVYVEVSTkFMX0xJTktTLmNyZWF0ZU5ld0lzc3VlKX0uXG5cbiAgICAgICAgSmF2YVNjcmlwdCBlcnJvciBkZXRhaWxzOlxuICAgICAgICAke3JlcGxhY2VMZWFkaW5nU3BhY2VzV2l0aE5ic3AoZXNjYXBlSHRtbChlcnIuZXJyU3RhY2spKX1cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy51bmNhdWdodEVycm9ySW5UZXN0Q29kZV06IGVyciA9PiBgXG4gICAgICAgICR7ZXNjYXBlSHRtbChlcnIuZXJyTXNnKX1cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5uYXRpdmVEaWFsb2dOb3RIYW5kbGVkRXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBBIG5hdGl2ZSAke2Vyci5kaWFsb2dUeXBlfSBkaWFsb2cgd2FzIGludm9rZWQgb24gcGFnZSAke2Zvcm1hdFVybChlcnIucGFnZVVybCl9LCBidXQgbm8gaGFuZGxlciB3YXMgc2V0IGZvciBpdC4gVXNlIHRoZSBcInNldE5hdGl2ZURpYWxvZ0hhbmRsZXJcIiBmdW5jdGlvbiB0byBpbnRyb2R1Y2UgYSBoYW5kbGVyIGZ1bmN0aW9uIGZvciBuYXRpdmUgZGlhbG9ncy5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy51bmNhdWdodEVycm9ySW5OYXRpdmVEaWFsb2dIYW5kbGVyXTogZXJyID0+IGBcbiAgICAgICAgQW4gZXJyb3Igb2NjdXJyZWQgaW4gdGhlIG5hdGl2ZSBkaWFsb2cgaGFuZGxlciBjYWxsZWQgZm9yIGEgbmF0aXZlICR7ZXJyLmRpYWxvZ1R5cGV9IGRpYWxvZyBvbiBwYWdlICR7Zm9ybWF0VXJsKGVyci5wYWdlVXJsKX06XG5cbiAgICAgICAgJHtlc2NhcGVIdG1sKGVyci5lcnJNc2cpfVxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLnNldFRlc3RTcGVlZEFyZ3VtZW50RXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBTcGVlZCBpcyBleHBlY3RlZCB0byBiZSBhIG51bWJlciBiZXR3ZWVuIDAuMDEgYW5kIDEsIGJ1dCAke2Vyci5hY3R1YWxWYWx1ZX0gd2FzIHBhc3NlZC5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5zZXROYXRpdmVEaWFsb2dIYW5kbGVyQ29kZVdyb25nVHlwZUVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIG5hdGl2ZSBkaWFsb2cgaGFuZGxlciBpcyBleHBlY3RlZCB0byBiZSBhIGZ1bmN0aW9uLCBDbGllbnRGdW5jdGlvbiBvciBudWxsLCBidXQgaXQgd2FzICR7ZXJyLmFjdHVhbFR5cGV9LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLnVuY2F1Z2h0RXJyb3JJbkNsaWVudEZ1bmN0aW9uQ29kZV06IGVyciA9PiBgXG4gICAgICAgIEFuIGVycm9yIG9jY3VycmVkIGluICR7ZXJyLmluc3RhbnRpYXRpb25DYWxsc2l0ZU5hbWV9IGNvZGU6XG5cbiAgICAgICAgJHtlc2NhcGVIdG1sKGVyci5lcnJNc2cpfVxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLnVuY2F1Z2h0RXJyb3JJbkN1c3RvbURPTVByb3BlcnR5Q29kZV06IGVyciA9PiBgXG4gICAgICAgIEFuIGVycm9yIG9jY3VycmVkIHdoZW4gdHJ5aW5nIHRvIGNhbGN1bGF0ZSBhIGN1c3RvbSBTZWxlY3RvciBwcm9wZXJ0eSBcIiR7ZXJyLnByb3BlcnR5fVwiOlxuXG4gICAgICAgICR7ZXNjYXBlSHRtbChlcnIuZXJyTXNnKX1cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5jbGllbnRGdW5jdGlvbkV4ZWN1dGlvbkludGVycnVwdGlvbkVycm9yXTogZXJyID0+IGBcbiAgICAgICAgJHtlcnIuaW5zdGFudGlhdGlvbkNhbGxzaXRlTmFtZX0gZXhlY3V0aW9uIHdhcyBpbnRlcnJ1cHRlZCBieSBwYWdlIHVubG9hZC4gVGhpcyBwcm9ibGVtIG1heSBhcHBlYXIgaWYgeW91IHRyaWdnZXIgcGFnZSBuYXZpZ2F0aW9uIGZyb20gJHtlcnIuaW5zdGFudGlhdGlvbkNhbGxzaXRlTmFtZX0gY29kZS5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy51bmNhdWdodE5vbkVycm9yT2JqZWN0SW5UZXN0Q29kZV06IGVyciA9PiBgXG4gICAgICAgIFVuY2F1Z2h0ICR7ZXJyLm9ialR5cGV9IFwiJHtlc2NhcGVIdG1sKGVyci5vYmpTdHIpfVwiIHdhcyB0aHJvd24uIFRocm93IEVycm9yIGluc3RlYWQuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMudW5oYW5kbGVkUHJvbWlzZVJlamVjdGlvbl06IGVyciA9PiBgXG4gICAgICAgIFVuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbjpcblxuICAgICAgICAke2VzY2FwZUh0bWwoZXJyLmVyck1zZyl9XG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMudW5jYXVnaHRFeGNlcHRpb25dOiBlcnIgPT4gYFxuICAgICAgICBVbmNhdWdodCBleGNlcHRpb246XG5cbiAgICAgICAgJHtlc2NhcGVIdG1sKGVyci5lcnJNc2cpfVxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvbk9wdGlvbnNUeXBlRXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBBY3Rpb24gb3B0aW9ucyBpcyBleHBlY3RlZCB0byBiZSBhbiBvYmplY3QsIG51bGwgb3IgdW5kZWZpbmVkIGJ1dCBpdCB3YXMgJHtlcnIuYWN0dWFsVHlwZX0uXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uU3RyaW5nQXJndW1lbnRFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFRoZSBcIiR7ZXJyLmFyZ3VtZW50TmFtZX1cIiBhcmd1bWVudCBpcyBleHBlY3RlZCB0byBiZSBhIG5vbi1lbXB0eSBzdHJpbmcsIGJ1dCBpdCB3YXMgJHtlcnIuYWN0dWFsVmFsdWV9LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvbkJvb2xlYW5Bcmd1bWVudEVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIFwiJHtlcnIuYXJndW1lbnROYW1lfVwiIGFyZ3VtZW50IGlzIGV4cGVjdGVkIHRvIGJlIGEgYm9vbGVhbiB2YWx1ZSwgYnV0IGl0IHdhcyAke2Vyci5hY3R1YWxWYWx1ZX0uXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uTnVsbGFibGVTdHJpbmdBcmd1bWVudEVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIFwiJHtlcnIuYXJndW1lbnROYW1lfVwiIGFyZ3VtZW50IGlzIGV4cGVjdGVkIHRvIGJlIGEgbnVsbCBvciBhIHN0cmluZywgYnV0IGl0IHdhcyAke2Vyci5hY3R1YWxWYWx1ZX0uXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uU3RyaW5nT3JTdHJpbmdBcnJheUFyZ3VtZW50RXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBUaGUgXCIke2Vyci5hcmd1bWVudE5hbWV9XCIgYXJndW1lbnQgaXMgZXhwZWN0ZWQgdG8gYmUgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgc3RyaW5nIGFycmF5LCBidXQgaXQgd2FzICR7ZXJyLmFjdHVhbFZhbHVlfS5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hY3Rpb25TdHJpbmdBcnJheUVsZW1lbnRFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIEVsZW1lbnRzIG9mIHRoZSBcIiR7ZXJyLmFyZ3VtZW50TmFtZX1cIiBhcmd1bWVudCBhcmUgZXhwZWN0ZWQgdG8gYmUgbm9uLWVtcHR5IHN0cmluZ3MsIGJ1dCB0aGUgZWxlbWVudCBhdCBpbmRleCAke2Vyci5lbGVtZW50SW5kZXh9IHdhcyAke2Vyci5hY3R1YWxWYWx1ZX0uXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uUmVxdWlyZWRDb29raWVBcmd1bWVudHNdOiAoKSA9PiBgXG4gICAgICAgIFRoZSBtYW5kYXRvcnkgXCJjb29raWVzXCIgYXJndW1lbnQgaXMgbWlzc2luZy5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hY3Rpb25Db29raWVBcmd1bWVudEVycm9yXTogKCkgPT4gYFxuICAgICAgICBUaGUgdmFsdWUgb2YgdGhlIFwiY29va2llc1wiIGFyZ3VtZW50IGRvZXMgbm90IGJlbG9uZyB0byBhbiBhY2NlcHRhYmxlIGRhdGEgdHlwZTogT2JqZWN0LCBTdHJpbmcsIG9yIEFycmF5IG9mIG9iamVjdHMgb3Igc3RyaW5ncy5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hY3Rpb25Db29raWVBcmd1bWVudHNFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFRoZSB2YWx1ZSBvZiBjb29raWUgbnVtYmVyICR7ZXJyLmluZGV4ICsgMX0gKCR7ZXJyLmFjdHVhbFZhbHVlfSkgZG9lcyBub3QgYmVsb25nIHRvIGFuIGFjY2VwdGFibGUgZGF0YSB0eXBlOiBPYmplY3Qgb3IgU3RyaW5nLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvblVybENvb2tpZUFyZ3VtZW50RXJyb3JdOiAoKSA9PiBgXG4gICAgICAgIENvdWxkIG5vdCBwYXJzZSB0aGUgdXJsIHBhcmFtZXRlci4gQ2hlY2sgdGhlIHZhbHVlIGZvciBmb3JtYXR0aW5nIGVycm9ycy5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hY3Rpb25VcmxzQ29va2llQXJndW1lbnRFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIENvdWxkIG5vdCBwYXJzZSB1cmwgbnVtYmVyICR7ZXJyLmluZGV4ICsgMX0gKCR7ZXJyLmFjdHVhbFZhbHVlfSkuIENoZWNrIHRoZSB2YWx1ZSBmb3IgZm9ybWF0dGluZyBlcnJvcnMuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uSW50ZWdlckFyZ3VtZW50RXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBUaGUgXCIke2Vyci5hcmd1bWVudE5hbWV9XCIgYXJndW1lbnQgaXMgZXhwZWN0ZWQgdG8gYmUgYW4gaW50ZWdlciwgYnV0IGl0IHdhcyAke2Vyci5hY3R1YWxWYWx1ZX0uXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uUm9sZUFyZ3VtZW50RXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBUaGUgXCIke2Vyci5hcmd1bWVudE5hbWV9XCIgYXJndW1lbnQgaXMgZXhwZWN0ZWQgdG8gYmUgYSBSb2xlIGluc3RhbmNlLCBidXQgaXQgd2FzICR7ZXJyLmFjdHVhbFZhbHVlfS5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hY3Rpb25GdW5jdGlvbkFyZ3VtZW50RXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBUaGUgXCIke2Vyci5hcmd1bWVudE5hbWV9XCIgYXJndW1lbnQgaXMgZXhwZWN0ZWQgdG8gYmUgYSBmdW5jdGlvbiwgYnV0IGl0IHdhcyAke2Vyci5hY3R1YWxWYWx1ZX0uXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uUG9zaXRpdmVJbnRlZ2VyQXJndW1lbnRFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFRoZSBcIiR7ZXJyLmFyZ3VtZW50TmFtZX1cIiBhcmd1bWVudCBpcyBleHBlY3RlZCB0byBiZSBhIHBvc2l0aXZlIGludGVnZXIsIGJ1dCBpdCB3YXMgJHtlcnIuYWN0dWFsVmFsdWV9LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvbkVsZW1lbnROb3RGb3VuZEVycm9yXTogKGVyciwgdmlld3BvcnRXaWR0aCkgPT4gYFxuICAgICAgICBUaGUgc3BlY2lmaWVkIHNlbGVjdG9yIGRvZXMgbm90IG1hdGNoIGFueSBlbGVtZW50IGluIHRoZSBET00gdHJlZS5cblxuICAgICAgICAke2Zvcm1hdFNlbGVjdG9yQ2FsbHN0YWNrKGVyci5hcGlGbkNoYWluLCBlcnIuYXBpRm5JbmRleCwgdmlld3BvcnRXaWR0aCl9XG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uRWxlbWVudElzSW52aXNpYmxlRXJyb3JdOiAoKSA9PiBgXG4gICAgICAgIFRoZSBlbGVtZW50IHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIHNlbGVjdG9yIGlzIG5vdCB2aXNpYmxlLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvblNlbGVjdG9yTWF0Y2hlc1dyb25nTm9kZVR5cGVFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFRoZSBzcGVjaWZpZWQgc2VsZWN0b3IgaXMgZXhwZWN0ZWQgdG8gbWF0Y2ggYSBET00gZWxlbWVudCwgYnV0IGl0IG1hdGNoZXMgYSAke2Vyci5ub2RlRGVzY3JpcHRpb259IG5vZGUuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uQWRkaXRpb25hbEVsZW1lbnROb3RGb3VuZEVycm9yXTogKGVyciwgdmlld3BvcnRXaWR0aCkgPT4gYFxuICAgICAgICBUaGUgc3BlY2lmaWVkIFwiJHtlcnIuYXJndW1lbnROYW1lfVwiIGRvZXMgbm90IG1hdGNoIGFueSBlbGVtZW50IGluIHRoZSBET00gdHJlZS5cblxuICAgICAgICAke2Zvcm1hdFNlbGVjdG9yQ2FsbHN0YWNrKGVyci5hcGlGbkNoYWluLCBlcnIuYXBpRm5JbmRleCwgdmlld3BvcnRXaWR0aCl9XG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uQWRkaXRpb25hbEVsZW1lbnRJc0ludmlzaWJsZUVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIGVsZW1lbnQgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgXCIke2Vyci5hcmd1bWVudE5hbWV9XCIgaXMgbm90IHZpc2libGUuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uQWRkaXRpb25hbFNlbGVjdG9yTWF0Y2hlc1dyb25nTm9kZVR5cGVFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFRoZSBzcGVjaWZpZWQgXCIke2Vyci5hcmd1bWVudE5hbWV9XCIgaXMgZXhwZWN0ZWQgdG8gbWF0Y2ggYSBET00gZWxlbWVudCwgYnV0IGl0IG1hdGNoZXMgYSAke2Vyci5ub2RlRGVzY3JpcHRpb259IG5vZGUuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uRWxlbWVudE5vbkVkaXRhYmxlRXJyb3JdOiAoKSA9PiBgXG4gICAgICAgIFRoZSBhY3Rpb24gZWxlbWVudCBpcyBleHBlY3RlZCB0byBiZSBlZGl0YWJsZSAoYW4gaW5wdXQsIHRleHRhcmVhIG9yIGVsZW1lbnQgd2l0aCB0aGUgY29udGVudEVkaXRhYmxlIGF0dHJpYnV0ZSkuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uRWxlbWVudE5vbkNvbnRlbnRFZGl0YWJsZUVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIGVsZW1lbnQgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgXCIke2Vyci5hcmd1bWVudE5hbWV9XCIgaXMgZXhwZWN0ZWQgdG8gaGF2ZSB0aGUgY29udGVudEVkaXRhYmxlIGF0dHJpYnV0ZSBlbmFibGVkIG9yIHRoZSBlbnRpcmUgZG9jdW1lbnQgc2hvdWxkIGJlIGluIGRlc2lnbiBtb2RlLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvblJvb3RDb250YWluZXJOb3RGb3VuZEVycm9yXTogKCkgPT4gYFxuICAgICAgICBDb250ZW50IGJldHdlZW4gdGhlIGFjdGlvbiBlbGVtZW50cyBjYW5ub3QgYmUgc2VsZWN0ZWQgYmVjYXVzZSB0aGUgcm9vdCBjb250YWluZXIgZm9yIHRoZSBzZWxlY3Rpb24gcmFuZ2UgY2Fubm90IGJlIGZvdW5kLCBpLmUuIHRoZXNlIGVsZW1lbnRzIGRvIG5vdCBoYXZlIGEgY29tbW9uIGFuY2VzdG9yIHdpdGggdGhlIGNvbnRlbnRFZGl0YWJsZSBhdHRyaWJ1dGUuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uRWxlbWVudElzTm90RmlsZUlucHV0RXJyb3JdOiAoKSA9PiBgXG4gICAgICAgIFRoZSBzcGVjaWZpZWQgc2VsZWN0b3IgZG9lcyBub3QgbWF0Y2ggYSBmaWxlIGlucHV0IGVsZW1lbnQuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uQ2Fubm90RmluZEZpbGVUb1VwbG9hZEVycm9yXTogZXJyID0+IGBcbiAgICAgICAgQ2Fubm90IGZpbmQgdGhlIGZvbGxvd2luZyBmaWxlKHMpIHRvIHVwbG9hZDpcbiAgICAgICAgJHtlcnIuZmlsZVBhdGhzLm1hcChwYXRoID0+IGVzY2FwZUh0bWwocGF0aCkpLmpvaW4oJ1xcbicpfVxuXG4gICAgICAgIFRoZSBmb2xsb3dpbmcgbG9jYXRpb25zIHdlcmUgc2Nhbm5lZCBmb3IgdGhlIG1pc3NpbmcgdXBsb2FkIGZpbGVzOlxuICAgICAgICAke2Vyci5zY2FubmVkRmlsZVBhdGhzLm1hcChwYXRoID0+IGVzY2FwZUh0bWwocGF0aCkpLmpvaW4oJ1xcbicpfVxuXG4gICAgICAgIEVuc3VyZSB0aGVzZSBmaWxlcyBleGlzdCBvciBjaGFuZ2UgdGhlIHdvcmtpbmcgZGlyZWN0b3J5LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvbkVsZW1lbnROb3RUZXh0QXJlYUVycm9yXTogKCkgPT4gYFxuICAgICAgICBUaGUgYWN0aW9uIGVsZW1lbnQgaXMgZXhwZWN0ZWQgdG8gYmUgYSAmbHQ7dGV4dGFyZWEmZ3Q7LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvbkVsZW1lbnROb3RJZnJhbWVFcnJvcl06ICgpID0+IGBcbiAgICAgICAgVGhlIGFjdGlvbiBlbGVtZW50IGlzIGV4cGVjdGVkIHRvIGJlIGFuICZsdDtpZnJhbWUmZ3QuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uSW5jb3JyZWN0S2V5c0Vycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIFwiJHtlcnIuYXJndW1lbnROYW1lfVwiIGFyZ3VtZW50IGNvbnRhaW5zIGFuIGluY29ycmVjdCBrZXkgb3Iga2V5IGNvbWJpbmF0aW9uLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvblVuc3VwcG9ydGVkRGV2aWNlVHlwZUVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIFwiJHtlcnIuYXJndW1lbnROYW1lfVwiIGFyZ3VtZW50IHNwZWNpZmllcyBhbiB1bnN1cHBvcnRlZCBcIiR7ZXJyLmFjdHVhbFZhbHVlfVwiIGRldmljZS4gRm9yIGEgbGlzdCBvZiBzdXBwb3J0ZWQgZGV2aWNlcywgcmVmZXIgdG8gJHtmb3JtYXRVcmwoRVhURVJOQUxfTElOS1Mudmlld3BvcnRTaXplcyl9LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvbkludmFsaWRTY3JvbGxUYXJnZXRFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFVuYWJsZSB0byBzY3JvbGwgdG8gdGhlIHNwZWNpZmllZCBwb2ludCBiZWNhdXNlIGEgcG9pbnQgd2l0aCB0aGUgc3BlY2lmaWVkICR7ZXJyLnByb3BlcnRpZXN9IGlzIG5vdCBsb2NhdGVkIGluc2lkZSB0aGUgZWxlbWVudCdzIGNyb3BwaW5nIHJlZ2lvbi5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hY3Rpb25JZnJhbWVJc05vdExvYWRlZEVycm9yXTogKCkgPT4gYFxuICAgICAgICBDb250ZW50IG9mIHRoZSBpZnJhbWUgdG8gd2hpY2ggeW91IGFyZSBzd2l0Y2hpbmcgZGlkIG5vdCBsb2FkLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmN1cnJlbnRJZnJhbWVJc05vdExvYWRlZEVycm9yXTogKCkgPT4gYFxuICAgICAgICBDb250ZW50IG9mIHRoZSBpZnJhbWUgaW4gd2hpY2ggdGhlIHRlc3QgaXMgY3VycmVudGx5IG9wZXJhdGluZyBkaWQgbm90IGxvYWQuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuY3VycmVudElmcmFtZU5vdEZvdW5kRXJyb3JdOiAoKSA9PiBgXG4gICAgICAgIFRoZSBpZnJhbWUgaW4gd2hpY2ggdGhlIHRlc3QgaXMgY3VycmVudGx5IG9wZXJhdGluZyBkb2VzIG5vdCBleGlzdCBhbnltb3JlLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmN1cnJlbnRJZnJhbWVJc0ludmlzaWJsZUVycm9yXTogKCkgPT4gYFxuICAgICAgICBUaGUgaWZyYW1lIGluIHdoaWNoIHRoZSB0ZXN0IGlzIGN1cnJlbnRseSBvcGVyYXRpbmcgaXMgbm90IHZpc2libGUgYW55bW9yZS5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5taXNzaW5nQXdhaXRFcnJvcl06ICgpID0+IGBcbiAgICAgICAgQSBjYWxsIHRvIGFuIGFzeW5jIGZ1bmN0aW9uIGlzIG5vdCBhd2FpdGVkLiBVc2UgdGhlIFwiYXdhaXRcIiBrZXl3b3JkIGJlZm9yZSBhY3Rpb25zLCBhc3NlcnRpb25zIG9yIGNoYWlucyBvZiB0aGVtIHRvIGVuc3VyZSB0aGF0IHRoZXkgcnVuIGluIHRoZSByaWdodCBzZXF1ZW5jZS5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5leHRlcm5hbEFzc2VydGlvbkxpYnJhcnlFcnJvcl06IGVyciA9PiBgXG4gICAgICAgICR7ZXNjYXBlSHRtbChlcnIuZXJyTXNnKX1cblxuICAgICAgICAke3JlbmRlckRpZmYoZXJyLmRpZmYpfVxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmRvbU5vZGVDbGllbnRGdW5jdGlvblJlc3VsdEVycm9yXTogZXJyID0+IGBcbiAgICAgICAke2Vyci5pbnN0YW50aWF0aW9uQ2FsbHNpdGVOYW1lfSBjYW5ub3QgcmV0dXJuIERPTSBlbGVtZW50cy4gVXNlIFNlbGVjdG9yIGZ1bmN0aW9ucyBmb3IgdGhpcyBwdXJwb3NlLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmludmFsaWRTZWxlY3RvclJlc3VsdEVycm9yXTogKCkgPT4gYFxuICAgICAgICBGdW5jdGlvbiB0aGF0IHNwZWNpZmllcyBhIHNlbGVjdG9yIGNhbiBvbmx5IHJldHVybiBhIERPTSBub2RlLCBhbiBhcnJheSBvZiBub2RlcywgTm9kZUxpc3QsIEhUTUxDb2xsZWN0aW9uLCBudWxsIG9yIHVuZGVmaW5lZC4gVXNlIENsaWVudEZ1bmN0aW9uIHRvIHJldHVybiBvdGhlciB2YWx1ZXMuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uU2VsZWN0b3JFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIEFjdGlvbiBcIiR7ZXJyLnNlbGVjdG9yTmFtZX1cIiBhcmd1bWVudCBlcnJvcjpcblxuICAgICAgICAke2VzY2FwZUh0bWwoZXJyLmVyck1zZyl9XG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuY2Fubm90T2J0YWluSW5mb0ZvckVsZW1lbnRTcGVjaWZpZWRCeVNlbGVjdG9yRXJyb3JdOiAoZXJyLCB2aWV3cG9ydFdpZHRoKSA9PiBgXG4gICAgICAgIENhbm5vdCBvYnRhaW4gaW5mb3JtYXRpb24gYWJvdXQgdGhlIG5vZGUgYmVjYXVzZSB0aGUgc3BlY2lmaWVkIHNlbGVjdG9yIGRvZXMgbm90IG1hdGNoIGFueSBub2RlIGluIHRoZSBET00gdHJlZS5cblxuICAgICAgICAke2Zvcm1hdFNlbGVjdG9yQ2FsbHN0YWNrKGVyci5hcGlGbkNoYWluLCBlcnIuYXBpRm5JbmRleCwgdmlld3BvcnRXaWR0aCl9XG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMud2luZG93RGltZW5zaW9uc092ZXJmbG93RXJyb3JdOiAoKSA9PiBgXG4gICAgICAgIFVuYWJsZSB0byByZXNpemUgdGhlIHdpbmRvdyBiZWNhdXNlIHRoZSBzcGVjaWZpZWQgc2l6ZSBleGNlZWRzIHRoZSBzY3JlZW4gc2l6ZS4gT24gbWFjT1MsIGEgd2luZG93IGNhbm5vdCBiZSBsYXJnZXIgdGhhbiB0aGUgc2NyZWVuLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmZvcmJpZGRlbkNoYXJhY3RlcnNJblNjcmVlbnNob3RQYXRoRXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBUaGVyZSBhcmUgZm9yYmlkZGVuIGNoYXJhY3RlcnMgaW4gdGhlIFwiJHtlcnIuc2NyZWVuc2hvdFBhdGh9XCIgc2NyZWVuc2hvdCBwYXRoOlxuICAgICAgICAke3JlbmRlckZvcmJpZGRlbkNoYXJzTGlzdChlcnIuZm9yYmlkZGVuQ2hhcnNMaXN0KX1cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5pbnZhbGlkRWxlbWVudFNjcmVlbnNob3REaW1lbnNpb25zRXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICAgVW5hYmxlIHRvIGNhcHR1cmUgYW4gZWxlbWVudCBpbWFnZSBiZWNhdXNlIHRoZSByZXN1bHRpbmcgaW1hZ2UgJHtlcnIuZGltZW5zaW9uc30gJHtlcnIudmVyYn0gemVybyBvciBuZWdhdGl2ZS5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5yb2xlU3dpdGNoSW5Sb2xlSW5pdGlhbGl6ZXJFcnJvcl06ICgpID0+IGBcbiAgICAgICAgUm9sZSBjYW5ub3QgYmUgc3dpdGNoZWQgd2hpbGUgYW5vdGhlciByb2xlIGlzIGJlaW5nIGluaXRpYWxpemVkLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFzc2VydGlvbkV4ZWN1dGFibGVBcmd1bWVudEVycm9yXTogZXJyID0+IGBcbiAgICAgICAgQ2Fubm90IGV2YWx1YXRlIHRoZSBcIiR7ZXJyLmFjdHVhbFZhbHVlfVwiIGV4cHJlc3Npb24gaW4gdGhlIFwiJHtlcnIuYXJndW1lbnROYW1lfVwiIHBhcmFtZXRlciBiZWNhdXNlIG9mIHRoZSBmb2xsb3dpbmcgZXJyb3I6XG5cbiAgICAgICAgJHtlcnIuZXJyTXNnfVxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFzc2VydGlvbldpdGhvdXRNZXRob2RDYWxsRXJyb3JdOiAoKSA9PiBgXG4gICAgICAgIEFuIGFzc2VydGlvbiBtZXRob2QgaXMgbm90IHNwZWNpZmllZC5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hc3NlcnRpb25VbmF3YWl0ZWRQcm9taXNlRXJyb3JdOiAoKSA9PiBgXG4gICAgICAgIEF0dGVtcHRlZCB0byBydW4gYXNzZXJ0aW9ucyBvbiBhIFByb21pc2Ugb2JqZWN0LiBEaWQgeW91IGZvcmdldCB0byBhd2FpdCBpdD8gSWYgbm90LCBwYXNzIFwieyBhbGxvd1VuYXdhaXRlZFByb21pc2U6IHRydWUgfVwiIHRvIHRoZSBhc3NlcnRpb24gb3B0aW9ucy5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5yZXF1ZXN0SG9va05vdEltcGxlbWVudGVkRXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBZb3Ugc2hvdWxkIGltcGxlbWVudCB0aGUgXCIke2Vyci5tZXRob2ROYW1lfVwiIG1ldGhvZCBpbiB0aGUgXCIke2Vyci5ob29rQ2xhc3NOYW1lfVwiIGNsYXNzLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLnJlcXVlc3RIb29rVW5oYW5kbGVkRXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBBbiB1bmhhbmRsZWQgZXJyb3Igb2NjdXJyZWQgaW4gdGhlIFwiJHtlcnIubWV0aG9kTmFtZX1cIiBtZXRob2Qgb2YgdGhlIFwiJHtlcnIuaG9va0NsYXNzTmFtZX1cIiBjbGFzczpcblxuICAgICAgICAke2VzY2FwZUh0bWwoZXJyLmVyck1zZyl9XG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMudW5jYXVnaHRFcnJvckluQ3VzdG9tQ2xpZW50U2NyaXB0Q29kZV06IGVyciA9PiBgXG4gICAgICAgIEFuIGVycm9yIG9jY3VycmVkIGluIGEgc2NyaXB0IGluamVjdGVkIGludG8gdGhlIHRlc3RlZCBwYWdlOlxuXG4gICAgICAgICR7ZXNjYXBlSHRtbChlcnIuZXJyTXNnKX1cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy51bmNhdWdodEVycm9ySW5DdXN0b21DbGllbnRTY3JpcHRDb2RlTG9hZGVkRnJvbU1vZHVsZV06IGVyciA9PiBgXG4gICAgICAgIEFuIGVycm9yIG9jY3VycmVkIGluIHRoZSAnJHtlcnIubW9kdWxlTmFtZX0nIG1vZHVsZSBpbmplY3RlZCBpbnRvIHRoZSB0ZXN0ZWQgcGFnZS4gTWFrZSBzdXJlIHRoYXQgdGhpcyBtb2R1bGUgY2FuIGJlIGV4ZWN1dGVkIGluIHRoZSBicm93c2VyIGVudmlyb25tZW50LlxuXG4gICAgICAgIEVycm9yIGRldGFpbHM6XG4gICAgICAgICR7ZXNjYXBlSHRtbChlcnIuZXJyTXNnKX1cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy51bmNhdWdodEVycm9ySW5DdXN0b21TY3JpcHRdOiBlcnIgPT4gYFxuICAgICAgICBBbiB1bmhhbmRsZWQgZXJyb3Igb2NjdXJyZWQgaW4gdGhlIGN1c3RvbSBzY3JpcHQ6XG5cbiAgICAgICAgRXJyb3IgZGV0YWlsczogJHtlc2NhcGVIdG1sKGVyci5lcnJNc2cpfVxuXG4gICAgICAgICR7Zm9ybWF0RXhwcmVzc2lvbk1lc3NhZ2UoZXJyLmV4cHJlc3Npb24sIGVyci5saW5lLCBlcnIuY29sdW1uKX1cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5jaGlsZFdpbmRvd0lzTm90TG9hZGVkRXJyb3JdOiAoKSA9PiBgXG4gICAgICAgIFRoZSBwYWdlIGluIHRoZSBjaGlsZCB3aW5kb3cgaXMgbm90IGxvYWRlZC5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5jaGlsZFdpbmRvd05vdEZvdW5kRXJyb3JdOiAoKSA9PiBgXG4gICAgICAgIFRoZSBjaGlsZCB3aW5kb3cgaXMgbm90IGZvdW5kLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmNhbm5vdFN3aXRjaFRvV2luZG93RXJyb3JdOiAoKSA9PiBgXG4gICAgICAgIENhbm5vdCBzd2l0Y2ggdG8gdGhlIHdpbmRvdy5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5jbG9zZUNoaWxkV2luZG93RXJyb3JdOiAoKSA9PiBgXG4gICAgICAgIEFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGNsb3NpbmcgY2hpbGQgd2luZG93cy5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5jaGlsZFdpbmRvd0Nsb3NlZEJlZm9yZVN3aXRjaGluZ0Vycm9yXTogKCkgPT4gYFxuICAgICAgICBUaGUgY2hpbGQgd2luZG93IHdhcyBjbG9zZWQgYmVmb3JlIFRlc3RDYWZlIGNvdWxkIHN3aXRjaCB0byBpdC5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5jYW5ub3RDbG9zZVdpbmRvd1dpdGhDaGlsZHJlbkVycm9yXTogKCkgPT4gYFxuICAgICAgICBDYW5ub3QgY2xvc2UgYSB3aW5kb3cgdGhhdCBoYXMgYW4gb3BlbiBjaGlsZCB3aW5kb3cuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMudGFyZ2V0V2luZG93Tm90Rm91bmRFcnJvcl06ICgpID0+IGBcbiAgICAgICAgQ2Fubm90IGZpbmQgdGhlIHdpbmRvdyBzcGVjaWZpZWQgaW4gdGhlIGFjdGlvbiBwYXJhbWV0ZXJzLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLnBhcmVudFdpbmRvd05vdEZvdW5kRXJyb3JdOiAoKSA9PiBgXG4gICAgICAgIENhbm5vdCBmaW5kIHRoZSBwYXJlbnQgd2luZG93LiBNYWtlIHN1cmUgdGhhdCB0aGUgdGVzdGVkIHdpbmRvdyB3YXMgb3BlbmVkIGZyb20gYW5vdGhlciB3aW5kb3cuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMucHJldmlvdXNXaW5kb3dOb3RGb3VuZEVycm9yXTogKCkgPT4gYFxuICAgICAgICBDYW5ub3QgZmluZCB0aGUgcHJldmlvdXMgd2luZG93LiBNYWtlIHN1cmUgdGhhdCB0aGUgcHJldmlvdXMgd2luZG93IGlzIG9wZW5lZC5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5zd2l0Y2hUb1dpbmRvd1ByZWRpY2F0ZUVycm9yXTogZXJyID0+IGBcbiAgICAgICAgQW4gZXJyb3Igb2NjdXJyZWQgaW5zaWRlIHRoZSBcInN3aXRjaFRvV2luZG93XCIgYXJndW1lbnQgZnVuY3Rpb24uXG5cbiAgICAgICAgRXJyb3IgZGV0YWlsczpcbiAgICAgICAgJHtlc2NhcGVIdG1sKGVyci5lcnJNc2cpfVxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLm11bHRpcGxlV2luZG93c01vZGVJc0Rpc2FibGVkRXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBNdWx0aS13aW5kb3cgbW9kZSBpcyBkaXNhYmxlZC4gVG8gdXNlIHRoZSBcIiR7ZXJyLm1ldGhvZE5hbWV9XCIgbWV0aG9kLCByZW1vdmUgdGhlIFwiZGlzYWJsZU11bHRpcGxlV2luZG93c1wiIG9wdGlvbi5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5tdWx0aXBsZVdpbmRvd3NNb2RlSXNOb3RTdXBwb3J0ZWRJblJlbW90ZUJyb3dzZXJFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIE11bHRpLXdpbmRvdyBtb2RlIGlzIHN1cHBvcnRlZCBvbmx5IGluIGxvY2FsbHktaW5zdGFsbGVkIENocm9tZSwgQ2hyb21pdW0sIEVkZ2UgODQrIGFuZCBGaXJlZm94LiBSdW4gdGVzdHMgaW4gdGhlc2UgYnJvd3NlcnMgdG8gdXNlIHRoZSBcIiR7ZXJyLm1ldGhvZE5hbWV9XCIgbWV0aG9kLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmNhbm5vdENsb3NlV2luZG93V2l0aG91dFBhcmVudF06ICgpID0+IGBcbiAgICAgICAgQ2Fubm90IGNsb3NlIHRoZSB3aW5kb3cgYmVjYXVzZSBpdCBkb2VzIG5vdCBoYXZlIGEgcGFyZW50LiBUaGUgcGFyZW50IHdpbmRvdyB3YXMgY2xvc2VkIG9yIHlvdSBhcmUgYXR0ZW1wdGluZyB0byBjbG9zZSB0aGUgcm9vdCBicm93c2VyIHdpbmRvdyB3aGVyZSB0ZXN0cyB3ZXJlIGxhdW5jaGVkLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmNhbm5vdFJlc3RvcmVDaGlsZFdpbmRvd0Vycm9yXTogKCkgPT4gYFxuICAgICAgICBGYWlsZWQgdG8gcmVzdG9yZSBjb25uZWN0aW9uIHRvIHdpbmRvdyB3aXRoaW4gdGhlIGFsbG9jYXRlZCB0aW1lb3V0LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmV4ZWN1dGlvblRpbWVvdXRFeGNlZWRlZF06IGVyciA9PiB7XG4gICAgICAgIHJldHVybiBgJHtlcnIuc2NvcGV9IHRpbWVvdXQgb2YgJHtlcnIudGltZW91dH1tcyBleGNlZWRlZC5gO1xuICAgIH0sXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvblN0cmluZ09wdGlvbkVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIHZhbHVlIG9mIHRoZSBcIiR7ZXJyLm9wdGlvbk5hbWV9XCIgb3B0aW9uIGJlbG9uZ3MgdG8gYW4gdW5zdXBwb3J0ZWQgZGF0YSB0eXBlICgke2Vyci5hY3R1YWxWYWx1ZX0pLiBUaGUgXCIke2Vyci5vcHRpb25OYW1lfVwiIG9wdGlvbiBvbmx5IGFjY2VwdHMgU3RyaW5nIHR5cGUgdmFsdWVzLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvblN0cmluZ09yUmVnZXhPcHRpb25FcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFRoZSB2YWx1ZSBvZiB0aGUgXCIke2Vyci5vcHRpb25OYW1lfVwiIG9wdGlvbiBiZWxvbmdzIHRvIGFuIHVuc3VwcG9ydGVkIGRhdGEgdHlwZSAoJHtlcnIuYWN0dWFsVmFsdWV9KS4gVGhlIFwiJHtlcnIub3B0aW9uTmFtZX1cIiBvcHRpb24gb25seSBhY2NlcHRzIFN0cmluZyBvciBSZWdleCB0eXBlIHZhbHVlcy5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hY3Rpb25EYXRlT3B0aW9uRXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBUaGUgdmFsdWUgb2YgdGhlIFwiJHtlcnIub3B0aW9uTmFtZX1cIiBvcHRpb24gYmVsb25ncyB0byBhbiB1bnN1cHBvcnRlZCBkYXRhIHR5cGUgKCR7ZXJyLmFjdHVhbFZhbHVlfSkuIFRoZSBcIiR7ZXJyLm9wdGlvbk5hbWV9XCIgb3B0aW9uIG9ubHkgYWNjZXB0cyBEYXRlIHR5cGUgdmFsdWVzLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvbk51bWJlck9wdGlvbkVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIHZhbHVlIG9mIHRoZSBcIiR7ZXJyLm9wdGlvbk5hbWV9XCIgb3B0aW9uIGJlbG9uZ3MgdG8gYW4gdW5zdXBwb3J0ZWQgZGF0YSB0eXBlICgke2Vyci5hY3R1YWxWYWx1ZX0pLiBUaGUgXCIke2Vyci5vcHRpb25OYW1lfVwiIG9wdGlvbiBvbmx5IGFjY2VwdHMgTnVtYmVyIHR5cGUgdmFsdWVzLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvblVybE9wdGlvbkVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIHZhbHVlIG9mIHRoZSBcIiR7ZXJyLm9wdGlvbk5hbWV9XCIgb3B0aW9uIGJlbG9uZ3MgdG8gYW4gdW5zdXBwb3J0ZWQgZGF0YSB0eXBlICgke2Vyci5hY3R1YWxWYWx1ZX0pLiBUaGUgXCIke2Vyci5vcHRpb25OYW1lfVwiIG9wdGlvbiBvbmx5IGFjY2VwdHMgc3RyaW5nIG9yIFVSTCB0eXBlcyB2YWx1ZXMuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uVXJsU2VhcmNoUGFyYW1zT3B0aW9uRXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBUaGUgdmFsdWUgb2YgdGhlIFwiJHtlcnIub3B0aW9uTmFtZX1cIiBvcHRpb24gYmVsb25ncyB0byBhbiB1bnN1cHBvcnRlZCBkYXRhIHR5cGUgKCR7ZXJyLmFjdHVhbFZhbHVlfSkuIFRoZSBcIiR7ZXJyLm9wdGlvbk5hbWV9XCIgb3B0aW9uIG9ubHkgYWNjZXB0cyBvYmplY3Qgb3IgVVJMU2VhcmNoUGFyYW1zIHR5cGVzIHZhbHVlcy5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hY3Rpb25PYmplY3RPcHRpb25FcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFRoZSB2YWx1ZSBvZiB0aGUgXCIke2Vyci5vcHRpb25OYW1lfVwiIG9wdGlvbiBiZWxvbmdzIHRvIGFuIHVuc3VwcG9ydGVkIGRhdGEgdHlwZSAoJHtlcnIuYWN0dWFsVmFsdWV9KS4gVGhlIFwiJHtlcnIub3B0aW9uTmFtZX1cIiBvcHRpb24gb25seSBhY2NlcHRzIG9iamVjdCB0eXBlcyB2YWx1ZXMuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uVXJsQXJndW1lbnRFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFRoZSBcIiR7ZXJyLmFyZ3VtZW50TmFtZX1cIiBhcmd1bWVudCBpcyBleHBlY3RlZCB0byBiZSBhbiBVUkwgb3IgYSBzdHJpbmcsIGJ1dCBpdCB3YXMgJHtlcnIuYWN0dWFsVmFsdWV9LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvblNraXBKc0Vycm9yc0FyZ3VtZW50RXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBDYW5ub3QgZXhlY3V0ZSB0aGUgc2tpcEpzRXJyb3JzIG1ldGhvZC4gVGhlIHZhbHVlIG9mIHRoZSBcIiR7ZXJyLmFyZ3VtZW50TmFtZX1cIiBhcmd1bWVudCBiZWxvbmdzIHRvIGFuIHVuc3VwcG9ydGVkIHR5cGUgKCR7ZXJyLmFjdHVhbFZhbHVlfSkuIFRoZSBcIiR7ZXJyLmFyZ3VtZW50TmFtZX1cIiBzdXBwb3J0cyB0aGUgZm9sbG93aW5nIGRhdGEgdHlwZXM6IEJvb2xlYW4sIE9iamVjdCwgRnVuY3Rpb24uXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uRnVuY3Rpb25PcHRpb25FcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFRoZSB2YWx1ZSBvZiB0aGUgXCIke2Vyci5vcHRpb25OYW1lfVwiIG9wdGlvbiBiZWxvbmdzIHRvIGFuIHVuc3VwcG9ydGVkIGRhdGEgdHlwZSAoJHtlcnIuYWN0dWFsVmFsdWV9KS4gVGhlIFwiJHtlcnIub3B0aW9uTmFtZX1cIiBvcHRpb24gb25seSBhY2NlcHRzIGZ1bmN0aW9uIHR5cGVzIHZhbHVlcy5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hY3Rpb25JbnZhbGlkT2JqZWN0UHJvcGVydHlFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFRoZSBcIiR7ZXJyLm9iamVjdE5hbWV9XCIgb2JqZWN0IGRvZXMgbm90IHN1cHBvcnQgdGhlIFwiJHtlcnIucHJvcGVydHlOYW1lfVwiIHByb3BlcnR5LlxuICAgICAgICBUbyBwcm9jZWVkLCByZW1vdmUgaW52YWxpZCBvcHRpb25zIGZyb20geW91ciBjb2RlIG9yIGNoZWNrIHlvdXIgdGVzdCBmb3Igc3BlbGxpbmcgZXJyb3JzLlxuICAgICAgICBUaGUgXCIke2Vyci5vYmplY3ROYW1lfVwiIG9iamVjdCBzdXBwb3J0cyB0aGUgZm9sbG93aW5nIG9wdGlvbnM6XG4gICAgICAgICR7Z2V0Q29uY2F0ZW5hdGVkVmFsdWVzU3RyaW5nKGVyci5hdmFpbGFibGVQcm9wZXJ0aWVzLCAnLFxcbicpfS5cbiAgICBgLFxufTtcbiJdfQ==