var Inventory = (function()
{
    var inventoryBg, background;

    function Inventory()
    {
        this.arrObjects = [];

        this.x = 0;
        this.y = helium.y + helium.height;
        this.width = world.userOptionsBarWidth;
        this.height = 345;
        this.maxItems = 5;

        background = new createjs.Shape();
        background.graphics.c();
        background.graphics.f("#f1eddc");
        background.graphics.dr(0, 0, this.width, this.height - 30);
        background.graphics.ef();
        background.x = this.x;
        background.y = this.y;
        stage.addChild(background);

        inventoryBg = new createjs.Bitmap("img/inventory_bg.png");
        inventoryBg.x = this.x;
        inventoryBg.y = this.y;
        inventoryBg.name = "inventory overlay";
        stage.addChild(inventoryBg);
    }

    Inventory.prototype.updateInventoryList = function(objectToAdd)
    {
        var self = this;
        $.each(items, function(key, val)
        {
            $.each(val, function(key, val)
            {
                if(val.filename == objectToAdd){
                    var image = new Image();
                    $(image).load(function()
                    {
                        var sprite = new createjs.Shape();
                        sprite.graphics.beginBitmapFill(image).drawRect(val.frame.x, val.frame.y, val.frame.w, val.frame.h);

                        var object = sprite;
                        object.x = self.x + 8 - val.frame.x;
                        object.y = self.y + 59 + self.arrObjects.length*(25+6);
                        object.width = val.frame.w;
                        object.height = val.frame.h;
                        object.name = objectToAdd;
                        object.amount = 1;

                        var inArray = false;
                        for(var i=0; i<self.arrObjects.length; i++){
                            if(self.arrObjects[i].name == objectToAdd){
                                inArray = true;
                                self.arrObjects[i].amount++;
                                var amount = self.arrObjects[i].amount;
                                if(amount == 2){

                                    var x = self.arrObjects[i].x + 45;
                                    var y = self.arrObjects[i].y - 5;

                                    var circle = new createjs.Shape();
                                    circle.graphics.c();
                                    circle.graphics.f("#FFF");
                                    circle.graphics.dc(0,0,7);
                                    circle.graphics.ef();
                                    circle.x = x;
                                    circle.y = y + 5;
                                    self.arrObjects[i].circle = circle;
                                    stage.addChild(circle);

                                    var label = new createjs.Text(amount, "10px Arial", "black");
                                    label.textAlign = "center";
                                    label.x = x;
                                    label.y = y;
                                    label.maxWidth=20;
                                    self.arrObjects[i].label = label;
                                    stage.addChild(label);
                                } else if(amount > 2){
                                    self.arrObjects[i].label.text = amount;
                                }
                            }
                        }

                        if(!inArray){
                            self.arrObjects.push(object);
                            stage.addChild(sprite);

                            stage.removeChild(inventoryBg);
                            inventoryBg = new createjs.Bitmap("img/inventory_bg.png");
                            inventoryBg.x = self.x;
                            inventoryBg.y = self.y;
                            inventoryBg.name = "inventory overlay";
                            stage.addChild(inventoryBg);
                        }
                    }).attr("src", "img/items.jpg");
                }
            });
        });
    };

    return Inventory;

})();