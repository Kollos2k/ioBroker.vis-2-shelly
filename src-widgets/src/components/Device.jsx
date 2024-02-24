import { React, Component } from "react";
import { withStyles } from "@mui/styles";
import "../style.css";

const styles = (theme) => ({});

const getDeviceConfigByType = (type, domID, props, vsID) => {
	let typeConfig = {};
	// const switchButton = `<svg name='svgShellyButton' viewBox="0 0 100 100" width="60" preserveAspectRatio="xMidYMid meet"><use xlink:href="#svgShellyButton" href="#svgShellyButton"></use></svg>`;
	const switchButton = `<object name='svgShellyButton' type="image/svg+xml" data="/vis/widgets/vis-shelly/images/shellySwitchButton.svg"></object>`;
	// const switchTRVButton = `<img src="/vis/widgets/vis-shelly/images/shellyTRVButton.svg" style="margin-top:5px;margin-right: 3px;width:135px;"/>`;
	const switchTRVButton = `<object name='svgShellyTRVButton' type="image/svg+xml" data="/vis/widgets/vis-shelly/images/shellyTRVButton.svg" style="margin:5px;width:125px;"></object>`;
	// const switchTRVButton = `<svg name='svgShellyTRVButton' viewBox="0 0 226.67 90.04" width="130" style="margin-top:5px;margin-right: 3px;" preserveAspectRatio="xMidYMid meet"><use name='svgShellyTRVBorder' xlink:href="#svgShellyTRVBorder" href="#svgShellyTRVBorder"></use><use xlink:href="#svgShellyTRVButton" href="#svgShellyTRVButton"></use></svg>`;
	// const switchTRVBorder = `<svg name='svgShellyTRVBorder' viewBox="0 0 226.67 90.04" width="130" style="margin-top:5px;margin-right: 3px;" preserveAspectRatio="xMidYMid meet"><use xlink:href="#svgShellyTRVBorder" href="#svgShellyTRVBorder"></use></svg>`;
	switch (type) {
		case "SHDM-2":
			typeConfig = {
				domID: domID,
				update: {
					power: {
						name: "power",
						unit: "W",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueUnit,
					},
					brightness: {
						name: "brightness",
						unit: "%",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueBrightness,
					},
					name: {
						name: "name",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueName,
					},
					oname: {
						name: "name",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueName,
					},
					switch: {
						name: "switch",
						// updateAck: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateSwitchAck,
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateSwitch,
					},
				},
				view: {
					info: {
						power: { name: "power", class: "icon", html: "" },
						brightness: { name: "brightness", class: "icon", html: "" },
					},
					action: {
						switch: { name: "switch", style: "width: 70px;", class: "", html: switchButton },
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
						// click: vis.binds["vis-shelly"].createDevice_helper.actions.basicActionBooleanToggle,
					},
				},
				dataPoint: {
					0: {
						power: props.stateID + ".lights.Power",
						switch: props.stateID + ".lights.Switch",
						brightness: props.stateID + ".lights.brightness",
						name: vsID + ".0.name",
						room: vsID + ".0.room",
						deviceID: props.id,
					},
				},
			};
			break;
		case "SHPLG-S":
			typeConfig = {
				domID: domID,
				update: {
					power: {
						name: "power",
						unit: "W",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueUnit,
					},
					name: {
						name: "name",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueName,
					},
					oname: {
						name: "name",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueName,
					},
					switch: {
						name: "switch",
						// updateAck: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateSwitchAck,
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateSwitch,
					},
				},
				view: {
					info: { power: { name: "power", class: "icon", html: "" } },
					action: {
						switch: { name: "switch", style: "width: 70px;", class: "", html: switchButton },
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
						// click: vis.binds["vis-shelly"].createDevice_helper.actions.basicActionBooleanToggle,
					},
				},
				dataPoint: {
					0: {
						power: props.stateID + ".Relay0.Power",
						switch: props.stateID + ".Relay0.Switch",
						name: vsID + ".0.name",
						room: vsID + ".0.room",
						deviceID: props.id,
					},
				},
			};
			break;
		case "shellyplus1pm":
			typeConfig = {
				domID: domID,
				update: {
					power: {
						name: "power",
						unit: "W",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueUnit,
					},
					voltage: {
						name: "voltage",
						unit: "V",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueUnit,
					},
					name: {
						name: "name",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueName,
					},
					oname: {
						name: "name",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueName,
					},
					switch: {
						name: "switch",
						// updateAck: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateSwitchAck,
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateSwitch,
					},
				},
				view: {
					info: {
						power: { name: "power", class: "icon", html: "" },
						voltage: { name: "voltage", class: "icon", html: "" },
					},
					action: {
						switch: { name: "switch", style: "width: 70px;", class: "", html: switchButton },
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
						// click: vis.binds["vis-shelly"].createDevice_helper.actions.basicActionBooleanToggle,
					},
				},
				dataPoint: {
					0: {
						power: props.stateID + ".Relay0.Power",
						switch: props.stateID + ".Relay0.Switch",
						voltage: props.stateID + ".Relay0.Voltage",
						name: vsID + ".0.name",
						room: vsID + ".0.room",
						deviceID: props.id,
					},
				},
			};
			break;
		case "shellyplusplugs":
			typeConfig = {
				domID: domID,
				update: {
					power: {
						name: "power",
						unit: "W",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueUnit,
					},
					voltage: {
						name: "voltage",
						unit: "V",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueUnit,
					},
					name: {
						name: "name",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueName,
					},
					oname: {
						name: "name",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueName,
					},
					switch: {
						name: "switch",
						// updateAck: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateSwitchAck,
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateSwitch,
					},
				},
				view: {
					info: {
						power: { name: "power", class: "icon", html: "" },
						voltage: { name: "voltage", class: "icon", html: "" },
					},
					action: {
						switch: { name: "switch", style: "width: 70px;", class: "", html: switchButton },
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
						// click: vis.binds["vis-shelly"].createDevice_helper.actions.basicActionBooleanToggle,
					},
				},
				dataPoint: {
					0: {
						power: props.stateID + ".Relay0.Power",
						switch: props.stateID + ".Relay0.Switch",
						voltage: props.stateID + ".Relay0.Voltage",
						name: vsID + ".0.name",
						room: vsID + ".0.room",
						deviceID: props.id,
					},
				},
			};
			break;
		case "shellyplus2pm":
			typeConfig = {
				domID: domID,
				update: {
					power: {
						name: "power",
						unit: "W",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueUnit,
					},
					voltage: {
						name: "voltage",
						unit: "V",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueUnit,
					},
					name: {
						name: "name",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueName,
					},
					oname: {
						name: "name",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueName,
					},
					switch: {
						name: "switch",
						// updateAck: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateSwitchAck,
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateSwitch,
					},
				},
				view: {
					info: {
						power: { name: "power", class: "icon", html: "" },
						voltage: { name: "voltage", class: "icon", html: "" },
					},
					action: {
						switch: { name: "switch", style: "width: 70px;", class: "", html: switchButton },
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
						// click: vis.binds["vis-shelly"].createDevice_helper.actions.basicActionBooleanToggle,
					},
				},
				dataPoint: {
					0: {
						power: props.stateID + ".Relay0.Power",
						switch: props.stateID + ".Relay0.Switch",
						voltage: props.stateID + ".Relay0.Voltage",
						name: vsID + ".0.name",
						room: vsID + ".0.room",
						deviceID: props.id,
					},
					1: {
						power: props.stateID + ".Relay1.Power",
						switch: props.stateID + ".Relay1.Switch",
						voltage: props.stateID + ".Relay1.Voltage",
						name: vsID + ".1.name",
						room: vsID + ".1.room",
						deviceID: props.id,
					},
				},
			};
			break;
		case "shellyplusht":
			typeConfig = {
				domID: domID,
				update: {
					humidity: {
						name: "humidity",
						unit: "%",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueUnit,
					},
					batteryPercent: {
						name: "devicePower",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateDevicePower,
					},
					externalPower: {
						name: "devicePower",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateDevicePower,
					},
					temperature: {
						name: "temperature",
						unit: "°C",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueUnit,
					},
					name: {
						name: "name",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueName,
					},
					oname: {
						name: "name",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueName,
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
							style: "width: 70px;",
							class: "temperature",
							html: "",
						},
					},
				},
				dataPoint: {
					0: {
						temperature: props.stateID + ".Temperature0.Celsius",
						humidity: props.stateID + ".Humidity0.Relative",
						externalPower: props.stateID + ".DevicePower0.ExternalPower",
						batteryPercent: props.stateID + ".DevicePower0.BatteryPercent",
						// name: val.stateID + ".name",
						name: vsID + ".0.name",
						room: vsID + ".0.room",
						deviceID: props.id,
					},
				},
			};
			break;
		case "SHTRV-01":
			typeConfig = {
				domID: domID,
				update: {
					valvePosition: {
						name: "valvePosition",
						unit: "%",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueUnit,
					},
					batteryPercent: {
						name: "devicePower",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateDevicePower,
					},
					externalPower: {
						name: "devicePower",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateDevicePower,
					},
					temperature: {
						name: "temperature",
						unit: "°C",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueUnit,
					},
					name: {
						name: "name",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueName,
					},
					oname: {
						name: "name",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueName,
					},
					temperatureTarget: {
						name: "temperatureTarget",
						unit: "°C",
						// updateAck: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateTRVAck,
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueUnit,
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
							style: "",
							class: "TRVValue",
							html: "",
						},
						buttons: {
							name: "buttons",
							style: "width: 135px;",
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
						// click: vis.binds["vis-shelly"].createDevice_helper.actions.basicActionNumberStepper,
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
							find: `[name='svgShellyTRVButton']`,
							contentDocument: true,
							className: "animatedAction",
						},
						// click: vis.binds["vis-shelly"].createDevice_helper.actions.basicActionNumberStepper,
					},
				},
				dataPoint: {
					0: {
						temperature: props.stateID + ".tmp.temperatureC",
						temperatureTarget: props.stateID + ".tmp.temperatureTargetC",
						valvePosition: props.stateID + ".tmp.valvePosition",
						externalPower: props.stateID + ".bat.charger",
						batteryPercent: props.stateID + ".bat.value",
						name: vsID + ".0.name",
						room: vsID + ".0.room",
						deviceID: props.id,
					},
				},
			};
			break;
		case "SHMOS-02":
			typeConfig = {
				domID: domID,
				update: {
					lux: {
						name: "lux",
						unit: "Lux",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueUnit,
					},
					batteryPercent: {
						name: "devicePower",
						unit: "%",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueUnit,
					},
					motion: {
						name: "motion",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateMotionValue,
					},
					temperature: {
						name: "temperature",
						unit: "°C",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueUnit,
					},
					name: {
						name: "name",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueName,
					},
					oname: {
						name: "name",
						// updateValue: vis.binds["vis-shelly"].createDevice_helper.actions.basicUpdateValueName,
					},
				},
				view: {
					info: {
						temperature: { name: "temperature", class: "icon", html: "" },
						batteryPercent: { name: "batteryPercent", class: "icon", html: "" },
						lux: { name: "lux", class: "icon", html: "" },
					},
					action: { motion: { name: "motion", style: "width: 70px;", class: "", html: "" } },
				},
				dataPoint: {
					0: {
						temperature: props.stateID + ".sensor.temperatureC",
						motion: props.stateID + ".sensor.motion",
						lux: props.stateID + ".sensor.lux",
						batteryPercent: props.stateID + ".sensor.battery",
						name: vsID + ".0.name",
						room: vsID + ".0.room",
						deviceID: props.id,
					},
				},
			};
			break;
		default:
	}
	return typeConfig;
};
// let css = {};

