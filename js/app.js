// Enemies our player must avoid
var mySound;

var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * speed); 
    // The image/sprite for our enemies, this uses
    // a helper to easily load images
    this.sprite = 'images/enemy-bug.png';

};

var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png'
}



function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

// velocity of the enemy
var valX = 2;
Enemy.prototype.update = function(dt) {
    // Multiplied any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    this.x += valX;
    
    //collision between enemy and the player
    if (player.x < this.x + 85 && player.x + 85 > this.x && player.y < this.y + 65 && player.y + 65 > player.y) {
        mySound = new sound('sounds/collision.wav');
        mySound.play();
        player.x = 200;
        player.y = 380;
    }

       
};

//enemy comes in continues and different speed
var myEnemy = setInterval(myTimer, 2000);


//this function can be used to clear frequent enemy. 
function stopMyEnemy() {
    clearInterval(myEnemy);
}

//player moves when key is pressed that is why player.update 
//does not have anything.
Player.prototype.update = function(dt) {

}

//player's left, right, up, down key 
Player.prototype.handleInput = function(arrowKeyPressed) {

    if (arrowKeyPressed == 'left' && this.x > 0) {
        this.x -= 101;
    } 

    else if (arrowKeyPressed == 'right' && this.x < 350) {
        this.x += 101;
    } 

    else if (arrowKeyPressed == 'up' && this.y > 0) {
        this.y -= 84;
    } 

    else if (arrowKeyPressed == 'down' && this.y < 380) {
        this.y += 84;
    }
    
    //when player reaches less then 0 on Y axis (when player wins), 
    //player goes on starting point and game starts again
   if (this.y < 0) {
        mySound = new sound('sounds/arcade-bleep-sound.wav');
        mySound.play();
        player.x = 200;
        player.y = 380;
    }


};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Placed the player object in a variable called player
var player = new Player(200, 380);

// Placed all enemy objects in an array called allEnemies
var allEnemies = [];


//there are 3 enemy so this array has three enemy starting points
var enemyStartingPoint = [61, 145, 229];

//this is used in setInterval
function myTimer() {
enemyStartingPoint.forEach(function(startingPointOnYaxis) {
    enemyNewBug = new Enemy(0, startingPointOnYaxis, 200);
    allEnemies.push(enemyNewBug);
})
}

// This listens for key presses and sends the keys to 
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
