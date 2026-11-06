import React from "react";
import * as DeviceActions from "@mainLib/devices/service/DeviceActions";
import type { TypeDevice } from "@mainLib/devices/service/types";
import * as deviceStates from "@mainLib/devices/service/deviceStates";
import { createDeviceConfigs } from "@mainLib/devices/service/deviceConfigsBlueprint";
import * as SHDM2 from "./deviceDialogTabs/SHDM-2";
export const DEVICE_CONFIGS = createDeviceConfigs(deviceStates as any);

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

const getDeviceConfigByType3 = (device: DeviceObject, _socket: any): TypeConfig => {
	const typeConfig: TypeConfig = {
		domID: device.domID,
		dataPoint: {},
		update: {},
		view: {} as TypeConfigView,
		action: {},
		dialog: {},
	};
	const view: TypeConfigView = { info: {}, action: {} };
	const dataPoint: TypeConfigDataPoint = {};
	const typeName: string = device.type.replaceAll("-", "").toUpperCase();

	// Zugriff über DEVICE_CONFIGS statt des alten Devices-Imports
	const deviceConfigEntry = (DEVICE_CONFIGS as Record<string, any>)[typeName];
	if (typeof deviceConfigEntry === "function") {
		const type: TypeDevice | undefined =
			typeof deviceConfigEntry === "function" ? deviceConfigEntry() : deviceConfigEntry;
		if (type && Array.isArray(type.states)) {
			console.log(type);
			type.states.forEach((s) => {
				if (s.state.update) {
					typeConfig.update = {
						...typeConfig.update,
						[s.state.key]: { name: s.state.name, ...s.state.update },
					};
				}
				if (s.state.view) {
					view[s.state.view.point] = {
						...view[s.state.view.point],
						[s.state.key]: { name: s.state.name, ...s.state.view },
					};
				}
				if (s.state.action) {
					typeConfig.action = {
						...typeConfig.action,
						[s.state.key]: { name: s.state.name, ...s.state.action },
					};
				}
				if (s.state.dataPoint) {
					for (let relay = 0; relay < type.relayCount; relay++) {
						if (s.state.deviceID == "stateId") {
							const curChannel = s.channel.replace("{X}", `${relay}`);
							dataPoint[`${relay}`] = {
								...dataPoint[`${relay}`],
								[s.state.key]: `${device.stateId}.${curChannel}.${s.state.dataPoint}`,
							};
						} else {
							dataPoint[`${relay}`] = {
								...dataPoint[`${relay}`],
								[s.state.key]: `${device.vsID}.${relay}.${s.state.dataPoint}`,
							};
						}
					}
				}
			});
		}
	}
	typeConfig.view = view;
	typeConfig.dataPoint = dataPoint;
	return typeConfig;
};

