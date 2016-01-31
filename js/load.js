var text;
var loadState = {
    preload: function() {
           //	Progress report
            game.add.sprite(0, 0, 'loading');
        //game.load.image('loading','assets/mundos/tiles/sol.png');
        
        text = game.add.text(220, 440, 'Cargando...', {
            font: '30px Courier',
            fill: '#ffffff'
        });
       
        
        

    },
    start:function(){
        
        /**
         * Imagenes inanimadas
         * */
        game.load.image('starfield','assets/mundos/tiles/fondo1.png');
        game.load.image('suelo', 'assets/mundos/objetos/suelo.png');
        game.load.image('techo', 'assets/mundos/objetos/techo.png');
        game.load.image('luz', 'assets/gfx/light.png');
        game.load.image('pico1', 'assets/mundos/objetos/pico1.png');
        game.load.image('pico2', 'assets/mundos/objetos/pico1.2.png');
        game.load.image('pico3', 'assets/mundos/objetos/pico2.png');
        game.load.image('pico4', 'assets/mundos/objetos/pico2.2.png');
        game.load.image('jefe1','assets/sprites/1.png');
        game.load.image('logo', 'assets/mundos/tiles/camazotz_logo.png');
        
        game.load.image('muerte1', 'assets/mundos/tiles/gameover01.png');
        game.load.image('muerte2', 'assets/mundos/tiles/gameover02.png');
        game.load.image('muerte3', 'assets/mundos/tiles/gameover03.png');
        game.load.image('creditos', 'assets/mundos/tiles/creditos.png');
        
        game.load.image('controles', 'assets/mundos/tiles/controles.png');
        game.load.image('global', 'assets/mundos/tiles/global_logo.png');
        game.load.image('ganar', 'assets/mundos/tiles/sol.png');
        
        /**
         * Sprites
         * */
        game.load.spritesheet('enemigo', 'assets/sprites/enemigo_basico.png', 70, 117);
        game.load.spritesheet('nina', 'assets/sprites/itza_mas_pequena.png', 64, 123);
        game.load.spritesheet('dude', 'assets/sprites/untitled_1.png', 42.6, 83);
        game.load.spritesheet('pencil', 'assets/sprites/pencil.png', 42.6, 83);
        game.load.spritesheet('1', 'assets/sprites/1.png', 0, 0);
        game.load.spritesheet('2', 'assets/sprites/2.png', 0, 0);
        game.load.spritesheet('3', 'assets/sprites/3.png', 0, 0);
        game.load.spritesheet('4', 'assets/sprites/4.png', 0, 0);
        game.load.spritesheet('5', 'assets/sprites/5.png', 0, 0);
        game.load.spritesheet('6', 'assets/sprites/6.png', 0, 0);
        game.load.spritesheet('7', 'assets/sprites/7.png', 0, 0);
        game.load.spritesheet('8', 'assets/sprites/8.png', 0, 0);
        game.load.spritesheet('9', 'assets/sprites/9.png', 0, 0);
        game.load.spritesheet('baddie', 'assets/sprites/baddie.png', 0, 0);
        game.load.spritesheet('botton1', 'assets/sprites/botton_1.png', 0, 0);
        game.load.spritesheet('botton2', 'assets/sprites/botton_2.png', 0, 0);
        game.load.spritesheet('botton3', 'assets/sprites/botton_3.png', 0, 0);
        game.load.spritesheet('dude2', 'assets/sprites/dude2.png', 0, 0);
        game.load.spritesheet('enemigo2', 'assets/sprites/ENEMIGO_BASICO_2.png', 0, 0);
        game.load.spritesheet('inicio', 'assets/sprites/inicio.png', 0, 0);
        game.load.spritesheet('itza_muerte', 'assets/sprites/itza_muerte.png', 0, 0);
        game.load.spritesheet('itza_tamano', 'assets/sprites/itza_tamano.png', 0, 0);
        game.load.spritesheet('itza', 'assets/sprites/itza.png', 0, 0);
        game.load.spritesheet('lanza', 'assets/sprites/lanza.png', 0, 0);
        game.load.spritesheet('niño', 'assets/sprites/puk.png', 0, 0);
        game.load.spritesheet('niño_2', 'assets/sprites/puk_1.png', 0, 0);
        
        
        /**
         * Archivos de audio
         * */
         // Musica
         //game.load.audio('ambiente1', ['assets/audio/ambient.mp3']);
         //game.load.audio('jefe1', ['assets/audio/boss_1.mp3']);
         game.load.audio('caida', ['assets/audio/fall.mp3']);
         game.load.audio('intro', ['assets/audio/intro.mp3']);
         //game.load.audio('mapa', ['assets/audio/map.mp3'])
         
         // Efectos
         game.load.audio('caminando', ['assets/audio/caminando_normal.mp3']);
         //game.load.audio('corriendo', ['assets/audio/caminando_veloz.mp3']);
         //game.load.audio('ataqueespecialjefe1', ['assets/audio/ataque_especial_jefe1.mp3']);
         //game.load.audio('brincando', ['assets/audio/brincando.mp3']);
         //game.load.audio('cuchillo', ['assets/audio/cuchillo.mp3']);
         //game.load.audio('darkintro', ['assets/audio/dark_intro.mp3']);
         //game.load.audio('luz', ['assets/audio/encendiendo_luz.mp3']);
         //game.load.audio('flecha', ['assets/audio/flecha.mp3']);
         //game.load.audio('golpesuave', ['assets/audio/golpe_suave.mp3']);
         //game.load.audio('muertejefe', ['assets/audio/muerte_jefe.mp3']);
         //game.load.audio('muertetuk', ['assets/audio/muerte_tuk.mp3']);
         //game.load.audio('opcion1', ['assets/audio/option.mp3']);
         //game.load.audio('opcion2', ['assets/audio/option1.mp3']);
         //game.load.audio('perdidasangre', ['assets/audio/perida_sangre.mp3']);
         //game.load.audio('sub', ['assets/audio/sub.mp3']);
         
        
        game.load.start();
    },

    create: function() {
        //game.add.tileSprite(0, 0, 640, 480, 'loading');
        
        //	You can listen for each of these events from Phaser.Loader
        game.load.onLoadStart.add(this.loadStart, this);
        game.load.onFileComplete.add(this.fileComplete, this);
        game.load.onLoadComplete.add(this.loadComplete, this);
        this.start();
        
        
    },
     loadStart:function() {

	text.setText("Cargando ...");

},
    fileComplete:function(progress, cacheKey, success, totalLoaded, totalFiles) {
    text.fontSize=22;
    text.x=60;
	text.setText("Archivos Completados: " + progress + "% - " + totalLoaded + " de " + totalFiles);


},

loadComplete:function() {

	text.setText("Carga Completada");
	game.state.start('menu');

}
};