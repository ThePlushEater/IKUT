var IKUT;
(function (IKUT) {
    var Setting = (function () {
        function Setting(args) {
            this.bMobile = false;
            this.bShaderOn = false;
            if (Setting._instance) {
                throw new Error("Error: Instantiation failed: Use Setting.getInstance() instead of new.");
            }
            Setting._instance = this;
        }
        Setting.getInstance = function () {
            return Setting._instance;
        };
        Setting.setBaseUrl = function (url) {
            return this._instance.urlBase = url;
        };
        Setting.getBaseUrl = function () {
            return this._instance.urlBase;
        };
        Setting.getTimeFormat1 = function () {
            //return "HH:mm:ss ddd MMM Do";
            //return "HH:mm:ss dddd";
            return "h:mm A";
        };
        Setting.getTimeFormat2 = function () {
            //return "HH:mm:ss ddd MMM Do";
            //return "HH:mm:ss dddd";
            return "h mm A";
        };
        Setting.getDateFormat = function () {
            return "M/D/YYYY";
        };
        Setting.getMenuTopActiveOffset = function () {
            return -16;
        };
        Setting.getCoreImageDir = function () {
            return Setting.getBaseUrl() + "core/image/";
        };
        Setting.getBackgroundImage = function () {
            return Setting.getCoreImageDir() + "Gray-Background-101.jpg";
        };
        Setting.getBackgroundRedColor = function () {
            return "hsla(0, 40%, 30%, 0.5)";
        };
        Setting.getBackgroundGreenColor = function () {
            //return "hsla(105, 35%, 40%, 0.5)";
            return "hsla(77, 55%, 29%, 0.5)";
        };
        Setting.getBackgroundOrangeColor = function () {
            return "hsla(23, 40%, 40%, 0.5)";
        };
        Setting.getBackgroundYellowColor = function () {
            return "hsla(36, 40%, 48%, 0.5)";
        };
        Setting.getBackgroundCyanColor = function () {
            return "hsla(159, 20%, 45%, 0.5)";
        };
        Setting.getBackgroundBlackColor = function () {
            return "rgba(0, 0, 0, 0.75)";
        };
        Setting.getViewTransitionDuration = function () {
            return 250;
        };
        Setting._instance = new Setting();
        return Setting;
    })();
    IKUT.Setting = Setting;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=setting.js.map