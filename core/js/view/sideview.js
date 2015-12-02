var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IKUT;
(function (IKUT) {
    var SideView = (function (_super) {
        __extends(SideView, _super);
        function SideView(options) {
            _super.call(this, options);
            var self = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        SideView.prototype.render = function (args) {
            var self = this;
            if (self.bDebug)
                console.log(SideView.TAG + "render()");
            if (args instanceof IKUT.Alarm) {
                console.log(args);
                // apply template
                var template = _.template(IKUT.Template.getSideViewTemplate());
                var data = {};
                self.$el.append(template(data));
                self.setElement(self.$('#wrapper-side'));
                var bf = IKUT.ButtonViewFractory.create(self.$('.wrapper-button'), { icon: 'fa-angle-left', content: 'Back to List', behavior: 'btn-back', isLeft: true });
                bf.render();
                self.$('.wrapper-detail').css({ height: self.getHeight() - parseInt(self.$el.css('padding-top')) - parseInt(self.$el.css('padding-bottom')) - self.$('.wrapper-button').outerHeight() - self.$('.wrapper-connector').outerHeight() });
                // add detail
                var dv = IKUT.DetailViewFractory.create(self.$('.wrapper-detail'));
                dv.setParentView(self);
                dv.render(args);
                self.addEventListener();
            }
            else if (args instanceof IKUT.User) {
                // apply template
                var template = _.template(IKUT.Template.getSideViewTemplate());
                var data = {};
                self.$el.append(template(data));
                self.setElement(self.$('#wrapper-side'));
                var bf = IKUT.ButtonViewFractory.create(self.$('.wrapper-button'), { icon: 'fa-angle-left', content: 'Back to List', behavior: 'btn-back', isLeft: true });
                bf.render();
                self.$('.wrapper-detail').css({ height: self.getHeight() - parseInt(self.$el.css('padding-top')) - parseInt(self.$el.css('padding-bottom')) - self.$('.wrapper-button').outerHeight() - self.$('.wrapper-connector').outerHeight() });
                // add detail
                var dv = IKUT.DetailViewFractory.create(self.$('.wrapper-detail'));
                dv.setParentView(self);
                dv.render(args);
                self.addEventListener();
            }
            return self;
        };
        SideView.prototype.animActive = function () {
            var self = this;
            setTimeout(function () {
                self.$el.animate({ left: 0 }, function () {
                    IKUT.View.setIsLoading(false);
                });
            }, IKUT.Setting.getViewTransitionDuration() * 2);
        };
        SideView.prototype.animInactive = function () {
            var self = this;
            self.parentView.update();
            self.parentView.animActive();
            setTimeout(function () {
                self.$el.animate({ left: self.getWidth() }, function () {
                    IKUT.View.setIsLoading(false);
                });
            }, IKUT.Setting.getViewTransitionDuration() * 2);
        };
        SideView.prototype.setParentView = function (view) {
            var self = this;
            self.parentView = view;
        };
        SideView.prototype.addEventListener = function () {
            var self = this;
            self.$('.wrapper-button .btn-back').addClass('btn-color1');
            self.$('.wrapper-button .btn-back').off('click');
            self.$('.wrapper-button .btn-back').on('click', function () {
                click1.play();
                IKUT.View.setIsLoading(true);
                self.animInactive();
            });
        };
        SideView.TAG = "SideView - ";
        return SideView;
    })(IKUT.BaseView);
    IKUT.SideView = SideView;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=sideview.js.map