var IKUT;
(function (IKUT) {
    var FrameViewFractory = (function () {
        function FrameViewFractory(args) {
            if (FrameViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use FrameViewFractory.getInstance() instead of new.");
            }
            FrameViewFractory._instance = this;
        }
        FrameViewFractory.getInstance = function () {
            return FrameViewFractory._instance;
        };
        FrameViewFractory.create = function (el) {
            var view = new IKUT.FrameView({ el: el });
            return view;
        };
        FrameViewFractory._instance = new FrameViewFractory();
        return FrameViewFractory;
    })();
    IKUT.FrameViewFractory = FrameViewFractory;
    var Frame2ViewFractory = (function () {
        function Frame2ViewFractory(args) {
            if (Frame2ViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use Frame2ViewFractory.getInstance() instead of new.");
            }
            Frame2ViewFractory._instance = this;
        }
        Frame2ViewFractory.getInstance = function () {
            return Frame2ViewFractory._instance;
        };
        Frame2ViewFractory.create = function (el) {
            var view = new IKUT.Frame2View({ el: el });
            return view;
        };
        Frame2ViewFractory._instance = new Frame2ViewFractory();
        return Frame2ViewFractory;
    })();
    IKUT.Frame2ViewFractory = Frame2ViewFractory;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=frameviewfactory.js.map