eventPool = {};
app.eventPool = eventPool;


eventPool.body = function (status, area) {
    if (app.localSettings.key == null || app.localSettings.account == null) {
        window.location.href = "/account.html";
    }


    $("#slide_ctrls li a").click(function () {
        var main_panel = $(this).attr("slide");

        $("#slide_ctrls li a").removeClass("current");
        $(this).toggleClass("current");

        $(".subnav").removeClass("current");
        $(".subnav").hide();
        $(".subnav[slide='" + main_panel + "']").toggleClass("current");
        $(".subnav[slide='" + main_panel + "']").show();

        var main_panel_container = $(".templateContainer[template='main_panel']");
        main_panel_container.attr("status", main_panel);
        renderTemplate(main_panel_container);
    });

    $(".subnav li a").click(function () {
        var main_panel = $(this).attr("slide");
        $(".subnav li a[slide='" + main_panel + "']").removeClass("current");
        $(this).toggleClass("current");
    });
    $(".normalTitle h2").click(function () {
        $(".nav").slideToggle("fast");
        $(".subnav.current").slideToggle("fast");
    });

    publishList = {};
    $("#publish").click(function () {
        publish();
        function publish() {
            $.ajax({
                data: {},
                type: 'GET',
                url: ("http://" + app.serverUrl + "/api2/server/publishing"),
                success: function (data) {
                    publishList = data["globaldata.publishing"];
                    if (data["提示信息"] == "成功") {
                    }
                    else {
                    }
                }
            });
        }
    });
    result1 = "";
    result2 = "";
    $("#check_publish").click(function () {
        check_publish_from_head(publishList);
        function check_publish_from_head(publishList) {
            result1 = "head";

            var head = getHead(publishList);
            var post = head;
            var postID = head.id;
            while (post.next != "tail") {
                result1 += ">>>";
                result1 += postID;
                postID = post.next;
                post = publishList[postID];
                if (post == null) {
                    result1 += ">>>###########error#############"
                    break;
                }
            }
            result1 += ">>>tail"
            return result1;
        }


        check_publish_from_tail(publishList);
        function check_publish_from_tail(publishList) {
            result2 = "tail";

            var tail = getTail(publishList);
            var post = tail;
            var postID = tail.id;
            while (post.next != "head") {
                result2 += "<<<";
                result2 += postID;
                postID = post.previous;
                post = publishList[postID];
                if (post == null) {
                    result2 += "<<<###########error#############"
                    break;
                }
            }
            result2 += "<<<head"
            return result2;
        }


        function getHead(publishList) {
            var post;
            for (var postID in publishList) {
                post = publishList[postID];
                if (post.previous == "head") {
                    break;
                }
            }
            post.id = postID;
            return post;
        }

        function getTail(publishList) {
            var post;
            for (var postID in publishList) {
                post = publishList[postID];
                if (post.previous == "tail") {
                    break;
                }
            }
            post.id = postID;
            return post;
        }

    });

    $("#clear").click(function () {
        publish();
        function publish() {
            $.ajax({
                data: {},
                type: 'GET',
                url: ("http://" + app.serverUrl + "/api2/server/clear"),
                success: function (data) {
                    if (data["提示信息"] == "成功") {
                    }
                    else {
                    }
                }
            });
        }
    });

    $("#start_publishing").click(function () {
            $.ajax({
                data: {},
                type: 'GET',
                url: ("http://" + app.serverUrl + "/api2/publishing/start"),
                success: function (data) {
                    if (data["提示信息"] == "成功") {
                    }
                    else {
                    }
                }
            });
    });

    $("#check_publishing").click(function () {
        $.ajax({
            data: {},
            type: 'GET',
            url: ("http://" + app.serverUrl + "/api2/publishing/check"),
            success: function (data) {
                if (data["提示信息"] == "成功") {
                }
                else {
                }
            }
        });
    });


    $("#check_status").click(function () {
        $.ajax({
            data: {},
            type: 'GET',
            url: ("http://" + app.serverUrl + "/api2/publishing/status/aa"),
            success: function (data) {
                if (data["提示信息"] == "成功") {
                }
                else {
                }
            }
        });
    });

    $("#weibo_interface").click(function () {
        publish();
        function publish() {
            $.ajax({
                data: {screen_name: "冯志成plus"},
                type: 'GET',
                url: ("http://" + app.serverUrl + "/api2/weiboInterface/weibo"),
                success: function (data) {
                    if (data["提示信息"] == "成功") {
                    }
                    else {
                    }
                }
            });
        }
    });

    $("#weibo_users").click(function () {
        publish();
        function publish() {
            $.ajax({
                data: {screen_name: "冯志成plus"},
                type: 'GET',
                url: ("http://" + app.serverUrl + "/api2/server/weibo_users"),
                success: function (data) {
                    if (data["提示信息"] == "成功") {
                    }
                    else {
                    }
                }
            });
        }
    });

    $("body").click(function () {
        var droppedElements = $(".drop");
        droppedElements.toggleClass("drop");
        var shouldHideElements = $(".shouldHide");
        shouldHideElements.toggleClass("hide");
        shouldHideElements.toggleClass("shouldHide");
    });
};

