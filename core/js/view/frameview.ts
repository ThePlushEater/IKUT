module IKUT {
    export class FrameView extends BaseView {
        private static TAG: string = "FrameView - ";
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: FrameView = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        public render(args?: any): any {
            var self: FrameView = this;
            if (self.bDebug) console.log(FrameView.TAG + "render()");

            // apply template
            if (args instanceof Alarm) {
                // apply template
                var template = _.template(Template.getFrameViewTemplate());
                var data = {
                    header: (<Alarm>args).getFormattedTime(),
                    content: (<Alarm>args).getName(),
                    collapse: (<Alarm>args).getcId(),
                }
                self.$el.html(template(data));
            }

            return self;
        }
    }

    export class Frame2View extends BaseView {
        private static TAG: string = "Frame2View - ";
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: Frame2View = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        public render(args?: any): any {
            var self: Frame2View = this;
            if (self.bDebug) console.log(Frame2View.TAG + "render()");

            if (args instanceof Alarm) {
                var days = '';
                if ((<Alarm>args).getIsDailyDayOn(DAY_LIST.MONDAY)) {
                    days += '<span class="">M</span>';
                } else {
                    days += '<span class="frame2-day-inactive">M</span>';
                }
                if ((<Alarm>args).getIsDailyDayOn(DAY_LIST.TUESDAY)) {
                    days += '<span class="">T</span>';
                } else {
                    days += '<span class="frame2-day-inactive">T</span>';
                }
                if ((<Alarm>args).getIsDailyDayOn(DAY_LIST.WEDNESDAY)) {
                    days += '<span class="">W</span>';
                } else {
                    days += '<span class="frame2-day-inactive">W</span>';
                }
                if ((<Alarm>args).getIsDailyDayOn(DAY_LIST.THURSDAY)) {
                    days += '<span class="">T</span>';
                } else {
                    days += '<span class="frame2-day-inactive">T</span>';
                }
                if ((<Alarm>args).getIsDailyDayOn(DAY_LIST.FRIDAY)) {
                    days += '<span class="">F</span>';
                } else {
                    days += '<span class="frame2-day-inactive">F</span>';
                }
                if ((<Alarm>args).getIsDailyDayOn(DAY_LIST.SATURDAY)) {
                    days += '<span class="">S</span>';
                } else {
                    days += '<span class="frame2-day-inactive">S</span>';
                }
                if ((<Alarm>args).getIsDailyDayOn(DAY_LIST.SUNDAY)) {
                    days += '<span class="">S</span>';
                } else {
                    days += '<span class="frame2-day-inactive">S</span>';
                }
                // apply template
                var template = _.template(Template.getFrame2ViewTemplate());
                var data = {
                    header: (<Alarm> args).getFormattedTime(),
                    content: (<Alarm>args).getName(),
                    collapse: (<Alarm>args).getcId(),
                    days: days,
                }
                self.$el.html(template(data));
            }

            return self;
        }
    }
} 