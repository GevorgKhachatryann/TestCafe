"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testcafe_hammerhead_1 = require("testcafe-hammerhead");
const connection_1 = __importDefault(require("../browser/connection"));
const injectables_1 = require("../assets/injectables");
const empty_page_markup_1 = __importDefault(require("./empty-page-markup"));
const lodash_1 = require("lodash");
const http_status_codes_1 = require("http-status-codes");
const test_run_1 = require("../errors/test-run");
const cdp_1 = require("./utils/cdp");
const debug_loggers_1 = require("../utils/debug-loggers");
const string_1 = require("./utils/string");
const CONTENT_SECURITY_POLICY_HEADER_NAMES = [
    'content-security-policy',
    'content-security-policy-report-only',
];
class ResourceInjector {
    constructor(browserId, specialServiceRoutes) {
        this._browserId = browserId;
        this._specialServiceRoutes = specialServiceRoutes;
    }
    async _prepareInjectableResources() {
        const browserConnection = connection_1.default.getById(this._browserId);
        const proxy = browserConnection.browserConnectionGateway.proxy;
        const windowId = browserConnection.activeWindowId;
        const currentTestRun = browserConnection.getCurrentTestRun();
        if (!currentTestRun)
            return null;
        const taskScript = await currentTestRun.session.getTaskScript({
            referer: '',
            cookieUrl: '',
            isIframe: false,
            withPayload: true,
            serverInfo: proxy.server1Info,
            windowId,
        });
        const injectableResources = {
            stylesheets: [
                injectables_1.TESTCAFE_UI_STYLES,
            ],
            scripts: [
                ...testcafe_hammerhead_1.INJECTABLE_SCRIPTS.map(hs => (0, testcafe_hammerhead_1.getAssetPath)(hs, proxy.options.developmentMode)),
                ...injectables_1.SCRIPTS.map(s => (0, testcafe_hammerhead_1.getAssetPath)(s, proxy.options.developmentMode)),
            ],
            embeddedScripts: [taskScript],
        };
        injectableResources.scripts = injectableResources.scripts.map(script => proxy.resolveRelativeServiceUrl(script));
        injectableResources.stylesheets = injectableResources.stylesheets.map(style => proxy.resolveRelativeServiceUrl(style));
        return injectableResources;
    }
    _processResponseHeaders(headers) {
        if (!headers)
            return [];
        (0, lodash_1.remove)(headers, header => CONTENT_SECURITY_POLICY_HEADER_NAMES.includes(header.name.toLowerCase()));
        return (0, string_1.stringifyHeaderValues)(headers);
    }
    async _handlePageError(client, err, url) {
        const browserConnection = connection_1.default.getById(this._browserId);
        const currentTestRun = browserConnection.getCurrentTestRun();
        if (!currentTestRun)
            return;
        currentTestRun.pendingPageError = new test_run_1.PageLoadError(err, url);
        await (0, cdp_1.navigateTo)(client, this._specialServiceRoutes.errorPage1);
    }
    async getDocumentResourceInfo(event, client) {
        const { requestId, request, responseErrorReason, resourceType, } = event;
        if (resourceType !== 'Document') {
            return {
                success: true,
                body: null,
            };
        }
        try {
            if (responseErrorReason === 'NameNotResolved') {
                const err = new Error(`Failed to find a DNS-record for the resource at "${event.request.url}"`);
                await this._handlePageError(client, err, request.url);
                return {
                    success: false,
                    body: null,
                };
            }
            const responseObj = await client.Fetch.getResponseBody({ requestId });
            const responseStr = (0, string_1.getResponseAsString)(responseObj);
            return {
                success: true,
                body: Buffer.from(responseStr),
            };
        }
        catch (err) {
            (0, debug_loggers_1.resourceInjectorLogger)('Failed to process request: %s', request.url);
            await this._handlePageError(client, err, request.url);
            return {
                success: false,
                body: null,
            };
        }
    }
    async processAboutBlankPage(event, client) {
        (0, debug_loggers_1.resourceInjectorLogger)('Handle page as about:blank. Origin url: %s', event.frame.url);
        const injectableResources = await this._prepareInjectableResources();
        const html = (0, testcafe_hammerhead_1.injectResources)(empty_page_markup_1.default, injectableResources);
        await client.Page.setDocumentContent({
            frameId: event.frame.id,
            html,
        });
    }
    async processHTMLPageContent(fulfillRequestInfo, client) {
        const injectableResources = await this._prepareInjectableResources();
        // NOTE: an unhandled exception interrupts the test execution,
        // and we are force to redirect manually to the idle page.
        if (!injectableResources)
            await (0, cdp_1.redirect)(client, fulfillRequestInfo.requestId, this._specialServiceRoutes.idlePage);
        else {
            const updatedResponseStr = (0, testcafe_hammerhead_1.injectResources)(fulfillRequestInfo.body, injectableResources);
            await client.Fetch.fulfillRequest({
                requestId: fulfillRequestInfo.requestId,
                responseCode: fulfillRequestInfo.responseCode || http_status_codes_1.StatusCodes.OK,
                responseHeaders: this._processResponseHeaders(fulfillRequestInfo.responseHeaders),
                body: (0, string_1.toBase64String)(updatedResponseStr),
            });
        }
    }
    async processNonProxiedContent(fulfillRequestInfo, client) {
        await client.Fetch.fulfillRequest({
            requestId: fulfillRequestInfo.requestId,
            responseCode: fulfillRequestInfo.responseCode || http_status_codes_1.StatusCodes.OK,
            responseHeaders: this._processResponseHeaders(fulfillRequestInfo.responseHeaders),
            body: (0, string_1.toBase64String)(fulfillRequestInfo.body),
        });
    }
}
exports.default = ResourceInjector;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UtaW5qZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJveHlsZXNzL3Jlc291cmNlLWluamVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBTUEsNkRBSzZCO0FBQzdCLHVFQUFzRDtBQUN0RCx1REFBb0U7QUFDcEUsNEVBQW9EO0FBQ3BELG1DQUFnQztBQUNoQyx5REFBZ0Q7QUFDaEQsaURBQW1EO0FBQ25ELHFDQUFtRDtBQUVuRCwwREFBZ0U7QUFDaEUsMkNBSXdCO0FBR3hCLE1BQU0sb0NBQW9DLEdBQUc7SUFDekMseUJBQXlCO0lBQ3pCLHFDQUFxQztDQUN4QyxDQUFDO0FBRUYsTUFBcUIsZ0JBQWdCO0lBSWpDLFlBQW9CLFNBQWlCLEVBQUUsb0JBQTBDO1FBQzdFLElBQUksQ0FBQyxVQUFVLEdBQWMsU0FBUyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxvQkFBb0IsQ0FBQztJQUN0RCxDQUFDO0lBRU8sS0FBSyxDQUFDLDJCQUEyQjtRQUNyQyxNQUFNLGlCQUFpQixHQUFHLG9CQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFzQixDQUFDO1FBQzFGLE1BQU0sS0FBSyxHQUFlLGlCQUFpQixDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQztRQUMzRSxNQUFNLFFBQVEsR0FBWSxpQkFBaUIsQ0FBQyxjQUFjLENBQUM7UUFDM0QsTUFBTSxjQUFjLEdBQU0saUJBQWlCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUVoRSxJQUFJLENBQUMsY0FBYztZQUNmLE9BQU8sSUFBSSxDQUFDO1FBRWhCLE1BQU0sVUFBVSxHQUFHLE1BQU0sY0FBYyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDMUQsT0FBTyxFQUFNLEVBQUU7WUFDZixTQUFTLEVBQUksRUFBRTtZQUNmLFFBQVEsRUFBSyxLQUFLO1lBQ2xCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFVBQVUsRUFB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O1FBQzFELElBQUksQ0FBQyxtQkFBbUI7WUFDcEIsTUFBTSxJQUFBLGNBQVEsRUFBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN6RjtZQUNELE1BQU0sa0JBQWtCLEdBQUcsSUFBQSxxQ0FBZSxFQUFDLGtCQUFrQixDQUFDLElBQWMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1lBRW5HLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUM7Z0JBQzlCLFNBQVMsRUFBUSxrQkFBa0IsQ0FBQyxTQUFTO2dCQUM3QyxZQUFZLEVBQUssa0JBQWtCLENBQUMsWUFBWSxJQUFJLCtCQUFXLENBQUMsRUFBRTtnQkFDbEUsZUFBZSxFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUM7Z0JBQ2pGLElBQUksRUFBYSxJQUFBLHVCQUFjLEVBQUMsa0JBQWtCLENBQUM7YUFDdEQsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLHdCQUF3QixDQUFFLGtCQUF5QyxFQUFFLE1BQW1CO1FBQ2pHLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUM7WUFDOUIsU0FBUyxFQUFRLGtCQUFrQixDQUFDLFNBQVM7WUFDN0MsWUFBWSxFQUFLLGtCQUFrQixDQUFDLFlBQVksSUFBSSwrQkFBVyxDQUFDLEVBQUU7WUFDbEUsZUFBZSxFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUM7WUFDakYsSUFBSSxFQUFhLElBQUEsdUJBQWMsRUFBQyxrQkFBa0IsQ0FBQyxJQUFjLENBQUM7U0FDckUsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBdkpELG1DQXVKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3RvY29sQXBpIH0gZnJvbSAnY2hyb21lLXJlbW90ZS1pbnRlcmZhY2UnO1xuaW1wb3J0IFByb3RvY29sIGZyb20gJ2RldnRvb2xzLXByb3RvY29sJztcbmltcG9ydCBSZXF1ZXN0UGF1c2VkRXZlbnQgPSBQcm90b2NvbC5GZXRjaC5SZXF1ZXN0UGF1c2VkRXZlbnQ7XG5pbXBvcnQgRnJhbWVOYXZpZ2F0ZWRFdmVudCA9IFByb3RvY29sLlBhZ2UuRnJhbWVOYXZpZ2F0ZWRFdmVudDtcbmltcG9ydCBGdWxmaWxsUmVxdWVzdFJlcXVlc3QgPSBQcm90b2NvbC5GZXRjaC5GdWxmaWxsUmVxdWVzdFJlcXVlc3Q7XG5pbXBvcnQgSGVhZGVyRW50cnkgPSBQcm90b2NvbC5GZXRjaC5IZWFkZXJFbnRyeTtcbmltcG9ydCB7XG4gICAgaW5qZWN0UmVzb3VyY2VzLFxuICAgIFBhZ2VJbmplY3RhYmxlUmVzb3VyY2VzLFxuICAgIElOSkVDVEFCTEVfU0NSSVBUUyBhcyBIQU1NRVJIRUFEX0lOSkVDVEFCTEVfU0NSSVBUUyxcbiAgICBnZXRBc3NldFBhdGgsXG59IGZyb20gJ3Rlc3RjYWZlLWhhbW1lcmhlYWQnO1xuaW1wb3J0IEJyb3dzZXJDb25uZWN0aW9uIGZyb20gJy4uL2Jyb3dzZXIvY29ubmVjdGlvbic7XG5pbXBvcnQgeyBTQ1JJUFRTLCBURVNUQ0FGRV9VSV9TVFlMRVMgfSBmcm9tICcuLi9hc3NldHMvaW5qZWN0YWJsZXMnO1xuaW1wb3J0IEVNUFRZX1BBR0VfTUFSS1VQIGZyb20gJy4vZW1wdHktcGFnZS1tYXJrdXAnO1xuaW1wb3J0IHsgcmVtb3ZlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFN0YXR1c0NvZGVzIH0gZnJvbSAnaHR0cC1zdGF0dXMtY29kZXMnO1xuaW1wb3J0IHsgUGFnZUxvYWRFcnJvciB9IGZyb20gJy4uL2Vycm9ycy90ZXN0LXJ1bic7XG5pbXBvcnQgeyByZWRpcmVjdCwgbmF2aWdhdGVUbyB9IGZyb20gJy4vdXRpbHMvY2RwJztcbmltcG9ydCB7IERvY3VtZW50UmVzb3VyY2VJbmZvLCBTcGVjaWFsU2VydmljZVJvdXRlcyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgcmVzb3VyY2VJbmplY3RvckxvZ2dlciB9IGZyb20gJy4uL3V0aWxzL2RlYnVnLWxvZ2dlcnMnO1xuaW1wb3J0IHtcbiAgICBnZXRSZXNwb25zZUFzU3RyaW5nLFxuICAgIHN0cmluZ2lmeUhlYWRlclZhbHVlcyxcbiAgICB0b0Jhc2U2NFN0cmluZyxcbn0gZnJvbSAnLi91dGlscy9zdHJpbmcnO1xuXG5cbmNvbnN0IENPTlRFTlRfU0VDVVJJVFlfUE9MSUNZX0hFQURFUl9OQU1FUyA9IFtcbiAgICAnY29udGVudC1zZWN1cml0eS1wb2xpY3knLFxuICAgICdjb250ZW50LXNlY3VyaXR5LXBvbGljeS1yZXBvcnQtb25seScsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNvdXJjZUluamVjdG9yIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9icm93c2VySWQ6IHN0cmluZztcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zcGVjaWFsU2VydmljZVJvdXRlczogU3BlY2lhbFNlcnZpY2VSb3V0ZXM7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKGJyb3dzZXJJZDogc3RyaW5nLCBzcGVjaWFsU2VydmljZVJvdXRlczogU3BlY2lhbFNlcnZpY2VSb3V0ZXMpIHtcbiAgICAgICAgdGhpcy5fYnJvd3NlcklkICAgICAgICAgICAgPSBicm93c2VySWQ7XG4gICAgICAgIHRoaXMuX3NwZWNpYWxTZXJ2aWNlUm91dGVzID0gc3BlY2lhbFNlcnZpY2VSb3V0ZXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfcHJlcGFyZUluamVjdGFibGVSZXNvdXJjZXMgKCk6IFByb21pc2U8UGFnZUluamVjdGFibGVSZXNvdXJjZXMgfCBudWxsPiB7XG4gICAgICAgIGNvbnN0IGJyb3dzZXJDb25uZWN0aW9uID0gQnJvd3NlckNvbm5lY3Rpb24uZ2V0QnlJZCh0aGlzLl9icm93c2VySWQpIGFzIEJyb3dzZXJDb25uZWN0aW9uO1xuICAgICAgICBjb25zdCBwcm94eSAgICAgICAgICAgICA9IGJyb3dzZXJDb25uZWN0aW9uLmJyb3dzZXJDb25uZWN0aW9uR2F0ZXdheS5wcm94eTtcbiAgICAgICAgY29uc3Qgd2luZG93SWQgICAgICAgICAgPSBicm93c2VyQ29ubmVjdGlvbi5hY3RpdmVXaW5kb3dJZDtcbiAgICAgICAgY29uc3QgY3VycmVudFRlc3RSdW4gICAgPSBicm93c2VyQ29ubmVjdGlvbi5nZXRDdXJyZW50VGVzdFJ1bigpO1xuXG4gICAgICAgIGlmICghY3VycmVudFRlc3RSdW4pXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICBjb25zdCB0YXNrU2NyaXB0ID0gYXdhaXQgY3VycmVudFRlc3RSdW4uc2Vzc2lvbi5nZXRUYXNrU2NyaXB0KHtcbiAgICAgICAgICAgIHJlZmVyZXI6ICAgICAnJyxcbiAgICAgICAgICAgIGNvb2tpZVVybDogICAnJyxcbiAgICAgICAgICAgIGlzSWZyYW1lOiAgICBmYWxzZSxcbiAgICAgICAgICAgIHdpdGhQYXlsb2FkOiB0cnVlLFxuICAgICAgICAgICAgc2VydmVySW5mbzogIHByb3h5LnNlcnZlcjFJbmZvLFxuICAgICAgICAgICAgd2luZG93SWQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGluamVjdGFibGVSZXNvdXJjZXMgPSB7XG4gICAgICAgICAgICBzdHlsZXNoZWV0czogW1xuICAgICAgICAgICAgICAgIFRFU1RDQUZFX1VJX1NUWUxFUyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzY3JpcHRzOiBbXG4gICAgICAgICAgICAgICAgLi4uSEFNTUVSSEVBRF9JTkpFQ1RBQkxFX1NDUklQVFMubWFwKGhzID0+IGdldEFzc2V0UGF0aChocywgcHJveHkub3B0aW9ucy5kZXZlbG9wbWVudE1vZGUpKSxcbiAgICAgICAgICAgICAgICAuLi5TQ1JJUFRTLm1hcChzID0+IGdldEFzc2V0UGF0aChzLCBwcm94eS5vcHRpb25zLmRldmVsb3BtZW50TW9kZSkpLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGVtYmVkZGVkU2NyaXB0czogW3Rhc2tTY3JpcHRdLFxuICAgICAgICB9O1xuXG4gICAgICAgIGluamVjdGFibGVSZXNvdXJjZXMuc2NyaXB0cyAgICAgPSBpbmplY3RhYmxlUmVzb3VyY2VzLnNjcmlwdHMubWFwKHNjcmlwdCA9PiBwcm94eS5yZXNvbHZlUmVsYXRpdmVTZXJ2aWNlVXJsKHNjcmlwdCkpO1xuICAgICAgICBpbmplY3RhYmxlUmVzb3VyY2VzLnN0eWxlc2hlZXRzID0gaW5qZWN0YWJsZVJlc291cmNlcy5zdHlsZXNoZWV0cy5tYXAoc3R5bGUgPT4gcHJveHkucmVzb2x2ZVJlbGF0aXZlU2VydmljZVVybChzdHlsZSkpO1xuXG4gICAgICAgIHJldHVybiBpbmplY3RhYmxlUmVzb3VyY2VzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Byb2Nlc3NSZXNwb25zZUhlYWRlcnMgKGhlYWRlcnM6IEhlYWRlckVudHJ5W10gfCB1bmRlZmluZWQpOiBIZWFkZXJFbnRyeVtdIHtcbiAgICAgICAgaWYgKCFoZWFkZXJzKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuXG4gICAgICAgIHJlbW92ZShoZWFkZXJzLCBoZWFkZXIgPT4gQ09OVEVOVF9TRUNVUklUWV9QT0xJQ1lfSEVBREVSX05BTUVTLmluY2x1ZGVzKGhlYWRlci5uYW1lLnRvTG93ZXJDYXNlKCkpKTtcblxuICAgICAgICByZXR1cm4gc3RyaW5naWZ5SGVhZGVyVmFsdWVzKGhlYWRlcnMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgX2hhbmRsZVBhZ2VFcnJvciAoY2xpZW50OiBQcm90b2NvbEFwaSwgZXJyOiBFcnJvciwgdXJsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgYnJvd3NlckNvbm5lY3Rpb24gPSBCcm93c2VyQ29ubmVjdGlvbi5nZXRCeUlkKHRoaXMuX2Jyb3dzZXJJZCkgYXMgQnJvd3NlckNvbm5lY3Rpb247XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUZXN0UnVuICAgID0gYnJvd3NlckNvbm5lY3Rpb24uZ2V0Q3VycmVudFRlc3RSdW4oKTtcblxuICAgICAgICBpZiAoIWN1cnJlbnRUZXN0UnVuKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGN1cnJlbnRUZXN0UnVuLnBlbmRpbmdQYWdlRXJyb3IgPSBuZXcgUGFnZUxvYWRFcnJvcihlcnIsIHVybCk7XG5cbiAgICAgICAgYXdhaXQgbmF2aWdhdGVUbyhjbGllbnQsIHRoaXMuX3NwZWNpYWxTZXJ2aWNlUm91dGVzLmVycm9yUGFnZTEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBnZXREb2N1bWVudFJlc291cmNlSW5mbyAoZXZlbnQ6IFJlcXVlc3RQYXVzZWRFdmVudCwgY2xpZW50OiBQcm90b2NvbEFwaSk6IFByb21pc2U8RG9jdW1lbnRSZXNvdXJjZUluZm8+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgcmVxdWVzdElkLFxuICAgICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICAgIHJlc3BvbnNlRXJyb3JSZWFzb24sXG4gICAgICAgICAgICByZXNvdXJjZVR5cGUsXG4gICAgICAgIH0gPSBldmVudDtcblxuICAgICAgICBpZiAocmVzb3VyY2VUeXBlICE9PSAnRG9jdW1lbnQnKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgYm9keTogICAgbnVsbCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlRXJyb3JSZWFzb24gPT09ICdOYW1lTm90UmVzb2x2ZWQnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBGYWlsZWQgdG8gZmluZCBhIEROUy1yZWNvcmQgZm9yIHRoZSByZXNvdXJjZSBhdCBcIiR7ZXZlbnQucmVxdWVzdC51cmx9XCJgKTtcblxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2hhbmRsZVBhZ2VFcnJvcihjbGllbnQsIGVyciwgcmVxdWVzdC51cmwpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6ICAgIG51bGwsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VPYmogPSBhd2FpdCBjbGllbnQuRmV0Y2guZ2V0UmVzcG9uc2VCb2R5KHsgcmVxdWVzdElkIH0pO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VTdHIgPSBnZXRSZXNwb25zZUFzU3RyaW5nKHJlc3BvbnNlT2JqKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGJvZHk6ICAgIEJ1ZmZlci5mcm9tKHJlc3BvbnNlU3RyKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVzb3VyY2VJbmplY3RvckxvZ2dlcignRmFpbGVkIHRvIHByb2Nlc3MgcmVxdWVzdDogJXMnLCByZXF1ZXN0LnVybCk7XG5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX2hhbmRsZVBhZ2VFcnJvcihjbGllbnQsIGVyciBhcyBFcnJvciwgcmVxdWVzdC51cmwpO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGJvZHk6ICAgIG51bGwsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHByb2Nlc3NBYm91dEJsYW5rUGFnZSAoZXZlbnQ6IEZyYW1lTmF2aWdhdGVkRXZlbnQsIGNsaWVudDogUHJvdG9jb2xBcGkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmVzb3VyY2VJbmplY3RvckxvZ2dlcignSGFuZGxlIHBhZ2UgYXMgYWJvdXQ6YmxhbmsuIE9yaWdpbiB1cmw6ICVzJywgZXZlbnQuZnJhbWUudXJsKTtcblxuICAgICAgICBjb25zdCBpbmplY3RhYmxlUmVzb3VyY2VzID0gYXdhaXQgdGhpcy5fcHJlcGFyZUluamVjdGFibGVSZXNvdXJjZXMoKSBhcyBQYWdlSW5qZWN0YWJsZVJlc291cmNlcztcbiAgICAgICAgY29uc3QgaHRtbCAgICAgICAgICAgICAgICA9IGluamVjdFJlc291cmNlcyhFTVBUWV9QQUdFX01BUktVUCwgaW5qZWN0YWJsZVJlc291cmNlcyk7XG5cbiAgICAgICAgYXdhaXQgY2xpZW50LlBhZ2Uuc2V0RG9jdW1lbnRDb250ZW50KHtcbiAgICAgICAgICAgIGZyYW1lSWQ6IGV2ZW50LmZyYW1lLmlkLFxuICAgICAgICAgICAgaHRtbCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHByb2Nlc3NIVE1MUGFnZUNvbnRlbnQgKGZ1bGZpbGxSZXF1ZXN0SW5mbzogRnVsZmlsbFJlcXVlc3RSZXF1ZXN0LCBjbGllbnQ6IFByb3RvY29sQXBpKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGluamVjdGFibGVSZXNvdXJjZXMgPSBhd2FpdCB0aGlzLl9wcmVwYXJlSW5qZWN0YWJsZVJlc291cmNlcygpO1xuXG4gICAgICAgIC8vIE5PVEU6IGFuIHVuaGFuZGxlZCBleGNlcHRpb24gaW50ZXJydXB0cyB0aGUgdGVzdCBleGVjdXRpb24sXG4gICAgICAgIC8vIGFuZCB3ZSBhcmUgZm9yY2UgdG8gcmVkaXJlY3QgbWFudWFsbHkgdG8gdGhlIGlkbGUgcGFnZS5cbiAgICAgICAgaWYgKCFpbmplY3RhYmxlUmVzb3VyY2VzKVxuICAgICAgICAgICAgYXdhaXQgcmVkaXJlY3QoY2xpZW50LCBmdWxmaWxsUmVxdWVzdEluZm8ucmVxdWVzdElkLCB0aGlzLl9zcGVjaWFsU2VydmljZVJvdXRlcy5pZGxlUGFnZSk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlZFJlc3BvbnNlU3RyID0gaW5qZWN0UmVzb3VyY2VzKGZ1bGZpbGxSZXF1ZXN0SW5mby5ib2R5IGFzIHN0cmluZywgaW5qZWN0YWJsZVJlc291cmNlcyk7XG5cbiAgICAgICAgICAgIGF3YWl0IGNsaWVudC5GZXRjaC5mdWxmaWxsUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgcmVxdWVzdElkOiAgICAgICBmdWxmaWxsUmVxdWVzdEluZm8ucmVxdWVzdElkLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlQ29kZTogICAgZnVsZmlsbFJlcXVlc3RJbmZvLnJlc3BvbnNlQ29kZSB8fCBTdGF0dXNDb2Rlcy5PSyxcbiAgICAgICAgICAgICAgICByZXNwb25zZUhlYWRlcnM6IHRoaXMuX3Byb2Nlc3NSZXNwb25zZUhlYWRlcnMoZnVsZmlsbFJlcXVlc3RJbmZvLnJlc3BvbnNlSGVhZGVycyksXG4gICAgICAgICAgICAgICAgYm9keTogICAgICAgICAgICB0b0Jhc2U2NFN0cmluZyh1cGRhdGVkUmVzcG9uc2VTdHIpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcHJvY2Vzc05vblByb3hpZWRDb250ZW50IChmdWxmaWxsUmVxdWVzdEluZm86IEZ1bGZpbGxSZXF1ZXN0UmVxdWVzdCwgY2xpZW50OiBQcm90b2NvbEFwaSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCBjbGllbnQuRmV0Y2guZnVsZmlsbFJlcXVlc3Qoe1xuICAgICAgICAgICAgcmVxdWVzdElkOiAgICAgICBmdWxmaWxsUmVxdWVzdEluZm8ucmVxdWVzdElkLFxuICAgICAgICAgICAgcmVzcG9uc2VDb2RlOiAgICBmdWxmaWxsUmVxdWVzdEluZm8ucmVzcG9uc2VDb2RlIHx8IFN0YXR1c0NvZGVzLk9LLFxuICAgICAgICAgICAgcmVzcG9uc2VIZWFkZXJzOiB0aGlzLl9wcm9jZXNzUmVzcG9uc2VIZWFkZXJzKGZ1bGZpbGxSZXF1ZXN0SW5mby5yZXNwb25zZUhlYWRlcnMpLFxuICAgICAgICAgICAgYm9keTogICAgICAgICAgICB0b0Jhc2U2NFN0cmluZyhmdWxmaWxsUmVxdWVzdEluZm8uYm9keSBhcyBzdHJpbmcpLFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=