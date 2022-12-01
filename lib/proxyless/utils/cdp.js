"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequestPausedEventForResponse = exports.isRequest = exports.navigateTo = exports.redirect = void 0;
const http_status_codes_1 = require("http-status-codes");
const headers_1 = require("./headers");
async function redirect(client, requestId, url) {
    await client.Fetch.fulfillRequest({
        requestId,
        responseCode: http_status_codes_1.StatusCodes.MOVED_PERMANENTLY,
        responseHeaders: [
            { name: 'location', value: url },
        ],
    });
}
exports.redirect = redirect;
async function navigateTo(client, url) {
    await client.Page.navigate({ url });
}
exports.navigateTo = navigateTo;
function isRequest(event) {
    return event.responseStatusCode === void 0;
}
exports.isRequest = isRequest;
function createRequestPausedEventForResponse(mockedResponse, requestEvent) {
    return Object.assign({}, requestEvent, {
        responseStatusCode: mockedResponse.statusCode,
        responseHeaders: (0, headers_1.convertToHeaderEntries)(mockedResponse.headers),
    });
}
exports.createRequestPausedEventForResponse = createRequestPausedEventForResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb3h5bGVzcy91dGlscy9jZHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EseURBQWdEO0FBSWhELHVDQUFtRDtBQUc1QyxLQUFLLFVBQVUsUUFBUSxDQUFFLE1BQW1CLEVBQUUsU0FBaUIsRUFBRSxHQUFXO0lBQy9FLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUM7UUFDOUIsU0FBUztRQUNULFlBQVksRUFBSywrQkFBVyxDQUFDLGlCQUFpQjtRQUM5QyxlQUFlLEVBQUU7WUFDYixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtTQUNuQztLQUNKLENBQUMsQ0FBQztBQUNQLENBQUM7QUFSRCw0QkFRQztBQUVNLEtBQUssVUFBVSxVQUFVLENBQUUsTUFBbUIsRUFBRSxHQUFXO0lBQzlELE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFGRCxnQ0FFQztBQUVELFNBQWdCLFNBQVMsQ0FBRSxLQUF5QjtJQUNoRCxPQUFPLEtBQUssQ0FBQyxrQkFBa0IsS0FBSyxLQUFLLENBQUMsQ0FBQztBQUMvQyxDQUFDO0FBRkQsOEJBRUM7QUFFRCxTQUFnQixtQ0FBbUMsQ0FBRSxjQUFtQyxFQUFFLFlBQWdDO0lBQ3RILE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFO1FBQ25DLGtCQUFrQixFQUFFLGNBQWMsQ0FBQyxVQUFVO1FBQzdDLGVBQWUsRUFBSyxJQUFBLGdDQUFzQixFQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7S0FDckUsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUxELGtGQUtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvdG9jb2xBcGkgfSBmcm9tICdjaHJvbWUtcmVtb3RlLWludGVyZmFjZSc7XG5pbXBvcnQgeyBTdGF0dXNDb2RlcyB9IGZyb20gJ2h0dHAtc3RhdHVzLWNvZGVzJztcbmltcG9ydCBQcm90b2NvbCBmcm9tICdkZXZ0b29scy1wcm90b2NvbCc7XG5pbXBvcnQgUmVxdWVzdFBhdXNlZEV2ZW50ID0gUHJvdG9jb2wuRmV0Y2guUmVxdWVzdFBhdXNlZEV2ZW50O1xuaW1wb3J0IHsgSW5jb21pbmdNZXNzYWdlTGlrZSB9IGZyb20gJ3Rlc3RjYWZlLWhhbW1lcmhlYWQnO1xuaW1wb3J0IHsgY29udmVydFRvSGVhZGVyRW50cmllcyB9IGZyb20gJy4vaGVhZGVycyc7XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZGlyZWN0IChjbGllbnQ6IFByb3RvY29sQXBpLCByZXF1ZXN0SWQ6IHN0cmluZywgdXJsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBjbGllbnQuRmV0Y2guZnVsZmlsbFJlcXVlc3Qoe1xuICAgICAgICByZXF1ZXN0SWQsXG4gICAgICAgIHJlc3BvbnNlQ29kZTogICAgU3RhdHVzQ29kZXMuTU9WRURfUEVSTUFORU5UTFksXG4gICAgICAgIHJlc3BvbnNlSGVhZGVyczogW1xuICAgICAgICAgICAgeyBuYW1lOiAnbG9jYXRpb24nLCB2YWx1ZTogdXJsIH0sXG4gICAgICAgIF0sXG4gICAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBuYXZpZ2F0ZVRvIChjbGllbnQ6IFByb3RvY29sQXBpLCB1cmw6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGNsaWVudC5QYWdlLm5hdmlnYXRlKHsgdXJsIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNSZXF1ZXN0IChldmVudDogUmVxdWVzdFBhdXNlZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGV2ZW50LnJlc3BvbnNlU3RhdHVzQ29kZSA9PT0gdm9pZCAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVxdWVzdFBhdXNlZEV2ZW50Rm9yUmVzcG9uc2UgKG1vY2tlZFJlc3BvbnNlOiBJbmNvbWluZ01lc3NhZ2VMaWtlLCByZXF1ZXN0RXZlbnQ6IFJlcXVlc3RQYXVzZWRFdmVudCk6IFJlcXVlc3RQYXVzZWRFdmVudCB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHJlcXVlc3RFdmVudCwge1xuICAgICAgICByZXNwb25zZVN0YXR1c0NvZGU6IG1vY2tlZFJlc3BvbnNlLnN0YXR1c0NvZGUsXG4gICAgICAgIHJlc3BvbnNlSGVhZGVyczogICAgY29udmVydFRvSGVhZGVyRW50cmllcyhtb2NrZWRSZXNwb25zZS5oZWFkZXJzKSxcbiAgICB9KTtcbn1cbiJdfQ==