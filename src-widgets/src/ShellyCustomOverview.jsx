import React from "react";
import { Card, CardContent } from "@mui/material";

import { I18n } from "@iobroker/adapter-react-v5";
import { VisRxWidget } from "@iobroker/vis-2-widgets-react-dev";
import "./components/customOverview.css";

class ShellyCustomOverview extends (window.visRxWidget || VisRxWidget) {
	constructor(props) {
		super(props);
		this.state.allDevices = {};
		console.debug("CustomOverview this");
		console.debug(this);
	}

	static getWidgetInfo() {
		return {
			id: "tplCustomOverviewWidget",
			visSet: "vis-2-shelly",
			visSetLabel: "vis_2_widgets_shelly", // Widget set translated label (should be defined only in one widget of set)
			visSetColor: "#cf00ff", // Color of widget set. it is enough to set color only in one widget of set
			visName: "CustomOverview", // Name of widget
			visAttrs: [
				{
					name: "common", // group name
					fields: [
						{
							name: "title", // name in data structure
							label: "vis_2_widgets_shelly_overview_title", // translated field label
							type: "text",
						},
						{
							name: "titleImage",
							label: "vis_2_widgets_shelly_overview_titleImage",
							type: "image",
						},
						{
							name: "valueGroupCount",
							label: "vis_2_widgets_shelly_overview_valueGroupCount",
							type: "number",
							default: 1,
							onChange: (field, data, changeData) => changeData(data),
						},
					],
				},
				{
					name: "cssstyle",
					label: "vis_2_widgets_shelly_overview_cssstyle",
					fields: [
						{
							name: "backColor",
							label: "vis_2_widgets_shelly_overview_backColor",
							type: "color",
						},
						{
							name: "textColor",
							label: "vis_2_widgets_shelly_overview_textColor",
							type: "color",
						},
						{
							name: "padding",
							label: "vis_2_widgets_shelly_overview_padding",
							type: "dimension",
						},
						{
							name: "margin",
							label: "vis_2_widgets_shelly_overview_margin",
							type: "dimension",
						},
						{
							name: "borderRadius",
							label: "vis_2_widgets_shelly_overview_borderRadius",
							type: "dimension",
						},
					],
				},
				{
					name: "valueGroup", // name of custom group
					label: "vis_2_widgets_shelly_overview_group", // label of custom group
					indexFrom: 1, // optional start index of iterator
					indexTo: "valueGroupCount",
					fields: [
						{
							name: "subTitle",
							label: "vis_2_widgets_shelly_overview_subTitle",
							type: "text",
						},
						{
							name: "subOID",
							label: "vis_2_widgets_shelly_overview_subOID",
							type: "id",
						},
						{
							name: "subUnit",
							label: "vis_2_widgets_shelly_overview_subUnit",
							type: "text",
						},
						{
							name: "subIcon",
							label: "vis_2_widgets_shelly_overview_subIcon",
							type: "image",
						},
						{
							name: "subSeperator",
							label: "vis_2_widgets_shelly_overview_subSeperator",
							type: "checkbox",
						},
						{
							name: "subAddOID1_",
							label: "vis_2_widgets_shelly_overview_subAddOID1",
							type: "id",
						},

						{
							name: "subAddUnit1_",
							label: "vis_2_widgets_shelly_overview_subAddUnit1",
							type: "text",
						},
						{
							name: "subAddIcon1_",
							label: "vis_2_widgets_shelly_overview_subAddIcon1",
							type: "image",
						},
						{
							name: "subAddOID2_",
							label: "vis_2_widgets_shelly_overview_subAddOID2",
							type: "id",
						},

						{
							name: "subAddUnit2_",
							label: "vis_2_widgets_shelly_overview_subAddUnit2",
							type: "text",
						},
						{
							name: "subAddIcon2_",
							label: "vis_2_widgets_shelly_overview_subAddIcon2",
							type: "image",
						},
						{
							name: "subHorizontal",
							label: "vis_2_widgets_shelly_overview_subHR",
							type: "checkbox",
						},
					],
				},
			],
			visPrev: "widgets/vis-2-shelly/vis2/img/editor/allDevices1.png",
		};
	}

	// eslint-disable-next-line class-methods-use-this
	async propertiesUpdate() {}

	async componentDidMount() {
		super.componentDidMount();
		this.props.context.socket.subscribeState(["vis-2-shelly.0.devices.ids"], (id, state) => {
			this.state.allDevices = JSON.parse(state.val);
			this.forceUpdate();
		});

		// Update data
		await this.propertiesUpdate();
	}

	// Do not delete this method. It is used by vis to read the widget configuration.
	// eslint-disable-next-line class-methods-use-this
	getWidgetInfo() {
		return ShellyCustomOverview.getWidgetInfo();
	}

	// This function is called every time when rxData is changed
	async onRxDataChanged() {
		await this.propertiesUpdate();
	}

	// This function is called every time when rxStyle is changed
	// eslint-disable-next-line class-methods-use-this
	async onRxStyleChanged() {}

	// This function is called every time when some Object State updated, but all changes lands into this.state.values too
	// eslint-disable-next-line class-methods-use-this, no-unused-vars
	async onStateUpdated(id, state) {}

