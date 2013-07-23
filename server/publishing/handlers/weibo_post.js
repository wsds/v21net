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

weibo_post.post = function (postData, innerNext) {
    var postData = postData;
    var post = postData.post;
    var postNode = postData.postNode;
    var weibo = postData.weibo;

    if (postData.postNode.data.status != "resending" && postData.postNode.data.status != "queueing") {
        postData.postNode.data.status = "status_error";
        postData.postNode.save();
        startPublishing();
        return;
    }
    postNode.data.status = "sending";
    postNode.save(function (err, node) {
        next();
    });
    function next() {
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
                        data: fs.createReadStream(picpath),
                        name: picpath
                    };
                    weiboInterface.upload(weibo, post.text, pic, callback);
                }
                else {
                    weiboInterface.update(weibo, post.text, callback);
                    if (postData.postNode.data.status != "sending") {
                        postData.postNode.data.status = "status_error";
                        postData.postNode.save();
                        return;
                    }
                    console.error("状态异常：");
                    console.error(JSON.stringify(post));
                    postData.postNode.data.status = "error";
                    postData.postNode.save();
                }
            }
        }
        if (innerNext != null) {
            innerNext();
        }
    }

    function callback(err, status) {
        if (err) {
            var now = new Date();
            var timeout = Math.round(Math.random() * 30000);

            console.error("发布失败。现在时间：" + getShortDateTimeString(now) + "----------------将在" + timeout / 1000 + "秒后重新发送" + "----------------发布内容text:" + post.text + "----------------发布者:" + weibo.name);
            console.error("出错原因：" + err);
            if(err.message=="repeat content!"){
                return;
            }

            if (postData.retryTimes < 5) {
                postData.retryTimes++;
                if (postData.postNode.data.status != "sending") {
                    postData.postNode.data.status = "status_error";
                    postData.postNode.save();
                    return;
                }
                postData.postNode.data.status = "resending";
                postData.postNode.save(function (err, node) {
                    setTimeout(function () {
                        var now = new Date();
                        console.error("正在重发，现在时间：" + getShortDateTimeString(now) + "----------------失败次数：" + postData.retryTimes + "----------------发布内容text:" + post.text + "----------------发布者:" + weibo.name);
                        weibo_post.post(postData);
                    }, timeout);
                });

            }
            else {
                if (postData.postNode.data.status != "sending") {
                    postData.postNode.data.status = "status_error";
                    postData.postNode.save();
                    startPublishing();
                    return;
                }
                postData.postNode.data.status = "failed";
                postData.postNode.save(function (err, node) {
                    startPublishing();
                });
            }
        }
        else {
            var now = new Date();
            console.log("发布成功。现在时间：" + getShortDateTimeString(now));
            console.log(status.user.screen_name, status.text);
            if (postData.postNode.data.status == "sending") {
                postData.postNode.data.status = "published";
                postData.postNode.save(function (err, node) {
                    startPublishing();
                });
            } else {
                postData.postNode.data.status = "status_error";
                postData.postNode.save();
                startPublishing();
            }
        }
    }

}

var ajax = require('../lib/ajax');
function startPublishing() {
    ajax.ajax({
        data: {},
        type: 'GET',
        url: "http://127.0.0.1:8063/api2/publishing/start",
        success: function (dataStr) {
//            console.log(dataStr);
        }
    });
}

function getShortDateTimeString(date) {   //如：2011/07/29 13:30
    var date = new Date(date);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1);
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

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
    if (second < 10) {
        second = '0' + second;
    }

    var str = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
    return str;
}

module.exports = weibo_post;