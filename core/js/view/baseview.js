var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
Backbone.View.prototype.destroy = function () {
    // chain call for removing all subviews under curent view.
    if (this.views != undefined) {
        _.invoke(this.views, 'destroy');
        this.views.length = 0;
    }
    // remove binded event of current view (comment out since it will be handled by remove() call.
    //this.undelegateEvents();
    // remove jquery data
    this.$el.removeData().unbind();
    // remove view from dom (most browswer's remove() also handle unbind().
    this.remove();
    //this.unbind();
    // remove child doms (I am not exactly sure to call this.. This iterates all children dom elements, so it can make program slower).
    this.$el.find("*").remove();
    // I believe most of remove related function will be handled by this remove() call.
    Backbone.View.prototype.remove.call(this);
    // remove any model bind events if it's defined. (onDestroy() function should be defined manually in each view).
    if (this.onDestroy) {
        this.onDestroy();
    }
};
var IKUT;
(function (IKUT) {
    var BaseView = (function (_super) {
        __extends(BaseView, _super);
        function BaseView(options) {
            _super.call(this, options);
            this.bDebug = false;
            this.bRendered = false; // Check whether this view is rendered or not. This status will be used for indicator wheter to create dom elements or just update contents.
            var self = this;
            self.views = new Array();
        }
        BaseView.prototype.render = function (args) {
            this.bRendered = true;
        };
        /*
        public update(): any {
            if (!this.bRendered) {
                this.render();
                return;
            }
        }
        */
        BaseView.prototype.getIsRendered = function () {
            return this.bRendered;
        };
        BaseView.setElement = function (options) {
            this.setElement(options.el);
        };
        BaseView.prototype.getWidth = function () {
            return this.$el.innerWidth();
        };
        BaseView.prototype.getHeight = function () {
            return this.$el.innerHeight();
        };
        // traverse the graph, executing the provided callback on this node and it's children
        // execute the callback before traversing the children
        BaseView.prototype.traverse = function (callback) {
            callback(this);
            this.views.forEach(function (view) {
                view.traverse(callback);
            });
        };
        BaseView.prototype.getViews = function () {
            var self = this;
            return self.views;
        };
        BaseView.prototype.animActive = function () {
        };
        BaseView.prototype.animInactive = function () {
        };
        BaseView.prototype.setVisible = function () {
            this.$el.css({ opacity: 1 });
        };
        BaseView.prototype.setInvisible = function () {
            this.$el.css({ opacity: 0 });
        };
        BaseView.prototype.update = function (args) {
        };
        return BaseView;
    })(Backbone.View);
    IKUT.BaseView = BaseView;
})(IKUT || (IKUT = {}));
//# sourceMappingURL=baseview.js.map