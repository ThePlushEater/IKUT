var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IKUT;
(function (IKUT) {
    var UsersView = (function (_super) {
        __extends(UsersView, _super);
        function UsersView(options) {
            _super.call(this, options);
            var self = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        UsersView.prototype.render = function (args) {
            var self = this;
            if (self.bDebug)
                console.log(UsersView.TAG + "render()");
            // get alarms
            var curUser = IKUT.Model.getCurUser();
            var users = IKUT.Model.getUsers();
            // apply template
            var template = _.template(IKUT.Template.getUsersViewTemplate());
            var data = {
                curUser: curUser,
                users: users,
            };
            self.$el.html(template(data));
            var bf = IKUT.ButtonViewFractory.create(self.$('.wrapper-button'), { icon: 'fa-user-plus', content: 'Add a New Friend', behavior: 'btn-add', isLeft: false });
            bf.render();
            $.each(self.$('.wrapper-user'), function (index, item) {
                var fv = IKUT.FrameViewFractory.create($(item));
                fv.render(users.models[index]);
            });
            // Make the view slowly visible.
            self.setElement(self.$('#wrapper-users'));
            self.animVisible();
            self.addEventListener();
            return self;
        };
        UsersView.prototype.update = function (args) {
            var self = this;
            if (self.bDebug)
                console.log(UsersView.TAG + "update()");
            // get alarms
            var curUser = IKUT.Model.getCurUser();
            var users = IKUT.Model.getUsers();
            // apply template
            var template = _.template(IKUT.Template.getUsersViewTemplate2());
            var data = {
                curUser: curUser,
                users: users,
            };
            self.$el.html(template(data));
            var bf = IKUT.ButtonViewFractory.create(self.$('.wrapper-button'), { icon: 'fa-user-plus', content: 'Add a New Friend', behavior: 'btn-add', isLeft: false });
            bf.render();
            $.each(self.$('.wrapper-user'), function (index, item) {
                var fv = IKUT.FrameViewFractory.create($(item));
                fv.render(users.models[index]);
            });
            self.addEventListener();
            return self;
        };
        UsersView.prototype.animVisible = function () {
            var self = this;
            setTimeout(function () {
                self.$el.animate({ opacity: 1 }, function () {
                    IKUT.View.setIsLoading(false);
                });
            }, IKUT.Setting.getViewTransitionDuration() * 2);
        };
        UsersView.prototype.animActive = function () {
            var self = this;
            setTimeout(function () {
                self.$el.animate({ left: 0 }, function () {
                    IKUT.View.setIsLoading(false);
                    self.sideView.destroy();
                    self.sideView = null;
                });
            }, IKUT.Setting.getViewTransitionDuration() * 2);
        };
        UsersView.prototype.animInactive = function () {
            var self = this;
            setTimeout(function () {
                self.$el.animate({ left: -self.getWidth() }, function () {
                    IKUT.View.setIsLoading(false);
                });
            }, IKUT.Setting.getViewTransitionDuration() * 2);
        };
        UsersView.prototype.addEventListener = function () {
            var self = this;
            self.$('.btn-detail').off('click');
            self.$('.btn-detail').on('click', function () {
                click1.play();
                if (!IKUT.View.getIsLoading()) {
                    IKUT.View.setIsLoading(true);
                    self.sideView = IKUT.SideViewFractory.create($('#wrapper-main'));
                    self.sideView.setParentView(self);
                    var cid = $(this).attr('data-cid');
                    var user = IKUT.Model.getUsers().findWhere({ cid: cid });
                    if (user) {
                        self.sideView.render(user);
                        self.animInactive();
                        self.sideView.animActive();
                    }
                    else {
                    }
                }
            });
            self.$('.btn-add').addClass('btn-color1');
            self.$('.btn-add').off('click');
            self.$('.btn-add').on('click', function () {
                click1.play();
                if (!IKUT.View.getIsLoading()) {
                    IKUT.View.setIsLoading(true);
                    self.sideView = IKUT.SideViewFractory.create($('#wrapper-main'));
                    self.sideView.setParentView(self);
                    var today = moment(new Date());
                    var user = new IKUT.User({ username: '', password: '', firstname: '', lastname: '', recent: today.format(IKUT.Setting.getDateTimeFormat1()), created: today.format(IKUT.Setting.getDateTimeFormat1()), description: '' });
                    if (user) {
                        self.sideView.render(user);
                        self.animInactive();
                        self.sideView.animActive();
                    }
                    else {
                    }
                }
            });
        };
        UsersView.TAG = "UsersView - ";
        return UsersView;
    })(IKUT.BaseView);
    IKUT.UsersView = UsersView;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=usersview.js.map