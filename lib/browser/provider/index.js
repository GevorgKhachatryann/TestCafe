"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const testcafe_browser_tools_1 = __importDefault(require("testcafe-browser-tools"));
const os_family_1 = __importDefault(require("os-family"));
const path_1 = require("path");
const make_dir_1 = __importDefault(require("make-dir"));
const connection_1 = __importDefault(require("../connection"));
const delay_1 = __importDefault(require("../../utils/delay"));
const client_functions_1 = require("./utils/client-functions");
const warning_message_1 = __importDefault(require("../../notifications/warning-message"));
const get_os_info_1 = __importDefault(require("get-os-info"));
const DEBUG_LOGGER = (0, debug_1.default)('testcafe:browser:provider');
const BROWSER_OPENING_DELAY = 2000;
const RESIZE_DIFF_SIZE = {
    width: 100,
    height: 100,
};
function sumSizes(sizeA, sizeB) {
    return {
        width: sizeA.width + sizeB.width,
        height: sizeA.height + sizeB.height,
    };
}
function subtractSizes(sizeA, sizeB) {
    return {
        width: sizeA.width - sizeB.width,
        height: sizeA.height - sizeB.height,
    };
}
class BrowserProvider {
    constructor(plugin) {
        this.plugin = plugin;
        this.initPromise = Promise.resolve(false);
        this.isMultiBrowser = this.plugin.isMultiBrowser;
        // HACK: The browser window has different border sizes in normal and maximized modes. So, we need to be sure that the window is
        // not maximized before resizing it in order to keep the mechanism of correcting the client area size working. When browser is started,
        // we are resizing it for the first time to switch the window to normal mode, and for the second time - to restore the client area size.
        this.localBrowsersInfo = {};
    }
    _ensureLocalBrowserInfo(browserId) {
        if (this.localBrowsersInfo[browserId])
            return;
        this.localBrowsersInfo[browserId] = {
            windowDescriptor: null,
            maxScreenSize: null,
            resizeCorrections: null,
        };
    }
    async _findWindow(browserId) {
        const pageTitle = this._getPageTitle(browserId);
        return testcafe_browser_tools_1.default.findWindow(pageTitle);
    }
    _getPageTitle(browserId) {
        if (this.plugin.getPageTitle)
            return this.plugin.getPageTitle(browserId);
        return browserId;
    }
    _getWindowDescriptor(browserId) {
        if (this.plugin.getWindowDescriptor)
            return this.plugin.getWindowDescriptor(browserId);
        return this.localBrowsersInfo[browserId] && this.localBrowsersInfo[browserId].windowDescriptor;
    }
    _setWindowDescriptor(browserId, windowDescriptor) {
        if (this.plugin.setWindowDescriptor) {
            this.plugin.setWindowDescriptor(browserId, windowDescriptor);
            return;
        }
        this.localBrowsersInfo[browserId].windowDescriptor = windowDescriptor;
    }
    _getMaxScreenSize(browserId) {
        return this.localBrowsersInfo[browserId] && this.localBrowsersInfo[browserId].maxScreenSize;
    }
    _getResizeCorrections(browserId) {
        return this.localBrowsersInfo[browserId] && this.localBrowsersInfo[browserId].resizeCorrections;
    }
    _isBrowserIdle(browserId) {
        const connection = connection_1.default.getById(browserId);
        return connection.idle;
    }
    async _calculateResizeCorrections(browserId) {
        if (!this._isBrowserIdle(browserId))
            return;
        const title = await this.plugin.runInitScript(browserId, client_functions_1.GET_TITLE_SCRIPT);
        if (!await testcafe_browser_tools_1.default.isMaximized(title))
            return;
        const currentSize = await this.plugin.runInitScript(browserId, client_functions_1.GET_WINDOW_DIMENSIONS_INFO_SCRIPT);
        const etalonSize = subtractSizes(currentSize, RESIZE_DIFF_SIZE);
        await testcafe_browser_tools_1.default.resize(title, currentSize.width, currentSize.height, etalonSize.width, etalonSize.height);
        let resizedSize = await this.plugin.runInitScript(browserId, client_functions_1.GET_WINDOW_DIMENSIONS_INFO_SCRIPT);
        let correctionSize = subtractSizes(resizedSize, etalonSize);
        await testcafe_browser_tools_1.default.resize(title, resizedSize.width, resizedSize.height, etalonSize.width, etalonSize.height);
        resizedSize = await this.plugin.runInitScript(browserId, client_functions_1.GET_WINDOW_DIMENSIONS_INFO_SCRIPT);
        correctionSize = sumSizes(correctionSize, subtractSizes(resizedSize, etalonSize));
        if (this.localBrowsersInfo[browserId])
            this.localBrowsersInfo[browserId].resizeCorrections = correctionSize;
        await testcafe_browser_tools_1.default.maximize(title);
    }
    async _calculateMacSizeLimits(browserId) {
        if (!this._isBrowserIdle(browserId))
            return;
        const sizeInfo = await this.plugin.runInitScript(browserId, client_functions_1.GET_WINDOW_DIMENSIONS_INFO_SCRIPT);
        if (this.localBrowsersInfo[browserId]) {
            this.localBrowsersInfo[browserId].maxScreenSize = {
                width: sizeInfo.availableWidth - (sizeInfo.outerWidth - sizeInfo.width),
                height: sizeInfo.availableHeight - (sizeInfo.outerHeight - sizeInfo.height),
            };
        }
    }
    async _ensureBrowserWindowDescriptor(browserId) {
        if (this._getWindowDescriptor(browserId))
            return;
        await this._ensureLocalBrowserInfo(browserId);
        // NOTE: delay to ensure the window finished the opening
        await this.plugin.waitForConnectionReady(browserId);
        await (0, delay_1.default)(BROWSER_OPENING_DELAY);
        if (this.localBrowsersInfo[browserId]) {
            const connection = connection_1.default.getById(browserId);
            let windowDescriptor = null;
            try {
                windowDescriptor = await this._findWindow(browserId);
            }
            catch (err) {
                // NOTE: We can suppress the error here since we can just disable window manipulation functions
                // when we cannot find a local window descriptor
                DEBUG_LOGGER(err);
                connection.addWarning(warning_message_1.default.cannotFindWindowDescriptorError, connection.browserInfo.alias, err.message);
            }
            this._setWindowDescriptor(browserId, windowDescriptor);
        }
    }
    async _ensureBrowserWindowParameters(browserId) {
        await this._ensureBrowserWindowDescriptor(browserId);
        if (os_family_1.default.win && !this._getResizeCorrections(browserId))
            await this._calculateResizeCorrections(browserId);
        else if (os_family_1.default.mac && !this._getMaxScreenSize(browserId))
            await this._calculateMacSizeLimits(browserId);
    }
    async _closeLocalBrowser(browserId) {
        if (this.plugin.needCleanUpBrowserInfo)
            this.plugin.cleanUpBrowserInfo(browserId);
        const windowDescriptor = this._getWindowDescriptor(browserId);
        await testcafe_browser_tools_1.default.close(windowDescriptor);
    }
    async _resizeLocalBrowserWindow(browserId, width, height, currentWidth, currentHeight) {
        await this._ensureBrowserWindowDescriptor(browserId);
        const resizeCorrections = this._getResizeCorrections(browserId);
        if (resizeCorrections && await testcafe_browser_tools_1.default.isMaximized(this._getWindowDescriptor(browserId))) {
            width -= resizeCorrections.width;
            height -= resizeCorrections.height;
        }
        await testcafe_browser_tools_1.default.resize(this._getWindowDescriptor(browserId), currentWidth, currentHeight, width, height);
    }
    async _takeLocalBrowserScreenshot(browserId, screenshotPath) {
        await testcafe_browser_tools_1.default.screenshot(this._getWindowDescriptor(browserId), screenshotPath);
    }
    async _canResizeLocalBrowserWindowToDimensions(browserId, width, height) {
        if (!os_family_1.default.mac)
            return true;
        const maxScreenSize = this._getMaxScreenSize(browserId);
        return width <= maxScreenSize.width && height <= maxScreenSize.height;
    }
    async _maximizeLocalBrowserWindow(browserId) {
        await this._ensureBrowserWindowDescriptor(browserId);
        await testcafe_browser_tools_1.default.maximize(this._getWindowDescriptor(browserId));
    }
    async _ensureRetryTestPagesWarning(browserId) {
        const connection = connection_1.default.getById(browserId);
        if (connection === null || connection === void 0 ? void 0 : connection.retryTestPages) {
            const isServiceWorkerEnabled = await this.plugin.runInitScript(browserId, client_functions_1.GET_IS_SERVICE_WORKER_ENABLED);
            if (!isServiceWorkerEnabled)
                connection.addWarning(warning_message_1.default.retryTestPagesIsNotSupported, connection.browserInfo.alias, connection.browserInfo.alias);
        }
    }
    async canUseDefaultWindowActions(browserId) {
        const isLocalBrowser = await this.plugin.isLocalBrowser(browserId);
        const isHeadlessBrowser = await this.plugin.isHeadlessBrowser(browserId);
        return isLocalBrowser && !isHeadlessBrowser;
    }
    async init() {
        const initialized = await this.initPromise;
        if (initialized)
            return;
        this.initPromise = this.plugin
            .init()
            .then(() => true);
        try {
            await this.initPromise;
        }
        catch (error) {
            this.initPromise = Promise.resolve(false);
            throw error;
        }
    }
    async dispose() {
        const initialized = await this.initPromise;
        if (!initialized)
            return;
        this.initPromise = this.plugin
            .dispose()
            .then(() => false);
        try {
            await this.initPromise;
        }
        catch (error) {
            this.initPromise = Promise.resolve(false);
            throw error;
        }
    }
    async isLocalBrowser(browserId, browserName) {
        return await this.plugin.isLocalBrowser(browserId, browserName);
    }
    isHeadlessBrowser(browserId, browserName) {
        return this.plugin.isHeadlessBrowser(browserId, browserName);
    }
    async getOSInfo(browserId) {
        if (await this.isLocalBrowser(browserId))
            return await (0, get_os_info_1.default)();
        return await this.plugin.getOSInfo(browserId);
    }
    async openBrowser(browserId, pageUrl, browserOption, additionalOptions = { disableMultipleWindows: false }) {
        await this.plugin.openBrowser(browserId, pageUrl, browserOption, additionalOptions);
        await this._ensureRetryTestPagesWarning(browserId);
        if (await this.canUseDefaultWindowActions(browserId))
            await this._ensureBrowserWindowParameters(browserId);
    }
    async closeBrowser(browserId, data) {
        const canUseDefaultWindowActions = await this.canUseDefaultWindowActions(browserId);
        const customActionsInfo = await this.hasCustomActionForBrowser(browserId);
        const hasCustomCloseBrowser = customActionsInfo.hasCloseBrowser;
        const usePluginsCloseBrowser = hasCustomCloseBrowser || !canUseDefaultWindowActions;
        if (usePluginsCloseBrowser)
            await this.plugin.closeBrowser(browserId, data);
        else
            await this._closeLocalBrowser(browserId);
        if (canUseDefaultWindowActions)
            delete this.localBrowsersInfo[browserId];
    }
    async getBrowserList() {
        return await this.plugin.getBrowserList();
    }
    async isValidBrowserName(browserName) {
        return await this.plugin.isValidBrowserName(browserName);
    }
    async resizeWindow(browserId, width, height, currentWidth, currentHeight) {
        const canUseDefaultWindowActions = await this.canUseDefaultWindowActions(browserId);
        const customActionsInfo = await this.hasCustomActionForBrowser(browserId);
        const hasCustomResizeWindow = customActionsInfo.hasResizeWindow;
        if (canUseDefaultWindowActions && !hasCustomResizeWindow) {
            await this._resizeLocalBrowserWindow(browserId, width, height, currentWidth, currentHeight);
            return;
        }
        await this.plugin.resizeWindow(browserId, width, height, currentWidth, currentHeight);
    }
    async canResizeWindowToDimensions(browserId, width, height) {
        const canUseDefaultWindowActions = await this.canUseDefaultWindowActions(browserId);
        const customActionsInfo = await this.hasCustomActionForBrowser(browserId);
        const hasCustomCanResizeToDimensions = customActionsInfo.hasCanResizeWindowToDimensions;
        if (canUseDefaultWindowActions && !hasCustomCanResizeToDimensions)
            return await this._canResizeLocalBrowserWindowToDimensions(browserId, width, height);
        return await this.plugin.canResizeWindowToDimensions(browserId, width, height);
    }
    async maximizeWindow(browserId) {
        const canUseDefaultWindowActions = await this.canUseDefaultWindowActions(browserId);
        const customActionsInfo = await this.hasCustomActionForBrowser(browserId);
        const hasCustomMaximizeWindow = customActionsInfo.hasMaximizeWindow;
        if (canUseDefaultWindowActions && !hasCustomMaximizeWindow)
            return await this._maximizeLocalBrowserWindow(browserId);
        return await this.plugin.maximizeWindow(browserId);
    }
    async takeScreenshot(browserId, screenshotPath, pageWidth, pageHeight, fullPage) {
        const canUseDefaultWindowActions = await this.canUseDefaultWindowActions(browserId);
        const customActionsInfo = await this.hasCustomActionForBrowser(browserId);
        const hasCustomTakeScreenshot = customActionsInfo.hasTakeScreenshot;
        const connection = connection_1.default.getById(browserId);
        const takeLocalBrowsersScreenshot = canUseDefaultWindowActions && !hasCustomTakeScreenshot;
        const isLocalFullPageMode = takeLocalBrowsersScreenshot && fullPage;
        if (isLocalFullPageMode) {
            connection.addWarning(warning_message_1.default.screenshotsFullPageNotSupported, connection.browserInfo.alias);
            return;
        }
        await (0, make_dir_1.default)((0, path_1.dirname)(screenshotPath));
        if (takeLocalBrowsersScreenshot)
            await this._takeLocalBrowserScreenshot(browserId, screenshotPath);
        else
            await this.plugin.takeScreenshot(browserId, screenshotPath, pageWidth, pageHeight, fullPage);
    }
    async getVideoFrameData(browserId) {
        return this.plugin.getVideoFrameData(browserId);
    }
    async startCapturingVideo(browserId) {
        await this.plugin.startCapturingVideo(browserId);
    }
    async stopCapturingVideo(browserId) {
        await this.plugin.stopCapturingVideo(browserId);
    }
    async hasCustomActionForBrowser(browserId) {
        return this.plugin.hasCustomActionForBrowser(browserId);
    }
    async reportJobResult(browserId, status, data) {
        await this.plugin.reportJobResult(browserId, status, data);
    }
    getActiveWindowId(browserId) {
        if (!this.plugin.supportMultipleWindows)
            return null;
        return this.plugin.getActiveWindowId(browserId);
    }
    setActiveWindowId(browserId, val) {
        this.plugin.setActiveWindowId(browserId, val);
    }
    async openFileProtocol(browserId, url) {
        await this.plugin.openFileProtocol(browserId, url);
    }
    async closeBrowserChildWindow(browserId) {
        await this.plugin.closeBrowserChildWindow(browserId);
    }
}
exports.default = BrowserProvider;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYnJvd3Nlci9wcm92aWRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQUMxQixvRkFBa0Q7QUFDbEQsMERBQTJCO0FBQzNCLCtCQUErQjtBQUMvQix3REFBK0I7QUFDL0IsK0RBQXNFO0FBQ3RFLDhEQUFzQztBQUN0QywrREFJa0M7QUFDbEMsMEZBQWtFO0FBR2xFLDhEQUFxRDtBQUdyRCxNQUFNLFlBQVksR0FBRyxJQUFBLGVBQUssRUFBQywyQkFBMkIsQ0FBQyxDQUFDO0FBRXhELE1BQU0scUJBQXFCLEdBQUcsSUFBSSxDQUFDO0FBRW5DLE1BQU0sZ0JBQWdCLEdBQUc7SUFDckIsS0FBSyxFQUFHLEdBQUc7SUFDWCxNQUFNLEVBQUUsR0FBRztDQUNkLENBQUM7QUFhRixTQUFTLFFBQVEsQ0FBRSxLQUFXLEVBQUUsS0FBVztJQUN2QyxPQUFPO1FBQ0gsS0FBSyxFQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUs7UUFDakMsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU07S0FDdEMsQ0FBQztBQUNOLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBRSxLQUFXLEVBQUUsS0FBVztJQUM1QyxPQUFPO1FBQ0gsS0FBSyxFQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUs7UUFDakMsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU07S0FDdEMsQ0FBQztBQUNOLENBQUM7QUFFRCxNQUFxQixlQUFlO0lBTWhDLFlBQW9CLE1BQVc7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBVyxNQUFNLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBTSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxj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SUFBSSxDQUFDO1FBRWhCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU0saUJBQWlCLENBQUUsU0FBaUIsRUFBRSxHQUFXO1FBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTSxLQUFLLENBQUMsZ0JBQWdCLENBQUUsU0FBaUIsRUFBRSxHQUFXO1FBQ3pELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVNLEtBQUssQ0FBQyx1QkFBdUIsQ0FBRSxTQUFpQjtRQUNuRCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDekQsQ0FBQztDQUNKO0FBOVlELGtDQThZQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgYnJvd3NlclRvb2xzIGZyb20gJ3Rlc3RjYWZlLWJyb3dzZXItdG9vbHMnO1xuaW1wb3J0IE9TIGZyb20gJ29zLWZhbWlseSc7XG5pbXBvcnQgeyBkaXJuYW1lIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgbWFrZURpciBmcm9tICdtYWtlLWRpcic7XG5pbXBvcnQgQnJvd3NlckNvbm5lY3Rpb24sIHsgQnJvd3NlckNsb3NpbmdJbmZvIH0gZnJvbSAnLi4vY29ubmVjdGlvbic7XG5pbXBvcnQgZGVsYXkgZnJvbSAnLi4vLi4vdXRpbHMvZGVsYXknO1xuaW1wb3J0IHtcbiAgICBHRVRfSVNfU0VSVklDRV9XT1JLRVJfRU5BQkxFRCxcbiAgICBHRVRfVElUTEVfU0NSSVBULFxuICAgIEdFVF9XSU5ET1dfRElNRU5TSU9OU19JTkZPX1NDUklQVCxcbn0gZnJvbSAnLi91dGlscy9jbGllbnQtZnVuY3Rpb25zJztcbmltcG9ydCBXQVJOSU5HX01FU1NBR0UgZnJvbSAnLi4vLi4vbm90aWZpY2F0aW9ucy93YXJuaW5nLW1lc3NhZ2UnO1xuaW1wb3J0IHsgRGljdGlvbmFyeSB9IGZyb20gJy4uLy4uL2NvbmZpZ3VyYXRpb24vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBXaW5kb3dEaW1lbnRpb25zSW5mbyB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IGdldExvY2FsT1NJbmZvLCB7IE9TSW5mbyB9IGZyb20gJ2dldC1vcy1pbmZvJztcbmltcG9ydCB7IE9wZW5Ccm93c2VyQWRkaXRpb25hbE9wdGlvbnMgfSBmcm9tICcuLi8uLi9zaGFyZWQvdHlwZXMnO1xuXG5jb25zdCBERUJVR19MT0dHRVIgPSBkZWJ1ZygndGVzdGNhZmU6YnJvd3Nlcjpwcm92aWRlcicpO1xuXG5jb25zdCBCUk9XU0VSX09QRU5JTkdfREVMQVkgPSAyMDAwO1xuXG5jb25zdCBSRVNJWkVfRElGRl9TSVpFID0ge1xuICAgIHdpZHRoOiAgMTAwLFxuICAgIGhlaWdodDogMTAwLFxufTtcblxuaW50ZXJmYWNlIFNpemUge1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBMb2NhbEJyb3dzZXJJbmZvIHtcbiAgICB3aW5kb3dEZXNjcmlwdG9yOiBudWxsIHwgc3RyaW5nO1xuICAgIG1heFNjcmVlblNpemU6IG51bGwgfCBTaXplO1xuICAgIHJlc2l6ZUNvcnJlY3Rpb25zOiBudWxsIHwgU2l6ZTtcbn1cblxuZnVuY3Rpb24gc3VtU2l6ZXMgKHNpemVBOiBTaXplLCBzaXplQjogU2l6ZSk6IFNpemUge1xuICAgIHJldHVybiB7XG4gICAgICAgIHdpZHRoOiAgc2l6ZUEud2lkdGggKyBzaXplQi53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBzaXplQS5oZWlnaHQgKyBzaXplQi5oZWlnaHQsXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gc3VidHJhY3RTaXplcyAoc2l6ZUE6IFNpemUsIHNpemVCOiBTaXplKTogU2l6ZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgd2lkdGg6ICBzaXplQS53aWR0aCAtIHNpemVCLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IHNpemVBLmhlaWdodCAtIHNpemVCLmhlaWdodCxcbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCcm93c2VyUHJvdmlkZXIge1xuICAgIHByaXZhdGUgcGx1Z2luOiBhbnk7XG4gICAgcHJpdmF0ZSBpbml0UHJvbWlzZTogUHJvbWlzZTxhbnk+O1xuICAgIHByaXZhdGUgaXNNdWx0aUJyb3dzZXI6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2NhbEJyb3dzZXJzSW5mbzogRGljdGlvbmFyeTxMb2NhbEJyb3dzZXJJbmZvPjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAocGx1Z2luOiBhbnkpIHtcbiAgICAgICAgdGhpcy5wbHVnaW4gICAgICAgICA9IHBsdWdpbjtcbiAgICAgICAgdGhpcy5pbml0UHJvbWlzZSAgICA9IFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIHRoaXMuaXNNdWx0aUJyb3dzZXIgPSB0aGlzLnBsdWdpbi5pc011bHRpQnJvd3NlcjtcbiAgICAgICAgLy8gSEFDSzogVGhlIGJyb3dzZXIgd2luZG93IGhhcyBkaWZmZXJlbnQgYm9yZGVyIHNpemVzIGluIG5vcm1hbCBhbmQgbWF4aW1pemVkIG1vZGVzLiBTbywgd2UgbmVlZCB0byBiZSBzdXJlIHRoYXQgdGhlIHdpbmRvdyBpc1xuICAgICAgICAvLyBub3QgbWF4aW1pemVkIGJlZm9yZSByZXNpemluZyBpdCBpbiBvcmRlciB0byBrZWVwIHRoZSBtZWNoYW5pc20gb2YgY29ycmVjdGluZyB0aGUgY2xpZW50IGFyZWEgc2l6ZSB3b3JraW5nLiBXaGVuIGJyb3dzZXIgaXMgc3RhcnRlZCxcbiAgICAgICAgLy8gd2UgYXJlIHJlc2l6aW5nIGl0IGZvciB0aGUgZmlyc3QgdGltZSB0byBzd2l0Y2ggdGhlIHdpbmRvdyB0byBub3JtYWwgbW9kZSwgYW5kIGZvciB0aGUgc2Vjb25kIHRpbWUgLSB0byByZXN0b3JlIHRoZSBjbGllbnQgYXJlYSBzaXplLlxuICAgICAgICB0aGlzLmxvY2FsQnJvd3NlcnNJbmZvID0ge307XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZW5zdXJlTG9jYWxCcm93c2VySW5mbyAoYnJvd3NlcklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYWxCcm93c2Vyc0luZm9bYnJvd3NlcklkXSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmxvY2FsQnJvd3NlcnNJbmZvW2Jyb3dzZXJJZF0gPSB7XG4gICAgICAgICAgICB3aW5kb3dEZXNjcmlwdG9yOiAgbnVsbCxcbiAgICAgICAgICAgIG1heFNjcmVlblNpemU6ICAgICBudWxsLFxuICAgICAgICAgICAgcmVzaXplQ29ycmVjdGlvbnM6IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfZmluZFdpbmRvdyAoYnJvd3NlcklkOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBwYWdlVGl0bGUgPSB0aGlzLl9nZXRQYWdlVGl0bGUoYnJvd3NlcklkKTtcblxuICAgICAgICByZXR1cm4gYnJvd3NlclRvb2xzLmZpbmRXaW5kb3cocGFnZVRpdGxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRQYWdlVGl0bGUgKGJyb3dzZXJJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMucGx1Z2luLmdldFBhZ2VUaXRsZSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsdWdpbi5nZXRQYWdlVGl0bGUoYnJvd3NlcklkKTtcblxuICAgICAgICByZXR1cm4gYnJvd3NlcklkO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFdpbmRvd0Rlc2NyaXB0b3IgKGJyb3dzZXJJZDogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGlmICh0aGlzLnBsdWdpbi5nZXRXaW5kb3dEZXNjcmlwdG9yKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGx1Z2luLmdldFdpbmRvd0Rlc2NyaXB0b3IoYnJvd3NlcklkKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbEJyb3dzZXJzSW5mb1ticm93c2VySWRdICYmIHRoaXMubG9jYWxCcm93c2Vyc0luZm9bYnJvd3NlcklkXS53aW5kb3dEZXNjcmlwdG9yO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NldFdpbmRvd0Rlc2NyaXB0b3IgKGJyb3dzZXJJZDogc3RyaW5nLCB3aW5kb3dEZXNjcmlwdG9yOiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBsdWdpbi5zZXRXaW5kb3dEZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXRXaW5kb3dEZXNjcmlwdG9yKGJyb3dzZXJJZCwgd2luZG93RGVzY3JpcHRvcik7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9jYWxCcm93c2Vyc0luZm9bYnJvd3NlcklkXS53aW5kb3dEZXNjcmlwdG9yID0gd2luZG93RGVzY3JpcHRvcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRNYXhTY3JlZW5TaXplIChicm93c2VySWQ6IHN0cmluZyk6IFNpemUgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxCcm93c2Vyc0luZm9bYnJvd3NlcklkXSAmJiB0aGlzLmxvY2FsQnJvd3NlcnNJbmZvW2Jyb3dzZXJJZF0ubWF4U2NyZWVuU2l6ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRSZXNpemVDb3JyZWN0aW9ucyAoYnJvd3NlcklkOiBzdHJpbmcpOiBTaXplIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsQnJvd3NlcnNJbmZvW2Jyb3dzZXJJZF0gJiYgdGhpcy5sb2NhbEJyb3dzZXJzSW5mb1ticm93c2VySWRdLnJlc2l6ZUNvcnJlY3Rpb25zO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lzQnJvd3NlcklkbGUgKGJyb3dzZXJJZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBCcm93c2VyQ29ubmVjdGlvbi5nZXRCeUlkKGJyb3dzZXJJZCkgYXMgQnJvd3NlckNvbm5lY3Rpb247XG5cbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uaWRsZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIF9jYWxjdWxhdGVSZXNpemVDb3JyZWN0aW9ucyAoYnJvd3NlcklkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0Jyb3dzZXJJZGxlKGJyb3dzZXJJZCkpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgY29uc3QgdGl0bGUgPSBhd2FpdCB0aGlzLnBsdWdpbi5ydW5Jbml0U2NyaXB0KGJyb3dzZXJJZCwgR0VUX1RJVExFX1NDUklQVCk7XG5cbiAgICAgICAgaWYgKCFhd2FpdCBicm93c2VyVG9vbHMuaXNNYXhpbWl6ZWQodGl0bGUpKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTaXplID0gYXdhaXQgdGhpcy5wbHVnaW4ucnVuSW5pdFNjcmlwdChicm93c2VySWQsIEdFVF9XSU5ET1dfRElNRU5TSU9OU19JTkZPX1NDUklQVCkgYXMgV2luZG93RGltZW50aW9uc0luZm87XG4gICAgICAgIGNvbnN0IGV0YWxvblNpemUgID0gc3VidHJhY3RTaXplcyhjdXJyZW50U2l6ZSwgUkVTSVpFX0RJRkZfU0laRSk7XG5cbiAgICAgICAgYXdhaXQgYnJvd3NlclRvb2xzLnJlc2l6ZSh0aXRsZSwgY3VycmVudFNpemUud2lkdGgsIGN1cnJlbnRTaXplLmhlaWdodCwgZXRhbG9uU2l6ZS53aWR0aCwgZXRhbG9uU2l6ZS5oZWlnaHQpO1xuXG4gICAgICAgIGxldCByZXNpemVkU2l6ZSAgICA9IGF3YWl0IHRoaXMucGx1Z2luLnJ1bkluaXRTY3JpcHQoYnJvd3NlcklkLCBHRVRfV0lORE9XX0RJTUVOU0lPTlNfSU5GT19TQ1JJUFQpIGFzIFdpbmRvd0RpbWVudGlvbnNJbmZvO1xuICAgICAgICBsZXQgY29ycmVjdGlvblNpemUgPSBzdWJ0cmFjdFNpemVzKHJlc2l6ZWRTaXplLCBldGFsb25TaXplKTtcblxuICAgICAgICBhd2FpdCBicm93c2VyVG9vbHMucmVzaXplKHRpdGxlLCByZXNpemVkU2l6ZS53aWR0aCwgcmVzaXplZFNpemUuaGVpZ2h0LCBldGFsb25TaXplLndpZHRoLCBldGFsb25TaXplLmhlaWdodCk7XG5cbiAgICAgICAgcmVzaXplZFNpemUgPSBhd2FpdCB0aGlzLnBsdWdpbi5ydW5Jbml0U2NyaXB0KGJyb3dzZXJJZCwgR0VUX1dJTkRPV19ESU1FTlNJT05TX0lORk9fU0NSSVBUKSBhcyBXaW5kb3dEaW1lbnRpb25zSW5mbztcblxuICAgICAgICBjb3JyZWN0aW9uU2l6ZSA9IHN1bVNpemVzKGNvcnJlY3Rpb25TaXplLCBzdWJ0cmFjdFNpemVzKHJlc2l6ZWRTaXplLCBldGFsb25TaXplKSk7XG5cbiAgICAgICAgaWYgKHRoaXMubG9jYWxCcm93c2Vyc0luZm9bYnJvd3NlcklkXSlcbiAgICAgICAgICAgIHRoaXMubG9jYWxCcm93c2Vyc0luZm9bYnJvd3NlcklkXS5yZXNpemVDb3JyZWN0aW9ucyA9IGNvcnJlY3Rpb25TaXplO1xuXG4gICAgICAgIGF3YWl0IGJyb3dzZXJUb29scy5tYXhpbWl6ZSh0aXRsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfY2FsY3VsYXRlTWFjU2l6ZUxpbWl0cyAoYnJvd3NlcklkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0Jyb3dzZXJJZGxlKGJyb3dzZXJJZCkpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgc2l6ZUluZm8gPSBhd2FpdCB0aGlzLnBsdWdpbi5ydW5Jbml0U2NyaXB0KGJyb3dzZXJJZCwgR0VUX1dJTkRPV19ESU1FTlNJT05TX0lORk9fU0NSSVBUKSBhcyBXaW5kb3dEaW1lbnRpb25zSW5mbztcblxuICAgICAgICBpZiAodGhpcy5sb2NhbEJyb3dzZXJzSW5mb1ticm93c2VySWRdKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2FsQnJvd3NlcnNJbmZvW2Jyb3dzZXJJZF0ubWF4U2NyZWVuU2l6ZSA9IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogIHNpemVJbmZvLmF2YWlsYWJsZVdpZHRoIC0gKHNpemVJbmZvLm91dGVyV2lkdGggLSBzaXplSW5mby53aWR0aCksXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBzaXplSW5mby5hdmFpbGFibGVIZWlnaHQgLSAoc2l6ZUluZm8ub3V0ZXJIZWlnaHQgLSBzaXplSW5mby5oZWlnaHQpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgX2Vuc3VyZUJyb3dzZXJXaW5kb3dEZXNjcmlwdG9yIChicm93c2VySWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAodGhpcy5fZ2V0V2luZG93RGVzY3JpcHRvcihicm93c2VySWQpKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGF3YWl0IHRoaXMuX2Vuc3VyZUxvY2FsQnJvd3NlckluZm8oYnJvd3NlcklkKTtcblxuICAgICAgICAvLyBOT1RFOiBkZWxheSB0byBlbnN1cmUgdGhlIHdpbmRvdyBmaW5pc2hlZCB0aGUgb3BlbmluZ1xuICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi53YWl0Rm9yQ29ubmVjdGlvblJlYWR5KGJyb3dzZXJJZCk7XG4gICAgICAgIGF3YWl0IGRlbGF5KEJST1dTRVJfT1BFTklOR19ERUxBWSk7XG5cbiAgICAgICAgaWYgKHRoaXMubG9jYWxCcm93c2Vyc0luZm9bYnJvd3NlcklkXSkge1xuICAgICAgICAgICAgY29uc3QgY29ubmVjdGlvbiAgICAgPSBCcm93c2VyQ29ubmVjdGlvbi5nZXRCeUlkKGJyb3dzZXJJZCkgYXMgQnJvd3NlckNvbm5lY3Rpb247XG4gICAgICAgICAgICBsZXQgd2luZG93RGVzY3JpcHRvciA9IG51bGw7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgd2luZG93RGVzY3JpcHRvciA9IGF3YWl0IHRoaXMuX2ZpbmRXaW5kb3coYnJvd3NlcklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgICAgICAgICAgIC8vIE5PVEU6IFdlIGNhbiBzdXBwcmVzcyB0aGUgZXJyb3IgaGVyZSBzaW5jZSB3ZSBjYW4ganVzdCBkaXNhYmxlIHdpbmRvdyBtYW5pcHVsYXRpb24gZnVuY3Rpb25zXG4gICAgICAgICAgICAgICAgLy8gd2hlbiB3ZSBjYW5ub3QgZmluZCBhIGxvY2FsIHdpbmRvdyBkZXNjcmlwdG9yXG4gICAgICAgICAgICAgICAgREVCVUdfTE9HR0VSKGVycik7XG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5hZGRXYXJuaW5nKFxuICAgICAgICAgICAgICAgICAgICBXQVJOSU5HX01FU1NBR0UuY2Fubm90RmluZFdpbmRvd0Rlc2NyaXB0b3JFcnJvcixcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5icm93c2VySW5mby5hbGlhcyxcbiAgICAgICAgICAgICAgICAgICAgZXJyLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9zZXRXaW5kb3dEZXNjcmlwdG9yKGJyb3dzZXJJZCwgd2luZG93RGVzY3JpcHRvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIF9lbnN1cmVCcm93c2VyV2luZG93UGFyYW1ldGVycyAoYnJvd3NlcklkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5fZW5zdXJlQnJvd3NlcldpbmRvd0Rlc2NyaXB0b3IoYnJvd3NlcklkKTtcblxuICAgICAgICBpZiAoT1Mud2luICYmICF0aGlzLl9nZXRSZXNpemVDb3JyZWN0aW9ucyhicm93c2VySWQpKVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fY2FsY3VsYXRlUmVzaXplQ29ycmVjdGlvbnMoYnJvd3NlcklkKTtcbiAgICAgICAgZWxzZSBpZiAoT1MubWFjICYmICF0aGlzLl9nZXRNYXhTY3JlZW5TaXplKGJyb3dzZXJJZCkpXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9jYWxjdWxhdGVNYWNTaXplTGltaXRzKGJyb3dzZXJJZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfY2xvc2VMb2NhbEJyb3dzZXIgKGJyb3dzZXJJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICh0aGlzLnBsdWdpbi5uZWVkQ2xlYW5VcEJyb3dzZXJJbmZvKVxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uY2xlYW5VcEJyb3dzZXJJbmZvKGJyb3dzZXJJZCk7XG5cbiAgICAgICAgY29uc3Qgd2luZG93RGVzY3JpcHRvciA9IHRoaXMuX2dldFdpbmRvd0Rlc2NyaXB0b3IoYnJvd3NlcklkKTtcblxuICAgICAgICBhd2FpdCBicm93c2VyVG9vbHMuY2xvc2Uod2luZG93RGVzY3JpcHRvcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfcmVzaXplTG9jYWxCcm93c2VyV2luZG93IChicm93c2VySWQ6IHN0cmluZywgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGN1cnJlbnRXaWR0aDogbnVtYmVyLCBjdXJyZW50SGVpZ2h0OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5fZW5zdXJlQnJvd3NlcldpbmRvd0Rlc2NyaXB0b3IoYnJvd3NlcklkKTtcblxuICAgICAgICBjb25zdCByZXNpemVDb3JyZWN0aW9ucyA9IHRoaXMuX2dldFJlc2l6ZUNvcnJlY3Rpb25zKGJyb3dzZXJJZCk7XG5cbiAgICAgICAgaWYgKHJlc2l6ZUNvcnJlY3Rpb25zICYmIGF3YWl0IGJyb3dzZXJUb29scy5pc01heGltaXplZCh0aGlzLl9nZXRXaW5kb3dEZXNjcmlwdG9yKGJyb3dzZXJJZCkpKSB7XG4gICAgICAgICAgICB3aWR0aCAtPSByZXNpemVDb3JyZWN0aW9ucy53aWR0aDtcbiAgICAgICAgICAgIGhlaWdodCAtPSByZXNpemVDb3JyZWN0aW9ucy5oZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBicm93c2VyVG9vbHMucmVzaXplKHRoaXMuX2dldFdpbmRvd0Rlc2NyaXB0b3IoYnJvd3NlcklkKSwgY3VycmVudFdpZHRoLCBjdXJyZW50SGVpZ2h0LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIF90YWtlTG9jYWxCcm93c2VyU2NyZWVuc2hvdCAoYnJvd3NlcklkOiBzdHJpbmcsIHNjcmVlbnNob3RQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgYnJvd3NlclRvb2xzLnNjcmVlbnNob3QodGhpcy5fZ2V0V2luZG93RGVzY3JpcHRvcihicm93c2VySWQpLCBzY3JlZW5zaG90UGF0aCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfY2FuUmVzaXplTG9jYWxCcm93c2VyV2luZG93VG9EaW1lbnNpb25zIChicm93c2VySWQ6IHN0cmluZywgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYgKCFPUy5tYWMpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICBjb25zdCBtYXhTY3JlZW5TaXplID0gdGhpcy5fZ2V0TWF4U2NyZWVuU2l6ZShicm93c2VySWQpIGFzIFNpemU7XG5cbiAgICAgICAgcmV0dXJuIHdpZHRoIDw9IG1heFNjcmVlblNpemUud2lkdGggJiYgaGVpZ2h0IDw9IG1heFNjcmVlblNpemUuaGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgX21heGltaXplTG9jYWxCcm93c2VyV2luZG93IChicm93c2VySWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLl9lbnN1cmVCcm93c2VyV2luZG93RGVzY3JpcHRvcihicm93c2VySWQpO1xuXG4gICAgICAgIGF3YWl0IGJyb3dzZXJUb29scy5tYXhpbWl6ZSh0aGlzLl9nZXRXaW5kb3dEZXNjcmlwdG9yKGJyb3dzZXJJZCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgX2Vuc3VyZVJldHJ5VGVzdFBhZ2VzV2FybmluZyAoYnJvd3NlcklkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IEJyb3dzZXJDb25uZWN0aW9uLmdldEJ5SWQoYnJvd3NlcklkKSBhcyBCcm93c2VyQ29ubmVjdGlvbjtcblxuICAgICAgICBpZiAoY29ubmVjdGlvbj8ucmV0cnlUZXN0UGFnZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzU2VydmljZVdvcmtlckVuYWJsZWQgPSBhd2FpdCB0aGlzLnBsdWdpbi5ydW5Jbml0U2NyaXB0KGJyb3dzZXJJZCwgR0VUX0lTX1NFUlZJQ0VfV09SS0VSX0VOQUJMRUQpO1xuXG4gICAgICAgICAgICBpZiAoIWlzU2VydmljZVdvcmtlckVuYWJsZWQpXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5hZGRXYXJuaW5nKFdBUk5JTkdfTUVTU0FHRS5yZXRyeVRlc3RQYWdlc0lzTm90U3VwcG9ydGVkLCBjb25uZWN0aW9uLmJyb3dzZXJJbmZvLmFsaWFzLCBjb25uZWN0aW9uLmJyb3dzZXJJbmZvLmFsaWFzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBjYW5Vc2VEZWZhdWx0V2luZG93QWN0aW9ucyAoYnJvd3NlcklkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgaXNMb2NhbEJyb3dzZXIgICAgPSBhd2FpdCB0aGlzLnBsdWdpbi5pc0xvY2FsQnJvd3Nlcihicm93c2VySWQpO1xuICAgICAgICBjb25zdCBpc0hlYWRsZXNzQnJvd3NlciA9IGF3YWl0IHRoaXMucGx1Z2luLmlzSGVhZGxlc3NCcm93c2VyKGJyb3dzZXJJZCk7XG5cbiAgICAgICAgcmV0dXJuIGlzTG9jYWxCcm93c2VyICYmICFpc0hlYWRsZXNzQnJvd3NlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgaW5pdCAoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGluaXRpYWxpemVkID0gYXdhaXQgdGhpcy5pbml0UHJvbWlzZTtcblxuICAgICAgICBpZiAoaW5pdGlhbGl6ZWQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5pbml0UHJvbWlzZSA9IHRoaXMucGx1Z2luXG4gICAgICAgICAgICAuaW5pdCgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0cnVlKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5pbml0UHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBkaXNwb3NlICgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgaW5pdGlhbGl6ZWQgPSBhd2FpdCB0aGlzLmluaXRQcm9taXNlO1xuXG4gICAgICAgIGlmICghaW5pdGlhbGl6ZWQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5pbml0UHJvbWlzZSA9IHRoaXMucGx1Z2luXG4gICAgICAgICAgICAuZGlzcG9zZSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiBmYWxzZSk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5pdFByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcblxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgaXNMb2NhbEJyb3dzZXIgKGJyb3dzZXJJZD86IHN0cmluZywgYnJvd3Nlck5hbWU/OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucGx1Z2luLmlzTG9jYWxCcm93c2VyKGJyb3dzZXJJZCwgYnJvd3Nlck5hbWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0hlYWRsZXNzQnJvd3NlciAoYnJvd3NlcklkPzogc3RyaW5nLCBicm93c2VyTmFtZT86IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wbHVnaW4uaXNIZWFkbGVzc0Jyb3dzZXIoYnJvd3NlcklkLCBicm93c2VyTmFtZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGdldE9TSW5mbyAoYnJvd3NlcklkOiBzdHJpbmcpOiBQcm9taXNlPE9TSW5mbyB8IG51bGw+IHtcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuaXNMb2NhbEJyb3dzZXIoYnJvd3NlcklkKSlcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBnZXRMb2NhbE9TSW5mbygpO1xuXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnBsdWdpbi5nZXRPU0luZm8oYnJvd3NlcklkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgb3BlbkJyb3dzZXIgKGJyb3dzZXJJZDogc3RyaW5nLCBwYWdlVXJsOiBzdHJpbmcsIGJyb3dzZXJPcHRpb246IHVua25vd24sIGFkZGl0aW9uYWxPcHRpb25zOiBPcGVuQnJvd3NlckFkZGl0aW9uYWxPcHRpb25zID0geyBkaXNhYmxlTXVsdGlwbGVXaW5kb3dzOiBmYWxzZSB9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLm9wZW5Ccm93c2VyKGJyb3dzZXJJZCwgcGFnZVVybCwgYnJvd3Nlck9wdGlvbiwgYWRkaXRpb25hbE9wdGlvbnMpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMuX2Vuc3VyZVJldHJ5VGVzdFBhZ2VzV2FybmluZyhicm93c2VySWQpO1xuXG4gICAgICAgIGlmIChhd2FpdCB0aGlzLmNhblVzZURlZmF1bHRXaW5kb3dBY3Rpb25zKGJyb3dzZXJJZCkpXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9lbnN1cmVCcm93c2VyV2luZG93UGFyYW1ldGVycyhicm93c2VySWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBjbG9zZUJyb3dzZXIgKGJyb3dzZXJJZDogc3RyaW5nLCBkYXRhOiBCcm93c2VyQ2xvc2luZ0luZm8pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgY2FuVXNlRGVmYXVsdFdpbmRvd0FjdGlvbnMgPSBhd2FpdCB0aGlzLmNhblVzZURlZmF1bHRXaW5kb3dBY3Rpb25zKGJyb3dzZXJJZCk7XG4gICAgICAgIGNvbnN0IGN1c3RvbUFjdGlvbnNJbmZvICAgICAgICAgID0gYXdhaXQgdGhpcy5oYXNDdXN0b21BY3Rpb25Gb3JCcm93c2VyKGJyb3dzZXJJZCk7XG4gICAgICAgIGNvbnN0IGhhc0N1c3RvbUNsb3NlQnJvd3NlciAgICAgID0gY3VzdG9tQWN0aW9uc0luZm8uaGFzQ2xvc2VCcm93c2VyO1xuICAgICAgICBjb25zdCB1c2VQbHVnaW5zQ2xvc2VCcm93c2VyICAgICA9IGhhc0N1c3RvbUNsb3NlQnJvd3NlciB8fCAhY2FuVXNlRGVmYXVsdFdpbmRvd0FjdGlvbnM7XG5cbiAgICAgICAgaWYgKHVzZVBsdWdpbnNDbG9zZUJyb3dzZXIpXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5jbG9zZUJyb3dzZXIoYnJvd3NlcklkLCBkYXRhKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fY2xvc2VMb2NhbEJyb3dzZXIoYnJvd3NlcklkKTtcblxuICAgICAgICBpZiAoY2FuVXNlRGVmYXVsdFdpbmRvd0FjdGlvbnMpXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5sb2NhbEJyb3dzZXJzSW5mb1ticm93c2VySWRdO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBnZXRCcm93c2VyTGlzdCAoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wbHVnaW4uZ2V0QnJvd3Nlckxpc3QoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgaXNWYWxpZEJyb3dzZXJOYW1lIChicm93c2VyTmFtZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnBsdWdpbi5pc1ZhbGlkQnJvd3Nlck5hbWUoYnJvd3Nlck5hbWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZXNpemVXaW5kb3cgKGJyb3dzZXJJZDogc3RyaW5nLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY3VycmVudFdpZHRoOiBudW1iZXIsIGN1cnJlbnRIZWlnaHQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBjYW5Vc2VEZWZhdWx0V2luZG93QWN0aW9ucyA9IGF3YWl0IHRoaXMuY2FuVXNlRGVmYXVsdFdpbmRvd0FjdGlvbnMoYnJvd3NlcklkKTtcbiAgICAgICAgY29uc3QgY3VzdG9tQWN0aW9uc0luZm8gICAgICAgICAgPSBhd2FpdCB0aGlzLmhhc0N1c3RvbUFjdGlvbkZvckJyb3dzZXIoYnJvd3NlcklkKTtcbiAgICAgICAgY29uc3QgaGFzQ3VzdG9tUmVzaXplV2luZG93ICAgICAgPSBjdXN0b21BY3Rpb25zSW5mby5oYXNSZXNpemVXaW5kb3c7XG5cblxuICAgICAgICBpZiAoY2FuVXNlRGVmYXVsdFdpbmRvd0FjdGlvbnMgJiYgIWhhc0N1c3RvbVJlc2l6ZVdpbmRvdykge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fcmVzaXplTG9jYWxCcm93c2VyV2luZG93KGJyb3dzZXJJZCwgd2lkdGgsIGhlaWdodCwgY3VycmVudFdpZHRoLCBjdXJyZW50SGVpZ2h0KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnJlc2l6ZVdpbmRvdyhicm93c2VySWQsIHdpZHRoLCBoZWlnaHQsIGN1cnJlbnRXaWR0aCwgY3VycmVudEhlaWdodCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGNhblJlc2l6ZVdpbmRvd1RvRGltZW5zaW9ucyAoYnJvd3NlcklkOiBzdHJpbmcsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IGNhblVzZURlZmF1bHRXaW5kb3dBY3Rpb25zICAgICA9IGF3YWl0IHRoaXMuY2FuVXNlRGVmYXVsdFdpbmRvd0FjdGlvbnMoYnJvd3NlcklkKTtcbiAgICAgICAgY29uc3QgY3VzdG9tQWN0aW9uc0luZm8gICAgICAgICAgICAgID0gYXdhaXQgdGhpcy5oYXNDdXN0b21BY3Rpb25Gb3JCcm93c2VyKGJyb3dzZXJJZCk7XG4gICAgICAgIGNvbnN0IGhhc0N1c3RvbUNhblJlc2l6ZVRvRGltZW5zaW9ucyA9IGN1c3RvbUFjdGlvbnNJbmZvLmhhc0NhblJlc2l6ZVdpbmRvd1RvRGltZW5zaW9ucztcblxuXG4gICAgICAgIGlmIChjYW5Vc2VEZWZhdWx0V2luZG93QWN0aW9ucyAmJiAhaGFzQ3VzdG9tQ2FuUmVzaXplVG9EaW1lbnNpb25zKVxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2NhblJlc2l6ZUxvY2FsQnJvd3NlcldpbmRvd1RvRGltZW5zaW9ucyhicm93c2VySWQsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnBsdWdpbi5jYW5SZXNpemVXaW5kb3dUb0RpbWVuc2lvbnMoYnJvd3NlcklkLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgbWF4aW1pemVXaW5kb3cgKGJyb3dzZXJJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGNhblVzZURlZmF1bHRXaW5kb3dBY3Rpb25zID0gYXdhaXQgdGhpcy5jYW5Vc2VEZWZhdWx0V2luZG93QWN0aW9ucyhicm93c2VySWQpO1xuICAgICAgICBjb25zdCBjdXN0b21BY3Rpb25zSW5mbyAgICAgICAgICA9IGF3YWl0IHRoaXMuaGFzQ3VzdG9tQWN0aW9uRm9yQnJvd3Nlcihicm93c2VySWQpO1xuICAgICAgICBjb25zdCBoYXNDdXN0b21NYXhpbWl6ZVdpbmRvdyAgICA9IGN1c3RvbUFjdGlvbnNJbmZvLmhhc01heGltaXplV2luZG93O1xuXG4gICAgICAgIGlmIChjYW5Vc2VEZWZhdWx0V2luZG93QWN0aW9ucyAmJiAhaGFzQ3VzdG9tTWF4aW1pemVXaW5kb3cpXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fbWF4aW1pemVMb2NhbEJyb3dzZXJXaW5kb3coYnJvd3NlcklkKTtcblxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wbHVnaW4ubWF4aW1pemVXaW5kb3coYnJvd3NlcklkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgdGFrZVNjcmVlbnNob3QgKGJyb3dzZXJJZDogc3RyaW5nLCBzY3JlZW5zaG90UGF0aDogc3RyaW5nLCBwYWdlV2lkdGg6IG51bWJlciwgcGFnZUhlaWdodDogbnVtYmVyLCBmdWxsUGFnZTogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBjYW5Vc2VEZWZhdWx0V2luZG93QWN0aW9ucyAgPSBhd2FpdCB0aGlzLmNhblVzZURlZmF1bHRXaW5kb3dBY3Rpb25zKGJyb3dzZXJJZCk7XG4gICAgICAgIGNvbnN0IGN1c3RvbUFjdGlvbnNJbmZvICAgICAgICAgICA9IGF3YWl0IHRoaXMuaGFzQ3VzdG9tQWN0aW9uRm9yQnJvd3Nlcihicm93c2VySWQpO1xuICAgICAgICBjb25zdCBoYXNDdXN0b21UYWtlU2NyZWVuc2hvdCAgICAgPSBjdXN0b21BY3Rpb25zSW5mby5oYXNUYWtlU2NyZWVuc2hvdDtcbiAgICAgICAgY29uc3QgY29ubmVjdGlvbiAgICAgICAgICAgICAgICAgID0gQnJvd3NlckNvbm5lY3Rpb24uZ2V0QnlJZChicm93c2VySWQpIGFzIEJyb3dzZXJDb25uZWN0aW9uO1xuICAgICAgICBjb25zdCB0YWtlTG9jYWxCcm93c2Vyc1NjcmVlbnNob3QgPSBjYW5Vc2VEZWZhdWx0V2luZG93QWN0aW9ucyAmJiAhaGFzQ3VzdG9tVGFrZVNjcmVlbnNob3Q7XG4gICAgICAgIGNvbnN0IGlzTG9jYWxGdWxsUGFnZU1vZGUgICAgICAgICA9IHRha2VMb2NhbEJyb3dzZXJzU2NyZWVuc2hvdCAmJiBmdWxsUGFnZTtcblxuICAgICAgICBpZiAoaXNMb2NhbEZ1bGxQYWdlTW9kZSkge1xuICAgICAgICAgICAgY29ubmVjdGlvbi5hZGRXYXJuaW5nKFdBUk5JTkdfTUVTU0FHRS5zY3JlZW5zaG90c0Z1bGxQYWdlTm90U3VwcG9ydGVkLCBjb25uZWN0aW9uLmJyb3dzZXJJbmZvLmFsaWFzKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgbWFrZURpcihkaXJuYW1lKHNjcmVlbnNob3RQYXRoKSk7XG5cbiAgICAgICAgaWYgKHRha2VMb2NhbEJyb3dzZXJzU2NyZWVuc2hvdClcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3Rha2VMb2NhbEJyb3dzZXJTY3JlZW5zaG90KGJyb3dzZXJJZCwgc2NyZWVuc2hvdFBhdGgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi50YWtlU2NyZWVuc2hvdChicm93c2VySWQsIHNjcmVlbnNob3RQYXRoLCBwYWdlV2lkdGgsIHBhZ2VIZWlnaHQsIGZ1bGxQYWdlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZ2V0VmlkZW9GcmFtZURhdGEgKGJyb3dzZXJJZDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGx1Z2luLmdldFZpZGVvRnJhbWVEYXRhKGJyb3dzZXJJZCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHN0YXJ0Q2FwdHVyaW5nVmlkZW8gKGJyb3dzZXJJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnN0YXJ0Q2FwdHVyaW5nVmlkZW8oYnJvd3NlcklkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgc3RvcENhcHR1cmluZ1ZpZGVvIChicm93c2VySWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zdG9wQ2FwdHVyaW5nVmlkZW8oYnJvd3NlcklkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgaGFzQ3VzdG9tQWN0aW9uRm9yQnJvd3NlciAoYnJvd3NlcklkOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wbHVnaW4uaGFzQ3VzdG9tQWN0aW9uRm9yQnJvd3Nlcihicm93c2VySWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZXBvcnRKb2JSZXN1bHQgKGJyb3dzZXJJZDogc3RyaW5nLCBzdGF0dXM6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnJlcG9ydEpvYlJlc3VsdChicm93c2VySWQsIHN0YXR1cywgZGF0YSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFjdGl2ZVdpbmRvd0lkIChicm93c2VySWQ6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBpZiAoIXRoaXMucGx1Z2luLnN1cHBvcnRNdWx0aXBsZVdpbmRvd3MpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gdGhpcy5wbHVnaW4uZ2V0QWN0aXZlV2luZG93SWQoYnJvd3NlcklkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0QWN0aXZlV2luZG93SWQgKGJyb3dzZXJJZDogc3RyaW5nLCB2YWw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnBsdWdpbi5zZXRBY3RpdmVXaW5kb3dJZChicm93c2VySWQsIHZhbCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIG9wZW5GaWxlUHJvdG9jb2wgKGJyb3dzZXJJZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5vcGVuRmlsZVByb3RvY29sKGJyb3dzZXJJZCwgdXJsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgY2xvc2VCcm93c2VyQ2hpbGRXaW5kb3cgKGJyb3dzZXJJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLmNsb3NlQnJvd3NlckNoaWxkV2luZG93KGJyb3dzZXJJZCk7XG4gICAgfVxufVxuIl19