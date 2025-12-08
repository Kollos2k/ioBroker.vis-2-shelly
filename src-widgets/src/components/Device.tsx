import React from "react";
// import { withStyles } from "@mui/styles";
import "./device.css";
import DeviceDialog from "./DeviceDialog";
import type { Theme as muiTheme } from "@mui/material/styles";
import { createStyles, withStyles } from "@mui/styles";
import type { WithStyles } from "@mui/styles";
import type { TypeConfig } from "./DeviceConfig";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars
const styles = (theme: muiTheme) =>
	createStyles({
		showDialogButton: {
			cursor: "pointer",
		},
	});
// let css = {};
interface DeviceProps extends WithStyles<typeof styles> {
	socket: any;
	dataPoint: { [key: string]: string };
	typeConfig: TypeConfig;
	state: { [key: string]: any };
	deviceDomID: string;
	stateID: string;
	type: string;
	id: string;
	relay: number | string;
	widID: string;
}
interface DeviceState {
	hasDeviceDialog: boolean;
	showDeviceDialog: boolean;
}

export class Device extends React.Component<DeviceProps, DeviceState> {
	el = React.createRef();

	components: { [key: string]: any } = {};

	constructor(props: DeviceProps) {
		super(props);
		this.state = {
			showDeviceDialog: false,
			hasDeviceDialog:
				typeof this.props.typeConfig.dialog !== "undefined" &&
				typeof this.props.typeConfig.dialog.tabs !== "undefined",
		};
		props.socket.subscribeState(Object.values(props.dataPoint), (id: string, state: ioBroker.State) => {
			void this.stateChange(id, state);
		});
		// console.log("device");
	}

	stateChange(id: string, state: ioBroker.State | undefined): boolean {
		this.props.state[id] = state;
		if (typeof this.props.typeConfig.update === "undefined") {
			return false;
		}
		let idKey: string | undefined;
		Object.entries(this.props.dataPoint).forEach(([k, v]) => {
			if (v === id) {
				idKey = k;
			}
		});
		if (idKey === undefined) {
			return false;
		}
		if (typeof this.props.typeConfig.update[idKey] === "undefined") {
			return false;
		}
		const updateKey =
			typeof this.props.typeConfig.update[idKey].viewPoint !== "undefined"
				? this.props.typeConfig.update[idKey].viewPoint
				: idKey;
		if (typeof this.components[updateKey] === "undefined") {
			return false;
		}
		if (typeof this.props.typeConfig.update[idKey].updateValue === "function") {
			const val = state === undefined || state.val === undefined ? "" : state === null ? "" : state.val;
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

	propertiesUpdate(): void {
		if (typeof this.props.state !== "undefined" && this.props.state !== null) {
			Object.values(this.props.dataPoint).forEach((value) => {
				if (typeof this.props.state[value] !== "undefined") {
					this.stateChange(value, this.props.state[value]);
				}
			});
		}
	}

	componentDidMount(): void {
		this.propertiesUpdate();
	}

	showDeviceOptions(): boolean {
		if (this.state.hasDeviceDialog) {
			this.setState({ showDeviceDialog: !this.state.showDeviceDialog }, () => {});
			console.log("onclick intern");
			console.log(this.props.typeConfig.dialog);
		}
		console.log("onclick");
		return false;
	}

	// eslint-disable-next-line react/no-unused-class-component-methods
	hideDeviceOptions(): void {
		this.setState({ showDeviceDialog: false }, () => {});
	}

	render(): React.JSX.Element {
		if (typeof this.props.typeConfig.action === "undefined") {
			this.props.typeConfig.action = {};
		}
		this.components.icon = React.createRef();
		this.components.name = React.createRef();
		return (
			<div
				id={this.props.deviceDomID}
				className="vis2_shelly_DeviceBody"
				title={this.props.stateID}
				// ref={this.el}
				// style={"width:200px"}
			>
				<span {...{ name: "status" }}>
					<span>
						<span className="connectionState connectionStateOnline"></span>
					</span>
				</span>
				<span {...{ name: "icon" }} ref={this.components.icon}></span>
				<span
					{...{ name: "name" }}
					ref={this.components.name}
					onClick={() => {
						return this.showDeviceOptions();
					}}
					// className={this.state.hasDeviceDialog ? this.props.classes.showDialogButton : {}}
				>
					{this.props.id}
				</span>
				<span
					{...{ name: "info" }}
					// className={this.state.hasDeviceDialog ? this.props.classes.showDialogButton : {}}
					onClick={() => {
						return this.showDeviceOptions();
					}}
				>
					{this.props.typeConfig.view !== undefined ? (
						Object.entries(this.props.typeConfig.view.info).map(([viewKey, viewVal]) => {
							if (typeof viewVal === "object" && viewVal != null) {
								this.components[viewVal.name] = React.createRef();
								return (
									<span
										{...{ name: viewVal.name }}
										className={viewVal.class}
										ref={this.components[viewVal.name]}
										key={`${this.props.deviceDomID}info${viewKey}`}
									>
										{viewVal.html}
									</span>
								);
							}
						})
					) : (
						<></>
					)}
				</span>
				<span {...{ name: "action" }}>
					{this.props.typeConfig.view !== undefined ? (
						Object.entries(this.props.typeConfig.view.action).map(([viewKey, viewVal]) => {
							if (typeof viewVal === "object" && viewVal != null) {
								this.components[viewVal.name] = React.createRef();
								return (
									<span
										{...{ name: viewVal.name }}
										className={viewVal.class}
										style={viewVal.style}
										ref={this.components[viewVal.name]}
										key={`${this.props.deviceDomID}vaction${viewKey}`}
									>
										{viewVal.html}
									</span>
								);
							}
						})
					) : (
						<></>
					)}
					{Object.entries(this.props.typeConfig.action).map(([actionKey, actionVal]) => {
						if (typeof actionVal === "object" && actionVal != null) {
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
										if (typeof actionVal.click === "function") {
											actionVal.click({
												dom: this.el.current,
												dataPoint: this.props.dataPoint,
												action: actionVal,
												socket: this.props.socket,
												state: this.props.state,
												event: e,
											});
										}
									}}
									key={`${this.props.deviceDomID}action${actionKey}`}
								/>
							);
						}
					})}
				</span>
				{this.state.hasDeviceDialog && this.state.showDeviceDialog && (
					<DeviceDialog
						parent={this}
						dataPoint={this.props.dataPoint}
						state={this.props.state}
						typeConfig={this.props.typeConfig}
						name={this.props.state[this.props.dataPoint.name]}
						socket={this.props.socket}
					/>
				)}
			</div>
		);
	}
}
// export default withStyles(styles)(Device);
export default withStyles(styles)(Device);
