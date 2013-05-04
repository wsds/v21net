/**
 * Date: 2013.01.30
 * 说明: requestHandles
 */


var ajax = require('./lib/ajax');

var redis = require("redis");
var client = redis.createClient();

var weiboInterface = function () {
};


function getWeiboUser(weibo_user_name, next) {
    client.hget("weibo_users", weibo_user_name, function (err, userStr) {
        if (userStr != null) {
            var user = JSON.parse(userStr);
            next(user);
        }
        else {
            next(null);
        }
    });
}

weiboInterface.interface = function (request, response, pathObject, getParam) {
    response.asynchronous = 1;
    var data = getParam || {};
    var screen_name = data.screen_name;
    getWeiboUser(screen_name, function (user) {
        if (user != null) {
            data["access_token"] = user.access_token;
        }
        else{
            data["access_token"] = "2.00nqyctCWOy8zD0a1efdd9ed86hq4E";
        }
        data["url"] = data["url"] || "2/statuses/user_timeline.json";
        ajax.ajax({
            data: data,
            type: 'GET',
            url: "https://api.weibo.com/" + data["url"],
            success: function (data) {
                response.write(data);
                response.end();
            }
        });
    })

};


module.exports = weiboInterface;