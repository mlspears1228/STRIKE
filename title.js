/* global renderTilemap, gameState:writable, GameStates, titleTilemap, Tilemap, loadTilemap */
const TitleStates = {
    TITLE: 0,
    INSTRUCTIONS: 1,
};
class Title {
    constructor() {
        this.instructionsTilemap = new Tilemap();
        loadXML("assets/tilemaps/instructions.tmx", (xml) =>
            loadTilemap(xml, this.instructionsTilemap),
        );
        this.titleState = TitleStates.TITLE;
    }

    loop() {
        renderTilemap(titleTilemap);
        push();
        fill(0);
        textSize(100);
        textAlign(CENTER, CENTER);
        text("STRIKE", width / 2, 66);
        textSize(50);
        text("Play", width / 2, 232);
        text("Instructions", width / 2, 294);
        pop();
        if (this.titleState === TitleStates.TITLE) {
            // Play button
            if (
                mouseX > 22 * 16 &&
                mouseX < 27 * 17 &&
                mouseY > 14 * 16 &&
                mouseY < 15 * 17
            ) {
                if (mouseIsPressed) {
                    print(mouseY);
                    gameState = GameStates.PLAY;
                }
            }
            // Instructions button
            if (
                mouseX > 18 * 16 &&
                mouseX < 31 * 17 &&
                mouseY > 18 * 16 &&
                mouseY < 19 * 17
            ) {
                if (mouseIsPressed) {
                    this.titleState = TitleStates.INSTRUCTIONS;
                }
            }
        } else if (this.titleState === TitleStates.INSTRUCTIONS) {
            renderTilemap(this.instructionsTilemap);
            // Back button
            if (
                mouseX > 22 * 16 &&
                mouseX < 27 * 17 &&
                mouseY > 23 * 16 &&
                mouseY < 24 * 17
            ) {
                if (mouseIsPressed) {
                    this.titleState = TitleStates.TITLE;
                }
            }
        }
    }
}
