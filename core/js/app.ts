var replaceAt = function (str: string, index: number, character: string) {
    return str.substr(0, index) + character + str.substr(index + character.length);
}

$(document).ready(function () {
    var url: any = window.location;
    IKUT.Model.MockupData();
    IKUT.View.setElement({ el: $('#wrapper-main') });
    IKUT.Setting.setBaseUrl(url.origin + window.location.pathname);

    // Start Router
    Backbone.history.start();

    alarm1 = new Howl({
        urls: [IKUT.Setting.getContentFileDir() + "wakeupmercy.mp3"],
        loop: true,
        autoplay: false,
    });

    click1 = new Howl({
        urls: [IKUT.Setting.getContentFileDir() + "click.mp3"],
        loop: false,
        autoplay: false,
    });
});

declare var Howl;
var click1: any;
var alarm1: any;