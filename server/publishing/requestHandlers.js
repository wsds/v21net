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
    }
    else if (operation == "prestart") {
        publishing.preStart(response);
    }
    else if (operation == "check") {
        publishing.check(response);
    }
    else if (operation == "stop") {
        publishing.stop(response);
    }
    else if (operation == "timer") {
        publishing.timer(response);
    }
    else if (operation == "status") {
        publishing.status(response);
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