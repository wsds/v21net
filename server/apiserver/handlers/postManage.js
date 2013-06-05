/**
 * Demo of reading and writing data with neo4j.
 * Date: 2013.04.15
 */

var postManage = {};

var serverSetting = root.globaldata.serverSetting;
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);

/***************************************
 *     URL：/api2/weixinuer/add
 ***************************************/
var RSA = require('./../tools/RSA');
postManage.add = function (data, response) {
    response.asynchronous = 1;
    var weiboName = data.weibo_user;
    var post =
    {
        "type":"post",
        "text":data.text,
        "time":data.time,
        "pic":data.pic,
        "status":"sending"
    };

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
        response.write(JSON.stringify({"提示信息": "定时参数不正确。"}));
        response.end();
        return;
    }

    createPostNode();

    function createPostNode() {
        var query = [
            'START  weibo=node:weibo(name = {weiboName})' ,
            'CREATE (post{post})',
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
            response.write(JSON.stringify({
                "提示信息":"定时发布成功"
//                , "post": post
            }));
            response.end();
        });
    }
}
/***************************************
 *     URL：/api2/weixinuer/delete
 ***************************************/
postManage.delete = function (data, response) {
    response.asynchronous = 1;
    var weixin =
    {
        "type":"weixin",
        "accesskey":data.accesskey,
        "weixinOpenID":data.weixinOpenID,
        "weixinName":data.weixinName
    }
    db.getIndexedNode("weixin", "weixinOpenID", weixin.weixinOpenID, function (err, node) {
        if (node != null) {
            node.delete();
            response.write(JSON.stringify({
                "information":"删除微信绑定用户成功",
                "node":node.data
            }));
            response.end();
        } else {
            response.write(JSON.stringify({
                "提示信息":"删除微信绑定用户失败",
                "reason":"微信用户不存在"
            }));
            response.end();
        }
    });
}
/***************************************
 *     URL：/api2/weixinuer/modify
 ***************************************/
postManage.modify = function (data, response) {
    response.asynchronous = 1;
    var weixin =
    {
        "type":"weixin",
        "accesskey":data.accesskey,
        "weixinOpenID":data.weixinOpenID,
        "weixinName":data.weixinName,
        "token":data.token
    }
    db.getIndexedNode("weixin", "weixinOpenID", weixin.weixinOpenID, function (err, node) {
        if (node != null) {
//            node.getRelationshipNodes("weixin", "weixinOpenID",weixin.weixinOpenID ,function(err, node){})
            node.save(function (err, node) {
                node.data.weixinName = weixin.weixinName;
                node.data.token = weixin.token;
                node.index("weixin", "weixinName", weixin.weixinName);
                node.index("weixin", "token", weixin.token);
                node.save(function (err, node) {
                    response.write(JSON.stringify({
                        "提示信息":"修改微信绑定用户成功",
                        "node":node.data
                    }));
                    response.end();
                });
            });

        } else {
            response.write(JSON.stringify({
                "提示信息":"修改微信绑定用户失败",
                "reason":"微信用户不存在"
            }));
            response.end();
        }
    });
}

/***************************************
 *     URL：/api2/weixinuer/gatall
 ***************************************/
postManage.getall = function (data, response) {
    response.asynchronous = 1;

    var uid = data.uid;

    db.getNodeById(uid, function (err, accountNode) {
        if (accountNode == null) {
            response.write(JSON.stringify({
                "提示信息":"获取所有微信绑定用户失败",
                "失败原因":"账号不存在"
            }));
            response.end();
        }
        else {
            next(accountNode);
        }
    });
    function next(accountNode) {

        accountNode.getRelationshipNodes({type:'OWNED', direction:'out'}, function (err, weixinNodes) {
            var weixins = {};
            for (var index in weixinNodes) {
                var weixinNode = weixinNodes[index];
                weixins[weixinNode.data.weixinid] = weixinNode.data;
            }

            response.write(JSON.stringify({
                "提示信息":"获取所有微信绑定用户成功",
                "weixins":weixins
            }));
            response.end();
        });
    }
}

module.exports = postManage;