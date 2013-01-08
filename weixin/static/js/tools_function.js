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
            $('#time_picker').mobiscroll('show');
            return false;
        });
        $('#clear').click(function () {
            $('#time_picker').val('');
            return false;
        });


        $("#btsend").click(function () {
                var post = {};

                var now = new Date();
                var publishTimeString = $("#time_picker").val();
                var publishTime = now;
                if (publishTimeString != "") {
                    publishTime = new Date(publishTimeString);
                }
                post.time = publishTime.toString();
                post.status = "publishing";
                post.text = $("#sendtext").val();
                post.remainTime = (publishTime.getTime() - now.getTime()) / (1000 * 60);
                postList.push(post);
                renderTemplate();
            }
        );

        renderTemplate();
    }
);

window.onbeforeunload = function() {
    window.localStorage.postList=JSON.stringify(postList);
}

var postList = [
    {time:"2013/01/23 12:21:6", status:"failed", text:"微博内容1", remainTime:28},
    {time:"2013/01/23 11:22:6", status:"published", text:"微博内容2", remainTime:-88},
    {time:"2013/01/23 10:31:6", status:"publishing", text:"微博内容3", remainTime:76},
    {time:"2013/01/23 12:41:6", status:"publishing or published or failed", text:"微博内容4", remainTime:66}
]
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


