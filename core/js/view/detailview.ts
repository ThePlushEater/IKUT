module IKUT {
    export class DetailView extends BaseView {
        private static TAG: string = "DetailView - ";
        private parentView: BaseView;
        private curAlarm: Alarm;
        private curUser: User;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: DetailView = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        public render(args?: any): any {
            var self: DetailView = this;
            if (self.bDebug) console.log(DetailView.TAG + "render()");

            // apply template
            if (args instanceof Alarm) {
                self.curAlarm = <Alarm>args;

                var exist: Alarm = Model.getAlarms().findWhere({ cid: self.curAlarm.getcId() });


                if (exist) {    // Edit existing alarm
                    // detail
                    var template2 = _.template(Template.getDarilyAlarmEditTemplate());
                    var data2 = {
                        name: self.curAlarm.getName(),
                    }
                    // apply template
                    var template = _.template(Template.getDetailViewTemplate());
                    if (self.curAlarm.getType() == ALARM_LIST.DAILY) {  // Daily Alarm
                        var data = {
                            header: "Daily Alarm Detail",
                            //content: (<Alarm>args).getFormattedTime() + ' - <span class="invisible">' + (<Alarm>args).getFormattedEndTime() + '</span>',
                            content: template2(data2),
                        }
                    } else {

                    }
                } else {    // Create a new alarm
                    // detail
                    var template2 = _.template(Template.getDarilyAlarmEditTemplate2());
                    var data2 = {
                        name: self.curAlarm.getName(),
                    }
                    // apply template
                    var template = _.template(Template.getDetailViewTemplate());
                    if (self.curAlarm.getType() == ALARM_LIST.DAILY) {  // Daily Alarm
                        var data = {
                            header: "Create a New Alarm",
                            //content: (<Alarm>args).getFormattedTime() + ' - <span class="invisible">' + (<Alarm>args).getFormattedEndTime() + '</span>',
                            content: template2(data2),
                        }
                    } else {

                    }
                }


                self.$el.html(template(data));


                // add time picker
                $('#time-start').datetimepicker({
                    format: 'LT',
                    defaultDate: self.curAlarm.getDate(),
                });
                /*
                .on("dp.change", function (event) {
                    console.log(event.date);
                });
                 */

                $('#category').selectpicker({
                    size: 'false',
                    mobile: true,
                });

                console.log(self.curAlarm.getCategory());
                $('#category').selectpicker('val', self.curAlarm.getCategory());

                $('#days').selectpicker({
                    size: 'false',
                    mobile: true,
                });

                var days: Array<number> = new Array<number>();
                if (self.curAlarm.getIsDailyDayOn(DAY_LIST.MONDAY)) {
                    days.push(0);
                }
                if (self.curAlarm.getIsDailyDayOn(DAY_LIST.TUESDAY)) {
                    days.push(1);
                }
                if (self.curAlarm.getIsDailyDayOn(DAY_LIST.WEDNESDAY)) {
                    days.push(2);
                }
                if (self.curAlarm.getIsDailyDayOn(DAY_LIST.THURSDAY)) {
                    days.push(3);
                }
                if (self.curAlarm.getIsDailyDayOn(DAY_LIST.FRIDAY)) {
                    days.push(4);
                }
                if (self.curAlarm.getIsDailyDayOn(DAY_LIST.SATURDAY)) {
                    days.push(5);
                }
                if (self.curAlarm.getIsDailyDayOn(DAY_LIST.SUNDAY)) {
                    days.push(6);
                }
                $('#days').selectpicker('val', days);

                self.addEventListener();
            } else if (args instanceof User) {  // Render User

                self.curUser = <User>args;
                var exist2: User = Model.getUsers().findWhere({ cid: self.curUser.getcId() });
                if (exist2) {    // Edit existing alarm
                    // detail
                    var template3 = _.template(Template.getUserEditTemplate());
                    var data3 = {
                        username: self.curUser.getUsername(),
                        firstname: self.curUser.getFirstname(),
                        lastname: self.curUser.getLastname(),
                        description: self.curUser.getDescription(),
                        created: self.curUser.getFormattedCreatedDate(),
                    }
                    // apply template
                    var template = _.template(Template.getDetailViewTemplate());
                    var data = {
                        header: "Friend Detail",
                        //content: (<Alarm>args).getFormattedTime() + ' - <span class="invisible">' + (<Alarm>args).getFormattedEndTime() + '</span>',
                        content: template3(data3),
                    }
                    self.$el.html(template(data));
                    // add event listener
                    self.addEventListener2();
                } else {
                    var template4 = _.template(Template.getUserAddTemplate());
                    var data4 = {
                        
                    }
                    // apply template
                    var template = _.template(Template.getDetailViewTemplate());
                    var data = {
                        header: "Friend Search",
                        //content: (<Alarm>args).getFormattedTime() + ' - <span class="invisible">' + (<Alarm>args).getFormattedEndTime() + '</span>',
                        content: template4(data4),
                    }
                    self.$el.html(template(data));
                }
                
            }

            
            return self;
        }

        public setParentView(view: BaseView) {
            var self: DetailView = this;
            self.parentView = view;
        }

        public addEventListener(): void {
            var self: DetailView = this;
            self.$('#btn-save').off('click');
            self.$('#btn-save').on('click', function () {
                var orig: Alarm = Model.getAlarms().findWhere({ cid: self.curAlarm.getcId() });

                // set name
                self.curAlarm.set('name', self.$('#name').val());
                orig.set('name', self.$('#name').val());
                
                // set time
                //console.log(self.curAlarm.getFormattedTime());
                self.curAlarm.set('date', moment(moment(new Date()).format(Setting.getDateFormat()) + " " + self.$('#time-start').data("date")).format(Setting.getDateTimeFormat1()));
                orig.set('date', moment(moment(new Date()).format(Setting.getDateFormat()) + " " + self.$('#time-start').data("date")).format(Setting.getDateTimeFormat1()));
                //console.log(self.curAlarm.getFormattedTime());
                //console.log($('#time-start').data("date"));

                // category
                self.curAlarm.set('category', parseInt($('#category option:selected').val()));
                orig.set('category', parseInt($('#category option:selected').val()));

                // days
                self.curAlarm.removeDailyAllDays();
                $.each(self.$('#days option:selected'), function (index: number, item: any) {
                    self.curAlarm.addDailyDay(parseInt($(item).val()));
                    orig.addDailyDay(parseInt($(item).val()));
                });

                // back to parentview
                self.parentView.animInactive();
            });

            self.$('#btn-delete').off('click');
            self.$('#btn-delete').on('click', function () {
                View.setIsLoading(true);
                var orig: Alarm = Model.getAlarms().findWhere({ cid: self.curAlarm.getcId() });
                Model.getAlarms().remove(orig);
                self.parentView.animInactive();
            });

            self.$('#btn-create').off('click');
            self.$('#btn-create').on('click', function () {
                Model.getAlarms().add(self.curAlarm);
                //var orig: Alarm = self.curAlarm;

                // set name
                self.curAlarm.set('name', self.$('#name').val());
                //orig.set('name', self.$('#name').val());
                
                // set time
                //console.log(self.curAlarm.getFormattedTime());
                self.curAlarm.set('date', moment(moment(new Date()).format(Setting.getDateFormat()) + " " + self.$('#time-start').data("date")).format(Setting.getDateTimeFormat1()));
                //orig.set('date', moment(moment(new Date()).format(Setting.getDateFormat()) + " " + self.$('#time-start').data("date")).format(Setting.getDateTimeFormat1()));
                //console.log(self.curAlarm.getFormattedTime());
                //console.log($('#time-start').data("date"));

                // category
                self.curAlarm.set('category', parseInt($('#category option:selected').val()));
                //orig.set('category', parseInt($('#category option:selected').val()));

                // days
                self.curAlarm.removeDailyAllDays();
                $.each(self.$('#days option:selected'), function (index: number, item: any) {
                    self.curAlarm.addDailyDay(parseInt($(item).val()));
                    //orig.addDailyDay(parseInt($(item).val()));
                });

                // back to parentview
                self.parentView.animInactive();
            });
        }

        public addEventListener2(): void {
            var self: DetailView = this;
            self.$('#btn-save').off('click');
            self.$('#btn-save').on('click', function () {
                self.curUser.set('description', self.$('#description').val());
                // back to parentview
                self.parentView.animInactive();
            });
            self.$('#btn-delete').off('click');
            self.$('#btn-delete').on('click', function () {
                View.setIsLoading(true);
                Model.getUsers().remove(self.curUser);
                self.parentView.animInactive();
            });
        }
    }
}