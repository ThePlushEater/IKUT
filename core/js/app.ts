$(document).ready(function () {
    var url: any = window.location;
    console.log(url.origin + window.location.pathname);
    IKUT.View.setElement({ el: $('#wrapper-main') });
    IKUT.Setting.setBaseUrl(url.origin + window.location.pathname);

    // Start Router
    Backbone.history.start();
});
