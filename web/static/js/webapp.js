var app = {};
app.serverUrl = "www.weibo.com";

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
    }
);


$(document).ready(function () {
        app.page.linkData();
        var area = $("body");
        app.eventPool["body"]("None", area);
        renderTemplate(area);
    }
);


var data = {};


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
            resolveServerData(nTemplate, function(serverData){
                $(templateContainer).html(nTemplate.render(serverData));
                app.eventPool[nTemplate.eventPool](status, templateContainer);
            })
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
    nTemplate.serverData = $(templateDiv).attr("serverData");
    return nTemplate;
}


function resolveServerData(nTemplate, next) {
    if (nTemplate.serverData == null) {
        next(null);
    }
    else {
        app.dataPool[nTemplate.serverData](next);
    }
}