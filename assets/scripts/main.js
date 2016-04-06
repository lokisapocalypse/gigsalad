'use strict';

$(function() {
    $('#carousel-right-button').on('click', function() {
        var numRemaining = $('#performer-list .active').nextAll().length,
            total;

        // once we only have about 5 left, let's grab some more
        if (numRemaining <= 5) {
            total = $('#performer-list .item').length;

            $.post('/demo/ajax-load-performers/' + total, function (response) {
                $('#performer-list').append(response);
            });
        }
    });
});
