var Particles = (function()
{

    function Particles()
    {
        this.index = 0;
        this.arrParticles = [];
        this.arrParticlesToRemove = [];
        this.skins = ["one", "two", "three", "four", "five"];

        this.gravity = world.gravity;
        this.frictionX = world.frictionX;
    }

    Particles.prototype.add = function(touchSide, velX)
    {
        for(var i = 0; i < 2; i++)
        {
            var skin = this.skins[Math.floor(Math.random()*this.skins.length)];
            var particle = new Particle(touchSide, velX, skin);
            particle.playerYWhenCreated = player.y;
            this.arrParticles.push(particle);
        }
    };

    Particles.prototype.updateParticlePositions = function()
    {
        var self = this;
        $.each(this.arrParticles, function(key, particle)
        {
            particle.y += particle.velY;
            particle.x += particle.velX;
            particle.particle.y = Math.round(particle.y);
            particle.particle.x = Math.round(particle.x);
            if(!((particle.velY + self.gravity) > particle.dimensions)){
                particle.velY = Math.round((particle.velY + self.gravity)*10)/10;
            }
            self.update(particle);
        });
        $.each(this.arrParticlesToRemove, function(key, particle) {
            self.arrParticlesToRemove.splice($.inArray(particle, self.arrParticlesToRemove),1);
        });
        this.arrParticlesToRemove = [];
    };

    Particles.prototype.update = function(particle){
        for(var i = 0; i < collisionObjects.length; i++)
        {
            var colDir = collision.checkCollision(particle, collisionObjects[i]);

            if(colDir.length > 0)
            {
                switch(colDir)
                {
                    case "l":
                        particle.velX = 0;
                        break;

                    case "r":
                        particle.velX = 0;
                        break;

                    case "b":
                        particle.velY = 0;
                        setInterval(function(){
                            particle.startFade = true;
                        },Math.round(Math.random() * (2000 - 250) + 250));
                        if(particle.startFade){
                            particle.particle.alpha -= 0.1;
                            if(particle.particle.alpha <= 0){
                                this.arrParticlesToRemove.push(particle);
                            }
                        }
                        break;
                }
            }
        }
    };

    return Particles;

})();