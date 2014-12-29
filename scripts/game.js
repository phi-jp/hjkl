// シーンを定義
tm.define("GameScene", {
    superClass: "tm.app.Scene",
    
    init: function() {
        this.superInit();
        
        this.fromJSON({
            children: {
            	stage: {
            		type: "tm.display.CanvasElement",
            	},
                questionGroup: {
                    type: "tm.display.CanvasElement",
                }
            }
        });

        this.score = 0;
        this.questionMap = QUESTION_MAP_TABLE["arrow"];
        this.setLevel(0);
    },

    onenter: function(e) {
        e.app.frame = 0;
    },

    createQuestion: function() {
        var question = Object.keys(this.questionMap).pickup();
        var questionLabel = QuestionLabel(question);
        questionLabel.setPosition(SCREEN_CENTER_X, -50);
        questionLabel.speed = this.levelMap.speed;

        questionLabel.onoutside = function() {
            this.gameover();
        }.bind(this);

        this.questionGroup.addChild(questionLabel);
    },

    update: function(app) {
        // check level up
        if (this.isMaxLevel() == false && app.frame > this.levelMap.frame) {
            // check question
            if (this.questionGroup.children.length <= 0) {
                this.levelUp();
                this.app.frame = 0;
            }
        }
        // create question
        else {
            if (app.frame%this.levelMap.interval == 0) {
                this.createQuestion();
            }
        }


        if (this.lock == true) return ;

        var target = this.questionGroup.children.first;
        if (target == null) return ;

        var key = app.keyboard;
        var code = this.questionMap[target.text];
        if (key.getKey(code)) {
            tm.asset.Manager.get("type").clone().play();
            
            this.lock = true;
            target.disappear();
            target.ondisappeared = function() {
                this.lock = false;
            }.bind(this);

            this.score++;
        }
    },

    gameover: function() {
        this.nextArguments = {
            score: this.score,
        };
        this.app.popScene();
        openAd();
    },

    setLevel: function(level) {
        this.level = level;
        this.levelMap = LEVEL_MAP_TABLE[this.level];
        return this;
    },

    levelUp: function() {
        this.setLevel(this.level+1);
        return this;
    },

    isMaxLevel: function() {
        return LEVEL_MAP_TABLE[this.level+1] == null;
    },
});


tm.define("QuestionLabel", {
    superClass: "tm.display.Label",

    init: function(text) {
        this.superInit(text);
        this.fontSize = 64;
        this.speed = 1;
    },

    update: function() {
        this.y += this.speed;

        if (this.y > SCREEN_HEIGHT + 30) {
            this.flare("outside");
        }
    },

    disappear: function() {
        this.tweener
            .clear()
            .to({
                alpha: 0,
                scaleX: 2,
                scaleY: 2,
            }, 200)
            .call(function() {
                this.remove();
                this.flare("disappeared");
            }, this);

    },
});












