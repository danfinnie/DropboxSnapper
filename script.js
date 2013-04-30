$(function() {
    events = $({});

    events.on("imagesSelected", function(ev, links) {
        // console.log(links);
    });

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
        console.log("Facebook login status: " + response.status);
        if (response.status === 'connected') {
        // connected
        } else if (response.status === 'not_authorized') {
        // not_authorized
        } else {
        // not_logged_in
        }
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
