var IKUT;
(function (IKUT) {
    var MenusViewFractory = (function () {
        function MenusViewFractory(args) {
            if (MenusViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use MenusViewFractory.getInstance() instead of new.");
            }
            MenusViewFractory._instance = this;
        }
        MenusViewFractory.getInstance = function () {
            return MenusViewFractory._instance;
        };
        MenusViewFractory.create = function (el) {
            var view = new IKUT.MenusView({ el: el });
            return view;
        };
        MenusViewFractory._instance = new MenusViewFractory();
        return MenusViewFractory;
    })();
    IKUT.MenusViewFractory = MenusViewFractory;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=menusviewfactory.js.map