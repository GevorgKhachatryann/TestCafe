"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assertion_1 = require("../../../../../test-run/commands/assertion");
const type_1 = __importDefault(require("../../../../../assertions/type"));
const ASSERTION_COMMAND_CONSTRUCTORS = new Map([
    [type_1.default.eql, assertion_1.EqlAssertionCommand],
    [type_1.default.notEql, assertion_1.NotEqlAssertionCommand],
    [type_1.default.ok, assertion_1.OkAssertionCommand],
    [type_1.default.notOk, assertion_1.NotOkAssertionCommand],
    [type_1.default.contains, assertion_1.ContainsAssertionCommand],
    [type_1.default.notContains, assertion_1.NotContainsAssertionCommand],
    [type_1.default.typeOf, assertion_1.TypeOfAssertionCommand],
    [type_1.default.notTypeOf, assertion_1.NotTypeOfAssertionCommand],
    [type_1.default.gt, assertion_1.GtAssertionCommand],
    [type_1.default.gte, assertion_1.GteAssertionCommand],
    [type_1.default.lt, assertion_1.LtAssertionCommand],
    [type_1.default.lte, assertion_1.LteAssertionCommand],
    [type_1.default.within, assertion_1.WithinAssertionCommand],
    [type_1.default.notWithin, assertion_1.NotWithinAssertionCommand],
    [type_1.default.match, assertion_1.MatchAssertionCommand],
    [type_1.default.notMatch, assertion_1.NotMatchAssertionCommand],
]);
exports.default = ASSERTION_COMMAND_CONSTRUCTORS;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0aW9uLWNvbW1hbmQtY29uc3RydWN0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3NlcmlhbGl6YXRpb24vcmVwbGljYXRvci90cmFuc2Zvcm1zL2NvbW1hbmQtYmFzZS10cmFzZm9ybS9hc3NlcnRpb24tY29tbWFuZC1jb25zdHJ1Y3RvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwRUFpQm9EO0FBRXBELDBFQUEyRDtBQUczRCxNQUFNLDhCQUE4QixHQUFHLElBQUksR0FBRyxDQUE2QjtJQUN2RSxDQUFDLGNBQWEsQ0FBQyxHQUFHLEVBQUUsK0JBQW1CLENBQUM7SUFDeEMsQ0FBQyxjQUFhLENBQUMsTUFBTSxFQUFFLGtDQUFzQixDQUFDO0lBQzlDLENBQUMsY0FBYSxDQUFDLEVBQUUsRUFBRSw4QkFBa0IsQ0FBQztJQUN0QyxDQUFDLGNBQWEsQ0FBQyxLQUFLLEVBQUUsaUNBQXFCLENBQUM7SUFDNUMsQ0FBQyxjQUFhLENBQUMsUUFBUSxFQUFFLG9DQUF3QixDQUFDO0lBQ2xELENBQUMsY0FBYSxDQUFDLFdBQVcsRUFBRSx1Q0FBMkIsQ0FBQztJQUN4RCxDQUFDLGNBQWEsQ0FBQyxNQUFNLEVBQUUsa0NBQXNCLENBQUM7SUFDOUMsQ0FBQyxjQUFhLENBQUMsU0FBUyxFQUFFLHFDQUF5QixDQUFDO0lBQ3BELENBQUMsY0FBYSxDQUFDLEVBQUUsRUFBRSw4QkFBa0IsQ0FBQztJQUN0QyxDQUFDLGNBQWEsQ0FBQyxHQUFHLEVBQUUsK0JBQW1CLENBQUM7SUFDeEMsQ0FBQyxjQUFhLENBQUMsRUFBRSxFQUFFLDhCQUFrQixDQUFDO0lBQ3RDLENBQUMsY0FBYSxDQUFDLEdBQUcsRUFBRSwrQkFBbUIsQ0FBQztJQUN4QyxDQUFDLGNBQWEsQ0FBQyxNQUFNLEVBQUUsa0NBQXNCLENBQUM7SUFDOUMsQ0FBQyxjQUFhLENBQUMsU0FBUyxFQUFFLHFDQUF5QixDQUFDO0lBQ3BELENBQUMsY0FBYSxDQUFDLEtBQUssRUFBRSxpQ0FBcUIsQ0FBQztJQUM1QyxDQUFDLGNBQWEsQ0FBQyxRQUFRLEVBQUUsb0NBQXdCLENBQUM7Q0FDckQsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsOEJBQThCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbnRhaW5zQXNzZXJ0aW9uQ29tbWFuZCxcbiAgICBFcWxBc3NlcnRpb25Db21tYW5kLFxuICAgIEd0QXNzZXJ0aW9uQ29tbWFuZCxcbiAgICBHdGVBc3NlcnRpb25Db21tYW5kLFxuICAgIEx0QXNzZXJ0aW9uQ29tbWFuZCxcbiAgICBMdGVBc3NlcnRpb25Db21tYW5kLFxuICAgIE1hdGNoQXNzZXJ0aW9uQ29tbWFuZCxcbiAgICBOb3RDb250YWluc0Fzc2VydGlvbkNvbW1hbmQsXG4gICAgTm90RXFsQXNzZXJ0aW9uQ29tbWFuZCxcbiAgICBOb3RNYXRjaEFzc2VydGlvbkNvbW1hbmQsXG4gICAgTm90T2tBc3NlcnRpb25Db21tYW5kLFxuICAgIE5vdFR5cGVPZkFzc2VydGlvbkNvbW1hbmQsXG4gICAgTm90V2l0aGluQXNzZXJ0aW9uQ29tbWFuZCxcbiAgICBPa0Fzc2VydGlvbkNvbW1hbmQsXG4gICAgVHlwZU9mQXNzZXJ0aW9uQ29tbWFuZCxcbiAgICBXaXRoaW5Bc3NlcnRpb25Db21tYW5kLFxufSBmcm9tICcuLi8uLi8uLi8uLi8uLi90ZXN0LXJ1bi9jb21tYW5kcy9hc3NlcnRpb24nO1xuaW1wb3J0IHsgQ29tbWFuZENvbnN0cnVjdG9yIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgQXNzZXJ0aW9uVHlwZSBmcm9tICcuLi8uLi8uLi8uLi8uLi9hc3NlcnRpb25zL3R5cGUnO1xuXG5cbmNvbnN0IEFTU0VSVElPTl9DT01NQU5EX0NPTlNUUlVDVE9SUyA9IG5ldyBNYXA8c3RyaW5nLCBDb21tYW5kQ29uc3RydWN0b3I+KFtcbiAgICBbQXNzZXJ0aW9uVHlwZS5lcWwsIEVxbEFzc2VydGlvbkNvbW1hbmRdLFxuICAgIFtBc3NlcnRpb25UeXBlLm5vdEVxbCwgTm90RXFsQXNzZXJ0aW9uQ29tbWFuZF0sXG4gICAgW0Fzc2VydGlvblR5cGUub2ssIE9rQXNzZXJ0aW9uQ29tbWFuZF0sXG4gICAgW0Fzc2VydGlvblR5cGUubm90T2ssIE5vdE9rQXNzZXJ0aW9uQ29tbWFuZF0sXG4gICAgW0Fzc2VydGlvblR5cGUuY29udGFpbnMsIENvbnRhaW5zQXNzZXJ0aW9uQ29tbWFuZF0sXG4gICAgW0Fzc2VydGlvblR5cGUubm90Q29udGFpbnMsIE5vdENvbnRhaW5zQXNzZXJ0aW9uQ29tbWFuZF0sXG4gICAgW0Fzc2VydGlvblR5cGUudHlwZU9mLCBUeXBlT2ZBc3NlcnRpb25Db21tYW5kXSxcbiAgICBbQXNzZXJ0aW9uVHlwZS5ub3RUeXBlT2YsIE5vdFR5cGVPZkFzc2VydGlvbkNvbW1hbmRdLFxuICAgIFtBc3NlcnRpb25UeXBlLmd0LCBHdEFzc2VydGlvbkNvbW1hbmRdLFxuICAgIFtBc3NlcnRpb25UeXBlLmd0ZSwgR3RlQXNzZXJ0aW9uQ29tbWFuZF0sXG4gICAgW0Fzc2VydGlvblR5cGUubHQsIEx0QXNzZXJ0aW9uQ29tbWFuZF0sXG4gICAgW0Fzc2VydGlvblR5cGUubHRlLCBMdGVBc3NlcnRpb25Db21tYW5kXSxcbiAgICBbQXNzZXJ0aW9uVHlwZS53aXRoaW4sIFdpdGhpbkFzc2VydGlvbkNvbW1hbmRdLFxuICAgIFtBc3NlcnRpb25UeXBlLm5vdFdpdGhpbiwgTm90V2l0aGluQXNzZXJ0aW9uQ29tbWFuZF0sXG4gICAgW0Fzc2VydGlvblR5cGUubWF0Y2gsIE1hdGNoQXNzZXJ0aW9uQ29tbWFuZF0sXG4gICAgW0Fzc2VydGlvblR5cGUubm90TWF0Y2gsIE5vdE1hdGNoQXNzZXJ0aW9uQ29tbWFuZF0sXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQgQVNTRVJUSU9OX0NPTU1BTkRfQ09OU1RSVUNUT1JTO1xuIl19