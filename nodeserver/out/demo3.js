/**
 * Date: 12-3-11
 * 演示程序3
 * 说明: 连接neo4j，并进行读写
 */
var http = require("http");
var neo4j = require("neo4j");
var i = 1;

http.createServer(
    function (request, response) {

        response.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});

        response.write("欢迎您第" + i + "次访问服务器！<br>Welcome!<br>");


        testNeo4js();
        i++;
        console.log("服务器访问被访问次数: i = " + i);
        response.end();

    }).listen(8081);


function testNeo4js2() {

    var graph = new neo4j.GraphDatabase("http://localhost:7474");
    var nodePromise = graph.node("http://localhost:7474");
    nodePromise.then(function (node) {
        // Do something with the node.
    });

}
function testNeo4js() {

    var neo4j = require('neo4j');
    var db = new neo4j.GraphDatabase('http://localhost:7474');

    var node = db.createNode({hello: '访问了:'+i});     // instantaneous, but...
    node.save(function (err, node) {    // ...this is what actually persists.
        if (err) {
            console.err('Error saving new node to database:', err);
        } else {
            console.log('Node saved to database with id:', node.id);
        }
    });

}
console.log("服务器开启");