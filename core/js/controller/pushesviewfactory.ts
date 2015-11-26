module IKUT {
    export class PushesViewFractory {
        private static _instance: PushesViewFractory = new PushesViewFractory();
        private baseUrl: string;
        constructor(args?: any) {
            if (PushesViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use PushesViewFractory.getInstance() instead of new.");
            }
            PushesViewFractory._instance = this;
        }
        public static getInstance(): PushesViewFractory {
            return PushesViewFractory._instance;
        }
        public static create(el: JQuery): PushesView {
            var view: PushesView = new PushesView({ el: el });
            return view;
        }
    }
} 