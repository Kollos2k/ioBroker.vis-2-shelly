import React from "react";

import "./components/customOverview.css";
import Generic from "./Generic";
import type { RxRenderWidgetProps, RxWidgetInfo, VisRxWidgetProps, VisRxWidgetState } from "@iobroker/types-vis-2";
import { basicUpdateSwitch } from "@mainLib/devices/service/DeviceActions";
import type { DeviceActionArgument } from "@mainLib/devices/service/DeviceActions";
import { switchButton, switchTRVButton } from "./components/DeviceConfig";

interface StaticRxData {
	title: string;
	titleImage: string;
	valueGroupCount: number;
	backColor: string;
	backColorOut: string;
	textColor: string;
	padding: string | number;
	margin: string | number;
	borderRadius: string | number;
	[key: `subTitle${number}`]: string;
	[key: `subOID${number}`]: string;
	[key: `subUnit${number}`]: string;
	[key: `subIcon${number}`]: string;
	[key: `subAction${number}`]: boolean | "false";
	[key: `subActionNumberStep${number}`]: number | "1";
	[key: `subRound${number}`]: "not" | "floor" | "ceil" | "fit";
	[key: `subRoundDigets${number}`]: number;
	[key: `subModifyType${number}`]: "nothing" | "multiplied by" | "divided by";
	[key: `subModifyFaktor${number}`]: number;
	[key: `subSeperator${number}`]: string;
	[key: `subAddOID1_${number}`]: string;
	[key: `subAddUnit1_${number}`]: string;
	[key: `subAddIcon1_${number}`]: string;
	[key: `subAddRound1_${number}`]: "not" | "floor" | "ceil" | "fit";
	[key: `subAddRoundDigets1_${number}`]: number;
	[key: `subAddModifyType1_${number}`]: "nothing" | "multiplied by" | "divided by";
	[key: `subAddModifyFaktor1_${number}`]: number;
	[key: `subAddOID2_${number}`]: string;
	[key: `subAddUnit2_${number}`]: string;
	[key: `subAddIcon2_${number}`]: string;
	[key: `subAddRound2_${number}`]: "not" | "floor" | "ceil" | "fit";
	[key: `subAddRoundDigets2_${number}`]: number;
	[key: `subAddModifyType2_${number}`]: "nothing" | "multiplied by" | "divided by";
	[key: `subAddModifyFaktor2_${number}`]: number;
	[key: `subHorizontal${number}`]: boolean | "false";
}

interface StaticState extends VisRxWidgetState {
	valueConfig: { [key: string]: any };
}

class ShellyCustomOverview extends Generic<StaticRxData, StaticState> {
	// Refs Map zur sauberen Speicherung von DOM-Elementen außerhalb des Render-Zyklus
	private refsMap: { [key: string]: React.RefObject<HTMLDivElement | null> } = {};

	constructor(props: VisRxWidgetProps) {
		super(props);
		console.debug(this);
		console.log("customOverview");
	}

