#!/bin/bash
npm run build

cp -r ./widgets/* ./.dev-server/default/iobroker-data/files/vis-2/widgets

cp -r ./admin/* ./.dev-server/default/iobroker-data/files/vis-2-shelly.admin
cp -r ./admin/* ./.dev-server/default/node_modules/iobroker.vis-2-shelly/admin
cp -r ./lib/* ./.dev-server/default/node_modules/iobroker.vis-2-shelly/lib
cp -r ./widgets/* ./.dev-server/default/node_modules/iobroker.vis-2-shelly/widgets
cp ./io-package.json ./.dev-server/default/node_modules/iobroker.vis-2-shelly
cp ./LICENSE ./.dev-server/default/node_modules/iobroker.vi-2-shelly
cp ./main.js ./.dev-server/default/node_modules/iobroker.vis-2-shelly
cp ./package.json ./.dev-server/default/node_modules/iobroker.vis-2-shelly
cp ./README.md ./.dev-server/default/node_modules/iobroker.vis-2-shelly

# ./.dev-server/default/iob restart vis
#dev-server update

./.dev-server/default/iob restart admin
./.dev-server/default/iob restart vis-2
./.dev-server/default/iob restart vis-2-shelly