// Falls getDeviceConfigByType3 weiter verwendet wird:
const getDeviceConfigByType = async (device: DeviceObject, socket: any): Promise<TypeConfig> => {
	const typeConfig: TypeConfig = {
		domID: device.domID,
		dataPoint: {},
		update: {},
		view: {} as TypeConfigView,
		dialog: {},
	};

	const configOptions: { [key: string]: any } = {};
	configOptions.basic = (relayCount: number): void => {
		typeConfig.update = {
			...typeConfig.update,
			name: { name: "name", updateValue: DeviceActions.basicUpdateValueName },
			oname: { name: "name", updateValue: DeviceActions.basicUpdateValueName },
		};
		typeConfig.dataPoint = { ...typeConfig.dataPoint };
		for (let relay = 0; relay < relayCount; relay++) {
			typeConfig.dataPoint[`${relay}`] = {
				...typeConfig.dataPoint?.[`${relay}`],
				name: `${device.vsID}.${relay}.name`,
				room: `${device.vsID}.${relay}.room`,
			};
		}
	};
	configOptions.power = (relayCount: number, channel: string): void => {
		typeConfig.update = {
			...typeConfig.update,
			power: {
				name: "power",
				unit: "W",
				updateValue: DeviceActions.basicUpdateValueUnit,
			},
		};
		typeConfig.view = {
			info: { ...typeConfig.view?.info, power: { name: "power", class: "icon", html: "" } },
			action: { ...typeConfig.view?.action },
		};
		typeConfig.dataPoint = { ...typeConfig.dataPoint };
		for (let relay = 0; relay < relayCount; relay++) {
			const curChannel = channel.replace("{X}", `${relay}`);
			typeConfig.dataPoint[`${relay}`] = {
				...typeConfig.dataPoint?.[`${relay}`],
				power: `${device.stateId}.${curChannel}.Power`,
			};
		}
	};
	configOptions.voltage = (relayCount: number, channel: string): void => {
		typeConfig.update = {
			...typeConfig.update,
			voltage: {
				name: "voltage",
				unit: "V",
				updateValue: DeviceActions.basicUpdateValueUnit,
			},
		};
		typeConfig.view = {
			info: { ...typeConfig.view?.info, voltage: { name: "voltage", class: "icon", html: "" } },
			action: { ...typeConfig.view?.action },
		};
		typeConfig.dataPoint = { ...typeConfig.dataPoint };
		for (let relay = 0; relay < relayCount; relay++) {
			const curChannel = channel.replace("{X}", `${relay}`);
			typeConfig.dataPoint[`${relay}`] = {
				...typeConfig.dataPoint?.[`${relay}`],
				voltage: `${device.stateId}.${curChannel}.Voltage`,
			};
		}
	};
	configOptions.brightness = (relayCount: number, channel: string): void => {
		typeConfig.update = {
			...typeConfig.update,
			brightness: {
				name: "brightness",
				unit: "%",
				updateValue: DeviceActions.basicUpdateValueBrightness,
			},
		};
		typeConfig.view = {
			info: { ...typeConfig.view?.info, brightness: { name: "brightness", class: "icon", html: "" } },
			action: { ...typeConfig.view?.action },
		};
		typeConfig.dataPoint = { ...typeConfig.dataPoint };
		for (let relay = 0; relay < relayCount; relay++) {
			const curChannel = channel.replace("{X}", `${relay}`);
			typeConfig.dataPoint[`${relay}`] = {
				...typeConfig.dataPoint?.[`${relay}`],
				brightness: `${device.stateId}.${curChannel}.brightness`,
			};
		}
	};
	configOptions.Brightness = (relayCount: number, channel: string): void => {
		typeConfig.update = {
			...typeConfig.update,
			brightness: {
				name: "brightness",
				unit: "%",
				updateValue: DeviceActions.basicUpdateValueBrightness,
			},
		};
		typeConfig.view = {
			info: { ...typeConfig.view?.info, brightness: { name: "brightness", class: "icon", html: "" } },
			action: { ...typeConfig.view?.action },
		};
		typeConfig.dataPoint = { ...typeConfig.dataPoint };
		for (let relay = 0; relay < relayCount; relay++) {
			const curChannel = channel.replace("{X}", `${relay}`);
			typeConfig.dataPoint[`${relay}`] = {
				...typeConfig.dataPoint?.[`${relay}`],
				brightness: `${device.stateId}.${curChannel}.Brightness`,
			};
		}
	};
	configOptions.humidity = (relayCount: number, channel: string): void => {
		typeConfig.update = {
			...typeConfig.update,
			humidity: {
				name: "humidity",
				unit: "%",
				updateValue: DeviceActions.basicUpdateValueUnit,
			},
		};
		typeConfig.view = {
			info: { ...typeConfig.view?.info, humidity: { name: "humidity", class: "icon", html: "" } },
			action: { ...typeConfig.view?.action },
		};
		typeConfig.dataPoint = { ...typeConfig.dataPoint };
		for (let relay = 0; relay < relayCount; relay++) {
			const curChannel = channel.replace("{X}", `${relay}`);
			typeConfig.dataPoint[`${relay}`] = {
				...typeConfig.dataPoint?.[`${relay}`],
				humidity: `${device.stateId}.${curChannel}.Relative`,
			};
		}
	};
	configOptions.batteryPercent = (relayCount: number, channel: string): void => {
		typeConfig.update = {
			...typeConfig.update,
			batteryPercent: {
				name: "devicePower",
				viewPoint: "devicePower",
				updateValue: DeviceActions.basicUpdateDevicePower,
			},
		};
		typeConfig.view = {
			info: { ...typeConfig.view?.info },
			action: { ...typeConfig.view?.action },
		};
		typeConfig.dataPoint = { ...typeConfig.dataPoint };
		for (let relay = 0; relay < relayCount; relay++) {
			const curChannel = channel.replace("{X}", `${relay}`);
			typeConfig.dataPoint[`${relay}`] = {
				...typeConfig.dataPoint?.[`${relay}`],
				batteryPercent: `${device.stateId}.${curChannel}.BatteryPercent`,
			};
		}
	};
	configOptions.externalPower = (relayCount: number, channel: string): void => {
		typeConfig.update = {
			...typeConfig.update,
			externalPower: {
				name: "devicePower",
				viewPoint: "devicePower",
				updateValue: DeviceActions.basicUpdateDevicePower,
			},
		};
		typeConfig.view = {
			info: { ...typeConfig.view?.info, externalPower: { name: "devicePower", class: "icon", html: "" } },
			action: { ...typeConfig.view?.action },
		};
		typeConfig.dataPoint = { ...typeConfig.dataPoint };
		for (let relay = 0; relay < relayCount; relay++) {
			const curChannel = channel.replace("{X}", `${relay}`);
			typeConfig.dataPoint[`${relay}`] = {
				...typeConfig.dataPoint?.[`${relay}`],
				externalPower: `${device.stateId}.${curChannel}.ExternalPower`,
			};
		}
	};
	configOptions.lux = (relayCount: number, channel: string): void => {
		typeConfig.update = {
			...typeConfig.update,
			lux: {
				name: "lux",
				unit: "Lux",
				updateValue: DeviceActions.basicUpdateValueUnit,
			},
		};
		typeConfig.view = {
			info: { ...typeConfig.view?.info, lux: { name: "lux", class: "icon", html: "" } },
			action: { ...typeConfig.view?.action },
		};
		typeConfig.dataPoint = { ...typeConfig.dataPoint };
		for (let relay = 0; relay < relayCount; relay++) {
			const curChannel = channel.replace("{X}", `${relay}`);
			typeConfig.dataPoint[`${relay}`] = {
				...typeConfig.dataPoint?.[`${relay}`],
				lux: `${device.stateId}.${curChannel}.lux`,
			};
		}
	};
	configOptions.motion = (relayCount: number, channel: string): void => {
		typeConfig.update = {
			...typeConfig.update,
			motion: {
				name: "motion",
				updateValue: DeviceActions.basicUpdateMotionValue,
			},
		};
		typeConfig.view = {
			info: { ...typeConfig.view?.info },
			action: {
				...typeConfig.view?.action,
				motion: {
					name: "motion",
					style: { width: "70px" },
					class: "",
					html: "",
				},
			},
		};
		typeConfig.dataPoint = { ...typeConfig.dataPoint };
		for (let relay = 0; relay < relayCount; relay++) {
			const curChannel = channel.replace("{X}", `${relay}`);
			typeConfig.dataPoint[`${relay}`] = {
				...typeConfig.dataPoint?.[`${relay}`],
				motion: `${device.stateId}.${curChannel}.motion`,
			};
		}
	};
	configOptions.door = (relayCount: number, channel: string): void => {
		typeConfig.update = {
			...typeConfig.update,
			door: {
				name: "door",
				updateValue: DeviceActions.basicUpdateValue,
			},
		};
		typeConfig.view = {
			info: { ...typeConfig.view?.info },
			action: {
				...typeConfig.view?.action,
				door: {
					name: "door",
					style: { width: "70px" },
					class: "darkBack",
					html: "",
				},
			},
		};
		typeConfig.dataPoint = { ...typeConfig.dataPoint };
		for (let relay = 0; relay < relayCount; relay++) {
			const curChannel = channel.replace("{X}", `${relay}`);
			typeConfig.dataPoint[`${relay}`] = {
				...typeConfig.dataPoint?.[`${relay}`],
				door: `${device.stateId}.${curChannel}.door`,
			};
		}
	};
	configOptions.temperature = (relayCount: number, channel: string): void => {
		typeConfig.update = {
			...typeConfig.update,
			temperature: {
				name: "temperature",
				unit: "°C",
				updateValue: DeviceActions.basicUpdateValueUnit,
			},
		};
		typeConfig.view = {
			info: { ...typeConfig.view?.info },
			action: {
				...typeConfig.view?.action,
				temperature: {
					name: "temperature",
					style: { width: "70px" },
					class: "temperature",
					html: "",
				},
			},
		};
		typeConfig.dataPoint = { ...typeConfig.dataPoint };
		for (let relay = 0; relay < relayCount; relay++) {
			const curChannel = channel.replace("{X}", `${relay}`);
			typeConfig.dataPoint[`${relay}`] = {
				...typeConfig.dataPoint?.[`${relay}`],
				temperature: `${device.stateId}.${curChannel}.Celsius`,
			};
		}
	};
	configOptions.temperatureC = (relayCount: number, channel: string): void => {
		typeConfig.update = {
			...typeConfig.update,
			temperature: {
				name: "temperature",
				unit: "°C",
				updateValue: DeviceActions.basicUpdateValueUnit,
			},
		};
		typeConfig.view = {
			info: { ...typeConfig.view?.info, temperature: { name: "temperature", class: "icon", html: "" } },
			action: { ...typeConfig.view?.action },
		};
		typeConfig.dataPoint = { ...typeConfig.dataPoint };
		for (let relay = 0; relay < relayCount; relay++) {
			const curChannel = channel.replace("{X}", `${relay}`);
			typeConfig.dataPoint[`${relay}`] = {
				...typeConfig.dataPoint?.[`${relay}`],
				temperature: `${device.stateId}.${curChannel}.temperatureC`,
			};
		}
	};
	configOptions.temperatureTargetC = (relayCount: number, channel: string): void => {
		typeConfig.update = {
			...typeConfig.update,
			temperatureTarget: {
				name: "temperatureTarget",
				unit: "°C",
				updateAck: DeviceActions.basicUpdateTRVAck,
				updateValue: DeviceActions.basicUpdateValueUnit,
			},
		};
		typeConfig.view = {
			info: { ...typeConfig.view?.info },
			action: {
				...typeConfig.view?.action,
				temperatureTarget: {
					name: "temperatureTarget",
					style: {},
					class: "TRVValue",
					html: "",
				},
			},
		};
		typeConfig.dataPoint = { ...typeConfig.dataPoint };
		for (let relay = 0; relay < relayCount; relay++) {
			const curChannel = channel.replace("{X}", `${relay}`);
			typeConfig.dataPoint[`${relay}`] = {
				...typeConfig.dataPoint?.[`${relay}`],
				temperatureTarget: `${device.stateId}.${curChannel}.temperatureTargetC`,
			};
		}
	};
	configOptions.valvePositionTRV = (relayCount: number, channel: string): void => {
		typeConfig.update = {
			...typeConfig.update,
			valvePosition: {
				name: "valvePosition",
				unit: "%",
				updateValue: DeviceActions.basicUpdateValueUnit,
			},
		};
		typeConfig.view = {
			info: { ...typeConfig.view?.info, valvePosition: { name: "valvePosition", class: "icon", html: "" } },
			action: { ...typeConfig.view?.action },
		};
		typeConfig.dataPoint = { ...typeConfig.dataPoint };
		for (let relay = 0; relay < relayCount; relay++) {
			const curChannel = channel.replace("{X}", `${relay}`);
			typeConfig.dataPoint[`${relay}`] = {
				...typeConfig.dataPoint?.[`${relay}`],
				valvePosition: `${device.stateId}.${curChannel}.valvePosition`,
			};
		}
	};
	configOptions.buttonTRV = (): void => {
		typeConfig.view = {
			info: { ...typeConfig.view?.info },
			action: {
				...typeConfig.view?.action,
				buttons: {
					name: "buttons",
					style: { width: "135px" },
					class: "TRVButton",
					html: switchTRVButton(),
				},
			},
		};
		typeConfig.action = {
			...typeConfig.action,
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
				click: DeviceActions.basicActionNumberStepper,
			},
		};
	};
	configOptions.switchButton = (relayCount: number, channel: string): void => {
		typeConfig.update = {
			...typeConfig.update,
			switch: {
				name: "switch",
				updateAck: DeviceActions.basicUpdateSwitchAck,
				updateValue: DeviceActions.basicUpdateSwitch,
			},
		};
		typeConfig.view = {
			info: { ...typeConfig.view?.info },
			action: {
				...typeConfig.view?.action,
				switch: {
					name: "switch",
					style: { width: "70px" },
					class: "",
					html: switchButton(),
				},
			},
		};
		typeConfig.action = {
			...typeConfig.action,
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
		typeConfig.dataPoint = { ...typeConfig.dataPoint };
		for (let relay = 0; relay < relayCount; relay++) {
			const curChannel = channel.replace("{X}", `${relay}`);
			typeConfig.dataPoint[`${relay}`] = {
				...typeConfig.dataPoint?.[`${relay}`],
				switch: `${device.stateId}.${curChannel}.Switch`,
			};
		}
	};

	const addConfig = (
		relayCount: number,
		...channels: { key?: string; options: (string | { key: string; view: string })[] }[]
	): void => {
		channels.forEach((channel) => {
			channel.key = channel.key || "";
			channel.options.forEach((option) => {
				const opt = typeof option == "string" ? option : option.key;
				const view = typeof option != "string" && option.view ? option.view : "";
				if (configOptions[opt]) {
					if (option == "basic") {
						configOptions.basic(relayCount);
					} else {
						configOptions[opt](relayCount, channel.key, view);
					}
				}
			});
		});
	};

	switch (device.type) {
		case "SHDM-2":
			addConfig(1, { options: ["basic"] }, { key: "lights", options: ["power", "brightness", "switchButton"] });
			typeConfig.dialog = {
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
			};
			break;
		case "shellyplusrgbwpm":
			addConfig(
				4,
				{ options: ["basic"] },
				{ key: "Light{X}", options: ["power", "Brightness", "Voltage", "switchButton"] },
			);
			break;
		case "SHPLG-S":
			addConfig(1, { key: "Relay{X}", options: ["basic", "power", "switchButton"] });
			break;
		case "shellyplus1pm":
			addConfig(1, { key: "Relay{X}", options: ["basic", "power", "voltage", "switchButton"] });
			break;
		case "shellyplusplugs":
			addConfig(1, { key: "Relay{X}", options: ["basic", "power", "voltage", "switchButton"] });
			break;
		case "shellyplus2pm":
			addConfig(1, { key: "Relay{X}", options: ["basic", "power", "voltage", "switchButton"] });
			break;
		case "shellyplusht":
			addConfig(
				1,
				{ key: "Humidity{X}", options: ["basic", "humidity"] },
				{ key: "DevicePower{X}", options: ["batteryPercent", "externalPower"] },
				{ key: "Temperature{X}", options: ["temperature"] },
			);
			break;
		case "shellyhtg3":
			addConfig(
				1,
				{ key: "Humidity{X}", options: ["basic", "humidity"] },
				{ key: "DevicePower{X}", options: ["batteryPercent", "externalPower"] },
				{ key: "Temperature{X}", options: ["temperature"] },
			);
			break;
		case "SHTRV-01":
			addConfig(
				1,
				{ key: "tmp", options: ["basic", "valvePositionTRV"] },
				{ key: "bat", options: ["batteryPercent", "externalPower"] },
				{ key: "tmp", options: ["temperatureC", "temperatureTargetC"] },
				{ options: ["buttonTRV"] },
			);
			break;
		case "SHMOS-02":
			addConfig(1, { key: "sensor", options: ["basic", "lux", "batteryPercent", "motion", "temperatureC"] });
			break;
		case "SHDW-2":
			addConfig(1, { key: "sensor", options: ["basic", "lux", "batteryPercent", "door", "temperatureC"] });
			break;
		case "shellypmminig3":
			addConfig(
				1,
				{ options: ["basic"] },
				{ key: "PM1:{X}", options: [{ key: "power", view: "action" }, "Energy", "Voltage", "switchButton"] },
			);
			break;
		default:
	}

	const customConfig = await socket.getState(`${device.vsID}.customConfig`);
	if (typeof customConfig === "object" && customConfig !== null && customConfig.val) {
		try {
			const cc: TypeConfig = JSON.parse(String(customConfig.val));
			const dataPoint: TypeConfigDataPoint = typeConfig.dataPoint ?? {};
			if (typeof cc.dataPoint === "object") {
				Object.entries(cc.dataPoint).forEach(([instance, dataObject]) => {
					if (typeof dataObject === "object" && dataObject != null) {
						Object.entries(dataObject).forEach(([name, value]) => {
							if (!dataPoint[instance]) {
								dataPoint[instance] = {};
							}
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
