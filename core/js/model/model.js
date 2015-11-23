var IKUT;
(function (IKUT) {
    var Model = (function () {
        function Model() {
            this.bDebug = false;
            if (Model._instance) {
                throw new Error("Error: Instantiation failed: Use Model.getInstance() instead of new.");
            }
            Model._instance = this;
        }
        Model.getInstance = function () {
            return Model._instance;
        };
        Model._instance = new Model();
        return Model;
    })();
    IKUT.Model = Model;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=model.js.map