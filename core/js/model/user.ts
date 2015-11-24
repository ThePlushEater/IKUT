module IKUT {
    export class User extends Backbone.Model {
        url: string = "";
        private isSavable = true;
        constructor(attributes?: any, options?: any) {
            super(attributes, options);
            var self: User = this;
            this.defaults = <any>{
                "id": 0,
                "username": "",
                "password": "",
                "name": "",
                "recent": moment(new Date()).format(Setting.getDateTimeFormat1()),
                "created": moment(new Date()).format(Setting.getDateTimeFormat1()),
            };

            self.off("change");
            self.on("change", function (model: User, options) {
                if (self.isSavable == false) return;
                self.isSavable = false;
                model.save(
                    {},
                    {
                        wait: true,
                        success: function (model: User, response: any) {
                            model.isSavable = true;
                        },
                        error: function (error, response) {
                        },
                    }
                );
            });
        }

        // non-url mode
        sync(...arg: any[]): JQueryXHR {
            return null;
        }
        fetch(options?: Backbone.ModelFetchOptions): JQueryXHR {
            return null;
        }
        save(attributes?: any, options?: Backbone.ModelSaveOptions): any {
            return null;
        }

        parse(response: any, options?: any): any {
            if (response.id != undefined) {
                response.id = parseInt(response.id);
            }
            response.recent = moment(response.recent).format(Setting.getDateTimeFormat1());
            response.created = moment(response.created).format(Setting.getDateTimeFormat1());
            return super.parse(response, options);
        }
        toJSON(options?: any): any {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        }
        public getId(): number {
            return Math.floor(this.id);
        }
        public getcId(): string {
            return this.cid;
        }
        public getUsername(): string {
            var self: User = this;
            return this.get('username');
        }
        public getPassword(): string {
            var self: User = this;
            return this.get('password');
        }
        public getName(): string {
            var self: User = this;
            return this.get('name');
        }
        public getFormattedRecentDate(): string {
            var self: User = this;
            return moment(self.get('recent')).format(Setting.getDateTimeFormat2());
        }
        public getFormattedCreatedDate(): string {
            var self: User = this;
            return moment(self.get('created')).format(Setting.getDateTimeFormat2());
        }
    }
    export class Users extends Backbone.Collection<User> {
        url: string = "";
        constructor(models?: User[], options?: any) {
            super(models, options);
            this.model = User;
        }

        public getIds(): Array<number> {
            var self: Users = this;
            var result = Array<number>();
            $.each(self.models, function (index: number, model: User) {
                if (result.indexOf(model.getId()) == -1) {
                    result.push(model.getId());
                }
            });
            return result;
        }
    }
}