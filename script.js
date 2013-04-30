$(function() {
    $("#dropbox-chooser").on("DbxChooserSuccess", function(ev) {
        links = $.map(ev.originalEvent.files, function(a) { return a.link; });
        console.log(links);
    });
});
