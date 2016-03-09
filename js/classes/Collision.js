var Collision = (function()
{

    function Collision(){}

    Collision.prototype.checkCollision = function(shapeA, shapeB)
    {
        var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2));
        var vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2));

        var hWidths = (shapeA.width / 2) + (shapeB.width / 2);
        var hHeights = (shapeA.height / 2) + (shapeB.height / 2);

        var colDir = "";

        if(Math.abs(vX) < hWidths && Math.abs(vY) < hHeights)
        {
            var oX = hWidths - Math.abs(vX);
            var oY = hHeights - Math.abs(vY);

            if(oX >= oY)
            {
                if(vY > 0)
                {
                    colDir = "t";
                    shapeA.y += oY;
                }
                else
                {
                    colDir = "b";
                    shapeA.y -= oY;
                }
            }
            else
            {
                if(vX > 0)
                {
                    colDir = "l";
                    shapeA.x += oX;
                }
                else
                {
                    colDir = "r";
                    shapeA.x -= oX;
                }
            }
        }

        return colDir;
    };

    Collision.prototype.climbCollision = function()
    {
        var climbCollisionObject = "";

        for(var y = 0; y < climbObjects.length; y++)
        {
            var minX = climbObjects[y].x;
            var maxX = climbObjects[y].x + climbObjects[y].width;
            var minY = climbObjects[y].y;
            var maxY = climbObjects[y].y + climbObjects[y].height;

            var currentX = player.x + Math.floor(playerWidth / 2);
            var currentY = player.y + Math.floor(playerHeight / 2);

            if(currentX > minX && currentX < maxX && currentY > minY && currentY < maxY)
            {
                climbCollisionObject = climbObjects[y].name;
            }
        }

        return climbCollisionObject;
    };

    return Collision;

})();