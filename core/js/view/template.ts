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

        public static getSideViewTemplate(): string {
            var template = "";
            template += '<div id="wrapper-side">';

            template += '<div class="wrapper-button"></div>';

            //template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-Details-</div></div>';

            template += '<div class="wrapper-detail"></div>';


            template += '</div>';
            return template;
        }

        public static getHomeViewTemplate(): string {
            var template = "";
            template += '<div id="wrapper-home">';

            template += '<% if (alarms.models.length > 0) { %>';

            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-Upcoming Alarm ( <%= alarms.models[0].getFormattedDateDay() %> )-</div></div>';

            template += '<% } else { %>';

            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-No Upcoming Alarms-</div></div>';

            template += '<% } %>';

            template += '<% _.each(alarms.models, function (alarm) { %>';

            template += '<% if (alarm.getIsBeggingOfTheDay()) { %>';
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-<%= alarm.getFormattedDateDay() %>-</div></div>';
            template += '<% } %>';
            template += '<div class="wrapper-notification"></div>';
            template += '<% }); %>';

            template += '</div>';
            return template;
        }

        public static getHomeViewTemplate2(): string {
            var template = "";
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-Upcoming Alarm-</div></div>';

            template += '<% _.each(alarms.models, function (alarm) { %>';

            template += '<% if (alarm.getIsBeggingOfTheDay()) { %>';
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-<%= alarm.getFormattedDateDay() %>-</div></div>';
            template += '<% } %>';
            template += '<div class="wrapper-notification"></div>';
            template += '<% }); %>';
            return template;
        }

        public static getFrameViewTemplate(): string {
            var template = "";
            template += '<div class="frame">';
            template +=     '<div class="frame-inner">';
            template +=         '<div class="frame-stroke-left"></div>';

            template +=         '<div class="frame-text-left col-xs-1"><span class="fa-stack"><i class="fa fa-square-o fa-stack-2x"></i><i class="fa <%= icon %> fa-stack-1x"></i></span></div>';
            template +=         '<div class="frame-text-center col-xs-10"><%= content %></div>';
            template +=         '<div class="frame-text-right col-xs-1 btn-detail" data-cid="<%= cid %>"><i class="fa fa-angle-right fa-1-7x"></i></div>';
            template +=         '<div class="clear"></div>';
            template +=         '<span class="frame-text-top"><%= header %></span>';
            template +=         '<div class="frame-stroke-right"></div>';
            
            template +=     '</div>';
            template += '</div>';
            return template;
        }

        public static getDetailViewTemplate(): string {
            var template = "";
            template += '<div class="detail">';
            template += '<div class="detail-inner">';
            template += '<div class="detail-stroke-left"></div>';

            //template += '<div class="detail-text-left col-xs-1"><span class="fa-stack"><i class="fa fa-square-o fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x"></i></span></div>';
            template += '<div class="detail-text-center col-xs-12"><%= content %></div>';            
            template += '<div class="clear"></div>';

            template += '<span class="detail-text-top"><%= header %></span>';
            template += '<div class="detail-stroke-right"></div>';

            template += '</div>';
            template += '</div>';
            return template;
        }

        public static getFrame2ViewTemplate(): string {
            var template = "";
            template += '<div class="frame2">';
            template += '<div class="frame2-inner">';
            template += '<div class="frame2-stroke-left"></div>';

            template += '<div class="frame2-text-left col-xs-1"><span class="fa-stack"><i class="fa fa-square-o fa-stack-2x"></i><i class="fa <%= icon %> fa-stack-1x"></i></span></div>';
            template += '<div class="frame2-text-center col-xs-10"><%= content %></div>';
            template += '<div class="frame2-text-right col-xs-1 btn-detail" data-cid="<%= cid %>"><i class="fa fa-angle-right fa-1-7x"></i></div>';
            template += '<div class="clear"></div>';

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
            template += '<div class="button-text-left col-xs-1 <%= behavior %>"><i class="fa <%= icon %> fa-1-5x"></i></div>';
            template += '<div class="button-text-center col-xs-10"><%= content %></div>';
            template += '<div class="button-text-right col-xs-1"></div>';
            template += '<div class="clear"></div>';

            template += '</div>';
            template += '</div>';
            return template;
        }

        public static getButtonViewTemplate2(): string {
            var template = "";
            template += '<div class="button">';
            template += '<div class="button-inner">';
            template += '<div class="button-text-left col-xs-1"></div>';
            template += '<div class="button-text-center col-xs-10"><%= content %></div>';
            template += '<div class="button-text-right col-xs-1 <%= behavior %>"><i class="fa <%= icon %> fa-1-5x"></i></div>';
            template += '<div class="clear"></div>';

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

            template += '</div>';
            return template;
        }

        public static getUsersViewTemplate(): string {
            var template = "";
            template += '<div id="wrapper-users">';
            // add button
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-Add a Friend-</div></div>';
            template += '<div class="wrapper-button"></div>';


            // notifications
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-List of Friends-</div></div>';


            template += '<% _.each(users.models, function (user) { %>';
            template += '<div class="wrapper-user"></div>';
            template += '<% }); %>';

            template += '</div>';
            return template;
        }

        public static getUsersViewTemplate2(): string {
            var template = "";
            // add button
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-Add a Friend-</div></div>';
            template += '<div class="wrapper-button"></div>';


            // notifications
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-List of Friends-</div></div>';


            template += '<% _.each(users.models, function (user) { %>';
            template += '<div class="wrapper-user"></div>';
            template += '<% }); %>';

            return template;
        }

        public static getAlarmsViewTemplate2(): string {
            var template = "";
            // add button
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-Add a New Daily Alarm-</div></div>';
            template += '<div class="wrapper-button"></div>';


            // notifications
            template += '<div class="wrapper-connector clear"><div class="connector-vertical-line"><div class="connector-line"></div></div><div class="connector-content">-List of Daily Alarms-</div></div>';


            template += '<% _.each(alarms.models, function (alarm) { %>';
            template += '<div class="wrapper-notification"></div>';
            template += '<% }); %>';

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

        public static getDarilyAlarmEditTemplate(): string {
            var template = "";
            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Time-</div></div>';
            template += '<div class="form-group">';
            template +=     '<div class="input-group date">';
            template +=         '<span class="input-group-addon">';
            template +=             '<i class="fa fa-clock-o fa-1-5x"></i>';
            template +=         '</span>';
            template +=         '<input type="text" class="form-control" id="time-start"/>';
            template +=     '</div>';
            template += '</div>';


            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Name-</div></div>';
            template += '<div class="form-group">';
            template +=     '<div class="input-group">';
            template +=         '<span class="input-group-addon">';
            template +=          '<i class="fa fa-pencil-square fa-1-5x"></i>';
            template +=         '</span>';
            template +=     '<input type="text" class="form-control" id="name" value="<%= name %>"/>';
            template += '</div>';
            template += '</div>';


            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Category-</div></div>';
            template += '<div class="form-group">';
            template += '<div class="input-group">';
            template += '<span class="input-group-addon" id="category-icon">';
            template += '<i class="fa fa-tag fa-1-5x"></i>';
            template += '</span>';
            template += '<select class="selectpicker" id="category">';
            template += '<option value="0">Nothing Selected</option>';
            template += '<option value="1">Lesure</option>';
            template += '<option value="2">School</option>';
            template += '<option value="3">Work</option>';
            template += '<option value="4">Etc</option>';
            template += '</select>';
            template += '</div>';
            template += '</div>';


            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Days-</div></div>';
            template += '<div class="form-group">';
            template += '<div class="input-group">';
            template += '<span class="input-group-addon">';
            template += '<i class="fa fa-calendar-o fa-1-5x"></i>';
            template += '</span>';
            template += '<select class="selectpicker" id="days" multiple>';
            template += '<option value="0">Mo</option>';
            template += '<option value="1">Tu</option>';
            template += '<option value="2">We</option>';
            template += '<option value="3">Th</option>';
            template += '<option value="4">Fr</option>';
            template += '<option value="5">Sa</option>';
            template += '<option value="6">Su</option>';
            template += '</select>';
            template += '</div>';
            template += '</div>';


            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Save-</div></div>';
            template += '<div class="form-group">';
            template += '<div class="input-group">';
            template += '<span class="input-group-addon">';
            template += '<i class="fa fa-save fa-1-5x"></i>';
            template += '</span>';
            template += '<div class="form-control btn-save" id="btn-save">SAVE</div>';
            template += '</div>';
            template += '</div>';



            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Delete-</div></div>';
            template += '<div class="form-group">';
            template += '<div class="input-group">';
            template += '<span class="input-group-addon">';
            template += '<i class="fa fa-remove fa-1-5x"></i>';
            template += '</span>';
            template += '<div class="form-control btn-delete" id="btn-delete">DELETE</div>';
            template += '</div>';
            template += '</div>';



            return template;
        }


        public static getDarilyAlarmEditTemplate2(): string {
            var template = "";
            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Time-</div></div>';
            template += '<div class="form-group">';
            template += '<div class="input-group date">';
            template += '<span class="input-group-addon">';
            template += '<i class="fa fa-clock-o fa-1-5x"></i>';
            template += '</span>';
            template += '<input type="text" class="form-control" id="time-start"/>';
            template += '</div>';
            template += '</div>';


            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Name-</div></div>';
            template += '<div class="form-group">';
            template += '<div class="input-group">';
            template += '<span class="input-group-addon">';
            template += '<i class="fa fa-pencil-square fa-1-5x"></i>';
            template += '</span>';
            template += '<input type="text" class="form-control" id="name" value="<%= name %>"/>';
            template += '</div>';
            template += '</div>';


            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Category-</div></div>';
            template += '<div class="form-group">';
            template += '<div class="input-group">';
            template += '<span class="input-group-addon" id="category-icon">';
            template += '<i class="fa fa-tag fa-1-5x"></i>';
            template += '</span>';
            template += '<select class="selectpicker" id="category">';
            template += '<option value="0">Nothing Selected</option>';
            template += '<option value="1">Lesure</option>';
            template += '<option value="2">School</option>';
            template += '<option value="3">Work</option>';
            template += '<option value="4">Etc</option>';
            template += '</select>';
            template += '</div>';
            template += '</div>';


            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Days-</div></div>';
            template += '<div class="form-group">';
            template += '<div class="input-group">';
            template += '<span class="input-group-addon">';
            template += '<i class="fa fa-calendar-o fa-1-5x"></i>';
            template += '</span>';
            template += '<select class="selectpicker" id="days" multiple>';
            template += '<option value="0">Mo</option>';
            template += '<option value="1">Tu</option>';
            template += '<option value="2">We</option>';
            template += '<option value="3">Th</option>';
            template += '<option value="4">Fr</option>';
            template += '<option value="5">Sa</option>';
            template += '<option value="6">Su</option>';
            template += '</select>';
            template += '</div>';
            template += '</div>';


            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Create-</div></div>';
            template += '<div class="form-group">';
            template += '<div class="input-group">';
            template += '<span class="input-group-addon">';
            template += '<i class="fa fa-save fa-1-5x"></i>';
            template += '</span>';
            template += '<div class="form-control btn-save" id="btn-create">CREATE</div>';
            template += '</div>';
            template += '</div>';



            return template;
        }


        public static getUserEditTemplate(): string {
            var template = "";

            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Username-</div></div>';
            template += '<div class="form-group">';
            template += '<div class="input-group">';
            template += '<span class="input-group-addon">';
            template += '<i class="fa fa-user fa-1-5x"></i>';
            template += '</span>';
            template += '<input type="text" class="form-control" id="username" value="<%= username %>"/ disabled>';
            template += '</div>';
            template += '</div>';

            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Name-</div></div>';
            template += '<div class="form-group">';
            template += '<div class="input-group">';
            template += '<span class="input-group-addon">';
            template += '<i class="fa fa-odnoklassniki fa-1-5x"></i>';
            template += '</span>';
            template += '<input type="text" class="form-control" id="name" value="<%= firstname %> <%= lastname %>"/ disabled>';
            template += '</div>';
            template += '</div>';


            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Note-</div></div>';
            template += '<div class="form-group">';
            template += '<div class="input-group">';
            template += '<span class="input-group-addon">';
            template += '<i class="fa fa-comment fa-1-5x"></i>';
            template += '</span>';
            template += '<input type="text" class="form-control" id="description" value="<%= description %>"/>';
            template += '</div>';
            template += '</div>';


            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Recent Group Alarm-</div></div>';
            template += '<div class="form-group">';
            template += '<div class="input-group date">';
            template += '<span class="input-group-addon">';
            template += '<i class="fa fa-history fa-1-5x"></i>';
            template += '</span>';
            template += '<input type="text" class="form-control" id="recent" disabled />';
            template += '</div>';
            template += '</div>';

            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Friend Added-</div></div>';
            template += '<div class="form-group">';
            template += '<div class="input-group date">';
            template += '<span class="input-group-addon">';
            template += '<i class="fa fa-clock-o fa-1-5x"></i>';
            template += '</span>';
            template += '<input type="text" class="form-control" id="created" value="<%= created %>" disabled />';
            template += '</div>';
            template += '</div>';


            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Save-</div></div>';
            template += '<div class="form-group">';
            template += '<div class="input-group">';
            template += '<span class="input-group-addon">';
            template += '<i class="fa fa-save fa-1-5x"></i>';
            template += '</span>';
            template += '<div class="form-control btn-save" id="btn-save">SAVE</div>';
            template += '</div>';
            template += '</div>';



            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Delete-</div></div>';
            template += '<div class="form-group">';
            template += '<div class="input-group">';
            template += '<span class="input-group-addon">';
            template += '<i class="fa fa-remove fa-1-5x"></i>';
            template += '</span>';
            template += '<div class="form-control btn-delete" id="btn-delete">DELETE</div>';
            template += '</div>';
            template += '</div>';



            return template;
        }

        public static getUserAddTemplate(): string {
            var template = "";

            template += '<div class="wrapper-edit-connector uppercase"><div class="edit-connector-vertical-line"><div class="edit-connector-line"></div></div><div class="edit-connector-content">-Search Username-</div></div>';
            template += '<div class="form-group">';
            template += '<div class="input-group">';
            template += '<span class="input-group-addon">';
            template += '<i class="fa fa-search fa-1-5x"></i>';
            template += '</span>';
            template += '<input type="text" class="form-control" id="username" value=""/>';
            template += '</div>';
            template += '</div>';

            template += '<div class="user-list">';
            template += '<div id="userlist" class="user-list-inner">';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '<div class="user-item"><span class="col-xs-10 ">Username1</span><i class="col-xs-2 fa fa-plus-square fa-1x"></i></div><div class="clear" />';
            template += '</div>';
            template += '</div>';

            return template;
        }
    }
}