"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function default_1(arr, predicate) {
    const results = await Promise.all(arr.map(predicate));
    return arr.filter((_, index) => results[index]);
}
exports.default = default_1;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmMtZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2FzeW5jLWZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFlLEtBQUssb0JBQWUsR0FBUSxFQUFFLFNBQXFFO0lBQzlHLE1BQU0sT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFFdEQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDcEQsQ0FBQztBQUpELDRCQUlDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gPFQ+IChhcnI6IFRbXSwgcHJlZGljYXRlOiAodmFsdWU6IFJlYWRvbmx5PFQ+LCBpbmRleDogbnVtYmVyLCBhcnJheTogVFtdKSA9PiB1bmtub3duKTogUHJvbWlzZTxUW10+IHtcbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwoYXJyLm1hcChwcmVkaWNhdGUpKTtcblxuICAgIHJldHVybiBhcnIuZmlsdGVyKChfLCBpbmRleCkgPT4gcmVzdWx0c1tpbmRleF0pO1xufVxuIl19