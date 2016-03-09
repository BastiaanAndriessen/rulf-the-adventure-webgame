var Level = (function()
{
    var spriteDataTotal, spriteDataLoaded, xml, staticObjectIndex, dynamicObjectIndex;

    function Level(loadedXml)
    {
        staticObjectIndex = 0;
        dynamicObjectIndex = 0;

        xml = loadedXml;
        spriteDataTotal = 2;
        spriteDataLoaded = 0;

        $.ajax({
            url: "json/objects_spritedata.json",
            dataType: "json",
            success: function(data)
            {
                levelObjects = data;
                checkLoadedData();
            }
        });

        $.ajax({
            url: "json/items_spritedata.json",
            dataType: "json",
            success: function(data)
            {
                items = data;
                checkLoadedData();
            }
        });
    }

    function checkLoadedData()
    {
        spriteDataLoaded++;
        if(spriteDataLoaded == spriteDataTotal) readXML(xml);
    }

    function readXML(xml)
    {
        var map = $(xml).find("map");

        var tip = map.find("tip");
        var rail = map.find("rail");
        var todd = map.find("todd");
        var rope = map.find("rope");
        var wall = map.find("wall");
        var grid = map.find("grid");
        var smoke = map.find("smoke");
        var spike = map.find("spike");
        var banner = map.find("banner");
        var health = map.find("health");
        var helium = map.find("helium");
        var shield = map.find("shield");
        var ladder = map.find("ladder");
        var jumper = map.find("jumper");
        var pickaxe = map.find("pickaxe");
        var mattress = map.find("mattress");
        var platform = map.find("platform");

        var staticObjects = [rail, rope, grid, banner, health, helium, ladder, mattress, shield, pickaxe, platform, todd, wall, spike, tip];
        var dynamicObjects = [jumper, smoke];

        if(tip.length == 0) isControlsActivated = true;

        var image = new Image();
        $(image).load(function()
        {
            var background = new createjs.Shape();
            background.graphics.beginBitmapFill(image, "repeat").drawRect(world.userOptionsBarWidth, 0, (world.width - world.userOptionsBarWidth), 2000);
            world.addChild(background);

            createStaticObject(staticObjects);
            createDynamicObject(dynamicObjects);
        }).attr("src", "img/background_well.png");
    }

    function createDynamicObject(dynamicObjects)
    {
        if(dynamicObjects[dynamicObjectIndex].length > 0)
        {
            for(var i = 0; i < dynamicObjects[dynamicObjectIndex].length; i++)
            {
                levelObject.createDynamicObject(dynamicObjects[dynamicObjectIndex][i]);
                if(i == dynamicObjects[dynamicObjectIndex].length - 1 && dynamicObjectIndex < dynamicObjects.length - 1)
                {
                    dynamicObjectIndex++;
                    createDynamicObject(dynamicObjects);
                }
            }
        }
        else if(dynamicObjectIndex < dynamicObjects.length - 1)
        {
            dynamicObjectIndex++;
            createDynamicObject(dynamicObjects);
        }
    }

    function createStaticObject(staticObjects)
    {
        if(staticObjects[staticObjectIndex].length > 0)
        {
            for(var i = 0; i < staticObjects[staticObjectIndex].length; i++)
            {
                levelObject.createStaticObject(staticObjects[staticObjectIndex][i]);
                if(i == staticObjects[staticObjectIndex].length - 1 && staticObjectIndex < staticObjects.length - 1)
                {
                    staticObjectIndex++;
                    var timer2 = setTimeout(function(){createStaticObject(staticObjects); clearTimeout(timer2)}, 25);
                }
            }
        }
        else if(staticObjectIndex < staticObjects.length - 1)
        {
            staticObjectIndex++;
            var timer3 = setTimeout(function(){createStaticObject(staticObjects); clearTimeout(timer3)}, 25);
        }
    }

    return Level;

})();