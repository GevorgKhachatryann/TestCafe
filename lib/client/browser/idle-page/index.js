(function () {
	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var PENDING = 'pending';
	var SETTLED = 'settled';
	var FULFILLED = 'fulfilled';
	var REJECTED = 'rejected';
	var NOOP = function () { };
	var isNode = typeof commonjsGlobal !== 'undefined' && typeof commonjsGlobal.process !== 'undefined' && typeof commonjsGlobal.process.emit === 'function';
	var asyncSetTimer = typeof setImmediate === 'undefined' ? setTimeout : setImmediate;
	var asyncQueue = [];
	var asyncTimer;
	function asyncFlush() {
	    // run promise callbacks
	    for (var i = 0; i < asyncQueue.length; i++) {
	        asyncQueue[i][0](asyncQueue[i][1]);
	    }
	    // reset async asyncQueue
	    asyncQueue = [];
	    asyncTimer = false;
	}
	function asyncCall(callback, arg) {
	    asyncQueue.push([callback, arg]);
	    if (!asyncTimer) {
	        asyncTimer = true;
	        asyncSetTimer(asyncFlush, 0);
	    }
	}
	function invokeResolver(resolver, promise) {
	    function resolvePromise(value) {
	        resolve(promise, value);
	    }
	    function rejectPromise(reason) {
	        reject(promise, reason);
	    }
	    try {
	        resolver(resolvePromise, rejectPromise);
	    }
	    catch (e) {
	        rejectPromise(e);
	    }
	}
	function invokeCallback(subscriber) {
	    var owner = subscriber.owner;
	    var settled = owner._state;
	    var value = owner._data;
	    var callback = subscriber[settled];
	    var promise = subscriber.then;
	    if (typeof callback === 'function') {
	        settled = FULFILLED;
	        try {
	            value = callback(value);
	        }
	        catch (e) {
	            reject(promise, e);
	        }
	    }
	    if (!handleThenable(promise, value)) {
	        if (settled === FULFILLED) {
	            resolve(promise, value);
	        }
	        if (settled === REJECTED) {
	            reject(promise, value);
	        }
	    }
	}
	function handleThenable(promise, value) {
	    var resolved;
	    try {
	        if (promise === value) {
	            throw new TypeError('A promises callback cannot return that same promise.');
	        }
	        if (value && (typeof value === 'function' || typeof value === 'object')) {
	            // then should be retrieved only once
	            var then = value.then;
	            if (typeof then === 'function') {
	                then.call(value, function (val) {
	                    if (!resolved) {
	                        resolved = true;
	                        if (value === val) {
	                            fulfill(promise, val);
	                        }
	                        else {
	                            resolve(promise, val);
	                        }
	                    }
	                }, function (reason) {
	                    if (!resolved) {
	                        resolved = true;
	                        reject(promise, reason);
	                    }
	                });
	                return true;
	            }
	        }
	    }
	    catch (e) {
	        if (!resolved) {
	            reject(promise, e);
	        }
	        return true;
	    }
	    return false;
	}
	function resolve(promise, value) {
	    if (promise === value || !handleThenable(promise, value)) {
	        fulfill(promise, value);
	    }
	}
	function fulfill(promise, value) {
	    if (promise._state === PENDING) {
	        promise._state = SETTLED;
	        promise._data = value;
	        asyncCall(publishFulfillment, promise);
	    }
	}
	function reject(promise, reason) {
	    if (promise._state === PENDING) {
	        promise._state = SETTLED;
	        promise._data = reason;
	        asyncCall(publishRejection, promise);
	    }
	}
	function publish(promise) {
	    promise._then = promise._then.forEach(invokeCallback);
	}
	function publishFulfillment(promise) {
	    promise._state = FULFILLED;
	    publish(promise);
	}
	function publishRejection(promise) {
	    promise._state = REJECTED;
	    publish(promise);
	    if (!promise._handled && isNode) {
	        commonjsGlobal.process.emit('unhandledRejection', promise._data, promise);
	    }
	}
	function notifyRejectionHandled(promise) {
	    commonjsGlobal.process.emit('rejectionHandled', promise);
	}
	/**
	 * @class
	 */
	function Promise(resolver) {
	    if (typeof resolver !== 'function') {
	        throw new TypeError('Promise resolver ' + resolver + ' is not a function');
	    }
	    if (this instanceof Promise === false) {
	        throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');
	    }
	    this._then = [];
	    invokeResolver(resolver, this);
	}
	Promise.prototype = {
	    constructor: Promise,
	    _state: PENDING,
	    _then: null,
	    _data: undefined,
	    _handled: false,
	    then: function (onFulfillment, onRejection) {
	        var subscriber = {
	            owner: this,
	            then: new this.constructor(NOOP),
	            fulfilled: onFulfillment,
	            rejected: onRejection
	        };
	        if ((onRejection || onFulfillment) && !this._handled) {
	            this._handled = true;
	            if (this._state === REJECTED && isNode) {
	                asyncCall(notifyRejectionHandled, this);
	            }
	        }
	        if (this._state === FULFILLED || this._state === REJECTED) {
	            // already resolved, call callback async
	            asyncCall(invokeCallback, subscriber);
	        }
	        else {
	            // subscribe
	            this._then.push(subscriber);
	        }
	        return subscriber.then;
	    },
	    catch: function (onRejection) {
	        return this.then(null, onRejection);
	    }
	};
	Promise.all = function (promises) {
	    if (!Array.isArray(promises)) {
	        throw new TypeError('You must pass an array to Promise.all().');
	    }
	    return new Promise(function (resolve, reject) {
	        var results = [];
	        var remaining = 0;
	        function resolver(index) {
	            remaining++;
	            return function (value) {
	                results[index] = value;
	                if (!--remaining) {
	                    resolve(results);
	                }
	            };
	        }
	        for (var i = 0, promise; i < promises.length; i++) {
	            promise = promises[i];
	            if (promise && typeof promise.then === 'function') {
	                promise.then(resolver(i), reject);
	            }
	            else {
	                results[i] = promise;
	            }
	        }
	        if (!remaining) {
	            resolve(results);
	        }
	    });
	};
	Promise.race = function (promises) {
	    if (!Array.isArray(promises)) {
	        throw new TypeError('You must pass an array to Promise.race().');
	    }
	    return new Promise(function (resolve, reject) {
	        for (var i = 0, promise; i < promises.length; i++) {
	            promise = promises[i];
	            if (promise && typeof promise.then === 'function') {
	                promise.then(resolve, reject);
	            }
	            else {
	                resolve(promise);
	            }
	        }
	    });
	};
	Promise.resolve = function (value) {
	    if (value && typeof value === 'object' && value.constructor === Promise) {
	        return value;
	    }
	    return new Promise(function (resolve) {
	        resolve(value);
	    });
	};
	Promise.reject = function (reason) {
	    return new Promise(function (resolve, reject) {
	        reject(reason);
	    });
	};
	var pinkie = Promise;

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
	    return new (P || (P = pinkie))(function (resolve, reject) {
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
	function delay(ms) {
	    return new pinkie(function (resolve) { return setTimeout(resolve, ms); });
	}
	// NOTE: the window.XMLHttpRequest may have been wrapped by Hammerhead, while we should send a request to
	// the original URL. That's why we need the XMLHttpRequest argument to send the request via native methods.
	function sendXHR(url, createXHR, _a) {
	    var _b = _a === void 0 ? {} : _a, _c = _b.method, method = _c === void 0 ? 'GET' : _c, _d = _b.data, data = _d === void 0 ? null : _d, _e = _b.parseResponse, parseResponse = _e === void 0 ? true : _e;
	    return new pinkie(function (resolve, reject) {
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
	                    return [4 /*yield*/, delay(STATUS_RETRY_DELAY)];
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

	var SPINNER_WIDTH = 8;
	var RELATED_SPINNER_SIZE = 0.8;
	var MAXIMUM_SPINNER_SIZE = 400;
	var ROTATION_ANGLE = 7;
	var FONT_SIZE_EQUATION_SLOPE = 0.03;
	var FONT_SIZE_EQUATION_Y_INTERCEPT = 3.5;
	var START_GRADIENT_POINT_OFFSET = { x: 0.75, y: 0.7 };
	var END_GRADIENT_POINT_OFFSET = { x: 1.025, y: 0.575 };
	var LINE_HEIGHT_INDENT = 6;
	var CONNECTED_SPINNER_COLOR = '#28687F';
	var DISCONNECTED_SPINNER_COLOR = '#882E24';
	var SPINNER_GRADIENT_COLOR = '#181818';
	var CONNECTED_TEXT = 'CONNECTED';
	var DISCONNECTED_TEXT = 'DISCONNECTED';
	var PAGE_BACKGROUND_CLASS_NAME = 'page-background';
	var CONTAINER_CLASS_NAME = 'container';
	var USER_AGENT_ELEMENT_CLASS_NAME = 'user-agent';
	var STATUS_ELEMENT_CLASS_NAME = 'status';
	var CANVAS_CLASS_NAME = 'spinner';
	var CONNECTED_CLASS_NAME = 'connected';
	var DISCONNECTED_CLASS_NAME = 'disconnected';
	var ANIMATION_DELAY = 30;
	//Utils
	function convertToRadian(angle) {
	    return angle * Math.PI / 180;
	}
	function convertToString(value) {
	    return value + 'px';
	}
	function rotateAxes(point, rotationAngle) {
	    var angle = convertToRadian(rotationAngle);
	    return {
	        x: Math.round(point.x * Math.cos(angle) - point.y * Math.sin(angle)),
	        y: Math.round(point.x * Math.sin(angle) + point.y * Math.cos(angle)),
	    };
	}
	function moveAxes(point, distance) {
	    return {
	        x: Math.round(point.x - distance),
	        y: Math.round(point.y - distance),
	    };
	}
	var StatusIndicator = /** @class */ (function () {
	    function StatusIndicator() {
	        this.connected = true;
	        this.canvas = document.getElementsByClassName(CANVAS_CLASS_NAME)[0];
	        this.canvasContext = this.canvas.getContext('2d');
	        this.spinnerAnimationInterval = null;
	        this.rotationAngle = 0;
	        this.size = null;
	        this.spinnerCenter = null;
	        this.gradient = null;
	        this._setSize();
	        this._setFontSize();
	        this._setSpinnerGradient();
	        StatusIndicator._createStatusMessage(this.connected);
	        StatusIndicator._alignContainerVertically();
	        this._drawSpinner(this.connected, 0);
	        this._watchWindowResize();
	    }
	    //Markup
	    StatusIndicator._getContainer = function () {
	        return document.getElementsByClassName(CONTAINER_CLASS_NAME)[0];
	    };
	    StatusIndicator._getStatusElementSpan = function () {
	        return document.getElementsByClassName(STATUS_ELEMENT_CLASS_NAME)[0].children[0];
	    };
	    StatusIndicator._createStatusMessage = function (connected) {
	        var statusSpan = StatusIndicator._getStatusElementSpan();
	        // eslint-disable-next-line no-restricted-properties
	        statusSpan.textContent = connected ? CONNECTED_TEXT : DISCONNECTED_TEXT;
	        statusSpan.className = connected ? CONNECTED_CLASS_NAME : DISCONNECTED_CLASS_NAME;
	    };
	    StatusIndicator._alignContainerVertically = function () {
	        var background = document.getElementsByClassName(PAGE_BACKGROUND_CLASS_NAME)[0];
	        var container = StatusIndicator._getContainer();
	        var topMargin = Math.ceil((background.offsetHeight - container.offsetHeight) / 2);
	        if (topMargin > 0)
	            container.style.marginTop = convertToString(topMargin);
	    };
	    StatusIndicator.prototype._setSize = function () {
	        var documentElement = window.document.documentElement;
	        var minResolution = Math.min(documentElement.clientWidth, documentElement.clientHeight);
	        var container = StatusIndicator._getContainer();
	        var newSize = Math.round(Math.min(MAXIMUM_SPINNER_SIZE, minResolution * RELATED_SPINNER_SIZE));
	        if (newSize === this.size)
	            return;
	        this.size = Math.round(Math.min(MAXIMUM_SPINNER_SIZE, minResolution * RELATED_SPINNER_SIZE));
	        this.spinnerCenter = this.size / 2;
	        container.style.width = convertToString(this.size);
	        container.style.height = convertToString(this.size);
	        this.canvas.width = this.canvas.height = this.size;
	    };
	    StatusIndicator.prototype._setFontSize = function () {
	        var userAgentSpan = document.getElementsByClassName(USER_AGENT_ELEMENT_CLASS_NAME)[0].children[0];
	        var statusSpan = StatusIndicator._getStatusElementSpan();
	        // NOTE: We have established proportions for two edge cases:
	        // the maximum spinner size of 400px corresponds to the 16px font,
	        // the minimum spinner size of 240px corresponds to the 11px font.
	        // Actual sizes are calculated from these proportions.
	        var fontSize = Math.round(FONT_SIZE_EQUATION_SLOPE * this.size + FONT_SIZE_EQUATION_Y_INTERCEPT);
	        var lineHeight = fontSize + LINE_HEIGHT_INDENT;
	        userAgentSpan.style.fontSize = convertToString(fontSize);
	        userAgentSpan.style.lineHeight = convertToString(lineHeight);
	        userAgentSpan.style.maxHeight = convertToString(2 * lineHeight);
	        statusSpan.style.fontSize = convertToString(fontSize);
	        statusSpan.style.lineHeight = convertToString(lineHeight - 1);
	    };
	    StatusIndicator.prototype._watchWindowResize = function () {
	        var _this = this;
	        window.onresize = function () {
	            var oldSize = _this.size;
	            _this._setSize();
	            _this._setFontSize();
	            StatusIndicator._alignContainerVertically();
	            if (oldSize !== _this.size) {
	                if (_this.connected)
	                    _this._setSpinnerGradient();
	                _this._drawSpinner(_this.connected, _this.rotationAngle);
	            }
	        };
	    };
	    //Spinner
	    StatusIndicator.prototype._drawSpinner = function (connected, startAngle) {
	        var _this = this;
	        this._clearCanvas();
	        clearInterval(this.spinnerAnimationInterval);
	        if (connected) {
	            this.spinnerAnimationInterval = window.setInterval(function () {
	                _this._clearCanvas();
	                _this._rotateSpinner();
	                _this._drawCircle(_this.gradient, 240, startAngle);
	            }, ANIMATION_DELAY);
	            this._drawCircle(this.gradient, 240, startAngle);
	        }
	        else
	            this._drawCircle(DISCONNECTED_SPINNER_COLOR, 360, 0);
	    };
	    StatusIndicator.prototype._drawCircle = function (strokeStyle, centralAngle, startAngle) {
	        var radius = Math.max(0, this.spinnerCenter - SPINNER_WIDTH / 2);
	        this.canvasContext.beginPath();
	        this.canvasContext.lineWidth = SPINNER_WIDTH;
	        this.canvasContext.strokeStyle = strokeStyle;
	        this.canvasContext.arc(this.spinnerCenter, this.spinnerCenter, radius, convertToRadian(startAngle), convertToRadian(startAngle + centralAngle), false);
	        this.canvasContext.stroke();
	    };
	    StatusIndicator.prototype._rotateSpinner = function () {
	        this.rotationAngle += ROTATION_ANGLE;
	        this.rotationAngle = this.rotationAngle > 360 ? this.rotationAngle % 360 : this.rotationAngle;
	        this.canvasContext.translate(this.spinnerCenter, this.spinnerCenter);
	        this.canvasContext.rotate(convertToRadian(ROTATION_ANGLE));
	        this.canvasContext.translate(-this.spinnerCenter, -this.spinnerCenter);
	    };
	    StatusIndicator.prototype._getRotatedGradientPoints = function (point) {
	        var changedPoint = moveAxes(point, this.spinnerCenter);
	        changedPoint = rotateAxes(changedPoint, this.rotationAngle);
	        changedPoint = moveAxes(changedPoint, -this.spinnerCenter);
	        return changedPoint;
	    };
	    StatusIndicator.prototype._setSpinnerGradient = function () {
	        var startGradientPoint = {
	            x: Math.round(this.size * START_GRADIENT_POINT_OFFSET.x),
	            y: Math.round(this.size * START_GRADIENT_POINT_OFFSET.y),
	        };
	        var endGradientPoint = {
	            x: Math.round(this.size * END_GRADIENT_POINT_OFFSET.x),
	            y: Math.round(this.size * END_GRADIENT_POINT_OFFSET.y),
	        };
	        if (this.rotationAngle !== 0) {
	            startGradientPoint = this._getRotatedGradientPoints(startGradientPoint);
	            endGradientPoint = this._getRotatedGradientPoints(endGradientPoint);
	        }
	        var gradient = this.canvasContext.createLinearGradient(startGradientPoint.x, startGradientPoint.y, endGradientPoint.x, endGradientPoint.y);
	        gradient.addColorStop(0, CONNECTED_SPINNER_COLOR);
	        gradient.addColorStop(1, SPINNER_GRADIENT_COLOR);
	        this.gradient = gradient;
	    };
	    StatusIndicator.prototype._clearCanvas = function () {
	        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
	    };
	    //API
	    StatusIndicator.prototype.showDisconnection = function () {
	        this.connected = false;
	        StatusIndicator._createStatusMessage(this.connected);
	        this._drawSpinner(this.connected, 0);
	    };
	    return StatusIndicator;
	}());

	var createXHR = function () { return new XMLHttpRequest(); };
	var CHECK_STATUS_DELAY = 1000;
	var IdlePage = /** @class */ (function () {
	    function IdlePage(communicationUrls, options) {
	        this.communicationUrls = communicationUrls;
	        this.options = options;
	        this.statusIndicator = new StatusIndicator();
	        document.title = '[' + document.location.toString() + ']';
	    }
	    IdlePage.prototype._pollStatus = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var urls, command;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        urls = {
	                            statusUrl: this.communicationUrls.statusUrl,
	                            openFileProtocolUrl: this.communicationUrls.openFileProtocolUrl,
	                        };
	                        return [4 /*yield*/, checkStatus(urls, createXHR, { proxyless: this.options.proxyless })];
	                    case 1:
	                        command = (_a.sent()).command;
	                        _a.label = 2;
	                    case 2:
	                        if (!(command.cmd === COMMAND.idle)) return [3 /*break*/, 5];
	                        return [4 /*yield*/, delay(CHECK_STATUS_DELAY)];
	                    case 3:
	                        _a.sent();
	                        return [4 /*yield*/, checkStatus(urls, createXHR, { proxyless: this.options.proxyless })];
	                    case 4:
	                        (command = (_a.sent()).command);
	                        return [3 /*break*/, 2];
	                    case 5: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    IdlePage.prototype.start = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var error_1;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        if (!this.options.retryTestPages) return [3 /*break*/, 2];
	                        return [4 /*yield*/, enableRetryingTestPages()];
	                    case 1:
	                        _a.sent();
	                        _a.label = 2;
	                    case 2:
	                        startHeartbeat(this.communicationUrls.heartbeatUrl, createXHR);
	                        startInitScriptExecution(this.communicationUrls.initScriptUrl, createXHR);
	                        _a.label = 3;
	                    case 3:
	                        _a.trys.push([3, 5, , 6]);
	                        return [4 /*yield*/, this._pollStatus()];
	                    case 4:
	                        _a.sent();
	                        return [3 /*break*/, 6];
	                    case 5:
	                        error_1 = _a.sent();
	                        this.statusIndicator.showDisconnection();
	                        throw error_1;
	                    case 6: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    return IdlePage;
	}());
	window.IdlePage = IdlePage;

}());
