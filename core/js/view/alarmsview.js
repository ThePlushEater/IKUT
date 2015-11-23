var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IKUT;
(function (IKUT) {
    var AlarmsView = (function (_super) {
        __extends(AlarmsView, _super);
        function AlarmsView(options) {
            _super.call(this, options);
            var self = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        AlarmsView.prototype.render = function (args) {
            var self = this;
            if (self.bDebug)
                console.log(AlarmsView.TAG + "render()");
            // apply template
            var template = _.template(IKUT.Template.getAlarmsViewTemplate());
            var data = {};
            self.$el.html(template(data));
            $.each(self.$('.wrapper-button'), function (index, item) {
                IKUT.ButtonViewFractory.create($(item)).render();
            });
            $.each(self.$('.wrapper-notification'), function (index, item) {
                IKUT.Frame2ViewFractory.create($(item)).render();
            });
            // Make the view slowly visible.
            self.setElement(self.$('#wrapper-alarms'));
            self.animVisible();
            return self;
        };
        AlarmsView.prototype.animVisible = function () {
            var self = this;
            setTimeout(function () {
                self.$el.animate({ opacity: 1 }, function () {
                    IKUT.View.setIsLoading(false);
                });
            }, IKUT.Setting.getViewTransitionDuration() * 2);
        };
        AlarmsView.TAG = "AlarmsView - ";
        return AlarmsView;
    })(IKUT.BaseView);
    IKUT.AlarmsView = AlarmsView;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=alarmsview.js.map