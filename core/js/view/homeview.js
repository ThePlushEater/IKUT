var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IKUT;
(function (IKUT) {
    var HomeView = (function (_super) {
        __extends(HomeView, _super);
        function HomeView(options) {
            _super.call(this, options);
            var self = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        HomeView.prototype.render = function (args) {
            var self = this;
            if (self.bDebug)
                console.log(HomeView.TAG + "render()");
            // get alarms
            var alarms = IKUT.Controller.getUpcoming7DaysAlarms();
            // apply template
            var template = _.template(IKUT.Template.getHomeViewTemplate());
            var data = {
                alarms: alarms,
            };
            self.$el.html(template(data));
            self.setElement(self.$('#wrapper-home'));
            self.animVisible();
            $.each(self.$('.wrapper-notification'), function (index, item) {
                var fv = IKUT.FrameViewFractory.create($(item));
                fv.render(alarms.models[index]);
            });
            return self;
        };
        HomeView.prototype.animVisible = function () {
            var self = this;
            setTimeout(function () {
                self.$el.animate({ opacity: 1 }, function () {
                    IKUT.View.setIsLoading(false);
                });
            }, IKUT.Setting.getViewTransitionDuration() * 2);
        };
        HomeView.TAG = "HomeView - ";
        return HomeView;
    })(IKUT.BaseView);
    IKUT.HomeView = HomeView;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=homeview.js.map