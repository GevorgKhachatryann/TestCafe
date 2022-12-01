"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestPipelineOtherRequestLogger = exports.requestPipelineServiceRequestLogger = exports.requestPipelineInternalRequestLogger = exports.requestPipelineMockLogger = exports.requestHooksEventProviderLogger = exports.chromeBrowserProviderLogger = exports.resourceInjectorLogger = exports.requestPipelineLogger = exports.proxylessLogger = void 0;
const debug_1 = __importDefault(require("debug"));
const testcafeLogger = (0, debug_1.default)('testcafe');
const proxylessLogger = testcafeLogger.extend('proxyless');
exports.proxylessLogger = proxylessLogger;
const requestPipelineLogger = proxylessLogger.extend('request-pipeline');
exports.requestPipelineLogger = requestPipelineLogger;
const requestPipelineMockLogger = requestPipelineLogger.extend('mock');
exports.requestPipelineMockLogger = requestPipelineMockLogger;
const requestPipelineInternalRequestLogger = requestPipelineLogger.extend('internal-request');
exports.requestPipelineInternalRequestLogger = requestPipelineInternalRequestLogger;
const requestPipelineServiceRequestLogger = requestPipelineLogger.extend('service-request');
exports.requestPipelineServiceRequestLogger = requestPipelineServiceRequestLogger;
const requestPipelineOtherRequestLogger = requestPipelineLogger.extend('other-request');
exports.requestPipelineOtherRequestLogger = requestPipelineOtherRequestLogger;
const resourceInjectorLogger = proxylessLogger.extend('resource-injector');
exports.resourceInjectorLogger = resourceInjectorLogger;
const requestHooksLogger = proxylessLogger.extend('request-hooks');
const requestHooksEventProviderLogger = requestHooksLogger.extend('event-provider');
exports.requestHooksEventProviderLogger = requestHooksEventProviderLogger;
const browserLogger = testcafeLogger.extend('browser');
const browserProviderLogger = browserLogger.extend('provider');
const chromeBrowserProviderLogger = browserProviderLogger.extend('chrome');
exports.chromeBrowserProviderLogger = chromeBrowserProviderLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctbG9nZ2Vycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kZWJ1Zy1sb2dnZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUEwQjtBQUUxQixNQUFNLGNBQWMsR0FBRyxJQUFBLGVBQUssRUFBQyxVQUFVLENBQUMsQ0FBQztBQUV6QyxNQUFNLGVBQWUsR0FBd0IsY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQWU1RSwwQ0FBZTtBQWRuQixNQUFNLHFCQUFxQixHQUFrQixlQUFlLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFlcEYsc0RBQXFCO0FBZHpCLE1BQU0seUJBQXlCLEdBQWMscUJBQXFCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBa0I5RSw4REFBeUI7QUFqQjdCLE1BQU0sb0NBQW9DLEdBQUcscUJBQXFCLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFrQjFGLG9GQUFvQztBQWpCeEMsTUFBTSxtQ0FBbUMsR0FBSSxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQWtCekYsa0ZBQW1DO0FBakJ2QyxNQUFNLGlDQUFpQyxHQUFNLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQWtCdkYsOEVBQWlDO0FBakJyQyxNQUFNLHNCQUFzQixHQUFpQixlQUFlLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFXckYsd0RBQXNCO0FBVjFCLE1BQU0sa0JBQWtCLEdBQXFCLGVBQWUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDckYsTUFBTSwrQkFBK0IsR0FBUSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQVdyRiwwRUFBK0I7QUFUbkMsTUFBTSxhQUFhLEdBQWlCLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDckUsTUFBTSxxQkFBcUIsR0FBUyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3JFLE1BQU0sMkJBQTJCLEdBQUcscUJBQXFCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBTXZFLGtFQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5cbmNvbnN0IHRlc3RjYWZlTG9nZ2VyID0gZGVidWcoJ3Rlc3RjYWZlJyk7XG5cbmNvbnN0IHByb3h5bGVzc0xvZ2dlciAgICAgICAgICAgICAgICAgICAgICA9IHRlc3RjYWZlTG9nZ2VyLmV4dGVuZCgncHJveHlsZXNzJyk7XG5jb25zdCByZXF1ZXN0UGlwZWxpbmVMb2dnZXIgICAgICAgICAgICAgICAgPSBwcm94eWxlc3NMb2dnZXIuZXh0ZW5kKCdyZXF1ZXN0LXBpcGVsaW5lJyk7XG5jb25zdCByZXF1ZXN0UGlwZWxpbmVNb2NrTG9nZ2VyICAgICAgICAgICAgPSByZXF1ZXN0UGlwZWxpbmVMb2dnZXIuZXh0ZW5kKCdtb2NrJyk7XG5jb25zdCByZXF1ZXN0UGlwZWxpbmVJbnRlcm5hbFJlcXVlc3RMb2dnZXIgPSByZXF1ZXN0UGlwZWxpbmVMb2dnZXIuZXh0ZW5kKCdpbnRlcm5hbC1yZXF1ZXN0Jyk7XG5jb25zdCByZXF1ZXN0UGlwZWxpbmVTZXJ2aWNlUmVxdWVzdExvZ2dlciAgPSByZXF1ZXN0UGlwZWxpbmVMb2dnZXIuZXh0ZW5kKCdzZXJ2aWNlLXJlcXVlc3QnKTtcbmNvbnN0IHJlcXVlc3RQaXBlbGluZU90aGVyUmVxdWVzdExvZ2dlciAgICA9IHJlcXVlc3RQaXBlbGluZUxvZ2dlci5leHRlbmQoJ290aGVyLXJlcXVlc3QnKTtcbmNvbnN0IHJlc291cmNlSW5qZWN0b3JMb2dnZXIgICAgICAgICAgICAgICA9IHByb3h5bGVzc0xvZ2dlci5leHRlbmQoJ3Jlc291cmNlLWluamVjdG9yJyk7XG5jb25zdCByZXF1ZXN0SG9va3NMb2dnZXIgICAgICAgICAgICAgICAgICAgPSBwcm94eWxlc3NMb2dnZXIuZXh0ZW5kKCdyZXF1ZXN0LWhvb2tzJyk7XG5jb25zdCByZXF1ZXN0SG9va3NFdmVudFByb3ZpZGVyTG9nZ2VyICAgICAgPSByZXF1ZXN0SG9va3NMb2dnZXIuZXh0ZW5kKCdldmVudC1wcm92aWRlcicpO1xuXG5jb25zdCBicm93c2VyTG9nZ2VyICAgICAgICAgICAgICAgPSB0ZXN0Y2FmZUxvZ2dlci5leHRlbmQoJ2Jyb3dzZXInKTtcbmNvbnN0IGJyb3dzZXJQcm92aWRlckxvZ2dlciAgICAgICA9IGJyb3dzZXJMb2dnZXIuZXh0ZW5kKCdwcm92aWRlcicpO1xuY29uc3QgY2hyb21lQnJvd3NlclByb3ZpZGVyTG9nZ2VyID0gYnJvd3NlclByb3ZpZGVyTG9nZ2VyLmV4dGVuZCgnY2hyb21lJyk7XG5cbmV4cG9ydCB7XG4gICAgcHJveHlsZXNzTG9nZ2VyLFxuICAgIHJlcXVlc3RQaXBlbGluZUxvZ2dlcixcbiAgICByZXNvdXJjZUluamVjdG9yTG9nZ2VyLFxuICAgIGNocm9tZUJyb3dzZXJQcm92aWRlckxvZ2dlcixcbiAgICByZXF1ZXN0SG9va3NFdmVudFByb3ZpZGVyTG9nZ2VyLFxuICAgIHJlcXVlc3RQaXBlbGluZU1vY2tMb2dnZXIsXG4gICAgcmVxdWVzdFBpcGVsaW5lSW50ZXJuYWxSZXF1ZXN0TG9nZ2VyLFxuICAgIHJlcXVlc3RQaXBlbGluZVNlcnZpY2VSZXF1ZXN0TG9nZ2VyLFxuICAgIHJlcXVlc3RQaXBlbGluZU90aGVyUmVxdWVzdExvZ2dlcixcbn07XG4iXX0=