// @ts-ignore
import React, { useEffect, useState, useRef } from "react";
import { withStyles } from "@mui/styles";
import { AdminConnection, Loader, I18n } from "@iobroker/adapter-react-v5";
import { SnackbarProvider } from "notistack";

import GenericApp from "@iobroker/adapter-react-v5/GenericApp";
// @ts-ignore
import Settings from "./components/settings";
import { AppBar, Tabs, Tab } from "@mui/material";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import TabRooms from "./tabs/Rooms";
import TabNames from "./tabs/Devicename";

const styles = (_theme) => ({
	root: {},
	tabContentDiv: {
		padding: "10px",
		position: "relative",
	},
	tabContentIFrame: {
		padding: 10,
		paddingTop: 0,
		position: "relative",
	},
	tab: {
		width: "100%",
		minHeight: "100%",
	},
	selected: {
		color: _theme.palette.mode === "dark" ? undefined : "#FFF !important",
	},
	indicator: {
		backgroundColor: _theme.palette.mode === "dark" ? _theme.palette.secondary.main : "#FFF",
	},
});
const tabs = [
	{
		name: "roomsTab",
		title: I18n.t("tabRooms"),
		component: TabRooms,
		tooltip: "Rooms",
	},
];

class App extends GenericApp {
	constructor(props) {
		const extendedProps = {
			...props,
			encryptedFields: ["pass"],
			translations: {
				en: require("./i18n/en.json"),
				de: require("./i18n/de.json"),
				ru: require("./i18n/ru.json"),
				pt: require("./i18n/pt.json"),
				nl: require("./i18n/nl.json"),
				fr: require("./i18n/fr.json"),
				it: require("./i18n/it.json"),
				es: require("./i18n/es.json"),
				pl: require("./i18n/pl.json"),
				uk: require("./i18n/uk.json"),
				"zh-cn": require("./i18n/zh-cn.json"),
			},
		};
		// extendedProps.sentryDSN = window.sentryDSN;
		extendedProps.socket = { port: parseInt(window.location.port, 10) };
		// only for debug purposes
		if (extendedProps.socket.port === 3000) {
			extendedProps.socket.port = 8081;
		}
		extendedProps.Connection = AdminConnection;
		super(props, extendedProps);
		// console.log("this");
		// console.log(this);
	}
	// @ts-ignore
	onPrepareLoad(native) {
		/*
		//////// getObjectView EXAMPLE
		this.socket
			.getObjectViewCustom("system", "channel", `vis-shelly.${this.instance}.rooms.`, `vis-shelly.0.rooms.\u9999`)
			.then((objects) => {
				console.log("rdy");
				console.log(objects);
				Object.keys(objects).forEach((key) => {
					console.log(key);
					console.log(objects[key]._id);
				});
			});
			*/
		// console.log("onPrepareLoad");
		// console.log(native);
		// if (typeof this.state.native["rooms"] == "undefined") {
		// 	console.log(native.rooms);
		// 	console.log("rooms undefined");
		// 	native.rooms = { test: "bla" };

		// 	console.log(typeof native.rooms);
		// 	// this.props.changeNative(native);
		// 	console.log(typeof native.rooms);
		// 	this.setState({ native: native });
		// } else {
		// 	console.log(native.rooms);
		// }
		// console.log(native.rooms);
		// settings.pass = this.decode(settings.pass);
		native.deviceNames = {};
		console.debug(this.socket.getState(`vis-2-shelly.${this.instance}.devices.ids`));
		// this.socket.setState(`vis-shelly.${this.instance}.devices.roomIds`, {
		// 	val: JSON.stringify(roomEnum),
		// 	ack: true,
		// });
	}

	onPrepareSave(native) {
		console.log("onPrepareSave");
		this.updateRoomsList(native);
		return native;
	}

	updateRoomsList(native) {
		const roomEnum = {};
		console.log("native");
		console.log(native);
		for (const roomKey of Object.keys(native.rooms)) {
			const curRoom = native.rooms[roomKey];
			roomEnum[curRoom.id] = curRoom.name;
		}
		this.socket
			.getObjectViewCustom(
				"system",
				"device",
				`vis-2-shelly.${this.instance}.devices.`,
				`vis-2-shelly.0.devices.\u9999`,
			)
			.then((objects) => {
				console.log("rdy");
				console.log(objects);
				Object.keys(objects).forEach((key) => {
					const dev = objects[key];
					const devName = [...dev._id.matchAll(/[.]([^.]*[.][0-9]*)$/g)];
					if (devName.length == 0) return;
					this.socket
						.setObject(`vis-2-shelly.${this.instance}.devices.${devName[0][1]}.room`, {
							type: "state",
							common: {
								name: "room",
								// type: "multistate",
								type: "string",
								role: "name",
								read: true,
								write: true,
								states: roomEnum,
							},
							native: {},
						})
						.then(() => {
							// console.log("Save:" + `vis-shelly.${this.instance}.devices.${devName[0][1]}.room`);
						})
						.catch((err) => console.log(err));
				});
			});
		this.socket
			.setObject(`vis-2-shelly.${this.instance}.devices.roomIds`, {
				type: "state",
				common: {
					name: "room",
					type: "array",
					read: true,
					write: false,
				},
				native: {},
			})
			.then(() => {
				// console.log("Save:" + `vis-shelly.${this.instance}.devices.${devName[0][1]}.room`);
				this.socket.setState(`vis-2-shelly.${this.instance}.devices.roomIds`, {
					val: JSON.stringify(roomEnum),
					ack: true,
				});
			})
			.catch((err) => console.log(err));
	}

