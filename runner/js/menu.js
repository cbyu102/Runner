"use strict"

// Define the Main Menu state and its methods
var MainMenu = function(game) {};

MainMenu.prototype = {
    preload: function() {
        // Load all assets
        game.load.atlas('atlas', 'assets/img/atlas.png', 'assets/img/atlas.json')
        game.load.audio('bgm', 'assets/audio/bgm.mp3');
        game.load.audio('break', 'assets/audio/break.wav');
        game.load.audio('star', 'assets/audio/starfall.wav');
        game.load.audio('collect', 'assets/audio/collect.wav');
    },
    create: function() {
        // bgm
        game.add.audio('bgm').loopFull();

        game.add.sprite(0,0,'atlas', 'menu.png');
    },
    update: function() {
        // If the player hits the Spacebar, start the game
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            game.state.start('inst');
        }
    },
}