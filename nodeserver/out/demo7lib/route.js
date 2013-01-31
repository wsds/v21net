/**
 * Date: 12-3-25
 * 说明: 处理url路由
 */
function route(routemap, pathname, request, response, queryobj) {
    var pathObject = null;
    var err = true;
    if (pathname == '/favicon.ico') {
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

    for (var k in handlemethod) {
        //console.log("key="+k+",value="+handle.get[k]);
        pathObject = routepath(k, pathname);
        if (pathObject != null && typeof routemap.get[k] === 'function') {
            err = false;
            routemap.get[k](request, response, pathObject, queryobj);
            break;
        }
    }

    if (err) {
        return404();
    }

    function return404() {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type":"text/plain; charset=UTF-8"});
        response.write("404 Not found, API地址木有找到。。。");
        response.end();
    }
}
/**
 * 判断路径是否匹配，并返回匹配参数
 * @param pathvalue
 * @param pathname
 * @param pathObject
 */
function routepath(pathvalue, pathname) {
    var pathObject = {};
    //console.log("pathvalue="+pathvalue+",pathname="+pathname);
    var pathvalueArray = pathvalue.split("/");
    var pathnameArray = pathname.split("/");
    if (pathnameArray.length == pathvalueArray.length) {
        //console.log("pathnameArray.length="+pathnameArray.length);
        for (var i = 0; i < pathvalueArray.length; i++) {
            if (pathvalueArray[i].substring(0, 1) == ":") {
                //console.log("key="+pathvalueArray[i].substring(1,pathvalueArray[i].length)+":value="+pathnameArray[i]);
                pathObject[pathvalueArray[i].substring(1, pathvalueArray[i].length)] = pathnameArray[i];
                continue;
            } else if (pathnameArray[i] == pathvalueArray[i]) {
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
module.exports = route;
