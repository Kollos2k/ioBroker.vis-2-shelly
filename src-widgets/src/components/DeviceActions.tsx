const isObject = (value: any): boolean => value !== null && typeof value === "object";
const getObjectOrUndefined = (value: any): object | undefined => (isObject(value) ? value : undefined);
export interface DeviceActionArgument {
	dom: any;
	newVal: any;
	config: { [key: string]: any };
	socket: any;
	dataPoint: { [key: string]: any };
	state: any;
	action: { [key: string]: any };
	newAck?: boolean;
}
export const basicUpdateValue = (arg: DeviceActionArgument): void => {
	arg.dom.innerHTML = arg.newVal;
};
export const basicUpdateMotionValue = (arg: DeviceActionArgument): void => {
	arg.dom.classList.remove("motionyes");
	arg.dom.classList.remove("motionno");
	if (arg.newVal === true) {
		arg.dom.classList.add("motionyes");
		arg.dom.innerHTML = "Ja";
	} else {
		arg.dom.classList.add("motionno");
		arg.dom.innerHTML = "Nein";
	}
};
export const basicUpdateValueName = (arg: DeviceActionArgument): void => {
	arg.dom.innerHTML = arg.newVal;
};
export const basicUpdateValueUnit = (arg: DeviceActionArgument): void => {
	arg.dom.innerHTML = `${arg.newVal} ${arg.config.unit}`;
};
export const basicUpdateValueBrightness = (arg: DeviceActionArgument): void => {
	arg.dom.innerHTML = `${arg.newVal} ${arg.config.unit}`;
};
export const basicUpdateDevicePower = (arg: DeviceActionArgument): void => {
	let exP: { [key: string]: any } | undefined;
	let percent: { [key: string]: any } | undefined;
	Object.entries(arg.state).map(([k, v]) => {
		if (typeof arg.dataPoint.externalPower !== "undefined" && arg.dataPoint.externalPower === k) {
			exP = getObjectOrUndefined(v);
		} else if (typeof arg.dataPoint.batteryPercent !== "undefined" && arg.dataPoint.batteryPercent === k) {
			percent = getObjectOrUndefined(v);
		}
	});
	arg.dom.classList.remove("externalPower");
	arg.dom.classList.remove("battery");
	if (exP !== null && typeof exP === "object" && exP.val === true) {
		arg.dom.classList.add("externalPower");
		arg.dom.innerHTML = "Energie";
	} else {
		arg.dom.classList.add("battery");
		arg.dom.innerHTML = `${percent === null || typeof percent !== "object" ? percent : percent.val} %`;
	}
};
export const basicUpdateTRVAck = (arg: DeviceActionArgument): boolean => {
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
	} else {
		element.classList.add("animatedAction");
	}
	return true;
};
export const basicUpdateSwitchAck = (arg: DeviceActionArgument): boolean => {
	const $dom = arg.dom.querySelector("[name='svgShellyButton']");
	if (!$dom.hasAttribute("loadAck")) {
		$dom.addEventListener(
			"load",
			() => {
				basicUpdateSwitchAck(arg);
			},
			true,
		);
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
	} else {
		element.classList.add("animatedAction");
	}
	return true;
};
export const basicUpdateSwitch = (arg: DeviceActionArgument): void => {
	const $dom = arg.dom.querySelector("[name='svgShellyButton']");
	if (!$dom.hasAttribute("loadValue")) {
		$dom.addEventListener(
			"load",
			() => {
				basicUpdateSwitch(arg);
			},
			true,
		);
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
		} else {
			element.classList.remove("active");
		}
	}
};
export const basicActionNumberStepper = (arg: DeviceActionArgument): boolean => {
	const stateID = arg.dataPoint[arg.action.dataPoint];
	if (typeof stateID === "undefined") {
		return false;
	}
	if (typeof arg.state[stateID] === "undefined") {
		return false;
	}
	let newVal =
		typeof arg.state[stateID] === "undefined" || arg.state[stateID] === null
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
export const basicActionBooleanToggle = (arg: DeviceActionArgument): boolean => {
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
