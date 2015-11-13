var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Wakey;
(function (Wakey) {
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
                console.log(Controller.TAG + "load splash page.");
            Wakey.View.setViewType(Wakey.MainViewType.HOME);
            Wakey.View.getInstance().render();
        };
        Controller.loadMenuPage = function () {
            var self = Controller.getInstance();
            if (self.bDebug)
                console.log(Controller.TAG + "load splash page.");
            Wakey.View.setViewType(Wakey.MainViewType.MENU);
            Wakey.View.getInstance().render();
        };
        Controller._instance = new Controller();
        Controller.TAG = "Controller - ";
        return Controller;
    })();
    Wakey.Controller = Controller;
    var Router = (function (_super) {
        __extends(Router, _super);
        function Router(options) {
            if (Router._instance) {
                throw new Error("Error: Instantiation failed: Use Router.getInstance() instead of new.");
            }
            Router._instance = this;
            this.routes = {
                "": "home",
                "menu": "menu",
                "alarm/:id": "alarm",
            };
            _super.call(this, options);
        }
        Router.getInstance = function () {
            return Router._instance;
        };
        Router.prototype.home = function () {
            console.log(Router.TAG + "we have loaded the home page.");
            Controller.loadHomePage();
        };
        Router.prototype.menu = function () {
            console.log(Router.TAG + "we have loaded the menu page.");
            Controller.loadMenuPage();
        };
        Router.prototype.alarm = function (id) {
            console.log(Router.TAG + "we have loaded the menu id: " + id + ".");
        };
        Router._instance = new Router();
        Router.TAG = "Router - ";
        return Router;
    })(Backbone.Router);
    Wakey.Router = Router;
})(Wakey || (Wakey = {}));
