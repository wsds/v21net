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

        var status = getForward(postID);

        var public_time_str = app.forwardTime.public_time;
        var public_time = new Date(public_time_str);
        var time = public_time.getTime();

        var text = $(".edit_forward[postID='" + postID + "']").val();

        addPost(time, text, status)
    });

    function getForward(postID) {
        var status;
        for (var index in  data.statuses) {
            status = data.statuses[index];
            status.id == postID;
            break
        }
        return status;
    };

    function addPost(time, text, status) {
        $.ajax({
            data: {"text": text,
                "weibo_user": app.localSettings.ownedWeibo.currentWeibo,
                "time": time,
                "forwardid": status.id,
                "forwarduser": status.user.screen_name,
                "forwardtime": status.created_at,
                "profile_image": status.user.profile_image_url,
                "forwordtext": status.text
            },
            type: 'POST',
            url: ("http://" + app.serverUrl + "/api2/post/addforward"),
            success: function (data) {
                if (data["提示信息"] == "成功") {
                }
                else {
                }
            }
        });
    };


};

