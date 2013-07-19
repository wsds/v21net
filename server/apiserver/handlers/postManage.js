/**
 * Demo of reading and writing data with neo4j.
 * Date: 2013.04.15
 */

var postManage = {};

var serverSetting = root.globaldata.serverSetting;
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);

/***************************************
 *     URL：/api2/post/add
 ***************************************/
var RSA = require('./../tools/RSA');
postManage.add = function (data, response, forwardID, forward) {
    response.asynchronous = 1;
    var weiboName = data.weibo_user;
    var post =
    {
        "type":"post",
        "text":data.text,
        "time":data.time,
        "pid":data.pic,
        "status":"publishing"
    };
    if (forwardID != null) {
        post.forwardID = forwardID;
        post.forwardJSON = JSON.stringify(forward);
    }

    var now = new Date();

    var previousID = "empty";
    var nextID = "empty";

    if (post.time == "now") {
        post.time = now.getTime() + 5001;
    }
    else {
        post.time = parseInt(post.time);
    }
    if (post.time < now.getTime() + 5000) {
        response.write(JSON.stringify({"提示信息":"定时参数不正确。"}));
        response.end();
        return;
    }

    createPostNode();

    function createPostNode() {
        var query = [
            'START  weibo=node:weibo(name = {weiboName})' ,
            'CREATE (post:Post{post})',
            'SET post.id=ID(post)',
            'CREATE UNIQUE weibo-[r:HAS_POST]->post',
            'RETURN  post, weibo, r'
        ].join('\n');

        var params = {
            weiboName:weiboName,
            post:post
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
            }
            if (parseInt(post.time) < serverSetting.nextPostTime + 1000) {
                console.warn("restart publishing");
                startPublishing();
            }
            response.write(JSON.stringify({
                "提示信息":"定时发布成功"
//                , "post": post
            }));
            response.end();
        });
    }
}
/***************************************
 *     URL：/api2/post/delete
 ***************************************/
postManage.del = function (data, response) {

    response.asynchronous = 1;
    var weiboName = data["weibo_user"];
    var postid = data["postid"]
    var time = data["time"]

    deletePost();

    function deletePost() {
        var query = [
            'START post=node({uid}), weibo=node:weibo(name = {weiboName})' ,
            'MATCH weibo:Weibo-[r:HAS_POST]->post:Post',
            'DELETE post, r'
        ].join('\n');

        var params = {
            weiboName:weiboName,
            uid:parseInt(postid)
        };

        db.query(query, params, function (err, results) {
            if (err) {
                console.error(err);
            }
            if (parseInt(time) < serverSetting.nextPostTime + 1000) {
                console.warn("restart publishing");
                startPublishing();
            }
            response.write(JSON.stringify({
                "提示信息":"删除成功",
                "postID":postid
            }));
            response.end();
        });
    }

}
/***************************************
 *     URL：/api2/post/modify
 ***************************************/
postManage.modify = function (data, response) {
    response.asynchronous = 1;
    var weiboName = data.weibo_user;
    var post =
    {
        "id":data.postid,
        "type":"post",
        "text":data.text,
        "time":data.time
    };

    modifyPost();

    function modifyPost() {
        var query = [
            'START post=node({uid})' ,
            'SET post.text={text}',
            'SET post.time={time}',
            'RETURN post'
        ].join('\n');

        var params = {
            uid:parseInt(post.id),
            text:data.text,
            time:parseInt(post.time)
        };

        db.query(query, params, function (err, results) {
            if (err) {
                console.error(err);
            }
            var postNode = results.pop().post;
            if (postNode.data.status == "queueing") {
                postNode.data.status = "queueing_modified";
                postNode.save();
            }
            if (parseInt(post.time) < serverSetting.nextPostTime + 1000) {
                console.warn("restart publishing");
                startPublishing();
            }
            response.write(JSON.stringify({
                "提示信息":"修改成功",
                "postID":post.id
            }));
            response.end();
        });
    }
}

/***************************************
 *     URL：/api2/post/get
 ***************************************/
postManage.get = function (data, response) {
    response.asynchronous = 1;

    var uid = data.uid;
    var weiboName = data["weibo_user"];
    var start = data["start"];
    var end = data["end"];
    var type = data["type"];

    getAllPost();

    function getAllPost() {
        var filter = 'WHERE weibo.name = {weiboName} AND NOT(HAS(post.forwardID))'
        if (type == "forward") {
            filter = 'WHERE weibo.name = {weiboName} AND HAS(post.forwardID)'
        }
        var query = [
            'MATCH weibo:Weibo-[:HAS_POST]->post:Post',
            filter,
            'RETURN post',
            'ORDER BY post.time' ,
            'SKIP {begin}',
            'LIMIT {count}',
            'UNION ALL ',
            'MATCH weibo:Weibo-[r:HAS_POST]->post:Post',
            filter,
            'RETURN count(post) AS post'
        ].join('\n');

        var params = {
            weiboName:weiboName,
            count:end - start,
            begin:start - 0
        };

        db.query(query, params, function (err, results) {

            if (err) {
                console.error(err);
                return;
            }
            var posts = {};
            var postOrder = [];
            var postCount = results.pop().post;
            for (var index in results) {
                var postNode = results[index].post;
                var post = postNode.data;
                if (type == "forward") {
                    post.forward = JSON.parse(post.forwardJSON);
                    post.forwardJSON = undefined;
                }
                postOrder.push(post.id);
                posts[post.id] = post;
            }

            /***************************************
             *     data：       postlist
             ***************************************/
            response.write(JSON.stringify({
                postlist:posts,
                postOrder:postOrder,
                postCount:postCount
            }));
            response.end();
        });
    }
}

var ajax = require('../lib/ajax');
function startPublishing() {
    ajax.ajax({
        data:{},
        type:'GET',
        url:"http://127.0.0.1:8063/api2/publishing/start",
        success:function (dataStr) {
//            console.log(dataStr);
        }
    });
}

module.exports = postManage;