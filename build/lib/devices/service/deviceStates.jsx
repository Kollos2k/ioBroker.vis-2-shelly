"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttonTRV = exports.switchButton = exports.brightness = exports.valvePositionTRV = exports.temperatureTargetC = exports.temperatureC = exports.temperature = exports.door = exports.motion = exports.lux = exports.externalPower = exports.batteryPercent = exports.humidity = exports.voltage = exports.power = exports.oname = exports.name = void 0;
const Core = __importStar(require("./deviceStatesCore"));
const helper_1 = require("./helper");
exports.name = Core.name;
exports.oname = Core.oname;
exports.power = Core.power;
exports.voltage = Core.voltage;
exports.humidity = Core.humidity;
exports.batteryPercent = Core.batteryPercent;
exports.externalPower = Core.externalPower;
exports.lux = Core.lux;
exports.motion = Core.motion;
exports.door = Core.door;
exports.temperature = Core.temperature;
exports.temperatureC = Core.temperatureC;
exports.temperatureTargetC = Core.temperatureTargetC;
exports.valvePositionTRV = Core.valvePositionTRV;
exports.brightness = Core.brightness;
exports.switchButton = {
    ...Core.switchButton,
    view: { ...Core.switchButton.view, html: (0, helper_1.switchButtonElement)() },
};
exports.buttonTRV = {
    ...Core.buttonTRV,
    view: { ...Core.buttonTRV.view, html: (0, helper_1.switchTRVButton)() },
};
