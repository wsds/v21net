/**
 * Date: 2013.01.31
 * To change this template use File | Settings | File Templates.
 */


var weibo_post = {};

var weibo = require('weibo');
weibo.init('weibo', '2445517113', 'c50cd576bd3b7ba0228998831ff5f267', '');

var redis = require("redis");
var client = redis.createClient();

var ajax = require('./../lib/ajax');

var fs = require('fs');
var path = require('path');

//var redis = require("redis");
//var client = redis.createClient();

var globaldata = root.globaldata;


weibo_post.postText = function (weibo_user_name, text) {
    weibo_user = globaldata.weibo_users[weibo_user_name];
    if (weibo_user != null) {
        weibo.update(weibo_user, text, function (err, status) {
            console.log(err);
            console.log(status);
//        client.hset(["weibo_tools_postlist_success", post.id, JSON.stringify(post)], redis.print);
        });
    }
}

weibo_post.post = function (post, postlist) {
    weibo_user = globaldata.weibo_users[post.weibo_user];
    if (weibo_user != null) {
        if (post.pid == "none") {
            weibo.update(weibo_user, post.text, function (err, status) {
                console.log(err);
                console.log(status);
                post.status = "published";
                client.hset(["weibo_tools_postlist", post.id, JSON.stringify(post)], redis.print);
                postlist.initializePostlist();
//        client.hset(["weibo_tools_postlist_success", post.id, JSON.stringify(post)], redis.print);
            });
        }
        else {
            var picpath = "E://nginx//upload//"+post.pid+".png";
            var pic = {
                data:fs.createReadStream(picpath),
                name:picpath
            };
            weibo.upload(weibo_user, post.text, pic, function (err, status) {
                console.log(err);
                console.log(status);
                post.status = "published";
                client.hset(["weibo_tools_postlist", post.id, JSON.stringify(post)], redis.print);
                postlist.initializePostlist();
            });
        }
    }
}

weibo_post.getTokenInfo = function (weibo_user_name, response) {
    weibo_user = globaldata.weibo_users[weibo_user_name];
    if (weibo_user != null) {
        var access_token = weibo_user.access_token;
//        ajax.ajax( {
//            data: {"access_token":access_token},
//            success: function(data){
//                response.write(JSON.stringify(data));
//                console.log(data);
//            },
//            type: 'POST',
//            url: "https://api.weibo.com/oauth2/get_token_info"
//        });
        response.write(JSON.stringify({"提示信息":"微博账号已授权", "access_token":access_token }));
    } else {
        response.write(JSON.stringify({"提示信息":"微博账号未授权"}));
    }
}


module.exports = weibo_post;