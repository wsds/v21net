(function(){window.onerror=function(E,B,A){if(/^https/.test(window.location)){return }var C=document.createElement("img");var D=encodeURIComponent(E+"|_|"+B+"|_|"+A+"|_|"+window.navigator.userAgent);C.src="http://badjs.qq.com/cgi-bin/js_report?bid=110&mid=195279&msg="+D+"&v="+Math.random();C=null}})();var js_bgnrun_time=new Date();var g_time={};var g_begTime=new Date();try{g_time.time0=_TIMER_1_;g_time.time1=_TIMER_2_;g_time.time2=g_time.time1;g_time.time3=_TIMER_3_}catch(e){}String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")};var pt={lang:{default_msg:"<请输入帐号>",str2n:"使用其他号码登录",regLogin:"或打开其他帐号列表",change_to_qlogin:"切换到快速登录模式",regQLogin:"选择已登录帐号导入好友列表",busy:"系统繁忙",try_again:"登录失败，请重试！",no_uin:"您还没有输入帐号！",err_uin:"请输入正确的帐号！",err_code:"请输入正确的验证码！",no_password:"您还没有输入密码！",no_code:"您还没有输入验证码！",less_code:"请输入完整的验证码！",yjfk:"意见反馈",net_error:"网络或服务器出错，请稍后再试!"},action:[0,0],lang_num:2052,err_m:null,domain:"qq.com",submitN:{},domains:["qq.com","tenpay.com","pengyou.com"],flag2:20,isHttps:false,needAt:"",need_qlogin:1,t_type:0,lastUin:1,isLoadVC:false,t_appid:46000101,uin:0,ckNum:{},g_uin:0,first:true,firstLoadCodeImg:false,f_u:"",f_p:"",f_v:"",firstuin:"",sppedArray:[],xuiFrame:false,curXui:false,q_clock:null,input_aid:"",changeNum:0,g_checkTime:0,imgLoading:false,regmaster:"",login2_url:"",checkClock:0,version:"10009",js_type:2,qrlogin_clock:0,qrlogin_timeout:0,qrlogin_timeout_time:70000,isQrLogin:false,qr_uin:"",qr_nick:"",$:function(A){return document.getElementById(A)},is_weibo_appid:function(A){if(A==46000101||A==607000101){return true}return false},is_mibao:function(A){return/^http(s)?:\/\/ui.ptlogin2.(\S)+\/cgi-bin\/mibao_vry/.test(A)},isDivJs:function(A){if(!A){return false}if(A.indexOf("imgcache.qq.com/ptlogin/ac/v9/js/login_div.js")>-1||A.indexOf("imgcache.qq.com/ptlogin/ac/v9/js/login_div_"+pt.lang_num+".js")>-1){return true}if(A.indexOf("ui.ptlogin2."+pt.domain+"/js/login_div.js")>-1||A.indexOf("ui.ptlogin2."+pt.domain+"/js/login_div_"+pt.lang_num+".js")>-1){return true}return false},getJsSrc:function(){var C=document.getElementsByTagName("script");for(var A=0;A<C.length;A++){var B=C[A].src;if(pt.isDivJs(B)){return B}}return""},cleanCache:function(A){var B=document.createElement("iframe");B.src=(pt.isHttps?"https://ui.ptlogin2.qq.com/js/":"http://imgcache.qq.com/ptlogin/ac/v9/")+"clearcache.html#"+A;B.style.display="none";document.body.appendChild(B)},getQQnum:function(){try{if(window.ActiveXObject){var J=new ActiveXObject("SSOAxCtrlForPTLogin.SSOForPTLogin2");var E=J.CreateTXSSOData();J.InitSSOFPTCtrl(0,E);var B=J.CreateTXSSOData();var A=J.DoOperation(2,B);var C=A.GetArray("PTALIST");var G=C.GetSize();if(G>0){return G}}else{if(navigator.mimeTypes["application/nptxsso"]){var D=document.createElement("embed");D.type="application/nptxsso";D.style.width="0px";D.style.height="0px";document.body.appendChild(D);var I=D.InitPVANoST();if(I){var F=D.GetPVACount();if(F>0){return F}}}}}catch(H){return 0}return 0},cookie:{get:function(B){var A=document.cookie.match(new RegExp("(^| )"+B+"=([^;]*)(;|$)"));return unescape(A?A[2]:"")},clear:function(A,B,C){document.cookie=A+"=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path="+(C?C:"/")+"; "+(B?("domain="+B+";"):"")},set:function(B,D,C,E,F){var A=new Date();A.setTime(A.getTime()+(F?60000*F:30*24*60*60*1000));document.cookie=B+"="+D+"; expires="+A.toGMTString()+"; path="+(E?E:"/")+"; "+(C?("domain="+C+";"):"")}},html:{encode:function(B){var A="";if(B.length==0){return""}A=B.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/  /g,"&nbsp; ").replace(/'/g,"&apos;").replace(/"/g,"&quot;");return A}},getErrBox:function(){if(!pt.err_m){pt.err_m=pt.$("err_m")}return pt.err_m},getInputAid:function(){if(!pt.input_aid){pt.input_aid=pt.$("aid").value}return pt.input_aid},initDomain:function(){pt.isHttps=/^https/.test(window.location);var A=window.location.hostname.match(/(\w+\.{1}\w+)$/);if(A){A=A[0];for(var B=0;B<pt.domains.length;B++){if(A==pt.domains[B]){pt.domain=pt.domains[B]}}}document.domain=pt.domain},getLogin2Url:function(){var C=document.getElementsByName("aid")[0].value;var A=document.getElementsByName("u1")[0].value;var B=document.getElementsByName("daid")[0].value;pt.login2_url=(pt.isHttps?"https":"http")+"://ui.ptlogin2."+pt.domain+"/cgi-bin/login2?isdiv=1&appid="+C+"&s_url="+encodeURIComponent(A)+"&daid="+B},init:function(){pt.storage.init("pt",document.domain,false);pt.f_u=pt.$("u");pt.f_p=pt.$("p");pt.f_v=pt.$("verifycode");pt.t_type=(typeof pt_t_type=="undefined")?0:pt_t_type;pt.need_qlogin=(typeof pt_need_qlogin=="undefined")?1:pt_need_qlogin;var C=pt.$("regmaster");var B=window.location.hostname;pt.regmaster=C?C.value:"";if(/t\.qq\.com$/i.test(B)){pt.flag2=2}if(/qzone\.qq\.com$/i.test(B)){pt.flag2=3}if(pt.regmaster==1){window.setInterval(function(){var F=pt.cookie.get("pt_size").split("-");if(F.length>1&&window.ptlogin2_onResize){ptlogin2_onResize(F[0],F[1])}},100)}pt.onSelectLoad();pt.onPrePageLoad();var E=document.body;var A=E.onclick;var D=E.onkeydown;E.onclick=function(F){F=F|window.event;pt.action[0]++;if(typeof A=="function"){A()}};E.onkeydown=function(F){F=F|window.event;pt.action[1]++;if(typeof D=="function"){D()}};window.setTimeout(function(){if(Math.random()<0.1&&!pt.isHttps){pt.loadScript("http://mat1.gtimg.com/www/js/common.js",function(){if(typeof checkNonTxDomain=="function"){checkNonTxDomain(1,5)}})}},2000);window.setTimeout(function(){var G=pt.getJsSrc();if(G!=""){var F=(pt.isHttps?"https://ui.ptlogin2.qq.com/js/":"http://imgcache.qq.com/ptlogin/ac/v9/js/")+"ver.js?v="+Math.random();pt.loadScript(F)}pt.reportAttr2(256044,0.05)},1000);if(typeof pt_init_end=="function"){pt_init_end()}},show_err:function(D){var A=pt.html.encode(pt.$("u").value);var B=D+'<a href="http://support.qq.com/write.shtml?guest=1&fid=713&SSTAG=10011-'+A+'" target="_blank">'+pt.lang.yjfk+"</a>";if(typeof pt_show_err=="function"){pt_show_err(B);return }var C=pt.getErrBox();if(C){C.innerHTML=B;C.style.display="block";pt.notifySize("login");return }else{alert(D)}},hide_err:function(){var A=pt.getErrBox();if(typeof pt_show_err!="function"&&A){A.innerHTML="";A.style.display="none";pt.notifySize("login");return }},winName:{set:function(C,A){var B=window.name||"";if(B.match(new RegExp(";"+C+"=([^;]*)(;|$)"))){window.name=B.replace(new RegExp(";"+C+"=([^;]*)"),";"+C+"="+A)}else{window.name=B+";"+C+"="+A}},get:function(C){var B=window.name||"";var A=B.match(new RegExp(";"+C+"=([^;]*)(;|$)"));return A?A[1]:""},clear:function(B){var A=window.name||"";window.name=A.replace(new RegExp(";"+B+"=([^;]*)"),"")}},notifySize:function(A){if(pt.regmaster==1){return }obj=pt.$(A);if(obj){width=1;height=1;if(obj.offsetWidth>0){width=obj.offsetWidth}if(obj.offsetHeight>0){height=obj.offsetHeight}if(ptlogin2_onResize){ptlogin2_onResize(width,height);window.scroll(0,10)}}},setSpeed:function(B){if(B<=0){return }var A=pt.sppedArray.length;pt.sppedArray[A]=new Array(B,new Date())},qloginCheck:function(){pt.q_clock=setInterval(pt.checkQstatus,200);pt.qloginCheck.num=50;pt.cookie.set("ptui_qstatus",1,pt.domain,"/",1)},checkQstatus:function(){var B=pt.cookie.get("ptui_qstatus");var A=pt.winName.get("ptui_qstatus");if(pt.qloginCheck.num==0){pt.switchPage()}if(B=="2"||A=="2"){pt.winName.set("ptui_qstatus",2);pt.cookie.clear("ptui_qstatus",pt.domain,"/");clearInterval(pt.q_clock)}if(B=="3"||A=="3"){clearInterval(pt.q_clock);pt.winName.set("ptui_qstatus",3);pt.cookie.clear("ptui_qstatus",pt.domain,"/");pt.switchPage()}pt.qloginCheck.num--},loadxui:function(C){if(pt.xuiFrame){pt.$("qlogin").style.display="block";return }else{var L=document.getElementsByName("u1")[0];var J=pt.$("wording");var I=pt.$("css");var K=document.getElementsByName("ptredirect")[0];var F=document.getElementsByName("mibao_css")[0];var D=document.getElementsByName("aid")[0];var B=pt.$("low_login_enable");var M=B?(B.checked?1:0):0;var A=document.getElementsByName("daid")[0];L=L?L.value:"";D=D?D.value:"";J=J?J.value:"";I=I?I.value:"";K=K?K.value:"";F=F?F.value:"";var E=(pt.isHttps?"https://xui.ptlogin2."+pt.domain+"/div/qlogin_div_t.html":("http://xui.ptlogin2."+pt.domain+"/div/qlogin_div"+(pt.regmaster==1?"_2":"")+".html"))+"?lang="+pt.lang_num+"&flag2="+pt.flag2+"&u1="+encodeURIComponent(L)+"&appid="+pt.$("aid").value+(A?"&daid="+A.value:"")+(J?"&wording="+escape(J):"")+(I?"&css="+encodeURIComponent(I):"")+(K?"&ptredirect="+encodeURIComponent(K):"")+(F?"&mibao_css="+F:"")+(B?"&low_login=1":"")+(M?"&autocheck=1":"")+(pt.regmaster?"&regmaster=1":"")+"&ptui_version="+pt.version+"#"+(g_begTime-0);var H=pt.$("qlogin");var G=136+((C>5?5:C)-1)*28;if(pt.$("low_login_enable")){G+=20}if(H){H.innerHTML='<iframe id="xui" name="xui" allowtransparency="true" scrolling="no" frameborder="0" width="100%" height="'+G+'" src="'+E+'">';H.style.display="block";pt.$("web_login").style.display="none"}pt.curXui=true;pt.xuiFrame=true;pt.qloginCheck()}},onSelectLoad:function(){var A=0;if(pt.cookie.get("pt_qlogincode")==5){A=0}else{A=pt.getQQnum()}if(A>0&&!pt.t_type&&pt.need_qlogin!=0){pt.loadxui(A);if(pt.$("label_unable_tips")){pt.$("label_unable_tips").innerHTML=""}if(pt.$("switch")){pt.$("switch").innerHTML='<a style="cursor:pointer;" onclick="pt.switchPage();">'+(pt.regmaster==1?pt.lang.regLogin:pt.lang.str2n)+"</a>";pt.$("switch").style.display="block"}if(typeof callback=="function"){callback()}}else{if(pt.$("label_unable_tips")){pt.$("label_unable_tips").innerHTML=""}if(pt.$("switch")){pt.$("switch").style.display="none"}}pt.setSpeed(1);pt.notifySize("login")},switchPage:function(){pt.hide_err();if(pt.curXui){pt.$("web_login").style.display="block";pt.$("qlogin").style.display="none";pt.$("switch").innerHTML='<a href="javascript:;" onclick="pt.switchPage();return false;">'+(pt.regmaster==1?pt.lang.regQLogin:pt.lang.change_to_qlogin)+"</a>";pt.notifySize("login");pt.initFocus();pt.curXui=false;clearInterval(pt.q_clock)}else{pt.$("qlogin").style.display="block";pt.$("web_login").style.display="none";pt.$("switch").innerHTML='<a style="cursor:pointer;" onclick="pt.switchPage();">'+(pt.regmaster==1?pt.lang.regLogin:pt.lang.str2n)+"</a>";pt.curXui=true;pt.qloginCheck();pt.notifySize("login")}try{pt.$("err_m").style.display="none"}catch(A){}},switch_qrlogin:function(A){if(A){pt.$("normal_login").style.display="none";pt.$("qrlogin").style.display="block";pt.go_qrlogin_step(1);pt.$("qrlogin_img").src=pt.get_qrlogin_pic();pt.qrlogin_clock=window.setInterval("pt.qrlogin_submit();",2000);window.clearTimeout(pt.qrlogin_timeout);pt.qrlogin_timeout=window.setTimeout(function(){pt.switch_qrlogin(false)},pt.qrlogin_timeout_time)}else{pt.$("qrlogin").style.display="none";pt.$("normal_login").style.display="block";window.clearInterval(pt.qrlogin_clock);window.clearTimeout(pt.qrlogin_timeout)}pt.isQrLogin=A;pt.notifySize("login")},getShortWord:function(D,G,F){F=D.getAttribute("w")||F;G=G?G:"";var B="...";D.innerHTML=pt.html.encode(G);if(D.clientWidth<=F){}else{var A=Math.min(G.length,20);for(var C=A;C>0;C--){var E=G.substring(0,C);D.innerHTML=pt.html.encode(E+B);if(D.clientWidth<=F){break}}}D.style.width=F+"px"},setHeader:function(A){for(var B in A){if(B!=""){if(pt.$("qr_head")){pt.$("qr_head").src=A[B]}}}},imgErr:function(A){A.onerror=null;if(A.src!=pt.dftImg){A.src=pt.dftImg}return false},setFeeds:function(A){for(var B in A){if(B!=""){if(pt.$("qr_feeds")){pt.getShortWord(pt.$("qr_feeds"),A[B],120)}}}},get_qrlogin_pic:function(){var B="ptqrshow";var A=(pt.isHttps?"https://ssl.":"http://")+"ptlogin2."+pt.domain+"/"+B+"?";A+="appid="+pt.getInputAid()+"&e=2&l=L&s=3&d=72&v=4&t="+Math.random();return A},animate:function(B,C,H,R,G){if(!B){return }if(!B.effect){B.effect={}}if(typeof (B.effect.animate)=="undefined"){B.effect.animate=0}for(var M in C){C[M]=parseInt(C[M])||0}window.clearInterval(B.effect.animate);var H=H||10,R=R||20,I=function(V){var U={left:V.offsetLeft,top:V.offsetTop};return U},T=I(B),F={width:B.clientWidth,height:B.clientHeight,left:T.left,top:T.top},D=[],Q=window.navigator.userAgent.toLowerCase();if(!(Q.indexOf("msie")!=-1&&document.compatMode=="BackCompat")){var K=document.defaultView?document.defaultView.getComputedStyle(B,null):B.currentStyle;var E=C.width||C.width==0?parseInt(C.width):null,S=C.height||C.height==0?parseInt(C.height):null;if(typeof (E)=="number"){D.push("width");C.width=E-K.paddingLeft.replace(/\D/g,"")-K.paddingRight.replace(/\D/g,"")}if(typeof (S)=="number"){D.push("height");C.height=S-K.paddingTop.replace(/\D/g,"")-K.paddingBottom.replace(/\D/g,"")}if(R<15){H=Math.floor((H*15)/R);R=15}}var P=C.left||C.left==0?parseInt(C.left):null,L=C.top||C.top==0?parseInt(C.top):null;if(typeof (P)=="number"){D.push("left");B.style.position="absolute"}if(typeof (L)=="number"){D.push("top");B.style.position="absolute"}var J=[],O=D.length;for(var M=0;M<O;M++){J[D[M]]=F[D[M]]<C[D[M]]?1:-1}var N=B.style;var A=function(){var U=true;for(var V=0;V<O;V++){F[D[V]]=F[D[V]]+J[D[V]]*Math.abs(C[D[V]]-Math.floor(F[D[V]])*H/100);if((Math.round(F[D[V]])-C[D[V]])*J[D[V]]>=0){U=U&&true;N[D[V]]=C[D[V]]+"px"}else{U=U&&false;N[D[V]]=F[D[V]]+"px"}}if(U){window.clearInterval(B.effect.animate);if(typeof (G)=="function"){G(B)}}};B.effect.animate=window.setInterval(A,R)},go_qrlogin_step:function(A){switch(A){case 1:pt.$("qrlogin_step1").style.display="block";pt.$("qrlogin_step2").style.display="none";pt.$("qrlogin_step3").style.display="none";break;case 2:pt.$("qrlogin_step1").style.display="none";pt.$("qrlogin_step2").style.display="block";pt.$("qrlogin_step3").style.display="none";break;case 3:pt.$("qr_nick").innerHTML=pt.html.encode(pt.qr_nick);pt.$("qr_uin").innerHTML=pt.qr_uin;pt.$("qrlogin_step3").style.display="block";pt.$("qrlogin_step2").style.display="none";pt.$("qrlogin_step1").style.display="none";var C=(pt.$("qrlogin_step3").offsetWidth-pt.$("qr_card").offsetWidth)/2;var B=(pt.$("qrlogin_step3").offsetWidth-270)/2;pt.animate(pt.$("qr_card"),{left:C,top:20},20,20,function(){pt.animate(pt.$("qr_card"),{width:270,height:120,left:B,top:0})});break;default:break}},onPrePageLoad:function(){var B=pt.$("loginform");if(pt.$("low_login_enable")){pt.$("low_login_enable").onclick=function(){pt.onEnableLLogin(B)}}pt.setDefUin();pt.setSpeed(2);var A=0;if(location.hash){A=location.hash.substr(1,location.hash.length)}pt.reportSpeed(g_begTime,A);g_time.time4=new Date();pt.webLoginReport();pt.notifySize("login");if(!pt.curXui){pt.initFocus()}},onEnableLLogin:function(B){var A=B.low_login_enable;var C=B.low_login_hour;if(A!=null&&C!=null){C.disabled=!A.checked}},setDefUin:function(){var C=unescape(pt.cookie.get("ptui_loginuin"));var B=pt.chkAccount;if(pt.flag2!=2&&(B.isNick(C)||B.isName(C))){C=pt.cookie.get("pt2gguin").replace(/^o/,"")-0;C=C==0?"":C}if(pt.flag2==2){var A=pt.storage.instance.get("ptui_loginuin");C=A?A:C}if(pt.regmaster){C=""}pt.firstuin=C;pt.f_u.value=C},ptui_needVC:function(B,C){if(pt.ckNum[B]){if(pt.ckNum[B]==2){pt.show_err(pt.lang.net_error);return }pt.ckNum[B]++}else{pt.ckNum={};pt.ckNum[B]=1}var A=(pt.isHttps?"https://ssl.":"http://check.")+"ptlogin2."+pt.domain+"/check?";B=pt.needAt?pt.needAt:B;if(pt.regmaster){A="http://check.ptlogin2.id.qq.com/check?regmaster=1&"}A+="uin="+B+"&appid="+C+"&ptlang="+pt.lang_num+"&js_type="+pt.js_type+"&js_ver="+pt.version+"&r="+Math.random();pt.g_checkTime=new Date()-0;pt.loadScript(A);g_loadcheck=true;return },checkQQUin:function(A){if(A.length==0){return false}A=A.trim();pt.needAt="";var B=pt.chkAccount;if(pt.is_weibo_appid(pt.getInputAid())){if(B.isQQ(A)||B.isMail(A)){return true}else{if(B.isNick(A)||B.isName(A)){pt.needAt="@"+encodeURIComponent(A);return true}else{if(B.isPhone(A)){pt.needAt="@"+A.replace(/^(86|886)/,"");return true}else{if(B.isSeaPhone(A)){pt.needAt="@00"+A.replace(/^(00)/,"");if(/^(@0088609)/.test(pt.needAt)){pt.needAt=pt.needAt.replace(/^(@0088609)/,"@008869")}return true}}}}pt.needAt=""}else{if(B.isQQ(A)||B.isMail(A)){return true}if(B.isNick(A)){pt.$("u").value=A+"@qq.com";return true}if(B.isPhone(A)){pt.needAt="@"+A.replace(/^(86|886)/,"");return true}}if(B.isForeignPhone(A)){pt.needAt="@"+A;return true}return false},chkAccount:{isQQ:function(A){return/^[1-9]{1}\d{4,9}$/.test(A)},isNick:function(A){return/^[a-zA-Z]{1}([a-zA-Z0-9]|[-_]){0,19}$/.test(A)},isName:function(A){if(A=="<请输入帐号>"){return false}return/[\u4E00-\u9FA5]/.test(A)?(A.length>8?false:true):false},isPhone:function(A){return/^(?:86|886|)1\d{10}\s*$/.test(A)},isDXPhone:function(A){return/^(?:86|886|)1(?:33|53|80|81|89)\d{8}$/.test(A)},isSeaPhone:function(A){return/^(00)?(?:852|853|886(0)?\d{1})\d{8}$/.test(A)},isMail:function(A){return/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(A)},isForeignPhone:function(A){return/^00\d{7,}/.test(A)}},getSubmitUrl:function(H){var C=true;var B=pt.$("loginform");var A=(pt.isHttps?"https://ssl.":"http://")+"ptlogin2."+pt.domain+"/"+H+"?ptlang="+pt.lang_num+"&";if(pt.regmaster==1){A="http://ptlogin2.id.qq.com/"+H+"?ptlang="+pt.lang_num+"&regmaster=1&"}if(pt.regmaster==2){A="http://ptlogin2.function.qq.com/"+H+"?regmaster=2&"}if(pt.regmaster==3){A="http://ptlogin2.crm2.qq.com/"+H+"?regmaster=3&"}for(var G=0;G<B.length;G++){if(H=="ptqrlogin"&&(B[G].name=="u"||B[G].name=="p"||B[G].name=="verifycode"||B[G].name=="h")){continue}if(B[G].name=="fp"||B[G].type=="submit"||B[G].name==""){continue}if(B[G].name=="low_login_enable"&&(!B[G].checked)){C=false;continue}if(B[G].name=="low_login_hour"&&(!C)){continue}A+=B[G].name+"=";if(B[G].name=="u"&&pt.needAt){A+=pt.needAt+"&";continue}if(B[G].name=="p"){var I=B.p.value;var F=hexchar2bin(md5(I));var E=md5(F+pt.uin);var D=md5(E+B.verifycode.value.toUpperCase());A+=D}else{if(B[G].name=="u1"||B[G].name=="wording"){A+=encodeURIComponent(B[G].value)}else{A+=B[G].value}}A+="&"}A+="fp=loginerroralert&action="+pt.action.join("-")+"-"+(new Date()-js_bgnrun_time)+"&g=1&t="+pt.submitN[pt.uin]+"&dummy=";A+="&js_type="+pt.js_type+"&js_ver="+pt.version;return A},submit:function(){var A=pt.getSubmitUrl("login");pt.loadScript(A);return false},qrlogin_submit:function(){var A=pt.getSubmitUrl("ptqrlogin");pt.loadScript(A);return },initFocus:function(){try{if(pt.f_u.value==""){pt.f_u.focus();return }if(pt.f_p.value==""){pt.f_p.focus();return }if(pt.f_v.value==""){pt.f_v.focus()}}catch(A){}},browser:function(){var A=navigator.userAgent.toLowerCase();return A.match(/msie ([\d.]+)/)?1:A.match(/firefox\/([\d.]+)/)?3:A.match(/chrome\/([\d.]+)/)?5:A.match(/opera.([\d.]+)/)?9:A.match(/version\/([\d.]+).*safari/)?7:1},reportSpeed:function(E,D){if((pt.flag2==3&&Math.random()>0.5)||pt.t_type||pt.isHttps){return }var A=pt.browser();var B="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=6000&flag2="+pt.flag2+"&flag3="+A+"&24="+pt.$("aid").value;for(var C=0;C<pt.sppedArray.length;C++){B+="&"+pt.sppedArray[C][0]+"="+(pt.sppedArray[C][1]-E)}pt.report(B)},speedReport:function(D){if((pt.flag2==3&&Math.random()>0.5)||!pt.first||pt.isHttps||pt.t_type){return }var A="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=6000&flag2="+pt.flag2+"&flag3="+pt.browser()+"&24="+pt.$("aid").value;var B=0;for(var C in D){A+="&"+C+"="+D[C];B++}if(B==0){return }pt.report(A)},report:function(B){var A=new Image();A.src=B},webLoginReport:function(){var A={};if(g_time.time3&&g_time.time1){A["7"]=g_time.time3-g_time.time1}if(!pt.xuiFrame&&g_time.time1&&g_time.time3){A["8"]=g_time.time4-g_time.time1;A["22"]=js_bgnrun_time-g_time.time3;A["23"]=g_time.time4-js_bgnrun_time}if(g_time.time2&&g_time.time2>0){A["18"]=g_time.time1-g_time.time2;A["21"]=g_time.time3-g_time.time2;if(A["18"]>60000||A["21"]>60000){return }}if(g_time.time0&&g_time.time0>0){A["19"]=g_time.time2-g_time.time0;A["20"]=g_time.time3-g_time.time0;if(A["19"]>60000||A["20"]>60000){return }}pt.speedReport(A)},imgLoadReoprt:function(){if(pt.firstLoadCodeImg){return }var A=new Date();var B={};if(pt.firstuin!=""&&pt.changeNum<=1){g_time.time8=A;if(g_time.time1&&g_time.time3&&!pt.xuiFrame&&pt.firstuin!=""){B["9"]=g_time.time8-g_time.time1;B["10"]=g_time.time8-g_time.time3;B["11"]=g_time.time8-g_time.time7}}else{g_time.time11=A;B["14"]=g_time.time11-g_time.time10}pt.speedReport(B)},reportAttr:function(C,B){if(Math.random()>0.5){return }var A=(pt.isHttps?"https":"http")+"://ui.ptlogin2."+pt.domain+"/cgi-bin/report?id="+C+(B?"&n="+B:"");pt.report(A)},reportAttr2:function(C,B){if(Math.random()>(B||1)){return }url=location.protocol+"//ui.ptlogin2.qq.com/cgi-bin/report?id="+C;var A=new Image();A.src=url},loadVC:function(A){if(pt.isLoadVC==A&&(pt.lastUin==pt.g_uin)){return }pt.lastUin=pt.g_uin;pt.isLoadVC=A;if(A==true){var B=pt.$("imgVerify");var E=pt.needAt?pt.needAt:pt.g_uin;var D=(pt.isHttps?"https://ssl.":(pt.t_type==0?"http://":"http://t."))+"captcha."+pt.domain+"/getimage?aid="+pt.getInputAid()+"&r="+Math.random()+"&uin="+E;B.src=D;pt.$("verifyinput").style.display="";pt.$("verifytip").style.display="";pt.$("verifyshow").style.display="";pt.notifySize("login");try{pt.f_p.focus()}catch(C){}}else{pt.$("verifyinput").style.display="none";pt.$("verifytip").style.display="none";pt.$("verifyshow").style.display="none";pt.notifySize("login")}},forgetPwd:function(){pt.$("label_forget_pwd").href=(pt.isHttps?"https":"http")+"://ptlogin2.qq.com/ptui_forgetpwd?aquin="+pt.f_u.value;return true},checkTimeout:function(){var A=pt.$("u").value.trim();if(pt.chkAccount.isQQ(A)){pt.uin=uin2hex(A);pt.$("verifycode").value="";pt.loadVC(true)}pt.reportAttr2(216082)},check:function(){var B=new Date();if(pt.firstuin!=""&&pt.changeNum==0){g_time.time6=B}else{g_time.time9=B}var A=pt.f_u.value.trim();pt.f_u.value=A;if(pt.g_uin==A||(!pt.checkQQUin(A))){return }clearTimeout(pt.checkClock);pt.checkClock=setTimeout("pt.checkTimeout()",5000);pt.changeNum++;pt.g_uin=pt.f_u.value.trim();if(typeof (ptui_uin)=="function"){ptui_uin(pt.g_uin)}pt.ptui_needVC(pt.g_uin,pt.getInputAid())},checkValidate:function(){g_time.time12=new Date();if(pt.f_u.value==""){pt.show_err(pt.lang.no_uin);pt.f_u.focus();return false}pt.f_u.value=pt.f_u.value.trim();if(!pt.checkQQUin(pt.f_u.value)){pt.show_err(pt.lang.err_uin);pt.f_u.focus();pt.f_u.select();return false}if(pt.f_p.value==""){pt.show_err(pt.lang.no_password);pt.f_p.focus();return false}if(pt.f_v.value==""){if(!pt.isLoadVC){pt.loadVC(true);pt.imgLoading=true;return false}pt.show_err(pt.lang.no_code);pt.f_v.focus();if(!g_loadcheck){pt.reportAttr(78028)}else{pt.reportAttr(78029)}return false}if(pt.f_v.value.length<4){pt.show_err(pt.lang.less_code);pt.f_v.focus();pt.f_v.select();return false}if(pt.isLoadVC&&!(/^[a-zA-Z0-9]+$/.test(pt.f_v.value))){pt.show_err(pt.lang.err_code);pt.f_v.focus();pt.f_v.select();return false}pt.submit();pt.reportAttr(1000,pt.changeNum);pt.changeNum=0;return false},cb:function(I,K,B,G,C,A){pt.submitN[pt.uin]++;function J(){var L=navigator.userAgent.toLowerCase();return L.match(/msie ([\d.]+)/)?1:L.match(/firefox\/([\d.]+)/)?3:L.match(/chrome\/([\d.]+)/)?5:L.match(/opera.([\d.]+)/)?9:L.match(/version\/([\d.]+).*safari/)?7:1}function F(){var L=pt.cookie.get("skey");if(Math.random()<0.05&&!pt.isHttps){pt.reportAttr2(253338);if(!L){pt.reportAttr2(253339)}}}function D(){pt.hide_err();switch(G){case"0":if(!/\?/g.test(B)){B+="?"}B+="&isdiv=1";pt.f_p.value="";pt.$("web_login").style.display="none";pt.$("qlogin").style.display="block";pt.$("switch").style.display="none";try{pt.switch_qrlogin(false);pt.$("switch_qr").style.display="none"}catch(M){}var L=pt.$("qlogin");L.innerHTML='<iframe id="mb" name="mb" allowtransparency="true" scrolling="no" frameborder="0" width="100%" height="300" min-height="300" src="'+B+'">';break;case"1":F();top.location.href=B;break;case"2":case"4":parent.location.href=B;break;case"3":case"5":window.location=B;break;default:top.location.href=B;break}}document.getElementById("p").blur();g_time.time13=new Date();var E={"15":g_time.time13-g_time.time12};pt.speedReport(E);if(typeof (window.ptui_bos)=="function"){ptui_bos(I)}pt.first=false;if(I==65){pt.switch_qrlogin(false);return }if(I==66){return }if(I==67){pt.go_qrlogin_step(2);window.clearInterval(pt.qrlogin_clock);pt.qrlogin_clock=window.setInterval("pt.qrlogin_submit();",1000);return }if(B!=""||I==0){pt.cookie.set("ptui_loginuin",escape(pt.f_u.value),pt.domain,"/",30*24*60);if(pt.flag2==2){pt.storage.instance.set("ptui_loginuin",pt.f_u.value)}if(B!=""){if(pt.isQrLogin&&!pt.is_mibao(B)){window.clearInterval(pt.qrlogin_clock);pt.qr_uin=pt.cookie.get("uin");pt.qr_uin=parseInt(pt.qr_uin.substring(1,pt.qr_uin.length),10);pt.qr_nick=A;pt.loadScript("http://ptlogin2."+pt.domain+"/getface?appid="+pt.getInputAid()+"&imgtype=3&encrytype=0&devtype=0&keytpye=0&uin="+pt.qr_uin+"&js=1&r="+Math.random());pt.loadScript("http://ptlogin2."+pt.domain+"/getlongnick?appid="+pt.getInputAid()+"&js=1&r="+Math.random());pt.go_qrlogin_step(3);window.setTimeout(function(){D()},4000)}else{D()}}return }pt.imgLoading=false;if(K==0){pt.show_err(C)}else{pt.show_err(C);pt.f_p.value="";pt.f_p.focus();pt.f_p.select()}if(pt.isLoadVC){pt.changeCodeImg();pt.f_v.value="";pt.loadVC(true);pt.f_v.focus();pt.f_v.select()}else{if(K==0){pt.g_uin=0}}if(I==3||I==4){if(navigator.userAgent.toLowerCase().indexOf("webkit")>-1){pt.f_u.focus()}if(I==3){pt.f_p.value=""}pt.f_p.focus();pt.f_p.select();if(I==4){try{pt.f_v.focus();pt.f_v.select()}catch(H){}}if(K!=0&&K!=102){pt.f_v.value="";pt.loadVC(true);pt.imgLoading=true}}},changeCodeImg:function(){pt.firstLoadCodeImg=true;var A=pt.$("imgVerify");var C=pt.needAt?pt.needAt:pt.g_uin;A.src=(pt.isHttps?"https://ssl.":(pt.t_type==0?"http://":"http://t."))+"captcha."+pt.domain+"/getimage?aid="+pt.getInputAid()+"&uin="+C+"&"+Math.random();var B=pt.f_v;if(B!=null&&B.disabled==false){B.focus();B.select()}},checkVC:function(A,C,B){clearTimeout(pt.checkClock);if(!B){pt.g_uin="0";pt.check();return }if(B=="\x00\x00\x00\x00\x00\x00\x27\x10"){pt.g_uin="0";pt.show_err(pt.lang.err_uin);return }g_loadcheck=false;pt.uin=B;pt.ckNum[pt.needAt?pt.needAt:pt.$("u").value.trim()]=0;if(!pt.submitN[B]){pt.submitN[B]=1}pt.g_checkTime=new Date().getTime()-pt.g_checkTime;var E=new Date();if(pt.firstuin!=""&&pt.changeNum<=1){g_time.time7=E;var D={"12":g_time.time7-g_time.time6};if(pt.firstuin!=""){D["16"]=g_time.time6-g_time.time3,D["17"]=g_time.time7-g_time.time3}if(!pt.xuiFrame){pt.speedReport(D)}}else{g_time.time10=E;var D={"13":g_time.time10-g_time.time9};pt.speedReport(D)}if(A=="0"){pt.f_v.value=C;pt.loadVC(false)}else{pt.f_v.value="";pt.loadVC(true)}},loadScript:function(B,C){var A=document.createElement("script");A.charset="UTF-8";A.onload=A.onreadystatechange=function(){if(!this.readyState||this.readyState==="loaded"||this.readyState==="complete"){if(typeof C=="function"){C(A)}A.onload=A.onreadystatechange=null;if(A.parentNode){A.parentNode.removeChild(A)}}};A.src=B;document.getElementsByTagName("head")[0].appendChild(A)},clearScript:function(A){window.setTimeout(function(){A.parentNode.removeChild(A)},5000)},storage:{instance:null,init:function(F,D,C){try{var B=["localStorage","globalStorage","userData"];var A={};A.userData={db:null,isSupport:!!window.ActiveXObject,get:function(H,G){this.db.load(F);var I=this.db.getAttribute(H);return I},set:function(G,H){try{this.db.load(F);this.db.setAttribute(G,H);this.db.save(F);return true}catch(I){return false}},init:function(){var G=(document.documentElement||document.body);G.addBehavior("#default#userdata");G.load(F);this.db=G}};A.globalStorage={db:null,isSupport:!!window.globalStorage,get:function(H){var G=(G=this.db.getItem(H))&&G.value?G.value:G;return G},set:function(G,H){try{this.db.setItem(G,H);return true}catch(I){return false}},init:function(){this.db=window.globalStorage[D]}};A.localStorage={db:null,isSupport:!!window.localStorage,get:A.globalStorage.get,set:A.globalStorage.set,init:function(G){if(this.db=window.localStorage){}else{typeof G=="function"?G(false):""}}};(function(){for(var H=0,G=B.length;H<G;H++){if(A[B[H]].isSupport){(pt.storage.instance=A[B[H]]).init();return }}})()}catch(E){}}}};function ptui_switch_login(){pt.$("web_login").style.display="block";pt.$("auth").style.display="none";pt.init()}function ptui_login2_cb(H,G,F,B,D,E){var C="_top";var A="top";switch(F){case"1":C="_self";break;case"2":C="_top";break;case"3":C="_parent";break;default:C="_top";break}switch(H){case"1":pt.init();break;case"2":pt.$("web_login").style.display="none";pt.$("auth").style.display="block";pt.$("appname").innerHTML=B;pt.$("accounts").innerHTML=D;pt.$("auth_link").setAttribute("href",G);pt.$("auth_link").setAttribute("target",C);break;case"3":switch(F){case"1":location.href=G;break;case"2":top.location.href=G;break;case"3":parent.location.href=G;break;default:top.location.href=G;break}break;default:break}}pt.initDomain();if(document.getElementsByName("daid").length>0){pt.getLogin2Url();pt.loadScript(pt.login2_url)}else{pt.init()}var hexcase=1;var b64pad="";var chrsz=8;var mode=32;function md5(A){return hex_md5(A)}function hex_md5(A){return binl2hex(core_md5(str2binl(A),A.length*chrsz))}function str_md5(A){return binl2str(core_md5(str2binl(A),A.length*chrsz))}function core_md5(K,F){K[F>>5]|=128<<((F)%32);K[(((F+64)>>>9)<<4)+14]=F;var J=1732584193;var I=-271733879;var H=-1732584194;var G=271733878;for(var C=0;C<K.length;C+=16){var E=J;var D=I;var B=H;var A=G;J=md5_ff(J,I,H,G,K[C+0],7,-680876936);G=md5_ff(G,J,I,H,K[C+1],12,-389564586);H=md5_ff(H,G,J,I,K[C+2],17,606105819);I=md5_ff(I,H,G,J,K[C+3],22,-1044525330);J=md5_ff(J,I,H,G,K[C+4],7,-176418897);G=md5_ff(G,J,I,H,K[C+5],12,1200080426);H=md5_ff(H,G,J,I,K[C+6],17,-1473231341);I=md5_ff(I,H,G,J,K[C+7],22,-45705983);J=md5_ff(J,I,H,G,K[C+8],7,1770035416);G=md5_ff(G,J,I,H,K[C+9],12,-1958414417);H=md5_ff(H,G,J,I,K[C+10],17,-42063);I=md5_ff(I,H,G,J,K[C+11],22,-1990404162);J=md5_ff(J,I,H,G,K[C+12],7,1804603682);G=md5_ff(G,J,I,H,K[C+13],12,-40341101);H=md5_ff(H,G,J,I,K[C+14],17,-1502002290);I=md5_ff(I,H,G,J,K[C+15],22,1236535329);J=md5_gg(J,I,H,G,K[C+1],5,-165796510);G=md5_gg(G,J,I,H,K[C+6],9,-1069501632);H=md5_gg(H,G,J,I,K[C+11],14,643717713);I=md5_gg(I,H,G,J,K[C+0],20,-373897302);J=md5_gg(J,I,H,G,K[C+5],5,-701558691);G=md5_gg(G,J,I,H,K[C+10],9,38016083);H=md5_gg(H,G,J,I,K[C+15],14,-660478335);I=md5_gg(I,H,G,J,K[C+4],20,-405537848);J=md5_gg(J,I,H,G,K[C+9],5,568446438);G=md5_gg(G,J,I,H,K[C+14],9,-1019803690);H=md5_gg(H,G,J,I,K[C+3],14,-187363961);I=md5_gg(I,H,G,J,K[C+8],20,1163531501);J=md5_gg(J,I,H,G,K[C+13],5,-1444681467);G=md5_gg(G,J,I,H,K[C+2],9,-51403784);H=md5_gg(H,G,J,I,K[C+7],14,1735328473);I=md5_gg(I,H,G,J,K[C+12],20,-1926607734);J=md5_hh(J,I,H,G,K[C+5],4,-378558);G=md5_hh(G,J,I,H,K[C+8],11,-2022574463);H=md5_hh(H,G,J,I,K[C+11],16,1839030562);I=md5_hh(I,H,G,J,K[C+14],23,-35309556);J=md5_hh(J,I,H,G,K[C+1],4,-1530992060);G=md5_hh(G,J,I,H,K[C+4],11,1272893353);H=md5_hh(H,G,J,I,K[C+7],16,-155497632);I=md5_hh(I,H,G,J,K[C+10],23,-1094730640);J=md5_hh(J,I,H,G,K[C+13],4,681279174);G=md5_hh(G,J,I,H,K[C+0],11,-358537222);H=md5_hh(H,G,J,I,K[C+3],16,-722521979);I=md5_hh(I,H,G,J,K[C+6],23,76029189);J=md5_hh(J,I,H,G,K[C+9],4,-640364487);G=md5_hh(G,J,I,H,K[C+12],11,-421815835);H=md5_hh(H,G,J,I,K[C+15],16,530742520);I=md5_hh(I,H,G,J,K[C+2],23,-995338651);J=md5_ii(J,I,H,G,K[C+0],6,-198630844);G=md5_ii(G,J,I,H,K[C+7],10,1126891415);H=md5_ii(H,G,J,I,K[C+14],15,-1416354905);I=md5_ii(I,H,G,J,K[C+5],21,-57434055);J=md5_ii(J,I,H,G,K[C+12],6,1700485571);G=md5_ii(G,J,I,H,K[C+3],10,-1894986606);H=md5_ii(H,G,J,I,K[C+10],15,-1051523);I=md5_ii(I,H,G,J,K[C+1],21,-2054922799);J=md5_ii(J,I,H,G,K[C+8],6,1873313359);G=md5_ii(G,J,I,H,K[C+15],10,-30611744);H=md5_ii(H,G,J,I,K[C+6],15,-1560198380);I=md5_ii(I,H,G,J,K[C+13],21,1309151649);J=md5_ii(J,I,H,G,K[C+4],6,-145523070);G=md5_ii(G,J,I,H,K[C+11],10,-1120210379);H=md5_ii(H,G,J,I,K[C+2],15,718787259);I=md5_ii(I,H,G,J,K[C+9],21,-343485551);J=safe_add(J,E);I=safe_add(I,D);H=safe_add(H,B);G=safe_add(G,A)}if(mode==16){return Array(I,H)}else{return Array(J,I,H,G)}}function md5_cmn(F,C,B,A,E,D){return safe_add(bit_rol(safe_add(safe_add(C,F),safe_add(A,D)),E),B)}function md5_ff(C,B,G,F,A,E,D){return md5_cmn((B&G)|((~B)&F),C,B,A,E,D)}function md5_gg(C,B,G,F,A,E,D){return md5_cmn((B&F)|(G&(~F)),C,B,A,E,D)}function md5_hh(C,B,G,F,A,E,D){return md5_cmn(B^G^F,C,B,A,E,D)}function md5_ii(C,B,G,F,A,E,D){return md5_cmn(G^(B|(~F)),C,B,A,E,D)}function safe_add(A,D){var C=(A&65535)+(D&65535);var B=(A>>16)+(D>>16)+(C>>16);return(B<<16)|(C&65535)}function bit_rol(A,B){return(A<<B)|(A>>>(32-B))}function str2binl(D){var C=Array();var A=(1<<chrsz)-1;for(var B=0;B<D.length*chrsz;B+=chrsz){C[B>>5]|=(D.charCodeAt(B/chrsz)&A)<<(B%32)}return C}function binl2str(C){var D="";var A=(1<<chrsz)-1;for(var B=0;B<C.length*32;B+=chrsz){D+=String.fromCharCode((C[B>>5]>>>(B%32))&A)}return D}function binl2hex(C){var B=hexcase?"0123456789ABCDEF":"0123456789abcdef";var D="";for(var A=0;A<C.length*4;A++){D+=B.charAt((C[A>>2]>>((A%4)*8+4))&15)+B.charAt((C[A>>2]>>((A%4)*8))&15)}return D}function hexchar2bin(str){var arr=[];for(var i=0;i<str.length;i=i+2){arr.push("\\x"+str.substr(i,2))}arr=arr.join("");eval("var temp = '"+arr+"'");return temp}function uin2hex(str){var maxLength=16;str=parseInt(str);var hex=str.toString(16);var len=hex.length;for(var i=len;i<maxLength;i++){hex="0"+hex}var arr=[];for(var j=0;j<maxLength;j+=2){arr.push("\\x"+hex.substr(j,2))}var result=arr.join("");eval('result="'+result+'"');return result}var g_loadcheck=true;var isAbleSubmit=false;function ptui_checkVC(B,E,C){pt.checkVC(B,E,C);var D=pt.cookie.get("chkuin");var A=pt.cookie.get("confirmuin");if(D==A&&D){pt.reportAttr(195390)}else{if(D==A&&!D){pt.reportAttr(195393)}else{if(D&&!A){pt.reportAttr(195389)}else{if(!D&&A){pt.reportAttr(195392)}else{if(D&&A&&D!=A){pt.reportAttr(195391)}}}}}}function ptui_changeImg(){pt.changeCodeImg()}function ptuiCB(D,B,C,F,E,A){pt.cb(D,B,C,F,E,A)}function imgLoadReport(){pt.imgLoadReoprt()}function ptui_checkValidate(){return pt.checkValidate()}isAbleSubmit=true;function check(){pt.check()}function onClickForgetPwd(){return pt.forgetPwd()}function ptuiV(A){if(A!=pt.version){pt.cleanCache(pt.getJsSrc());pt.reportAttr2(220827,0.05)}};