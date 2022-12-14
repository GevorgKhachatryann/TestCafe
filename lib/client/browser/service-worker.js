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

	var __awaiter = ((void 0) && (void 0).__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = pinkie))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = ((void 0) && (void 0).__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	var MAX_RETRY = 10;
	var RETRY_DELAY = 500;
	var PAGE_FETCH_MODE = 'navigate';
	function delay(ms) {
	    return new pinkie(function (r) { return setTimeout(r, ms); });
	}
	function tryGetResponse(request) {
	    return __awaiter(this, void 0, void 0, function () {
	        var error_1;
	        var _a;
	        return __generator(this, function (_b) {
	            switch (_b.label) {
	                case 0:
	                    _b.trys.push([0, 2, , 3]);
	                    _a = {};
	                    return [4 /*yield*/, fetch(request)];
	                case 1: return [2 /*return*/, (_a.response = _b.sent(), _a)];
	                case 2:
	                    error_1 = _b.sent();
	                    return [2 /*return*/, { error: error_1 }];
	                case 3: return [2 /*return*/];
	            }
	        });
	    });
	}
	function getResponse(request) {
	    return __awaiter(this, void 0, void 0, function () {
	        var error, response, i;
	        var _a;
	        return __generator(this, function (_b) {
	            switch (_b.label) {
	                case 0:
	                    error = null;
	                    response = null;
	                    i = 0;
	                    _b.label = 1;
	                case 1:
	                    if (!(i < MAX_RETRY)) return [3 /*break*/, 5];
	                    return [4 /*yield*/, tryGetResponse(request)];
	                case 2:
	                    (_a = _b.sent(), error = _a.error, response = _a.response);
	                    if (!error)
	                        return [2 /*return*/, response];
	                    // eslint-disable-next-line no-console
	                    console.error(error.stack || error);
	                    return [4 /*yield*/, delay(RETRY_DELAY)];
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
	self.addEventListener('fetch', function (event) {
	    if (event.request.mode !== PAGE_FETCH_MODE)
	        return;
	    event.respondWith(getResponse(event.request));
	});
	self.addEventListener('install', function () {
	    self.skipWaiting();
	});

}());
