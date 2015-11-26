var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IKUT;
(function (IKUT) {
    var PushesView = (function (_super) {
        __extends(PushesView, _super);
        function PushesView(options) {
            _super.call(this, options);
            var self = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        PushesView.prototype.render = function (args) {
            var self = this;
            if (self.bDebug)
                console.log(PushesView.TAG + "render()");
            // get alarms
            var alarms = IKUT.Controller.getGroupAlarms();
            // apply template
            var template = _.template(IKUT.Template.getPushesViewTemplate());
            var data = {
                alarms: alarms,
            };
            self.$el.html(template(data));
            var bf = IKUT.ButtonViewFractory.create(self.$('.wrapper-button'), { icon: 'fa-plus-square', content: 'Add a New Group Alarm', behavior: 'btn-add', isLeft: false });
            bf.render();
            $.each(self.$('.wrapper-notification'), function (index, item) {
                var f2v = IKUT.Frame2ViewFractory.create($(item));
                f2v.render2(alarms.models[index]);
            });
            // Make the view slowly visible.
            self.setElement(self.$('#wrapper-pushes'));
            self.animVisible();
            self.addEventListener();
            return self;
        };
        PushesView.prototype.update = function (args) {
            var self = this;
            if (self.bDebug)
                console.log(PushesView.TAG + "update()");
            // get alarms
            var alarms = IKUT.Controller.getGroupAlarms();
            // apply template
            var template = _.template(IKUT.Template.getPushesViewTemplate2());
            var data = {
                alarms: alarms,
            };
            self.$el.html(template(data));
            var bf = IKUT.ButtonViewFractory.create(self.$('.wrapper-button'), { icon: 'fa-plus-square', content: 'Add a New Group Alarm', behavior: 'btn-add', isLeft: false });
            bf.render();
            $.each(self.$('.wrapper-notification'), function (index, item) {
                var f2v = IKUT.Frame2ViewFractory.create($(item));
                f2v.render2(alarms.models[index]);
            });
            self.addEventListener();
            return self;
        };
        PushesView.prototype.animVisible = function () {
            var self = this;
            setTimeout(function () {
                self.$el.animate({ opacity: 1 }, function () {
                    IKUT.View.setIsLoading(false);
                });
            }, IKUT.Setting.getViewTransitionDuration() * 2);
        };
        PushesView.prototype.animActive = function () {
            var self = this;
            setTimeout(function () {
                self.$el.animate({ left: 0 }, function () {
                    IKUT.View.setIsLoading(false);
                    self.sideView.destroy();
                    self.sideView = null;
                });
            }, IKUT.Setting.getViewTransitionDuration() * 2);
        };
        PushesView.prototype.animInactive = function () {
            var self = this;
            setTimeout(function () {
                self.$el.animate({ left: -self.getWidth() }, function () {
                    IKUT.View.setIsLoading(false);
                });
            }, IKUT.Setting.getViewTransitionDuration() * 2);
        };
        PushesView.prototype.addEventListener = function () {
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
                    var alarm = new IKUT.Alarm({ name: '', users: "", type: 2 /* GROUP */, date: today.format(IKUT.Setting.getDateTimeFormat1()), end: today.format(IKUT.Setting.getDateTimeFormat1()), days: "0000000", category: 0 });
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
        PushesView.TAG = "PushesView - ";
        return PushesView;
    })(IKUT.BaseView);
    IKUT.PushesView = PushesView;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=pushesview.js.map