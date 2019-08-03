//https://phaser.io/examples/v2/time/basic-repeat-event --> make the stars
/*************************************************************************

ITS DIFFERENT I TIHNK

The technical tilt that I did was using two different
groups for the health bar. The light group's alpha is always decreasing
until 0 unless you pick up a star which would increase it. If all the
items in that group's alpha reaches 0 then it's game over. The regular
health bar also facters in becuase the number of items in the light group
is determined by the health group. If there is no more health, then 
it is also gameover.

The aesthetic tilt is that I created all the art. That two health
thing above is trying something new in the endless runner form.

***The background music was created by Kevin MacLeod***
*************************************************************************/

"use strict";

var Play = function(game) {};

// here's all the variables

Play.prototype = {
    init: function(){
        this.player;
        this.platforms;
        this.trees;
        this.bushes;
        this.rocks;
        this.stumps
        this.bats;
        this.cursors;
        this.stars;
        this.light;
        this.break;
        this.health;
        this.n = 2;
        this.dmg = 0;
        this.score = 0;
        this.scoreText;
        this.rock;
        this.stump;
        this.bat;
        this.updateScore
    },
    preload: function() {
        // assets all loaded
    },

    create: function() {
        //  You need this for the physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  This is the sky
        game.add.sprite(0, 0, 'atlas', 'sky.png');
        //  This adds the background
        var ground = game.add.sprite(0, game.world.height - 128, 'atlas', 'platform.png');
        ground.scale.setTo(2, 2); // Make the ground fit
        for(var i = 0; i <= 800; i += 100){
            this.trees = new tree(game, i, game.world.height - 380, 'atlas', 'tree.png', -40);
            game.add.existing(this.trees);
        }
        for(var i = 0; i <= 800; i += 155){
            this.trees = new tree(game, i, game.world.height - 350, 'atlas', 'tree.png', -75);
            game.add.existing(this.trees);
        }
        for(var i = 0; i <= 800; i += 125){
            this.bushes = new bush(game, i, game.world.height - 150, 'atlas', 'bush.png');
            game.add.existing(this.bushes);
        }

        //  Makes the platform group and ground
        this.platforms = game.add.group();
        this.platforms.enableBody = true; // It is a thing that exists in the game not just a bg
        var ground = this.platforms.create(0, game.world.height - 64, 'atlas', 'platform.png');
        ground.scale.setTo(2, 2); // Make the ground fit
        ground.body.immovable = true; // Makes it so the ground doesn't move
        var die = this.platforms.create(-100, game.world.height - 64, 'atlas', 'platform.png');

        //  Makes the player and animations
        this.player = game.add.sprite(32, game.world.height - 300, 'atlas', 'bebie0');
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 1500; // Gracity exists
        this.player.body.collideWorldBounds = true;  // Can't go off the map
        this.break = this.player.animations.add('break', ['bebie3', 'bebie4', 'bebie5'], 4, false);
        this.player.animations.add('right', ['bebie0', 'bebie1', 'bebie2', 'bebie1'], 5, true); // walking animation to the right
        this.player.body.setSize(66, 128, 25, 19);

        // Makes the stars
        this.stars = game.add.group();
        game.time.events.loop(Phaser.Timer.SECOND * 5, createStars, this);
        function createStars(){
            var go = Math.random();
            if(go > 0.3){  
                var star = new stars(game, 'atlas', 'star.png');
                game.add.existing(star);
                this.stars.add(star);
            }
        }

        // Makes some rocks
        this.rocks = game.add.group();
        this.rocks.enableBody = true;
        game.time.events.loop(Phaser.Timer.SECOND * 2, makeRock, this);
        function makeRock(){
            // There's a 50% chance of a rock generating every 2 seconds.
            var go = Math.random();
            if(go > 0.5){
                this.rock = this.rocks.create(800, game.world.height - 125, 'atlas', 'rock.png');
                this.rock.body.velocity.x = -150 - this.score;
                this.rock.body.setSize(55, 33, 4, 30);
            }
        }

        // Makes some stumps
        this.stumps = game.add.group();
        this.stumps.enableBody = true;
        game.time.events.loop(Phaser.Timer.SECOND * 2.3, makeStump, this);
        function makeStump(){
            var go = Math.random();
            var AAA = this.score/100;
            //the probability of the stumps generating scales as the score increases
            if(go < AAA){
                this.stump = this.stumps.create(800, game.world.height - 115, 'atlas', 'stump.png');
                this.stump.body.velocity.x = -150 - this.score;
            }
        }

        // Makes some bats
        this.bats = game.add.group();
        this.bats.enableBody = true;
        game.time.events.loop(Phaser.Timer.SECOND * 2.7, makeBat, this);
        function makeBat(){
            var go = Math.random();
            var AAA = this.score/200;
            //The probability of the bats generating also scalses as the score increases.
            if(go < AAA){
                this.bat = this.bats.create(800, game.rnd.integerInRange(0, 300), 'atlas', 'bat0');
                this.bat.body.velocity.x = -250 - this.score;
                this.bat.animations.add('fly', ['bat0', 'bat1', 'bat2'], 5, true);
                this.bat.animations.play('fly');
            }
        }


        // Makes the health bar
        this.light = game.add.group(); // this one is the lights
        this.l3 = this.light.create(30, 30, 'atlas', 'light.png');
        this.l2 = this.light.create(64 + 35, 30, 'atlas', 'light.png');
        this.l1 = this.light.create(128 + 40, 30, 'atlas', 'light.png');
        this.health = game.add.group(); // this one is the jars
        this.jar3  = this.health.create(30, 30, 'atlas', 'health.png');
        this.jar2 = this.health.create(64 + 35, 30, 'atlas', 'health.png');
        this.jar1 = this.health.create(128 + 40, 30, 'atlas', 'health.png');

        //  Shows the score
        this.scoreText = game.add.text(700, 16, '0 m', { fontSize: '32px', fill: '#000' });

        //  Implements the controls.
        this.cursors = game.input.keyboard.createCursorKeys();

        //update score by 1 every second
        this.updateScore = game.time.create(false); //make timer
        this.updateScore.loop(1000, addScore, this); //set to loop every second
        this.updateScore.start(); //start timer
        function addScore(){ //add one to score and display
            this.score++;
            this.scoreText.text = this.score + ' m';
        }

    },

    update: function() {
        // Function to game over
        function gameover(score){
            game.state.start('End', true, false, score);
        }

        // Stars die if they hit the ground 
        game.physics.arcade.overlap(this.stars, this.platforms, killstar, null, this);
        function killstar(star){
            star.kill()
            game.add.audio('star').play();
        }


        //  Collide the player with the platforms
        var hitPlatform = game.physics.arcade.collide(this.player, this.platforms);
        
        //  Function to collect a star
        function collectStar(player, star){
            star.kill();
            game.add.audio('collect').play();
            // a star can refill up to 2 jars but not completely
            //leftover number after increasing the alpha of one jar back to 1
            var num = 1 - this.light.getAt(this.n).alpha; 
            this.light.getAt(this.n).alpha = 1;
            // If there are more jars to refill,
            if(this.n < 2 - this.dmg){
                this.n += 1;
                // they get the leftover number added to their alpha
                this.light.getAt(this.n).alpha += num;
            }
        }
        
        // Checks to see if player is touching a star
        game.physics.arcade.overlap(this.player, this.stars, collectStar, null, this);

        //  Function for hitting something
        function hit(boi, ooo){
            // I don't know how else to make it so that you don't die instantly
            //without killing the object :( 
            ooo.kill();
            // Animation and sound
            game.add.audio('break').play();
            boi.animations.play('break');
            // Health and light gets damaged
            // there can't be light without health
            this.health.getAt(2-this.dmg).kill();
            this.light.getAt(2-this.dmg).kill();
            // If the index of current light is the same as the one that was deleted,
            if(this.n == (2-this.dmg)){
                this.n--; //  change it to one lower
            }
            // damage gets increased
            this.dmg++;
            // Game over after no more health
            if(this.health.total == 0){
                gameover(this.score);
            }
        }
        
        // The light of the stars are fading
        this.light.getAt(this.n).alpha -= .001;
        // if the light's alpha gets to 0,
        if (this.light.getAt(this.n).alpha <= 0){
            // change the current index to the next light
            this.n--;
            // if that was the last light, game over
            if(this.n < 0){
                gameover(this.score);
            }
        }
        if(this.n < 0){
            gameover(this.score);
        }

        // rocks, stumps, bats are all enemies you can hit
        game.physics.arcade.collide(this.player, this.rocks, hit, null, this);
        game.physics.arcade.collide(this.player, this.stumps, hit, null, this);
        game.physics.arcade.collide(this.player, this.bats, hit, null, this);

        this.player.body.velocity.x = 0;
        // Player movement
        if (this.cursors.left.isDown){
            //  Move to the left
            this.player.body.velocity.x = -150 - this.score;
            if(!this.break.isPlaying){
                this.player.animations.stop();
                this.player.frame = 4;
            }
        } else if (this.cursors.right.isDown){
            //  Move to the right
            this.player.body.velocity.x = 150;
            if(!this.break.isPlaying){
                this.player.animations.play('right');
            }
        } else{
            //  Stand still
            if(!this.break.isPlaying){
                this.player.animations.play('right');
            }
        }

        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform)
        {
            this.player.body.velocity.y = -750;
        } else if (!this.player.body.touching.down){
            if(!this.break.isPlaying){
                this.player.animations.stop();
            }
        }

        // FASTER?????????????? It doesn't work...
        //this.trees.setAll('body.velocity.x', this.score, false, false, 2, false);
        //this.bushes.setAll('body.velocity.x', this.score, false, false, 2, false);


        // DEBUG
        //game.debug.body(this.player);
        //game.debug.body(this.rock);
    },
}
