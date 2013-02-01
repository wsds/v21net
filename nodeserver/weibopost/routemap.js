/**
 * Date: 12-3-25
 * 说明: restful API web请求url路由表
 *
 *http://127.0.0.1:8061/api/postsend/a?text=abcc&weibo_user=u1&time=2013/01/28%2016:22:22&pic=23125215214
 *
 * http://127.0.0.1:8061/api/gettokeninfo/a?weibo_user=很破滴一口钟
 *http://127.0.0.1:8061/api/addaccount/a?account=u1Z&password=123456
 * http://127.0.0.1:8061/api/addaccountownedweibo/a?account=u1Z&ownedWeibo=很破滴一口钟
 *
 */
var requestHandles = require("./requestHandles");

var routemap = {
    "get":{
        "/api/postadd/*":requestHandles.postAdd,
        "/api/postsend/*":requestHandles.postSend,
        "/api/postlist/*":requestHandles.postList,
        "/api/gettokeninfo/*":requestHandles.getTokenInfo,
        "/api/addaccount/*":requestHandles.addAccount,
        "/api/addaccountownedweibo/*":requestHandles.addAccountOwnedWeibo
    },
    "post":{
        "/api/test/*":requestHandles.test,
        "/api/weibouseradd/*":requestHandles.weiboUserAdd
    },
    "put":{
    },
    "del":{
    }
};

module.exports = routemap;