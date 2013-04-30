eventPool = {};
app.eventPool = eventPool;


eventPool.body = function (status, area) {
    if (app.localSettings.key == null || app.localSettings.account == null) {
        window.location.href = "/account.html";
    }

    var now = new Date();
    var month = now.getMonth() + 1;
    app.time = {};
    app.time.year = now.getFullYear();
    app.time.month = now.getMonth() + 1;
    app.time.day = now.getDate();
    app.time.hour = now.getHours();
    app.time.minute = now.getMinutes();
    app.time.public_time = getShortDateTimeString(now);

    $("#slide_ctrls li a").click(function () {
            $("#slide_ctrls li a").removeClass("current");
            $(this).toggleClass("current");
            var main_panel = $(this).attr("slide");
            var main_panel_container = $(".templateContainer[template='main_panel']");
            main_panel_container.attr("status", main_panel);
            renderTemplate(main_panel_container);
        }
    );

    $(".normalTitle h2").click(function () {
            $(".nav").slideToggle("fast");
            $(".subnav").slideToggle("fast");
        }
    );


    $(".container").click(function () {
            var droppedElements = $(".drop");
            droppedElements.toggleClass("drop");
            var shouldHideElements = $(".shouldHide");
            shouldHideElements.toggleClass("hide");
            shouldHideElements.toggleClass("shouldHide");
        }
    );
};

eventPool.login_bar = function (status, area) {

    $(".account", area).click(function () {
            $(this).toggleClass("drop");
            $(".afterlogin", $(this)).toggleClass("hide");
            $(".afterlogin", $(this)).toggleClass("shouldHide");
            return false;//block event message loop pop this message to its father element.
        }
    );


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

        }
    );

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
            } else {
                $(".owned_weibo_del", $('#owned_weibo_container')).removeClass("hide");
            }
            $(this).toggleClass("drop");
            $(".afterlogin", $(this)).toggleClass("hide");
            $(".afterlogin", $(this)).toggleClass("shouldHide");
            return false;//block event message loop pop this message to its father element.
        }
    );
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


