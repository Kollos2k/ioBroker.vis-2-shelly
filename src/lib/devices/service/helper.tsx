import React from "react";
import type { DeviceObject } from "./types";
const imgFolder = "/vis-2/widgets/vis-2-shelly/img";

export function switchButtonElement(props = {}): React.JSX.Element {
	return (
		<object
			name="svgShellyButton"
			type="image/svg+xml"
			data={`${imgFolder}/shellySwitchButton.svg`}
			title="Switch"
			{...props}
		></object>
	);
}
export function switchTRVButton(props = {}): React.JSX.Element {
	return (
		<object
			name="svgShellyTRVButton"
			type="image/svg+xml"
			data={`${imgFolder}/shellyTRVButton.svg`}
			style={{ margin: "5px", width: "125px" }}
			title="TRVSwitch"
			{...props}
		></object>
	);
}
