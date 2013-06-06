/**
 * Demo of reading and writing data with neo4j.
 * Date: 2013.04.15
 */

var weiboManage = {};

var serverSetting = root.globaldata.serverSetting;
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);

/***************************************
 *     URL：/api2/weibo/add
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
            "type":"weibo",
            "name":weiboJSON.name,
            "token":weiboJSON.access_token,
            "expires_in":weiboJSON.expires_in,
            "status":"",
            "profile_image_url":weiboJSON.profile_image_url,
            "id":weiboJSON.id,
            "JSON":weiboStr
        };

        db.getIndexedNode("weibo", "name", weibo.name, function (err, node) {
            var query;
            if (node == null) {//uniqueness cannot be resolved by cypher.
                var query = [
                    'START account=node({uid})' ,
                    'CREATE (weibo:Weibo{weibo})',
                    'CREATE UNIQUE account-[r:HAS_WEIBO]->weibo',
                    'SET weibo.weiboid=ID(weibo)',
                    'RETURN  weibo, account, r'
                ].join('\n');
                createWeiboNode(query, null);
            }
            else {
                var query = [
                    'START  weibo=node:weibo(name = {weiboName}), account=node({uid})' ,
                    'CREATE UNIQUE account-[r:HAS_WEIBO]->weibo',
                    'RETURN  weibo, account, r'
                ].join('\n');
                createWeiboNode(query, weibo);
            }

        });

        function createWeiboNode(query, updateWeibo) {
            var params = {
                weiboName:weibo.name,
                uid:parseInt(uid),
                weibo:weibo
            };

            db.query(query, params, function (err, results) {
                if (err) {
                    console.error(err);
                }
                var weiboNode=results[0].weibo;
                weiboNode.index("weibo", "name", weibo.name);
                if(updateWeibo!=null){
                    weiboNode.data=updateWeibo;
                    weiboNode.save();
                }

                response.write(JSON.stringify({
                    "提示信息":"添加微博绑定用户成功",
                    "node":weiboNode.data
                }));
                response.end();
            });
        }
    }
}
/***************************************
 *     URL：/api2/weibo/delete
 ***************************************/
weiboManage.delete = function (data, response) {
    response.asynchronous = 1;

    var uid = data.uid;
    var weiboName = data.ownedWeibo;

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
        deleteWeibo();
    }

    function deleteWeibo() {
        var query = [
            'START account=node({uid}), weibo=node:weibo(name = {weiboName})' ,
            'MATCH account-[r:HAS_WEIBO]->weibo:Weibo',
            'DELETE weibo, r'
        ].join('\n');

        var params = {
            weiboName:weiboName,
            uid:parseInt(uid)
        };

        db.query(query, params, function (err, results) {
            if (err) {
                console.error(err);
            }
            response.write(JSON.stringify({
                "提示信息":"删除授权管理微博账号成功"
            }));
            response.end();

//            response.write(JSON.stringify({
//                "提示信息": "授权管理微博账号已删除，请勿重复操作"
//            }));
//            response.end();

        });
    }
}

/***************************************
 *     URL：/api2/weibo/gatall
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
        getAllWeibo();
    }

    function getAllWeibo() {
        var query = [
            'START account=node({uid})' ,
            'MATCH account-[:HAS_WEIBO]->weibo:Weibo',
            'RETURN weibo;'
        ].join('\n');

        var params = {
            uid:parseInt(uid)
        };

        db.query(query, params, function (err, results) {

            if (err) {
                console.error(err);
            }
            var weibos = {};
            for (var index in results) {
                var weiboNode = results[index].weibo;
                var weibo = weiboNode.data;

                weibos[weibo.name] = {
                    id:weibo.id,
                    profile_image_url:weibo.profile_image_url
                };
            }
            response.write(JSON.stringify({
                "提示信息":"获取所有微博绑定用户成功",
                "ownedWeiboList":weibos,
                "currentWeibo":null
            }));
            response.end();

        });
    }
}

module.exports = weiboManage;