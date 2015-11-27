module IKUT {
    export class Controller {
        private static _instance: Controller = new Controller();
        private bDebug: boolean = true;
        private static TAG: string = "Controller - ";
        private bCharacterHasHairPin: boolean = false;
        private alarmCid: string;
        private tickInterval: number;
        private bTicking: boolean = false;
        constructor(args?: any) {
            if (Controller._instance) {
                throw new Error("Error: Instantiation failed: Use Controller.getInstance() instead of new.");
            }
            Controller._instance = this;
        }
        public static getInstance(): Controller {
            return Controller._instance;
        }

        public static startTick(): void {
            var self: Controller = Controller.getInstance();
            if (!self.bTicking) {
                self.bTicking = true;
                if (View.getViewType() != VIEWTYPE_LIST.POPUP) {
                    console.log("CHECKING ALARM...");
                    // get alarms
                    var alarms: Alarms = Controller.getUpcoming7DaysAlarms();
                    alarms.add(Controller.getGroupAlarms().models);
                    Model.actualAlarms = alarms;
                    var active: Alarm = Model.actualAlarms.getActiveAlarm();

                    if (active) {
                        Router.navigate('popup/' + active.getcId(), { trigger: true, replace: true });
                    }
                }
                self.tickInterval = setInterval(function () {
                    if (View.getViewType() != VIEWTYPE_LIST.POPUP) {
                        console.log("CHECKING ALARM...");
                        // get alarms
                        var alarms: Alarms = Controller.getUpcoming7DaysAlarms();
                        alarms.add(Controller.getGroupAlarms().models);
                        Model.actualAlarms = alarms;
                        console.log(Model.actualAlarms);
                        var active: Alarm = Model.actualAlarms.getActiveAlarm();
                        if (active) {
                            Router.navigate('popup/' + active.getcId(), { trigger: true, replace: true });
                        }
                    }
                }, 15000);
            }
        }

        public static setIsCharacterHasHairPin(has: boolean): void {
            this._instance.bCharacterHasHairPin = has;
        }
        public static getIsCharacterHasHairPin(): boolean {
            return this._instance.bCharacterHasHairPin;
        }

        public static loadHomePage(): void {
            var self: Controller = Controller.getInstance();
            Controller.startTick();
            if (self.bDebug) console.log(Controller.TAG + "load home page.");
            View.setViewType(VIEWTYPE_LIST.HOME);
            View.render();
            
        }
        public static loadAlarmsPage(): void {
            var self: Controller = Controller.getInstance();
            if (self.bDebug) console.log(Controller.TAG + "load alarms page.");
            Controller.startTick();
            View.setViewType(VIEWTYPE_LIST.ALARMS);
            View.render();
            
        }
        public static loadFriendsPage(): void {
            var self: Controller = Controller.getInstance();
            if (self.bDebug) console.log(Controller.TAG + "load friends page.");
            Controller.startTick();
            View.setViewType(VIEWTYPE_LIST.FRIENDS);
            View.render();
        }
        public static loadPushesPage(): void {
            var self: Controller = Controller.getInstance();
            if (self.bDebug) console.log(Controller.TAG + "load pushes page.");
            Controller.startTick();
            View.setViewType(VIEWTYPE_LIST.PUSHES);
            View.render();
            
        }
        public static loadStarPage(): void {
            var self: Controller = Controller.getInstance();
            if (self.bDebug) console.log(Controller.TAG + "load star page.");
            Controller.startTick();
            View.setViewType(VIEWTYPE_LIST.STAR);
            View.render();
            
        }

        public static loadPopupPage(cid: string): void {
            var self: Controller = Controller.getInstance();
            self.alarmCid = cid;
            console.log("self.alarmCid: " + self.alarmCid);
            if (self.bDebug) console.log(Controller.TAG + "load popup page.");
            Controller.startTick();
            View.setViewType(VIEWTYPE_LIST.POPUP);
            View.render();
            
        }

        public static getCurrentAlarm(): Alarm {
            var self: Controller = Controller.getInstance();
            // get alarms
            var alarm: Alarm = Model.actualAlarms.getFromActualcId(self.alarmCid);
            return alarm;
        }

        public static getUpcoming7DaysAlarms(): Alarms {
            return Model.getAlarms().getUpcoming7DaysAlarmsForUser(Model.getCurUser());
        }

        public static getDailyAlarms(): Alarms {
            return Model.getAlarms().getDailyAlarmsForUser(Model.getCurUser());
        }

        public static getGroupAlarms(): Alarms {
            return Model.getAlarms().getGroupAlarmsForUser(Model.getCurUser());
        }
    }

    export class Router extends Backbone.Router {
        private static _instance: Router = new Router();
        private static TAG: string = "Router - ";
        constructor(options?: Backbone.RouterOptions) {
            if (Router._instance) {
                throw new Error("Error: Instantiation failed: Use Router.getInstance() instead of new.");
            }
            Router._instance = this;
            // Setup Router parameters
            this.routes = {
                "": "splash",
                "home": "home",
                "alarms": "alarms",
                "friends": "friends",
                "pushes": "pushes",
                "star": "star",
                "popup/:cid": "popup",
                "alarm/:id": "alarm",
            }
            super(options);
        }
        public static getInstance(): Router {
            return Router._instance;
        }
        splash() {
            console.log(Router.TAG + "we have loaded the splash page.");
            Router.navigate("home", { trigger: true, replace: true });
        }
        home() {
            console.log(Router.TAG + "we have loaded the home page.");
            Controller.loadHomePage();
        }
        alarms() {
            console.log(Router.TAG + "we have loaded the alarms page.");
            Controller.loadAlarmsPage();
        }
        friends() {
            console.log(Router.TAG + "we have loaded the friends page.");
            Controller.loadFriendsPage();
        }
        pushes() {
            console.log(Router.TAG + "we have loaded the pushes page.");
            Controller.loadPushesPage();
        }
        star() {
            console.log(Router.TAG + "we have loaded the star page.");
            Controller.loadStarPage();
        }
        popup(cid: string) {
            console.log(Router.TAG + "we have loaded the popup cid: " + cid + ".");
            Controller.loadPopupPage(cid);
        }
        alarm(id: number) {
            console.log(Router.TAG + "we have loaded the menu id: " + id + ".");
        }

        public static navigate(framgnet: string, option?: Backbone.NavigateOptions) {
            Router.getInstance().navigate(framgnet, option);
        }
    }
} 