eventPool.login_bar = function (status, area) {

    $(".account", area).click(function () {
        $(this).toggleClass("drop");
        $(".afterlogin", $(this)).toggleClass("hide");
        $(".afterlogin", $(this)).toggleClass("shouldHide");
        return false;//block event message loop pop this message to its father element.
    });


    $(".login_bar_li", area).click(function () {
        var operation = $(this).attr("operation");

        var main_panel_container = $(".templateContainer[template='main_panel']");
        if (operation == "change_password") {
            main_panel_container.attr("status", "main_password");
        }
        else if (operation == "weibo_management") {
            $(".account", $('#owned_weibo_container')).trigger("click", ["management"]);
        }
        renderTemplate(main_panel_container);
        return false;

    });

    $("#auth_logout", area).click(function () {
        app.localSettings.key = undefined;
        app.localSettings.account = undefined;
        app.localSettings.ownedWeibo = undefined;
        app.localSettings.authTip = "重新登录";
        saveLocalSettings();
        window.location.href = "/account.html";
    });
};


eventPool.owned_weibo = function (status, area) {

    $(".account", area).click(function (event, management) {
        if (management == null) {
            $(".owned_weibo_del", $('#owned_weibo_container')).addClass("hide");
        }
        else {
            $(".owned_weibo_del", $('#owned_weibo_container')).removeClass("hide");
        }
        $(this).toggleClass("drop");
        $(".afterlogin", $(this)).toggleClass("hide");
        $(".afterlogin", $(this)).toggleClass("shouldHide");
        return false;//block event message loop pop this message to its father element.
    });

    $(".owned_weibo_li", area).click(function () {
        settings.ownedWeibo.currentWeibo = $(this).attr("weibo");
        if (settings.main == "main_offline_post_list") {
            resolvePostlist();
            $(".subnav").show();
            //$(".subnavpoint_af").show();
        }
    });

};


eventPool.time_control = function (status, area) {
    $(".select_time", area).mousewheel(function (event, delta, deltaX, deltaY) {
        var timetype = $(this).attr("timetype");
        var max = parseInt($(this).attr("max"));
        var min = parseInt($(this).attr("min"));
        var diff = max - min;
        var num = parseInt($(".btn_select_txt", this).text());
        num = -delta + num;
        num = ((num - min) + diff) % diff + min;
        $(".btn_select_txt", this).text(num);
        app.time[timetype] = num;
        //        console.log(type, -delta, deltaX, deltaY);
        $("#public_time").text(getShortTimeString(app.time));
        return false;
    });


    $(".select_time", area).click(function () {
        var timetype = $(this).attr("timetype");
        var hasClassHide = false;
        var select_time_list = $(".select_time_list[timetype='" + timetype + "']", area)
        if (select_time_list.hasClass("shouldHide")) {
            hasClassHide = true;
        }

        var shouldHideElements = $(".shouldHide");
        shouldHideElements.toggleClass("hide");
        shouldHideElements.toggleClass("shouldHide");
        var droppedElements = $(".drop");
        droppedElements.toggleClass("drop");

        if (!hasClassHide) {
            select_time_list.toggleClass("hide");
            select_time_list.toggleClass("shouldHide");
        }
        return false;
    });

    $(".time_list", area).click(function () {
        var timetype = $(this).attr("timetype");
        var num = $(this).attr("number");
        var select_time = $(".select_time[timetype='" + timetype + "']", area);
        $(".btn_select_txt", select_time).text(num);
        app.time[timetype] = num;
        $("#public_time").text(getShortTimeString(app.time));
    });

}


