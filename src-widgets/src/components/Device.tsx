import React from "react";
import "./device.css";
import DeviceDialog from "./DeviceDialog";
import type { TypeConfig } from "./DeviceConfig";

interface DeviceProps {
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
	el = React.createRef<HTMLDivElement>();
	components: { [key: string]: React.RefObject<HTMLSpanElement | null> } = {};

	constructor(props: DeviceProps) {
		super(props);
		this.state = {
			showDeviceDialog: false,
			hasDeviceDialog:
				typeof this.props.typeConfig.dialog !== "undefined" &&
				typeof this.props.typeConfig.dialog.tabs !== "undefined",
		};

		// Feste Basis-Refs initialisieren
		this.components.icon = React.createRef<HTMLSpanElement>();
		this.components.name = React.createRef<HTMLSpanElement>();

		props.socket.subscribeState(Object.values(props.dataPoint), (id: string, state: ioBroker.State) => {
			void this.stateChange(id, state);
		});
	}

	// Hilfsmethode zur sicheren Ref-Ermittlung
	private getRef(name: string): React.RefObject<HTMLSpanElement | null> {
		if (!this.components[name]) {
			this.components[name] = React.createRef<HTMLSpanElement>();
		}
		return this.components[name];
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
				dom: this.components[updateKey]?.current,
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
				dom: this.components[idKey]?.current,
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
			this.setState({ showDeviceDialog: !this.state.showDeviceDialog });
		}
		return false;
	}

	// eslint-disable-next-line react/no-unused-class-component-methods
	hideDeviceOptions(): void {
		this.setState({ showDeviceDialog: false });
	}

	render(): React.JSX.Element {
		if (typeof this.props.typeConfig.action === "undefined") {
			this.props.typeConfig.action = {};
		}

		return (
			<div
				id={this.props.deviceDomID}
				className="vis2_shelly_DeviceBody"
				title={this.props.stateID}
				ref={this.el}
			>
				<span {...{ name: "status" }}>
					<span>
						<span className="connectionState connectionStateOnline"></span>
					</span>
				</span>
				<span {...{ name: "icon" }} ref={this.getRef("icon")}></span>
				<span {...{ name: "name" }} ref={this.getRef("name")} onClick={() => this.showDeviceOptions()}>
					{this.props.id}
				</span>
				<span {...{ name: "info" }} onClick={() => this.showDeviceOptions()}>
					{this.props.typeConfig.view !== undefined ? (
						Object.entries(this.props.typeConfig.view.info).map(([viewKey, viewVal]) => {
							if (typeof viewVal === "object" && viewVal != null) {
								return (
									<span
										{...{ name: viewVal.name }}
										className={viewVal.class}
										ref={this.getRef(viewVal.name)}
										key={`${this.props.deviceDomID}info${viewKey}`}
									>
										{viewVal.html}
									</span>
								);
							}
							return null;
						})
					) : (
						<></>
					)}
				</span>
				<span {...{ name: "action" }}>
					{this.props.typeConfig.view !== undefined ? (
						Object.entries(this.props.typeConfig.view.action).map(([viewKey, viewVal]) => {
							if (typeof viewVal === "object" && viewVal != null) {
								return (
									<span
										{...{ name: viewVal.name }}
										className={viewVal.class}
										style={viewVal.style}
										ref={this.getRef(viewVal.name)}
										key={`${this.props.deviceDomID}vaction${viewKey}`}
									>
										{viewVal.html}
									</span>
								);
							}
							return null;
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
						return null;
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

export default Device;
