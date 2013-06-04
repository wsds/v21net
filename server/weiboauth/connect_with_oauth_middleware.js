/*!
 * node-weibo - demo for using oauth_middleware in connect
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var connect = require('connect');
var weibo = require('weibo');
var fs = require('fs');

var tools = require('./lib/tools');
var ajax = require('./lib/ajax');
/**
 * init weibo api settings
 */
var serverSetting = root.globaldata.serverSetting;

weibo.init('weibo', serverSetting.appkey, serverSetting.secret, '');

weibo.init('github', '8e14edfda73a71f1f226', '1796ac639a8ada0dff6acfee2d63390440ca0f3b');
weibo.init('tqq', '801196838', '9f1a88caa8709de7dccbe3cae4bdc962');

/**
 * Create a web application.
 */

var app = connect(connect.query(), connect.cookieParser('oh year a cookie secret'), connect.session({ secret: "oh year a secret" }), // using weibo.oauth middleware for use login
    // will auto save user in req.session.oauthUser
    weibo.oauth({
        loginPath: '/login',
        logoutPath: '/logout',
        callbackPath: '/oauth/callback',
        blogtypeField: 'type',
        afterLogin: function (req, res, callback) {
            console.log(req.session.oauthUser && req.session.oauthUser.screen_name, 'login success');
            process.nextTick(callback);
        },
        beforeLogout: function (req, res, callback) {
            console.log(req.session.oauthUser && req.session.oauthUser.screen_name, 'loging out');
            process.nextTick(callback);
        }
    }));


app.use('/sendpost/', function (req, res, next) {
    var user = req.session.oauthUser;
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    if (!user) {
        res.end('please login!');
        return;
    }
    else {
        res.end('you have login!sendpost');
        var text = req.query["text"];
        var weibo_user = req.query["weibo_user"];
        var senduser = weibo_users[weibo_user];
        //var text = '这是 update(user, status, callback) ++!--% &amp; \\!@#$%^&*() + _ | / ? 的单元测试，当前时间 ' + new Date();
        weibo.update(senduser, text, function (err, status) {
            console.log(err);
            console.log(status);
        });
    }
});


app.use('/sendpostpic/', function (req, res, next) {
    var user = req.session.oauthUser;
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    if (!user) {
        res.end('please login!');
        return;
    }
    else {
        res.end('you have login!sendpostpic');
        var text = '这是 upload(user, status, pic, callback)  with latitude and longitude 的单元测试，当前时间 ' + new Date();
        var status = {
            status: text,
            long: '113.421234',
            lat: 22.354231
        };
        var picpath = "E:\\codespace\\photos\\image5.jpg";
        var pic = {
            data: fs.createReadStream(picpath),
            name: picpath
        };

        weibo.upload(user, status, pic, function (err, status) {
            console.log(err);
            console.log(status);
        });

    }
});


app.use('/sendpostpicurl/', function (req, res, next) {
    var user = req.session.oauthUser;
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    if (!user) {
        res.end('please login!');
        return;
    }
    else {
        res.end('you have login!sendpostpic');
        var text = '这是 upload(user, status, pic, callback)  with latitude and longitude 的单元测试，当前时间 ' + new Date();
        var status = {
            status: text,
            long: '113.421234',
            lat: 22.354231
        };
        var picpath = "E:\\codespace\\photos\\image5.jpg";
        var pic = {
            data: fs.createReadStream(picpath),
            name: picpath
        };

        weibo.upload(user, status, pic, function (err, status) {
            console.log(err);
            console.log(status);
        });

    }
});

var postList = [];


app.use('/addpost/', function (req, res, next) {
    var user = req.session.oauthUser;
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    if (!user) {
        res.end('please login!');
        return;
    }
    else {
        res.end('you have login!sendpost');
        var weibo_user = req.query["weibo_user"];
        var text = req.query["text"];

        publishTimeString = "";
        tools.addPost(weibo_user, text, publishTimeString, postList);

        var response = "";
        for (index in postList) {
            var post = postList[index];
            response += (JSON.stringify(post) + "is to published\n");
        }
        res.end(response);

        //        var text = '这是 update(user, status, callback) ++!--% &amp; \\!@#$%^&*() + _ | / ? 的单元测试，当前时间 ' + new Date();
        //        weibo.update(user, text, function (err, status) {
        //            console.log(err);
        //            console.log(status);
        //        });
    }
});


var weibo_users = {};

app.use('/', function (req, res, next) {
    var user = req.session.oauthUser;
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    if (!user) {
        res.end('Login with <a href="/login?type=weibo">Weibo</a> ');
        return;
    }
    else {
        weibo_users[user.screen_name] = user;
        var uid = req.url.replace("/oauth/", "");
        var response = "";
        //        for (weibo_user in weibo_users) {
        //            response += (weibo_user + "has logoed in!\n");
        //        }
        response += '授权管理微博账号已经添加成功，请刷新。<a href="javascript:self.close()">关闭窗口</a>';
        //        response += JSON.stringify(user);
        ajax.ajax({
            data: {"weibo": JSON.stringify(user), "uid":uid },
            success: function (data) {
                console.log("weibouseradd: " + data);
            },
            type: 'POST',
            url: "http://127.0.0.1:8071/api2/weibo/add"
        });

        res.end(response);
        //        res.end('Hello, <img src="' + user.profile_image_url + '" />\
        //    <a href="' + user.t_url +
        //            '" target="_blank">@' + user.screen_name + '</a>. ' +
        //            '<a href="/logout">Logout</a><hr/><pre><code>' + JSON.stringify(user, null, '  ') + '</code></pre>');
    }

});


app.listen(8088);
console.log('Server start on http://localhost.nodeweibo.com:8088/');



