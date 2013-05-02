eventPool.main_forward = function (status, area) {


    $(".forward_post_show", area).click(function () {
        var postID = $(this).attr("postid");
        var forward_post_panel = $(".forward_post_panel[postID='" + postID + "']");
        forward_post_panel.toggleClass("hide");
    });

    $(".cancel_forward_post", area).click(function () {
        var postID = $(this).attr("postid");
        var forward_post_panel = $(".forward_post_panel[postID='" + postID + "']");
        forward_post_panel.addClass("hide");
    });

    $(".forward_post", area).click(function () {
        var postID = $(this).attr("postid");
        var forward_post_panel = $(".forward_post_panel[postID='" + postID + "']");
        forward_post_panel.addClass("hide");
    });

};

