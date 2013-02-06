var settings = {};

window.onbeforeunload = function () {
    window.localStorage.settings = JSON.stringify(settings);
};

function saveSettings() {
    window.localStorage.settings = JSON.stringify(settings);
}

$(document).ready(function () {
        if (window.localStorage.settings != null) {
            settings = JSON.parse(window.localStorage.settings);
        }
    }
);

function renderAll() {
    renderLoginBar();
    renderOwnedWeibo();
    renderMain();
}

$(document).ready(function () {
        settings.main = "main_login";
        resolveOwnedWeibo();

        $("body").click(function () {
//            window.alert("click");
        });
        $("#slide_ctrls li a").click(function () {
                $("#slide_ctrls li a").removeClass("current");
                $(this).toggleClass("current");
                settings.main = $(this).attr("slide");
                if (settings.main == "main_offline_post_list") {
                    resolvePostlist();
                }
                else {
                    renderMain();
                }
            }
        );

        $(".normalTitle h2").click(function () {
                $(".nav").slideToggle("fast");
            }
        );

    }
);

$(document).ready(function () {
    var timer_alert = setInterval(function () {
        resolvePostlistStatus();
    }, 1000 * 1);// check the postList every 1 second.
});

function resolvePostlistStatus() {
    var now = new Date();
    $(".container .post_status_tag_holder").each(function(){
        var holder = this;
        var post={};
        post.status=$(holder).attr("status");
        post.time=$(holder).attr("publishTime");
        var publishTime = new Date(post.time);
        post.remainTime = parseInt((publishTime.getTime() - now.getTime()) / (1000));
        post.remainMinute = Math.floor(post.remainTime / 60);
        post.remainSecond = post.remainTime % 60;
        if(post.remainTime==0){
            resolvePostlist();
            return false;
        }
        var postStatusTag = getTemplate("post_status_tag");
        $(holder).html(postStatusTag.render(post));
    });
}

function registerMainEvent() {

    //登录界面
    $("#auth_password").keyup(function () {
        if (event.keyCode == 13) {
            $("#auth_login").trigger("click");
        }
    });

    $("#auth_login").click(function () {

            var account = $("#auth_account").val();
            var password = $("#auth_password").val();
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

    //离线发布工具
    registerUploadImageEvent();
    registerTimerEvent();

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
//                    return;
                }
                publishTime.setTime(publishTime.getTime() + 1000 * 60 * (120 + parseInt(Math.random() * (20 + 20) - 20)));
                $('#time_picker').val(getShortDateTimeString(publishTime));
            }

            var post = addPost(time, text);

            $("#sendtext").val("");
            $("#thumbs").empty();
//            if(tools.pid=="uploading"){
//                uploadPic(post);
//                tools.pid="none";
//            }

        }
    );


    //定时发布列表
    $(".delAppBtn", $('#main_container')).click(function () {
        var postID = $(this).attr("postid");
//        postList.splice(postID, 1);
//        renderTemplate();
//        window.alert(postID);
        delPost(postID);
        if (settings.main == "main_offline_post_list") {
            resolvePostlist();
        }
    });

    $(".posttime", $('#main_container')).dblclick(function () {
        window.alert("双击");
    });


}

function getShortDateTimeString(date) {   //如：2011/07/29 13:30
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    month = month + 1;
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    var hour = date.getHours();
    if (hour < 10) {
        hour = '0' + hour;
    }
    var minute = date.getMinutes();
    if (minute < 10) {
        minute = '0' + minute;
    }
    var second = date.getSeconds();
    if (second < 10) {
        second = '0' + second;
    }
    var str = year + '/' + month + '/' + day + ' ' + hour + ':' + minute;
    return str;
}

function addPost(time, text) {
    $.ajax({
        success:function (data) {
//            alert(JSON.stringify(data));
            if (data["提示信息"] == "成功") {
            }
            else {
            }
        },
        type:'GET',
        url:("http://www.weibo.com/api2/post/add?text=" + text + "&weibo_user=" + settings.ownedWeibo.currentWeibo + "&time=" + time + "&pic=23125215214")
    });
}

function delPost(postid) {
    $.ajax({
        success:function (data) {
//            alert(JSON.stringify(data));
            if (data["提示信息"] == "成功") {
            }
            else {
            }
        },
        type:'GET',
        url:("http://www.weibo.com/api2/post/del?postid=" + postid + "&weibo_user=" + settings.ownedWeibo.currentWeibo)
    });
}

