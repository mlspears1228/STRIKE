let font;
let backgroundTilemap;
// Preload function.
function preload() {
    // Load Text
    font = loadFont("assets/text/lookout_7_basic_v1/Lookout 7 Basic.ttf");
    loadXML("assets/tilemaps/Background Images.xml", print);
    // Load Title Screen Assets
    loadXML("assets/tilemaps/title.tmx", loadTilemap);
}
let gameState;
const GameStates = {
    LOGO: 0,
    TITLE: 1,
    PLAY: 2,
    END: 3,
};
// Setup function.
function setup() {
    createCanvas(800, 450);
    gameState = GameStates.LOGO;
}
let fps = 0;
let fpsCount = 0;
let frameCount = 0;
const FRAME_RATE_UPDATE_RATE = 15;
// Draw function.
function draw() {
    background(220);
    frameCount++;
    fpsCount += frameRate();
    if (frameCount % FRAME_RATE_UPDATE_RATE == 0) {
        fps = fpsCount / FRAME_RATE_UPDATE_RATE;
        fpsCount = 0;
    }

    switch (gameState) {
        case GameStates.LOGO:
            logo();
            break;
        case GameStates.TITLE:
            title();
            break;
        case GameStates.PLAY:
            play();
            break;
        case GameStates.END:
            end();
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