	onConnectionReady() {
		super.onConnectionReady();
		console.log("connection Ready");
		this.updateDimensions();
	}

	updateDimensions() {
		const header = document.getElementById("myHeader");
		const content = document.getElementById("myContent");
		const footer = document.getElementById("myFooter");
		if (header && content && footer) {
			const footer2 = footer.getElementsByClassName("MuiToolbar-root")[0];
			// const tHead = document.getElementsByTagName("th");
			content.style.top = header.clientHeight + 10 + "px";
			// @ts-ignore
			content.style.height = `calc(100dvh - ${header.clientHeight + 10}px - ${footer2.offsetHeight + 5}px)`;
			// tHead[0].className={`${tHead[0].className},`}
			// tHead[0].style.width = "30px";
		}
	}

	// componentDidMount() {
	// 	window.addEventListener("resize", this.updateDimensions);
	// }
	// componentWillUnmount() {
	// 	window.removeEventListener("resize", this.updateDimensions);
	// }
	render() {
		console.debug("THIS");
		console.debug(this);

		if (!this.state.loaded) {
			return (
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={this.state.theme}>
						<Loader theme={this.state.themeType} />
					</ThemeProvider>
				</StyledEngineProvider>
			);
		}

		return (
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={this.state.theme}>
					<SnackbarProvider>
						<div className="App" onLoad={this.updateDimensions}>
							<AppBar id="myHeader">
								<Tabs
									indicatorColor="secondary"
									value={this.state.selectedTab || tabs[0].name}
									// @ts-ignore
									onChange={(e, value) => this.setState({ selectedTab: value })}
									variant="scrollable"
									scrollButtons="auto"
									// @ts-ignore
									classes={{ indicator: this.props.classes.indicator }}
								>
									{tabs.map((tab) => (
										<Tab
											value={tab.name}
											// @ts-ignore
											classes={{ selected: this.props.classes.selected }}
											label={
												tab.icon ? (
													<>
														{tab.icon}
														{I18n.t(tab.title)}
													</>
												) : (
													I18n.t(tab.title)
												)
											}
											data-name={tab.name}
											key={tab.name}
											title={tab.tooltip ? I18n.t(tab.tooltip) : undefined}
										/>
									))}
								</Tabs>
							</AppBar>

							<div
								id="myContent"
								className={
									// @ts-ignore
									this.isIFrame
										? // @ts-ignore
											this.props.classes.tabContentIFrame
										: // @ts-ignore
											this.props.classes.tabContentDiv
								}
								// style={{ paddingTop: document.getElementById("myTabHolder")?.clientHeight }}
							>
								{tabs.map((tab, index) => {
									const TabComponent = tab.component;
									if (this.state.selectedTab) {
										if (this.state.selectedTab !== tab.name) {
											return null;
										}
									} else if (index !== 0) {
										return null;
									}

									return (
										<TabComponent
											key={tab.name}
											// formulaDisabled={
											// 	this.state.native.params.slave === "1" ||
											// 	this.state.native.params.slave === 1
											// }
											common={this.common}
											socket={this.socket}
											native={this.state.native}
											onError={(text) =>
												this.setState({
													errorText:
														(text || text === 0) && typeof text !== "string"
															? text.toString()
															: text,
												})
											}
											onLoad={(native) => this.onLoadConfig(native)}
											instance={this.instance}
											adapterName={this.adapterName}
											changed={this.state.changed}
											onChange={(attr, value, cb) => this.updateNativeValue(attr, value, cb)}
											changeNative={(value) =>
												this.setState({ native: value, changed: this.getIsChanged(value) })
											}
											// rooms={this.state.rooms}
										/>
									);
								})}
							</div>
							<div id="myFooter">
								{this.renderError()}
								{this.renderToast()}
								{this.renderSaveCloseButtons()}
							</div>
						</div>
					</SnackbarProvider>
				</ThemeProvider>
			</StyledEngineProvider>
		);
	}
}
// @ts-ignore
export default withStyles(styles)(App);
