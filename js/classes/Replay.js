var Replay = (function()
{

    function Replay()
    {
        var btnReplay = new createjs.Bitmap("img/replay_button.png");
        btnReplay.addEventListener("click", replayLevel);
        btnReplay.x = 12;
        btnReplay.y = 715;
        stage.addChild(btnReplay);
    }

    function replayLevel()
    {
        music.stopMusic();
        sound.play('sSoundToggle');
        stage.dispatchEvent("RESTART_LEVEL");
    }

    return Replay;

})();