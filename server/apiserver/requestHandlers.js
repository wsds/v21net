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
                "提示信息": "注册账号失败",
                "reason": "邀请码不正确"
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
                "提示信息": "验证码不正确",
                "reason": "验证码不正确"
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
    } else if (operation == "checktoken") {
        weiboManage.checkToken(data, response);
    }
};


var postManage = require('./handlers/postManage');
requestHandlers.post = function (request, response, pathObject, data) {
    var operation = pathObject["operation"];
    if (operation == "add") {

        var post = postManage.add(data, response);
    }
    else if (operation == "addforward") {
        var forwardID = data["forwardid"];
        if (forwardID != null) {
            var forward = {
                forwardID: data["forwardid"],
                forwardUser: data["forwarduser"],
                forwardTime: data["forwardtime"],
                forward_profile_image: data["profile_image"],
                forwordText: data["forwordtext"]
            }
        }
        var post = postManage.add(data, response, forwardID, forward);
    }
    else if (operation == "del") {
        var post = postManage.del(data, response);
    }
    else if (operation == "get") {
        postManage.get(data, response);
    }
    else if (operation == "modify") {
        postManage.modify(data, response);
    }
};

module.exports = requestHandlers;