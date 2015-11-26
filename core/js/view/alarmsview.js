var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IKUT;
(function (IKUT) {
    var AlarmsView = (function (_super) {
        __extends(AlarmsView, _super);
        function AlarmsView(options) {
            _super.call(this, options);
            var self = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        AlarmsView.prototype.render = function (args) {
            var self = this;
            if (self.bDebug)
                console.log(AlarmsView.TAG + "render()");
            // get alarms
            var alarms = IKUT.Controller.getDailyAlarms();
            // apply template
            var template = _.template(IKUT.Template.getAlarmsViewTemplate());
            var data = {
                alarms: alarms,
            };
            self.$el.html(template(data));
            //$.each(self.$('.wrapper-button'), function (index: number, item: JQuery) {
            //   ButtonViewFractory.create($(item), {icon: ').render();
            //});       
            var bf = IKUT.ButtonViewFractory.create(self.$('.wrapper-button'), { icon: 'fa-plus-square', content: 'Add a New Daily Alarm', behavior: 'btn-add', isLeft: false });
            bf.render();
            $.each(self.$('.wrapper-notification'), function (index, item) {
                var f2v = IKUT.Frame2ViewFractory.create($(item));
                f2v.render(alarms.models[index]);
            });
            // Make the view slowly visible.
            self.setElement(self.$('#wrapper-alarms'));
            self.animVisible();
            self.addEventListener();
            return self;
        };
        AlarmsView.prototype.update = function (args) {
            var self = this;
            if (self.bDebug)
                console.log(AlarmsView.TAG + "update()");
            // get alarms
            var alarms = IKUT.Controller.getDailyAlarms();
            // apply template
            var template = _.template(IKUT.Template.getAlarmsViewTemplate2());
            var data = {
                alarms: alarms,
            };
            self.$el.html(template(data));
            var bf = IKUT.ButtonViewFractory.create(self.$('.wrapper-button'), { icon: 'fa-plus-square', content: 'Add a New Daily Alarm', behavior: 'btn-add', isLeft: false });
            bf.render();
            $.each(self.$('.wrapper-notification'), function (index, item) {
                var f2v = IKUT.Frame2ViewFractory.create($(item));
                f2v.render(alarms.models[index]);
            });
            self.addEventListener();
            return self;
        };
        AlarmsView.prototype.animVisible = function () {
            var self = this;
            setTimeout(function () {
                self.$el.animate({ opacity: 1 }, function () {
                    IKUT.View.setIsLoading(false);
                });
            }, IKUT.Setting.getViewTransitionDuration() * 2);
        };
        AlarmsView.prototype.animActive = function () {
            var self = this;
            setTimeout(function () {
                self.$el.animate({ left: 0 }, function () {
                    IKUT.View.setIsLoading(false);
                    self.sideView.destroy();
                    self.sideView = null;
                });
            }, IKUT.Setting.getViewTransitionDuration() * 2);
        };
        AlarmsView.prototype.animInactive = function () {
            var self = this;
            setTimeout(function () {
                self.$el.animate({ left: -self.getWidth() }, function () {
                    IKUT.View.setIsLoading(false);
                });
            }, IKUT.Setting.getViewTransitionDuration() * 2);
        };
        AlarmsView.prototype.addEventListener = function () {
            var self = this;
            self.$('.btn-detail').off('click');
            self.$('.btn-detail').on('click', function () {
                if (!IKUT.View.getIsLoading()) {
                    IKUT.View.setIsLoading(true);
                    self.sideView = IKUT.SideViewFractory.create($('#wrapper-main'));
                    self.sideView.setParentView(self);
                    var cid = $(this).attr('data-cid');
                    var alarm = IKUT.Model.getAlarms().findWhere({ cid: cid });
                    if (alarm) {
                        self.sideView.render(alarm);
                        self.animInactive();
                        self.sideView.animActive();
                    }
                    else {
                    }
                }
            });
            self.$('.btn-add').off('click');
            self.$('.btn-add').on('click', function () {
                if (!IKUT.View.getIsLoading()) {
                    IKUT.View.setIsLoading(true);
                    self.sideView = IKUT.SideViewFractory.create($('#wrapper-main'));
                    self.sideView.setParentView(self);
                    var today = moment(new Date());
                    var alarm = new IKUT.Alarm({ name: '', users: "", type: IKUT.ALARM_LIST.DAILY, date: today.format(IKUT.Setting.getDateTimeFormat1()), end: today.format(IKUT.Setting.getDateTimeFormat1()), days: "0000000", category: 0 });
                    alarm.addDailyDay(moment().day());
                    alarm.addUsercId(IKUT.Model.getCurUser().getcId());
                    //var cid = $(this).attr('data-cid');
                    //var alarm: Alarm = Model.getAlarms().findWhere({ cid: cid });
                    if (alarm) {
                        self.sideView.render(alarm);
                        self.animInactive();
                        self.sideView.animActive();
                    }
                    else {
                    }
                }
            });
        };
        AlarmsView.TAG = "AlarmsView - ";
        return AlarmsView;
    })(IKUT.BaseView);
    IKUT.AlarmsView = AlarmsView;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=alarmsview.js.map