"use strict"

// Define the End state and its methods
var GameOver = function(game) {};

GameOver.prototype = {
    init: function(score) {
        this.score = score;
    },
    preload: function() {
        //There's nothing to preload so this is empty
    },
    create: function() {
        //Score and restart is here
        var instructions = game.add.text(16, 16, '', { fontSize: '32px', fill: '#FFFFFF' });
        instructions.text = "Game Over \n"
                          + "Score: " + this.score
                          + "\nPress SPACEBAR to Restart";

    },
    update: function() {
        // If the player hits the Spacebar, restart game
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            game.state.start('Play');
        }
    },
}