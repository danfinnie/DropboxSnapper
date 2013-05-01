(function(events) {
    $.each(["imagesSelected",
        "facebook:login:connected",
        "facebook:login:not_authorized",
        "facebook:login:not_logged_in"],
        function(i, customEvent) {
            events.on(customEvent, function() {
                extraParams = Array.prototype.slice.call(arguments, 1);
                console.log("event: " + customEvent + ", extraParams: " + extraParams);
                console.log(extraParams);
            });
        }
    );

    $(function() {
        $("#dropbox-chooser").on("DbxChooserSuccess", function(ev) {
            links = $.map(ev.originalEvent.files, function(a) { return a.link; });
            events.trigger("imagesSelected", [links]);
        });
    });

    window.fbAsyncInit = function() {
        FB.init({
          appId      : '371594599611866',
          channelUrl : 'http://dropbox-facebook.localhost/channel.html',
          status     : true,
          xfbml      : true
        });

        FB.getLoginStatus(function(response) {
            events.trigger("facebook:login:"+response.status, [response]);
        });
    };
})($({}));

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
