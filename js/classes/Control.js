var Control = (function()
{
    var container, ticker, imgControls, imgBtnMenu, imgBtnMenuH, btnMenu;

    function Control()
    {
        ticker = createjs.Ticker;
        ticker.useRAF = true;
        ticker.setFPS(60);

        imgControls = new createjs.Bitmap("img/menu_controls.png");
        imgControls.alpha = 0;
        imgControls.x = 0;
        imgControls.y = stage.canvas.height;

        imgBtnMenu = new Image();
        imgBtnMenu.src = "img/menu_btnmenu.png";

        imgBtnMenuH = new Image();
        imgBtnMenuH.src = "img/menu_btnmenu_h.png";

        btnMenu = new createjs.Bitmap(imgBtnMenu);
        btnMenu.alpha = 0;
        btnMenu.x = 83;
        btnMenu.y = stage.canvas.height + 85;

        container = new createjs.Container();
        container.addChild(imgControls);
        container.addChild(btnMenu);
    }

    Control.prototype.show = function()
    {
        stage.addChild(container);
        imgControls.alpha = 0;
        imgControls.y = stage.canvas.height;
        btnMenu.alpha = 0;
        btnMenu.y = imgControls.y + 85;
        startFadeIn();
        stage.update();
    };

    function startFadeIn(){
        hoverOutBtnMenu(null);
        ticker.addEventListener("tick", fadeIn);
    }

    function fadeIn(){
        imgControls.alpha += 0.02;
        imgControls.y -= 13;
        btnMenu.y = imgControls.y + 85;
        btnMenu.alpha += 0.02;
        if(imgControls.alpha >= 1 && imgControls.y < 13){
            imgControls.y = 0;
            btnMenu.y = 85;
            btnMenu.addEventListener('mouseover', hoverBtnMenu);
            ticker.removeEventListener("tick", fadeIn);
        }
        stage.update();
    }

    function hoverBtnMenu(e){
        $('body').css('cursor','pointer');
        sound.play("sHover");

        container.removeChild(btnMenu);
        btnMenu = new createjs.Bitmap(imgBtnMenuH);
        btnMenu.x = 83;
        btnMenu.y = 85;
        btnMenu.addEventListener("click", startFadeOut);
        container.addChild(btnMenu);

        btnMenu.removeEventListener("mouseover", hoverBtnMenu);
        btnMenu.addEventListener("mouseout", hoverOutBtnMenu);
        stage.update();
    }

    function hoverOutBtnMenu(e){
        $('body').css('cursor','default');
        sound.play("sHoverOut");

        container.removeChild(btnMenu);
        btnMenu = new createjs.Bitmap(imgBtnMenu);
        btnMenu.x = 83;
        btnMenu.y = 85;
        container.addChild(btnMenu);

        btnMenu.addEventListener("mouseover", hoverBtnMenu);
        btnMenu.removeEventListener("mouseout", hoverOutBtnMenu);
        stage.update();
    }

    function startFadeOut()
    {
        sound.play("sClick");
        menu.show();
        btnMenu.removeAllEventListeners();
        ticker.addEventListener("tick", fadeOut);
    }

    function fadeOut(){
        imgControls.alpha -= 0.02;
        imgControls.y += 13;
        btnMenu.y = imgControls.y + 85;
        btnMenu.alpha -= 0.02;
        if(imgControls.y >= stage.canvas.height){
            imgControls.y = stage.canvas.height;
            btnMenu.y = stage.canvas.height + 85;
            ticker.removeEventListener("tick", fadeOut);
            stage.removeChild(container);
        }
        stage.update();
    }

    return Control;

})();