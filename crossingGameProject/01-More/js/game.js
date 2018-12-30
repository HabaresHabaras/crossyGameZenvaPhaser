// create a scene (Where all the action happens)
let gameScene = new Phaser.Scene("Game");


// Load assets
gameScene.preload = function () {
    //load images
    this.load.image("background", "assets/background.png");
    this.load.image("player", "assets/player.png");
    this.load.image("enemy", "assets/dragon.png");

};

// called once after preload ends
gameScene.create = function () {
    //create bg sprite
    let bg = this.add.sprite(0, 0, "background");

    //change the origin of the sprite
    bg.setOrigin(0, 0);

    //create the player
    this.player = this.add.sprite(45, 180, "player");

    //The player's width and height is multiplied by 0.5, and displayed
    this.player.setScale(0.5);

    //create enemy
    this.enemy1 = this.add.sprite(200, 180, "enemy");

    this.enemy1.setScale(1);

    // rotating angle of the sprite
    this.enemy1.angle = 45;

    //another way of rotating the angle of a sprite
    // this.enemy1.setAngle(45);

    //if you write the angle as a negative number, it will rotate to the other side
    // this.enemy1.setAngle(-45);

    //another way of rotating 45 degrees
    // this.enemy1.rotation = Math.PI / 4;

    //To change the point used to rotate the sprite
    // this.enemy1.setOrigin(0,0);

    //another way of rotating
    // this.enemy1.setRotation(Math.PI / 4);
};


// this is called up to 60 times per second
gameScene.update = function () {
    // for the enemy to move constantly
    // this.enemy1.x += 0.1;


    //for the enemy to rotate continously
    this.enemy1.angle += 0.1;

    //make sprite grow till its twice as wide
    if(this.enemy1.scaleX < 2){
        this.enemy1.scaleX += 0.01
        this.enemy1.scaleY += 0.01
        };
};



// set the configuration of the game
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
};

let game = new Phaser.Game(config);

