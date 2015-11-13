var Wakey;
(function (Wakey) {
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
        Template.getBaseViewTemplate = function () {
            var template = "";
            template += "<div id='wrapper-base'>";
            template += "<div id='wrapper-header'>";
            template += "<div id='toggle-menu' class='col-xs-3 row-full'><i class='fa fa-bars fa-3x hightlight-color fa-lineheight-3x fa-inset-shadow'></i></div>";
            template += "<div class='col-xs-9 row-full'>";
            template += "<div id='display-time' class='time'></div>";
            template += "<div id='display-date' class='date'></div>";
            template += "</div>";
            template += "</div>";
            template += "<div id='wrapper-body'>";
            template += "<div id='display-body'>";
            template += "<div id='display-menu'>";
            template += "</div>";
            template += "</div>";
            template += "</div>";
            template += "</div>";
            template += "<div id='wall-base-left'></div>";
            template += "<div id='wall-base-right'></div>";
            return template;
        };
        Template._instance = new Template();
        return Template;
    })();
    Wakey.Template = Template;
})(Wakey || (Wakey = {}));
