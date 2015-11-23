module IKUT {
    export class MenuViewFractory {
        private static _instance: MenuViewFractory = new MenuViewFractory();
        private baseUrl: string;
        constructor(args?: any) {
            if (MenuViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use MenuViewFractory.getInstance() instead of new.");
            }
            MenuViewFractory._instance = this;
        }
        public static getInstance(): MenuViewFractory {
            return MenuViewFractory._instance;
        }
        public static create(el: JQuery, option: MenuOption): MenuView {
            var view: MenuView = new MenuView({ el: el });
            view.setAttributes(option);
            return view;
        }
    }
} 