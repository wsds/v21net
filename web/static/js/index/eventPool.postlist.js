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


    function delPost(postID, modify) {
        $.ajax({
            data:{"postid":postID, "weibo_user":app.localSettings.ownedWeibo.currentWeibo},
            type:'GET',
            url:("http://" + app.serverUrl + "/api2/post/del"),
            success:function (data) {

                if (data["提示信息"] == "删除成功" && modify == null) {
                    var row_section = $(".row-section[postID='" + postID + "']");
                    row_section.remove();
                }
                else if (data["提示信息"] != "删除成功") {
                    alert(JSON.stringify(data));
                }
            }
        });
    }


    function addPost(time, text, pic) {
        $.ajax({
            data:{"text":text, "weibo_user":app.localSettings.ownedWeibo.currentWeibo, "time":time, "pic":pic},
            type:'POST',
            url:("http://" + app.serverUrl + "/api2/post/add"),
            success:function (data) {
                if (data["提示信息"] == "成功") {
                }
                else {
                }
            }
        });
    }

    function modifyPost(postID, time, text) {
        $.ajax({
            data:{"postid":postID,
                "weibo_user":app.localSettings.ownedWeibo.currentWeibo,
                "time":time,
                "text":text
            },
            type:'GET',
            url:("http://" + app.serverUrl + "/api2/post/modify"),
            success:function (data) {
                if (data["提示信息"] == "修改成功") {
                }
                else if (data["提示信息"] != "修改成功") {
                    alert(JSON.stringify(data));
                }
            }
        });
    }

    $(".save_post_modify", area).click(function () {
        var postID = $(this).attr("postid");
        var row_section = $(".row-section[postID='" + postID + "']");
        $(".post_show", row_section).toggleClass("hide");
        $(".post_modify", row_section).toggleClass("hide");

        var post = data.postlist[postID];
        var public_time_str = data.time[postID].public_time;
        var public_time = new Date(public_time_str);
        post.time = public_time.getTime();

        post.text = $(".modify_editor", row_section).val();

        modifyPost(postID, post.time, post.text);
        $(".post_text", row_section).html(post.text);
        $(".posttime", row_section).html(public_time_str);

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

eventPool.main_offline_forward_list = function (status, area) {

    $(".delete_post", area).click(function () {
        var postID = $(this).attr("postid");
        delPost(postID);
    });


    function delPost(postID, modify) {
        $.ajax({
            data:{"postid":postID, "weibo_user":app.localSettings.ownedWeibo.currentWeibo},
            type:'GET',
            url:("http://" + app.serverUrl + "/api2/post/del"),
            success:function (data) {

                if (data["提示信息"] == "删除成功" && modify == null) {
                    var row_section = $(".forward_list_row[postID='" + postID + "']");
                    row_section.remove();
                }
                else if (data["提示信息"] != "删除成功") {
                    alert(JSON.stringify(data));
                }
            }
        });
    }


};

