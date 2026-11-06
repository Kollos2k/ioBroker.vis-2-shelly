import React from "react";

import Device from "./components/Device";
import type { DeviceObject } from "@mainLib/devices/service/types";
import Generic from "./Generic";
import type { RxRenderWidgetProps, RxWidgetInfo, VisRxWidgetProps, VisRxWidgetState } from "@iobroker/types-vis-2";
import ShellyIDController from "./components/ShellyIDController";

interface StaticRxData {
	display: "block" | "flex";
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
		this.state = { ...this.state, deviceList: [], showDeviceDialog: false };
		ShellyIDController.registerCallback(this.props.context.socket, () => {
			void this.updateDeviceList();
		});
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
					name: "common",
					fields: [
						{
							name: "display",
							label: "vis_2_widgets_shelly_display",
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
			],
			visPrev: "widgets/vis-2-shelly/img/editor/allDevices.png",
		};
	}

	async updateDeviceList(): Promise<void> {
		const allDevices: { [key: string]: DeviceObject } = await ShellyIDController.getAllDevices();
		console.log("allDevices");
		console.log(allDevices);
		const deviceList: DeviceObject[] = Object.values(allDevices);

		console.log("deviceList");
		console.log(deviceList);
		this.setState({ deviceList: deviceList });
	}

	propertiesUpdate(): void {
		// Platzhalter für zukünftige Eigenschafts-Updates
	}

	componentDidMount(): void {
		super.componentDidMount();
		void this.updateDeviceList();
	}

	static getI18nPrefix(): string {
		return "vis_2_widgets_shelly_";
	}

	getWidgetInfo(): RxWidgetInfo {
		return ShellyAllDevices.getWidgetInfo();
	}

	onRxDataChanged(): void {
		this.propertiesUpdate();
	}

	onRxStyleChanged(): void {}

	onStateUpdated(_id: string, _state: ioBroker.State | null | undefined): void {}

	renderWidgetBody(props: RxRenderWidgetProps): React.JSX.Element | React.JSX.Element[] | null {
		super.renderWidgetBody(props);
		const displayMode = this.state.data?.display || "block";

		return (
			<div style={{ width: "100%", height: "100%", display: displayMode }}>
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

export default ShellyAllDevices;
