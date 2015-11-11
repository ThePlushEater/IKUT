module Wakey {
    export class Setting {
        private static _instance: Setting = new Setting();
        private urlBase: string;
        private bMobile: boolean = false;
        private bShaderOn: boolean = false;
        constructor(args?: any) {
            if (Setting._instance) {
                throw new Error("Error: Instantiation failed: Use Setting.getInstance() instead of new.");
            }
            Setting._instance = this;
        }
        public static getInstance(): Setting {
            return Setting._instance;
        }
        public static setBaseUrl(url: string) {
            return this._instance.urlBase = url;
        }
        public static getBaseUrl(): string {
            return this._instance.urlBase;
        }

        public static getDateTimeFormat(): string {
            //return "HH:mm:ss ddd MMM Do";
            return "HH:mm:ss dddd";
        }
    }
}