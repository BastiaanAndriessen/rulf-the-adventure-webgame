var spritesheetBig, spritesheetBigRight, spritesheetBigLeft, spritesheetBigBack,
    spritesheetNormal, spritesheetNormalRight, spritesheetNormalLeft, spritesheetNormalBack,
    spritesheetMedium, spritesheetMediumRight, spritesheetMediumLeft, spritesheetMediumBack,
    spritesheetSmall, spritesheetSmallRight, spritesheetSmallLeft, spritesheetSmallBack,
    spritesheetJumper, spritesheetSmoke, spritesheetLoading, spritesheetMenu;

var Spritesheet = (function()
{

    function Spritesheet()
    {
        //loading spritesheet
        var sheetLoading =
        {
            images: ["img/loading_spritesheet.png"],
            frames: {width: 15, height: 15, count: 33},
            animations:
            {   normal: {
                    frames:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
                            27, 28, 29, 30, 31, 32],
                    next: "normal",
                    speed: 0.8
                }
            }
        };

        //menu spritesheet
        var sheetMenu =
        {
            images: ["img/menu_characters.png"],
            frames: {width: 272, height: 437, count: 16},
            animations:
            {
                swordglow: {
                    frames:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2,
                        3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7, 8, 9, 10, 10, 11, 11, 11, 12, 12,
                        12, 12, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15],
                    next: "swordglow",
                    speed: 3
                }
            }
        };

        //player spritesheets
        var sheetBig =
        {
            images: ["img/player_big.png"],
            frames: {width: 75, height: 125, count: 8},
            animations:
            {walk: {
                frames:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    1,2,3,4,5,6,7,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                next: "walk",
                speed: 0.5
            }
            }
        };

        var sheetBigRight =
        {
            images: ["img/player_big_r.png"],
            frames: {width: 38, height: 125, count: 27},
            animations:
            {   startwalk: {
                frames:[0,1,2,3,4,5,6,7],
                next: "left",
                speed: 0.6
            },
                left: {
                    frames:[8,9,10,11,12,13,14,15,16,17],
                    next: "right",
                    speed: 0.6
                },
                right: {
                    frames:[18,19,20,21,22,23,24,25,26],
                    next: "left",
                    speed: 0.6
                }
            }
        };

        var sheetBigLeft =
        {
            images: ["img/player_big_l.png"],
            frames: {width: 38, height: 125, count: 27},
            animations:
            {   startwalk: {
                frames:[0,1,2,3,4,5,6,7],
                next: "left",
                speed: 0.6
            },
                left: {
                    frames:[8,9,10,11,12,13,14,15,16,17],
                    next: "right",
                    speed: 0.6
                },
                right: {
                    frames:[18,19,20,21,22,23,24,25,26],
                    next: "left",
                    speed: 0.6
                }
            }
        };

        var sheetBigBack =
        {
            images: ["img/player_big_b.png"],
            frames: {width: 38, height: 125, count: 22},
            animations: {
                climbRope: 1,
                startClimbLadder:{
                    frames:[0,2,3,4,5,6,7,8],
                    next: "climbLadderLeft",
                    speed: 0.6
                },
                climbLadderLeft:{
                    frames:[9,10,11,12,13,14],
                    next: "climbLadderRight",
                    speed: 0.6
                },
                climbLadderRight:{
                    frames:[15,16,17,18,19,20,21],
                    next: "climbLadderLeft",
                    speed: 0.6
                }
            }
        };

        var sheetNormal =
        {
            images: ["img/player_normal.png"],
            frames: {width: 50, height: 83, count: 8},
            animations:
             {walk: {
                 frames:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                         1,2,3,4,5,6,7,
                         0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                         0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                 next: "walk",
                 speed: 0.5
             }
            }
        };

        var sheetNormalRight =
        {
            images: ["img/player_normal_r.png"],
            frames: {width: 25.222, height: 83, count: 27},
            animations:
            {   startwalk: {
                    frames:[0,1,2,3,4,5,6,7],
                    next: "left",
                    speed: 0.6
                },
                left: {
                    frames:[8,9,10,11,12,13,14,15,16,17],
                    next: "right",
                    speed: 0.6
                },
                right: {
                    frames:[18,19,20,21,22,23,24,25,26],
                    next: "left",
                    speed: 0.6
                }
            }
        };

        var sheetNormalLeft =
        {
            images: ["img/player_normal_l.png"],
            frames: {width: 25.222, height: 83, count: 27},
            animations:
            {   startwalk: {
                frames:[0,1,2,3,4,5,6,7],
                next: "left",
                speed: 0.6
                },
                left: {
                    frames:[8,9,10,11,12,13,14,15,16,17],
                    next: "right",
                    speed: 0.6
                },
                right: {
                    frames:[18,19,20,21,22,23,24,25,26],
                    next: "left",
                    speed: 0.6
                }
            }
        };

        var sheetNormalBack =
        {
            images: ["img/player_normal_b.png"],
            frames: {width: 50, height: 83, count: 22},
            animations: {
                climbRope: 1,
                startClimbLadder:{
                    frames:[0,2,3,4,5,6,7,8],
                    next: "climbLadderLeft",
                    speed: 0.6
                },
                climbLadderLeft:{
                    frames:[9,10,11,12,13,14],
                    next: "climbLadderRight",
                    speed: 0.6
                },
                climbLadderRight:{
                    frames:[15,16,17,18,19,20,21],
                    next: "climbLadderLeft",
                    speed: 0.6
                }
            }
        };

        var sheetMedium =
        {
            images: ["img/player_medium.png"],
            frames: {width: 35, height: 58, count: 8},
            animations:
            {walk: {
                frames:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    1,2,3,4,5,6,7,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                next: "walk",
                speed: 0.5
            }
            }
        };

        var sheetMediumRight =
        {
            images: ["img/player_medium_r.png"],
            frames: {width: 17.655, height: 58, count: 27},
            animations:
            {   startwalk: {
                frames:[0,1,2,3,4,5,6,7],
                next: "left",
                speed: 0.6
            },
                left: {
                    frames:[8,9,10,11,12,13,14,15,16,17],
                    next: "right",
                    speed: 0.6
                },
                right: {
                    frames:[18,19,20,21,22,23,24,25,26],
                    next: "left",
                    speed: 0.6
                }
            }
        };

        var sheetMediumLeft =
        {
            images: ["img/player_medium_l.png"],
            frames: {width: 17.655, height: 58, count: 27},
            animations:
            {   startwalk: {
                frames:[0,1,2,3,4,5,6,7],
                next: "left",
                speed: 0.6
            },
                left: {
                    frames:[8,9,10,11,12,13,14,15,16,17],
                    next: "right",
                    speed: 0.6
                },
                right: {
                    frames:[18,19,20,21,22,23,24,25,26],
                    next: "left",
                    speed: 0.6
                }
            }
        };

        var sheetMediumBack =
        {
            images: ["img/player_medium_b.png"],
            frames: {width: 35, height: 58, count: 22},
            animations: {
                climbRope: 1,
                startClimbLadder:{
                    frames:[0,2,3,4,5,6,7,8],
                    next: "climbLadderLeft",
                    speed: 0.6
                },
                climbLadderLeft:{
                    frames:[9,10,11,12,13,14],
                    next: "climbLadderRight",
                    speed: 0.6
                },
                climbLadderRight:{
                    frames:[15,16,17,18,19,20,21],
                    next: "climbLadderLeft",
                    speed: 0.6
                }
            }
        };

        var sheetSmall =
        {
            images: ["img/player_small.png"],
            frames: {width: 20, height: 33, count: 8},
            animations:
            {walk: {
                frames:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    1,2,3,4,5,6,7,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                next: "walk",
                speed: 0.5
            }
            }
        };

        var sheetSmallRight =
        {
            images: ["img/player_small_r.png"],
            frames: {width: 10.088, height: 33, count: 27},
            animations:
            {   startwalk: {
                frames:[0,1,2,3,4,5,6,7],
                next: "left",
                speed: 0.6
            },
                left: {
                    frames:[8,9,10,11,12,13,14,15,16,17],
                    next: "right",
                    speed: 0.6
                },
                right: {
                    frames:[18,19,20,21,22,23,24,25,26],
                    next: "left",
                    speed: 0.6
                }
            }
        };

        var sheetSmallLeft =
        {
            images: ["img/player_small_l.png"],
            frames: {width: 10.088, height: 33, count: 27},
            animations:
            {   startwalk: {
                frames:[0,1,2,3,4,5,6,7],
                next: "left",
                speed: 0.6
            },
                left: {
                    frames:[8,9,10,11,12,13,14,15,16,17],
                    next: "right",
                    speed: 0.6
                },
                right: {
                    frames:[18,19,20,21,22,23,24,25,26],
                    next: "left",
                    speed: 0.6
                }
            }
        };

        var sheetSmallBack =
        {
            images: ["img/player_small_b.png"],
            frames: {width: 20, height: 33, count: 22},
            animations: {
                climbRope: 1,
                startClimbLadder:{
                    frames:[0,2,3,4,5,6,7,8],
                    next: "climbLadderLeft",
                    speed: 0.6
                },
                climbLadderLeft:{
                    frames:[9,10,11,12,13,14],
                    next: "climbLadderRight",
                    speed: 0.6
                },
                climbLadderRight:{
                    frames:[15,16,17,18,19,20,21],
                    next: "climbLadderLeft",
                    speed: 0.6
                }
            }
        };

        //object spritesheets
        var sheetJumper =
        {
            images: ["img/jumper_spritesheet.png"],
            frames: {width: 75, height: 34, count: 11},
            animations:{normal: [0], down: [0, 3, "up"], up: [4, 10, "normal"]}
        };

        var sheetSmoke =
        {
            images: ["img/smoke_spritesheet.png"],
            frames: {width: 225, height: 310, count: 100},
            animations:{normal: [0, 100, "normal"]}
        };

        spritesheetBig = new createjs.SpriteSheet(sheetBig);
        spritesheetBigRight = new createjs.SpriteSheet(sheetBigRight);
        spritesheetBigLeft = new createjs.SpriteSheet(sheetBigLeft);
        spritesheetBigBack = new createjs.SpriteSheet(sheetBigBack);

        spritesheetNormal = new createjs.SpriteSheet(sheetNormal);
        spritesheetNormalRight = new createjs.SpriteSheet(sheetNormalRight);
        spritesheetNormalLeft = new createjs.SpriteSheet(sheetNormalLeft);
        spritesheetNormalBack = new createjs.SpriteSheet(sheetNormalBack);

        spritesheetMedium = new createjs.SpriteSheet(sheetMedium);
        spritesheetMediumRight = new createjs.SpriteSheet(sheetMediumRight);
        spritesheetMediumLeft = new createjs.SpriteSheet(sheetMediumLeft);
        spritesheetMediumBack = new createjs.SpriteSheet(sheetMediumBack);

        spritesheetSmall = new createjs.SpriteSheet(sheetSmall);
        spritesheetSmallRight = new createjs.SpriteSheet(sheetSmallRight);
        spritesheetSmallLeft = new createjs.SpriteSheet(sheetSmallLeft);
        spritesheetSmallBack = new createjs.SpriteSheet(sheetSmallBack);

        spritesheetJumper = new createjs.SpriteSheet(sheetJumper);
        spritesheetSmoke = new createjs.SpriteSheet(sheetSmoke);
        spritesheetLoading = new createjs.SpriteSheet(sheetLoading);
        spritesheetMenu = new createjs.SpriteSheet(sheetMenu);
    }

    return Spritesheet;

})();