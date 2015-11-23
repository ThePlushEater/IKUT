module IKUT {
    export class AlarmsViewFractory {
        private static _instance: AlarmsViewFractory = new AlarmsViewFractory();
        private baseUrl: string;
        constructor(args?: any) {
            if (AlarmsViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use AlarmsViewFractory.getInstance() instead of new.");
            }
            AlarmsViewFractory._instance = this;
        }
        public static getInstance(): AlarmsViewFractory {
            return AlarmsViewFractory._instance;
        }
        public static create(el: JQuery): AlarmsView {
            var view: AlarmsView = new AlarmsView({ el: el });
            return view;
        }
    }
} 