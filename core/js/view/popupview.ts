module IKUT {
    export class PopupView extends BaseView {
        private static TAG: string = "PopupView - ";
        public sideView: SideView;
        private tickInterval: number;
        private bDotOn: boolean;
        private curAlarm: Alarm;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var self: PopupView = this;
            self.bDebug = true;
            self.bDotOn = true;
            //$(window).resize(_.debounce(that.customResize, Setting.getInstance().getResizeTimeout()));
        }
        public render(args?: any): any {
            var self: PopupView = this;
            if (self.bDebug) console.log(PopupView.TAG + "render()");

            if (args instanceof Alarm) {
                self.curAlarm = (<Alarm>args);

                console.log(self.curAlarm);

                var cids: Array<string> = (<Alarm>args).getUsercIds();
                var users: Users = new Users();
                $.each(cids, function (index: number, cid: string) {
                    var user: User = Model.getUsers().findWhere({ cid: cid });
                    if (user) {
                        users.add(user);
                    }
                });

                // apply template
                var template = _.template(Template.getPopupViewTemplate());
                var data = {
                    alarmname: (<Alarm>args).getName(),
                    alarmtime: (<Alarm>args).getFormattedTime(),
                    alarmdate: (<Alarm>args).getFormattedDate(),
                    users: users,
                    alarmstars: (<Alarm>args).getStars(),
                }
                self.$el.html(template(data));

                self.$('#alarmstars').html(self.curAlarm.getStars().toString());

                self.$('.wrapper-detail').css({ height: self.getHeight() - parseInt(self.$el.css('padding-top')) - parseInt(self.$el.css('padding-bottom')) - self.$('.wrapper-connector').outerHeight() - 24 });

                
                self.$('.upper-part').css({ height: self.$('.detail-inner').innerHeight() - 190});
                self.$('.bottom-part').css({ height: 180 });

                // render character
                if (Controller.getIsCharacterHasHairPin()) {
                    var character: string = Setting.getContentFileDir() + 'wendy/index.html';
                } else {
                    var character: string = Setting.getContentFileDir() + 'wendy/index2.html';
                }
                self.$('.character-part').html('<iframe src="' + character + '" />');

                // tick interval
                self.startTick();

                // Make the view slowly visible.
                self.setElement(self.$('#wrapper-popup'));
                self.animVisible();

                // Play sound
                alarm1.play();

                self.addEventListener();
            }
            return self;
        }

        public startTick(): void {
            var self: PopupView = this;
            // over time
            var duration = moment.duration(moment(new Date()).diff(self.curAlarm.getDate()));
            var minutes = duration.asMinutes();
            if (minutes > 0) {
                $('.overtime').html("+" + Math.floor(minutes) + " min");
            } else {
                $('.overtime').html(Math.floor(minutes) + " min");
            }
            var gap = moment.duration(moment(new Date()).diff(self.curAlarm.getDate()));
            var gapmin = Math.floor(gap.asMinutes());
            $('#alarmstars').html((Math.floor(self.curAlarm.getStars() / self.curAlarm.getUsercIds().length - gapmin)).toString());
            // start interval
            clearInterval(self.tickInterval);
            self.tickInterval = setInterval(function () {
                var duration = moment.duration(moment(new Date()).diff(self.curAlarm.getDate()));
                var minutes = duration.asMinutes();
                if (minutes > 0) {
                    $('.overtime').html("+" + Math.floor(minutes) + " min");
                } else {
                    $('.overtime').html(Math.floor(minutes) + " min");
                }
                /*
                self.bDotOn = !self.bDotOn;
                if (self.bDotOn) {
                    $('.overtime').removeClass('invisible');
                } else {
                    $('.overtime').addClass('invisible');
                }
                */
                var gap = moment.duration(moment(new Date()).diff(self.curAlarm.getDate()));
                var gapmin = Math.floor(gap.asMinutes());
                $('#alarmstars').html((Math.floor(self.curAlarm.getStars() / self.curAlarm.getUsercIds().length - gapmin)).toString());
            }, 15000);
        }

        public update(args?: any): any {
            var self: PopupView = this;
            if (self.bDebug) console.log(PopupView.TAG + "update()");

            

            return self;
        }

        public animVisible(): void {
            var self: PopupView = this;
            setTimeout(function () {
                self.$el.animate({ opacity: 1 }, function () {
                    View.setIsLoading(false);
                });
            }, Setting.getViewTransitionDuration() * 2);
        }

        public animActive(): void {
            var self: PopupView = this;
            setTimeout(function () {
                self.$el.animate({ left: 0 }, function () {
                    View.setIsLoading(false);
                    self.sideView.destroy();
                    self.sideView = null;
                });
            }, Setting.getViewTransitionDuration() * 2);
        }

        public animInactive(): void {
            var self: PopupView = this;
            setTimeout(function () {
                self.$el.animate({ left: -self.getWidth() }, function () {
                    View.setIsLoading(false);
                });
            }, Setting.getViewTransitionDuration() * 2);
        }

        public addEventListener(): void {
            var self: PopupView = this;
            var gap = moment.duration(moment(new Date()).diff(self.curAlarm.getDate()));
            var gapmin = Math.floor(gap.asMinutes());
            $('.btn-claim').off('click');
            $('.btn-claim').on('click', function () {
                alarm1.pause();
                click1.play();
                clearInterval(self.tickInterval);
                Model.getCurUser().set("stars", Model.getCurUser().getStars() + Math.floor(self.curAlarm.getStars() / self.curAlarm.getUsercIds().length - gapmin));
                Router.navigate('star', { trigger: true, replace: true });
            });
        }
    }
} 