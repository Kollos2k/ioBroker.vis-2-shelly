import React from "react";
import { Card, CardContent } from "@mui/material";

import { I18n } from "@iobroker/adapter-react-v5";
import { VisRxWidget } from "@iobroker/vis-2-widgets-react-dev";
import Device from "./components/Device";
import css from "./style.css";

class ShellyAllDevices extends (window.visRxWidget || VisRxWidget) {
	constructor(props) {
		super(props);
		this.state.allDevices = {};
	}

	static getWidgetInfo() {
		return {
			id: "tplAllDevicesWidget",
			visSet: "vis-2-shelly",
			visSetLabel: "vis_2_widgets_shelly", // Widget set translated label (should be defined only in one widget of set)
			visSetColor: "#cf00ff", // Color of widget set. it is enough to set color only in one widget of set
			visName: "AllDevices", // Name of widget
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
		const ids = await this.props.context.socket.getForeignStates(["vis-2-shelly.0.devices.ids"]);
		// console.debug(
		// 	ids.then((value) => {
		// 		return value;
		// 	}),
		// );
		// console.debug(ids);
		this.state.allDevices = JSON.parse(ids["vis-2-shelly.0.devices.ids"].val);
	}

	async componentDidMount() {
		super.componentDidMount();

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

	renderWidgetBody(props) {
		super.renderWidgetBody(props);
		// Object.values(this.state.allDevices).map((device) => console.log(device));
		return (
			<Card style={{ width: "100%", height: "100%" }}>
				<CardContent>
					{Object.values(this.state.allDevices).map((device) => {
						return (
							<Device
								stateID={device.stateId}
								type={device.type}
								id={device.id}
								socket={this.props.context.socket}
								// css={css}
							/>
						);
					})}
					{/* {I18n.t("My Demo Shelly2: ")} */}
					{/* {this.state.values[`${this.state.rxData.oid}.val`]} */}
				</CardContent>
			</Card>
		);
	}
}

export default ShellyAllDevices;
