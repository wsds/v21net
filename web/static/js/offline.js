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
                var submenu = $(this).attr("submenu");
                settings.main = $(this).attr("slide");
                if (settings.main == "main_offline_post_list" && submenu == "subshow") {
                    resolvePostlist();
                    $(".subnav").show();
                    $(this).attr("submenu", "subhidden");
                    //$(".subnavpoint_af").show();
                } else if (settings.main == "main_offline_post_list" && submenu == "subhidden") {
                    $(".subnav").hide();
                    $(this).attr("submenu", "subshow");
                }
                else {
                    renderMain();
                    $(".subnav").hide();
                    //$(".subnavpoint_af").hide();
                    $(".btn_gray" + " [timetype='" + timetype + "']").html(content);
                    $("#slide_ctrls li a" + "[slide='main_offline_post_list']").attr("submenu", "subshow");
                }
            }
        );

        $(".normalTitle h2").click(function () {
                $(".nav").slideToggle("fast");
                $(".subnav").slideToggle("fast");
                //$(".subnavpoint_af").slideToggle("fast");
            }
        );

    }
);

$(document).ready(function () {
    var timer_alert = setInterval(function () {
        resolvePostlistStatus();
    }, 1000 * 1);// check the postList every 1 second.
});
//发送微博时初始化当前时间
$(document).ready(function () {
    var today = new Date();
    var month = today.getMonth() + 1;
    settings.time = {};
    settings.time.year = today.getFullYear();
    settings.time.month = today.getMonth() + 1;
    settings.time.day = today.getDate();
    settings.time.hour = today.getHours();
    settings.time.minute = today.getMinutes();
    settings.time.public_time = today.getFullYear() + "年" + month + "月" + today.getDate() + "日" + today.getHours() + "时" + today.getMinutes() + "分";
});
function resolvePostlistStatus() {
    var now = new Date();
    $(".container .post_status_tag_holder").each(function () {
        var holder = this;
        var post = {};
        post.status = $(holder).attr("status");
        post.time = $(holder).attr("publishTime");
        var publishTime = new Date(post.time);
        post.remainTime = parseInt((publishTime.getTime() - now.getTime()) / (1000));
        post.remainMinute = Math.floor(post.remainTime / 60);
        post.remainSecond = post.remainTime % 60;
        if (post.remainTime == 0) {
            setTimeout(function () {
                resolvePostlist();
            }, 1000 * 5);
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

    //定时发布列表
    $(".delAppBtn", $('#main_container')).click(function () {
        var postID = $(this).attr("postid");
//        postList.splice(postID, 1);
//        renderTemplate();
//        window.alert(postID);
        delPost(postID);
        if (settings.main == "main_offline_post_list") {
            resolvePostlist();
            $(".subnav").show();
            //$(".subnavpoint_af").show();
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


function uploadPic(next) {
    if (settings.uploadStatus == "uploading") {
        var file = $("#input_image")[0].files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
//            alert("reader.onload");
            var urlData = this.result;
            $.ajax({
                data:{filename:"1.png", image:urlData, weibo_user:settings.ownedWeibo.currentWeibo},
                success:function (data) {
                    var filename = data.filename;
                    if (filename == null) {
                        alert(JSON.stringify(data));
                    } else {
                        next(filename);
                    }
                },
                type:'POST',
                url:("http://www.weibo.com/upload2/")
            });
        };

        settings.uploadStatus = "none";
    }
    else {
        next("none")
    }
}

function addPost(time, text, pic) {
    $.ajax({
        data:{"text":text, "weibo_user":settings.ownedWeibo.currentWeibo, "time":time, "pic":pic},
        success:function (data) {
//            alert(JSON.stringify(data));
            if (data["提示信息"] == "成功") {
            }
            else {
            }
        },
        type:'POST',
        url:("http://" + app.serverUrl + "/api2/post/add")
    });
}

function delPost(postid) {
    $.ajax({
        data:{"postid":postid, "weibo_user":settings.ownedWeibo.currentWeibo},
        success:function (data) {
            if (data["提示信息"] == "成功") {
            }
            else {
            }
        },
        type:'GET',
        url:("http://" + app.serverUrl + "/api2/post/del")
    });
}

function registerTimerEvent() {
    var now = new Date();


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

        $("#input_image").val("");
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
                    if (settings.uploadStatus = "none") {
                        settings.uploadStatus = "uploading";
                    }
                    $('.images_a', $(span)).click(function () {
                        if ($(this).hasClass("drop")) {
                            $(this).removeClass("drop");
                            //$("#pointupicon").toggleClass("uppoint");

                            document.getElementById("pointupicon").className = "uppoint";
                            $(".images_close_a", $(this)).remove()
                        }
                        else {
                            $(this).addClass("drop");
                            document.getElementById("pointupicon").className = "uppointclick";
                            $(this).append('<a class="images_close_a" href="javascript:"><img class="images_close"  style="vertical-align: top;" src="/static/images/close_small.png"></a>')
                            $('.images_close_a', $(this)).click(function () {
                                    $(span).remove();
                                    document.getElementById("pointupicon").style.display = "none";
                                    if (settings.uploadStatus = "uploading") {
                                        settings.uploadStatus = "none";
                                    }
                                }
                            );
                        }
//                        alert("images_a");
                    });
//                    alert(span);
                };
            })(f);
            imageReader.readAsDataURL(f);
            //alert(document.getElementById("pointupicon").style.display);

            document.getElementById("pointupicon").style.display = "block";
            document.getElementById("pointupicon").className = "uppoint";
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
        url:("http://" + app.serverUrll + "/api2/getpostlist/a?weibo_user=" + settings.ownedWeibo.currentWeibo + "&start=0&end=-1")
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
        url:("http://" + app.serverUrl + "/api2/accountownedweibo/getall?account=" + settings.account)
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
                $(".subnav").show();
                //$(".subnavpoint_af").show();
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
                    data:{"account":settings.account, "ownedWeibo":delWeibo},
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
                    url:("http://" + app.serverUrl + "/api2/accountownedweibo/del")
                });

                return false;
            }
        }
    );
}


function renderMain() {
    if (settings.key == null || settings.account == null) {
        if (settings.main == "main_register" || settings.main == "main_password") {
        } else {
            settings.main = "main_login";
        }
    }
    else {
        if (settings.main == "main_login" || settings.main == "main_register") {
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

    $("#register_account", $('#login_bar_container')).click(function () {

    });

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
            else if (operation == "change_password") {
                settings.main = "main_password";
                renderAll();
            }
            else if (operation == "register_account") {
                if (settings.main == "main_login") {
                    settings.main = "main_register";
                } else {
                    settings.main = "main_login";
                }
                renderAll();
            }
        }
    );
}

//todo buffer template to enhance the render effiency.

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