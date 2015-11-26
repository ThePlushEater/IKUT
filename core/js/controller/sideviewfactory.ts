module IKUT {
    export class SideViewFractory {
        private static _instance: SideViewFractory = new SideViewFractory();
        private baseUrl: string;
        constructor(args?: any) {
            if (SideViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use SideViewFractory.getInstance() instead of new.");
            }
            SideViewFractory._instance = this;
        }
        public static getInstance(): SideViewFractory {
            return SideViewFractory._instance;
        }
        public static create(el: JQuery): SideView {
            var view: SideView = new SideView({ el: el });
            return view;
        }
    }
} 