/**
 * Date: 12-3-25
 * 说明: restful API web请求url路由表
 */
var requestHandles = require("./../requestHandles");

var routemap = {
    "get":{
        "/api/postadd/*":requestHandles.postAdd,
        "/api/postsend/*":requestHandles.postSend,
        "/api/feedlist/:id":requestHandles.feedlist
    },
    "post":{
    },
    "put":{
    },
    "del":{
    }
};

module.exports = routemap;