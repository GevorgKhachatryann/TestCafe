"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultCompilerOptions = exports.TYPESCRIPT_BLACKLISTED_OPTIONS = exports.TYPESCRIPT_COMPILER_NON_OVERRIDABLE_OPTIONS = exports.DEFAULT_TYPESCRIPT_COMPILER_OPTIONS = exports.DEFAULT_FILTER_FN = exports.DEFAULT_SCREENSHOT_THUMBNAILS = exports.DEFAULT_PROXYLESS = exports.DEFAULT_DISABLE_HTTP2 = exports.DEFAULT_RETRY_TEST_PAGES = exports.DEFAULT_DEVELOPMENT_MODE = exports.DEFAULT_SOURCE_DIRECTORIES = exports.DEFAULT_CONCURRENCY_VALUE = exports.DEFAULT_APP_INIT_DELAY = exports.DEFAULT_SPEED_VALUE = exports.DEFAULT_TIMEOUT = void 0;
const customizable_compilers_1 = __importDefault(require("./customizable-compilers"));
exports.DEFAULT_TIMEOUT = {
    selector: 10000,
    assertion: 3000,
    pageLoad: 3000,
};
exports.DEFAULT_SPEED_VALUE = 1;
exports.DEFAULT_APP_INIT_DELAY = 1000;
exports.DEFAULT_CONCURRENCY_VALUE = 1;
exports.DEFAULT_SOURCE_DIRECTORIES = ['tests', 'test'];
exports.DEFAULT_DEVELOPMENT_MODE = false;
exports.DEFAULT_RETRY_TEST_PAGES = false;
exports.DEFAULT_DISABLE_HTTP2 = false;
exports.DEFAULT_PROXYLESS = false;
exports.DEFAULT_SCREENSHOT_THUMBNAILS = true;
exports.DEFAULT_FILTER_FN = null;
exports.DEFAULT_TYPESCRIPT_COMPILER_OPTIONS = {
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    allowJs: true,
    pretty: true,
    inlineSourceMap: true,
    noImplicitAny: false,
    module: 1 /* ts.ModuleKind.CommonJS */,
    moduleResolution: 2 /* ts.ModuleResolutionKind.Node */,
    target: 3 /* ts.ScriptTarget.ES2016 */,
    jsx: 2 /* ts.JsxEmit.React */,
    suppressOutputPathCheck: true,
    skipLibCheck: true,
};
exports.TYPESCRIPT_COMPILER_NON_OVERRIDABLE_OPTIONS = ['module', 'moduleResolution', 'target'];
exports.TYPESCRIPT_BLACKLISTED_OPTIONS = [
    'incremental',
    'tsBuildInfoFile',
    'emitDeclarationOnly',
    'declarationMap',
    'declarationDir',
    'composite',
    'outFile',
    'out',
];
const DEFAULT_COMPILER_OPTIONS = {
    [customizable_compilers_1.default.typescript]: {},
};
function getDefaultCompilerOptions() {
    // NOTE: Return the copy of the constant to prevent the modification of object properties
    return Object.assign({}, DEFAULT_COMPILER_OPTIONS);
}
exports.getDefaultCompilerOptions = getDefaultCompilerOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC12YWx1ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlndXJhdGlvbi9kZWZhdWx0LXZhbHVlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxzRkFBNkQ7QUFFaEQsUUFBQSxlQUFlLEdBQUc7SUFDM0IsUUFBUSxFQUFHLEtBQUs7SUFDaEIsU0FBUyxFQUFFLElBQUk7SUFDZixRQUFRLEVBQUcsSUFBSTtDQUNsQixDQUFDO0FBRVcsUUFBQSxtQkFBbUIsR0FBRyxDQUFDLENBQUM7QUFFeEIsUUFBQSxzQkFBc0IsR0FBRyxJQUFJLENBQUM7QUFFOUIsUUFBQSx5QkFBeUIsR0FBRyxDQUFDLENBQUM7QUFFOUIsUUFBQSwwQkFBMEIsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUUvQyxRQUFBLHdCQUF3QixHQUFRLEtBQUssQ0FBQztBQUN0QyxRQUFBLHdCQUF3QixHQUFRLEtBQUssQ0FBQztBQUN0QyxRQUFBLHFCQUFxQixHQUFXLEtBQUssQ0FBQztBQUN0QyxRQUFBLGlCQUFpQixHQUFlLEtBQUssQ0FBQztBQUN0QyxRQUFBLDZCQUE2QixHQUFHLElBQUksQ0FBQztBQUNyQyxRQUFBLGlCQUFpQixHQUFlLElBQUksQ0FBQztBQUVyQyxRQUFBLG1DQUFtQyxHQUFpQztJQUM3RSxzQkFBc0IsRUFBRyxJQUFJO0lBQzdCLHFCQUFxQixFQUFJLElBQUk7SUFDN0IsT0FBTyxFQUFrQixJQUFJO0lBQzdCLE1BQU0sRUFBbUIsSUFBSTtJQUM3QixlQUFlLEVBQVUsSUFBSTtJQUM3QixhQUFhLEVBQVksS0FBSztJQUM5QixNQUFNLEVBQW1CLENBQUMsQ0FBQyw0QkFBNEI7SUFDdkQsZ0JBQWdCLEVBQVMsQ0FBQyxDQUFDLGtDQUFrQztJQUM3RCxNQUFNLEVBQW1CLENBQUMsQ0FBQyw0QkFBNEI7SUFDdkQsR0FBRyxFQUFzQixDQUFDLENBQUMsc0JBQXNCO0lBQ2pELHVCQUF1QixFQUFFLElBQUk7SUFDN0IsWUFBWSxFQUFhLElBQUk7Q0FDaEMsQ0FBQztBQUVXLFFBQUEsMkNBQTJDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFdkYsUUFBQSw4QkFBOEIsR0FBRztJQUMxQyxhQUFhO0lBQ2IsaUJBQWlCO0lBQ2pCLHFCQUFxQjtJQUNyQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLFdBQVc7SUFDWCxTQUFTO0lBQ1QsS0FBSztDQUNSLENBQUM7QUFFRixNQUFNLHdCQUF3QixHQUFHO0lBQzdCLENBQUMsZ0NBQXFCLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRTtDQUN6QyxDQUFDO0FBRUYsU0FBZ0IseUJBQXlCO0lBQ3JDLHlGQUF5RjtJQUN6RixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLHdCQUF3QixDQUFDLENBQUM7QUFDdkQsQ0FBQztBQUhELDhEQUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGljdGlvbmFyeSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgQ3VzdG9taXphYmxlQ29tcGlsZXJzIGZyb20gJy4vY3VzdG9taXphYmxlLWNvbXBpbGVycyc7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJTUVPVVQgPSB7XG4gICAgc2VsZWN0b3I6ICAxMDAwMCxcbiAgICBhc3NlcnRpb246IDMwMDAsXG4gICAgcGFnZUxvYWQ6ICAzMDAwLFxufTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU1BFRURfVkFMVUUgPSAxO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9BUFBfSU5JVF9ERUxBWSA9IDEwMDA7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTkNVUlJFTkNZX1ZBTFVFID0gMTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU09VUkNFX0RJUkVDVE9SSUVTID0gWyd0ZXN0cycsICd0ZXN0J107XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0RFVkVMT1BNRU5UX01PREUgICAgICA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkVUUllfVEVTVF9QQUdFUyAgICAgID0gZmFsc2U7XG5leHBvcnQgY29uc3QgREVGQVVMVF9ESVNBQkxFX0hUVFAyICAgICAgICAgPSBmYWxzZTtcbmV4cG9ydCBjb25zdCBERUZBVUxUX1BST1hZTEVTUyAgICAgICAgICAgICA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0NSRUVOU0hPVF9USFVNQk5BSUxTID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0ZJTFRFUl9GTiAgICAgICAgICAgICA9IG51bGw7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1RZUEVTQ1JJUFRfQ09NUElMRVJfT1BUSU9OUzogRGljdGlvbmFyeTxib29sZWFuIHwgbnVtYmVyPiA9IHtcbiAgICBleHBlcmltZW50YWxEZWNvcmF0b3JzOiAgdHJ1ZSxcbiAgICBlbWl0RGVjb3JhdG9yTWV0YWRhdGE6ICAgdHJ1ZSxcbiAgICBhbGxvd0pzOiAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICBwcmV0dHk6ICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICBpbmxpbmVTb3VyY2VNYXA6ICAgICAgICAgdHJ1ZSxcbiAgICBub0ltcGxpY2l0QW55OiAgICAgICAgICAgZmFsc2UsXG4gICAgbW9kdWxlOiAgICAgICAgICAgICAgICAgIDEgLyogdHMuTW9kdWxlS2luZC5Db21tb25KUyAqLyxcbiAgICBtb2R1bGVSZXNvbHV0aW9uOiAgICAgICAgMiAvKiB0cy5Nb2R1bGVSZXNvbHV0aW9uS2luZC5Ob2RlICovLFxuICAgIHRhcmdldDogICAgICAgICAgICAgICAgICAzIC8qIHRzLlNjcmlwdFRhcmdldC5FUzIwMTYgKi8sXG4gICAganN4OiAgICAgICAgICAgICAgICAgICAgIDIgLyogdHMuSnN4RW1pdC5SZWFjdCAqLyxcbiAgICBzdXBwcmVzc091dHB1dFBhdGhDaGVjazogdHJ1ZSxcbiAgICBza2lwTGliQ2hlY2s6ICAgICAgICAgICAgdHJ1ZSxcbn07XG5cbmV4cG9ydCBjb25zdCBUWVBFU0NSSVBUX0NPTVBJTEVSX05PTl9PVkVSUklEQUJMRV9PUFRJT05TID0gWydtb2R1bGUnLCAnbW9kdWxlUmVzb2x1dGlvbicsICd0YXJnZXQnXTtcblxuZXhwb3J0IGNvbnN0IFRZUEVTQ1JJUFRfQkxBQ0tMSVNURURfT1BUSU9OUyA9IFtcbiAgICAnaW5jcmVtZW50YWwnLFxuICAgICd0c0J1aWxkSW5mb0ZpbGUnLFxuICAgICdlbWl0RGVjbGFyYXRpb25Pbmx5JyxcbiAgICAnZGVjbGFyYXRpb25NYXAnLFxuICAgICdkZWNsYXJhdGlvbkRpcicsXG4gICAgJ2NvbXBvc2l0ZScsXG4gICAgJ291dEZpbGUnLFxuICAgICdvdXQnLFxuXTtcblxuY29uc3QgREVGQVVMVF9DT01QSUxFUl9PUFRJT05TID0ge1xuICAgIFtDdXN0b21pemFibGVDb21waWxlcnMudHlwZXNjcmlwdF06IHt9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRDb21waWxlck9wdGlvbnMgKCk6IG9iamVjdCB7XG4gICAgLy8gTk9URTogUmV0dXJuIHRoZSBjb3B5IG9mIHRoZSBjb25zdGFudCB0byBwcmV2ZW50IHRoZSBtb2RpZmljYXRpb24gb2Ygb2JqZWN0IHByb3BlcnRpZXNcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9DT01QSUxFUl9PUFRJT05TKTtcbn1cbiJdfQ==