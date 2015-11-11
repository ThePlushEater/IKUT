var Wakey;
(function (Wakey) {
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
            var view = new Wakey.FrameView({ el: el });
            return view;
        };
        FrameViewFractory._instance = new FrameViewFractory();
        return FrameViewFractory;
    })();
    Wakey.FrameViewFractory = FrameViewFractory;
})(Wakey || (Wakey = {}));
