import React from "react";

import Device from "./components/Device";
import type { DeviceObject } from "@mainLib/devices/service/types";
import Generic from "./Generic";
import type { RxRenderWidgetProps, RxWidgetInfo, VisRxWidgetProps, VisRxWidgetState } from "@iobroker/types-vis-2";
import ShellyIDController from "./components/ShellyIDController";

interface StaticRxData {
	display: "block" | "flex";
	count: number;
	[key: `device${number}`]: string;
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
			visSetLabel: "vis_2_widgets_shelly",
			visSetColor: "#cf00ff",
			visName: "CustomDeviceList",
			visAttrs: [
				{
					name: "common",
					fields: [
						{
							name: "display",
							label: "display",
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
							onChange: (field, data, changeData): Promise<void> => {
								changeData(data);
								return Promise.resolve();
							},
						},
					],
				},
				{
					name: "devices",
					label: "group_devices",
					indexFrom: 1,
					indexTo: "count",
					fields: [
						{
							name: "device",
							label: "device",
							type: "custom",
							component: (field, data, setData): React.JSX.Element => {
								const deviceList: Record<string, any> = ShellyIDController.getDeviceIDList();
								const fieldName = field.name || "device";
								return (
									<select
										name="ShellyDeviceList_DeviceSelect"
										style={{ width: "100%" }}
										value={data[fieldName] || ""}
										onChange={(e) => {
											setData({ [fieldName]: e.target.value });
										}}
									>
										<option value="">-- Select device --</option>
										{Object.entries(deviceList).map(([key, val]) => {
											return (
												<option value={key} key={key}>
													{val.name !== null && val.name && val.name.length > 0
														? val.name
														: val.id}
												</option>
											);
										})}
									</select>
								);
							},
						},
					],
				},
			],
			visPrev: "widgets/vis-2-shelly/img/editor/allDevices.png",
		};
	}

	getDeviceList(): DeviceObject[] {
		return this.state.deviceList;
	}

	propertiesUpdate(): void {
		void this.updateDeviceList();
	}

	async updateDeviceList(): Promise<void> {
		const deviceList: DeviceObject[] = [];
		for (let count = 1; count <= (this.state.data.count || 1); count++) {
			const devID: any = this.state.data[`device${count}`];
			if (devID) {
				const device: DeviceObject | undefined = await ShellyIDController.getDeviceByID(devID);
				if (device !== undefined) {
					deviceList.push(device);
				}
			}
		}
		this.setState({ deviceList });
	}

	componentDidMount(): void {
		super.componentDidMount();
	}

	getWidgetInfo(): RxWidgetInfo {
		return ShellyCustomDeviceList.getWidgetInfo();
	}

	onRxDataChanged(): void {
		console.debug("onRxDataChanged");
		this.propertiesUpdate();
	}

	onRxStyleChanged(): void {}

	onStateUpdated(_id: string, _state: ioBroker.State | null | undefined): void {}

	renderWidgetBody(props: RxRenderWidgetProps): React.JSX.Element | React.JSX.Element[] | null {
		super.renderWidgetBody(props);
		return (
			<div style={{ display: this.state.data.display || "block" }}>
				{this.state.deviceList.map((device: DeviceObject) => {
					const typeConfig = device.typeConfig;
					if (
						typeConfig &&
						typeConfig.dataPoint &&
						typeConfig.domID &&
						typeConfig.dataPoint[device.relay] !== undefined
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
								key={`${this.props.id}_${device.id}_${device.relay}`}
							/>
						);
					}
					return null;
				})}
			</div>
		);
	}
}

export default ShellyCustomDeviceList;
