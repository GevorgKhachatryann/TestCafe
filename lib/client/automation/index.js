window['%hammerhead%'].utils.removeInjectedScript();

// NOTE: We should have the capability to initialize scripts with different contexts.
// This is required for iframes without the src attribute because Hammerhead does not
// inject scripts into such iframes. So, we wrap all scripts in initialization functions.
(function () {
    function initTestCafeAutomation(window, isIFrameWithoutSrc) {
        var document = window.document;

        (function (hammerhead, Promise$e, testCafeCore, testCafeUI) {
    var hammerhead__default = 'default' in hammerhead ? hammerhead['default'] : hammerhead;
    Promise$e = Promise$e && Object.prototype.hasOwnProperty.call(Promise$e, 'default') ? Promise$e['default'] : Promise$e;
    var testCafeCore__default = 'default' in testCafeCore ? testCafeCore['default'] : testCafeCore;
    testCafeUI = testCafeUI && Object.prototype.hasOwnProperty.call(testCafeUI, 'default') ? testCafeUI['default'] : testCafeUI;

    var nativeMethods = hammerhead__default.nativeMethods;
    var MOUSE_EVENT_NAME_RE = /^((mouse\w+)|((dbl)?click)|(contextmenu))$/;
    var DRAG_EVENT_NAME_RE = /^((drag\w*)|(drop))$/;
    var KEY_EVENT_NAME_RE = /^key\w+$/;
    var INPUT_EVENT_NAME_RE = /^(before)?input$/;
    var FOCUS_EVENT_NAME_RE = /^(blur|(focus(in|out)?))$/;
    var POINTER_EVENT_NAME_RE = /^pointer\w+/;
    var DEFAULT_MOUSE_EVENT_DETAIL_PROP_VALUE = {
        click: 1,
        dblclick: 2,
        mousedown: 1,
        mouseup: 1,
    };
    // NOTE: default e.buttons for left button pressed
    var DEFAULT_BUTTONS_PARAMETER = 1;
    var EVENT_CTORS = {
        MouseEvent: 'MouseEvent',
        PointerEvent: 'PointerEvent',
        KeyboardEvent: 'KeyboardEvent',
        InputEvent: 'InputEvent',
        FocusEvent: 'FocusEvent',
    };
    var DispatchEventAutomation = /** @class */ (function () {
        function DispatchEventAutomation(element, eventName, options) {
            this.element = element;
            this.eventName = eventName;
            this.options = options;
        }
        DispatchEventAutomation.prototype.run = function () {
            var _a = this.options, bubbles = _a.bubbles, cancelable = _a.cancelable, detail = _a.detail, view = _a.view, buttons = _a.buttons;
            bubbles = bubbles !== false;
            cancelable = cancelable !== false;
            detail = detail || DEFAULT_MOUSE_EVENT_DETAIL_PROP_VALUE[this.eventName];
            view = window;
            buttons = buttons === void 0 ? DEFAULT_BUTTONS_PARAMETER : buttons;
            // eslint-disable-next-line no-restricted-globals
            Object.assign(this.options, { bubbles: bubbles, cancelable: cancelable, detail: detail, view: view, buttons: buttons });
            var Ctor = DispatchEventAutomation._getEventCtorByEventType(this.eventName, this.options.eventConstructor);
            if (Ctor) {
                var event_1 = new Ctor(this.eventName, this.options);
                this.element.dispatchEvent(event_1);
            }
        };
        DispatchEventAutomation._getEventCtorByEventType = function (eventName, eventConstructor) {
            if (eventConstructor && typeof DispatchEventAutomation._getEventCtorFromWindow(eventConstructor) === 'function') {
                var Ctor = DispatchEventAutomation._getEventCtorFromNativeMethods(eventConstructor);
                if (Ctor && typeof Ctor === 'function')
                    return Ctor;
            }
            if (MOUSE_EVENT_NAME_RE.test(eventName))
                return DispatchEventAutomation._getEventCtorFromNativeMethods(EVENT_CTORS.MouseEvent);
            if (DRAG_EVENT_NAME_RE.test(eventName))
                return DispatchEventAutomation._getEventCtorFromNativeMethods(EVENT_CTORS.MouseEvent);
            if (POINTER_EVENT_NAME_RE.test(eventName))
                return DispatchEventAutomation._getEventCtorFromNativeMethods(EVENT_CTORS.PointerEvent);
            if (KEY_EVENT_NAME_RE.test(eventName))
                return DispatchEventAutomation._getEventCtorFromNativeMethods(EVENT_CTORS.KeyboardEvent);
            if (INPUT_EVENT_NAME_RE.test(eventName))
                return DispatchEventAutomation._getEventCtorFromNativeMethods(EVENT_CTORS.InputEvent);
            if (FOCUS_EVENT_NAME_RE.test(eventName))
                return DispatchEventAutomation._getEventCtorFromNativeMethods(EVENT_CTORS.FocusEvent);
            return DispatchEventAutomation._getEventCtorFromNativeMethods('CustomEvent');
        };
        DispatchEventAutomation._getEventCtorFromNativeMethods = function (eventCtor) {
            var ctor = nativeMethods['Window' + eventCtor] || DispatchEventAutomation._getEventCtorFromWindow(eventCtor);
            return ctor;
        };
        DispatchEventAutomation._getEventCtorFromWindow = function (eventCtor) {
            // @ts-ignore
            return window[eventCtor];
        };
        return DispatchEventAutomation;
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
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise$e))(function (resolve, reject) {
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
    var nativeMethods$1 = hammerhead__default.nativeMethods;
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
    function containsElement(elements, element) {
        if (elements.contains)
            return elements.contains(element);
        return some(elements, function (parent) { return parent.contains(element); });
    }
    function findIframeByWindow(iframeWindow) {
        var iframes = [];
        find(document, '*', function (elem) {
            if (elem.tagName === 'IFRAME')
                iframes.push(elem);
            if (elem.shadowRoot)
                find(elem.shadowRoot, 'iframe', function (iframe) { return iframes.push(iframe); });
        });
        for (var i = 0; i < iframes.length; i++) {
            if (nativeMethods$1.contentWindowGetter.call(iframes[i]) === iframeWindow)
                return iframes[i];
        }
        return null;
    }
    function isShadowElement(element) {
        return element && element.getRootNode && findDocument(element) !== element.getRootNode();
    }
    function isNodeEqual(el1, el2) {
        return el1 === el2;
    }
    function getNodeText(el) {
        return nativeMethods$1.nodeTextContentGetter.call(el);
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
    function getWindowDimensions(window) {
        return new BoundaryValues(0, getWidth(window), getHeight(window), 0);
    }
    function isFixedElement(node) {
        return isElementNode(node) && styleUtils.get(node, 'position') === 'fixed';
    }

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
    function getClientPosition(el) {
        var _a = getOffsetPosition(el), left = _a.left, top = _a.top;
        var clientCoords = offsetToClientCoords({ x: left, y: top });
        clientCoords.x = Math.round(clientCoords.x);
        clientCoords.y = Math.round(clientCoords.y);
        return clientCoords;
    }
    function getWindowPosition() {
        var x = window.screenLeft || window.screenX;
        var y = window.screenTop || window.screenY;
        return new AxisValues(x, y);
    }

    function getAutomationPoint(element, offset) {
        return hammerhead.Promise.resolve(isDocumentElement(element))
            .then(function (isDocEl) {
            if (isDocEl)
                return new AxisValues(0, 0);
            var roundFn = hammerhead.utils.browser.isFirefox ? Math.ceil : Math.round;
            return hammerhead.Promise.resolve(getOffsetPosition(element, roundFn))
                .then(function (elementOffset) { return AxisValues.create(elementOffset); });
        })
            .then(function (point) { return point.add(offset); });
    }

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

    function convertToClient(element, point) {
        return __awaiter(this, void 0, void 0, function () {
            var elementScroll, hasScroll$1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getElementScroll(element)];
                    case 1:
                        elementScroll = _a.sent();
                        hasScroll$1 = hasScroll(element);
                        if (!/html/i.test(element.tagName) && hasScroll$1) {
                            point.x -= elementScroll.left;
                            point.y -= elementScroll.top;
                        }
                        return [2 /*return*/, offsetToClientCoords(point)];
                }
            });
        });
    }

    function getDevicePoint(clientPoint) {
        if (!clientPoint)
            return null;
        var windowPosition = getWindowPosition();
        var screenLeft = windowPosition.x;
        var screenTop = windowPosition.y;
        var x = screenLeft + clientPoint.x;
        var y = screenTop + clientPoint.y;
        return new AxisValues(x, y);
    }

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

    var positionUtils = testCafeCore__default.positionUtils;
    function getElementFromPoint$1(point, underTopShadowUIElement) {
        if (underTopShadowUIElement === void 0) { underTopShadowUIElement = false; }
        return testCafeUI.hide(underTopShadowUIElement)
            .then(function () {
            var topElement = positionUtils.getElementFromPoint(point);
            return testCafeUI.show(underTopShadowUIElement)
                .then(function () { return topElement; });
        });
    }

    // @ts-ignore
    function ensureImageMap(imgElement, areaElement) {
        return hammerhead.Promise.resolve(closest(areaElement, 'map'))
            .then(function (mapElement) {
            return mapElement && mapElement.name === getImgMapName(imgElement) ? areaElement : imgElement;
        });
    }
    function findElementOrNonEmptyChildFromPoint(point, element) {
        return hammerhead.Promise.resolve(getElementFromPoint(point))
            .then(function (topElement) {
            return hammerhead.Promise.resolve(containsElement(element, topElement))
                .then(function (containsEl) { return containsEl && getNodeText(topElement); })
                .then(function (isNonEmptyChild) { return isNonEmptyChild || topElement && isNodeEqual(topElement, element) ? topElement : null; });
        });
    }
    function correctTopElementByExpectedElement(topElement, expectedElement) {
        if (!expectedElement || !topElement || isNodeEqual(topElement, expectedElement))
            return topElement;
        var isTREFElement = getTagName(expectedElement) === 'tref';
        // NOTE: 'document.elementFromPoint' can't find these types of elements
        if (isTREFElement)
            return expectedElement;
        // NOTE: T299665 - Incorrect click automation for images with an associated map element in Firefox
        // All browsers return the <area> element from document.getElementFromPoint, but
        // Firefox returns the <img> element. We should accomplish this for Firefox as well.
        var isImageMapArea = getTagName(expectedElement) === 'area' && isImgElement(topElement);
        if (hammerhead.utils.browser.isFirefox && isImageMapArea)
            return ensureImageMap(topElement, expectedElement);
        // NOTE: try to find a multi-line link by its rectangle (T163678)
        return hammerhead.Promise.resolve(closest(expectedElement, 'a'))
            .then(function (anchor) { return !!anchor; })
            .then(function (isLinkOrChildExpected) {
            if (!isLinkOrChildExpected)
                return false;
            return hammerhead.Promise.resolve(containsElement(expectedElement, topElement))
                .then(function (containsElement) { return containsElement && getNodeText(topElement); })
                .then(function (isTopElementChildOfLink) { return !isTopElementChildOfLink && getNodeText(expectedElement); });
        })
            .then(function (shouldSearchForMultilineLink) {
            if (!shouldSearchForMultilineLink)
                return topElement;
            return hammerhead.Promise.resolve(getClientDimensions(expectedElement))
                .then(function (linkRect) { return findElementOrNonEmptyChildFromPoint({ x: linkRect.right - 1, y: linkRect.top + 1 }, expectedElement)
                .then(function (el) { return el || findElementOrNonEmptyChildFromPoint({ x: linkRect.left + 1, y: linkRect.bottom - 1 }, expectedElement); })
                .then(function (el) { return el || topElement; }); });
        });
    }
    function getElementFromPoint$2(point, win, expectedEl) {
        return getElementFromPoint$1(point)
            .then(function (topElement) {
            // NOTE: when trying to get an element by elementFromPoint in iframe and the target
            // element is under any of shadow-ui elements, you will get null (only in IE).
            // In this case, you should hide a top window's shadow-ui root to obtain an element.
            var resChain = hammerhead.Promise.resolve(topElement);
            if (!topElement && hammerhead.utils.dom.isIframeWindow(win || window) && point.x > 0 && point.y > 0)
                resChain = resChain.then(function () { return getElementFromPoint$1(point, true); });
            return resChain.then(function (element) { return correctTopElementByExpectedElement(element, expectedEl); });
        });
    }

    var ERROR_TYPES = {
        elementIsInvisibleError: 'elementIsInvisibleError',
        foundElementIsNotTarget: 'foundElementIsNotTarget',
    };

    var ACTION_STEP_DELAY_DEFAULT = 10;
    var MAX_MOUSE_ACTION_STEP_DELAY = 400;
    var MAX_KEY_ACTION_STEP_DELAY = 200;
    // We use an exponential function to calculate the cursor
    // speed according to general test speed
    // cursorSpeed = (maxSpeed * k) ^ speed / k
    var MAX_CURSOR_SPEED = 100; // pixels/ms
    var MAX_DRAGGING_SPEED = 4; // pixels/ms
    var CURSOR_FACTOR = 4;
    var AutomationSettings = /** @class */ (function () {
        function AutomationSettings(speed) {
            this._speedFactor = speed || 1;
        }
        Object.defineProperty(AutomationSettings.prototype, "mouseActionStepDelay", {
            get: function () {
                return this._speedFactor === 1 ? ACTION_STEP_DELAY_DEFAULT : (1 - this._speedFactor) * MAX_MOUSE_ACTION_STEP_DELAY;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AutomationSettings.prototype, "keyActionStepDelay", {
            get: function () {
                return this._speedFactor === 1 ? ACTION_STEP_DELAY_DEFAULT : (1 - this._speedFactor) * MAX_KEY_ACTION_STEP_DELAY;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AutomationSettings.prototype, "cursorSpeed", {
            get: function () {
                return Math.pow(MAX_CURSOR_SPEED * CURSOR_FACTOR, this._speedFactor) / CURSOR_FACTOR;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AutomationSettings.prototype, "draggingSpeed", {
            get: function () {
                return Math.pow(MAX_DRAGGING_SPEED * CURSOR_FACTOR, this._speedFactor) / CURSOR_FACTOR;
            },
            enumerable: false,
            configurable: true
        });
        return AutomationSettings;
    }());

    var Promise = hammerhead__default.Promise;
    var nativeMethods$2 = hammerhead__default.nativeMethods;
    function delay (ms) {
        return new Promise(function (resolve) { return nativeMethods$2.setTimeout.call(window, resolve, ms); });
    }

    function nextTick() {
        return delay(0);
    }

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

    var lastHoveredElement = null;
    var lastHoveredElementHolder = {
        get: function () {
            return lastHoveredElement;
        },
        set: function (element) {
            lastHoveredElement = element;
        },
    };

    var Promise$1 = hammerhead__default.Promise;
    var nativeMethods$3 = hammerhead__default.nativeMethods;
    var listeners = hammerhead__default.eventSandbox.listeners;
    var browserUtils$1 = hammerhead__default.utils.browser;
    // Imported form the hammerhead
    var BUTTON = hammerhead__default.utils.event.BUTTON;
    var BUTTONS_PARAMETER = hammerhead__default.utils.event.BUTTONS_PARAMETER;
    var DOM_EVENTS = hammerhead__default.utils.event.DOM_EVENTS;
    var WHICH_PARAMETER = hammerhead__default.utils.event.WHICH_PARAMETER;
    var preventDefault = hammerhead__default.utils.event.preventDefault;

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

    function isIframeWindow(window) {
        return window.top !== window;
    }

    var Promise$2 = hammerhead__default.Promise;
    var messageSandbox = hammerhead__default.eventSandbox.message;
    function sendRequestToFrame(msg, responseCmd, receiverWindow) {
        return new Promise$2(function (resolve) {
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

    var EventEmitter$1 = EventEmitter;

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

    var browserUtils$2 = hammerhead__default.utils.browser;
    var MoveEventSequenceBase = /** @class */ (function () {
        function MoveEventSequenceBase(_a) {
            var moveEvent = _a.moveEvent;
            this.dragAndDropMode = false;
            this.dropAllowed = false;
            this.moveEvent = moveEvent;
        }
        MoveEventSequenceBase.prototype.setup = function () {
            this.dragAndDropMode = false;
            this.dropAllowed = false;
        };
        MoveEventSequenceBase.prototype.leaveElement = function ( /* currentElement, prevElement, commonAncestor, options */) {
        };
        MoveEventSequenceBase.prototype.move = function ( /* element, options */) {
        };
        MoveEventSequenceBase.prototype.enterElement = function ( /* currentElement, prevElement, commonAncestor, options */) {
        };
        MoveEventSequenceBase.prototype.dragAndDrop = function ( /* dragElement, currentElement, prevElement, options, dragDataStore */) {
        };
        MoveEventSequenceBase.prototype.teardown = function ( /* currentElement, eventOptions, prevElement */) {
        };
        MoveEventSequenceBase.prototype.run = function (currentElement, prevElement, options, dragElement, dragDataStore) {
            // NOTE: if last hovered element was in an iframe that has been removed, IE
            // raises an exception when we try to compare it with the current element
            var prevElementInDocument = prevElement && testCafeCore.domUtils.isElementInDocument(prevElement);
            var prevElementInRemovedIframe = prevElement && testCafeCore.domUtils.isElementInIframe(prevElement) &&
                !testCafeCore.domUtils.getIframeByElement(prevElement);
            if (!prevElementInDocument || prevElementInRemovedIframe)
                prevElement = null;
            var elementChanged = currentElement !== prevElement;
            var commonAncestor = elementChanged ? testCafeCore.domUtils.getCommonAncestor(currentElement, prevElement) : null;
            this.setup();
            if (elementChanged && !!prevElement)
                this.leaveElement(currentElement, prevElement, commonAncestor, options);
            if (browserUtils$2.isIE)
                this.move(currentElement, options);
            if (elementChanged && testCafeCore.domUtils.isElementInDocument(currentElement))
                this.enterElement(currentElement, prevElement, commonAncestor, options);
            if (!browserUtils$2.isIE)
                this.move(currentElement, options);
            this.dragAndDrop(dragElement, currentElement, prevElement, options, dragDataStore);
            this.teardown(currentElement, options, prevElement);
            var dragAndDropMode = this.dragAndDropMode;
            var dropAllowed = this.dropAllowed;
            this.dragAndDropMode = false;
            this.dropAllowed = false;
            return { dragAndDropMode: dragAndDropMode, dropAllowed: dropAllowed };
        };
        return MoveEventSequenceBase;
    }());

    var eventSimulator = hammerhead__default.eventSandbox.eventSimulator;
    var extend = hammerhead__default.utils.extend;
    var nativeMethods$4 = hammerhead__default.nativeMethods;
    var MoveBehaviour = /** @class */ (function () {
        function MoveBehaviour() {
        }
        MoveBehaviour.leaveElement = function (currentElement, prevElement, commonAncestor, options) {
            eventSimulator.mouseout(prevElement, extend({ relatedTarget: currentElement }, options));
            var currentParent = prevElement;
            while (currentParent && currentParent !== commonAncestor) {
                eventSimulator.mouseleave(currentParent, extend({ relatedTarget: currentElement }, options));
                currentParent = nativeMethods$4.nodeParentNodeGetter.call(currentParent);
            }
        };
        MoveBehaviour.enterElement = function (currentElement, prevElement, commonAncestor, options) {
            eventSimulator.mouseover(currentElement, extend({ relatedTarget: prevElement }, options));
            var currentParent = currentElement;
            var mouseenterElements = [];
            while (currentParent && currentParent !== commonAncestor) {
                mouseenterElements.push(currentParent);
                currentParent = testCafeCore.domUtils.getParentExceptShadowRoot(currentParent);
            }
            for (var i = mouseenterElements.length - 1; i > -1; i--)
                eventSimulator.mouseenter(mouseenterElements[i], extend({ relatedTarget: prevElement }, options));
        };
        MoveBehaviour.move = function (moveEvent, element, options) {
            eventSimulator[moveEvent](element, options);
        };
        return MoveBehaviour;
    }());
    var DragAndDropBehavior = /** @class */ (function () {
        function DragAndDropBehavior() {
        }
        DragAndDropBehavior.dragAndDrop = function (dragElement, currentElement, prevElement, options) {
            eventSimulator.drag(dragElement, options);
            var currentElementChanged = currentElement !== prevElement;
            if (currentElementChanged) {
                if (testCafeCore.domUtils.isElementInDocument(currentElement)) {
                    options.relatedTarget = prevElement;
                    eventSimulator.dragenter(currentElement, options);
                }
                if (prevElement) {
                    options.relatedTarget = currentElement;
                    eventSimulator.dragleave(prevElement, options);
                }
            }
            return !eventSimulator.dragover(currentElement, options);
        };
        return DragAndDropBehavior;
    }());

    var eventSimulator$1 = hammerhead__default.eventSandbox.eventSimulator;
    var TOUCH_MOVE_EVENT_NAME = 'touchmove';
    var MoveEventSequence = /** @class */ (function (_super) {
        __extends(MoveEventSequence, _super);
        function MoveEventSequence(options) {
            var _this = _super.call(this, options) || this;
            _this.holdLeftButton = options.holdLeftButton;
            return _this;
        }
        MoveEventSequence.prototype.leaveElement = function (currentElement, prevElement, commonAncestor, options) {
            MoveBehaviour.leaveElement(currentElement, prevElement, commonAncestor, options);
        };
        MoveEventSequence.prototype.enterElement = function (currentElement, prevElement, commonAncestor, options) {
            MoveBehaviour.enterElement(currentElement, prevElement, commonAncestor, options);
        };
        MoveEventSequence.prototype.move = function (element, options) {
            if (this._needEmulateMoveEvent())
                MoveBehaviour.move(this.moveEvent, element, options);
        };
        MoveEventSequence.prototype.teardown = function (currentElement, eventOptions, prevElement) {
            // NOTE: we need to add an extra 'mousemove' if the element was changed because sometimes
            // the client script requires several 'mousemove' events for an element (T246904)
            if (this._needEmulateMoveEvent() && testCafeCore.domUtils.isElementInDocument(currentElement) && currentElement !== prevElement)
                eventSimulator$1[this.moveEvent](currentElement, eventOptions);
        };
        MoveEventSequence.prototype._needEmulateMoveEvent = function () {
            return this.moveEvent !== TOUCH_MOVE_EVENT_NAME || this.holdLeftButton;
        };
        return MoveEventSequence;
    }(MoveEventSequenceBase));

    var DragAndDropMoveEventSequence = /** @class */ (function (_super) {
        __extends(DragAndDropMoveEventSequence, _super);
        function DragAndDropMoveEventSequence() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DragAndDropMoveEventSequence.prototype.setup = function () {
            _super.prototype.setup.call(this);
            this.dragAndDropMode = true;
        };
        DragAndDropMoveEventSequence.prototype.dragAndDrop = function (dragElement, currentElement, prevElement, options) {
            this.dropAllowed = DragAndDropBehavior.dragAndDrop(dragElement, currentElement, prevElement, options);
        };
        return DragAndDropMoveEventSequence;
    }(MoveEventSequenceBase));

    var eventSimulator$2 = hammerhead__default.eventSandbox.eventSimulator;
    var DragAndDropFirstMoveEventSequence = /** @class */ (function (_super) {
        __extends(DragAndDropFirstMoveEventSequence, _super);
        function DragAndDropFirstMoveEventSequence() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DragAndDropFirstMoveEventSequence.prototype.setup = function () {
            _super.prototype.setup.call(this);
            this.dragAndDropMode = true;
        };
        DragAndDropFirstMoveEventSequence.prototype.leaveElement = function (currentElement, prevElement, commonAncestor, options) {
            MoveBehaviour.leaveElement(currentElement, prevElement, commonAncestor, options);
        };
        DragAndDropFirstMoveEventSequence.prototype.move = function (element, option) {
            MoveBehaviour.move(this.moveEvent, element, option);
        };
        DragAndDropFirstMoveEventSequence.prototype.enterElement = function (currentElement, prevElement, commonAncestor, options) {
            MoveBehaviour.enterElement(currentElement, prevElement, commonAncestor, options);
        };
        DragAndDropFirstMoveEventSequence.prototype.dragAndDrop = function (dragElement, currentElement, prevElement, options, dragDataStore) {
            var dragAllowed = eventSimulator$2.dragstart(dragElement, options);
            dragDataStore.setReadOnlyMode();
            if (!dragAllowed) {
                this.dragAndDropMode = false;
                return;
            }
            this.dropAllowed = DragAndDropBehavior.dragAndDrop(dragElement, currentElement, prevElement, options);
        };
        DragAndDropFirstMoveEventSequence.prototype.run = function (currentElement, prevElement, options, dragElement, dragDataStore) {
            return _super.prototype.run.call(this, currentElement, null, options, dragElement, dragDataStore);
        };
        return DragAndDropFirstMoveEventSequence;
    }(MoveEventSequenceBase));

    function createEventSequence(dragAndDropEnabled, firstMovingStepOccured, options) {
        if (!dragAndDropEnabled)
            return new MoveEventSequence(options);
        if (firstMovingStepOccured)
            return new DragAndDropMoveEventSequence(options);
        return new DragAndDropFirstMoveEventSequence(options);
    }

    var MOVE_REQUEST_CMD = 'automation|move|request';
    var MOVE_RESPONSE_CMD = 'automation|move|response';
    var MoveAutomation = /** @class */ (function () {
        function MoveAutomation(el, offset, moveOptions, win, cursor) {
            this.touchMode = hammerhead.utils.featureDetection.isTouchDevice;
            this.moveEvent = this.touchMode ? 'touchmove' : 'mousemove';
            this.automationSettings = new AutomationSettings(moveOptions.speed);
            this.cursorSpeed = this._getCursorSpeed();
            this.element = el;
            this.window = win;
            this.offset = offset;
            this.cursor = cursor;
            this.minMovingTime = moveOptions.minMovingTime || 0;
            this.modifiers = moveOptions.modifiers || {};
            this.skipScrolling = moveOptions.skipScrolling;
            this.skipDefaultDragBehavior = moveOptions.skipDefaultDragBehavior;
            this.speed = moveOptions.speed;
            this.firstMovingStepOccured = false;
        }
        MoveAutomation.create = function (el, moveOptions, win, cursor) {
            return __awaiter(this, void 0, hammerhead.Promise, function () {
                var _a, element, offset;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, MoveAutomation.getTarget(el, win, new AxisValues(moveOptions.offsetX, moveOptions.offsetY))];
                        case 1:
                            _a = _b.sent(), element = _a.element, offset = _a.offset;
                            return [2 /*return*/, new MoveAutomation(element, offset, moveOptions, win, cursor)];
                    }
                });
            });
        };
        MoveAutomation.getTarget = function (element, window, offset) {
            // NOTE: if the target point (considering offsets) is out of
            // the element change the target element to the document element
            return hammerhead.Promise.resolve(containsOffset(element, offset.x, offset.y))
                .then(function (containsOffset) {
                if (!containsOffset) {
                    return hammerhead.Promise.all([
                        getAutomationPoint(element, offset),
                        getDocumentElement(window),
                    ])
                        .then(function (_a) {
                        var point = _a[0], docEl = _a[1];
                        return ({ element: docEl, offset: point });
                    });
                }
                return { element: element, offset: offset };
            });
        };
        MoveAutomation.prototype._getCursorSpeed = function () {
            return this.automationSettings.cursorSpeed;
        };
        MoveAutomation.prototype._getTargetClientPoint = function () {
            var _this = this;
            return hammerhead.Promise.resolve(getElementScroll(this.element))
                .then(function (scroll) {
                if (isHtmlElement(_this.element)) {
                    return AxisValues.create(_this.offset)
                        .sub(AxisValues.create(scroll))
                        .round(Math.round);
                }
                return hammerhead.Promise.resolve(getClientPosition(_this.element))
                    .then(function (clientPosition) {
                    var isDocumentBody = isBodyElement(_this.element);
                    // @ts-ignore
                    var clientPoint = AxisValues.create(clientPosition).add(_this.offset);
                    if (!isDocumentBody)
                        clientPoint.sub(AxisValues.create(scroll));
                    return clientPoint.round(Math.floor);
                });
            });
        };
        MoveAutomation.prototype._getEventSequenceOptions = function (currPosition) {
            var button = BUTTONS_PARAMETER.noButton;
            var devicePoint = getDevicePoint(currPosition);
            var eventOptions = {
                clientX: currPosition.x,
                clientY: currPosition.y,
                screenX: devicePoint === null || devicePoint === void 0 ? void 0 : devicePoint.x,
                screenY: devicePoint === null || devicePoint === void 0 ? void 0 : devicePoint.y,
                buttons: button,
                ctrl: this.modifiers.ctrl,
                alt: this.modifiers.alt,
                shift: this.modifiers.shift,
                meta: this.modifiers.meta,
            };
            return { eventOptions: eventOptions, eventSequenceOptions: { moveEvent: this.moveEvent } };
        };
        MoveAutomation.prototype._runEventSequence = function (currentElement, _a) {
            var eventOptions = _a.eventOptions, eventSequenceOptions = _a.eventSequenceOptions;
            var eventSequence = createEventSequence(false, this.firstMovingStepOccured, eventSequenceOptions);
            return eventSequence.run(currentElement, lastHoveredElementHolder.get(), eventOptions, null, null);
        };
        MoveAutomation.prototype._emulateEvents = function (currentElement, currPosition) {
            var options = this._getEventSequenceOptions(currPosition);
            this._runEventSequence(currentElement, options);
            this.firstMovingStepOccured = true;
            lastHoveredElementHolder.set(currentElement);
        };
        MoveAutomation.prototype._movingStep = function (currPosition) {
            var _this = this;
            return this.cursor.move(currPosition)
                .then(function () { return getElementFromPoint$1(_this.cursor.getPosition()); })
                // NOTE: in touch mode, events are simulated for the element for which mousedown was simulated (GH-372)
                .then(function (topElement) {
                var currentElement = _this._getCorrectedTopElement(topElement);
                // NOTE: it can be null in IE
                if (!currentElement)
                    return null;
                return _this._emulateEvents(currentElement, currPosition);
            })
                .then(nextTick);
        };
        MoveAutomation.prototype._getCorrectedTopElement = function (topElement) {
            return topElement;
        };
        MoveAutomation.prototype._move = function (endPoint) {
            var _this = this;
            var startPoint = this.cursor.getPosition();
            var distance = AxisValues.create(endPoint).sub(startPoint);
            var startTime = hammerhead.nativeMethods.dateNow();
            var movingTime = Math.max(Math.max(Math.abs(distance.x), Math.abs(distance.y)) / this.cursorSpeed, this.minMovingTime);
            var currPosition = AxisValues.create(startPoint);
            var isFirstStep = true;
            return whilst(function () { return !currPosition.eql(endPoint); }, function () {
                if (_this._needMoveCursorImmediately())
                    currPosition = AxisValues.create(endPoint);
                else if (isFirstStep) {
                    isFirstStep = false;
                    // NOTE: the mousemove event can't be simulated at the point where the cursor
                    // was located at the start. Therefore, we add a minimal distance 1 px.
                    currPosition.add({
                        x: distance.x > 0 ? 1 : -1,
                        y: distance.y > 0 ? 1 : -1,
                    });
                }
                else {
                    var progress = Math.min((hammerhead.nativeMethods.dateNow() - startTime) / movingTime, 1);
                    currPosition = AxisValues.create(distance).mul(progress).add(startPoint).round(Math.floor);
                }
                return _this._movingStep(currPosition);
            });
        };
        //
        MoveAutomation.prototype._needMoveCursorImmediately = function () {
            return this.touchMode;
        };
        MoveAutomation.prototype._scroll = function () {
            if (this.skipScrolling)
                return hammerhead.Promise.resolve(false);
            var scrollOptions = new ScrollOptions({ offsetX: this.offset.x, offsetY: this.offset.y }, false);
            var scrollAutomation = new ScrollAutomation(this.element, scrollOptions);
            return scrollAutomation.run();
        };
        MoveAutomation.prototype._moveToCurrentFrame = function (endPoint) {
            var _this = this;
            if (this.cursor.isActive(this.window))
                return hammerhead.Promise.resolve();
            var _a = this.cursor.getPosition(), x = _a.x, y = _a.y;
            var activeWindow = this.cursor.getActiveWindow(this.window);
            var iframe = null;
            var iframeUnderCursor = null;
            var msg = {
                cmd: MOVE_REQUEST_CMD,
                startX: x,
                startY: y,
                endX: endPoint.x,
                endY: endPoint.y,
                modifiers: this.modifiers,
                speed: this.speed,
            };
            return hammerhead.Promise.resolve()
                .then(function () {
                if (activeWindow.parent === _this.window) {
                    return hammerhead.Promise.resolve(findIframeByWindow(activeWindow))
                        .then(function (frame) {
                        iframe = frame;
                        return hammerhead.Promise.resolve(getIframeClientCoordinates(frame))
                            .then(function (rect) {
                            msg.left = rect.left;
                            msg.top = rect.top;
                            msg.right = rect.right;
                            msg.bottom = rect.bottom;
                        });
                    });
                }
                return void 0;
            })
                .then(function () {
                return getElementFromPoint$1(_this.cursor.getPosition());
            })
                .then(function (topElement) {
                iframeUnderCursor = topElement === iframe;
                if (activeWindow.parent === _this.window)
                    msg.iframeUnderCursor = iframeUnderCursor;
                return sendRequestToFrame(msg, MOVE_RESPONSE_CMD, activeWindow);
            })
                .then(function (message) {
                _this.cursor.setActiveWindow(_this.window);
                if (iframeUnderCursor || hammerhead.utils.dom.isIframeWindow(_this.window))
                    return _this.cursor.move(message);
                return void 0;
            });
        };
        MoveAutomation.prototype.run = function () {
            var _this = this;
            return this._scroll()
                .then(function () { return hammerhead.Promise.all([
                _this._getTargetClientPoint(),
                getWindowDimensions(_this.window),
            ]); })
                .then(function (_a) {
                var endPoint = _a[0], boundary = _a[1];
                if (!boundary.contains(endPoint))
                    return void 0;
                return _this._moveToCurrentFrame(endPoint)
                    .then(function () { return _this._move(endPoint); });
            });
        };
        return MoveAutomation;
    }());

    var Cursor = /** @class */ (function () {
        function Cursor(activeWin, ui) {
            this._ui = ui;
            // NOTE: the default position should be outside the page (GH-794)
            this._x = -1;
            this._y = -1;
            this._activeWindow = activeWin;
        }
        Cursor.prototype._ensureActiveWindow = function (win) {
            if (this._activeWindow === win || this._activeWindow === win.parent)
                return;
            if (this._activeWindow.parent !== win)
                this._activeWindow = win;
        };
        Cursor.prototype.isActive = function (currWin) {
            this._ensureActiveWindow(currWin);
            return this._activeWindow === currWin;
        };
        Cursor.prototype.setActiveWindow = function (win) {
            this._activeWindow = win;
        };
        Cursor.prototype.getActiveWindow = function (currWin) {
            this._ensureActiveWindow(currWin);
            return this._activeWindow;
        };
        Cursor.prototype.getPosition = function () {
            return new AxisValues(this._x, this._y);
        };
        Cursor.prototype.move = function (point) {
            this._x = point.x;
            this._y = point.y;
            return this._ui.move(point);
        };
        Cursor.prototype.hide = function () {
            if (this._ui.hide)
                return this._ui.hide();
            return hammerhead.Promise.resolve();
        };
        Cursor.prototype.show = function () {
            if (this._ui.show)
                return this._ui.show();
            return hammerhead.Promise.resolve();
        };
        Cursor.prototype.leftButtonDown = function () {
            return this._ui.leftButtonDown();
        };
        Cursor.prototype.rightButtonDown = function () {
            return this._ui.rightButtonDown();
        };
        Cursor.prototype.buttonUp = function () {
            return this._ui.buttonUp();
        };
        return Cursor;
    }());

    var cursorUI = !isIframeWindow(window) ? testCafeUI.cursorUI : testCafeUI.iframeCursorUI;
    var cursor = new Cursor(window.top, cursorUI);

    var htmlUtils = hammerhead__default.utils.html;
    var nativeMethods$5 = hammerhead__default.nativeMethods;
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
        var emptyElement = nativeMethods$5.cloneNode.call(element);
        var outerHtml = htmlUtils.cleanUpHtml(nativeMethods$5.elementOuterHTMLGetter.call(emptyElement));
        var text = truncateString(nativeMethods$5.nodeTextContentGetter.call(element), MAX_TEXT_CONTENT_LENGTH);
        var children = nativeMethods$5.elementChildrenGetter.call(element);
        if (nativeMethods$5.htmlCollectionLengthGetter.call(children) > 0)
            return outerHtml.replace('></', '>...</');
        if (text)
            return outerHtml.replace('></', ">".concat(text, "</"));
        return outerHtml;
    }

    var positionUtils$1 = testCafeCore__default.positionUtils, domUtils = testCafeCore__default.domUtils, eventUtils = testCafeCore__default.eventUtils;
    function ensureMouseEventAfterScroll(currentElement, element, wasScrolled) {
        return __awaiter(this, void 0, hammerhead__default.Promise, function () {
            var elementUnderCursorContainsTarget, prevElement, commonAncestor, clientPosition, devicePoint, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elementUnderCursorContainsTarget = !!currentElement && domUtils.contains(element, currentElement);
                        if (!elementUnderCursorContainsTarget || !wasScrolled)
                            return [2 /*return*/];
                        prevElement = lastHoveredElementHolder.get();
                        commonAncestor = domUtils.getCommonAncestor(currentElement, prevElement);
                        return [4 /*yield*/, positionUtils$1.getClientPosition(currentElement)];
                    case 1:
                        clientPosition = _a.sent();
                        return [4 /*yield*/, getDevicePoint(clientPosition)];
                    case 2:
                        devicePoint = _a.sent();
                        if (!devicePoint)
                            return [2 /*return*/];
                        options = {
                            clientX: clientPosition.x,
                            clientY: clientPosition.y,
                            screenX: devicePoint.x,
                            screenY: devicePoint.y,
                            ctrl: false,
                            alt: false,
                            shift: false,
                            meta: false,
                            buttons: eventUtils.BUTTONS_PARAMETER.leftButton,
                        };
                        MoveBehaviour.leaveElement(currentElement, prevElement, commonAncestor, options);
                        MoveBehaviour.enterElement(currentElement, prevElement, commonAncestor, options);
                        lastHoveredElementHolder.set(currentElement);
                        return [2 /*return*/];
                }
            });
        });
    }

    var WARNING_TYPES = {
        elementOverlapped: 'elementOverlapped',
    };

    var ElementState = /** @class */ (function () {
        function ElementState(_a) {
            var _b = _a.element, element = _b === void 0 ? null : _b, _c = _a.clientPoint, clientPoint = _c === void 0 ? null : _c, _d = _a.screenPoint, screenPoint = _d === void 0 ? null : _d, _e = _a.isTarget, isTarget = _e === void 0 ? false : _e, _f = _a.inMoving, inMoving = _f === void 0 ? false : _f, _g = _a.devicePoint, devicePoint = _g === void 0 ? null : _g;
            this.element = element;
            this.clientPoint = clientPoint;
            this.screenPoint = screenPoint;
            this.devicePoint = devicePoint;
            this.isTarget = isTarget;
            this.inMoving = inMoving;
        }
        ElementState.create = function (_a) {
            var element = _a.element, clientPoint = _a.clientPoint, screenPoint = _a.screenPoint, isTarget = _a.isTarget, inMoving = _a.inMoving;
            return __awaiter(this, void 0, void 0, function () {
                var devicePoint, state;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            devicePoint = null;
                            if (!clientPoint) return [3 /*break*/, 2];
                            return [4 /*yield*/, getDevicePoint(clientPoint)];
                        case 1:
                            devicePoint = _b.sent();
                            _b.label = 2;
                        case 2:
                            state = new ElementState({ element: element, clientPoint: clientPoint, screenPoint: screenPoint, isTarget: isTarget, inMoving: inMoving, devicePoint: devicePoint });
                            return [2 /*return*/, state];
                    }
                });
            });
        };
        return ElementState;
    }());
    var VisibleElementAutomation = /** @class */ (function (_super) {
        __extends(VisibleElementAutomation, _super);
        function VisibleElementAutomation(element, offsetOptions, win, cursor) {
            var _this = _super.call(this) || this;
            _this.TARGET_ELEMENT_FOUND_EVENT = 'automation|target-element-found-event';
            _this.WARNING_EVENT = 'automation|warning-event';
            _this.element = element;
            _this.options = offsetOptions;
            _this.automationSettings = new AutomationSettings(offsetOptions.speed || 1);
            _this.window = win;
            _this.cursor = cursor;
            // NOTE: only for legacy API
            _this._ensureWindowAndCursorForLegacyTests(_this);
            return _this;
        }
        VisibleElementAutomation.prototype._ensureWindowAndCursorForLegacyTests = function (automation) {
            automation.window = automation.window || window; // eslint-disable-line no-undef
            automation.cursor = cursor;
        };
        VisibleElementAutomation.prototype._getElementForEvent = function (eventArgs) {
            return __awaiter(this, void 0, void 0, function () {
                var expectedElement;
                return __generator(this, function (_a) {
                    expectedElement = containsOffset(this.element, this.options.offsetX, this.options.offsetY) ? this.element : null;
                    return [2 /*return*/, getElementFromPoint$2(eventArgs.point, this.window, expectedElement)];
                });
            });
        };
        VisibleElementAutomation.prototype._moveToElement = function () {
            return __awaiter(this, void 0, void 0, function () {
                var moveOptions, moveAutomation;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            moveOptions = new MoveOptions(hammerhead.utils.extend({ skipScrolling: true }, this.options), false);
                            return [4 /*yield*/, MoveAutomation.create(this.element, moveOptions, this.window, this.cursor)];
                        case 1:
                            moveAutomation = _a.sent();
                            return [2 /*return*/, moveAutomation
                                    .run()
                                    .then(function () { return delay(_this.automationSettings.mouseActionStepDelay); })];
                    }
                });
            });
        };
        VisibleElementAutomation.prototype._scrollToElement = function () {
            var _this = this;
            var wasScrolled = false;
            var scrollOptions = new ScrollOptions(this.options, false);
            var scrollAutomation = new ScrollAutomation(this.element, scrollOptions);
            return scrollAutomation.run()
                .then(function (scrollWasPerformed) {
                wasScrolled = !!scrollWasPerformed;
                return delay(_this.automationSettings.mouseActionStepDelay);
            })
                .then(function () { return getElementFromPoint$2(_this.cursor.getPosition(), _this.window); })
                .then(function (currentElement) {
                return ensureMouseEventAfterScroll(currentElement, _this.element, wasScrolled);
            })
                .then(function () {
                return wasScrolled;
            });
        };
        VisibleElementAutomation.prototype._getElementOffset = function () {
            var defaultOffsets = getOffsetOptions(this.element);
            var _a = this.options, offsetX = _a.offsetX, offsetY = _a.offsetY;
            offsetX = offsetX || offsetX === 0 ? offsetX : defaultOffsets.offsetX;
            offsetY = offsetY || offsetY === 0 ? offsetY : defaultOffsets.offsetY;
            return { offsetX: offsetX, offsetY: offsetY };
        };
        VisibleElementAutomation.prototype._wrapAction = function (action) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, x, y, screenPointBeforeAction, clientPositionBeforeAction, screenPointAfterAction, clientPositionAfterAction, clientPoint, expectedElement, element, isTarget, offsetPositionChanged, clientPositionChanged, targetElementIsMoving;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this._getElementOffset(), x = _a.offsetX, y = _a.offsetY;
                            return [4 /*yield*/, getAutomationPoint(this.element, { x: x, y: y })];
                        case 1:
                            screenPointBeforeAction = _b.sent();
                            return [4 /*yield*/, getClientPosition(this.element)];
                        case 2:
                            clientPositionBeforeAction = _b.sent();
                            return [4 /*yield*/, action()];
                        case 3:
                            _b.sent();
                            return [4 /*yield*/, getAutomationPoint(this.element, { x: x, y: y })];
                        case 4:
                            screenPointAfterAction = _b.sent();
                            return [4 /*yield*/, getClientPosition(this.element)];
                        case 5:
                            clientPositionAfterAction = _b.sent();
                            return [4 /*yield*/, convertToClient(this.element, screenPointAfterAction)];
                        case 6:
                            clientPoint = _b.sent();
                            return [4 /*yield*/, containsOffset(this.element, x, y)];
                        case 7:
                            expectedElement = (_b.sent()) ? this.element : null;
                            return [4 /*yield*/, getElementFromPoint$2(clientPoint, this.window, expectedElement)];
                        case 8:
                            element = _b.sent();
                            if (!element) {
                                return [2 /*return*/, ElementState.create({
                                        element: null,
                                        clientPoint: null,
                                        screenPoint: null,
                                        isTarget: false,
                                        inMoving: false,
                                    })];
                            }
                            isTarget = !expectedElement || element === expectedElement || element === this.element;
                            if (!!isTarget) return [3 /*break*/, 10];
                            return [4 /*yield*/, this._contains(this.element, element)];
                        case 9:
                            // NOTE: perform an operation with searching in dom only if necessary
                            isTarget = _b.sent();
                            _b.label = 10;
                        case 10:
                            offsetPositionChanged = screenPointBeforeAction.x !== screenPointAfterAction.x ||
                                screenPointBeforeAction.y !== screenPointAfterAction.y;
                            clientPositionChanged = clientPositionBeforeAction.x !== clientPositionAfterAction.x ||
                                clientPositionBeforeAction.y !== clientPositionAfterAction.y;
                            targetElementIsMoving = offsetPositionChanged && clientPositionChanged;
                            return [2 /*return*/, ElementState.create({
                                    element: element,
                                    clientPoint: clientPoint,
                                    screenPoint: screenPointAfterAction,
                                    isTarget: isTarget,
                                    inMoving: targetElementIsMoving,
                                })];
                    }
                });
            });
        };
        VisibleElementAutomation._checkElementState = function (state, useStrictElementCheck) {
            if (!state.element)
                throw new Error(ERROR_TYPES.elementIsInvisibleError);
            if (useStrictElementCheck && (!state.isTarget || state.inMoving))
                throw new Error(ERROR_TYPES.foundElementIsNotTarget);
            return state;
        };
        VisibleElementAutomation.prototype._ensureElement = function (useStrictElementCheck, skipCheckAfterMoving, skipMoving) {
            var _this = this;
            if (skipCheckAfterMoving === void 0) { skipCheckAfterMoving = false; }
            if (skipMoving === void 0) { skipMoving = false; }
            return this
                ._wrapAction(function () { return _this._scrollToElement(); })
                .then(function (state) { return VisibleElementAutomation._checkElementState(state, useStrictElementCheck); })
                .then(function (state) {
                return skipMoving ? state : _this._wrapAction(function () { return _this._moveToElement(); });
            })
                .then(function (state) {
                if (!skipCheckAfterMoving)
                    VisibleElementAutomation._checkElementState(state, useStrictElementCheck);
                return state;
            })
                .then(function (state) {
                var element = state === null || state === void 0 ? void 0 : state.element;
                _this.emit(_this.TARGET_ELEMENT_FOUND_EVENT, { element: element || null });
                if (!useStrictElementCheck && element && !state.isTarget) {
                    var expectedElementStr = stringifyElement(_this.element);
                    var actualElementStr = stringifyElement(element);
                    _this.emit(_this.WARNING_EVENT, {
                        type: WARNING_TYPES.elementOverlapped,
                        args: [expectedElementStr, actualElementStr],
                    });
                }
                return {
                    element: (state === null || state === void 0 ? void 0 : state.element) || null,
                    clientPoint: (state === null || state === void 0 ? void 0 : state.clientPoint) || null,
                    screenPoint: (state === null || state === void 0 ? void 0 : state.screenPoint) || null,
                    devicePoint: (state === null || state === void 0 ? void 0 : state.devicePoint) || null,
                };
            });
        };
        VisibleElementAutomation.prototype._contains = function (parent, child) {
            return __awaiter(this, void 0, void 0, function () {
                var parents, _i, parents_1, el;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getParents(child)];
                        case 1:
                            parents = _a.sent();
                            for (_i = 0, parents_1 = parents; _i < parents_1.length; _i++) {
                                el = parents_1[_i];
                                if (el === parent)
                                    return [2 /*return*/, true];
                            }
                            return [2 /*return*/, false];
                    }
                });
            });
        };
        return VisibleElementAutomation;
    }(EventEmitter));

    var Promise$3 = hammerhead__default.Promise;
    function calculatePosition(el, position) {
        var centerX = Math.floor(el.scrollWidth / 2 - el.clientWidth / 2);
        var centerY = Math.floor(el.scrollHeight / 2 - el.clientHeight / 2);
        var positions = {
            'top': [centerX, 0],
            'right': [el.scrollWidth, centerY],
            'bottom': [centerX, el.scrollHeight],
            'left': [0, centerY],
            'topRight': [el.scrollWidth, 0],
            'topLeft': [0, 0],
            'bottomRight': [el.scrollWidth, el.scrollHeight],
            'bottomLeft': [0, el.scrollHeight],
            'center': [centerX, centerY],
        };
        return positions[position];
    }
    var SetScrollAutomation = /** @class */ (function (_super) {
        __extends(SetScrollAutomation, _super);
        function SetScrollAutomation(element, _a, offsetOptions) {
            var _b;
            var x = _a.x, y = _a.y, position = _a.position, byX = _a.byX, byY = _a.byY;
            var _this = _super.call(this, element, offsetOptions, window, cursor) || this;
            if (position)
                _b = calculatePosition(element, position), x = _b[0], y = _b[1];
            _this.scrollLeft = typeof x === 'number' ? x : element.scrollLeft;
            _this.scrollTop = typeof y === 'number' ? y : element.scrollTop;
            if (byX)
                _this.scrollLeft += byX;
            if (byY)
                _this.scrollTop += byY;
            return _this;
        }
        SetScrollAutomation.prototype.run = function (useStrictElementCheck) {
            var _this = this;
            var promise = Promise$3.resolve();
            if (this.element !== document.scrollingElement && this.element !== document.documentElement)
                promise = this._ensureElement(useStrictElementCheck, true, true);
            return promise
                .then(function () {
                _this.element.scrollLeft = _this.scrollLeft;
                _this.element.scrollTop = _this.scrollTop;
            });
        };
        return SetScrollAutomation;
    }(VisibleElementAutomation));

    var ScrollIntoViewAutomation = /** @class */ (function (_super) {
        __extends(ScrollIntoViewAutomation, _super);
        function ScrollIntoViewAutomation(element, offsetOptions) {
            return _super.call(this, element, offsetOptions, window, cursor) || this;
        }
        ScrollIntoViewAutomation.prototype.run = function (useStrictElementCheck) {
            return this._ensureElement(useStrictElementCheck, true, true);
        };
        return ScrollIntoViewAutomation;
    }(VisibleElementAutomation));

    var Promise$4 = hammerhead__default.Promise;
    var nativeMethods$6 = hammerhead__default.nativeMethods;
    var browserUtils$3 = hammerhead__default.utils.browser;
    var focusBlurSandbox = hammerhead__default.eventSandbox.focusBlur;
    var contentEditable = testCafeCore__default.contentEditable;
    var textSelection = testCafeCore__default.textSelection;
    var domUtils$1 = testCafeCore__default.domUtils;
    var styleUtils$1 = testCafeCore__default.styleUtils;
    var messageSandbox$1 = hammerhead__default.eventSandbox.message;
    var GET_IFRAME_REQUEST_CMD = 'automation|iframe|request';
    var GET_IFRAME_RESPONSE_CMD = 'automation|iframe|response';
    messageSandbox$1.on(messageSandbox$1.SERVICE_MSG_RECEIVED_EVENT, function (e) {
        if (e.message.cmd === GET_IFRAME_REQUEST_CMD) {
            var iframeElement = domUtils$1.findIframeByWindow(e.source);
            focusBlurSandbox.focus(iframeElement, function () {
                messageSandbox$1.sendServiceMsg({ cmd: GET_IFRAME_RESPONSE_CMD }, e.source);
            }, false);
        }
    });
    function setCaretPosition(element, caretPos) {
        var isTextEditable = domUtils$1.isTextEditableElement(element);
        var isContentEditable = domUtils$1.isContentEditableElement(element);
        if (isTextEditable || isContentEditable) {
            if (isContentEditable && isNaN(parseInt(caretPos, 10)))
                textSelection.setCursorToLastVisiblePosition(element);
            else {
                var position = isNaN(parseInt(caretPos, 10)) ? domUtils$1.getElementValue(element).length : caretPos;
                textSelection.select(element, position, position);
            }
        }
        else {
            // NOTE: if focus is called for a non-contentEditable element (like 'img' or 'button') inside
            // a contentEditable parent, we should try to set the right window selection. Generally, we can't
            // set the right window selection object because after the selection setup, the window.getSelection
            // method returns a different object, which depends on the browser.
            var contentEditableParent = contentEditable.findContentEditableParent(element);
            if (contentEditableParent)
                textSelection.setCursorToLastVisiblePosition(contentEditable.findContentEditableParent(contentEditableParent));
        }
    }
    function focusAndSetSelection(element, simulateFocus, caretPos) {
        var _this = this;
        return new Promise$4(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var activeElement, isTextEditable, labelWithForAttr, isElementFocusable, shouldFocusByRelatedElement, isContentEditable, elementForFocus, focusWithSilentMode, focusForMouseEvent, preventScrolling, curDocument, curActiveElement, isActiveElementBody, focusableParent, elementChildOfActiveElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isIframeWindow(window)) return [3 /*break*/, 2];
                        return [4 /*yield*/, sendRequestToFrame({ cmd: GET_IFRAME_REQUEST_CMD }, GET_IFRAME_RESPONSE_CMD, window.parent)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        activeElement = domUtils$1.getActiveElement();
                        isTextEditable = domUtils$1.isTextEditableElement(element);
                        labelWithForAttr = domUtils$1.closest(element, 'label[for]');
                        isElementFocusable = domUtils$1.isElementFocusable(element);
                        shouldFocusByRelatedElement = !isElementFocusable && labelWithForAttr;
                        isContentEditable = domUtils$1.isContentEditableElement(element);
                        elementForFocus = isContentEditable ? contentEditable.findContentEditableParent(element) : element;
                        // NOTE: in WebKit, if selection was never set in an input element, the focus method selects all the
                        // text in this element. So, we should call select before focus to set the caret to the first symbol.
                        if (simulateFocus && browserUtils$3.isWebKit && isTextEditable)
                            textSelection.select(element, 0, 0);
                        // NOTE: we should call focus for the element related with a 'label' that has the 'for' attribute
                        if (shouldFocusByRelatedElement) {
                            if (simulateFocus)
                                focusByLabel(labelWithForAttr);
                            resolve();
                            return [2 /*return*/];
                        }
                        focusWithSilentMode = !simulateFocus;
                        focusForMouseEvent = true;
                        preventScrolling = false;
                        if (!isElementFocusable && !isContentEditable) {
                            curDocument = domUtils$1.findDocument(elementForFocus);
                            curActiveElement = nativeMethods$6.documentActiveElementGetter.call(curDocument);
                            isActiveElementBody = domUtils$1.isBodyElement(curActiveElement);
                            focusableParent = domUtils$1.isBodyElement(elementForFocus) ?
                                elementForFocus : domUtils$1.getFocusableParent(elementForFocus);
                            elementChildOfActiveElement = curActiveElement && !isActiveElementBody &&
                                domUtils$1.containsElement(curActiveElement, elementForFocus);
                            if (elementChildOfActiveElement || isActiveElementBody && domUtils$1.isBodyElement(focusableParent)) {
                                resolve();
                                return [2 /*return*/];
                            }
                            elementForFocus = focusableParent || curDocument.body;
                            preventScrolling = true;
                        }
                        focusBlurSandbox.focus(elementForFocus, function () {
                            // NOTE: if a different element was focused in the focus event handler, we should not set selection
                            if (simulateFocus && !isContentEditable && element !== domUtils$1.getActiveElement()) {
                                resolve();
                                return;
                            }
                            setCaretPosition(element, caretPos);
                            // NOTE: we can't avoid the element being focused because the setSelection method leads to focusing.
                            // So, we just focus the previous active element without handlers if we don't need focus here
                            if (!simulateFocus && domUtils$1.getActiveElement() !== activeElement)
                                focusBlurSandbox.focus(activeElement, resolve, true, true);
                            else
                                resolve();
                        }, focusWithSilentMode, focusForMouseEvent, false, preventScrolling);
                        return [2 /*return*/];
                }
            });
        }); });
    }
    function getElementBoundToLabel(element) {
        var labelWithForAttr = domUtils$1.closest(element, 'label[for]');
        var control = labelWithForAttr && (labelWithForAttr.control || document.getElementById(labelWithForAttr.htmlFor));
        var isControlVisible = control && styleUtils$1.isElementVisible(control);
        return isControlVisible ? control : null;
    }
    function focusByLabel(label) {
        if (domUtils$1.isElementFocusable(label))
            focusBlurSandbox.focus(label, testCafeCore__default.noop, false, true);
        else
            focusByRelatedElement(label);
    }
    function focusByRelatedElement(element) {
        var elementForFocus = getElementBoundToLabel(element);
        if (!elementForFocus || domUtils$1.getActiveElement() === elementForFocus)
            return;
        focusBlurSandbox.focus(elementForFocus, testCafeCore__default.noop, false, true);
    }

    var browserUtils$4 = hammerhead__default.utils.browser;
    var eventSimulator$3 = hammerhead__default.eventSandbox.eventSimulator;
    var listeners$2 = hammerhead__default.eventSandbox.listeners;
    var nativeMethods$7 = hammerhead__default.nativeMethods;
    var domUtils$2 = testCafeCore__default.domUtils;
    var styleUtils$2 = testCafeCore__default.styleUtils;
    var selectElementUI = testCafeUI.selectElement;
    var ElementClickCommand = /** @class */ (function () {
        function ElementClickCommand(eventState, eventArgs) {
            this.eventState = eventState;
            this.eventArgs = eventArgs;
        }
        ElementClickCommand.prototype.run = function () {
            if (this.eventState.clickElement)
                eventSimulator$3.click(this.eventState.clickElement, this.eventArgs.options);
            if (!domUtils$2.isElementFocusable(this.eventArgs.element))
                focusByRelatedElement(this.eventArgs.element);
        };
        return ElementClickCommand;
    }());
    var LabelElementClickCommand = /** @class */ (function (_super) {
        __extends(LabelElementClickCommand, _super);
        function LabelElementClickCommand(eventState, eventArgs) {
            var _this = _super.call(this, eventState, eventArgs) || this;
            _this.targetElement = _this.eventArgs.element;
            _this.input = getElementBoundToLabel(_this.eventArgs.element);
            return _this;
        }
        LabelElementClickCommand.prototype.run = function () {
            var _this = this;
            var focusRaised = false;
            var ensureFocusRaised = function (e) {
                focusRaised = nativeMethods$7.eventTargetGetter.call(e) === _this.input;
            };
            listeners$2.addInternalEventBeforeListener(window, ['focus'], ensureFocusRaised);
            _super.prototype.run.call(this);
            listeners$2.removeInternalEventBeforeListener(window, ['focus'], ensureFocusRaised);
            if (domUtils$2.isElementFocusable(this.targetElement) && !focusRaised)
                this._ensureBoundElementFocusRaised();
        };
        LabelElementClickCommand.prototype._ensureBoundElementFocusRaised = function () {
            eventSimulator$3.focus(this.input);
        };
        return LabelElementClickCommand;
    }(ElementClickCommand));
    var SelectElementClickCommand = /** @class */ (function (_super) {
        __extends(SelectElementClickCommand, _super);
        function SelectElementClickCommand(eventState, eventArgs) {
            return _super.call(this, eventState, eventArgs) || this;
        }
        SelectElementClickCommand.prototype.run = function () {
            _super.prototype.run.call(this);
            this._toggleSelectOptionList();
        };
        SelectElementClickCommand.prototype._toggleSelectOptionList = function () {
            // NOTE: Emulating the click event on the 'select' element doesn't expand the
            // dropdown with options (except chrome), therefore we should emulate it.
            var element = this.eventArgs.element;
            var isSelectWithDropDown = styleUtils$2.getSelectElementSize(element) === 1;
            if (isSelectWithDropDown && this.eventState.simulateDefaultBehavior !== false) {
                if (selectElementUI.isOptionListExpanded(element))
                    selectElementUI.collapseOptionList();
                else
                    selectElementUI.expandOptionList(element);
            }
        };
        return SelectElementClickCommand;
    }(ElementClickCommand));
    var OptionElementClickCommand = /** @class */ (function (_super) {
        __extends(OptionElementClickCommand, _super);
        function OptionElementClickCommand(eventState, eventArgs) {
            return _super.call(this, eventState, eventArgs) || this;
        }
        OptionElementClickCommand.prototype.run = function () {
            return this.eventArgs.element;
        };
        return OptionElementClickCommand;
    }(ElementClickCommand));
    var LabelledCheckboxElementClickCommand = /** @class */ (function (_super) {
        __extends(LabelledCheckboxElementClickCommand, _super);
        function LabelledCheckboxElementClickCommand(eventState, eventArgs) {
            var _this = _super.call(this, eventState, eventArgs) || this;
            _this.checkbox = _this.input;
            return _this;
        }
        LabelledCheckboxElementClickCommand.prototype.run = function () {
            var changed = false;
            var onChange = function () {
                changed = true;
            };
            listeners$2.addInternalEventBeforeListener(window, ['change'], onChange);
            _super.prototype.run.call(this);
            listeners$2.removeInternalEventBeforeListener(window, ['change'], onChange);
            // NOTE: Two overlapping issues: https://github.com/DevExpress/testcafe/issues/3348 and https://github.com/DevExpress/testcafe/issues/6949
            // When label contains <a href=any> or <button> element, clicking these elements should prevent checkbox from changing checked state.
            // Also, checkbox state should not be changed if it is disabled.
            // We should to leave the code for fixing .focus issue and add additional check for the clickable elements inside the label:
            if (browserUtils$4.isChrome && !changed && !this.checkbox.disabled && !this._isClickableElementInsideLabel(this.targetElement))
                this._ensureCheckboxStateChanged();
        };
        LabelledCheckboxElementClickCommand.prototype._ensureCheckboxStateChanged = function () {
            this.checkbox.checked = !this.checkbox.checked;
            eventSimulator$3.change(this.checkbox);
        };
        LabelledCheckboxElementClickCommand.prototype._isClickableElementInsideLabel = function (element) {
            var isClickableLink = domUtils$2.isAnchorElement(element) && element.getAttribute('href');
            var isButton = domUtils$2.isButtonElement(element);
            return isClickableLink || isButton;
        };
        return LabelledCheckboxElementClickCommand;
    }(LabelElementClickCommand));
    function createClickCommand (eventState, eventArgs) {
        var elementBoundToLabel = getElementBoundToLabel(eventArgs.element);
        var isSelectElement = domUtils$2.isSelectElement(eventArgs.element);
        var isOptionElement = domUtils$2.isOptionElement(eventArgs.element);
        var isLabelElement = domUtils$2.isLabelElement(eventArgs.element) && elementBoundToLabel;
        var isLabelledCheckbox = elementBoundToLabel && domUtils$2.isCheckboxElement(elementBoundToLabel);
        if (isSelectElement)
            return new SelectElementClickCommand(eventState, eventArgs);
        if (isOptionElement)
            return new OptionElementClickCommand(eventState, eventArgs);
        if (isLabelledCheckbox)
            return new LabelledCheckboxElementClickCommand(eventState, eventArgs);
        if (isLabelElement)
            return new LabelElementClickCommand(eventState, eventArgs);
        return new ElementClickCommand(eventState, eventArgs);
    }

    // @ts-ignore
    var Promise$5 = hammerhead__default.Promise;
    var browserUtils$5 = hammerhead__default.utils.browser;
    var featureDetection = hammerhead__default.utils.featureDetection;
    var eventSimulator$4 = hammerhead__default.eventSandbox.eventSimulator;
    var listeners$3 = hammerhead__default.eventSandbox.listeners;
    var domUtils$3 = testCafeCore__default.domUtils;
    var eventUtils$1 = testCafeCore__default.eventUtils;
    var arrayUtils = testCafeCore__default.arrayUtils;
    function _getElementForClick(mouseDownElement, topElement, mouseDownElementParentNodes) {
        var topElementParentNodes = domUtils$3.getParents(topElement);
        var areElementsSame = domUtils$3.isTheSameNode(topElement, mouseDownElement);
        // NOTE: Mozilla Firefox always skips click, if an element under cursor has been changed after mousedown.
        if (browserUtils$5.isFirefox)
            return areElementsSame ? mouseDownElement : null;
        if (!areElementsSame) {
            // @ts-ignore
            if (mouseDownElement.contains(topElement) && !domUtils$3.isEditableFormElement(topElement))
                return mouseDownElement;
            // @ts-ignore
            if (topElement.contains(mouseDownElement))
                return topElement;
            // NOTE: If elements are not in the parent-child relationships,
            // non-ff browsers raise the `click` event for their common parent.
            return arrayUtils.getCommonElement(topElementParentNodes, mouseDownElementParentNodes);
        }
        // NOTE: In case the target element and the top element are the same,
        // non-FF browsers are dispatching the `click` event if the target
        // element hasn't changed its position in the DOM after mousedown.
        return arrayUtils.equals(mouseDownElementParentNodes, topElementParentNodes) ? mouseDownElement : null;
    }
    var MouseClickStrategy = /** @class */ (function () {
        function MouseClickStrategy(element, caretPos) {
            this.element = element;
            this.caretPos = caretPos;
            this.targetElementParentNodes = [];
            this.activeElementBeforeMouseDown = null;
            this.mouseDownElement = null;
            this.eventState = {
                mousedownPrevented: false,
                blurRaised: false,
                simulateDefaultBehavior: true,
                clickElement: null,
                touchStartCancelled: false,
                touchEndCancelled: false,
            };
        }
        MouseClickStrategy.prototype.mousedown = function (eventArgs) {
            var _this = this;
            this.targetElementParentNodes = domUtils$3.getParents(eventArgs.element);
            this.mouseDownElement = eventArgs.element;
            this._raiseTouchEvents(eventArgs);
            var activeElement = domUtils$3.getActiveElement();
            this.activeElementBeforeMouseDown = activeElement;
            // NOTE: In WebKit and IE, the mousedown event opens the select element's dropdown;
            // therefore, we should prevent mousedown and hide the dropdown (B236416).
            var needCloseSelectDropDown = (browserUtils$5.isWebKit || browserUtils$5.isIE) &&
                domUtils$3.isSelectElement(this.mouseDownElement);
            if (needCloseSelectDropDown)
                this._bindMousedownHandler();
            this._bindBlurHandler(activeElement);
            if (!this._isTouchEventWasCancelled())
                this.eventState.simulateDefaultBehavior = eventSimulator$4.mousedown(eventArgs.element, eventArgs.options);
            if (this.eventState.simulateDefaultBehavior === false)
                this.eventState.simulateDefaultBehavior = needCloseSelectDropDown && !this.eventState.mousedownPrevented;
            return this._ensureActiveElementBlur(activeElement)
                .then(function () { return _this._focus(eventArgs); });
        };
        MouseClickStrategy.prototype.mouseup = function (element, eventArgs) {
            eventArgs.element = element;
            this.eventState.clickElement = _getElementForClick(this.mouseDownElement, element, this.targetElementParentNodes);
            var timeStamp = {};
            var getTimeStamp = function (e) {
                timeStamp = e.timeStamp;
                listeners$3.removeInternalEventBeforeListener(window, ['mouseup'], getTimeStamp);
            };
            if (!browserUtils$5.isIE)
                listeners$3.addInternalEventBeforeListener(window, ['mouseup'], getTimeStamp);
            if (!this._isTouchEventWasCancelled())
                eventSimulator$4.mouseup(element, eventArgs.options);
            if (eventArgs.options)
                eventArgs.options.timeStamp = timeStamp;
            return this._click(eventArgs);
        };
        MouseClickStrategy.prototype._click = function (eventArgs) {
            return __awaiter(this, void 0, hammerhead__default.Promise, function () {
                var clickCommand;
                return __generator(this, function (_a) {
                    clickCommand = createClickCommand(this.eventState, eventArgs);
                    if (!this._isTouchEventWasCancelled())
                        clickCommand.run();
                    return [2 /*return*/, eventArgs];
                });
            });
        };
        // NOTE:
        // If `touchstart`, `touchmove`, or `touchend` are canceled, we should not dispatch any mouse event
        // that would be a consequential result of the prevented touch event
        MouseClickStrategy.prototype._isTouchEventWasCancelled = function () {
            return this.eventState.touchStartCancelled || this.eventState.touchEndCancelled;
        };
        MouseClickStrategy.prototype._bindMousedownHandler = function () {
            var _this = this;
            var onmousedown = function (e) {
                _this.eventState.mousedownPrevented = e.defaultPrevented;
                eventUtils$1.preventDefault(e);
                eventUtils$1.unbind(_this.element, 'mousedown', onmousedown);
            };
            eventUtils$1.bind(this.element, 'mousedown', onmousedown);
        };
        MouseClickStrategy.prototype._bindBlurHandler = function (element) {
            var _this = this;
            var onblur = function () {
                _this.eventState.blurRaised = true;
                eventUtils$1.unbind(element, 'blur', onblur, true);
            };
            eventUtils$1.bind(element, 'blur', onblur, true);
        };
        MouseClickStrategy.prototype._ensureActiveElementBlur = function (element) {
            var _this = this;
            // NOTE: In some cases, mousedown may lead to active element change (browsers raise blur).
            // We simulate the blur event if the active element was changed after the mousedown, and
            // the blur event does not get raised automatically (B239273, B253520)
            return new Promise$5(function (resolve) {
                var simulateBlur = domUtils$3.getActiveElement() !== element && !_this.eventState.blurRaised;
                if (!simulateBlur) {
                    resolve();
                    return;
                }
                if (browserUtils$5.isIE && browserUtils$5.version < 12) {
                    // NOTE: In whatever way an element is blurred from the client script, the
                    // blur event is raised asynchronously in IE (in MSEdge focus/blur is sync)
                    nextTick()
                        .then(function () {
                        if (!_this.eventState.blurRaised)
                            eventSimulator$4.blur(element);
                        resolve();
                    });
                }
                else {
                    eventSimulator$4.blur(element);
                    resolve();
                }
            });
        };
        MouseClickStrategy.prototype._focus = function (eventArgs) {
            if (this.eventState.simulateDefaultBehavior === false)
                return Promise$5.resolve();
            // NOTE: If a target element is a contentEditable element, we need to call focusAndSetSelection directly for
            // this element. Otherwise, if the element obtained by elementFromPoint is a child of the contentEditable
            // element, a selection position may be calculated incorrectly (by using the caretPos option).
            var elementForFocus = domUtils$3.isContentEditableElement(this.element) ? this.element : eventArgs.element;
            // NOTE: IE doesn't perform focus if active element has been changed while executing mousedown
            var simulateFocus = !browserUtils$5.isIE || this.activeElementBeforeMouseDown === domUtils$3.getActiveElement();
            return focusAndSetSelection(elementForFocus, simulateFocus, this.caretPos);
        };
        MouseClickStrategy.prototype._raiseTouchEvents = function (eventArgs) {
            if (featureDetection.isTouchDevice) {
                this.eventState.touchStartCancelled = !eventSimulator$4.touchstart(eventArgs.element, eventArgs.options);
                this.eventState.touchEndCancelled = !eventSimulator$4.touchend(eventArgs.element, eventArgs.options);
            }
        };
        return MouseClickStrategy;
    }());
    function createMouseClickStrategy(element, caretPos) {
        return new MouseClickStrategy(element, caretPos);
    }

    var ClickAutomation = /** @class */ (function (_super) {
        __extends(ClickAutomation, _super);
        function ClickAutomation(element, clickOptions, win, cursor) {
            var _this = _super.call(this, element, clickOptions, win, cursor) || this;
            _this.modifiers = clickOptions.modifiers;
            _this.strategy = createMouseClickStrategy(_this.element, clickOptions.caretPos);
            return _this;
        }
        ClickAutomation.prototype._mousedown = function (eventArgs) {
            return this.strategy.mousedown(eventArgs);
        };
        ClickAutomation.prototype._mouseup = function (element, eventArgs) {
            return this.strategy.mouseup(element, eventArgs);
        };
        ClickAutomation.prototype.run = function (useStrictElementCheck) {
            var _this = this;
            var eventArgs;
            return this
                ._ensureElement(useStrictElementCheck)
                .then(function (_a) {
                var element = _a.element, clientPoint = _a.clientPoint, screenPoint = _a.screenPoint, devicePoint = _a.devicePoint;
                eventArgs = {
                    point: clientPoint,
                    screenPoint: screenPoint,
                    element: element,
                    options: hammerhead.utils.extend({
                        clientX: clientPoint === null || clientPoint === void 0 ? void 0 : clientPoint.x,
                        clientY: clientPoint === null || clientPoint === void 0 ? void 0 : clientPoint.y,
                        screenX: devicePoint === null || devicePoint === void 0 ? void 0 : devicePoint.x,
                        screenY: devicePoint === null || devicePoint === void 0 ? void 0 : devicePoint.y,
                    }, _this.modifiers),
                };
                // NOTE: we should raise mouseup event with 'mouseActionStepDelay' after we trigger
                // mousedown event regardless of how long mousedown event handlers were executing
                return hammerhead.Promise.all([delay(_this.automationSettings.mouseActionStepDelay), _this.cursor
                        .leftButtonDown()
                        .then(function () { return _this._mousedown(eventArgs); }),
                ]);
            })
                .then(function () { return _this.cursor.buttonUp(); })
                .then(function () { return _this._getElementForEvent(eventArgs); })
                .then(function (element) {
                return element ? _this._mouseup(element, eventArgs) : null;
            });
        };
        return ClickAutomation;
    }(VisibleElementAutomation));

    function getLineYByXCoord(startLine, endLine, x) {
        if (endLine.x === startLine.x)
            return 0;
        var equationSlope = (endLine.y - startLine.y) / (endLine.x - startLine.x);
        var equationYIntercept = startLine.x * (startLine.y - endLine.y) / (endLine.x - startLine.x) + startLine.y;
        return Math.round(equationSlope * x + equationYIntercept);
    }
    function getLineXByYCoord(startLine, endLine, y) {
        if (endLine.y - startLine.y === 0)
            return 0;
        var equationSlope = (endLine.x - startLine.x) / (endLine.y - startLine.y);
        var equationXIntercept = startLine.y * (startLine.x - endLine.x) / (endLine.y - startLine.y) + startLine.x;
        return Math.round(equationSlope * y + equationXIntercept);
    }

    function findIntersectionHorizontal(startLinePoint, endLinePoint, rectSide) {
        var intersectionX = getLineXByYCoord(startLinePoint, endLinePoint, rectSide.top);
        var haveIntersectionInBounds = intersectionX && intersectionX >= rectSide.left && intersectionX <= rectSide.right;
        return haveIntersectionInBounds ? new AxisValues(intersectionX, rectSide.top) : null;
    }
    function findIntersectionVertical(startLinePoint, endLinePoint, rectSide) {
        var intersectionY = getLineYByXCoord(startLinePoint, endLinePoint, rectSide.left);
        var haveIntersectionInBounds = intersectionY && intersectionY >= rectSide.top && intersectionY <= rectSide.bottom;
        return haveIntersectionInBounds ? new AxisValues(rectSide.left, intersectionY) : null;
    }
    function getLineRectIntersection (startLine, endLine, rect) {
        var res = [];
        var rectLines = [
            { left: rect.left, top: rect.top, right: rect.left, bottom: rect.bottom, isHorizontal: false },
            { left: rect.right, top: rect.top, right: rect.right, bottom: rect.bottom, isHorizontal: false },
            { left: rect.left, top: rect.top, right: rect.right, bottom: rect.top, isHorizontal: true },
            { left: rect.left, top: rect.bottom, right: rect.right, bottom: rect.bottom, isHorizontal: true }, // bottom-side
        ];
        for (var _i = 0, rectLines_1 = rectLines; _i < rectLines_1.length; _i++) {
            var rectLine = rectLines_1[_i];
            var intersection = rectLine.isHorizontal
                ? findIntersectionHorizontal(startLine, endLine, rectLine)
                : findIntersectionVertical(startLine, endLine, rectLine);
            if (intersection)
                res.push(intersection);
        }
        if (!res.length)
            return null;
        if (res.length === 1)
            return res[0];
        // NOTE: if a line and rect have two intersection points, we return the nearest to startLinePoint
        return res[0].distance(startLine) < res[1].distance(startLine) ? res[0] : res[1];
    }

    var eventSimulator$5 = hammerhead__default.eventSandbox.eventSimulator;
    var messageSandbox$2 = hammerhead__default.eventSandbox.message;
    var positionUtils$2 = testCafeCore__default.positionUtils;
    var domUtils$4 = testCafeCore__default.domUtils;
    var styleUtils$3 = testCafeCore__default.styleUtils;
    var MOVE_REQUEST_CMD$1 = 'automation|move|request';
    var MOVE_RESPONSE_CMD$1 = 'automation|move|response';
    function onMoveToIframeRequest(e) {
        var iframePoint = new AxisValues(e.message.endX, e.message.endY);
        var iframeWin = e.source;
        var iframe = domUtils$4.findIframeByWindow(iframeWin);
        var iframeBorders = styleUtils$3.getBordersWidth(iframe);
        var iframePadding = styleUtils$3.getElementPadding(iframe);
        var iframeRectangle = positionUtils$2.getIframeClientCoordinates(iframe);
        var iframePointRelativeToParent = positionUtils$2.getIframePointRelativeToParentFrame(iframePoint, iframeWin);
        var cursorPosition = cursor.getPosition();
        var intersectionPoint = positionUtils$2.isInRectangle(cursorPosition, iframeRectangle) ? cursorPosition :
            getLineRectIntersection(cursorPosition, iframePointRelativeToParent, iframeRectangle);
        var intersectionRelatedToIframe = {
            x: intersectionPoint.x - iframeRectangle.left,
            y: intersectionPoint.y - iframeRectangle.top,
        };
        var moveOptions = new MoveOptions({
            modifiers: e.message.modifiers,
            offsetX: intersectionRelatedToIframe.x + iframeBorders.left + iframePadding.left,
            offsetY: intersectionRelatedToIframe.y + iframeBorders.top + iframePadding.top,
            speed: e.message.speed,
            // NOTE: we should not perform scrolling because the active window was
            // already scrolled to the target element before the request (GH-847)
            skipScrolling: true,
        }, false);
        var responseMsg = {
            cmd: MOVE_RESPONSE_CMD$1,
            x: intersectionRelatedToIframe.x,
            y: intersectionRelatedToIframe.y,
        };
        if (cursor.getActiveWindow(window) !== iframeWin) {
            // const moveAutomation = new MoveAutomation(iframe, moveOptions);
            MoveAutomation.create(iframe, moveOptions, window, cursor)
                .then(function (moveAutomation) {
                return moveAutomation.run();
            })
                .then(function () {
                cursor.setActiveWindow(iframeWin);
                messageSandbox$2.sendServiceMsg(responseMsg, iframeWin);
            });
        }
        else
            messageSandbox$2.sendServiceMsg(responseMsg, iframeWin);
    }
    function onMoveOutRequest(e) {
        var parentWin = e.source;
        var iframeRectangle = {
            left: e.message.left,
            right: e.message.right,
            top: e.message.top,
            bottom: e.message.bottom,
        };
        if (!e.message.iframeUnderCursor) {
            var _a = e.message, startX = _a.startX, startY = _a.startY;
            var clientX = startX - iframeRectangle.left;
            var clientY = startY - iframeRectangle.top;
            // NOTE: We should not emulate mouseout and mouseleave if iframe was reloaded.
            var element = lastHoveredElementHolder.get();
            if (element) {
                eventSimulator$5.mouseout(element, { clientX: clientX, clientY: clientY, relatedTarget: null });
                eventSimulator$5.mouseleave(element, { clientX: clientX, clientY: clientY, relatedTarget: null });
            }
            messageSandbox$2.sendServiceMsg({ cmd: MOVE_RESPONSE_CMD$1 }, parentWin);
            return;
        }
        var cursorPosition = cursor.getPosition();
        var startPoint = AxisValues.create(iframeRectangle).add(cursorPosition);
        var endPoint = new AxisValues(e.message.endX, e.message.endY);
        var intersectionPoint = getLineRectIntersection(startPoint, endPoint, iframeRectangle);
        // NOTE: We should not move the cursor out of the iframe if
        // the cursor path does not intersect with the iframe borders.
        if (!intersectionPoint) {
            messageSandbox$2.sendServiceMsg({
                cmd: MOVE_RESPONSE_CMD$1,
                x: iframeRectangle.left,
                y: iframeRectangle.top,
            }, parentWin);
            return;
        }
        var moveOptions = new MoveOptions({
            modifiers: e.message.modifiers,
            offsetX: intersectionPoint.x - iframeRectangle.left,
            offsetY: intersectionPoint.y - iframeRectangle.top,
            speed: e.message.speed,
            // NOTE: we should not perform scrolling because the active window was
            // already scrolled to the target element before the request (GH-847)
            skipScrolling: true,
        }, false);
        MoveAutomation.create(document.documentElement, moveOptions, window, cursor)
            .then(function (moveAutomation) {
            return moveAutomation.run();
        })
            .then(function () {
            var responseMsg = {
                cmd: MOVE_RESPONSE_CMD$1,
                x: intersectionPoint.x,
                y: intersectionPoint.y,
            };
            cursor.setActiveWindow(parentWin);
            messageSandbox$2.sendServiceMsg(responseMsg, parentWin);
        });
    }
    // Setup cross-iframe interaction
    messageSandbox$2.on(messageSandbox$2.SERVICE_MSG_RECEIVED_EVENT, function (e) {
        if (e.message.cmd === MOVE_REQUEST_CMD$1) {
            if (e.source.parent === window)
                onMoveToIframeRequest(e);
            else {
                hammerhead__default.on(hammerhead__default.EVENTS.beforeUnload, function () { return messageSandbox$2.sendServiceMsg({ cmd: MOVE_RESPONSE_CMD$1 }, e.source); });
                onMoveOutRequest(e);
            }
        }
    });

    var Promise$6 = hammerhead__default.Promise;
    var browserUtils$6 = hammerhead__default.utils.browser;
    var featureDetection$1 = hammerhead__default.utils.featureDetection;
    var eventSimulator$6 = hammerhead__default.eventSandbox.eventSimulator;
    var focusBlurSandbox$1 = hammerhead__default.eventSandbox.focusBlur;
    var nativeMethods$8 = hammerhead__default.nativeMethods;
    var domUtils$5 = testCafeCore__default.domUtils;
    var styleUtils$4 = testCafeCore__default.styleUtils;
    var delay$1 = testCafeCore__default.delay;
    var selectElementUI$1 = testCafeUI.selectElement;
    var FOCUS_DELAY = featureDetection$1.isTouchDevice ? 0 : 160;
    var SelectChildClickAutomation = /** @class */ (function () {
        function SelectChildClickAutomation(element, clickOptions) {
            this.element = element;
            this.modifiers = clickOptions.modifiers;
            this.caretPos = clickOptions.caretPos;
            this.offsetX = clickOptions.offsetX;
            this.offsetY = clickOptions.offsetY;
            this.speed = clickOptions.speed;
            this.automationSettings = new AutomationSettings(clickOptions.speed);
            this.parentSelect = domUtils$5.getSelectParent(this.element);
            this.optionListExpanded = this.parentSelect ? selectElementUI$1.isOptionListExpanded(this.parentSelect) : false;
            this.childIndex = null;
            this.clickCausesChange = false;
            if (this.parentSelect) {
                var isOption = domUtils$5.isOptionElement(this.element);
                var selectedIndex = this.parentSelect.selectedIndex;
                this.childIndex = isOption ? domUtils$5.getElementIndexInParent(this.parentSelect, this.element) :
                    domUtils$5.getElementIndexInParent(this.parentSelect, this.element);
                var parent_1 = nativeMethods$8.nodeParentNodeGetter.call(this.element);
                var parentOptGroup = domUtils$5.isOptionGroupElement(parent_1) ? parent_1 : null;
                var isDisabled = this.element.disabled || parentOptGroup && parentOptGroup.disabled;
                this.clickCausesChange = isOption && !isDisabled && this.childIndex !== selectedIndex;
            }
            this.eventsArgs = {
                options: this.modifiers,
                element: this.element,
            };
        }
        SelectChildClickAutomation.prototype._calculateEventArguments = function () {
            var childElement = this.optionListExpanded ? selectElementUI$1.getEmulatedChildElement(this.element) : this.element;
            var parentSelectSize = styleUtils$4.getSelectElementSize(this.parentSelect) > 1;
            return {
                options: this.modifiers,
                element: browserUtils$6.isIE && parentSelectSize ? this.parentSelect : childElement,
            };
        };
        SelectChildClickAutomation.prototype._getMoveArguments = function () {
            var element = null;
            var offsetX = null;
            var offsetY = null;
            if (this.optionListExpanded) {
                element = selectElementUI$1.getEmulatedChildElement(this.element);
                var moveActionOffsets = getDefaultAutomationOffsets(element);
                offsetX = moveActionOffsets.offsetX;
                offsetY = moveActionOffsets.offsetY;
            }
            else {
                element = document.documentElement;
                var elementCenter = selectElementUI$1.getSelectChildCenter(this.element);
                offsetX = elementCenter.x;
                offsetY = elementCenter.y;
            }
            return { element: element, offsetX: offsetX, offsetY: offsetY, speed: this.speed };
        };
        SelectChildClickAutomation.prototype._move = function (_a) {
            var _this = this;
            var element = _a.element, offsetX = _a.offsetX, offsetY = _a.offsetY, speed = _a.speed;
            var moveOptions = new MoveOptions({
                offsetX: offsetX,
                offsetY: offsetY,
                speed: speed,
                modifiers: this.modifiers,
            }, false);
            return MoveAutomation.create(element, moveOptions, window, cursor)
                .then(function (moveAutomation) {
                return moveAutomation.run();
            })
                .then(function () { return delay$1(_this.automationSettings.mouseActionStepDelay); });
        };
        SelectChildClickAutomation.prototype._mousedown = function () {
            var _this = this;
            if (browserUtils$6.isFirefox) {
                eventSimulator$6.mousedown(this.eventsArgs.element, this.eventsArgs.options);
                if (this.clickCausesChange)
                    this.parentSelect.selectedIndex = this.childIndex;
                return this._focus();
            }
            if (browserUtils$6.isIE) {
                eventSimulator$6.mousedown(this.eventsArgs.element, this.eventsArgs.options);
                return this._focus();
            }
            // NOTE: In Chrome, document.activeElement is 'select' after mousedown. But we need to
            // raise blur and change the event for a previously active element during focus raising.
            // That's why we should change the event order and raise focus before mousedown.
            return this
                ._focus()
                .then(function () { return delay$1(FOCUS_DELAY); })
                .then(function () {
                eventSimulator$6.mousedown(_this.eventsArgs.element, _this.eventsArgs.options);
                if (_this.clickCausesChange)
                    _this.parentSelect.selectedIndex = _this.childIndex;
            });
        };
        SelectChildClickAutomation.prototype._focus = function () {
            var _this = this;
            return new Promise$6(function (resolve) {
                focusBlurSandbox$1.focus(_this.parentSelect, resolve, false, true);
            });
        };
        SelectChildClickAutomation.prototype._mouseup = function () {
            var elementForMouseupEvent = browserUtils$6.isIE ? this.parentSelect : this.eventsArgs.element;
            eventSimulator$6.mouseup(elementForMouseupEvent, this.eventsArgs.options);
            if (browserUtils$6.isIE && this.clickCausesChange)
                this.parentSelect.selectedIndex = this.childIndex;
            var simulateInputEventOnValueChange = browserUtils$6.isFirefox || browserUtils$6.isSafari ||
                browserUtils$6.isChrome && browserUtils$6.version >= 53;
            var simulateChangeEventOnValueChange = simulateInputEventOnValueChange || browserUtils$6.isIE;
            if (simulateInputEventOnValueChange && this.clickCausesChange)
                eventSimulator$6.input(this.parentSelect);
            if (simulateChangeEventOnValueChange && this.clickCausesChange)
                eventSimulator$6.change(this.parentSelect);
            return Promise$6.resolve();
        };
        SelectChildClickAutomation.prototype._click = function () {
            eventSimulator$6.click(this.eventsArgs.element, this.eventsArgs.options);
        };
        SelectChildClickAutomation.prototype.run = function () {
            var _this = this;
            if (!this.parentSelect) {
                eventSimulator$6.click(this.eventsArgs.element, this.eventsArgs.options);
                return Promise$6.resolve();
            }
            if (!this.optionListExpanded)
                selectElementUI$1.scrollOptionListByChild(this.element);
            var moveArguments = this._getMoveArguments();
            this.eventsArgs = this._calculateEventArguments();
            if (styleUtils$4.getSelectElementSize(this.parentSelect) <= 1) {
                return this
                    ._move(moveArguments)
                    .then(function () { return _this._click(); });
            }
            return this
                ._move(moveArguments)
                .then(function () { return _this._mousedown(); })
                .then(function () { return _this._mouseup(); })
                .then(function () { return _this._click(); });
        };
        return SelectChildClickAutomation;
    }());

    var featureDetection$2 = hammerhead__default.utils.featureDetection;
    var browserUtils$7 = hammerhead__default.utils.browser;
    var eventSimulator$7 = hammerhead__default.eventSandbox.eventSimulator;
    var eventUtils$2 = testCafeCore__default.eventUtils;
    var delay$2 = testCafeCore__default.delay;
    var FIRST_CLICK_DELAY = featureDetection$2.isTouchDevice ? 0 : 160;
    var DblClickAutomation = /** @class */ (function (_super) {
        __extends(DblClickAutomation, _super);
        function DblClickAutomation(element, clickOptions) {
            var _this = _super.call(this, element, clickOptions, window, cursor) || this;
            _this.modifiers = clickOptions.modifiers;
            _this.caretPos = clickOptions.caretPos;
            _this.speed = clickOptions.speed;
            _this.automationSettings = new AutomationSettings(_this.speed);
            _this.offsetX = clickOptions.offsetX;
            _this.offsetY = clickOptions.offsetY;
            _this.eventArgs = null;
            _this.eventState = {
                dblClickElement: null,
            };
            return _this;
        }
        DblClickAutomation.prototype._firstClick = function (useStrictElementCheck) {
            var _this = this;
            // NOTE: we should always perform click with the highest speed
            var clickOptions = new ClickOptions(this.options);
            clickOptions.speed = 1;
            var clickAutomation = new ClickAutomation(this.element, clickOptions, window, cursor);
            clickAutomation.on(clickAutomation.TARGET_ELEMENT_FOUND_EVENT, function (e) { return _this.emit(_this.TARGET_ELEMENT_FOUND_EVENT, e); });
            return clickAutomation.run(useStrictElementCheck)
                .then(function (clickEventArgs) {
                return delay$2(FIRST_CLICK_DELAY).then(function () { return clickEventArgs; });
            });
        };
        DblClickAutomation.prototype._secondClick = function (eventArgs) {
            var _this = this;
            //NOTE: we should not call focus after the second mousedown (except in IE) because of the native browser behavior
            if (browserUtils$7.isIE)
                eventUtils$2.bind(document, 'focus', eventUtils$2.preventDefault, true);
            var clickOptions = new ClickOptions({
                offsetX: eventArgs.screenPoint.x,
                offsetY: eventArgs.screenPoint.y,
                caretPos: this.caretPos,
                modifiers: this.modifiers,
                speed: 1,
            });
            var clickAutomation = new ClickAutomation(document.documentElement, clickOptions, window, cursor);
            return clickAutomation.run()
                .then(function (clickEventArgs) {
                // NOTE: We should raise the `dblclick` event on an element that
                // has been actually clicked during the second click automation.
                _this.eventState.dblClickElement = clickAutomation.strategy.eventState.clickElement;
                if (browserUtils$7.isIE)
                    eventUtils$2.unbind(document, 'focus', eventUtils$2.preventDefault, true);
                return clickEventArgs;
            });
        };
        DblClickAutomation.prototype._dblClick = function (eventArgs) {
            if (this.eventState.dblClickElement)
                eventSimulator$7.dblclick(this.eventState.dblClickElement, eventArgs.options);
        };
        DblClickAutomation.prototype.run = function (useStrictElementCheck) {
            var _this = this;
            // NOTE: If the target element is out of viewport the firstClick sub-automation raises an error
            return this
                ._firstClick(useStrictElementCheck)
                .then(function (eventArgs) { return _this._secondClick(eventArgs); })
                .then(function (eventArgs) { return _this._dblClick(eventArgs); });
        };
        return DblClickAutomation;
    }(VisibleElementAutomation));

    var DragAndDropState = /** @class */ (function () {
        function DragAndDropState() {
            this.enabled = false;
            this.dropAllowed = false;
            this.element = null;
            this.dataTransfer = null;
            this.dataStore = null;
        }
        return DragAndDropState;
    }());

    var nativeMethods$9 = hammerhead__default.nativeMethods;
    var featureDetection$3 = hammerhead__default.utils.featureDetection;
    var htmlUtils$1 = hammerhead__default.utils.html;
    var urlUtils = hammerhead__default.utils.url;
    var DataTransfer = hammerhead__default.eventSandbox.DataTransfer;
    var DragDataStore = hammerhead__default.eventSandbox.DragDataStore;
    var eventUtils$3 = testCafeCore__default.eventUtils;
    var domUtils$6 = testCafeCore__default.domUtils;
    // Utils
    function findDraggableElement(element) {
        var parentNode = element;
        while (parentNode) {
            if (parentNode.draggable)
                return parentNode;
            parentNode = nativeMethods$9.nodeParentNodeGetter.call(parentNode);
        }
        return null;
    }
    var DragMoveAutomation = /** @class */ (function (_super) {
        __extends(DragMoveAutomation, _super);
        function DragMoveAutomation(element, offset, moveOptions, win, cursor) {
            var _this = _super.call(this, element, offset, moveOptions, win, cursor) || this;
            _this.dragElement = null;
            _this.dragAndDropState = new DragAndDropState();
            return _this;
        }
        DragMoveAutomation.create = function (el, moveOptions, win, cursor) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, element, offset;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, MoveAutomation.getTarget(el, win, new AxisValues(moveOptions.offsetX, moveOptions.offsetY))];
                        case 1:
                            _a = _b.sent(), element = _a.element, offset = _a.offset;
                            return [2 /*return*/, new DragMoveAutomation(element, offset, moveOptions, win, cursor)];
                    }
                });
            });
        };
        DragMoveAutomation.prototype._getCursorSpeed = function () {
            return this.automationSettings.draggingSpeed;
        };
        DragMoveAutomation.prototype._getEventSequenceOptions = function (currPosition) {
            var _a = _super.prototype._getEventSequenceOptions.call(this, currPosition), eventOptions = _a.eventOptions, eventSequenceOptions = _a.eventSequenceOptions;
            eventOptions.dataTransfer = this.dragAndDropState.dataTransfer;
            eventOptions.buttons = eventUtils$3.BUTTONS_PARAMETER.leftButton;
            eventSequenceOptions.holdLeftButton = true;
            return { eventOptions: eventOptions, eventSequenceOptions: eventSequenceOptions };
        };
        DragMoveAutomation.prototype._getCorrectedTopElement = function (topElement) {
            return this.touchMode ? this.dragElement : topElement;
        };
        DragMoveAutomation.prototype._runEventSequence = function (currentElement, _a) {
            var eventOptions = _a.eventOptions, eventSequenceOptions = _a.eventSequenceOptions;
            var eventSequence = createEventSequence(this.dragAndDropState.enabled, this.firstMovingStepOccured, eventSequenceOptions);
            var _b = eventSequence.run(currentElement, lastHoveredElementHolder.get(), eventOptions, this.dragElement, this.dragAndDropState.dataStore), dragAndDropMode = _b.dragAndDropMode, dropAllowed = _b.dropAllowed;
            this.dragAndDropState.enabled = dragAndDropMode;
            this.dragAndDropState.dropAllowed = dropAllowed;
        };
        DragMoveAutomation.prototype._needMoveCursorImmediately = function () {
            return false;
        };
        DragMoveAutomation.prototype.run = function () {
            var _this = this;
            return getElementFromPoint$2(this.cursor.getPosition())
                .then(function (topElement) {
                _this.dragElement = topElement;
                var draggable = findDraggableElement(_this.dragElement);
                // NOTE: we should skip simulating drag&drop's native behavior if the mousedown event was prevented (GH - 2529)
                if (draggable && featureDetection$3.hasDataTransfer && !_this.skipDefaultDragBehavior) {
                    _this.dragAndDropState.enabled = true;
                    _this.dragElement = draggable;
                    _this.dragAndDropState.element = _this.dragElement;
                    _this.dragAndDropState.dataStore = new DragDataStore();
                    _this.dragAndDropState.dataTransfer = new DataTransfer(_this.dragAndDropState.dataStore);
                    var isLink = domUtils$6.isAnchorElement(_this.dragElement);
                    if (isLink || domUtils$6.isImgElement(_this.dragElement)) {
                        var srcAttr = isLink ? 'href' : 'src';
                        var parsedUrl = urlUtils.parseProxyUrl(_this.dragElement[srcAttr]);
                        var src = parsedUrl ? parsedUrl.destUrl : _this.dragElement[srcAttr];
                        var outerHTML = htmlUtils$1.cleanUpHtml(nativeMethods$9.elementOuterHTMLGetter.call(_this.dragElement));
                        _this.dragAndDropState.dataTransfer.setData('text/plain', src);
                        _this.dragAndDropState.dataTransfer.setData('text/uri-list', src);
                        _this.dragAndDropState.dataTransfer.setData('text/html', outerHTML);
                    }
                }
                return _super.prototype.run.call(_this)
                    .then(function () { return _this.dragAndDropState; });
            });
        };
        return DragMoveAutomation;
    }(MoveAutomation));

    var MIN_MOVING_TIME = 25;
    var Promise$7 = hammerhead__default.Promise;
    var extend$1 = hammerhead__default.utils.extend;
    var featureDetection$4 = hammerhead__default.utils.featureDetection;
    var eventSimulator$8 = hammerhead__default.eventSandbox.eventSimulator;
    var focusBlurSandbox$2 = hammerhead__default.eventSandbox.focusBlur;
    var DragAutomationBase = /** @class */ (function (_super) {
        __extends(DragAutomationBase, _super);
        function DragAutomationBase(element, mouseOptions) {
            var _this = _super.call(this, element, mouseOptions, window, cursor) || this;
            _this.modifiers = mouseOptions.modifiers;
            _this.speed = mouseOptions.speed;
            _this.offsetX = mouseOptions.offsetX;
            _this.offsetY = mouseOptions.offsetY;
            _this.endPoint = null;
            _this.simulateDefaultBehavior = true;
            _this.downEvent = featureDetection$4.isTouchDevice ? 'touchstart' : 'mousedown';
            _this.upEvent = featureDetection$4.isTouchDevice ? 'touchend' : 'mouseup';
            _this.dragAndDropState = null;
            return _this;
        }
        DragAutomationBase.prototype._getEndPoint = function () {
            throw new Error('Not implemented');
        };
        DragAutomationBase.prototype._mousedown = function (eventArgs) {
            var _this = this;
            return cursor
                .leftButtonDown()
                .then(function () {
                _this.simulateDefaultBehavior = eventSimulator$8[_this.downEvent](eventArgs.element, eventArgs.options);
                return _this._focus(eventArgs);
            });
        };
        DragAutomationBase.prototype._focus = function (eventArgs) {
            var _this = this;
            return new Promise$7(function (resolve) {
                // NOTE: If the target element is a child of a contentEditable element, we need to call focus for its parent
                var elementForFocus = testCafeCore.domUtils.isContentEditableElement(_this.element) ?
                    testCafeCore.contentEditable.findContentEditableParent(_this.element) : eventArgs.element;
                focusBlurSandbox$2.focus(elementForFocus, resolve, false, true);
            });
        };
        DragAutomationBase.prototype._getDestination = function () {
            throw new Error('Not implemented');
        };
        DragAutomationBase.prototype._drag = function () {
            var _this = this;
            return this._getDestination()
                .then(function (_a) {
                var element = _a.element, offsets = _a.offsets, endPoint = _a.endPoint;
                _this.endPoint = endPoint;
                var dragOptions = new MoveOptions({
                    offsetX: offsets.offsetX,
                    offsetY: offsets.offsetY,
                    modifiers: _this.modifiers,
                    speed: _this.speed,
                    minMovingTime: MIN_MOVING_TIME,
                    skipDefaultDragBehavior: _this.simulateDefaultBehavior === false,
                }, false);
                return DragMoveAutomation.create(element, dragOptions, window, cursor);
            })
                .then(function (moveAutomation) {
                return moveAutomation.run();
            })
                .then(function (dragAndDropState) {
                _this.dragAndDropState = dragAndDropState;
                return testCafeCore.delay(_this.automationSettings.mouseActionStepDelay);
            });
        };
        DragAutomationBase.prototype._mouseup = function () {
            var _this = this;
            return cursor
                .buttonUp()
                .then(function () {
                var point = testCafeCore.positionUtils.offsetToClientCoords(_this.endPoint);
                var topElement = null;
                var options = extend$1({
                    clientX: point.x,
                    clientY: point.y,
                }, _this.modifiers);
                return getElementFromPoint$2(point)
                    .then(function (element) {
                    topElement = element;
                    if (!topElement)
                        return topElement;
                    if (_this.dragAndDropState.enabled) {
                        options.dataTransfer = _this.dragAndDropState.dataTransfer;
                        if (_this.dragAndDropState.dropAllowed)
                            eventSimulator$8.drop(topElement, options);
                        eventSimulator$8.dragend(_this.dragAndDropState.element, options);
                        _this.dragAndDropState.dataStore.setProtectedMode();
                    }
                    else
                        eventSimulator$8[_this.upEvent](topElement, options);
                    return getElementFromPoint$2(point);
                })
                    .then(function (element) {
                    //B231323
                    if (topElement && element === topElement && !_this.dragAndDropState.enabled)
                        eventSimulator$8.click(topElement, options);
                });
            });
        };
        DragAutomationBase.prototype.run = function (useStrictElementCheck) {
            var _this = this;
            var eventArgs = null;
            return this
                ._ensureElement(useStrictElementCheck)
                .then(function (_a) {
                var element = _a.element, clientPoint = _a.clientPoint;
                eventArgs = {
                    point: clientPoint,
                    element: element,
                    options: extend$1({
                        clientX: clientPoint.x,
                        clientY: clientPoint.y,
                    }, _this.modifiers),
                };
                // NOTE: we should raise start drag with 'mouseActionStepDelay' after we trigger
                // mousedown event regardless of how long mousedown event handlers were executing
                return Promise$7.all([testCafeCore.delay(_this.automationSettings.mouseActionStepDelay), _this._mousedown(eventArgs)]);
            })
                .then(function () { return _this._drag(); })
                .then(function () { return _this._mouseup(); });
        };
        return DragAutomationBase;
    }(VisibleElementAutomation));

    var styleUtils$5 = testCafeCore__default.styleUtils;
    var DragToOffsetAutomation = /** @class */ (function (_super) {
        __extends(DragToOffsetAutomation, _super);
        function DragToOffsetAutomation(element, offsetX, offsetY, mouseOptions) {
            var _this = _super.call(this, element, mouseOptions) || this;
            _this.dragOffsetX = offsetX;
            _this.dragOffsetY = offsetY;
            return _this;
        }
        DragToOffsetAutomation.prototype._getDestination = function () {
            return __awaiter(this, void 0, void 0, function () {
                var startPoint, maxX, maxY, endPoint, element, offsets;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getAutomationPoint(this.element, { x: this.offsetX, y: this.offsetY })];
                        case 1:
                            startPoint = _a.sent();
                            maxX = styleUtils$5.getWidth(document);
                            maxY = styleUtils$5.getHeight(document);
                            endPoint = {
                                x: startPoint.x + this.dragOffsetX,
                                y: startPoint.y + this.dragOffsetY,
                            };
                            endPoint = {
                                x: Math.min(Math.max(0, endPoint.x), maxX),
                                y: Math.min(Math.max(0, endPoint.y), maxY),
                            };
                            element = document.documentElement;
                            offsets = {
                                offsetX: endPoint.x,
                                offsetY: endPoint.y,
                            };
                            return [2 /*return*/, { element: element, offsets: offsets, endPoint: endPoint }];
                    }
                });
            });
        };
        return DragToOffsetAutomation;
    }(DragAutomationBase));

    var positionUtils$3 = testCafeCore__default.positionUtils;
    var DragToElementAutomation = /** @class */ (function (_super) {
        __extends(DragToElementAutomation, _super);
        function DragToElementAutomation(element, destinationElement, dragToElementOptions) {
            var _this = _super.call(this, element, dragToElementOptions) || this;
            _this.destinationElement = destinationElement;
            _this.destinationOffsetX = dragToElementOptions.destinationOffsetX;
            _this.destinationOffsetY = dragToElementOptions.destinationOffsetY;
            return _this;
        }
        DragToElementAutomation.prototype._getDestination = function () {
            return __awaiter(this, void 0, void 0, function () {
                var element, elementRect, offsets, endPoint;
                return __generator(this, function (_a) {
                    element = this.destinationElement;
                    elementRect = positionUtils$3.getElementRectangle(element);
                    offsets = getOffsetOptions(element, this.destinationOffsetX, this.destinationOffsetY);
                    endPoint = {
                        x: elementRect.left + offsets.offsetX,
                        y: elementRect.top + offsets.offsetY,
                    };
                    return [2 /*return*/, { element: element, offsets: offsets, endPoint: endPoint }];
                });
            });
        };
        return DragToElementAutomation;
    }(DragAutomationBase));

    var HoverAutomation = /** @class */ (function (_super) {
        __extends(HoverAutomation, _super);
        function HoverAutomation(element, hoverOptions) {
            return _super.call(this, element, hoverOptions, window, cursor) || this;
        }
        HoverAutomation.prototype.run = function (useStrictElementCheck) {
            return this._ensureElement(useStrictElementCheck, true);
        };
        return HoverAutomation;
    }(VisibleElementAutomation));

    var browserUtils$8 = hammerhead__default.utils.browser;
    var eventSandbox = hammerhead__default.sandbox.event;
    var eventSimulator$9 = hammerhead__default.eventSandbox.eventSimulator;
    var listeners$4 = hammerhead__default.eventSandbox.listeners;
    var nativeMethods$a = hammerhead__default.nativeMethods;
    var domUtils$7 = testCafeCore__default.domUtils;
    var contentEditable$1 = testCafeCore__default.contentEditable;
    var textSelection$1 = testCafeCore__default.textSelection;
    var WHITE_SPACES_RE = / /g;
    function _getSelectionInElement(element) {
        var currentSelection = textSelection$1.getSelectionByElement(element);
        var isInverseSelection = textSelection$1.hasInverseSelectionContentEditable(element);
        if (textSelection$1.hasElementContainsSelection(element))
            return contentEditable$1.getSelection(element, currentSelection, isInverseSelection);
        // NOTE: if we type text to an element that doesn't contain selection we
        // assume the selectionStart and selectionEnd positions are null in this
        // element. So we calculate the necessary start and end nodes and offsets
        return {
            startPos: contentEditable$1.calculateNodeAndOffsetByPosition(element, 0),
            endPos: contentEditable$1.calculateNodeAndOffsetByPosition(element, 0),
        };
    }
    function _updateSelectionAfterDeletionContent(element, selection) {
        var startNode = selection.startPos.node;
        var startParent = nativeMethods$a.nodeParentNodeGetter.call(startNode);
        var hasStartParent = startParent && startNode.parentElement;
        var browserRequiresSelectionUpdating = browserUtils$8.isChrome && browserUtils$8.version < 58 || browserUtils$8.isSafari;
        if (browserRequiresSelectionUpdating || !hasStartParent || !domUtils$7.isElementContainsNode(element, startNode)) {
            selection = _getSelectionInElement(element);
            if (textSelection$1.hasInverseSelectionContentEditable(element)) {
                selection = {
                    startPos: selection.endPos,
                    endPos: selection.startPos,
                };
            }
        }
        selection.endPos.offset = selection.startPos.offset;
        return selection;
    }
    function _typeTextInElementNode(elementNode, text, offset) {
        var nodeForTyping = document.createTextNode(text);
        var textLength = text.length;
        var selectPosition = { node: nodeForTyping, offset: textLength };
        var parent = nativeMethods$a.nodeParentNodeGetter.call(elementNode);
        if (domUtils$7.getTagName(elementNode) === 'br')
            parent.insertBefore(nodeForTyping, elementNode);
        else if (offset > 0) {
            var childNodes = nativeMethods$a.nodeChildNodesGetter.call(elementNode);
            elementNode.insertBefore(nodeForTyping, childNodes[offset]);
        }
        else
            elementNode.appendChild(nodeForTyping);
        textSelection$1.selectByNodesAndOffsets(selectPosition, selectPosition);
    }
    function _typeTextInChildTextNode(element, selection, text) {
        var startNode = selection.startPos.node;
        // NOTE: startNode could be moved or deleted on textInput event. Need ensure startNode.
        if (!domUtils$7.isElementContainsNode(element, startNode)) {
            selection = _excludeInvisibleSymbolsFromSelection(_getSelectionInElement(element));
            startNode = selection.startPos.node;
        }
        var startOffset = selection.startPos.offset;
        var endOffset = selection.endPos.offset;
        var nodeValue = startNode.nodeValue;
        var selectPosition = { node: startNode, offset: startOffset + text.length };
        startNode.nodeValue = nodeValue.substring(0, startOffset) + text +
            nodeValue.substring(endOffset, nodeValue.length);
        textSelection$1.selectByNodesAndOffsets(selectPosition, selectPosition);
    }
    function _excludeInvisibleSymbolsFromSelection(selection) {
        var startNode = selection.startPos.node;
        var startOffset = selection.startPos.offset;
        var endOffset = selection.endPos.offset;
        var firstNonWhitespaceSymbolIndex = contentEditable$1.getFirstNonWhitespaceSymbolIndex(startNode.nodeValue);
        var lastNonWhitespaceSymbolIndex = contentEditable$1.getLastNonWhitespaceSymbolIndex(startNode.nodeValue);
        if (startOffset < firstNonWhitespaceSymbolIndex && startOffset !== 0) {
            selection.startPos.offset = firstNonWhitespaceSymbolIndex;
            selection.endPos.offset = endOffset + firstNonWhitespaceSymbolIndex - startOffset;
        }
        else if (endOffset > lastNonWhitespaceSymbolIndex && endOffset !== startNode.nodeValue.length) {
            selection.startPos.offset = startNode.nodeValue.length;
            selection.endPos.offset = endOffset + startNode.nodeValue.length - startOffset;
        }
        return selection;
    }
    // NOTE: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event
    // The `beforeInput` event is supported only in Chrome-based browsers and Safari
    // The order of events differs in Chrome and Safari:
    // In Chrome: `beforeinput` occurs before `textInput`
    // In Safari: `beforeinput` occurs after `textInput`
    function simulateBeforeInput(element, text, needSimulate) {
        if (needSimulate)
            return eventSimulator$9.beforeInput(element, text);
        return true;
    }
    // NOTE: Typing can be prevented in Chrome/Edge but can not be prevented in IE11 or Firefox
    // Firefox does not support TextInput event
    // Safari supports the TextInput event but has a bug: e.data is added to the node value.
    // So in Safari we need to call preventDefault in the last textInput handler but not prevent the Input event
    function simulateTextInput(element, text) {
        var forceInputInSafari;
        function onSafariTextInput(e) {
            e.preventDefault();
            forceInputInSafari = true;
        }
        function onSafariPreventTextInput(e) {
            if (e.type === 'textInput')
                forceInputInSafari = false;
        }
        if (browserUtils$8.isSafari) {
            listeners$4.addInternalEventBeforeListener(window, ['textInput'], onSafariTextInput);
            eventSandbox.on(eventSandbox.EVENT_PREVENTED_EVENT, onSafariPreventTextInput);
        }
        var isInputEventRequired = browserUtils$8.isFirefox || eventSimulator$9.textInput(element, text) || forceInputInSafari;
        if (browserUtils$8.isSafari) {
            listeners$4.removeInternalEventBeforeListener(window, ['textInput'], onSafariTextInput);
            eventSandbox.off(eventSandbox.EVENT_PREVENTED_EVENT, onSafariPreventTextInput);
        }
        return isInputEventRequired || browserUtils$8.isIE11;
    }
    function _typeTextToContentEditable(element, text) {
        var currentSelection = _getSelectionInElement(element);
        var startNode = currentSelection.startPos.node;
        var endNode = currentSelection.endPos.node;
        var needProcessInput = true;
        var needRaiseInputEvent = true;
        var textInputData = text;
        text = text.replace(WHITE_SPACES_RE, String.fromCharCode(160));
        // NOTE: some browsers raise the 'input' event after the element
        // content is changed, but in others we should do it manually.
        var onInput = function () {
            needRaiseInputEvent = false;
        };
        // NOTE: IE11 raises the 'textinput' event many times after the element changed.
        // The 'textinput' should be called only once
        function onTextInput(event, dispatched, preventEvent) {
            preventEvent();
        }
        // NOTE: IE11 does not raise input event when type to contenteditable
        var beforeContentChanged = function () {
            needProcessInput = simulateTextInput(element, textInputData);
            needRaiseInputEvent = needProcessInput && !browserUtils$8.isIE11;
            listeners$4.addInternalEventBeforeListener(window, ['input'], onInput);
            listeners$4.addInternalEventBeforeListener(window, ['textinput'], onTextInput);
        };
        var afterContentChanged = function () {
            nextTick()
                .then(function () {
                if (needRaiseInputEvent)
                    eventSimulator$9.input(element, text);
                listeners$4.removeInternalEventBeforeListener(window, ['input'], onInput);
                listeners$4.removeInternalEventBeforeListener(window, ['textinput'], onTextInput);
            });
        };
        if (!startNode || !endNode || !domUtils$7.isContentEditableElement(startNode) ||
            !domUtils$7.isContentEditableElement(endNode))
            return;
        if (!domUtils$7.isTheSameNode(startNode, endNode)) {
            textSelection$1.deleteSelectionContents(element);
            // NOTE: after deleting the selection contents we should refresh the stored startNode because
            // contentEditable element's content could change and we can no longer find parent elements
            // of the nodes. In MSEdge, 'parentElement' for the deleted element isn't undefined
            currentSelection = _updateSelectionAfterDeletionContent(element, currentSelection);
            startNode = currentSelection.startPos.node;
        }
        if (!startNode || !domUtils$7.isContentEditableElement(startNode) || !domUtils$7.isRenderedNode(startNode))
            return;
        if (!simulateBeforeInput(element, text, browserUtils$8.isChrome || browserUtils$8.isFirefox))
            return;
        beforeContentChanged();
        if (needProcessInput)
            needProcessInput = simulateBeforeInput(element, text, browserUtils$8.isSafari);
        if (needProcessInput) {
            // NOTE: we can type only to the text nodes; for nodes with the 'element-node' type, we use a special behavior
            if (domUtils$7.isElementNode(startNode))
                _typeTextInElementNode(startNode, text);
            else
                _typeTextInChildTextNode(element, _excludeInvisibleSymbolsFromSelection(currentSelection), text);
        }
        afterContentChanged();
    }
    function _typeTextToTextEditable(element, text) {
        var elementValue = domUtils$7.getElementValue(element);
        var textLength = text.length;
        var startSelection = textSelection$1.getSelectionStart(element);
        var endSelection = textSelection$1.getSelectionEnd(element);
        var isInputTypeNumber = domUtils$7.isInputElement(element) && element.type === 'number';
        if (!simulateBeforeInput(element, text, browserUtils$8.isChrome || browserUtils$8.isFirefox))
            return;
        var needProcessInput = simulateTextInput(element, text);
        if (needProcessInput)
            needProcessInput = simulateBeforeInput(element, text, browserUtils$8.isSafari);
        if (!needProcessInput)
            return;
        // NOTE: the 'maxlength' attribute doesn't work in all browsers. IE still doesn't support input with the 'number' type
        var elementMaxLength = !browserUtils$8.isIE && isInputTypeNumber ? null : parseInt(element.maxLength, 10);
        if (elementMaxLength < 0)
            elementMaxLength = browserUtils$8.isIE && browserUtils$8.version < 17 ? 0 : null;
        var newElementValue = elementValue.substring(0, startSelection) + text + elementValue.substring(endSelection, elementValue.length);
        if (elementMaxLength === null || isNaN(elementMaxLength) || elementMaxLength >= newElementValue.length) {
            // NOTE: B254013
            if (isInputTypeNumber && browserUtils$8.isIOS && elementValue[elementValue.length - 1] === '.') {
                startSelection += 1;
                endSelection += 1;
            }
            domUtils$7.setElementValue(element, newElementValue);
            textSelection$1.select(element, startSelection + textLength, startSelection + textLength);
        }
        // NOTE: We should simulate the 'input' event after typing a char (B253410, T138385)
        eventSimulator$9.input(element, text);
    }
    function _typeTextToNonTextEditable(element, text, caretPos) {
        if (caretPos !== null) {
            var elementValue = domUtils$7.getElementValue(element);
            domUtils$7.setElementValue(element, elementValue.substr(0, caretPos) + text + elementValue.substr(caretPos + text.length));
        }
        else
            domUtils$7.setElementValue(element, text);
        eventSimulator$9.change(element);
        eventSimulator$9.input(element, text);
    }
    function typeText (element, text, caretPos) {
        if (domUtils$7.isContentEditableElement(element))
            _typeTextToContentEditable(element, text);
        if (!domUtils$7.isElementReadOnly(element)) {
            if (domUtils$7.isTextEditableElement(element))
                _typeTextToTextEditable(element, text);
            else if (domUtils$7.isInputElement(element))
                _typeTextToNonTextEditable(element, text, caretPos);
        }
    }

    function isLetterKey (key) {
        return key.length === 1 && (key >= 'a' && key <= 'z' || key >= 'A' && key <= 'Z');
    }

    var nativeMethods$b = hammerhead__default.nativeMethods;
    var browserUtils$9 = hammerhead__default.utils.browser;
    var focusBlurSandbox$3 = hammerhead__default.eventSandbox.focusBlur;
    var Promise$8 = hammerhead__default.Promise;
    var isRadioButtonElement$1 = testCafeCore.domUtils.isRadioButtonElement, getActiveElement$1 = testCafeCore.domUtils.getActiveElement, getTabIndexAttributeIntValue = testCafeCore.domUtils.getTabIndexAttributeIntValue;
    function changeLetterCase(letter) {
        var isLowCase = letter === letter.toLowerCase();
        return isLowCase ? letter.toUpperCase() : letter.toLowerCase();
    }
    function getActualKeysAndEventKeyProperties(keyArray) {
        var eventKeyProperties = keyArray.slice();
        //NOTE: check 'shift' modifier in keys
        for (var i = 0; i < keyArray.length; i++) {
            var key = keyArray[i];
            if (key.toLowerCase() === 'shift') {
                var nextKey = keyArray[i + 1];
                if (!nextKey)
                    continue;
                if (testCafeCore.KEY_MAPS.shiftMap[nextKey])
                    keyArray[i + 1] = testCafeCore.KEY_MAPS.shiftMap[nextKey];
                else if (testCafeCore.KEY_MAPS.reversedShiftMap[nextKey])
                    eventKeyProperties[i + 1] = testCafeCore.KEY_MAPS.reversedShiftMap[nextKey];
            }
            if (testCafeCore.KEY_MAPS.shiftMap[key] && (!keyArray[i - 1] || keyArray[i - 1].toLowerCase() !== 'shift')) {
                keyArray[i] = testCafeCore.KEY_MAPS.shiftMap[key];
                keyArray.splice(i, 0, 'shift');
                eventKeyProperties.splice(i, 0, 'shift');
                i++;
            }
        }
        return { actualKeys: keyArray, eventKeyProperties: eventKeyProperties };
    }
    function getChar(key, shiftModified) {
        if (key === 'space')
            return ' ';
        if (shiftModified) {
            if (isLetterKey(key))
                return changeLetterCase(key);
            if (testCafeCore.KEY_MAPS.reversedShiftMap[key])
                return testCafeCore.KEY_MAPS.reversedShiftMap[key];
        }
        return key;
    }
    function getDeepActiveElement(currentDocument) {
        var doc = currentDocument || document;
        var activeElement = getActiveElement$1(doc);
        var activeElementInIframe = null;
        if (activeElement && testCafeCore.domUtils.isIframeElement(activeElement) &&
            nativeMethods$b.contentDocumentGetter.call(activeElement)) {
            try {
                activeElementInIframe = getDeepActiveElement(nativeMethods$b.contentDocumentGetter.call(activeElement));
            }
            catch (e) { // eslint-disable-line no-empty
            }
        }
        return activeElementInIframe || activeElement;
    }
    function focusNextElement(element, reverse, skipRadioGroups) {
        return new Promise$8(function (resolve) {
            var nextElement = getNextFocusableElement(element, reverse, skipRadioGroups);
            if (nextElement)
                focusBlurSandbox$3.focus(nextElement, function () { return resolve(nextElement); });
            else
                resolve();
        });
    }
    function getFocusableElementsFilter(sourceElement, skipRadioGroups) {
        var filter = null;
        if (skipRadioGroups) {
            // NOTE: in all browsers except Mozilla and Opera focus sets on one radio set from group only.
            // in Mozilla and Opera focus sets on any radio set.
            if (sourceElement.name !== '' && !browserUtils$9.isFirefox)
                filter = function (item) { return !item.name || item === sourceElement || item.name !== sourceElement.name; };
        }
        // NOTE arrow navigations works with radio buttons in all browsers only between radio buttons with same names
        // Navigation between radio buttons without name just moves focus between radio buttons in Chrome
        // In other browsers navigation between radio buttons without name does not work
        else if (sourceElement.name !== '')
            filter = function (item) { return isRadioButtonElement$1(item) && item.name === sourceElement.name; };
        else if (browserUtils$9.isChrome)
            filter = function (item) { return isRadioButtonElement$1(item) && !item.name; };
        return filter;
    }
    function filterFocusableElements(elements, sourceElement, skipRadioGroups) {
        if (!isRadioButtonElement$1(sourceElement))
            return elements;
        if (!skipRadioGroups && !sourceElement.name && !browserUtils$9.isChrome)
            return [sourceElement];
        var filterFn = getFocusableElementsFilter(sourceElement, skipRadioGroups);
        if (filterFn)
            elements = testCafeCore.arrayUtils.filter(elements, filterFn);
        return elements;
    }
    function correctFocusableElement(elements, element, skipRadioGroups) {
        var isNotCheckedRadioButtonElement = isRadioButtonElement$1(element) && element.name && !element.checked;
        var checkedRadioButtonElementWithSameName = null;
        if (skipRadioGroups && isNotCheckedRadioButtonElement) {
            checkedRadioButtonElementWithSameName = testCafeCore.arrayUtils.find(elements, function (el) {
                return isRadioButtonElement$1(el) && el.name === element.name && el.checked;
            });
        }
        return checkedRadioButtonElementWithSameName || element;
    }
    function activeElementHasNegativeTabIndex(doc) {
        var activeElement = nativeMethods$b.documentActiveElementGetter.call(doc);
        var activeElementTabIndex = activeElement && getTabIndexAttributeIntValue(activeElement);
        return activeElement && activeElementTabIndex < 0;
    }
    function getNextFocusableElement(element, reverse, skipRadioGroups) {
        var offset = reverse ? -1 : 1;
        var doc = testCafeCore.domUtils.getTopSameDomainWindow(window).document;
        var sort = !activeElementHasNegativeTabIndex(doc);
        var allFocusable = testCafeCore.domUtils.getFocusableElements(doc, sort);
        allFocusable = filterFocusableElements(allFocusable, element, skipRadioGroups);
        var isRadioInput = isRadioButtonElement$1(element);
        var currentIndex = testCafeCore.arrayUtils.indexOf(allFocusable, element);
        var isLastElementFocused = reverse ? currentIndex === 0 : currentIndex === allFocusable.length - 1;
        if (isLastElementFocused) {
            if (!reverse && element.tabIndex < 0)
                return testCafeCore.arrayUtils.find(allFocusable, function (el) { return el.tabIndex === 0; });
            return skipRadioGroups || !isRadioInput ? document.body : allFocusable[allFocusable.length - 1 - currentIndex];
        }
        if (reverse && currentIndex === -1)
            return allFocusable[allFocusable.length - 1];
        return correctFocusableElement(allFocusable, allFocusable[currentIndex + offset], skipRadioGroups);
    }

    function getKeyCode (char) {
        if (isLetterKey(char))
            return char.toUpperCase().charCodeAt(0);
        var res = testCafeCore.KEY_MAPS.shiftMap[char] ? testCafeCore.KEY_MAPS.shiftMap[char].charCodeAt(0) : char.charCodeAt(0);
        return testCafeCore.KEY_MAPS.symbolCharCodeToKeyCode[res] || res;
    }

    var KEY_IDENTIFIER_MAPS = {
        SPECIAL_KEYS: {
            capslock: 'CapsLock',
            delete: 'U+007F',
            end: 'End',
            enter: 'Enter',
            esc: 'U+001B',
            home: 'Home',
            ins: 'Insert',
            pagedown: 'PageDown',
            pageup: 'PageUp',
            space: 'U+0020',
            tab: 'Tab',
            alt: 'Alt',
            ctrl: 'Control',
            meta: 'Meta',
            shift: 'Shift',
        },
        LETTERS: {
            a: 'U+0041',
            b: 'U+0042',
            c: 'U+0043',
            d: 'U+0044',
            e: 'U+0045',
            f: 'U+0046',
            g: 'U+0047',
            h: 'U+0048',
            i: 'U+0049',
            j: 'U+004A',
            k: 'U+004B',
            l: 'U+004C',
            m: 'U+004D',
            n: 'U+004E',
            o: 'U+004F',
            p: 'U+0050',
            q: 'U+0051',
            r: 'U+0052',
            s: 'U+0053',
            t: 'U+0054',
            u: 'U+0055',
            v: 'U+0056',
            w: 'U+0057',
            x: 'U+0058',
            y: 'U+0059',
            z: 'U+005A',
        },
        SYMBOLS: {
            '0': 'U+0030',
            '1': 'U+0031',
            '2': 'U+0032',
            '3': 'U+0033',
            '4': 'U+0034',
            '5': 'U+0035',
            '6': 'U+0036',
            '7': 'U+0037',
            '8': 'U+0038',
            '9': 'U+0039',
            ' ': 'U+0020',
            '!': 'U+0021',
            '@': 'U+0040',
            '#': 'U+0023',
            '$': 'U+0024',
            '%': 'U+0025',
            '^': 'U+005E',
            '*': 'U+002A',
            '(': 'U+0028',
            ')': 'U+0029',
            '_': 'U+005F',
            '|': 'U+007C',
            '\\': 'U+005C',
            '/': 'U+002F',
            '?': 'U+003F',
            '.': 'U+002E',
            ',': 'U+002C',
            '<': 'U+003C',
            '>': 'U+003E',
            '[': 'U+005B',
            ']': 'U+005D',
            '{': 'U+007B',
            '}': 'U+007D',
            '??': 'U+00A7',
            '??': 'U+00B1',
            '\'': 'U+0027',
            '"': 'U+0022',
            ':': 'U+003A',
            ';': 'U+003B',
            '`': 'U+0060',
            '~': 'U+007E',
        },
    };

    function getKeyIdentifier(char) {
        if (isLetterKey(char))
            return KEY_IDENTIFIER_MAPS.LETTERS[char.toLowerCase()];
        return KEY_IDENTIFIER_MAPS.SYMBOLS[char] || KEY_IDENTIFIER_MAPS.SPECIAL_KEYS[char] || char;
    }

    function getKeyProperties(isKeyPressEvent, key, keyIdentifier) {
        var properties = {};
        if ('keyIdentifier' in KeyboardEvent.prototype)
            properties.keyIdentifier = isKeyPressEvent ? '' : keyIdentifier;
        if ('key' in KeyboardEvent.prototype)
            properties.key = key;
        return properties;
    }

    var browserUtils$a = hammerhead__default.utils.browser;
    var extend$2 = hammerhead__default.utils.extend;
    var eventSimulator$a = hammerhead__default.eventSandbox.eventSimulator;
    var KeyPressSimulator = /** @class */ (function () {
        function KeyPressSimulator(key, eventKeyProperty) {
            this.isLetter = isLetterKey(key);
            this.isChar = key.length === 1 || key === 'space';
            this.sanitizedKey = testCafeCore.getSanitizedKey(key);
            this.modifierKeyCode = testCafeCore.KEY_MAPS.modifiers[this.sanitizedKey];
            this.specialKeyCode = testCafeCore.KEY_MAPS.specialKeys[this.sanitizedKey];
            this.keyCode = null;
            this.keyIdentifierProperty = getKeyIdentifier(eventKeyProperty);
            this.topSameDomainDocument = testCafeCore.domUtils.getTopSameDomainWindow(window).document;
            this.keyProperty = testCafeCore.KEY_MAPS.keyProperty[eventKeyProperty] || eventKeyProperty;
            if (this.isChar && key !== 'space')
                this.keyCode = getKeyCode(this.sanitizedKey);
            else if (this.modifierKeyCode)
                this.keyCode = this.modifierKeyCode;
            else if (this.specialKeyCode)
                this.keyCode = this.specialKeyCode;
            this.storedActiveElement = null;
        }
        KeyPressSimulator._isKeyActivatedInputElement = function (el) {
            return testCafeCore.domUtils.isInputElement(el) && /button|submit|reset|radio|checkbox/.test(el.type);
        };
        KeyPressSimulator.prototype._type = function (element, char) {
            var elementChanged = element !== this.storedActiveElement;
            var shouldType = !elementChanged;
            var elementForTyping = element;
            var isActiveElementEditable = testCafeCore.domUtils.isEditableElement(element);
            var isStoredElementEditable = testCafeCore.domUtils.isEditableElement(this.storedActiveElement);
            // Unnecessary typing happens if an element was changed after the keydown/keypress event (T210448)
            // In IE, this error may occur when we try to determine if the removed element is in an iframe
            try {
                if (elementChanged) {
                    var isActiveElementInIframe = testCafeCore.domUtils.isElementInIframe(element);
                    var isStoredElementInIframe = testCafeCore.domUtils.isElementInIframe(this.storedActiveElement);
                    var shouldTypeInWebKit = isActiveElementInIframe === isStoredElementInIframe || isStoredElementEditable;
                    shouldType = (!browserUtils$a.isFirefox || isStoredElementEditable) &&
                        (!browserUtils$a.isWebKit || shouldTypeInWebKit);
                }
            }
            /*eslint-disable no-empty */
            catch (err) {
            }
            /*eslint-disable no-empty */
            if (shouldType) {
                if (!browserUtils$a.isIE && elementChanged && isStoredElementEditable && isActiveElementEditable)
                    elementForTyping = this.storedActiveElement;
                typeText(elementForTyping, char);
            }
        };
        KeyPressSimulator.prototype._addKeyPropertyToEventOptions = function (eventOptions) {
            extend$2(eventOptions, getKeyProperties(eventOptions.type === 'keypress', this.keyProperty, this.keyIdentifierProperty));
            return eventOptions;
        };
        KeyPressSimulator.prototype.down = function (modifiersState) {
            this.storedActiveElement = getDeepActiveElement(this.topSameDomainDocument);
            if (this.modifierKeyCode)
                modifiersState[this.sanitizedKey] = true;
            if (modifiersState.shift && this.isLetter)
                this.keyProperty = changeLetterCase(this.keyProperty);
            var eventOptions = { keyCode: this.keyCode, type: 'keydown' };
            this._addKeyPropertyToEventOptions(eventOptions);
            return eventSimulator$a.keydown(this.storedActiveElement, extend$2(eventOptions, modifiersState));
        };
        KeyPressSimulator.prototype.press = function (modifiersState) {
            if (!(this.isChar || this.specialKeyCode))
                return true;
            var activeElement = getDeepActiveElement(this.topSameDomainDocument);
            var character = this.isChar ? getChar(this.sanitizedKey, modifiersState.shift) : null;
            var charCode = this.specialKeyCode || character.charCodeAt(0);
            var elementChanged = activeElement !== this.storedActiveElement;
            if (browserUtils$a.isWebKit && elementChanged) {
                var isActiveElementInIframe = testCafeCore.domUtils.isElementInIframe(activeElement);
                var isStoredElementInIframe = testCafeCore.domUtils.isElementInIframe(this.storedActiveElement);
                if (isActiveElementInIframe !== isStoredElementInIframe)
                    return true;
            }
            this.storedActiveElement = activeElement;
            var eventOptions = { keyCode: charCode, charCode: charCode, type: 'keypress' };
            this._addKeyPropertyToEventOptions(eventOptions);
            var raiseDefault = browserUtils$a.isAndroid || eventSimulator$a.keypress(activeElement, extend$2(eventOptions, modifiersState));
            if (!raiseDefault)
                return raiseDefault;
            activeElement = getDeepActiveElement(this.topSameDomainDocument);
            if (character && !(modifiersState.ctrl || modifiersState.alt))
                this._type(activeElement, character);
            var isKeyActivatedInput = KeyPressSimulator._isKeyActivatedInputElement(activeElement);
            var isButton = testCafeCore.domUtils.isButtonElement(activeElement);
            var isSafariWithAutoRaisedClick = browserUtils$a.isSafari &&
                browserUtils$a.compareVersions([browserUtils$a.webkitVersion, '603.1.30']) >= 0;
            var isKeyActivatedInputInFirefox = browserUtils$a.isFirefox && isKeyActivatedInput;
            var raiseClickOnEnter = (!browserUtils$a.isFirefox || isKeyActivatedInputInFirefox) && !isSafariWithAutoRaisedClick
                && (isKeyActivatedInput || isButton);
            if (raiseClickOnEnter && this.sanitizedKey === 'enter')
                activeElement.click();
            return raiseDefault;
        };
        KeyPressSimulator.prototype.up = function (modifiersState) {
            if (this.modifierKeyCode)
                modifiersState[this.sanitizedKey] = false;
            var eventOptions = { keyCode: this.keyCode, type: 'keyup' };
            this._addKeyPropertyToEventOptions(eventOptions);
            var raiseDefault = eventSimulator$a.keyup(getDeepActiveElement(this.topSameDomainDocument), extend$2(eventOptions, modifiersState));
            var activeElement = getDeepActiveElement(this.topSameDomainDocument);
            // NOTE: in some browsers we should emulate click on active input element while pressing "space" key
            var emulateClick = !browserUtils$a.isFirefox && !browserUtils$a.isSafari &&
                (!browserUtils$a.isChrome || browserUtils$a.version >= 53);
            if (emulateClick && raiseDefault && this.sanitizedKey === 'space' &&
                KeyPressSimulator._isKeyActivatedInputElement(activeElement))
                activeElement.click();
            return raiseDefault;
        };
        Object.defineProperty(KeyPressSimulator.prototype, "key", {
            get: function () {
                return this.sanitizedKey;
            },
            enumerable: false,
            configurable: true
        });
        return KeyPressSimulator;
    }());

    var SHORTCUT_TYPE = {
        ctrlA: 'ctrl+a',
        backspace: 'backspace',
        delete: 'delete',
        left: 'left',
        right: 'right',
        up: 'up',
        down: 'down',
        shiftLeft: 'shift+left',
        shiftRight: 'shift+right',
        shiftUp: 'shift+up',
        shiftDown: 'shift+down',
        shiftHome: 'shift+home',
        shiftEnd: 'shift+end',
        home: 'home',
        end: 'end',
        enter: 'enter',
        tab: 'tab',
        shiftTab: 'shift+tab',
        esc: 'esc',
    };

    var _a;
    var Promise$9 = hammerhead__default.Promise;
    var browserUtils$b = hammerhead__default.utils.browser;
    var eventSimulator$b = hammerhead__default.eventSandbox.eventSimulator;
    var elementEditingWatcher = hammerhead__default.eventSandbox.elementEditingWatcher;
    var textSelection$2 = testCafeCore__default.textSelection;
    var eventUtils$4 = testCafeCore__default.eventUtils;
    var domUtils$8 = testCafeCore__default.domUtils;
    var selectElement = testCafeUI.selectElement;
    var currentTextarea = null;
    var currentTextareaCursorIndent = null;
    function onTextAreaBlur() {
        currentTextarea = null;
        currentTextareaCursorIndent = null;
        eventUtils$4.unbind(this, 'blur', onTextAreaBlur, true);
    }
    function updateTextAreaIndent(element) {
        if (domUtils$8.isTextAreaElement(element)) {
            if (currentTextarea !== element) {
                eventUtils$4.bind(element, 'blur', onTextAreaBlur, true);
                currentTextarea = element;
            }
            currentTextareaCursorIndent = getLineIndentInTextarea(element);
        }
    }
    function getLineIndentInTextarea(textarea) {
        var inverseSelection = textSelection$2.hasInverseSelection(textarea);
        var textareaValue = domUtils$8.getTextAreaValue(textarea);
        var cursorPosition = inverseSelection ?
            textSelection$2.getSelectionStart(textarea) :
            textSelection$2.getSelectionEnd(textarea);
        if (!textareaValue || !cursorPosition)
            return 0;
        return domUtils$8.getTextareaIndentInLine(textarea, cursorPosition);
    }
    function moveTextAreaCursorUp(element, withSelection) {
        var textareaValue = domUtils$8.getTextAreaValue(element);
        if (!textareaValue)
            return;
        var startPos = textSelection$2.getSelectionStart(element);
        var endPos = textSelection$2.getSelectionEnd(element);
        var hasInverseSelection = textSelection$2.hasInverseSelection(element);
        var partBeforeCursor = textareaValue.substring(0, hasInverseSelection ? startPos : endPos);
        var lastLineBreakIndex = partBeforeCursor.lastIndexOf('\n');
        var partBeforeLastLineBreak = partBeforeCursor.substring(0, lastLineBreakIndex);
        if (currentTextareaCursorIndent === null || currentTextarea !== element)
            updateTextAreaIndent(element);
        lastLineBreakIndex = partBeforeLastLineBreak.lastIndexOf('\n');
        var newPosition = Math.min(lastLineBreakIndex + 1 + currentTextareaCursorIndent, partBeforeLastLineBreak.length);
        moveTextAreaCursor(element, startPos, endPos, hasInverseSelection, newPosition, withSelection);
    }
    function moveTextAreaCursorDown(element, withSelection) {
        var textareaValue = domUtils$8.getTextAreaValue(element);
        if (!textareaValue)
            return;
        var startPos = textSelection$2.getSelectionStart(element);
        var endPos = textSelection$2.getSelectionEnd(element);
        var hasInverseSelection = textSelection$2.hasInverseSelection(element);
        var cursorPosition = hasInverseSelection ? startPos : endPos;
        var partAfterCursor = textareaValue.substring(cursorPosition);
        var firstLineBreakIndex = partAfterCursor.indexOf('\n');
        var nextLineStartIndex = firstLineBreakIndex === -1 ? partAfterCursor.length : firstLineBreakIndex + 1;
        var partAfterNewIndent = partAfterCursor.substring(nextLineStartIndex);
        var newPosition = cursorPosition + nextLineStartIndex;
        firstLineBreakIndex = partAfterNewIndent.indexOf('\n');
        var maxIndent = firstLineBreakIndex === -1 ? partAfterNewIndent.length : firstLineBreakIndex;
        if (currentTextareaCursorIndent === null || currentTextarea !== element)
            updateTextAreaIndent(element);
        newPosition = Math.min(newPosition + currentTextareaCursorIndent, newPosition + maxIndent);
        moveTextAreaCursor(element, startPos, endPos, hasInverseSelection, newPosition, withSelection);
    }
    function moveTextAreaCursor(element, startPos, endPos, hasInverseSelection, newPosition, withSelection) {
        var newStart = null;
        var newEnd = null;
        if (withSelection) {
            if (startPos === endPos) {
                newStart = startPos;
                newEnd = newPosition;
            }
            else if (!hasInverseSelection) {
                newStart = startPos;
                newEnd = newPosition;
            }
            else {
                newStart = endPos;
                newEnd = newPosition;
            }
        }
        else
            newEnd = newStart = newPosition;
        textSelection$2.select(element, newStart, newEnd);
    }
    function setElementValue(element, value, position) {
        if (domUtils$8.isInputElement(element) && element.type === 'number') {
            if (value.charAt(0) === '-' && value.charAt(1) === '.')
                value = value.substring(1);
            if (value.charAt(value.length - 1) === '.')
                value = value.substring(0, value.length - 1);
        }
        domUtils$8.setElementValue(element, value);
        textSelection$2.select(element, position, position);
        eventSimulator$b.input(element);
    }
    function submitFormOnEnterPressInInput(form, inputElement) {
        var buttons = form.querySelectorAll('input, button');
        var submitButton = null;
        var i = null;
        for (i = 0; i < buttons.length; i++) {
            if (!submitButton && buttons[i].type === 'submit' && !buttons[i].disabled) {
                submitButton = buttons[i];
                break;
            }
        }
        if (submitButton)
            eventSimulator$b.click(submitButton);
        else if (domUtils$8.blocksImplicitSubmission(inputElement)) {
            var formInputs = form.getElementsByTagName('input');
            var textInputs = [];
            for (i = 0; i < formInputs.length; i++) {
                if (domUtils$8.blocksImplicitSubmission(formInputs[i]))
                    textInputs.push(formInputs[i]);
            }
            // NOTE: the form is submitted on enter press if there is only one input of the following types on it
            //  and this input is focused (http://www.w3.org/TR/html5/forms.html#implicit-submission)
            if (textInputs.length === 1 && textInputs[0] === inputElement) {
                var isInputValid = inputElement.validity.valid;
                if (isInputValid && eventSimulator$b.submit(form))
                    form.submit();
            }
        }
    }
    //shortcuts
    function selectAll(element) {
        if (domUtils$8.isEditableElement(element))
            textSelection$2.select(element);
        return Promise$9.resolve();
    }
    function backspace(element) {
        if (domUtils$8.isTextEditableElementAndEditingAllowed(element)) {
            var startPos = textSelection$2.getSelectionStart(element);
            var endPos = textSelection$2.getSelectionEnd(element);
            var value = domUtils$8.getElementValue(element).replace(/\r\n/g, '\n');
            if (endPos === startPos) {
                if (startPos > 0) {
                    setElementValue(element, value.substring(0, startPos - 1) +
                        value.substring(endPos, value.length), startPos - 1);
                }
            }
            else
                setElementValue(element, value.substring(0, startPos) + value.substring(endPos, value.length), startPos);
        }
        if (domUtils$8.isContentEditableElement(element))
            textSelection$2.deleteSelectionContents(element);
        return Promise$9.resolve();
    }
    function del(element) {
        if (domUtils$8.isTextEditableElementAndEditingAllowed(element)) {
            var startPos = textSelection$2.getSelectionStart(element);
            var endPos = textSelection$2.getSelectionEnd(element);
            var value = domUtils$8.getElementValue(element).replace(/\r\n/g, '\n');
            if (endPos === startPos) {
                if (startPos < value.length) {
                    setElementValue(element, value.substring(0, startPos) +
                        value.substring(endPos + 1, value.length), startPos);
                }
            }
            else {
                setElementValue(element, value.substring(0, startPos) +
                    value.substring(endPos, value.length), startPos);
            }
        }
        if (domUtils$8.isContentEditableElement(element))
            textSelection$2.deleteSelectionContents(element);
        return Promise$9.resolve();
    }
    function left(element) {
        var startPosition = null;
        var endPosition = null;
        if (domUtils$8.isSelectElement(element))
            selectElement.switchOptionsByKeys(element, 'left');
        if (isRadioButtonNavigationRequired(element))
            return focusAndCheckNextRadioButton(element, true);
        if (domUtils$8.isTextEditableElement(element)) {
            startPosition = textSelection$2.getSelectionStart(element) || 0;
            endPosition = textSelection$2.getSelectionEnd(element);
            var newPosition = startPosition === endPosition ? startPosition - 1 : startPosition;
            textSelection$2.select(element, newPosition, newPosition);
            updateTextAreaIndent(element);
        }
        if (domUtils$8.isContentEditableElement(element)) {
            startPosition = textSelection$2.getSelectionStart(element);
            endPosition = textSelection$2.getSelectionEnd(element);
            // NOTE: we only remove selection
            if (startPosition !== endPosition) {
                var selection = textSelection$2.getSelectionByElement(element);
                var inverseSelection = textSelection$2.hasInverseSelectionContentEditable(element);
                var startNode = inverseSelection ? selection.focusNode : selection.anchorNode;
                var startOffset = inverseSelection ? selection.focusOffset : selection.anchorOffset;
                var startPos = { node: startNode, offset: startOffset };
                textSelection$2.selectByNodesAndOffsets(startPos, startPos, true);
            }
        }
        return Promise$9.resolve();
    }
    function right(element) {
        var startPosition = null;
        var endPosition = null;
        if (domUtils$8.isSelectElement(element))
            selectElement.switchOptionsByKeys(element, 'right');
        if (isRadioButtonNavigationRequired(element))
            return focusAndCheckNextRadioButton(element, false);
        if (domUtils$8.isTextEditableElement(element)) {
            startPosition = textSelection$2.getSelectionStart(element);
            endPosition = textSelection$2.getSelectionEnd(element);
            var newPosition = startPosition === endPosition ? endPosition + 1 : endPosition;
            if (startPosition === domUtils$8.getElementValue(element).length)
                newPosition = startPosition;
            textSelection$2.select(element, newPosition, newPosition);
            updateTextAreaIndent(element);
        }
        if (domUtils$8.isContentEditableElement(element)) {
            startPosition = textSelection$2.getSelectionStart(element);
            endPosition = textSelection$2.getSelectionEnd(element);
            //NOTE: we only remove selection
            if (startPosition !== endPosition) {
                var selection = textSelection$2.getSelectionByElement(element);
                var inverseSelection = textSelection$2.hasInverseSelectionContentEditable(element);
                var endNode = inverseSelection ? selection.anchorNode : selection.focusNode;
                var endOffset = inverseSelection ? selection.anchorOffset : selection.focusOffset;
                var startPos = { node: endNode, offset: endOffset };
                textSelection$2.selectByNodesAndOffsets(startPos, startPos, true);
            }
        }
        return Promise$9.resolve();
    }
    function up(element) {
        if (domUtils$8.isSelectElement(element))
            selectElement.switchOptionsByKeys(element, 'up');
        if (isRadioButtonNavigationRequired(element))
            return focusAndCheckNextRadioButton(element, true);
        if (browserUtils$b.isWebKit && domUtils$8.isInputElement(element))
            return home(element);
        if (domUtils$8.isTextAreaElement(element))
            moveTextAreaCursorUp(element, false);
        return Promise$9.resolve();
    }
    function down(element) {
        if (domUtils$8.isSelectElement(element))
            selectElement.switchOptionsByKeys(element, 'down');
        if (isRadioButtonNavigationRequired(element))
            return focusAndCheckNextRadioButton(element, false);
        if (browserUtils$b.isWebKit && domUtils$8.isInputElement(element))
            return end(element);
        if (domUtils$8.isTextAreaElement(element))
            moveTextAreaCursorDown(element, false);
        return Promise$9.resolve();
    }
    function home(element, withSelection) {
        if (domUtils$8.isTextEditableElement(element)) {
            var startPos = textSelection$2.getSelectionStart(element);
            var endPos = textSelection$2.getSelectionEnd(element);
            var inverseSelection = textSelection$2.hasInverseSelection(element);
            var referencePosition = null;
            var isSingleLineSelection = !domUtils$8.isTextAreaElement(element) ? true :
                domUtils$8.getTextareaLineNumberByPosition(element, startPos) ===
                    domUtils$8.getTextareaLineNumberByPosition(element, endPos);
            if (isSingleLineSelection)
                referencePosition = inverseSelection ? endPos : startPos;
            else
                referencePosition = inverseSelection ? startPos : endPos;
            var valueBeforeCursor = domUtils$8.getElementValue(element).substring(0, referencePosition);
            var lastLineBreakIndex = valueBeforeCursor.lastIndexOf('\n');
            var newPosition = lastLineBreakIndex === -1 ? 0 : lastLineBreakIndex + 1;
            var newStartPos = null;
            var newEndPos = null;
            if (isSingleLineSelection) {
                newStartPos = newPosition;
                newEndPos = withSelection ? referencePosition : newPosition;
                textSelection$2.select(element, newEndPos, newStartPos);
            }
            else if (!inverseSelection)
                textSelection$2.select(element, startPos, newPosition);
            else
                textSelection$2.select(element, endPos, newPosition);
        }
        return Promise$9.resolve();
    }
    function end(element, withSelection) {
        if (domUtils$8.isTextEditableElement(element)) {
            var startPos = textSelection$2.getSelectionStart(element);
            var endPos = textSelection$2.getSelectionEnd(element);
            var inverseSelection = textSelection$2.hasInverseSelection(element);
            var referencePosition = null;
            var isSingleLineSelection = !domUtils$8.isTextAreaElement(element) ? true :
                domUtils$8.getTextareaLineNumberByPosition(element, startPos) ===
                    domUtils$8.getTextareaLineNumberByPosition(element, endPos);
            if (isSingleLineSelection)
                referencePosition = inverseSelection ? endPos : startPos;
            else
                referencePosition = inverseSelection ? startPos : endPos;
            var valueAsterCursor = domUtils$8.getElementValue(element).substring(referencePosition);
            var firstLineBreakIndex = valueAsterCursor.indexOf('\n');
            var newPosition = referencePosition;
            var newStartPos = null;
            var newEndPos = null;
            newPosition += firstLineBreakIndex === -1 ? valueAsterCursor.length : firstLineBreakIndex;
            if (isSingleLineSelection) {
                newStartPos = withSelection ? referencePosition : newPosition;
                newEndPos = newPosition;
                textSelection$2.select(element, newStartPos, newEndPos);
            }
            else if (!inverseSelection)
                textSelection$2.select(element, startPos, newPosition);
            else
                textSelection$2.select(element, endPos, newPosition);
        }
        return Promise$9.resolve();
    }
    function esc(element) {
        if (domUtils$8.isSelectElement(element))
            selectElement.collapseOptionList();
        return Promise$9.resolve();
    }
    function shiftUp(element) {
        if (browserUtils$b.isWebKit && domUtils$8.isInputElement(element))
            return shiftHome(element);
        if (domUtils$8.isTextAreaElement(element))
            moveTextAreaCursorUp(element, true);
        return Promise$9.resolve();
    }
    function shiftDown(element) {
        if (browserUtils$b.isWebKit && domUtils$8.isInputElement(element))
            return shiftEnd(element);
        if (domUtils$8.isTextAreaElement(element))
            moveTextAreaCursorDown(element, true);
        return Promise$9.resolve();
    }
    function shiftLeft(element) {
        if (domUtils$8.isTextEditableElement(element)) {
            var startPos = textSelection$2.getSelectionStart(element);
            var endPos = textSelection$2.getSelectionEnd(element);
            if (startPos === endPos || textSelection$2.hasInverseSelection(element))
                textSelection$2.select(element, endPos, Math.max(startPos - 1, 0));
            else
                textSelection$2.select(element, startPos, Math.max(endPos - 1, 0));
            updateTextAreaIndent(element);
        }
        return Promise$9.resolve();
    }
    function shiftRight(element) {
        if (domUtils$8.isTextEditableElement(element)) {
            var startPos = textSelection$2.getSelectionStart(element);
            var endPos = textSelection$2.getSelectionEnd(element);
            var valueLength = domUtils$8.getElementValue(element).length;
            if (startPos === endPos || !textSelection$2.hasInverseSelection(element))
                textSelection$2.select(element, startPos, Math.min(endPos + 1, valueLength));
            else
                textSelection$2.select(element, endPos, Math.min(startPos + 1, valueLength));
            updateTextAreaIndent(element);
        }
        return Promise$9.resolve();
    }
    function shiftHome(element) {
        return home(element, true);
    }
    function shiftEnd(element) {
        return end(element, true);
    }
    function enter(element) {
        if (domUtils$8.isSelectElement(element))
            selectElement.collapseOptionList();
        //submit form on enter pressed
        if (domUtils$8.isInputElement(element)) {
            if (!browserUtils$b.isIE)
                elementEditingWatcher.processElementChanging(element);
            var form = domUtils$8.getParents(element, 'form')[0];
            // NOTE: if a user presses enter when a form input is focused and the form has
            // a submit button, the browser sends the click event to the submit button
            if (form)
                submitFormOnEnterPressInInput(form, element);
        }
        else if (domUtils$8.isTextAreaElement(element)) {
            var startPos = textSelection$2.getSelectionStart(element);
            var value = domUtils$8.getTextAreaValue(element);
            var valueBeforeCursor = value.substring(0, startPos);
            var valueAfterCursor = value.substring(startPos);
            var newPosition = startPos + 1;
            setElementValue(element, valueBeforeCursor + String.fromCharCode(10) + valueAfterCursor, newPosition);
        }
        //S173120
        else if (element.tagName && domUtils$8.isAnchorElement(element))
            eventSimulator$b.click(element);
        return Promise$9.resolve();
    }
    function isRadioButtonNavigationRequired(element) {
        return domUtils$8.isRadioButtonElement(element);
    }
    function focusAndCheckNextRadioButton(element, reverse) {
        return focusNextElementOnNavigationButton(element, reverse, false)
            .then(function (focusedElement) {
            if (focusedElement)
                focusedElement.checked = true;
        });
    }
    function focusNextElementOnNavigationButton(element, reverse, skipRadioGroups) {
        if (skipRadioGroups === void 0) { skipRadioGroups = true; }
        if (!element)
            return Promise$9.resolve();
        if (domUtils$8.isSelectElement(element))
            selectElement.collapseOptionList();
        return focusNextElement(element, reverse, skipRadioGroups)
            .then(function (nextElement) {
            if (nextElement && domUtils$8.isTextEditableInput(nextElement))
                textSelection$2.select(nextElement);
            return nextElement;
        });
    }
    var supportedShortcutHandlers = (_a = {},
        _a[SHORTCUT_TYPE.ctrlA] = selectAll,
        _a[SHORTCUT_TYPE.backspace] = backspace,
        _a[SHORTCUT_TYPE.delete] = del,
        _a[SHORTCUT_TYPE.left] = left,
        _a[SHORTCUT_TYPE.right] = right,
        _a[SHORTCUT_TYPE.up] = up,
        _a[SHORTCUT_TYPE.down] = down,
        _a[SHORTCUT_TYPE.shiftLeft] = shiftLeft,
        _a[SHORTCUT_TYPE.shiftRight] = shiftRight,
        _a[SHORTCUT_TYPE.shiftUp] = shiftUp,
        _a[SHORTCUT_TYPE.shiftDown] = shiftDown,
        _a[SHORTCUT_TYPE.shiftHome] = shiftHome,
        _a[SHORTCUT_TYPE.shiftEnd] = shiftEnd,
        _a[SHORTCUT_TYPE.home] = home,
        _a[SHORTCUT_TYPE.end] = end,
        _a[SHORTCUT_TYPE.enter] = enter,
        _a[SHORTCUT_TYPE.tab] = function (element) { return focusNextElementOnNavigationButton(element, false); },
        _a[SHORTCUT_TYPE.shiftTab] = function (element) { return focusNextElementOnNavigationButton(element, true); },
        _a[SHORTCUT_TYPE.esc] = esc,
        _a);

    var Promise$a = hammerhead__default.Promise;
    var browserUtils$c = hammerhead__default.utils.browser;
    var messageSandbox$3 = hammerhead__default.eventSandbox.message;
    var nativeMethods$c = hammerhead__default.nativeMethods;
    var PRESS_REQUEST_CMD = 'automation|press|request';
    var PRESS_RESPONSE_CMD = 'automation|press|response';
    // Setup cross-iframe interaction
    messageSandbox$3.on(messageSandbox$3.SERVICE_MSG_RECEIVED_EVENT, function (e) {
        if (e.message.cmd === PRESS_REQUEST_CMD) {
            hammerhead__default.on(hammerhead__default.EVENTS.beforeUnload, function () { return messageSandbox$3.sendServiceMsg({ cmd: PRESS_RESPONSE_CMD }, e.source); });
            var pressAutomation = new PressAutomation(e.message.keyCombinations, e.message.options);
            pressAutomation
                .run()
                .then(function () { return messageSandbox$3.sendServiceMsg({ cmd: PRESS_RESPONSE_CMD }, e.source); });
        }
    });
    var PressAutomation = /** @class */ (function () {
        function PressAutomation(keyCombinations, options) {
            this.keyCombinations = keyCombinations;
            this.isSelectElement = false;
            this.pressedKeyString = '';
            this.modifiersState = null;
            this.shortcutHandlers = null;
            this.topSameDomainDocument = testCafeCore.domUtils.getTopSameDomainWindow(window).document;
            this.automationSettings = new AutomationSettings(options.speed);
            this.options = options;
        }
        PressAutomation._getKeyPressSimulators = function (keyCombination) {
            var keysArray = testCafeCore.getKeyArray(keyCombination);
            // NOTE: symbols may have the same keyCode, but their "event.key" will be different, so we
            // need to get the "event.key" property for each key, and add the 'shift' key where needed.
            var _a = getActualKeysAndEventKeyProperties(keysArray), actualKeys = _a.actualKeys, eventKeyProperties = _a.eventKeyProperties;
            return testCafeCore.arrayUtils.map(actualKeys, function (key, index) { return new KeyPressSimulator(key, eventKeyProperties[index]); });
        };
        PressAutomation._getShortcuts = function (keyCombination) {
            var keys = testCafeCore.getKeyArray(keyCombination.toLowerCase());
            var shortcuts = [];
            var curFullCombination = [];
            var curCombination = [];
            for (var i = 0; i < keys.length; i++) {
                curFullCombination.push(keys[i]);
                curCombination = curFullCombination.slice();
                while (curCombination.length) {
                    var keyString = curCombination.join('+');
                    if (supportedShortcutHandlers[keyString]) {
                        shortcuts.push(keyString);
                        curFullCombination = curCombination = [];
                    }
                    else
                        curCombination.shift();
                }
            }
            return shortcuts;
        };
        PressAutomation._getShortcutHandlers = function (keyCombination) {
            var shortcuts = PressAutomation._getShortcuts(keyCombination.toLowerCase());
            var shortcutHandlers = {};
            var stringWithShortcut = '';
            var shortcut = null;
            var shortcutPosition = null;
            var shortcutLength = null;
            for (var i = 0; i < shortcuts.length; i++) {
                shortcut = shortcuts[i];
                shortcutPosition = keyCombination.indexOf(shortcut);
                shortcutLength = shortcut.length;
                stringWithShortcut += keyCombination.substring(0, shortcutPosition + shortcutLength);
                shortcutHandlers[stringWithShortcut] = supportedShortcutHandlers[shortcut];
                keyCombination = keyCombination.substring(shortcutPosition + shortcutLength);
            }
            return shortcutHandlers;
        };
        PressAutomation.prototype._down = function (keyPressSimulator) {
            this.pressedKeyString += (this.pressedKeyString ? '+' : '') + keyPressSimulator.key;
            var keyDownPrevented = !keyPressSimulator.down(this.modifiersState);
            return Promise$a.resolve(keyDownPrevented);
        };
        PressAutomation.prototype._press = function (keyPressSimulator, keyEventPrevented) {
            var _this = this;
            // NOTE: preventing the 'keydown' and 'keypress' events for the select element does not
            // affect the assignment of the new selectedIndex. So, we should execute a shortcut
            // for the select element without taking into account that 'key' events are suppressed
            if (keyEventPrevented && !this.isSelectElement)
                return testCafeCore.delay(this.automationSettings.keyActionStepDelay);
            var currentShortcutHandler = this.shortcutHandlers[this.pressedKeyString];
            var keyPressPrevented = false;
            // NOTE: B254435
            if (!currentShortcutHandler || browserUtils$c.isFirefox || keyPressSimulator.key === 'enter')
                keyPressPrevented = !keyPressSimulator.press(this.modifiersState);
            if ((!keyPressPrevented || this.isSelectElement) && currentShortcutHandler) {
                return currentShortcutHandler(getDeepActiveElement(this.topSameDomainDocument))
                    .then(function () { return testCafeCore.delay(_this.automationSettings.keyActionStepDelay); });
            }
            return testCafeCore.delay(this.automationSettings.keyActionStepDelay);
        };
        PressAutomation.prototype._up = function (keyPressSimulator) {
            keyPressSimulator.up(this.modifiersState);
            return testCafeCore.delay(this.automationSettings.keyActionStepDelay);
        };
        PressAutomation.prototype._runCombination = function (keyCombination) {
            var _this = this;
            this.modifiersState = { ctrl: false, alt: false, shift: false, meta: false };
            this.isSelectElement = testCafeCore.domUtils.isSelectElement(getDeepActiveElement(this.topSameDomainDocument));
            this.pressedKeyString = '';
            this.shortcutHandlers = PressAutomation._getShortcutHandlers(keyCombination);
            var keyPressSimulators = PressAutomation._getKeyPressSimulators(keyCombination);
            return testCafeCore.promiseUtils.each(keyPressSimulators, function (keySimulator) {
                return _this
                    ._down(keySimulator)
                    .then(function (keyEventPrevented) { return _this._press(keySimulator, keyEventPrevented); });
            })
                .then(function () {
                testCafeCore.arrayUtils.reverse(keyPressSimulators);
                return testCafeCore.promiseUtils.each(keyPressSimulators, function (keySimulator) { return _this._up(keySimulator); });
            });
        };
        PressAutomation.prototype.run = function () {
            var _this = this;
            var activeElement = testCafeCore.domUtils.getActiveElement();
            var activeElementIsIframe = testCafeCore.domUtils.isIframeElement(activeElement);
            if (!isIframeWindow(window) && activeElementIsIframe && nativeMethods$c.contentWindowGetter.call(activeElement)) {
                var msg = {
                    cmd: PRESS_REQUEST_CMD,
                    keyCombinations: this.keyCombinations,
                    options: this.options,
                };
                return testCafeCore.sendRequestToFrame(msg, PRESS_RESPONSE_CMD, nativeMethods$c.contentWindowGetter.call(activeElement));
            }
            return testCafeCore.promiseUtils.each(this.keyCombinations, function (combination) {
                return _this
                    ._runCombination(combination)
                    .then(function () { return testCafeCore.delay(_this.automationSettings.keyActionStepDelay); });
            });
        };
        return PressAutomation;
    }());

    var Promise$b = hammerhead__default.Promise;
    var extend$3 = hammerhead__default.utils.extend;
    var browserUtils$d = hammerhead__default.utils.browser;
    var eventSimulator$c = hammerhead__default.eventSandbox.eventSimulator;
    var domUtils$9 = testCafeCore__default.domUtils, eventUtils$5 = testCafeCore__default.eventUtils, delay$3 = testCafeCore__default.delay;
    var RClickAutomation = /** @class */ (function (_super) {
        __extends(RClickAutomation, _super);
        function RClickAutomation(element, clickOptions) {
            var _this = _super.call(this, element, clickOptions, window, cursor) || this;
            _this.modifiers = clickOptions.modifiers;
            _this.caretPos = clickOptions.caretPos;
            _this.eventState = {
                simulateDefaultBehavior: true,
                activeElementBeforeMouseDown: null,
            };
            return _this;
        }
        RClickAutomation.prototype._mousedown = function (eventArgs) {
            var _this = this;
            return cursor
                .rightButtonDown()
                .then(function () {
                _this.eventState.activeElementBeforeMouseDown = domUtils$9.getActiveElement();
                _this.eventState.simulateDefaultBehavior = eventSimulator$c.mousedown(eventArgs.element, eventArgs.options);
                return _this._focus(eventArgs);
            });
        };
        RClickAutomation.prototype._focus = function (eventArgs) {
            if (this.simulateDefaultBehavior === false)
                return nextTick();
            // NOTE: If a target element is a contentEditable element, we need to call focusAndSetSelection directly for
            // this element. Otherwise, if the element obtained by elementFromPoint is a child of the contentEditable
            // element, a selection position may be calculated incorrectly (by using the caretPos option).
            var elementForFocus = domUtils$9.isContentEditableElement(this.element) ? this.element : eventArgs.element;
            // NOTE: IE doesn't perform focus if active element has been changed while executing mousedown
            var simulateFocus = !browserUtils$d.isIE || this.eventState.activeElementBeforeMouseDown === domUtils$9.getActiveElement();
            return focusAndSetSelection(elementForFocus, simulateFocus, this.caretPos)
                .then(function () { return nextTick(); });
        };
        RClickAutomation.prototype._mouseup = function (eventArgs) {
            var _this = this;
            return cursor
                .buttonUp()
                .then(function () { return _this._getElementForEvent(eventArgs); })
                .then(function (element) { return eventSimulator$c.mouseup(element, eventArgs.options); });
        };
        RClickAutomation.prototype._contextmenu = function (eventArgs) {
            return this
                ._getElementForEvent(eventArgs)
                .then(function (element) {
                eventSimulator$c.contextmenu(element, eventArgs.options);
                if (!domUtils$9.isElementFocusable(element))
                    focusByRelatedElement(element);
            });
        };
        RClickAutomation.prototype.run = function (useStrictElementCheck) {
            var _this = this;
            var eventArgs = null;
            return this
                ._ensureElement(useStrictElementCheck)
                .then(function (_a) {
                var element = _a.element, clientPoint = _a.clientPoint, devicePoint = _a.devicePoint;
                eventArgs = {
                    point: clientPoint,
                    element: element,
                    options: extend$3({
                        clientX: clientPoint.x,
                        clientY: clientPoint.y,
                        screenX: devicePoint.x,
                        screenY: devicePoint.y,
                        button: eventUtils$5.BUTTON.right,
                    }, _this.modifiers),
                };
                // NOTE: we should raise mouseup event with 'mouseActionStepDelay' after we trigger
                // mousedown event regardless of how long mousedown event handlers were executing
                return Promise$b.all([delay$3(_this.automationSettings.mouseActionStepDelay), _this._mousedown(eventArgs)]);
            })
                .then(function () { return _this._mouseup(eventArgs); })
                .then(function () { return _this._contextmenu(eventArgs); });
        };
        return RClickAutomation;
    }(VisibleElementAutomation));

    var browserUtils$e = hammerhead__default.utils.browser;
    var domUtils$a = testCafeCore__default.domUtils;
    var positionUtils$4 = testCafeCore__default.positionUtils;
    var styleUtils$6 = testCafeCore__default.styleUtils;
    var contentEditable$2 = testCafeCore__default.contentEditable;
    var arrayUtils$1 = testCafeCore__default.arrayUtils;
    var MODIFIERS_LIST = ['direction', 'font-family', 'font-size', 'font-size-adjust', 'font-variant', 'font-weight', 'font-style', 'letter-spacing', 'line-height', 'text-align', 'text-indent', 'text-transform', 'word-wrap', 'word-spacing', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom', 'margin-top', 'margin-left', 'margin-right', 'margin-bottom', 'border-top-width', 'border-left-width', 'border-right-width', 'border-bottom-width'];
    function ensureRectangleInsideElement(element, rect) {
        var elementBorders = styleUtils$6.getBordersWidth(element);
        var elementOffset = positionUtils$4.getOffsetPosition(element);
        // NOTE: strange behavior in Chrome - for some elements (e.g., for the 'font' element)
        // scrollHeight is 0, so we use getBoundingClientRect
        var elementHeight = element.scrollHeight || element.getBoundingClientRect().height;
        var left = Math.ceil(rect.left);
        var top = Math.ceil(rect.top);
        var bottom = Math.floor(rect.bottom);
        if (!domUtils$a.isTextAreaElement(element)) {
            var clientOffset = positionUtils$4.offsetToClientCoords({
                x: elementOffset.left,
                y: elementOffset.top,
            });
            var minLeft = clientOffset.x + elementBorders.left + 1;
            var minTop = clientOffset.y + elementBorders.top + 1;
            var bottomBound = clientOffset.y + elementBorders.top + elementBorders.bottom + elementHeight;
            var maxBottom = clientOffset.y + elementBorders.top + elementHeight - 1;
            left = Math.ceil(left <= clientOffset.x ? minLeft : rect.left);
            top = Math.ceil(top <= clientOffset.y ? minTop : rect.top);
            bottom = Math.floor(bottom >= bottomBound ? maxBottom : rect.bottom);
        }
        return {
            left: left,
            top: top,
            bottom: bottom,
        };
    }
    function getAbsoluteRect(rect) {
        var documentScroll = styleUtils$6.getElementScroll(document);
        return {
            left: rect.left + documentScroll.left,
            top: rect.top + documentScroll.top,
            bottom: rect.bottom + documentScroll.top,
        };
    }
    function getSelectionRectangleInContentEditableElement(element, position) {
        var range = domUtils$a.findDocument(element).createRange();
        var selectionPosition = contentEditable$2.calculateNodeAndOffsetByPosition(element, position);
        range.setStart(selectionPosition.node, Math.min(selectionPosition.offset, selectionPosition.node.length));
        range.setEnd(selectionPosition.node, Math.min(selectionPosition.offset, selectionPosition.node.length));
        return range.getClientRects()[0];
    }
    function getTextSelectionRectangle(element, position) {
        var range = element.createTextRange();
        range.collapse(true);
        range.moveStart('character', position);
        range.moveEnd('character', position);
        range.collapse(true);
        return range.getBoundingClientRect();
    }
    function getSelectionRectangle(element, position) {
        var clientRectBeforeFakeDiv = element.getBoundingClientRect();
        var fakeDiv = createFakeDiv(element);
        var rect = null;
        var clientRectAfterFakeDiv = element.getBoundingClientRect();
        var topBoundDiff = clientRectAfterFakeDiv.top - clientRectBeforeFakeDiv.top;
        var leftBoundDiff = clientRectAfterFakeDiv.left - clientRectBeforeFakeDiv.left;
        var valueLength = domUtils$a.getElementValue(element).length;
        try {
            var range = document.createRange(); //B254723
            range.setStart(hammerhead__default.nativeMethods.nodeFirstChildGetter.call(fakeDiv), Math.min(position, valueLength));
            // NOTE: The range.getClientRects function returns wrong result if range length is 0 in Safari 11
            range.setEnd(hammerhead__default.nativeMethods.nodeFirstChildGetter.call(fakeDiv), Math.min(position + 1, valueLength + 1));
            if (domUtils$a.isTextAreaElement(element)) {
                rect = range.getBoundingClientRect();
                if (rect.width === 0 && rect.height === 0)
                    rect = range.getClientRects()[0];
            }
            else
                rect = range.getClientRects()[0];
        }
        catch (err) {
            rect = null;
        }
        domUtils$a.remove(fakeDiv);
        if (!rect)
            return null;
        return {
            width: rect.width,
            height: rect.height,
            top: rect.top - topBoundDiff,
            bottom: rect.bottom - topBoundDiff,
            left: rect.left - leftBoundDiff,
            right: rect.right - leftBoundDiff,
        };
    }
    function createFakeDiv(element) {
        var body = document.body;
        var elementOffset = positionUtils$4.getOffsetPosition(element);
        var elementMargin = styleUtils$6.getElementMargin(element);
        var elementTop = elementOffset.top - elementMargin.top;
        var elementLeft = elementOffset.left - elementMargin.left;
        var fakeDiv = document.createElement('div');
        var fakeDivCssStyles = 'white-space:pre-wrap;border-style:solid;';
        if (styleUtils$6.get(body, 'position') === 'absolute') {
            var bodyMargin = styleUtils$6.getElementMargin(body);
            var bodyLeft = styleUtils$6.get(body, 'left');
            var bodyTop = styleUtils$6.get(body, 'top');
            elementLeft -= bodyMargin.left + (parseInt(bodyLeft.replace('px', ''), 10) || 0);
            elementTop -= bodyMargin.top + (parseInt(bodyTop.replace('px', ''), 10) || 0);
        }
        arrayUtils$1.forEach(MODIFIERS_LIST, function (modifier) {
            fakeDivCssStyles += "".concat(modifier, ":").concat(styleUtils$6.get(element, modifier), ";");
        });
        styleUtils$6.set(fakeDiv, {
            cssText: fakeDivCssStyles,
            position: 'absolute',
            left: elementLeft + 'px',
            top: elementTop + 'px',
            width: element.scrollWidth + 'px',
            height: element.scrollHeight + 'px',
        });
        hammerhead__default.nativeMethods.nodeTextContentSetter.call(fakeDiv, domUtils$a.getElementValue(element) + ' ');
        body.appendChild(fakeDiv);
        return fakeDiv;
    }
    function getPositionCoordinates(element, position) {
        var rect = null;
        if (domUtils$a.isContentEditableElement(element))
            rect = getSelectionRectangleInContentEditableElement(element, position);
        else if (typeof element.createTextRange === 'function')
            rect = getTextSelectionRectangle(element, position);
        else
            rect = getSelectionRectangle(element, position);
        if (!rect)
            return null;
        rect = ensureRectangleInsideElement(element, rect);
        rect = getAbsoluteRect(rect);
        return {
            x: rect.left,
            y: Math.floor(rect.top + (rect.bottom - rect.top) / 2),
        };
    }
    function getSelectionCoordinatesByPosition(element, position) {
        var isTextEditable = domUtils$a.isTextEditableElement(element);
        var isContentEditable = domUtils$a.isContentEditableElement(element);
        var hasText = isTextEditable && domUtils$a.getElementValue(element).length > 0 ||
            isContentEditable && contentEditable$2.getContentEditableValue(element).length;
        if (!hasText)
            return positionUtils$4.findCenter(element);
        return getPositionCoordinates(element, position);
    }
    function getSelectionCoordinatesByNodeAndOffset(element, node, offset) {
        var range = domUtils$a.findDocument(element).createRange();
        range.setStart(node, Math.min(offset, node.length));
        range.setEnd(node, Math.min(offset, node.length));
        var rect = range.getClientRects()[0];
        if (!rect)
            return null;
        rect = ensureRectangleInsideElement(element, rect);
        rect = getAbsoluteRect(rect);
        return {
            x: rect.left,
            y: Math.floor(rect.top + (rect.bottom - rect.top) / 2),
        };
    }
    function getLastVisibleSelectionPosition(element, startPos, endPos) {
        var backward = startPos > endPos;
        var inc = backward ? 1 : -1;
        var currentPos = endPos;
        var currentPoint = null;
        while (currentPos !== startPos) {
            currentPos += inc;
            currentPoint = getPositionCoordinates(element, currentPos);
            if (currentPoint)
                break;
        }
        if (!currentPoint) {
            currentPoint = getPositionCoordinates(element, startPos) ||
                positionUtils$4.findCenter(element);
        }
        return currentPoint;
    }
    function scrollEditableElementByPoint(element, point) {
        if (!domUtils$a.isEditableElement(element))
            return;
        var isTextarea = domUtils$a.isTextAreaElement(element);
        var isInputElement = domUtils$a.isInputElement(element);
        // NOTE: we don't need to scroll input elements in Mozilla and
        // IE > 10 because it happens automatically on selection setting
        if (isInputElement && (browserUtils$e.isFirefox || browserUtils$e.isIE && browserUtils$e.version > 10))
            return;
        var elementOffset = positionUtils$4.getOffsetPosition(element);
        var elementBorders = styleUtils$6.getBordersWidth(element);
        var elementScroll = styleUtils$6.getElementScroll(element);
        var offsetX = point.x - elementOffset.left - elementBorders.left;
        var offsetY = point.y - elementOffset.top - elementBorders.top;
        var scrollValue = null;
        if (isTextarea) {
            if (offsetY < elementScroll.top)
                scrollValue = offsetY;
            if (offsetY > element.clientHeight + elementScroll.top)
                scrollValue = offsetY - element.clientHeight;
            if (scrollValue !== null)
                styleUtils$6.setScrollTop(element, Math.round(scrollValue));
            return;
        }
        if (offsetX < elementScroll.left)
            scrollValue = offsetX;
        if (offsetX > element.clientWidth + elementScroll.left)
            scrollValue = offsetX - element.clientWidth;
        if (scrollValue !== null)
            styleUtils$6.setScrollLeft(element, Math.round(scrollValue));
    }
    function excludeElementScroll(element, point) {
        var isTextEditable = domUtils$a.isTextEditableElement(element);
        var isInputElement = domUtils$a.isInputElement(element);
        if (!(isTextEditable || domUtils$a.isContentEditableElement(element)))
            return point;
        var elementOffset = positionUtils$4.getOffsetPosition(element);
        var elementBorders = styleUtils$6.getBordersWidth(element);
        var elementScroll = styleUtils$6.getElementScroll(element);
        var maxLeft = elementOffset.left + elementBorders.left + element.clientWidth;
        // NOTE: we can't know input elements' scroll value in Mozilla and
        // IE > 10 (https://bugzilla.mozilla.org/show_bug.cgi?id=293186)
        if (isInputElement && isTextEditable &&
            (browserUtils$e.isFirefox || browserUtils$e.isIE && browserUtils$e.version > 10)) {
            return {
                x: Math.min(point.x, maxLeft),
                y: point.y,
            };
        }
        return {
            x: point.x - elementScroll.left,
            y: point.y - elementScroll.top,
        };
    }

    var Promise$c = hammerhead__default.Promise;
    var browserUtils$f = hammerhead__default.utils.browser;
    var featureDetection$5 = hammerhead__default.utils.featureDetection;
    var eventSimulator$d = hammerhead__default.eventSandbox.eventSimulator;
    var focusBlurSandbox$4 = hammerhead__default.eventSandbox.focusBlur;
    var contentEditable$3 = testCafeCore__default.contentEditable;
    var domUtils$b = testCafeCore__default.domUtils;
    var positionUtils$5 = testCafeCore__default.positionUtils;
    var eventUtils$6 = testCafeCore__default.eventUtils;
    var delay$4 = testCafeCore__default.delay;
    var SelectBaseAutomation = /** @class */ (function (_super) {
        __extends(SelectBaseAutomation, _super);
        function SelectBaseAutomation(element, actionOptions) {
            var _this = _super.call(this, element, actionOptions, window, cursor) || this;
            _this.absoluteStartPoint = null;
            _this.absoluteEndPoint = null;
            _this.clientPoint = null;
            _this.speed = actionOptions.speed;
            _this.downEvent = featureDetection$5.isTouchDevice ? 'touchstart' : 'mousedown';
            _this.upEvent = featureDetection$5.isTouchDevice ? 'touchend' : 'mouseup';
            _this.eventArgs = {
                options: null,
                element: null,
            };
            _this.eventState = {
                mousedownPrevented: false,
                simulateDefaultBehavior: true,
            };
            return _this;
        }
        SelectBaseAutomation._calculateEventArguments = function (point) {
            var clientPoint = positionUtils$5.offsetToClientCoords(point);
            return getElementFromPoint$2(clientPoint)
                .then(function (element) {
                if (!element)
                    throw new Error(ERROR_TYPES.elementIsInvisibleError);
                return {
                    element: element,
                    options: {
                        clientX: clientPoint.x,
                        clientY: clientPoint.y,
                    },
                };
            });
        };
        SelectBaseAutomation.prototype._move = function (_a) {
            var _this = this;
            var element = _a.element, offsetX = _a.offsetX, offsetY = _a.offsetY, speed = _a.speed;
            var moveOptions = new MoveOptions({ offsetX: offsetX, offsetY: offsetY, speed: speed }, false);
            return MoveAutomation.create(element, moveOptions, window, cursor)
                .then(function (moveAutomation) {
                return moveAutomation.run();
            })
                .then(function () { return delay$4(_this.automationSettings.mouseActionStepDelay); });
        };
        SelectBaseAutomation.prototype._bindMousedownHandler = function () {
            var _this = this;
            var onmousedown = function (e) {
                _this.eventState.mousedownPrevented = e.defaultPrevented;
                eventUtils$6.preventDefault(e);
                eventUtils$6.unbind(_this.element, 'mousedown', onmousedown);
            };
            eventUtils$6.bind(this.element, 'mousedown', onmousedown);
        };
        SelectBaseAutomation.prototype._calculateAbsoluteStartPoint = function () {
            throw new Error('Not implemented');
        };
        SelectBaseAutomation.prototype._calculateAbsoluteEndPoint = function () {
            throw new Error('Not implemented');
        };
        SelectBaseAutomation.prototype._moveToPoint = function (point) {
            scrollEditableElementByPoint(this.element, point);
            this.clientPoint = excludeElementScroll(this.element, point);
            var moveArguments = {
                element: document.documentElement,
                offsetX: this.clientPoint.x,
                offsetY: this.clientPoint.y,
                speed: this.speed,
            };
            return this._move(moveArguments);
        };
        SelectBaseAutomation.prototype._mousedown = function () {
            var _this = this;
            return cursor
                .leftButtonDown()
                .then(function () { return SelectBaseAutomation._calculateEventArguments(_this.clientPoint); })
                .then(function (args) {
                _this.eventArgs = args;
                // NOTE: In WebKit and IE, the mousedown event opens the select element's dropdown;
                // therefore, we should prevent mousedown and hide the dropdown (B236416).
                var needCloseSelectDropDown = (browserUtils$f.isWebKit || browserUtils$f.isIE) &&
                    domUtils$b.isSelectElement(_this.element);
                if (needCloseSelectDropDown)
                    _this._bindMousedownHandler();
                _this.eventState.simulateDefaultBehavior = eventSimulator$d[_this.downEvent](_this.eventArgs.element, _this.eventArgs.options);
                if (_this.eventState.simulateDefaultBehavior === false)
                    _this.eventState.simulateDefaultBehavior = needCloseSelectDropDown && !_this.eventState.mousedownPrevented;
                return _this._focus();
            });
        };
        SelectBaseAutomation.prototype._focus = function () {
            var _this = this;
            return new Promise$c(function (resolve) {
                // NOTE: If the target element is a child of a contentEditable element, we need to call focus for its parent
                var elementForFocus = domUtils$b.isContentEditableElement(_this.element) ?
                    contentEditable$3.findContentEditableParent(_this.element) : _this.element;
                focusBlurSandbox$4.focus(elementForFocus, resolve, false, true);
            });
        };
        SelectBaseAutomation.prototype._setSelection = function () {
            throw new Error('Not implemented');
        };
        SelectBaseAutomation.prototype._mouseup = function () {
            var _this = this;
            return cursor
                .buttonUp()
                .then(function () {
                _this._setSelection();
                return SelectBaseAutomation._calculateEventArguments(_this.clientPoint);
            })
                .then(function (args) {
                _this.eventArgs = args;
                eventSimulator$d[_this.upEvent](_this.eventArgs.element, _this.eventArgs.options);
            });
        };
        SelectBaseAutomation.prototype.run = function () {
            var _this = this;
            this.absoluteStartPoint = this._calculateAbsoluteStartPoint();
            this.absoluteEndPoint = this._calculateAbsoluteEndPoint();
            return this
                ._moveToPoint(this.absoluteStartPoint)
                .then(function () { return _this._mousedown(); })
                .then(function () { return _this._moveToPoint(_this.absoluteEndPoint); })
                .then(function () { return _this._mouseup(); });
        };
        return SelectBaseAutomation;
    }(VisibleElementAutomation));

    var textSelection$3 = testCafeCore__default.textSelection;
    var domUtils$c = testCafeCore__default.domUtils;
    var positionUtils$6 = testCafeCore__default.positionUtils;
    var SelectTextAutomation = /** @class */ (function (_super) {
        __extends(SelectTextAutomation, _super);
        function SelectTextAutomation(element, startPos, endPos, actionOptions) {
            var _this = _super.call(this, element, actionOptions) || this;
            _this.startPos = startPos;
            _this.endPos = endPos;
            return _this;
        }
        SelectTextAutomation.prototype._calculateAbsoluteStartPoint = function () {
            var point = getSelectionCoordinatesByPosition(this.element, this.startPos);
            return point || positionUtils$6.findCenter(this.element);
        };
        SelectTextAutomation.prototype._calculateAbsoluteEndPoint = function () {
            var point = getSelectionCoordinatesByPosition(this.element, this.endPos);
            if (point)
                return point;
            // NOTE: if selection ends on an invisible symbol, we should try to find the last visible selection position
            if (domUtils$c.isContentEditableElement(this.element))
                return getLastVisibleSelectionPosition(this.element, this.startPos, this.endPos);
            return positionUtils$6.findCenter(this.element);
        };
        SelectTextAutomation.prototype._setSelection = function () {
            var isTextEditable = domUtils$c.isTextEditableElement(this.element);
            var isContentEditable = domUtils$c.isContentEditableElement(this.element);
            if (!(isTextEditable || isContentEditable) || this.eventState.simulateDefaultBehavior === false)
                return;
            textSelection$3.select(this.element, this.startPos, this.endPos);
        };
        SelectTextAutomation.prototype.run = function (useStrictElementCheck) {
            var _this = this;
            return this
                ._ensureElement(useStrictElementCheck)
                .then(function () { return _super.prototype.run.call(_this); });
        };
        return SelectTextAutomation;
    }(SelectBaseAutomation));

    var textSelection$4 = testCafeCore__default.textSelection;
    var contentEditable$4 = testCafeCore__default.contentEditable;
    var positionUtils$7 = testCafeCore__default.positionUtils;
    var SelectEditableContentAutomation = /** @class */ (function (_super) {
        __extends(SelectEditableContentAutomation, _super);
        function SelectEditableContentAutomation(startNode, endNode, actionOptions) {
            var _this = _super.call(this, contentEditable$4.getNearestCommonAncestor(startNode, endNode), actionOptions) || this;
            var startOffset = contentEditable$4.getFirstVisiblePosition(startNode);
            var endOffset = contentEditable$4.getLastVisiblePosition(endNode);
            var startPos = { node: startNode, offset: startOffset };
            var endPos = { node: endNode, offset: endOffset };
            var startPosition = contentEditable$4.calculatePositionByNodeAndOffset(_this.element, startPos);
            var endPosition = contentEditable$4.calculatePositionByNodeAndOffset(_this.element, endPos);
            if (startPosition > endPosition) {
                startOffset = contentEditable$4.getLastVisiblePosition(startNode);
                endOffset = contentEditable$4.getFirstVisiblePosition(endNode);
            }
            // NOTE: We should recalculate nodes and offsets for selection because we
            // may have to select children of expectedStartNode and expectedEndNode
            startPos = contentEditable$4.calculateNodeAndOffsetByPosition(startNode, startOffset);
            endPos = contentEditable$4.calculateNodeAndOffsetByPosition(endNode, endOffset);
            _this.startNode = startPos.node;
            _this.startOffset = startPos.offset;
            _this.endNode = endPos.node;
            _this.endOffset = endPos.offset;
            return _this;
        }
        SelectEditableContentAutomation.prototype._calculateAbsoluteStartPoint = function () {
            var point = getSelectionCoordinatesByNodeAndOffset(this.element, this.startNode, this.startOffset);
            return point || positionUtils$7.findCenter(this.element);
        };
        SelectEditableContentAutomation.prototype._calculateAbsoluteEndPoint = function () {
            var point = getSelectionCoordinatesByNodeAndOffset(this.element, this.endNode, this.endOffset);
            return point || positionUtils$7.findCenter(this.element);
        };
        SelectEditableContentAutomation.prototype._setSelection = function () {
            if (this.eventState.simulateDefaultBehavior === false)
                return;
            // NOTE: The same cursor position may correspond to different nodes, so, if we
            // know which nodes should be selected eventually, we should select them directly.
            var startPos = { node: this.startNode, offset: this.startOffset };
            var endPos = { node: this.endNode, offset: this.endOffset };
            textSelection$4.selectByNodesAndOffsets(startPos, endPos, true);
        };
        return SelectEditableContentAutomation;
    }(SelectBaseAutomation));

    var Promise$d = hammerhead__default.Promise;
    var extend$4 = hammerhead__default.utils.extend;
    var browserUtils$g = hammerhead__default.utils.browser;
    var eventSimulator$e = hammerhead__default.eventSandbox.eventSimulator;
    var elementEditingWatcher$1 = hammerhead__default.eventSandbox.elementEditingWatcher;
    var domUtils$d = testCafeCore__default.domUtils;
    var promiseUtils = testCafeCore__default.promiseUtils;
    var contentEditable$5 = testCafeCore__default.contentEditable;
    var textSelection$5 = testCafeCore__default.textSelection;
    var delay$5 = testCafeCore__default.delay;
    var SPECIAL_KEYS = testCafeCore__default.KEY_MAPS.specialKeys;
    var TypeAutomation = /** @class */ (function () {
        function TypeAutomation(element, text, typeOptions) {
            this.element = TypeAutomation.findTextEditableChild(element) || element;
            this.typingText = text.toString();
            this.modifiers = typeOptions.modifiers;
            this.caretPos = typeOptions.caretPos;
            this.replace = typeOptions.replace;
            this.paste = typeOptions.paste;
            this.offsetX = typeOptions.offsetX;
            this.offsetY = typeOptions.offsetY;
            this.speed = typeOptions.speed;
            this.automationSettings = new AutomationSettings(this.speed);
            this.elementChanged = element !== this.element;
            this.currentPos = 0;
            this.currentKeyCode = null;
            this.currentCharCode = null;
            this.currentKey = null;
            this.currentKeyIdentifier = null;
            this.ignoreChangeEvent = true;
            this.eventArgs = {
                options: null,
                element: null,
            };
            this.eventState = {
                skipType: false,
                simulateKeypress: true,
                simulateTypeChar: true,
            };
        }
        TypeAutomation.findTextEditableChild = function (element) {
            var innerElement = null;
            if (!domUtils$d.isEditableElement(element)) {
                var allChildren = element.querySelectorAll('*');
                for (var i = 0; i < allChildren.length; i++) {
                    if (domUtils$d.isTextEditableElementAndEditingAllowed(allChildren[i])) {
                        innerElement = allChildren[i];
                        break;
                    }
                }
            }
            return innerElement;
        };
        TypeAutomation.prototype._calculateEventArguments = function (isPressEvent) {
            var activeElement = domUtils$d.getActiveElement();
            var isContentEditable = domUtils$d.isContentEditableElement(this.element);
            var element = this.eventArgs.element || this.element;
            // T162478: Wrong typing and keys pressing in editor
            if (!isContentEditable && activeElement !== element)
                element = TypeAutomation.findTextEditableChild(activeElement) || activeElement;
            var options = extend$4({
                keyCode: isPressEvent ? this.currentCharCode : this.currentKeyCode,
            }, this.modifiers);
            if (isPressEvent)
                options.charCode = this.currentCharCode;
            extend$4(options, getKeyProperties(isPressEvent, this.currentKey, this.currentKeyIdentifier));
            return { element: element, options: options };
        };
        TypeAutomation.prototype._calculateTargetElement = function () {
            var activeElement = domUtils$d.getActiveElement();
            var isContentEditable = domUtils$d.isContentEditableElement(this.element);
            if (isContentEditable) {
                if (activeElement !== contentEditable$5.findContentEditableParent(this.element)) {
                    this.eventState.skipType = true;
                    return;
                }
            }
            else if (activeElement !== this.element) {
                this.eventState.skipType = true;
                return;
            }
            this.element = isContentEditable ? this.element : activeElement;
        };
        TypeAutomation.prototype._click = function (useStrictElementCheck) {
            var _this = this;
            var activeElement = domUtils$d.getActiveElement();
            var isTextEditable = domUtils$d.isTextEditableElementAndEditingAllowed(this.element);
            var isContentEditable = domUtils$d.isContentEditableElement(this.element);
            if (activeElement !== this.element) {
                var _a = getDefaultAutomationOffsets(this.element), offsetX = _a.offsetX, offsetY = _a.offsetY;
                var clickOptions = new ClickOptions({
                    offsetX: this.elementChanged ? offsetX : this.offsetX,
                    offsetY: this.elementChanged ? offsetY : this.offsetY,
                    speed: this.speed,
                    caretPos: this.caretPos,
                    modifiers: this.modifiers,
                });
                var clickAutomation = new ClickAutomation(this.element, clickOptions, window, cursor);
                return clickAutomation
                    .run(useStrictElementCheck)
                    .then(function () { return delay$5(_this.automationSettings.mouseActionStepDelay); });
            }
            if (isTextEditable)
                elementEditingWatcher$1.watchElementEditing(this.element);
            var isEditableElement = isTextEditable || isContentEditable;
            if (isEditableElement) {
                var selectionStart = textSelection$5.getSelectionStart(this.element);
                if (!isNaN(parseInt(this.caretPos, 10)) && this.caretPos !== selectionStart)
                    textSelection$5.select(this.element, this.caretPos, this.caretPos);
            }
            return Promise$d.resolve();
        };
        TypeAutomation.prototype._type = function () {
            var _this = this;
            if (this.eventState.skipType)
                return Promise$d.resolve();
            var isContentEditable = domUtils$d.isContentEditableElement(this.element);
            if (this.replace) {
                if (domUtils$d.isTextEditableElementAndEditingAllowed(this.element))
                    textSelection$5.select(this.element);
                else if (isContentEditable)
                    textSelection$5.deleteSelectionContents(this.element, true);
            }
            return promiseUtils.whilst(function () { return !_this._isTypingFinished(); }, function () { return _this._typingStep(); });
        };
        TypeAutomation.prototype._isTypingFinished = function () {
            return this.currentPos === this.typingText.length;
        };
        TypeAutomation.prototype._typingStep = function () {
            var char = this.typingText.charAt(this.currentPos);
            this.currentKeyCode = getKeyCode(char);
            this.currentCharCode = this.typingText.charCodeAt(this.currentPos);
            this.currentKey = this.currentKeyCode === SPECIAL_KEYS['enter'] ? 'Enter' : char;
            this.currentKeyIdentifier = getKeyIdentifier(this.currentKey);
            this.ignoreChangeEvent = domUtils$d.getElementValue(this.element) === elementEditingWatcher$1.getElementSavedValue(this.element);
            this._keydown();
            this._keypress();
            return this._keyup();
        };
        TypeAutomation.prototype._keydown = function () {
            this.eventArgs = this._calculateEventArguments();
            this.eventState.simulateKeypress = eventSimulator$e.keydown(this.eventArgs.element, this.eventArgs.options);
        };
        TypeAutomation.prototype._keypress = function () {
            if (this.eventState.simulateKeypress === false)
                return;
            this.eventArgs = this._calculateEventArguments(true);
            this.eventState.simulateTypeChar = browserUtils$g.isAndroid || eventSimulator$e.keypress(this.eventArgs.element, this.eventArgs.options);
        };
        TypeAutomation.prototype._keyup = function () {
            var _this = this;
            var elementForTyping = this.eventArgs.element;
            this.eventArgs = this._calculateEventArguments();
            var isTextEditableElement = domUtils$d.isTextEditableElement(this.element);
            var isContentEditable = domUtils$d.isContentEditableElement(this.element);
            var shouldTypeAllText = this.paste || !isTextEditableElement && !isContentEditable;
            return Promise$d
                .resolve()
                .then(function () {
                return shouldTypeAllText ? _this._typeAllText(elementForTyping) : _this._typeChar(elementForTyping);
            })
                .then(function () {
                eventSimulator$e.keyup(_this.eventArgs.element, _this.eventArgs.options);
                if (shouldTypeAllText)
                    _this.currentPos = _this.typingText.length;
                else
                    _this.currentPos++;
            });
        };
        TypeAutomation.prototype._typeChar = function (element) {
            // NOTE: change event must not be raised after prevented keydown
            // or keypress even if element value was changed (B253816)
            if (this.eventState.simulateKeypress === false || this.eventState.simulateTypeChar === false) {
                // NOTE: change event should still be raised if element value
                // was changed before the prevented keypress or keydown (GH-4881)
                if (this.ignoreChangeEvent)
                    elementEditingWatcher$1.restartWatchingElementEditing(element);
                return delay$5(this.automationSettings.keyActionStepDelay);
            }
            var currentChar = this.typingText.charAt(this.currentPos);
            var isDigit = /^\d$/.test(currentChar);
            var prevChar = this.currentPos === 0 ? null : this.typingText.charAt(this.currentPos - 1);
            var isInputTypeNumber = domUtils$d.isInputElement(element) && element.type === 'number';
            if (isInputTypeNumber) {
                var selectionStart = textSelection$5.getSelectionStart(element);
                var valueLength = domUtils$d.getInputValue(element).length;
                var textHasDigits = /^\d/.test(this.typingText);
                var isPermissibleSymbol = currentChar === '.' || currentChar === '-' && valueLength;
                if (!isDigit && (textHasDigits || !isPermissibleSymbol || selectionStart !== 0))
                    return delay$5(this.automationSettings.keyActionStepDelay);
                // NOTE: allow to type '.' or '-' only if it is the first symbol and the input already has
                // a value, or if '.' or '-' are added to a digit. Otherwise, the value won't be set.
                if (isDigit && (prevChar === '.' || prevChar === '-' && !valueLength))
                    currentChar = prevChar + currentChar;
            }
            typeText(element, currentChar, null);
            return delay$5(this.automationSettings.keyActionStepDelay);
        };
        TypeAutomation.prototype._typeAllText = function (element) {
            typeText(element, this.typingText, this.caretPos);
            return delay$5(this.automationSettings.keyActionStepDelay);
        };
        TypeAutomation.prototype.run = function (useStrictElementCheck) {
            var _this = this;
            return this
                ._click(useStrictElementCheck)
                .then(function () { return _this._calculateTargetElement(); })
                .then(function () { return _this._type(); });
        };
        return TypeAutomation;
    }());

    var UploadAutomation = /** @class */ (function () {
        function UploadAutomation(element, paths, createError) {
            this.element = element;
            this.paths = paths;
            this.createError = createError;
        }
        UploadAutomation.prototype.run = function () {
            var _this = this;
            return hammerhead.doUpload(this.element, this.paths)
                .then(function (errs) {
                if (!errs.length)
                    return;
                var filePaths = testCafeCore.arrayUtils.map(errs, function (err) { return err.path; });
                var scannedFilePaths = testCafeCore.arrayUtils.reduce(errs, function (prev, current) {
                    return prev.concat(current.resolvedPaths);
                }, []);
                throw _this.createError(filePaths, scannedFilePaths);
            });
        };
        return UploadAutomation;
    }());

    var domUtils$e = testCafeCore__default.domUtils;
    var contentEditable$6 = testCafeCore__default.contentEditable;
    function getSelectTextAreaContentArguments(element, argumentsObject) {
        var value = domUtils$e.getTextAreaValue(element);
        var linesArray = value && value.length ? value.split('\n') : [];
        var lastLineIndex = linesArray.length - 1;
        var startLineIndex = !argumentsObject.startLine ? 0 : Math.min(argumentsObject.startLine, lastLineIndex);
        var startLineLength = linesArray[startLineIndex] ? linesArray[startLineIndex].length : 0;
        var startPos = !argumentsObject.startPos ? 0 : Math.min(argumentsObject.startPos, startLineLength);
        var endLineIndex = argumentsObject.endLine === void 0 || argumentsObject.endLine === null ?
            lastLineIndex : Math.min(argumentsObject.endLine, lastLineIndex);
        var endLineLength = linesArray[endLineIndex] ? linesArray[endLineIndex].length : 0;
        var endPos = argumentsObject.endPos === void 0 ||
            argumentsObject.endPos ===
                null ? endLineLength : Math.min(argumentsObject.endPos, endLineLength);
        var startLinePosition = domUtils$e.getTextareaPositionByLineAndOffset(element, startLineIndex, 0);
        var endLinePosition = domUtils$e.getTextareaPositionByLineAndOffset(element, endLineIndex, 0);
        return {
            startPos: startLinePosition + startPos,
            endPos: endLinePosition + endPos,
        };
    }
    function calculateSelectTextArguments (element, argumentsObject) {
        if (argumentsObject === void 0) { argumentsObject = {}; }
        var isTextEditable = domUtils$e.isTextEditableElement(element);
        var firstPos = isTextEditable ? 0 : contentEditable$6.getFirstVisiblePosition(element);
        var lastPos = isTextEditable ? domUtils$e.getElementValue(element).length : contentEditable$6.getLastVisiblePosition(element);
        var startPos = !argumentsObject.startPos ? firstPos : Math.min(argumentsObject.startPos, lastPos);
        var endPos = argumentsObject.endPos === void 0 ||
            argumentsObject.endPos === null ? lastPos : Math.min(argumentsObject.endPos, lastPos);
        if (argumentsObject.offset !== void 0) {
            if (argumentsObject.offset >= 0)
                endPos = Math.min(argumentsObject.offset, endPos);
            else {
                startPos = endPos;
                endPos = Math.max(0, endPos + argumentsObject.offset);
            }
            return { startPos: startPos, endPos: endPos };
        }
        if (argumentsObject.startLine !== void 0)
            return getSelectTextAreaContentArguments(element, argumentsObject);
        return { startPos: startPos, endPos: endPos };
    }

    var exports$1 = {};
    exports$1.DispatchEvent = DispatchEventAutomation;
    exports$1.SetScroll = SetScrollAutomation;
    exports$1.ScrollIntoView = ScrollIntoViewAutomation;
    exports$1.Click = ClickAutomation;
    exports$1.SelectChildClick = SelectChildClickAutomation;
    exports$1.DblClick = DblClickAutomation;
    exports$1.DragToOffset = DragToOffsetAutomation;
    exports$1.DragToElement = DragToElementAutomation;
    exports$1.Hover = HoverAutomation;
    exports$1.Press = PressAutomation;
    exports$1.RClick = RClickAutomation;
    exports$1.SelectText = SelectTextAutomation;
    exports$1.SelectEditableContent = SelectEditableContentAutomation;
    exports$1.Type = TypeAutomation;
    exports$1.Upload = UploadAutomation;
    exports$1.MouseOptions = MouseOptions;
    exports$1.ClickOptions = ClickOptions;
    exports$1.TypeOptions = TypeOptions;
    exports$1.ERROR_TYPES = ERROR_TYPES;
    exports$1.AutomationSettings = AutomationSettings;
    exports$1.getOffsetOptions = getOffsetOptions;
    exports$1.calculateSelectTextArguments = calculateSelectTextArguments;
    exports$1.cursor = cursor;
    exports$1.getNextFocusableElement = getNextFocusableElement;
    exports$1.SHORTCUT_TYPE = SHORTCUT_TYPE;
    exports$1.getSelectionCoordinatesByPosition = getSelectionCoordinatesByPosition;
    exports$1.getElementFromPoint = getElementFromPoint$2;
    // NOTE: for testing purposes
    exports$1.MoveAutomation = MoveAutomation;
    var nativeMethods$d = hammerhead__default.nativeMethods;
    var evalIframeScript = hammerhead__default.EVENTS.evalIframeScript;
    nativeMethods$d.objectDefineProperty(window, '%testCafeAutomation%', { configurable: true, value: exports$1 });
    // eslint-disable-next-line no-undef
    hammerhead__default.on(evalIframeScript, function (e) { return initTestCafeAutomation(nativeMethods$d.contentWindowGetter.call(e.iframe), true); });

}(window['%hammerhead%'], window['%hammerhead%'].Promise, window['%testCafeCore%'], window['%testCafeUI%']));

    }

    initTestCafeAutomation(window);
})();
