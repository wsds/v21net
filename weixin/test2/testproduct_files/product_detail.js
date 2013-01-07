 //大画幅
var product_dhf="";
//顶部通栏
var product_top="";
//查看全部点评下通栏
var commentbtn_smallhf="";
//首条点评上方横幅
var product_commenttop_hf="";
//logo旁横幅
var product_banner="<a href=http://comment.kimiss.com/  target=_blank><img src='http://statics2.kimiss.com/upload/userfiles/image/2011-01/03/1294020613060937600.jpg' width=728 height=90 border=0></a>";
//产品图片上横幅
var product_pictop="";
//看看哪儿能买到它下图片
var product_daogou_smallhf="";
//推荐购买，产品简介下推荐
var product_tjgm_smallbutton="";
/////////////////////////////////////
//jpg or gif
//product_dhf+="<a href=http://click.kimiss.com/sitetools/click.php?aid=310 target=_blank title='EL睫毛膏'><img src=http://statics2.kimiss.com/upload/userfiles/image/2011-08/06/1312590526046875100.jpg border=0></a>";
//product_dhf+="<a href=http://click.kimiss.com/sitetools/click.php?aid=608 target=_blank title='丝芙兰欣蔓'><img src=http://statics1.kimiss.com/upload/userfiles/image/2011-10/17/1318813256016756800.jpg border=0></a>";
//product_dhf+="<a href=http://click.kimiss.com/sitetools/click.php?aid=241 target=_blank><img src=http://statics1.kimiss.com/upload/userfiles/image/2011-08/11/1313024602056250100.jpg border=0></a>";
//product_dhf+="<a href=http://click.kimiss.com/sitetools/click.php?aid=283 target=_blank title=梦妆><img src=http://statics1.kimiss.com/upload/userfiles/image/2011-08/27/1314405109012500100.jpg border=0></a>";
//product_dhf+="<a href=http://click.kimiss.com/sitetools/click.php?aid=500 title=2345导航 target=_blank><img src=http://statics1.kimiss.com/upload/userfiles/image/2011-08/09/1312852470028125100.jpg border=0></a>";
//swf
//product_dhf+="<div style='width:300px;overflow:hidden;position:relative'><a href='http://e.cn.miaozhen.com/r.gif?%5Ek=1000832%5Ep=3xXYc0%5Eo=http://ju.atpanel.com/?url=http://www.tmall.com/go/act/tmall/yqy.php?ad_id=100071658076bbde4bbf&am_id=&cm_id=1400716558fe0ee7615d&pm_id=' target='_blank' title='淘宝'><img src='http://statics1.kimiss.com/images/2008/spacer.gif' style='position:absolute;left:0px;top:0px;border:none;width:300px; height:250px;' /><embed  src='http://statics1.kimiss.com/upload/userfiles/image/2012-02/16/1329354674076774700.swf' quality='high' wmode='opaque' width='300' height='250' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' ></embed></a></div>";
//product_dhf+="<a href=http://click.kimiss.com/sitetools/click.php?aid=439 target=_blank title='卓越'><img src=http://statics1.kimiss.com/upload/userfiles/image/2011-12/12/1323651477095587900.jpg border=0></a>";

//product_dhf+="<br/><a href=http://click.kimiss.com/sitetools/click.php?aid=696 target=_blank title='阿芙'><img src=http://statics1.kimiss.com/upload/userfiles/image/2011-12/26/1324861368055980800.jpg border=0></a>";
//product_dhf+="<br/><a href=http://click.kimiss.com/sitetools/click.php?aid=697 target=_blank title='洋马头'><img src=http://statics2.kimiss.com/upload/userfiles/image/2011-12/22/1324517967061438700.jpg border=0></a>";
//product_dhf+="<div style='width:300px;overflow:hidden;position:relative'><a href='http://click.kimiss.com/sitetools/click.php?aid=638' target='_blank' title='淘宝'><img src='http://statics1.kimiss.com/images/2008/spacer.gif' style='position:absolute;left:0px;top:0px;border:none;width:300px; height:250px;' /><embed  src='http://statics2.kimiss.com/upload/userfiles/image/2011-11/24/1322096842019375000.swf' quality='high' wmode='opaque' width='300' height='250' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' ></embed></a></div>";
//product_dhf+="<br/><a href='http://click.kimiss.com/sitetools/click.php?aid=650'  target='_blank' title='凡客'><img src='http://statics2.kimiss.com/upload/userfiles/image/2011-11/29/1322528600020636500.jpg' border='0'></a>";
//product_dhf+="<div style='width:300px;overflow:hidden;position:relative'><a href='http://click.kimiss.com/sitetools/click.php?aid=650' target='_blank' title='凡客'><img src='http://statics1.kimiss.com/images/2008/spacer.gif' style='position:absolute;left:0px;top:0px;border:none;width:300px; height:250px;' /><embed  src='http://statics1.kimiss.com/upload/userfiles/image/2011-11/17/1321492911034331800.swf' quality='high' wmode='opaque' width='300' height='250' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' ></embed></a></div>";
//product_dhf+="<div style='width:300px;overflow:hidden;position:relative'><a href='http://click.kimiss.com/sitetools/click.php?aid=593' target='_blank' title='仁爱'><img src='http://statics1.kimiss.com/images/2008/spacer.gif' style='position:absolute;left:0px;top:0px;border:none;width:300px; height:250px;' /><embed  src='http://statics1.kimiss.com/upload/userfiles/image/2012-01/12/1326330186064569800.swf' quality='high' wmode='opaque' width='300' height='250' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' ></embed></a></div>";

