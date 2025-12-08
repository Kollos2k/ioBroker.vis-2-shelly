import React from "react";

import Device from "./components/Device";
// import getDeviceConfigByType from "./components/DeviceConfig";
import type { DeviceObject } from "./components/DeviceConfig";
import Generic from "./Generic";
import type { RxRenderWidgetProps, RxWidgetInfo, VisRxWidgetProps, VisRxWidgetState } from "@iobroker/types-vis-2";
// import type { SubscribeCallback as IDSubscribeCallback } from "./components/ShellyIDs";
import ShellyIDController from "./components/ShellyIDController";

interface StaticRxData {
	display: "block" | "flex";
	count: number;
	device: string;
}
interface StaticState extends VisRxWidgetState {
	deviceList: DeviceObject[];
}

class ShellyCustomDeviceList extends Generic<StaticRxData, StaticState> {
	vsID: string = "";
	domID: string = "";
	static allDevices: { [key: string]: DeviceObject } = {};
	static deviceIDs: { [key: string]: any } = {};
	constructor(props: VisRxWidgetProps) {
		super(props);
		this.state = { ...this.state, deviceList: [] };
		ShellyIDController.registerCallback(this.props.context.socket, () => {
			void this.updateDeviceList();
		});
	}

	static getWidgetInfo(): RxWidgetInfo {
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
							label: "display", // translated field label
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
							label: "device_count",
							onChange: (field, data, changeData /*, socket, index*/): Promise<void> => {
								changeData(data);
								return Promise.resolve();
							},
						},
					],
				},
				{
					name: "devices", // name of custom group
					label: "group_devices", // label of custom group
					indexFrom: 1, // optional start index of iterator
					indexTo: "count",
					fields: [
						{
							name: "device",
							label: "device",
							type: "custom",
							component: (field, data, setData /*, props*/): React.JSX.Element => {
								const deviceList: Record<string, any> = ShellyIDController.getDeviceIDList();
								// console.debug("component");
								// console.debug(this);
								// console.debug(field);
								// console.debug(data);
								// console.debug(setData);
								// console.debug(props);
								// console.debug(ShellyCustomDeviceList.allDevices);
								return (
									<select
										name="ShellyDeviceList_DeviceSelect"
										style={{ width: "100%" }}
										value={data[field.name || ""]}
										onChange={(e) => {
											setData({ [field.name || ""]: e.target.value });
										}}
									>
										<option value="">-- Select device --</option>
										{Object.entries(deviceList).map(([key, val]) => {
											return (
												<option value={key} key={key}>
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
			visPrev: "widgets/vis-2-shelly/img/editor/allDevices.png",
		};
	}
	getDeviceList(): object {
		return this.state.deviceList;
	}

	propertiesUpdate(): void {
		void this.updateDeviceList();
	}

	async updateDeviceList(): Promise<void> {
		const deviceList: DeviceObject[] = [];
		for (let count = 1; count <= this.state.data.count; count++) {
			const devID: any = this.state.data[`device${count}`];
			const device: DeviceObject | undefined = await ShellyIDController.getDeviceByID(devID);
			if (device !== undefined) {
				deviceList.push(device);
			}
		}
		this.setState({ deviceList: deviceList }, () => {
			this.forceUpdate();
		});
	}

	componentDidMount(): void {
		super.componentDidMount();
	}

	// Do not delete this method. It is used by vis to read the widget configuration.
	// eslint-disable-next-line class-methods-use-this
	getWidgetInfo(): RxWidgetInfo {
		return ShellyCustomDeviceList.getWidgetInfo();
	}

	// This function is called every time when rxData is changed
	onRxDataChanged(): void {
		console.debug("onRxDataChanged");
		this.propertiesUpdate();
	}

	// This function is called every time when rxStyle is changed
	// eslint-disable-next-line class-methods-use-this
	onRxStyleChanged(): void {}

	// eslint-disable-next-line class-methods-use-this
	onStateUpdated(_id: string, _state: ioBroker.State | null | undefined): void {}

	renderWidgetBody(props: RxRenderWidgetProps): React.JSX.Element | React.JSX.Element[] | null {
		super.renderWidgetBody(props);
		return (
			<div>
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
			</div>
		);
	}
}

export default ShellyCustomDeviceList;
