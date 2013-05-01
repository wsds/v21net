/**
 * Date: 13-1-29
 * To change this template use File | Settings | File Templates.
 */


var postlist = {};
var redis = require("redis");
var client = redis.createClient();


var globaldata = root.globaldata;
root.globaldata.publishing = {};
root.globaldata.nextPostID = "empty";
root.globaldata.lastAddPostID = "empty";

postlist.initializePublishing = function () {

    client.get("publishing_next_post_id", function (err, nextPostID) {
        if (nextPostID == null) {
            client.set("publishing_next_post_id", "empty", redis.print);
            return;
        }
        if (nextPostID == "empty") {
            return;
        }
        globaldata.nextPostID = nextPostID;
        if (globaldata.lastAddPostID == "empty") {
            globaldata.lastAddPostID = nextPostID;
        }
        client.hgetall("publishing", function (err, postPointerStr) {
            for (var postID in postPointerStr) {
                var postPointer = JSON.parse(postPointerStr[postID]);
                globaldata.publishing[postID] = postPointer;
            }
            console.log("publishing initialized.")
        });
    });
};

postlist.addPost = function (weibo_user_name, text, publishTimeString, pic) {
    var needReload = false;
    var post = {};

    var now = new Date();
    post.id = weibo_user_name + now.getTime();
    post.time = publishTime.getTime();
    post.status = "publishing";
    post.text = text;
    post.pid = pic;
    post.weibo_user = weibo_user_name;

    var previousID = "empty";
    var nextID = "empty";
    var publishTime = 0;


    if (publishTimeString == "now") {
        publishTime = now.getTime() + 5000;
    }
    else {
        publishTime = parseInt(publishTimeString);
    }

    if (publishTime < now.getTime() + 5000) {
        response.write(JSON.stringify({"提示信息": "定时参数不正确。"}));
        response.end();
        return;
    }


    if (globaldata.nextPostID == "empty") {
        nextID = "tail";
        previousID = "head";
        globaldata.nextPostID = post.id;
        client.set("publishing_next_post_id", globaldata.nextPostID, redis.print);
        needReload = true;
    }
    else {
        if (globaldata.lastAddPostID == "empty") {
            globaldata.lastAddPostID = globaldata.nextPostID;
        }
        var existPostID = globaldata.lastAddPostID;
        var existPostPointer = globaldata.publishing[existPostID];
        if (existPostPointer.publishTime > publishTime) {
            while (existPostPointer.publishTime > publishTime) {
                existPostID = existPostPointer.previous;
                if (existPostID == "head") {
                    break;
                }
                existPostPointer = globaldata.publishing[existPostID];
            }
            nextID = existPostPointer.next;
            previousID = existPostID;
            existPostPointer.next = post.id;
        }
        else {
            while (existPostPointer.publishTime <= publishTime) {
                existPostID = existPostPointer.next;
                if (existPostID == "tail") {
                    break;
                }
                existPostPointer = globaldata.publishing[existPostID];
            }
            nextID = existPostID;
            previousID = existPostPointer.previous;
            existPostPointer.previous = post.id;
        }
        client.hget("publishing", nextPostIDs, function (err, postPointer) {
            var nextPostPointer = postPointer;
            var nextPostTime = nextPostPointer.publishTime;
            if (nextPostTime > publishTime) {
                client.set("publishing_next_post_id", post.id, redis.print);
                needReload = true;
            }
        });
    }

    client.hset(["publishing", existPostID, JSON.stringify(existPostPointer)], redis.print);
    client.hset(["publishing", post.id, JSON.stringify({
        "previous": previousID,
        "next": nextID,
        "publishTime": post.time,
        "weibo_user": post.weibo_user,
        "text": post.text
    })], redis.print);

    globaldata.lastAddPostID = post.id;

    client.hset(["weibo_tools_postlist", post.id, JSON.stringify(post)], redis.print);
    client.lpush("postlist_" + weibo_user_name, post.id);

    response.write(JSON.stringify({"提示信息": "添加定时微博内容成功。"}));
    response.end();
    reloadPublishing(needReload, post.id);
    return post;
}

function reloadPublishing(needReload, postID) {
    if (needReload) {
        console.log("needReload", postID);
    }
    else {
        console.log("not needReload", postID);
    }
}

postlist.delPost = function (weibo_user_name, postid, postlist) {
    postlist[postid] = undefined;
    client.hdel(["weibo_tools_postlist", postid], redis.print);
    client.lrem("postlist_" + weibo_user_name, 1, postid);

    if (nextPostlist[postid] != null) {
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


module.exports = postlist;