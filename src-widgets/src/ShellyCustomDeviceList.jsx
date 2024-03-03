import React from "react";
import { Card, CardContent, TextField, Select, Option } from "@mui/material";

import { I18n, ObjectBrowser } from "@iobroker/adapter-react-v5";
import { VisRxWidget } from "@iobroker/vis-2-widgets-react-dev";
import Device from "./components/Device";
import getDeviceConfigByType from "./components/DeviceConfig";

class ShellyCustomDeviceList extends (window.visRxWidget || VisRxWidget) {
	constructor(props) {
		super(props);
		// props.myContainer = useRef(null);
		this.state.allDevices = {};
		this.state.deviceList = {};
		console.debug("THIS DEVICES");
		console.debug(this);
	}

	static getWidgetInfo() {
		return {
			id: "tplCustomDeviceListWidget",
			visSet: "vis-2-shelly",
			visSetLabel: "vis_2_widgets_shelly", // Widget set translated label (should be defined only in one widget of set)
			visSetColor: "#cf00ff", // Color of widget set. it is enough to set color only in one widget of set
			visName: "CustomDeviceList", // Name of widget
			visAttrs: [
				{
					name: "common", // group name
					fields: [
						{
							name: "display", // name in data structure
							label: "vis_2_widgets_shelly_display", // translated field label
							type: "select",
							options: [
								{ value: "block", label: "block" },
								{ value: "flex", label: "flex" },
							],
							noTranslation: true,
							default: "block",
						},
						{
							name: "count",
							type: "number",
							default: 1,
							label: "vis_2_widgets_shelly_device_count",
							onChange: (field, data, changeData) => changeData(data),
						},
					],
				},
				{
					name: "devices", // name of custom group
					label: "vis_2_widgets_shelly_group_devices", // label of custom group
					indexFrom: 1, // optional start index of iterator
					indexTo: "count",
					fields: [
						{
							name: "device",
							label: "vis_2_widgets_shelly_device",
							type: "custom",
							component: (field, data, onDataChange, socket, widgetID, view, project) => {
								const deviceList =
									typeof socket.context.socket.states.deviceList !== "undefined"
										? socket.context.socket.states.deviceList
										: {};
								return (
									<select
										name="ShellyDeviceList_DeviceSelect"
										style={{ width: "100%" }}
										value={data[field.name]}
										onChange={(e) => {
											onDataChange({ [field.name]: e.target.value });
										}}
									>
										<option value="">-- Select device --</option>
										{Object.entries(deviceList).map(([key, val]) => {
											return (
												<option value={key}>
													{val.name !== null && val.name.length > 0 ? val.name : val.id}
												</option>
											);
										})}
									</select>
								);
							},
						},
					],
				},
				// check here all possible types https://github.com/ioBroker/ioBroker.vis/blob/react/src/src/Attributes/Widget/SCHEMA.md
			],
			visPrev: "widgets/vis-2-shelly/vis2/img/editor/allDevices.png",
		};
	}

	// eslint-disable-next-line class-methods-use-this
	async propertiesUpdate() {
		// Widget has 3 important states
		// 1. this.state.values - contains all state values, that are used in widget (automatically collected from widget info).
		//                        So you can use `this.state.values[this.state.rxData.oid + '.val']` to get value of state with id this.state.rxData.oid
		// 2. this.state.rxData - contains all widget data with replaced bindings. E.g. if this.state.data.type is `{system.adapter.admin.0.alive}`,
		//                        then this.state.rxData.type will have state value of `system.adapter.admin.0.alive`
		// 3. this.state.rxStyle - contains all widget styles with replaced bindings. E.g. if this.state.styles.width is `{javascript.0.width}px`,
		//                        then this.state.rxData.type will have state value of `javascript.0.width` + 'px
		this.updateDeviceList();
	}

	async updateDeviceList() {
		this.state.deviceList = {};
		for (let count = 1; count <= this.state.data.count; count++) {
			if (
				typeof this.state.data[`device${count}`] !== "undefined" &&
				typeof this.state.allDevices[this.state.data[`device${count}`]] !== "undefined"
			) {
				this.state.deviceList[count] = this.state.allDevices[this.state.data[`device${count}`]];
			}
		}
		this.forceUpdate();
	}

	async componentDidMount() {
		super.componentDidMount();
		this.props.context.socket.subscribeState(["vis-2-shelly.0.devices.ids"], (id, state) => {
			this.state.allDevices = JSON.parse(state.val);
			this.props.context.socket.states.deviceList = this.state.allDevices;
			this.updateDeviceList();
			this.forceUpdate();
		});

		// Update data
		await this.propertiesUpdate();
	}

	// Do not delete this method. It is used by vis to read the widget configuration.
	// eslint-disable-next-line class-methods-use-this
	getWidgetInfo() {
		return ShellyCustomDeviceList.getWidgetInfo();
	}

	// This function is called every time when rxData is changed
	async onRxDataChanged() {
		console.debug("onRxDataChanged");
		await this.propertiesUpdate();
	}

	// This function is called every time when rxStyle is changed
	// eslint-disable-next-line class-methods-use-this
	async onRxStyleChanged() {}

	// This function is called every time when some Object State updated, but all changes lands into this.state.values too
	// eslint-disable-next-line class-methods-use-this, no-unused-vars
	async onStateUpdated(id, state) {}

	renderWidgetBody(props) {
		super.renderWidgetBody(props);
		return (
			<Card style={{ width: "100%", height: "100%" }}>
				<CardContent>
					{Object.values(this.state.deviceList).map((device) => {
						this.vsID = `vis-2-shelly.${device.instance}.devices.${device.id}`;
						this.domID = device.id.replaceAll("#", "");
						const typeConfig = getDeviceConfigByType(
							device.type,
							this.domID,
							{ stateID: device.stateId, type: device.type, id: device.id },
							this.vsID,
						);
						if (
							typeof typeConfig.dataPoint !== "undefined" &&
							typeof typeConfig.dataPoint[device.relay] !== "undefined"
						) {
							const deviceDomID = typeConfig.domID + device.relay;
							return (
								<Device
									stateID={device.stateId}
									type={device.type}
									id={device.id}
									typeConfig={typeConfig}
									deviceDomID={deviceDomID}
									relay={device.relay}
									state={this.state}
									dataPoint={typeConfig.dataPoint[device.relay]}
									socket={this.props.context.socket}
									widID={this.props.id}
								/>
							);
						}
					})}
				</CardContent>
			</Card>
		);
	}
}

export default ShellyCustomDeviceList;
