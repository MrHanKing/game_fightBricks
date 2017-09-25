var Levels = require('Level');

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
    },

    // called every frame
    update: function (dt) {

    },

    onBtnClick:function (event) {
        var node = event.target;
        var button = node.getComponent(cc.Button);
        var level = button.clickEvents[0].customEventData
        console.log('你选择了难度：',level);
        //保存难度
        Levels.gamelevel = level;
        cc.director.loadScene('game');
    }
});
