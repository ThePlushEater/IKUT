var IKUT;
(function (IKUT) {
    var PushesViewFractory = (function () {
        function PushesViewFractory(args) {
            if (PushesViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use PushesViewFractory.getInstance() instead of new.");
            }
            PushesViewFractory._instance = this;
        }
        PushesViewFractory.getInstance = function () {
            return PushesViewFractory._instance;
        };
        PushesViewFractory.create = function (el) {
            var view = new IKUT.PushesView({ el: el });
            return view;
        };
        PushesViewFractory._instance = new PushesViewFractory();
        return PushesViewFractory;
    })();
    IKUT.PushesViewFractory = PushesViewFractory;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=pushesviewfactory.js.map