module IKUT {
    export class MenusViewFractory {
        private static _instance: MenusViewFractory = new MenusViewFractory();
        private baseUrl: string;
        constructor(args?: any) {
            if (MenusViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use MenusViewFractory.getInstance() instead of new.");
            }
            MenusViewFractory._instance = this;
        }
        public static getInstance(): MenusViewFractory {
            return MenusViewFractory._instance;
        }
        public static create(el: JQuery): MenusView {
            var view: MenusView = new MenusView({ el: el });
            return view;
        }
    }
} 