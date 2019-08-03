"use strict"

// Define stars and its methods
function stars(game, atlas, img){
    // Make the star at a random location
    Phaser.Sprite.call(this, game, game.rnd.integerInRange(400, 800) - 32, -32, atlas, img);
    
    this.scale.setTo(.75,.75);
    // Rotation properties
    this.anchor.set(0.5);
    this.rotation = Math.PI;
    
    // put some physics on it
    game.physics.enable(this);
    this.body.velocity.x = game.rnd.integerInRange(-100,-200);
    this.body.velocity.y = game.rnd.integerInRange(100, 400);
    this.body.angularVelocity = game.rnd.integerInRange(-400,-100);
    this.body.setCircle(24)
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor (stars)
stars.prototype = Object.create(Phaser.Sprite.prototype);
stars.prototype.constructor = stars;