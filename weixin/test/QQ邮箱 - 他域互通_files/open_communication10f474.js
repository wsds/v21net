var oExport=(function(A,bp)
{
var mc={
tooLongErr:"\u8d85\u51fa\u957f\u5ea6\u9650\u5236",
emptyCompany:"\u4f01\u4e1a\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a",
emptyDomain:"\u57df\u540d\u4e0d\u80fd\u4e3a\u7a7a",
emptyContact:"\u8054\u7cfb\u4eba\u4e0d\u80fd\u4e3a\u7a7a",
errAreaPhone:"\u533a\u57df\u7801\u4e0d\u6b63\u786e",
errLocalPhone:"\u672c\u5730\u7801\u4e0d\u6b63\u786e",
errExtPhone:"\u5206\u673a\u53f7\u4e0d\u80fd\u975e\u6570\u5b57",
emptyIp:"IP\u4e0d\u80fd\u4e3a\u7a7a",
onfocusIp:"\u5982\u679c\u60a8\u6709\u591a\u4e2aIP\uff0c\u8bf7\u6ce8\u518c\u540e\u8fdb\u884c\u589e\u52a0",
emptyICP:"ICP\u5907\u6848\u53f7\u4e0d\u80fd\u4e3a\u7a7a",
errIp:"IP\u5730\u5740\u683c\u5f0f\u9519\u8bef",
errDomain:"\u57df\u540d\u683c\u5f0f\u9519\u8bef",
errLic:"\u8bf7\u4e0a\u4f20\u516c\u53f8\u8425\u4e1a\u6267\u7167\u626b\u63cf\u4ef6,\u56fe\u7247\u5927\u5c0f\u8bf7\u4e0d\u8981\u8d85\u8fc7512KB"
};

var avS={};
var aRC={};
function bYd()
{
if(A.S("comp_input").value==="")
{
A.S("comp_err").innerHTML=mc.emptyCompany;
A.S("comp_err").style.display="inline";
return false;
}
if(A.getByteLen(A.S("comp_input").value)>=250)
{
A.S("comp_err").innerHTML=mc.tooLongErr;
A.S("comp_err").style.display="inline";
return false;
}
A.S("comp_err").style.display="none";
return true;
}
function asx()
{
if(A.S("domain_input").value==="")
{
A.S("domain_err").innerHTML=mc.emptyDomain;
A.S("domain_err").style.display="inline";
return false;
}else
if(A.checkDomain(A.S("domain_input").value)===false)
{
A.S("domain_err").innerHTML=mc.errDomain;
A.S("domain_err").style.display="inline";
return false;
}else
if(A.getByteLen(A.S("domain_input").value)>=250)
{
A.S("domain_err").innerHTML=mc.tooLongErr;
A.S("domain_err").style.display="inline";
return false;
}
A.S("domain_err").style.display="none";
return true;
}
function aOU()
{
if(A.S("contact_input").value==="")
{
A.S("contact_err").innerHTML=mc.emptyContact;
A.S("contact_err").style.display="inline";
return false;
}else
if(A.getByteLen(A.S("contact_input").value)>=60)
{
A.S("contact_err").innerHTML=mc.tooLongErr;
A.S("contact_err").style.display="inline";
return false;
}
A.S("contact_err").style.display="none";
return true;
}
function aRv()
{
var bbP=/^\d{3,4}$/;
if(A.S("phone_area").value===""||bbP.test(A.S("phone_area").value)===false)
{
A.S("phone_err").innerHTML=mc.errAreaPhone;
A.S("phone_err").style.display="inline";
return false;
}
A.S("phone_err").innerHTML="";
A.S("phone_err").style.display="none";
return true;
}
function bsG()
{
var bnM=/^\d{7,8}$/;
var mD="";
if(aRv(A.S("phone_area").value)===false)mD+=mc.errAreaPhone;
if(bnM.test(A.S("phone_local").value)===false)mD+=" "+mc.errLocalPhone;
if(mD!=="")
{
A.S("phone_err").innerHTML=mD;
A.S("phone_err").style.display="inline";
return false;
}
A.S("phone_err").innerHTML="";
A.S("phone_err").style.display="none";
return true;
}
function aPn()
{
var bfy=/^\d*$/;
var mD="";
if(aRv(A.S("phone_area").value)===false)mD+=mc.errAreaPhone;
if(bsG(A.S("phone_local").value)===false)mD+=" "+mc.errLocalPhone;
if(bfy.test(A.S("phone_ext").value)===false)mD+=" "+mc.errExtPhone;
if(mD!=="")
{
A.S("phone_err").innerHTML=mD;
A.S("phone_err").style.display="inline";
return false;
}
A.S("phone_err").innerHTML="";
A.S("phone_err").style.display="none";
return true;
}
function bEW()
{
if(A.S("ip_input").value==="")
{
A.S("ip_err").innerHTML=mc.emptyIp;
A.S("ip_err").style.display="inline";
return false;
}
if(A.checkIpAdress(A.S("ip_input").value)===false)
{
A.S("ip_err").innerHTML=mc.errIp;
A.S("ip_err").style.display="inline";
return false;
}
A.S("ip_err").style.display="none";
return true;
}
function cBl()
{
A.S("ip_err").innerHTML=mc.onfocusIp;
A.S("ip_err").style.display="inline";
return true;
}
function bUf()
{
if(A.S("icp_input").value==="")
{
A.S("icp_err").innerHTML=mc.emptyICP;
A.S("icp_err").style.display="inline";
return false;
}else
if(A.getByteLen(A.S("icp_input").value)>=250)
{
A.S("icp_err").innerHTML=mc.tooLongErr;
A.S("icp_err").style.display="inline";
return false;
}
A.S("icp_err").style.display="none";
return true;
}
function cHW()
{
if(A.S("lic_input").value==="")
{
A.S("license_err").innerHTML=mc.errLic;
A.S("license_err").style.display="inline";
return false;
}
A.S("license_err").style.display="none";
return true;
}
function brA(Bf,aCY)
{
for(var i=0,len=aCY.length;i<len;i++)
if(A.S(aCY[i]))
A.S(aCY[i]).disabled=Bf;
}
function bxE(Bf)
{
brA(Bf,["domain_input","comp_input","icp_input","contact_input","phone_ext","phone_area","phone_local","lic_input",
"ip_input","submit_input","change_submit_input"]);
}
function aCH(ao)
{
return function()
{
if(A.S(ao).className==="cur")
{
if(A.S("edit_info").style.display!=="none")
{
A.S(ao+"_c").style.display="block";
A.S("edit_info").style.display="none";
}
return;
}
A.S("domain_quality").className="";
A.S("domain_ip_manager").className="";
A.S("company_info").className="";
A.S(ao).className="cur";

A.S("domain_quality_c").style.display="none";
A.S("domain_ip_manager_c").style.display="none";
A.S("company_info_c").style.display="none";
A.S("edit_info").style.display="none";
A.S(ao+"_c").style.display="block";
}
}
function Fk(bc)
{
return(bc.indexOf("cgi exception")!==-1);
}
function ER(aLf)
{
switch(aLf.errcode)
{
case"-2":
var mD=aLf.errmsg.replace("<script>","").replace("</script>","");
eval(mD);
return true;
}
}
function bHA()
{
var ccM=A.S("table_body").innerHTML;
avS[A.S("select").value]=ccM;
var bau=A.getElementsByClassName("ipEdit");
for(var i=0;i<bau.length;++i)
{
A.addEvent(bau[i],"click",(function(gr)
{
return function()
{
A.S("show_domain").title=gr;
A.S("show_domain").innerHTML=gr;
if(!A.S("domain_err"))
A.S("ip_contain").innerHTML+='<a href="http://service.mail.qq.com/cgi-bin/help?subtype=1&&id=20006&&no=1000938" target="_blank" id="domain_err" class="error_tips" style="display:none"></a>';
A.addEvent(A.S("cancel_add_ip"),"click",function()
{
A.S("add_ip").style.display="none";
A.S("domain_err").parentNode.removeChild(A.S("domain_err"));
A.S("input_ip_2").value="";
});
A.S("add_domain_hidden_input").value=gr;
A.S("add_ip").style.display="block";
}
})(bau[i].parentNode.title));
}
var biD=A.getElementsByClassName("c_delete");
for(var i=0;i<biD.length;++i)
{
biD[i].onclick=(function(atj)
{
return function()
{
if(A.checkIpAdress(atj)===false)
{
if(!confirm("\u786e\u5b9a\u8981\u5220\u9664 "+atj+"\u8fd9\u4e2a\u57df\u540d\u5417\uff1f\u82e5\u5220\u9664\uff0c\u5176\u5bf9\u5e94\u7684IP\u4e5f\u4f1a\u88ab\u5220\u9664\u3002"))
return;
}else
{
if(!confirm("\u786e\u5b9a\u8981\u5220\u9664 "+atj+"\u8fd9\u4e2aIP\u5417\uff1f\u5982\u679c\u8be5IP\u4e0e\u5bf9\u5e94\u57df\u540d\u552f\u4e00\u6620\u5c04\uff0c\u5bf9\u5e94\u7684\u57df\u540d\u4e5f\u4f1a\u88ab\u5220\u9664\u3002"))
return;
}
var iO;
if(A.checkIpAdress(atj)===false)
iO="/cgi-bin/communication?sid="+A.sSid+"&t=open_communication&action=deldomain&domain="+encodeURIComponent(atj)+"&ef=js&resp_charset=UTF8";
else
iO="/cgi-bin/communication?sid="+A.sSid+"&t=open_communication&action=delip&ip="+encodeURIComponent(atj)+"&ef=js&resp_charset=UTF8";
var ba=new A.Ajax(iO,"GET",30000);
ba.onComplete=function(bK)
{
var qX=bK.responseText;
try
{
eval(qX);
}catch(e)
{
if(ER(eval("("+qX+")")))
return;
}
}
ba.send();
}
})(biD[i].parentNode.title);
}
var aRA=A.getElementsByClassName("resend");
for(var i=0,len=aRA.length;i<len;++i)
{
aRA[i].onclick=(function(gr,aaq)
{
return function()
{
if(aaq.innerHTML!=="\u91cd\u65b0\u53d1\u9001\u9a8c\u8bc1\u4fe1")
{
return;
}
if(confirm("\u5411 postmaster@"+gr+"\u91cd\u65b0\u53d1\u9001\u9a8c\u8bc1\u4fe1\uff1f"))
{
var iO="/cgi-bin/communication?sid="+A.sSid+"&t=open_communication&action=resendmail&domain="+encodeURIComponent(gr)+"&ef=js&resp_charset=UTF8";
var ba=new A.Ajax(iO,"GET",30000);
ba.onComplete=function(bK)
{
var qX=bK.responseText;
try
{
if(Fk(qX))
{
var kD=eval("("+qX+")");
if(ER(kD))return;
if(kD.errcode==="-111"||
kD.errcode==="-113")
{
aaq.innerHTML=kD.errmsg;
aaq.style.color="#f00";
aaq.style.cursor="default";
aaq.style.textDecoration="none";
}
}else
{
aaq.innerHTML="\u5df2\u53d1\u9001";
aaq.style.cursor="default";
aaq.style.textDecoration="none";
}
}catch(e)
{

}
}
ba.onError=function()
{
}
ba.send();
}
}
})(aRA[i].parentNode.title,aRA[i]);
}
A.addEvent(A.S("domain_quality"),"click",aCH("domain_quality"));
A.addEvent(A.S("domain_ip_manager"),"click",aCH("domain_ip_manager"));
A.addEvent(A.S("company_info"),"click",aCH("company_info"));
A.addEvent(A.S("edit_button"),"click",function()
{
A.S("company_info_c").style.display="none";
A.S("edit_info").style.display="block";
});
A.addEvent(A.S("select"),"change",function(e)
{
A.S("waiting_img").style.display="none";
var auB=A.S("select").value;

if(aRC[auB]===true)
{
A.S("waiting_img").style.display="";
return;
}

if(avS[auB]!==bp)
{
A.S("table_body").innerHTML=avS[auB];
return;
}
A.S("table_body").innerHTML="";
aRC[auB]=true;
var iO="/cgi-bin/communication?sid="+A.sSid+"&t=open_communication&action=gethistory&date="+encodeURIComponent(auB)+"&ef=js&resp_charset=UTF8";
var ba=new A.Ajax(iO,"GET",30000);
ba.onComplete=function(bK)
{
var cgw=A.S("select").value;
var qX=bK.responseText;
if(Fk(qX))
{
if(ER(eval("("+qX+")")))return;
}
var cgf=/\<!--(.*)--\>/;
qX=qX.replace(cgf,"");
var aXT=RegExp.$1;

aRC[aXT]=false;
if(aXT===cgw)
{
A.S("waiting_img").style.display="none";
A.S("table_body").innerHTML=qX;
avS[aXT]=qX;
}else 
{
avS[aXT]=qX;
}
}
ba.onError=(function(pV)
{
return function()
{
aRC[pV]=false;
A.S("waiting_img").style.display="none";
}
})(auB);
ba.send();
A.S("waiting_img").style.display="";
});
A.addEvent(A.S("addr_add"),"click",function(e)
{
if(!A.S("domain_err"))
A.S("domain_contain").innerHTML+='<a href="http://service.mail.qq.com/cgi-bin/help?subtype=1&&id=20006&&no=1000938" target="_blank"id="domain_err" class="error_tips" style="display:none"></a>';
A.addEvent(A.S("cancel_add_domain"),"click",function()
{
A.S("add_domain").style.display="none";
A.S("domain_err").parentNode.removeChild(A.S("domain_err"));
A.S("input_domain").value="";
A.S("input_ip").value="";
});
A.S("add_domain").style.display="block";
});
A.addEvent(A.S("cancel_edit_info"),"click",function(e)
{
brA(false,["contact_input","phone_area","phone_local","phone_ext","change_submit_input"]);
aCH("company_info")();
});
A.addEvent(A.S("contact_input"),"blur",aOU);
A.addEvent(A.S("phone_area"),"blur",aRv);
A.addEvent(A.S("phone_local"),"blur",bsG);
A.addEvent(A.S("phone_ext"),"blur",aPn);
A.addEvent(A.S("change_submit"),"submit",function(e)
{
var xK=aOU();
xK&=aPn();
if(!xK)
{
A.preventDefault(e);
return;
}
setTimeout(function()
{
brA(true,["contact_input","phone_area","phone_local","phone_ext","change_submit_input"]);
},0);
});
A.addEvent(A.S("adddomain_submit"),"submit",function(e)
{
var mD="";
if(A.S("input_domain").value==="")mD=mc.emptyDomain;
else
if(A.checkDomain(A.S("input_domain").value)===false)mD=mc.errDomain;
else
if(A.S("input_ip").value==="")mD=mc.emptyIp;
else
if(A.checkIpAdress(A.S("input_ip").value)===false)mD=mc.errIp;
if(mD!=="")
{
A.S("domain_err").innerHTML=mD;
A.S("domain_err").style.display="inline";
A.preventDefault(e);
return;
}
});
A.addEvent(A.S("addip_submit"),"submit",function(e)
{
if(A.S("input_ip_2").value==="")
{
A.S("domain_err").innerHTML=mc.emptyIp;
A.S("domain_err").style.display="inline";
A.preventDefault(e);
}
else
if(A.checkIpAdress(A.S("input_ip_2").value)===false)
{
A.S("domain_err").innerHTML=mc.errIp;
A.S("domain_err").style.display="inline";
A.preventDefault(e);
return;
}
});






























}
function cnS()
{

A.addEvent(A.S("comp_input"),"blur",bYd);
A.addEvent(A.S("domain_input"),"blur",asx);
A.addEvent(A.S("contact_input"),"blur",aOU);
A.addEvent(A.S("phone_area"),"blur",aRv);
A.addEvent(A.S("phone_local"),"blur",bsG);
A.addEvent(A.S("phone_ext"),"blur",aPn);
A.addEvent(A.S("ip_input"),"blur",bEW);
A.addEvent(A.S("ip_input"),"focus",cBl);
A.addEvent(A.S("icp_input"),"blur",bUf);
A.addEvent(A.S("submit_form"),"submit",function(e)
{
if(A.S("cm_checkbox").checked===false)
{
A.preventDefault(e);
return;
}
var xK=bYd();
xK&=asx();
xK&=aOU();
xK&=aPn();
xK&=bEW();
xK&=bUf();
xK&=cHW();
if(!xK)
{
A.preventDefault(e);
return;
}
setTimeout(function()
{
bxE(true);
},0);



});

}

A.addEvent(window,"load",function()
{
if(A.firstlogin==="no")
bHA();
else	cnS();
A.addEvent(window,"resize",function(e)
{
});
});
return{
initHasReg:bHA,
setCur:aCH,
setDisableAll:bxE
};
})
(function()
{
function chF(cO)
{
return cO.replace(/[^\x00-\xFF]/g,"**").length;
}
function asx(gr)
{
var bkc=/^[a-z#A-Z_0-9\+\.\-\']+@[a-zA-Z_0-9.-]+\.\w+$/;
return bkc.test("postmaster@"+gr);
}
function cLO(cO)
{
cO=trim(cO);
var bTQ='(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])';
var cgO='(?:'+bTQ+'\\.){3}'+bTQ;
var cjG=new RegExp('^'+cgO+'$');
return cjG.test(cO);
}
function bmC(xc,ak,gU)
{
if(document.getElementsByClassName)
{
return document.getElementsByClassName(xc);
}
else
{
ak=ak||document;
gU=gU||"*";
var pc=[],
Eh=(gU=='*'&&ak.all)?ak.all:ak.getElementsByTagName(gU),
i=Eh.length;
xc=xc.replace(/\-/g,'\\-');
var gv=new RegExp('(^|\\s)'+xc+'(\\s|$)');
while(--i>=0)
{
if(gv.test(Eh[i].className))
{
pc.push(Eh[i]);
}
}
return pc;
}
}
return{

S:S,
show:show,
addEvent:addEvent,
getByteLen:chF,
checkIpAdress:cLO,
checkDomain:asx,
firstlogin:firstlogin,
preventDefault:preventDefault,
sSid:sid,
Ajax:QMAjax,
trim:trim,
getElementsByClassName:bmC
}
}());
