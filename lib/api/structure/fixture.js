"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const testing_unit_1 = __importDefault(require("./testing-unit"));
const unit_type_1 = __importDefault(require("./unit-type"));
const type_assertions_1 = require("../../errors/runtime/type-assertions");
const handle_tag_args_1 = __importDefault(require("../../utils/handle-tag-args"));
const wrap_test_function_1 = __importDefault(require("../wrap-test-function"));
const assert_type_1 = __importDefault(require("../request-hooks/assert-type"));
const assert_type_2 = __importDefault(require("../../custom-client-scripts/assert-type"));
const option_names_1 = __importDefault(require("../../configuration/option-names"));
const runtime_1 = require("../../errors/runtime");
const types_1 = require("../../errors/types");
const testcafe_hammerhead_1 = require("testcafe-hammerhead");
class Fixture extends testing_unit_1.default {
    constructor(testFile, baseUrl) {
        const pageUrl = baseUrl || testcafe_hammerhead_1.SPECIAL_BLANK_PAGE;
        super(testFile, unit_type_1.default.fixture, pageUrl, baseUrl);
        this.path = testFile.filename;
        this.beforeEachFn = null;
        this.afterEachFn = null;
        this.beforeFn = null;
        this.afterFn = null;
        this.globalBeforeFn = null;
        this.globalAfterFn = null;
        return this.apiOrigin;
    }
    _add(name, ...rest) {
        name = (0, handle_tag_args_1.default)(name, rest);
        (0, type_assertions_1.assertType)(type_assertions_1.is.string, 'apiOrigin', 'The fixture name', name);
        this.name = name;
        this.testFile.currentFixture = this;
        return this.apiOrigin;
    }
    _before$(fn) {
        (0, type_assertions_1.assertType)(type_assertions_1.is.function, 'before', 'The fixture.before hook', fn);
        this.beforeFn = fn;
        return this.apiOrigin;
    }
    _after$(fn) {
        (0, type_assertions_1.assertType)(type_assertions_1.is.function, 'after', 'The fixture.after hook', fn);
        this.afterFn = fn;
        return this.apiOrigin;
    }
    _beforeEach$(fn) {
        (0, type_assertions_1.assertType)(type_assertions_1.is.function, 'beforeEach', 'The fixture.beforeEach hook', fn);
        this.beforeEachFn = (0, wrap_test_function_1.default)(fn);
        return this.apiOrigin;
    }
    _afterEach$(fn) {
        (0, type_assertions_1.assertType)(type_assertions_1.is.function, 'afterEach', 'The fixture.afterEach hook', fn);
        this.afterEachFn = (0, wrap_test_function_1.default)(fn);
        return this.apiOrigin;
    }
    _requestHooks$(...hooks) {
        if (this.apiMethodWasCalled.requestHooks)
            throw new runtime_1.APIError(option_names_1.default.requestHooks, types_1.RUNTIME_ERRORS.multipleAPIMethodCallForbidden, option_names_1.default.requestHooks);
        hooks = (0, lodash_1.flattenDeep)(hooks);
        (0, assert_type_1.default)(hooks);
        this.requestHooks = hooks;
        this.apiMethodWasCalled.requestHooks = true;
        return this.apiOrigin;
    }
    _clientScripts$(...scripts) {
        if (this.apiMethodWasCalled.clientScripts)
            throw new runtime_1.APIError(option_names_1.default.clientScripts, types_1.RUNTIME_ERRORS.multipleAPIMethodCallForbidden, option_names_1.default.clientScripts);
        scripts = (0, lodash_1.flattenDeep)(scripts);
        (0, assert_type_2.default)(scripts);
        this.clientScripts = scripts;
        this.apiMethodWasCalled.clientScripts = true;
        return this.apiOrigin;
    }
}
exports.default = Fixture;
testing_unit_1.default.makeAPIListForChildClass(Fixture);
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml4dHVyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvc3RydWN0dXJlL2ZpeHR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtQ0FBZ0Q7QUFDaEQsa0VBQXlDO0FBQ3pDLDREQUFtQztBQUNuQywwRUFBc0U7QUFDdEUsa0ZBQXdEO0FBQ3hELCtFQUFxRDtBQUNyRCwrRUFBaUU7QUFDakUsMEZBQTZFO0FBQzdFLG9GQUE0RDtBQUM1RCxrREFBZ0Q7QUFDaEQsOENBQW9EO0FBSXBELDZEQUF5RDtBQUV6RCxNQUFxQixPQUFRLFNBQVEsc0JBQVc7SUFTNUMsWUFBb0IsUUFBa0IsRUFBRSxPQUFnQjtRQUNwRCxNQUFNLE9BQU8sR0FBRyxPQUFPLElBQUksd0NBQWtCLENBQUM7UUFFOUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxtQkFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFcEQsSUFBSSxDQUFDLElBQUksR0FBYSxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxZQUFZLEdBQUssSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQU0sSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQVMsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQVUsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUksSUFBSSxDQUFDO1FBRTNCLE9BQU8sSUFBSSxDQUFDLFNBQStCLENBQUM7SUFDaEQsQ0FBQztJQUVTLElBQUksQ0FBRSxJQUFZLEVBQUUsR0FBRyxJQUFlO1FBQzVDLElBQUksR0FBRyxJQUFBLHlCQUFhLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWpDLElBQUEsNEJBQVUsRUFBQyxvQkFBRSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFN0QsSUFBSSxDQUFDLElBQUksR0FBc0IsSUFBSSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUVwQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVPLFFBQVEsQ0FBRSxFQUFZO1FBQzFCLElBQUEsNEJBQVUsRUFBQyxvQkFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUseUJBQXlCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakUsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFFbkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFTyxPQUFPLENBQUUsRUFBWTtRQUN6QixJQUFBLDRCQUFVLEVBQUMsb0JBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRS9ELElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWxCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRU8sWUFBWSxDQUFFLEVBQVk7UUFDOUIsSUFBQSw0QkFBVSxFQUFDLG9CQUFFLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSw2QkFBNkIsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUV6RSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUEsNEJBQWdCLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFFekMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFTyxXQUFXLENBQUUsRUFBWTtRQUM3QixJQUFBLDRCQUFVLEVBQUMsb0JBQUUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLDRCQUE0QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXZFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBQSw0QkFBZ0IsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUV4QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVPLGNBQWMsQ0FBRSxHQUFHLEtBQW9CO1FBQzNDLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVk7WUFDcEMsTUFBTSxJQUFJLGtCQUFRLENBQUMsc0JBQVksQ0FBQyxZQUFZLEVBQUUsc0JBQWMsQ0FBQyw4QkFBOEIsRUFBRSxzQkFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTVILEtBQUssR0FBRyxJQUFBLG9CQUFPLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFFdkIsSUFBQSxxQkFBcUIsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUU3QixJQUFJLENBQUMsWUFBWSxHQUFzQixLQUFLLENBQUM7UUFDN0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFFNUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFTyxlQUFlLENBQUUsR0FBRyxPQUEyQjtRQUNuRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhO1lBQ3JDLE1BQU0sSUFBSSxrQkFBUSxDQUFDLHNCQUFZLENBQUMsYUFBYSxFQUFFLHNCQUFjLENBQUMsOEJBQThCLEVBQUUsc0JBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU5SCxPQUFPLEdBQUcsSUFBQSxvQkFBTyxFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTNCLElBQUEscUJBQXNCLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLGFBQWEsR0FBc0IsT0FBTyxDQUFDO1FBQ2hELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBRTdDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0NBQ0o7QUEvRkQsMEJBK0ZDO0FBRUQsc0JBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZsYXR0ZW5EZWVwIGFzIGZsYXR0ZW4gfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFRlc3RpbmdVbml0IGZyb20gJy4vdGVzdGluZy11bml0JztcbmltcG9ydCBVbml0VHlwZSBmcm9tICcuL3VuaXQtdHlwZSc7XG5pbXBvcnQgeyBhc3NlcnRUeXBlLCBpcyB9IGZyb20gJy4uLy4uL2Vycm9ycy9ydW50aW1lL3R5cGUtYXNzZXJ0aW9ucyc7XG5pbXBvcnQgaGFuZGxlVGFnQXJncyBmcm9tICcuLi8uLi91dGlscy9oYW5kbGUtdGFnLWFyZ3MnO1xuaW1wb3J0IHdyYXBUZXN0RnVuY3Rpb24gZnJvbSAnLi4vd3JhcC10ZXN0LWZ1bmN0aW9uJztcbmltcG9ydCBhc3NlcnRSZXF1ZXN0SG9va1R5cGUgZnJvbSAnLi4vcmVxdWVzdC1ob29rcy9hc3NlcnQtdHlwZSc7XG5pbXBvcnQgYXNzZXJ0Q2xpZW50U2NyaXB0VHlwZSBmcm9tICcuLi8uLi9jdXN0b20tY2xpZW50LXNjcmlwdHMvYXNzZXJ0LXR5cGUnO1xuaW1wb3J0IE9QVElPTl9OQU1FUyBmcm9tICcuLi8uLi9jb25maWd1cmF0aW9uL29wdGlvbi1uYW1lcyc7XG5pbXBvcnQgeyBBUElFcnJvciB9IGZyb20gJy4uLy4uL2Vycm9ycy9ydW50aW1lJztcbmltcG9ydCB7IFJVTlRJTUVfRVJST1JTIH0gZnJvbSAnLi4vLi4vZXJyb3JzL3R5cGVzJztcbmltcG9ydCBUZXN0RmlsZSBmcm9tICcuL3Rlc3QtZmlsZSc7XG5pbXBvcnQgUmVxdWVzdEhvb2sgZnJvbSAnLi4vcmVxdWVzdC1ob29rcy9ob29rJztcbmltcG9ydCBDbGllbnRTY3JpcHRJbml0IGZyb20gJy4uLy4uL2N1c3RvbS1jbGllbnQtc2NyaXB0cy9jbGllbnQtc2NyaXB0LWluaXQnO1xuaW1wb3J0IHsgU1BFQ0lBTF9CTEFOS19QQUdFIH0gZnJvbSAndGVzdGNhZmUtaGFtbWVyaGVhZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpeHR1cmUgZXh0ZW5kcyBUZXN0aW5nVW5pdCB7XG4gICAgcHVibGljIHBhdGg6IHN0cmluZztcbiAgICBwdWJsaWMgYmVmb3JlRWFjaEZuOiBGdW5jdGlvbiB8IG51bGw7XG4gICAgcHVibGljIGFmdGVyRWFjaEZuOiBGdW5jdGlvbiB8IG51bGw7XG4gICAgcHVibGljIGJlZm9yZUZuOiBGdW5jdGlvbiB8IG51bGw7XG4gICAgcHVibGljIGFmdGVyRm46IEZ1bmN0aW9uIHwgbnVsbDtcbiAgICBwdWJsaWMgZ2xvYmFsQmVmb3JlRm46IEZ1bmN0aW9uIHwgbnVsbDtcbiAgICBwdWJsaWMgZ2xvYmFsQWZ0ZXJGbjogRnVuY3Rpb24gfCBudWxsO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICh0ZXN0RmlsZTogVGVzdEZpbGUsIGJhc2VVcmw/OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFnZVVybCA9IGJhc2VVcmwgfHwgU1BFQ0lBTF9CTEFOS19QQUdFO1xuXG4gICAgICAgIHN1cGVyKHRlc3RGaWxlLCBVbml0VHlwZS5maXh0dXJlLCBwYWdlVXJsLCBiYXNlVXJsKTtcblxuICAgICAgICB0aGlzLnBhdGggICAgICAgICAgID0gdGVzdEZpbGUuZmlsZW5hbWU7XG4gICAgICAgIHRoaXMuYmVmb3JlRWFjaEZuICAgPSBudWxsO1xuICAgICAgICB0aGlzLmFmdGVyRWFjaEZuICAgID0gbnVsbDtcbiAgICAgICAgdGhpcy5iZWZvcmVGbiAgICAgICA9IG51bGw7XG4gICAgICAgIHRoaXMuYWZ0ZXJGbiAgICAgICAgPSBudWxsO1xuICAgICAgICB0aGlzLmdsb2JhbEJlZm9yZUZuID0gbnVsbDtcbiAgICAgICAgdGhpcy5nbG9iYWxBZnRlckZuICA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBpT3JpZ2luIGFzIHVua25vd24gYXMgRml4dHVyZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2FkZCAobmFtZTogc3RyaW5nLCAuLi5yZXN0OiB1bmtub3duW10pOiBGdW5jdGlvbiB7XG4gICAgICAgIG5hbWUgPSBoYW5kbGVUYWdBcmdzKG5hbWUsIHJlc3QpO1xuXG4gICAgICAgIGFzc2VydFR5cGUoaXMuc3RyaW5nLCAnYXBpT3JpZ2luJywgJ1RoZSBmaXh0dXJlIG5hbWUnLCBuYW1lKTtcblxuICAgICAgICB0aGlzLm5hbWUgICAgICAgICAgICAgICAgICAgID0gbmFtZTtcbiAgICAgICAgdGhpcy50ZXN0RmlsZS5jdXJyZW50Rml4dHVyZSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBpT3JpZ2luO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2JlZm9yZSQgKGZuOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICAgICAgYXNzZXJ0VHlwZShpcy5mdW5jdGlvbiwgJ2JlZm9yZScsICdUaGUgZml4dHVyZS5iZWZvcmUgaG9vaycsIGZuKTtcblxuICAgICAgICB0aGlzLmJlZm9yZUZuID0gZm47XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBpT3JpZ2luO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FmdGVyJCAoZm46IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgICAgICBhc3NlcnRUeXBlKGlzLmZ1bmN0aW9uLCAnYWZ0ZXInLCAnVGhlIGZpeHR1cmUuYWZ0ZXIgaG9vaycsIGZuKTtcblxuICAgICAgICB0aGlzLmFmdGVyRm4gPSBmbjtcblxuICAgICAgICByZXR1cm4gdGhpcy5hcGlPcmlnaW47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYmVmb3JlRWFjaCQgKGZuOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICAgICAgYXNzZXJ0VHlwZShpcy5mdW5jdGlvbiwgJ2JlZm9yZUVhY2gnLCAnVGhlIGZpeHR1cmUuYmVmb3JlRWFjaCBob29rJywgZm4pO1xuXG4gICAgICAgIHRoaXMuYmVmb3JlRWFjaEZuID0gd3JhcFRlc3RGdW5jdGlvbihmbik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBpT3JpZ2luO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FmdGVyRWFjaCQgKGZuOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICAgICAgYXNzZXJ0VHlwZShpcy5mdW5jdGlvbiwgJ2FmdGVyRWFjaCcsICdUaGUgZml4dHVyZS5hZnRlckVhY2ggaG9vaycsIGZuKTtcblxuICAgICAgICB0aGlzLmFmdGVyRWFjaEZuID0gd3JhcFRlc3RGdW5jdGlvbihmbik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBpT3JpZ2luO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlcXVlc3RIb29rcyQgKC4uLmhvb2tzOiBSZXF1ZXN0SG9va1tdKTogRnVuY3Rpb24ge1xuICAgICAgICBpZiAodGhpcy5hcGlNZXRob2RXYXNDYWxsZWQucmVxdWVzdEhvb2tzKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKE9QVElPTl9OQU1FUy5yZXF1ZXN0SG9va3MsIFJVTlRJTUVfRVJST1JTLm11bHRpcGxlQVBJTWV0aG9kQ2FsbEZvcmJpZGRlbiwgT1BUSU9OX05BTUVTLnJlcXVlc3RIb29rcyk7XG5cbiAgICAgICAgaG9va3MgPSBmbGF0dGVuKGhvb2tzKTtcblxuICAgICAgICBhc3NlcnRSZXF1ZXN0SG9va1R5cGUoaG9va3MpO1xuXG4gICAgICAgIHRoaXMucmVxdWVzdEhvb2tzICAgICAgICAgICAgICAgICAgICA9IGhvb2tzO1xuICAgICAgICB0aGlzLmFwaU1ldGhvZFdhc0NhbGxlZC5yZXF1ZXN0SG9va3MgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmFwaU9yaWdpbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jbGllbnRTY3JpcHRzJCAoLi4uc2NyaXB0czogQ2xpZW50U2NyaXB0SW5pdFtdKTogRnVuY3Rpb24ge1xuICAgICAgICBpZiAodGhpcy5hcGlNZXRob2RXYXNDYWxsZWQuY2xpZW50U2NyaXB0cylcbiAgICAgICAgICAgIHRocm93IG5ldyBBUElFcnJvcihPUFRJT05fTkFNRVMuY2xpZW50U2NyaXB0cywgUlVOVElNRV9FUlJPUlMubXVsdGlwbGVBUElNZXRob2RDYWxsRm9yYmlkZGVuLCBPUFRJT05fTkFNRVMuY2xpZW50U2NyaXB0cyk7XG5cbiAgICAgICAgc2NyaXB0cyA9IGZsYXR0ZW4oc2NyaXB0cyk7XG5cbiAgICAgICAgYXNzZXJ0Q2xpZW50U2NyaXB0VHlwZShzY3JpcHRzKTtcblxuICAgICAgICB0aGlzLmNsaWVudFNjcmlwdHMgICAgICAgICAgICAgICAgICAgID0gc2NyaXB0cztcbiAgICAgICAgdGhpcy5hcGlNZXRob2RXYXNDYWxsZWQuY2xpZW50U2NyaXB0cyA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBpT3JpZ2luO1xuICAgIH1cbn1cblxuVGVzdGluZ1VuaXQubWFrZUFQSUxpc3RGb3JDaGlsZENsYXNzKEZpeHR1cmUpO1xuIl19