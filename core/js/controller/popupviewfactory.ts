module IKUT {
    export class PopupViewFractory {
        private static _instance: PopupViewFractory = new PopupViewFractory();
        private baseUrl: string;
        constructor(args?: any) {
            if (PopupViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use PopupViewFractory.getInstance() instead of new.");
            }
            PopupViewFractory._instance = this;
        }
        public static getInstance(): PopupViewFractory {
            return PopupViewFractory._instance;
        }
        public static create(el: JQuery): PopupView {
            var view: PopupView = new PopupView({ el: el });
            return view;
        }
    }
} 