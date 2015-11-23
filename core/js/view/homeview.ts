module IKUT {
    export class HomeView extends BaseView {
        private static TAG: string = "HomeView - ";
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: HomeView = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        public render(args?: any): any {
            var self: HomeView = this;
            if (self.bDebug) console.log(HomeView.TAG + "render()");
            // apply template
            var template = _.template(Template.getHomeViewTemplate());
            var data = {
                
            }
            self.$el.html(template(data));

            self.setElement(self.$('#wrapper-home'));
            self.animVisible();

            $.each(self.$('.wrapper-notification'), function (index: number, item: JQuery) {
                FrameViewFractory.create($(item)).render();
            });            

            return self;
        }

        public animVisible(): void {
            var self: HomeView = this;
            setTimeout(function () {
                self.$el.animate({ opacity: 1 }, function () {
                    View.setIsLoading(false);
                });
            }, Setting.getViewTransitionDuration() * 2);
        }
    }
} 