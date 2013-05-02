/**
 * Date: 12-3-25
 * 说明: restful API web请求url路由表
 *
 *http://127.0.0.1:8061/api2/post/add?text=abcc&weibo_user=u1&time=2013/01/28%2016:22:22&pic=23125215214
 * http://127.0.0.1:8061/api2/post/del?postid=abcc&weibo_user=u1
 *http://127.0.0.1:8061/api2/postsend/a?text=abcc&weibo_user=u1&time=2013/01/28%2016:22:22&pic=23125215214
 *http://127.0.0.1:8061/api2/gettokeninfo/a?weibo_user=很破滴一口钟
 *http://127.0.0.1:8061/api2/addaccount/a?account=u1Z&password=123456&invite=slzd2013
 *http://127.0.0.1:8061/api2/accountownedweibo/add?account=u1Z&ownedWeibo=很破滴一口钟
 *http://127.0.0.1:8061/api2/accountownedweibo/del?account=u1Z&ownedWeibo=很破滴一口钟
 *http://127.0.0.1:8061/api2/accountownedweibo/getall?account=u1Z
 *http://127.0.0.1:8061/api2/getpostlist/a?weibo_user=很破滴一口钟&start=0&end=10
 *http://127.0.0.1:8061/api2/authaccount/a?account=u1Z&password=123456
 *
 *
 *
 */
var requestHandles = require("./requestHandles");
var test =new require("./test");
var test1=new test();


var routemap = {
    "get": {
        "/api2/post/:operation": requestHandles.post,
        "/api2/postsend/*": requestHandles.postSend,
        "/api2/postlist/*": requestHandles.postList,
        "/api2/gettokeninfo/*": requestHandles.getTokenInfo,
        "/api2/addaccount/*": requestHandles.addAccount,
        "/api2/accountownedweibo/:operation": requestHandles.accountOwnedWeibo,
        "/api2/getpostlist/*": requestHandles.getPostlist,
        "/api2/authaccount/*": requestHandles.authAccount,
        "/api2/test/*": test1.test2,
        "/api2/server/:operation": requestHandles.server
    },
    "post": {
        "/api2/test/*": requestHandles.test,
        "/api2/post/:operation": requestHandles.post,
        "/api2/weibouseradd/*": requestHandles.weiboUserAdd,
        "/api2/accountownedweibo/:operation": requestHandles.accountOwnedWeiboPost
    },
    "put": {
    },
    "del": {
    }
};

module.exports = routemap;