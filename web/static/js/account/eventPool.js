eventPool = {};
app.eventPool = eventPool;

eventPool.body = function (status, area) {
    if (app.localSettings.key != null && app.localSettings.account != null) {
        window.location.href = "/";
    }

    $("#slide_ctrls li a").click(function () {
            $("#slide_ctrls li a").removeClass("current");
            $(this).toggleClass("current");
        });

    $(".normalTitle h2").click(function () {
            $(".nav").slideToggle("fast");
            $(".subnav").slideToggle("fast");
        });

    $(".container").click(function () {
            droppedElements = $(".drop");
            droppedElements.toggleClass("drop");
            $(".afterlogin", droppedElements).toggleClass("hide");
            $(".afterlogin", droppedElements).toggleClass("shouldHide");
        });
};


eventPool.login_bar = function (status, area) {
    if (status == "LoggedIn") {
        $(".account", area).click(function () {
                $(this).toggleClass("drop");
                $(".afterlogin", $(this)).toggleClass("hide");
                $(".afterlogin", $(this)).toggleClass("shouldHide");
                return false;//block event message loop pop this message to its father element.
            });

    }
    else if (status == "NotLoggedIn") {
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
                else if (operation == "register_account") {
                    if (main_panel_container.attr("status") == "main_login") {
                        main_panel_container.attr("status", "main_register")
                        $("a", this).html("已是会员");
                    }
                    else {
                        main_panel_container.attr("status", "main_login");
                        $("a", this).html("还不是会员");
                    }
                }
                renderTemplate(main_panel_container);
                return false;

            });
    }
}

eventPool.main_login = function (status, area) {

    $("#auth_password").keyup(function () {
        if (event.keyCode == 13) {
            $("#auth_login").trigger("click");
        }
    });

    $(".switch_login_register").click(function () {
        var main_panel_container = $(".templateContainer[template='main_panel']");
        main_panel_container.attr("status", "main_register");
        renderTemplate(main_panel_container);
    });

    $(".switch_main_password").click(function () {
        var main_panel_container = $(".templateContainer[template='main_panel']");
        main_panel_container.attr("status", "main_password");
        renderTemplate(main_panel_container);
    });


    $("#auth_login").click(function () {

            var account = $("#auth_account").val();
            var password = $("#auth_password").val();
            $.ajax({
                data: {"accountName": account, "password": password},
                success: function (data) {
                    if (data["提示信息"] == "账号登录成功") {
                        app.localSettings.key = data.acccesskey;
                        app.localSettings.uid = data.uid;
                        app.localSettings.authTip = data["提示信息"];
                        app.localSettings.account = account;
                        saveLocalSettings();
                        window.location.href = "/";
                    }
                    else {
                        app.localSettings.key = undefined;
                        app.localSettings.account = undefined;
                        app.localSettings.authTip = data["提示信息"];
                        $("#authTip").show();
                        $("#authTip").html("登录失败：" + app.localSettings.authTip);

                    }
                },
                type: 'GET',
                url: ("http://" + app.serverUrl + "/api2/account/auth")
            });
        });
};


eventPool.main_register = function (status, area) {

    $(".switch_login_register").click(function () {
        var main_panel_container = $(".templateContainer[template='main_panel']");
        main_panel_container.attr("status", "main_login");
        renderTemplate(main_panel_container);
    });

    $("#auth_register").click(function () {

            var account = $("#main_register_auth_account").val();
            var password1 = $("#main_register_auth_password1").val();
            var password2 = $("#main_register_auth_password2").val();
            var invite = $("#main_register_invite_code").val();
            if (account.length < 3) {
                $("#main_register_authTip").show();
                $("#main_register_authTip").html("注册失败：" + "非法用户名。");
                return;
            }
            if (password2.length < 6) {
                $("#main_register_authTip").show();
                $("#main_register_authTip").html("注册失败：" + "密码必须大于6位。");
                return;
            }
            if (password1 != password2) {
                $("#main_register_authTip").show();
                $("#main_register_authTip").html("注册失败：" + "密码不一致。");
                return;
            }

            $.ajax({
                data: {"accountName": account, "password": password1, "invite": invite},
                success: function (data) {
                    if (data["提示信息"] == "账号注册成功") {
                        app.localSettings.key = data.acccesskey;
                        app.localSettings.uid = data.uid;
                        app.localSettings.authTip = data["提示信息"];
                        app.localSettings.account = account;
                        saveLocalSettings();
                        window.location.href = "/";
                    }
                    else {
                        app.localSettings.key = undefined;
                        app.localSettings.account = undefined;
                        app.localSettings.authTip = data["提示信息"];
                        $("#main_register_authTip").show();
                        $("#main_register_authTip").html("注册失败：" + app.localSettings.authTip);
                        saveLocalSettings();
                    }
                },
                type: 'GET',
                url: ("http://" + app.serverUrl + "/api2/account/add")
            });
        });
};


