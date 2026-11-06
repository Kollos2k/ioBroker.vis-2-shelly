"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const utils = __importStar(require("@iobroker/adapter-core"));
const devicesConfig_1 = require("./lib/devices/devicesConfig");
class Vis2Shelly extends utils.Adapter {
    typeEnum;
    deviceList = {};
    typeConfig;
    vsConfig = { knownShellyIDs: {}, parseTimeout: 0 };
    killTimer = null;
    constructor(options = {}) {
        super({
            ...options,
            name: "vis-2-shelly",
        });
        this.typeEnum = {};
        this.typeConfig = {};
        this.on("ready", this.onReady.bind(this));
        this.on("unload", this.onUnload.bind(this));
    }
    async onReady() {
        try {
            console.log("VIS-2-SHELLY: onReady aufgerufen");
            if (this.log && typeof this.log.info === "function") {
                this.log.info("vis 2 shelly start - robust mode");
            }
            await this.main();
        }
        catch (e) {
            console.error("VIS-2-SHELLY CRITICAL ONREADY EXCEPTION:", e);
            if (this.log && typeof this.log.error === "function") {
                this.log.error("CRITICAL EXCEPTION in onReady: " + e);
            }
        }
    }
    onUnload(callback) {
        try {
            this.log.info("cleaned everything up...");
            callback();
        }
        catch (e) {
            callback();
        }
    }
    async main() {
        console.log("VIS-2-SHELLY: main() gestartet");
        try {
            if (this.log) {
                this.log.info("main() gestartet");
            }
            // Testweise DEVICE_CONFIGS prüfen
            console.log("VIS-2-SHELLY: Prüfe DEVICE_CONFIGS...");
            if (!devicesConfig_1.DEVICE_CONFIGS) {
                console.error("VIS-2-SHELLY ERROR: DEVICE_CONFIGS ist null oder undefined!");
            }
            else {
                console.log("VIS-2-SHELLY: DEVICE_CONFIGS erfolgreich geladen, Anzahl Einträge:", Object.keys(devicesConfig_1.DEVICE_CONFIGS).length);
            }
            Object.values(devicesConfig_1.DEVICE_CONFIGS).forEach((dev, index) => {
                try {
                    if (dev && dev.name) {
                        const key = dev.adapterKey || dev.name;
                        this.typeConfig[key] = dev;
                        this.typeEnum[key] = dev.name;
                    }
                }
                catch (err) {
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
            }
            else {
                process.exit(0);
            }
        }
        catch (e) {
            console.error("VIS-2-SHELLY MAIN EXCEPTION:", e);
            if (this.log) {
                this.log.error("main() Fehler aufgetreten: " + e);
            }
        }
    }
    async mainOLD() {
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
            if (!devicesConfig_1.DEVICE_CONFIGS || typeof devicesConfig_1.DEVICE_CONFIGS !== "object") {
                this.log.error("DEVICE_CONFIGS ist undefiniert oder kein Objekt!");
            }
            else {
                Object.values(devicesConfig_1.DEVICE_CONFIGS).forEach((dev, index) => {
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
                }
                catch (parseErr) {
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
            }
            catch (e) {
                // ignore
            }
            if (this.killTimer) {
                clearTimeout(this.killTimer);
            }
            this.log.info("main() erfolgreich abgeschlossen. Beende Instanz programmgerecht...");
            if (this.terminate) {
                this.terminate("All data handled, adapter stopped until next scheduled moment");
            }
            else {
                process.exit(0);
            }
        }
        catch (e) {
            this.log.error("main() Fehler aufgetreten: " + e);
        }
    }
    async createDeviceIDState() {
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
        }
        catch (e) {
            this.log.error("Fehler in createDeviceIDState: " + e);
        }
    }
    async updateDeviceList() {
        this.log.info("Suche nach Fremdobjekten (shelly.*.*)...");
        let shellyDevices = {};
        try {
            shellyDevices = await this.getForeignObjectsAsync("shelly.*.*", "device");
        }
        catch (e) {
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
            }
            catch (e) {
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
    async updateDevice(deviceID) {
        let changeDeviceIds = false;
        const deviceName = this.name2id(deviceID.substring(deviceID.lastIndexOf(".") + 1));
        try {
            await this.setStateAsync("info.test", deviceName, true);
        }
        catch {
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
        const relayCount = typeState != null && typeof typeState.val === "string" && this.typeConfig[typeState.val]
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
                    }
                    else {
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
                const dataPoints = this.typeConfig[typeState.val].dataPoints;
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
            if (!deviceListObj ||
                deviceListObj.stateId !== deviceID ||
                deviceListObj.id !== deviceName ||
                deviceListObj.type !== typeState.val ||
                deviceListObj.relay !== relay ||
                deviceListObj.instance !== this.instance) {
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
    name2id(pName) {
        return (pName || "").replace(this.FORBIDDEN_CHARS, "_");
    }
}
// Export adapter module
if (module.parent) {
    module.exports = (options) => new Vis2Shelly(options);
}
else {
    (() => new Vis2Shelly({}))();
}
