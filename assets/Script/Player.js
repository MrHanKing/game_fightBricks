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
    onLoad:function () {
        this.speedX = 0;
        this.isLeft = false;
        this.isRight = false;

        //启动监听事件
        this.setInputControl();
    },

    update:function (dt) {
        this.refreshSpeedX();
        this.node.x += this.speedX * dt;
        this.setXInScene(this.node.x);
        // console.log('木板的位置',this.node.x);
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
