"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callsite_1 = __importDefault(require("callsite"));
const events_1 = require("events");
const TRACKING_MARK_RE = /^\$\$testcafe_test_run\$\$(\S+)\$\$$/;
const STACK_CAPACITY = 5000;
class TestRunTracker extends events_1.EventEmitter {
    constructor() {
        super();
        this.enabled = false;
        this.activeTestRuns = {};
    }
    _createContextSwitchingFunctionHook(ctxSwitchingFn, patchedArgsCount) {
        const tracker = this;
        return function () {
            const testRunId = tracker.getContextTestRunId();
            if (testRunId) {
                for (let i = 0; i < patchedArgsCount; i++) {
                    if (typeof arguments[i] === 'function')
                        arguments[i] = tracker.addTrackingMarkerToFunction(testRunId, arguments[i]);
                }
            }
            // @ts-ignore
            return ctxSwitchingFn.apply(this, arguments);
        };
    }
    _getStackFrames() {
        // NOTE: increase stack capacity to seek deep stack entries
        const savedLimit = Error.stackTraceLimit;
        Error.stackTraceLimit = STACK_CAPACITY;
        const frames = (0, callsite_1.default)();
        Error.stackTraceLimit = savedLimit;
        return frames;
    }
    getMarkedFnName(testRunId) {
        return `$$testcafe_test_run$$${testRunId}$$`;
    }
    ensureEnabled() {
        if (!this.enabled) {
            global.setTimeout = this._createContextSwitchingFunctionHook(global.setTimeout, 1);
            global.setInterval = this._createContextSwitchingFunctionHook(global.setInterval, 1);
            global.setImmediate = this._createContextSwitchingFunctionHook(global.setImmediate, 1);
            process.nextTick = this._createContextSwitchingFunctionHook(process.nextTick, 1);
            global.Promise.prototype.then = this._createContextSwitchingFunctionHook(global.Promise.prototype.then, 2);
            global.Promise.prototype.catch = this._createContextSwitchingFunctionHook(global.Promise.prototype.catch, 1);
            this.enabled = true;
        }
    }
    addTrackingMarkerToFunction(testRunId, fn) {
        const markerFactoryBody = `
            return function ${this.getMarkedFnName(testRunId)} () {
                switch (arguments.length) {
                    case 0: return fn.call(this);
                    case 1: return fn.call(this, arguments[0]);
                    case 2: return fn.call(this, arguments[0], arguments[1]);
                    case 3: return fn.call(this, arguments[0], arguments[1], arguments[2]);
                    case 4: return fn.call(this, arguments[0], arguments[1], arguments[2], arguments[3]);
                    default: return fn.apply(this, arguments);
                }
            };
        `;
        return new Function('fn', markerFactoryBody)(fn);
    }
    getContextTestRunId() {
        const frames = this._getStackFrames();
        // OPTIMIZATION: we start traversing from the bottom of the stack,
        // because we'll more likely encounter a marker there.
        // Async/await and Promise machinery executes lots of intrinsics
        // on timers (where we have a marker). And, since a timer initiates a new
        // stack, the marker will be at the very bottom of it.
        for (let i = frames.length - 1; i >= 0; i--) {
            const fnName = frames[i].getFunctionName();
            const match = fnName && fnName.match(TRACKING_MARK_RE);
            if (match)
                return match[1];
        }
        return null;
    }
    resolveContextTestRun() {
        const testRunId = this.getContextTestRunId();
        if (testRunId)
            return this.activeTestRuns[testRunId];
        return null;
    }
    addActiveTestRun(testRun) {
        this.activeTestRuns[testRun.id] = testRun;
        testRun.onAny((eventName, eventData) => this.emit(eventName, { testRun, data: eventData }));
    }
    removeActiveTestRun(id) {
        delete this.activeTestRuns[id];
    }
}
// Tracker
exports.default = new TestRunTracker();
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1ydW4tdHJhY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvdGVzdC1ydW4tdHJhY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFzQztBQUN0QyxtQ0FBc0M7QUFJdEMsTUFBTSxnQkFBZ0IsR0FBRyxzQ0FBc0MsQ0FBQztBQUNoRSxNQUFNLGNBQWMsR0FBSyxJQUFJLENBQUM7QUFFOUIsTUFBTSxjQUFlLFNBQVEscUJBQVk7SUFJckM7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUVSLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTyxtQ0FBbUMsQ0FBRSxjQUF3QixFQUFFLGdCQUF3QjtRQUMzRixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFFckIsT0FBTztZQUNILE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBRWhELElBQUksU0FBUyxFQUFFO2dCQUNYLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDdkMsSUFBSSxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVO3dCQUNsQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbkY7YUFDSjtZQUVELGFBQWE7WUFDYixPQUFPLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQztJQUNOLENBQUM7SUFFTyxlQUFlO1FBQ25CLDJEQUEyRDtRQUMzRCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDO1FBRXpDLEtBQUssQ0FB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QUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqSCxDQUFDO0lBRU0sbUJBQW1CLENBQUUsRUFBVTtRQUNsQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUNKO0FBRUQsVUFBVTtBQUNWLGtCQUFlLElBQUksY0FBYyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ2V0U3RhY2tGcmFtZXMgZnJvbSAnY2FsbHNpdGUnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCBUZXN0UnVuIGZyb20gJy4uL3Rlc3QtcnVuJztcbmltcG9ydCBUZXN0UnVuUHJveHkgZnJvbSAnLi4vc2VydmljZXMvY29tcGlsZXIvdGVzdC1ydW4tcHJveHknO1xuXG5jb25zdCBUUkFDS0lOR19NQVJLX1JFID0gL15cXCRcXCR0ZXN0Y2FmZV90ZXN0X3J1blxcJFxcJChcXFMrKVxcJFxcJCQvO1xuY29uc3QgU1RBQ0tfQ0FQQUNJVFkgICA9IDUwMDA7XG5cbmNsYXNzIFRlc3RSdW5UcmFja2VyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBwcml2YXRlIGVuYWJsZWQ6IGJvb2xlYW47XG4gICAgcHVibGljIGFjdGl2ZVRlc3RSdW5zOiB7IFtpZDogc3RyaW5nXTogVGVzdFJ1biB8IFRlc3RSdW5Qcm94eSB9O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hY3RpdmVUZXN0UnVucyA9IHt9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZUNvbnRleHRTd2l0Y2hpbmdGdW5jdGlvbkhvb2sgKGN0eFN3aXRjaGluZ0ZuOiBGdW5jdGlvbiwgcGF0Y2hlZEFyZ3NDb3VudDogbnVtYmVyKTogYW55IHtcbiAgICAgICAgY29uc3QgdHJhY2tlciA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHRlc3RSdW5JZCA9IHRyYWNrZXIuZ2V0Q29udGV4dFRlc3RSdW5JZCgpO1xuXG4gICAgICAgICAgICBpZiAodGVzdFJ1bklkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRjaGVkQXJnc0NvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbaV0gPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmd1bWVudHNbaV0gPSB0cmFja2VyLmFkZFRyYWNraW5nTWFya2VyVG9GdW5jdGlvbih0ZXN0UnVuSWQsIGFyZ3VtZW50c1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICByZXR1cm4gY3R4U3dpdGNoaW5nRm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRTdGFja0ZyYW1lcyAoKTogZ2V0U3RhY2tGcmFtZXMuQ2FsbFNpdGVbXSB7XG4gICAgICAgIC8vIE5PVEU6IGluY3JlYXNlIHN0YWNrIGNhcGFjaXR5IHRvIHNlZWsgZGVlcCBzdGFjayBlbnRyaWVzXG4gICAgICAgIGNvbnN0IHNhdmVkTGltaXQgPSBFcnJvci5zdGFja1RyYWNlTGltaXQ7XG5cbiAgICAgICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gU1RBQ0tfQ0FQQUNJVFk7XG5cbiAgICAgICAgY29uc3QgZnJhbWVzID0gZ2V0U3RhY2tGcmFtZXMoKTtcblxuICAgICAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgPSBzYXZlZExpbWl0O1xuXG4gICAgICAgIHJldHVybiBmcmFtZXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1hcmtlZEZuTmFtZSAodGVzdFJ1bklkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCQkdGVzdGNhZmVfdGVzdF9ydW4kJCR7dGVzdFJ1bklkfSQkYDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZW5zdXJlRW5hYmxlZCAoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICAgICAgICBnbG9iYWwuc2V0VGltZW91dCAgID0gdGhpcy5fY3JlYXRlQ29udGV4dFN3aXRjaGluZ0Z1bmN0aW9uSG9vayhnbG9iYWwuc2V0VGltZW91dCwgMSk7XG4gICAgICAgICAgICBnbG9iYWwuc2V0SW50ZXJ2YWwgID0gdGhpcy5fY3JlYXRlQ29udGV4dFN3aXRjaGluZ0Z1bmN0aW9uSG9vayhnbG9iYWwuc2V0SW50ZXJ2YWwsIDEpO1xuICAgICAgICAgICAgZ2xvYmFsLnNldEltbWVkaWF0ZSA9IHRoaXMuX2NyZWF0ZUNvbnRleHRTd2l0Y2hpbmdGdW5jdGlvbkhvb2soZ2xvYmFsLnNldEltbWVkaWF0ZSwgMSk7XG4gICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrICAgID0gdGhpcy5fY3JlYXRlQ29udGV4dFN3aXRjaGluZ0Z1bmN0aW9uSG9vayhwcm9jZXNzLm5leHRUaWNrLCAxKTtcblxuICAgICAgICAgICAgZ2xvYmFsLlByb21pc2UucHJvdG90eXBlLnRoZW4gID0gdGhpcy5fY3JlYXRlQ29udGV4dFN3aXRjaGluZ0Z1bmN0aW9uSG9vayhnbG9iYWwuUHJvbWlzZS5wcm90b3R5cGUudGhlbiwgMik7XG4gICAgICAgICAgICBnbG9iYWwuUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2ggPSB0aGlzLl9jcmVhdGVDb250ZXh0U3dpdGNoaW5nRnVuY3Rpb25Ib29rKGdsb2JhbC5Qcm9taXNlLnByb3RvdHlwZS5jYXRjaCwgMSk7XG5cbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkVHJhY2tpbmdNYXJrZXJUb0Z1bmN0aW9uICh0ZXN0UnVuSWQ6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgICAgICBjb25zdCBtYXJrZXJGYWN0b3J5Qm9keSA9IGBcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAke3RoaXMuZ2V0TWFya2VkRm5OYW1lKHRlc3RSdW5JZCl9ICgpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gZm4uY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gZm4uY2FsbCh0aGlzLCBhcmd1bWVudHNbMF0pO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiBmbi5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gZm4uY2FsbCh0aGlzLCBhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gZm4uY2FsbCh0aGlzLCBhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10pO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICBgO1xuXG4gICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oJ2ZuJywgbWFya2VyRmFjdG9yeUJvZHkpKGZuKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Q29udGV4dFRlc3RSdW5JZCAoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGZyYW1lcyA9IHRoaXMuX2dldFN0YWNrRnJhbWVzKCk7XG5cbiAgICAgICAgLy8gT1BUSU1JWkFUSU9OOiB3ZSBzdGFydCB0cmF2ZXJzaW5nIGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgc3RhY2ssXG4gICAgICAgIC8vIGJlY2F1c2Ugd2UnbGwgbW9yZSBsaWtlbHkgZW5jb3VudGVyIGEgbWFya2VyIHRoZXJlLlxuICAgICAgICAvLyBBc3luYy9hd2FpdCBhbmQgUHJvbWlzZSBtYWNoaW5lcnkgZXhlY3V0ZXMgbG90cyBvZiBpbnRyaW5zaWNzXG4gICAgICAgIC8vIG9uIHRpbWVycyAod2hlcmUgd2UgaGF2ZSBhIG1hcmtlcikuIEFuZCwgc2luY2UgYSB0aW1lciBpbml0aWF0ZXMgYSBuZXdcbiAgICAgICAgLy8gc3RhY2ssIHRoZSBtYXJrZXIgd2lsbCBiZSBhdCB0aGUgdmVyeSBib3R0b20gb2YgaXQuXG4gICAgICAgIGZvciAobGV0IGkgPSBmcmFtZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGNvbnN0IGZuTmFtZSA9IGZyYW1lc1tpXS5nZXRGdW5jdGlvbk5hbWUoKTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoICA9IGZuTmFtZSAmJiBmbk5hbWUubWF0Y2goVFJBQ0tJTkdfTUFSS19SRSk7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaClcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hbMV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVzb2x2ZUNvbnRleHRUZXN0UnVuICgpOiBUZXN0UnVuIHwgVGVzdFJ1blByb3h5IHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHRlc3RSdW5JZCA9IHRoaXMuZ2V0Q29udGV4dFRlc3RSdW5JZCgpO1xuXG4gICAgICAgIGlmICh0ZXN0UnVuSWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVUZXN0UnVuc1t0ZXN0UnVuSWRdO1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRBY3RpdmVUZXN0UnVuICh0ZXN0UnVuOiBUZXN0UnVuIHwgVGVzdFJ1blByb3h5KTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWN0aXZlVGVzdFJ1bnNbdGVzdFJ1bi5pZF0gPSB0ZXN0UnVuO1xuXG4gICAgICAgIHRlc3RSdW4ub25BbnkoKGV2ZW50TmFtZTogc3RyaW5nLCBldmVudERhdGE6IHVua25vd24pID0+IHRoaXMuZW1pdChldmVudE5hbWUsIHsgdGVzdFJ1biwgZGF0YTogZXZlbnREYXRhIH0pKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlQWN0aXZlVGVzdFJ1biAoaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBkZWxldGUgdGhpcy5hY3RpdmVUZXN0UnVuc1tpZF07XG4gICAgfVxufVxuXG4vLyBUcmFja2VyXG5leHBvcnQgZGVmYXVsdCBuZXcgVGVzdFJ1blRyYWNrZXIoKTtcbiJdfQ==