	renderWidgetBody(props) {
		super.renderWidgetBody(props);
		const that = this;
		const valueGroup = [];
		for (let c = 1; c <= this.state.data.valueGroupCount; c++) valueGroup.push(c);
		return (
			<Card
				style={{
					width: "100%",
					height: "100%",
				}}
			>
				<CardContent
					style={{
						backgroundColor: this.state.data.backColor,
						color: this.state.data.textColor,
						margin: this.state.data.margin,
						padding: this.state.data.padding,
						borderRadius: this.state.data.borderRadius,
					}}
				>
					<div className="vis-2-shelly-class vis-widget-body" style={{ padding: "2px" }}>
						<div className="vis-2-shelly-customOverview-headDiv">
							<span className="vis-2-shelly-customOverview-headIcon">
								{this.getImage(this.state.data.titleImage, { alt: "ICON", style: { width: "30px" } })}
							</span>
							<span className="vis-2-shelly-customOverview-headTitle">{this.getData("title")}</span>
						</div>

						<div className="vis-2-shelly-customOverview-item">
							{valueGroup.map((i) => {
								return (
									<>
										{this.state.data[`subSeperator${i}`] ? <hr /> : ""}

										<table style={{ width: "100%" }}>
											<tbody>
												<tr>
													<td
														rowSpan="2"
														className="vis-2-shelly-customOverview-itemIconHolder"
													>
														{this.getImage(this.getData(`subIcon${i}`), {
															alt: "icon",
															className: "vis-2-shelly-customOverview-itemIcon",
														})}
													</td>
													<td className="vis-2-shelly-customOverview-itemTitle">
														{this.getData(`subTitle${i}`)}
													</td>
													<td className="vis-2-shelly-customOverview-itemValue">
														{this.getOIDValue(`subOID${i}`)}
														&nbsp;
														{this.getData(`subUnit${i}`)}
													</td>
												</tr>
												<tr>
													<td className="vis-2-shelly-customOverview-itemTimestamp">
														{this.getValueLC_formated(`subOID${i}`)}
													</td>
													<td className="vis-2-shelly-customOverview-itemSubItem">
														{}
														<div
															className={
																this.state.data[`subHorizontal${i}`] === true
																	? "vis-2-shelly-customOverview-itemSubItemFlex"
																	: "vis-2-shelly-customOverview-itemSubItemGrid"
															}
														>
															<div
																style={{
																	display: this.state.data[`subAddIcon1_${i}`]
																		? "inline"
																		: "none",
																	gridArea: "icon1",
																}}
															>
																{this.getImage(`subAddIcon1_${i}`, {
																	alt: "",
																	style: { width: "15px" },
																})}
															</div>
															<div style={{ gridArea: "value1" }}>
																&nbsp;
																{this.getOIDValue(`subAddOID1_${i}`)}
																&nbsp;
																{this.getData(`subAddUnit1_${i}`)}
															</div>
															{this.state.data[`subHorizontal${i}`] === true &&
															this.state.data[`subAddOID1_${i}`] &&
															this.state.data[`subAddOID2_${i}`]
																? " ,"
																: ""}
															<div
																style={{
																	display: this.state.data[`subAddIcon2_${i}`]
																		? "inline"
																		: "none",
																	gridArea: "icon2",
																}}
															>
																{this.getImage(`subAddIcon2_${i}`, {
																	alt: "",
																	style: { width: "15px" },
																})}
															</div>
															<div style={{ gridArea: "value2" }}>
																&nbsp;
																{this.getOIDValue(`subAddOID2_${i}`)}
																&nbsp;
																{this.getData(`subAddUnit2_${i}`)}
															</div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</>
								);
							})}
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	/**
	 *
	 * @param {string} src
	 * @param {string} altText
	 * @param {object} style
	 * @param {string} className
	 * @returns
	 */
	getImage(src, props = {}) {
		if (src) {
			// return <img src={this.imageReplacePRJNAME(src)} style={style} alt={altText} className={className}></img>;
			// eslint-disable-next-line jsx-a11y/alt-text
			return <img src={this.imageReplacePRJNAME(src)} {...props}></img>;
		}
		return "";
	}

	getData(name, def = "") {
		name = this.state.data[name];
		if (typeof name !== "undefined" && name !== null) return name;
		return def;
	}

	getOIDValue(oid, def = "") {
		oid = this.state.data[oid];
		if (oid && typeof this.state.values[`${oid}.val`] !== "undefined") {
			return this.state.values[`${oid}.val`];
		}
		return def;
	}

	getValueLC_formated(name, def = "") {
		name = this.state.data[name];
		if (name && typeof this.state.values[`${name}.lc`] !== "undefined") {
			return this.formatDate(this.state.values[`${name}.lc`], "", true, true, true);
		}
		return def;
	}

	/**
	 *
	 * @param {string} src
	 * @returns string
	 */
	imageReplacePRJNAME(src) {
		return src.replace("_PRJ_NAME", `/vis-2.0/${this.props.context.projectName}`);
	}
}

export default ShellyCustomOverview;
