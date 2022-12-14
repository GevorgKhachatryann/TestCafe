"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_formatter_1 = require("./command-formatter");
function formatCommand(command, result) {
    const commandFormatter = new command_formatter_1.CommandFormatter(command, result);
    return commandFormatter.format();
}
exports.default = formatCommand;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LWNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmVwb3J0ZXIvY29tbWFuZC9mb3JtYXQtY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDJEQUF1RDtBQUd2RCxTQUF3QixhQUFhLENBQUUsT0FBb0IsRUFBRSxNQUFlO0lBQ3hFLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxvQ0FBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFL0QsT0FBTyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNyQyxDQUFDO0FBSkQsZ0NBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtYXR0ZWRDb21tYW5kIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IENvbW1hbmRGb3JtYXR0ZXIgfSBmcm9tICcuL2NvbW1hbmQtZm9ybWF0dGVyJztcbmltcG9ydCB7IENvbW1hbmRCYXNlIH0gZnJvbSAnLi4vLi4vdGVzdC1ydW4vY29tbWFuZHMvYmFzZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdENvbW1hbmQgKGNvbW1hbmQ6IENvbW1hbmRCYXNlLCByZXN1bHQ6IHVua25vd24pOiBGb3JtYXR0ZWRDb21tYW5kIHtcbiAgICBjb25zdCBjb21tYW5kRm9ybWF0dGVyID0gbmV3IENvbW1hbmRGb3JtYXR0ZXIoY29tbWFuZCwgcmVzdWx0KTtcblxuICAgIHJldHVybiBjb21tYW5kRm9ybWF0dGVyLmZvcm1hdCgpO1xufVxuIl19