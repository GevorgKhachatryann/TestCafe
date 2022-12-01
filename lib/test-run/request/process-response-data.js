"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processResponseData = void 0;
const http_headers_1 = __importDefault(require("../../utils/http-headers"));
const content_types_1 = __importDefault(require("../../assets/content-types"));
const testcafe_hammerhead_1 = require("testcafe-hammerhead");
async function processResponseData(response, rawResponse = false) {
    if (rawResponse)
        return response;
    const data = await (0, testcafe_hammerhead_1.promisifyStream)(response);
    if (!response.headers[http_headers_1.default.contentType])
        return data;
    if (response.headers[http_headers_1.default.contentType].startsWith(content_types_1.default.textPlain) ||
        response.headers[http_headers_1.default.contentType].startsWith(content_types_1.default.textHtml))
        return data.toString('utf8');
    if (response.headers[http_headers_1.default.contentType].startsWith(content_types_1.default.json))
        return data.length ? JSON.parse(data.toString('utf8')) : '';
    return data;
}
exports.processResponseData = processResponseData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy1yZXNwb25zZS1kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3QtcnVuL3JlcXVlc3QvcHJvY2Vzcy1yZXNwb25zZS1kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLDRFQUFvRDtBQUNwRCwrRUFBdUQ7QUFDdkQsNkRBQXNEO0FBRy9DLEtBQUssVUFBVSxtQkFBbUIsQ0FBRSxRQUF5QixFQUFFLFdBQVcsR0FBRyxLQUFLO0lBQ3JGLElBQUksV0FBVztRQUNYLE9BQU8sUUFBUSxDQUFDO0lBRXBCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSxxQ0FBZSxFQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTdDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLHNCQUFZLENBQUMsV0FBVyxDQUFDO1FBQzNDLE9BQU8sSUFBSSxDQUFDO0lBRWhCLElBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQyxzQkFBWSxDQUFDLFdBQVcsQ0FBWSxDQUFDLFVBQVUsQ0FBQyx1QkFBYSxDQUFDLFNBQVMsQ0FBQztRQUN6RixRQUFRLENBQUMsT0FBTyxDQUFDLHNCQUFZLENBQUMsV0FBVyxDQUFZLENBQUMsVUFBVSxDQUFDLHVCQUFhLENBQUMsUUFBUSxDQUFDO1FBQ3pGLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVqQyxJQUFLLFFBQVEsQ0FBQyxPQUFPLENBQUMsc0JBQVksQ0FBQyxXQUFXLENBQVksQ0FBQyxVQUFVLENBQUMsdUJBQWEsQ0FBQyxJQUFJLENBQUM7UUFDckYsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBRWhFLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFqQkQsa0RBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5jb21pbmdNZXNzYWdlIH0gZnJvbSAnaHR0cCc7XG5pbXBvcnQgSFRUUF9IRUFERVJTIGZyb20gJy4uLy4uL3V0aWxzL2h0dHAtaGVhZGVycyc7XG5pbXBvcnQgQ09OVEVOVF9UWVBFUyBmcm9tICcuLi8uLi9hc3NldHMvY29udGVudC10eXBlcyc7XG5pbXBvcnQgeyBwcm9taXNpZnlTdHJlYW0gfSBmcm9tICd0ZXN0Y2FmZS1oYW1tZXJoZWFkJztcbmltcG9ydCB7IFJlc3BvbnNlQm9keSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcm9jZXNzUmVzcG9uc2VEYXRhIChyZXNwb25zZTogSW5jb21pbmdNZXNzYWdlLCByYXdSZXNwb25zZSA9IGZhbHNlKTogUHJvbWlzZTxSZXNwb25zZUJvZHk+IHtcbiAgICBpZiAocmF3UmVzcG9uc2UpXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBwcm9taXNpZnlTdHJlYW0ocmVzcG9uc2UpO1xuXG4gICAgaWYgKCFyZXNwb25zZS5oZWFkZXJzW0hUVFBfSEVBREVSUy5jb250ZW50VHlwZV0pXG4gICAgICAgIHJldHVybiBkYXRhO1xuXG4gICAgaWYgKChyZXNwb25zZS5oZWFkZXJzW0hUVFBfSEVBREVSUy5jb250ZW50VHlwZV0gYXMgc3RyaW5nKS5zdGFydHNXaXRoKENPTlRFTlRfVFlQRVMudGV4dFBsYWluKSB8fFxuICAgICAgICAocmVzcG9uc2UuaGVhZGVyc1tIVFRQX0hFQURFUlMuY29udGVudFR5cGVdIGFzIHN0cmluZykuc3RhcnRzV2l0aChDT05URU5UX1RZUEVTLnRleHRIdG1sKSlcbiAgICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoJ3V0ZjgnKTtcblxuICAgIGlmICgocmVzcG9uc2UuaGVhZGVyc1tIVFRQX0hFQURFUlMuY29udGVudFR5cGVdIGFzIHN0cmluZykuc3RhcnRzV2l0aChDT05URU5UX1RZUEVTLmpzb24pKVxuICAgICAgICByZXR1cm4gZGF0YS5sZW5ndGggPyBKU09OLnBhcnNlKGRhdGEudG9TdHJpbmcoJ3V0ZjgnKSkgOiAnJztcblxuICAgIHJldHVybiBkYXRhO1xufVxuIl19