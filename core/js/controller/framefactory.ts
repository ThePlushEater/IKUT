module Wakey {
    export class FrameViewFractory {
        private static _instance: FrameViewFractory = new FrameViewFractory();
        private baseUrl: string;
        constructor(args?: any) {
            if (FrameViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use FrameViewFractory.getInstance() instead of new.");
            }
            FrameViewFractory._instance = this;
        }
        public static getInstance(): FrameViewFractory {
            return FrameViewFractory._instance;
        }
        public static create(el: JQuery): FrameView {
            var view: FrameView = new FrameView({ el: el });
            return view;
        }
    }
} 