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
}

module IKUT {
    export class BaseView extends Backbone.View<Backbone.Model> {
        protected bDebug: boolean = false;
        protected bRendered: boolean = false; // Check whether this view is rendered or not. This status will be used for indicator wheter to create dom elements or just update contents.
        protected views: Array<BaseView>; // sub views tree list
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: BaseView = this;
            self.views = new Array<BaseView>();
        }
        public render(args?: any): any {
            this.bRendered = true;
        }
        public update(): any {
            if (!this.bRendered) {
                this.render();
                return;
            }
        }
        public getIsRendered(): boolean {
            return this.bRendered;
        }
        public static setElement(options?: Backbone.ViewOptions<Backbone.Model>): void {
            this.setElement(options.el);
        }
        public getWidth(): number {
            return this.$el.innerWidth();
        }
        public getHeight(): number {
            return this.$el.innerHeight();
        }

        // traverse the graph, executing the provided callback on this node and it's children
        // execute the callback before traversing the children
        public traverse(callback: (obj: BaseView) => void) {
            callback(this);
            this.views.forEach(function (view) {
                view.traverse(callback);
            });
        }

        public getViews(): Array<BaseView> {
            var self: BaseView = this;
            return self.views;
        }
    }
}