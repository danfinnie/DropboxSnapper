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
