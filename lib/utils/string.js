"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createList = exports.getToBeInPastTense = exports.getConcatenatedValuesString = exports.getPluralSuffix = exports.splitQuotedText = exports.wordWrap = exports.removeTTYColors = void 0;
const indent_string_1 = __importDefault(require("indent-string"));
const DEFAULT_CONCATENATED_VALUES = {
    SEPARATOR: ', ',
    QUOTE_CHAR: '"',
};
function rtrim(str) {
    return str.replace(/\s+$/, '');
}
function removeTTYColors(str) {
    return str.replace(/\033\[[0-9;]*m/g, '');
}
exports.removeTTYColors = removeTTYColors;
function wordWrap(str, indent, width) {
    let curStr = '';
    let wrappedMsg = '';
    if (removeTTYColors(str).length <= width - indent)
        return (0, indent_string_1.default)(str, ' ', indent);
    str = str.replace(/(\r\n)/gm, '\n')
        .split(/(\S+[ \t]+)|(\S+(?:\n))|(\n)/m)
        //NOTE: cut empty elements
        .filter(elm => !!elm);
    str.forEach(word => {
        const newStr = curStr + word;
        if (removeTTYColors(newStr).length > width - indent) {
            wrappedMsg += `${rtrim(curStr)}\n`;
            curStr = word;
        }
        else {
            if (curStr[curStr.length - 1] === '\n') {
                wrappedMsg += `${rtrim(curStr)}\n`;
                curStr = '';
            }
            curStr += word;
        }
    });
    return (0, indent_string_1.default)(wrappedMsg + curStr, ' ', indent);
}
exports.wordWrap = wordWrap;
function splitQuotedText(str, splitChar, quotes = '"\'') {
    let currentPart = '';
    const parts = [];
    let quoteChar = null;
    for (let i = 0; i < str.length; i++) {
        const currentChar = str[i];
        if (currentChar === splitChar) {
            if (quoteChar)
                currentPart += currentChar;
            else {
                parts.push(currentPart);
                currentPart = '';
            }
        }
        else if (quotes.indexOf(currentChar) > -1) {
            if (quoteChar === currentChar)
                quoteChar = null;
            else if (!quoteChar)
                quoteChar = currentChar;
            else
                currentPart += currentChar;
        }
        else
            currentPart += currentChar;
    }
    if (currentPart)
        parts.push(currentPart);
    return parts;
}
exports.splitQuotedText = splitQuotedText;
function getPluralSuffix(array) {
    return array.length > 1 ? 's' : '';
}
exports.getPluralSuffix = getPluralSuffix;
function getDisplayedItemText(item, quote) {
    return `${quote}${item}${quote}`;
}
function getConcatenatedValuesString(array, separator = DEFAULT_CONCATENATED_VALUES.SEPARATOR, quoteChar = DEFAULT_CONCATENATED_VALUES.QUOTE_CHAR) {
    const clonedArray = [...array];
    if (separator.indexOf('\n') > -1)
        return clonedArray.map(item => getDisplayedItemText(item, quoteChar)).join(separator);
    else if (clonedArray.length === 1)
        return getDisplayedItemText(clonedArray[0], quoteChar);
    else if (clonedArray.length === 2) {
        const item1 = array[0];
        const item2 = array[1];
        return `${getDisplayedItemText(item1, quoteChar)} and ${getDisplayedItemText(item2, quoteChar)}`;
    }
    const lastItem = clonedArray.pop();
    const otherItemString = clonedArray.map(item => getDisplayedItemText(item, quoteChar)).join(separator);
    return `${otherItemString}, and ${getDisplayedItemText(lastItem, quoteChar)}`;
}
exports.getConcatenatedValuesString = getConcatenatedValuesString;
function getToBeInPastTense(array) {
    return array.length > 1 ? 'were' : 'was';
}
exports.getToBeInPastTense = getToBeInPastTense;
function createList(array, PREFIX = '- ', SEPARATOR = '\n') {
    return array.map(option => PREFIX + option).join(SEPARATOR);
}
exports.createList = createList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3N0cmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrRUFBeUM7QUFFekMsTUFBTSwyQkFBMkIsR0FBRztJQUNoQyxTQUFTLEVBQUcsSUFBSTtJQUNoQixVQUFVLEVBQUUsR0FBRztDQUNsQixDQUFDO0FBRUYsU0FBUyxLQUFLLENBQUUsR0FBRztJQUNmLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUVELFNBQWdCLGVBQWUsQ0FBRSxHQUFHO0lBQ2hDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBRkQsMENBRUM7QUFFRCxTQUFnQixRQUFRLENBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLO0lBQ3hDLElBQUksTUFBTSxHQUFPLEVBQUUsQ0FBQztJQUNwQixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFFcEIsSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLEtBQUssR0FBRyxNQUFNO1FBQzdDLE9BQU8sSUFBQSx1QkFBWSxFQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFMUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztTQUM5QixLQUFLLENBQUMsK0JBQStCLENBQUM7UUFDdkMsMEJBQTBCO1NBQ3pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUxQixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2YsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQztRQUU3QixJQUFJLGVBQWUsQ0FBQyxNQUFNLENB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JztcblxuY29uc3QgREVGQVVMVF9DT05DQVRFTkFURURfVkFMVUVTID0ge1xuICAgIFNFUEFSQVRPUjogICcsICcsXG4gICAgUVVPVEVfQ0hBUjogJ1wiJyxcbn07XG5cbmZ1bmN0aW9uIHJ0cmltIChzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xccyskLywgJycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlVFRZQ29sb3JzIChzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcMDMzXFxbWzAtOTtdKm0vZywgJycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd29yZFdyYXAgKHN0ciwgaW5kZW50LCB3aWR0aCkge1xuICAgIGxldCBjdXJTdHIgICAgID0gJyc7XG4gICAgbGV0IHdyYXBwZWRNc2cgPSAnJztcblxuICAgIGlmIChyZW1vdmVUVFlDb2xvcnMoc3RyKS5sZW5ndGggPD0gd2lkdGggLSBpbmRlbnQpXG4gICAgICAgIHJldHVybiBpbmRlbnRTdHJpbmcoc3RyLCAnICcsIGluZGVudCk7XG5cbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvKFxcclxcbikvZ20sICdcXG4nKVxuICAgICAgICAuc3BsaXQoLyhcXFMrWyBcXHRdKyl8KFxcUysoPzpcXG4pKXwoXFxuKS9tKVxuICAgICAgICAvL05PVEU6IGN1dCBlbXB0eSBlbGVtZW50c1xuICAgICAgICAuZmlsdGVyKGVsbSA9PiAhIWVsbSk7XG5cbiAgICBzdHIuZm9yRWFjaCh3b3JkID0+IHtcbiAgICAgICAgY29uc3QgbmV3U3RyID0gY3VyU3RyICsgd29yZDtcblxuICAgICAgICBpZiAocmVtb3ZlVFRZQ29sb3JzKG5ld1N0cikubGVuZ3RoID4gd2lkdGggLSBpbmRlbnQpIHtcbiAgICAgICAgICAgIHdyYXBwZWRNc2cgKz0gYCR7cnRyaW0oY3VyU3RyKX1cXG5gO1xuICAgICAgICAgICAgY3VyU3RyID0gd29yZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjdXJTdHJbY3VyU3RyLmxlbmd0aCAtIDFdID09PSAnXFxuJykge1xuICAgICAgICAgICAgICAgIHdyYXBwZWRNc2cgKz0gYCR7cnRyaW0oY3VyU3RyKX1cXG5gO1xuICAgICAgICAgICAgICAgIGN1clN0ciA9ICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJTdHIgKz0gd29yZDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGluZGVudFN0cmluZyh3cmFwcGVkTXNnICsgY3VyU3RyLCAnICcsIGluZGVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGxpdFF1b3RlZFRleHQgKHN0ciwgc3BsaXRDaGFyLCBxdW90ZXMgPSAnXCJcXCcnKSB7XG4gICAgbGV0IGN1cnJlbnRQYXJ0ID0gJyc7XG4gICAgY29uc3QgcGFydHMgICAgICAgPSBbXTtcbiAgICBsZXQgcXVvdGVDaGFyICAgPSBudWxsO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudENoYXIgPSBzdHJbaV07XG5cbiAgICAgICAgaWYgKGN1cnJlbnRDaGFyID09PSBzcGxpdENoYXIpIHtcbiAgICAgICAgICAgIGlmIChxdW90ZUNoYXIpXG4gICAgICAgICAgICAgICAgY3VycmVudFBhcnQgKz0gY3VycmVudENoYXI7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKGN1cnJlbnRQYXJ0KTtcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFydCA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHF1b3Rlcy5pbmRleE9mKGN1cnJlbnRDaGFyKSA+IC0xKSB7XG4gICAgICAgICAgICBpZiAocXVvdGVDaGFyID09PSBjdXJyZW50Q2hhcilcbiAgICAgICAgICAgICAgICBxdW90ZUNoYXIgPSBudWxsO1xuICAgICAgICAgICAgZWxzZSBpZiAoIXF1b3RlQ2hhcilcbiAgICAgICAgICAgICAgICBxdW90ZUNoYXIgPSBjdXJyZW50Q2hhcjtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFydCArPSBjdXJyZW50Q2hhcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjdXJyZW50UGFydCArPSBjdXJyZW50Q2hhcjtcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudFBhcnQpXG4gICAgICAgIHBhcnRzLnB1c2goY3VycmVudFBhcnQpO1xuXG4gICAgcmV0dXJuIHBhcnRzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGx1cmFsU3VmZml4IChhcnJheSkge1xuICAgIHJldHVybiBhcnJheS5sZW5ndGggPiAxID8gJ3MnIDogJyc7XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXllZEl0ZW1UZXh0IChpdGVtLCBxdW90ZSkge1xuICAgIHJldHVybiBgJHtxdW90ZX0ke2l0ZW19JHtxdW90ZX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uY2F0ZW5hdGVkVmFsdWVzU3RyaW5nIChhcnJheSwgc2VwYXJhdG9yID0gREVGQVVMVF9DT05DQVRFTkFURURfVkFMVUVTLlNFUEFSQVRPUiwgcXVvdGVDaGFyID0gREVGQVVMVF9DT05DQVRFTkFURURfVkFMVUVTLlFVT1RFX0NIQVIpIHtcbiAgICBjb25zdCBjbG9uZWRBcnJheSA9IFsuLi5hcnJheV07XG5cbiAgICBpZiAoc2VwYXJhdG9yLmluZGV4T2YoJ1xcbicpID4gLTEpXG4gICAgICAgIHJldHVybiBjbG9uZWRBcnJheS5tYXAoaXRlbSA9PiBnZXREaXNwbGF5ZWRJdGVtVGV4dChpdGVtLCBxdW90ZUNoYXIpKS5qb2luKHNlcGFyYXRvcik7XG5cbiAgICBlbHNlIGlmIChjbG9uZWRBcnJheS5sZW5ndGggPT09IDEpXG4gICAgICAgIHJldHVybiBnZXREaXNwbGF5ZWRJdGVtVGV4dChjbG9uZWRBcnJheVswXSwgcXVvdGVDaGFyKTtcblxuICAgIGVsc2UgaWYgKGNsb25lZEFycmF5Lmxlbmd0aCA9PT0gMikge1xuICAgICAgICBjb25zdCBpdGVtMSA9IGFycmF5WzBdO1xuICAgICAgICBjb25zdCBpdGVtMiA9IGFycmF5WzFdO1xuXG4gICAgICAgIHJldHVybiBgJHtnZXREaXNwbGF5ZWRJdGVtVGV4dChpdGVtMSwgcXVvdGVDaGFyKX0gYW5kICR7Z2V0RGlzcGxheWVkSXRlbVRleHQoaXRlbTIsIHF1b3RlQ2hhcil9YDtcbiAgICB9XG5cbiAgICBjb25zdCBsYXN0SXRlbSAgICAgICAgPSBjbG9uZWRBcnJheS5wb3AoKTtcbiAgICBjb25zdCBvdGhlckl0ZW1TdHJpbmcgPSBjbG9uZWRBcnJheS5tYXAoaXRlbSA9PiBnZXREaXNwbGF5ZWRJdGVtVGV4dChpdGVtLCBxdW90ZUNoYXIpKS5qb2luKHNlcGFyYXRvcik7XG5cbiAgICByZXR1cm4gYCR7b3RoZXJJdGVtU3RyaW5nfSwgYW5kICR7Z2V0RGlzcGxheWVkSXRlbVRleHQobGFzdEl0ZW0sIHF1b3RlQ2hhcil9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvQmVJblBhc3RUZW5zZSAoYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXkubGVuZ3RoID4gMSA/ICd3ZXJlJyA6ICd3YXMnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGlzdCAoYXJyYXksIFBSRUZJWCA9ICctICcsIFNFUEFSQVRPUiA9ICdcXG4nKSB7XG4gICAgcmV0dXJuIGFycmF5Lm1hcChvcHRpb24gPT4gUFJFRklYICsgb3B0aW9uKS5qb2luKFNFUEFSQVRPUik7XG59XG4iXX0=