class Device extends Component {
	constructor(props) {
		super(props);
		this.vsID = `vis-2-shelly.0.devices.${props.id}`;
		this.domID = props.id.replaceAll("#", "");
		this.typeConfig = getDeviceConfigByType(props.type, this.domID, this.props, this.vsID);
		// css = this.props.css;
		// console.debug(this.typeConfig);
	}

	async propertiesUpdate() {
		// console.debug(this);
		// console.debug(this.props);
		// const ids = await this.props.socket.getForeignStates([`${this.props.stateID}.name`]);
		// console.debug(ids[`${this.props.stateID}.name`].val);
	}

	async componentDidMount() {
		await this.propertiesUpdate();
	}

	render() {
		const dataPoint = typeof this.typeConfig.dataPoint === "undefined" ? [] : this.typeConfig.dataPoint;
		// Object.entries(dataPoint).forEach(([key, value]) => {
		// 	console.debug(`${key}`);
		// 	console.debug(value);
		// });
		// console.debug("test");
		return (
			<div>
				{Object.entries(dataPoint).map(([key, value]) => {
					const deviceDomID = this.typeConfig.domID + key;
					return (
						<div
							id={deviceDomID}
							className="vis2_shelly_DeviceBody"
							title={this.props.stateID}
							// style={"width:200px"}
						>
							<span name="status">
								<span>
									<span className="connectionState connectionStateOnline"></span>
								</span>
							</span>
							<span name="icon"></span>
							<span name="name">{this.props.id}</span>
							<span name="info">
								{Object.entries(this.typeConfig.view.info).map(([viewKey, viewVal]) => {
									return (
										<span name={viewVal.name} className={viewVal.class}>
											{viewVal.html}
										</span>
									);
								})}
							</span>
							<span name="action"></span>
						</div>
					);
				})}
				{/* {this.props.id} */}
			</div>
		);
	}
}
export default withStyles(styles)(Device);

// export default Device;
