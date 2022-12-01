"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommonElement = exports.equals = exports.remove = exports.find = exports.from = exports.isArray = exports.join = exports.concat = exports.reduce = exports.reverse = exports.some = exports.indexOf = exports.forEach = exports.unshift = exports.splice = exports.slice = exports.map = exports.filter = void 0;
const hammerhead_1 = require("../deps/hammerhead");
const ARRAY_METHODS_PREFIX = 'array';
function createNativeMethodWrapper(methodName) {
    const nativeMethodName = ARRAY_METHODS_PREFIX + methodName.charAt(0).toUpperCase() + methodName.slice(1);
    const nativeMethod = hammerhead_1.nativeMethods[nativeMethodName];
    return (...args) => nativeMethod.call(...args);
}
exports.filter = createNativeMethodWrapper('filter');
exports.map = createNativeMethodWrapper('map');
exports.slice = createNativeMethodWrapper('slice');
exports.splice = createNativeMethodWrapper('splice');
exports.unshift = createNativeMethodWrapper('unshift');
exports.forEach = createNativeMethodWrapper('forEach');
exports.indexOf = createNativeMethodWrapper('indexOf');
exports.some = createNativeMethodWrapper('some');
exports.reverse = createNativeMethodWrapper('reverse');
exports.reduce = createNativeMethodWrapper('reduce');
exports.concat = createNativeMethodWrapper('concat');
exports.join = createNativeMethodWrapper('join');
function isArray(arg) {
    return hammerhead_1.nativeMethods.objectToString.call(arg) === '[object Array]';
}
exports.isArray = isArray;
function from(arg, ...args) {
    if (hammerhead_1.nativeMethods.arrayFrom)
        return hammerhead_1.nativeMethods.arrayFrom(arg, ...args);
    // NOTE: this logic is for IE
    const arr = [];
    const length = arg.length;
    for (let i = 0; i < length; i++)
        arr.push(arg[i]);
    return arr;
}
exports.from = from;
function find(arr, callback) {
    if (hammerhead_1.nativeMethods.arrayFind)
        return hammerhead_1.nativeMethods.arrayFind.call(arr, callback);
    // NOTE: this logic is for IE
    const length = arr.length;
    for (let i = 0; i < length; i++) {
        if (callback(arr[i], i, arr))
            return arr[i];
    }
    return null;
}
exports.find = find;
function remove(arr, item) {
    const index = hammerhead_1.nativeMethods.arrayIndexOf.call(arr, item);
    if (index > -1)
        hammerhead_1.nativeMethods.arraySplice.call(arr, index, 1);
}
exports.remove = remove;
function equals(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (let i = 0, l = arr1.length; i < l; i++) {
        if (arr1[i] !== arr2[i])
            return false;
    }
    return true;
}
exports.equals = equals;
function getCommonElement(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        for (let t = 0; t < arr2.length; t++) {
            if (arr1[i] === arr2[t])
                return arr1[i];
        }
    }
    return null;
}
exports.getCommonElement = getCommonElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY2xpZW50L2NvcmUvdXRpbHMvYXJyYXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbURBQW1EO0FBRW5ELE1BQU0sb0JBQW9CLEdBQUcsT0FBTyxDQUFDO0FBRXJDLFNBQVMseUJBQXlCLENBQUUsVUFBVTtJQUMxQyxNQUFNLGdCQUFnQixHQUFHLG9CQUFvQixHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RyxNQUFNLFlBQVksR0FBTywwQkFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFekQsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFJLHlCQUF5QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLFFBQUEsR0FBRyxHQUFPLHlCQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNDLFFBQUEsS0FBSyxHQUFLLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdDLFFBQUEsTUFBTSxHQUFJLHlCQUF5QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLFFBQUEsT0FBTyxHQUFHLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9DLFFBQUEsT0FBTyxHQUFHLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9DLFFBQUEsT0FBTyxHQUFHLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9DLFFBQUEsSUFBSSxHQUFNLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzVDLFFBQUEsT0FBTyxHQUFHLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9D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RSxFQUFFO1lBQ2xDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RCO0tBQ0o7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBVEQsNENBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBuYXRpdmVNZXRob2RzIH0gZnJvbSAnLi4vZGVwcy9oYW1tZXJoZWFkJztcblxuY29uc3QgQVJSQVlfTUVUSE9EU19QUkVGSVggPSAnYXJyYXknO1xuXG5mdW5jdGlvbiBjcmVhdGVOYXRpdmVNZXRob2RXcmFwcGVyIChtZXRob2ROYW1lKSB7XG4gICAgY29uc3QgbmF0aXZlTWV0aG9kTmFtZSA9IEFSUkFZX01FVEhPRFNfUFJFRklYICsgbWV0aG9kTmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG1ldGhvZE5hbWUuc2xpY2UoMSk7XG4gICAgY29uc3QgbmF0aXZlTWV0aG9kICAgICA9IG5hdGl2ZU1ldGhvZHNbbmF0aXZlTWV0aG9kTmFtZV07XG5cbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IG5hdGl2ZU1ldGhvZC5jYWxsKC4uLmFyZ3MpO1xufVxuXG5leHBvcnQgY29uc3QgZmlsdGVyICA9IGNyZWF0ZU5hdGl2ZU1ldGhvZFdyYXBwZXIoJ2ZpbHRlcicpO1xuZXhwb3J0IGNvbnN0IG1hcCAgICAgPSBjcmVhdGVOYXRpdmVNZXRob2RXcmFwcGVyKCdtYXAnKTtcbmV4cG9ydCBjb25zdCBzbGljZSAgID0gY3JlYXRlTmF0aXZlTWV0aG9kV3JhcHBlcignc2xpY2UnKTtcbmV4cG9ydCBjb25zdCBzcGxpY2UgID0gY3JlYXRlTmF0aXZlTWV0aG9kV3JhcHBlcignc3BsaWNlJyk7XG5leHBvcnQgY29uc3QgdW5zaGlmdCA9IGNyZWF0ZU5hdGl2ZU1ldGhvZFdyYXBwZXIoJ3Vuc2hpZnQnKTtcbmV4cG9ydCBjb25zdCBmb3JFYWNoID0gY3JlYXRlTmF0aXZlTWV0aG9kV3JhcHBlcignZm9yRWFjaCcpO1xuZXhwb3J0IGNvbnN0IGluZGV4T2YgPSBjcmVhdGVOYXRpdmVNZXRob2RXcmFwcGVyKCdpbmRleE9mJyk7XG5leHBvcnQgY29uc3Qgc29tZSAgICA9IGNyZWF0ZU5hdGl2ZU1ldGhvZFdyYXBwZXIoJ3NvbWUnKTtcbmV4cG9ydCBjb25zdCByZXZlcnNlID0gY3JlYXRlTmF0aXZlTWV0aG9kV3JhcHBlcigncmV2ZXJzZScpO1xuZXhwb3J0IGNvbnN0IHJlZHVjZSAgPSBjcmVhdGVOYXRpdmVNZXRob2RXcmFwcGVyKCdyZWR1Y2UnKTtcbmV4cG9ydCBjb25zdCBjb25jYXQgID0gY3JlYXRlTmF0aXZlTWV0aG9kV3JhcHBlcignY29uY2F0Jyk7XG5leHBvcnQgY29uc3Qgam9pbiAgICA9IGNyZWF0ZU5hdGl2ZU1ldGhvZFdyYXBwZXIoJ2pvaW4nKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkgKGFyZykge1xuICAgIHJldHVybiBuYXRpdmVNZXRob2RzLm9iamVjdFRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb20gKGFyZywgLi4uYXJncykge1xuICAgIGlmIChuYXRpdmVNZXRob2RzLmFycmF5RnJvbSlcbiAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZHMuYXJyYXlGcm9tKGFyZywgLi4uYXJncyk7XG5cbiAgICAvLyBOT1RFOiB0aGlzIGxvZ2ljIGlzIGZvciBJRVxuICAgIGNvbnN0IGFyciAgICA9IFtdO1xuICAgIGNvbnN0IGxlbmd0aCA9IGFyZy5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKVxuICAgICAgICBhcnIucHVzaChhcmdbaV0pO1xuXG4gICAgcmV0dXJuIGFycjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQgKGFyciwgY2FsbGJhY2spIHtcbiAgICBpZiAobmF0aXZlTWV0aG9kcy5hcnJheUZpbmQpXG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2RzLmFycmF5RmluZC5jYWxsKGFyciwgY2FsbGJhY2spO1xuXG4gICAgLy8gTk9URTogdGhpcyBsb2dpYyBpcyBmb3IgSUVcbiAgICBjb25zdCBsZW5ndGggPSBhcnIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY2FsbGJhY2soYXJyW2ldLCBpLCBhcnIpKVxuICAgICAgICAgICAgcmV0dXJuIGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZSAoYXJyLCBpdGVtKSB7XG4gICAgY29uc3QgaW5kZXggPSBuYXRpdmVNZXRob2RzLmFycmF5SW5kZXhPZi5jYWxsKGFyciwgaXRlbSk7XG5cbiAgICBpZiAoaW5kZXggPiAtMSlcbiAgICAgICAgbmF0aXZlTWV0aG9kcy5hcnJheVNwbGljZS5jYWxsKGFyciwgaW5kZXgsIDEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzIChhcnIxLCBhcnIyKSB7XG4gICAgaWYgKGFycjEubGVuZ3RoICE9PSBhcnIyLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcnIxLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXJyMVtpXSAhPT0gYXJyMltpXSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbW1vbkVsZW1lbnQgKGFycjEsIGFycjIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycjEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCBhcnIyLmxlbmd0aDsgdCsrKSB7XG4gICAgICAgICAgICBpZiAoYXJyMVtpXSA9PT0gYXJyMlt0XSlcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyMVtpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufVxuXG4iXX0=