var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IKUT;
(function (IKUT) {
    (function (ALARM_LIST) {
        ALARM_LIST[ALARM_LIST["NONE"] = 0] = "NONE";
        ALARM_LIST[ALARM_LIST["DAILY"] = 1] = "DAILY";
        ALARM_LIST[ALARM_LIST["GROUP"] = 2] = "GROUP";
    })(IKUT.ALARM_LIST || (IKUT.ALARM_LIST = {}));
    var ALARM_LIST = IKUT.ALARM_LIST;
    (function (DAY_LIST) {
        DAY_LIST[DAY_LIST["MONDAY"] = 0] = "MONDAY";
        DAY_LIST[DAY_LIST["TUESDAY"] = 1] = "TUESDAY";
        DAY_LIST[DAY_LIST["WEDNESDAY"] = 2] = "WEDNESDAY";
        DAY_LIST[DAY_LIST["THURSDAY"] = 3] = "THURSDAY";
        DAY_LIST[DAY_LIST["FRIDAY"] = 4] = "FRIDAY";
        DAY_LIST[DAY_LIST["SATURDAY"] = 5] = "SATURDAY";
        DAY_LIST[DAY_LIST["SUNDAY"] = 6] = "SUNDAY";
    })(IKUT.DAY_LIST || (IKUT.DAY_LIST = {}));
    var DAY_LIST = IKUT.DAY_LIST;
    (function (CATEGORY_LIST) {
        CATEGORY_LIST[CATEGORY_LIST["NONE"] = 0] = "NONE";
        CATEGORY_LIST[CATEGORY_LIST["LESURE"] = 1] = "LESURE";
        CATEGORY_LIST[CATEGORY_LIST["SCHOOL"] = 2] = "SCHOOL";
        CATEGORY_LIST[CATEGORY_LIST["WORK"] = 3] = "WORK";
        CATEGORY_LIST[CATEGORY_LIST["ETC"] = 4] = "ETC";
    })(IKUT.CATEGORY_LIST || (IKUT.CATEGORY_LIST = {}));
    var CATEGORY_LIST = IKUT.CATEGORY_LIST;
    var Alarm = (function (_super) {
        __extends(Alarm, _super);
        function Alarm(attributes, options) {
            _super.call(this, attributes, options);
            this.url = "";
            this.isSavable = true;
            this.bBeginingOfTheDay = false;
            var self = this;
            this.defaults = {
                "cid": "",
                "category": CATEGORY_LIST.NONE,
                "type": ALARM_LIST.NONE,
                "name": "",
                "users": "",
                "date": moment(new Date()).format(IKUT.Setting.getDateTimeFormat1()),
                "end": moment(new Date()).format(IKUT.Setting.getDateTimeFormat1()),
                "days": "0000000",
            };
            if (attributes.cid == undefined) {
                self.set('cid', self.cid);
            }
            self.off("change");
            self.on("change", function (model, options) {
                if (self.isSavable == false)
                    return;
                self.isSavable = false;
                model.save({}, {
                    wait: true,
                    success: function (model, response) {
                        model.isSavable = true;
                    },
                    error: function (error, response) {
                    },
                });
            });
        }
        Alarm.prototype.setIsBeggingOfTheDay = function (_bBeginingOfTheDay) {
            var self = this;
            self.bBeginingOfTheDay = _bBeginingOfTheDay;
        };
        Alarm.prototype.getIsBeggingOfTheDay = function () {
            var self = this;
            return self.bBeginingOfTheDay;
        };
        // non-url mode
        Alarm.prototype.sync = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i - 0] = arguments[_i];
            }
            return null;
        };
        Alarm.prototype.fetch = function (options) {
            return null;
        };
        Alarm.prototype.save = function (attributes, options) {
            return null;
        };
        Alarm.prototype.parse = function (response, options) {
            //if (response.id != null) {
            //response.id = parseInt(response.id);
            //}
            response.category = parseInt(response.category);
            response.type = parseInt(response.type);
            response.date = moment(response.date).format(IKUT.Setting.getDateTimeFormat1());
            return _super.prototype.parse.call(this, response, options);
        };
        Alarm.prototype.toJSON = function (options) {
            var clone = this.clone().attributes;
            //if (this.id != null) {
            //    clone["id"] = this.id;
            //}
            return clone;
        };
        Alarm.prototype.getCategory = function () {
            return parseInt(this.get('category'));
        };
        Alarm.prototype.getId = function () {
            return this.get('cid');
        };
        Alarm.prototype.getcId = function () {
            return this.cid;
        };
        Alarm.prototype.getName = function () {
            var self = this;
            return this.get('name');
        };
        Alarm.prototype.getType = function () {
            var self = this;
            return this.get('type');
        };
        Alarm.prototype.getUsers = function () {
            var self = this;
            return this.get('users');
        };
        Alarm.prototype.getDays = function () {
            var self = this;
            return this.get('days');
        };
        Alarm.prototype.getDate = function () {
            var self = this;
            return moment(self.get('date'));
        };
        /*
        public getEnd(): Moment {
            var self: Alarm = this;
            return moment(self.get('end'));
        }
        */
        Alarm.prototype.getFormattedDate = function () {
            var self = this;
            return moment(self.get('date')).format(IKUT.Setting.getDateFormat());
        };
        Alarm.prototype.getShortFormattedDate = function () {
            var self = this;
            return moment(self.get('date')).format(IKUT.Setting.getShortDateFormat());
        };
        Alarm.prototype.getFormattedDateDay = function () {
            var self = this;
            return moment(self.get('date')).format(IKUT.Setting.getDateDayFormat());
        };
        Alarm.prototype.getFormattedTime = function () {
            var self = this;
            return moment(self.get('date')).format(IKUT.Setting.getTimeFormat1());
        };
        /*
        public getFormattedEndTime(): string {
            var self: Alarm = this;
            return moment(self.get('end')).format(Setting.getTimeFormat1());
        }
        */
        Alarm.prototype.getUserIds = function () {
            var self = this;
            var result = Array();
            var temp = self.get('users').split(",");
            $.each(temp, function (index, item) {
                result.push(parseInt(item));
            });
            return result;
        };
        Alarm.prototype.getUsercIds = function () {
            var self = this;
            var result = self.get('users').split(",");
            return result;
        };
        Alarm.prototype.addUsercId = function (cid) {
            var self = this;
            if (cid != "") {
                var users = self.get('users').split(",");
                users.push(cid);
                var result = _.uniq(users);
                if (result[0] == "") {
                    result.splice(0, 1);
                }
                self.set("users", result.toString());
            }
        };
        Alarm.prototype.removeAllUsers = function () {
            var self = this;
            self.set("users", "");
        };
        Alarm.prototype.addDailyDay = function (day) {
            var self = this;
            self.set("days", replaceAt(self.get("days"), day, "1"));
        };
        Alarm.prototype.removeDailyAllDays = function () {
            var self = this;
            self.set("days", "0000000");
        };
        Alarm.prototype.removeDailyDay = function (day) {
            var self = this;
            self.set("days", replaceAt(self.get("days"), day, "0"));
        };
        Alarm.prototype.getIsDailyDayOn = function (day) {
            var self = this;
            if (self.get("days")[day] == "1") {
                return true;
            }
            else {
                return false;
            }
        };
        Alarm.prototype.getHasUsercId = function (cid) {
            var self = this;
            var cids = self.getUsercIds();
            if (cids.indexOf(cid) >= 0) {
                return true;
            }
            return false;
        };
        Alarm.prototype.generateUpcoming7DaysDailyAlarmList = function () {
            var self = this;
            var result = new Array();
            for (var i = 0; i < 6; i++) {
                if (self.getIsDailyDayOn(i)) {
                    var alarm = new Alarm({ cid: self.getId(), name: self.getName(), users: self.getUsers(), type: self.getType(), date: '2015-11-25 07:05:15', days: self.getDays(), category: self.getCategory() });
                    var date = moment(moment().day(i + 1).format(IKUT.Setting.getDateFormat()) + " " + self.getFormattedTime());
                    if (moment(new Date()).valueOf() > moment(date).valueOf()) {
                        var date = moment(moment().day(i + 1 + 7).format(IKUT.Setting.getDateFormat()) + " " + self.getFormattedTime());
                    }
                    alarm.set("date", date.format(IKUT.Setting.getDateTimeFormat1()));
                    result.push(alarm);
                }
            }
            return result;
        };
        return Alarm;
    })(Backbone.Model);
    IKUT.Alarm = Alarm;
    (function (ALARM_SORT_LIST) {
        ALARM_SORT_LIST[ALARM_SORT_LIST["DAY"] = 0] = "DAY";
        ALARM_SORT_LIST[ALARM_SORT_LIST["TIME"] = 1] = "TIME";
    })(IKUT.ALARM_SORT_LIST || (IKUT.ALARM_SORT_LIST = {}));
    var ALARM_SORT_LIST = IKUT.ALARM_SORT_LIST;
    var Alarms = (function (_super) {
        __extends(Alarms, _super);
        function Alarms(models, options) {
            _super.call(this, models, options);
            this.url = "";
            this.sortType = ALARM_SORT_LIST.DAY;
            this.model = Alarm;
        }
        Alarms.prototype.getUpcoming7DaysAlarmsForUser = function (user) {
            var self = this;
            var alarms = new Alarms();
            $.each(self.models, function (index, model) {
                if (model.getHasUsercId(user.getcId())) {
                    if (model.getType() == ALARM_LIST.DAILY) {
                        var temp = model.generateUpcoming7DaysDailyAlarmList();
                        alarms.add(temp);
                    }
                }
            });
            self.setSortType(ALARM_SORT_LIST.DAY);
            alarms.sort();
            if (alarms.models.length > 1) {
                var date = moment(alarms.models[0].getDate());
                $.each(alarms.models, function (index, model) {
                    model.setIsBeggingOfTheDay(false);
                    var temp = moment(model.getDate());
                    if (temp.isAfter(date, "day")) {
                        date = temp;
                        model.setIsBeggingOfTheDay(true);
                    }
                });
            }
            if (alarms.models.length >= 1) {
                alarms.models[0].setIsBeggingOfTheDay(false);
            }
            if (alarms.models.length >= 2) {
                alarms.models[1].setIsBeggingOfTheDay(true);
            }
            return alarms;
        };
        Alarms.prototype.setSortType = function (_type) {
            var self = this;
            self.sortType = _type;
        };
        Alarms.prototype.getDailyAlarmsForUser = function (user) {
            var self = this;
            var alarms = new Alarms();
            $.each(self.models, function (index, model) {
                if (model.getHasUsercId(user.getcId())) {
                    if (model.getType() == ALARM_LIST.DAILY) {
                        alarms.add(model);
                    }
                }
            });
            self.setSortType(ALARM_SORT_LIST.TIME);
            alarms.sort();
            return alarms;
        };
        Alarms.prototype.getGroupAlarmsForUser = function (user) {
            var self = this;
            var alarms = new Alarms();
            $.each(self.models, function (index, model) {
                if (model.getHasUsercId(user.getcId())) {
                    if (model.getType() == ALARM_LIST.GROUP) {
                        if (moment(model.getDate()).valueOf() > moment(new Date()).valueOf()) {
                            alarms.add(model);
                        }
                    }
                }
            });
            self.setSortType(ALARM_SORT_LIST.DAY);
            alarms.sort();
            return alarms;
        };
        Alarms.prototype.getPastGroupAlarmsForUsers = function (user1, user2) {
            var self = this;
            var alarms = new Alarms();
            $.each(self.models, function (index, model) {
                if (model.getHasUsercId(user1.getcId()) && model.getHasUsercId(user2.getcId())) {
                    if (model.getType() == ALARM_LIST.GROUP) {
                        if (moment(model.getDate()).valueOf() <= moment(new Date()).valueOf()) {
                            alarms.add(model);
                        }
                    }
                }
            });
            self.setSortType(ALARM_SORT_LIST.DAY);
            alarms.sort();
            return alarms;
        };
        Alarms.prototype.comparator = function (model) {
            var self = this;
            if (self.sortType == ALARM_SORT_LIST.DAY) {
                return moment(model.get("date")).valueOf();
            }
            else if (self.sortType == ALARM_SORT_LIST.TIME) {
                return moment(moment(model.get("date")).format(IKUT.Setting.getTimeFormat3())).valueOf();
            }
        };
        return Alarms;
    })(Backbone.Collection);
    IKUT.Alarms = Alarms;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=alarm.js.map