"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSelector = exports.initTypeSelector = exports.initUploadSelector = void 0;
const selector_builder_1 = __importDefault(require("../../../client-functions/selectors/selector-builder"));
const test_run_1 = require("../../../errors/test-run");
const runtime_1 = require("../../../errors/runtime");
const observation_1 = require("../observation");
const execute_js_expression_1 = require("../../execute-js-expression");
const utils_1 = require("../utils");
function initUploadSelector(name, val, initOptions) {
    initOptions.skipVisibilityCheck = true;
    return initSelector(name, val, initOptions);
}
exports.initUploadSelector = initUploadSelector;
function initTypeSelector(name, val, initOptions) {
    initOptions.needError = true;
    initOptions.strictError = true;
    return initSelector(name, val, initOptions);
}
exports.initTypeSelector = initTypeSelector;
function initSelector(name, val, _a) {
    var { testRun } = _a, options = __rest(_a, ["testRun"]);
    if (val instanceof observation_1.ExecuteSelectorCommand)
        return val;
    try {
        if ((0, utils_1.isJSExpression)(val))
            val = (0, execute_js_expression_1.executeJsExpression)(val.value, testRun, options);
        const { skipVisibilityCheck } = options, builderOptions = __rest(options, ["skipVisibilityCheck"]);
        const builder = new selector_builder_1.default(val, Object.assign({ visibilityCheck: !skipVisibilityCheck }, builderOptions), { instantiation: 'Selector' });
        return builder.getCommand();
    }
    catch (err) {
        throw new test_run_1.ActionSelectorError(name, err, err instanceof runtime_1.APIError);
    }
}
exports.initSelector = initSelector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdGlhbGl6ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Rlc3QtcnVuL2NvbW1hbmRzL3ZhbGlkYXRpb25zL2luaXRpYWxpemVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRHQUFtRjtBQUNuRix1REFBK0Q7QUFDL0QscURBQW1EO0FBQ25ELGdEQUF3RDtBQUN4RCx1RUFBa0U7QUFDbEUsb0NBQTBDO0FBRTFDLFNBQWdCLGtCQUFrQixDQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsV0FBVztJQUN0RCxXQUFXLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0lBRXZDLE9BQU8sWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUpELGdEQUlDO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxXQUFXO0lBQ3BELFdBQVcsQ0FBQyxTQUFTLEdBQUssSUFBSSxDQUFDO0lBQy9CLFdBQVcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBRS9CLE9BQU8sWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUxELDRDQUtDO0FBRUQsU0FBZ0IsWUFBWSxDQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBdUI7UUFBdkIsRUFBRSxPQUFPLE9BQWMsRUFBVCxPQUFPLGNBQXJCLFdBQXVCLENBQUY7SUFDMUQsSUFBSSxHQUFHLFlBQVksb0NBQXNCO1FBQ3JDLE9BQU8sR0FBRyxDQUFDO0lBRWYsSUFBSTtRQUNBLElBQUksSUFBQSxzQkFBYyxFQUFDLEdBQUcsQ0FBQztZQUNuQixHQUFHLEdBQUcsSUFBQSwyQ0FBbUIsRUFBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUzRCxNQUFNLEVBQUUsbUJBQW1CLEtBQXdCLE9BQU8sRUFBMUIsY0FBYyxVQUFLLE9BQU8sRUFBcEQsdUJBQTBDLENBQVUsQ0FBQztRQUUzRCxNQUFNLE9BQU8sR0FBRyxJQUFJLDBCQUFlLENBQUMsR0FBRyxrQkFDbkMsZUFBZSxFQUFFLENBQUMsbUJBQW1CLElBQ2xDLGNBQWMsR0FDbEIsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUVsQyxPQUFPLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUMvQjtJQUNELE9BQU8sR0FBRyxFQUFFO1FBQ1IsTUFBTSxJQUFJLDhCQUFtQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxZQUFZLGtCQUFRLENBQUMsQ0FBQztLQUNyRTtBQUNMLENBQUM7QUFwQkQsb0NBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlbGVjdG9yQnVpbGRlciBmcm9tICcuLi8uLi8uLi9jbGllbnQtZnVuY3Rpb25zL3NlbGVjdG9ycy9zZWxlY3Rvci1idWlsZGVyJztcbmltcG9ydCB7IEFjdGlvblNlbGVjdG9yRXJyb3IgfSBmcm9tICcuLi8uLi8uLi9lcnJvcnMvdGVzdC1ydW4nO1xuaW1wb3J0IHsgQVBJRXJyb3IgfSBmcm9tICcuLi8uLi8uLi9lcnJvcnMvcnVudGltZSc7XG5pbXBvcnQgeyBFeGVjdXRlU2VsZWN0b3JDb21tYW5kIH0gZnJvbSAnLi4vb2JzZXJ2YXRpb24nO1xuaW1wb3J0IHsgZXhlY3V0ZUpzRXhwcmVzc2lvbiB9IGZyb20gJy4uLy4uL2V4ZWN1dGUtanMtZXhwcmVzc2lvbic7XG5pbXBvcnQgeyBpc0pTRXhwcmVzc2lvbiB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRVcGxvYWRTZWxlY3RvciAobmFtZSwgdmFsLCBpbml0T3B0aW9ucykge1xuICAgIGluaXRPcHRpb25zLnNraXBWaXNpYmlsaXR5Q2hlY2sgPSB0cnVlO1xuXG4gICAgcmV0dXJuIGluaXRTZWxlY3RvcihuYW1lLCB2YWwsIGluaXRPcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUeXBlU2VsZWN0b3IgKG5hbWUsIHZhbCwgaW5pdE9wdGlvbnMpIHtcbiAgICBpbml0T3B0aW9ucy5uZWVkRXJyb3IgICA9IHRydWU7XG4gICAgaW5pdE9wdGlvbnMuc3RyaWN0RXJyb3IgPSB0cnVlO1xuXG4gICAgcmV0dXJuIGluaXRTZWxlY3RvcihuYW1lLCB2YWwsIGluaXRPcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRTZWxlY3RvciAobmFtZSwgdmFsLCB7IHRlc3RSdW4sIC4uLm9wdGlvbnMgfSkge1xuICAgIGlmICh2YWwgaW5zdGFuY2VvZiBFeGVjdXRlU2VsZWN0b3JDb21tYW5kKVxuICAgICAgICByZXR1cm4gdmFsO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKGlzSlNFeHByZXNzaW9uKHZhbCkpXG4gICAgICAgICAgICB2YWwgPSBleGVjdXRlSnNFeHByZXNzaW9uKHZhbC52YWx1ZSwgdGVzdFJ1biwgb3B0aW9ucyk7XG5cbiAgICAgICAgY29uc3QgeyBza2lwVmlzaWJpbGl0eUNoZWNrLCAuLi5idWlsZGVyT3B0aW9ucyB9ID0gb3B0aW9ucztcblxuICAgICAgICBjb25zdCBidWlsZGVyID0gbmV3IFNlbGVjdG9yQnVpbGRlcih2YWwsIHtcbiAgICAgICAgICAgIHZpc2liaWxpdHlDaGVjazogIXNraXBWaXNpYmlsaXR5Q2hlY2ssXG4gICAgICAgICAgICAuLi5idWlsZGVyT3B0aW9ucyxcbiAgICAgICAgfSwgeyBpbnN0YW50aWF0aW9uOiAnU2VsZWN0b3InIH0pO1xuXG4gICAgICAgIHJldHVybiBidWlsZGVyLmdldENvbW1hbmQoKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICB0aHJvdyBuZXcgQWN0aW9uU2VsZWN0b3JFcnJvcihuYW1lLCBlcnIsIGVyciBpbnN0YW5jZW9mIEFQSUVycm9yKTtcbiAgICB9XG59XG4iXX0=