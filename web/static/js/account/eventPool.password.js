eventPool.main_password = function (status, area) {
    $(".switch_login_register").click(function () {
        var main_panel_container = $(".templateContainer[template='main_panel']");
        main_panel_container.attr("status", "main_login");
        renderTemplate(main_panel_container);
    });


    $("#change_password").click(function () {
        var account = $("#main_password_modify_account").val();
        var password1 = $("#main_password_modify_password1").val();
        var password2 = $("#main_password_modify_password2").val();
        var verification = $("#main_verification_code").val();

        if (password1 != password2) {
            $("#main_password_authTip").show();
            $("#main_password_authTip").html("修改失败：" + "密码不一致。");
            return;
        }

        $.ajax({
            data: {"accountName": account, "password": password1,"verification":verification},
            success: function (data) {
                if (data["提示信息"] == "账户修改成功") {
                    app.localSettings.key = data.key;
                    app.localSettings.authTip = data["提示信息"];
                    $("#main_password_authTip").show();
                    $("#main_password_authTip").html("修改成功：" + app.localSettings.authTip);
                }
                else {
                    app.localSettings.authTip = data["提示信息"];
                    $("#main_password_authTip").show();
                    $("#main_password_authTip").html("修改失败：" + app.localSettings.authTip);
                }
            },
            type: 'GET',
            url: ("http://" + app.serverUrl + "/api2/account/modify")
        });
    });


};
