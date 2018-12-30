// create a scene (Where all the action happens)
let gameScene = new Phaser.Scene("Game");


gameScene.init = function(){
    //player speed
    this.playerSpeed = 3;

    //enemy speed
    this.enemyMinSpeed = 1;

    this.enemyMaxSpeed = 4;

    //boundaries
    this.enemyMinY = 80;
    this.enemyMaxY = 280;
};


// Load assets
gameScene.preload = function () {
    //load images
    this.load.image("background", "assets/background.png");
    this.load.image("player", "assets/player.png");
    this.load.image("enemy", "assets/dragon.png");
    this.load.image("goal", "assets/treasure.png");

};

// called once after preload ends
gameScene.create = function () {
    //create bg sprite
    let bg = this.add.sprite(0, 0, "background");

    //change the origin of the sprite
    bg.setOrigin(0, 0);

    //create the player
    this.player = this.add.sprite(45, this.sys.game.config.height /2, "player");

    //The player's width and height is multiplied by 0.5, and displayed
    this.player.setScale(0.5);

    this.goal = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height /2, "goal");
    this.goal.setScale(0.7);

    this.enemy = this.add.sprite(190, this.sys.game.config.height / 2, "enemy");
    this.enemy.flipX = true;
    this.enemy.setScale(0.6);

    // set enemy speed
    let dir = Math.random() < 0.5 ? 1 : -1;

    let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
    
    this.enemy.speed = dir * speed;
    };


// this is called up to 60 times per second
gameScene.update = function () {
    // for the enemy to move constantly
    // this.enemy1.x += 0.1

    //check for active input
    if(this.input.activePointer.isDown){
        //player walks if down
        this.player.x += this.playerSpeed;
    };

    //treasure overlap check
    //getBounds finds the four points that the sprite bounds occupy
    let playerRect = this.player.getBounds();
    // console.log(playerRect);
    let treasureRect = this.goal.getBounds();

    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)){
        console.log("reached Goal");

        //restart the scene
        this.scene.manager.bootScene(this);
    }

    this.enemy.y += this.enemy.speed;

    //check we haven't passed min or max Y
    let conditionUp = this.enemy.speed < 0 && this.enemy.y <= this.enemyMinY;
    let conditionDown = this.enemy.speed > 0 && this.enemy.y >= this.enemyMaxY;

    //if we pass the upper limit or lower, reverse speed
    if(conditionUp || conditionDown){
        this.enemy.speed *= -1;
    }


    //check we haven't passed max Y


};



// set the configuration of the game
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
};

let game = new Phaser.Game(config);

