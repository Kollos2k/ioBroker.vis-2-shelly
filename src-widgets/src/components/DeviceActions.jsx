export const basicUpdateValue = (arg) => {
	arg.dom.innerHTML = arg.newVal;
};
export const basicUpdateMotionValue = (arg) => {
	// $dom.removeClass("motionyes");
	// $dom.removeClass("motionno");
	// if (newVal === true) {
	// 	$dom.addClass("motionyes");
	// 	$dom.html("Ja");
	// } else {
	// 	$dom.addClass("motionno");
	// 	$dom.html("Nein");
	// }
};
export const basicUpdateValueName = (arg) => {
	arg.dom.innerHTML = arg.newVal;
};
export const basicUpdateValueUnit = (arg) => {
	arg.dom.innerHTML = `${arg.newVal} ${arg.config.unit}`;
};
export const basicUpdateValueBrightness = (arg) => {
	arg.dom.innerHTML = `${arg.newVal} ${arg.config.unit}`;
	// arg.dom.appendChild(<button type="button">+</button>);
	// const $b1 = $("<button class='brightnessButton'>-</button>");
	// const $b2 = $("<button class='brightnessButton'>+</button>");
	// $b1.click(() => {
	// 	if (newVal < 10) {
	// 		newVal = 0;
	// 	} else {
	// 		newVal -= 10;
	// 	}
	// 	vis.setValue(stageID, newVal);
	// });
	// $b2.click(() => {
	// 	if (newVal > 90) {
	// 		newVal = 100;
	// 	} else {
	// 		newVal += 10;
	// 	}
	// 	vis.setValue(stageID, newVal);
	// });
	// $dom.append($b1);
	// $dom.append($b2);
};
export const basicUpdateDevicePower = (arg) => {
	//($dom, _newVal, _options = {}, data = {}, _stageID = "", curDataPoint = {}) => {
	// // console.log("update external");
	// let exP = null;
	// let percent = null;
	// $.each(data, (k, v) => {
	// 	if (typeof curDataPoint.externalPower !== "undefined" && curDataPoint.externalPower === k) exP = v;
	// 	else if (typeof curDataPoint.batteryPercent !== "undefined" && curDataPoint.batteryPercent === k) percent = v;
	// });
	// $dom.removeClass("externalPower");
	// $dom.removeClass("battery");
	// if (exP !== null && typeof exP === "object" && exP.val === true) {
	// 	$dom.addClass("externalPower");
	// 	$dom.html("Energie");
	// } else {
	// 	$dom.addClass("battery");
	// 	$dom.html(`${percent === null || typeof percent !== "object" ? percent : percent.val} %`);
	// }
};
export const basicUpdateTRVAck = (arg) => {
	const $dom = arg.dom.querySelector("[name='svgShellyTRVButton']");
	if ($dom === null) return false;
	if ($dom.contentDocument === null) return false;
	const element = $dom.contentDocument.firstChild;
	if (element === null) return false;
	if (arg.newAck === true) {
		element.classList.remove("animatedAction");
	} else {
		element.classList.add("animatedAction");
	}
	return true;
};
export const basicUpdateSwitchAck = (arg) => {
	const $dom = arg.dom.querySelector("[name='svgShellyButton']");
	if ($dom === null) return false;
	if ($dom.contentDocument === null) return false;
	const element = $dom.contentDocument.firstChild;
	if (element === null) return false;
	if (arg.newAck === true) {
		element.classList.remove("animatedAction");
	} else {
		element.classList.add("animatedAction");
	}
	return true;
};
export const basicUpdateSwitch = (arg) => {
	const $dom = arg.dom.querySelector("[name='svgShellyButton']");
	if ($dom !== null) {
		// console.debug(button);
		if ($dom.contentDocument === null) return;
		const element = $dom.contentDocument.firstChild;
		// console.debug(element);
		if (element === null) return;
		if (arg.newVal === true) {
			element.classList.add("active");
		} else {
			element.classList.remove("active");
		}
	}
};
export const basicActionNumberStepper = (arg) => {
	const stateID = arg.dataPoint[arg.options.dataPoint];
	if (typeof stateID === "undefined") return false;
	if (typeof arg.state[stateID] === "undefined") return false;
	let newVal =
		typeof arg.state[stateID] === "undefined" || arg.state[stateID] === null
			? arg.options.minValue
			: arg.state[stateID].val;
	newVal += arg.options.step;
	if (newVal < arg.options.minValue) newVal = arg.options.minValue;
	if (newVal > arg.options.maxValue) newVal = arg.options.maxValue;
	arg.socket.setState(stateID, newVal, false);
	return true;
};
export const basicActionBooleanToggle = (arg) => {
	const stateID = arg.dataPoint[arg.options.dataPoint];
	if (typeof stateID === "undefined") return false;
	if (typeof arg.state[stateID] === "undefined") return false;
	const newVal = arg.state[stateID] === null ? false : arg.state[stateID].val !== true;
	arg.socket.setState(stateID, newVal, false);
	return true;
};
