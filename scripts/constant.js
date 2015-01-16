/*
 * constant.js
 */


var SCREEN_WIDTH    = 640;              // スクリーン幅
var SCREEN_HEIGHT   = 960;              // スクリーン高さ
var SCREEN_CENTER_X = SCREEN_WIDTH/2;   // スクリーン幅の半分
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;  // スクリーン高さの半分
var SCREEN_CENTER   = tm.geom.Vector2(SCREEN_CENTER_X, SCREEN_CENTER_Y);
var SCREEN_RECT     = tm.geom.Rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

var QUESTION_MAP_TABLE = {
	"kanji": {
	    '左': 'H',
	    '下': 'J',
	    '上': 'K',
	    '右': 'L',
	},
	"hiragana": {
	    'ひだり': 'H',
	    'した': 'J',
	    'うえ': 'K',
	    'みぎ': 'L',
	},
	"english": {
	    'left': 'H',
	    'down': 'J',
	    'up': 'K',
	    'right': 'L',
	},
	"arrow": {
	    '←': 'H',
	    '↓': 'J',
	    '↑': 'K',
	    '→': 'L',
	},
};

var LEVEL_MAP_TABLE = [
    {
        interval: 30,
        speed: 3,
        frame: 300,
    },
    {
        interval: 30,
        speed: 4,
        frame: 300,
    },
    {
        interval: 15,
        speed: 5,
        frame: 300,
    },
    {
        interval: 15,
        speed: 6,
        frame: 300,
    },
    {
        interval: 10,
        speed: 7,
        frame: 300,
    },
];
var QUERY = tm.util.QueryString.parse(location.search.substr(1));
QUERY.$safe({
    "scene": "title",
    "level": 0,
});

var openAd = function() {
    tm.dom.Element("#ad").classList.remove("close")
};

var closeAd = function() {
    tm.dom.Element("#ad").classList.add("close")
};

var ASSETS = {
    "type": "sounds/type1.mp3",
};



