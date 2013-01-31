/**
 * Date: 2013.01.30
 * 说明: requestHandles
 */
var tools = require('./lib/tools');


var requestHandles = {
};
var feedlist = ["这是第一篇文章", "这是第二篇文章", "这是第3篇文章"];
requestHandles.feedlist = function (request, response, pathObject, queryobj) {
    response.write(JSON.stringify(feedlist));
};


var weibo = require('weibo');
weibo.init('weibo', '2445517113', 'c50cd576bd3b7ba0228998831ff5f267', '');


tools.initializePostlist();

requestHandles.postSend = function (request, response, pathObject, getParam) {
    response.write('you have login!sendpost');
    var text = getParam["text"];
    var weibo_user = getParam["weibo_user"];
    var time = getParam["time"];
    var pic = getParam["pic"];
    tools.addPost(weibo_user, text, time, postlist);
    response.write(JSON.stringify(postlist));
//    var senduser = weibo_users[weibo_user];
//    weibo.update(senduser, text, function (err, status) {
//        console.log(err);
//        console.log(status);
//    });
};


requestHandles.postAdd = function (request, response, pathObject, getParam) {
    var text = getParam["text"];
    var weibo_user = getParam["weibo_user"];
    var time = getParam["time"];
    var pic = getParam["pic"];
    tools.addPost(weibo_user, text, time, postlist);
    response.write(JSON.stringify(postlist));
};

module.exports = requestHandles;