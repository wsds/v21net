var settings = {};

window.onbeforeunload = function () {
    window.localStorage.settings = JSON.stringify(settings);
};

function saveSettings() {
    window.localStorage.settings = JSON.stringify(settings);
}

$(document).ready(function () {
        if (window.localStorage.settings != null) {
            settings = JSON.parse(window.localStorage.settings);
        }
    }
);


$(document).ready(function () {
        linkdata();
        var area = $("body");
        renderTemplate(area);
        eventPool["body"]("None", area);
    }
);


data = {};
function linkdata() {
    data.account = "wsds";
    data.ownedWeibo = settings.ownedWeibo;
    data.serverUrl = app.serverUrl;
    data.faceTitles = ["笑哈哈", "得意地笑", "转发", "江南style", "偷乐", "bm可爱", "gst耐你", "lt切克闹", "moc转发", "BOBO爱你", "ppb鼓掌", "ppb愚人节", "草泥马", "神马", "浮云", "给力", "围观", "威武", "熊猫", "兔子", "奥特曼", "囧", "互粉", "礼物", "呵呵", "嘻嘻", "哈哈", "可爱", "可怜", "挖鼻屎", "吃惊", "害羞", "挤眼", "闭嘴", "鄙视", "爱你", "泪", "偷笑", "亲亲", "生病", "太开心", "懒得理你", "右哼哼", "左哼哼", "嘘", "衰", "委屈", "吐", "打哈欠", "抱抱", "怒", "疑问", "馋嘴", "拜拜", "思考", "汗", "困", "睡觉", "钱", "失望", "酷", "花心", "哼", "鼓掌", "晕", "悲伤", "抓狂", "黑线", "阴险", "怒骂", "心", "伤心", "猪头", "ok", "耶", "good", "不要", "赞", "来", "弱", "蜡烛", "钟", "话筒", "蛋糕"];
}


function renderTemplate(area) {
    var templateContainers = $(".templateContainer", $(area));
    if ($(area).hasClass("templateContainer")) {
        templateContainers = templateContainers.add(area);
    }
    templateContainers.each(function () {
            var templateContainer = this;
            var template = $(templateContainer).attr("template");
            var status = $(templateContainer).attr("status");
            var nTemplate = getTemplate(template, status);
            if (nTemplate == null) {
                return;
            }
            $(templateContainer).html(nTemplate.render());
            console.log(nTemplate.eventPool);
            eventPool[nTemplate.eventPool](status, templateContainers);
        }
    );
}


function getTemplate(template, status) {
    var tenjin = nTenjin;
    var templateDiv = $(".templates [template='" + template + "'][status='" + status + "']")

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
    return nTemplate;
}