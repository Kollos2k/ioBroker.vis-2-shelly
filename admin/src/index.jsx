import React from "react";
<<<<<<< HEAD
import ReactDOM from "react-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import * as serviceWorker from "./serviceWorker.js";
import theme from "@iobroker/adapter-react-v5/Theme";
import Utils from "@iobroker/adapter-react-v5/Components/Utils";
import App from "./App.jsx";
import pkg from "../../package.json";

let themeName = Utils.getThemeName();
// console.log(`${pkg.name}@${pkg.version} using theme "${themeName}"`);

function build() {
	ReactDOM.render(
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme(themeName)}>
				<App
					onThemeChange={(_theme) => {
						themeName = _theme;
						build();
					}}
				/>
			</ThemeProvider>
		</StyledEngineProvider>,
		document.getElementById("root"),
=======
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
>>>>>>> 0fcbb07 (Alles in TypeScript geschriben)
	);
}

build();
<<<<<<< HEAD

serviceWorker.unregister();
=======
>>>>>>> 0fcbb07 (Alles in TypeScript geschriben)
