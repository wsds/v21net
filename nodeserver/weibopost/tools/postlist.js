/**
 * Date: 13-1-29
 * To change this template use File | Settings | File Templates.
 */


var postlist = {};
var redis = require("redis");
var client = redis.createClient();

postlist.initializePostlist = function () {
    root.globaldata.postlist = {};
    client.hgetall("weibo_tools_postlist", function (err, postlistStr) {
        for (postID in postlistStr) {
            root.globaldata.postlist[postID] = JSON.parse(postlistStr[postID]);
        }
        console.log("postlist initialized.")
    });
};

postlist.addPost = function (weibo_user_name, text, publishTimeString, postlist) {
    var post = {};

    var now = new Date();
    var publishTime = now;
    publishTime.setSeconds(publishTime.getSeconds() + 2);
    if (publishTimeString != "") {
        publishTime = new Date(publishTimeString);
    }
    post.id = weibo_user_name + now.getTime();
    post.time = getShortDateTimeString(publishTime);
    post.status = "publishing";
    post.text = text;
    post.pid = "none";
    //post.remainTime = parseInt((publishTime.getTime() - now.getTime()) / (1000));
    //post.remainMinute = Math.floor(post.remainTime / 60);
    //post.remainSecond = post.remainTime % 60;
    post.weibo_user = weibo_user_name;
    client.hset(["weibo_tools_postlist", post.id, JSON.stringify(post)], redis.print);
    client.lpush("postlist_" + weibo_user_name, post.id);
    postlist[post.id] = post;
    return post;
}

postlist.getPostlist = function (weibo_user_name, start, end, response) {
    var weibo_user_postlist = {};
    response.asynchronous = 1;

    client.lrange("postlist_" + weibo_user_name, start, end, function (err, postlistIDs) {

            client.hmget("weibo_tools_postlist", postlistIDs, function (err, postlistStr) {
                for (postID in postlistStr) {
                    weibo_user_postlist[postID] = JSON.parse(postlistStr[postID]);
                }
                response.write(JSON.stringify(weibo_user_postlist));
                response.end();
            });
        }

    );
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


module.exports = postlist;