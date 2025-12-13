import React from "react";
import * as DeviceActions from "./DeviceActions";
import * as SHDM2 from "./deviceDialogTabs/SHDM-2";

export interface TypeConfigViewInfo {
	[key: string]: any;
}
export interface TypeConfigViewAction {
	[key: string]: any;
}
export interface TypeConfigView {
	info: TypeConfigViewInfo;
	action: TypeConfigViewAction;
	[key: string]: TypeConfigViewInfo | TypeConfigViewAction;
}
export interface TypeConfigDataPoint {
	[key: string]: any;
}

export interface TypeConfig {
	dataPoint?: { [key: string]: any } | undefined;
	update?: { [key: string]: any };
	view?: TypeConfigView | undefined;
	action?: { [key: string]: any };
	dialog?: { [key: string]: any };
	domID?: string;
}

export interface DeviceObject {
	instance: number;
	id: string;
	typeConfig: TypeConfig | undefined;
	stateId: string;
	type: string;
	domID?: string;
	vsID?: string;
	relay: number;
}
export function isDeviceObject(obj: unknown): obj is DeviceObject {
	return (
		obj != null &&
		typeof obj === "object" &&
		"stateId" in obj &&
		typeof (obj as any).stateId === "string" &&
		"instance" in obj &&
		typeof (obj as any).instance === "number"
	);
}

export function switchButton(props = {}): React.JSX.Element {
	return (
		<object
			name="svgShellyButton"
			type="image/svg+xml"
			data="/vis-2/widgets/vis-2-shelly/img/shellySwitchButton.svg"
			title="Switch"
			{...props}
		></object>
	);
}
export function switchTRVButton(props = {}): React.JSX.Element {
	return (
		<object
			name="svgShellyTRVButton"
			type="image/svg+xml"
			data="/vis-2/widgets/vis-2-shelly/img/shellyTRVButton.svg"
			style={{ margin: "5px", width: "125px" }}
			title="TRVSwitch"
			{...props}
		></object>
	);
}

