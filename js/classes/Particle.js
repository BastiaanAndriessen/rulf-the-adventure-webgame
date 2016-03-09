var Particle = (function()
{

    function Particle(touchSide, velX, skin){
        this.type = "particle";
        this.velY = -1 + Math.round(Math.random() * (1 - 0.2) + 0.2);
        this.velX = velX;
        this.width = 10;
        this.height = 14;
        this.startFade = false;

        var data =
        {
            images: ["img/particle_spritesheet.png"],
            frames: {width: 10, height: 14, count: 5},
            animations:{one: [0], two: [1], three: [2], four: [3], five: [4]}
        };

        switch(touchSide)
        {
            case "l":
                this.x = player.x + Math.round(Math.random() * (50 - 5) + 5);
                this.y = player.y + (player.height / 2) - this.height/2;
                break;
            case "r":
                this.x = player.x + player.width - this.width - Math.round(Math.random() * (50 - 5) + 5);
                this.y = player.y + (player.height / 2) - this.height/2;
                break;
            case "t":
                this.x = player.x + (player.width / 2) - this.width/2 + Math.round(Math.random() * (50 - 5) + 5) - Math.round(Math.random() * (50 - 5) + 5);
                this.y = player.y;
                break;
        }

        var spritesheetParticle = new createjs.SpriteSheet(data);
        this.particle = new createjs.Sprite(spritesheetParticle, skin);
        this.particle.x = this.x;
        this.particle.y = this.y;
        world.addChild(this.particle);
    }

    return Particle;

})();