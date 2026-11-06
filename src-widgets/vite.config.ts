import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import { moduleFederationShared } from "@iobroker/types-vis-2/modulefederation.vis.config";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const pack = JSON.parse(readFileSync("./package.json").toString());

export default {
	plugins: [
		react(),
		//vitetsConfigPaths(),
		federation({
			manifest: true,
			name: "vis2ShellyWidget",
			filename: "customWidgets.js",
			dts: false,
			exposes: {
				"./ShellyCustomOverview": "./src/ShellyCustomOverview",
				"./ShellyAllDevices": "./src/ShellyAllDevices",
				"./ShellyCustomDeviceList": "./src/ShellyCustomDeviceList",
				"./translations": "./src/translations.ts",
			},
			remotes: {},
			shared: {
				...moduleFederationShared(pack),
				react: {
					singleton: true,
					requiredVersion: "19.3.1",
					strictVersion: false,
				},
				"react-dom": {
					singleton: true,
					requiredVersion: "19.3.1",
					strictVersion: false,
				},
			},
		}),
	],
	server: {
		port: 3000,
		fs: {
			allow: [resolve(import.meta.dirname, "..")],
		},
		proxy: {
			"/_socket": "http://localhost:8082",
			"/vis.0": "http://localhost:8082",
			"/adapter": "http://localhost:8082",
			"/habpanel": "http://localhost:8082",
			"/vis": "http://localhost:8082",
			"/widgets": "http://localhost:8082/vis",
			"/widgets.html": "http://localhost:8082/vis",
			"/web": "http://localhost:8082",
			"/state": "http://localhost:8082",
		},
	},
	base: "./",
	build: {
		target: "esnext",
		outDir: "./build",
		modulePreload: false,
		rollupOptions: {
			onwarn(warning: { code: string }, warn: (warning: { code: string }) => void): void {
				if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
					return;
				}
				warn(warning);
			},
		},
	},
	resolve: {
		tsconfigPaths: true, // <-- NATIV AKTIVIEREN
	},
};
