var IKUT;
(function (IKUT) {
    var UsersViewFractory = (function () {
        function UsersViewFractory(args) {
            if (UsersViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use UsersViewFractory.getInstance() instead of new.");
            }
            UsersViewFractory._instance = this;
        }
        UsersViewFractory.getInstance = function () {
            return UsersViewFractory._instance;
        };
        UsersViewFractory.create = function (el) {
            var view = new IKUT.UsersView({ el: el });
            return view;
        };
        UsersViewFractory._instance = new UsersViewFractory();
        return UsersViewFractory;
    })();
    IKUT.UsersViewFractory = UsersViewFractory;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=usersviewfactory.js.map