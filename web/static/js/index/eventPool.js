eventPool = {};
app.eventPool = eventPool;


eventPool.body = function (status, area) {
    if (app.localSettings.key == null || app.localSettings.account == null) {
        window.location.href = "/account.html";
    }

    var now = new Date();
    app.time = new Time(now);
    app.forwardTime = new Time(now);

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

            var subSlide = $(this).attr("subSlide");
            if (subSlide == "forward_mine") {
                data.statusList = "mine";
            }
            else if (subSlide == "forward_friend") {
                data.statusList = "friends";
            }
            else if (subSlide == "main_offline_post_list") {
                data.list = "post";
                main_panel = $(this).attr("subSlide");
            }
            else if (subSlide == "main_offline_forward_list") {
                data.list = "forward";
                main_panel = $(this).attr("subSlide");
            }
            else {
                return;
            }

            var main_panel_container = $(".templateContainer[template='main_panel']");
            main_panel_container.attr("status", main_panel);
            renderTemplate(main_panel_container);
        });
    $(".normalTitle h2").click(function () {
            $(".nav").slideToggle("fast");
            $(".subnav.current").slideToggle("fast");
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
    var localDataBind = $(area).attr("localDataBind");
    var time;
    if (localDataBind == "publish") {
        var time = app.time;
    }
    else if (localDataBind == "forward") {
        var time = app.forwardTime;
    }
    else {
        var time = data.time[localDataBind];
    }

    $(".select_time", area).mousewheel(function (event, delta, deltaX, deltaY) {
        var timetype = $(this).attr("timetype");
        var max = parseInt($(this).attr("max"));
        var min = parseInt($(this).attr("min"));
        var diff = max - min;
        var num = parseInt($(".btn_select_txt", this).text());
        num = -delta + num;
        num = ((num - min) + diff) % diff + min;
        $(".btn_select_txt", this).text(num);
        time[timetype] = num;
        //        console.log(type, -delta, deltaX, deltaY);
        time.public_time = getShortTimeString(time);
        if (localDataBind == "publish") {
            $("#public_time").text(time.public_time);
        }
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
        time[timetype] = num;
        time.public_time = getShortTimeString(time);
        if (localDataBind == "publish") {
            $("#public_time").text(time.public_time);
        }
    });

}


