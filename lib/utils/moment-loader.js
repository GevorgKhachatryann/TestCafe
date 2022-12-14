"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_duration_format_commonjs_1 = __importDefault(require("moment-duration-format-commonjs"));
const MOMENT_MODULE_NAME = 'moment';
function loadMomentModule() {
    const momentModulePath = require.resolve(MOMENT_MODULE_NAME);
    const savedMomentModule = require.cache[momentModulePath];
    delete require.cache[savedMomentModule];
    const moment = require(momentModulePath);
    (0, moment_duration_format_commonjs_1.default)(moment);
    if (savedMomentModule)
        require.cache[momentModulePath] = savedMomentModule;
    else
        delete require.cache[momentModulePath];
    return moment;
}
exports.default = loadMomentModule();
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWxvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9tb21lbnQtbG9hZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0dBQXdFO0FBR3hFLE1BQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDO0FBRXBDLFNBQVMsZ0JBQWdCO0lBQ3JCLE1BQU0sZ0JBQWdCLEdBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlELE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRTFELE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRXhDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRXpDLElBQUEseUNBQXlCLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFFbEMsSUFBSSxpQkFBaUI7UUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLGlCQUFpQixDQUFDOztRQUVwRCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUUzQyxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQsa0JBQWUsZ0JBQWdCLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb21lbnREdXJhdGlvbkZvcm1hdFNldHVwIGZyb20gJ21vbWVudC1kdXJhdGlvbi1mb3JtYXQtY29tbW9uanMnO1xuXG5cbmNvbnN0IE1PTUVOVF9NT0RVTEVfTkFNRSA9ICdtb21lbnQnO1xuXG5mdW5jdGlvbiBsb2FkTW9tZW50TW9kdWxlICgpIHtcbiAgICBjb25zdCBtb21lbnRNb2R1bGVQYXRoICA9IHJlcXVpcmUucmVzb2x2ZShNT01FTlRfTU9EVUxFX05BTUUpO1xuICAgIGNvbnN0IHNhdmVkTW9tZW50TW9kdWxlID0gcmVxdWlyZS5jYWNoZVttb21lbnRNb2R1bGVQYXRoXTtcblxuICAgIGRlbGV0ZSByZXF1aXJlLmNhY2hlW3NhdmVkTW9tZW50TW9kdWxlXTtcblxuICAgIGNvbnN0IG1vbWVudCA9IHJlcXVpcmUobW9tZW50TW9kdWxlUGF0aCk7XG5cbiAgICBtb21lbnREdXJhdGlvbkZvcm1hdFNldHVwKG1vbWVudCk7XG5cbiAgICBpZiAoc2F2ZWRNb21lbnRNb2R1bGUpXG4gICAgICAgIHJlcXVpcmUuY2FjaGVbbW9tZW50TW9kdWxlUGF0aF0gPSBzYXZlZE1vbWVudE1vZHVsZTtcbiAgICBlbHNlXG4gICAgICAgIGRlbGV0ZSByZXF1aXJlLmNhY2hlW21vbWVudE1vZHVsZVBhdGhdO1xuXG4gICAgcmV0dXJuIG1vbWVudDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbG9hZE1vbWVudE1vZHVsZSgpO1xuIl19