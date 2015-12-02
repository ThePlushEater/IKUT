module IKUT {
    export class DetailView extends BaseView {
        private static TAG: string = "DetailView - ";
        private parentView: BaseView;
        private curAlarm: Alarm;
        private curUser: User;
        private origstars: number;
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

                self.origstars = self.curAlarm.getStars();
                console.log("self.origstars: " + self.origstars);
                var origFormattedStars = "";
                if (self.origstars > 1000000) {
                    origFormattedStars = Math.floor(self.origstars / 1000000) + "M";
                } else if (self.origstars > 1000) {
                    origFormattedStars = Math.floor(self.origstars / 1000) + "K";
                } else {
                    origFormattedStars = self.origstars.toString();
                }

                var exist: Alarm = Model.getAlarms().findWhere({ cid: self.curAlarm.getcId() });
                
                var stars = Model.getCurUser().getStars();
                var formattedStars = "";
                if (stars > 1000000) {
                    formattedStars = Math.floor(stars / 1000000) + "M";
                } else if (stars > 1000) {
                    formattedStars = Math.floor(stars / 1000) + "K";
                } else {
                    formattedStars = stars.toString();
                }

                if (exist) {    // Edit existing alarm
                    
                    // apply template
                    var template = _.template(Template.getDetailViewTemplate());
                    if (self.curAlarm.getType() == ALARM_LIST.DAILY) {  // Daily Alarm
                        // detail
                        var template2 = _.template(Template.getDarilyAlarmEditTemplate());
                        var data2 = {
                            name: self.curAlarm.getName(),
                        }
                        var data = {
                            header: "Daily Alarm Detail",
                            //content: (<Alarm>args).getFormattedTime() + ' - <span class="invisible">' + (<Alarm>args).getFormattedEndTime() + '</span>',
                            content: template2(data2),
                        }
                    } else {                                            // Group Alarm
                        // detail
                        var template5 = _.template(Template.getGroupAlarmEditTemplate());
                        var data5 = {
                            name: self.curAlarm.getName(),
                            users: Model.getUsers(),
                            curUser: Model.getCurUser(),
                            origstars: self.curAlarm.getStars(),
                            stars: formattedStars,
                        }
                        var data = {
                            header: "Group Alarm Detail",
                            //content: (<Alarm>args).getFormattedTime() + ' - <span class="invisible">' + (<Alarm>args).getFormattedEndTime() + '</span>',
                            content: template5(data5),
                        }
                    }
                } else {    // Create a new alarm
                    // apply template
                    var template = _.template(Template.getDetailViewTemplate());
                    if (self.curAlarm.getType() == ALARM_LIST.DAILY) {  // Daily Alarm
                        // detail
                        var template2 = _.template(Template.getDarilyAlarmEditTemplate2());
                        var data2 = {
                            name: self.curAlarm.getName(),
                        }
                        var data = {
                            header: "New Dairly Alarm",
                            //content: (<Alarm>args).getFormattedTime() + ' - <span class="invisible">' + (<Alarm>args).getFormattedEndTime() + '</span>',
                            content: template2(data2),
                        }
                    } else {
                        // detail
                        var template5 = _.template(Template.getGroupAlarmEditTemplate2());
                        var data5 = {
                            name: self.curAlarm.getName(),
                            users: Model.getUsers(),
                            curUser: Model.getCurUser(),
                            origstars: self.curAlarm.getStars(),
                            stars: formattedStars,
                        }
                        var data = {
                            header: "New Group Alarm",
                            //content: (<Alarm>args).getFormattedTime() + ' - <span class="invisible">' + (<Alarm>args).getFormattedEndTime() + '</span>',
                            content: template5(data5),
                        }
                    }
                }


                self.$el.html(template(data));


                // add time picker
                $('#time-start').datetimepicker({
                    format: 'LT',
                    defaultDate: self.curAlarm.getDate(),
                });

                // add datetime picker
                $('#datetime').datetimepicker({
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

                $('#category').selectpicker('val', self.curAlarm.getCategory());

                $('#days').selectpicker({
                    size: 'false',
                    mobile: true,
                });

                $('#participants').selectpicker({
                    size: 'false',
                    mobile: true,
                    countSelectedText: function (numSelected, numTotal) {
                        return (numSelected == 1) ? "{0} member added" : "{0} members added";
                    },
                });

                var cids: Array<string> = self.curAlarm.getUsercIds();
                $('#participants').selectpicker('val', cids);

                // composite days
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
                if (exist2) {    // Edit existing User
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

                    // add recent group alarm
                    var alarms: Alarms = Model.getAlarms().getPastGroupAlarmsForUsers(Model.getCurUser(), self.curUser);
                    if (alarms.models.length > 0) {
                        var recent: Alarm = alarms.models[0];
                        self.$('#recent').val(recent.getFormattedTime() + " " + recent.getFormattedDate() + " - " + recent.getName());
                    } else {
                        self.$('#recent').val("No Recent Group Alarm");
                    }
                    

                    // add event listener
                    self.addEventListener2();
                } else {    // Add new User
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

                    self.renderNonAddedUsers();
                    // add event listener
                    self.addEventListener3();
                }
                
            }

            
            return self;
        }

        public renderNonAddedUsers(): void {
            var self: DetailView = this;

            var users: Users = Model.getNonAddedUsers();

            var template = _.template(Template.getUserItemTemplate());
            var data = {
                users: users,
            }
            self.$('#userlist').html(template(data));

            $('#userlist').btsListFilter('#searchname', { 
                itemChild: 'span',
                sourceTmpl: '<div class="user-item"><span class="col-xs-10 ">{title}</span><i class="col-xs-2 fa fa-plus-square fa-1x btn-add"></i></div><div class="clear" />',
                itemEl: '.user-item',
                emptyNode: function (data) {
                    return '<div class="user-item-none">No Result</div><div class="clear" />';
                },
            });
        }

        public setParentView(view: BaseView) {
            var self: DetailView = this;
            self.parentView = view;
        }

        public addEventListener(): void {
            var self: DetailView = this;
            self.$('#btn-save').off('click');
            self.$('#btn-save').on('click', function () {
                click1.play();
                View.setIsLoading(true);
                // remove all warnings
                self.$('.warn').addClass('hidden');
                // check valid time.
                var isError: boolean = false;
                if (self.$('#datetime').length) {
                    if (self.$('#stars').val() == 0 || self.$('#stars').val() == "" || (Model.getCurUser().getStars() + self.origstars < parseInt(self.$('#stars').val()))) {
                        self.$('.warn-stars').removeClass('hidden');
                        isError = true;
                    }
                    if (moment(self.$('#datetime').data("date")).valueOf() < moment(new Date()).valueOf()) {
                        self.$('.warn-datetime').removeClass('hidden');
                        isError = true;
                    }
                    if (self.$('#name').val() == "") {
                        self.$('.warn-name').removeClass('hidden');
                        isError = true;
                    }

                    if (isError) {
                        View.setIsLoading(false);
                        return;
                    }
                }

                var orig: Alarm = Model.getAlarms().findWhere({ cid: self.curAlarm.getcId() });

                

                // set name
                self.curAlarm.set('name', self.$('#name').val());
                orig.set('name', self.$('#name').val());
                
                // set time
                if (self.$('#datetime').length) {
                    self.curAlarm.set('date', moment(self.$('#datetime').data("date")).format(Setting.getDateTimeFormat1()));
                    orig.set('date', moment(self.$('#datetime').data("date")).format(Setting.getDateTimeFormat1()));
                } else {
                    //console.log(self.curAlarm.getFormattedTime());
                    self.curAlarm.set('date', moment(moment(new Date()).format(Setting.getDateFormat()) + " " + self.$('#time-start').data("date")).format(Setting.getDateTimeFormat1()));
                    orig.set('date', moment(moment(new Date()).format(Setting.getDateFormat()) + " " + self.$('#time-start').data("date")).format(Setting.getDateTimeFormat1()));
                    //console.log(self.curAlarm.getFormattedTime());
                    //console.log($('#time-start').data("date"));
                }

                
                // stars
                if (self.$('#datetime').length) {
                    self.curAlarm.set('stars', parseInt($('#stars').val()));
                    orig.set('stars', parseInt($('#stars').val()));
                    Model.getCurUser().set('stars', Model.getCurUser().getStars() + self.origstars - parseInt($('#stars').val()));
                }


                // category
                self.curAlarm.set('category', parseInt($('#category option:selected').val()));
                orig.set('category', parseInt($('#category option:selected').val()));

                // days
                self.curAlarm.removeDailyAllDays();
                $.each(self.$('#days option:selected'), function (index: number, item: any) {
                    self.curAlarm.addDailyDay(parseInt($(item).val()));
                    orig.addDailyDay(parseInt($(item).val()));
                });

                // participants
                if (self.$('#participants').length) {
                    self.curAlarm.removeAllUsers();
                    //self.curAlarm.addUsercId(Model.getCurUser().getcId());
                    $.each(self.$('#participants option:selected'), function (index: number, item: any) {
                        self.curAlarm.addUsercId($(item).val());
                    });
                }

                // back to parentview
                self.parentView.animInactive();
            });

            self.$('#btn-delete').off('click');
            self.$('#btn-delete').on('click', function () {
                click1.play();
                View.setIsLoading(true);
                var orig: Alarm = Model.getAlarms().findWhere({ cid: self.curAlarm.getcId() });
                Model.getAlarms().remove(orig);
                self.parentView.animInactive();
            });

            self.$('#btn-create').off('click');
            self.$('#btn-create').on('click', function () {
                click1.play();
                View.setIsLoading(true);
                // remove all warnings
                self.$('.warn').addClass('hidden');
                // check valid time.
                var isError: boolean = false;
                if (self.$('#datetime').length) {
                    if (self.$('#stars').val() == 0 || self.$('#stars').val() == "" || (Model.getCurUser().getStars() < parseInt(self.$('#stars').val()))) {
                        self.$('.warn-stars').removeClass('hidden');
                        isError = true;
                    }
                    if (moment(self.$('#datetime').data("date")).valueOf() < moment(new Date()).valueOf()) {
                        self.$('.warn-datetime').removeClass('hidden');
                        isError = true;
                    }
                    if (self.$('#name').val() == "") {
                        self.$('.warn-name').removeClass('hidden');
                        isError = true;
                    }
                    if (isError) {
                        View.setIsLoading(false);
                        return;
                    }
                }

                Model.getAlarms().add(self.curAlarm);
                //var orig: Alarm = self.curAlarm;


                // set name
                self.curAlarm.set('name', self.$('#name').val());
                //orig.set('name', self.$('#name').val());
                
                // set time
                if (self.$('#datetime').length) {
                    self.curAlarm.set('date', moment(self.$('#datetime').data("date")).format(Setting.getDateTimeFormat1()));
                } else {
                    //console.log(self.curAlarm.getFormattedTime());
                    self.curAlarm.set('date', moment(moment(new Date()).format(Setting.getDateFormat()) + " " + self.$('#time-start').data("date")).format(Setting.getDateTimeFormat1()));
                    //console.log(self.curAlarm.getFormattedTime());
                    //console.log($('#time-start').data("date"));
                }

                //console.log(self.curAlarm.getFormattedTime());
                
                //orig.set('date', moment(moment(new Date()).format(Setting.getDateFormat()) + " " + self.$('#time-start').data("date")).format(Setting.getDateTimeFormat1()));
                //console.log(self.curAlarm.getFormattedTime());
                //console.log($('#time-start').data("date"));

                // stars
                if (self.$('#stars').length) {
                    self.curAlarm.set('stars', parseInt($('#stars').val()));
                    Model.getCurUser().set('stars', Model.getCurUser().getStars() - parseInt($('#stars').val()));
                } else {
                    self.curAlarm.set('stars', 5);
                }
                


                // category
                self.curAlarm.set('category', parseInt($('#category option:selected').val()));
                //orig.set('category', parseInt($('#category option:selected').val()));

                // days
                self.curAlarm.removeDailyAllDays();
                $.each(self.$('#days option:selected'), function (index: number, item: any) {
                    self.curAlarm.addDailyDay(parseInt($(item).val()));
                    //orig.addDailyDay(parseInt($(item).val()));
                });

                // participants
                if (self.$('#participants').length) {
                    self.curAlarm.removeAllUsers();
                    //self.curAlarm.addUsercId(Model.getCurUser().getcId());
                    $.each(self.$('#participants option:selected'), function (index: number, item: any) {
                        self.curAlarm.addUsercId($(item).val());
                    });
                }

                // back to parentview
                self.parentView.animInactive();
            });
        }

        public addEventListener2(): void {
            var self: DetailView = this;
            self.$('#btn-save').off('click');
            self.$('#btn-save').on('click', function () {
                click1.play();
                View.setIsLoading(true);
                self.curUser.set('description', self.$('#description').val());
                // back to parentview
                self.parentView.animInactive();
            });
            self.$('#btn-delete').off('click');
            self.$('#btn-delete').on('click', function () {
                click1.play();
                View.setIsLoading(true);
                Model.getUsers().remove(self.curUser);
                Model.getNonAddedUsers().add(self.curUser);
                self.parentView.animInactive();
            });
        }

        public addEventListener3(): void {
            var self: DetailView = this;
            self.$('#searchname').off('keydown');
            self.$('#searchname').on('keydown', function () {
                click1.play();
                View.setIsLoading(true);
                setTimeout(function () {
                    if (self.$('#searchname').val() != "") {
                        self.$('#wrapper-userlist').removeClass('hidden');
                    } else {
                        self.$('#wrapper-userlist').addClass('hidden');
                    }
                    View.setIsLoading(false);
                }, 250);
            });
            self.$('.btn-add').off('click');
            self.$('.btn-add').on('click', function () {
                click1.play();
                View.setIsLoading(true);
                var cid = $(this).attr('data-cid');

                var user: User = Model.getNonAddedUsers().findWhere({ cid: cid });
                user.set("created", moment(new Date()).format(Setting.getDateTimeFormat1()));
                Model.getNonAddedUsers().remove(user);
                Model.getUsers().add(user);

                $('#searchname').val("");
                self.$('#wrapper-userlist').addClass('hidden');
                self.renderNonAddedUsers();
                self.addEventListener3();

                // back to parentview
                self.parentView.animInactive();
            });
        }
    }
}