module IKUT {
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
        public static getHomeViewTemplate(): string {
            var template = "";
            template += '<div id="wrapper-home">';
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-Upcoming Alarm-</div></div>';

            template += '<% _.each(alarms.models, function (alarm) { %>';

            template += '<% if (alarm.getIsBeggingOfTheDay()) { %>';
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-<%= alarm.getFormattedDateDay() %>-</div></div>';
            template += '<% } %>';
            template += '<div class="wrapper-notification"></div>';
            template += '<% }); %>';

            /*
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-11/22/2015 WEDNESDAY-</div></div>';
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-11/22/2015 WEDNESDAY-</div></div>';
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-11/22/2015 WEDNESDAY-</div></div>';
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-11/22/2015 WEDNESDAY-</div></div>';
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-notification"></div>';
            */

            template += '</div>';
            return template;
        }

        public static getFrameViewTemplate(): string {
            var template = "";
            template += '<div class="frame">';
            template +=     '<div class="frame-inner">';
            template +=         '<div class="frame-stroke-left"></div>';

            template +=         '<div class="frame-text-left col-xs-1"><span class="fa-stack"><i class="fa fa-square-o fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x"></i></span></div>';
            template +=         '<div class="frame-text-center col-xs-10"><%= content %></div>';
            template +=         '<div class="frame-text-right col-xs-1"><i class="fa fa-angle-down fa-2x" data-toggle="collapse" data-target="#<%= collapse %>"></i></div>';
            template +=         '<div class="clear"></div>';
            template +=         '<div id="<%= collapse %>" class="frame-text-detail collapse">ALARM EDIT MODE</div>';

            template +=         '<span class="frame-text-top"><%= header %></span>';
            template +=         '<div class="frame-stroke-right"></div>';
            
            template +=     '</div>';
            template += '</div>';
            return template;
        }

        public static getFrame2ViewTemplate(): string {
            var template = "";
            template += '<div class="frame2">';
            template += '<div class="frame2-inner">';
            template += '<div class="frame2-stroke-left"></div>';

            template += '<div class="frame2-text-left col-xs-1"><span class="fa-stack"><i class="fa fa-square-o fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x"></i></span></div>';
            template += '<div class="frame2-text-center col-xs-10"><%= content %></div>';
            template += '<div class="frame2-text-right col-xs-1"><i class="fa fa-angle-down fa-2x" data-toggle="collapse" data-target="#<%= collapse %>"></i></div>';
            template += '<div class="clear"></div>';
            template += '<div id="<%= collapse %>" class="frame2-text-detail collapse">ALARM EDIT MODE</div>';

            template += '<span class="frame2-text-top"><%= header %></span>';
            template += '<div class="frame2-stroke-center"></div>';
            template += '<span class="frame2-text-top2"><%= days %></span>';
            
            template += '<div class="frame2-stroke-right"></div>';

            template += '</div>';
            template += '</div>';
            return template;
        }

        public static getButtonViewTemplate(): string {
            var template = "";
            template += '<div class="button">';
            template += '<div class="button-inner">';
            template += '<div class="button-text-left col-xs-1"></div>';
            template += '<div class="button-text-center col-xs-10"><%= content %></div>';
            template += '<div class="button-text-right col-xs-1"><i class="fa fa-plus fa-1-5x" data-toggle="collapse" data-target="#demo"></i></div>';
            template += '<div class="clear"></div>';
            template += '<div id="demo" class="button-text-detail collapse">ALARM DETAIL</div>';

            template += '</div>';
            template += '</div>';
            return template;
        }

        public static getAlarmsViewTemplate(): string {
            var template = "";
            template += '<div id="wrapper-alarms">';
            // add button
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-Add a New Daily Alarm-</div></div>';
            template += '<div class="wrapper-button"></div>';


            // notifications
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-List of Daily Alarms-</div></div>';


            template += '<% _.each(alarms.models, function (alarm) { %>';
            template +=     '<div class="wrapper-notification"></div>';
            template += '<% }); %>';

            /*
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-notification"></div>';
            template += '<div class="wrapper-notification"></div>';
            */

            template += '</div>';
            return template;
        }

        

        public static getMenusViewTemplate(): string {
            var template = "";
            template += '<div class="wrapper-menu"></div>';
            template += '<div class="wrapper-menu"></div>';
            template += '<div class="wrapper-menu"></div>';
            template += '<div class="wrapper-menu"></div>';
            template += '<div class="wrapper-menu"></div>';
            return template;
        }

        public static getMenuViewTemplate(): string {
            var template = "";
            template += '<div class="menu">';

            template += '<div class="menu-inner">';

            template += '<i class="fa <%= icon %> fa-1x"></i>';

            template += '</div>';

            template += '</div>';
            return template;
        }
    }
}