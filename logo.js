function logo() {
    background(255);
    mShape.display("white");
    sShape.display("white");

    // skip start up screen if wanted
    if (keyArray[ENTER] === 1 || keyArray[32] === 1 || mouseIsPressed) {
        gameState = GameStates.TITLE;
    }

    // fade-in
    if (count < 105) {
        fadeIn(255, count);
    }
    // Begin drawing slash
    else if (count < 110) {
        fill("white");
        noStroke();
        quad(182, 210, 182, 215, 222, 190, 222, 185);
        fill("purple");
        triangle(211, 192, 211, 185, 220, 180);
        triangle(186, 213, 186, 220, 177, 225);
    } else if (count < 113) {
        fill("white");
        noStroke();
        quad(182, 210, 182, 215, 222, 190, 222, 185);
        fill("purple");
        triangle(211, 192, 211, 185, 250, 168);
        triangle(186, 213, 186, 220, 157, 237);
    } else if (count < 115) {
        fill("white");
        noStroke();
        quad(182, 210, 182, 215, 222, 190, 222, 185);
        fill("purple");
        triangle(211, 192, 211, 185, 270, 155);
        triangle(186, 213, 186, 220, 127, 253);
    }
    // first impact frame, brightens the letters while darkening the background
    else if (count < 117) {
        background(0);
        mShape.setColor("#AA8AB0");
        sShape.setColor("#AA8AB0");
        fill("black");
        noStroke();
        quad(182, 210, 182, 215, 222, 190, 222, 185);
        fill("#AA8AB0");
        triangle(211, 192, 211, 185, 270, 155);
        triangle(186, 213, 186, 220, 127, 253);
    }
    // impact frame
    else if (count < 120) {
        mShape.setColor("black");
        sShape.setColor("black");
        fill("white");
        noStroke();
        quad(182, 210, 182, 215, 222, 190, 222, 185);
        fill("black");
        triangle(211, 192, 211, 185, 270, 155);
        triangle(186, 213, 186, 220, 127, 253);
    }
    // impact frame
    else if (count < 122) {
        mShape.setColor("blue");
        sShape.setColor("black");
        fill("white");
        noStroke();
        quad(182, 210, 182, 215, 222, 190, 222, 185);
        fill("blue");
        triangle(211, 192, 211, 185, 270, 155);
        fill("black");
        triangle(186, 213, 186, 220, 127, 253);
    }
    // impact frame
    else if (count < 125) {
        mShape.setColor("black");
        sShape.setColor("red");
        fill("white");
        noStroke();
        quad(182, 210, 182, 215, 222, 190, 222, 185);
        fill("black");
        triangle(211, 192, 211, 185, 270, 155);
        fill("red");
        triangle(186, 213, 186, 220, 127, 253);
    }
    // fade into new colors
    else if (count < 127) {
        mShape.setColor("rgb(227,227,255)");
        sShape.setColor("rgb(255,209,209)");
        fill("white");
        noStroke();
        quad(182, 210, 182, 215, 222, 190, 222, 185);
        fill("rgb(227,227,255)");
        triangle(211, 192, 211, 185, 270, 155);
        fill("rgb(255,209,209)");
        triangle(186, 213, 186, 220, 127, 253);
    } else if (count < 130) {
        mShape.setColor("rgb(175,175,255)");
        sShape.setColor("rgb(255,165,165)");
        fill("white");
        noStroke();
        quad(182, 210, 182, 215, 222, 190, 222, 185);
        fill("rgb(175,175,255)");
        triangle(211, 192, 211, 185, 270, 155);
        fill("rgb(255,165,165)");
        triangle(186, 213, 186, 220, 127, 253);
    } else if (count < 132) {
        mShape.setColor("rgb(107,107,250)");
        sShape.setColor("rgb(255,92,92)");
        fill("white");
        noStroke();
        quad(182, 210, 182, 215, 222, 190, 222, 185);
        fill("rgb(107,107,250)");
        triangle(211, 192, 211, 185, 270, 155);
        fill("rgb(255,92,92)");
        triangle(186, 213, 186, 220, 127, 253);
    }
    // Settled colors
    else if (count < 252) {
        mShape.setColor("blue");
        sShape.setColor("red");
        fill("white");
        noStroke();
        quad(182, 210, 182, 215, 222, 190, 222, 185);
        fill("blue");
        triangle(211, 192, 211, 185, 270, 155);
        fill("red");
        triangle(186, 213, 186, 220, 127, 253);
    } else {
        gameState = GameStates.TITLE;
        count = 0;
    }
    // I use a counter for the future, if I need to show my logo later than the first system frame.
    count++;
}
// fadeIn creates a fade effect on entire screen.
// Inputs are c, the color, and count, the number of frames that have passed.
let fadeIn = (c, count) => background(c, 255 - (1 / 32) * count ** 2);

let count = 0;

// M shape.
let mShape = {
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
let sShape = {
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
