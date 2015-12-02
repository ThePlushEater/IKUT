module IKUT {
    export class StarView extends BaseView {
        private static TAG: string = "StarView - ";
        public sideView: SideView;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: StarView = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        public render(args?: any): any {
            var self: StarView = this;
            if (self.bDebug) console.log(StarView.TAG + "render()");

            // apply template
            if (Controller.getIsCharacterHasHairPin()) {
                var character: string = Setting.getContentFileDir() + 'wendy/index.html';
            } else {
                var character: string = Setting.getContentFileDir() + 'wendy/index2.html';
            }
            var stars = Model.getCurUser().getStars().toString();
            stars = stars.replace(new RegExp("^(\\d{" + (stars.length % 3 ? stars.length % 3 : 0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim()
            var sep = ",";
            stars = stars.replace(/\s/g, sep);
            var template = _.template(Template.getStarViewTemplate());
            var data = {
                username: Model.getCurUser().getUsername(),
                firstname: Model.getCurUser().getFirstname(),
                lastname: Model.getCurUser().getLastname(),
                password: Model.getCurUser().getPassword(),
                character: character,
                stars: stars,
            }
            self.$el.html(template(data));


            // Make the view slowly visible.
            self.setElement(self.$('#wrapper-star'));
            self.animVisible();

            self.addEventListener();
            return self;
        }

        public update(args?: any): any {
            var self: StarView = this;
            if (self.bDebug) console.log(StarView.TAG + "update()");

            

            return self;
        }

        public animVisible(): void {
            var self: StarView = this;
            setTimeout(function () {
                self.$el.animate({ opacity: 1 }, function () {
                    View.setIsLoading(false);
                });
            }, Setting.getViewTransitionDuration() * 2);
        }

        public animActive(): void {
            var self: StarView = this;
            setTimeout(function () {
                self.$el.animate({ left: 0 }, function () {
                    View.setIsLoading(false);
                    self.sideView.destroy();
                    self.sideView = null;
                });
            }, Setting.getViewTransitionDuration() * 2);
        }

        public animInactive(): void {
            var self: StarView = this;
            setTimeout(function () {
                self.$el.animate({ left: -self.getWidth() }, function () {
                    View.setIsLoading(false);
                });
            }, Setting.getViewTransitionDuration() * 2);
        }

        public addEventListener(): void {
            var self: StarView = this;
            self.$('#btn-save').off('click');
            self.$('#btn-save').on('click', function () {
                click1.play();

                View.setIsLoading(true);
                // remove all warnings
                self.$('.warn').addClass('hidden');
                // check valid time.
                var isError: boolean = false;
                if ($('#password1').val() == "") {
                    $('.warn-password1').removeClass('hidden');
                    isError = true;
                }
                if ($('#password1').val() != $('#password2').val()) {
                    $('.warn-password2').removeClass('hidden');
                    isError = true;
                }
                if (isError) {
                    View.setIsLoading(false);
                    return;
                }
                // change info
                Model.getCurUser().set('password', $('#password1').val());
                Model.getCurUser().set('firstname', $('#firstname').val());
                Model.getCurUser().set('lastname', $('#lastname').val());
                View.setIsLoading(false);
            });
            
            self.$('.btn-coupon').addClass('btn-color1');
            self.$('.btn-shop').addClass('btn-color1');

            self.$('.btn-shop').addClass('btn-color1');
            self.$('.btn-shop').off('click');
            self.$('.btn-shop').on('click', function () {
                click1.play();

                
                if (!Controller.getIsCharacterHasHairPin()) {
                    if (Model.getCurUser().getStars() > 10000000) {
                        Model.getCurUser().set('stars', Model.getCurUser().getStars() - 10000000);
                        Controller.setIsCharacterHasHairPin(true);
                        self.render();
                    }
                }
            });
        }
    }
} 