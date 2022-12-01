"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const strip_bom_1 = __importDefault(require("strip-bom"));
const nanoid_1 = require("nanoid");
const base_1 = __importDefault(require("./base"));
const test_file_1 = __importDefault(require("../../api/structure/test-file"));
const fixture_1 = __importDefault(require("../../api/structure/fixture"));
const test_1 = __importDefault(require("../../api/structure/test"));
const runtime_1 = require("../../errors/runtime");
const stack_cleaning_hook_1 = __importDefault(require("../../errors/stack-cleaning-hook"));
const node_modules_folder_name_1 = __importDefault(require("../../utils/node-modules-folder-name"));
const cache_proxy_1 = __importDefault(require("./cache-proxy"));
const exportable_lib_1 = __importDefault(require("../../api/exportable-lib"));
const test_file_temp_variable_name_1 = __importDefault(require("./test-file-temp-variable-name"));
const add_export_api_1 = __importDefault(require("./add-export-api"));
const CWD = process.cwd();
const FIXTURE_RE = /(^|;|\s+)fixture\s*(\.|\(|`)/;
const TEST_RE = /(^|;|\s+)test\s*(\.|\()/;
const TESTCAFE_LIB_FOLDER_NAME = 'lib';
const Module = module.constructor;
class APIBasedTestFileCompilerBase extends base_1.default {
    constructor({ isCompilerServiceMode, baseUrl }) {
        super({ baseUrl });
        this.isCompilerServiceMode = isCompilerServiceMode;
        this.cache = Object.create(null);
        this.origRequireExtensions = Object.create(null);
        this.cachePrefix = (0, nanoid_1.nanoid)(7);
    }
    static _getNodeModulesLookupPath(filename) {
        const dir = (0, path_1.dirname)(filename);
        return Module._nodeModulePaths(dir);
    }
    static _isNodeModulesDep(filename) {
        return (0, path_1.relative)(CWD, filename)
            .split(path_1.sep)
            .includes(node_modules_folder_name_1.default);
    }
    static _isTestCafeLibDep(filename) {
        return (0, path_1.relative)(CWD, filename)
            .split(path_1.sep)[0] === TESTCAFE_LIB_FOLDER_NAME;
    }
    _execAsModule(code, filename) {
        const mod = new Module(filename, module.parent);
        mod.filename = filename;
        mod.paths = APIBasedTestFileCompilerBase._getNodeModulesLookupPath(filename);
        cache_proxy_1.default.startExternalCaching(this.cachePrefix);
        mod._compile(code, filename);
        cache_proxy_1.default.stopExternalCaching();
    }
    _compileCode(code, filename) {
        if (this.canPrecompile)
            return this._precompileCode([{ code, filename }])[0];
        throw new Error('Not implemented');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _precompileCode(testFilesInfo) {
        throw new Error('Not implemented');
    }
    _getRequireCompilers() {
        throw new Error('Not implemented');
    }
    _compileExternalModule(mod, filename, requireCompiler, origExt) {
        if (APIBasedTestFileCompilerBase._isNodeModulesDep(filename) && origExt)
            origExt(mod, filename);
        else
            this._compileModule(mod, filename, requireCompiler, origExt);
    }
    _compileExternalModuleInEsmMode(mod, filename, requireCompiler, origExt) {
        if (!origExt)
            origExt = this.origRequireExtensions['.js'];
        if (!APIBasedTestFileCompilerBase._isNodeModulesDep(filename) &&
            !APIBasedTestFileCompilerBase._isTestCafeLibDep(filename)) {
            global.customExtensionHook = () => {
                global.customExtensionHook = null;
                this._compileModule(mod, filename, requireCompiler);
            };
        }
        return origExt(mod, filename);
    }
    _compileModule(mod, filename, requireCompiler) {
        const code = (0, fs_1.readFileSync)(filename).toString();
        const compiledCode = requireCompiler((0, strip_bom_1.default)(code), filename);
        mod.paths = APIBasedTestFileCompilerBase._getNodeModulesLookupPath(filename);
        mod._compile(compiledCode, filename);
    }
    _setupRequireHook(testFile) {
        const requireCompilers = this._getRequireCompilers();
        this.origRequireExtensions = Object.create(null);
        Object.keys(requireCompilers).forEach(ext => {
            const origExt = require.extensions[ext];
            this.origRequireExtensions[ext] = origExt;
            require.extensions[ext] = (mod, filename) => {
                const hadGlobalAPI = this._hasGlobalAPI();
                // NOTE: remove global API so that it will be unavailable for the dependencies
                if (APIBasedTestFileCompilerBase._isNodeModulesDep(filename) && hadGlobalAPI)
                    this._removeGlobalAPI();
                if (this.isCompilerServiceMode)
                    this._compileExternalModuleInEsmMode(mod, filename, requireCompilers[ext], origExt);
                else
                    this._compileExternalModule(mod, filename, requireCompilers[ext], origExt);
                if (hadGlobalAPI && !this._hasGlobalAPI())
                    this._addGlobalAPI(testFile);
            };
        });
    }
    _removeRequireHook() {
        Object.keys(this.origRequireExtensions).forEach(ext => {
            require.extensions[ext] = this.origRequireExtensions[ext];
        });
    }
    _compileCodeForTestFiles(testFilesInfo) {
        stack_cleaning_hook_1.default.enabled = true;
        try {
            if (this.canPrecompile)
                return this._precompileCode(testFilesInfo);
            return testFilesInfo.map(({ code, filename }) => this._compileCode(code, filename));
        }
        catch (err) {
            throw new runtime_1.TestCompilationError(stack_cleaning_hook_1.default.cleanError(err));
        }
        finally {
            stack_cleaning_hook_1.default.enabled = false;
        }
    }
    _addGlobalAPI(testFile) {
        Object.defineProperty(global, 'fixture', {
            get: () => new fixture_1.default(testFile, this.baseUrl),
            configurable: true,
        });
        Object.defineProperty(global, 'test', {
            get: () => new test_1.default(testFile, false, this.baseUrl),
            configurable: true,
        });
    }
    _addExportAPIInCompilerServiceMode(testFile) {
        // 'esm' library has an issue with loading modules
        // in case of the combination of require and import directives.
        // This hack allowing achieve the desired behavior.
        const exportableLibPath = require.resolve('../../api/exportable-lib');
        delete require.cache[exportableLibPath];
        global[test_file_temp_variable_name_1.default] = { testFile, baseUrl: this.baseUrl };
        require('../../api/exportable-lib');
    }
    _addExportAPI(testFile) {
        if (this.isCompilerServiceMode)
            this._addExportAPIInCompilerServiceMode(testFile);
        else
            (0, add_export_api_1.default)(testFile, exportable_lib_1.default, { baseUrl: this.baseUrl });
    }
    _removeGlobalAPI() {
        delete global.fixture;
        delete global.test;
    }
    _hasGlobalAPI() {
        return global.fixture && global.test;
    }
    _runCompiledCode(compiledCode, filename) {
        const testFile = new test_file_1.default(filename);
        this._addGlobalAPI(testFile);
        this._addExportAPI(testFile);
        stack_cleaning_hook_1.default.enabled = true;
        this._setupRequireHook(testFile);
        try {
            this._execAsModule(compiledCode, filename);
        }
        catch (err) {
            if (!(err instanceof runtime_1.APIError))
                throw new runtime_1.TestCompilationError(stack_cleaning_hook_1.default.cleanError(err));
            throw err;
        }
        finally {
            this._removeRequireHook();
            stack_cleaning_hook_1.default.enabled = false;
            this._removeGlobalAPI();
        }
        return testFile.getTests();
    }
    precompile(testFilesInfo) {
        return this._compileCodeForTestFiles(testFilesInfo);
    }
    execute(compiledCode, filename) {
        return this._runCompiledCode(compiledCode, filename);
    }
    async compile(code, filename) {
        const [compiledCode] = await this.precompile([{ code, filename }]);
        if (compiledCode)
            return this.execute(compiledCode, filename);
        return Promise.resolve();
    }
    _hasTests(code) {
        return FIXTURE_RE.test(code) && TEST_RE.test(code);
    }
    cleanUp() {
        this.cache = {};
    }
}
exports.default = APIBasedTestFileCompilerBase;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWJhc2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBpbGVyL3Rlc3QtZmlsZS9hcGktYmFzZWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrQkFJYztBQUVkLDJCQUFrQztBQUNsQywwREFBaUM7QUFDakMsbUNBQWdDO0FBQ2hDLGtEQUEwQztBQUMxQyw4RUFBcUQ7QUFDckQsMEVBQWtEO0FBQ2xELG9FQUE0QztBQUM1QyxrREFBc0U7QUFDdEUsMkZBQWlFO0FBQ2pFLG9HQUFnRTtBQUNoRSxnRUFBdUM7QUFDdkMsOEVBQXFEO0FBQ3JELGtHQUEwRTtBQUMxRSxzRUFBNEM7QUFFNUMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRTFCLE1BQU0sVUFBVSxHQUFHLDhCQUE4QixDQUFDO0FBQ2xELE1BQU0sT0FBTyxHQUFNLHlCQUF5QixDQUFDO0FBRTdDLE1BQU0sd0JBQXdCLEdBQUcsS0FBSyxDQUFDO0FBRXZDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFFbEMsTUFBcUIsNEJBQTZCLFNBQVEsY0FBb0I7SUFDMUUsWUFBYSxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRTtRQUMzQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRW5CLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztRQUNuRCxJQUFJLENBQUMsS0FBSyxHQUFtQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxXQUFXLEdBQWEsSUFBQSxlQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELE1BQU0sQ0FBQyx5QkFBeUIsQ0FBRSxRQUFRO1FBQ3RDLE1BQU0s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SUFFRCxLQUFLLENBQUMsT0FBTyxDQUFFLElBQUksRUFBRSxRQUFRO1FBQ3pCLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFbkUsSUFBSSxZQUFZO1lBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVoRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsU0FBUyxDQUFFLElBQUk7UUFDWCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsT0FBTztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQTNPRCwrQ0EyT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIGRpcm5hbWUsXG4gICAgcmVsYXRpdmUsXG4gICAgc2VwIGFzIHBhdGhTZXAsXG59IGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tICdmcyc7XG5pbXBvcnQgc3RyaXBCb20gZnJvbSAnc3RyaXAtYm9tJztcbmltcG9ydCB7IG5hbm9pZCB9IGZyb20gJ25hbm9pZCc7XG5pbXBvcnQgVGVzdEZpbGVDb21waWxlckJhc2UgZnJvbSAnLi9iYXNlJztcbmltcG9ydCBUZXN0RmlsZSBmcm9tICcuLi8uLi9hcGkvc3RydWN0dXJlL3Rlc3QtZmlsZSc7XG5pbXBvcnQgRml4dHVyZSBmcm9tICcuLi8uLi9hcGkvc3RydWN0dXJlL2ZpeHR1cmUnO1xuaW1wb3J0IFRlc3QgZnJvbSAnLi4vLi4vYXBpL3N0cnVjdHVyZS90ZXN0JztcbmltcG9ydCB7IFRlc3RDb21waWxhdGlvbkVycm9yLCBBUElFcnJvciB9IGZyb20gJy4uLy4uL2Vycm9ycy9ydW50aW1lJztcbmltcG9ydCBzdGFja0NsZWFuaW5nSG9vayBmcm9tICcuLi8uLi9lcnJvcnMvc3RhY2stY2xlYW5pbmctaG9vayc7XG5pbXBvcnQgTk9ERV9NT0RVTEVTIGZyb20gJy4uLy4uL3V0aWxzL25vZGUtbW9kdWxlcy1mb2xkZXItbmFtZSc7XG5pbXBvcnQgY2FjaGVQcm94eSBmcm9tICcuL2NhY2hlLXByb3h5JztcbmltcG9ydCBleHBvcnRhYmxlTGliIGZyb20gJy4uLy4uL2FwaS9leHBvcnRhYmxlLWxpYic7XG5pbXBvcnQgVEVTVF9GSUxFX1RFTVBfVkFSSUFCTEVfTkFNRSBmcm9tICcuL3Rlc3QtZmlsZS10ZW1wLXZhcmlhYmxlLW5hbWUnO1xuaW1wb3J0IGFkZEV4cG9ydEFQSSBmcm9tICcuL2FkZC1leHBvcnQtYXBpJztcblxuY29uc3QgQ1dEID0gcHJvY2Vzcy5jd2QoKTtcblxuY29uc3QgRklYVFVSRV9SRSA9IC8oXnw7fFxccyspZml4dHVyZVxccyooXFwufFxcKHxgKS87XG5jb25zdCBURVNUX1JFICAgID0gLyhefDt8XFxzKyl0ZXN0XFxzKihcXC58XFwoKS87XG5cbmNvbnN0IFRFU1RDQUZFX0xJQl9GT0xERVJfTkFNRSA9ICdsaWInO1xuXG5jb25zdCBNb2R1bGUgPSBtb2R1bGUuY29uc3RydWN0b3I7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQSUJhc2VkVGVzdEZpbGVDb21waWxlckJhc2UgZXh0ZW5kcyBUZXN0RmlsZUNvbXBpbGVyQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKHsgaXNDb21waWxlclNlcnZpY2VNb2RlLCBiYXNlVXJsIH0pIHtcbiAgICAgICAgc3VwZXIoeyBiYXNlVXJsIH0pO1xuXG4gICAgICAgIHRoaXMuaXNDb21waWxlclNlcnZpY2VNb2RlID0gaXNDb21waWxlclNlcnZpY2VNb2RlO1xuICAgICAgICB0aGlzLmNhY2hlICAgICAgICAgICAgICAgICA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMub3JpZ1JlcXVpcmVFeHRlbnNpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5jYWNoZVByZWZpeCAgICAgICAgICAgPSBuYW5vaWQoNyk7XG4gICAgfVxuXG4gICAgc3RhdGljIF9nZXROb2RlTW9kdWxlc0xvb2t1cFBhdGggKGZpbGVuYW1lKSB7XG4gICAgICAgIGNvbnN0IGRpciA9IGRpcm5hbWUoZmlsZW5hbWUpO1xuXG4gICAgICAgIHJldHVybiBNb2R1bGUuX25vZGVNb2R1bGVQYXRocyhkaXIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfaXNOb2RlTW9kdWxlc0RlcCAoZmlsZW5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHJlbGF0aXZlKENXRCwgZmlsZW5hbWUpXG4gICAgICAgICAgICAuc3BsaXQocGF0aFNlcClcbiAgICAgICAgICAgIC5pbmNsdWRlcyhOT0RFX01PRFVMRVMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfaXNUZXN0Q2FmZUxpYkRlcCAoZmlsZW5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHJlbGF0aXZlKENXRCwgZmlsZW5hbWUpXG4gICAgICAgICAgICAuc3BsaXQocGF0aFNlcClbMF0gPT09IFRFU1RDQUZFX0xJQl9GT0xERVJfTkFNRTtcbiAgICB9XG5cbiAgICBfZXhlY0FzTW9kdWxlIChjb2RlLCBmaWxlbmFtZSkge1xuICAgICAgICBjb25zdCBtb2QgPSBuZXcgTW9kdWxlKGZpbGVuYW1lLCBtb2R1bGUucGFyZW50KTtcblxuICAgICAgICBtb2QuZmlsZW5hbWUgPSBmaWxlbmFtZTtcbiAgICAgICAgbW9kLnBhdGhzICAgID0gQVBJQmFzZWRUZXN0RmlsZUNvbXBpbGVyQmFzZS5fZ2V0Tm9kZU1vZHVsZXNMb29rdXBQYXRoKGZpbGVuYW1lKTtcblxuICAgICAgICBjYWNoZVByb3h5LnN0YXJ0RXh0ZXJuYWxDYWNoaW5nKHRoaXMuY2FjaGVQcmVmaXgpO1xuXG4gICAgICAgIG1vZC5fY29tcGlsZShjb2RlLCBmaWxlbmFtZSk7XG5cbiAgICAgICAgY2FjaGVQcm94eS5zdG9wRXh0ZXJuYWxDYWNoaW5nKCk7XG4gICAgfVxuXG4gICAgX2NvbXBpbGVDb2RlIChjb2RlLCBmaWxlbmFtZSkge1xuICAgICAgICBpZiAodGhpcy5jYW5QcmVjb21waWxlKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ByZWNvbXBpbGVDb2RlKFt7IGNvZGUsIGZpbGVuYW1lIH1dKVswXTtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICBfcHJlY29tcGlsZUNvZGUgKHRlc3RGaWxlc0luZm8pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgICB9XG5cbiAgICBfZ2V0UmVxdWlyZUNvbXBpbGVycyAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gICAgfVxuXG4gICAgX2NvbXBpbGVFeHRlcm5hbE1vZHVsZSAobW9kLCBmaWxlbmFtZSwgcmVxdWlyZUNvbXBpbGVyLCBvcmlnRXh0KSB7XG4gICAgICAgIGlmIChBUElCYXNlZFRlc3RGaWxlQ29tcGlsZXJCYXNlLl9pc05vZGVNb2R1bGVzRGVwKGZpbGVuYW1lKSAmJiBvcmlnRXh0KVxuICAgICAgICAgICAgb3JpZ0V4dCggbW9kLCBmaWxlbmFtZSApO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLl9jb21waWxlTW9kdWxlKG1vZCwgZmlsZW5hbWUsIHJlcXVpcmVDb21waWxlciwgb3JpZ0V4dCk7XG4gICAgfVxuXG4gICAgX2NvbXBpbGVFeHRlcm5hbE1vZHVsZUluRXNtTW9kZSAobW9kLCBmaWxlbmFtZSwgcmVxdWlyZUNvbXBpbGVyLCBvcmlnRXh0KSB7XG4gICAgICAgIGlmICghb3JpZ0V4dClcbiAgICAgICAgICAgIG9yaWdFeHQgPSB0aGlzLm9yaWdSZXF1aXJlRXh0ZW5zaW9uc1snLmpzJ107XG5cbiAgICAgICAgaWYgKCFBUElCYXNlZFRlc3RGaWxlQ29tcGlsZXJCYXNlLl9pc05vZGVNb2R1bGVzRGVwKGZpbGVuYW1lKSAmJlxuICAgICAgICAgICAgIUFQSUJhc2VkVGVzdEZpbGVDb21waWxlckJhc2UuX2lzVGVzdENhZmVMaWJEZXAoZmlsZW5hbWUpKSB7XG4gICAgICAgICAgICBnbG9iYWwuY3VzdG9tRXh0ZW5zaW9uSG9vayA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBnbG9iYWwuY3VzdG9tRXh0ZW5zaW9uSG9vayA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jb21waWxlTW9kdWxlKG1vZCwgZmlsZW5hbWUsIHJlcXVpcmVDb21waWxlcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9yaWdFeHQobW9kLCBmaWxlbmFtZSk7XG4gICAgfVxuXG5cbiAgICBfY29tcGlsZU1vZHVsZSAobW9kLCBmaWxlbmFtZSwgcmVxdWlyZUNvbXBpbGVyKSB7XG4gICAgICAgIGNvbnN0IGNvZGUgICAgICAgICA9IHJlYWRGaWxlU3luYyhmaWxlbmFtZSkudG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgY29tcGlsZWRDb2RlID0gcmVxdWlyZUNvbXBpbGVyKHN0cmlwQm9tKGNvZGUpLCBmaWxlbmFtZSk7XG5cbiAgICAgICAgbW9kLnBhdGhzID0gQVBJQmFzZWRUZXN0RmlsZUNvbXBpbGVyQmFzZS5fZ2V0Tm9kZU1vZHVsZXNMb29rdXBQYXRoKGZpbGVuYW1lKTtcblxuICAgICAgICBtb2QuX2NvbXBpbGUoY29tcGlsZWRDb2RlLCBmaWxlbmFtZSk7XG4gICAgfVxuXG4gICAgX3NldHVwUmVxdWlyZUhvb2sgKHRlc3RGaWxlKSB7XG4gICAgICAgIGNvbnN0IHJlcXVpcmVDb21waWxlcnMgPSB0aGlzLl9nZXRSZXF1aXJlQ29tcGlsZXJzKCk7XG5cbiAgICAgICAgdGhpcy5vcmlnUmVxdWlyZUV4dGVuc2lvbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKHJlcXVpcmVDb21waWxlcnMpLmZvckVhY2goZXh0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdFeHQgPSByZXF1aXJlLmV4dGVuc2lvbnNbZXh0XTtcblxuICAgICAgICAgICAgdGhpcy5vcmlnUmVxdWlyZUV4dGVuc2lvbnNbZXh0XSA9IG9yaWdFeHQ7XG5cbiAgICAgICAgICAgIHJlcXVpcmUuZXh0ZW5zaW9uc1tleHRdID0gKG1vZCwgZmlsZW5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBoYWRHbG9iYWxBUEkgPSB0aGlzLl9oYXNHbG9iYWxBUEkoKTtcblxuICAgICAgICAgICAgICAgIC8vIE5PVEU6IHJlbW92ZSBnbG9iYWwgQVBJIHNvIHRoYXQgaXQgd2lsbCBiZSB1bmF2YWlsYWJsZSBmb3IgdGhlIGRlcGVuZGVuY2llc1xuICAgICAgICAgICAgICAgIGlmIChBUElCYXNlZFRlc3RGaWxlQ29tcGlsZXJCYXNlLl9pc05vZGVNb2R1bGVzRGVwKGZpbGVuYW1lKSAmJiBoYWRHbG9iYWxBUEkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUdsb2JhbEFQSSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb21waWxlclNlcnZpY2VNb2RlKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21waWxlRXh0ZXJuYWxNb2R1bGVJbkVzbU1vZGUobW9kLCBmaWxlbmFtZSwgcmVxdWlyZUNvbXBpbGVyc1tleHRdLCBvcmlnRXh0KTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBpbGVFeHRlcm5hbE1vZHVsZShtb2QsIGZpbGVuYW1lLCByZXF1aXJlQ29tcGlsZXJzW2V4dF0sIG9yaWdFeHQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhhZEdsb2JhbEFQSSAmJiAhdGhpcy5faGFzR2xvYmFsQVBJKCkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZEdsb2JhbEFQSSh0ZXN0RmlsZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfcmVtb3ZlUmVxdWlyZUhvb2sgKCkge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLm9yaWdSZXF1aXJlRXh0ZW5zaW9ucykuZm9yRWFjaChleHQgPT4ge1xuICAgICAgICAgICAgcmVxdWlyZS5leHRlbnNpb25zW2V4dF0gPSB0aGlzLm9yaWdSZXF1aXJlRXh0ZW5zaW9uc1tleHRdO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfY29tcGlsZUNvZGVGb3JUZXN0RmlsZXMgKHRlc3RGaWxlc0luZm8pIHtcbiAgICAgICAgc3RhY2tDbGVhbmluZ0hvb2suZW5hYmxlZCA9IHRydWU7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhblByZWNvbXBpbGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ByZWNvbXBpbGVDb2RlKHRlc3RGaWxlc0luZm8pO1xuXG4gICAgICAgICAgICByZXR1cm4gdGVzdEZpbGVzSW5mby5tYXAoKHsgY29kZSwgZmlsZW5hbWUgfSkgPT4gdGhpcy5fY29tcGlsZUNvZGUoY29kZSwgZmlsZW5hbWUpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVGVzdENvbXBpbGF0aW9uRXJyb3Ioc3RhY2tDbGVhbmluZ0hvb2suY2xlYW5FcnJvcihlcnIpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHN0YWNrQ2xlYW5pbmdIb29rLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9hZGRHbG9iYWxBUEkgKHRlc3RGaWxlKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShnbG9iYWwsICdmaXh0dXJlJywge1xuICAgICAgICAgICAgZ2V0OiAgICAgICAgICAoKSA9PiBuZXcgRml4dHVyZSh0ZXN0RmlsZSwgdGhpcy5iYXNlVXJsKSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGdsb2JhbCwgJ3Rlc3QnLCB7XG4gICAgICAgICAgICBnZXQ6ICAgICAgICAgICgpID0+IG5ldyBUZXN0KHRlc3RGaWxlLCBmYWxzZSwgdGhpcy5iYXNlVXJsKSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2FkZEV4cG9ydEFQSUluQ29tcGlsZXJTZXJ2aWNlTW9kZSAodGVzdEZpbGUpIHtcbiAgICAgICAgLy8gJ2VzbScgbGlicmFyeSBoYXMgYW4gaXNzdWUgd2l0aCBsb2FkaW5nIG1vZHVsZXNcbiAgICAgICAgLy8gaW4gY2FzZSBvZiB0aGUgY29tYmluYXRpb24gb2YgcmVxdWlyZSBhbmQgaW1wb3J0IGRpcmVjdGl2ZXMuXG4gICAgICAgIC8vIFRoaXMgaGFjayBhbGxvd2luZyBhY2hpZXZlIHRoZSBkZXNpcmVkIGJlaGF2aW9yLlxuICAgICAgICBjb25zdCBleHBvcnRhYmxlTGliUGF0aCA9IHJlcXVpcmUucmVzb2x2ZSgnLi4vLi4vYXBpL2V4cG9ydGFibGUtbGliJyk7XG5cbiAgICAgICAgZGVsZXRlIHJlcXVpcmUuY2FjaGVbZXhwb3J0YWJsZUxpYlBhdGhdO1xuXG4gICAgICAgIGdsb2JhbFtURVNUX0ZJTEVfVEVNUF9WQVJJQUJMRV9OQU1FXSA9IHsgdGVzdEZpbGUsIGJhc2VVcmw6IHRoaXMuYmFzZVVybCB9O1xuXG4gICAgICAgIHJlcXVpcmUoJy4uLy4uL2FwaS9leHBvcnRhYmxlLWxpYicpO1xuICAgIH1cblxuICAgIF9hZGRFeHBvcnRBUEkgKHRlc3RGaWxlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ29tcGlsZXJTZXJ2aWNlTW9kZSlcbiAgICAgICAgICAgIHRoaXMuX2FkZEV4cG9ydEFQSUluQ29tcGlsZXJTZXJ2aWNlTW9kZSh0ZXN0RmlsZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGFkZEV4cG9ydEFQSSh0ZXN0RmlsZSwgZXhwb3J0YWJsZUxpYiwgeyBiYXNlVXJsOiB0aGlzLmJhc2VVcmwgfSk7XG4gICAgfVxuXG4gICAgX3JlbW92ZUdsb2JhbEFQSSAoKSB7XG4gICAgICAgIGRlbGV0ZSBnbG9iYWwuZml4dHVyZTtcbiAgICAgICAgZGVsZXRlIGdsb2JhbC50ZXN0O1xuICAgIH1cblxuICAgIF9oYXNHbG9iYWxBUEkgKCkge1xuICAgICAgICByZXR1cm4gZ2xvYmFsLmZpeHR1cmUgJiYgZ2xvYmFsLnRlc3Q7XG4gICAgfVxuXG4gICAgX3J1bkNvbXBpbGVkQ29kZSAoY29tcGlsZWRDb2RlLCBmaWxlbmFtZSkge1xuICAgICAgICBjb25zdCB0ZXN0RmlsZSA9IG5ldyBUZXN0RmlsZShmaWxlbmFtZSk7XG5cbiAgICAgICAgdGhpcy5fYWRkR2xvYmFsQVBJKHRlc3RGaWxlKTtcbiAgICAgICAgdGhpcy5fYWRkRXhwb3J0QVBJKHRlc3RGaWxlKTtcblxuICAgICAgICBzdGFja0NsZWFuaW5nSG9vay5lbmFibGVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl9zZXR1cFJlcXVpcmVIb29rKHRlc3RGaWxlKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5fZXhlY0FzTW9kdWxlKGNvbXBpbGVkQ29kZSwgZmlsZW5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGlmICghKGVyciBpbnN0YW5jZW9mIEFQSUVycm9yKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVGVzdENvbXBpbGF0aW9uRXJyb3Ioc3RhY2tDbGVhbmluZ0hvb2suY2xlYW5FcnJvcihlcnIpKTtcblxuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlUmVxdWlyZUhvb2soKTtcbiAgICAgICAgICAgIHN0YWNrQ2xlYW5pbmdIb29rLmVuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlR2xvYmFsQVBJKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGVzdEZpbGUuZ2V0VGVzdHMoKTtcbiAgICB9XG5cblxuICAgIHByZWNvbXBpbGUgKHRlc3RGaWxlc0luZm8pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVDb2RlRm9yVGVzdEZpbGVzKHRlc3RGaWxlc0luZm8pO1xuICAgIH1cblxuICAgIGV4ZWN1dGUgKGNvbXBpbGVkQ29kZSwgZmlsZW5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3J1bkNvbXBpbGVkQ29kZShjb21waWxlZENvZGUsIGZpbGVuYW1lKTtcbiAgICB9XG5cbiAgICBhc3luYyBjb21waWxlIChjb2RlLCBmaWxlbmFtZSkge1xuICAgICAgICBjb25zdCBbY29tcGlsZWRDb2RlXSA9IGF3YWl0IHRoaXMucHJlY29tcGlsZShbeyBjb2RlLCBmaWxlbmFtZSB9XSk7XG5cbiAgICAgICAgaWYgKGNvbXBpbGVkQ29kZSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUoY29tcGlsZWRDb2RlLCBmaWxlbmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIF9oYXNUZXN0cyAoY29kZSkge1xuICAgICAgICByZXR1cm4gRklYVFVSRV9SRS50ZXN0KGNvZGUpICYmIFRFU1RfUkUudGVzdChjb2RlKTtcbiAgICB9XG5cbiAgICBjbGVhblVwICgpIHtcbiAgICAgICAgdGhpcy5jYWNoZSA9IHt9O1xuICAgIH1cbn1cbiJdfQ==