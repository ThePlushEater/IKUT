var Wakey;
(function (Wakey) {
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
        Setting.getDateTimeFormat = function () {
            return "HH:mm:ss dddd";
        };
        Setting._instance = new Setting();
        return Setting;
    })();
    Wakey.Setting = Setting;
})(Wakey || (Wakey = {}));
