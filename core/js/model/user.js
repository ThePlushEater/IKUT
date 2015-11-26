var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IKUT;
(function (IKUT) {
    var User = (function (_super) {
        __extends(User, _super);
        function User(attributes, options) {
            _super.call(this, attributes, options);
            this.url = "";
            this.isSavable = true;
            var self = this;
            this.defaults = {
                "id": 0,
                "username": "",
                "password": "",
                "firstname": "",
                "lastname": "",
                "description": "",
                "recent": moment(new Date()).format(IKUT.Setting.getDateTimeFormat1()),
                "created": moment(new Date()).format(IKUT.Setting.getDateTimeFormat1()),
            };
            if (attributes.cid == undefined) {
                self.set('cid', self.cid);
            }
            self.off("change");
            self.on("change", function (model, options) {
                if (self.isSavable == false)
                    return;
                self.isSavable = false;
                model.save({}, {
                    wait: true,
                    success: function (model, response) {
                        model.isSavable = true;
                    },
                    error: function (error, response) {
                    },
                });
            });
        }
        // non-url mode
        User.prototype.sync = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i - 0] = arguments[_i];
            }
            return null;
        };
        User.prototype.fetch = function (options) {
            return null;
        };
        User.prototype.save = function (attributes, options) {
            return null;
        };
        User.prototype.parse = function (response, options) {
            if (response.id != undefined) {
                response.id = parseInt(response.id);
            }
            response.recent = moment(response.recent).format(IKUT.Setting.getDateTimeFormat1());
            response.created = moment(response.created).format(IKUT.Setting.getDateTimeFormat1());
            return _super.prototype.parse.call(this, response, options);
        };
        User.prototype.toJSON = function (options) {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        };
        User.prototype.getId = function () {
            return this.get('cid');
        };
        User.prototype.getcId = function () {
            return this.cid;
        };
        User.prototype.getUsername = function () {
            var self = this;
            return this.get('username');
        };
        User.prototype.getPassword = function () {
            var self = this;
            return this.get('password');
        };
        User.prototype.getFirstname = function () {
            var self = this;
            return this.get('firstname');
        };
        User.prototype.getLastname = function () {
            var self = this;
            return this.get('lastname');
        };
        User.prototype.getDescription = function () {
            var self = this;
            return this.get('description');
        };
        User.prototype.getFormattedRecentDate = function () {
            var self = this;
            return moment(self.get('recent')).format(IKUT.Setting.getDateTimeFormat2());
        };
        User.prototype.getFormattedCreatedDate = function () {
            var self = this;
            return moment(self.get('created')).format(IKUT.Setting.getDateTimeFormat2());
        };
        return User;
    })(Backbone.Model);
    IKUT.User = User;
    var Users = (function (_super) {
        __extends(Users, _super);
        function Users(models, options) {
            _super.call(this, models, options);
            this.url = "";
            this.model = User;
        }
        return Users;
    })(Backbone.Collection);
    IKUT.Users = Users;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=user.js.map