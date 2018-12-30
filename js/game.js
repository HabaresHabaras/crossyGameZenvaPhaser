// create a scene (Where all the action happens)
let gameScene = new Phaser.Scene("Game");


gameScene.init = function () {
    //player speed
    this.playerSpeed = 3;

    //enemy speed
    this.enemyMinSpeed = 1;

    this.enemyMaxSpeed = 4;

    //boundaries
    this.enemyMinY = 80;
    this.enemyMaxY = 280;

    //we are not terminating
    this.isTerminating = false;


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
    this.player = this.add.sprite(45, this.sys.game.config.height / 2, "player");

    //The player's width and height is multiplied by 0.5, and displayed
    this.player.setScale(0.4);

    this.goal = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, "goal");
    this.goal.setScale(0.7);


    //enemy
    this.enemies = this.add.group({
        key: "enemy",
        repeat: 5,
        setXY: {
            x: 90,
            y: 100,
            //this adds 80 to x and 20 to y, five times, for each of the sprites loaded after the first one
            stepX: 80,
            stepY: 20
        }
    });

    //setting scale to all enemies group members

    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);


    //set flipX and speed to all members of enemies

    Phaser.Actions.Call(this.enemies.getChildren(), function (enemy) {
        //flip enemy
        enemy.flipX = true;

        //set speed
        let dir = Math.random() < 0.5 ? 1 : -1;
        let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
        enemy.speed = dir * speed;

        //set enemy speed
    }, this);

    //this gets all the sprites inside the enemies group
    // console.log(this.enemies.getChildren());

};


// this is called up to 60 times per second
gameScene.update = function () {
    // for the enemy to move constantly
    // this.enemy1.x += 0.1


    //dont execute if we are terminating
    if(this.isTerminating) return;

    //check for active input
    if (this.input.activePointer.isDown) {
        //player walks if down
        this.player.x += this.playerSpeed;
    };

    //treasure overlap check
    //getBounds finds the four points that the sprite bounds occupy
    let playerRect = this.player.getBounds();
    // console.log(playerRect);
    let treasureRect = this.goal.getBounds();

    if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
        console.log("reached Goal");

        //restart the scene
        this.scene.manager.bootScene(this);
    }

    //get enemies
    let enemies = this.enemies.getChildren();
    let numEnemies = enemies.length;


    for (let i = 0; i < numEnemies; i++) {
        //enemy movement
        enemies[i].y += enemies[i].speed;

        //check we haven't passed min or max Y
        let conditionUp = enemies[i].speed < 0 && enemies[i].y <= this.enemyMinY;
        let conditionDown = enemies[i].speed > 0 && enemies[i].y >= this.enemyMaxY;

        //if we pass the upper limit or lower, reverse speed
        if (conditionUp || conditionDown) {
            enemies[i].speed *= -1;
        }

        let enemyRect = enemies[i].getBounds();

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
            console.log("Game Over!");

            //end game
            return this.gameOver();
            
        }
    }
};

gameScene.gameOver = function(){

    //initiate game over sequence
    this.isTerminating = true;

    this.cameras.main.shake(500);

    //per the documentation after shake is called, and event is triggered called:
    //camerashakecomplete
    this.cameras.main.on("camerashakecomplete", function(camera, effect){
    //restart the Scene
        //fade out
        this.cameras.main.fade(500);

    }, this);

    this.cameras.main.on("camerafadeoutcomplete", function(camera, effect){

    //restart the Scene
    this.scene.restart();
    }, this)

}

// set the configuration of the game
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
};

let game = new Phaser.Game(config);

