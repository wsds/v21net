eventPool.main_offline_post = function (status, area) {


    $("#sendtext").keyup(function () {
        if (event.ctrlKey && event.keyCode == 13 || event.keyCode == 10) {
            $("#btsend").trigger("click");
        }
    });

    $("#time_send").click(function () {
        var text = $("#sendtext").val().trim();
        if (app.localSettings.ownedWeibo.currentWeibo == null) {
            window.alert("请先绑定微博");
            return;
        }
        if (text == "") {
            window.alert("发布内容不能为空的。");
            return;
        }
        if (lastText == text) {
            window.alert("不能重复发布内容。");
            return;
        }


        var public_time = new Date($('#public_time').text());

        uploadPic(function (pic) {
            var post = addPost(public_time.getTime(), text, pic, function (data) {
                if (data["提示信息"] == "定时发布成功") {
                    $("#sendtext").val("");
                    $("#thumbs").empty();
                    $("#post_hint").html(data["提示信息"]);
//                    lastText = text;
                }
                else {
                    $("#post_hint").html(data["提示信息"]);
                }
                showHint();
            });
        });
    });

    function showHint() {
        $("#post_hint").slideDown("fast");
        setTimeout(function () {
            $("#post_hint").slideToggle("fast");
        }, 1000);
    }

    var lastText = "";
    $("#now_send").click(function () {
        var text = $("#sendtext").val().trim();
        if (app.localSettings.ownedWeibo.currentWeibo == null) {
            window.alert("请先绑定微博");
            return;
        }
        if (text == "") {
            window.alert("发布内容不能为空的。");
            return;
        }
        if (lastText == text) {
            window.alert("不能重复发布内容。");
            return;
        }
        lastText = text;

        uploadPic(function (pic) {
            var post = addPost("now", text, pic, function (data) {
                if (data["提示信息"] == "定时发布成功") {
                    $("#sendtext").val("");
                    $("#thumbs").empty();
                    $("#post_hint").html(data["提示信息"]);
                }
                else {
                    $("#post_hint").html(data["提示信息"]);
                }
                showHint();
            });
        });
    });

    function uploadPic(next) {
        if (app.uploadStatus == "uploading") {
            var file = $("#input_image")[0].files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                var urlData = this.result;

                $.ajax({
                    data: {filename: "1.png", image: urlData, weibo_user: app.localSettings.ownedWeibo.currentWeibo},
                    type: 'POST',
                    url: ("http://" + app.serverUrl + "/upload2/"),
                    success: function (data) {
                        var filename = data.filename;
                        var pidRegExp = /^\D*\d{13}$/;
                        if (pidRegExp.test(filename) && data["提示信息"] == "图片上传成功") {
                            next(filename);
                        }
                        else {
                            alert("图片上传失败，请重新上传"+JSON.stringify(data));
                        }
                    }
                });
            };

            app.uploadStatus = "none";
        }
        else {
            next("none")
        }
    }

    function addPost(time, text, pic, next) {
        $.ajax({
            data: {"text": text, "weibo_user": app.localSettings.ownedWeibo.currentWeibo, "time": time, "pic": pic},
            type: 'POST',
            url: ("http://" + app.serverUrl + "/api2/post/add"),
            success: function (data) {
                next(data);
            }
        });
    }

    registerUploadImageEvent();
    eventPool.main_offline_post.registerUploadImageEvent = registerUploadImageEvent;

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
                        span.innerHTML = ['<span id="pointupicon" class="uppoint" style="">▲</span><a class="images_a"  href="javascript:" ><img class="images" src="', e.target.result, '" title="', aFile.name, '"/></a>'].join('');
                        //                    document.getElementById('thumbs').insertBefore(span, null);
                        $("#thumbs").empty();
                        $("#thumbs").append(span);
                        if (app.uploadStatus = "none") {
                            app.uploadStatus = "uploading";
                        }
                        $('.images_a', $(span)).click(function () {
                            if ($(this).hasClass("focus")) {
                                $(this).removeClass("focus");
                                $("#pointupicon").toggleClass("uppointclick");
                                $(".images_close_a", $(this)).remove();
                            }
                            else {
                                $(this).addClass("focus");
                                $("#pointupicon").toggleClass("uppointclick");
                                $(this).append('<a class="images_close_a" href="javascript:"><img class="images_close"  style="vertical-align: top;" src="/static/images/close_small.png"></a>')
                                $('.images_close_a', $(this)).click(function () {
                                    $(span).remove();
                                    $("#pointupicon").remove();
                                    if (app.uploadStatus = "uploading") {
                                        app.uploadStatus = "none";
                                    }
                                });
                            }
                        });
                    };
                })(f);
                imageReader.readAsDataURL(f);
                $("#pointupicon").show();

                break;
            }
        });
    }


    $("#sendtext")[0].oninput = function () {
        var content = $("#sendtext").val();
        var contentLength = getCharLength(content);
        var trueLength = parseInt(contentLength / 2);
        //alert(content);
        if (contentLength < 281) {
            $("#textLength").html(140 - trueLength);
        }
        else {
            $("#sendtext").val(content.substr(0, 281));
            $("#textLength").html(0);
        }

        function getCharLength(str) {
            var charLen = 0;
            for (var i = 0, len = str.length; i < len; i++) {
                if (str.charCodeAt(i) > 255) {
                    charLen += 2;
                }
                else {
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
    }


    $(".aa_face").click(function () {
        $("#sharpTop").toggleClass("hide");
        $("#sharpTop").toggleClass("shouldHide");
        $("#facePanel").toggleClass("hide");
        $("#facePanel").toggleClass("shouldHide");
        return false;
    });
    $(".face_a").click(function () {
        var text = $(this).attr("text");
        var sendtext = $("#sendtext").val();
        $("#sendtext").val(sendtext + text);
        $("#sendtext").trigger("input");
    });

};


function getShortTimeString(date) {   //如：2011/07/29 13:30
    var year = date.year;
    var month = date.month;
    var day = date.day;
    var hour = date.hour;
    var minute = date.minute;

    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }

    var str = year + '/' + month + '/' + day + ' ' + hour + ':' + minute;
    return str;
}

function Time(date) {
    var date = new Date(date);
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.public_time = getShortDateTimeString(date);
}

function getShortDateTimeString(date) {   //如：2011/07/29 13:30
    var date = new Date(date);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1);
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    //    var second = date.second || date.getSeconds();

    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }

    var str = year + '/' + month + '/' + day + ' ' + hour + ':' + minute;
    return str;
}