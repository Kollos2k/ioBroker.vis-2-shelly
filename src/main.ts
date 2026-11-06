"use strict";

import * as utils from "@iobroker/adapter-core";
import { DEVICE_CONFIGS } from "./lib/devices/devicesConfig";

class Vis2Shelly extends utils.Adapter {
	private typeEnum: { [key: string]: string };
	private deviceList: { [key: string]: any } = {};
	private typeConfig: { [key: string]: any };
	private vsConfig: { [key: string]: any } = { knownShellyIDs: {}, parseTimeout: 0 };
	private killTimer: NodeJS.Timeout | null = null;

	public constructor(options: Partial<utils.AdapterOptions> = {}) {
		super({
			...options,
			name: "vis-2-shelly",
		});
		this.typeEnum = {};
		this.typeConfig = {};

		this.on("ready", this.onReady.bind(this));
		this.on("unload", this.onUnload.bind(this));
	}

	private async onReady(): Promise<void> {
		try {
			console.log("VIS-2-SHELLY: onReady aufgerufen");
			if (this.log && typeof this.log.info === "function") {
				this.log.info("vis 2 shelly start - robust mode");
			}

			await this.main();
		} catch (e) {
			console.error("VIS-2-SHELLY CRITICAL ONREADY EXCEPTION:", e);
			if (this.log && typeof this.log.error === "function") {
				this.log.error("CRITICAL EXCEPTION in onReady: " + e);
			}
		}
	}
	private onUnload(callback: () => void): void {
		try {
			this.log.info("cleaned everything up...");
			callback();
		} catch (e) {
			callback();
		}
	}
	private async main(): Promise<void> {
		console.log("VIS-2-SHELLY: main() gestartet");
		try {
			if (this.log) {
				this.log.info("main() gestartet");
			}

			// Testweise DEVICE_CONFIGS prüfen
			console.log("VIS-2-SHELLY: Prüfe DEVICE_CONFIGS...");
			if (!DEVICE_CONFIGS) {
				console.error("VIS-2-SHELLY ERROR: DEVICE_CONFIGS ist null oder undefined!");
			} else {
				console.log(
					"VIS-2-SHELLY: DEVICE_CONFIGS erfolgreich geladen, Anzahl Einträge:",
					Object.keys(DEVICE_CONFIGS).length,
				);
			}

			Object.values(DEVICE_CONFIGS).forEach((dev: any, index) => {
				try {
					if (dev && dev.name) {
						const key = dev.adapterKey || dev.name;
						this.typeConfig[key] = dev;
						this.typeEnum[key] = dev.name;
					}
				} catch (err) {
					console.error(`VIS-2-SHELLY ERROR bei Device-Config Index ${index}:`, err);
				}
			});

			console.log("VIS-2-SHELLY: Erstelle Ordner und states...");
			await this.createDeviceIDState();

			console.log("VIS-2-SHELLY: Starte updateDeviceList()...");
			await this.updateDeviceList();

			console.log("VIS-2-SHELLY: main() erfolgreich durchgelaufen.");
			if (this.terminate) {
				this.terminate("All data handled, adapter stopped until next scheduled moment");
			} else {
				process.exit(0);
			}
		} catch (e) {
			console.error("VIS-2-SHELLY MAIN EXCEPTION:", e);
			if (this.log) {
				this.log.error("main() Fehler aufgetreten: " + e);
			}
		}
	}

