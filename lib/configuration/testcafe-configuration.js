"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_base_1 = __importDefault(require("./configuration-base"));
const lodash_1 = require("lodash");
const get_options_1 = require("../utils/get-options");
const option_names_1 = __importDefault(require("./option-names"));
const get_filter_fn_1 = __importDefault(require("../utils/get-filter-fn"));
const prepare_reporters_1 = __importDefault(require("../utils/prepare-reporters"));
const string_1 = require("../utils/string");
const render_template_1 = __importDefault(require("../utils/render-template"));
const warning_message_1 = __importDefault(require("../notifications/warning-message"));
const resolve_path_relatively_cwd_1 = __importDefault(require("../utils/resolve-path-relatively-cwd"));
const default_values_1 = require("./default-values");
const option_source_1 = __importDefault(require("./option-source"));
const customizable_compilers_1 = __importDefault(require("./customizable-compilers"));
const deprecated_1 = require("../notifications/deprecated");
const pool_1 = __importDefault(require("../browser/provider/pool"));
const formats_1 = require("./formats");
const runtime_1 = require("../errors/runtime");
const types_1 = require("../errors/types");
const BASE_CONFIGURATION_FILENAME = '.testcaferc';
const CONFIGURATION_FILENAMES = formats_1.CONFIGURATION_EXTENSIONS.map(ext => `${BASE_CONFIGURATION_FILENAME}${ext}`);
const DEFAULT_SCREENSHOTS_DIRECTORY = 'screenshots';
const OPTION_FLAG_NAMES = [
    option_names_1.default.debugMode,
    option_names_1.default.debugOnFail,
    option_names_1.default.skipUncaughtErrors,
    option_names_1.default.stopOnFirstFail,
    option_names_1.default.takeScreenshotsOnFails,
    option_names_1.default.disablePageCaching,
    option_names_1.default.disablePageReloads,
    option_names_1.default.disableScreenshots,
    option_names_1.default.disableMultipleWindows,
];
const OPTION_INIT_FLAG_NAMES = [
    option_names_1.default.developmentMode,
    option_names_1.default.retryTestPages,
    option_names_1.default.cache,
    option_names_1.default.disableHttp2,
    option_names_1.default.proxyless,
];
class TestCafeConfiguration extends configuration_base_1.default {
    constructor(configFile = '') {
        super(configFile || CONFIGURATION_FILENAMES);
        this._isExplicitConfig = !!configFile;
    }
    async init(options) {
        await super.init();
        const opts = await this._load();
        this._checkUnsecureDataInJSONConfiguration(opts);
        if (opts) {
            this._options = configuration_base_1.default._fromObj(opts);
            await this._normalizeOptionsAfterLoad();
        }
        await this.asyncMergeOptions(options);
    }
    async asyncMergeOptions(options) {
        options = options || {};
        super.mergeOptions(options);
        if (!options.isCli && this._options.browsers)
            this._options.browsers.value = await this._getBrowserInfo();
    }
    prepare() {
        this._prepareFlags();
        this._setDefaultValues();
        this._prepareCompilerOptions();
    }
    notifyAboutOverriddenOptions(warningLog) {
        if (!this._overriddenOptions.length)
            return;
        const optionsStr = (0, string_1.getConcatenatedValuesString)(this._overriddenOptions);
        const optionsSuffix = (0, string_1.getPluralSuffix)(this._overriddenOptions);
        const renderedMessage = (0, render_template_1.default)(warning_message_1.default.configOptionsWereOverridden, optionsStr, optionsSuffix);
        configuration_base_1.default._showConsoleWarning(renderedMessage);
        if (warningLog)
            warningLog.addWarning(renderedMessage);
        this._overriddenOptions = [];
    }
    notifyAboutDeprecatedOptions(warningLog) {
        const deprecatedOptions = this.getOptions((name, option) => name in deprecated_1.DEPRECATED && option.value !== void 0);
        for (const optionName in deprecatedOptions)
            warningLog.addWarning((0, deprecated_1.getDeprecationMessage)(deprecated_1.DEPRECATED[optionName]));
    }
    get startOptions() {
        const result = {
            hostname: this.getOption(option_names_1.default.hostname),
            port1: this.getOption(option_names_1.default.port1),
            port2: this.getOption(option_names_1.default.port2),
            options: {
                ssl: this.getOption(option_names_1.default.ssl),
                developmentMode: this.getOption(option_names_1.default.developmentMode),
                retryTestPages: this.getOption(option_names_1.default.retryTestPages),
                cache: this.getOption(option_names_1.default.cache),
                disableHttp2: this.getOption(option_names_1.default.disableHttp2),
                proxyless: this.getOption(option_names_1.default.proxyless),
            },
        };
        return result;
    }
    _checkUnsecureDataInJSONConfiguration(opts) {
        var _a;
        if (!this._isJSONConfiguration())
            return;
        if ((_a = opts === null || opts === void 0 ? void 0 : opts[option_names_1.default.dashboard]) === null || _a === void 0 ? void 0 : _a.token)
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.dashboardTokenInJSON);
    }
    _prepareFlag(name, source = option_source_1.default.Configuration) {
        const option = this._ensureOption(name, void 0, source);
        option.value = !!option.value;
    }
    _prepareFlags() {
        OPTION_FLAG_NAMES.forEach(name => this._prepareFlag(name));
    }
    _prepareInitFlags() {
        OPTION_INIT_FLAG_NAMES.forEach(name => this._prepareFlag(name, option_source_1.default.Default));
    }
    async _normalizeOptionsAfterLoad() {
        await this._prepareSslOptions();
        this._prepareInitFlags();
        this._prepareFilterFn();
        this._ensureArrayOption(option_names_1.default.src);
        this._ensureArrayOption(option_names_1.default.browsers);
        this._ensureArrayOption(option_names_1.default.clientScripts);
        this._prepareReporters();
    }
    _prepareFilterFn() {
        const filterOption = this._ensureOption(option_names_1.default.filter, default_values_1.DEFAULT_FILTER_FN, option_source_1.default.Default);
        if (!filterOption.value)
            return;
        const filterOptionValue = filterOption.value;
        if (filterOptionValue.testGrep)
            filterOptionValue.testGrep = (0, get_options_1.getGrepOptions)(option_names_1.default.filterTestGrep, filterOptionValue.testGrep);
        if (filterOptionValue.fixtureGrep)
            filterOptionValue.fixtureGrep = (0, get_options_1.getGrepOptions)(option_names_1.default.filterFixtureGrep, filterOptionValue.fixtureGrep);
        filterOption.value = (0, get_filter_fn_1.default)(filterOption.value);
        filterOption.source = option_source_1.default.Configuration;
    }
    _ensureScreenshotOptions() {
        const path = (0, resolve_path_relatively_cwd_1.default)(DEFAULT_SCREENSHOTS_DIRECTORY);
        const screenshots = this._ensureOption(option_names_1.default.screenshots, {}, option_source_1.default.Configuration).value;
        if (!screenshots.path)
            screenshots.path = path;
        if (screenshots.thumbnails === void 0)
            screenshots.thumbnails = default_values_1.DEFAULT_SCREENSHOT_THUMBNAILS;
    }
    _ensureSkipJsOptions() {
        const option = this._ensureOption(option_names_1.default.skipJsErrors, void 0, option_source_1.default.Configuration);
        if (option.value === void 0)
            option.value = !!option.value;
    }
    _prepareReporters() {
        const reporterOption = this._options[option_names_1.default.reporter];
        if (!reporterOption)
            return;
        const optionValue = (0, lodash_1.castArray)(reporterOption.value);
        reporterOption.value = (0, prepare_reporters_1.default)(optionValue);
    }
    async _prepareSslOptions() {
        const sslOptions = this._options[option_names_1.default.ssl];
        if (!sslOptions)
            return;
        sslOptions.value = await (0, get_options_1.getSSLOptions)(sslOptions.value);
    }
    _setDefaultValues() {
        this._ensureOptionWithValue(option_names_1.default.selectorTimeout, default_values_1.DEFAULT_TIMEOUT.selector, option_source_1.default.Configuration);
        this._ensureOptionWithValue(option_names_1.default.assertionTimeout, default_values_1.DEFAULT_TIMEOUT.assertion, option_source_1.default.Configuration);
        this._ensureOptionWithValue(option_names_1.default.pageLoadTimeout, default_values_1.DEFAULT_TIMEOUT.pageLoad, option_source_1.default.Configuration);
        this._ensureOptionWithValue(option_names_1.default.speed, default_values_1.DEFAULT_SPEED_VALUE, option_source_1.default.Configuration);
        this._ensureOptionWithValue(option_names_1.default.appInitDelay, default_values_1.DEFAULT_APP_INIT_DELAY, option_source_1.default.Configuration);
        this._ensureOptionWithValue(option_names_1.default.concurrency, default_values_1.DEFAULT_CONCURRENCY_VALUE, option_source_1.default.Configuration);
        this._ensureOptionWithValue(option_names_1.default.src, default_values_1.DEFAULT_SOURCE_DIRECTORIES, option_source_1.default.Configuration);
        this._ensureOptionWithValue(option_names_1.default.developmentMode, default_values_1.DEFAULT_DEVELOPMENT_MODE, option_source_1.default.Configuration);
        this._ensureOptionWithValue(option_names_1.default.retryTestPages, default_values_1.DEFAULT_RETRY_TEST_PAGES, option_source_1.default.Configuration);
        this._ensureOptionWithValue(option_names_1.default.disableHttp2, default_values_1.DEFAULT_DISABLE_HTTP2, option_source_1.default.Configuration);
        this._ensureOptionWithValue(option_names_1.default.proxyless, default_values_1.DEFAULT_PROXYLESS, option_source_1.default.Configuration);
        this._ensureScreenshotOptions();
        this._ensureSkipJsOptions();
    }
    _prepareCompilerOptions() {
        const compilerOptions = this._ensureOption(option_names_1.default.compilerOptions, (0, default_values_1.getDefaultCompilerOptions)(), option_source_1.default.Configuration);
        compilerOptions.value = compilerOptions.value || (0, default_values_1.getDefaultCompilerOptions)();
        const tsConfigPath = this.getOption(option_names_1.default.tsConfigPath);
        if (tsConfigPath) {
            const compilerOptionValue = compilerOptions.value;
            let typeScriptCompilerOptions = compilerOptionValue[customizable_compilers_1.default.typescript];
            typeScriptCompilerOptions = Object.assign({
                configPath: tsConfigPath,
            }, typeScriptCompilerOptions);
            compilerOptions.value[customizable_compilers_1.default.typescript] = typeScriptCompilerOptions;
        }
    }
    async _getBrowserInfo() {
        if (!this._options.browsers.value)
            return [];
        const browsers = Array.isArray(this._options.browsers.value) ? [...this._options.browsers.value] : [this._options.browsers.value];
        const browserInfo = await Promise.all(browsers.map(browser => pool_1.default.getBrowserInfo(browser)));
        return (0, lodash_1.flatten)(browserInfo);
    }
    async _isConfigurationFileExists(filePath = this.filePath) {
        const fileExists = await super._isConfigurationFileExists(filePath);
        if (!fileExists && this._isExplicitConfig)
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.cannotFindTestcafeConfigurationFile, filePath);
        return fileExists;
    }
    static get FILENAMES() {
        return CONFIGURATION_FILENAMES;
    }
}
exports.default = TestCafeConfiguration;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGNhZmUtY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWd1cmF0aW9uL3Rlc3RjYWZlLWNvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4RUFBaUQ7QUFDakQsbUNBQTRDO0FBQzVDLHNEQUFxRTtBQUNyRSxrRUFBMEM7QUFDMUMsMkVBQWlEO0FBQ2pELG1GQUEwRDtBQUMxRCw0Q0FBK0U7QUFDL0UsK0VBQXNEO0FBQ3RELHVGQUFnRTtBQUNoRSx1R0FBNEU7QUFFNUUscURBYTBCO0FBRTFCLG9FQUEyQztBQVMzQyxzRkFBNkQ7QUFDN0QsNERBQWdGO0FBRWhGLG9FQUEyRDtBQUUzRCx1Q0FBcUQ7QUFDckQsK0NBQWlEO0FBQ2pELDJDQUFpRDtBQUVqRCxNQUFNLDJCQUEyQixHQUFHLGFBQWEsQ0FBQztBQUNsRCxNQUFNLHVCQUF1QixHQUFPLGtDQUF3QixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsMkJBQTJCLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUVoSCxNQUFNLDZCQUE2QixHQUFHLGFBQWEsQ0FBQztBQUVwRCxNQUFNLGlCQUFpQixHQUFHO0lBQ3RCLHNCQUFZLENBQUMsU0FBUztJQUN0QixzQkFBWSxDQUFDLFdBQVc7SUFDeEIsc0JBQVksQ0FBQyxrQkFBa0I7SUFDL0Isc0JBQVksQ0FBQyxlQUFlO0lBQzVCLHNCQUFZLENBQUMsc0JBQXNCO0lBQ25DLHNCQUFZLENBQUMsa0JBQWtCO0lBQy9CLHNCQUFZLENBQUMsa0JBQWtCO0lBQy9CLHNCQUFZLENBQUMsa0JBQWtCO0lBQy9CLHNCQUFZLENBQUMsc0JBQXNCO0NBQ3RDLENBQUM7QUFFRixNQUFNLHNCQUFzQixHQUFHO0lBQzNCLHNCQUFZLENBQUMsZUFBZTtJQUM1QixzQkFBWSxDQUFDLGNBQWM7SUFDM0Isc0JBQVksQ0FBQyxLQUFLO0lBQ2xCLHNCQUFZ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LEtBQUssU0FBUztRQUN2QixPQUFPLHVCQUF1QixDQUFDO0lBQ25DLENBQUM7Q0FDSjtBQXBPRCx3Q0FvT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29uZmlndXJhdGlvbiBmcm9tICcuL2NvbmZpZ3VyYXRpb24tYmFzZSc7XG5pbXBvcnQgeyBjYXN0QXJyYXksIGZsYXR0ZW4gfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgZ2V0R3JlcE9wdGlvbnMsIGdldFNTTE9wdGlvbnMgfSBmcm9tICcuLi91dGlscy9nZXQtb3B0aW9ucyc7XG5pbXBvcnQgT1BUSU9OX05BTUVTIGZyb20gJy4vb3B0aW9uLW5hbWVzJztcbmltcG9ydCBnZXRGaWx0ZXJGbiBmcm9tICcuLi91dGlscy9nZXQtZmlsdGVyLWZuJztcbmltcG9ydCBwcmVwYXJlUmVwb3J0ZXJzIGZyb20gJy4uL3V0aWxzL3ByZXBhcmUtcmVwb3J0ZXJzJztcbmltcG9ydCB7IGdldENvbmNhdGVuYXRlZFZhbHVlc1N0cmluZywgZ2V0UGx1cmFsU3VmZml4IH0gZnJvbSAnLi4vdXRpbHMvc3RyaW5nJztcbmltcG9ydCByZW5kZXJUZW1wbGF0ZSBmcm9tICcuLi91dGlscy9yZW5kZXItdGVtcGxhdGUnO1xuaW1wb3J0IFdBUk5JTkdfTUVTU0FHRVMgZnJvbSAnLi4vbm90aWZpY2F0aW9ucy93YXJuaW5nLW1lc3NhZ2UnO1xuaW1wb3J0IHJlc29sdmVQYXRoUmVsYXRpdmVseUN3ZCBmcm9tICcuLi91dGlscy9yZXNvbHZlLXBhdGgtcmVsYXRpdmVseS1jd2QnO1xuXG5pbXBvcnQge1xuICAgIERFRkFVTFRfQVBQX0lOSVRfREVMQVksXG4gICAgREVGQVVMVF9DT05DVVJSRU5DWV9WQUxVRSxcbiAgICBERUZBVUxUX0RFVkVMT1BNRU5UX01PREUsXG4gICAgREVGQVVMVF9ESVNBQkxFX0hUVFAyLFxuICAgIERFRkFVTFRfRklMVEVSX0ZOLFxuICAgIERFRkFVTFRfUFJPWFlMRVNTLFxuICAgIERFRkFVTFRfUkVUUllfVEVTVF9QQUdFUyxcbiAgICBERUZBVUxUX1NDUkVFTlNIT1RfVEhVTUJOQUlMUyxcbiAgICBERUZBVUxUX1NPVVJDRV9ESVJFQ1RPUklFUyxcbiAgICBERUZBVUxUX1NQRUVEX1ZBTFVFLFxuICAgIERFRkFVTFRfVElNRU9VVCxcbiAgICBnZXREZWZhdWx0Q29tcGlsZXJPcHRpb25zLFxufSBmcm9tICcuL2RlZmF1bHQtdmFsdWVzJztcblxuaW1wb3J0IE9wdGlvblNvdXJjZSBmcm9tICcuL29wdGlvbi1zb3VyY2UnO1xuXG5pbXBvcnQge1xuICAgIERpY3Rpb25hcnksXG4gICAgRmlsdGVyT3B0aW9uLFxuICAgIFJlcG9ydGVyT3B0aW9uLFxuICAgIFR5cGVTY3JpcHRDb21waWxlck9wdGlvbnMsXG59IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmltcG9ydCBDdXN0b21pemFibGVDb21waWxlcnMgZnJvbSAnLi9jdXN0b21pemFibGUtY29tcGlsZXJzJztcbmltcG9ydCB7IERFUFJFQ0FURUQsIGdldERlcHJlY2F0aW9uTWVzc2FnZSB9IGZyb20gJy4uL25vdGlmaWNhdGlvbnMvZGVwcmVjYXRlZCc7XG5pbXBvcnQgV2FybmluZ0xvZyBmcm9tICcuLi9ub3RpZmljYXRpb25zL3dhcm5pbmctbG9nJztcbmltcG9ydCBicm93c2VyUHJvdmlkZXJQb29sIGZyb20gJy4uL2Jyb3dzZXIvcHJvdmlkZXIvcG9vbCc7XG5pbXBvcnQgQnJvd3NlckNvbm5lY3Rpb24sIHsgQnJvd3NlckluZm8gfSBmcm9tICcuLi9icm93c2VyL2Nvbm5lY3Rpb24nO1xuaW1wb3J0IHsgQ09ORklHVVJBVElPTl9FWFRFTlNJT05TIH0gZnJvbSAnLi9mb3JtYXRzJztcbmltcG9ydCB7IEdlbmVyYWxFcnJvciB9IGZyb20gJy4uL2Vycm9ycy9ydW50aW1lJztcbmltcG9ydCB7IFJVTlRJTUVfRVJST1JTIH0gZnJvbSAnLi4vZXJyb3JzL3R5cGVzJztcblxuY29uc3QgQkFTRV9DT05GSUdVUkFUSU9OX0ZJTEVOQU1FID0gJy50ZXN0Y2FmZXJjJztcbmNvbnN0IENPTkZJR1VSQVRJT05fRklMRU5BTUVTICAgICA9IENPTkZJR1VSQVRJT05fRVhURU5TSU9OUy5tYXAoZXh0ID0+IGAke0JBU0VfQ09ORklHVVJBVElPTl9GSUxFTkFNRX0ke2V4dH1gKTtcblxuY29uc3QgREVGQVVMVF9TQ1JFRU5TSE9UU19ESVJFQ1RPUlkgPSAnc2NyZWVuc2hvdHMnO1xuXG5jb25zdCBPUFRJT05fRkxBR19OQU1FUyA9IFtcbiAgICBPUFRJT05fTkFNRVMuZGVidWdNb2RlLFxuICAgIE9QVElPTl9OQU1FUy5kZWJ1Z09uRmFpbCxcbiAgICBPUFRJT05fTkFNRVMuc2tpcFVuY2F1Z2h0RXJyb3JzLFxuICAgIE9QVElPTl9OQU1FUy5zdG9wT25GaXJzdEZhaWwsXG4gICAgT1BUSU9OX05BTUVTLnRha2VTY3JlZW5zaG90c09uRmFpbHMsXG4gICAgT1BUSU9OX05BTUVTLmRpc2FibGVQYWdlQ2FjaGluZyxcbiAgICBPUFRJT05fTkFNRVMuZGlzYWJsZVBhZ2VSZWxvYWRzLFxuICAgIE9QVElPTl9OQU1FUy5kaXNhYmxlU2NyZWVuc2hvdHMsXG4gICAgT1BUSU9OX05BTUVTLmRpc2FibGVNdWx0aXBsZVdpbmRvd3MsXG5dO1xuXG5jb25zdCBPUFRJT05fSU5JVF9GTEFHX05BTUVTID0gW1xuICAgIE9QVElPTl9OQU1FUy5kZXZlbG9wbWVudE1vZGUsXG4gICAgT1BUSU9OX05BTUVTLnJldHJ5VGVzdFBhZ2VzLFxuICAgIE9QVElPTl9OQU1FUy5jYWNoZSxcbiAgICBPUFRJT05fTkFNRVMuZGlzYWJsZUh0dHAyLFxuICAgIE9QVElPTl9OQU1FUy5wcm94eWxlc3MsXG5dO1xuXG5pbnRlcmZhY2UgVGVzdENhZmVBZGRpdGlvbmFsU3RhcnRPcHRpb25zIHtcbiAgICByZXRyeVRlc3RQYWdlczogYm9vbGVhbjtcbiAgICBzc2w6IHN0cmluZztcbiAgICBkZXZlbG9wbWVudE1vZGU6IGJvb2xlYW47XG4gICAgY2FjaGU6IGJvb2xlYW47XG4gICAgZGlzYWJsZUh0dHAyOiBib29sZWFuO1xuICAgIHByb3h5bGVzczogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIFRlc3RDYWZlU3RhcnRPcHRpb25zIHtcbiAgICBob3N0bmFtZT86IHN0cmluZztcbiAgICBwb3J0MT86IG51bWJlcjtcbiAgICBwb3J0Mj86IG51bWJlcjtcbiAgICBvcHRpb25zOiBUZXN0Q2FmZUFkZGl0aW9uYWxTdGFydE9wdGlvbnM7XG59XG5cbnR5cGUgQnJvd3NlckluZm9Tb3VyY2UgPSBCcm93c2VySW5mbyB8IEJyb3dzZXJDb25uZWN0aW9uO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0Q2FmZUNvbmZpZ3VyYXRpb24gZXh0ZW5kcyBDb25maWd1cmF0aW9uIHtcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2lzRXhwbGljaXRDb25maWc6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKGNvbmZpZ0ZpbGUgPSAnJykge1xuICAgICAgICBzdXBlcihjb25maWdGaWxlIHx8IENPTkZJR1VSQVRJT05fRklMRU5BTUVTKTtcblxuICAgICAgICB0aGlzLl9pc0V4cGxpY2l0Q29uZmlnID0gISFjb25maWdGaWxlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBpbml0IChvcHRpb25zPzogRGljdGlvbmFyeTxvYmplY3Q+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IHN1cGVyLmluaXQoKTtcblxuICAgICAgICBjb25zdCBvcHRzID0gYXdhaXQgdGhpcy5fbG9hZCgpO1xuXG4gICAgICAgIHRoaXMuX2NoZWNrVW5zZWN1cmVEYXRhSW5KU09OQ29uZmlndXJhdGlvbihvcHRzKTtcblxuICAgICAgICBpZiAob3B0cykge1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IENvbmZpZ3VyYXRpb24uX2Zyb21PYmoob3B0cyk7XG5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX25vcm1hbGl6ZU9wdGlvbnNBZnRlckxvYWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuYXN5bmNNZXJnZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGFzeW5jTWVyZ2VPcHRpb25zIChvcHRpb25zPzogRGljdGlvbmFyeTxvYmplY3Q+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICAgIHN1cGVyLm1lcmdlT3B0aW9ucyhvcHRpb25zKTtcblxuICAgICAgICBpZiAoIW9wdGlvbnMuaXNDbGkgJiYgdGhpcy5fb3B0aW9ucy5icm93c2VycylcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYnJvd3NlcnMudmFsdWUgPSBhd2FpdCB0aGlzLl9nZXRCcm93c2VySW5mbygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwcmVwYXJlICgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcHJlcGFyZUZsYWdzKCk7XG4gICAgICAgIHRoaXMuX3NldERlZmF1bHRWYWx1ZXMoKTtcbiAgICAgICAgdGhpcy5fcHJlcGFyZUNvbXBpbGVyT3B0aW9ucygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBub3RpZnlBYm91dE92ZXJyaWRkZW5PcHRpb25zICh3YXJuaW5nTG9nPzogV2FybmluZ0xvZyk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX292ZXJyaWRkZW5PcHRpb25zLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBjb25zdCBvcHRpb25zU3RyICAgID0gZ2V0Q29uY2F0ZW5hdGVkVmFsdWVzU3RyaW5nKHRoaXMuX292ZXJyaWRkZW5PcHRpb25zKTtcbiAgICAgICAgY29uc3Qgb3B0aW9uc1N1ZmZpeCA9IGdldFBsdXJhbFN1ZmZpeCh0aGlzLl9vdmVycmlkZGVuT3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVkTWVzc2FnZSA9IHJlbmRlclRlbXBsYXRlKFdBUk5JTkdfTUVTU0FHRVMuY29uZmlnT3B0aW9uc1dlcmVPdmVycmlkZGVuLCBvcHRpb25zU3RyLCBvcHRpb25zU3VmZml4KTtcblxuICAgICAgICBDb25maWd1cmF0aW9uLl9zaG93Q29uc29sZVdhcm5pbmcocmVuZGVyZWRNZXNzYWdlKTtcblxuICAgICAgICBpZiAod2FybmluZ0xvZylcbiAgICAgICAgICAgIHdhcm5pbmdMb2cuYWRkV2FybmluZyhyZW5kZXJlZE1lc3NhZ2UpO1xuXG4gICAgICAgIHRoaXMuX292ZXJyaWRkZW5PcHRpb25zID0gW107XG4gICAgfVxuXG4gICAgcHVibGljIG5vdGlmeUFib3V0RGVwcmVjYXRlZE9wdGlvbnMgKHdhcm5pbmdMb2c6IFdhcm5pbmdMb2cpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGVwcmVjYXRlZE9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKG5hbWUsIG9wdGlvbikgPT4gbmFtZSBpbiBERVBSRUNBVEVEICYmIG9wdGlvbi52YWx1ZSAhPT0gdm9pZCAwKTtcblxuICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbk5hbWUgaW4gZGVwcmVjYXRlZE9wdGlvbnMpXG4gICAgICAgICAgICB3YXJuaW5nTG9nLmFkZFdhcm5pbmcoZ2V0RGVwcmVjYXRpb25NZXNzYWdlKERFUFJFQ0FURURbb3B0aW9uTmFtZV0pKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN0YXJ0T3B0aW9ucyAoKTogVGVzdENhZmVTdGFydE9wdGlvbnMge1xuICAgICAgICBjb25zdCByZXN1bHQ6IFRlc3RDYWZlU3RhcnRPcHRpb25zID0ge1xuICAgICAgICAgICAgaG9zdG5hbWU6IHRoaXMuZ2V0T3B0aW9uKE9QVElPTl9OQU1FUy5ob3N0bmFtZSkgYXMgc3RyaW5nLFxuICAgICAgICAgICAgcG9ydDE6ICAgIHRoaXMuZ2V0T3B0aW9uKE9QVElPTl9OQU1FUy5wb3J0MSkgYXMgbnVtYmVyLFxuICAgICAgICAgICAgcG9ydDI6ICAgIHRoaXMuZ2V0T3B0aW9uKE9QVElPTl9OQU1FUy5wb3J0MikgYXMgbnVtYmVyLFxuXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgc3NsOiAgICAgICAgICAgICB0aGlzLmdldE9wdGlvbihPUFRJT05fTkFNRVMuc3NsKSBhcyBzdHJpbmcsXG4gICAgICAgICAgICAgICAgZGV2ZWxvcG1lbnRNb2RlOiB0aGlzLmdldE9wdGlvbihPUFRJT05fTkFNRVMuZGV2ZWxvcG1lbnRNb2RlKSBhcyBib29sZWFuLFxuICAgICAgICAgICAgICAgIHJldHJ5VGVzdFBhZ2VzOiAgdGhpcy5nZXRPcHRpb24oT1BUSU9OX05BTUVTLnJldHJ5VGVzdFBhZ2VzKSBhcyBib29sZWFuLFxuICAgICAgICAgICAgICAgIGNhY2hlOiAgICAgICAgICAgdGhpcy5nZXRPcHRpb24oT1BUSU9OX05BTUVTLmNhY2hlKSBhcyBib29sZWFuLFxuICAgICAgICAgICAgICAgIGRpc2FibGVIdHRwMjogICAgdGhpcy5nZXRPcHRpb24oT1BUSU9OX05BTUVTLmRpc2FibGVIdHRwMikgYXMgYm9vbGVhbixcbiAgICAgICAgICAgICAgICBwcm94eWxlc3M6ICAgICAgIHRoaXMuZ2V0T3B0aW9uKE9QVElPTl9OQU1FUy5wcm94eWxlc3MpIGFzIGJvb2xlYW4sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2hlY2tVbnNlY3VyZURhdGFJbkpTT05Db25maWd1cmF0aW9uIChvcHRzOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0pTT05Db25maWd1cmF0aW9uKCkpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgaWYgKG9wdHM/LltPUFRJT05fTkFNRVMuZGFzaGJvYXJkXT8udG9rZW4pXG4gICAgICAgICAgICB0aHJvdyBuZXcgR2VuZXJhbEVycm9yKFJVTlRJTUVfRVJST1JTLmRhc2hib2FyZFRva2VuSW5KU09OKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBfcHJlcGFyZUZsYWcgKG5hbWU6IHN0cmluZywgc291cmNlID0gT3B0aW9uU291cmNlLkNvbmZpZ3VyYXRpb24pOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gdGhpcy5fZW5zdXJlT3B0aW9uKG5hbWUsIHZvaWQgMCwgc291cmNlKTtcblxuICAgICAgICBvcHRpb24udmFsdWUgPSAhIW9wdGlvbi52YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wcmVwYXJlRmxhZ3MgKCk6IHZvaWQge1xuICAgICAgICBPUFRJT05fRkxBR19OQU1FUy5mb3JFYWNoKG5hbWUgPT4gdGhpcy5fcHJlcGFyZUZsYWcobmFtZSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3ByZXBhcmVJbml0RmxhZ3MgKCk6IHZvaWQge1xuICAgICAgICBPUFRJT05fSU5JVF9GTEFHX05BTUVTLmZvckVhY2gobmFtZSA9PiB0aGlzLl9wcmVwYXJlRmxhZyhuYW1lLCBPcHRpb25Tb3VyY2UuRGVmYXVsdCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgX25vcm1hbGl6ZU9wdGlvbnNBZnRlckxvYWQgKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLl9wcmVwYXJlU3NsT3B0aW9ucygpO1xuICAgICAgICB0aGlzLl9wcmVwYXJlSW5pdEZsYWdzKCk7XG4gICAgICAgIHRoaXMuX3ByZXBhcmVGaWx0ZXJGbigpO1xuICAgICAgICB0aGlzLl9lbnN1cmVBcnJheU9wdGlvbihPUFRJT05fTkFNRVMuc3JjKTtcbiAgICAgICAgdGhpcy5fZW5zdXJlQXJyYXlPcHRpb24oT1BUSU9OX05BTUVTLmJyb3dzZXJzKTtcbiAgICAgICAgdGhpcy5fZW5zdXJlQXJyYXlPcHRpb24oT1BUSU9OX05BTUVTLmNsaWVudFNjcmlwdHMpO1xuICAgICAgICB0aGlzLl9wcmVwYXJlUmVwb3J0ZXJzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcHJlcGFyZUZpbHRlckZuICgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZmlsdGVyT3B0aW9uID0gdGhpcy5fZW5zdXJlT3B0aW9uKE9QVElPTl9OQU1FUy5maWx0ZXIsIERFRkFVTFRfRklMVEVSX0ZOLCBPcHRpb25Tb3VyY2UuRGVmYXVsdCk7XG5cbiAgICAgICAgaWYgKCFmaWx0ZXJPcHRpb24udmFsdWUpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgY29uc3QgZmlsdGVyT3B0aW9uVmFsdWUgPSBmaWx0ZXJPcHRpb24udmFsdWUgYXMgRmlsdGVyT3B0aW9uO1xuXG4gICAgICAgIGlmIChmaWx0ZXJPcHRpb25WYWx1ZS50ZXN0R3JlcClcbiAgICAgICAgICAgIGZpbHRlck9wdGlvblZhbHVlLnRlc3RHcmVwID0gZ2V0R3JlcE9wdGlvbnMoT1BUSU9OX05BTUVTLmZpbHRlclRlc3RHcmVwLCBmaWx0ZXJPcHRpb25WYWx1ZS50ZXN0R3JlcCBhcyBzdHJpbmcpO1xuXG4gICAgICAgIGlmIChmaWx0ZXJPcHRpb25WYWx1ZS5maXh0dXJlR3JlcClcbiAgICAgICAgICAgIGZpbHRlck9wdGlvblZhbHVlLmZpeHR1cmVHcmVwID0gZ2V0R3JlcE9wdGlvbnMoT1BUSU9OX05BTUVTLmZpbHRlckZpeHR1cmVHcmVwLCBmaWx0ZXJPcHRpb25WYWx1ZS5maXh0dXJlR3JlcCBhcyBzdHJpbmcpO1xuXG4gICAgICAgIGZpbHRlck9wdGlvbi52YWx1ZSAgPSBnZXRGaWx0ZXJGbihmaWx0ZXJPcHRpb24udmFsdWUpIGFzIEZ1bmN0aW9uO1xuICAgICAgICBmaWx0ZXJPcHRpb24uc291cmNlID0gT3B0aW9uU291cmNlLkNvbmZpZ3VyYXRpb247XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZW5zdXJlU2NyZWVuc2hvdE9wdGlvbnMgKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBwYXRoICAgICAgICA9IHJlc29sdmVQYXRoUmVsYXRpdmVseUN3ZChERUZBVUxUX1NDUkVFTlNIT1RTX0RJUkVDVE9SWSk7XG4gICAgICAgIGNvbnN0IHNjcmVlbnNob3RzID0gdGhpcy5fZW5zdXJlT3B0aW9uKE9QVElPTl9OQU1FUy5zY3JlZW5zaG90cywge30sIE9wdGlvblNvdXJjZS5Db25maWd1cmF0aW9uKS52YWx1ZSBhcyBEaWN0aW9uYXJ5PHN0cmluZ3xib29sZWFuPjtcblxuICAgICAgICBpZiAoIXNjcmVlbnNob3RzLnBhdGgpXG4gICAgICAgICAgICBzY3JlZW5zaG90cy5wYXRoID0gcGF0aDtcblxuICAgICAgICBpZiAoc2NyZWVuc2hvdHMudGh1bWJuYWlscyA9PT0gdm9pZCAwKVxuICAgICAgICAgICAgc2NyZWVuc2hvdHMudGh1bWJuYWlscyA9IERFRkFVTFRfU0NSRUVOU0hPVF9USFVNQk5BSUxTO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Vuc3VyZVNraXBKc09wdGlvbnMgKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBvcHRpb24gPSB0aGlzLl9lbnN1cmVPcHRpb24oT1BUSU9OX05BTUVTLnNraXBKc0Vycm9ycywgdm9pZCAwLCBPcHRpb25Tb3VyY2UuQ29uZmlndXJhdGlvbik7XG5cbiAgICAgICAgaWYgKG9wdGlvbi52YWx1ZSA9PT0gdm9pZCAwKVxuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gISFvcHRpb24udmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcHJlcGFyZVJlcG9ydGVycyAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHJlcG9ydGVyT3B0aW9uID0gdGhpcy5fb3B0aW9uc1tPUFRJT05fTkFNRVMucmVwb3J0ZXJdO1xuXG4gICAgICAgIGlmICghcmVwb3J0ZXJPcHRpb24pXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uVmFsdWUgPSBjYXN0QXJyYXkocmVwb3J0ZXJPcHRpb24udmFsdWUgYXMgUmVwb3J0ZXJPcHRpb24pO1xuXG4gICAgICAgIHJlcG9ydGVyT3B0aW9uLnZhbHVlID0gcHJlcGFyZVJlcG9ydGVycyhvcHRpb25WYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfcHJlcGFyZVNzbE9wdGlvbnMgKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBzc2xPcHRpb25zID0gdGhpcy5fb3B0aW9uc1tPUFRJT05fTkFNRVMuc3NsXTtcblxuICAgICAgICBpZiAoIXNzbE9wdGlvbnMpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgc3NsT3B0aW9ucy52YWx1ZSA9IGF3YWl0IGdldFNTTE9wdGlvbnMoc3NsT3B0aW9ucy52YWx1ZSBhcyBzdHJpbmcpIGFzIERpY3Rpb25hcnk8c3RyaW5nIHwgYm9vbGVhbiB8IG51bWJlcj47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2V0RGVmYXVsdFZhbHVlcyAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2Vuc3VyZU9wdGlvbldpdGhWYWx1ZShPUFRJT05fTkFNRVMuc2VsZWN0b3JUaW1lb3V0LCBERUZBVUxUX1RJTUVPVVQuc2VsZWN0b3IsIE9wdGlvblNvdXJjZS5Db25maWd1cmF0aW9uKTtcbiAgICAgICAgdGhpcy5fZW5zdXJlT3B0aW9uV2l0aFZhbHVlKE9QVElPTl9OQU1FUy5hc3NlcnRpb25UaW1lb3V0LCBERUZBVUxUX1RJTUVPVVQuYXNzZXJ0aW9uLCBPcHRpb25Tb3VyY2UuQ29uZmlndXJhdGlvbik7XG4gICAgICAgIHRoaXMuX2Vuc3VyZU9wdGlvbldpdGhWYWx1ZShPUFRJT05fTkFNRVMucGFnZUxvYWRUaW1lb3V0LCBERUZBVUxUX1RJTUVPVVQucGFnZUxvYWQsIE9wdGlvblNvdXJjZS5Db25maWd1cmF0aW9uKTtcbiAgICAgICAgdGhpcy5fZW5zdXJlT3B0aW9uV2l0aFZhbHVlKE9QVElPTl9OQU1FUy5zcGVlZCwgREVGQVVMVF9TUEVFRF9WQUxVRSwgT3B0aW9uU291cmNlLkNvbmZpZ3VyYXRpb24pO1xuICAgICAgICB0aGlzLl9lbnN1cmVPcHRpb25XaXRoVmFsdWUoT1BUSU9OX05BTUVTLmFwcEluaXREZWxheSwgREVGQVVMVF9BUFBfSU5JVF9ERUxBWSwgT3B0aW9uU291cmNlLkNvbmZpZ3VyYXRpb24pO1xuICAgICAgICB0aGlzLl9lbnN1cmVPcHRpb25XaXRoVmFsdWUoT1BUSU9OX05BTUVTLmNvbmN1cnJlbmN5LCBERUZBVUxUX0NPTkNVUlJFTkNZX1ZBTFVFLCBPcHRpb25Tb3VyY2UuQ29uZmlndXJhdGlvbik7XG4gICAgICAgIHRoaXMuX2Vuc3VyZU9wdGlvbldpdGhWYWx1ZShPUFRJT05fTkFNRVMuc3JjLCBERUZBVUxUX1NPVVJDRV9ESVJFQ1RPUklFUywgT3B0aW9uU291cmNlLkNvbmZpZ3VyYXRpb24pO1xuICAgICAgICB0aGlzLl9lbnN1cmVPcHRpb25XaXRoVmFsdWUoT1BUSU9OX05BTUVTLmRldmVsb3BtZW50TW9kZSwgREVGQVVMVF9ERVZFTE9QTUVOVF9NT0RFLCBPcHRpb25Tb3VyY2UuQ29uZmlndXJhdGlvbik7XG4gICAgICAgIHRoaXMuX2Vuc3VyZU9wdGlvbldpdGhWYWx1ZShPUFRJT05fTkFNRVMucmV0cnlUZXN0UGFnZXMsIERFRkFVTFRfUkVUUllfVEVTVF9QQUdFUywgT3B0aW9uU291cmNlLkNvbmZpZ3VyYXRpb24pO1xuICAgICAgICB0aGlzLl9lbnN1cmVPcHRpb25XaXRoVmFsdWUoT1BUSU9OX05BTUVTLmRpc2FibGVIdHRwMiwgREVGQVVMVF9ESVNBQkxFX0hUVFAyLCBPcHRpb25Tb3VyY2UuQ29uZmlndXJhdGlvbik7XG4gICAgICAgIHRoaXMuX2Vuc3VyZU9wdGlvbldpdGhWYWx1ZShPUFRJT05fTkFNRVMucHJveHlsZXNzLCBERUZBVUxUX1BST1hZTEVTUywgT3B0aW9uU291cmNlLkNvbmZpZ3VyYXRpb24pO1xuXG4gICAgICAgIHRoaXMuX2Vuc3VyZVNjcmVlbnNob3RPcHRpb25zKCk7XG4gICAgICAgIHRoaXMuX2Vuc3VyZVNraXBKc09wdGlvbnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wcmVwYXJlQ29tcGlsZXJPcHRpb25zICgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY29tcGlsZXJPcHRpb25zID0gdGhpcy5fZW5zdXJlT3B0aW9uKE9QVElPTl9OQU1FUy5jb21waWxlck9wdGlvbnMsIGdldERlZmF1bHRDb21waWxlck9wdGlvbnMoKSwgT3B0aW9uU291cmNlLkNvbmZpZ3VyYXRpb24pO1xuXG4gICAgICAgIGNvbXBpbGVyT3B0aW9ucy52YWx1ZSA9IGNvbXBpbGVyT3B0aW9ucy52YWx1ZSB8fCBnZXREZWZhdWx0Q29tcGlsZXJPcHRpb25zKCk7XG5cbiAgICAgICAgY29uc3QgdHNDb25maWdQYXRoID0gdGhpcy5nZXRPcHRpb24oT1BUSU9OX05BTUVTLnRzQ29uZmlnUGF0aCk7XG5cbiAgICAgICAgaWYgKHRzQ29uZmlnUGF0aCkge1xuICAgICAgICAgICAgY29uc3QgY29tcGlsZXJPcHRpb25WYWx1ZSAgICAgPSBjb21waWxlck9wdGlvbnMudmFsdWUgYXMgQ29tcGlsZXJPcHRpb25zO1xuICAgICAgICAgICAgbGV0IHR5cGVTY3JpcHRDb21waWxlck9wdGlvbnMgPSBjb21waWxlck9wdGlvblZhbHVlW0N1c3RvbWl6YWJsZUNvbXBpbGVycy50eXBlc2NyaXB0XSBhcyBUeXBlU2NyaXB0Q29tcGlsZXJPcHRpb25zO1xuXG4gICAgICAgICAgICB0eXBlU2NyaXB0Q29tcGlsZXJPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICAgICAgY29uZmlnUGF0aDogdHNDb25maWdQYXRoLFxuICAgICAgICAgICAgfSwgdHlwZVNjcmlwdENvbXBpbGVyT3B0aW9ucyk7XG5cbiAgICAgICAgICAgIChjb21waWxlck9wdGlvbnMudmFsdWUgYXMgQ29tcGlsZXJPcHRpb25zKVtDdXN0b21pemFibGVDb21waWxlcnMudHlwZXNjcmlwdF0gPSB0eXBlU2NyaXB0Q29tcGlsZXJPcHRpb25zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfZ2V0QnJvd3NlckluZm8gKCk6IFByb21pc2U8QnJvd3NlckluZm9Tb3VyY2VbXT4ge1xuICAgICAgICBpZiAoIXRoaXMuX29wdGlvbnMuYnJvd3NlcnMudmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gW107XG5cbiAgICAgICAgY29uc3QgYnJvd3NlcnMgPSBBcnJheS5pc0FycmF5KHRoaXMuX29wdGlvbnMuYnJvd3NlcnMudmFsdWUpID8gWy4uLnRoaXMuX29wdGlvbnMuYnJvd3NlcnMudmFsdWVdIDogW3RoaXMuX29wdGlvbnMuYnJvd3NlcnMudmFsdWVdO1xuXG4gICAgICAgIGNvbnN0IGJyb3dzZXJJbmZvID0gYXdhaXQgUHJvbWlzZS5hbGwoYnJvd3NlcnMubWFwKGJyb3dzZXIgPT4gYnJvd3NlclByb3ZpZGVyUG9vbC5nZXRCcm93c2VySW5mbyhicm93c2VyKSkpO1xuXG4gICAgICAgIHJldHVybiBmbGF0dGVuKGJyb3dzZXJJbmZvKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXN5bmMgX2lzQ29uZmlndXJhdGlvbkZpbGVFeGlzdHMgKGZpbGVQYXRoID0gdGhpcy5maWxlUGF0aCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBmaWxlRXhpc3RzID0gYXdhaXQgc3VwZXIuX2lzQ29uZmlndXJhdGlvbkZpbGVFeGlzdHMoZmlsZVBhdGgpO1xuXG4gICAgICAgIGlmICghZmlsZUV4aXN0cyAmJiB0aGlzLl9pc0V4cGxpY2l0Q29uZmlnKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEdlbmVyYWxFcnJvcihSVU5USU1FX0VSUk9SUy5jYW5ub3RGaW5kVGVzdGNhZmVDb25maWd1cmF0aW9uRmlsZSwgZmlsZVBhdGgpO1xuXG4gICAgICAgIHJldHVybiBmaWxlRXhpc3RzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEZJTEVOQU1FUyAoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gQ09ORklHVVJBVElPTl9GSUxFTkFNRVM7XG4gICAgfVxufVxuIl19