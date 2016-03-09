var Music = (function()
{

    var spritesheet, muzak, loadIcon, playIcon, stopIcon;

    function Music(musicPath)
    {
        if(musicPath != '')
        {
            var data =
            {
                images: ["img/sound.png"],
                frames: {width: 15, height: 15, count: 2},
                animations: {off: 0, on: 1}
            };

            spritesheet = new createjs.SpriteSheet(data);

            this.x = 12;
            this.y = 650;

            loadIcon = new createjs.Sprite(spritesheetLoading, "normal");
            loadIcon.x = this.x;
            loadIcon.y = this.y;
            stage.addChild(loadIcon);

            playIcon = new createjs.Sprite(spritesheet, "on");
            playIcon.x = this.x;
            playIcon.y = this.y;

            stopIcon = new createjs.Sprite(spritesheet, "off");
            stopIcon.x = this.x;
            stopIcon.y = this.y;

            createjs.Sound.registerSound("sound/" + musicPath, "song");
            createjs.Sound.addEventListener("fileload", musicLoaded);
            muzak = createjs.Sound.play("song");
            muzak.volume = 0.4;
        }
    }

    Music.prototype.loadMusic = function(musicPath)
    {
        createjs.Sound.registerSound("sound/" + musicPath, "mainSong");
        createjs.Sound.addEventListener("fileload", musicReady);
        muzak = createjs.Sound.play("mainSong");
        muzak.volume = 0.4;
    };

    Music.prototype.stopMainSong = function()
    {
        muzak.stop();
        createjs.Sound.removeSound(muzak.src);
        muzak = "";
    };

    function musicReady(e)
    {
        muzak.play();
    }

    function musicLoaded(e)
    {
        if(e.id == "song"){
            play();
            stage.removeChild(loadIcon);
            stage.addChild(playIcon);
            stage.addChild(stopIcon);
            if(isPaused){
                stage.setChildIndex(playIcon, playIcon.parent.getNumChildren()-15);
                stage.setChildIndex(stopIcon, stopIcon.parent.getNumChildren()-15);
            }
        }
    }

    function play()
    {
        muzak.play();
        sound.play('sSoundToggle');
        playIcon.alpha = 1;
        stopIcon.alpha = 0;

        stopIcon.removeEventListener("click", play);
        playIcon.addEventListener("click", stop);
    }

    function stop()
    {
        muzak.stop();
        sound.play('sSoundToggle');
        playIcon.alpha = 0;
        stopIcon.alpha = 1;

        playIcon.removeEventListener("click", stop);
        stopIcon.addEventListener("click", play);
    }

    Music.prototype.stopMusic = function()
    {
        muzak.stop();
        createjs.Sound.removeSound(muzak.src);
    };

    return Music;

})();