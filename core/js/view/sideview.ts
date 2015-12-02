module IKUT {
    export class SideView extends BaseView {
        private static TAG: string = "SideView - ";
        private parentView: BaseView;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: SideView = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        public render(args?: any): any {
            var self: SideView = this;
            if (self.bDebug) console.log(SideView.TAG + "render()");

            if (args instanceof Alarm) {
                console.log(args);
                
                // apply template
                var template = _.template(Template.getSideViewTemplate());
                var data = {

                }
                self.$el.append(template(data));

                self.setElement(self.$('#wrapper-side'));

                var bf: ButtonView = ButtonViewFractory.create(self.$('.wrapper-button'), { icon: 'fa-angle-left', content: 'Back to List', behavior: 'btn-back', isLeft: true });
                bf.render();

                self.$('.wrapper-detail').css({ height: self.getHeight() - parseInt(self.$el.css('padding-top')) - parseInt(self.$el.css('padding-bottom')) - self.$('.wrapper-button').outerHeight() - self.$('.wrapper-connector').outerHeight() });

                // add detail
                var dv: DetailView = DetailViewFractory.create(self.$('.wrapper-detail'));
                dv.setParentView(self);
                dv.render(args);

                self.addEventListener();
            } else if (args instanceof User) {
                // apply template
                var template = _.template(Template.getSideViewTemplate());
                var data = {

                }
                self.$el.append(template(data));

                self.setElement(self.$('#wrapper-side'));

                var bf: ButtonView = ButtonViewFractory.create(self.$('.wrapper-button'), { icon: 'fa-angle-left', content: 'Back to List', behavior: 'btn-back', isLeft: true });
                bf.render();

                self.$('.wrapper-detail').css({ height: self.getHeight() - parseInt(self.$el.css('padding-top')) - parseInt(self.$el.css('padding-bottom')) - self.$('.wrapper-button').outerHeight() - self.$('.wrapper-connector').outerHeight() });

                // add detail
                var dv: DetailView = DetailViewFractory.create(self.$('.wrapper-detail'));
                dv.setParentView(self);
                dv.render(args);


                self.addEventListener();
            }
            

            return self;
        }

        public animActive(): void {
            var self: SideView = this;
            setTimeout(function () {
                self.$el.animate({ left: 0 }, function () {
                    View.setIsLoading(false);
                });
            }, Setting.getViewTransitionDuration() * 2);
        }

        public animInactive(): void {
            var self: SideView = this;
            self.parentView.update();
            self.parentView.animActive();
            setTimeout(function () {
                self.$el.animate({ left: self.getWidth() }, function () {
                    View.setIsLoading(false);
                });
            }, Setting.getViewTransitionDuration() * 2);
        }

        public setParentView(view: BaseView) {
            var self: SideView = this;
            self.parentView = view;
        }

        public addEventListener(): void {
            var self: SideView = this;

            self.$('.wrapper-button .btn-back').addClass('btn-color1');
            self.$('.wrapper-button .btn-back').off('click');
            self.$('.wrapper-button .btn-back').on('click', function () {
                click1.play();

                View.setIsLoading(true);
                self.animInactive();
            });

        }
    }
} 