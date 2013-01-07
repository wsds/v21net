$(document).ready(function () {

        $("#btsend").click(function () {

                window.alert($("#sendtext").val());
                opts.url+="__rnd="+("__rnd", +(new Date));
                addweibo(opts);
            }
        );
//        $ = STK;
    }
);


function sendRequest(a) {
    var b = function (b, c, d) {
        c = c | 0 || 1;
        d = d || "fail";
        var e = b.args;
        e.__rnd && delete e.__rnd;
        (new Image).src = "http://weibolog.sinaapp.com/?t=" + c + "&u=" + encodeURIComponent(b.url) + "&p=" + encodeURIComponent(a.core.json.jsonToQuery(e)) + "&m=" + d
    };
    return function (c) {
        var d = {}, e = [], f = null, g = !1, h = a.parseParam({url:"", method:"get", responseType:"json", timeout:3e4, onTraning:a.funcEmpty, isEncode:!0}, c);
        h.onComplete = function (a) {
            g = !1;
            c.onComplete(a, h.args);
            setTimeout(i, 0)
        };
        h.onFail = function (a) {
            g = !1;
            if (typeof c.onFail == "function")
                try {
                    c.onFail(a, h.args)
                } catch (d) {
                }
            setTimeout(i, 0);
            try {
                b(h)
            } catch (d) {
            }
        };
        h.onTimeout = function (a) {
            try {
                b(h);
                c.onTimeout(a)
            } catch (d) {
            }
        };
        var i = function () {
            if (!!e.length) {
                if (g === !0)
                    return;
                g = !0;
                h.args = e.shift();
                if (h.method.toLowerCase() == "post") {
                    var b = a.core.util.URL(h.url);
                    b.setParam("__rnd", +(new Date));
                    h.url = b.toString()
                }
                f = a.ajax(h)
            }
        }, j = function (a) {
            while (e.length)
                e.shift();
            g = !1;
            if (f)
                try {
                    f.abort()
                } catch (b) {
                }
            f = null
        };
        d.request = function (a) {
            a || (a = {});
            c.noQueue && j();
            if (!c.uniqueRequest || !f) {
                e.push(a);
                a._t = 0;
                i()
            }
        };
        d.abort = j;
        return d
    }
}
var opts = {'url':'/aj/mblog/add?_wv=5&', 'method':'post', 'responseType':'json', 'timeout':'30000', 'onTraning':function () {
}, 'isEncode':true, 'onComplete':function (a) {
    g = !1;
    c.onComplete(a, h.args);
    setTimeout(i, 0)
}, 'onFail':function (a) {
    g = !1;
    if (typeof c.onFail == "function")try {
        c.onFail(a, h.args)
    } catch (d) {
    }
    setTimeout(i, 0);
    try {
        b(h)
    } catch (d) {
    }
}, 'onTimeout':function (a) {
    try {
        b(h);
        c.onTimeout(a)
    } catch (d) {
    }
}, 'args':{'text':'1、上课偷吃过零食 2、去电影院看电影必须来桶爆米花 ', 'pic_id':'', 'rank':'0', 'rankid':undefined, '_surl':'', 'hottopicid':undefined, 'location':'home', 'module':'stissue', '_t':'0'}};

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
