module IKUT {
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

        public static getTimeFormat1(): string {
            //return "HH:mm:ss ddd MMM Do";
            //return "HH:mm:ss dddd";
            return "h:mm A";
        }

        public static getTimeFormat2(): string {
            //return "HH:mm:ss ddd MMM Do";
            //return "HH:mm:ss dddd";
            return "h mm A";
        }

        public static getDateFormat(): string {
            return "M/D/YYYY";
        }

        public static getMenuTopActiveOffset(): number {
            return -16;
        }

        public static getCoreImageDir(): string {
            return Setting.getBaseUrl() + "core/image/";
        }

        public static getBackgroundImage(): string {
            return Setting.getCoreImageDir() + "Gray-Background-101.jpg";
        }

        public static getBackgroundRedColor(): string {
            return "hsla(0, 40%, 30%, 0.5)";
        }
        public static getBackgroundGreenColor(): string {
            //return "hsla(105, 35%, 40%, 0.5)";
            return "hsla(77, 55%, 29%, 0.5)";
        }
        public static getBackgroundOrangeColor(): string {
            return "hsla(23, 40%, 40%, 0.5)";
        }
        public static getBackgroundYellowColor(): string {
            return "hsla(36, 40%, 48%, 0.5)";
        }
        public static getBackgroundCyanColor(): string {
            return "hsla(159, 20%, 45%, 0.5)";
        }
        public static getBackgroundBlackColor(): string {
            return "rgba(0, 0, 0, 0.75)";
        }

        public static getViewTransitionDuration(): number {
            return 250;
        }
    }
}