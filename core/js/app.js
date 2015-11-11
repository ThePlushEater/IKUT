$(document).ready(function () {
    var url = window.location;
    console.log(url.origin + window.location.pathname);
    Wakey.View.setElement({ el: $('#wrapper-main') });
    Backbone.history.start();
});
