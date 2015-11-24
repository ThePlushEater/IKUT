var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IKUT;
(function (IKUT) {
    var FrameView = (function (_super) {
        __extends(FrameView, _super);
        function FrameView(options) {
            _super.call(this, options);
            var self = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        FrameView.prototype.render = function (args) {
            var self = this;
            if (self.bDebug)
                console.log(FrameView.TAG + "render()");
            // apply template
            if (args instanceof IKUT.Alarm) {
                // apply template
                var template = _.template(IKUT.Template.getFrameViewTemplate());
                var data = {
                    header: args.getFormattedTime(),
                    content: args.getName(),
                    collapse: args.getcId(),
                };
                self.$el.html(template(data));
            }
            return self;
        };
        FrameView.TAG = "FrameView - ";
        return FrameView;
    })(IKUT.BaseView);
    IKUT.FrameView = FrameView;
    var Frame2View = (function (_super) {
        __extends(Frame2View, _super);
        function Frame2View(options) {
            _super.call(this, options);
            var self = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        Frame2View.prototype.render = function (args) {
            var self = this;
            if (self.bDebug)
                console.log(Frame2View.TAG + "render()");
            if (args instanceof IKUT.Alarm) {
                var days = '';
                if (args.getIsDailyDayOn(0 /* MONDAY */)) {
                    days += '<span class="">M</span>';
                }
                else {
                    days += '<span class="frame2-day-inactive">M</span>';
                }
                if (args.getIsDailyDayOn(1 /* TUESDAY */)) {
                    days += '<span class="">T</span>';
                }
                else {
                    days += '<span class="frame2-day-inactive">T</span>';
                }
                if (args.getIsDailyDayOn(2 /* WEDNESDAY */)) {
                    days += '<span class="">W</span>';
                }
                else {
                    days += '<span class="frame2-day-inactive">W</span>';
                }
                if (args.getIsDailyDayOn(3 /* THURSDAY */)) {
                    days += '<span class="">T</span>';
                }
                else {
                    days += '<span class="frame2-day-inactive">T</span>';
                }
                if (args.getIsDailyDayOn(4 /* FRIDAY */)) {
                    days += '<span class="">F</span>';
                }
                else {
                    days += '<span class="frame2-day-inactive">F</span>';
                }
                if (args.getIsDailyDayOn(5 /* SATURDAY */)) {
                    days += '<span class="">S</span>';
                }
                else {
                    days += '<span class="frame2-day-inactive">S</span>';
                }
                if (args.getIsDailyDayOn(6 /* SUNDAY */)) {
                    days += '<span class="">S</span>';
                }
                else {
                    days += '<span class="frame2-day-inactive">S</span>';
                }
                // apply template
                var template = _.template(IKUT.Template.getFrame2ViewTemplate());
                var data = {
                    header: args.getFormattedTime(),
                    content: args.getName(),
                    collapse: args.getcId(),
                    days: days,
                };
                self.$el.html(template(data));
            }
            return self;
        };
        Frame2View.TAG = "Frame2View - ";
        return Frame2View;
    })(IKUT.BaseView);
    IKUT.Frame2View = Frame2View;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=frameview.js.map