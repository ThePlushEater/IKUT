module Wakey {
    export enum MainViewType {
        NONE, SPLASH, MENU
    }
    export class BaseView extends Backbone.View<Backbone.Model> {
        protected bDebug: boolean = false;
        protected bRendered: boolean = false; // Check whether this view is rendered or not. This status will be used for indicator wheter to create dom elements or just update contents.
        public render(args?: any): any {
            this.bRendered = true;
        }
        public update(args?: any): any {
            if (this.bRendered) {
                this.render();
                return;
            }
        }
        public getIsRendered(): boolean {
            return this.bRendered;
        }
        public static setElement(options?: Backbone.ViewOptions<Backbone.Model>): void {
            this.setElement(options.el);
        }
        public getWidth(): number {
            return this.$el.innerWidth();
        }
        public getHeight(): number {
            return this.$el.innerHeight();
        }
    }
    export class View extends BaseView {
        private static _instance: View = new View();
        private viewType: MainViewType = MainViewType.NONE;
        private static TAG: string = "View - ";
        private bAnimated: boolean;
        private btnStart: FrameView;
        private fvBackground: FrameView;
        private btnClock: FrameView;
        private btnMenu1: FrameView;
        private btnMenu2: FrameView;
        private btnMenu3: FrameView;
        private btnMenu4: FrameView;
        private btnMenu5: FrameView;
        private bMenuOpen: boolean;
        
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            if (View._instance) {
                throw new Error("Error: Instantiation failed: Use View.getInstance() instead of new.");
            }
            View._instance = this;
            var self: View = View._instance;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        public static setElement(options?: Backbone.ViewOptions<Backbone.Model>): void {
            View._instance.setElement(options.el);
        }
        public static getInstance(): View {
            return View._instance;
        }
        public static setViewType(_viewType: MainViewType): void {
            View._instance.viewType = _viewType;
        }
        public render(): any {
            var self: View = this;
            if (self.bDebug) console.log(View.TAG + "render()");
            switch (self.viewType) {
                case MainViewType.SPLASH:
                    self.renderSplashView();
                    break;
                case MainViewType.MENU:
                    self.renderMenuView();
                    break;
            }
        }
        private renderMenuView(): void {
            var self: View = this;
            if (self.bDebug) console.log(View.TAG + "renderMenuView()");
            var template = _.template(Template.getMenuViewTemplate());
            var data = {}
            self.$el.html(template(data));

            self.fvBackground = FrameViewFractory.create(self.$('#wrapper-background'));
            self.fvBackground.render({
                x: 0, y: 0, width: self.getWidth(), height: self.getHeight(), margin: 0, padding: 8, direction: Direction.NONE, bordercolor: "#2c3e50", backcolor: "#bdc3c7", fontcolor: "#bdc3c7"
            });

            var framewidth: number = 80;
            self.btnStart = FrameViewFractory.create(self.$('#wrapper-menu'));
            self.btnStart.render({
                x: self.getWidth() - framewidth - 16, y: 16, width: framewidth, height: framewidth, margin: 12, padding: 6, direction: Direction.LEFT, bordercolor: "#2c3e50", backcolor: "#bdc3c7", fontcolor: "#2c3e50"
            });
            self.btnStart.setContent('<i class="fa fa-list fa-25x"></i>');

            self.btnMenu1 = FrameViewFractory.create(self.$('#wrapper-menu1'));
            self.btnMenu1.render({
                x: self.getWidth(), y: 16 * 3 + framewidth, width: framewidth, height: framewidth, margin: 12, padding: 6, direction: Direction.ALL, bordercolor: "#bdc3c7", backcolor: "#2c3e50", fontcolor: "#bdc3c7"
            });
            self.btnMenu1.setContent('<i class="fa fa-clock-o fa-25x"></i>');

            self.btnMenu2 = FrameViewFractory.create(self.$('#wrapper-menu2'));
            self.btnMenu2.render({
                x: self.getWidth(), y: 16 * 4 + framewidth * 2, width: framewidth, height: framewidth, margin: 12, padding: 6, direction: Direction.NONE, bordercolor: "#bdc3c7", backcolor: "#2c3e50", fontcolor: "#bdc3c7"
            });
            self.btnMenu2.setContent('<i class="fa fa-user fa-25x"></i>');

            self.btnMenu3 = FrameViewFractory.create(self.$('#wrapper-menu3'));
            self.btnMenu3.render({
                x: self.getWidth(), y: 16 * 5 + framewidth * 3, width: framewidth, height: framewidth, margin: 12, padding: 6, direction: Direction.NONE, bordercolor: "#bdc3c7", backcolor: "#2c3e50", fontcolor: "#bdc3c7"
            });
            self.btnMenu3.setContent('<i class="fa fa-users fa-25x"></i>');


            self.btnMenu4 = FrameViewFractory.create(self.$('#wrapper-menu4'));
            self.btnMenu4.render({
                x: self.getWidth(), y: 16 * 6 + framewidth * 4, width: framewidth, height: framewidth, margin: 12, padding: 6, direction: Direction.NONE, bordercolor: "#bdc3c7", backcolor: "#2c3e50", fontcolor: "#bdc3c7"
            });
            self.btnMenu4.setContent('<i class="fa fa-cog fa-25x"></i>');


            self.btnMenu5 = FrameViewFractory.create(self.$('#wrapper-menu5'));
            self.btnMenu5.render({
                x: self.getWidth(), y: 16 * 7 + framewidth * 5, width: framewidth, height: framewidth, margin: 12, padding: 6, direction: Direction.NONE, bordercolor: "#bdc3c7", backcolor: "#2c3e50", fontcolor: "#bdc3c7"
            });
            self.btnMenu5.setContent('<i class="fa fa-sign-out fa-25x"></i>');


            self.btnClock = FrameViewFractory.create(self.$('#wrapper-clock'));
            self.btnClock.render({
                x: 16, y: 16, width: self.getWidth() - framewidth - 16 * 3, height: framewidth, margin: 12, padding: 6, direction: Direction.RIGHT, bordercolor: "#bdc3c7", backcolor: "#2c3e50", fontcolor: "#bdc3c7"
            });

            self.bMenuOpen = false;
            self.btnStart.addEventListener(self.toggleMenu);

            self.bAnimated = true;
            self.animateClock();

        }
        private renderSplashView(): void {
            var self: View = this;
            if (self.bDebug)    console.log(View.TAG + "renderSplashView()");
            var template = _.template(Template.getSplashViewTemplate());
            var data = {}
            self.$el.html(template(data));

            self.fvBackground = FrameViewFractory.create(self.$('#wrapper-background'));
            self.fvBackground.render({
                x: 0, y: 0, width: self.getWidth(), height: self.getHeight(), margin: 0, padding: self.getWidth() / 2, direction: Direction.NONE, bordercolor: "#2c3e50", backcolor: "#bdc3c7", fontcolor: "#bdc3c7"
            });



            var fontsize: number = 50;
            var framewidth: number = 120;
            self.$('#wrapper-title .title-1').css({ left: self.getWidth() - framewidth * 2 + fontsize * 0.95, top: self.getHeight() - framewidth * 2.5 - fontsize * 1.25 });
            self.$('#wrapper-title .title-2').css({ left: self.getWidth() - framewidth + fontsize * 0.25, top: self.getHeight() - framewidth * 2 - fontsize * 0.25 });
            self.$('#wrapper-title .title-3').css({ left: self.getWidth() - framewidth * 2 + fontsize * 0.65, top: self.getHeight() - framewidth * 1.5 + fontsize * 0.75 });
            self.$('#wrapper-title .title-4').css({ left: self.getWidth() - framewidth * 2 - fontsize * 1.25, top: self.getHeight() - framewidth * 2 - fontsize * 0.25 });

            self.btnStart = FrameViewFractory.create(self.$('#wrapper-start'));
            self.btnStart.render({
                x: self.getWidth() - 120 * 2, y: self.getHeight() - 120 * 2.5, width: framewidth, height: framewidth, margin: 32, padding: 8, direction: Direction.NONE, bordercolor: "#bdc3c7", backcolor: "#2c3e50", fontcolor: "#bdc3c7" });

            self.bAnimated = true;
            self.animateLogo();

            
            
            /*

            var self: View = View.getInstance();
            var template = _.template(Template.getFrameViewTemplate());
            var data = {}
            self.$el.html(template(data));

            self.$('.frame').jQueryTween({ to: { width: 150 }, yoyo: false });
            */
        }

        private toggleMenu = () => {
            var self: View = this;
            self.bMenuOpen = !self.bMenuOpen;
            var framewidth: number = 80;
            if (self.bMenuOpen) {
                self.fvBackground.animate({
                    x: -self.getWidth(), y: 0, width: self.getWidth(), height: self.getHeight(), margin: 0, padding: 8, direction: Direction.NONE, bordercolor: "#2c3e50", backcolor: "#bdc3c7", fontcolor: "#bdc3c7"
                }, 250);
                self.btnStart.setDirection(Direction.DOWN);
                self.btnMenu1.animate({
                    x: self.getWidth() - framewidth - 16, y: 16 * 3 + framewidth, width: framewidth, height: framewidth, margin: 12, padding: 6, direction: Direction.ALL, bordercolor: "#bdc3c7", backcolor: "#2c3e50", fontcolor: "#bdc3c7"
                }, 250);
                self.btnMenu2.animate({
                    x: self.getWidth() - framewidth - 16, y: 16 * 4 + framewidth * 2, width: framewidth, height: framewidth, margin: 12, padding: 6, direction: Direction.NONE, bordercolor: "#bdc3c7", backcolor: "#2c3e50", fontcolor: "#bdc3c7"
                }, 250);
                self.btnMenu3.animate({
                    x: self.getWidth() - framewidth - 16, y: 16 * 5 + framewidth * 3, width: framewidth, height: framewidth, margin: 12, padding: 6, direction: Direction.NONE, bordercolor: "#bdc3c7", backcolor: "#2c3e50", fontcolor: "#bdc3c7"
                }, 250);
                self.btnMenu4.animate({
                    x: self.getWidth() - framewidth - 16, y: 16 * 6 + framewidth * 4, width: framewidth, height: framewidth, margin: 12, padding: 6, direction: Direction.NONE, bordercolor: "#bdc3c7", backcolor: "#2c3e50", fontcolor: "#bdc3c7"
                }, 250);
                self.btnMenu5.animate({
                    x: self.getWidth() - framewidth - 16, y: 16 * 7 + framewidth * 5, width: framewidth, height: framewidth, margin: 12, padding: 6, direction: Direction.NONE, bordercolor: "#bdc3c7", backcolor: "#2c3e50", fontcolor: "#bdc3c7"
                }, 250);
            } else {
                self.btnStart.setDirection(Direction.LEFT);
                self.fvBackground.animate({
                    x: 0, y: 0, width: self.getWidth(), height: self.getHeight(), margin: 0, padding: 8, direction: Direction.NONE, bordercolor: "#2c3e50", backcolor: "#bdc3c7", fontcolor: "#bdc3c7"
                }, 250);
                self.btnMenu1.animate({
                    x: self.getWidth(), y: 16 * 3 + framewidth, width: framewidth, height: framewidth, margin: 12, padding: 6, direction: Direction.ALL, bordercolor: "#bdc3c7", backcolor: "#2c3e50", fontcolor: "#bdc3c7"
                }, 250);
                self.btnMenu2.animate({
                    x: self.getWidth(), y: 16 * 4 + framewidth * 2, width: framewidth, height: framewidth, margin: 12, padding: 6, direction: Direction.NONE, bordercolor: "#bdc3c7", backcolor: "#2c3e50", fontcolor: "#bdc3c7"
                }, 250);
                self.btnMenu3.animate({
                    x: self.getWidth(), y: 16 * 5 + framewidth * 3, width: framewidth, height: framewidth, margin: 12, padding: 6, direction: Direction.NONE, bordercolor: "#bdc3c7", backcolor: "#2c3e50", fontcolor: "#bdc3c7"
                }, 250);
                self.btnMenu4.animate({
                    x: self.getWidth(), y: 16 * 6 + framewidth * 4, width: framewidth, height: framewidth, margin: 12, padding: 6, direction: Direction.NONE, bordercolor: "#bdc3c7", backcolor: "#2c3e50", fontcolor: "#bdc3c7"
                }, 250);
                self.btnMenu5.animate({
                    x: self.getWidth(), y: 16 * 7 + framewidth * 5, width: framewidth, height: framewidth, margin: 12, padding: 6, direction: Direction.NONE, bordercolor: "#bdc3c7", backcolor: "#2c3e50", fontcolor: "#bdc3c7"
                }, 250);
            }
        }

        private animateClock = () => {
            var self: View = this;
            setTimeout(function () {
                self.btnClock.setContent('<h2>' + moment(new Date()).format(Setting.getDateTimeFormat()) + '</h2>');
                if (self.bAnimated) {
                    self.animateClock();
                }
            }, 1000);
        }

        private animateLogo = () => {
            var self: View = this;
            setTimeout(function () {
                switch (self.btnStart.getDirection()) {
                    case Direction.NONE:
                        self.$('#wrapper-title .title-1').removeClass('hidden');
                        self.btnStart.setDirection(Direction.TOP);
                        self.btnStart.setContent("<h1>.</h1>");
                        break;
                    case Direction.TOP:
                        self.$('#wrapper-title .title-2').removeClass('hidden');
                        self.$('#wrapper-title .title-1').addClass('title-inactive');
                        self.btnStart.setDirection(Direction.RIGHT);
                        self.btnStart.setContent("<h1>..</h1>");
                        break;
                    case Direction.RIGHT:
                        self.$('#wrapper-title .title-3').removeClass('hidden');
                        self.$('#wrapper-title .title-2').addClass('title-inactive');
                        self.btnStart.setDirection(Direction.DOWN);
                        self.btnStart.setContent("<h1>...</h1>");
                        break;
                    case Direction.DOWN:
                        self.$('#wrapper-title .title-4').removeClass('hidden');
                        self.$('#wrapper-title .title-3').addClass('title-inactive');
                        self.btnStart.setDirection(Direction.LEFT);
                        self.btnStart.setContent("<h1>....</h1>");
                        break;
                    case Direction.LEFT:
                        self.bAnimated = false;
                        self.$('#wrapper-title .title-4').addClass('title-inactive');
                        self.btnStart.setContent("<h1>Start</h1>");
                        self.btnStart.addEventListener(self.transitionFromLogoToMenu);
                        break;
                }
                //self.btnStart.setContent("<h1>Start</h1>");
                //
                if (self.bAnimated) {
                    self.animateLogo();
                }
            }, 500);
        }

        private transitionFromLogoToMenu = () => {
            var self: View = this;
            setTimeout(function () {
                self.$('#wrapper-title .title-1').animate({ top: -200 }, 500);
                self.$('#wrapper-title .title-2').animate({ left: self.getWidth() + 200 }, 500);
                self.$('#wrapper-title .title-3').animate({ top: self.getHeight() + 200 }, 500);
                self.$('#wrapper-title .title-4').animate({ left: -200 }, 500);
            }, 100);
            setTimeout(function () {
                var fontsize: number = 50;
                var framewidth: number = 120;
                self.btnStart.setContent("");
                self.btnStart.render({
                    x: self.getWidth() - 120 * 2, y: self.getHeight() - 120 * 2.5, width: framewidth, height: framewidth, margin: 32, padding: 8, direction: Direction.NONE, bordercolor: "#bdc3c7", backcolor: "#bdc3c7", fontcolor: "#bdc3c7"
                });
                self.fvBackground.animate({
                    x: 0, y: 0, width: self.getWidth(), height: self.getHeight(), margin: 0, padding: 8, direction: Direction.NONE, bordercolor: "#2c3e50", backcolor: "#bdc3c7", fontcolor: "#bdc3c7"
                }, 150);
                /*
                self.btnStart.animate({
                    x: self.getWidth() - framewidth - margin, y: margin, width: framewidth, height: framewidth, margin: 16, padding: 4, direction: Direction.ALL, bordercolor: "#bdc3c7", backcolor: "#2c3e50", fontcolor: "#bdc3c7"
                }, 1000);
                */
                setTimeout(function () {
                    Router.getInstance().navigate("menu", { trigger: true, replace: false });
                }, 150);
            }, 750);
        }
    }
}