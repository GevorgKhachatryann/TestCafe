window['%hammerhead%'].utils.removeInjectedScript();

// NOTE: We should have the capability to initialize scripts with different contexts.
// This is required for iframes without the src attribute because Hammerhead does not
// inject scripts into such iframes. So, we wrap all scripts in initialization functions.
(function () {
    function initTestCafeCore(window, isIFrameWithoutSrc) {
        var document = window.document;

        (function (hammerhead, Promise$5) {
    var hammerhead__default = 'default' in hammerhead ? hammerhead['default'] : hammerhead;
    Promise$5 = Promise$5 && Object.prototype.hasOwnProperty.call(Promise$5, 'default') ? Promise$5['default'] : Promise$5;

    var browserUtils = hammerhead__default.utils.browser;
    var MODIFIERS = {
        alt: 18,
        ctrl: 17,
        meta: 91,
        shift: 16,
    };
    var SHIFT_MAP = {
        '~': '`',
        '!': '1',
        '@': '2',
        '#': '3',
        '$': '4',
        '%': '5',
        '^': '6',
        '&': '7',
        '*': '8',
        '(': '9',
        ')': '0',
        '_': '-',
        '+': '=',
        '{': '[',
        '}': ']',
        ':': ';',
        '"': '\'',
        '|': '\\',
        '<': ',',
        '>': '.',
        '?': '/',
        '±': '§',
    };
    var SPECIAL_KEYS = {
        backspace: 8,
        capslock: 20,
        delete: 46,
        down: 40,
        end: 35,
        enter: 13,
        esc: 27,
        home: 36,
        ins: 45,
        left: 37,
        pagedown: 34,
        pageup: 33,
        right: 39,
        space: 32,
        tab: 9,
        up: 38,
    };
    var KEY_PROPERTY = {
        left: browserUtils.isIE ? 'Left' : 'ArrowLeft',
        down: browserUtils.isIE ? 'Down' : 'ArrowDown',
        right: browserUtils.isIE ? 'Right' : 'ArrowRight',
        up: browserUtils.isIE ? 'Up' : 'ArrowUp',
        backspace: 'Backspace',
        capslock: 'CapsLock',
        delete: 'Delete',
        end: 'End',
        enter: 'Enter',
        esc: 'Escape',
        home: 'Home',
        ins: 'Insert',
        pagedown: 'PageDown',
        pageup: 'PageUp',
        space: browserUtils.isIE ? 'Spacebar' : ' ',
        tab: 'Tab',
        alt: 'Alt',
        ctrl: 'Control',
        meta: 'Meta',
        shift: 'Shift',
    };
    function reverseMap(map) {
        var reversed = {};
        for (var key in map) {
            if (map.hasOwnProperty(key))
                reversed[map[key]] = key;
        }
        return reversed;
    }
    var KEY_MAPS = {
        modifiers: MODIFIERS,
        shiftMap: SHIFT_MAP,
        specialKeys: SPECIAL_KEYS,
        keyProperty: KEY_PROPERTY,
        modifiersMap: {
            option: 'alt',
        },
        symbolCharCodeToKeyCode: {
            96: 192,
            91: 219,
            93: 221,
            92: 220,
            59: 186,
            39: 222,
            44: 188,
            45: browserUtils.isFirefox ? 173 : 189,
            46: 190,
            47: 191, // /
        },
        symbolKeysCharCodes: {
            109: 45,
            173: 45,
            186: 59,
            187: 61,
            188: 44,
            189: 45,
            190: 46,
            191: 47,
            192: 96,
            219: 91,
            220: 92,
            221: 93,
            222: 39,
            110: 46,
            96: 48,
            97: 49,
            98: 50,
            99: 51,
            100: 52,
            101: 53,
            102: 54,
            103: 55,
            104: 56,
            105: 57,
            107: 43,
            106: 42,
            111: 47,
        },
        reversedModifiers: reverseMap(MODIFIERS),
        reversedShiftMap: reverseMap(SHIFT_MAP),
        reversedSpecialKeys: reverseMap(SPECIAL_KEYS),
        reversedKeyProperty: reverseMap(KEY_PROPERTY),
    };

    var Promise = hammerhead__default.Promise;
    var nativeMethods = hammerhead__default.nativeMethods;
    function delay (ms) {
        return new Promise(function (resolve) { return nativeMethods.setTimeout.call(window, resolve, ms); });
    }

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
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise$5))(function (resolve, reject) {
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

    var REQUEST_SEND_EVENT = 'request-send';
    var REQUEST_COMPLETED_EVENT = 'request-completed';
    var REQUEST_ERROR_EVENT = 'request-error';
    var HammerheadClientRequestEmitter = /** @class */ (function (_super) {
        __extends(HammerheadClientRequestEmitter, _super);
        function HammerheadClientRequestEmitter() {
            var _this = _super.call(this) || this;
            _this._hammerheadListenersInfo = [];
            _this._addHammerheadListener(hammerhead__default.EVENTS.beforeXhrSend, function (_a) {
                var xhr = _a.xhr;
                return _this.emit(REQUEST_SEND_EVENT, xhr);
            });
            _this._addHammerheadListener(hammerhead__default.EVENTS.xhrCompleted, function (_a) {
                var xhr = _a.xhr;
                return _this.emit(REQUEST_COMPLETED_EVENT, xhr);
            });
            _this._addHammerheadListener(hammerhead__default.EVENTS.xhrError, function (_a) {
                var xhr = _a.xhr;
                return _this.emit(REQUEST_ERROR_EVENT, xhr);
            });
            _this._addHammerheadListener(hammerhead__default.EVENTS.fetchSent, function (fetch) {
                _this.emit(REQUEST_SEND_EVENT, fetch);
                fetch.then(function () { return _this.emit(REQUEST_COMPLETED_EVENT, fetch); }, function () { return _this.emit(REQUEST_ERROR_EVENT, fetch); });
            });
            return _this;
        }
        HammerheadClientRequestEmitter.prototype._addHammerheadListener = function (evt, listener) {
            hammerhead__default.on(evt, listener);
            this._hammerheadListenersInfo.push({ evt: evt, listener: listener });
        };
        HammerheadClientRequestEmitter.prototype.onRequestSend = function (listener) {
            this.on(REQUEST_SEND_EVENT, listener);
        };
        HammerheadClientRequestEmitter.prototype.onRequestCompleted = function (listener) {
            this.on(REQUEST_COMPLETED_EVENT, listener);
        };
        HammerheadClientRequestEmitter.prototype.onRequestError = function (listener) {
            this.on(REQUEST_ERROR_EVENT, listener);
        };
        HammerheadClientRequestEmitter.prototype.offAll = function () {
            _super.prototype.offAll.call(this);
            for (var _i = 0, _a = this._hammerheadListenersInfo; _i < _a.length; _i++) {
                var info = _a[_i];
                hammerhead__default.off.call(hammerhead__default, info.evt, info.listener);
            }
        };
        return HammerheadClientRequestEmitter;
    }(EventEmitter));

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

    var nativeMethods$1 = hammerhead__default.nativeMethods;
    var SCRIPT_ADDED = 'script-added';
    var SCRIPT_LOADED_OR_FAILED = 'script-loaded-or-failed';
    var HammerheadScriptExecutionEmitter = /** @class */ (function (_super) {
        __extends(HammerheadScriptExecutionEmitter, _super);
        function HammerheadScriptExecutionEmitter() {
            var _this = _super.call(this) || this;
            _this._scriptElementAddedListener = function (_a) {
                var el = _a.el;
                return _this._onScriptElementAdded(el);
            };
            hammerhead__default.on(hammerhead__default.EVENTS.scriptElementAdded, _this._scriptElementAddedListener);
            return _this;
        }
        HammerheadScriptExecutionEmitter.prototype._onScriptElementAdded = function (script) {
            var _this = this;
            var scriptSrc = nativeMethods$1.scriptSrcGetter.call(script);
            if (scriptSrc === void 0 || scriptSrc === '')
                return;
            this.emit(SCRIPT_ADDED, script);
            var done = function () {
                nativeMethods$1.removeEventListener.call(script, 'load', done);
                nativeMethods$1.removeEventListener.call(script, 'error', done);
                _this.emit(SCRIPT_LOADED_OR_FAILED, script);
            };
            nativeMethods$1.addEventListener.call(script, 'load', done);
            nativeMethods$1.addEventListener.call(script, 'error', done);
        };
        HammerheadScriptExecutionEmitter.prototype.onScriptAdded = function (listener) {
            this.on(SCRIPT_ADDED, listener);
        };
        HammerheadScriptExecutionEmitter.prototype.onScriptLoadedOrFailed = function (listener) {
            this.on(SCRIPT_LOADED_OR_FAILED, listener);
        };
        HammerheadScriptExecutionEmitter.prototype.offAll = function () {
            _super.prototype.offAll.call(this);
            hammerhead__default.off(hammerhead__default.EVENTS.scriptElementAdded, this._onScriptElementAdded);
        };
        return HammerheadScriptExecutionEmitter;
    }(EventEmitter));

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
    function isArray(arg) {
        return hammerhead.nativeMethods.objectToString.call(arg) === '[object Array]';
    }
    function from(arg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (hammerhead.nativeMethods.arrayFrom)
            return hammerhead.nativeMethods.arrayFrom.apply(hammerhead.nativeMethods, __spreadArray([arg], args, false));
        // NOTE: this logic is for IE
        var arr = [];
        var length = arg.length;
        for (var i = 0; i < length; i++)
            arr.push(arg[i]);
        return arr;
    }
    function find(arr, callback) {
        if (hammerhead.nativeMethods.arrayFind)
            return hammerhead.nativeMethods.arrayFind.call(arr, callback);
        // NOTE: this logic is for IE
        var length = arr.length;
        for (var i = 0; i < length; i++) {
            if (callback(arr[i], i, arr))
                return arr[i];
        }
        return null;
    }
    function remove(arr, item) {
        var index = hammerhead.nativeMethods.arrayIndexOf.call(arr, item);
        if (index > -1)
            hammerhead.nativeMethods.arraySplice.call(arr, index, 1);
    }
    function equals(arr1, arr2) {
        if (arr1.length !== arr2.length)
            return false;
        for (var i = 0, l = arr1.length; i < l; i++) {
            if (arr1[i] !== arr2[i])
                return false;
        }
        return true;
    }
    function getCommonElement(arr1, arr2) {
        for (var i = 0; i < arr1.length; i++) {
            for (var t = 0; t < arr2.length; t++) {
                if (arr1[i] === arr2[t])
                    return arr1[i];
            }
        }
        return null;
    }

    var arrayUtils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        filter: filter,
        map: map,
        slice: slice,
        splice: splice,
        unshift: unshift,
        forEach: forEach,
        indexOf: indexOf,
        some: some,
        reverse: reverse,
        reduce: reduce,
        concat: concat,
        join: join,
        isArray: isArray,
        from: from,
        find: find,
        remove: remove,
        equals: equals,
        getCommonElement: getCommonElement
    });

    var browserUtils$1 = hammerhead__default.utils.browser;
    var nativeMethods$2 = hammerhead__default.nativeMethods;
    // NOTE: We have to retrieve styleUtils.get from hammerhead
    // to avoid circular dependencies between domUtils and styleUtils
    var getElementStyleProperty = hammerhead__default.utils.style.get;
    var getActiveElement = hammerhead__default.utils.dom.getActiveElement;
    var findDocument = hammerhead__default.utils.dom.findDocument;
    var find$1 = hammerhead__default.utils.dom.find;
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
    function canFocus(element, parent, tabIndex) {
        var activeElement = null;
        if (parent.nodeType === Node.DOCUMENT_NODE)
            activeElement = nativeMethods$2.documentActiveElementGetter.call(parent);
        if (element === activeElement)
            return true;
        if (element.disabled)
            return false;
        if (getElementStyleProperty(element, 'display') === 'none' || getElementStyleProperty(element, 'visibility') === 'hidden')
            return false;
        if ((browserUtils$1.isIE || browserUtils$1.isAndroid) && isOptionElement(element))
            return false;
        if (tabIndex !== null && tabIndex < 0)
            return false;
        return true;
    }
    function wrapElement(el) {
        return {
            el: el,
            skip: el.shadowRoot && el.tabIndex < 0,
            children: {},
        };
    }
    function buildFocusableTree(parent, sort) {
        var node = wrapElement(parent);
        parent = parent.shadowRoot || parent;
        if (isIframeElement(parent))
            parent = nativeMethods$2.contentDocumentGetter.call(parent);
        if (parent && (parent.nodeType === Node.DOCUMENT_FRAGMENT_NODE || parent.nodeType === Node.DOCUMENT_NODE)) {
            var elements = filterFocusableElements(parent);
            for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                var el = elements_1[_i];
                var key = !sort || el.tabIndex <= 0 ? -1 : el.tabIndex;
                node.children[key] = node.children[key] || [];
                node.children[key].push(buildFocusableTree(el, sort));
            }
        }
        return node;
    }
    function filterFocusableElements(parent) {
        // NOTE: We don't take into account the case of embedded contentEditable
        // elements and specify the contentEditable attribute for focusable elements
        var allElements = parent.querySelectorAll('*');
        var invisibleElements = getInvisibleElements(allElements);
        var inputElementsRegExp = /^(input|button|select|textarea)$/;
        var focusableElements = [];
        var element = null;
        var tagName = null;
        var tabIndex = null;
        var needPush = false;
        for (var i = 0; i < allElements.length; i++) {
            element = allElements[i];
            tagName = getTagName(element);
            tabIndex = getTabIndexAttributeIntValue(element);
            needPush = false;
            if (!canFocus(element, parent, tabIndex))
                continue;
            if (inputElementsRegExp.test(tagName))
                needPush = true;
            else if (element.shadowRoot)
                needPush = true;
            else if (isIframeElement(element))
                needPush = true;
            else if (isAnchorElement(element) && element.hasAttribute('href'))
                needPush = element.getAttribute('href') !== '' || !browserUtils$1.isIE || tabIndex !== null;
            var contentEditableAttr = element.getAttribute('contenteditable');
            if (contentEditableAttr === '' || contentEditableAttr === 'true')
                needPush = true;
            if (tabIndex !== null)
                needPush = true;
            if (needPush)
                focusableElements.push(element);
        }
        //NOTE: remove children of invisible elements
        return filter(focusableElements, function (el) { return !containsElement(invisibleElements, el); });
    }
    function flattenFocusableTree(node) {
        var result = [];
        if (!node.skip && node.el.nodeType !== Node.DOCUMENT_NODE && !isIframeElement(node.el))
            result.push(node.el);
        for (var prop in node.children) {
            for (var _i = 0, _a = node.children[prop]; _i < _a.length; _i++) {
                var childNode = _a[_i];
                result.push.apply(result, flattenFocusableTree(childNode));
            }
        }
        return result;
    }
    function getFocusableElements(doc, sort) {
        if (sort === void 0) { sort = false; }
        var root = buildFocusableTree(doc, sort);
        return flattenFocusableTree(root);
    }
    function getInvisibleElements(elements) {
        var invisibleElements = [];
        for (var i = 0; i < elements.length; i++) {
            if (getElementStyleProperty(elements[i], 'display') === 'none')
                invisibleElements.push(elements[i]);
        }
        return invisibleElements;
    }
    function getTabIndexAttributeIntValue(el) {
        var tabIndex = nativeMethods$2.getAttribute.call(el, 'tabindex');
        if (tabIndex !== null) {
            tabIndex = parseInt(tabIndex, 10);
            tabIndex = isNaN(tabIndex) ? null : tabIndex;
        }
        return tabIndex;
    }
    function containsElement(elements, element) {
        if (elements.contains)
            return elements.contains(element);
        return some(elements, function (parent) { return parent.contains(element); });
    }
    function getTextareaIndentInLine(textarea, position) {
        var textareaValue = getTextAreaValue(textarea);
        if (!textareaValue)
            return 0;
        var topPart = textareaValue.substring(0, position);
        var linePosition = topPart.lastIndexOf('\n') === -1 ? 0 : topPart.lastIndexOf('\n') + 1;
        return position - linePosition;
    }
    function getTextareaLineNumberByPosition(textarea, position) {
        var textareaValue = getTextAreaValue(textarea);
        var lines = textareaValue.split('\n');
        var topPartLength = 0;
        var line = 0;
        for (var i = 0; topPartLength <= position; i++) {
            if (position <= topPartLength + lines[i].length) {
                line = i;
                break;
            }
            topPartLength += lines[i].length + 1;
        }
        return line;
    }
    function getTextareaPositionByLineAndOffset(textarea, line, offset) {
        var textareaValue = getTextAreaValue(textarea);
        var lines = textareaValue.split('\n');
        var lineIndex = 0;
        for (var i = 0; i < line; i++)
            lineIndex += lines[i].length + 1;
        return lineIndex + offset;
    }
    // NOTE: the form is also submitted on enter key press if there is only one input of certain
    // types (referred to as types that block implicit submission in the HTML5 standard) on the
    // form and this input is focused (http://www.w3.org/TR/html5/forms.html#implicit-submission)
    function blocksImplicitSubmission(el) {
        var inputTypeRegExp = null;
        if (browserUtils$1.isSafari)
            inputTypeRegExp = /^(text|password|color|date|time|datetime|datetime-local|email|month|number|search|tel|url|week|image)$/i;
        else if (browserUtils$1.isFirefox)
            inputTypeRegExp = /^(text|password|date|time|datetime|datetime-local|email|month|number|search|tel|url|week|image)$/i;
        else if (browserUtils$1.isIE)
            inputTypeRegExp = /^(text|password|color|date|time|datetime|datetime-local|email|file|month|number|search|tel|url|week|image)$/i;
        else
            inputTypeRegExp = /^(text|password|datetime|email|number|search|tel|url|image)$/i;
        return inputTypeRegExp.test(el.type);
    }
    function isEditableElement(el, checkEditingAllowed) {
        return checkEditingAllowed ?
            isTextEditableElementAndEditingAllowed(el) || isContentEditableElement(el) :
            isTextEditableElement(el) || isContentEditableElement(el);
    }
    function isElementContainsNode(parentElement, childNode) {
        if (isTheSameNode(childNode, parentElement))
            return true;
        var childNodes = nativeMethods$2.nodeChildNodesGetter.call(parentElement);
        var length = getChildNodesLength(childNodes);
        for (var i = 0; i < length; i++) {
            var el = childNodes[i];
            if (!isShadowUIElement(el) && isElementContainsNode(el, childNode))
                return true;
        }
        return false;
    }
    function isOptionGroupElement(element) {
        return hammerhead__default.utils.dom.instanceToString(element) === '[object HTMLOptGroupElement]';
    }
    function getElementIndexInParent(parent, child) {
        var children = parent.querySelectorAll(getTagName(child));
        return indexOf(children, child);
    }
    function isTheSameNode(node1, node2) {
        //NOTE: Mozilla has not isSameNode method
        if (node1 && node2 && node1.isSameNode)
            return node1.isSameNode(node2);
        return node1 === node2;
    }
    function getElementDescription(el) {
        var attributes = {
            id: 'id',
            name: 'name',
            'class': 'className',
        };
        var res = [];
        res.push('<');
        res.push(getTagName(el));
        for (var attr in attributes) {
            if (attributes.hasOwnProperty(attr)) { //eslint-disable-line no-prototype-builtins
                var val = el[attributes[attr]];
                if (val)
                    res.push(' ' + attr + '="' + val + '"');
            }
        }
        res.push('>');
        return res.join('');
    }
    function getFocusableParent(el) {
        var parents = getParents(el);
        for (var i = 0; i < parents.length; i++) {
            if (isElementFocusable(parents[i]))
                return parents[i];
        }
        return null;
    }
    function remove$1(el) {
        if (el && el.parentElement)
            el.parentElement.removeChild(el);
    }
    function isIFrameWindowInDOM(win) {
        //NOTE: In MS Edge, if an iframe is removed from DOM, the browser throws an exception when accessing window.top
        //and window.frameElement. Fortunately, setTimeout is set to undefined in this case.
        if (!win.setTimeout)
            return false;
        var frameElement = null;
        try {
            //NOTE: This may raise a cross-domain policy error in some browsers.
            frameElement = win.frameElement;
        }
        catch (e) {
            return !!win.top;
        }
        // NOTE: in Firefox and WebKit, frameElement is null for cross-domain iframes even if they are in the DOM.
        // But these browsers don't execute scripts in removed iframes, so we suppose that the iframe is in the DOM.
        if ((browserUtils$1.isFirefox || browserUtils$1.isWebKit) && win.top !== win && !frameElement)
            return true;
        return !!(frameElement && nativeMethods$2.contentDocumentGetter.call(frameElement));
    }
    function isTopWindow(win) {
        try {
            //NOTE: MS Edge throws an exception when trying to access window.top from an iframe removed from DOM
            return win.top === win;
        }
        catch (e) {
            return false;
        }
    }
    function findIframeByWindow(iframeWindow) {
        var iframes = [];
        find$1(document, '*', function (elem) {
            if (elem.tagName === 'IFRAME')
                iframes.push(elem);
            if (elem.shadowRoot)
                find$1(elem.shadowRoot, 'iframe', function (iframe) { return iframes.push(iframe); });
        });
        for (var i = 0; i < iframes.length; i++) {
            if (nativeMethods$2.contentWindowGetter.call(iframes[i]) === iframeWindow)
                return iframes[i];
        }
        return null;
    }
    function isEditableFormElement(element) {
        return isTextEditableElement(element) || isSelectElement(element);
    }
    function getCommonAncestor(element1, element2) {
        if (isTheSameNode(element1, element2))
            return element1;
        var el1Parents = [element1].concat(getParents(element1));
        var commonAncestor = element2;
        while (commonAncestor) {
            if (indexOf(el1Parents, commonAncestor) > -1)
                return commonAncestor;
            commonAncestor = nativeMethods$2.nodeParentNodeGetter.call(commonAncestor);
        }
        return commonAncestor;
    }
    function getChildrenLength(children) {
        return nativeMethods$2.htmlCollectionLengthGetter.call(children);
    }
    function getChildNodesLength(childNodes) {
        return nativeMethods$2.nodeListLengthGetter.call(childNodes);
    }
    function getInputValue(input) {
        return nativeMethods$2.inputValueGetter.call(input);
    }
    function getTextAreaValue(textArea) {
        return nativeMethods$2.textAreaValueGetter.call(textArea);
    }
    function setInputValue(input, value) {
        return nativeMethods$2.inputValueSetter.call(input, value);
    }
    function setTextAreaValue(textArea, value) {
        return nativeMethods$2.textAreaValueSetter.call(textArea, value);
    }
    function getElementValue(element) {
        if (isInputElement(element))
            return getInputValue(element);
        else if (isTextAreaElement(element))
            return getTextAreaValue(element);
        /*eslint-disable no-restricted-properties*/
        return element.value;
        /*eslint-enable no-restricted-properties*/
    }
    function setElementValue(element, value) {
        if (isInputElement(element))
            return setInputValue(element, value);
        else if (isTextAreaElement(element))
            return setTextAreaValue(element, value);
        /*eslint-disable no-restricted-properties*/
        element.value = value;
        /*eslint-enable no-restricted-properties*/
        return value;
    }
    function isShadowElement(element) {
        return element && element.getRootNode && findDocument(element) !== element.getRootNode();
    }
    function contains(element, target) {
        if (!element || !target)
            return false;
        if (element.contains)
            return element.contains(target);
        return !!findParent(target, true, function (node) { return node === element; });
    }
    function isNodeEqual(el1, el2) {
        return el1 === el2;
    }
    function getNodeText(el) {
        return nativeMethods$2.nodeTextContentGetter.call(el);
    }
    function getImgMapName(img) {
        return img.useMap.substring(1);
    }
    function getDocumentElement(win) {
        return win.document.documentElement;
    }
    function isDocumentElement(el) {
        return el === document.documentElement;
    }

    var domUtils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        getActiveElement: getActiveElement,
        findDocument: findDocument,
        find: find$1,
        isElementInDocument: isElementInDocument,
        isElementInIframe: isElementInIframe,
        getIframeByElement: getIframeByElement,
        isCrossDomainWindows: isCrossDomainWindows,
        getSelectParent: getSelectParent,
        getChildVisibleIndex: getChildVisibleIndex,
        getSelectVisibleChildren: getSelectVisibleChildren,
        isElementNode: isElementNode,
        isTextNode: isTextNode,
        isRenderedNode: isRenderedNode,
        isIframeElement: isIframeElement,
        isInputElement: isInputElement,
        isButtonElement: isButtonElement,
        isFileInput: isFileInput,
        isTextAreaElement: isTextAreaElement,
        isAnchorElement: isAnchorElement,
        isImgElement: isImgElement,
        isFormElement: isFormElement,
        isLabelElement: isLabelElement,
        isSelectElement: isSelectElement,
        isRadioButtonElement: isRadioButtonElement,
        isColorInputElement: isColorInputElement,
        isCheckboxElement: isCheckboxElement,
        isOptionElement: isOptionElement,
        isSVGElement: isSVGElement,
        isMapElement: isMapElement,
        isBodyElement: isBodyElement,
        isHtmlElement: isHtmlElement,
        isDocument: isDocument,
        isWindow: isWindow,
        isTextEditableInput: isTextEditableInput,
        isTextEditableElement: isTextEditableElement,
        isTextEditableElementAndEditingAllowed: isTextEditableElementAndEditingAllowed,
        isContentEditableElement: isContentEditableElement,
        isDomElement: isDomElement,
        isShadowUIElement: isShadowUIElement,
        isShadowRoot: isShadowRoot,
        isElementFocusable: isElementFocusable,
        isHammerheadAttr: isHammerheadAttr,
        isElementReadOnly: isElementReadOnly,
        getScrollbarSize: getScrollbarSize,
        getMapContainer: getMapContainer,
        getTagName: getTagName,
        closest: closest,
        getParents: getParents,
        findParent: findParent,
        getTopSameDomainWindow: getTopSameDomainWindow,
        getParentExceptShadowRoot: getParentExceptShadowRoot,
        getFocusableElements: getFocusableElements,
        getTabIndexAttributeIntValue: getTabIndexAttributeIntValue,
        containsElement: containsElement,
        getTextareaIndentInLine: getTextareaIndentInLine,
        getTextareaLineNumberByPosition: getTextareaLineNumberByPosition,
        getTextareaPositionByLineAndOffset: getTextareaPositionByLineAndOffset,
        blocksImplicitSubmission: blocksImplicitSubmission,
        isEditableElement: isEditableElement,
        isElementContainsNode: isElementContainsNode,
        isOptionGroupElement: isOptionGroupElement,
        getElementIndexInParent: getElementIndexInParent,
        isTheSameNode: isTheSameNode,
        getElementDescription: getElementDescription,
        getFocusableParent: getFocusableParent,
        remove: remove$1,
        isIFrameWindowInDOM: isIFrameWindowInDOM,
        isTopWindow: isTopWindow,
        findIframeByWindow: findIframeByWindow,
        isEditableFormElement: isEditableFormElement,
        getCommonAncestor: getCommonAncestor,
        getChildrenLength: getChildrenLength,
        getChildNodesLength: getChildNodesLength,
        getInputValue: getInputValue,
        getTextAreaValue: getTextAreaValue,
        setInputValue: setInputValue,
        setTextAreaValue: setTextAreaValue,
        getElementValue: getElementValue,
        setElementValue: setElementValue,
        isShadowElement: isShadowElement,
        contains: contains,
        isNodeEqual: isNodeEqual,
        getNodeText: getNodeText,
        getImgMapName: getImgMapName,
        getDocumentElement: getDocumentElement,
        isDocumentElement: isDocumentElement
    });

    var Promise$1 = hammerhead__default.Promise;
    var nativeMethods$3 = hammerhead__default.nativeMethods;
    var listeners = hammerhead__default.eventSandbox.listeners;
    var browserUtils$2 = hammerhead__default.utils.browser;
    // Imported form the hammerhead
    var BUTTON = hammerhead__default.utils.event.BUTTON;
    var BUTTONS_PARAMETER = hammerhead__default.utils.event.BUTTONS_PARAMETER;
    var DOM_EVENTS = hammerhead__default.utils.event.DOM_EVENTS;
    var WHICH_PARAMETER = hammerhead__default.utils.event.WHICH_PARAMETER;
    var preventDefault = hammerhead__default.utils.event.preventDefault;
    function bind(el, event, handler, useCapture) {
        if (browserUtils$2.isIE11 && isWindow(el))
            nativeMethods$3.windowAddEventListener.call(el, event, handler, useCapture);
        else
            nativeMethods$3.addEventListener.call(el, event, handler, useCapture);
    }
    function unbind(el, event, handler, useCapture) {
        if (browserUtils$2.isIE11 && isWindow(el))
            nativeMethods$3.windowRemoveEventListener.call(el, event, handler, useCapture);
        else
            nativeMethods$3.removeEventListener.call(el, event, handler, useCapture);
    }
    // Document ready
    var waitForDomContentLoaded = function () {
        // NOTE: We can't use a regular Promise here, because window.load event can happen in the same event loop pass
        // The default Promise will call resolve handlers in the next pass, and load event will be lost.
        var resolveHandlers = [];
        function createPromiseResolver(resolveHandler) {
            return new Promise$1(function (resolve) { return resolveHandlers.push(function () { return resolve(resolveHandler()); }); });
        }
        var isReady = false;
        function ready() {
            if (isReady)
                return;
            if (!document.body) {
                nativeMethods$3.setTimeout.call(window, ready, 1);
                return;
            }
            isReady = true;
            resolveHandlers.forEach(function (handler) { return handler(); });
        }
        function onContentLoaded() {
            if (!isIFrameWindowInDOM(window) && !isTopWindow(window))
                return;
            unbind(document, 'DOMContentLoaded', onContentLoaded);
            ready();
        }
        if (document.readyState === 'complete')
            nativeMethods$3.setTimeout.call(window, onContentLoaded, 1);
        else
            bind(document, 'DOMContentLoaded', onContentLoaded);
        return { then: function (handler) { return createPromiseResolver(handler); } };
    };
    var waitForWindowLoad = function () { return new Promise$1(function (resolve) { return bind(window, 'load', resolve); }); };
    function documentReady(pageLoadTimeout) {
        if (pageLoadTimeout === void 0) { pageLoadTimeout = 0; }
        return waitForDomContentLoaded()
            .then(function () {
            if (!listeners.getEventListeners(window, 'load').length)
                return null;
            return Promise$1.race([waitForWindowLoad(), delay(pageLoadTimeout)]);
        });
    }

    var eventUtils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        BUTTON: BUTTON,
        BUTTONS_PARAMETER: BUTTONS_PARAMETER,
        DOM_EVENTS: DOM_EVENTS,
        WHICH_PARAMETER: WHICH_PARAMETER,
        preventDefault: preventDefault,
        bind: bind,
        unbind: unbind,
        documentReady: documentReady
    });

    var ClientMessages;
    (function (ClientMessages) {
        ClientMessages["ready"] = "ready";
        ClientMessages["readyForBrowserManipulation"] = "ready-for-browser-manipulation";
        ClientMessages["waitForFileDownload"] = "wait-for-file-download";
    })(ClientMessages || (ClientMessages = {}));
    var MESSAGE = ClientMessages;

    var Promise$2 = hammerhead__default.Promise;
    var browserUtils$3 = hammerhead__default.utils.browser;
    var nativeMethods$4 = hammerhead__default.nativeMethods;
    var transport = hammerhead__default.transport;
    var DEFAULT_BARRIER_TIMEOUT = 400;
    var SHORT_WAIT_FOR_UNLOAD_TIMEOUT = 30;
    var FILE_DOWNLOAD_CHECK_DELAY = 500;
    var MAX_UNLOADING_TIMEOUT = 15000;
    var unloading = false;
    var pageNavigationTriggeredListener = null;
    var pageNavigationTriggered = false;
    function onBeforeUnload() {
        if (browserUtils$3.isIE) {
            prolongUnloadWaitingIeOnly(SHORT_WAIT_FOR_UNLOAD_TIMEOUT);
            exceptFileDownloadingIeOnly();
            return;
        }
        unloading = true;
    }
    // NOTE: this variables are for IE only
    var waitingForUnload = false;
    var waitingForUnloadTimeoutId = null;
    var waitingPromiseResolvers = [];
    function prolongUnloadWaitingIeOnly(timeout) {
        if (waitingForUnloadTimeoutId)
            nativeMethods$4.clearTimeout.call(window, waitingForUnloadTimeoutId);
        waitingForUnload = true;
        waitingForUnloadTimeoutId = nativeMethods$4.setTimeout.call(window, function () {
            waitingForUnloadTimeoutId = null;
            waitingForUnload = false;
            waitingPromiseResolvers.forEach(function (resolve) { return resolve(); });
            waitingPromiseResolvers = [];
        }, timeout);
    }
    function exceptFileDownloadingIeOnly() {
        delay(0)
            .then(function () {
            // NOTE: except file downloading
            if (document.readyState === 'loading') {
                var activeElement = nativeMethods$4.documentActiveElementGetter.call(document);
                if (!activeElement || !isAnchorElement(activeElement) || !activeElement.hasAttribute('download'))
                    unloading = true;
            }
        });
    }
    function waitForFileDownload() {
        return delay(FILE_DOWNLOAD_CHECK_DELAY)
            .then(function () { return transport.queuedAsyncServiceMsg({ cmd: MESSAGE.waitForFileDownload }); })
            // eslint-disable-next-line consistent-return
            .then(function (fileDownloadingHandled) {
            // NOTE: we use a flag to confirm file download because if unload
            // is raised the browser can respond with an empty string
            if (!fileDownloadingHandled)
                return new Promise$2(function () { }); // eslint-disable-line @typescript-eslint/no-empty-function
        });
    }
    // API
    function init() {
        hammerhead__default.on(hammerhead__default.EVENTS.beforeUnload, onBeforeUnload);
        bind(window, 'unload', function () {
            unloading = true;
        });
    }
    function watchForPageNavigationTriggers() {
        pageNavigationTriggeredListener = function () {
            pageNavigationTriggered = true;
        };
        hammerhead__default.on(hammerhead__default.EVENTS.pageNavigationTriggered, pageNavigationTriggeredListener);
    }
    function wait(timeout) {
        if (timeout === void 0)
            timeout = !pageNavigationTriggeredListener || pageNavigationTriggered ? DEFAULT_BARRIER_TIMEOUT : 0;
        if (pageNavigationTriggeredListener) {
            hammerhead__default.off(hammerhead__default.EVENTS.pageNavigationTriggered, pageNavigationTriggeredListener);
            pageNavigationTriggeredListener = null;
        }
        var waitForUnloadingPromise = delay(timeout)
            // eslint-disable-next-line consistent-return
            .then(function () {
            if (unloading) {
                return waitForFileDownload()
                    .then(function () {
                    unloading = false;
                });
            }
            if (waitingForUnload)
                return new Promise$2(function (resolve) { return waitingPromiseResolvers.push(resolve); });
        });
        // NOTE: sometimes the page isn't actually unloaded after the beforeunload event
        // fires (see issues #664, #437). To avoid test hanging, we resolve the unload
        // barrier waiting promise in MAX_UNLOADING_TIMEOUT. We can improve this logic when
        // the https://github.com/DevExpress/testcafe-hammerhead/issues/667 issue is fixed.
        var watchdog = delay(MAX_UNLOADING_TIMEOUT)
            .then(function () {
            unloading = false;
        });
        return Promise$2.race([waitForUnloadingPromise, watchdog]);
    }

    var pageUnloadBarrier = /*#__PURE__*/Object.freeze({
        __proto__: null,
        init: init,
        watchForPageNavigationTriggers: watchForPageNavigationTriggers,
        wait: wait
    });

    var EventEmitter$1 = EventEmitter;
    function inherit(Child, Parent) {
        var Func = function () {
        };
        Func.prototype = Parent.prototype;
        hammerhead__default.utils.extend(Child.prototype, new Func());
        Child.prototype.constructor = Child;
        Child.base = Parent.prototype;
    }

    var serviceUtils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        EventEmitter: EventEmitter$1,
        inherit: inherit
    });

    var listeners$1 = hammerhead.eventSandbox.listeners;
    var ScrollController = /** @class */ (function () {
        function ScrollController() {
            this.initialized = false;
            this.stopPropagationFlag = false;
            this.events = new EventEmitter$1();
        }
        ScrollController.prototype._internalListener = function (event, dispatched, preventEvent, cancelHandlers, stopPropagation) {
            this.events.emit('scroll', event);
            if (this.stopPropagationFlag) {
                cancelHandlers();
                stopPropagation();
            }
        };
        ScrollController.prototype.init = function () {
            var _this = this;
            if (this.initialized)
                return;
            this.initialized = true;
            listeners$1.initElementListening(window, ['scroll']);
            listeners$1.addFirstInternalEventBeforeListener(window, ['scroll'], function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this._internalListener.apply(_this, args);
            });
        };
        ScrollController.prototype.waitForScroll = function (scrollElement) {
            var _this = this;
            var promiseResolver = null;
            var promise = new hammerhead.Promise(function (resolve) {
                promiseResolver = resolve;
            });
            promise.cancel = function () { return _this.events.off('scroll', promiseResolver); };
            if (this.initialized)
                this.handleScrollEvents(scrollElement, promiseResolver);
            else
                promiseResolver();
            return promise;
        };
        ScrollController.prototype.handleScrollEvents = function (el, handler) {
            var _this = this;
            this.events.once('scroll', handler);
            if (isShadowElement(el)) {
                listeners$1.initElementListening(el, ['scroll']);
                listeners$1.addFirstInternalEventBeforeListener(el, ['scroll'], function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    _this._internalListener.apply(_this, args);
                    listeners$1.cancelElementListening(el);
                });
            }
        };
        ScrollController.prototype.stopPropagation = function () {
            this.stopPropagationFlag = true;
        };
        ScrollController.prototype.enablePropagation = function () {
            this.stopPropagationFlag = false;
        };
        return ScrollController;
    }());
    var scrollController = new ScrollController();

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
    function set(el, style, value) {
        if (typeof style === 'string')
            styleUtils.set(el, style, value);
        for (var property in style) {
            if (style.hasOwnProperty(property))
                styleUtils.set(el, property, style[property]);
        }
    }
    function getViewportDimension(windowDimension, documentDimension, bodyDimension) {
        if (documentDimension > windowDimension)
            return bodyDimension;
        if (bodyDimension > windowDimension)
            return documentDimension;
        return Math.max(bodyDimension, documentDimension);
    }
    function getViewportDimensions() {
        return {
            width: getViewportDimension(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth),
            height: getViewportDimension(window.innerHeight, document.documentElement.clientHeight, document.body.clientHeight),
        };
    }
    function getWindowDimensions(window) {
        return new BoundaryValues(0, getWidth(window), getHeight(window), 0);
    }
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
    function isFixedElement(node) {
        return isElementNode(node) && styleUtils.get(node, 'position') === 'fixed';
    }

    var styleUtils$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        getBordersWidth: getBordersWidth,
        getComputedStyle: getComputedStyle,
        getElementMargin: getElementMargin,
        getElementPadding: getElementPadding,
        getElementScroll: getElementScroll,
        getOptionHeight: getOptionHeight,
        getSelectElementSize: getSelectElementSize,
        isElementVisible: isElementVisible,
        isSelectVisibleChild: isSelectVisibleChild,
        getWidth: getWidth,
        getHeight: getHeight,
        getInnerWidth: getInnerWidth,
        getInnerHeight: getInnerHeight,
        getScrollLeft: getScrollLeft,
        getScrollTop: getScrollTop,
        setScrollLeft: setScrollLeft,
        setScrollTop: setScrollTop,
        get: get,
        set: set,
        getViewportDimensions: getViewportDimensions,
        getWindowDimensions: getWindowDimensions,
        isNotVisibleNode: isNotVisibleNode,
        hasDimensions: hasDimensions,
        isFixedElement: isFixedElement
    });

    var browserUtils$4 = hammerhead.utils.browser;
    var listeners$2 = hammerhead.eventSandbox.listeners;
    var eventSimulator = hammerhead.eventSandbox.eventSimulator;
    var PREVENTED_EVENTS = [
        'click', 'mousedown', 'mouseup', 'dblclick', 'contextmenu', 'mousemove', 'mouseover', 'mouseout',
        'touchstart', 'touchmove', 'touchend', 'keydown', 'keypress', 'input', 'keyup', 'change', 'focus', 'blur',
        'MSPointerDown', 'MSPointerMove', 'MSPointerOver', 'MSPointerOut', 'MSPointerUp', 'pointerdown',
        'pointermove', 'pointerover', 'pointerout', 'pointerup',
    ];
    var F12_KEY_CODE = 123;
    function checkBrowserHotkey(e) {
        // NOTE: Opening browser tools with F12, CTRL+SHIFT+<SYMBOL KEY>
        // on PC or with OPTION(ALT)+CMD+<SYMBOL KEY> on Mac.
        return e.shiftKey && e.ctrlKey || (e.altKey || e.metaKey) && browserUtils$4.isMacPlatform || e.keyCode === F12_KEY_CODE;
    }
    // NOTE: when tests are running, we should block real events (from mouse
    // or keyboard), because they may lead to unexpected test result.
    function preventRealEventHandler(e, dispatched, preventDefault, cancelHandlers, stopEventPropagation) {
        var target = hammerhead.nativeMethods.eventTargetGetter.call(e) || e.srcElement;
        if (!dispatched && !isShadowUIElement(target)) {
            // NOTE: this will allow pressing hotkeys to open developer tools.
            if (/^key/.test(e.type) && checkBrowserHotkey(e)) {
                stopEventPropagation();
                return;
            }
            // NOTE: if an element loses focus because of becoming invisible, the blur event is
            // raised. We must not prevent this blur event. In IE, an element loses focus only
            // if the CSS 'display' property is set to 'none', other ways of making an element
            // invisible don't lead to blurring (in MSEdge, focus/blur are sync).
            if (e.type === 'blur') {
                if (browserUtils$4.isIE && browserUtils$4.version < 12) {
                    var isWindowInstance = isWindow(target);
                    var isElementInvisible = !isWindowInstance && get(target, 'display') === 'none';
                    var elementParents = null;
                    var invisibleParents = false;
                    if (!isWindowInstance && !isElementInvisible) {
                        elementParents = getParents(target);
                        invisibleParents = filter(elementParents, function (parent) { return get(parent, 'display') === 'none'; });
                    }
                    if (isElementInvisible || invisibleParents.length) {
                        // NOTE: In IE we should prevent the event and raise it on timeout. This is a fix for
                        // the case when a focus event leads to the element disappearing. If we don't prevent
                        // the blur event it will be raised before the previous focus event is raised (see B254768)
                        hammerhead.eventSandbox.timers.deferFunction(function () {
                            eventSimulator.blur(target);
                        });
                    }
                }
                // NOTE: fix for a jQuery bug. An exception is raised when calling .is(':visible')
                // for a window or document on page loading (when e.ownerDocument is null).
                else if (target !== window && target !== window.document && !hasDimensions(target))
                    return;
            }
            preventDefault();
        }
    }
    function preventRealEvents() {
        listeners$2.initElementListening(window, PREVENTED_EVENTS);
        listeners$2.addFirstInternalEventBeforeListener(window, PREVENTED_EVENTS, preventRealEventHandler);
        scrollController.init();
    }
    function disableRealEventsPreventing() {
        listeners$2.removeInternalEventBeforeListener(window, PREVENTED_EVENTS, preventRealEventHandler);
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

    var SCROLLABLE_OVERFLOW_STYLE_RE = /auto|scroll|hidden/i;
    var DEFAULT_IE_SCROLLABLE_OVERFLOW_STYLE_VALUE = 'visible';
    function getScrollable(el) {
        var overflowX = get(el, 'overflowX');
        var overflowY = get(el, 'overflowY');
        var scrollableHorizontally = SCROLLABLE_OVERFLOW_STYLE_RE.test(overflowX);
        var scrollableVertically = SCROLLABLE_OVERFLOW_STYLE_RE.test(overflowY);
        // IE11 and MS Edge bug: There are two properties: overflow-x and overflow-y.
        // If one property is set so that the browser may show scrollbars (`auto` or `scroll`) and the second one is set to 'visible',
        // then the second one will work as if it had the 'auto' value.
        if (hammerhead.utils.browser.isIE) {
            scrollableHorizontally = scrollableHorizontally || scrollableVertically && overflowX === DEFAULT_IE_SCROLLABLE_OVERFLOW_STYLE_VALUE;
            scrollableVertically = scrollableVertically || scrollableHorizontally && overflowY === DEFAULT_IE_SCROLLABLE_OVERFLOW_STYLE_VALUE;
        }
        return new AxisValues(scrollableHorizontally, scrollableVertically);
    }
    function hasBodyScroll(el) {
        var overflowX = get(el, 'overflowX');
        var overflowY = get(el, 'overflowY');
        var scrollableHorizontally = SCROLLABLE_OVERFLOW_STYLE_RE.test(overflowX);
        var scrollableVertically = SCROLLABLE_OVERFLOW_STYLE_RE.test(overflowY);
        var documentElement = findDocument(el).documentElement;
        var bodyScrollHeight = el.scrollHeight;
        if (hammerhead.utils.browser.isChrome || hammerhead.utils.browser.isFirefox || hammerhead.utils.browser.isSafari) {
            var bodyTop = el.getBoundingClientRect().top;
            var documentTop = documentElement.getBoundingClientRect().top;
            bodyScrollHeight = bodyScrollHeight - documentTop + bodyTop;
        }
        return (scrollableHorizontally || scrollableVertically) &&
            bodyScrollHeight > documentElement.scrollHeight;
    }
    function hasHTMLElementScroll(el) {
        var overflowX = get(el, 'overflowX');
        var overflowY = get(el, 'overflowY');
        //T303226
        if (overflowX === 'hidden' && overflowY === 'hidden')
            return false;
        var hasHorizontalScroll = el.scrollHeight > el.clientHeight;
        var hasVerticalScroll = el.scrollWidth > el.clientWidth;
        if (hasHorizontalScroll || hasVerticalScroll)
            return true;
        //T174562 - wrong scrolling in iframes without src and others iframes
        var body = el.getElementsByTagName('body')[0];
        if (!body)
            return false;
        if (hasBodyScroll(body))
            return false;
        var clientWidth = Math.min(el.clientWidth, body.clientWidth);
        var clientHeight = Math.min(el.clientHeight, body.clientHeight);
        return body.scrollHeight > clientHeight || body.scrollWidth > clientWidth;
    }
    function hasScroll(el) {
        if (isBodyElement(el))
            return hasBodyScroll(el);
        if (isHtmlElement(el))
            return hasHTMLElementScroll(el);
        var scrollable = getScrollable(el);
        if (!scrollable.x && !scrollable.y)
            return false;
        var hasVerticalScroll = scrollable.y && el.scrollHeight > el.clientHeight;
        var hasHorizontalScroll = scrollable.x && el.scrollWidth > el.clientWidth;
        return hasHorizontalScroll || hasVerticalScroll;
    }
    function getScrollableParents(element) {
        var parentsArray = getParents(element);
        if (isElementInIframe(element)) {
            var iframe = getIframeByElement(element);
            if (iframe) {
                var iFrameParents = getParents(iframe);
                parentsArray.concat(iFrameParents);
            }
        }
        return hammerhead.nativeMethods.arrayFilter.call(parentsArray, hasScroll);
    }

    var scrollUtils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        hasScroll: hasScroll,
        getScrollableParents: getScrollableParents
    });

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
    function getElementFromPoint(_a) {
        var x = _a.x, y = _a.y;
        // @ts-ignore
        var ieFn = document.getElementFromPoint;
        var func = ieFn || document.elementFromPoint;
        var el = null;
        try {
            // Permission denied to access property 'getElementFromPoint' error in iframe
            el = func.call(document, x, y);
        }
        catch (_b) {
            return null;
        }
        //NOTE: elementFromPoint returns null when is's a border of an iframe
        if (el === null)
            el = func.call(document, x - 1, y - 1);
        while (el && el.shadowRoot && el.shadowRoot.elementFromPoint) {
            var shadowEl = el.shadowRoot.elementFromPoint(x, y);
            if (!shadowEl || el === shadowEl)
                break;
            el = shadowEl;
        }
        return el;
    }
    function calcRelativePosition(dimensions, toDimensions) {
        var pos = BoundaryValues.create({
            top: dimensions.top - toDimensions.top,
            left: dimensions.left - toDimensions.left,
            right: toDimensions.right - dimensions.right,
            bottom: toDimensions.bottom - dimensions.bottom,
        });
        return pos.sub(toDimensions.border).sub(toDimensions.scrollbar).round(Math.ceil, Math.floor);
    }
    function getIframeClientCoordinates(iframe) {
        var _a = getOffsetPosition(iframe), left = _a.left, top = _a.top;
        var clientPosition = offsetToClientCoords({ x: left, y: top });
        var iframeBorders = getBordersWidth(iframe);
        var iframePadding = getElementPadding(iframe);
        var iframeRectangleLeft = clientPosition.x + iframeBorders.left + iframePadding.left;
        var iframeRectangleTop = clientPosition.y + iframeBorders.top + iframePadding.top;
        return new BoundaryValues(iframeRectangleTop, iframeRectangleLeft + getWidth(iframe), iframeRectangleTop + getHeight(iframe), iframeRectangleLeft);
    }
    function containsOffset(el, offsetX, offsetY) {
        var dimensions = getClientDimensions(el);
        var width = Math.max(el.scrollWidth, dimensions.width);
        var height = Math.max(el.scrollHeight, dimensions.height);
        var maxX = dimensions.scrollbar.right + dimensions.border.left + dimensions.border.right + width;
        var maxY = dimensions.scrollbar.bottom + dimensions.border.top + dimensions.border.bottom + height;
        return (typeof offsetX === 'undefined' || offsetX >= 0 && maxX >= offsetX) &&
            (typeof offsetY === 'undefined' || offsetY >= 0 && maxY >= offsetY);
    }
    function getEventAbsoluteCoordinates(ev) {
        var el = ev.target || ev.srcElement;
        var pageCoordinates = getEventPageCoordinates(ev);
        var curDocument = findDocument(el);
        var xOffset = 0;
        var yOffset = 0;
        if (isElementInIframe(curDocument.documentElement)) {
            var currentIframe = getIframeByElement(curDocument);
            if (currentIframe) {
                var iframeOffset = getOffsetPosition(currentIframe);
                var iframeBorders = getBordersWidth(currentIframe);
                xOffset = iframeOffset.left + iframeBorders.left;
                yOffset = iframeOffset.top + iframeBorders.top;
            }
        }
        return new AxisValues(pageCoordinates.x + xOffset, pageCoordinates.y + yOffset);
    }
    function getEventPageCoordinates(ev) {
        var curCoordObject = /^touch/.test(ev.type) && ev.targetTouches ? ev.targetTouches[0] || ev.changedTouches[0] : ev;
        var bothPageCoordinatesAreZero = curCoordObject.pageX === 0 && curCoordObject.pageY === 0;
        var notBothClientCoordinatesAreZero = curCoordObject.clientX !== 0 || curCoordObject.clientY !== 0;
        if ((curCoordObject.pageX === null || bothPageCoordinatesAreZero && notBothClientCoordinatesAreZero) &&
            curCoordObject.clientX !== null) {
            var currentDocument = findDocument(ev.target || ev.srcElement);
            var html = currentDocument.documentElement;
            var body = currentDocument.body;
            return new AxisValues(Math.round(curCoordObject.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) -
                (html.clientLeft || 0)), Math.round(curCoordObject.clientY + (html && html.scrollTop || body && body.scrollTop || 0) -
                (html.clientTop || 0)));
        }
        return new AxisValues(Math.round(curCoordObject.pageX), Math.round(curCoordObject.pageY));
    }
    function getIframePointRelativeToParentFrame(pos, iframeWin) {
        var iframe = findIframeByWindow(iframeWin);
        var iframeOffset = getOffsetPosition(iframe);
        var iframeBorders = getBordersWidth(iframe);
        var iframePadding = getElementPadding(iframe);
        return offsetToClientCoords({
            x: pos.x + iframeOffset.left + iframeBorders.left + iframePadding.left,
            y: pos.y + iframeOffset.top + iframeBorders.top + iframePadding.top,
        });
    }
    function findCenter(el) {
        var rectangle = getElementRectangle(el);
        return new AxisValues(Math.round(rectangle.left + rectangle.width / 2), Math.round(rectangle.top + rectangle.height / 2));
    }
    function getClientPosition(el) {
        var _a = getOffsetPosition(el), left = _a.left, top = _a.top;
        var clientCoords = offsetToClientCoords({ x: left, y: top });
        clientCoords.x = Math.round(clientCoords.x);
        clientCoords.y = Math.round(clientCoords.y);
        return clientCoords;
    }
    function isInRectangle(_a, rectangle) {
        var x = _a.x, y = _a.y;
        return x >= rectangle.left && x <= rectangle.right && y >= rectangle.top && y <= rectangle.bottom;
    }
    function getWindowPosition() {
        var x = window.screenLeft || window.screenX;
        var y = window.screenTop || window.screenY;
        return new AxisValues(x, y);
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

    var positionUtils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        getElementRectangle: getElementRectangle,
        getOffsetPosition: getOffsetPosition,
        offsetToClientCoords: offsetToClientCoords,
        getClientDimensions: getClientDimensions,
        getElementFromPoint: getElementFromPoint,
        calcRelativePosition: calcRelativePosition,
        getIframeClientCoordinates: getIframeClientCoordinates,
        containsOffset: containsOffset,
        getEventAbsoluteCoordinates: getEventAbsoluteCoordinates,
        getEventPageCoordinates: getEventPageCoordinates,
        getIframePointRelativeToParentFrame: getIframePointRelativeToParentFrame,
        findCenter: findCenter,
        getClientPosition: getClientPosition,
        isInRectangle: isInRectangle,
        getWindowPosition: getWindowPosition,
        isIframeVisible: isIframeVisible,
        isElementVisible: isElementVisible$1
    });

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
    function times(n, iterator) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < n)) return [3 /*break*/, 4];
                        return [4 /*yield*/, iterator(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function each(items, iterator) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, items_1, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, items_1 = items;
                        _a.label = 1;
                    case 1:
                        if (!(_i < items_1.length)) return [3 /*break*/, 4];
                        item = items_1[_i];
                        return [4 /*yield*/, iterator(item)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }

    var promiseUtils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        whilst: whilst,
        times: times,
        each: each
    });

    function isIframeWindow(window) {
        return window.top !== window;
    }

    var Promise$3 = hammerhead__default.Promise;
    var messageSandbox = hammerhead__default.eventSandbox.message;
    function sendRequestToFrame(msg, responseCmd, receiverWindow) {
        return new Promise$3(function (resolve) {
            function onMessage(e) {
                if (e.message.cmd === responseCmd) {
                    messageSandbox.off(messageSandbox.SERVICE_MSG_RECEIVED_EVENT, onMessage);
                    resolve(e.message);
                }
            }
            messageSandbox.on(messageSandbox.SERVICE_MSG_RECEIVED_EVENT, onMessage);
            messageSandbox.sendServiceMsg(msg, receiverWindow);
        });
    }

    var DEFAULT_MAX_SCROLL_MARGIN = 50;
    var SCROLL_MARGIN_INCREASE_STEP = 20;
    var ScrollAutomation = /** @class */ (function () {
        function ScrollAutomation(element, scrollOptions, maxScrollMargin) {
            this._element = element;
            this._offsets = new AxisValues(scrollOptions.offsetX, scrollOptions.offsetY);
            this._scrollToCenter = !!scrollOptions.scrollToCenter;
            this._skipParentFrames = !!scrollOptions.skipParentFrames;
            this._maxScrollMargin = maxScrollMargin || { left: DEFAULT_MAX_SCROLL_MARGIN, top: DEFAULT_MAX_SCROLL_MARGIN };
            this._scrollWasPerformed = false;
        }
        ScrollAutomation._isScrollValuesChanged = function (scrollElement, originalScroll) {
            return getScrollLeft(scrollElement) !== originalScroll.left ||
                getScrollTop(scrollElement) !== originalScroll.top;
        };
        ScrollAutomation.prototype._setScroll = function (element, _a) {
            var _this = this;
            var left = _a.left, top = _a.top;
            var scrollElement = isHtmlElement(element) ? findDocument(element) : element;
            var originalScroll = {
                left: getScrollLeft(scrollElement),
                top: getScrollTop(scrollElement),
            };
            left = Math.max(left, 0);
            top = Math.max(top, 0);
            var scrollPromise = scrollController.waitForScroll(scrollElement);
            setScrollLeft(scrollElement, left);
            setScrollTop(scrollElement, top);
            if (!ScrollAutomation._isScrollValuesChanged(scrollElement, originalScroll)) {
                // @ts-ignore
                scrollPromise.cancel();
                return hammerhead.Promise.resolve();
            }
            scrollPromise = scrollPromise.then(function () {
                if (!_this._scrollWasPerformed)
                    _this._scrollWasPerformed = ScrollAutomation._isScrollValuesChanged(scrollElement, originalScroll);
            });
            return scrollPromise;
        };
        ScrollAutomation.prototype._getScrollToPoint = function (dimensions, point, maxScrollMargin) {
            var horizontalCenter = Math.floor(dimensions.width / 2);
            var verticalCenter = Math.floor(dimensions.height / 2);
            var leftScrollMargin = this._scrollToCenter ? horizontalCenter : Math.min(maxScrollMargin.left, horizontalCenter);
            var topScrollMargin = this._scrollToCenter ? verticalCenter : Math.min(maxScrollMargin.top, verticalCenter);
            var _a = dimensions.scroll, left = _a.left, top = _a.top;
            var needForwardScrollLeft = point.x >= left + dimensions.width - leftScrollMargin;
            var needBackwardScrollLeft = point.x <= left + leftScrollMargin;
            var needForwardScrollTop = point.y >= top + dimensions.height - topScrollMargin;
            var needBackwardScrollTop = point.y <= top + topScrollMargin;
            if (needForwardScrollLeft)
                left = point.x - dimensions.width + leftScrollMargin;
            else if (needBackwardScrollLeft)
                left = point.x - leftScrollMargin;
            if (needForwardScrollTop)
                top = point.y - dimensions.height + topScrollMargin;
            else if (needBackwardScrollTop)
                top = point.y - topScrollMargin;
            return { left: left, top: top };
        };
        ScrollAutomation.prototype._getScrollToFullChildView = function (parentDimensions, childDimensions, maxScrollMargin) {
            var fullViewScroll = { left: null, top: null };
            var canShowFullElementWidth = parentDimensions.width >= childDimensions.width;
            var canShowFullElementHeight = parentDimensions.height >= childDimensions.height;
            var relativePosition = calcRelativePosition(childDimensions, parentDimensions);
            if (canShowFullElementWidth) {
                var availableLeftScrollMargin = parentDimensions.width - childDimensions.width;
                var leftScrollMargin = Math.min(maxScrollMargin.left, availableLeftScrollMargin);
                if (this._scrollToCenter)
                    leftScrollMargin = availableLeftScrollMargin / 2;
                if (relativePosition.left < leftScrollMargin)
                    fullViewScroll.left = Math.round(parentDimensions.scroll.left + relativePosition.left - leftScrollMargin);
                else if (relativePosition.right < leftScrollMargin) {
                    fullViewScroll.left = Math.round(parentDimensions.scroll.left +
                        Math.min(relativePosition.left, -relativePosition.right) +
                        leftScrollMargin);
                }
            }
            if (canShowFullElementHeight) {
                var availableTopScrollMargin = parentDimensions.height - childDimensions.height;
                var topScrollMargin = Math.min(maxScrollMargin.top, availableTopScrollMargin);
                if (this._scrollToCenter)
                    topScrollMargin = availableTopScrollMargin / 2;
                if (relativePosition.top < topScrollMargin)
                    fullViewScroll.top = Math.round(parentDimensions.scroll.top + relativePosition.top - topScrollMargin);
                else if (relativePosition.bottom < topScrollMargin) {
                    fullViewScroll.top = Math.round(parentDimensions.scroll.top +
                        Math.min(relativePosition.top, -relativePosition.bottom) +
                        topScrollMargin);
                }
            }
            return fullViewScroll;
        };
        ScrollAutomation._getChildPoint = function (parentDimensions, childDimensions, offsets) {
            return AxisValues.create(childDimensions)
                .sub(AxisValues.create(parentDimensions))
                .add(AxisValues.create(parentDimensions.scroll))
                .add(AxisValues.create(childDimensions.border))
                .add(offsets);
        };
        ScrollAutomation.prototype._getScrollPosition = function (parentDimensions, childDimensions, offsets, maxScrollMargin) {
            var childPoint = ScrollAutomation._getChildPoint(parentDimensions, childDimensions, offsets);
            var scrollToPoint = this._getScrollToPoint(parentDimensions, childPoint, maxScrollMargin);
            var scrollToFullView = this._getScrollToFullChildView(parentDimensions, childDimensions, maxScrollMargin);
            return {
                left: Math.max(scrollToFullView.left === null ? scrollToPoint.left : scrollToFullView.left, 0),
                top: Math.max(scrollToFullView.top === null ? scrollToPoint.top : scrollToFullView.top, 0),
            };
        };
        ScrollAutomation._getChildPointAfterScroll = function (parentDimensions, childDimensions, currentScroll, offsets) {
            return AxisValues.create(childDimensions)
                .add(AxisValues.create(parentDimensions.scroll))
                .sub(AxisValues.create(currentScroll))
                .add(offsets);
        };
        ScrollAutomation.prototype._isChildFullyVisible = function (parentDimensions, childDimensions, offsets) {
            var childPoint = ScrollAutomation._getChildPointAfterScroll(parentDimensions, childDimensions, parentDimensions.scroll, offsets);
            var zeroMargin = { left: 0, top: 0 };
            var _a = this._getScrollPosition(parentDimensions, childDimensions, offsets, zeroMargin), left = _a.left, top = _a.top;
            return !this._isTargetElementObscuredInPoint(childPoint) &&
                left === parentDimensions.scroll.left && top === parentDimensions.scroll.top;
        };
        ScrollAutomation.prototype._scrollToChild = function (parent, child, offsets) {
            var parentDimensions = getClientDimensions(parent);
            var childDimensions = getClientDimensions(child);
            var windowWidth = getInnerWidth(window);
            var windowHeight = getInnerHeight(window);
            var scrollPos = parentDimensions.scroll;
            var needScroll = !this._isChildFullyVisible(parentDimensions, childDimensions, offsets);
            while (needScroll) {
                scrollPos = this._getScrollPosition(parentDimensions, childDimensions, offsets, this._maxScrollMargin);
                var childPoint = ScrollAutomation._getChildPointAfterScroll(parentDimensions, childDimensions, scrollPos, offsets);
                var isTargetObscured = this._isTargetElementObscuredInPoint(childPoint);
                this._maxScrollMargin.left += SCROLL_MARGIN_INCREASE_STEP;
                if (this._maxScrollMargin.left >= windowWidth) {
                    this._maxScrollMargin.left = DEFAULT_MAX_SCROLL_MARGIN;
                    this._maxScrollMargin.top += SCROLL_MARGIN_INCREASE_STEP;
                }
                needScroll = isTargetObscured && this._maxScrollMargin.top < windowHeight;
            }
            this._maxScrollMargin = { left: DEFAULT_MAX_SCROLL_MARGIN, top: DEFAULT_MAX_SCROLL_MARGIN };
            return this._setScroll(parent, scrollPos);
        };
        ScrollAutomation.prototype._scrollElement = function () {
            if (!hasScroll(this._element))
                return hammerhead.Promise.resolve();
            var elementDimensions = getClientDimensions(this._element);
            var scroll = this._getScrollToPoint(elementDimensions, this._offsets, this._maxScrollMargin);
            return this._setScroll(this._element, scroll);
        };
        ScrollAutomation.prototype._scrollParents = function () {
            var _this = this;
            var parents = getScrollableParents(this._element);
            var currentChild = this._element;
            var scrollLeft = getScrollLeft(currentChild);
            var scrollTop = getScrollTop(currentChild);
            var currentOffset = AxisValues.create(this._offsets).sub(new AxisValues(scrollLeft, scrollTop).round());
            var childDimensions = null;
            var parentDimensions = null;
            var scrollParentsPromise = times(parents.length, function (i) {
                return _this._scrollToChild(parents[i], currentChild, currentOffset)
                    .then(function () {
                    childDimensions = getClientDimensions(currentChild);
                    parentDimensions = getClientDimensions(parents[i]);
                    currentOffset.add(AxisValues.create(childDimensions))
                        .sub(AxisValues.create(parentDimensions))
                        .add(AxisValues.create(parentDimensions.border));
                    currentChild = parents[i];
                });
            });
            var state = {
                scrollWasPerformed: this._scrollWasPerformed,
                offsetX: currentOffset.x,
                offsetY: currentOffset.y,
                maxScrollMargin: this._maxScrollMargin,
            };
            if (!sendRequestToFrame)
                return scrollParentsPromise.then(function () { return state; });
            return scrollParentsPromise
                .then(function () {
                if (_this._skipParentFrames || !isIframeWindow(window))
                    return;
                state.cmd = ScrollAutomation.SCROLL_REQUEST_CMD;
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, consistent-return
                return sendRequestToFrame(state, ScrollAutomation.SCROLL_RESPONSE_CMD, window.parent);
            })
                .then(function () { return _this._scrollWasPerformed; });
        };
        ScrollAutomation._getFixedAncestorOrSelf = function (element) {
            return findParent(element, true, isFixedElement);
        };
        ScrollAutomation.prototype._isTargetElementObscuredInPoint = function (point) {
            var elementInPoint = getElementFromPoint(point);
            if (!elementInPoint)
                return false;
            var fixedElement = ScrollAutomation._getFixedAncestorOrSelf(elementInPoint);
            return !!fixedElement && !fixedElement.contains(this._element);
        };
        ScrollAutomation.prototype.run = function () {
            var _this = this;
            return this._scrollElement()
                .then(function () { return _this._scrollParents(); });
        };
        ScrollAutomation.SCROLL_REQUEST_CMD = 'automation|scroll|request';
        ScrollAutomation.SCROLL_RESPONSE_CMD = 'automation|scroll|response';
        return ScrollAutomation;
    }());

    //nodes utils
    function getOwnFirstVisibleTextNode(el) {
        var children = hammerhead.nativeMethods.nodeChildNodesGetter.call(el);
        var childrenLength = getChildNodesLength(children);
        if (!childrenLength && isVisibleTextNode(el))
            return el;
        return find(children, function (node) { return isVisibleTextNode(node); });
    }
    function getOwnFirstVisibleNode(el) {
        var cildNodes = hammerhead.nativeMethods.nodeChildNodesGetter.call(el);
        return find(cildNodes, function (node) { return isVisibleTextNode(node) ||
            !isSkippableNode(node) && getOwnFirstVisibleNode(node); });
    }
    function getOwnPreviousVisibleSibling(el) {
        var sibling = null;
        var current = el;
        while (!sibling) {
            current = current.previousSibling;
            if (!current)
                break;
            else if (!isSkippableNode(current) && !isInvisibleTextNode(current)) {
                sibling = current;
                break;
            }
        }
        return sibling;
    }
    function isVisibleNode(node) {
        return isTextNode(node) || isElementNode(node) && isElementVisible(node);
    }
    function getVisibleChildren(node) {
        var childNodes = hammerhead.nativeMethods.nodeChildNodesGetter.call(node);
        return filter(childNodes, isVisibleNode);
    }
    function hasVisibleChildren(node) {
        var childNodes = hammerhead.nativeMethods.nodeChildNodesGetter.call(node);
        return some(childNodes, isVisibleNode);
    }
    function hasSelectableChildren(node) {
        var childNodes = hammerhead.nativeMethods.nodeChildNodesGetter.call(node);
        return some(childNodes, function (child) { return isNodeSelectable(child, true); });
    }
    //NOTE: before such elements (like div or p) adds line breaks before and after it
    // (except line break before first visible element in contentEditable parent)
    // this line breaks is not contained in node values
    //so we should take it into account manually
    function isNodeBlockWithBreakLine(parent, node) {
        var parentFirstVisibleChild = null;
        var firstVisibleChild = null;
        if (isShadowUIElement(parent) || isShadowUIElement(node))
            return false;
        var childNodes = hammerhead.nativeMethods.nodeChildNodesGetter.call(node);
        if (!isTheSameNode(node, parent) && getChildNodesLength(childNodes) &&
            /div|p/.test(getTagName(node))) {
            parentFirstVisibleChild = getOwnFirstVisibleNode(parent);
            if (!parentFirstVisibleChild || isTheSameNode(node, parentFirstVisibleChild))
                return false;
            firstVisibleChild = getFirstVisibleTextNode(parentFirstVisibleChild);
            if (!firstVisibleChild || isTheSameNode(node, firstVisibleChild))
                return false;
            return getOwnFirstVisibleTextNode(node);
        }
        return false;
    }
    function isNodeAfterNodeBlockWithBreakLine(parent, node) {
        var isRenderedNode$1 = isRenderedNode(node);
        var parentFirstVisibleChild = null;
        var firstVisibleChild = null;
        var previousSibling = null;
        if (isShadowUIElement(parent) || isShadowUIElement(node))
            return false;
        var childNodes = hammerhead.nativeMethods.nodeChildNodesGetter.call(node);
        if (!isTheSameNode(node, parent) &&
            (isRenderedNode$1 && isElementNode(node) && getChildNodesLength(childNodes) &&
                !/div|p/.test(getTagName(node)) ||
                isVisibleTextNode(node) && !isTheSameNode(node, parent) && node.nodeValue.length)) {
            if (isRenderedNode$1 && isElementNode(node)) {
                parentFirstVisibleChild = getOwnFirstVisibleNode(parent);
                if (!parentFirstVisibleChild || isTheSameNode(node, parentFirstVisibleChild))
                    return false;
                firstVisibleChild = getFirstVisibleTextNode(parentFirstVisibleChild);
                if (!firstVisibleChild || isTheSameNode(node, firstVisibleChild))
                    return false;
            }
            previousSibling = getOwnPreviousVisibleSibling(node);
            return previousSibling && isElementNode(previousSibling) &&
                /div|p/.test(getTagName(previousSibling)) && getOwnFirstVisibleTextNode(previousSibling);
        }
        return false;
    }
    function getFirstTextNode(el, onlyVisible) {
        var children = hammerhead.nativeMethods.nodeChildNodesGetter.call(el);
        var childrenLength = getChildNodesLength(children);
        var curNode = null;
        var child = null;
        var isNotContentEditableElement = null;
        var checkTextNode = onlyVisible ? isVisibleTextNode : isTextNode;
        if (!childrenLength && checkTextNode(el))
            return el;
        for (var i = 0; i < childrenLength; i++) {
            curNode = children[i];
            isNotContentEditableElement = isElementNode(curNode) && !isContentEditableElement(curNode);
            if (checkTextNode(curNode))
                return curNode;
            else if (isRenderedNode(curNode) && hasVisibleChildren(curNode) && !isNotContentEditableElement) {
                child = getFirstTextNode(curNode, onlyVisible);
                if (child)
                    return child;
            }
        }
        return child;
    }
    function getFirstVisibleTextNode(el) {
        return getFirstTextNode(el, true);
    }
    function getLastTextNode(el, onlyVisible) {
        var children = hammerhead.nativeMethods.nodeChildNodesGetter.call(el);
        var childrenLength = getChildNodesLength(children);
        var curNode = null;
        var child = null;
        var isNotContentEditableElement = null;
        var visibleTextNode = null;
        if (!childrenLength && isVisibleTextNode(el))
            return el;
        for (var i = childrenLength - 1; i >= 0; i--) {
            curNode = children[i];
            isNotContentEditableElement = isElementNode(curNode) && !isContentEditableElement(curNode);
            visibleTextNode = isTextNode(curNode) &&
                (onlyVisible ? !isInvisibleTextNode(curNode) : true);
            if (visibleTextNode)
                return curNode;
            else if (isRenderedNode(curNode) && hasVisibleChildren(curNode) && !isNotContentEditableElement) {
                child = getLastTextNode(curNode, false);
                if (child)
                    return child;
            }
        }
        return child;
    }
    function getFirstNonWhitespaceSymbolIndex(nodeValue, startFrom) {
        if (!nodeValue || !nodeValue.length)
            return 0;
        var valueLength = nodeValue.length;
        var index = startFrom || 0;
        for (var i = index; i < valueLength; i++) {
            if (nodeValue.charCodeAt(i) === 10 || nodeValue.charCodeAt(i) === 32)
                index++;
            else
                break;
        }
        return index;
    }
    function getLastNonWhitespaceSymbolIndex(nodeValue) {
        if (!nodeValue || !nodeValue.length)
            return 0;
        var valueLength = nodeValue.length;
        var index = valueLength;
        for (var i = valueLength - 1; i >= 0; i--) {
            if (nodeValue.charCodeAt(i) === 10 || nodeValue.charCodeAt(i) === 32)
                index--;
            else
                break;
        }
        return index;
    }
    function isInvisibleTextNode(node) {
        if (!isTextNode(node))
            return false;
        var nodeValue = node.nodeValue;
        var firstVisibleIndex = getFirstNonWhitespaceSymbolIndex(nodeValue);
        var lastVisibleIndex = getLastNonWhitespaceSymbolIndex(nodeValue);
        return firstVisibleIndex === nodeValue.length && lastVisibleIndex === 0;
    }
    function isVisibleTextNode(node) {
        return isTextNode(node) && !isInvisibleTextNode(node);
    }
    function isSkippableNode(node) {
        return !isRenderedNode(node) || isShadowUIElement(node);
    }
    //dom utils
    function hasContentEditableAttr(el) {
        var attrValue = el.getAttribute ? el.getAttribute('contenteditable') : null;
        return attrValue === '' || attrValue === 'true';
    }
    function findContentEditableParent(element) {
        var elParents = getParents(element);
        if (hasContentEditableAttr(element) && isContentEditableElement(element))
            return element;
        var currentDocument = findDocument(element);
        if (currentDocument.designMode === 'on')
            return currentDocument.body;
        return find(elParents, function (parent) { return hasContentEditableAttr(parent) &&
            isContentEditableElement(parent); });
    }
    function getNearestCommonAncestor(node1, node2) {
        if (isTheSameNode(node1, node2)) {
            if (isTheSameNode(node2, findContentEditableParent(node1)))
                return node1;
            return hammerhead.nativeMethods.nodeParentNodeGetter.call(node1);
        }
        var ancestors = [];
        var contentEditableParent = findContentEditableParent(node1);
        var curNode = null;
        if (!isElementContainsNode(contentEditableParent, node2))
            return null;
        for (curNode = node1; curNode !== contentEditableParent; curNode = hammerhead.nativeMethods.nodeParentNodeGetter.call(curNode))
            ancestors.push(curNode);
        for (curNode = node2; curNode !== contentEditableParent; curNode = hammerhead.nativeMethods.nodeParentNodeGetter.call(curNode)) {
            if (indexOf(ancestors, curNode) !== -1)
                return curNode;
        }
        return contentEditableParent;
    }
    //selection utils
    function getSelectedPositionInParentByOffset(node, offset) {
        var currentNode = null;
        var currentOffset = null;
        var childNodes = hammerhead.nativeMethods.nodeChildNodesGetter.call(node);
        var childCount = getChildNodesLength(childNodes);
        var isSearchForLastChild = offset >= childCount;
        // NOTE: we get a child element by its offset index in the parent
        if (isShadowUIElement(node))
            return { node: node, offset: offset };
        // NOTE: IE behavior
        if (isSearchForLastChild)
            currentNode = childNodes[childCount - 1];
        else {
            currentNode = childNodes[offset];
            currentOffset = 0;
        }
        // NOTE: skip shadowUI elements
        if (isShadowUIElement(currentNode)) {
            if (childCount <= 1)
                return { node: node, offset: 0 };
            isSearchForLastChild = offset - 1 >= childCount;
            if (isSearchForLastChild)
                currentNode = childNodes[childCount - 2];
            else {
                currentNode = childNodes[offset - 1];
                currentOffset = 0;
            }
        }
        // NOTE: we try to find text node
        while (!isSkippableNode(currentNode) && isElementNode(currentNode)) {
            var visibleChildren = getVisibleChildren(currentNode);
            if (visibleChildren.length)
                currentNode = visibleChildren[isSearchForLastChild ? visibleChildren.length - 1 : 0];
            else {
                //NOTE: if we didn't find a text node then always set offset to zero
                currentOffset = 0;
                break;
            }
        }
        if (currentOffset !== 0 && !isSkippableNode(currentNode))
            currentOffset = currentNode.nodeValue ? currentNode.nodeValue.length : 0;
        return {
            node: currentNode,
            offset: currentOffset,
        };
    }
    function getSelectionStart(el, selection, inverseSelection) {
        var startNode = inverseSelection ? selection.focusNode : selection.anchorNode;
        var startOffset = inverseSelection ? selection.focusOffset : selection.anchorOffset;
        var correctedStartPosition = {
            node: startNode,
            offset: startOffset,
        };
        //NOTE: window.getSelection() can't returns not rendered node like selected node, so we shouldn't check it
        if ((isTheSameNode(el, startNode) || isElementNode(startNode)) && hasSelectableChildren(startNode))
            correctedStartPosition = getSelectedPositionInParentByOffset(startNode, startOffset);
        return {
            node: correctedStartPosition.node,
            offset: correctedStartPosition.offset,
        };
    }
    function getSelectionEnd(el, selection, inverseSelection) {
        var endNode = inverseSelection ? selection.anchorNode : selection.focusNode;
        var endOffset = inverseSelection ? selection.anchorOffset : selection.focusOffset;
        var correctedEndPosition = {
            node: endNode,
            offset: endOffset,
        };
        //NOTE: window.getSelection() can't returns not rendered node like selected node, so we shouldn't check it
        if ((isTheSameNode(el, endNode) || isElementNode(endNode)) && hasSelectableChildren(endNode))
            correctedEndPosition = getSelectedPositionInParentByOffset(endNode, endOffset);
        return {
            node: correctedEndPosition.node,
            offset: correctedEndPosition.offset,
        };
    }
    function getSelection(el, selection, inverseSelection) {
        return {
            startPos: getSelectionStart(el, selection, inverseSelection),
            endPos: getSelectionEnd(el, selection, inverseSelection),
        };
    }
    function getSelectionStartPosition(el, selection, inverseSelection) {
        var correctedSelectionStart = getSelectionStart(el, selection, inverseSelection);
        return calculatePositionByNodeAndOffset(el, correctedSelectionStart);
    }
    function getSelectionEndPosition(el, selection, inverseSelection) {
        var correctedSelectionEnd = getSelectionEnd(el, selection, inverseSelection);
        return calculatePositionByNodeAndOffset(el, correctedSelectionEnd);
    }
    function getElementOffset(target) {
        var offset = 0;
        var childNodes = hammerhead.nativeMethods.nodeChildNodesGetter.call(target);
        var firstBreakElement = find(childNodes, function (node, index) {
            offset = index;
            return getTagName(node) === 'br';
        });
        return firstBreakElement ? offset : 0;
    }
    function isNodeSelectable(node, includeDescendants) {
        if (isNotVisibleNode(node))
            return false;
        if (isTextNode(node))
            return true;
        if (!isElementNode(node))
            return false;
        if (hasSelectableChildren(node))
            return includeDescendants;
        var parent = hammerhead.nativeMethods.nodeParentNodeGetter.call(node);
        var isContentEditableRoot = !isContentEditableElement(parent);
        var visibleChildren = getVisibleChildren(node);
        var hasBreakLineElements = some(visibleChildren, function (child) { return getTagName(child) === 'br'; });
        return isContentEditableRoot || hasBreakLineElements;
    }
    function calculateNodeAndOffsetByPosition(el, offset) {
        var point = {
            node: null,
            offset: offset,
        };
        function checkChildNodes(target) {
            var childNodes = hammerhead.nativeMethods.nodeChildNodesGetter.call(target);
            var childNodesLength = getChildNodesLength(childNodes);
            if (point.node)
                return point;
            if (isSkippableNode(target))
                return point;
            if (isTextNode(target)) {
                if (point.offset <= target.nodeValue.length) {
                    point.node = target;
                    return point;
                }
                else if (target.nodeValue.length) {
                    if (!point.node && isNodeAfterNodeBlockWithBreakLine(el, target))
                        point.offset--;
                    point.offset -= target.nodeValue.length;
                }
            }
            else if (isElementNode(target)) {
                if (!isVisibleNode(target))
                    return point;
                if (point.offset === 0 && isNodeSelectable(target, false)) {
                    point.node = target;
                    point.offset = getElementOffset(target);
                    return point;
                }
                if (!point.node && (isNodeBlockWithBreakLine(el, target) || isNodeAfterNodeBlockWithBreakLine(el, target)))
                    point.offset--;
                else if (!childNodesLength && getTagName(target) === 'br')
                    point.offset--;
            }
            for (var i = 0; i < childNodesLength; i++)
                point = checkChildNodes(childNodes[i]);
            return point;
        }
        return checkChildNodes(el);
    }
    function calculatePositionByNodeAndOffset(el, _a) {
        var node = _a.node, offset = _a.offset;
        var currentOffset = 0;
        var find = false;
        function checkChildNodes(target) {
            var childNodes = hammerhead.nativeMethods.nodeChildNodesGetter.call(target);
            var childNodesLength = getChildNodesLength(childNodes);
            if (find)
                return currentOffset;
            if (isTheSameNode(node, target)) {
                if (isNodeBlockWithBreakLine(el, target) || isNodeAfterNodeBlockWithBreakLine(el, target))
                    currentOffset++;
                find = true;
                return currentOffset + offset;
            }
            if (isSkippableNode(target))
                return currentOffset;
            if (!childNodesLength && target.nodeValue && target.nodeValue.length) {
                if (!find && isNodeAfterNodeBlockWithBreakLine(el, target))
                    currentOffset++;
                currentOffset += target.nodeValue.length;
            }
            else if (!childNodesLength && isElementNode(target) && getTagName(target) === 'br')
                currentOffset++;
            else if (!find && (isNodeBlockWithBreakLine(el, target) || isNodeAfterNodeBlockWithBreakLine(el, target)))
                currentOffset++;
            for (var i = 0; i < childNodesLength; i++)
                currentOffset = checkChildNodes(childNodes[i]);
            return currentOffset;
        }
        return checkChildNodes(el);
    }
    function getElementBySelection(selection) {
        var el = getNearestCommonAncestor(selection.anchorNode, selection.focusNode);
        return isTextNode(el) ? el.parentElement : el;
    }
    //NOTE: We can not determine first visible symbol of node in all cases,
    // so we should create a range and select all text contents of the node.
    // Then range object will contain information about node's the first and last visible symbol.
    function getFirstVisiblePosition(el) {
        var firstVisibleTextChild = isTextNode(el) ? el : getFirstVisibleTextNode(el);
        var curDocument = findDocument(el);
        var range = curDocument.createRange();
        if (firstVisibleTextChild) {
            range.selectNodeContents(firstVisibleTextChild);
            return calculatePositionByNodeAndOffset(el, { node: firstVisibleTextChild, offset: range.startOffset });
        }
        return 0;
    }
    function getLastVisiblePosition(el) {
        var lastVisibleTextChild = isTextNode(el) ? el : getLastTextNode(el, true);
        if (!lastVisibleTextChild || isResetAnchorOffsetRequired(lastVisibleTextChild, el))
            return 0;
        var curDocument = findDocument(el);
        var range = curDocument.createRange();
        range.selectNodeContents(lastVisibleTextChild);
        return calculatePositionByNodeAndOffset(el, { node: lastVisibleTextChild, offset: range.endOffset });
    }
    function isResetAnchorOffsetRequired(lastVisibleTextChild, el) {
        var firstVisibleTextChild = isTextNode(el) ? el : getFirstTextNode(el, false);
        var isSingleTextNode = lastVisibleTextChild === firstVisibleTextChild;
        var isNewLineChar = lastVisibleTextChild.nodeValue === String.fromCharCode(10);
        return isSingleTextNode && isNewLineChar && hasWhiteSpacePreStyle(lastVisibleTextChild, el);
    }
    function hasWhiteSpacePreStyle(el, container) {
        var whiteSpacePreStyles = ['pre', 'pre-wrap', 'pre-line'];
        while (el !== container) {
            el = hammerhead.nativeMethods.nodeParentNodeGetter.call(el);
            if (indexOf(whiteSpacePreStyles, get(el, 'white-space')) > -1)
                return true;
        }
        return false;
    }
    function getContentEditableNodes(target) {
        var result = [];
        var childNodes = hammerhead.nativeMethods.nodeChildNodesGetter.call(target);
        var childNodesLength = getChildNodesLength(childNodes);
        if (!isSkippableNode(target) && !childNodesLength && isTextNode(target))
            result.push(target);
        for (var i = 0; i < childNodesLength; i++)
            result = result.concat(getContentEditableNodes(childNodes[i]));
        return result;
    }
    // contents util
    function getContentEditableValue(target) {
        return map(getContentEditableNodes(target), function (node) { return node.nodeValue; }).join('');
    }

    var contentEditable = /*#__PURE__*/Object.freeze({
        __proto__: null,
        getFirstVisibleTextNode: getFirstVisibleTextNode,
        getLastTextNode: getLastTextNode,
        getFirstNonWhitespaceSymbolIndex: getFirstNonWhitespaceSymbolIndex,
        getLastNonWhitespaceSymbolIndex: getLastNonWhitespaceSymbolIndex,
        isInvisibleTextNode: isInvisibleTextNode,
        findContentEditableParent: findContentEditableParent,
        getNearestCommonAncestor: getNearestCommonAncestor,
        getSelection: getSelection,
        getSelectionStartPosition: getSelectionStartPosition,
        getSelectionEndPosition: getSelectionEndPosition,
        calculateNodeAndOffsetByPosition: calculateNodeAndOffsetByPosition,
        calculatePositionByNodeAndOffset: calculatePositionByNodeAndOffset,
        getElementBySelection: getElementBySelection,
        getFirstVisiblePosition: getFirstVisiblePosition,
        getLastVisiblePosition: getLastVisiblePosition,
        getContentEditableValue: getContentEditableValue
    });

    var browserUtils$5 = hammerhead__default.utils.browser;
    var nativeMethods$5 = hammerhead__default.nativeMethods;
    var selectionSandbox = hammerhead__default.eventSandbox.selection;
    //NOTE: we can't determine selection direction in ie from dom api. Therefore we should listen selection changes,
    // and calculate direction using it.
    var BACKWARD_SELECTION_DIRECTION = 'backward';
    var FORWARD_SELECTION_DIRECTION = 'forward';
    var NONE_SELECTION_DIRECTION = 'none';
    var selectionDirection = NONE_SELECTION_DIRECTION;
    var initialLeft = 0;
    var initialTop = 0;
    var lastSelectionHeight = 0;
    var lastSelectionLeft = 0;
    var lastSelectionLength = 0;
    var lastSelectionTop = 0;
    function stateChanged(left, top, height, width, selectionLength) {
        if (!selectionLength) {
            initialLeft = left;
            initialTop = top;
            selectionDirection = NONE_SELECTION_DIRECTION;
        }
        else {
            switch (selectionDirection) {
                case NONE_SELECTION_DIRECTION:
                    if (top === lastSelectionTop && (left === lastSelectionLeft || height > lastSelectionHeight))
                        selectionDirection = FORWARD_SELECTION_DIRECTION;
                    else if (left < lastSelectionLeft || top < lastSelectionTop)
                        selectionDirection = BACKWARD_SELECTION_DIRECTION;
                    break;
                case FORWARD_SELECTION_DIRECTION:
                    if (left === lastSelectionLeft && top === lastSelectionTop ||
                        left < lastSelectionLeft && height > lastSelectionHeight ||
                        top === lastSelectionTop && height === lastSelectionHeight &&
                            selectionLength > lastSelectionLength &&
                            left + width !== initialLeft)
                        break;
                    else if (left < lastSelectionLeft || top < lastSelectionTop)
                        selectionDirection = BACKWARD_SELECTION_DIRECTION;
                    break;
                case BACKWARD_SELECTION_DIRECTION:
                    if ((left < lastSelectionLeft || top < lastSelectionTop) && selectionLength > lastSelectionLength)
                        break;
                    else if (top === initialTop && (left >= initialLeft || height > lastSelectionHeight))
                        selectionDirection = FORWARD_SELECTION_DIRECTION;
                    break;
            }
        }
        lastSelectionHeight = height;
        lastSelectionLeft = left;
        lastSelectionLength = selectionLength;
        lastSelectionTop = top;
    }
    function onSelectionChange() {
        var activeElement = null;
        var endSelection = null;
        var range = null;
        var rect = null;
        var startSelection = null;
        try {
            if (this.selection)
                range = this.selection.createRange();
            else {
                //HACK: we need do this for IE11 because otherwise we can not get TextRange properties
                activeElement = nativeMethods$5.documentActiveElementGetter.call(this);
                if (!activeElement || !isTextEditableElement(activeElement)) {
                    selectionDirection = NONE_SELECTION_DIRECTION;
                    return;
                }
                startSelection = getSelectionStart$1(activeElement);
                endSelection = getSelectionEnd$1(activeElement);
                if (activeElement.createTextRange) {
                    range = activeElement.createTextRange();
                    range.collapse(true);
                    range.moveStart('character', startSelection);
                    range.moveEnd('character', endSelection - startSelection);
                }
                else if (document.createRange) {
                    //NOTE: for MSEdge
                    range = document.createRange();
                    var textNode = hammerhead__default.nativeMethods.nodeFirstChildGetter.call(activeElement);
                    range.setStart(textNode, startSelection);
                    range.setEnd(textNode, endSelection);
                    rect = range.getBoundingClientRect();
                }
            }
        }
        catch (e) {
            //NOTE: in ie it raises error when there are not a real selection
            selectionDirection = NONE_SELECTION_DIRECTION;
            return;
        }
        var rangeLeft = rect ? Math.ceil(rect.left) : range.offsetLeft;
        var rangeTop = rect ? Math.ceil(rect.top) : range.offsetTop;
        var rangeHeight = rect ? Math.ceil(rect.height) : range.boundingHeight;
        var rangeWidth = rect ? Math.ceil(rect.width) : range.boundingWidth;
        var rangeHTMLTextLength = range.htmlText ? range.htmlText.length : 0;
        var rangeTextLength = rect ? range.toString().length : rangeHTMLTextLength;
        stateChanged(rangeLeft, rangeTop, rangeHeight, rangeWidth, rangeTextLength);
    }
    if (browserUtils$5.isIE)
        bind(document, 'selectionchange', onSelectionChange, true);
    //utils for contentEditable
    function selectContentEditable(el, from, to, needFocus) {
        var endPosition = null;
        var firstTextNodeChild = null;
        var latestTextNodeChild = null;
        var startPosition = null;
        var temp = null;
        var inverse = false;
        if (typeof from !== 'undefined' && typeof to !== 'undefined' && from > to) {
            temp = from;
            from = to;
            to = temp;
            inverse = true;
        }
        if (typeof from === 'undefined') {
            firstTextNodeChild = getFirstVisibleTextNode(el);
            startPosition = {
                node: firstTextNodeChild || el,
                offset: firstTextNodeChild && firstTextNodeChild.nodeValue ?
                    getFirstNonWhitespaceSymbolIndex(firstTextNodeChild.nodeValue) : 0,
            };
        }
        if (typeof to === 'undefined') {
            latestTextNodeChild = getLastTextNode(el, true);
            endPosition = {
                node: latestTextNodeChild || el,
                offset: latestTextNodeChild && latestTextNodeChild.nodeValue ?
                    getLastNonWhitespaceSymbolIndex(latestTextNodeChild.nodeValue) : 0,
            };
        }
        startPosition = startPosition || calculateNodeAndOffsetByPosition(el, from);
        endPosition = endPosition || calculateNodeAndOffsetByPosition(el, to);
        if (!startPosition.node || !endPosition.node)
            return;
        if (inverse)
            selectByNodesAndOffsets(endPosition, startPosition, needFocus);
        else
            selectByNodesAndOffsets(startPosition, endPosition, needFocus);
    }
    function correctContentEditableSelectionBeforeDelete(el) {
        var selection = getSelectionByElement(el);
        var startNode = selection.anchorNode;
        var endNode = selection.focusNode;
        var startOffset = selection.anchorOffset;
        var endOffset = selection.focusOffset;
        var startNodeFirstNonWhitespaceSymbol = getFirstNonWhitespaceSymbolIndex(startNode.nodeValue);
        var startNodeLastNonWhitespaceSymbol = getLastNonWhitespaceSymbolIndex(startNode.nodeValue);
        var endNodeFirstNonWhitespaceSymbol = getFirstNonWhitespaceSymbolIndex(endNode.nodeValue);
        var endNodeLastNonWhitespaceSymbol = getLastNonWhitespaceSymbolIndex(endNode.nodeValue);
        var newStartOffset = null;
        var newEndOffset = null;
        if (isTextNode(startNode)) {
            if (startOffset < startNodeFirstNonWhitespaceSymbol && startOffset !== 0)
                newStartOffset = 0;
            else if (startOffset !== startNode.nodeValue.length &&
                (isInvisibleTextNode(startNode) && startOffset !== 0 ||
                    startOffset > startNodeLastNonWhitespaceSymbol))
                newStartOffset = startNode.nodeValue.length;
        }
        if (isTextNode(endNode)) {
            if (endOffset < endNodeFirstNonWhitespaceSymbol && endOffset !== 0)
                newEndOffset = 0;
            else if (endOffset !== endNode.nodeValue.length &&
                (isInvisibleTextNode(endNode) && endOffset !== 0 ||
                    endOffset > endNodeLastNonWhitespaceSymbol))
                newEndOffset = endNode.nodeValue.length;
        }
        if (browserUtils$5.isWebKit || browserUtils$5.isIE && browserUtils$5.version > 11) {
            if (newStartOffset !== null) {
                if (newStartOffset === 0)
                    startNode.nodeValue = startNode.nodeValue.substring(startNodeFirstNonWhitespaceSymbol);
                else
                    startNode.nodeValue = startNode.nodeValue.substring(0, startNodeLastNonWhitespaceSymbol);
            }
            if (newEndOffset !== null) {
                if (newEndOffset === 0)
                    endNode.nodeValue = endNode.nodeValue.substring(endNodeFirstNonWhitespaceSymbol);
                else
                    endNode.nodeValue = endNode.nodeValue.substring(0, endNodeLastNonWhitespaceSymbol);
            }
        }
        if (newStartOffset !== null || newEndOffset !== null) {
            if (newStartOffset !== null)
                newStartOffset = newStartOffset === 0 ? newStartOffset : startNode.nodeValue.length;
            else
                newStartOffset = startOffset;
            if (newEndOffset !== null)
                newEndOffset = newEndOffset === 0 ? newEndOffset : endNode.nodeValue.length;
            else
                newEndOffset = endOffset;
            var startPos = { node: startNode, offset: newStartOffset };
            var endPos = { node: endNode, offset: newEndOffset };
            selectByNodesAndOffsets(startPos, endPos);
        }
    }
    //API
    function hasInverseSelectionContentEditable(el) {
        var curDocument = el ? findDocument(el) : document;
        var selection = curDocument.getSelection();
        var range = null;
        var backward = false;
        if (selection) {
            if (!selection.isCollapsed) {
                range = curDocument.createRange();
                range.setStart(selection.anchorNode, selection.anchorOffset);
                range.setEnd(selection.focusNode, selection.focusOffset);
                backward = range.collapsed;
                range.detach();
            }
        }
        return backward;
    }
    function isInverseSelectionContentEditable(element, startPos, endPos) {
        var startPosition = calculatePositionByNodeAndOffset(element, startPos);
        var endPosition = calculatePositionByNodeAndOffset(element, endPos);
        return startPosition > endPosition;
    }
    function getSelectionStart$1(el) {
        var selection = null;
        if (!isContentEditableElement(el))
            return selectionSandbox.getSelection(el).start;
        if (hasElementContainsSelection(el)) {
            selection = getSelectionByElement(el);
            return getSelectionStartPosition(el, selection, hasInverseSelectionContentEditable(el));
        }
        return 0;
    }
    function getSelectionEnd$1(el) {
        var selection = null;
        if (!isContentEditableElement(el))
            return selectionSandbox.getSelection(el).end;
        if (hasElementContainsSelection(el)) {
            selection = getSelectionByElement(el);
            return getSelectionEndPosition(el, selection, hasInverseSelectionContentEditable(el));
        }
        return 0;
    }
    function hasInverseSelection(el) {
        if (isContentEditableElement(el))
            return hasInverseSelectionContentEditable(el);
        return (selectionSandbox.getSelection(el).direction || selectionDirection) === BACKWARD_SELECTION_DIRECTION;
    }
    function getSelectionByElement(el) {
        var currentDocument = findDocument(el);
        return currentDocument ? currentDocument.getSelection() : window.getSelection();
    }
    function select(el, from, to) {
        if (isContentEditableElement(el)) {
            selectContentEditable(el, from, to, true);
            return;
        }
        var start = from || 0;
        var end = typeof to === 'undefined' ? getElementValue(el).length : to;
        var inverse = false;
        var temp = null;
        if (start > end) {
            temp = start;
            start = end;
            end = temp;
            inverse = true;
        }
        selectionSandbox.setSelection(el, start, end, inverse ? BACKWARD_SELECTION_DIRECTION : FORWARD_SELECTION_DIRECTION);
        if (from === to)
            selectionDirection = NONE_SELECTION_DIRECTION;
        else
            selectionDirection = inverse ? BACKWARD_SELECTION_DIRECTION : FORWARD_SELECTION_DIRECTION;
    }
    function selectByNodesAndOffsets(startPos, endPos, needFocus) {
        var startNode = startPos.node;
        var endNode = endPos.node;
        var startNodeLength = startNode.nodeValue ? startNode.length : 0;
        var endNodeLength = endNode.nodeValue ? endNode.length : 0;
        var startOffset = startPos.offset;
        var endOffset = endPos.offset;
        if (!isElementNode(startNode) || !startOffset)
            startOffset = Math.min(startNodeLength, startPos.offset);
        if (!isElementNode(endNode) || !endOffset)
            endOffset = Math.min(endNodeLength, endPos.offset);
        var parentElement = findContentEditableParent(startNode);
        var inverse = isInverseSelectionContentEditable(parentElement, startPos, endPos);
        var selection = getSelectionByElement(parentElement);
        var curDocument = findDocument(parentElement);
        var range = curDocument.createRange();
        var selectionSetter = function () {
            selection.removeAllRanges();
            //NOTE: For IE we can't create inverse selection
            if (!inverse) {
                range.setStart(startNode, startOffset);
                range.setEnd(endNode, endOffset);
                selection.addRange(range);
            }
            else if (browserUtils$5.isIE) {
                range.setStart(endNode, endOffset);
                range.setEnd(startNode, startOffset);
                selection.addRange(range);
            }
            else {
                range.setStart(startNode, startOffset);
                range.setEnd(startNode, startOffset);
                selection.addRange(range);
                var shouldCutEndOffset = browserUtils$5.isSafari || browserUtils$5.isChrome && browserUtils$5.version < 58;
                var extendSelection = function (node, offset) {
                    // NODE: in some cases in Firefox extend method raises error so we use try-catch
                    try {
                        selection.extend(node, offset);
                    }
                    catch (err) {
                        return false;
                    }
                    return true;
                };
                if (shouldCutEndOffset && isInvisibleTextNode(endNode)) {
                    if (!extendSelection(endNode, Math.min(endOffset, 1)))
                        extendSelection(endNode, 0);
                }
                else
                    extendSelection(endNode, endOffset);
            }
        };
        selectionSandbox.wrapSetterSelection(parentElement, selectionSetter, needFocus, true);
    }
    function deleteSelectionRanges(el) {
        var selection = getSelectionByElement(el);
        var rangeCount = selection.rangeCount;
        if (!rangeCount)
            return;
        for (var i = 0; i < rangeCount; i++)
            selection.getRangeAt(i).deleteContents();
    }
    function deleteSelectionContents(el, selectAll) {
        var startSelection = getSelectionStart$1(el);
        var endSelection = getSelectionEnd$1(el);
        if (selectAll)
            selectContentEditable(el);
        if (startSelection === endSelection)
            return;
        // NOTE: If selection is not contain initial and final invisible symbols
        //we should select its
        correctContentEditableSelectionBeforeDelete(el);
        deleteSelectionRanges(el);
        var selection = getSelectionByElement(el);
        var range = null;
        //NOTE: We should try to do selection collapsed
        if (selection.rangeCount && !selection.getRangeAt(0).collapsed) {
            range = selection.getRangeAt(0);
            range.collapse(true);
        }
    }
    function setCursorToLastVisiblePosition(el) {
        var position = getLastVisiblePosition(el);
        selectContentEditable(el, position, position);
    }
    function hasElementContainsSelection(el) {
        var selection = getSelectionByElement(el);
        return selection.anchorNode && selection.focusNode ?
            isElementContainsNode(el, selection.anchorNode) &&
                isElementContainsNode(el, selection.focusNode) :
            false;
    }

    var textSelection = /*#__PURE__*/Object.freeze({
        __proto__: null,
        hasInverseSelectionContentEditable: hasInverseSelectionContentEditable,
        isInverseSelectionContentEditable: isInverseSelectionContentEditable,
        getSelectionStart: getSelectionStart$1,
        getSelectionEnd: getSelectionEnd$1,
        hasInverseSelection: hasInverseSelection,
        getSelectionByElement: getSelectionByElement,
        select: select,
        selectByNodesAndOffsets: selectByNodesAndOffsets,
        deleteSelectionContents: deleteSelectionContents,
        setCursorToLastVisiblePosition: setCursorToLastVisiblePosition,
        hasElementContainsSelection: hasElementContainsSelection
    });

    var Promise$4 = hammerhead__default.Promise;
    var nativeMethods$6 = hammerhead__default.nativeMethods;
    function waitFor (fn, delay, timeout) {
        return new Promise$4(function (resolve, reject) {
            var result = fn();
            if (result) {
                resolve(result);
                return;
            }
            var intervalId = nativeMethods$6.setInterval.call(window, function () {
                result = fn();
                if (result) {
                    nativeMethods$6.clearInterval.call(window, intervalId);
                    nativeMethods$6.clearTimeout.call(window, timeoutId);
                    resolve(result);
                }
            }, delay);
            var timeoutId = nativeMethods$6.setTimeout.call(window, function () {
                nativeMethods$6.clearInterval.call(window, intervalId);
                reject();
            }, timeout);
        });
    }

    // -------------------------------------------------------------
    var RUNTIME_ERRORS = {
        cannotCreateMultipleLiveModeRunners: 'E1000',
        cannotRunLiveModeRunnerMultipleTimes: 'E1001',
        browserDisconnected: 'E1002',
        cannotRunAgainstDisconnectedBrowsers: 'E1003',
        cannotEstablishBrowserConnection: 'E1004',
        cannotFindBrowser: 'E1005',
        browserProviderNotFound: 'E1006',
        browserNotSet: 'E1007',
        testFilesNotFound: 'E1008',
        noTestsToRun: 'E1009',
        cannotFindReporterForAlias: 'E1010',
        multipleSameStreamReporters: 'E1011',
        optionValueIsNotValidRegExp: 'E1012',
        optionValueIsNotValidKeyValue: 'E1013',
        invalidSpeedValue: 'E1014',
        invalidConcurrencyFactor: 'E1015',
        cannotDivideRemotesCountByConcurrency: 'E1016',
        portsOptionRequiresTwoNumbers: 'E1017',
        portIsNotFree: 'E1018',
        invalidHostname: 'E1019',
        cannotFindSpecifiedTestSource: 'E1020',
        clientFunctionCodeIsNotAFunction: 'E1021',
        selectorInitializedWithWrongType: 'E1022',
        clientFunctionCannotResolveTestRun: 'E1023',
        regeneratorInClientFunctionCode: 'E1024',
        invalidClientFunctionTestRunBinding: 'E1025',
        invalidValueType: 'E1026',
        unsupportedUrlProtocol: 'E1027',
        testControllerProxyCannotResolveTestRun: 'E1028',
        timeLimitedPromiseTimeoutExpired: 'E1029',
        noTestsToRunDueFiltering: 'E1030',
        cannotSetVideoOptionsWithoutBaseVideoPathSpecified: 'E1031',
        multipleAPIMethodCallForbidden: 'E1032',
        invalidReporterOutput: 'E1033',
        cannotReadSSLCertFile: 'E1034',
        cannotPrepareTestsDueToError: 'E1035',
        cannotParseRawFile: 'E1036',
        testedAppFailedWithError: 'E1037',
        unableToOpenBrowser: 'E1038',
        requestHookConfigureAPIError: 'E1039',
        forbiddenCharatersInScreenshotPath: 'E1040',
        cannotFindFFMPEG: 'E1041',
        compositeArgumentsError: 'E1042',
        cannotFindTypescriptConfigurationFile: 'E1043',
        clientScriptInitializerIsNotSpecified: 'E1044',
        clientScriptBasePathIsNotSpecified: 'E1045',
        clientScriptInitializerMultipleContentSources: 'E1046',
        cannotLoadClientScriptFromPath: 'E1047',
        clientScriptModuleEntryPointPathCalculationError: 'E1048',
        methodIsNotAvailableForAnIPCHost: 'E1049',
        tooLargeIPCPayload: 'E1050',
        malformedIPCMessage: 'E1051',
        unexpectedIPCHeadPacket: 'E1052',
        unexpectedIPCBodyPacket: 'E1053',
        unexpectedIPCTailPacket: 'E1054',
        cannotRunLocalNonHeadlessBrowserWithoutDisplay: 'E1057',
        uncaughtErrorInReporter: 'E1058',
        roleInitializedWithRelativeUrl: 'E1059',
        typeScriptCompilerLoadingError: 'E1060',
        cannotCustomizeSpecifiedCompilers: 'E1061',
        cannotEnableRetryTestPagesOption: 'E1062',
        browserConnectionError: 'E1063',
        testRunRequestInDisconnectedBrowser: 'E1064',
        invalidQuarantineOption: 'E1065',
        invalidQuarantineParametersRatio: 'E1066',
        invalidAttemptLimitValue: 'E1067',
        invalidSuccessThresholdValue: 'E1068',
        cannotSetConcurrencyWithCDPPort: 'E1069',
        cannotFindTestcafeConfigurationFile: 'E1070',
        dashboardTokenInJSON: 'E1071',
        requestUrlInvalidValueError: 'E1072',
        requestRuntimeError: 'E1073',
        requestCannotResolveTestRun: 'E1074',
        relativeBaseUrl: 'E1075',
        invalidSkipJsErrorsOptionsObjectProperty: 'E1076',
        invalidSkipJsErrorsCallbackWithOptionsProperty: 'E1077',
        invalidCommandInJsonCompiler: 'E1078',
    };

    var BrowserConnectionErrorHint;
    (function (BrowserConnectionErrorHint) {
        BrowserConnectionErrorHint["TooHighConcurrencyFactor"] = "TooHighConcurrencyFactor";
        BrowserConnectionErrorHint["UseBrowserInitOption"] = "UseBrowserInitOption";
        BrowserConnectionErrorHint["RestErrorCauses"] = "RestErrorCauses";
    })(BrowserConnectionErrorHint || (BrowserConnectionErrorHint = {}));
    var BrowserConnectionErrorHint$1 = BrowserConnectionErrorHint;

    var DEFAULT_CONCATENATED_VALUES = {
        SEPARATOR: ', ',
        QUOTE_CHAR: '"',
    };
    function getDisplayedItemText(item, quote) {
        return "".concat(quote).concat(item).concat(quote);
    }
    function getConcatenatedValuesString(array, separator, quoteChar) {
        if (separator === void 0) { separator = DEFAULT_CONCATENATED_VALUES.SEPARATOR; }
        if (quoteChar === void 0) { quoteChar = DEFAULT_CONCATENATED_VALUES.QUOTE_CHAR; }
        var clonedArray = __spreadArray([], array, true);
        if (separator.indexOf('\n') > -1)
            return clonedArray.map(function (item) { return getDisplayedItemText(item, quoteChar); }).join(separator);
        else if (clonedArray.length === 1)
            return getDisplayedItemText(clonedArray[0], quoteChar);
        else if (clonedArray.length === 2) {
            var item1 = array[0];
            var item2 = array[1];
            return "".concat(getDisplayedItemText(item1, quoteChar), " and ").concat(getDisplayedItemText(item2, quoteChar));
        }
        var lastItem = clonedArray.pop();
        var otherItemString = clonedArray.map(function (item) { return getDisplayedItemText(item, quoteChar); }).join(separator);
        return "".concat(otherItemString, ", and ").concat(getDisplayedItemText(lastItem, quoteChar));
    }

    var SKIP_JS_ERRORS_OPTIONS_OBJECT_OPTION_NAMES;
    (function (SKIP_JS_ERRORS_OPTIONS_OBJECT_OPTION_NAMES) {
        SKIP_JS_ERRORS_OPTIONS_OBJECT_OPTION_NAMES["message"] = "message";
        SKIP_JS_ERRORS_OPTIONS_OBJECT_OPTION_NAMES["stack"] = "stack";
        SKIP_JS_ERRORS_OPTIONS_OBJECT_OPTION_NAMES["pageUrl"] = "pageUrl";
    })(SKIP_JS_ERRORS_OPTIONS_OBJECT_OPTION_NAMES || (SKIP_JS_ERRORS_OPTIONS_OBJECT_OPTION_NAMES = {}));
    var SKIP_JS_ERRORS_CALLBACK_WITH_OPTIONS_OPTION_NAMES;
    (function (SKIP_JS_ERRORS_CALLBACK_WITH_OPTIONS_OPTION_NAMES) {
        SKIP_JS_ERRORS_CALLBACK_WITH_OPTIONS_OPTION_NAMES["fn"] = "fn";
        SKIP_JS_ERRORS_CALLBACK_WITH_OPTIONS_OPTION_NAMES["dependencies"] = "dependencies";
    })(SKIP_JS_ERRORS_CALLBACK_WITH_OPTIONS_OPTION_NAMES || (SKIP_JS_ERRORS_CALLBACK_WITH_OPTIONS_OPTION_NAMES = {}));

    // -------------------------------------------------------------
    // WARNING: this file is used by both the client and the server.
    // Do not use any browser or node-specific API!
    // -------------------------------------------------------------
    var _a;
    var DOCUMENTATION_LINKS = {
        TEST_SOURCE_PARAMETER: 'https://testcafe.io/documentation/402639/reference/command-line-interface#file-pathglob-pattern',
        FILTER_SETTINGS: 'https://testcafe.io/documentation/402638/reference/configuration-file#filter',
        HEADLESS_MODE: 'https://testcafe.io/documentation/402828/guides/concepts/browsers#test-in-headless-mode',
    };
    var TEMPLATES = (_a = {},
        _a[RUNTIME_ERRORS.cannotCreateMultipleLiveModeRunners] = 'Cannot launch multiple live mode instances of the TestCafe test runner.',
        _a[RUNTIME_ERRORS.cannotRunLiveModeRunnerMultipleTimes] = 'Cannot launch the same live mode instance of the TestCafe test runner multiple times.',
        _a[RUNTIME_ERRORS.browserDisconnected] = 'The {userAgent} browser disconnected. If you did not close the browser yourself, browser performance or network issues may be at fault.',
        _a[RUNTIME_ERRORS.cannotRunAgainstDisconnectedBrowsers] = 'The following browsers disconnected: {userAgents}. Cannot run further tests.',
        _a[RUNTIME_ERRORS.testRunRequestInDisconnectedBrowser] = '"{browser}" disconnected during test execution.',
        _a[RUNTIME_ERRORS.cannotEstablishBrowserConnection] = 'Cannot establish one or more browser connections.',
        _a[RUNTIME_ERRORS.cannotFindBrowser] = 'Cannot find the browser. "{browser}" is neither a known browser alias, nor a path to an executable file.',
        _a[RUNTIME_ERRORS.browserProviderNotFound] = 'Cannot find the "{providerName}" browser provider.',
        _a[RUNTIME_ERRORS.browserNotSet] = 'You have not specified a browser.',
        _a[RUNTIME_ERRORS.testFilesNotFound] = 'Could not find test files at the following location: "{cwd}".\n' +
            'Check patterns for errors:\n\n' +
            '{sourceList}\n\n' +
            'or launch TestCafe from a different directory.\n' +
            "For more information on how to specify test locations, see ".concat(DOCUMENTATION_LINKS.TEST_SOURCE_PARAMETER, "."),
        _a[RUNTIME_ERRORS.noTestsToRun] = "Source files do not contain valid 'fixture' and 'test' declarations.",
        _a[RUNTIME_ERRORS.noTestsToRunDueFiltering] = 'No tests match your filter.\n' +
            "See ".concat(DOCUMENTATION_LINKS.FILTER_SETTINGS, "."),
        _a[RUNTIME_ERRORS.cannotFindReporterForAlias] = 'The "{name}" reporter does not exist. Check the reporter parameter for errors.',
        _a[RUNTIME_ERRORS.multipleSameStreamReporters] = 'Reporters cannot share output streams. The following reporters interfere with one another: "{reporters}".',
        _a[RUNTIME_ERRORS.optionValueIsNotValidRegExp] = 'The "{optionName}" option does not contain a valid regular expression.',
        _a[RUNTIME_ERRORS.optionValueIsNotValidKeyValue] = 'The "{optionName}" option does not contain a valid key-value pair.',
        _a[RUNTIME_ERRORS.invalidQuarantineOption] = 'The "{optionName}" option does not exist. Specify "attemptLimit" and "successThreshold" to configure quarantine mode.',
        _a[RUNTIME_ERRORS.invalidQuarantineParametersRatio] = 'The value of "attemptLimit" ({attemptLimit}) should be greater then the value of "successThreshold" ({successThreshold}).',
        _a[RUNTIME_ERRORS.invalidAttemptLimitValue] = 'The "{attemptLimit}" parameter only accepts values of {MIN_ATTEMPT_LIMIT} and up.',
        _a[RUNTIME_ERRORS.invalidSuccessThresholdValue] = 'The "{successThreshold}" parameter only accepts values of {MIN_SUCCESS_THRESHOLD} and up.',
        _a[RUNTIME_ERRORS.invalidSpeedValue] = 'Speed should be a number between 0.01 and 1.',
        _a[RUNTIME_ERRORS.invalidConcurrencyFactor] = 'The concurrency factor should be an integer greater than or equal to 1.',
        _a[RUNTIME_ERRORS.cannotDivideRemotesCountByConcurrency] = 'The number of remote browsers should be divisible by the concurrency factor.',
        _a[RUNTIME_ERRORS.cannotSetConcurrencyWithCDPPort] = 'The value of the "concurrency" option includes the CDP port.',
        _a[RUNTIME_ERRORS.portsOptionRequiresTwoNumbers] = 'The "--ports" argument accepts two values at a time.',
        _a[RUNTIME_ERRORS.portIsNotFree] = 'Port {portNum} is occupied by another process.',
        _a[RUNTIME_ERRORS.invalidHostname] = 'Cannot resolve hostname "{hostname}".',
        _a[RUNTIME_ERRORS.cannotFindSpecifiedTestSource] = 'Cannot find a test file at "{path}".',
        _a[RUNTIME_ERRORS.clientFunctionCodeIsNotAFunction] = 'Cannot initialize a ClientFunction because {#instantiationCallsiteName} is {type}, and not a function.',
        _a[RUNTIME_ERRORS.selectorInitializedWithWrongType] = 'Cannot initialize a Selector because {#instantiationCallsiteName} is {type}, and not one of the following: a CSS selector string, a Selector object, a node snapshot, a function, or a Promise returned by a Selector.',
        _a[RUNTIME_ERRORS.clientFunctionCannotResolveTestRun] = "{#instantiationCallsiteName} cannot implicitly resolve the test run in context of which it should be executed. If you need to call {#instantiationCallsiteName} from the Node.js API callback, pass the test controller manually via {#instantiationCallsiteName}'s `.with({ boundTestRun: t })` method first. Note that you cannot execute {#instantiationCallsiteName} outside the test code.",
        _a[RUNTIME_ERRORS.requestCannotResolveTestRun] = "'request' cannot implicitly resolve the test run in context of which it should be executed. Note that you cannot execute 'request' in the experimental debug mode.",
        _a[RUNTIME_ERRORS.regeneratorInClientFunctionCode] = "{#instantiationCallsiteName} code, arguments or dependencies cannot contain generators or \"async/await\" syntax (use Promises instead).",
        _a[RUNTIME_ERRORS.invalidClientFunctionTestRunBinding] = 'Cannot resolve the "boundTestRun" option because its value is not a test controller.',
        _a[RUNTIME_ERRORS.invalidValueType] = '{smthg} ({actual}) is not of expected type ({type}).',
        _a[RUNTIME_ERRORS.unsupportedUrlProtocol] = 'Invalid {what}: "{url}". TestCafe cannot execute the test because the {what} includes the {protocol} protocol. TestCafe supports the following protocols: http://, https:// and file://.',
        _a[RUNTIME_ERRORS.testControllerProxyCannotResolveTestRun] = "Cannot implicitly resolve the test run in the context of which the test controller action should be executed. Use test function's 't' argument instead.",
        _a[RUNTIME_ERRORS.timeLimitedPromiseTimeoutExpired] = 'A Promise timed out.',
        _a[RUNTIME_ERRORS.cannotSetVideoOptionsWithoutBaseVideoPathSpecified] = 'You cannot manage advanced video parameters when the video recording capability is off. Specify the root storage folder for video content to enable video recording.',
        _a[RUNTIME_ERRORS.multipleAPIMethodCallForbidden] = 'You cannot call the "{methodName}" method more than once. Specify an array of parameters instead.',
        _a[RUNTIME_ERRORS.invalidReporterOutput] = "Specify a file name or a writable stream as the reporter's output target.",
        _a[RUNTIME_ERRORS.cannotReadSSLCertFile] = 'Unable to read the file referenced by the "{option}" ssl option ("{path}"). Error details:\n' +
            '\n' +
            '{err}',
        _a[RUNTIME_ERRORS.cannotPrepareTestsDueToError] = 'Cannot prepare tests due to the following error:\n' +
            '\n' +
            '{errMessage}',
        _a[RUNTIME_ERRORS.cannotParseRawFile] = 'Cannot parse a raw test file at "{path}" due to the following error:\n' +
            '\n' +
            '{errMessage}',
        _a[RUNTIME_ERRORS.testedAppFailedWithError] = 'The web application failed with the following error:\n' +
            '\n' +
            '{errMessage}',
        _a[RUNTIME_ERRORS.unableToOpenBrowser] = 'Unable to open the "{alias}" browser due to the following error:\n' +
            '\n' +
            '{errMessage}',
        _a[RUNTIME_ERRORS.requestHookConfigureAPIError] = 'Attempt to configure a request hook resulted in the following error:\n' +
            '\n' +
            '{requestHookName}: {errMsg}',
        _a[RUNTIME_ERRORS.forbiddenCharatersInScreenshotPath] = 'There are forbidden characters in the "{screenshotPath}" {screenshotPathType}:\n' +
            ' {forbiddenCharsDescription}',
        _a[RUNTIME_ERRORS.cannotFindFFMPEG] = 'TestCafe cannot record videos because it cannot locate the FFmpeg executable. Try one of the following solutions:\n' +
            '\n' +
            '* add the path of the FFmpeg installation directory to the PATH environment variable,\n' +
            '* specify the path of the FFmpeg executable in the FFMPEG_PATH environment variable or the ffmpegPath option,\n' +
            '* install the @ffmpeg-installer/ffmpeg npm package.',
        _a[RUNTIME_ERRORS.cannotFindTypescriptConfigurationFile] = '"{filePath}" is not a valid TypeScript configuration file.',
        _a[RUNTIME_ERRORS.clientScriptInitializerIsNotSpecified] = 'Initialize your client script with one of the following: a JavaScript script, a JavaScript file path, or the name of a JavaScript module.',
        _a[RUNTIME_ERRORS.clientScriptBasePathIsNotSpecified] = 'Specify the base path for the client script file.',
        _a[RUNTIME_ERRORS.clientScriptInitializerMultipleContentSources] = 'Client scripts can only have one initializer: JavaScript code, a JavaScript file path, or the name of a JavaScript module.',
        _a[RUNTIME_ERRORS.cannotLoadClientScriptFromPath] = 'Cannot load a client script from {path}.\n{errorMessage}',
        _a[RUNTIME_ERRORS.clientScriptModuleEntryPointPathCalculationError] = 'A client script tried to load a JavaScript module that TestCafe cannot locate:\n\n{errorMessage}.',
        _a[RUNTIME_ERRORS.methodIsNotAvailableForAnIPCHost] = 'This method cannot be called on a service host.',
        _a[RUNTIME_ERRORS.tooLargeIPCPayload] = 'The specified payload is too large to form an IPC packet.',
        _a[RUNTIME_ERRORS.malformedIPCMessage] = 'Cannot process a malformed IPC message.',
        _a[RUNTIME_ERRORS.unexpectedIPCHeadPacket] = 'Cannot create an IPC message due to an unexpected IPC head packet.',
        _a[RUNTIME_ERRORS.unexpectedIPCBodyPacket] = 'Cannot create an IPC message due to an unexpected IPC body packet.',
        _a[RUNTIME_ERRORS.unexpectedIPCTailPacket] = 'Cannot create an IPC message due to an unexpected IPC tail packet.',
        _a[RUNTIME_ERRORS.cannotRunLocalNonHeadlessBrowserWithoutDisplay] = 'Your Linux version does not have a graphic subsystem to run {browserAlias} with a GUI. ' +
            'You can launch the browser in headless mode. ' +
            'If you use a portable browser executable, ' +
            "specify the browser alias before the path instead of the 'path' prefix. " +
            "For more information, see ".concat(DOCUMENTATION_LINKS.HEADLESS_MODE),
        _a[RUNTIME_ERRORS.uncaughtErrorInReporter] = 'The "{methodName}" method of the "{reporterName}" reporter produced an uncaught error. Error details:\n{originalError}',
        _a[RUNTIME_ERRORS.roleInitializedWithRelativeUrl] = 'You cannot specify relative login page URLs in the Role constructor. Use an absolute URL.',
        _a[RUNTIME_ERRORS.typeScriptCompilerLoadingError] = 'Cannot load the TypeScript compiler.\n{originErrorMessage}.',
        _a[RUNTIME_ERRORS.cannotCustomizeSpecifiedCompilers] = 'You cannot specify options for the {noncustomizableCompilerList} compiler{suffix}.',
        _a[RUNTIME_ERRORS.cannotEnableRetryTestPagesOption] = 'Cannot enable the \'retryTestPages\' option. Apply one of the following two solutions:\n' +
            '-- set \'localhost\' as the value of the \'hostname\' option\n' +
            '-- run TestCafe over HTTPS\n',
        _a[RUNTIME_ERRORS.browserConnectionError] = '{originErrorMessage}\n{numOfNotOpenedConnection} of {numOfAllConnections} browser connections have not been established:\n{listOfNotOpenedConnections}\n\nHints:\n{listOfHints}',
        _a[BrowserConnectionErrorHint$1.TooHighConcurrencyFactor] = 'The host machine may not be powerful enough to handle the specified concurrency factor ({concurrencyFactor}). ' +
            'Try to decrease the concurrency factor or allocate more computing resources to the host machine.',
        _a[BrowserConnectionErrorHint$1.UseBrowserInitOption] = 'Increase the value of the "browserInitTimeout" option if it is too low (currently: {browserInitTimeoutMsg}). This option determines how long TestCafe waits for browsers to be ready.',
        _a[BrowserConnectionErrorHint$1.RestErrorCauses] = 'The error can also be caused by network issues or remote device failure. Make sure that your network connection is stable and you can reach the remote device.',
        _a[RUNTIME_ERRORS.cannotFindTestcafeConfigurationFile] = 'Cannot locate a TestCafe configuration file at {filePath}. Either the file does not exist, or the path is invalid.',
        _a[RUNTIME_ERRORS.dashboardTokenInJSON] = 'Insecure token declaration: cannot declare a Dashboard token in a JSON configuration file. Use a JavaScript configuration file, or declare a Dashboard token with one of the following: the CLI, the Test Runner API, the TESTCAFE_DASHBOARD_TOKEN environment variable.',
        _a[RUNTIME_ERRORS.relativeBaseUrl] = 'The value of the baseUrl argument cannot be relative: "{baseUrl}"',
        _a[RUNTIME_ERRORS.requestUrlInvalidValueError] = 'Requested url isn\'t valid ({actualValue}).',
        _a[RUNTIME_ERRORS.requestRuntimeError] = 'The request was interrupted by an error:\n{message}',
        _a[RUNTIME_ERRORS.invalidSkipJsErrorsOptionsObjectProperty] = "The \"{optionName}\" option does not exist. Use the following options to configure skipJsErrors: ".concat(getConcatenatedValuesString(Object.keys(SKIP_JS_ERRORS_OPTIONS_OBJECT_OPTION_NAMES)), "."),
        _a[RUNTIME_ERRORS.invalidSkipJsErrorsCallbackWithOptionsProperty] = "The \"{optionName}\" option does not exist. Use the following options to configure skipJsErrors callback: ".concat(getConcatenatedValuesString(Object.keys(SKIP_JS_ERRORS_CALLBACK_WITH_OPTIONS_OPTION_NAMES)), "."),
        _a[RUNTIME_ERRORS.invalidCommandInJsonCompiler] = "TestCafe terminated the test run. The \"{path}\" file contains an unknown Chrome User Flow action \"{action}\". Remove the action to continue. Refer to the following article for the definitive list of supported Chrome User Flow actions: https://testcafe.io/documentation/403998/guides/experimental-capabilities/chrome-replay-support#supported-replay-actions",
        _a);

    var timeLimitedPromiseTimeoutExpiredTemplate = TEMPLATES[RUNTIME_ERRORS.timeLimitedPromiseTimeoutExpired];
    var TimeLimitedPromiseTimeoutExpiredError = /** @class */ (function (_super) {
        __extends(TimeLimitedPromiseTimeoutExpiredError, _super);
        function TimeLimitedPromiseTimeoutExpiredError() {
            var _this = _super.call(this, timeLimitedPromiseTimeoutExpiredTemplate) || this;
            _this.code = RUNTIME_ERRORS.timeLimitedPromiseTimeoutExpired;
            return _this;
        }
        return TimeLimitedPromiseTimeoutExpiredError;
    }(Error));
    function getTimeLimitedPromise (promise, ms) {
        return hammerhead.Promise.race([promise, delay(ms).then(function () { return hammerhead.Promise.reject(new TimeLimitedPromiseTimeoutExpiredError()); })]);
    }

    function noop() {
    }

    function getKeyArray(keyCombination) {
        // NOTE: we should separate the '+' symbol that concats other
        // keys and the '+'  key to support commands like the 'ctrl++'
        var keys = keyCombination.replace(/^\+/g, 'plus').replace(/\+\+/g, '+plus').split('+');
        return map(keys, function (key) { return key.replace('plus', '+'); });
    }

    function getSanitizedKey(key) {
        var isChar = key.length === 1 || key === 'space';
        var sanitizedKey = isChar ? key : key.toLowerCase();
        if (KEY_MAPS.modifiersMap[sanitizedKey])
            sanitizedKey = KEY_MAPS.modifiersMap[sanitizedKey];
        return sanitizedKey;
    }

    var trim = hammerhead__default.utils.trim;
    function parseKeySequence (keyString) {
        if (typeof keyString !== 'string')
            return { error: true };
        keyString = trim(keyString).replace(/\s+/g, ' ');
        var keyStringLength = keyString.length;
        var lastChar = keyString.charAt(keyStringLength - 1);
        var charBeforeLast = keyString.charAt(keyStringLength - 2);
        // NOTE: trim last connecting '+'
        if (keyStringLength > 1 && lastChar === '+' && !/[+ ]/.test(charBeforeLast))
            keyString = keyString.substring(0, keyString.length - 1);
        var combinations = keyString.split(' ');
        var error = some(combinations, function (combination) {
            var keyArray = getKeyArray(combination);
            return some(keyArray, function (key) {
                var isChar = key.length === 1 || key === 'space';
                var sanitizedKey = getSanitizedKey(key);
                var modifierKeyCode = KEY_MAPS.modifiers[sanitizedKey];
                var specialKeyCode = KEY_MAPS.specialKeys[sanitizedKey];
                return !(isChar || modifierKeyCode || specialKeyCode);
            });
        });
        return {
            combinations: combinations,
            error: error,
            keys: keyString,
        };
    }

    var htmlUtils = hammerhead__default.utils.html;
    var nativeMethods$7 = hammerhead__default.nativeMethods;
    var MAX_TEXT_CONTENT_LENGTH = 10;
    function truncateString(str, length, omission) {
        if (omission === void 0) { omission = '...'; }
        if (str.length < length)
            return str;
        return str.substring(0, length - omission.length) + omission;
    }
    function stringifyElement(element) {
        if (!element)
            return '';
        var emptyElement = nativeMethods$7.cloneNode.call(element);
        var outerHtml = htmlUtils.cleanUpHtml(nativeMethods$7.elementOuterHTMLGetter.call(emptyElement));
        var text = truncateString(nativeMethods$7.nodeTextContentGetter.call(element), MAX_TEXT_CONTENT_LENGTH);
        var children = nativeMethods$7.elementChildrenGetter.call(element);
        if (nativeMethods$7.htmlCollectionLengthGetter.call(children) > 0)
            return outerHtml.replace('></', '>...</');
        if (text)
            return outerHtml.replace('></', ">".concat(text, "</"));
        return outerHtml;
    }

    // --------------------------------------------------------
    // WARNING: this file is used by both the client and the server.
    // Do not use any browser or node-specific API!
    // --------------------------------------------------------
    var COMMAND = {
        run: 'run',
        idle: 'idle',
    };

    var HeartbeatStatus;
    (function (HeartbeatStatus) {
        HeartbeatStatus["ok"] = "ok";
        HeartbeatStatus["closing"] = "closing";
    })(HeartbeatStatus || (HeartbeatStatus = {}));
    var HeartbeatStatus$1 = HeartbeatStatus;

    // -------------------------------------------------------------
    var HEARTBEAT_INTERVAL = 2 * 1000;

    var SERVICE_ROUTES = {
        connect: '/browser/connect',
        connectWithTrailingSlash: '/browser/connect/',
        heartbeat: '/browser/heartbeat',
        status: '/browser/status',
        statusDone: '/browser/status-done',
        initScript: '/browser/init-script',
        idle: '/browser/idle',
        idleForced: '/browser/idle-forced',
        activeWindowId: '/browser/active-window-id',
        closeWindow: '/browser/close-window',
        serviceWorker: '/service-worker.js',
        openFileProtocol: '/browser/open-file-protocol',
        assets: {
            index: '/browser/assets/index.js',
            styles: '/browser/assets/styles.css',
            logo: '/browser/assets/logo.svg',
        },
    };

    /*eslint-disable no-restricted-properties*/
    var LOCATION_HREF = document.location.href;
    var LOCATION_ORIGIN = document.location.origin;
    /*eslint-enable no-restricted-properties*/
    var STATUS_RETRY_DELAY = 1000;
    var MAX_STATUS_RETRY = 5;
    var SERVICE_WORKER_LOCATION = LOCATION_ORIGIN + SERVICE_ROUTES.serviceWorker;
    var FILE_PROTOCOL_ORIGIN = 'file://';
    var allowInitScriptExecution = false;
    var heartbeatIntervalId = null;
    var evaluate = eval; // eslint-disable-line no-eval
    //Utils
    function delay$1(ms) {
        return new Promise$5(function (resolve) { return setTimeout(resolve, ms); });
    }
    // NOTE: the window.XMLHttpRequest may have been wrapped by Hammerhead, while we should send a request to
    // the original URL. That's why we need the XMLHttpRequest argument to send the request via native methods.
    function sendXHR(url, createXHR, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.method, method = _c === void 0 ? 'GET' : _c, _d = _b.data, data = _d === void 0 ? null : _d, _e = _b.parseResponse, parseResponse = _e === void 0 ? true : _e;
        return new Promise$5(function (resolve, reject) {
            var xhr = createXHR();
            xhr.open(method, url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var responseText = xhr.responseText || '';
                        if (responseText && parseResponse)
                            responseText = JSON.parse(xhr.responseText); //eslint-disable-line no-restricted-globals
                        resolve(responseText);
                    }
                    else
                        reject('disconnected');
                }
            };
            xhr.send(data);
        });
    }
    function isCurrentLocation(url) {
        return LOCATION_HREF.toLowerCase() === url.toLowerCase();
    }
    function isFileProtocol(url) {
        if (url === void 0) { url = ''; }
        return url.indexOf(FILE_PROTOCOL_ORIGIN) === 0;
    }
    //API
    function startHeartbeat(heartbeatUrl, createXHR) {
        function heartbeat() {
            sendXHR(heartbeatUrl, createXHR)
                .then(function (status) {
                if (status.code === HeartbeatStatus$1.closing && !isCurrentLocation(status.url)) {
                    stopInitScriptExecution();
                    document.location = status.url;
                }
            });
        }
        heartbeatIntervalId = window.setInterval(heartbeat, HEARTBEAT_INTERVAL);
        heartbeat();
    }
    function stopHeartbeat() {
        window.clearInterval(heartbeatIntervalId);
    }
    function executeInitScript(initScriptUrl, createXHR) {
        if (!allowInitScriptExecution)
            return;
        sendXHR(initScriptUrl, createXHR)
            .then(function (res) {
            if (!res.code)
                return null;
            return sendXHR(initScriptUrl, createXHR, { method: 'POST', data: JSON.stringify(evaluate(res.code)) }); //eslint-disable-line no-restricted-globals
        })
            .then(function () {
            window.setTimeout(function () { return executeInitScript(initScriptUrl, createXHR); }, 1000);
        });
    }
    function startInitScriptExecution(initScriptUrl, createXHR) {
        allowInitScriptExecution = true;
        executeInitScript(initScriptUrl, createXHR);
    }
    function stopInitScriptExecution() {
        allowInitScriptExecution = false;
    }
    function redirect(command, createXHR, openFileProtocolUrl) {
        stopInitScriptExecution();
        if (isFileProtocol(command.url))
            sendXHR(openFileProtocolUrl, createXHR, { method: 'POST', data: JSON.stringify({ url: command.url }) }); //eslint-disable-line no-restricted-globals
        else
            document.location = command.url;
    }
    function proxylessCheckRedirecting(_a) {
        var result = _a.result;
        if (result.cmd === COMMAND.idle)
            return regularCheckRedirecting(result);
        // NOTE: The tested page URL can be the same for a few tests.
        // So, we are forced to return true for all 'run' commands.
        return true;
    }
    function regularCheckRedirecting(result) {
        return (result.cmd === COMMAND.run || result.cmd === COMMAND.idle)
            && !isCurrentLocation(result.url);
    }
    function getStatus(_a, createXHR, _b) {
        var statusUrl = _a.statusUrl, openFileProtocolUrl = _a.openFileProtocolUrl;
        var _c = _b === void 0 ? {} : _b, manualRedirect = _c.manualRedirect, proxyless = _c.proxyless;
        return __awaiter(this, void 0, void 0, function () {
            var result, redirecting;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, sendXHR(statusUrl, createXHR)];
                    case 1:
                        result = _d.sent();
                        redirecting = proxyless ? proxylessCheckRedirecting({ result: result }) : regularCheckRedirecting(result);
                        if (redirecting && !manualRedirect)
                            redirect(result, createXHR, openFileProtocolUrl);
                        return [2 /*return*/, { command: result, redirecting: redirecting }];
                }
            });
        });
    }
    function tryGetStatus() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, getStatus.apply(void 0, args)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        // eslint-disable-next-line no-console
                        console.error(error_1);
                        return [2 /*return*/, { error: error_1 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function checkStatus() {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var error, result, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        error = null;
                        result = null;
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < MAX_STATUS_RETRY)) return [3 /*break*/, 5];
                        return [4 /*yield*/, tryGetStatus.apply(void 0, args)];
                    case 2:
                        (_a = _b.sent(), error = _a.error, result = __rest(_a, ["error"]));
                        if (!error)
                            return [2 /*return*/, result];
                        return [4 /*yield*/, delay$1(STATUS_RETRY_DELAY)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: throw error;
                }
            });
        });
    }
    function enableRetryingTestPages() {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!navigator.serviceWorker)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, navigator.serviceWorker.register(SERVICE_WORKER_LOCATION, { scope: LOCATION_ORIGIN })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, navigator.serviceWorker.ready];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        // eslint-disable-next-line no-console
                        console.error(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    function getActiveWindowId(activeWindowIdUrl, createXHR) {
        return sendXHR(activeWindowIdUrl, createXHR);
    }
    function setActiveWindowId(activeWindowIdUrl, createXHR, windowId) {
        return sendXHR(activeWindowIdUrl, createXHR, {
            method: 'POST',
            data: JSON.stringify({ windowId: windowId }), //eslint-disable-line no-restricted-globals
        });
    }
    function closeWindow(closeWindowUrl, createXHR, windowId) {
        return sendXHR(closeWindowUrl, createXHR, {
            method: 'POST',
            data: JSON.stringify({ windowId: windowId }), //eslint-disable-line no-restricted-globals
        });
    }

    var browser = /*#__PURE__*/Object.freeze({
        __proto__: null,
        delay: delay$1,
        sendXHR: sendXHR,
        startHeartbeat: startHeartbeat,
        stopHeartbeat: stopHeartbeat,
        startInitScriptExecution: startInitScriptExecution,
        stopInitScriptExecution: stopInitScriptExecution,
        redirect: redirect,
        checkStatus: checkStatus,
        enableRetryingTestPages: enableRetryingTestPages,
        getActiveWindowId: getActiveWindowId,
        setActiveWindowId: setActiveWindowId,
        closeWindow: closeWindow
    });

    // -------------------------------------------------------------
    // WARNING: this file is used by both the client and the server.
    // Do not use any browser or node-specific API!
    // -------------------------------------------------------------
    /* eslint-disable no-undef */
    function selectorTextFilter(node, index, originNode, textFilter) {
        function hasChildrenWithText(parentNode) {
            var cnCount = parentNode.childNodes.length;
            for (var i = 0; i < cnCount; i++) {
                if (selectorTextFilter(parentNode.childNodes[i], index, originNode, textFilter))
                    return true;
            }
            return false;
        }
        function checkNodeText(text) {
            if (textFilter instanceof RegExp)
                return textFilter.test(text);
            return textFilter === text.trim();
        }
        // Element
        if (node.nodeType === 1) {
            // NOTE: In Firefox, <option> elements don't have `innerText`.
            // So, we fallback to `textContent` in that case (see GH-861).
            // SVG elements do not have `innerText` property as well
            return checkNodeText(node.innerText || node.textContent);
        }
        // Document
        if (node.nodeType === 9) {
            // NOTE: latest version of Edge doesn't have `innerText` for `document`,
            // `html` and `body`. So we check their children instead.
            var head = node.querySelector('head');
            var body = node.querySelector('body');
            return hasChildrenWithText(head) || hasChildrenWithText(body);
        }
        // DocumentFragment
        if (node.nodeType === 11)
            return hasChildrenWithText(node);
        return checkNodeText(node.textContent);
    }
    /* eslint-enable no-undef */

    // -------------------------------------------------------------
    // WARNING: this file is used by both the client and the server.
    // Do not use any browser or node-specific API!
    // -------------------------------------------------------------
    /* eslint-disable no-undef */
    function selectorAttributeFilter(node, index, originNode, attrName, attrValue) {
        if (node.nodeType !== 1)
            return false;
        var attributes = node.attributes;
        var attr = null;
        var check = function (actual, expect) { return typeof expect === 'string' ? expect === actual : expect.test(actual); };
        for (var i = 0; i < attributes.length; i++) {
            attr = attributes[i];
            if (check(attr.nodeName, attrName) && (!attrValue || check(attr.nodeValue, attrValue)))
                return true;
        }
        return false;
    }
    /* eslint-enable no-undef */

    var exports$1 = {};
    exports$1.RequestBarrier = RequestBarrier;
    exports$1.ClientRequestEmitter = HammerheadClientRequestEmitter;
    exports$1.ScriptExecutionBarrier = ScriptExecutionBarrier;
    exports$1.ScriptExecutionEmitter = HammerheadScriptExecutionEmitter;
    exports$1.pageUnloadBarrier = pageUnloadBarrier;
    exports$1.preventRealEvents = preventRealEvents;
    exports$1.disableRealEventsPreventing = disableRealEventsPreventing;
    exports$1.scrollController = scrollController;
    exports$1.ScrollAutomation = ScrollAutomation;
    exports$1.serviceUtils = serviceUtils;
    exports$1.domUtils = domUtils;
    exports$1.contentEditable = contentEditable;
    exports$1.positionUtils = positionUtils;
    exports$1.styleUtils = styleUtils$1;
    exports$1.scrollUtils = scrollUtils;
    exports$1.eventUtils = eventUtils;
    exports$1.arrayUtils = arrayUtils;
    exports$1.promiseUtils = promiseUtils;
    exports$1.textSelection = textSelection;
    exports$1.waitFor = waitFor;
    exports$1.delay = delay;
    exports$1.getTimeLimitedPromise = getTimeLimitedPromise;
    exports$1.noop = noop;
    exports$1.getKeyArray = getKeyArray;
    exports$1.getSanitizedKey = getSanitizedKey;
    exports$1.parseKeySequence = parseKeySequence;
    exports$1.sendRequestToFrame = sendRequestToFrame;
    exports$1.KEY_MAPS = KEY_MAPS;
    exports$1.browser = browser;
    exports$1.stringifyElement = stringifyElement;
    exports$1.selectorTextFilter = selectorTextFilter;
    exports$1.selectorAttributeFilter = selectorAttributeFilter;
    var nativeMethods$8 = hammerhead__default.nativeMethods;
    var evalIframeScript = hammerhead__default.EVENTS.evalIframeScript;
    nativeMethods$8.objectDefineProperty(window, '%testCafeCore%', { configurable: true, value: exports$1 });
    // NOTE: initTestCafeCore defined in wrapper template
    /* global initTestCafeCore */
    hammerhead__default.on(evalIframeScript, function (e) { return initTestCafeCore(nativeMethods$8.contentWindowGetter.call(e.iframe), true); });
    var messageSandbox$1 = hammerhead__default.eventSandbox.message;
    // Setup cross-iframe interaction
    messageSandbox$1.on(messageSandbox$1.SERVICE_MSG_RECEIVED_EVENT, function (e) {
        if (e.message.cmd !== ScrollAutomation.SCROLL_REQUEST_CMD)
            return;
        var _a = e.message, offsetX = _a.offsetX, offsetY = _a.offsetY, maxScrollMargin = _a.maxScrollMargin;
        var element = findIframeByWindow(e.source);
        var scroll = new ScrollAutomation(element, { offsetX: offsetX, offsetY: offsetY }, maxScrollMargin);
        scroll.run()
            .then(function () { return messageSandbox$1.sendServiceMsg({ cmd: ScrollAutomation.SCROLL_RESPONSE_CMD }, e.source); });
    });

}(window['%hammerhead%'], window['%hammerhead%'].Promise));

    }

    initTestCafeCore(window);
})();
