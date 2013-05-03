
var serverSetting = require('./settings')

var weibopost = require('./weibopost/weibopost.js');//8061
console.log("weibopost is starting");

var weiboauth = require('./weiboauth/connect_with_oauth_middleware.js');//8088
console.log("weiboauth is starting");

var imageupload = require('./imageupload/index.js');//8062
console.log("imageupload is starting");

var post = require('./publishing/main.js');//8063
console.log("publishing is starting");