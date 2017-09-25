var Levels = require('Level');
var Player = require('Player');
var Ball = require('Ball')

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

    },

    spawnbricks:function (level) {
        // body...
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
