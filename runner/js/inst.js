"use strict"

// Define the Main Menu state and its methods
var inst = function(game) {};

inst.prototype = {
    create: function() {
        game.add.sprite(0,0,'atlas', 'instructions.png');
    },
    update: function() {
        // If the player hits the Spacebar, start the game
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            game.state.start('Play');
        }
    },
}