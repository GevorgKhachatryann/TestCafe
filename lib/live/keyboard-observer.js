"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = __importDefault(require("process"));
const readline_1 = require("readline");
const lodash_1 = require("lodash");
const LOCK_KEY_PRESS_TIMEOUT = 1000;
let instance;
class LiveModeKeyboardEventObserver {
    constructor() {
        this.controllers = [];
        this.lockKeyPress = false;
        if (!instance) {
            this._listenKeyEvents();
            instance = this;
        }
        return instance;
    }
    push(controller) {
        this.controllers.push(controller);
        if (process_1.default.stdin.isTTY)
            this.setRawMode(true);
    }
    remove(controller) {
        (0, lodash_1.pull)(this.controllers, controller);
        if (!this.controllers.length)
            this.setRawMode(false);
    }
    _listenKeyEvents() {
        (0, readline_1.emitKeypressEvents)(process_1.default.stdin);
        process_1.default.stdin.on('keypress', this._onKeyPress.bind(this));
    }
    setRawMode(value) {
        if (process_1.default.stdin.setRawMode !== void 0)
            process_1.default.stdin.setRawMode(value);
    }
    _onKeyPress(string, key) {
        if (this.lockKeyPress)
            return;
        this.lockKeyPress = true;
        setTimeout(() => {
            this.lockKeyPress = false;
        }, LOCK_KEY_PRESS_TIMEOUT);
        if (key && key.ctrl) {
            switch (key.name) {
                case 's':
                    this._stop();
                    return;
                case 'r':
                    this._restart();
                    return;
                case 'c':
                    this._exit();
                    return;
                case 'w':
                    this._toggleWatching();
                    return;
            }
        }
    }
    _stop() {
        this.controllers.forEach(c => c.stop());
    }
    _restart() {
        this.controllers.forEach(c => c.restart());
    }
    _exit() {
        this.controllers.forEach(c => c.exit());
    }
    _toggleWatching() {
        this.controllers.forEach(c => c.toggleWatching());
    }
}
exports.default = LiveModeKeyboardEventObserver;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5Ym9hcmQtb2JzZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGl2ZS9rZXlib2FyZC1vYnNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5Qix1Q0FBbUQ7QUFDbkQsbUNBQThCO0FBRzlCLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxDQUFDO0FBRXBDLElBQUksUUFBdUMsQ0FBQztBQUU1QyxNQUFxQiw2QkFBNkI7SUFJOUM7UUFIUSxnQkFBVyxHQUF5QixFQUFFLENBQUM7UUFDdkMsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFHekIsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBRXhCLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDbkI7UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRU0sSUFBSSxDQUFFLFVBQThCO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWxDLElBQUksaUJBQU8sQ0FBQyxLQUFLLENBQUMsS0FBSztZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTSxNQUFNLENBQUUsVUFBOEI7UUFDekMsSUFBQSxhQUFJLEVBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVuQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNO1lBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVTLGdCQUFnQjtRQUN0QixJQUFBLDZCQUFrQixFQUFDLGlCQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbEMsaUJBQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFTyxVQUFVLENBQUUsS0FBYztRQUM5QixJQUFJLGlCQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUM7WUFDbkMsaUJBQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTyxXQUFXLENBQUUsTUFBYyxFQUFFLEdBQVE7UUFDekMsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUNqQixPQUFPO1FBRVgsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFFekIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzlCLENBQUMsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBRTNCLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7WUFDakIsUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFO2dCQUNkLEtBQUssR0FBRztvQkFDSixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ2IsT0FBTztnQkFDWCxLQUFLLEdBQUc7b0JBQ0osSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNoQixPQUFPO2dCQUNYLEtBQUssR0FBRztvQkFDSixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ2IsT0FBTztnQkFDWCxLQUFLLEdBQUc7b0JBQ0osSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUN2QixPQUFPO2FBQ2Q7U0FDSjtJQUNMLENBQUM7SUFFTyxLQUFLO1FBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU8sUUFBUTtRQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVPLEtBQUs7UUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTyxlQUFlO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztDQUNKO0FBbEZELGdEQWtGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcm9jZXNzIGZyb20gJ3Byb2Nlc3MnO1xuaW1wb3J0IHsgZW1pdEtleXByZXNzRXZlbnRzLCBLZXkgfSBmcm9tICdyZWFkbGluZSc7XG5pbXBvcnQgeyBwdWxsIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBMaXZlTW9kZUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyJztcblxuY29uc3QgTE9DS19LRVlfUFJFU1NfVElNRU9VVCA9IDEwMDA7XG5cbmxldCBpbnN0YW5jZTogTGl2ZU1vZGVLZXlib2FyZEV2ZW50T2JzZXJ2ZXI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpdmVNb2RlS2V5Ym9hcmRFdmVudE9ic2VydmVyIHtcbiAgICBwcml2YXRlIGNvbnRyb2xsZXJzOiBMaXZlTW9kZUNvbnRyb2xsZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgbG9ja0tleVByZXNzID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5LZXlFdmVudHMoKTtcblxuICAgICAgICAgICAgaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBwdXNoIChjb250cm9sbGVyOiBMaXZlTW9kZUNvbnRyb2xsZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVycy5wdXNoKGNvbnRyb2xsZXIpO1xuXG4gICAgICAgIGlmIChwcm9jZXNzLnN0ZGluLmlzVFRZKVxuICAgICAgICAgICAgdGhpcy5zZXRSYXdNb2RlKHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmUgKGNvbnRyb2xsZXI6IExpdmVNb2RlQ29udHJvbGxlcik6IHZvaWQge1xuICAgICAgICBwdWxsKHRoaXMuY29udHJvbGxlcnMsIGNvbnRyb2xsZXIpO1xuXG4gICAgICAgIGlmICghdGhpcy5jb250cm9sbGVycy5sZW5ndGgpXG4gICAgICAgICAgICB0aGlzLnNldFJhd01vZGUoZmFsc2UpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfbGlzdGVuS2V5RXZlbnRzICgpOiB2b2lkIHtcbiAgICAgICAgZW1pdEtleXByZXNzRXZlbnRzKHByb2Nlc3Muc3RkaW4pO1xuXG4gICAgICAgIHByb2Nlc3Muc3RkaW4ub24oJ2tleXByZXNzJywgdGhpcy5fb25LZXlQcmVzcy5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFJhd01vZGUgKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChwcm9jZXNzLnN0ZGluLnNldFJhd01vZGUgIT09IHZvaWQgMClcbiAgICAgICAgICAgIHByb2Nlc3Muc3RkaW4uc2V0UmF3TW9kZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25LZXlQcmVzcyAoc3RyaW5nOiBzdHJpbmcsIGtleTogS2V5KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmxvY2tLZXlQcmVzcylcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmxvY2tLZXlQcmVzcyA9IHRydWU7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvY2tLZXlQcmVzcyA9IGZhbHNlO1xuICAgICAgICB9LCBMT0NLX0tFWV9QUkVTU19USU1FT1VUKTtcblxuICAgICAgICBpZiAoa2V5ICYmIGtleS5jdHJsKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGtleS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3InOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXhpdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FzZSAndyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvZ2dsZVdhdGNoaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3N0b3AgKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJzLmZvckVhY2goYyA9PiBjLnN0b3AoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVzdGFydCAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udHJvbGxlcnMuZm9yRWFjaChjID0+IGMucmVzdGFydCgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9leGl0ICgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVycy5mb3JFYWNoKGMgPT4gYy5leGl0KCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RvZ2dsZVdhdGNoaW5nICgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVycy5mb3JFYWNoKGMgPT4gYy50b2dnbGVXYXRjaGluZygpKTtcbiAgICB9XG59XG4iXX0=