/**
 * Date: 12-3-25
 * 说明: restful API web请求url路由表
 */
var requestHandles = require("./requestHandles");

var routemap = {
    "get":{
        "/api/feedlist/:id":requestHandles.feedlist,
        "/api/template":requestHandles.template,
    },
    "post":{
    },
    "put":{
    },
    "del":{
    }
};

module.exports = routemap;