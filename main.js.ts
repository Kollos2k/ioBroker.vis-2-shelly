"use strict";
const utils = require("@iobroker/adapter-core");

let adapter: any;
let typeEnum: { [key: string]: any };
let deviceList: { [key: string]: any } = {};
let typeConfig: { [key: string]: any };
function startAdapter(options: {} = {}) {
	adapter.log.info("TYPESCRIPT SHELLY");
	Object.assign(options, {
		name: "vis-2-shelly",
		ready: async function () {
			try {
				adapter.log.info("vis shelly start");
				//adapter.log.debug("start");
				await main();
			} catch (e) {
				adapter.log.error("exception catch after ready [" + e + "]");
			}
		},
		//#######################################
		//  is called when adapter shuts down
		unload: function (callback: any) {
			try {
				adapter && adapter.log && adapter.log.info && adapter.log.info("cleaned everything up...");
				callback();
			} catch (e) {
				callback();
			}
		},
		//#######################################
		//
		//SIGINT: function () {
		//    adapter && adapter.log && adapter.log.info && adapter.log.info("cleaned everything up...");
		//},
		//#######################################
		//  is called if a subscribed object changes
		//objectChange: function (id, obj) {
		//    adapter.log.debug("[OBJECT CHANGE] ==== " + id + " === " + JSON.stringify(obj));
		//},
		//#######################################
		// is called if a subscribed state changes
		//stateChange: function (id, state) {
		//adapter.log.debug("[STATE CHANGE] ==== " + id + " === " + JSON.stringify(state));
		//HandleStateChange(id, state);
		//}
	});
	adapter = new utils.Adapter(options);

	return adapter;
}

const axios = require("axios");

let killTimer;

async function main() {
	// force terminate
	let nParseTimeout = 60;
	if (adapter.config.parseTimeout > 0) {
		nParseTimeout = adapter.config.parseTimeout;
	}
	// adapter.log.debug("set timeout to " + nParseTimeout + " sec");
	nParseTimeout = nParseTimeout * 1000;
	killTimer = setTimeout(function () {
		//adapter.log.error("force terminate, objects still in list: " + tasks.length);
		adapter.log.error("force terminate");
		adapter.terminate ? adapter.terminate(15) : process.exit(15);
	}, nParseTimeout);

	typeConfig = {
		"SHDM-2": { name: "Shelly Dimmer 2", relayCount: 1 },
		shellyplus1pm: { name: "Shelly Plus 1pm", relayCount: 1 },
		shellyplus2pm: { name: "Shelly Plus 2pm", relayCount: 2 },
		"SHPLG-S": { name: "Shelly Plug S", relayCount: 1 },
		shellyplusplugs: { name: "Shelly Plus Plug S", relayCount: 1 },
		shellyplusht: { name: "Shelly Plus H&T", relayCount: 1 },
		"SHTRV-01": { name: "Shelly TRV", relayCount: 1 },
		"SHDW-2": { name: "Shelly Door Window 2", relayCount: 1 },
		"SHMOS-02": {
			name: "Shelly Motion 2",
			relayCount: 1,
			dataPoints: {
				sensor: {
					type: "channel",
					common: {
						name: "",
					},
					native: {},
				},
				"sensor.illumination_dark": {
					type: "state",
					common: {
						name: "dark",
						type: "number",
						unit: "lux",
						read: true,
						write: true,
						def: 50,
					},
					native: {},
				},
				"sensor.illumination_twilight": {
					type: "state",
					common: {
						name: "twilight",
						type: "number",
						unit: "lux",
						read: true,
						write: true,
						def: 500,
					},
					native: {},
				},
			},
		},
	};
	typeEnum = {};
	Object.entries(typeConfig).forEach(([k, v]) => {
		typeEnum[k] = v.name;
	});
	await createDeviceIDState();
	const devIdsState = adapter.getState("devices.ids");
	if (typeof devIdsState === "string") deviceList = JSON.parse(devIdsState);
	if (typeof deviceList !== "object") deviceList = {};
	if (typeof adapter.config["knownShellyIDs"] == "undefined") adapter.config["knownShellyIDs"] = {};
	await updateDeviceList();
	// adapter.subscribeForeignObjects("shelly.*");

	// updateRoomsList();
	adapter.setState("vis-2-shelly.0.info.connection", true, true);

	// adapter.log.info("vis shelly main6");
	// adapter.log.debug("exit, all done");

	if (killTimer) {
		clearTimeout(killTimer);
		// adapter.log.debug("timer killed");
	}
	adapter.terminate
		? adapter.terminate("All data handled, adapter stopped until next scheduled moment")
		: process.exit(0);
}

