var IKUT;
(function (IKUT) {
    var AlarmsViewFractory = (function () {
        function AlarmsViewFractory(args) {
            if (AlarmsViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use AlarmsViewFractory.getInstance() instead of new.");
            }
            AlarmsViewFractory._instance = this;
        }
        AlarmsViewFractory.getInstance = function () {
            return AlarmsViewFractory._instance;
        };
        AlarmsViewFractory.create = function (el) {
            var view = new IKUT.AlarmsView({ el: el });
            return view;
        };
        AlarmsViewFractory._instance = new AlarmsViewFractory();
        return AlarmsViewFractory;
    })();
    IKUT.AlarmsViewFractory = AlarmsViewFractory;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=alarmsviewfactory.js.map