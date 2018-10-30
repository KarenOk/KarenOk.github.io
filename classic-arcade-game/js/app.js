/*
 * @constructor: Enemies our player must avoid
 * @params: y: Determines the row the enemy will be on
 * 
 */

var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100 ;
    this.y = y ;
    this.speed = Math.floor(Math.random() * Math.floor(200)) + 30
};

// Detemines position of the enemy on update
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt) ;
   
    // TODO: Remove enemy from array or delete enemy entirely
};

// Render enemy to the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check for collisions
Enemy.prototype.checkCollision = function(playerCoords){
    if ( playerCoords.x === this.x ||  playerCoords.y === this.y ){
        player.reset()
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{
    constructor(){
        this.x = 202 ;
        this.y = 400 ;
        this.sprite = "images/char-boy.png"
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
    }

    update(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
    }

    reset(){
        this.x = 202 ;
        this.y = 400 ;
    }

    coordinates(){
        return {x: this.x , y:this.y}
    }

    handleInput(key){

        switch(key){
            case "up":
                //  Moves player upwards but not past the water
                //  Player can reach the water
                if (this.y-86 > -31){
                   this.y -= 86;
                   
                   if (this.y < 0){
                        setTimeout(function(){
                            
                        }, 1000)
                        this.reset();
                   }
                }
    
                break;

            case "down": 
                // Moves player downwards but not past the grass
                if (this.y+86 < 486){
                    this.y += 86;
                }
                break;

            case "left":
                // Moves player left, but not out of the game
                if ( !(this.x-101 < 0) ){
                    this.x -= 101
                }
                break;

            case "right":
                // Moves player right, but not out of the game
                if ( !(this.x+101 >= 505) ){
                    this.x += 101
                }
                break;
        }
    }
}

// Now instantiate your objects.
let yCord = [60, 145, 230]

enemy1 = new Enemy(0, yCord[Math.floor(Math.random() * Math.floor(4))]);
enemy2 = new Enemy(0, yCord[Math.floor(Math.random() * Math.floor(4))]);
enemy3 = new Enemy(0, yCord[Math.floor(Math.random() * Math.floor(4))]);
enemy4 = new Enemy(0, yCord[Math.floor(Math.random() * Math.floor(4))]);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4]

// Place the player object in a variable called player
var player = new Player()

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// TODO : Generate enemies function
// TODO : Delete enemies