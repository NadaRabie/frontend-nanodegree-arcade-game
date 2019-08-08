"use strict";
let allEnemies = [];
let player;
let gameOver = false;

// Enemies our player must avoid
let Enemy = function (x, y, speed, row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 101;
    this.height = 83;
    this.speed = speed;
    this.row = row;
    this.col = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += this.speed * dt;
        this.col = placeInColumn(this.x, this.width);
    } else {
        this.x = 0;
        this.speed = getRandomInt(200, 300);
        this.row = getRandomInt(1, 3);
        this.y = placeInRow(this.row);
        this.col = 1;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    checkCollisions(this);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function (x = 200, y = 400) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
    this.width = 101;
    this.height = 83;
    this.row = -1;
    this.col = 3;
    this.startingX = 200;
    this.startingY = 400;
}

//return player to start position
Player.prototype.backToStart = function () {
    this.x = this.startingX;
    this.y = this.startingY;
    this.row = -1;
    this.col = 3;
}

Player.prototype.update = function (dt) {

}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// move player according to key stroke direction
// prevent player from moving off screen
Player.prototype.handleInput = function (direction) {
    if (direction === 'up' || direction === 'down') {
        if ((this.y > 67 && this.y < 399) ||
            (this.y > 399 && direction === 'up')) {
            switch (direction) {
                case 'up':
                    this.y -= 83;
                    this.row += 1;
                    break;
                case 'down':
                    this.y += 83;
                    this.row -= 1;
                    break;
            }
        }
    } else if (direction === 'right' || direction === 'left') {
        if ((this.x >= 0 && this.x < 401) ||
            (this.x < 0 && direction === 'right') ||
            (this.x > 401 && direction === 'left')) {
            switch (direction) {
                case 'right':
                    this.x += 101;
                    this.col += 1;
                    break;
                case 'left':
                    this.x -= 101;
                    this.col -= 1;
                    break;
            }
        }
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    if (!gameOver) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    }
});

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
//Sourece : https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// return the y position on canvas based on row
function placeInRow(row) {
    if (row === 1) {
        return 229;
    } else if (row === 2) {
        return 147;
    } else {
        return 63;
    }
}

// return the column using current x postion on canvas and object width 
function placeInColumn(x, width) {
    if (x > 0 && x <= 100) {
        return 1;
    } else if ((x + width) > 100 && x <= 200) {
        return 2;
    } else if ((x + width) > 200 && x <= 300) {
        return 3;
    } else if ((x + width) > 300 && x <= 400) {
        return 4;
    } else {
        return 5;
    }
}

// if collision happens move player to start position
function checkCollisions(enemy) {
    if (enemy.row === player.row && enemy.col === player.col) {
        player.backToStart();
    }
}

function init() {
    // Instantiate your enemy objects.
    for (let i = 1; i <= 3; i++) {
        allEnemies.push(new Enemy(0, placeInRow(getRandomInt(1, 3)), getRandomInt(100, 200)))
    }
    // Place the player object in a variable called player
    player = new Player();
}

init();