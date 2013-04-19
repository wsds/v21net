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
}


function renderTemplate(area) {
    var templateContainers = $(".templateContainer", $(area));
    if($(area).hasClass("templateContainer")){
        templateContainers=templateContainers.add(area);
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