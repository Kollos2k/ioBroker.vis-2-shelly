import React from "react";
import { withStyles } from "@mui/styles";

import WidgetDemoApp from "@iobroker/vis-2-widgets-react-dev/widgetDemoApp";
import { i18n as I18n } from "@iobroker/adapter-react-v5";

import { Checkbox, TextField } from "@mui/material";
import AllDevicesWidget from "./ShellyAllDevices";
import ByRoomDevicesWidget from "./ShellyByRoomDevices";
import translations from "./translations";
// import css from "./style.css";

const styles = (theme) => ({
	app: {},
});
class App extends WidgetDemoApp {
	constructor(props) {
		super(props);

		// var t=await(async function(){return(await getState("")).val;}
		// init translations
		I18n.extendTranslations(translations);
		this.socket.registerConnectionHandler(this.onConnectionChanged);
	}

	onConnectionChanged = (isConnected) => {
		if (isConnected) {
			this.socket.getSystemConfig().then((systemConfig) => this.setState({ systemConfig }));
		}
	};

	renderWidget() {
		const widgets = {
			allDevices: AllDevicesWidget.getWidgetInfo(),
			roomDevices: ByRoomDevicesWidget.getWidgetInfo(),
		};

		return (
			<div className={this.props.classes.app}>
				<div>
					{Object.keys(widgets).map((key) => {
						return (
							<div key={key} style={{ display: "flex", alignItems: "center" }}>
								{/* <Checkbox
								checked={!this.state.disabled[key]}
								onChange={(e) => {
									const disabled = JSON.parse(JSON.stringify(this.state.disabled));
									disabled[key] = !e.target.checked;
									window.localStorage.setItem("disabled", JSON.stringify(disabled));
									// this.setState({ disabled });
								}}
							/> */}
								{key}
							</div>
						);
					})}
				</div>
				{/* {Object.keys(widgets).map((key) => (this.state.disabled[key] ? null : widgets[key]))} */}
			</div>
		);
	}
}

export default withStyles(styles)(App);
