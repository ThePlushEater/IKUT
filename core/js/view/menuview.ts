module IKUT {
    export class MenuView extends BaseView {
        private static TAG: string = "MenuView - ";
        private _icon: string;
        private _color: string;
        private _hash: string;
        private _active: boolean;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: MenuView = this;
            self.bDebug = false;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        public render(args?: any): any {
            var self: MenuView = this;
            if (self.bDebug) console.log(MenuView.TAG + "render()");
            
            // apply template
            var template = _.template(Template.getMenuViewTemplate());
            var data = {
                icon: self._icon,
                color: self._color,
            }
            self.$el.html(template(data));

            self.$('.menu-inner').css({ 'border-color': self._color });
            self.$('.menu-inner i').css({ 'color': self._color });

            self.addEventListener();

            return self;
        }

        public setAttributes(option: MenuOption): void {
            var self: MenuView = this;
            self._icon = option.icon;
            self._color = option.color;
            self._hash = option.hash;
        }

        public setIsActive(active: boolean) {
            var self: MenuView = this;
            self._active = active;

            if (self._active) {
                self.$el.css({ top: Setting.getMenuTopActiveOffset() });
            } else {
                self.$el.css({ top: 0 });
            }
        }

        public addEventListener() {
            var self: MenuView = this;
            self.$el.off('click');
            self.$el.on('click', function () {
                click1.play();
                if (!View.getIsLoading()) {
                    Router.navigate(self._hash, { trigger: true, replace: false });
                }
                
            });
        }
    }
} 