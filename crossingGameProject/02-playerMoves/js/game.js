// create a scene (Where all the action happens)
let gameScene = new Phaser.Scene("Game");


gameScene.init = function(){
    //player speed
    this.playerSpeed = 3;
}
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

};



// set the configuration of the game
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
};

let game = new Phaser.Game(config);

