var World = (function()
{

    function World(width, height)
    {
        this.width = width;
        this.height = height;
        this.userOptionsBarWidth = 40;
        this.arrPlatforms = [];

        this.gravity = 0.3;
        this.frictionX = 0.8;
        this.frictionY = 0.8;
        this.boundW = -(this.width - stage.canvas.width);
        this.boundH = -(this.height - stage.canvas.height);

        this.container = new createjs.Container();
    }

    World.prototype.addChild = function(element)
    {
        this.container.addChild(element);
    };

    World.prototype.removeChild = function(element)
    {
        this.container.removeChild(element);
    };

    World.prototype.followPlayerX = function(player, width, offset)
    {
        var x = -(player.x - (width / 2) + offset);

        if(x < this.boundW)
        {
            this.container.x = this.boundW;
        }
        else if(x > 0)
        {
            this.container.x = 0;
        }
        else
        {
            this.container.x = x;
        }
    };

    World.prototype.followPlayerY = function(player, height, offset)
    {
        var y = -(player.y - (height / 2) + offset);

        if(y < this.boundH)
        {
            this.container.y = this.boundH;
        }
        else if(y > 0)
        {
            this.container.y = 0;
        }
        else
        {
            this.container.y = y;
        }
    };

    World.prototype.updatePlatforms = function(){
        for(var i = 0; i < this.arrPlatforms.length; i++)
        {
            var currentPlatform = this.arrPlatforms[i];

            for(var j = 0; j < collisionObjects.length; j++)
            {
                if(collisionObjects[j].object == currentPlatform){var currentCollisionObject = collisionObjects[j];}
            }

            switch(currentPlatform.direction){
                case 'right':
                    if(currentPlatform.x + currentPlatform.spriteX < currentPlatform.maxX){
                        currentPlatform.x += currentPlatform.speed;
                    }else{
                        currentPlatform.x -= currentPlatform.speed;
                        currentPlatform.direction = "left";
                    }
                    break;
                case 'left':
                    if(currentPlatform.x > currentPlatform.minX - currentPlatform.spriteX){
                        currentPlatform.x -= currentPlatform.speed;
                    }else{
                        currentPlatform.x += currentPlatform.speed;
                        currentPlatform.direction = "right";
                    }
                    break;
            }

            if(currentCollisionObject && currentCollisionObject.name != "jumper") currentCollisionObject.x = currentPlatform.x + currentPlatform.spriteX;
        }
    };

    World.prototype.shake = function(){$("#container").effect("shake", "left", 4, 1);};

    return World;

})();