const getDeviceConfigByType = async (device: DeviceObject, socket: any): Promise<TypeConfig> => {
	const typeConfig: TypeConfig = {
		domID: device.domID,
		dataPoint: {},
		update: {},
		view: {} as TypeConfigView,
		dialog: {},
	};
	// const switchButton = switchButton();
	// (
	// 	<object
	// 		name="svgShellyButton"
	// 		type="image/svg+xml"
	// 		data="/vis-2/widgets/vis-2-shelly/img/shellySwitchButton.svg"
	// 		title="Switch"
	// 	></object>,
	// );
	// const switchTRVButton = (
	// 	<object
	// 		name="svgShellyTRVButton"
	// 		type="image/svg+xml"
	// 		data="/vis-2/widgets/vis-2-shelly/img/shellyTRVButton.svg"
	// 		style={{ margin: "5px", width: "125px" }}
	// 		title="TRVSwitch"
	// 	></object>
	// );
	switch (device.type) {
		case "SHDM-2":
			typeConfig.update = {
				power: {
					name: "power",
					unit: "W",
					updateValue: DeviceActions.basicUpdateValueUnit,
				},
				brightness: {
					name: "brightness",
					unit: "%",
					updateValue: DeviceActions.basicUpdateValueBrightness,
				},
				name: {
					name: "name",
					updateValue: DeviceActions.basicUpdateValueName,
				},
				oname: {
					name: "name",
					updateValue: DeviceActions.basicUpdateValueName,
				},
				switch: {
					name: "switch",
					updateAck: DeviceActions.basicUpdateSwitchAck,
					updateValue: DeviceActions.basicUpdateSwitch,
				},
			};
			typeConfig.view = {
				info: {
					power: { name: "power", class: "icon", html: "" },
					brightness: { name: "brightness", class: "icon", html: "" },
				},
				action: {
					switch: {
						name: "switch",
						style: { width: "70px" },
						class: "",
						html: switchButton(),
					},
				},
			};
			typeConfig.action = {
				switch: {
					name: "switch",
					x: "0px",
					y: "0px",
					w: "100%",
					h: "100%",
					dataPoint: "switch",
					click: DeviceActions.basicActionBooleanToggle,
				},
			};
			((typeConfig.dataPoint = {
				0: {
					power: `${device.stateId}.lights.Power`,
					switch: `${device.stateId}.lights.Switch`,
					brightness: `${device.stateId}.lights.brightness`,
					name: `${device.vsID}.0.name`,
					room: `${device.vsID}.0.room`,
					deviceID: device.id,
				},
			}),
				(typeConfig.dialog = {
					tabs: [
						{
							name: "main",
							title: "1",
							icon: "",
							content: {
								title: "Main content",
								body: SHDM2.Main,
							},
						},
					],
				}));
			break;
		case "SHPLG-S":
			typeConfig.update = {
				power: {
					name: "power",
					unit: "W",
					updateValue: DeviceActions.basicUpdateValueUnit,
				},
				name: {
					name: "name",
					updateValue: DeviceActions.basicUpdateValueName,
				},
				oname: {
					name: "name",
					updateValue: DeviceActions.basicUpdateValueName,
				},
				switch: {
					name: "switch",
					updateAck: DeviceActions.basicUpdateSwitchAck,
					updateValue: DeviceActions.basicUpdateSwitch,
				},
			};
			typeConfig.view = {
				info: { power: { name: "power", class: "icon", html: "" } },
				action: {
					switch: {
						name: "switch",
						style: { width: "70px" },
						class: "",
						html: switchButton(),
					},
				},
			};
			typeConfig.action = {
				switch: {
					name: "switch",
					x: "0px",
					y: "0px",
					w: "100%",
					h: "100%",
					dataPoint: "switch",
					click: DeviceActions.basicActionBooleanToggle,
				},
			};
			typeConfig.dataPoint = {
				0: {
					power: `${device.stateId}.Relay0.Power`,
					switch: `${device.stateId}.Relay0.Switch`,
					name: `${device.vsID}.0.name`,
					room: `${device.vsID}.0.room`,
					deviceID: device.id,
				},
			};
			break;
		case "shellyplus1pm":
			typeConfig.update = {
				power: {
					name: "power",
					unit: "W",
					updateValue: DeviceActions.basicUpdateValueUnit,
				},
				voltage: {
					name: "voltage",
					unit: "V",
					updateValue: DeviceActions.basicUpdateValueUnit,
				},
				name: {
					name: "name",
					updateValue: DeviceActions.basicUpdateValueName,
				},
				oname: {
					name: "name",
					updateValue: DeviceActions.basicUpdateValueName,
				},
				switch: {
					name: "switch",
					updateAck: DeviceActions.basicUpdateSwitchAck,
					updateValue: DeviceActions.basicUpdateSwitch,
				},
			};
			typeConfig.view = {
				info: {
					power: { name: "power", class: "icon", html: "" },
					voltage: { name: "voltage", class: "icon", html: "" },
				},
				action: {
					switch: {
						name: "switch",
						style: { width: "70px" },
						class: "",
						html: switchButton(),
					},
				},
			};
			typeConfig.action = {
				switch: {
					name: "switch",
					x: "0px",
					y: "0px",
					w: "100%",
					h: "100%",
					dataPoint: "switch",
					click: DeviceActions.basicActionBooleanToggle,
				},
			};
			typeConfig.dataPoint = {
				0: {
					power: `${device.stateId}.Relay0.Power`,
					switch: `${device.stateId}.Relay0.Switch`,
					voltage: `${device.stateId}.Relay0.Voltage`,
					name: `${device.vsID}.0.name`,
					room: `${device.vsID}.0.room`,
					deviceID: device.id,
				},
			};
			break;
		case "shellyplusplugs":
			typeConfig.update = {
				power: {
					name: "power",
					unit: "W",
					updateValue: DeviceActions.basicUpdateValueUnit,
				},
				voltage: {
					name: "voltage",
					unit: "V",
					updateValue: DeviceActions.basicUpdateValueUnit,
				},
				name: {
					name: "name",
					updateValue: DeviceActions.basicUpdateValueName,
				},
				oname: {
					name: "name",
					updateValue: DeviceActions.basicUpdateValueName,
				},
				switch: {
					name: "switch",
					updateAck: DeviceActions.basicUpdateSwitchAck,
					updateValue: DeviceActions.basicUpdateSwitch,
				},
			};
			typeConfig.view = {
				info: {
					power: { name: "power", class: "icon", html: "" },
					voltage: { name: "voltage", class: "icon", html: "" },
				},
				action: {
					switch: {
						name: "switch",
						style: { width: "70px" },
						class: "",
						html: switchButton(),
					},
				},
			};
			typeConfig.action = {
				switch: {
					name: "switch",
					x: "0px",
					y: "0px",
					w: "100%",
					h: "100%",
					dataPoint: "switch",
					click: DeviceActions.basicActionBooleanToggle,
				},
			};
			typeConfig.dataPoint = {
				0: {
					power: `${device.stateId}.Relay0.Power`,
					switch: `${device.stateId}.Relay0.Switch`,
					voltage: `${device.stateId}.Relay0.Voltage`,
					name: `${device.vsID}.0.name`,
					room: `${device.vsID}.0.room`,
					deviceID: device.id,
				},
			};
			break;
		case "shellyplus2pm":
			typeConfig.update = {
				power: {
					name: "power",
					unit: "W",
					updateValue: DeviceActions.basicUpdateValueUnit,
				},
				voltage: {
					name: "voltage",
					unit: "V",
					updateValue: DeviceActions.basicUpdateValueUnit,
				},
				name: {
					name: "name",
					updateValue: DeviceActions.basicUpdateValueName,
				},
				oname: {
					name: "name",
					updateValue: DeviceActions.basicUpdateValueName,
				},
				switch: {
					name: "switch",
					updateAck: DeviceActions.basicUpdateSwitchAck,
					updateValue: DeviceActions.basicUpdateSwitch,
				},
			};
			typeConfig.view = {
				info: {
					power: { name: "power", class: "icon", html: "" },
					voltage: { name: "voltage", class: "icon", html: "" },
				},
				action: {
					switch: {
						name: "switch",
						style: { width: "70px" },
						class: "",
						html: switchButton(),
					},
				},
			};
			typeConfig.action = {
				switch: {
					name: "switch",
					x: "0px",
					y: "0px",
					w: "100%",
					h: "100%",
					dataPoint: "switch",
					click: DeviceActions.basicActionBooleanToggle,
				},
			};
			typeConfig.dataPoint = {
				0: {
					power: `${device.stateId}.Relay0.Power`,
					switch: `${device.stateId}.Relay0.Switch`,
					voltage: `${device.stateId}.Relay0.Voltage`,
					name: `${device.vsID}.0.name`,
					room: `${device.vsID}.0.room`,
					deviceID: device.id,
				},
				1: {
					power: `${device.stateId}.Relay1.Power`,
					switch: `${device.stateId}.Relay1.Switch`,
					voltage: `${device.stateId}.Relay1.Voltage`,
					name: `${device.vsID}.1.name`,
					room: `${device.vsID}.1.room`,
					deviceID: device.id,
				},
			};
			break;
		case "shellyplusht":
			typeConfig.update = {
				humidity: {
					name: "humidity",
					unit: "%",
					updateValue: DeviceActions.basicUpdateValueUnit,
				},
				batteryPercent: {
					name: "devicePower",
					viewPoint: "devicePower",
					updateValue: DeviceActions.basicUpdateDevicePower,
				},
				externalPower: {
					name: "devicePower",
					viewPoint: "devicePower",
					updateValue: DeviceActions.basicUpdateDevicePower,
				},
				temperature: {
					name: "temperature",
					unit: "°C",
					updateValue: DeviceActions.basicUpdateValueUnit,
				},
				name: {
					name: "name",
					updateValue: DeviceActions.basicUpdateValueName,
				},
				oname: {
					name: "name",
					updateValue: DeviceActions.basicUpdateValueName,
				},
			};
			typeConfig.view = {
				info: {
					humidity: { name: "humidity", class: "icon", html: "" },
					externalPower: { name: "devicePower", class: "icon", html: "" },
				},
				action: {
					temperature: {
						name: "temperature",
						style: { width: "70px" },
						class: "temperature",
						html: "",
					},
				},
			};
			typeConfig.dataPoint = {
				0: {
					temperature: `${device.stateId}.Temperature0.Celsius`,
					humidity: `${device.stateId}.Humidity0.Relative`,
					externalPower: `${device.stateId}.DevicePower0.ExternalPower`,
					batteryPercent: `${device.stateId}.DevicePower0.BatteryPercent`,
					name: `${device.vsID}.0.name`,
					room: `${device.vsID}.0.room`,
					deviceID: device.id,
				},
			};
			break;
		case "SHTRV-01":
			typeConfig.update = {
				valvePosition: {
					name: "valvePosition",
					unit: "%",
					updateValue: DeviceActions.basicUpdateValueUnit,
				},
				batteryPercent: {
					name: "devicePower",
					viewPoint: "devicePower",
					updateValue: DeviceActions.basicUpdateDevicePower,
				},
				externalPower: {
					name: "devicePower",
					viewPoint: "devicePower",
					updateValue: DeviceActions.basicUpdateDevicePower,
				},
				temperature: {
					name: "temperature",
					unit: "°C",
					updateValue: DeviceActions.basicUpdateValueUnit,
				},
				name: {
					name: "name",
					updateValue: DeviceActions.basicUpdateValueName,
				},
				oname: {
					name: "name",
					updateValue: DeviceActions.basicUpdateValueName,
				},
				temperatureTarget: {
					name: "temperatureTarget",
					unit: "°C",
					updateAck: DeviceActions.basicUpdateTRVAck,
					updateValue: DeviceActions.basicUpdateValueUnit,
				},
			};
			typeConfig.view = {
				info: {
					temperature: { name: "temperature", class: "icon", html: "" },
					valvePosition: { name: "valvePosition", class: "icon", html: "" },
					devicePower: { name: "devicePower", class: "icon", html: "" },
				},
				action: {
					temperatureTarget: {
						name: "temperatureTarget",
						style: {},
						class: "TRVValue",
						html: "",
					},
					buttons: {
						name: "buttons",
						style: { width: "135px" },
						class: "TRVButton",
						html: switchTRVButton(),
					},
				},
			};
			typeConfig.action = {
				down: {
					name: "buttons",
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
					name: "buttons",
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
			};
			typeConfig.dataPoint = {
				0: {
					temperature: `${device.stateId}.tmp.temperatureC`,
					temperatureTarget: `${device.stateId}.tmp.temperatureTargetC`,
					valvePosition: `${device.stateId}.tmp.valvePosition`,
					externalPower: `${device.stateId}.bat.charger`,
					batteryPercent: `${device.stateId}.bat.value`,
					name: `${device.vsID}.0.name`,
					room: `${device.vsID}.0.room`,
					deviceID: device.id,
				},
			};
			break;
		case "SHMOS-02":
			typeConfig.update = {
				lux: {
					name: "lux",
					unit: "Lux",
					updateValue: DeviceActions.basicUpdateValueUnit,
				},
				batteryPercent: {
					name: "devicePower",
					unit: "%",
					viewPoint: "devicePower",
					updateValue: DeviceActions.basicUpdateDevicePower,
				},
				motion: {
					name: "motion",
					updateValue: DeviceActions.basicUpdateMotionValue,
				},
				temperature: {
					name: "temperature",
					unit: "°C",
					updateValue: DeviceActions.basicUpdateValueUnit,
				},
				name: {
					name: "name",
					updateValue: DeviceActions.basicUpdateValueName,
				},
				oname: {
					name: "name",
					updateValue: DeviceActions.basicUpdateValueName,
				},
			};
			typeConfig.view = {
				info: {
					temperature: { name: "temperature", class: "icon", html: "" },
					batteryPercent: { name: "devicePower", class: "icon", html: "" },
					lux: { name: "lux", class: "icon", html: "" },
				},
				action: {
					motion: {
						name: "motion",
						style: { width: "70px" },
						class: "",
						html: "",
					},
				},
			};
			typeConfig.dataPoint = {
				0: {
					temperature: `${device.stateId}.sensor.temperatureC`,
					motion: `${device.stateId}.sensor.motion`,
					lux: `${device.stateId}.sensor.lux`,
					batteryPercent: `${device.stateId}.sensor.battery`,
					name: `${device.vsID}.0.name`,
					room: `${device.vsID}.0.room`,
					deviceID: device.id,
				},
			};
			break;
		case "SHDW-2":
			typeConfig.update = {
				lux: {
					name: "lux",
					unit: "Lux",
					updateValue: DeviceActions.basicUpdateValueUnit,
				},
				batteryPercent: {
					name: "devicePower",
					unit: "%",
					viewPoint: "devicePower",
					updateValue: DeviceActions.basicUpdateDevicePower,
				},
				door: {
					name: "door",
					updateValue: DeviceActions.basicUpdateValue,
				},
				temperature: {
					name: "temperature",
					unit: "°C",
					updateValue: DeviceActions.basicUpdateValueUnit,
				},
				name: {
					name: "name",
					updateValue: DeviceActions.basicUpdateValueName,
				},
			};
			typeConfig.view = {
				info: {
					temperature: { name: "temperature", class: "icon", html: "" },
					batteryPercent: { name: "devicePower", class: "icon", html: "" },
					lux: { name: "lux", class: "icon", html: "" },
				},
				action: {
					door: {
						name: "door",
						style: { width: "70px" },
						class: "darkBack",
						html: "",
					},
				},
			};
			typeConfig.dataPoint = {
				0: {
					temperature: `${device.stateId}.sensor.temperatureC`,
					door: `${device.stateId}.sensor.door`,
					lux: `${device.stateId}.sensor.lux`,
					batteryPercent: `${device.stateId}.sensor.battery`,
					name: `${device.vsID}.0.name`,
					room: `${device.vsID}.0.room`,
					deviceID: device.id,
				},
			};
			break;
		default:
	}
	const customConfig = await socket.getState(`${device.vsID}.customConfig`);
	if (typeof customConfig === "object" && customConfig !== null) {
		try {
			const cc: TypeConfig = JSON.parse(customConfig.val);
			const dataPoint: TypeConfigDataPoint = typeConfig.dataPoint ?? {};
			if (typeof cc.dataPoint === "object") {
				Object.entries(cc.dataPoint).forEach(([instance, dataObject]) => {
					if (typeof dataObject === "object" && dataObject != null) {
						Object.entries(dataObject).forEach(([name, value]) => {
							dataPoint[instance][name] = value;
						});
					}
				});
			}
			typeConfig.dataPoint = dataPoint;
			const update = typeConfig.update ?? {};
			if (typeof cc.update === "object") {
				Object.entries(cc.update).forEach(([name, value]) => {
					update[name] = value;
				});
			}
			typeConfig.update = update;
			const view: TypeConfigView = typeConfig.view ?? ({} as TypeConfigView);
			if (typeof cc.view === "object") {
				Object.entries(cc.view).forEach(([name, value]) => {
					view[name] = value;
				});
			}
			typeConfig.view = view;
		} catch (e) {
			console.error(e);
		}
	}

	return typeConfig;
};

export default getDeviceConfigByType;
