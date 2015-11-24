module IKUT {
    export class AlarmsView extends BaseView {
        private static TAG: string = "AlarmsView - ";
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


            $.each(self.$('.wrapper-button'), function (index: number, item: JQuery) {
                ButtonViewFractory.create($(item)).render();
            });       

            $.each(self.$('.wrapper-notification'), function (index: number, item: JQuery) {
                var f2v: Frame2View = Frame2ViewFractory.create($(item));
                f2v.render(alarms.models[index]);
            });       

            // Make the view slowly visible.
            self.setElement(self.$('#wrapper-alarms'));
            self.animVisible();

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
    }
} 