"use strict";
<<<<<<< HEAD

/*
 * Created with @iobroker/create-adapter v2.6.2
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require("@iobroker/adapter-core");

// Load your modules here, e.g.:
// const fs = require("fs");

class Vis2Shelly extends utils.Adapter {
	/**
	 * @param {Partial<utils.AdapterOptions>} [options={}]
	 */
	constructor(options) {
		super({
			...options,
			name: "vis-2-shelly",
		});
		this.isUnloaded = false;
		this.on("ready", this.onReady.bind(this));
		this.on("objectChange", this.onObjectChange.bind(this));
		this.on("stateChange", this.onStateChange.bind(this));
		// this.on("message", this.onMessage.bind(this));
		this.on("unload", this.onUnload.bind(this));
		this.setState("info.connection", false, true);
		this.typeConfig = {
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
		this.typeEnum = {};
		Object.entries(this.typeConfig).forEach(([k, v]) => {
			this.typeEnum[k] = v.name;
		});
		this.devJSON = {};
		this.subcribedRooms = {};
		this.subcribedNames = {};
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	async onReady() {
		const devIdsState = await this.getStateAsync("devices.ids");
		if (typeof devIdsState === "string") this.devJSON = JSON.parse(devIdsState);
		if (typeof this.devJSON !== "object") this.devJSON = {};
		if (typeof this.config["knownShellyIDs"] == "undefined") this.config["knownShellyIDs"] = {};
		await this.subscribeForeignObjectsAsync("shelly.*");

		this.updateDeviceList(true);
		this.updateRoomsList();
		this.setState("info.connection", true, true);
	}

	async updateDeviceList(forceUpdate = false) {
		const shellyDevices = await this.getForeignObjectsAsync("shelly.*", "device");
		const keysDevices = Object.keys(shellyDevices);
		let changeDeviceIds = false;

		await this.setObjectNotExistsAsync(this.name2id("devices.ids"), {
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
		if (forceUpdate) {
			this.config["knownShellyIDs"] = {};
		}
		for (const deviceID of keysDevices) {
			if (await this.updateDevice(deviceID, forceUpdate)) changeDeviceIds = true;
		}
		if (changeDeviceIds)
			await this.setStateAsync(this.name2id("devices.ids"), { val: JSON.stringify(this.devJSON), ack: true });
		this.log.info(`Devices updated (Force:${forceUpdate ? "yes" : "no"})`);
	}
	async updateDevice(deviceID, forceUpdate) {
		let changeDeviceIds = false;
		const deviceName = this.name2id(deviceID.substring(deviceID.lastIndexOf(".") + 1, deviceID.length));

		const existDev = await this.getStatesAsync(`devices.${deviceName}`);
		if (typeof existDev === "undefined" || forceUpdate) {
			await this.setObjectNotExistsAsync("devices." + deviceName, {
				type: "device",
				common: {
					name: deviceName,
				},
				native: {},
			});
			/** Create DEVICE TYPE */
			const typeState = await this.getForeignStateAsync(deviceID + ".type");
			/** maybe extendObject */
			await this.setObjectNotExistsAsync("devices." + deviceName + ".type", {
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
					states: this.typeEnum,
					def: typeof typeState === "object" && typeState !== null ? typeState.val : "",
				},
				native: {},
			});
			this.extendObject("devices." + deviceName + ".type", {
				common: { states: this.typeEnum },
			});

			/** GET RELAY COUNT example: plus2pm with more than 1 relay */
			let relayCount = 1;

			if (typeState != null && typeof this.typeConfig[typeState.val] !== "undefined") {
				for (let relay = 0; relay < this.typeConfig[typeState.val].relayCount; relay++) {
					const roomStateID = `devices.${deviceName}.${relay}.room`;
					const nameStateID = `devices.${deviceName}.${relay}.name`;
					const devRoom = await this.getStateAsync(roomStateID);
					const devName = await this.getStateAsync(nameStateID);
					this.devJSON[deviceID + relay] = {
						stateId: deviceID,
						id: deviceName,
						type: typeState.val,
						relay: relay,
						instance: this.instance,
						room: devRoom == null ? null : devRoom.val,
						name: devName == null ? null : devName.val,
					};
					if (typeof this.subcribedNames[`vis-2-shelly.${this.instance}.${nameStateID}`] === "undefined") {
						this.subscribeStates(nameStateID, () => {});
						this.subcribedNames[`vis-2-shelly.${this.instance}.${nameStateID}`] = {
							devID: `${deviceID}${relay}`,
							subscribeID: nameStateID,
						};
					}
					if (typeof this.subcribedRooms[`vis-2-shelly.${this.instance}.${roomStateID}`] === "undefined") {
						this.subscribeStates(roomStateID, () => {});
						this.subcribedRooms[`vis-2-shelly.${this.instance}.${roomStateID}`] = {
							devID: `${deviceID}${relay}`,
							subscribeID: roomStateID,
						};
					}
				}
				this.config["knownShellyIDs"][deviceID] = true;
				changeDeviceIds = true;
				relayCount = this.typeConfig[typeState.val].relayCount;

				/** CREATE vis-shelly DEVICE FROM shelly OBJECTS*/
				for (let i = 0; i < relayCount; i++) {
					await this.setObjectNotExistsAsync("devices." + deviceName + "." + i, {
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
					/** Set Name */
					this.setObjectNotExists(
						"devices." + deviceName + "." + i + ".name",
						{
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
						},
						() => {
							/* Update default Name */
							this.getState(`devices.${deviceName}.${i}.name`, (err, state) => {
								if (state == null) {
									this.getForeignState(deviceID + ".name", (err, state) => {
										let newName = "";
										if (state == null || state.val == null || state.val == "") newName = deviceName;
										else newName = state.val.toString();
										if (relayCount > 1) newName += `-${i}`;
										this.setState(`devices.${deviceName}.${i}.name`, { val: newName, ack: true });
									});
								}
							});
						},
					);
					if (typeof this.typeConfig[typeState.val].dataPoints === "object") {
						Object.entries(this.typeConfig[typeState.val].dataPoints).forEach(([k, v]) => {
							this.setObjectNotExists(`devices.${deviceName}.${i}.${k}`, v, () => {});
						});
					}
				}
			}
		}
		return changeDeviceIds;
	}

	async updateRoomsList() {
		const roomEnum = {};
		for (const roomKey of Object.keys(this.config["rooms"])) {
			const curRoom = this.config["rooms"][roomKey];
			roomEnum[curRoom.id] = curRoom.name;
		}
		const shellyDevices = await this.getObjectViewAsync("system", "device", {
			startkey: `vis-2-shelly.${this.instance}.devices.`,
			endkey: `vis-2-shelly.${this.instance}.devices.\u9999`,
		});
		for (const devKey of Object.keys(shellyDevices.rows)) {
			const dev = shellyDevices.rows[devKey];

			const devName = [...dev.id.matchAll(/[.]([^.]*[.][0-9]*)$/g)];
			// this.log.info(JSON.stringify(devName))
			if (devName.length == 0) continue;
			// String(dev.id).substring(String(dev.id).lastIndexOf(".")+1);
			// @ts-ignore
			this.setObjectAsync("devices." + devName[0][1] + ".room", {
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
=======
const utils = require("@iobroker/adapter-core");

let adapter;
let typeEnum;
let deviceList;
let typeConfig;
let seenDevices = {};
function startAdapter(options) {
	options = options || {};
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
		unload: function (callback) {
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
			if (await updateDevice(deviceID)) {
				changeDeviceIds = true;
			}
		} catch (e) {
			adapter.log.error(`FEHLER in update Device ${deviceID}: ${JSON.stringify(e)}`);
		}
		// adapter.log.info(deviceID + " after");
	}
	if (changeDeviceIds) {
		await adapter.setStateAsync("devices.ids", {
			val: JSON.stringify(deviceList),
			ack: true,
		});
	}
}
async function updateDevice(deviceID) {
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
			await adapter.getStateAsync(`devices.${deviceName}.${relay}.name`, (err, state) => {
				if (state == null) {
					adapter.getForeignState(deviceID + ".name", (err, state) => {
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
>>>>>>> 0fcbb07 (Alles in TypeScript geschriben)
				},
				native: {},
			});
		}
<<<<<<< HEAD

		this.setObjectAsync("devices.roomIds", {
=======
		if (typeof typeConfig[typeState.val].dataPoints === "object") {
			Object.entries(typeConfig[typeState.val].dataPoints).forEach(([k, v]) => {
				adapter.setObjectNotExistsAsync(`devices.${deviceName}.${relay}.${k}`, v, () => {});
			});
		}

		const roomStateID = `devices.${deviceName}.${relay}.room`;
		const nameStateID = `devices.${deviceName}.${relay}.name`;
		const devRoom = await adapter.getStateAsync(roomStateID);
		const devName = await adapter.getStateAsync(nameStateID);
		const deviceListObj = deviceList[deviceID + relay];
		if (
			!deviceListObj ||
			deviceListObj.stateid != deviceID ||
			deviceListObj.id != deviceName ||
			deviceListObj.type != typeState.val ||
			deviceListObj.relay != relay ||
			deviceListObj.instance != adapter.instance
		) {
			deviceList[deviceID + relay] = {
				stateId: deviceID,
				id: deviceName,
				type: typeState.val,
				relay: relay,
				instance: adapter.instance,
				room: devRoom == null ? null : devRoom.val,
				name: devName == null ? null : devName.val,
			};
			changeDeviceIds = true;
		}
	}
	adapter.config["knownShellyIDs"][deviceID] = true;
	return changeDeviceIds;
}

function updateRoomsList() {
	const roomEnum = {};
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
>>>>>>> 0fcbb07 (Alles in TypeScript geschriben)
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
<<<<<<< HEAD
				type: "array",
				role: "list",
				read: true,
				write: false,
			},
			native: {},
		});
		await this.setStateAsync("devices.roomIds", { val: JSON.stringify(roomEnum), ack: true });
	}
	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 * @param {() => void} callback
	 */
	onUnload(callback) {
		try {
			this.setState("info.connection", false, true);
			this.log.info("cleaned everything up...");
			this.unsubscribeForeignObjects("shelly.*");
			Object.values(this.subcribedNames).forEach((v) => {
				this.unsubscribeStates(v.subscribeID);
			});
			Object.values(this.subcribedRooms).forEach((v) => {
				this.unsubscribeStates(v.subscribeID);
			});
			callback();
		} catch (e) {
			callback();
		}
	}

	/**
	 * Is called if a subscribed object changes
	 * @param {string} id
	 * @param {ioBroker.Object | null | undefined} obj
	 */
	onObjectChange(id, obj) {
		// this.log.info(id);
		// this.log.info(JSON.stringify(obj));
		if (id.indexOf("vis-2-shelly") > -1) {
			// if (id.indexOf(".rooms.") > -1) {
			// 	this.updateRoomsList();
			// }
		} else {
			if (obj) {
				// this.log.info(JSON.stringify(obj));
				if (obj.type == "device" && typeof this.config["knownShellyIDs"][obj._id] === "undefined") {
					this.updateDeviceList();
				}
			}
		}
	}

	/**
	 * Is called if a subscribed state changes
	 * @param {string} id
	 * @param {ioBroker.State | null | undefined} state
	 */
	onStateChange(id, state) {
		if (state && state.ack) {
			if (typeof this.subcribedRooms[id] !== "undefined") {
				this.devJSON[this.subcribedRooms[id].devID].room = state.val;
				this.setState("devices.ids", { val: JSON.stringify(this.devJSON), ack: true }, () => {});
			} else if (typeof this.subcribedNames[id] !== "undefined") {
				this.devJSON[this.subcribedNames[id].devID].name = state.val;
				this.setState("devices.ids", { val: JSON.stringify(this.devJSON), ack: true }, () => {});
			}
			// The state was changed
			// this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
		} else {
			// The state was deleted
			// this.log.info(`state ${id} deleted`);
		}
	}

	/**
	 * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
	 * Using this method requires "common.message" property to be set to true in io-package.json
	 * @param {ioBroker.Message} obj
	 */
	// onMessage(obj) {
	// 	if (typeof obj === "object" && obj.message) {
	// 		if (obj.command === "send") {
	// 			// e.g. send email or pushover or whatever
	// 			this.log.info("send command");

	// 			// Send response in callback if required
	// 			if (obj.callback) this.sendTo(obj.from, obj.command, "Message received", obj.callback);
	// 		}
	// 	}
	// }

	name2id(pName) {
		return (pName || "").replace(this.FORBIDDEN_CHARS, "_");
	}
}

if (require.main !== module) {
	// Export the constructor in compact mode
	/**
	 * @param {Partial<utils.AdapterOptions>} [options={}]
	 */
	module.exports = (options) => new Vis2Shelly(options);
} else {
	// otherwise start the instance directly
	new Vis2Shelly();
}
=======
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
function name2id(pName) {
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
>>>>>>> 0fcbb07 (Alles in TypeScript geschriben)
