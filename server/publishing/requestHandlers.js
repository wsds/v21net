/**
 * Date: 2013.04.15
 * requestHandles dispatch.
 */

var requestHandlers = {};

var globaldata = root.globaldata;

var publishing = require('./handlers/publishing');

requestHandlers.publishing = function (request, response, pathObject, getParam) {
    var operation = pathObject["operation"];
    if (operation == "start") {
        publishing.start(response);
    } else if (operation == "reload") {
        publishing.reload(response);
    }
    else if (operation == "check") {
        publishing.check(response);
    }
};


var settings = require('./settings');
requestHandlers.status = function (request, response, pathObject, getParam) {
    response.write(JSON.stringify({
        "提示信息": settings.serverName + "服务器运行正常。"
    }));
    response.end();
};

module.exports = requestHandlers;