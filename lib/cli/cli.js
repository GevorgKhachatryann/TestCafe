"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const runtime_1 = require("../errors/runtime");
const types_1 = require("../errors/types");
const argument_parser_1 = __importDefault(require("./argument-parser"));
const termination_handler_1 = __importDefault(require("./termination-handler"));
const log_1 = __importDefault(require("./log"));
const remotes_wizard_1 = __importDefault(require("./remotes-wizard"));
const correct_browsers_and_sources_1 = __importDefault(require("./correct-browsers-and-sources"));
const __1 = __importDefault(require("../"));
const debug_1 = __importDefault(require("debug"));
const log_entry_1 = __importDefault(require("../utils/log-entry"));
const dashboard_1 = __importDefault(require("../dashboard"));
const LOGGER = (0, debug_1.default)('testcafe:cli');
// NOTE: Load the provider pool lazily to reduce startup time
const lazyRequire = require('import-lazy')(require);
const browserProviderPool = lazyRequire('../browser/provider/pool');
let showMessageOnExit = true;
let exitMessageShown = false;
let exiting = false;
function exitHandler(terminationLevel) {
    if (showMessageOnExit && !exitMessageShown) {
        exitMessageShown = true;
        log_1.default.write('Stopping TestCafe...');
        process.on('exit', () => log_1.default.hideSpinner(true));
    }
    if (exiting || terminationLevel < 2)
        return;
    exiting = true;
    exit(0);
}
function exit(code) {
    log_1.default.hideSpinner(true);
    // NOTE: give a process time to flush the output.
    // It's necessary in some environments.
    setTimeout(() => process.exit(code), 0);
}
function error(err) {
    log_1.default.hideSpinner();
    let message = null;
    if (err instanceof runtime_1.GeneralError)
        message = err.message;
    else if (err instanceof runtime_1.APIError)
        message = err.coloredStack;
    else
        message = err.stack;
    log_1.default.write(chalk_1.default.red('ERROR ') + message + '\n');
    log_1.default.write(chalk_1.default.gray('Type "testcafe -h" for help.'));
    exit(1);
}
async function runTests(argParser) {
    const opts = argParser.opts;
    const port1 = opts.ports && opts.ports[0];
    const port2 = opts.ports && opts.ports[1];
    const proxy = opts.proxy;
    const proxyBypass = opts.proxyBypass;
    const configFile = opts.configFile;
    log_1.default.showSpinner();
    const { hostname, ssl, dev, experimentalDebug, retryTestPages, cache, disableHttp2, v8Flags, proxyless, } = opts;
    const testCafe = await (0, __1.default)({
        developmentMode: dev,
        isCli: true,
        hostname,
        port1,
        port2,
        ssl,
        experimentalDebug,
        retryTestPages,
        cache,
        configFile,
        disableHttp2,
        v8Flags,
        proxyless,
    });
    const correctedBrowsersAndSources = await (0, correct_browsers_and_sources_1.default)(argParser, testCafe.configuration);
    const automatedBrowsers = correctedBrowsersAndSources.browsers;
    const remoteBrowsers = await (0, remotes_wizard_1.default)(testCafe, argParser.remoteCount, opts.qrCode);
    const browsers = automatedBrowsers.concat(remoteBrowsers);
    const sources = correctedBrowsersAndSources.sources;
    const runner = opts.live ? testCafe.createLiveModeRunner() : testCafe.createRunner();
    let failed = 0;
    runner
        .useProxy(proxy, proxyBypass)
        .src(sources)
        .tsConfigPath(argParser.opts.tsConfigPath)
        .browsers(browsers)
        .reporter(argParser.opts.reporter)
        .concurrency(argParser.opts.concurrency)
        .filter(argParser.opts.filter)
        .video(opts.video, opts.videoOptions, opts.videoEncodingOptions)
        .screenshots(opts.screenshots)
        .startApp(opts.app, opts.appInitDelay)
        .clientScripts(argParser.opts.clientScripts)
        .compilerOptions(argParser.opts.compilerOptions);
    runner.once('done-bootstrapping', () => log_1.default.hideSpinner());
    try {
        const runOpts = argParser.getRunOptions();
        failed = await runner.run(runOpts);
    }
    finally {
        showMessageOnExit = false;
        await testCafe.close();
    }
    exit(failed);
}
async function runDashboardIntegration(state) {
    await (0, dashboard_1.default)(state);
    exit(0);
}
async function listBrowsers(providerName) {
    const provider = await browserProviderPool.getProvider(providerName);
    if (!provider)
        throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.browserProviderNotFound, providerName);
    if (provider.isMultiBrowser) {
        const browserNames = await provider.getBrowserList();
        await browserProviderPool.dispose();
        if (providerName === 'locally-installed')
            console.log(browserNames.join('\n'));
        else
            console.log(browserNames.map(browserName => `"${providerName}:${browserName}"`).join('\n'));
    }
    else
        console.log(`"${providerName}"`);
    exit(0);
}
(async function cli() {
    const terminationHandler = new termination_handler_1.default();
    terminationHandler.on(termination_handler_1.default.TERMINATION_LEVEL_INCREASED_EVENT, exitHandler);
    try {
        const argParser = new argument_parser_1.default();
        (0, log_entry_1.default)(LOGGER, process.argv);
        await argParser.parse(process.argv);
        (0, log_entry_1.default)(LOGGER, argParser.opts);
        if (argParser.isDashboardCommand)
            await runDashboardIntegration(argParser.sendReportState);
        else if (argParser.opts.listBrowsers)
            await listBrowsers(argParser.opts.providerName);
        else
            await runTests(argParser);
    }
    catch (err) {
        showMessageOnExit = false;
        error(err);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaS9jbGkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsK0NBQTJEO0FBQzNELDJDQUFpRDtBQUNqRCx3RUFBa0Q7QUFDbEQsZ0ZBQXVEO0FBQ3ZELGdEQUF3QjtBQUN4QixzRUFBNkM7QUFDN0Msa0dBQXVFO0FBQ3ZFLDRDQUFpQztBQUNqQyxrREFBMEI7QUFDMUIsbUVBQTBDO0FBQzFDLDZEQUFnRDtBQUVoRCxNQUFNLE1BQU0sR0FBRyxJQUFBLGVBQUssRUFBQyxjQUFjLENBQUMsQ0FBQztBQUVyQyw2REFBNkQ7QUFDN0QsTUFBTSxXQUFXLEdBQVcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVELE1BQU0sbUJBQW1CLEdBQUcsV0FBVyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFFcEUsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUM7QUFDN0IsSUFBSSxnQkFBZ0IsR0FBSSxLQUFLLENBQUM7QUFDOUIsSUFBSSxPQUFPLEdBQWEsS0FBSyxDQUFDO0FBRTlCLFNBQVMsV0FBVyxDQUFFLGdCQUFnQjtJQUNsQyxJQUFJLGlCQUFpQixJQUFJLENBQUMsZ0JBQWdCLEVBQUU7UUFDeEMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBRXhCLGFBQUcsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUVsQyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDbkQ7SUFFRCxJQUFJLE9BQU8sSUFBSSxnQkFBZ0IsR0FBRyxDQUFDO1FBQy9CLE9BQU87SUFFWCxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBRWYsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1osQ0FBQztBQUVELFNBQVMsSUFBSSxD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QUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0IsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxJQUFBLG1CQUFRLEVBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVqQyxJQUFJLFNBQVMsQ0FBQyxrQkFBa0I7WUFDNUIsTUFBTSx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDeEQsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVk7WUFDaEMsTUFBTSxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7WUFFaEQsTUFBTSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDakM7SUFDRCxPQUFPLEdBQUcsRUFBRTtRQUNSLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDZDtBQUNMLENBQUMsQ0FBQyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xuaW1wb3J0IHsgR2VuZXJhbEVycm9yLCBBUElFcnJvciB9IGZyb20gJy4uL2Vycm9ycy9ydW50aW1lJztcbmltcG9ydCB7IFJVTlRJTUVfRVJST1JTIH0gZnJvbSAnLi4vZXJyb3JzL3R5cGVzJztcbmltcG9ydCBDbGlBcmd1bWVudFBhcnNlciBmcm9tICcuL2FyZ3VtZW50LXBhcnNlcic7XG5pbXBvcnQgVGVybWluYXRpb25IYW5kbGVyIGZyb20gJy4vdGVybWluYXRpb24taGFuZGxlcic7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nJztcbmltcG9ydCByZW1vdGVzV2l6YXJkIGZyb20gJy4vcmVtb3Rlcy13aXphcmQnO1xuaW1wb3J0IGNvcnJlY3RCcm93c2Vyc0FuZFNvdXJjZXMgZnJvbSAnLi9jb3JyZWN0LWJyb3dzZXJzLWFuZC1zb3VyY2VzJztcbmltcG9ydCBjcmVhdGVUZXN0Q2FmZSBmcm9tICcuLi8nO1xuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBsb2dFbnRyeSBmcm9tICcuLi91dGlscy9sb2ctZW50cnknO1xuaW1wb3J0IGRhc2hib2FyZEludGVncmF0aW9uIGZyb20gJy4uL2Rhc2hib2FyZCc7XG5cbmNvbnN0IExPR0dFUiA9IGRlYnVnKCd0ZXN0Y2FmZTpjbGknKTtcblxuLy8gTk9URTogTG9hZCB0aGUgcHJvdmlkZXIgcG9vbCBsYXppbHkgdG8gcmVkdWNlIHN0YXJ0dXAgdGltZVxuY29uc3QgbGF6eVJlcXVpcmUgICAgICAgICA9IHJlcXVpcmUoJ2ltcG9ydC1sYXp5JykocmVxdWlyZSk7XG5jb25zdCBicm93c2VyUHJvdmlkZXJQb29sID0gbGF6eVJlcXVpcmUoJy4uL2Jyb3dzZXIvcHJvdmlkZXIvcG9vbCcpO1xuXG5sZXQgc2hvd01lc3NhZ2VPbkV4aXQgPSB0cnVlO1xubGV0IGV4aXRNZXNzYWdlU2hvd24gID0gZmFsc2U7XG5sZXQgZXhpdGluZyAgICAgICAgICAgPSBmYWxzZTtcblxuZnVuY3Rpb24gZXhpdEhhbmRsZXIgKHRlcm1pbmF0aW9uTGV2ZWwpIHtcbiAgICBpZiAoc2hvd01lc3NhZ2VPbkV4aXQgJiYgIWV4aXRNZXNzYWdlU2hvd24pIHtcbiAgICAgICAgZXhpdE1lc3NhZ2VTaG93biA9IHRydWU7XG5cbiAgICAgICAgbG9nLndyaXRlKCdTdG9wcGluZyBUZXN0Q2FmZS4uLicpO1xuXG4gICAgICAgIHByb2Nlc3Mub24oJ2V4aXQnLCAoKSA9PiBsb2cuaGlkZVNwaW5uZXIodHJ1ZSkpO1xuICAgIH1cblxuICAgIGlmIChleGl0aW5nIHx8IHRlcm1pbmF0aW9uTGV2ZWwgPCAyKVxuICAgICAgICByZXR1cm47XG5cbiAgICBleGl0aW5nID0gdHJ1ZTtcblxuICAgIGV4aXQoMCk7XG59XG5cbmZ1bmN0aW9uIGV4aXQgKGNvZGUpIHtcbiAgICBsb2cuaGlkZVNwaW5uZXIodHJ1ZSk7XG5cbiAgICAvLyBOT1RFOiBnaXZlIGEgcHJvY2VzcyB0aW1lIHRvIGZsdXNoIHRoZSBvdXRwdXQuXG4gICAgLy8gSXQncyBuZWNlc3NhcnkgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gICAgc2V0VGltZW91dCgoKSA9PiBwcm9jZXNzLmV4aXQoY29kZSksIDApO1xufVxuXG5mdW5jdGlvbiBlcnJvciAoZXJyKSB7XG4gICAgbG9nLmhpZGVTcGlubmVyKCk7XG5cbiAgICBsZXQgbWVzc2FnZSA9IG51bGw7XG5cbiAgICBpZiAoZXJyIGluc3RhbmNlb2YgR2VuZXJhbEVycm9yKVxuICAgICAgICBtZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG5cbiAgICBlbHNlIGlmIChlcnIgaW5zdGFuY2VvZiBBUElFcnJvcilcbiAgICAgICAgbWVzc2FnZSA9IGVyci5jb2xvcmVkU3RhY2s7XG5cbiAgICBlbHNlXG4gICAgICAgIG1lc3NhZ2UgPSBlcnIuc3RhY2s7XG5cbiAgICBsb2cud3JpdGUoY2hhbGsucmVkKCdFUlJPUiAnKSArIG1lc3NhZ2UgKyAnXFxuJyk7XG4gICAgbG9nLndyaXRlKGNoYWxrLmdyYXkoJ1R5cGUgXCJ0ZXN0Y2FmZSAtaFwiIGZvciBoZWxwLicpKTtcblxuICAgIGV4aXQoMSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1blRlc3RzIChhcmdQYXJzZXIpIHtcbiAgICBjb25zdCBvcHRzICAgICAgICA9IGFyZ1BhcnNlci5vcHRzO1xuICAgIGNvbnN0IHBvcnQxICAgICAgID0gb3B0cy5wb3J0cyAmJiBvcHRzLnBvcnRzWzBdO1xuICAgIGNvbnN0IHBvcnQyICAgICAgID0gb3B0cy5wb3J0cyAmJiBvcHRzLnBvcnRzWzFdO1xuICAgIGNvbnN0IHByb3h5ICAgICAgID0gb3B0cy5wcm94eTtcbiAgICBjb25zdCBwcm94eUJ5cGFzcyA9IG9wdHMucHJveHlCeXBhc3M7XG4gICAgY29uc3QgY29uZmlnRmlsZSAgPSBvcHRzLmNvbmZpZ0ZpbGU7XG5cbiAgICBsb2cuc2hvd1NwaW5uZXIoKTtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgaG9zdG5hbWUsXG4gICAgICAgIHNzbCxcbiAgICAgICAgZGV2LFxuICAgICAgICBleHBlcmltZW50YWxEZWJ1ZyxcbiAgICAgICAgcmV0cnlUZXN0UGFnZXMsXG4gICAgICAgIGNhY2hlLFxuICAgICAgICBkaXNhYmxlSHR0cDIsXG4gICAgICAgIHY4RmxhZ3MsXG4gICAgICAgIHByb3h5bGVzcyxcbiAgICB9ID0gb3B0cztcblxuICAgIGNvbnN0IHRlc3RDYWZlID0gYXdhaXQgY3JlYXRlVGVzdENhZmUoe1xuICAgICAgICBkZXZlbG9wbWVudE1vZGU6IGRldixcbiAgICAgICAgaXNDbGk6ICAgICAgICAgICB0cnVlLFxuXG4gICAgICAgIGhvc3RuYW1lLFxuICAgICAgICBwb3J0MSxcbiAgICAgICAgcG9ydDIsXG4gICAgICAgIHNzbCxcbiAgICAgICAgZXhwZXJpbWVudGFsRGVidWcsXG4gICAgICAgIHJldHJ5VGVzdFBhZ2VzLFxuICAgICAgICBjYWNoZSxcbiAgICAgICAgY29uZmlnRmlsZSxcbiAgICAgICAgZGlzYWJsZUh0dHAyLFxuICAgICAgICB2OEZsYWdzLFxuICAgICAgICBwcm94eWxlc3MsXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb3JyZWN0ZWRCcm93c2Vyc0FuZFNvdXJjZXMgPSBhd2FpdCBjb3JyZWN0QnJvd3NlcnNBbmRTb3VyY2VzKGFyZ1BhcnNlciwgdGVzdENhZmUuY29uZmlndXJhdGlvbik7XG4gICAgY29uc3QgYXV0b21hdGVkQnJvd3NlcnMgICAgICAgICAgID0gY29ycmVjdGVkQnJvd3NlcnNBbmRTb3VyY2VzLmJyb3dzZXJzO1xuICAgIGNvbnN0IHJlbW90ZUJyb3dzZXJzICAgICAgICAgICAgICA9IGF3YWl0IHJlbW90ZXNXaXphcmQodGVzdENhZmUsIGFyZ1BhcnNlci5yZW1vdGVDb3VudCwgb3B0cy5xckNvZGUpO1xuICAgIGNvbnN0IGJyb3dzZXJzICAgICAgICAgICAgICAgICAgICA9IGF1dG9tYXRlZEJyb3dzZXJzLmNvbmNhdChyZW1vdGVCcm93c2Vycyk7XG4gICAgY29uc3Qgc291cmNlcyAgICAgICAgICAgICAgICAgICAgID0gY29ycmVjdGVkQnJvd3NlcnNBbmRTb3VyY2VzLnNvdXJjZXM7XG5cbiAgICBjb25zdCBydW5uZXIgPSBvcHRzLmxpdmUgPyB0ZXN0Q2FmZS5jcmVhdGVMaXZlTW9kZVJ1bm5lcigpIDogdGVzdENhZmUuY3JlYXRlUnVubmVyKCk7XG5cbiAgICBsZXQgZmFpbGVkID0gMDtcblxuICAgIHJ1bm5lclxuICAgICAgICAudXNlUHJveHkocHJveHksIHByb3h5QnlwYXNzKVxuICAgICAgICAuc3JjKHNvdXJjZXMpXG4gICAgICAgIC50c0NvbmZpZ1BhdGgoYXJnUGFyc2VyLm9wdHMudHNDb25maWdQYXRoKVxuICAgICAgICAuYnJvd3NlcnMoYnJvd3NlcnMpXG4gICAgICAgIC5yZXBvcnRlcihhcmdQYXJzZXIub3B0cy5yZXBvcnRlcilcbiAgICAgICAgLmNvbmN1cnJlbmN5KGFyZ1BhcnNlci5vcHRzLmNvbmN1cnJlbmN5KVxuICAgICAgICAuZmlsdGVyKGFyZ1BhcnNlci5vcHRzLmZpbHRlcilcbiAgICAgICAgLnZpZGVvKG9wdHMudmlkZW8sIG9wdHMudmlkZW9PcHRpb25zLCBvcHRzLnZpZGVvRW5jb2RpbmdPcHRpb25zKVxuICAgICAgICAuc2NyZWVuc2hvdHMob3B0cy5zY3JlZW5zaG90cylcbiAgICAgICAgLnN0YXJ0QXBwKG9wdHMuYXBwLCBvcHRzLmFwcEluaXREZWxheSlcbiAgICAgICAgLmNsaWVudFNjcmlwdHMoYXJnUGFyc2VyLm9wdHMuY2xpZW50U2NyaXB0cylcbiAgICAgICAgLmNvbXBpbGVyT3B0aW9ucyhhcmdQYXJzZXIub3B0cy5jb21waWxlck9wdGlvbnMpO1xuXG4gICAgcnVubmVyLm9uY2UoJ2RvbmUtYm9vdHN0cmFwcGluZycsICgpID0+IGxvZy5oaWRlU3Bpbm5lcigpKTtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJ1bk9wdHMgPSBhcmdQYXJzZXIuZ2V0UnVuT3B0aW9ucygpO1xuXG4gICAgICAgIGZhaWxlZCA9IGF3YWl0IHJ1bm5lci5ydW4ocnVuT3B0cyk7XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICBzaG93TWVzc2FnZU9uRXhpdCA9IGZhbHNlO1xuICAgICAgICBhd2FpdCB0ZXN0Q2FmZS5jbG9zZSgpO1xuICAgIH1cblxuICAgIGV4aXQoZmFpbGVkKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcnVuRGFzaGJvYXJkSW50ZWdyYXRpb24gKHN0YXRlKSB7XG4gICAgYXdhaXQgZGFzaGJvYXJkSW50ZWdyYXRpb24oc3RhdGUpO1xuXG4gICAgZXhpdCgwKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbGlzdEJyb3dzZXJzIChwcm92aWRlck5hbWUpIHtcbiAgICBjb25zdCBwcm92aWRlciA9IGF3YWl0IGJyb3dzZXJQcm92aWRlclBvb2wuZ2V0UHJvdmlkZXIocHJvdmlkZXJOYW1lKTtcblxuICAgIGlmICghcHJvdmlkZXIpXG4gICAgICAgIHRocm93IG5ldyBHZW5lcmFsRXJyb3IoUlVOVElNRV9FUlJPUlMuYnJvd3NlclByb3ZpZGVyTm90Rm91bmQsIHByb3ZpZGVyTmFtZSk7XG5cbiAgICBpZiAocHJvdmlkZXIuaXNNdWx0aUJyb3dzZXIpIHtcbiAgICAgICAgY29uc3QgYnJvd3Nlck5hbWVzID0gYXdhaXQgcHJvdmlkZXIuZ2V0QnJvd3Nlckxpc3QoKTtcblxuICAgICAgICBhd2FpdCBicm93c2VyUHJvdmlkZXJQb29sLmRpc3Bvc2UoKTtcblxuICAgICAgICBpZiAocHJvdmlkZXJOYW1lID09PSAnbG9jYWxseS1pbnN0YWxsZWQnKVxuICAgICAgICAgICAgY29uc29sZS5sb2coYnJvd3Nlck5hbWVzLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29uc29sZS5sb2coYnJvd3Nlck5hbWVzLm1hcChicm93c2VyTmFtZSA9PiBgXCIkeyBwcm92aWRlck5hbWUgfTokeyBicm93c2VyTmFtZSB9XCJgKS5qb2luKCdcXG4nKSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgY29uc29sZS5sb2coYFwiJHsgcHJvdmlkZXJOYW1lIH1cImApO1xuXG4gICAgZXhpdCgwKTtcbn1cblxuKGFzeW5jIGZ1bmN0aW9uIGNsaSAoKSB7XG4gICAgY29uc3QgdGVybWluYXRpb25IYW5kbGVyID0gbmV3IFRlcm1pbmF0aW9uSGFuZGxlcigpO1xuXG4gICAgdGVybWluYXRpb25IYW5kbGVyLm9uKFRlcm1pbmF0aW9uSGFuZGxlci5URVJNSU5BVElPTl9MRVZFTF9JTkNSRUFTRURfRVZFTlQsIGV4aXRIYW5kbGVyKTtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGFyZ1BhcnNlciA9IG5ldyBDbGlBcmd1bWVudFBhcnNlcigpO1xuXG4gICAgICAgIGxvZ0VudHJ5KExPR0dFUiwgcHJvY2Vzcy5hcmd2KTtcblxuICAgICAgICBhd2FpdCBhcmdQYXJzZXIucGFyc2UocHJvY2Vzcy5hcmd2KTtcblxuICAgICAgICBsb2dFbnRyeShMT0dHRVIsIGFyZ1BhcnNlci5vcHRzKTtcblxuICAgICAgICBpZiAoYXJnUGFyc2VyLmlzRGFzaGJvYXJkQ29tbWFuZClcbiAgICAgICAgICAgIGF3YWl0IHJ1bkRhc2hib2FyZEludGVncmF0aW9uKGFyZ1BhcnNlci5zZW5kUmVwb3J0U3RhdGUpO1xuICAgICAgICBlbHNlIGlmIChhcmdQYXJzZXIub3B0cy5saXN0QnJvd3NlcnMpXG4gICAgICAgICAgICBhd2FpdCBsaXN0QnJvd3NlcnMoYXJnUGFyc2VyLm9wdHMucHJvdmlkZXJOYW1lKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYXdhaXQgcnVuVGVzdHMoYXJnUGFyc2VyKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBzaG93TWVzc2FnZU9uRXhpdCA9IGZhbHNlO1xuICAgICAgICBlcnJvcihlcnIpO1xuICAgIH1cbn0pKCk7XG5cbiJdfQ==