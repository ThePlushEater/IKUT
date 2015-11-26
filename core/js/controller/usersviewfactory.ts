module IKUT {
    export class UsersViewFractory {
        private static _instance: UsersViewFractory = new UsersViewFractory();
        private baseUrl: string;
        constructor(args?: any) {
            if (UsersViewFractory._instance) {
                throw new Error("Error: Instantiation failed: Use UsersViewFractory.getInstance() instead of new.");
            }
            UsersViewFractory._instance = this;
        }
        public static getInstance(): UsersViewFractory {
            return UsersViewFractory._instance;
        }
        public static create(el: JQuery): UsersView {
            var view: UsersView = new UsersView({ el: el });
            return view;
        }
    }
} 