var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IKUT;
(function (IKUT) {
    var DetailView = (function (_super) {
        __extends(DetailView, _super);
        function DetailView(options) {
            _super.call(this, options);
            var self = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        DetailView.prototype.render = function (args) {
            var self = this;
            if (self.bDebug)
                console.log(DetailView.TAG + "render()");
            // apply template
            if (args instanceof IKUT.Alarm) {
                self.curAlarm = args;
                self.origstars = self.curAlarm.getStars();
                console.log("self.origstars: " + self.origstars);
                var origFormattedStars = "";
                if (self.origstars > 1000000) {
                    origFormattedStars = Math.floor(self.origstars / 1000000) + "M";
                }
                else if (self.origstars > 1000) {
                    origFormattedStars = Math.floor(self.origstars / 1000) + "K";
                }
                else {
                    origFormattedStars = self.origstars.toString();
                }
                var exist = IKUT.Model.getAlarms().findWhere({ cid: self.curAlarm.getcId() });
                var stars = IKUT.Model.getCurUser().getStars();
                var formattedStars = "";
                if (stars > 1000000) {
                    formattedStars = Math.floor(stars / 1000000) + "M";
                }
                else if (stars > 1000) {
                    formattedStars = Math.floor(stars / 1000) + "K";
                }
                else {
                    formattedStars = stars.toString();
                }
                if (exist) {
                    // apply template
                    var template = _.template(IKUT.Template.getDetailViewTemplate());
                    if (self.curAlarm.getType() == 1 /* DAILY */) {
                        // detail
                        var template2 = _.template(IKUT.Template.getDarilyAlarmEditTemplate());
                        var data2 = {
                            name: self.curAlarm.getName(),
                        };
                        var data = {
                            header: "Daily Alarm Detail",
                            //content: (<Alarm>args).getFormattedTime() + ' - <span class="invisible">' + (<Alarm>args).getFormattedEndTime() + '</span>',
                            content: template2(data2),
                        };
                    }
                    else {
                        // detail
                        var template5 = _.template(IKUT.Template.getGroupAlarmEditTemplate());
                        var data5 = {
                            name: self.curAlarm.getName(),
                            users: IKUT.Model.getUsers(),
                            curUser: IKUT.Model.getCurUser(),
                            origstars: self.curAlarm.getStars(),
                            stars: formattedStars,
                        };
                        var data = {
                            header: "Group Alarm Detail",
                            //content: (<Alarm>args).getFormattedTime() + ' - <span class="invisible">' + (<Alarm>args).getFormattedEndTime() + '</span>',
                            content: template5(data5),
                        };
                    }
                }
                else {
                    // apply template
                    var template = _.template(IKUT.Template.getDetailViewTemplate());
                    if (self.curAlarm.getType() == 1 /* DAILY */) {
                        // detail
                        var template2 = _.template(IKUT.Template.getDarilyAlarmEditTemplate2());
                        var data2 = {
                            name: self.curAlarm.getName(),
                        };
                        var data = {
                            header: "New Dairly Alarm",
                            //content: (<Alarm>args).getFormattedTime() + ' - <span class="invisible">' + (<Alarm>args).getFormattedEndTime() + '</span>',
                            content: template2(data2),
                        };
                    }
                    else {
                        // detail
                        var template5 = _.template(IKUT.Template.getGroupAlarmEditTemplate2());
                        var data5 = {
                            name: self.curAlarm.getName(),
                            users: IKUT.Model.getUsers(),
                            curUser: IKUT.Model.getCurUser(),
                            origstars: self.curAlarm.getStars(),
                            stars: formattedStars,
                        };
                        var data = {
                            header: "New Group Alarm",
                            //content: (<Alarm>args).getFormattedTime() + ' - <span class="invisible">' + (<Alarm>args).getFormattedEndTime() + '</span>',
                            content: template5(data5),
                        };
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
                var cids = self.curAlarm.getUsercIds();
                $('#participants').selectpicker('val', cids);
                // composite days
                var days = new Array();
                if (self.curAlarm.getIsDailyDayOn(0 /* MONDAY */)) {
                    days.push(0);
                }
                if (self.curAlarm.getIsDailyDayOn(1 /* TUESDAY */)) {
                    days.push(1);
                }
                if (self.curAlarm.getIsDailyDayOn(2 /* WEDNESDAY */)) {
                    days.push(2);
                }
                if (self.curAlarm.getIsDailyDayOn(3 /* THURSDAY */)) {
                    days.push(3);
                }
                if (self.curAlarm.getIsDailyDayOn(4 /* FRIDAY */)) {
                    days.push(4);
                }
                if (self.curAlarm.getIsDailyDayOn(5 /* SATURDAY */)) {
                    days.push(5);
                }
                if (self.curAlarm.getIsDailyDayOn(6 /* SUNDAY */)) {
                    days.push(6);
                }
                $('#days').selectpicker('val', days);
                self.addEventListener();
            }
            else if (args instanceof IKUT.User) {
                self.curUser = args;
                var exist2 = IKUT.Model.getUsers().findWhere({ cid: self.curUser.getcId() });
                if (exist2) {
                    // detail
                    var template3 = _.template(IKUT.Template.getUserEditTemplate());
                    var data3 = {
                        username: self.curUser.getUsername(),
                        firstname: self.curUser.getFirstname(),
                        lastname: self.curUser.getLastname(),
                        description: self.curUser.getDescription(),
                        created: self.curUser.getFormattedCreatedDate(),
                    };
                    // apply template
                    var template = _.template(IKUT.Template.getDetailViewTemplate());
                    var data = {
                        header: "Friend Detail",
                        //content: (<Alarm>args).getFormattedTime() + ' - <span class="invisible">' + (<Alarm>args).getFormattedEndTime() + '</span>',
                        content: template3(data3),
                    };
                    self.$el.html(template(data));
                    // add recent group alarm
                    var alarms = IKUT.Model.getAlarms().getPastGroupAlarmsForUsers(IKUT.Model.getCurUser(), self.curUser);
                    if (alarms.models.length > 0) {
                        var recent = alarms.models[0];
                        self.$('#recent').val(recent.getFormattedTime() + " " + recent.getFormattedDate() + " - " + recent.getName());
                    }
                    else {
                        self.$('#recent').val("No Recent Group Alarm");
                    }
                    // add event listener
                    self.addEventListener2();
                }
                else {
                    var template4 = _.template(IKUT.Template.getUserAddTemplate());
                    var data4 = {};
                    // apply template
                    var template = _.template(IKUT.Template.getDetailViewTemplate());
                    var data = {
                        header: "Friend Search",
                        //content: (<Alarm>args).getFormattedTime() + ' - <span class="invisible">' + (<Alarm>args).getFormattedEndTime() + '</span>',
                        content: template4(data4),
                    };
                    self.$el.html(template(data));
                    self.renderNonAddedUsers();
                    // add event listener
                    self.addEventListener3();
                }
            }
            return self;
        };
        DetailView.prototype.renderNonAddedUsers = function () {
            var self = this;
            var users = IKUT.Model.getNonAddedUsers();
            var template = _.template(IKUT.Template.getUserItemTemplate());
            var data = {
                users: users,
            };
            self.$('#userlist').html(template(data));
            $('#userlist').btsListFilter('#searchname', {
                itemChild: 'span',
                sourceTmpl: '<div class="user-item"><span class="col-xs-10 ">{title}</span><i class="col-xs-2 fa fa-plus-square fa-1x btn-add"></i></div><div class="clear" />',
                itemEl: '.user-item',
                emptyNode: function (data) {
                    return '<div class="user-item-none">No Result</div><div class="clear" />';
                },
            });
        };
        DetailView.prototype.setParentView = function (view) {
            var self = this;
            self.parentView = view;
        };
        DetailView.prototype.addEventListener = function () {
            var self = this;
            self.$('#btn-save').off('click');
            self.$('#btn-save').on('click', function () {
                click1.play();
                IKUT.View.setIsLoading(true);
                // remove all warnings
                self.$('.warn').addClass('hidden');
                // check valid time.
                var isError = false;
                if (self.$('#datetime').length) {
                    if (self.$('#stars').val() == 0 || self.$('#stars').val() == "" || (IKUT.Model.getCurUser().getStars() + self.origstars < parseInt(self.$('#stars').val()))) {
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
                        IKUT.View.setIsLoading(false);
                        return;
                    }
                }
                var orig = IKUT.Model.getAlarms().findWhere({ cid: self.curAlarm.getcId() });
                // set name
                self.curAlarm.set('name', self.$('#name').val());
                orig.set('name', self.$('#name').val());
                // set time
                if (self.$('#datetime').length) {
                    self.curAlarm.set('date', moment(self.$('#datetime').data("date")).format(IKUT.Setting.getDateTimeFormat1()));
                    orig.set('date', moment(self.$('#datetime').data("date")).format(IKUT.Setting.getDateTimeFormat1()));
                }
                else {
                    //console.log(self.curAlarm.getFormattedTime());
                    self.curAlarm.set('date', moment(moment(new Date()).format(IKUT.Setting.getDateFormat()) + " " + self.$('#time-start').data("date")).format(IKUT.Setting.getDateTimeFormat1()));
                    orig.set('date', moment(moment(new Date()).format(IKUT.Setting.getDateFormat()) + " " + self.$('#time-start').data("date")).format(IKUT.Setting.getDateTimeFormat1()));
                }
                // stars
                if (self.$('#datetime').length) {
                    self.curAlarm.set('stars', parseInt($('#stars').val()));
                    orig.set('stars', parseInt($('#stars').val()));
                    IKUT.Model.getCurUser().set('stars', IKUT.Model.getCurUser().getStars() + self.origstars - parseInt($('#stars').val()));
                }
                // category
                self.curAlarm.set('category', parseInt($('#category option:selected').val()));
                orig.set('category', parseInt($('#category option:selected').val()));
                // days
                self.curAlarm.removeDailyAllDays();
                $.each(self.$('#days option:selected'), function (index, item) {
                    self.curAlarm.addDailyDay(parseInt($(item).val()));
                    orig.addDailyDay(parseInt($(item).val()));
                });
                // participants
                if (self.$('#participants').length) {
                    self.curAlarm.removeAllUsers();
                    //self.curAlarm.addUsercId(Model.getCurUser().getcId());
                    $.each(self.$('#participants option:selected'), function (index, item) {
                        self.curAlarm.addUsercId($(item).val());
                    });
                }
                // back to parentview
                self.parentView.animInactive();
            });
            self.$('#btn-delete').off('click');
            self.$('#btn-delete').on('click', function () {
                click1.play();
                IKUT.View.setIsLoading(true);
                var orig = IKUT.Model.getAlarms().findWhere({ cid: self.curAlarm.getcId() });
                IKUT.Model.getAlarms().remove(orig);
                self.parentView.animInactive();
            });
            self.$('#btn-create').off('click');
            self.$('#btn-create').on('click', function () {
                click1.play();
                IKUT.View.setIsLoading(true);
                // remove all warnings
                self.$('.warn').addClass('hidden');
                // check valid time.
                var isError = false;
                if (self.$('#datetime').length) {
                    if (self.$('#stars').val() == 0 || self.$('#stars').val() == "" || (IKUT.Model.getCurUser().getStars() < parseInt(self.$('#stars').val()))) {
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
                        IKUT.View.setIsLoading(false);
                        return;
                    }
                }
                IKUT.Model.getAlarms().add(self.curAlarm);
                //var orig: Alarm = self.curAlarm;
                // set name
                self.curAlarm.set('name', self.$('#name').val());
                //orig.set('name', self.$('#name').val());
                // set time
                if (self.$('#datetime').length) {
                    self.curAlarm.set('date', moment(self.$('#datetime').data("date")).format(IKUT.Setting.getDateTimeFormat1()));
                }
                else {
                    //console.log(self.curAlarm.getFormattedTime());
                    self.curAlarm.set('date', moment(moment(new Date()).format(IKUT.Setting.getDateFormat()) + " " + self.$('#time-start').data("date")).format(IKUT.Setting.getDateTimeFormat1()));
                }
                //console.log(self.curAlarm.getFormattedTime());
                //orig.set('date', moment(moment(new Date()).format(Setting.getDateFormat()) + " " + self.$('#time-start').data("date")).format(Setting.getDateTimeFormat1()));
                //console.log(self.curAlarm.getFormattedTime());
                //console.log($('#time-start').data("date"));
                // stars
                if (self.$('#stars').length) {
                    self.curAlarm.set('stars', parseInt($('#stars').val()));
                    IKUT.Model.getCurUser().set('stars', IKUT.Model.getCurUser().getStars() - parseInt($('#stars').val()));
                }
                else {
                    self.curAlarm.set('stars', 5);
                }
                // category
                self.curAlarm.set('category', parseInt($('#category option:selected').val()));
                //orig.set('category', parseInt($('#category option:selected').val()));
                // days
                self.curAlarm.removeDailyAllDays();
                $.each(self.$('#days option:selected'), function (index, item) {
                    self.curAlarm.addDailyDay(parseInt($(item).val()));
                    //orig.addDailyDay(parseInt($(item).val()));
                });
                // participants
                if (self.$('#participants').length) {
                    self.curAlarm.removeAllUsers();
                    //self.curAlarm.addUsercId(Model.getCurUser().getcId());
                    $.each(self.$('#participants option:selected'), function (index, item) {
                        self.curAlarm.addUsercId($(item).val());
                    });
                }
                // back to parentview
                self.parentView.animInactive();
            });
        };
        DetailView.prototype.addEventListener2 = function () {
            var self = this;
            self.$('#btn-save').off('click');
            self.$('#btn-save').on('click', function () {
                click1.play();
                IKUT.View.setIsLoading(true);
                self.curUser.set('description', self.$('#description').val());
                // back to parentview
                self.parentView.animInactive();
            });
            self.$('#btn-delete').off('click');
            self.$('#btn-delete').on('click', function () {
                click1.play();
                IKUT.View.setIsLoading(true);
                IKUT.Model.getUsers().remove(self.curUser);
                IKUT.Model.getNonAddedUsers().add(self.curUser);
                self.parentView.animInactive();
            });
        };
        DetailView.prototype.addEventListener3 = function () {
            var self = this;
            self.$('#searchname').off('keydown');
            self.$('#searchname').on('keydown', function () {
                click1.play();
                IKUT.View.setIsLoading(true);
                setTimeout(function () {
                    if (self.$('#searchname').val() != "") {
                        self.$('#wrapper-userlist').removeClass('hidden');
                    }
                    else {
                        self.$('#wrapper-userlist').addClass('hidden');
                    }
                    IKUT.View.setIsLoading(false);
                }, 250);
            });
            self.$('.btn-add').off('click');
            self.$('.btn-add').on('click', function () {
                click1.play();
                IKUT.View.setIsLoading(true);
                var cid = $(this).attr('data-cid');
                var user = IKUT.Model.getNonAddedUsers().findWhere({ cid: cid });
                user.set("created", moment(new Date()).format(IKUT.Setting.getDateTimeFormat1()));
                IKUT.Model.getNonAddedUsers().remove(user);
                IKUT.Model.getUsers().add(user);
                $('#searchname').val("");
                self.$('#wrapper-userlist').addClass('hidden');
                self.renderNonAddedUsers();
                self.addEventListener3();
                // back to parentview
                self.parentView.animInactive();
            });
        };
        DetailView.TAG = "DetailView - ";
        return DetailView;
    })(IKUT.BaseView);
    IKUT.DetailView = DetailView;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=detailview.js.map