/**
 * Date: 13-1-29
 * To change this template use File | Settings | File Templates.
 */


var publishing = {};

var serverSetting = root.globaldata.serverSetting;
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);

setTimeout(function () {
    console.warn("the publishing engine is starting.");
    publishing.preStart(response);
    publishing.start(response);
}, 3000);

var response = {};
response.write = function (string) {
    console.warn(string);
}
response.end = function () {
}

publishing.start = function (response) {
    response.asynchronous = 1;

    var nextPostData;
    serverSetting.nextPostTime = 2370650800000;
    getQueuePost();

    function getQueuePost() {
        var query = [
            'MATCH weibo:Weibo-[r:HAS_POST]->post:Post',
            'WHERE post.status="publishing" OR post.status="queueing" OR post.status="queueing_modified"',
            'RETURN post, weibo',
            'ORDER BY post.time' ,
            'LIMIT 5'
        ].join('\n');

        var params = {
        };
        db.query(query, params, function (err, results) {
            if (err) {
                console.error(err);
                return;
            }
            var posts = {};
            //Build up data
            for (var index in results) {
                var postNode = results[index].post;
                var weiboNode = results[index].weibo;
                var weibo = JSON.parse(weiboNode.data.JSON);
                var post = postNode.data;
                posts[post.id] = {
                    post:post,
                    postNode:postNode,
                    weibo:weibo
                };
            }

            //Create newly added timer
            for (var postID in posts) {
                var postData = posts[postID];
                if (postData.post.time < serverSetting.nextPostTime) {
                    serverSetting.nextPostTime = postData.post.time;
                    nextPostData = postData;
                }

                if (timerPool[postID] == null) {
                    console.warn("Creat Timer for post：");
                    console.warn(JSON.stringify(postData.post));
                    postData.postNode.data.status = "queueing";
                    postData.postNode.save();
                    var publishTimer = new PublishTimer(postData);
                    timerPool[postID] = publishTimer;
                } else if (postData.postNode.data.status == "queueing_modified") {
                    console.warn("Creat Timer for post(queueing_modified)：");
                    console.warn(JSON.stringify(postData.post));
                    postData.postNode.data.status = "queueing";
                    postData.postNode.save();
                    var publishTimer = new PublishTimer(postData);
                    timerPool[postID] = publishTimer;
                    clearTimeout(timerPool[postID].timer);
                    delete timerPool[postID];
                }
            }
            //Delete queue outed timer
            for (var postID in timerPool) {
                if (posts[postID] == null) {
                    console.warn("Delete queue outed Timer for post(queueing)：");
                    console.warn(JSON.stringify(timerPool[postID].post));
                    clearTimeout(timerPool[postID].timer);
                    delete timerPool[postID];
                }
            }
            response.write(JSON.stringify({
                "提示信息":"定时器组已运行",
                "nextPostTime":serverSetting.nextPostTime,
                "下一条微博":nextPostData.post,
                "发布时间":getShortDateTimeString(serverSetting.nextPostTime)
            }));
            response.end();
        });
    }
}


publishing.preStart = function (response) {
    response.asynchronous = 1;
    var now = new Date();
    getQueuePost();

    function getQueuePost() {
        var query = [
            'MATCH weibo:Weibo-[r:HAS_POST]->post:Post',
            'WHERE  post.time<{time} AND (post.status="publishing" OR post.status="queueing" OR post.status="queueing_modified")',
            'SET post.status="timeout"',
            'RETURN post'
        ].join('\n');

        var params = {
            time:now.getTime()
        };
        db.query(query, params, function (err, results) {
            if (err) {
                console.error(err);
                return;
            }

            response.write(JSON.stringify({
                "提示信息":"定时器组准备完毕",
                "timerPool":timerPool
            }));
            response.end();
        });
    }
}

var timerPool = {
};

function PublishTimer(postData) {
    var post = postData.post;
    var postNode = postData.postNode;
    var weibo = postData.weibo;
    this.postTime = post.time;
    this.post = post;
    this.postID = post.id;

    var now = new Date();
    this.timeout = post.time - now.getTime();
    if (this.timeout > 2147483648) {
        this.timeout = 2047483648;
    }
    this.timer = setTimeout(function () {
        sendPost(post);
        clearTimeout(timerPool[post.id].timer);
        delete timerPool[post.id];
    }, this.timeout);
}

//var weibo_post = require('./weibo_post');
function sendPost(post) {
//    weibo_post.post(post);
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