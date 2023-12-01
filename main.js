/* global Tilemap, loadTilemap, Logo, Title, Play, End */
let font;
const titleTilemap = new Tilemap();
const testTilemap = new Tilemap();
// Preload function.
function loadXMLAsync(path) {
    return new Promise((resolve, reject) => {
        loadXML(path, resolve, reject);
    });
}
function preload() {
    // Load Text
    font = loadFont("assets/text/lookout_7_basic_v1/Lookout 7 Basic.ttf");
    // Load Tilemaps
    loadXML("assets/tilemaps/title.tmx", (xml) =>
        loadTilemap(xml, titleTilemap),
    );
    loadXML("assets/tilemaps/test.tmx", (xml) => loadTilemap(xml, testTilemap));
}
let gameState;
const GameStates = {
    LOGO: 0,
    TITLE: 1,
    PLAY: 2,
    END: 3,
};
let logo;
let title;
let play;
let end;
// Setup function.
function setup() {
    createCanvas(800, 450);
    gameState = GameStates.LOGO;
    logo = new Logo();
    title = new Title();
    play = new Play();
    end = new End();
    textFont(font);
    noSmooth();
}
let fps = 0;
let fpsCount = 0;
let frameCounter = 0;
const FRAME_RATE_UPDATE_RATE = 15;
// Draw function.
function draw() {
    background(220);
    frameCounter++;
    fpsCount += frameRate();
    if (frameCounter % FRAME_RATE_UPDATE_RATE == 0) {
        fps = fpsCount / FRAME_RATE_UPDATE_RATE;
        fpsCount = 0;
    }

    switch (gameState) {
        case GameStates.LOGO:
            logo.loop();
            break;
        case GameStates.TITLE:
            title.loop();
            break;
        case GameStates.PLAY:
            play.loop();
            break;
        case GameStates.END:
            end.loop();
            break;
    }

    // Keep this at the bottom of draw().
    fill(255);
    stroke(0);
    text("FPS: " + fps.toFixed(2), 10, height - 10);
    positiveEdgeKeyArray[keyCode] = 0;
}
// Keyboard input arrays.
let keyArray = [];
let positiveEdgeKeyArray = [];
// Functions for keyboard input
function keyPressed() {
    keyArray[keyCode] = 1;
    positiveEdgeKeyArray[keyCode] = 1;
}
function keyReleased() {
    keyArray[keyCode] = 0;
}
