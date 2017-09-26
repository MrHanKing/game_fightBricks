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
        runSpeed:30,
        startX:0,
        startY:-200,
    },

    // use this for initialization
    onLoad: function () {
        this.speedX = this.runSpeed;
        this.speedY = this.runSpeed;
        this.node.x = this.startX;
        this.node.y = this.startY;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.refreshSpeedX();
        this.refreshSpeedY();
        this.node.x += this.speedX * dt;
        this.node.y += this.speedY * dt;
    },

    refreshSpeedX:function () {
        if (Math.abs(this.node.x) > cc.winSize.width / 2) {
            this.speedX = -this.speedX;
        }
    },

    refreshSpeedY:function () {
        if (Math.abs(this.node.y) > cc.winSize.height / 2) {
            this.speedY = -this.speedY;
        }
    },

    collectionSetSpeed:function () {
        this.speedY = -this.speedY;
    }
});
