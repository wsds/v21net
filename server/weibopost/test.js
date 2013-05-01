/**
 * Date: 2013.01.30
 * 说明: requestHandles
 */




var test = function(){
    this.test2=function(request, response, pathObject, getParam){
        response.write(JSON.stringify({"a":"666", b:"888"}));
    }
};


test.test = function (request, response, pathObject, getParam) {
    response.write(JSON.stringify({"a":"666", b:"888"}));
};
module.exports = test;