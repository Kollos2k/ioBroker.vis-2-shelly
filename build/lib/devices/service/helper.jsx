"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchButtonElement = switchButtonElement;
exports.switchTRVButton = switchTRVButton;
const react_1 = __importDefault(require("react"));
const imgFolder = "/vis-2/widgets/vis-2-shelly/img";
function switchButtonElement(props = {}) {
    return (<object name="svgShellyButton" type="image/svg+xml" data={`${imgFolder}/shellySwitchButton.svg`} title="Switch" {...props}></object>);
}
function switchTRVButton(props = {}) {
    return (<object name="svgShellyTRVButton" type="image/svg+xml" data={`${imgFolder}/shellyTRVButton.svg`} style={{ margin: "5px", width: "125px" }} title="TRVSwitch" {...props}></object>);
}
