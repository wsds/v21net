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
	//var str = "<div class='login'>»¶Ó­Äú,<span> <a href=http://9night.kimiss.com/home.php?mod=space"+uname+">"+uname+"</a></span>&nbsp;&nbsp;[<a href=http://9night.kimiss.com/api.php?mod=ul&referer"+referurl+" target='_self'>ÍË³öµÇÂ¼</a>]</div>";
	var str = "ÃÛ£¬"+uname+"£¬»¶Ó­»ØÀ´£¡<span><a href='http://9night.kimiss.com/home.php?mod=space"+uname+"'>ÎÒµÄ¹ë·¿</a>|<a href='http://so.kimiss.com'>·¢µãÆÀ</a>|<a href='http://9night.kimiss.com/forum.php'>Ğ´Íí¾Åµã</a>|<a href='http://9night.kimiss.com/api.php?mod=ul&referer"+referurl+"' target='_self'>ÍË³ö</a></span>";
} else {
	//var str = '<div class="login"><a href="http://9night.kimiss.com/member.php?mod=logging&action=login&referer='+referurl+'" target="_self">[ÇëµÇÂ¼]</a> '+
	//'<a href="http://9night.kimiss.com/member.php?mod=register&referer='+referurl+'" target="_self">[Çë×¢²á]</a></div>';
	var str = "<span><a href='http://9night.kimiss.com/member.php?mod=logging&amp;action=login'>µÇÂ¼</a><a href='http://9night.kimiss.com/member.php?mod=logging&action=login&viewlostpw=1'>ÕÒ»ØÃÜÂë</a><a href='http://bbs.onlylady.com/plugin.php?id=bbsconnect:bbsconnectlogin'>ÓÃOnlyladyÕËºÅµÇÂ¼</a><a href='http://9night.kimiss.com/connect.php?mod=login&amp;op=init&amp;referer=forum.php&amp;statfrom=login_simple'>QQµÇÂ¼</a><a class='xi2 xw1 reg' href='http://9night.kimiss.com/member.php?mod=register'>Á¢¼´×¢²á</a></span>";
}
domId("ki_com_t1_c").innerHTML=str;