//product_banner="<div style='width:728px;overflow:hidden;position:relative'><a href='http://click.kimiss.com/sitetools/click.php?aid=692' target='_blank' title='娃哈哈'><img src='http://statics1.kimiss.com/images/2008/spacer.gif' style='position:absolute;left:0px;top:0px;border:none;width:728px; height:90px;' /><embed  src='http://statics1.kimiss.com/upload/userfiles/image/2011-12/21/1324430344078649400.swf' quality='high' wmode='opaque' width='728' height='90' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' ></embed></a></div>";
product_banner="<div style='width:728px;overflow:hidden;position:relative'><a href='http://click.admaster.com.cn/click.php?a=1735&b=10011&c=1006&i=100&h=&sa=&sb=&sc=' target='_blank' title='EL'><img src='http://statics1.kimiss.com/images/2008/spacer.gif' style='position:absolute;left:0px;top:0px;border:none;width:728px; height:90px;' /><embed  src='http://statics1.kimiss.com/upload/userfiles/image/2012-01/05/1325730143058515000.swf' quality='high' wmode='opaque' width='728' height='90' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' ></embed></a></div>";
//product_dhf+="<div style='width:300px;overflow:hidden;position:relative'><a href='http://click.kimiss.com/sitetools/click.php?aid=565' target='_blank' title='Nala'><img src='http://statics1.kimiss.com/images/2008/spacer.gif' style='position:absolute;left:0px;top:0px;border:none;width:300px; height:250px;' /><embed  src='http://statics2.kimiss.com/upload/userfiles/image/2011-09/12/1315787501055362200.swf' quality='high' wmode='opaque' width='300' height='250' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' ></embed></a></div>";
//product_dhf+="<a href=http://click.kimiss.com/sitetools/click.php?aid=320 title=芳草集 target=_blank><img src=http://statics2.kimiss.com/upload/userfiles/image/2011-09/12/1315787233051282500.jpg border=0></a>";
//product_dhf+="<a href=http://click.kimiss.com/sitetools/click.php?aid=452 title=打折网 target=_blank><img src=http://statics1.kimiss.com/upload/userfiles/image/2011-12/16/1323997388062776800.jpg border=0></a>";

 ////////////////////////////////////
//product_banner+="<a href=http://click.kimiss.com/sitetools/click.php?aid=195 target=_blank><img src='http://statics1.kimiss.com/upload/userfiles/image/2010-12/02/1291243663001562600.jpg' width=728 height=90 border=0></a>"; 

