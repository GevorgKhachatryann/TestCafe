"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const replicator_1 = __importDefault(require("replicator"));
const custom_error_transform_1 = __importDefault(require("./transforms/custom-error-transform"));
const browser_console_messages_transform_1 = __importDefault(require("./transforms/browser-console-messages-transform"));
const command_base_trasform_1 = __importDefault(require("./transforms/command-base-trasform"));
const request_filter_rule_transform_1 = __importDefault(require("./transforms/request-filter-rule-transform"));
const response_mock_transform_1 = __importDefault(require("./transforms/response-mock-transform"));
const request_hook_event_data_transform_1 = __importDefault(require("./transforms/request-hook-event-data-transform"));
const re_executable_promise_transform_1 = __importDefault(require("./transforms/re-executable-promise-transform"));
const role_transform_1 = __importDefault(require("./transforms/role-transform"));
const callsite_record_transform_1 = __importDefault(require("./transforms/callsite-record-transform"));
const testcafe_error_list_transform_1 = __importDefault(require("./transforms/testcafe-error-list-transform"));
const function_marker_transform_1 = __importDefault(require("./transforms/function-marker-transform"));
const promise_marker_transform_1 = __importDefault(require("./transforms/promise-marker-transform"));
const configure_response_event_option_transform_1 = __importDefault(require("./transforms/configure-response-event-option-transform"));
const url_transform_1 = __importDefault(require("./transforms/url-transform"));
const raw_command_callsite_record_transform_1 = __importDefault(require("./transforms/raw-command-callsite-record-transform"));
const DEFAULT_ERROR_TRANSFORM_TYPE = '[[Error]]';
function getDefaultErrorTransform(replicator) {
    return replicator.transforms.find(transform => {
        return transform.type === DEFAULT_ERROR_TRANSFORM_TYPE;
    });
}
function default_1() {
    // We need to move the 'CustomErrorTransform' transform before the default transform for the 'Error' class
    // to ensure the correct transformation order:
    // TestCafe's and custom errors will be transformed by CustomErrorTransform, built-in errors - by the built-in replicator's transformer.
    const replicator = new replicator_1.default();
    const defaultErrorTransform = getDefaultErrorTransform(replicator);
    const customErrorTransform = new custom_error_transform_1.default();
    return replicator
        .removeTransforms(defaultErrorTransform)
        .addTransforms([
        customErrorTransform,
        defaultErrorTransform,
        new url_transform_1.default(),
        new testcafe_error_list_transform_1.default(),
        new browser_console_messages_transform_1.default(),
        new re_executable_promise_transform_1.default(),
        new function_marker_transform_1.default(),
        new promise_marker_transform_1.default(),
        new command_base_trasform_1.default(),
        new request_filter_rule_transform_1.default(),
        new configure_response_event_option_transform_1.default(),
        new response_mock_transform_1.default(),
        new request_hook_event_data_transform_1.default(),
        new role_transform_1.default(),
        new callsite_record_transform_1.default(),
        new raw_command_callsite_record_transform_1.default(),
    ]);
}
exports.default = default_1;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJlcGxpY2F0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvc2VyaWFsaXphdGlvbi9yZXBsaWNhdG9yL2NyZWF0ZS1yZXBsaWNhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQW1EO0FBQ25ELGlHQUF1RTtBQUN2RSx5SEFBOEY7QUFDOUYsK0ZBQXNFO0FBQ3RFLCtHQUFvRjtBQUNwRixtR0FBeUU7QUFDekUsdUhBQTJGO0FBQzNGLG1IQUF3RjtBQUN4RixpRkFBd0Q7QUFDeEQsdUdBQTZFO0FBQzdFLCtHQUFvRjtBQUNwRix1R0FBNkU7QUFDN0UscUdBQTJFO0FBQzNFLHVJQUEyRztBQUMzRywrRUFBc0Q7QUFDdEQsK0hBQW1HO0FBRW5HLE1BQU0sNEJBQTRCLEdBQUcsV0FBVyxDQUFDO0FBRWpELFNBQVMsd0JBQXdCLENBQUUsVUFBc0I7SUFDckQsT0FBTyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUMxQyxPQUFPLFNBQVMsQ0FBQyxJQUFJLEtBQUssNEJBQTRCLENBQUM7SUFDM0QsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQ7SUFDSSwwR0FBMEc7SUFDMUcsOENBQThDO0lBQzlDLHdJQUF3STtJQUN4SSxNQUFNLFVBQVUsR0FBYyxJQUFJLG9CQUFVLEVBQUUsQ0FBQztJQUMvQyxNQUFNLHFCQUFxQixHQUFHLHdCQUF3QixDQUFDLFVBQVUsQ0FBYyxDQUFDO0lBQ2hGLE1BQU0sb0JBQW9CLEdBQUksSUFBSSxnQ0FBb0IsRUFBRSxDQUFDO0lBRXpELE9BQU8sVUFBVTtTQUNaLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDO1NBQ3ZDLGFBQWEsQ0FBQztRQUNYLG9CQUFvQjtRQUNwQixxQkFBcUI7UUFDckIsSUFBSSx1QkFBWSxFQUFFO1FBQ2xCLElBQUksdUNBQTBCLEVBQUU7UUFDaEMsSUFBSSw0Q0FBK0IsRUFBRTtRQUNyQyxJQUFJLHlDQUE0QixFQUFFO1FBQ2xDLElBQUksbUNBQXVCLEVBQUU7UUFDN0IsSUFBSSxrQ0FBc0IsRUFBRTtRQUM1QixJQUFJLCtCQUFvQixFQUFFO1FBQzFCLElBQUksdUNBQTBCLEVBQUU7UUFDaEMsSUFBSSxtREFBcUMsRUFBRTtRQUMzQyxJQUFJLGlDQUFxQixFQUFFO1FBQzNCLElBQUksMkNBQTZCLEVBQUU7UUFDbkMsSUFBSSx3QkFBYSxFQUFFO1FBQ25CLElBQUksbUNBQXVCLEVBQUU7UUFDN0IsSUFBSSwrQ0FBaUMsRUFBRTtLQUMxQyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBNUJELDRCQTRCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZXBsaWNhdG9yLCB7IFRyYW5zZm9ybSB9IGZyb20gJ3JlcGxpY2F0b3InO1xuaW1wb3J0IEN1c3RvbUVycm9yVHJhbnNmb3JtIGZyb20gJy4vdHJhbnNmb3Jtcy9jdXN0b20tZXJyb3ItdHJhbnNmb3JtJztcbmltcG9ydCBCcm93c2VyQ29uc29sZU1lc3NhZ2VzVHJhbnNmb3JtIGZyb20gJy4vdHJhbnNmb3Jtcy9icm93c2VyLWNvbnNvbGUtbWVzc2FnZXMtdHJhbnNmb3JtJztcbmltcG9ydCBDb21tYW5kQmFzZVRyYW5zZm9ybSBmcm9tICcuL3RyYW5zZm9ybXMvY29tbWFuZC1iYXNlLXRyYXNmb3JtJztcbmltcG9ydCBSZXF1ZXN0RmlsdGVyUnVsZVRyYW5zZm9ybSBmcm9tICcuL3RyYW5zZm9ybXMvcmVxdWVzdC1maWx0ZXItcnVsZS10cmFuc2Zvcm0nO1xuaW1wb3J0IFJlc3BvbnNlTW9ja1RyYW5zZm9ybSBmcm9tICcuL3RyYW5zZm9ybXMvcmVzcG9uc2UtbW9jay10cmFuc2Zvcm0nO1xuaW1wb3J0IFJlcXVlc3RIb29rRXZlbnREYXRhVHJhbnNmb3JtIGZyb20gJy4vdHJhbnNmb3Jtcy9yZXF1ZXN0LWhvb2stZXZlbnQtZGF0YS10cmFuc2Zvcm0nO1xuaW1wb3J0IFJlRXhlY3V0YWJsZVByb21pc2VUcmFuc2Zvcm0gZnJvbSAnLi90cmFuc2Zvcm1zL3JlLWV4ZWN1dGFibGUtcHJvbWlzZS10cmFuc2Zvcm0nO1xuaW1wb3J0IFJvbGVUcmFuc2Zvcm0gZnJvbSAnLi90cmFuc2Zvcm1zL3JvbGUtdHJhbnNmb3JtJztcbmltcG9ydCBDYWxsc2l0ZVJlY29yZFRyYW5zZm9ybSBmcm9tICcuL3RyYW5zZm9ybXMvY2FsbHNpdGUtcmVjb3JkLXRyYW5zZm9ybSc7XG5pbXBvcnQgVGVzdENhZmVFcnJvckxpc3RUcmFuc2Zvcm0gZnJvbSAnLi90cmFuc2Zvcm1zL3Rlc3RjYWZlLWVycm9yLWxpc3QtdHJhbnNmb3JtJztcbmltcG9ydCBGdW5jdGlvbk1hcmtlclRyYW5zZm9ybSBmcm9tICcuL3RyYW5zZm9ybXMvZnVuY3Rpb24tbWFya2VyLXRyYW5zZm9ybSc7XG5pbXBvcnQgUHJvbWlzZU1hcmtlclRyYW5zZm9ybSBmcm9tICcuL3RyYW5zZm9ybXMvcHJvbWlzZS1tYXJrZXItdHJhbnNmb3JtJztcbmltcG9ydCBDb25maWd1cmVSZXNwb25zZUV2ZW50T3B0aW9uVHJhbnNmb3JtIGZyb20gJy4vdHJhbnNmb3Jtcy9jb25maWd1cmUtcmVzcG9uc2UtZXZlbnQtb3B0aW9uLXRyYW5zZm9ybSc7XG5pbXBvcnQgVVJMVHJhbnNmb3JtIGZyb20gJy4vdHJhbnNmb3Jtcy91cmwtdHJhbnNmb3JtJztcbmltcG9ydCBSYXdDb21tYW5kQ2FsbHNpdGVSZWNvcmRUcmFuc2Zvcm0gZnJvbSAnLi90cmFuc2Zvcm1zL3Jhdy1jb21tYW5kLWNhbGxzaXRlLXJlY29yZC10cmFuc2Zvcm0nO1xuXG5jb25zdCBERUZBVUxUX0VSUk9SX1RSQU5TRk9STV9UWVBFID0gJ1tbRXJyb3JdXSc7XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRFcnJvclRyYW5zZm9ybSAocmVwbGljYXRvcjogUmVwbGljYXRvcik6IFRyYW5zZm9ybSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHJlcGxpY2F0b3IudHJhbnNmb3Jtcy5maW5kKHRyYW5zZm9ybSA9PiB7XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm0udHlwZSA9PT0gREVGQVVMVF9FUlJPUl9UUkFOU0ZPUk1fVFlQRTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCk6IFJlcGxpY2F0b3Ige1xuICAgIC8vIFdlIG5lZWQgdG8gbW92ZSB0aGUgJ0N1c3RvbUVycm9yVHJhbnNmb3JtJyB0cmFuc2Zvcm0gYmVmb3JlIHRoZSBkZWZhdWx0IHRyYW5zZm9ybSBmb3IgdGhlICdFcnJvcicgY2xhc3NcbiAgICAvLyB0byBlbnN1cmUgdGhlIGNvcnJlY3QgdHJhbnNmb3JtYXRpb24gb3JkZXI6XG4gICAgLy8gVGVzdENhZmUncyBhbmQgY3VzdG9tIGVycm9ycyB3aWxsIGJlIHRyYW5zZm9ybWVkIGJ5IEN1c3RvbUVycm9yVHJhbnNmb3JtLCBidWlsdC1pbiBlcnJvcnMgLSBieSB0aGUgYnVpbHQtaW4gcmVwbGljYXRvcidzIHRyYW5zZm9ybWVyLlxuICAgIGNvbnN0IHJlcGxpY2F0b3IgICAgICAgICAgICA9IG5ldyBSZXBsaWNhdG9yKCk7XG4gICAgY29uc3QgZGVmYXVsdEVycm9yVHJhbnNmb3JtID0gZ2V0RGVmYXVsdEVycm9yVHJhbnNmb3JtKHJlcGxpY2F0b3IpIGFzIFRyYW5zZm9ybTtcbiAgICBjb25zdCBjdXN0b21FcnJvclRyYW5zZm9ybSAgPSBuZXcgQ3VzdG9tRXJyb3JUcmFuc2Zvcm0oKTtcblxuICAgIHJldHVybiByZXBsaWNhdG9yXG4gICAgICAgIC5yZW1vdmVUcmFuc2Zvcm1zKGRlZmF1bHRFcnJvclRyYW5zZm9ybSlcbiAgICAgICAgLmFkZFRyYW5zZm9ybXMoW1xuICAgICAgICAgICAgY3VzdG9tRXJyb3JUcmFuc2Zvcm0sXG4gICAgICAgICAgICBkZWZhdWx0RXJyb3JUcmFuc2Zvcm0sXG4gICAgICAgICAgICBuZXcgVVJMVHJhbnNmb3JtKCksXG4gICAgICAgICAgICBuZXcgVGVzdENhZmVFcnJvckxpc3RUcmFuc2Zvcm0oKSxcbiAgICAgICAgICAgIG5ldyBCcm93c2VyQ29uc29sZU1lc3NhZ2VzVHJhbnNmb3JtKCksXG4gICAgICAgICAgICBuZXcgUmVFeGVjdXRhYmxlUHJvbWlzZVRyYW5zZm9ybSgpLFxuICAgICAgICAgICAgbmV3IEZ1bmN0aW9uTWFya2VyVHJhbnNmb3JtKCksXG4gICAgICAgICAgICBuZXcgUHJvbWlzZU1hcmtlclRyYW5zZm9ybSgpLFxuICAgICAgICAgICAgbmV3IENvbW1hbmRCYXNlVHJhbnNmb3JtKCksXG4gICAgICAgICAgICBuZXcgUmVxdWVzdEZpbHRlclJ1bGVUcmFuc2Zvcm0oKSxcbiAgICAgICAgICAgIG5ldyBDb25maWd1cmVSZXNwb25zZUV2ZW50T3B0aW9uVHJhbnNmb3JtKCksXG4gICAgICAgICAgICBuZXcgUmVzcG9uc2VNb2NrVHJhbnNmb3JtKCksXG4gICAgICAgICAgICBuZXcgUmVxdWVzdEhvb2tFdmVudERhdGFUcmFuc2Zvcm0oKSxcbiAgICAgICAgICAgIG5ldyBSb2xlVHJhbnNmb3JtKCksXG4gICAgICAgICAgICBuZXcgQ2FsbHNpdGVSZWNvcmRUcmFuc2Zvcm0oKSxcbiAgICAgICAgICAgIG5ldyBSYXdDb21tYW5kQ2FsbHNpdGVSZWNvcmRUcmFuc2Zvcm0oKSxcbiAgICAgICAgXSk7XG59XG4iXX0=