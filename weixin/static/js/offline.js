var settings = {};

window.onbeforeunload = function () {
    window.localStorage.settings = JSON.stringify(settings);
};

function saveSettings() {
    window.localStorage.settings = JSON.stringify(settings);
}
;

$(document).ready(function () {
        if (window.localStorage.settings != null) {
            settings = JSON.parse(window.localStorage.settings);
        }
    }
);


$(document).ready(function () {

        renderLoginBar();
        renderOwnedWeibo();

        $("body").click(function () {
//            window.alert("click");
        });

        $("#auth_password").keyup(function(){
            if(event.keyCode == 13){
                $("#auth_login").trigger("click");
            }
        });

        $("#auth_login").click(function () {

                var account = $("#auth_account").val();
                var password = $("#auth_password").val();
                ;
//                window.alert("hello" + account + password);
                $.ajax({
                    data:{"weibo_user":"tester"},
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
//                        window.alert("data" + JSON.stringify(data));
                    },
                    type:'GET',
                    url:("http://www.weibo.com/api2/authaccount/a?account=" + account + "&password=" + password)
                });
            }
        );
    }
);


function resolveOwnedWeibo() {
    $.ajax({
        success:function (data) {
            settings.ownedWeibo = data["ownedWeibo"];
//            window.alert("data" + JSON.stringify(data));
            saveSettings();
            renderOwnedWeibo();
        },
        type:'GET',
        url:("http://www.weibo.com/api2/accountownedweibo/getall?account=" + settings.account)
    });
}

function renderOwnedWeibo() {
    var owned_weibo = getTemplate("owned_weibo");
    $('#owned_weibo_container').html(owned_weibo.render(settings.ownedWeibo));

    $(".account", $('#owned_weibo_container')).click(function () {
            $(this).toggleClass("drop");
            $(".afterlogin", $(this)).toggleClass("hide");
        }
    );
}

function renderTemplate() {
//    return;
    $('#post-list-holder').html();
    var post_list = getTemplate("post-list");
    $('#post-list-holder').html(post_list.render(postList));

    $(".delAppBtn", $('#post-list-holder')).click(function () {
        var postID = $(this).attr("postid");
        postList.splice(postID, 1);
        renderTemplate();
    });

    $(".posttime", $('#post-list-holder')).dblclick(function () {
        window.alert("双击");
    });
}

function renderLoginBar() {
    if (settings.key == null || settings.account == null) {
        var loginbar = getTemplate("login-bar");
        $('#login_bar_container').html(loginbar.render());
    }
    else {
        var loginbar = getTemplate("login-bar-success");
        $('#login_bar_container').html(loginbar.render(settings.account));
    }

    $(".account", $('#login_bar_container')).click(function () {
            $(this).toggleClass("drop");
            $(".afterlogin", $(this)).toggleClass("hide");
        }
    );

    $("#auth_logout", $('#login_bar_container')).click(function () {
//        window.alert("click");
        settings.key = undefined;
        settings.account = undefined;
        settings.ownedWeibo = undefined;
        settings.authTip = "重新登录";
        $("#authTip").show();
        $("#authTip").html("重新登录：" + settings.authTip);
        saveSettings();
        renderLoginBar();
        renderOwnedWeibo();
    });
}

function getTemplate(id) {
    var tenjin = nTenjin;
    var templateDiv = $('.templates #' + id).parent();
    var string = templateDiv.html();
    string = string.replace(/\<\!\-\-\?/g, "<?");
    string = string.replace(/\?\-\-\>/g, "?>");
    string = string.replace(/比较符号大于/g, ">");
    string = string.replace(/比较符号兄小于/g, "<");
    var template = new tenjin.Template();
    template.convert(string);
    return template;
}