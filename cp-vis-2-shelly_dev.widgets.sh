#!/bin/bash
<<<<<<< HEAD
npm run build:widget
=======
rm -R ./widgets
npm run build2
>>>>>>> 0fcbb07 (Alles in TypeScript geschriben)

# cp ./widgets/vis-shelly_vis1.html ./.dev-server/default/iobroker-data/files/vis/widgets/vis-shelly_vis1.html
# cp -r ./widgets/* ./.dev-server/default/iobroker-data/files/vis/widgets
#cp ./widgets-vis1/* ./.dev-server/default/iobroker-data/files/vis/widgets
#cp -r ./widgets-vis1/vis1/* ./.dev-server/default/iobroker-data/files/vis/widgets/vis-shelly/vis1
# cp ./widgets/vis-shelly_vis1.html ./.dev-server/default/iobroker-data/files/vis-2/widgets/vis-shelly_vis1.html
<<<<<<< HEAD
=======

rm -R ./.dev-server/default/iobroker-data/files/vis-2/widgets/vis-2-shelly
>>>>>>> 0fcbb07 (Alles in TypeScript geschriben)
cp -r ./widgets/* ./.dev-server/default/iobroker-data/files/vis-2/widgets
#cp ./widgets-vis1/* ./.dev-server/default/iobroker-data/files/vis-2/widgets
#cp -r ./widgets-vis1/vis1/* ./.dev-server/default/iobroker-data/files/vis-2/widgets/vis-shelly/vis1
#cp ./widgets/vis-shelly/js/* ./.dev-server/default/iobroker-data/files/vis/widgets/vis-shelly/js
#cp ./widgets/vis-shelly/js/vis-shelly.editMode.js ./.dev-server/default/iobroker-data/files/vis/widgets/vis-shelly/js/vis-shelly.editMode.js

<<<<<<< HEAD
cp -r ./admin/* ./.dev-server/default/node_modules/iobroker.vis-2-shelly/admin
cp -r ./lib/* ./.dev-server/default/node_modules/iobroker.vis-2-shelly/lib
=======

cp -r ./admin/* ./.dev-server/default/node_modules/iobroker.vis-2-shelly/admin
cp -r ./lib/* ./.dev-server/default/node_modules/iobroker.vis-2-shelly/lib
rm -R ./.dev-server/default/node_modules/iobroker.vis-2-shelly/widgets
>>>>>>> 0fcbb07 (Alles in TypeScript geschriben)
cp -r ./widgets/* ./.dev-server/default/node_modules/iobroker.vis-2-shelly/widgets
# cp ./widgets-vis1/* ./.dev-server/default/node_modules/iobroker.vis-shelly/widgets
# cp -r ./widgets-vis1/vis1/* ./.dev-server/default/node_modules/iobroker.vis-shelly/widgets/vis-shelly/vis1
cp ./io-package.json ./.dev-server/default/node_modules/iobroker.vis-2-shelly
cp ./LICENSE ./.dev-server/default/node_modules/iobroker.vi-2-shelly
cp ./main.js ./.dev-server/default/node_modules/iobroker.vis-2-shelly
cp ./package.json ./.dev-server/default/node_modules/iobroker.vis-2-shelly
cp ./README.md ./.dev-server/default/node_modules/iobroker.vis-2-shelly

# ./.dev-server/default/iob restart vis
<<<<<<< HEAD
./.dev-server/default/iob restart vis-2
./.dev-server/default/iob restart vis-2-shelly
=======
dev-server upload default
#./.dev-server/default/iob restart vis-2
#./.dev-server/default/iob restart vis-2-shelly
>>>>>>> 0fcbb07 (Alles in TypeScript geschriben)
