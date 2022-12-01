"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testcafe_hammerhead_1 = require("testcafe-hammerhead");
const create_request_options_1 = require("./create-request-options");
const process_response_data_1 = require("./process-response-data");
const http_headers_1 = __importDefault(require("../../utils/http-headers"));
const runtime_1 = require("../../errors/runtime");
const lodash_1 = require("lodash");
const types_1 = require("../../errors/types");
async function send(testRun, options, callsite) {
    const currentPageUrl = new URL(await testRun.getCurrentUrl());
    const requestOptions = await (0, create_request_options_1.createRequestOptions)(currentPageUrl, testRun, options, callsite);
    const request = new testcafe_hammerhead_1.DestinationRequest(requestOptions);
    const dataWaiter = new Promise(resolve => {
        request.on('response', (res) => resolve(res));
        request.on('error', (err) => resolve(err.message));
        request.on('fatalError', (message) => resolve(message));
    });
    const data = await dataWaiter;
    if (typeof data === 'string')
        throw new runtime_1.RequestRuntimeError(callsite, types_1.RUNTIME_ERRORS.requestRuntimeError, data.replace(/<.*?>/g, ''));
    const setCookie = data.headers[http_headers_1.default.setCookie];
    const sameOrigin = !currentPageUrl.host || (0, testcafe_hammerhead_1.sameOriginCheck)(currentPageUrl.href, requestOptions.url);
    if (setCookie && (sameOrigin || options.withCredentials))
        testRun.session.cookies.copySyncCookies((0, lodash_1.castArray)(setCookie).join(';'), currentPageUrl.href);
    const body = await (0, process_response_data_1.processResponseData)(data, options.rawResponse);
    return {
        status: data.statusCode,
        statusText: data.statusMessage,
        headers: data.headers,
        body: body,
    };
}
exports.default = send;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0LXJ1bi9yZXF1ZXN0L3NlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSw2REFBMEU7QUFHMUUscUVBQWdFO0FBQ2hFLG1FQUE4RDtBQUM5RCw0RUFBb0Q7QUFDcEQsa0RBQTJEO0FBRTNELG1DQUFtQztBQUNuQyw4Q0FBb0Q7QUFJcEQsS0FBSyxVQUFVLElBQUksQ0FBRSxPQUFnQixFQUFFLE9BQStCLEVBQUUsUUFBK0I7SUFDbkcsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUM5RCxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUEsNkNBQW9CLEVBQUMsY0FBYyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUYsTUFBTSxPQUFPLEdBQVUsSUFBSSx3Q0FBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM5RCxNQUFNLFVBQVUsR0FBTyxJQUFJLE9BQU8sQ0FBaUMsT0FBTyxDQUFDLEVBQUU7UUFDekUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUEwQixFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyRSxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQVUsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzFELE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sSUFBSSxHQUFHLE1BQU0sVUFBVSxDQUFDO0lBRTlCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUTtRQUN4QixNQUFNLElBQUksNkJBQW1CLENBQUMsUUFBUSxFQUFFLHNCQUFjLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUU1RyxNQUFNLFNBQVMsR0FBSSxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLElBQUEscUNBQWUsRUFBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVwRyxJQUFJLFNBQVMsSUFBSSxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsZUFBZSxDQUFDO1FBQ3BELE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFBLGtCQUFTLEVBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVqRyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsMkNBQW1CLEVBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUVsRSxPQUFPO1FBQ0gsTUFBTSxFQUFNLElBQUksQ0FBQyxVQUFVO1FBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYTtRQUM5QixPQUFPLEVBQUssSUFBSSxDQUFDLE9BQU87UUFDeEIsSUFBSSxFQUFRLElBQUk7S0FDbkIsQ0FBQztBQUNOLENBQUM7QUFFRCxrQkFBZSxJQUFJLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGVzdFJ1biBmcm9tICcuLi9pbmRleCc7XG5pbXBvcnQgeyBEZXN0aW5hdGlvblJlcXVlc3QsIHNhbWVPcmlnaW5DaGVjayB9IGZyb20gJ3Rlc3RjYWZlLWhhbW1lcmhlYWQnO1xuaW1wb3J0IHsgSW5jb21pbmdNZXNzYWdlIH0gZnJvbSAnaHR0cCc7XG5pbXBvcnQgeyBFeHRlcm5hbFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZU9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgY3JlYXRlUmVxdWVzdE9wdGlvbnMgfSBmcm9tICcuL2NyZWF0ZS1yZXF1ZXN0LW9wdGlvbnMnO1xuaW1wb3J0IHsgcHJvY2Vzc1Jlc3BvbnNlRGF0YSB9IGZyb20gJy4vcHJvY2Vzcy1yZXNwb25zZS1kYXRhJztcbmltcG9ydCBIVFRQX0hFQURFUlMgZnJvbSAnLi4vLi4vdXRpbHMvaHR0cC1oZWFkZXJzJztcbmltcG9ydCB7IFJlcXVlc3RSdW50aW1lRXJyb3IgfSBmcm9tICcuLi8uLi9lcnJvcnMvcnVudGltZSc7XG5pbXBvcnQgeyBDYWxsc2l0ZVJlY29yZCB9IGZyb20gJ2NhbGxzaXRlLXJlY29yZCc7XG5pbXBvcnQgeyBjYXN0QXJyYXkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgUlVOVElNRV9FUlJPUlMgfSBmcm9tICcuLi8uLi9lcnJvcnMvdHlwZXMnO1xuXG50eXBlIFN0cmljdEluY29taW5nTWVzc2FnZSA9IEluY29taW5nTWVzc2FnZSAmIHsgc3RhdHVzQ29kZTogbnVtYmVyOyBzdGF0dXNNZXNzYWdlOiBzdHJpbmcgfTtcblxuYXN5bmMgZnVuY3Rpb24gc2VuZCAodGVzdFJ1bjogVGVzdFJ1biwgb3B0aW9uczogRXh0ZXJuYWxSZXF1ZXN0T3B0aW9ucywgY2FsbHNpdGU6IENhbGxzaXRlUmVjb3JkIHwgbnVsbCk6IFByb21pc2U8UmVzcG9uc2VPcHRpb25zPiB7XG4gICAgY29uc3QgY3VycmVudFBhZ2VVcmwgPSBuZXcgVVJMKGF3YWl0IHRlc3RSdW4uZ2V0Q3VycmVudFVybCgpKTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IGF3YWl0IGNyZWF0ZVJlcXVlc3RPcHRpb25zKGN1cnJlbnRQYWdlVXJsLCB0ZXN0UnVuLCBvcHRpb25zLCBjYWxsc2l0ZSk7XG4gICAgY29uc3QgcmVxdWVzdCAgICAgICAgPSBuZXcgRGVzdGluYXRpb25SZXF1ZXN0KHJlcXVlc3RPcHRpb25zKTtcbiAgICBjb25zdCBkYXRhV2FpdGVyICAgICA9IG5ldyBQcm9taXNlPFN0cmljdEluY29taW5nTWVzc2FnZSB8IHN0cmluZz4ocmVzb2x2ZSA9PiB7XG4gICAgICAgIHJlcXVlc3Qub24oJ3Jlc3BvbnNlJywgKHJlczogU3RyaWN0SW5jb21pbmdNZXNzYWdlKSA9PiByZXNvbHZlKHJlcykpO1xuICAgICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIChlcnI6IEVycm9yKSA9PiByZXNvbHZlKGVyci5tZXNzYWdlKSk7XG4gICAgICAgIHJlcXVlc3Qub24oJ2ZhdGFsRXJyb3InLCAobWVzc2FnZTogc3RyaW5nKSA9PiByZXNvbHZlKG1lc3NhZ2UpKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkYXRhV2FpdGVyO1xuXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJylcbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RSdW50aW1lRXJyb3IoY2FsbHNpdGUsIFJVTlRJTUVfRVJST1JTLnJlcXVlc3RSdW50aW1lRXJyb3IsIGRhdGEucmVwbGFjZSgvPC4qPz4vZywgJycpKTtcblxuICAgIGNvbnN0IHNldENvb2tpZSAgPSBkYXRhLmhlYWRlcnNbSFRUUF9IRUFERVJTLnNldENvb2tpZV07XG4gICAgY29uc3Qgc2FtZU9yaWdpbiA9ICFjdXJyZW50UGFnZVVybC5ob3N0IHx8IHNhbWVPcmlnaW5DaGVjayhjdXJyZW50UGFnZVVybC5ocmVmLCByZXF1ZXN0T3B0aW9ucy51cmwpO1xuXG4gICAgaWYgKHNldENvb2tpZSAmJiAoc2FtZU9yaWdpbiB8fCBvcHRpb25zLndpdGhDcmVkZW50aWFscykgKVxuICAgICAgICB0ZXN0UnVuLnNlc3Npb24uY29va2llcy5jb3B5U3luY0Nvb2tpZXMoY2FzdEFycmF5KHNldENvb2tpZSkuam9pbignOycpLCBjdXJyZW50UGFnZVVybC5ocmVmKTtcblxuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCBwcm9jZXNzUmVzcG9uc2VEYXRhKGRhdGEsIG9wdGlvbnMucmF3UmVzcG9uc2UpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiAgICAgZGF0YS5zdGF0dXNDb2RlLFxuICAgICAgICBzdGF0dXNUZXh0OiBkYXRhLnN0YXR1c01lc3NhZ2UsXG4gICAgICAgIGhlYWRlcnM6ICAgIGRhdGEuaGVhZGVycyxcbiAgICAgICAgYm9keTogICAgICAgYm9keSxcbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzZW5kO1xuIl19