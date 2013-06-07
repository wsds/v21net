/**
 * Date: 2013.04.15
 * The url route mapping of the restful API web request.
 *
 * demo1:
 *  http://127.0.0.1:8061/api2/access/get
 *  http://127.0.0.1:8061/api2/access/reset?i=0
 *
 *
 */
var requestHandlers = require("./requestHandlers");
var weiboInterface = require("./weiboInterface");

var routemap = {
    "get":{
        "/api2/account/:operation":requestHandlers.accountManage,
        "/api2/weibo/:operation":requestHandlers.weiboManage,
        "/api2/message/:operation":requestHandlers.messageManage,
        "/api2/post/:operation":requestHandlers.post,
        "/api2/weiboInterface/*":weiboInterface.interface
    },
    "post":{
        "/api2/message/:operation":requestHandlers.messageManage,
        "/api2/weibo/:operation":requestHandlers.weiboManage,
        "/api2/post/:operation":requestHandlers.post,
        "/api2/weiboInterface/*":weiboInterface.interface
    },
    "put":{
    },
    "del":{
    }
};

module.exports = routemap;