window['%hammerhead%'].utils.removeInjectedScript();

// NOTE: We should have the capability to initialize scripts with different contexts.
// This is required for iframes without the src attribute because Hammerhead does not
// inject scripts into such iframes. So, we wrap all scripts in initialization functions.
(function () {
    function initTestCafeUI(window) {
        var document = window.document;

        (function (hammerhead, testCafeCore, Promise$3) {
    var hammerhead__default = 'default' in hammerhead ? hammerhead['default'] : hammerhead;
    var testCafeCore__default = 'default' in testCafeCore ? testCafeCore['default'] : testCafeCore;
    Promise$3 = Promise$3 && Object.prototype.hasOwnProperty.call(Promise$3, 'default') ? Promise$3['default'] : Promise$3;

    var uiRoot = {
        uiRoot: null,
        element: function () {
            if (!this.uiRoot) {
                this.uiRoot = document.createElement('div');
                hammerhead.shadowUI.getRoot().appendChild(this.uiRoot);
            }
            return this.uiRoot;
        },
        hide: function () {
            if (!this.uiRoot)
                return;
            this.uiRoot.style.visibility = 'hidden';
        },
        show: function () {
            if (!this.uiRoot)
                return;
            this.uiRoot.style.visibility = '';
        },
        remove: function () {
            var shadowRoot = hammerhead.shadowUI.getRoot();
            var parent = hammerhead.nativeMethods.nodeParentNodeGetter.call(shadowRoot);
            parent.removeChild(shadowRoot);
        },
    };

    //NOTE: we can't manipulate (open/close option list) with a native select element during test running, so we
    var shadowUI = hammerhead__default.shadowUI;
    var browserUtils = hammerhead__default.utils.browser;
    var featureDetection = hammerhead__default.utils.featureDetection;
    var nativeMethods = hammerhead__default.nativeMethods;
    var eventSimulator = hammerhead__default.eventSandbox.eventSimulator;
    var listeners = hammerhead__default.eventSandbox.listeners;
    var positionUtils = testCafeCore__default.positionUtils;
    var domUtils = testCafeCore__default.domUtils;
    var styleUtils = testCafeCore__default.styleUtils;
    var eventUtils = testCafeCore__default.eventUtils;
    var arrayUtils = testCafeCore__default.arrayUtils;
    var OPTION_LIST_CLASS = 'tcOptionList';
    var OPTION_GROUP_CLASS = 'tcOptionGroup';
    var OPTION_CLASS = 'tcOption';
    var DISABLED_CLASS = 'disabled';
    var MAX_OPTION_LIST_LENGTH = browserUtils.isIE ? 30 : 20;
    var curSelectEl = null;
    var optionList = null;
    var groups = [];
    var options = [];
    function onDocumentMouseDown(e) {
        var target = nativeMethods.eventTargetGetter.call(e);
        //NOTE: only in Mozilla 'mousedown' raises for option
        if ((target || e.srcElement) !== curSelectEl && !domUtils.containsElement(curSelectEl, target) &&
            !domUtils.containsElement(optionList, target))
            collapseOptionList();
    }
    function onWindowClick(e, dispatched, preventDefault) {
        var target = nativeMethods.eventTargetGetter.call(e);
        var optionIndex = arrayUtils.indexOf(options, target);
        if (optionIndex < 0)
            return;
        preventDefault();
        var isDisabled = target.className.indexOf(DISABLED_CLASS) > -1;
        if (isDisabled && browserUtils.isWebKit)
            return;
        clickOnOption(optionIndex, isDisabled);
    }
    function clickOnOption(optionIndex, isOptionDisabled) {
        var curSelectIndex = curSelectEl.selectedIndex;
        var realOption = curSelectEl.getElementsByTagName('option')[optionIndex];
        var clickLeadChanges = !isOptionDisabled && optionIndex !== curSelectIndex;
        if (clickLeadChanges && !browserUtils.isIE)
            curSelectEl.selectedIndex = optionIndex;
        if (!browserUtils.isFirefox && !browserUtils.isIE && clickLeadChanges) {
            eventSimulator.input(curSelectEl);
            eventSimulator.change(curSelectEl);
        }
        if (browserUtils.isFirefox || browserUtils.isIE)
            eventSimulator.mousedown(browserUtils.isFirefox ? realOption : curSelectEl);
        if (!featureDetection.isTouchDevice)
            eventSimulator.mouseup(browserUtils.isFirefox ? realOption : curSelectEl);
        if ((browserUtils.isFirefox || browserUtils.isIE) && clickLeadChanges) {
            if (browserUtils.isIE)
                curSelectEl.selectedIndex = optionIndex;
            if (!browserUtils.isIE)
                eventSimulator.input(curSelectEl);
            eventSimulator.change(curSelectEl);
        }
        if (!featureDetection.isTouchDevice)
            eventSimulator.click(browserUtils.isFirefox || browserUtils.isIE ? realOption : curSelectEl);
        if (!isOptionDisabled)
            collapseOptionList();
    }
    function createOption(realOption, parent) {
        var option = document.createElement('div');
        var isOptionDisabled = realOption.disabled || domUtils.getTagName(realOption.parentElement) === 'optgroup' &&
            realOption.parentElement.disabled;
        // eslint-disable-next-line no-restricted-properties
        nativeMethods.nodeTextContentSetter.call(option, realOption.text);
        parent.appendChild(option);
        shadowUI.addClass(option, OPTION_CLASS);
        if (isOptionDisabled) {
            shadowUI.addClass(option, DISABLED_CLASS);
            styleUtils.set(option, 'color', styleUtils.get(realOption, 'color'));
        }
        options.push(option);
    }
    function createGroup(realGroup, parent) {
        var group = document.createElement('div');
        nativeMethods.nodeTextContentSetter.call(group, realGroup.label || ' ');
        parent.appendChild(group);
        shadowUI.addClass(group, OPTION_GROUP_CLASS);
        if (group.disabled) {
            shadowUI.addClass(group, DISABLED_CLASS);
            styleUtils.set(group, 'color', styleUtils.get(realGroup, 'color'));
        }
        createChildren(realGroup.children, group);
        groups.push(group);
    }
    function createChildren(children, parent) {
        var childrenLength = domUtils.getChildrenLength(children);
        for (var i = 0; i < childrenLength; i++) {
            if (domUtils.isOptionElement(children[i]))
                createOption(children[i], parent);
            else if (domUtils.getTagName(children[i]) === 'optgroup')
                createGroup(children[i], parent);
        }
    }
    function expandOptionList(select) {
        var selectChildren = select.children;
        if (!selectChildren.length || select.disabled)
            return;
        //NOTE: check is option list expanded
        if (curSelectEl) {
            var isSelectExpanded = select === curSelectEl;
            collapseOptionList();
            if (isSelectExpanded)
                return;
        }
        curSelectEl = select;
        optionList = document.createElement('div');
        uiRoot.element().appendChild(optionList);
        shadowUI.addClass(optionList, OPTION_LIST_CLASS);
        createChildren(selectChildren, optionList);
        listeners.addInternalEventBeforeListener(window, ['click'], onWindowClick);
        nativeMethods.setTimeout.call(window, function () {
            eventUtils.bind(document, 'mousedown', onDocumentMouseDown);
        }, 0);
        styleUtils.set(optionList, {
            position: 'absolute',
            fontSize: styleUtils.get(curSelectEl, 'fontSize'),
            fontFamily: styleUtils.get(curSelectEl, 'fontFamily'),
            minWidth: styleUtils.getWidth(curSelectEl) + 'px',
            left: positionUtils.getOffsetPosition(curSelectEl).left + 'px',
            height: domUtils.getSelectVisibleChildren(select).length > MAX_OPTION_LIST_LENGTH ?
                styleUtils.getOptionHeight(select) * MAX_OPTION_LIST_LENGTH : '',
        });
        var selectTopPosition = positionUtils.getOffsetPosition(curSelectEl).top;
        var optionListHeight = styleUtils.getHeight(optionList);
        var optionListTopPosition = selectTopPosition + styleUtils.getHeight(curSelectEl) + 2;
        if (optionListTopPosition + optionListHeight > styleUtils.getScrollTop(window) + styleUtils.getHeight(window)) {
            var topPositionAboveSelect = selectTopPosition - 3 - optionListHeight;
            if (topPositionAboveSelect >= styleUtils.getScrollTop(window))
                optionListTopPosition = topPositionAboveSelect;
        }
        styleUtils.set(optionList, 'top', optionListTopPosition + 'px');
    }
    function collapseOptionList() {
        domUtils.remove(optionList);
        eventUtils.unbind(document, 'mousedown', onDocumentMouseDown);
        optionList = null;
        curSelectEl = null;
        options = [];
        groups = [];
    }
    function isOptionListExpanded(select) {
        return select ? select === curSelectEl : !!curSelectEl;
    }
    function getEmulatedChildElement(element) {
        var isGroup = domUtils.getTagName(element) === 'optgroup';
        var elementIndex = isGroup ? domUtils.getElementIndexInParent(curSelectEl, element) :
            domUtils.getElementIndexInParent(curSelectEl, element);
        if (!isGroup)
            return options[elementIndex];
        return groups[elementIndex];
    }
    function scrollOptionListByChild(child) {
        var select = domUtils.getSelectParent(child);
        if (!select)
            return;
        var realSizeValue = styleUtils.getSelectElementSize(select);
        var optionHeight = styleUtils.getOptionHeight(select);
        var scrollIndent = 0;
        var topVisibleIndex = Math.max(styleUtils.getScrollTop(select) / optionHeight, 0);
        var bottomVisibleIndex = topVisibleIndex + realSizeValue - 1;
        var childIndex = domUtils.getChildVisibleIndex(select, child);
        if (childIndex < topVisibleIndex) {
            scrollIndent = optionHeight * (topVisibleIndex - childIndex);
            styleUtils.setScrollTop(select, Math.max(styleUtils.getScrollTop(select) - scrollIndent, 0));
        }
        else if (childIndex > bottomVisibleIndex) {
            scrollIndent = optionHeight * (childIndex - bottomVisibleIndex);
            styleUtils.setScrollTop(select, styleUtils.getScrollTop(select) + scrollIndent);
        }
    }
    function getSelectChildCenter(child) {
        var select = domUtils.getSelectParent(child);
        if (!select) {
            return {
                x: 0,
                y: 0,
            };
        }
        var optionHeight = styleUtils.getOptionHeight(select);
        var childRectangle = positionUtils.getElementRectangle(child);
        return {
            x: Math.round(childRectangle.left + childRectangle.width / 2),
            y: Math.round(childRectangle.top + optionHeight / 2),
        };
    }
    function switchOptionsByKeys(element, command) {
        var selectSize = styleUtils.getSelectElementSize(element);
        var optionListHidden = !styleUtils.hasDimensions(shadowUI.select('.' + OPTION_LIST_CLASS)[0]);
        if (/down|up/.test(command) ||
            !browserUtils.isIE && (selectSize <= 1 || browserUtils.isFirefox) &&
                (optionListHidden || browserUtils.isFirefox) && /left|right/.test(command)) {
            var realOptions = element.querySelectorAll('option');
            var enabledOptions = [];
            for (var i = 0; i < realOptions.length; i++) {
                var parent_1 = realOptions[i].parentElement;
                if (!realOptions[i].disabled && !(domUtils.getTagName(parent_1) === 'optgroup' && parent_1.disabled))
                    enabledOptions.push(realOptions[i]);
            }
            var curSelectedOptionIndex = arrayUtils.indexOf(enabledOptions, realOptions[element.selectedIndex]);
            var nextIndex = curSelectedOptionIndex + (/down|right/.test(command) ? 1 : -1);
            if (nextIndex >= 0 && nextIndex < enabledOptions.length) {
                element.selectedIndex = arrayUtils.indexOf(realOptions, enabledOptions[nextIndex]);
                if (!browserUtils.isIE)
                    eventSimulator.input(element);
                eventSimulator.change(element);
            }
        }
    }
    function isOptionElementVisible(el) {
        var parentSelect = domUtils.getSelectParent(el);
        if (!parentSelect)
            return true;
        var expanded = isOptionListExpanded(parentSelect);
        var selectSizeValue = styleUtils.getSelectElementSize(parentSelect);
        return expanded || selectSizeValue > 1;
    }

    var selectElement = /*#__PURE__*/Object.freeze({
        __proto__: null,
        expandOptionList: expandOptionList,
        collapseOptionList: collapseOptionList,
        isOptionListExpanded: isOptionListExpanded,
        getEmulatedChildElement: getEmulatedChildElement,
        scrollOptionListByChild: scrollOptionListByChild,
        getSelectChildCenter: getSelectChildCenter,
        switchOptionsByKeys: switchOptionsByKeys,
        isOptionElementVisible: isOptionElementVisible
    });

    //Const
    var LOADING_TEXT = 'Loading page...';
    var BACKGROUND_CLASS = 'modal-background';
    var LOADING_TEXT_CLASS = 'loading-text';
    var BACKGROUND_OPACITY = 0.7;
    var BACKGROUND_OPACITY_WITH_LOADING_TEXT = 0.8;
    var LOADING_ICON_CLASS = 'loading-icon';
    //Globals
    var backgroundDiv = null;
    var loadingTextDiv = null;
    var loadingIconDiv = null;
    var initialized = false;
    //Markup
    function createBackground() {
        var root = uiRoot.element();
        backgroundDiv = document.createElement('div');
        root.appendChild(backgroundDiv);
        hammerhead.shadowUI.addClass(backgroundDiv, BACKGROUND_CLASS);
        loadingTextDiv = document.createElement('div');
        hammerhead.nativeMethods.nodeTextContentSetter.call(loadingTextDiv, LOADING_TEXT);
        root.appendChild(loadingTextDiv);
        hammerhead.shadowUI.addClass(loadingTextDiv, LOADING_TEXT_CLASS);
        loadingIconDiv = document.createElement('div');
        testCafeCore.styleUtils.set(loadingIconDiv, 'visibility', 'hidden');
        root.appendChild(loadingIconDiv);
        hammerhead.shadowUI.addClass(loadingIconDiv, LOADING_ICON_CLASS);
    }
    //Behavior
    function adjustLoadingTextPos() {
        var wHeight = testCafeCore.styleUtils.getHeight(window);
        var wWidth = testCafeCore.styleUtils.getWidth(window);
        var loadingTextHidden = !testCafeCore.styleUtils.hasDimensions(loadingTextDiv);
        if (loadingTextHidden) {
            testCafeCore.styleUtils.set(loadingTextDiv, 'visibility', 'hidden');
            testCafeCore.styleUtils.set(loadingTextDiv, 'display', 'block');
        }
        testCafeCore.styleUtils.set(loadingTextDiv, {
            left: Math.max((wWidth - testCafeCore.styleUtils.getWidth(loadingTextDiv)) / 2, 0) + 'px',
            top: Math.max((wHeight - testCafeCore.styleUtils.getHeight(loadingTextDiv)) / 2, 0) + 'px',
        });
        if (loadingTextHidden) {
            testCafeCore.styleUtils.set(loadingTextDiv, 'display', 'none');
            testCafeCore.styleUtils.set(loadingTextDiv, 'visibility', '');
        }
    }
    function initSizeAdjustments() {
        var adjust = function () {
            var wHeight = testCafeCore.styleUtils.getHeight(window);
            var wWidth = testCafeCore.styleUtils.getWidth(window);
            testCafeCore.styleUtils.set(backgroundDiv, 'width', wWidth + 'px');
            testCafeCore.styleUtils.set(backgroundDiv, 'height', wHeight + 'px');
            testCafeCore.styleUtils.set(loadingIconDiv, {
                left: Math.round((wWidth - testCafeCore.styleUtils.getWidth(loadingIconDiv)) / 2) + 'px',
                top: Math.round((wHeight - testCafeCore.styleUtils.getHeight(loadingIconDiv)) / 2) + 'px',
            });
        };
        adjust();
        testCafeCore.eventUtils.bind(window, 'resize', adjust);
    }
    function init() {
        createBackground();
        initSizeAdjustments();
        adjustLoadingTextPos();
        initialized = true;
    }
    function initAndShowLoadingText() {
        var shown = false;
        //NOTE: init and show modal background as soon as possible
        var initAndShow = function () {
            init();
            testCafeCore.styleUtils.set(backgroundDiv, 'opacity', BACKGROUND_OPACITY_WITH_LOADING_TEXT);
            testCafeCore.styleUtils.set(backgroundDiv, 'display', 'block');
            testCafeCore.styleUtils.set(loadingTextDiv, 'display', 'block');
            shown = true;
        };
        var tryShowBeforeReady = function () {
            if (!shown) {
                if (document.body)
                    initAndShow();
                else
                    hammerhead.nativeMethods.setTimeout.call(window, tryShowBeforeReady, 0);
            }
        };
        tryShowBeforeReady();
        //NOTE: ensure that background was shown on ready
        testCafeCore.eventUtils
            .documentReady()
            .then(function () {
            if (!shown)
                initAndShow();
        });
    }
    function show(transparent) {
        if (!initialized)
            init();
        testCafeCore.styleUtils.set(backgroundDiv, 'opacity', transparent ? 0 : BACKGROUND_OPACITY);
        testCafeCore.styleUtils.set(backgroundDiv, 'display', 'block');
    }
    function hide() {
        if (!initialized)
            return;
        testCafeCore.styleUtils.set(loadingTextDiv, 'display', 'none');
        testCafeCore.styleUtils.set(backgroundDiv, 'display', 'none');
    }
    function showLoadingIcon() {
        testCafeCore.styleUtils.set(loadingIconDiv, 'visibility', 'visible');
    }
    function hideLoadingIcon() {
        testCafeCore.styleUtils.set(loadingIconDiv, 'visibility', 'hidden');
    }

    var modalBackground = /*#__PURE__*/Object.freeze({
        __proto__: null,
        initAndShowLoadingText: initAndShowLoadingText,
        show: show,
        hide: hide,
        showLoadingIcon: showLoadingIcon,
        hideLoadingIcon: hideLoadingIcon
    });

    var shadowUI$1 = hammerhead__default.shadowUI;
    var styleUtils$1 = testCafeCore__default.styleUtils;
    var CONTAINER_CLASS = 'progress-bar';
    var VALUE_CLASS = 'value';
    var SUCCESS_CLASS = 'success';
    var ProgressBar = /** @class */ (function () {
        function ProgressBar(containerElement) {
            this.containerElement = document.createElement('div');
            this.valueElement = document.createElement('div');
            containerElement.appendChild(this.containerElement);
            this.containerElement.appendChild(this.valueElement);
            shadowUI$1.addClass(this.containerElement, CONTAINER_CLASS);
            shadowUI$1.addClass(this.valueElement, VALUE_CLASS);
        }
        ProgressBar.prototype.setValue = function (value) {
            value = typeof value !== 'number' ? 0 : Math.min(Math.max(value, 0), 100);
            styleUtils$1.set(this.valueElement, 'width', value + '%');
        };
        ProgressBar.prototype.setSuccess = function (value) {
            if (value)
                shadowUI$1.addClass(this.containerElement, SUCCESS_CLASS);
            else
                shadowUI$1.removeClass(this.containerElement, SUCCESS_CLASS);
        };
        return ProgressBar;
    }());

    var shadowUI$2 = hammerhead__default.shadowUI;
    var nativeMethods$1 = hammerhead__default.nativeMethods;
    var eventUtils$1 = testCafeCore__default.eventUtils;
    var styleUtils$2 = testCafeCore__default.styleUtils;
    var PANEL_CLASS = 'progress-panel';
    var TITLE_CLASS = 'title';
    var CONTENT_CLASS = 'content';
    var UPDATE_INTERVAL = 100;
    var ANIMATION_UPDATE_INTERVAL = 10;
    var OPENING_DELAY = 300;
    var SHOWING_DELAY = 200;
    var HIDING_DELAY = 600;
    var MIN_SHOWING_TIME = 1000;
    var ProgressPanel = /** @class */ (function () {
        function ProgressPanel() {
            var _this = this;
            this.startTime = null;
            this.openingTimeout = null;
            this.updateInterval = null;
            this.animationInterval = null;
            this.panelDiv = document.createElement('div');
            uiRoot.element().appendChild(this.panelDiv);
            this.titleDiv = document.createElement('div');
            this.panelDiv.appendChild(this.titleDiv);
            this.contentDiv = document.createElement('div');
            this.panelDiv.appendChild(this.contentDiv);
            shadowUI$2.addClass(this.panelDiv, PANEL_CLASS);
            shadowUI$2.addClass(this.titleDiv, TITLE_CLASS);
            shadowUI$2.addClass(this.contentDiv, CONTENT_CLASS);
            ProgressPanel._showAtWindowCenter(this.panelDiv);
            this.progressBar = new ProgressBar(this.contentDiv);
            this.disposePanel = function () { return ProgressPanel._showAtWindowCenter(_this.panelDiv); };
        }
        ProgressPanel._getInvisibleElementProperty = function (element, property) {
            var needShowElement = styleUtils$2.get(element, 'display') === 'none';
            if (needShowElement)
                styleUtils$2.set(element, 'display', 'block');
            var value = element[property];
            if (needShowElement)
                styleUtils$2.set(element, 'display', 'none');
            return value;
        };
        ProgressPanel._showAtWindowCenter = function (element) {
            var elementHeight = ProgressPanel._getInvisibleElementProperty(element, 'offsetHeight');
            var elementWidth = ProgressPanel._getInvisibleElementProperty(element, 'offsetWidth');
            var top = Math.round(styleUtils$2.getHeight(window) / 2 - elementHeight / 2);
            var left = Math.round(styleUtils$2.getWidth(window) / 2 - elementWidth / 2);
            styleUtils$2.set(element, {
                left: left + 'px',
                top: top + 'px',
            });
        };
        ProgressPanel.prototype._setCurrentProgress = function () {
            var progress = Math.round((nativeMethods$1.dateNow() - this.startTime) / this.maxTimeout * 100);
            this.progressBar.setValue(progress);
        };
        ProgressPanel.prototype._setSuccess = function (value) {
            this.progressBar.setSuccess(value);
        };
        ProgressPanel.prototype._stopAnimation = function () {
            nativeMethods$1.clearInterval.call(window, this.animationInterval);
        };
        ProgressPanel.prototype._animate = function (el, duration, show, complete) {
            var _this = this;
            var startTime = nativeMethods$1.dateNow();
            var startOpacityValue = show ? 0 : 1;
            var passedTime = 0;
            var progress = 0;
            var delta = 0;
            if (show) {
                styleUtils$2.set(el, 'opacity', startOpacityValue);
                styleUtils$2.set(el, 'display', 'block');
            }
            this._stopAnimation();
            this.animationInterval = nativeMethods$1.setInterval.call(window, function () {
                passedTime = nativeMethods$1.dateNow() - startTime;
                progress = Math.min(passedTime / duration, 1);
                delta = 0.5 - Math.cos(progress * Math.PI) / 2;
                styleUtils$2.set(el, 'opacity', startOpacityValue + (show ? delta : -delta));
                if (progress === 1) {
                    _this._stopAnimation();
                    if (complete)
                        complete();
                }
            }, ANIMATION_UPDATE_INTERVAL);
        };
        ProgressPanel.prototype._showPanel = function () {
            eventUtils$1.bind(window, 'resize', this.disposePanel);
            this._animate(this.panelDiv, SHOWING_DELAY, true);
        };
        ProgressPanel.prototype._hidePanel = function (force) {
            var _this = this;
            this.startTime = null;
            eventUtils$1.unbind(window, 'resize', this.disposePanel);
            this._animate(this.panelDiv, force ? 0 : HIDING_DELAY, false, function () { return styleUtils$2.set(_this.panelDiv, 'display', 'none'); });
        };
        ProgressPanel.prototype.show = function (text, timeout) {
            var _this = this;
            this.startTime = nativeMethods$1.dateNow();
            this.maxTimeout = timeout;
            nativeMethods$1.nodeTextContentSetter.call(this.titleDiv, text);
            this._setSuccess(false);
            this.openingTimeout = nativeMethods$1.setTimeout.call(window, function () {
                _this.openingTimeout = null;
                _this._setCurrentProgress();
                _this._showPanel();
                _this.updateInterval = nativeMethods$1.setInterval.call(window, function () { return _this._setCurrentProgress(); }, UPDATE_INTERVAL);
            }, OPENING_DELAY);
        };
        ProgressPanel.prototype.close = function (success) {
            var _this = this;
            if (success)
                this._setSuccess(true);
            if (this.openingTimeout) {
                nativeMethods$1.clearTimeout.call(window, this.openingTimeout);
                this.openingTimeout = null;
            }
            if (this.updateInterval) {
                nativeMethods$1.clearInterval.call(window, this.updateInterval);
                this.updateInterval = null;
            }
            if (success) {
                if (this.startTime && nativeMethods$1.dateNow() - this.startTime < MIN_SHOWING_TIME) {
                    nativeMethods$1.setTimeout.call(window, function () {
                        nativeMethods$1.setTimeout.call(window, function () { return _this._hidePanel(false); }, SHOWING_DELAY);
                    }, UPDATE_INTERVAL);
                }
                else
                    nativeMethods$1.setTimeout.call(window, function () { return _this._hidePanel(false); }, SHOWING_DELAY);
            }
            else
                this._hidePanel(true);
        };
        return ProgressPanel;
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

    var shadowUI$3 = hammerhead__default.shadowUI;
    var nativeMethods$2 = hammerhead__default.nativeMethods;
    var styleUtils$3 = testCafeCore__default.styleUtils;
    var DETERMINATE_STYLE_CLASS = 'determinate';
    var ANIMATION_UPDATE_INTERVAL$1 = 10;
    var DeterminateIndicator = /** @class */ (function () {
        function DeterminateIndicator(progressBar, firstValue) {
            this.progressBar = progressBar;
            this.firstValueElement = firstValue;
            this.maxTimeout = null;
            this.startTime = null;
            this.animationInterval = null;
        }
        DeterminateIndicator.prototype._setCurrentProgress = function () {
            var progress = (nativeMethods$2.dateNow() - this.startTime) / this.maxTimeout;
            var percent = Math.min(Math.max(progress, 0), 1);
            var progressBarWidth = styleUtils$3.getWidth(this.progressBar);
            var newWidth = Math.round(progressBarWidth * percent);
            styleUtils$3.set(this.firstValueElement, 'width', newWidth + 'px');
        };
        DeterminateIndicator.prototype.start = function (maxTimeout, startTime) {
            var _this = this;
            shadowUI$3.addClass(this.progressBar, DETERMINATE_STYLE_CLASS);
            this.maxTimeout = maxTimeout;
            this.startTime = startTime || nativeMethods$2.dateNow();
            this._setCurrentProgress();
            this.animationInterval = nativeMethods$2.setInterval.call(window, function () { return _this._setCurrentProgress(); }, ANIMATION_UPDATE_INTERVAL$1);
        };
        DeterminateIndicator.prototype.stop = function () {
            if (this.animationInterval) {
                nativeMethods$2.clearInterval.call(window, this.animationInterval);
                this.animationInterval = null;
            }
        };
        DeterminateIndicator.prototype.reset = function () {
            styleUtils$3.set(this.firstValueElement, 'width', 0);
            shadowUI$3.removeClass(this.progressBar, DETERMINATE_STYLE_CLASS);
        };
        return DeterminateIndicator;
    }());

    function getLineYByXCoord(startLine, endLine, x) {
        if (endLine.x === startLine.x)
            return 0;
        var equationSlope = (endLine.y - startLine.y) / (endLine.x - startLine.x);
        var equationYIntercept = startLine.x * (startLine.y - endLine.y) / (endLine.x - startLine.x) + startLine.y;
        return Math.round(equationSlope * x + equationYIntercept);
    }

    var shadowUI$4 = hammerhead__default.shadowUI;
    var nativeMethods$3 = hammerhead__default.nativeMethods;
    var styleUtils$4 = testCafeCore__default.styleUtils;
    var FIRST_VALUE_ANIMATION_OPTIONS = {
        time: 2800,
        points: [0.815, 0.395],
        positionByCompletePercent: {
            0: { left: -35, right: 100 },
            0.6: { left: 100, right: -90 },
            1: { left: 100, right: -90 },
        },
    };
    var SECOND_VALUE_ANIMATION_OPTIONS = {
        time: 3000,
        points: [0.84, 1],
        positionByCompletePercent: {
            0: { left: -200, right: 100 },
            0.6: { left: 107, right: -8 },
            1: { left: 107, right: -8 },
        },
    };
    var SECOND_VALUE_ELEMENT_ANIMATION_DELAY = 1000;
    var ANIMATION_UPDATE_INTERVAL$2 = 10;
    var ANIMATION_RESTART_INTERVAL = 1950;
    var ANIMATION_PERCENTS = {
        start: 0,
        middle: 0.6,
        end: 1,
    };
    var INDETERMINATE_STYLE_CLASS = 'indeterminate';
    //Utils
    // NOTE: we use Bezier curves to establish a correspondence between
    // time and the animation percent. The curve we build by two point.
    function getCompletePercent(time, y1, y2) {
        return 3 * Math.pow(1 - time, 2) * time * y1 + 3 * (1 - time) * time * time * y2 + time * time * time;
    }
    function getNewPosition(completePercent, positions) {
        var isFirstAnimationPart = completePercent < ANIMATION_PERCENTS.middle;
        var startPercent = isFirstAnimationPart ? ANIMATION_PERCENTS.start : ANIMATION_PERCENTS.middle;
        var endPercent = isFirstAnimationPart ? ANIMATION_PERCENTS.middle : ANIMATION_PERCENTS.end;
        var startPosition = positions[startPercent];
        var endPosition = positions[endPercent];
        var startPoint = { x: startPercent, y: startPosition.left };
        var endPoint = { x: endPercent, y: endPosition.left };
        var left = getLineYByXCoord(startPoint, endPoint, completePercent);
        startPoint = { x: startPercent, y: startPosition.right };
        endPoint = { x: endPercent, y: endPosition.right };
        var right = getLineYByXCoord(startPoint, endPoint, completePercent);
        return { left: left, right: right };
    }
    var IndeterminateIndicator = /** @class */ (function () {
        function IndeterminateIndicator(progressBar, firstValue, secondValue) {
            this.progressBar = progressBar;
            this.firstValue = firstValue;
            this.secondValue = secondValue;
            this.animationInterval = null;
            this.secondValueAnimationInterval = null;
            this.secondValueAnimationTimeout = null;
            this.restartAnimationTimeout = null;
        }
        IndeterminateIndicator._updateValueAnimation = function (startTime, valueElement, animationOptions) {
            var animationTime = animationOptions.time;
            var animationPoints = animationOptions.points;
            var positions = animationOptions.positionByCompletePercent;
            var currentTime = nativeMethods$3.dateNow() - startTime;
            var timePercent = currentTime / animationTime;
            var completePercent = getCompletePercent(timePercent, animationPoints[0], animationPoints[1]);
            var _a = getNewPosition(completePercent, positions), left = _a.left, right = _a.right;
            styleUtils$4.set(valueElement, 'left', Math.round(left) + '%');
            styleUtils$4.set(valueElement, 'right', Math.round(right) + '%');
        };
        IndeterminateIndicator.prototype._clearFirstValueAnimation = function () {
            if (this.animationInterval) {
                nativeMethods$3.clearInterval.call(window, this.animationInterval);
                this.animationInterval = null;
            }
            styleUtils$4.set(this.firstValue, 'left', '-35%');
            styleUtils$4.set(this.firstValue, 'right', '100%');
        };
        IndeterminateIndicator.prototype._clearSecondValueAnimation = function () {
            if (this.secondValueAnimationInterval) {
                nativeMethods$3.clearInterval.call(window, this.secondValueAnimationInterval);
                this.secondValueAnimationInterval = null;
            }
            styleUtils$4.set(this.secondValue, 'left', '-200%');
            styleUtils$4.set(this.secondValue, 'right', '100%');
        };
        IndeterminateIndicator.prototype._startFirstValueAnimation = function () {
            var _this = this;
            this._clearFirstValueAnimation();
            var startTime = nativeMethods$3.dateNow();
            this.animationInterval = nativeMethods$3.setInterval.call(window, function () {
                IndeterminateIndicator._updateValueAnimation(startTime, _this.firstValue, FIRST_VALUE_ANIMATION_OPTIONS);
            }, ANIMATION_UPDATE_INTERVAL$2);
        };
        IndeterminateIndicator.prototype._startSecondValueAnimation = function () {
            var _this = this;
            this._clearSecondValueAnimation();
            var startTime = nativeMethods$3.dateNow();
            this.secondValueAnimationInterval = nativeMethods$3.setInterval.call(window, function () {
                IndeterminateIndicator._updateValueAnimation(startTime, _this.secondValue, SECOND_VALUE_ANIMATION_OPTIONS);
            }, ANIMATION_UPDATE_INTERVAL$2);
        };
        IndeterminateIndicator.prototype._startAnimation = function () {
            var _this = this;
            this._startFirstValueAnimation();
            this.secondValueAnimationTimeout = nativeMethods$3.setTimeout.call(window, function () { return _this._startSecondValueAnimation(); }, SECOND_VALUE_ELEMENT_ANIMATION_DELAY);
            this.restartAnimationTimeout = nativeMethods$3.setTimeout.call(window, function () { return _this._startAnimation(); }, ANIMATION_RESTART_INTERVAL);
        };
        IndeterminateIndicator.prototype._stopAnimation = function () {
            this._clearFirstValueAnimation();
            this._clearSecondValueAnimation();
            if (this.secondValueAnimationTimeout) {
                nativeMethods$3.clearInterval.call(window, this.secondValueAnimationTimeout);
                this.secondValueAnimationTimeout = null;
            }
            if (this.restartAnimationTimeout) {
                nativeMethods$3.clearInterval.call(window, this.restartAnimationTimeout);
                this.restartAnimationTimeout = null;
            }
        };
        IndeterminateIndicator.prototype.start = function () {
            shadowUI$4.addClass(this.progressBar, INDETERMINATE_STYLE_CLASS);
            this._startAnimation();
        };
        IndeterminateIndicator.prototype.stop = function () {
            shadowUI$4.removeClass(this.progressBar, INDETERMINATE_STYLE_CLASS);
            this._stopAnimation();
        };
        return IndeterminateIndicator;
    }());

    var shadowUI$5 = hammerhead__default.shadowUI;
    var styleUtils$5 = testCafeCore__default.styleUtils;
    var PROGRESS_BAR_CLASS = 'progress-bar';
    var CONTAINER_CLASS$1 = 'value-container';
    var VALUE_CLASS$1 = 'value';
    var ProgressBar$1 = /** @class */ (function () {
        function ProgressBar(containerElement) {
            this.progressBar = null;
            this.firstValueElement = null;
            this.secondValueElement = null;
            this._create(containerElement);
            this.determinateIndicator = new DeterminateIndicator(this.progressBar, this.firstValueElement);
            this.indeterminateIndicator = new IndeterminateIndicator(this.progressBar, this.firstValueElement, this.secondValueElement);
        }
        ProgressBar.prototype._create = function (containerElement) {
            this.progressBar = document.createElement('div');
            shadowUI$5.addClass(this.progressBar, PROGRESS_BAR_CLASS);
            containerElement.appendChild(this.progressBar);
            var container = document.createElement('div');
            shadowUI$5.addClass(container, CONTAINER_CLASS$1);
            this.progressBar.appendChild(container);
            this.firstValueElement = document.createElement('div');
            shadowUI$5.addClass(this.firstValueElement, VALUE_CLASS$1);
            container.appendChild(this.firstValueElement);
            this.secondValueElement = document.createElement('div');
            shadowUI$5.addClass(this.secondValueElement, VALUE_CLASS$1);
            container.appendChild(this.secondValueElement);
        };
        ProgressBar.prototype.show = function () {
            styleUtils$5.set(this.progressBar, 'visibility', 'visible');
        };
        ProgressBar.prototype.hide = function () {
            styleUtils$5.set(this.progressBar, 'visibility', 'hidden');
        };
        return ProgressBar;
    }());

    var MESSAGES = {
        startWaitingElement: 'start-waiting-element',
        endWaitingElementRequest: 'end-waiting-element-request',
        endWaitingElementResponse: 'end-waiting-element-response',
        startWaitingAssertionRetries: 'start-waiting-assertion-retries',
        endWaitingAssertionRetriesRequest: 'end-waiting-assertion-retries-request',
        endWaitingAssertionRetriesResponse: 'end-waiting-assertion-retries-response',
    };

    var DEBUG_ACTION = {
        step: 'step',
        resume: 'resume',
    };

    function isIframeWindow(window) {
        return window.top !== window;
    }

    var Promise = hammerhead__default.Promise;
    var shadowUI$6 = hammerhead__default.shadowUI;
    var nativeMethods$4 = hammerhead__default.nativeMethods;
    var messageSandbox = hammerhead__default.eventSandbox.message;
    var browserUtils$1 = hammerhead__default.utils.browser;
    var featureDetection$1 = hammerhead__default.utils.featureDetection;
    var listeners$1 = hammerhead__default.eventSandbox.listeners;
    var styleUtils$6 = testCafeCore__default.styleUtils;
    var eventUtils$2 = testCafeCore__default.eventUtils;
    var domUtils$1 = testCafeCore__default.domUtils;
    var serviceUtils = testCafeCore__default.serviceUtils;
    var arrayUtils$1 = testCafeCore__default.arrayUtils;
    var STATUS_BAR_CLASS = 'status-bar';
    var ICON_CLASS = 'icon';
    var INFO_CONTAINER_CLASS = 'info-container';
    var INFO_TEXT_CONTAINER_CLASS = 'info-text-container';
    var ACTIONS_CONTAINER_CLASS = 'actions-container';
    var FIXTURE_DIV_CLASS = 'fixture';
    var STATUS_CONTAINER_CLASS = 'status-container';
    var INFO_CLASS = 'info';
    var STATUS_DIV_CLASS = 'status';
    var USER_AGENT_DIV_CLASS = 'user-agent';
    var BUTTONS_CLASS = 'buttons';
    var BUTTON_CLASS = 'button';
    var BUTTON_ICON_CLASS = 'button-icon';
    var LOCKED_BUTTON_CLASS = 'locked';
    var UNLOCKED_BUTTON_CLASS = 'unlocked';
    var RESUME_BUTTON_CLASS = 'resume';
    var STEP_BUTTON_CLASS = 'step';
    var FINISH_BUTTON_CLASS = 'finish';
    var WAITING_FAILED_CLASS = 'waiting-element-failed';
    var WAITING_SUCCESS_CLASS = 'waiting-element-success';
    var LOADING_PAGE_TEXT = 'Loading Web Page...';
    var WAITING_FOR_ELEMENT_TEXT = 'Waiting for element to appear...';
    var WAITING_FOR_ASSERTION_EXECUTION_TEXT = 'Waiting for assertion execution...';
    var DEBUGGING_TEXT = 'Debugging test...';
    var TEST_FAILED_TEXT = 'Test failed';
    var UNLOCK_PAGE_TEXT = 'Unlock Page';
    var PAGE_UNLOCKED_TEXT = 'Page unlocked';
    var SHOWING_DELAY$1 = 300;
    var ANIMATION_DELAY = 500;
    var ANIMATION_UPDATE_INTERVAL$3 = 10;
    var LOCAL_STORAGE_STATUS_PREFIX_ITEM = '%testCafeStatusPrefix%';
    var StatusBar = /** @class */ (function (_super) {
        __extends(StatusBar, _super);
        function StatusBar(userAgent, fixtureName, testName, contextStorage) {
            var _this = _super.call(this) || this;
            _this.UNLOCK_PAGE_BTN_CLICK = 'testcafe|ui|status-bar|unlock-page-btn-click';
            _this.userAgent = userAgent;
            _this.fixtureName = fixtureName;
            _this.testName = testName;
            _this.contextStorage = contextStorage;
            _this.statusBar = null;
            _this.infoContainer = null;
            _this.actionsContainer = null;
            _this.icon = null;
            _this.resumeButton = null;
            _this.finishButton = null;
            _this.nextButton = null;
            _this.statusDiv = null;
            _this.buttons = null;
            _this.progressBar = null;
            _this.animationInterval = null;
            _this.showingTimeout = null;
            _this.windowHeight = document.documentElement ? styleUtils$6.getHeight(window) : window.innerHeight;
            _this.state = {
                created: false,
                showing: false,
                hiding: false,
                debugging: false,
                waiting: false,
                assertionRetries: false,
                hidden: false,
            };
            _this.currentView = null;
            _this._createBeforeReady();
            _this._initChildListening();
            return _this;
        }
        StatusBar.prototype._createButton = function (text, className) {
            var button = document.createElement('div');
            var icon = document.createElement('div');
            var span = document.createElement('span');
            nativeMethods$4.nodeTextContentSetter.call(span, text);
            shadowUI$6.addClass(button, BUTTON_CLASS);
            shadowUI$6.addClass(button, className);
            shadowUI$6.addClass(icon, BUTTON_ICON_CLASS);
            if (browserUtils$1.isSafari) {
                span.style.position = 'relative';
                span.style.top = '1px';
            }
            button.appendChild(icon);
            button.appendChild(span);
            return button;
        };
        StatusBar.prototype._createIconArea = function () {
            this.icon = document.createElement('div');
            shadowUI$6.addClass(this.icon, ICON_CLASS);
            this.statusBar.appendChild(this.icon);
        };
        StatusBar.prototype._createInformationArea = function () {
            this.infoContainer = document.createElement('div');
            shadowUI$6.addClass(this.infoContainer, INFO_CONTAINER_CLASS);
            this.statusBar.appendChild(this.infoContainer);
            var infoTextContainer = document.createElement('div');
            shadowUI$6.addClass(infoTextContainer, INFO_TEXT_CONTAINER_CLASS);
            this.infoContainer.appendChild(infoTextContainer);
            var statusContainer = document.createElement('div');
            shadowUI$6.addClass(statusContainer, STATUS_CONTAINER_CLASS);
            infoTextContainer.appendChild(statusContainer);
            this.statusDiv = document.createElement('div');
            this.statusDiv = document.createElement('div');
            nativeMethods$4.nodeTextContentSetter.call(this.statusDiv, this._getFullStatusText(LOADING_PAGE_TEXT));
            shadowUI$6.addClass(this.statusDiv, STATUS_DIV_CLASS);
            shadowUI$6.addClass(this.statusDiv, INFO_CLASS);
            statusContainer.appendChild(this.statusDiv);
            var fixtureDiv = document.createElement('div');
            nativeMethods$4.nodeTextContentSetter.call(fixtureDiv, "".concat(this.fixtureName, " - ").concat(this.testName));
            shadowUI$6.addClass(fixtureDiv, FIXTURE_DIV_CLASS);
            shadowUI$6.addClass(fixtureDiv, INFO_CLASS);
            statusContainer.appendChild(fixtureDiv);
            var userAgentDiv = document.createElement('div');
            nativeMethods$4.nodeTextContentSetter.call(userAgentDiv, this.userAgent);
            shadowUI$6.addClass(userAgentDiv, USER_AGENT_DIV_CLASS);
            infoTextContainer.appendChild(userAgentDiv);
        };
        StatusBar.prototype._createActionsArea = function () {
            var _this = this;
            this.actionsContainer = document.createElement('div');
            shadowUI$6.addClass(this.actionsContainer, ACTIONS_CONTAINER_CLASS);
            this.statusBar.appendChild(this.actionsContainer);
            this.buttons = document.createElement('div');
            shadowUI$6.addClass(this.buttons, BUTTONS_CLASS);
            this.actionsContainer.appendChild(this.buttons);
            this.unlockButton = this._createButton(UNLOCK_PAGE_TEXT, LOCKED_BUTTON_CLASS);
            this.resumeButton = this._createButton('Resume', RESUME_BUTTON_CLASS);
            this.nextButton = this._createButton('Next Action', STEP_BUTTON_CLASS);
            this.finishButton = this._createButton('Finish', FINISH_BUTTON_CLASS);
            this.buttons.appendChild(this.unlockButton);
            this.buttons.appendChild(this.resumeButton);
            this.buttons.appendChild(this.nextButton);
            this.actionsContainer.style.display = 'none';
            this._bindClickOnce([this.unlockButton], function () {
                shadowUI$6.removeClass(_this.unlockButton, LOCKED_BUTTON_CLASS);
                shadowUI$6.addClass(_this.unlockButton, UNLOCKED_BUTTON_CLASS);
                nativeMethods$4.nodeTextContentSetter.call(_this.unlockButton.querySelector('span'), PAGE_UNLOCKED_TEXT);
                _this.state.locked = false;
                _this.emit(_this.UNLOCK_PAGE_BTN_CLICK, {});
            });
            this.unlockButton.style.display = 'none';
        };
        StatusBar.prototype._create = function () {
            this.statusBar = document.createElement('div');
            shadowUI$6.addClass(this.statusBar, STATUS_BAR_CLASS);
            this._createIconArea();
            this._createInformationArea();
            this._createActionsArea();
            this.progressBar = new ProgressBar$1(this.infoContainer);
            this.progressBar.indeterminateIndicator.start();
            this.progressBar.show();
            uiRoot.element().appendChild(this.statusBar);
            this._bindHandlers();
            this.state.created = true;
        };
        StatusBar.prototype._createBeforeReady = function () {
            var _this = this;
            if (this.state.created || isIframeWindow(window))
                return;
            if (document.body)
                this._create();
            else
                nativeMethods$4.setTimeout.call(window, function () { return _this._createBeforeReady(); }, 0);
        };
        StatusBar.prototype._animate = function (show) {
            var _this = this;
            var startTime = nativeMethods$4.dateNow();
            var startOpacityValue = parseInt(styleUtils$6.get(this.statusBar, 'opacity'), 10) || 0;
            var passedTime = 0;
            var progress = 0;
            var delta = 0;
            this._stopAnimation();
            if (show) {
                styleUtils$6.set(this.statusBar, 'visibility', '');
                this.state.hidden = false;
            }
            this.animationInterval = nativeMethods$4.setInterval.call(window, function () {
                passedTime = nativeMethods$4.dateNow() - startTime;
                progress = Math.min(passedTime / ANIMATION_DELAY, 1);
                delta = 0.5 - Math.cos(progress * Math.PI) / 2;
                styleUtils$6.set(_this.statusBar, 'opacity', startOpacityValue + (show ? delta : -delta));
                if (progress === 1) {
                    _this._stopAnimation();
                    if (!show) {
                        styleUtils$6.set(_this.statusBar, 'visibility', 'hidden');
                        _this.state.hidden = true;
                    }
                    _this.state.showing = false;
                    _this.state.hiding = false;
                }
            }, ANIMATION_UPDATE_INTERVAL$3);
        };
        StatusBar.prototype._stopAnimation = function () {
            if (this.animationInterval) {
                nativeMethods$4.clearInterval.call(window, this.animationInterval);
                this.animationInterval = null;
            }
        };
        StatusBar.prototype._fadeOut = function () {
            if (this.state.hiding || this.state.debugging)
                return;
            this.state.showing = false;
            this.state.hiding = true;
            this._animate();
        };
        StatusBar.prototype._fadeIn = function () {
            if (this.state.showing || this.state.debugging)
                return;
            this.state.hiding = false;
            this.state.showing = true;
            this._animate(true);
        };
        StatusBar.prototype._bindHandlers = function () {
            var _this = this;
            listeners$1.initElementListening(window, ['resize']);
            listeners$1.addInternalEventBeforeListener(window, ['resize'], function () {
                _this.windowHeight = window.innerHeight;
            });
            var statusBarHeight = styleUtils$6.getHeight(this.statusBar);
            listeners$1.addFirstInternalEventBeforeListener(window, ['mousemove', 'mouseout', 'touchmove'], function (e) {
                if (e.type === 'mouseout' && !e.relatedTarget)
                    _this._fadeIn(e);
                else if (e.type === 'mousemove' || e.type === 'touchmove') {
                    if (e.clientY > _this.windowHeight - statusBarHeight)
                        _this._fadeOut(e);
                    else if (_this.state.hidden)
                        _this._fadeIn(e);
                }
            });
        };
        StatusBar.prototype._bindClickOnce = function (elements, handler) {
            var _this = this;
            var eventName = featureDetection$1.isTouchDevice ? 'touchstart' : 'mousedown';
            var downHandler = function (e) {
                var target = nativeMethods$4.eventTargetGetter.call(e);
                var isTargetElement = !!arrayUtils$1.find(elements, function (el) { return domUtils$1.containsElement(el, target); });
                if (isTargetElement) {
                    eventUtils$2.preventDefault(e);
                    listeners$1.removeInternalEventBeforeListener(window, [eventName], downHandler);
                    handler(e);
                }
                else if (domUtils$1.containsElement(_this.statusBar, target))
                    eventUtils$2.preventDefault(e);
            };
            listeners$1.addInternalEventBeforeListener(window, [eventName], downHandler);
        };
        StatusBar.prototype._initChildListening = function () {
            var _this = this;
            messageSandbox.on(messageSandbox.SERVICE_MSG_RECEIVED_EVENT, function (e) {
                var msg = e.message;
                if (msg.cmd === MESSAGES.startWaitingElement)
                    _this.showWaitingElementStatus(msg.timeout);
                else if (msg.cmd === MESSAGES.endWaitingElementRequest) {
                    _this.hideWaitingElementStatus(msg.waitingSuccess)
                        .then(function () { return messageSandbox.sendServiceMsg({ cmd: MESSAGES.endWaitingElementResponse }, e.source); });
                }
                else if (msg.cmd === MESSAGES.startWaitingAssertionRetries)
                    _this.showWaitingAssertionRetriesStatus(msg.timeout);
                else if (msg.cmd === MESSAGES.endWaitingAssertionRetriesRequest) {
                    _this.hideWaitingAssertionRetriesStatus(msg.waitingSuccess)
                        .then(function () { return messageSandbox.sendServiceMsg({ cmd: MESSAGES.endWaitingAssertionRetriesResponse }, e.source); });
                }
            });
        };
        StatusBar.prototype._resetState = function () {
            this.state.debugging = false;
            this.actionsContainer.style.display = 'none';
            this.unlockButton.style.display = 'none';
            nativeMethods$4.nodeTextContentSetter.call(this.statusDiv, this._getFullStatusText(''));
            this.progressBar.hide();
        };
        StatusBar.prototype._getFullStatusText = function (statusText) {
            var prefixText = this.contextStorage.getItem(LOCAL_STORAGE_STATUS_PREFIX_ITEM) || '';
            var separator = prefixText && statusText ? '. ' : '';
            return prefixText + separator + statusText;
        };
        StatusBar.prototype._showWaitingStatus = function () {
            var waitingStatusText = this.state.assertionRetries ? WAITING_FOR_ASSERTION_EXECUTION_TEXT : WAITING_FOR_ELEMENT_TEXT;
            nativeMethods$4.nodeTextContentSetter.call(this.statusDiv, this._getFullStatusText(waitingStatusText));
            this.progressBar.show();
        };
        StatusBar.prototype._hideWaitingStatus = function (forceReset) {
            var _this = this;
            return new Promise(function (resolve) {
                nativeMethods$4.setTimeout.call(window, function () {
                    if (_this.state.waiting || _this.state.debugging) {
                        resolve();
                        return;
                    }
                    shadowUI$6.removeClass(_this.statusBar, WAITING_SUCCESS_CLASS);
                    shadowUI$6.removeClass(_this.statusBar, WAITING_FAILED_CLASS);
                    _this.progressBar.determinateIndicator.reset();
                    _this._resetState();
                    resolve();
                }, forceReset ? 0 : ANIMATION_DELAY);
            });
        };
        StatusBar.prototype._showDebuggingStatus = function (isTestError) {
            var _this = this;
            return new Promise(function (resolve) {
                _this.state.debugging = true;
                _this.state.locked = true;
                if (isTestError) {
                    _this.buttons.removeChild(_this.nextButton);
                    _this.buttons.removeChild(_this.resumeButton);
                    _this.buttons.appendChild(_this.finishButton);
                    nativeMethods$4.nodeTextContentSetter.call(_this.statusDiv, _this._getFullStatusText(TEST_FAILED_TEXT));
                    shadowUI$6.removeClass(_this.statusBar, WAITING_SUCCESS_CLASS);
                    shadowUI$6.addClass(_this.statusBar, WAITING_FAILED_CLASS);
                }
                else
                    nativeMethods$4.nodeTextContentSetter.call(_this.statusDiv, _this._getFullStatusText(DEBUGGING_TEXT));
                _this.actionsContainer.style.display = '';
                _this.unlockButton.style.display = '';
                _this._bindClickOnce([_this.resumeButton, _this.nextButton, _this.finishButton], function (e) {
                    var target = nativeMethods$4.eventTargetGetter.call(e);
                    var isNextButton = domUtils$1.containsElement(_this.nextButton, target);
                    _this._resetState();
                    resolve(isNextButton ? DEBUG_ACTION.step : DEBUG_ACTION.resume);
                });
            });
        };
        StatusBar.prototype._setWaitingStatus = function (timeout, startTime) {
            var _this = this;
            this.state.waiting = true;
            this.progressBar.determinateIndicator.start(timeout, startTime);
            this.showingTimeout = nativeMethods$4.setTimeout.call(window, function () {
                _this.showingTimeout = null;
                _this._showWaitingStatus();
            }, SHOWING_DELAY$1);
        };
        StatusBar.prototype._resetWaitingStatus = function (waitingSuccess) {
            this.state.waiting = false;
            this.progressBar.determinateIndicator.stop();
            if (waitingSuccess)
                shadowUI$6.addClass(this.statusBar, WAITING_SUCCESS_CLASS);
            else
                shadowUI$6.addClass(this.statusBar, WAITING_FAILED_CLASS);
            var forceReset = this.showingTimeout && waitingSuccess;
            if (this.showingTimeout) {
                nativeMethods$4.clearTimeout.call(window, this.showingTimeout);
                this.showingTimeout = null;
                if (!waitingSuccess)
                    this._showWaitingStatus();
            }
            return this._hideWaitingStatus(forceReset);
        };
        //API
        StatusBar.prototype.hidePageLoadingStatus = function () {
            if (!this.state.created)
                this._create();
            this.progressBar.indeterminateIndicator.stop();
            this._resetState();
        };
        StatusBar.prototype.showDebuggingStatus = function (isTestError) {
            this._stopAnimation();
            styleUtils$6.set(this.statusBar, 'opacity', 1);
            styleUtils$6.set(this.statusBar, 'visibility', '');
            this.state.hiden = false;
            return this._showDebuggingStatus(isTestError);
        };
        StatusBar.prototype.showWaitingElementStatus = function (timeout) {
            if (!this.state.assertionRetries)
                this._setWaitingStatus(timeout);
        };
        StatusBar.prototype.hideWaitingElementStatus = function (waitingSuccess) {
            if (!this.state.assertionRetries)
                return this._resetWaitingStatus(waitingSuccess);
            return Promise.resolve();
        };
        StatusBar.prototype.showWaitingAssertionRetriesStatus = function (timeout, startTime) {
            this.state.assertionRetries = true;
            this._setWaitingStatus(timeout, startTime);
        };
        StatusBar.prototype.hideWaitingAssertionRetriesStatus = function (waitingSuccess) {
            var _this = this;
            return this._resetWaitingStatus(waitingSuccess)
                .then(function () {
                _this.state.assertionRetries = false;
            });
        };
        StatusBar.prototype.setStatusPrefix = function (prefixText) {
            this.contextStorage.setItem(LOCAL_STORAGE_STATUS_PREFIX_ITEM, prefixText);
            nativeMethods$4.nodeTextContentSetter.call(this.statusDiv, this._getFullStatusText(''));
        };
        return StatusBar;
    }(serviceUtils.EventEmitter));

    var sendRequestToFrame = testCafeCore__default.sendRequestToFrame;
    var messageSandbox$1 = hammerhead__default.eventSandbox.message;
    var IframeStatusBar = /** @class */ (function (_super) {
        __extends(IframeStatusBar, _super);
        function IframeStatusBar() {
            return _super.call(this) || this;
        }
        //API
        IframeStatusBar.prototype.showWaitingElementStatus = function (timeout) {
            messageSandbox$1.sendServiceMsg({ cmd: MESSAGES.startWaitingElement, timeout: timeout }, window.top);
        };
        IframeStatusBar.prototype.hideWaitingElementStatus = function (waitingSuccess) {
            var msg = { cmd: MESSAGES.endWaitingElementRequest, waitingSuccess: waitingSuccess };
            return sendRequestToFrame(msg, MESSAGES.endWaitingElementResponse, window.top);
        };
        IframeStatusBar.prototype.showWaitingAssertionRetriesStatus = function (timeout) {
            messageSandbox$1.sendServiceMsg({ cmd: MESSAGES.startWaitingAssertionRetries, timeout: timeout }, window.top);
        };
        IframeStatusBar.prototype.hideWaitingAssertionRetriesStatus = function (waitingSuccess) {
            var msg = { cmd: MESSAGES.endWaitingAssertionRetriesRequest, waitingSuccess: waitingSuccess };
            return sendRequestToFrame(msg, MESSAGES.endWaitingAssertionRetriesResponse, window.top);
        };
        return IframeStatusBar;
    }(StatusBar));

    var CURSOR_UI_MESSAGES = {
        moveRequest: 'ui|cursor|move|request',
        leftButtonDownRequest: 'ui|cursor|leftbuttondown|request',
        rightButtonDownRequest: 'ui|cursor|rightbuttondown|request',
        buttonUpRequest: 'ui|cursor|buttonup|request',
        moveResponse: 'ui|cursor|move|response',
        leftButtonDownResponse: 'ui|cursor|leftbuttondown|response',
        rightButtonDownResponse: 'ui|cursor|rightbuttondown|response',
        buttonUpResponse: 'ui|cursor|buttonup|response',
    };

    var Promise$1 = hammerhead__default.Promise;
    var shadowUI$7 = hammerhead__default.shadowUI;
    var browserUtils$2 = hammerhead__default.utils.browser;
    var featureDetection$2 = hammerhead__default.utils.featureDetection;
    var messageSandbox$2 = hammerhead__default.eventSandbox.message;
    var styleUtils$7 = testCafeCore__default.styleUtils;
    var positionUtils$1 = testCafeCore__default.positionUtils;
    var CURSOR_CLASS = 'cursor';
    var TOUCH_CLASS = 'touch';
    var L_MOUSE_DOWN_CLASS = 'l-mouse-down';
    var R_MOUSE_DOWN_CLASS = 'r-mouse-down';
    var STATE_CLASSES = [L_MOUSE_DOWN_CLASS, R_MOUSE_DOWN_CLASS].join(' ');
    // Setup cross-iframe interaction
    messageSandbox$2.on(messageSandbox$2.SERVICE_MSG_RECEIVED_EVENT, function (e) {
        var msg = e.message;
        switch (msg.cmd) {
            case CURSOR_UI_MESSAGES.moveRequest:
                CursorUI.move(positionUtils$1.getIframePointRelativeToParentFrame({ x: msg.x, y: msg.y }, e.source))
                    .then(function () { return messageSandbox$2.sendServiceMsg({ cmd: CURSOR_UI_MESSAGES.moveResponse }, e.source); });
                break;
            case CURSOR_UI_MESSAGES.leftButtonDownRequest:
                CursorUI.leftButtonDown()
                    .then(function () { return messageSandbox$2.sendServiceMsg({ cmd: CURSOR_UI_MESSAGES.leftButtonDownResponse }, e.source); });
                break;
            case CURSOR_UI_MESSAGES.rightButtonDownRequest:
                CursorUI.rightButtonDown()
                    .then(function () { return messageSandbox$2.sendServiceMsg({ cmd: CURSOR_UI_MESSAGES.rightButtonDownResponse }, e.source); });
                break;
            case CURSOR_UI_MESSAGES.buttonUpRequest:
                CursorUI.buttonUp()
                    .then(function () { return messageSandbox$2.sendServiceMsg({ cmd: CURSOR_UI_MESSAGES.buttonUpResponse }, e.source); });
                break;
        }
    });
    var CursorUI = {
        cursorElement: null,
        x: 50,
        y: 50,
        pointerOffsetX: 0,
        pointerOffsetY: 0,
        _createElement: function () {
            this.cursorElement = document.createElement('div');
            shadowUI$7.addClass(this.cursorElement, CURSOR_CLASS);
            // NOTE: For IE, we can't use the touch cursor in a cross-domain iframe
            // because we won't be able to get an element under the cursor
            if (featureDetection$2.isTouchDevice && !browserUtils$2.isIE) {
                shadowUI$7.addClass(this.cursorElement, TOUCH_CLASS);
                // NOTE: in touch mode, the pointer should be in the center of the cursor
                this.pointerOffsetX = Math.ceil(styleUtils$7.getWidth(this.cursorElement) / 2);
                this.pointerOffsetY = Math.ceil(styleUtils$7.getHeight(this.cursorElement) / 2);
            }
            uiRoot.element().appendChild(this.cursorElement);
        },
        isVisible: function () {
            return this.cursorElement && styleUtils$7.get(this.cursorElement, 'visibility') !== 'hidden';
        },
        hide: function () {
            if (!this.cursorElement)
                this._createElement();
            if (this.isVisible())
                styleUtils$7.set(this.cursorElement, 'visibility', 'hidden');
        },
        show: function () {
            if (!this.cursorElement)
                this._createElement();
            styleUtils$7.set(this.cursorElement, 'visibility', '');
        },
        move: function (position) {
            this.x = position.x;
            this.y = position.y;
            if (!this.cursorElement)
                this._createElement();
            styleUtils$7.set(this.cursorElement, {
                left: this.x - this.pointerOffsetX + 'px',
                top: this.y - this.pointerOffsetY + 'px',
            });
            return Promise$1.resolve();
        },
        leftButtonDown: function () {
            if (!this.cursorElement)
                this._createElement();
            shadowUI$7.removeClass(this.cursorElement, STATE_CLASSES);
            shadowUI$7.addClass(this.cursorElement, L_MOUSE_DOWN_CLASS);
            return Promise$1.resolve();
        },
        rightButtonDown: function () {
            if (!this.cursorElement)
                this._createElement();
            shadowUI$7.removeClass(this.cursorElement, STATE_CLASSES);
            shadowUI$7.addClass(this.cursorElement, R_MOUSE_DOWN_CLASS);
            return Promise$1.resolve();
        },
        buttonUp: function () {
            if (!this.cursorElement)
                this._createElement();
            shadowUI$7.removeClass(this.cursorElement, STATE_CLASSES);
            return Promise$1.resolve();
        },
    };

    var browserUtils$3 = hammerhead__default.utils.browser;
    // HACK: In most browsers, the iframe's getElementFromPoint function ignores elements
    // from the parent frame. But in IE it doesn't, and our cursor overlaps the target
    // element. So, we move the cursor to a position one pixel farther to avoid this.
    var RECOGNITION_INCREMENT = browserUtils$3.isIE ? 1 : 0;
    var iframeCursorUI = {
        move: function (position) {
            var msg = {
                cmd: CURSOR_UI_MESSAGES.moveRequest,
                x: position.x + RECOGNITION_INCREMENT,
                y: position.y + RECOGNITION_INCREMENT,
            };
            return testCafeCore.sendRequestToFrame(msg, CURSOR_UI_MESSAGES.moveResponse, window.parent);
        },
        leftButtonDown: function () {
            return testCafeCore.sendRequestToFrame({
                cmd: CURSOR_UI_MESSAGES.leftButtonDownRequest,
            }, CURSOR_UI_MESSAGES.leftButtonDownResponse, window.parent);
        },
        rightButtonDown: function () {
            return testCafeCore.sendRequestToFrame({
                cmd: CURSOR_UI_MESSAGES.rightButtonDownRequest,
            }, CURSOR_UI_MESSAGES.rightButtonDownResponse, window.parent);
        },
        buttonUp: function () {
            return testCafeCore.sendRequestToFrame({
                cmd: CURSOR_UI_MESSAGES.buttonUpRequest,
            }, CURSOR_UI_MESSAGES.buttonUpResponse, window.parent);
        },
    };

    // -------------------------------------------------------------
    var MARK_LENGTH = 32;
    var MARK_HEIGHT = 10;
    var MARK_RIGHT_MARGIN = 10;

    var screenshotMark = {
        screenshotMark: null,
        _createMark: function () {
            this.screenshotMark = document.createElement('img');
            hammerhead.shadowUI.addClass(this.screenshotMark, 'screenshot-mark');
            this.screenshotMark.style.right = MARK_RIGHT_MARGIN / window.devicePixelRatio + 'px';
            this.screenshotMark.style.width = MARK_LENGTH / window.devicePixelRatio + 'px';
            this.screenshotMark.style.height = MARK_HEIGHT / window.devicePixelRatio + 'px';
            this.hide();
            hammerhead.shadowUI.getRoot().appendChild(this.screenshotMark);
        },
        hide: function () {
            if (!this.screenshotMark)
                return;
            this.screenshotMark.style.visibility = 'hidden';
        },
        show: function (url) {
            if (!this.screenshotMark)
                this._createMark();
            hammerhead.nativeMethods.imageSrcSetter.call(this.screenshotMark, url);
            this.screenshotMark.style.visibility = '';
        },
    };

    var Promise$2 = hammerhead__default.Promise;
    var messageSandbox$3 = hammerhead__default.eventSandbox.message;
    var sendRequestToFrame$1 = testCafeCore__default.sendRequestToFrame;
    var HIDE_REQUEST_CMD = 'ui|hide|request';
    var HIDE_RESPONSE_CMD = 'ui|hide|response';
    var SHOW_REQUEST_CMD = 'ui|show|request';
    var SHOW_RESPONSE_CMD = 'ui|show|response';
    // Setup cross-iframe interaction
    messageSandbox$3.on(messageSandbox$3.SERVICE_MSG_RECEIVED_EVENT, function (e) {
        if (e.message.cmd === HIDE_REQUEST_CMD) {
            uiRoot.hide();
            messageSandbox$3.sendServiceMsg({ cmd: HIDE_RESPONSE_CMD }, e.source);
        }
        else if (e.message.cmd === SHOW_REQUEST_CMD) {
            uiRoot.show();
            messageSandbox$3.sendServiceMsg({ cmd: SHOW_RESPONSE_CMD }, e.source);
        }
    });
    var exports$1 = {};
    exports$1.uiRoot = uiRoot;
    exports$1.cursorUI = CursorUI;
    exports$1.iframeCursorUI = iframeCursorUI;
    exports$1.selectElement = selectElement;
    exports$1.modalBackground = modalBackground;
    exports$1.ProgressPanel = ProgressPanel;
    exports$1.StatusBar = StatusBar;
    exports$1.IframeStatusBar = IframeStatusBar;
    exports$1.hide = function (hideTopRoot) {
        if (hideTopRoot)
            return sendRequestToFrame$1({ cmd: HIDE_REQUEST_CMD }, HIDE_RESPONSE_CMD, window.top);
        uiRoot.hide();
        return Promise$2.resolve();
    };
    exports$1.show = function (showTopRoot) {
        if (showTopRoot)
            return sendRequestToFrame$1({ cmd: SHOW_REQUEST_CMD }, SHOW_RESPONSE_CMD, window.top);
        uiRoot.show();
        return Promise$2.resolve();
    };
    exports$1.showScreenshotMark = function (url) { return screenshotMark.show(url); };
    exports$1.hideScreenshotMark = function () { return screenshotMark.hide(); };
    var nativeMethods$5 = hammerhead__default.nativeMethods;
    var evalIframeScript = hammerhead__default.EVENTS.evalIframeScript;
    nativeMethods$5.objectDefineProperty(window, '%testCafeUI%', { configurable: true, value: exports$1 });
    // eslint-disable-next-line no-undef
    hammerhead__default.on(evalIframeScript, function (e) { return initTestCafeUI(nativeMethods$5.contentWindowGetter.call(e.iframe), true); });

}(window['%hammerhead%'], window['%testCafeCore%'], window['%hammerhead%'].Promise));

    }

    initTestCafeUI(window);
})();
