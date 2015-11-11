var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Wakey;
(function (Wakey) {
    (function (Direction) {
        Direction[Direction["NONE"] = 0] = "NONE";
        Direction[Direction["TOP"] = 1] = "TOP";
        Direction[Direction["RIGHT"] = 2] = "RIGHT";
        Direction[Direction["DOWN"] = 3] = "DOWN";
        Direction[Direction["LEFT"] = 4] = "LEFT";
        Direction[Direction["ALL"] = 5] = "ALL";
    })(Wakey.Direction || (Wakey.Direction = {}));
    var Direction = Wakey.Direction;
    var FrameView = (function (_super) {
        __extends(FrameView, _super);
        function FrameView(options) {
            _super.call(this, options);
        }
        FrameView.prototype.render = function (_option) {
            var self = this;
            var template = _.template(Wakey.Template.getFrameViewTemplate());
            var data = {};
            self.$el.html(template(data));
            self.update(_option);
            return self;
        };
        FrameView.prototype.update = function (_option) {
            var self = this;
            self.option = _option;
            switch (self.option.direction) {
                case 0 /* NONE */:
                    self.$('.frame .segment-top-left div').removeClass('top-blank');
                    self.$('.frame .segment-top-left div').removeClass('side-blank');
                    self.$('.frame .segment-top-right div').removeClass('top-blank');
                    self.$('.frame .segment-top-right div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('side-blank');
                    break;
                case 1 /* TOP */:
                    self.$('.frame .segment-top-left div').removeClass('top-blank');
                    self.$('.frame .segment-top-left div').addClass('side-blank');
                    self.$('.frame .segment-top-right div').removeClass('top-blank');
                    self.$('.frame .segment-top-right div').addClass('side-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('side-blank');
                    break;
                case 2 /* RIGHT */:
                    self.$('.frame .segment-top-left div').removeClass('top-blank');
                    self.$('.frame .segment-top-left div').removeClass('side-blank');
                    self.$('.frame .segment-top-right div').addClass('top-blank');
                    self.$('.frame .segment-top-right div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-right div').addClass('top-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('side-blank');
                    break;
                case 3 /* DOWN */:
                    self.$('.frame .segment-top-left div').removeClass('top-blank');
                    self.$('.frame .segment-top-left div').removeClass('side-blank');
                    self.$('.frame .segment-top-right div').removeClass('top-blank');
                    self.$('.frame .segment-top-right div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-left div').addClass('side-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-right div').addClass('side-blank');
                    break;
                case 4 /* LEFT */:
                    self.$('.frame .segment-top-left div').addClass('top-blank');
                    self.$('.frame .segment-top-left div').removeClass('side-blank');
                    self.$('.frame .segment-top-right div').removeClass('top-blank');
                    self.$('.frame .segment-top-right div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-left div').addClass('top-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('side-blank');
                    break;
                case 5 /* ALL */:
                    self.$('.frame .segment-top-left div').addClass('top-blank');
                    self.$('.frame .segment-top-left div').addClass('side-blank');
                    self.$('.frame .segment-top-right div').addClass('top-blank');
                    self.$('.frame .segment-top-right div').addClass('side-blank');
                    self.$('.frame .segment-bottom-left div').addClass('top-blank');
                    self.$('.frame .segment-bottom-left div').addClass('side-blank');
                    self.$('.frame .segment-bottom-right div').addClass('top-blank');
                    self.$('.frame .segment-bottom-right div').addClass('side-blank');
                    break;
            }
            self.$('.frame').css({ "background-color": self.option.backcolor });
            self.$('.frame').css({ "left": self.option.x, "top": self.option.y, "width": self.option.width, "height": self.option.height, "background-color": self.option.bordercolor });
            self.$('.frame .segment').css({ "background-color": self.option.backcolor });
            self.$('.frame .segment div').css({ "background-color": self.option.bordercolor });
            self.$('.frame .segment-top-left div').css({ "width": self.option.width / 2, "height": self.option.height / 2, "margin": 0 });
            self.$('.frame .segment-top-right div').css({ "width": self.option.width / 2, "height": self.option.height / 2, "margin": 0 });
            self.$('.frame .segment-bottom-left div').css({ "width": self.option.width / 2, "height": self.option.height / 2, "margin": 0 });
            self.$('.frame .segment-bottom-right div').css({ "width": self.option.width / 2, "height": self.option.height / 2, "margin": 0 });
            self.$('.frame .segment-top-left .top-blank').css({ "width": self.option.width / 2, "height": self.option.height / 2 - self.option.margin });
            self.$('.frame .segment-top-right .top-blank').css({ "width": self.option.width / 2, "height": self.option.height / 2 - self.option.margin });
            self.$('.frame .segment-bottom-left .top-blank').css({ "margin-top": self.option.margin, "width": self.option.width / 2, "height": self.option.height / 2 - self.option.margin });
            self.$('.frame .segment-bottom-right .top-blank').css({ "margin-top": self.option.margin, "width": self.option.width / 2, "height": self.option.height / 2 - self.option.margin });
            self.$('.frame .segment-top-left .side-blank').css({ "width": self.option.width / 2 - self.option.margin });
            self.$('.frame .segment-top-right .side-blank').css({ "margin-left": self.option.margin, "width": self.option.width / 2 - self.option.margin });
            self.$('.frame .segment-bottom-left .side-blank').css({ "width": self.option.width / 2 - self.option.margin });
            self.$('.frame .segment-bottom-right .side-blank').css({ "margin-left": self.option.margin, "width": self.option.width / 2 - self.option.margin });
            self.$('.frame .content').css({ "background-color": self.option.backcolor });
            self.$('.frame .content').css({ "margin-left": self.option.padding, "margin-top": self.option.padding, "width": self.option.width - self.option.padding * 2, "height": self.option.height - self.option.padding * 2 });
            return self;
        };
        FrameView.prototype.animate = function (_option, duration) {
            var self = this;
            self.option = _option;
            switch (self.option.direction) {
                case 0 /* NONE */:
                    self.$('.frame .segment-top-left div').removeClass('top-blank');
                    self.$('.frame .segment-top-left div').removeClass('side-blank');
                    self.$('.frame .segment-top-right div').removeClass('top-blank');
                    self.$('.frame .segment-top-right div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('side-blank');
                    break;
                case 1 /* TOP */:
                    self.$('.frame .segment-top-left div').removeClass('top-blank');
                    self.$('.frame .segment-top-left div').addClass('side-blank');
                    self.$('.frame .segment-top-right div').removeClass('top-blank');
                    self.$('.frame .segment-top-right div').addClass('side-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('side-blank');
                    break;
                case 2 /* RIGHT */:
                    self.$('.frame .segment-top-left div').removeClass('top-blank');
                    self.$('.frame .segment-top-left div').removeClass('side-blank');
                    self.$('.frame .segment-top-right div').addClass('top-blank');
                    self.$('.frame .segment-top-right div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-right div').addClass('top-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('side-blank');
                    break;
                case 3 /* DOWN */:
                    self.$('.frame .segment-top-left div').removeClass('top-blank');
                    self.$('.frame .segment-top-left div').removeClass('side-blank');
                    self.$('.frame .segment-top-right div').removeClass('top-blank');
                    self.$('.frame .segment-top-right div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-left div').addClass('side-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-right div').addClass('side-blank');
                    break;
                case 4 /* LEFT */:
                    self.$('.frame .segment-top-left div').addClass('top-blank');
                    self.$('.frame .segment-top-left div').removeClass('side-blank');
                    self.$('.frame .segment-top-right div').removeClass('top-blank');
                    self.$('.frame .segment-top-right div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-left div').addClass('top-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('side-blank');
                    break;
                case 5 /* ALL */:
                    self.$('.frame .segment-top-left div').addClass('top-blank');
                    self.$('.frame .segment-top-left div').addClass('side-blank');
                    self.$('.frame .segment-top-right div').addClass('top-blank');
                    self.$('.frame .segment-top-right div').addClass('side-blank');
                    self.$('.frame .segment-bottom-left div').addClass('top-blank');
                    self.$('.frame .segment-bottom-left div').addClass('side-blank');
                    self.$('.frame .segment-bottom-right div').addClass('top-blank');
                    self.$('.frame .segment-bottom-right div').addClass('side-blank');
                    break;
            }
            self.$('.frame').css({ "background-color": self.option.backcolor });
            self.$('.frame').animate({ "left": self.option.x, "top": self.option.y }, duration);
            self.$('.frame').css({ "width": self.option.width, "height": self.option.height, "background-color": self.option.bordercolor });
            self.$('.frame .segment').css({ "background-color": self.option.backcolor });
            self.$('.frame .segment div').css({ "background-color": self.option.bordercolor });
            self.$('.frame .segment-top-left .top-blank').animate({ "height": self.option.height / 2 - self.option.margin }, duration);
            self.$('.frame .segment-top-right .top-blank').animate({ "height": self.option.height / 2 - self.option.margin }, duration);
            self.$('.frame .segment-bottom-left .top-blank').animate({ "margin-top": self.option.margin, "height": self.option.height / 2 - self.option.margin }, duration);
            self.$('.frame .segment-bottom-right .top-blank').animate({ "margin-top": self.option.margin, "height": self.option.height / 2 - self.option.margin }, duration);
            self.$('.frame .segment-top-left .side-blank').animate({ "width": self.option.width / 2 - self.option.margin }, duration);
            self.$('.frame .segment-top-right .side-blank').animate({ "margin-left": self.option.margin, "width": self.option.width / 2 - self.option.margin }, duration);
            self.$('.frame .segment-bottom-left .side-blank').animate({ "width": self.option.width / 2 - self.option.margin }, duration);
            self.$('.frame .segment-bottom-right .side-blank').animate({ "margin-left": self.option.margin, "width": self.option.width / 2 - self.option.margin }, duration);
            self.$('.frame .content').css({ "background-color": self.option.backcolor });
            self.$('.frame .content').animate({ "margin-left": self.option.padding, "margin-top": self.option.padding, "width": self.option.width - self.option.padding * 2, "height": self.option.height - self.option.padding * 2 }, duration);
            return self;
        };
        FrameView.prototype.setDirection = function (_direction) {
            var self = this;
            self.option.direction = _direction;
            self.update(self.option);
        };
        FrameView.prototype.getDirection = function () {
            var self = this;
            return self.option.direction;
        };
        FrameView.prototype.setContent = function (_content) {
            var self = this;
            self.$('.frame .content').css({ 'color': self.option.fontcolor });
            self.$('.frame .content').html(_content);
            self.$('.frame h1').css({ "line-height": (self.option.height - self.option.padding * 2) + "px" });
            self.$('.frame h2').css({ "line-height": (self.option.height - self.option.padding * 2) + "px" });
            self.$('.frame i').css({ "line-height": (self.option.height - self.option.padding * 2) + "px" });
        };
        FrameView.prototype.addEventListener = function (callback) {
            var self = this;
            if (callback != undefined) {
                self.$('.frame .content').click(callback);
            }
        };
        return FrameView;
    })(Wakey.BaseView);
    Wakey.FrameView = FrameView;
})(Wakey || (Wakey = {}));
