"use strict"

// Define bg and its methods
function tree(game, x, y, atlas, img, speed){

	Phaser.Sprite.call(this, game, x, y, atlas, img);

    // put some physics on it
    game.physics.enable(this);
    this.body.velocity.x = speed;
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor (snowflake)
tree.prototype = Object.create(Phaser.Sprite.prototype);
tree.prototype.constructor = tree;

tree.prototype.update = function() {
	game.world.wrap(this, 0, true);
}