"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrepareClientEnvironmentInDebugMode = exports.GetActiveElementCommand = exports.UnlockPageCommand = exports.BackupStoragesCommand = exports.TestDoneCommand = exports.SetBreakpointCommand = exports.HideAssertionRetriesStatusCommand = exports.ShowAssertionRetriesStatusCommand = void 0;
const type_1 = __importDefault(require("./type"));
// Commands
class ShowAssertionRetriesStatusCommand {
    constructor(timeout) {
        this.type = type_1.default.showAssertionRetriesStatus;
        this.timeout = timeout;
    }
}
exports.ShowAssertionRetriesStatusCommand = ShowAssertionRetriesStatusCommand;
class HideAssertionRetriesStatusCommand {
    constructor(success) {
        this.type = type_1.default.hideAssertionRetriesStatus;
        this.success = success;
    }
}
exports.HideAssertionRetriesStatusCommand = HideAssertionRetriesStatusCommand;
class SetBreakpointCommand {
    constructor(isTestError, inCompilerService) {
        this.type = type_1.default.setBreakpoint;
        this.inCompilerService = inCompilerService;
        this.isTestError = isTestError;
    }
}
exports.SetBreakpointCommand = SetBreakpointCommand;
class TestDoneCommand {
    constructor() {
        this.type = type_1.default.testDone;
    }
}
exports.TestDoneCommand = TestDoneCommand;
class BackupStoragesCommand {
    constructor() {
        this.type = type_1.default.backupStorages;
    }
}
exports.BackupStoragesCommand = BackupStoragesCommand;
class UnlockPageCommand {
    constructor() {
        this.type = type_1.default.unlockPage;
    }
}
exports.UnlockPageCommand = UnlockPageCommand;
class GetActiveElementCommand {
    constructor() {
        this.type = type_1.default.getActiveElement;
    }
}
exports.GetActiveElementCommand = GetActiveElementCommand;
class PrepareClientEnvironmentInDebugMode {
    constructor(esmRuntime) {
        this.type = type_1.default.prepareClientEnvironmentInDebugMode;
        this.esmRuntime = esmRuntime;
    }
}
exports.PrepareClientEnvironmentInDebugMode = PrepareClientEnvironmentInDebugMode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0LXJ1bi9jb21tYW5kcy9zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUEwQjtBQUUxQixXQUFXO0FBQ1gsTUFBYSxpQ0FBaUM7SUFDMUMsWUFBYSxPQUFPO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQU0sY0FBSSxDQUFDLDBCQUEwQixDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7Q0FDSjtBQUxELDhFQUtDO0FBRUQsTUFBYSxpQ0FBaUM7SUFDMUMsWUFBYSxPQUFPO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQU0sY0FBSSxDQUFDLDBCQUEwQixDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7Q0FDSjtBQUxELDhFQUtDO0FBRUQsTUFBYSxvQkFBb0I7SUFDN0IsWUFBYSxXQUFXLEVBQUUsaUJBQWlCO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQWdCLGNBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQzNDLElBQUksQ0FBQyxXQUFXLEdBQVMsV0FBVyxDQUFDO0lBQ3pDLENBQUM7Q0FDSjtBQU5ELG9EQU1DO0FBRUQsTUFBYSxlQUFlO0lBQ3hCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxjQUFJLENBQUMsUUFBUSxDQUFDO0lBQzlCLENBQUM7Q0FDSjtBQUpELDBDQUlDO0FBRUQsTUFBYSxxQkFBcUI7SUFDOUI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQUksQ0FBQyxjQUFjLENBQUM7SUFDcEMsQ0FBQztDQUNKO0FBSkQsc0RBSUM7QUFFRCxNQUFhLGlCQUFpQjtJQUMxQjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBSSxDQUFDLFVBQVUsQ0FBQztJQUNoQyxDQUFDO0NBQ0o7QUFKRCw4Q0FJQztBQUVELE1BQWEsdUJBQXVCO0lBQ2hDO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxjQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDdEMsQ0FBQztDQUNKO0FBSkQsMERBSUM7QUFFRCxNQUFhLG1DQUFtQztJQUM1QyxZQUFhLFVBQVU7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBUyxjQUFJLENBQUMsbUNBQW1DLENBQUM7UUFDM0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztDQUNKO0FBTEQsa0ZBS0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVFlQRSBmcm9tICcuL3R5cGUnO1xuXG4vLyBDb21tYW5kc1xuZXhwb3J0IGNsYXNzIFNob3dBc3NlcnRpb25SZXRyaWVzU3RhdHVzQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IgKHRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy50eXBlICAgID0gVFlQRS5zaG93QXNzZXJ0aW9uUmV0cmllc1N0YXR1cztcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBIaWRlQXNzZXJ0aW9uUmV0cmllc1N0YXR1c0NvbW1hbmQge1xuICAgIGNvbnN0cnVjdG9yIChzdWNjZXNzKSB7XG4gICAgICAgIHRoaXMudHlwZSAgICA9IFRZUEUuaGlkZUFzc2VydGlvblJldHJpZXNTdGF0dXM7XG4gICAgICAgIHRoaXMuc3VjY2VzcyA9IHN1Y2Nlc3M7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2V0QnJlYWtwb2ludENvbW1hbmQge1xuICAgIGNvbnN0cnVjdG9yIChpc1Rlc3RFcnJvciwgaW5Db21waWxlclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy50eXBlICAgICAgICAgICAgICA9IFRZUEUuc2V0QnJlYWtwb2ludDtcbiAgICAgICAgdGhpcy5pbkNvbXBpbGVyU2VydmljZSA9IGluQ29tcGlsZXJTZXJ2aWNlO1xuICAgICAgICB0aGlzLmlzVGVzdEVycm9yICAgICAgID0gaXNUZXN0RXJyb3I7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGVzdERvbmVDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IFRZUEUudGVzdERvbmU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQmFja3VwU3RvcmFnZXNDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IFRZUEUuYmFja3VwU3RvcmFnZXM7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVW5sb2NrUGFnZUNvbW1hbmQge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy50eXBlID0gVFlQRS51bmxvY2tQYWdlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdldEFjdGl2ZUVsZW1lbnRDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IFRZUEUuZ2V0QWN0aXZlRWxlbWVudDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcmVwYXJlQ2xpZW50RW52aXJvbm1lbnRJbkRlYnVnTW9kZSB7XG4gICAgY29uc3RydWN0b3IgKGVzbVJ1bnRpbWUpIHtcbiAgICAgICAgdGhpcy50eXBlICAgICAgID0gVFlQRS5wcmVwYXJlQ2xpZW50RW52aXJvbm1lbnRJbkRlYnVnTW9kZTtcbiAgICAgICAgdGhpcy5lc21SdW50aW1lID0gZXNtUnVudGltZTtcbiAgICB9XG59XG4iXX0=