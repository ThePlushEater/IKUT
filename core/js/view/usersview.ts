module IKUT {
    export class UsersView extends BaseView {
        private static TAG: string = "UsersView - ";
        public sideView: SideView;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: UsersView = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        public render(args?: any): any {
            var self: UsersView = this;
            if (self.bDebug) console.log(UsersView.TAG + "render()");

            // get alarms
            var curUser: User = Model.getCurUser();
            var users: Users = Model.getUsers();

            // apply template
            var template = _.template(Template.getUsersViewTemplate());
            var data = {
                curUser: curUser,
                users: users,
            }
            self.$el.html(template(data));

            var bf: ButtonView = ButtonViewFractory.create(self.$('.wrapper-button'), { icon: 'fa-user-plus', content: 'Add a New Friend', behavior: 'btn-add', isLeft: false });
            bf.render();


            $.each(self.$('.wrapper-user'), function (index: number, item: JQuery) {
                var fv: FrameView = FrameViewFractory.create($(item));
                fv.render(users.models[index]);
            });


            // Make the view slowly visible.
            self.setElement(self.$('#wrapper-users'));
            self.animVisible();

            self.addEventListener();

            return self;
        }

        public update(args?: any): any {
            var self: UsersView = this;
            if (self.bDebug) console.log(UsersView.TAG + "update()");

            // get alarms
            var curUser: User = Model.getCurUser();
            var users: Users = Model.getUsers();

            // apply template
            var template = _.template(Template.getUsersViewTemplate2());
            var data = {
                curUser: curUser,
                users: users,
            }
            self.$el.html(template(data));

            var bf: ButtonView = ButtonViewFractory.create(self.$('.wrapper-button'), { icon: 'fa-user-plus', content: 'Add a New Friend', behavior: 'btn-add', isLeft: false });
            bf.render();


            $.each(self.$('.wrapper-user'), function (index: number, item: JQuery) {
                var fv: FrameView = FrameViewFractory.create($(item));
                fv.render(users.models[index]);
            });

            self.addEventListener();

            return self;
        }

        public animVisible(): void {
            var self: UsersView = this;
            setTimeout(function () {
                self.$el.animate({ opacity: 1 }, function () {
                    View.setIsLoading(false);
                });
            }, Setting.getViewTransitionDuration() * 2);
        }

        public animActive(): void {
            var self: UsersView = this;
            setTimeout(function () {
                self.$el.animate({ left: 0 }, function () {
                    View.setIsLoading(false);
                    self.sideView.destroy();
                    self.sideView = null;
                });
            }, Setting.getViewTransitionDuration() * 2);
        }

        public animInactive(): void {
            var self: UsersView = this;
            setTimeout(function () {
                self.$el.animate({ left: -self.getWidth() }, function () {
                    View.setIsLoading(false);
                });
            }, Setting.getViewTransitionDuration() * 2);
        }

        public addEventListener(): void {
            var self: UsersView = this;
            self.$('.btn-detail').off('click');
            self.$('.btn-detail').on('click', function () {
                if (!View.getIsLoading()) {
                    View.setIsLoading(true);
                    self.sideView = SideViewFractory.create($('#wrapper-main'));
                    self.sideView.setParentView(self);
                    var cid = $(this).attr('data-cid');
                    var user: User = Model.getUsers().findWhere({ cid: cid });
                    if (user) {
                        self.sideView.render(user);

                        self.animInactive();
                        self.sideView.animActive();
                    } else {
                        // Error handling
                    }
                }
            });

            self.$('.btn-add').off('click');
            self.$('.btn-add').on('click', function () {
                if (!View.getIsLoading()) {
                    View.setIsLoading(true);
                    self.sideView = SideViewFractory.create($('#wrapper-main'));
                    self.sideView.setParentView(self);
                    var today: Moment = moment(new Date());
                    var user: User = new User({ username: '', password: '', firstname: '', lastname: '', recent: today.format(Setting.getDateTimeFormat1()), created: today.format(Setting.getDateTimeFormat1()), description: '' });
                    if (user) {
                        self.sideView.render(user);

                        self.animInactive();
                        self.sideView.animActive();
                    } else {
                        // Error handling
                    }
                }
            });
        }
    }
} 