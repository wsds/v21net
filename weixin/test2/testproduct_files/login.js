function domId(A) {
	return document.getElementById(A)
}
function getCookieLogin(C) {
	
	var D=document.cookie.indexOf(C+"=");
	var A=D+C.length+1;
	if((!D)&&(C!=document.cookie.substring(0,C.length))) {
		return null
	}
	if(D==-1) {
		return null
	}
	var B=document.cookie.indexOf(";",A);
	if(B==-1) {
		B=document.cookie.length
	}
	return decodeURIComponent(document.cookie.substring(A,B));
}
var uname=getCookieLogin("j_c_usernick");
var referurl = encodeURIComponent(location.href);
if(uname) {
	//var str = "<div class='login'>��ӭ��,<span> <a href=http://9night.kimiss.com/home.php?mod=space"+uname+">"+uname+"</a></span>&nbsp;&nbsp;[<a href=http://9night.kimiss.com/api.php?mod=ul&referer"+referurl+" target='_self'>�˳���¼</a>]</div>";
	var str = "�ۣ�"+uname+"����ӭ������<span><a href='http://9night.kimiss.com/home.php?mod=space"+uname+"'>�ҵĹ뷿</a>|<a href='http://so.kimiss.com'>������</a>|<a href='http://9night.kimiss.com/forum.php'>д��ŵ�</a>|<a href='http://9night.kimiss.com/api.php?mod=ul&referer"+referurl+"' target='_self'>�˳�</a></span>";
} else {
	//var str = '<div class="login"><a href="http://9night.kimiss.com/member.php?mod=logging&action=login&referer='+referurl+'" target="_self">[���¼]</a> '+
	//'<a href="http://9night.kimiss.com/member.php?mod=register&referer='+referurl+'" target="_self">[��ע��]</a></div>';
	var str = "<span><a href='http://9night.kimiss.com/member.php?mod=logging&amp;action=login'>��¼</a><a href='http://9night.kimiss.com/member.php?mod=logging&action=login&viewlostpw=1'>�һ�����</a><a href='http://bbs.onlylady.com/plugin.php?id=bbsconnect:bbsconnectlogin'>��Onlylady�˺ŵ�¼</a><a href='http://9night.kimiss.com/connect.php?mod=login&amp;op=init&amp;referer=forum.php&amp;statfrom=login_simple'>QQ��¼</a><a class='xi2 xw1 reg' href='http://9night.kimiss.com/member.php?mod=register'>����ע��</a></span>";
}
domId("ki_com_t1_c").innerHTML=str;
