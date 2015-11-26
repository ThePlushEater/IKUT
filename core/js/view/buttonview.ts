module IKUT {
    export interface ButtonOption {
        icon: string;
        content: string;
        behavior: string;
        isLeft: boolean;
    }
    export class ButtonView extends BaseView {
        private static TAG: string = "ButtonView - ";
        private icon: string;
        private content: string;
        private behavior: string;
        private isLeft: boolean;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: ButtonView = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }

        public setAttribute(option: ButtonOption) {
            var self: ButtonView = this;
            self.icon = option.icon;
            self.content = option.content;
            self.behavior = option.behavior;
            self.isLeft = option.isLeft;
        }
        public render(args?: any): any {
            var self: ButtonView = this;
            if (self.bDebug) console.log(ButtonView.TAG + "render()");
            
            if (self.isLeft) {
                // apply template
                var template = _.template(Template.getButtonViewTemplate());
                var data = {
                    icon: self.icon,
                    content: self.content,
                    behavior: self.behavior,
                }
                self.$el.html(template(data));
            } else {
                // apply template
                var template = _.template(Template.getButtonViewTemplate2());
                var data = {
                    icon: self.icon,
                    content: self.content,
                    behavior: self.behavior,
                }
                self.$el.html(template(data));
            }
            

            return self;
        }
    }
} 