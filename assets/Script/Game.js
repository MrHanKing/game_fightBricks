var Levels = require('Level');
var Player = require('Player');
var Ball = require('Ball');
var Brick = require('Brick');

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        player:{
            default:null,
            type:Player,
        },
        ball:{
            default:null,
            type:Ball,
        },
        brick:{
            default:null,
            type:cc.Prefab,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.level = Levels.gamelevel;
        console.log("game 获得游戏等级：", this.level);
        //初始化操纵木板，传入球的信息
        this.player.init(this.ball);

        //生成砖块
        this.spawnBricks(this.level);

        //生成计分label
        this.score = 0;
        this.label = new cc.Node;
        this.label.addComponent(cc.Label);
        this.label.setPosition(-200,0);
        this.label.parent = this.node;
        this.refreshScore();
    },

    spawnBricks:function (level) {
        console.log('准备生成砖块');
        var num = 20;//每个等级造的砖块数
        var x = -cc.winSize.width / 2;
        var y = cc.winSize.height / 2 - 50;
        var brickW = 40;
        var brickH = 40;
        // console.log('*****', Brick.height, Brick.width);
        for (var index = 0; index < level * num; index++) {
            if (x + brickW > cc.winSize.width / 2) {
                x = -cc.winSize.width / 2;
                y = y - brickH;
            } else {
                x += brickW + 20;
            }
            console.log('开始制造x：' + x + 'y:' + y);
            this.oneBrick(x,y);
        }
    },

    oneBrick:function (x, y) {
        console.log('生成一个砖块');
        //生成brickPrefab的实例节点。
        var brick = cc.instantiate(this.brick);
        brick.getComponent('Brick').init(this.ball, this);
        brick.setPosition(x, y);
        brick.parent = this.node;
    },

    gainScore:function (score = 1) {
        this.score += score;
        this.refreshScore();
    },

    refreshScore:function () {
        this.label.getComponent(cc.Label).string = '您的得分：' + this.score;
    },

    gameOver:function () {
        this.label.getComponent(cc.Label).string = '您的得分是：' + this.score + '\n 游戏结束,5秒后返回游戏主界面';
        this.ball.enabled = false;
        cc.director.getScheduler().schedule(function () {
            cc.director.loadScene('menu');
        }, this, 0, 5, true);
    },

    onExit:function() {
        this.node.destroy();
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.ball.node.y - this.ball.node.height / 2 < this.player.node.y) {
            this.gameOver();
        }
    },
});
