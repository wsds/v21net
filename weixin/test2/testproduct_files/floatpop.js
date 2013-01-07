<!-- 
  ac_as_id = 41644;
  ac_click_track_url = "";
  ac_format = 0;
  ac_mode = 1;
  ac_width = 280;
  ac_height = 210;
// -->
function SetCookie(name,value,days)//两个参数，一个是cookie的名子，一个是值
{
    var Days = days; //此 cookie 将被保存 30 天
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+';domain='+document.domain+"; path="+'/';
}
function getCookie(name)//取cookies函数        
{
   var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
   if(arr != null) return unescape(arr[2]); return null;
}
day = new Date().getDay();
 


if(getCookie("kimiss_yichuanmeitv")==null)
{
    //SetCookie("kimiss_yichuanmeitv","1",1);   
  	//document.writeln("<script type='text\/javascript' src='http:\/\/static.acs86.com\/g.js'><\/script>");
}
else if(getCookie("kimiss_ifocusitv")==null )
{      
    ///SetCookie("kimiss_ifocusitv","1",1);
    //document.writeln("<script src='http:\/\/cast.ra.icast.cn\/p\/?id=2610'><\/script>");
   // document.writeln("<script type='text\/javascript' src='http:\/\/static.acs86.com\/g.js'><\/script>");
    
 
}
else if(getCookie("kimiss_othertv")==null )
{
SetCookie("kimiss_othertv","1",1);
   
   //	document.writeln("<script type='text\/javascript' src='http:\/\/static.acs86.com\/g.js'><\/script>");
  //http:\/\/cast.ra.icast.cn\/p\/?id=2610
  //document.writeln("<script src='http:\/\/cast.ra.icast.cn\/p\/?id=2610'><\/script>");
    //document.writeln("<script type='text\/javascript' src='http:\/\/amps.yoyi.com.cn\/amp\/DisplayAd?pid=230B30&sid=C23CA4'><\/script>");
    var now=new Date();
    var number = now.getSeconds() ;
    if(number>30)
    {
    //document.writeln("<script src='http:\/\/cast.ra.icast.cn\/p\/?id=2610'><\/script>");
    }
    else
    {
    //ocument.writeln("<script type='text\/javascript' src='http:\/\/static.acs86.com\/g.js'><\/script>");
    }

 
}