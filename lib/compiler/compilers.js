"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTestFileCompilers = exports.getTestFileCompilers = void 0;
const testcafe_hammerhead_1 = __importDefault(require("testcafe-hammerhead"));
const testcafe_legacy_api_1 = require("testcafe-legacy-api");
const compiler_1 = __importDefault(require("./test-file/formats/es-next/compiler"));
const compiler_2 = __importDefault(require("./test-file/formats/typescript/compiler"));
const compiler_3 = __importDefault(require("./test-file/formats/coffeescript/compiler"));
const compiler_4 = __importDefault(require("./test-file/formats/raw/compiler"));
const compiler_5 = __importDefault(require("./test-file/formats/dev-tools/compiler"));
const customizable_compilers_1 = __importDefault(require("../configuration/customizable-compilers"));
function createTestFileCompilers(compilerOptions = {}, { isCompilerServiceMode, baseUrl } = {}) {
    return [
        new testcafe_legacy_api_1.Compiler(testcafe_hammerhead_1.default.processScript),
        new compiler_1.default({ isCompilerServiceMode, baseUrl }),
        new compiler_2.default(compilerOptions[customizable_compilers_1.default.typescript], { isCompilerServiceMode, baseUrl }),
        new compiler_3.default({ baseUrl }),
        new compiler_4.default({ baseUrl }),
        new compiler_5.default({ baseUrl }),
    ];
}
let testFileCompilers = [];
function getTestFileCompilers() {
    if (!testFileCompilers.length)
        initTestFileCompilers();
    return testFileCompilers;
}
exports.getTestFileCompilers = getTestFileCompilers;
function initTestFileCompilers(compilerOptions, { isCompilerServiceMode, baseUrl } = {}) {
    testFileCompilers = createTestFileCompilers(compilerOptions, { isCompilerServiceMode, baseUrl });
}
exports.initTestFileCompilers = initTestFileCompilers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBpbGVyL2NvbXBpbGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4RUFBNkM7QUFDN0MsNkRBQXlFO0FBQ3pFLG9GQUEwRTtBQUMxRSx1RkFBaUY7QUFDakYseUZBQXFGO0FBQ3JGLGdGQUFtRTtBQUNuRSxzRkFBOEU7QUFDOUUscUdBQTRFO0FBRTVFLFNBQVMsdUJBQXVCLENBQUUsZUFBZSxHQUFHLEVBQUUsRUFBRSxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDM0YsT0FBTztRQUNILElBQUksOEJBQXNCLENBQUMsNkJBQVUsQ0FBQyxhQUFhLENBQUM7UUFDcEQsSUFBSSxrQkFBc0IsQ0FBQyxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxDQUFDO1FBQzlELElBQUksa0JBQTBCLENBQUMsZUFBZSxDQUFDLGdDQUFxQixDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLENBQUM7UUFDckgsSUFBSSxrQkFBNEIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDO1FBQzdDLElBQUksa0JBQW1CLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQztRQUNwQyxJQUFJLGtCQUF3QixDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUM7S0FDNUMsQ0FBQztBQUNOLENBQUM7QUFFRCxJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztBQUUzQixTQUFnQixvQkFBb0I7SUFDaEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU07UUFDekIscUJBQXFCLEVBQUUsQ0FBQztJQUU1QixPQUFPLGlCQUFpQixDQUFDO0FBQzdCLENBQUM7QUFMRCxvREFLQztBQUVELFNBQWdCLHFCQUFxQixDQUFFLGVBQWUsRUFBRSxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDM0YsaUJBQWlCLEdBQUcsdUJBQXVCLENBQUMsZUFBZSxFQUFFLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUNyRyxDQUFDO0FBRkQsc0RBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaGFtbWVyaGVhZCBmcm9tICd0ZXN0Y2FmZS1oYW1tZXJoZWFkJztcbmltcG9ydCB7IENvbXBpbGVyIGFzIExlZ2FjeVRlc3RGaWxlQ29tcGlsZXIgfSBmcm9tICd0ZXN0Y2FmZS1sZWdhY3ktYXBpJztcbmltcG9ydCBFc05leHRUZXN0RmlsZUNvbXBpbGVyIGZyb20gJy4vdGVzdC1maWxlL2Zvcm1hdHMvZXMtbmV4dC9jb21waWxlcic7XG5pbXBvcnQgVHlwZVNjcmlwdFRlc3RGaWxlQ29tcGlsZXIgZnJvbSAnLi90ZXN0LWZpbGUvZm9ybWF0cy90eXBlc2NyaXB0L2NvbXBpbGVyJztcbmltcG9ydCBDb2ZmZWVTY3JpcHRUZXN0RmlsZUNvbXBpbGVyIGZyb20gJy4vdGVzdC1maWxlL2Zvcm1hdHMvY29mZmVlc2NyaXB0L2NvbXBpbGVyJztcbmltcG9ydCBSYXdUZXN0RmlsZUNvbXBpbGVyIGZyb20gJy4vdGVzdC1maWxlL2Zvcm1hdHMvcmF3L2NvbXBpbGVyJztcbmltcG9ydCBEZXZUb29sc1Rlc3RGaWxlQ29tcGlsZXIgZnJvbSAnLi90ZXN0LWZpbGUvZm9ybWF0cy9kZXYtdG9vbHMvY29tcGlsZXInO1xuaW1wb3J0IEN1c3RvbWl6YWJsZUNvbXBpbGVycyBmcm9tICcuLi9jb25maWd1cmF0aW9uL2N1c3RvbWl6YWJsZS1jb21waWxlcnMnO1xuXG5mdW5jdGlvbiBjcmVhdGVUZXN0RmlsZUNvbXBpbGVycyAoY29tcGlsZXJPcHRpb25zID0ge30sIHsgaXNDb21waWxlclNlcnZpY2VNb2RlLCBiYXNlVXJsIH0gPSB7fSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIG5ldyBMZWdhY3lUZXN0RmlsZUNvbXBpbGVyKGhhbW1lcmhlYWQucHJvY2Vzc1NjcmlwdCksXG4gICAgICAgIG5ldyBFc05leHRUZXN0RmlsZUNvbXBpbGVyKHsgaXNDb21waWxlclNlcnZpY2VNb2RlLCBiYXNlVXJsIH0pLFxuICAgICAgICBuZXcgVHlwZVNjcmlwdFRlc3RGaWxlQ29tcGlsZXIoY29tcGlsZXJPcHRpb25zW0N1c3RvbWl6YWJsZUNvbXBpbGVycy50eXBlc2NyaXB0XSwgeyBpc0NvbXBpbGVyU2VydmljZU1vZGUsIGJhc2VVcmwgfSksXG4gICAgICAgIG5ldyBDb2ZmZWVTY3JpcHRUZXN0RmlsZUNvbXBpbGVyKHsgYmFzZVVybCB9KSxcbiAgICAgICAgbmV3IFJhd1Rlc3RGaWxlQ29tcGlsZXIoeyBiYXNlVXJsIH0pLFxuICAgICAgICBuZXcgRGV2VG9vbHNUZXN0RmlsZUNvbXBpbGVyKHsgYmFzZVVybCB9KSxcbiAgICBdO1xufVxuXG5sZXQgdGVzdEZpbGVDb21waWxlcnMgPSBbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRlc3RGaWxlQ29tcGlsZXJzICgpIHtcbiAgICBpZiAoIXRlc3RGaWxlQ29tcGlsZXJzLmxlbmd0aClcbiAgICAgICAgaW5pdFRlc3RGaWxlQ29tcGlsZXJzKCk7XG5cbiAgICByZXR1cm4gdGVzdEZpbGVDb21waWxlcnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0VGVzdEZpbGVDb21waWxlcnMgKGNvbXBpbGVyT3B0aW9ucywgeyBpc0NvbXBpbGVyU2VydmljZU1vZGUsIGJhc2VVcmwgfSA9IHt9KSB7XG4gICAgdGVzdEZpbGVDb21waWxlcnMgPSBjcmVhdGVUZXN0RmlsZUNvbXBpbGVycyhjb21waWxlck9wdGlvbnMsIHsgaXNDb21waWxlclNlcnZpY2VNb2RlLCBiYXNlVXJsIH0pO1xufVxuIl19