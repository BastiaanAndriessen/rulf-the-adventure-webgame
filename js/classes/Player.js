var playerWidth, playerHeight, playerCurrentSize, minFallingDistanceForDamage;

var Player = (function()
{
    var stuckSide, maxStucks, nextLevelCalled, stuckDelay;

    function Player(defaultX, defaultY)
    {
        this.type = "player";
        this.isDead = false;
        maxStucks = 2;
        stuckSide = '';
        playerWidth = 50;
        playerHeight = 83;
        playerCurrentSize = "Normal";
        nextLevelCalled = false;
        minFallingDistanceForDamage = 150;
        this.timesStuck = 0;
        this.movingPlatformDifX = 0;
        this.jumpingFromJumpPlatform = false;
        //check if dimensions were updated when player walks to the left/right
        this.dimensionsEdited = false;
        //if dimensions edited update x with sign
        this.updateXSign = '';
        this.justJumped = false;

        this.x = defaultX;
        this.y = world.height - playerHeight - defaultY;

        this.velY = 0;
        this.velX = 0;

        this.speed = 3;
        this.fallingDistance = 0;
        this.gravity = world.gravity;
        this.frictionX = world.frictionX;
        this.frictionY = world.frictionY;

        this.grounded = false;
        this.jumping = false;
        this.climbing = false;

        var arrDimensions = [playerWidth, playerHeight];
        this.drawPlayer(arrDimensions, "walk", "spritesheet"+playerCurrentSize);
    }

    Player.prototype.move = function()
    {
        var arrDimensions;

        if(savedKeycodes[37] && !disableControlLeft) //LEFT
        {
            if(this.movingPlatformDifX != 0){
                this.movingPlatformDifX--;
            }
            if(this.grounded){
                if(this.velX > -this.speed) this.velX --;
            }else{
                if(this.velX > -this.speed) this.velX -= 0.5;
            }
            if(!this.dimensionsEdited && this.grounded && stuckSide == '' && !savedKeycodes[39] && !this.climbing){
                playerWidth = Math.ceil(playerWidth/2);
                this.updateXSign = '+';
                arrDimensions = [playerWidth, playerHeight];
                this.drawPlayer(arrDimensions, "startwalk", "spritesheet"+playerCurrentSize+"Left");
                this.dimensionsEdited = true;
            }
            if(stuckSide == "r")
            {
                particles.add(stuckSide, 0);
                stuckSide = "";
                stuck.checkTimesStuck(this.timesStuck);
            }
        }

        if(savedKeycodes[39] && !disableControlRight) //RIGHT
        {
            if(this.movingPlatformDifX != 0){
                this.movingPlatformDifX++;
            }
            if(this.grounded){
                if(this.velX < this.speed) this.velX ++;
            }else{
                if(this.velX < this.speed) this.velX += 0.5;
            }
            if(!this.dimensionsEdited && this.grounded && stuckSide == '' && !savedKeycodes[37] && !this.climbing){
                playerWidth = Math.ceil(playerWidth/2);
                this.updateXSign = '+';
                arrDimensions = [playerWidth, playerHeight];
                this.drawPlayer(arrDimensions, "startwalk", "spritesheet"+playerCurrentSize+"Right");
                this.dimensionsEdited = true;
            }
            if(stuckSide == "l")
            {
                particles.add(stuckSide, 0);
                stuckSide = "";
                stuck.checkTimesStuck(this.timesStuck);
            }
        }

        if(savedKeycodes[40] && !disableControlBottom) //DOWN
        {
            if(this.climbing) this.velY ++;

            if(stuckSide == "t")
            {
                particles.add(stuckSide, 0);
                stuckSide = "";
                stuck.checkTimesStuck(this.timesStuck);
            }
        }

        if(savedKeycodes[38]) //UP
        {
            if(this.movingPlatformDifX != 0){
                this.movingPlatformDifX = 0;
            }
            if(stuckSide == "r" || stuckSide == "l")
            {
                particles.add(stuckSide, 0);
                this.jumping = false;
                this.grounded = true;

                stuckSide = "";
                stuck.checkTimesStuck(this.timesStuck);
            }

            if(!this.jumping && this.grounded)
            {
                this.justJumped = true;
                this.jumping = true;
                this.grounded = false;

                if(!this.climbing)
                {
                    playerWidth = Math.floor(playerWidth);
                    arrDimensions = [playerWidth, playerHeight];
                    this.drawPlayer(arrDimensions, "walk", "spritesheet"+playerCurrentSize);

                    this.velY = -this.speed * 2.8;
                    sound.play("sJump");
                }
                else
                {
                    this.velY = -this.speed / 2;
                }
            }
        }

        if(isHeliumActivated)
        {
            this.jumping = true;
            this.grounded = false;
            this.velY = -(.5*this.speed);
            this.velX *= .5;
        }

        this.grounded = false;
        for(var i = 0; i < collisionObjects.length; i++)
        {
            var colDir = collision.checkCollision(player, collisionObjects[i]);

            var isGrounded = true;
            if(Math.floor(player.y + playerHeight + 1) != world.height) isGrounded = false;

            if(colDir.length > 0)
            {
                switch(collisionObjects[i].name)
                {
                    default:
                        if(!this.climbing){
                            switch(colDir)
                            {
                                case "l":
                                    if(stuckSide == "" && this.timesStuck < maxStucks && !isGrounded && !stuckDelay && !stuckVerticalPlatform && stuckSupport){
                                        stuckDelay = true;
                                        stuckSide = "l";
                                        this.timesStuck++;
                                        var timer = setTimeout(function(){stuckDelay = false; clearTimeout(timer);}, 500);
                                    }
                                    this.velX = 0;
                                    break;

                                case "r":
                                    if(stuckSide == "" && this.timesStuck < maxStucks && !isGrounded && !stuckDelay && !stuckVerticalPlatform && stuckSupport){
                                        stuckDelay = true;
                                        stuckSide = "r";
                                        this.timesStuck++;
                                        var timer = setTimeout(function(){stuckDelay = false; clearTimeout(timer);}, 500);
                                    }
                                    this.velX = 0;
                                    break;

                                case "t":
                                    if(stuckSide == "" && this.timesStuck < maxStucks && !stuckVerticalPlatform && stuckSupport){
                                        stuckSide = "t";
                                        this.timesStuck++;
                                    }
                                    isHeliumActivated = false;
                                    this.velY *= -1;
                                    break;

                                case "b":
                                    if(collisionObjects[i].name == "bound_b" && !this.isDead){
                                        this.isDead = true;
                                        music.stopMusic();
                                        stage.dispatchEvent("RESTART_LEVEL");
                                        break;
                                    }

                                    if(this.fallingDistance > minFallingDistanceForDamage){
                                        health.updateFallingDamage(player.fallingDistance);
                                        world.shake();
                                    }

                                    this.fallingDistance = 0;
                                    this.jumping = false;
                                    this.grounded = true;
                                    break;
                            }
                        }
                        break;

                    case "spikes":
                        if(!this.isDead){
                            this.isDead = true;
                            stage.dispatchEvent("RESTART_LEVEL");
                        }
                        break;

                    case "todd":
                        this.jumping = false;
                        this.grounded = true;

                        if(!nextLevelCalled)
                        {
                            music.stopMusic();
                            nextLevelCalled = true;
                            isPaused = true;
                            var timer = setTimeout(function(){
                                currentLevel++;
                                isRestarted = false;
                                nextLevelCalled = false;
                                clearTimeout(timer);
                                stage.dispatchEvent("NEXT_LEVEL");
                            }, 500);
                        }
                        break;

                    case "mattress":
                        switch(colDir)
                        {
                            case 'l':
                            case 'r':
                                this.velX = 0;
                                break;

                            case "b":
                                this.jumping = true;
                                this.grounded = false;
                                this.fallingDistance = 0;

                                this.velY = -this.speed * 2;
                                sound.play("sHop");
                                break;
                        }
                        break;

                    case "jumper":
                        switch(colDir)
                        {
                            case 'l':
                            case 'r':
                                this.velX = 0;
                                break;
                            case "b":
                                this.velY = 0;
                                for(var j = 0; j < world.arrPlatforms.length; j++)
                                {
                                    if(world.arrPlatforms[j] == collisionObjects[i].object && !this.jumpingFromJumpPlatform){
                                        world.arrPlatforms[j].gotoAndPlay("down");
                                        this.jumping = true;
                                        this.grounded = false;
                                        this.fallingDistance = 0;
                                        this.jumpingFromJumpPlatform = true;
                                        this.velY = -this.speed * 3;
                                        var self = this;
                                        var timer = setTimeout(function(){self.jumpingFromJumpPlatform = false; clearTimeout(timer);}, 500);
                                    }
                                }
                                sound.play("sBoing");
                                break;
                        }
                        break;

                    case "shield":
                        if(inventory.arrObjects.length < inventory.maxItems){
                            sound.play("sNot");
                            world.removeChild(collisionObjects[i].object);
                            inventory.updateInventoryList(collisionObjects[i].name);
                        }
                        collisionObjects.splice($.inArray(collisionObjects[i], collisionObjects),1);
                        break;

                    case "health":
                        health.setHealthValue(collisionObjects[i].object.value);
                        world.removeChild(collisionObjects[i].object);
                        collisionObjects.splice($.inArray(collisionObjects[i], collisionObjects),1);
                        break;

                    case "helium":
                        helium.setHeliumValue(collisionObjects[i].object.value);
                        world.removeChild(collisionObjects[i].object);
                        collisionObjects.splice($.inArray(collisionObjects[i], collisionObjects),1);
                        break;
                }

                if(stuckSide != "r" && stuckSide != "l" && stuckSide != "t" && stuckSide != "b"){disableControlLeft = false; disableControlRight = false; disableControlBottom = false; stuckVerticalPlatform = false;}

                if(typeof collisionObjects[i] != "undefined")
                {
                    if(typeof collisionObjects[i].object != "undefined")
                    {
                        if(collisionObjects[i].object.type == "moveHor" || collisionObjects[i].object.type == "moveVer")
                        {
                            stuck.stuckObject = collisionObjects[i].object;
                            stuck.stuckDirection = colDir;
                        }
                        else
                        {
                            stuck.stuckObject = null;
                            stuck.stuckDirection = null;
                        }
                    }
                }
            }
        }

        if(this.dimensionsEdited && Math.abs(this.velX) < 0.3 || this.dimensionsEdited && this.justJumped){
            playerWidth = Math.floor(playerWidth*2);
            this.updateXSign = '-';
            arrDimensions = [playerWidth, playerHeight];
            this.drawPlayer(arrDimensions, "walk", "spritesheet"+playerCurrentSize);
            this.dimensionsEdited = false;
            this.justJumped = false;
        }

        var climbCollisionObject = collision.climbCollision();
        if(climbCollisionObject != '')
        {
            if(isHeliumActivated)helium.deactivate();
            if(!this.climbing){
                arrDimensions = [playerWidth, playerHeight];
                switch(climbCollisionObject){
                    case 'rope':
                        this.drawPlayer(arrDimensions, "climbRope", "spritesheet"+playerCurrentSize+"Back");
                        break;
                    case 'ladder':
                        this.drawPlayer(arrDimensions, "startClimbLadder", "spritesheet"+playerCurrentSize+"Back");
                        break;
                }
            }
            this.gravity = 0;
            this.climbing = true;
            this.jumping = false;
            this.fallingDistance = 0;
        }
        else
        {
            this.gravity = world.gravity;
            arrDimensions = [playerWidth, playerHeight];
            if(this.climbing)this.drawPlayer(arrDimensions, "walk", "spritesheet"+playerCurrentSize);
            this.climbing = false;
        }


    };

    Player.prototype.update = function()
    {
        stuck.checkStuckObject();
        health.animateFallingDamage();

        if(isHeliumActivated)
        {
            var velX = helium.animateFloatHelium(this.velX);
            this.x = this.x + (velX * 2);
        }

        if(stuckSide != "")
        {
            this.velY = 0;
            this.velX = 0;
        }

        if(this.grounded) this.velY = 0;
        if(this.velY > playerHeight) this.velY = playerHeight - .05;

        this.x += this.velX;
        this.y += this.velY;
        if(this.updateXSign != ''){
            if(this.updateXSign == '+'){
                this.x += (Math.floor(playerWidth/2));
            }else{
                this.x -= (Math.floor(playerWidth/4));
            }
            this.updateXSign = '';
        }
        if(particles.arrParticles.length > 0) particles.updateParticlePositions();

        this.character.x = Math.floor(this.x);
        this.character.y = Math.floor(this.y);

        if(this.velY > 0){
            this.fallingDistance += this.velY;
        }else if(this.grounded){
            this.fallingDistance = 0;
        }

        if(this.climbing)
        {
            this.grounded = true;
            this.velY *= this.frictionY;
        }

        this.velX *= this.frictionX;
        this.velY += this.gravity;
    };

    Player.prototype.drawPlayer = function(dimensions, animation, spritesheet)
    {
        this.width = dimensions[0];
        this.height = dimensions[1];

        if(this.character) world.removeChild(this.character);

        this.character = new createjs.Sprite(window[spritesheet], animation);
        this.character.width = this.width;
        this.character.height = this.height;
        this.character.x = this.x;
        this.character.y = this.y;
        world.addChild(this.character);
    };

    return Player;

})();