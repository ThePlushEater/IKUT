var IKUT;
(function (IKUT) {
    var MenuViewFractory = (function () {
        function MenuViewFractory(args) {
            if (MenuViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use MenuViewFractory.getInstance() instead of new.");
            }
            MenuViewFractory._instance = this;
        }
        MenuViewFractory.getInstance = function () {
            return MenuViewFractory._instance;
        };
        MenuViewFractory.create = function (el, option) {
            var view = new IKUT.MenuView({ el: el });
            view.setAttributes(option);
            return view;
        };
        MenuViewFractory._instance = new MenuViewFractory();
        return MenuViewFractory;
    })();
    IKUT.MenuViewFractory = MenuViewFractory;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=menuviewfactory.js.map