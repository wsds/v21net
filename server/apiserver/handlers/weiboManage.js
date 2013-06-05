/**
 * Demo of reading and writing data with neo4j.
 * Date: 2013.04.15
 */

var weiboManage = {};

var serverSetting = root.globaldata.serverSetting;
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);

/***************************************
 *     URL：/api2/weixinuer/add
 ***************************************/
weiboManage.add = function (data, response) {
    response.asynchronous = 1;
    var uid = data.uid;
    var weiboStr = data.weibo;
    var weiboJSON = JSON.parse(weiboStr);

    db.getNodeById(uid, function (err, accountNode) {
        if (accountNode == null) {
            response.write(JSON.stringify({
                "提示信息":"添加微博绑定用户失败",
                "失败原因":"账号不存在"
            }));
            response.end();
        }
        else {
            next(accountNode);
        }
    });
    function next(accountNode) {
        var weibo =
        {
            "type":"weixin",
            "name":weiboJSON.name,
            "token":weiboJSON.access_token,
            "expires_in":weiboJSON.expires_in,
            "status":"",
            "profile_image":weiboJSON.profile_image_url,
            "JSON":weiboStr
        };


        var query = [
            'START weibo=node:weibo(name = "{weiboName}"), account=node({uid})',
            'CREATE UNIQUE account-[r:HAS_WEIBO]->weibo',
            'RETURN r'
        ].join('\n');

        var params = {
            weiboName:weibo.name,
            uid:uid
        };

        db.query(query, params, function (err, results) {
            if (err) throw err;
            var likes = results.map(function (result) {
                return result['other'];
            });
            // ...
        });

        db.getIndexedNode("weibo", "name", weibo.name, function (err, node) {
            if (node == null) {
                var weiboNode = db.createNode(weibo);
                weiboAdd(weiboNode);
            }
            else {
                var weiboNode = node;
                weiboNode.data = weibo;
                weiboNode.data.weixinid = weiboNode.id;
                weiboAdd(weiboNode);
            }
        });
        function weiboAdd(weiboNode) {

            weiboNode.save(function (err, weiboNode) {
                weiboNode.data.weixinid = weiboNode.id;
                weiboNode.index("weibo", "name", weibo.name);
                weiboNode.save(function (err, weiboNode) {

                    weiboNode.createRelationshipFrom(accountNode, "HAS_WEIBO");
                    response.write(JSON.stringify({
                        "提示信息":"添加微信绑定用户成功",
                        "node":weiboNode.data
                    }));
                    response.end();
                });
            });
        }
    }


}
/***************************************
 *     URL：/api2/weixinuer/delete
 ***************************************/
weiboManage.delete = function (data, response) {
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
weiboManage.modify = function (data, response) {
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
weiboManage.getall = function (data, response) {
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

module.exports = weiboManage;