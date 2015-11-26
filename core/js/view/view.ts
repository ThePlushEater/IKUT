module IKUT {
    export enum VIEWTYPE_LIST {
        NONE, HOME, ALARMS, FRIENDS, PUSHES, STAR
    }
    export class View extends BaseView {
        private static _instance: View = new View();
        private static TAG: string = "View - ";
        private static _viewType: VIEWTYPE_LIST = VIEWTYPE_LIST.NONE;
        private static _bLoading: boolean = false;

        private _homeView: HomeView;
        private _menusView: MenusView;
        private _alarmsView: AlarmsView;
        private _usersView: UsersView;
        private _pushesView: PushesView;

        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            if (View._instance) {
                throw new Error("Error: Instantiation failed: Use View.getInstance() instead of new.");
            }
            View._instance = this;
            var self: View = View._instance;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        public static setElement(options?: Backbone.ViewOptions<Backbone.Model>): void {
            View._instance.setElement(options.el);
        }
        public static getInstance(): View {
            return View._instance;
        }
        public static setViewType(viewType: VIEWTYPE_LIST): void {
            View._viewType = viewType;
        }

        public static setIsLoading(bLoading: boolean) {
            View._bLoading = bLoading;
        }

        public static getIsLoading(): boolean {
            return View._bLoading;
        }

        public render(args?: any): any {
            var self: View = this;
            if (self.bDebug) console.log(View.TAG + "render()");
            
            View.setIsLoading(true);
            

            switch (View._viewType) {
                case VIEWTYPE_LIST.HOME:
                    setTimeout(function () {
                        self._homeView = HomeViewFractory.create($('#wrapper-main')).render();
                    }, Setting.getViewTransitionDuration());
                    // remove other views
                    if (self._alarmsView) {
                        self._alarmsView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration(), function () {
                            self._alarmsView.destroy();
                            self._alarmsView = null;
                        });
                        if (self._alarmsView.sideView) {
                            self._alarmsView.sideView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration());
                        }
                    } else if (self._usersView) {
                        self._usersView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration(), function () {
                            self._usersView.destroy();
                            self._usersView = null;
                        });
                        if (self._usersView.sideView) {
                            self._usersView.sideView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration());
                        }
                    } else if (self._pushesView) {
                        self._pushesView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration(), function () {
                            self._pushesView.destroy();
                            self._pushesView = null;
                        });
                        if (self._pushesView.sideView) {
                            self._pushesView.sideView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration());
                        }
                    }
                    break;
                case VIEWTYPE_LIST.ALARMS:
                    setTimeout(function () {
                        self._alarmsView = AlarmsViewFractory.create($('#wrapper-main')).render();
                    }, Setting.getViewTransitionDuration());
                    // remove other views
                    if (self._homeView) {
                        self._homeView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration(), function () {
                            self._homeView.destroy();
                            self._homeView = null;
                        });
                        if (self._homeView.sideView) {
                            self._homeView.sideView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration());
                        }
                    } else if (self._usersView) {
                        self._usersView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration(), function () {
                            self._usersView.destroy();
                            self._usersView = null;
                        });
                        if (self._usersView.sideView) {
                            self._usersView.sideView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration());
                        }
                    } else if (self._pushesView) {
                        self._pushesView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration(), function () {
                            self._pushesView.destroy();
                            self._pushesView = null;
                        });
                        if (self._pushesView.sideView) {
                            self._pushesView.sideView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration());
                        }
                    }
                    break;
                case VIEWTYPE_LIST.FRIENDS:
                    setTimeout(function () {
                        self._usersView = UsersViewFractory.create($('#wrapper-main')).render();
                    }, Setting.getViewTransitionDuration());
                    // remove other views
                    if (self._alarmsView) {
                        self._alarmsView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration(), function () {
                            self._alarmsView.destroy();
                            self._alarmsView = null;
                        });
                        if (self._alarmsView.sideView) {
                            self._alarmsView.sideView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration());
                        }
                    } else if (self._homeView) {
                        self._homeView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration(), function () {
                            self._homeView.destroy();
                            self._homeView = null;
                        });
                        if (self._homeView.sideView) {
                            self._homeView.sideView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration());
                        }
                    } else if (self._pushesView) {
                        self._pushesView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration(), function () {
                            self._pushesView.destroy();
                            self._pushesView = null;
                        });
                        if (self._pushesView.sideView) {
                            self._pushesView.sideView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration());
                        }
                    }
                    break;
                case VIEWTYPE_LIST.PUSHES:
                    setTimeout(function () {
                        self._pushesView = PushesViewFractory.create($('#wrapper-main')).render();
                    }, Setting.getViewTransitionDuration());
                    // remove other views
                    if (self._alarmsView) {
                        self._alarmsView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration(), function () {
                            self._alarmsView.destroy();
                            self._alarmsView = null;
                        });
                        if (self._alarmsView.sideView) {
                            self._alarmsView.sideView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration());
                        }
                    } else if (self._homeView) {
                        self._homeView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration(), function () {
                            self._homeView.destroy();
                            self._homeView = null;
                        });
                        if (self._homeView.sideView) {
                            self._homeView.sideView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration());
                        }
                    } else if (self._usersView) {
                        self._usersView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration(), function () {
                            self._usersView.destroy();
                            self._usersView = null;
                        });
                        if (self._usersView.sideView) {
                            self._usersView.sideView.$el.animate({ left: -self.getWidth(), opacity: 0 }, Setting.getViewTransitionDuration());
                        }
                    }
                    break;
            }

            // render menusview if it's not rendered yet.
            if (!self._menusView) {
                self._menusView = MenusViewFractory.create($('#wrapper-menus')).render();
            }
            // set current menu
            self._menusView.setCurrentMenu(View._viewType);

            self.changeBackgroundGradient();
            self.addEventListener();

            // adjust offset of menu
            //console.log($(document).innerWidth() - self.getWidth());
            $('#wrapper-menus').css({ right: $(document).innerWidth() - self.getWidth() });
        }
        public static render(args?: any): any {
            View._instance.render(args);
        }

        public addEventListener(): any {
            var self: View = this;
            // logo redirect menu
            $('#wrapper-logo').off('click');
            $('#wrapper-logo').on('click', function () {
                window.location.href = Setting.getBaseUrl();
                //Router.navigate("home", { trigger: true, replace: true });
            });
        }

        public changeBackgroundGradient(): void {
            var self: View = this;
            switch (View._viewType) {
                case VIEWTYPE_LIST.HOME:
                    self.$el.css({
                        background: "linear-gradient(" + Setting.getBackgroundRedColor() + ", " + Setting.getBackgroundGreenColor() + " 70%, " + Setting.getBackgroundBlackColor() + " 95%), " + "url( " + Setting.getBackgroundImage() + ")"
                    });
                    break;
                case VIEWTYPE_LIST.ALARMS:
                    self.$el.css({
                        background: "linear-gradient(" + Setting.getBackgroundOrangeColor() + ", " + Setting.getBackgroundRedColor() + " 70%, " + Setting.getBackgroundBlackColor() + " 95%), " + "url( " + Setting.getBackgroundImage() + ")"
                    });
                    break;
                case VIEWTYPE_LIST.FRIENDS:
                    self.$el.css({
                        background: "linear-gradient(" + Setting.getBackgroundYellowColor() + ", " + Setting.getBackgroundOrangeColor() + " 70%, " + Setting.getBackgroundBlackColor() + " 95%), " + "url( " + Setting.getBackgroundImage() + ")"
                    });
                    break;
                case VIEWTYPE_LIST.PUSHES:
                    self.$el.css({
                        background: "linear-gradient(" + Setting.getBackgroundCyanColor() + ", " + Setting.getBackgroundYellowColor() + " 70%, " + Setting.getBackgroundBlackColor() + " 95%), " + "url( " + Setting.getBackgroundImage() + ")"
                    });
                    break;
                case VIEWTYPE_LIST.STAR:
                    self.$el.css({
                        background: "linear-gradient(" + Setting.getBackgroundGreenColor() + ", " + Setting.getBackgroundCyanColor() + " 70%, " + Setting.getBackgroundBlackColor() + " 95%), " + "url( " + Setting.getBackgroundImage() + ")"
                    });
                    break;
            }
        }
    }
} 