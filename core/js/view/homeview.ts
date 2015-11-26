module IKUT {
    export class HomeView extends BaseView {
        private static TAG: string = "HomeView - ";
        public sideView: SideView;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: HomeView = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        public render(args?: any): any {
            var self: HomeView = this;
            if (self.bDebug) console.log(HomeView.TAG + "render()");

            // get alarms
            var alarms: Alarms = Controller.getUpcoming7DaysAlarms();

            // apply template
            var template = _.template(Template.getHomeViewTemplate());
            var data = {
                alarms: alarms,
            }
            self.$el.html(template(data));

            self.setElement(self.$('#wrapper-home'));
            self.animVisible();

            $.each(self.$('.wrapper-notification'), function (index: number, item: JQuery) {
                var fv: FrameView = FrameViewFractory.create($(item));
                fv.render(alarms.models[index]);
            });       

            self.addEventListener();

            return self;
        }

        public update(args?: any): any {
            var self: HomeView = this;
            if (self.bDebug) console.log(HomeView.TAG + "update()");

            // get alarms
            var alarms: Alarms = Controller.getUpcoming7DaysAlarms();

            // apply template
            var template = _.template(Template.getHomeViewTemplate2());
            var data = {
                alarms: alarms,
            }
            self.$el.html(template(data));

            //self.setElement(self.$('#wrapper-home'));
            //self.setVisible();

            $.each(self.$('.wrapper-notification'), function (index: number, item: JQuery) {
                var fv: FrameView = FrameViewFractory.create($(item));
                fv.render(alarms.models[index]);
            });

            self.addEventListener();

            return self;
        }

        public animVisible(): void {
            var self: HomeView = this;
            setTimeout(function () {
                self.$el.animate({ opacity: 1 }, function () {
                    View.setIsLoading(false);
                });
            }, Setting.getViewTransitionDuration() * 2);
        }

        public animActive(): void {
            var self: HomeView = this;
            setTimeout(function () {
                self.$el.animate({ left: 0 }, function () {
                    View.setIsLoading(false);
                    self.sideView.destroy();
                    self.sideView = null;
                });
            }, Setting.getViewTransitionDuration() * 2);
        }

        public animInactive(): void {
            var self: HomeView = this;
            setTimeout(function () {
                self.$el.animate({ left: -self.getWidth() }, function () {
                    View.setIsLoading(false);
                });
            }, Setting.getViewTransitionDuration() * 2);
        }

        public addEventListener(): void {
            var self: HomeView = this;
            self.$('.btn-detail').off('click');
            self.$('.btn-detail').on('click', function () {
                if (!View.getIsLoading()) {
                    View.setIsLoading(true);
                    self.sideView = SideViewFractory.create($('#wrapper-main'));
                    self.sideView.setParentView(self);
                    var cid = $(this).attr('data-cid');
                    var alarm: Alarm = Model.getAlarms().findWhere({ cid: cid });
                    if (alarm) {
                        self.sideView.render(alarm);

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