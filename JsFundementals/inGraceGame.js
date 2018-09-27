var scene;
        var kid;
        var van;
        var background;
         var FLOOR = 500;
        var sndCrashOgg;
        var sndBeepOgg;
        var sndCrashMp3;
        var sndBeepMp3;
        var sndApplauseOgg;
        var sndApplauseMp3;
        var sndWinOgg;
        var sndWinMp3;
        function Background(){
          tBackground = new Sprite(scene, "fcbc.jpg", 800, 600);
          tBackground.setSpeed(0);
          tBackground.setPosition(400, 300);
          return tBackground;
        function Kid(){
          tKid = new Sprite(scene, "child.svg", 50, 50);
          tKid.falling = false;
          tKid.checkKeys = function(){
            if (this.falling == false){
              if (keysDown[K_SPACE]){
                this.setY(FLOOR - 5);
                this.falling = true;
                this.addVector(0, 20);
              } // end space if            
              if (background.isClicked()){
                this.setY(FLOOR - 5);
                this.falling = true;
                this.addVector(0, 20);                
              } // end backgroundClicked if
            } // end falling if
          } // end checkKeys
          tKid.checkGravity = function(){
            if (this.falling){
              this.addVector(180,1);
              if (this.y > FLOOR){
                this.falling = false;
                this.setSpeed(0);
              } // end floor if
            } // end falling if
          } // end checkGravity
          tKid.advance = function(){
            this.x += 30;
            if (this.x > 400){
              //play win sound
              scene.stop();
              sndWinMp3.play();
              sndWinOgg.play();
              alert("You Win!");
              document.location.href = "instructions.html";
            } // end if
          } // end advance
          tKid.setSpeed(0);
          tKid.setPosition(100, FLOOR);
          return tKid;
        }
        function Van(){
          tVan = new Sprite(scene, "van.svg", 150, 150);
          tVan.setSpeed(10);
          tVan.setMoveAngle(270);
          tVan.images = new Array(
            "vanBrown.svg",
            "vanPink.svg",
            "vanRed.svg",
            "vanWhite.svg"
          );
          tVan.pickImage = function(){
            imgNum = parseInt(Math.random() * tVan.images.length);
            this.setImage(tVan.images[imgNum]);            
          }
          tVan.reset = function(){
            this.setPosition(800, FLOOR);
            this.pickImage();
            sndBeepMp3.play();
            sndBeepOgg.play();
          } // end reset
          tVan.checkBounds = function(){
            if (this.x <0){
              this.x = 800;
              this.pickImage();
              sndApplauseOgg.play();
              sndApplauseMp3.play();
              kid.advance();
            }
          }
          tVan.reset();
          return tVan;
        } //end van constructor
        function makeSounds(){
          sndCrashOgg = new Sound("Kaboom-1.ogg");
          sndCrashMp3 = new Sound("Kaboom-1.mp3");
          sndBeepOgg = new Sound("car-honk-1.ogg");
          sndBeepMp3 = new Sound("car-honk-1.mp3");
          sndApplauseOgg = new Sound("applause-1.ogg");
          sndApplauseMp3 = new Sound("applause-1.mp3");
          sndWinOgg = new Sound("TriumphantFanfare.ogg");
          sndWinMp3 = new Sound("TriumphantFanfare.mp3");
        } // end makeSounds
        function checkCollision(){
          if (van.collidesWith(kid)){
            van.reset();
          } // end if
        } // checkCollision
        function init(){
            joy = new Joy();
            makeSounds();
            scene = new Scene();
            background = new Background();
            van = new Van();
            kid = new Kid();
            scene.start();
        } // end init
        function update(){
            scene.clear();
            kid.checkKeys();
            kid.checkGravity();
            checkCollision();
            background.update();
            kid.update();
            van.update();
        } // end update