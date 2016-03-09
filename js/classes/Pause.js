var Pause = (function()
{
    var imgPlay, imgPause, btnHitPlayPause, backgroundShape, imgLogo, imgPauseMenu, imgResume, btnResume, self, fadeMenuIn, ticker;

    function Pause()
    {
        self = this;
        var data =
        {
            images: ["img/play_button.png"],
            frames: {width: 8, height: 10, count: 2},
            animations: {pause: 0, play: 1}
        };

        var spritesheet = new createjs.SpriteSheet(data);

        this.clickedButton = false;

        fadeMenuIn = false;
        ticker = createjs.Ticker;
        ticker.useRAF = true;
        ticker.setFPS(60);

        imgPause = new createjs.Sprite(spritesheet, "pause");
        imgPause.x = (world.userOptionsBarWidth - 8)/2;
        imgPause.y = 685;

        imgPlay = new createjs.Sprite(spritesheet, "play");
        imgPlay.x = (world.userOptionsBarWidth - 8)/2;
        imgPlay.y = 685;

        btnHitPlayPause = new createjs.Shape();
        btnHitPlayPause.graphics.f("0x000000");
        btnHitPlayPause.graphics.dr(imgPause.x -5, imgPause.y -5, 8 +10, 10+10);
        btnHitPlayPause.graphics.ef();
        btnHitPlayPause.alpha = 0.01;
        stage.addChild(btnHitPlayPause);

        if(isPaused){
            stage.addChild(imgPlay);
        }else{
            btnHitPlayPause.addEventListener("click", function(){self.togglePause();});
            stage.addChild(imgPause);
        }

        backgroundShape = new createjs.Shape();
        backgroundShape.graphics.f("0x000000");
        backgroundShape.graphics.dr(0, 0, stage.canvas.width, stage.canvas.height);
        backgroundShape.graphics.ef();
        backgroundShape.alpha = 0.5;

        imgPauseMenu = new createjs.Bitmap("img/pause_menu.png");
        imgPauseMenu.x = (stage.canvas.width-461)/2;
        imgPauseMenu.y = (stage.canvas.height-148)/2;

        imgLogo = new createjs.Bitmap("img/menu_title.png");
        imgLogo.x = (stage.canvas.width-290)/2;
        imgLogo.y = imgPauseMenu.y - 90;

        imgResume = new Image();
        imgResume.src = "img/pause_menu_button.png";
        imgResume.onload = btnResumeLoaded;
    }

    function btnResumeLoaded(e){
        btnResume = new createjs.Bitmap(e.target);
        btnResume.x = (stage.canvas.width-108)/2;
        btnResume.y = imgPauseMenu.y + 148;
        btnResume.addEventListener("click", function(){self.togglePause();});
    }

    function fadeMenu(){
        if(fadeMenuIn){
            if(backgroundShape.alpha < 0.5)backgroundShape.alpha += 0.08;
            (imgLogo.alpha >= 1)?ticker.removeEventListener("tick", fadeMenu) : imgLogo.alpha += 0.08;
            imgPauseMenu.alpha += 0.08;
            btnResume.alpha += 0.08;
        }else{
            if(imgLogo.alpha < 0.08){
                stage.removeChild(backgroundShape);
                stage.removeChild(imgLogo);
                stage.removeChild(imgPauseMenu);
                stage.removeChild(btnResume);
            }else{
                backgroundShape.alpha -= 0.08;
                imgLogo.alpha -= 0.08;
                imgPauseMenu.alpha -= 0.08;
                btnResume.alpha -= 0.08;
            }
        }
    }

    Pause.prototype.togglePause = function(){
        this.clickedButton = true;
        this.checkKeys();
    };

    Pause.prototype.checkKeys = function(keyCode)
    {
        if(keyCode == 80 || this.clickedButton)
        {
            isPaused = !isPaused;
            if(isPaused){
                btnHitPlayPause.removeEventListener("click", function(){self.togglePause();});

                //button
                stage.removeChild(imgPause);
                stage.addChild(imgPlay);

                //pause menu
                backgroundShape.alpha = 0;
                stage.addChild(backgroundShape);
                imgLogo.alpha = 0;
                stage.addChild(imgLogo);
                imgPauseMenu.alpha = 0;
                stage.addChild(imgPauseMenu);
                btnResume.alpha = 0;
                stage.addChild(btnResume);

                fadeMenuIn = true;
            }else{
                btnHitPlayPause.addEventListener("click", function(){self.togglePause();});

                //button
                stage.removeChild(imgPlay);
                stage.addChild(imgPause);
                stage.setChildIndex(btnHitPlayPause, btnHitPlayPause.parent.getNumChildren()-1);

                fadeMenuIn = false;
            }
            ticker.removeEventListener("tick", fadeMenu);
            ticker.addEventListener("tick", fadeMenu);
            this.clickedButton = false;
        }
    };

    return Pause;

})();