var Helium = (function()
{
    var value, maxValue, fillMeter, overlay, isDownButtonActive, self, ticker, wasActiveWhenPaused;

    function Helium()
    {
        self = this;
        if(heliumSupport){value = 100;}else{value = 0}
        maxValue = 100;
        isDownButtonActive = true;
        wasActiveWhenPaused = false;

        this.x = 0;
        this.y = 204;
        this.width = world.userOptionsBarWidth;
        this.height = 220;

        this.backgroundMeter = new createjs.Shape();
        this.backgroundMeter.graphics.c();
        this.backgroundMeter.graphics.f("#f1eddc");
        this.backgroundMeter.graphics.dr(0, 0, this.width, this.height);
        this.backgroundMeter.graphics.ef();
        this.backgroundMeter.x = this.x;
        this.backgroundMeter.y = this.y;
        stage.addChild(this.backgroundMeter);

        this.newEnlargedPlayerSize = 0;
        this.newDecreasedPlayerSize = 0;

        this.arrShakeAnimation = [];
        this.currentShakeAnimationIndex = this.arrShakeAnimation.length/2;
        var averageSpeed = 0.05;
        for(var i=-30; i<30; i++)
        {
            var newvalue;
            if(i<0){
                newvalue = averageSpeed-(i/400);
            }else if(i>0){
                newvalue = -averageSpeed-(i/400);
            }else{
                newvalue = averageSpeed;
            }
            this.arrShakeAnimation.push(Math.round(newvalue * 100) / 100);
        }
        this.shakeSign = '+';

        this.fillMeter();
    }

    Helium.prototype.animateFloatHelium = function(velX)
    {
        if(isHeliumActivated)
        {
            velX += this.arrShakeAnimation[this.currentShakeAnimationIndex];
            if(this.currentShakeAnimationIndex == this.arrShakeAnimation.length-1){
                this.currentShakeAnimationIndex--;
                this.shakeSign = '-';
            }else if(this.currentShakeAnimationIndex == 0){
                this.currentShakeAnimationIndex++;
                this.shakeSign = '+';
            }else if(this.shakeSign == '+'){
                this.currentShakeAnimationIndex++;
            }else{
                this.currentShakeAnimationIndex--;
            }
        }

        return velX;
    };

    Helium.prototype.activate = function()
    {
        var newEnlargedDimensions = this.enlargePlayerDimensions();
        var newDecreasedDimensions = this.decreasePlayerDimensions();

        if(!isPaused && !isClimbing && heliumSupport)
        {
            if(wasActiveWhenPaused)
            {
                isHeliumActivated = true;
                wasActiveWhenPaused = false;
                ticker.addEventListener("tick", this.editHeliumValue);
            }

            //down - activate helium
            if(savedKeycodes[32] && !isHeliumActivated && isDownButtonActive && value > 0)
            {
                sound.play("sHelium");

                player.drawPlayer(newEnlargedDimensions, "walk", "spritesheet"+this.newEnlargedPlayerSize);
                playerWidth = newEnlargedDimensions[0];
                playerHeight = newEnlargedDimensions[1];
                playerCurrentSize = this.newEnlargedPlayerSize;

                isHeliumActivated = true;
                isDownButtonActive = false;

                ticker = createjs.Ticker;
                ticker.useRAF = true;
                ticker.setFPS(60);
                ticker.addEventListener("tick", this.editHeliumValue);

                //check if it's possible to scale player without collision
                for(var j = 0; j < collisionObjects.length; j++)
                {
                    switch(collision.checkCollision(player, collisionObjects[j]))
                    {
                        case "l":
                        case "r":
                        case "t":
                        case "b":
                            player.drawPlayer(newEnlargedDimensions, "walk", "spritesheet"+this.newEnlargedPlayerSize);
                            playerWidth = newEnlargedDimensions[0];
                            playerHeight = newEnlargedDimensions[1];
                            break;
                    }
                }

                //prevent multiple calls of this function
                setTimeout(function(){isDownButtonActive = true;}, 400);
            }

            //down - deactivate helium
            if(savedKeycodes[32] && isHeliumActivated && isDownButtonActive)
            {
                player.drawPlayer(newDecreasedDimensions, "walk", "spritesheet"+this.newDecreasedPlayerSize);
                playerWidth = newDecreasedDimensions[0];
                playerHeight = newDecreasedDimensions[1];
                playerCurrentSize = this.newDecreasedPlayerSize;

                isHeliumActivated = false;
                isDownButtonActive = false;

                ticker.removeEventListener("tick", this.editHeliumValue);

                //prevent multiple calls of this function
                setTimeout(function(){isDownButtonActive = true;}, 400);
            }

            //check collisions
            if(isHeliumActivated){
                var oldWidth = playerWidth;
                var newDecreasedDimensions = this.decreasePlayerDimensions();
                for(var i = 0; i < collisionObjects.length; i++)
                {
                    switch(collision.checkCollision(player, collisionObjects[i]))
                    {
                        case "r":
                            var newWidth = newDecreasedDimensions[0];
                            var diffX = oldWidth - newWidth;
                            player.x += diffX;
                        case "l":
                        case "t":
                            value=0;
                            isHeliumActivated = false;

                            self.fillMeter();
                            player.drawPlayer(newDecreasedDimensions, "walk", "spritesheet"+this.newDecreasedPlayerSize);
                            playerWidth = newDecreasedDimensions[0];
                            playerHeight = newDecreasedDimensions[1];
                            break;
                    }
                }
            }
            }else{
                if(isHeliumActivated){
                    isHeliumActivated = false;
                    wasActiveWhenPaused = true;
                    ticker.removeEventListener("tick", this.editHeliumValue);
                }
            }
    };

    Helium.prototype.deactivate = function()
    {
        if(isHeliumActivated)
        {
            var newDecreasedDimensions = this.decreasePlayerDimensions();

            playerWidth = newDecreasedDimensions[0];
            playerHeight = newDecreasedDimensions[1];
            playerCurrentSize = this.newDecreasedPlayerSize;

            ticker.removeEventListener("tick", this.editHeliumValue);

            isHeliumActivated = false;
        }
    };

    Helium.prototype.editHeliumValue = function()
    {
        var newDecreasedDimensions = self.decreasePlayerDimensions();

        if(!isPaused)
        {
            if(value > 0.2999999)
            {
                stage.removeChild(fillMeter);
                value-=0.3;
                self.fillMeter();
            }
            else if(value > 0)
            {
                stage.removeChild(fillMeter);
                value=0;
                self.fillMeter();
            }
            else
            {
                ticker.removeEventListener("tick", self.editHeliumValue);
                isHeliumActivated = false;
                isDownButtonActive = false;
                playerWidth = newDecreasedDimensions[0];
                playerHeight = newDecreasedDimensions[1];
            }
        }
    };

    Helium.prototype.setHeliumValue = function(heliumValue)
    {
        isDownButtonActive = true;
        value += heliumValue;
        if(value > maxValue){
            value = maxValue;
        }
        this.fillMeter();
    };

    Helium.prototype.fillUpHelium = function()
    {
        this.setHeliumValue(maxValue);
    };

    Helium.prototype.fillMeter = function()
    {
        if(fillMeter) stage.removeChild(fillMeter);
        if(overlay) stage.removeChild(overlay);

        fillMeter = new createjs.Shape();
        fillMeter.height = Math.floor((value/(100/154))*100)/100;
        fillMeter.graphics.c();
        fillMeter.graphics.f("#00318f");
        fillMeter.graphics.dr(0, 0, this.width, fillMeter.height);
        fillMeter.graphics.ef();
        fillMeter.x = this.x;
        fillMeter.y = this.y + 56 + 154 - fillMeter.height;
        stage.addChild(fillMeter);

        overlay = new createjs.Bitmap("img/helium_meter.png");
        overlay.x = this.x;
        overlay.y = this.y;
        overlay.name = "helium overlay";
        stage.addChild(overlay);
    };

    Helium.prototype.enlargePlayerDimensions = function(){
        var arrDimensions = [];
        var newWidth, newHeight;
        switch(playerWidth){
            case 20:
                this.newEnlargedPlayerSize = "Medium";
                newWidth = 35;
                newHeight = 58;
                break;
            case 35:
                this.newEnlargedPlayerSize = "Normal";
                newWidth = 50;
                newHeight = 83;
                break;
            default:
            case 50:
                this.newEnlargedPlayerSize = "Big";
                newWidth = 75;
                newHeight = 125;
                break;
        }
        arrDimensions.push(newWidth, newHeight);
        return arrDimensions;
    };

    Helium.prototype.decreasePlayerDimensions = function(){
        var arrDimensions = [];
        var newWidth, newHeight;
        switch(playerWidth){
            case 35:
                this.newDecreasedPlayerSize = "Small";
                newWidth = 20;
                newHeight = 33;
                break;
            default:
            case 50:
                this.newDecreasedPlayerSize = "Medium";
                newWidth = 35;
                newHeight = 58;
                break;
            case 75:
                this.newDecreasedPlayerSize = "Normal";
                newWidth = 50;
                newHeight = 83;
                break;
        }
        arrDimensions.push(newWidth, newHeight);
        return arrDimensions;
    };

    Helium.prototype.checkSpriteSheetImage = function(dimensions){
        var spriteSheetImage;
        switch(dimensions[0]){
            case 20:
                spriteSheetImage = "spritesheetSmall";
                break;
            case 35:
                spriteSheetImage = "spritesheetMedium";
                break;
            default:
            case 50:
                spriteSheetImage = "spritesheetNormal";
                break;
            case 75:
                spriteSheetImage = "spritesheetBig";
                break;
        }
        return spriteSheetImage;
    };

    return Helium;

})();