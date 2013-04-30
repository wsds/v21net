eventPool.main_offline_post_list = function (status, area) {


    $(".modify_post", area).click(function () {
        var postID = $(this).attr("postid");
        var row_section = $(".row-section[postID='" + postID + "']")
        $(".post_show", row_section).toggleClass("hide")
        $(".post_modify", row_section).toggleClass("hide")
    });


    $(".save_post_modify", area).click(function () {
        var postID = $(this).attr("postid");
        var row_section = $(".row-section[postID='" + postID + "']")
        $(".post_show", row_section).toggleClass("hide")
        $(".post_modify", row_section).toggleClass("hide")
    });

    $(".cancel_post_modify", area).click(function () {
        var postID = $(this).attr("postid");
        var row_section = $(".row-section[postID='" + postID + "']")
        $(".post_show", row_section).toggleClass("hide")
        $(".post_modify", row_section).toggleClass("hide")
    });

    $(".time_public", area).dblclick(function () {
        var postID = $(this).attr("postid");
        var row_section = $(".row-section[postID='" + postID + "']")
        $(".modify_post", row_section).trigger("click");
        return false;
    });


};

