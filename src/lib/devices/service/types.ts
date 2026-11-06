export interface TypeConfigViewInfo {
	[key: string]: any;
}
export interface TypeConfigViewAction {
	[key: string]: any;
}
export interface TypeConfigView {
	info: TypeConfigViewInfo;
	action: TypeConfigViewAction;
	[key: string]: TypeConfigViewInfo | TypeConfigViewAction;
}
export interface TypeConfigDataPoint {
	[key: string]: any;
}

export interface TypeDevice {
	name: string;
	adapterKey: string;
	relayCount: number;
	states?: { channel: string; state: TypeDeviceState }[];
	objects?: { [key: string]: any };
}
interface TypeDeviceStateAction {
	x: string;
	y: string;
	w: string;
	h: string;
	dataPoint?: string;
	click: any;
	minValue?: number;
	maxValue?: number;
	step?: number;
	onClick?: { [key: string]: string | boolean };
}
export interface TypeDeviceState {
	deviceID: string;
	key: string;
	name: string;
	update?: { unit?: string; viewPoint?: string; updateValue?: any; updateAck?: any };
	view: {
		point: "info" | "action";
		class?: string;
		style?: { [key: string]: string };
		html?: React.JSX.Element | string;
	};
	action?: TypeDeviceStateAction | { [key: string]: TypeDeviceStateAction };
	dataPoint?: string;
}

export interface TypeConfig {
	dataPoint?: { [key: string]: any } | undefined;
	update?: { [key: string]: any };
	view?: TypeConfigView | undefined;
	action?: { [key: string]: any };
	dialog?: { [key: string]: any };
	domID?: string;
}

export interface DeviceObject {
	instance: number;
	id: string;
	typeConfig: TypeConfig | undefined;
	stateId: string;
	type: string;
	domID?: string;
	vsID?: string;
	relay: number;
}
