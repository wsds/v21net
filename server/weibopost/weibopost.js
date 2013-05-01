/**
 * Date: 2013.01.30
 * 微博定时发布服务
 * 说明: 微博定时发布服务。
 *
 * 请求1：http://offline.weibo.com/api/postsend?text=这是postsend的单元测试&weibo_user=很破滴一口钟&time=2013/01/28%2016:22:22&pic=23125215214
 * 响应1：["这是第一篇文章", "这是第二篇文章", "这是第3篇文章"]
 *
 * 请求2：http://127.0.0.1:8061/api/template
 * 响应2：{"模板名":{"string":"模板内容"},"模板夹名":{"模板名":{"string":"模板内容"},"模板名":{"string":"模板内容"}}}
 */
root.globaldata={};

var http = require("http");
var route = require("./lib/route");
var routemap = require("./routemap");



var i = 1;

http.createServer(
    function (request, response) {

        response.writeHead(200, {
            "Content-Type":"application/json; charset=UTF-8"
        });
        queryobj = {};
        route(routemap, request.url, request, response, queryobj);

        i++;
        console.log("服务器访问被访问次数: i = " + i);
        if(response.asynchronous==null){
            response.end();
        }

    }).listen(8061);

console.log("服务器开启");
