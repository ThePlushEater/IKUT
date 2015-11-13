module Wakey {
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
            if (self.bDebug) console.log(Controller.TAG + "load splash page.");
            View.setViewType(MainViewType.HOME);
            View.getInstance().render();
            //if (self.bDebug) console.log("loadTreePage(" + id + ")");
            //View.getInstance().SetViewType(MainViewType.TREE);
            //View.getInstance().render();
        }
        public static loadMenuPage(): void {
            var self: Controller = Controller.getInstance();
            if (self.bDebug) console.log(Controller.TAG + "load splash page.");
            View.setViewType(MainViewType.MENU);
            View.getInstance().render();
            //if (self.bDebug) console.log("loadTreePage(" + id + ")");
            //View.getInstance().SetViewType(MainViewType.TREE);
            //View.getInstance().render();
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
                "": "home",
                "menu": "menu",
                "alarm/:id": "alarm",
            }
            super(options);
        }
        public static getInstance(): Router {
            return Router._instance;
        }

        home() {
            console.log(Router.TAG + "we have loaded the home page.");
            Controller.loadHomePage();
            //Controller.getInstance().loadListPage();
        }
        menu() {
            console.log(Router.TAG + "we have loaded the menu page.");
            Controller.loadMenuPage();
            //Controller.getInstance().loadListPage();
        }
        alarm(id: number) {
            console.log(Router.TAG + "we have loaded the menu id: " + id + ".");
            //Controller.getInstance().loadPostPage(id);
        }
    }
} 