async function createDeviceIDState() {
	await adapter.setObjectNotExistsAsync("devices.ids", {
		type: "state",
		common: {
			name: {
				en: "Shelly DeviceList",
				de: "Shelly DeviceList",
				ru: "Shelly DeviceList",
				pt: "Dispositivo de ShellyList",
				nl: "Shelly DeviceList",
				fr: "Liste des périphériques Shelly",
				it: "Shelly DeviceList",
				es: "Shelly DeviceList",
				pl: "Shelly DeviceList",
				uk: "Shelly Пристрої",
				"zh-cn": "Shelly 设备列表",
			},
			type: "array",
			role: "list",
			read: true,
			write: true,
			def: "[]",
		},
		native: {},
	});
}

async function updateDeviceList() {
	const shellyDevices = await adapter.getForeignObjectsAsync("shelly.*.*", "device");
	const keysDevices = Object.keys(shellyDevices);
	let changeDeviceIds = false;
	adapter.config["knownShellyIDs"] = {};
	for (const deviceID of keysDevices) {
		// adapter.log.info(deviceID + " ");
		try {
			await updateDevice(deviceID);
		} catch (e) {
			adapter.log.error(`FEHLER in update Device ${deviceID}: ${JSON.stringify(e)}`);
		}
		// adapter.log.info(deviceID + " after");
	}
	await adapter.setStateAsync("devices.ids", {
		val: JSON.stringify(deviceList),
		ack: true,
	});
	// if (changeDeviceIds)
	// adapter.log.info(JSON.stringify(deviceList));
	// adapter.log.info(`Devices updated (Force:${forceUpdate ? "yes" : "no"})`);
}
async function updateDevice(deviceID: string) {
	let changeDeviceIds = false;
	const deviceName = name2id(deviceID.substring(deviceID.lastIndexOf(".") + 1, deviceID.length));
	// adapter.log.info(deviceName);

	adapter.setState("info.test", deviceName, true);

	const typeState = await adapter.getForeignStateAsync(deviceID + ".type");
	// adapter.log.info(JSON.stringify(typeState));
	const existDev = await adapter.getStateAsync(`devices.${deviceName}`);
	if (typeState == null || !typeState || !typeConfig[typeState.val]) {
		// adapter.log.info("EXIT: " + typeState.val);
		return;
	}
	// adapter.log.info(existDev ? "existiert " + JSON.stringify(existDev) : "existiert noch nicht");
	if (existDev ? false : true) {
		await adapter.setObjectNotExistsAsync(`devices.${deviceName}`, {
			type: "device",
			common: {
				name: deviceName,
			},
			native: {},
		});
		/** Create DEVICE TYPE */
		/** maybe extendObject */
		adapter.setObjectNotExists("devices." + deviceName + ".type", {
			type: "state",
			common: {
				name: {
					en: "Device type",
					de: "Gerätetyp",
					ru: "Тип устройства",
					pt: "Tipo de dispositivo",
					nl: "Apparaattype",
					fr: "Type de périphérique",
					it: "Tipo di dispositivo",
					es: "Tipo de dispositivo",
					pl: "Typ urządzenia",
					uk: "Тип пристрою",
					"zh-cn": "设备类型",
				},
				type: "object",
				role: "text",
				read: true,
				write: true,
				states: typeEnum,
				def: typeof typeState === "object" && typeState !== null ? typeState.val : "",
			},
			native: {},
		});
	}
	adapter.extendObject("devices." + deviceName + ".type", {
		common: { states: typeEnum },
	});

	/** GET RELAY COUNT example: plus2pm with more than 1 relay */
	let relayCount = typeState != null && typeof typeConfig[typeState.val] ? typeConfig[typeState.val].relayCount : 1;

	/** CREATE vis-shelly DEVICE FROM shelly OBJECTS*/
	for (let relay = 0; relay < relayCount; relay++) {
		if (!(await adapter.getStateAsync(`devices.${deviceName}.${relay}`))) {
			await adapter.setObjectNotExistsAsync(`devices.${deviceName}.${relay}`, {
				type: "device",
				common: {
					name: {
						en: "Device Relay",
						de: "Gerät Relais",
						ru: "Устройство Relay",
						pt: "Dispositivo Reposição",
						nl: "Apparaat Relais",
						fr: "Appareil Relais",
						it: "Dispositivo Relè",
						es: "Dispositivo Relay",
						pl: "Urządzenie Przekaz",
						uk: "Пристрої Реле",
						"zh-cn": "设备中继",
					},
				},
				native: {},
			});
		}
		if (!(await adapter.getStateAsync(`devices.${deviceName}.${relay}.name`))) {
			/** Set Name */
			await adapter.setObjectNotExistsAsync(`devices.${deviceName}.${relay}.name`, {
				type: "state",
				common: {
					name: {
						en: "Device name",
						de: "Name des Geräts",
						ru: "Название устройства",
						pt: "Nome do dispositivo",
						nl: "Apparaatnaam",
						fr: "Nom du périphérique",
						it: "Nome del dispositivo",
						es: "Nombre del dispositivo",
						pl: "Nazwa urządzenia",
						uk: "Назва пристрою",
						"zh-cn": "设备名称",
					},
					type: "string",
					role: "text",
					read: true,
					write: true,
					def: null,
				},
				native: {},
			});
			/* Update default Name */
			await adapter.getStateAsync(`devices.${deviceName}.${relay}.name`, (err: any, state: ioBroker.State) => {
				if (state == null) {
					adapter.getForeignState(deviceID + ".name", (err: any, state: ioBroker.State) => {
						let newName = "";
						if (state == null || state.val == null || state.val == "") newName = deviceName;
						else newName = state.val.toString();
						if (relayCount > 1) newName += `-${relay}`;
						adapter.setState(`devices.${deviceName}.${relay}.name`, { val: newName, ack: true });
					});
				}
			});
		}
		if (!(await adapter.getStateAsync(`devices.${deviceName}.${relay}.room`))) {
			/** Set Name */
			await adapter.setObjectNotExistsAsync(`devices.${deviceName}.${relay}.room`, {
				type: "state",
				common: {
					name: {
						en: "Device room",
						de: "Raum des Geräts",
					},
					type: "string",
					role: "text",
					read: true,
					write: true,
					def: null,
				},
				native: {},
			});
		}
		if (typeof typeConfig[typeState.val].dataPoints === "object") {
			Object.entries(typeConfig[typeState.val].dataPoints).forEach(([k, v]) => {
				adapter.setObjectNotExistsAsync(`devices.${deviceName}.${relay}.${k}`, v, () => {});
			});
		}

		const roomStateID = `devices.${deviceName}.${relay}.room`;
		const nameStateID = `devices.${deviceName}.${relay}.name`;
		const devRoom = await adapter.getStateAsync(roomStateID);
		const devName = await adapter.getStateAsync(nameStateID);
		deviceList[`${deviceID}${relay.toString()}`] = {
			stateId: deviceID,
			id: deviceName,
			type: typeState.val,
			relay: relay,
			instance: adapter.instance,
			room: devRoom == null ? null : devRoom.val,
			name: devName == null ? null : devName.val,
		};
	}
	adapter.config["knownShellyIDs"][deviceID] = true;
}

