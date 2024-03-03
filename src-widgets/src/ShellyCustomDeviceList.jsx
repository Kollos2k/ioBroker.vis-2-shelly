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
		this.state.roomDevices = {};
		console.debug("THIS ROOM");
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
							name: "rooms",
							label: "vis_2_widgets_shelly_rooms",
							type: "custom",
							component: (field, data, onDataChange, socket, widgetID, view, project) => {
								// console.debug("Component");
								// console.debug(this);
								// console.debug(field);
								// console.debug("DATA");
								// console.debug(data);
								// console.debug(socket);
								const roomList =
									typeof socket.context.socket.states.roomList !== "undefined"
										? socket.context.socket.states.roomList
										: {};
								return (
									<select
										// id={`${widgetID}_ShellyRoomSelect`}
										name="ShellyByRoom_RoomSelect"
										style={{ width: "100%" }}
										value={data[field.name]}
										onChange={(e) => {
											onDataChange({ [field.name]: e.target.value }); // returns all changed field as object.
											// If some propertiy is null, so it will be deleted from data
											// this.updateRoomDevices();
											console.debug(field);
											console.debug(data);
											console.debug(onDataChange);
											console.debug(socket);
											// console.debug(widgetID);
											// console.debug(view);
											// console.debug(project);
										}}
									>
										<option value="">-- Select room --</option>
										{Object.entries(roomList).map(([key, val]) => {
											return <option value={key}>{val}</option>;
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
		this.updateRoomDevices();
	}

	async updateRoomDevices() {
		this.state.roomDevices = {};
		if (typeof this.state.data.rooms !== "undefined") {
			Object.entries(this.state.allDevices).forEach(([key, device]) => {
				if (device.room === this.state.data.rooms) {
					this.state.roomDevices[key] = device;
				}
			});
			this.forceUpdate();
		}
	}

	async componentDidMount() {
		super.componentDidMount();
		if (typeof this.props.context.socket.states.roomList === "undefined") {
			this.props.context.socket.subscribeState(["vis-2-shelly.0.devices.roomIds"], (id, state) => {
				this.state.rooms = JSON.parse(state.val);
				this.props.context.socket.states.roomList = this.state.rooms;
			});
		}
		this.props.context.socket.subscribeState(["vis-2-shelly.0.devices.ids"], (id, state) => {
			this.state.allDevices = JSON.parse(state.val);
			this.updateRoomDevices();
			this.forceUpdate();
		});

		// Update data
		await this.propertiesUpdate();
	}

	// Do not delete this method. It is used by vis to read the widget configuration.
	// eslint-disable-next-line class-methods-use-this
	getWidgetInfo() {
		return ShellyByRoomDevices.getWidgetInfo();
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
		console.debug("room devices");
		console.debug(this.state.roomDevices);
		return (
			<Card style={{ width: "100%", height: "100%" }}>
				<CardContent>
					{Object.values(this.state.roomDevices).map((device) => {
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
