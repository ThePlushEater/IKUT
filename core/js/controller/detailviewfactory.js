var IKUT;
(function (IKUT) {
    var DetailViewFractory = (function () {
        function DetailViewFractory(args) {
            if (DetailViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use DetailViewFractory.getInstance() instead of new.");
            }
            DetailViewFractory._instance = this;
        }
        DetailViewFractory.getInstance = function () {
            return DetailViewFractory._instance;
        };
        DetailViewFractory.create = function (el) {
            var view = new IKUT.DetailView({ el: el });
            return view;
        };
        DetailViewFractory._instance = new DetailViewFractory();
        return DetailViewFractory;
    })();
    IKUT.DetailViewFractory = DetailViewFractory;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=detailviewfactory.js.map