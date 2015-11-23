module IKUT {
    export interface MenuOption {
        icon: string;
        color: string;
        hash: string;
    }
    export class MenusView extends BaseView {
        private static TAG: string = "MenusView - ";
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: MenusView = this;
            self.bDebug = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        public render(args?: any): any {
            var self: MenusView = this;
            if (self.bDebug) console.log(MenusView.TAG + "render()");
            
            // apply template
            var template = _.template(Template.getMenusViewTemplate());
            var data = {
                
            }
            self.$el.html(template(data));
            

            $.each(self.$('.wrapper-menu'), function (index: number, item: JQuery) {
                switch (index) {
                    case 0:
                        self.views.push(MenuViewFractory.create($(item), { icon: 'fa-home', color: '#6E2F1C', hash: 'home' }).render());
                        break;
                    case 1:
                        self.views.push(MenuViewFractory.create($(item), { icon: 'fa-clock-o', color: '#8F5C3D', hash: 'alarms' }).render());
                        break;
                    case 2:
                        self.views.push(MenuViewFractory.create($(item), { icon: 'fa-group', color: '#AB8349', hash: 'friends' }).render());
                        break;
                    case 3:
                        self.views.push(MenuViewFractory.create($(item), { icon: 'fa-paper-plane-o', color: '#5C8A7A', hash: 'pushes' }).render());
                        break;
                    case 4:
                        self.views.push(MenuViewFractory.create($(item), { icon: 'fa-star-half-o', color: '#5d7422', hash: 'star' }).render());
                        break;
                }
            });

            return self;
        }

        setCurrentMenu(viewType: VIEWTYPE_LIST): void {
            var self: MenusView = this;
            switch (viewType) {
                case VIEWTYPE_LIST.NONE:
                    break;
                case VIEWTYPE_LIST.HOME:
                    $.each(self.views, function (index: number, item: MenuView) {
                        if (index == 0) {
                            item.setIsActive(true);
                        } else {
                            item.setIsActive(false);
                        }
                    });
                    break;
                case VIEWTYPE_LIST.ALARMS:
                    $.each(self.views, function (index: number, item: MenuView) {
                        if (index == 1) {
                            item.setIsActive(true);
                        } else {
                            item.setIsActive(false);
                        }
                    });
                    break;
                case VIEWTYPE_LIST.FRIENDS:
                    $.each(self.views, function (index: number, item: MenuView) {
                        if (index == 2) {
                            item.setIsActive(true);
                        } else {
                            item.setIsActive(false);
                        }
                    });
                    break;
                case VIEWTYPE_LIST.PUSHES:
                    $.each(self.views, function (index: number, item: MenuView) {
                        if (index == 3) {
                            item.setIsActive(true);
                        } else {
                            item.setIsActive(false);
                        }
                    });
                    break;
                case VIEWTYPE_LIST.STAR:
                    $.each(self.views, function (index: number, item: MenuView) {
                        if (index == 4) {
                            item.setIsActive(true);
                        } else {
                            item.setIsActive(false);
                        }
                    });
                    break;
            }
        }
    }
} 