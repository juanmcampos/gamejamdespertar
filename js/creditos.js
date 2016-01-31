var creditosState = {
    timer:0,
    preload: function(){
        this.logo       = game.make.sprite(0, 0, 'creditos');
    },
      update:function() {
        this.timer += game.time.elapsed; //this is in ms, not seconds. 
        if (this.timer >= 1000) {
            this.timer -= 1000;
            this.startLabel.visible = !this.startLabel.visible;
        }
    },
    create: function () {
		
		game.add.existing(this.logo);
		this.game.stage.backgroundColor = 0xcccccc;
        
        this.startLabel = game.add.text(160, game.world.height-70,
                                       'Presiona enter para continuar',
                                       {font: '25px Arial', fill: '#000000' });
                                       
        
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        wkey.onDown.addOnce(this.start, this);
    },
    
    start: function () {
        game.state.start('menu');    
    },    
};

