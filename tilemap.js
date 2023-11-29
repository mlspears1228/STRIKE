const TILEMAP_PATH = "assets/tilemaps/";
const ASSET_PATH = "assets/";
let tilemap;
// function loadTilemap(xml) {
//     let mapChildren = xml.getChildren();
//     let tileImages = [];
//     let tilesets = xml.getChildren("tileset").forEach((tileset) => {
//         let source = tileset.getString("source");
//         let tilesetXML;
//         if (source.startsWith("../")) {
//             source = source.substring(3);
//             loadXML(ASSET_PATH + source, loadTileset);
//         } else {
//             loadXML(TILEMAP_PATH + source, loadTileset);
//         }
//     });
//     function loadTileset(tilesetXML) {
//         let promises = [];

//         if (tilesetXML.getChild("tile") !== undefined) {
//             for (let tile of tilesetXML.getChildren("tile")) {
//                 let imageSource = tile.getChild("image").getString("source");
//                 let promise = new Promise((resolve, reject) => {
//                     if (imageSource.startsWith("../")) {
//                         imageSource = imageSource.substring(3);
//                         loadImage(
//                             ASSET_PATH + imageSource,
//                             (img) => resolve(img),
//                             reject,
//                         );
//                     } else {
//                         tileImages.push(loadImage(TILEMAP_PATH + imageSource));
//                     }
//                 });
//                 promises.push(promise);
//             }
//         } else {
//             let image;
//             let imageSource = tilesetXML.getChild("image").getString("source");
//             if (imageSource.startsWith("../")) {
//                 imageSource = imageSource.substring(3);
//                 image = loadImage(ASSET_PATH + imageSource);
//             } else {
//                 image = loadImage(TILEMAP_PATH + imageSource);
//             }
//             let tileWidth = tilesetXML.getNum("tilewidth");
//             let tileHeight = tilesetXML.getNum("tileheight");
//             let columns = tilesetXML.getNum("columns");
//             let tileCount = tilesetXML.getNum("tilecount");
//             for (let i = 0, y = 0; i < tileCount; i++) {
//                 const x = i % columns;
//                 tileImages.push(
//                     image.get(
//                         tileWidth * x,
//                         tileHeight * y,
//                         tileWidth,
//                         tileHeight,
//                     ),
//                 );
//                 if (x === columns - 1) {
//                     y++;
//                 }
//             }
//         }
//     }
//     tilemap = {
//         background: {
//             parallaxX: 0,
//             parallaxY: 0,
//             objects: [],
//         },
//         midground: {
//             parallaxX: 0,
//             parallaxY: 0,
//             objects: [],
//         },
//         foreground: {
//             parallaxX: 0,
//             parallaxY: 0,
//             objects: [],
//         },
//         tiles: {
//             width: 0,
//             height: 0,
//             objects: [],
//         },
//     };
//     let tileWidth = xml.getNum("tilewidth");
//     let tileHeight = xml.getNum("tileheight");
//     for (let child of mapChildren) {
//         switch (child.getName()) {
//             case "objectgroup":
//                 let name = child.getString("name").toLowerCase();
//                 let parallaxX = child.getNum("parallaxx");
//                 let parallaxY = child.getNum("parallaxy");
//                 let objects = child.getChildren("object");
//                 let objectArray = [];
//                 for (let object of objects) {
//                     let gid = object.getNum("gid");
//                     let x = object.getNum("x");
//                     let y = object.getNum("y");
//                     let width = object.getNum("width");
//                     let height = object.getNum("height");
//                     objectArray.push({
//                         image: tileImages[gid - 1],
//                         x: x,
//                         y: y,
//                         width: width,
//                         height: height,
//                     });
//                 }
//                 tilemap[name] = {
//                     parallaxX: parallaxX,
//                     parallaxY: parallaxY,
//                     objects: objectArray,
//                 };
//                 break;
//             case "layer":
//                 let data = child.getChild("data");
//                 let csv = data.getContent();
//                 let tileArray = [];
//                 let rows = csv
//                     .split("\n")
//                     .map((row) => row.split(",").map(Number));
//                 for (let y = 0; y < rows.length; y++) {
//                     for (let x = 0; x < rows[y].length; x++) {
//                         if (rows[y][x] === 0) {
//                             continue;
//                         }
//                         tileArray.push({
//                             image: tileImages[rows[y][x] - 1],
//                             x: x * tileWidth,
//                             y: y * tileHeight,
//                         });
//                     }
//                 }
//                 tilemap.tiles = {
//                     width: tileWidth,
//                     height: tileHeight,
//                     objects: tileArray,
//                 };
//                 break;
//         }
//     }
//     // saveJSON(tilemap, "tilemap.json");
// }

