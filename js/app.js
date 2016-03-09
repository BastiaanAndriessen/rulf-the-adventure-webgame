var stage, ticker, world, spritesheet, replay, level, control, menu, collision, player, helium, health, inventory, cheat, music, sound, preloader, pause, stuck, particles, levelObject, levelObjects, items, loadedXml, isRestarted;

var climbObjects;
var collisionObjects;

var currentLevel = 1;
var savedKeycodes = [];

var stuckSupport = false;
var heliumSupport = false;

var isPaused = false;
var isClimbing = false;
var isLevelLoaded = false;
var isHeliumActivated = false;
var isControlsActivated = false;

(function()
{
    function init()
    {
        if(navigator.userAgent.indexOf('Chrome') != -1 || navigator.userAgent.indexOf('Safari') != -1)
        {
            stage = new createjs.Stage("container");
            stage.addEventListener("START_GAME", xmlLoading);
            stage.addEventListener("NEXT_LEVEL", xmlLoading);
            stage.addEventListener("RESTART_LEVEL", restartLevel);

            levelObject = new LevelObject();
            spritesheet = new Spritesheet();
            preloader = new Preloader();
            control = new Control();
            sound = new Sound();
            menu = new Menu();

            isRestarted = false;
        }
        else
        {
            $("#support").css("display", "block").text("Only supported for Safari and Google Chrome!");
        }
    }

    function restartLevel()
    {
        isRestarted = true;
        xmlLoading();
    }

    function xmlLoading()
    {
        isPaused = true;
        climbObjects = [];
        collisionObjects = [];
        stage.removeAllChildren();
        isControlsActivated = false;

        preloader.start();

        ticker = createjs.Ticker;
        ticker.useRAF = true;
        ticker.setFPS(20);
        ticker.addEventListener("tick", stageUpdated);

        $.get("xml/level_" + currentLevel + ".xml", xmlLoaded);
    }

    function xmlLoaded(xml)
    {
        isPaused = false;

        loadedXml = xml;
        var width = $(loadedXml).find("width").text();
        var height = $(loadedXml).find("height").text();

        world = new World(width, height);
        level = new Level(loadedXml);

        stuckSupport = ($(loadedXml).find("stuckSupport").text() === "true");
        heliumSupport = ($(loadedXml).find("heliumSupport").text() === "true");

        var timer;
        (isRestarted) ? timer = setTimeout(function(){levelLoaded(timer);}, 2000) : timer = setTimeout(function(){levelLoaded(timer);}, 7000);
    }

    function levelLoaded(timer)
    {
        clearTimeout(timer);

        preloader.stop();
        ticker.setFPS(60);

        isLevelLoaded = true;

        canvasBoundsConstructed();

        health = new Health();
        helium = new Helium();
        inventory = new Inventory();
        replay = new Replay();

        pause = new Pause();
        cheat = new Cheat();

        stuck = new Stuck();
        music = new Music($(loadedXml).find("background_music").text());
        player = new Player(parseFloat($(loadedXml).find("default_player_x").text()), parseFloat($(loadedXml).find("default_player_y").text()));
        collision = new Collision();
        particles = new Particles();

        window.onkeydown = keyboardDownPressed;
        window.onkeyup = keyboardUpPressed;

        stage.addChild(world.container);
    }

    function keyboardDownPressed(e)
    {
        cheat.checkKeys(e.keyCode);
        pause.checkKeys(e.keyCode);
        savedKeycodes[e.keyCode] = true;
    }

    function keyboardUpPressed(e)
    {
        savedKeycodes[e.keyCode] = false;
    }

    function canvasBoundsConstructed()
    {
        collisionObjects.push(new Bound(world.userOptionsBarWidth, world.height-1, world.width, 1, "bound_b"));
        collisionObjects.push(new Bound(world.userOptionsBarWidth, 0, world.width, 1, "bound_t"));
        collisionObjects.push(new Bound(world.userOptionsBarWidth, 0, 1, world.height, "bound_l"));
        collisionObjects.push(new Bound(world.width-1, 0, 1, world.height, "bound_r"));
    }

    function stageUpdated()
    {
        if(isLevelLoaded && isControlsActivated && !isPaused)
        {
            player.move();
            player.update();
            helium.activate();
            world.updatePlatforms();
        }

        if(player)
        {
            world.followPlayerX(player, player.width, 0);
            world.followPlayerY(player, player.height, -stage.canvas.height/2 + player.height/2);
        }

        stage.update();
    }

    init();

})();