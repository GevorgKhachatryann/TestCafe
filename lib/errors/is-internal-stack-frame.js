"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const lodash_1 = require("lodash");
const internal_modules_prefix_1 = __importDefault(require("./internal-modules-prefix"));
const BABEL = require.resolve('@babel/core');
const BABEL_MODULES_DIR = BABEL.replace(new RegExp(`^(.*${(0, lodash_1.escapeRegExp)(path_1.sep)}node_modules${(0, lodash_1.escapeRegExp)(path_1.sep)})(.*)`), '$1');
const BABEL_7 = BABEL_MODULES_DIR + '@babel';
const BABEL_RELATED = BABEL_MODULES_DIR + 'babel-';
const REGENERATOR_RUNTIME = BABEL_MODULES_DIR + 'regenerator-runtime' + path_1.sep;
const GENSYNC = BABEL_MODULES_DIR + 'gensync'; // NOTE: @babel/parser uses this module internally.
const TESTCAFE_LIB = (0, path_1.join)(__dirname, '../');
const TESTCAFE_BIN = (0, path_1.join)(__dirname, '../../bin');
const TESTCAFE_SRC = (0, path_1.join)(__dirname, '../../src');
const TESTCAFE_HAMMERHEAD = require.resolve('testcafe-hammerhead');
const SOURCE_MAP_SUPPORT = require.resolve('source-map-support');
const INTERNAL_STARTS_WITH_PATH_SEGMENTS = [
    TESTCAFE_LIB,
    TESTCAFE_BIN,
    TESTCAFE_SRC,
    BABEL_RELATED,
    REGENERATOR_RUNTIME,
    GENSYNC,
    BABEL_7,
    internal_modules_prefix_1.default,
];
const INTERNAL_INCLUDES_PATH_SEGMENTS = [
    SOURCE_MAP_SUPPORT,
    TESTCAFE_HAMMERHEAD,
];
function isInternalFile(filename = '') {
    return !filename ||
        !filename.includes(path_1.sep) ||
        INTERNAL_INCLUDES_PATH_SEGMENTS.some(pathSegment => filename.includes(pathSegment)) ||
        INTERNAL_STARTS_WITH_PATH_SEGMENTS.some(pathSegment => filename.startsWith(pathSegment));
}
function default_1(frame) {
    // NOTE: filter out the internals of node.js and assertion libraries
    const filename = frame.getFileName();
    return isInternalFile(filename);
}
exports.default = default_1;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtaW50ZXJuYWwtc3RhY2stZnJhbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXJyb3JzL2lzLWludGVybmFsLXN0YWNrLWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0JBQWlDO0FBQ2pDLG1DQUFrRDtBQUNsRCx3RkFBZ0U7QUFHaEUsTUFBTSxLQUFLLEdBQWlCLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0QsTUFBTSxpQkFBaUIsR0FBSyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBQSxxQkFBUSxFQUFDLFVBQUcsQ0FBQyxlQUFlLElBQUEscUJBQVEsRUFBQyxVQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDckgsTUFBTSxPQUFPLEdBQWUsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO0FBQ3pELE1BQU0sYUFBYSxHQUFTLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztBQUN6RCxNQUFNLG1CQUFtQixHQUFHLGlCQUFpQixHQUFHLHFCQUFxQixHQUFHLFVBQUcsQ0FBQztBQUM1RSxNQUFNLE9BQU8sR0FBZSxpQkFBaUIsR0FBRyxTQUFTLENBQUMsQ0FBQyxtREFBbUQ7QUFDOUcsTUFBTSxZQUFZLEdBQVUsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ25ELE1BQU0sWUFBWSxHQUFVLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN6RCxNQUFNLFlBQVksR0FBVSxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDekQsTUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDbkUsTUFBTSxrQkFBa0IsR0FBSSxPQUFPLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFbEUsTUFBTSxrQ0FBa0MsR0FBRztJQUN2QyxZQUFZO0lBQ1osWUFBWTtJQUNaLFlBQVk7SUFDWixhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLE9BQU87SUFDUCxPQUFPO0lBQ1AsaUNBQXVCO0NBQzFCLENBQUM7QUFFRixNQUFNLCtCQUErQixHQUFHO0lBQ3BDLGtCQUFrQjtJQUNsQixtQkFBbUI7Q0FDdEIsQ0FBQztBQUVGLFNBQVMsY0FBYyxDQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ2xDLE9BQU8sQ0FBQyxRQUFRO1FBQ1osQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQUcsQ0FBQztRQUN2QiwrQkFBK0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25GLGtDQUFrQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUNqRyxDQUFDO0FBRUQsbUJBQXlCLEtBQWlCO0lBQ3RDLG9FQUFvRTtJQUNwRSxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFFckMsT0FBTyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQUxELDRCQUtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2VwLCBqb2luIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBlc2NhcGVSZWdFeHAgYXMgZXNjYXBlUmUgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IElOVEVSTkFMX01PRFVMRVNfUFJFRklYIGZyb20gJy4vaW50ZXJuYWwtbW9kdWxlcy1wcmVmaXgnO1xuaW1wb3J0IHsgU3RhY2tGcmFtZSB9IGZyb20gJ2Vycm9yLXN0YWNrLXBhcnNlcic7XG5cbmNvbnN0IEJBQkVMICAgICAgICAgICAgICAgPSByZXF1aXJlLnJlc29sdmUoJ0BiYWJlbC9jb3JlJyk7XG5jb25zdCBCQUJFTF9NT0RVTEVTX0RJUiAgID0gQkFCRUwucmVwbGFjZShuZXcgUmVnRXhwKGBeKC4qJHtlc2NhcGVSZShzZXApfW5vZGVfbW9kdWxlcyR7ZXNjYXBlUmUoc2VwKX0pKC4qKWApLCAnJDEnKTtcbmNvbnN0IEJBQkVMXzcgICAgICAgICAgICAgPSBCQUJFTF9NT0RVTEVTX0RJUiArICdAYmFiZWwnO1xuY29uc3QgQkFCRUxfUkVMQVRFRCAgICAgICA9IEJBQkVMX01PRFVMRVNfRElSICsgJ2JhYmVsLSc7XG5jb25zdCBSRUdFTkVSQVRPUl9SVU5USU1FID0gQkFCRUxfTU9EVUxFU19ESVIgKyAncmVnZW5lcmF0b3ItcnVudGltZScgKyBzZXA7XG5jb25zdCBHRU5TWU5DICAgICAgICAgICAgID0gQkFCRUxfTU9EVUxFU19ESVIgKyAnZ2Vuc3luYyc7IC8vIE5PVEU6IEBiYWJlbC9wYXJzZXIgdXNlcyB0aGlzIG1vZHVsZSBpbnRlcm5hbGx5LlxuY29uc3QgVEVTVENBRkVfTElCICAgICAgICA9IGpvaW4oX19kaXJuYW1lLCAnLi4vJyk7XG5jb25zdCBURVNUQ0FGRV9CSU4gICAgICAgID0gam9pbihfX2Rpcm5hbWUsICcuLi8uLi9iaW4nKTtcbmNvbnN0IFRFU1RDQUZFX1NSQyAgICAgICAgPSBqb2luKF9fZGlybmFtZSwgJy4uLy4uL3NyYycpO1xuY29uc3QgVEVTVENBRkVfSEFNTUVSSEVBRCA9IHJlcXVpcmUucmVzb2x2ZSgndGVzdGNhZmUtaGFtbWVyaGVhZCcpO1xuY29uc3QgU09VUkNFX01BUF9TVVBQT1JUICA9IHJlcXVpcmUucmVzb2x2ZSgnc291cmNlLW1hcC1zdXBwb3J0Jyk7XG5cbmNvbnN0IElOVEVSTkFMX1NUQVJUU19XSVRIX1BBVEhfU0VHTUVOVFMgPSBbXG4gICAgVEVTVENBRkVfTElCLFxuICAgIFRFU1RDQUZFX0JJTixcbiAgICBURVNUQ0FGRV9TUkMsXG4gICAgQkFCRUxfUkVMQVRFRCxcbiAgICBSRUdFTkVSQVRPUl9SVU5USU1FLFxuICAgIEdFTlNZTkMsXG4gICAgQkFCRUxfNyxcbiAgICBJTlRFUk5BTF9NT0RVTEVTX1BSRUZJWCxcbl07XG5cbmNvbnN0IElOVEVSTkFMX0lOQ0xVREVTX1BBVEhfU0VHTUVOVFMgPSBbXG4gICAgU09VUkNFX01BUF9TVVBQT1JULFxuICAgIFRFU1RDQUZFX0hBTU1FUkhFQUQsXG5dO1xuXG5mdW5jdGlvbiBpc0ludGVybmFsRmlsZSAoZmlsZW5hbWUgPSAnJyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhZmlsZW5hbWUgfHxcbiAgICAgICAgIWZpbGVuYW1lLmluY2x1ZGVzKHNlcCkgfHxcbiAgICAgICAgSU5URVJOQUxfSU5DTFVERVNfUEFUSF9TRUdNRU5UUy5zb21lKHBhdGhTZWdtZW50ID0+IGZpbGVuYW1lLmluY2x1ZGVzKHBhdGhTZWdtZW50KSkgfHxcbiAgICAgICAgSU5URVJOQUxfU1RBUlRTX1dJVEhfUEFUSF9TRUdNRU5UUy5zb21lKHBhdGhTZWdtZW50ID0+IGZpbGVuYW1lLnN0YXJ0c1dpdGgocGF0aFNlZ21lbnQpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGZyYW1lOiBTdGFja0ZyYW1lKTogYm9vbGVhbiB7XG4gICAgLy8gTk9URTogZmlsdGVyIG91dCB0aGUgaW50ZXJuYWxzIG9mIG5vZGUuanMgYW5kIGFzc2VydGlvbiBsaWJyYXJpZXNcbiAgICBjb25zdCBmaWxlbmFtZSA9IGZyYW1lLmdldEZpbGVOYW1lKCk7XG5cbiAgICByZXR1cm4gaXNJbnRlcm5hbEZpbGUoZmlsZW5hbWUpO1xufVxuIl19