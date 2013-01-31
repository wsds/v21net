/**
 * Date: 12-3-25
 * 演示程序7
 * 说明: 使用客户端模板nTenjin输出动态轻博客内容，restful API Server提供模板和数据。
 *
 * 请求1：http://127.0.0.1:8080/api/feedlist/username
 * 响应1：["这是第一篇文章", "这是第二篇文章", "这是第3篇文章"]
 *
 * 请求2：http://127.0.0.1:8080/api/template
 * 响应2：{"模板名":{"string":"模板内容"},"模板夹名":{"模板名":{"string":"模板内容"},"模板名":{"string":"模板内容"}}}
 */
var http = require("http");
var route = require("./demo7lib/route");
var routemap = require("./demo7lib/routemap");


var template = require("./demo7lib/template.js");

var i = 1;
template.loadTemplate();

http.createServer(
    function (request, response) {

        response.writeHead(200, {
            "Content-Type":"application/json; charset=UTF-8"
        });

        queryobj = {};
        route(routemap, request.url, request, response, queryobj);

        i++;
        console.log("服务器访问被访问次数: i = " + i);
        response.end();

    }).listen(8080);

console.log("服务器开启");
