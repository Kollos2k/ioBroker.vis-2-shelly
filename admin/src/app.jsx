import React from "react";
import { withStyles } from "@mui/styles";
import GenericApp from "@iobroker/adapter-react/build/GenericApp";
import Settings from "./components/settings";

import enLang from "./i18n/en.json";
import deLang from "./i18n/de.json";
import ruLang from "./i18n/ru.json";
import ptLang from "./i18n/pt.json";
import nlLang from "./i18n/nl.json";
import frLang from "./i18n/fr.json";
import itLang from "./i18n/it.json";
import esLang from "./i18n/es.json";
import plLang from "./i18n/pl.json";
import ukLang from "./i18n/uk.json";
import zhCnLang from "./i18n/zh-cn.json";

const styles = (_theme) => ({
	root: {},
});

class App extends GenericApp {
	constructor(props) {
		const extendedProps = {
			...props,
			encryptedFields: [],
			translations: {
				en: enLang,
				de: deLang,
				ru: ruLang,
				pt: ptLang,
				nl: nlLang,
				fr: frLang,
				it: itLang,
				es: esLang,
				pl: plLang,
				uk: ukLang,
				"zh-cn": zhCnLang,
			},
		};
		super(props, extendedProps);
	}

	onConnectionReady() {
		// executed when connection is ready
	}

	render() {
		if (!this.state.loaded) {
			return super.render();
		}

		return (
			<div className="App">
				<Settings native={this.state.native} onChange={(attr, value) => this.updateNativeValue(attr, value)} />
				{this.renderError()}
				{this.renderToast()}
				{this.renderSaveCloseButtons()}
			</div>
		);
	}
}

export default withStyles(styles)(App);
