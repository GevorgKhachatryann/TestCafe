"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testcafe_hammerhead_1 = __importDefault(require("testcafe-hammerhead"));
const asyncToGenerator_1 = __importDefault(require("@babel/runtime/helpers/asyncToGenerator"));
const lodash_1 = require("lodash");
const load_libs_1 = __importDefault(require("./babel/load-libs"));
const runtime_1 = require("../errors/runtime");
const types_1 = require("../errors/types");
const format_babel_produced_code_1 = __importDefault(require("./babel/format-babel-produced-code"));
const get_base_babel_options_1 = __importDefault(require("./babel/get-base-babel-options"));
const ANONYMOUS_FN_RE = /^function\s*\*?\s*\(/;
const ES6_OBJ_METHOD_NAME_RE = /^(\S+?)\s*\(/;
const USE_STRICT_RE = /^('|")use strict('|");?/;
const TRAILING_SEMICOLON_RE = /;\s*$/;
const REGENERATOR_FOOTPRINTS_RE = /(_index\d+\.default|_regenerator\d+\.default|regeneratorRuntime)(\(\))?\.wrap\(function func\$\(_context\)/;
const ASYNC_TO_GENERATOR_OUTPUT_CODE = (0, format_babel_produced_code_1.default)((0, asyncToGenerator_1.default)(lodash_1.noop).toString());
const CLIENT_FUNCTION_BODY_WRAPPER = code => `const func = (${code});`;
const CLIENT_FUNCTION_WRAPPER = ({ code, dependencies }) => `(function(){${dependencies} ${code} return func;})();`;
let loadedBabelOptions = null;
function getBabelOptions() {
    const { presetEnvForClientFunction, transformForOfAsArray } = (0, load_libs_1.default)();
    return Object.assign({}, get_base_babel_options_1.default, {
        presets: [{ plugins: [transformForOfAsArray] }, presetEnvForClientFunction],
    });
}
function ensureLoadedBabelOptions() {
    if (!loadedBabelOptions) {
        const { babel } = (0, load_libs_1.default)();
        const opts = getBabelOptions();
        loadedBabelOptions = babel.loadOptions(opts);
    }
    return loadedBabelOptions;
}
function downgradeES(fnCode) {
    const { babel } = (0, load_libs_1.default)();
    const opts = ensureLoadedBabelOptions();
    const compiled = babel.transform(fnCode, opts);
    return compiled.code
        .replace(USE_STRICT_RE, '')
        .trim();
}
function getDependenciesDefinition(dependencies) {
    return Object
        .keys(dependencies)
        .reduce((code, name) => {
        return code + `var ${name}=__dependencies$['${name}'];`;
    }, '');
}
function makeFnCodeSuitableForParsing(fnCode) {
    // NOTE: 'function() {}' -> '(function() {})'
    if (ANONYMOUS_FN_RE.test(fnCode))
        return `(${fnCode})`;
    // NOTE: 'myFn () {}' -> 'function myFn() {}'
    const match = fnCode.match(ES6_OBJ_METHOD_NAME_RE);
    if (match && match[1] !== 'function')
        return `function ${fnCode}`;
    return fnCode;
}
function containsAsyncToGeneratorOutputCode(code) {
    const formattedCode = (0, format_babel_produced_code_1.default)(code);
    return formattedCode.includes(ASYNC_TO_GENERATOR_OUTPUT_CODE);
}
function compileClientFunction(fnCode, dependencies, instantiationCallsiteName, compilationCallsiteName) {
    if (containsAsyncToGeneratorOutputCode(fnCode))
        throw new runtime_1.ClientFunctionAPIError(compilationCallsiteName, instantiationCallsiteName, types_1.RUNTIME_ERRORS.regeneratorInClientFunctionCode);
    fnCode = makeFnCodeSuitableForParsing(fnCode);
    fnCode = CLIENT_FUNCTION_BODY_WRAPPER(fnCode);
    // NOTE: we need to recompile ES6 code for the browser if we are on newer versions of Node.
    fnCode = downgradeES(fnCode);
    fnCode = testcafe_hammerhead_1.default.processScript(fnCode, false);
    // NOTE: check compiled code for regenerator injection
    if (REGENERATOR_FOOTPRINTS_RE.test(fnCode))
        throw new runtime_1.ClientFunctionAPIError(compilationCallsiteName, instantiationCallsiteName, types_1.RUNTIME_ERRORS.regeneratorInClientFunctionCode);
    if (!TRAILING_SEMICOLON_RE.test(fnCode))
        fnCode += ';';
    const dependenciesDefinition = dependencies ? getDependenciesDefinition(dependencies) : '';
    return CLIENT_FUNCTION_WRAPPER({ code: fnCode, dependencies: dependenciesDefinition });
}
exports.default = compileClientFunction;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS1jbGllbnQtZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tcGlsZXIvY29tcGlsZS1jbGllbnQtZnVuY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4RUFBNkM7QUFDN0MsK0ZBQXVFO0FBQ3ZFLG1DQUE4QjtBQUM5QixrRUFBOEM7QUFDOUMsK0NBQTJEO0FBQzNELDJDQUFpRDtBQUNqRCxvR0FBeUU7QUFDekUsNEZBQWdFO0FBRWhFLE1BQU0sZUFBZSxHQUFrQixzQkFBc0IsQ0FBQztBQUM5RCxNQUFNLHNCQUFzQixHQUFXLGNBQWMsQ0FBQztBQUN0RCxNQUFNLGFBQWEsR0FBb0IseUJBQXlCLENBQUM7QUFDakUsTUFBTSxxQkFBcUIsR0FBWSxPQUFPLENBQUM7QUFDL0MsTUFBTSx5QkFBeUIsR0FBUSw0R0FBNEcsQ0FBQztBQUNwSixNQUFNLDhCQUE4QixHQUFHLElBQUEsb0NBQXVCLEVBQUMsSUFBQSwwQkFBZ0IsRUFBQyxhQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBRWxHLE1BQU0sNEJBQTRCLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUM7QUFDdkUsTUFBTSx1QkFBdUIsR0FBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsQ0FBQyxlQUFlLFlBQVksSUFBSSxJQUFJLG9CQUFvQixDQUFDO0FBRXpILElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0FBRTlCLFNBQVMsZUFBZTtJQUNwQixNQUFNLEVBQUUsMEJBQTBCLEVBQUUscUJBQXFCLEVBQUUsR0FBRyxJQUFBLG1CQUFhLEdBQUUsQ0FBQztJQUU5RSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGdDQUFrQixFQUFFO1FBQ3pDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMscUJBQXFCLENB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QUFHLFlBQVksQ0FBQyxDQUFDLENBQUMseUJBQXlCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUUzRixPQUFPLHVCQUF1QixDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO0FBQzNGLENBQUM7QUF2QkQsd0NBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGhhbW1lcmhlYWQgZnJvbSAndGVzdGNhZmUtaGFtbWVyaGVhZCc7XG5pbXBvcnQgYXN5bmNUb0dlbmVyYXRvciBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3InO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbG9hZEJhYmVsTGlicyBmcm9tICcuL2JhYmVsL2xvYWQtbGlicyc7XG5pbXBvcnQgeyBDbGllbnRGdW5jdGlvbkFQSUVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL3J1bnRpbWUnO1xuaW1wb3J0IHsgUlVOVElNRV9FUlJPUlMgfSBmcm9tICcuLi9lcnJvcnMvdHlwZXMnO1xuaW1wb3J0IGZvcm1hdEJhYmVsUHJvZHVjZWRDb2RlIGZyb20gJy4vYmFiZWwvZm9ybWF0LWJhYmVsLXByb2R1Y2VkLWNvZGUnO1xuaW1wb3J0IEJBU0VfQkFCRUxfT1BUSU9OUyBmcm9tICcuL2JhYmVsL2dldC1iYXNlLWJhYmVsLW9wdGlvbnMnO1xuXG5jb25zdCBBTk9OWU1PVVNfRk5fUkUgICAgICAgICAgICAgICAgPSAvXmZ1bmN0aW9uXFxzKlxcKj9cXHMqXFwoLztcbmNvbnN0IEVTNl9PQkpfTUVUSE9EX05BTUVfUkUgICAgICAgICA9IC9eKFxcUys/KVxccypcXCgvO1xuY29uc3QgVVNFX1NUUklDVF9SRSAgICAgICAgICAgICAgICAgID0gL14oJ3xcIil1c2Ugc3RyaWN0KCd8XCIpOz8vO1xuY29uc3QgVFJBSUxJTkdfU0VNSUNPTE9OX1JFICAgICAgICAgID0gLztcXHMqJC87XG5jb25zdCBSRUdFTkVSQVRPUl9GT09UUFJJTlRTX1JFICAgICAgPSAvKF9pbmRleFxcZCtcXC5kZWZhdWx0fF9yZWdlbmVyYXRvclxcZCtcXC5kZWZhdWx0fHJlZ2VuZXJhdG9yUnVudGltZSkoXFwoXFwpKT9cXC53cmFwXFwoZnVuY3Rpb24gZnVuY1xcJFxcKF9jb250ZXh0XFwpLztcbmNvbnN0IEFTWU5DX1RPX0dFTkVSQVRPUl9PVVRQVVRfQ09ERSA9IGZvcm1hdEJhYmVsUHJvZHVjZWRDb2RlKGFzeW5jVG9HZW5lcmF0b3Iobm9vcCkudG9TdHJpbmcoKSk7XG5cbmNvbnN0IENMSUVOVF9GVU5DVElPTl9CT0RZX1dSQVBQRVIgPSBjb2RlID0+IGBjb25zdCBmdW5jID0gKCR7Y29kZX0pO2A7XG5jb25zdCBDTElFTlRfRlVOQ1RJT05fV1JBUFBFUiAgICAgID0gKHsgY29kZSwgZGVwZW5kZW5jaWVzIH0pID0+IGAoZnVuY3Rpb24oKXske2RlcGVuZGVuY2llc30gJHtjb2RlfSByZXR1cm4gZnVuYzt9KSgpO2A7XG5cbmxldCBsb2FkZWRCYWJlbE9wdGlvbnMgPSBudWxsO1xuXG5mdW5jdGlvbiBnZXRCYWJlbE9wdGlvbnMgKCkge1xuICAgIGNvbnN0IHsgcHJlc2V0RW52Rm9yQ2xpZW50RnVuY3Rpb24sIHRyYW5zZm9ybUZvck9mQXNBcnJheSB9ID0gbG9hZEJhYmVsTGlicygpO1xuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIEJBU0VfQkFCRUxfT1BUSU9OUywge1xuICAgICAgICBwcmVzZXRzOiBbeyBwbHVnaW5zOiBbdHJhbnNmb3JtRm9yT2ZBc0FycmF5XSB9LCBwcmVzZXRFbnZGb3JDbGllbnRGdW5jdGlvbl0sXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGVuc3VyZUxvYWRlZEJhYmVsT3B0aW9ucyAoKSB7XG4gICAgaWYgKCFsb2FkZWRCYWJlbE9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgeyBiYWJlbCB9ID0gbG9hZEJhYmVsTGlicygpO1xuICAgICAgICBjb25zdCBvcHRzICAgICAgPSBnZXRCYWJlbE9wdGlvbnMoKTtcblxuICAgICAgICBsb2FkZWRCYWJlbE9wdGlvbnMgPSBiYWJlbC5sb2FkT3B0aW9ucyhvcHRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbG9hZGVkQmFiZWxPcHRpb25zO1xufVxuXG5mdW5jdGlvbiBkb3duZ3JhZGVFUyAoZm5Db2RlKSB7XG4gICAgY29uc3QgeyBiYWJlbCB9ID0gbG9hZEJhYmVsTGlicygpO1xuICAgIGNvbnN0IG9wdHMgICAgICA9IGVuc3VyZUxvYWRlZEJhYmVsT3B0aW9ucygpO1xuICAgIGNvbnN0IGNvbXBpbGVkICA9IGJhYmVsLnRyYW5zZm9ybShmbkNvZGUsIG9wdHMpO1xuXG4gICAgcmV0dXJuIGNvbXBpbGVkLmNvZGVcbiAgICAgICAgLnJlcGxhY2UoVVNFX1NUUklDVF9SRSwgJycpXG4gICAgICAgIC50cmltKCk7XG59XG5cbmZ1bmN0aW9uIGdldERlcGVuZGVuY2llc0RlZmluaXRpb24gKGRlcGVuZGVuY2llcykge1xuICAgIHJldHVybiBPYmplY3RcbiAgICAgICAgLmtleXMoZGVwZW5kZW5jaWVzKVxuICAgICAgICAucmVkdWNlKChjb2RlLCBuYW1lKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29kZSArIGB2YXIgJHtuYW1lfT1fX2RlcGVuZGVuY2llcyRbJyR7bmFtZX0nXTtgO1xuICAgICAgICB9LCAnJyk7XG59XG5cbmZ1bmN0aW9uIG1ha2VGbkNvZGVTdWl0YWJsZUZvclBhcnNpbmcgKGZuQ29kZSkge1xuICAgIC8vIE5PVEU6ICdmdW5jdGlvbigpIHt9JyAtPiAnKGZ1bmN0aW9uKCkge30pJ1xuICAgIGlmIChBTk9OWU1PVVNfRk5fUkUudGVzdChmbkNvZGUpKVxuICAgICAgICByZXR1cm4gYCgke2ZuQ29kZX0pYDtcblxuICAgIC8vIE5PVEU6ICdteUZuICgpIHt9JyAtPiAnZnVuY3Rpb24gbXlGbigpIHt9J1xuICAgIGNvbnN0IG1hdGNoID0gZm5Db2RlLm1hdGNoKEVTNl9PQkpfTUVUSE9EX05BTUVfUkUpO1xuXG4gICAgaWYgKG1hdGNoICYmIG1hdGNoWzFdICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICByZXR1cm4gYGZ1bmN0aW9uICR7Zm5Db2RlfWA7XG5cbiAgICByZXR1cm4gZm5Db2RlO1xufVxuXG5mdW5jdGlvbiBjb250YWluc0FzeW5jVG9HZW5lcmF0b3JPdXRwdXRDb2RlIChjb2RlKSB7XG4gICAgY29uc3QgZm9ybWF0dGVkQ29kZSA9IGZvcm1hdEJhYmVsUHJvZHVjZWRDb2RlKGNvZGUpO1xuXG4gICAgcmV0dXJuIGZvcm1hdHRlZENvZGUuaW5jbHVkZXMoQVNZTkNfVE9fR0VORVJBVE9SX09VVFBVVF9DT0RFKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcGlsZUNsaWVudEZ1bmN0aW9uIChmbkNvZGUsIGRlcGVuZGVuY2llcywgaW5zdGFudGlhdGlvbkNhbGxzaXRlTmFtZSwgY29tcGlsYXRpb25DYWxsc2l0ZU5hbWUpIHtcbiAgICBpZiAoY29udGFpbnNBc3luY1RvR2VuZXJhdG9yT3V0cHV0Q29kZShmbkNvZGUpKVxuICAgICAgICB0aHJvdyBuZXcgQ2xpZW50RnVuY3Rpb25BUElFcnJvcihjb21waWxhdGlvbkNhbGxzaXRlTmFtZSwgaW5zdGFudGlhdGlvbkNhbGxzaXRlTmFtZSwgUlVOVElNRV9FUlJPUlMucmVnZW5lcmF0b3JJbkNsaWVudEZ1bmN0aW9uQ29kZSk7XG5cbiAgICBmbkNvZGUgPSBtYWtlRm5Db2RlU3VpdGFibGVGb3JQYXJzaW5nKGZuQ29kZSk7XG5cblxuICAgIGZuQ29kZSA9IENMSUVOVF9GVU5DVElPTl9CT0RZX1dSQVBQRVIoZm5Db2RlKTtcblxuICAgIC8vIE5PVEU6IHdlIG5lZWQgdG8gcmVjb21waWxlIEVTNiBjb2RlIGZvciB0aGUgYnJvd3NlciBpZiB3ZSBhcmUgb24gbmV3ZXIgdmVyc2lvbnMgb2YgTm9kZS5cbiAgICBmbkNvZGUgPSBkb3duZ3JhZGVFUyhmbkNvZGUpO1xuICAgIGZuQ29kZSA9IGhhbW1lcmhlYWQucHJvY2Vzc1NjcmlwdChmbkNvZGUsIGZhbHNlKTtcblxuICAgIC8vIE5PVEU6IGNoZWNrIGNvbXBpbGVkIGNvZGUgZm9yIHJlZ2VuZXJhdG9yIGluamVjdGlvblxuICAgIGlmIChSRUdFTkVSQVRPUl9GT09UUFJJTlRTX1JFLnRlc3QoZm5Db2RlKSlcbiAgICAgICAgdGhyb3cgbmV3IENsaWVudEZ1bmN0aW9uQVBJRXJyb3IoY29tcGlsYXRpb25DYWxsc2l0ZU5hbWUsIGluc3RhbnRpYXRpb25DYWxsc2l0ZU5hbWUsIFJVTlRJTUVfRVJST1JTLnJlZ2VuZXJhdG9ySW5DbGllbnRGdW5jdGlvbkNvZGUpO1xuXG4gICAgaWYgKCFUUkFJTElOR19TRU1JQ09MT05fUkUudGVzdChmbkNvZGUpKVxuICAgICAgICBmbkNvZGUgKz0gJzsnO1xuXG4gICAgY29uc3QgZGVwZW5kZW5jaWVzRGVmaW5pdGlvbiA9IGRlcGVuZGVuY2llcyA/IGdldERlcGVuZGVuY2llc0RlZmluaXRpb24oZGVwZW5kZW5jaWVzKSA6ICcnO1xuXG4gICAgcmV0dXJuIENMSUVOVF9GVU5DVElPTl9XUkFQUEVSKHsgY29kZTogZm5Db2RlLCBkZXBlbmRlbmNpZXM6IGRlcGVuZGVuY2llc0RlZmluaXRpb24gfSk7XG59XG4iXX0=