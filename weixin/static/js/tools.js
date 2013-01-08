$(document).ready(function () {

//        $("#btsend").click(function () {
//                var text = $("#sendtext").val();
//                window.alert(text);
//                opts.url += "__rnd=" + ("__rnd", +(new Date));
//                opts.args.text=text;
//                addweibo(opts);
//            }
//        );
//        $ = STK;
    }
);


var opts = {'url':'/aj/mblog/add?_wv=5&', 'method':'post', 'responseType':'json', 'timeout':'30000', 'onTraning':function () {
}, 'isEncode':true, 'onComplete':function (a) {
    window.alert("发布成功！");
}, 'onFail':function (a) {
    window.alert("发布失败。");
}, 'onTimeout':function (a) {
    window.alert("超时。");
}, 'args':{'text':'微博内容 ', 'pic_id':'', 'rank':'0', 'rankid':undefined, '_surl':'', 'hottopicid':undefined, 'location':'home', 'module':'stissue', '_t':'0'}};

function addweibo(oOpts) {
    var opts = STK.core.obj.parseParam({url:"", charset:"UTF-8", timeout:3e4, args:{}, onComplete:null, onTimeout:STK.core.func.empty, uniqueID:null, onFail:STK.core.func.empty, method:"get", asynchronous:!0, header:{}, isEncode:!1, responseType:"json"}, oOpts);
    if (opts.url == "")
        throw "ajax need url in parameters object";
    var tm, trans = STK.core.io.getXHR(), cback = function () {
        if (trans.readyState == 4) {
            clearTimeout(tm);
            var data = "";
            if (opts.responseType === "xml")
                data = trans.responseXML;
            else if (opts.responseType === "text")
                data = trans.responseText;
            else
                try {
                    trans.responseText && typeof trans.responseText == "string" ? data = eval("(" + trans.responseText + ")") : data = {}
                } catch (exp) {
                    data = opts.url + "return error : data error"
                }
            trans.status == 200 ? opts.onComplete != null && opts.onComplete(data) : trans.status != 0 && opts.onFail != null && opts.onFail(data, trans)
        } else
            opts.onTraning != null && opts.onTraning(trans)
    };
    trans.onreadystatechange = cback;
    opts.header["Content-Type"] || (opts.header["Content-Type"] = "application/x-www-form-urlencoded");
    opts.header["X-Requested-With"] || (opts.header["X-Requested-With"] = "XMLHttpRequest");
    if (opts.method.toLocaleLowerCase() == "get") {
        var url = STK.core.util.URL(opts.url, {isEncodeQuery:opts.isEncode});
        url.setParams(opts.args);
        url.setParam("__rnd", (new Date).valueOf());
        trans.open(opts.method, url.toString(), opts.asynchronous);
        try {
            for (var k in opts.header)
                trans.setRequestHeader(k, opts.header[k])
        } catch (exp) {
        }
        trans.send("")
    } else {
        trans.open(opts.method, opts.url, opts.asynchronous);
        try {
            for (var k in opts.header)
                trans.setRequestHeader(k, opts.header[k])
        } catch (exp) {
        }
        trans.send(STK.core.json.jsonToQuery(opts.args, opts.isEncode))
    }
    opts.timeout && (tm = setTimeout(function () {
        try {
            trans.abort();
            opts.onTimeout({}, trans);
            opts.onFail({}, trans)
        } catch (a) {
        }
    }, opts.timeout));
    return trans
}
