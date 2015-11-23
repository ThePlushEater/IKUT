var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IKUT;
(function (IKUT) {
    var Controller = (function () {
        function Controller(args) {
            this.bDebug = true;
            if (Controller._instance) {
                throw new Error("Error: Instantiation failed: Use Controller.getInstance() instead of new.");
            }
            Controller._instance = this;
        }
        Controller.getInstance = function () {
            return Controller._instance;
        };
        Controller.loadHomePage = function () {
            var self = Controller.getInstance();
            if (self.bDebug)
                console.log(Controller.TAG + "load home page.");
            IKUT.View.setViewType(1 /* HOME */);
            IKUT.View.render();
        };
        Controller.loadAlarmsPage = function () {
            var self = Controller.getInstance();
            if (self.bDebug)
                console.log(Controller.TAG + "load alarms page.");
            IKUT.View.setViewType(2 /* ALARMS */);
            IKUT.View.render();
        };
        Controller.loadFriendsPage = function () {
            var self = Controller.getInstance();
            if (self.bDebug)
                console.log(Controller.TAG + "load friends page.");
            IKUT.View.setViewType(3 /* FRIENDS */);
            IKUT.View.render();
        };
        Controller.loadPushesPage = function () {
            var self = Controller.getInstance();
            if (self.bDebug)
                console.log(Controller.TAG + "load pushes page.");
            IKUT.View.setViewType(4 /* PUSHES */);
            IKUT.View.render();
        };
        Controller.loadStarPage = function () {
            var self = Controller.getInstance();
            if (self.bDebug)
                console.log(Controller.TAG + "load star page.");
            IKUT.View.setViewType(5 /* STAR */);
            IKUT.View.render();
        };
        Controller._instance = new Controller();
        Controller.TAG = "Controller - ";
        return Controller;
    })();
    IKUT.Controller = Controller;
    var Router = (function (_super) {
        __extends(Router, _super);
        function Router(options) {
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
            };
            _super.call(this, options);
        }
        Router.getInstance = function () {
            return Router._instance;
        };
        Router.prototype.splash = function () {
            console.log(Router.TAG + "we have loaded the splash page.");
            Router.navigate("home", { trigger: true, replace: true });
        };
        Router.prototype.home = function () {
            console.log(Router.TAG + "we have loaded the home page.");
            Controller.loadHomePage();
        };
        Router.prototype.alarms = function () {
            console.log(Router.TAG + "we have loaded the alarms page.");
            Controller.loadAlarmsPage();
        };
        Router.prototype.friends = function () {
            console.log(Router.TAG + "we have loaded the friends page.");
            Controller.loadFriendsPage();
        };
        Router.prototype.pushes = function () {
            console.log(Router.TAG + "we have loaded the pushes page.");
            Controller.loadPushesPage();
        };
        Router.prototype.star = function () {
            console.log(Router.TAG + "we have loaded the star page.");
            Controller.loadStarPage();
        };
        Router.prototype.alarm = function (id) {
            console.log(Router.TAG + "we have loaded the menu id: " + id + ".");
        };
        Router.navigate = function (framgnet, option) {
            Router.getInstance().navigate(framgnet, option);
        };
        Router._instance = new Router();
        Router.TAG = "Router - ";
        return Router;
    })(Backbone.Router);
    IKUT.Router = Router;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=controller.js.map