var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IKUT;
(function (IKUT) {
    var MenuView = (function (_super) {
        __extends(MenuView, _super);
        function MenuView(options) {
            _super.call(this, options);
            var self = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        MenuView.prototype.render = function (args) {
            var self = this;
            if (self.bDebug)
                console.log(MenuView.TAG + "render()");
            // apply template
            var template = _.template(IKUT.Template.getMenuViewTemplate());
            var data = {
                icon: self._icon,
                color: self._color,
            };
            self.$el.html(template(data));
            self.$('.menu-inner').css({ 'border-color': self._color });
            self.$('.menu-inner i').css({ 'color': self._color });
            self.addEventListener();
            return self;
        };
        MenuView.prototype.setAttributes = function (option) {
            var self = this;
            self._icon = option.icon;
            self._color = option.color;
            self._hash = option.hash;
        };
        MenuView.prototype.setIsActive = function (active) {
            var self = this;
            self._active = active;
            if (self._active) {
                self.$el.css({ top: IKUT.Setting.getMenuTopActiveOffset() });
            }
            else {
                self.$el.css({ top: 0 });
            }
        };
        MenuView.prototype.addEventListener = function () {
            var self = this;
            self.$el.off('click');
            self.$el.on('click', function () {
                if (!IKUT.View.getIsLoading()) {
                    IKUT.Router.navigate(self._hash, { trigger: true, replace: false });
                }
            });
        };
        MenuView.TAG = "MenuView - ";
        return MenuView;
    })(IKUT.BaseView);
    IKUT.MenuView = MenuView;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=menuview.js.map