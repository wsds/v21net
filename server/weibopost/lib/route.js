/**
 * Date: 12-3-25
 * 说明: 处理url路由
 */
function route(routemap, url, request, response, queryobj) {
    var pathObject = null;
    var err = true;
    if (url == '/favicon.ico') {
        return404();
        return;
    }
    //console.log("request for " + pathname);
    var handlemethod = null;
    if (request.method == "GET") {
        handlemethod = routemap.get;
    } else if (request.method == "PUT") {
        handlemethod = routemap.put;
    } else if (request.method == "POST") {
        handlemethod = routemap.post;
    } else if (request.method == "DELETE") {
        handlemethod = routemap.del;
    } else {
        return404();
        return;
    }

    for (var pathvalue in handlemethod) {
        //console.log("key="+pathvalue+",value="+handle.get[pathvalue]);
        pathObject = routepath(pathvalue, url);
        if (pathObject != null && typeof handlemethod[pathvalue] === 'function') {
            err = false;
            var getParam = parseUrl(url);
            getPostData(request, response, function (postData) {
                if (request.method == "GET") {
                    handlemethod[pathvalue](request, response, pathObject, getParam);
                } else if (request.method == "POST") {
                    handlemethod[pathvalue](request, response, pathObject, postData);
                }

            })

            break;
        }
    }

    if (err) {
        return404();
    }

    function return404() {
        console.log("No request handler found for " + url);
        response.writeHead(404, {"Content-Type":"text/plain; charset=UTF-8"});
        response.write("404 Not found, API地址木有找到。。。");
        response.end();
    }
}

var separator = /^[\s\/]+|[\s\/]+$/g;
/**
 * 判断路径是否匹配，并返回匹配参数
 * @param pathvalue
 * @param url
 * @param pathObject
 */
function routepath(pathvalue, url) {
    var pathObject = {};
    //console.log("pathvalue="+pathvalue+",pathname="+pathname);
    var pathvalueArray = decodeURI(pathvalue).split('?', 1)[0].replace(separator, '').split('/');
    var urlArray = decodeURI(url).split('?', 1)[0].replace(separator, '').split('/');

    if (urlArray.length == pathvalueArray.length) {
        //console.log("pathnameArray.length="+pathnameArray.length);
        for (var i = 0; i < pathvalueArray.length; i++) {
            if (pathvalueArray[i] == "*") {
                continue;
            } else if (pathvalueArray[i].substring(0, 1) == ":") {
                //console.log("key="+pathvalueArray[i].substring(1,pathvalueArray[i].length)+":value="+pathnameArray[i]);
                pathObject[pathvalueArray[i].substring(1, pathvalueArray[i].length)] = urlArray[i];
                continue;
            } else if (urlArray[i] == pathvalueArray[i]) {
                continue;
            } else {
                //若参数不匹配就返回null
                return null;
            }
        }
        return pathObject;
    }
    return null;
}
/**
 * 读取get参数
 * @param url
 */
function parseUrl(url) {
    var getParamStr = decodeURI(url).split('?', 2)[1];
    if (getParamStr != null) {
        var getParam = {};
        var getParamArray = getParamStr.replace(separator, '').split('&');
        for (var i = 0; i < getParamArray.length; i++) {
            if (getParamArray[i] != "") {
                getParamPeer = getParamArray[i].split('=', 2);
                getParam[getParamPeer[0]] = getParamPeer[1];
            }
        }
        return getParam;
    }
    return null;
}

var maxData = 2 * 1024 * 1024; //prevent mass post data
var querystring = require( 'querystring');

function getPostData(request, response, next) {
    if (request.method == "POST") {
        response.asynchronous = 1;
        var postData = '';
        request.on('data',function (chunk) {
//            console.log('data receiving');
            postData += chunk;
            if (postData.length > maxData) {
                pstData = '';
                this.pause;//stop further data
                response.writeHead(413);
                response.end('Request too large');
            }
        }).on('end', function () {
//                console.log('data received');
//                console.log(postData);
//                console.log('show data');
                if (!postData) {
                    response.end();
                    return;
                }//prevent empty post
                var postDataObject = querystring.parse(postData);
                next(postDataObject);

//                //print postData to console
//                console.log('User Posted: \n', postData);
//
//                //response with postDataObject
//                response.end('You Posted: \n' + util.inspect(postDataObject));
            });
    }
    else {
        next(null);
    }

}

module.exports = route;
