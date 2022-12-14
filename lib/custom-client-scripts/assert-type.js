"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_assertions_1 = require("../errors/runtime/type-assertions");
function default_1(scripts) {
    scripts.forEach((script) => (0, type_assertions_1.assertType)([type_assertions_1.is.string, type_assertions_1.is.clientScriptInitializer], 'clientScripts', `The client script`, script));
}
exports.default = default_1;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0LXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3VzdG9tLWNsaWVudC1zY3JpcHRzL2Fzc2VydC10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUVBQW1FO0FBR25FLG1CQUF5QixPQUEyQjtJQUNoRCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBd0IsRUFBRSxFQUFFLENBQUMsSUFBQSw0QkFBVSxFQUFDLENBQUMsb0JBQUUsQ0FBQyxNQUFNLEVBQUUsb0JBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLGVBQWUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3JKLENBQUM7QUFGRCw0QkFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFzc2VydFR5cGUsIGlzIH0gZnJvbSAnLi4vZXJyb3JzL3J1bnRpbWUvdHlwZS1hc3NlcnRpb25zJztcbmltcG9ydCBDbGllbnRTY3JpcHRJbml0IGZyb20gJy4vY2xpZW50LXNjcmlwdC1pbml0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHNjcmlwdHM6IENsaWVudFNjcmlwdEluaXRbXSk6IHZvaWQge1xuICAgIHNjcmlwdHMuZm9yRWFjaCgoc2NyaXB0OiBDbGllbnRTY3JpcHRJbml0KSA9PiBhc3NlcnRUeXBlKFtpcy5zdHJpbmcsIGlzLmNsaWVudFNjcmlwdEluaXRpYWxpemVyXSwgJ2NsaWVudFNjcmlwdHMnLCBgVGhlIGNsaWVudCBzY3JpcHRgLCBzY3JpcHQpKTtcbn1cbiJdfQ==