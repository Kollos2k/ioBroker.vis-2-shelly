/* eslint-disable indent */
import React from "react";
import { I18n } from "@iobroker/adapter-react-v5";
import { withStyles } from "@mui/styles";
import { Button, Tabs, Tab } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// eslint-disable-next-line arrow-body-style
const styles = (_theme) => ({
	dialog: {
		position: "fixed",
		backgroundColor: "gray",
		color: "aliceblue",
		width: "100%",
		maxWidth: "500px",
		height: "calc(100dvh - 20px)",
		zIndex: "2",
		top: "0px",
		marginTop: "5px",
		padding: "5px",
		borderTopLeftRadius: "15px",
		borderTopRightRadius: "15px",
		display: "grid",
		gridTemplateAreas: "'head head' 'tabs content'",
		gridTemplateColumns: "50px auto",
		gridTemplateRows: "50px auto",
		gridGap: "0",
	},
	dialogHead: {
		gridArea: "head",
		display: "grid",
		gridTemplateAreas: "'back title'",
		gridTemplateColumns: "100px auto",
	},
	tabs: { gridArea: "tabs" },
	tab: {
		color: "white",
		backgroundColor: "#222",
		border: "1px solid gray",
		minWidth: "45px",
	},
	tabFirst: {
		borderTopLeftRadius: "10px",
	},
	tabLast: {
		borderBottomLeftRadius: "10px",
	},
	tabContent: {
		gridArea: "content",
		padding: "10px",
		color: "white",
		backgroundColor: "#222",
	},
	tabContentTitle: {
		verticalAlign: "center",
	},
	closeButton: {
		color: "white",
		fontSize: "35pt",
		paddingTop: "0px",
		height: "40px",
		"&:hover": {
			border: "1px solid darkgray",
		},
	},
	titleLabel: {
		marginLeft: "10px",
		fontWeight: "bold",
	},
});
// let css = {};

class DeviceDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = { currentTab: this.props.typeConfig.dialog.tabs[0].name };
	}
	// eslint-disable-next-line class-methods-use-this, no-empty-function
	async propertiesUpdate() {}

	async componentDidMount() {
		await this.propertiesUpdate();
	}

	hideDeviceOptions() {
		this.props.parentThis.hideDeviceOptions();
	}

	render() {
		return (
			<div className={this.props.classes.dialog}>
				<div id="responsive-dialog-title" className={this.props.classes.dialogHead}>
					<Button
						onClick={() => {
							this.hideDeviceOptions();
						}}
						className={this.props.classes.closeButton}
						autoFocus
					>
						&larr;
					</Button>
					<span
						className={this.props.classes.titleLabel}
						onClick={() => {
							this.hideDeviceOptions();
						}}
					>
						{typeof this.props.name === "object" ? this.props.name.val : ""}
					</span>
				</div>
				<Tabs
					orientation="vertical"
					indicatorColor="secondary"
					value={this.state.currentTab || this.props.typeConfig.dialog.tabs[0].name}
					onChange={(e, value) => {
						this.setState({ currentTab: value });
					}}
					className={this.props.classes.tabs}
				>
					{this.props.typeConfig.dialog.tabs.map((tab, index) => {
						return (
							<Tab
								key={tab.name}
								value={tab.name}
								label={I18n.t(tab.title)}
								className={[
									this.props.classes.tab,
									index === 0 ? this.props.classes.tabFirst : {},
									index === this.props.typeConfig.dialog.tabs.length - 1
										? this.props.classes.tabLast
										: {},
								]}
								title={tab.tooltip ? I18n.t(tab.tooltip) : undefined}
							/>
						);
					})}
				</Tabs>
				{this.props.typeConfig.dialog.tabs.map((tab, index) => {
					if (this.state.currentTab) {
						if (this.state.currentTab !== tab.name) {
							return null;
						}
					} else if (index !== 0) {
						return null;
					}
					return (
						<div value={tab.name} key={tab.name} className={this.props.classes.tabContent}>
							<div className={this.props.classes.tabContentTitle}>{tab.content.title}</div>
							{typeof tab.content.body === "function"
								? tab.content.body({
										dataPoint: this.props.dataPoint,
										state: this.props.state,
										socket: this.props.socket,
										maxVisibleHeight: window.innerHeight - 130,
										typeConfig: this.props.typeConfig,
									})
								: tab.content.body}
						</div>
					);
				})}
			</div>
		);
	}
}
export default withStyles(styles)(DeviceDialog);
