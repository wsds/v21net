/**
 * Date: 2013.01.31
 * To change this template use File | Settings | File Templates.
 */


var weibo_post = {};

var weiboInterface = require('weibo');

var serverSetting = root.globaldata.serverSetting;
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);

weiboInterface.init('weibo', serverSetting.appkey, serverSetting.secret, '');

var ajax = require('./../lib/ajax');

var fs = require('fs');
var path = require('path');

weibo_post.post = function (postData) {
    var postData = postData;
    var post = postData.post;
    var postNode = postData.postNode;
    postNode.data.status = "sending";
    postNode.save();
    var weibo = postData.weibo;
    if (weibo != null) {
        if (post.forwardID != null) {
            weiboInterface.repost(weibo, post.forwardID, post.text, callback);
        }
        else if (post.pid == "none") {
            weiboInterface.update(weibo, post.text, callback);
        }
        else {
            var pidRegExp = /^\D*\d{13}$/;
            if (pidRegExp.test(post.pid)) {
                var picpath = serverSetting.imageFolder + post.pid + ".png";
                var pic = {
                    data:fs.createReadStream(picpath),
                    name:picpath
                };
                weiboInterface.upload(weibo, post.text, pic, callback);
            }
            else {
                weiboInterface.update(weibo, post.text, callback);
                console.error("状态异常：")
                console.error(JSON.stringify(post));
                postData.postNode.data.status = "error";
                postData.postNode.save();
            }
        }
        function callback(err, status) {
            if (err) {
                console.error("发布出错，出错原因：");
                console.error(err, JSON.stringify(post));
                if (err) {
                    if (postData.retryTimes < 5) {
						postData.retryTimes;
                        setTimeout(function () {
                            console.error("失败重发：");
                            console.error(JSON.stringify(post));
                            weibo_post.post(postData);
                        }, 10000);
                    }
                }
                postData.postNode.data.status = "failed";
                postData.postNode.save(function (err, node) {
                    startPublishing();
                });
            }
            else {
                console.warn("发布成功：");
                console.warn(status.user.screen_name, status.text);
                if (postData.postNode.data.status != "error") {
                    postData.postNode.data.status = "published";
                    postData.postNode.save(function (err, node) {
                        startPublishing();
                    });
                }
            }
        }
    }
}

var ajax = require('../lib/ajax');
function startPublishing() {
    ajax.ajax({
        data:{},
        type:'GET',
        url:"http://127.0.0.1:8063/api2/publishing/start",
        success:function (dataStr) {
            console.log(dataStr);
        }
    });
}


module.exports = weibo_post;