import React from "react";
import Generic from "./Generic";
import { Card, CardContent } from "@mui/material";
import type { RxRenderWidgetProps, RxWidgetInfo, VisRxWidgetProps, VisRxWidgetState } from "@iobroker/types-vis-2";
import type VisRxWidget from "@iobroker/types-vis-2/visRxWidget";

interface StaticRxData {
	type: string;
	oid: string;
}

interface StaticState extends VisRxWidgetState {}

class TestApp extends Generic<StaticRxData, StaticState> {
	constructor(props: VisRxWidgetProps) {
		super(props);
	}
	static getWidgetInfo(): RxWidgetInfo {
		return {
			id: "tplTestApp",
			visSet: "vis-2-shelly",
			visSetLabel: "vis_2_widgets_shelly", // Widget set translated label (should be defined only in one widget of set)
			visSetColor: "#cf00fa", // Color of widget set. it is enough to set color only in one widget of set
			visName: "TestApp", // Name of widget
			visAttrs: [
				{
					name: "common", // group name
					fields: [
						{
							name: "type", // name in data structure
							label: "type", // translated field label
							type: "text",
						},
					],
				},
				{
					name: "private", // group name
					label: "private", // translated group label
					fields: [
						{
							name: "oid", // name in data structure
							type: "id",
							label: "oid", // translated field label
						},
					],
				},
			],
			visDefaultStyle: {
				width: "100%",
				height: 120,
				position: "relative",
			},
			visPrev: "widgets/vis-2-shelly/img/editor/allDevices.png",
		};
	}

	async propertiesUpdate(): Promise<void> {}
	componentDidMount(): void {
		super.componentDidMount();
		void this.propertiesUpdate().catch((e) => console.error(e));
	}
	// Do not delete this method. It is used by vis to read the widget configuration.
	// eslint-disable-next-line class-methods-use-this
	getWidgetInfo(): RxWidgetInfo {
		return TestApp.getWidgetInfo();
	}

	// This function is called every time when rxData is changed
	async onRxDataChanged(): Promise<void> {
		await this.propertiesUpdate();
	}

	onRxStyleChanged() {}
	onStateUpdated(_id: string, _state: ioBroker.State | null | undefined) {
		// this could be deleted if not used
	}

	renderWidgetBody(props: RxRenderWidgetProps): React.JSX.Element | React.JSX.Element[] | null {
		super.renderWidgetBody(props);
		console.log("dddd");
		const content = (
			<Card style={{ width: "100%", height: "100%" }}>
				<CardContent>ddd</CardContent>
			</Card>
		);
		return this.wrapContent(content);
	}
}

export default TestApp;
