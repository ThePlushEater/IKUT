var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
            var template = _.template(IKUT.Template.getFrameViewTemplate());
            var data = {
                header: "2:00PM",
                content: "CONTENT",
            };
            self.$el.html(template(data));
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
            // apply template
            var template = _.template(IKUT.Template.getFrame2ViewTemplate());
            var data = {
                header: "12:00PM",
                content: "CONTENT",
            };
            self.$el.html(template(data));
            return self;
        };
        Frame2View.TAG = "Frame2View - ";
        return Frame2View;
    })(IKUT.BaseView);
    IKUT.Frame2View = Frame2View;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=frameview.js.map