module IKUT {
    export class ButtonView extends BaseView {
        private static TAG: string = "ButtonView - ";
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: ButtonView = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        public render(args?: any): any {
            var self: ButtonView = this;
            if (self.bDebug) console.log(ButtonView.TAG + "render()");

            // apply template
            var template = _.template(Template.getButtonViewTemplate());
            var data = {
                content: "BUTTON",
            }
            self.$el.html(template(data));

            return self;
        }
    }
} 