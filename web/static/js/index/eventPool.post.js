
eventPool.main_offline_post = function (status, area) {


    $("#sendtext").keyup(function () {
        if (event.ctrlKey && event.keyCode == 13 || event.keyCode == 10) {
            $("#btsend").trigger("click");
        }
    });

    $("#time_send").click(function () {
            var text = $("#sendtext").val().trim();
            if (text == "") {
                window.alert("发布内容不能为空的。");
                return;
            }
            var time = app.time.public_time;

            uploadPic(function (pic) {
                var post = addPost(time, text, pic);
            });

            $("#sendtext").val("");
            $("#thumbs").empty();
        }
    );

    $("#now_send").click(function () {
            var text = $("#sendtext").val().trim();
            if (text == "") {
                window.alert("发布内容不能为空的。");
                return;
            }
            var time = $('#time_picker').val();

            time = "now";

            uploadPic(function (pic) {
                var post = addPost(time, text, pic);
            });

            $("#sendtext").val("");
            $("#thumbs").empty();
        }
    );

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
                    url: ("http://www.weibo.com/upload2/"),
                    success: function (data) {
                        var filename = data.filename;
                        if (filename == null) {
                            alert(JSON.stringify(data));
                        } else {
                            next(filename);
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

    function addPost(time, text, pic) {
        $.ajax({
            data: {"text": text, "weibo_user": app.localSettings.ownedWeibo.currentWeibo, "time": time, "pic": pic},
            type: 'POST',
            url: ("http://" + app.serverUrl + "/api2/post/add"),
            success: function (data) {
                if (data["提示信息"] == "成功") {
                }
                else {
                }
            }
        });
    }

    registerUploadImageEvent();

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
                        if (app.uploadStatus = "none") {
                            app.uploadStatus = "uploading";
                        }
                        $('.images_a', $(span)).click(function () {
                            if ($(this).hasClass("focus")) {
                                $(this).removeClass("focus");
                                //$("#pointupicon").toggleClass("uppoint");

//                                document.getElementById("pointupicon").className = "uppoint";
                                $(".images_close_a", $(this)).remove()
                            }
                            else {
                                $(this).addClass("focus");
//                                document.getElementById("pointupicon").className = "uppointclick";
                                $(this).append('<a class="images_close_a" href="javascript:"><img class="images_close"  style="vertical-align: top;" src="/static/images/close_small.png"></a>')
                                $('.images_close_a', $(this)).click(function () {
                                        $(span).remove();
                                        document.getElementById("pointupicon").style.display = "none";
                                        if (app.uploadStatus = "uploading") {
                                            app.uploadStatus = "none";
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