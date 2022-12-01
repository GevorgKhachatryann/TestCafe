"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_provider_1 = __importDefault(require("../request-hooks/event-provider"));
const resource_injector_1 = __importDefault(require("../resource-injector"));
const headers_1 = require("../utils/headers");
const cdp_1 = require("../utils/cdp");
const connection_1 = __importDefault(require("../../browser/connection"));
const error_route_1 = __importDefault(require("../error-route"));
const debug_loggers_1 = require("../../utils/debug-loggers");
const testcafe_hammerhead_1 = require("testcafe-hammerhead");
const default_setup_options_1 = __importDefault(require("../default-setup-options"));
const special_handlers_1 = __importDefault(require("./special-handlers"));
class ProxylessRequestPipeline {
    constructor(browserId, client) {
        this._client = client;
        this._specialServiceRoutes = this._getSpecialServiceRoutes(browserId);
        this.requestHookEventProvider = new event_provider_1.default(browserId);
        this._resourceInjector = new resource_injector_1.default(browserId, this._specialServiceRoutes);
        this._options = default_setup_options_1.default;
        this._stopped = false;
    }
    _getSpecialServiceRoutes(browserId) {
        const browserConnection = connection_1.default.getById(browserId);
        const proxy = browserConnection.browserConnectionGateway.proxy;
        return {
            errorPage1: proxy.resolveRelativeServiceUrl(error_route_1.default, proxy.server1Info.domain),
            errorPage2: proxy.resolveRelativeServiceUrl(error_route_1.default, proxy.server2Info.domain),
            idlePage: browserConnection.idleUrl,
            openFileProtocolUrl: browserConnection.openFileProtocolUrl,
        };
    }
    async _handleMockErrorIfNecessary(pipelineContext, event) {
        if (!pipelineContext.mock.hasError)
            return;
        await pipelineContext.handleMockError(this.requestHookEventProvider);
        (0, debug_loggers_1.requestPipelineMockLogger)('%s\n%s', event.networkId, pipelineContext.mock.error);
    }
    async _handleMockResponse(mockedResponse, pipelineContext, event) {
        const mockedResponseBodyStr = mockedResponse.getBody().toString();
        const fulfillInfo = {
            requestId: event.requestId,
            responseCode: mockedResponse.statusCode,
            responseHeaders: (0, headers_1.convertToHeaderEntries)(mockedResponse.headers),
            body: mockedResponseBodyStr,
        };
        if (pipelineContext.reqOpts.isAjax)
            await this._resourceInjector.processNonProxiedContent(fulfillInfo, this._client);
        else
            await this._resourceInjector.processHTMLPageContent(fulfillInfo, this._client);
        (0, debug_loggers_1.requestPipelineMockLogger)(`Mock request ${event.requestId}`);
    }
    _createContinueResponseRequest(event, modified) {
        const continueResponseRequest = {
            requestId: event.requestId,
        };
        if (modified) {
            continueResponseRequest.responseHeaders = event.responseHeaders;
            continueResponseRequest.responseCode = event.responseStatusCode;
        }
        return continueResponseRequest;
    }
    async _handleOtherRequests(event) {
        (0, debug_loggers_1.requestPipelineOtherRequestLogger)('%r', event);
        if ((0, cdp_1.isRequest)(event)) {
            await this.requestHookEventProvider.onRequest(event);
            const pipelineContext = this.requestHookEventProvider.getPipelineContext(event.networkId);
            if (!pipelineContext || !pipelineContext.mock)
                await this._client.Fetch.continueRequest({ requestId: event.requestId });
            else {
                const mockedResponse = await pipelineContext.getMockResponse();
                await this._handleMockErrorIfNecessary(pipelineContext, event);
                const mockedResponseEvent = (0, cdp_1.createRequestPausedEventForResponse)(mockedResponse, event);
                await this.requestHookEventProvider.onResponse(mockedResponseEvent, mockedResponse.getBody(), this._client);
                await this._handleMockResponse(mockedResponse, pipelineContext, event);
            }
        }
        else {
            const resourceInfo = await this._resourceInjector.getDocumentResourceInfo(event, this._client);
            if (!resourceInfo.success)
                return;
            const modified = await this.requestHookEventProvider.onResponse(event, resourceInfo.body, this._client);
            if (event.resourceType !== 'Document') {
                const continueResponseRequest = this._createContinueResponseRequest(event, modified);
                await this._client.Fetch.continueResponse(continueResponseRequest);
            }
            else {
                await this._resourceInjector.processHTMLPageContent({
                    requestId: event.requestId,
                    responseHeaders: event.responseHeaders,
                    responseCode: event.responseStatusCode,
                    body: resourceInfo.body.toString(),
                }, this._client);
            }
        }
    }
    _topFrameNavigation(event) {
        return event.type === 'Navigation'
            && !event.frame.parentId;
    }
    init(options) {
        this._options = options;
        this._client.Fetch.on('requestPaused', async (event) => {
            if (this._stopped)
                return;
            const specialRequestHandler = (0, special_handlers_1.default)(event, this._options, this._specialServiceRoutes);
            if (specialRequestHandler)
                await specialRequestHandler(event, this._client, this._options);
            else
                await this._handleOtherRequests(event);
        });
        this._client.Page.on('frameNavigated', async (event) => {
            (0, debug_loggers_1.requestPipelineLogger)('%f', event);
            if (!this._topFrameNavigation(event)
                || event.frame.url !== testcafe_hammerhead_1.SPECIAL_BLANK_PAGE)
                return;
            await this._resourceInjector.processAboutBlankPage(event, this._client);
        });
        this._client.Network.on('loadingFailed', async (event) => {
            (0, debug_loggers_1.requestPipelineLogger)('%l', event);
            if (event.requestId)
                this.requestHookEventProvider.cleanUp(event.requestId);
        });
    }
    stop() {
        this._stopped = true;
    }
}
exports.default = ProxylessRequestPipeline;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJveHlsZXNzL3JlcXVlc3QtcGlwZWxpbmUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFNQSxxRkFBZ0Y7QUFDaEYsNkVBQW9EO0FBQ3BELDhDQUEwRDtBQUMxRCxzQ0FBOEU7QUFDOUUsMEVBQXlEO0FBQ3pELGlFQUF5QztBQUV6Qyw2REFJbUM7QUFDbkMsNkRBQThFO0FBRzlFLHFGQUF1RTtBQUN2RSwwRUFBMEQ7QUFHMUQsTUFBcUIsd0JBQXdCO0lBUXpDLFlBQW9CLFNBQWlCLEVBQUUsTUFBbUI7UUFDdEQsSUFBSSxDQUFDLE9BQU8sR0FBb0IsTUFBTSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxxQkFBcUIsR0FBTSxJQUFJLENBQUMsd0JBQXdCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksd0JBQWlDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLGlCQUFpQixHQUFVLElBQUksMkJBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzVGLElBQUksQ0FBQyxRQUFRLEdBQW1CLCtCQUErQixDQUFDO1FBQ2hFLElBQUksQ0FBQyxRQUFRLEdBQW1CLEtBQUssQ0FBQztJQUMxQyxDQUFDO0lBRU8sd0JBQXdCLENBQUUsU0FBaUI7UUFDL0MsTUFBTSxpQkFBaUIsR0FBRyxvQkFBaUIsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFzQixDQUFDO1FBQ3BGLE1BQU0sS0FBSyxHQUFlLGlCQUFpQixDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQztRQUUzRSxPQUFPO1lBQ0gsVUFBVSxFQUFXLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxxQkFBVyxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQzNGLFVBQVUsRUFBVyxLQUFLLENBQUMs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RSxDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUUsS0FBeUIsRUFBRSxFQUFFO1lBQ3pFLElBQUEscUNBQXFCLEVBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRW5DLElBQUksS0FBSyxDQUFDLFNBQVM7Z0JBQ2YsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sSUFBSTtRQUNQLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7Q0FDSjtBQTVKRCwyQ0E0SkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm90b2NvbEFwaSB9IGZyb20gJ2Nocm9tZS1yZW1vdGUtaW50ZXJmYWNlJztcbmltcG9ydCBQcm90b2NvbCBmcm9tICdkZXZ0b29scy1wcm90b2NvbCc7XG5pbXBvcnQgUmVxdWVzdFBhdXNlZEV2ZW50ID0gUHJvdG9jb2wuRmV0Y2guUmVxdWVzdFBhdXNlZEV2ZW50O1xuaW1wb3J0IEZyYW1lTmF2aWdhdGVkRXZlbnQgPSBQcm90b2NvbC5QYWdlLkZyYW1lTmF2aWdhdGVkRXZlbnQ7XG5pbXBvcnQgTG9hZGluZ0ZhaWxlZEV2ZW50ID0gUHJvdG9jb2wuTmV0d29yay5Mb2FkaW5nRmFpbGVkRXZlbnQ7XG5pbXBvcnQgQ29udGludWVSZXNwb25zZVJlcXVlc3QgPSBQcm90b2NvbC5GZXRjaC5Db250aW51ZVJlc3BvbnNlUmVxdWVzdDtcbmltcG9ydCBQcm94eWxlc3NSZXF1ZXN0SG9va0V2ZW50UHJvdmlkZXIgZnJvbSAnLi4vcmVxdWVzdC1ob29rcy9ldmVudC1wcm92aWRlcic7XG5pbXBvcnQgUmVzb3VyY2VJbmplY3RvciBmcm9tICcuLi9yZXNvdXJjZS1pbmplY3Rvcic7XG5pbXBvcnQgeyBjb252ZXJ0VG9IZWFkZXJFbnRyaWVzIH0gZnJvbSAnLi4vdXRpbHMvaGVhZGVycyc7XG5pbXBvcnQgeyBjcmVhdGVSZXF1ZXN0UGF1c2VkRXZlbnRGb3JSZXNwb25zZSwgaXNSZXF1ZXN0IH0gZnJvbSAnLi4vdXRpbHMvY2RwJztcbmltcG9ydCBCcm93c2VyQ29ubmVjdGlvbiBmcm9tICcuLi8uLi9icm93c2VyL2Nvbm5lY3Rpb24nO1xuaW1wb3J0IEVSUk9SX1JPVVRFIGZyb20gJy4uL2Vycm9yLXJvdXRlJztcbmltcG9ydCB7IFNwZWNpYWxTZXJ2aWNlUm91dGVzIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgICByZXF1ZXN0UGlwZWxpbmVMb2dnZXIsXG4gICAgcmVxdWVzdFBpcGVsaW5lTW9ja0xvZ2dlcixcbiAgICByZXF1ZXN0UGlwZWxpbmVPdGhlclJlcXVlc3RMb2dnZXIsXG59IGZyb20gJy4uLy4uL3V0aWxzL2RlYnVnLWxvZ2dlcnMnO1xuaW1wb3J0IHsgSW5jb21pbmdNZXNzYWdlTGlrZSwgU1BFQ0lBTF9CTEFOS19QQUdFIH0gZnJvbSAndGVzdGNhZmUtaGFtbWVyaGVhZCc7XG5pbXBvcnQgUHJveHlsZXNzUGlwZWxpbmVDb250ZXh0IGZyb20gJy4uL3JlcXVlc3QtaG9va3MvcGlwZWxpbmUtY29udGV4dCc7XG5pbXBvcnQgeyBQcm94eWxlc3NTZXR1cE9wdGlvbnMgfSBmcm9tICcuLi8uLi9zaGFyZWQvdHlwZXMnO1xuaW1wb3J0IERFRkFVTFRfUFJPWFlMRVNTX1NFVFVQX09QVElPTlMgZnJvbSAnLi4vZGVmYXVsdC1zZXR1cC1vcHRpb25zJztcbmltcG9ydCBnZXRTcGVjaWFsUmVxdWVzdEhhbmRsZXIgZnJvbSAnLi9zcGVjaWFsLWhhbmRsZXJzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm94eWxlc3NSZXF1ZXN0UGlwZWxpbmUge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NsaWVudDogUHJvdG9jb2xBcGk7XG4gICAgcHVibGljIHJlYWRvbmx5IHJlcXVlc3RIb29rRXZlbnRQcm92aWRlcjogUHJveHlsZXNzUmVxdWVzdEhvb2tFdmVudFByb3ZpZGVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Jlc291cmNlSW5qZWN0b3I6IFJlc291cmNlSW5qZWN0b3I7XG4gICAgcHJpdmF0ZSBfb3B0aW9uczogUHJveHlsZXNzU2V0dXBPcHRpb25zO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX3NwZWNpYWxTZXJ2aWNlUm91dGVzOiBTcGVjaWFsU2VydmljZVJvdXRlcztcbiAgICBwcml2YXRlIF9zdG9wcGVkOiBib29sZWFuO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yIChicm93c2VySWQ6IHN0cmluZywgY2xpZW50OiBQcm90b2NvbEFwaSkge1xuICAgICAgICB0aGlzLl9jbGllbnQgICAgICAgICAgICAgICAgICA9IGNsaWVudDtcbiAgICAgICAgdGhpcy5fc3BlY2lhbFNlcnZpY2VSb3V0ZXMgICAgPSB0aGlzLl9nZXRTcGVjaWFsU2VydmljZVJvdXRlcyhicm93c2VySWQpO1xuICAgICAgICB0aGlzLnJlcXVlc3RIb29rRXZlbnRQcm92aWRlciA9IG5ldyBQcm94eWxlc3NSZXF1ZXN0SG9va0V2ZW50UHJvdmlkZXIoYnJvd3NlcklkKTtcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VJbmplY3RvciAgICAgICAgPSBuZXcgUmVzb3VyY2VJbmplY3Rvcihicm93c2VySWQsIHRoaXMuX3NwZWNpYWxTZXJ2aWNlUm91dGVzKTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyAgICAgICAgICAgICAgICAgPSBERUZBVUxUX1BST1hZTEVTU19TRVRVUF9PUFRJT05TO1xuICAgICAgICB0aGlzLl9zdG9wcGVkICAgICAgICAgICAgICAgICA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFNwZWNpYWxTZXJ2aWNlUm91dGVzIChicm93c2VySWQ6IHN0cmluZyk6IFNwZWNpYWxTZXJ2aWNlUm91dGVzIHtcbiAgICAgICAgY29uc3QgYnJvd3NlckNvbm5lY3Rpb24gPSBCcm93c2VyQ29ubmVjdGlvbi5nZXRCeUlkKGJyb3dzZXJJZCkgYXMgQnJvd3NlckNvbm5lY3Rpb247XG4gICAgICAgIGNvbnN0IHByb3h5ICAgICAgICAgICAgID0gYnJvd3NlckNvbm5lY3Rpb24uYnJvd3NlckNvbm5lY3Rpb25HYXRld2F5LnByb3h5O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlcnJvclBhZ2UxOiAgICAgICAgICBwcm94eS5yZXNvbHZlUmVsYXRpdmVTZXJ2aWNlVXJsKEVSUk9SX1JPVVRFLCBwcm94eS5zZXJ2ZXIxSW5mby5kb21haW4pLFxuICAgICAgICAgICAgZXJyb3JQYWdlMjogICAgICAgICAgcHJveHkucmVzb2x2ZVJlbGF0aXZlU2VydmljZVVybChFUlJPUl9ST1VURSwgcHJveHkuc2VydmVyMkluZm8uZG9tYWluKSxcbiAgICAgICAgICAgIGlkbGVQYWdlOiAgICAgICAgICAgIGJyb3dzZXJDb25uZWN0aW9uLmlkbGVVcmwsXG4gICAgICAgICAgICBvcGVuRmlsZVByb3RvY29sVXJsOiBicm93c2VyQ29ubmVjdGlvbi5vcGVuRmlsZVByb3RvY29sVXJsLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgX2hhbmRsZU1vY2tFcnJvcklmTmVjZXNzYXJ5IChwaXBlbGluZUNvbnRleHQ6IFByb3h5bGVzc1BpcGVsaW5lQ29udGV4dCwgZXZlbnQ6IFJlcXVlc3RQYXVzZWRFdmVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAoIXBpcGVsaW5lQ29udGV4dC5tb2NrLmhhc0Vycm9yKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGF3YWl0IHBpcGVsaW5lQ29udGV4dC5oYW5kbGVNb2NrRXJyb3IodGhpcy5yZXF1ZXN0SG9va0V2ZW50UHJvdmlkZXIpO1xuXG4gICAgICAgIHJlcXVlc3RQaXBlbGluZU1vY2tMb2dnZXIoJyVzXFxuJXMnLCBldmVudC5uZXR3b3JrSWQsIHBpcGVsaW5lQ29udGV4dC5tb2NrLmVycm9yKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIF9oYW5kbGVNb2NrUmVzcG9uc2UgKG1vY2tlZFJlc3BvbnNlOiBJbmNvbWluZ01lc3NhZ2VMaWtlLCBwaXBlbGluZUNvbnRleHQ6IFByb3h5bGVzc1BpcGVsaW5lQ29udGV4dCwgZXZlbnQ6IFJlcXVlc3RQYXVzZWRFdmVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBtb2NrZWRSZXNwb25zZUJvZHlTdHIgPSAobW9ja2VkUmVzcG9uc2UuZ2V0Qm9keSgpIGFzIEJ1ZmZlcikudG9TdHJpbmcoKTtcblxuICAgICAgICBjb25zdCBmdWxmaWxsSW5mbyA9IHtcbiAgICAgICAgICAgIHJlcXVlc3RJZDogICAgICAgZXZlbnQucmVxdWVzdElkLFxuICAgICAgICAgICAgcmVzcG9uc2VDb2RlOiAgICBtb2NrZWRSZXNwb25zZS5zdGF0dXNDb2RlLFxuICAgICAgICAgICAgcmVzcG9uc2VIZWFkZXJzOiBjb252ZXJ0VG9IZWFkZXJFbnRyaWVzKG1vY2tlZFJlc3BvbnNlLmhlYWRlcnMpLFxuICAgICAgICAgICAgYm9keTogICAgICAgICAgICBtb2NrZWRSZXNwb25zZUJvZHlTdHIsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHBpcGVsaW5lQ29udGV4dC5yZXFPcHRzLmlzQWpheClcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3Jlc291cmNlSW5qZWN0b3IucHJvY2Vzc05vblByb3hpZWRDb250ZW50KGZ1bGZpbGxJbmZvLCB0aGlzLl9jbGllbnQpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9yZXNvdXJjZUluamVjdG9yLnByb2Nlc3NIVE1MUGFnZUNvbnRlbnQoZnVsZmlsbEluZm8sIHRoaXMuX2NsaWVudCk7XG5cbiAgICAgICAgcmVxdWVzdFBpcGVsaW5lTW9ja0xvZ2dlcihgTW9jayByZXF1ZXN0ICR7ZXZlbnQucmVxdWVzdElkfWApO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZUNvbnRpbnVlUmVzcG9uc2VSZXF1ZXN0IChldmVudDogUmVxdWVzdFBhdXNlZEV2ZW50LCBtb2RpZmllZDogYm9vbGVhbik6IENvbnRpbnVlUmVzcG9uc2VSZXF1ZXN0IHtcbiAgICAgICAgY29uc3QgY29udGludWVSZXNwb25zZVJlcXVlc3QgPSB7XG4gICAgICAgICAgICByZXF1ZXN0SWQ6IGV2ZW50LnJlcXVlc3RJZCxcbiAgICAgICAgfSBhcyBDb250aW51ZVJlc3BvbnNlUmVxdWVzdDtcblxuICAgICAgICBpZiAobW9kaWZpZWQpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlUmVzcG9uc2VSZXF1ZXN0LnJlc3BvbnNlSGVhZGVycyA9IGV2ZW50LnJlc3BvbnNlSGVhZGVycztcbiAgICAgICAgICAgIGNvbnRpbnVlUmVzcG9uc2VSZXF1ZXN0LnJlc3BvbnNlQ29kZSAgICA9IGV2ZW50LnJlc3BvbnNlU3RhdHVzQ29kZSBhcyBudW1iZXI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29udGludWVSZXNwb25zZVJlcXVlc3Q7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfaGFuZGxlT3RoZXJSZXF1ZXN0cyAoZXZlbnQ6IFJlcXVlc3RQYXVzZWRFdmVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXF1ZXN0UGlwZWxpbmVPdGhlclJlcXVlc3RMb2dnZXIoJyVyJywgZXZlbnQpO1xuXG4gICAgICAgIGlmIChpc1JlcXVlc3QoZXZlbnQpKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJlcXVlc3RIb29rRXZlbnRQcm92aWRlci5vblJlcXVlc3QoZXZlbnQpO1xuXG4gICAgICAgICAgICBjb25zdCBwaXBlbGluZUNvbnRleHQgPSB0aGlzLnJlcXVlc3RIb29rRXZlbnRQcm92aWRlci5nZXRQaXBlbGluZUNvbnRleHQoZXZlbnQubmV0d29ya0lkIGFzIHN0cmluZyk7XG5cbiAgICAgICAgICAgIGlmICghcGlwZWxpbmVDb250ZXh0IHx8ICFwaXBlbGluZUNvbnRleHQubW9jaylcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9jbGllbnQuRmV0Y2guY29udGludWVSZXF1ZXN0KHsgcmVxdWVzdElkOiBldmVudC5yZXF1ZXN0SWQgfSk7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2NrZWRSZXNwb25zZSA9IGF3YWl0IHBpcGVsaW5lQ29udGV4dC5nZXRNb2NrUmVzcG9uc2UoKTtcblxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2hhbmRsZU1vY2tFcnJvcklmTmVjZXNzYXJ5KHBpcGVsaW5lQ29udGV4dCwgZXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbW9ja2VkUmVzcG9uc2VFdmVudCA9IGNyZWF0ZVJlcXVlc3RQYXVzZWRFdmVudEZvclJlc3BvbnNlKG1vY2tlZFJlc3BvbnNlLCBldmVudCk7XG5cbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnJlcXVlc3RIb29rRXZlbnRQcm92aWRlci5vblJlc3BvbnNlKG1vY2tlZFJlc3BvbnNlRXZlbnQsIG1vY2tlZFJlc3BvbnNlLmdldEJvZHkoKSwgdGhpcy5fY2xpZW50KTtcblxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2hhbmRsZU1vY2tSZXNwb25zZShtb2NrZWRSZXNwb25zZSwgcGlwZWxpbmVDb250ZXh0LCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCByZXNvdXJjZUluZm8gPSBhd2FpdCB0aGlzLl9yZXNvdXJjZUluamVjdG9yLmdldERvY3VtZW50UmVzb3VyY2VJbmZvKGV2ZW50LCB0aGlzLl9jbGllbnQpO1xuXG4gICAgICAgICAgICBpZiAoIXJlc291cmNlSW5mby5zdWNjZXNzKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3QgbW9kaWZpZWQgPSBhd2FpdCB0aGlzLnJlcXVlc3RIb29rRXZlbnRQcm92aWRlci5vblJlc3BvbnNlKGV2ZW50LCByZXNvdXJjZUluZm8uYm9keSwgdGhpcy5fY2xpZW50KTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LnJlc291cmNlVHlwZSAhPT0gJ0RvY3VtZW50Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRpbnVlUmVzcG9uc2VSZXF1ZXN0ID0gdGhpcy5fY3JlYXRlQ29udGludWVSZXNwb25zZVJlcXVlc3QoZXZlbnQsIG1vZGlmaWVkKTtcblxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2NsaWVudC5GZXRjaC5jb250aW51ZVJlc3BvbnNlKGNvbnRpbnVlUmVzcG9uc2VSZXF1ZXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3Jlc291cmNlSW5qZWN0b3IucHJvY2Vzc0hUTUxQYWdlQ29udGVudCh7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RJZDogICAgICAgZXZlbnQucmVxdWVzdElkLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZUhlYWRlcnM6IGV2ZW50LnJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VDb2RlOiAgICBldmVudC5yZXNwb25zZVN0YXR1c0NvZGUgYXMgbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiAgICAgICAgICAgIChyZXNvdXJjZUluZm8uYm9keSBhcyBCdWZmZXIpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5fY2xpZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3RvcEZyYW1lTmF2aWdhdGlvbiAoZXZlbnQ6IEZyYW1lTmF2aWdhdGVkRXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50LnR5cGUgPT09ICdOYXZpZ2F0aW9uJ1xuICAgICAgICAgICAgJiYgIWV2ZW50LmZyYW1lLnBhcmVudElkO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0IChvcHRpb25zOiBQcm94eWxlc3NTZXR1cE9wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICAgICAgdGhpcy5fY2xpZW50LkZldGNoLm9uKCdyZXF1ZXN0UGF1c2VkJywgYXN5bmMgKGV2ZW50OiBSZXF1ZXN0UGF1c2VkRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zdG9wcGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3Qgc3BlY2lhbFJlcXVlc3RIYW5kbGVyID0gZ2V0U3BlY2lhbFJlcXVlc3RIYW5kbGVyKGV2ZW50LCB0aGlzLl9vcHRpb25zLCB0aGlzLl9zcGVjaWFsU2VydmljZVJvdXRlcyk7XG5cbiAgICAgICAgICAgIGlmIChzcGVjaWFsUmVxdWVzdEhhbmRsZXIpXG4gICAgICAgICAgICAgICAgYXdhaXQgc3BlY2lhbFJlcXVlc3RIYW5kbGVyKGV2ZW50LCB0aGlzLl9jbGllbnQsIHRoaXMuX29wdGlvbnMpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2hhbmRsZU90aGVyUmVxdWVzdHMoZXZlbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9jbGllbnQuUGFnZS5vbignZnJhbWVOYXZpZ2F0ZWQnLCBhc3luYyAoZXZlbnQ6IEZyYW1lTmF2aWdhdGVkRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHJlcXVlc3RQaXBlbGluZUxvZ2dlcignJWYnLCBldmVudCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5fdG9wRnJhbWVOYXZpZ2F0aW9uKGV2ZW50KVxuICAgICAgICAgICAgICAgIHx8IGV2ZW50LmZyYW1lLnVybCAhPT0gU1BFQ0lBTF9CTEFOS19QQUdFKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fcmVzb3VyY2VJbmplY3Rvci5wcm9jZXNzQWJvdXRCbGFua1BhZ2UoZXZlbnQsIHRoaXMuX2NsaWVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2NsaWVudC5OZXR3b3JrLm9uKCdsb2FkaW5nRmFpbGVkJywgYXN5bmMgKGV2ZW50OiBMb2FkaW5nRmFpbGVkRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHJlcXVlc3RQaXBlbGluZUxvZ2dlcignJWwnLCBldmVudCk7XG5cbiAgICAgICAgICAgIGlmIChldmVudC5yZXF1ZXN0SWQpXG4gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0SG9va0V2ZW50UHJvdmlkZXIuY2xlYW5VcChldmVudC5yZXF1ZXN0SWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RvcCAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N0b3BwZWQgPSB0cnVlO1xuICAgIH1cbn1cbiJdfQ==