function updateRoomsList() {
	const roomEnum: { [key: string]: any } = {};
	for (const roomKey of Object.keys(adapter.config["rooms"])) {
		const curRoom = adapter.config["rooms"][roomKey];
		roomEnum[curRoom.id] = curRoom.name;
	}
	const shellyDevices = adapter.getObjectView("system", "device", {
		startkey: `vis-2-shelly.${adapter.instance}.devices.`,
		endkey: `vis-2-shelly.${adapter.instance}.devices.\u9999`,
	});
	for (const devKey of Object.keys(shellyDevices.rows)) {
		const dev = shellyDevices.rows[devKey];

		const devName = [...dev.id.matchAll(/[.]([^.]*[.][0-9]*)$/g)];
		// adapter.log.info(JSON.stringify(devName))
		if (devName.length == 0) continue;
		// String(dev.id).substring(String(dev.id).lastIndexOf(".")+1);
		// @ts-ignore
		adapter.setObjectAsync("devices." + devName[0][1] + ".room", {
			type: "state",
			common: {
				name: {
					en: "room",
					de: "zimmer",
					ru: "комната",
					pt: "quarto",
					nl: "kamer",
					fr: "chambre",
					it: "camera",
					es: "habitación",
					pl: "pokój",
					uk: "кімната",
					"zh-cn": "房间",
				},
				type: "object",
				role: "text",
				read: true,
				write: true,
				states: roomEnum,
			},
			native: {},
		});
	}

	adapter.setObjectAsync("devices.roomIds", {
		type: "state",
		common: {
			name: {
				en: "room",
				de: "zimmer",
				ru: "комната",
				pt: "quarto",
				nl: "kamer",
				fr: "chambre",
				it: "camera",
				es: "habitación",
				pl: "pokój",
				uk: "кімната",
				"zh-cn": "房间",
			},
			type: "array",
			role: "list",
			read: true,
			write: false,
		},
		native: {},
	});
	adapter.setStateAsync("devices.roomIds", { val: JSON.stringify(roomEnum), ack: true });
}
function name2id(pName: string) {
	return (pName || "").replace(adapter.FORBIDDEN_CHARS, "_");
}

// If started as allInOne/compact mode => return function to create instance
if (module && module["parent"]) {
	module.exports = startAdapter;
} else {
	// or start the instance directly
	startAdapter();
}
// startAdapter();
