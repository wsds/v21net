$(document).ready(function () {
	
	//        $("#btsend").click(function () {
	//                var text = $("#sendtext").val();
	//                window.alert(text);
	//                opts.url = "/aj/mblog/add?_wv=5&__rnd=" + ("__rnd", +(new Date));
	//                opts.args.text=text;
	//                addweibo(opts);
	//            }
	//        );
	//        $ = STK;
});

function sendPost(post) {
	
	var opts = {
		'url' : '/aj/mblog/add?_wv=5&',
		'method' : 'post',
		'responseType' : 'json',
		'timeout' : '30000',
		'onTraning' : function () {},
		'isEncode' : true,
		'onComplete' : function (a) {
			
			//            window.alert("发布成功！");
			post.status = "published";
		},
		'onFail' : function (a) {
			//            window.alert("发布失败。");
			post.status = "failed";
		},
		'onTimeout' : function (a) {
			//            window.alert("超时。");
			post.status = "failed";
		},
		'args' : {
			'text' : '微博内容 ',
			'pic_id' : '',
			'rank' : '0',
			'rankid' : undefined,
			'_surl' : '',
			'hottopicid' : undefined,
			'location' : 'home',
			'module' : 'stissue',
			'_t' : '0'
		}
	};
	
	opts.url = "/aj/mblog/add?_wv=5&__rnd=" + ("__rnd",  + (new Date));
	opts.args.text = post.text;
    if(post.pid!="none"){
        opts.args.pic_id = post.pid;
    }
	addweibo(opts);
}

function addweibo(oOpts) {
	var opts = STK.core.obj.parseParam({
			url : "",
			charset : "UTF-8",
			timeout : 3e4,
			args : {},
			onComplete : null,
			onTimeout : STK.core.func.empty,
			uniqueID : null,
			onFail : STK.core.func.empty,
			method : "get",
			asynchronous : !0,
			header : {},
			isEncode : !1,
			responseType : "json"
		}, oOpts);
	if (opts.url == "")
		throw "ajax need url in parameters object";
	var tm,
	trans = STK.core.io.getXHR(),
	cback = function () {
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
		var url = STK.core.util.URL(opts.url, {
				isEncodeQuery : opts.isEncode
			});
		url.setParams(opts.args);
		url.setParam("__rnd", (new Date).valueOf());
		trans.open(opts.method, url.toString(), opts.asynchronous);
		try {
			for (var k in opts.header)
				trans.setRequestHeader(k, opts.header[k])
		} catch (exp) {}
		trans.send("")
	} else {
		trans.open(opts.method, opts.url, opts.asynchronous);
		try {
			for (var k in opts.header)
				trans.setRequestHeader(k, opts.header[k])
		} catch (exp) {}
		trans.send(STK.core.json.jsonToQuery(opts.args, opts.isEncode))
	}
	opts.timeout && (tm = setTimeout(function () {
				try {
					trans.abort();
					opts.onTimeout({}, trans);
					opts.onFail({}, trans)
				} catch (a) {}
			}, opts.timeout));
	return trans
}

var $CONFIG = {};
$CONFIG['islogin'] = '1';
$CONFIG['setCover'] = 1;//ie6hack
$CONFIG['oid'] = '2775127033';
$CONFIG['onick'] = '很破的一口钟';
$CONFIG['allowConnect'] = 'false';
$CONFIG['uid'] = '2775127033';
$CONFIG['nick'] = '很破的一口钟';
$CONFIG['domain'] = '2775127033';
$CONFIG['watermark'] = 'u/2775127033';
$CONFIG['sex'] = 'f';
$CONFIG['ogender'] = 'f';
$CONFIG['groupfeed'] = '0';
$CONFIG['version'] = 'f02c12be45502b9f';
$CONFIG['bigpipe'] = 'true';
$CONFIG['timeDiff'] = (new Date() - 1358233688000);
$CONFIG['product'] = 'v4mblog';
$CONFIG['pageid'] = 'content_home';
$CONFIG['skin'] = 'skin002';
$CONFIG['background'] = ""; 
$CONFIG['scheme'] = ""; 
$CONFIG['colors_type'] = "0";
$CONFIG['lang'] = 'zh-cn';
$CONFIG['jsPath'] = 'http://js.t.sinajs.cn/t5/';
$CONFIG['cssPath'] = 'http://img.t.sinajs.cn/t5/';
$CONFIG['imgPath'] = 'http://img.t.sinajs.cn/t5/';
$CONFIG['servertime'] = 1358233688;
$CONFIG['any'] = "&wvr=5";
$CONFIG['$webim'] = 1;
$CONFIG['location'] = 'home';
$CONFIG['miyou'] = 1;
$CONFIG['brand'] = 0;
$CONFIG['recfeed'] = 1;
$CONFIG['shorturl_offline'] = '';
$CONFIG['pid'] = '10001';

$CONFIG['bpType'] = 'main';
    $CONFIG['mJsPath'] = ['http://js{n}.t.sinajs.cn/t5/', 1, 2];
    $CONFIG['mCssPath'] = ['http://img{n}.t.sinajs.cn/t5/', 1, 2];
$CONFIG['group'] = "";
$CONFIG['request_ua'] = 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.5 Safari/537.22';
$CONFIG['enterprise']='';

function uploadPic(post) {
	var b = window.$CONFIG;
	var image = $("#input_image").val();
	var form=$("#form_image");
	var upload = STK.kit.extra.upload({
			type : "common",
			form : form[0],
			imgName : image
		});
	STK.custEvent.add(upload, "uploadSucc", function (STK, b) {
        if(post.pid=="none"){
            post.pid= b.pid;
        }
		//R.handleSucc(b)
//		alert("uploadSucc");
	});
	STK.custEvent.add(upload, "uploadError", function (STK, b) {
        if(post.pid=="none"){
            post.pid="failed";
        }
		//R.handleError(b)
//		alert("uploadError");
	})
	
}
