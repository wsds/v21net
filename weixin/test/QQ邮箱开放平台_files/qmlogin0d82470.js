


(function(A,bp){
var cR={},
mE={};



function blZ(ly,aoQ,dc)
{
if(!ly)
{
return;
}
function showTips(ah)
{
A.show(A.S("capTip"),true);
}
function hideTips()
{
A.show(A.S("capTip"),false);
}
var lz=-1;
A.addEvents(ly,{
keydown:function(ah)
{
var eK=ah.keyCode||ah.charCode
if(eK==20)
{
if(lz==0)
{
showTips(ah);
lz=1;
}
else if(lz==1)
{
hideTips();
lz=0;
}

}
},
keypress:function(ah)
{
var eK=ah.keyCode||ah.charCode,
jR=ah.shiftKey;
if((eK>=65&&eK<=90&&!jR)
||(eK>=97&&eK<=122&&jR))
{
lz=1
showTips(ah);
}
else if((eK>=97&&eK<=122&&!jR)||(eK>=65&&eK<=90&&jR))
{
lz=0;
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
};
function bui(akN)
{
var ek=typeof akN=="string"?[akN]:akN;
function cv()
{
if(ek.length)
{
for(var i=0;i<ek.length;i++)
{
bkH(ek[i]);
}
}
}


function bkH(ao)
{
var bbA="label_",
bS=A.S(bbA+ao),
bc=A.S(ao);
if(!bS||!bc)return;

A.addEvent(bc,"keyup",oI);
A.addEvent(bc,"keydown",oI);
A.addEvent(bc,"input",oI);
A.addEvent(bc,"click",oI);


bc.onfocus=function(){if(ao=="p"){Jz();}oI(this);qW(true)};
bc.onblur=function(){oI(this);qW()};

function qW(aNu)
{
bS.style.color=aNu?"#ccc":"";

};
function oI()
{
bS.innerHTML=bc.value?"&nbsp;":bS.getAttribute("default_txt");
bS.style.color=bc.value?"":"#ccc";
};
function air(o,l)
{
if(o.value)
{
l.innerHTML="&nbsp;";
}
else
{
l.innerHTML=l.getAttribute("default_txt");
}
};
air(bc,bS);


setTimeout(function(o,l){
return function(){
air(o,l);
}
}(bc,bS),100);
setInterval(function(o,l){
return function(){
air(o,l);
}
}(bc,bS),800);
};

cv();
};
function btJ(avL,qN,IN,aHs,ja)
{
var ad=this;

function cv()
{
ad.we=bnv(avL);
ad.bob=avL;
ad.XP=qN;
ad.qi=IN;
ad.bsF=aHs;


for(var i=0;i<IN.length;i++)
{
if(IN[i]==qN.value)
{
qN.style.fontSize=aHs[i];
break;
}
}

A.addEvent(qN,"click",oI);
};
function aws(btT)
{

var Nk=0;
var bf=ad.qi;
for(var i=bf.length;i>0;i--)
{
if(bf[i-1].indexOf(btT)==0)
{
Nk=i-1
}
}
return Nk;
};
function oI(jn)
{
var kR=ad.bob.value,

aoZ=ad.XP.value,
qM=jn||event,
bsy=qM.keyCode==38||qM.keyCode==40;

if(qM.type=="click"||bsy)
{
var Bu=[],
bf=ad.qi,
Nk=aws(aoZ);

for(var i=0;i<bf.length;i++)
{
Bu.push([
'<div class="auto_item ',Nk==i?'selected auto_select':'','" ',
' alias="',kR,'" domain="',IN[i],'" title="\u4f7f\u7528 ',kR,IN[i],' \u767b\u5f55" ',
' fontsize="',ad.bsF[i],'"',
'>',
'<span class="ico_selected"></span>',IN[i],
'</div>'
].join(""));
}

{
ad.we.innerHTML=Bu.join("");
}



var bf=ad.we.childNodes;

for(var i=0,l=bf.length;i<l;i++)
{
(function(ak,dh){
A.addEvent(ak,"mousedown",function(){
Sd();
Jz();
});
A.addEvent(ak,"mouseover",function(){
bhO(dh);
});
})(bf[i],i);
}

if(qM.type=="keydown")
{

if(qM.keyCode==38)
{
if(typeof ad.rM=="undefined")
{
ad.rM=bf.length-1;
}
else
{
ad.rM--;
if(ad.rM<0)
{
ad.rM=bf.length-1;
}
}

Sd();
A.preventDefault(qM);
return false;
}

else if(qM.keyCode==40)
{
if(typeof ad.rM=="undefined")
{
ad.rM=1;
}
else
{
ad.rM++;
if(ad.rM>bf.length-1)
{
ad.rM=0
}
}

Sd();
A.preventDefault(qM);
return false;
}

else if(qM.keyCode==13)
{


A.preventDefault(qM);
}

else if(qM.keyCode==9)
{


}
}
else
{
ad.show();
}
}


};
function bhO(sV)
{

var bf=ad.we.childNodes;
for(var i=0,l=bf.length;i<l;i++)
{
if(sV==i)
{
A.addClass(bf[i],"auto_select");
ad.rM=i;
}
else
{
A.rmClass(bf[i],"auto_select");
}
}
};
function Sd()
{

var bf=ad.we.childNodes,
ajF=bf[ad.rM],
ef=ad.XP.value,
Nk=aws(ef),
aoZ="|"+ef,
aZr=["|",ad.qi.join("|"),"|"].join("");

if(ajF)
{

if(ef&&(aZr.indexOf(aoZ)>-1))
{
ad.XP.value=ajF.getAttribute("domain");
ad.XP.style.fontSize=ajF.getAttribute("fontsize");
}
ad.hide();
ja&&setTimeout(function(){
ja();
});
}
};
function bnv(bdu)
{
var ql=document.createElement("div");
ql.className="autocomplete";
ql.id="auto_container";

ql.setAttribute("tabindex","-1");
ql.setAttribute("hidefocus","true");
ql.onblur=function()
{
ad.hide();
};
A.show(ql,false);
bdu.parentNode.appendChild(ql);
return ql;
};

ad.show=function()
{
A.show(ad.we,true);
A.setFocus(ad.we);
A.addClass(ad.we,"login_domains_show");
};
ad.hide=function()
{
A.show(ad.we,false);
A.rmClass(ad.we,"login_domains_show");
};

cv();
};
function aJB(akj)
{
var lR=A.S('dialog_wrap'),
WI=A.S('mask');

if(akj)
{
A.hasClass(lR,"dropmenu")
&&A.rmClass(lR,"dropmenu");
!A.hasClass(lR,"popup")
&&A.addClass(lR,"popup");
A.addClass(WI,"mask-open");
A.show(lR,true);
EK();
}
else
{
A.show(lR,false);
A.rmClass(WI,"mask-open");
}
};
function bly(akj,Cv)
{
var lR=A.S('dialog_wrap'),
LF=A.S('login_menu'),
WI=A.S('mask');

A.rmClass(WI,"mask-open");
!A.hasClass(Cv,"drop")
&&A.addClass(Cv,"drop");

if(akj)
{
A.hasClass(lR,"popup")
&&A.rmClass(lR,"popup");
!A.hasClass(lR,"dropmenu")
&&A.addClass(lR,"dropmenu");

A.show(lR,true);
}
else
{
A.show(LF,true);
}

if(!document.onmousedown)
{
document.onmousedown=function(ah)
{
ah=ah||event;
var ajX=ah.target||ah.srcElement;
if(A.contains(Cv,ajX))
{
return;
}
if(!A.contains(lR,ajX)&&A.hasClass(lR,"dropmenu"))
{
A.show(lR,false);
A.rmClass(lR,"dropmenu");
A.hasClass(Cv,"drop")
&&A.rmClass(Cv,"drop");
}
else if(LF&&LF.style.display!="none"&&!A.contains(LF,ajX))
{
A.show(LF,false);
A.hasClass(Cv,"drop")
&&A.rmClass(Cv,"drop");
}
};
}
EK();
};
function bcj(bdv,bsq)
{
var ad=this;
ad.bnD=0;
ad.Dl=A.getElementsByClassName('slide-ctrl',A.S(bdv),'a');
ad.aIo=A.getElementsByClassName('slide-content',A.S(bsq),'div');

function biv(dh)
{
ad.bnD=dh;
cR.sSubType=dh;
for(var i=0;i<ad.Dl.length;i++)
{
if(A.hasClass(ad.Dl[i],"current"))
{
A.rmClass(ad.Dl[i],"current");
A.rmClass(ad.aIo[i],"current");
}
}
if(!A.hasClass(ad.Dl[dh],"current"))
{
A.addClass(ad.Dl[dh],"current");
A.addClass(ad.aIo[dh],"current");
}
};
function cv()
{
for(var i=0;i<ad.Dl.length;i++)
{
(function(dh){
ad.Dl[dh].onclick=function()
{
biv(dh);
}
})(i);
}
};
cv();
};




function LH(bgE,bgF)
{
var du=document.createElement("img"),
aDx=mE.sServerName+"/cgi-bin/getinvestigate?stat=newlogin&log1=#log1#&log2=#log2#&r=#random#";
du.src=aDx.replace("#log1#",bgE).replace("#log2#",bgF).replace("#random#",Math.random());
A.show(du,false);
document.body.appendChild(du);
du=null;
}
function bxV(cnN)
{
var du=document.createElement("img"),
aDx=[mE.sServerName,"/cgi-bin/getinvestigate?stat=loginerr&code=",cnN,"&r=",Math.random()].join("");
du.src=aDx;
A.show(du,false);
document.body.appendChild(du);
du=null;
}

function cO(kK,Tj)
{
cR.ang={
"pt":10,
"qm":20,
"op":30,
"dm":40,
"d2":50
}[mE.sLoginType];
cR.hX=kK||0;
if(kK==1)
{

cR.aiC=1;
}

if(kK==4&&mE.bUsingPT)
{
Tj==cR.aKg&&cR.MD++;
Tj&&(cR.amr=Tj);

LH([cR.ang+cR.hX,cR.hY,cR.IZ].join(","),[cR.aiC,cR.amr,cR.MD,cR.anN].join(","));
}

else if(kK==5&&mE.bUsingPT)
{
LH([cR.ang+cR.hX,cR.hY,cR.IZ].join(","),[cR.aiC,"",cR.MD,cR.anN].join(","));
}



};

function bgT(ja)
{
if(mE.bUsingPT)
{



setTimeout(function(){
ja&&ja();
},500);
setInterval(function(){
ja&&ja();
},3*60*1000);
}
};

function jq(cBL)
{
var bct=A.S('uin'),
aRE=A.S('domain'),
aoM=A.S('u'),

UE=A.S('u1'),
aLX="",
kR,ef;

if(aRE)
{
kR=bct.value;
ef=aRE.value;
aoM.value=kR?(kR+ef):"";
}
else if(mE.bUsingPT)
{
var avW=aoM.value;
kR=avW.split("@")[0];
ef=avW.split("@")[1];
ef=ef?("@"+ef):"";
aLX=cR.sSubType;
}

if(mE.bUsingPT)
{

cR.hY=kR;
cR.baU=ef?ef:(/\d+/.test(kR)?"qq.com":"");

if(ef=="@vip.qq.com")
{
cR.IZ="vip";
}
else if(ef=="@foxmail.com")
{
cR.IZ="fox";
}
else if(ef=="@qq.com")
{
cR.IZ="";
}
else
{
cR.IZ=ef||"__noInput__";
}


UE.value=A.urlReplacer(A.extend(

{
"ss":(A.S('remerber_password')&&A.S('remerber_password').checked)?"1":""
},

cBL?{
"validcnt":cR.MD,
"clientaddr":aoM.value
}:{},

(function(an){
switch(an)
{
case"op":
return({
"sub":aLX 
});
case"dm":
return({



"errtemplate":"dm_loginpage",
"aliastype":"other",
"dmtype":"domain",
"delegate_url":encodeURIComponent(A.S("delegate_url").value),
"s":A.S("s").value,
"loginEntry":A.S("loginEntry").value,
"target":A.S("target").value,
"name":encodeURIComponent(A.S("name").value),
"bcid":A.S("bcid").value,
"token":A.S("token").value
});
default:
return;
}
})(mE.sLoginType)
),UE.value);
}
return true;
};

function bpj(an)
{
cO(2);

if(mE.bUsingPT)
{

jq(true);
if(an=="addr")
{
yi();
return false;
}


var aom=A.S("p");
if(aom.value.length>cR.aKK)
{
cR.anN=1;
aom.value=aom.value.substr(0,cR.aKK);
}

try
{
if(!ptui_checkValidate())
{
HC(false);
EK();
}
}
catch(e)
{
debugger;
yi("errorPT");
}
if(!cR.hY)
{
A.setFocus("uin");
}
cO(3);
return false;
}
else
{
if(A.S("pp"))
{
var UR=window.org_pass=A.S("pp").value,
cD=document.loginform;
if(!UR)
{
yi("\u8bf7\u8f93\u5165\u72ec\u7acb\u5bc6\u7801");
A.setFocus("pp");
cO(3);
return false;
}


if(mE.bNeedEncrypt)
{
if(UR.length>170)
{
cD.p.value=UR;
}
else
{
var PublicKey="CF87D7B4C864F4842F1D337491A48FFF54B73A17300E8E42FA365420393AC0346AE55D8AFAD975DFA175FAF0106CBA81AF1DDE4ACEC284DAC6ED9A0D8FEB1CC070733C58213EFFED46529C54CEA06D774E3CC7E073346AEBD6C66FC973F299EB74738E400B22B1E7CDC54E71AED059D228DFEB5B29C530FF341502AE56DDCFE9",
PublicTs=cD.ts.value,
RSA=new RSAKey();
RSA.setPublic(PublicKey,"10001");

var Res=RSA.encrypt(cD.pp.value+'\n'+PublicTs+'\n');
if(Res)
{
cD.p.value=hex2b64(Res);
}
}
}
else
{
cD.p.value=UR;
}
}

if(A.S("verifyinput").style.display!="none"&&!A.S("verifycode").value)
{
yi("\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801");
A.setFocus("verifycode");
cO(3);
return false;
}


if(A.S("pp"))
{
cD.pp.value=cD.p.value;
}

cO(4);
}
return true;
};
function HC(akK)
{
var gB=A.S('btlogin');
if(akK)
{
gB.value="\u767b\u5f55\u4e2d";
gB.parentNode.className="login_btn_wrapper_disabled";
gB.setAttribute("loading",1)
}
else
{
gB.removeAttribute("loading");
gB.value="\u767b\u5f55";
gB.parentNode.className="login_btn_wrapper";
}
};
function bcB()
{
if(mE.bUsingPT)
{
imgLoadReport();
}
cO(1);
};
function afd()
{
if(mE.bUsingPT)
{
try{
ptui_changeImg();
}
catch(e)
{
yi("errorPT");
}
}
else
{
A.S('vfcode').src=mE.sServerName+"/cgi-bin/getverifyimage?aid=23000101&f=html&ck=1&r="+Math.random();
A.setFocus("verifycode");
}
};
function bkp(dr)
{

if(dr==cR.bmS)
{
cO(5);
}
else
{
cO(4,dr);
}

bxV(dr);
};
function yi(ba)
{
HC(false);
if(!ba)
{
A.S("msgContainer").style.display="none";
return;
}

var amt=
{
errorPT:"\u7f51\u7edc\u5f02\u5e38\uff0c\u90e8\u5206\u8d44\u6e90\u672a\u80fd\u62c9\u53d6\uff0c\u8bf7\u5237\u65b0\u540e\u91cd\u8bd5\u3002",
errorCheck:"\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u5237\u65b0\u540e\u91cd\u8bd5\u3002",
errorSecondPwdNeedQQErr:"\u4e3a\u589e\u5f3a\u90ae\u7bb1\u5b89\u5168\u6027\uff0c\u767b\u5f55\u65f6\u9700\u8981\u9a8c\u8bc1\u60a8\u7684QQ\u5bc6\u7801\u3002"
},
ape=A.S("msgContainer");

amt[ba]&&(ba=amt[ba]);

if(bkQ())
{
ba=amt["errorSecondPwdNeedQQErr"]
}
ape.innerHTML=ba.replace(/[\,\.\!\?\uff0c\u3002\uff01]$/g,"");
ape.style.display="";



if(mE.bUsingPT)
{
var cgM=511,
aZV={
errorPT:551,
errorCheck:552,
errorSecondPwdNeedQQErr:553
}[ba]||-1;
if(window.pt&&pt.lang)
{
var n=-1;
for(var i in pt.lang)
{
n++;
if(ba.indexOf(pt.lang[i])==0)
{
aZV=cgM+n;
break;
}
}
}

aZV>-1
&&bxV(aZV);
}
};
function bkQ()
{




if(cR.avC==mE.sLoginType
&&cR.MD>=cR.aZi
&&cR.amr==cR.aKg
&&cR.hX==4)
{
cR.bcn=1;
return true;
}
return false;
};
function Jz()
{
if(mE.bUsingPT)
{
jq();
try
{
window.check&&check();
}
catch(e)
{
yi("errorCheck");
}
}
};
function EK()
{
var hO=cR.avC==mE.sLoginType?"uin":"u",
bUK=[hO,"pp","p","verifycode"];
for(var i=0,l=bUK.length;i<l;i++)
{
var az=bUK[i];
if(A.S(az)&&!A.S(az).value)
{
A.setFocus(az);
break;
}
az=null;
}
};
function Re()
{
yi();
setTimeout(function(){
Jz();
EK();
});
};
function boN(ja,ahV)
{
var aKX=ahV||[
[!mE.bNeedEncrypt?'https://ui.ptlogin2.qq.com/js/login_div.js':'http://imgcache.qq.com/ptlogin/ac/v9/js/login_div.js',"UTF-8"],
[mE.oResCfg&&mE.oResCfg.sPtUrl||"","GBK"]
];
if(aKX.length&&aKX[0][0])
{
var xB=aKX.shift(),
eu=document.createElement("script");
eu.type="text/javascript";
eu.charset=xB[1];
eu.src=xB[0];
document.body.appendChild(eu);
eu=null;

bDS();
A.waitFor(
function()
{
return window["pt"];
},
function(ji)
{
if(ji)
{
typeof(window.onload)=="function"&&cR.cip
&&window.onload();

bDS(true);
ja();
Jz();
}
else
{
if(aKX.length)
{
bDf();
boN(ja,aKX);
}
else
{
bDf(true);
}
}
}
);
}

function bDf(ckT)
{
var bUc={
"pt":7,
"dm":9
}[mE.sLoginType]||11;
ckT&&(bUc++);
(new Image()).src=A.urlReplacer({
"jsfailtime":bUc,
"r":Math.random()
},mE.oResCfg.sReportUrl);
};
};
function bDS(cfz)
{
var acq=["u","p","verifycode"];
for(var i=0;i<acq.length;i++)
{
(function(){
if(!cfz)
{

if(!A.S(acq[i]).tfocus)
{
A.S(acq[i]).tfocus=A.S(acq[i]).focus;
A.S(acq[i]).focus=function(){};
}
}
else
{
if(i==0)
{

A.S(acq[i]).focus=function()
{
try
{
this.tfocus();
}
catch(e){}
}
}
else
{
A.S(acq[i]).focus=A.S(acq[i]).tfocus;
}
}
})();
};
}

cR=window["QMLogin"]=A.extend({




changeImg:afd,




checkInput:bpj,



judgeVC:Jz,



switchMode:Re,





onLoadVC:bcB
},{
init:function(aM)
{
mE=aM;


A.extend(
window,
{

callback:function()
{
try
{
document.selection
&&document.selection.empty()
}
catch(e){}
},

ptlogin2_onResize:function()
{
aM.onResize&&aM.onResize.apply(this,arguments);
},

ptlogin2_onMibaoCancel:function()
{
location.replace(location)
},

ptui_bos:function()
{
bkp.apply(null,arguments)
},

pt_show_err:function()
{
yi.apply(null,arguments)
}
}
);


if(aM.bNeedEncrypt&&!aM.bUsingPT&&aM.oResCfg.sEncryptUrl)
{
var eu=document.createElement("script");
eu.type="text/javascript";
eu.charset="GBK";
eu.src=aM.oResCfg.sEncryptUrl;
document.body.appendChild(eu);
eu=null;
}
},



ready:function()
{
if(mE.bUsingPT)
{

if(A.S("uin"))
{
EK();
boN(function()
{
if(A.S("u").value&&!A.S("uin").value)
{
A.S("uin").value=A.S("u").value.split("@")[0];
EK();
}
});
}
else
{

var cdF=(A.getCookie("ptui_loginuin")||""),
bPn=(A.getCookie("qqmail_alias")||"");
if(!bPn&&cdF)
{
A.setCookie("ptui_loginuin",bPn);
}

boN(function()
{

var bUG=A.S("u").getAttribute("default");
if(bUG)
{
A.S("u").value=bUG;
}
EK();
});
}
}
else
{
EK();
}

var ad=this,
np={



"basic":function()
{
bgT(function()
{
Jz();
}
);
A.S('btlogin').onclick=function()
{
var gB=this;
if(gB.getAttribute("loading"))
{

clearTimeout(mE.gnTimerSet||0);
mE.gnTimerSet=setTimeout(function()
{
HC(false);
},5000);
return false;
}
else
{
HC(true);
}
};
},



"caps":function()
{
new blZ(A.S("pp")||A.S("p"));
},



"label":function()
{
new bui(["uin","u","p","pp","verifycode"]);
},



"slide":function()
{
new bcj('slide_ctrls','slide_contents');
},



"domain":function()
{
var HZ=A.S("uin"),
Rx=A.S("domain");
if(HZ)
{
new btJ(HZ,Rx,cR.bdN,cR.bhM);
A.addEvent(HZ,"blur",function(){
A.rmClass(HZ.parentNode,"active");
});
A.addEvent(HZ,"focus",function(){
A.addClass(HZ.parentNode,"active");
});

if(!-[1,]&&!window.XMLHttpRequest)
{
A.addEvent(Rx,"mouseout",function(){
A.rmClass(Rx.parentNode,"active");
});
A.addEvent(Rx,"mouseover",function(){
A.addClass(Rx.parentNode,"active");
});
}
}
},



"popup":function()
{
A.S("dialog_close").onclick=function()
{
aJB(false);
};
A.S("login").onclick=function(jn)
{
bly(!mE.bIsLogin,this);
};

A.each(A.getElementsByClassName("button-blue"),function(ak)
{
(function(){
ak&&ak.getAttribute("data-uigroup")=="dialog"&&mE.sLoginType==ad.awC
&&(ak.onclick=function(jn){
jn=jn||event;
if(!mE.bIsLogin)
{
aJB(true);
A.preventDefault(jn);
return false;
}
});
})();
}
);
}
},
bpn={

"pt":["basic","caps","label","domain"],

"op":["basic","caps","label","popup","slide"],

"qm":["basic","caps","label"],

"dm":["basic"],

"d2":["basic"]
};


A.each(mE.oUseCom||bpn[mE.sLoginType],function(buJ)
{
np[buJ].apply(ad);
}
);
}
},{



aZi:2,
aKK:16,

bdN:["@vip.qq.com","@qq.com","@foxmail.com"],
bhM:["14px","18px","13px"],



bmS:"0",
aKg:"3",



VT:"qm",
avC:"pt",
awC:"op",
cPf:"dm",
cNZ:"d2",






ang:0,
hX:0,



MD:0,
aiC:0,
bcn:0,
anN:0,
IZ:"",
baU:"@qq.com",
amr:"",
hY:""
});

A.addEvent(window,"load",function()
{
cR.cip=!window["pt"];
}
);
})
(function()
{
function cr(ao)
{
return document.getElementById(ao)||null;
};
function bAU(aC,aS,lb,ds,hU,oM)
{
if(aC)
{
var dq=[
'$name$=$value$; ',
!lb?'':'expires=$expires$; ',
'path=$path$; ',
'domain=$domain$; ',
!oM?'':'$secure$'
].join(""),
bKu={
name:aC,
value:encodeURIComponent(aS||""),
expires:lb&&lb.toGMTString(),
path:ds||'/',
domain:hU||"qq.com",
secure:oM?"secure":""
};
for(var i in bKu)
{
dq=dq.replace("\$"+i+"\$",bKu[i]);
};

document.cookie=dq;
return true;
}
else
{
return false;
}
};
function cdq(Ic)
{
return Ic.replace(/([\^\.\[\$\(\)\|\*\+\?\{\\])/ig,"\\$1");
}
function cjt(aC)
{
return(new RegExp([
"(?:; )?",cdq(aC),"=([^;]*);?"
].join("")
)).test(document.cookie)&&decodeURIComponent(RegExp["$1"]);
};
function cCP(aC,ds,hU)
{
bAU(aC,"",new Date(0),ds,hU);
}
function qU(ak,an,pa,hP)
{
if(ak&&pa)
{
if(ak.addEventListener)
{
ak[hP?"removeEventListener":"addEventListener"](
an,pa,false
);
}
else if(ak.attachEvent)
{
ak[hP?"detachEvent":"attachEvent"]("on"+an,
pa
);
}
else
{
ak["on"+an]=hP?null:pa;
}
}
return ak;
};
function bCV(str)
{
return str.replace(/(^\s+|\s+$)/g,"");
};
function aKF(aC,aS,ahG)
{
var iY=new RegExp("([?&]"+aC+"=)([^&#]*)?"),
cG=aS?aS:"";

return(iY.test(ahG)?
ahG.replace(iY,"$1"+cG)
:[ahG,"&",aC,"=",cG].join(""));
};


return({
S:cr,
trim:bCV,
addEvent:qU,
setCookie:bAU,
getCookie:cjt,
delCookie:cCP,
addEvents:function(dV,qF,hP)
{
for(var an in qF)
{
qU(dV,an,qF[an],hP);
}
return dV;
},
setFocus:function(rN)
{
var aI=typeof rN=="string"?cr(rN):rN;
if(aI)
{
try
{
aI.focus();
aI.onfocus();
}catch(e){};
}
},
show:function(iX,iF,by)
{
var bo=(typeof(iX)=="string"?cr(iX,by):iX);
if(bo)
{
bo.style.display=(iF?"":"none");
}
return bo;
},
preventDefault:function(evt)
{
if(evt)
{
evt.preventDefault?evt.preventDefault():(evt.returnValue=false);
}
},

hasClass:function(ak,hK)
{
return(" "+ak.className+" ").indexOf(" "+hK+" ")>-1;
},
addClass:function(ak,hK)
{
var jo=" "+ak.className+" ";
if(jo.indexOf(" "+hK+" ")<0)
{
ak.className+=ak.className?" "+hK:hK;
}
},
rmClass:function(ak,hK)
{
if(hK)
{
var jo=" "+ak.className+" ";
jo=jo.replace(" "+hK+" "," ");
ak.className=bCV(jo);
}
else
{
ak.className="";
}
},
extend:function()
{
for(var aR=arguments,mU=aR[0],i=1,av=aR.length;i<av;i++)
{
var qn=aR[i];
for(var j in qn)
{
mU[j]=qn[j];
}
}
return mU;
},
waitFor:function(Ht,BG,oQ,lQ)
{
var hG=0,
mG=oQ||500,
Io=(lQ||10*500)/mG;

function PO(ji)
{
try
{
BG(ji)
}
catch(ax)
{

}
};

(function()
{
try
{
if(Ht())
{
return PO(true);
}
}
catch(ax)
{

}

if(hG++>Io)
{
return PO(false);
}

setTimeout(arguments.callee,mG);
})();
},
getElementsByClassName:function(Wd,ak,iN)
{
if(document.getElementsByClassName)
{
return document.getElementsByClassName(Wd);
}
else
{
ak=ak||document;
iN=iN||"*";
var tg=[],
akS=(iN=='*'&&ak.all)?ak.all:ak.getElementsByTagName(iN),
i=akS.length;
Wd=Wd.replace(/\-/g,'\\-');
var hM=new RegExp('(^|\\s)'+Wd+'(\\s|$)');
while(--i>=0)
{
if(hM.test(akS[i].className))
{
tg.push(akS[i]);
}
}
return tg;
}
},
each:function(pn,afFunc)
{
if(typeof pn.length=="number")
for(var i=0,l=pn.length;i<l;i++)
{
afFunc&&afFunc.apply(null,[pn[i],i])
}
else
for(var i in pn)
{
afFunc&&afFunc.apply(null,[pn[i],i])
}
return pn;
},
contains:function(US,awH)
{
if(US.contains)
{
return US.contains(awH);
}
else if(US.compareDocumentPosition)
{
var de=US.compareDocumentPosition(awH);
return de==20||de==0;
}

return false;
},
urlReplacer:function()
{
var bq=arguments[0],
eG=(typeof bq=="object"?arguments[1]:arguments[2])||location.href,
eG=eG+(eG.indexOf("?")>-1?"":"?"),
bmv=eG.substr(0,eG.indexOf("?")),
aq=eG.substr(eG.indexOf("?"),eG.length);
switch(typeof bq)
{
case"object":
for(var i in bq)
{
aq=aKF(i,bq[i],aq);
}
break;
case"string":
aq=aKF(arguments[0],arguments[1],aq);
break;
default:
}
return bmv+aq;
}
});
}());
