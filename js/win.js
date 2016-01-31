var winState = {
    timer:0,
     preload: function(){
        this.logo       = game.make.sprite(0, 0, 'ganar');
    },
      update:function() {
        this.timer += game.time.elapsed; //this is in ms, not seconds. 
        if (this.timer >= 1000) {
            this.timer -= 1000;
            this.startLabel.visible = !this.startLabel.visible;
        }
    },
    create: function() {	
        
        game.add.existing(this.logo);
		
	var winLabel = game.add.text(80, 80, 'Haz ganado!\n Derrotaste a Ahuizotl!',
								{font: '50px Arial', fill: '#00FF00' });

		// We give the player instructions on how to restart the game
	this.startLabel = game.add.text(80, game.world.height-80,
								   'Presiona ENTER para reiniciar',
								   {font: '25px Arial', fill: '#ffffff' });

        // We define the wkey as Phaser.Keyboard.W so that we can act
        // when the player presses it
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        // When the player presses the W key, we call the restart function
        wkey.onDown.addOnce(this.restart, this);
    },
    
    // The restart function calls the menu state    
    restart: function () {
        game.state.start('creditos');    
    }, 	
}
