"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recorder_1 = __importDefault(require("./recorder"));
class Videos {
    constructor(browserJobs, { videoPath, videoOptions, videoEncodingOptions }, warningLog, timeStamp) {
        const options = Object.assign({ timeStamp: timeStamp }, videoOptions);
        this.testVideoInfos = {};
        browserJobs.forEach(browserJob => {
            const recorder = this._createVideoRecorder(browserJob, videoPath, options, videoEncodingOptions, warningLog);
            recorder.on('test-run-video-saved', args => this._addTestRunVideoInfo(args));
        });
    }
    getTestVideos(testId) {
        const testVideoInfo = this.testVideoInfos[testId];
        return testVideoInfo ? testVideoInfo.recordings : [];
    }
    _createVideoRecorder(browserJob, videoPath, options, videoEncodingOptions, warningLog) {
        return new recorder_1.default(browserJob, videoPath, options, videoEncodingOptions, warningLog);
    }
    _addTestRunVideoInfo({ testRun, videoPath, singleFile, timecodes }) {
        const testId = testRun.test.id;
        let testVideo = this.testVideoInfos[testId];
        if (!testVideo) {
            testVideo = { recordings: [] };
            this.testVideoInfos[testId] = testVideo;
        }
        const recording = {
            testRunId: testRun.id,
            videoPath,
            singleFile,
        };
        if (timecodes)
            recording.timecodes = timecodes;
        testVideo.recordings.push(recording);
    }
}
exports.default = Videos;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZpZGVvLXJlY29yZGVyL3ZpZGVvcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDBEQUF1QztBQWF2QyxNQUFxQixNQUFNO0lBR3ZCLFlBQ0ksV0FBeUIsRUFBRSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQWdCLEVBQUUsVUFBc0IsRUFBRSxTQUF3QjtRQUM1SSxNQUFNLE9BQU8sbUJBQUssU0FBUyxFQUFFLFNBQVMsSUFBSyxZQUFZLENBQUUsQ0FBQztRQUUxRCxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUV6QixXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzdCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUU3RyxRQUFRLENBQUMsRUFBRSxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakYsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sYUFBYSxDQUFFLE1BQWM7UUFDaEMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVsRCxPQUFPLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3pELENBQUM7SUFFTyxvQkFBb0IsQ0FBRSxVQUFtQixFQUFFLFNBQWlCLEVBQUUsT0FBZ0IsRUFBRSxvQkFBNkIsRUFBRSxVQUFzQjtRQUN6SSxPQUFPLElBQUksa0JBQWEsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBRU8sb0JBQW9CLENBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQThCO1FBQ25HLE1BQU0sTUFBTSxHQUFtQixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMvQyxJQUFJLFNBQVMsR0FBa0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ1osU0FBUyxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBRS9CLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO1NBQzNDO1FBRUQsTUFBTSxTQUFTLEdBQXFCO1lBQ2hDLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBRTtZQUNyQixTQUFTO1lBQ1QsVUFBVTtTQUNiLENBQUM7UUFFRixJQUFJLFNBQVM7WUFDVCxTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUVwQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQ0o7QUEvQ0QseUJBK0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZGVvUmVjb3JkZXIgZnJvbSAnLi9yZWNvcmRlcic7XG5pbXBvcnQgQnJvd3NlckpvYiBmcm9tICcuLi9ydW5uZXIvYnJvd3Nlci1qb2InO1xuaW1wb3J0IHsgRGljdGlvbmFyeSB9IGZyb20gJy4uL2NvbmZpZ3VyYXRpb24vaW50ZXJmYWNlcyc7XG5pbXBvcnQgV2FybmluZ0xvZyBmcm9tICcuLi9ub3RpZmljYXRpb25zL3dhcm5pbmctbG9nJztcbmltcG9ydCB7XG4gICAgVmlkZW9PcHRpb25zLFxuICAgIFRlc3RWaWRlb0luZm8sXG4gICAgVGVzdFJ1blZpZGVvSW5mbyxcbiAgICBUZXN0UnVuVmlkZW9TYXZlZEV2ZW50QXJncyxcbn0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlb3Mge1xuICAgIHB1YmxpYyB0ZXN0VmlkZW9JbmZvczogRGljdGlvbmFyeTxUZXN0VmlkZW9JbmZvPjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoXG4gICAgICAgIGJyb3dzZXJKb2JzOiBCcm93c2VySm9iW10sIHsgdmlkZW9QYXRoLCB2aWRlb09wdGlvbnMsIHZpZGVvRW5jb2RpbmdPcHRpb25zIH06IFZpZGVvT3B0aW9ucywgd2FybmluZ0xvZzogV2FybmluZ0xvZywgdGltZVN0YW1wOiBtb21lbnQuTW9tZW50KSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IHRpbWVTdGFtcDogdGltZVN0YW1wLCAuLi52aWRlb09wdGlvbnMgfTtcblxuICAgICAgICB0aGlzLnRlc3RWaWRlb0luZm9zID0ge307XG5cbiAgICAgICAgYnJvd3NlckpvYnMuZm9yRWFjaChicm93c2VySm9iID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlY29yZGVyID0gdGhpcy5fY3JlYXRlVmlkZW9SZWNvcmRlcihicm93c2VySm9iLCB2aWRlb1BhdGgsIG9wdGlvbnMsIHZpZGVvRW5jb2RpbmdPcHRpb25zLCB3YXJuaW5nTG9nKTtcblxuICAgICAgICAgICAgcmVjb3JkZXIub24oJ3Rlc3QtcnVuLXZpZGVvLXNhdmVkJywgYXJncyA9PiB0aGlzLl9hZGRUZXN0UnVuVmlkZW9JbmZvKGFyZ3MpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRlc3RWaWRlb3MgKHRlc3RJZDogc3RyaW5nKTogVGVzdFJ1blZpZGVvSW5mb1tdIHtcbiAgICAgICAgY29uc3QgdGVzdFZpZGVvSW5mbyA9IHRoaXMudGVzdFZpZGVvSW5mb3NbdGVzdElkXTtcblxuICAgICAgICByZXR1cm4gdGVzdFZpZGVvSW5mbyA/IHRlc3RWaWRlb0luZm8ucmVjb3JkaW5ncyA6IFtdO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZVZpZGVvUmVjb3JkZXIgKGJyb3dzZXJKb2I6IHVua25vd24sIHZpZGVvUGF0aDogc3RyaW5nLCBvcHRpb25zOiB1bmtub3duLCB2aWRlb0VuY29kaW5nT3B0aW9uczogdW5rbm93biwgd2FybmluZ0xvZzogV2FybmluZ0xvZyk6IFZpZGVvUmVjb3JkZXIge1xuICAgICAgICByZXR1cm4gbmV3IFZpZGVvUmVjb3JkZXIoYnJvd3NlckpvYiwgdmlkZW9QYXRoLCBvcHRpb25zLCB2aWRlb0VuY29kaW5nT3B0aW9ucywgd2FybmluZ0xvZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYWRkVGVzdFJ1blZpZGVvSW5mbyAoeyB0ZXN0UnVuLCB2aWRlb1BhdGgsIHNpbmdsZUZpbGUsIHRpbWVjb2RlcyB9OiBUZXN0UnVuVmlkZW9TYXZlZEV2ZW50QXJncyk6IHZvaWQge1xuICAgICAgICBjb25zdCB0ZXN0SWQ6IHN0cmluZyAgICAgICAgID0gdGVzdFJ1bi50ZXN0LmlkO1xuICAgICAgICBsZXQgdGVzdFZpZGVvOiBUZXN0VmlkZW9JbmZvID0gdGhpcy50ZXN0VmlkZW9JbmZvc1t0ZXN0SWRdO1xuXG4gICAgICAgIGlmICghdGVzdFZpZGVvKSB7XG4gICAgICAgICAgICB0ZXN0VmlkZW8gPSB7IHJlY29yZGluZ3M6IFtdIH07XG5cbiAgICAgICAgICAgIHRoaXMudGVzdFZpZGVvSW5mb3NbdGVzdElkXSA9IHRlc3RWaWRlbztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlY29yZGluZzogVGVzdFJ1blZpZGVvSW5mbyA9IHtcbiAgICAgICAgICAgIHRlc3RSdW5JZDogdGVzdFJ1bi5pZCxcbiAgICAgICAgICAgIHZpZGVvUGF0aCxcbiAgICAgICAgICAgIHNpbmdsZUZpbGUsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRpbWVjb2RlcylcbiAgICAgICAgICAgIHJlY29yZGluZy50aW1lY29kZXMgPSB0aW1lY29kZXM7XG5cbiAgICAgICAgdGVzdFZpZGVvLnJlY29yZGluZ3MucHVzaChyZWNvcmRpbmcpO1xuICAgIH1cbn1cbiJdfQ==