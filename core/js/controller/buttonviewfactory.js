var IKUT;
(function (IKUT) {
    var ButtonViewFractory = (function () {
        function ButtonViewFractory(args) {
            if (ButtonViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use ButtonViewFractory.getInstance() instead of new.");
            }
            ButtonViewFractory._instance = this;
        }
        ButtonViewFractory.getInstance = function () {
            return ButtonViewFractory._instance;
        };
        ButtonViewFractory.create = function (el) {
            var view = new IKUT.ButtonView({ el: el });
            return view;
        };
        ButtonViewFractory._instance = new ButtonViewFractory();
        return ButtonViewFractory;
    })();
    IKUT.ButtonViewFractory = ButtonViewFractory;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=buttonviewfactory.js.map