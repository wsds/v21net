var data = {};

var dataPool = {};
app.dataPool = dataPool;
dataPool.body = function (status, area) {
    data.account = app.localSettings.account;
    data.ownedWeibo = app.localSettings.ownedWeibo;
    data.time = {};
    data.serverUrl = app.serverUrl;
    data.faceTitles = ["笑哈哈", "得意地笑", "转发", "江南style", "偷乐", "bm可爱", "gst耐你", "lt切克闹", "moc转发", "BOBO爱你", "ppb鼓掌", "ppb愚人节", "草泥马", "神马", "浮云", "给力", "围观", "威武", "熊猫", "兔子", "奥特曼", "囧", "互粉", "礼物", "呵呵", "嘻嘻", "哈哈", "可爱", "可怜", "挖鼻屎", "吃惊", "害羞", "挤眼", "闭嘴", "鄙视", "爱你", "泪", "偷笑", "亲亲", "生病", "太开心", "懒得理你", "右哼哼", "左哼哼", "嘘", "衰", "委屈", "吐", "打哈欠", "抱抱", "怒", "疑问", "馋嘴", "拜拜", "思考", "汗", "困", "睡觉", "钱", "失望", "酷", "花心", "哼", "鼓掌", "晕", "悲伤", "抓狂", "黑线", "阴险", "怒骂", "心", "伤心", "猪头", "ok", "耶", "good", "不要", "赞", "来", "弱", "蜡烛", "钟", "话筒", "蛋糕"];
    data.postlist = {"0": {"id": "很破滴一口钟1365321734637", "time": "2013/04/07 18:45:00", "status": "published", "text": "夺去夺在", "pid": "none", "weibo_user": "很破滴一口钟", "remainTime": 6120}, "1": {"id": "很破滴一口钟1365321722141", "time": "2013/04/07 17:03:00", "status": "publishing", "text": "夺去夺  夺去夺  夺去夺", "pid": "none", "weibo_user": "很破滴一口钟"}, "2": {"id": "很破滴一口钟1365302946297", "time": "2013/04/07 10:49:16", "status": "failed", "text": "1", "pid": "none", "weibo_user": "很破滴一口钟"}, "3": {"id": "很破滴一口钟1365302946297", "time": "2013/04/07 10:49:16", "status": "timeout", "text": "1", "pid": "none", "weibo_user": "很破滴一口钟"}, "4": {"id": "很破滴一口钟1365302946297", "time": "2013/04/07 10:49:16", "status": "exception", "text": "1", "pid": "none", "weibo_user": "很破滴一口钟"}}
    data.statusList = "mine";//mine or friends
    data.statuses = {};
};