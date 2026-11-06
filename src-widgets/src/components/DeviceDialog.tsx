import React from "react";
import { I18n } from "@iobroker/gui-components";
import { Button, Tabs, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Device } from "./Device";
import clsx from "clsx";

// Moderne Styled Components (ersetzen @mui/styles)
const DialogRoot = styled("div")({
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
});

const DialogHead = styled("div")({
	gridArea: "head",
	display: "grid",
	gridTemplateAreas: "'back title'",
	gridTemplateColumns: "100px auto",
});

const StyledTabs = styled(Tabs)({
	gridArea: "tabs",
});

const StyledTab = styled(Tab)({
	color: "white",
	backgroundColor: "#222",
	border: "1px solid gray",
	minWidth: "45px",
});

const TabFirst = {
	borderTopLeftRadius: "10px",
};

const TabLast = {
	borderBottomLeftRadius: "10px",
};

const TabContent = styled("div")({
	gridArea: "content",
	padding: "10px",
	color: "white",
	backgroundColor: "#222",
});

const TabContentTitle = styled("div")({
	verticalAlign: "center",
});

const CloseButton = styled(Button)({
	color: "white",
	fontSize: "35pt",
	paddingTop: "0px",
	height: "40px",
	"&:hover": {
		border: "1px solid darkgray",
	},
});

const TitleLabel = styled("span")({
	marginLeft: "10px",
	fontWeight: "bold",
});

interface componentState {
	currentTab: string;
}
interface componentProps {
	typeConfig: { [key: string]: any };
	parent: Device;
	name: ioBroker.State;
	dataPoint: { [key: string]: string };
	state: { [key: string]: any };
	socket: any;
}

class DeviceDialog extends React.Component<componentProps, componentState> {
	constructor(props: componentProps) {
		super(props);
		this.state = { currentTab: this.props.typeConfig.dialog.tabs[0].name };
	}

	// eslint-disable-next-line class-methods-use-this
	propertiesUpdate(): void {}

	componentDidMount(): void {
		this.propertiesUpdate();
	}

	hideDeviceOptions(): void {
		this.props.parent.hideDeviceOptions();
	}

	render(): React.JSX.Element {
		return (
			<DialogRoot>
				<DialogHead id="responsive-dialog-title">
					<CloseButton
						onClick={() => {
							this.hideDeviceOptions();
						}}
						autoFocus
					>
						&larr;
					</CloseButton>
					<TitleLabel
						onClick={() => {
							this.hideDeviceOptions();
						}}
					>
						{typeof this.props.name === "object" ? this.props.name.val : ""}
					</TitleLabel>
				</DialogHead>
				<StyledTabs
					orientation="vertical"
					indicatorColor="secondary"
					value={this.state.currentTab || this.props.typeConfig.dialog.tabs[0].name}
					onChange={(e, value) => {
						this.setState({ currentTab: value });
					}}
				>
					{this.props.typeConfig.dialog.tabs.map((tab: any, index: number) => {
						return (
							<StyledTab
								key={tab.name}
								value={tab.name}
								label={I18n.t(tab.title)}
								className={clsx(
									index === 0 ? TabFirst : undefined,
									index === this.props.typeConfig.dialog.tabs.length - 1 ? TabLast : undefined,
								)}
								title={tab.tooltip ? I18n.t(tab.tooltip) : undefined}
							/>
						);
					})}
				</StyledTabs>
				{this.props.typeConfig.dialog.tabs.map((tab: any, index: number) => {
					if (this.state.currentTab) {
						if (this.state.currentTab !== tab.name) {
							return null;
						}
					} else if (index !== 0) {
						return null;
					}
					return (
						<TabContent key={tab.name}>
							<TabContentTitle>{tab.content.title}</TabContentTitle>
							{typeof tab.content.body === "function"
								? tab.content.body({
										dataPoint: this.props.dataPoint,
										state: this.props.state,
										socket: this.props.socket,
										maxVisibleHeight: window.innerHeight - 130,
										typeConfig: this.props.typeConfig,
									})
								: tab.content.body}
						</TabContent>
					);
				})}
			</DialogRoot>
		);
	}
}
export default DeviceDialog;
