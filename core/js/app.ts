$(document).ready(function () {
    var url: any = window.location;
    console.log(url.origin + window.location.pathname);
    Wakey.View.setElement({ el: $('#wrapper-main') });

    // Start Router
    Backbone.history.start();
});
