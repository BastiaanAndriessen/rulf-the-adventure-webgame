var Menu = (function()
{
    var background, startLoadingGame, numImgLoaded, isParticlesParallaxActive, updateTicker, ticker, imgParticles, particles, imgCharacters, characters, imgTitle, title, imgBtnPlay, imgBtnPlayH, btnPlay, imgBtnControls, imgBtnControlsH, btnControls, movingOffset,
        arrParticleDimensions, arrParticles, imgParticle1, particle1, imgParticle2, particle2, imgParticle3, particle3, imgParticle4, particle4;

    function Menu()
    {
        this.x = 0;
        this.y = 0;

        stage.enableMouseOver(20);
        music = new Music("");
        music.loadMusic("main_song.mp3");

        updateTicker = createjs.Ticker;
        updateTicker.useRAF = true;
        updateTicker.setFPS(60);

        ticker = createjs.Ticker;
        ticker.useRAF = true;
        ticker.setFPS(60);

        numImgLoaded = 0;
        isParticlesParallaxActive = true;
        startLoadingGame = false;

        arrParticleDimensions = [[390,575],[115,305],[283,340],[165,425]];

        imgParticles = new Image();
        imgParticles.src = "img/menu_particles.png";

        imgCharacters = new Image();
        imgCharacters.src = "img/menu_characters.png";

        imgTitle = new Image();
        imgTitle.src = "img/menu_title.png";

        imgBtnPlay = new Image();
        imgBtnPlay.src = "img/menu_btnplay.png";

        imgBtnPlayH = new Image();
        imgBtnPlayH.src = "img/menu_btnplay_h.png";

        imgBtnControls = new Image();
        imgBtnControls.src = "img/menu_btncontrols.png";

        imgBtnControlsH = new Image();
        imgBtnControlsH.src = "img/menu_btncontrols_h.png";

        imgParticle1 = new Image();
        imgParticle1.src = "img/particles/particle1.png";

        imgParticle2 = new Image();
        imgParticle2.src = "img/particles/particle2.png";

        imgParticle3 = new Image();
        imgParticle3.src = "img/particles/particle3.png";

        imgParticle4 = new Image();
        imgParticle4.src = "img/particles/particle4.png";

        var imgBg = new Image();
        imgBg.src = "img/menu_bg.jpg";
        imgBg.onload = backgroundLoaded;
    }

    function backgroundLoaded(e)
    {
        var offsetX = e.target.width - stage.canvas.width;
        var offsetY = e.target.height - stage.canvas.height;
        if(offsetX < offsetY){
            movingOffset = offsetX;
        }else{
            movingOffset = offsetY;
        }

        var play = new Image();
        play.src = "img/menu_btnplay.png";
        play.name = "play";
        play.onload = imageLoaded;

        var control = new Image();
        control.src = "img/menu_btncontrols.png";
        control.name = "control";
        control.onload = imageLoaded;

        background = new createjs.Bitmap(e.target);
        background.x = this.x - movingOffset/2;
        background.y = this.y - movingOffset/2;
        background.name = 'background';
        stage.addChild(background);

        particles = new createjs.Bitmap(imgParticles);
        particles.x = (stage.canvas.width - imgParticles.width)/2;
        particles.y = -(imgParticles.height/2);
        stage.addChild(particles);

        characters = new createjs.Sprite(spritesheetMenu, "swordglow");
        characters.x = (stage.canvas.width - (imgCharacters.width/16))/2;
        characters.y = 0;
        characters.alpha = 0;
        stage.addChild(characters);

        var text = "Designed and developed by Jeroen Vanhaeverbeke and Bastiaan Andriessen for Devine (devine.be) © 2014";
        var footerText = new createjs.Text(text, "normal 9px Helvetica", "#ffffff");
        footerText.x = 55;
        footerText.y = stage.canvas.height - 15;
        stage.addChild(footerText);

        updateTicker.addEventListener("tick", updater);
    }

    function updater(){
        stage.update();
    }

    function imageLoaded(e)
    {
        switch(e.target.name)
        {
            case "play":
                btnPlay = new createjs.Bitmap(e.target);
                btnPlay.x = Math.floor((stage.canvas.width - imgBtnPlay.width)/2);
                btnPlay.y = Math.floor(stage.canvas.height*0.68);
                btnPlay.alpha = 0;
                stage.addChild(btnPlay);
                break;
            case "control":
                btnControls = new createjs.Bitmap(e.target);
                btnControls.x = (stage.canvas.width - imgBtnControls.width)/2;
                btnControls.y = stage.canvas.height*0.8;
                btnControls.alpha = 0;
                stage.addChild(btnControls);
                break;
        }
        numImgLoaded++;
        if(numImgLoaded == 2){
            title = new createjs.Bitmap(imgTitle);
            title.x = (stage.canvas.width - imgTitle.width)/2 - 10;
            title.y = characters.y + imgCharacters.height - 45;
            title.alpha = 0;
            stage.addChild(title);

            particle4 = new createjs.Bitmap(imgParticle4);
            particle4.name = "particle4";
            stage.addChild(particle4);

            particle2 = new createjs.Bitmap(imgParticle2);
            particle2.name = "particle2";
            stage.addChild(particle2);

            particle1 = new createjs.Bitmap(imgParticle1);
            particle1.name = "particle1";
            stage.addChild(particle1);

            particle3 = new createjs.Bitmap(imgParticle3);
            particle3.name = "particle3";
            stage.addChild(particle3);

            arrParticles = [particle4,particle2,particle1,particle3];

            for(var i = 0; i<arrParticles.length; i++){
                arrParticles[i].x = arrParticleDimensions[i][0];
                arrParticles[i].y = arrParticleDimensions[i][1];
                arrParticles[i].alpha = 0;
            }

            ticker.addEventListener("tick", gameLaunchFadeIn);
        }
    }

    function gameLaunchFadeIn(){
        if(characters.alpha < 1)characters.alpha += 0.05;
        if(characters.alpha < 1){
            title.alpha = characters.alpha - 0.2;
        }else{
            if(title.alpha < 1)title.alpha += 0.05;
        }
        if(title.alpha < 1){
            btnPlay.alpha = title.alpha - 0.2;
        }else{
            if(btnPlay.alpha < 1)btnPlay.alpha += 0.05;
        }
        if(btnPlay.alpha < 1){
            btnControls.alpha = btnPlay.alpha - 0.2;
        }else{
            if(btnControls.alpha < 1)btnControls.alpha += 0.05;
        }
        for(var i = 0; i<arrParticles.length; i++){
            if(btnControls.alpha < 1){
                arrParticles[i].alpha = btnControls.alpha - 0.1*(i+1);
            }else{
                if(arrParticles[i].alpha < 1)arrParticles[i].alpha += 0.05;
            }
            if(arrParticles[i] == arrParticles[arrParticles.length-1] && arrParticles[i].alpha >= 1){
                btnPlay.addEventListener("mouseover", hoverPlayButton);
                btnControls.addEventListener("mouseover", hoverControlsButton);
                ticker.removeEventListener("tick", gameLaunchFadeIn);
                $(document).mousemove(updateParallax);
            }
        }


    }

    function hoverPlayButton(e){
        $('body').css('cursor','pointer');
        sound.play("sHover");

        stage.removeChild(btnPlay);
        btnPlay = new createjs.Bitmap(imgBtnPlayH);
        btnPlay.x = Math.floor((stage.canvas.width - imgBtnPlay.width)/2);
        btnPlay.y = Math.floor(stage.canvas.height*0.68);
        btnPlay.addEventListener("click", startGame);
        stage.addChild(btnPlay);

        btnPlay.removeEventListener("mouseover", hoverPlayButton);
        btnPlay.addEventListener("mouseout", hoverOutPlayButton);
        reorderTopParticles();
    }

    function hoverOutPlayButton(e){
        $('body').css('cursor','default');
        sound.play("sHoverOut");

        stage.removeChild(btnPlay);
        btnPlay = new createjs.Bitmap(imgBtnPlay);
        btnPlay.x = Math.floor((stage.canvas.width - imgBtnPlay.width)/2);
        btnPlay.y = Math.floor(stage.canvas.height*0.68);
        stage.addChild(btnPlay);

        btnPlay.addEventListener("mouseover", hoverPlayButton);
        btnPlay.removeEventListener("mouseout", hoverOutPlayButton);
        reorderTopParticles();
    }

    function hoverControlsButton(e){
        $('body').css('cursor','pointer');
        sound.play("sHover");

        stage.removeChild(btnControls);
        btnControls = new createjs.Bitmap(imgBtnControlsH);
        btnControls.x = (stage.canvas.width - imgBtnControls.width)/2;
        btnControls.y = stage.canvas.height*0.8;
        btnControls.addEventListener("click", controlGame);
        stage.addChild(btnControls);

        btnControls.removeEventListener("mouseover", hoverControlsButton);
        btnControls.addEventListener("mouseout", hoverOutControlsButton);
        reorderTopParticles();
    }

    function hoverOutControlsButton(e){
        $('body').css('cursor','default');
        sound.play("sHoverOut");

        var xPos = btnControls.x;
        var yPos = btnControls.y;

        stage.removeChild(btnControls);
        btnControls = new createjs.Bitmap(imgBtnControls);
        btnControls.x = xPos;
        btnControls.y = yPos;
        stage.addChild(btnControls);

        btnControls.addEventListener("mouseover", hoverControlsButton);
        btnControls.removeEventListener("mouseout", hoverOutControlsButton);
        reorderTopParticles();
    }

    function reorderTopParticles(){
        for(var i = 0; i<arrParticles.length; i++){
            stage.setChildIndex(arrParticles[i], arrParticles[i].parent.getNumChildren()-1);
        }
    }

    function startGame(e)
    {
        music.stopMainSong();
        sound.play("sClick");
        btnPlay.removeAllEventListeners();
        btnControls.removeAllEventListeners();

        startLoadingGame = true;
        ticker.addEventListener("tick", fadeOut);
    }

    function controlGame(e)
    {
        sound.play("sClick");
        btnPlay.removeAllEventListeners();
        btnControls.removeAllEventListeners();
        ticker.addEventListener("tick", fadeOut);
        isParticlesParallaxActive = false;
        control.show();
    }

    function fadeOut(){
        characters.alpha -= 0.02;
        characters.y -= 13;
        btnPlay.alpha -= 0.02;
        btnPlay.y -= 13;
        btnControls.alpha -= 0.02;
        btnControls.y -= 13.5;
        particles.alpha -= 0.02;
        particles.y -= 16;
        title.alpha -= 0.02;
        title.y -= 15;
        for(var i = 0; i<arrParticles.length; i++){
            arrParticles[i].alpha = characters.alpha;
            arrParticles[i].y -= 20;
        }
        if(characters.y < -stage.canvas.height){
            hoverOutControlsButton(null);
            btnControls.removeAllEventListeners();
            ticker.removeEventListener("tick", fadeOut);
            if(startLoadingGame){
                updateTicker.removeEventListener("tick", updater);
                stage.dispatchEvent("START_GAME");
            }
        }

    }

    Menu.prototype.show = function()
    {
        ticker.addEventListener("tick", fadeIn);
    };

    function fadeIn(){
        characters.alpha += 0.02;
        characters.y += 13;
        btnPlay.alpha += 0.02;
        btnPlay.y += 13;
        btnControls.alpha += 0.02;
        btnControls.y += 13.5;
        particles.alpha += 0.02;
        particles.y += 16;
        title.alpha += 0.02;
        title.y += 15;
        for(var i = 0; i<arrParticles.length; i++){
            arrParticles[i].alpha = characters.alpha;
            arrParticles[i].y += 20;
        }
        if(characters.y == 0){
            isParticlesParallaxActive = true;
            btnPlay.addEventListener("mouseover", hoverPlayButton);
            btnControls.addEventListener("mouseover", hoverControlsButton);
            ticker.removeEventListener("tick", fadeIn);
        }
    }

    function updateParallax(e){
        var container = $('#container');
        var mouseX = e.pageX - container.position().left;
        var mouseY = e.pageY - container.position().top;
        if(mouseX >= 0 && mouseX <= stage.canvas.width && mouseY >= 0 && mouseY <= stage.canvas.height){
            var offsetMultiplier;
            if(mouseX < stage.canvas.width/2){
                offsetMultiplier = ((stage.canvas.width/2-mouseX)/(stage.canvas.width/2));
                background.x = - movingOffset/2 + (movingOffset/2)*offsetMultiplier;
                if(isParticlesParallaxActive){
                    particles.x = (stage.canvas.width - imgParticles.width)/2 + (imgParticles.width/40)*offsetMultiplier;
                    for(var i = 0; i<arrParticles.length; i++){
                        arrParticles[i].x = arrParticleDimensions[i][0] + (20+i*20)*offsetMultiplier;
                    }
                }
            }else{
                offsetMultiplier = ((mouseX-stage.canvas.width/2)/(stage.canvas.width/2));
                background.x = - movingOffset/2 - (movingOffset/2)*offsetMultiplier;
                if(isParticlesParallaxActive){
                    particles.x = (stage.canvas.width - imgParticles.width)/2 - (imgParticles.width/40)*offsetMultiplier;
                    for(var j = 0; j<arrParticles.length; j++){
                        arrParticles[j].x = arrParticleDimensions[j][0] - (20+j*20)*offsetMultiplier;
                    }
                }
            }

            if(mouseY < stage.canvas.height/2){
                offsetMultiplier = ((stage.canvas.height/2-mouseY)/(stage.canvas.height/2));
                background.y = - movingOffset/2 + (movingOffset/2)*offsetMultiplier;
                if(isParticlesParallaxActive){
                    particles.y = -(imgParticles.height/2) + (imgParticles.height/15)*offsetMultiplier;
                    for(var k = 0; k<arrParticles.length; k++){
                        arrParticles[k].y = arrParticleDimensions[k][1] + (10+k*20)*offsetMultiplier;
                    }
                }
            }else{
                offsetMultiplier = ((mouseY-stage.canvas.height/2)/(stage.canvas.height/2));
                background.y = - movingOffset/2 - (movingOffset/2)*offsetMultiplier;
                if(isParticlesParallaxActive){
                    particles.y = -(imgParticles.height/2) - (imgParticles.height/15)*offsetMultiplier;
                    for(var l = 0; l<arrParticles.length; l++){
                        arrParticles[l].y = arrParticleDimensions[l][1] - (10+l*20)*offsetMultiplier;
                    }
                }
            }
        }
    }

    return Menu;

})();