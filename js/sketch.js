/**

    Jacob Seiler
    19/4/2016
    Rock, Paper, Scissors
    
    - Rock beats Scissors
    - Scissors beats Paper
    - Paper beats Rock
    - Multiplayer and Singleplayer support
    - Winning streaks get you more points
    * Player 1 uses 1, 2, 3 to select attack
    * Player 2 uses 4, 5, 6 to select attack

**/

var p1Selection = 0;
var p2Selection = 0;
var p1Score = 0;
var p2Score = 0;
var p1Multiplier = 0;
var p2Multiplier = 0;
var multiplierColor = false;
var timerPaused = false;
var timer = 80 * 5;
var state = 2;
var winner = 0;

frameRate(80);

var select = function(p, s) {
    if (p === 1) {
        p1Selection = s;
    } else {
        p2Selection = s;
    }
};

var scoreboard = function() {
    strokeWeight(3);
    stroke(166, 166, 166);
    fill(204, 66, 66);
    rect(0, 0, 400, 50);
    
    line(150, 0, 150, 48);
    line(250, 0, 250, 48);
    
    fill(255, 255, 255);
    textSize(50);
    text(ceil(p1Score), 25, 5, 400, 400);
    text(ceil(p2Score), 275, 5, 400, 400);
    text(ceil(timer/80), 188, 5, 400, 400);
    
    if (p1Selection === 0 && p2Selection === 0) {
        timerPaused = true;
    } else {
        timerPaused = false;
    }
    
    if (state === 0 && p1Selection !== 0 && p2Selection !== 0) {
        timer = 0;
    }
    
    if (!timerPaused) {
        timer--;
    }
    
    if (timer <= 0) {
        if (state + 1 === 2) {
            state = 0;
            timer = 80 * 5;
            p1Selection = 0;
            p2Selection = 0;
        } else {
            if (p1Selection === 0) {
                select(1, ceil(random(0, 3)));
            }
            
            if (p2Selection === 0) {
                select(2, ceil(random(0, 3)));
            }
            
            state++;
            timer = 80 * 3;
        }
    }
};

var rock = function(x, y, size) {
    noStroke();
    fill(150, 150, 150);
    ellipse(x - (5 * size), y - (28 * size), 65 * size, 50 * size);
    ellipse(x - (15 * size), y - (15 * size), 65 * size, 50 * size);
    ellipse(x + (7 * size), y - (15 * size), 85 * size, 50 * size);
};

var paper = function(x, y, size) {
    strokeWeight(1 * size);
    noStroke();
    fill(255, 255, 255);
    rect(x - (35 * size), y - (50 * size), (70 * size), (100 * size));
    fill(0, 0, 0);
    stroke(0, 0, 0);
    line(x - (30 * size), y - (40 * size), x + (30 * size), y - (40 * size));
    line(x - (30 * size), y - (30 * size), x + (30 * size), y - (30 * size));
    line(x - (30 * size), y - (20 * size), x + (30 * size), y - (20 * size));
    line(x - (30 * size), y - (10 * size), x + (30 * size), y - (10 * size));
    line(x - (30 * size), y, x + (30 * size), y);
    line(x - (30 * size), y + (10 * size), x + (30 * size), y + (10 * size));
    line(x - (30 * size), y + (20 * size), x + (30 * size), y + (20 * size));
    line(x - (30 * size), y + (30 * size), x + (30 * size), y + (30 * size));
    line(x - (30 * size), y + (40 * size), x + (30 * size), y + (40 * size));
};

var scissors = function(x, y, size) {
    x += 40;
    noStroke();
    strokeWeight(1);
    fill(65, 65, 65);
    triangle(x - (12 * size), y + (17 * size), x - (89 * size), y, x - (12 * size), y + (5 * size));
    triangle(x - (14 * size), y + (-20 * size), x - (89 * size), y + (24 * size), x - (12 * size), y + (-9 * size));
    
    noFill();
    stroke(255, 124, 36);
    strokeWeight(3 * size);
    ellipse(x, y - (17 * size), 26 * size, 24 * size);
    ellipse(x + (1 * size), y + (12 * size), 28 * size, 22 * size);
    
    noStroke();
    strokeWeight(1);
};

var rps = function(n, x, y) {
    if (n < 2) {
        rock(x, y, 1);
    } else if (n === 2) {
        paper(x, y, 1);
    } else {
        scissors(x, y, 1);
    }
    
    return n;
};