	private async mainOLD(): Promise<void> {
		this.log.info("main() gestartet");
		try {
			let nParseTimeout = 60;
			if (this.vsConfig.parseTimeout > 0) {
				nParseTimeout = this.vsConfig.parseTimeout;
			}
			nParseTimeout = nParseTimeout * 1000;
			this.killTimer = setTimeout(() => {
				this.log.error("force terminate wegen Timeout");
				this.terminate("All done", 0);
			}, nParseTimeout);

			this.log.info("Lese DEVICE_CONFIGS ein...");
			if (!DEVICE_CONFIGS || typeof DEVICE_CONFIGS !== "object") {
				this.log.error("DEVICE_CONFIGS ist undefiniert oder kein Objekt!");
			} else {
				Object.values(DEVICE_CONFIGS).forEach((dev: any, index) => {
					if (dev && dev.name) {
						const key = dev.adapterKey || dev.name;
						this.typeConfig[key] = dev;
						this.typeEnum[key] = dev.name;
						this.log.debug(`Device-Config geladen [${index}]: ${dev.name} (Key: ${key})`);
					}
				});
			}

			this.log.info("Erstelle devices.ids State...");
			await this.createDeviceIDState();

			this.log.info("Lese vorhandene devices.ids...");
			const devicesIDsState = await this.getStateAsync("devices.ids");
			const devIdsState = devicesIDsState?.val;
			if (typeof devIdsState === "string") {
				try {
					this.deviceList = JSON.parse(devIdsState);
				} catch (parseErr) {
					this.log.warn("Konnte devices.ids JSON nicht parsen, starte mit leerer Liste: " + parseErr);
					this.deviceList = {};
				}
			}
			if (typeof this.deviceList !== "object" || this.deviceList === null) {
				this.deviceList = {};
			}
			if (typeof this.vsConfig["knownShellyIDs"] === "undefined") {
				this.vsConfig["knownShellyIDs"] = {};
			}

			this.log.info("Starte updateDeviceList()...");
			await this.updateDeviceList();

			try {
				await this.setStateAsync("info.connection", true, true);
			} catch (e) {
				// ignore
			}

			if (this.killTimer) {
				clearTimeout(this.killTimer);
			}

			this.log.info("main() erfolgreich abgeschlossen. Beende Instanz programmgerecht...");
			if (this.terminate) {
				this.terminate("All data handled, adapter stopped until next scheduled moment");
			} else {
				process.exit(0);
			}
		} catch (e) {
			this.log.error("main() Fehler aufgetreten: " + e);
		}
	}

	private async createDeviceIDState(): Promise<void> {
		try {
			// Erst den übergeordneten Ordner/Kanal anlegen, falls er nicht existiert
			await this.setObjectNotExistsAsync("devices", {
				type: "folder",
				common: {
					name: "Devices Folder",
				},
				native: {},
			});

			await this.setObjectNotExistsAsync("devices.ids", {
				type: "state",
				common: {
					name: "Shelly DeviceList",
					type: "array",
					role: "list",
					read: true,
					write: true,
					def: "[]",
				},
				native: {},
			});
		} catch (e) {
			this.log.error("Fehler in createDeviceIDState: " + e);
		}
	}

	private async updateDeviceList(): Promise<void> {
		this.log.info("Suche nach Fremdobjekten (shelly.*.*)...");
		let shellyDevices: Record<string, ioBroker.Object> = {};
		try {
			shellyDevices = await this.getForeignObjectsAsync("shelly.*.*", "device");
		} catch (e) {
			this.log.error("Fehler beim Abrufen von getForeignObjectsAsync: " + e);
			return;
		}

		const keysDevices = Object.keys(shellyDevices);
		this.log.info(`Gefundene Shelly-Devices: ${keysDevices.length}`);
		let changeDeviceIds = false;
		this.vsConfig["knownShellyIDs"] = {};

		for (const deviceID of keysDevices) {
			try {
				this.log.debug(`Verarbeite Gerät: ${deviceID}`);
				if (await this.updateDevice(deviceID)) {
					changeDeviceIds = true;
				}
			} catch (e) {
				this.log.error(`FEHLER in updateDevice für ${deviceID}: ${e}`);
			}
		}

		if (changeDeviceIds) {
			this.log.info("Änderungen in der Device-Liste gefunden, schreibe devices.ids...");
			await this.setStateAsync("devices.ids", {
				val: JSON.stringify(this.deviceList),
				ack: true,
			});
		}
	}

