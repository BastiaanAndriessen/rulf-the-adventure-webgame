var disableControlLeft = false;
var disableControlRight = false;
var disableControlBottom = false;
var stuckVerticalPlatform = false;

var Stuck = (function()
{
    function Stuck()
    {
        this.stuckObject = null;
        this.stuckDirection = null;

        disableControlLeft = false;
        disableControlRight = false;
        disableControlBottom = false;
        stuckVerticalPlatform = false;
    }

    Stuck.prototype.checkTimesStuck = function(timesStuck)
    {
        switch(timesStuck)
        {
            case 0:
                playerCurrentSize = "Normal";
                playerWidth = 50;
                playerHeight = 83;
                break;

            case 1:
                playerCurrentSize = "Medium";
                playerWidth = 35;
                playerHeight = 58;
                break;

            case 2:
                playerCurrentSize = "Small";
                playerWidth = 20;
                playerHeight = 33;
                break;
        }
        var arrDimensions = [playerWidth, playerHeight];
        player.drawPlayer(arrDimensions, "walk", "spritesheet"+playerCurrentSize);
    };

    Stuck.prototype.checkStuckObject = function()
    {
        if(this.stuckObject != null)
        {
            switch(this.stuckObject.type)
            {
                case "moveHor":
                    if(player.movingPlatformDifX == 0)
                    {
                        player.movingPlatformDifX = player.x - this.stuckObject.x;
                    }
                    player.x = this.stuckObject.x + Math.floor(player.movingPlatformDifX);

                    switch(this.stuckDirection)
                    {
                        case "r":
                            disableControlRight = true;
                            disableControlBottom = true;
                            if(savedKeycodes[37] || savedKeycodes[38])
                            {
                                disableControlRight = false;
                                disableControlBottom = false;

                                this.stuckObject = null;
                                player.movingPlatformDifX = 0;
                            }
                            break;
                        case "l":
                            disableControlLeft = true;
                            disableControlBottom = true;
                            if(savedKeycodes[39] || savedKeycodes[38])
                            {
                                disableControlLeft = false;
                                disableControlBottom = false;

                                this.stuckObject = null;
                                player.movingPlatformDifX = 0;
                            }
                            break;
                        case "t":
                            disableControlLeft = true;
                            disableControlRight = true;
                            if(savedKeycodes[40])
                            {
                                disableControlLeft = false;
                                disableControlRight = false;

                                this.stuckObject = null;
                                player.movingPlatformDifX = 0;
                            }
                            break;
                        case "b":
                            if(savedKeycodes[38])
                            {
                                this.stuckObject = null;
                                player.movingPlatformDifX = 0;
                            }
                            break;
                    }
                    break;

                case "moveVer":
                    if(player.movingPlatformDifX == 0)
                    {
                        player.movingPlatformDifX = player.x - this.stuckObject.x;
                    }
                    player.x = this.stuckObject.x + Math.floor(player.movingPlatformDifX);

                    switch(this.stuckDirection)
                    {
                        case "r":
                            disableControlRight = true;
                            stuckVerticalPlatform = true;
                            if(savedKeycodes[37] || savedKeycodes[38])
                            {
                                disableControlRight = false;
                                stuckVerticalPlatform = false;

                                this.stuckObject = null;
                                player.movingPlatformDifX = 0;
                            }
                            break;
                        case "l":
                            disableControlLeft = true;
                            stuckVerticalPlatform = true;
                            if(savedKeycodes[39] || savedKeycodes[38])
                            {
                                disableControlLeft = false;
                                stuckVerticalPlatform = false;

                                this.stuckObject = null;
                                player.movingPlatformDifX = 0;
                            }
                            break;
                        case "t":
                            disableControlLeft = true;
                            disableControlRight = true;
                            stuckVerticalPlatform = true;
                            if(savedKeycodes[40])
                            {
                                disableControlLeft = false;
                                disableControlRight = false;
                                stuckVerticalPlatform = false;

                                this.stuckObject = null;
                                player.movingPlatformDifX = 0;
                            }
                            break;
                        case "b":
                            if(savedKeycodes[38])
                            {
                                this.stuckObject = null;
                                player.movingPlatformDifX = 0;
                            }
                            break;
                    }
                    break;
            }
        }
    };

    return Stuck;

})();