var Cheat = (function()
{
    var arrKeys, cheats;

    function Cheat()
    {
        cheats =
        {
            loveme: "76,79,86,69,77,69",
            gasout: "71,65,83,79,85,84",
            bigman: "66,73,71,77,65,78",
            lvlone: "76,86,76,79,78,69",
            lvltwo: "76,86,76,84,87,79",
            lvlthree: "76,86,76,84,72,82,69,69",
            lvlfour: "76,86,76,70,79,85,82"
        };

        arrKeys = [];
    }

    Cheat.prototype.checkKeys = function(keyCode)
    {
        arrKeys.push(keyCode);

        $.each(cheats, function(key, val)
        {
            if(arrKeys.toString().indexOf(cheats[key]) >= 0)
            {
                switch(key)
                {
                    case "loveme":
                        health.healthValue = 100;
                        health.updateHealthValue();
                        break;

                    case "gasout":
                        helium.fillUpHelium();
                        break;
                    case "bigman":
                        var newEnlargedDimensions = helium.enlargePlayerDimensions();
                        if(newEnlargedDimensions[0] != 75){
                            player.timesStuck--;
                            player.drawPlayer(newEnlargedDimensions, "walk", "spritesheet"+helium.newEnlargedPlayerSize);
                            playerWidth = newEnlargedDimensions[0];
                            playerHeight = newEnlargedDimensions[1];
                            player.playerCurrentSize = helium.newEnlargedPlayerSize;
                        }
                        break;
                    case "lvlone":
                        currentLevel = 1;
                        music.stopMusic();
                        stage.dispatchEvent("RESTART_LEVEL");
                        break;
                    case "lvltwo":
                        currentLevel = 2;
                        music.stopMusic();
                        stage.dispatchEvent("RESTART_LEVEL");
                        break;
                    case "lvlthree":
                        currentLevel = 3;
                        music.stopMusic();
                        stage.dispatchEvent("RESTART_LEVEL");
                        break;
                    case "lvlfour":
                        currentLevel = 4;
                        music.stopMusic();
                        stage.dispatchEvent("RESTART_LEVEL");
                        break;
                }

                arrKeys = [];
            }
        });
    };

    return Cheat;

})();