#!/bin/bash
npm run build:widget

# cp ./widgets/vis-shelly_vis1.html ./.dev-server/default/iobroker-data/files/vis/widgets/vis-shelly_vis1.html
# cp -r ./widgets/* ./.dev-server/default/iobroker-data/files/vis/widgets
#cp ./widgets-vis1/* ./.dev-server/default/iobroker-data/files/vis/widgets
#cp -r ./widgets-vis1/vis1/* ./.dev-server/default/iobroker-data/files/vis/widgets/vis-shelly/vis1
# cp ./widgets/vis-shelly_vis1.html ./.dev-server/default/iobroker-data/files/vis-2/widgets/vis-shelly_vis1.html
cp -r ./widgets/* ./.dev-server/default/iobroker-data/files/vis-2/widgets
#cp ./widgets-vis1/* ./.dev-server/default/iobroker-data/files/vis-2/widgets
#cp -r ./widgets-vis1/vis1/* ./.dev-server/default/iobroker-data/files/vis-2/widgets/vis-shelly/vis1
#cp ./widgets/vis-shelly/js/* ./.dev-server/default/iobroker-data/files/vis/widgets/vis-shelly/js
#cp ./widgets/vis-shelly/js/vis-shelly.editMode.js ./.dev-server/default/iobroker-data/files/vis/widgets/vis-shelly/js/vis-shelly.editMode.js

cp -r ./admin/* ./.dev-server/default/node_modules/iobroker.vis-2-shelly/admin
cp -r ./lib/* ./.dev-server/default/node_modules/iobroker.vis-2-shelly/lib
cp -r ./widgets/* ./.dev-server/default/node_modules/iobroker.vis-2-shelly/widgets
# cp ./widgets-vis1/* ./.dev-server/default/node_modules/iobroker.vis-shelly/widgets
# cp -r ./widgets-vis1/vis1/* ./.dev-server/default/node_modules/iobroker.vis-shelly/widgets/vis-shelly/vis1
cp ./io-package.json ./.dev-server/default/node_modules/iobroker.vis-2-shelly
cp ./LICENSE ./.dev-server/default/node_modules/iobroker.vi-2-shelly
cp ./main.js ./.dev-server/default/node_modules/iobroker.vis-2-shelly
cp ./package.json ./.dev-server/default/node_modules/iobroker.vis-2-shelly
cp ./README.md ./.dev-server/default/node_modules/iobroker.vis-2-shelly

# ./.dev-server/default/iob restart vis
./.dev-server/default/iob restart vis-2
./.dev-server/default/iob restart vis-2-shelly