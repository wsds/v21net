var app = {};

app.environment = "local";//local or server

if (app.environment == "local") {
    app.serverUrl = "www.weibo.com";
    app.appkey = "2445517113";//魔方石的诱惑
    app.callbackUrl = "http://www.weibo.com/oauth/callback";
    app.imageServerUrl = "http://images.weibo.com/";
}
else if (app.environment == "server") {
    app.serverUrl = "www.wlm1001.com";
    app.appkey = "3322737363";
    app.callbackUrl = "http://offline.wlm1001.com/oauth/callback";
    app.imageServerUrl = "http://tools.wlm1001.com/";
}

app.localSettings = {};

window.onbeforeunload = function () {
    window.localStorage.localSettings = JSON.stringify(app.localSettings);
};

function saveLocalSettings() {
    window.localStorage.localSettings = JSON.stringify(app.localSettings);
}

$(document).ready(function () {
    if (window.localStorage.localSettings != null) {
        app.localSettings = JSON.parse(window.localStorage.localSettings);
    }
});


$(document).ready(function () {
    app.page.linkData();
    var area = $("body");
    app.eventPool["body"]("None", area);
    app.dataPool["body"]("None", area);
    renderTemplate(area);
});


function renderTemplate(area) {
    var templateContainers = $(".templateContainer:not(.templateContainer .templateContainer):visible", $(area)); //选择器过于牛逼了。
    if ($(area).hasClass("templateContainer")) {
        templateContainers = templateContainers.add(area);
    }
    templateContainers.each(function () {
        var templateContainer = this;
        var template = $(templateContainer).attr("template");
        var status = $(templateContainer).attr("status");
        var localDataBind = $(templateContainer).attr("localDataBind");
        var nTemplate = getTemplate(template, status);
        if (nTemplate == null) {
            return;
        }
        resolveServerData(nTemplate, function () {
            resolveLocalData(nTemplate, localDataBind, function (localData) {
                $(templateContainer).html(nTemplate.render(localData));
                app.eventPool[nTemplate.eventPool](status, templateContainer);
                var innerTemplateContainers = $(".templateContainer", $(templateContainer));
                renderTemplate(innerTemplateContainers);
            });
        });
    });
}


function getTemplate(template, status) {
    var tenjin = nTenjin;
    var templateDiv = $(".templates .template[template='" + template + "'][status='" + status + "']")

    if (templateDiv.size() != 1) {
        return null;
    }
    var string = templateDiv.html();
    string = string.replace(/\<\!\-\-\?/g, "<?");
    string = string.replace(/\?\-\-\>/g, "?>");
    string = string.replace(/比较符号大于/g, ">");
    string = string.replace(/比较符号兄小于/g, "<");
    var nTemplate = new tenjin.Template();
    nTemplate.convert(string);
    nTemplate.eventPool = $(templateDiv).attr("eventPool");
    nTemplate.serverData = $(templateDiv).attr("serverData");
    nTemplate.localData = $(templateDiv).attr("localData");
    return nTemplate;
}


function resolveServerData(nTemplate, next) {
    if (nTemplate.serverData == null) {
        next();
    }
    else {
        app.dataPool[nTemplate.serverData](next);
    }
}

function resolveLocalData(nTemplate, localDataBind, next) {
    if (nTemplate.localData == null) {
        next(null);
    }
    else {
        app.dataPool[nTemplate.localData](localDataBind, next);
    }
}