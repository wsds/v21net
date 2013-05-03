/**
 * Date: 2013.01.30
 * 说明: requestHandles
 */




var requestHandles = function () {
};
var feedlist = ["这是第一篇文章", "这是第二篇文章", "这是第3篇文章"];
requestHandles.feedlist = function (request, response, pathObject, queryobj) {
    response.write(JSON.stringify(feedlist));
};


var globaldata = root.globaldata;

var postlist = require('./tools/postlist');
postlist.initializePublishing();

var users = require('./tools/users');
users.initializeUsers();

var accounts = require('./tools/accounts');
accounts.initializeAccounts();

//var weibo_post = require('./tools/weibo_post');


requestHandles.postSend = function (request, response, pathObject, getParam) {
    //    response.write('you have login!sendpost');
    var text = getParam["text"];
    var weibo_user = getParam["weibo_user"];
    var time = getParam["time"];
    var pic = getParam["pic"];

    weibo_post.postText(weibo_user, text);

    responseJSON = {"提示信息": "发布成功"}
    response.write(JSON.stringify(responseJSON));
    //    postlist.addPost(weibo_user, text, time, globaldata.postlist);
    //    response.write(JSON.stringify(globaldata.postlist));
    //    var senduser = weibo_users[weibo_user];
    //    weibo.update(senduser, text, function (err, status) {
    //        console.log(err);
    //        console.log(status);
    //    });
};


requestHandles.post = function (request, response, pathObject, getParam) {
    var operation = pathObject["operation"];
    if (operation == "add") {
        var text = getParam["text"];
        var weibo_user = getParam["weibo_user"];
        var time = getParam["time"];
        var pic = getParam["pic"];
        var post = postlist.addPost(weibo_user, text, time, pic, response);
    }
    else if (operation == "del") {
        var weibo_user = getParam["weibo_user"];
        var postid = getParam["postid"];
        var post = postlist.delPost(weibo_user, postid, response);
    }
    else if (operation == "addforward") {
        var text = getParam["text"];
        var weibo_user = getParam["weibo_user"];
        var time = getParam["time"];
        var forwardID = getParam["forwardid"];
        if (forwardID != null) {
            var forward = {
                forwardID: getParam["forwardid"],
                forwardUser: getParam["forwarduser"],
                forwardTime: getParam["forwardtime"],
                forward_profile_image: getParam["profile_image"],
                forwordText: getParam["forwordtext"]
            }
        }
        var post = postlist.addPost(weibo_user, text, time, pic, response, forwardID, forward);
    }

};

requestHandles.postList = function (request, response, pathObject, getParam) {
    response.write(JSON.stringify(globaldata.postlist));
};

requestHandles.weiboUserAdd = function (request, response, pathObject, postData) {
    var weibo_user_str = postData["weibo_user"];
    var weibo_user = JSON.parse(weibo_user_str);

    users.addUser(weibo_user, globaldata.weibo_users);
    response.write(JSON.stringify({"提示信息": "微博账号添加成功"}));
    response.end();
};


requestHandles.addAccount = function (request, response, pathObject, getParam) {
    var accountName = getParam["account"];
    var password = getParam["password"];
    var invite = getParam["invite"];
    if (invite == "slzd2013") {
        accounts.addAccount(accountName, password, response);
    }
    else {
        response.write(JSON.stringify({"提示信息": "邀请码不正确。"}));
        response.end();
    }

};

requestHandles.authAccount = function (request, response, pathObject, getParam) {
    var accountName = getParam["account"];
    var password = getParam["password"];
    accounts.authAccount(accountName, password, response);
};

requestHandles.accountOwnedWeibo = function (request, response, pathObject, getParam) {
    var operation = pathObject["operation"];
    if (operation == "add") {
        var accountName = getParam["account"];
        var ownedWeibo = getParam["ownedWeibo"];
        accounts.addAccountOwnedWeibo(accountName, ownedWeibo, response);
    }
    else if (operation == "getall") {
        var accountName = getParam["account"];
        accounts.getallAccountOwnedWeibo(accountName, response);
    }
    else if (operation == "del") {
        var accountName = getParam["account"];
        var ownedWeibo = getParam["ownedWeibo"];
        accounts.delAccountOwnedWeibo(accountName, ownedWeibo, response);
    }

};

requestHandles.accountOwnedWeiboPost = function (request, response, pathObject, postData) {
    var operation = pathObject["operation"];
    if (operation == "add") {
        var accountName = postData["account"];
        var ownedWeibo = postData["ownedWeibo"];
        accounts.addAccountOwnedWeibo(accountName, ownedWeibo, response);
        response.end();
    }
}

requestHandles.getTokenInfo = function (request, response, pathObject, getParam) {
    var weibo_user = getParam["weibo_user"];
    weibo_post.getTokenInfo(weibo_user, response);

};

requestHandles.getPostlist = function (request, response, pathObject, getParam) {
    var weibo_user = getParam["weibo_user"];
    var start = getParam["start"];
    var end = getParam["end"];
    postlist.getPostlist(weibo_user, start, end, response);
};

requestHandles.getForwardlist = function (request, response, pathObject, getParam) {
    var weibo_user = getParam["weibo_user"];
    var start = getParam["start"];
    var end = getParam["end"];
    postlist.getForwardlist(weibo_user, start, end, response);
};


requestHandles.test = function (request, response, pathObject, getParam) {
    response.write(JSON.stringify({"a": "1213", b: "3213123"}));
};


requestHandles.server = function (request, response, pathObject, getParam) {
    var operation = pathObject["operation"];
    if (operation == "publishing") {
        postlist.publishing(response);
    }
    else if (operation == "clear") {
        postlist.clear(response);
    }
    else if (operation == "weibo_users") {
        users.weiboUsers(response);
    }
};
module.exports = requestHandles;