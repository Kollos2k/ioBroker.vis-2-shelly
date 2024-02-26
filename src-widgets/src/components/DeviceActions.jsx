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
	//($dom, stateID, data) => {
	// let element;
	// if ($dom.find("[name='svgShellyTRVButton']").length > 0) {
	// 	element = $dom.find("[name='svgShellyTRVButton']").get(0).contentDocument.firstChild;
	// } else {
	// 	element = $dom.get(0);
	// }
	// if (data[stateID].ack === true) {
	// 	element.classList.remove("animatedAction");
	// } else {
	// 	element.classList.add("animatedAction");
	// }
};
export const basicUpdateSwitchAck = (arg) => {
	//($dom, stateID, data) => {
	// let element;
	// if ($dom.find("[name='svgShellyButton']").length > 0) {
	// 	element = $dom.find("[name='svgShellyButton']").get(0).contentDocument.firstChild;
	// } else {
	// 	element = $dom.get(0);
	// }
	// if (data[stateID].ack === true) {
	// 	element.classList.remove("animatedAction");
	// } else {
	// 	element.classList.add("animatedAction");
	// }
};
export const basicUpdateSwitch = (arg) => {
	//($dom, _newVal, _options = {}, data = {}, stateID = "") => {
	// let element;
	// if ($dom.find("[name='svgShellyButton']").length > 0) {
	// 	element = $dom.find("[name='svgShellyButton']").get(0).contentDocument.firstChild;
	// } else {
	// 	element = $dom.get(0);
	// }
	// if (data[stateID].val === true) {
	// 	element.classList.add("active");
	// } else {
	// 	element.classList.remove("active");
	// }
};
export const basicActionNumberStepper = (arg) => {
	//(stateID, $mainDOM, action) => {
	// const data = $mainDOM.data("data");
	// let newVal = typeof data[stateID] === "undefined" || data[stateID] === null ? action.minValue : data[stateID].val;
	// newVal += action.step;
	// if (newVal < action.minValue) newVal = action.minValue;
	// if (newVal > action.maxValue) newVal = action.maxValue;
	// // if (data[stateID].ack)
	// vis.conn.setState(stateID, { val: newVal, ack: false });
};
export const basicActionBooleanToggle = (arg) => {
	//(stateID, $mainDOM, _action) => {
	// const data = $mainDOM.data("data");
	// const newVal =
	// 	typeof data[stateID] !== "undefined"
	// 		? data[stateID] === null
	// 			? true
	// 			: data[stateID].val === true
	// 				? false
	// 				: true
	// 		: false;
	// if (data[stateID].ack === true) vis.conn.setState(stateID, { val: newVal, ack: false });
};
