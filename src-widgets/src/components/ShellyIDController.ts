import type { DeviceObject } from "./DeviceConfig";
import getDeviceConfigByType, { isDeviceObject } from "./DeviceConfig";
export type SubscribeCallback = () => void;

export default class ShellyIDController {
	private static isSubscribed = false;
	private static deviceID_JSON = "";
	private static devicesAll: { [key: string]: DeviceObject } = {};
	private static SubscribeCallbackHandlers: SubscribeCallback[] = [];
	private static socket: any;
	static registerCallback = (socket: any, callback: SubscribeCallback): void => {
		ShellyIDController.socket = socket;
		ShellyIDController.SubscribeCallbackHandlers.push(callback);
		if (!ShellyIDController.isSubscribed) {
			ShellyIDController.isSubscribed = true;
			socket.subscribeState(["vis-2-shelly.0.devices.ids"], (id: string, state: any) => {
				if (state !== null && typeof state.val === "string") {
					if (ShellyIDController.deviceID_JSON.localeCompare(state.val) != 0) {
						ShellyIDController.deviceID_JSON = state.val;
						Object.entries(JSON.parse(state.val)).forEach(([id, dev]) => {
							if (typeof ShellyIDController.devicesAll[id] === "undefined" && isDeviceObject(dev)) {
								ShellyIDController.devicesAll[id] = dev;
							}
						});

						ShellyIDController.SubscribeCallbackHandlers.forEach((cb) => cb());
					}
				}
			});
		} else {
			callback();
		}
	};
	static async getAllDevices(): Promise<{ [key: string]: DeviceObject }> {
		for (const device of Object.values(ShellyIDController.devicesAll)) {
			if (device.typeConfig === undefined) {
				device.vsID = `vis-2-shelly.${device.instance}.devices.${device.id}`;
				device.domID = device.id.replaceAll("#", "");
				device.typeConfig = await getDeviceConfigByType(device, ShellyIDController.socket);
			}
		}
		return ShellyIDController.devicesAll;
	}
	static getDeviceIDList(): { [key: string]: DeviceObject } {
		return ShellyIDController.devicesAll;
	}
	static existsID = (deviceId: any): boolean => {
		if (typeof deviceId === "string" && typeof ShellyIDController.devicesAll[deviceId] !== "undefined") {
			return true;
		}
		return false;
	};
	static async getDeviceByID(deviceId: any): Promise<DeviceObject | undefined> {
		if (ShellyIDController.existsID(deviceId)) {
			const device = ShellyIDController.devicesAll[deviceId];
			if (device.typeConfig === undefined) {
				device.vsID = `vis-2-shelly.${device.instance}.devices.${device.id}`;
				device.domID = device.id.replaceAll("#", "");
				device.typeConfig = await getDeviceConfigByType(device, ShellyIDController.socket);
			}
			return device;
		}
		return undefined;
	}
}
