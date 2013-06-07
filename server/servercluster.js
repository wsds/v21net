
var serverSetting = require('./settings.js')

var weibopost = require('./apiserver/main.js');//8061
//console.log("apiserver is starting");

var weiboauth = require('./weiboauth/connect_with_oauth_middleware.js');//8088
//console.log("weiboauth is starting");

var imageupload = require('./imageupload/index.js');//8062
//console.log("imageupload is starting");

var publishing = require('./publishing/main.js');//8063
//console.log("publishing is starting");

var pushServer = require('./pushserver/main.js');//8063
//console.log("push server is starting");