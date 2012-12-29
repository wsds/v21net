



























var 
gsAgent=navigator.userAgent.toLowerCase(),
gsAppVer=navigator.appVersion.toLowerCase(),
gsAppName=navigator.appName.toLowerCase(),
gbIsOpera=gsAgent.indexOf("opera")>-1,
gbIsWebKit=gsAgent.indexOf("applewebkit")>-1,
gbIsKHTML=gsAgent.indexOf("khtml")>-1
||gsAgent.indexOf("konqueror")>-1||gbIsWebKit,
gbIsIE=(gsAgent.indexOf("compatible")>-1&&!gbIsOpera)
||gsAgent.indexOf("msie")>-1,
gbIsTT=gbIsIE?(gsAppVer.indexOf("tencenttraveler")!=-1?1:0):0,
gbIsQBWebKit=gbIsWebKit?(gsAppVer.indexOf("qqbrowser")!=-1?1:0):0,
gbIsChrome=gbIsWebKit&&!gbIsQBWebKit&&gsAgent.indexOf("chrome")>-1&&gsAgent.indexOf("se 2.x metasr 1.0")<0,
gbIsSafari=gbIsWebKit&&!gbIsChrome&&!gbIsQBWebKit,
gbIsQBIE=gbIsIE&&gsAppVer.indexOf("qqbrowser")!=-1,
gbIsFF=gsAgent.indexOf("gecko")>-1&&!gbIsKHTML,
gbIsNS=!gbIsIE&&!gbIsOpera&&!gbIsKHTML&&(gsAgent.indexOf("mozilla")==0)
&&(gsAppName=="netscape"),
gbIsAgentErr=!(gbIsOpera||gbIsKHTML||gbIsSafari||gbIsIE||gbIsTT
||gbIsFF||gbIsNS),
gbIsWin=gsAgent.indexOf("windows")>-1||gsAgent.indexOf("win32")>-1,
gbIsVista=gbIsWin&&(gsAgent.indexOf("nt 6.0")>-1||gsAgent.indexOf("windows vista")>-1),
gbIsWin7=gbIsWin&&gsAgent.indexOf("nt 6.1")>-1,
gbIsMac=gsAgent.indexOf("macintosh")>-1||gsAgent.indexOf("mac os x")>-1,
gsMacVer=/mac os x (\d+)(\.|_)(\d+)/.test(gsAgent)&&parseFloat(RegExp.$1+"."+RegExp.$3),
gbIsLinux=gsAgent.indexOf("linux")>-1,
gbIsAir=gsAgent.indexOf("adobeair")>-1,
gnIEVer=/MSIE (\d+.\d+);/i.test(gsAgent)&&parseFloat(RegExp["$1"]),
gsFFVer=/firefox\/((\d|\.)+)/i.test(gsAgent)&&RegExp["$1"],
gsSafariVer=""+(/version\/((\d|\.)+)/i.test(gsAgent)&&RegExp["$1"]),
gsChromeVer=""+(/chrome\/((\d|\.)+)/i.test(gsAgent)&&RegExp["$1"]),
gsQBVer=""+(/qqbrowser\/((\d|\.)+)/i.test(gsAgent)&&RegExp["$1"]),

Ly="_For_E_Built";




if(document.domain!="qq.com"||!window.getTop)
{
document.domain="qq.com";






window.getTop=function()
{
var ko=arguments.callee;

if(!ko.vf)
{
try
{
if(window!=parent)
{
ko.vf=parent.getTop?parent.getTop():parent.parent.getTop();
}
else
{
ko.vf=window;
}
}
catch(ax)
{
ko.vf=window;
}
}

return ko.vf;
};


try
{


}
catch(ax)
{

eval("var top = getTop();");
}
}







function um(bL,jx)
{
return typeof bL=="function"
?bL.apply(this,jx||[]):null;
}







function callBack(bL,jx)
{
if(!window.Console)
{
try
{
return um.call(this,bL,jx);
}
catch(ax)
{
debug(ax.message);
}
}
else
{
return um.call(this,bL,jx);
}
}









function waitFor(Lb,Fc,
qd,mP)
{
var hO=0,
nR=qd||500,
QR=(mP||10*500)/nR;

function afg(kk)
{
try
{
Fc(kk)
}
catch(ax)
{
debug(ax,2);
}
};

(function()
{
try
{
if(Lb())
{
return afg(true);
}
}
catch(ax)
{
debug(ax,2);
}

if(hO++>QR)
{
return afg(false);
}

setTimeout(arguments.callee,nR);
})();
}






function unikey(tv)
{
return[tv,now(),Math.random()].join("").split(".").join("");
}




function genGlobalMapIdx()
{
return Math.round(Math.random()*10000).toString()+new Date().getMilliseconds();
}






function isLeapYear(cC)
{
return(cC%400==0||(cC%4==0&&cC%100!=0));
}







function calDays(cC,dA)
{
return[null,31,null,31,30,31,30,31,31,30,31,30,31][dA]||(isLeapYear(cC)?29:28);
}





function now()
{
return+new Date;
}






function trim(aU)
{
return(aU&&aU.replace?aU:"").replace(/(^\s*)|(\s*$)/g,"");
}

function trim2(aU)
{


if(aU&&aU.substring)
{
var jw=/\s/,vs=-1,vp=aU.length;
while(jw.test(aU.charAt(--vp)));
while(jw.test(aU.charAt(++vs)));
return aU.substring(vs,vp+1);
}

}












function strReplace(aU,DJ,aDz,bK)
{
return(aU||"").replace(
new RegExp(regFilter(DJ),bK),aDz);
}






