module IKUT {
    export class DetailViewFractory {
        private static _instance: DetailViewFractory = new DetailViewFractory();
        private baseUrl: string;
        constructor(args?: any) {
            if (DetailViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use DetailViewFractory.getInstance() instead of new.");
            }
            DetailViewFractory._instance = this;
        }
        public static getInstance(): DetailViewFractory {
            return DetailViewFractory._instance;
        }
        public static create(el: JQuery): DetailView {
            var view: DetailView = new DetailView({ el: el });
            return view;
        }
    }
} 