// Used http://perplexingtech.weebly.com/game-dev-blog/using-states-in-phaserjs-javascript-game-developement
// For reference

"use strict";

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Phaser');

// Adds all 3 different states
game.state.add('Menu', MainMenu);
game.state.add('inst', inst);
game.state.add('Play', Play);
game.state.add('End', GameOver);

//Start on the Main Menu state
game.state.start('Menu');