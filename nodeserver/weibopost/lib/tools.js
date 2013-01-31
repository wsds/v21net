/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-29
 * Time: 上午10:24
 * To change this template use File | Settings | File Templates.
 */


var tools = {};
var redis = require("redis");
var client = redis.createClient();

tools.initializePostlist = function () {
    root.globaldata.postlist = {};
    client.hgetall("postlist", function (err, obj) {
        root.globaldata.postlist = obj;
        console.dir(obj);
    });
};

tools.addPost = function (weibo_user, text, publishTimeString, postlist) {
    var post = {};

    var now = new Date();
    var publishTime = now;
    publishTime.setSeconds(publishTime.getSeconds() + 2);
    if (publishTimeString != "") {
        publishTime = new Date(publishTimeString);
    }
    post.id = weibo_user + now.getTime();
    post.time = getShortDateTimeString(publishTime);
    post.status = "publishing";
    post.text = text;
    post.pid = "none";
    //post.remainTime = parseInt((publishTime.getTime() - now.getTime()) / (1000));
    //post.remainMinute = Math.floor(post.remainTime / 60);
    //post.remainSecond = post.remainTime % 60;
    post.weibo_user = weibo_user;
    client.hset(["postlist", post.id, JSON.stringify(post)], redis.print);
    postlist[post.id] = post;
    return post;
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


module.exports = tools;