var Bound = (function()
{

    function Bound(x, y, width, height, name, object)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;
        this.object = object;
    }

    return Bound;

})();