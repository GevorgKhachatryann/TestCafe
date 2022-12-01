"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_transform_1 = __importDefault(require("./base-transform"));
const testcafe_hammerhead_1 = require("testcafe-hammerhead");
class ConfigureResponseEventOptionTransform extends base_transform_1.default {
    constructor() {
        super('ConfigureResponseEventOption');
    }
    shouldTransform(_, val) {
        return val instanceof testcafe_hammerhead_1.ConfigureResponseEventOptions;
    }
    fromSerializable(value) {
        return new testcafe_hammerhead_1.ConfigureResponseEventOptions(value._includeHeaders, value._includeBody);
    }
}
exports.default = ConfigureResponseEventOptionTransform;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlLXJlc3BvbnNlLWV2ZW50LW9wdGlvbi10cmFuc2Zvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvc2VyaWFsaXphdGlvbi9yZXBsaWNhdG9yL3RyYW5zZm9ybXMvY29uZmlndXJlLXJlc3BvbnNlLWV2ZW50LW9wdGlvbi10cmFuc2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzRUFBNkM7QUFDN0MsNkRBQW9FO0FBT3BFLE1BQXFCLHFDQUFzQyxTQUFRLHdCQUFhO0lBQzVFO1FBQ0ksS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLGVBQWUsQ0FBRSxDQUFVLEVBQUUsR0FBWTtRQUM1QyxPQUFPLEdBQUcsWUFBWSxtREFBNkIsQ0FBQztJQUN4RCxDQUFDO0lBRU0sZ0JBQWdCLENBQUUsS0FBOEM7UUFDbkUsT0FBTyxJQUFJLG1EQUE2QixDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hGLENBQUM7Q0FDSjtBQVpELHdEQVlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VUcmFuc2Zvcm0gZnJvbSAnLi9iYXNlLXRyYW5zZm9ybSc7XG5pbXBvcnQgeyBDb25maWd1cmVSZXNwb25zZUV2ZW50T3B0aW9ucyB9IGZyb20gJ3Rlc3RjYWZlLWhhbW1lcmhlYWQnO1xuXG5pbnRlcmZhY2UgU2VyaWFsaXplZENvbmZpZ3VyZVJlc3BvbnNlRXZlbnRPcHRpb25zIHtcbiAgICBfaW5jbHVkZUhlYWRlcnM6IGJvb2xlYW47XG4gICAgX2luY2x1ZGVCb2R5OiBib29sZWFuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25maWd1cmVSZXNwb25zZUV2ZW50T3B0aW9uVHJhbnNmb3JtIGV4dGVuZHMgQmFzZVRyYW5zZm9ybSB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoJ0NvbmZpZ3VyZVJlc3BvbnNlRXZlbnRPcHRpb24nKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvdWxkVHJhbnNmb3JtIChfOiB1bmtub3duLCB2YWw6IHVua25vd24pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHZhbCBpbnN0YW5jZW9mIENvbmZpZ3VyZVJlc3BvbnNlRXZlbnRPcHRpb25zO1xuICAgIH1cblxuICAgIHB1YmxpYyBmcm9tU2VyaWFsaXphYmxlICh2YWx1ZTogU2VyaWFsaXplZENvbmZpZ3VyZVJlc3BvbnNlRXZlbnRPcHRpb25zKTogQ29uZmlndXJlUmVzcG9uc2VFdmVudE9wdGlvbnMge1xuICAgICAgICByZXR1cm4gbmV3IENvbmZpZ3VyZVJlc3BvbnNlRXZlbnRPcHRpb25zKHZhbHVlLl9pbmNsdWRlSGVhZGVycywgdmFsdWUuX2luY2x1ZGVCb2R5KTtcbiAgICB9XG59XG4iXX0=