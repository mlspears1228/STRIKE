/* global renderTilemap, gameState:writable, GameStates, loadTilemap, Tilemap, Player */
class Play {
    constructor() {
        this.isPaused = false;
        this.testTilemap = new Tilemap();
        loadXML("assets/tilemaps/test.tmx", (xml) =>
            loadTilemap(xml, this.testTilemap),
        );
        this.player = new Player(0, 144);
    }

    loop() {
        // Draw the game.
        push();
        scale(4);
        translate(0, -144);
        background(220);
        renderTilemap(this.testTilemap);
        pop();
        // Pause is drawn on top of the game.
        // if (isPaused) {}
    }
}
