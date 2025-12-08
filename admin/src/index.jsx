import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import theme from "@iobroker/adapter-react/Theme";
import Utils from "@iobroker/adapter-react/Components/Utils";
import App from "./app";

let themeName = Utils.getThemeName();

function build() {
	const root = createRoot(document.getElementById("root"));
	root.render(
		<ThemeProvider theme={theme(themeName)}>
			<App
				adapterName="vis-2-shelly"
				onThemeChange={(_theme) => {
					themeName = _theme;
					build();
				}}
			/>
		</ThemeProvider>,
	);
}

build();
