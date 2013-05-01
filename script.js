$.fn.afterAll = function() {
    var args = arguments;
    var numCallbacks = arguments[0].match(/ /g).length+1;
    var extraParams = {};
    return this.each(function() {
        var numCallbacksTriggered = 0;
        var localArgs = Array.prototype.slice.call(args, 0);
        var callback = localArgs.splice(-1)[0];
        localArgs.push(function(ev) {
            numCallbacksTriggered++;
            extraParams[ev.type] = arguments;
            if (numCallbacksTriggered == numCallbacks)
                callback.call(this, extraParams);
        });
        $this = $(this);
        $this.on.apply($this, localArgs);
    });
};

(function(events) {
    $(function() {
        $("#dropbox-chooser").on("DbxChooserSuccess", function(ev) {
            links = $.map(ev.originalEvent.files, function(a) { return a.link; });
            events.trigger("imagesSelected", [links]);
        });
    });

    events.afterAll("facebook:login:connected imagesSelected", function(ev) {
        var albumName = "Dropbox Snapper " + parseInt(Math.random()*500);
        FB.api("/me/albums", "post", { name: albumName }, function(response) {
            var albumId = response.id;
            var batchRequest = $.map(ev.imagesSelected[1], function(imageUrl) {
                return {
                    method: "POST",
                    relative_url: albumId + "/photos",
                    body: "url=" + encodeURIComponent(imageUrl)
                };
            });
            FB.api("/", "post", { batch: batchRequest });
        });
    });

    window.fbAsyncInit = function() {
        FB.init({
          appId      : '371594599611866',
          channelUrl : 'http://dropbox-facebook.localhost/channel.html',
          status     : true,
          xfbml      : true
        });

        FB.Event.subscribe('auth.authResponseChange', function(response) {
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
