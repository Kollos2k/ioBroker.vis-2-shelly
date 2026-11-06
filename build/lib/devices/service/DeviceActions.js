"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicActionBooleanToggle = exports.basicActionNumberStepper = exports.basicUpdateSwitch = exports.basicUpdateSwitchAck = exports.basicUpdateTRVAck = exports.basicUpdateDevicePower = exports.basicUpdateValueBrightness = exports.basicUpdateValueUnit = exports.basicUpdateValueName = exports.basicUpdateMotionValue = exports.basicUpdateValue = void 0;
const isObject = (value) => value !== null && typeof value === "object";
const getObjectOrUndefined = (value) => (isObject(value) ? value : undefined);
const basicUpdateValue = (arg) => {
    arg.dom.innerHTML = arg.newVal;
};
exports.basicUpdateValue = basicUpdateValue;
const basicUpdateMotionValue = (arg) => {
    arg.dom.classList.remove("motionyes");
    arg.dom.classList.remove("motionno");
    if (arg.newVal === true) {
        arg.dom.classList.add("motionyes");
        arg.dom.innerHTML = "Ja";
    }
    else {
        arg.dom.classList.add("motionno");
        arg.dom.innerHTML = "Nein";
    }
};
exports.basicUpdateMotionValue = basicUpdateMotionValue;
const basicUpdateValueName = (arg) => {
    arg.dom.innerHTML = arg.newVal;
};
exports.basicUpdateValueName = basicUpdateValueName;
const basicUpdateValueUnit = (arg) => {
    if (!arg.config) {
        return;
    }
    arg.dom.innerHTML = `${arg.newVal} ${arg.config.unit}`;
};
exports.basicUpdateValueUnit = basicUpdateValueUnit;
const basicUpdateValueBrightness = (arg) => {
    if (!arg.config) {
        return;
    }
    arg.dom.innerHTML = `${arg.newVal} ${arg.config.unit}`;
};
exports.basicUpdateValueBrightness = basicUpdateValueBrightness;
const basicUpdateDevicePower = (arg) => {
    if (!arg.state || !arg.dataPoint) {
        return;
    }
    let exP;
    let percent;
    Object.entries(arg.state).map(([k, v]) => {
        if (typeof arg.dataPoint?.externalPower !== "undefined" && arg.dataPoint.externalPower === k) {
            exP = getObjectOrUndefined(v);
        }
        else if (typeof arg.dataPoint?.batteryPercent !== "undefined" && arg.dataPoint.batteryPercent === k) {
            percent = getObjectOrUndefined(v);
        }
    });
    arg.dom.classList.remove("externalPower");
    arg.dom.classList.remove("battery");
    if (exP !== null && typeof exP === "object" && exP.val === true) {
        arg.dom.classList.add("externalPower");
        arg.dom.innerHTML = "Energie";
    }
    else {
        arg.dom.classList.add("battery");
        arg.dom.innerHTML = `${percent === null || typeof percent !== "object" ? percent : percent.val} %`;
    }
};
exports.basicUpdateDevicePower = basicUpdateDevicePower;
const basicUpdateTRVAck = (arg) => {
    const $dom = arg.dom.querySelector("[name='svgShellyTRVButton']");
    if ($dom === null) {
        return false;
    }
    if ($dom.contentDocument === null) {
        return false;
    }
    const element = $dom.contentDocument.firstChild;
    if (element === null) {
        return false;
    }
    if (arg.newAck === true) {
        element.classList.remove("animatedAction");
    }
    else {
        element.classList.add("animatedAction");
    }
    return true;
};
exports.basicUpdateTRVAck = basicUpdateTRVAck;
const basicUpdateSwitchAck = (arg) => {
    const $dom = arg.dom.querySelector("[name='svgShellyButton']");
    if (!$dom.hasAttribute("loadAck")) {
        $dom.addEventListener("load", () => {
            (0, exports.basicUpdateSwitchAck)(arg);
        }, true);
        $dom.setAttribute("loadAck", "true");
    }
    if ($dom === null) {
        return false;
    }
    if ($dom.contentDocument === null) {
        return false;
    }
    const element = $dom.contentDocument.firstChild;
    if (element === null) {
        return false;
    }
    if (arg.newAck === true) {
        element.classList.remove("animatedAction");
    }
    else {
        element.classList.add("animatedAction");
    }
    return true;
};
exports.basicUpdateSwitchAck = basicUpdateSwitchAck;
const basicUpdateSwitch = (arg) => {
    const $dom = arg.dom.querySelector("[name='svgShellyButton']");
    if (!$dom.hasAttribute("loadValue")) {
        $dom.addEventListener("load", () => {
            (0, exports.basicUpdateSwitch)(arg);
        }, true);
        $dom.setAttribute("loadValue", "true");
    }
    if ($dom !== null) {
        if ($dom.contentDocument === null) {
            return;
        }
        const element = $dom.contentDocument.firstChild;
        if (element === null) {
            return;
        }
        if (arg.newVal) {
            element.classList.add("active");
        }
        else {
            element.classList.remove("active");
        }
    }
};
exports.basicUpdateSwitch = basicUpdateSwitch;
const basicActionNumberStepper = (arg) => {
    if (!arg.state || !arg.dataPoint || !arg.action) {
        return false;
    }
    const stateID = arg.dataPoint?.[arg.action.dataPoint];
    if (typeof stateID === "undefined") {
        return false;
    }
    if (typeof arg.state[stateID] === "undefined") {
        return false;
    }
    let newVal = typeof arg.state[stateID] === "undefined" || arg.state[stateID] === null
        ? arg.action.minValue
        : arg.state[stateID].val;
    newVal += arg.action.step;
    if (newVal < arg.action.minValue) {
        newVal = arg.action.minValue;
    }
    if (newVal > arg.action.maxValue) {
        newVal = arg.action.maxValue;
    }
    arg.socket.setState(stateID, newVal, false);
    return true;
};
exports.basicActionNumberStepper = basicActionNumberStepper;
const basicActionBooleanToggle = (arg) => {
    if (!arg.state || !arg.dataPoint || !arg.action) {
        return false;
    }
    const stateID = arg.dataPoint[arg.action.dataPoint];
    if (typeof stateID === "undefined") {
        return false;
    }
    if (typeof arg.state[stateID] === "undefined") {
        return false;
    }
    const newVal = arg.state[stateID] === null ? false : arg.state[stateID].val !== true;
    arg.socket.setState(stateID, newVal, false);
    return true;
};
exports.basicActionBooleanToggle = basicActionBooleanToggle;
