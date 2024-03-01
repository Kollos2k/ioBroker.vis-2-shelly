import * as DeviceActions from "./DeviceActions";

const getDeviceConfigByType = (type, domID, props, vsID) => {
	let typeConfig = {};
	const switchButton = (
		<object
			name="svgShellyButton"
			type="image/svg+xml"
			data="/vis-2/widgets/vis-2-shelly/vis2/img/shellySwitchButton.svg"
			title="Switch"
		></object>
	);
	const switchTRVButton = (
		<object
			name="svgShellyTRVButton"
			type="image/svg+xml"
			data="/vis-2/widgets/vis-2-shelly/vis2/img/shellyTRVButton.svg"
			style={{ margin: "5px", width: "125px" }}
			title="TRVSwitch"
		></object>
	);
	switch (type) {
		case "SHDM-2":
			typeConfig = {
				domID,
				update: {
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
				},
				view: {
					info: {
						power: { name: "power", class: "icon", html: "" },
						brightness: { name: "brightness", class: "icon", html: "" },
					},
					action: {
						switch: {
							name: "switch",
							style: { width: "70px" },
							class: "",
							html: switchButton,
						},
					},
				},
				action: {
					switch: {
						name: "switch",
						x: "0px",
						y: "0px",
						w: "100%",
						h: "100%",
						dataPoint: "switch",
						click: DeviceActions.basicActionBooleanToggle,
					},
				},
				dataPoint: {
					0: {
						power: `${props.stateID}.lights.Power`,
						switch: `${props.stateID}.lights.Switch`,
						brightness: `${props.stateID}.lights.brightness`,
						name: `${vsID}.0.name`,
						room: `${vsID}.0.room`,
						deviceID: props.id,
					},
				},
			};
			break;
		case "SHPLG-S":
			typeConfig = {
				domID,
				update: {
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
				},
				view: {
					info: { power: { name: "power", class: "icon", html: "" } },
					action: {
						switch: {
							name: "switch",
							style: { width: "70px" },
							class: "",
							html: switchButton,
						},
					},
				},
				action: {
					switch: {
						name: "switch",
						x: "0px",
						y: "0px",
						w: "100%",
						h: "100%",
						dataPoint: "switch",
						click: DeviceActions.basicActionBooleanToggle,
					},
				},
				dataPoint: {
					0: {
						power: `${props.stateID}.Relay0.Power`,
						switch: `${props.stateID}.Relay0.Switch`,
						name: `${vsID}.0.name`,
						room: `${vsID}.0.room`,
						deviceID: props.id,
					},
				},
			};
			break;
		case "shellyplus1pm":
			typeConfig = {
				domID,
				update: {
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
				},
				view: {
					info: {
						power: { name: "power", class: "icon", html: "" },
						voltage: { name: "voltage", class: "icon", html: "" },
					},
					action: {
						switch: {
							name: "switch",
							style: { width: "70px" },
							class: "",
							html: switchButton,
						},
					},
				},
				action: {
					switch: {
						name: "switch",
						x: "0px",
						y: "0px",
						w: "100%",
						h: "100%",
						dataPoint: "switch",
						click: DeviceActions.basicActionBooleanToggle,
					},
				},
				dataPoint: {
					0: {
						power: `${props.stateID}.Relay0.Power`,
						switch: `${props.stateID}.Relay0.Switch`,
						voltage: `${props.stateID}.Relay0.Voltage`,
						name: `${vsID}.0.name`,
						room: `${vsID}.0.room`,
						deviceID: props.id,
					},
				},
			};
			break;
		case "shellyplusplugs":
			typeConfig = {
				domID,
				update: {
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
				},
				view: {
					info: {
						power: { name: "power", class: "icon", html: "" },
						voltage: { name: "voltage", class: "icon", html: "" },
					},
					action: {
						switch: {
							name: "switch",
							style: { width: "70px" },
							class: "",
							html: switchButton,
						},
					},
				},
				action: {
					switch: {
						name: "switch",
						x: "0px",
						y: "0px",
						w: "100%",
						h: "100%",
						dataPoint: "switch",
						click: DeviceActions.basicActionBooleanToggle,
					},
				},
				dataPoint: {
					0: {
						power: `${props.stateID}.Relay0.Power`,
						switch: `${props.stateID}.Relay0.Switch`,
						voltage: `${props.stateID}.Relay0.Voltage`,
						name: `${vsID}.0.name`,
						room: `${vsID}.0.room`,
						deviceID: props.id,
					},
				},
			};
			break;
		case "shellyplus2pm":
			typeConfig = {
				domID,
				update: {
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
				},
				view: {
					info: {
						power: { name: "power", class: "icon", html: "" },
						voltage: { name: "voltage", class: "icon", html: "" },
					},
					action: {
						switch: {
							name: "switch",
							style: { width: "70px" },
							class: "",
							html: switchButton,
						},
					},
				},
				action: {
					switch: {
						name: "switch",
						x: "0px",
						y: "0px",
						w: "100%",
						h: "100%",
						dataPoint: "switch",
						click: DeviceActions.basicActionBooleanToggle,
					},
				},
				dataPoint: {
					0: {
						power: `${props.stateID}.Relay0.Power`,
						switch: `${props.stateID}.Relay0.Switch`,
						voltage: `${props.stateID}.Relay0.Voltage`,
						name: `${vsID}.0.name`,
						room: `${vsID}.0.room`,
						deviceID: props.id,
					},
					1: {
						power: `${props.stateID}.Relay1.Power`,
						switch: `${props.stateID}.Relay1.Switch`,
						voltage: `${props.stateID}.Relay1.Voltage`,
						name: `${vsID}.1.name`,
						room: `${vsID}.1.room`,
						deviceID: props.id,
					},
				},
			};
			break;
		case "shellyplusht":
			typeConfig = {
				domID,
				update: {
					humidity: {
						name: "humidity",
						unit: "%",
						updateValue: DeviceActions.basicUpdateValueUnit,
					},
					batteryPercent: {
						name: "devicePower",
						viewPoint: "externalPower",
						updateValue: DeviceActions.basicUpdateDevicePower,
					},
					externalPower: {
						name: "devicePower",
						viewPoint: "externalPower",
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
				},
				view: {
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
				},
				dataPoint: {
					0: {
						temperature: `${props.stateID}.Temperature0.Celsius`,
						humidity: `${props.stateID}.Humidity0.Relative`,
						externalPower: `${props.stateID}.DevicePower0.ExternalPower`,
						batteryPercent: `${props.stateID}.DevicePower0.BatteryPercent`,
						name: `${vsID}.0.name`,
						room: `${vsID}.0.room`,
						deviceID: props.id,
					},
				},
			};
			break;
		case "SHTRV-01":
			typeConfig = {
				domID,
				update: {
					valvePosition: {
						name: "valvePosition",
						unit: "%",
						updateValue: DeviceActions.basicUpdateValueUnit,
					},
					batteryPercent: {
						name: "devicePower",
						updateValue: DeviceActions.basicUpdateDevicePower,
					},
					externalPower: {
						name: "devicePower",
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
				},
				view: {
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
							html: switchTRVButton,
						},
					},
				},
				action: {
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
				},
				dataPoint: {
					0: {
						temperature: `${props.stateID}.tmp.temperatureC`,
						temperatureTarget: `${props.stateID}.tmp.temperatureTargetC`,
						valvePosition: `${props.stateID}.tmp.valvePosition`,
						externalPower: `${props.stateID}.bat.charger`,
						batteryPercent: `${props.stateID}.bat.value`,
						name: `${vsID}.0.name`,
						room: `${vsID}.0.room`,
						deviceID: props.id,
					},
				},
			};
			break;
		case "SHMOS-02":
			typeConfig = {
				domID,
				update: {
					lux: {
						name: "lux",
						unit: "Lux",
						updateValue: DeviceActions.basicUpdateValueUnit,
					},
					batteryPercent: {
						name: "devicePower",
						unit: "%",
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
				},
				view: {
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
				},
				dataPoint: {
					0: {
						temperature: `${props.stateID}.sensor.temperatureC`,
						motion: `${props.stateID}.sensor.motion`,
						lux: `${props.stateID}.sensor.lux`,
						batteryPercent: `${props.stateID}.sensor.battery`,
						name: `${vsID}.0.name`,
						room: `${vsID}.0.room`,
						deviceID: props.id,
					},
				},
			};
			break;
		default:
	}
	return typeConfig;
};

export default getDeviceConfigByType;
