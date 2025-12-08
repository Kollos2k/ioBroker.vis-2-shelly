import React from "react";
import { Card, CardContent } from "@mui/material";

import Device from "./components/Device";
// import getDeviceConfigByType from "./components/DeviceConfig";
// import { getProps } from "@iobroker/vis-2-widgets-react-dev/visDevUtils";
import type { DeviceObject } from "./components/DeviceConfig";
import Generic from "./Generic";
import type { RxRenderWidgetProps, RxWidgetInfo, VisRxWidgetProps, VisRxWidgetState } from "@iobroker/types-vis-2";
import ShellyIDController from "./components/ShellyIDController";

interface StaticRxData {
	display: "block" | "flex";
	count: number;
	device: string;
}
interface StaticState extends VisRxWidgetState {
	deviceList: DeviceObject[];
	showDeviceDialog: boolean;
}

class ShellyAllDevices extends Generic<StaticRxData, StaticState> {
	static deviceList: { [key: string]: DeviceObject } = {};
	static deviceIDs: { [key: string]: any } = {};
	static isSubscribedDeviceIDs: boolean = false;
	constructor(props: VisRxWidgetProps) {
		super(props);
		// props.myContainer = useRef(null);
		this.state = { ...this.state, deviceList: [], showDeviceDialog: false };
		ShellyIDController.registerCallback(this.props.context.socket, () => {
			void this.updateDeviceList();
		});
		// console.debug("THIS");
		// console.debug(this);
		// this.refParent = React.createRef();

		// socket: this.socket, CHANGED TO THIS:PROPS
		// this.widgetProps = getProps(
		// 	{
		// 		socket: this.props.context.socket,
		// 		theme: this.state.theme,
		// 		refParent: this.refParent,
		// 	},
		// 	{
		// 		type: "all",
		// 	},
		// 	{
		// 		width: 600,
		// 		height: 200,
		// 	},
		// );
	}

	static getWidgetInfo(): RxWidgetInfo {
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
			visPrev: "widgets/vis-2-shelly/img/editor/allDevices.png",
		};
	}
	async updateDeviceList(): Promise<void> {
		const allDevices: { [key: string]: DeviceObject } = await ShellyIDController.getAllDevices();
		const deviceList: DeviceObject[] = [];
		Object.values(allDevices).forEach((dev) => {
			deviceList.push(dev);
		});
		// for (let count = 1; count <= this.state.data.count; count++) {
		// 	const devID: any = this.state.data[`device${count}`];
		// 	const device: DeviceObject | undefined = await ShellyIDController.getDeviceByID(devID);
		// 	if (device !== undefined) {
		// 		deviceList.push(device);
		// 	}
		// }
		this.setState({ deviceList: deviceList }, () => {
			this.forceUpdate();
		});
	}

	// eslint-disable-next-line class-methods-use-this
	propertiesUpdate(): void {
		// Widget has 3 important states
		// 1. this.state.values - contains all state values, that are used in widget (automatically collected from widget info).
		//                        So you can use `this.state.values[this.state.rxData.oid + '.val']` to get value of state with id this.state.rxData.oid
		// 2. this.state.rxData - contains all widget data with replaced bindings. E.g. if this.state.data.type is `{system.adapter.admin.0.alive}`,
		//                        then this.state.rxData.type will have state value of `system.adapter.admin.0.alive`
		// 3. this.state.rxStyle - contains all widget styles with replaced bindings. E.g. if this.state.styles.width is `{javascript.0.width}px`,
		//                        then this.state.rxData.type will have state value of `javascript.0.width` + 'px
	}

	// async updateTypeConfig(devices) {
	// 	this.state.typeConfig = {};
	// 	for (const key in devices) {
	// 		const device = devices[key];
	// 		this.vsID = `vis-2-shelly.${device.instance}.devices.${device.id}`;
	// 		this.domID = device.id.replaceAll("#", "");

	// 		// console.log(key);
	// 		devices[key].typeConfig = await getDeviceConfigByType(
	// 			device.type,
	// 			this.domID,
	// 			{
	// 				stateID: device.stateId,
	// 				type: device.type,
	// 				id: device.id,
	// 				socket: this.props.context.socket,
	// 			},
	// 			this.vsID,
	// 		);
	// 	}
	// 	this.state.allDevices = devices;
	// 	this.setState({ allDevices: devices });
	// }

	componentDidMount(): void {
		super.componentDidMount();
		// this.props.context.socket.subscribeState(["vis-2-shelly.0.devices.ids"], (id, state) => {
		// this.state.allDevices = JSON.parse(state.val);
		// this.setState({ allDevices: JSON.parse(state.val) });
		// this.updateTypeConfig(JSON.parse(state.val));
		// });

		// Update data
		// await this.propertiesUpdate();
	}

	// To not write before every label "vis_2_widgets_template_" we can use this method
	static getI18nPrefix(): string {
		return "vis_2_widgets_shelly_";
	}

	// Do not delete this method. It is used by vis to read the widget configuration.
	// eslint-disable-next-line class-methods-use-this
	getWidgetInfo(): RxWidgetInfo {
		return ShellyAllDevices.getWidgetInfo();
	}

	// This function is called every time when rxData is changed
	onRxDataChanged(): void {
		// console.debug("onRxDataChanged");
		this.propertiesUpdate();
	}

	// This function is called every time when rxStyle is changed
	// eslint-disable-next-line class-methods-use-this
	onRxStyleChanged(): void {}

	// eslint-disable-next-line class-methods-use-this
	onStateUpdated(_id: string, _state: ioBroker.State | null | undefined): void {}

	// showDeviceOptions() {
	// 	this.setState({ showDeviceDialog: true }, () => {
	// 		// this.forceUpdate();
	// 	});
	// }

	// hideDeviceOptions() {
	// 	this.setState({ showDeviceDialog: false }, () => {
	// 		// this.forceUpdate();
	// 	});
	// }

	renderWidgetBody(props: RxRenderWidgetProps): React.JSX.Element | React.JSX.Element[] | null {
		super.renderWidgetBody(props);
		return (
			<Card style={{ width: "100%", height: "100%" }}>
				<CardContent>
					{this.state.deviceList.map((device: DeviceObject) => {
						const typeConfig = device.typeConfig;
						if (
							typeof typeConfig !== "undefined" &&
							typeof typeConfig.dataPoint !== "undefined" &&
							typeof typeConfig.domID !== "undefined" &&
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
									key={this.props.id + device.id}
								/>
							);
						}
					})}
				</CardContent>
				{this.state.showDeviceDialog && <div>test</div>}
			</Card>
		);
	}
}

export default ShellyAllDevices;
