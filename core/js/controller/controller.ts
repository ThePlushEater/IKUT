module IKUT {
    export class Controller {
        private static _instance: Controller = new Controller();
        private bDebug: boolean = true;
        private static TAG: string = "Controller - ";
        constructor(args?: any) {
            if (Controller._instance) {
                throw new Error("Error: Instantiation failed: Use Controller.getInstance() instead of new.");
            }
            Controller._instance = this;
        }
        public static getInstance(): Controller {
            return Controller._instance;
        }
        public static loadHomePage(): void {
            var self: Controller = Controller.getInstance();
            if (self.bDebug) console.log(Controller.TAG + "load home page.");
            View.setViewType(VIEWTYPE_LIST.HOME);
            View.render();
        }
        public static loadAlarmsPage(): void {
            var self: Controller = Controller.getInstance();
            if (self.bDebug) console.log(Controller.TAG + "load alarms page.");
            View.setViewType(VIEWTYPE_LIST.ALARMS);
            View.render();
        }
        public static loadFriendsPage(): void {
            var self: Controller = Controller.getInstance();
            if (self.bDebug) console.log(Controller.TAG + "load friends page.");
            View.setViewType(VIEWTYPE_LIST.FRIENDS);
            View.render();
        }
        public static loadPushesPage(): void {
            var self: Controller = Controller.getInstance();
            if (self.bDebug) console.log(Controller.TAG + "load pushes page.");
            View.setViewType(VIEWTYPE_LIST.PUSHES);
            View.render();
        }
        public static loadStarPage(): void {
            var self: Controller = Controller.getInstance();
            if (self.bDebug) console.log(Controller.TAG + "load star page.");
            View.setViewType(VIEWTYPE_LIST.STAR);
            View.render();
        }

        public static getUpcoming7DaysAlarms(): Alarms {
            return Model.getAlarms().getUpcoming7DaysAlarmsForUser(Model.getCurUser());
        }

        public static getDailyAlarms(): Alarms {
            return Model.getAlarms().getDailyAlarmsForUser(Model.getCurUser());
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
        alarm(id: number) {
            console.log(Router.TAG + "we have loaded the menu id: " + id + ".");
        }

        public static navigate(framgnet: string, option?: Backbone.NavigateOptions) {
            Router.getInstance().navigate(framgnet, option);
        }
    }
} 