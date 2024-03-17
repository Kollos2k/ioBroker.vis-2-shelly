import React from "react";
import { Card, CardContent } from "@mui/material";

import { I18n } from "@iobroker/adapter-react-v5";
import { VisRxWidget } from "@iobroker/vis-2-widgets-react-dev";
import Device from "./components/Device";
import getDeviceConfigByType from "./components/DeviceConfig";

class ShellyAllDevices extends (window.visRxWidget || VisRxWidget) {
	constructor(props) {
		super(props);
		// props.myContainer = useRef(null);
		this.state.allDevices = {};
		this.state.showDeviceDialog = false;
		console.debug("THIS");
		console.debug(this);
	}

	static getWidgetInfo() {
		return {
			id: "tplAllDevicesWidget",
			visSet: "vis-2-shelly",
			visSetLabel: "vis_2_widgets_shelly",
			visSetColor: "#cf00ff",
			visName: "AllDevices",
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
	}

	async updateTypeConfig(devices) {
		this.state.typeConfig = {};
		for (const key in devices) {
			const device = devices[key];
			this.vsID = `vis-2-shelly.${device.instance}.devices.${device.id}`;
			this.domID = device.id.replaceAll("#", "");

			// console.log(key);
			devices[key].typeConfig = await getDeviceConfigByType(
				device.type,
				this.domID,
				{
					stateID: device.stateId,
					type: device.type,
					id: device.id,
					socket: this.props.context.socket,
				},
				this.vsID,
			);
		}
		this.state.allDevices = devices;
		this.setState({ allDevices: devices });
		// this.forceUpdate();
	}

	async componentDidMount() {
		super.componentDidMount();
		this.props.context.socket.subscribeState(["vis-2-shelly.0.devices.ids"], (id, state) => {
			// this.state.allDevices = JSON.parse(state.val);
			// this.setState({ allDevices: JSON.parse(state.val) });
			this.updateTypeConfig(JSON.parse(state.val));
		});

		// Update data
		await this.propertiesUpdate();
	}

	// Do not delete this method. It is used by vis to read the widget configuration.
	// eslint-disable-next-line class-methods-use-this
	getWidgetInfo() {
		return ShellyAllDevices.getWidgetInfo();
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

	showDeviceOptions() {
		this.setState({ showDeviceDialog: true }, () => {
			// this.forceUpdate();
		});
	}

	hideDeviceOptions() {
		this.setState({ showDeviceDialog: false }, () => {
			// this.forceUpdate();
		});
	}

	renderWidgetBody(props) {
		super.renderWidgetBody(props);
		// console.debug(this.props.context.socket);
		// // Object.values(this.state.allDevices).map((device) => console.log(device));
		// console.debug("ALL DEVICES");
		// console.debug(this.state.allDevices);
		return (
			<Card style={{ width: "100%", height: "100%" }}>
				<CardContent>
					{Object.values(this.state.allDevices).map((device) => {
						this.vsID = `vis-2-shelly.${device.instance}.devices.${device.id}`;
						console.debug(this.vsID);
						this.domID = device.id.replaceAll("#", "");
						const typeConfig = device.typeConfig;
						// const typeConfig = getDeviceConfigByType(
						// 	device.type,
						// 	this.domID,
						// 	{
						// 		stateID: device.stateId,
						// 		type: device.type,
						// 		id: device.id,
						// 		socket: this.props.context.socket,
						// 	},
						// 	this.vsID,
						// );
						console.debug(typeConfig);
						if (
							typeof typeConfig !== "undefined" &&
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
									parentThis={this}
								/>
							);
						}
					})}
					{/* {I18n.t("My Demo Shelly2: ")} */}
					{/* {this.state.values[`${this.state.rxData.oid}.val`]} */}
				</CardContent>
				{/* <DeviceDialog
					showDeviceDialog={this.state.showDeviceDialog}
					hideDialog={this.hideDeviceOptions}
					parentThis={this}
				/> */}
				{this.state.showDeviceDialog && <div>test</div>}
			</Card>
		);
	}
}

export default ShellyAllDevices;
