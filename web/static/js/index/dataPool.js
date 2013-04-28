dataPool = {};
app.dataPool = dataPool;

dataPool.body = function (status, area) {

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