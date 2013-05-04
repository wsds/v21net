/**
 * Date: 13-1-29
 * To change this template use File | Settings | File Templates.
 */


var publishing = {};
var redis = require("redis");
var client = redis.createClient();

var weibo_post = require('./weibo_post');

var globaldata = root.globaldata;


var nextPostTime = 123;
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
        getPost(nextPostID, function (postPointer, postTime, post) {
            nextPostPointer = postPointer;
            nextPostTime = postTime;
            nextPost = post;
            console.log("publishing initialized.");
            next();
        });
    });

};

function getPost(postID, next) {
    client.hget("publishing", postID, function (err, postPointerStr) {
        if (postPointerStr == null) {
            next();
        }
        else {
            var postPointer = JSON.parse(postPointerStr);
            var postTime = postPointer.publishTime;
            client.hget("weibo_tools_postlist", postID, function (err, postStr) {
                var post = JSON.parse(postStr);
                next(postPointer, postTime, post);
            });
        }
    });
}

publishing.start = function (response) {
    response.asynchronous = 1;
    publishing.load(function () {
        if (nextPost == null) {
            response.write(JSON.stringify({
                "提示信息": "定时发布器数据为空或尚未正常运行"
            }));
            response.end();
        }
        else {
            status = "started";
            startTimer(nextPostID);
            response.write(JSON.stringify({
                "提示信息": "定时发布器状态",
                "status": status,
                "nextPostID": nextPostID,
                "nextPostPointer": nextPostPointer,
                "nextPost": nextPost,
                "nextPostTime": getShortDateTimeString(nextPostTime)
            }));
            response.end();
        }
    });
}

publishing.reload = function (response) {
    if (publishTimer == null || status != "started") {
        response.write(JSON.stringify({
            "提示信息": "定时发布器尚未正常运行"
        }));
    }
    else {
        response.asynchronous = 1;
        status = "reloading";
        console.log("publishing reloading.");
        clearTimeout(publishTimer.timer)
        publishing.load(function () {
            status = "started";
            startTimer(nextPostID);
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
}

publishing.stop = function (response) {
    if (publishTimer == null || status != "started") {
        response.write(JSON.stringify({
            "提示信息": "定时发布器尚未正常运行"
        }));
    }
    else {
        clearTimeout(publishTimer.timer)
        status = "stopped";
        console.log("publishing stopped.");
        response.write(JSON.stringify({
            "提示信息": "定时发布器状态",
            "status": status,
            "nextPostID": nextPostID,
            "nextPostPointer": nextPostPointer,
            "nextPost": nextPost,
            "nextPostTime": getShortDateTimeString(nextPostTime)
        }));
    }
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

var timerPool = {
    //todo several publishTimers
};

publishing.timer = function (response) {
    if (publishTimer == null || status != "started") {
        response.write(JSON.stringify({
            "提示信息": "定时发布器尚未正常运行"
        }));
    }
    else {
        response.write(JSON.stringify({
            "提示信息": "定时发布器状态",
            "timer": publishTimer.timeout,
            "post": publishTimer.post,
            "postTime": getShortDateTimeString(publishTimer.postTime)
        }));
    }

}


var publishTimer = null;

function startTimer(postID) {
    if (postID == "empty" || status != "started") {
        return;
    }
    getPost(postID, function (postPointer, postTime, post) {
        publishTimer = new PublishTimer(postID, postPointer, postTime, post);
    });


}

function PublishTimer(postID, postPointer, postTime, post) {
    this.postTime = postTime;
    this.post = post;
    this.postPointer = postPointer;
    this.postID = postID;

    var now = new Date();
    this.timeout = postTime - now.getTime();
    this.timer = setTimeout(function () {
        getPost(postID, function (postPointer, postTime, post) {
            sendPost(post);
            if (postPointer.next == "tail") {
                console.warn("发送列表已经为空", JSON.stringify(globaldata.publishing));
                globaldata.nextPostID = "empty";
                client.set("publishing_next_post_id", "empty", redis.print);
                delete globaldata.publishing[postID];
                client.hdel(["publishing", postID], redis.print);
                publishTimer = null;
                return;
            }
            nextPostID = postPointer.next;
            globaldata.nextPostID = nextPostID;
            client.set("publishing_next_post_id", nextPostID, redis.print);
            getPost(nextPostID, function (postPointer, postTime, post) {
                nextPostPointer = postPointer;
                nextPostTime = postTime;
                nextPost = post;

                postPointer.previous = "head";
                globaldata.publishing[nextPostID].previous = "head";
                client.hset(["publishing", nextPostID, JSON.stringify(postPointer)], redis.print);
                delete globaldata.publishing[postID];
                client.hdel(["publishing", postID], redis.print);
                startTimer(nextPostID);
            });
        });
    }, this.timeout);
}


function sendPost(post) {
    weibo_post.post(post);
    console.log(JSON.stringify(post) + " has been posted!");
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