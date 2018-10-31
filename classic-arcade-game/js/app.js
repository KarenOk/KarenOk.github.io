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
    // this.y = this.y
    console.log(this.y)
   
    // TODO: Remove enemy from array or delete enemy entirely
    if (this.x > 800) {
        let index = allEnemies.findIndex(x => x === this)
        console.log(index)
        allEnemies.slice(index, 1)
        console.log("deleteddd")
    }
};

// Render enemy to the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check for collisions
Enemy.prototype.checkCollision = function(a){
    // if ( playerCoords.x === this.x ||  playerCoords.y === this.y ){
    //     player.reset()
    // }
    // console.log(Math.floor(this.x), " ", Math.floor(this.y))

    // if (a.x === Math.floor(this.x)  && 
    //     a.y === Math.floor(this.y)){
    //      debugger;
    //     player.reset()
    //     console.log("Gjg")
    // }
    let b = this;
    if (a.x <= Math.floor(b.x) + b.width &&
        a.x + a.width >= Math.floor(b.x) &&
        a.y <= b.y + b.height &&
        a.y + a.height >= b.y) {
            debugger;
            player.reset()
            console.log("Fjgg")
        }
}


// Player class 

class Player{
    constructor(){
        this.x = 202 ;
        this.y = 375 ;
        this.sprite = "images/char-princess-girl.png"
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
                if (this.y-83 >= -40){
                   this.y -= 83;
                   
                    // Little delay before resetting player position after getting to the water
                   if (this.y < 0){
                        setTimeout((function(){
                            this.reset();
                            console.log(this)
                        }).bind(this), 100)
                   }
                }
    
                break;

            case "down": 
                // Moves player downwards, but not past the grass
                if (this.y+83 < 400){
                    this.y += 83;
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
        console.log(this.x, " ", this.y)
    }
}

// Event listener to listen for key presses
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


var player = new Player()
var allEnemies = [] ;
let interval = Math.floor(Math.random() * Math.floor(1000)) + 400 ; // random time value for set interval function

function generateEnemies(){
    let yCord = [43, 126, 209] // co-ords of the stone paths.
    enemy = new Enemy(0, yCord[Math.floor(Math.random() * Math.floor(4))]);
    allEnemies.push(enemy)
}

// Generate enemies at intervals
setInterval(generateEnemies, 3000)


// TODO : Delete enemies

console.log("")