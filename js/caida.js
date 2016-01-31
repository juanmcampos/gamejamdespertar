var caidaState={
    create: function(){
        	this.music = game.add.audio('caida');

             this.music.play();
      game.physics.setBoundsToWorld();
      this.game.stage.backgroundColor = 0x4488cc;
      this.starfield = game.add.tileSprite(0, 0, 640, 480, 'starfield');
      this.controles = game.add.tileSprite(0, game.world.height-75, 614, 75, 'controles');
      this.player();
      this.texto="En la época prehispánica la fertilidad, carencia,\n enfermedades y abundancia eran regalos y castigos\n traídos por los antiguos dioses, los humanos\n estaban a merced de ellos.";
      this.texti=game.add.text(10, 0, this.texto,  { font: "22px Arial", fill: '#ffffff', backgroundColor: 'rgba(100,100,100,0.25)' });
      
      this.texti.setTextBounds(0, 100, 620, 100);
      
      game.time.events.add(Phaser.Timer.SECOND * 5, this.mensajes, this);
      game.time.events.add(Phaser.Timer.SECOND * 12, this.mensajes1, this);
      game.time.events.add(Phaser.Timer.SECOND * 19, this.mensajes2, this);
      game.time.events.add(Phaser.Timer.SECOND * 22, this.mensajes3, this);
      game.time.events.add(Phaser.Timer.SECOND * 29, this.mensajes4, this);
      game.time.events.add(Phaser.Timer.SECOND * 36, this.mensajes5, this);
      game.time.events.add(Phaser.Timer.SECOND * 42, this.avanzar, this);
      
      
    },mensajes: function(mensaje){
      
    this.texto="Uno de esos dioses era Camazotz, quién se encargaba de\n gobernar las tinieblas desde los cielos nocturnos,\n a su paso, las enfermedades se esparcían con el\n viento de sus alas de murciélago.";
    this.texti.text=this.texto;
    },mensajes1: function(mensaje){
      
    this.texto="Con la llegada de la ciencia occidental, las enfermedades\n cesaron y Camazotz, al perder poder, dejó los cielos\n y se refugió en el cálido subsuelo, esperando a que \nalgún día alguien llegue y ofrezca su sangre para \nsaciar su sed… ";
    this.texti.text=this.texto;
    },mensajes2: function(mensaje){
      
    this.texto="Al parecer ese día ha llegado...";
    this.texti.text=this.texto;
    },mensajes3: function(mensaje){
      
    this.texto="El jueves 19 de septiembre de 1985 es un día que \nmuy pocos olvidarán y otros más desearan borrarlo \npor completo de sus mentes.";
    this.texti.text=this.texto;
    },mensajes4: function(mensaje){
      
    this.texto="Eran las 7:20 de la mañana cuando la tierra\n dio fuertes sacudidas, Itza y Puk se encontraban\n jugando cuando se abrió una grieta y de\n pronto caen a una antigua gruta Maya donde se hacían sacrificios\n al Dios Camazotz.";
    this.texti.text=this.texto;
    },mensajes5: function(mensaje){
      
    this.texto="Itza se lastima con una piedra y le causa una\n herida profunda por lo que se está desangrando, su hermano Puk intenta sacarla\n del lugar y empieza a caminar encontrándose con antiguos guerreros\n que desean derramar su sangre para completar el ritual y lograr\n despertar a Camazotz.";
    this.texti.text=this.texto;
    },player: function() {
          this.personaje = game.add.sprite(game.world.width / 2 - 20, game.world.height /2, 'dude');
          game.physics.enable(this.personaje);
          this.personaje.scale.setTo(1.5, 1.5);
          this.personaje.angle=65;
          
         this.nina = game.add.sprite(game.world.width / 2 + 20, game.world.height /2 + 100, 'nina');
          game.physics.enable(this.nina);
         this.nina.scale.setTo(.7, .7);
          this.nina.angle=-65; 
          
      },update: function(){
     
          this.starfield.tilePosition.y-=2;
          
    },
        // The restart function calls the menu state    
    avanzar: function () {
        game.state.start('play');    
    },
};