	static getWidgetInfo(): RxWidgetInfo {
		return {
			id: "tplCustomOverviewWidget",
			visSet: "vis-2-shelly",
			visSetLabel: "vis_2_widgets_shelly",
			visSetColor: "#cf00ff",
			visName: "CustomOverview",
			visAttrs: [
				{
					name: "common",
					fields: [
						{ name: "title", label: "overview_title", type: "text" },
						{ name: "titleImage", label: "overview_titleImage", type: "image" },
						{
							name: "valueGroupCount",
							label: "overview_valueGroupCount",
							type: "number",
							default: 1,
							onChange: (field, data, changeData, _socket, _index): Promise<void> => {
								changeData(data);
								return Promise.resolve();
							},
						},
					],
				},
				{
					name: "cssstyle",
					label: "overview_cssstyle",
					fields: [
						{ name: "backColor", label: "overview_backColor", type: "color" },
						{ name: "backColorOut", label: "overview_backColorOut", type: "color" },
						{ name: "textColor", label: "overview_textColor", type: "color" },
						{ name: "padding", label: "overview_padding", type: "dimension" },
						{ name: "margin", label: "overview_margin", type: "dimension" },
						{ name: "borderRadius", label: "overview_borderRadius", type: "dimension" },
					],
				},
				{
					name: "valueGroup",
					label: "overview_group",
					indexFrom: 1,
					indexTo: "valueGroupCount",
					fields: [
						{ name: "subTitle", label: "overview_subTitle", type: "text" },
						{ name: "subOID", label: "overview_subOID", type: "id" },
						{ name: "subUnit", label: "overview_subUnit", type: "text" },
						{ name: "subIcon", label: "overview_subIcon", type: "image" },
						{ name: "subAction", label: "overview_subAction", type: "checkbox" },
						{
							name: "subActionNumberStep",
							label: "overview_subActionNStep",
							type: "number",
							hidden: '!data["subAction" + index]',
						},
						{
							name: "subRound",
							label: "overview_subRound",
							type: "select",
							options: ["not", "floor", "ceil", "fit"],
							default: "not",
						},
						{ name: "subRoundDigets", label: "overview_subRoundDigets", type: "number", default: 1 },
						{
							name: "subModifyType",
							label: "overview_subModify",
							options: ["nothing", "multiplied by", "divided by"],
							type: "select",
							default: "nothing",
						},
						{ name: "overview_subModifyFaktor", label: "eval", type: "number", default: 0 },
						{ name: "subSeperator", label: "overview_subSeperator", type: "checkbox" },
						{ name: "subAddOID1_", label: "overview_subAddOID1", type: "id" },
						{ name: "subAddUnit1_", label: "overview_subAddUnit1", type: "text" },
						{ name: "subAddIcon1_", label: "overview_subAddIcon1", type: "image" },
						{
							name: "subAddRound1_",
							label: "overview_subAddRound1",
							type: "select",
							options: ["not", "floor", "ceil", "fit"],
							default: "not",
						},
						{
							name: "subAddRoundDigets1_",
							label: "overview_subAddRoundDigets1",
							type: "number",
							default: 1,
						},
						{
							name: "subAddModifyType1_",
							label: "overview_subAddModify1",
							options: ["nothing", "multiplied by", "divided by"],
							type: "select",
							default: "nothing",
						},
						{
							name: "subAddModifyFaktor1_",
							label: "overview_subAddModifyFaktor1",
							type: "number",
							default: 0,
						},
						{ name: "subAddOID2_", label: "overview_subAddOID2", type: "id" },
						{ name: "subAddUnit2_", label: "overview_subAddUnit2", type: "text" },
						{ name: "subAddIcon2_", label: "overview_subAddIcon2", type: "image" },
						{
							name: "subAddRound2_",
							label: "overview_subAddRound2",
							type: "select",
							options: ["not", "floor", "ceil", "fit"],
							default: "not",
						},
						{
							name: "subAddRoundDigets2_",
							label: "overview_subAddRoundDigets2",
							type: "number",
							default: 1,
						},
						{
							name: "subAddModifyType2_",
							label: "overview_subAddModify2",
							options: ["nothing", "multiplied by", "divided by"],
							type: "select",
							default: "nothing",
						},
						{
							name: "subAddModifyFaktor2_",
							label: "overview_subAddModifyFaktor2",
							type: "number",
							default: 0,
						},
						{ name: "subHorizontal", label: "overview_subHR", type: "checkbox" },
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

	getWidgetInfo(): RxWidgetInfo {
		return ShellyCustomOverview.getWidgetInfo();
	}

	async onRxDataChanged(): Promise<void> {
		await this.propertiesUpdate();
	}

	onRxStyleChanged(): void {}

	async onStateUpdated(_id: string, _state: ioBroker.State | null | undefined): Promise<void> {
		if (!this.state?.valueConfig?.[_id]) {
			const obj: any = await this.props.context.socket.getObject(_id);
			this.setState((p) => ({ valueConfig: { ...p.valueConfig, [_id]: obj } }));
		} else {
			const common = this.state.valueConfig[_id]?.common;
			const domElement = this.refsMap[_id]?.current;
			if (domElement) {
				const arg: DeviceActionArgument = {
					dom: domElement,
					newVal: _state?.val,
				};
				if (common?.type === "boolean") {
					basicUpdateSwitch(arg);
				}
			}
		}
	}

	renderWidgetBody(props: RxRenderWidgetProps): React.JSX.Element | React.JSX.Element[] | null {
		super.renderWidgetBody(props);
		const valueGroup: number[] = [];
		for (let c = 1; c <= this.state.data.valueGroupCount; c++) {
			valueGroup.push(c);
		}
		const content = (
			<div
				style={{
					width: "100%",
					height: "100%",
					backgroundColor: this.state.data.backColorOut,
				}}
			>
				<div
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
									<React.Fragment key={i}>
										{this.state.data[`subSeperator${i}`] ? <hr /> : ""}

										<table style={{ width: "100%" }}>
											<tbody>
												<tr>
													<td
														rowSpan={2}
														className="vis-2-shelly-customOverview-itemIconHolder"
													>
														{this.getImage(this.getSource(`subIcon${i}`), {
															alt: "icon",
															className: "vis-2-shelly-customOverview-itemIcon",
														})}
													</td>
													<td className="vis-2-shelly-customOverview-itemTitle">
														{this.getData(`subTitle${i}`)}
													</td>
													<td className="vis-2-shelly-customOverview-itemValue">
														{this.getOIDValue(
															`subOID${i}`,
															"",
															`subRound${i}`,
															`subRoundDigets${i}`,
															`subModifyType${i}`,
															`subModifyFaktor${i}`,
															`subUnit${i}`,
															`subAction${i}`,
															i,
														)}
													</td>
												</tr>
												<tr>
													<td className="vis-2-shelly-customOverview-itemTimestamp">
														{this.getValueLC_formated(`subOID${i}`)}
													</td>
													<td className="vis-2-shelly-customOverview-itemSubItem">
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
																{this.getImage(this.getSource(`subAddIcon1_${i}`), {
																	alt: "",
																	style: { width: "15px" },
																})}
															</div>
															<div style={{ gridArea: "value1" }}>
																&nbsp;
																{this.getOIDValue(
																	`subAddOID1_${i}`,
																	"",
																	`subAddRound1_${i}`,
																	`subAddRoundDigets1_${i}`,
																	`subAddModifyType1_${i}`,
																	`subAddModifyFaktor1_${i}`,
																	`subAddUnit1_${i}`,
																)}
															</div>
															<div style={{ gridArea: "subValueSpacer" }}>
																{this.state.data[`subHorizontal${i}`] === true &&
																this.state.data[`subAddOID1_${i}`] &&
																this.state.data[`subAddOID2_${i}`]
																	? " / "
																	: ""}
															</div>
															<div
																style={{
																	display: this.state.data[`subAddIcon2_${i}`]
																		? "inline"
																		: "none",
																	gridArea: "icon2",
																}}
															>
																{this.getImage(this.getSource(`subAddIcon2_${i}`), {
																	alt: "",
																	style: { width: "15px" },
																})}
															</div>
															<div style={{ gridArea: "value2" }}>
																&nbsp;
																{this.getOIDValue(
																	`subAddOID2_${i}`,
																	"",
																	`subAddRound2_${i}`,
																	`subAddRoundDigets2_${i}`,
																	`subAddModifyType2_${i}`,
																	`subAddModifyFaktor2_${i}`,
																	`subAddUnit2_${i}`,
																)}
															</div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</React.Fragment>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		);
		return this.wrapContent(content, null, { padding: 0 }, {});
	}

	getImage(src: string, props = {}): React.JSX.Element | React.JSX.Element[] | string {
		if (src && src.length > 0) {
			return <img src={this.imageReplacePRJNAME(src)} {...props} alt="" />;
		}
		return "";
	}

	getSource(name: string): string {
		const val = this.state.data[name as keyof StaticRxData];
		return typeof val === "string" ? val : "";
	}

	getData(name: string, def = ""): string | number | boolean | null {
		const val = this.state.data[name as keyof StaticRxData];
		return typeof val !== "undefined" && val !== null ? val : def;
	}

	getOIDValue(
		oidKey: string,
		def: string = "",
		roundName: string = "",
		digetsName: string = "",
		modTypeName: string = "",
		modFaktorName: string = "",
		unit: string = "",
		actionName: string = "",
		counter: number = 0,
	): string | number | boolean | null | React.JSX.Element {
		const oid = this.state.data[oidKey as keyof StaticRxData] as string;
		if (oid && typeof this.state.values[`${oid}.val`] !== "undefined") {
			const round = this.state.data[roundName as keyof StaticRxData] as string;
			const digets = Number(this.state.data[digetsName as keyof StaticRxData]) || 0;
			const action = Boolean(this.state.data[actionName as keyof StaticRxData]);
			let value: any = this.state.values[`${oid}.val`];

			if (action && this.state?.valueConfig?.[oid]) {
				const common = this.state.valueConfig[oid]?.common;
				if (!this.refsMap[oid]) {
					this.refsMap[oid] = React.createRef<HTMLDivElement>();
				}

				switch (common?.type) {
					case "boolean":
						return (
							<div style={{ position: "relative" }} ref={this.refsMap[oid]}>
								{switchButton({
									style: { width: "30px" },
									onLoad: (evt: Event) => {
										const obj = evt.target as HTMLObjectElement;
										const node = obj.contentDocument?.firstElementChild;
										obj?.setAttribute("loadValue", "true");
										if (value) {
											node?.classList.add("active");
										}
									},
								})}
								<span
									onClick={() => {
										void this.props.context.socket.setState(oid, !value);
									}}
									style={{
										top: "0px",
										left: "0px",
										height: "100%",
										width: "100%",
										cursor: "pointer",
										position: "absolute",
									}}
								/>
							</div>
						);
					case "number":
						return (
							<div style={{ position: "relative" }} ref={this.refsMap[oid]}>
								{switchTRVButton({
									style: { height: "30px" },
								})}
								<span
									style={{
										position: "absolute",
										top: "9px",
										right: "27px",
										fontSize: "7pt",
										width: "22px",
										textAlign: "center",
										overflow: "hidden",
									}}
								>
									{value}
								</span>
								<span
									onClick={() => {
										let newVal =
											Number(value) -
											Number(this.state.data[`subActionNumberStep${counter}`] || 1);
										if (common.min !== undefined && common.min > newVal) {
											newVal = common.min;
										}
										void this.props.context.socket.setState(oid, newVal);
									}}
									style={{
										top: "0px",
										right: "48px",
										height: "100%",
										width: "30px",
										cursor: "pointer",
										position: "absolute",
									}}
								/>
								<span
									onClick={() => {
										let newVal =
											Number(value) +
											Number(this.state.data[`subActionNumberStep${counter}`] || 1);
										if (common.max !== undefined && common.max < newVal) {
											newVal = common.max;
										}
										void this.props.context.socket.setState(oid, newVal);
									}}
									style={{
										top: "0px",
										right: "0px",
										height: "100%",
										width: "30px",
										cursor: "pointer",
										position: "absolute",
									}}
								/>
							</div>
						);
				}
			}

			if (typeof value === "boolean") {
				value = value ? "true" : "false";
			} else if (!Number.isNaN(value)) {
				const modType = this.state.data[modTypeName as keyof StaticRxData];
				const modFaktor = Number(this.state.data[modFaktorName as keyof StaticRxData]);

				if (modType !== "nothing" && !Number.isNaN(value) && modFaktor > 0) {
					value = modType === "multiplied by" ? Number(value) * modFaktor : Number(value) / modFaktor;
				}
				if (round && round !== "not" && !Number.isNaN(value) && digets > 0) {
					switch (round) {
						case "floor":
							value = Math.floor(Number(value) * (digets * 10)) / (digets * 10);
							break;
						case "ceil":
							value = Math.ceil(Number(value) * (digets * 10)) / (digets * 10);
							break;
					}
					return `${Number(value).toFixed(digets)} ${this.getData(unit)}`;
				}
			}
			return `${value} ${this.getData(unit)}`;
		}
		return def;
	}

	getValueLC_formated(name: string, def = ""): string | number | React.JSX.Element {
		const valName = this.state.data[name as keyof StaticRxData] as string;
		if (valName && typeof this.state.values[`${valName}.lc`] !== "undefined") {
			return this.formatDate(this.state.values[`${valName}.lc`], "", true, true, true);
		}
		return def;
	}

	imageReplacePRJNAME(src: string): string {
		return src.replace("_PRJ_NAME", `/vis-2.0/${this.props.context.projectName}`);
	}
}

export default ShellyCustomOverview;
