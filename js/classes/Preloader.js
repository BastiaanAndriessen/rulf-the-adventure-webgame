var Preloader = (function()
{
    var container;

    function Preloader()
    {
        var image = new Image();
        $(image).load(function()
        {
            this.background = new createjs.Bitmap(image);
            this.background.x = 0;
            this.background.y = 0;

            var data =
            {
                images: ["img/preloader.png"],
                frames: {width: 312, height: 175, count: 6},
                animations:
                {load:
                    {
                        frames:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                                1,1,1,1,
                                2,2,2,2,2,2,2,2,
                                3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
                                4,4,4,4,4,4,4,4,
                                5,5,5,5,5,5,5,5,5,5,5,5,5,5],
                        next: false,
                        speed: 0.4
                    }
                }
            };

            var spriteSheet = new createjs.SpriteSheet(data);
            this.preloader = new createjs.Sprite(spriteSheet, "load");
            this.preloader.x = Math.floor((stage.canvas.width / 2) - 156);
            this.preloader.y = Math.floor((stage.canvas.height / 2) - 88);

            container = new createjs.Container();
            container.addChild(this.background);
            container.addChild(this.preloader);
        }).attr("src", "img/menu_bg.jpg");
    }

    Preloader.prototype.start = function()
    {
        music = new Music("");
        music.loadMusic("loading.mp3");
        stage.addChild(container);
        if(isRestarted)container.children[1]._animation.speed = 1.8;
        container.children[1].gotoAndPlay("load");
    };

    Preloader.prototype.stop = function()
    {
        music.stopMainSong();
        stage.removeChild(container);
    };

    return Preloader;

})();