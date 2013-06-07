/**
 * Date: 2013.01.30
 * 说明: requestHandles
 */


var ajax = require('./lib/ajax');

var serverSetting = root.globaldata.serverSetting;
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);

var weiboInterface = function () {
};


function getWeiboUser(weiboName, next) {
    var query = [
        'MATCH weibo:Weibo',
        'WHERE weibo.name={name}',
        'RETURN weibo;'
    ].join('\n');

    var params = {
        name:weiboName
    };

    db.query(query, params, function (err, results) {
        if (err) {
            console.error(err);
            next(null);
            return;
        }
        var weiboNode = results.pop().weibo;
        var weibo = JSON.parse(weiboNode.data.JSON);
        next(weibo);
    });
}

weiboInterface.interface = function (request, response, pathObject, data) {
    response.asynchronous = 1;
    var data = data || {};
    var screen_name = data.screen_name;
    getWeiboUser(screen_name, function (weibo) {
        if (weibo != null) {
            data["access_token"] = weibo.access_token;
        }
        else {
            data["access_token"] = "2.00nqyctCWOy8zD0a1efdd9ed86hq4E";
        }
        data["url"] = data["url"] || "2/statuses/user_timeline.json";
        ajax.ajax({
            data:data,
            type:'GET',
            url:"https://api.weibo.com/" + data["url"],
            success:function (data) {
                response.write(data);
                response.end();
            }
        });
    })

};


module.exports = weiboInterface;