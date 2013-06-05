/**
 * Date: 2013.04.15
 * requestHandles dispatch. Request pretreatment.
 */

var requestHandlers = {};

var globaldata = root.globaldata;


var accountManage = require('./handlers/accountManage');
requestHandlers.accountManage = function (request, response, pathObject, data) {
    var operation = pathObject["operation"];
    if (operation == "add") {
        var invite = data.invite;
        if (invite != "lejoying") {
            response.write(JSON.stringify({
                "提示信息":"注册账号失败",
                "reason":"邀请码不正确"
            }));
            response.end();
        }
        else {
            accountManage.add(data, response);
        }
    }
    else if (operation == "exist") {
        accountManage.exist(data, response);
    }
    else if (operation == "auth") {
        accountManage.auth(data, response);
    }
    else if (operation == "modify") {
        var verification = data.verification;
        if (verification != "lejoying1") {
            response.write(JSON.stringify({
                "提示信息":"验证码不正确",
                "reason":"验证码不正确"
            }));
            response.end();
        }
        else {
            accountManage.modify(data, response);
        }

    }
};

var weiboManage = require('./handlers/weiboManage');
requestHandlers.weiboManage = function (request, response, pathObject, data) {
    var operation = pathObject["operation"];
    if (operation == "add") {
        weiboManage.add(data, response);
    } else if (operation == "delete") {
        weiboManage.delete(data, response);
    } else if (operation == "getall") {
        weiboManage.getall(data, response);
    }
};

var messageManage = require('./handlers/messageManage');
requestHandlers.messageManage = function (request, response, pathObject, data) {
    var operation = pathObject["operation"];
    if (operation == "add") {
        messageManage.add(data, response);
    }
};

var postManage = require('./handlers/postManage');
requestHandlers.post = function (request, response, pathObject, data) {
    var operation = pathObject["operation"];
    if (operation == "add") {

        var post = postManage.add(data, response);
    }
    else if (operation == "addforward") {
        var text = getParam["text"];
        var weibo = getParam["weibo_user"];
        var time = getParam["time"];
        var forwardID = getParam["forwardid"];
        if (forwardID != null) {
            var forward = {
                forwardID:getParam["forwardid"],
                forwardUser:getParam["forwarduser"],
                forwardTime:getParam["forwardtime"],
                forward_profile_image:getParam["profile_image"],
                forwordText:getParam["forwordtext"]
            }
        }
        var post = postManage.add(weibo, text, time, pic, response, forwardID, forward);
    }
    else if (operation == "del") {
        var weibo = getParam["weibo_user"];
        var postid = getParam["postid"];
        var post = postManage.del(weibo, postid, response);
    }
    else if (operation == "get") {
        postManage.get(data, response);
    }
    else if (operation == "modify") {
        var weibo = getParam["weibo_user"];
        var start = getParam["start"];
        var end = getParam["end"];
        postManage.modify(weibo, start, end, response);
    }
};

module.exports = requestHandlers;