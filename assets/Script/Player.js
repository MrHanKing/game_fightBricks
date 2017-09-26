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
        speedXValue:0,
    },

    // use this for initialization
    init:function (ball) {
        this.speedX = 0;
        this.isLeft = false;
        this.isRight = false;
        this.ball = ball;
        //启动监听事件
        this.setInputControl();
    },

    update:function (dt) {
        //更新木板位置
        this.refreshSpeedX();
        this.node.x += this.speedX * dt;
        this.setXInScene(this.node.x);
        // console.log('木板的位置',this.node.x);
        if (this.collection()) {
            console.log('发生碰撞');
            this.ball.collectionSetSpeed();
        }
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
    },

    setXInScene:function (posX) {
        if (posX > cc.winSize.width / 2 - this.node.width / 2) {
            this.node.x = cc.winSize.width / 2 - this.node.width / 2;
        }
        else if (posX < -cc.winSize.width / 2 + this.node.width / 2) {
            this.node.x = -cc.winSize.width / 2 + this.node.width / 2;
        }
    },
    // 刷新移动速度
    refreshSpeedX:function () {
        if (this.isLeft) {
            this.speedX = -this.speedXValue;
        }
        else if (this.isRight) {
            this.speedX = this.speedXValue;
        }
        else {
            this.speedX = 0;
        }
    },

    setInputControl:function () {
        // body...
        var self = this;
        cc.eventManager.addListener({
            event:cc.EventListener.KEYBOARD,
            onKeyPressed:function (keyCode, event) {
                // console.log('事件启动');
                switch (keyCode) {
                    case cc.KEY.a:
                        self.isLeft = true;
                        self.isRight = false;
                        break;
                    case cc.KEY.d:
                        self.isLeft = false;
                        self.isRight = true;
                        break;
                }
            },
            onKeyReleased:function (keyCode, event) {
                // console.log('事件chufa');
                switch (keyCode) {
                    case cc.KEY.a:
                        self.isLeft = false;
                        break;
                    case cc.KEY.d:
                        self.isRight = false;
                        break;
                }
            },
        }, this.node)
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
