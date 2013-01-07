
if(document.getElementById("se_pro_val")!=null)
{function onClick(ev){ev=ev||window.event;var target=ev.target||ev.srcElement;if(target&&target.id&&target.id=="se_pro_key"){}
else{document.getElementById("se_pro_items").style.display="none"}}
var oWXshow=document.getElementById("show_weixin"),oWXadd=document.getElementById("add_weixin")
var oInpTxt={};oInpTxt.obj=document.getElementById("so_dp")
var oSelect={};oSelect.obj=document.getElementById("se_pro_key");oSelect.option=document.getElementById("se_pro_items");function toggleTitle(val){switch(val)
{case'10':oInpTxt.obj.title="\u871C\uFF0C\u8BF7\u8F93\u5165\u4EA7\u54C1\u540D\u6216\u5173\u952E\u5B57"
break;case'11':oInpTxt.obj.title="\u8BF7\u8F93\u5165\u60A8\u5173\u5FC3\u7684\u5185\u5BB9\uFF0C\u5982\u7F8E\u767D\u3001\u795B\u75D8 "
break;case'9':oInpTxt.obj.title="\u8BF7\u8F93\u5165\u60A8\u60F3\u770B\u7684\u5185\u5BB9\uFF0C\u5982\u6652\u8D27\u3001\u7A7A\u74F6"
break;case'8':oInpTxt.obj.title="\u8BF7\u8F93\u5165\u60A8\u60F3\u770B\u7684\u5185\u5BB9\uFF0C\u5982\u76D8\u70B9\u3001\u5FC5\u770B"
break;case'4':oInpTxt.obj.title="\u8BF7\u8F93\u5165\u60A8\u5173\u6CE8\u7684\u54C1\u724C\u540D\u6216\u5173\u952E\u5B57"
break;case'2':oInpTxt.obj.title="\u8BF7\u8F93\u5165\u60A8\u60F3\u627E\u7684\u871C\u53CB\u6635\u79F0"
break;default:oInpTxt.obj.title=""
break;}}
function ini(){var valTmp=document.getElementById("se_pro_val").value
toggleTitle(valTmp);}
ini();function wx(){if(oWXadd.style.display=="none"||oWXadd.style.display=="")
{oWXadd.style.display="block";}else{oWXadd.style.display="none";}}
function inpHide(){if(this.value=="\u871C\uFF0C\u8BF7\u8F93\u5165\u5185\u5BB9")
{this.value=""}else if(this.value=="")(this.value="\u871C\uFF0C\u8BF7\u8F93\u5165\u5185\u5BB9")}
function currentFn(){document.getElementById("se_pro_val").value=this.rev
oSelect.obj.innerHTML=this.innerHTML;oSelect.option.style.display="none";toggleTitle(this.rev);}
function selectVlaue(event){oSelect.option.style.display="block";var aOptionSub=oSelect.option.getElementsByTagName("a");for(var i=0;i<aOptionSub.length;i++)
{aOptionSub[i].onclick=currentFn}}
if(document.all){window.document.onclick=new Function("return onClick(event);");}else{window.document.body.setAttribute("onclick","return onClick(event);")}
oWXshow.onmouseover=wx;oWXshow.onmouseout=wx;oInpTxt.obj.onfocus=inpHide;oInpTxt.obj.onblur=inpHide;oSelect.obj.onclick=selectVlaue;}