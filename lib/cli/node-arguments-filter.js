"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractNodeProcessArguments = exports.V8_FLAG_PREFIXES = exports.V8_FLAGS = exports.V8_DEBUG_FLAGS = void 0;
exports.V8_DEBUG_FLAGS = [
    '--inspect',
    '--inspect-brk',
];
exports.V8_FLAGS = [
    ...exports.V8_DEBUG_FLAGS,
    'debug',
    '--expose-gc',
    '--gc-global',
    '--es_staging',
    '--no-deprecation',
    '--prof',
    '--log-timer-events',
    '--throw-deprecation',
    '--trace-deprecation',
    '--use_strict',
    '--allow-natives-syntax',
    '--perf-basic-prof',
    '--experimental-repl-await',
];
exports.V8_FLAG_PREFIXES = [
    '--harmony',
    '--trace',
    '--icu-data-dir',
    '--max-old-space-size',
    '--preserve-symlinks',
];
function isNodeFlagPrefix(arg) {
    return exports.V8_FLAG_PREFIXES.some(flagPrefix => {
        return arg.indexOf(flagPrefix) === 0;
    });
}
function extractNodeProcessArguments(cliArgs) {
    const args = [];
    const v8Flags = [];
    cliArgs.forEach(arg => {
        const flag = arg.split('=')[0];
        if (exports.V8_FLAGS.indexOf(flag) > -1 || isNodeFlagPrefix(arg))
            v8Flags.push(arg);
        else
            args.push(arg);
    });
    return { args, v8Flags: v8Flags.length ? v8Flags : void 0 };
}
exports.extractNodeProcessArguments = extractNodeProcessArguments;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1hcmd1bWVudHMtZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaS9ub2RlLWFyZ3VtZW50cy1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxjQUFjLEdBQUc7SUFDMUIsV0FBVztJQUNYLGVBQWU7Q0FDbEIsQ0FBQztBQUVXLFFBQUEsUUFBUSxHQUFHO0lBQ3BCLEdBQUcsc0JBQWM7SUFDakIsT0FBTztJQUNQLGFBQWE7SUFDYixhQUFhO0lBQ2IsY0FBYztJQUNkLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1Isb0JBQW9CO0lBQ3BCLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIsY0FBYztJQUNkLHdCQUF3QjtJQUN4QixtQkFBbUI7SUFDbkIsMkJBQTJCO0NBQzlCLENBQUM7QUFFVyxRQUFBLGdCQUFnQixHQUFHO0lBQzVCLFdBQVc7SUFDWCxTQUFTO0lBQ1QsZ0JBQWdCO0lBQ2hCLHNCQUFzQjtJQUN0QixxQkFBcUI7Q0FDeEIsQ0FBQztBQUVGLFNBQVMsZ0JBQWdCLENBQUUsR0FBVztJQUNsQyxPQUFPLHdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUN0QyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQU9ELFNBQWdCLDJCQUEyQixDQUFFLE9BQWlCO0lBQzFELE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUMxQixNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7SUFFN0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNsQixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRS9CLElBQUksZ0JBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksZ0JBQWdCLENBQUMsR0FBRyxDQUFDO1lBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O1lBRWxCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7QUFDaEUsQ0FBQztBQWRELGtFQWNDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IFY4X0RFQlVHX0ZMQUdTID0gW1xuICAgICctLWluc3BlY3QnLFxuICAgICctLWluc3BlY3QtYnJrJyxcbl07XG5cbmV4cG9ydCBjb25zdCBWOF9GTEFHUyA9IFtcbiAgICAuLi5WOF9ERUJVR19GTEFHUyxcbiAgICAnZGVidWcnLFxuICAgICctLWV4cG9zZS1nYycsXG4gICAgJy0tZ2MtZ2xvYmFsJyxcbiAgICAnLS1lc19zdGFnaW5nJyxcbiAgICAnLS1uby1kZXByZWNhdGlvbicsXG4gICAgJy0tcHJvZicsXG4gICAgJy0tbG9nLXRpbWVyLWV2ZW50cycsXG4gICAgJy0tdGhyb3ctZGVwcmVjYXRpb24nLFxuICAgICctLXRyYWNlLWRlcHJlY2F0aW9uJyxcbiAgICAnLS11c2Vfc3RyaWN0JyxcbiAgICAnLS1hbGxvdy1uYXRpdmVzLXN5bnRheCcsXG4gICAgJy0tcGVyZi1iYXNpYy1wcm9mJyxcbiAgICAnLS1leHBlcmltZW50YWwtcmVwbC1hd2FpdCcsXG5dO1xuXG5leHBvcnQgY29uc3QgVjhfRkxBR19QUkVGSVhFUyA9IFtcbiAgICAnLS1oYXJtb255JyxcbiAgICAnLS10cmFjZScsXG4gICAgJy0taWN1LWRhdGEtZGlyJyxcbiAgICAnLS1tYXgtb2xkLXNwYWNlLXNpemUnLFxuICAgICctLXByZXNlcnZlLXN5bWxpbmtzJyxcbl07XG5cbmZ1bmN0aW9uIGlzTm9kZUZsYWdQcmVmaXggKGFyZzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFY4X0ZMQUdfUFJFRklYRVMuc29tZShmbGFnUHJlZml4ID0+IHtcbiAgICAgICAgcmV0dXJuIGFyZy5pbmRleE9mKGZsYWdQcmVmaXgpID09PSAwO1xuICAgIH0pO1xufVxuXG5pbnRlcmZhY2UgUGFyc2VkQXJncyB7XG4gICAgYXJnczogc3RyaW5nW107XG4gICAgdjhGbGFncz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdE5vZGVQcm9jZXNzQXJndW1lbnRzIChjbGlBcmdzOiBzdHJpbmdbXSk6IFBhcnNlZEFyZ3Mge1xuICAgIGNvbnN0IGFyZ3M6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgdjhGbGFnczogc3RyaW5nW10gPSBbXTtcblxuICAgIGNsaUFyZ3MuZm9yRWFjaChhcmcgPT4ge1xuICAgICAgICBjb25zdCBmbGFnID0gYXJnLnNwbGl0KCc9JylbMF07XG5cbiAgICAgICAgaWYgKFY4X0ZMQUdTLmluZGV4T2YoZmxhZykgPiAtMSB8fCBpc05vZGVGbGFnUHJlZml4KGFyZykpXG4gICAgICAgICAgICB2OEZsYWdzLnB1c2goYXJnKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYXJncy5wdXNoKGFyZyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBhcmdzLCB2OEZsYWdzOiB2OEZsYWdzLmxlbmd0aCA/IHY4RmxhZ3MgOiB2b2lkIDAgfTtcbn1cbiJdfQ==