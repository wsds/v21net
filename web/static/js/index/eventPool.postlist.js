eventPool.main_offline_post_list = function (status, area) {


    $(".modify_post", area).click(function () {
        var postID = $(this).attr("postid");
        var row_section = $(".row-section[postID='" + postID + "']")
        $(".post_show", row_section).toggleClass("hide");
        $(".post_modify", row_section).toggleClass("hide");
    });


    $(".delete_post", area).click(function () {
        var postID = $(this).attr("postid");
        delPost(postID);
    });


    function delPost(postID) {
        $.ajax({
            data: {"postid": postID, "weibo_user": app.localSettings.ownedWeibo.currentWeibo},
            type: 'GET',
            url: ("http://" + app.serverUrl + "/api2/post/del"),
            success: function (data) {
                var row_section = $(".row-section[postID='" + postID + "']");
                row_section.remove();
                if (data["提示信息"] == "成功") {
                }
                else {
                }
            }
        });
    }


    function addPost(time, text, pic) {
        $.ajax({
            data: {"text": text, "weibo_user": app.localSettings.ownedWeibo.currentWeibo, "time": time, "pic": pic},
            type: 'POST',
            url: ("http://" + app.serverUrl + "/api2/post/add"),
            success: function (data) {
                if (data["提示信息"] == "成功") {
                }
                else {
                }
            }
        });
    }

    $(".save_post_modify", area).click(function () {
        var postID = $(this).attr("postid");
        var row_section = $(".row-section[postID='" + postID + "']");
        $(".post_show", row_section).toggleClass("hide");
        $(".post_modify", row_section).toggleClass("hide");


        var public_time = new Date($('#public_time').text());

        var post = data.postlist[postID];
        post.time = public_time.getTime();
        post.text=$(".modify_editor",row_section).val();
        $(".post_text",row_section).html(post.text);
        $(".posttime",row_section).html(getShortDateTimeString(post.time));

    });

    $(".cancel_post_modify", area).click(function () {
        var postID = $(this).attr("postid");
        var row_section = $(".row-section[postID='" + postID + "']");
        $(".post_show", row_section).toggleClass("hide");
        $(".post_modify", row_section).toggleClass("hide");
    });

    $(".time_public", area).dblclick(function () {
        var postID = $(this).attr("postid");
        var row_section = $(".row-section[postID='" + postID + "']");
        $(".modify_post", row_section).trigger("click");
        return false;
    });


};

