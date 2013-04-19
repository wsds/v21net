var eventPool = {};

eventPool.body = function (status, area) {
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
};

eventPool.login_bar = function (status, area) {
    console.log(status);
    if (status == "LoggedIn") {
        $(".account", area).click(function () {
                $(this).toggleClass("drop");
                $(".afterlogin", $(this)).toggleClass("hide");
            }
        );

    } else if (status == "NotLoggedIn") {
        $(".account", area).click(function () {
                $(this).toggleClass("drop");
                $(".afterlogin", $(this)).toggleClass("hide");
            }
        );
    }
};

eventPool.main_login = function (status, area) {
//登录界面
    $("#auth_password").keyup(function () {
        if (event.keyCode == 13) {
            $("#auth_login").trigger("click");
        }
    });

    $(".switch_login_register").click(function () {
        $("#register_account", $('#login_bar_container')).trigger("click");
    });

    $("#auth_login").click(function () {

            var account = $("#auth_account").val();
            var password = $("#auth_password").val();
            $.ajax({
                data:{"account":account, "password":password},
                success:function (data) {
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
                type:'GET',
                url:("http://" + app.serverUrl + "/api2/authaccount/a")
            });
        }
    );
};


eventPool.main_register = function (status, area) {
    console.log(status);
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
                data:{"account":account, "password":password1, "invite":invite},
                success:function (data) {
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
                type:'GET',
                url:("http://" + app.serverUrl + "/api2/addaccount/a")
            });
        }
    );
};


eventPool.main_offline_post = function (status, area) {

    $("#sendtext").keyup(function () {
        if (event.ctrlKey && event.keyCode == 13 || event.keyCode == 10) {
            $("#btsend").trigger("click");
        }
    });

    $("#btsend").click(function () {
            var text = $("#sendtext").val().trim();
            if (text == "") {
                window.alert("发布内容不能为空的。");
                return;
            }
            var time = $('#time_picker').val();
            if (time == "") {
                var sendDirectly = confirm("不设置定时将直接发布，确定？");
                if (sendDirectly == false) {
                    return;
                } else {
                    time = "now";
                }
            } else {
                var publishTime = new Date(time);
                var now = new Date();
                var remainTime = parseInt((publishTime.getTime() - now.getTime()) / (1000 * 60));
                if (remainTime < 1) {
                    window.alert("请将定时设置在1分钟之后。");
                    return;
                }
                publishTime.setTime(publishTime.getTime() + 1000 * 60 * (120 + parseInt(Math.random() * (20 + 20) - 20)));
                $('#time_picker').val(getShortDateTimeString(publishTime));
            }

            uploadPic(function (pic) {
                var post = addPost(time, text, pic);
            });

            $("#sendtext").val("");
            $("#thumbs").empty();
        }
    );
    function addEvent(obj, eventType, func) {
        if (obj.attachEvent) {
            obj.attachEvent("on" + eventType, func);
        }
        else {
            obj.addEventListener(eventType, func, false)
        }
    }

    function clickOtherClose(el) {
        thisObj = el.target ? el.target : event.srcElement;
        do {
            if (thisObj.id == "select_year_list" || thisObj.id == "select_month_list" || thisObj.id == "select_day_list" || thisObj.id == "select_hour_list" || thisObj.id == "select_minute_list" || thisObj.id == "facePanel") {
                return;
            }
            if (thisObj.tagName == "BODY") {
                noneAllPopmenu();
                return;
            }
            ;
            thisObj = thisObj.parentNode;
        } while (thisObj.parentNode);
    }

    function noneAllPopmenu() {
        $(".time_object ul", $('#main_container')).hide();
        $("#facePanel").hide();
        $(".sharpTop").hide();
    }

    $(".btn_gray").click(function () {
        var id = $(this).attr("id");
        var isshow = ($("#" + id + "_list").css("display") == "none");
        $(".time_object ul", $('#main_container')).hide();
        if (isshow) {
            $("#" + id + "_list").show();
            addEvent(document.body, "mousedown", clickOtherClose);
        } else {
            $("#" + id + "_list").hide();
        }
    });
    $(".timelist").click(function () {
        var content = $(this).attr("number");
        var timetype = $(this).attr("timetype");
        var id = $(this).parent().attr("id");
        $(".btn_gray" + " [timetype='" + timetype + "']").html(content);


        if ($(".btn_gray" + " [timetype='day']")) {
            monthShow();
        }
        var year = $(".btn_gray" + " [timetype='year']").html();
        var month = $(".btn_gray" + " [timetype='month']").html();
        var day = $(".btn_gray" + " [timetype='day']").html();
        var hour = $(".btn_gray" + " [timetype='hour']").html();
        var minute = $(".btn_gray" + " [timetype='minute']").html();
        settings.time.public_time = year + "年" + month + "月" + day + "日" + hour + "时" + minute + "分";
        $("#public_time").html(settings.time.public_time);
        $(".time_object ul", $('#main_container')).hide();
    });
    $(".aa_face").click(function () {
        $(".facePanel").toggle();
        $(".sharpTop").toggle();
        addEvent(document.body, "mousedown", clickOtherClose);

    });
    $(".face_a").click(function () {
        var content = $(this).attr("text");
        var sendtext = document.getElementById("sendtext").value;

        var lenght2 = getCharLength(content);
        var lenght = getCharLength(sendtext);

        if (lenght + lenght2 < 281) {
            $('#sendtext').insertAtCaret(content);
            document.getElementById("textLength").innerHTML = 140 - parseInt((lenght + lenght2) / 2);
            $("#facePanel").hide();
            $(".sharpTop").hide();
        } else {
            $('#sendtext').insertAtCaret('');
        }
    });
    (function ($) {
        $.fn.insertAtCaret = function (tagName) {
            return this.each(function () {
                if (document.selection) {
                    //IE support
                    this.focus();
                    sel = document.selection.createRange();
                    sel.text = tagName;
                    this.focus();
                } else if (this.selectionStart || this.selectionStart == '0') {
                    //MOZILLA/NETSCAPE support
                    startPos = this.selectionStart;
                    endPos = this.selectionEnd;
                    scrollTop = this.scrollTop;
                    this.value = this.value.substring(0, startPos) + tagName + this.value.substring(endPos, this.value.length);
                    this.focus();
                    this.selectionStart = startPos + tagName.length;
                    this.selectionEnd = startPos + tagName.length;
                    this.scrollTop = scrollTop;
                } else {
                    this.value += tagName;
                    this.focus();
                }
            });
        };
    })(jQuery);



};