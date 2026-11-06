"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDeviceObject = isDeviceObject;
function isDeviceObject(obj) {
    return (obj != null &&
        typeof obj === "object" &&
        "stateId" in obj &&
        typeof obj.stateId === "string" &&
        "instance" in obj &&
        typeof obj.instance === "number");
}
