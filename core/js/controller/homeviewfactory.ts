module IKUT {
    export class HomeViewFractory {
        private static _instance: HomeViewFractory = new HomeViewFractory();
        private baseUrl: string;
        constructor(args?: any) {
            if (HomeViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use HomeViewFractory.getInstance() instead of new.");
            }
            HomeViewFractory._instance = this;
        }
        public static getInstance(): HomeViewFractory {
            return HomeViewFractory._instance;
        }
        public static create(el: JQuery): HomeView {
            var view: HomeView = new HomeView({ el: el });
            return view;
        }
    }
} 