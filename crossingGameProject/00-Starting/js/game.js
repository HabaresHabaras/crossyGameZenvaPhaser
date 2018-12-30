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
gameScene.create = function(){
    //create bg sprite
    let bg = this.add.sprite(0,0, "background");

    //change the origin of the sprite
    bg.setOrigin(0,0);
    //this is another method to do the same, instead of changing the origin, we push the image to the right and down
    // bg.setPosition(320,180);

    //create the player
    let player = this.add.sprite(45, 180, "player");

    // To push a sprite on x and y
    // player.x = 10;
    // player.y = 10;
    
    //The player's width and height is multiplied by 0.5, and displayed
    player.setScale(0.5);
    
    //create enemy
    let enemy1 = this.add.sprite(200, 180, "enemy");

    // same as setScale() but for individually x or y
    enemy1.scaleX = 1;
    enemy1.scaleY = 2;

    let enemy2 = this.add.sprite(400, 180, "enemy");

    //same as setScale but directly changing the display width
    enemy2.displayWidth = 100;

    //flip method to switch the direction the sprite is facing
    enemy1.flipX = true;
    enemy1.flipY = true;
    
    // to get the game height and width
    // let gameW = this.sys.game.config.width;
    // let gameH = this.sys.game.config.height;

    // to see the sprite object with its available methods
    // console.log(bg);
    // to see the scene object and available methods
    // console.log(this);
};
// set the configuration of the game
let config = {
    type: Phaser.AUTO, //Phaser will use WebGL if available, if not it will user canvas
    width: 640,
    height: 360,
    scene: gameScene
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);


// init() => preload() => create() => update()
//start the game => load all images before the game starts
//making the game and showing it to player => update all changes
//and reflect the user's actions

