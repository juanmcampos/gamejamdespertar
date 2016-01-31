var menuState = {
    timer:0,
    preload: function(){
        this.logo       = game.make.sprite(0, 0, 'logo');
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
            this.global = game.add.tileSprite(game.world.width-165, 5, 640, 480, 'global');
            
    
            this.global.scale.setTo(0.25,0.25);
               //this.global.alpha = 0;

    //game.add.tween(this.global).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
            
        	this.music = game.add.audio('intro');

             this.music.play();
		

        
        this.startLabel = game.add.text(160, game.world.height-70,
                                       'Presiona enter para iniciar',
                                       {font: '25px Arial', fill: '#000000' });
                                       
         var wkeye = game.input.keyboard.addKey(Phaser.Keyboard.E);
         var wkeyr = game.input.keyboard.addKey(Phaser.Keyboard.R);
         var wkeyq = game.input.keyboard.addKey(Phaser.Keyboard.Q);
         
         wkeye.onDown.addOnce(function(){
             game.state.start('creditos');
         }, this);
         wkeyr.onDown.addOnce(function() {
             game.state.start('play');
         }, this);
         
        wkeyq.onDown.addOnce(function(){
             game.state.start('win');
         }, this);
        
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        wkey.onDown.addOnce(this.start, this);
    },
    
    start: function () {
        game.state.start('caida');    
    },    
};

