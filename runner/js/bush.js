"use strict"

// Define bg and its methods
function bush(game, x, y, img){

	Phaser.Sprite.call(this, game, x, y, img);
	this.scale.setTo(1.25, 1.25);

    // put some physics on it
    game.physics.enable(this);
    this.body.velocity.x = -150;
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor (snowflake)
bush.prototype = Object.create(Phaser.Sprite.prototype);
bush.prototype.constructor = bush;

bush.prototype.update = function() {
	game.world.wrap(this, 0, true);
}