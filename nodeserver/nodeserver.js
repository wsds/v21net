/**
 * Date: 12-3-11
 * 演示程序3
 * 说明: 连接neo4j，并进行读写
 */
var http = require("http");
var neo4j = require("neo4j");
var $ = require("jquery");
var i = 1;

var Iconv = require('iconv').Iconv;
var gb2312_to_utf8_iconv = new Iconv('GBK', 'UTF8');

http.createServer(
    function (request, response) {

        response.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});

        response.write("欢迎您第" + i + "次访问服务器！<br>Welcome!<br>");


//        testNeo4js();
        testFetch();
        i++;
        console.log("服务器访问被访问次数: i = " + i);
        response.end();

    }).listen(8081);


function testNeo4js() {

    var neo4j = require('neo4j');
    var db = new neo4j.GraphDatabase('http://localhost:7474');

    var node = db.createNode({hello:'访问了:' + i});     // instantaneous, but...
    node.save(function (err, node) {    // ...this is what actually persists.
        if (err) {
            console.err('Error saving new node to database:', err);
        } else {
            console.log('Node saved to database with id:', node.id);
        }
    });

}


function testFetch() {
    var options = {
        host:'product.kimiss.com',
        port:80,
        path:'/index.php?c=Detail_ProductIntroduce&productid=12263'
    };

    var html = '';
    http.get(options, function (res) {
        res.on('data',function (data) {
            // collect the data chunks to the variable named "html"
            html += data;
        }).on('end', function () {
                // the whole of webpage data has been collected. parsing time!

//                var title = $(html).find('title').text();
                var utf8_buffer = gb2312_to_utf8_iconv.convert(html);
                var dom = $(utf8_buffer.toString());
//                var user_content=dom.find(".user_content");
//                var introduction=user_content.children().last().text();
//                console.log(introduction);
                var information = dom.find(".info1");
                information.children().remove();
                var information_text = information.text().trim();

//                console.log(utf8_buffer.toString());
                console.log(information_text);
            });
    });
}
console.log("服务器开启");