var eventPool = {};

eventPool.body = function (status, area) {
    $("#slide_ctrls li a").click(function () {
            $("#slide_ctrls li a").removeClass("current");
            $(this).toggleClass("current");
        }
    );

    $(".normalTitle h2").click(function () {
            $(".nav").slideToggle("fast");
            $(".subnav").slideToggle("fast");
        }
    );

    $(".container").click(function () {
//            alert("click");
            droppedElements=$(".drop");
            droppedElements.toggleClass("drop");
            $(".afterlogin", droppedElements).toggleClass("hide");
            $(".afterlogin", droppedElements).toggleClass("shouldHide");
        }
    );
};


eventPool.login_bar = function (status, area) {
    if (status == "LoggedIn") {
        $(".account", area).click(function () {
                $(this).toggleClass("drop");
                $(".afterlogin", $(this)).toggleClass("hide");
                $(".afterlogin", $(this)).toggleClass("shouldHide");
                return false;//block event message loop pop this message to its father element.
            }
        );

    } else if (status == "NotLoggedIn") {
        $(".account", area).click(function () {
                $(this).toggleClass("drop");
                $(".afterlogin", $(this)).toggleClass("hide");
                $(".afterlogin", $(this)).toggleClass("shouldHide");
                return false;//block event message loop pop this message to its father element.
            }
        );

        $(".login_bar_li", area).click(function () {
                var operation = $(this).attr("operation");
//                alert($("a",this).val());

                var main_panel_container = $(".templateContainer[template='main_panel']");
                if (operation == "change_password") {
                    main_panel_container.attr("status", "main_password");
                }
                else if (operation == "register_account") {
                    if (main_panel_container.attr("status") == "main_login") {
                        main_panel_container.attr("status", "main_register")
                        $("a",this).html("已是会员");
                    } else {
                        main_panel_container.attr("status", "main_login");
                        $("a",this).html("还不是会员");
                    }
                }
                renderTemplate(main_panel_container);
                return false;

            }
        );
    }
}

eventPool.main_login = function (status, area) {
//登录界面
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
                data: {"account": account, "password": password},
                success: function (data) {
                    if (data["提示信息"] == "登录成功") {
                        settings.key = data.key;
                        settings.authTip = data["提示信息"];
                        settings.account = account;
                        saveSettings();
                        resolveOwnedWeibo();
                        renderLoginBar();
                    }
                    else {
                        settings.key = undefined;
                        settings.account = undefined;
                        settings.authTip = data["提示信息"];
                        $("#authTip").show();
                        $("#authTip").html("登录失败：" + settings.authTip);
                        saveSettings();
                        renderLoginBar();
                    }
                },
                type: 'GET',
                url: ("http://" + app.serverUrl + "/api2/authaccount/a")
            });
        }
    );
};


eventPool.main_register = function (status, area) {

    $(".switch_login_register").click(function () {
        var main_panel_container = $(".templateContainer[template='main_panel']");
        main_panel_container.attr("status", "main_login");
        renderTemplate(main_panel_container);
    });
    //注册
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
                data: {"account": account, "password": password1, "invite": invite},
                success: function (data) {
                    if (data["提示信息"] == "账户注册成功") {
                        settings.key = data.key;
                        settings.authTip = data["提示信息"];
                        settings.account = account;
                        saveSettings();
                        resolveOwnedWeibo();
                        renderLoginBar();
                    }
                    else {
                        settings.key = undefined;
                        settings.account = undefined;
                        settings.authTip = data["提示信息"];
                        $("#main_register_authTip").show();
                        $("#main_register_authTip").html("注册失败：" + settings.authTip);
                        saveSettings();
                        renderLoginBar();
                    }
//                        window.alert("data" + JSON.stringify(data));
                },
                type: 'GET',
                url: ("http://" + app.serverUrl + "/api2/addaccount/a")
            });
        }
    );
};

eventPool.main_password = function (status, area) {
    $(".switch_login_register").click(function () {
        var main_panel_container = $(".templateContainer[template='main_panel']");
        main_panel_container.attr("status", "main_login");
        renderTemplate(main_panel_container);
    });
};


eventPool.main_offline_post_list = function (status, area) {
};


//textarea字数变化显示
function textareaChange() {
    var content = document.getElementById("sendtext").value;
    var contentLength = getCharLength(content);
    var trueLength = parseInt(contentLength / 2);
    //alert(content);
    if (contentLength < 281) {
        document.getElementById("textLength").innerHTML = 140 - trueLength;
    } else {
        document.getElementById("sendtext").value = document.getElementById("sendtext").value.substr(0, 281);
        document.getElementById("textLength").innerHTML = 0;
    }

}

function getCharLength(str) {
    var charLen = 0;
    for (var i = 0, len = str.length; i < len; i++) {
        if (str.charCodeAt(i) > 255) {
            charLen += 2;
        } else {
            charLen += 1;
        }
    }
    return charLen;
}

function checkMaxLength(textArea, maxLength) {
    var currentStr = "";
    for (var i = 0, len = textArea.value.length; i < len; i++) {
        currentStr += textArea.value.charAt(i);
        if (getCharLength(currentStr) > maxLength) {
            area.value = textArea.value.substr(0, i);
            return;
        }
    }
}