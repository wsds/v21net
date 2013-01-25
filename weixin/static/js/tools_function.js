$(document).ready(function () {
        getPostList();
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
                    }
                }
                var publishTimeString = $("#time_picker").val();

                addPost(publishTimeString, text)

                renderTemplate();
                $("#sendtext").val("");
            }
        );

        var timer_alert = setInterval(function () {
//            alert('hello');
            resolvePostList();
            renderTemplate();
            addClockPostPerDay();
        }, 1000 * 1);// check the postList every 1 second.
        renderTemplate();
    }
);


var postList = [
    {time:"2013/01/23 12:21:6", status:"failed", text:"微博内容1", remainTime:28},
    {time:"2013/01/23 11:22:6", status:"published", text:"微博内容2", remainTime:-88},
    {time:"2013/01/23 10:31:6", status:"publishing", text:"微博内容3", remainTime:76},
    {time:"2013/01/23 12:41:6", status:"publishing or published or failed or timeout", text:"微博内容4", remainTime:66}
]

function resolvePostList() {
    var now = new Date();
    for (var index in postList) {
        var post = postList[index];
        var publishTime = new Date(post.time);
        post.remainTime = parseInt((publishTime.getTime() - now.getTime()) / (1000));
        post.remainMinute = Math.floor(post.remainTime / 60);
        post.remainSecond = post.remainTime % 60;
        if (post.status == "publishing") {
            if (post.remainTime < 0) {
                post.status = "timeout";
            }
            if (post.remainTime >= 0 && post.remainTime < 1) {
                //发布。
                sendPost(post);
            }
        }
    }
}

function addClockPostPerDay(){
    var now = new Date();
    var time=getShortTimeString(now);
    if(time=="00:30:00"){
        postList=[];
        addClockPost();
    }

}
function addClockPost() {
    var now = new Date();
    for (var i = 0; i < 24; i++) {
        var todayStr = getShortDateString(now) + " " + i + ":01:00";
        var text = "";
        var count = i;
		var noon="上午";
        if (count > 12) {
            count = count - 12;
			noon="下午";
        }
		var text = "【"+noon+count+"点整】";
        for (var j = 0; j < count; j++) {
            text = text + "哐~";
        }
        addPost(todayStr, text);
    }

}

function addPost(publishTimeString, text) {
    var post = {};

    var now = new Date();
    var publishTime = now;
    publishTime.setSeconds(publishTime.getSeconds() + 2);
    if (publishTimeString != "") {
        publishTime = new Date(publishTimeString);
    }
    post.time = getShortDateTimeString(publishTime);
    post.status = "publishing";
    post.text = text;
    post.remainTime = parseInt((publishTime.getTime() - now.getTime()) / (1000));
    post.remainMinute = Math.floor(post.remainTime / 60);
    post.remainSecond = post.remainTime % 60;
    postList.push(post);
}

function getShortDateTimeString(date) {   //如：2011-07-29 13:30:50
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
    var str = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
    return str;
}

function getShortTimeString(date) {   //如：13:30:50
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
    var str = hour + ':' + minute + ':' + second;
    return str;
}


function getShortDateString(date) {   //如：2011-07-29
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    month = month + 1;
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    var str = year + '/' + month + '/' + day;
    return str;
}
window.onbeforeunload = function () {
    window.localStorage.postList = JSON.stringify(postList);
}


function getPostList() {
    if (window.localStorage.postList != null) {
        postList = JSON.parse(window.localStorage.postList);
    }
}
function renderTemplate() {
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


