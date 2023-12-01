/* global GameStates, keyArray, gameState:writable */
// fadeIn creates a fade effect on entire screen.
// Inputs are c, the color, and count, the number of frames that have passed.
let fadeIn = (c, count) => background(c, 255 - (1 / 32) * count ** 2);

class Logo {
    constructor() {
        this.count = 0;

        // M shape.
        this.mShape = {
            x: 111,
            y: 111,
            w: 100,
            l: 100,
            c: "purple",

            display: function (mColor) {
                noStroke();
                fill(this.c);
                rect(this.x, this.y, this.w / 4, this.l);
                rect(this.x + (this.w * 3) / 4, this.y, this.w / 4, this.l);
                // bigger triangle
                triangle(
                    this.x,
                    this.y + this.l / 8,
                    this.x + this.w,
                    this.y + this.l / 8,
                    this.x + this.w / 2,
                    this.y + (this.l * 5) / 8,
                );
                rect(this.x, this.y, this.w, this.l / 6);
                fill(mColor);
                triangle(
                    this.x + this.w / 4,
                    this.y,
                    this.x + (this.w * 3) / 4,
                    this.y,
                    this.x + this.w / 2,
                    this.y + this.l / 4,
                );
            },

            setColor: function (mColor) {
                this.c = mColor;
            },
        };

        // S shape.
        this.sShape = {
            x: 185,
            y: 185,
            w: 100,
            l: 100,
            c: "purple",

            display: function (sColor) {
                noStroke();
                fill(this.c);
                arc(
                    this.x + this.w / 2,
                    this.y + (this.l * 2) / 3,
                    this.w,
                    (this.l * 4) / 8,
                    PI + HALF_PI,
                    3 * PI,
                );
                arc(
                    this.x + this.w / 2,
                    this.y + this.l / 3,
                    this.w,
                    (this.l * 4) / 8,
                    HALF_PI,
                    TWO_PI,
                );
                fill(sColor);
                ellipse(
                    this.x + this.w / 2,
                    this.y + (this.l * 2) / 3,
                    this.w / 2,
                    this.l / 6,
                );
                ellipse(
                    this.x + this.w / 2,
                    this.y + this.l / 3,
                    this.w / 2,
                    this.l / 6,
                );
            },

            setColor: function (sColor) {
                this.c = sColor;
            },
        };
    }

    loop() {
        background(255);
        this.mShape.display("white");
        this.sShape.display("white");

        // skip start up screen if wanted
        if (keyArray[ENTER] === 1 || keyArray[32] === 1 || mouseIsPressed) {
            gameState = GameStates.TITLE;
        }

        // fade-in
        if (this.count < 105) {
            fadeIn(255, this.count);
        }
        // Begin drawing slash
        else if (this.count < 110) {
            fill("white");
            noStroke();
            quad(182, 210, 182, 215, 222, 190, 222, 185);
            fill("purple");
            triangle(211, 192, 211, 185, 220, 180);
            triangle(186, 213, 186, 220, 177, 225);
        } else if (this.count < 113) {
            fill("white");
            noStroke();
            quad(182, 210, 182, 215, 222, 190, 222, 185);
            fill("purple");
            triangle(211, 192, 211, 185, 250, 168);
            triangle(186, 213, 186, 220, 157, 237);
        } else if (this.count < 115) {
            fill("white");
            noStroke();
            quad(182, 210, 182, 215, 222, 190, 222, 185);
            fill("purple");
            triangle(211, 192, 211, 185, 270, 155);
            triangle(186, 213, 186, 220, 127, 253);
        }
        // first impact frame, brightens the letters while darkening the background
        else if (this.count < 117) {
            background(0);
            this.mShape.setColor("#AA8AB0");
            this.sShape.setColor("#AA8AB0");
            fill("black");
            noStroke();
            quad(182, 210, 182, 215, 222, 190, 222, 185);
            fill("#AA8AB0");
            triangle(211, 192, 211, 185, 270, 155);
            triangle(186, 213, 186, 220, 127, 253);
        }
        // impact frame
        else if (this.count < 120) {
            this.mShape.setColor("black");
            this.sShape.setColor("black");
            fill("white");
            noStroke();
            quad(182, 210, 182, 215, 222, 190, 222, 185);
            fill("black");
            triangle(211, 192, 211, 185, 270, 155);
            triangle(186, 213, 186, 220, 127, 253);
        }
        // impact frame
        else if (this.count < 122) {
            this.mShape.setColor("blue");
            this.sShape.setColor("black");
            fill("white");
            noStroke();
            quad(182, 210, 182, 215, 222, 190, 222, 185);
            fill("blue");
            triangle(211, 192, 211, 185, 270, 155);
            fill("black");
            triangle(186, 213, 186, 220, 127, 253);
        }
        // impact frame
        else if (this.count < 125) {
            this.mShape.setColor("black");
            this.sShape.setColor("red");
            fill("white");
            noStroke();
            quad(182, 210, 182, 215, 222, 190, 222, 185);
            fill("black");
            triangle(211, 192, 211, 185, 270, 155);
            fill("red");
            triangle(186, 213, 186, 220, 127, 253);
        }
        // fade into new colors
        else if (this.count < 127) {
            this.mShape.setColor("rgb(227,227,255)");
            this.sShape.setColor("rgb(255,209,209)");
            fill("white");
            noStroke();
            quad(182, 210, 182, 215, 222, 190, 222, 185);
            fill("rgb(227,227,255)");
            triangle(211, 192, 211, 185, 270, 155);
            fill("rgb(255,209,209)");
            triangle(186, 213, 186, 220, 127, 253);
        } else if (this.count < 130) {
            this.mShape.setColor("rgb(175,175,255)");
            this.sShape.setColor("rgb(255,165,165)");
            fill("white");
            noStroke();
            quad(182, 210, 182, 215, 222, 190, 222, 185);
            fill("rgb(175,175,255)");
            triangle(211, 192, 211, 185, 270, 155);
            fill("rgb(255,165,165)");
            triangle(186, 213, 186, 220, 127, 253);
        } else if (this.count < 132) {
            this.mShape.setColor("rgb(107,107,250)");
            this.sShape.setColor("rgb(255,92,92)");
            fill("white");
            noStroke();
            quad(182, 210, 182, 215, 222, 190, 222, 185);
            fill("rgb(107,107,250)");
            triangle(211, 192, 211, 185, 270, 155);
            fill("rgb(255,92,92)");
            triangle(186, 213, 186, 220, 127, 253);
        }
        // Settled colors
        else if (this.count < 252) {
            this.mShape.setColor("blue");
            this.sShape.setColor("red");
            fill("white");
            noStroke();
            quad(182, 210, 182, 215, 222, 190, 222, 185);
            fill("blue");
            triangle(211, 192, 211, 185, 270, 155);
            fill("red");
            triangle(186, 213, 186, 220, 127, 253);
        } else {
            gameState = GameStates.TITLE;
            this.count = 0;
        }
        // I use a counter for the future, if I need to show my logo later than the first system frame.
        this.count++;
    }
}
