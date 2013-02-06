/**
 * Date: 13-1-29
 * To change this template use File | Settings | File Templates.
 */


var postlist = {};
var redis = require("redis");
var client = redis.createClient();

var weibo_post = require('./../tools/weibo_post');

var globaldata = root.globaldata;

var nextPostTime = new Date("2020/01/28 18:28:18");
var nextPostlist = {};


postlist.initializePostlist = function () {
    root.globaldata.postlist = {};
    client.hgetall("weibo_tools_postlist", function (err, postlistStr) {
        var now = new Date();
        nextPostTime = new Date("2020/01/28 18:28:18");
        nextPostlist = {};
        for (postID in postlistStr) {
            var post = JSON.parse(postlistStr[postID]);
            globaldata.postlist[postID] = post;
//            console.log(JSON.stringify(post));
            if (post.status == "publishing") {
                var publishTime = new Date(post.time);
                post.remainTime = parseInt((publishTime.getTime() - now.getTime()) / (1000));
                if (post.remainTime < 0) {
                    post.status = "timeout";
                    client.hset(["weibo_tools_postlist", post.id, JSON.stringify(post)], redis.print);
                    continue;
                }
                if (parseInt((publishTime.getTime() - nextPostTime.getTime()) / (1000)) <= 0) {
                    if(parseInt((publishTime.getTime() - nextPostTime.getTime()) / (1000)) < 0){
                        nextPostlist={};
                    }
                    nextPostTime = publishTime;
                    nextPostlist[postID] = post;
                }
            }
        }
        console.log("postlist initialized.")
    });
};

postlist.addPost = function (weibo_user_name, text, publishTimeString, postlist) {
    var post = {};

    var now = new Date();
    post.id = weibo_user_name + now.getTime();

    if (publishTimeString != "") {
        publishTime = new Date(publishTimeString);
        if (parseInt((publishTime.getTime() - nextPostTime.getTime()) / (1000)) <= 0) {
            if(parseInt((publishTime.getTime() - nextPostTime.getTime()) / (1000)) < 0){
                nextPostlist={};
            }
            nextPostTime = publishTime;
            nextPostlist[post.id] = post;
        }
    }

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

postlist.delPost = function (weibo_user_name, postid, postlist) {
    postlist[postid] = undefined;
    client.hdel(["weibo_tools_postlist", postid], redis.print);
    client.lrem("postlist_" + weibo_user_name, 1, postid);

    if(nextPostlist[postid]!=null){
        this.initializePostlist();
    }
}


function getAllPostlist(weibo_user_name, start, end, next) {
    if (end == -1) {
        client.llen("postlist_" + weibo_user_name, function (err, length) {
            end = length;
            start = 0;
            next(start, end);
        });
    }
    else {
        next(start, end);
    }
}

postlist.getPostlist = function (weibo_user_name, start, end, response) {
    var weibo_user_postlist = {};
    response.asynchronous = 1;
    getAllPostlist(weibo_user_name, start, end, function (start, end) {
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

    });
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


var timer_alert = setInterval(function () {
    resolvePostList();
}, 1000 * 1);// check the postList every 1 second.

function resolvePostList() {
    var now = new Date();
    var remainTime = parseInt((nextPostTime.getTime() - now.getTime()) / (1000));
//    console.log("还剩：" + remainTime+"     nextPostTime:"+getShortDateTimeString(nextPostTime)+"    nextPostlist:"+JSON.stringify(nextPostlist));
    if (remainTime == 0) {
        for (var index in nextPostlist) {
            var post = nextPostlist[index];
            sendPost(post);
        }
    }
}

function sendPost(post) {
    weibo_post.post(post, postlist);
//    console.log(JSON.stringify(post) + " has been posted!");
}


module.exports = postlist;