var givePoint = function(p) {
    if (p === 1) {
        p1Multiplier++;
        p2Multiplier = 0;
        p1Score+= 1 * p1Multiplier;
    } else {
        p2Multiplier++;
        p1Multiplier = 0;
        p2Score+= 1 * p2Multiplier;
    }
};

var getWinner = function(p1, p2) {
if (p1 === 1 && p2 === 2) {
        givePoint(2);
        return 2;
    } else if (p1 === 2 && p2 === 1) {
        givePoint(1);
        return 1;
    } if (p1 === 1 && p2 === 3) {
        givePoint(1);
        return 1;
    } else if (p1 === 3 && p2 === 1) {
        givePoint(2);
        return 2;
    } if (p1 === 3 && p2 === 2) {
        givePoint(1);
        return 1;
    } else if (p1 === 2 && p2 === 3) {
        givePoint(2);
        return 2;
    } else {
        return 0;
    }
};

var showMultiplier = function(p, x, y) {
    textSize(30);
    fill(100, 100, 100);
    if (p === 1) {
        if (p1Multiplier >= 15) {
            if (multiplierColor === true) {
                fill(105, 195, 240);
                multiplierColor = false;
            } else {
                fill(255, 76, 255);
                multiplierColor = true;
            }
            text("x" + p1Multiplier, x, y, 400, 400);
        } else if (p1Multiplier >= 10) {
            fill(105, 195, 240);
            text("x" + p1Multiplier, x, y, 400, 400);
        } else if (p1Multiplier >= 5) {
            fill(255, 76, 255);
            text("x" + p1Multiplier, x, y, 400, 400);
        } else {
            fill(100, 100, 100);
            text("x" + p1Multiplier, x, y, 400, 400);
        }
    }
    
    if (p === 2) {{
        if (p2Multiplier >= 15) {
            if (multiplierColor === true) {
                fill(105, 195, 240);
                multiplierColor = false;
            } else {
                fill(255, 76, 255);
                multiplierColor = true;
            }
            text("x" + p2Multiplier, x, y, 400, 400);
        } else if (p2Multiplier >= 10) {
            fill(105, 195, 240);
            text("x" + p2Multiplier, x, y, 400, 400);
        } else if (p2Multiplier >= 5) {
            fill(255, 76, 255);
            text("x" + p2Multiplier, x, y, 400, 400);
        } else {
            fill(100, 100, 100);
            text("x" + p2Multiplier, x, y, 400, 400);
        }
    }}
};

var display = function(p1, p2) {
    noStroke();
    fill(230, 230, 230);
    rect(0, 53, 400, 345);
    
    fill(255, 255, 255);
    stroke(166, 166, 166);
    
    rps(p1, 100, 200);
    rps(p2, 300, 200);
    
    fill(0, 0, 0);
    stroke(0, 0, 0);
    
    if (winner === 0) {
        winner = getWinner(p1, p2);
    }
    
    if (winner === 1) {
        strokeWeight(15);
        line(170, 150, 235, 200);
        line(170, 250, 235, 200);
    } else if (winner === 2) {
        strokeWeight(15);
        line(170, 200, 235, 150);
        line(170, 200, 235, 250);
    } else {
        strokeWeight(15);
        line(170, 190, 235, 190);
        line(170, 215, 235, 215);
    }
    
    if (p1Multiplier >= 2) {
        showMultiplier(1, 25, 65);
    }
    
    if (p2Multiplier >= 2) {
        showMultiplier(2, 275, 65);
    }
};

