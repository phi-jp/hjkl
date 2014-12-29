/*
 * # tutorial - tmlib.js
 * tmlib.js のチュートリアルです.
 * http://phi-jp.github.io/tmlib.js/tutorial.html
 */

var SCREEN_WIDTH    = 640;              // スクリーン幅
var SCREEN_HEIGHT   = 960;              // スクリーン高さ
var SCREEN_CENTER_X = SCREEN_WIDTH/2;   // スクリーン幅の半分
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;  // スクリーン高さの半分
var SCREEN_CENTER   = tm.geom.Vector2(SCREEN_CENTER_X, SCREEN_CENTER_Y);
var SCREEN_RECT     = tm.geom.Rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
// TODO: mode に漢字(kanji), ひらがな(hiragana), 英語(english), 矢印(arrow)
var QUESTION_TABLE  = {
    '左': 'H',
    '下': 'J',
    '上': 'K',
    '右': 'L',
};

// main
tm.main(function() {
    // キャンバスアプリケーションを生成
    var app = tm.display.CanvasApp("#world");
    app.background = "black";
    // リサイズ
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
    // ウィンドウにフィットさせる
    app.fitWindow();

    // // ロード
    // var loading = tm.scene.LoadingScene({
    //     assets: {
    //         "bgm": "sounds/bgm.mp3",
    //     },
    // });
    // loading.onload = function() {
    //     // シーン切り替え
    //     app.replaceScene(ManagerScene());
    // };
    // app.replaceScene(loading);
    app.replaceScene(ManagerScene());

    // 実行
    app.run();
});

tm.define("ManagerScene", {
	superClass: "tm.scene.ManagerScene",

	init: function() {
		this.superInit({
            startLabel: "game",
			scenes: [
				{
					className: "tm.scene.TitleScene",
					arguments: {
						width: SCREEN_WIDTH,
						height: SCREEN_HEIGHT,
						title: "hjkl",
					},
					label: "title",
				},
				{
					className: "GameScene",
					label: "game",
					nextLabel: "title",
				}
			],
		});

        // tm.asset.Manager.get("bgm").clone().play();
	},

    onstart: function() {
        this.gotoScene("game");
    },
});

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
                questionLabel: {
                    type: "tm.display.Label",
                    text: "左",
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y,
                    fontSize: 64,
                }
            }
        });

        this.setQuestion();
    },

    setQuestion: function() {
        var question = Object.keys(QUESTION_TABLE).pickup();
        this.questionLabel.text = question;

        this.question = question;
    },

    update: function(app) {
        if (this.lock == true) return ;

        var key = app.keyboard;
        var code = QUESTION_TABLE[this.question];

        if (key.getKey(code)) {
            this.correct();
        }
    },

    correct: function() {
        this.lock = true;

        this.questionLabel.tweener
            .clear()
            .to({
                alpha: 0,
                scaleX: 2,
                scaleY: 2,
            }, 200)
            .call(function() {
                this.lock = false;
                this.questionLabel.alpha = 1;
                this.questionLabel.scale.set(1, 1);
                this.setQuestion();
            }, this);
    }
});

























