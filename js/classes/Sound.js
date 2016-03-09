var sJump, sHelium, sFall, sHop, sBoing, sNot, sSoundToggle, sHover, sHoverOut, sClick;

var Sound = (function()
{
    function Sound()
    {
        createjs.Sound.registerSound("sound/jump.mp3", "jump");
        createjs.Sound.registerSound("sound/helium.mp3", "helium");
        createjs.Sound.registerSound("sound/fall.mp3", "fall");
        createjs.Sound.registerSound("sound/hop.mp3", "hop");
        createjs.Sound.registerSound("sound/boing.mp3", "boing");
        createjs.Sound.registerSound("sound/not1.mp3", "not");
        createjs.Sound.registerSound("sound/sound_toggle.mp3", "soundtoggle");
        createjs.Sound.registerSound("sound/hover.mp3", "hover");
        createjs.Sound.registerSound("sound/hoverout.mp3", "hoverout");
        createjs.Sound.registerSound("sound/click.mp3", "click");

        createjs.Sound.addEventListener("fileload", soundLoaded);
    }

    Sound.prototype.play = function(name)
    {
        window[name].play();
    };

    function soundLoaded(e)
    {
        var timer;
        switch(e.id)
        {
            case "jump":
                sJump = createjs.Sound.play("jump");
                sJump.volume = 0;
                timer = setTimeout(function(){sJump.volume = 0.4; clearInterval(timer)}, 2000);
                break;
            case "helium":
                sHelium = createjs.Sound.play("helium");
                sHelium.volume = 0;
                timer = setTimeout(function(){sHelium.volume = 1; clearInterval(timer)}, 2000);
                break;
            case "fall":
                sFall = createjs.Sound.play("fall");
                sFall.volume = 0;
                timer = setTimeout(function(){sFall.volume = 1; clearInterval(timer)}, 2000);
                break;
            case "hop":
                sHop = createjs.Sound.play("hop");
                sHop.volume = 0;
                timer = setTimeout(function(){sHop.volume = 1; clearInterval(timer)}, 2000);
                break;
            case "boing":
                sBoing = createjs.Sound.play("boing");
                sBoing.volume = 0;
                timer = setTimeout(function(){sBoing.volume = 1; clearInterval(timer)}, 2000);
                break;
            case "not":
                sNot = createjs.Sound.play("not");
                sNot.volume = 0;
                timer = setTimeout(function(){sNot.volume = 1; clearInterval(timer)}, 2000);
                break;
            case "soundtoggle":
                sSoundToggle = createjs.Sound.play("soundtoggle");
                sSoundToggle.volume = 0;
                timer = setTimeout(function(){sSoundToggle.volume = 1; clearInterval(timer)}, 2000);
                break;
            case "hover":
                sHover = createjs.Sound.play("hover");
                sHover.volume = 0;
                timer = setTimeout(function(){sHover.volume = 1; clearInterval(timer)}, 1000);
                break;
            case "hoverout":
                sHoverOut = createjs.Sound.play("hoverout");
                sHoverOut.volume = 0;
                timer = setTimeout(function(){sHoverOut.volume = 1; clearInterval(timer)}, 1000);
                break;
            case "click":
                sClick = createjs.Sound.play("click");
                sClick.volume = 0;
                timer = setTimeout(function(){sClick.volume = 1; clearInterval(timer)}, 2000);
                break;
        }
    }

    return Sound;

})();