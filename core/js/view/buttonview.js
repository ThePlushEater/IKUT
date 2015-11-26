var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IKUT;
(function (IKUT) {
    var ButtonView = (function (_super) {
        __extends(ButtonView, _super);
        function ButtonView(options) {
            _super.call(this, options);
            var self = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        ButtonView.prototype.setAttribute = function (option) {
            var self = this;
            self.icon = option.icon;
            self.content = option.content;
            self.behavior = option.behavior;
            self.isLeft = option.isLeft;
        };
        ButtonView.prototype.render = function (args) {
            var self = this;
            if (self.bDebug)
                console.log(ButtonView.TAG + "render()");
            if (self.isLeft) {
                // apply template
                var template = _.template(IKUT.Template.getButtonViewTemplate());
                var data = {
                    icon: self.icon,
                    content: self.content,
                    behavior: self.behavior,
                };
                self.$el.html(template(data));
            }
            else {
                // apply template
                var template = _.template(IKUT.Template.getButtonViewTemplate2());
                var data = {
                    icon: self.icon,
                    content: self.content,
                    behavior: self.behavior,
                };
                self.$el.html(template(data));
            }
            return self;
        };
        ButtonView.TAG = "ButtonView - ";
        return ButtonView;
    })(IKUT.BaseView);
    IKUT.ButtonView = ButtonView;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=buttonview.js.map