"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const argument_parsing_1 = require("../../../utils/argument-parsing");
const AVAILABLE_MODES = ['userProfile', 'headless'];
const configCache = {};
function hasCustomProfile(userArgs) {
    return !!(userArgs.match(/-P\s/) || userArgs.match(/-profile\s/));
}
function parseModes(modesStr, userArgs) {
    const parsed = (0, argument_parsing_1.splitEscaped)(modesStr, ':');
    const path = (0, argument_parsing_1.getPathFromParsedModes)(parsed, AVAILABLE_MODES);
    const detectedModes = (0, argument_parsing_1.getModes)(parsed, AVAILABLE_MODES);
    const optionsString = parsed.filter(item => !!item).join(':');
    const options = parsed.length ? (0, argument_parsing_1.splitEscaped)(optionsString, ';') : [];
    return {
        path: path,
        userProfile: detectedModes.userProfile || hasCustomProfile(userArgs),
        headless: detectedModes.headless,
        marionettePort: (0, argument_parsing_1.findMatch)(options, /^marionettePort=(.*)/),
        disableMultiprocessing: (0, argument_parsing_1.isMatchTrue)(options, /^disableMultiprocessing=(.*)/),
    };
}
function getNewConfig(configString) {
    const { userArgs, modesString } = (0, argument_parsing_1.parseConfig)(configString);
    const modes = parseModes(modesString, userArgs);
    return Object.assign({ userArgs }, modes);
}
function default_1(configString) {
    if (!configCache[configString])
        configCache[configString] = getNewConfig(configString);
    return configCache[configString];
}
exports.default = default_1;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2Jyb3dzZXIvcHJvdmlkZXIvYnVpbHQtaW4vZGVkaWNhdGVkL2ZpcmVmb3gvY29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0VBT3lDO0FBR3pDLE1BQU0sZUFBZSxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBRXBELE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUV2QixTQUFTLGdCQUFnQixDQUFFLFFBQVE7SUFDL0IsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztBQUN0RSxDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUUsUUFBUSxFQUFFLFFBQVE7SUFDbkMsTUFBTSxNQUFNLEdBQVUsSUFBQSwrQkFBWSxFQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNsRCxNQUFNLElBQUksR0FBWSxJQUFBLHlDQUFzQixFQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQztJQUN0RSxNQUFNLGFBQWEsR0FBRyxJQUFBLDJCQUFRLEVBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3hELE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlELE1BQU0sT0FBTyxHQUFTLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUEsK0JBQVksRUFBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUU1RSxPQUFPO1FBQ0gsSUFBSSxFQUFvQixJQUFJO1FBQzVCLFdBQVcsRUFBYSxhQUFhLENBQUMsV0FBVyxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztRQUMvRSxRQUFRLEVBQWdCLGFBQWEsQ0FBQyxRQUFRO1FBQzlDLGNBQWMsRUFBVSxJQUFBLDRCQUFTLEVBQUMsT0FBTyxFQUFFLHNCQUFzQixDQUFDO1FBQ2xFLHNCQUFzQixFQUFFLElBQUEsOEJBQVcsRUFBQyxPQUFPLEVBQUUsOEJBQThCLENBQUM7S0FDL0UsQ0FBQztBQUNOLENBQUM7QUFHRCxTQUFTLFlBQVksQ0FBRSxZQUFZO0lBQy9CLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBQSw4QkFBVyxFQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVELE1BQU0sS0FBSyxHQUF1QixVQUFVLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRXBFLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFFRCxtQkFBeUIsWUFBWTtJQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztRQUMxQixXQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRTNELE9BQU8sV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3JDLENBQUM7QUFMRCw0QkFLQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgZmluZE1hdGNoLFxuICAgIGlzTWF0Y2hUcnVlLFxuICAgIHNwbGl0RXNjYXBlZCxcbiAgICBwYXJzZUNvbmZpZyxcbiAgICBnZXRNb2RlcyxcbiAgICBnZXRQYXRoRnJvbVBhcnNlZE1vZGVzLFxufSBmcm9tICcuLi8uLi8uLi91dGlscy9hcmd1bWVudC1wYXJzaW5nJztcblxuXG5jb25zdCBBVkFJTEFCTEVfTU9ERVMgPSBbJ3VzZXJQcm9maWxlJywgJ2hlYWRsZXNzJ107XG5cbmNvbnN0IGNvbmZpZ0NhY2hlID0ge307XG5cbmZ1bmN0aW9uIGhhc0N1c3RvbVByb2ZpbGUgKHVzZXJBcmdzKSB7XG4gICAgcmV0dXJuICEhKHVzZXJBcmdzLm1hdGNoKC8tUFxccy8pIHx8IHVzZXJBcmdzLm1hdGNoKC8tcHJvZmlsZVxccy8pKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VNb2RlcyAobW9kZXNTdHIsIHVzZXJBcmdzKSB7XG4gICAgY29uc3QgcGFyc2VkICAgICAgICA9IHNwbGl0RXNjYXBlZChtb2Rlc1N0ciwgJzonKTtcbiAgICBjb25zdCBwYXRoICAgICAgICAgID0gZ2V0UGF0aEZyb21QYXJzZWRNb2RlcyhwYXJzZWQsIEFWQUlMQUJMRV9NT0RFUyk7XG4gICAgY29uc3QgZGV0ZWN0ZWRNb2RlcyA9IGdldE1vZGVzKHBhcnNlZCwgQVZBSUxBQkxFX01PREVTKTtcbiAgICBjb25zdCBvcHRpb25zU3RyaW5nID0gcGFyc2VkLmZpbHRlcihpdGVtID0+ICEhaXRlbSkuam9pbignOicpO1xuICAgIGNvbnN0IG9wdGlvbnMgICAgICAgPSBwYXJzZWQubGVuZ3RoID8gc3BsaXRFc2NhcGVkKG9wdGlvbnNTdHJpbmcsICc7JykgOiBbXTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHBhdGg6ICAgICAgICAgICAgICAgICAgIHBhdGgsXG4gICAgICAgIHVzZXJQcm9maWxlOiAgICAgICAgICAgIGRldGVjdGVkTW9kZXMudXNlclByb2ZpbGUgfHwgaGFzQ3VzdG9tUHJvZmlsZSh1c2VyQXJncyksXG4gICAgICAgIGhlYWRsZXNzOiAgICAgICAgICAgICAgIGRldGVjdGVkTW9kZXMuaGVhZGxlc3MsXG4gICAgICAgIG1hcmlvbmV0dGVQb3J0OiAgICAgICAgIGZpbmRNYXRjaChvcHRpb25zLCAvXm1hcmlvbmV0dGVQb3J0PSguKikvKSxcbiAgICAgICAgZGlzYWJsZU11bHRpcHJvY2Vzc2luZzogaXNNYXRjaFRydWUob3B0aW9ucywgL15kaXNhYmxlTXVsdGlwcm9jZXNzaW5nPSguKikvKSxcbiAgICB9O1xufVxuXG5cbmZ1bmN0aW9uIGdldE5ld0NvbmZpZyAoY29uZmlnU3RyaW5nKSB7XG4gICAgY29uc3QgeyB1c2VyQXJncywgbW9kZXNTdHJpbmcgfSA9IHBhcnNlQ29uZmlnKGNvbmZpZ1N0cmluZyk7XG4gICAgY29uc3QgbW9kZXMgICAgICAgICAgICAgICAgICAgICA9IHBhcnNlTW9kZXMobW9kZXNTdHJpbmcsIHVzZXJBcmdzKTtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgdXNlckFyZ3MgfSwgbW9kZXMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY29uZmlnU3RyaW5nKSB7XG4gICAgaWYgKCFjb25maWdDYWNoZVtjb25maWdTdHJpbmddKVxuICAgICAgICBjb25maWdDYWNoZVtjb25maWdTdHJpbmddID0gZ2V0TmV3Q29uZmlnKGNvbmZpZ1N0cmluZyk7XG5cbiAgICByZXR1cm4gY29uZmlnQ2FjaGVbY29uZmlnU3RyaW5nXTtcbn1cbiJdfQ==