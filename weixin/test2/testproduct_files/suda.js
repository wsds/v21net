(function(){var ag=window,l=document,A=navigator,af=A.userAgent,p=ag.screen,s;try{s=ag.location.href}catch(at){s=document.URL}var ae=s.indexOf("https")>-1?"https://":"http://",v="beacon.sina.com.cn";var q=ae+v+"/a.gif?",Q=ae+v+"/g.gif?",z=ae+v+"/d.gif?",f=ae+v+"/e.gif?";var c=0;var U=l.referrer.toLowerCase();var E="SINAGLOBAL",b="Apache",ak="ULV",n="SUP",an="UOR",aa="_s_acc",S="_s_tentry";var al=0;var y=false;var ai=false,j=false;var ah="";var Z=16777215,I=0,W,d=0;var aj="",H="",G="";var k=[],K=[],ab=[];var av=0;var Y=(function(){var i=window.localStorage,D,aw;if(i){return{get:function(e){return unescape(i.getItem(e))},set:function(e,ay){i.setItem(e,escape(ay))}}}else{if(window.ActiveXObject){D=document.documentElement;aw="localstorage";try{D.addBehavior("#default#userdata");D.save("localstorage")}catch(ax){}return{set:function(ay,az){try{D.setAttribute(ay,az);D.save(aw)}catch(aA){}},get:function(ay){try{D.load(aw);return D.getAttribute(ay)}catch(az){}}}}else{return{get:h,set:t}}}})();function X(aw,i){var D=l.getElementsByName(aw);var e=(i>0)?i:0;return(D.length>e)?D[e].content:""}function ap(az,D,ax,aw){if(az==""){return""}aw=(aw=="")?"=":aw;D+=aw;var ay=az.indexOf(D);if(ay<0){return""}ay+=D.length;var i=az.indexOf(ax,ay);if(i<ay){i=az.length}return az.substring(ay,i)}function h(e){if(undefined==e||""==e){return""}return ap(l.cookie,e,";","")}function t(ax,e,i,aw){if(e!=null){if((undefined==aw)||(null==aw)){aw="weibo.com"}if((undefined==i)||(null==i)||(""==i)){l.cookie=ax+"="+e+";domain="+aw+";path=/"}else{var D=new Date();var ay=D.getTime();ay=ay+86400000*i;D.setTime(ay);ay=D.getTime();l.cookie=ax+"="+e+";domain="+aw+";expires="+D.toUTCString()+";path=/"}}}function r(e,aw,D){var i=e;if(i==null){return false}aw=aw||"click";if((typeof D).toLowerCase()!="function"){return}if(i.attachEvent){i.attachEvent("on"+aw,D)}else{if(i.addEventListener){i.addEventListener(aw,D,false)}else{i["on"+aw]=D}}return true}function ar(){if(window.event!=null){return window.event}else{if(window.event){return window.event}var D=arguments.callee.caller;var i;var aw=0;while(D!=null&&aw<40){i=D.arguments[0];if(i&&(i.constructor==Event||i.constructor==MouseEvent||i.constructor==KeyboardEvent)){return i}aw++;D=D.caller}return i}}function aq(i){i=i||ar();if(!i.target){i.target=i.srcElement;i.pageX=i.x;i.pageY=i.y}if(typeof i.layerX=="undefined"){i.layerX=i.offsetX}if(typeof i.layerY=="undefined"){i.layerY=i.offsetY}return i}function a(aw){if(typeof aw!=="string"){throw"trim need a string as parameter"}var e=aw.length;var D=0;var i=/(\u3000|\s|\t|\u00A0)/;while(D<e){if(!i.test(aw.charAt(D))){break}D+=1}while(e>D){if(!i.test(aw.charAt(e-1))){break}e-=1}return aw.slice(D,e)}function N(e){return Object.prototype.toString.call(e)==="[object Array]"}function R(aw,aA){var aC=a(aw).split("&");var aB={};var D=function(i){if(aA){return decodeURIComponent(i)}else{return i}};for(var ay=0,az=aC.length;ay<az;ay++){if(aC[ay]){var ax=aC[ay].split("=");var e=ax[0];var aD=ax[1];if(ax.length<2){aD=e;e="$nullName"}if(!aB[e]){aB[e]=D(aD)}else{if(N(aB[e])!=true){aB[e]=[aB[e]]}aB[e].push(D(aD))}}}return aB}function m(D,ax){for(var aw=0,e=D.length;aw<e;aw++){ax(D[aw],aw)}}function T(i){var e=new RegExp("^http(?:s)?://([^/]+)","im");if(i.match(e)){return i.match(e)[1].toString()}else{return""}}var x={screenSize:function(){return(Z&8388608==8388608)?p.width+"x"+p.height:""},colorDepth:function(){return(Z&4194304==4194304)?p.colorDepth:""},appCode:function(){return(Z&2097152==2097152)?A.appCodeName:""},appName:function(){return(Z&1048576==1048576)?((A.appName.indexOf("Microsoft Internet Explorer")>-1)?"MSIE":A.appName):""},cpu:function(){return(Z&524288==524288)?(A.cpuClass||A.oscpu):""},platform:function(){return(Z&262144==262144)?(A.platform):""},jsVer:function(){if(Z&131072!=131072){return""}var ax,e,az,D=1,aw=0,i=(A.appName.indexOf("Microsoft Internet Explorer")>-1)?"MSIE":A.appName,ay=A.appVersion;if("MSIE"==i){e="MSIE";ax=ay.indexOf(e);if(ax>=0){az=window.parseInt(ay.substring(ax+5));if(3<=az){D=1.1;if(4<=az){D=1.3}}}}else{if(("Netscape"==i)||("Opera"==i)||("Mozilla"==i)){D=1.3;e="Netscape6";ax=ay.indexOf(e);if(ax>=0){D=1.5}}}return D},network:function(){if(Z&65536!=65536){return""}var i="";i=(A.connection&&A.connection.type)?A.connection.type:i;try{l.body.addBehavior("#default#clientCaps");i=l.body.connectionType}catch(D){i="unkown"}return i},language:function(){return(Z&32768==32768)?(A.systemLanguage||A.language):""},timezone:function(){return(Z&16384==16384)?(new Date().getTimezoneOffset()/60):""},flashVer:function(){if(Z&8192!=8192){return""}var az=A.plugins,aw,aA,aC;if(az&&az.length){for(var ay in az){aA=az[ay];if(aA.description==null){continue}if(aw!=null){break}aC=aA.description.toLowerCase();if(aC.indexOf("flash")!=-1){aw=aA.version?parseInt(aA.version):aC.match(/\d+/);continue}}}else{if(window.ActiveXObject){for(var ax=10;ax>=2;ax--){try{var D=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+ax);if(D){aw=ax;break}}catch(aB){}}}else{if(af.indexOf("webtv/2.5")!=-1){aw=3}else{if(af.indexOf("webtv")!=-1){aw=2}}}}return aw},javaEnabled:function(){if(Z&4096!=4096){return""}var D=A.plugins,i=A.javaEnabled(),aw,ax;if(i==true){return 1}if(D&&D.length){for(var e in D){aw=D[e];if(aw.description==null){continue}if(i!=null){break}ax=aw.description.toLowerCase();if(ax.indexOf("java plug-in")!=-1){i=parseInt(aw.version);continue}}}else{if(window.ActiveXObject){i=(new ActiveXObject("JavaWebStart.IsInstalled")!=null)}}return i?1:0}};var g={pageId:function(i){var D=i||aj,az="-9999-0-0-1";if((undefined==D)||(""==D)){try{var aw=X("publishid");if(""!=aw){var ay=aw.split(",");if(ay.length>0){if(ay.length>=3){az="-9999-0-"+ay[1]+"-"+ay[2]}D=ay[0]}}else{D="0"}}catch(ax){D="0"}D=D+az}return D},sessionCount:function(){var e=h("_s_upa");if(e==""){e=0}return e},excuteCount:function(){return c},referrer:function(){if(Z&2048!=2048){return""}var e=/^[^\?&#]*.swf([\?#])?/;if((U=="")||(U.match(e))){var i=ap(s,"ref","&","");if(i!=""){return escape(i)}}return escape(U)},isHomepage:function(){if(Z&1024!=1024){return""}var D="";try{l.body.addBehavior("#default#homePage");D=l.body.isHomePage(s)?"Y":"N"}catch(i){D="unkown"}return D},PGLS:function(){return(Z&512==512)?X("stencil"):""},ZT:function(){if(Z&256!=256){return""}var e=X("subjectid");e.replace(",",".");e.replace(";",",");return escape(e)},mediaType:function(){return(Z&128==128)?X("mediaid"):""},domCount:function(){return(Z&64==64)?l.getElementsByTagName("*").length:""},iframeCount:function(){return(Z&32==32)?l.getElementsByTagName("iframe").length:""},onloadTime:function(){var e;if(typeof __GLOBAL_STATS_PAGESTART_TIME__!="undefined"&&typeof __GLOBAL_STATS_PAGEONLOAD_TIME__!="undefined"){e=__GLOBAL_STATS_PAGEONLOAD_TIME__-__GLOBAL_STATS_PAGESTART_TIME__}return(Z&16==16)?e||"":""},domReadyTime:function(){var e;if(typeof __GLOBAL_STATS_PAGESTART_TIME__!="undefined"&&typeof __GLOBAL_STATS_DOMREADY_TIME__!="undefined"){e=__GLOBAL_STATS_DOMREADY_TIME__-__GLOBAL_STATS_PAGESTART_TIME__}return(Z&8==8)?e||"":""},bigpipe:function(){return(typeof $CONFIG!="undefined"&&typeof $CONFIG.bigpipe!="undefined"&&$CONFIG.bigpipe=="true")?1:0},getRealURL:function(){var e="";if(typeof STK!="undefined"&&typeof STK.historyM!="undefined"&&typeof STK.historyM.parseURL!="undefined"){e=escape(STK.historyM.parseURL().url)}return e}};var P={visitorId:function(){if(""!=E){var e=h(E);if(""==e){e=h(b);t(E,e)}return e}else{return""}},sessionId:function(){var e=h(b);if(""==e){var i=new Date();e=Math.random()*10000000000000+"."+i.getTime();t(b,e)}return e},lastVisit:function(){var D=h(b);var ax=h(ak);var aw=ax.split(":");var ay="",i;if(aw.length>=6){if(D!=aw[4]){i=new Date();var e=new Date(window.parseInt(aw[0]));aw[1]=window.parseInt(aw[1])+1;if(i.getMonth()!=e.getMonth()){aw[2]=1}else{aw[2]=window.parseInt(aw[2])+1}if(((i.getTime()-e.getTime())/86400000)>=7){aw[3]=1}else{if(i.getDay()<e.getDay()){aw[3]=1}else{aw[3]=window.parseInt(aw[3])+1}}ay=aw[0]+":"+aw[1]+":"+aw[2]+":"+aw[3];aw[5]=aw[0];aw[0]=i.getTime();t(ak,aw[0]+":"+aw[1]+":"+aw[2]+":"+aw[3]+":"+D+":"+aw[5],360)}else{ay=aw[5]+":"+aw[1]+":"+aw[2]+":"+aw[3]}}else{i=new Date();ay=":1:1:1";t(ak,i.getTime()+ay+":"+D+":",360)}return ay},userNick:function(){if(ah!=""){return ah}var D=unescape(h(n));if(D!=""){var i=ap(D,"ag","&","");var e=ap(D,"user","&","");var aw=ap(D,"uid","&","");var ay=ap(D,"sex","&","");var ax=ap(D,"dob","&","");ah=i+":"+e+":"+aw+":"+ay+":"+ax;return ah}else{return""}},userOrigin:function(){if(Z&4!=4){return""}var e=h(an);var i=e.split(":");if(i.length>=2){return i[0]}else{return""}},advCount:function(){return(Z&2==2)?h(aa):""},setUOR:function(){var aA=h(an),aE="",i="",aD="",ax="",aB=s.toLowerCase(),D=l.referrer.toLowerCase();var aF=/[&|?]c=spr(_[A-Za-z0-9]{1,}){3,}/;var az=new Date();if(aB.match(aF)){aD=aB.match(aF)[0]}else{if(D.match(aF)){aD=D.match(aF)[0]}}if(aD!=""){aD=aD.substr(3)+":"+az.getTime()}if(aA==""){if(h(ak)==""){aE=T(D);i=T(aB)}t(an,aE+","+i+","+aD,365)}else{var ay=0,aC=aA.split(",");if(aC.length>=1){aE=aC[0]}if(aC.length>=2){i=aC[1]}if(aC.length>=3){ax=aC[2]}if(aD!=""){ay=1}else{var aw=ax.split(":");if(aw.length>=2){var e=new Date(window.parseInt(aw[1]));if(e.getTime()<(az.getTime()-86400000*30)){ay=1}}}if(ay){t(an,aE+","+i+","+aD,365)}}},setAEC:function(e){if(""==e){return}var i=h(aa);if(i.indexOf(e+",")<0){i=i+e+","}t(aa,i,7)}};var au={picList:[{url:"http://ww1.sinaimg.cn/large/53d96fe3tw1diw52tyd28j.jpg",size:23243},{url:"http://ww2.sinaimg.cn/large/53d96fe3tw1diw52tyd28j.jpg",size:23243},{url:"http://ww3.sinaimg.cn/large/53d96fe3tw1diw52tyd28j.jpg",size:23243},{url:"http://ww4.sinaimg.cn/large/53d96fe3tw1diw52tyd28j.jpg",size:23243}],picOk:false,picData:[],picture:function(){if((I&8)!=8){au.picOk=true;return""}var aw=new Date().getTime();var ay=[],D;for(var ax=0,e=au.picList.length;ax<e;ax++){D=new Image();SUDA.img=D;D.src=au.picList[ax].url+"?"+Math.random();D.onload=(function(i){return function(){var az=new Date().getTime();au.picData[i]=Math.floor((au.picList[i].size/1024)/((az-aw)/1000));if(/^(\d+,){3}\d+$/.test(au.picData.join(","))){au.picOk=true;J()}}})(ax);ay.push(D)}},porList:[{url:"http://tp1.sinaimg.cn/1772026304/50/5603504743/1",size:3488},{url:"http://tp2.sinaimg.cn/1780417033/50/1280367872/0",size:4021},{url:"http://tp3.sinaimg.cn/1075913170/50/5601477177/1",size:3456},{url:"http://tp4.sinaimg.cn/1245851035/50/1279876078/1",size:2519}],porOk:false,porData:[],portait:function(){if((I&4)!=4){au.porOk=true;return""}var aw=new Date().getTime();var ay=[],D;for(var ax=0,e=au.porList.length;ax<e;ax++){D=new Image();SUDA.img=D;D.src=au.porList[ax].url+"?"+Math.random();D.onload=(function(i){return function(){var az=new Date().getTime();au.porData[i]=Math.floor((au.porList[i].size/1024)/((az-aw)/1000));if(/^(\d+,){3}\d+$/.test(au.porData.join(","))){au.porOk=true;J()}}})(ax);ay.push(D)}},jsList:[{url:"http://js.t.sinajs.cn/t4/home/static/suda/feed.png",size:21287}],jsOk:false,jsData:[],jsSpeed:function(){if((I&2)!=2){au.jsOk=true;return""}var aw=new Date().getTime();var ay=[],D;for(var ax=0,e=au.jsList.length;ax<e;ax++){D=new Image();SUDA.img=D;D.src=au.jsList[ax].url+"?"+Math.random();D.onload=(function(i){return function(){var az=new Date().getTime();au.jsData[i]=Math.floor((au.jsList[i].size/1024)/((az-aw)/1000));if(/^\d+$/.test(au.jsData.join(","))){au.jsOk=true;J()}}})(ax);ay.push(D)}},cssList:[{url:"http://img.t.sinajs.cn/t4/style/images/mobile/android/cp_3.jpg",size:24472}],cssOk:false,cssData:[],cssSpeed:function(){if((I&1)!=1){au.cssOk=true;return""}var aw=new Date().getTime();var ay=[],D;for(var ax=0,e=au.cssList.length;ax<e;ax++){D=new Image();SUDA.img=D;D.src=au.cssList[ax].url+"?"+Math.random();D.onload=(function(i){return function(){var az=new Date().getTime();au.cssData[i]=Math.floor((au.cssList[i].size/1024)/((az-aw)/1000));if(/^\d+$/.test(au.cssData.join(","))){au.cssOk=true;J()}}})(ax);ay.push(D)}}};var u={CI:function(){var e=["sz:"+x.screenSize(),"dp:"+x.colorDepth(),"ac:"+x.appCode(),"an:"+x.appName(),"cpu:"+x.cpu(),"pf:"+x.platform(),"jv:"+x.jsVer(),"ct:"+x.network(),"lg:"+x.language(),"tz:"+x.timezone(),"fv:"+x.flashVer(),"ja:"+x.javaEnabled()];return"CI="+e.join("|")},PI:function(e){var i=["pid:"+g.pageId(e),"st:"+g.sessionCount(),"et:"+g.excuteCount(),"ref:"+g.referrer(),"hp:"+g.isHomepage(),"PGLS:"+g.PGLS(),"ZT:"+g.ZT(),"MT:"+g.mediaType(),"keys:","dom:"+g.domCount(),"ifr:"+g.iframeCount(),"nld:"+g.onloadTime(),"drd:"+g.domReadyTime(),"bp:"+g.bigpipe(),"url:"+g.getRealURL()];return"PI="+i.join("|")},UI:function(){var e=["vid:"+P.visitorId(),"sid:"+P.sessionId(),"lv:"+P.lastVisit(),"un:"+P.userNick(),"uo:"+P.userOrigin(),"ae:"+P.advCount()];return"UI="+e.join("|")},EX:function(i,e){if(Z&1!=1){return""}i=(null!=i)?i||"":H;e=(null!=e)?e||"":G;return"EX=ex1:"+i+"|ex2:"+e},EXT:function(i,e){if(Z&1!=1){return""}i=(null!=i)?i||"":H;e=(null!=e)?e||"":G;return i+":"+e},P_PI:function(){var e=["pic:"+au.picture(),"por:"+au.portait(),"js:"+au.jsSpeed(),"css:"+au.cssSpeed(),"ref:"+g.referrer()];return"PI="+e.join("|")},P_UI:function(){var e=["vid:"+P.visitorId(),"sid:"+P.sessionId(),"un:"+P.userNick()];return"UI="+e.join("|")},V:function(){return"V=2"},R:function(){return"gUid_"+new Date().getTime()}};function M(){var az="-",aw=l.referrer.toLowerCase(),D=s.toLowerCase();if(""==h(S)){if(""!=aw){az=T(aw)}t(S,az,"","weibo.com")}var ax=/weibo.com\/(reg\.php|signup\/(signup|mobile|full_info)\.php)/;if(D.match(ax)){var ay=ap(unescape(D),"sharehost","&","");var i=ap(unescape(D),"appkey","&","");if(""!=ay){t(S,ay,"","weibo.com")}t("appkey",i,"","weibo.com")}}function ad(e,i){C(e,i)}function C(i,D){D=D||{};var e=new Image(),aw;if(D&&D.callback&&typeof D.callback=="function"){e.onload=function(){clearTimeout(aw);aw=null;D.callback(true)}}SUDA.img=e;e.src=i;aw=setTimeout(function(){if(D&&D.callback&&typeof D.callback=="function"){D.callback(false);e.onload=null}},D.timeout||2000)}function ac(){if(ai||j){return}if(av<3&&typeof __GLOBAL_STATS_PAGESTART_TIME__!="undefined"){av++;if(typeof __GLOBAL_STATS_PAGESTART_TIME__=="undefined"||typeof __GLOBAL_STATS_DOMREADY_TIME__=="undefined"||typeof __GLOBAL_STATS_PAGEONLOAD_TIME__=="undefined"){setTimeout(ac,1000);return}}P.sessionId();w()}function w(e,aw,D){c++;var ax=P.visitorId();if(al<1){setTimeout(ac,0);al++;return}else{ax=h(b);t(E,ax)}var i=q+[u.V(),u.CI(),u.PI(e),u.UI(),u.EX(aw,D),u.R()].join("&");C(i);am()}function am(){if(typeof __GLOBAL_STATS_PAGESTART_TIME__!="undefined"){if(typeof __GLOBAL_STATS_PAGESTART_TIME__=="undefined"||typeof __GLOBAL_STATS_DOMREADY_TIME__=="undefined"||typeof __GLOBAL_STATS_PAGEONLOAD_TIME__=="undefined"){setTimeout(am,1000);return}}if("https:"==l.location.protocol||y==true){return}if(typeof W=="function"){if(W()==false){return}}var e=Y.get("sudaPerformance");if(e!=null&&(new Date().getTime()-e)<d*60*1000){return}if(document.readyState!="complete"){setTimeout(am,500)}c++;y=true;if(I>0){au.picture();au.portait();au.jsSpeed();au.cssSpeed()}}function J(){if(I>0&&au.picOk&&au.porOk&&au.jsOk&&au.cssOk){var e=Q+[u.V(),"PI=pic:"+au.picData+"|por:"+au.porData+"|js:"+au.jsData+"|css:"+au.cssData+"|nld:"+g.onloadTime()+"|drd:"+g.domReadyTime(),u.P_UI(),u.EX(),u.R()].join("&");C(e)}Y.set("sudaPerformance",new Date().getTime())}function L(e,aw){if((""==e)||(undefined==e)){return}P.setAEC(e);if(0==aw){return}var D="AcTrack||"+h(E)+"||"+h(b)+"||"+P.userNick()+"||"+e+"||";var i=f+D+u.EXT()+"&gUid_"+new Date().getTime();ad(i)}function O(az,aA,e){e=e||{};var aC="UATrack||"+h(E)+"||"+h(b)+"||"+P.userNick()+"||"+az+"||"+aA+"||"+g.referrer()+"||"+(e.href||"")+"||"+(e.realUrl||"")+"||";var D=f+aC+u.EXT()+"&gUid_"+new Date().getTime();ad(D,e);if(e.urls){if(e.urls.replace(/\s/g,"")!=""){var ay=e.urls.split(",");if(ay.length>0){for(var aw=0,ax=ay.length;aw<ax;aw++){var aB=ay[aw]+(ay[aw].indexOf("?")==-1?"?":"&")+aC+"&gUid_"+new Date().getTime();ad(aB,e)}}}}}function F(aA){var aD=aq(aA);var D=aD.target;var ay="",aC="",aB="",ax="",i="",az="";var aw;if(D!=null&&D.getAttribute&&(!D.getAttribute("suda-uatrack")&&!D.getAttribute("suda-actrack")&&!D.getAttribute("suda-data"))){while(D!=null&&D.getAttribute&&(!!D.getAttribute("suda-uatrack")||!!D.getAttribute("suda-actrack")||!!D.getAttribute("suda-data"))==false){if(D==l.body){return}D=D.parentNode}}if(D==null||D.getAttribute==null){return}ay=D.getAttribute("suda-actrack")||"";aC=D.getAttribute("suda-uatrack")||D.getAttribute("suda-data")||"";ax=D.getAttribute("suda-urls")||"";aB=o(D);if(aC){aw=R(aC);if(D.tagName.toLowerCase()=="a"){i=escape(D.href)}az=g.getRealURL();aw.value=aw.value+aB;aw.key&&SUDA.uaTrack&&SUDA.uaTrack(aw.key,aw.value||aw.key,{href:i,realUrl:az,urls:ax})}if(ay){aw=R(ay);aw.key&&SUDA.acTrack&&SUDA.acTrack(aw.key,aw.value||aw.key)}}function o(i){var D=i.getAttribute("suda-sizzle");var e="";if(D==null||D==""){return""}e=V(i,D);return e}function V(D,aE){var aK;if(/^[-\d]/.test(aE)){var aI=aE.split(",");var aD=aI[0];var e=aI[1];var aF=aI[2];aK=aI[3]||"*";var aH,aA;if(aD==null||e==null||aF==null){return""}switch(aF){case"parent":D=D.parentNode;while(D!=null){if(D.getAttribute("suda-sizzle")!=null){if(aK!="*"&&D.tagName.toLowerCase()!=aK){D=D.parentNode;if(D==document.body){return""}continue}aH=D.getAttribute("suda-sizzle");aA=aH.split(",");if(aH[0]&&e==aH[0]){return(D.getAttribute("suda-ext")||"")+V(D,aH)}else{D=D.parentNode;if(D==document.body){return""}continue}}D=D.parentNode;if(D==document.body){return""}}return"";case"sibling":D=D.parentNode.children||D.parentNode.childNodes;for(var ax=0,aB=D.length;ax<aB;ax++){if(D[ax].getAttribute("suda-sizzle")!=null){if(aK!="*"&&D[ax].tagName.toLowerCase()!=aK){continue}aH=D[ax].getAttribute("suda-sizzle");aA=aH.split(",");if(aH[0]&&e==aH[0]){return(D[ax].getAttribute("suda-ext")||"")+V(D[ax],aH)}else{continue}}}return"";case"child":D=D.getElementsByTagName(aK);for(var aw=0,az=D.length;aw<az;aw++){if(D[aw].getAttribute("suda-sizzle")!=null){if(aK!="*"&&D[aw].tagName.toLowerCase()!=aK){continue}aH=D[aw].getAttribute("suda-sizzle");aA=aH.split(",");if(aH[0]&&e==aH[0]){return(D[aw].getAttribute("suda-ext")||"")+V(D[aw],aH)}else{continue}}}return""}}else{var aJ=aE.split("["),aG;switch(aJ.length){case 1:aK=aJ[0];break;case 2:default:aK=aJ[0];aG=aJ[1];break}if(aG){aG=aG.replace(/['"\]]/g,"").split("=");if(aG.length==2){var aC=aG[0];var ay=aG[1]}}D=D.parentNode;while(D!=null){if(D.tagName.toLowerCase()==aK){if(aC&&D.getAttribute(aC)==ay){if(D.getAttribute("suda-sizzle")!=null&&D.getAttribute("suda-sizzle")!=""){return(D.getAttribute("suda-ext")||"")+V(D,D.getAttribute("suda-sizzle"))}return(D.getAttribute("suda-ext")||"")}if(aC==null){if(D.getAttribute("suda-sizzle")!=null&&D.getAttribute("suda-sizzle")!=""){return(D.getAttribute("suda-ext")||"")+V(D,D.getAttribute("suda-sizzle"))}return(D.getAttribute("suda-ext")||"")}}D=D.parentNode;if(D==document.body){return""}}return""}}if(window.SUDA&&Object.prototype.toString.call(window.SUDA)==="[object Array]"){for(var ao=0,B=SUDA.length;ao<B;ao++){switch(SUDA[ao][0]){case"setGatherType":Z=SUDA[ao][1];break;case"setGatherInfo":aj=SUDA[ao][1]||aj;H=SUDA[ao][2]||H;G=SUDA[ao][3]||G;break;case"setPerformance":I=SUDA[ao][1];break;case"setPerformanceFilter":W=SUDA[ao][1];break;case"setPerformanceInterval":d=SUDA[ao][1]*1||0;d=isNaN(d)?0:d;break;case"setGatherMore":k.push(SUDA[ao].slice(1));break;case"acTrack":K.push(SUDA[ao].slice(1));break;case"uaTrack":ab.push(SUDA[ao].slice(1));break}}}M();P.setUOR();ai=(function(D,i){if(ag.top==ag){return false}else{try{if(l.body.clientHeight==0){return false}return((l.body.clientHeight>=D)&&(l.body.clientWidth>=i))?false:true}catch(aw){return true}}})(320,240);j=(function(){return false})();ac();if(typeof $CONFIG!="undefined"&&typeof $CONFIG.bigpipe!="undefined"&&$CONFIG.bigpipe==="true"&&typeof STK!="undefined"&&typeof STK.historyM!="undefined"&&typeof STK.historyM.onpopstate!="undefined"){STK.historyM.onpopstate(function(e){ac()})}if(k.length>0){m(k,function(i,e){w.apply(null,i)})}if(K.length>0){m(K,function(i,e){L.apply(null,i)})}if(ab.length>0){m(ab,function(i,e){O.apply(null,i)})}window.SUDA=window.SUDA||[];SUDA.log=function(){w.apply(null,arguments)};SUDA.acTrack=function(){L.apply(null,arguments)};SUDA.uaTrack=function(){O.apply(null,arguments)};r(l.body,"click",F)})();