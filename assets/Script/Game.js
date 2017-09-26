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
    },

    // use this for initialization
    onLoad: function () {
        this.level = Levels.gamelevel;
        console.log("game 获得游戏等级：", this.level);
        //初始化操纵木板，传入球的信息
        this.player.init(this.ball);

        //生成砖块
        this.spawnBricks(this.level);
    },

    spawnBricks:function (level) {
        console.log('准备生成砖块');
        var num = 20;//每个等级造的砖块数
        var x = -cc.winSize.width / 2;
        var y = cc.winSize.height / 2;
        for (var index = 0; index < level * num; index++) {
            if (x + Brick.width > cc.winSize.width / 2) {
                x = -cc.winSize.width / 2;
                y = y - Brick.height;
            } else {
                x += Brick.width; 
            }
            this.oneBrick(x,y);
        }
    },

    oneBrick:function (x, y) {
        console.log('生成一个砖块');
        //生成Brick组件所在的节点。试试节点颜色、不然用node挂sprite 改颜色
        var brick = new cc.Node;
        brick.setPosition(x, y);
        brick.setContentSize(cc.size(40,40));
        brick.color = new cc.Color(0, 150, 0);
        brick.addComponent(Brick).init(this.ball);

        brick.parent = this.node;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
