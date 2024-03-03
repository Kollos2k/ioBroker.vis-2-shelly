import React, { Component, useRef } from "react";
import ReactDOM from "react-dom/client";
import { withStyles } from "@mui/styles";
import "./device.css";
import { object } from "prop-types";

const styles = (theme) => ({});
// let css = {};

class Device extends Component {
	el = React.createRef(null);

	components = {};

	constructor(props) {
		super(props);
		props.socket.subscribeState(Object.values(props.dataPoint), (id, state) => {
			this.stateChange(id, state);
		});
	}

	async stateChange(id, state) {
		this.props.state[id] = state;
		if (typeof this.props.typeConfig.update === "undefined") return false;
		let idKey;
		Object.entries(this.props.dataPoint).forEach(([k, v]) => {
			if (v === id) idKey = k;
		});
		if (typeof this.props.typeConfig.update[idKey] === "undefined") return false;
		const updateKey =
			typeof this.props.typeConfig.update[idKey].viewPoint !== "undefined"
				? this.props.typeConfig.update[idKey].viewPoint
				: idKey;
		if (typeof this.components[updateKey] === "undefined") return false;
		if (typeof this.props.typeConfig.update[idKey].updateValue === "function") {
			const val = typeof state === "undefined" ? "" : state === null ? "" : state.val;
			this.props.typeConfig.update[idKey].updateValue({
				dom: this.components[updateKey].current,
				newVal: val,
				config: this.props.typeConfig.update[idKey],
				socket: this.props.socket,
				dataPoint: this.props.dataPoint,
				state: this.props.state,
			});
		}
		if (typeof this.props.typeConfig.update[idKey].updateAck === "function") {
			const ack = typeof state === "undefined" ? "" : state === null ? "" : state.ack;
			this.props.typeConfig.update[idKey].updateAck({
				dom: this.components[idKey].current,
				newAck: ack,
				config: this.props.typeConfig.update[idKey],
				socket: this.props.socket,
				dataPoint: this.props.dataPoint,
				state: this.props.state,
			});
		}
		return true;
	}

	async propertiesUpdate() {
		if (typeof this.props.state !== "undefined" && this.props.state !== null) {
			Object.values(this.props.dataPoint).forEach((value) => {
				if (typeof this.props.state[value] !== "undefined") {
					this.stateChange(value, this.props.state[value]);
				}
			});
		}
	}

	async componentDidMount() {
		await this.propertiesUpdate();
	}

	render() {
		if (typeof this.props.typeConfig.action === "undefined") this.props.typeConfig.action = {};
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
						this.components[viewVal.name] = React.createRef(null);
						return (
							<span
								name={viewVal.name}
								className={viewVal.class}
								style={viewVal.style}
								ref={this.components[viewVal.name]}
							>
								{viewVal.html}
							</span>
						);
					})}
					{Object.values(this.props.typeConfig.action).map((actionVal) => {
						return (
							<div
								className="actionButton"
								style={{
									top: actionVal.y,
									left: actionVal.x,
									height: actionVal.h,
									width: actionVal.w,
								}}
								onClick={(e) => {
									actionVal.click({
										dom: this.el.current,
										dataPoint: this.props.dataPoint,
										options: actionVal,
										socket: this.props.socket,
										state: this.props.state,
										event: e,
									});
								}}
							/>
						);
					})}
				</span>
			</div>
		);
	}
}
export default withStyles(styles)(Device);
