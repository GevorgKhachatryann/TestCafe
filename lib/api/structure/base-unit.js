"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testcafe_hammerhead_1 = require("testcafe-hammerhead");
const ID_LENGTH = 7;
class BaseUnit {
    constructor(unitType) {
        this.id = (0, testcafe_hammerhead_1.generateUniqueId)(ID_LENGTH);
        this.unitType = unitType;
    }
}
exports.default = BaseUnit;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS11bml0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS9zdHJ1Y3R1cmUvYmFzZS11bml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQXVEO0FBR3ZELE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQztBQUVwQixNQUFxQixRQUFRO0lBSXpCLFlBQW9CLFFBQWtCO1FBQ2xDLElBQUksQ0FBQyxFQUFFLEdBQVMsSUFBQSxzQ0FBZ0IsRUFBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0NBQ0o7QUFSRCwyQkFRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdlbmVyYXRlVW5pcXVlSWQgfSBmcm9tICd0ZXN0Y2FmZS1oYW1tZXJoZWFkJztcbmltcG9ydCBVbml0VHlwZSBmcm9tICcuL3VuaXQtdHlwZSc7XG5cbmNvbnN0IElEX0xFTkdUSCA9IDc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VVbml0IHtcbiAgICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgICBwdWJsaWMgdW5pdFR5cGU6IFVuaXRUeXBlO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICh1bml0VHlwZTogVW5pdFR5cGUpIHtcbiAgICAgICAgdGhpcy5pZCAgICAgICA9IGdlbmVyYXRlVW5pcXVlSWQoSURfTEVOR1RIKTtcbiAgICAgICAgdGhpcy51bml0VHlwZSA9IHVuaXRUeXBlO1xuICAgIH1cbn1cbiJdfQ==