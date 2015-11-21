var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Wakey;
(function (Wakey) {
    (function (MainViewType) {
        MainViewType[MainViewType["NONE"] = 0] = "NONE";
        MainViewType[MainViewType["SPLASH"] = 1] = "SPLASH";
        MainViewType[MainViewType["MENU"] = 2] = "MENU";
    })(Wakey.MainViewType || (Wakey.MainViewType = {}));
    var MainViewType = Wakey.MainViewType;
    var BaseView = (function (_super) {
        __extends(BaseView, _super);
        function BaseView() {
            _super.apply(this, arguments);
            this.bDebug = false;
            this.bRendered = false;
        }
        BaseView.prototype.render = function (args) {
            this.bRendered = true;
        };
        BaseView.prototype.update = function (args) {
            if (this.bRendered) {
                this.render();
                return;
            }
        };
        BaseView.prototype.getIsRendered = function () {
            return this.bRendered;
        };
        BaseView.setElement = function (options) {
            this.setElement(options.el);
        };
        BaseView.prototype.getWidth = function () {
            return this.$el.innerWidth();
        };
        BaseView.prototype.getHeight = function () {
            return this.$el.innerHeight();
        };
        return BaseView;
    })(Backbone.View);
    Wakey.BaseView = BaseView;
    var View = (function (_super) {
        __extends(View, _super);
        function View(options) {
            var _this = this;
            _super.call(this, options);
            this.viewType = 0 /* NONE */;
            this.toggleMenu = function () {
                var self = _this;
                self.bMenuOpen = !self.bMenuOpen;
                var framewidth = 80;
                if (self.bMenuOpen) {
                    self.fvBackground.animate({
                        x: -self.getWidth(),
                        y: 0,
                        width: self.getWidth(),
                        height: self.getHeight(),
                        margin: 0,
                        padding: 8,
                        direction: Wakey.Direction.NONE,
                        bordercolor: "#2c3e50",
                        backcolor: "#bdc3c7",
                        fontcolor: "#bdc3c7"
                    }, 250);
                    self.btnStart.setDirection(Wakey.Direction.DOWN);
                    self.btnMenu1.animate({
                        x: self.getWidth() - framewidth - 16,
                        y: 16 * 3 + framewidth,
                        width: framewidth,
                        height: framewidth,
                        margin: 12,
                        padding: 6,
                        direction: Wakey.Direction.ALL,
                        bordercolor: "#bdc3c7",
                        backcolor: "#2c3e50",
                        fontcolor: "#bdc3c7"
                    }, 250);
                    self.btnMenu2.animate({
                        x: self.getWidth() - framewidth - 16,
                        y: 16 * 4 + framewidth * 2,
                        width: framewidth,
                        height: framewidth,
                        margin: 12,
                        padding: 6,
                        direction: Wakey.Direction.NONE,
                        bordercolor: "#bdc3c7",
                        backcolor: "#2c3e50",
                        fontcolor: "#bdc3c7"
                    }, 250);
                    self.btnMenu3.animate({
                        x: self.getWidth() - framewidth - 16,
                        y: 16 * 5 + framewidth * 3,
                        width: framewidth,
                        height: framewidth,
                        margin: 12,
                        padding: 6,
                        direction: Wakey.Direction.NONE,
                        bordercolor: "#bdc3c7",
                        backcolor: "#2c3e50",
                        fontcolor: "#bdc3c7"
                    }, 250);
                    self.btnMenu4.animate({
                        x: self.getWidth() - framewidth - 16,
                        y: 16 * 6 + framewidth * 4,
                        width: framewidth,
                        height: framewidth,
                        margin: 12,
                        padding: 6,
                        direction: Wakey.Direction.NONE,
                        bordercolor: "#bdc3c7",
                        backcolor: "#2c3e50",
                        fontcolor: "#bdc3c7"
                    }, 250);
                    self.btnMenu5.animate({
                        x: self.getWidth() - framewidth - 16,
                        y: 16 * 7 + framewidth * 5,
                        width: framewidth,
                        height: framewidth,
                        margin: 12,
                        padding: 6,
                        direction: Wakey.Direction.NONE,
                        bordercolor: "#bdc3c7",
                        backcolor: "#2c3e50",
                        fontcolor: "#bdc3c7"
                    }, 250);
                }
                else {
                    self.btnStart.setDirection(Wakey.Direction.LEFT);
                    self.fvBackground.animate({
                        x: 0,
                        y: 0,
                        width: self.getWidth(),
                        height: self.getHeight(),
                        margin: 0,
                        padding: 8,
                        direction: Wakey.Direction.NONE,
                        bordercolor: "#2c3e50",
                        backcolor: "#bdc3c7",
                        fontcolor: "#bdc3c7"
                    }, 250);
                    self.btnMenu1.animate({
                        x: self.getWidth(),
                        y: 16 * 3 + framewidth,
                        width: framewidth,
                        height: framewidth,
                        margin: 12,
                        padding: 6,
                        direction: Wakey.Direction.ALL,
                        bordercolor: "#bdc3c7",
                        backcolor: "#2c3e50",
                        fontcolor: "#bdc3c7"
                    }, 250);
                    self.btnMenu2.animate({
                        x: self.getWidth(),
                        y: 16 * 4 + framewidth * 2,
                        width: framewidth,
                        height: framewidth,
                        margin: 12,
                        padding: 6,
                        direction: Wakey.Direction.NONE,
                        bordercolor: "#bdc3c7",
                        backcolor: "#2c3e50",
                        fontcolor: "#bdc3c7"
                    }, 250);
                    self.btnMenu3.animate({
                        x: self.getWidth(),
                        y: 16 * 5 + framewidth * 3,
                        width: framewidth,
                        height: framewidth,
                        margin: 12,
                        padding: 6,
                        direction: Wakey.Direction.NONE,
                        bordercolor: "#bdc3c7",
                        backcolor: "#2c3e50",
                        fontcolor: "#bdc3c7"
                    }, 250);
                    self.btnMenu4.animate({
                        x: self.getWidth(),
                        y: 16 * 6 + framewidth * 4,
                        width: framewidth,
                        height: framewidth,
                        margin: 12,
                        padding: 6,
                        direction: Wakey.Direction.NONE,
                        bordercolor: "#bdc3c7",
                        backcolor: "#2c3e50",
                        fontcolor: "#bdc3c7"
                    }, 250);
                    self.btnMenu5.animate({
                        x: self.getWidth(),
                        y: 16 * 7 + framewidth * 5,
                        width: framewidth,
                        height: framewidth,
                        margin: 12,
                        padding: 6,
                        direction: Wakey.Direction.NONE,
                        bordercolor: "#bdc3c7",
                        backcolor: "#2c3e50",
                        fontcolor: "#bdc3c7"
                    }, 250);
                }
            };
            this.animateClock = function () {
                var self = _this;
                setTimeout(function () {
                    self.btnClock.setContent('<h2>' + moment(new Date()).format(Wakey.Setting.getDateTimeFormat()) + '</h2>');
                    if (self.bAnimated) {
                        self.animateClock();
                    }
                }, 1000);
            };
            this.animateLogo = function () {
                var self = _this;
                setTimeout(function () {
                    switch (self.btnStart.getDirection()) {
                        case Wakey.Direction.NONE:
                            self.$('#wrapper-title .title-1').removeClass('hidden');
                            self.btnStart.setDirection(Wakey.Direction.TOP);
                            self.btnStart.setContent("<h1>.</h1>");
                            break;
                        case Wakey.Direction.TOP:
                            self.$('#wrapper-title .title-2').removeClass('hidden');
                            self.$('#wrapper-title .title-1').addClass('title-inactive');
                            self.btnStart.setDirection(Wakey.Direction.RIGHT);
                            self.btnStart.setContent("<h1>..</h1>");
                            break;
                        case Wakey.Direction.RIGHT:
                            self.$('#wrapper-title .title-3').removeClass('hidden');
                            self.$('#wrapper-title .title-2').addClass('title-inactive');
                            self.btnStart.setDirection(Wakey.Direction.DOWN);
                            self.btnStart.setContent("<h1>...</h1>");
                            break;
                        case Wakey.Direction.DOWN:
                            self.$('#wrapper-title .title-4').removeClass('hidden');
                            self.$('#wrapper-title .title-3').addClass('title-inactive');
                            self.btnStart.setDirection(Wakey.Direction.LEFT);
                            self.btnStart.setContent("<h1>....</h1>");
                            break;
                        case Wakey.Direction.LEFT:
                            self.bAnimated = false;
                            self.$('#wrapper-title .title-4').addClass('title-inactive');
                            self.btnStart.setContent("<h1>Start</h1>");
                            self.btnStart.addEventListener(self.transitionFromLogoToMenu);
                            break;
                    }
                    if (self.bAnimated) {
                        self.animateLogo();
                    }
                }, 500);
            };
            this.transitionFromLogoToMenu = function () {
                var self = _this;
                setTimeout(function () {
                    self.$('#wrapper-title .title-1').animate({ top: -200 }, 500);
                    self.$('#wrapper-title .title-2').animate({ left: self.getWidth() + 200 }, 500);
                    self.$('#wrapper-title .title-3').animate({ top: self.getHeight() + 200 }, 500);
                    self.$('#wrapper-title .title-4').animate({ left: -200 }, 500);
                }, 100);
                setTimeout(function () {
                    var fontsize = 50;
                    var framewidth = 120;
                    self.btnStart.setContent("");
                    self.btnStart.render({
                        x: self.getWidth() - 120 * 2,
                        y: self.getHeight() - 120 * 2.5,
                        width: framewidth,
                        height: framewidth,
                        margin: 32,
                        padding: 8,
                        direction: Wakey.Direction.NONE,
                        bordercolor: "#bdc3c7",
                        backcolor: "#bdc3c7",
                        fontcolor: "#bdc3c7"
                    });
                    self.fvBackground.animate({
                        x: 0,
                        y: 0,
                        width: self.getWidth(),
                        height: self.getHeight(),
                        margin: 0,
                        padding: 8,
                        direction: Wakey.Direction.NONE,
                        bordercolor: "#2c3e50",
                        backcolor: "#bdc3c7",
                        fontcolor: "#bdc3c7"
                    }, 150);
                    setTimeout(function () {
                        Wakey.Router.getInstance().navigate("menu", { trigger: true, replace: false });
                    }, 150);
                }, 750);
            };
            if (View._instance) {
                throw new Error("Error: Instantiation failed: Use View.getInstance() instead of new.");
            }
            View._instance = this;
            var self = View._instance;
            self.bDebug = true;
        }
        View.setElement = function (options) {
            View._instance.setElement(options.el);
        };
        View.getInstance = function () {
            return View._instance;
        };
        View.setViewType = function (_viewType) {
            View._instance.viewType = _viewType;
        };
        View.prototype.render = function () {
            var self = this;
            if (self.bDebug)
                console.log(View.TAG + "render()");
            switch (self.viewType) {
                case 1 /* SPLASH */:
                    self.renderSplashView();
                    break;
                case 2 /* MENU */:
                    self.renderMenuView();
                    break;
            }
        };
        View.prototype.renderMenuView = function () {
            var self = this;
            if (self.bDebug)
                console.log(View.TAG + "renderMenuView()");
            var template = _.template(Wakey.Template.getMenuViewTemplate());
            var data = {};
            self.$el.html(template(data));
            self.fvBackground = Wakey.FrameViewFractory.create(self.$('#wrapper-background'));
            self.fvBackground.render({
                x: 0,
                y: 0,
                width: self.getWidth(),
                height: self.getHeight(),
                margin: 0,
                padding: 8,
                direction: Wakey.Direction.NONE,
                bordercolor: "#2c3e50",
                backcolor: "#bdc3c7",
                fontcolor: "#bdc3c7"
            });
            var framewidth = 80;
            self.btnStart = Wakey.FrameViewFractory.create(self.$('#wrapper-menu'));
            self.btnStart.render({
                x: self.getWidth() - framewidth - 16,
                y: 16,
                width: framewidth,
                height: framewidth,
                margin: 12,
                padding: 6,
                direction: Wakey.Direction.LEFT,
                bordercolor: "#2c3e50",
                backcolor: "#bdc3c7",
                fontcolor: "#2c3e50"
            });
            self.btnStart.setContent('<i class="fa fa-list fa-25x"></i>');
            self.btnMenu1 = Wakey.FrameViewFractory.create(self.$('#wrapper-menu1'));
            self.btnMenu1.render({
                x: self.getWidth(),
                y: 16 * 3 + framewidth,
                width: framewidth,
                height: framewidth,
                margin: 12,
                padding: 6,
                direction: Wakey.Direction.ALL,
                bordercolor: "#bdc3c7",
                backcolor: "#2c3e50",
                fontcolor: "#bdc3c7"
            });
            self.btnMenu1.setContent('<i class="fa fa-clock-o fa-25x"></i>');
            self.btnMenu2 = Wakey.FrameViewFractory.create(self.$('#wrapper-menu2'));
            self.btnMenu2.render({
                x: self.getWidth(),
                y: 16 * 4 + framewidth * 2,
                width: framewidth,
                height: framewidth,
                margin: 12,
                padding: 6,
                direction: Wakey.Direction.NONE,
                bordercolor: "#bdc3c7",
                backcolor: "#2c3e50",
                fontcolor: "#bdc3c7"
            });
            self.btnMenu2.setContent('<i class="fa fa-user fa-25x"></i>');
            self.btnMenu3 = Wakey.FrameViewFractory.create(self.$('#wrapper-menu3'));
            self.btnMenu3.render({
                x: self.getWidth(),
                y: 16 * 5 + framewidth * 3,
                width: framewidth,
                height: framewidth,
                margin: 12,
                padding: 6,
                direction: Wakey.Direction.NONE,
                bordercolor: "#bdc3c7",
                backcolor: "#2c3e50",
                fontcolor: "#bdc3c7"
            });
            self.btnMenu3.setContent('<i class="fa fa-users fa-25x"></i>');
            self.btnMenu4 = Wakey.FrameViewFractory.create(self.$('#wrapper-menu4'));
            self.btnMenu4.render({
                x: self.getWidth(),
                y: 16 * 6 + framewidth * 4,
                width: framewidth,
                height: framewidth,
                margin: 12,
                padding: 6,
                direction: Wakey.Direction.NONE,
                bordercolor: "#bdc3c7",
                backcolor: "#2c3e50",
                fontcolor: "#bdc3c7"
            });
            self.btnMenu4.setContent('<i class="fa fa-cog fa-25x"></i>');
            self.btnMenu5 = Wakey.FrameViewFractory.create(self.$('#wrapper-menu5'));
            self.btnMenu5.render({
                x: self.getWidth(),
                y: 16 * 7 + framewidth * 5,
                width: framewidth,
                height: framewidth,
                margin: 12,
                padding: 6,
                direction: Wakey.Direction.NONE,
                bordercolor: "#bdc3c7",
                backcolor: "#2c3e50",
                fontcolor: "#bdc3c7"
            });
            self.btnMenu5.setContent('<i class="fa fa-sign-out fa-25x"></i>');
            self.btnClock = Wakey.FrameViewFractory.create(self.$('#wrapper-clock'));
            self.btnClock.render({
                x: 16,
                y: 16,
                width: self.getWidth() - framewidth - 16 * 3,
                height: framewidth,
                margin: 12,
                padding: 6,
                direction: Wakey.Direction.RIGHT,
                bordercolor: "#bdc3c7",
                backcolor: "#2c3e50",
                fontcolor: "#bdc3c7"
            });
            self.bMenuOpen = false;
            self.btnStart.addEventListener(self.toggleMenu);
            self.bAnimated = true;
            self.animateClock();
        };
        View.prototype.renderSplashView = function () {
            var self = this;
            if (self.bDebug)
                console.log(View.TAG + "renderSplashView()");
            var template = _.template(Wakey.Template.getSplashViewTemplate());
            var data = {};
            self.$el.html(template(data));
            self.fvBackground = Wakey.FrameViewFractory.create(self.$('#wrapper-background'));
            self.fvBackground.render({
                x: 0,
                y: 0,
                width: self.getWidth(),
                height: self.getHeight(),
                margin: 0,
                padding: self.getWidth() / 2,
                direction: Wakey.Direction.NONE,
                bordercolor: "#2c3e50",
                backcolor: "#bdc3c7",
                fontcolor: "#bdc3c7"
            });
            var fontsize = 50;
            var framewidth = 120;
            self.$('#wrapper-title .title-1').css({ left: self.getWidth() - framewidth * 2 + fontsize * 0.95, top: self.getHeight() - framewidth * 2.5 - fontsize * 1.25 });
            self.$('#wrapper-title .title-2').css({ left: self.getWidth() - framewidth + fontsize * 0.25, top: self.getHeight() - framewidth * 2 - fontsize * 0.25 });
            self.$('#wrapper-title .title-3').css({ left: self.getWidth() - framewidth * 2 + fontsize * 0.65, top: self.getHeight() - framewidth * 1.5 + fontsize * 0.75 });
            self.$('#wrapper-title .title-4').css({ left: self.getWidth() - framewidth * 2 - fontsize * 1.25, top: self.getHeight() - framewidth * 2 - fontsize * 0.25 });
            self.btnStart = Wakey.FrameViewFractory.create(self.$('#wrapper-start'));
            self.btnStart.render({
                x: self.getWidth() - 120 * 2,
                y: self.getHeight() - 120 * 2.5,
                width: framewidth,
                height: framewidth,
                margin: 32,
                padding: 8,
                direction: Wakey.Direction.NONE,
                bordercolor: "#bdc3c7",
                backcolor: "#2c3e50",
                fontcolor: "#bdc3c7"
            });
            self.bAnimated = true;
            self.animateLogo();
        };
        View._instance = new View();
        View.TAG = "View - ";
        return View;
    })(BaseView);
    Wakey.View = View;
})(Wakey || (Wakey = {}));
