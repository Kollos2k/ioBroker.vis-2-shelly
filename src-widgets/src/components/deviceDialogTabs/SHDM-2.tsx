import React from "react";
import { Slider } from "@mui/material";
import type { TypeConfig } from "@mainLib/devices/service/types";

interface MainProps {
	socket: any;
	dataPoint: { [key: string]: string };
	state: { [key: string]: any };
	maxVisibleHeight: number;
	typeConfig?: TypeConfig;
}

export const Main = (props: MainProps): React.JSX.Element => {
	const setBrightness = (_event: Event, value: number | number[]): void => {
		if (props.dataPoint?.brightness) {
			props.socket.setState(props.dataPoint.brightness, value, false);
		}
	};

	const brightnessState = props.state?.[props.dataPoint?.brightness];
	const defaultValue = typeof brightnessState === "object" && brightnessState !== null ? brightnessState.val : 0;

	const powerState = props.state?.[props.dataPoint?.power];
	const powerVal = typeof powerState === "object" && powerState !== null ? powerState.val : "";

	return (
		<div
			style={{
				margin: "20px",
				textAlign: "center",
				height: "100%",
				maxHeight: `${props.maxVisibleHeight}px`,
			}}
		>
			{props.maxVisibleHeight > 200 && <div>{powerVal}</div>}
			<Slider
				sx={{
					'& input[type="range"]': {
						WebkitAppearance: "slider-vertical",
					},
					"& .MuiSlider-thumb": {
						borderRadius: "5px",
						width: "85px",
						color: "white",
					},
				}}
				orientation="vertical"
				defaultValue={typeof defaultValue === "number" ? defaultValue : 0}
				aria-label="Brightness"
				valueLabelDisplay="auto"
				style={{ width: "80px" }}
				onChange={(event, value) => {
					setBrightness(event, value);
				}}
			/>
		</div>
	);
};
