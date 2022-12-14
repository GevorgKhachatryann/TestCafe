"use strict";
// -------------------------------------------------------------
// WARNING: this file is used by both the client and the server.
// Do not use any browser or node-specific API!
// -------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
const NATIVE_METHODS_PROPERTY_NAME = '_nativeMethods';
class BrowserConsoleMessages {
    constructor(data, nativeMethods) {
        const resultNativeMethods = this._ensureNativeMethods(nativeMethods);
        resultNativeMethods.objectDefineProperty(this, NATIVE_METHODS_PROPERTY_NAME, { value: resultNativeMethods });
        this.concat(data);
    }
    _ensureNativeMethods(nativeMethods) {
        return nativeMethods || {
            objectKeys: Object.keys,
            arrayForEach: Array.prototype.forEach,
            arrayConcat: Array.prototype.concat,
            arraySlice: Array.prototype.slice,
            objectDefineProperty: Object.defineProperty,
        };
    }
    _getWindowIds(consoleMessages) {
        return this[NATIVE_METHODS_PROPERTY_NAME].objectKeys(consoleMessages);
    }
    _copyArray(array) {
        return this[NATIVE_METHODS_PROPERTY_NAME].arraySlice.call(array);
    }
    _concatArrays(array, anotherArray) {
        return this[NATIVE_METHODS_PROPERTY_NAME].arrayConcat.call(array, anotherArray);
    }
    ensureMessageContainer(windowId) {
        if (this[windowId])
            return;
        this[windowId] = {
            log: [],
            info: [],
            warn: [],
            error: [],
        };
    }
    concat(consoleMessages) {
        if (!consoleMessages)
            return this;
        const windowIds = this._getWindowIds(consoleMessages);
        this[NATIVE_METHODS_PROPERTY_NAME].arrayForEach.call(windowIds, windowId => {
            this.ensureMessageContainer(windowId);
            this[windowId].log = this._concatArrays(this[windowId].log, consoleMessages[windowId].log);
            this[windowId].info = this._concatArrays(this[windowId].info, consoleMessages[windowId].info);
            this[windowId].warn = this._concatArrays(this[windowId].warn, consoleMessages[windowId].warn);
            this[windowId].error = this._concatArrays(this[windowId].error, consoleMessages[windowId].error);
        });
        return this;
    }
    addMessage(type, msg, windowId) {
        this.ensureMessageContainer(windowId);
        this[windowId][type].push(msg);
    }
    getCopy() {
        const copy = {};
        const windowIds = this._getWindowIds(this);
        this[NATIVE_METHODS_PROPERTY_NAME].arrayForEach.call(windowIds, windowId => {
            copy[windowId] = {
                log: this._copyArray(this[windowId].log),
                info: this._copyArray(this[windowId].info),
                warn: this._copyArray(this[windowId].warn),
                error: this._copyArray(this[windowId].error),
            };
        });
        return copy;
    }
}
exports.default = BrowserConsoleMessages;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci1jb25zb2xlLW1lc3NhZ2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rlc3QtcnVuL2Jyb3dzZXItY29uc29sZS1tZXNzYWdlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsZ0VBQWdFO0FBQ2hFLGdFQUFnRTtBQUNoRSwrQ0FBK0M7QUFDL0MsZ0VBQWdFOztBQUVoRSxNQUFNLDRCQUE0QixHQUFHLGdCQUFnQixDQUFDO0FBRXRELE1BQXFCLHNCQUFzQjtJQUN2QyxZQUFhLElBQUksRUFBRSxhQUFhO1FBQzVCLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXJFLG1CQUFtQixDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSw0QkFBNEIsRUFBRSxFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUM7UUFFN0csSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsb0JBQW9CLENBQUUsYUFBYTtRQUMvQixPQUFPLGFBQWEsSUFBSTtZQUNwQixVQUFVLEVBQVksTUFBTSxDQUFDLElBQUk7WUFDakMsWUFBWSxFQUFVLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTztZQUM3QyxXQUFXLEVBQVcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNO1lBQzVDLFVBQVUsRUFBWSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUs7WUFDM0Msb0JBQW9CLEVBQUUsTUFBTSxDQUFDLGNBQWM7U0FDOUMsQ0FBQztJQUNOLENBQUM7SUFFRCxhQUFhLENBQUUsZUFBZTtRQUMxQixPQUFPLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsVUFBVSxDQUFFLEtBQUs7UUFDYixPQUFPLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJ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LENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQzthQUMvQyxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUFuRkQseUNBbUZDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gV0FSTklORzogdGhpcyBmaWxlIGlzIHVzZWQgYnkgYm90aCB0aGUgY2xpZW50IGFuZCB0aGUgc2VydmVyLlxuLy8gRG8gbm90IHVzZSBhbnkgYnJvd3NlciBvciBub2RlLXNwZWNpZmljIEFQSSFcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY29uc3QgTkFUSVZFX01FVEhPRFNfUFJPUEVSVFlfTkFNRSA9ICdfbmF0aXZlTWV0aG9kcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJyb3dzZXJDb25zb2xlTWVzc2FnZXMge1xuICAgIGNvbnN0cnVjdG9yIChkYXRhLCBuYXRpdmVNZXRob2RzKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdE5hdGl2ZU1ldGhvZHMgPSB0aGlzLl9lbnN1cmVOYXRpdmVNZXRob2RzKG5hdGl2ZU1ldGhvZHMpO1xuXG4gICAgICAgIHJlc3VsdE5hdGl2ZU1ldGhvZHMub2JqZWN0RGVmaW5lUHJvcGVydHkodGhpcywgTkFUSVZFX01FVEhPRFNfUFJPUEVSVFlfTkFNRSwgeyB2YWx1ZTogcmVzdWx0TmF0aXZlTWV0aG9kcyB9KTtcblxuICAgICAgICB0aGlzLmNvbmNhdChkYXRhKTtcbiAgICB9XG5cbiAgICBfZW5zdXJlTmF0aXZlTWV0aG9kcyAobmF0aXZlTWV0aG9kcykge1xuICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kcyB8fCB7XG4gICAgICAgICAgICBvYmplY3RLZXlzOiAgICAgICAgICAgT2JqZWN0LmtleXMsXG4gICAgICAgICAgICBhcnJheUZvckVhY2g6ICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2gsXG4gICAgICAgICAgICBhcnJheUNvbmNhdDogICAgICAgICAgQXJyYXkucHJvdG90eXBlLmNvbmNhdCxcbiAgICAgICAgICAgIGFycmF5U2xpY2U6ICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UsXG4gICAgICAgICAgICBvYmplY3REZWZpbmVQcm9wZXJ0eTogT2JqZWN0LmRlZmluZVByb3BlcnR5LFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIF9nZXRXaW5kb3dJZHMgKGNvbnNvbGVNZXNzYWdlcykge1xuICAgICAgICByZXR1cm4gdGhpc1tOQVRJVkVfTUVUSE9EU19QUk9QRVJUWV9OQU1FXS5vYmplY3RLZXlzKGNvbnNvbGVNZXNzYWdlcyk7XG4gICAgfVxuXG4gICAgX2NvcHlBcnJheSAoYXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbTkFUSVZFX01FVEhPRFNfUFJPUEVSVFlfTkFNRV0uYXJyYXlTbGljZS5jYWxsKGFycmF5KTtcbiAgICB9XG5cbiAgICBfY29uY2F0QXJyYXlzIChhcnJheSwgYW5vdGhlckFycmF5KSB7XG4gICAgICAgIHJldHVybiB0aGlzW05BVElWRV9NRVRIT0RTX1BST1BFUlRZX05BTUVdLmFycmF5Q29uY2F0LmNhbGwoYXJyYXksIGFub3RoZXJBcnJheSk7XG4gICAgfVxuXG4gICAgZW5zdXJlTWVzc2FnZUNvbnRhaW5lciAod2luZG93SWQpIHtcbiAgICAgICAgaWYgKHRoaXNbd2luZG93SWRdKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXNbd2luZG93SWRdID0ge1xuICAgICAgICAgICAgbG9nOiAgIFtdLFxuICAgICAgICAgICAgaW5mbzogIFtdLFxuICAgICAgICAgICAgd2FybjogIFtdLFxuICAgICAgICAgICAgZXJyb3I6IFtdLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbmNhdCAoY29uc29sZU1lc3NhZ2VzKSB7XG4gICAgICAgIGlmICghY29uc29sZU1lc3NhZ2VzKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgY29uc3Qgd2luZG93SWRzID0gdGhpcy5fZ2V0V2luZG93SWRzKGNvbnNvbGVNZXNzYWdlcyk7XG5cbiAgICAgICAgdGhpc1tOQVRJVkVfTUVUSE9EU19QUk9QRVJUWV9OQU1FXS5hcnJheUZvckVhY2guY2FsbCh3aW5kb3dJZHMsIHdpbmRvd0lkID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW5zdXJlTWVzc2FnZUNvbnRhaW5lcih3aW5kb3dJZCk7XG5cbiAgICAgICAgICAgIHRoaXNbd2luZG93SWRdLmxvZyAgID0gdGhpcy5fY29uY2F0QXJyYXlzKHRoaXNbd2luZG93SWRdLmxvZywgY29uc29sZU1lc3NhZ2VzW3dpbmRvd0lkXS5sb2cpO1xuICAgICAgICAgICAgdGhpc1t3aW5kb3dJZF0uaW5mbyAgPSB0aGlzLl9jb25jYXRBcnJheXModGhpc1t3aW5kb3dJZF0uaW5mbywgY29uc29sZU1lc3NhZ2VzW3dpbmRvd0lkXS5pbmZvKTtcbiAgICAgICAgICAgIHRoaXNbd2luZG93SWRdLndhcm4gID0gdGhpcy5fY29uY2F0QXJyYXlzKHRoaXNbd2luZG93SWRdLndhcm4sIGNvbnNvbGVNZXNzYWdlc1t3aW5kb3dJZF0ud2Fybik7XG4gICAgICAgICAgICB0aGlzW3dpbmRvd0lkXS5lcnJvciA9IHRoaXMuX2NvbmNhdEFycmF5cyh0aGlzW3dpbmRvd0lkXS5lcnJvciwgY29uc29sZU1lc3NhZ2VzW3dpbmRvd0lkXS5lcnJvcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGFkZE1lc3NhZ2UgKHR5cGUsIG1zZywgd2luZG93SWQpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVNZXNzYWdlQ29udGFpbmVyKHdpbmRvd0lkKTtcblxuICAgICAgICB0aGlzW3dpbmRvd0lkXVt0eXBlXS5wdXNoKG1zZyk7XG4gICAgfVxuXG4gICAgZ2V0Q29weSAoKSB7XG4gICAgICAgIGNvbnN0IGNvcHkgPSB7fTtcblxuICAgICAgICBjb25zdCB3aW5kb3dJZHMgPSB0aGlzLl9nZXRXaW5kb3dJZHModGhpcyk7XG5cbiAgICAgICAgdGhpc1tOQVRJVkVfTUVUSE9EU19QUk9QRVJUWV9OQU1FXS5hcnJheUZvckVhY2guY2FsbCh3aW5kb3dJZHMsIHdpbmRvd0lkID0+IHtcbiAgICAgICAgICAgIGNvcHlbd2luZG93SWRdID0ge1xuICAgICAgICAgICAgICAgIGxvZzogICB0aGlzLl9jb3B5QXJyYXkodGhpc1t3aW5kb3dJZF0ubG9nKSxcbiAgICAgICAgICAgICAgICBpbmZvOiAgdGhpcy5fY29weUFycmF5KHRoaXNbd2luZG93SWRdLmluZm8pLFxuICAgICAgICAgICAgICAgIHdhcm46ICB0aGlzLl9jb3B5QXJyYXkodGhpc1t3aW5kb3dJZF0ud2FybiksXG4gICAgICAgICAgICAgICAgZXJyb3I6IHRoaXMuX2NvcHlBcnJheSh0aGlzW3dpbmRvd0lkXS5lcnJvciksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY29weTtcbiAgICB9XG59XG4iXX0=