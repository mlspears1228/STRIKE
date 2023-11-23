let gameState;
const GameStates = {
  LOGO : 0,
  TITLE : 1,
  GAME : 2,
};



function preload() {
  
}
function setup() {
  createCanvas(400, 400);
  gameState = GameStates.LOGO;
}

function draw() {
  background(220);
}

// functions for key pressing and releasing
/**
 * Description placeholder
 */
function keyPressed() {
  keyArray[keyCode] = 1;
}
/**
 * Description placeholder
 */
function keyReleased() {
  keyArray[keyCode] = 0;
}