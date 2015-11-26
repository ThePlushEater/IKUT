module IKUT {
    export class Model {
        private static _instance: Model = new Model();
        private bDebug: boolean = true;
        private TAG: string = "Model - ";
        private curUser: User;
        private users: Users;
        private nonAddedUsers: Users;
        private alarms: Alarms;
        constructor() {
            if (Model._instance) {
                throw new Error("Error: Instantiation failed: Use Model.getInstance() instead of new.");
            }
            Model._instance = this;
        }
        public static getInstance(): Model {
            return Model._instance;
        }
        public static MockupData(): void {
            var self: Model = this._instance;
            if (self.bDebug) console.log(self.TAG + "MockupData()");
            self.users = new Users();
            self.alarms = new Alarms();
            self.nonAddedUsers = new Users();


            var karl = new User({ username: 'jkim848', password: '1', firstname: 'Karl', lastname: 'Kim', recent: '2015-08-11 11:11:11', created: '2015-08-11 06:06:06', description: 'My Best Friend' });
            var john = new User({ username: 'jfiorentino3', password: '1', firstname: 'John', lastname: 'Fiorentino', recent: '2015-10-06 08:08:08', created: '2014-08-08 08:08:08', description: 'LMC 3710 Classmate' });
            var michael = new User({ username: 'michaelchi95', password: '1', firstname: 'Michael', lastname: 'Chi', recent: '2015-11-25 05:05:05', created: '2015-06-06 12:12:12', description: 'League Friend' });


            self.users.add(john);
            self.users.add(michael);

            var alarm1: Alarm = new Alarm({ name: 'Weekdays Wake Up', users: "", type: ALARM_LIST.DAILY, date: '2015-11-25 07:05:15', end: '2015-11-25 07:05:15', days: "0000000", category: 3 });
            alarm1.addUsercId(karl.getcId());
            alarm1.addDailyDay(DAY_LIST.MONDAY);
            alarm1.addDailyDay(DAY_LIST.WEDNESDAY);
            alarm1.addDailyDay(DAY_LIST.FRIDAY);
            self.alarms.add(alarm1);

            var alarm2: Alarm = new Alarm({ name: 'LMC 3710', users: "", type: ALARM_LIST.DAILY, date: '2015-11-25 15:05:15', end: '2015-11-25 15:05:15', days: "0000000", category: 4 });
            alarm2.addUsercId(karl.getcId());
            alarm2.addDailyDay(DAY_LIST.MONDAY);
            alarm2.addDailyDay(DAY_LIST.WEDNESDAY);
            self.alarms.add(alarm2);

            var alarm3: Alarm = new Alarm({ name: 'LMC 4803', users: "", type: ALARM_LIST.DAILY, date: '2015-11-25 12:05:15', end: '2015-11-25 12:05:15', days: "0000000", category: 2 });
            alarm3.addUsercId(karl.getcId());
            alarm3.addDailyDay(DAY_LIST.MONDAY);
            alarm3.addDailyDay(DAY_LIST.WEDNESDAY);
            alarm3.addDailyDay(DAY_LIST.FRIDAY);
            self.alarms.add(alarm3);

            var alarm4: Alarm = new Alarm({ name: 'LMC 3710 Meeting', users: "", type: ALARM_LIST.GROUP, date: '2015-11-30 10:05:15', end: '2015-11-25 10:05:15', days: "0000000", category: 3 });
            alarm4.addUsercId(karl.getcId());
            alarm4.addUsercId(john.getcId());
            self.alarms.add(alarm4);

            var alarm5: Alarm = new Alarm({ name: 'HappyKarl Meeting', users: "", type: ALARM_LIST.GROUP, date: '2015-11-20 10:05:15', end: '2015-11-25 10:05:15', days: "0000000", category: 3 });
            alarm5.addUsercId(karl.getcId());
            alarm5.addUsercId(michael.getcId());
            self.alarms.add(alarm5);

            

            // Set CurUser
            Model.setCurUser(karl);
            console.log(Model.getCurUser());

            //console.log(alarm1.generateUpcoming7DaysDailyAlarmList());

            // add non-added users
            self.nonAddedUsers.add(new User({ username: 'tthomas45', password: '1', firstname: 'Tre\'Saun', lastname: 'Thomas', recent: '2015-08-11 11:11:11', created: '2015-08-11 06:06:06', description: '' }));
            self.nonAddedUsers.add(new User({ username: 'skucheryavykh', password: '1', firstname: 'Slava', lastname: 'Kucheryavykh', recent: '2015-08-11 11:11:11', created: '2015-08-11 06:06:06', description: '' }));
            self.nonAddedUsers.add(new User({ username: 'rramon3', password: '1', firstname: 'Luisito', lastname: 'Ramon', recent: '2015-08-11 11:11:11', created: '2015-08-11 06:06:06', description: '' }));

        }

        public static getCurUser(): User {
            var self: Model = this._instance;
            return self.curUser;
        }

        public static setCurUser(user: User): void {
            var self: Model = this._instance;
            self.curUser = user;
        }

        public static getUsers(): Users {
            var self: Model = this._instance;
            if (!self.users) {
                self.users = new Users();
            }
            return self.users;
        }
        public static getNonAddedUsers(): Users {
            var self: Model = this._instance;
            if (!self.nonAddedUsers) {
                self.nonAddedUsers = new Users();
            }
            return self.nonAddedUsers;
        }
        public static getAlarms(): Alarms {
            var self: Model = this._instance;
            if (!self.alarms) {
                self.alarms = new Alarms();
            }
            return self.alarms;
        }
    }
}