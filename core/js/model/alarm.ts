module IKUT {
    export enum ALARM_LIST {
        NONE, DAILY, GROUP,
    }
    export enum DAY_LIST {
        MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
    }
    export enum CATEGORY_LIST {
        NONE, LESURE, SCHOOL, WORK, ETC
    }
    export class Alarm extends Backbone.Model {
        url: string = "";
        private isSavable = true;
        private bBeginingOfTheDay: boolean = false;
        constructor(attributes?: any, options?: any) {
            super(attributes, options);
            var self: Alarm = this;
            this.defaults = <any>{
                "cid": "",
                "category": CATEGORY_LIST.NONE,
                "type": ALARM_LIST.NONE,
                "name": "",
                "users": "",
                "stars": 0,
                "date": moment(new Date()).format(Setting.getDateTimeFormat1()),
                "end": moment(new Date()).format(Setting.getDateTimeFormat1()),
                "days": "0000000",
            };
            if (attributes.cid == undefined) {
                self.set('cid', self.cid);
            }
            

            self.off("change");
            self.on("change", function (model: Alarm, options) {
                if (self.isSavable == false) return;
                self.isSavable = false;
                model.save(
                    {},
                    {
                        wait: true,
                        success: function (model: Alarm, response: any) {
                            model.isSavable = true;
                        },
                        error: function (error, response) {
                        },
                    }
                );
            });
        }

        setIsBeggingOfTheDay(_bBeginingOfTheDay: boolean): void {
            var self: Alarm = this;
            self.bBeginingOfTheDay = _bBeginingOfTheDay;
        }
        getIsBeggingOfTheDay(): boolean {
            var self: Alarm = this;
            return self.bBeginingOfTheDay;
        }

        // non-url mode
        sync(...arg: any[]): JQueryXHR {
            return null;
        }
        fetch(options?: Backbone.ModelFetchOptions): JQueryXHR {
            return null;
        }
        save(attributes?: any, options?: Backbone.ModelSaveOptions): any {
            return null;
        }

        parse(response: any, options?: any): any {
            //if (response.id != null) {
                //response.id = parseInt(response.id);
            //}
            response.stars = parseInt(response.stars);
            response.category = parseInt(response.category);
            response.type = parseInt(response.type);
            response.date = moment(response.date).format(Setting.getDateTimeFormat1());
            return super.parse(response, options);
        }
        toJSON(options?: any): any {
            var clone = this.clone().attributes;
            //if (this.id != null) {
            //    clone["id"] = this.id;
            //}
            return clone;
        }

        public getCategory(): number {
            return parseInt(this.get('category'));
        }
        public getId(): string {
            return this.get('cid');
        }
        public getcId(): string {
            return this.cid;
        }
        public getName(): string {
            var self: Alarm = this;
            return this.get('name');
        }
        public getType(): ALARM_LIST {
            var self: Alarm = this;
            return this.get('type');
        }
        public getUsers(): string {
            var self: Alarm = this;
            return this.get('users');
        }
        public getStars(): number {
            var self: Alarm = this;
            return parseInt(this.get('stars'));
        }
        public getDays(): string {
            var self: Alarm = this;
            return this.get('days');
        }
        public getDate(): Moment {
            var self: Alarm = this;
            return moment(self.get('date'));
        }
        /*
        public getEnd(): Moment {
            var self: Alarm = this;
            return moment(self.get('end'));
        }
        */
        public getFormattedDate(): string {
            var self: Alarm = this;
            return moment(self.get('date')).format(Setting.getDateFormat());
        }
        public getShortFormattedDate(): string {
            var self: Alarm = this;
            return moment(self.get('date')).format(Setting.getShortDateFormat());
        }
        public getFormattedDateDay(): string {
            var self: Alarm = this;
            return moment(self.get('date')).format(Setting.getDateDayFormat());
        }
        public getFormattedTime(): string {
            var self: Alarm = this;
            return moment(self.get('date')).format(Setting.getTimeFormat1());
        }
        public getFormattedTime2(): string {
            var self: Alarm = this;
            return moment(self.get('date')).format(Setting.getTimeFormat2());
        }
        /*
        public getFormattedEndTime(): string {
            var self: Alarm = this;
            return moment(self.get('end')).format(Setting.getTimeFormat1());
        }
        */
        public getUserIds(): Array<number> {
            var self: Alarm = this;
            var result = Array<number>();
            var temp = self.get('users').split(",");
            $.each(temp, function (index: number, item: string) {
                result.push(parseInt(item));
            });
            return result;
        }
        public getUsercIds(): Array<string> {
            var self: Alarm = this;
            var result = self.get('users').split(",");
            return result;
        }
        public addUsercId(cid: string): void {
            var self: Alarm = this;
            if (cid != "") {
                var users: Array<string> = self.get('users').split(",");
                users.push(cid);
                var result = _.uniq(users);
                if (result[0] == "") {
                    result.splice(0, 1);
                }
                self.set("users", result.toString());
            }
        }
        public removeAllUsers(): void {
            var self: Alarm = this;
            self.set("users", "");
        }
        public addDailyDay(day: DAY_LIST): void {
            var self: Alarm = this;
            self.set("days", replaceAt(self.get("days"), day, "1"));
        }

        public removeDailyAllDays(): void {
            var self: Alarm = this;
            self.set("days", "0000000");
        }

        public removeDailyDay(day: DAY_LIST): void {
            var self: Alarm = this;
            self.set("days", replaceAt(self.get("days"), day, "0"));
        }
        public getIsDailyDayOn(day: DAY_LIST): boolean {
            var self: Alarm = this;
            if (self.get("days")[day] == "1") {
                return true;
            } else {
                return false;
            }
        }
        public getHasUsercId(cid: string): boolean {
            var self: Alarm = this;
            var cids: Array<string> = self.getUsercIds();
            if (cids.indexOf(cid) >= 0) {
                return true;
            }
            return false;
        }
        public generateUpcoming7DaysDailyAlarmList(): Array<Alarm> {
            var self: Alarm = this;
            var result: Array<Alarm> = new Array<Alarm>();
            for (var i = 0; i < 6; i++) {   // iterate all days
                if (self.getIsDailyDayOn(i)) {
                    var alarm: Alarm = new Alarm({ cid: self.getId(), name: self.getName(), users: self.getUsers(), type: self.getType(), date: '2015-11-25 07:05:15', days: self.getDays(), category: self.getCategory(), stars: self.getStars() });
                    var date = moment(moment().day(i + 1).format(Setting.getDateFormat()) + " " + self.getFormattedTime());
                    if (moment(new Date()).valueOf() > moment(date).valueOf()) { // has passed
                        var date = moment(moment().day(i + 1 + 7).format(Setting.getDateFormat()) + " " + self.getFormattedTime());
                    }
                    alarm.set("date", date.format(Setting.getDateTimeFormat1()));
                    result.push(alarm);
                }
            }
            return result;
        }
    }
    export enum ALARM_SORT_LIST {
        DAY, TIME
    }
    export class Alarms extends Backbone.Collection<Alarm> {
        url: string = "";
        private sortType: ALARM_SORT_LIST = ALARM_SORT_LIST.DAY;
        constructor(models?: Alarm[], options?: any) {
            super(models, options);
            this.model = Alarm;
        }


        public getUpcoming7DaysAlarmsForUser(user: User): Alarms {
            var self: Alarms = this;
            var alarms: Alarms = new Alarms();
            $.each(self.models, function (index: number, model: Alarm) {
                if (model.getHasUsercId(user.getcId())) {
                    if (model.getType() == ALARM_LIST.DAILY) {
                        var temp: Array<Alarm> = model.generateUpcoming7DaysDailyAlarmList();
                        alarms.add(temp);
                    }
                }
            });
            alarms.setSortType(ALARM_SORT_LIST.DAY);
            alarms.sort();
            if (alarms.models.length > 1) {
                var date = moment(alarms.models[0].getDate());
                $.each(alarms.models, function (index: number, model: Alarm) {
                    model.setIsBeggingOfTheDay(false);
                    var temp = moment(model.getDate());
                    if (temp.isAfter(date, "day")) {
                        date = temp;
                        model.setIsBeggingOfTheDay(true);
                    }
                });
            }
            
            
            return alarms;
        }

        public setBeginningofDays(): void {
            var self: Alarms = this;
            if (self.models.length >= 1) {
                self.models[0].setIsBeggingOfTheDay(false);
            }
            if (self.models.length >= 2) {
                self.models[1].setIsBeggingOfTheDay(true);
            }
        }

        public setSortType(_type: ALARM_SORT_LIST) {
            var self: Alarms = this;
            self.sortType = _type;
        }

        public getDailyAlarmsForUser(user: User): Alarms {
            var self: Alarms = this;
            var alarms: Alarms = new Alarms();
            $.each(self.models, function (index: number, model: Alarm) {
                if (model.getHasUsercId(user.getcId())) {
                    if (model.getType() == ALARM_LIST.DAILY) {
                        alarms.add(model);
                    }
                }
            });
            alarms.setSortType(ALARM_SORT_LIST.TIME);
            alarms.sort();

            return alarms;
        }

        public getGroupAlarmsForUser(user: User): Alarms {
            var self: Alarms = this;
            var alarms: Alarms = new Alarms();
            $.each(self.models, function (index: number, model: Alarm) {
                if (model.getHasUsercId(user.getcId())) {
                    if (model.getType() == ALARM_LIST.GROUP) {
                        if (moment(model.getDate()).valueOf() > moment(new Date()).valueOf()) {
                            alarms.add(model);
                        }
                    }
                }
            });
            alarms.setSortType(ALARM_SORT_LIST.DAY);
            alarms.sort();

            return alarms;
        }

        public getPastGroupAlarmsForUsers(user1: User, user2: User): Alarms {
            var self: Alarms = this;
            var alarms: Alarms = new Alarms();
            $.each(self.models, function (index: number, model: Alarm) {
                if (model.getHasUsercId(user1.getcId()) && model.getHasUsercId(user2.getcId())) {
                    if (model.getType() == ALARM_LIST.GROUP) {
                        if (moment(model.getDate()).valueOf() <= moment(new Date()).valueOf()) {
                            alarms.add(model);
                        }
                    }
                }
            });
            alarms.setSortType(ALARM_SORT_LIST.DAY);
            alarms.sort();

            return alarms;
        }

        public getFromActualcId(cid: string): Alarm {
            var self: Alarms = this;
            var result: Alarm;
            $.each(self.models, function (index: number, model: Alarm) {
                if (model.cid == cid) {
                    result = model;
                }
            });
            return result;
        }

        public getActiveAlarm(): Alarm {
            var self: Alarms = this;
            var result: Alarm;
            self.setSortType(ALARM_SORT_LIST.DAY);
            self.sort();
            $.each(self.models, function (index: number, model: Alarm) {
                var start = moment(new Date()).subtract('seconds', 15);
                var end = moment(new Date()).add('seconds', 15);
                if ((model.getDate().valueOf() >= start.valueOf()) && (model.getDate().valueOf() <= end.valueOf())) {
                    result = model;
                }
            });
            return result;
        }

        comparator(model: Alarm): any {
            var self: Alarms = this;
            if (self.sortType == ALARM_SORT_LIST.DAY) {
                return moment(model.get("date")).valueOf();
            } else if (self.sortType == ALARM_SORT_LIST.TIME) {
                return moment(moment(model.get("date")).format(Setting.getTimeFormat3())).valueOf();
            }
            
        }

    }
}