function encodeURI(aU)
{
return aU&&aU.replace?aU.replace(/%/ig,"%25").replace(/\+/ig,"%2B")
.replace(/&/ig,"%26").replace(/#/ig,"%23")
.replace(/\'/ig,"%27").replace(/\"/ig,"%22"):aU;
}






function decodeURI(aU)
{
return decodeURIComponent(aU||"");
}






function regFilter(PJ)
{
return PJ.replace(/([\^\.\[\$\(\)\|\*\+\?\{\\])/ig,"\\$1");
}






function isUrl(eH)
{
return(eH||"").replace(
/http?:\/\/[\w.]+[^ \f\n\r\t\v\"\\\<\>\[\]\u2100-\uFFFF]*/,"url")=="url";
}













function cookQueryString(aE,at)
{
var cA=aE.split("#"),
xs=cA[1]?("#"+cA[1]):"";

aE=cA[0];

for(var i in at)
{
var cL=at[i],
iV=new RegExp(["([?&]",i,"=)[^&#]*"].join(""),"gi");

aE=iV.test(aE)?
aE.replace(iV,"$1"+cL):[aE,"&",i,"=",cL,xs].join("");
}
return aE;
}









function formatNum(ij,anJ)
{
var ns=(isNaN(ij)?0:ij).toString(),
Oz=anJ-ns.length;
return Oz>0?[new Array(Oz+1).join("0"),ns].join(""):ns;
}







function numToStr(ij,awC)
{
var ns=String(ij.toFixed(awC));
var re=/(-?\d+)(\d{3})/;
while(re.test(ns))
{
ns=ns.replace(re,"$1,$2");
}
return ns;
}




function numToTimeStr(ij,ok)
{
var Os=ok||"$HH$:$MM$:$SS$";
return	T(Os).replace({
SS:formatNum(parseInt(ij)%60,2),
MM:formatNum(parseInt(ij/60)%60,2),
HH:formatNum(parseInt(ij/3600)%60,2)
})
}








function formatDate(hu,ok,aIY)
{
var eM=hu||new Date(),
uA=formatNum;

return T(ok,aIY).replace({
YY:uA(eM.getFullYear(),4),
MM:uA(eM.getMonth()+1,2),
DD:uA(eM.getDate(),2),
hh:uA(eM.getHours(),2),
mm:uA(eM.getMinutes(),2),
ss:uA(eM.getSeconds(),2)
});
}







function getAsiiStrLen(aU)
{
return(aU||"").replace(/[^\x00-\xFF]/g,"aa").length;
}





function clearHtmlStr(aU)
{
return aU?aU.replace(/<[^>]*>/g,""):aU;
}








function subAsiiStr(aU,rS,Nb,zT)
{
var zH=function(eH){return eH},
ym=zT?htmlEncode:zH,
dv=(zT?htmlDecode:zH)(trim((aU||"").toString())),
Az=Nb||"",
Bn=Math.max(rS-Az.length,1),
Mj=dv.length,
rV=0,
pa=-1,
mj;

for(var i=0;i<Mj;i++)
{
mj=dv.charCodeAt(i);


rV+=mj==35||mj==87
?1.2
:(mj>255?1.5:1);

if(pa==-1&&rV>Bn)
{
pa=i;
}

if(rV>rS)
{
return ym(dv.substr(0,pa))+Az;
}
}

return ym(dv);
}













function setCookie(aC,aT,mM,dE,iJ,qr)
{
if(aC)
{
document.cookie=T(
[
'$name$=$value$; ',
!mM?'':'expires=$expires$; ',
'path=$path$; ',
'domain=$domain$; ',
!qr?'':'$secure$'
]
).replace(
{
name:aC,
value:encodeURIComponent(aT||""),
expires:mM&&mM.toGMTString(),
path:dE||'/',
domain:iJ||["mail.",getDomain()].join(""),
secure:qr?"secure":""
}
);
return true;
}
else
{
return false;
}
}






function getCookie(aC)
{
return(new RegExp([
"(?:; )?",regFilter(aC),"=([^;]*);?"
].join("")
)).test(document.cookie)&&decodeURIComponent(RegExp["$1"]);
}







function deleteCookie(aC,dE,iJ)
{
setCookie(aC,"",new Date(0),dE,iJ);
}









function setCookieFlag(aC,dL,nW,Pc)
{
var dJ=Pc||getCookieFlag(aC),
vQ=new Date();


vQ.setTime(vQ.getTime()+(30*24*3600*1000));
dJ[dL]=nW;
setCookie(aC,dJ.join(""),vQ);

return dJ;
}






function getCookieFlag(aC)
{
var MA=(getCookie(aC)||"").split("");

for(var i=MA.length;i<6;i++)
{
MA[i]='0';
}

return MA;
}








function isArr(at)
{
return Object.prototype.toString.call(at)=="[object Array]";
}









function E(pc,vD,agZ,tF)
{
if(!pc)
{
return;
}

if(pc.length!=null)
{
var aw=pc.length,
hz;

if(tF<0)
{
hz=aw+tF;
}
else
{
hz=tF<aw?tF:aw;
}

for(var i=(agZ||0);i<hz;i++)
{
try
{
if(vD(pc[i],i,aw)===false)
{
break;
}
}
catch(ax)
{
debug([ax.message,"<br>line:",ax.lineNumber,'<br>file:',ax.fileName,"<br>",vD]);
}
}
}
else
{
for(var i in pc)
{
try
{
if(vD(pc[i],i)===false)
{
break;
}
}
catch(ax)
{
debug([ax.message,"<br>",vD]);
}
}
}
}









function extend()
{
for(var aS=arguments,oK=aS[0],i=1,aw=aS.length;i<aw;i++)
{
var ro=aS[i];
for(var j in ro)
{
oK[j]=ro[j];
}
}
return oK;
}







function delAtt(az,uC)
{
try
{
delete az[uC];
}
catch(ax)
{
}
return az;
}







function saveAtt(az,uC)
{
if(az)
{
var aLt=az.hasOwnProperty(uC),
fF=az[uC];
return function()
{
if(aLt)
{
az[uC]=fF;
}
else
{
delAtt(az,uC);
}
return az;
};
}
else
{
return function(){};
}
}









function globalEval(dw,oi)
{
var rK=getTop().globalEval||arguments.callee;

if(!rK.LX&&typeof(rK.agM)!="boolean")
{
var aA="testScriptEval"+now();

rK.LX=true;
rK(T('window.$id$=1;').replace({
id:aA
}));
rK.LX=false;

rK.agM=getTop()[aA]?true:false;
}

var cF=trim(dw);
if(!cF)
{
return false;
}

var aI=(oi||window).document,
rE=GelTags("head",aI)[0]||aI.documentElement,
fo=aI.createElement("script");

fo.type="text/javascript";
if(rK.agM||arguments.callee.LX)
{
try
{
fo.appendChild(aI.createTextNode(cF));
}
catch(ax)
{
}
}
else
{

fo.text=cF;
}

rE.insertBefore(fo,rE.firstChild);
rE.removeChild(fo);

return true;
}





function evalValue(dw,oi)
{
var bP=unikey("_u"),
am=oi||window,
dJ;

globalEval(
[
"(function(){try{window.",bP,"=",dw,";}catch(_oError){}})();"
].join(""),
am
);
dJ=am[bP];
am[bP]=null;

return dJ;
}







function S(ao,by)
{
try
{
return(by&&(by.document||by)
||document).getElementById(ao);
}
catch(ax)
{
return null;
}
}







function SN(aC,by)
{
try
{
var rC=(by&&(by.document||by)
||document).getElementsByName(aC);
if(rC)
{
rC[Ly]=true;
}
return rC;
}
catch(ax)
{
return null;
}
}









function attr(ak,ef,aT)
{

if(!ak||!ak.nodeType||ak.nodeType===3||ak.nodeType===8)
{
return undefined;
}
if(aT===undefined)
{
return ak.getAttribute(ef);
}
else
{
ak.setAttribute(ef,aT);
return ak;
}
}







function GelTags(kC,aB)
{
var rC=(aB||document).getElementsByTagName(kC);
if(rC)
{
rC[Ly]=true;
}
return rC;

}







function F(ao,aj)
{
var mz=S(ao,aj);
return mz&&(mz.contentWindow||(aj||window).frames[ao]);
}

function appendToUrl(aE,aHT)
{
var cA=aE.split("#");
return[cA[0],aHT,(cA.length>1?"#"+cA[1]:"")].join("");
}









function insertHTML(aB,fJ,cN)
{
if(!aB)
{
return false;
}
try
{

if(aB.insertAdjacentHTML)
{
aB.insertAdjacentHTML(fJ,cN);
}
else
{
var he=aB.ownerDocument.createRange(),
jp=fJ.indexOf("before")==0,
yV=fJ.indexOf("Begin")!=-1;
if(jp==yV)
{
he[jp?"setStartBefore":"setStartAfter"](aB);
aB.parentNode.insertBefore(
he.createContextualFragment(cN),yV
?aB
:aB.nextSibling
);
}
else
{
var bp=aB[jp?"lastChild":"firstChild"];
if(bp)
{
he[jp?"setStartAfter":"setStartBefore"](bp);
aB[jp?"appendChild":"insertBefore"](he
.createContextualFragment(cN),bp);
}
else
{
aB.innerHTML=cN;
}
}
}
return true;
}
catch(ax)
{
return false;
}
}

















function setHTML(Ck,cN)
{
var CX=typeof Ck==="string"?S(Ck):Ck,
CS=CX.cloneNode(false);
CS.innerHTML=cN;
CX.parentNode.replaceChild(CS,CX);
return CS;
}



















function createIframe(aj,iS,aY)
{
var zN="_creAteifRAmeoNlQAd_",
bD=aY||{},
aA=aY.id||unikey(),
nK=S(aA,aj);


if(typeof aj[zN]!="function")
{
aj[zN]=function(ao,aCI)
{
callBack.call(aCI,arguments.callee[ao],[aj]);
};
}


aj[zN][aA]=aY.onload;
if(!nK)
{
insertHTML(
bD.obj||aj.document.body,
bD.where||"afterBegin",
TE([
'<iframe frameborder="0" scrolling="$scrolling$" id="$id$" name="$id$" ',
'$@$if($transparent$)$@$allowTransparent$@$endif$@$ class="$className$" ',
'onload="this.setAttribute(\x27loaded\x27,\x27true\x27);$cb$(\x27$id$\x27,this);" ',
'src="$src$" style="$style$" $attrs$>',
'</iframe>'
]).replace(extend(
{
"id":aA,
"cb":zN,
style:"display:none;",
scrolling:"no",
src:iS
}
,aY))
);
nK=S(aA,aj);
nK.Tl=aY.onload;
}
else if(nK.getAttribute("loaded")=="true")
{
aj[zN](aA,nK);
}
return nK;
}





function removeSelf(aB)
{
try
{
















aB.parentNode.removeChild(aB);
}
catch(ax)
{
}

return aB;
}







function isObjContainTarget(aB,eg)
{
try
{
if(!aB||!eg)
{
return false;
}
else if(aB.contains)
{
return aB.contains(eg);
}
else if(aB.compareDocumentPosition)
{
var yH=aB.compareDocumentPosition(eg);
return(yH==20||yH==0);
}
}
catch(HI)
{


}

return false;
}






function isDisableCtl(OF,aj)
{
var aaj=SN(OF,aj);
for(var i=aaj.length-1;i>=0;i--)
{
if(aaj[i].disabled)
{
return true;
}
}
return false;
}







function disableCtl(OF,hJ,by)
{
E(SN(OF,by),function(ayG)
{
ayG.disabled=hJ;
}
);
}








function isShow(jS,by)
{
return(getStyle((typeof(jS)=="string"?S(jS,by):jS),"display")||"none")
!="none";
}







function show(jS,iN,by)
{
var bp=(typeof(jS)=="string"?S(jS,by):jS);
if(bp)
{
bp.style.display=(iN?"":"none");
}
else if(!by&&typeof(jS)=="string")
{

}
return bp;
}


var Show=show;





function toggle(jS,by)
{
return show(jS,!isShow(jS,by),by);
}







function setClass(aB,kZ)
{
if(aB&&typeof(kZ)!="undefined"&&aB.className!=kZ)
{
aB.className=kZ;
}
return aB;
}







function addClass(aB,kZ)
{
if(aB)
{
var kQ=" "+aB.className+" ";
if(kQ.indexOf(" "+kZ+" ")<0)
{
aB.className+=aB.className?" "+kZ:kZ;
}
}
return aB;
};







function rmClass(aB,kZ)
{
if(aB)
{
if(kZ)
{
var kQ=" "+aB.className+" ";
kQ=kQ.replace(" "+kZ+" "," ");
aB.className=trim(kQ);
}
else
{
aB.className="";
}
}
return aB;
};





function hasClass(aB,kZ)
{
return aB&&(" "+aB.className+" ").indexOf(" "+kZ+" ")>-1;
};







function getStyle(aB,aII)
{
var pP=aB&&(aB.currentStyle
?aB.currentStyle
:aB.ownerDocument.defaultView.getComputedStyle(aB,null));
return pP&&pP[aII]||"";
}







function setOpacity(aB,FN)
{
if(aB&&aB.tagName)
{
var bW=aB.style,
me=FN||0;











if(typeof bW.opacity=="undefined")
{
bW.filter=me==1
?"":["alpha(opacity=",me*100,")"].join("");
}
else
{
bW.opacity=me;
}
}
return aB;
}






function getOpacity(aB,FN)
{
if(aB&&aB.tagName)
{
var bW=aB.style,
me=1;









if(typeof bW.opacity=="undefined")
{
me=parseFloat(bW.filter.split("=").pop())/100;
}
else
{
me=parseFloat(bW.opacity);
}

if(isNaN(me))
{
me=1;
}
}
return me;
}






function getStrDispLen(aU)
{
var acU="__QMStrCalcer__";
var Ea=S(acU,getTop());
if(!Ea)
{
var bU=getTop().document.body;
insertHTML(
bU,
"afterBegin",
T([
'<div id="$id$" ',
'style="width:1px;height:1px;overflow:auto;*overflow:hidden;white-space:nowrap;',
'position:absolute;left:0;top:0;">','</div>']).replace({
id:acU
})
);
Ea=bU.firstChild;
}
Ea.innerHTML=htmlEncode(aU);
return Ea.scrollWidth;
}







function calcPos(aB,PU)
{
var cg=0,
dF=0,
bC=0,
bS=0;

if(aB&&aB.tagName)
{
var Qi=aB,
bp=aB.parentNode,
Tt=aB.offsetParent,
aI=aB.ownerDocument,
eA=aI.documentElement,
bU=aI.body;

dF+=aB.offsetLeft;
cg+=aB.offsetTop;
bC=aB.offsetWidth;
bS=aB.offsetHeight;

while(Tt&&bp&&bp!=eA&&bp!=bU)
{
if(calcPos.aws()&&Qi.style&&getStyle(Qi,"position")==="fixed")
{
break;
}

if(Tt==bp)
{
dF+=bp.offsetLeft;
cg+=bp.offsetTop;
Tt=bp.offsetParent;
}

dF-=bp.scrollLeft;
cg-=bp.scrollTop;
Qi=bp;
bp=bp.parentNode;

}

if(calcPos.aws()&&Qi.style&&getStyle(Qi,"position")==="fixed")
{
dF+=bodyScroll(aI,'scrollLeft');
cg+=bodyScroll(aI,'scrollTop');
}
}

return PU=="json"
?{top:cg,bottom:cg+bS,left:dF,
right:dF+bC,width:bC,height:bS}
:[cg,dF+bC,cg+bS,dF,bC,bS];
}

calcPos.aws=function()
{

var biR,
ad=this;
if(ad.awp==biR)
{
var bm=document.createElement("div");
bm.style.cssText="'position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;";
bm.innerHTML="<div style='position:fixed;top:20px;'></div>";
document.body.appendChild(bm);
ad.awp=!!{20:1,15:1}[bm.firstChild.offsetTop];
}
return ad.awp;
};







function calcPosFrame(aB,aj)
{
aj=aj||window;
var mp=calcPos(aB),
ae=getTop();
while(aj.frameElement&&aj!=ae)
{
var ei=calcPos(aj.frameElement);
for(var i=0;i<4;i++)
{

mp[i]+=ei[i&1?3:0]-bodyScroll(aj,i&1?"scrollLeft":"scrollTop");

}
aj=aj.parent;
}
return mp;
}










function calcAdjPos(ih,ha,fa,aj,bZ)
{
var QA=bodyScroll(aj,'clientHeight'),
aiy=bodyScroll(aj,'clientWidth'),
Bv=bodyScroll(aj,'scrollTop'),
SL=bodyScroll(aj,'scrollLeft'),
IZ=Bv+QA,
ZU=SL+aiy,
aG=[0,0,0,0];
if(bZ<2)
{

var va=SL-ih[1];
if(bZ==0&&ih[3]<ha
||bZ==1&&ZU-ih[1]>ha)
{

aG[1]=(aG[3]=ih[1])+ha;
}
else
{

aG[3]=(aG[1]=ih[3])-ha;
}
if(ih[0]+fa>IZ)
{


aG[0]=(aG[2]=(ih[2]-fa<Bv?IZ:ih[2]))-fa;
}
else
{

aG[2]=(aG[0]=ih[0])+fa;
}
}
else
{

if(bZ==2&&ih[0]-Bv<fa
||bZ==3&&IZ>ih[2]+fa)
{

aG[2]=(aG[0]=ih[2])+fa;
}
else
{

aG[0]=(aG[2]=ih[0])-fa;
}
aG[1]=ih[1];
aG[3]=ih[3];
}
return aG;
}







function bodyScroll(by,an,bn)
{
var aI=(by||window).document||by,
bU=aI.body,
rd=aI.documentElement;

if(typeof(bn)=="number")
{
bU[an]=rd[an]=bn;
}
else
{
if(an=="scrollTop"&&typeof by.pageYOffset!="undefined")
{
return by.pageYOffset;
}
else
{
return rd[an]||bU[an];
}
}
}








function htmlDecode(aU)
{
return aU&&aU.replace?(aU.replace(/&nbsp;/gi," ").replace(/&lt;/gi,"<").replace(/&gt;/gi,">")
.replace(/&amp;/gi,"&").replace(/&quot;/gi,"\"").replace(/&#39;/gi,"'")
):aU;
}






function htmlEncode(aU)
{
return aU&&aU.replace?(aU.replace(/&/g,"&amp;").replace(/\"/g,"&quot;")
.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\'/g,"&#39;")):aU;
}







function filteScript(aU,aKc)
{
return aU
&&aU.replace(/<script ?.*>(.*?)<\/script>/ig,
"<script>$1\n</script>"
).replace(/<script ?.*>([\s\S]*?)<\/script>/ig,aKc||"");
}






function textToHtml(eP)
{

return[
'<DIV>',
eP.replace((eP.indexOf("<BR>")>=0)?/<BR>/ig:/\n/g,
"</DIV><DIV>"
),
"</DIV>"
].join("")
.replace(new RegExp("\x0D","g"),"")
.replace(new RegExp("\x20","g"),"&nbsp;")
.replace(new RegExp("(<DIV><\/DIV>)*$","g"),"")
.replace(/<DIV><\/DIV>/g,"<DIV>&nbsp;</DIV>");
}






function textToHtmlForNoIE(eP)
{
return eP.replace(/\n/g,"<br>");
}






function htmlToText(eP)
{
return eP

.replace(/\n/ig,"")

.replace(/(<\/div>)|(<\/p>)|(<br\/?>)|(<\/li>)/ig,"\n");
}






function fixNonBreakSpace(aU)
{
return(aU||"").replace(/\xA0/ig," ");
}









function pasteHTML(zQ,BN,aHX,aj)
{
aj=aj||getMainWin();
zQ=filteScript(zQ);
var aQ=(typeof(BN)=="string"?S(BN,aj):BN);
if(!aQ||!zQ)
{
return false;
}
if(aHX)
{
aQ.innerHTML=zQ;
}
else
{
insertHTML(aQ,"afterBegin",zQ);
}
return true;
}







function T(fK,jq)
{
return new T.pF(fK,jq);
}









































function TE(fK,jq)
{
var ae=getTop();
if(ae.QMTmplChecker)
{
var ax=(new ae.QMTmplChecker(fK.join?fK:[fK],
jq)).getErrors();
if(ax.length)
{
debug(ax.join("\n"),"code");
}
}
return new T.pF(fK,jq,"exp");
}

T.pF=function(fK,jq,an)
{
this.rA=fK.join?fK.join(""):fK.toString();
this.ow=jq||"$";
this.Nx=an=="exp"
?this.Nh
:this.Pn;
};

T.pF.prototype=
{
toString:function()
{
return this.rA;
},

replace:function(ga,kB)
{
return this.Nx(ga,kB);
},

Pn:function(ga,Of)
{
var ad=this,
ln=ad.ow,
jt=ad.xU,
sm=ad.Pv,
yU=!jt;

if(yU)
{

jt=ad.xU=ad.rA.split(ad.ow);
sm=ad.Pv=ad.xU.concat();
}

for(var i=1,aw=jt.length;i<aw;i+=2)
{
sm[i]=ad.oI(yU?(jt[i]=jt[i].split("."))
:jt[i],ga,Of,ln);
}

return sm.join("");
},

Nh:function(ga,kB,bfV)
{
var ad=this,
km;

if(!ad.yz)
{
ad.LW();
}

if(typeof kB=="string")
{
var nJ=ad.yP[kB];
if(nJ)
{
km=typeof nJ!="function"
?ad.yP[kB]=ad.yx(nJ)
:nJ;
}
}
else
{
km=ad.yz;
}

try
{
return km&&km(ga,ad.Fg,
ad.oI,ad.ow,htmlEncode,bfV||kB)||"";
}
catch(ax)
{
return ax.message;
}
},




LW:function()
{
var ad=this,
fG=0,
eh=[],
rG=[],
rY=[],
Pb=ad.yP=[],
ln=ad.ow,
hZ=new RegExp(["","(.*?)",""].join(regFilter(ln)),"g"),
lE="_afG('$1'.split('.'),_oD,_aoD,_aoR)",
nw=ad.Fg=ad.rA.split(["","@",""].join(ln)),
bV;

for(var i=0,aw=nw.length;i<aw;i++)
{
bV=nw[i];

if(i%2==0)
{
eh.push("_oR.push(_aoT[",i,"].replace(_oD,_aoD));");
nw[i]=T(bV,ln);
}
else if(bV=="else")
{
eh.push("}else{");
}
else if(bV=="endsec")
{
if(rY.length)
{
var au=rY.pop();
Pb[au[0]]=eh.slice(au[1]);
}
}
else if(bV=="endfor")
{
rG.length&&eh.push(
"try{delete _oD._parent_;delete _oD._idx_;}catch(e){}}_oD=_oS",rG.pop(),";");
}
else if(bV=="endif")
{
eh.push("}");
}
else if(bV.indexOf("else if(")==0)
{
eh.push("}",bV.replace(hZ,lE),"{");
}
else if(bV.indexOf("if(")==0)
{
eh.push(bV.replace(hZ,lE),"{");
}
else if(bV.indexOf("for(")==0)
{
rG.push(++fG);
eh.push(
"var _sI",fG,",_oD",fG,",_oS",fG,"=_oD;",
bV.replace(hZ,
["_sI",fG," in (_oD",fG,"=",lE,")"].join("")),
"{",
"_oD=_oD",fG,"[_sI",fG,"];",
"if(!_oD){continue;}",
"try{_oD._parent_=_oS",fG,";",
"_oD._idx_=_sI",fG,";}catch(e){}"
);
}
else if(bV.indexOf("sec ")==0)
{
rY.push([bV.split(" ").pop(),eh.length]);
}
else if(bV.indexOf("eval ")==0)
{
eh.push("_oR.push(",bV.substr(5).replace(hZ,lE),");");
}
else if(bV.indexOf("html(")==0)
{
eh.push("_oR.push(_afE(",bV.substr(5).replace(hZ,lE),");");
}
}

ad.yz=ad.yx(eh);

return eh;
},

yx:function(PR)
{
try
{
return eval(
[
'([function(_aoD,_aoT,_afG,_aoR, _afE, A){var _oR=[],_oD=_aoD;',
PR.join(""),
'return _oR.join("");}])'
].join("")
)[0];
}
catch(kN)
{
return function(){return"compile err!"};
}
},

oI:function(rB,ga,Li,Hb)
{
var aw=rB.length,
bP,
fF;

if(aw>1)
{
try
{
fF=ga;
for(var i=0;i<aw;i++)
{
bP=rB[i];
if(bP=="_root_")
{
fF=Li;
}
else
{
fF=fF[bP];
}
}
}
catch(ax)
{
fF="";
}
}
else
{
fF={
"_var_":Hb,
"_this_":ga
}[bP=rB[0]]||ga[bP];
}

return fF;
}
};










var addEvent=(function()
{








function tG(eg,an,ua,iY)
{
if(eg&&ua)
{
if(eg.addEventListener)
{
eg[iY?"removeEventListener":"addEventListener"](
an,ua,false
);
}
else if(eg.attachEvent)
{
eg[iY?"detachEvent":"attachEvent"]("on"+an,
ua
);
}
else
{
eg["on"+an]=iY?null:ua;
}
}

return eg;
}

return function(eg,an,Yl,iY)
{
if(eg&&(eg.join||eg[Ly]))
{
E(eg,function(ak)
{
tG(ak,an,Yl,iY);
}
);
}
else
{
tG(eg,an,Yl,iY);
}

return eg;
};
}
)();








function addEvents(eg,sU,iY)
{
E(sU,function(tb,an)
{
addEvent(eg,an,tb,iY);
}
);
return eg;
}








function removeEvent(eg,an,ua)
{
return addEvent(eg,an,ua,true);
}







function removeEvents(eg,sU)
{
return addEvents(eg,sU,true);
}






function preventDefault(ah)
{
if(ah)
{
if(ah.preventDefault)
{
ah.preventDefault();
}
else
{
ah.returnValue=false;
}
}
return ah;
}






function stopPropagation(ah)
{
if(ah)
{
if(ah.stopPropagation)
{
ah.stopPropagation();
}
else
{
ah.cancelBubble=true;
}
}
return ah;
}






function getEventTarget(ah)
{
return ah&&(ah.srcElement||ah.target);
}











function getUserTarget(ak,ah,ef)
{
var ap=getEventTarget(ah);
while(ap&&isObjContainTarget(ak,ap))
{
if(attr(ap,ef))
{
return ap;
}
ap=ap.parentNode;
}
}











function fireMouseEvent(aB,Ne,ah)
{
if(aB)
{
ah=ah||{};
if(aB.dispatchEvent)
{

var aI=aB.ownerDocument,
am=aI.defaultView,
bY=aI.createEvent("MouseEvents");
bY.initMouseEvent(Ne,true,true,am,0,0,0,0,0,!!ah.ctrlKey,!!ah.altKey,!!ah.shiftKey,!!ah.metaKey,0,null);
aB.dispatchEvent(bY);
}
else
{


if(aB.tagName=="INPUT"&&aB.getAttribute("type")=="submit"&&Ne=="click")
{
aB.click();
}
else
{
var bY=aB.ownerDocument.createEventObject();
for(var aS=["ctrlKey","altKey","shiftKey","metaKey"],i=aS.length-1;i>=0;i--)
{
bY[aS[i]]=ah[aS[i]];
}
aB.fireEvent("on"+Ne,bY);
}
}
}
return aB;
}











function loadJsFile(eS,Kz,cZ,xh,pY)
{
var aI=cZ||document,
aqZ=typeof xh=="function",
bSr,fo,
qu=getTop().loadJsFile,
gK=qu.gK||(qu.gK={});

if(Kz)
{
for(var AS=GelTags("script",aI),
i=AS.length-1;i>=0;i--)
{
if(AS[i].src.indexOf(eS)!=-1)
{
if(aqZ)
{
var bP=AS[i].getAttribute("_key_");
if(gK[bP]===true)
{
callBack.call(AS[i],xh);
}
else
{
gK[bP].push(xh);
}
}
return AS[i];
}
}
}

fo=aI.createElement("script");
E(pY,function(lK,bc)
{
fo.setAttribute(bc,lK);
}
);

var bP=unikey();
fo.setAttribute("_key_",bP);
gK[bP]=[];

function axa()
{
var ad=this,bP=ad.getAttribute("_key_");
callBack.call(ad,xh);
E(gK[bP],function(hi){hi()});
gK[bP]=true;
}

(GelTags("head",aI)[0]||aI.documentElement)
.appendChild(extend(fo,

{
onload:axa,
onreadystatechange:function()
{
var ad=this;
({loaded:true,complete:true}[ad.readyState])&&axa.call(this);
}
},
{
type:"text/javascript",
charset:pY&&pY.charset||"gb2312",
src:eS
}
)
);

return fo;
}






function loadJsFileToTop(dE,jP)
{
var aKM=window.loadJsFile;

function aMe(eS)
{
aKM(dE+eS,true,getTop().document);
}

E(jP,aMe);
}









function loadCssFile(eS,Kz,cZ)
{
var aI=cZ||document;

if(Kz)
{
for(var agR=GelTags("link",aI),
i=agR.length-1;i>=0;i--)
{
if(agR[i].href.indexOf(eS)!=-1)
{
return;
}
}
}

var gs=aI.createElement("link"),
PF=GelTags("link",aI);

gs.type="text/css";
gs.rel="stylesheet";
gs.href=eS;

if(PF.length>0)
{
var YK=PF[PF.length-1];
YK.parentNode.insertBefore(gs,
YK.nextSibling);
}
else
{
(GelTags("head",aI)[0]||aI.documentElement).appendChild(gs);
}

return gs;
}








function replaceCssFile(ok,eS,cZ)
{
if(ok)
{
E(GelTags("link",cZ||document),function(Lq)
{
if(Lq&&Lq.href.indexOf(ok)!=-1)
{
removeSelf(Lq);
}
});
}

return loadCssFile(eS,false,cZ);
}









function QMAjax(aE,lV,mP,cq)
{
var ad=this,
ae=getTop(),
dO=cq,
dp;

function amF()
{
ad.onComplete(dO);
}

function aoc(bK)
{
ad.onError(dO,bK);
}

function ajs(ajy)
{
if(!dp)
{
dp=setTimeout(
function()
{
ad.abort();
},
ajy
);
}
}

function tN(bK)
{
if(dp)
{
clearTimeout(dp);
dp=null;
if(bK!="ok")
{
aoc(bK);
}
return true;
}
return false;
}



this.method=lV||"POST";
this.url=aE;
this.async=true;
this.content="";
this.timeout=mP;


this.onComplete=function()
{
};
this.onError=function()
{
};

if(!dO)
{
try
{
dO=new XMLHttpRequest;
}
catch(ax)
{
try
{
dO=new ActiveXObject("MSXML2.XMLHTTP");
}
catch(ax)
{
try
{
dO=new ActiveXObject("Microsoft.XMLHTTP");
}
catch(ax)
{
}
}
}
}



if(!dO)
{
return false;
}





this.abort=function()
{
tN("abort");
dO.abort();
};






this.send=function(ajq)
{
if(!this.method||!this.url||!this.async)
{
return false;
}

typeof this.url=="object"&&(this.url=this.url.replace({}));

var eY=this.method.toUpperCase(),
jC=getTop().getSid&&getTop().getSid();
this.abort();

dO.open(eY,

this.url+(jC&&eY=="POST"&&((this.url.split("?")[1]||"")+"&").indexOf("&sid=")==-1
?(this.url.indexOf("?")==-1?"?sid=":"&sid=")+jC:""),
this.async
);

if(eY=="POST")
{
dO.setRequestHeader("Content-Type",document.charset);
dO.setRequestHeader("Content-length",this.content.length);
dO.setRequestHeader("Content-Type",
"application/x-www-form-urlencoded"
);
}

ae.E(this.headers,function(aT,bc)
{
dO.setRequestHeader(bc,aT);
}
);

dO.onreadystatechange=function()
{
try
{
if(dO.readyState==4)
{
if(dO.status==200)
{
if(tN("ok"))
{
amF();
}
}
else
{
tN(dO.status);
}
}
}
catch(lQ)
{
tN(lQ.message);
}
}



ajs(this.timeout||15000);

try
{
if(eY=="POST")
{
dO.send(ajq||this.content);
}
else
{

dO.send(null);
}
}
catch(ax)
{
tN(ax.message);
}

return true;
}
};













QMAjax.send=function(aE,ag,amP)
{
var ae=getTop(),
bv=amP||new QMAjax,
ar=ag||{};
bv.url=aE;

ae.E("method,timeout,content,headers".split(","),function(bc)
{
if(ar[bc])
{
bv[bc]=ar[bc];
}
}
);

bv.onComplete=function(cq)
{
ae.callBack.call(cq,ag.onload,[true,ae.trim2(cq.responseText||""),cq]);

};

bv.onError=function(cq,bK)
{
ae.callBack.call(cq,ag.onload,[false,bK,cq]);
};

bv.send();
}

function includeAjax(aj)
{


var cF=[];
cF.push(QMAjax.toString());
cF.push(["var QMAjaxSend =",QMAjax.send.toString()].join(""));
globalEval(cF.join(""),aj);

}

var QMAjaxRequest=QMAjax;







function getErrMsg(cq,ajn)
{
var Fr="_AjaxErrorHTML_";
var lz=S(Fr);
if(!lz)
{
lz=document.createElement("div");
lz.id=Fr;
lz.style.display="none";
document.body.appendChild(lz);
}
lz.innerHTML=filteScript(cq.status==200?cq.responseText:"");
var vW=S(ajn);
return vW&&(vW.innerText||vW.textContent)||"";
}





function getHttpProcesser()
{
var ae=getTop(),
Ff=ae.gCurHttpProcesserId||0;

ae.gCurHttpProcesserId=(Ff+1)%30;

try
{
if(ae.gHttpProcesserContainer[Ff]!=null)
{
delete ae.gHttpProcesserContainer[Ff];
}
}
catch(ax)
{
ae.gHttpProcesserContainer={};
}

var aez=ae.gHttpProcesserContainer[Ff]=new ae.Image;
aez.onload=function()
{
return false;
};

return aez;
}







function goUrl(KP,aE,aKF)
{
try
{
var jT=(KP.contentWindow||KP).location,
aIb=jT.href.split("#"),
acZ=aE.split("#"),
awX=acZ[0]==aIb[0],
aq=awX?acZ[0]:aE;

if(aKF)
{
jT.href=aq;
}
else
{
jT.replace(aq);
}
}
catch(ax)
{
KP.src=aE;
}
}









function generateFlashCode(ao,Od,FQ,cE)
{
var acV=[],
PV=[],
Eb=[],
cR=cE||{},

Gk=T(' $name$=$value$ '),
aec=T('<param name="$name$" value="$value$" />'),
aLY=gbIsIE?T([
'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ',
'$codebase$ ','$attr$ $id$ >',
'$param$',
'<embed $embed$ type="application/x-shockwave-flash" ',
'$pluginspage$ ',' $name$ ></embed>',
'</object>'
]):T([
'<embed $embed$ type="application/x-shockwave-flash" ',
'$pluginspage$ ',' $name$ $id$ ></embed>'
]);

function GS(aC,lK)
{
return{
name:aC,
value:lK
};
}

cR.allowScriptAccess="always";
cR.quality="high";

for(var om in cR)
{
var bu=GS(om,cR[om]);
PV.push(aec.replace(bu));
Eb.push(Gk.replace(bu));
}

for(var om in FQ)

{
var bu=GS(om,FQ[om]);
acV.push(Gk.replace(bu));
Eb.push(Gk.replace(bu));
}

if(Od)
{
PV.push(aec.replace(GS("movie",Od)));
Eb.push(Gk.replace(GS("src",Od)));
}

return aLY.replace({
id:ao&&[' id="',ao,'"'].join(""),
name:ao&&[' name="',ao,'"'].join(""),
attr:acV.join(""),
param:PV.join(""),
embed:Eb.join(""),
codebase:location.protocol=="https:"
?''
:'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" ',
pluginspage:location.protocol=="https:"
?''
:'pluginspage="http://www.adobe.com/cn/products/flashplayer" '
}
);
}







function getFlash(ao,aj)
{
var am=aj||window,
bp=am[ao]||am.document[ao];
return bp&&(bp.length?bp[bp.length-1]:bp);
}

















function zoomFuncCreater(ag)
{














return function(ha,fa,aDI,aFL)
{
var Pf=aDI||ag.limitWidth||1,
OQ=aFL||ag.limitHeight||1,
QT=(ha/Pf)||1,
MJ=(fa/OQ)||1,
zd=[QT<1?"w":"W",MJ<1?"h":"H"]
.join(""),
ly=ag[zd]||ag.all,
aG={};

switch(ly)
{
case"stretch":
aG.width=Pf;
aG.height=OQ;
break;
case"zoomMaxMin":
case"zoomMinMax":
var YG=ha>fa?0:1;
ly=["zoomMax","zoomMin"][ly=="zoomMinMax"
?1-YG
:YG];
case"zoomMax":
case"zoomMin":
var XJ=Math[ly=="zoomMax"?"min":"max"](
MJ,QT
);
aG.width=Math.round(ha/XJ);
aG.height=Math.round(fa/XJ);
break;
case"none":
default:
aG.width=ha;
aG.height=fa;
break;
}

aG.left=Math.round((Pf-aG.width)/2);
aG.top=Math.round((OQ-aG.height)/2);

return aG;
};
}










function scrollIntoMidView(aB,cY,aAk,
avN,aDO)
{
if(!aB||!cY)
{
return false;
}


var YM=cY.tagName.toUpperCase()=="BODY",
aI=cY.ownerDocument,
rd=aI.documentElement;
if(YM&&rd.clientHeight)
{
cY=rd;
}

var AU=calcPos(aB)[0]-calcPos(cY)[0]-(YM?cY.scrollTop:0),
vY=AU,
GO=aB.offsetHeight,
Fk=cY.clientHeight,
Qg=avN||0;

if(aAk||vY<0
||vY+GO>Fk)
{
var IR=0,
ve;

if(Fk>GO+Qg)
{
if(aDO)
{
IR=vY<0?0
:(Fk-GO-Qg);
}
else
{
IR=(Fk-GO-Qg)/2
}
}

ve=cY.scrollTop=cY.scrollTop+AU-IR;
cY==rd&&(aI.body.scrollTop=ve);
}

return true;
}





function Gel(ao,aB)
{
return(aB||document).getElementById(ao);
}





function objectActive(aB)
{





}




















function inherit(Og,mT,OJ,NM,awe)
{
var abN=callBack(OJ,[mT.prototype]),
auf=abN.$_constructor_,
uM=function()
{
if(arguments[0]!="__inherit__")
{

var adl=callBack.call(this,awe,arguments)||{};
if(adl.bReturn)
{
return adl.vData;
}
else
{
if(!this.aKP)
{
this.constructor=arguments.callee;
this.aKP=true;
}
mT.apply(this,arguments);
callBack.call(this,auf,arguments);
}
}
};
extend(uM.prototype=new mT("__inherit__"),abN,{toString:function(){return"";}});
return extend(uM,NM,
{
name:Og,
superclass:mT
}
);
}







function inheritEx(Og,mT,OJ,NM)
{
var yK={},
uM=inherit(Og,mT,OJ,NM,
function()
{
var aR=typeof(arguments[0]),
aHz=aR=="string"||aR=="undefined";

return{
bReturn:aHz,
vData:uM.$_call.apply(uM,arguments)
};
}
);
return extend(
uM,
{


$_call:function(ao,aFR,at)
{
if(arguments.length==0)
{
return yK;
}
else
{
var cQ=yK[ao];
return arguments.length>1&&cQ?
callBack.call(cQ,cQ[aFR],at):cQ;
}
},

$_add:function(ao,az)
{
return yK[ao]=az;
},

get:function(ao)
{
return yK[ao];
},

$_del:function(ao)
{
delete yK[ao];
}
}
);
}

























function cacheByIframe(Oc,aY)
{
var bD=aY||{},
am=bD.win||getTop(),
aA=bD.id||unikey("_"),
ek=[bD.attrs],
eV=[];

for(var i=0,aw=Oc&&Oc.length||0;i<aw;i++)
{
for(var FY=Oc[i],j=2,azk=FY.length;j<azk;j++)
{
eV.push(FY[0],":",FY[1],FY[j],"|");
}
}

ek.push(' _file="',encodeURIComponent(eV.join("")),'"');
ek.push(' _header="',encodeURIComponent(bD.header||""),'"');
ek.push(' _body="',encodeURIComponent(bD.body||""),'"');

createIframe(am,getBlankUrl(am),
extend({},bD,
{
id:aA,
attrs:ek.join(""),
onload:function(aj)
{
var qf=this;
callBack.call(qf,bD.onload,[aj]);

(bD.destroy!=false||qf.getAttribute("destroy")=="true")
&&am.setTimeout(function(){removeSelf(qf);},100);
}
}
)
);
}





function getBlankUrl(aj)
{
var eC=(aj||getTop()).location,
gL="/zh_CN/htmledition/"+getFullResSuffix("domain.html");
return[gL,"?",
document.domain!=eC.host?encodeURIComponent(document.domain):"",
eC.href.indexOf(gL)!=-1?"&r="+Math.random():""].join("");
}








function clearCache()
{












arguments.length>0&&getTop().cacheByIframe(arguments,
{
destroy:false,
onload:function()
{
if(!this.getAttribute("destroy"))
{
this.setAttribute("destroy","true");
this.contentWindow.location.reload(true);
}
}
}
);
}








function preLoad(an,dE,jP,aeE)
{
if(window!=getTop())
{
getTop().preLoad.apply(this,arguments);
}
else
{
var ad=arguments.callee,
EW=ad.aAw=(ad.aAw||[]);

if(an&&jP)
{
for(var i=0,aw=jP.length;i<aw;i++)
{
EW.push([[an,dE,jP[i]]]);
}
}

if(!ad.agn&&EW.length>0)
{
ad.agn=true;

function auR()
{
ad.agn=false;
callBack(aeE,[EW.shift()[0][2]]);
setTimeout(function(){ad("","","",aeE);},100);
}

cacheByIframe(EW[0],{onload:auR});
}
}
}





function setDblClickNoSel(aB)
{
if(aB)
{
var NK="__MoUSeDoWnnoSEL__";
function getAtts()
{
return(aB.getAttribute(NK)||"").toString().split(",");
}
function setAtts(kf,an)
{
aB.setAttribute(NK,[kf,an]);
}
if(getAtts().length==1)
{

setAtts(0,"up");
addEvents(aB,{
mousedown:function(ah)
{
var hD=now(),
mK=parseInt(getAtts()[0]);
setAtts(hD,"down");

if(hD-mK<500)
{
preventDefault(ah);
}
},

mouseup:function()
{
setAtts(getAtts()[0],"up");
},
selectstart:function(ah)
{
if(getAtts().pop()=="up")
{
preventDefault(ah);
}
}
});
}
}

return aB;
}






































var 
gsMsgNoSubject="请填写邮件主题",
gsMsgNoMail="未选中任何邮件",
gsMsgSend="邮件正在发送中... ",
gsMsgSave="&nbsp;&nbsp;&nbsp;邮件正在保存到草稿箱...",
gsMsgSaveOk="邮件成功保存到草稿箱",
gsMsgAutoSave="&nbsp;&nbsp;&nbsp;邮件正在保存到草稿箱...",
gsMsgAutoSaveOk="邮件自动保存到草稿箱",
gsMsgSendErrorSaveOK="信件已被保存到草稿箱",
gsMsgSaveErr="邮件未能保存到草稿箱",
gsMsgNoSender="请填写收件人后再发送",
gsMsgNoCardSender="请填写收件人后再发送",
gsMsgNoCard="请选中贺卡后再发送",
gsMsgSettingOk="设置保存成功",
gsMsgLinkErr="网络应答失败",
gsMsgCheatAlert="系统会将此邮件移入到“垃圾邮件”中，并把邮件内容提交给邮箱管理员。\n\n您确定要举报此邮件吗？",
gsMsgSendTimeErr="您设置的发送时间不存在",
gsMsgMoveMailSameFldErr="不能移动到相同的目录";








function doPageError(ba,aE,tB)
{
var hm=arguments.callee.caller,
Np=hm&&hm.caller,
aIx=Np&&Np.caller,
aei=(hm||"null").toString(),
abR=(Np||"").toString(),
aeL=(aIx||"").toString(),
JW;

try
{

if(ba.indexOf(" Script ")!=-1)
{
return;
}


log("err:",ba,"-",aE,"-",tB);

if(ba.indexOf("flashUploader")!=-1)
{
var afm=qmFlash.getFlashVer();
for(var i in afm)
{
ba+="|"+afm[i];
}
}

if(!(aE&&aE.indexOf("/cgi-bin/mail_list?")!=-1&&tB==2)&&location.getParams)
{
var cR=location.getParams(aE);
aee=(aE||"").split("?")[0].split("/"),
XF=encodeURIComponent(
aei.replace(/[\r\n\t ]/ig,"")
.substr(0,50)
);

if(aee.length>0)
{
cR.cgi=aee.pop();
getTop().ossLog("delay","sample",[
"stat=js_run_err&msg=",
ba,
"&line=",
tB,
"&url=",
T('$cgi$?t=$t$&s=$s$').replace(cR),
"&func=",
XF,(gbIsIE?"":"_NIE")
].join(""));
}
else
{
JW=XF;
}
}

getTop().debug([
"error:",
ba,
"<br><b>line</b>:",
tB,
"<br><b>url</b>:",
aE,
"<br><b>function</b>:",
aei.substr(0,100),
abR?"<br><b>parent function</b>:"
+abR.substr(0,100):"",
aeL?"<br><b>parent parent function</b>:"
+aeL.substr(0,100):""].join(""),"error");
}
catch(ax)
{
JW=ax.message;
}

JW&&log("err:doPageError ",JW,"-",aE,"-",tB);







return location.host.indexOf("dev.")!=0;
}




var QMFileType={};

QMFileType.data={
doc:"doc",
docx:"doc",

xls:"exl",
xlsx:"exl",

ppt:"ppt",
pptx:"ppt",

pdf:"pdf",

txt:"txt",
log:"txt",
xml:"txt",
js:"txt",
css:"txt",
php:"txt",
asp:"txt",
aspx:"txt",
jsp:"txt",
vbs:"txt",
h:"txt",
cpp:"txt",

eml:"eml",

rar:"rar",
zip:"rar",
"7z":"rar",
arj:"rar",

wav:"mov",
mp3:"mov",
wma:"mov",
mid:"mov",
rmi:"mov",
ra:"mov",
ram:"mov",

mp1:"mov",
mp2:"mov",
mp4:"mov",
rm:"mov",
rmvb:"mov",
avi:"mov",
mov:"mov",
qt:"mov",
mpg:"mov",
mpeg:"mov",
mpeg4:"mov",
dat:"mov",
asf:"mov",
wmv:"mov",
"3gp":"mov",
ac3:"mov",
asf:"mov",
divx:"mov",
mkv:"mov",
ogg:"mov",
pmp:"mov",
ts:"mov",
vob:"mov",
xvid:"mov",

htm:"html",
html:"html",
mht:"html",

swf:"swf",
flv:"swf",

bmp:"bmp",
gif:"gif",
jpg:"jpg",
jpeg:"jpg",
jpe:"jpg",
psd:"psd",
pdd:"psd",
eps:"psd",

tif:"tu",
tiff:"tu",
ico:"tu",
png:"tu",
pic:"tu",
ai:"tu"
};






QMFileType.getFileType=function(DX)
{
return this.data[(trim(DX||"")).toLowerCase()]||"qita";
};






QMFileType.getFileTypeForFile=function(cf)
{
return this.getFileType((cf||"").split(".").pop());
};






var QMHistory={
Ar:{




},
Aj:{





}
};






QMHistory.getId=function(ao)
{
return ao;
};






QMHistory.getUrl=function(ao)
{
var bq=getTop().QMHistory.Aj[QMHistory.getId(ao)];
return bq&&bq.aq;
};





QMHistory.getLastRecordId=function()
{
return getTop().QMHistory.Ar.awK;
};






QMHistory.tryBackTo=function(ao)
{
try
{
var bu=getTop().QMHistory.Ar,
Gd=QMHistory.getId(ao),
ut=getTop().QMHistory.Aj[Gd],
YD=ut&&ut.aq,
Zn=ut
&&ut.aIt>=getTop().history.length,
Zo=ut&&bu.aCr==YD,
Zq=ut&&!bu.aCs;

function azD()
{
var aq=YD.split("#")[0];

if(getTop().location.getParams
&&getTop().location.getParams(aq)["folderid"]==4)
{
return goUrlMainFrm(aq);
}


if(gbIsIE&&gnIEVer==6)
{
return getTop().history.go(aq);
}
getTop().history.back();
};

if((gbIsIE&&(Zn||Zo)&&Zq)
||(!gbIsWebKit&&Zn&&Zo&&Zq))
{

azD();
return true;
}
}
catch(ax)
{

}

return false;
};





QMHistory.recordCurrentUrl=function(aj)
{
var aq=aj.location.href,
sx=getTop().QMHistory.Aj,
bu=getTop().QMHistory.Ar;

var aAs=bu.aCr=bu.aJF,
tE=bu.aJF=aq;

var wV,On;


for(var i in sx)
{
if(sx[i].aq==aAs)
{
wV=i;
}
if(sx[i].aq==tE)
{
On=i;
}
}


if(wV&&On)
{
delete sx[wV];
}


if(aq.indexOf("/mail_list")!=-1)
{
this.Lv("mail_list",aq);
}

if(aq.indexOf("t=readmail")!=-1)
{
this.Lv("readmail",aq);
}

if(aq.indexOf("/today")!=-1)
{
this.Lv("today",aq);
}
};





QMHistory.recordActionFrameChange=function(bK)
{
getTop().QMHistory.Ar.aCs=bK!="clear";
};






QMHistory.Lv=function(ao,aE)
{
var ae=getTop(),
Gd=QMHistory.getId(ao),
sx=ae.QMHistory.Aj,
bq=sx[Gd];

if(!bq)
{
bq=sx[Gd]=new ae.Object;
}

bq.aIt=history.length+1;
bq.aq=aE;

ae.QMHistory.Ar.awK=ao;
};












function QMCache(ag)
{
var mK=this.aEs=ag.timeStamp||1;
var vq=this.xd=ag.appName;

if(!mK||!vq)
{
throw{
message:"QMCache construct : config error!"
};
}

var FI=getTop().QMCache.tQ;
if(!FI)
{
FI=getTop().QMCache.tQ={};
}

var oN=FI[vq];
if(!oN)
{
oN=FI[vq]={
QN:"0",
iD:{}
};
}

if(this.aba(oN.QN,mK)==1)
{
oN.QN=mK;
}
};





QMCache.prototype.isHistoryTimeStamp=function()
{
return this.aba(
getTop().QMCache.tQ[this.xd].QN,
this.aEs
)!=0;
};






QMCache.prototype.setData=function(bc,aT)
{
getTop().QMCache.tQ[this.xd][bc]=aT;
};

QMCache.prototype.getAll=function(bc)
{
return getTop().QMCache.tQ[this.xd];
}






QMCache.prototype.getData=function(bc)
{
return getTop().QMCache.tQ[this.xd][bc];
};





QMCache.prototype.delData=function(bc)
{
delete getTop().QMCache.tQ[this.xd][bc];
};







QMCache.prototype.aba=function(Yx,YA)
{
if(Yx==YA)
{
return 0;
}
return Yx>YA?-1:1;
};








var QMMailCache=
{
xy:now()
};







QMMailCache.newCache=function(oi,Mm)
{
var uc=false,
ae=getTop();

if(!ae.gMailListStamp||ae.gMailListStamp<Mm)
{
ae.gMailListStamp=Mm;
if(!ae.goMailListMap)
{
ae.goMailListMap=new ae.Object;
}
uc=true;
}
else if(ae.gnExpireTimeStamp>=Mm)
{







reloadFrm(oi);
}

return oi["isNewQMMailCache"+this.xy]=uc;
};




QMMailCache.setExpire=function()
{
getTop().gnExpireTimeStamp=getTop().gMailListStamp;
};













QMMailCache.addData=function(av,cE)
{
if(!av||!getTop().goMailListMap)
{
return;
}

if(!this.hasData(av))
{
getTop().goMailListMap[av]={
oTagIds:{},
bUnread:null,
star:null,
reply:null
};
}

if(!cE)
{
return;
}

var hp=getTop().goMailListMap[av];
for(var i in cE)
{
switch(i)
{
case"removeTagId":
hp.oTagIds[cE[i]]=0;
break;
case"addTagId":
hp.oTagIds[cE[i]]=1;
break;
default:
if(typeof cE[i]!="undefined")
{
hp[i]=cE[i];
}
break;
}
}
};





QMMailCache.clearData=function(av)
{
if(getTop().goMailListMap)
{
getTop().goMailListMap[av]={
oTagIds:{},
star:null,
reply:null
}
}
};





QMMailCache.delData=function(av)
{
if(getTop().goMailListMap)
{
delete getTop().goMailListMap[av];
}
};






QMMailCache.hasData=function(av)
{
return getTop().goMailListMap&&getTop().goMailListMap[av]!=null;
};






QMMailCache.getData=function(av)
{
return getTop().goMailListMap&&getTop().goMailListMap[av];
};







QMMailCache.addVar=function(Fs,bn)
{
return getMainWin()[Fs]=this.getVar(Fs,0)+bn;
};







QMMailCache.getVar=function(Fs,aMA)
{
return getMainWin()[Fs]||aMA;
};






QMMailCache.isRefresh=function(oi)
{
return oi["isNewQMMailCache"+this.xy];
};









function rdVer(uk,yf,Pg)
{

var QV,hy,rR,Mg,
bq=new QMCache({appName:"readmail"});

if(yf==-1)
{
return bq.delData(uk);
}

QV=bq.getData("on");
if(uk=="on")
{
return yf==0?(QV||0):(bq.setData("on",yf));
}

if(!QV||!uk)
{
return 0;
}

Mg=uk=="BaseVer";

rR=bq.getData("BaseVer");
if(!rR||(Mg&&yf==1))
{

rR=rR||(rdVer("on",0)+Math.random().toFixed(2));
rR+=10;
bq.setData("BaseVer",rR);
}

if(Mg)
{
return rR;
}

hy=(bq.getData(uk)||0);
var agi=(!hy||yf==1);

if(agi||Pg)
{
if(agi)
{
hy+=10000;
}
if(Pg)
{
hy=Math.floor(hy/10000)*10000+parseInt(Pg,10)%10000;
}
bq.setData(uk,hy);
}
return hy;
}

rdVer.batch=function(an)
{
var bq=new QMCache({appName:"readmail"}),
hZ=new RegExp("^"+an),
hp=bq.getAll();

E(hp,function(Rk,av)
{
if(hZ.test(av))
{
rdVer(av,1);
}
}
);
}






rdVer.check=function(aj,av,KD)
{
if(aj)
{
var eC=aj.location,
av=av||eC.getParams()["mailid"],
KD=KD||eC.getParams()["ver"]||0,
adV=rdVer(av,0);

if(adV>KD)
{
goUrl(aj,cookQueryString(eC.href,{ver:adV}),true);
return true;
}
else
{
return false;
}
}
}






rdVer.log=function(av,Dp)
{
var KG=new QMCache({appName:"preload"}),
Rl=new Date().getTime(),
hO=KG.getData(av),
KU=hO&&(Rl-hO)<rdVer.maxage(av)*1000;

switch(Dp)
{
case"pre":
if(!KU)
{
KG.setData(av,Rl);
ossLog("delay","all","stat=rdcache&type=281&locval=,rdcache,preload,1");
}
break;
case"hit":
if(KU)
{
ossLog("delay","all","stat=rdcache&type=291&locval=,rdcache,hit,1");
}
if(hO)
{
KG.delData(av);
}
break;
}
return KU;
}

rdVer.isPre=function(HG)
{

return!(HG>2&&HG<7||HG==9||HG==11);
}


rdVer.preRD=function(zW,Jc)
{
var adK=function()
{
preLoad("html","/cgi-bin/readmail?",zW,function(eS)
{
rdVer.log(location.getParams(eS)["mailid"],"pre");
}
);
}
if(zW&&zW.length>0)
{
Jc=Jc||40;

zW=zW.slice(0,rdVer("on",0)>1?2:1);

if(zW.length>0)
{
if(Jc)
{
setTimeout(adK,Jc);
}
else
{
adK();
}
}
}
}

rdVer.maxage=function(av)
{
if(!av)
{
return 0;
}
return(av[0]=="@"||av[0]=="C"?10:60)*60;
}










rdVer.url=function(av,gR,avA,bZ,awW,Am,
PE,KR,agg)
{
var aoh=T('/cgi-bin/$cgi$?folderid=$folderid$$s$&t=$t$&mailid=$mailid$$cache$&sid=$sid$'),
yC,
qb,nU,aq,xY="readmail";

if(PE)
{
qb="readmail&s=draft";
}
else if(bZ===0)
{
qb=KR==100?"compose_card&s=draft"
:"compose&s=draft";
}
else if(gR=="9")
{
qb="sms_list_v2";
xY="readtemplate";
}
else if(gR=="11"||/^(LP|ZP)/.test(av))
{
xY="bottle_panel";
qb="bottle";
}
else
{
switch(av.charAt(0))
{
case'C':
qb="readmail_conversation";
break;
case'@':
qb="readmail_group";
break;
default:
qb="readmail";
break;
}
yC=true;
}

if(awW)
{
nU=["&newwin=true","&compose_new=compose"][bZ?0:1];
}
else
{
nU=["","&s=from_unread_list","&s=from_star_list"][
Am!=1&&Am!=2?0:Am];
}

var hy=yC?rdVer(av,0,avA):0;

if(!hy&&agg)
{
return"";
}

aq=aoh.replace(
{
cgi:xY,
mailid:av,
folderid:gR,
t:qb,
s:nU,
sid:getSid(),
cache:hy?T("&mode=pre&maxage=$maxage$&base=$base$&ver=$ver$").replace(
{
maxage:rdVer.maxage(av),
base:rdVer("BaseVer",0),
ver:hy
}
):""
}
);

return agg?aq.split("?")[1]:aq;
}









function setGlobalVarValue(bc,fe,aAG)
{
var ae=getTop();

if(!ae.goDataBase)
{
ae.goDataBase=new ae.Object;
}

if(bc&&!aAG)
{
ae.goDataBase[bc]=fe;
}

return fe;
}






function getGlobalVarValue(bc)
{
return getTop().goDataBase&&getTop().goDataBase[bc];
}






function hideWindowsElement(fm,aj)
{
aj=aj||getMainWin();
if(!gbIsIE||gnIEVer>6||(aj.gbIsHasHideElements||false)!=(fm||false))
{
return;
}

getTop().setGlobalVarValue("WINDOWS_ELEMENT_NOT_DISPLAY",fm?"":"true");

aj.gbIsHasHideElements=!fm;

var bU=aj.document.body;

E(aj.QMReadMail?["select","object","embed"]:["select"],
function(aDS)
{
E(GelTags(aDS,bU),
function(aB)
{
if(fm)
{
aB.style.visibility=
aB.getAttribute("savevisibility");
}
else
{
aB.setAttribute("savevisibility",
getStyle(aB,"visibility"));
aB.style.visibility="hidden";
}
}
);
}
);
}






function controlWindowsElement()
{
var aKr=getTop().getGlobalVarValue("WINDOWS_ELEMENT_NOT_DISPLAY");
if(aKr=="true")
{
hideWindowsElement(false);
}
}





function setKeepAlive(aj)
{
if(getTop().gKeepAliveNum==null)
{
getTop().gKeepAliveNum=0;
}

if(aj==null||aj.gbIsSetKeepAlive==true)
{
return;
}

aj.gbIsSetKeepAlive=true;
getTop().gKeepAliveNum++;

if(getTop().gKeepAliveTimer==null)
{

getTop().gKeepAliveTimer=getTop().setInterval(
function()
{
getTop().runUrlWithSid("/cgi-bin/readtemplate?t=keep_alive");
},
15*60*1000
);
}
addEvent(
aj,
"unload",
function()
{
aj.gbIsSetKeepAlive=false;
getTop().gKeepAliveNum--;
if(getTop().gKeepAliveNum==0)
{
getTop().clearInterval(getTop().gKeepAliveTimer);
getTop().gKeepAliveTimer=null;
}
}
);
}







function encodeNick(pV)
{
return pV&&pV.replace(/\\/g,"\\\\").replace(/\"/ig,"\\\"").replace(/\'/ig,"\\\'")||"";
}






function decodeNick(pV)
{
return pV&&pV.replace(/\\\"/ig,"\"").replace(/\\\\/ig,"\\")||"";
}



var QMPageInit={
aGQ:function(aj)
{
var ae=getTop();
if(aj==ae)
{
var hm=new(ae.Function)(
"var _oLogs = arguments.callee.logs;_oLogs.length > 500 && _oLogs.shift();"+
"_oLogs.push([+new Date, [].slice.apply(arguments).join('')].join(' '));");
hm.logs=new(ae.Array);
return hm;
}
else
{
return ae.log||(ae.log=this.aGQ(ae));
}
},

aiQ:function(aKl)
{
return function()
{
try
{
var NY=arguments.length,
QG=arguments[NY-1],
acl=QG>100000;
if(typeof(QG)=="number"
&&(acl&&QG!=getTop().g_uin))
{
return;
}
}
catch(e)
{

return;
}

if(getTop().Console)
{
if(NY==0||(NY==1&&acl))
{
if(location.host=="dev.mail.qq.com")
{
debugger;
}
}
else
{
try
{
var XX=getTop().Console[aKl];
XX.add.apply(XX,arguments);
}
catch(ax)
{
}
}
}
}
},

awQ:function(aj)
{
return function(aC,Hr,bK,aGC,ce)
{
if(getTop().QMTimeTracer&&(!ce||ce==getTop().g_uin))
{
getTop().QMTimeTracer.getTracer().trace(aC,Hr,
aj,bK,aGC
);
}
}
},

aCZ:function(aj)
{
var jT=aj.location;
jT.aer=false;
jT.params={};
jT.getParams=function(aE)
{
if(!aE&&this.aer)
{
return this.params;
}

var cR={},
Yg=aE
?aE.substr(aE.indexOf("?")+1).split("#")[0]
:this.search.substr(1);

if(Yg)
{
E(Yg.split("&"),function(fc)
{
var gy=fc.split("=");
cR[gy.shift()]=unescape(gy.join("="));
}
);
}

if(!aE)
{
this.params=cR;
this.aer=true;
}

return cR;
};

var fP=jT.href,
ae=getTop();

if(aj==ae
&&getSid()
&&fP.indexOf("/cgi-bin/")>-1
&&fP.indexOf("open.mail.qq.com")<0
&&fP.indexOf("/frame_html?")==-1
&&fP.indexOf("/log")==-1
&&(fP.indexOf("/ftnExs_")==-1||fP.indexOf("/ftnExs_files")>-1)
&&!aj.gbIsNoCheck
&&jT.getParams()["nocheckframe"]!="true")
{
if(fP.indexOf("/cgi-bin/bizmail")==-1)
{

goNewWin(jT,true,!aj.gbSupportNW);
}
else
{
goNewWin(jT,true,false,{frametmpl:"dm_frame",frametmplparam:"&dmtype=bizmail"});
}
}

else if(aj!=ae&&ae.bnewwin&&aj==getMainWin())
{
if(!aj.gbSupportNW)
{
goNewWin(jT,true,true);
}
else if(jT.getParams()["newwin"]!="true")
{
aj.location.replace(fP+"&newwin=true");
}
}
},

awF:function(ah,aAg)
{
var bJ=ah.srcElement||ah.target,
Wi=ah.ctrlKey,
bRw=ah.altKey,
kU=ah.shiftKey,
dC=ah.keyCode,
zq=bJ.type=="text"
||bJ.tagName=="TEXTAREA",
aHA=aAg
&&(bJ.tagName=="INPUT"&&bJ.type!="button"),
ayP=bJ.tagName=="BUTTON"||bJ.type=="button";

switch(dC)
{

case 8:

if(!zq&&goBackHistory())
{
preventDefault(ah);
}
break;

case 13:


if(!ayP&&((!zq&&QMReadedItem.read(bJ))||aHA))
{
preventDefault(ah);
}
break;

case 37:

case 39:

if(Wi)
{
goPrevOrNextMail(dC==39);
preventDefault(ah);
}
break;

case 38:

case 40:

case 188:

case 190:

if(!zq)
{
var TY=dC==38||dC==188;
if(QMReadedItem.move(!TY))
{
preventDefault(ah);
}
}
break;

case 46:


if(!zq)
{
var aaa=S(
kU?"quick_completelydel":"quick_del",
getMainWin()
),
aab=kU?S("quick_del",getMainWin()):null,
aac=S("del",getMainWin());
if(isShow(aaa)||isShow(aab)||isShow(aac))
{
preventDefault(ah);
fireMouseEvent((aaa||aab||aac),"click");
}
}
break;

case 88:

if(!zq&&QMReadedItem.check(kU))
{
preventDefault(ah);
}
break;
}
},

aKx:function(aj)
{
aj.Log=aj.log=this.aGQ("log");
aj.Debug=aj.debug=this.aiQ("debug");

aj.Trace=aj.trace=this.awQ(aj);
aj.onerror=doPageError;
},

azf:function(aj)
{
if(aj!=getTop()&&aj==getMainWin())
{

getTop().QMHistory.recordCurrentUrl(aj);
getTop().QMHistory.recordActionFrameChange("clear");


var fP=aj.location.href,
Uh=fP.indexOf("t=sms_list_v2")>0,
bjo=fP.indexOf("t=bottle")>0;

addEvent(aj,"unload",
function()
{

showProcess(0);
if(isshowMsg()&&getTop().gMsgDispTime
&&now()-getTop().gMsgDispTime>2000)
{
hiddenMsg();
}

Uh&&startWebpush(2);

}
);
Uh&&closeWebpush(2);
bjo&&closeWebpush(4);
getTop().QMWebpushTip&&getTop().QMWebpushTip.hideAll(3000);

aj.setTimeout(function()
{



















if(!(getTop().QQPlusMail&&getTop().QQPlusMail.getPageTitle()))
{
aj.document.title&&(getTop().document.title=aj.document.title);
}

},
200
);
}
},

bbj:function(aj)
{

if(aj==getTop()&&aj.location.href.indexOf("/frame_html")!=-1)
{



















addEvents(aj,{
load:function(e)
{
var bU=getTop().document.body;

function avQ(ah)
{
var bJ=ah.srcElement||ah.target;

for(var xF=0;bJ&&xF<3;
bJ=bJ.parentNode,xF++)
{
if(bJ.tagName=="A")
{
break;
}
}

return bJ||{};
};

function bqO(ah)
{
if((ah.target||ah.srcElement)==bU)
{
preventDefault(ah);
}
}

function axc(ah)
{
var bJ=avQ(ah);
if(bJ.tagName=="A")
{
if(bJ.getAttribute("initlized")!="true")
{
bJ.setAttribute("initlized","true");

var aEc=bJ.onclick;
bJ.onclick=function(bgI)
{
var bY=bgI||getTop().event,
dp=parseInt(bJ
.getAttribute("md"));
if(!isNaN(dp)&&dp>0)
{
getTop().clearTimeout(dp);
bJ.setAttribute("md","0");

var kU=bY.shiftKey,
Wi=bY.ctrlKey,
baJ=bY.metaKey,
aBh=kU||Wi||baJ,
aGR=trim(bJ.href)
.indexOf("http")==0;

function aMa()
{
if(aEc)
{
aEc.call(bJ);
preventDefault(bY);
}

if(aGR)
{
if(aBh&&bJ.href.indexOf("java")!=0)
{
open(bJ.href);
preventDefault(bY);
}
else
{
switch(bJ.target)
{
case"mainFrame":
var aq=bJ.href;
goUrlMainFrm(
aq+(aq.indexOf("?")!=-1?"#stattime="+now():""),
false
);
preventDefault(bY);
break;
case"_parent":
case"_self":
try
{
aj.location.href=bJ.href;
}
catch(HI)
{
}
preventDefault(bY);
break;
default:
break;
}
}
}
};

if(!aBh
&&bJ.getAttribute("nocheck")!="true"
&&(!aGR||bJ.target!="_blank"))
{
preventDefault(bY);
QMPageInit
.aed(aMa);
}
else
{
aMa();
}
}
};
}

bJ.setAttribute(
"md",
getTop().setTimeout(
function()
{
bJ.setAttribute("md","0");
},
1000
)
);
}

}

function Re(ah)
{
var bJ=avQ(ah);
if(bJ.tagName=="A"
&&bJ.getAttribute("initlized")!="true")
{
preventDefault(ah);
}
}

addEvents(bU,
{
mousewheel:bqO,
mousedown:axc,
keydown:axc,
click:Re
}
);
}


});
}
},

aEL:function(aj,ah)
{
var qh,
aga=["u","1","2","3","4"],
ap=getEventTarget(ah),
Yu=function(ak)
{
if(ak&&ak.getAttribute)
{
var Kl=ak.getAttribute("t");
for(var i in aga)
{
if(aga[i]==Kl)
{
return Kl;
}
}
}
};

qh=Yu(ap);

while(ap&&ap!=aj.document.body&&qh)
{
if(qh=="u")
{
ap=ap.parentNode;
qh=Yu(ap)||qh;
}
else
{
return ap;
}
}
return null;
},

Zz:function(an,aj,ah)
{
var ap=this.aEL(aj,ah);
if(ap)
{
var qh=ap.getAttribute("t");
switch(qh)
{
case"1":
case"2":
case"3":
waitFor(
function()
{
return getTop().QMProfileTips;
},
function(kk)
{
if(kk)
{
getTop().QMProfileTips.doMouseEvent(an,aj,ap);
}
}
);
break;
case"4":
var TK="simpletip",
aEY="stitle",
aMh="smt_hide";
if(ap.title)
{
ap.setAttribute(aEY,ap.title);
ap.title="";
}
if(an=="over")
{
var gA=ap.getAttribute(aEY),
mS=S(TK,aj);
if(!mS)
{
insertHTML(aj.document.body,"afterBegin",'<div id="'+TK+'" class="smt_container smt_u smt_hide"><span class="smt_inner"></span></div>');
mS=S(TK,aj);
}
if(mS)
{
mS.firstChild.innerHTML!=gA&&(mS.firstChild.innerHTML=gA);
rmClass(mS,aMh);

var De=calcPos(ap),
aLn=(De[1]+De[3])/2;
De[0]-=3;
De[2]+=3;

var	bS=parseInt(mS.offsetHeight),
bC=parseInt(mS.offsetWidth),
bI=calcAdjPos([De[0],aLn,De[2],aLn],bC,bS,aj,2),
kQ=mS.className,
azO=bI[2]==De[0]?"smt_d":"smt_u";
if(kQ.indexOf(azO)<0)
{
mS.className="smt_container "+azO;
}
mS.style.top=bI[0]+"px";
mS.style.left=(bI[3]-bC/2)+"px";
}
}
else if(an=="out")
{
var mS=S(TK,aj);
mS&&addClass(mS,aMh);
}
break;
}
}
},

brm:function(aj)
{
aj.call=function()
{
var aS=arguments,avP=[],i,l,
ek=aS[0].split("."),
ad=hm=aj;

for(i=1,l=aS.length;i<l;i++)
{
avP.push(aS[i]);
}

for(i=0,l=ek.length;i<l&&hm;i++)
{
ad=hm;
hm=hm[ek[i]];
}

if(typeof hm=="function")
{
return hm.apply(ad,avP);
}
}
},

aJI:function(aj)
{
var ad=this;
aj.setTimeout(
function()
{
var aLc=(aj.location.getParams
&&aj.location.getParams()["t"]||"")
.indexOf("compose")==0;

addEvents(aj.document,
{
mousedown:hideMenuEvent,
touchend:getTop().iPadCloseMenu||function(){},
keydown:function(ah)
{
hideMenuEvent(ah);
ad.awF(ah,aLc);
},
click:function(ah)
{
hideEditorMenu();


getTop().QMWebpushTip&&getTop().QMWebpushTip.hideAll(3000);
},
mouseover:function(ah)
{
ad.Zz("over",aj,ah);
},
mouseout:function(ah)
{
ad.Zz("out",aj,ah);
}
}
);
},100
);
},

HN:function(aj)
{
aj=aj||window;

if(aj.gIsInitPageEventProcess)
{
return;
}

aj.gIsInitPageEventProcess=true;

var ej=0;
try
{
ej=1;
this.aKx(aj);

ej=2;
this.aCZ(aj);

ej=3;
this.azf(aj);

ej=4;
this.bbj(aj);

ej=5;
this.aJI(aj);

ej=6;
this.brm(aj);
}
catch(ax)
{
doPageError(ax.message,aj.location.href,
"initPageEvent_processid:"+ej
);
}

try
{

aj.document.execCommand("BackgroundImageCache",false,true);
}
catch(ax)
{
}
},

aed:function(Cq)
{
try
{
if(getMainWin().exitConfirm)
{
return getMainWin().exitConfirm(Cq);
}
}
catch(ax)
{
debug(ax.message);
}


Cq();
}
}





function initPageEvent(aj)
{
QMPageInit.HN(aj);
}

(function()
{
initPageEvent(window);
})();






function getTopWin()
{
return getTop();
}





function getMainWin()
{
return F("mainFrame",getTop())||getTop();
}





function getActionWin()
{
return F("actionFrame",getTopWin());
}





function getLeftWin()
{
return getTop();
}
var GetLeftWin=getLeftWin;





function getLeftDateWin()
{
return F("leftFrame",getTop());
}





function getSignatureWin()
{
return F("signatureFrame",getTop());
}






function reloadFrm(aj)
{
if(aj&&aj!=getTop())
{
try
{
if(aj.location.search)
{


var TQ=aj.location.href.split("#")[0].split("?"),
aCg="r="+now();
TQ[1]=!TQ[1]?aCg:
(("&"+TQ[1]+"&").replace(/&r=.*?&/,"&")+aCg).slice(1);
aj.location.replace(TQ.join("?"));
return true;
}
}
catch(ax)
{
}
}
return false;
}




function reloadLeftWin()
{
var mz;
if(!reloadFrm(getLeftDateWin())&&(mz=S("leftFrame",getTop())))
{
mz.src=T('/cgi-bin/folderlist?sid=$sid$&r=$rand$').replace(
{
sid:getSid(),
rand:Math.random()
}
);
}
}








function reloadAllFrm(bTX,bCe,FA,GE)
{
function wy(aCV)
{
var afb=arguments.callee;
getTop().setTimeout(aCV,afb.fR);
afb.fR+=200;
}
wy.fR=0;

if(GE==null||GE)
{
wy(
function()
{
reloadFrm(getMainWin());
}
);
}

if(FA==null||FA)
{
wy(
function()
{
reloadFrm(reloadLeftWin());
}
);
}
}






function reloadFrmLeftMain(FA,GE)
{
reloadAllFrm(false,false,FA,GE);
}













function goUrlTopWin(aE,awR)
{

goUrl(getTop(),aE,!awR);
}







function goUrlMainFrm(aE,aEk,ZS)
{
if(aEk!=false)
{
reloadLeftWin();
setTimeout(
function()
{
goUrl(S("mainFrame",getTop())||getTop(),aE,!ZS);
},
300
);
}
else
{
goUrl(S("mainFrame",getTop())||getTop(),aE,!ZS);
}
}

function aXd(Na)
{
return Na&&Na.substr&&("?"+(["&",Na.substr(1),"&"].join("")
.replace(/&sid=.*?&/ig,"&")
.replace(/&loc=.*?&/ig,"&")
.replace(/&newwin=true/ig,"&")
.slice(1,-1)));
}










function goNewWin(He,btE,bcN,Uv)
{
var Lk="",
WZ="",
oH="";

if(typeof(He)=="object")
{
Lk=He.pathname;
WZ=He.search;
}
else
{
var lS=He.indexOf("?");
Lk=He.substring(0,lS);
WZ=He.substr(lS);
}

if(Uv)
{
oH=Uv.frametmpl;
}
else
{
oH=bcN?"frame_html":"newwin_frame";
}

var avR='';
if(Lk.indexOf('reader_')>-1)
{
avR=getTop().location.protocol+"//mail.qq.com";
}

var aq=T(avR+'/cgi-bin/frame_html?t=$t$&sid=$sid$&url=$url$').replace(
{
t:oH,
sid:getSid(),
url:encodeURIComponent(Lk+aXd(WZ))
}
);

if(Uv)
{
aq+=Uv.frametmplparam;
}

if(btE)
{
goUrlTopWin(aq,true);
}
else
{

window.open(aq);
}
}






function isMaximizeMainFrame()
{
return getTop().maximizeMainFrame.azJ;
}






function maximizeMainFrame(FB)
{
var RB=S("mainFrame",getTop()),
FD=S("leftPanel",getTop()),
ED=S("imgLine",getTop());

if(!RB||!ED||!FD
||FB!=2&&(FB==0)==!isMaximizeMainFrame())
{
return false;
}

var yE=getTop().maximizeMainFrame,
pQ=yE.azJ=FB==2
?!isMaximizeMainFrame():(FB?true:false);

if(pQ)
{
yE.axW=FD.style.width;
yE.ayX=ED.parentNode.style.cssText;
}

RB.parentNode.style.marginLeft=
pQ?"5px":yE.axW;
FD.parentNode.style.cssText=
pQ?"border-left:none;":"";
ED.parentNode.style.cssText=
(pQ?"border-left:none;margin-left:0;padding:0;":"")+yE.ayX;

show(FD,!pQ);
show(ED,!pQ);
show(S("qqplus_panel",getTop()),!pQ);
show(S("folder",getTop()),!pQ);
}







function filteSignatureTag(aU,bK)
{
var dv=typeof aU=="string"?aU:"";

if(bK=="2LOWCASE")
{
return dv.replace(/<sign(.*?)\/>/ig,"<sign$1>")
.replace(/<qzone(.*?)\/>/ig,"<qzone$1>")
.replace(/<taotao(.*?)\/>/ig,"<taotao$1>")
.replace(/<\/sign>/ig,"</sign>")
.replace(/<\/qzone>/ig,"</qzone>")
.replace(/<\/taotao>/ig,"</taotao>")
.replace(/<(\/?)includetail>/ig,"<$1tincludetail>");
}
if(bK=="FILTE<:")
{
return dv.replace(/<:sign.*?>/ig,"")
.replace(/<:qzone.*?>/ig,"")
.replace(/<:taotao.*?>/ig,"")
.replace(/<:includetail.*?>/ig,"");
}
else
{
return dv.replace(/<\/?sign.*?>/ig,"")
.replace(/<\/?qzone.*?>/ig,"")
.replace(/<\/?taotao.*?>/ig,"")
.replace(/<\/?includetail.*?>/ig,"");
}
}





function getSignatureHeader()
{
return T([
'<div style="color:#909090;font-family:Arial Narrow;font-size:12px">',
'------------------',
'</div>'
]);
}




function checkSignatureFrame()
{
if(getTop().gLoadSignTimeout)
{
getTop().clearTimeout(getTop().gLoadSignTimeout);
getTop().gLoadSignTimeout=null;
}

if(getSignatureWin())
{
getTop().gSignStatus="finish";

var EM=true;
try
{
if(!getSignatureWin().getRealUserSignature)
{
EM=false;
}
}
catch(ax)
{
EM=false;
}


if(!EM&&getTop().reloadSignTimeout==null)
{
getTop().gReloadSignTimeout=getTop().setTimeout(
"getTop().reloadSignature( true );",5000
);
}
else if(EM)
{


bindAccount();
}
}
}




function loadSignature()
{
try
{
if(!S("signatureFrame",getTop())
||S("signatureFrame",getTop()).src.indexOf("getcomposedata")==-1)
{
reloadSignature();
}
}
catch(ax)
{
return;
}

if(getTop().gSignStatus!="finish")
{
throw{
message:"get sign error..."
};
}
}





function reloadSignature(AJ)
{
if(window!=getTop())
{
return getTop().reloadSignature(AJ);
}

if(AJ)
{
if(getTop().gnReloadSignatureErrorTime==null)
{
getTop().gnReloadSignatureErrorTime=0;
}

if(getTop().gnReloadSignatureErrorTime>4)
{
return;
}

getTop().gnReloadSignatureErrorTime++;
}

if(getTop().gReloadSignTimeout)
{
getTop().clearTimeout(getTop().gReloadSignTimeout);
getTop().gReloadSignTimeout=null;
}

getTop().gSignStatus="load";

removeSelf(S("signatureFrame",getTop()));

var aq=T(["/cgi-bin/getcomposedata?t=signature&fun=compose&sid=$sid$&qzonesign=$qzonesign$&r=$rand$"])
.replace({
sid:getSid(),
qzonesign:"",
rand:now()
});
createIframe(getTop(),aq,{
id:"signatureFrame",
onload:function(aj){
getTop().checkSignatureFrame();
}
});

if(getTop().gLoadSignTimeout)
{
getTop().clearTimeout(getTop().gLoadSignTimeout);
getTop().gLoadSignTimeout=null;
}

getTop().gLoadSignTimeout=getTop().setTimeout("getTop().checkSignatureFrame();",10000);
}







function getSignature(bO,aFM)
{
try
{
return getSignatureWin().getRealUserSignature(bO,aFM);
}
catch(ax)
{
loadSignature();
return"";
}
}







function getDetaultStationery(an)
{
try
{
return an=="Header"?
getSignatureWin().getRealUserDefaultStationeryHeader():
getSignatureWin().getRealUserDefaultStationeryBottom();
}
catch(ax)
{
loadSignature();
return"";
}
}





function getDefaultEditor()
{
try
{
return getSignatureWin().getRealDefaultEditor();
}
catch(ax)
{
loadSignature();
return 0;
}
}





function getUserNick()
{
try
{
return getSignatureWin().getRealUserNick();
}
catch(ax)
{
loadSignature();
return"";
}
}





function getDefaultSaveSendbox()
{
try
{
return getSignatureWin().getRealDefaultSaveSendbox();
}
catch(ax)
{
loadSignature();
return 0;
}
}





function getUserAlias()
{
try
{
return getSignatureWin().getRealUserAlias();
}
catch(ax)
{
loadSignature();
return"";
}
}





function getDefalutAllMail()
{
try
{
return getSignatureWin().getRealDefaultAllMail();
}
catch(ax)
{
loadSignature();
return[];
}
}





function getOpenSpellCheck()
{
try
{
return getSignatureWin().getRealOpenSpellCheck();
}
catch(ax)
{

return 0;
}
}






function getDefaultSender()
{
try
{
return getSignatureWin().getRealDefaulSender();
}
catch(ax)
{
loadSignature();
return"";
}
}






function setDefaultSender(iU)
{

getTop().setGlobalVarValue("DEF_MAIL_FROM",iU);

}





function getAllSignature()
{
try
{
return getSignatureWin().getRealAllSignature();
}
catch(ax)
{
loadSignature();
return{};
}
}





function getUserSignatureId()
{
try
{
return getSignatureWin().getRealUserSignatureId();
}
catch(ax)
{
loadSignature();
return"";
}
}





function getIsQQClub()
{
try
{
return getSignatureWin().getRealIsQQClub();
}
catch(ax)
{
loadSignature();
return false;
}
}





function getBindAccount()
{
try
{
return getSignatureWin().getRealBindAccount();
}
catch(ax)
{
loadSignature();
return null;
}
}





function getRecognizeNickName()
{
try
{
return getSignatureWin().getRealRecognizeNickName();
}
catch(ax)
{
loadSignature();
return false;
}
}

function getMailZoomTool()
{
return getTop().getGlobalVarValue("DEF_MAILZOOMTOOL")=="1";
}

function setMailZoomTool(bfl)
{
getTop().setGlobalVarValue("DEF_MAILZOOMTOOL",bfl?"1":"0");
}





function closeRecognizeNickName()
{
ossLog("realtime","all","stat=tips&type=know&tipid=66");
setGlobalVarValue("DEF_RECOGNIZENICKNAME",false);
}






function getUserInfoText(an)
{
var bp=S("user"+an,getTopWin())||{};
return fixNonBreakSpace(bp.innerText||bp.textContent);
}






function getUserInfo(an)
{
return(S("user"+an,getTopWin())||{}).innerHTML||"";
}







function setUserInfo(an,aT)
{
try
{
S("user"+an,getTopWin()).innerHTML=htmlEncode(aT);
return true;
}
catch(ax)
{
return false;
}
}










function msgBox(ba,uW,Eg,ml,
adc,aj)
{
if(window!=getTop())
{
return getTop().msgBox(ba,uW,Eg,ml,
adc,aj);
}

var eb=ba;

if(!eb)
{
var uR=S("msg_txt",aj||window)
||S("msg_txt",getActionWin());

if(uR&&(uR.innerText||uR.textContent)
&&uR.getAttribute("ok")!="true")
{
eb=filteScript(uR.innerHTML);
uR.setAttribute("ok","true");
}
}

if(!eb||!(eb=trim(eb.replace(/[\r\n]/ig,""))))
{
return;
}

hiddenMsg();

if(uW=="dialog")
{
alertBox(
{
msg:eb,
title:adc||"确认"
}
);
}
else
{
setClass(arguments.callee.createMessageBox().firstChild,
uW=="success"?"msg":"errmsg").innerHTML=eb;

showMsg();

if(Eg)
{
getTop().gMsgBoxTimer=getTop().setInterval(getTop().hiddenMsg,ml||5000);
}

getTop().gMsgDispTime=now();
}
};




msgBox.createMessageBox=function(qJ)
{
var DK=S("msgBoxDIV",getTop());
if(!DK)
{

var cg=typeof qJ=="undefined"?(getTop().bnewwin?0:43):qJ;
insertHTML(
getTop().document.body,
"afterBegin",
T([
'<div id="msgBoxDIV" style="position:absolute;width:100%;display:none;',
'padding-top:2px;height:24px;*height:24px;_height:20px;top:$top$px;text-align:center;">',
'<span></span>',
'</div>'
]).replace({
top:cg
})
);
DK=S("msgBoxDIV",getTop());
}
return DK;
};





function isshowMsg()
{
return getTop().isShow("msgBoxDIV");
}




function hiddenMsg()
{
if(getTop().gMsgBoxTimer)
{
getTop().clearInterval(getTop().gMsgBoxTimer);
getTop().gMsgBoxTimer=null;
}
getTop().show("msgBoxDIV",false);
getTop().showProcess(0);
}




function showMsg()
{
getTop().show("msgBoxDIV",true);
}






function showError(gT,ml)
{
msgBox(gT,"",ml!=-1,ml||5000);
}






function showInfo(aLh,ml)
{
msgBox(aLh,"success",ml!=-1,ml||5000);
}











function showProcess(nW,aCz,Ma,YP,azq)
{
var aA="load_process",
adC=arguments.callee.aqm(aA);

if(nW==0)
{
return show(adC,false);
}

hiddenMsg();
show(adC,true);

var vj=nW==2;

if(vj)
{
if(YP)
{
S(aA+"_plan_info",getTop()).innerHTML=YP+":";
}

var fU=parseInt(Ma);

if(isNaN(fU))
{
fU=0;
}
else
{
fU=Math.max(0,Math.min(100,fU));
}

S(aA+"_plan_rate",getTop()).innerHTML=
S(aA+"_plan_bar",getTop()).style.width=[fU,"%"].join("");
}
else
{
if(Ma)
{
S(aA+"_info",getTop()).innerHTML=Ma;
}
}

show(S(aA+"_plan",getTop()),vj);
show(S(aA+"_img",getTop()),vj?false:aCz);
show(S(aA+"_plan_info",getTop()),vj);
show(S(aA+"_plan_rate",getTop()),vj);
show(S(aA+"_info",getTop()),!vj);
show(S(aA+"_cancel",getTop()),azq!=false);
}






showProcess.aqm=function(ao)
{
var CR=S(ao,getTop());
if(!CR)
{
insertHTML(
getTop().document.body,
"afterBegin",
T([
'<table id="$id$" cellspacing=0 cellpadding=0 border=0 ',
'style="position:absolute;top:$top$px;left:0;width:100%;display:none;z-index:9999;">',
'<tr><td align="center">',
'<table cellspacing=0 cellpadding=0 border=0 class="autosave autosave_txt" style="height:20px;"><tr>',
'<td style="width:2px;"></td>',
'<td id="$id$_img" style="padding:0 0 0 5px;">',
'<img src="$image_path$ico_loading.gif" style="width:16px;height:16px;vertical-align:middle;">',
'</td>',
'<td id="$id$_plan" valign=center style="padding:0 0 0 5px;">',
'<div style="font:1px;border:1px solid white;width:104px;text-align:left;">',
'<div id="$id$_plan_bar" style="font:1px;background:#fff;height:8px;margin:1px 0;width:50%;"></div>',
'</div>',
'</td>',
'<td id="$id$_plan_info" style="padding:0 0 0 5px;"></td>',
'<td id="$id$_plan_rate" style="width:40px;text-align:right;padding:0;"></td>',
'<td id="$id$_info" style="padding:0 0 0 5px;"></td>',
'<td id="$id$_cancel" style="padding:0 0 0 5px;">',
'[<a onclick="getTop().cancelDoSend();" nocheck="true" style="color:white;">取消</a>]',
'</td>',
'<td style="padding:0 0 0 5px;"></td>',
'<td style="width:2px;"></td>',
'</tr></table>',
'</td></tr>',
'</table>'
]).replace(
{
id:ao,
top:getTop().bnewwin?0:45,
image_path:getPath("image",true)
}
)
);
CR=S(ao,getTop());
}
return CR;
};





function getProcessInfo()
{
var aA="load_process",
jf=getTop();

if(isShow(S(aA,jf)))
{
var Yj=S(aA+"_plan_rate",jf),
NL=S(aA+"_info",jf);

if(NL&&isShow(NL))
{
return NL.innerHTML;
}

if(Yj&&isShow(S(aA+"_plan",jf)))
{
return parseInt(Yj.innerHTML);
}
}
return"";
}






function replaceCss(aj,jy)
{
replaceCssFile(
"skin",
[getPath("style"),getFullResSuffix(["skin",
typeof jy=="undefined"?getPath("skin"):jy,".css"].join(""))
].join(""),
(aj||window).document
);
}






function agc(jy,Ig)
{
var ae=getTop();

return!Ig&&ae.gLogoUrl?ae.gLogoUrl.replace(/(.*)_[^_]+_([^_]+)/,"$1_"+jy+"_$2")
:TE([
'$images_path$logo',
'$@$if($bFoxmail$)$@$',
'_foxmail',
'$@$else$@$',
'$sSubfolder$',
'$@$endif$@$',
'/logo_$nSkinId$_',
'$@$if($bFoxmail$)$@$',
'0',
'$@$else$@$',
'$sLogoid$',
'$@$endif$@$.gif'
]).replace(
{
images_path:getPath("image"),
bFoxmail:Ig,
sSubfolder:ae.gsLogoFolder,
nSkinId:jy,
sLogoid:(ae.gsLogoFolder||jy==0)?(ae.gLogoId||0):0
}
);
}








function doRealChangeStyle(aAC,jy,Ig,iK,aDV)
{
var ae=getTop(),
pH=ae.gTempSkinId=jy,
bj=getMainWin(),
LF=[ae,bj],
aKI=aDV||false,
GZ=S("imglogo",ae);

if(GZ)
{
if(typeof iK=="undefined"||iK=="")
{
if(jy<10000000)
{
GZ.src=agc(pH,Ig);











}
}
else
{
GZ.src=iK;
}
GZ.className=aKI?"domainmaillogo":"";
}







E(ae.goDialogList,function(mO,vF)
{
LF.push(F(vF,getTop()));
});

E(GelTags("iframe",bj.document),function(mO)
{
LF.push(mO.contentWindow);
});

E(LF,function(aj)
{
replaceCss(aj,pH);
});

removeSelf(aAC);

setTimeout(resizeFolderList);

rdVer("BaseVer",1);
}






function changeStyle(jy,iK)
{
var DF=false,
EP=false;


var FT=getTop().getGlobalVarValue("DOMAIN_MAIL_LOGO_URL")||{},
rP=getGlobalVarValue("DEF_MAIL_FROM")||'';
if(iK)
{
EP=iK.indexOf("/cgi-bin/viewfile")>=0;
if(EP)
{
FT[rP]=iK;
rP&&setGlobalVarValue("DOMAIN_MAIL_LOGO_URL",FT);
}
}
else if(rP&&FT[rP])
{

iK=FT[rP];
EP=iK&&iK.indexOf("/cgi-bin/viewfile")>=0;
}

var pH=typeof jy=="undefined"||jy==""?getTop().skin_path:jy,
aLu=getTop().gsLogoFolder,
azr=DF?0:(aLu||pH==0?(getTop().gLogoId||0):0),
aEj=DF?"_foxmail":"",
Zs=getTop().changeStyle,
avJ=Zs.Qs,
Qs=Zs.Qs=["skinCssCache",pH,
aEj,iK||azr].join("_");


debug("994919736");
if(Qs!=avJ)
{
cacheByIframe([
["css",getPath("style"),"skin"+pH+".css"],
!!iK?["img","",iK]

:["img",agc(pH,DF)]
],
{
onload:function()
{
doRealChangeStyle(this,pH,DF,iK,EP);
}
}
);
}
}




function osslogCompose(kf,Wt,av,Vh,amL)
{
getTop().ossLog("delay","all",T([
'stat=compose_send',
'&t=$time$&actionId=$actionId$&mailid=$mailid$',
'&isActivex=$isActivex$&failCode=$failCode$',
'&$other$'
]).replace({
time:kf,
actionId:Wt,
mailId:av,
failCode:Vh,
other:["&cgitm=",getTop().g_cgiTimeStamp||-1,"&clitm=",getTop().g_clientTimeStamp||-1,"&comtm=",amL&&amL.valueOf?amL.valueOf():-1].join('')
}));
}








function recodeComposeStatus(Wt,av,Vh,awm)
{
var hO=0,
IY=getTop().gSendTimeStart;

if(!IY||!IY.valueOf)
{
if(!awm)
{
return;
}
}
else
{
hO=now()-IY.valueOf();
getTop().gSendTimeStart=null;
}



osslogCompose(hO,Wt,av,Vh,IY);













getTop().isUseActiveXCompose=false;
}




function errorProcess(Jl)
{

if(typeof getMainWin().ErrorCallBack=="function")
{
getMainWin().ErrorCallBack(Jl);

}
else if(typeof getTop().ErrorCallBack=="function")
{
getTop().ErrorCallBack(Jl);
}
}







function doPostFinishCheck(ao,aj,axR)
{
if(ao)
{
var Oe="",
xQ=false,
mz=S(ao,aj),
afq=F(ao,aj);
try
{
if(!mz
||mz.getAttribute("deleted")=="true")
{
return;
}

var bU=afq.document.body,
xQ=!bU.className&&!bU.style.cssText;

if(xQ)
{
var aeG=afq.document.documentElement;
Oe=(aeG.textContent
||aeG.innerText||"").substr(0,30);
}
}
catch(ax)
{
debug("doPostFinishCheck exception");
debug(ax,2);
xQ=ax.message||"exception";
}

QMHistory.recordActionFrameChange();

if(xQ)
{
callBack.call(mz,axR,[Oe]);

if(xQ!=true)
{
removeSelf(mz);
createBlankIframe(aj,
{
id:ao,
onload:mz.Tl
}
);
}

errorProcess();
}
}
}




function actionFinishCheck()
{
doPostFinishCheck("actionFrame",getTop(),function(responseContent)
{
showError(gsMsgLinkErr);
}
);
}




function doSendFinishCheck()
{
doPostFinishCheck("sendmailFrame",getTop(),function(anl)
{
recodeComposeStatus(2,null,anl||0);
msgBox(T(['由于网络原因，邮件发送失败！'
,'[<a href="/cgi-bin/switch2service?sid=$sid$&errcode=-1&time=$time$&cginame=sendmail&t=error_report">发送错误报告</a>]']).replace(
{
time:formatDate(new Date(),"$YY$$MM$$DD$$hh$$mm$$ss$")
}
),"dialog",true,0,"失败信息");
}
);
}






function submitToActionFrm(ia)
{
try
{
ia.submit();
return true;
}
catch(ax)
{
showError(ia.message);
return false;
}
}









function afterAutoSave(jR,av,ba,aob)
{

var ej=0,
ec,Cl;

try
{
var bj=getTop().getMainWin();

function DC()
{
if(disableAll)
{
disableAll(false);
}
}

ej=1;

if(av==""||!av)
{
return DC();
}

ej=2;

if(!bj||!S("fmailid",bj))
{
return DC();
}

ej=3;
Cl=S("fmailid",bj).value;

if(Cl!=av)
{
S("fmailid",bj).value=av;
getTop().setTimeout(
function()
{
reloadLeftWin()
},
0
);
}

ej=4;

var eV=jR.split(" |"),
ph=[],
Qn=bj.QMAttach.getExistList();

for(var i=0,aw=Qn.length;i<aw;i++)
{
var wr=S("Uploader"+Qn[i],bj);
if(wr&&!wr.disabled&&wr.value!="")
{
ph.push(wr);
}
}

ej=5;

var ajo=ph.length;
for(var i=0,aw=eV.length-1;i<aw;i++)
{
var la=false;
for(var j=0;j<=i&&j<ajo;j++)
{
if(!ph[j].disabled
&&ph[j].value.indexOf(eV[i])!=-1)
{
ph[j].disabled=true;
la=true;
try
{
if(gbIsIE||gbIsWebKit)
{
ph[j].parentNode.childNodes[1].innerText=eV[i];
}
}
catch(ax)
{
}
}
}
if(!la)
{
var aV=eV[i]+" |",
dr=jR.indexOf(aV);

if(dr!=-1)
{
jR=jR.substr(0,dr)
+jR.substr(dr+aV.length,
jR.length-dr-aV.length
);
}
}
}

ej=6;

bj.loadValue();

ej=7;

if(jR&&S("fattachlist",bj))
{
S("fattachlist",bj).value+=jR;
}

ej=8;







ej=9;

showInfo(ba
||(formatDate(new Date,"$hh$:$mm$")+" "+getTop().gsMsgSendErrorSaveOK));

ej=10;
var dR=getTop().QMDialog("composeExitAlert");
var hM=dR&&dR.S("btn_exit_notsave");
if(hM&&hM.isShow())
{
return fireMouseEvent(hM,"click");
}

ej=11;

if(!aob)
{
DC();
}

ej=12;

bj.enableAutoSave();
}
catch(ax)
{
ec=ax.message;
debug(["afterAutoSave:",ax.message,"eid:",ej]);
}
ossLog("realtime","all",T([
"stat=custom&type=AFTER_AUTO_SAVE&info=",
"$processid$,$errmsg$,$oldmailid$,$mailid$,$attachlist$"]).replace({
processid:ej,
errmsg:encodeURIComponent(ec||"ok"),
oldmailid:encodeURIComponent(Cl),
mailid:encodeURIComponent(av),
attachlist:encodeURIComponent(jR)
}));
}




function cancelDoSend()
{
var bj=getMainWin(),
og=bj.QMAttach;

if(og&&og.onfinish)
{
og.onprogress=null;
og.onfinish=null;
}
else
{
var Da=S("sendmailFrame",getTop());
if(Da)
{
Da.setAttribute("deleted","true");
removeSelf(Da);
}
}

recodeComposeStatus(3,null,0);
showProcess(0);
errorProcess();
}







function quickDoSend(jO,aT,ba)
{
var Eu=false;

if(ba!="nomsg")
{
showProcess(1,0,[
"<img src='",getPath("image"),"newicon/a_send.gif' width='14px' height='14px' align='absmiddle'>&nbsp;",
(ba||gsMsgSend)].join(""),null,true);
}

disableSendBtn(true);
disableSource(true);

createBlankIframe(getTop(),
{
id:"sendmailFrame",
onload:function(aj)
{
if(Eu)
{
doSendFinishCheck(this);
}
else
{
Eu=true;

try
{
jO.content.value=aT;
jO.target="sendmailFrame";
jO.submit();
}
catch(ax)
{
showError("发送失败："+ax.message);
disableSendBtn(false);
disableSource(false);
}
}
}
}
);
}






function disableSendBtn(hJ,aj)
{
disableCtl("sendbtn",hJ,aj||getMainWin());
}





function disableSaveBtn(hJ,aj)
{
disableCtl("savebtn",hJ,aj||getMainWin());
}





function disableTimeSendBtn(hJ,aj)
{
disableCtl("timeSendbtn",hJ,aj||getMainWin());
}





function disableSource(hJ)
{
disableCtl("source",hJ,getMainWin());
}




function disableAll(hJ,aj)
{
var bj=aj||getMainWin();
if(bj.disableAll&&bj.disableAll!=arguments.callee)
{
return bj.disableAll(hJ);
}

disableSendBtn(hJ,aj);
disableSaveBtn(hJ,aj);
disableTimeSendBtn(hJ,aj);

var dR=getTop().QMDialog("composeExitAlert"),
afP=dR&&dR.S("btn_exit_save");
if(afP)
{
afP.disabled=hJ;
}
}






function verifyCode(an,Io)
{
if(window!=getTop())
{
return getTop().verifyCode(avO);
}

var qu=arguments.callee,

ayC=qu.aLa;


setVerifyCallBack();
loadingBox(
{
model:"验证码",
js:"qmverify.js",
oncheck:function()
{
return window.QMVerifyBox;
},
onload:function()
{
QMVerifyBox.open(
{
sType:an,
sVerifyKey:Io,
onok:ayC
}
);
}
}
);
}
























function openComposeDlg(acd,ag,ado)
{
!(typeof QMAddress!="undefined"&&QMAddress.isInit())&&initAddress();
loadJsFileToTop(getPath("editor"),[getFullResSuffix("editor.js")]);

loadingBox(
{
model:"发信",
js:["libcompose.js","qmaddrinput.js"],
oncheck:function()
{
return window.ComposeLib&&window.QMAddrInput&&window.QMEditor&&(!ado||ado());
},
onload:function()
{
ComposeLib.openDlg(acd,ag);
}
}
);
}










function setVerifyCallBack(bL)
{
getTop().verifyCode.aLa=bL;
}







function emptyFolder(awS)
{
return confirm(
awS
?"你确认要清空此文件夹吗？\n（清空后邮件无法恢复）"
:"你确认要删除此文件夹中的所有邮件吗？\n（清空后邮件无法恢复）");
}








function renameFolder(bO,an,aj,ajx)
{
promptFolder({
defaultValue:ajx||'',
type:"rename"+(an||'folder'),
onreturn:function(uP){
var bz=S("frm",aj);
if(an=='tag')
{
bz.fun.value="renametag";
bz.tagname.value=uP;
bz.tagid.value=bO;
}
else
{
bz.fun.value="rename";
bz.name.value=uP;
bz.folderid.value=bO;
}
submitToActionFrm(bz);
}
});
return false;
}











function promptFolder(ag)
{
var ar={
shortcutgroup:{title:'新建联系人分组',msg:'请填写联系人分组名称',name:'联系人分组',maxascii:32,description:"写信时，只需要输入这个群组名(汉字需输入拼音)，就可以快捷群发了。"},
folder:{title:'新建文件夹',msg:'请您输入文件夹名称',name:'文件夹',maxascii:80},
tag:{title:'新建标签',msg:'请您输入标签名称',name:'标签',maxascii:50},
renamefolder:{title:'重命名文件夹',msg:'请您输入新的文件夹名称',name:'文件夹',maxascii:80},
renametag:{title:'重命名标签',msg:'请您输入新的标签名称',name:'标签',maxascii:50}
}[ag.type];
ar.defaultValue=ag.defaultValue;
ar.onreturn=function(aH,eH){
if(!aH)
{
return;
}

var aw=getAsiiStrLen(trim(eH));
if(aw==0||aw>ar.maxascii)
{
return showError(TE(aw?"$name$名称太长，请使用少于$maxascii$个字符($@$eval $maxascii$/2$@$个汉字)的名称":'$name$名称不能为空').replace(ar));
}
if(/[~!#\$%\^&\*\(\)=\+|\\\[\]\{\};\':\",\?\/<>]/.test(eH))
{
return showError(ar.name+'名称不能包含 ~!#$%^&*()=+|\\[]{};\':",?/<> 等字符');
}

ag.onreturn(eH);
};
promptBox(ar);
}


function ach(bO,vP,MC,bK)
{
if(bO)
{
var OP=S(bO+"_td",vP);
if(OP)
{
setClass(OP,MC);
return OP;
}
else
{

var Ni=S(bO,vP);
if(Ni)
{
var afs=bK=="over";
if(afs)
{
showFolders(Ni.name,true);
}
var aBT=S(bO,vP).parentNode;
setClass(aBT,afs?"fn_list":"");
return Ni;
}
}
}
}











function switchFolderComm(ao,aj,IH,jH,aIE,
aMn,aew)
{
var Ky=S(IH,aj),
eF=ao;

if(eF)
{
aew.aGF=eF;
}
else
{
eF=aew.aGF;
}

if(Ky)
{
var ack="SwiTchFoLdErComM_gLoBaldATa",
Xr=aj[ack],
Ax;

if(Xr!=eF)
{
ach(Xr,aj,aMn,"none");
}

if(Ax=
ach(aj[ack]=eF,aj,aIE,"over"))
{

E("new|personal|pop|tag".split("|"),function(aaU)
{
var uY=S(aaU+"folders",aj);
uY&&isObjContainTarget(uY,Ax)
&&showFolders(aaU,true);
}
);

if(getStyle(Ky,"overflow")!="hidden")
{

scrollIntoMidView(Ax,Ky);
}
else
{

var uY=S("ScrollFolder",aj);
uY&&isObjContainTarget(uY,Ax)
&&scrollIntoMidView(Ax,uY);
}
}
}
}






function switchFolder(ao,aj)
{
getTop().switchFolderComm(ao,aj||getLeftWin(),"folder","li","fn","fs",
getTop().switchFolder
);
}







function switchRightFolder(ao,aBI,IH)
{
getTop().switchFolderComm(ao,aBI||F("rightFolderList",getMainWin()),
IH||"folder_new","div","toolbg","",getTop().switchRightFolder
);
}






function isShowFolders(ao,aj)
{
var kb=S("icon_"+ao,aj||getTop());
return!!(kb&&kb.className=="fd_off");
}





function showFolders(ao,iN,aj)
{
var am=aj||getTop(),
aQ=S(ao+"folders",am),
kb=S("icon_"+ao,am);

if(aQ&&kb)
{
var dG=S(ao+"folders",am),
blY=GelTags("li",dG).length;

var fm=!isShowFolders(ao,am);
if(blY&&(typeof iN!="boolean"||fm==iN))
{
setClass(kb,fm?"fd_off":"fd_on");

if(!aj)
{
var ae=getTop(),
XS="fOlDErsaNimaTion"+ao,
iQ=ae[XS];

if(!iQ)
{
iQ=ae[XS]=new ae.qmAnimation(
{
from:1,
to:100
}
);
}

iQ.stop();

if(fm)
{
aQ.style.height="1px";
show(aQ,true);
}
else
{
aQ.style.height="auto";
}

var yt=aQ.scrollHeight;

iQ.play(
{
speed:yt,
onaction:function(bn,eU)
{
S(ao+"folders",ae).style.height=
(Math.floor((fm?eU:1-eU)*yt)
||1)+"px";
},
oncomplete:function(bn,MR)
{
var cQ=S(ao+"folders",ae);
if(fm)
{
cQ.style.height="auto";
}
else
{
show(cQ,false);
}
}
}
);
}
else
{
show(aQ,fm);
}

callBack(getTop().iPadResizeFolder);
}
}
}

function decreaseFolderUnread(iU,lj,aj)
{
var qB,sK=iU.split(';');
for(var i=sK.length-1;i>=0;i--)
{
if(qB=pI(0,sK[i]))
{
pI(1,sK[i],qB-1,lj,aj);
}
}
}







function getFolderUnread(bO)
{
return pI(0,bO);
}









function setFolderUnread(bO,bn,lj,aj)
{
return pI(1,bO,bn||0,lj,aj);
}






function getGroupUnread(vM)
{
return pI(0,vM,null,null,getMainWin());
}








function setGroupUnread(vM,bn,lj)
{
return pI(1,vM,bn||0,lj,getMainWin());
}









function setTagUnread(bO,bn,lj,aj)
{
return pI(1,bO,bn||0,lj,aj,true);
}











function pI(bZ,bO,bn,lj,aj,aKq)
{
var lc=S(
[
"folder_",


(new String(bO)).toString().split("folder_").pop()
].join(""),
aj||getLeftWin()
);
if(!lc)
{
return 0;
}

var cS=lc.getAttribute("etitle"),
Op=GelTags("div",lc),
aV=lc.name;
if(Op.length)
{
lc=Op[0];
}

var kq=typeof(bn)=="number"&&bn>0?bn:0,
zB=lc.innerText||lc.textContent||"",
GC=zB.lastIndexOf("("),
Ra=GC==-1?0
:parseInt(zB.substring(GC+1,zB.lastIndexOf(")")));

if(bZ==0)
{
return Ra;
}

if(Ra==kq)
{
return 1;
}

var XL=kq==0,
bu={
info:htmlEncode(GC!=-1?zB.substring(0,GC):zB),
title:cS,
unread:kq
};

lc.title=T('$title$'+(lj||XL?'':'  未读邮件 $unread$ 封')).replace(bu);




lc=setHTML(lc,T(XL&&'$info$'
||(lj?'$info$($unread$)':'<b>$info$</b><b>($unread$)</b>')
).replace(bu)+(bu.info=='星标邮件'?'<input type="button" class="ico_input icon_folderlist_star"/>':'')+(bu.info=='漂流瓶'?'<input class="ico_input drifticon" type="button" hidefocus />':'')
);
lc.setAttribute("initlized","");

if(aV&&!aKq)
{
var Mk=S("folder_"+aV,getTop());
if(Mk)
{
try
{
pI(bZ,bO,kq,lj,getMainWin());
}
catch(ax)
{
doPageError(ax.message,"all.js","_optFolderUnread");
}

return setFolderUnread(Mk.id,
getFolderUnread(Mk.id)-Ra+kq);
}
}

return 1;
}







function doFolderEmpty(bO,jO,pd)
{
jO.folderid.value=bO;
jO.rk.value=Math.random();

if(jO.loc)
{
jO.loc.value=pd;
}

submitToActionFrm(jO);
}







function selectAll(Pk,by)
{
E(GelTags("input",S('list',by)),function(dI)
{
dI.checked=Pk;
}
);
}





function selectReadMail(Pk,by)
{
E(GelTags("input",S('list',by)),function(dI)
{
if(dI.title!="选中/取消选中")
{
dI.checked=dI.getAttribute('unread')!=Pk;
}
}
);
}





function checkAddrSelected()
{
var fA=GelTags("input"),
aw=fA.length,
bf;

for(var i=0;i<aw;i++)
{
bf=fA[i];
if(bf.type=="checkbox"&&bf.checked)
{
return true;
}
}

return false;
}






function checkBoxCount(Ow)
{
var cM=0;

E(GelTags("INPUT"),function(gv)
{
if(gv.type=="checkbox"
&&gv.name==Ow
&&gv.checked)
{
cM++;
}
}
);

return cM;
}




function PGV()
{
}






function checkCheckBoxs(aC,jO)
{
var bz=jO||S("frm",getMainWin()),
fA=GelTags("input",bz),
hC;

for(var i=0,aw=fA.length;i<aw;i++)
{
hC=fA[i];

if(hC.type=="checkbox"
&&hC.name==aC
&&hC.checked)
{
return true;
}
}

return false;
}






function setListCheck(gv,uO)
{
if(gv.type!="checkbox")
{
return;
}

if(uO==null)
{
uO=gv.checked;
}
else
{
gv.checked=uO;
}

var bp=gv.parentNode.parentNode;

if(bp.tagName=="TR")
{
bp=bp.parentNode.parentNode;
}


if(bp==S("frm",getMainWin()))
{
return;
}

var xS=bp.className;
if(xS=="B")
{
xS=uO?"B":"";
}
else
{
xS=strReplace(xS," B","")
+(uO?" B":"");
}

setClass(bp,xS);

if(uO)
{
listMouseOut.call(bp);
}
}







function doCheck(ah,zO,aFe,aFc)
{
var bY=ah||window.event,
bJ=zO||bY.srcElement||bY.target,
bj=aFc||getMainWin();

if(!bJ||!bj)
{
return;
}

if(bJ.className=="one"||bJ.className=="all")
{
CA(bJ);
}

setListCheck(bJ);


if((bY&&bY.shiftKey||aFe)
&&bj.gCurSelObj
&&bj.gCurSelObj!=bJ
&&bJ.checked==bj.gCurSelObj.checked)
{
var fA=getTop().GelTags("input",bj.document),
cM=0,
aw=fA.length,
hC;

for(var i=0;i<aw;i++)
{
hC=fA[i];

if(hC.type!="checkbox")
{
continue;
}

if((hC==bj.gCurSelObj
||hC==bJ)&&cM++==1)
{
break;
}

if(cM==1)
{
setListCheck(hC,bJ.checked);
}
}
}

bj.gCurSelObj=bJ;
}






function checkAll(Ow,by)
{
E(GelTags("input",by),function(bd)
{
if(bd.name==Ow)
{
setListCheck(bd);
}
}
);
}







function fakeReadmail(ag)
{
QMAjax.send(
T('/cgi-bin/readmail?sid=$sid$&mailid=$mailid$&t=readsubmail&mode=fake&base=$base$&pf=$pf$').replace({
sid:getSid(),
mailid:ag.sMailId,
pf:rdVer.isPre(ag.sFolderId)?1:0,
base:rdVer("BaseVer",0)
}),
{
method:"GET",
headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},
onload:function(aH,bN)
{
var fb=trim2(bN);
if(aH&&fb.indexOf("(")==0)
{
var cU=evalValue(fb);
if(cU)
{
folderOpt(extend(ag,cU));
callBack(getMainWin().updatePreAndNext,[ag]);
}
}
else
{
var jK=getActionWin().document;
jK.open();
jK.write(eB.responseText);
}
}
}
);
}













function folderOpt(ag)
{
if(!ag)
{
return;
}

var ae=getTop();
ae.recordCompareReadedMailId(ag.sMailId);
if(ag.bNewMail)
{
var eF=ag.sFolderId,
bvd;





if(eF>0)
{
try{
ae.setFolderUnread(eF,ae.getFolderUnread(eF)-1);
if(ag.bStar)
{
ae.setFolderUnread("starred",ae.getFolderUnread("starred")-1);
}

var na=ag.oMatchTag||[],
i=na.length-1;
i>=0&&setTagUnread('tag',getFolderUnread('tag')-1);
for(;i>=0;i--)
{
var ew='tag_'+na[i];
debug(['getFolderUnread',ew,getFolderUnread(ew)]);
setTagUnread(ew,getFolderUnread(ew)-1);
}

}catch(e){}
}




}
}






function recordReadedMailId(av)
{
getTop().gsReadedMailId=av;
}





function recordCompareReadedMailId(av)
{
if(av&&getTop().gsReadedMailId!=av)
{
getTop().gsReadedMailId=av;
}

QMMailCache.addData(av,{bUnread:null});
}






function SG(zb,aKb)
{
var bH=zb.className,
fm=!/\bsts\b/i.test(bH);



var	bf=GelTags("input",zb.parentNode)[0],
adf=bf&&bf.className,
zM=(aKb
?zb.parentNode.parentNode.parentNode
:zb.parentNode).nextSibling;

if(adf=="one"||adf=="all")
{
setClass(bf,fm?"one":"all");
}

setClass(zb,
fm?bH.replace(/\bhts\b/i,"sts"):bH.replace(/\bsts\b/i,"hts"));


if(zM.className!="toarea")
{
zM=zM.nextSibling;
}

if(zM.className!="toarea")
{
return;
}

return show(zM,fm);
}





function CA(ye)
{
if(ye)
{
var Ao=(ye.className=="all"
?ye.parentNode.parentNode.parentNode.parentNode
:ye.parentNode).nextSibling;

if(Ao.className!="toarea")
{
Ao=Ao.nextSibling;
}

if(Ao.className=="toarea")
{
var azh=ye.checked;

E(GelTags("input",Ao),function(bd)
{
setListCheck(bd,azh);
}
);
}
}
}















function RD(ah,av,le,bZ,gR,Am,
PE,KR,AI)
{
recordReadedMailId(av);

if(ah)
{
preventDefault(ah);


var ap=ah.srcElement||ah.target,
eF=ap&&ap.getAttribute("fid");

if(eF)
{
goUrlMainFrm(T("/cgi-bin/$cgi$?sid=$sid$&folderid=$fid$&page=0&t=$t$").replace(
{
cgi:eF=="9"?"readtemplate":"mail_list",
fid:eF,
sid:getSid(),
t:eF=="9"?"sms_list_v2":""
}
),false);
return stopPropagation(ah);
}
}

var aq=rdVer.url(av,gR,AI,
bZ,getTop().bnewwin||(ah&&ah.shiftKey),
Am,PE,KR);

rdVer.log(av,"hit");

if(ah&&(ah.shiftKey||ah.ctrlKey||ah.metaKey))
{
var bJ=ah.target||ah.srcElement;

while(bJ&&bJ.className!="i M"
&&bJ.className!="i F")
{
bJ=bJ.parentNode;
}

bJ&&QMReadedItem.disp(bJ);
goNewWin(aq);
}
else
{
goUrlMainFrm([aq,"#stattime=",now()].join(""),false);
}
}









function checkPerDelML(gR,afz,by)
{
return delMailML(gR,afz,"PerDel",by);
}









function delMailML(gR,afz,Aq,by)
{
var am=by.nodeType==9?(by.defaultView||by.parentWindow):by,
ar=QMMailList.getCBInfo(am);
configPreRmMail(ar,'rmMail');
rmMail(Aq=="PerDel"?1:0,ar);
return;
}






function reportSpamML(baV,by)
{
var am=by.nodeType==9?(by.defaultView||by.parentWindow):by,
ar=QMMailList.getCBInfo(am);


configPreRmMail(ar,'spammail');
(baV?reportSpamJson:reportNoSpamJson)({bBlackList:true},ar);
return false;
}





var QMReadedItem={};





QMReadedItem.addItem=function(dI)
{
if(!getMainWin().gMailItems)
{
getMainWin().gMailItems=[];
}

getMainWin().gMailItems.push(dI);
};





QMReadedItem.getItems=function()
{
return getMainWin().gMailItems||[];
};





QMReadedItem.save=function(auI)
{
getMainWin().goReadedItemImg=auI;
};





QMReadedItem.load=function()
{
return getMainWin().goReadedItemImg;
};





QMReadedItem.disp=function(FL)
{
if(!FL)
{
return;
}

var rq=FL.type=="checkbox"
?FL.parentNode
:GelTags("input",FL)[0].parentNode,
dU=rq.firstChild;

if(dU.tagName!="IMG")
{
insertHTML(
rq,
"afterBegin",
T([
'<img src="$path$ico_grouplight.gif" class="showarrow"',
' title="这是您最近阅读的一封邮件" />'
]).replace(
{
path:getPath("image")
}
)
);
dU=rq.firstChild;
}

show(this.load(),false);
show(dU,true);

this.save(dU);
};





QMReadedItem.read=function(zO)
{
if(zO&&zO.tagName==="U")
{
fireMouseEvent(zO,"click");
}
else
{
if(!this.load())
{
return false;
}

fireMouseEvent(
GelTags("table",this.load().parentNode.parentNode)[0].parentNode,
"click"
);
}

return true;
};






QMReadedItem.check=function(aIf)
{
if(!this.load())
{
return false;
}

var Lo=this.load().nextSibling;
Lo.checked=!Lo.checked;

doCheck(null,Lo,aIf);
return true;
};






QMReadedItem.move=function(aFw)
{
var bl=this.getItems(),
Qf=bl.length,
dr=-1;

if(Qf==0)
{
return false;
}

if(this.load()!=null)
{
var aKy=QMReadedItem.load().nextSibling;

for(var i=Qf-1;i>=0;i--)
{
if(aKy==bl[i])
{
dr=i;
break;
}
}
}

dr+=aFw?1:-1;

if(dr>-1&&dr<Qf)
{
this.disp(bl[dr]);
scrollIntoMidView(bl[dr],getMainWin().document.body,false);
return true;
}

return false;
};







function listMouseOver(ah)
{
var ad=this;
if(ad.className.indexOf(" B")==-1
&&getStyle(ad,"backgroundColor")!="#f3f3f3"
&&ad.getAttribute("colorchange")!="none")
{
ad.style.backgroundColor="#f3f3f3";
}


if(ah)
{
var ap=getEventTarget(ah);
while(ap&&ap!=ad&&ap.className!='tagbgSpan')
{
ap=ap.parentNode;
}
if(ap&&ap!=ad)
{
QMTag.showTagClose(ap,1);
}
}
}





function listMouseOut(ah)
{
var ad=this;
if((!ah||!isObjContainTarget(ad,ah.relatedTarget
||ah.toElement))
&&ad.style.backgroundColor
&&ad.getAttribute("colorchange")!="none")
{
ad.style.backgroundColor="";
}


if(ah)
{

var ap=getEventTarget(ah);
while(ap&&ap!=ad&&ap.className!='tagbgSpan')
{
ap=ap.parentNode;
}
if(ap&&ap!=ad)
{
QMTag.showTagClose(ap,0);
}
}

}





function listMouseEvent(aB)
{
addEvents(aB,{
contextmenu:function(ah)
{
listContextMenu.call(aB,ah);
},
mouseover:function(ah)
{
listMouseOver.call(aB,ah);
},
mouseout:function(ah)
{
listMouseOut.call(aB,ah);
}
});
}

function listContextMenu(ah)
{
var aJ=this;
allDeferOK()&&mailRightMenu(aJ,ah);
preventDefault(ah);
}





function GetListMouseClick(aj)
{
return function(ah)
{
ListMouseClick(ah,aj||window);
}
}






function ListMouseClick(ah,aj)
{
var bJ,
bY=ah||aj.event;

if(!(bJ=getEventTarget(bY)))
{
return;
}

if(bJ.name=="mailid")
{

if(!getGlobalVarValue('TIP_46'))
{
requestShowTip('gotnomail',46,aj,function(bN,cq)
{



setGlobalVarValue('TIP_46',1);

return true;
}
);
}

return doCheck(bY);
}


if(bJ.className.indexOf("cir")==0)
{
var FK=GelTags("table",bJ.parentNode.parentNode)[0]
.parentNode.onclick.toString().split("{")[1]
.split("}")[0].replace(/event/ig,"{shiftKey:true}");

if(/\WRD/.test(FK))
{
return eval(FK);
}
else
{
FK=GelTags("table",bJ.parentNode.parentNode)[0]
.parentNode.onclick.toString().replace(/.*{/g,"")
.replace(/}.*/g,"").replace(/event/ig,"{shiftKey:true}");
return eval(FK);
}
}
}






function listInitForComm(bK,aGl)
{
var bH,
nm=GelTags("div"),
aBa=doCheck,
uQ,hX;

bH=bK?bK:"M";
for(var i=nm.length-1;i>=0;i--)
{
uQ=nm[i];

if(uQ.className!=bH)
{
continue;
}

if(bK=="ft")
{
uQ=GelTags("table",uQ)[0];
}

hX=GelTags("input",uQ)[0];
if(!hX||hX.type!="checkbox")
{
continue;
}

hX.title="按住shift点击不同的勾选框 可方便快捷多选";
addEvent(hX,"click",aBa);

if(!aGl)
{
listMouseEvent(uQ);
}
}
}







function modifyFolder(gR,nN)
{
getMainWin().location.href=T([
'/cgi-bin/foldermgr?sid=$sid$&fun=detailpop&t=pop_detail',
'&folderid=$folderid$&acctid=$acctid$'
]).replace(
{
sid:getSid(),
folderid:gR,
acctid:nN
}
);
return false;
}





function recvPopHidden(gR)
{
getMainWin().setTimeout(
function()
{
if(!gR)
{
getTop().reloadFrmLeftMain(false,true);
}
else
{
var aA="iframeRecvPopHidden";
createBlankIframe(getMainWin(),{id:aA});

var aq=["/cgi-bin/mail_list?sid=",getSid(),"&folderid=",
gR,"&t=recv_pop_hidden"].join("");
try
{
F(aA,getMainWin()).location.replace(aq);
}
catch(ax)
{
S(aA,getMainWin()).src=aq;
}
}
},
10000
);
}






function recvPop(nN,gR,by)
{
recvPopCreat(nN,gR);
if(S("tips",by))
{
S("tips",by).innerHTML=T(
[
'<img src="$images_path$ico_loading3.gif" align=absmiddle>',
' 正在收取...&nbsp;系统将在后台自动收取，您可以离开此页面，稍后回来查看收取结果。'
]
).replace(
{
images_path:getPath("image",true)
}
);
}


recvPopHidden(gR);
}





function recvPopCreat(nN)
{
getActionWin().location=["/cgi-bin/foldermgr?sid=",getSid(),
"&fun=recvpop&acctid=",nN].join("");
}




function recvPopAll()
{
getActionWin().location=["/cgi-bin/foldermgr?sid=",getSid(),
"&fun=recvpopall"].join("");
try
{

setTimeout(
function()
{
reloadFrmLeftMain(false,true);
},
3000
);
}
catch(ax)
{
}
return false;
}









function setPopFlag(nN,wN,aT)
{
if(wN=="recent")
{
setPopRecentFlag(nN,aT);
}
}






function setPopRecentFlag(nN,aT)
{
runUrlWithSid(["/cgi-bin/foldermgr?sid=",getSid(),
"&fun=pop_setting&acctid=",nN,"&recentflag=",aT].join(""));
}







function checkPopMailShow(iU)
{
var aex=["@yahoo.com.cn","@sina.com","@tom.com","@gmail.com"],
aEw=iU.toLowerCase();

for(var i=0;i<aex.length;i++)
{
if(aEw.indexOf(aex[i])>=0)
{
return true;
}
}

return false;
}









function setBeforeUnloadCheck(aj,ba,bZC,aDC,
cY)
{
var QW=["input","select","textarea"];

aj=aj||window;
cY=cY?(typeof(cY)=="string"
?S(cY,aj)
:cY):aj.document;
aj.gbIsBeforeUnloadCheck=true;

E(QW,
function(jH)
{
var aBL=aj[jH+"_save"]=[];

E(GelTags(jH,cY),
function(aB,dL)
{
aBL.push(aB.value+aB.checked);
aB.setAttribute("saveid",dL);
}
);
}
);

if(!aj.onsetbeforeunloadcheck)
{
aj.onsetbeforeunloadcheck=function()
{
if(aj.gbIsBeforeUnloadCheck)
{
for(var i=0,aw=QW.length;i<aw;i++)
{
var Fj=QW[i],
aV=Fj+"_save",
zG=GelTags(Fj,cY);

for(var j=0,jlen=zG.length;j<jlen;j++)
{
var Ym=zG[j].getAttribute("saveid");
if(Ym!=null&&zG[j].getAttribute("nocheck")!="true"&&aj[aV][Ym]
!=(zG[j].value+zG[j].checked))
{
return ba?ba:"您修改的设置尚未保存，确定要离开吗？";
}
}
}
}
};

gbIsIE?(aj.document.body.onbeforeunload=aj.onsetbeforeunloadcheck)
:aj.document.body.setAttribute("onbeforeunload","return onsetbeforeunloadcheck();");
}

E(aDC||["cancel"],
function(MG)
{
addEvent(
typeof(MG)=="string"
?S(MG,aj):MG,
"mousedown",
function()
{
aj.gbIsBeforeUnloadCheck=false;
}
);
}
);

E(GelTags("form",aj.document),
function(ia)
{
addEvent(ia,"submit",
function()
{
aj.gbIsBeforeUnloadCheck=false;
}
);

if(!ia.YT)
{
ia.YT=ia.submit;
ia.submit=function()
{
aj.gbIsBeforeUnloadCheck=false;
this.YT();
};
}
}
);
}









function popErrProcess(ba,uW,Eg,ml,aIv,abw)
{
if(ba!=null)
{
msgBox(ba,uW,Eg,ml);
}

if(abw!=null)
{
getMainWin().ShowPopErr(abw,aIv);
}

showSubmitBtn();
}




function showSubmitBtn()
{
var JD=S("submitbtn",getMainWin());

if(JD)
{
JD.disabled=false;
}
}




function showPopSvr()
{
show(S("popsvrTR",getMainWin()),true);
}





function setTaskId(mh)
{
try
{
getMainWin().document.checkFrom.taskid.value=mh;
}
catch(ax)
{
}
}








function showQuickReply(iN)
{
show(S('quickreply',getMainWin()),iN);
show(S('upreply',getMainWin()),!iN);
runUrlWithSid("/cgi-bin/getcomposedata?Fun=setshowquickreply&isShowQuickReply="
+(iN?0:1));
}




function hiddenReceipt(aj)
{
show(S("receiptDiv",aj),false);
}





function switchOption(by)
{
var aG=[
[
"<input type='button' class='qm_ico_quickup' title='隐藏' />",true],
[
"<input type='button' class='qm_ico_quickdown' title='显示更多操作' />",false]
][
S("trOption",by).style.display=="none"?0:1
];
S("aSwitchOption",by).innerHTML=aG[0];
show(S("trOption",by),aG[1]);
}






function checkPerDel(aj)
{


delMail("PerDel",aj);

}






function delMail(Aq,aj)
{
rmMail(Aq=="PerDel"?1:0,aj.QMReadMail.getCBInfo(aj));
}








function setMailType(an,mI,pA,by)
{
var bz=S("mail_frm",by);

bz.s.value=["readmail_",
mI?(pA?"group":an):("not"+an),
getMainWin().newwinflag?"_newwin":""].join("");
bz.action="/cgi-bin/mail_mgr?sid="+getSid();
bz.mailaction.value="mail_spam";
bz.isspam.value=mI;
bz.reporttype.value=an=="cheat"?"1":"";

submitToActionFrm(bz);
}



function getAddrSub(addr)
{
var bI=addr.indexOf("@");
if(bI>-1)
{
var addrName=addr.substr(0,bI);
var addrDom=addr.substr(bI);
return subAsiiStr(addrName,18,'...')+subAsiiStr(addrDom,18,'...');
}
else
{
debug("name+dom"+addr);
return subAsiiStr(addr,36,'...');
}
}

function getRefuseText(NH)
{
var bgy=T([
'<input type="checkbox" name="$TNAME$" id="$TID$" $TCHECK$>将<label for="$TID$">$TVALUE$</label>加入黑名单'
]);
var i;
var retstr="";
var br="";
for(i in NH)
{
var tagname="refuse";
if(i>0){
tagname="refuse"+i;
br="<br>"
}
var addrlabel;
if(NH[i]!="发件人")
addrlabel="&lt;"+getAddrSub(NH[i])+"&gt;";
else
addrlabel=NH[i];
var ischecked="";
debug("ITEM: "+NH[i]);
retstr+=br+bgy.replace({
TNAME:tagname,
TID:tagname,
TVALUE:addrlabel,
TCHECK:ischecked
});
}
debug("RET Text"+retstr);
return retstr;
}










function reportSpam(Kh,Nq,aj,mU,NZ)
{
debug("Enter mail.js reportSpam "+Kh);
var am=aj||(window==getTopWin()?getMainWin():window);
if(!S("mail_frm",am))
{
debug("enter from maillist");

var fk=QMMailList.getCBInfo(am),
bt,
Yr=0,
aZ=fk.oMail.length,
mc={};
if(aZ==0)
{
showError(gsMsgNoMail);
return false;
}
for(var al=0;al<aZ;al++)
{

bt=fk.oMail[al];
if(bt.bSys)
{





}
Yr+=bt.bDft?1:0;
if(bt.sSEmail.indexOf("@groupmail.qq.com")!=-1)
{

Kh=true;
}else if(bt.sSEmail.indexOf("10000@qq.com")!=-1){

Kh=true;
}
if(typeof mc.sender=="undefined")
{
mc.sender=bt.sSEmail;
mc.nickname=bt.sSName;
}else if(mc.sender!=bt.sSEmail)
{
mc.sender="";
}
}
if(Yr==aZ)
{

mU=1;
}
else
{

for(al=0;al<aZ;al++)
{
bt=fk.oMail[al];




}
fk=QMMailList.getCBInfo(am);
QMMailList.selectedUI(fk);
}
}
if(mc)
debug("Has nick and sender "+mc.sender);
else
debug("No nick and sender");
var EE=new Array();
EE[0]="发件人";

if(mc&&mc.sender&&mc.sender.indexOf(',')<0)
{
EE[0]=mc.sender;
}

var aCQ=0;
if(NZ)
{
if(NZ[0].length>0)EE[aCQ++]=NZ[0];
if(NZ[1])EE[aCQ++]=NZ[1];
}
var GX=T([
'<div>',
'<input type="radio" name="reporttype" id="r$value$" value="$value$" $checked$>',
'<label for="r$value$">$content$</label>',
'</div>'
]);
var fB=(mU!==1?[
"<div style='padding:10px 10px 0 25px;text-align:left;'>",
"<form id='frm_spamtype'>",
"<div style='margin:3px 0 3px 3px'><b>请选择要举报的垃圾类型：</b></div>",
GX.replace({
value:(Nq?11:8),
checked:"checked",
content:"其他邮件"
}),

GX.replace({
value:(Nq?10:4),
checked:"",
content:"广告邮件"
}),

GX.replace({
value:(Nq?9:1),
checked:"",
content:"欺诈邮件"
}),
"<div style=\"padding:5px 0 2px 0;\">",
(Kh
?"&nbsp;"
:getRefuseText(EE)),"</div><div style='margin:10px 3px 0px 3px' class='addrtitle' >温馨提示：我们将优先采纳准确分类的举报邮件。</div>","</form>",
"</div><div style='padding:3px 15px 12px 10px;text-align:right;'>",
"<input type=button id='btn_ok' class='btn wd2' value=确定>",
"<input type=button id='btn_cancel' class='btn wd2' value=取消>",
"</div>"
]:[
"<div class='cnfx_content'>",
"<img style='float:left; margin:5px 10px 0;' src='",getPath("image"),"ico_question.gif' />",
"<div class='b_size' style='padding:10px 10px 0 0;margin-left:65px;line-height:1.5;height:80px;text-align:left;'>",
"<form id='frm_spamtype'>",
"<strong>您要举报这个漂流瓶吗？</strong><br>",
"<div style=\"display:none\">",
GX.replace({
value:8,
checked:"checked",
content:""
}),
"</div>",
"举报以后，您将不再收到这个漂流瓶的回应。","</form>",
"</div></div><div class='cnfx_btn'>",
"<input type=button id='btn_ok' class='btn wd2' value=确定>",
"<input type=button id='btn_cancel' class='btn wd2' style='margin-left:5px' value=取消>",
"</div>"
]).join("");

new(getTop().QMDialog)({
sId:"reportSpam",
sTitle:mU===1?"砸掉这个瓶子":"举报并拒收选中邮件",
sBodyHtml:fB,
nWidth:450,
nHeight:mU===1?150:220,
onload:function(){
var aD=this;
addEvent(aD.S("btn_ok"),"click",function()
{
var bz=S("mail_frm",getMainWin())||S("frm",getMainWin());
if(!bz)
{
return;
}
bz.s.value="readmail_spam";
bz.isspam.value='true';
bz.mailaction.value="mail_spam";
bz.action='/cgi-bin/mail_mgr?sid='+getTop().getSid();

var Lw=aD.S("frm_spamtype").reporttype,
GY=aD.S("frm_spamtype").refuse,
Nd=aD.S("frm_spamtype").refuse1;
for(var i=0,aw=Lw.length;i<aw;i++)
{
if(Lw[i].checked)
{
bz.reporttype.value=Lw[i].value;
break;
}
}
var ne=new Array();
ne[0]="0";
ne[1]="0";
if((GY&&GY.checked)||
(Nd&&Nd.checked))
{
bz.s.value="readmail_reject";
}

if(Nd)
{
debug("Pro refuse OK* "+GY.checked+" - "+Nd.checked);
if(GY&&GY.checked){
debug("what1? ---- ");
ne[0]="1";

debug("SRe"+ne[0]);
}else{
debug("what2? ");
ne[0]="0";
}
debug("sreject1 "+ne[0]+ne[1]);
if(Nd.checked)
ne[1]="1";
else
ne[1]="0";
debug("sreject2 "+ne[0]+ne[1]);
}
else 
{
ne[0]="1";
ne[1]="1";
}

if(bz.s_reject_what){
bz.s_reject_what.value=ne[0]+ne[1];
debug("Reject method "+bz.s_reject_what.value);
}

submitToActionFrm(bz);
aD.close();
});
addEvent(aD.S("btn_cancel"),"click",function(){aD.close()});

},
onshow:function(){
this.S("btn_cancel").focus();
}
});

return false;
}









function setSpamMail(mI,pA,by)
{
var afV=by||(window==getTopWin()?getMainWin():window);
if(mI&&!pA)
{
return reportSpam(null,null,afV);
}
setMailType("spam",mI,pA,afV);
}






function setCheatMail(mI,pA)
{
setMailType("cheat",mI,pA);
}






function doReject(mI,pA,by,ni)
{
var avY="此邮件地址";
if(ni){
avY="<"+ni+">";
}

var bz=S("mail_frm",by);
if(bz.s_reject_what)
{
bz.s_reject_what.value="10";
}

if(confirm("系统会把"+avY+"放入“黑名单”中，您将不再收到来自此地址的邮件。\n\n确定要拒收此发件人的邮件吗？"))
{
setMailType("reject",mI,pA,by);
}
}




function setFolderReaded(bO,vM,bkg,bmR)
{

var aZP=bO=="all"?parseInt(bmR||"0"):(vM?getGroupUnread(vM):getFolderUnread(bO));
if(aZP<1)
{
return showError("文件夹内没有未读邮件");
}

var jC=getSid(),
axG=unikey("allread"),
axL=function()
{
QMAjax.send("/cgi-bin/mail_mgr?mailaction=read_all&t=unreadmail_reg_data&loc=setFolderUnread,,,32",
{
method:"POST",
content:T('sid=$sid$&folderid=$folderid$&groupid=$groupid$').replace(
{
sid:jC,
folderid:bO!="all"?bO:"1&folderid=3&folderid=8&folderid=9&folderid=11&folderid=personal&folderid=pop&folderid=subscribe",
groupid:vM
}
),
onload:function(aH,bN)
{
if(aH&&bN.indexOf("mark_allmail_ok")>-1)
{
reloadFrmLeftMain(true,!!getMainWin()[axG]);
showInfo("文件夹标为已读操作成功");
}
else
{
showError("文件夹标为已读操作失败，请重试");
}
}
});
};
getMainWin()[axG]=1;
if(bO!=1)
{
axL();
}
else
{
var aZv={
"1":"收件箱",
"8":"群邮件"
},
apx=bkg||aZv[bO]||"邮件订阅",
fB=T([
'<div class="markall">',
'<div class="markall-title">将 “$foldername$” 全部邮件标为已读：</div>',
'<div class="markall-content">',
'<a id="btn_ok" class="markall-confirm" href="javascript:;">全部标为已读</a>',
'<p>一次性把该文件夹中的未读邮件标为已读</p>',
'<a id="mailassistant" class="markall-assis" href="javascript:;">使用清理助手</a>',
'<p>分类清理未读邮件，如：来自好友邮件、来自陌生人邮件、订阅邮件等</p>',
'</div>',
'</div>'
]).replace({"foldername":apx});
new(getTop().QMDialog)({
sId:"setFolderReaded",
sTitle:"全部标为已读",
sBodyHtml:fB,
nWidth:450,
nHeight:150,
onload:function(){
var aD=this;
addEvent(aD.S("btn_ok"),"click",function()
{
axL();
aD.close();
});
addEvent(aD.S("mailassistant"),"click",function()
{
getMainWin().location=T("/cgi-bin/folderlist?needunread=true&sid=$sid$&t=unreadmail_reg1&needunread=true&loc=setFolderUnread,,,30").replace({"sid":jC});
aD.close();
});

},
onshow:function(){
this.S("btn_ok").focus();
}
});
}
}






function linkMaker(DJ)
{
function ZJ(aU)
{
var dS=12,
dv=aU||"",
cd=[],
aw=dv.length/dS;

for(var i=0;i<aw;i++)
{
cd[i]=dv.substr(i*dS,dS);
}

return cd.join("<wbr>");
}

return DJ
.replace(
/(https?:\/\/[\w.]+[^ \f\n\r\t\v\"\\\<\>\[\]\u2100-\uFFFF]*)|([a-zA-Z_0-9.-]+@[a-zA-Z_0-9.-]+\.\w+)/ig,

function(adB,bWU,Qu)
{
if(Qu)
{
return['<a href="mailto:',Qu,'">',
ZJ(Qu),'</a>'].join("");
}
else
{
return['<a href="',adB,'">',
ZJ(adB),'</a>'].join("");
}
}
);
}





function linkIdentify(aB)
{
if(!aB||aB.tagName=="A"||aB.tagName=="SCRIPT"
||aB.tagName=="STYLE"||aB.className=="qqmailbgattach")
{
return;
}

for(var cy=aB.firstChild,nextNode;cy;cy=nextNode)
{
nextNode=cy.nextSibling;
linkIdentify(cy);
}

if(aB.nodeType==3)
{
var dv=aB.nodeValue.replace(/</g,"&lt;").replace(/>/g,"&gt;"),
cF=linkMaker(dv);

if(dv!=cF)
{
var fZ=false;

if(aB.previousSibling)
{
fZ=insertHTML(aB.previousSibling,"afterEnd",cF);
}
else
{
fZ=insertHTML(aB.parentNode,"afterBegin",cF);
}

if(fZ)
{
removeSelf(aB);
}
}
}
}







function agd(ak)
{
var fP=ak.href||"",
cZ=ak.ownerDocument,
eC=(cZ.parentWindow||cZ.defaultView).location;
return!ak.onclick&&fP&&fP.indexOf("javascript:")!=0&&fP.indexOf("#")!=0&&
fP.indexOf(eC.protocol+"//"+eC.hostname+"/")!=0;

}







function swapLink(ao,so,by)
{
var bp=ao.ownerDocument?ao:S(ao,by);
if(bp)
{
function XR(Mr)
{
if(agd(Mr))
{
Mr.target="_blank";
Mr.onclick=function()
{
return agH.call(this,so);
};
}
}

linkIdentify(bp);
E(GelTags("a",bp),XR);
E(GelTags("area",bp),XR);
E(GelTags("form",bp),function(aJc)
{
aJc.onsubmit=function()
{
var eC=by.location;

if(eC.getParams()["filterflag"]=="true"||this.action)
{
this.target="_blank";
return true;
}

showError(T(['出于安全考虑该操作已被屏蔽 [<a onclick="',
'setTimeout( function() {',
'goUrlMainFrm(\x27$url$&filterflag=true\x27);',
'showInfo(\x27取消屏蔽成功\x27);','});',
'" style="color:white;" >取消屏蔽</a>]']).replace({url:eC.pathname+eC.search}));

return false;
};
}
);
}
}






function preSwapLink(ah,so)
{
var ap=getEventTarget(ah);
if(ap
&&{"A":1,"AREA":1}[ap.tagName]
&&agd(ap))
{
agH.call(ap,so)&&window.open(ap.href);
preventDefault(ah);
}
}








function swapImg(ao,bXR,so,aj)
{














































































}




function openSpam(aj)
{
aj=aj||window;
if(true||confirm("此邮件的图片可能包含不安全信息，是否查看？"))
{
aj.location.replace(appendToUrl(aj.location.href,"&disptype=html&dispimg=1&clickshowimage=1"));
}
}




function openHttpsMail(aj)
{
aj.location.replace(appendToUrl(aj.location.href,"&dispimg=1"));
}






function copyToClipboard(eH)
{
try
{
if(gbIsFF)
{
netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(eH);
}
else
{

var kO=S("copyinputcontainer");
if(!kO)
{
insertHTML(document.body,"beforeEnd",'<input id="copyinputcontainer" style="position:absolute;top:-1000px;left:-1000px;"/>');
kO=S("copyinputcontainer");
}
kO.value=eH;
kO.select();
document.execCommand('Copy');
}
}
catch(e)
{
alert(T('您的浏览器安全设置不允许编辑器自动执行复制操作，请使用键盘快捷键($cmd$+C)来完成。').replace({cmd:gbIsMac?"Command":"Ctrl"}));
return false;
}
return true;
}






function agH(so)
{
var bG=this;

if(bG.href.indexOf("mailto:")==0&&bG.href.indexOf("@")!=-1)
{
window.open(["/cgi-bin/readtemplate?sid=",getSid(),
"&t=compose&s=cliwrite&newwin=true&email=",
bG.href.split("mailto:")[1]].join(""));
return false;
}
else if(bG.className=="qqmail_card_reply"
||bG.className=="qqmail_card_reply_btn"
||bG.className=="qqmail_birthcard_reply"
||bG.className=="qqmail_birthcard_reply_btn")
{






var cS=bG.name,
bH=bG.className,
aeN=!!cS,
ayU=bH.indexOf("birthcard")!=-1;

getMainWin().location=T('/cgi-bin/cardlist?sid=$sid$&t=$t$&s=$s$&today_tips=$tips$&loc=readmail,readmail,sendnewcard,1&ListType=$listtype$&email=$email$$newwin$').replace(
{
sid:getSid(),
t:aeN?"compose_card":"card",
s:ayU?"replybirthcard":"",
tips:bH.indexOf("btn")!=-1?"112":"111",
listtype:aeN?"No":"Cards&Cate1Idx=listall",
email:cS,
newwin:getTop().bnewwin?"&newwin=true":""
});
return false;
}
else if(bG.className=="qqmail_postcard_reply_mobile")
{
var ku=getMainWin().QMReadMail;
if(ku)
{
getMainWin().location=T("/cgi-bin/readmail?sid=$sid$&mailid=$mailid$&t=compose&s=reply&disptype=html").replace(
{
sid:getSid(),
mailid:ku.getMailId()
})
}
return false;
}
else if(bG.className=="qqmail_postcard_sendhelp_mobile")
{
window.open("http://service.mail.qq.com/cgi-bin/help?subtype=1&&id=36&&no=1000696");
return false;
}
else if(bG.className=="qqmail_card_reply_thanksbtn"
||bG.className=="qqmail_card_reply_thanks"
||bG.className=="qqmail_birthcard_reply_thanksbtn")
{
var cS=bG.name;

openComposeDlg("card",{
sTitle:"答谢好友",
sDefAddrs:cS,
bAddrEdit:true,
sDefContent:"谢谢你的贺卡！ 以后要常联系哦。",
bContentEdit:true,
sDefSubject:"谢谢你的贺卡!",
bRichEditor:false,
oncomplete:function(){},

bShowResult:true
});
return false;
}












else if(bG.className=="qqmail_postcard_reply")
{
goUrlMainFrm(
T('/cgi-bin/readtemplate?sid=$sid$&t=compose_postcard&email=$email$'
).replace({
sid:getSid(),
email:bG.name
}),false
);
return false;
}
else if(bG.className=="qqmail_postcard_reply2")
{
var Xb='',
Ke='',
ku=getMainWin().QMReadMail;
if(ku)
{
try
{
var CL=(ku.getSubMailWithDom?ku.getSubMailWithDom(bG):ku.getMailInfo()).from;
Xb=CL&&CL.name||'';
Ke=CL&&CL.addr||'';
}
catch(e)
{
}
}
goUrlMainFrm(
T('/cgi-bin/readtemplate?sid=$sid$&t=compose_postcard&email=$email$&reply=1&frname=$name$&fraddr=$addr$'
).replace({
name:escape(Xb),
addr:escape(Ke),
sid:getSid(),
email:bG.name
}),false
);
return false;
}












else if(bG.className=="qqmail_postcard_print")
{
var ku=getMainWin().QMReadMail;
if(ku)
{
window.open(T('/cgi-bin/readmail?sid=$sid$&t=print_haagendazs&s=print&filterflag=true&mailid=$mailid$').replace(
{
sid:getSid(),
mailid:ku.getMailId()
})
);
}
return false;
}
else if(bG.className=="qqmail_postcard_getmoreinfo")
{
var ku=getMainWin().QMReadMail;
if(ku)
{
window.open(T('/cgi-bin/today?t=haagendazs2010&sid=$sid$').replace(
{
sid:getSid(),
mailid:ku.getMailId()
})
);
}
return false;
}
else if(bG.className=="qqmail_videomail_reply")
{
goUrlMainFrm(
T('/cgi-bin/readtemplate?sid=$sid$&t=compose_video&email=$email$'
).replace({
sid:getSid(),
email:bG.name
}),false
);
return false;
}
else if(bG.className=="groupmail_open")
{
getMainWin().location=["/cgi-bin/grouplist?sid=",getSid(),
"&t=compose_group",(getTop().bnewwin?"&newwin=true":"")].join("");
return false;
}
else if(bG.className=="reg_alias")
{
getMainWin().location=[
"/cgi-bin/readtemplate?reg_step=1&t=regalias_announce&sid=",
getSid()].join("");
return false;
}

else if(bG.className=="mergemail_reader_article_list_link")
{
var aKY=bG.getAttribute("ctype");
var KS=bG.getAttribute("param_new");
var aq="";


if(KS.indexOf("follow=1")>=0)
{
var aIc=bG.getAttribute("followuin");
aq=(getTop().gsRssDomain||"")+"/cgi-bin/reader_mgr";
QMAjax.send(aq,
{
method:"POST",
content:"fun=followshare&followuin="+aIc+"&sid="+getSid(),
onload:function(aH,aPq)
{
if(aH)
{

getMainWin().location=T('$host$/cgi-bin/reader_article_list?sid=$sid$&$param$'
).replace({
host:(getTop().gsRssDomain||""),
sid:getSid(),
param:KS
});
}
}
});
}

else
{
getMainWin().location=T('$host$/cgi-bin/reader_article_list?sid=$sid$&$param$'
).replace({
host:(getTop().gsRssDomain||""),
sid:getSid(),
param:KS
});
}


if(aKY=="onefeed")
{
aq=(getTop().gsRssDomain||"")+"/cgi-bin/reader_mgr?fun=setlog&flag=3&from=2";
}
else
{
aq=(getTop().gsRssDomain||"")+"/cgi-bin/reader_mgr?fun=setlog&flag=3&from=4";
}
runUrlWithSid(aq);

return false;
}
else if(bG.className=="mergemail_reader_setting_link")
{

getMainWin().location=T('$host$/cgi-bin/reader_setting?t=rss_setting_notify&sid=$sid$&$param$'
).replace({
host:(getTop().gsRssDomain||""),
sid:getSid(),
param:bG.getAttribute("param")
});


var aq=(getTop().gsRssDomain||"")+"/cgi-bin/reader_mgr?fun=setlog&flag=3&from=3";
runUrlWithSid(aq);
return false;
}
else if(bG.className=="reader_article_list_link")
{

getMainWin().location=T('$host$/cgi-bin/reader_article_list?sid=$sid$&$param$').replace(
{
host:(getTop().gsRssDomain||""),
sid:getSid(),
param:bG.getAttribute("param")
}
);

return false;
}

else if(bG.className=="reader_detail_qqmail_link")
{
var cR=[];

E(bG.getAttribute("param").split("&"),function(bN)
{
if(bN.indexOf("share=1")<0)
{
cR.push(bN);
}
}
);

getMainWin().location=T('$host$/cgi-bin/reader_detail?sid=$sid$&$param$'
).replace({
host:(getTop().gsRssDomain||""),
sid:getSid(),
param:cR.join("&")
});
return false;
}
else if(bG.className=="reader_list_qqmail_link")
{
var cR=[];

E(bG.getAttribute("param").split("&"),function(bN)
{
cR.push(bN);
}
);
getMainWin().location=T('$host$/cgi-bin/reader_list?classtype=allfriend&refresh=1&share=1&sid=$sid$&$param$'
).replace({
host:(getTop().gsRssDomain||""),
sid:getSid(),
param:cR.join("&")
});
return false;
}
else if(bG.className=="reader_catalog_list_qqmail_link")
{
var cR=[];

E(bG.getAttribute("param").split("&"),function(bN)
{
cR.push(bN);
}
);

getMainWin().location=T('$host$/cgi-bin/reader_catalog_list?sid=$sid$&classtype=share&share=1&refresh=1&$param$'
).replace({
host:(getTop().gsRssDomain||""),
sid:getSid(),
param:cR.join("&")
});
return false;
}
else if(bG.className=="ftn_groupshare_enter_link")
{
getMainWin().location.href=T(
'/cgi-bin/ftnExs_files?listtype=group&s=group&t=exs_ftn_files&sid=$sid$'
).replace({sid:getSid()});
return false;
}
else if(bG.className=="book_article_list_link")
{

getMainWin().location=T('/cgi-bin/setting10?sid=$sid$&$param$').replace(
{
sid:getSid(),
param:bG.getAttribute("param")
}
);

return false;
}



if(1)
{

if(bG.href.indexOf("javascript:void(0)")>=0)
{

return false;
}
if(so!="preview"&&getMainWin().location.href.indexOf('/cgi-bin/readmail?')<0)
{
return true;
}

var gE=bG.parentNode;
while(gE)
{
if(gE.nodeType==1&&(gE.id=="QQmailNormalAtt"||gE.id=="attachment"))
{
return true;
}
gE=gE.parentNode;
}

window.open(T('/cgi-bin/mail_spam?sid=$sid$&action=check_link&url=$url$&mailid=$mid$&spam=$spam$').replace(
{
mid:getMainWin().location.getParams()['mailid'],
spam:so=="spam"?1:0,
sid:getSid(),
url:escape(bG.href)
}
),"_blank");
return false;
}

var dv="http://mail.qq.com/cgi-bin/feed?u=";
if(bG.name=="_QQMAIL_QZONESIGN_"||bG.href.indexOf(dv)==0)
{
if(bG.name=="_QQMAIL_QZONESIGN_")
{
var aGG=bG.href.split("/"),
ff=parseInt(aGG[2]),
bu=[
"&sid=",
getSid(),
"&u=http%3A%2F%2Ffeeds.qzone.qq.com%2Fcgi-bin%2Fcgi_rss_out%3Fuin%3D",
ff
].join("");
}
else
{
var afW=bG.href.substr(dv.length);
if(afW.indexOf("http%3A%2F%2F")==0
||afW.indexOf("https%3A%2F%2F")==0)
{
var bu=["&sid=",getSid(),"&u=",bG.href.substr(dv.length)]
.join("");
}
else
{
var bu=["&sid=",getSid(),"&u=",
encodeURIComponent(bG.href.substr(dv.length))].join("");
}
}
if(getTop().bnewwin)
{
goUrlTopWin(["/cgi-bin/frame_html?target=feed",bu].join(""));
}
else
{
goUrlMainFrm(["/cgi-bin/feed?",bu].join(""),false);
}
return false;
}
else if(bG.name=="QmRsSRecomMand")
{
getMainWin().location=T("$host$/cgi-bin/reader_detail?vs=1&feedid=$feedid$&itemid=$itemid$&t=compose&s=content&mailfmt=1&sid=$sid$&newwin=$isnewwin$&tmpltype=recommend&loc=reader_detail,rss_recommend,,2").replace({
host:(getTop().gsRssDomain||""),
feedid:bG.getAttribute("feedid"),
itemid:bG.getAttribute("itemid"),
sid:getSid(),
isnewwin:!!getTop().bnewwin
});
return false;
}

return true;
}





function goPrevOrNextMail(acC)
{
var bp,
bj=getMainWin();

if(!!(bp=S(["prevmail","nextmail"][acC?1:0],bj))
&&!bp.getAttribute("disabled"))
{

}
else if(!!(bp=S(["prevpage","nextpage"][acC?1:0],bj))
&&!bp.getAttribute("disabled"))
{
bj.location=bp.href;
}
}





function goBackHistory()
{
var qQ=SN("readmailBack",getMainWin());
if(qQ.length>0&&isShow(qQ[0]))
{
fireMouseEvent(qQ[0],"click");
return true;
}
return false;
}
















function MLIUIEvent(qm,aj,bO)
{
var ee=qm.value,
bq=QMMailCache,
Ml=bq.isRefresh(aj),
mE=qm.parentNode;
while(mE.tagName.toUpperCase()!="TABLE")
{
mE=mE.parentNode;
}
var fS=GelTags("table",mE)[0],
sB=GelTags("td",GelTags("tr",fS)[0]),
bXt=sB[1],
uu=sB[sB.length-1];

qm.setAttribute('init','true');
QMReadedItem.addItem(qm);


if(uu.className=="new_g")
{
uu=sB[6];
}


var PS=GelTags("div",fS),
zU;
for(var al=PS.length-1;al>=0;al--)
{
if(PS[al].className=="TagDiv")
{
zU=PS[al];
break;
}
}


if(bq.hasData(ee))
{
if(!Ml)
{
var au=bq.getData(ee);
if(qm.getAttribute("unread")=="true")
{
bq.addVar("unread",-1);
}
agI(qm,mE,false,au.reply);
Yf(qm,mE);

if(au.star!=null)
{
setClass(uu,au.star?"fg fs1":"fg");
bq.addVar("star",au.star?1:-1);
}

if(au.oTagIds)
{
var qL=GelTags("table",fS),
na=au.oTagIds,
yL,
agP={};

if(zU)
{
for(var al=qL.length-1;al>=0;al--)
{
if(yL=qL[al].getAttribute("tagid"))
{
agP[yL]=1;
}
}
for(var GP in na)
{
if(na[GP]===0)
{

QMTag.rmTagUI(zU,GP);
}
else if(!agP[GP])
{

QMTag.addTagUI(zU,GP,bO,ee,false);
}
}
}
}
}
else
{

bq.addData(ee,
{
oTagIds:{},
star:null,
reply:null
});
}
}

listMouseEvent(mE);

uu.title=uu.className=="fg"?"标记星标":"取消星标";
addEvent(uu,'click',function(ah)
{
starMail(null,QMMailList.getCBInfo(aj,ee));
return stopPropagation(ah);
}
);
addEvent(mE,"click",GetListMouseClick(aj));
addEvent(mE,"selectstart",preventDefault);


var Or=fS.rows[0].cells[1];
if(Or.className.indexOf("fr")>-1)
{
loadJsFile(getPath("js")+getFullResSuffix("qmtip.js"),true);
addEvent(Or,"mouseover",MLI.Zm);
addEvent(Or,"mouseout",MLI.Zm);
}


addEvent(zU,'click',function(ah)
{
if(QMTag.readclose(ah,QMMailList.getCBInfo(aj,ee)))
{
return stopPropagation(ah);
}
}
);

dragML(mE,qm);

}






function MLI(bzP,aj,bO,AI)
{














var agv=SN("mailid",aj),
sS=agv[agv.length-1],
ee=sS.value,
aX=sS.parentNode,
bq=QMMailCache,
Ml=bq.isRefresh(aj);

while(aX.tagName.toUpperCase()!="TABLE")
{
aX=aX.parentNode;
}

MLIUIEvent(sS,aj,bO);


var avH=sS.getAttribute("uw")=="1",
abE=avH?aj.oPreUWMails:aj.oPreMails,
avx=abE.length,
aNb=Ml?2:1,

bht=new Date()-new Date(parseInt(sS.getAttribute("totime")))<2592000000,

aut=!/^(LP|ZP)/.test(ee)&&bht&&sS.getAttribute("unread")=="true"&&avx<aNb&&!rdVer.log(ee);

if(aut&&rdVer.isPre(bO))
{
var aq,
qg=sS.getAttribute("gid");

aq=rdVer.url(ee,bO,AI,"",false,"",false,"",true);

if(aq)
{
abE.push(aq);
}
}

if(getTop().gsReadedMailId==ee)
{
QMReadedItem.disp(aX);
recordReadedMailId(null);
}

}









function MLJump(brn,boe,aE,aj)
{
var bmU=SN("maillistjump",aj.document),
aCw="_MlJuMp_",
Te=parseInt(brn)||0,
bdO=parseInt(boe)||0;

function ayx(ao)
{
var IU=getTop().QMMenu(ao).S("txt"),
nb=parseInt(IU.value);

if(isNaN(nb))
{
IU.select();
return showError("请输入跳转的页数");
}

nb=Math.max(0,Math.min(nb-1,bdO));
if(Te==nb)
{
IU.select();
return showError("你输入了当前页数");
}

getTop().QMMenu(ao).close();
goUrlMainFrm([aE,'&page=',nb,'&loc=mail_list,,jump,0'].join(''));
}

E(bmU,function(TN)
{
if(!TN.getAttribute(aCw))
{
TN.setAttribute(aCw,"1");
addEvents(TN,
{
click:function(ah)
{
var aA=unikey("mljump"),
bI=calcPos(TN),
bC=185,
bS=40;


new(getTop().QMMenu)(
{
sId:aA,
oEmbedWin:aj,
nWidth:bC,
nX:bI[1]-bC,
nY:bodyScroll(aj,"scrollHeight")-bI[2]<bS?(bI[0]-bS-13):bI[2],
bAutoClose:false,
oItems:
[
{
nHeight:bS,
sItemValue:MLJump.xm.replace({id:aA})
}
],
onshow:function()
{
this.S("txt").focus();
}
}
);

addEvent(getTop().QMMenu(aA).S("txt"),"keypress",function(ah)
{
var dC=ah.keyCode||ah.which;
if(dC===13)
{
ayx(aA);
}
else if((dC<48||dC>57)&&dC!=8&&dC!=9)
{
preventDefault(ah);
}
}
);

addEvent(getTop().QMMenu(aA).S("btn"),"click",function(ah)
{
ayx(aA);
}
);

preventDefault(ah);
}
}
);
}
}
);
}

MLJump.xm=T(
[
'<div style="position:absolute;width:160px;margin-left:-7px;">',
'<div class="addrtitle jumpmenusdjust" style="float:left;">跳转到第 <input id="txt" type="text" class="txt" style="width:30px;" /> 页</div>',
'<a id="btn" href="javascript:;" class="left button_gray_s" style="width:40px; margin:7px 0 0 5px; _display:inline;">&nbsp;确定&nbsp;</a>',
'</div>'
]
);







function initDropML()
{
function GH(ak)
{
var bI=calcPos(ak),
eo=S('dragtitle'),
kG=eo.offsetLeft,
jY=eo.offsetTop;
return(bI[1]>kG&&bI[3]<kG&&bI[2]>jY&&bI[0]<jY)?ak:null;
}

function Ad(ak,agC)
{
if(ak&&ak.id.indexOf('folder_')>=0)
{
var bH=ak.className,
abi=bH.indexOf('toolbg')>-1;
if(agC&&abi)
{
setClass(ak,bH.replace(/\btoolbg\b/g,''));
}
else if(!abi&&!agC)
{
setClass(ak,bH+' toolbg');
}
}
}

var eo=S('dragtitle'),
Yd=S('OutFolder'),
abu='inidrop',
oR=BaseMailOper.getInstance(getMainWin()),
PC=QMDragDrop,
ZZ='mail_list';

if(Yd.getAttribute(abu)=='true')
{

return false;
}
Yd.getAttribute(abu,'true');
PC.delGroup(ZZ);

var sc=null,

MY=false,
iM=null,
fD=null,
pJ=null,



acN=/^([489]|personal|pop|tag)$/,

abk=new PC.DropTarget(
S('OutFolder'),
{





ondragover:function(nk)
{
if(iM==fD)
{
return;
}
var bGw=iM&&iM.id||'',
On=fD&&fD.id||'',
OW=iM&&iM.getAttribute('dp'),
Le=fD&&fD.getAttribute('dp'),
aaF=fD&&fD.getAttribute('dr');


if(Le)
{
showFolders(Le,true,getTop());
}
if(OW&&OW!=Le)
{
showFolders(OW,false,getTop());
}

Ad(iM,1);
Ad(fD);


if(pJ)
{
clearTimeout(pJ);
}
MY=aaF&&!acN.test(aaF);
pJ=setTimeout(function(){
setClass(eo,MY?'drag_over':'drag_out');
pJ=null;
},50);

iM=fD;
},





ondrop:function(nk)
{
if(!fD||!MY)
{
return;
}
var ew=oR.getMailInfo().sFid,
aA=fD.getAttribute('dr')||'';
ossLog("delay","all","stat=drag&opr="+aA);


if(aA=='6')
{

Ad(iM,1);
iM=null;
oR.apply('spammail');
dragML.QF=true;
return;
}
else if(acN.test(aA))
{
Ad(iM,1);
iM=null;
return;
}
else if(aA.indexOf('tag_')>=0)
{

aA=aA.replace('tag','tid');
}
else if(aA=='starred')
{
aA='star';
}
else if((ew==5||ew==6)&&aA==5)
{
aA='predelmail';
dragML.QF=true;
}
else if(parseInt(aA))
{
aA={5:'delmail'}[aA]||'fid_'+aA;
}
else
{
return;
}
oR.apply(aA);
eo.setAttribute('na','true');
var iQ=new qmAnimation(
{
from:100,
to:1
}
);
iQ.play(
{
speed:"slow",
onaction:function(bn,eU)
{
setOpacity(eo,bn/100.0);
},
oncomplete:function(bn,MR)
{
show(eo,0);
setClass(eo,'drag_out');
setOpacity(eo,100);
Ad(iM,1);
iM=null;
}
});
}
},
function(kG,jY,nk){






if(gbIsIE)
{
var ap=getEventTarget(nk.event),
aMD=/(folder_\w+_td|(personal|pop|tag)foldersDiv)/;
while(ap&&!aMD.test(ap.id))
{
ap=ap.parentNode;
}
fD=ap;
}
else if(fD=GH(S('OutFolder')))
{


var er=['personal','pop','tag'],
yu=null,
afL=null,
wn,
i;
for(i=er.length-1;i>=0;i--)
{
if(yu=GH(S(er[i]+'foldersDiv')))
{
break;
}
}

if(yu=yu||GH(S('SysFolderList')))
{

wn=GelTags('li',yu);
for(i=wn.length-1;i>=0;i--)
{
if(afL=GH(wn[i]))
{
break;
}
}
}
fD=afL||yu;

}
return!!(iM||fD);
}
);
PC.addGroup(ZZ,abk);
}

function dragML(ak,dI)
{
if(!S('OutFolder')||!QMDragDrop)
{


return;
}
var ad=dragML,
aA='dragtitle',
eo=S(aA);
if(!eo)
{
insertHTML(getTop().document.body,'afterBegin','<div id="dragtitle" class="drag_out" style="display:none;"></div>');
eo=S(aA);
}
var sc,

ajg=new QMDragDrop.Draggable(
ak,
{

threshold:5,
oTitle:eo
},
{
ondragstart:function(ah)
{
ad.QF=dI.checked==true;
dI.checked=true;
var am=getMainWin(),
oR=BaseMailOper.getInstance(am),
cj=QMMailList.getCBInfo(am);
QMMailList.selectedUI(cj);
oR.setMailInfo(cj);
eo.innerHTML=['选中 ',cj.oMail.length,' 封邮件'].join('');

ossLog("delay","all","stat=drag&c="+cj.oMail.length);









sc=gbIsIE?[0,0,0,0]:calcPos(am.frameElement);
eo.style.left=sc[3]+ah.clientX+'px';
eo.style.top=sc[0]+ah.clientY+'px';
eo.setAttribute('na','');
show(eo,1);

initDropML();
},
ondrag:function(ah)
{
eo.style.left=sc[3]+ah.clientX+'px';
eo.style.top=sc[0]+ah.clientY+'px';
},
ondragend:function(ah)
{
if(!eo.getAttribute('na'))
{

show(eo,0);
setClass(eo,'drag_out');
}
if(!ad.QF)
{
dI.checked=false;
var aij=QMMailList.getCBInfo(getMainWin());
QMMailList.selectedUI(aij);
}
}
}
);
QMDragDrop.addGroup('mail_list',ajg);


var aI=ak.ownerDocument,
am=aI.parentWindow||aI.defaultView,
Fw=dragML.Fw=dragML.Fw||unikey('drag');
if(!am[Fw])
{
addEvent(am,'unload',function(){
if(eo.releaseCapture)
{
eo.releaseCapture();
}
show(eo,0);
});
am[Fw]=1;
}
}




MLI.Zm=function(ah)
{
var ae=getTop(),
ad=arguments.callee,
uK=ah.clientX,
tW=ah.clientY,
aB=getEventTarget(ah);
while(aB&&aB.tagName.toUpperCase()!="TD")
{
aB=aB.parentNode;
}
if(ad.oJ)
{
clearTimeout(ad.oJ);
ad.oJ=0;
}

if(ah.type=="mouseout")
{
ae.QMTip&&ae.QMTip.showMailList(0,aB.ownerDocument);
return;
}

ad.oJ=setTimeout(function(){
var YJ=ae.GelTags("b",aB.parentNode.cells[2]),
aag=YJ[YJ.length-1];

if(!ae.QMTip||!aag||(ad.tJ==uK&&ad.tR==tW))
{
return;
}

ad.tJ=uK;
ad.tR=tW;

var nr=aag.innerHTML.replace(/^\&nbsp;-\&nbsp;/,"").replace(/\&nbsp;/gi,"&nbsp; ").replace(/&lt;br\/?&gt;/g,'<br/>');
ae.QMTip.showMailList(1,aB.ownerDocument,nr,uK,tW);
},250);
};





function MLI_A(cZ)
{
var vn=GelTags("table",cZ),
aIh=vn.length,

aX=vn[aIh-1],
ee=aX.getAttribute("mailid");

if(QMMailCache.hasData(ee))
{
if(!QMMailCache.isRefresh(window))
{
setClass(aX,"i M");
}
else
{
QMMailCache.delData(ee);
}
}

listMouseEvent(aX);

addEvent(aX,"selectstart",preventDefault);
}










function acQ(dI,ox,le,Eo)
{
if(!(dI&&dI.type=="checkbox"))
{
return false;
}

if(le==null)
{
return dI.getAttribute("unread")=="true";
}

if(!ox)
{
ox=dI.parentNode.parentNode.parentNode.parentNode;
}

if((dI.getAttribute("unread")=="true")==!!le
&&!Eo)
{
return le;
}

var qg=dI.getAttribute("gid");
if(qg)
{
setGroupUnread(qg,getGroupUnread(qg)-1);
setGroupUnread("gall",getGroupUnread("gall")-1);
}

dI.setAttribute("unread",le?"true":"false");

setClass(ox,
[le?"i F":"i M",dI.checked?" B":""].join(""));
setClass(GelTags("table",ox)[0],le?"i bold":"i");


var afB=GelTags("div",ox)[1];
if(!/(s[016789]bg)|(Rw)/.test(afB.className))
{
var RC=Eo?"r":dI.getAttribute("rf"),
SE=dI.getAttribute("isendtime"),
bH="Rr";

if(SE)
{
bH=SE=="0"?"Rc":"Ti";
}
else if(le)
{
bH="Ru";
}
else if(RC)
{
bH=RC=="r"?"Rh":"Rz";
}

setClass(afB,"cir "+bH);
}

return le;
}






function aFq(dI)
{
return acQ(dI);
}









function agI(dI,ox,le,Eo)
{
return acQ(dI,ox,le,Eo);
}








function Yf(dI,ox)
{
if(!dI||!dI.getAttribute("gid"))
{
return false;
}

var abT=GelTags("b",ox)[0],
rq=abT&&abT.parentNode;

if(rq&&rq.className=="new_g")
{
rq.style.visibility="hidden";
return true;
}

return false;
}






function getMailListInfo()
{
var bj=getMainWin(),
abt=S("_ut_c",bj),
agb=S("_ur_c",bj),
Zr=S("_ui_c",bj);

return{
totle:(abt&&parseInt(abt.innerHTML))||0,
unread:(agb&&parseInt(agb.innerHTML))||0,
star:(Zr&&parseInt(Zr.innerHTML))||0
};
}








function setMailListInfo(pB,nV,KW)
{
var bj=getMainWin(),
fZ=true,
QY=S("_ur",bj),
aCy=S("_ui",bj),
aJJ=S("_ut",bj),
bp;

if(!isNaN(pB=parseInt(pB)))
{
if(!!(bp=S("_ur_c",bj)))
{
bp.innerHTML=Math.max(0,pB);
show(QY,pB>0);
}
else
{
fZ=false;
}
var FJ=S("tip_unread",bj);
if(FJ)
{
FJ.innerHTML=pB<0?parseInt(FJ.innerHTML)+pB:pB;
show(FJ,pB);
}
}

if(!isNaN(nV=parseInt(nV)))
{
nV=Math.max(0,nV);
if(!!(bp=S("_ui_c",bj)))
{
bp.innerHTML=nV;
show(aCy,nV!=0);
}
else
{
fZ=false;
}
}

if(!isNaN(KW=parseInt(KW)))
{
nV=Math.max(0,KW);
if(!!(bp=S("_ut_c",bj)))
{
bp.innerHTML=nV;
show(aJJ,nV!=0);
}
else
{
fZ=false;
}
}

show(
S("_uc",bj),
isShow(QY)

);
show(
S("_ua",bj),
isShow(QY)

);

return fZ;
}








function readMailFinish(av,an,bO,auM)
{
var bj=getMainWin(),
KC=S("load_"+av,bj),
aX,hX;

QMMailCache.addData(av);

if(KC)
{
show(KC,false);

aX=KC.parentNode.previousSibling;
hX=GelTags("input",aX)[0];
}
else
{
var fA=GelTags("input",bj.document);
for(var i=0,aw=fA.length;i<aw;i++)
{
if(fA[i].type=="checkbox"
&&fA[i].value==av)
{
hX=fA[i];
break;
}
}
aX=hX;
while(aX.tagName.toUpperCase()!="TABLE")
{
aX=aX.parentNode;
}
}


var qL=GelTags("table",aX),
Dc=false;
for(var al=qL.length-1;al>=0;al--)
{
if(qL[al].getAttribute("tagid"))
{
Dc=true;
break;
}
}

Yf(hX,aX);

if(hX&&aFq(hX))
{
agI(hX,aX,false);
setMailListInfo(getMailListInfo().unread-1);


if(hX.getAttribute('star')=='1')
{
setFolderUnread('starred',getFolderUnread('starred')-1);
}

if(bO&&parseInt(bO)>0&&!Dc)
{
setFolderUnread(bO,auM
?getGroupUnread("gall")
:getMailListInfo().unread);
}
else
{
reloadLeftWin();
}
}
}









function checkMail(iU)
{
if(iU=="")
{
showError("添加的内容不能为空");
return false;
}

if(!iU.match(/^[\.a-zA-Z0-9_=-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/))
{
showError("您输入的邮箱地址不正确，请重新输入");
return false;
}

return true;
}








function checkAndSubmit(ao)
{
var bf=S(ao);

if(!checkMail(trim(bf.value)))
{
bf.focus();
return false;
}

submitToActionFrm(bf.form);
}






function pushToDialogList(ao)
{
var ae=getTop();

if(!ae.goDialogList)
{
ae.goDialogList=new ae.Object;
}

if(ao)
{
ae.goDialogList[ao]=true;
}
}





function showDialogNewReadMail(aBR,aHd,UU,av)
{
new(getTop().QMDialog)({
sId:"addnewremind_qqmail",
sTitle:"新建提醒",
sUrl:T("/cgi-bin/read_reminder?linkid=%linkid%&linktitle=%linktitle%&sid=%sid%&t=remind_edit&from=%from%","%").replace({
sid:getSid(),
linkid:aBR,
linktitle:aHd,
from:UU
}),
nWidth:450,
nHeight:360
})
av&&rdVer(av,1);
}

function setRemindSpan(av,aj)
{


getTop().S('remind_edit_'+av,aj).innerHTML=(getTop().reminddetail["mailid:"+av]||"")
.replace(/linktitle=.*&sid=/g,function(aT)
{
return aT.replace(/\'/g,"&#039;");
}
);
}


function submitSwitchForm()
{
var cW=getTop().S("frmSwitch");
cW&&cW.submit();
}
















function getDomain(awl)
{
return[["foxmail.com","qq.com","biz"],["Foxmail.com","QQ","腾讯"]][
awl?1:0][/,7$/.test(getSid())?2:(location.href.indexOf("foxmail.com")>-1?0:1)];
}
var GetDomain=getDomain;





function getSid()
{
return getTop().g_sid
||(S("sid")?S("sid").value:location.getParams(getTop().location.href)["sid"]);
}
var GetSid=getSid;





function getUin()
{
return getTop().g_uin;
}





function getPaths()
{

var Fb=
{
images_path:"/zh_CN/htmledition/images/",
js_path:"/zh_CN/htmledition/js/",
css_path:"/zh_CN/htmledition/css/",
style_path:"/cgi-bin/getcss?sid="+getSid()+"ft=",
swf_path:"/zh_CN/htmledition/swf/",
editor_path:"/zh_CN/htmledition/qqmaileditor/",
stationery_path:"http://res.mail.qq.com/zh_CN/",
card_path:"http://res.mail.qq.com/zh_CN/",
mo_path:"http://res.mail.qq.com/zh_CN/",
skin_path:"0"
};
for(var k in Fb)
{
Fb[k]=trim(getTop()[k])||Fb[k];
}
return Fb;
}







function getPath(an,aJe)
{














an=="image"&&(an+="s");
var hg=getPaths()[an+"_path"]||"";
if(hg)
{
if(aJe&&an!="skin"&&hg.indexOf("http")!=0)
{
hg=[location.protocol,"//",location.host,hg].join("");
}
}
return hg;
}








function getRes(aXk)
{
return T(aXk).replace(getPaths());
}






function getFullResSuffix(cf)
{
if(!getTop().gLn)
{
return cf;
}
var gL,Ee,Pw=".j"+"s";
if(cf.indexOf(Pw)>0)
{
gL=cf.substr(0,cf.indexOf(Pw));
Ee=Pw;
}
else if(cf.indexOf(".css")>0)
{
gL=cf.substr(0,cf.indexOf(".css"));
Ee=".css";
}
else if(cf.indexOf(".html")>0)
{
gL=cf.substr(0,cf.indexOf(".html"));
Ee=".html";
}
if(gL.length>0&&getTop().gLn[gL])
{
return gL+getTop().gLn[gL]+Ee;
}
else
{
return cf;
}
}












function outputJsReferece(dE,jP,aj)
{
var hg=dE||outputJsReferece.ayR,
ci=jP||outputJsReferece.kv,
am=aj||window,
cv=T(['<script language="JavaScript" src="$file$',(dE?'':'?r='+Math.random()),'"></','script>']),
jd=[];
outputJsReferece.ayR=hg;
outputJsReferece.kv=ci;

function ayF(eS)
{
var gL=trim(eS||""),
cG=/[0-9a-fA-F]{6}\.js$/.test(gL)?eS.substr(0,eS.length-9):eS.split(".")[0];

if(cG&&(dE||!am[cG+"_js"]))
{
jd.push(cv.replace(
{
file:hg+eS
}
));
}
}
E(ci,ayF);
return jd.join("");
}





function runUrlWithSid(aE)
{
try
{

getTop().getHttpProcesser().src=T('$url$&sid=$sid$&r=$rand$').replace(
{
url:aE,
sid:getSid(),
rand:Math.random()
}
);
}
catch(ax)
{
}
}




























function createBlankIframe(aj,aY)
{
cacheByIframe(aY&&aY.defcss==false
?[]
:[["css",getPath("css"),getFullResSuffix("comm.css")],["css",getPath("style"),"skin"]],
extend(
{
className:"menu_base_if",
transparent:false,
destroy:false
},
aY,
{
win:aj,
header:["<script>",getTop.toString().replace(/[\r\n]/g,""),"<\/script>",aY&&aY.header||""].join(""),
onload:function(aj)
{
if(this.getAttribute("cbi_inited")!="true")
{
aY&&aY.transparent&&
(this.contentWindow.document.body.style.background="transparent");
this.setAttribute("cbi_inited","true");
}
callBack.call(this,aY&&aY.onload,[aj]);
}
}
)
);
}






function createActionFrame(aj)
{
return createBlankIframe(aj,
{
id:"actionFrame",
defcss:false,
onload:actionFinishCheck
}
);
}
















function hideEditorMenu()
{
if(getTop().QMEditor)
{
getTop().QMEditor.hideEditorMenu();
}
}





function hideMenuEvent(ah)
{
var bJ=getEventTarget(ah),
GN=getTop().QMMenu&&getTop().QMMenu();

for(var i in GN)
{
!GN[i].isContain(bJ)&&GN[i].close();
}

try
{
getTop().QQPlusUI.hideMenuEvent(bJ);
}
catch(HI)
{
}
}






















function confirmBox(at)
{

var	wz=2,
lw=at.defaultChecked||false,
Lm=at.confirmBtnTxt||"确定",
PT=at.cancelBtnTxt||"取消",
CU=at.neverBtnTxt;

at.width=at.width||450;
at.height=at.height||163;
new(getTop().QMDialog)({
sId:at.id||"QMconfirm",
sTitle:at.title||"确认",
sBodyHtml:T([
'<div class="$sStyle$">',
'<div class="cnfx_content">',
'<img src="$image_path$ico_question.gif" align="absmiddle" style="float:left;margin:5px 10px 0;display:$imgdisp$;">',
'<table style="width:$width$px;height:80px;">',
'<tr><td style="vertical-align:top;"><div style="padding-top:10px;word-break:break-all;line-height:150%;" class="b_size">$msg$</div></td></tr>',
'</table>',
'</div>',
'<div class="cnfx_status" style="display:$statusdisp$;">',
'<input id="recordstatus" type="checkbox" $checked$/><label for="recordstatus">$recordinfo$</label>',
'</div>',
'<div class="cnfx_btn">',
'<input class="$confirmcss$ btn" type="button" id="confirm" value="$confrim$">',
'<input class="$cancelcss$ btn" type="button" id="cancel" style="display:$caceldisp$;" value="$cancel$">',
'<input class="$nevercss$ btn" type="button" id="never" style="display:$neverdisp$;" value="$never$">',
'</div>',
'</div>'
]).replace({
sStyle:at.style||'',
image_path:getPath("image",true),
msg:at.msg,
caceldisp:at.mode=="alert"?"none":"",
imgdisp:at.mode=="prompt"?"none":"",
recordinfo:at.recordInfo,
statusdisp:at.enableRecord?"":"none",
checked:at.defaultChecked?"checked":"",
width:at.width-100,
height:at.height-83,
confrim:Lm,
confirmcss:getAsiiStrLen(Lm)>5?"":"wd2",
cancel:PT,
cancelcss:getAsiiStrLen(PT)>5?"":"wd2",
never:CU,
neverdisp:CU?'':'none',
nevercss:getAsiiStrLen(CU)>5?"":"wd2"
}),
nWidth:at.width,
nHeight:at.height,
onload:function(){
var aD=this,
Hn=aD.S("confirm"),
ait=aD.S("cancel"),
Lr=aD.S("never");








addEvents([Hn,ait,Lr],
{
click:function(ah)
{
var aJ=getEventTarget(ah);
if(aJ==Hn)
{
lw=aD.S("recordstatus").checked;
wz=1;
}
else if(aJ==Lr)
{
wz=3;
}
aD.close();
}
}
);
callBack.call(aD,at.onload);
},
onshow:function(){
this.S("confirm").focus();
callBack.call(this,at.onshow);
},

onbeforeclose:function(){
try
{

callBack.call(this,at.onreturn,[wz==1,lw,wz]);
}
catch(ax)
{
}
return true;
}
});
}










function alertBox(at)
{
confirmBox(extend({mode:"alert"},at))
}













function promptBox(at)
{
var Md=false,
aBC=at.onreturn;
at.onreturn=function(aH)
{
var ad=this;
callBack.call(ad,aBC,[Md||aH,ad.S("txt").value]);
};
at.msg=T(
[
'<div style="margin:0 10px 10px;" class="bold">$msg$</div>',
'<div style="margin:10px 10px 5px;"><input type="text" id="txt" style="width:100%;" class="txt" value="$defaultValue$"/></div>',
'<div style="margin:0 10px 10px;" class="f_size addrtitle">$description$</div>'
]
).replace(at);
confirmBox(extend(
{
mode:"prompt",
height:160,
onload:function()
{
var ad=this;
addEvent(ad.S("txt"),"keydown",function(ah)
{
if(ah.keyCode==13)
{
Md=true;
ad.close();
}
}
);
},
onshow:function()
{
this.S('txt').select();
this.S("txt").focus();
}
},at)
);
}











function loadingBox(at)
{
if(!callBack(at.oncheck))
{
var bE=new QMDialog(
{
sId:"LoAdINgBOx",
sTitle:at.model+"模块加载中...",
nWidth:400,
nHeight:200,
sBodyHtml:T(
[
'<div style="text-align:center;padding:58px;">',
'<img id="load" src="$images_path$ico_loading2.gif">',
'<span id="err" style="display:none;">$model$模块加载失败</span>',
'</div>'
]
).replace(extend(at,{images_path:getPath("image")})),
onclose:function()
{
bE=null;
}
}
);
if(at.js)
{
var eV=[];
E(typeof at.js=="string"?[at.js]:at.js,function(eS)
{
eV.push(getFullResSuffix(eS));
}
);
loadJsFileToTop(getPath("js"),eV);
}
waitFor(
function()
{
return callBack(at.oncheck);
},
function(aH)
{

if(!bE)
{
return;
}
if(!aH)
{
show(bE.S("load"),false);
show(bE.S("err"),true);
}
else
{
bE.close(true);
callBack(at.onload);
}
}
)
}
else
{
callBack(at.onload);
}
}





















(function()
{
var ae=getTop();

function boK(alK,MC)
{
var alK="weixinCss";

if(!ae.S(alK))
{
var Bb=ae.document.createElement("style");
Bb.type="text/css";
Bb.id=alK;
if(ae.gbIsIE)
{
Bb.styleSheet.cssText=MC;
}
else
{
Bb.innerHTML=MC;
}
ae.document.getElementsByTagName("head")[0].appendChild(Bb);
}
}

var bua=TE([
'<div id="mask" class="editor_mask opa50Mask editor_maskAtt" ></div>',
'<div id="out" style="z-index:1000;position: absolute;width:$width$%;height:$height$%;margin-top:$offsetTop$%;margin-left:$offsetLeft$%;outline:0;" tabindex="-1" hidefocus="hidefocus">',
'<a id="close" href="javascript:;" title="关闭" style="$@$if($noclose$)$@$display:none$@$endif$@$;position:absolute;right:0;top:16px;width:23px;height:23px;margin:-24px -9px 0 0;background:url($images_path$newicon/login.png) no-repeat 0 0;"></a>',
'<div id="body" style="width:100%;height:100%">$html$</div>',
'</div>'
]);


function maskPanel(aN)
{
boK(aN.sId,aN.sCssRule);

new QMPanel(
{
oEmbedWin:ae,
sStyle:"position:absolute;width:100%; height:100%; left:0; top:0; margin-top:-2px",
nWidth:"auto",
nHeight:"auto",
sId:"weixinnote",
sBodyHtml:bua.replace(
{
noclose:aN.bNoCloseBtn,
html:aN.sBodyHtml,
images_path:getPath("image"),
offsetTop:(100-aN.nHeightPercent)/2,
offsetLeft:(100-aN.nWidthPercent)/2,
width:aN.nWidthPercent,
height:aN.nHeightPercent
}),
onclose:aN.onclose,
onload:function()
{
var KT=this;
KT.S("mask").onclick=KT.S("close").onclick=function()
{
KT.close();
}
aN.onload&&callBack.call(KT,aN.onload,[KT]);
}
}
);
}
window.maskPanel=maskPanel;
})();




function getQMPluginInfo(bis)
{
var b=
(gbIsWin&&
(

(gbIsFF&&gsFFVer.split(".")[0]<9&&gsFFVer.split(".")[0]>=3&&(gsFFVer.split(".")[1]>0||gsFFVer.split(".")[2]>=8||parseInt(navigator.buildID.substr(0,8))>=20090701))
||(gbIsChrome&&(""+gsChromeVer).split('.')[0]>=6)
||(gbIsSafari&&gsAgent.indexOf("se 2.x metasr 1.0")<0)
||(gbIsOpera)
||(gbIsQBWebKit&&parseFloat(gsQBVer)>6.5)
)
)
||(gbIsMac&&gsMacVer>=bis&&
(
gbIsFF&&parseFloat(gsFFVer)>=3.6
||gbIsChrome&&parseFloat(gsChromeVer)>=8
||gbIsSafari&&parseFloat(gsSafariVer)>=5
)
);
return b;
}




var QMAXInfo=
{
aiK:
{
path:"/activex/",
cab:"TencentMailActiveX.cab",
exe:"TencentMailActiveXInstall.exe",
obj:[
["TXGYMailActiveX.ScreenCapture","TXGYMailActiveX.UploadFilePartition",
"TXGYMailActiveX.Uploader","TXFTNActiveX.FTNUpload","TXGYMailActiveX.DropFile"],
["FMO.ScreenCapture","TXGYUploader.UploadFilePartition","FMO.Uploader",
"TXFTNActiveX.FTNUpload",""]],
available:["ScreenCapture","Uploader","FTNUpload","DropFile","UploadFilePartition"],
lastVer:["1.0.1.31","1.0.1.29","1.0.1.31","1.0.0.18","1.0.0.8"],
miniVer:[(getDomain()=="foxmail.com")?"1.0.0.5":"1.0.0.28",
"1.0.1.28","1.0.1.28","1.0.0.11","1.0.0.7"]
},

Vj:
{
path:"/xpi/",
xpi:"TencentMailPlugin.xpi",

obj:["ScreenCapture","","Uploader","FTNUpload",""],
available:["ScreenCapture","Uploader","FTNUpload"],
name:["QQMail Plugin","","QQMail Plugin","Tencent FTN plug-in","QQMail Plugin"],




type:(function()
{
var Do="application/txftn",
aBE="application/txftn-webkit";
return["application/x-tencent-qmail","","application/x-tencent-qmail",
(typeof navigator.mimeTypes!="undefined")&&navigator.mimeTypes[aBE]?aBE:Do,
"application/x-tencent-qmail"];
})(),
lastVer:["1.0.1.32","","1.0.1.32","1.0.0.3","1.0.0.0"],
miniVer:["1.0.0.28","","1.0.1.28","1.0.0.1","1.0.0.0"]
},

TL:
{
path:"/crx/",
crx:"TencentMailPlugin.crx",
exe:"QQMailWebKitPlugin.exe",
obj:["ScreenCapture","","Uploader","FTNUpload",""],
available:["ScreenCapture","FTNUpload"],
name:["QQMail Plugin","","QQMail Plugin","Tencent FTN plug-in",""],
type:["application/x-tencent-qmail-webkit","","application/x-tencent-qmail-webkit","application/txftn-webkit",""],
lastVer:["1.0.1.32","","1.0.1.32","1.0.0.3",""],
miniVer:["1.0.0.28","","1.0.1.28","1.0.0.1",""]
},

aFb:
{
path:"/crx/",
pkg:"TencentMailPluginForMac.pkg",
obj:["ScreenCapture","","Uploader","",""],
available:["ScreenCapture","Uploader"],
name:["QQMailPlugin","","QQMailPlugin","",""],
type:["application/x-tencent-qmail-webkit","","application/x-tencent-qmail-webkit","",""],
lastVer:["1.0.1.32","","1.0.1.32","",""],
miniVer:["1.0.0.28","","1.0.1.28","",""]
},







mbAblePlugin:getQMPluginInfo(10.6),



mbAbleUsePlugin:getQMPluginInfo(10.6),




avK:true,

getTitle:function()
{
return gbIsIE?"控件":"插件";
},




getinfo:function()
{
if(QMAXInfo.mbAblePlugin)
{
if(gbIsWin)
{
if(gbIsIE)
{
return QMAXInfo.aiK.available;
}
if(gbIsFF)
{
return QMAXInfo.Vj.available;
}
if(gbIsChrome||gbIsSafari||gbIsOpera||gbIsQBWebKit)
{
return QMAXInfo.TL.available;
}
}
if(gbIsMac)
{
return QMAXInfo.aFb.available;
}
}

return[];
},




aHK:function()
{








},










installer:function(an,or)
{
var bt=this.get("whole"),
cG="";
if(/^online/.test(an))
{
cG=bt.cab||bt.xpi||(gbIsChrome&&bt.crx);
}
else if(/^download/.test(an))
{
if(or)
{
if(or=='chrome')
{
bt=this.get("whole",'WebKit');
}
else
{
bt=this.get("whole",or);
}
}
if(or)
{
cG=bt.exe||bt.pkg;
}
else
{
cG=(!gbIsChrome&&bt.exe)||bt.pkg;
}

if(or=='chrome')
{
cG=bt.crx;
}
}
if(cG&&/Abs$/.test(an))
{
cG=bt.path+cG;
}
return cG;
},







get:function(alI,wA)
{
if(!wA)
{
gbIsIE&&(wA="IE");
gbIsFF&&(wA='FF');
(gbIsChrome||gbIsSafari||gbIsOpera||gbIsQBWebKit)&&(wA="WebKit");
!gbIsIE&&gbIsMac&&(wA="mac");
}

var fk={
IE:this.aiK,
FF:this.Vj,
WebKit:this.TL,
mac:this.aFb
}[wA];

if(!this.avK)
{
this.aHK();
}

return alI=="whole"?fk:fk[alI];
}
};






function createActiveX(lG,aj)
{
if(!gbIsIE)
{
return createPlugin(lG,false,aj);
}

if(lG>=0&&lG<=4)
{
var ng=QMAXInfo.get("obj"),
iw;
for(var i=0,len=ng.length;i<len;i++)
{
try
{
if(iw=new ActiveXObject(ng[i][lG]))
{
return iw;
}
}
catch(ax)
{
}
}
}
return null;
}








function detectActiveX(lG,qj,QK)
{
if(!gbIsIE)
{
return detectPlugin(lG,qj,QK);
}

var uc=typeof(QK)=="undefined",
la=false,
ji=uc?createActiveX(lG)
:QK,
jE=getActiveXVer(ji);




if(ji&&jE)
{

if(qj!=1&&qj!=2)
{
la=true;
}
else if(parseInt(jE.split(".").join(""))
>=parseInt(QMAXInfo.get(qj==1
?"miniVer"
:"lastVer")[lG].split(".").join("")))
{
la=true;
}

if(uc)
{
delete ji;
ji=null;
}
}
return la;
}






function getActiveXVer(be)
{
if(!gbIsIE)
{
return getPluginVer(be);
}

var jE="",
ji;
try
{
ji=typeof(be)=="number"?createActiveX(be):be;
jE=ji&&(ji.version
?ji.version
:"1.0.0.8")||"";
}
catch(ax)
{
}

return jE;
}






function checkInstallPlugin(gF)
{

if(!QMAXInfo.mbAbleUsePlugin)
{
return false;
}

var aV=QMAXInfo.get("name")[gF],
aR=QMAXInfo.get("type")[gF],
nP=navigator.plugins;
if(nP&&aV)
{
for(var i=nP.length-1;i>=0;i--)
{
for(var j=nP[i].length-1;j>=0;j--)
{
if(nP[i].name.indexOf(aV)!=-1&&nP[i][j].type==aR)
{

if(gF!=3&&(gsAgent.indexOf("vista")>-1||/nt 6/gi.test(gsAgent))&&aR=="application/x-tencent-qmail")
{
var azi=nP[i].description.split('#')[1];
if(!azi)
{

continue;
}
}
return true;
}
}


}
}
return false;
}









function createPlugin(gF,aDs,aj)
{
var hR=null;
aj=aj||getMainWin();
switch(gF)
{
case 0:
case 2:
case 4:
if(gbIsSafari)
{
createPlugin.aeI(gF,aj);
}
hR=createPlugin.aeI(gF,getTop());
break;
case 3:
hR=createFTNPlugin(aj);
break;
}


if(!aDs&&checkInstallPlugin(gF))
{

getTop().ossLog("delay","all",
T([
'stat=ff_addon',
'&type=%type%&info=%info%'
],'%').replace({
type:!hR?"failcreatePlugin":"successcreatePlugin",
info:["ver:",gsFFVer,",pluginId:",gF,",brtpe:",(gbIsFF?1:(gbIsChrome?2:(gbIsSafari?3:(gbIsOpera?4:5))))].join("")
})
);
}
return hR;
}

createPlugin.aeI=function(gF,aj)
{
var fQ,
hR=null,
NX=gbIsFF?"application/x-tencent-qmail":"application/x-tencent-qmail-webkit";
aj=aj||getTop();
if(checkInstallPlugin(gF))
{
var xq="QQMailFFPluginIns";
if(!(fQ=S(xq,aj)))
{
insertHTML(

aj.document.body,
"beforeEnd",

T('<embed id="$id$" type="$type$" style="width:1px;height:1px;position:absolute;top:0;left:0"></embed>').replace({
type:NX,
id:xq
})
);
fQ=S(xq,aj);
}

var Bu={0:"CreateScreenCapture",
2:"CreateUploader",
4:"CreateDragDropManager"
}[gF];
if(typeof fQ[Bu]!="undefined")
{
hR=fQ[Bu]();



if(gF==0)
{
hR.OnCaptureFinished=function(){};
}
else if(gF==2)
{
hR.OnEvent=function(){};
}
}
}
return hR;
};

createPlugin.ZG=function(aj,sW)
{
var fQ=null,
NX=(gbIsFF?QMAXInfo.Vj:QMAXInfo.TL)["type"][3],
Mh=sW||"npftnPlugin";
aj=aj||getTop();
if(!(fQ=S(Mh,aj)))
{
insertHTML(
aj.document.body,
"beforeEnd",
T('<embed id="$id$" type="$type$" style="z-index:99999;position:absolute;top:0;left:0;width:1px;height:1px;"></embed>').replace({

type:NX,
id:Mh
})
);
fQ=S(Mh,aj);
if(fQ)
{
fQ.onEvent=function(){};
}
}
return fQ;
};







function createFTNPlugin(aj,sW)
{
if(!checkInstallPlugin(3))
{
return null;
}
createPlugin.ZG(aj,sW);
var fQ=createPlugin.ZG(getTop(),sW);
















if(sW)
{

getTop().ossLog("delay","all",T([
'stat=ff_addon',
'&type=%type%&info=%info%'
],'%').replace({
type:fQ&&fQ.Version?"successcreatePlugin":"failcreatePlugin",
info:["ver:",gsFFVer,",pluginId:3,insId:",sW].join("")
}));
}

return fQ.Version?fQ:null;
}






function detectPlugin(gF,qj,aGe)
{

var la=false;
var LK=aGe||createPlugin(gF,true),
jE=getPluginVer(LK);

if(LK&&jE)
{
if(qj!=1&&qj!=2)
{
la=true;
}
else if(parseInt(getPluginVer(LK).split(".").join(""))
>=parseInt(QMAXInfo.get(qj==1?"miniVer":"lastVer")[gF].split(".").join("")))
{
la=true;
}
}
return la;
}



function getPluginVer(be)
{
var ji,jE="";
try
{
ji=typeof(be)=="number"?createPlugin(be,true):be;
jE=(ji&&ji.Version)||"";
}
catch(ax)
{
}

return jE;
}








































function initDialog(ao,DW,aE,ha,fa)
{
new(getTop().QMDialog)({
sid:ao,
sTitle:DW,
sUrl:aE,
nWidth:ha,
nHeight:fa
});
}








function requestShowTip(Ha,aBj,aj,ey)
{
var aq=T('/cgi-bin/tip?sid=$sid$&args=$dom$,$tip$&r=$r$').replace({
sid:getSid(),
dom:Ha,
tip:aBj,
r:Math.random()
});


QMAjax.send(aq,{
method:'GET',
onload:function(aH,bN,cq)
{
if(aH&&bN.indexOf('oTop.QMTip')>0)
{
if(!ey||ey(bN,cq))
{
globalEval(bN,aj);
}
}
}
});
}

function detectCapsLock(mG,apu,cZ)
{
if(!mG)
{
return;
}
function showTips(ah)
{
var ap=ah.target||ah.srcElement,
bI=calcPos(ap),
ny=apu||S("capTip");

function getStyle()
{
return["z-index:20;position:absolute;background:#fdf6aa;padding:1px;",
"border:1px solid #dbc492;border-right:1px solid #b49366;border-bottom:1px solid #b49366;",
"left:",bI[3],"px;","top:",(bI[2]+1),"px;"].join("");
}
if(!ny)
{
insertHTML((cZ||document).body,"afterBegin",
'<div id="capTip" style="'+getStyle()+'">大写锁定已打开</div>');
}
else
{
ny.style.cssText=getStyle();
}
}
function hideTips()
{
show(S("capTip",(cZ||document)),false);
}
var pb=-1;
addEvents(mG,{
keydown:function(ah)
{
var fT=ah.keyCode||ah.charCode

if(fT==20)
{
if(pb==0)
{
showTips(ah);
pb=1;
}
else if(pb==1)
{
hideTips();
pb=0;
}

}
},
keypress:function(ah)
{
var fT=ah.keyCode||ah.charCode,
kU=ah.shiftKey;

if((fT>=65&&fT<=90&&!kU)
||(fT>=97&&fT<=122&&kU))
{
pb=1
showTips(ah);
}
else if((fT>=97&&fT<=122&&!kU)||(fT>=65&&fT<=90&&kU))
{
pb=0;
hideTips();
}
else
{
hideTips();
}
},
blur:function()
{
hideTips();
}
});
}








function calcMainFrameDomInGlobalPos(aFY,PU)
{
var bI=calcPos(aFY),
agJ=calcPos(S("mainFrame",getTop())),
XN=getMainWin().document,
agw=XN.documentElement,
aaZ=XN.body,
dF=bI[3]+agJ[3]
-(agw.scrollLeft||aaZ.scrollLeft||0),
cg=bI[0]+agJ[0]
-(agw.scrollTop||aaZ.scrollTop||0),
bC=bI[4],
bS=bI[5];

return PU=="json"
?{top:cg,bottom:cg+bS,left:dF,
right:dF+bC,width:bC,height:bS}
:[cg,dF+bC,cg+bS,dF,bC,bS];
}

function allDeferOK()
{
return typeof all_defer_js=="function"
}






















function attachSetFlag(be,axK,ey)
{
be="&mailattach="+(typeof be=="string"?be.split(","):be).join("&mailattach=");

var ae=getTop(),
aq=[be,"&action=",axK?"setflag":"cancelflag"].join(""),
avp=axK?"收藏":"取消收藏";


QMAjax.send(
"/cgi-bin/attachfolder?t=attachfolder.json",
{
method:"POST",
content:["r=",Math.random(),aq].join(""),
onload:function(aH,be)
{
if(aH)
{
try
{
var au=eval(be);
ae.showInfo("附件已"+avp);
ey&&ey.call(null,au);
}
catch(e)
{
ae.showError(avp+"失败");
}
}
else
{
ae.showError("操作失败，请稍后再试");
}
}
}
);
};




















function getAttachList(be,ey,aY)
{
aY=aY||{};
var nM=arguments.callee,
aS=arguments,
cd=(typeof be=="object"&&be.length)?be:[],
bnh=T("/cgi-bin/readmail?sid=$sid$&t=$t$&s=forward&from=attachfolder&disptype=html&ef=js$param$"),
oy=TE([
'$@$for($oAttach$)$@$',
'&mailattach=$mailid$|$attachid$|$attachname$|$fileextenal$|$filebyte$',

'$@$endfor$@$'
]).replace({
oAttach:cd
});

QMAjax.send(bnh.replace({
sid:getSid(),
t:"compose.json",
param:oy
}),
{
method:"GET",
onload:function(aH,fu)
{
var mW=true;
if(aH)
{
try
{
var au=eval(fu),
VV=au.attach;
if(VV&&VV.length)
{
for(var i=0;i<VV.length;i++)
{
if(+VV[i]["byte"]==0)
{
mW=false;
break;
}
}
}
else
{
mW=false;
}
}
catch(e)
{
mW=false;
}
}

if(mW&&aH)
{
ey(true,au);
}
else
{
ey(false,au);
}
}
},
aY.ajax
);




























};




function backHome(aGK)
{
getMainWin().location.href=T('/cgi-bin/today?sid=$sid$&loc=backhome,,,$locid$')
.replace(
{
sid:getSid(),
locid:aGK||140
}
);
}






function resizeFolderList()
{
var adp=S("SysFolderList"),
QI=S("ScrollFolder"),
dG=S("folder");

if(adp&&QI&&dG)
{
var Nw=["auto","hidden"],
XQ=dG.clientHeight,
acy=adp.offsetHeight,
vY=XQ-acy,
OS=vY<50?0:1;
dG.style.overflow=Nw[OS];
dG.style.overflowX=Nw[1];
QI.style.overflow=Nw[1-OS];
QI.style.height=OS
?(XQ-acy)+"px":"auto";
}
}






function setTopSender(aY)
{
var rP=getGlobalVarValue("DEF_MAIL_FROM")||'';
switch(aY&&aY.action)
{
case"setting4":
if(rP!=aY.email)
{
setUserInfo("addr",aY.email);
setDefaultSender(aY.email);
changeStyle(aY.skin,aY.logo);
getTop().skin_path=aY.skin;
clearCache(["css",getPath("style"),"skin"]);
}

reloadSignature();
break;
}
}




function bindAccount()
{
var Gm=S("useraddr"),
Sj=S("useraddrArrow"),
pT=getBindAccount(),
uJ={nHeight:10,sItemValue:'<div style="background:#CCC; height:1px; margin-top:5px; overflow:hidden;"></div>'},
bl=[],
abC=Gm&&subAsiiStr(Gm.innerHTML,20,"...");

if(!Gm||!pT)
{
return;
}

if(pT.qq.length+pT.biz.length)
{
bl.push(
{
sItemValue:'<a id="manage" href="javascript:;" style="float: right;">管理</a><span class="ml">关联帐号：</span>'
},
{
sId:'self',
bDisSelect:true,
sItemValue:T('<div class="unread_num"><span class="ico_unreadnum"></span>$unread$</div><input type="button" class="ft_upload_success" id="self"/><span style="overflow:hidden;margin-left:0" >$myemail$</span>').replace(extend({myemail:subAsiiStr(abC,19,"...")},pT.self))
}
);
E(['qq','biz'],function(aT,dL)
{
var aZ=pT[aT].length;
if(aZ&&dL)
{
bl.push(uJ);
}
for(var aZ=pT[aT].length,i=0;i<aZ;i++)
{
var au=pT[aT][i],

cS=subAsiiStr(au['email'],19,"...");














bl.push(
{
aR:aT,
sId:au.uin,
sItemValue:['<div class="unread_num"><span class="ico_unreadnum"></span>',au.unread,'</div>','<span style="overflow:hidden;">',cS,'</span>'].join('')
}
);
}
}
);
}
else
{

bl.push(
{
sItemValue:'<span>您的当前邮箱帐号：</span>'
},
{
sItemValue:T('<strong class="ml black">$myemail$</strong>').replace({myemail:abC})
},
uJ,
{
sItemValue:'<span>拥有备用邮箱，来适用于不同用途。</span>'
},
{
sItemValue:'<span>它们可以关联在一起，</span>'
},
{
sItemValue:'<span>方便随意切换不同的邮箱。</span>'
},
{
nHeight:35,
sItemValue:'<input id="bind" type="button" class="btn ml"value="申请备用邮箱" style="margin-top:5px;padding:0 10px;overflow:visible;"/>&nbsp; <a href="/cgi-bin/readtemplate?sid=$sid$&t=attrpwd_sec" target="mainFrame" id="bind_a">关联已有邮箱</a>'
}
);
}
if(Sj)
{
Sj.style.visibility="visible";
Sj.parentNode.onclick=function()
{
var mV=calcPos(Gm.parentNode);
new QMMenu(
{
sId:"bindaccount",
sClassName:"bindacc qmpanel_shadow",

nX:mV[3],
nY:mV[2],
nWidth:235,
nMinWidth:160,
nItemHeight:25,
oItems:bl,
onitemclick:function(ao,bT)
{
if(bT.aR=='biz')
{
submitSwitchForm();
}
else
{
goUrlTopWin(T('/cgi-bin/login?vt=relate&uin=$uin$&old_sid=$sid$').replace({
uin:ao,
sid:getSid()
})
);
}
},
onload:function()
{
var ad=this,
abU=ad.S("self"),
cy;
if(abU)
{
cy=abU.parentNode;
setClass(cy,cy.className+' settingtable');
}

addEvent(ad.S("manage"),'click',function(ah)
{

goUrlMainFrm(
T("/cgi-bin/setting4?fun=list&acc=1&sid=$sid$&go=bind").replace({sid:getSid()})
);
ad.close();
preventDefault(ah);
}
);

addEvent(ad.S("bind"),'click',function(ah)
{

goUrlMainFrm(
T("/cgi-bin/readtemplate?sid=$sid$&t=attrpwd_sec_alone&s=regemail&by=beiyong").replace({sid:getSid()})
);
ad.close();
preventDefault(ah);
}
);

addEvent(ad.S("bind_a"),'click',function(ah)
{

goUrlMainFrm(
T("/cgi-bin/readtemplate?sid=$sid$&t=attrpwd_sec").replace({sid:getSid()})
);
ad.close();
preventDefault(ah);
}
);

}
}
);
};
}
}

bindAccount.bLx=function()
{
var ad=arguments.callee;
if(ad.oJ)
{
}

};




function initAddress(ey)
{
callBack.call(window,ey,[{sType:"loading",sMsg:""}]);

var ae=getTop(),
vA=ae.document,
akU=getPath("js"),
cM=0,
tI=function()
{
if(++cM>=2)
{
ae.QMAddress.initAddress(ey);
}
};
loadJsFile(akU+getFullResSuffix("qmlinkman.js"),true,vA,tI);
loadJsFile(akU+getFullResSuffix("qmaddress.js"),true,vA,tI);






























}




function getPhotoCGI()
{
return[location.protocol,"//",location.host,"/cgi-bin/upload?sid=",getTop().getSid()]
.join("");
}





function aCD()
{
var nM=arguments.callee;
return(nM.bem||(nM.bem=
{"sid":1,"username":1,"foxacc":1,

"m3gmsid":1,"mcookie":1,"msid":1,"defaultf":1,
"qm_flag":1,"QFRIENDUNREADCNT":1,"RSSUNREADCNT":1,"rss_domain":1,"qqmail_activated":1,"qqmail_alias_default":1,
"qqmail_from":1,"wimrefreshrun":1,"new":1,"qm_sk":1,"qm_ssum":1,"qq2self_sid":1,"exstype":1,"lockurl":1,"new_mail_num":1})
);
}

function setUserCookie(aC,aT,mM,dE,iJ,qr)
{







if(aCD()[aC]==1)
{
var HX=getCookie(aC),
fh=HX?HX.split("|"):[],
jU=getUin(),
cL=jU+"&"+aT,
mW=true;


for(var i=0;i<fh.length;i++)
{
if(fh[i].match(jU))
{
fh[i]=cL;
mW=false;
}
}

HX=fh.join("|");
mW&&(HX+=(HX==""?"":"|")+cL);
return setCookie(aC,HX,mM,dE,iJ,qr);
}
else
return setCookie(aC,aT,mM,dE,iJ,qr);

}





function getUserCookie(aC)
{




var hN=getCookie(aC);

if(aCD()[aC]!=1)
{
return hN;
}
else
{
var fh=hN?hN.split("|"):[],
jU=getUin();

for(var i=0;i<fh.length;i++)
{
if(fh[i].match(jU))
{
return((fh[i].split("&"))[1]||fh[i]);
}
}
return hN;
}

}




function deleteUserCookie(aC,dE,iJ)
{
deleteCookie(aC,dE,iJ);
}





function setUserCookieFlag(aC,dL,nW,Pc)
{
return setCookieFlag(aC,dL,nW,Pc)
}





function getUserCookieFlag(aC)
{
return getCookieFlag(aC);
}








function getReaderData(aE)
{
if(window!=getTop())
{
getTop().getReaderData(aE);
}
else
{
var ko=arguments.callee;
removeSelf(ko.jsObj);
ko.jsObj=loadJsFile(aE+"&r="+Math.random(),false,document);
}
}






function getReaderDataInterval(aE,qd)
{
if(window!=getTop())
{
return getTop().getReaderDataInterval(aE,qd);
}
else
{
var ko=arguments.callee,
aq=(window.gsRssDomain||'')+"/cgi-bin/reader_data2?sid="+getSid()+"&t=rss_data.js";

if(ko.nTimer)
{
clearInterval(ko.nTimer);
}

function JL()
{
getReaderData(aq);
}

ko.nTimer=setInterval(JL,qd
||(window.gnRssInterval*1000)||(10*60*1000));
JL();
}
}


function changeStatus(aJC)
{
var aDf=S("searchIcon");
aDf&&setClass(aDf,aJC?"ss_icon ss_fronticon ss_icon_loading":"ss_icon ss_fronticon ss_icon_search")
}





function doSearch()
{
QMPageInit.aed(
function()
{
var bz=S("frmSearch");
bz.sender.value=bz.subject.value;
bz.receiver.value=bz.subject.value;
bz.keyword.value=bz.subject.value;
bz.combinetype.value="or";
submitToActionFrm(bz);
}
);
return false;
}





function audioPlay(ag)
{
var ae=getTop();
if(!ag.container)
{
ag.container=S('mp3player_container',ae.getMainWin());
}
if(ag.global&&!ag.globalcontainer)
{
ag.globalcontainer=S('gplayer_container',ae);
if(!ag.globalcontainer)
{
ag.global=false;
}
}

if(!ae.QMPlayer)
{
loadJsFileToTop(getPath('js'),[getFullResSuffix('qmplayer/player.js')]);
}
waitFor(
function()
{
return!!ae.QMPlayer;
},
function(aH)
{
if(aH)
{



var ajI="gplayer_kernel",
aya="qmplayer_unique";

function biy()
{
var aA=ajI+"_dom";
if(ae.S(aA))
{
return ae.S(aA)
}
else
{
var aJ=ae.document.createElement("div");
aJ.id=aA;
aJ.style.cssText="position:absolute;left:-100000px;";
ae.document.body.appendChild(aJ);
return aJ;
}
};

if(!ag.msg)
{
ag.msg="QQ邮箱播放器";
}
if(ag.container&&ag.container.getElementsByTagName("div").length==0)
{
ag.container.innerHTML="";
}

if(ag.global)
{
var axT=QMPlayer.initKernel({
sId:ajI,
oContainer:biy()
}),
biF=QMPlayer.initSkin({
sId:ajI,
sSkin:"Global",




oContainer:ag.globalcontainer
});

ae.QMPlayer.init({
oSkin:biF,
oKernel:axT
});
}

ae.QMPlayer.init({
oSkin:QMPlayer.initSkin({
sId:ag.id||aya,
oContainer:ag.container,
sSkin:ag.skin||"Mini"
}),
oKernel:ag.global?axT.setInfo(ag):QMPlayer.initKernel({
sId:ag.id||aya,
oContainer:ag.container,
oInfo:ag
})
});
}
else if(ag.container)
{
ag.container.innerHTML="播放器加载失败";
}
}
);
}




function audioStop()
{
var ht=getTop().QMPlayer;
ht&&ht.stop();
}














function setPlayer(ag)
{
var ae=getTop();

function ags(ag)
{
if(!ae.QMPlayer)
{
setTimeout(function()
{
ags(ag);
},200);
return false;
}

var aA="qqmailMediaPlayer"+(ag.id||""),
am=ag.win||window;

if(!am||am[aA])
{
return false;
}

if(!ag.container
&&!(ag.container=S("mp3player_container",am)))
{
return false;
}

return(am[aA]=new ae.QMPlayer()).setup(ag);
}

if(!ae.QMPlayer)
{
loadJsFile(getPath("js")+getFullResSuffix("qmplayer.js"),true,ae.document);
}

return ags(ag);
}













function playUrl(gW)
{
var ht=(gW.win||window)["qqmailMediaPlayer"
+(gW.id||"")];

if(!ht)
{
setPlayer(gW);
}
else
{
ht.openUrl(gW.url,gW.dispInfo);
}
}









function stopUrl(gW)
{
if(!gW)
{
gW={};
}

try
{
(gW.win||window)["qqmailMediaPlayer"+(gW.id||"")].stop();
}
catch(ax)
{
}
}











function searchMusic(hT,hS,bL)
{
if(window!=getTop())
{
return getTop().searchMusic(hT,hS,bL);
}
hT=hT||"";
hS=hS||"";
var sk=arguments.callee,
Ot=[hT,hS].join("@");

sk.fCallBack=function(fc)
{
var cd,
aq="",
Ex=[];
if(!fc.contentWindow.gMusicInfo||!(cd=fc.contentWindow.gMusicInfo.list))
{
return bL(Ex);
}

for(var i=0,aw=cd.length;i<aw;i++)
{
var bt={
song:cd[i].songname.replace(/<\/?strong>/gi,""),
singer:cd[i].singername.replace(/<\/?strong>/gi,"")
},
Fa=htmlDecode(cd[i].songurl).replace(/\|/g,"").split(";");


for(var j=0,ahE=Fa.length;j<ahE;j+=2)
{



if(Fa[j]
&&Fa[j].indexOf("qqmusic.qq.com")==-1)
{
bt.url=Fa[j].replace(/^(FI|SI|AN|QQ)/,"");
Ex.push(bt);
break;
}
}
}
sk.FG[Ot]=Ex;
bL(Ex);
};

if(!hT&&!hS)
{
return bL([]);
}
if(!sk.FG)
{
sk.FG={};
}
if(sk.FG[Ot])
{
return bL(sk.FG[Ot]);
}

sk.bMT=createBlankIframe(getTop(),{
id:"getMusicUrlFromSoSo",
style:"display:none;",
header:T(
[
'<script>',
'function searchJsonCallback(a)',
'{',
'window.gMusicInfo = a;',
'}',
'<\/script>',
'<script src="$domain$/fcgi-bin/fcg_search_xmldata.q?w=$song$%20$singer$&source=3&r=$rand$"><\/script>',
]
).replace(
{
domain:(location.protocol=="https:"?'https://ptlogin2.mail.qq.com':'http://cgi.music.soso.com'),
song:encodeURI(hT),
singer:encodeURI(hS),
rand:Math.random()
}
),
destroy:true,
onload:function(aj)
{
searchMusic.fCallBack(this);
}
});
}








function getMusicUrl(hT,hS,bL)
{
searchMusic(hT,hS,function(nI)
{
if(nI.length>0)
{
var j=0,
aok=/\.mp3$/i;
for(var i=0;(gbIsMac||gbIsLinux)&&i<nI.length;i++)
{
if(aok.test(nI[i].url))
{
j=i;
break;
}
}
debug(nI[j].url);
bL(nI[j].song,nI[j].singer,nI[j].url,nI);
}
else
{
bL(hT,hS,"",nI);
}
},1);
}









function startWebpush(aip)
{
var ae=getTop();
ae.loadCssFile(getPath("css")+ae.getFullResSuffix("webpushtip.css"),true);
ae.loadJsFile(getPath("js")+ae.getFullResSuffix("qmwebpushtip.js"),
true,
ae.document,
function()
{
ae.QMWebpushTip.open(aip);
}
);
ae.loadJsFile(getPath("js")+ae.getFullResSuffix("qmwebpush.js"),true,ae.document);
}







function closeWebpush(aip)
{
getTop().QMWebpushTip&&getTop().QMWebpushTip.close(aip,true);
}








function ftSendStatic(dw,ce)
{
if(dw)
{
ossLog("realtime","all",T('stat=exskick&sid=$sid$&uin=$uin$&log=$code$')
.replace(
{
uin:ce||getTop().g_uin,
sid:getSid(),
code:dw
}
));
}
}









function beginStatTime(aj)
{
var EG=parseInt(aj.location.hash.split("stattime=").pop());

if(!isNaN(EG)&&EG.toString().length==13&&EG>(getTop().gnStatTimeStamp||0))
{
aj.gnBeginTime=getTop().gnStatTimeStamp=EG;
aj.gnStatTimeStart=now();
}
}

















function endStatTime(aj,kd)
{
var El=aj.gnBeginTime,
iI=aj.gnStatTimeStart,
hz=now();

if(!isNaN(iI)&&!isNaN(El))
{
addEvent(aj,"load",function()
{
var Ov=now();

ossLog("delay","sample",T(
[
'stat=cgipagespeed&type=$type$&t1=$t1$&t2=$t2$&t3=$t3$',
'&rcgi=$appname$&rt=$t$&rs=$s$&allt=$allt$&flowid=$wm_flowid$'
]
).replace(extend(kd,
{
t1:iI-El,
t2:hz-iI,
t3:Ov-hz,
allt:[El,iI,hz,Ov].join("|")
}
)));
debug([iI-El,hz-iI,Ov-hz],994919736);
}
);
}
}
















function ossLog()
{
var aey=getTop().ossLog;
return aey.abc.apply(aey,arguments);
}

ossLog.abc=function(Ln,sq,kW,ajJ)
{
var ad=this,
Mz=Ln||"realtime",
yq=ad.LC(kW),
gV=ad.gV||(ad.gV=[]),
fU=typeof sq=="number"?sq:{all:1}[sq||"all"]||0.1;

if(Mz=="realtime")
{
ad.xV(fU)&&ad.Lz(yq);
}

else
{

ad.xV(fU)
&&gV.push(["delayurl","=",encodeURIComponent(yq)].join(""));

gV.length>=1000?ad.Lz()

:(!ad.dp&&gV.length>0&&(ad.dp=setTimeout(ad.Lz,5*1000)));
}
};

ossLog.Lz=function(tg)
{
var ad=ossLog,
gV=ad.gV;
if(tg||gV.length>0)
{
QMAjax.send("/cgi-bin/getinvestigate",
{
method:"POST",
timeout:500,
content:T('sid=$sid$&$rl$&$ls$').replace(
{
sid:getSid(),
rl:tg,
ls:gV.join("&")
}
)
}
);
gV.length=0;
ad.dp&&clearTimeout(ad.dp);
ad.dp=null;
}
};

ossLog.xV=function(Bc)
{
return(this.mK||(this.mK=now()))%100<100*Bc;
};

ossLog.LC=function(kW)
{
var fk=[];
typeof kW=="string"
?fk.push("&",kW)
:E(kW,function(lK,bc)
{
fk.push("&",bc,"=",encodeURIComponent(lK));
}
);
return fk.shift()&&fk.join("");
};










function isdLog(bjR,bc,lK)
{
var jT=T([
window.location.protocol,
"//isdspeed.qq.com/cgi-bin/r.cgi?flag1=6000&flag2=101&flag3=$flag$&$key$=$value$&r=$r$"
]),
dU=new Image();

setTimeout(function()
{
dU.src=jT.replace({
flag:bjR,
key:bc,
value:lK||"1",
r:Math.random()
});
}
);
}







function all_js(){}

