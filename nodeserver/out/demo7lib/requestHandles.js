/**
 * Date: 12-3-25
 * 说明: requestHandles
 */

var requestHandles = {
};
var feedlist = ["这是第一篇文章", "这是第二篇文章", "这是第3篇文章"];
requestHandles.feedlist = function (request, response, pathObject, queryobj) {
    response.write(JSON.stringify(feedlist));
};

var template = require("./template.js");

requestHandles.template = function (request, response, pathObject, queryobj) {
    response.write(JSON.stringify(template.html));
};

module.exports = requestHandles;
