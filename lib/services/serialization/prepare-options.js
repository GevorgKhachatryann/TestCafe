"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const option_names_1 = __importDefault(require("../../configuration/option-names"));
const NECESSARY_OPTIONS = [
    option_names_1.default.assertionTimeout,
    option_names_1.default.speed,
    option_names_1.default.pageLoadTimeout,
    option_names_1.default.disableMultipleWindows,
    option_names_1.default.userVariables,
];
function default_1(value) {
    const result = Object.create(null);
    NECESSARY_OPTIONS.forEach(optionName => {
        result[optionName] = value[optionName];
    });
    return result;
}
exports.default = default_1;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcGFyZS1vcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3NlcmlhbGl6YXRpb24vcHJlcGFyZS1vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esb0ZBQTJEO0FBRTNELE1BQU0saUJBQWlCLEdBQUc7SUFDdEIsc0JBQVcsQ0FBQyxnQkFBZ0I7SUFDNUIsc0JBQVcsQ0FBQyxLQUFLO0lBQ2pCLHNCQUFXLENBQUMsZUFBZTtJQUMzQixzQkFBVyxDQUFDLHNCQUFzQjtJQUNsQyxzQkFBVyxDQUFDLGFBQWE7Q0FDNUIsQ0FBQztBQUVGLG1CQUF5QixLQUE4QjtJQUNuRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRW5DLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNuQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQVJELDRCQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGljdGlvbmFyeSB9IGZyb20gJy4uLy4uL2NvbmZpZ3VyYXRpb24vaW50ZXJmYWNlcyc7XG5pbXBvcnQgT3B0aW9uTmFtZXMgZnJvbSAnLi4vLi4vY29uZmlndXJhdGlvbi9vcHRpb24tbmFtZXMnO1xuXG5jb25zdCBORUNFU1NBUllfT1BUSU9OUyA9IFtcbiAgICBPcHRpb25OYW1lcy5hc3NlcnRpb25UaW1lb3V0LFxuICAgIE9wdGlvbk5hbWVzLnNwZWVkLFxuICAgIE9wdGlvbk5hbWVzLnBhZ2VMb2FkVGltZW91dCxcbiAgICBPcHRpb25OYW1lcy5kaXNhYmxlTXVsdGlwbGVXaW5kb3dzLFxuICAgIE9wdGlvbk5hbWVzLnVzZXJWYXJpYWJsZXMsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAodmFsdWU6IERpY3Rpb25hcnk8T3B0aW9uVmFsdWU+KTogRGljdGlvbmFyeTxPcHRpb25WYWx1ZT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICBORUNFU1NBUllfT1BUSU9OUy5mb3JFYWNoKG9wdGlvbk5hbWUgPT4ge1xuICAgICAgICByZXN1bHRbb3B0aW9uTmFtZV0gPSB2YWx1ZVtvcHRpb25OYW1lXTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG59XG4iXX0=