//product_top="<div style='width:950px;overflow:hidden;position:relative'><a href='http://click.kimiss.com/sitetools/click.php?aid=617' target='_blank' title='淘宝'><img src='http://statics1.kimiss.com/images/2008/spacer.gif' style='position:absolute;left:0px;top:0px;border:none;width:950px; height:90px;' /><embed  src='http://statics2.kimiss.com/upload/userfiles/image/2011-12/11/1323609322036621100.swf' quality='high' wmode='opaque' width='950' height='90' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' ></embed></a></div>";
//product_top="<div style='width:950px;overflow:hidden;position:relative'><a href='http://click.kimiss.com/sitetools/click.php?aid=130' target='_blank' title='娇兰'><img src='http://statics1.kimiss.com/images/2008/spacer.gif' style='position:absolute;left:0px;top:0px;border:none;width:950px; height:90px;' /><embed  src='http://statics2.kimiss.com/upload/userfiles/image/2011-08/23/1314058227057812600.swf' quality='high' wmode='opaque' width='950' height='90' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' ></embed></a></div>";
//product_top="<div style='width:950px;overflow:hidden;position:relative'><a href='http://click.admaster.com.cn/click.php?a=1735&b=10036&c=1006&i=100&h=&sa=&sb=&sc=' target='_blank' title='EL'><img src='http://statics1.kimiss.com/images/2008/spacer.gif' style='position:absolute;left:0px;top:0px;border:none;width:950px; height:90px;' /><embed  src='http://statics1.kimiss.com/upload/userfiles/image/2012-01/05/1325730182054543500.swf' quality='high' wmode='opaque' width='950' height='90' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' ></embed></a></div>";
//commentbtn_smallhf+="<div style='width:670px;overflow:hidden;position:relative'><a href='http://click.kimiss.com/sitetools/click.php?aid=336' target='_blank' title='仁爱'><img src='http://statics1.kimiss.com/images/2008/spacer.gif' style='position:absolute;left:0px;top:0px;border:none;width:670px; height:70px;' /><embed  src='http://statics2.kimiss.com/upload/userfiles/image/2012-01/03/1325604000099046400.swf' quality='high' wmode='opaque' width='670' height='70' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' ></embed></a></div>";
//commentbtn_smallhf+="<div style='width:650px;overflow:hidden;position:relative'><a href='http://click.kimiss.com/sitetools/click.php?aid=330' target='_blank' title='天大'><img src='http://statics1.kimiss.com/images/2008/spacer.gif' style='position:absolute;left:0px;top:0px;border:none;width:650px; height:70px;' /><embed  src='http://statics1.kimiss.com/upload/userfiles/image/2012-01/03/1325553716039928700.swf' quality='high' wmode='opaque' width='650' height='70' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' ></embed></a></div>";
//product_commenttop_hf="<div style='width:640px;overflow:hidden;position:relative'><a href='http://www.tsubakichina.com/events/index.aspx?sourceId=6' target='_blank' title='丝蓓绮'><img src='http://statics1.kimiss.com/images/2008/spacer.gif' style='position:absolute;left:0px;top:0px;border:none;width:640px; height:68px;' /><embed  src='http://statics2.kimiss.com/upload/userfiles/image/2012-01/06/1325812292030459100.swf' quality='high' wmode='opaque' width='640' height='68' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' ></embed></a></div>";
//product_commenttop_hf="<div style='width:640px;overflow:hidden;position:relative'><a href='http://click.kimiss.com/sitetools/click.php?aid=330' target='_blank' title='天大'><img src='http://statics1.kimiss.com/images/2008/spacer.gif' style='position:absolute;left:0px;top:0px;border:none;width:640px; height:68px;' /><embed  src='http://statics1.kimiss.com/upload/userfiles/image/2012-01/12/1326330212098630200.swf' quality='high' wmode='opaque' width='640' height='68' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' ></embed></a></div>";
//product_commenttop_hf="<div style='width:640px;overflow:hidden;position:relative'><a href='http://click.kimiss.com/sitetools/click.php?aid=595' target='_blank' title='牛尔'><img src='http://statics1.kimiss.com/images/2008/spacer.gif' style='position:absolute;left:0px;top:0px;border:none;width:640px; height:68px;' /><embed  src='http://statics1.kimiss.com/upload/userfiles/image/2011-10/24/1319423519057300500.swf' quality='high' wmode='opaque' width='640' height='68' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' ></embed></a></div>";
//product_commenttop_hf="<div style='width:640px;overflow:hidden;position:relative'><a href='http://click.kimiss.com/sitetools/click.php?aid=642' target='_blank' title='兰芝'><img src='http://statics1.kimiss.com/images/2008/spacer.gif' style='position:absolute;left:0px;top:0px;border:none;width:640px; height:68px;' /><embed  src='http://statics1.kimiss.com/upload/userfiles/image/2011-11/05/1320457034029354900.swf' quality='high' wmode='opaque' width='640' height='68' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' ></embed></a></div>";

//////////////////////////////////////
//product_pictop+="<a href='http://click.kimiss.com/sitetools/click.php?aid=504' target='_blank' title='2345'><img src='http://statics1.kimiss.com/upload/userfiles/image/2011-08/23/1314057295029687600.jpg' width='670' height='70' ></a>";

////////product_daogou_smallhf//////////////////////
//urlencode在js中怎么用
//product_daogou_smallhf="<div style='width:167px;overflow:hidden;position:relative'><a href='http://click.kimiss.com/sitetools/click.php?aid=594' target='_blank' title='牛尔'><img src='http://statics1.kimiss.com/images/2008/spacer.gif' style='position:absolute;left:0px;top:0px;border:none;width:167px; height:98px;' /><embed  src='http://statics2.kimiss.com/upload/userfiles/image/2011-10/19/1318995483000460500.swf' quality='high' wmode='opaque' width='167' height='98' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' ></embed></a></div>";
//product_daogou_smallhf+="<a href='http://click.kimiss.com/sitetools/click.php?aid=517' class='linkhui' target='_blank'><img src=http://statics1.kimiss.com/upload/userfiles/image/2011-08/18/1313628536067187700.jpg border=0></a>";
///////////////////////////////////////

product_tjgm_smallbutton+="<a href='http://click.kimiss.com/sitetools/click.php?aid=525' class='linkhui' target='_blank'><img src=http://statics2.kimiss.com/upload/userfiles/image/2012-03/05/1330915731022811400.jpg border=0></a>";
//////////
function showhtml_ad(position)
{
	 global_html=eval(position);	
	 try
	 {
		 document.write(global_html);
	 }
	 catch (e) 
	 {
		document.write(global_html);
	 }
}