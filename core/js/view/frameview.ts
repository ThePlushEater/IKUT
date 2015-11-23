module IKUT {
    export class FrameView extends BaseView {
        private static TAG: string = "FrameView - ";
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: FrameView = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        public render(args?: any): any {
            var self: FrameView = this;
            if (self.bDebug) console.log(FrameView.TAG + "render()");

            // apply template
            var template = _.template(Template.getFrameViewTemplate());
            var data = {
                header: "2:00PM",
                content: "CONTENT",
            }
            self.$el.html(template(data));

            return self;
        }
    }

    export class Frame2View extends BaseView {
        private static TAG: string = "Frame2View - ";
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: Frame2View = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        public render(args?: any): any {
            var self: Frame2View = this;
            if (self.bDebug) console.log(Frame2View.TAG + "render()");

            // apply template
            var template = _.template(Template.getFrame2ViewTemplate());
            var data = {
                header: "12:00PM",
                content: "CONTENT",
            }
            self.$el.html(template(data));

            return self;
        }
    }
} 