function loadTilemap(xml) {
    let mapChildren = xml.getChildren();
    let tileImages = [];
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
            let promises2 = [];
            for (let tilesetXML of tilesetXMLs) {
                if (tilesetXML.getChild("tile") !== undefined) {
                    for (let tile of tilesetXML.getChildren("tile")) {
                        let imageSource = tile
                            .getChild("image")
                            .getString("source");
                        let promise = new Promise((resolve, reject) => {
                            if (imageSource.startsWith("../")) {
                                imageSource = imageSource.substring(3);
                                loadImage(
                                    ASSET_PATH + imageSource,
                                    (img) => resolve(img),
                                    reject,
                                );
                            } else {
                                tileImages.push(
                                    loadImage(TILEMAP_PATH + imageSource),
                                );
                            }
                        });
                        promises2.push(promise);
                    }
                } else {
                    let promiseImage = new Promise((resolve, reject) => {
                        let imageSource = tilesetXML
                            .getChild("image")
                            .getString("source");
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
                    let tileWidth = tilesetXML.getNum("tilewidth");
                    let tileHeight = tilesetXML.getNum("tileheight");
                    let columns = tilesetXML.getNum("columns");
                    let tileCount = tilesetXML.getNum("tilecount");
                    promiseImage.then((image) => {
                        for (let i = 0, y = 0; i < tileCount; i++) {
                            const x = i % columns;
                            let promise = new Promise((resolve, reject) => {
                                resolve(
                                    image.get(
                                        tileWidth * x,
                                        tileHeight * y,
                                        tileWidth,
                                        tileHeight,
                                    ),
                                );
                            });
                            promises2.push(promise);
                            if (x === columns - 1) {
                                y++;
                            }
                        }
                    });
                }
            }
            return Promise.all(promises2);
        })
        .then((images) => {
            tileImages = images;
            tilemap = {
                background: {
                    parallaxX: 0,
                    parallaxY: 0,
                    objects: [],
                },
                midground: {
                    parallaxX: 0,
                    parallaxY: 0,
                    objects: [],
                },
                foreground: {
                    parallaxX: 0,
                    parallaxY: 0,
                    objects: [],
                },
                tiles: {
                    width: 0,
                    height: 0,
                    objects: [],
                },
            };
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
                        tilemap[name] = {
                            parallaxX: parallaxX,
                            parallaxY: parallaxY,
                            objects: objectArray,
                        };
                        break;
                    }
                    case "layer": {
                        let data = child.getChild("data");
                        let csv = data.getContent();
                        let tileArray = [];
                        let rows = csv
                            .split("\n")
                            .map((row) => row.split(",").map(Number));
                        for (let y = 0; y < rows.length; y++) {
                            for (let x = 0; x < rows[y].length; x++) {
                                if (rows[y][x] === 0) {
                                    continue;
                                }
                                tileArray.push({
                                    image: tileImages[rows[y][x] - 1],
                                    x: x * tileWidth,
                                    y: y * tileHeight,
                                });
                            }
                        }
                        tilemap.tiles = {
                            width: tileWidth,
                            height: tileHeight,
                            objects: tileArray,
                        };
                        break;
                    }
                }
            }
            // saveJSON(tilemap, "tilemap.json");
        });

    // function loadTileset(tilesetXML) {
    //     let promises = [];
    // }
}

function renderTilemap() {
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
                const img = object.image;
                image(
                    object.image,
                    object.x,
                    object.y,
                    object.width,
                    object.height,
                    0,
                    0,
                    0,
                    0,
                    COVER,
                    LEFT,
                    BOTTOM,
                );
            }
        }
    }
}
