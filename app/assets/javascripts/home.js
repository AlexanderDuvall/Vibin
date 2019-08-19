$('#DJ').click(function () {
    Rails.ajax({
        url: $(this).data("url"),
        type: "GET",
        success: function () {
            console.log("lol");
        }
    })
});

$(function () {
    if ($('.pagination').length && $('#feed').length) {
        $(window).scroll(function () {
            var url;
            url = $('.pagination .next_page a').attr('href');
            console.log("url" + url);
            if (url && $(window).scrollTop() > $(document).height() - $(window).height() - 50) {
                $('.pagination').text("Loading more products...");
                return $.getScript(url);
            }
        });
        return $(window).scroll();
    }
});

function aj() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    $(document).ready(function () {
        if ($('.pagination').length && $('#feed').length) {
            $("#center_column").scroll(function () {
                var url;
                url = $('.pagination ul .next.next_page a').attr('href');
                if (url && $("#center_column").scrollTop() > $("#feed").height() - $("#center_column").height() - 50) {
                    $('.pagination').text("Loading more products...");
                    return $.getScript(url);
                }
            });
            return $(window).scroll();
        }
    });
}

function ajProfile() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    $(document).ready(function () {
        if ($('.pagination').length && $('#feed').length) {
            $(".tab-content .tab-pane:first").scroll(function () {
                var url;
                url = $('.pagination ul .next.next_page a').attr('href');
                if (url && $(".tab-content .tab-pane:first").scrollTop() > $("#feed").height() - $(".tab-content .tab-pane:first").height() - 50) {
                    $('.pagination').text("Loading more products...");
                    return $.getScript(url);
                }
            });
            return $(window).scroll();
        }
    });
}
