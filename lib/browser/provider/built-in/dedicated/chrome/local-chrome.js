"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stop = exports.startOnDocker = exports.start = void 0;
const testcafe_browser_tools_1 = __importDefault(require("testcafe-browser-tools"));
const process_1 = require("../../../../../utils/process");
const browser_starter_1 = __importDefault(require("../../../utils/browser-starter"));
const build_chrome_args_1 = require("./build-chrome-args");
const chrome_remote_interface_1 = __importDefault(require("chrome-remote-interface"));
const timer_1 = __importDefault(require("../../../../../utils/timer"));
const delay_1 = __importDefault(require("../../../../../utils/delay"));
const browserStarter = new browser_starter_1.default();
const LIST_TABS_TIMEOUT = 10000;
const LIST_TABS_DELAY = 500;
async function start(pageUrl, { browserName, config, cdpPort, tempProfileDir, isContainerized }) {
    const chromeInfo = await testcafe_browser_tools_1.default.getBrowserInfo(config.path || browserName);
    const chromeOpenParameters = Object.assign({}, chromeInfo);
    chromeOpenParameters.cmd = (0, build_chrome_args_1.buildChromeArgs)({ config, cdpPort, platformArgs: chromeOpenParameters.cmd, tempProfileDir, isContainerized });
    await browserStarter.startBrowser(chromeOpenParameters, pageUrl);
}
exports.start = start;
async function tryListTabs(cdpPort) {
    try {
        return { tabs: await chrome_remote_interface_1.default.List({ port: cdpPort }) };
    }
    catch (error) {
        return { error };
    }
}
async function startOnDocker(pageUrl, { browserName, config, cdpPort, tempProfileDir, isContainerized }) {
    await start('', { browserName, config, cdpPort, tempProfileDir, isContainerized });
    let { tabs, error } = await tryListTabs(cdpPort);
    const timer = new timer_1.default(LIST_TABS_TIMEOUT);
    //NOTE: We should repeat getting 'List' after a while because we can get an error if the browser isn't ready.
    while ((error || !tabs.length) && !timer.expired) {
        await (0, delay_1.default)(LIST_TABS_DELAY);
        ({ tabs, error } = await tryListTabs(cdpPort));
    }
    if (error)
        throw error;
    const target = tabs.filter(t => t.type === 'page')[0];
    const { Target } = await (0, chrome_remote_interface_1.default)({ target, port: cdpPort });
    await Target.createTarget({ url: pageUrl });
    await chrome_remote_interface_1.default.Close({ id: target.id, port: cdpPort });
}
exports.startOnDocker = startOnDocker;
async function stop({ browserId }) {
    // NOTE: Chrome on Linux closes only after the second SIGTERM signall
    if (!await (0, process_1.killBrowserProcess)(browserId))
        await (0, process_1.killBrowserProcess)(browserId);
}
exports.stop = stop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtY2hyb21lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2Jyb3dzZXIvcHJvdmlkZXIvYnVpbHQtaW4vZGVkaWNhdGVkL2Nocm9tZS9sb2NhbC1jaHJvbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0ZBQWtEO0FBQ2xELDBEQUFrRTtBQUNsRSxxRkFBNEQ7QUFDNUQsMkRBQXNEO0FBQ3RELHNGQUFtRDtBQUNuRCx1RUFBK0M7QUFDL0MsdUVBQStDO0FBRS9DLE1BQU0sY0FBYyxHQUFHLElBQUkseUJBQWMsRUFBRSxDQUFDO0FBRTVDLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxDQUFDO0FBQ2hDLE1BQU0sZUFBZSxHQUFLLEdBQUcsQ0FBQztBQUV2QixLQUFLLFVBQVUsS0FBSyxDQUFFLE9BQU8sRUFBRSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUU7SUFDbkcsTUFBTSxVQUFVLEdBQWEsTUFBTSxnQ0FBWSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxDQUFDO0lBQzNGLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFM0Qsb0JBQW9CLENBQUMsR0FBRyxHQUFHLElBQUEsbUNBQWUsRUFBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUV6SSxNQUFNLGNBQWMsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDckUsQ0FBQztBQVBELHNCQU9DO0FBRUQsS0FBSyxVQUFVLFdBQVcsQ0FBRSxPQUFPO0lBQy9CLElBQUk7UUFDQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0saUNBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO0tBQy9EO0lBQ0QsT0FBTyxLQUFLLEVBQUU7UUFDVixPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7S0FDcEI7QUFDTCxDQUFDO0FBRU0sS0FBSyxVQUFVLGFBQWEsQ0FBRSxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFO0lBQzNHLE1BQU0sS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO0lBRW5GLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakQsTUFBTSxLQUFLLEdBQVcsSUFBSSxlQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUVuRCw2R0FBNkc7SUFDN0csT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7UUFDOUMsTUFBTSxJQUFBLGVBQUssRUFBQyxlQUFlLENBQUMsQ0FBQztRQUU3QixDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDbEQ7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLEtBQUssQ0FBQztJQUVoQixNQUFNLE1BQU0sR0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxJQUFBLGlDQUFZLEVBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFFakUsTUFBTSxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDNUMsTUFBTSxpQ0FBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQy9ELENBQUM7QUFyQkQsc0NBcUJDO0FBRU0sS0FBSyxVQUFVLElBQUksQ0FBRSxFQUFFLFNBQVMsRUFBRTtJQUNyQyxxRUFBcUU7SUFDckUsSUFBSSxDQUFDLE1BQU0sSUFBQSw0QkFBa0IsRUFBQyxTQUFTLENBQUM7UUFDcEMsTUFBTSxJQUFBLDRCQUFrQixFQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFKRCxvQkFJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBicm93c2VyVG9vbHMgZnJvbSAndGVzdGNhZmUtYnJvd3Nlci10b29scyc7XG5pbXBvcnQgeyBraWxsQnJvd3NlclByb2Nlc3MgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9wcm9jZXNzJztcbmltcG9ydCBCcm93c2VyU3RhcnRlciBmcm9tICcuLi8uLi8uLi91dGlscy9icm93c2VyLXN0YXJ0ZXInO1xuaW1wb3J0IHsgYnVpbGRDaHJvbWVBcmdzIH0gZnJvbSAnLi9idWlsZC1jaHJvbWUtYXJncyc7XG5pbXBvcnQgcmVtb3RlQ2hyb21lIGZyb20gJ2Nocm9tZS1yZW1vdGUtaW50ZXJmYWNlJztcbmltcG9ydCBUaW1lciBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy90aW1lcic7XG5pbXBvcnQgZGVsYXkgZnJvbSAnLi4vLi4vLi4vLi4vLi4vdXRpbHMvZGVsYXknO1xuXG5jb25zdCBicm93c2VyU3RhcnRlciA9IG5ldyBCcm93c2VyU3RhcnRlcigpO1xuXG5jb25zdCBMSVNUX1RBQlNfVElNRU9VVCA9IDEwMDAwO1xuY29uc3QgTElTVF9UQUJTX0RFTEFZICAgPSA1MDA7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFydCAocGFnZVVybCwgeyBicm93c2VyTmFtZSwgY29uZmlnLCBjZHBQb3J0LCB0ZW1wUHJvZmlsZURpciwgaXNDb250YWluZXJpemVkIH0pIHtcbiAgICBjb25zdCBjaHJvbWVJbmZvICAgICAgICAgICA9IGF3YWl0IGJyb3dzZXJUb29scy5nZXRCcm93c2VySW5mbyhjb25maWcucGF0aCB8fCBicm93c2VyTmFtZSk7XG4gICAgY29uc3QgY2hyb21lT3BlblBhcmFtZXRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCBjaHJvbWVJbmZvKTtcblxuICAgIGNocm9tZU9wZW5QYXJhbWV0ZXJzLmNtZCA9IGJ1aWxkQ2hyb21lQXJncyh7IGNvbmZpZywgY2RwUG9ydCwgcGxhdGZvcm1BcmdzOiBjaHJvbWVPcGVuUGFyYW1ldGVycy5jbWQsIHRlbXBQcm9maWxlRGlyLCBpc0NvbnRhaW5lcml6ZWQgfSk7XG5cbiAgICBhd2FpdCBicm93c2VyU3RhcnRlci5zdGFydEJyb3dzZXIoY2hyb21lT3BlblBhcmFtZXRlcnMsIHBhZ2VVcmwpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB0cnlMaXN0VGFicyAoY2RwUG9ydCkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB7IHRhYnM6IGF3YWl0IHJlbW90ZUNocm9tZS5MaXN0KHsgcG9ydDogY2RwUG9ydCB9KSB9O1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHsgZXJyb3IgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFydE9uRG9ja2VyIChwYWdlVXJsLCB7IGJyb3dzZXJOYW1lLCBjb25maWcsIGNkcFBvcnQsIHRlbXBQcm9maWxlRGlyLCBpc0NvbnRhaW5lcml6ZWQgfSkge1xuICAgIGF3YWl0IHN0YXJ0KCcnLCB7IGJyb3dzZXJOYW1lLCBjb25maWcsIGNkcFBvcnQsIHRlbXBQcm9maWxlRGlyLCBpc0NvbnRhaW5lcml6ZWQgfSk7XG5cbiAgICBsZXQgeyB0YWJzLCBlcnJvciB9ID0gYXdhaXQgdHJ5TGlzdFRhYnMoY2RwUG9ydCk7XG4gICAgY29uc3QgdGltZXIgICAgICAgICA9IG5ldyBUaW1lcihMSVNUX1RBQlNfVElNRU9VVCk7XG5cbiAgICAvL05PVEU6IFdlIHNob3VsZCByZXBlYXQgZ2V0dGluZyAnTGlzdCcgYWZ0ZXIgYSB3aGlsZSBiZWNhdXNlIHdlIGNhbiBnZXQgYW4gZXJyb3IgaWYgdGhlIGJyb3dzZXIgaXNuJ3QgcmVhZHkuXG4gICAgd2hpbGUgKChlcnJvciB8fCAhdGFicy5sZW5ndGgpICYmICF0aW1lci5leHBpcmVkKSB7XG4gICAgICAgIGF3YWl0IGRlbGF5KExJU1RfVEFCU19ERUxBWSk7XG5cbiAgICAgICAgKHsgdGFicywgZXJyb3IgfSA9IGF3YWl0IHRyeUxpc3RUYWJzKGNkcFBvcnQpKTtcbiAgICB9XG5cbiAgICBpZiAoZXJyb3IpXG4gICAgICAgIHRocm93IGVycm9yO1xuXG4gICAgY29uc3QgdGFyZ2V0ICAgICA9IHRhYnMuZmlsdGVyKHQgPT4gdC50eXBlID09PSAncGFnZScpWzBdO1xuICAgIGNvbnN0IHsgVGFyZ2V0IH0gPSBhd2FpdCByZW1vdGVDaHJvbWUoeyB0YXJnZXQsIHBvcnQ6IGNkcFBvcnQgfSk7XG5cbiAgICBhd2FpdCBUYXJnZXQuY3JlYXRlVGFyZ2V0KHsgdXJsOiBwYWdlVXJsIH0pO1xuICAgIGF3YWl0IHJlbW90ZUNocm9tZS5DbG9zZSh7IGlkOiB0YXJnZXQuaWQsIHBvcnQ6IGNkcFBvcnQgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdG9wICh7IGJyb3dzZXJJZCB9KSB7XG4gICAgLy8gTk9URTogQ2hyb21lIG9uIExpbnV4IGNsb3NlcyBvbmx5IGFmdGVyIHRoZSBzZWNvbmQgU0lHVEVSTSBzaWduYWxsXG4gICAgaWYgKCFhd2FpdCBraWxsQnJvd3NlclByb2Nlc3MoYnJvd3NlcklkKSlcbiAgICAgICAgYXdhaXQga2lsbEJyb3dzZXJQcm9jZXNzKGJyb3dzZXJJZCk7XG59XG4iXX0=