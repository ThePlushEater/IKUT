var IKUT;
(function (IKUT) {
    var HomeViewFractory = (function () {
        function HomeViewFractory(args) {
            if (HomeViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use HomeViewFractory.getInstance() instead of new.");
            }
            HomeViewFractory._instance = this;
        }
        HomeViewFractory.getInstance = function () {
            return HomeViewFractory._instance;
        };
        HomeViewFractory.create = function (el) {
            var view = new IKUT.HomeView({ el: el });
            return view;
        };
        HomeViewFractory._instance = new HomeViewFractory();
        return HomeViewFractory;
    })();
    IKUT.HomeViewFractory = HomeViewFractory;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=homeviewfactory.js.map