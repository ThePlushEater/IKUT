var IKUT;
(function (IKUT) {
    var Template = (function () {
        function Template(args) {
            if (Template._instance) {
                throw new Error("Error: Instantiation failed: Use Template.getInstance() instead of new.");
            }
            Template._instance = this;
        }
        Template.getInstance = function () {
            return Template._instance;
        };
        Template.getHomeViewTemplate = function () {
            var template = "";
            template += '<div id="wrapper-home">';
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-UPCOMING ALARM-</div></div>';
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
            template += '</div>';
            return template;
        };
        Template.getFrameViewTemplate = function () {
            var template = "";
            template += '<div class="frame">';
            template += '<div class="frame-inner">';
            template += '<div class="frame-stroke-left"></div>';
            template += '<div class="frame-text-left col-xs-1"><span class="fa-stack"><i class="fa fa-square-o fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x"></i></span></div>';
            template += '<div class="frame-text-center col-xs-10"><%= content %></div>';
            template += '<div class="frame-text-right col-xs-1"><i class="fa fa-angle-down fa-2x" data-toggle="collapse" data-target="#demo"></i></div>';
            template += '<div class="clear"></div>';
            template += '<div id="demo" class="frame-text-detail collapse">ALARM DETAIL</div>';
            template += '<span class="frame-text-top"><%= header %></span>';
            template += '<div class="frame-stroke-right"></div>';
            template += '</div>';
            template += '</div>';
            return template;
        };
        Template.getFrame2ViewTemplate = function () {
            var template = "";
            template += '<div class="frame2">';
            template += '<div class="frame2-inner">';
            template += '<div class="frame2-stroke-left"></div>';
            template += '<div class="frame2-text-left col-xs-1"><span class="fa-stack"><i class="fa fa-square-o fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x"></i></span></div>';
            template += '<div class="frame2-text-center col-xs-10"><%= content %></div>';
            template += '<div class="frame2-text-right col-xs-1"><i class="fa fa-angle-down fa-2x" data-toggle="collapse" data-target="#demo"></i></div>';
            template += '<div class="clear"></div>';
            template += '<div id="demo" class="frame2-text-detail collapse">ALARM DETAIL</div>';
            template += '<span class="frame2-text-top"><%= header %></span>';
            template += '<div class="frame2-stroke-center"></div>';
            template += '<span class="frame2-text-top2">MTWTFSS</span>';
            template += '<div class="frame2-stroke-right"></div>';
            template += '</div>';
            template += '</div>';
            return template;
        };
        Template.getButtonViewTemplate = function () {
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
        };
        Template.getAlarmsViewTemplate = function () {
            var template = "";
            template += '<div id="wrapper-alarms">';
            // add button
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-ADD A NEW DAILY ALARM-</div></div>';
            template += '<div class="wrapper-button"></div>';
            // notifications
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-LIST OF DAILY ALARMS-</div></div>';
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
            template += '</div>';
            return template;
        };
        Template.getMenusViewTemplate = function () {
            var template = "";
            template += '<div class="wrapper-menu"></div>';
            template += '<div class="wrapper-menu"></div>';
            template += '<div class="wrapper-menu"></div>';
            template += '<div class="wrapper-menu"></div>';
            template += '<div class="wrapper-menu"></div>';
            return template;
        };
        Template.getMenuViewTemplate = function () {
            var template = "";
            template += '<div class="menu">';
            template += '<div class="menu-inner">';
            template += '<i class="fa <%= icon %> fa-1x"></i>';
            template += '</div>';
            template += '</div>';
            return template;
        };
        Template._instance = new Template();
        return Template;
    })();
    IKUT.Template = Template;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=template.js.map