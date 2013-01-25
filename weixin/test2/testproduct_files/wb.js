(function(){var B=(function(){var J={};var K=[];J.inc=function(M,L){return true};J.register=function(N,L){var P=N.split(".");var O=J;var M=null;while(M=P.shift()){if(P.length){if(O[M]===undefined){O[M]={}}O=O[M]}else{if(O[M]===undefined){try{O[M]=L(J)}catch(Q){}}}}};J.regShort=function(L,M){if(J[L]!==undefined){throw"["+L+"] : short : has been register"}J[L]=M};J.IE=/msie/i.test(navigator.userAgent);J.E=function(L){if(typeof L==="string"){return document.getElementById(L)}else{return L}};J.C=function(L){var M;L=L.toUpperCase();if(L=="TEXT"){M=document.createTextNode("")}else{if(L=="BUFFER"){M=document.createDocumentFragment()}else{M=document.createElement(L)}}return M};J.log=function(L){K.push("["+((new Date()).getTime()%100000)+"]: "+L)};J.getErrorLogInformationList=function(L){return K.splice(0,L||K.length)};return J})();$Import=B.inc;B.register("core.str.trim",function(J){return function(N){if(typeof N!=="string"){throw"trim need a string as parameter"}var K=N.length;var M=0;var L=/(\u3000|\s|\t|\u00A0)/;while(M<K){if(!L.test(N.charAt(M))){break}M+=1}while(K>M){if(!L.test(N.charAt(K-1))){break}K-=1}return N.slice(M,K)}});B.register("core.evt.addEvent",function(J){return function(K,N,M){var L=J.E(K);if(L==null){return false}N=N||"click";if((typeof M).toLowerCase()!="function"){return}if(L.attachEvent){L.attachEvent("on"+N,M)}else{if(L.addEventListener){L.addEventListener(N,M,false)}else{L["on"+N]=M}}return true}});B.register("core.obj.parseParam",function(J){return function(M,L,K){var N,O={};L=L||{};for(N in M){O[N]=M[N];if(L[N]!=null){if(K){if(M.hasOwnProperty[N]){O[N]=L[N]}}else{O[N]=L[N]}}}return O}});B.register("core.arr.isArray",function(J){return function(K){return Object.prototype.toString.call(K)==="[object Array]"}});B.register("core.json.queryToJson",function(J){return function(M,Q){var S=J.core.str.trim(M).split("&");var R={};var L=function(U){if(Q){return decodeURIComponent(U)}else{return U}};for(var O=0,P=S.length;O<P;O++){if(S[O]){var N=S[O].split("=");var K=N[0];var T=N[1];if(N.length<2){T=K;K="$nullName"}if(!R[K]){R[K]=L(T)}else{if(J.core.arr.isArray(R[K])!=true){R[K]=[R[K]]}R[K].push(L(T))}}}return R}});B.register("core.obj.isEmpty",function(J){return function(N,M){var L=true;for(var K in N){if(M){L=false;break}else{if(N.hasOwnProperty(K)){L=false;break}}}return L}});B.register("core.util.cookie",function(K){var J={set:function(O,R,Q){var L=[];var P,N;var M=K.core.obj.parseParam({expire:null,path:"/",domain:null,secure:null,encode:true},Q);if(M.encode==true){R=escape(R)}L.push(O+"="+R);if(M.path!=null){L.push("path="+M.path)}if(M.domain!=null){L.push("domain="+M.domain)}if(M.secure!=null){L.push(M.secure)}if(M.expire!=null){P=new Date();N=P.getTime()+M.expire*3600000;P.setTime(N);L.push("expires="+P.toGMTString())}document.cookie=L.join(";")},get:function(N){N=N.replace(/([\.\[\]\$])/g,"\\$1");var M=new RegExp(N+"=([^;]*)?;","i");var O=document.cookie+";";var L=O.match(M);if(L){return L[1]||""}else{return""}},remove:function(L,M){M=M||{};M.expire=-10;J.set(L,"",M)}};return J});B.register("core.str.parseURL",function(J){return function(M){var L=/^(?:([A-Za-z]+):(\/{0,3}))?([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;var Q=["url","scheme","slash","host","port","path","query","hash"];var O=L.exec(M);var P={};for(var N=0,K=Q.length;N<K;N+=1){P[Q[N]]=O[N]||""}return P}});B.register("core.json.jsonToQuery",function(J){var K=function(M,L){M=M==null?"":M;M=J.core.str.trim(M.toString());if(L){return encodeURIComponent(M)}else{return M}};return function(P,N){var Q=[];if(typeof P=="object"){for(var M in P){if(M==="$nullName"){Q=Q.concat(P[M]);continue}if(P[M] instanceof Array){for(var O=0,L=P[M].length;O<L;O++){Q.push(M+"="+K(P[M][O],N))}}else{if(typeof P[M]!="function"){Q.push(M+"="+K(P[M],N))}}}}if(Q.length){return Q.join("&")}else{return""}}});B.register("core.util.URL",function(J){return function(O,L){var N=J.core.obj.parseParam({isEncodeQuery:false,isEncodeHash:false},L||{});var M={};var Q=J.core.str.parseURL(O);var K=J.core.json.queryToJson(Q.query);var P=J.core.json.queryToJson(Q.hash);M.setParam=function(R,S){K[R]=S;return this};M.getParam=function(R){return K[R]};M.setParams=function(S){for(var R in S){M.setParam(R,S[R])}return this};M.setHash=function(R,S){P[R]=S;return this};M.getHash=function(R){return P[R]};M.valueOf=M.toString=function(){var R=[];var S=J.core.json.jsonToQuery(K,N.isEncodeQuery);var T=J.core.json.jsonToQuery(P,N.isEncodeQuery);if(Q.scheme!=""){R.push(Q.scheme+":");R.push(Q.slash)}if(Q.host!=""){R.push(Q.host);if(Q.port!=""){R.push(":");R.push(Q.port)}}R.push("/");R.push(Q.path);if(S!=""){R.push("?"+S)}if(T!=""){R.push("#"+T)}return R.join("")};return M}});B.register("core.util.browser",function(P){var J=navigator.userAgent.toLowerCase();var S=window.external||"";var L,M,N,T,O;var K=function(U){var V=0;return parseFloat(U.replace(/\./g,function(){return(V++==1)?"":"."}))};try{if((/windows|win32/i).test(J)){O="windows"}else{if((/macintosh/i).test(J)){O="macintosh"}else{if((/rhino/i).test(J)){O="rhino"}}}if((M=J.match(/applewebkit\/([^\s]*)/))&&M[1]){L="webkit";T=K(M[1])}else{if((M=J.match(/presto\/([\d.]*)/))&&M[1]){L="presto";T=K(M[1])}else{if(M=J.match(/msie\s([^;]*)/)){L="trident";T=1;if((M=J.match(/trident\/([\d.]*)/))&&M[1]){T=K(M[1])}}else{if(/gecko/.test(J)){L="gecko";T=1;if((M=J.match(/rv:([\d.]*)/))&&M[1]){T=K(M[1])}}}}}if(/world/.test(J)){N="world"}else{if(/360se/.test(J)){N="360"}else{if((/maxthon/.test(J))||typeof S.max_version=="number"){N="maxthon"}else{if(/tencenttraveler\s([\d.]*)/.test(J)){N="tt"}else{if(/se\s([\d.]*)/.test(J)){N="sogou"}}}}}}catch(R){}var Q={OS:O,CORE:L,Version:T,EXTRA:(N?N:false),IE:/msie/.test(J),OPERA:/opera/.test(J),MOZ:/gecko/.test(J)&&!/(compatible|webkit)/.test(J),IE5:/msie 5 /.test(J),IE55:/msie 5.5/.test(J),IE6:/msie 6/.test(J),IE7:/msie 7/.test(J),IE8:/msie 8/.test(J),IE9:/msie 9/.test(J),SAFARI:!/chrome\/([\d.]*)/.test(J)&&/\/([\d.]*) safari/.test(J),CHROME:/chrome\/([\d.]*)/.test(J),IPAD:/\(ipad/i.test(J),IPHONE:/\(iphone/i.test(J),ITOUCH:/\(itouch/i.test(J),MOBILE:/mobile/i.test(J)};return Q});B.register("core.dom.isNode",function(J){return function(K){return(K!=undefined)&&Boolean(K.nodeName)&&Boolean(K.nodeType)}});B.register("core.util.hideContainer",function(L){var M;var J=function(){if(M){return}M=L.C("div");M.style.cssText="position:absolute;top:-9999px;left:-9999px;";document.getElementsByTagName("head")[0].appendChild(M)};var K={appendChild:function(N){if(L.core.dom.isNode(N)){J();M.appendChild(N)}},removeChild:function(N){if(L.core.dom.isNode(N)){M&&M.removeChild(N)}}};return K});window.WB2=window.WB2||{};WB2.Module={loginButton:{versions:{"1.0":{js:"loginButton{ver}.js?version=20120327",css:"/t3/style/css/common/card.css?version=20120327"},latest:{js:"loginButton.js?version=20121120",css:"/t4/appstyle/widget/css/loginButton/loginButton.css"}}},followButton:{versions:{"1.0":{js:"followButton{ver}.js",css:"/t3/style/css/common/card.css?version=20120924"},latest:{js:"followButton.js?version=20121210",css:"/t4/appstyle/widget/css/followButton/followButtonSdk.css"}}},publish:{versions:{"1.0":{js:"publish{ver}.js?version=20120703",css:"/t3/style/css/thirdpart/rlsbox.css?version=20120327"},"1.1":{js:"publish{ver}.js?version=20120731",css:"/t35/appstyle/opent/css/widgets/js_weibo_send/js_weibo_send.css"},latest:{js:"publish.js?version=20121211",css:"/t4/appstyle/widget/css/weiboPublish/weiboPublish.css"}}},hoverCard:{versions:{"1.0":{js:"hoverCard{ver}.js?version=20120327",css:"/t3/style/css/common/card.css?version=20120327"},latest:{js:"hoverCard.js?version=20120820",css:"/t4/appstyle/widget/css/weiboCard/weiboCard.css"}}},recommend:{versions:{"1.0":{js:"recommend{ver}.js"},latest:{js:"recommend.js",css:"/t3/style/css/thirdpart/interested.css"}}},selector:{versions:{"1.0":{js:"selector{ver}.js?version=20120327",css:"/t3/style/css/thirdpart/csuser.css"},latest:{js:"selector.js?version=20120424",css:"/t4/appstyle/widget/css/selector/selector.css"}}},shareRecommend:{versions:{"1.0":{js:"shareRecommend{ver}.js?version=20121206"},latest:{js:"shareRecommend.js?version=20121206",css:"/t4/appstyle/widget/css/weiboFamous/weiboFamous.css"}}},like:{versions:{"1.0":{js:"like{ver}.js?version=20121206"},latest:{js:"like.js?version=20121207",css:"/t4/appstyle/widget/css/praiseButton/praiseButton.css"}}},iframeWidget:{versions:{"1.0":{js:"iframeWidget{ver}.js?version=20121203"},latest:{js:"iframeWidget.js?version=20121221"}}},invite:{versions:{"1.0":{js:"invite{ver}.js?version=20121225"},latest:{js:"invite.js?version=20121225",css:"http://img.t.sinajs.cn/t4/appstyle/V5_invite/css/module/frame/layer_frame.css"}}}};B.register("core.func.getType",function(J){return function(K){var L;return((L=typeof(K))=="object"?K==null&&"null"||Object.prototype.toString.call(K).slice(8,-1):L).toLowerCase()}});B.register("core.dom.ready",function(P){var L=[];var U=false;var T=P.core.func.getType;var Q=P.core.util.browser;var O=P.core.evt.addEvent;var R=function(){if(!U){if(document.readyState==="complete"){return true}}return U};var M=function(){if(U==true){return}U=true;for(var W=0,V=L.length;W<V;W++){if(T(L[W])==="function"){try{L[W].call()}catch(X){}}}L=[]};var J=function(){if(R()){M();return}try{document.documentElement.doScroll("left")}catch(V){setTimeout(arguments.callee,25);return}M()};var K=function(){if(R()){M();return}setTimeout(arguments.callee,25)};var N=function(){O(document,"DOMContentLoaded",M)};var S=function(){O(window,"load",M)};if(!R()){if(P.IE&&window===window.top){J()}N();K();S()}return function(V){if(R()){if(T(V)==="function"){V.call()}}else{L.push(V)}}});B.register("conf.api.wbml",function(J){window.WB2=window.WB2||{};return function(){var L=J.core.util.browser;var O=[{tagName:"login-button",widgetName:"loginButton"},{tagName:"publish",widgetName:"publish"},{tagName:"share-recommend",widgetName:"shareRecommend"},{tagName:"like",widgetName:"like"},{tagName:"follow-button",widgetName:"iframeWidget"},{tagName:"share-button",widgetName:"iframeWidget"},{tagName:"list",widgetName:"iframeWidget"},{tagName:"show",widgetName:"iframeWidget"},{tagName:"topic",widgetName:"iframeWidget"},{tagName:"comments",widgetName:"iframeWidget"},{tagName:"livestream",widgetName:"iframeWidget"},{tagName:"bulkfollow",widgetName:"iframeWidget"},{tagName:"hotlist",widgetName:"iframeWidget"},{tagName:"invite",widgetName:"invite"}];var N=function(P,U){U=U||"wb";var Q=navigator.userAgent.toLowerCase();var S=U+":"+P;if(L.IE){try{var T=document.namespaces;if(T&&T[U]){return document.getElementsByTagName(P).length==0?document.getElementsByTagName(S):document.getElementsByTagName(P)}}catch(R){}return document.getElementsByTagName(S)}else{if(L.MOZ){return document.getElementsByTagNameNS(document.body.namespaceURI,S)}else{return document.getElementsByTagName(S)}}};var M=function(T,S){var R=T.attributes;var P={};for(var Q=R.length-1;Q>=0;Q--){var U=R[Q];if(U.specified){P[R[Q].name]=R[Q].value}}P.dom=T;P.tagName=S;return P};var K=function(){var X=[];for(var S=0,W=O.length;S<W;S++){var P=O[S];var Q=P.tagName;var T=P.widgetName;var V=N(Q);for(var R=0,U=V.length;R<U;R++){V[R].innerHTML='<div style="background:url(http://timg.sjs.sinajs.cn/t4/appstyle/widget/images/library/base/loading1.gif) no-repeat;height:18px;padding-left:20px;">Loading...</div>';X.push({tag:Q,widget:T,params:M(V[R],Q)})}}var W=X.length;if(W>0){WB2.anyWhere(function(Z){for(var ab=0,Y=X.length;ab<Y;ab++){var aa=X[ab];(function(ac){setTimeout(function(){Z.widget[ac.widget](ac.params)},ab*50)})(aa)}})}};(function(){try{if(document.namespaces&&!document.namespaces.item.wb){document.namespaces.add("wb")}}catch(P){}}());WB2.initCustomTag=K;J.core.dom.ready(function(){K()})}});var f;var j=true;var A=[];var r=2;var a="https://api.weibo.com/"+r+"/oauth2/query";var g;var d="https://api.weibo.com/"+r+"/oauth2/authorize";var l={};var o=B.core.obj.parseParam,v=B.core.evt.addEvent,x=B.core.str.trim,C=B.core.util.browser,i=B.core.util.cookie,E=B.core.json.queryToJson;var I=function(N){var L={url:"",charset:"UTF-8",timeout:30*1000,args:{},onComplete:null,onTimeout:null,responseName:null,varkey:"callback"};var O=-1;L=o(L,N);var M=L.responseName||("STK_"+Math.floor(Math.random()*1000)+new Date().getTime().toString());L.args[L.varkey]=M;var J=L.onComplete;var K=L.onTimeout;window[M]=function(P){if(O!=2&&J!=null){O=1;J(P)}};L.onComplete=null;L.onTimeout=function(){if(O!=1&&K!=null){O=2;K()}};return h(L)};var h=function(O){var N,J;var K={url:"",charset:"UTF-8",timeout:30*1000,args:{},onComplete:null,onTimeout:null,uniqueID:null};K=o(K,O);if(K.url==""){throw"url is null"}N=document.createElement("script");N.charset="UTF-8";var P=/msie/i.test(navigator.userAgent);if(K.onComplete!=null){if(P){N.onreadystatechange=function(){if(N.readyState.toLowerCase()=="complete"||N.readyState.toLowerCase()=="loaded"){clearTimeout(J);K.onComplete();N.onreadystatechange=null}}}else{N.onload=function(){clearTimeout(J);K.onComplete();N.onload=null}}}var M=function(R){if(R){var Q=[];for(var S in R){Q.push(S+"="+encodeURIComponent(x(R[S])))}if(Q.length){return Q.join("&")}else{return""}}};var L=M(K.args);if(K.url.indexOf("?")==-1){if(L!=""){L="?"+L}}else{if(L!=""){L="&"+L}}N.src=K.url+L;document.getElementsByTagName("head")[0].appendChild(N);if(K.timeout>0&&K.onTimeout!=null){J=setTimeout(function(){K.onTimeout()},K.timeout)}return N};var D=function(){this.started=1;this.taskList=[];this.setStatue=function(J){this.started=J};this.start=function(){this.setStatue(0);var L,N,K,M;var J=this.taskList.shift();var N=J[0],K=J[1],M=J[2];N.apply(M,K)};this.next=function(){this.setStatue(1);if(this.taskList.length>0){this.start()}};this.add=function(L,K){var J={args:[],pointer:window,top:false};J=o(J,K);if(J.top){this.taskList.unshift([L,J.args,J.pointer])}else{this.taskList.push([L,J.args,J.pointer])}if(this.started){this.start()}}};var u=new D();function z(K){var J=WB2._config.version,M=WB2.anyWhere._instances,L=M[J];if(L){if(L.contentWindow._ready){L.contentWindow.request(K)}else{WB2.addToCallbacks(L.contentWindow,K)}}else{WB2.delayCall(K)}}function p(K){var J={requestType:"anywhere",callback:K};b(J)}function b(J){var L=J||{};var K=function(){z(L);u.next()};var M=function(N){if(l.bundle){N&&N()}else{h({url:WB2._config.host+"/open/api/js/api/bundle.js?version="+WB2._config.cdn_version,onComplete:function(){l.bundle=1;N&&N()}})}};u.add(M,{args:[K]})}function s(){var M=document.getElementsByTagName("script");var O=M.length,N=0,K,J,R,L,P;if(O>0){K=M[N++];while(K){if(K.src.indexOf("api/js/wb.js")!=-1){J=K.src.split("?").pop();break}K=M[N++]}}J=J.toLowerCase();var Q=E(J);R=Q.appkey||"";L=Q.secret||"";P=Q.version||1;return{appkey:R,secret:L,version:P}}function q(M,L){var K,J;if(M!=null){if(L==true){A.unshift(M)}else{A.push(M)}}if(WB2.checkLogin()){for(K=0,J=A.length;K<J;K++){A[K].call()}A=[]}}function H(K){var J=B.core.util.URL(d),L=600,M=455;J.setParam("client_id",K.appkey);J.setParam("response_type","token");J.setParam("display","js");J.setParam("transport","html5");J.setParam("referer",encodeURI(document.location.href));g=window.open(J,"oauth_login_window","width="+L+",height="+M+",toolbar=no,menubar=no,resizable=no,status=no,left="+(screen.width-L)/2+",top="+(screen.height-M)/2);if(g){g.focus()}return}function e(J){if((/\api.weibo\.com$/).test(J.origin)){var K=J.data;K=unescape(K);K=E(K);if(K.error_code){K.success=-1;K.status=-1}else{K.success=1;K.status=1}n(K)}}function n(J){c(J.status);if(J.success==1){m.save(J);q()}else{A.pop()}}function t(J){if(!j){return}q(J,true);if(!WB2.checkLogin()){if(window.postMessage&&!C.IE){H({appkey:WB2._config.appkey})}else{b({appkey:WB2._config.appkey,requestType:"login",callback:n})}}}function y(K){if(!WB2.checkLogin()){return}if(WB2._config.appkey!=null){m.del();c(-1);try{I({url:"https://api.weibo.com/2/account/end_session.json?source="+WB2._config.appkey,onComplete:function(L){K&&K(L.data)}})}catch(J){throw"JavaScript SDK: logout error"}}}function c(J){if(J==null){return}f=J}function G(){return f==1}var m={load:function(){if(!B.core.obj.isEmpty(WB2.oauthData)){return WB2.oauthData}else{var K=i.get("weibojs_"+WB2._config.appkey);K=unescape(K);var J=E(K);return J}},save:function(J){WB2.oauthData=J;var K="access_token="+(J.access_token||"")+"&refresh_token="+(J.refresh_token||"")+"&expires_in="+(J.expires_in||0)+"&uid="+(J.uid||"")+"&status="+(J.status||f||-1);i.set("weibojs_"+WB2._config.appkey,K,{path:"/",domain:document.domain})},del:function(){WB2.oauthData={};i.remove("weibojs_"+WB2._config.appkey,{path:"/",domain:document.domain})}};function k(K){var L=K||m.load();var M=L.access_token||"";var J=L.expires_in||"";if(M!=""){f=1}I({url:a,onComplete:function(N){N=N||{};if(N.status==1&&N.access_token){m.save(N)}if(N.error){j=false;return}f=N.status;q()},args:{source:WB2._config.appkey}})}var w=function(J){if(J.access_token){f=1;j=true;var K={status:f,access_token:J.access_token};m.save(K)}};window.WB2=window.WB2||{};WB2.widget={};var F=s();WB2._config={};WB2._config.version=F.version;WB2._config.appkey=F.appkey;WB2._config.secret=F.secret;WB2._config.host="http://js.t.sinajs.cn";WB2._config.cssHost="http://timg.sjs.sinajs.cn";WB2._config.cdn_version="20121225";WB2.oauthData={};WB2.init=w;WB2.login=t;WB2.logout=y;WB2.checkLogin=G;WB2.anyWhere=p;WB2.anyWhere._instances={};WB2.Cookie=m;WB2.regIframeRequest=b;WB2._config.appkey&&k();B.conf.api.wbml();if(window.postMessage&&!C.IE){B.core.evt.addEvent(window,"message",e)}})();