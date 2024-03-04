const makeFederation = require("@iobroker/vis-2-widgets-react-dev/modulefederation.config");

module.exports = makeFederation(
	"vis2ShellyWidget", // internal name of package - must be unique and identical with io-package.json=>common.visWidgets.vis2demoWidget
	{
		"./ShellyCustomOverview": "./src/ShellyCustomOverview",
		"./ShellyAllDevices": "./src/ShellyAllDevices", // List of all widgets in this package
		"./ShellyByRoomDevices": "./src/ShellyByRoomDevices",
		"./ShellyCustomDeviceList": "./src/ShellyCustomDeviceList",
		"./translations": "./src/translations",
	},
);
