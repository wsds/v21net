/**
 * Date: 2013.01.31
 * To change this template use File | Settings | File Templates.
 */


var weibo_post = {};

var weibo = require('weibo');

var serverSetting = root.globaldata.serverSetting;
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);

weibo.init('weibo', serverSetting.appkey, serverSetting.secret, '');

var ajax = require('./../lib/ajax');

var fs = require('fs');
var path = require('path');


function getWeiboUser(weibo_user_name, next) {
    client.hget("weibo_users", weibo_user_name, function (err, userStr) {
        if (userStr != null) {
            var user = JSON.parse(userStr);
            next(user);
        }
        else {
            next(null);
        }
    });
}

weibo_post.post = function (post) {
    getWeiboUser(post.weibo_user, function (weibo_user) {
        if (weibo_user != null) {
            if (post.forwardID != null) {
                weibo.repost(weibo_user, post.forwardID, post.text, callback);
            }
            else if (post.pid == "none") {
                weibo.update(weibo_user, post.text, callback);
            }
            else {
                var pidRegExp = /^\D*\d{13}$/;
                if (pidRegExp.test(post.pid)) {
                    var picpath = serverSetting.imageFolder + post.pid + ".png";
                    var pic = {
                        data: fs.createReadStream(picpath),
                        name: picpath
                    };
                    weibo.upload(weibo_user, post.text, pic, callback);
                }
                else {
                    weibo.update(weibo_user, post.text);
                    console.error("状态异常：")
                    console.error(JSON.stringify(post));
                    post.status = "error";
                    client.hset(["weibo_tools_postlist", post.id, JSON.stringify(post)], redis.print);
                }
            }
            function callback(err, status) {
                if (err) {
                    console.error("发布出错，出错原因：")
                    console.error(err, JSON.stringify(post));
                    post.status = "failed";
                    client.hset(["weibo_tools_postlist", post.id, JSON.stringify(post)], redis.print);
                }
                else {
                    console.warn("发布成功：");
                    console.log(status.user.screen_name, status.text);
                    post.status = "published";
                    client.hset(["weibo_tools_postlist", post.id, JSON.stringify(post)], redis.print);
                }
            }
        }
    });
}


module.exports = weibo_post;