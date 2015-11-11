module Wakey {
    export enum Direction {
        NONE, TOP, RIGHT, DOWN, LEFT, ALL
    }
    export interface FrameViewOption {
        x: number;
        y: number;
        width: number;
        height: number;
        margin: number;
        padding: number;
        direction: Direction;
        bordercolor: string;
        backcolor: string;
        fontcolor: string;
    }
    export class FrameView extends BaseView {
        private option: FrameViewOption;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
        }

        render(_option: FrameViewOption): any {
            var self: FrameView = this;
            var template = _.template(Template.getFrameViewTemplate());
            var data = {}
            self.$el.html(template(data));

            self.update(_option);
            
            return self;
        }

        update(_option: FrameViewOption): any {
            var self: FrameView = this;
            self.option = _option;
            switch (self.option.direction) {
                case Direction.NONE:
                    self.$('.frame .segment-top-left div').removeClass('top-blank');
                    self.$('.frame .segment-top-left div').removeClass('side-blank');
                    self.$('.frame .segment-top-right div').removeClass('top-blank');
                    self.$('.frame .segment-top-right div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('side-blank');
                    break;
                case Direction.TOP:
                    self.$('.frame .segment-top-left div').removeClass('top-blank');
                    self.$('.frame .segment-top-left div').addClass('side-blank');
                    self.$('.frame .segment-top-right div').removeClass('top-blank');
                    self.$('.frame .segment-top-right div').addClass('side-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('side-blank');
                    break;
                case Direction.RIGHT:
                    self.$('.frame .segment-top-left div').removeClass('top-blank');
                    self.$('.frame .segment-top-left div').removeClass('side-blank');
                    self.$('.frame .segment-top-right div').addClass('top-blank');
                    self.$('.frame .segment-top-right div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-right div').addClass('top-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('side-blank');
                    break;
                case Direction.DOWN:
                    self.$('.frame .segment-top-left div').removeClass('top-blank');
                    self.$('.frame .segment-top-left div').removeClass('side-blank');
                    self.$('.frame .segment-top-right div').removeClass('top-blank');
                    self.$('.frame .segment-top-right div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-left div').addClass('side-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-right div').addClass('side-blank');
                    break;
                case Direction.LEFT:
                    self.$('.frame .segment-top-left div').addClass('top-blank');
                    self.$('.frame .segment-top-left div').removeClass('side-blank');
                    self.$('.frame .segment-top-right div').removeClass('top-blank');
                    self.$('.frame .segment-top-right div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-left div').addClass('top-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('side-blank');
                    break;
                case Direction.ALL:
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
        }

        animate(_option: FrameViewOption, duration: number): any {
            var self: FrameView = this;
            self.option = _option;

            switch (self.option.direction) {
                case Direction.NONE:
                    self.$('.frame .segment-top-left div').removeClass('top-blank');
                    self.$('.frame .segment-top-left div').removeClass('side-blank');
                    self.$('.frame .segment-top-right div').removeClass('top-blank');
                    self.$('.frame .segment-top-right div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('side-blank');
                    break;
                case Direction.TOP:
                    self.$('.frame .segment-top-left div').removeClass('top-blank');
                    self.$('.frame .segment-top-left div').addClass('side-blank');
                    self.$('.frame .segment-top-right div').removeClass('top-blank');
                    self.$('.frame .segment-top-right div').addClass('side-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('side-blank');
                    break;
                case Direction.RIGHT:
                    self.$('.frame .segment-top-left div').removeClass('top-blank');
                    self.$('.frame .segment-top-left div').removeClass('side-blank');
                    self.$('.frame .segment-top-right div').addClass('top-blank');
                    self.$('.frame .segment-top-right div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-right div').addClass('top-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('side-blank');
                    break;
                case Direction.DOWN:
                    self.$('.frame .segment-top-left div').removeClass('top-blank');
                    self.$('.frame .segment-top-left div').removeClass('side-blank');
                    self.$('.frame .segment-top-right div').removeClass('top-blank');
                    self.$('.frame .segment-top-right div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-left div').addClass('side-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-right div').addClass('side-blank');
                    break;
                case Direction.LEFT:
                    self.$('.frame .segment-top-left div').addClass('top-blank');
                    self.$('.frame .segment-top-left div').removeClass('side-blank');
                    self.$('.frame .segment-top-right div').removeClass('top-blank');
                    self.$('.frame .segment-top-right div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-left div').addClass('top-blank');
                    self.$('.frame .segment-bottom-left div').removeClass('side-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('top-blank');
                    self.$('.frame .segment-bottom-right div').removeClass('side-blank');
                    break;
                case Direction.ALL:
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
        }

        public setDirection(_direction: Direction): void {
            var self: FrameView = this;
            self.option.direction = _direction;
            self.update(self.option);
        }

        public getDirection(): Direction {
            var self: FrameView = this;
            return self.option.direction;
        }

        public setContent(_content: string): void {
            var self: FrameView = this;
            self.$('.frame .content').css({ 'color': self.option.fontcolor });
            self.$('.frame .content').html(_content);
            self.$('.frame h1').css({ "line-height": (self.option.height - self.option.padding * 2) + "px" });
            self.$('.frame h2').css({ "line-height": (self.option.height - self.option.padding * 2) + "px" });
            self.$('.frame i').css({ "line-height": (self.option.height - self.option.padding * 2) + "px" });
        }

        public addEventListener(callback?: Function) {
            var self: FrameView = this;
            if (callback != undefined) {
                self.$('.frame .content').click(callback);
            }
        }

    }
}