#!/bin/bash
npm run build

cp -r ./widgets/* /opt/iobroker/iobroker-data/files/vis-2/widgets

cp -r ./admin/* /opt/iobroker/iobroker-data/files/vis-2-shelly.admin
cp -r ./admin/* /opt/iobroker/node_modules/iobroker.vis-2-shelly/admin
cp -r ./lib/* /opt/iobroker/node_modules/iobroker.vis-2-shelly/lib
cp -r ./widgets/* /opt/iobroker/node_modules/iobroker.vis-2-shelly/widgets
cp ./io-package.json /opt/iobroker/node_modules/iobroker.vis-2-shelly
cp ./LICENSE /opt/iobroker/node_modules/iobroker.vis-2-shelly
cp ./main.js /opt/iobroker/node_modules/iobroker.vis-2-shelly
cp ./package.json /opt/iobroker/node_modules/iobroker.vis-2-shelly
cp ./README.md /opt/iobroker/node_modules/iobroker.vis-2-shelly

# ./.dev-server/default/iob restart vis
#dev-server update

iob upload vis-2-shelly
iob restart admin
iob restart vis-2
iob restart vis-2-shelly