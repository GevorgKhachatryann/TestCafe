"use strict";
// -------------------------------------------------------------
// WARNING: this file is used by both the client and the server.
// Do not use any browser or node-specific API!
// -------------------------------------------------------------
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipJsErrorsCallbackWithOptions = exports.SkipJsErrorsOptions = exports.GetProxyUrlOptions = exports.RequestOptions = exports.RequestProxyOptions = exports.RequestAuthOptions = exports.CookieOptions = exports.PressOptions = exports.AssertionOptions = exports.ResizeToFitDeviceOptions = exports.DragToElementOptions = exports.TypeOptions = exports.MoveOptions = exports.ClickOptions = exports.MouseOptions = exports.ModifiersOptions = exports.ElementScreenshotOptions = exports.CropOptions = exports.ScrollOptions = exports.OffsetOptions = exports.ActionOptions = exports.functionOption = exports.objectOption = exports.urlSearchParamsOption = exports.urlOption = exports.numberOption = exports.dateOption = exports.stringOrRegexOption = exports.stringOption = exports.speedOption = exports.booleanOption = exports.positiveIntegerOption = exports.integerOption = void 0;
const assignable_1 = __importDefault(require("../../utils/assignable"));
const factories_1 = require("./validations/factories");
const errors_1 = require("../../shared/errors");
exports.integerOption = (0, factories_1.createIntegerValidator)(errors_1.ActionIntegerOptionError);
exports.positiveIntegerOption = (0, factories_1.createPositiveIntegerValidator)(errors_1.ActionPositiveIntegerOptionError);
exports.booleanOption = (0, factories_1.createBooleanValidator)(errors_1.ActionBooleanOptionError);
exports.speedOption = (0, factories_1.createSpeedValidator)(errors_1.ActionSpeedOptionError);
exports.stringOption = (0, factories_1.createStringValidator)(errors_1.ActionStringOptionError);
exports.stringOrRegexOption = (0, factories_1.createStringOrRegexValidator)(errors_1.ActionStringOrRegexOptionError);
exports.dateOption = (0, factories_1.createDateValidator)(errors_1.ActionDateOptionError);
exports.numberOption = (0, factories_1.createNumberValidator)(errors_1.ActionNumberOptionError);
exports.urlOption = (0, factories_1.createUrlValidator)(errors_1.ActionUrlOptionError);
exports.urlSearchParamsOption = (0, factories_1.createUrlSearchParamsValidator)(errors_1.ActionUrlSearchParamsOptionError);
exports.objectOption = (0, factories_1.createObjectValidator)(errors_1.ActionObjectOptionError);
exports.functionOption = (0, factories_1.createFunctionValidator)(errors_1.ActionFunctionOptionError);
// Actions
class ActionOptions extends assignable_1.default {
    constructor(obj, validate) {
        super();
        this.speed = null;
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'speed', type: exports.speedOption },
        ];
    }
}
exports.ActionOptions = ActionOptions;
// Offset
class OffsetOptions extends ActionOptions {
    constructor(obj, validate) {
        super();
        this.offsetX = null;
        this.offsetY = null;
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'offsetX', type: exports.integerOption },
            { name: 'offsetY', type: exports.integerOption },
        ];
    }
}
exports.OffsetOptions = OffsetOptions;
class ScrollOptions extends OffsetOptions {
    constructor(obj, validate) {
        super();
        this.scrollToCenter = false;
        this.skipParentFrames = false;
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'scrollToCenter', type: exports.booleanOption },
            { name: 'skipParentFrames', type: exports.booleanOption },
        ];
    }
}
exports.ScrollOptions = ScrollOptions;
class CropOptions extends assignable_1.default {
    constructor(obj, validate) {
        super();
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'left', type: exports.integerOption, defaultValue: null },
            { name: 'right', type: exports.integerOption, defaultValue: null },
            { name: 'top', type: exports.integerOption, defaultValue: null },
            { name: 'bottom', type: exports.integerOption, defaultValue: null },
        ];
    }
}
exports.CropOptions = CropOptions;
// Element Screenshot
class ElementScreenshotOptions extends ActionOptions {
    constructor(obj, validate) {
        super();
        this.scrollTargetX = null;
        this.scrollTargetY = null;
        this.includeMargins = false;
        this.includeBorders = true;
        this.includePaddings = true;
        this.crop = {
            left: null,
            right: null,
            top: null,
            bottom: null,
        };
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'scrollTargetX', type: exports.integerOption },
            { name: 'scrollTargetY', type: exports.integerOption },
            { name: 'crop', type: exports.objectOption, init: initCropOptions },
            { name: 'includeMargins', type: exports.booleanOption },
            { name: 'includeBorders', type: exports.booleanOption },
            { name: 'includePaddings', type: exports.booleanOption },
        ];
    }
}
exports.ElementScreenshotOptions = ElementScreenshotOptions;
class ModifiersOptions extends assignable_1.default {
    constructor(obj, validate) {
        super();
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'ctrl', type: exports.booleanOption, defaultValue: false },
            { name: 'alt', type: exports.booleanOption, defaultValue: false },
            { name: 'shift', type: exports.booleanOption, defaultValue: false },
            { name: 'meta', type: exports.booleanOption, defaultValue: false },
        ];
    }
}
exports.ModifiersOptions = ModifiersOptions;
// Mouse
class MouseOptions extends OffsetOptions {
    constructor(obj, validate) {
        super();
        this.modifiers = {
            ctrl: false,
            alt: false,
            shift: false,
            meta: false,
        };
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'modifiers', type: exports.objectOption, init: initModifiersOptions },
        ];
    }
}
exports.MouseOptions = MouseOptions;
// Click
class ClickOptions extends MouseOptions {
    constructor(obj, validate) {
        super();
        this.caretPos = null;
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'caretPos', type: exports.positiveIntegerOption },
        ];
    }
}
exports.ClickOptions = ClickOptions;
// Move
class MoveOptions extends MouseOptions {
    constructor(obj, validate) {
        super();
        this.speed = null;
        this.minMovingTime = null;
        this.holdLeftButton = false;
        this.skipScrolling = false;
        this.skipDefaultDragBehavior = false;
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'speed' },
            { name: 'minMovingTime' },
            { name: 'holdLeftButton' },
            { name: 'skipScrolling', type: exports.booleanOption },
            { name: 'skipDefaultDragBehavior', type: exports.booleanOption },
        ];
    }
}
exports.MoveOptions = MoveOptions;
// Type
class TypeOptions extends ClickOptions {
    constructor(obj, validate) {
        super();
        this.replace = false;
        this.paste = false;
        this.confidential = void 0;
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'replace', type: exports.booleanOption },
            { name: 'paste', type: exports.booleanOption },
            { name: 'confidential', type: exports.booleanOption },
        ];
    }
}
exports.TypeOptions = TypeOptions;
// DragToElement
class DragToElementOptions extends MouseOptions {
    constructor(obj, validate) {
        super(obj, validate);
        this.destinationOffsetX = null;
        this.destinationOffsetY = null;
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'destinationOffsetX', type: exports.integerOption },
            { name: 'destinationOffsetY', type: exports.integerOption },
        ];
    }
}
exports.DragToElementOptions = DragToElementOptions;
//ResizeToFitDevice
class ResizeToFitDeviceOptions extends assignable_1.default {
    constructor(obj, validate) {
        super();
        this.portraitOrientation = false;
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'portraitOrientation', type: exports.booleanOption },
        ];
    }
}
exports.ResizeToFitDeviceOptions = ResizeToFitDeviceOptions;
//Assertion
class AssertionOptions extends assignable_1.default {
    constructor(obj, validate) {
        super();
        this.timeout = void 0;
        this.allowUnawaitedPromise = false;
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'timeout', type: exports.positiveIntegerOption },
            { name: 'allowUnawaitedPromise', type: exports.booleanOption },
        ];
    }
}
exports.AssertionOptions = AssertionOptions;
// Press
class PressOptions extends ActionOptions {
    constructor(obj, validate) {
        super();
        this.confidential = void 0;
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'confidential', type: exports.booleanOption },
        ];
    }
}
exports.PressOptions = PressOptions;
// Cookie
class CookieOptions extends assignable_1.default {
    constructor(obj, validate) {
        super();
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'name', type: exports.stringOption },
            { name: 'value', type: exports.stringOption },
            { name: 'domain', type: exports.stringOption },
            { name: 'path', type: exports.stringOption },
            { name: 'expires', type: exports.dateOption },
            { name: 'maxAge', type: exports.numberOption },
            { name: 'secure', type: exports.booleanOption },
            { name: 'httpOnly', type: exports.booleanOption },
            { name: 'sameSite', type: exports.stringOption },
        ];
    }
}
exports.CookieOptions = CookieOptions;
class RequestAuthOptions extends assignable_1.default {
    constructor(obj, validate) {
        super();
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'username', type: exports.stringOption, required: true },
            { name: 'password', type: exports.stringOption },
        ];
    }
}
exports.RequestAuthOptions = RequestAuthOptions;
class RequestProxyOptions extends assignable_1.default {
    constructor(obj, validate) {
        super();
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'protocol', type: exports.stringOption },
            { name: 'host', type: exports.stringOption, required: true },
            { name: 'port', type: exports.numberOption, required: true },
            { name: 'auth', type: exports.objectOption, init: initRequestAuthOption },
        ];
    }
}
exports.RequestProxyOptions = RequestProxyOptions;
class RequestOptions extends assignable_1.default {
    constructor(obj, validate) {
        super();
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'url', type: exports.urlOption },
            { name: 'method', type: exports.stringOption },
            { name: 'headers', type: exports.objectOption },
            { name: 'params', type: exports.urlSearchParamsOption },
            { name: 'body' },
            { name: 'timeout', type: exports.numberOption },
            { name: 'withCredentials', type: exports.booleanOption },
            { name: 'auth', type: exports.objectOption, init: initRequestAuthOption },
            { name: 'proxy', type: exports.objectOption, init: initRequestProxyOptions },
            { name: 'rawResponse', type: exports.booleanOption },
        ];
    }
}
exports.RequestOptions = RequestOptions;
class GetProxyUrlOptions extends assignable_1.default {
    constructor(obj, validate) {
        super();
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'credentials', type: exports.numberOption },
        ];
    }
}
exports.GetProxyUrlOptions = GetProxyUrlOptions;
class SkipJsErrorsOptions extends assignable_1.default {
    constructor(obj, validate) {
        super();
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'stack', type: exports.stringOrRegexOption, required: false },
            { name: 'message', type: exports.stringOrRegexOption, required: false },
            { name: 'pageUrl', type: exports.stringOrRegexOption, required: false },
        ];
    }
}
exports.SkipJsErrorsOptions = SkipJsErrorsOptions;
class SkipJsErrorsCallbackWithOptions extends assignable_1.default {
    constructor(obj, validate) {
        super();
        this._assignFrom(obj, validate);
    }
    getAssignableProperties() {
        return [
            { name: 'fn', type: exports.functionOption, required: true },
            { name: 'dependencies', type: exports.objectOption, required: false },
        ];
    }
}
exports.SkipJsErrorsCallbackWithOptions = SkipJsErrorsCallbackWithOptions;
// Initializers
function initRequestAuthOption(name, val, initOptions, validate = true) {
    return new RequestAuthOptions(val, validate);
}
function initRequestProxyOptions(name, val, initOptions, validate = true) {
    return new RequestProxyOptions(val, validate);
}
function initCropOptions(name, val, initOptions, validate = true) {
    return new CropOptions(val, validate);
}
function initModifiersOptions(name, val, initOptions, validate = true) {
    return new ModifiersOptions(val, validate);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0LXJ1bi9jb21tYW5kcy9vcHRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnRUFBZ0U7QUFDaEUsZ0VBQWdFO0FBQ2hFLCtDQUErQztBQUMvQyxnRUFBZ0U7Ozs7OztBQUVoRSx3RUFBZ0Q7QUFDaEQsdURBYWlDO0FBQ2pDLGdEQWE2QjtBQUVoQixRQUFBLGFBQWEsR0FBVyxJQUFBLGtDQUFzQixFQUFDLGlDQUF3QixDQUFDLENBQUM7QUFDekUsUUFBQSxxQkFBcUIsR0FBRyxJQUFBLDBDQUE4QixFQUFDLHlDQUFnQyxDQUFDLENBQUM7QUFDekYsUUFBQSxhQUFhLEdBQVcsSUFBQSxrQ0FBc0IsRUFBQyxpQ0FBd0IsQ0FBQyxDQUFDO0FBQ3pFLFFBQUEsV0FBVyxHQUFhLElBQUEsZ0NBQW9CLEVBQUMsK0JBQXNCLENBQUMsQ0FBQztBQUNyRSxRQUFBLFlBQVksR0FBWSxJQUFBLGlDQUFxQixFQUFDLGdDQUF1QixDQUFDLENBQUM7QUFDdkUsUUFBQSxtQkFBbUIsR0FBSyxJQUFBLHdDQUE0QixFQUFDLHVDQUE4QixDQUFDLENBQUM7QUFDckYsUUFBQSxVQUFVLEdBQWMsSUFBQSwrQkFBbUIsRUFBQyw4QkFBcUIsQ0FBQyxDQUFDO0FBQ25FLFFBQUEsWUFBWSxHQUFZLElBQUEsaUNBQXFCLEVBQUMsZ0NBQXVCLENBQUMsQ0FBQztBQUN2RSxRQUFBLFNBQVMsR0FBZSxJQUFBLDhCQUFrQixFQUFDLDZCQUFvQixDQUFDLENBQUM7QUFDakUsUUFBQSxxQkFBcUIsR0FBRyxJQUFBLDBDQUE4QixFQUFDLHlDQUFnQyxDQUFDLENBQUM7QUFDekYsUUFBQSxZQUFZLEdBQVksSUFBQSxpQ0FBcUIsRUFBQyxnQ0FBdUIsQ0FBQyxDQUFDO0FBQ3ZFLFFBQUEsY0FBYyxHQUFVLElBQUEsbUNBQXVCLEVBQUMsa0NBQXlCLENBQUMsQ0FBQztBQUV4RixVQUFV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QUNuQixPQUFPO1lBQ0gsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxzQkFBYyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7WUFDcEQsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxvQkFBWSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7U0FDaEUsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWJELDBFQWFDO0FBRUQsZUFBZTtBQUNmLFNBQVMscUJBQXFCLENBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsUUFBUSxHQUFHLElBQUk7SUFDbkUsT0FBTyxJQUFJLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsU0FBUyx1QkFBdUIsQ0FBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxRQUFRLEdBQUcsSUFBSTtJQUNyRSxPQUFPLElBQUksbUJBQW1CLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxRQUFRLEdBQUcsSUFBSTtJQUM3RCxPQUFPLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBRUQsU0FBUyxvQkFBb0IsQ0FBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxRQUFRLEdBQUcsSUFBSTtJQUNsRSxPQUFPLElBQUksZ0JBQWdCLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQy9DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBXQVJOSU5HOiB0aGlzIGZpbGUgaXMgdXNlZCBieSBib3RoIHRoZSBjbGllbnQgYW5kIHRoZSBzZXJ2ZXIuXG4vLyBEbyBub3QgdXNlIGFueSBicm93c2VyIG9yIG5vZGUtc3BlY2lmaWMgQVBJIVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5pbXBvcnQgQXNzaWduYWJsZSBmcm9tICcuLi8uLi91dGlscy9hc3NpZ25hYmxlJztcbmltcG9ydCB7XG4gICAgY3JlYXRlQm9vbGVhblZhbGlkYXRvcixcbiAgICBjcmVhdGVJbnRlZ2VyVmFsaWRhdG9yLFxuICAgIGNyZWF0ZVBvc2l0aXZlSW50ZWdlclZhbGlkYXRvcixcbiAgICBjcmVhdGVTcGVlZFZhbGlkYXRvcixcbiAgICBjcmVhdGVTdHJpbmdWYWxpZGF0b3IsXG4gICAgY3JlYXRlRGF0ZVZhbGlkYXRvcixcbiAgICBjcmVhdGVOdW1iZXJWYWxpZGF0b3IsXG4gICAgY3JlYXRlVXJsVmFsaWRhdG9yLFxuICAgIGNyZWF0ZVVybFNlYXJjaFBhcmFtc1ZhbGlkYXRvcixcbiAgICBjcmVhdGVPYmplY3RWYWxpZGF0b3IsXG4gICAgY3JlYXRlU3RyaW5nT3JSZWdleFZhbGlkYXRvcixcbiAgICBjcmVhdGVGdW5jdGlvblZhbGlkYXRvcixcbn0gZnJvbSAnLi92YWxpZGF0aW9ucy9mYWN0b3JpZXMnO1xuaW1wb3J0IHtcbiAgICBBY3Rpb25JbnRlZ2VyT3B0aW9uRXJyb3IsXG4gICAgQWN0aW9uUG9zaXRpdmVJbnRlZ2VyT3B0aW9uRXJyb3IsXG4gICAgQWN0aW9uQm9vbGVhbk9wdGlvbkVycm9yLFxuICAgIEFjdGlvblNwZWVkT3B0aW9uRXJyb3IsXG4gICAgQWN0aW9uU3RyaW5nT3B0aW9uRXJyb3IsXG4gICAgQWN0aW9uRGF0ZU9wdGlvbkVycm9yLFxuICAgIEFjdGlvbk51bWJlck9wdGlvbkVycm9yLFxuICAgIEFjdGlvblVybE9wdGlvbkVycm9yLFxuICAgIEFjdGlvblVybFNlYXJjaFBhcmFtc09wdGlvbkVycm9yLFxuICAgIEFjdGlvbk9iamVjdE9wdGlvbkVycm9yLFxuICAgIEFjdGlvblN0cmluZ09yUmVnZXhPcHRpb25FcnJvcixcbiAgICBBY3Rpb25GdW5jdGlvbk9wdGlvbkVycm9yLFxufSBmcm9tICcuLi8uLi9zaGFyZWQvZXJyb3JzJztcblxuZXhwb3J0IGNvbnN0IGludGVnZXJPcHRpb24gICAgICAgICA9IGNyZWF0ZUludGVnZXJWYWxpZGF0b3IoQWN0aW9uSW50ZWdlck9wdGlvbkVycm9yKTtcbmV4cG9ydCBjb25zdCBwb3NpdGl2ZUludGVnZXJPcHRpb24gPSBjcmVhdGVQb3NpdGl2ZUludGVnZXJWYWxpZGF0b3IoQWN0aW9uUG9zaXRpdmVJbnRlZ2VyT3B0aW9uRXJyb3IpO1xuZXhwb3J0IGNvbnN0IGJvb2xlYW5PcHRpb24gICAgICAgICA9IGNyZWF0ZUJvb2xlYW5WYWxpZGF0b3IoQWN0aW9uQm9vbGVhbk9wdGlvbkVycm9yKTtcbmV4cG9ydCBjb25zdCBzcGVlZE9wdGlvbiAgICAgICAgICAgPSBjcmVhdGVTcGVlZFZhbGlkYXRvcihBY3Rpb25TcGVlZE9wdGlvbkVycm9yKTtcbmV4cG9ydCBjb25zdCBzdHJpbmdPcHRpb24gICAgICAgICAgPSBjcmVhdGVTdHJpbmdWYWxpZGF0b3IoQWN0aW9uU3RyaW5nT3B0aW9uRXJyb3IpO1xuZXhwb3J0IGNvbnN0IHN0cmluZ09yUmVnZXhPcHRpb24gICA9IGNyZWF0ZVN0cmluZ09yUmVnZXhWYWxpZGF0b3IoQWN0aW9uU3RyaW5nT3JSZWdleE9wdGlvbkVycm9yKTtcbmV4cG9ydCBjb25zdCBkYXRlT3B0aW9uICAgICAgICAgICAgPSBjcmVhdGVEYXRlVmFsaWRhdG9yKEFjdGlvbkRhdGVPcHRpb25FcnJvcik7XG5leHBvcnQgY29uc3QgbnVtYmVyT3B0aW9uICAgICAgICAgID0gY3JlYXRlTnVtYmVyVmFsaWRhdG9yKEFjdGlvbk51bWJlck9wdGlvbkVycm9yKTtcbmV4cG9ydCBjb25zdCB1cmxPcHRpb24gICAgICAgICAgICAgPSBjcmVhdGVVcmxWYWxpZGF0b3IoQWN0aW9uVXJsT3B0aW9uRXJyb3IpO1xuZXhwb3J0IGNvbnN0IHVybFNlYXJjaFBhcmFtc09wdGlvbiA9IGNyZWF0ZVVybFNlYXJjaFBhcmFtc1ZhbGlkYXRvcihBY3Rpb25VcmxTZWFyY2hQYXJhbXNPcHRpb25FcnJvcik7XG5leHBvcnQgY29uc3Qgb2JqZWN0T3B0aW9uICAgICAgICAgID0gY3JlYXRlT2JqZWN0VmFsaWRhdG9yKEFjdGlvbk9iamVjdE9wdGlvbkVycm9yKTtcbmV4cG9ydCBjb25zdCBmdW5jdGlvbk9wdGlvbiAgICAgICAgPSBjcmVhdGVGdW5jdGlvblZhbGlkYXRvcihBY3Rpb25GdW5jdGlvbk9wdGlvbkVycm9yKTtcblxuLy8gQWN0aW9uc1xuZXhwb3J0IGNsYXNzIEFjdGlvbk9wdGlvbnMgZXh0ZW5kcyBBc3NpZ25hYmxlIHtcbiAgICBjb25zdHJ1Y3RvciAob2JqLCB2YWxpZGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc3BlZWQgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2Fzc2lnbkZyb20ob2JqLCB2YWxpZGF0ZSk7XG4gICAgfVxuXG4gICAgZ2V0QXNzaWduYWJsZVByb3BlcnRpZXMgKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgeyBuYW1lOiAnc3BlZWQnLCB0eXBlOiBzcGVlZE9wdGlvbiB9LFxuICAgICAgICBdO1xuICAgIH1cbn1cblxuLy8gT2Zmc2V0XG5leHBvcnQgY2xhc3MgT2Zmc2V0T3B0aW9ucyBleHRlbmRzIEFjdGlvbk9wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yIChvYmosIHZhbGlkYXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5vZmZzZXRYID0gbnVsbDtcbiAgICAgICAgdGhpcy5vZmZzZXRZID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9hc3NpZ25Gcm9tKG9iaiwgdmFsaWRhdGUpO1xuICAgIH1cblxuICAgIGdldEFzc2lnbmFibGVQcm9wZXJ0aWVzICgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHsgbmFtZTogJ29mZnNldFgnLCB0eXBlOiBpbnRlZ2VyT3B0aW9uIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdvZmZzZXRZJywgdHlwZTogaW50ZWdlck9wdGlvbiB9LFxuICAgICAgICBdO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNjcm9sbE9wdGlvbnMgZXh0ZW5kcyBPZmZzZXRPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvciAob2JqLCB2YWxpZGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc2Nyb2xsVG9DZW50ZXIgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNraXBQYXJlbnRGcmFtZXMgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9hc3NpZ25Gcm9tKG9iaiwgdmFsaWRhdGUpO1xuICAgIH1cblxuICAgIGdldEFzc2lnbmFibGVQcm9wZXJ0aWVzICgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHsgbmFtZTogJ3Njcm9sbFRvQ2VudGVyJywgdHlwZTogYm9vbGVhbk9wdGlvbiB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnc2tpcFBhcmVudEZyYW1lcycsIHR5cGU6IGJvb2xlYW5PcHRpb24gfSxcbiAgICAgICAgXTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDcm9wT3B0aW9ucyBleHRlbmRzIEFzc2lnbmFibGUge1xuICAgIGNvbnN0cnVjdG9yIChvYmosIHZhbGlkYXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fYXNzaWduRnJvbShvYmosIHZhbGlkYXRlKTtcbiAgICB9XG5cbiAgICBnZXRBc3NpZ25hYmxlUHJvcGVydGllcyAoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB7IG5hbWU6ICdsZWZ0JywgdHlwZTogaW50ZWdlck9wdGlvbiwgZGVmYXVsdFZhbHVlOiBudWxsIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdyaWdodCcsIHR5cGU6IGludGVnZXJPcHRpb24sIGRlZmF1bHRWYWx1ZTogbnVsbCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAndG9wJywgdHlwZTogaW50ZWdlck9wdGlvbiwgZGVmYXVsdFZhbHVlOiBudWxsIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdib3R0b20nLCB0eXBlOiBpbnRlZ2VyT3B0aW9uLCBkZWZhdWx0VmFsdWU6IG51bGwgfSxcbiAgICAgICAgXTtcbiAgICB9XG59XG5cbi8vIEVsZW1lbnQgU2NyZWVuc2hvdFxuZXhwb3J0IGNsYXNzIEVsZW1lbnRTY3JlZW5zaG90T3B0aW9ucyBleHRlbmRzIEFjdGlvbk9wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yIChvYmosIHZhbGlkYXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zY3JvbGxUYXJnZXRYICAgPSBudWxsO1xuICAgICAgICB0aGlzLnNjcm9sbFRhcmdldFkgICA9IG51bGw7XG4gICAgICAgIHRoaXMuaW5jbHVkZU1hcmdpbnMgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW5jbHVkZUJvcmRlcnMgID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbmNsdWRlUGFkZGluZ3MgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY3JvcCA9IHtcbiAgICAgICAgICAgIGxlZnQ6ICAgbnVsbCxcbiAgICAgICAgICAgIHJpZ2h0OiAgbnVsbCxcbiAgICAgICAgICAgIHRvcDogICAgbnVsbCxcbiAgICAgICAgICAgIGJvdHRvbTogbnVsbCxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9hc3NpZ25Gcm9tKG9iaiwgdmFsaWRhdGUpO1xuICAgIH1cblxuICAgIGdldEFzc2lnbmFibGVQcm9wZXJ0aWVzICgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHsgbmFtZTogJ3Njcm9sbFRhcmdldFgnLCB0eXBlOiBpbnRlZ2VyT3B0aW9uIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdzY3JvbGxUYXJnZXRZJywgdHlwZTogaW50ZWdlck9wdGlvbiB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnY3JvcCcsIHR5cGU6IG9iamVjdE9wdGlvbiwgaW5pdDogaW5pdENyb3BPcHRpb25zIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdpbmNsdWRlTWFyZ2lucycsIHR5cGU6IGJvb2xlYW5PcHRpb24gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2luY2x1ZGVCb3JkZXJzJywgdHlwZTogYm9vbGVhbk9wdGlvbiB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnaW5jbHVkZVBhZGRpbmdzJywgdHlwZTogYm9vbGVhbk9wdGlvbiB9LFxuICAgICAgICBdO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1vZGlmaWVyc09wdGlvbnMgZXh0ZW5kcyBBc3NpZ25hYmxlIHtcbiAgICBjb25zdHJ1Y3RvciAob2JqLCB2YWxpZGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2Fzc2lnbkZyb20ob2JqLCB2YWxpZGF0ZSk7XG4gICAgfVxuXG4gICAgZ2V0QXNzaWduYWJsZVByb3BlcnRpZXMgKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgeyBuYW1lOiAnY3RybCcsIHR5cGU6IGJvb2xlYW5PcHRpb24sIGRlZmF1bHRWYWx1ZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2FsdCcsIHR5cGU6IGJvb2xlYW5PcHRpb24sIGRlZmF1bHRWYWx1ZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3NoaWZ0JywgdHlwZTogYm9vbGVhbk9wdGlvbiwgZGVmYXVsdFZhbHVlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbWV0YScsIHR5cGU6IGJvb2xlYW5PcHRpb24sIGRlZmF1bHRWYWx1ZTogZmFsc2UgfSxcbiAgICAgICAgXTtcbiAgICB9XG59XG5cbi8vIE1vdXNlXG5leHBvcnQgY2xhc3MgTW91c2VPcHRpb25zIGV4dGVuZHMgT2Zmc2V0T3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3IgKG9iaiwgdmFsaWRhdGUpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLm1vZGlmaWVycyA9IHtcbiAgICAgICAgICAgIGN0cmw6ICBmYWxzZSxcbiAgICAgICAgICAgIGFsdDogICBmYWxzZSxcbiAgICAgICAgICAgIHNoaWZ0OiBmYWxzZSxcbiAgICAgICAgICAgIG1ldGE6ICBmYWxzZSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9hc3NpZ25Gcm9tKG9iaiwgdmFsaWRhdGUpO1xuICAgIH1cblxuICAgIGdldEFzc2lnbmFibGVQcm9wZXJ0aWVzICgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHsgbmFtZTogJ21vZGlmaWVycycsIHR5cGU6IG9iamVjdE9wdGlvbiwgaW5pdDogaW5pdE1vZGlmaWVyc09wdGlvbnMgfSxcbiAgICAgICAgXTtcbiAgICB9XG59XG5cblxuLy8gQ2xpY2tcbmV4cG9ydCBjbGFzcyBDbGlja09wdGlvbnMgZXh0ZW5kcyBNb3VzZU9wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yIChvYmosIHZhbGlkYXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5jYXJldFBvcyA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fYXNzaWduRnJvbShvYmosIHZhbGlkYXRlKTtcbiAgICB9XG5cbiAgICBnZXRBc3NpZ25hYmxlUHJvcGVydGllcyAoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB7IG5hbWU6ICdjYXJldFBvcycsIHR5cGU6IHBvc2l0aXZlSW50ZWdlck9wdGlvbiB9LFxuICAgICAgICBdO1xuICAgIH1cbn1cblxuLy8gTW92ZVxuZXhwb3J0IGNsYXNzIE1vdmVPcHRpb25zIGV4dGVuZHMgTW91c2VPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvciAob2JqLCB2YWxpZGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc3BlZWQgICAgICAgICAgICAgICAgICAgPSBudWxsO1xuICAgICAgICB0aGlzLm1pbk1vdmluZ1RpbWUgICAgICAgICAgID0gbnVsbDtcbiAgICAgICAgdGhpcy5ob2xkTGVmdEJ1dHRvbiAgICAgICAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNraXBTY3JvbGxpbmcgICAgICAgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2tpcERlZmF1bHREcmFnQmVoYXZpb3IgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9hc3NpZ25Gcm9tKG9iaiwgdmFsaWRhdGUpO1xuICAgIH1cblxuICAgIGdldEFzc2lnbmFibGVQcm9wZXJ0aWVzICgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHsgbmFtZTogJ3NwZWVkJyB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbWluTW92aW5nVGltZScgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2hvbGRMZWZ0QnV0dG9uJyB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnc2tpcFNjcm9sbGluZycsIHR5cGU6IGJvb2xlYW5PcHRpb24gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3NraXBEZWZhdWx0RHJhZ0JlaGF2aW9yJywgdHlwZTogYm9vbGVhbk9wdGlvbiB9LFxuICAgICAgICBdO1xuICAgIH1cbn1cblxuLy8gVHlwZVxuZXhwb3J0IGNsYXNzIFR5cGVPcHRpb25zIGV4dGVuZHMgQ2xpY2tPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvciAob2JqLCB2YWxpZGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMucmVwbGFjZSAgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGFzdGUgICAgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29uZmlkZW50aWFsID0gdm9pZCAwO1xuXG4gICAgICAgIHRoaXMuX2Fzc2lnbkZyb20ob2JqLCB2YWxpZGF0ZSk7XG4gICAgfVxuXG4gICAgZ2V0QXNzaWduYWJsZVByb3BlcnRpZXMgKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgeyBuYW1lOiAncmVwbGFjZScsIHR5cGU6IGJvb2xlYW5PcHRpb24gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3Bhc3RlJywgdHlwZTogYm9vbGVhbk9wdGlvbiB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnY29uZmlkZW50aWFsJywgdHlwZTogYm9vbGVhbk9wdGlvbiB9LFxuICAgICAgICBdO1xuICAgIH1cbn1cblxuLy8gRHJhZ1RvRWxlbWVudFxuZXhwb3J0IGNsYXNzIERyYWdUb0VsZW1lbnRPcHRpb25zIGV4dGVuZHMgTW91c2VPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvciAob2JqLCB2YWxpZGF0ZSkge1xuICAgICAgICBzdXBlcihvYmosIHZhbGlkYXRlKTtcblxuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uT2Zmc2V0WCA9IG51bGw7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb25PZmZzZXRZID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9hc3NpZ25Gcm9tKG9iaiwgdmFsaWRhdGUpO1xuICAgIH1cblxuICAgIGdldEFzc2lnbmFibGVQcm9wZXJ0aWVzICgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHsgbmFtZTogJ2Rlc3RpbmF0aW9uT2Zmc2V0WCcsIHR5cGU6IGludGVnZXJPcHRpb24gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2Rlc3RpbmF0aW9uT2Zmc2V0WScsIHR5cGU6IGludGVnZXJPcHRpb24gfSxcbiAgICAgICAgXTtcbiAgICB9XG59XG5cbi8vUmVzaXplVG9GaXREZXZpY2VcbmV4cG9ydCBjbGFzcyBSZXNpemVUb0ZpdERldmljZU9wdGlvbnMgZXh0ZW5kcyBBc3NpZ25hYmxlIHtcbiAgICBjb25zdHJ1Y3RvciAob2JqLCB2YWxpZGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMucG9ydHJhaXRPcmllbnRhdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2Fzc2lnbkZyb20ob2JqLCB2YWxpZGF0ZSk7XG4gICAgfVxuXG4gICAgZ2V0QXNzaWduYWJsZVByb3BlcnRpZXMgKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgeyBuYW1lOiAncG9ydHJhaXRPcmllbnRhdGlvbicsIHR5cGU6IGJvb2xlYW5PcHRpb24gfSxcbiAgICAgICAgXTtcbiAgICB9XG59XG5cbi8vQXNzZXJ0aW9uXG5leHBvcnQgY2xhc3MgQXNzZXJ0aW9uT3B0aW9ucyBleHRlbmRzIEFzc2lnbmFibGUge1xuICAgIGNvbnN0cnVjdG9yIChvYmosIHZhbGlkYXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy50aW1lb3V0ICAgICAgICAgICAgICAgPSB2b2lkIDA7XG4gICAgICAgIHRoaXMuYWxsb3dVbmF3YWl0ZWRQcm9taXNlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fYXNzaWduRnJvbShvYmosIHZhbGlkYXRlKTtcbiAgICB9XG5cbiAgICBnZXRBc3NpZ25hYmxlUHJvcGVydGllcyAoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB7IG5hbWU6ICd0aW1lb3V0JywgdHlwZTogcG9zaXRpdmVJbnRlZ2VyT3B0aW9uIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdhbGxvd1VuYXdhaXRlZFByb21pc2UnLCB0eXBlOiBib29sZWFuT3B0aW9uIH0sXG4gICAgICAgIF07XG4gICAgfVxufVxuXG4vLyBQcmVzc1xuZXhwb3J0IGNsYXNzIFByZXNzT3B0aW9ucyBleHRlbmRzIEFjdGlvbk9wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yIChvYmosIHZhbGlkYXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5jb25maWRlbnRpYWwgPSB2b2lkIDA7XG5cbiAgICAgICAgdGhpcy5fYXNzaWduRnJvbShvYmosIHZhbGlkYXRlKTtcbiAgICB9XG5cbiAgICBnZXRBc3NpZ25hYmxlUHJvcGVydGllcyAoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB7IG5hbWU6ICdjb25maWRlbnRpYWwnLCB0eXBlOiBib29sZWFuT3B0aW9uIH0sXG4gICAgICAgIF07XG4gICAgfVxufVxuXG4vLyBDb29raWVcbmV4cG9ydCBjbGFzcyBDb29raWVPcHRpb25zIGV4dGVuZHMgQXNzaWduYWJsZSB7XG4gICAgY29uc3RydWN0b3IgKG9iaiwgdmFsaWRhdGUpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9hc3NpZ25Gcm9tKG9iaiwgdmFsaWRhdGUpO1xuICAgIH1cblxuICAgIGdldEFzc2lnbmFibGVQcm9wZXJ0aWVzICgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHsgbmFtZTogJ25hbWUnLCB0eXBlOiBzdHJpbmdPcHRpb24gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3ZhbHVlJywgdHlwZTogc3RyaW5nT3B0aW9uIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkb21haW4nLCB0eXBlOiBzdHJpbmdPcHRpb24gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3BhdGgnLCB0eXBlOiBzdHJpbmdPcHRpb24gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2V4cGlyZXMnLCB0eXBlOiBkYXRlT3B0aW9uIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtYXhBZ2UnLCB0eXBlOiBudW1iZXJPcHRpb24gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3NlY3VyZScsIHR5cGU6IGJvb2xlYW5PcHRpb24gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2h0dHBPbmx5JywgdHlwZTogYm9vbGVhbk9wdGlvbiB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnc2FtZVNpdGUnLCB0eXBlOiBzdHJpbmdPcHRpb24gfSxcbiAgICAgICAgXTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0QXV0aE9wdGlvbnMgZXh0ZW5kcyBBc3NpZ25hYmxlIHtcbiAgICBjb25zdHJ1Y3RvciAob2JqLCB2YWxpZGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2Fzc2lnbkZyb20ob2JqLCB2YWxpZGF0ZSk7XG4gICAgfVxuXG4gICAgZ2V0QXNzaWduYWJsZVByb3BlcnRpZXMgKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgeyBuYW1lOiAndXNlcm5hbWUnLCB0eXBlOiBzdHJpbmdPcHRpb24sIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdwYXNzd29yZCcsIHR5cGU6IHN0cmluZ09wdGlvbiB9LFxuICAgICAgICBdO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlcXVlc3RQcm94eU9wdGlvbnMgZXh0ZW5kcyBBc3NpZ25hYmxlIHtcbiAgICBjb25zdHJ1Y3RvciAob2JqLCB2YWxpZGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2Fzc2lnbkZyb20ob2JqLCB2YWxpZGF0ZSk7XG4gICAgfVxuXG4gICAgZ2V0QXNzaWduYWJsZVByb3BlcnRpZXMgKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgeyBuYW1lOiAncHJvdG9jb2wnLCB0eXBlOiBzdHJpbmdPcHRpb24gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2hvc3QnLCB0eXBlOiBzdHJpbmdPcHRpb24sIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdwb3J0JywgdHlwZTogbnVtYmVyT3B0aW9uLCByZXF1aXJlZDogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnYXV0aCcsIHR5cGU6IG9iamVjdE9wdGlvbiwgaW5pdDogaW5pdFJlcXVlc3RBdXRoT3B0aW9uIH0sXG4gICAgICAgIF07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVxdWVzdE9wdGlvbnMgZXh0ZW5kcyBBc3NpZ25hYmxlIHtcbiAgICBjb25zdHJ1Y3RvciAob2JqLCB2YWxpZGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2Fzc2lnbkZyb20ob2JqLCB2YWxpZGF0ZSk7XG4gICAgfVxuXG4gICAgZ2V0QXNzaWduYWJsZVByb3BlcnRpZXMgKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgeyBuYW1lOiAndXJsJywgdHlwZTogdXJsT3B0aW9uIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtZXRob2QnLCB0eXBlOiBzdHJpbmdPcHRpb24gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2hlYWRlcnMnLCB0eXBlOiBvYmplY3RPcHRpb24gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3BhcmFtcycsIHR5cGU6IHVybFNlYXJjaFBhcmFtc09wdGlvbiB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnYm9keScgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3RpbWVvdXQnLCB0eXBlOiBudW1iZXJPcHRpb24gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3dpdGhDcmVkZW50aWFscycsIHR5cGU6IGJvb2xlYW5PcHRpb24gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2F1dGgnLCB0eXBlOiBvYmplY3RPcHRpb24sIGluaXQ6IGluaXRSZXF1ZXN0QXV0aE9wdGlvbiB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncHJveHknLCB0eXBlOiBvYmplY3RPcHRpb24sIGluaXQ6IGluaXRSZXF1ZXN0UHJveHlPcHRpb25zIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdyYXdSZXNwb25zZScsIHR5cGU6IGJvb2xlYW5PcHRpb24gfSxcbiAgICAgICAgXTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHZXRQcm94eVVybE9wdGlvbnMgZXh0ZW5kcyBBc3NpZ25hYmxlIHtcbiAgICBjb25zdHJ1Y3RvciAob2JqLCB2YWxpZGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2Fzc2lnbkZyb20ob2JqLCB2YWxpZGF0ZSk7XG4gICAgfVxuXG4gICAgZ2V0QXNzaWduYWJsZVByb3BlcnRpZXMgKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgeyBuYW1lOiAnY3JlZGVudGlhbHMnLCB0eXBlOiBudW1iZXJPcHRpb24gfSxcbiAgICAgICAgXTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTa2lwSnNFcnJvcnNPcHRpb25zIGV4dGVuZHMgQXNzaWduYWJsZSB7XG4gICAgY29uc3RydWN0b3IgKG9iaiwgdmFsaWRhdGUpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9hc3NpZ25Gcm9tKG9iaiwgdmFsaWRhdGUpO1xuICAgIH1cblxuICAgIGdldEFzc2lnbmFibGVQcm9wZXJ0aWVzICgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHsgbmFtZTogJ3N0YWNrJywgdHlwZTogc3RyaW5nT3JSZWdleE9wdGlvbiwgcmVxdWlyZWQ6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtZXNzYWdlJywgdHlwZTogc3RyaW5nT3JSZWdleE9wdGlvbiwgcmVxdWlyZWQ6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdwYWdlVXJsJywgdHlwZTogc3RyaW5nT3JSZWdleE9wdGlvbiwgcmVxdWlyZWQ6IGZhbHNlIH0sXG4gICAgICAgIF07XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFNraXBKc0Vycm9yc0NhbGxiYWNrV2l0aE9wdGlvbnMgZXh0ZW5kcyBBc3NpZ25hYmxlIHtcbiAgICBjb25zdHJ1Y3RvciAob2JqLCB2YWxpZGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2Fzc2lnbkZyb20ob2JqLCB2YWxpZGF0ZSk7XG4gICAgfVxuXG4gICAgZ2V0QXNzaWduYWJsZVByb3BlcnRpZXMgKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgeyBuYW1lOiAnZm4nLCB0eXBlOiBmdW5jdGlvbk9wdGlvbiwgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2RlcGVuZGVuY2llcycsIHR5cGU6IG9iamVjdE9wdGlvbiwgcmVxdWlyZWQ6IGZhbHNlIH0sXG4gICAgICAgIF07XG4gICAgfVxufVxuXG4vLyBJbml0aWFsaXplcnNcbmZ1bmN0aW9uIGluaXRSZXF1ZXN0QXV0aE9wdGlvbiAobmFtZSwgdmFsLCBpbml0T3B0aW9ucywgdmFsaWRhdGUgPSB0cnVlKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0QXV0aE9wdGlvbnModmFsLCB2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGluaXRSZXF1ZXN0UHJveHlPcHRpb25zIChuYW1lLCB2YWwsIGluaXRPcHRpb25zLCB2YWxpZGF0ZSA9IHRydWUpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3RQcm94eU9wdGlvbnModmFsLCB2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGluaXRDcm9wT3B0aW9ucyAobmFtZSwgdmFsLCBpbml0T3B0aW9ucywgdmFsaWRhdGUgPSB0cnVlKSB7XG4gICAgcmV0dXJuIG5ldyBDcm9wT3B0aW9ucyh2YWwsIHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gaW5pdE1vZGlmaWVyc09wdGlvbnMgKG5hbWUsIHZhbCwgaW5pdE9wdGlvbnMsIHZhbGlkYXRlID0gdHJ1ZSkge1xuICAgIHJldHVybiBuZXcgTW9kaWZpZXJzT3B0aW9ucyh2YWwsIHZhbGlkYXRlKTtcbn1cbiJdfQ==