function registerTimerEvent() {
    var now = new Date();

    $('#time_picker').mobiscroll().datetime({
        minDate:new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        theme:'default',
        display:'modal',
        animate:'slidehorizontal',
        mode:'mixed'

    });
    $('#show_picker').click(function () {

        var time = $('#time_picker').val();
        if (time == "") {

//            setTime = new Date();
//            setTime.setTime( setTime.getTime()+1000*60*5);
//            $('#time_picker').val(getShortDateTimeString(setTime));
            $('#time_picker').mobiscroll('show');
        }
        else {
            $('#time_picker').val('');
        }
        return false;
    });


    $('#show_picker').mouseover(function () {
        var time = $('#time_picker').val();
        if (time != "") {
            $('#show_picker').text('取消定时');
        }

    });

    $('#show_picker').mouseout(function () {
        $('#show_picker').text('定时发布');
    });
}
function registerUploadImageEvent() {
    $('#addPicButton').click(function () {

//        alert("testButton");
        $("#input_image").trigger("click");
    });

    $("#input_image").change(function () {
        var myFiles = this.files;
//        alert("input_image change");
        for (var i = 0, f; f = myFiles[i]; i++) {
            var imageReader = new FileReader();
            imageReader.onload = (function (aFile) {
                return function (e) {
                    var span = document.createElement('span');
                    span.innerHTML = ['<a class="images_a"  href="javascript:" ><img class="images" src="', e.target.result, '" title="', aFile.name, '"/></a>'].join('');
//                    document.getElementById('thumbs').insertBefore(span, null);
                    $("#thumbs").empty();
                    $("#thumbs").append(span);
                    if (postlist.pid = "none") {
                        postlist.pid = "uploading";
                    }
                    $('.images_a', $(span)).click(function () {
                        if ($(this).hasClass("drop")) {
                            $(this).removeClass("drop");
                            $(".images_close_a", $(this)).remove()
                        }
                        else {
                            $(this).addClass("drop");
                            $(this).append('<a class="images_close_a" href="javascript:"><img class="images_close"  style="vertical-align: top;" src="/static/images/close_small.png"></a>')
                            $('.images_close_a', $(this)).click(function () {
                                    $(span).remove();
                                }
                            );
                        }
//                        alert("images_a");
                    });
//                    alert(span);
                };
            })(f);
            imageReader.readAsDataURL(f);
            break;
        }
    });
}


function resolvePostlist() {
    $.ajax({
        success:function (data) {
            postlist = data;
            renderMain();
        },
        type:'GET',
        url:("http://www.weibo.com/api2/getpostlist/a?weibo_user=" + settings.ownedWeibo.currentWeibo + "&start=0&end=-1")
    });
}


function resolveOwnedWeibo() {
    if (settings.key == null || settings.account == null) {
        renderAll();
        return;
    }
    $.ajax({
        success:function (data) {
            settings.ownedWeibo = data;
//            window.alert("data" + JSON.stringify(data));

            for (var ownedWeibo in settings.ownedWeibo.ownedWeiboList) {
                settings.ownedWeibo.currentWeibo = ownedWeibo;
                break;
            }
            saveSettings();
            renderAll();
        },
        type:'GET',
        url:("http://www.weibo.com/api2/accountownedweibo/getall?account=" + settings.account)
    });
}

function renderOwnedWeibo() {
    if (settings.key == null || settings.account == null) {
        $('#owned_weibo_container').html("");
        return;
    }
    var owned_weibo = getTemplate("owned_weibo");
    $('#owned_weibo_container').html(owned_weibo.render(settings.ownedWeibo));

    $(".account", $('#owned_weibo_container')).click(function (event, management) {
            if (management == null) {
                $(".owned_weibo_del", $('#owned_weibo_container')).addClass("hide");
            } else {
                $(".owned_weibo_del", $('#owned_weibo_container')).removeClass("hide");
            }
            $(this).toggleClass("drop");
            $(".afterlogin", $(this)).toggleClass("hide");
        }
    );

    $(".owned_weibo_li", $('#owned_weibo_container')).click(function () {
            settings.ownedWeibo.currentWeibo = $(this).attr("weibo");
            renderOwnedWeibo();
            if (settings.main == "main_offline_post_list") {
                resolvePostlist();
            }
        }
    );

    $(".owned_weibo_del", $('#owned_weibo_container')).click(function () {

            var willDel = confirm("删除授权管理微博账号，确定？");
            if (willDel == false) {
                return false;
            } else {
                var delWeibo = $(this).attr("weibo");
                $.ajax({
                    success:function (data) {
                        settings.ownedWeibo.ownedWeiboList[delWeibo] = undefined;
                        for (var ownedWeibo in settings.ownedWeibo.ownedWeiboList) {
                            if (settings.ownedWeibo.ownedWeiboList[ownedWeibo] != undefined) {

                                alert(settings.ownedWeibo.currentWeibo[ownedWeibo]);
                                settings.ownedWeibo.currentWeibo = ownedWeibo;
                                break;
                            }
                        }
                        renderOwnedWeibo();
                        $(".account", $('#owned_weibo_container')).trigger("click", ["management"]);
                    },
                    type:'GET',
                    url:("http://www.weibo.com/api2/accountownedweibo/del?account=" + settings.account + "&ownedWeibo=" + delWeibo)
                });

                return false;
            }
        }
    );
}


function renderMain() {
    if (settings.key == null || settings.account == null) {
        settings.main = "main_login"
    }
    else {
        if (settings.main == "main_login") {
            settings.main = "main_offline_post";
        }
    }
    var mainTemplate = getTemplate(settings.main);
    $('#main_container').html(mainTemplate.render(postlist));

    registerMainEvent();
}

function renderTemplate() {
//    return;
    $('#post-list-holder').html();
    var post_list = getTemplate("post-list");
    $('#post-list-holder').html(post_list.render(postlist));

    $(".delAppBtn", $('#post-list-holder')).click(function () {
        var postID = $(this).attr("postid");
        postlist.splice(postID, 1);
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
        renderAll();
    });


    $(".login_bar_li", $('#login_bar_container')).click(function () {
            var operation = $(this).attr("operation");
            if (operation == "weibo_management") {
                $(".account", $('#owned_weibo_container')).trigger("click", ["management"]);
            }
        }
    );
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


var postListStr = '{"0":{"time":"2013/02/02 15:00:00","status":"timeout","text":"打工的高高的","pid":"none","remainTime":-78634,"remainMinute":-1311,"remainSecond":-34},"1":{"time":"2013/02/02 15:01:00","status":"timeout","text":"封杀非常粗糙才","pid":"none","remainTime":-78574,"remainMinute":-1310,"remainSecond":-34}}';
var postlist = JSON.parse(postListStr);