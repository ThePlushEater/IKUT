var IKUT;
(function (IKUT) {
    var SideViewFractory = (function () {
        function SideViewFractory(args) {
            if (SideViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use SideViewFractory.getInstance() instead of new.");
            }
            SideViewFractory._instance = this;
        }
        SideViewFractory.getInstance = function () {
            return SideViewFractory._instance;
        };
        SideViewFractory.create = function (el) {
            var view = new IKUT.SideView({ el: el });
            return view;
        };
        SideViewFractory._instance = new SideViewFractory();
        return SideViewFractory;
    })();
    IKUT.SideViewFractory = SideViewFractory;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=sideviewfactory.js.map