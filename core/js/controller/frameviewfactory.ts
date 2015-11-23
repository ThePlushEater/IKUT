module IKUT {
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

    export class Frame2ViewFractory {
        private static _instance: Frame2ViewFractory = new Frame2ViewFractory();
        private baseUrl: string;
        constructor(args?: any) {
            if (Frame2ViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use Frame2ViewFractory.getInstance() instead of new.");
            }
            Frame2ViewFractory._instance = this;
        }
        public static getInstance(): Frame2ViewFractory {
            return Frame2ViewFractory._instance;
        }
        public static create(el: JQuery): Frame2View {
            var view: Frame2View = new Frame2View({ el: el });
            return view;
        }
    }
} 