var selection = function() {
    if (p1Score >= 200 || p2Score >= 200) {
        state = 3;
        return;
    }
    
    noStroke();
    fill(230, 230, 230);
    rect(0, 53, 400, 345);
    
    fill(255, 255, 255);
    stroke(166, 166, 166);
    rect(10, 340, 50, 50);
    rect(70, 340, 50, 50);
    rect(130, 340, 50, 50);
    rect(220, 340, 50, 50);
    rect(280, 340, 50, 50);
    rect(340, 340, 50, 50);
    
    fill(100, 100, 100);
    
    if (p1Selection === 0) {
        textSize(35);
        text("Player 1", 40, 230, 400, 400);
        textSize(50);
        text("1", 25, 280, 400, 400);
        text("2", 85, 280, 400, 400);
        text("3", 145, 280, 400, 400);
        rock(35, 375, 0.4);
        paper(95, 365, 0.4);
        scissors(130, 365, 0.4);
    }
    
    fill(100, 100, 100);
    
    if (p2Selection === 0) {
        textSize(35);
        text("Player 2", 245, 230, 400, 400);
        textSize(50);
        text("4", 235, 280, 400, 400);
        text("5", 295, 280, 400, 400);
        text("6", 355, 280, 400, 400);
        rock(245, 375, 0.4);
        paper(305, 365, 0.4);
        scissors(340, 365, 0.4);
    }
    
    fill(100, 100, 100);
    
    textSize(25);
    text("Select your attack by pressing a key", 15, 130, 700, 400);
    text("First to 200 wins", 120, 155, 700, 400);
    
    if (p1Multiplier >= 2) {
        showMultiplier(1, 25, 65);
    }
    
    if (p2Multiplier >= 2) {
        showMultiplier(2, 275, 65);
    }
};

var blank = function() {
    fill(30, 30, 30);
    rect(0, 0, 400, 400);
    fill(255, 255, 255);
    var f = createFont("Impact");
    textFont(f, 40);
    text("Rock, Paper, Scissors", 10, 180);
    fill(194, 66, 66);
    text("Click to start", 10, 220);
};

var end = function() {
    background(100, 100, 100);
    textSize(70);
    textAlign(CENTER, CENTER);
    fill(255, 255, 255);
    if (p1Score >= p2Score) {
        text("PLAYER 1", 200, 125);
        
        textAlign(LEFT, CENTER);
        text(p1Score, 90, 335);
        textAlign(RIGHT, CENTER);
        
        if (p1Multiplier >= 15) {
            if (multiplierColor === true) {
                fill(105, 195, 240);
            } else {
                fill(255, 76, 255);
            }
            text("x" + p1Multiplier, 320, 335);
        } else if (p1Multiplier >= 10) {
            fill(105, 195, 240);
            text("x" + p1Multiplier, 320, 335);
        } else if (p1Multiplier >= 5) {
            fill(255, 76, 255);
            text("x" + p1Multiplier, 320, 335);
        } else {
            fill(255, 255, 255);
            text("x" + p1Multiplier, 320, 335);
        }
    } else {
        text("PLAYER 2", 200, 125);
        
        textAlign(LEFT, CENTER);
        text(p2Score, 90, 335);
        textAlign(RIGHT, CENTER);
        
        if (p2Multiplier >= 15) {
            if (multiplierColor === true) {
                fill(105, 195, 240);
            } else {
                fill(255, 76, 255);
            }
            text("x" + p2Multiplier, 320, 335);
        } else if (p2Multiplier >= 10) {
            fill(105, 195, 240);
            text("x" + p2Multiplier, 320, 335);
        } else if (p2Multiplier >= 5) {
            fill(255, 76, 255);
            text("x" + p2Multiplier, 320, 335);
        } else {
            fill(255, 255, 255);
            text("x" + p2Multiplier, 320, 335);
        }
    }
    
    textAlign(CENTER, CENTER);
    if (p1Multiplier >= 20 || p2Multiplier >= 20) {
        if (multiplierColor === true) {
                fill(105, 195, 240);
                multiplierColor = false;
            } else {
                fill(255, 76, 255);
                multiplierColor = true;
            }
        text("ULTRA COMBO", 200, 239);
    } else {
        text("WINNER", 200, 239);
    }
};

var draw = function() {
    scoreboard();
    
    if (state === 1) {
        display(p1Selection, p2Selection);
    } else if (state === 0) {
        winner = 0;
        selection();
    } else if (state === 2) {
        blank();
    } else {
        end();
    }
};

var mousePressed = function() {
    if (state === 2) {
        state = 0;
    }
};

var keyPressed = function() {
    if (state !== 0) {
        return;
    }
    
    if (key.code === 49) {
        select(1, 1);
    } else if (key.code === 50) {
        select(1, 2);
    } else if (key.code === 51) {
        select(1, 3);
    } else if (key.code === 52) {
        select(2, 1);
    } else if (key.code === 53) {
        select(2, 2);
    } else if (key.code === 54) {
        select(2, 3);
    }
};