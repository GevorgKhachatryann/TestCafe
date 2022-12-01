"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdpCookieProvider = void 0;
const url_1 = require("url");
const base_1 = require("../test-run/cookies/base");
const match_collection_1 = __importDefault(require("../utils/match-collection"));
const MAX_TIMESTAMP = 8640000000000000;
class CdpCookieProvider extends base_1.CookieProviderBase {
    async _getCdpClient() {
        const browserConnection = this.testRun.browserConnection;
        const browser = browserConnection.provider.plugin.openedBrowsers[browserConnection.id];
        return browser.browserClient.getActiveClient();
    }
    async initialize() {
        return this.deleteCookies();
    }
    async getCookies(externalCookies) {
        const client = await this._getCdpClient();
        const { cookies } = await client.Storage.getCookies({});
        return (0, match_collection_1.default)(cookies, externalCookies).map(this._cdpCookieToExternalCookie);
    }
    async setCookies(cookies, url) {
        const client = await this._getCdpClient();
        const { hostname = '', pathname = '/' } = url ? new url_1.URL(url) : {};
        await client.Network.setCookies({
            cookies: cookies.map(cookie => this._cookieOptionToCdpCookieParam(cookie, hostname, pathname)),
        });
    }
    async deleteCookies(cookies = [], urls = []) {
        const client = await this._getCdpClient();
        if (!cookies || !cookies.length)
            return client.Network.clearBrowserCookies();
        const parsedUrls = this._parseUrls(urls);
        let existingCookies = await this.getCookies([]);
        if (parsedUrls.length) {
            existingCookies = existingCookies.filter(cookie => parsedUrls
                .find(url => url.domain === cookie.domain && url.path === cookie.path));
        }
        existingCookies = (0, match_collection_1.default)(existingCookies, cookies);
        for (const cookie of existingCookies) {
            await client.Network.deleteCookies({
                name: cookie.name,
                domain: cookie.domain,
                path: cookie.path,
            });
        }
        return void 0;
    }
    _cdpCookieToExternalCookie(cookie) {
        var _a;
        return {
            name: cookie.name,
            value: cookie.value,
            domain: cookie.domain,
            maxAge: void 0,
            path: cookie.path,
            expires: void 0,
            secure: cookie.secure,
            httpOnly: cookie.httpOnly,
            sameSite: (_a = cookie.sameSite) !== null && _a !== void 0 ? _a : 'none',
        };
    }
    _cookieOptionToCdpCookieParam(cookie, hostname, pathname) {
        var _a, _b, _c;
        return {
            name: cookie.name,
            value: cookie.value,
            domain: (_a = cookie.domain) !== null && _a !== void 0 ? _a : hostname,
            path: (_b = cookie.path) !== null && _b !== void 0 ? _b : pathname,
            secure: cookie.secure,
            httpOnly: false,
            sameSite: cookie.sameSite,
            expires: ((_c = cookie.expires) === null || _c === void 0 ? void 0 : _c.getTime()) || MAX_TIMESTAMP,
        };
    }
    _parseUrls(urls) {
        return urls.map(url => {
            const { hostname, pathname } = new url_1.URL(url);
            return { domain: hostname, path: pathname };
        });
    }
}
exports.CdpCookieProvider = CdpCookieProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb3h5bGVzcy9jb29raWUtcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUEsNkJBQTBCO0FBRTFCLG1EQUE4RTtBQUU5RSxpRkFBd0Q7QUFJeEQsTUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUM7QUFFdkMsTUFBYSxpQkFBa0IsU0FBUSx5QkFBa0I7SUFDN0MsS0FBSyxDQUFDLGFBQWE7UUFDdkIsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3pELE1BQU0sT0FBTyxHQUFhLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWpHLE9BQU8sT0FBTyxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBRSxlQUFrQztRQUNoRCxNQUFNLE1BQU0sR0FBUSxNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMvQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV4RCxPQUFRLElBQUEsMEJBQWUsRUFBQyxPQUFPLEVBQUUsZUFBZSxDQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ3hHLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUFFLE9BQXdCLEVBQUUsR0FBVztRQUNuRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMxQyxNQUFNLEVBQUUs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RSxPQUFPLEVBQUUsS0FBSSxhQUFhO1NBQ3ZELENBQUM7SUFDTixDQUFDO0lBRU8sVUFBVSxDQUFFLElBQWM7UUFDOUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxTQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFNUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBekZELDhDQXlGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZW1vdGVDaHJvbWUgZnJvbSAnY2hyb21lLXJlbW90ZS1pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRXh0ZXJuYWxDb29raWVzIH0gZnJvbSAndGVzdGNhZmUtaGFtbWVyaGVhZCc7XG5pbXBvcnQgUHJvdG9jb2wgZnJvbSAnZGV2dG9vbHMtcHJvdG9jb2wnO1xuaW1wb3J0IENvb2tpZSA9IFByb3RvY29sLk5ldHdvcmsuQ29va2llO1xuaW1wb3J0IHsgVVJMIH0gZnJvbSAndXJsJztcbmltcG9ydCB7IENvb2tpZU9wdGlvbnMgfSBmcm9tICcuLi90ZXN0LXJ1bi9jb21tYW5kcy9vcHRpb25zJztcbmltcG9ydCB7IENvb2tpZVByb3ZpZGVyLCBDb29raWVQcm92aWRlckJhc2UgfSBmcm9tICcuLi90ZXN0LXJ1bi9jb29raWVzL2Jhc2UnO1xuaW1wb3J0IENvb2tpZVBhcmFtID0gUHJvdG9jb2wuTmV0d29yay5Db29raWVQYXJhbTtcbmltcG9ydCBtYXRjaENvbGxlY3Rpb24gZnJvbSAnLi4vdXRpbHMvbWF0Y2gtY29sbGVjdGlvbic7XG5cbmRlY2xhcmUgdHlwZSBDb29raWVTYW1lU2l0ZSA9ICdMYXgnIHwgJ1N0cmljdCcgfCAnTm9uZSc7XG5cbmNvbnN0IE1BWF9USU1FU1RBTVAgPSA4NjQwMDAwMDAwMDAwMDAwO1xuXG5leHBvcnQgY2xhc3MgQ2RwQ29va2llUHJvdmlkZXIgZXh0ZW5kcyBDb29raWVQcm92aWRlckJhc2UgaW1wbGVtZW50cyBDb29raWVQcm92aWRlciB7XG4gICAgcHJpdmF0ZSBhc3luYyBfZ2V0Q2RwQ2xpZW50ICgpOiBQcm9taXNlPHJlbW90ZUNocm9tZS5Qcm90b2NvbEFwaT4ge1xuICAgICAgICBjb25zdCBicm93c2VyQ29ubmVjdGlvbiA9IHRoaXMudGVzdFJ1bi5icm93c2VyQ29ubmVjdGlvbjtcbiAgICAgICAgY29uc3QgYnJvd3NlciAgICAgICAgICAgPSBicm93c2VyQ29ubmVjdGlvbi5wcm92aWRlci5wbHVnaW4ub3BlbmVkQnJvd3NlcnNbYnJvd3NlckNvbm5lY3Rpb24uaWRdO1xuXG4gICAgICAgIHJldHVybiBicm93c2VyLmJyb3dzZXJDbGllbnQuZ2V0QWN0aXZlQ2xpZW50KCk7XG4gICAgfVxuXG4gICAgYXN5bmMgaW5pdGlhbGl6ZSAoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZUNvb2tpZXMoKTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRDb29raWVzIChleHRlcm5hbENvb2tpZXM6IEV4dGVybmFsQ29va2llc1tdKTogUHJvbWlzZTxFeHRlcm5hbENvb2tpZXNbXT4ge1xuICAgICAgICBjb25zdCBjbGllbnQgICAgICA9IGF3YWl0IHRoaXMuX2dldENkcENsaWVudCgpO1xuICAgICAgICBjb25zdCB7IGNvb2tpZXMgfSA9IGF3YWl0IGNsaWVudC5TdG9yYWdlLmdldENvb2tpZXMoe30pO1xuXG4gICAgICAgIHJldHVybiAobWF0Y2hDb2xsZWN0aW9uKGNvb2tpZXMsIGV4dGVybmFsQ29va2llcykgYXMgQ29va2llW10pLm1hcCh0aGlzLl9jZHBDb29raWVUb0V4dGVybmFsQ29va2llKTtcbiAgICB9XG5cbiAgICBhc3luYyBzZXRDb29raWVzIChjb29raWVzOiBDb29raWVPcHRpb25zW10sIHVybDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHRoaXMuX2dldENkcENsaWVudCgpO1xuICAgICAgICBjb25zdCB7IGhvc3RuYW1lID0gJycsIHBhdGhuYW1lID0gJy8nIH0gPSB1cmwgPyBuZXcgVVJMKHVybCkgOiB7fTtcblxuICAgICAgICBhd2FpdCBjbGllbnQuTmV0d29yay5zZXRDb29raWVzKHtcbiAgICAgICAgICAgIGNvb2tpZXM6IGNvb2tpZXMubWFwKGNvb2tpZSA9PiB0aGlzLl9jb29raWVPcHRpb25Ub0NkcENvb2tpZVBhcmFtKGNvb2tpZSwgaG9zdG5hbWUsIHBhdGhuYW1lKSksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGRlbGV0ZUNvb2tpZXMgKGNvb2tpZXM6IENvb2tpZU9wdGlvbnNbXSA9IFtdLCB1cmxzOiBzdHJpbmdbXSA9IFtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHRoaXMuX2dldENkcENsaWVudCgpO1xuXG4gICAgICAgIGlmICghY29va2llcyB8fCAhY29va2llcy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gY2xpZW50Lk5ldHdvcmsuY2xlYXJCcm93c2VyQ29va2llcygpO1xuXG4gICAgICAgIGNvbnN0IHBhcnNlZFVybHMgICAgPSB0aGlzLl9wYXJzZVVybHModXJscyk7XG4gICAgICAgIGxldCBleGlzdGluZ0Nvb2tpZXMgPSBhd2FpdCB0aGlzLmdldENvb2tpZXMoW10pO1xuXG4gICAgICAgIGlmIChwYXJzZWRVcmxzLmxlbmd0aCkge1xuICAgICAgICAgICAgZXhpc3RpbmdDb29raWVzID0gZXhpc3RpbmdDb29raWVzLmZpbHRlcihjb29raWUgPT4gcGFyc2VkVXJsc1xuICAgICAgICAgICAgICAgIC5maW5kKHVybCA9PiB1cmwuZG9tYWluID09PSBjb29raWUuZG9tYWluICYmIHVybC5wYXRoID09PSBjb29raWUucGF0aCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXhpc3RpbmdDb29raWVzID0gbWF0Y2hDb2xsZWN0aW9uKGV4aXN0aW5nQ29va2llcywgY29va2llcykgYXMgRXh0ZXJuYWxDb29raWVzW107XG5cbiAgICAgICAgZm9yIChjb25zdCBjb29raWUgb2YgZXhpc3RpbmdDb29raWVzKSB7XG4gICAgICAgICAgICBhd2FpdCBjbGllbnQuTmV0d29yay5kZWxldGVDb29raWVzKHtcbiAgICAgICAgICAgICAgICBuYW1lOiAgIGNvb2tpZS5uYW1lLFxuICAgICAgICAgICAgICAgIGRvbWFpbjogY29va2llLmRvbWFpbixcbiAgICAgICAgICAgICAgICBwYXRoOiAgIGNvb2tpZS5wYXRoLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NkcENvb2tpZVRvRXh0ZXJuYWxDb29raWUgKGNvb2tpZTogQ29va2llKTogRXh0ZXJuYWxDb29raWVzIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6ICAgICBjb29raWUubmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiAgICBjb29raWUudmFsdWUsXG4gICAgICAgICAgICBkb21haW46ICAgY29va2llLmRvbWFpbixcbiAgICAgICAgICAgIG1heEFnZTogICB2b2lkIDAsXG4gICAgICAgICAgICBwYXRoOiAgICAgY29va2llLnBhdGgsXG4gICAgICAgICAgICBleHBpcmVzOiAgdm9pZCAwLFxuICAgICAgICAgICAgc2VjdXJlOiAgIGNvb2tpZS5zZWN1cmUsXG4gICAgICAgICAgICBodHRwT25seTogY29va2llLmh0dHBPbmx5LFxuICAgICAgICAgICAgc2FtZVNpdGU6IGNvb2tpZS5zYW1lU2l0ZSA/PyAnbm9uZScsXG4gICAgICAgIH0gYXMgdW5rbm93biBhcyBFeHRlcm5hbENvb2tpZXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29va2llT3B0aW9uVG9DZHBDb29raWVQYXJhbSAoY29va2llOiBDb29raWVPcHRpb25zLCBob3N0bmFtZTogc3RyaW5nLCBwYXRobmFtZTogc3RyaW5nKTogQ29va2llUGFyYW0ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogICAgIGNvb2tpZS5uYW1lLFxuICAgICAgICAgICAgdmFsdWU6ICAgIGNvb2tpZS52YWx1ZSxcbiAgICAgICAgICAgIGRvbWFpbjogICBjb29raWUuZG9tYWluID8/IGhvc3RuYW1lLFxuICAgICAgICAgICAgcGF0aDogICAgIGNvb2tpZS5wYXRoID8/IHBhdGhuYW1lLFxuICAgICAgICAgICAgc2VjdXJlOiAgIGNvb2tpZS5zZWN1cmUsXG4gICAgICAgICAgICBodHRwT25seTogZmFsc2UsXG4gICAgICAgICAgICBzYW1lU2l0ZTogY29va2llLnNhbWVTaXRlIGFzIENvb2tpZVNhbWVTaXRlLFxuICAgICAgICAgICAgZXhwaXJlczogIGNvb2tpZS5leHBpcmVzPy5nZXRUaW1lKCkgfHwgTUFYX1RJTUVTVEFNUCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wYXJzZVVybHMgKHVybHM6IHN0cmluZ1tdKTogeyBkb21haW46IHN0cmluZywgcGF0aDogc3RyaW5nIH1bXSB7XG4gICAgICAgIHJldHVybiB1cmxzLm1hcCh1cmwgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBob3N0bmFtZSwgcGF0aG5hbWUgfSA9IG5ldyBVUkwodXJsKTtcblxuICAgICAgICAgICAgcmV0dXJuIHsgZG9tYWluOiBob3N0bmFtZSwgcGF0aDogcGF0aG5hbWUgfTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19