var data = {};

var dataPool = {};
app.dataPool = dataPool;

dataPool.body = function (status, area) {
    data.account = app.localSettings.account;
    data.ownedWeibo = app.localSettings.ownedWeibo;
    data.time = {};
    data.serverUrl = app.serverUrl;
    data.appkey="2445517113";
    data.callbackUrl="http://www.weibo.com/oauth/callback";//http://offline.wlm1001.com/oauth/callback

    data.faceTitles = ["笑哈哈", "得意地笑", "转发", "江南style", "偷乐", "bm可爱", "gst耐你", "lt切克闹", "moc转发", "BOBO爱你", "ppb鼓掌", "ppb愚人节", "草泥马", "神马", "浮云", "给力", "围观", "威武", "熊猫", "兔子", "奥特曼", "囧", "互粉", "礼物", "呵呵", "嘻嘻", "哈哈", "可爱", "可怜", "挖鼻屎", "吃惊", "害羞", "挤眼", "闭嘴", "鄙视", "爱你", "泪", "偷笑", "亲亲", "生病", "太开心", "懒得理你", "右哼哼", "左哼哼", "嘘", "衰", "委屈", "吐", "打哈欠", "抱抱", "怒", "疑问", "馋嘴", "拜拜", "思考", "汗", "困", "睡觉", "钱", "失望", "酷", "花心", "哼", "鼓掌", "晕", "悲伤", "抓狂", "黑线", "阴险", "怒骂", "心", "伤心", "猪头", "ok", "耶", "good", "不要", "赞", "来", "弱", "蜡烛", "钟", "话筒", "蛋糕"];
    data.postlist = {"0": {"id": "很破滴一口钟1365321734637", "time": "2013/04/07 18:45:00", "status": "published", "text": "夺去夺在", "pid": "none", "weibo_user": "很破滴一口钟", "remainTime": 6120}, "1": {"id": "很破滴一口钟1365321722141", "time": "2013/04/07 17:03:00", "status": "publishing", "text": "夺去夺  夺去夺  夺去夺", "pid": "none", "weibo_user": "很破滴一口钟"}, "2": {"id": "很破滴一口钟1365302946297", "time": "2013/04/07 10:49:16", "status": "failed", "text": "1", "pid": "none", "weibo_user": "很破滴一口钟"}, "3": {"id": "很破滴一口钟1365302946297", "time": "2013/04/07 10:49:16", "status": "timeout", "text": "1", "pid": "none", "weibo_user": "很破滴一口钟"}, "4": {"id": "很破滴一口钟1365302946297", "time": "2013/04/07 10:49:16", "status": "exception", "text": "1", "pid": "none", "weibo_user": "很破滴一口钟"}}
    data.statusList = "mine";//mine or friends
    data.list = "post";//post or forward
    data.statuses = {};
};

dataPool.owned_weibo = function (next) {
    $.ajax({
        data: {"account": app.localSettings.account},
        type: 'GET',
        url: ("http://" + app.serverUrl + "/api2/accountownedweibo/getall"),
        success: function (serverData) {
            app.localSettings.ownedWeibo = serverData;
            data.ownedWeibo = app.localSettings.ownedWeibo;

            for (var ownedWeibo in app.localSettings.ownedWeibo.ownedWeiboList) {
                app.localSettings.ownedWeibo.currentWeibo = ownedWeibo;
                break;
            }
            next(serverData);
        }
    });
};


dataPool.main_offline_post_list = function (next) {
    $.ajax({
        data: {
            "weibo_user": app.localSettings.ownedWeibo.currentWeibo,
            "start": 0,
            "end": -1
        },
        type: 'GET',
        url: ("http://" + app.serverUrl + "/api2/getpostlist/a"),
        success: function (serverData) {
            data.postlist = serverData;
            next(serverData);
        }
    });
};

dataPool.main_offline_forward_list = function (next) {
    $.ajax({
        data: {
            "weibo_user": app.localSettings.ownedWeibo.currentWeibo,
            "start": 0,
            "end": -1
        },
        type: 'GET',
        url: ("http://" + app.serverUrl + "/api2/getforwardlist/a"),
        success: function (serverData) {
            data.postlist = serverData;
            next(serverData);
        }
    });


};


dataPool.time = function (localDataBind, next) {
    if (localDataBind == "publish") {
        next(app.time);
    }
    else if (localDataBind == "forward") {
        next(app.forwardTime);
    }
    else {
        data.time[localDataBind] = new Time(data.postlist[localDataBind].time);
        next(data.time[localDataBind]);
    }
};

dataPool.main_forward = function (next) {
    var url;
    if (data.statusList == "mine") {
        url = "2/statuses/user_timeline.json";
    }
    else if (data.statusList = "friends") {
        url = "2/statuses/friends_timeline.json";
    }
    $.ajax({
        data: {
            url: url,
            screen_name: app.localSettings.ownedWeibo.currentWeibo,
            abc: "abc@163.com",
            efg: {a: 1, b: 2, c: {a: 1, b: 2}}
        },
        type: 'POST',
        url: ("http://" + app.serverUrl + "/api2/weiboInterface/weibo"),
        success: function (serverData) {

            data.statuses = serverData.statuses;
            next();
        }
    });


};