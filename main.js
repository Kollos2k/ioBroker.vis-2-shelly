"use strict";

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
			"SHMOS-02": { name: "Shelly Motion 2", relayCount: 1 },
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
		// await this.subscribeObjectsAsync("rooms.*");
		this.updateDeviceList(true);
		this.updateRoomsList();
		this.setState("info.connection", true, true);
	}

	async updateDeviceList(forceUpdate = false) {
		const shellyDevices = await this.getForeignObjectsAsync("shelly.*", "device");
		const keysDevices = Object.keys(shellyDevices);
		let changeDeviceIds = false;

		await this.setObjectNotExistsAsync("devices.ids", {
			type: "state",
			common: {
				name: "Shelly DeviceList",
				type: "array",
				role: "shelly.deviceList",
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
		if (changeDeviceIds) await this.setStateAsync("devices.ids", { val: JSON.stringify(this.devJSON), ack: true });
		this.log.info(`Devices updated (Force:${forceUpdate ? "yes" : "no"})`);
	}
	async updateDevice(deviceID, forceUpdate) {
		let changeDeviceIds = false;
		const deviceName = deviceID.substring(deviceID.lastIndexOf(".") + 1, deviceID.length);

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
			await this.setObjectAsync("devices." + deviceName + ".type", {
				type: "state",
				common: {
					name: deviceName + ".type",
					type: "object",
					role: "name",
					read: true,
					write: true,
					states: this.typeEnum,
					def: typeState,
				},
				native: {},
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
					if (typeof this.subcribedNames[`vis-2-shelly.0.${nameStateID}`] === "undefined") {
						this.subscribeStates(nameStateID, () => {});
						this.subcribedNames[`vis-2-shelly.0.${nameStateID}`] = {
							devID: `${deviceID}${relay}`,
							subscribeID: nameStateID,
						};
					}
					if (typeof this.subcribedRooms[`vis-2-shelly.0.${roomStateID}`] === "undefined") {
						this.subscribeStates(roomStateID, () => {});
						this.subcribedRooms[`vis-2-shelly.0.${roomStateID}`] = {
							devID: `${deviceID}${relay}`,
							subscribeID: roomStateID,
						};
					}
				}
				this.config["knownShellyIDs"][deviceID] = true;
				changeDeviceIds = true;
				relayCount = this.typeConfig[typeState.val].relayCount;
			}
			/** CREATE vis-shelly DEVICE FROM shelly OBJECTS*/
			for (let i = 0; i < relayCount; i++) {
				await this.setObjectNotExistsAsync("devices." + deviceName + "." + i, {
					type: "device",
					common: {
						name: "Device Realay " + deviceName,
					},
					native: {},
				});
				/** Set Name */
				this.setObjectNotExists(
					"devices." + deviceName + "." + i + ".name",
					{
						type: "state",
						common: {
							name: deviceName + ".name",
							type: "string",
							role: "name",
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
					name: "room",
					type: "object",
					role: "name",
					read: true,
					write: true,
					states: roomEnum,
				},
				native: {},
			});
		}

		this.setObjectAsync("devices.roomIds", {
			type: "state",
			common: {
				name: "room",
				type: "array",
				role: "name",
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
		if (state) {
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
	 * Creates State if not exists and set State (UNUSED)
	 * @param {string} foreignID
	 * @param {string} selfID
	 * @param {string} name
	 * @param {string} role
	 */
	createAndSetState(foreignID, selfID, name, role) {
		this.setObjectNotExists(
			selfID,
			{
				type: "state",
				common: {
					name: name,
					type: "string",
					role: role,
					read: true,
					write: true,
				},
				native: {},
			},
			() => {
				this.setState(selfID, { val: foreignID, ack: true });
			},
		);
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
