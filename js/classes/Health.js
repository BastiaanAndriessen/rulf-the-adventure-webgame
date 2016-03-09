var Health = (function()
{
    var fillMeter, overlay;

    function Health()
    {
        this.x = 0;
        this.y = 0;
        this.width = world.userOptionsBarWidth;
        this.height = 204;

        this.healthValue = 100;
        this.maxHealth = 100;
        this.arrDamageLogs = [];

        this.backgroundMeter = new createjs.Shape();
        this.backgroundMeter.graphics.c();
        this.backgroundMeter.graphics.f("#f1eddc");
        this.backgroundMeter.graphics.dr(0, 0, this.width, 204);
        this.backgroundMeter.graphics.ef();
        this.backgroundMeter.x = this.x;
        this.backgroundMeter.y = this.y;
        stage.addChild(this.backgroundMeter);

        this.updateHealthValue();
    }

    Health.prototype.updateFallingDamage = function(fallingDistance)
    {
        var damage = Math.round((fallingDistance - minFallingDistanceForDamage) / 4);

        if(this.healthValue > damage)
        {
            this.healthValue -= damage;
            this.updateHealthValue();
        }
        else
        {
            stage.dispatchEvent("RESTART_LEVEL");
        }

        this.txtDamage = new createjs.Text("-" + damage, "15px NewRocker", "#ff0000");
        this.txtDamage.x = player.x + playerWidth / 2;
        this.txtDamage.y = player.y - 15;
        this.txtDamage.textAlign = "center";
        this.txtDamage.newY = -15;
        world.addChild(this.txtDamage);

        this.arrDamageLogs.push(this.txtDamage);
        sound.play("sFall");
    };

    Health.prototype.animateFallingDamage = function()
    {
        if(this.arrDamageLogs.length > 0)
        {
            for(var i = 0; i < this.arrDamageLogs.length; i++)
            {
                this.arrDamageLogs[i].newY -= 1.5;
                this.arrDamageLogs[i].alpha -= 0.02;
                this.arrDamageLogs[i].x = player.x + playerWidth / 2;
                this.arrDamageLogs[i].y = player.y + this.arrDamageLogs[i].newY;
                if(Math.ceil(this.arrDamageLogs[i].alpha) == 0) this.arrDamageLogs.shift();
            }
        }
    };

    Health.prototype.updateHealthValue = function()
    {
        if(fillMeter) stage.removeChild(fillMeter);
        if(overlay) stage.removeChild(overlay);

        fillMeter = new createjs.Shape();
        fillMeter.height = Math.floor((this.healthValue/(100/154))*100)/100;
        fillMeter.graphics.c();
        fillMeter.graphics.f("#7c050d");
        fillMeter.graphics.dr(0, 40, this.width, fillMeter.height);
        fillMeter.graphics.ef();
        fillMeter.x = this.x;
        fillMeter.y = 154 - fillMeter.height;
        stage.addChild(fillMeter);

        overlay = new createjs.Bitmap("img/health_meter.png");
        overlay.x = this.x;
        overlay.y = this.y;
        overlay.name = "health overlay";
        stage.addChild(overlay);
    };

    Health.prototype.setHealthValue = function(value)
    {
        this.healthValue += value;
        if(this.healthValue > this.maxHealth) this.healthValue = this.maxHealth;
        this.updateHealthValue();
    };

    return Health;

})();