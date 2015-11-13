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
        MainViewType[MainViewType["HOME"] = 1] = "HOME";
        MainViewType[MainViewType["MENU"] = 2] = "MENU";
    })(Wakey.MainViewType || (Wakey.MainViewType = {}));
    var MainViewType = Wakey.MainViewType;
    var BaseView = (function (_super) {
        __extends(BaseView, _super);
        function BaseView(options) {
            _super.call(this, options);
            this.bDebug = false;
            this.bRendered = false;
            var self = this;
            self.views = new Array();
        }
        BaseView.prototype.render = function () {
            this.bRendered = true;
        };
        BaseView.prototype.update = function () {
            if (!this.bRendered) {
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
        BaseView.prototype.traverse = function (callback) {
            callback(this);
            this.views.forEach(function (view) {
                view.traverse(callback);
            });
        };
        BaseView.prototype.getViews = function () {
            var self = this;
            return self.views;
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
            this.addMenuOpenListener = function () {
                var self = _this;
                self.isMenuOpen = false;
                $('#display-menu').css({
                    height: $('#display-body').innerHeight() - 2,
                    top: $('#display-body').position().top + 1,
                    left: -$('#display-menu').innerWidth(),
                });
                $('#toggle-menu').off('click');
                $('#toggle-menu').on('click', self.toggleMenu);
            };
            this.toggleMenu = function () {
                var self = _this;
                if (self.isMenuOpen) {
                    $('#display-menu').animate({ left: -$('#display-menu').innerWidth() }, 500);
                }
                else {
                    $('#display-menu').animate({ left: '15px' }, 500);
                }
                self.isMenuOpen = !self.isMenuOpen;
            };
            this.tickClock = function () {
                var self = _this;
                self.isFlickerOn = true;
                self.clockInterval = setInterval(function () {
                    if (self.isFlickerOn) {
                        $('#display-time').html(moment(new Date()).format(Wakey.Setting.getTimeFormat1()));
                    }
                    else {
                        $('#display-time').html(moment(new Date()).format(Wakey.Setting.getTimeFormat2()));
                    }
                    self.isFlickerOn = !self.isFlickerOn;
                    $('#display-date').html(moment(new Date()).format(Wakey.Setting.getDateFormat()));
                }, 500);
            };
            this.stopClock = function () {
                var self = _this;
                clearInterval(self.clockInterval);
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
                case 1 /* HOME */:
                    self.renderBaseView();
                    break;
                case 2 /* MENU */:
                    break;
            }
        };
        View.prototype.renderBaseView = function () {
            var self = this;
            if (self.bDebug)
                console.log(View.TAG + "renderBaseView()");
            var template = _.template(Wakey.Template.getBaseViewTemplate());
            var data = {};
            self.$el.html(template(data));
            self.tickClock();
            self.addMenuOpenListener();
        };
        View._instance = new View();
        View.TAG = "View - ";
        return View;
    })(BaseView);
    Wakey.View = View;
})(Wakey || (Wakey = {}));
