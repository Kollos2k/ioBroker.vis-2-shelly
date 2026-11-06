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
exports.switchButton = exports.buttonTRV = exports.brightness = exports.valvePositionTRV = exports.temperatureTargetC = exports.temperatureC = exports.temperature = exports.door = exports.motion = exports.lux = exports.externalPower = exports.batteryPercent = exports.humidity = exports.voltage = exports.power = exports.oname = exports.name = void 0;
const DeviceActions = __importStar(require("./DeviceActions"));
exports.name = {
    deviceID: "visID",
    name: "name",
    update: {
        unit: "W",
        updateValue: DeviceActions.basicUpdateValueName,
    },
    dataPoint: "name",
};
exports.oname = {
    deviceID: "visID",
    name: "name",
    update: {
        unit: "W",
        updateValue: DeviceActions.basicUpdateValueName,
    },
    dataPoint: "name",
};
exports.power = {
    deviceID: "stateId",
    key: "power",
    name: "power",
    update: {
        unit: "W",
        updateValue: DeviceActions.basicUpdateValueUnit,
    },
    view: { point: "info", class: "icon", html: "" },
    dataPoint: "Power",
};
exports.voltage = {
    deviceID: "stateId",
    key: "voltage",
    name: "voltage",
    update: {
        unit: "V",
        updateValue: DeviceActions.basicUpdateValueUnit,
    },
    view: { point: "info", class: "icon", html: "" },
    dataPoint: "Voltage",
};
exports.humidity = {
    deviceID: "stateId",
    key: "humidity",
    name: "humidity",
    update: {
        unit: "%",
        updateValue: DeviceActions.basicUpdateValueUnit,
    },
    view: { point: "info", class: "icon", html: "" },
    dataPoint: "Relative",
};
exports.batteryPercent = {
    deviceID: "stateId",
    key: "batteryPercent",
    name: "devicePower",
    update: {
        unit: "%",
        viewPoint: "devicePower",
        updateValue: DeviceActions.basicUpdateDevicePower,
    },
    view: { point: "info", class: "icon", html: "" },
    dataPoint: "BatteryPercent",
};
exports.externalPower = {
    deviceID: "stateId",
    key: "externalPower",
    name: "devicePower",
    update: {
        viewPoint: "devicePower",
        updateValue: DeviceActions.basicUpdateDevicePower,
    },
    view: { point: "info", class: "icon", html: "" },
    dataPoint: "ExternalPower",
};
exports.lux = {
    deviceID: "stateId",
    key: "lux",
    name: "lux",
    update: {
        unit: "Lux",
        updateValue: DeviceActions.basicUpdateValueUnit,
    },
    view: { point: "info", class: "icon" },
    dataPoint: "lux",
};
exports.motion = {
    deviceID: "stateId",
    key: "motion",
    name: "motion",
    update: {
        updateValue: DeviceActions.basicUpdateMotionValue,
    },
    view: { point: "action", style: { width: "70px" } },
    dataPoint: "motion",
};
exports.door = {
    deviceID: "stateId",
    key: "door",
    name: "door",
    update: {
        updateValue: DeviceActions.basicUpdateValue,
    },
    view: { point: "action", style: { width: "70px" }, class: "darkBack" },
    dataPoint: "door",
};
exports.temperature = {
    deviceID: "stateId",
    key: "temperature",
    name: "temperature",
    update: {
        unit: "°C",
        updateValue: DeviceActions.basicUpdateValueUnit,
    },
    view: { point: "action", style: { width: "70px" }, class: "temperature" },
    dataPoint: "Celsius",
};
exports.temperatureC = {
    deviceID: "stateId",
    key: "temperature",
    name: "temperature",
    update: {
        unit: "°C",
        updateValue: DeviceActions.basicUpdateValueUnit,
    },
    view: { point: "info", class: "icon" },
    dataPoint: "temperatureC",
};
exports.temperatureTargetC = {
    deviceID: "stateId",
    key: "temperatureTarget",
    name: "temperatureTarget",
    update: {
        unit: "°C",
        updateAck: DeviceActions.basicUpdateTRVAck,
        updateValue: DeviceActions.basicUpdateValueUnit,
    },
    view: { point: "action", class: "TRVValue" },
    dataPoint: "temperatureTargetC",
};
exports.valvePositionTRV = {
    deviceID: "stateId",
    key: "valvePosition",
    name: "valvePosition",
    update: {
        unit: "%",
        updateValue: DeviceActions.basicUpdateValueUnit,
    },
    view: { point: "info", class: "icon" },
    dataPoint: "valvePosition",
};
exports.brightness = {
    deviceID: "stateId",
    key: "brightness",
    name: "brightness",
    update: {
        unit: "%",
        updateValue: DeviceActions.basicUpdateValueBrightness,
    },
    view: { point: "info", class: "icon", html: "" },
    dataPoint: "brightness",
};
exports.buttonTRV = {
    deviceID: "stateId",
    key: "buttons",
    name: "buttons",
    view: { point: "action", style: { width: "135px" }, class: "TRVButton" },
    action: {
        down: {
            x: "5px",
            y: "5px",
            w: "45px",
            h: "50px",
            minValue: 15,
            maxValue: 30,
            step: -0.5,
            dataPoint: "temperatureTarget",
            click: DeviceActions.basicActionNumberStepper,
        },
        up: {
            x: "85px",
            y: "5px",
            w: "45px",
            h: "50px",
            minValue: 15,
            maxValue: 30,
            step: +0.5,
            dataPoint: "temperatureTarget",
            onClick: {
                find: "[name='svgShellyTRVButton']",
                contentDocument: true,
                className: "animatedAction",
            },
            click: DeviceActions.basicActionNumberStepper,
        },
    },
};
exports.switchButton = {
    deviceID: "stateId",
    key: "switch",
    name: "switch",
    update: {
        updateAck: DeviceActions.basicUpdateSwitchAck,
        updateValue: DeviceActions.basicUpdateSwitch,
    },
    view: {
        point: "action",
        style: { width: "70px" },
    },
    action: {
        x: "0px",
        y: "0px",
        w: "100%",
        h: "100%",
        dataPoint: "Switch",
        click: DeviceActions.basicActionBooleanToggle,
    },
    dataPoint: "Switch",
};
