//https://phaser.io/examples/v2/time/basic-repeat-event --> make the stars

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
        this.cursors;
        this.stars;
        this.score = 0;
        this.scoreText;
        this.rock;
        this.timerock = game.rnd.integerInRange(3, 5);
        this.timestar = game.rnd.integerInRange(5, 10);
    },
    preload: function() {
        // assets all loaded
    },

    create: function() {
        //  You need this for the physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  This is the sky
        game.add.sprite(0, 0, 'sky');
        //  This adds the background
        var ground = game.add.sprite(0, game.world.height - 140, 'ground');
        ground.scale.setTo(2, 2); // Make the ground fit
        for(var i = 0; i <= 800; i += 100){
            this.trees = new tree(game, i, game.world.height - 380, 'tree', -40);
            game.add.existing(this.trees);
        }
        for(var i = 0; i <= 800; i += 155){
            this.trees = new tree(game, i, game.world.height - 350, 'tree', -75);
            game.add.existing(this.trees);
        }
        for(var i = 0; i <= 800; i += 80){
            this.bushes = new bush(game, i, game.world.height - 144, 'bush');
            game.add.existing(this.bushes);
        }

        //  Makes the platform group and ground
        this.platforms = game.add.group();
        this.platforms.enableBody = true; // It is a thing that exists in the game not just a bg
        ground = this.platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2); // Make the ground fit
        ground.body.immovable = true; // Makes it so the ground doesn't move

        //  Makes the player and animations
        this.player = game.add.sprite(32, game.world.height - 300, 'dude');
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 600; // Gracity exists
        this.player.body.collideWorldBounds = true;  // Can't go off the map
        this.player.animations.add('right', [0, 1, 2, 1], 5, true); // walking animation to the right
        this.player.body.setSize(66, 128, 25, 19)

        // Makes the stars
        this.stars = game.add.group();
        game.time.events.loop(Phaser.Timer.SECOND * this.timestar, createStars, this);
        function createStars(){
            this.timestar = game.rnd.integerInRange(5, 20);
            var num = game.rnd.integerInRange(1, 5);
            for (var i = 0; i < num; i++){
                var star = new stars(game, 'star');
                game.add.existing(star);
                this.stars.add(star);
            }
        }

        // Makes some rocks
        this.rocks = game.add.group();
        this.rocks.enableBody = true;
        game.time.events.loop(Phaser.Timer.SECOND * this.timerock, makeRock, this);
        function makeRock(){
            this.timerock = game.rnd.integerInRange(2, 5);
            this.rock = this.rocks.create(800, game.world.height - 125, 'rock');
            this.rock.body.velocity.x = -175;
            this.rock.body.setSize(55, 33, 4, 30);
        }


        //  Shows the score
        this.scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

        //  Implements the controls.
        this.cursors = game.input.keyboard.createCursorKeys();

    },

    update: function() {

        //  Collide the player, stars with the platforms
        var hitPlatform = game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.stars, this.platforms); // Stars can't go through platforms

        //  Function to collect a star
        function collectStar(player, star){
            star.kill();
            this.score+=10;
            this.scoreText.text = 'Score: ' + this.score;
        }
        // Checks to see if player is touching a star
        game.physics.arcade.overlap(this.player, this.stars, collectStar, null, this);

        //  Function for hitting a rock
        function hit(player, rock){
            gameover(this.score);
        }

        game.physics.arcade.overlap(this.player, this.rocks, hit, null, this);

        // Function to game over
        function gameover(score){
            game.state.start('End', true, false, score);
        }

        this.player.animations.play('right');
        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;

       
        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform)
        {
            this.player.body.velocity.y = -400;
        } else if (!this.player.body.touching.down){
            this.player.animations.stop();
        }

        // DEBUG
        //game.debug.body(this.player);
        //game.debug.body(this.rock);
    },
}