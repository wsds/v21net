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


publishing.initialize = function () {
    client.get("publishing_next_post_id", function (err, nextPostID) {
        if(nextPostID=="empty"){
            return;
        }
        client.hget("publishing", nextPostIDs, function (err, postPointer) {
            nextPostPointer = postPointer;
            nextPostTime = nextPostPointer.publishTime;
            client.hget("weibo_tools_postlist", nextPostIDs, function (err, post) {
                nextPost = post;
            });
        });
    });
    console.log("publishing initialized.");
};


publishing.start = function (response) {


}

publishing.reload = function (response) {


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
//    console.log(JSON.stringify(publishing) + " has been posted!");
}






module.exports = publishing;