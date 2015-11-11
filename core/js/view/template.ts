module Wakey {
    export class Template {
        private static _instance: Template = new Template();
        private baseUrl: string;
        constructor(args?: any) {
            if (Template._instance) {
                throw new Error("Error: Instantiation failed: Use Template.getInstance() instead of new.");
            }
            Template._instance = this;
        }
        public static getInstance(): Template {
            return Template._instance;
        }
        public static getSplashViewTemplate(): string {
            var template = "";
            template += '<div id="wrapper-background"></div>';
            template += '<div id="wrapper-title">';
            template += '<div class="title title-1 hidden">I</div>';
            template += '<div class="title title-2 hidden">K</div>';
            template += '<div class="title title-3 hidden">U</div>';
            template += '<div class="title title-4 hidden">T</div>';
            template += '</div>';
            template += '<div id="wrapper-start"></div>';
            return template;
        }
        public static getMenuViewTemplate(): string {
            var template = "";
            template += '<div id="wrapper-background"></div>';
            template += '<div id="wrapper-clock"></div>';
            template += '<div id="wrapper-menu"></div>';
            template += '<div id="wrapper-menu1"></div>';
            template += '<div id="wrapper-menu2"></div>';
            template += '<div id="wrapper-menu3"></div>';
            template += '<div id="wrapper-menu4"></div>';
            template += '<div id="wrapper-menu5"></div>';
            return template;
        }
        public static getFrameViewTemplate(): string {
            var template = "";
            template += '<div class="frame frame-absolute frame-80">';
            template += '<div class="segment segment-top-left"><div class="top-blank side-blank"></div></div>';
            template += '<div class="segment segment-top-right"><div class="top-blank side-blank"></div></div>';
            template += '<div class="segment segment-bottom-left"><div class="top-blank side-blank"></div></div>';
            template += '<div class="segment segment-bottom-right"><div class="top-blank side-blank"></div></div>';
            template += '<div class="content"></div>';
            template += '</div>';
            return template;
        }
    }
}