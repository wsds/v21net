/**
 * Date: 2013.01.30
 * 说明: requestHandles
 */


var ajax = require('./lib/ajax');

var weiboInterface = function () {
};

weiboInterface.interface = function (request, response, pathObject, getParam) {
    response.asynchronous = 1;
    var data = getParam || {};
    data["access_token"] = "2.00nqyctCWOy8zD0a1efdd9ed86hq4E";
    data["url"] = data["url"] || "2/statuses/user_timeline.json";
    ajax.ajax({
        data: data,
        type: 'GET',
        url: "https://api.weibo.com/"+data["url"] ,
        success: function (data) {
            response.write(data);
            response.end();
        }
    });
};


module.exports = weiboInterface;