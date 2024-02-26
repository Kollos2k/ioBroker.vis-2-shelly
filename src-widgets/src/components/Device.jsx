import React, { Component, useRef } from "react";
import ReactDOM from "react-dom/client";
import { withStyles } from "@mui/styles";
import "./device.css";

const styles = (theme) => ({});
// let css = {};

class Device extends Component {
	el = React.createRef(null);
	components = {};

	constructor(props) {
		super(props);

		// const myContainer = useRef(null);
		props.socket.subscribeState(Object.values(props.dataPoint), (id, state) => {
			this.stateChange(id, state);
		});
	}

	async stateChange(id, state) {
		// console.debug("STATE CHANGE");
		// console.debug(id);
		// console.debug(state);
		const that = this;
		if (typeof that.props.typeConfig.update === "undefined") return false;
		let idKey;
		Object.entries(that.props.dataPoint).forEach(([k, v]) => {
			if (v === id) idKey = k;
		});
		if (typeof this.components[idKey] === "undefined") return false;
		if (typeof this.props.typeConfig.update[idKey] === "undefined") return false;
		if (typeof this.props.typeConfig.update[idKey].updateValue === "function") {
			const val = typeof state === "undefined" ? "" : state === null ? "" : state.val;
			this.props.typeConfig.update[idKey].updateValue({
				dom: this.components[idKey].current,
				newVal: val,
				config: this.props.typeConfig.update[idKey],
				socket: this.props.socket,
			});
		}
	}

	async propertiesUpdate() {
		// if (typeof this.props.typeConfig.update[sType] === "undefined") return false;
		// const configUpdate = this.props.typeConfig.update[sType];
		// const $domDev = $("#" + widgetID).find("#" + deviceDomID);
		// if ($domDev.length === 0) return false;
		// const $dom = $domDev.find("[name='" + configUpdate.name + "']");
		// if ($dom.length === 0) return false;
		// var data = $domDev.data("data");
		// if (typeof data !== "undefined") {
		// 	if (typeof data[sID] === "undefined" || data[sID] === null) data[sID] = { val: "" };
		// 	if (typeof newVal === "undefined") {
		// 		newVal = data[sID].val;
		// 	} else {
		// 		if (typeof newVal === "object") data[sID] = newVal;
		// 		else data[sID].val = newVal;
		// 		if (typeof newVal === "object") newVal = newVal.val;
		// 		$domDev.data("data", data);
		// 	}
		// 	configUpdate.updateValue($dom, newVal, configUpdate, data, sID, dataPoint);
		// }
	}

	async componentDidMount() {
		await this.propertiesUpdate();
	}

	render() {
		this.components.icon = React.createRef(null);
		this.components.name = React.createRef(null);
		return (
			<div
				id={this.props.deviceDomID}
				className="vis2_shelly_DeviceBody"
				title={this.props.stateID}
				ref={this.el}
				// style={"width:200px"}
			>
				<span name="status">
					<span>
						<span className="connectionState connectionStateOnline"></span>
					</span>
				</span>
				<span name="icon" ref={this.components.icon}></span>
				<span name="name" ref={this.components.name}>
					{this.props.id}
				</span>
				<span name="info">
					{Object.entries(this.props.typeConfig.view.info).map(([viewKey, viewVal]) => {
						this.components[viewVal.name] = React.createRef(null);
						return (
							<span name={viewVal.name} className={viewVal.class} ref={this.components[viewVal.name]}>
								{viewVal.html}
							</span>
						);
					})}
				</span>
				<span name="action">
					{Object.entries(this.props.typeConfig.view.action).map(([viewKey, viewVal]) => {
						return <span name={viewVal.name}>{viewVal.html}</span>;
					})}
				</span>
			</div>
		);
	}
}
export default withStyles(styles)(Device);
