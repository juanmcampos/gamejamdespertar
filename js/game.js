
// Create torch objects
// Torch constructor
var Torch = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'luz');
    this.visible=false;

    // Set the pivot point for this sprite to the center
    this.anchor.setTo(0.5, 0.5);
};

// Torches are a type of Phaser.Sprite
Torch.prototype = Object.create(Phaser.Sprite.prototype);
Torch.prototype.constructor = Torch;

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'juegoDiv');

// Define our 'global' variable 
game.global = { score: 0 };

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);
game.state.add('caida', caidaState);
game.state.add('muerte1', muerte1State);
game.state.add('muerte2', muerte2State);
game.state.add('creditos', creditosState);

game.state.start('boot');
