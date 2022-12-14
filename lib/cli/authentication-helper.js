"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const log_1 = __importDefault(require("./log"));
const information_message_1 = require("../notifications/information-message");
const constants_1 = __importDefault(require("../configuration/constants"));
const timer_1 = __importDefault(require("../utils/timer"));
const get_any_key_1 = __importDefault(require("../utils/get-any-key"));
const { MAX_AUTHENTICATION_DELAY } = constants_1.default.CLI.AUTHENTICATION_HELPER;
const debugLog = (0, debug_1.default)('testcafe:cli:authentication-helper');
async function checkAuthentication(action, errorClass) {
    try {
        return { result: await action() };
    }
    catch (error) {
        if (!(error instanceof errorClass))
            throw error;
        return { error };
    }
}
async function authenticationHelper(action, errorClass, { interactive = true } = {}) {
    let { result, error } = await checkAuthentication(action, errorClass);
    const timer = new timer_1.default(MAX_AUTHENTICATION_DELAY);
    while (error && !timer.expired && interactive) {
        debugLog(error);
        log_1.default.write(information_message_1.SCREEN_RECORDING_PERMISSION_REQUEST);
        await Promise.race([timer.promise, (0, get_any_key_1.default)()]);
        ({ result, error } = await checkAuthentication(action, errorClass));
    }
    return { result, error };
}
exports.default = authenticationHelper;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24taGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaS9hdXRoZW50aWNhdGlvbi1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsZ0RBQXdCO0FBQ3hCLDhFQUEyRjtBQUMzRiwyRUFBbUQ7QUFDbkQsMkRBQW1DO0FBQ25DLHVFQUE2QztBQUc3QyxNQUFNLEVBQUUsd0JBQXdCLEVBQUUsR0FBRyxtQkFBUyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQztBQUV6RSxNQUFNLFFBQVEsR0FBRyxJQUFBLGVBQUssRUFBQyxvQ0FBb0MsQ0FBQyxDQUFDO0FBZTdELEtBQUssVUFBVSxtQkFBbUIsQ0FBdUIsTUFBaUIsRUFBRSxVQUEwQjtJQUNsRyxJQUFJO1FBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE1BQU0sRUFBRSxFQUFFLENBQUM7S0FDckM7SUFDRCxPQUFPLEtBQUssRUFBRTtRQUNWLElBQUksQ0FBQyxDQUFDLEtBQUssWUFBWSxVQUFVLENBQUM7WUFDOUIsTUFBTSxLQUFLLENBQUM7UUFFaEIsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO0tBQ3BCO0FBQ0wsQ0FBQztBQUVjLEtBQUssVUFBVSxvQkFBb0IsQ0FDOUMsTUFBaUIsRUFDakIsVUFBMEIsRUFDMUIsRUFBRSxXQUFXLEdBQUcsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUUzQixJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sbUJBQW1CLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRXRFLE1BQU0sS0FBSyxHQUFHLElBQUksZUFBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFFbEQsT0FBTyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLFdBQVcsRUFBRTtRQUMzQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFaEIsYUFBRyxDQUFDLEtBQUssQ0FBQyx5REFBbUMsQ0FBQyxDQUFDO1FBRS9DLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBQSxxQkFBUyxHQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWpELENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTSxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUN2RTtJQUVELE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDN0IsQ0FBQztBQXBCRCx1Q0FvQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgeyBTQ1JFRU5fUkVDT1JESU5HX1BFUk1JU1NJT05fUkVRVUVTVCB9IGZyb20gJy4uL25vdGlmaWNhdGlvbnMvaW5mb3JtYXRpb24tbWVzc2FnZSc7XG5pbXBvcnQgQ09OU1RBTlRTIGZyb20gJy4uL2NvbmZpZ3VyYXRpb24vY29uc3RhbnRzJztcbmltcG9ydCBUaW1lciBmcm9tICcuLi91dGlscy90aW1lcic7XG5pbXBvcnQgZ2V0QW55S2V5IGZyb20gJy4uL3V0aWxzL2dldC1hbnkta2V5JztcblxuXG5jb25zdCB7IE1BWF9BVVRIRU5USUNBVElPTl9ERUxBWSB9ID0gQ09OU1RBTlRTLkNMSS5BVVRIRU5USUNBVElPTl9IRUxQRVI7XG5cbmNvbnN0IGRlYnVnTG9nID0gZGVidWcoJ3Rlc3RjYWZlOmNsaTphdXRoZW50aWNhdGlvbi1oZWxwZXInKTtcblxuaW50ZXJmYWNlIEFjdGlvbjxUPiB7XG4gICAgKCk6IFByb21pc2U8VD47XG59XG5cbmludGVyZmFjZSBDb25zdHJ1Y3RvcjxDPiB7XG4gICAgbmV3ICgpOiBDO1xufVxuXG5pbnRlcmZhY2UgQXV0aGVudGljYXRpb25SZXN1bHQ8VCwgRSBleHRlbmRzIEVycm9yPiB7XG4gICAgcmVzdWx0PzogVDtcbiAgICBlcnJvcj86IEU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNoZWNrQXV0aGVudGljYXRpb24gPFQsIEUgZXh0ZW5kcyBFcnJvcj4gKGFjdGlvbjogQWN0aW9uPFQ+LCBlcnJvckNsYXNzOiBDb25zdHJ1Y3RvcjxFPik6IFByb21pc2U8QXV0aGVudGljYXRpb25SZXN1bHQ8VCwgRT4+IHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4geyByZXN1bHQ6IGF3YWl0IGFjdGlvbigpIH07XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoIShlcnJvciBpbnN0YW5jZW9mIGVycm9yQ2xhc3MpKVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG5cbiAgICAgICAgcmV0dXJuIHsgZXJyb3IgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGF1dGhlbnRpY2F0aW9uSGVscGVyIDxULCBFIGV4dGVuZHMgRXJyb3I+IChcbiAgICBhY3Rpb246IEFjdGlvbjxUPixcbiAgICBlcnJvckNsYXNzOiBDb25zdHJ1Y3RvcjxFPixcbiAgICB7IGludGVyYWN0aXZlID0gdHJ1ZSB9ID0ge31cbik6IFByb21pc2U8QXV0aGVudGljYXRpb25SZXN1bHQ8VCwgRT4+IHtcbiAgICBsZXQgeyByZXN1bHQsIGVycm9yIH0gPSBhd2FpdCBjaGVja0F1dGhlbnRpY2F0aW9uKGFjdGlvbiwgZXJyb3JDbGFzcyk7XG5cbiAgICBjb25zdCB0aW1lciA9IG5ldyBUaW1lcihNQVhfQVVUSEVOVElDQVRJT05fREVMQVkpO1xuXG4gICAgd2hpbGUgKGVycm9yICYmICF0aW1lci5leHBpcmVkICYmIGludGVyYWN0aXZlKSB7XG4gICAgICAgIGRlYnVnTG9nKGVycm9yKTtcblxuICAgICAgICBsb2cud3JpdGUoU0NSRUVOX1JFQ09SRElOR19QRVJNSVNTSU9OX1JFUVVFU1QpO1xuXG4gICAgICAgIGF3YWl0IFByb21pc2UucmFjZShbdGltZXIucHJvbWlzZSwgZ2V0QW55S2V5KCldKTtcblxuICAgICAgICAoeyByZXN1bHQsIGVycm9yIH0gPSBhd2FpdCBjaGVja0F1dGhlbnRpY2F0aW9uKGFjdGlvbiwgZXJyb3JDbGFzcykpO1xuICAgIH1cblxuICAgIHJldHVybiB7IHJlc3VsdCwgZXJyb3IgfTtcbn1cbiJdfQ==