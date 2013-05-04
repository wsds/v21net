/**
 * Date: 13-1-29
 * To change this template use File | Settings | File Templates.
 */


var publishing = {};
var redis = require("redis");
var client = redis.createClient();

var weibo_post = require('./weibo_post');

var globaldata = root.globaldata;



var nextPostTime = new Date("2020/01/28 18:28:18");
var nextPostPointer = {};
var nextPost = {};
var nextPostID = "empty";
var status = "stopped";


publishing.load = function (next) {
    client.get("publishing_next_post_id", function (err, postID) {
        nextPostID = postID;
        if (nextPostID == "empty") {
            return;
        }
        client.hget("publishing", nextPostID, function (err, postPointerStr) {
            nextPostPointer = JSON.parse(postPointerStr);
            nextPostTime = nextPostPointer.publishTime;
            client.hget("weibo_tools_postlist", nextPostID, function (err, postStr) {
                nextPost = JSON.parse(postStr);
                next();
            });
        });
    });
    console.log("publishing initialized.");
};


publishing.start = function (response) {
    response.asynchronous = 1;
    publishing.load(function () {
        status = "started";
        response.write(JSON.stringify({
            "提示信息": "定时发布器状态",
            "status": status,
            "nextPostID": nextPostID,
            "nextPostPointer": nextPostPointer,
            "nextPost": nextPost,
            "nextPostTime": getShortDateTimeString(nextPostTime)
        }));
        response.end();
    });
}

publishing.reload = function (response) {

}

var publishList = {};
publishing.check = function (response) {
    response.asynchronous = 1;
    client.hgetall("publishing", function (err, postPointerStr) {
        for (var postID in postPointerStr) {
            if (postID == "undefined") {
                continue;
            }
            var postPointer = JSON.parse(postPointerStr[postID]);
            publishList[postID] = postPointer;
        }
        var result = check_publish_from_head(publishList);
        response.write(JSON.stringify({
            "提示信息": "定时链表检查",
            "status": status,
            "检查结果": result
        }));
        response.end();
    });


    function check_publish_from_head(publishList) {
        var result1 = "head";

        var head = publishList[nextPostID];
        var post = head;
        var postID = nextPostID;
        while (post.next != "tail") {
            result1 += ">>>";
            result1 += postID;
            postID = post.next;
            post = publishList[postID];
            if (post == null) {
                result1 += ">>>###########error#############"
                status = "error";
                break;
            }
        }
        result1 += ">>>tail"
        return result1;
    }

}


//var timer_alert = setInterval(function () {
//    resolvePostList();
//}, 1000 * 1);// check the postList every 1 second.

//function resolvePostList() {
//    var now = new Date();
//    var remainTime = parseInt((nextPostTime.getTime() - now.getTime()) / (1000));
//    //    console.log("还剩：" + remainTime+"     nextPostTime:"+getShortDateTimeString(nextPostTime)+"    nextPostlist:"+JSON.stringify(nextPostlist));
//    if (remainTime == 0) {
//        for (var index in nextPostlist) {
//            var post = nextPostlist[index];
//            sendPost(post);
//        }
//    }
//}

function sendPost(post) {
    weibo_post.post(post, postlist);
    //    console.log(JSON.stringify(publishing) + " has been posted!");
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


module.exports = publishing;