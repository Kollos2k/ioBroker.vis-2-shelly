import type { TypeDeviceState } from "./types";
import * as DeviceActions from "./DeviceActions";

export const name = {
	deviceID: "visID",
	name: "name",
	update: {
		unit: "W",
		updateValue: DeviceActions.basicUpdateValueName,
	},
	dataPoint: "name",
};
export const oname = {
	deviceID: "visID",
	name: "name",
	update: {
		unit: "W",
		updateValue: DeviceActions.basicUpdateValueName,
	},
	dataPoint: "name",
};
export const power: TypeDeviceState = {
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
export const voltage: TypeDeviceState = {
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
export const humidity: TypeDeviceState = {
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
export const batteryPercent: TypeDeviceState = {
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
export const externalPower: TypeDeviceState = {
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
export const lux: TypeDeviceState = {
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

export const motion: TypeDeviceState = {
	deviceID: "stateId",
	key: "motion",
	name: "motion",
	update: {
		updateValue: DeviceActions.basicUpdateMotionValue,
	},
	view: { point: "action", style: { width: "70px" } },
	dataPoint: "motion",
};
export const door: TypeDeviceState = {
	deviceID: "stateId",
	key: "door",
	name: "door",
	update: {
		updateValue: DeviceActions.basicUpdateValue,
	},
	view: { point: "action", style: { width: "70px" }, class: "darkBack" },
	dataPoint: "door",
};
export const temperature: TypeDeviceState = {
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
export const temperatureC: TypeDeviceState = {
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
export const temperatureTargetC: TypeDeviceState = {
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
export const valvePositionTRV: TypeDeviceState = {
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
export const brightness: TypeDeviceState = {
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
export const buttonTRV: TypeDeviceState = {
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
export const switchButton: TypeDeviceState = {
	deviceID: "stateId",
	key: "switch",
	name: "switch",
	update: {
		updateAck: DeviceActions.basicUpdateSwitchAck,
		updateValue: DeviceActions.basicUpdateSwitch,
	},
	view: {
		point: "action" as const,
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
