var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IKUT;
(function (IKUT) {
    var MenusView = (function (_super) {
        __extends(MenusView, _super);
        function MenusView(options) {
            _super.call(this, options);
            var self = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        MenusView.prototype.render = function (args) {
            var self = this;
            if (self.bDebug)
                console.log(MenusView.TAG + "render()");
            // apply template
            var template = _.template(IKUT.Template.getMenusViewTemplate());
            var data = {};
            self.$el.html(template(data));
            $('#wrapper-fakebackground').css({ width: ($(document).innerWidth() - 414), height: IKUT.View.getInstance().getHeight(), left: 414 });
            $.each(self.$('.wrapper-menu'), function (index, item) {
                if (IKUT.View.getViewType() != 6 /* POPUP */) {
                    switch (index) {
                        case 0:
                            self.views.push(IKUT.MenuViewFractory.create($(item), { icon: 'fa-home', color: '#6E2F1C', hash: 'home' }).render());
                            break;
                        case 1:
                            self.views.push(IKUT.MenuViewFractory.create($(item), { icon: 'fa-clock-o', color: '#8F5C3D', hash: 'alarms' }).render());
                            break;
                        case 2:
                            self.views.push(IKUT.MenuViewFractory.create($(item), { icon: 'fa-group', color: '#AB8349', hash: 'friends' }).render());
                            break;
                        case 3:
                            self.views.push(IKUT.MenuViewFractory.create($(item), { icon: 'fa-paper-plane-o', color: '#5C8A7A', hash: 'pushes' }).render());
                            break;
                        case 4:
                            self.views.push(IKUT.MenuViewFractory.create($(item), { icon: 'fa-gear', color: '#5d7422', hash: 'star' }).render());
                            break;
                    }
                }
            });
            return self;
        };
        MenusView.prototype.setCurrentMenu = function (viewType) {
            var self = this;
            switch (viewType) {
                case 0 /* NONE */:
                    break;
                case 1 /* HOME */:
                    $.each(self.views, function (index, item) {
                        if (index == 0) {
                            item.setIsActive(true);
                        }
                        else {
                            item.setIsActive(false);
                        }
                    });
                    break;
                case 2 /* ALARMS */:
                    $.each(self.views, function (index, item) {
                        if (index == 1) {
                            item.setIsActive(true);
                        }
                        else {
                            item.setIsActive(false);
                        }
                    });
                    break;
                case 3 /* FRIENDS */:
                    $.each(self.views, function (index, item) {
                        if (index == 2) {
                            item.setIsActive(true);
                        }
                        else {
                            item.setIsActive(false);
                        }
                    });
                    break;
                case 4 /* PUSHES */:
                    $.each(self.views, function (index, item) {
                        if (index == 3) {
                            item.setIsActive(true);
                        }
                        else {
                            item.setIsActive(false);
                        }
                    });
                    break;
                case 5 /* STAR */:
                    $.each(self.views, function (index, item) {
                        if (index == 4) {
                            item.setIsActive(true);
                        }
                        else {
                            item.setIsActive(false);
                        }
                    });
                    break;
            }
        };
        MenusView.TAG = "MenusView - ";
        return MenusView;
    })(IKUT.BaseView);
    IKUT.MenusView = MenusView;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=menusview.js.map