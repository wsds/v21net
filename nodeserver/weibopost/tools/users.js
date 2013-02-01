/**
 * Date: 2013.01.31
 * To change this template use File | Settings | File Templates.
 */


var users = {};
var redis = require("redis");
var client = redis.createClient();

var globaldata = root.globaldata;

users.initializeUsers = function () {
    globaldata.weibo_users = {};
    client.hgetall("weibo_users", function (err, usersStr) {
        for (userName in usersStr) {
            globaldata.weibo_users[userName] = JSON.parse(usersStr[userName]);
        }
        console.log("weibo_users initialized.")
    });
};

users.addUser = function (weibo_user, weibo_users) {
    client.hset(["weibo_users", weibo_user.name, JSON.stringify(weibo_user)], redis.print);
    weibo_users[weibo_user.name] = weibo_user;
}


module.exports = users;