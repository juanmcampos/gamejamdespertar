  var FIRE_RATE = 250;
  var nextFire;
  var weaponIndex = 0;
  var weapons;
  var playState = {

      throwSomething: function(game) {

          // has it been long enough? can we throw something yet?
          if (game.time.now > nextFire) {

              nextFire = game.time.now + FIRE_RATE;

              // see if a weapon is available from the group
              var weapon = weapons[weaponIndex].sprites.getFirstExists(false);
              if (weapon) {

                  weapon.exists = true;
                  weapon.anchor.setTo(0.5, 0.5);
                  weapon.reset(this.personaje.body.position.x + 50, this.personaje.body.position.y - 20 + 50);
                  game.physics.arcade.enable(weapon);

                  weapon.lifespan = weapons[weaponIndex].lifespan;
                  weapon.body.angularVelocity = weapons[weaponIndex].spin;
                  weapon.body.velocity.y = weapons[weaponIndex].velocity.y;
                  weapon.power = weapons[weaponIndex].power;
                  if (this.personaje.scale.x == 1) {
                      weapon.body.velocity.x = weapons[weaponIndex].velocity.x;
                  } else {
                      weapon.body.velocity.x = -weapons[weaponIndex].velocity.x;
                  }

              }

          }

      },

      player: function() {
          this.personaje = game.add.sprite(game.width / 4, game.world.height - 70, 'dude');
          game.physics.enable(this.personaje);
          this.personaje.body.collideWorldBounds = true;
          this.personaje.health = 100;
          this.personaje.body.gravity.y = 300;
          this.personaje.anchor.setTo(.5, 1);
          this.personaje.scale.setTo(1.5, 1.5);
          this.personaje.animations.add('right', [0, 1, 2, 1, 3, 1], 8, true);
          this.personaje.animations.add('ataca', [4, 5, 4, 5, 4, 5], 2, true);
      },
      suelo: function() {

          this.platforms = game.add.group();
          this.platforms.enableBody = true;
          this.ground = this.platforms.create(0, game.world.height - 64, 'suelo');
          this.techo = this.platforms.create(0, 0, 'techo');
          this.ground.body.immovable = true;
          this.techo.body.immovable = true;
      },
      createEnemigo: function() {
          this.boss = game.add.sprite(game.world.width-20, game.world.height - 70, 'jefe1');
          game.physics.enable(this.boss);
          this.boss.scale.setTo(0.2,0.2);
          this.boss.health = 38;
         // this.boss.body.velocity.x=-50;
          this.boss.body.gravity.y = 300;
          this.boss.anchor.setTo(.5, 1);
          this.boss.scale.setTo(.4, .4);
          //this.boss.animations.add('right2', [0, 1, 2, 3], 10, true);
          game.physics.enable(this.boss, Phaser.Physics.ARCADE);
      },
      enemigos_gen: function() {
          this.enemigos = game.add.group();
          this.enemigos.enableBody = true;
          this.enemigos.createMultiple(10, 'jefe1');
          this.enemigos.checkWorldBounds = true;

          this.enemigos.outOfBoundsKill = true;

          //this.createEnemigo();


      },
      create: function() {
        
          this.physics.startSystem(Phaser.Physics.ARCADE);
      //  game.time.events.add(Phaser.Timer.SECOND * 4, this.createEnemigo(), this);

          //this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); 

          // Set stage background color

          this.game.stage.backgroundColor = 0x4488cc;

          // The radius of the circle of light
          this.LIGHT_RADIUS = 100;
          this.starfield = game.add.tileSprite(0, 0, 640, 480, 'starfield');



          this.keyboard = game.input.keyboard;
          this.cursors = game.input.keyboard.createCursorKeys();

          this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
          this.golpe = game.input.keyboard.addKey(Phaser.Keyboard.A);


          /*this.wkey.onDown.add(function(key){
                     this.oscuridad();
                  }, this);*/

          //this.teclas = game.input.keyboard.addKey(Phaser.Keyboard.A);

          /*	 golpe.onDown.add(function(key){
                   if(tomaso.alive && !defensa) golpea();
                }, this);*/

          //	if(this.teclas.A.isDown)


          // Create the player sprite and enable physics
          this.nina = game.add.sprite(40, game.world.height - 70, 'nina');
          game.physics.enable(this.nina);
          this.nina.health = 38;
          this.nina.body.gravity.y = 300;
          this.nina.anchor.setTo(.5, 1);
          this.nina.scale.setTo(.7, .7);
          this.nina.animations.add('right2', [0, 1, 2, 3], 10, true);
          game.physics.enable(this.nina, Phaser.Physics.ARCADE);
          
          
          /*this.boss = game.add.sprite(40, game.world.height - 70, 'jefe1');
          game.physics.enable(this.boss);
          this.boss.health = 38;
          this.boss.body.gravity.y = 300;
          this.boss.anchor.setTo(.5, 1);
          this.boss.scale.setTo(.7, .7);
          //this.boss.animations.add('right2', [0, 1, 2, 3], 10, true);
          game.physics.enable(this.boss, Phaser.Physics.ARCADE);*/
          var self=this;
          
          
          game.time.events.add(Phaser.Timer.SECOND * 70, function() { self.createEnemigo();
          
              self.enemies.forEach(function(t) {

                t.kill();
          }, this);
            
          }, this);
          //this.enemigos_gen();

          this.player();



          this.walk = game.add.audio('caminando');
          // Create the win sprite and enable physics
          //this.win = game.add.sprite(256, 256, 'win');
          //game.physics.enable(this.win, Phaser.Physics.ARCADE);



          //	this.music = game.add.audio('ambiente1');

            //  this.music.play();


          // Create an enemy group with Arcade physics 


          this.weaponsGroup = this.add.group();
          weapons = [];
          weapons.push({
              name: 'pencil',
              lifespan: 200,
              velocity: {
                  x: 5,
                  y: 5
              },
              spin: 0,
              power: 4
          });


          for (var w = 0; w < weapons.length; w++) {
              var wg = this.add.group();
              wg.createMultiple(3, weapons[w].name, 0, false);
              weapons[w].sprites = wg;
              this.weaponsGroup.add(wg);
          }



          this.fire = this.input.keyboard.addKey(Phaser.Keyboard.CONTROL);

          nextFire = game.time.now + FIRE_RATE;



          this.enemies = game.add.group();
          this.obstaculos1 = game.add.group();
          this.obstaculos2 = game.add.group();
          this.obstaculos3 = game.add.group();
          this.obstaculos4 = game.add.group();
          this.enemies.enableBody = true;
          this.obstaculos1.enableBody = true;
          this.obstaculos2.enableBody = true;
          this.obstaculos3.enableBody = true;
          this.obstaculos4.enableBody = true;

          // Create 10 enemies with the 'enemy' image in the group 
          // The enemies are "dead" by default, so they are not visible in the game 
          this.enemies.createMultiple(10, 'enemigo');
          this.obstaculos1.createMultiple(4, 'pico1');
          this.obstaculos2.createMultiple(4, 'pico2');
          this.obstaculos3.createMultiple(4, 'pico3');
          this.obstaculos4.createMultiple(4, 'pico4');

          // Contains the time of the next enemy creation 
          this.nextEnemy = 0;
          this.nextObstaculo = 0;
          this.suelo();
          

          this.oscuridad();
          this.HPbar = this.add.bitmapData(100, 8);
          game.add.sprite(10, 10, this.HPbar);
          this.Bloodbar = this.add.bitmapData(100, 8);
          game.add.sprite(10, 22, this.Bloodbar);
      },
      oscuridad: function() {
          this.rand = Math.floor((Math.random() * 4) + 1);

          // Create the shadow texture
          this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);

          // Create an object that will use the bitmap as a texture
          var lightSprite = this.game.add.image(0, 0, this.shadowTexture);

          // Set the blend mode to MULTIPLY. This will darken the colors of
          // everything below this sprite.
          lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

          this.lights = this.game.add.group();
          this.movingLight = new Torch(this.game, this.game.width / 2, this.game.height / 2);
          this.lights.add(this.movingLight);
          //this.lights.add(new Torch(this.game, this.personaje.x, this.personaje.y));

      },
      collisionHandler: function() {

      },
       getRandomInt:function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
},

      update: function() {

          if (!this.personaje.alive || !this.nina.alive) {
            (this.getRandomInt(1,5)>3)?game.state.start('muerte1'):game.state.start('muerte2'); 
            
          };

          this.personaje.atk = false;
          this.golpe.onDown.add(function(ok) {
              this.personaje.atk = true;
              var timer;
              timer = game.time.create(false);
              timer.loop(300, function() {
                  this.personaje.atk = false;
                  timer.stop();
              }, this);
              timer.start();

          }, this, 0, 'lazer', 100);
          
          
     
         // this.boss.events.onKilled.add(function(){  game.state.start('win');  });
          // game.physics.arcade.overlap(this.personaje, this.enemigo, this.collisionHandler, null, this);


          //	this.enemigo.body.position.x-=
          //  game.physics.arcade.moveToObject(this.enemigo, {x: (this.personaje.x), y:this.enemigo.y},50, this);

          // ensure you clear the context each time you update it or the bar will draw on top of itself
          this.HPbar.context.clearRect(0, 0, this.HPbar.width, this.HPbar.height);

          // some simple colour changing to make it look like a health bar
          if (this.personaje.health < 32) {
              this.HPbar.context.fillStyle = '#f00';
          } else if (this.personaje.health < 64) {
              this.HPbar.context.fillStyle = '#ff0';
          } else {
              this.HPbar.context.fillStyle = '#0f0';
          }

          this.Bloodbar.context.clearRect(0, 0, this.Bloodbar.width, this.Bloodbar.height);
          this.Bloodbar.context.fillStyle = '#f00';

          game.physics.arcade.collide(this.personaje, this.platforms);
          game.physics.arcade.collide(this.nina, this.platforms);

          game.physics.arcade.collide(this.enemigo, this.platforms);
          //game.physics.arcade.collide( this.personaje );
          game.physics.arcade.collide(this.personaje, this.enemigo);
          game.physics.arcade.collide(this.personaje, this.obstaculos1);
          game.physics.arcade.collide(this.personaje, this.obstaculos2);
          game.physics.arcade.collide(this.personaje, this.obstaculos3);
          game.physics.arcade.collide(this.personaje, this.obstaculos4);

          game.physics.arcade.moveToObject(this.nina, {
              x: (this.personaje.x) - 60,
              y: this.personaje.y
          }, 50, this);
          

          if (this.cursors.right.isDown) {
            
              if(!this.walk.isPlaying) this.walk.play();
              this.personaje.animations.play('right');
              this.nina.animations.play('right2');
              this.starfield.tilePosition.x -= .18;
              if (this.personaje.body.position.x < 360) {
                  this.personaje.body.velocity.x = 150;
              } else {
               this.personaje.body.velocity.x = 0; 
              }
          } else {
            this.personaje.body.velocity.x = 0;
              this.personaje.frame = 0;
              this.nina.frame = 4;
          }
          if (this.cursors.up.isDown && this.personaje.body.touching.down) {
            	this.music = game.add.audio('brincando');

              this.music.play();
              this.personaje.body.velocity.y = -(this.personaje.body.height + (this.personaje.body.height * .4)) * 2;
          }


          if (this.cursors.left.isDown) {
              //this.personaje.damage(1);
          }

          if (this.cursors.down.isDown) {
              /**
               * Contar los milisegundos 
               *
               */
             // this.nina.damage(0.1);

              //this.knockedBackAnimation();

          }
          if (this.fire.isDown) {
              this.throwSomething(this);
          }

          // Move the movable light to where the pointer is
          this.movingLight.x = this.personaje.x;
          this.movingLight.y = this.personaje.y * 0.83;
          this.ProtectionRadius;
          if (this.spacebar.isDown) {
              this.nina.damage(0.1);
              this.updateShadowTexture(1);
              if(typeof(this.boss) != "undefined") this.boss.body.position.x=500;
          } else {
              if (this.nina.health < 38) this.nina.damage(-0.1);
              this.updateShadowTexture(0);
              this.ProtectionRadius = 0;
          }


          this.enemies.forEach(function(t) {

              if (t.body.x - this.personaje.body.x > this.ProtectionRadius || this.personaje.body.y + 20 < t.body.y || t.body.x <= this.personaje.body.x) {
                  t.body.velocity.x = -60;
              } else {
                  t.body.velocity.x = 60;

              }

              t.update();
          }, this);

          this.Bloodbar.context.fillRect(0, 0, this.nina.health, 8);
          this.Bloodbar.dirty = true;
          this.HPbar.context.fillRect(0, 0, this.personaje.health, 8);
          this.HPbar.dirty = true;


            
            if(typeof(this.boss) != "undefined"){
              
            /*if(this.boss.body.x-this.personaje.body.x>this.ProtectionRadius || this.personaje.body.y+20<this.boss.body.y || this.boss.body.x<=this.personaje.body.x){
                //this.boss.body.velocity.x=-60;
            }else{
                    this.boss.body.velocity.x = -200;    
                
            }*/
              
              if(this.boss.body.position.x<100) { 
                
                this.boss.body.velocity.x=60;
                
              } else {
                this.boss.body.velocity.x=-50;
              }
              
            }
            
               
          if(typeof(this.boss) != "undefined" && this.boss.health<1){
            game.state.start("win");
          }

          //Make the enemies and walls collide 
          //game.physics.arcade.collide(this.enemies, this.walls);
          game.physics.arcade.collide(this.enemies, this.platforms);
          game.physics.arcade.collide(this.boss, this.platforms);

          // Call the 'playerDie' function when the player and an enemy overlap 
          game.physics.arcade.overlap(this.personaje, this.enemies, this.hurtPuk, null, this);
          game.physics.arcade.overlap(this.personaje, this.boss, this.hurtPukBoss, null, this);
          
          game.physics.arcade.overlap(this.enemies, this.weaponsGroup.children, this.hurtEnemy, null, this);
          game.physics.arcade.overlap(this.boss, this.weaponsGroup.children, this.hurtBoss, null, this);

          if (!this.personaje.immune) {
              //this.personaje.body.velocity.x = 0;
          }

          if (this.nextEnemy < game.time.now) {
              // Define our variables 
              var start = 4000,
                  end = 1000,
                  score = 100;

              // Formula to decrease the delay between enemies over time 
              // At first it's 4000ms, then slowly goes to 1000ms 
              var delay = Math.max(start - (start - end) * game.global.score / score, end);

              // Create a new enemy, and update the 'nextEnemy' time 
              this.addEnemy();
              this.nextEnemy = game.time.now + delay;
          };

          if (this.nextObstaculo < game.time.now) {
              // Define our variables 
              var start = 10000,
                  end = 1000,
                  score = 10;

              // Formula to decrease the delay between enemies over time 
              // At first it's 4000ms, then slowly goes to 1000ms 
              var delay = Math.max(start - (start - end) * game.global.score / score, end);

              // Create a new enemy, and update the 'nextEnemy' time 
              this.addObstaculo();
              this.nextObstaculo = game.time.now + delay;
          };

      },
      addEnemy: function() {
          // Get the first dead enemy of the group 
          var enemy = this.enemies.getFirstDead();

          // If there isn't any dead enemy, do nothing 
          if (!enemy) {
              return;
          }

          // Initialise the enemy 
          enemy.anchor.setTo(0.5, 1);
          enemy.reset(game.world.width - 30, game.world.centerY / 2);
          enemy.health = 4;
          enemy.body.gravity.y = 500;
          enemy.body.velocity.x = -100;
          enemy.body.bounce.x = 1;
          enemy.checkWorldBounds = true;
          enemy.outOfBoundsKill = true;
          enemy.animations.add('right4', [0, 1, 2], 3, true);
          enemy.animations.play('right4');

      },
      addObstaculo: function() {
          // Get the first dead enemy of the group 
          var obsi = Math.floor((Math.random() * 4) + 1);
          var obstaculo;
          var chosenValue = Math.random() < 0.5 ? false : true;
          switch (obsi) {
              case 1:
                  var obstaculo = this.obstaculos1.getFirstDead();
                  break;
              case 2:
                  obstaculo = this.obstaculos2.getFirstDead();
                  break;
              case 3:
                  obstaculo = this.obstaculos3.getFirstDead();
                  break;
              case 4:
                  obstaculo = this.obstaculos4.getFirstDead();
                  break;
          }


          // If there isn't any dead enemy, do nothing 
          if (!obstaculo) {
              return;
          }

          // Initialise the enemy 
          //enemy.anchor.setTo(0.5, 1);
          if (chosenValue) {
              obstaculo.anchor.setTo(0.5, 0.5);
              obstaculo.angle = 180;
              obstaculo.reset(game.world.width, 100);
          } else {
              obstaculo.reset(game.world.width, game.world.height - 145);
          }


          obstaculo.scale.setTo(.2, .2);
          //enemy.health = 4;
          //enemy.body.gravity.y = 500;
          obstaculo.body.velocity.x = -50;
          //enemy.body.bounce.x = 1;
          obstaculo.checkWorldBounds = true;
          obstaculo.outOfBoundsKill = true;
          obstaculo.body.immovable = true;

          //enemy.animations.add('right4', [0, 1, 2], 3, true);
          //enemy.animations.play('right4');

      },
      hurtPukBoss: function(f, e) {

          if (!f.immune) {
              f.animations.stop(null, true);
              f.frame = 3;
              f.immune = true;
              f.damage(3);
              e.body.position.x=200;
               f.body.position.x=-80;
              if (f.body.position.x < e.body.position.x) {
                  f.body.velocity.x = -200;
              } else {
                  f.body.velocity.x = 200;
              }

              var t = this.add.tween(f);
              t.onComplete.add(function() {
                  f.immune = false;
              });
              t.to({
                  alpha: 0.5
              }, 50, Phaser.Easing.Linear.None, true, 0, 2, true);

          }

      },
      hurtPuk: function(f, e) {

          if (!f.immune) {
              f.animations.stop(null, true);
              f.frame = 3;
              f.immune = true;
              f.damage(0.5);
              if (f.body.position.x < e.body.position.x) {
                  f.body.velocity.x = -200;
              } else {
                  f.body.velocity.x = 200;
              }

              var t = this.add.tween(f);
              t.onComplete.add(function() {
                  f.immune = false;
              });
              t.to({
                  alpha: 0.5
              }, 50, Phaser.Easing.Linear.None, true, 0, 2, true);

          }

      },
       hurtBoss: function(e, w) {

          if (!e.immune) {
              e.immune = true;
              e.alpha = 0.5;
              e.damage(w.power);
              e.body.position.x=250;
              this.personaje.animations.play('ataca');
              w.exists = false;

              this.time.events.add(200, function() {
                  e.immune = false;
                  e.alpha = 1;
              }, this);
          }

      },
      hurtEnemy: function(e, w) {

          if (!e.immune) {
              e.immune = true;
              e.alpha = 0.5;
              e.damage(w.power);
              this.personaje.animations.play('ataca');
              w.exists = false;

              this.time.events.add(200, function() {
                  e.immune = false;
                  e.alpha = 1;
              }, this);
          }

      },
      playerDie: function(f, e) {

          if (!f.immune) {
              f.immune = true;
              f.alpha = 0.5;
              f.damage(0.1);
              if (f.body.position.x < e.body.position.x) {
                  f.body.velocity.x = -300;
              } else {
                  f.body.velocity.x = 300;
              }
              game.time.events.add(500, function() {
                  f.immune = false;
                  f.alpha = 1;
              }, this);
          }
          //(this.personaje.atk)?e.damage(4):f.damage(0.4);

          /*if(this.golpe.isDown){
              console.log("Golpe");  
          }*/

      },
      // Shows the player sprite being knocked away from the enemy after taking a hit (being touched)
      knockedBackAnimation: function() {
          this.personaje.animations.stop(); // Initialize knock back
          var distance = 75;
          var knockedTo = 0;
          if (knockedTo == 0) {
              immortal = true;
              knockedDirection = knockedbackDirection(this.personaje, monster);
              switch (knockedDirection) {
                  case 'left':
                      knockedTo = (this.personaje.body.x - distance);
                      break;
                  case 'right':
                      knockedTo = (this.personaje.body.x + distance);
                      break;
              }
          }
          switch (knockedDirection) {
              case 'left':
                  this.personaje.frame = 11;
                  knockedVelocityX = -500; // Parabolic knock back arc	
                  player.body.velocity.x = knockedVelocityX;
                  if (this.personaje.body.x <= (knockedTo + distance / 2)) {
                      this.personaje.body.velocity.y = 100;
                  } else {
                      this.personaje.body.velocity.y = -100;
                  } // Player has been knocked back as far as he needs to, reset	
                  if (this.personaje.body.x <= knockedTo || this.personaje.bottomLeft.x <= 0) {
                      this.personaje.frame = 6;
                      facing = 'right';
                      knockedTo = 0;
                      knockback = false;
                  }
                  break;
              case 'right':
                  this.personaje.frame = 1;
                  knockedVelocityX = 500; // Parabolic knock back arc - A major pain in my ass	
                  this.personaje.body.velocity.x = knockedVelocityX;
                  if (this.personaje.body.x >= (knockedTo + distance / 2)) {
                      this.personaje.body.velocity.y = 100;
                  } else {
                      this.personaje.body.velocity.y = -100;
                  } // Player has been knocked back as far as he needs to, reset
                  if (this.personaje.body.x >= knockedTo || this.personaje.bottomRight.x >= game.canvas.width + 30) {
                      this.personaje.frame = 12;
                      facing = 'left';
                      knockedTo = 0;
                      knockback = false;
                  }
                  break;
          } // A ghostly visage for a short stint of immortality	
          this.personaje.body.sprite.alpha = 0.5;
      },
      updateShadowTexture: function(light) {

          // Draw shadow
          if (!light) this.shadowTexture.context.fillStyle = 'rgb(100, 100, 100)';
          //this.shadowTexture.context.fillStyle = 'rgb(100, 100, 100)';

          this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

          // Iterate through each of the lights and draw the glow
          this.lights.forEach(function(light) {
              // Randomly change the radius each frame
              var radius = this.LIGHT_RADIUS + this.game.rnd.integerInRange(1, 10);

              this.ProtectionRadius = radius * 2;
              // Draw circle of light with a soft edge
              var gradient =
                  this.shadowTexture.context.createRadialGradient(
                      light.x, light.y, this.LIGHT_RADIUS * 0.75,
                      light.x, light.y, radius * 2);

              gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

              this.shadowTexture.context.beginPath();
              this.shadowTexture.context.fillStyle = gradient;
              this.shadowTexture.context.arc(light.x, light.y, radius, 0, Math.PI * 2);
              this.shadowTexture.context.fill();

          }, this);

          // This just tells the engine it should update the texture cache
          this.shadowTexture.dirty = true;

      },


      Win: function() {
          // We start the win state
          game.state.start('win');
      }

  }