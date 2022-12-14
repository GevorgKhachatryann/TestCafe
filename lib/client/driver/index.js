window['%hammerhead%'].utils.removeInjectedScript();

// NOTE: We should have the capability to initialize scripts with different contexts.
// This is required for iframes without the src attribute because Hammerhead does not
// inject scripts into such iframes. So, we wrap all scripts in initialization functions.
(function () {
    function initTestCafeClientDrivers(window, isIFrameWithoutSrc) {
        var document = window.document;

        (function (hammerhead, Promise$3, testcafeCore, testcafeAutomation, testcafeUi) {
    var hammerhead__default = 'default' in hammerhead ? hammerhead['default'] : hammerhead;
    Promise$3 = Promise$3 && Object.prototype.hasOwnProperty.call(Promise$3, 'default') ? Promise$3['default'] : Promise$3;

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise$3))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    // -------------------------------------------------------------
    // WARNING: this file is used by both the client and the server.
    // Do not use any browser or node-specific API!
    // -------------------------------------------------------------
    var HEARTBEAT_TIMEOUT = 2 * 60 * 1000;
    var CHECK_IFRAME_DRIVER_LINK_DELAY = 500;
    var CHECK_CHILD_WINDOW_DRIVER_LINK_DELAY = 500;
    var SEND_STATUS_REQUEST_TIME_LIMIT = 5000;
    var SEND_STATUS_REQUEST_RETRY_DELAY = 300;
    var SEND_STATUS_REQUEST_RETRY_COUNT = Math.floor(HEARTBEAT_TIMEOUT / SEND_STATUS_REQUEST_RETRY_DELAY - 1);
    var CHECK_STATUS_RETRY_DELAY = 1000;

    var ClientMessages;
    (function (ClientMessages) {
        ClientMessages["ready"] = "ready";
        ClientMessages["readyForBrowserManipulation"] = "ready-for-browser-manipulation";
        ClientMessages["waitForFileDownload"] = "wait-for-file-download";
    })(ClientMessages || (ClientMessages = {}));
    var TEST_RUN_MESSAGES = ClientMessages;

    // -------------------------------------------------------------
    // WARNING: this file is used by both the client and the server.
    // Do not use any browser or node-specific API!
    // -------------------------------------------------------------
    var COMMAND_TYPE = {
        dispatchEvent: 'dispatch-event',
        click: 'click',
        rightClick: 'right-click',
        doubleClick: 'double-click',
        drag: 'drag',
        dragToElement: 'drag-to-element',
        hover: 'hover',
        scroll: 'scroll',
        scrollBy: 'scroll-by',
        scrollIntoView: 'scroll-into-view',
        typeText: 'type-text',
        selectText: 'select-text',
        selectTextAreaContent: 'select-text-area-content',
        selectEditableContent: 'select-editable-content',
        pressKey: 'press-key',
        wait: 'wait',
        navigateTo: 'navigate-to',
        setFilesToUpload: 'set-files-to-upload',
        clearUpload: 'clear-upload',
        executeClientFunction: 'execute-client-function',
        executeSelector: 'execute-selector',
        takeScreenshot: 'take-screenshot',
        takeElementScreenshot: 'take-element-screenshot',
        takeScreenshotOnFail: 'take-screenshot-on-fail',
        prepareBrowserManipulation: 'prepare-browser-manipulation',
        showAssertionRetriesStatus: 'show-assertion-retries-status',
        hideAssertionRetriesStatus: 'hide-assertion-retries-status',
        setBreakpoint: 'set-breakpoint',
        resizeWindow: 'resize-window',
        resizeWindowToFitDevice: 'resize-window-to-fit-device',
        maximizeWindow: 'maximize-window',
        switchToIframe: 'switch-to-iframe',
        switchToMainWindow: 'switch-to-main-window',
        openWindow: 'open-window',
        closeWindow: 'close-window',
        getCurrentWindow: 'get-current-window',
        getCurrentWindows: 'get-current-windows',
        switchToWindow: 'switch-to-window',
        switchToWindowByPredicate: 'switch-to-window-by-predicate',
        switchToParentWindow: 'switch-to-parent-window',
        switchToPreviousWindow: 'switch-to-previous-window',
        setNativeDialogHandler: 'set-native-dialog-handler',
        getNativeDialogHistory: 'get-native-dialog-history',
        getBrowserConsoleMessages: 'get-browser-console-messages',
        getActiveElement: 'get-active-element',
        setTestSpeed: 'set-test-speed',
        setPageLoadTimeout: 'set-page-load-timeout',
        debug: 'debug',
        disableDebug: 'disable-debug',
        assertion: 'assertion',
        useRole: 'useRole',
        testDone: 'test-done',
        backupStorages: 'backup-storages',
        executeExpression: 'execute-expression',
        executeAsyncExpression: 'execute-async-expression',
        unlockPage: 'unlock-page',
        closeChildWindowOnFileDownloading: 'close-child-window-on-file-downloading',
        recorder: 'recorder',
        prepareClientEnvironmentInDebugMode: 'prepare-client-environment-in-debug-mode',
        getCookies: 'get-cookies',
        setCookies: 'set-cookies',
        deleteCookies: 'delete-cookies',
        getProxyUrl: 'get-proxy-url',
        request: 'request',
        skipJsErrors: 'skip-js-errors',
        addRequestHooks: 'add-request-hooks',
        removeRequestHooks: 'remove-request-hooks',
    };

    // -------------------------------------------------------------
    // WARNING: this file is used by both the client and the server.
    // Do not use any browser or node-specific API!
    // -------------------------------------------------------------
    var TEST_RUN_ERRORS = {
        uncaughtErrorOnPage: 'E1',
        uncaughtErrorInTestCode: 'E2',
        uncaughtNonErrorObjectInTestCode: 'E3',
        uncaughtErrorInClientFunctionCode: 'E4',
        uncaughtErrorInCustomDOMPropertyCode: 'E5',
        unhandledPromiseRejection: 'E6',
        uncaughtException: 'E7',
        missingAwaitError: 'E8',
        actionIntegerOptionError: 'E9',
        actionPositiveIntegerOptionError: 'E10',
        actionBooleanOptionError: 'E11',
        actionSpeedOptionError: 'E12',
        actionOptionsTypeError: 'E14',
        actionBooleanArgumentError: 'E15',
        actionStringArgumentError: 'E16',
        actionNullableStringArgumentError: 'E17',
        actionStringOrStringArrayArgumentError: 'E18',
        actionStringArrayElementError: 'E19',
        actionIntegerArgumentError: 'E20',
        actionRoleArgumentError: 'E21',
        actionPositiveIntegerArgumentError: 'E22',
        actionSelectorError: 'E23',
        actionElementNotFoundError: 'E24',
        actionElementIsInvisibleError: 'E26',
        actionSelectorMatchesWrongNodeTypeError: 'E27',
        actionAdditionalElementNotFoundError: 'E28',
        actionAdditionalElementIsInvisibleError: 'E29',
        actionAdditionalSelectorMatchesWrongNodeTypeError: 'E30',
        actionElementNonEditableError: 'E31',
        actionElementNotTextAreaError: 'E32',
        actionElementNonContentEditableError: 'E33',
        actionElementIsNotFileInputError: 'E34',
        actionRootContainerNotFoundError: 'E35',
        actionIncorrectKeysError: 'E36',
        actionCannotFindFileToUploadError: 'E37',
        actionUnsupportedDeviceTypeError: 'E38',
        actionIframeIsNotLoadedError: 'E39',
        actionElementNotIframeError: 'E40',
        actionInvalidScrollTargetError: 'E41',
        currentIframeIsNotLoadedError: 'E42',
        currentIframeNotFoundError: 'E43',
        currentIframeIsInvisibleError: 'E44',
        nativeDialogNotHandledError: 'E45',
        uncaughtErrorInNativeDialogHandler: 'E46',
        setTestSpeedArgumentError: 'E47',
        setNativeDialogHandlerCodeWrongTypeError: 'E48',
        clientFunctionExecutionInterruptionError: 'E49',
        domNodeClientFunctionResultError: 'E50',
        invalidSelectorResultError: 'E51',
        cannotObtainInfoForElementSpecifiedBySelectorError: 'E52',
        externalAssertionLibraryError: 'E53',
        pageLoadError: 'E54',
        windowDimensionsOverflowError: 'E55',
        forbiddenCharactersInScreenshotPathError: 'E56',
        invalidElementScreenshotDimensionsError: 'E57',
        roleSwitchInRoleInitializerError: 'E58',
        assertionExecutableArgumentError: 'E59',
        assertionWithoutMethodCallError: 'E60',
        assertionUnawaitedPromiseError: 'E61',
        requestHookNotImplementedError: 'E62',
        requestHookUnhandledError: 'E63',
        uncaughtErrorInCustomClientScriptCode: 'E64',
        uncaughtErrorInCustomClientScriptCodeLoadedFromModule: 'E65',
        uncaughtErrorInCustomScript: 'E66',
        uncaughtTestCafeErrorInCustomScript: 'E67',
        childWindowIsNotLoadedError: 'E68',
        childWindowNotFoundError: 'E69',
        cannotSwitchToWindowError: 'E70',
        closeChildWindowError: 'E71',
        childWindowClosedBeforeSwitchingError: 'E72',
        cannotCloseWindowWithChildrenError: 'E73',
        targetWindowNotFoundError: 'E74',
        parentWindowNotFoundError: 'E76',
        previousWindowNotFoundError: 'E77',
        switchToWindowPredicateError: 'E78',
        actionFunctionArgumentError: 'E79',
        multipleWindowsModeIsDisabledError: 'E80',
        multipleWindowsModeIsNotSupportedInRemoteBrowserError: 'E81',
        cannotCloseWindowWithoutParent: 'E82',
        cannotRestoreChildWindowError: 'E83',
        executionTimeoutExceeded: 'E84',
        actionRequiredCookieArguments: 'E85',
        actionCookieArgumentError: 'E86',
        actionCookieArgumentsError: 'E87',
        actionUrlCookieArgumentError: 'E88',
        actionUrlsCookieArgumentError: 'E89',
        actionStringOptionError: 'E90',
        actionDateOptionError: 'E91',
        actionNumberOptionError: 'E92',
        actionUrlOptionError: 'E93',
        actionUrlSearchParamsOptionError: 'E94',
        actionObjectOptionError: 'E95',
        actionUrlArgumentError: 'E96',
        actionStringOrRegexOptionError: 'E97',
        actionSkipJsErrorsArgumentError: 'E98',
        actionFunctionOptionError: 'E99',
        actionInvalidObjectPropertyError: 'E100',
    };

    // -------------------------------------------------------------
    function isCommandRejectableByPageError(command) {
        return !isObservationCommand(command) && !isBrowserManipulationCommand(command) && !isServiceCommand(command) ||
            isResizeWindowCommand(command)
                && !isWindowSwitchingCommand(command);
    }
    function isClientFunctionCommand(command) {
        return command.type === COMMAND_TYPE.executeClientFunction ||
            command.type === COMMAND_TYPE.executeSelector;
    }
    function isObservationCommand(command) {
        return isClientFunctionCommand(command) ||
            command.type === COMMAND_TYPE.wait ||
            command.type === COMMAND_TYPE.assertion ||
            command.type === COMMAND_TYPE.executeExpression;
    }
    function isWindowSwitchingCommand(command) {
        return command.type === COMMAND_TYPE.switchToIframe || command.type === COMMAND_TYPE.switchToMainWindow;
    }
    function isScreenshotCommand(command) {
        return command.type === COMMAND_TYPE.takeScreenshot ||
            command.type === COMMAND_TYPE.takeElementScreenshot ||
            command.type === COMMAND_TYPE.takeScreenshotOnFail;
    }
    function isResizeWindowCommand(command) {
        return command.type === COMMAND_TYPE.resizeWindow ||
            command.type === COMMAND_TYPE.resizeWindowToFitDevice ||
            command.type === COMMAND_TYPE.maximizeWindow;
    }
    function isBrowserManipulationCommand(command) {
        return isScreenshotCommand(command) || isResizeWindowCommand(command);
    }
    function isServiceCommand(command) {
        return command.type === COMMAND_TYPE.testDone ||
            command.type === COMMAND_TYPE.showAssertionRetriesStatus ||
            command.type === COMMAND_TYPE.hideAssertionRetriesStatus ||
            command.type === COMMAND_TYPE.setBreakpoint ||
            command.type === COMMAND_TYPE.takeScreenshotOnFail ||
            command.type === COMMAND_TYPE.recorder ||
            command.type === COMMAND_TYPE.getProxyUrl;
    }
    function isExecutableInTopWindowOnly(command) {
        return command.type === COMMAND_TYPE.testDone ||
            command.type === COMMAND_TYPE.switchToMainWindow ||
            command.type === COMMAND_TYPE.setNativeDialogHandler ||
            command.type === COMMAND_TYPE.getNativeDialogHistory ||
            command.type === COMMAND_TYPE.setTestSpeed ||
            command.type === COMMAND_TYPE.showAssertionRetriesStatus ||
            command.type === COMMAND_TYPE.hideAssertionRetriesStatus ||
            command.type === COMMAND_TYPE.setBreakpoint ||
            isBrowserManipulationCommand(command) && command.type !== COMMAND_TYPE.takeElementScreenshot;
    }

    var STATUS_BAR_DEBUG_ACTION = {
        step: 'step',
        resume: 'resume',
    };

    // Base
    //--------------------------------------------------------------------
    var TestRunErrorBase = /** @class */ (function () {
        function TestRunErrorBase(code, callsite) {
            this.code = code;
            this.isTestCafeError = true;
            this.callsite = callsite || null;
        }
        return TestRunErrorBase;
    }());
    var ActionOptionErrorBase = /** @class */ (function (_super) {
        __extends(ActionOptionErrorBase, _super);
        function ActionOptionErrorBase(code, optionName, actualValue) {
            var _this = _super.call(this, code) || this;
            _this.optionName = optionName;
            _this.actualValue = actualValue;
            return _this;
        }
        return ActionOptionErrorBase;
    }(TestRunErrorBase));
    // Client function errors
    //--------------------------------------------------------------------
    var ClientFunctionExecutionInterruptionError = /** @class */ (function (_super) {
        __extends(ClientFunctionExecutionInterruptionError, _super);
        function ClientFunctionExecutionInterruptionError(instantiationCallsiteName, callsite) {
            var _this = _super.call(this, TEST_RUN_ERRORS.clientFunctionExecutionInterruptionError, callsite) || this;
            _this.instantiationCallsiteName = instantiationCallsiteName;
            return _this;
        }
        return ClientFunctionExecutionInterruptionError;
    }(TestRunErrorBase));
    var DomNodeClientFunctionResultError = /** @class */ (function (_super) {
        __extends(DomNodeClientFunctionResultError, _super);
        function DomNodeClientFunctionResultError(instantiationCallsiteName, callsite) {
            var _this = _super.call(this, TEST_RUN_ERRORS.domNodeClientFunctionResultError, callsite) || this;
            _this.instantiationCallsiteName = instantiationCallsiteName;
            return _this;
        }
        return DomNodeClientFunctionResultError;
    }(TestRunErrorBase));
    // Selector errors
    //--------------------------------------------------------------------
    var SelectorErrorBase = /** @class */ (function (_super) {
        __extends(SelectorErrorBase, _super);
        function SelectorErrorBase(code, _a, callsite) {
            var apiFnChain = _a.apiFnChain, apiFnIndex = _a.apiFnIndex;
            var _this = _super.call(this, code, callsite) || this;
            _this.apiFnChain = apiFnChain;
            _this.apiFnIndex = apiFnIndex;
            return _this;
        }
        return SelectorErrorBase;
    }(TestRunErrorBase));
    var InvalidSelectorResultError = /** @class */ (function (_super) {
        __extends(InvalidSelectorResultError, _super);
        function InvalidSelectorResultError(callsite) {
            return _super.call(this, TEST_RUN_ERRORS.invalidSelectorResultError, callsite) || this;
        }
        return InvalidSelectorResultError;
    }(TestRunErrorBase));
    var CannotObtainInfoForElementSpecifiedBySelectorError = /** @class */ (function (_super) {
        __extends(CannotObtainInfoForElementSpecifiedBySelectorError, _super);
        function CannotObtainInfoForElementSpecifiedBySelectorError(callsite, apiFnArgs) {
            return _super.call(this, TEST_RUN_ERRORS.cannotObtainInfoForElementSpecifiedBySelectorError, apiFnArgs, callsite) || this;
        }
        return CannotObtainInfoForElementSpecifiedBySelectorError;
    }(SelectorErrorBase));
    // Uncaught errors
    //--------------------------------------------------------------------
    var UncaughtErrorOnPage = /** @class */ (function (_super) {
        __extends(UncaughtErrorOnPage, _super);
        function UncaughtErrorOnPage(errStack, pageDestUrl) {
            var _this = _super.call(this, TEST_RUN_ERRORS.uncaughtErrorOnPage) || this;
            _this.errStack = errStack;
            _this.pageDestUrl = pageDestUrl;
            return _this;
        }
        return UncaughtErrorOnPage;
    }(TestRunErrorBase));
    var UncaughtErrorInClientFunctionCode = /** @class */ (function (_super) {
        __extends(UncaughtErrorInClientFunctionCode, _super);
        function UncaughtErrorInClientFunctionCode(instantiationCallsiteName, err, callsite) {
            var _this = _super.call(this, TEST_RUN_ERRORS.uncaughtErrorInClientFunctionCode, callsite) || this;
            _this.errMsg = String(err);
            _this.instantiationCallsiteName = instantiationCallsiteName;
            return _this;
        }
        return UncaughtErrorInClientFunctionCode;
    }(TestRunErrorBase));
    var UncaughtErrorInCustomDOMPropertyCode = /** @class */ (function (_super) {
        __extends(UncaughtErrorInCustomDOMPropertyCode, _super);
        function UncaughtErrorInCustomDOMPropertyCode(instantiationCallsiteName, err, prop, callsite) {
            var _this = _super.call(this, TEST_RUN_ERRORS.uncaughtErrorInCustomDOMPropertyCode, callsite) || this;
            _this.errMsg = String(err);
            _this.property = prop;
            _this.instantiationCallsiteName = instantiationCallsiteName;
            return _this;
        }
        return UncaughtErrorInCustomDOMPropertyCode;
    }(TestRunErrorBase));
    var UncaughtErrorInCustomClientScriptCode = /** @class */ (function (_super) {
        __extends(UncaughtErrorInCustomClientScriptCode, _super);
        function UncaughtErrorInCustomClientScriptCode(err) {
            var _this = _super.call(this, TEST_RUN_ERRORS.uncaughtErrorInCustomClientScriptCode) || this;
            _this.errMsg = String(err);
            return _this;
        }
        return UncaughtErrorInCustomClientScriptCode;
    }(TestRunErrorBase));
    var UncaughtErrorInCustomClientScriptLoadedFromModule = /** @class */ (function (_super) {
        __extends(UncaughtErrorInCustomClientScriptLoadedFromModule, _super);
        function UncaughtErrorInCustomClientScriptLoadedFromModule(err, moduleName) {
            var _this = _super.call(this, TEST_RUN_ERRORS.uncaughtErrorInCustomClientScriptCodeLoadedFromModule) || this;
            _this.errMsg = String(err);
            _this.moduleName = moduleName;
            return _this;
        }
        return UncaughtErrorInCustomClientScriptLoadedFromModule;
    }(TestRunErrorBase));
    // Action parameters errors
    //--------------------------------------------------------------------
    // Options errors
    //--------------------------------------------------------------------
    var ActionIntegerOptionError = /** @class */ (function (_super) {
        __extends(ActionIntegerOptionError, _super);
        function ActionIntegerOptionError(optionName, actualValue) {
            return _super.call(this, TEST_RUN_ERRORS.actionIntegerOptionError, optionName, actualValue) || this;
        }
        return ActionIntegerOptionError;
    }(ActionOptionErrorBase));
    var ActionPositiveIntegerOptionError = /** @class */ (function (_super) {
        __extends(ActionPositiveIntegerOptionError, _super);
        function ActionPositiveIntegerOptionError(optionName, actualValue) {
            return _super.call(this, TEST_RUN_ERRORS.actionPositiveIntegerOptionError, optionName, actualValue) || this;
        }
        return ActionPositiveIntegerOptionError;
    }(ActionOptionErrorBase));
    var ActionBooleanOptionError = /** @class */ (function (_super) {
        __extends(ActionBooleanOptionError, _super);
        function ActionBooleanOptionError(optionName, actualValue) {
            return _super.call(this, TEST_RUN_ERRORS.actionBooleanOptionError, optionName, actualValue) || this;
        }
        return ActionBooleanOptionError;
    }(ActionOptionErrorBase));
    var ActionSpeedOptionError = /** @class */ (function (_super) {
        __extends(ActionSpeedOptionError, _super);
        function ActionSpeedOptionError(optionName, actualValue) {
            return _super.call(this, TEST_RUN_ERRORS.actionSpeedOptionError, optionName, actualValue) || this;
        }
        return ActionSpeedOptionError;
    }(ActionOptionErrorBase));
    var ActionStringOptionError = /** @class */ (function (_super) {
        __extends(ActionStringOptionError, _super);
        function ActionStringOptionError(optionName, actualValue) {
            return _super.call(this, TEST_RUN_ERRORS.actionStringOptionError, optionName, actualValue) || this;
        }
        return ActionStringOptionError;
    }(ActionOptionErrorBase));
    var ActionStringOrRegexOptionError = /** @class */ (function (_super) {
        __extends(ActionStringOrRegexOptionError, _super);
        function ActionStringOrRegexOptionError(optionName, actualValue) {
            return _super.call(this, TEST_RUN_ERRORS.actionStringOrRegexOptionError, optionName, actualValue) || this;
        }
        return ActionStringOrRegexOptionError;
    }(ActionOptionErrorBase));
    var ActionDateOptionError = /** @class */ (function (_super) {
        __extends(ActionDateOptionError, _super);
        function ActionDateOptionError(optionName, actualValue) {
            return _super.call(this, TEST_RUN_ERRORS.actionDateOptionError, optionName, actualValue) || this;
        }
        return ActionDateOptionError;
    }(ActionOptionErrorBase));
    var ActionNumberOptionError = /** @class */ (function (_super) {
        __extends(ActionNumberOptionError, _super);
        function ActionNumberOptionError(optionName, actualValue) {
            return _super.call(this, TEST_RUN_ERRORS.actionNumberOptionError, optionName, actualValue) || this;
        }
        return ActionNumberOptionError;
    }(ActionOptionErrorBase));
    var ActionUrlOptionError = /** @class */ (function (_super) {
        __extends(ActionUrlOptionError, _super);
        function ActionUrlOptionError(optionName, actualValue) {
            return _super.call(this, TEST_RUN_ERRORS.actionUrlOptionError, optionName, actualValue) || this;
        }
        return ActionUrlOptionError;
    }(ActionOptionErrorBase));
    var ActionUrlSearchParamsOptionError = /** @class */ (function (_super) {
        __extends(ActionUrlSearchParamsOptionError, _super);
        function ActionUrlSearchParamsOptionError(optionName, actualValue) {
            return _super.call(this, TEST_RUN_ERRORS.actionUrlSearchParamsOptionError, optionName, actualValue) || this;
        }
        return ActionUrlSearchParamsOptionError;
    }(ActionOptionErrorBase));
    var ActionObjectOptionError = /** @class */ (function (_super) {
        __extends(ActionObjectOptionError, _super);
        function ActionObjectOptionError(optionName, actualValue) {
            return _super.call(this, TEST_RUN_ERRORS.actionObjectOptionError, optionName, actualValue) || this;
        }
        return ActionObjectOptionError;
    }(ActionOptionErrorBase));
    var ActionFunctionOptionError = /** @class */ (function (_super) {
        __extends(ActionFunctionOptionError, _super);
        function ActionFunctionOptionError(optionName, actualValue) {
            return _super.call(this, TEST_RUN_ERRORS.actionFunctionOptionError, optionName, actualValue) || this;
        }
        return ActionFunctionOptionError;
    }(ActionOptionErrorBase));
    var ActionInvalidObjectPropertyError = /** @class */ (function (_super) {
        __extends(ActionInvalidObjectPropertyError, _super);
        function ActionInvalidObjectPropertyError(objectName, propertyName, availableProperties) {
            var _this = _super.call(this, TEST_RUN_ERRORS.actionInvalidObjectPropertyError) || this;
            _this.objectName = objectName;
            _this.propertyName = propertyName;
            _this.availableProperties = availableProperties;
            return _this;
        }
        return ActionInvalidObjectPropertyError;
    }(TestRunErrorBase));
    // Action execution errors
    //--------------------------------------------------------------------
    var ActionElementNotFoundError = /** @class */ (function (_super) {
        __extends(ActionElementNotFoundError, _super);
        function ActionElementNotFoundError(callsite, apiFnArgs) {
            return _super.call(this, TEST_RUN_ERRORS.actionElementNotFoundError, apiFnArgs, callsite) || this;
        }
        return ActionElementNotFoundError;
    }(SelectorErrorBase));
    var ActionElementIsInvisibleError = /** @class */ (function (_super) {
        __extends(ActionElementIsInvisibleError, _super);
        function ActionElementIsInvisibleError(callsite) {
            return _super.call(this, TEST_RUN_ERRORS.actionElementIsInvisibleError, callsite) || this;
        }
        return ActionElementIsInvisibleError;
    }(TestRunErrorBase));
    var ActionSelectorMatchesWrongNodeTypeError = /** @class */ (function (_super) {
        __extends(ActionSelectorMatchesWrongNodeTypeError, _super);
        function ActionSelectorMatchesWrongNodeTypeError(nodeDescription) {
            var _this = _super.call(this, TEST_RUN_ERRORS.actionSelectorMatchesWrongNodeTypeError) || this;
            _this.nodeDescription = nodeDescription;
            return _this;
        }
        return ActionSelectorMatchesWrongNodeTypeError;
    }(TestRunErrorBase));
    var ActionAdditionalElementNotFoundError = /** @class */ (function (_super) {
        __extends(ActionAdditionalElementNotFoundError, _super);
        function ActionAdditionalElementNotFoundError(argumentName, apiFnArgs) {
            var _this = _super.call(this, TEST_RUN_ERRORS.actionAdditionalElementNotFoundError, apiFnArgs) || this;
            _this.argumentName = argumentName;
            return _this;
        }
        return ActionAdditionalElementNotFoundError;
    }(SelectorErrorBase));
    var ActionAdditionalElementIsInvisibleError = /** @class */ (function (_super) {
        __extends(ActionAdditionalElementIsInvisibleError, _super);
        function ActionAdditionalElementIsInvisibleError(argumentName) {
            var _this = _super.call(this, TEST_RUN_ERRORS.actionAdditionalElementIsInvisibleError) || this;
            _this.argumentName = argumentName;
            return _this;
        }
        return ActionAdditionalElementIsInvisibleError;
    }(TestRunErrorBase));
    var ActionAdditionalSelectorMatchesWrongNodeTypeError = /** @class */ (function (_super) {
        __extends(ActionAdditionalSelectorMatchesWrongNodeTypeError, _super);
        function ActionAdditionalSelectorMatchesWrongNodeTypeError(argumentName, nodeDescription) {
            var _this = _super.call(this, TEST_RUN_ERRORS.actionAdditionalSelectorMatchesWrongNodeTypeError) || this;
            _this.argumentName = argumentName;
            _this.nodeDescription = nodeDescription;
            return _this;
        }
        return ActionAdditionalSelectorMatchesWrongNodeTypeError;
    }(TestRunErrorBase));
    var ActionElementNonEditableError = /** @class */ (function (_super) {
        __extends(ActionElementNonEditableError, _super);
        function ActionElementNonEditableError() {
            return _super.call(this, TEST_RUN_ERRORS.actionElementNonEditableError) || this;
        }
        return ActionElementNonEditableError;
    }(TestRunErrorBase));
    var ActionElementNotTextAreaError = /** @class */ (function (_super) {
        __extends(ActionElementNotTextAreaError, _super);
        function ActionElementNotTextAreaError() {
            return _super.call(this, TEST_RUN_ERRORS.actionElementNotTextAreaError) || this;
        }
        return ActionElementNotTextAreaError;
    }(TestRunErrorBase));
    var ActionElementNonContentEditableError = /** @class */ (function (_super) {
        __extends(ActionElementNonContentEditableError, _super);
        function ActionElementNonContentEditableError(argumentName) {
            var _this = _super.call(this, TEST_RUN_ERRORS.actionElementNonContentEditableError) || this;
            _this.argumentName = argumentName;
            return _this;
        }
        return ActionElementNonContentEditableError;
    }(TestRunErrorBase));
    var ActionRootContainerNotFoundError = /** @class */ (function (_super) {
        __extends(ActionRootContainerNotFoundError, _super);
        function ActionRootContainerNotFoundError() {
            return _super.call(this, TEST_RUN_ERRORS.actionRootContainerNotFoundError) || this;
        }
        return ActionRootContainerNotFoundError;
    }(TestRunErrorBase));
    var ActionIncorrectKeysError = /** @class */ (function (_super) {
        __extends(ActionIncorrectKeysError, _super);
        function ActionIncorrectKeysError(argumentName) {
            var _this = _super.call(this, TEST_RUN_ERRORS.actionIncorrectKeysError) || this;
            _this.argumentName = argumentName;
            return _this;
        }
        return ActionIncorrectKeysError;
    }(TestRunErrorBase));
    var ActionCannotFindFileToUploadError = /** @class */ (function (_super) {
        __extends(ActionCannotFindFileToUploadError, _super);
        function ActionCannotFindFileToUploadError(filePaths, scannedFilePaths) {
            var _this = _super.call(this, TEST_RUN_ERRORS.actionCannotFindFileToUploadError) || this;
            _this.filePaths = filePaths;
            _this.scannedFilePaths = scannedFilePaths;
            return _this;
        }
        return ActionCannotFindFileToUploadError;
    }(TestRunErrorBase));
    var ActionElementIsNotFileInputError = /** @class */ (function (_super) {
        __extends(ActionElementIsNotFileInputError, _super);
        function ActionElementIsNotFileInputError() {
            return _super.call(this, TEST_RUN_ERRORS.actionElementIsNotFileInputError) || this;
        }
        return ActionElementIsNotFileInputError;
    }(TestRunErrorBase));
    var ActionInvalidScrollTargetError = /** @class */ (function (_super) {
        __extends(ActionInvalidScrollTargetError, _super);
        function ActionInvalidScrollTargetError(scrollTargetXValid, scrollTargetYValid) {
            var _this = _super.call(this, TEST_RUN_ERRORS.actionInvalidScrollTargetError) || this;
            if (!scrollTargetXValid) {
                if (!scrollTargetYValid)
                    _this.properties = 'scrollTargetX and scrollTargetY properties';
                else
                    _this.properties = 'scrollTargetX property';
            }
            else
                _this.properties = 'scrollTargetY property';
            return _this;
        }
        return ActionInvalidScrollTargetError;
    }(TestRunErrorBase));
    var InvalidElementScreenshotDimensionsError = /** @class */ (function (_super) {
        __extends(InvalidElementScreenshotDimensionsError, _super);
        function InvalidElementScreenshotDimensionsError(width, height) {
            var _this = _super.call(this, TEST_RUN_ERRORS.invalidElementScreenshotDimensionsError) || this;
            var widthIsInvalid = width <= 0;
            var heightIsInvalid = height <= 0;
            if (widthIsInvalid) {
                if (heightIsInvalid) {
                    _this.verb = 'are';
                    _this.dimensions = 'width and height';
                }
                else {
                    _this.verb = 'is';
                    _this.dimensions = 'width';
                }
            }
            else {
                _this.verb = 'is';
                _this.dimensions = 'height';
            }
            return _this;
        }
        return InvalidElementScreenshotDimensionsError;
    }(TestRunErrorBase));
    // Iframe errors
    //--------------------------------------------------------------------
    var ActionElementNotIframeError = /** @class */ (function (_super) {
        __extends(ActionElementNotIframeError, _super);
        function ActionElementNotIframeError(callsite) {
            return _super.call(this, TEST_RUN_ERRORS.actionElementNotIframeError, callsite) || this;
        }
        return ActionElementNotIframeError;
    }(TestRunErrorBase));
    var ActionIframeIsNotLoadedError = /** @class */ (function (_super) {
        __extends(ActionIframeIsNotLoadedError, _super);
        function ActionIframeIsNotLoadedError() {
            return _super.call(this, TEST_RUN_ERRORS.actionIframeIsNotLoadedError) || this;
        }
        return ActionIframeIsNotLoadedError;
    }(TestRunErrorBase));
    var CurrentIframeIsNotLoadedError = /** @class */ (function (_super) {
        __extends(CurrentIframeIsNotLoadedError, _super);
        function CurrentIframeIsNotLoadedError() {
            return _super.call(this, TEST_RUN_ERRORS.currentIframeIsNotLoadedError) || this;
        }
        return CurrentIframeIsNotLoadedError;
    }(TestRunErrorBase));
    var ChildWindowNotFoundError = /** @class */ (function (_super) {
        __extends(ChildWindowNotFoundError, _super);
        function ChildWindowNotFoundError() {
            return _super.call(this, TEST_RUN_ERRORS.childWindowNotFoundError) || this;
        }
        return ChildWindowNotFoundError;
    }(TestRunErrorBase));
    var ChildWindowIsNotLoadedError = /** @class */ (function (_super) {
        __extends(ChildWindowIsNotLoadedError, _super);
        function ChildWindowIsNotLoadedError() {
            return _super.call(this, TEST_RUN_ERRORS.childWindowIsNotLoadedError) || this;
        }
        return ChildWindowIsNotLoadedError;
    }(TestRunErrorBase));
    var CannotSwitchToWindowError = /** @class */ (function (_super) {
        __extends(CannotSwitchToWindowError, _super);
        function CannotSwitchToWindowError() {
            return _super.call(this, TEST_RUN_ERRORS.cannotSwitchToWindowError) || this;
        }
        return CannotSwitchToWindowError;
    }(TestRunErrorBase));
    var CloseChildWindowError = /** @class */ (function (_super) {
        __extends(CloseChildWindowError, _super);
        function CloseChildWindowError() {
            return _super.call(this, TEST_RUN_ERRORS.closeChildWindowError) || this;
        }
        return CloseChildWindowError;
    }(TestRunErrorBase));
    var CannotCloseWindowWithChildrenError = /** @class */ (function (_super) {
        __extends(CannotCloseWindowWithChildrenError, _super);
        function CannotCloseWindowWithChildrenError() {
            return _super.call(this, TEST_RUN_ERRORS.cannotCloseWindowWithChildrenError) || this;
        }
        return CannotCloseWindowWithChildrenError;
    }(TestRunErrorBase));
    var CannotCloseWindowWithoutParentError = /** @class */ (function (_super) {
        __extends(CannotCloseWindowWithoutParentError, _super);
        function CannotCloseWindowWithoutParentError() {
            return _super.call(this, TEST_RUN_ERRORS.cannotCloseWindowWithoutParent) || this;
        }
        return CannotCloseWindowWithoutParentError;
    }(TestRunErrorBase));
    var SwitchToWindowPredicateError = /** @class */ (function (_super) {
        __extends(SwitchToWindowPredicateError, _super);
        function SwitchToWindowPredicateError(errMsg) {
            var _this = _super.call(this, TEST_RUN_ERRORS.switchToWindowPredicateError) || this;
            _this.errMsg = errMsg;
            return _this;
        }
        return SwitchToWindowPredicateError;
    }(TestRunErrorBase));
    var WindowNotFoundError = /** @class */ (function (_super) {
        __extends(WindowNotFoundError, _super);
        function WindowNotFoundError() {
            return _super.call(this, TEST_RUN_ERRORS.targetWindowNotFoundError) || this;
        }
        return WindowNotFoundError;
    }(TestRunErrorBase));
    var ParentWindowNotFoundError = /** @class */ (function (_super) {
        __extends(ParentWindowNotFoundError, _super);
        function ParentWindowNotFoundError() {
            return _super.call(this, TEST_RUN_ERRORS.parentWindowNotFoundError) || this;
        }
        return ParentWindowNotFoundError;
    }(TestRunErrorBase));
    var PreviousWindowNotFoundError = /** @class */ (function (_super) {
        __extends(PreviousWindowNotFoundError, _super);
        function PreviousWindowNotFoundError() {
            return _super.call(this, TEST_RUN_ERRORS.previousWindowNotFoundError) || this;
        }
        return PreviousWindowNotFoundError;
    }(TestRunErrorBase));
    var ChildWindowClosedBeforeSwitchingError = /** @class */ (function (_super) {
        __extends(ChildWindowClosedBeforeSwitchingError, _super);
        function ChildWindowClosedBeforeSwitchingError() {
            return _super.call(this, TEST_RUN_ERRORS.childWindowClosedBeforeSwitchingError) || this;
        }
        return ChildWindowClosedBeforeSwitchingError;
    }(TestRunErrorBase));
    var CannotRestoreChildWindowError = /** @class */ (function (_super) {
        __extends(CannotRestoreChildWindowError, _super);
        function CannotRestoreChildWindowError() {
            return _super.call(this, TEST_RUN_ERRORS.cannotRestoreChildWindowError) || this;
        }
        return CannotRestoreChildWindowError;
    }(TestRunErrorBase));
    var CurrentIframeNotFoundError = /** @class */ (function (_super) {
        __extends(CurrentIframeNotFoundError, _super);
        function CurrentIframeNotFoundError() {
            return _super.call(this, TEST_RUN_ERRORS.currentIframeNotFoundError) || this;
        }
        return CurrentIframeNotFoundError;
    }(TestRunErrorBase));
    var CurrentIframeIsInvisibleError = /** @class */ (function (_super) {
        __extends(CurrentIframeIsInvisibleError, _super);
        function CurrentIframeIsInvisibleError() {
            return _super.call(this, TEST_RUN_ERRORS.currentIframeIsInvisibleError) || this;
        }
        return CurrentIframeIsInvisibleError;
    }(TestRunErrorBase));
    // Native dialog errors
    //--------------------------------------------------------------------
    var NativeDialogNotHandledError = /** @class */ (function (_super) {
        __extends(NativeDialogNotHandledError, _super);
        function NativeDialogNotHandledError(dialogType, url) {
            var _this = _super.call(this, TEST_RUN_ERRORS.nativeDialogNotHandledError) || this;
            _this.dialogType = dialogType;
            _this.pageUrl = url;
            return _this;
        }
        return NativeDialogNotHandledError;
    }(TestRunErrorBase));
    var UncaughtErrorInNativeDialogHandler = /** @class */ (function (_super) {
        __extends(UncaughtErrorInNativeDialogHandler, _super);
        function UncaughtErrorInNativeDialogHandler(dialogType, errMsg, url) {
            var _this = _super.call(this, TEST_RUN_ERRORS.uncaughtErrorInNativeDialogHandler) || this;
            _this.dialogType = dialogType;
            _this.errMsg = errMsg;
            _this.pageUrl = url;
            return _this;
        }
        return UncaughtErrorInNativeDialogHandler;
    }(TestRunErrorBase));

    var Errors = /*#__PURE__*/Object.freeze({
        __proto__: null,
        TestRunErrorBase: TestRunErrorBase,
        ClientFunctionExecutionInterruptionError: ClientFunctionExecutionInterruptionError,
        DomNodeClientFunctionResultError: DomNodeClientFunctionResultError,
        SelectorErrorBase: SelectorErrorBase,
        InvalidSelectorResultError: InvalidSelectorResultError,
        CannotObtainInfoForElementSpecifiedBySelectorError: CannotObtainInfoForElementSpecifiedBySelectorError,
        UncaughtErrorOnPage: UncaughtErrorOnPage,
        UncaughtErrorInClientFunctionCode: UncaughtErrorInClientFunctionCode,
        UncaughtErrorInCustomDOMPropertyCode: UncaughtErrorInCustomDOMPropertyCode,
        UncaughtErrorInCustomClientScriptCode: UncaughtErrorInCustomClientScriptCode,
        UncaughtErrorInCustomClientScriptLoadedFromModule: UncaughtErrorInCustomClientScriptLoadedFromModule,
        ActionIntegerOptionError: ActionIntegerOptionError,
        ActionPositiveIntegerOptionError: ActionPositiveIntegerOptionError,
        ActionBooleanOptionError: ActionBooleanOptionError,
        ActionSpeedOptionError: ActionSpeedOptionError,
        ActionStringOptionError: ActionStringOptionError,
        ActionStringOrRegexOptionError: ActionStringOrRegexOptionError,
        ActionDateOptionError: ActionDateOptionError,
        ActionNumberOptionError: ActionNumberOptionError,
        ActionUrlOptionError: ActionUrlOptionError,
        ActionUrlSearchParamsOptionError: ActionUrlSearchParamsOptionError,
        ActionObjectOptionError: ActionObjectOptionError,
        ActionFunctionOptionError: ActionFunctionOptionError,
        ActionInvalidObjectPropertyError: ActionInvalidObjectPropertyError,
        ActionElementNotFoundError: ActionElementNotFoundError,
        ActionElementIsInvisibleError: ActionElementIsInvisibleError,
        ActionSelectorMatchesWrongNodeTypeError: ActionSelectorMatchesWrongNodeTypeError,
        ActionAdditionalElementNotFoundError: ActionAdditionalElementNotFoundError,
        ActionAdditionalElementIsInvisibleError: ActionAdditionalElementIsInvisibleError,
        ActionAdditionalSelectorMatchesWrongNodeTypeError: ActionAdditionalSelectorMatchesWrongNodeTypeError,
        ActionElementNonEditableError: ActionElementNonEditableError,
        ActionElementNotTextAreaError: ActionElementNotTextAreaError,
        ActionElementNonContentEditableError: ActionElementNonContentEditableError,
        ActionRootContainerNotFoundError: ActionRootContainerNotFoundError,
        ActionIncorrectKeysError: ActionIncorrectKeysError,
        ActionCannotFindFileToUploadError: ActionCannotFindFileToUploadError,
        ActionElementIsNotFileInputError: ActionElementIsNotFileInputError,
        ActionInvalidScrollTargetError: ActionInvalidScrollTargetError,
        InvalidElementScreenshotDimensionsError: InvalidElementScreenshotDimensionsError,
        ActionElementNotIframeError: ActionElementNotIframeError,
        ActionIframeIsNotLoadedError: ActionIframeIsNotLoadedError,
        CurrentIframeIsNotLoadedError: CurrentIframeIsNotLoadedError,
        ChildWindowNotFoundError: ChildWindowNotFoundError,
        ChildWindowIsNotLoadedError: ChildWindowIsNotLoadedError,
        CannotSwitchToWindowError: CannotSwitchToWindowError,
        CloseChildWindowError: CloseChildWindowError,
        CannotCloseWindowWithChildrenError: CannotCloseWindowWithChildrenError,
        CannotCloseWindowWithoutParentError: CannotCloseWindowWithoutParentError,
        SwitchToWindowPredicateError: SwitchToWindowPredicateError,
        WindowNotFoundError: WindowNotFoundError,
        ParentWindowNotFoundError: ParentWindowNotFoundError,
        PreviousWindowNotFoundError: PreviousWindowNotFoundError,
        ChildWindowClosedBeforeSwitchingError: ChildWindowClosedBeforeSwitchingError,
        CannotRestoreChildWindowError: CannotRestoreChildWindowError,
        CurrentIframeNotFoundError: CurrentIframeNotFoundError,
        CurrentIframeIsInvisibleError: CurrentIframeIsInvisibleError,
        NativeDialogNotHandledError: NativeDialogNotHandledError,
        UncaughtErrorInNativeDialogHandler: UncaughtErrorInNativeDialogHandler
    });

    // -------------------------------------------------------------
    // WARNING: this file is used by both the client and the server.
    // Do not use any browser or node-specific API!
    // -------------------------------------------------------------
    var NATIVE_METHODS_PROPERTY_NAME = '_nativeMethods';
    var BrowserConsoleMessages = /** @class */ (function () {
        function BrowserConsoleMessages(data, nativeMethods) {
            var resultNativeMethods = this._ensureNativeMethods(nativeMethods);
            resultNativeMethods.objectDefineProperty(this, NATIVE_METHODS_PROPERTY_NAME, { value: resultNativeMethods });
            this.concat(data);
        }
        BrowserConsoleMessages.prototype._ensureNativeMethods = function (nativeMethods) {
            return nativeMethods || {
                objectKeys: Object.keys,
                arrayForEach: Array.prototype.forEach,
                arrayConcat: Array.prototype.concat,
                arraySlice: Array.prototype.slice,
                objectDefineProperty: Object.defineProperty,
            };
        };
        BrowserConsoleMessages.prototype._getWindowIds = function (consoleMessages) {
            return this[NATIVE_METHODS_PROPERTY_NAME].objectKeys(consoleMessages);
        };
        BrowserConsoleMessages.prototype._copyArray = function (array) {
            return this[NATIVE_METHODS_PROPERTY_NAME].arraySlice.call(array);
        };
        BrowserConsoleMessages.prototype._concatArrays = function (array, anotherArray) {
            return this[NATIVE_METHODS_PROPERTY_NAME].arrayConcat.call(array, anotherArray);
        };
        BrowserConsoleMessages.prototype.ensureMessageContainer = function (windowId) {
            if (this[windowId])
                return;
            this[windowId] = {
                log: [],
                info: [],
                warn: [],
                error: [],
            };
        };
        BrowserConsoleMessages.prototype.concat = function (consoleMessages) {
            var _this = this;
            if (!consoleMessages)
                return this;
            var windowIds = this._getWindowIds(consoleMessages);
            this[NATIVE_METHODS_PROPERTY_NAME].arrayForEach.call(windowIds, function (windowId) {
                _this.ensureMessageContainer(windowId);
                _this[windowId].log = _this._concatArrays(_this[windowId].log, consoleMessages[windowId].log);
                _this[windowId].info = _this._concatArrays(_this[windowId].info, consoleMessages[windowId].info);
                _this[windowId].warn = _this._concatArrays(_this[windowId].warn, consoleMessages[windowId].warn);
                _this[windowId].error = _this._concatArrays(_this[windowId].error, consoleMessages[windowId].error);
            });
            return this;
        };
        BrowserConsoleMessages.prototype.addMessage = function (type, msg, windowId) {
            this.ensureMessageContainer(windowId);
            this[windowId][type].push(msg);
        };
        BrowserConsoleMessages.prototype.getCopy = function () {
            var _this = this;
            var copy = {};
            var windowIds = this._getWindowIds(this);
            this[NATIVE_METHODS_PROPERTY_NAME].arrayForEach.call(windowIds, function (windowId) {
                copy[windowId] = {
                    log: _this._copyArray(_this[windowId].log),
                    info: _this._copyArray(_this[windowId].info),
                    warn: _this._copyArray(_this[windowId].warn),
                    error: _this._copyArray(_this[windowId].error),
                };
            });
            return copy;
        };
        return BrowserConsoleMessages;
    }());

    var ClientBrowserConsoleMessages = /** @class */ (function (_super) {
        __extends(ClientBrowserConsoleMessages, _super);
        function ClientBrowserConsoleMessages(data) {
            return _super.call(this, data, hammerhead.nativeMethods) || this;
        }
        return ClientBrowserConsoleMessages;
    }(BrowserConsoleMessages));

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var replicator = createCommonjsModule(function (module) {
        // Const
        var TRANSFORMED_TYPE_KEY = '@t';
        var CIRCULAR_REF_KEY = '@r';
        var KEY_REQUIRE_ESCAPING_RE = /^#*@(t|r)$/;
        var GLOBAL = (function getGlobal() {
            // NOTE: see http://www.ecma-international.org/ecma-262/6.0/index.html#sec-performeval step 10
            var savedEval = eval;
            return savedEval('this');
        })();
        var TYPED_ARRAY_CTORS = {
            'Int8Array': typeof Int8Array === 'function' ? Int8Array : void 0,
            'Uint8Array': typeof Uint8Array === 'function' ? Uint8Array : void 0,
            'Uint8ClampedArray': typeof Uint8ClampedArray === 'function' ? Uint8ClampedArray : void 0,
            'Int16Array': typeof Int16Array === 'function' ? Int16Array : void 0,
            'Uint16Array': typeof Uint16Array === 'function' ? Uint16Array : void 0,
            'Int32Array': typeof Int32Array === 'function' ? Int32Array : void 0,
            'Uint32Array': typeof Uint32Array === 'function' ? Uint32Array : void 0,
            'Float32Array': typeof Float32Array === 'function' ? Float32Array : void 0,
            'Float64Array': typeof Float64Array === 'function' ? Float64Array : void 0
        };
        var ARRAY_BUFFER_SUPPORTED = typeof ArrayBuffer === 'function';
        var MAP_SUPPORTED = typeof Map === 'function';
        var SET_SUPPORTED = typeof Set === 'function';
        var BUFFER_FROM_SUPPORTED = typeof Buffer === 'function';
        var TYPED_ARRAY_SUPPORTED = function (typeName) {
            return !!TYPED_ARRAY_CTORS[typeName];
        };
        // Saved proto functions
        var arrSlice = Array.prototype.slice;
        // Default serializer
        var JSONSerializer = {
            serialize: function (val) {
                return JSON.stringify(val);
            },
            deserialize: function (val) {
                return JSON.parse(val);
            }
        };
        // EncodingTransformer
        var EncodingTransformer = function (val, transforms) {
            this.references = val;
            this.transforms = transforms;
            this.circularCandidates = [];
            this.circularCandidatesDescrs = [];
            this.circularRefCount = 0;
        };
        EncodingTransformer._createRefMark = function (idx) {
            var obj = Object.create(null);
            obj[CIRCULAR_REF_KEY] = idx;
            return obj;
        };
        EncodingTransformer.prototype._createCircularCandidate = function (val, parent, key) {
            this.circularCandidates.push(val);
            this.circularCandidatesDescrs.push({ parent: parent, key: key, refIdx: -1 });
        };
        EncodingTransformer.prototype._applyTransform = function (val, parent, key, transform) {
            var result = Object.create(null);
            var serializableVal = transform.toSerializable(val);
            if (typeof serializableVal === 'object')
                this._createCircularCandidate(val, parent, key);
            result[TRANSFORMED_TYPE_KEY] = transform.type;
            result.data = this._handleValue(serializableVal, parent, key);
            return result;
        };
        EncodingTransformer.prototype._handleArray = function (arr) {
            var result = [];
            for (var i = 0; i < arr.length; i++)
                result[i] = this._handleValue(arr[i], result, i);
            return result;
        };
        EncodingTransformer.prototype._handlePlainObject = function (obj) {
            var replicator = this;
            var result = Object.create(null);
            var ownPropertyNames = Object.getOwnPropertyNames(obj);
            ownPropertyNames.forEach(function (key) {
                var resultKey = KEY_REQUIRE_ESCAPING_RE.test(key) ? '#' + key : key;
                result[resultKey] = replicator._handleValue(obj[key], result, resultKey);
            });
            return result;
        };
        EncodingTransformer.prototype._handleObject = function (obj, parent, key) {
            this._createCircularCandidate(obj, parent, key);
            return Array.isArray(obj) ? this._handleArray(obj) : this._handlePlainObject(obj);
        };
        EncodingTransformer.prototype._ensureCircularReference = function (obj) {
            var circularCandidateIdx = this.circularCandidates.indexOf(obj);
            if (circularCandidateIdx > -1) {
                var descr = this.circularCandidatesDescrs[circularCandidateIdx];
                if (descr.refIdx === -1)
                    descr.refIdx = descr.parent ? ++this.circularRefCount : 0;
                return EncodingTransformer._createRefMark(descr.refIdx);
            }
            return null;
        };
        EncodingTransformer.prototype._handleValue = function (val, parent, key) {
            var type = typeof val;
            var isObject = type === 'object' && val !== null;
            if (isObject) {
                var refMark = this._ensureCircularReference(val);
                if (refMark)
                    return refMark;
            }
            for (var i = 0; i < this.transforms.length; i++) {
                var transform = this.transforms[i];
                if (transform.shouldTransform(type, val))
                    return this._applyTransform(val, parent, key, transform);
            }
            if (isObject)
                return this._handleObject(val, parent, key);
            return val;
        };
        EncodingTransformer.prototype.transform = function () {
            var references = [this._handleValue(this.references, null, null)];
            for (var i = 0; i < this.circularCandidatesDescrs.length; i++) {
                var descr = this.circularCandidatesDescrs[i];
                if (descr.refIdx > 0) {
                    references[descr.refIdx] = descr.parent[descr.key];
                    descr.parent[descr.key] = EncodingTransformer._createRefMark(descr.refIdx);
                }
            }
            return references;
        };
        // DecodingTransform
        var DecodingTransformer = function (references, transformsMap) {
            this.references = references;
            this.transformMap = transformsMap;
            this.activeTransformsStack = [];
            this.visitedRefs = Object.create(null);
        };
        DecodingTransformer.prototype._handlePlainObject = function (obj) {
            var replicator = this;
            var unescaped = Object.create(null);
            var ownPropertyNames = Object.getOwnPropertyNames(obj);
            ownPropertyNames.forEach(function (key) {
                replicator._handleValue(obj[key], obj, key);
                if (KEY_REQUIRE_ESCAPING_RE.test(key)) {
                    // NOTE: use intermediate object to avoid unescaped and escaped keys interference
                    // E.g. unescaped "##@t" will be "#@t" which can overwrite escaped "#@t".
                    unescaped[key.substring(1)] = obj[key];
                    delete obj[key];
                }
            });
            for (var unsecapedKey in unescaped)
                obj[unsecapedKey] = unescaped[unsecapedKey];
        };
        DecodingTransformer.prototype._handleTransformedObject = function (obj, parent, key) {
            var transformType = obj[TRANSFORMED_TYPE_KEY];
            var transform = this.transformMap[transformType];
            if (!transform)
                throw new Error('Can\'t find transform for "' + transformType + '" type.');
            this.activeTransformsStack.push(obj);
            this._handleValue(obj.data, obj, 'data');
            this.activeTransformsStack.pop();
            parent[key] = transform.fromSerializable(obj.data);
        };
        DecodingTransformer.prototype._handleCircularSelfRefDuringTransform = function (refIdx, parent, key) {
            // NOTE: we've hit a hard case: object reference itself during transformation.
            // We can't dereference it since we don't have resulting object yet. And we'll
            // not be able to restore reference lately because we will need to traverse
            // transformed object again and reference might be unreachable or new object contain
            // new circular references. As a workaround we create getter, so once transformation
            // complete, dereferenced property will point to correct transformed object.
            var references = this.references;
            var val = void 0;
            Object.defineProperty(parent, key, {
                configurable: true,
                enumerable: true,
                get: function () {
                    if (val === void 0)
                        val = references[refIdx];
                    return val;
                },
                set: function (value) {
                    val = value;
                    return val;
                }
            });
        };
        DecodingTransformer.prototype._handleCircularRef = function (refIdx, parent, key) {
            if (this.activeTransformsStack.indexOf(this.references[refIdx]) > -1)
                this._handleCircularSelfRefDuringTransform(refIdx, parent, key);
            else {
                if (!this.visitedRefs[refIdx]) {
                    this.visitedRefs[refIdx] = true;
                    this._handleValue(this.references[refIdx], this.references, refIdx);
                }
                parent[key] = this.references[refIdx];
            }
        };
        DecodingTransformer.prototype._handleValue = function (val, parent, key) {
            if (typeof val !== 'object' || val === null)
                return;
            var refIdx = val[CIRCULAR_REF_KEY];
            if (refIdx !== void 0)
                this._handleCircularRef(refIdx, parent, key);
            else if (val[TRANSFORMED_TYPE_KEY])
                this._handleTransformedObject(val, parent, key);
            else if (Array.isArray(val)) {
                for (var i = 0; i < val.length; i++)
                    this._handleValue(val[i], val, i);
            }
            else
                this._handlePlainObject(val);
        };
        DecodingTransformer.prototype.transform = function () {
            this.visitedRefs[0] = true;
            this._handleValue(this.references[0], this.references, 0);
            return this.references[0];
        };
        // Transforms
        var builtInTransforms = [
            {
                type: '[[NaN]]',
                shouldTransform: function (type, val) {
                    return type === 'number' && isNaN(val);
                },
                toSerializable: function () {
                    return '';
                },
                fromSerializable: function () {
                    return NaN;
                }
            },
            {
                type: '[[undefined]]',
                shouldTransform: function (type) {
                    return type === 'undefined';
                },
                toSerializable: function () {
                    return '';
                },
                fromSerializable: function () {
                    return void 0;
                }
            },
            {
                type: '[[Date]]',
                shouldTransform: function (type, val) {
                    return val instanceof Date;
                },
                toSerializable: function (date) {
                    return date.getTime();
                },
                fromSerializable: function (val) {
                    var date = new Date();
                    date.setTime(val);
                    return date;
                }
            },
            {
                type: '[[RegExp]]',
                shouldTransform: function (type, val) {
                    return val instanceof RegExp;
                },
                toSerializable: function (re) {
                    var result = {
                        src: re.source,
                        flags: ''
                    };
                    if (re.global)
                        result.flags += 'g';
                    if (re.ignoreCase)
                        result.flags += 'i';
                    if (re.multiline)
                        result.flags += 'm';
                    return result;
                },
                fromSerializable: function (val) {
                    return new RegExp(val.src, val.flags);
                }
            },
            {
                type: '[[Error]]',
                shouldTransform: function (type, val) {
                    return val instanceof Error;
                },
                toSerializable: function (err) {
                    return {
                        name: err.name,
                        message: err.message,
                        stack: err.stack
                    };
                },
                fromSerializable: function (val) {
                    var Ctor = GLOBAL[val.name] || Error;
                    var err = new Ctor(val.message);
                    err.stack = val.stack;
                    return err;
                }
            },
            {
                type: '[[ArrayBuffer]]',
                shouldTransform: function (type, val) {
                    return ARRAY_BUFFER_SUPPORTED && val instanceof ArrayBuffer;
                },
                toSerializable: function (buffer) {
                    var view = new Int8Array(buffer);
                    return arrSlice.call(view);
                },
                fromSerializable: function (val) {
                    if (ARRAY_BUFFER_SUPPORTED) {
                        var buffer = new ArrayBuffer(val.length);
                        var view = new Int8Array(buffer);
                        view.set(val);
                        return buffer;
                    }
                    return val;
                }
            },
            {
                type: '[[Buffer]]',
                shouldTransform: function (type, val) {
                    return BUFFER_FROM_SUPPORTED && val instanceof Buffer;
                },
                toSerializable: function (buffer) {
                    return arrSlice.call(buffer);
                },
                fromSerializable: function (val) {
                    if (BUFFER_FROM_SUPPORTED)
                        return Buffer.from(val);
                    return val;
                }
            },
            {
                type: '[[TypedArray]]',
                shouldTransform: function (type, val) {
                    return Object.keys(TYPED_ARRAY_CTORS).some(function (ctorName) {
                        return TYPED_ARRAY_SUPPORTED(ctorName) && val instanceof TYPED_ARRAY_CTORS[ctorName];
                    });
                },
                toSerializable: function (arr) {
                    return {
                        ctorName: arr.constructor.name,
                        arr: arrSlice.call(arr)
                    };
                },
                fromSerializable: function (val) {
                    return TYPED_ARRAY_SUPPORTED(val.ctorName) ? new TYPED_ARRAY_CTORS[val.ctorName](val.arr) : val.arr;
                }
            },
            {
                type: '[[Map]]',
                shouldTransform: function (type, val) {
                    return MAP_SUPPORTED && val instanceof Map;
                },
                toSerializable: function (map) {
                    var flattenedKVArr = [];
                    map.forEach(function (val, key) {
                        flattenedKVArr.push(key);
                        flattenedKVArr.push(val);
                    });
                    return flattenedKVArr;
                },
                fromSerializable: function (val) {
                    if (MAP_SUPPORTED) {
                        // NOTE: new Map(iterable) is not supported by all browsers
                        var map = new Map();
                        for (var i = 0; i < val.length; i += 2)
                            map.set(val[i], val[i + 1]);
                        return map;
                    }
                    var kvArr = [];
                    for (var j = 0; j < val.length; j += 2)
                        kvArr.push([val[i], val[i + 1]]);
                    return kvArr;
                }
            },
            {
                type: '[[Set]]',
                shouldTransform: function (type, val) {
                    return SET_SUPPORTED && val instanceof Set;
                },
                toSerializable: function (set) {
                    var arr = [];
                    set.forEach(function (val) {
                        arr.push(val);
                    });
                    return arr;
                },
                fromSerializable: function (val) {
                    if (SET_SUPPORTED) {
                        // NOTE: new Set(iterable) is not supported by all browsers
                        var set = new Set();
                        for (var i = 0; i < val.length; i++)
                            set.add(val[i]);
                        return set;
                    }
                    return val;
                }
            }
        ];
        // Replicator
        var Replicator = module.exports = function (serializer) {
            this.transforms = [];
            this.transformsMap = Object.create(null);
            this.serializer = serializer || JSONSerializer;
            this.addTransforms(builtInTransforms);
        };
        // Manage transforms
        Replicator.prototype.addTransforms = function (transforms) {
            transforms = Array.isArray(transforms) ? transforms : [transforms];
            for (var i = 0; i < transforms.length; i++) {
                var transform = transforms[i];
                if (this.transformsMap[transform.type])
                    throw new Error('Transform with type "' + transform.type + '" was already added.');
                this.transforms.push(transform);
                this.transformsMap[transform.type] = transform;
            }
            return this;
        };
        Replicator.prototype.removeTransforms = function (transforms) {
            transforms = Array.isArray(transforms) ? transforms : [transforms];
            for (var i = 0; i < transforms.length; i++) {
                var transform = transforms[i];
                var idx = this.transforms.indexOf(transform);
                if (idx > -1)
                    this.transforms.splice(idx, 1);
                delete this.transformsMap[transform.type];
            }
            return this;
        };
        Replicator.prototype.encode = function (val) {
            var transformer = new EncodingTransformer(val, this.transforms);
            var references = transformer.transform();
            return this.serializer.serialize(references);
        };
        Replicator.prototype.decode = function (val) {
            var references = this.serializer.deserialize(val);
            var transformer = new DecodingTransformer(references, this.transformsMap);
            return transformer.transform();
        };
    });

    var identity = function (val) { return val; };
    function createReplicator(transforms) {
        // NOTE: we will serialize replicator results
        // to JSON with a command or command result.
        // Therefore there is no need to do additional job here,
        // so we use identity functions for serialization.
        var replicator$1 = new replicator({
            serialize: identity,
            deserialize: identity,
        });
        return replicator$1.addTransforms(transforms);
    }

    var BoundaryValues = /** @class */ (function () {
        function BoundaryValues(top, right, bottom, left) {
            if (top === void 0) { top = 0; }
            if (right === void 0) { right = 0; }
            if (bottom === void 0) { bottom = 0; }
            if (left === void 0) { left = 0; }
            this.top = top;
            this.right = right;
            this.bottom = bottom;
            this.left = left;
        }
        BoundaryValues.create = function (v) {
            return new BoundaryValues(v.top, v.right, v.bottom, v.left);
        };
        BoundaryValues.prototype.add = function (d) {
            this.top += d.top;
            this.right += d.right;
            this.bottom += d.bottom;
            this.left += d.left;
            return this;
        };
        BoundaryValues.prototype.sub = function (d) {
            if ('top' in d) {
                this.top -= d.top;
                this.left -= d.left;
            }
            this.bottom -= d.bottom;
            this.right -= d.right;
            return this;
        };
        BoundaryValues.prototype.round = function (leftTopRound, rightBottomRound) {
            if (leftTopRound === void 0) { leftTopRound = Math.round; }
            if (rightBottomRound === void 0) { rightBottomRound = leftTopRound; }
            this.top = leftTopRound(this.top);
            this.right = rightBottomRound(this.right);
            this.bottom = rightBottomRound(this.bottom);
            this.left = leftTopRound(this.left);
            return this;
        };
        BoundaryValues.prototype.contains = function (point) {
            return point.x >= this.left && point.x <= this.right && point.y >= this.top && point.y <= this.bottom;
        };
        return BoundaryValues;
    }());

    var ARRAY_METHODS_PREFIX = 'array';
    function createNativeMethodWrapper(methodName) {
        var nativeMethodName = ARRAY_METHODS_PREFIX + methodName.charAt(0).toUpperCase() + methodName.slice(1);
        var nativeMethod = hammerhead.nativeMethods[nativeMethodName];
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return nativeMethod.call.apply(nativeMethod, args);
        };
    }
    var filter = createNativeMethodWrapper('filter');
    var map = createNativeMethodWrapper('map');
    var slice = createNativeMethodWrapper('slice');
    var splice = createNativeMethodWrapper('splice');
    var unshift = createNativeMethodWrapper('unshift');
    var forEach = createNativeMethodWrapper('forEach');
    var indexOf = createNativeMethodWrapper('indexOf');
    var some = createNativeMethodWrapper('some');
    var reverse = createNativeMethodWrapper('reverse');
    var reduce = createNativeMethodWrapper('reduce');
    var concat = createNativeMethodWrapper('concat');
    var join = createNativeMethodWrapper('join');

    var browserUtils = hammerhead__default.utils.browser;
    var nativeMethods = hammerhead__default.nativeMethods;
    // NOTE: We have to retrieve styleUtils.get from hammerhead
    // to avoid circular dependencies between domUtils and styleUtils
    var getElementStyleProperty = hammerhead__default.utils.style.get;
    var getActiveElement = hammerhead__default.utils.dom.getActiveElement;
    var findDocument = hammerhead__default.utils.dom.findDocument;
    var find = hammerhead__default.utils.dom.find;
    var isElementInDocument = hammerhead__default.utils.dom.isElementInDocument;
    var isElementInIframe = hammerhead__default.utils.dom.isElementInIframe;
    var getIframeByElement = hammerhead__default.utils.dom.getIframeByElement;
    var isCrossDomainWindows = hammerhead__default.utils.dom.isCrossDomainWindows;
    var getSelectParent = hammerhead__default.utils.dom.getSelectParent;
    var getChildVisibleIndex = hammerhead__default.utils.dom.getChildVisibleIndex;
    var getSelectVisibleChildren = hammerhead__default.utils.dom.getSelectVisibleChildren;
    var isElementNode = hammerhead__default.utils.dom.isElementNode;
    var isTextNode = hammerhead__default.utils.dom.isTextNode;
    var isRenderedNode = hammerhead__default.utils.dom.isRenderedNode;
    var isIframeElement = hammerhead__default.utils.dom.isIframeElement;
    var isInputElement = hammerhead__default.utils.dom.isInputElement;
    var isButtonElement = hammerhead__default.utils.dom.isButtonElement;
    var isFileInput = hammerhead__default.utils.dom.isFileInput;
    var isTextAreaElement = hammerhead__default.utils.dom.isTextAreaElement;
    var isAnchorElement = hammerhead__default.utils.dom.isAnchorElement;
    var isImgElement = hammerhead__default.utils.dom.isImgElement;
    var isFormElement = hammerhead__default.utils.dom.isFormElement;
    var isLabelElement = hammerhead__default.utils.dom.isLabelElement;
    var isSelectElement = hammerhead__default.utils.dom.isSelectElement;
    var isRadioButtonElement = hammerhead__default.utils.dom.isRadioButtonElement;
    var isColorInputElement = hammerhead__default.utils.dom.isColorInputElement;
    var isCheckboxElement = hammerhead__default.utils.dom.isCheckboxElement;
    var isOptionElement = hammerhead__default.utils.dom.isOptionElement;
    var isSVGElement = hammerhead__default.utils.dom.isSVGElement;
    var isMapElement = hammerhead__default.utils.dom.isMapElement;
    var isBodyElement = hammerhead__default.utils.dom.isBodyElement;
    var isHtmlElement = hammerhead__default.utils.dom.isHtmlElement;
    var isDocument = hammerhead__default.utils.dom.isDocument;
    var isWindow = hammerhead__default.utils.dom.isWindow;
    var isTextEditableInput = hammerhead__default.utils.dom.isTextEditableInput;
    var isTextEditableElement = hammerhead__default.utils.dom.isTextEditableElement;
    var isTextEditableElementAndEditingAllowed = hammerhead__default.utils.dom.isTextEditableElementAndEditingAllowed;
    var isContentEditableElement = hammerhead__default.utils.dom.isContentEditableElement;
    var isDomElement = hammerhead__default.utils.dom.isDomElement;
    var isShadowUIElement = hammerhead__default.utils.dom.isShadowUIElement;
    var isShadowRoot = hammerhead__default.utils.dom.isShadowRoot;
    var isElementFocusable = hammerhead__default.utils.dom.isElementFocusable;
    var isHammerheadAttr = hammerhead__default.utils.dom.isHammerheadAttr;
    var isElementReadOnly = hammerhead__default.utils.dom.isElementReadOnly;
    var getScrollbarSize = hammerhead__default.utils.dom.getScrollbarSize;
    var getMapContainer = hammerhead__default.utils.dom.getMapContainer;
    var getTagName = hammerhead__default.utils.dom.getTagName;
    var closest = hammerhead__default.utils.dom.closest;
    var getParents = hammerhead__default.utils.dom.getParents;
    var findParent = hammerhead__default.utils.dom.findParent;
    var getTopSameDomainWindow = hammerhead__default.utils.dom.getTopSameDomainWindow;
    var getParentExceptShadowRoot = hammerhead__default.utils.dom.getParentExceptShadowRoot;

    var styleUtils = hammerhead__default.utils.style;
    var getBordersWidth = hammerhead__default.utils.style.getBordersWidth;
    var getComputedStyle = hammerhead__default.utils.style.getComputedStyle;
    var getElementMargin = hammerhead__default.utils.style.getElementMargin;
    var getElementPadding = hammerhead__default.utils.style.getElementPadding;
    var getElementScroll = hammerhead__default.utils.style.getElementScroll;
    var getOptionHeight = hammerhead__default.utils.style.getOptionHeight;
    var getSelectElementSize = hammerhead__default.utils.style.getSelectElementSize;
    var isElementVisible = hammerhead__default.utils.style.isElementVisible;
    var isSelectVisibleChild = hammerhead__default.utils.style.isVisibleChild;
    var getWidth = hammerhead__default.utils.style.getWidth;
    var getHeight = hammerhead__default.utils.style.getHeight;
    var getInnerWidth = hammerhead__default.utils.style.getInnerWidth;
    var getInnerHeight = hammerhead__default.utils.style.getInnerHeight;
    var getScrollLeft = hammerhead__default.utils.style.getScrollLeft;
    var getScrollTop = hammerhead__default.utils.style.getScrollTop;
    var setScrollLeft = hammerhead__default.utils.style.setScrollLeft;
    var setScrollTop = hammerhead__default.utils.style.setScrollTop;
    var get = hammerhead__default.utils.style.get;
    function isVisibilityHiddenNode(node) {
        return !!findParent(node, true, function (ancestor) {
            return isElementNode(ancestor) && styleUtils.get(ancestor, 'visibility') === 'hidden';
        });
    }
    function isHiddenNode(node) {
        return !!findParent(node, true, function (ancestor) {
            return isElementNode(ancestor) && styleUtils.get(ancestor, 'display') === 'none';
        });
    }
    function isNotVisibleNode(node) {
        return !isRenderedNode(node) || isHiddenNode(node) || isVisibilityHiddenNode(node);
    }
    function hasDimensions(el) {
        //NOTE: it's like jquery ':visible' selector (http://blog.jquery.com/2009/02/20/jquery-1-3-2-released/)
        return el && !(el.offsetHeight <= 0 && el.offsetWidth <= 0);
    }

    var AxisValues = /** @class */ (function () {
        function AxisValues(x, y) {
            this.x = x;
            this.y = y;
        }
        AxisValues.create = function (a) {
            if ('left' in a)
                return new AxisValues(a.left, a.top);
            else if ('right' in a)
                return new AxisValues(a.right, a.bottom);
            return new AxisValues(a.x, a.y);
        };
        AxisValues.prototype.add = function (p) {
            this.x += p.x;
            this.y += p.y;
            return this;
        };
        AxisValues.prototype.sub = function (p) {
            this.x -= p.x;
            this.y -= p.y;
            return this;
        };
        AxisValues.prototype.round = function (fn) {
            if (fn === void 0) { fn = Math.round; }
            this.x = fn(this.x);
            this.y = fn(this.y);
            return this;
        };
        AxisValues.prototype.eql = function (p) {
            return this.x === p.x && this.y === p.y;
        };
        AxisValues.prototype.mul = function (n) {
            this.x *= n;
            this.y *= n;
            return this;
        };
        AxisValues.prototype.distance = function (p) {
            return Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
        };
        return AxisValues;
    }());

    var Dimensions = /** @class */ (function () {
        function Dimensions(width, height, position, borders, elScroll, scrollbar) {
            this.width = width;
            this.height = height;
            this.left = position.x;
            this.top = position.y;
            this.right = position.x + width;
            this.bottom = position.y + height;
            this.border = borders;
            this.scrollbar = scrollbar;
            this.scroll = elScroll;
        }
        return Dimensions;
    }());

    var getElementRectangle = hammerhead__default.utils.position.getElementRectangle;
    var getOffsetPosition = hammerhead__default.utils.position.getOffsetPosition;
    var offsetToClientCoords = hammerhead__default.utils.position.offsetToClientCoords;
    function getClientDimensions(target) {
        var isHtmlElement$1 = isHtmlElement(target);
        var body = isHtmlElement$1 ? target.getElementsByTagName('body')[0] : null;
        var elementRect = target.getBoundingClientRect();
        var elBorders = BoundaryValues.create(getBordersWidth(target));
        var elScroll = getElementScroll(target);
        var isElementInIframe$1 = isElementInIframe(target);
        var isCompatMode = target.ownerDocument.compatMode === 'BackCompat';
        var elPosition = isHtmlElement$1 ? new AxisValues(0, 0) : AxisValues.create(elementRect);
        var elHeight = elementRect.height;
        var elWidth = elementRect.width;
        if (isHtmlElement$1) {
            if (body && isCompatMode) {
                elHeight = body.clientHeight;
                elWidth = body.clientWidth;
            }
            else {
                elHeight = target.clientHeight;
                elWidth = target.clientWidth;
            }
        }
        if (isElementInIframe$1) {
            var iframeElement = getIframeByElement(target);
            if (iframeElement) {
                var iframeOffset = getOffsetPosition(iframeElement);
                var clientOffset = offsetToClientCoords(AxisValues.create(iframeOffset));
                var iframeBorders = getBordersWidth(iframeElement);
                elPosition.add(clientOffset).add(AxisValues.create(iframeBorders));
                if (isHtmlElement$1)
                    elBorders.add(iframeBorders);
            }
        }
        var hasRightScrollbar = !isHtmlElement$1 && getInnerWidth(target) !== target.clientWidth;
        var hasBottomScrollbar = !isHtmlElement$1 && getInnerHeight(target) !== target.clientHeight;
        var scrollbar = {
            right: hasRightScrollbar ? getScrollbarSize() : 0,
            bottom: hasBottomScrollbar ? getScrollbarSize() : 0,
        };
        return new Dimensions(elWidth, elHeight, elPosition, elBorders, elScroll, scrollbar);
    }
    function isIframeVisible(el) {
        return !hiddenUsingStyles(el);
    }
    function hiddenUsingStyles(el) {
        return get(el, 'visibility') === 'hidden' ||
            get(el, 'display') === 'none';
    }
    function hiddenByRectangle(el) {
        var elementRectangle = getElementRectangle(el);
        return elementRectangle.width === 0 ||
            elementRectangle.height === 0;
    }
    function isElementVisible$1(el) {
        if (isTextNode(el))
            return !isNotVisibleNode(el);
        if (!isContentEditableElement(el) &&
            !isSVGElement(el) &&
            hiddenByRectangle(el))
            return false;
        if (isMapElement(el)) {
            var mapContainer = getMapContainer(closest(el, 'map'));
            return mapContainer ? isElementVisible$1(mapContainer) : false;
        }
        if (isSelectVisibleChild(el)) {
            var select = getSelectParent(el);
            var childRealIndex = getChildVisibleIndex(select, el);
            var realSelectSizeValue = getSelectElementSize(select);
            var topVisibleIndex = Math.max(getScrollTop(select) / getOptionHeight(select), 0);
            var bottomVisibleIndex = topVisibleIndex + realSelectSizeValue - 1;
            var optionVisibleIndex = Math.max(childRealIndex - topVisibleIndex, 0);
            return optionVisibleIndex >= topVisibleIndex && optionVisibleIndex <= bottomVisibleIndex;
        }
        if (isSVGElement(el)) {
            var hiddenParent = findParent(el, true, function (parent) {
                return hiddenUsingStyles(parent);
            });
            if (!hiddenParent)
                return !hiddenByRectangle(el);
            return false;
        }
        return hasDimensions(el) && !hiddenUsingStyles(el);
    }

    // @ts-ignore
    function visible(el) {
        if (testcafeCore.domUtils.isIframeElement(el))
            return isIframeVisible(el);
        if (!hammerhead.utils.dom.isDomElement(el) && !hammerhead.utils.dom.isTextNode(el))
            return false;
        if (testcafeCore.domUtils.isOptionElement(el) || testcafeCore.domUtils.getTagName(el) === 'optgroup')
            return testcafeUi.selectElement.isOptionElementVisible(el);
        return isElementVisible$1(el);
    }
    function isNodeCollection(obj) {
        return obj instanceof hammerhead.nativeMethods.HTMLCollection || obj instanceof hammerhead.nativeMethods.NodeList;
    }
    function castToArray(list) {
        var length = list.length;
        var result = [];
        for (var i = 0; i < length; i++)
            result.push(list[i]);
        return result;
    }
    function isArrayOfNodes(obj) {
        if (!hammerhead.nativeMethods.isArray(obj))
            return false;
        for (var i = 0; i < obj.length; i++) {
            // @ts-ignore
            if (!(obj[i] instanceof hammerhead.nativeMethods.Node))
                return false;
        }
        return true;
    }

    var _a;
    var SELECTOR_FILTER_ERROR = {
        filterVisible: 1,
        filterHidden: 2,
        nth: 3,
    };
    var FILTER_ERROR_TO_API_RE = (_a = {},
        _a[SELECTOR_FILTER_ERROR.filterVisible] = /^\.filterVisible\(\)$/,
        _a[SELECTOR_FILTER_ERROR.filterHidden] = /^\.filterHidden\(\)$/,
        _a[SELECTOR_FILTER_ERROR.nth] = /^\.nth\(\d+\)$/,
        _a);
    var SelectorFilter = /** @class */ (function () {
        function SelectorFilter() {
            this._err = null;
        }
        Object.defineProperty(SelectorFilter.prototype, "error", {
            get: function () {
                return this._err;
            },
            set: function (message) {
                if (this._err === null)
                    this._err = message;
            },
            enumerable: false,
            configurable: true
        });
        SelectorFilter.prototype.filter = function (nodes, options, apiInfo) {
            if (options.filterVisible) {
                nodes = nodes.filter(visible);
                this._assertFilterError(nodes, apiInfo, SELECTOR_FILTER_ERROR.filterVisible);
            }
            if (options.filterHidden) {
                nodes = nodes.filter(function (n) { return !visible(n); });
                this._assertFilterError(nodes, apiInfo, SELECTOR_FILTER_ERROR.filterHidden);
            }
            if (options.counterMode) {
                if (options.index === null)
                    return nodes.length;
                return SelectorFilter._getNodeByIndex(nodes, options.index) ? 1 : 0;
            }
            if (options.collectionMode) {
                if (options.index !== null) {
                    var nodeOnIndex_1 = SelectorFilter._getNodeByIndex(nodes, options.index);
                    nodes = nodeOnIndex_1 ? [nodeOnIndex_1] : [];
                    this._assertFilterError(nodes, apiInfo, SELECTOR_FILTER_ERROR.nth);
                }
                return nodes;
            }
            var nodeOnIndex = SelectorFilter._getNodeByIndex(nodes, options.index || 0);
            if (!nodeOnIndex)
                this.error = SelectorFilter._getErrorItem(apiInfo, SELECTOR_FILTER_ERROR.nth);
            return nodeOnIndex;
        };
        SelectorFilter.prototype.cast = function (searchResult) {
            if (searchResult === null || searchResult === void 0)
                return [];
            else if (searchResult instanceof hammerhead.nativeMethods.Node)
                return [searchResult];
            else if (isArrayOfNodes(searchResult))
                return searchResult;
            else if (isNodeCollection(searchResult))
                return castToArray(searchResult);
            throw new InvalidSelectorResultError();
        };
        SelectorFilter.prototype._assertFilterError = function (filtered, apiInfo, filterError) {
            if (filtered.length === 0)
                this.error = SelectorFilter._getErrorItem(apiInfo, filterError);
        };
        SelectorFilter._getErrorItem = function (_a, err) {
            var apiFnChain = _a.apiFnChain, apiFnID = _a.apiFnID;
            if (err) {
                for (var i = apiFnID; i < apiFnChain.length; i++) {
                    if (FILTER_ERROR_TO_API_RE[err].test(apiFnChain[i]))
                        return i;
                }
            }
            return null;
        };
        SelectorFilter._getNodeByIndex = function (nodes, index) {
            return index < 0 ? nodes[nodes.length + index] : nodes[index];
        };
        return SelectorFilter;
    }());
    var selectorFilter = new SelectorFilter();

    // @ts-ignore
    // NOTE: evalFunction is isolated into a separate module to
    // restrict access to TestCafe intrinsics for the evaluated code.
    // It also accepts `__dependencies$` argument which may be used by evaluated code.
    function evalFunction(fnCode, __dependencies$) {
        var FunctionCtor = hammerhead.nativeMethods.Function;
        var evaluator = new FunctionCtor('fnCode', '__dependencies$', 'Promise', 
        // NOTE: we should pass the original `RegExp`
        // to make the `instanceof RegExp` check successful in different contexts
        'RegExp', 
        // NOTE: `eval` in strict mode will not override context variables
        '"use strict"; return eval(fnCode)');
        return evaluator(fnCode, __dependencies$, hammerhead.Promise, RegExp);
    }

    var FunctionTransform = /** @class */ (function () {
        function FunctionTransform() {
            this.type = 'Function';
        }
        FunctionTransform.prototype.shouldTransform = function (type) {
            return type === 'function';
        };
        FunctionTransform.prototype.toSerializable = function () {
            return '';
        };
        // HACK: UglifyJS + TypeScript + argument destructuring can generate incorrect code.
        // So we have to use plain assignments here.
        FunctionTransform.prototype.fromSerializable = function (opts) {
            var fnCode = opts.fnCode;
            var dependencies = opts.dependencies;
            if ('filterOptions' in dependencies)
                dependencies.selectorFilter = selectorFilter;
            return evalFunction(fnCode, dependencies);
        };
        return FunctionTransform;
    }());

    var ClientFunctionNodeTransform = /** @class */ (function () {
        function ClientFunctionNodeTransform(instantiationCallsiteName) {
            this.type = 'Node';
            this._instantiationCallsiteName = instantiationCallsiteName;
        }
        ClientFunctionNodeTransform.prototype.shouldTransform = function (type, val) {
            if (val instanceof hammerhead.nativeMethods.Node)
                throw new DomNodeClientFunctionResultError(this._instantiationCallsiteName);
            return false;
        };
        ClientFunctionNodeTransform.prototype.toSerializable = function () {
        };
        ClientFunctionNodeTransform.prototype.fromSerializable = function () {
        };
        return ClientFunctionNodeTransform;
    }());

    var ClientFunctionExecutor = /** @class */ (function () {
        function ClientFunctionExecutor(command) {
            this.command = command;
            this.replicator = this._createReplicator();
            this.dependencies = this.replicator.decode(command.dependencies);
            this.fn = evalFunction(command.fnCode, this.dependencies);
        }
        ClientFunctionExecutor.prototype.getResult = function () {
            var _this = this;
            return hammerhead.Promise.resolve()
                .then(function () {
                var args = _this.replicator.decode(_this.command.args);
                return _this._executeFn(args);
            })
                .catch(function (err) {
                if (!err.isTestCafeError)
                    err = new UncaughtErrorInClientFunctionCode(_this.command.instantiationCallsiteName, err);
                throw err;
            });
        };
        ClientFunctionExecutor.prototype.encodeResult = function (result) {
            return this.replicator.encode(result);
        };
        ClientFunctionExecutor.prototype._createReplicator = function () {
            return createReplicator([
                new ClientFunctionNodeTransform(this.command.instantiationCallsiteName),
                new FunctionTransform(),
            ]);
        };
        ClientFunctionExecutor.prototype._executeFn = function (args) {
            return this.fn.apply(window, args);
        };
        return ClientFunctionExecutor;
    }());

    var MESSAGE_TYPE = {
        appearedDialog: 'appeared-dialog',
        unexpectedDialog: 'unexpected-dialog',
        handlerError: 'handler-error',
    };

    var messageSandbox = hammerhead__default.eventSandbox.message;
    var processScript = hammerhead__default.processScript;
    var nativeMethods$1 = hammerhead__default.nativeMethods;
    var APPEARED_DIALOGS = 'testcafe|native-dialog-tracker|appeared-dialogs';
    var UNEXPECTED_DIALOG = 'testcafe|native-dialog-tracker|unexpected-dialog';
    var ERROR_IN_HANDLER = 'testcafe|native-dialog-tracker|error-in-handler';
    var GETTING_PAGE_URL_PROCESSED_SCRIPT = processScript('window.location.href');
    var NativeDialogTracker = /** @class */ (function () {
        function NativeDialogTracker(contextStorage, dialogHandler) {
            this.contextStorage = contextStorage;
            this.dialogHandler = dialogHandler;
            this._init();
            this._initListening();
            if (this.dialogHandler)
                this.setHandler(dialogHandler);
        }
        Object.defineProperty(NativeDialogTracker.prototype, "appearedDialogs", {
            get: function () {
                var dialogs = this.contextStorage.getItem(APPEARED_DIALOGS);
                if (!dialogs) {
                    dialogs = [];
                    this.appearedDialogs = dialogs;
                }
                return dialogs;
            },
            set: function (dialog) {
                this.contextStorage.setItem(APPEARED_DIALOGS, dialog);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NativeDialogTracker.prototype, "unexpectedDialog", {
            get: function () {
                return this.contextStorage.getItem(UNEXPECTED_DIALOG);
            },
            set: function (dialog) {
                this.contextStorage.setItem(UNEXPECTED_DIALOG, dialog);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NativeDialogTracker.prototype, "handlerError", {
            get: function () {
                return this.contextStorage.getItem(ERROR_IN_HANDLER);
            },
            set: function (dialog) {
                this.contextStorage.setItem(ERROR_IN_HANDLER, dialog);
            },
            enumerable: false,
            configurable: true
        });
        NativeDialogTracker._getPageUrl = function () {
            return nativeMethods$1.eval(GETTING_PAGE_URL_PROCESSED_SCRIPT);
        };
        NativeDialogTracker.prototype._initListening = function () {
            var _this = this;
            messageSandbox.on(messageSandbox.SERVICE_MSG_RECEIVED_EVENT, function (e) {
                var msg = e.message;
                if (msg.type === MESSAGE_TYPE.appearedDialog)
                    // eslint-disable-next-line no-restricted-properties
                    _this._addAppearedDialogs(msg.dialogType, msg.text, msg.url);
                else if (msg.type === MESSAGE_TYPE.unexpectedDialog && !_this.unexpectedDialog)
                    _this.unexpectedDialog = { type: msg.dialogType, url: msg.url };
                else if (msg.type === MESSAGE_TYPE.handlerError && !_this.handlerError)
                    _this._onHandlerError(msg.dialogType, msg.message, msg.url);
            });
        };
        NativeDialogTracker.prototype._init = function () {
            var _this = this;
            hammerhead__default.on(hammerhead__default.EVENTS.beforeUnload, function (e) {
                if (e.prevented && !e.isFakeIEEvent) {
                    if (_this.dialogHandler) {
                        var handler = _this._createDialogHandler('beforeunload');
                        handler(e.returnValue || '');
                    }
                    else
                        _this._defaultDialogHandler('beforeunload');
                }
                // NOTE: we should save changes that could be made via 'shift' and 'push' methods.
                if (_this.contextStorage)
                    _this.contextStorage.save();
            });
            window.alert = function () { return _this._defaultDialogHandler('alert'); };
            window.confirm = function () { return _this._defaultDialogHandler('confirm'); };
            window.prompt = function () { return _this._defaultDialogHandler('prompt'); };
        };
        NativeDialogTracker.prototype._createDialogHandler = function (type) {
            var _this = this;
            return function (text) {
                var url = NativeDialogTracker._getPageUrl();
                _this._addAppearedDialogs(type, text, url);
                var executor = new ClientFunctionExecutor(_this.dialogHandler);
                var result = null;
                try {
                    result = executor.fn.apply(window, [type, text, url]);
                }
                catch (err) {
                    _this._onHandlerError(type, err.message || String(err), url);
                }
                return result;
            };
        };
        // Overridable methods
        NativeDialogTracker.prototype._defaultDialogHandler = function (type) {
            var url = NativeDialogTracker._getPageUrl();
            this.unexpectedDialog = this.unexpectedDialog || { type: type, url: url };
        };
        NativeDialogTracker.prototype._addAppearedDialogs = function (type, text, url) {
            this.appearedDialogs.splice(0, 0, { type: type, text: text, url: url });
        };
        NativeDialogTracker.prototype._onHandlerError = function (type, message, url) {
            this.handlerError = this.handlerError || { type: type, message: message, url: url };
        };
        // API
        NativeDialogTracker.prototype.setHandler = function (dialogHandler) {
            var _this = this;
            this.dialogHandler = dialogHandler;
            ['alert', 'confirm', 'prompt'].forEach(function (dialogType) {
                window[dialogType] = _this.dialogHandler ?
                    _this._createDialogHandler(dialogType) :
                    function () { return _this._defaultDialogHandler(dialogType); };
            });
        };
        NativeDialogTracker.prototype.getUnexpectedDialogError = function () {
            var unexpectedDialog = this.unexpectedDialog;
            var handlerError = this.handlerError;
            this.unexpectedDialog = null;
            this.handlerError = null;
            if (unexpectedDialog)
                return new NativeDialogNotHandledError(unexpectedDialog.type, unexpectedDialog.url);
            if (handlerError)
                return new UncaughtErrorInNativeDialogHandler(handlerError.type, handlerError.message, handlerError.url);
            return null;
        };
        return NativeDialogTracker;
    }());

    function generateId () {
        return hammerhead.nativeMethods.performanceNow().toString();
    }

    var TYPE = {
        establishConnection: 'driver|establish-connection',
        switchToWindow: 'driver|switch-to-window',
        closeWindow: 'driver|close-window',
        closeWindowValidation: 'driver|close-window-validation',
        switchToWindowValidation: 'driver|switch-to-window-validation',
        getWindows: 'driver|get-windows',
        commandExecuted: 'driver|command-executed',
        executeCommand: 'driver|execute-command',
        confirmation: 'driver|confirmation',
        setNativeDialogHandler: 'driver|set-native-dialog-handler',
        setAsMaster: 'driver|set-as-master',
        closeAllChildWindows: 'driver|close-all-child-windows',
        startToRestoreChildLink: 'driver|start-to-restore-child-link',
        restoreChildLink: 'driver|restore-child-link',
        childWindowIsLoadedInIFrame: 'driver|child-window-is-loaded-in-iframe',
        childWindowIsOpenedInIFrame: 'driver|child-window-is-opened-in-iframe',
        stopInternalFromFrame: 'driver|stop-internal-from-iframe',
        hasPendingActionFlags: 'driver|has-pending-action-flags',
    };
    var InterDriverMessage = /** @class */ (function () {
        function InterDriverMessage(type) {
            this.type = type;
            this.id = generateId();
        }
        return InterDriverMessage;
    }());
    var EstablishConnectionMessage = /** @class */ (function (_super) {
        __extends(EstablishConnectionMessage, _super);
        function EstablishConnectionMessage() {
            return _super.call(this, TYPE.establishConnection) || this;
        }
        return EstablishConnectionMessage;
    }(InterDriverMessage));
    var CloseWindowValidationMessage = /** @class */ (function (_super) {
        __extends(CloseWindowValidationMessage, _super);
        function CloseWindowValidationMessage(_a) {
            var windowId = _a.windowId;
            var _this = _super.call(this, TYPE.closeWindowValidation) || this;
            _this.windowId = windowId;
            return _this;
        }
        return CloseWindowValidationMessage;
    }(InterDriverMessage));
    var SwitchToWindowValidationMessage = /** @class */ (function (_super) {
        __extends(SwitchToWindowValidationMessage, _super);
        function SwitchToWindowValidationMessage(_a) {
            var windowId = _a.windowId, fn = _a.fn;
            var _this = _super.call(this, TYPE.switchToWindowValidation) || this;
            _this.windowId = windowId;
            _this.fn = fn;
            return _this;
        }
        return SwitchToWindowValidationMessage;
    }(InterDriverMessage));
    var GetWindowsMessage = /** @class */ (function (_super) {
        __extends(GetWindowsMessage, _super);
        function GetWindowsMessage() {
            return _super.call(this, TYPE.getWindows) || this;
        }
        return GetWindowsMessage;
    }(InterDriverMessage));
    var CloseWindowCommandMessage = /** @class */ (function (_super) {
        __extends(CloseWindowCommandMessage, _super);
        function CloseWindowCommandMessage(_a) {
            var windowId = _a.windowId, isCurrentWindow = _a.isCurrentWindow;
            var _this = _super.call(this, TYPE.closeWindow) || this;
            _this.windowId = windowId;
            _this.isCurrentWindow = isCurrentWindow;
            return _this;
        }
        return CloseWindowCommandMessage;
    }(InterDriverMessage));
    var SwitchToWindowCommandMessage = /** @class */ (function (_super) {
        __extends(SwitchToWindowCommandMessage, _super);
        function SwitchToWindowCommandMessage(_a) {
            var windowId = _a.windowId, fn = _a.fn;
            var _this = _super.call(this, TYPE.switchToWindow) || this;
            _this.windowId = windowId;
            _this.fn = fn;
            return _this;
        }
        return SwitchToWindowCommandMessage;
    }(InterDriverMessage));
    var CommandExecutedMessage = /** @class */ (function (_super) {
        __extends(CommandExecutedMessage, _super);
        function CommandExecutedMessage(driverStatus) {
            var _this = _super.call(this, TYPE.commandExecuted) || this;
            _this.driverStatus = driverStatus;
            return _this;
        }
        return CommandExecutedMessage;
    }(InterDriverMessage));
    var ExecuteCommandMessage = /** @class */ (function (_super) {
        __extends(ExecuteCommandMessage, _super);
        function ExecuteCommandMessage(command, testSpeed) {
            var _this = _super.call(this, TYPE.executeCommand) || this;
            _this.command = command;
            _this.testSpeed = testSpeed;
            return _this;
        }
        return ExecuteCommandMessage;
    }(InterDriverMessage));
    var ConfirmationMessage = /** @class */ (function (_super) {
        __extends(ConfirmationMessage, _super);
        function ConfirmationMessage(requestMessageId, result) {
            var _this = _super.call(this, TYPE.confirmation) || this;
            _this.requestMessageId = requestMessageId;
            _this.result = result;
            return _this;
        }
        return ConfirmationMessage;
    }(InterDriverMessage));
    var SetNativeDialogHandlerMessage = /** @class */ (function (_super) {
        __extends(SetNativeDialogHandlerMessage, _super);
        function SetNativeDialogHandlerMessage(dialogHandler) {
            var _this = _super.call(this, TYPE.setNativeDialogHandler) || this;
            _this.dialogHandler = dialogHandler;
            return _this;
        }
        return SetNativeDialogHandlerMessage;
    }(InterDriverMessage));
    var SetAsMasterMessage = /** @class */ (function (_super) {
        __extends(SetAsMasterMessage, _super);
        function SetAsMasterMessage(finalizePendingCommand) {
            var _this = _super.call(this, TYPE.setAsMaster) || this;
            _this.finalizePendingCommand = finalizePendingCommand;
            return _this;
        }
        return SetAsMasterMessage;
    }(InterDriverMessage));
    var CloseAllChildWindowsMessage = /** @class */ (function (_super) {
        __extends(CloseAllChildWindowsMessage, _super);
        function CloseAllChildWindowsMessage() {
            return _super.call(this, TYPE.closeAllChildWindows) || this;
        }
        return CloseAllChildWindowsMessage;
    }(InterDriverMessage));
    var StartToRestoreChildLinkMessage = /** @class */ (function (_super) {
        __extends(StartToRestoreChildLinkMessage, _super);
        function StartToRestoreChildLinkMessage() {
            return _super.call(this, TYPE.startToRestoreChildLink) || this;
        }
        return StartToRestoreChildLinkMessage;
    }(InterDriverMessage));
    var RestoreChildLinkMessage = /** @class */ (function (_super) {
        __extends(RestoreChildLinkMessage, _super);
        function RestoreChildLinkMessage(windowId) {
            var _this = _super.call(this, TYPE.restoreChildLink) || this;
            _this.windowId = windowId;
            return _this;
        }
        return RestoreChildLinkMessage;
    }(InterDriverMessage));
    var ChildWindowIsLoadedInFrameMessage = /** @class */ (function (_super) {
        __extends(ChildWindowIsLoadedInFrameMessage, _super);
        function ChildWindowIsLoadedInFrameMessage(windowId) {
            var _this = _super.call(this, TYPE.childWindowIsLoadedInIFrame) || this;
            _this.windowId = windowId;
            return _this;
        }
        return ChildWindowIsLoadedInFrameMessage;
    }(InterDriverMessage));
    var ChildWindowIsOpenedInFrameMessage = /** @class */ (function (_super) {
        __extends(ChildWindowIsOpenedInFrameMessage, _super);
        function ChildWindowIsOpenedInFrameMessage() {
            return _super.call(this, TYPE.childWindowIsOpenedInIFrame) || this;
        }
        return ChildWindowIsOpenedInFrameMessage;
    }(InterDriverMessage));
    var StopInternalFromFrameMessage = /** @class */ (function (_super) {
        __extends(StopInternalFromFrameMessage, _super);
        function StopInternalFromFrameMessage() {
            return _super.call(this, TYPE.stopInternalFromFrame) || this;
        }
        return StopInternalFromFrameMessage;
    }(InterDriverMessage));
    var HasPendingActionFlagsMessage = /** @class */ (function (_super) {
        __extends(HasPendingActionFlagsMessage, _super);
        function HasPendingActionFlagsMessage() {
            return _super.call(this, TYPE.hasPendingActionFlags) || this;
        }
        return HasPendingActionFlagsMessage;
    }(InterDriverMessage));

    var JSON$1 = hammerhead__default.json;
    var nativeMethods$2 = hammerhead__default.nativeMethods;
    var STORAGE_KEY_PREFIX = 'testcafe|driver|';
    var Storage = /** @class */ (function () {
        function Storage(window, testRunId, windowId) {
            this.storage = nativeMethods$2.winSessionStorageGetter.call(window);
            this.storageKey = this._createStorageKey(testRunId, windowId);
            this.data = {};
            this._loadFromStorage();
        }
        Storage.prototype._createStorageKey = function (testRunId, windowId) {
            var storageKey = STORAGE_KEY_PREFIX + testRunId;
            if (windowId)
                return storageKey + '|' + windowId;
            return storageKey;
        };
        Storage.prototype._loadFromStorage = function () {
            var savedData = nativeMethods$2.storageGetItem.call(this.storage, this.storageKey);
            if (savedData) {
                this.data = JSON$1.parse(savedData);
                nativeMethods$2.storageRemoveItem.call(this.storage, this.storageKey);
            }
        };
        Storage.prototype.save = function () {
            nativeMethods$2.storageSetItem.call(this.storage, this.storageKey, JSON$1.stringify(this.data));
        };
        Storage.prototype.setItem = function (prop, value) {
            this.data[prop] = value;
            this.save();
        };
        Storage.prototype.getItem = function (prop) {
            return this.data[prop];
        };
        Storage.prototype.dispose = function () {
            nativeMethods$2.storageRemoveItem.call(this.storage, this.storageKey);
        };
        return Storage;
    }());

    // -------------------------------------------------------------
    // WARNING: this file is used by both the client and the server.
    // Do not use any browser or node-specific API!
    // -------------------------------------------------------------
    var objectToString = Object.prototype.toString;
    var stringIndexOf = String.prototype.indexOf;
    var stringEndsWith = String.prototype.endsWith
        || function (searchString, position) {
            var subjectString = objectToString.call(this);
            if (position === void 0 || position > subjectString.length)
                position = subjectString.length;
            position -= searchString.length;
            var lastIndex = stringIndexOf.call(subjectString, searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        };

    // -------------------------------------------------------------
    var arrayIndexOf = Array.prototype.indexOf;
    var arrayMap = Array.prototype.map;
    var arraySort = Array.prototype.sort;
    var arrayFilter = Array.prototype.filter;
    var arrayConcat = Array.prototype.concat;
    var COMMAND_NAME_SUFFIX = 'Command';
    function validateObjectProps(obj, dest) {
        var objectName = dest.constructor.name;
        var validKeys = arrayMap.call(dest.getAllAssignableProperties(), function (p) { return p.name; });
        var reportedProperties = arraySort.call(dest.getReportedProperties());
        for (var key in obj) {
            if (!(arrayIndexOf.call(validKeys, key) > -1 || key in dest))
                throw new ActionInvalidObjectPropertyError(objectName, key, reportedProperties);
        }
    }
    function getDisplayTypeName(constructorName, propName) {
        if (stringEndsWith.call(constructorName, COMMAND_NAME_SUFFIX))
            return propName;
        return "".concat(constructorName, ".").concat(propName);
    }
    var Assignable = /** @class */ (function () {
        function Assignable() {
        }
        Assignable.prototype.getAssignableProperties = function () {
            return [];
        };
        Assignable.prototype.getAllAssignableProperties = function () {
            var parent = Object.getPrototypeOf(this);
            var result = [];
            while (parent && parent.getAssignableProperties) {
                result = arrayConcat.call(result, parent.getAssignableProperties());
                parent = Object.getPrototypeOf(parent);
            }
            return result;
        };
        Assignable.prototype.getNonReportedProperties = function () {
            return [];
        };
        Assignable.prototype.getReportedProperties = function () {
            var props = arrayMap.call(this.getAllAssignableProperties(), function (prop) { return prop.name; });
            var nonReportedProps = this.getNonReportedProperties();
            return arrayFilter.call(props, function (name) { return !(arrayIndexOf.call(nonReportedProps, name) > -1); });
        };
        Assignable.prototype._assignFrom = function (obj, validate, initOptions) {
            if (initOptions === void 0) { initOptions = {}; }
            if (!obj)
                return;
            if (validate)
                validateObjectProps(obj, this);
            var props = this.getAllAssignableProperties();
            for (var i = 0; i < props.length; i++) {
                var _a = props[i], name_1 = _a.name, type = _a.type, required = _a.required, init = _a.init, defaultValue = _a.defaultValue;
                if (defaultValue !== void 0)
                    this[name_1] = defaultValue;
                var srcVal = obj[name_1];
                if (srcVal === void 0 && !required)
                    continue;
                if (validate && type) {
                    var typeName = getDisplayTypeName(this.constructor.name, name_1);
                    type(typeName, srcVal);
                }
                this[name_1] = init ? init(name_1, srcVal, initOptions, validate) : srcVal;
            }
        };
        return Assignable;
    }());

    var DriverStatus = /** @class */ (function (_super) {
        __extends(DriverStatus, _super);
        function DriverStatus(obj) {
            var _this = _super.call(this, obj) || this;
            _this.id = generateId();
            _this.isCommandResult = false;
            _this.executionError = null;
            _this.pageError = null;
            _this.resent = false;
            _this.result = null;
            _this.consoleMessages = null;
            _this.isPendingWindowSwitching = false;
            _this.isObservingFileDownloadingInNewWindow = false;
            _this.isFirstRequestAfterWindowSwitching = false;
            _this.debug = '';
            _this.warnings = null;
            _this._assignFrom(obj, true);
            return _this;
        }
        DriverStatus.prototype.getAssignableProperties = function () {
            return [
                { name: 'isCommandResult' },
                { name: 'executionError' },
                { name: 'pageError' },
                { name: 'result' },
                { name: 'consoleMessages' },
                { name: 'isPendingWindowSwitching' },
                { name: 'isObservingFileDownloadingInNewWindow' },
                { name: 'isFirstRequestAfterWindowSwitching' },
                { name: 'warnings' },
            ];
        };
        return DriverStatus;
    }(Assignable));

    var MIN_RESPONSE_WAITING_TIMEOUT = 2500;
    var RESEND_MESSAGE_INTERVAL = 1000;
    function sendMessageToDriver(msg, driverWindow, timeout, NotLoadedErrorCtor) {
        var sendMsgInterval = null;
        var sendMsgTimeout = null;
        var onResponse = null;
        timeout = Math.max(timeout || 0, MIN_RESPONSE_WAITING_TIMEOUT);
        var sendAndWaitForResponse = function () {
            return new hammerhead.Promise(function (resolve) {
                onResponse = function (e) {
                    if (e.message.type === TYPE.confirmation && e.message.requestMessageId === msg.id)
                        resolve(e.message);
                };
                hammerhead.eventSandbox.message.on(hammerhead.eventSandbox.message.SERVICE_MSG_RECEIVED_EVENT, onResponse);
                sendMsgInterval = hammerhead.nativeMethods.setInterval.call(window, function () { return hammerhead.eventSandbox.message.sendServiceMsg(msg, driverWindow); }, RESEND_MESSAGE_INTERVAL);
                hammerhead.eventSandbox.message.sendServiceMsg(msg, driverWindow);
            });
        };
        return hammerhead.Promise.race([testcafeCore.delay(timeout), sendAndWaitForResponse()])
            .then(function (response) {
            hammerhead.nativeMethods.clearInterval.call(window, sendMsgInterval);
            hammerhead.nativeMethods.clearTimeout.call(window, sendMsgTimeout);
            hammerhead.eventSandbox.message.off(hammerhead.eventSandbox.message.SERVICE_MSG_RECEIVED_EVENT, onResponse);
            if (!response)
                throw new NotLoadedErrorCtor();
            return response;
        });
    }

    var WAIT_FOR_WINDOW_DRIVER_RESPONSE_TIMEOUT = 20000;
    var WAIT_FOR_IFRAME_DRIVER_RESPONSE_TIMEOUT = 5000;
    var CHECK_IFRAME_EXISTENCE_INTERVAL = 1000;
    var CHECK_IFRAME_VISIBLE_INTERVAL = 200;
    var WAIT_IFRAME_RESPONSE_DELAY = 500;
    var CHECK_CHILD_WINDOW_CLOSED_INTERVAL = 200;

    function sendConfirmationMessage (_a) {
        var requestMsgId = _a.requestMsgId, result = _a.result, window = _a.window;
        var msg = new ConfirmationMessage(requestMsgId, result);
        hammerhead.eventSandbox.message.sendServiceMsg(msg, window);
    }

    var ChildIframeDriverLink = /** @class */ (function () {
        function ChildIframeDriverLink(driverWindow, driverId) {
            this.driverWindow = driverWindow;
            this.driverIframe = testcafeCore.domUtils.findIframeByWindow(driverWindow);
            this.driverId = driverId;
            this.iframeAvailabilityTimeout = 0;
        }
        Object.defineProperty(ChildIframeDriverLink.prototype, "availabilityTimeout", {
            set: function (val) {
                this.iframeAvailabilityTimeout = val;
            },
            enumerable: false,
            configurable: true
        });
        ChildIframeDriverLink.prototype._ensureIframe = function () {
            var _this = this;
            if (!testcafeCore.domUtils.isElementInDocument(this.driverIframe))
                return hammerhead.Promise.reject(new CurrentIframeNotFoundError());
            return testcafeCore.waitFor(function () { return testcafeCore.positionUtils.isIframeVisible(_this.driverIframe) ? _this.driverIframe : null; }, CHECK_IFRAME_VISIBLE_INTERVAL, this.iframeAvailabilityTimeout)
                .catch(function () {
                throw new CurrentIframeIsInvisibleError();
            });
        };
        ChildIframeDriverLink.prototype._waitForIframeRemovedOrHidden = function () {
            var _this = this;
            // NOTE: If an iframe was removed or became hidden while a
            // command was being executed, we consider this command finished.
            return new hammerhead.Promise(function (resolve) {
                _this.checkIframeInterval = hammerhead.nativeMethods.setInterval.call(window, function () {
                    _this._ensureIframe()
                        .catch(function () {
                        // NOTE: wait for possible delayed iframe message
                        return testcafeCore.delay(WAIT_IFRAME_RESPONSE_DELAY)
                            .then(function () { return resolve(new DriverStatus({ isCommandResult: true })); });
                    });
                }, CHECK_IFRAME_EXISTENCE_INTERVAL);
            });
        };
        ChildIframeDriverLink.prototype._waitForCommandResult = function () {
            var _this = this;
            var onMessage = null;
            var waitForResultMessage = function () { return new hammerhead.Promise(function (resolve) {
                onMessage = function (e) {
                    if (e.message.type === TYPE.commandExecuted)
                        resolve(e.message.driverStatus);
                };
                hammerhead.eventSandbox.message.on(hammerhead.eventSandbox.message.SERVICE_MSG_RECEIVED_EVENT, onMessage);
            }); };
            return hammerhead.Promise.race([this._waitForIframeRemovedOrHidden(), waitForResultMessage()])
                .then(function (status) {
                hammerhead.eventSandbox.message.off(hammerhead.eventSandbox.message.SERVICE_MSG_RECEIVED_EVENT, onMessage);
                hammerhead.nativeMethods.clearInterval.call(window, _this.checkIframeInterval);
                return status;
            });
        };
        ChildIframeDriverLink.prototype.sendConfirmationMessage = function (requestMsgId) {
            sendConfirmationMessage({
                requestMsgId: requestMsgId,
                result: { id: this.driverId },
                window: this.driverWindow,
            });
        };
        ChildIframeDriverLink.prototype.executeCommand = function (command, testSpeed) {
            var _this = this;
            // NOTE:  We should check if the iframe is visible and exists before executing the next
            // command, because the iframe might be hidden or removed since the previous command.
            return this
                ._ensureIframe()
                .then(function () {
                var msg = new ExecuteCommandMessage(command, testSpeed);
                return hammerhead.Promise.all([
                    sendMessageToDriver(msg, _this.driverWindow, _this.iframeAvailabilityTimeout, CurrentIframeIsNotLoadedError),
                    _this._waitForCommandResult(),
                ]);
            })
                .then(function (result) { return result[1]; });
        };
        return ChildIframeDriverLink;
    }());

    // -------------------------------------------------------------
    // WARNING: this file is used by both the client and the server.
    // Do not use any browser or node-specific API!
    // -------------------------------------------------------------
    var NODE_SNAPSHOT_PROPERTIES = [
        'nodeType',
        'textContent',
        'childNodeCount',
        'hasChildNodes',
        'childElementCount',
        'hasChildElements',
    ];
    var ELEMENT_ACTION_SNAPSHOT_PROPERTIES = [
        'tagName',
        'attributes',
    ];
    var ELEMENT_SNAPSHOT_PROPERTIES = [
        'tagName',
        'visible',
        'focused',
        'attributes',
        'boundingClientRect',
        'classNames',
        'style',
        'innerText',
        'namespaceURI',
        'id',
        'value',
        'checked',
        'selected',
        'selectedIndex',
        'scrollWidth',
        'scrollHeight',
        'scrollLeft',
        'scrollTop',
        'offsetWidth',
        'offsetHeight',
        'offsetLeft',
        'offsetTop',
        'clientWidth',
        'clientHeight',
        'clientLeft',
        'clientTop',
    ];

    var nodeSnapshotPropertyInitializers = {
        // eslint-disable-next-line no-restricted-properties
        childNodeCount: function (node) { return node.childNodes.length; },
        hasChildNodes: function (node) { return !!nodeSnapshotPropertyInitializers.childNodeCount(node); },
        childElementCount: function (node) {
            var children = node.children;
            if (children)
                // eslint-disable-next-line no-restricted-properties
                return children.length;
            // NOTE: IE doesn't have `children` for non-element nodes =/
            var childElementCount = 0;
            // eslint-disable-next-line no-restricted-properties
            var childNodeCount = node.childNodes.length;
            for (var i = 0; i < childNodeCount; i++) {
                // eslint-disable-next-line no-restricted-properties
                if (node.childNodes[i].nodeType === 1)
                    childElementCount++;
            }
            return childElementCount;
        },
        // eslint-disable-next-line no-restricted-properties
        hasChildElements: function (node) { return !!nodeSnapshotPropertyInitializers.childElementCount(node); },
    };
    var BaseSnapshot = /** @class */ (function () {
        function BaseSnapshot() {
        }
        BaseSnapshot.prototype._initializeProperties = function (node, properties, initializers) {
            for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
                var property = properties_1[_i];
                var initializer = initializers[property];
                this[property] = initializer ? initializer(node) : node[property];
            }
        };
        return BaseSnapshot;
    }());
    var NodeSnapshot = /** @class */ (function (_super) {
        __extends(NodeSnapshot, _super);
        function NodeSnapshot(node) {
            var _this = _super.call(this) || this;
            _this._initializeProperties(node, NODE_SNAPSHOT_PROPERTIES, nodeSnapshotPropertyInitializers);
            return _this;
        }
        return NodeSnapshot;
    }(BaseSnapshot));
    // Element
    var elementSnapshotPropertyInitializers = {
        tagName: function (element) { return element.tagName.toLowerCase(); },
        visible: function (element) { return isElementVisible$1(element); },
        focused: function (element) { return hammerhead.utils.dom.getActiveElement() === element; },
        attributes: function (element) {
            // eslint-disable-next-line no-restricted-properties
            var attrs = element.attributes;
            var result = {};
            for (var i = attrs.length - 1; i >= 0; i--)
                // eslint-disable-next-line no-restricted-properties
                result[attrs[i].name] = attrs[i].value;
            return result;
        },
        boundingClientRect: function (element) {
            var rect = element.getBoundingClientRect();
            return {
                left: rect.left,
                right: rect.right,
                top: rect.top,
                bottom: rect.bottom,
                width: rect.width,
                height: rect.height,
            };
        },
        classNames: function (element) {
            var className = element.className;
            if (typeof className.animVal === 'string')
                className = className.animVal;
            return className
                .replace(/^\s+|\s+$/g, '')
                .split(/\s+/g);
        },
        style: function (element) {
            var result = {};
            var computed = window.getComputedStyle(element);
            for (var i = 0; i < computed.length; i++) {
                var prop = computed[i];
                result[prop] = computed[prop];
            }
            return result;
        },
        // eslint-disable-next-line no-restricted-properties
        innerText: function (element) { return element.innerText; },
    };
    var ElementActionSnapshot = /** @class */ (function (_super) {
        __extends(ElementActionSnapshot, _super);
        function ElementActionSnapshot(element) {
            var _this = _super.call(this) || this;
            _this._initializeProperties(element, ELEMENT_ACTION_SNAPSHOT_PROPERTIES, elementSnapshotPropertyInitializers);
            return _this;
        }
        return ElementActionSnapshot;
    }(BaseSnapshot));
    var ElementSnapshot = /** @class */ (function (_super) {
        __extends(ElementSnapshot, _super);
        function ElementSnapshot(element) {
            var _this = _super.call(this, element) || this;
            _this._initializeProperties(element, ELEMENT_SNAPSHOT_PROPERTIES, elementSnapshotPropertyInitializers);
            return _this;
        }
        return ElementSnapshot;
    }(NodeSnapshot));

    var SelectorNodeTransform = /** @class */ (function () {
        function SelectorNodeTransform(customDOMProperties, instantiationCallsiteName) {
            if (customDOMProperties === void 0) { customDOMProperties = {}; }
            this.type = 'Node';
            this._customDOMProperties = customDOMProperties;
            this._instantiationCallsiteName = instantiationCallsiteName;
        }
        SelectorNodeTransform.prototype._extend = function (snapshot, node) {
            var props = hammerhead.nativeMethods.objectKeys(this._customDOMProperties);
            for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
                var prop = props_1[_i];
                try {
                    snapshot[prop] = this._customDOMProperties[prop](node);
                }
                catch (err) {
                    throw new UncaughtErrorInCustomDOMPropertyCode(this._instantiationCallsiteName, err, prop);
                }
            }
        };
        SelectorNodeTransform.prototype.shouldTransform = function (type, val) {
            return val instanceof hammerhead.nativeMethods.Node;
        };
        SelectorNodeTransform.prototype.toSerializable = function (node) {
            var snapshot = node.nodeType === 1 ? new ElementSnapshot(node) : new NodeSnapshot(node);
            this._extend(snapshot, node);
            return snapshot;
        };
        SelectorNodeTransform.prototype.fromSerializable = function () {
        };
        return SelectorNodeTransform;
    }());

    // @ts-ignore
    var EventEmitter = /** @class */ (function () {
        function EventEmitter() {
            this._eventsListeners = {};
        }
        EventEmitter.prototype.on = function (evt, listener) {
            if (!this._eventsListeners[evt])
                this._eventsListeners[evt] = [];
            this._eventsListeners[evt].push(listener);
        };
        EventEmitter.prototype.once = function (evt, listener) {
            var _this = this;
            this.on(evt, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this.off(evt, listener);
                return listener.apply(void 0, args);
            });
        };
        EventEmitter.prototype.off = function (evt, listener) {
            var listeners = this._eventsListeners[evt];
            if (listeners)
                this._eventsListeners[evt] = hammerhead.nativeMethods.arrayFilter.call(listeners, function (item) { return item !== listener; });
        };
        EventEmitter.prototype.offAll = function (evt) {
            if (evt)
                this._eventsListeners[evt] = [];
            else
                this._eventsListeners = {};
        };
        EventEmitter.prototype.emit = function (evt) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var listeners = this._eventsListeners[evt];
            if (!listeners)
                return;
            for (var i = 0; i < listeners.length; i++) {
                try {
                    listeners[i].apply(this, args);
                }
                catch (e) {
                    // Hack for IE: after document.write calling IFrameSandbox event handlers
                    // rises 'Can't execute code from a freed script' exception because document has been
                    // recreated
                    if (e.message && e.message.indexOf('freed script') > -1)
                        this.off(evt, listeners[i]);
                    else
                        throw e;
                }
            }
        };
        return EventEmitter;
    }());

    var Promise = hammerhead__default.Promise;
    var nativeMethods$3 = hammerhead__default.nativeMethods;
    function delay (ms) {
        return new Promise(function (resolve) { return nativeMethods$3.setTimeout.call(window, resolve, ms); });
    }

    function whilst(condition, iterator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!condition()) return [3 /*break*/, 2];
                        return [4 /*yield*/, iterator()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 0];
                    case 2: return [2 /*return*/];
                }
            });
        });
    }

    var AUTOMATION_ERROR_TYPES = {
        elementIsInvisibleError: 'elementIsInvisibleError',
        foundElementIsNotTarget: 'foundElementIsNotTarget',
    };

    // NOTE: node description by node type
    var NODE_TYPE_DESCRIPTIONS = {
        1: 'element',
        2: 'attribute',
        3: 'text',
        4: 'cdata section',
        5: 'entity reference',
        6: 'entity node',
        7: 'processing instruction',
        8: 'comment',
        9: 'document',
        10: 'document type',
        11: 'document fragment',
        12: 'notation',
    };

    function getInvisibleErrorCtor(elementName) {
        return !elementName ? 'ActionElementIsInvisibleError' : {
            name: 'ActionAdditionalElementIsInvisibleError',
            firstArg: elementName,
        };
    }
    function getNotFoundErrorCtor(elementName) {
        return !elementName ? 'ActionElementNotFoundError' : {
            name: 'ActionAdditionalElementNotFoundError',
            firstArg: elementName,
        };
    }
    function getCannotObtainInfoErrorCtor() {
        return 'CannotObtainInfoForElementSpecifiedBySelectorError';
    }
    function createErrorCtorCallback(errCtor) {
        // @ts-ignore
        var Error = typeof errCtor === 'string' ? Errors[errCtor] : Errors[errCtor.name];
        var firstArg = typeof errCtor === 'string' ? null : errCtor.firstArg;
        return function (fn) { return new Error(firstArg, fn); };
    }

    var ElementsRetriever = /** @class */ (function () {
        function ElementsRetriever(globalSelectorTimeout, executeSelectorFn) {
            this._globalSelectorTimeout = globalSelectorTimeout;
            this._ensureElementsStartTime = hammerhead.nativeMethods.dateNow();
            this._ensureElementsPromise = hammerhead.Promise.resolve();
            this._executeSelectorFn = executeSelectorFn;
            this._elements = [];
        }
        ElementsRetriever.prototype.push = function (selector, elementName) {
            var _this = this;
            this._ensureElementsPromise = this._ensureElementsPromise
                .then(function () {
                return _this._executeSelectorFn(selector, {
                    invisible: getInvisibleErrorCtor(elementName),
                    notFound: getNotFoundErrorCtor(elementName),
                }, _this._ensureElementsStartTime);
            })
                .then(function (el) {
                if (!testcafeCore.domUtils.isDomElement(el)) {
                    var nodeType = el.nodeType;
                    var nodeTypeStr = NODE_TYPE_DESCRIPTIONS[nodeType];
                    if (!elementName)
                        throw new ActionSelectorMatchesWrongNodeTypeError(nodeTypeStr);
                    else
                        throw new ActionAdditionalSelectorMatchesWrongNodeTypeError(elementName, nodeTypeStr);
                }
                _this._elements.push(el);
            });
        };
        ElementsRetriever.prototype.getElements = function () {
            var _this = this;
            return this._ensureElementsPromise.then(function () { return _this._elements; });
        };
        return ElementsRetriever;
    }());

    function calcOffset(size) {
        var offset = size / 2;
        return offset < 1 ? 0 : Math.round(offset);
    }
    function getDefaultAutomationOffsets(element) {
        var rect = getElementRectangle(element);
        var offsetX = calcOffset(rect.width);
        var offsetY = calcOffset(rect.height);
        return { offsetX: offsetX, offsetY: offsetY };
    }
    function getOffsetOptions(element, offsetX, offsetY) {
        var defaultOffsets = getDefaultAutomationOffsets(element);
        offsetX = typeof offsetX === 'number' ? Math.round(offsetX) : defaultOffsets.offsetX;
        offsetY = typeof offsetY === 'number' ? Math.round(offsetY) : defaultOffsets.offsetY;
        if (offsetX > 0 && offsetY > 0)
            return { offsetX: offsetX, offsetY: offsetY };
        var dimensions = getClientDimensions(element);
        var width = Math.round(Math.max(element.scrollWidth, dimensions.width));
        var height = Math.round(Math.max(element.scrollHeight, dimensions.height));
        var maxX = dimensions.scrollbar.right + dimensions.border.left + dimensions.border.right + width;
        var maxY = dimensions.scrollbar.bottom + dimensions.border.top + dimensions.border.bottom + height;
        return {
            offsetX: offsetX < 0 ? maxX + offsetX : offsetX,
            offsetY: offsetY < 0 ? maxY + offsetY : offsetY,
        };
    }

    var MAX_DELAY_AFTER_EXECUTION = 2000;
    var CHECK_ELEMENT_IN_AUTOMATIONS_INTERVAL = 250;
    var ActionExecutor = /** @class */ (function (_super) {
        __extends(ActionExecutor, _super);
        function ActionExecutor(command, globalSelectorTimeout, testSpeed, executeSelectorFn) {
            var _this = this;
            var _a;
            _this = _super.call(this) || this;
            _this._command = command;
            _this._targetElement = null;
            _this._elements = [];
            _this._globalSelectorTimeout = globalSelectorTimeout;
            _this._executionStartTime = 0;
            _this._executeSelectorFn = executeSelectorFn;
            // TODO: move it to the server
            // @ts-ignore
            if (command.options && !command.options.speed) // @ts-ignore
                command.options.speed = testSpeed;
            // TODO: and this
            // @ts-ignore
            _this._commandSelectorTimeout = typeof ((_a = command.selector) === null || _a === void 0 ? void 0 : _a.timeout) === 'number' ? command.selector.timeout : globalSelectorTimeout;
            return _this;
        }
        ActionExecutor.prototype._delayAfterExecution = function () {
            // @ts-ignore TODO
            if (!this._command.options || this._command.options.speed === 1)
                return hammerhead.Promise.resolve();
            // @ts-ignore TODO
            return delay((1 - this._command.options.speed) * MAX_DELAY_AFTER_EXECUTION);
        };
        ActionExecutor.prototype._isExecutionTimeoutExpired = function () {
            return hammerhead.nativeMethods.dateNow() - this._executionStartTime >= this._commandSelectorTimeout;
        };
        ActionExecutor.prototype._ensureCommandArguments = function () {
            var handler = ActionExecutor.ACTIONS_HANDLERS[this._command.type];
            if (!(handler === null || handler === void 0 ? void 0 : handler.ensureCmdArgs))
                return;
            handler.ensureCmdArgs(this._command);
        };
        ActionExecutor.prototype._ensureCommandElements = function () {
            var _this = this;
            var _a;
            var elsRetriever = new ElementsRetriever(this._globalSelectorTimeout, this._executeSelectorFn);
            if (this._command.selector)
                // @ts-ignore TODO
                elsRetriever.push(this._command.selector);
            var additionalSelectorProps = (_a = ActionExecutor.ACTIONS_HANDLERS[this._command.type]) === null || _a === void 0 ? void 0 : _a.additionalSelectorProps;
            if (additionalSelectorProps) {
                for (var _i = 0, additionalSelectorProps_1 = additionalSelectorProps; _i < additionalSelectorProps_1.length; _i++) {
                    var prop = additionalSelectorProps_1[_i];
                    if (this._command[prop])
                        // @ts-ignore TODO
                        elsRetriever.push(this._command[prop], prop);
                }
            }
            return elsRetriever.getElements()
                .then(function (elements) {
                _this._elements = elements;
            });
        };
        ActionExecutor.prototype._ensureCommandElementsProperties = function () {
            var handler = ActionExecutor.ACTIONS_HANDLERS[this._command.type];
            if (!(handler === null || handler === void 0 ? void 0 : handler.ensureElsProps))
                return;
            handler.ensureElsProps(this._elements);
        };
        ActionExecutor.prototype._ensureCommandOptions = function () {
            return __awaiter(this, void 0, hammerhead.Promise, function () {
                var opts, _a, offsetX, offsetY;
                return __generator(this, function (_b) {
                    opts = this._command.options;
                    // @ts-ignore TODO
                    if (this._elements.length && opts && 'offsetX' in opts && 'offsetY' in opts) { // @ts-ignore
                        _a = getOffsetOptions(this._elements[0], opts.offsetX, opts.offsetY), offsetX = _a.offsetX, offsetY = _a.offsetY;
                        // @ts-ignore TODO
                        opts.offsetX = offsetX;
                        // @ts-ignore TODO
                        opts.offsetY = offsetY;
                    }
                    return [2 /*return*/];
                });
            });
        };
        ActionExecutor.prototype._createAutomation = function () {
            var handler = ActionExecutor.ACTIONS_HANDLERS[this._command.type];
            if (!handler)
                throw new Error("There is no handler for the \"".concat(this._command.type, "\" command."));
            return handler.create(this._command, this._elements);
        };
        ActionExecutor.prototype._runAction = function (strictElementCheck) {
            var _this = this;
            return this._ensureCommandElements()
                .then(function () { return _this._ensureCommandElementsProperties(); })
                .then(function () { return _this._ensureCommandOptions(); })
                .then(function () {
                var automation = _this._createAutomation();
                if (automation.WARNING_EVENT) {
                    automation.on(automation.WARNING_EVENT, function (warning) {
                        _this.emit(ActionExecutor.WARNING_EVENT, warning);
                    });
                }
                if (automation.TARGET_ELEMENT_FOUND_EVENT) {
                    automation.on(automation.TARGET_ELEMENT_FOUND_EVENT, function (e) {
                        _this._targetElement = e.element;
                        _this.emit(ActionExecutor.EXECUTION_STARTED_EVENT);
                    });
                }
                else
                    _this.emit(ActionExecutor.EXECUTION_STARTED_EVENT);
                return automation.run(strictElementCheck);
            });
        };
        ActionExecutor.prototype._runRecursively = function () {
            var _this = this;
            var actionFinished = false;
            var strictElementCheck = true;
            return whilst(function () { return !actionFinished; }, function () {
                return _this._runAction(strictElementCheck)
                    .then(function () {
                    actionFinished = true;
                })
                    .catch(function (err) {
                    if (!_this._isExecutionTimeoutExpired())
                        return delay(CHECK_ELEMENT_IN_AUTOMATIONS_INTERVAL);
                    if (err.message === AUTOMATION_ERROR_TYPES.foundElementIsNotTarget) {
                        // If we can't get a target element via elementFromPoint but it's
                        // visible we click on the point where the element is located.
                        strictElementCheck = false;
                        return hammerhead.Promise.resolve();
                    }
                    throw err.message === AUTOMATION_ERROR_TYPES.elementIsInvisibleError ?
                        new ActionElementIsInvisibleError() : err;
                });
            });
        };
        ActionExecutor.prototype.execute = function (barriers) {
            var _this = this;
            this._executionStartTime = hammerhead.nativeMethods.dateNow();
            try {
                // TODO: I think that this check is unnecessary here. It checks only a key sequence of the pressKey command.
                // This check can be moved to the server.
                this._ensureCommandArguments();
            }
            catch (err) {
                return hammerhead.Promise.reject(err);
            }
            this.emit(ActionExecutor.WAITING_FOR_ELEMENT_EVENT, this._commandSelectorTimeout);
            return this._runRecursively()
                .then(function () { return hammerhead.Promise.all([
                _this._delayAfterExecution(),
                barriers.wait(),
            ]); })
                .then(function () {
                var elements = __spreadArray([], _this._elements, true);
                if (_this._targetElement)
                    elements[0] = _this._targetElement;
                return elements;
            });
        };
        ActionExecutor.EXECUTION_STARTED_EVENT = 'execution-started';
        ActionExecutor.WAITING_FOR_ELEMENT_EVENT = 'waiting-for-elements';
        ActionExecutor.WARNING_EVENT = 'warning';
        ActionExecutor.ACTIONS_HANDLERS = {};
        return ActionExecutor;
    }(EventEmitter));

    // -------------------------------------------------------------
    // WARNING: this file is used by both the client and the server.
    // Do not use any browser or node-specific API!
    // -------------------------------------------------------------
    function limitNumber (value, min, max) {
        return Math.min(Math.max(min, value), max);
    }

    function determineDimensionBounds(bounds, maximum) {
        var hasMin = typeof bounds.min === 'number';
        var hasMax = typeof bounds.max === 'number';
        var hasLength = typeof bounds.length === 'number';
        if (hasLength)
            bounds.length = limitNumber(bounds.length, 0, maximum);
        if (hasMin && bounds.min < 0)
            bounds.min += maximum;
        if (hasMax && bounds.max < 0)
            bounds.max += maximum;
        if (!hasMin)
            bounds.min = hasMax && hasLength ? bounds.max - bounds.length : 0;
        if (!hasMax)
            bounds.max = hasLength ? bounds.min + bounds.length : maximum;
        bounds.min = limitNumber(bounds.min, 0, maximum);
        bounds.max = limitNumber(bounds.max, 0, maximum);
        bounds.length = bounds.max - bounds.min;
        return bounds;
    }
    function determineScrollPoint(cropStart, cropEnd, viewportBound) {
        return Math.round(cropStart + limitNumber(cropEnd - cropStart, 0, viewportBound) / 2);
    }
    function ensureCropOptions(element, options) {
        return __awaiter(this, void 0, void 0, function () {
            var elementRectangle, elementBounds, elementMargin, elementPadding, elementBordersWidth, scrollRight, scrollBottom, horizontalCropBounds, verticalCropBounds, viewportDimensions, hasScrollTargetX, hasScrollTargetY, _a, offsetX, offsetY, isScrollTargetXValid, isScrollTargetYValid;
            return __generator(this, function (_b) {
                elementRectangle = element.getBoundingClientRect();
                elementBounds = {
                    left: elementRectangle.left,
                    right: elementRectangle.right,
                    top: elementRectangle.top,
                    bottom: elementRectangle.bottom,
                };
                elementMargin = testcafeCore.styleUtils.getElementMargin(element);
                elementPadding = testcafeCore.styleUtils.getElementPadding(element);
                elementBordersWidth = testcafeCore.styleUtils.getBordersWidth(element);
                options.originOffset = { x: 0, y: 0 };
                scrollRight = elementBounds.left + element.scrollWidth + elementBordersWidth.left + elementBordersWidth.right;
                scrollBottom = elementBounds.top + element.scrollHeight + elementBordersWidth.top + elementBordersWidth.bottom;
                elementBounds.right = Math.max(elementBounds.right, scrollRight);
                elementBounds.bottom = Math.max(elementBounds.bottom, scrollBottom);
                if (!options.includeBorders || !options.includePaddings) {
                    options.originOffset.x += elementBordersWidth.left;
                    options.originOffset.y += elementBordersWidth.top;
                    elementBounds.left += elementBordersWidth.left;
                    elementBounds.top += elementBordersWidth.top;
                    elementBounds.right -= elementBordersWidth.right;
                    elementBounds.bottom -= elementBordersWidth.bottom;
                    if (!options.includePaddings) {
                        options.originOffset.x += elementPadding.left;
                        options.originOffset.y += elementPadding.top;
                        elementBounds.left += elementPadding.left;
                        elementBounds.top += elementPadding.top;
                        elementBounds.right -= elementPadding.right;
                        elementBounds.bottom -= elementPadding.bottom;
                    }
                }
                else if (options.includeMargins) {
                    options.originOffset.x -= elementMargin.left;
                    options.originOffset.y -= elementMargin.top;
                    elementBounds.left -= elementMargin.left;
                    elementBounds.top -= elementMargin.top;
                    elementBounds.right += elementMargin.right;
                    elementBounds.bottom += elementMargin.bottom;
                }
                elementBounds.width = elementBounds.right - elementBounds.left;
                elementBounds.height = elementBounds.bottom - elementBounds.top;
                horizontalCropBounds = determineDimensionBounds({ min: options.crop.left, max: options.crop.right, length: options.crop.width }, elementBounds.width);
                verticalCropBounds = determineDimensionBounds({ min: options.crop.top, max: options.crop.bottom, length: options.crop.height }, elementBounds.height);
                options.crop.left = horizontalCropBounds.min;
                options.crop.right = horizontalCropBounds.max;
                options.crop.width = horizontalCropBounds.length;
                options.crop.top = verticalCropBounds.min;
                options.crop.bottom = verticalCropBounds.max;
                options.crop.height = verticalCropBounds.length;
                if (options.crop.width <= 0 || options.crop.height <= 0)
                    throw new InvalidElementScreenshotDimensionsError(options.crop.width, options.crop.height);
                viewportDimensions = testcafeCore.styleUtils.getViewportDimensions();
                if (elementBounds.width > viewportDimensions.width || elementBounds.height > viewportDimensions.height)
                    options.scrollToCenter = true;
                hasScrollTargetX = typeof options.scrollTargetX === 'number';
                hasScrollTargetY = typeof options.scrollTargetY === 'number';
                if (!hasScrollTargetX)
                    options.scrollTargetX = determineScrollPoint(options.crop.left, options.crop.right, viewportDimensions.width);
                if (!hasScrollTargetY)
                    options.scrollTargetY = determineScrollPoint(options.crop.top, options.crop.bottom, viewportDimensions.height);
                _a = testcafeAutomation.getOffsetOptions(element, options.scrollTargetX, options.scrollTargetY), offsetX = _a.offsetX, offsetY = _a.offsetY;
                options.scrollTargetX = offsetX;
                options.scrollTargetY = offsetY;
                isScrollTargetXValid = !hasScrollTargetX || options.scrollTargetX >= options.crop.left && options.scrollTargetX <= options.crop.right;
                isScrollTargetYValid = !hasScrollTargetY || options.scrollTargetY >= options.crop.top && options.scrollTargetY <= options.crop.bottom;
                if (!isScrollTargetXValid || !isScrollTargetYValid)
                    throw new ActionInvalidScrollTargetError(isScrollTargetXValid, isScrollTargetYValid);
                return [2 /*return*/];
            });
        });
    }

    var CHECK_ELEMENT_DELAY = 200;

    var SelectorExecutor = /** @class */ (function (_super) {
        __extends(SelectorExecutor, _super);
        function SelectorExecutor(command, globalTimeout, startTime, createNotFoundError, createIsInvisibleError) {
            var _this = _super.call(this, command) || this;
            _this.createNotFoundError = createNotFoundError;
            _this.createIsInvisibleError = createIsInvisibleError;
            _this.timeout = typeof command.timeout === 'number' ? command.timeout : globalTimeout;
            _this.counterMode = _this.dependencies.filterOptions.counterMode;
            _this.getVisibleValueMode = _this.dependencies.filterOptions.getVisibleValueMode;
            _this.dependencies.selectorFilter = selectorFilter;
            if (startTime) {
                var elapsed = hammerhead.nativeMethods.dateNow() - startTime;
                _this.timeout = Math.max(_this.timeout - elapsed, 0);
            }
            var customDOMProperties = _this.dependencies.customDOMProperties;
            _this.replicator.addTransforms([
                new SelectorNodeTransform(customDOMProperties, command.instantiationCallsiteName),
            ]);
            return _this;
        }
        SelectorExecutor.prototype._createReplicator = function () {
            return createReplicator([
                new FunctionTransform(),
            ]);
        };
        SelectorExecutor.prototype._getTimeoutErrorParams = function () {
            var apiFnIndex = selectorFilter.error;
            var apiFnChain = this.command.apiFnChain;
            return { apiFnIndex: apiFnIndex, apiFnChain: apiFnChain };
        };
        SelectorExecutor.prototype._getTimeoutError = function (elementExists) {
            return elementExists ? this.createIsInvisibleError : this.createNotFoundError;
        };
        SelectorExecutor.prototype._validateElement = function (args, startTime) {
            var _this = this;
            return hammerhead.Promise.resolve()
                .then(function () { return _super.prototype._executeFn.call(_this, args); })
                .then(function (el) {
                var element = el;
                var isElementExists = !!element;
                var isElementVisible = !_this.command.visibilityCheck || element && visible(element);
                var isTimeout = hammerhead.nativeMethods.dateNow() - startTime >= _this.timeout;
                if (isElementExists && (isElementVisible || hammerhead.utils.dom.isShadowRoot(element)))
                    return element;
                if (!isTimeout)
                    return delay(CHECK_ELEMENT_DELAY).then(function () { return _this._validateElement(args, startTime); });
                var createTimeoutError = _this.getVisibleValueMode ? null : _this._getTimeoutError(isElementExists);
                if (createTimeoutError)
                    throw createTimeoutError(_this._getTimeoutErrorParams());
                return null;
            });
        };
        SelectorExecutor.prototype._executeFn = function (args) {
            if (this.counterMode)
                return _super.prototype._executeFn.call(this, args);
            return this._validateElement(args, hammerhead.nativeMethods.dateNow());
        };
        return SelectorExecutor;
    }(ClientFunctionExecutor));

    var DateCtor = hammerhead.nativeMethods.date;
    var ElementsRetriever$1 = /** @class */ (function () {
        function ElementsRetriever(elementDescriptors, globalSelectorTimeout) {
            var _this = this;
            this.elements = [];
            this.globalSelectorTimeout = globalSelectorTimeout;
            this.ensureElementsPromise = hammerhead.Promise.resolve();
            this.ensureElementsStartTime = new DateCtor();
            elementDescriptors.forEach(function (descriptor) { return _this._ensureElement(descriptor); });
        }
        ElementsRetriever.prototype._ensureElement = function (_a) {
            var _this = this;
            var selector = _a.selector, createNotFoundError = _a.createNotFoundError, createIsInvisibleError = _a.createIsInvisibleError, createHasWrongNodeTypeError = _a.createHasWrongNodeTypeError;
            this.ensureElementsPromise = this.ensureElementsPromise
                .then(function () {
                var selectorExecutor = new SelectorExecutor(selector, _this.globalSelectorTimeout, _this.ensureElementsStartTime, createNotFoundError, createIsInvisibleError);
                return selectorExecutor.getResult();
            })
                .then(function (el) {
                if (!testcafeCore.domUtils.isDomElement(el))
                    throw createHasWrongNodeTypeError(NODE_TYPE_DESCRIPTIONS[el.nodeType]);
                _this.elements.push(el);
            });
        };
        ElementsRetriever.prototype.getElements = function () {
            var _this = this;
            return this.ensureElementsPromise
                .then(function () { return _this.elements; });
        };
        return ElementsRetriever;
    }());
    function ensureElements(elementDescriptors, globalSelectorTimeout) {
        var elementsRetriever = new ElementsRetriever$1(elementDescriptors, globalSelectorTimeout);
        return elementsRetriever.getElements();
    }
    function createElementDescriptor(selector) {
        return {
            selector: selector,
            createNotFoundError: function (fn) { return new ActionElementNotFoundError(null, fn); },
            createIsInvisibleError: function () { return new ActionElementIsInvisibleError(); },
            createHasWrongNodeTypeError: function (nodeDescription) { return new ActionSelectorMatchesWrongNodeTypeError(nodeDescription); },
        };
    }

    function runWithBarriers (action) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var requestEmitter = new testcafeCore.ClientRequestEmitter();
        var requestBarrier = new testcafeCore.RequestBarrier(requestEmitter);
        var scriptEmitter = new testcafeCore.ScriptExecutionEmitter();
        var scriptExecutionBarrier = new testcafeCore.ScriptExecutionBarrier(scriptEmitter);
        testcafeCore.pageUnloadBarrier.watchForPageNavigationTriggers();
        var actionResult = null;
        var actionPromise = action.apply(void 0, args);
        var barriersPromise = actionPromise
            .then(function (result) {
            actionResult = result;
            return hammerhead.Promise.all([
                // NOTE: script can be added by xhr-request, so we should run
                // script execution barrier waiting after request barrier resolved
                requestBarrier
                    .wait()
                    .then(function () { return scriptExecutionBarrier.wait(); }),
                testcafeCore.pageUnloadBarrier.wait(),
            ]);
        })
            .then(function () { return actionResult; });
        return { actionPromise: actionPromise, barriersPromise: barriersPromise };
    }

    // -------------------------------------------------------------
    // WARNING: this file is used by both the client and the server.
    // Do not use any browser or node-specific API!
    // -------------------------------------------------------------
    function createIntegerValidator(ErrorCtor) {
        return function (name, val) {
            var valType = typeof val;
            if (valType !== 'number')
                throw new ErrorCtor(name, valType);
            var isInteger = !isNaN(val) &&
                isFinite(val) &&
                val === Math.floor(val);
            if (!isInteger)
                throw new ErrorCtor(name, val);
        };
    }
    function createPositiveIntegerValidator(ErrorCtor) {
        var integerValidator = createIntegerValidator(ErrorCtor);
        return function (name, val) {
            integerValidator(name, val);
            if (val < 0)
                throw new ErrorCtor(name, val);
        };
    }
    function createBooleanValidator(ErrorCtor) {
        return function (name, val) {
            var valType = typeof val;
            if (valType !== 'boolean')
                throw new ErrorCtor(name, valType);
        };
    }
    function createSpeedValidator(ErrorCtor) {
        return function (name, val) {
            var valType = typeof val;
            if (valType !== 'number')
                throw new ErrorCtor(name, valType);
            if (isNaN(val) || val < 0.01 || val > 1)
                throw new ErrorCtor(name, val);
        };
    }
    function createStringValidator(ErrorCtor) {
        return function (name, val) {
            var valType = typeof val;
            if (valType !== 'string')
                throw new ErrorCtor(name, valType);
        };
    }
    function createStringOrRegexValidator(ErrorCtor) {
        return function (name, val) {
            var valType = typeof val;
            if (valType !== 'string' && !(val instanceof RegExp))
                throw new ErrorCtor(name, valType);
        };
    }
    function createDateValidator(ErrorCtor) {
        return function (name, val) {
            if (!(val instanceof Date))
                throw new ErrorCtor(name, val);
        };
    }
    function createNumberValidator(ErrorCtor) {
        return function (name, val) {
            if (isNaN(Number(val)))
                throw new ErrorCtor(name, typeof val);
        };
    }
    function createUrlValidator(ErrorCtor) {
        return function (name, val) {
            var valType = typeof val;
            if (valType !== 'string' && !(val instanceof URL))
                throw new ErrorCtor(name, valType);
        };
    }
    function createUrlSearchParamsValidator(ErrorCtor) {
        return function (name, val) {
            var valType = typeof val;
            if (valType !== 'object' && !(val instanceof URLSearchParams))
                throw new ErrorCtor(name, valType);
        };
    }
    function createObjectValidator(ErrorCtor) {
        return function (name, val) {
            var valType = typeof val;
            if (valType !== 'object')
                throw new ErrorCtor(name, valType);
        };
    }
    function createFunctionValidator(ErrorCtor) {
        return function (name, val) {
            var valType = typeof val;
            if (valType !== 'function')
                throw new ErrorCtor(name, valType);
        };
    }

    // -------------------------------------------------------------
    var integerOption = createIntegerValidator(ActionIntegerOptionError);
    var positiveIntegerOption = createPositiveIntegerValidator(ActionPositiveIntegerOptionError);
    var booleanOption = createBooleanValidator(ActionBooleanOptionError);
    var speedOption = createSpeedValidator(ActionSpeedOptionError);
    var stringOption = createStringValidator(ActionStringOptionError);
    var stringOrRegexOption = createStringOrRegexValidator(ActionStringOrRegexOptionError);
    var dateOption = createDateValidator(ActionDateOptionError);
    var numberOption = createNumberValidator(ActionNumberOptionError);
    var urlOption = createUrlValidator(ActionUrlOptionError);
    var urlSearchParamsOption = createUrlSearchParamsValidator(ActionUrlSearchParamsOptionError);
    var objectOption = createObjectValidator(ActionObjectOptionError);
    var functionOption = createFunctionValidator(ActionFunctionOptionError);
    // Actions
    var ActionOptions = /** @class */ (function (_super) {
        __extends(ActionOptions, _super);
        function ActionOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this.speed = null;
            _this._assignFrom(obj, validate);
            return _this;
        }
        ActionOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'speed', type: speedOption },
            ];
        };
        return ActionOptions;
    }(Assignable));
    // Offset
    var OffsetOptions = /** @class */ (function (_super) {
        __extends(OffsetOptions, _super);
        function OffsetOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this.offsetX = null;
            _this.offsetY = null;
            _this._assignFrom(obj, validate);
            return _this;
        }
        OffsetOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'offsetX', type: integerOption },
                { name: 'offsetY', type: integerOption },
            ];
        };
        return OffsetOptions;
    }(ActionOptions));
    var ScrollOptions = /** @class */ (function (_super) {
        __extends(ScrollOptions, _super);
        function ScrollOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this.scrollToCenter = false;
            _this.skipParentFrames = false;
            _this._assignFrom(obj, validate);
            return _this;
        }
        ScrollOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'scrollToCenter', type: booleanOption },
                { name: 'skipParentFrames', type: booleanOption },
            ];
        };
        return ScrollOptions;
    }(OffsetOptions));
    var CropOptions = /** @class */ (function (_super) {
        __extends(CropOptions, _super);
        function CropOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this._assignFrom(obj, validate);
            return _this;
        }
        CropOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'left', type: integerOption, defaultValue: null },
                { name: 'right', type: integerOption, defaultValue: null },
                { name: 'top', type: integerOption, defaultValue: null },
                { name: 'bottom', type: integerOption, defaultValue: null },
            ];
        };
        return CropOptions;
    }(Assignable));
    // Element Screenshot
    var ElementScreenshotOptions = /** @class */ (function (_super) {
        __extends(ElementScreenshotOptions, _super);
        function ElementScreenshotOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this.scrollTargetX = null;
            _this.scrollTargetY = null;
            _this.includeMargins = false;
            _this.includeBorders = true;
            _this.includePaddings = true;
            _this.crop = {
                left: null,
                right: null,
                top: null,
                bottom: null,
            };
            _this._assignFrom(obj, validate);
            return _this;
        }
        ElementScreenshotOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'scrollTargetX', type: integerOption },
                { name: 'scrollTargetY', type: integerOption },
                { name: 'crop', type: objectOption, init: initCropOptions },
                { name: 'includeMargins', type: booleanOption },
                { name: 'includeBorders', type: booleanOption },
                { name: 'includePaddings', type: booleanOption },
            ];
        };
        return ElementScreenshotOptions;
    }(ActionOptions));
    var ModifiersOptions = /** @class */ (function (_super) {
        __extends(ModifiersOptions, _super);
        function ModifiersOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this._assignFrom(obj, validate);
            return _this;
        }
        ModifiersOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'ctrl', type: booleanOption, defaultValue: false },
                { name: 'alt', type: booleanOption, defaultValue: false },
                { name: 'shift', type: booleanOption, defaultValue: false },
                { name: 'meta', type: booleanOption, defaultValue: false },
            ];
        };
        return ModifiersOptions;
    }(Assignable));
    // Mouse
    var MouseOptions = /** @class */ (function (_super) {
        __extends(MouseOptions, _super);
        function MouseOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this.modifiers = {
                ctrl: false,
                alt: false,
                shift: false,
                meta: false,
            };
            _this._assignFrom(obj, validate);
            return _this;
        }
        MouseOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'modifiers', type: objectOption, init: initModifiersOptions },
            ];
        };
        return MouseOptions;
    }(OffsetOptions));
    // Click
    var ClickOptions = /** @class */ (function (_super) {
        __extends(ClickOptions, _super);
        function ClickOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this.caretPos = null;
            _this._assignFrom(obj, validate);
            return _this;
        }
        ClickOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'caretPos', type: positiveIntegerOption },
            ];
        };
        return ClickOptions;
    }(MouseOptions));
    // Move
    var MoveOptions = /** @class */ (function (_super) {
        __extends(MoveOptions, _super);
        function MoveOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this.speed = null;
            _this.minMovingTime = null;
            _this.holdLeftButton = false;
            _this.skipScrolling = false;
            _this.skipDefaultDragBehavior = false;
            _this._assignFrom(obj, validate);
            return _this;
        }
        MoveOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'speed' },
                { name: 'minMovingTime' },
                { name: 'holdLeftButton' },
                { name: 'skipScrolling', type: booleanOption },
                { name: 'skipDefaultDragBehavior', type: booleanOption },
            ];
        };
        return MoveOptions;
    }(MouseOptions));
    // Type
    var TypeOptions = /** @class */ (function (_super) {
        __extends(TypeOptions, _super);
        function TypeOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this.replace = false;
            _this.paste = false;
            _this.confidential = void 0;
            _this._assignFrom(obj, validate);
            return _this;
        }
        TypeOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'replace', type: booleanOption },
                { name: 'paste', type: booleanOption },
                { name: 'confidential', type: booleanOption },
            ];
        };
        return TypeOptions;
    }(ClickOptions));
    // DragToElement
    var DragToElementOptions = /** @class */ (function (_super) {
        __extends(DragToElementOptions, _super);
        function DragToElementOptions(obj, validate) {
            var _this = _super.call(this, obj, validate) || this;
            _this.destinationOffsetX = null;
            _this.destinationOffsetY = null;
            _this._assignFrom(obj, validate);
            return _this;
        }
        DragToElementOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'destinationOffsetX', type: integerOption },
                { name: 'destinationOffsetY', type: integerOption },
            ];
        };
        return DragToElementOptions;
    }(MouseOptions));
    //ResizeToFitDevice
    var ResizeToFitDeviceOptions = /** @class */ (function (_super) {
        __extends(ResizeToFitDeviceOptions, _super);
        function ResizeToFitDeviceOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this.portraitOrientation = false;
            _this._assignFrom(obj, validate);
            return _this;
        }
        ResizeToFitDeviceOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'portraitOrientation', type: booleanOption },
            ];
        };
        return ResizeToFitDeviceOptions;
    }(Assignable));
    //Assertion
    var AssertionOptions = /** @class */ (function (_super) {
        __extends(AssertionOptions, _super);
        function AssertionOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this.timeout = void 0;
            _this.allowUnawaitedPromise = false;
            _this._assignFrom(obj, validate);
            return _this;
        }
        AssertionOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'timeout', type: positiveIntegerOption },
                { name: 'allowUnawaitedPromise', type: booleanOption },
            ];
        };
        return AssertionOptions;
    }(Assignable));
    // Press
    var PressOptions = /** @class */ (function (_super) {
        __extends(PressOptions, _super);
        function PressOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this.confidential = void 0;
            _this._assignFrom(obj, validate);
            return _this;
        }
        PressOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'confidential', type: booleanOption },
            ];
        };
        return PressOptions;
    }(ActionOptions));
    // Cookie
    var CookieOptions = /** @class */ (function (_super) {
        __extends(CookieOptions, _super);
        function CookieOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this._assignFrom(obj, validate);
            return _this;
        }
        CookieOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'name', type: stringOption },
                { name: 'value', type: stringOption },
                { name: 'domain', type: stringOption },
                { name: 'path', type: stringOption },
                { name: 'expires', type: dateOption },
                { name: 'maxAge', type: numberOption },
                { name: 'secure', type: booleanOption },
                { name: 'httpOnly', type: booleanOption },
                { name: 'sameSite', type: stringOption },
            ];
        };
        return CookieOptions;
    }(Assignable));
    var RequestAuthOptions = /** @class */ (function (_super) {
        __extends(RequestAuthOptions, _super);
        function RequestAuthOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this._assignFrom(obj, validate);
            return _this;
        }
        RequestAuthOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'username', type: stringOption, required: true },
                { name: 'password', type: stringOption },
            ];
        };
        return RequestAuthOptions;
    }(Assignable));
    var RequestProxyOptions = /** @class */ (function (_super) {
        __extends(RequestProxyOptions, _super);
        function RequestProxyOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this._assignFrom(obj, validate);
            return _this;
        }
        RequestProxyOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'protocol', type: stringOption },
                { name: 'host', type: stringOption, required: true },
                { name: 'port', type: numberOption, required: true },
                { name: 'auth', type: objectOption, init: initRequestAuthOption },
            ];
        };
        return RequestProxyOptions;
    }(Assignable));
    var RequestOptions = /** @class */ (function (_super) {
        __extends(RequestOptions, _super);
        function RequestOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this._assignFrom(obj, validate);
            return _this;
        }
        RequestOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'url', type: urlOption },
                { name: 'method', type: stringOption },
                { name: 'headers', type: objectOption },
                { name: 'params', type: urlSearchParamsOption },
                { name: 'body' },
                { name: 'timeout', type: numberOption },
                { name: 'withCredentials', type: booleanOption },
                { name: 'auth', type: objectOption, init: initRequestAuthOption },
                { name: 'proxy', type: objectOption, init: initRequestProxyOptions },
                { name: 'rawResponse', type: booleanOption },
            ];
        };
        return RequestOptions;
    }(Assignable));
    var GetProxyUrlOptions = /** @class */ (function (_super) {
        __extends(GetProxyUrlOptions, _super);
        function GetProxyUrlOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this._assignFrom(obj, validate);
            return _this;
        }
        GetProxyUrlOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'credentials', type: numberOption },
            ];
        };
        return GetProxyUrlOptions;
    }(Assignable));
    var SkipJsErrorsOptions = /** @class */ (function (_super) {
        __extends(SkipJsErrorsOptions, _super);
        function SkipJsErrorsOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this._assignFrom(obj, validate);
            return _this;
        }
        SkipJsErrorsOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'stack', type: stringOrRegexOption, required: false },
                { name: 'message', type: stringOrRegexOption, required: false },
                { name: 'pageUrl', type: stringOrRegexOption, required: false },
            ];
        };
        return SkipJsErrorsOptions;
    }(Assignable));
    var SkipJsErrorsCallbackWithOptions = /** @class */ (function (_super) {
        __extends(SkipJsErrorsCallbackWithOptions, _super);
        function SkipJsErrorsCallbackWithOptions(obj, validate) {
            var _this = _super.call(this) || this;
            _this._assignFrom(obj, validate);
            return _this;
        }
        SkipJsErrorsCallbackWithOptions.prototype.getAssignableProperties = function () {
            return [
                { name: 'fn', type: functionOption, required: true },
                { name: 'dependencies', type: objectOption, required: false },
            ];
        };
        return SkipJsErrorsCallbackWithOptions;
    }(Assignable));
    // Initializers
    function initRequestAuthOption(name, val, initOptions, validate) {
        if (validate === void 0) { validate = true; }
        return new RequestAuthOptions(val, validate);
    }
    function initRequestProxyOptions(name, val, initOptions, validate) {
        if (validate === void 0) { validate = true; }
        return new RequestProxyOptions(val, validate);
    }
    function initCropOptions(name, val, initOptions, validate) {
        if (validate === void 0) { validate = true; }
        return new CropOptions(val, validate);
    }
    function initModifiersOptions(name, val, initOptions, validate) {
        if (validate === void 0) { validate = true; }
        return new ModifiersOptions(val, validate);
    }

    function isIframeWindow(window) {
        return window.top !== window;
    }

    var messageSandbox$1 = hammerhead.eventSandbox.message;
    var HIDING_UI_RELAYOUT_DELAY = 500;
    var POSSIBLE_RESIZE_ERROR_DELAY = 200;
    var MANIPULATION_REQUEST_CMD = 'driver|browser-manipulation|request';
    var MANIPULATION_RESPONSE_CMD = 'driver|browser-manipulation|response';
    // Setup cross-iframe interaction
    messageSandbox$1.on(messageSandbox$1.SERVICE_MSG_RECEIVED_EVENT, function (e) {
        if (e.message.cmd === MANIPULATION_REQUEST_CMD) {
            var element = testcafeCore.domUtils.findIframeByWindow(e.source);
            var _a = e.message, command = _a.command, cropDimensions = _a.cropDimensions;
            if (cropDimensions)
                command.options = new ElementScreenshotOptions({ crop: cropDimensions, includePaddings: false });
            var manipulation = new ManipulationExecutor(command);
            manipulation.element = element;
            manipulation
                .execute()
                .then(function (result) { return messageSandbox$1.sendServiceMsg({ cmd: MANIPULATION_RESPONSE_CMD, result: result }, e.source); });
        }
    });
    var ManipulationExecutor = /** @class */ (function () {
        function ManipulationExecutor(command, globalSelectorTimeout, statusBar) {
            this.command = command;
            this.globalSelectorTimeout = globalSelectorTimeout;
            this.statusBar = statusBar;
            this.element = null;
        }
        ManipulationExecutor.prototype._getAbsoluteCropValues = function () {
            var _a = this.element.getBoundingClientRect(), top = _a.top, left = _a.left;
            left += this.command.options.originOffset.x;
            top += this.command.options.originOffset.y;
            var right = left + this.command.options.crop.right;
            var bottom = top + this.command.options.crop.bottom;
            top += this.command.options.crop.top;
            left += this.command.options.crop.left;
            return { top: top, left: left, bottom: bottom, right: right };
        };
        ManipulationExecutor.prototype._createManipulationReadyMessage = function () {
            var dpr = window.devicePixelRatio || 1;
            var message = {
                cmd: TEST_RUN_MESSAGES.readyForBrowserManipulation,
                pageDimensions: {
                    dpr: dpr,
                    innerWidth: window.innerWidth,
                    innerHeight: window.innerHeight,
                    documentWidth: document.documentElement.clientWidth,
                    documentHeight: document.documentElement.clientHeight,
                    bodyWidth: document.body.clientWidth,
                    bodyHeight: document.body.clientHeight,
                },
                disableResending: true,
            };
            if (this.command.type === COMMAND_TYPE.takeElementScreenshot)
                message.cropDimensions = this._getAbsoluteCropValues();
            return message;
        };
        ManipulationExecutor.prototype._runScrollBeforeScreenshot = function () {
            var _this = this;
            return hammerhead.Promise
                .resolve()
                .then(function () {
                if (_this.element || !_this.command.selector)
                    return hammerhead.Promise.resolve();
                var selectorTimeout = _this.command.selector.timeout;
                var specificSelectorTimeout = typeof selectorTimeout === 'number' ? selectorTimeout : _this.globalSelectorTimeout;
                _this.statusBar.showWaitingElementStatus(specificSelectorTimeout);
                return ensureElements([createElementDescriptor(_this.command.selector)], _this.globalSelectorTimeout)
                    .then(function (elements) {
                    _this.statusBar.hideWaitingElementStatus();
                    _this.element = elements[0];
                })
                    .catch(function (error) {
                    _this.statusBar.hideWaitingElementStatus();
                    throw error;
                });
            })
                .then(function () { return ensureCropOptions(_this.element, _this.command.options); })
                .then(function () {
                var _a = _this.command.options, scrollTargetX = _a.scrollTargetX, scrollTargetY = _a.scrollTargetY, scrollToCenter = _a.scrollToCenter;
                var scrollAutomation = new testcafeCore.ScrollAutomation(_this.element, new ScrollOptions({
                    offsetX: scrollTargetX,
                    offsetY: scrollTargetY,
                    scrollToCenter: scrollToCenter,
                    skipParentFrames: true,
                }));
                return scrollAutomation.run();
            });
        };
        ManipulationExecutor.prototype._hideUI = function () {
            testcafeUi.hide();
            if (this.command.markData)
                testcafeUi.showScreenshotMark(this.command.markData);
            return testcafeCore.delay(HIDING_UI_RELAYOUT_DELAY);
        };
        ManipulationExecutor.prototype._showUI = function () {
            if (this.command.markData)
                testcafeUi.hideScreenshotMark();
            testcafeUi.show();
        };
        ManipulationExecutor.prototype._requestManipulation = function () {
            if (!isIframeWindow(window))
                return hammerhead.transport.queuedAsyncServiceMsg(this._createManipulationReadyMessage());
            var cropDimensions = this._getAbsoluteCropValues();
            var iframeRequestPromise = testcafeCore.sendRequestToFrame({
                cmd: MANIPULATION_REQUEST_CMD,
                command: this.command,
                cropDimensions: cropDimensions,
            }, MANIPULATION_RESPONSE_CMD, window.parent);
            return iframeRequestPromise
                .then(function (message) {
                if (!message.result)
                    return { result: null };
                var _a = message.result, result = _a.result, executionError = _a.executionError;
                if (executionError)
                    throw executionError;
                return { result: result };
            });
        };
        ManipulationExecutor.prototype._runManipulation = function () {
            var _this = this;
            var manipulationResult = null;
            return hammerhead.Promise
                .resolve()
                .then(function () {
                if (_this.command.type !== COMMAND_TYPE.takeElementScreenshot)
                    return hammerhead.Promise.resolve();
                testcafeCore.scrollController.stopPropagation();
                return _this._runScrollBeforeScreenshot();
            })
                .then(function () {
                if (!isIframeWindow(window))
                    return _this._hideUI();
                return hammerhead.Promise.resolve();
            })
                .then(function () { return _this._requestManipulation(); })
                .then(function (_a) {
                var result = _a.result, error = _a.error;
                if (error)
                    throw error;
                testcafeCore.scrollController.enablePropagation();
                manipulationResult = result;
                if (!isIframeWindow(window))
                    _this._showUI();
                return testcafeCore.delay(POSSIBLE_RESIZE_ERROR_DELAY);
            })
                .then(function () { return new DriverStatus({ isCommandResult: true, result: manipulationResult }); })
                .catch(function (err) {
                testcafeCore.scrollController.enablePropagation();
                return new DriverStatus({ isCommandResult: true, executionError: err });
            });
        };
        ManipulationExecutor.prototype.execute = function () {
            var _this = this;
            var barriersPromise = runWithBarriers(function () { return _this._runManipulation(); }).barriersPromise;
            return barriersPromise;
        };
        return ManipulationExecutor;
    }());
    function executeManipulationCommand (command, globalSelectorTimeout, statusBar) {
        var manipulationExecutor = new ManipulationExecutor(command, globalSelectorTimeout, statusBar);
        return manipulationExecutor.execute();
    }

    function executeNavigateTo(command) {
        return __awaiter(this, void 0, void 0, function () {
            var requestEmitter, requestBarrier, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requestEmitter = new testcafeCore.ClientRequestEmitter();
                        requestBarrier = new testcafeCore.RequestBarrier(requestEmitter);
                        hammerhead.navigateTo(command.url, command.forceReload);
                        return [4 /*yield*/, hammerhead.Promise.all([requestBarrier.wait(), testcafeCore.pageUnloadBarrier.wait()])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new DriverStatus({ isCommandResult: true })];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, new DriverStatus({ isCommandResult: true, executionError: error_1 })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }

    function getExecutorResultDriverStatus(executor) {
        return executor
            .getResult()
            .then(function (result) { return new DriverStatus({
            isCommandResult: true,
            result: executor.encodeResult(result),
        }); })
            .catch(function (err) { return new DriverStatus({
            isCommandResult: true,
            executionError: err,
        }); });
    }

    function getResult(command, globalTimeout, startTime, createNotFoundError, createIsInvisibleError, statusBar) {
        var selectorExecutor = new SelectorExecutor(command, globalTimeout, startTime, createNotFoundError, createIsInvisibleError);
        statusBar.showWaitingElementStatus(selectorExecutor.timeout);
        return selectorExecutor.getResult()
            .then(function (el) {
            return statusBar.hideWaitingElementStatus(!!el)
                .then(function () { return el; });
        })
            .catch(function (err) {
            return statusBar.hideWaitingElementStatus(false)
                .then(function () {
                throw err;
            });
        });
    }
    function getResultDriverStatus(command, globalTimeout, startTime, createNotFoundError, createIsInvisibleError, statusBar) {
        var selectorExecutor = new SelectorExecutor(command, globalTimeout, startTime, createNotFoundError, createIsInvisibleError);
        statusBar.showWaitingElementStatus(selectorExecutor.timeout);
        return getExecutorResultDriverStatus(selectorExecutor)
            .then(function (status) {
            return statusBar.hideWaitingElementStatus(!!status.result)
                .then(function () { return status; });
        });
    }

    var Promise$1 = hammerhead__default.Promise;
    function executeChildWindowDriverLinkSelector(selector, childWindowLinks) {
        if (typeof selector === 'string') {
            var foundChildWindowDriverLink = testcafeCore.arrayUtils.find(childWindowLinks, function (link) { return link.windowId === selector; });
            if (!foundChildWindowDriverLink) {
                var error = new ChildWindowNotFoundError();
                return Promise$1.reject(error);
            }
            // NOTE: We cannot pass the driver window of the found child window driver link
            // because the current Promise implementation checks the type of the value passed to the 'resolve' function.
            // It causes an unhandled JavaScript error on accessing to cross-domain iframe.
            return Promise$1.resolve(foundChildWindowDriverLink);
        }
        // TODO:  Query url and title properties of the all driverLinks' windows
        return Promise$1.resolve(null);
    }

    var ChildWindowDriverLink = /** @class */ (function () {
        function ChildWindowDriverLink(driverWindow, windowId) {
            this._isNonPageWindow = false;
            this.driverWindow = driverWindow;
            this.windowId = windowId;
        }
        ChildWindowDriverLink.prototype.setAsMaster = function (finalizePendingCommand) {
            var _this = this;
            var msg = new SetAsMasterMessage(finalizePendingCommand);
            return sendMessageToDriver(msg, this.driverWindow, WAIT_FOR_WINDOW_DRIVER_RESPONSE_TIMEOUT, CannotSwitchToWindowError)
                .catch(function (err) {
                if (_this._isNonPageWindow)
                    return;
                throw err;
            });
        };
        ChildWindowDriverLink.prototype.closeAllChildWindows = function () {
            var msg = new CloseAllChildWindowsMessage();
            return sendMessageToDriver(msg, this.driverWindow, WAIT_FOR_WINDOW_DRIVER_RESPONSE_TIMEOUT, CloseChildWindowError);
        };
        ChildWindowDriverLink.prototype.findChildWindows = function (options, MessageCtor) {
            var msg = new MessageCtor(options);
            return sendMessageToDriver(msg, this.driverWindow, WAIT_FOR_WINDOW_DRIVER_RESPONSE_TIMEOUT, CannotSwitchToWindowError);
        };
        ChildWindowDriverLink.prototype.startToRestore = function () {
            var msg = new StartToRestoreChildLinkMessage();
            return sendMessageToDriver(msg, this.driverWindow, WAIT_FOR_WINDOW_DRIVER_RESPONSE_TIMEOUT, CannotSwitchToWindowError);
        };
        ChildWindowDriverLink.prototype.closeFileDownloadingWindow = function () {
            this._isNonPageWindow = true;
            this.driverWindow.close();
        };
        return ChildWindowDriverLink;
    }());

    var ParentWindowDriverLink = /** @class */ (function () {
        function ParentWindowDriverLink(currentDriverWindow) {
            this.currentDriverWindow = currentDriverWindow;
        }
        ParentWindowDriverLink.prototype._getTopOpenedWindow = function (wnd) {
            var topOpened = wnd;
            while (topOpened.opener)
                topOpened = topOpened.opener;
            return topOpened.top;
        };
        ParentWindowDriverLink.prototype._setAsMaster = function (wnd, finalizePendingCommand) {
            var msg = new SetAsMasterMessage(finalizePendingCommand);
            return sendMessageToDriver(msg, wnd, WAIT_FOR_WINDOW_DRIVER_RESPONSE_TIMEOUT, CannotSwitchToWindowError);
        };
        ParentWindowDriverLink.prototype.getTopOpenedWindow = function () {
            return this._getTopOpenedWindow(this.currentDriverWindow);
        };
        ParentWindowDriverLink.prototype.setTopOpenedWindowAsMaster = function () {
            var wnd = this._getTopOpenedWindow(this.currentDriverWindow);
            return this._setAsMaster(wnd);
        };
        ParentWindowDriverLink.prototype.setParentWindowAsMaster = function (opts) {
            if (opts === void 0) { opts = {}; }
            var wnd = this.currentDriverWindow.opener;
            return this._setAsMaster(wnd, opts.finalizePendingCommand);
        };
        ParentWindowDriverLink.prototype.restoreChild = function (windowId) {
            return __awaiter(this, void 0, void 0, function () {
                var msg, wnd;
                return __generator(this, function (_a) {
                    msg = new RestoreChildLinkMessage(windowId);
                    wnd = this.currentDriverWindow.opener;
                    sendMessageToDriver(msg, wnd, WAIT_FOR_WINDOW_DRIVER_RESPONSE_TIMEOUT, CannotSwitchToWindowError);
                    return [2 /*return*/];
                });
            });
        };
        return ParentWindowDriverLink;
    }());

    var DriverRole = {
        master: 'master',
        replica: 'replica',
    };

    var SelectorElementActionTransform = /** @class */ (function () {
        function SelectorElementActionTransform() {
            this.type = 'Node';
        }
        SelectorElementActionTransform.prototype.shouldTransform = function (type, val) {
            return val instanceof hammerhead.nativeMethods.Node;
        };
        SelectorElementActionTransform.prototype.toSerializable = function (node) {
            return new ElementActionSnapshot(node);
        };
        SelectorElementActionTransform.prototype.fromSerializable = function () {
        };
        return SelectorElementActionTransform;
    }());

    var REQUESTS_COLLECTION_DELAY_DEFAULT = 50;
    var RequestBarrier = /** @class */ (function () {
        function RequestBarrier(emitter, delays) {
            if (delays === void 0) { delays = {}; }
            var _a, _b, _c;
            this._delays = {
                requestsCollection: (_a = delays.requestsCollection) !== null && _a !== void 0 ? _a : REQUESTS_COLLECTION_DELAY_DEFAULT,
                additionalRequestsCollection: (_b = delays.additionalRequestsCollection) !== null && _b !== void 0 ? _b : REQUESTS_COLLECTION_DELAY_DEFAULT,
                pageInitialRequestsCollection: (_c = delays.pageInitialRequestsCollection) !== null && _c !== void 0 ? _c : REQUESTS_COLLECTION_DELAY_DEFAULT,
            };
            this._emitter = emitter;
            this._waitResolve = null;
            this._watchdog = null;
            this._requests = new Set();
            this._collectingReqs = true;
            this._startListening();
        }
        RequestBarrier.prototype._startListening = function () {
            var _this = this;
            this._emitter.onRequestSend(function (req) { return _this._onRequestSend(req); });
            this._emitter.onRequestCompleted(function (req) { return _this._onRequestCompleted(req); });
            this._emitter.onRequestError(function (req) { return _this._onRequestError(req); });
        };
        RequestBarrier.prototype._offListening = function () {
            this._emitter.offAll();
        };
        RequestBarrier.prototype._onRequestSend = function (req) {
            if (this._collectingReqs)
                this._requests.add(req);
        };
        RequestBarrier.prototype._onRequestCompleted = function (req) {
            var _this = this;
            // NOTE: let the last real XHR handler finish its job and try to obtain
            // any additional requests if they were initiated by this handler
            delay(this._delays.additionalRequestsCollection)
                .then(function () { return _this._onRequestFinished(req); });
        };
        RequestBarrier.prototype._onRequestFinished = function (req) {
            if (!this._requests.has(req))
                return;
            this._requests.delete(req);
            if (!this._collectingReqs && !this._requests.size && this._watchdog)
                this._finishWaiting();
        };
        RequestBarrier.prototype._onRequestError = function (req) {
            this._onRequestFinished(req);
        };
        RequestBarrier.prototype._finishWaiting = function () {
            if (this._watchdog) {
                var clearTimeout_1 = hammerhead.nativeMethods.clearTimeout;
                clearTimeout_1(this._watchdog);
                this._watchdog = null;
            }
            this._requests.clear();
            this._offListening();
            this._waitResolve(); // eslint-disable-line @typescript-eslint/no-non-null-assertion
        };
        RequestBarrier.prototype.wait = function (isPageLoad) {
            var _this = this;
            return delay(isPageLoad ? this._delays.pageInitialRequestsCollection : this._delays.requestsCollection)
                .then(function () { return new hammerhead.Promise(function (resolve) {
                _this._collectingReqs = false;
                _this._waitResolve = resolve;
                if (!_this._requests.size) {
                    _this._finishWaiting();
                    return;
                }
                var setTimeout = hammerhead.nativeMethods.setTimeout;
                _this._watchdog = setTimeout(function () { return _this._finishWaiting(); }, RequestBarrier.TIMEOUT);
            }); });
        };
        RequestBarrier.TIMEOUT = 3000;
        return RequestBarrier;
    }());

    var WAIT_FOR_NEW_SCRIPTS_DELAY = 25;
    var ScriptExecutionBarrier = /** @class */ (function () {
        function ScriptExecutionBarrier(emitter) {
            this._emitter = emitter;
            this._watchdog = null;
            this._waitResolve = null;
            this._scripts = new Map();
            this._startListening();
        }
        ScriptExecutionBarrier.prototype._startListening = function () {
            var _this = this;
            this._emitter.onScriptAdded(function (script) { return _this._onScriptElementAdded(script); });
            this._emitter.onScriptLoadedOrFailed(function (script) { return _this._onScriptLoadedOrFailed(script); });
        };
        ScriptExecutionBarrier.prototype._offListening = function () {
            this._emitter.offAll();
        };
        ScriptExecutionBarrier.prototype._onScriptElementAdded = function (script) {
            var _this = this;
            var setTimeout = hammerhead.nativeMethods.setTimeout;
            var timeoutFn = function () { return _this._onScriptLoadedOrFailed(script, true); };
            var loadingTimeout = setTimeout(timeoutFn, ScriptExecutionBarrier.LOADING_TIMEOUT);
            this._scripts.set(script, loadingTimeout);
        };
        ScriptExecutionBarrier.prototype._onScriptLoadedOrFailed = function (script, isTimeout) {
            var _this = this;
            if (isTimeout === void 0) { isTimeout = false; }
            if (!this._scripts.has(script))
                return;
            if (!isTimeout) {
                var clearTimeout_1 = hammerhead.nativeMethods.clearTimeout;
                clearTimeout_1(this._scripts.get(script));
            }
            this._scripts.delete(script);
            if (this._scripts.size)
                return;
            delay(WAIT_FOR_NEW_SCRIPTS_DELAY)
                .then(function () {
                if (_this._waitResolve && !_this._scripts.size)
                    _this._finishWaiting();
            });
        };
        ScriptExecutionBarrier.prototype._finishWaiting = function () {
            if (this._watchdog) {
                var clearTimeout_2 = hammerhead.nativeMethods.clearTimeout;
                clearTimeout_2(this._watchdog);
                this._watchdog = null;
            }
            this._scripts.clear();
            this._offListening();
            this._waitResolve(); // eslint-disable-line @typescript-eslint/no-non-null-assertion
            this._waitResolve = null;
        };
        ScriptExecutionBarrier.prototype.wait = function () {
            var _this = this;
            return new hammerhead.Promise(function (resolve) {
                _this._waitResolve = resolve;
                if (!_this._scripts.size) {
                    _this._finishWaiting();
                    return;
                }
                var setTimeout = hammerhead.nativeMethods.setTimeout;
                _this._watchdog = setTimeout(function () { return _this._finishWaiting(); }, ScriptExecutionBarrier.TIMEOUT);
            });
        };
        ScriptExecutionBarrier.TIMEOUT = 3000;
        ScriptExecutionBarrier.LOADING_TIMEOUT = 2000;
        return ScriptExecutionBarrier;
    }());

    var BarriersComplex = /** @class */ (function () {
        function BarriersComplex(reqEmitter, scriptEmitter, unloadBarrier) {
            this._requestBarrier = new RequestBarrier(reqEmitter);
            this._scriptExecutionBarrier = new ScriptExecutionBarrier(scriptEmitter);
            this._unloadBarrier = unloadBarrier;
            if (unloadBarrier.watchForPageNavigationTriggers)
                unloadBarrier.watchForPageNavigationTriggers();
        }
        BarriersComplex.prototype.wait = function () {
            var _this = this;
            return hammerhead.Promise.all([
                // NOTE: script can be added by xhr-request, so we should run
                // script execution barrier waiting after request barrier resolved
                this._requestBarrier.wait()
                    .then(function () { return _this._scriptExecutionBarrier.wait(); }),
                this._unloadBarrier.wait(),
            ]).then();
        };
        return BarriersComplex;
    }());

    ActionExecutor.ACTIONS_HANDLERS[COMMAND_TYPE.dispatchEvent] = {
        additionalSelectorProps: ['relatedTarget'],
        create: function (command, elements) {
            if (elements[1]) // @ts-ignore
                command.options.relatedTarget = elements[1];
            return new testcafeAutomation.DispatchEvent(elements[0], command.eventName, command.options);
        },
    };
    ActionExecutor.ACTIONS_HANDLERS[COMMAND_TYPE.pressKey] = {
        create: function (command) { return new testcafeAutomation.Press(testcafeCore.parseKeySequence(command.keys).combinations, command.options); },
        ensureCmdArgs: function (command) {
            var parsedKeySequence = testcafeCore.parseKeySequence(command.keys);
            if (parsedKeySequence.error)
                throw new ActionIncorrectKeysError('keys');
        },
    };
    ActionExecutor.ACTIONS_HANDLERS[COMMAND_TYPE.click] = {
        create: function (command, elements) {
            if (/option|optgroup/.test(testcafeCore.domUtils.getTagName(elements[0])))
                return new testcafeAutomation.SelectChildClick(elements[0], command.options);
            return new testcafeAutomation.Click(elements[0], command.options, window, testcafeAutomation.cursor);
        },
    };
    ActionExecutor.ACTIONS_HANDLERS[COMMAND_TYPE.rightClick] = {
        create: function (command, elements) { return new testcafeAutomation.RClick(elements[0], command.options); },
    };
    ActionExecutor.ACTIONS_HANDLERS[COMMAND_TYPE.doubleClick] = {
        create: function (command, elements) { return new testcafeAutomation.DblClick(elements[0], command.options); },
    };
    ActionExecutor.ACTIONS_HANDLERS[COMMAND_TYPE.hover] = {
        create: function (command, elements) { return new testcafeAutomation.Hover(elements[0], command.options); },
    };
    ActionExecutor.ACTIONS_HANDLERS[COMMAND_TYPE.drag] = {
        create: function (command, elements) {
            return new testcafeAutomation.DragToOffset(elements[0], command.dragOffsetX, command.dragOffsetY, command.options);
        },
    };
    ActionExecutor.ACTIONS_HANDLERS[COMMAND_TYPE.dragToElement] = {
        additionalSelectorProps: ['destinationSelector'],
        create: function (command, elements) {
            return new testcafeAutomation.DragToElement(elements[0], elements[1], command.options);
        },
    };
    ActionExecutor.ACTIONS_HANDLERS[COMMAND_TYPE.scroll] = {
        create: function (command, elements) {
            var x = command.x, y = command.y, position = command.position, options = command.options;
            return new testcafeAutomation.SetScroll(elements[0], { x: x, y: y, position: position }, options);
        },
    };
    ActionExecutor.ACTIONS_HANDLERS[COMMAND_TYPE.scrollBy] = {
        create: function (command, elements) {
            var byX = command.byX, byY = command.byY, options = command.options;
            return new testcafeAutomation.SetScroll(elements[0], { byX: byX, byY: byY }, options);
        },
    };
    ActionExecutor.ACTIONS_HANDLERS[COMMAND_TYPE.scrollIntoView] = {
        create: function (command, elements) { return new testcafeAutomation.ScrollIntoView(elements[0], command.options); },
    };
    ActionExecutor.ACTIONS_HANDLERS[COMMAND_TYPE.typeText] = {
        // eslint-disable-next-line no-restricted-properties
        create: function (command, elements) { return new testcafeAutomation.Type(elements[0], command.text, command.options); },
    };
    function createSelectTextAutomation(command, elements) {
        var selectArgs = testcafeAutomation.calculateSelectTextArguments(elements[0], command);
        return new testcafeAutomation.SelectText(elements[0], selectArgs.startPos, selectArgs.endPos, command.options);
    }
    ActionExecutor.ACTIONS_HANDLERS[COMMAND_TYPE.selectText] = {
        create: createSelectTextAutomation,
        ensureElsProps: function (elements) {
            if (!testcafeCore.domUtils.isEditableElement(elements[0]))
                throw new ActionElementNonEditableError();
        },
    };
    ActionExecutor.ACTIONS_HANDLERS[COMMAND_TYPE.selectTextAreaContent] = {
        create: createSelectTextAutomation,
        ensureElsProps: function (elements) {
            if (!testcafeCore.domUtils.isTextAreaElement(elements[0]))
                throw new ActionElementNotTextAreaError();
        },
    };
    ActionExecutor.ACTIONS_HANDLERS[COMMAND_TYPE.selectEditableContent] = {
        additionalSelectorProps: ['startSelector', 'endSelector'],
        create: function (command, elements) {
            command.endSelector = command.endSelector || command.startSelector;
            return new testcafeAutomation.SelectEditableContent(elements[0], elements[1], command.options);
        },
        ensureElsProps: function (elements) {
            if (!testcafeCore.domUtils.isContentEditableElement(elements[0]))
                throw new ActionElementNonContentEditableError('startSelector');
            if (!testcafeCore.domUtils.isContentEditableElement(elements[1]))
                throw new ActionElementNonContentEditableError('endSelector');
            // NOTE: We should find a common element for the nodes to perform the select action
            if (!testcafeCore.contentEditable.getNearestCommonAncestor(elements[0], elements[1]))
                throw new ActionRootContainerNotFoundError();
        },
    };
    function ensureFileInput(element) {
        if (!testcafeCore.domUtils.isFileInput(element))
            throw new ActionElementIsNotFileInputError();
    }
    ActionExecutor.ACTIONS_HANDLERS[COMMAND_TYPE.setFilesToUpload] = {
        create: function (command, elements) {
            return new testcafeAutomation.Upload(elements[0], command.filePath, function (filePaths, scannedFilePaths) { return new ActionCannotFindFileToUploadError(filePaths, scannedFilePaths); });
        },
        ensureElsProps: function (elements) { return ensureFileInput(elements[0]); },
    };
    ActionExecutor.ACTIONS_HANDLERS[COMMAND_TYPE.clearUpload] = {
        create: function (command, elements) { return new testcafeAutomation.Upload(elements[0]); },
        ensureElsProps: function (elements) { return ensureFileInput(elements[0]); },
    };

    function shouldSkipJsError(options, err) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isClientFunctionCommand(options)) return [3 /*break*/, 2];
                        return [4 /*yield*/, processJsErrorsFunction(options, err)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, options || false];
                }
            });
        });
    }
    function processJsErrorsFunction(processingFunction, err) {
        var opts = {
            stack: err.stack,
            pageUrl: err.pageUrl,
            message: err.msg,
        };
        processingFunction.args = [[opts]];
        var executor = new ClientFunctionExecutor(processingFunction);
        return executor.getResult();
    }

    var settings = hammerhead__default.settings;
    var transport = hammerhead__default.transport;
    var Promise$2 = hammerhead__default.Promise;
    var messageSandbox$2 = hammerhead__default.eventSandbox.message;
    var storages = hammerhead__default.storages;
    var nativeMethods$4 = hammerhead__default.nativeMethods;
    var DateCtor$1 = nativeMethods$4.date;
    var listeners = hammerhead__default.eventSandbox.listeners;
    var urlUtils = hammerhead__default.utils.url;
    var TEST_DONE_SENT_FLAG = 'testcafe|driver|test-done-sent-flag';
    var PENDING_STATUS = 'testcafe|driver|pending-status';
    var EXECUTING_CLIENT_FUNCTION_DESCRIPTOR = 'testcafe|driver|executing-client-function-descriptor';
    var EXECUTING_SKIP_JS_ERRORS_FUNCTION_FLAG = 'testcafe|driver|executing-skip-js-errors-function-flag';
    var SELECTOR_EXECUTION_START_TIME = 'testcafe|driver|selector-execution-start-time';
    var PENDING_PAGE_ERROR = 'testcafe|driver|pending-page-error';
    var ACTIVE_IFRAME_SELECTOR = 'testcafe|driver|active-iframe-selector';
    var TEST_SPEED = 'testcafe|driver|test-speed';
    var ASSERTION_RETRIES_TIMEOUT = 'testcafe|driver|assertion-retries-timeout';
    var ASSERTION_RETRIES_START_TIME = 'testcafe|driver|assertion-retries-start-time';
    var CONSOLE_MESSAGES = 'testcafe|driver|console-messages';
    var PENDING_CHILD_WINDOW_COUNT = 'testcafe|driver|pending-child-window-count';
    var ACTION_IFRAME_ERROR_CTORS = {
        NotLoadedError: ActionIframeIsNotLoadedError,
        NotFoundError: ActionElementNotFoundError,
        IsInvisibleError: ActionElementIsInvisibleError,
    };
    var CURRENT_IFRAME_ERROR_CTORS = {
        NotLoadedError: CurrentIframeIsNotLoadedError,
        NotFoundError: CurrentIframeNotFoundError,
        IsInvisibleError: CurrentIframeIsInvisibleError,
    };
    var COMMAND_EXECUTION_MAX_TIMEOUT = Math.pow(2, 31) - 1;
    var EMPTY_COMMAND_EVENT_WAIT_TIMEOUT = 30 * 1000;
    var CHILD_WINDOW_CLOSED_EVENT_TIMEOUT = 2000;
    var RESTORE_CHILD_WINDOWS_TIMEOUT = 30 * 1000;
    var STATUS_WITH_COMMAND_RESULT_EVENT = 'status-with-command-result-event';
    var EMPTY_COMMAND_EVENT = 'empty-command-event';
    var CHILD_WINDOW_CLOSED_EVENT = 'child-window-closed';
    var SKIP_JS_ERRORS_FUNCTION_EXECUTION_COMPLETE_EVENT = 'skip-js-errors-function-execution-complete';
    var Driver = /** @class */ (function (_super) {
        __extends(Driver, _super);
        function Driver(testRunId, communicationUrls, runInfo, options) {
            var _this = _super.call(this) || this;
            _this.COMMAND_EXECUTING_FLAG = 'testcafe|driver|command-executing-flag';
            _this.EXECUTING_IN_IFRAME_FLAG = 'testcafe|driver|executing-in-iframe-flag';
            _this.PENDING_WINDOW_SWITCHING_FLAG = 'testcafe|driver|pending-window-switching-flag';
            _this.WINDOW_COMMAND_API_CALL_FLAG = 'testcafe|driver|window-command-api-flag';
            _this.testRunId = testRunId;
            _this.communicationUrls = communicationUrls;
            _this.runInfo = runInfo;
            _this.options = options;
            _this.isFirstPageLoad = settings.get().isFirstPageLoad;
            _this.customCommandHandlers = {};
            _this.contextStorage = null;
            _this.nativeDialogsTracker = null;
            _this.childIframeDriverLinks = [];
            _this.activeChildIframeDriverLink = null;
            _this.childWindowDriverLinks = [];
            _this.parentWindowDriverLink = null;
            _this.statusBar = null;
            _this.windowId = _this._getCurrentWindowId();
            _this.role = DriverRole.replica;
            _this.setAsMasterInProgress = false;
            _this.checkClosedChildWindowIntervalId = null;
            var requestEmitter = new testcafeCore.ClientRequestEmitter();
            _this.pageInitialRequestBarrier = new testcafeCore.RequestBarrier(requestEmitter);
            _this.readyPromise = _this._getReadyPromise();
            _this._initChildDriverListening();
            testcafeCore.pageUnloadBarrier.init();
            testcafeCore.preventRealEvents();
            hammerhead__default.on(hammerhead__default.EVENTS.uncaughtJsError, function (err) { return _this._onJsError(err); });
            hammerhead__default.on(hammerhead__default.EVENTS.unhandledRejection, function (err) { return _this._onJsError(err); });
            hammerhead__default.on(hammerhead__default.EVENTS.consoleMethCalled, function (e) { return _this._onConsoleMessage(e); });
            hammerhead__default.on(hammerhead__default.EVENTS.beforeFormSubmit, function (e) { return _this._onFormSubmit(e); });
            hammerhead__default.on(hammerhead__default.EVENTS.windowOpened, function (e) { return _this._onChildWindowOpened(e); });
            _this.setCustomCommandHandlers(COMMAND_TYPE.unlockPage, function () { return _this._unlockPageAfterTestIsDone(); });
            _this.setCustomCommandHandlers(COMMAND_TYPE.getActiveElement, function () { return _this._getActiveElement(); });
            // NOTE: initiate the child links restoring process before the window is reloaded
            listeners.addInternalEventBeforeListener(window, ['beforeunload'], function () {
                _this._sendStartToRestoreCommand();
            });
            _this.replicator = createReplicator([new SelectorNodeTransform()]);
            return _this;
        }
        Driver.prototype._isOpenedInIframe = function () {
            var opener = window.opener;
            return opener && opener.top && opener.top !== opener;
        };
        Object.defineProperty(Driver.prototype, "speed", {
            get: function () {
                return this.contextStorage.getItem(TEST_SPEED);
            },
            set: function (val) {
                this.contextStorage.setItem(TEST_SPEED, val);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Driver.prototype, "consoleMessages", {
            get: function () {
                return new ClientBrowserConsoleMessages(this.contextStorage.getItem(CONSOLE_MESSAGES));
            },
            set: function (messages) {
                return this.contextStorage.setItem(CONSOLE_MESSAGES, messages ? messages.getCopy() : null);
            },
            enumerable: false,
            configurable: true
        });
        Driver.prototype._getReadyPromise = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, testcafeCore.eventUtils.documentReady(this.options.pageLoadTimeout)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.pageInitialRequestBarrier.wait(true)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Driver.prototype._hasPendingActionFlags = function (contextStorage) {
            return contextStorage.getItem(this.COMMAND_EXECUTING_FLAG) ||
                contextStorage.getItem(this.EXECUTING_IN_IFRAME_FLAG);
        };
        Driver.prototype._getCurrentWindowId = function () {
            var currentUrl = window.location.toString();
            var parsedProxyUrl = hammerhead__default.utils.url.parseProxyUrl(currentUrl);
            return parsedProxyUrl && parsedProxyUrl.windowId || null;
        };
        // Error handling
        Driver.prototype._onJsError = function (err) {
            return __awaiter(this, void 0, void 0, function () {
                var e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // NOTE: we should not send any message to the server if we've
                            // sent the 'test-done' message but haven't got the response.
                            if (this.contextStorage.getItem(TEST_DONE_SENT_FLAG))
                                return [2 /*return*/];
                            if (!this.options.skipJsErrors) return [3 /*break*/, 6];
                            this.contextStorage.setItem(EXECUTING_SKIP_JS_ERRORS_FUNCTION_FLAG, true);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, shouldSkipJsError(this.options.skipJsErrors, err)];
                        case 2:
                            if (!(_a.sent()))
                                this._setUncaughtErrorOnPage(err);
                            return [3 /*break*/, 5];
                        case 3:
                            e_1 = _a.sent();
                            if (!this.contextStorage.getItem(PENDING_PAGE_ERROR))
                                this.contextStorage.setItem(PENDING_PAGE_ERROR, e_1);
                            return [3 /*break*/, 5];
                        case 4:
                            this.contextStorage.setItem(EXECUTING_SKIP_JS_ERRORS_FUNCTION_FLAG, false);
                            this.emit(SKIP_JS_ERRORS_FUNCTION_EXECUTION_COMPLETE_EVENT);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                        case 6:
                            this._setUncaughtErrorOnPage(err);
                            return [2 /*return*/];
                    }
                });
            });
        };
        Driver.prototype._setUncaughtErrorOnPage = function (err) {
            var error = new UncaughtErrorOnPage(err.stack, err.pageUrl);
            if (!this.contextStorage.getItem(PENDING_PAGE_ERROR))
                this.contextStorage.setItem(PENDING_PAGE_ERROR, error);
        };
        Driver.prototype._unlockPageAfterTestIsDone = function () {
            testcafeCore.disableRealEventsPreventing();
            return Promise$2.resolve();
        };
        Driver.prototype._getActiveElement = function () {
            return __awaiter(this, void 0, void 0, function () {
                var activeElement;
                return __generator(this, function (_a) {
                    activeElement = testcafeCore.domUtils.getActiveElement();
                    return [2 /*return*/, this.replicator.encode(activeElement)];
                });
            });
        };
        Driver.prototype._failIfClientCodeExecutionIsInterrupted = function () {
            // NOTE: ClientFunction should be used primarily for observation. We raise
            // an error if the page was reloaded during ClientFunction execution.
            var executingClientFnDescriptor = this.contextStorage.getItem(EXECUTING_CLIENT_FUNCTION_DESCRIPTOR);
            if (executingClientFnDescriptor) {
                this._onReady(new DriverStatus({
                    isCommandResult: true,
                    executionError: new ClientFunctionExecutionInterruptionError(executingClientFnDescriptor.instantiationCallsiteName),
                }));
                return true;
            }
            return false;
        };
        Driver.prototype.onCustomClientScriptError = function (err, moduleName) {
            var error = moduleName
                ? new UncaughtErrorInCustomClientScriptLoadedFromModule(err, moduleName)
                : new UncaughtErrorInCustomClientScriptCode(err);
            if (!this.contextStorage.getItem(PENDING_PAGE_ERROR))
                this.contextStorage.setItem(PENDING_PAGE_ERROR, error);
        };
        Driver.prototype._addChildWindowDriverLink = function (e) {
            var childWindowDriverLink = new ChildWindowDriverLink(e.window, e.windowId);
            this.childWindowDriverLinks.push(childWindowDriverLink);
            this._ensureClosedChildWindowWatcher();
        };
        Driver.prototype._ensureClosedChildWindowWatcher = function () {
            var _this = this;
            if (this.checkClosedChildWindowIntervalId)
                return;
            this.checkClosedChildWindowIntervalId = nativeMethods$4.setInterval.call(window, function () {
                var firstClosedChildWindowDriverLink = testcafeCore.arrayUtils.find(_this.childWindowDriverLinks, function (childWindowDriverLink) { return childWindowDriverLink.driverWindow.closed; });
                if (!firstClosedChildWindowDriverLink)
                    return;
                _this.emit(CHILD_WINDOW_CLOSED_EVENT);
                testcafeCore.arrayUtils.remove(_this.childWindowDriverLinks, firstClosedChildWindowDriverLink);
                if (!firstClosedChildWindowDriverLink.ignoreMasterSwitching)
                    _this._setCurrentWindowAsMaster();
                if (!_this.childWindowDriverLinks.length) {
                    nativeMethods$4.clearInterval.call(window, _this.checkClosedChildWindowIntervalId);
                    delete _this.checkClosedChildWindowIntervalId;
                }
            }, CHECK_CHILD_WINDOW_CLOSED_INTERVAL);
        };
        Driver.prototype._setAsMasterInProgressOrCompleted = function () {
            return this.setAsMasterInProgress || this.role === DriverRole.master;
        };
        Driver.prototype._setCurrentWindowAsMaster = function () {
            var _this = this;
            if (this._setAsMasterInProgressOrCompleted())
                return;
            this.setAsMasterInProgress = true;
            this._clearActiveChildIframeInfo();
            Promise$2.resolve()
                .then(function () {
                return testcafeCore.browser.setActiveWindowId(_this.communicationUrls.activeWindowId, hammerhead__default.createNativeXHR, _this.windowId);
            })
                .then(function () {
                _this._startInternal({
                    finalizePendingCommand: true,
                    isFirstRequestAfterWindowSwitching: true,
                });
                _this.setAsMasterInProgress = false;
            })
                .catch(function () {
                _this._onReady(new DriverStatus({
                    isCommandResult: true,
                    executionError: new CannotSwitchToWindowError(),
                }));
            });
        };
        Driver.prototype._onChildWindowOpened = function (e) {
            this._addChildWindowDriverLink(e);
            this._switchToChildWindow(e.windowId);
        };
        Driver.prototype._sendStartToRestoreCommand = function () {
            if (!this.contextStorage)
                return;
            // NOTE: the situation is possible when the child window responds before the parent window is reloaded,
            // so we should not respond to the child window if the parent window is not reloaded
            this._stopRespondToChildren = true;
            // NOTE: save the child window count that we expect to restore after the parent window is reloaded
            this.contextStorage.setItem(PENDING_CHILD_WINDOW_COUNT, this.childWindowDriverLinks.length);
            for (var _i = 0, _a = this.childWindowDriverLinks; _i < _a.length; _i++) {
                var childLink = _a[_i];
                childLink.startToRestore();
            }
        };
        // HACK: For https://github.com/DevExpress/testcafe/issues/3560
        // We have to cancel every form submit after a test is done
        // to prevent requests to a closed session
        Driver.prototype._onFormSubmit = function (e) {
            // NOTE: We need to refactor this code to avoid the undefined value in contextStorage
            // https://github.com/DevExpress/testcafe/issues/4360
            if (this.contextStorage && this.contextStorage.getItem(TEST_DONE_SENT_FLAG))
                e.preventSubmit = true;
        };
        // Console messages
        Driver.prototype._onConsoleMessage = function (_a) {
            var meth = _a.meth, line = _a.line;
            var messages = this.consoleMessages;
            messages.addMessage(meth, line, this.windowId);
            this.consoleMessages = messages;
        };
        // Status
        Driver.prototype._addPendingErrorToStatus = function (status) {
            var pendingPageError = this.contextStorage.getItem(PENDING_PAGE_ERROR);
            if (pendingPageError) {
                this.contextStorage.setItem(PENDING_PAGE_ERROR, null);
                status.pageError = pendingPageError;
            }
        };
        Driver.prototype._addUnexpectedDialogErrorToStatus = function (status) {
            var dialogError = this.nativeDialogsTracker.getUnexpectedDialogError();
            status.pageError = status.pageError || dialogError;
        };
        Driver.prototype._addConsoleMessagesToStatus = function (status) {
            status.consoleMessages = this.consoleMessages;
            this.consoleMessages = null;
        };
        Driver.prototype._addPendingWindowSwitchingStateToStatus = function (status) {
            status.isPendingWindowSwitching = this._isPendingSwitchingWindow();
        };
        Driver.prototype._sendStatusRequest = function (status) {
            var statusRequestOptions = {
                cmd: TEST_RUN_MESSAGES.ready,
                status: status,
                disableResending: true,
                allowRejecting: true,
            };
            var requestAttempt = function () { return testcafeCore.getTimeLimitedPromise(transport.asyncServiceMsg(statusRequestOptions), SEND_STATUS_REQUEST_TIME_LIMIT); };
            var retryRequest = function () { return testcafeCore.delay(SEND_STATUS_REQUEST_RETRY_DELAY).then(requestAttempt); };
            var statusPromise = requestAttempt();
            for (var i = 0; i < SEND_STATUS_REQUEST_RETRY_COUNT; i++)
                statusPromise = statusPromise.catch(retryRequest);
            return statusPromise;
        };
        Driver.prototype._sendStatus = function (status) {
            var _this = this;
            // NOTE: We should not modify the status if it is resent after
            // the page load because the server has cached the response
            if (!status.resent) {
                this._addPendingErrorToStatus(status);
                this._addUnexpectedDialogErrorToStatus(status);
                this._addConsoleMessagesToStatus(status);
                this._addPendingWindowSwitchingStateToStatus(status);
            }
            this.contextStorage.setItem(PENDING_STATUS, status);
            var readyCommandResponse = null;
            // NOTE: postpone status sending if the page is unloading
            return testcafeCore.pageUnloadBarrier
                .wait(0)
                .then(function () { return _this._sendStatusRequest(status); })
                //NOTE: do not execute the next command if the page is unloading
                .then(function (res) {
                readyCommandResponse = res;
                return testcafeCore.pageUnloadBarrier.wait(0);
            })
                .then(function () {
                _this.contextStorage.setItem(PENDING_STATUS, null);
                return readyCommandResponse;
            });
        };
        // Iframes and child windows interaction
        Driver.prototype._addChildIframeDriverLink = function (id, driverWindow) {
            var childIframeDriverLink = this._getChildIframeDriverLinkByWindow(driverWindow);
            if (!childIframeDriverLink) {
                var driverId = "".concat(this.testRunId, "-").concat(generateId());
                childIframeDriverLink = new ChildIframeDriverLink(driverWindow, driverId);
                this.childIframeDriverLinks.push(childIframeDriverLink);
            }
            childIframeDriverLink.sendConfirmationMessage(id);
        };
        Driver.prototype._getTargetWindowNotFoundResult = function (errCode, errMsg) {
            return Promise$2.resolve({
                success: false,
                errCode: errCode,
                errMsg: errMsg,
            });
        };
        Driver.prototype._getChildWindowValidateResult = function (arr) {
            var success = arr.find(function (item) { return item.result.success; });
            if (success)
                return success.result;
            var errItem = arr.find(function (item) {
                return item.result.errCode === TEST_RUN_ERRORS.cannotCloseWindowWithChildrenError ||
                    item.result.errCode === TEST_RUN_ERRORS.cannotCloseWindowWithoutParent;
            });
            if (!errItem)
                errItem = arr.find(function (item) { return !!item.result.errCode; });
            return errItem ? { errCode: errItem.result.errCode } : void 0;
        };
        Driver.prototype._handleWindowValidation = function (msg, wnd, getWindowFoundResult, WindowValidationMessageCtor) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._validateWindow(msg, wnd, getWindowFoundResult, WindowValidationMessageCtor)];
                        case 1:
                            result = _a.sent();
                            sendConfirmationMessage({
                                requestMsgId: msg.id,
                                window: wnd,
                                result: result,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        Driver.prototype._getWindowInfo = function () {
            var parsedUrl = hammerhead__default.utils.url.parseProxyUrl(window.location.toString());
            return {
                id: this.windowId,
                title: document.title,
                url: parsedUrl.destUrl,
            };
        };
        Driver.prototype._isTargetWindow = function (msg) {
            return msg.windowId === this.windowId;
        };
        Driver.prototype._validateWindow = function (msg, wnd, getWindowFoundResult, WindowValidationMessageCtor) {
            return __awaiter(this, void 0, void 0, function () {
                var windowExists, searchQueries, searchResults;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            windowExists = this._isTargetWindow(msg);
                            if (windowExists)
                                return [2 /*return*/, getWindowFoundResult()];
                            if (!this.childWindowDriverLinks.length)
                                return [2 /*return*/, this._getTargetWindowNotFoundResult(TEST_RUN_ERRORS.targetWindowNotFoundError)];
                            searchQueries = this.childWindowDriverLinks.map(function (childWindowDriverLink) {
                                return childWindowDriverLink.findChildWindows(msg, WindowValidationMessageCtor);
                            });
                            return [4 /*yield*/, Promise$2.all(searchQueries)];
                        case 1:
                            searchResults = _a.sent();
                            return [2 /*return*/, this._getChildWindowValidateResult(searchResults)];
                    }
                });
            });
        };
        Driver._createWindowValidationError = function (_a) {
            var errCode = _a.errCode;
            if (errCode === TEST_RUN_ERRORS.cannotCloseWindowWithChildrenError)
                return new CannotCloseWindowWithChildrenError();
            if (errCode === TEST_RUN_ERRORS.cannotCloseWindowWithoutParent)
                return new CannotCloseWindowWithoutParentError();
            return new WindowNotFoundError();
        };
        Driver.prototype._getCloseWindowFoundResult = function () {
            if (!this.parentWindowDriverLink) {
                return Promise$2.resolve({
                    success: false,
                    errCode: TEST_RUN_ERRORS.cannotCloseWindowWithoutParent,
                });
            }
            if (this.childWindowDriverLinks.length) {
                return Promise$2.resolve({
                    success: false,
                    errCode: TEST_RUN_ERRORS.cannotCloseWindowWithChildrenError,
                });
            }
            return Promise$2.resolve({ success: true });
        };
        Driver.prototype._handleCloseWindowValidation = function (msg, wnd) {
            var _this = this;
            var getWindowFoundResult = function () {
                return _this._getCloseWindowFoundResult();
            };
            return this._handleWindowValidation(msg, wnd, getWindowFoundResult, CloseWindowValidationMessage);
        };
        Driver.prototype._handleSwitchToWindowValidation = function (msg, wnd) {
            var getWindowFoundResult = function () {
                return Promise$2.resolve({ success: true });
            };
            return this._handleWindowValidation(msg, wnd, getWindowFoundResult, SwitchToWindowValidationMessage);
        };
        Driver.prototype._handleCloseWindow = function (msg, wnd) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._closeWindow(msg, wnd)];
                        case 1:
                            _a.sent();
                            sendConfirmationMessage({
                                requestMsgId: msg.id,
                                window: wnd,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        Driver.prototype._closeWindowAndWait = function (childWindowToClose, msg) {
            return __awaiter(this, void 0, void 0, function () {
                var waitWindowForClose;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            waitWindowForClose = this._createWaitForEventPromise(CHILD_WINDOW_CLOSED_EVENT, CHILD_WINDOW_CLOSED_EVENT_TIMEOUT);
                            childWindowToClose.ignoreMasterSwitching = !msg.isCurrentWindow;
                            if (!!this.closing) return [3 /*break*/, 2];
                            this.closing = true;
                            return [4 /*yield*/, testcafeCore.browser.closeWindow(this.communicationUrls.closeWindow, hammerhead__default.createNativeXHR, this.windowId)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            childWindowToClose.driverWindow.close();
                            return [2 /*return*/, waitWindowForClose];
                    }
                });
            });
        };
        Driver.prototype._closeWindow = function (msg) {
            if (!this.childWindowDriverLinks.length)
                return Promise$2.resolve();
            var childWindowToClose = this.childWindowDriverLinks.find(function (link) { return link.windowId === msg.windowId; });
            if (childWindowToClose)
                return this._closeWindowAndWait(childWindowToClose, msg);
            var searchQueries = this.childWindowDriverLinks.map(function (childWindowDriverLink) {
                return childWindowDriverLink.findChildWindows(msg, CloseWindowCommandMessage);
            });
            return Promise$2.all(searchQueries);
        };
        Driver.prototype._getWindows = function () {
            return __awaiter(this, void 0, void 0, function () {
                var searchQueries, searchResults, result, _i, searchResults_1, item;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.childWindowDriverLinks.length)
                                return [2 /*return*/, [this._getWindowInfo()]];
                            searchQueries = this.childWindowDriverLinks.map(function (childWindowDriverLink) {
                                return childWindowDriverLink.findChildWindows({}, GetWindowsMessage);
                            });
                            return [4 /*yield*/, Promise$2.all(searchQueries)];
                        case 1:
                            searchResults = _a.sent();
                            result = [this._getWindowInfo()];
                            for (_i = 0, searchResults_1 = searchResults; _i < searchResults_1.length; _i++) {
                                item = searchResults_1[_i];
                                if (Array.isArray(item.result))
                                    result = result.concat(item.result);
                            }
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        Driver.prototype._handleGetWindows = function (msg, wnd) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._getWindows(msg, wnd)];
                        case 1:
                            result = _a.sent();
                            sendConfirmationMessage({
                                requestMsgId: msg.id,
                                window: wnd,
                                result: result,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        Driver.prototype._handleSwitchToWindow = function (msg, wnd) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._switchToWindow(msg)];
                        case 1:
                            _a.sent();
                            sendConfirmationMessage({
                                requestMsgId: msg.id,
                                window: wnd,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        Driver.prototype._switchToWindow = function (msg) {
            var _this = this;
            if (this._isTargetWindow(msg)) {
                return Promise$2.resolve()
                    .then(function () {
                    _this._setCurrentWindowAsMaster();
                });
            }
            if (!this.childWindowDriverLinks.length)
                return Promise$2.resolve();
            return Promise$2.all(this.childWindowDriverLinks.map(function (childWindowDriverLink) {
                return childWindowDriverLink.findChildWindows(msg, SwitchToWindowCommandMessage);
            }));
        };
        Driver.prototype._handleSetAsMasterMessage = function (msg, wnd) {
            var _this = this;
            // NOTE: The 'setAsMaster' message can be send a few times because
            // the 'sendMessageToDriver' function resend messages if the message confirmation is not received in 1 sec.
            // This message can be send even after driver is started.
            if (this._setAsMasterInProgressOrCompleted())
                return;
            this.setAsMasterInProgress = true;
            sendConfirmationMessage({
                requestMsgId: msg.id,
                window: wnd,
            });
            Promise$2.resolve()
                .then(function () {
                return testcafeCore.browser.setActiveWindowId(_this.communicationUrls.activeWindowId, hammerhead__default.createNativeXHR, _this.windowId);
            })
                .then(function () {
                _this._startInternal({
                    finalizePendingCommand: msg.finalizePendingCommand,
                    result: { id: _this.windowId },
                });
                _this.setAsMasterInProgress = false;
            })
                .catch(function () {
                _this._onReady(new DriverStatus({
                    isCommandResult: true,
                    executionError: new CannotSwitchToWindowError(),
                }));
            });
        };
        Driver.prototype._handleCloseAllWindowsMessage = function (msg, wnd) {
            var _this = this;
            this._closeAllChildWindows()
                .then(function () {
                sendConfirmationMessage({
                    requestMsgId: msg.id,
                    window: wnd,
                });
            })
                .catch(function () {
                _this._onReady(new DriverStatus({
                    isCommandResult: true,
                    executionError: new CloseChildWindowError(),
                }));
            });
        };
        Driver.prototype._handleStartToRestoreChildLinkMessage = function () {
            this.parentWindowDriverLink.restoreChild(this._getCurrentWindowId());
        };
        Driver.prototype._handleHasPendingActionFlags = function (msg, window) {
            var result = this._hasPendingActionFlags(this.contextStorage);
            sendConfirmationMessage({
                requestMsgId: msg.id,
                window: window,
                result: result,
            });
        };
        Driver.prototype._handleRestoreChildLink = function (msg, wnd) {
            if (this._stopRespondToChildren)
                return;
            this._addChildWindowDriverLink({ window: wnd, windowId: msg.windowId });
            var allChildWindowLinksRestored = this.childWindowDriverLinks.length === this.contextStorage.getItem(PENDING_CHILD_WINDOW_COUNT);
            if (allChildWindowLinksRestored && this._restoreChildWindowsPromiseResolver) {
                this._restoreChildWindowsPromiseResolver();
                delete this._restoreChildWindowsPromiseResolver;
                this.contextStorage.setItem(PENDING_CHILD_WINDOW_COUNT, 0);
            }
            sendConfirmationMessage({
                requestMsgId: msg.id,
                window: wnd,
            });
        };
        Driver.prototype._handleChildWindowIsOpenedInIFrame = function () {
            var _this = this;
            // NOTE: when the child window is opened in iframe we need to wait until the
            // child window is fully loaded
            this._pendingChildWindowInIFrame = new Promise$2(function (resolve) {
                _this._resolvePendingChildWindowInIframe = resolve;
            });
        };
        Driver.prototype._handleChildWindowIsLoadedInIFrame = function (msg, wnd) {
            sendConfirmationMessage({
                requestMsgId: msg.id,
                window: wnd,
            });
            this._resolvePendingChildWindowInIframe();
            var childWindowDriverLinkExists = !!this.childWindowDriverLinks.find(function (link) { return link.windowId === msg.windowId; });
            if (!childWindowDriverLinkExists)
                this._onChildWindowOpened({ window: wnd, windowId: msg.windowId });
        };
        Driver.prototype._handleStopInternalFromFrame = function (msg, wnd) {
            sendConfirmationMessage({
                requestMsgId: msg.id,
                window: wnd,
            });
            this.contextStorage.setItem(this.EXECUTING_IN_IFRAME_FLAG, false);
            this._stopInternal();
        };
        Driver.prototype._initChildDriverListening = function () {
            var _this = this;
            messageSandbox$2.on(messageSandbox$2.SERVICE_MSG_RECEIVED_EVENT, function (e) {
                var msg = e.message;
                var window = e.source;
                switch (msg.type) {
                    case TYPE.establishConnection:
                        _this._addChildIframeDriverLink(msg.id, window);
                        break;
                    case TYPE.childWindowIsOpenedInIFrame:
                        _this._handleChildWindowIsOpenedInIFrame(msg, window);
                        break;
                    case TYPE.childWindowIsLoadedInIFrame:
                        _this._handleChildWindowIsLoadedInIFrame(msg, window);
                        break;
                    case TYPE.stopInternalFromFrame:
                        _this._handleStopInternalFromFrame(msg, window);
                        break;
                    case TYPE.setAsMaster:
                        _this._handleSetAsMasterMessage(msg, window);
                        break;
                    case TYPE.switchToWindow:
                        _this._handleSwitchToWindow(msg, window);
                        break;
                    case TYPE.closeWindow:
                        _this._handleCloseWindow(msg, window);
                        break;
                    case TYPE.switchToWindowValidation:
                        _this._handleSwitchToWindowValidation(msg, window);
                        break;
                    case TYPE.closeWindowValidation:
                        _this._handleCloseWindowValidation(msg, window);
                        break;
                    case TYPE.getWindows:
                        _this._handleGetWindows(msg, window);
                        break;
                    case TYPE.closeAllChildWindows:
                        _this._handleCloseAllWindowsMessage(msg, window);
                        break;
                    case TYPE.startToRestoreChildLink:
                        _this._handleStartToRestoreChildLinkMessage();
                        break;
                    case TYPE.hasPendingActionFlags:
                        _this._handleHasPendingActionFlags(msg, window);
                        break;
                    case TYPE.restoreChildLink:
                        _this._handleRestoreChildLink(msg, window);
                }
            });
        };
        Driver.prototype._getChildIframeDriverLinkByWindow = function (driverWindow) {
            return testcafeCore.arrayUtils.find(this.childIframeDriverLinks, function (link) { return link.driverWindow === driverWindow; });
        };
        Driver.prototype._getChildWindowDriverLinkByWindow = function (childDriverWindow) {
            return testcafeCore.arrayUtils.find(this.childWindowDriverLinks, function (link) { return link.driverWindow === childDriverWindow; });
        };
        Driver.prototype._runInActiveIframe = function (command) {
            var _this = this;
            var runningChain = Promise$2.resolve();
            var activeIframeSelector = this.contextStorage.getItem(ACTIVE_IFRAME_SELECTOR);
            // NOTE: if the page was reloaded we restore the active child driver link via the iframe selector
            if (!this.activeChildIframeDriverLink && activeIframeSelector)
                runningChain = this._switchToIframe(activeIframeSelector, CURRENT_IFRAME_ERROR_CTORS);
            runningChain
                .then(function () {
                _this.contextStorage.setItem(_this.EXECUTING_IN_IFRAME_FLAG, true);
                return _this.activeChildIframeDriverLink.executeCommand(command, _this.speed);
            })
                .then(function (status) { return _this._onCommandExecutedInIframe(status); })
                .catch(function (err) { return _this._onCommandExecutedInIframe(new DriverStatus({
                isCommandResult: true,
                executionError: err,
            })); });
        };
        Driver.prototype._onCommandExecutedInIframe = function (status) {
            var _this = this;
            this.contextStorage.setItem(this.EXECUTING_IN_IFRAME_FLAG, false);
            var promise = Promise$2.resolve();
            if (this._pendingChildWindowInIFrame)
                promise = this._pendingChildWindowInIFrame;
            promise.then(function () {
                _this._onReady(status);
            });
        };
        Driver.prototype._ensureChildIframeDriverLink = function (iframeWindow, ErrorCtor, selectorTimeout) {
            var _this = this;
            // NOTE: a child iframe driver should establish connection with the parent when it's loaded.
            // Here we are waiting while the appropriate child iframe driver do this if it didn't do yet.
            return testcafeCore.waitFor(function () { return _this._getChildIframeDriverLinkByWindow(iframeWindow); }, CHECK_IFRAME_DRIVER_LINK_DELAY, selectorTimeout)
                .catch(function () {
                throw new ErrorCtor();
            });
        };
        Driver.prototype._ensureChildWindowDriverLink = function (childWindow, ErrorCtor, timeout) {
            var _this = this;
            // NOTE: a child window driver should establish connection with the parent when it's loaded.
            // Here we are waiting while the appropriate child window driver do this if it didn't do yet.
            return testcafeCore.waitFor(function () { return _this._getChildWindowDriverLinkByWindow(childWindow); }, CHECK_CHILD_WINDOW_DRIVER_LINK_DELAY, timeout)
                .catch(function () {
                throw new ErrorCtor();
            });
        };
        Driver.prototype._switchToIframe = function (selector, iframeErrorCtors) {
            var _this = this;
            var hasSpecificTimeout = typeof selector.timeout === 'number';
            var commandSelectorTimeout = hasSpecificTimeout ? selector.timeout : this.options.selectorTimeout;
            return getResult(selector, commandSelectorTimeout, null, function (fn) { return new iframeErrorCtors.NotFoundError(null, fn); }, function () { return new iframeErrorCtors.IsInvisibleError(); }, this.statusBar)
                .then(function (iframe) {
                if (!testcafeCore.domUtils.isIframeElement(iframe))
                    throw new ActionElementNotIframeError();
                // NOTE: RG-4558 Previously we waited for iframe become visible when execute selector
                // We need to add a timeout to be sure that iframe driver is initialized
                var childLinkResponseTimeout = hasSpecificTimeout
                    ? commandSelectorTimeout
                    : Math.max(commandSelectorTimeout, WAIT_FOR_IFRAME_DRIVER_RESPONSE_TIMEOUT);
                return _this._ensureChildIframeDriverLink(nativeMethods$4.contentWindowGetter.call(iframe), iframeErrorCtors.NotLoadedError, childLinkResponseTimeout);
            })
                .then(function (childDriverLink) {
                childDriverLink.availabilityTimeout = commandSelectorTimeout;
                _this.activeChildIframeDriverLink = childDriverLink;
                _this.contextStorage.setItem(ACTIVE_IFRAME_SELECTOR, selector);
            });
        };
        Driver.prototype._createWaitForEventPromise = function (eventName, timeout) {
            var _this = this;
            var eventHandler = null;
            var timeoutPromise = new Promise$2(function (resolve) {
                nativeMethods$4.setTimeout.call(window, function () {
                    _this.off(eventName, eventHandler);
                    resolve();
                }, timeout);
            });
            var resultPromise = new Promise$2(function (resolve) {
                eventHandler = function () {
                    this.off(eventName, eventHandler);
                    resolve();
                };
                _this.on(eventName, eventHandler);
            });
            return Promise$2.race([timeoutPromise, resultPromise]);
        };
        Driver.prototype._waitForCurrentCommandCompletion = function () {
            if (!this.contextStorage.getItem(this.COMMAND_EXECUTING_FLAG))
                return Promise$2.resolve();
            return this._createWaitForEventPromise(STATUS_WITH_COMMAND_RESULT_EVENT, COMMAND_EXECUTION_MAX_TIMEOUT);
        };
        Driver.prototype._waitForSkipJsErrorFunctionCompletion = function (driverStatus) {
            var _this = this;
            if (!this.contextStorage.getItem(EXECUTING_SKIP_JS_ERRORS_FUNCTION_FLAG))
                return Promise$2.resolve(driverStatus);
            return new Promise$2(function (resolve) {
                var eventHandler = function () {
                    _this.off(SKIP_JS_ERRORS_FUNCTION_EXECUTION_COMPLETE_EVENT, eventHandler);
                    resolve(driverStatus);
                };
                _this.on(SKIP_JS_ERRORS_FUNCTION_EXECUTION_COMPLETE_EVENT, eventHandler);
            });
        };
        Driver.prototype._waitForEmptyCommand = function () {
            return this._createWaitForEventPromise(EMPTY_COMMAND_EVENT, EMPTY_COMMAND_EVENT_WAIT_TIMEOUT);
        };
        Driver.prototype._abortSwitchingToChildWindowIfItClosed = function () {
            if (!this.activeChildWindowDriverLink.driverWindow.closed)
                return;
            testcafeCore.arrayUtils.remove(this.childWindowDriverLinks, this.activeChildWindowDriverLink);
            this.activeChildWindowDriverLink = null;
            throw new ChildWindowClosedBeforeSwitchingError();
        };
        Driver.prototype._switchToChildWindow = function (selector) {
            var _this = this;
            this.contextStorage.setItem(this.PENDING_WINDOW_SWITCHING_FLAG, true);
            var isWindowOpenedViaAPI = this.contextStorage.getItem(this.WINDOW_COMMAND_API_CALL_FLAG);
            return executeChildWindowDriverLinkSelector(selector, this.childWindowDriverLinks)
                .then(function (childWindowDriverLink) {
                return _this._ensureChildWindowDriverLink(childWindowDriverLink.driverWindow, ChildWindowIsNotLoadedError, _this.options.childWindowReadyTimeout);
            })
                .then(function (childWindowDriverLink) {
                _this.activeChildWindowDriverLink = childWindowDriverLink;
                return _this._waitForCurrentCommandCompletion();
            })
                .then(function () {
                return isWindowOpenedViaAPI ? void 0 : _this._waitForEmptyCommand();
            })
                .then(function () {
                _this._observeFileDownloadingInNewWindow();
                _this._abortSwitchingToChildWindowIfItClosed();
                _this._stopInternal();
                return _this.activeChildWindowDriverLink.setAsMaster(isWindowOpenedViaAPI);
            })
                .then(function () {
                _this.contextStorage.setItem(_this.PENDING_WINDOW_SWITCHING_FLAG, false);
            })
                .catch(function (err) {
                _this.contextStorage.setItem(_this.PENDING_WINDOW_SWITCHING_FLAG, false);
                if (err instanceof ChildWindowClosedBeforeSwitchingError) {
                    _this._onReady(new DriverStatus());
                    return;
                }
                _this._onReady(new DriverStatus({
                    isCommandResult: true,
                    executionError: new CannotSwitchToWindowError(),
                }));
            });
        };
        Driver.prototype._switchToTopParentWindow = function () {
            var switchFn = this.parentWindowDriverLink.setTopOpenedWindowAsMaster.bind(this.parentWindowDriverLink);
            this._switchToParentWindowInternal(switchFn);
        };
        Driver.prototype._switchToParentWindow = function (opts) {
            if (opts === void 0) { opts = {}; }
            var switchFn = this.parentWindowDriverLink.setParentWindowAsMaster.bind(this.parentWindowDriverLink);
            this._switchToParentWindowInternal(switchFn, opts);
        };
        Driver.prototype._switchToParentWindowInternal = function (parentWindowSwitchFn, opts) {
            var _this = this;
            if (opts === void 0) { opts = {}; }
            this.contextStorage.setItem(this.PENDING_WINDOW_SWITCHING_FLAG, true);
            return Promise$2.resolve()
                .then(function () {
                _this._stopInternal();
                return parentWindowSwitchFn(opts);
            })
                .then(function () {
                _this.contextStorage.setItem(_this.PENDING_WINDOW_SWITCHING_FLAG, false);
            })
                .catch(function () {
                _this.contextStorage.setItem(_this.PENDING_WINDOW_SWITCHING_FLAG, false);
                _this._onReady(new DriverStatus({
                    isCommandResult: true,
                    executionError: new CannotSwitchToWindowError(),
                }));
            });
        };
        Driver.prototype._switchToMainWindow = function (command) {
            if (this.activeChildIframeDriverLink)
                this.activeChildIframeDriverLink.executeCommand(command);
            this._clearActiveChildIframeInfo();
        };
        Driver.prototype._clearActiveChildIframeInfo = function () {
            this.contextStorage.setItem(ACTIVE_IFRAME_SELECTOR, null);
            this.activeChildIframeDriverLink = null;
        };
        Driver.prototype._setNativeDialogHandlerInIframes = function (dialogHandler) {
            var msg = new SetNativeDialogHandlerMessage(dialogHandler);
            for (var i = 0; i < this.childIframeDriverLinks.length; i++)
                messageSandbox$2.sendServiceMsg(msg, this.childIframeDriverLinks[i].driverWindow);
        };
        // Commands handling
        Driver.prototype._onActionCommand = function (command) {
            var _this = this;
            var executeSelectorCb = function (selector /*: ExecuteSelectorCommand*/, errCtors /*: AutomationErrorCtors*/, startTime /*: number*/) {
                var createNotFoundError = createErrorCtorCallback(errCtors.notFound);
                var createIsInvisibleError = createErrorCtorCallback(errCtors.invisible);
                var selectorExecutor = new SelectorExecutor(selector, _this.options.selectorTimeout, startTime, createNotFoundError, createIsInvisibleError);
                return selectorExecutor.getResult();
            };
            var executor = new ActionExecutor(command, this.options.selectorTimeout, this.speed, executeSelectorCb);
            var warnings = [];
            executor.on(ActionExecutor.EXECUTION_STARTED_EVENT, function () {
                _this.statusBar.hideWaitingElementStatus(true);
                _this.contextStorage.setItem(_this.COMMAND_EXECUTING_FLAG, true);
            });
            executor.on(ActionExecutor.WAITING_FOR_ELEMENT_EVENT, function (timeout) {
                _this.statusBar.showWaitingElementStatus(timeout);
            });
            executor.on(ActionExecutor.WARNING_EVENT, function (warning) {
                warnings.push(warning);
            });
            var clientRequestEmitter = new testcafeCore.ClientRequestEmitter();
            var scriptExecutionEmitter = new testcafeCore.ScriptExecutionEmitter();
            var barriers = new BarriersComplex(clientRequestEmitter, scriptExecutionEmitter, testcafeCore.pageUnloadBarrier);
            executor.execute(barriers)
                .then(function (elements) { return new DriverStatus({
                isCommandResult: true,
                result: createReplicator(new SelectorElementActionTransform()).encode(elements),
                warnings: warnings,
            }); })
                .catch(function (err) { return _this.statusBar.hideWaitingElementStatus(false)
                .then(function () { return new DriverStatus({ isCommandResult: true, executionError: err }); }); })
                .then(function (driverStatus) { return _this._waitForSkipJsErrorFunctionCompletion(driverStatus); })
                .then(function (driverStatus) {
                _this.contextStorage.setItem(_this.COMMAND_EXECUTING_FLAG, false);
                _this.contextStorage.setItem(EXECUTING_SKIP_JS_ERRORS_FUNCTION_FLAG, false);
                _this._onReady(driverStatus);
            });
        };
        Driver.prototype._onSetNativeDialogHandlerCommand = function (command) {
            this.nativeDialogsTracker.setHandler(command.dialogHandler);
            this._setNativeDialogHandlerInIframes(command.dialogHandler);
            this._onReady(new DriverStatus({ isCommandResult: true }));
        };
        Driver.prototype._onGetNativeDialogHistoryCommand = function () {
            this._onReady(new DriverStatus({
                isCommandResult: true,
                result: this.nativeDialogsTracker.appearedDialogs,
            }));
        };
        Driver.prototype._onGetBrowserConsoleMessagesCommand = function () {
            this._onReady(new DriverStatus({ isCommandResult: true }));
        };
        Driver.prototype._onNavigateToCommand = function (command) {
            var _this = this;
            this.contextStorage.setItem(this.COMMAND_EXECUTING_FLAG, true);
            executeNavigateTo(command)
                .then(function (driverStatus) {
                _this.contextStorage.setItem(_this.COMMAND_EXECUTING_FLAG, false);
                return _this._onReady(driverStatus);
            });
        };
        Driver.prototype._onGetProxyUrlCommand = function (command) {
            this._onReady(new DriverStatus({
                isCommandResult: true,
                result: urlUtils.getProxyUrl(command.url, command.options),
            }));
        };
        Driver.prototype._onSkipJsErrorsCommand = function (_a) {
            var options = _a.options;
            this.options.skipJsErrors = options;
            this._onReady(new DriverStatus({ isCommandResult: true }));
        };
        Driver.prototype._onExecuteClientFunctionCommand = function (command) {
            var _this = this;
            this.contextStorage.setItem(EXECUTING_CLIENT_FUNCTION_DESCRIPTOR, { instantiationCallsiteName: command.instantiationCallsiteName });
            var executor = new ClientFunctionExecutor(command);
            getExecutorResultDriverStatus(executor)
                .then(function (driverStatus) {
                _this.contextStorage.setItem(EXECUTING_CLIENT_FUNCTION_DESCRIPTOR, null);
                _this._onReady(driverStatus);
            });
        };
        Driver.prototype._onExecuteSelectorCommand = function (command) {
            var _this = this;
            var startTime = this.contextStorage.getItem(SELECTOR_EXECUTION_START_TIME) || new DateCtor$1();
            var elementNotFoundOrNotVisible = createErrorCtorCallback(getCannotObtainInfoErrorCtor());
            var elementNotFound = command.strictError ? createErrorCtorCallback(getNotFoundErrorCtor()) : elementNotFoundOrNotVisible;
            var elementIsInvisible = command.strictError ? createErrorCtorCallback(getInvisibleErrorCtor()) : elementNotFoundOrNotVisible;
            getResultDriverStatus(command, this.options.selectorTimeout, startTime, command.needError ? elementNotFound : null, command.needError ? elementIsInvisible : null, this.statusBar)
                .then(function (driverStatus) {
                _this.contextStorage.setItem(SELECTOR_EXECUTION_START_TIME, null);
                _this._onReady(driverStatus);
            });
        };
        Driver.prototype._onSwitchToMainWindowCommand = function (command) {
            this._switchToMainWindow(command);
            this._onReady(new DriverStatus({ isCommandResult: true }));
        };
        Driver.prototype._onSwitchToIframeCommand = function (command) {
            var _this = this;
            this
                ._switchToIframe(command.selector, ACTION_IFRAME_ERROR_CTORS)
                .then(function () { return _this._onReady(new DriverStatus({ isCommandResult: true })); })
                .catch(function (err) { return _this._onReady(new DriverStatus({
                isCommandResult: true,
                executionError: err,
            })); });
        };
        Driver.prototype._onWindowOpenCommand = function (command) {
            this.contextStorage.setItem(this.WINDOW_COMMAND_API_CALL_FLAG, true);
            window.open(command.url);
        };
        Driver.prototype._onWindowCloseCommand = function (command) {
            return __awaiter(this, void 0, void 0, function () {
                var wnd, windowId, isCurrentWindow, response, result, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            wnd = this._getTopOpenedWindow();
                            windowId = command.windowId || this.windowId;
                            isCurrentWindow = windowId === this.windowId;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, this._validateChildWindowCloseCommandExists(windowId, wnd)];
                        case 2:
                            response = _a.sent();
                            result = response.result;
                            if (!result.success)
                                throw Driver._createWindowValidationError(result);
                            return [4 /*yield*/, sendMessageToDriver(new CloseWindowCommandMessage({
                                    windowId: windowId,
                                    isCurrentWindow: isCurrentWindow,
                                }), wnd, WAIT_FOR_WINDOW_DRIVER_RESPONSE_TIMEOUT, CannotSwitchToWindowError)];
                        case 3:
                            _a.sent();
                            // NOTE: we do not need to send a new Driver Status if we close the current window
                            // in this case the new Driver Status will be sent from the `_setCurrentWindowAsMaster` method
                            // in other cases we need to send a new Driver Status from here.
                            if (!isCurrentWindow) {
                                this._onReady(new DriverStatus({
                                    isCommandResult: true,
                                }));
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            err_1 = _a.sent();
                            this._onReady(new DriverStatus({
                                isCommandResult: true,
                                executionError: err_1,
                            }));
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        Driver.prototype._onGetCurrentWindowCommand = function () {
            this._onReady(new DriverStatus({
                isCommandResult: true,
                result: {
                    id: this.windowId,
                },
            }));
        };
        Driver.prototype._onGetWindowsCommand = function () {
            return __awaiter(this, void 0, void 0, function () {
                var wnd, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            wnd = this._getTopOpenedWindow();
                            return [4 /*yield*/, sendMessageToDriver(new GetWindowsMessage(), wnd, WAIT_FOR_WINDOW_DRIVER_RESPONSE_TIMEOUT, CannotSwitchToWindowError)];
                        case 1:
                            response = _a.sent();
                            this._onReady(new DriverStatus({
                                isCommandResult: true,
                                result: response.result,
                            }));
                            return [2 /*return*/];
                    }
                });
            });
        };
        Driver.prototype._validateChildWindowCloseCommandExists = function (windowId, wnd) {
            return sendMessageToDriver(new CloseWindowValidationMessage({ windowId: windowId }), wnd, WAIT_FOR_WINDOW_DRIVER_RESPONSE_TIMEOUT, CannotSwitchToWindowError);
        };
        Driver.prototype._validateChildWindowSwitchToWindowCommandExists = function (_a, wnd) {
            var windowId = _a.windowId, fn = _a.fn;
            return sendMessageToDriver(new SwitchToWindowValidationMessage({ windowId: windowId, fn: fn }), wnd, WAIT_FOR_WINDOW_DRIVER_RESPONSE_TIMEOUT, CannotSwitchToWindowError);
        };
        Driver.prototype._getTopOpenedWindow = function () {
            var _a;
            var wnd = ((_a = this.parentWindowDriverLink) === null || _a === void 0 ? void 0 : _a.getTopOpenedWindow()) || window;
            return wnd.top;
        };
        Driver.prototype._onSwitchToWindow = function (command, err) {
            return __awaiter(this, void 0, void 0, function () {
                var wnd, response, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            wnd = this._getTopOpenedWindow();
                            return [4 /*yield*/, this._validateChildWindowSwitchToWindowCommandExists({ windowId: command.windowId, fn: command.checkWindow }, wnd)];
                        case 1:
                            response = _a.sent();
                            result = response.result;
                            if (!result.success) {
                                this._onReady(new DriverStatus({
                                    isCommandResult: true,
                                    executionError: err || Driver._createWindowValidationError(result),
                                }));
                            }
                            else {
                                this._stopInternal();
                                sendMessageToDriver(new SwitchToWindowCommandMessage({ windowId: command.windowId, fn: command.checkWindow }), wnd, WAIT_FOR_WINDOW_DRIVER_RESPONSE_TIMEOUT, CannotSwitchToWindowError);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        Driver.prototype._restoreChildWindowLinks = function () {
            return __awaiter(this, void 0, void 0, function () {
                var restoreChildWindowsPromise, err_2;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.contextStorage.getItem(PENDING_CHILD_WINDOW_COUNT))
                                return [2 /*return*/];
                            restoreChildWindowsPromise = new Promise$2(function (resolve) {
                                _this._restoreChildWindowsPromiseResolver = resolve;
                            });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, testcafeCore.getTimeLimitedPromise(restoreChildWindowsPromise, RESTORE_CHILD_WINDOWS_TIMEOUT)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_2 = _a.sent();
                            this._onReady(new DriverStatus({
                                isCommandResult: true,
                                executionError: new CannotRestoreChildWindowError(),
                            }));
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Driver.prototype._onSwitchToPreviousWindow = function (command) {
            this._onSwitchToWindow(command, new PreviousWindowNotFoundError());
        };
        Driver.prototype._onSwitchToParentWindow = function () {
            if (this.parentWindowDriverLink)
                this._switchToParentWindow({ finalizePendingCommand: true });
            else {
                this._onReady(new DriverStatus({
                    isCommandResult: true,
                    executionError: new ParentWindowNotFoundError(),
                }));
            }
        };
        Driver.prototype._onBrowserManipulationCommand = function (command) {
            var _this = this;
            this.contextStorage.setItem(this.COMMAND_EXECUTING_FLAG, true);
            executeManipulationCommand(command, this.options.selectorTimeout, this.statusBar)
                .then(function (driverStatus) {
                _this.contextStorage.setItem(_this.COMMAND_EXECUTING_FLAG, false);
                return _this._onReady(driverStatus);
            });
        };
        Driver.prototype._onSetBreakpointCommand = function (_a) {
            var _this = this;
            var isTestError = _a.isTestError, inCompilerService = _a.inCompilerService;
            var showDebuggingStatusPromise = this.statusBar.showDebuggingStatus(isTestError);
            if (inCompilerService) {
                showDebuggingStatusPromise.then(function (debug) {
                    _this.debug = debug;
                });
                this._onReady(new DriverStatus({
                    isCommandResult: true,
                    result: true,
                }));
            }
            else {
                showDebuggingStatusPromise.then(function (debug) {
                    var stopAfterNextAction = debug === STATUS_BAR_DEBUG_ACTION.step;
                    _this._onReady(new DriverStatus({
                        isCommandResult: true,
                        result: stopAfterNextAction,
                    }));
                });
            }
        };
        Driver.prototype._onDisableDebugCommand = function () {
            this.statusBar._resetState();
            this._onReady(new DriverStatus({
                isCommandResult: true,
            }));
        };
        Driver.prototype._onSetTestSpeedCommand = function (command) {
            this.speed = command.speed;
            this._onReady(new DriverStatus({ isCommandResult: true }));
        };
        Driver.prototype._onShowAssertionRetriesStatusCommand = function (command) {
            this.contextStorage.setItem(ASSERTION_RETRIES_TIMEOUT, command.timeout);
            this.contextStorage.setItem(ASSERTION_RETRIES_START_TIME, nativeMethods$4.dateNow());
            this.statusBar.showWaitingAssertionRetriesStatus(command.timeout);
            this._onReady(new DriverStatus({ isCommandResult: true }));
        };
        Driver.prototype._onHideAssertionRetriesStatusCommand = function (command) {
            var _this = this;
            this.contextStorage.setItem(ASSERTION_RETRIES_TIMEOUT, null);
            this.contextStorage.setItem(ASSERTION_RETRIES_START_TIME, null);
            this.statusBar.hideWaitingAssertionRetriesStatus(command.success)
                .then(function () { return _this._onReady(new DriverStatus({ isCommandResult: true })); });
        };
        Driver.prototype._checkStatus = function () {
            var _this = this;
            var urls = {
                statusUrl: this.communicationUrls.statusDone,
            };
            return testcafeCore.browser
                .checkStatus(urls, hammerhead__default.createNativeXHR, { manualRedirect: true, proxyless: this.options.proxyless })
                .then(function (_a) {
                var command = _a.command;
                var isSessionChange = command.testRunId !== _this.testRunId;
                if (isSessionChange) {
                    storages.clear();
                    storages.lock();
                    testcafeCore.browser.redirect(command, hammerhead__default.createNativeXHR, _this.communicationUrls.openFileProtocolUrl);
                }
                else {
                    _this.contextStorage.setItem(TEST_DONE_SENT_FLAG, false);
                    _this._onReady({ isCommandResult: false });
                }
            })
                .catch(function () {
                return testcafeCore.delay(CHECK_STATUS_RETRY_DELAY);
            });
        };
        Driver.prototype._onCustomCommand = function (command) {
            var _this = this;
            var handler = this.customCommandHandlers[command.type].handler;
            handler(command).then(function (result) {
                _this._onReady(new DriverStatus({ isCommandResult: true, result: result }));
            });
        };
        Driver.prototype._closeAllChildWindows = function () {
            var _this = this;
            if (!this.childWindowDriverLinks.length)
                return Promise$2.resolve();
            return Promise$2.all(this.childWindowDriverLinks.map(function (childWindowDriverLink) {
                return childWindowDriverLink.closeAllChildWindows();
            }))
                .then(function () {
                nativeMethods$4.arrayForEach.call(_this.childWindowDriverLinks, function (childWindowDriverLink) {
                    childWindowDriverLink.driverWindow.close();
                });
            });
        };
        Driver.prototype._onTestDone = function (status) {
            var _this = this;
            this.contextStorage.setItem(TEST_DONE_SENT_FLAG, true);
            if (this.parentWindowDriverLink)
                this._switchToTopParentWindow();
            else {
                this._closeAllChildWindows()
                    .then(function () {
                    return _this._sendStatus(status);
                })
                    .then(function () {
                    _this._checkStatus();
                })
                    .catch(function () {
                    _this._onReady(new DriverStatus({
                        isCommandResult: true,
                        executionError: CloseChildWindowError,
                    }));
                });
            }
        };
        Driver.prototype._onBackupStoragesCommand = function () {
            this._onReady(new DriverStatus({
                isCommandResult: true,
                result: storages.backup(),
            }));
        };
        Driver.prototype._isPendingSwitchingWindow = function () {
            return !!this.contextStorage.getItem(this.PENDING_WINDOW_SWITCHING_FLAG);
        };
        Driver.prototype._onPrepareClientEnvironmentInDebugMode = function (command) {
            // NOTE: repeat the function call wrapping produced by the 'esm' module on the client-side
            // (same as on the server-side).
            nativeMethods$4.objectDefineProperty(window, command.esmRuntime, {
                value: {
                    g: window,
                    c: window.eval, //eslint-disable-line no-eval
                },
                configurable: true, // NOTE: for the 'disablePageReloads' option
            });
            this._onReady(new DriverStatus({
                isCommandResult: true,
                result: true,
            }));
        };
        Driver.prototype._isStatusWithCommandResultInPendingWindowSwitchingMode = function (status) {
            return status.isCommandResult && this._isPendingSwitchingWindow();
        };
        Driver.prototype._isEmptyCommandInPendingWindowSwitchingMode = function (command) {
            return !command && this._isPendingSwitchingWindow();
        };
        Driver.prototype._observeFileDownloadingInNewWindow = function () {
            var _this = this;
            var status = new DriverStatus({ isObservingFileDownloadingInNewWindow: true });
            if (this._isPendingSwitchingWindow()) {
                this._sendStatus(status)
                    .then(function (command) {
                    if (command)
                        _this._onCommand(command);
                    else
                        _this._observeFileDownloadingInNewWindow();
                });
            }
        };
        // Routing
        Driver.prototype._onReady = function (status) {
            var _this = this;
            if (this.debug) {
                status.debug = this.debug;
                this.debug = null;
            }
            if (this._isStatusWithCommandResultInPendingWindowSwitchingMode(status))
                this.emit(STATUS_WITH_COMMAND_RESULT_EVENT);
            this._sendStatus(status)
                .then(function (command) {
                if (command)
                    _this._onCommand(command);
                else {
                    if (_this._isEmptyCommandInPendingWindowSwitchingMode(command)) {
                        _this.emit(EMPTY_COMMAND_EVENT);
                        return;
                    }
                    // NOTE: the driver gets an empty response if TestRun doesn't get a new command within 2 minutes
                    _this._onReady(new DriverStatus());
                }
            });
        };
        Driver.prototype._executeCommand = function (command) {
            this.contextStorage.setItem(this.WINDOW_COMMAND_API_CALL_FLAG, false);
            if (this.customCommandHandlers[command.type])
                this._onCustomCommand(command);
            else if (command.type === COMMAND_TYPE.testDone)
                this._onTestDone(new DriverStatus({ isCommandResult: true }));
            else if (command.type === COMMAND_TYPE.setBreakpoint)
                this._onSetBreakpointCommand(command);
            else if (command.type === COMMAND_TYPE.disableDebug)
                this._onDisableDebugCommand();
            else if (command.type === COMMAND_TYPE.switchToMainWindow)
                this._onSwitchToMainWindowCommand(command);
            else if (command.type === COMMAND_TYPE.switchToIframe)
                this._onSwitchToIframeCommand(command);
            else if (command.type === COMMAND_TYPE.openWindow)
                this._onWindowOpenCommand(command);
            else if (command.type === COMMAND_TYPE.closeWindow)
                this._onWindowCloseCommand(command);
            else if (command.type === COMMAND_TYPE.getCurrentWindow)
                this._onGetCurrentWindowCommand(command);
            else if (command.type === COMMAND_TYPE.getCurrentWindows)
                this._onGetWindowsCommand();
            else if (command.type === COMMAND_TYPE.switchToWindow)
                this._onSwitchToWindow(command);
            else if (command.type === COMMAND_TYPE.switchToPreviousWindow)
                this._onSwitchToPreviousWindow(command);
            else if (command.type === COMMAND_TYPE.switchToParentWindow)
                this._onSwitchToParentWindow();
            else if (isBrowserManipulationCommand(command))
                this._onBrowserManipulationCommand(command);
            else if (command.type === COMMAND_TYPE.executeClientFunction)
                this._onExecuteClientFunctionCommand(command);
            else if (command.type === COMMAND_TYPE.executeSelector)
                this._onExecuteSelectorCommand(command);
            else if (command.type === COMMAND_TYPE.navigateTo)
                this._onNavigateToCommand(command);
            else if (command.type === COMMAND_TYPE.setNativeDialogHandler)
                this._onSetNativeDialogHandlerCommand(command);
            else if (command.type === COMMAND_TYPE.getNativeDialogHistory)
                this._onGetNativeDialogHistoryCommand(command);
            else if (command.type === COMMAND_TYPE.getBrowserConsoleMessages)
                this._onGetBrowserConsoleMessagesCommand(command);
            else if (command.type === COMMAND_TYPE.setTestSpeed)
                this._onSetTestSpeedCommand(command);
            else if (command.type === COMMAND_TYPE.showAssertionRetriesStatus)
                this._onShowAssertionRetriesStatusCommand(command);
            else if (command.type === COMMAND_TYPE.hideAssertionRetriesStatus)
                this._onHideAssertionRetriesStatusCommand(command);
            else if (command.type === COMMAND_TYPE.backupStorages)
                this._onBackupStoragesCommand();
            else if (command.type === COMMAND_TYPE.closeChildWindowOnFileDownloading)
                this._closeChildWindowOnFileDownloading();
            else if (command.type === COMMAND_TYPE.prepareClientEnvironmentInDebugMode)
                this._onPrepareClientEnvironmentInDebugMode(command);
            else if (command.type === COMMAND_TYPE.getProxyUrl)
                this._onGetProxyUrlCommand(command);
            else if (command.type === COMMAND_TYPE.skipJsErrors)
                this._onSkipJsErrorsCommand(command);
            else
                this._onActionCommand(command);
        };
        Driver.prototype._closeChildWindowOnFileDownloading = function () {
            this.activeChildWindowDriverLink.closeFileDownloadingWindow();
            testcafeCore.arrayUtils.remove(this.childWindowDriverLinks, this.activeChildWindowDriverLink);
            testcafeAutomation.cursor.show();
            this._startInternal();
        };
        Driver.prototype._isExecutableInTopWindowOnly = function (command) {
            if (isExecutableInTopWindowOnly(command))
                return true;
            var customCommandHandler = this.customCommandHandlers[command.type];
            return command.forceExecutionInTopWindowOnly || customCommandHandler && customCommandHandler.isExecutableInTopWindowOnly;
        };
        Driver.prototype._onCommand = function (command) {
            var _this = this;
            // NOTE: the driver sends status to the server as soon as it's created,
            // but it should wait until the page is loaded before executing a command.
            this.readyPromise
                .then(function () {
                // NOTE: we should not execute a command if we already have a pending page error and this command is
                // rejectable by page errors. In this case, we immediately send status with this error to the server.
                var isCommandRejectableByError = isCommandRejectableByPageError(command);
                var pendingPageError = _this.contextStorage.getItem(PENDING_PAGE_ERROR);
                if (pendingPageError && isCommandRejectableByError) {
                    _this._onReady(new DriverStatus({ isCommandResult: true }));
                    return;
                }
                // NOTE: we should execute a command in an iframe if the current execution context belongs to
                // this iframe and the command is not one of those that can be executed only in the top window.
                var isThereActiveIframe = _this.activeChildIframeDriverLink ||
                    _this.contextStorage.getItem(ACTIVE_IFRAME_SELECTOR);
                if (!_this._isExecutableInTopWindowOnly(command) && isThereActiveIframe) {
                    _this._runInActiveIframe(command);
                    return;
                }
                _this._executeCommand(command);
            });
        };
        // API
        Driver.prototype.setCustomCommandHandlers = function (command, handler, executeInTopWindowOnly) {
            this.customCommandHandlers[command] = {
                isExecutableInTopWindowOnly: executeInTopWindowOnly,
                handler: handler,
            };
        };
        Driver.prototype._startInternal = function (opts) {
            this.role = DriverRole.master;
            testcafeCore.browser.startHeartbeat(this.communicationUrls.heartbeat, hammerhead__default.createNativeXHR);
            this._setupAssertionRetryIndication();
            this._startCommandsProcessing(opts);
        };
        Driver.prototype._stopInternal = function () {
            this.role = DriverRole.replica;
            testcafeCore.browser.stopHeartbeat();
            testcafeAutomation.cursor.hide();
        };
        Driver.prototype._setupAssertionRetryIndication = function () {
            var _this = this;
            this.readyPromise.then(function () {
                _this.statusBar.hidePageLoadingStatus();
                var assertionRetriesTimeout = _this.contextStorage.getItem(ASSERTION_RETRIES_TIMEOUT);
                if (assertionRetriesTimeout) {
                    var startTime = _this.contextStorage.getItem(ASSERTION_RETRIES_START_TIME);
                    var timeLeft = assertionRetriesTimeout - (new DateCtor$1() - startTime);
                    if (timeLeft > 0)
                        _this.statusBar.showWaitingAssertionRetriesStatus(assertionRetriesTimeout, startTime);
                }
            });
        };
        Driver.prototype._startCommandsProcessing = function (opts) {
            if (opts === void 0) { opts = { finalizePendingCommand: false, isFirstRequestAfterWindowSwitching: false, result: void 0 }; }
            var pendingStatus = this.contextStorage.getItem(PENDING_STATUS);
            if (pendingStatus)
                pendingStatus.resent = true;
            // NOTE: we should not send any message to the server if we've
            // sent the 'test-done' message but haven't got the response.
            if (this.contextStorage.getItem(TEST_DONE_SENT_FLAG)) {
                if (pendingStatus)
                    this._onTestDone(pendingStatus);
                else
                    this._checkStatus();
                return;
            }
            if (this._failIfClientCodeExecutionIsInterrupted())
                return;
            var finalizePendingCommand = opts.finalizePendingCommand || this._hasPendingActionFlags(this.contextStorage);
            var status = pendingStatus || new DriverStatus({
                isCommandResult: finalizePendingCommand,
                isFirstRequestAfterWindowSwitching: opts.isFirstRequestAfterWindowSwitching,
                result: opts.result,
            });
            this.contextStorage.setItem(this.COMMAND_EXECUTING_FLAG, false);
            this.contextStorage.setItem(this.EXECUTING_IN_IFRAME_FLAG, false);
            this.contextStorage.setItem(this.PENDING_WINDOW_SWITCHING_FLAG, false);
            this._onReady(status);
        };
        Driver.prototype._initParentWindowLink = function () {
            // NOTE: we need to create parentWindowDriverLinks in the following cases:
            // multiple-windows mode is enabled
            // current window has parent window
            // current window parent is not the same as current window
            // the last case is possible when we have the series of multiple and non-multiple windows tests
            if (window.opener && window.opener !== window && this.windowId)
                this.parentWindowDriverLink = new ParentWindowDriverLink(window);
        };
        Driver.prototype._initConsoleMessages = function () {
            var messages = this.consoleMessages;
            messages.ensureMessageContainer(this.windowId);
            this.consoleMessages = messages;
        };
        Driver.prototype._getDriverRole = function () {
            return __awaiter(this, void 0, void 0, function () {
                var activeWindowId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.windowId)
                                return [2 /*return*/, DriverRole.master];
                            return [4 /*yield*/, testcafeCore.browser.getActiveWindowId(this.communicationUrls.activeWindowId, hammerhead__default.createNativeXHR)];
                        case 1:
                            activeWindowId = (_a.sent()).activeWindowId;
                            return [2 /*return*/, activeWindowId === this.windowId ?
                                    DriverRole.master :
                                    DriverRole.replica];
                    }
                });
            });
        };
        Driver.prototype._init = function () {
            this.contextStorage = new Storage(window, this.testRunId, this.windowId);
            this.nativeDialogsTracker = new NativeDialogTracker(this.contextStorage, this.options.dialogHandler);
            this.statusBar = new testcafeUi.StatusBar(this.runInfo.userAgent, this.runInfo.fixtureName, this.runInfo.testName, this.contextStorage);
            this.statusBar.on(this.statusBar.UNLOCK_PAGE_BTN_CLICK, testcafeCore.disableRealEventsPreventing);
            this.speed = this.options.speed;
            this._initConsoleMessages();
            this._initParentWindowLink();
            if (this._isOpenedInIframe())
                sendMessageToDriver(new ChildWindowIsLoadedInFrameMessage(this.windowId), window.opener.top, WAIT_FOR_WINDOW_DRIVER_RESPONSE_TIMEOUT, WindowNotFoundError);
        };
        Driver.prototype._doFirstPageLoadSetup = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this.isFirstPageLoad && this.options.canUseDefaultWindowActions) ;
                    return [2 /*return*/];
                });
            });
        };
        Driver.prototype.start = function () {
            return __awaiter(this, void 0, void 0, function () {
                var role;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._init();
                            return [4 /*yield*/, this._doFirstPageLoadSetup()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this._restoreChildWindowLinks()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this._getDriverRole()];
                        case 3:
                            role = _a.sent();
                            // NOTE: the child window can become master during the preceding async requests
                            // in this case we do not need to call the `_startInternal` method again
                            // since it was called during the `_handleSetAsMasterMessage` method.
                            if (this.role === DriverRole.master)
                                return [2 /*return*/];
                            if (role === DriverRole.master)
                                this._startInternal();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return Driver;
    }(testcafeCore.serviceUtils.EventEmitter));

    var ParentIframeDriverLink = /** @class */ (function () {
        function ParentIframeDriverLink(parentDriverWindow) {
            this.driverWindow = parentDriverWindow;
        }
        ParentIframeDriverLink.prototype.establishConnection = function () {
            var msg = new EstablishConnectionMessage();
            return sendMessageToDriver(msg, this.driverWindow, WAIT_FOR_IFRAME_DRIVER_RESPONSE_TIMEOUT, CurrentIframeIsNotLoadedError)
                .then(function (response) { return response.result.id; });
        };
        ParentIframeDriverLink.prototype.sendConfirmationMessage = function (requestMsgId) {
            sendConfirmationMessage({
                requestMsgId: requestMsgId,
                window: this.driverWindow,
            });
        };
        ParentIframeDriverLink.prototype.onCommandExecuted = function (status) {
            var msg = new CommandExecutedMessage(status);
            hammerhead.eventSandbox.message.sendServiceMsg(msg, this.driverWindow);
        };
        ParentIframeDriverLink.prototype.hasPendingActionFlags = function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sendMessageToDriver(new HasPendingActionFlagsMessage(), this.driverWindow, WAIT_FOR_IFRAME_DRIVER_RESPONSE_TIMEOUT, CurrentIframeIsNotLoadedError)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response.result];
                    }
                });
            });
        };
        return ParentIframeDriverLink;
    }());

    var messageSandbox$3 = hammerhead__default.eventSandbox.message;
    var IframeNativeDialogTracker = /** @class */ (function (_super) {
        __extends(IframeNativeDialogTracker, _super);
        function IframeNativeDialogTracker(dialogHandler) {
            return _super.call(this, null, dialogHandler) || this;
        }
        IframeNativeDialogTracker.prototype._defaultDialogHandler = function (type) {
            messageSandbox$3.sendServiceMsg({
                type: MESSAGE_TYPE.unexpectedDialog,
                dialogType: type,
                url: NativeDialogTracker._getPageUrl(),
            }, window.top);
        };
        IframeNativeDialogTracker.prototype._addAppearedDialogs = function (type, text) {
            messageSandbox$3.sendServiceMsg({
                type: MESSAGE_TYPE.appearedDialog,
                dialogType: type,
                text: text,
                url: NativeDialogTracker._getPageUrl(),
            }, window.top);
        };
        IframeNativeDialogTracker.prototype._onHandlerError = function (type, message) {
            messageSandbox$3.sendServiceMsg({
                type: MESSAGE_TYPE.handlerError,
                dialogType: type,
                message: message,
                url: NativeDialogTracker._getPageUrl(),
            }, window.top);
        };
        return IframeNativeDialogTracker;
    }(NativeDialogTracker));

    var messageSandbox$4 = hammerhead.eventSandbox.message;
    var IframeDriver = /** @class */ (function (_super) {
        __extends(IframeDriver, _super);
        function IframeDriver(testRunId, options) {
            var _this = _super.call(this, testRunId, {}, {}, options) || this;
            _this.lastParentDriverMessageId = null;
            _this.parentDriverLink = new ParentIframeDriverLink(window.parent);
            _this._initParentDriverListening();
            return _this;
        }
        // Errors handling
        IframeDriver.prototype._onJsError = function () {
            // NOTE: do nothing because hammerhead sends js error to the top window directly
        };
        IframeDriver.prototype._onConsoleMessage = function () {
            // NOTE: do nothing because hammerhead sends console messages to the top window directly
        };
        // NOTE: when the new page is opened in the iframe we send a message to the top window
        // to start waiting for the new page is loaded
        IframeDriver.prototype._onChildWindowOpened = function () {
            messageSandbox$4.sendServiceMsg(new ChildWindowIsOpenedInFrameMessage(), window.top);
        };
        IframeDriver.prototype._stopInternal = function () {
            messageSandbox$4.sendServiceMsg(new StopInternalFromFrameMessage(), window.top);
        };
        // Messaging between drivers
        IframeDriver.prototype._initParentDriverListening = function () {
            var _this = this;
            hammerhead.eventSandbox.message.on(hammerhead.eventSandbox.message.SERVICE_MSG_RECEIVED_EVENT, function (e) {
                var msg = e.message;
                testcafeCore.pageUnloadBarrier
                    .wait(0)
                    .then(function () {
                    // NOTE: the parent driver repeats commands sent to a child driver if it doesn't get a confirmation
                    // from the child in time. However, confirmations sent by child drivers may be delayed when the browser
                    // is heavily loaded. That's why the child driver should ignore repeated messages from its parent.
                    if (msg.type === TYPE.executeCommand) {
                        if (_this.lastParentDriverMessageId === msg.id)
                            return;
                        _this.lastParentDriverMessageId = msg.id;
                        _this.readyPromise.then(function () {
                            _this.speed = msg.testSpeed;
                            _this.parentDriverLink.sendConfirmationMessage(msg.id);
                            _this._onCommand(msg.command);
                        });
                    }
                    if (msg.type === TYPE.setNativeDialogHandler) {
                        _this.nativeDialogsTracker.setHandler(msg.dialogHandler);
                        _this._setNativeDialogHandlerInIframes(msg.dialogHandler);
                    }
                });
            });
        };
        // Commands handling
        IframeDriver.prototype._onSwitchToMainWindowCommand = function (command) {
            this._switchToMainWindow(command);
        };
        // Routing
        IframeDriver.prototype._onReady = function (status) {
            this.parentDriverLink.onCommandExecuted(status);
        };
        IframeDriver.prototype._isInCommandExecution = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!hammerhead.utils.dom.isCrossDomainWindows(window, window.parent)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.parentDriverLink.hasPendingActionFlags()];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2: return [2 /*return*/, this._hasPendingActionFlags(this.contextStorage)];
                    }
                });
            });
        };
        IframeDriver.prototype._init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var id, inCommandExecution;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.parentDriverLink.establishConnection()];
                        case 1:
                            id = _a.sent();
                            this.contextStorage = new Storage(window, id, this.windowId);
                            if (this._failIfClientCodeExecutionIsInterrupted())
                                return [2 /*return*/];
                            return [4 /*yield*/, this._isInCommandExecution()];
                        case 2:
                            inCommandExecution = _a.sent();
                            if (!inCommandExecution)
                                return [2 /*return*/];
                            this.contextStorage.setItem(this.COMMAND_EXECUTING_FLAG, false);
                            this.contextStorage.setItem(this.EXECUTING_IN_IFRAME_FLAG, false);
                            this._onReady(new DriverStatus({ isCommandResult: true }));
                            return [2 /*return*/];
                    }
                });
            });
        };
        // API
        IframeDriver.prototype.start = function () {
            this.nativeDialogsTracker = new IframeNativeDialogTracker(this.options.dialogHandler);
            this.statusBar = new testcafeUi.IframeStatusBar();
            var initializePromise = this._init();
            this.readyPromise = hammerhead.Promise.all([this.readyPromise, initializePromise]);
        };
        return IframeDriver;
    }(Driver));

    var embeddingUtils = {
        NodeSnapshot: NodeSnapshot,
        ElementSnapshot: ElementSnapshot,
        SelectorExecutor: SelectorExecutor,
    };

    var INTERNAL_PROPERTIES = {
        testCafeDriver: '%testCafeDriver%',
        testCafeIframeDriver: '%testCafeIframeDriver%',
        testCafeEmbeddingUtils: '%testCafeEmbeddingUtils%',
        testCafeDriverInstance: '%testCafeDriverInstance%',
    };

    var nativeMethods$5 = hammerhead__default.nativeMethods;
    var evalIframeScript = hammerhead__default.EVENTS.evalIframeScript;
    nativeMethods$5.objectDefineProperty(window, INTERNAL_PROPERTIES.testCafeDriver, { configurable: true, value: Driver });
    nativeMethods$5.objectDefineProperty(window, INTERNAL_PROPERTIES.testCafeIframeDriver, { configurable: true, value: IframeDriver });
    nativeMethods$5.objectDefineProperty(window, INTERNAL_PROPERTIES.testCafeEmbeddingUtils, { configurable: true, value: embeddingUtils });
    // eslint-disable-next-line no-undef
    hammerhead__default.on(evalIframeScript, function (e) { return initTestCafeClientDrivers(nativeMethods$5.contentWindowGetter.call(e.iframe), true); });

}(window['%hammerhead%'], window['%hammerhead%'].Promise, window['%testCafeCore%'], window['%testCafeAutomation%'], window['%testCafeUI%']));

    }

    initTestCafeClientDrivers(window);
})();