	private async updateDevice(deviceID: string): Promise<boolean> {
		let changeDeviceIds = false;
		const deviceName = this.name2id(deviceID.substring(deviceID.lastIndexOf(".") + 1));

		try {
			await this.setStateAsync("info.test", deviceName, true);
		} catch {
			// Ignorieren falls info.test fehlt
		}

		const typeState = await this.getForeignStateAsync(deviceID + ".type");

		// WICHTIG:getObjectAsync statt getStateAsync, da es ein Objekt (kein State) ist!
		const existDev = await this.getObjectAsync(`devices.${deviceName}`);

		if (typeState == null || !typeState || (typeof typeState.val === "string" && !this.typeConfig[typeState.val])) {
			this.log.debug(`Gerät ${deviceID} hat keinen gültigen Typ oder Typ ist unbekannt.`);
			return false;
		}

		if (!existDev) {
			await this.setObjectNotExistsAsync(`devices.${deviceName}`, {
				type: "device",
				common: {
					name: deviceName,
				},
				native: {},
			});

			await this.setObjectNotExistsAsync(`devices.${deviceName}.type`, {
				type: "state",
				common: {
					name: "Device type",
					type: "object",
					role: "text",
					read: true,
					write: true,
					states: this.typeEnum,
					def: typeof typeState === "object" && typeState !== null ? typeState.val : "",
				},
				native: {},
			});
		}

		await this.extendObjectAsync(`devices.${deviceName}.type`, {
			common: { states: this.typeEnum },
		});

		const relayCount =
			typeState != null && typeof typeState.val === "string" && this.typeConfig[typeState.val]
				? this.typeConfig[typeState.val].relayCount
				: 1;

		for (let relay = 0; relay < relayCount; relay++) {
			// Auch hier: getObjectAsync für das Relais-Objekt
			const existRelay = await this.getObjectAsync(`devices.${deviceName}.${relay}`);
			if (!existRelay) {
				await this.setObjectNotExistsAsync(`devices.${deviceName}.${relay}`, {
					type: "device",
					common: {
						name: "Device Relay",
					},
					native: {},
				});
			}

			const nameStateId = `devices.${deviceName}.${relay}.name`;
			if (!(await this.getStateAsync(nameStateId))) {
				await this.setObjectNotExistsAsync(nameStateId, {
					type: "state",
					common: {
						name: "Device name",
						type: "string",
						role: "text",
						read: true,
						write: true,
						def: null,
					},
					native: {},
				});

				const nameState = await this.getStateAsync(nameStateId);
				if (nameState == null || nameState.val == null || nameState.val === "") {
					const foreignState = await this.getForeignStateAsync(deviceID + ".name");
					let newName = "";
					if (foreignState == null || foreignState.val == null || foreignState.val === "") {
						newName = deviceName;
					} else {
						newName = foreignState.val.toString();
					}
					if (relayCount > 1) {
						newName += `-${relay}`;
					}
					await this.setStateAsync(nameStateId, { val: newName, ack: true });
				}
			}

			const roomStateId = `devices.${deviceName}.${relay}.room`;
			if (!(await this.getStateAsync(roomStateId))) {
				await this.setObjectNotExistsAsync(roomStateId, {
					type: "state",
					common: {
						name: "Device room",
						type: "string",
						role: "text",
						read: true,
						write: true,
						def: null,
					},
					native: {},
				});
			}

			if (typeof typeState.val === "string" && typeof this.typeConfig[typeState.val].dataPoints === "object") {
				const dataPoints = this.typeConfig[typeState.val].dataPoints as Record<string, ioBroker.StateObject>;
				for (const [k, v] of Object.entries(dataPoints)) {
					if (v != null) {
						await this.setObjectNotExistsAsync(`devices.${deviceName}.${relay}.${k}`, v);
					}
				}
			}

			const devRoom = await this.getStateAsync(roomStateId);
			const devName = await this.getStateAsync(nameStateId);
			const deviceListKey = deviceID + relay;
			const deviceListObj = this.deviceList[deviceListKey];

			if (
				!deviceListObj ||
				deviceListObj.stateId !== deviceID ||
				deviceListObj.id !== deviceName ||
				deviceListObj.type !== typeState.val ||
				deviceListObj.relay !== relay ||
				deviceListObj.instance !== this.instance
			) {
				this.deviceList[deviceListKey] = {
					stateId: deviceID,
					id: deviceName,
					type: typeState.val,
					relay: relay,
					instance: this.instance,
					room: devRoom == null ? null : devRoom.val,
					name: devName == null ? null : devName.val,
				};
				changeDeviceIds = true;
			}
		}
		this.vsConfig["knownShellyIDs"][deviceID] = true;
		return changeDeviceIds;
	}

	private name2id(pName: string | undefined): string {
		return (pName || "").replace(this.FORBIDDEN_CHARS, "_");
	}
}

// Export adapter module
if (module.parent) {
	module.exports = (options: Partial<utils.AdapterOptions>) => new Vis2Shelly(options);
} else {
	(() => new Vis2Shelly({}))();
}
