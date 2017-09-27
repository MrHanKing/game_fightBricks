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
        width:40,
        height:40,
    },

    // use this for initialization
    init: function (ball, game) {
        this.ball = ball;
        this.game = game;
    },

    update:function () {
        if(this.collection()) {
            console.log('球撞到砖块了,改变球速度且销毁砖块');
            this.ball.collectionSetSpeed();
            this.game.gainScore();
            this.node.destroy();
        };
    },

    collection:function () {
        var x1 = this.ball.node.x;
        var y1 = this.ball.node.y;
        var w1 = this.ball.node.width / 2;
        var h1 = this.ball.node.height / 2;
        var x2 = this.node.x;
        var y2 = this.node.y;
        var w2 = this.node.width / 2;
        var h2 = this.node.height / 2;

        if (Math.abs(x1 - x2) < w1 + w2 
            && Math.abs(y1 - y2) < h1 + h2){
                return true;
            }
        return false;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
