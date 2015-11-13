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
        public static getBaseViewTemplate(): string {
            var template = "";
            template += "<div id='wrapper-base'>";
            template +=     "<div id='wrapper-header'>";
            template +=     "<div id='toggle-menu' class='col-xs-3 row-full'><i class='fa fa-bars fa-3x hightlight-color fa-lineheight-3x fa-inset-shadow'></i></div>";
            template +=     "<div class='col-xs-9 row-full'>";
            template +=         "<div id='display-time' class='time'></div>";
            template +=         "<div id='display-date' class='date'></div>";
            template +=     "</div>";
            template +=     "</div>";
            template +=     "<div id='wrapper-body'>";
            template +=     "<div id='display-body'>";
            template +=         "<div id='display-menu'>";
            template +=         "</div>";
            template +=     "</div>";
            template +=     "</div>";
            template += "</div>";
            template += "<div id='wall-base-left'></div>";
            template += "<div id='wall-base-right'></div>";
            return template;
        }
    }
}