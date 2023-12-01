const TILEMAP_PATH = "assets/tilemaps/";
const ASSET_PATH = "assets/";

function loadTileset(tilesetXML) {
    let promises = [];
    let result = [];
    if (tilesetXML.getChild("tile") !== undefined) {
        for (let tile of tilesetXML.getChildren("tile")) {
            let imageSource = tile.getChild("image").getString("source");
            let promise = new Promise((resolve, reject) => {
                if (imageSource.startsWith("../")) {
                    imageSource = imageSource.substring(3);
                    loadImage(
                        ASSET_PATH + imageSource,
                        (img) => resolve(img),
                        reject,
                    );
                } else {
                    loadImage(
                        TILEMAP_PATH + imageSource,
                        (img) => resolve(img),
                        reject,
                    );
                }
            });
            promises.push(promise);
        }
        return Promise.all(promises)
            .then((images) => {
                return images;
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    } else {
        let promise = new Promise((resolve, reject) => {
            let imageSource = tilesetXML.getChild("image").getString("source");
            if (imageSource.startsWith("../")) {
                imageSource = imageSource.substring(3);
                loadImage(
                    ASSET_PATH + imageSource,
                    (img) => {
                        let tileWidth = tilesetXML.getNum("tilewidth");
                        let tileHeight = tilesetXML.getNum("tileheight");
                        let columns = tilesetXML.getNum("columns");
                        let tileCount = tilesetXML.getNum("tilecount");
                        for (let i = 0, y = 0; i < tileCount; i++) {
                            const x = i % columns;
                            result.push(
                                img.get(
                                    tileWidth * x,
                                    tileHeight * y,
                                    tileWidth,
                                    tileHeight,
                                ),
                            );
                            if (x === columns - 1) {
                                y++;
                            }
                        }
                        resolve(result);
                    },
                    reject,
                );
            } else {
                loadImage(
                    TILEMAP_PATH + imageSource,
                    (img) => {
                        let tileWidth = tilesetXML.getNum("tilewidth");
                        let tileHeight = tilesetXML.getNum("tileheight");
                        let columns = tilesetXML.getNum("columns");
                        let tileCount = tilesetXML.getNum("tilecount");
                        for (let i = 0, y = 0; i < tileCount; i++) {
                            const x = i % columns;
                            result.push(
                                img.get(
                                    tileWidth * x,
                                    tileHeight * y,
                                    tileWidth,
                                    tileHeight,
                                ),
                            );
                            if (x === columns - 1) {
                                y++;
                            }
                        }
                        resolve(result);
                    },
                    reject,
                );
            }
        });
        return promise;
    }
}

function loadTilemap(xml, tilemap) {
    let tileImages = [];
    let mapChildren = xml.getChildren();
    let promises = xml.getChildren("tileset").map((tileset) => {
        return new Promise((resolve, reject) => {
            let source = tileset.getString("source");
            if (source.startsWith("../")) {
                source = source.substring(3);
                loadXML(ASSET_PATH + source, (xml) => resolve(xml), reject);
            } else {
                loadXML(TILEMAP_PATH + source, (xml) => resolve(xml), reject);
            }
        });
    });
    Promise.all(promises)
        .then((tilesetXMLs) => {
            let tilesetPromises = tilesetXMLs.map((tilesetXML) => {
                return loadTileset(tilesetXML);
            });
            return Promise.all(tilesetPromises);
        })
        .then((tilesetImages) => {
            tileImages = tilesetImages.flat();
            tilemap.background.objects = [];
            tilemap.midground.objects = [];
            tilemap.foreground.objects = [];
            tilemap.tiles.objects = [];
            let tileWidth = xml.getNum("tilewidth");
            let tileHeight = xml.getNum("tileheight");
            for (let child of mapChildren) {
                switch (child.getName()) {
                    case "objectgroup": {
                        let name = child.getString("name").toLowerCase();
                        let parallaxX = child.getNum("parallaxx");
                        let parallaxY = child.getNum("parallaxy");
                        let objects = child.getChildren("object");
                        let objectArray = [];
                        for (let object of objects) {
                            let gid = object.getNum("gid");
                            let x = object.getNum("x");
                            let y = object.getNum("y");
                            let width = object.getNum("width");
                            let height = object.getNum("height");
                            objectArray.push({
                                image: tileImages[gid - 1],
                                x: x,
                                y: y,
                                width: width,
                                height: height,
                            });
                        }
                        tilemap[name].parallaxX = parallaxX;
                        tilemap[name].parallaxY = parallaxY;
                        tilemap[name].objects = objectArray;

                        break;
                    }
                    case "layer": {
                        let data = child.getChild("data");
                        let tileArray = [];
                        if (data.hasChildren("chunk")) {
                            for (let chunk of data.getChildren("chunk")) {
                                let csv = chunk.getContent();
                                let rows = csv
                                    .split("\n")
                                    .map((row) => row.split(",").map(Number));

                                let chunkX = chunk.getNum("x");
                                let chunkY = chunk.getNum("y");
                                for (let y = 1; y < rows.length; y++) {
                                    for (let x = 0; x < rows[y].length; x++) {
                                        if (rows[y][x] === 0) {
                                            continue;
                                        }
                                        tileArray.push({
                                            image: tileImages[rows[y][x] - 1],
                                            x: tileWidth * (x + chunkX),
                                            y: tileHeight * (y - 1 + chunkY),
                                        });
                                    }
                                }
                            }
                        } else {
                            let csv = data.getContent();
                            let rows = csv
                                .split("\n")
                                .map((row) => row.split(",").map(Number));
                            for (let y = 1; y < rows.length; y++) {
                                for (let x = 0; x < rows[y].length; x++) {
                                    if (rows[y][x] === 0) {
                                        continue;
                                    }
                                    tileArray.push({
                                        image: tileImages[rows[y][x] - 1],
                                        x: x * tileWidth,
                                        y: (y - 1) * tileHeight,
                                    });
                                }
                            }
                        }

                        tilemap.tiles.width = tileWidth;
                        tilemap.tiles.height = tileHeight;
                        tilemap.tiles.objects = tileArray;
                        break;
                    }
                }
            }

            // saveJSON(tilemap, "tilemap.json");
        });
}

function renderTilemap(tilemap) {
    for (let layer in tilemap) {
        if (layer === "tiles") {
            for (let tile of tilemap[layer].objects) {
                image(
                    tile.image,
                    tile.x,
                    tile.y,
                    tilemap[layer].width,
                    tilemap[layer].height,
                );
            }
        } else {
            for (let object of tilemap[layer].objects) {
                image(
                    object.image,
                    object.x,
                    object.y - object.height,
                    object.width,
                    object.height,
                );
                // if (tilemap[layer].parallaxX !== 0) {
                //     object.x -= tilemap[layer].parallaxX;
                //     if (object.x )
                // }
            }
        }
    }
}

function Tilemap() {
    this.background = { objects: [], parallaxX: 0, parallaxY: 0 };
    this.midground = { objects: [], parallaxX: 0, parallaxY: 0 };
    this.foreground = { objects: [], parallaxX: 0, parallaxY: 0 };
    this.tiles = { objects: [], width: 0, height: 0 };
}
