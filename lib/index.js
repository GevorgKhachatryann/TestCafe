"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_1 = require("./errors/runtime");
const types_1 = require("./errors/types");
const embedding_utils_1 = __importDefault(require("./embedding-utils"));
const exportable_lib_1 = __importDefault(require("./api/exportable-lib"));
const testcafe_configuration_1 = __importDefault(require("./configuration/testcafe-configuration"));
const option_names_1 = __importDefault(require("./configuration/option-names"));
const process_title_1 = __importDefault(require("./services/process-title"));
const user_variables_1 = __importDefault(require("./api/user-variables"));
const lazyRequire = require('import-lazy')(require);
const TestCafe = lazyRequire('./testcafe');
const endpointUtils = lazyRequire('endpoint-utils');
const setupExitHook = lazyRequire('async-exit-hook');
// Validations
async function getValidHostname(hostname) {
    if (hostname) {
        const valid = await endpointUtils.isMyHostname(hostname);
        if (!valid)
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.invalidHostname, hostname);
    }
    else
        hostname = endpointUtils.getIPAddress();
    return hostname;
}
async function getValidPort(port) {
    if (port) {
        const isFree = await endpointUtils.isFreePort(port);
        if (!isFree)
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.portIsNotFree, port);
    }
    else
        port = await endpointUtils.getFreePort();
    return port;
}
// API
async function getConfiguration(args) {
    var _a;
    let configuration;
    if (args.length === 1 && typeof args[0] === 'object') {
        configuration = new testcafe_configuration_1.default((_a = args[0]) === null || _a === void 0 ? void 0 : _a.configFile);
        await configuration.init(args[0]);
    }
    else {
        // NOTE: Positional arguments support is left only for backward compatibility.
        // It should be removed in future TestCafe versions.
        // All new APIs should be enabled trough the configuration object in the upper clause.
        // Please do not add new APIs here.
        const [hostname, port1, port2, ssl, developmentMode, retryTestPages, cache, configFile] = args;
        configuration = new testcafe_configuration_1.default(configFile);
        await configuration.init({
            hostname,
            port1,
            port2,
            ssl,
            developmentMode,
            retryTestPages,
            cache,
        });
    }
    return configuration;
}
// API
async function createTestCafe(...args) {
    process.title = process_title_1.default.main;
    const configuration = await getConfiguration(args);
    const [hostname, port1, port2] = await Promise.all([
        getValidHostname(configuration.getOption(option_names_1.default.hostname)),
        getValidPort(configuration.getOption(option_names_1.default.port1)),
        getValidPort(configuration.getOption(option_names_1.default.port2)),
    ]);
    const userVariablesOption = configuration.getOption(option_names_1.default.userVariables);
    if (userVariablesOption)
        user_variables_1.default.value = userVariablesOption;
    configuration.mergeOptions({ hostname, port1, port2 });
    const testcafe = new TestCafe(configuration);
    setupExitHook(cb => testcafe.close().then(cb));
    return testcafe;
}
// Embedding utils
createTestCafe.embeddingUtils = embedding_utils_1.default;
// Common API
Object.keys(exportable_lib_1.default).forEach(key => {
    Object.defineProperty(createTestCafe, key, { get: () => exportable_lib_1.default[key] });
});
exports.default = createTestCafe;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBZ0Q7QUFDaEQsMENBQWdEO0FBQ2hELHdFQUErQztBQUMvQywwRUFBaUQ7QUFDakQsb0dBQTJFO0FBQzNFLGdGQUF3RDtBQUN4RCw2RUFBb0Q7QUFDcEQsMEVBQWlEO0FBRWpELE1BQU0sV0FBVyxHQUFLLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN0RCxNQUFNLFFBQVEsR0FBUSxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDaEQsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDcEQsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFckQsY0FBYztBQUNkLEtBQUssVUFBVSxnQkFBZ0IsQ0FBRSxRQUFRO0lBQ3JDLElBQUksUUFBUSxFQUFFO1FBQ1YsTUFBTSxLQUFLLEdBQUcsTUFBTSxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXpELElBQUksQ0FBQyxLQUFLO1lBQ04sTUFBTSxJQUFJLHNCQUFZLENBQUMsc0JBQWMsQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDeEU7O1FBRUcsUUFBUSxHQUFHLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUU1QyxPQUFPLFFBQVEsQ0FBQztBQUNwQixDQUFDO0FBRUQsS0FBSyxVQUFVLFlBQVksQ0FBRSxJQUFJO0lBQzdCLElBQUksSUFBSSxFQUFFO1FBQ04sTUFBTSxNQUFNLEdBQUcsTUFBTSxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxNQUFNO1lBQ1AsTUFBTSxJQUFJLHNCQUFZLENBQUMsc0JBQWMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDbEU7O1FB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QUFjLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHZW5lcmFsRXJyb3IgfSBmcm9tICcuL2Vycm9ycy9ydW50aW1lJztcbmltcG9ydCB7IFJVTlRJTUVfRVJST1JTIH0gZnJvbSAnLi9lcnJvcnMvdHlwZXMnO1xuaW1wb3J0IGVtYmVkZGluZ1V0aWxzIGZyb20gJy4vZW1iZWRkaW5nLXV0aWxzJztcbmltcG9ydCBleHBvcnRhYmxlTGliIGZyb20gJy4vYXBpL2V4cG9ydGFibGUtbGliJztcbmltcG9ydCBUZXN0Q2FmZUNvbmZpZ3VyYXRpb24gZnJvbSAnLi9jb25maWd1cmF0aW9uL3Rlc3RjYWZlLWNvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IE9QVElPTl9OQU1FUyBmcm9tICcuL2NvbmZpZ3VyYXRpb24vb3B0aW9uLW5hbWVzJztcbmltcG9ydCBQcm9jZXNzVGl0bGUgZnJvbSAnLi9zZXJ2aWNlcy9wcm9jZXNzLXRpdGxlJztcbmltcG9ydCB1c2VyVmFyaWFibGVzIGZyb20gJy4vYXBpL3VzZXItdmFyaWFibGVzJztcblxuY29uc3QgbGF6eVJlcXVpcmUgICA9IHJlcXVpcmUoJ2ltcG9ydC1sYXp5JykocmVxdWlyZSk7XG5jb25zdCBUZXN0Q2FmZSAgICAgID0gbGF6eVJlcXVpcmUoJy4vdGVzdGNhZmUnKTtcbmNvbnN0IGVuZHBvaW50VXRpbHMgPSBsYXp5UmVxdWlyZSgnZW5kcG9pbnQtdXRpbHMnKTtcbmNvbnN0IHNldHVwRXhpdEhvb2sgPSBsYXp5UmVxdWlyZSgnYXN5bmMtZXhpdC1ob29rJyk7XG5cbi8vIFZhbGlkYXRpb25zXG5hc3luYyBmdW5jdGlvbiBnZXRWYWxpZEhvc3RuYW1lIChob3N0bmFtZSkge1xuICAgIGlmIChob3N0bmFtZSkge1xuICAgICAgICBjb25zdCB2YWxpZCA9IGF3YWl0IGVuZHBvaW50VXRpbHMuaXNNeUhvc3RuYW1lKGhvc3RuYW1lKTtcblxuICAgICAgICBpZiAoIXZhbGlkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEdlbmVyYWxFcnJvcihSVU5USU1FX0VSUk9SUy5pbnZhbGlkSG9zdG5hbWUsIGhvc3RuYW1lKTtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBob3N0bmFtZSA9IGVuZHBvaW50VXRpbHMuZ2V0SVBBZGRyZXNzKCk7XG5cbiAgICByZXR1cm4gaG9zdG5hbWU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFZhbGlkUG9ydCAocG9ydCkge1xuICAgIGlmIChwb3J0KSB7XG4gICAgICAgIGNvbnN0IGlzRnJlZSA9IGF3YWl0IGVuZHBvaW50VXRpbHMuaXNGcmVlUG9ydChwb3J0KTtcblxuICAgICAgICBpZiAoIWlzRnJlZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBHZW5lcmFsRXJyb3IoUlVOVElNRV9FUlJPUlMucG9ydElzTm90RnJlZSwgcG9ydCk7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgcG9ydCA9IGF3YWl0IGVuZHBvaW50VXRpbHMuZ2V0RnJlZVBvcnQoKTtcblxuICAgIHJldHVybiBwb3J0O1xufVxuXG4vLyBBUElcbmFzeW5jIGZ1bmN0aW9uIGdldENvbmZpZ3VyYXRpb24gKGFyZ3MpIHtcbiAgICBsZXQgY29uZmlndXJhdGlvbjtcblxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uZmlndXJhdGlvbiA9IG5ldyBUZXN0Q2FmZUNvbmZpZ3VyYXRpb24oYXJnc1swXT8uY29uZmlnRmlsZSk7XG5cbiAgICAgICAgYXdhaXQgY29uZmlndXJhdGlvbi5pbml0KGFyZ3NbMF0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gTk9URTogUG9zaXRpb25hbCBhcmd1bWVudHMgc3VwcG9ydCBpcyBsZWZ0IG9ubHkgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIC8vIEl0IHNob3VsZCBiZSByZW1vdmVkIGluIGZ1dHVyZSBUZXN0Q2FmZSB2ZXJzaW9ucy5cbiAgICAgICAgLy8gQWxsIG5ldyBBUElzIHNob3VsZCBiZSBlbmFibGVkIHRyb3VnaCB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgaW4gdGhlIHVwcGVyIGNsYXVzZS5cbiAgICAgICAgLy8gUGxlYXNlIGRvIG5vdCBhZGQgbmV3IEFQSXMgaGVyZS5cbiAgICAgICAgY29uc3QgW2hvc3RuYW1lLCBwb3J0MSwgcG9ydDIsIHNzbCwgZGV2ZWxvcG1lbnRNb2RlLCByZXRyeVRlc3RQYWdlcywgY2FjaGUsIGNvbmZpZ0ZpbGVdID0gYXJncztcblxuICAgICAgICBjb25maWd1cmF0aW9uID0gbmV3IFRlc3RDYWZlQ29uZmlndXJhdGlvbihjb25maWdGaWxlKTtcblxuICAgICAgICBhd2FpdCBjb25maWd1cmF0aW9uLmluaXQoe1xuICAgICAgICAgICAgaG9zdG5hbWUsXG4gICAgICAgICAgICBwb3J0MSxcbiAgICAgICAgICAgIHBvcnQyLFxuICAgICAgICAgICAgc3NsLFxuICAgICAgICAgICAgZGV2ZWxvcG1lbnRNb2RlLFxuICAgICAgICAgICAgcmV0cnlUZXN0UGFnZXMsXG4gICAgICAgICAgICBjYWNoZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmZpZ3VyYXRpb247XG59XG5cbi8vIEFQSVxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlVGVzdENhZmUgKC4uLmFyZ3MpIHtcbiAgICBwcm9jZXNzLnRpdGxlID0gUHJvY2Vzc1RpdGxlLm1haW47XG5cbiAgICBjb25zdCBjb25maWd1cmF0aW9uID0gYXdhaXQgZ2V0Q29uZmlndXJhdGlvbihhcmdzKTtcblxuICAgIGNvbnN0IFtob3N0bmFtZSwgcG9ydDEsIHBvcnQyXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgZ2V0VmFsaWRIb3N0bmFtZShjb25maWd1cmF0aW9uLmdldE9wdGlvbihPUFRJT05fTkFNRVMuaG9zdG5hbWUpKSxcbiAgICAgICAgZ2V0VmFsaWRQb3J0KGNvbmZpZ3VyYXRpb24uZ2V0T3B0aW9uKE9QVElPTl9OQU1FUy5wb3J0MSkpLFxuICAgICAgICBnZXRWYWxpZFBvcnQoY29uZmlndXJhdGlvbi5nZXRPcHRpb24oT1BUSU9OX05BTUVTLnBvcnQyKSksXG4gICAgXSk7XG5cbiAgICBjb25zdCB1c2VyVmFyaWFibGVzT3B0aW9uID0gY29uZmlndXJhdGlvbi5nZXRPcHRpb24oT1BUSU9OX05BTUVTLnVzZXJWYXJpYWJsZXMpO1xuXG4gICAgaWYgKHVzZXJWYXJpYWJsZXNPcHRpb24pXG4gICAgICAgIHVzZXJWYXJpYWJsZXMudmFsdWUgPSB1c2VyVmFyaWFibGVzT3B0aW9uO1xuXG4gICAgY29uZmlndXJhdGlvbi5tZXJnZU9wdGlvbnMoeyBob3N0bmFtZSwgcG9ydDEsIHBvcnQyIH0pO1xuXG4gICAgY29uc3QgdGVzdGNhZmUgPSBuZXcgVGVzdENhZmUoY29uZmlndXJhdGlvbik7XG5cbiAgICBzZXR1cEV4aXRIb29rKGNiID0+IHRlc3RjYWZlLmNsb3NlKCkudGhlbihjYikpO1xuXG4gICAgcmV0dXJuIHRlc3RjYWZlO1xufVxuXG4vLyBFbWJlZGRpbmcgdXRpbHNcbmNyZWF0ZVRlc3RDYWZlLmVtYmVkZGluZ1V0aWxzID0gZW1iZWRkaW5nVXRpbHM7XG5cbi8vIENvbW1vbiBBUElcbk9iamVjdC5rZXlzKGV4cG9ydGFibGVMaWIpLmZvckVhY2goa2V5ID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRlVGVzdENhZmUsIGtleSwgeyBnZXQ6ICgpID0+IGV4cG9ydGFibGVMaWJba2V5XSB9KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVUZXN0Q2FmZTtcbiJdfQ==