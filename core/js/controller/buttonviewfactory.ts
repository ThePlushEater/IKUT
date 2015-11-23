module IKUT {
    export class ButtonViewFractory {
        private static _instance: ButtonViewFractory = new ButtonViewFractory();
        private baseUrl: string;
        constructor(args?: any) {
            if (ButtonViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use ButtonViewFractory.getInstance() instead of new.");
            }
            ButtonViewFractory._instance = this;
        }
        public static getInstance(): ButtonViewFractory {
            return ButtonViewFractory._instance;
        }
        public static create(el: JQuery): ButtonView {
            var view: ButtonView = new ButtonView({ el: el });
            return view;
        }
    }
} 