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
        Setting.getDateTimeFormat1 = function () {
            return "YYYY-MM-DD HH:mm:ss";
        };
        Setting.getDateTimeFormat2 = function () {
            return "h:mm A M/D/YYYY";
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
        Setting.getTimeFormat3 = function () {
            return "HH:mm";
        };
        Setting.getDateFormat = function () {
            return "M/D/YYYY";
        };
        Setting.getShortDateFormat = function () {
            return "M/D";
        };
        Setting.getDateDayFormat = function () {
            return "M/D/YYYY dddd";
        };
        Setting.getMenuTopActiveOffset = function () {
            return -16;
        };
        Setting.getCoreImageDir = function () {
            return Setting.getBaseUrl() + "core/image/";
        };
        Setting.getContentFileDir = function () {
            return Setting.getBaseUrl() + "content/file/";
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
        Setting.getBackgroundWhiteColor = function () {
            return "rgba(255, 255, 255, 0.5)";
        };
        Setting.getViewTransitionDuration = function () {
            return 250;
        };
        Setting.getCategoryIcon = function (index) {
            if (index == 0) {
                return 'fa-blank';
            }
            else if (index == 1) {
                return 'fa-coffee';
            }
            else if (index == 2) {
                return 'fa-graduation-cap';
            }
            else if (index == 3) {
                return 'fa-briefcase';
            }
            else if (index == 4) {
                return 'fa-certificate';
            }
        };
        Setting._instance = new Setting();
        return Setting;
    })();
    IKUT.Setting = Setting;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=setting.js.map