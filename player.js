const PlayerStates = {
    IDLE: "idle",
    WALKING: "walking",
    JUMPING: "jumping",
    RUNNING: "running",
};
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.idleAnimation = [];
        this.idleAnimation.push(
            loadImage(
                "assets/player animations/Character Idle/images/Character-Idle-48x48_01.png"
            )
        );
        this.idleAnimation.push(
            loadImage(
                "assets/player animations/Character Idle/images/Character-Idle-48x48_02.png"
            )
        );
        this.idleAnimation.push(
            loadImage(
                "assets/player animations/Character Idle/images/Character-Idle-48x48_03.png"
            )
        );
        this.idleAnimation.push(
            loadImage(
                "assets/player animations/Character Idle/images/Character-Idle-48x48_04.png"
            )
        );
        this.idleAnimation.push(
            loadImage(
                "assets/player animations/Character Idle/images/Character-Idle-48x48_05.png"
            )
        );
        this.idleAnimation.push(
            loadImage(
                "assets/player animations/Character Idle/images/Character-Idle-48x48_06.png"
            )
        );
        this.idleAnimation.push(
            loadImage(
                "assets/player animations/Character Idle/images/Character-Idle-48x48_07.png"
            )
        );
        this.idleAnimation.push(
            loadImage(
                "assets/player animations/Character Idle/images/Character-Idle-48x48_08.png"
            )
        );
        this.idleAnimation.push(
            loadImage(
                "assets/player animations/Character Idle/images/Character-Idle-48x48_09.png"
            )
        );
        this.idleAnimation.push(
            loadImage(
                "assets/player animations/Character Idle/images/Character-Idle-48x48_10.png"
            )
        );
        this.playerState = PlayerStates.IDLE;
        this.currentFrame = 0;
    }

    draw() {
        push();
        imageMode(CENTER);
        scale(1 / 3);
        switch (this.playerState) {
            case PlayerStates.IDLE:
                this.drawIdle();
                break;
            case PlayerStates.WALKING:
                this.drawWalking();
                break;
            case PlayerStates.JUMPING:
                this.drawJumping();
                break;
        }
        pop();
    }

    drawIdle() {
        image(this.idleAnimation[this.currentFrame], this.x, this.y);
        this.currentFrame += this.currentFrame % this.idleAnimation.length;
    }
}
