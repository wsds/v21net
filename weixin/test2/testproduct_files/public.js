//document.write('<script src="http://dw.cbsi.com.cn/js/dw.js"></script>');
//document.write('<script type="text/javascript">DW.pageParams = {siteid: 1010};DW.clear(); window.onerror=function(){return true}</script>');
function include_js(file,callback) {
	var _doc = document.getElementsByTagName('head')[0];
	var js = document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	js.setAttribute('src', file);
	_doc.appendChild(js);

	if (!/*@cc_on!@*/0) { 
		js.onload = callback;
	} else {
		js.onreadystatechange = function () {
			if (js.readyState == 'loaded' || js.readyState == 'complete') {
			   callback();
			}
		}
	}

	return false;
}
include_js(" http://dw.cbsi.com.cn/js/dw.js",function (){
	DW.pageParams = {siteid: 1010};
	DW.clear();
	window.onerror=function(){
		return true;
	}
});

