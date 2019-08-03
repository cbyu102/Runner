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
        game.add.sprite(0,0,'atlas', 'end.png');
        
        //Score and restart is here
        var instructions = game.add.text(300, 250, '', { fontSize: '100px', fill: '#000000' });
        instructions.text = this.score + " m"

    },
    update: function() {
        // If the player hits the Spacebar, restart game
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            game.state.start('Play');
        }
    },
} 