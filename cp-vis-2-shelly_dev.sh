#!/bin/bash
set -e

echo "==> Bereinige alte Builds und Caches..."
rm -rf ./src-widgets/node_modules/.federation
rm -rf ./src-widgets/node_modules/.cache
rm -rf ./src-widgets/dist
rm -rf ./node_modules/.cache
rm -rf ./build
rm -rf ./src-widgets/build
rm -rf ./src-widgets/node_modules/.vite

echo "==> Baue Widgets..."
npm run build --prefix src-widgets

echo "==> Baue Hauptprojekt..."
npm run build

echo "==> Kopiere Widget-package.json in den Build-Ordner..."
cp ./src-widgets/package.json ./src-widgets/build/package.json

DEV_TARGET="./.dev-server/default/node_modules/iobroker.vis-2-shelly"
WIDGET_TARGET="./.dev-server/default/iobroker-data/files/vis-2/widgets/vis-2-shelly"

echo "==> Bereite Adapter-Ziel vor..."
rm -rf "$DEV_TARGET"
mkdir -p "$DEV_TARGET/widgets" "$DEV_TARGET/build" "$DEV_TARGET/admin" "$DEV_TARGET/lib"

echo "==> Kopiere Adapter-Dateien..."
cp -r ./admin/* "$DEV_TARGET/admin/" 2>/dev/null || true
cp -r ./lib/* "$DEV_TARGET/lib/" 2>/dev/null || true
cp -r ./build/. "$DEV_TARGET/build/"
cp ./io-package.json "$DEV_TARGET/"
cp ./LICENSE "$DEV_TARGET/"
cp ./package.json "$DEV_TARGET/"
cp ./README.md "$DEV_TARGET/"

echo "==> Lade Adapter in Dev-Server hoch..."
#dev-server upload default

echo "==> Entferne mögliche alte Widget-Reste..."
rm -rf "$WIDGET_TARGET"
rm -rf "./.dev-server/default/node_modules/iobroker.vis-2/www/widgets/vis-2-shelly"

echo "==> Kopiere neuen React-19-Widget-Build..."
mkdir -p "$WIDGET_TARGET"
mkdir -p "./.dev-server/default/node_modules/iobroker.vis-2/www/widgets/vis-2-shelly"

cp -r ./src-widgets/build/* "$WIDGET_TARGET/"
cp -r ./src-widgets/build/* "./.dev-server/default/node_modules/iobroker.vis-2/www/widgets/vis-2-shelly/"
cp -r ./src-widgets/build/* "$DEV_TARGET/widgets/"

echo "==> Starte Instanzen neu..."
./.dev-server/default/iob restart vis-2-shelly
./.dev-server/default/iob restart vis-2

echo "==> Fertig!"