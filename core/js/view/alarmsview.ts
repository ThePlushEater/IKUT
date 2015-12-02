module IKUT {
    export class AlarmsView extends BaseView {
        private static TAG: string = "AlarmsView - ";
        public sideView: SideView;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: AlarmsView = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        public render(args?: any): any {
            var self: AlarmsView = this;
            if (self.bDebug) console.log(AlarmsView.TAG + "render()");

            // get alarms
            var alarms: Alarms = Controller.getDailyAlarms();

            // apply template
            var template = _.template(Template.getAlarmsViewTemplate());
            var data = {
                alarms: alarms,
            }
            self.$el.html(template(data));


            var bf: ButtonView = ButtonViewFractory.create(self.$('.wrapper-button'), { icon: 'fa-plus-square', content: 'Add a New Daily Alarm', behavior: 'btn-add', isLeft: false });
            bf.render();

            $.each(self.$('.wrapper-notification'), function (index: number, item: JQuery) {
                var f2v: Frame2View = Frame2ViewFractory.create($(item));
                f2v.render(alarms.models[index]);
            });

            // Make the view slowly visible.
            self.setElement(self.$('#wrapper-alarms'));
            self.animVisible();

            self.addEventListener();

            return self;
        }

        public update(args?: any): any {
            var self: AlarmsView = this;
            if (self.bDebug) console.log(AlarmsView.TAG + "update()");

            // get alarms
            var alarms: Alarms = Controller.getDailyAlarms();

            // apply template
            var template = _.template(Template.getAlarmsViewTemplate2());
            var data = {
                alarms: alarms,
            }
            self.$el.html(template(data));


            var bf: ButtonView = ButtonViewFractory.create(self.$('.wrapper-button'), { icon: 'fa-plus-square', content: 'Add a New Daily Alarm', behavior: 'btn-add', isLeft: false });
            bf.render();    

            $.each(self.$('.wrapper-notification'), function (index: number, item: JQuery) {
                var f2v: Frame2View = Frame2ViewFractory.create($(item));
                f2v.render(alarms.models[index]);
            });

            self.addEventListener();

            return self;
        }

        public animVisible(): void {
            var self: AlarmsView = this;
            setTimeout(function () {
                self.$el.animate({ opacity: 1 }, function () {
                    View.setIsLoading(false);
                });
            }, Setting.getViewTransitionDuration() * 2);
        }

        public animActive(): void {
            var self: AlarmsView = this;
            setTimeout(function () {
                self.$el.animate({ left: 0 }, function () {
                    View.setIsLoading(false);
                    self.sideView.destroy();
                    self.sideView = null;
                });
            }, Setting.getViewTransitionDuration() * 2);
        }

        public animInactive(): void {
            var self: AlarmsView = this;
            setTimeout(function () {
                self.$el.animate({ left: -self.getWidth() }, function () {
                    View.setIsLoading(false);
                });
            }, Setting.getViewTransitionDuration() * 2);
        }

        public addEventListener(): void {
            var self: AlarmsView = this;
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

                        click1.play();
                    } else {
                        // Error handling
                    }
                }
            });


            self.$('.btn-add').addClass('btn-color1');
            self.$('.btn-add').off('click');
            self.$('.btn-add').on('click', function () {
                if (!View.getIsLoading()) {
                    View.setIsLoading(true);
                    self.sideView = SideViewFractory.create($('#wrapper-main'));
                    self.sideView.setParentView(self);
                    var today: Moment = moment(new Date());
                    var alarm: Alarm = new Alarm({ name: '', users: "", type: ALARM_LIST.DAILY, date: today.format(Setting.getDateTimeFormat1()), end: today.format(Setting.getDateTimeFormat1()), days: "0000000", category: 0, stars: 5 });
                    alarm.addDailyDay(moment().day());
                    alarm.addUsercId(Model.getCurUser().getcId());
                    //var cid = $(this).attr('data-cid');
                    //var alarm: Alarm = Model.getAlarms().findWhere({ cid: cid });
                    if (alarm) {
                        self.sideView.render(alarm);

                        self.animInactive();
                        self.sideView.animActive();

                        click1.play();
                    } else {
                        // Error handling
                    }
                }
            });
        }
    }
} 