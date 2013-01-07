var lashen_title="<div style=' background:#BC185D;height:30px;line-height:30px; width:100%;cursor: pointer;'   onclick='lashen()'><div  style='float:left; cursor: pointer;color:#ffffff' onclick='lashen()' >快速查看 "+lashen_p_name+" 详情:</div><div style='float:right; '><img src=http://statics1.kimiss.com/upload/userfiles/image/2010-11/25/1290647874050000100.jpg onclick='lashen()'  style='cursor: pointer;'  ></a></div></div>";
var lashen_title_close="<div style=' background:#BC185D;height:30px;line-height:30px; width:100%;cursor: pointer;'   onclick='lashen_huifu()'><div style='float:left; cursor: pointer;color:#ffffff' onclick='lashen_huifu()' >快速查看 "+lashen_p_name+" 详情:</div><div style='float:right; '><img src=http://statics1.kimiss.com/upload/userfiles/image/2010-11/25/1290648024031250100.jpg onclick='lashen_huifu()' style='cursor: pointer;'></a></div></div>";
var lashen_in=0;
var lashen_auto_once=0;
function auto_lashen()
{
   if(lashen_auto_once==0) lashen();
   lashen_auto_once=1;
}
 function lashen()
 {
if(lashen_in==1) return;
document.getElementById('BottomMsg').style.height='400px';
document.getElementById('BottomMsg').style.bottom='0px';
document.getElementById('lashen_content').innerHTML=lashen_title_close+'<iframe name=cross_iframe allowtransparency="yes" width="100%"   frameborder="0" height=100% src="http://product.kimiss.com/product/'+lashen_p_id+'/catalog/"><\/iframe>';
lashen_in=1;
 }
 function lashen_huifu()
 {
	 lashen_in=0;
	document.getElementById('BottomMsg').style.height='30px';
	document.getElementById('BottomMsg').style.bottom='0px';
	document.getElementById('lashen_content').innerHTML=lashen_title;
 }
function lashen_showMsg(str) {
	var s="";
	var _width="100%";_height="30";
	try{
		if(document.compatMode && document.compatMode != 'BackCompat'){
			s+=('<div style="z-index:9;left:0px;bottom:0px;height:'+_height+'px;width:'+_width+';overflow:hidden;position:fixed;'+(/MSIE 7|MSIE 8/.test(navigator.appVersion)?'':'_position:absolute; _margin-top:expression(document.documentElement.clientHeight-this.style.pixelHeight+document.documentElement.scrollTop);')+'" id="BottomMsg">');
		}else {
			s+=('<div style="z-index:9;left:0px;bottom:0px;height:'+_height+'px;width:'+_width+';overflow:hidden;position:fixed;*position:absolute;*top:expression(eval(document.body.scrollTop)+eval(document.body.clientHeight)-this.style.pixelHeight);" id="BottomMsg" >');
		}
		s+=(str);
		s+=('</div>');
		document.getElementById('tmpMsgDiv').innerHTML = s;
	}catch(err){}
}
lashen_showMsg('<div  id=lashen_content  style=" background:#494949;line-height:30px; height:100%;width:100%" >'+lashen_title+'</div>');