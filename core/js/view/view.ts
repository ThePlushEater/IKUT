module Wakey {
    export enum MainViewType {
        NONE, HOME, MENU
    }
    export class BaseView extends Backbone.View<Backbone.Model> {
        protected bDebug: boolean = false;
        protected bRendered: boolean = false; // Check whether this view is rendered or not. This status will be used for indicator wheter to create dom elements or just update contents.
        private views: Array<BaseView>; // sub views tree list
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: BaseView = this;
            self.views = new Array<BaseView>();
        }
        public render(): any {
            this.bRendered = true;
        }
        public update(): any {
            if (!this.bRendered) {
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

        // traverse the graph, executing the provided callback on this node and it's children
        // execute the callback before traversing the children
        public traverse(callback: (obj: BaseView) => void) {
            callback(this);
            this.views.forEach(function (view) {
                view.traverse(callback);
            });
        }

        public getViews(): Array<BaseView> {
            var self: BaseView = this;
            return self.views;
        }
    }
    export class View extends BaseView {
        private static _instance: View = new View();
        private viewType: MainViewType = MainViewType.NONE;
        private static TAG: string = "View - ";
        private clockInterval: any;
        private isFlickerOn: boolean;
        private isMenuOpen: boolean;
        
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
                case MainViewType.HOME:
                    self.renderBaseView();
                    break;
                case MainViewType.MENU:
                    break;
            }
        }
        
        private renderBaseView(): void {
            var self: View = this;
            if (self.bDebug) console.log(View.TAG + "renderBaseView()");
            var template = _.template(Template.getBaseViewTemplate());
            var data = {
                //width: self.getWidth(),
                //height: self.getHeight(),
            }
            self.$el.html(template(data));

            self.tickClock();
            self.addMenuOpenListener();

            

            /*
            var template = _.template(Template.getStoryBaseTemplate());
            console.log(self.getWidth());
            console.log(self.getHeight());
            var data = {
                width: self.getWidth(),
                height: self.getHeight(),
            }
            
            */
        }

        private addMenuOpenListener = () => {
            var self: View = this;
            self.isMenuOpen = false;
            $('#display-menu').css({
                height: $('#display-body').innerHeight() - 2,
                top: $('#display-body').position().top + 1,
                left: -$('#display-menu').innerWidth(),
            });

            $('#toggle-menu').off('click');
            $('#toggle-menu').on('click', self.toggleMenu);
        }

        private toggleMenu = () => {
            var self: View = this;
            if (self.isMenuOpen) {  // time to close menu
                $('#display-menu').animate({ left: -$('#display-menu').innerWidth() }, 500);
            } else {    // time to open menu
                $('#display-menu').animate({ left: '15px' }, 500);
                
            }
            self.isMenuOpen = !self.isMenuOpen;
        }
        
        private tickClock = () => {
            var self: View = this;
            self.isFlickerOn = true;
            self.clockInterval = setInterval(function () {
                
                if (self.isFlickerOn) {
                    $('#display-time').html(moment(new Date()).format(Setting.getTimeFormat1()));
                } else {
                    $('#display-time').html(moment(new Date()).format(Setting.getTimeFormat2()));
                }
                self.isFlickerOn = !self.isFlickerOn;
                $('#display-date').html(moment(new Date()).format(Setting.getDateFormat()));
            }, 500);
        }

        private stopClock = () => {
            var self: View = this;
            clearInterval(self.clockInterval);
        }
        

    }
}