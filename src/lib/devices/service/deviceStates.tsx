import * as Core from "./deviceStatesCore";
import { switchButtonElement, switchTRVButton } from "./helper";

export const name = Core.name;
export const oname = Core.oname;
export const power = Core.power;
export const voltage = Core.voltage;
export const humidity = Core.humidity;
export const batteryPercent = Core.batteryPercent;
export const externalPower = Core.externalPower;
export const lux = Core.lux;
export const motion = Core.motion;
export const door = Core.door;
export const temperature = Core.temperature;
export const temperatureC = Core.temperatureC;
export const temperatureTargetC = Core.temperatureTargetC;
export const valvePositionTRV = Core.valvePositionTRV;
export const brightness = Core.brightness;
export const switchButton = {
	...Core.switchButton,
	view: { ...Core.switchButton.view, html: switchButtonElement() },
};
export const buttonTRV = {
	...Core.buttonTRV,
	view: { ...Core.buttonTRV.view, html: switchTRVButton() },
};
