var IKUT;
(function (IKUT) {
    var Model = (function () {
        function Model() {
            this.bDebug = true;
            this.TAG = "Model - ";
            if (Model._instance) {
                throw new Error("Error: Instantiation failed: Use Model.getInstance() instead of new.");
            }
            Model._instance = this;
        }
        Model.getInstance = function () {
            return Model._instance;
        };
        Model.MockupData = function () {
            var self = this._instance;
            if (self.bDebug)
                console.log(self.TAG + "MockupData()");
            self.users = new IKUT.Users();
            self.alarms = new IKUT.Alarms();
            self.nonAddedUsers = new IKUT.Users();
            var karl = new IKUT.User({ username: 'jkim848', password: '1', firstname: 'Karl', lastname: 'Kim', recent: '2015-08-11 11:11:00', created: '2015-08-11 06:06:06', description: 'My Best Friend', stars: 20000000 });
            var john = new IKUT.User({ username: 'jfiorentino3', password: '1', firstname: 'John', lastname: 'Fiorentino', recent: '2015-10-06 08:08:00', created: '2014-08-08 08:08:08', description: 'LMC 3710 Classmate', stars: 441345 });
            var michael = new IKUT.User({ username: 'michaelchi95', password: '1', firstname: 'Michael', lastname: 'Chi', recent: '2015-11-25 05:05:00', created: '2015-06-06 12:12:12', description: 'League Friend', stars: 2423356 });
            self.users.add(john);
            self.users.add(michael);
            var alarm1 = new IKUT.Alarm({ name: 'Weekdays Wake Up', users: "", type: 1 /* DAILY */, date: '2015-11-25 20:44:00', end: '2015-11-25 07:05:15', days: "0000000", category: 3, stars: 5 });
            alarm1.addUsercId(karl.getcId());
            alarm1.addDailyDay(0 /* MONDAY */);
            alarm1.addDailyDay(1 /* TUESDAY */);
            alarm1.addDailyDay(2 /* WEDNESDAY */);
            alarm1.addDailyDay(3 /* THURSDAY */);
            alarm1.addDailyDay(4 /* FRIDAY */);
            self.alarms.add(alarm1);
            var alarm2 = new IKUT.Alarm({ name: 'LMC 3710', users: "", type: 1 /* DAILY */, date: '2015-11-25 15:05:00', end: '2015-11-25 15:05:15', days: "0000000", category: 4, stars: 5 });
            alarm2.addUsercId(karl.getcId());
            alarm2.addDailyDay(0 /* MONDAY */);
            alarm2.addDailyDay(2 /* WEDNESDAY */);
            self.alarms.add(alarm2);
            var alarm3 = new IKUT.Alarm({ name: 'LMC 4803', users: "", type: 1 /* DAILY */, date: '2015-11-25 20:46:00', end: '2015-11-25 12:05:15', days: "0000000", category: 2, stars: 5 });
            alarm3.addUsercId(karl.getcId());
            alarm3.addDailyDay(0 /* MONDAY */);
            alarm3.addDailyDay(2 /* WEDNESDAY */);
            alarm3.addDailyDay(3 /* THURSDAY */);
            alarm3.addDailyDay(4 /* FRIDAY */);
            self.alarms.add(alarm3);
            var alarm4 = new IKUT.Alarm({ name: 'LMC 3710 Meeting', users: "", type: 2 /* GROUP */, date: '2015-11-26 21:21:00', end: '2015-11-25 10:05:15', days: "0000000", category: 3, stars: 20 });
            alarm4.addUsercId(karl.getcId());
            alarm4.addUsercId(john.getcId());
            self.alarms.add(alarm4);
            var alarm5 = new IKUT.Alarm({ name: 'HappyKarl Meeting', users: "", type: 2 /* GROUP */, date: '2015-11-20 10:05:00', end: '2015-11-25 10:05:15', days: "0000000", category: 3, stars: 24 });
            alarm5.addUsercId(karl.getcId());
            alarm5.addUsercId(michael.getcId());
            self.alarms.add(alarm5);
            // Set CurUser
            Model.setCurUser(karl);
            console.log(Model.getAlarms());
            //console.log(alarm1.generateUpcoming7DaysDailyAlarmList());
            // add non-added users
            self.nonAddedUsers.add(new IKUT.User({ username: 'tthomas45', password: '1', firstname: 'Tre\'Saun', lastname: 'Thomas', recent: '2015-08-11 11:11:11', created: '2015-08-11 06:06:06', description: '', stars: 345 }));
            self.nonAddedUsers.add(new IKUT.User({ username: 'skucheryavykh', password: '1', firstname: 'Slava', lastname: 'Kucheryavykh', recent: '2015-08-11 11:11:11', created: '2015-08-11 06:06:06', description: '', stars: 6565134 }));
            self.nonAddedUsers.add(new IKUT.User({ username: 'rramon3', password: '1', firstname: 'Luisito', lastname: 'Ramon', recent: '2015-08-11 11:11:11', created: '2015-08-11 06:06:06', description: '', stars: 78632566 }));
        };
        Model.getCurUser = function () {
            var self = this._instance;
            return self.curUser;
        };
        Model.setCurUser = function (user) {
            var self = this._instance;
            self.curUser = user;
        };
        Model.getUsers = function () {
            var self = this._instance;
            if (!self.users) {
                self.users = new IKUT.Users();
            }
            return self.users;
        };
        Model.getNonAddedUsers = function () {
            var self = this._instance;
            if (!self.nonAddedUsers) {
                self.nonAddedUsers = new IKUT.Users();
            }
            return self.nonAddedUsers;
        };
        Model.getAlarms = function () {
            var self = this._instance;
            if (!self.alarms) {
                self.alarms = new IKUT.Alarms();
            }
            return self.alarms;
        };
        Model._instance = new Model();
        return Model;
    })();
    IKUT.Model = Model;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=model.js.map