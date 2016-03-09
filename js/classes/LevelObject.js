var LevelObject = (function()
{
    function LevelObject(){}

    LevelObject.prototype.createStaticObject = function(data)
    {
        $.each(levelObjects, function(key, val)
        {
            $.each(val, function(key, val)
            {
                if(val.filename == data.id)
                {
                    var image = new Image();
                    $(image).load(function()
                    {
                        var sprite = new createjs.Shape();
                        sprite.graphics.beginBitmapFill(image).drawRect(val.frame.x, val.frame.y, val.frame.w, val.frame.h);

                        var object = sprite;
                        object.width = val.frame.w;
                        object.height = val.frame.h;
                        object.type = data.getAttribute("type");
                        object.name = data.getAttribute("id").split("_")[0].split(".")[0];
                        object.x = data.getAttribute("x") - val.frame.x;
                        object.y = data.getAttribute("y") - val.frame.y;
                        if(data.getAttribute("type") != "tip")world.addChild(object);

                        switch(data.getAttribute("type"))
                        {
                            case "moveHor":
                            case "moveVer":
                                object.spriteX = val.frame.x;
                                object.minX = data.getAttribute("minX");
                                object.maxX = data.getAttribute("maxX");
                                object.direction = data.getAttribute("direction");
                                object.speed = parseFloat(data.getAttribute("speed"));
                                collisionObjects.push(new Bound(parseFloat(object.x) + parseInt(val.frame.x), parseFloat(parseInt(object.y) + parseInt(val.frame.y)), parseFloat(object.width), parseFloat(object.height), object.name, object));
                                world.arrPlatforms.push(object);
                                break;
                            case "potion":
                                object.value = parseFloat(data.getAttribute("value"));
                                collisionObjects.push(new Bound(parseFloat(object.x) + parseInt(val.frame.x), parseFloat(parseInt(object.y) + parseInt(val.frame.y)), parseFloat(object.width), parseFloat(object.height), object.name, object));
                                break;
                            case "collision":
                                collisionObjects.push(new Bound(parseFloat(object.x) + parseInt(val.frame.x), parseFloat(parseInt(object.y) + parseInt(val.frame.y)), parseFloat(object.width), parseFloat(object.height), object.name, object));
                                break;
                            case "climb":
                                climbObjects.push(new Bound(parseFloat(object.x) + parseInt(val.frame.x), parseFloat(parseInt(object.y) + parseInt(val.frame.y)), parseFloat(object.width), parseFloat(object.height), object.name, object));
                                break;
                            case "tip":
                                if(!isRestarted){
                                    if(!isPaused){isPaused = true}
                                    object.addEventListener("click", function()
                                    {
                                        pause.togglePause();
                                        isControlsActivated = true;
                                        world.removeChild(object);
                                    });
                                    world.addChild(object);
                                }else{
                                    isControlsActivated = true;
                                    isRestarted = false;
                                }
                                break;
                        }
                    }).attr("src", "img/objects_spritesheet.png");
                }
            });
        });
    };

    LevelObject.prototype.createDynamicObject = function(data)
    {
        var name = data.getAttribute("id").split("_")[0].split(".")[0];
        var object;
        switch(name)
        {
            case "jumper":
                object = new createjs.Sprite(spritesheetJumper, "normal");
                object.x = data.getAttribute("x");
                object.y = data.getAttribute("y");
                object.name = name;
                world.addChild(object);
                collisionObjects.push(new Bound(parseFloat(object.x), parseFloat(object.y), spritesheetJumper._frameWidth, spritesheetJumper._frameHeight, object.name, object));
                world.arrPlatforms.push(object);
                break;
            case "smoke":
                object = new createjs.Sprite(spritesheetSmoke, "normal");
                object.x = data.getAttribute("x");
                object.y = data.getAttribute("y");
                object.name = name;
                world.addChild(object);
                break;
        }
    };

    return LevelObject;

})();