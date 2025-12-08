import React from "react";
import { Slider } from "@mui/material";

export const Main = (props: any): React.JSX.Element => {
	const setBrightness = (event: any, value: any): void => {
		props.socket.setState(props.dataPoint.brightness, value, false);
	};
	return (
		<div
			style={{
				margin: "20px",
				textAlign: "center",
				height: "100%",
				maxHeight: `${props.maxVisibleHeight}px`,
			}}
		>
			{props.maxVisibleHeight > 200 && (
				<div>
					{props.state[props.dataPoint.power].val}
					{/* {Object.entries(props.typeConfig.view.info).map(([viewKey, viewVal]) => {
						return (
							<span name={viewVal.name} className={viewVal.class}>
								{viewVal.html}
							</span>
						);
					})} */}
				</div>
			)}
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
				defaultValue={
					typeof props.state[props.dataPoint.brightness] === "object"
						? props.state[props.dataPoint.brightness].val
						: 0
				}
				aria-label="Temperature"
				valueLabelDisplay="auto"
				style={{ width: "80px" }}
				onChange={(event, value) => {
					setBrightness(event, value);
				}}
			/>
			{}
		</div>
	);
};
