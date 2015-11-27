module IKUT {
    export class FrameView extends BaseView {
        private static TAG: string = "FrameView - ";
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: FrameView = this;
            self.bDebug = false;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        public render(args?: any): any {
            var self: FrameView = this;
            if (self.bDebug) console.log(FrameView.TAG + "render()");

            // apply template
            if (args instanceof Alarm) {
                // apply template
                var stars = (<Alarm>args).getStars();
                var formattedStars = "";
                if (stars > 1000000) {
                    formattedStars = Math.floor(stars / 1000000) + "M";
                } else if (stars > 1000) {
                    formattedStars = Math.floor(stars / 1000) + "K";
                } else {
                    formattedStars = stars.toString();
                }
                if ((<Alarm>args).getType() == ALARM_LIST.DAILY) {
                    var template6 = _.template(Template.getFrameViewTemplate2());
                    var data6 = {
                        header: (<Alarm>args).getName(),
                        //content: (<Alarm>args).getFormattedTime() + ' - <span class="invisible">' + (<Alarm>args).getFormattedEndTime() + '</span>',
                        content: (<Alarm>args).getFormattedTime(),
                        cid: (<Alarm>args).getId(),
                        icon: Setting.getCategoryIcon((<Alarm>args).getCategory()),
                        stars: formattedStars,
                    }
                    self.$el.html(template6(data6));
                } else {
                    
                    var template6 = _.template(Template.getFrameViewTemplate2());
                    var data6 = {
                        header: (<Alarm>args).getName(),
                        //content: (<Alarm>args).getFormattedTime() + ' - <span class="invisible">' + (<Alarm>args).getFormattedEndTime() + '</span>',
                        content: (<Alarm>args).getFormattedTime() + " " + (<Alarm>args).getFormattedDate(),
                        cid: (<Alarm>args).getId(),
                        icon: Setting.getCategoryIcon((<Alarm>args).getCategory()),
                        stars: formattedStars,
                    }
                    self.$el.html(template6(data6));
                }

                
            } else if (args instanceof User) {
                var stars = (<User>args).getStars();
                var formattedStars = "";
                if (stars > 1000000) {
                    formattedStars = Math.floor(stars / 1000000) + "M";
                } else if (stars > 1000) {
                    formattedStars = Math.floor(stars / 1000) + "K";
                } else {
                    formattedStars = stars.toString();
                }
                var template = _.template(Template.getFrameViewTemplate());
                var data = {
                    header: (<User>args).getDescription(),
                    content: (<User>args).getFirstname() + " " + (<User>args).getLastname() + ' <span class="badge"><i class="fa fa-star fa-1x"></i> ' + formattedStars + ' </span>',
                    cid: (<User>args).getId(),
                    icon: 'fa-user',
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

        public render2(args?: any): any {
            var self: Frame2View = this;

            if (args instanceof Alarm) {
                // apply template
                var template = _.template(Template.getFrame2ViewTemplate2());
                var data = {
                    header: (<Alarm>args).getFormattedTime(),
                    content: (<Alarm>args).getName(),
                    cid: (<Alarm>args).getId(),
                    icon: Setting.getCategoryIcon((<Alarm>args).getCategory()),
                    days: (<Alarm>args).getFormattedDate(),
                    users: (<Alarm>args).getUsercIds().length,
                }
                self.$el.html(template(data));

            }

            return self;
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
                    cid: (<Alarm>args).getId(),
                    icon: Setting.getCategoryIcon((<Alarm>args).getCategory()),
                    days: days,
                }
                self.$el.html(template(data));
            }

            return self;
        }
    }
} 