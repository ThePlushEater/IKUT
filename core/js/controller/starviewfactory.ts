module IKUT {
    export class StarViewFractory {
        private static _instance: StarViewFractory = new StarViewFractory();
        private baseUrl: string;
        constructor(args?: any) {
            if (StarViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use StarViewFractory.getInstance() instead of new.");
            }
            StarViewFractory._instance = this;
        }
        public static getInstance(): StarViewFractory {
            return StarViewFractory._instance;
        }
        public static create(el: JQuery): StarView {
            var view: StarView = new StarView({ el: el });
            return view;
        }
    }
} 