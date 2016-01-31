
var bootState = {
    preload:function() {
        game.load.image('loading',  'assets/sprites/inicio.png');
    },
    
    // The create function is a standard Phaser function, and is
    // automatically called
    create: function () {
		
		
        // Starting the physics system - in this case we are using the
        // simple (but effective) ARCADE physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Calling the load state
        game.state.start('load');
    }   
};
