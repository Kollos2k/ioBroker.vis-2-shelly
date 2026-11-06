import type { TypeDeviceState } from "./types";

export interface DeviceDefinition {
	name: string;
	adapterKey: string;
	relayCount: number;
	states?: { channel: string; state: TypeDeviceState }[];
}

export function createDeviceConfigs(states: typeof import("./deviceStatesCore")): Record<string, DeviceDefinition> {
	return {
		"SHDM-2": {
			name: "Shelly Dimmer 2",
			adapterKey: "SHDM-2",
			relayCount: 1,
			// Falls spezifische States nötig sind, hier ergänzen
		},
		shellyplus1pm: {
			name: "Shelly Plus 1pm",
			adapterKey: "shellyplus1pm",
			relayCount: 1,
			states: [
				{ channel: "DevicePower{X}", state: states.power },
				{ channel: "DevicePower{X}", state: states.voltage },
				{ channel: "DevicePower{X}", state: states.switchButton },
			],
		},
		shellyplus2pm: {
			name: "Shelly Plus 2pm",
			adapterKey: "shellyplus2pm",
			relayCount: 2,
			states: [
				{ channel: "Relay{X}", state: states.power },
				{ channel: "Relay{X}", state: states.voltage },
				{ channel: "Relay{X}", state: states.switchButton },
			],
		},
		shellyplusht: {
			name: "Shelly Plus H&T",
			adapterKey: "shellyplusht",
			relayCount: 1,
			states: [
				{ channel: "Humidity{X}", state: states.humidity },
				{ channel: "DevicePower{X}", state: states.batteryPercent },
				{ channel: "DevicePower{X}", state: states.externalPower },
				{ channel: "Temperature{X}", state: states.temperature },
			],
		},
		shellyplusplugs: {
			name: "Shelly Plus Plug S",
			adapterKey: "shellyplusplugs",
			relayCount: 1,
			states: [
				{ channel: "Relay{X}", state: states.power },
				{ channel: "Relay{X}", state: states.voltage },
				{ channel: "Relay{X}", state: states.switchButton },
			],
		},
		shellyplusprgbwpm: {
			name: "Shelly Plus RGBW PM",
			adapterKey: "shellyplusprgbwpm",
			relayCount: 1,
			states: [
				{ channel: "Light{X}", state: states.power },
				{ channel: "Light{X}", state: { ...states.brightness, dataPoint: "Brightness" } },
				{ channel: "Light{X}", state: states.voltage },
				{ channel: "Light{X}", state: states.switchButton },
			],
		},
		shplugs: {
			name: "Shelly Plug S",
			adapterKey: "SHPLG-S",
			relayCount: 1,
			states: [
				{ channel: "Light{X}", state: states.power },
				{ channel: "Light{X}", state: { ...states.brightness, dataPoint: "Brightness" } },
				{ channel: "Light{X}", state: states.voltage },
				{ channel: "Light{X}", state: states.switchButton },
			],
		},
	};
}
