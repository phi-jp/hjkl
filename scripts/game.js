// シーンを定義
tm.define("GameScene", {
    superClass: "tm.app.Scene",
    
    init: function(param) {
        this.superInit();
        
        this.fromJSON({
            children: {
            	stage: {
            		type: "tm.display.CanvasElement",
            	},
                questionGroup: {
                    type: "tm.display.CanvasElement",
                },
            }
        });

        this.score = 0;
        this.questionMap = QUESTION_MAP_TABLE["arrow"];
        this.setLevel(param.level);
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

        // target
        var target = this.getTarget();
        if (target == null) return ;

        var key = app.keyboard;
        var code = this.questionMap[target.text];

        if (key.getKeyDown(code)) {
            this.addChild(target);
            target.disappear();
            this.score++;
        }
    },

    getTarget: function() {
        return this.questionGroup.children.first;
    },

    gameover: function() {
        var score = this.score;
        var rank = (function() {
            var rank = 0;

            if (score > 200) rank = 5;
            else if (score > 150) rank = 4;
            else if (score > 100) rank = 3;
            else if (score > 50) rank = 2;
            else if (score > 20) rank = 1;

            return [
                'vim って知ってる?',
                'vim 初心者',
                'vim 中級者',
                'vim 上級者',
                'vim 師匠',
                'vim 神様',
            ][rank]
        })();
        this.nextArguments = {
            score: this.score,
            message: "RANK:{rank} \n『hjkl』で vim 学ぼう!!".format({rank:rank}),
            hashtags: "tmlib,game,hjkl",
            url: window.location.href,
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
    superClass: "tm.display.CanvasElement",

    init: function(text) {
        this.superInit(text);
        this.speed = 1;

        this.bg = tm.display.RoundRectangleShape({
            width: 72,
            height: 72,
            fillStyle: "hsla(220, 70%, 60%, 1.0)",
        }).addChildTo(this);

        this.label = tm.display.Label(text).addChildTo(this);
        this.label.fontSize = 52;
        this.text = text;
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












