"use strict"

// Define the Main Menu state and its methods
var MainMenu = function(game) {};

MainMenu.prototype = {
    preload: function() {
        // Load all assets
        game.load.image('sky', 'assets/img/sky.png');
        game.load.image('ground', 'assets/img/platform.png');
        game.load.image('star', 'assets/img/star.png');
        game.load.image('tree', 'assets/img/tree.png');
        game.load.image('rock', 'assets/img/rock.png');
        game.load.image('bush', 'assets/img/bush.png');
        game.load.spritesheet('dude', 'assets/img/bebie.png', 128, 148);
    },
    create: function() {
        //Instructions are here
        var text = "Collect stars to get points. \nPress the UP ARROWKEY to jump and avoid rocks.\n"
                 + "Press SPACEBAR to Play";
        var instructions = game.add.text(16, 16, text, { fontSize: '32px', fill: '#FFFFFF'});
    },
    update: function() {
        // If the player hits the Spacebar, start the game
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            game.state.start('Play');
        }
    },
}