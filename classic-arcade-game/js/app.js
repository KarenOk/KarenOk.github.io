// Enemy class to instantiate player object
var Enemy = function(y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100 ;
    this.y = y ;
    this.speed = Math.floor(Math.random() * Math.floor(200)) + 30
};

// Detemines position of the enemy on update
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt) ;

    // TODO: Remove enemy from array or delete "this" enemy entirely
    if (this.x > 800) {
        let index = allEnemies.findIndex(x => x === this)
        allEnemies.splice(index, 1)     
    }
};

// Render enemy to the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check for collisions
Enemy.prototype.checkCollision = function(){
    // Object a: player
    // Object b: enemy
    let a = player.getCoordinates()
    let b = {x: Math.floor(this.x), y: Math.floor(this.y)} ;

    if (b.x + 101 >= a.x &&
        b.x <= a.x + 101 &&
        b.y + 95 >= a.y + 48 &&
        b.y + 76 <= a.y + 123){
            setTimeout(function() {
                player.reset();
            }, 110)       

        }

}


// Player class to instantiate player object
class Player{
    constructor(){
        this.x = 202 ;
        this.y = 375 ;
        this.sprite = "images/char-princess-girl.png"
        this.score = 0
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        setScore();
    }

    update(){   
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        setScore();
    }

    reset(){
        this.x = 202 ;
        this.y = 375 ;
    }

    getCoordinates(){
        return {x: this.x , y:this.y}
    }

    handleInput(key){

        switch(key){
            case "up":
                //  Moves player upwards but not past the water
                if (this.y-83 >= -40){
                   this.y -= 83;
                   
                    // Little delay before resetting player position after getting to the water
                   if (this.y < 0){
                        setTimeout((function(){
                            this.reset();
                            score += 1;
                            if(score > highScore){
                                localStorage.setItem("highscore", score)
                            }
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
// let interval = 800 // initial time interval to generate enemy 

function generateEnemies(){
    let yCord = [43, 126, 209] // co-ords of the stone paths.
    enemy = new Enemy(yCord[Math.floor(Math.random() * Math.floor(4))]);
    allEnemies.push(enemy)
    // interval = Math.floor(Math.random() * Math.floor(1000)) + 1000 
}

// Generate enemies at intervals
setInterval(generateEnemies, 1800)
