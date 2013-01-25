STK.register("common.listener", function(a) {
    var b = {}, c = {};
    c.define = function(c, d) {
        if (b[c] != null)
            throw "common.listener.define: 频道已被占用";
        b[c] = d;
        var e = {};
        e.register = function(d, e) {
            if (b[c] == null)
                throw "common.listener.define: 频道未定义";
            a.listener.register(c, d, e)
        };
        e.fire = function(d, e) {
            if (b[c] == null)
                throw "commonlistener.define: 频道未定义";
            a.listener.fire(c, d, e)
        };
        e.remove = function(b, d) {
            a.listener.remove(c, b, d)
        };
        e.cache = function(b) {
            return a.listener.cache(c, b)
        };
        return e
    };
    return c
});
STK.register("common.channel.topTip", function(a) {
    var b = ["refresh", "readed", "currentGroup", "unread", "apps", "dm", "dmConnected", "dmOpenIm"];
    return a.common.listener.define("common.channel.topTip", b)
});
STK.register("common.channel.feed", function(a) {
    var b = ["forward", "publish", "comment", "delete", "refresh", "reply", "feedTagUpdate", "feedTagMoreUpdate", "qfaceAdd", "qfaceCount"];
    return a.common.listener.define("common.channel.feed", b)
});
STK.register("kit.dom.parseDOM", function(a) {
    return function(a) {
        for (var b in a)
            a[b] && a[b].length == 1 && (a[b] = a[b][0]);
        return a
    }
});
STK.register("kit.extra.language", function(a) {
    window.$LANG || (window.$LANG = {});
    return function(b, c) {
        var d = a.core.util.language(b, $LANG);
        d = d.replace(/\\}/ig, "}");
        c && (d = a.templet(d, c));
        return d
    }
});
STK.register("kit.dom.parentElementBy", function(a) {
    return function(a, b, c) {
        if (!a || !b)
            throw new Error("传入的参数为空");
        var d = 0, e;
        a = a.parentNode;
        while (a && a.parentNode) {
            d++;
            e = c(a);
            if (e === !1)
                return !1;
            if (e === !0)
                return a;
            if (e === b)
                return null;
            a = a.parentNode;
            if (d > 3e4)
                return !1
        }
        return null
    }
});
STK.register("kit.dom.textSelection", function(a) {
    return function(b, c) {
        var d, e;
        d = {};
        e = a.parseParam({}, c);
        var f = function(c) {
            return a.core.dom.selectText(b, c)
        }, g = function() {
            b.__areaQuery = a.jsonToQuery(a.core.dom.textSelectArea(b))
        }, h = function() {
            b.__areaQuery = !1
        };
        a.addEvent(b, "beforedeactivate", g);
        a.addEvent(b, "active", h);
        var i = function() {
            var c = null;
            try {
                c = a.core.dom.textSelectArea(b)
            } catch (d) {
                c = a.queryToJson(b.__areaQuery)
            }
            c.start === 0 && c.len === 0 && b.__areaQuery && (c = a.queryToJson(b.__areaQuery));
            c.start = parseInt(c.start, 10);
            c.len = parseInt(c.len, 10);
            return c
        }, j = function(a, c) {
            var d = b.value, e = c.start, f = c.len || 0, g = d.slice(0, e), h = d.slice(e + f, d.length);
            b.value = g + a + h;
            d = null;
            g = null;
            h = null;
            var e = null, f = null
        };
        d.setCursor = function(a) {
            f(a)
        };
        d.getCursor = function() {
            return i()
        };
        d.insertCursor = function(a) {
            var b = i();
            j(a, b);
            b.len = a.length;
            f(b)
        };
        d.TempletCursor = function(c) {
            var d, e, g;
            d = i();
            d.len > 0 ? e = b.value.substr(d.start, d.len) : e = "";
            g = a.templet(c, {origin: e});
            j(g, d);
            d.start = d.start + c.indexOf("#{origin");
            d.len = g.length - c.replace(/#\{[origin].+?\}/, "").length;
            f(d)
        };
        d.insertText = j;
        d.destroy = function() {
            a.removeEvent(b, "beforedeactivate", g);
            a.removeEvent(b, "active", h);
            b = null
        };
        return d
    }
});
STK.register("kit.dom.smartInput", function(a) {
    return function(b, c) {
        var d, e, f, g, h, i, j, k, l, m = "stop", n, o, p, q, r;
        d = a.parseParam({notice: "",currentClass: null,noticeClass: null,noticeStyle: null,maxLength: null,needLazyInput: !1,LazyInputDelay: 200}, c);
        e = a.cascadeNode(b);
        h = a.kit.dom.textSelection(b);
        a.custEvent.define(e, "enter");
        a.custEvent.define(e, "ctrlEnter");
        a.custEvent.define(e, "lazyInput");
        f = function() {
            d.maxLength && a.bLength(b.value) > d.maxLength && (b.value = a.leftB(b.value, d.maxLength))
        };
        o = function() {
            if (b.value === d.notice) {
                b.value = "";
                d.noticeClass != null && a.removeClassName(b, d.noticeClass)
            }
            d.currentClass != null && a.addClassName(b.parentNode, d.currentClass)
        };
        p = function() {
            if (b.value === "") {
                b.value = d.notice;
                d.noticeClass != null && a.addClassName(b, d.noticeClass)
            }
            d.currentClass != null && a.removeClassName(b.parentNode, d.currentClass)
        };
        g = function() {
            f();
            return b.value === d.notice ? "" : b.value
        };
        q = function(b) {
            b.keyCode === 13 && a.custEvent.fire(e, "enter", g())
        };
        r = function(b) {
            (b.keyCode === 13 || b.keyCode === 10) && b.ctrlKey && a.custEvent.fire(e, "ctrlEnter", g())
        };
        i = function() {
            if (m === "stop") {
                l = setInterval(k, d.LazyInputDelay);
                m = "sleep"
            }
        };
        j = function() {
            clearInterval(l);
            m = "stop"
        };
        k = function() {
            if (n === b.value)
                if (m === "weakup") {
                    a.custEvent.fire(e, "lazyInput", b.value);
                    m = "sleep"
                } else
                    m === "waiting" && (m = "weakup");
            else
                m = "waiting";
            n = b.value
        };
        if (d.needLazyInput) {
            a.addEvent(b, "focus", i);
            a.addEvent(b, "blur", j)
        }
        a.addEvent(b, "focus", o);
        a.addEvent(b, "blur", p);
        a.addEvent(b, "keyup", f);
        a.addEvent(b, "keydown", q);
        a.addEvent(b, "keydown", r);
        e.getValue = g;
        e.setValue = function(a) {
            b.value = a;
            f();
            return e
        };
        e.setNotice = function(a) {
            d.notice = a;
            return e
        };
        e.setNoticeClass = function(a) {
            d.noticeClass = a;
            return e
        };
        e.setNoticeStyle = function(a) {
            d.noticeStyle = a;
            return e
        };
        e.setMaxLength = function(a) {
            d.maxLength = a;
            return e
        };
        e.restart = function() {
            p()
        };
        e.startLazyInput = i;
        e.stopLazyInput = j;
        e.setCursor = h.setCursor;
        e.getCursor = h.getCursor;
        e.insertCursor = h.insertCursor;
        e.insertText = h.insertText;
        e.destroy = function() {
            if (d.needLazyInput) {
                a.removeEvent(b, "focus", o);
                a.removeEvent(b, "blur", p)
            }
            j();
            a.removeEvent(b, "focus", o);
            a.removeEvent(b, "blur", p);
            a.removeEvent(b, "keyup", f);
            a.removeEvent(b, "keydown", q);
            a.removeEvent(b, "keydown", r);
            a.custEvent.undefine(e, "enter");
            a.custEvent.undefine(e, "ctrlEnter");
            a.custEvent.undefine(e, "lazyInput");
            h.destroy();
            e = null
        };
        return e
    }
});
STK.register("kit.dom.simpleSearchInput", function(a) {
    return function(b, c) {
        c = a.parseParam({judge: function(a) {
                if (a.getAttribute("node-type") == "input_search")
                    return !0
            },className: "focused"}, c);
        var d = {};
        if (!a.isNode(b)) {
            d.destroy = a.funcEmpty;
            return d
        }
        a.kit.dom.smartInput(b, {notice: b.getAttribute("notice") || "",noticeClass: "input_default",maxLength: 40});
        var e = a.kit.dom.parentElementBy(b, document.body, c.judge);
        if (!a.isNode(e)) {
            d.destroy = a.funcEmpty;
            return d
        }
        var f = function() {
            a.addClassName(e, c.className)
        }, g = function() {
            a.removeClassName(e, c.className)
        };
        a.addEvent(b, "focus", f);
        a.addEvent(b, "blur", g);
        d.destroy = function() {
            a.removeEvent(b, "focus", f);
            a.removeEvent(b, "blur", g)
        };
        return d
    }
});
STK.register("common.feed.groupAndSearch.homeFeedDelegateEvent", function(a) {
    var b = a.kit.extra.language, c = b("#L{搜索关注人说的话}"), d = b("#L{查找作者、内容或标签}");
    return function(b, c, d) {
        var e = b, f = {}, g = c;
        d = d || {};
        var h = d.isBigPipe, i = e.search, j = e.keyword, k = e.simpleSearch, l = e.singleForm, m, n = function() {
            a.core.evt.preventDefault();
            return !1
        };
        a.addEvent(l, "submit", n);
        k && (m = a.kit.dom.simpleSearchInput(k));
        j && a.kit.dom.smartInput(j, {notice: j.getAttribute("notice") || "",currentClass: "S_line4",maxLength: 40});
        var o = function(b) {
            var c = a.sizzle('[action-type="simpleSearchBtn"]', l)[0];
            a.fireEvent(c, "click")
        };
        a.core.evt.hotKey.add(k, ["enter"], o);
        var p = function(b) {
            var c = a.core.evt.fixEvent(b);
            c = c.target;
            if (c.tagName.toLowerCase() == "a") {
                var d = c.getAttribute("action-type");
                d != "link" && a.core.evt.preventDefault()
            }
        };
        h && a.addEvent(e.cnt, "click", p);
        var q = a.core.evt.delegatedEvent(e.cnt);
        h && q.add("search_type", "click", function(a) {
            g.searchFilterChange.call(c, a.data.type);
            if (window.WBAD && window.WBAD.refresh) {
                var b = {rt: 2};
                window.WBAD.refresh(b)
            }
        });
        q.add("search_date", "click", function(a) {
            g.showCalendar.call(c, a.el, a.data.type);
            a.el.blur()
        });
        q.add("simpleSearchBtn", "click", function(a) {
            g.searchKeyword.call(c, h)
        });
        q.add("search_button", "click", function(a) {
            g.searchStart.call(c, h)
        });
        q.add("search_adv", "click", function(a) {
            g.advDisplayToggle.call(c, i, a.data.type)
        });
        if (h) {
            q.add("order_by_time", "click", function(a) {
                g.orderByTime.call(c, a.data)
            });
            q.add("order_by_activity", "click", function(a) {
                g.orderByActivity.call(c, a.data)
            })
        }
        q.add("order_by_smart", "click", function(a) {
            g.smartSort.call(c, a);
            if (window.WBAD && window.WBAD.refresh) {
                var b = {rt: 2};
                window.WBAD.refresh(b)
            }
        });
        q.add("smart_back_home", "click", function(a) {
            g.smartBackHome.call(c, a)
        });
        q.add("smartSortSelect", "click", function(a) {
            g.smartSortSelect.call(c, a);
            if (window.WBAD && window.WBAD.refresh) {
                var b = {rt: 2};
                window.WBAD.refresh(b)
            }
        });
        f.destroy = function() {
            a.removeEvent(l, "submit", n);
            if (!isPlaceHolderEnabled) {
                a.removeEvent(k, "focus", placeHolderFuncs.simplefocus);
                a.removeEvent(k, "blur", placeHolderFuncs.simpleblur);
                a.removeEvent(j, "focus", placeHolderFuncs.keywordfocus);
                a.removeEvent(j, "blur", placeHolderFuncs.keywordblur)
            } else {
                a.removeEvent(j, "focus", placeHolderFuncs.addLightClass);
                a.removeEvent(j, "blur", placeHolderFuncs.removeLightClass)
            }
            k && m.destroy();
            h && a.removeEvent(e.cnt, "click", p);
            q.destroy();
            a.core.evt.hotKey.remove(k, ["enter"], o)
        };
        return f
    }
});
STK.register("common.feed.groupAndSearch.template.calendar", function(a) {
    var b = '<#et userlist data><div class="selector"><select node-type="month" class="month htc_select"><#if (data.hidePastMonth)><#if (!(data.start.year == data.showDate.year&& data.currDate.month>0))><option value="0" ${data.showDate.month==0?\'selected=""\':\'\'}>#L{一月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>1)||(data.end.year == data.showDate.year&& data.currDate.month<1)))><option value="1" ${data.showDate.month==1?\'selected=""\':\'\'}>#L{二月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>2)||(data.end.year == data.showDate.year&& data.currDate.month<2)))><option value="2" ${data.showDate.month==2?\'selected=""\':\'\'}>#L{三月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>3)||(data.end.year == data.showDate.year&& data.currDate.month<3)))><option value="3" ${data.showDate.month==3?\'selected=""\':\'\'}>#L{四月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>4)||(data.end.year == data.showDate.year&& data.currDate.month<4)))><option value="4" ${data.showDate.month==4?\'selected=""\':\'\'}>#L{五月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>5)||(data.end.year == data.showDate.year&& data.currDate.month<5)))><option value="5" ${data.showDate.month==5?\'selected=""\':\'\'}>#L{六月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>6)||(data.end.year == data.showDate.year&& data.currDate.month<6)))><option value="6" ${data.showDate.month==6?\'selected=""\':\'\'}>#L{七月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>7)||(data.end.year == data.showDate.year&& data.currDate.month<7)))><option value="7" ${data.showDate.month==7?\'selected=""\':\'\'}>#L{八月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>8)||(data.end.year == data.showDate.year&& data.currDate.month<8)))><option value="8" ${data.showDate.month==8?\'selected=""\':\'\'}>#L{九月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>9)||(data.end.year == data.showDate.year&& data.currDate.month<9)))><option value="9" ${data.showDate.month==9?\'selected=""\':\'\'}>#L{十月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>10)||(data.end.year == data.showDate.year&& data.currDate.month<10)))><option value="10" ${data.showDate.month==10?\'selected=""\':\'\'}>#L{十一月}</option></#if><#if (!(data.end.year == data.showDate.year&& data.currDate.month<11))><option value="11" ${data.showDate.month==11?\'selected=""\':\'\'}>#L{十二月}</option></#if><#else><option value="0" ${data.showDate.month==0?\'selected=""\':\'\'}>#L{一月}</option><option value="1" ${data.showDate.month==1?\'selected=""\':\'\'}>#L{二月}</option><option value="2" ${data.showDate.month==2?\'selected=""\':\'\'}>#L{三月}</option><option value="3" ${data.showDate.month==3?\'selected=""\':\'\'}>#L{四月}</option><option value="4" ${data.showDate.month==4?\'selected=""\':\'\'}>#L{五月}</option><option value="5" ${data.showDate.month==5?\'selected=""\':\'\'}>#L{六月}</option><option value="6" ${data.showDate.month==6?\'selected=""\':\'\'}>#L{七月}</option><option value="7" ${data.showDate.month==7?\'selected=""\':\'\'}>#L{八月}</option><option value="8" ${data.showDate.month==8?\'selected=""\':\'\'}>#L{九月}</option><option value="9" ${data.showDate.month==9?\'selected=""\':\'\'}>#L{十月}</option><option value="10" ${data.showDate.month==10?\'selected=""\':\'\'}>#L{十一月}</option><option value="11" ${data.showDate.month==11?\'selected=""\':\'\'}>#L{十二月}</option></#if></select><select node-type="year" class="year htc_select"><#list data.years as year><option value="${year}"${(data.showDate.year==year)?\' selected=""\':""}>${year}</option></#list></select></div><ul class="weeks"><li>#L{日}</li><li>#L{一}</li><li>#L{二}</li><li>#L{三}</li><li>#L{四}</li><li>#L{五}</li><li>#L{六}</li></ul><ul class="days"><#list data.dates as list><li><#if (list!="")><#if ((data.start.year==data.showDate.year&&data.start.month==data.showDate.month&&(data.start.date<=list&&list<=data.start.max))||(data.start.year==data.showDate.year&&data.start.month<data.showDate.month)||(data.start.year<data.showDate.year&&data.showDate.year<data.end.year)||(data.showDate.year==data.end.year&&data.showDate.month<data.end.month)||(data.showDate.year==data.end.year&&data.showDate.month==data.end.month&&list<=data.end.date))><a action-type="date" href="#date" onclick="return false;" title="${data.showDate.year}-${data.showDate.month+1}-${list}"year="${data.showDate.year}" month="${data.showDate.month+1}" day="${list}"${(data.today.year==data.showDate.year&&data.today.month==data.showDate.month&&list==data.showDate.date)?\' class="day"\':\'\'}><strong>${list}</strong></a><#else>${list}</#if></#if></li></#list></ul>';
    return b
});
STK.register("kit.dom.layoutPos", function(a) {
    return function(b, c, d) {
        if (!a.isNode(c))
            throw "kit.dom.layerOutElement need element as first parameter";
        if (c === document.body)
            return !1;
        if (!c.parentNode)
            return !1;
        if (c.style.display === "none")
            return !1;
        var e, f, g, h, i, j, k;
        e = a.parseParam({pos: "left-bottom",offsetX: 0,offsetY: 0}, d);
        f = c;
        if (!f)
            return !1;
        while (f !== document.body) {
            f = f.parentNode;
            if (f.style.display === "none")
                return !1;
            j = a.getStyle(f, "position");
            k = f.getAttribute("layout-shell");
            if (j === "absolute" || j === "fixed")
                break;
            if (k === "true" && j === "relative")
                break
        }
        f.appendChild(b);
        g = a.position(c, {parent: f});
        h = {w: c.offsetWidth,h: c.offsetHeight};
        i = e.pos.split("-");
        i[0] === "left" ? b.style.left = g.l + e.offsetX + "px" : i[0] === "right" ? b.style.left = g.l + h.w + e.offsetX + "px" : i[0] === "center" && (b.style.left = g.l + h.w / 2 + e.offsetX + "px");
        i[1] === "top" ? b.style.top = g.t + e.offsetY + "px" : i[1] === "bottom" ? b.style.top = g.t + h.h + e.offsetY + "px" : i[1] === "middle" && (b.style.top = g.t + h.h / 2 + e.offsetY + "px");
        return !0
    }
});
STK.register("common.feed.groupAndSearch.include.calendar", function(a) {
    function k(a) {
        a = a || window.event;
        var c = a.target || a.srcElement, d = c.value;
        d != b.showDate.year && b.setYear(d)
    }
    function j(a) {
        a = a || window.event;
        var c = a.target || a.srcElement, d = c.value;
        d != b.showDate.month && b.setMonth(d)
    }
    function i(b) {
        var c = a.core.dom.builder(b).list;
        a.addEvent(c.year[0], "change", k);
        a.addEvent(c.month[0], "change", j);
        g.year = c.year[0];
        g.month = c.month[0]
    }
    function h() {
        g && g.year && a.removeEvent(g.year, "change", k);
        g && g.month && a.removeEvent(g.month, "change", j)
    }
    function f() {
        var a = arguments;
        this.today = this.getDefaultDate.apply(this, a);
        this.showDate = {};
        for (var b in this.today)
            this.showDate[b] = this.today[b];
        this.getKeyPoint.apply(this, a);
        this.currentDate = a[1].currentDate;
        this.getCurrentMonthInfo(a[1].hidePastMonth)
    }
    function e() {
        a.core.evt.stopEvent();
        a.core.evt.removeEvent(document.body, "click", d)
    }
    function d() {
        b.node.style.display = "none";
        c && (c.style.display = "none")
    }
    var b, c;
    f.prototype = {data: {},defaultStartDate: new Date(2009, 7, 16, 0, 0, 0, 0),solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],maxMonthDay: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],solarDays: function(a, b) {
            return b == 1 ? a % 4 == 0 && a % 100 != 0 || a % 400 == 0 ? 29 : 28 : this.solarMonth[b]
        },getDefaultDate: function() {
            var a = arguments, b, c, d, e, f = /^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/, g, h;
            if (a.length == 0)
                b = new Date;
            else if (f.test(a[0])) {
                b = a[0].match(f);
                c = b[1] * 1;
                d = b[2] * 1 - 1;
                e = b[3] * 1;
                b = new Date(c, d, e, 0, 0, 0, 0)
            } else
                a[0].constructor == Date ? b = a[0] : a.length == 3 ? b = new Date(a[0], a[1], a[2], 0, 0, 0, 0) : a[0] != "" && typeof a[0] == "string" ? b = new Date(a[0]) : b = new Date;
            h = {year: b.getFullYear(),month: b.getMonth(),date: b.getDate()};
            g = this.solarDays(h.year, h.month);
            h.max = g;
            return h
        },getKeyPoint: function() {
            var a = arguments, b = a.length, c;
            if (b > 1) {
                c = a[b - 1];
                this.start = c.start != null ? c.start : this.defaultStartDate;
                this.end = c.end != null ? c.end : new Date;
                this.callback = c.callback;
                this.source = c.source;
                this.start.toString().indexOf("-") != -1 && (this.start = this.start.replace(/-/g, "/"));
                this.end.toString().indexOf("-") != -1 && (this.end = this.end.replace(/-/g, "/"));
                this.defaultStartDate = new Date(this.start)
            } else {
                this.start = this.defaultStartDate;
                this.end = new Date
            }
            this.start = this.getDefaultDate.call(this, this.start);
            this.end = this.getDefaultDate.call(this, this.end)
        },getCurrentMonthInfo: function(b) {
            var c = this.showDate, d = c.year, e = c.month, f = c.date, g = new Date(d, e, 1, 0, 0, 0, 0);
            this.count = this.solarDays(d, e);
            this.firstWeek = g.getDay();
            var h = a.core.arr.copy(this.maxMonthDay), i = this.firstWeek == 0 ? [] : Array(this.firstWeek).join().split(",");
            i = i.concat(h.splice(0, this.count));
            var j = $CONFIG != null && $CONFIG.timeDiff != null ? $CONFIG.timeDiff : 0, k = [], l = this.defaultStartDate.getFullYear(), m = (new Date((new Date(this.end.year, this.end.month, this.end.date)).getTime() - j)).getFullYear(), n = m - l, o = 0;
            while (o <= n) {
                k.push(l + o);
                o++
            }
            this.data = {today: this.today,showDate: this.showDate,start: this.start,end: this.end,dates: i,years: k,hidePastMonth: b,currDate: this.getDefaultDate()};
            b && (this.data.isStartOrEnd = this.data.start.year == this.showDate.year || this.data.end.year == this.showDate.year);
            this.showUI()
        },showUI: function() {
            var e = a.core, f, g, j, k, l = this.getContainer();
            if (a.core.util.browser.IE6 && !c) {
                c = document.createElement("iframe");
                c.style.cssText = "visibility:visible;position:absolute;background-color:#fff;width:172px;height:147px;border:0;"
            }
            if (l == null) {
                f = a.common.feed.groupAndSearch.template.calendar;
                f = '<div node-type="calendar" class="pc_caldr">' + f + "</div>";
                g = e.util.easyTemplate(f);
                j = g(this.data).toString();
                j = a.kit.extra.language(j);
                k = e.dom.builder(j);
                a.kit.dom.layoutPos(k.list.calendar[0], this.source, {pos: "left-bottom",offsetX: 0,offsetY: 0});
                l = this.getContainer();
                b = this;
                this.delegate(l);
                a.core.evt.addEvent(document.body, "click", d)
            } else {
                f = a.common.feed.groupAndSearch.template.calendar;
                g = e.util.easyTemplate(f);
                j = g(this.data).toString();
                j = a.kit.extra.language(j);
                h();
                l.innerHTML = j;
                l.style.cssText = "display:block;";
                a.kit.dom.layoutPos(l, this.source, {pos: "left-bottom",offsetX: 0,offsetY: 0});
                l.style.display != "none" && a.core.evt.addEvent(document.body, "click", d);
                b = this;
                i(l)
            }
            c && (c.style.display = "");
            c && a.kit.dom.layoutPos(c, this.source, {pos: "left-bottom",offsetX: 0,offsetY: 0});
            this.node = l;
            a.core.evt.stopEvent()
        },getContainer: function() {
            var b = a.core.dom.sizzle('[node-type="calendar"]', document.body);
            b = b.length > 0 ? b[0] : null;
            return b
        },setYear: function(a) {
            this.showDate.year = a;
            a == this.start.year && (this.showDate.month = this.start.month);
            a == this.end.year && (this.showDate.month = this.end.month);
            this.getCurrentMonthInfo(this.data.hidePastMonth);
            this.showUI()
        },setMonth: function(a) {
            this.showDate.month = a * 1;
            this.getCurrentMonthInfo(this.data.hidePastMonth);
            this.showUI()
        },setDate: function(a) {
            a = a.replace(/(\d+)/g, function(a, b) {
                return b.length == 1 ? "0" + b : b
            });
            d();
            this.source.value = a;
            this.callback && typeof this.callback == "function" && this.callback(a)
        },delegate: function(c) {
            var d = a.core.evt.delegatedEvent(c);
            d.add("date", "click", function(a) {
                b.setDate(a.el.title)
            });
            i(c);
            a.core.evt.addEvent(c, "click", e)
        }};
    var g = {};
    return f
});
STK.register("kit.extra.reuse", function(a) {
    return function(b, c) {
        var d, e, f;
        d = a.parseParam({}, c);
        f = [];
        var g = function() {
            var a = b();
            f.push({store: a,used: !0});
            return a
        }, h = function(b) {
            a.foreach(f, function(a, c) {
                if (b === a.store) {
                    a.used = !0;
                    return !1
                }
            })
        }, i = function(b) {
            a.foreach(f, function(a, c) {
                if (b === a.store) {
                    a.used = !1;
                    return !1
                }
            })
        }, j = function() {
            for (var a = 0, b = f.length; a < b; a += 1)
                if (f[a].used === !1) {
                    f[a].used = !0;
                    return f[a].store
                }
            return g()
        };
        e = {};
        e.setUsed = h;
        e.setUnused = i;
        e.getOne = j;
        e.getLength = function() {
            return f.length
        };
        return e
    }
});
STK.register("ui.mod.layer", function(a) {
    var b = function(a) {
        var b = {};
        if (a.style.display == "none") {
            a.style.visibility = "hidden";
            a.style.display = "";
            b.w = a.offsetWidth;
            b.h = a.offsetHeight;
            a.style.display = "none";
            a.style.visibility = "visible"
        } else {
            b.w = a.offsetWidth;
            b.h = a.offsetHeight
        }
        return b
    }, c = function(c, d) {
        d = d || "topleft";
        var e = null;
        if (c.style.display == "none") {
            c.style.visibility = "hidden";
            c.style.display = "";
            e = a.core.dom.position(c);
            c.style.display = "none";
            c.style.visibility = "visible"
        } else
            e = a.core.dom.position(c);
        if (d !== "topleft") {
            var f = b(c);
            if (d === "topright")
                e.l = e.l + f.w;
            else if (d === "bottomleft")
                e.t = e.t + f.h;
            else if (d === "bottomright") {
                e.l = e.l + f.w;
                e.t = e.t + f.h
            }
        }
        return e
    };
    return function(d) {
        var e = a.core.dom.builder(d), f = e.list.outer[0], g = e.list.inner[0], h = a.core.dom.uniqueID(f), i = {}, j = a.core.evt.custEvent.define(i, "show");
        a.core.evt.custEvent.define(j, "hide");
        var k = null;
        i.show = function() {
            f.style.display = "";
            a.core.evt.custEvent.fire(j, "show");
            return i
        };
        i.hide = function() {
            f.style.display = "none";
            a.custEvent.fire(j, "hide");
            return i
        };
        i.getPosition = function(a) {
            return c(f, a)
        };
        i.getSize = function(a) {
            if (a || !k)
                k = b.apply(i, [f]);
            return k
        };
        i.html = function(a) {
            a !== undefined && (g.innerHTML = a);
            return g.innerHTML
        };
        i.text = function(b) {
            b !== undefined && (g.innerHTML = a.core.str.encodeHTML(b));
            return a.core.str.decodeHTML(g.innerHTML)
        };
        i.appendChild = function(a) {
            g.appendChild(a);
            return i
        };
        i.getUniqueID = function() {
            return h
        };
        i.getOuter = function() {
            return f
        };
        i.getInner = function() {
            return g
        };
        i.getParentNode = function() {
            return f.parentNode
        };
        i.getDomList = function() {
            return e.list
        };
        i.getDomListByKey = function(a) {
            return e.list[a]
        };
        i.getDom = function(a, b) {
            return e.list[a] ? e.list[a][b || 0] : !1
        };
        i.getCascadeDom = function(b, c) {
            return e.list[b] ? a.core.dom.cascadeNode(e.list[b][c || 0]) : !1
        };
        return i
    }
});
STK.register("ui.mod.dialog", function(a) {
    return function(b, c) {
        if (!b)
            throw "ui.mod.dialog need template as first parameter";
        var d, e, f, g, h, i, j, k, l, m, n, o;
        l = !0;
        var p = function() {
            l !== !1 && e.hide()
        }, q = function() {
            d = a.parseParam({t: null,l: null,width: null,height: null}, c);
            e = a.ui.mod.layer(b, d);
            g = e.getOuter();
            h = e.getDom("title");
            k = e.getDom("title_content");
            i = e.getDom("inner");
            j = e.getDom("close");
            a.addEvent(j, "click", function(b) {
                a.preventDefault(b);
                n();
                return !1
            });
            a.custEvent.add(e, "show", function() {
                a.hotKey.add(document.documentElement, ["esc"], p, {type: "keyup",disableInInput: !0})
            });
            a.custEvent.add(e, "hide", function() {
                a.hotKey.remove(document.documentElement, ["esc"], p, {type: "keyup"});
                l = !0
            })
        };
        q();
        o = a.objSup(e, ["show", "hide"]);
        n = function(b) {
            if (typeof m == "function" && !b && m() === !1)
                return !1;
            o.hide();
            a.contains(document.body, e.getOuter()) && document.body.removeChild(e.getOuter());
            return f
        };
        f = e;
        f.show = function() {
            a.contains(document.body, e.getOuter()) || document.body.appendChild(e.getOuter());
            o.show();
            return f
        };
        f.hide = n;
        f.setPosition = function(a) {
            g.style.top = a.t + "px";
            g.style.left = a.l + "px";
            return f
        };
        f.setMiddle = function() {
            var b = a.core.util.winSize(), c = e.getSize(!0), d = a.core.util.scrollPos().top + (b.height - c.h) / 2;
            g.style.top = (d > 0 ? d : 0) + "px";
            g.style.left = (b.width - c.w) / 2 + "px";
            return f
        };
        f.setTitle = function(a) {
            k.innerHTML = a;
            return f
        };
        f.setContent = function(a) {
            typeof a == "string" ? i.innerHTML = a : i.appendChild(a);
            return f
        };
        f.clearContent = function() {
            while (i.children.length)
                a.removeNode(i.children[0]);
            return f
        };
        f.setAlign = function() {
        };
        f.setBeforeHideFn = function(a) {
            m = a
        };
        f.clearBeforeHideFn = function() {
            m = null
        };
        f.unsupportEsc = function() {
            l = !1
        };
        f.supportEsc = function() {
            l = !0
        };
        return f
    }
});
STK.register("kit.dom.fix", function(a) {
    function f(c, e, f) {
        if (!!d(c)) {
            var g = "fixed", h, i, j, k, l = c.offsetWidth, m = c.offsetHeight, n = a.core.util.winSize(), o = 0, p = 0, q = a.core.dom.cssText(c.style.cssText);
            if (!b) {
                g = "absolute";
                var r = a.core.util.scrollPos();
                o = h = r.top;
                p = i = r.left;
                switch (e) {
                    case "lt":
                        h += f[1];
                        i += f[0];
                        break;
                    case "lb":
                        h += n.height - m - f[1];
                        i += f[0];
                        break;
                    case "rt":
                        h += f[1];
                        i += n.width - l - f[0];
                        break;
                    case "rb":
                        h += n.height - m - f[1];
                        i += n.width - l - f[0];
                        break;
                    case "c":
                    default:
                        h += (n.height - m) / 2 + f[1];
                        i += (n.width - l) / 2 + f[0]
                }
                j = k = ""
            } else {
                h = k = f[1];
                i = j = f[0];
                switch (e) {
                    case "lt":
                        k = j = "";
                        break;
                    case "lb":
                        h = j = "";
                        break;
                    case "rt":
                        i = k = "";
                        break;
                    case "rb":
                        h = i = "";
                        break;
                    case "c":
                    default:
                        h = (n.height - m) / 2 + f[1];
                        i = (n.width - l) / 2 + f[0];
                        k = j = ""
                }
            }
            if (e == "c") {
                h < o && (h = o);
                i < p && (i = p)
            }
            q.push("position", g).push("top", h + "px").push("left", i + "px").push("right", j + "px").push("bottom", k + "px");
            c.style.cssText = q.getCss()
        }
    }
    function e(b) {
        b = a.core.arr.isArray(b) ? b : [0, 0];
        for (var c = 0; c < 2; c++)
            typeof b[c] != "number" && (b[c] = 0);
        return b
    }
    function d(b) {
        return a.core.dom.getStyle(b, "display") != "none"
    }
    var b = !(a.core.util.browser.IE6 || document.compatMode !== "CSS1Compat" && STK.IE), c = /^(c)|(lt)|(lb)|(rt)|(rb)$/;
    return function(d, g, h) {
        var i, j, k = !0, l;
        if (a.core.dom.isNode(d) && c.test(g)) {
            var m = {getNode: function() {
                    return d
                },isFixed: function() {
                    return k
                },setFixed: function(a) {
                    (k = !!a) && f(d, i, j);
                    return this
                },setAlign: function(a, b) {
                    if (c.test(a)) {
                        i = a;
                        j = e(b);
                        k && f(d, i, j)
                    }
                    return this
                },destroy: function() {
                    b || b && a.core.evt.removeEvent(window, "scroll", n);
                    a.core.evt.removeEvent(window, "resize", n);
                    a.core.evt.custEvent.undefine(l)
                }};
            l = a.core.evt.custEvent.define(m, "beforeFix");
            m.setAlign(g, h);
            function n(c) {
                c = c || window.event;
                a.core.evt.custEvent.fire(l, "beforeFix", c.type);
                k && (!b || i == "c") && f(d, i, j)
            }
            b || a.core.evt.addEvent(window, "scroll", n);
            a.core.evt.addEvent(window, "resize", n);
            return m
        }
    }
});
STK.register("ui.mask", function(a) {
    function k(b) {
        var c;
        (c = b.getAttribute(f)) || b.setAttribute(f, c = a.getUniqueKey());
        return ">" + b.tagName.toLowerCase() + "[" + f + '="' + c + '"]'
    }
    function j() {
        b = a.C("div");
        var c = '<div node-type="outer">';
        a.core.util.browser.IE6 && (c += '<div style="position:absolute;width:100%;height:100%;"></div>');
        c += "</div>";
        b = a.builder(c).list.outer[0];
        document.body.appendChild(b);
        e = !0;
        d = a.kit.dom.fix(b, "lt");
        var f = function() {
            var c = a.core.util.winSize();
            b.style.cssText = a.core.dom.cssText(b.style.cssText).push("width", c.width + "px").push("height", c.height + "px").getCss()
        };
        i.add(d, "beforeFix", f);
        f()
    }
    var b, c = [], d, e = !1, f = "STK-Mask-Key", g = a.core.dom.setStyle, h = a.core.dom.getStyle, i = a.core.evt.custEvent, l = {getNode: function() {
            return b
        },show: function(c, f) {
            if (e) {
                c = a.core.obj.parseParam({opacity: .3,background: "#000000"}, c);
                b.style.background = c.background;
                g(b, "opacity", c.opacity);
                b.style.display = "";
                d.setAlign("lt");
                f && f()
            } else {
                j();
                l.show(c, f)
            }
            return l
        },hide: function() {
            b.style.display = "none";
            c = [];
            return l
        },showUnderNode: function(d, e) {
            a.isNode(d) && l.show(e, function() {
                g(b, "zIndex", h(d, "zIndex"));
                var e = k(d), f = a.core.arr.indexOf(c, e);
                f != -1 && c.splice(f, 1);
                c.push(e);
                a.core.dom.insertElement(d, b, "beforebegin")
            });
            return l
        },back: function() {
            if (c.length < 1)
                return l;
            var d, e;
            c.pop();
            if (c.length < 1)
                l.hide();
            else if ((e = c[c.length - 1]) && (d = a.sizzle(e, document.body)[0])) {
                g(b, "zIndex", h(d, "zIndex"));
                a.core.dom.insertElement(d, b, "beforebegin")
            } else
                l.back();
            return l
        },destroy: function() {
            i.remove(d);
            b.style.display = "none"
        }};
    return l
});
STK.register("kit.dom.drag", function(a) {
    return function(b, c) {
        var d, e, f, g, h, i, j, k, l = function() {
            m();
            n()
        }, m = function() {
            d = a.parseParam({moveDom: b,perchStyle: "border:solid #999999 2px;",dragtype: "perch",actObj: {},pagePadding: 5}, c);
            f = d.moveDom;
            e = {};
            g = {};
            h = a.drag(b, {actObj: d.actObj});
            if (d.dragtype === "perch") {
                i = a.C("div");
                j = !1;
                k = !1;
                f = i
            }
            b.style.cursor = "move"
        }, n = function() {
            a.custEvent.add(d.actObj, "dragStart", o);
            a.custEvent.add(d.actObj, "dragEnd", p);
            a.custEvent.add(d.actObj, "draging", q)
        }, o = function(c, e) {
            document.body.style.cursor = "move";
            var f = a.core.util.pageSize().page;
            g = a.core.dom.position(d.moveDom);
            g.pageX = e.pageX;
            g.pageY = e.pageY;
            g.height = d.moveDom.offsetHeight;
            g.width = d.moveDom.offsetWidth;
            g.pageHeight = f.height;
            g.pageWidth = f.width;
            if (d.dragtype === "perch") {
                var h = [];
                h.push(d.perchStyle);
                h.push("position:absolute");
                h.push("z-index:" + (d.moveDom.style.zIndex + 10));
                h.push("width:" + d.moveDom.offsetWidth + "px");
                h.push("height:" + d.moveDom.offsetHeight + "px");
                h.push("left:" + g.l + "px");
                h.push("top:" + g.t + "px");
                i.style.cssText = h.join(";");
                k = !0;
                setTimeout(function() {
                    if (k) {
                        document.body.appendChild(i);
                        j = !0
                    }
                }, 100)
            }
            b.setCapture !== undefined && b.setCapture()
        }, p = function(a, c) {
            document.body.style.cursor = "auto";
            b.setCapture !== undefined && b.releaseCapture();
            if (d.dragtype === "perch") {
                k = !1;
                d.moveDom.style.top = i.style.top;
                d.moveDom.style.left = i.style.left;
                if (j) {
                    document.body.removeChild(i);
                    j = !1
                }
            }
        }, q = function(a, b) {
            var c = g.t + (b.pageY - g.pageY), e = g.l + (b.pageX - g.pageX), h = c + g.height, i = e + g.width, j = g.pageHeight - d.pagePadding, k = g.pageWidth - d.pagePadding;
            if (h < j && c > 0)
                f.style.top = c + "px";
            else {
                var l;
                h >= j && (l = j - g.height);
                if (c < 0 || l < 0)
                    l = 0;
                f.style.top = l + "px"
            }
            if (i < k && e > 0)
                f.style.left = e + "px";
            else {
                e < 0 && (f.style.left = "0px");
                i >= k && (f.style.left = k - g.width + "px")
            }
        };
        l();
        e.destroy = function() {
            document.body.style.cursor = "auto";
            typeof f.setCapture == "function" && f.releaseCapture();
            if (d.dragtype === "perch") {
                k = !1;
                if (j) {
                    document.body.removeChild(i);
                    j = !1
                }
            }
            a.custEvent.remove(d.actObj, "dragStart", o);
            a.custEvent.remove(d.actObj, "dragEnd", p);
            a.custEvent.remove(d.actObj, "draging", q);
            h.destroy && h.destroy();
            d = null;
            f = null;
            g = null;
            h = null;
            i = null;
            j = null;
            k = null
        };
        e.getActObj = function() {
            return d.actObj
        };
        return e
    }
});
STK.register("ui.dialog", function(a) {
    var b = '<div class="W_layer" node-type="outer" style="display:none;position:absolute;z-index:10001"><div class="bg"><table border="0" cellspacing="0" cellpadding="0"><tr><td><div class="content" node-type="layoutContent"><div class="title" node-type="title"><span node-type="title_content"></span></div><a href="javascript:void(0);" class="W_close" title="#L{关闭}" node-type="close"></a><div node-type="inner"></div></div></td></tr></table></div></div>', c = a.kit.extra.language, d = null, e, f = function() {
        var b = a.ui.mod.dialog(c(e.template));
        a.custEvent.add(b, "show", function() {
            a.ui.mask.showUnderNode(b.getOuter())
        });
        a.custEvent.add(b, "hide", function() {
            a.ui.mask.back();
            b.setMiddle()
        });
        a.kit.dom.drag(b.getDom("title"), {actObj: b,moveDom: b.getOuter()});
        b.destroy = function() {
            g(b);
            try {
                b.hide(!0)
            } catch (a) {
            }
        };
        return b
    }, g = function(a) {
        a.setTitle("").clearContent();
        d.setUnused(a)
    };
    return function(c) {
        e = a.parseParam({template: b,isHold: !1}, c);
        var h = e.isHold;
        e = a.core.obj.cut(e, ["isHold"]);
        d || (d = a.kit.extra.reuse(f));
        var i = d.getOne();
        h || a.custEvent.add(i, "hide", function() {
            a.custEvent.remove(i, "hide", arguments.callee);
            g(i)
        });
        return i
    }
});
STK.register("ui.confirm", function(a) {
    var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt2" node-type="textComplex"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl><div class="btn"><a href="javascript:void(0)" class="W_btn_d" node-type="OK"></a><a href="javascript:void(0)" class="W_btn_b" node-type="cancel"></a></div></div>', c = {success: "icon_succM",error: "icon_errorM",warn: "icon_warnM","delete": "icon_delM",question: "icon_questionM"}, d = a.kit.extra.language, e = null;
    return function(f, g) {
        var h, i, j, k, l, m;
        h = a.parseParam({title: d("#L{提示}"),icon: "question",textLarge: f,textComplex: "",textSmall: "",OK: a.funcEmpty,OKText: d("#L{确定}"),cancel: a.funcEmpty,cancelText: d("#L{取消}"),hideCallback: a.funcEmpty}, g);
        h.icon = c[h.icon];
        i = {};
        e || (e = a.kit.extra.reuse(function() {
            var c = a.ui.mod.layer(b);
            return c
        }));
        j = e.getOne();
        k = a.ui.dialog();
        k.setContent(j.getOuter());
        j.getDom("icon").className = h.icon;
        j.getDom("textLarge").innerHTML = h.textLarge;
        j.getDom("textComplex").innerHTML = h.textComplex;
        j.getDom("textSmall").innerHTML = h.textSmall;
        j.getDom("OK").innerHTML = "<span>" + h.OKText + "</span>";
        j.getDom("cancel").innerHTML = "<span>" + h.cancelText + "</span>";
        k.setTitle(h.title);
        var n = function() {
            l = !0;
            m = a.htmlToJson(j.getDom("textComplex"));
            k.hide()
        };
        a.addEvent(j.getDom("OK"), "click", n);
        a.addEvent(j.getDom("cancel"), "click", k.hide);
        a.custEvent.add(k, "hide", function() {
            a.custEvent.remove(k, "hide", arguments.callee);
            a.removeEvent(j.getDom("OK"), "click", n);
            a.removeEvent(j.getDom("cancel"), "click", k.hide);
            e.setUnused(j);
            l ? h.OK(m) : h.cancel(m);
            g.hideCallback()
        });
        k.show().setMiddle();
        j.getDom("OK").focus();
        i.cfm = j;
        i.dia = k;
        return i
    }
});
STK.register("ui.alert", function(a) {
    var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl><div class="btn"><a href="javascript:void(0)" class="W_btn_d" node-type="OK"></a></div></div>', c = {success: "icon_succM",error: "icon_errorM",warn: "icon_warnM","delete": "icon_delM",question: "icon_questionM"}, d = a.kit.extra.language, e = null, f = function(a, b) {
        a.getDom("icon").className = b.icon;
        a.getDom("textLarge").innerHTML = b.textLarge;
        a.getDom("textSmall").innerHTML = b.textSmall;
        a.getDom("OK").innerHTML = "<span>" + b.OKText + "</span>"
    };
    return function(g, h) {
        var i, j, k, l, m;
        i = a.parseParam({title: d("#L{提示}"),icon: "warn",textLarge: g,textSmall: "",OK: a.funcEmpty,OKText: d("#L{确定}"),timeout: 0}, h);
        i.icon = c[i.icon];
        j = {};
        e || (e = a.kit.extra.reuse(function() {
            var c = a.ui.mod.layer(d(b));
            return c
        }));
        k = e.getOne();
        l = a.ui.dialog();
        l.setContent(k.getOuter());
        l.setTitle(i.title);
        f(k, i);
        var n = function(b) {
            a.preventDefault(b);
            l.hide()
        };
        a.addEvent(k.getDom("OK"), "click", n);
        a.custEvent.add(l, "hide", function() {
            a.custEvent.remove(l, "hide", arguments.callee);
            a.removeEvent(k.getDom("OK"), "click", n);
            e.setUnused(k);
            clearTimeout(m);
            i.OK()
        });
        i.timeout && (m = setTimeout(l.hide, i.timeout));
        l.show().setMiddle();
        k.getDom("OK").focus();
        j.alt = k;
        j.dia = l;
        return j
    }
});
STK.register("kit.dom.firstChild", function(a) {
    var b = a.core.dom.next;
    return function(a) {
        var c = a.firstChild;
        c && c.nodeType != 1 && (c = b(c));
        return c
    }
});
STK.register("kit.dom.parentAttr", function(a) {
    return function(a, b, c) {
        var d;
        if (a && b) {
            c = c || document.body;
            while (a && a != c && !(d = a.getAttribute(b)))
                a = a.parentNode
        }
        return d
    }
});
STK.register("kit.extra.merge", function(a) {
    return function(a, b) {
        var c = {};
        for (var d in a)
            c[d] = a[d];
        for (var d in b)
            c[d] = b[d];
        return c
    }
});
STK.register("common.getDiss", function(a) {
    return function() {
        var b = {}, c = 0, d = {location: $CONFIG.location};
        arguments[0] && !a.core.dom.isNode(arguments[0]) && (b = arguments[c++]);
        b = a.kit.extra.merge(b, d);
        if (!arguments[c])
            return b;
        b = a.kit.extra.merge(b, a.core.json.queryToJson(a.kit.dom.parentAttr(arguments[c++], "diss-data", arguments[c]) || ""));
        return b
    }
});
STK.register("kit.extra.parseURL", function(a) {
    return function() {
        return STK.historyM && STK.historyM.parseURL ? STK.historyM.parseURL() : a.core.str.parseURL(location.href)
    }
});
STK.register("kit.io.ajax", function(a) {
    var b = function(b, c, d) {
        c = c | 0 || 1;
        d = d || "fail";
        var e = b.args;
        e.__rnd && delete e.__rnd;
        (new Image).src = "http://weibolog.sinaapp.com/?t=" + c + "&u=" + encodeURIComponent(b.url) + "&p=" + encodeURIComponent(a.core.json.jsonToQuery(e)) + "&m=" + d
    };
    return function(c) {
        var d = {}, e = [], f = null, g = !1, h = a.parseParam({url: "",method: "get",responseType: "json",timeout: 3e4,onTraning: a.funcEmpty,isEncode: !0}, c);
        h.onComplete = function(a) {
            g = !1;
            c.onComplete(a, h.args);
            setTimeout(i, 0)
        };
        h.onFail = function(a) {
            g = !1;
            if (typeof c.onFail == "function")
                try {
                    c.onFail(a, h.args)
                } catch (d) {
                }
            setTimeout(i, 0);
            try {
                b(h)
            } catch (d) {
            }
        };
        h.onTimeout = function(a) {
            try {
                b(h);
                c.onTimeout(a)
            } catch (d) {
            }
        };
        var i = function() {
            if (!!e.length) {
                if (g === !0)
                    return;
                g = !0;
                h.args = e.shift();
                if (h.method.toLowerCase() == "post") {
                    var b = a.core.util.URL(h.url);
                    b.setParam("__rnd", +(new Date));
                    h.url = b.toString()
                }
                f = a.ajax(h)
            }
        }, j = function(a) {
            while (e.length)
                e.shift();
            g = !1;
            if (f)
                try {
                    f.abort()
                } catch (b) {
                }
            f = null
        };
        d.request = function(a) {
            a || (a = {});
            c.noQueue && j();
            if (!c.uniqueRequest || !f) {
                e.push(a);
                a._t = 0;
                i()
            }
        };
        d.abort = j;
        return d
    }
});
STK.register("kit.io.jsonp", function(a) {
    return function(b) {
        var c = a.parseParam({url: "",method: "get",responseType: "json",varkey: "_v",timeout: 3e4,onComplete: a.funcEmpty,onTraning: a.funcEmpty,onFail: a.funcEmpty,isEncode: !0}, b), d = [], e = {}, f = !1, g = function() {
            if (!!d.length) {
                if (f === !0)
                    return;
                f = !0;
                e.args = d.shift();
                e.onComplete = function(a) {
                    f = !1;
                    c.onComplete(a, e.args);
                    setTimeout(g, 0)
                };
                e.onFail = function(a) {
                    f = !1;
                    c.onFail(a);
                    setTimeout(g, 0)
                };
                a.jsonp(a.core.json.merge(c, {args: e.args,onComplete: function(a) {
                        e.onComplete(a)
                    },onFail: function(a) {
                        try {
                            e.onFail(a)
                        } catch (b) {
                        }
                    }}))
            }
        }, h = {};
        h.request = function(a) {
            a || (a = {});
            d.push(a);
            a._t = 1;
            g()
        };
        h.abort = function(a) {
            while (d.length)
                d.shift();
            f = !1;
            e = null
        };
        return h
    }
});
STK.register("kit.io.ijax", function(a) {
    return function(b) {
        var c = a.parseParam({url: "",timeout: 3e4,isEncode: !0,abaurl: null,responseName: null,varkey: "callback",abakey: "callback"}, b), d = [], e = null, f = !1;
        c.onComplete = function(a, d) {
            f = !1;
            b.onComplete(a, c.form, d);
            c.form = null;
            c.args = null;
            setTimeout(g, 0)
        };
        c.onFail = function(a, d) {
            f = !1;
            b.onFail(a, c.form, d);
            c.form = null;
            c.args = null;
            setTimeout(g, 0)
        };
        var g = function() {
            var b;
            if (!!d.length) {
                if (f === !0)
                    return;
                f = !0;
                b = d.shift();
                c.args = b.args;
                c.form = b.form;
                e = a.ijax(c)
            }
        }, h = function(a) {
            while (d.length)
                d.shift();
            f = !1;
            if (e)
                try {
                    e.abort()
                } catch (b) {
                }
            e = null
        }, i = {};
        i.request = function(c, e) {
            if (!a.isNode(c))
                throw "[kit.io.ijax.request] need a form as first parameter";
            e || (e = {});
            b.noQueue && h();
            d.push({form: c,args: e});
            g()
        };
        i.abort = h;
        return i
    }
});
STK.register("kit.io.inter", function(a) {
    var b = a.core.json.merge;
    return function() {
        var c = {}, d = {}, e = {}, f = function(a, b) {
            return function(c, d) {
                try {
                    b.onComplete(c, d)
                } catch (f) {
                }
                try {
                    if (c.code === "100000")
                        b.onSuccess(c, d);
                    else {
                        if (c.code === "100002") {
                            location.href = c.data;
                            return
                        }
                        b.onError(c, d)
                    }
                } catch (f) {
                }
                for (var g in e[a])
                    try {
                        e[a][g](c, d)
                    } catch (f) {
                    }
            }
        };
        c.register = function(a, b) {
            if (typeof d[a] != "undefined")
                throw a + " registered";
            d[a] = b;
            e[a] = {}
        };
        c.addHook = function(b, c) {
            var d = a.core.util.getUniqueKey();
            e[b][d] = c;
            return d
        };
        c.rmHook = function(a, b) {
            e[a] && e[a][b] && delete e[a][b]
        };
        c.getTrans = function(c, e) {
            var g = b(d[c], e);
            g.onComplete = f(c, e);
            var h = d[c].requestMode, i = "ajax";
            if (h === "jsonp" || h === "ijax")
                i = h;
            return a.kit.io[i](g)
        };
        c.request = function(c, e, g) {
            var h = b(d[c], e);
            h.onComplete = f(c, e);
            h = a.core.obj.cut(h, ["noqueue"]);
            h.args = g;
            var i = d[c].requestMode;
            return i === "jsonp" ? a.jsonp(h) : i === "ijax" ? a.ijax(h) : a.ajax(h)
        };
        return c
    }
});
STK.register("common.trans.feed", function(a) {
    var b = a.kit.io.inter(), c = b.register;
    c("publish", {url: "/aj/mblog/add?_wv=5",method: "post"});
    c("delete", {url: "/aj/mblog/del?_wv=5",method: "post"});
    c("forward", {url: "/aj/mblog/forward?_wv=5",method: "post"});
    c("mediaShow", {url: "http://api.weibo.com/widget/show.jsonp",varkey: "jsonp",method: "get",requestMode: "jsonp"});
    c("qingShow", {url: "http://api.t.sina.com.cn/widget/show.json?source=3818214747",varkey: "callback",method: "get",requestMode: "jsonp"});
    c("profileSearch", {url: "/aj/mblog/mbloglist?_wv=5",method: "get"});
    c("homeSearch", {url: "/aj/mblog/fsearch?_wv=5",method: "get"});
    c("groupSearch", {url: "/aj/relation/status?_wv=5",method: "get"});
    c("sendMeSearch", {url: "/aj/mblog/sendme?_wv=5",method: "get"});
    c("atMeSearch", {url: "/aj/at/mblog/list?_wv=5",method: "get"});
    c("atMeShield", {url: "/aj/at/mblog/shield?_wv=5",method: "post"});
    c("widget", {url: "/aj/mblog/showinfo?_wv=5",method: "post"});
    c("third_rend", {url: "/aj/mblog/renderfeed?_wv=5",method: "post"});
    c("feedShield", {url: "/aj/user/block?_wv=5",method: "post"});
    c("feedTagList", {url: "/aj/mblog/tag/mytaglist?_wv=5",method: "post"});
    c("feedTagListHtml", {url: "/aj/mblog/tag/list?_wv=5",method: "get"});
    c("feedTagUpdate", {url: "/aj/mblog/tag/updatetags?_wv=5",method: "post"});
    c("feedTagDel", {url: "/aj/mblog/tag/destroy?_wv=5",method: "post"});
    c("feedTagEdit", {url: "/aj/mblog/tag/update?_wv=5",method: "post"});
    c("getAtmeComment", {url: "/aj/at/comment/comment?_wv=5",method: "get"});
    c("getAtmeBlog", {url: "/aj/at/mblog/mblog?_wv=5",method: "get"});
    c("getCommonComent", {url: "/aj/commentbox/common?_wv=5",method: "get"});
    c("getAttiudeList", {url: "/aj/attiudebox/in?_wv=5",method: "get"});
    c("memberTopFeed", {url: "/aj/mblog/markmembermblog?_wv=5",method: "post"});
    c("activityDelete", {url: "/aj/activities/del?_wv=5",method: "post"});
    c("activityShield", {url: "/aj/activities/block?_wv=5",method: "post"});
    c("common_media", {url: "http://api.weibo.com/widget/object_render.jsonp?source=3818214747",varkey: "callback",method: "get",requestMode: "jsonp"});
    c("showblock", {url: "/aj/blockword/showblock?_wv=5",method: "get"});
    c("update", {url: "/aj/blockword/update?_wv=5",method: "get"});
    c("showfiltermblogs", {url: "/aj/mblog/showfiltermblogs?_wv=5",method: "get"});
    c("refreshRecommend", {url: "/aj/mblog/recfeed?_wv=5",method: "get"});
    c("closeRecommend", {url: "/aj/mblog/recfeedclose?_wv=5",method: "get"});
    c("translate", {url: "/aj/mblog/translation?_wv=5",method: "get"});
    return b
});
STK.register("common.feed.groupAndSearch.filter.base", function(a) {
    function h(a, b) {
        if (a == null || b == null)
            return !0;
        a = (new Date(a.replace(/-/g, "/"))).getTime();
        b = (new Date(b.replace(/-/g, "/"))).getTime();
        return a <= b
    }
    function g(a) {
        this.nodes = a
    }
    var b = a.kit.extra.language, c = b('<ul class="tipscon tips_warn"><li class="icon"><span class="icon_warnS"></span></li><li class="txt">#L{开始日期不能小于结束日期}</li></ul>'), d = b('<ul class="tipscon tips_warn"><li class="icon"><span class="icon_warnS"></span></li><li class="txt">#L{请输入搜索关键字！}</li></ul>'), e = '<li tag_name="#{TAG_NAME}" node-type="feed_tag"><a class="tag" onclick="return false;" href="javascript:void(0);"><i url="?is_tag=1&tag_name=#{TAG_NAME}" action-data="tag_name=#{TAG_NAME}" action-type="feed_tag_active">#{TAG_NAME}</i><span class="S_txt1">(<i node-type="count">#{COUNT}</i>)</span><em><span action-data="del_tag=#{TAG_NAME}" action-type="feed_tag_del" class="icon_del_s"></span></em></a></li>', f = {TAG: {ITEM: b('<li tag_name="#{TAG_NAME}" action-type="feed_tag_hover" node-type="feed_tag"><a class="tag" onclick="return false;" href="javascript:void(0);"><i url="?is_tag=1&tag_name=#{TAG_NAME}" action-data="tag_name=#{TAG_NAME}" action-type="feed_tag_active" title="#L{查看这个标签下的微博}">#{TAG_NAME}</i><span class="S_txt2">(<i node-type="count">#{COUNT}</i>)</span><em><span class="W_ico12 icon_edit" action-data="old_tag=#{TAG_NAME}" action-type="feed_tag_edit" title="#L{修改这个标签}"></span><span class="W_ico12 icon_close" action-data="del_tag=#{TAG_NAME}" action-type="feed_tag_del" title="#L{删除这个标签}"></span></em></a></li>'),EDIT: b('<span><input node-type="tag_edit_form" type="text" class="W_input" value="#{TAG_NAME}"><a class="W_btn_d" action-type="tag_edit_submit" action-data="old_tag=#{TAG_NAME}" href="javascript:void(0);" onclick="return false"><span>#L{保存}</span></a><a class="W_btn_b" action-type="tag_edit_cancel" action-data="old_tag=#{TAG_NAME}" href="javascript:void(0);" onclick="return false"><span>#L{取消}</span></a></span>')}};
    g.prototype.initFilter = function(a) {
        this.reset();
        this.defineCustEvent && this.defineCustEvent();
        this.init && this.init(a)
    };
    g.prototype.TEMP = {ALL: b("#L{全部}"),ORIGINAL: b("#L{原创}"),PICTURE: b("#L{图片}"),VIDEO: b("#L{视频}"),MUSIC: b("#L{音乐}"),TAGS: b("#L{标签}"),MOOD: b("#L{心情}")};
    g.prototype.defaultConfig = {gid: 0,isAllType: 0,is_ori: 0,is_forward: 0,is_pic: 0,is_video: 0,is_music: 0,is_tag: 0,is_mood: 0,is_text: 0,key_word: null,start_time: null,end_time: null,rank: null,mblogsort: null,stateNum: null};
    g.prototype.feed_tag_ismore = !1;
    g.prototype.searchStart = function() {
        this.isAdvSearched = !0;
        this.hasError != !0 && this.collectParameter(this.nodes.searchForm)
    };
    g.prototype.setSearchTypeUI = function(b) {
        b = b != null ? b : this.config.currentType;
        var c = a.kit.extra.language(this.feedType), d = a.core.util.easyTemplate(c), e = this.config.gid;
        e = e == null || e * 1 == 0 ? "" : "?gid=" + e;
        var f = a.kit.extra.parseURL();
        f = f.path;
        var g = e == "" ? "?" : "&", h = {list: [{id: 0,name: this.TEMP.ALL,url: "/" + f + e}, {id: 1,name: this.TEMP.ORIGINAL,url: "/" + f + e + g + "is_ori=1"}, {id: 2,name: this.TEMP.PICTURE,url: "/" + f + e + g + "is_pic=1"}, {id: 3,name: this.TEMP.VIDEO,url: "/" + f + e + g + "is_video=1"}, {id: 4,name: this.TEMP.MUSIC,url: "/" + f + e + g + "is_music=1"}],count: 4,current: b * 1}, i = d(h);
        this.nodes.feedType.innerHTML = i
    };
    g.prototype.setAdvForm = function(b) {
        var c = a.sizzle("input[type=checkbox]", this.nodes.searchForm), d = c[0], e = c[3], f = c[4], g = c[5], h = c[1], i = c[2];
        switch (b * 1) {
            case 1:
                h.checked = !1;
                break;
            case 2:
                i.checked = !1;
                f.checked = !1;
                g.checked = !1;
                break;
            case 3:
                i.checked = !1;
                e.checked = !1;
                g.checked = !1;
                break;
            case 4:
                i.checked = !1;
                e.checked = !1;
                f.checked = !1
        }
    };
    g.prototype.hideAdvSearch = function() {
        var a = this.nodes.search, b = a.children || a.childNodes, c = b[0], d = b[1];
        c.style.display = "";
        d.style.display = "none"
    };
    g.prototype.collectParameter = function(c) {
        var e, f = {}, g = a.core.json.clone(this.config);
        delete g.currentType;
        delete g.isAllType;
        if (c != null) {
            e = a.core.util.htmlToJson(c);
            for (var h in e)
                if (h != "key_word")
                    g[h] = e[h];
                else {
                    var i = a.hasby(this.defaultSearchTip, function(a, b) {
                        return a === e[h]
                    });
                    if (i.length != 0 || e[h] == "") {
                        this.nodes.advSearchErr.innerHTML = d;
                        return
                    }
                    g[h] = e[h];
                    this.nodes.advSearchErr.innerHTML = ""
                }
            g.is_search = "1"
        } else
            this.nodes.advSearchErr.innerHTML = "";
        this.defaultCount != null && (g.count = this.defaultCount);
        for (h in g) {
            var j = g[h];
            j != null && j * 1 !== 0 && j !== "" && (f[h] = g[h])
        }
        f.start_time == b("#L{选择日期}") && delete f.start_time;
        f.end_time == b("#L{选择日期}") && delete f.end_time;
        var k = this.isGroupAll != null ? this.isGroupAll() : !1, l = this.isFilterAll();
        a.core.evt.custEvent.fire(this.custKeySearch, "search", ["search", f, {isGroupAll: k,isFilterAll: l}])
    };
    g.prototype.isFilterAll = function() {
        var a = !0;
        this.config != null && this.config.currentType != null && (a = this.config.currentType * 1 == 0 ? !0 : !1);
        return a
    };
    g.prototype.searchFilterChange = function(a) {
        var b = this.config.gid, c = this.config.key_word, d = this.config.profile_ftype;
        this.reset();
        this.config.gid = b;
        this.config.key_word = c;
        this.config.profile_ftype = d;
        switch (a) {
            case "0":
                this.config.isAllType = 1;
                break;
            case "1":
                this.config.is_ori = 1;
                break;
            case "2":
                this.config.is_pic = 1;
                break;
            case "3":
                this.config.is_video = 1;
                break;
            case "4":
                this.config.is_music = 1;
                break;
            case "5":
                this.config.is_tag = 1;
                break;
            case "6":
                this.config.is_mood = 1
        }
        this.config.currentType = a;
        this.setSearchTypeUI();
        this.collectParameter()
    };
    g.prototype.searchKeyword = function() {
        if (!this.nodes.keyword[0] || a.trim(this.nodes.keyword[0].value) != "") {
            var c = this.nodes.keyword[0].value, d = [b("#L{搜索我说的话}"), b("#L{搜索他说的话}"), b("#L{搜索她说的话}")], e;
            a.foreach(d, function(a) {
                if (a === c) {
                    e = 1;
                    return !1
                }
            });
            if (e)
                return;
            if (this.hasError != !0) {
                this.isAdvSearched = !0;
                this.collectParameter(this.nodes.singleForm)
            }
        }
    };
    g.prototype.showCalendar = function(d, e) {
        function j(a) {
            var b;
            e == "1" ? b = h(a, i.config.end_time) : b = h(i.config.start_time, a);
            e == "1" ? b && (i.config.start_time = a) : b && (i.config.end_time = a);
            i.nodes.advSearchErr.innerHTML = b ? "" : c;
            i.hasError = !b
        }
        var f = a.core.str.trim(d.value), g, i = this;
        e == "1" ? g = new a.common.feed.groupAndSearch.include.calendar(0, {source: d,callback: j}) : g = new a.common.feed.groupAndSearch.include.calendar(f, {source: d,callback: j});
        if (!d.addSupportDelete) {
            d.addSupportDelete = !0;
            d.name === "start_time" && a.addEvent(d, "keydown", function(c) {
                a.preventDefault(c);
                c = a.getEvent();
                var e = c.keyCode || c.which;
                if (e === 27 || e === 46 || e === 8)
                    d.value = b("#L{选择日期}");
                i.nodes.advSearchErr && (i.nodes.advSearchErr.innerHTML = "")
            })
        }
    };
    var i = {orderByAll: "0",orderByBlog: "1",orderByActive: "2"};
    g.prototype.switchProfileTabs = function(b) {
        var c = a.sizzle('[node-type="fav_adv_item"]', this.nodes.feed_adv_tabs);
        a.foreach(c, function(b) {
            a.removeClassName(b, "current")
        });
        a.addClassName(b.el, "current")
    };
    g.prototype.orderByAll = function(b) {
        this.switchProfileTabs(b);
        a.setStyle(this.nodes.search_adv_rightbar, "display", "");
        a.setStyle(this.nodes.feed_nav_adv, "display", "");
        a.setStyle(this.nodes.activity_nav, "display", "");
        a.setStyle(this.nodes.search, "display", "none");
        this.config.profile_ftype = i.orderByAll;
        this.searchFilterChange.call(this, "0")
    };
    g.prototype.orderByBlog = function(b) {
        this.switchProfileTabs(b);
        a.setStyle(this.nodes.search_adv_rightbar, "display", "");
        a.setStyle(this.nodes.feed_nav_adv, "display", "");
        a.setStyle(this.nodes.activity_nav, "display", "none");
        a.setStyle(this.nodes.search, "display", "none");
        this.config.profile_ftype = i.orderByBlog;
        this.searchFilterChange.call(this, "0")
    };
    g.prototype.orderByActive = function(b) {
        this.switchProfileTabs(b);
        a.setStyle(this.nodes.search_adv_rightbar, "display", "none");
        a.setStyle(this.nodes.feed_nav_adv, "display", "none");
        a.setStyle(this.nodes.activity_nav, "display", "");
        a.setStyle(this.nodes.search, "display", "none");
        a.setStyle(this.nodes.search_adv_layers, "display", "none");
        this.reset();
        this.config.profile_ftype = i.orderByActive;
        this.collectParameter()
    };
    var j = function() {
        var b = Array.prototype.slice.apply(arguments);
        if (!a.core.arr.isArray(b[0]))
            throw "The diff function needs an array as first parameter";
        var c = a.core.arr.unique(b.shift());
        if (c.length == 0)
            return [];
        b = b.length == 1 ? b[0] : a.core.arr.unique(Array.prototype.concat.apply([], b));
        return a.core.arr.clear(a.core.arr.foreach(c, function(c) {
            return a.core.arr.inArray(c, b) ? null : c
        }))
    };
    g.prototype.tagGetUnit = function(b) {
        var c = a.sizzle('[tag_name="' + b + '"]', this.nodes.feed_tag_list);
        return c && c[0] ? c[0] : null
    };
    g.prototype.tagGetFirst = function() {
        var b = a.sizzle('[node-type="feed_tag"]', this.nodes.feed_tag_list);
        return b && b[0] ? b[0] : null
    };
    g.prototype.tagActive = function(b) {
        var c = b.data.tag_name;
        this.tagClearCurrent();
        this.reset();
        if (c) {
            this.config.tag_name = c;
            a.addClassName(b.el, "S_txt1")
        }
        this.config.is_tag = 1;
        this.collectParameter()
    };
    g.prototype.tagClearCurrent = function() {
        var b = a.sizzle("i.S_txt1", this.nodes.feed_tag_list);
        b.length > 0 && a.core.arr.foreach(b, function(b) {
            a.removeClassName(b, "S_txt1")
        })
    };
    g.prototype.tagAutoToggle = function() {
        this.config.is_tag == 1 ? this.tagShow() : this.tagHide()
    };
    g.prototype.tagAppend = function(b) {
        a.core.dom.insertHTML(a.sizzle("ul", this.nodes.feed_tag_list)[0], a.core.util.templet(f.TAG.ITEM, {TAG_NAME: b,COUNT: 1}))
    };
    g.prototype.tagUpdateCount = function(b, c) {
        if (!b)
            return !1;
        var d = this.tagGetUnit(b), e, f;
        if (d) {
            e = a.builder(d).list.count[0];
            f = c + parseInt(e.innerHTML);
            f < 0 && (f = 0);
            e.innerHTML = "" + f
        } else
            this.tagAppend(b)
    };
    g.prototype.tagUpdateChange = function(a) {
        var b = a.res ? a.res.split(" ") : [], c = a.now ? a.now.split(" ") : [], d = j(b, c), e = j(c, b);
        if (d.length > 0)
            for (var f in d)
                this.tagUpdateCount(d[f], -1);
        if (e.length > 0)
            for (var f in e)
                this.tagUpdateCount(e[f], 1)
    };
    g.prototype.tagListClose = function() {
        var b = this.nodes.feed_tag_list;
        if (!!a.isNode(b)) {
            a.setStyle(b, "display", "none");
            a.setStyle(this.nodes.feed_nav_adv, "display", "");
            this.searchFilterChange.call(this, "0")
        }
    };
    g.prototype.tagMoreUp = function(b) {
        this.feed_tag_ismore = !1;
        this.nodes.tag_container.scrollTop = 0;
        a.setStyle(this.nodes.tag_container, "height", "40px");
        a.setStyle(this.nodes.tag_container, "overflowY", "hidden");
        a.setStyle(this.nodes.tag_container, "overflow", "hidden");
        a.setStyle(this.nodes.more_tags_up, "display", "none");
        a.setStyle(this.nodes.more_tags_drop, "display", "");
        a.setStyle(this.nodes.feed_tag_pagebar, "display", "none")
    };
    g.prototype.tagMoreDrop = function(b) {
        this.feed_tag_ismore = !0;
        var c = a.core.dom.getSize(this.nodes.tag_show);
        if (c.height > 106) {
            a.setStyle(this.nodes.tag_container, "height", "106px");
            a.setStyle(this.nodes.tag_container, "overflowX", "hidden");
            a.setStyle(this.nodes.tag_container, "overflowY", "scroll");
            this.nodes.tag_container.scrollTop = "0px"
        } else
            a.setStyle(this.nodes.tag_container, "height", "");
        a.setStyle(this.nodes.more_tags_up, "display", "");
        a.setStyle(this.nodes.more_tags_drop, "display", "none");
        a.setStyle(this.nodes.feed_tag_pagebar, "display", "")
    };
    g.prototype.tagHide = function() {
        this.tagClearCurrent();
        this.nodes.feed_tag_list && a.setStyle(this.nodes.feed_tag_list, "display", "none")
    };
    g.prototype.tagShow = function() {
        a.setStyle(this.nodes.search_adv_layers, "display", "");
        var b = this.tagGetFirst();
        if (b) {
            a.addClassName(a.sizzle('[action-type="feed_tag_active"]', b)[0], "S_txt1");
            a.setStyle(this.nodes.feed_tag_list, "display", "");
            a.setStyle(this.nodes.feed_nav_adv, "display", "none")
        } else
            this.tagHide()
    };
    var k;
    g.prototype.tagEditFormShow = function(b) {
        this.tagEditFormHide(k);
        var c = this.tagGetUnit(b);
        c.setAttribute("isediting", "1");
        a.removeClassName(c, "S_bg1 S_line1 current");
        var d = a.kit.dom.firstChild(c);
        a.setStyle(d, "display", "none");
        var e = a.core.dom.next(d);
        if (!e)
            a.core.dom.insertHTML(c, a.core.util.templet(f.TAG.EDIT, {TAG_NAME: b}), "beforeend");
        else {
            a.sizzle('input[node-type="tag_edit_form"]', e)[0].value = b;
            a.setStyle(e, "display", "")
        }
        k = b
    };
    g.prototype.tagEditFormHide = function(b) {
        var c = this.tagGetUnit(b);
        if (c) {
            c.setAttribute("isediting", "0");
            var d = a.kit.dom.firstChild(c);
            a.setStyle(d, "display", "");
            a.setStyle(a.core.dom.next(d), "display", "none")
        }
    };
    g.prototype.tagEditFormFocus = function() {
        var b = a.sizzle('[node-type="tag_edit_form"]', this.nodes.tag_show)[0];
        b && a.core.dom.selectText(b, {start: 0,len: b.value.length})
    };
    g.prototype.tagEditForm = function(a) {
        this.tagEditFormShow(a.data.old_tag)
    };
    g.prototype.tagEditFormCancel = function(a) {
        this.tagEditFormHide(a.data.old_tag)
    };
    g.prototype.tagEditSubmit = function(c) {
        var d = a.sizzle("input", c.el.parentNode)[0].value, e = c.data.old_tag, g = this.tagGetUnit(e), h = a.sizzle('[node-type="count"]', g)[0].innerHTML, i = a.core.dom.hasClassName(a.sizzle('[action-type="feed_tag_active"]', g)[0], "S_txt1"), j = this;
        if (d == e)
            this.tagEditFormCancel(c);
        else {
            var k = {old_tag: e,new_tag: d};
            a.common.trans.feed.getTrans("feedTagEdit", {onSuccess: function(b) {
                    var c = a.kit.dom.parseDOM(a.builder(a.core.util.templet(f.TAG.ITEM, {TAG_NAME: b.data.tag,COUNT: h})).list);
                    i && a.core.dom.addClassName(a.sizzle('[action-type="feed_tag_active"]', c.feed_tag)[0], "S_txt1");
                    a.core.dom.replaceNode(c.feed_tag, g)
                },onFail: function(c) {
                    a.ui.alert(c.msg || b("#L{更新失败}"))
                },onError: function(c) {
                    a.ui.alert(c.msg || b("#L{更新失败}"))
                }}).request(k)
        }
    };
    g.prototype.tagDel = function(c) {
        var d = this, e = function() {
            var e = c.el, f = d;
            a.common.trans.feed.getTrans("feedTagDel", {onSuccess: function(b) {
                    var c = a.kit.dom.parentElementBy(e, f.nodes.feed_tag_list, function(a) {
                        if (a.getAttribute("node-type") == "feed_tag")
                            return !0
                    });
                    c.parentNode.removeChild(c);
                    !f.tagGetFirst() && f.tagHide()
                },onFail: function(c, d) {
                    a.ui.alert(c.msg || b("#L{删除失败}"))
                },onError: function(c, d) {
                    a.ui.alert(c.msg || b("#L{删除失败}"))
                }}).request(a.common.getDiss(c.data))
        };
        a.ui.confirm(b("#L{你确定要删除这个微博标签吗？}"), {textSmall: b("#L{删除微博标签不会将对应的微博一起删除}"),OK: e})
    };
    g.prototype.tagPage = function(b) {
        var c = this;
        a.common.trans.feed.getTrans("feedTagListHtml", {onSuccess: function(b) {
                var d = a.core.dom.builder(b.data.html), e = d.list.feed_tag_pagebar, f = d.list.tag_show;
                c.nodes.feed_tag_pagebar.innerHTML = e && e[0] && e[0].innerHTML;
                c.nodes.tag_show.innerHTML = f && f[0] && f[0].innerHTML;
                c.feed_tag_ismore && c.tagMoreDrop()
            },onFail: function(b, c) {
                a.ui.alert(b.msg)
            },onError: function(b, c) {
                a.ui.alert(b.msg)
            }}).request(a.common.getDiss(b.data))
    };
    g.prototype.reset = function() {
    };
    g.prototype.destroy = function() {
    };
    g.prototype.refresh = function() {
    };
    return g
});
STK.register("common.feed.groupAndSearch.template.feedType", function() {
    var a = '<#et userlist data><#list data.list as list><li action-type="search_type" action-data="type=${list.id}" href="${list.url}" <#if (data.current==list.id)>class="t_itm current"<#else>class="t_itm"</#if>><a <#if (data.current==list.id)>class="t_lk S_txt1 S_bg2"<#else>class="t_lk"</#if> href="${list.url}">${list.name}</a></li></#list>';
    return a
});
STK.register("kit.extra.actionData", function(a) {
    return function(b) {
        return {set: function(c, d) {
                if (!!a.isNode(b)) {
                    var e = a.queryToJson(b.getAttribute("action-data") || "") || {};
                    e[c] = d;
                    b.setAttribute("action-data", a.jsonToQuery(e))
                }
            },del: function(c) {
                if (!!a.isNode(b)) {
                    var d = a.queryToJson(b.getAttribute("action-data") || "") || {};
                    delete d[c];
                    b.setAttribute("action-data", a.jsonToQuery(d))
                }
            },get: function(c) {
                if (!a.isNode(b))
                    return "";
                var d = a.queryToJson(b.getAttribute("action-data") || "") || {};
                return d[c] || ""
            }}
    }
});
STK.register("common.feed.groupAndSearch.template.closeFriendType", function() {
    var a = '<#et userlist data><#list data.list as list><li action-type="cf_tab_change" action-data="cftype=${list.id}"${data.current==list.id?\' class="current S_txt1"\':\'\'}><#if (data.current==list.id)><span>${list.name}</span><#else><a href="${list.url}">${list.name}</a></#if></li><#if (data.count!=list.id)><li class="W_vline">|</li></#if></#list>';
    return a
});
STK.register("common.feed.groupAndSearch.filter.homeFeed", function(a) {
    var b = a.kit.extra.parseURL(), c = a.kit.extra.language, d = a.core.util.easyTemplate, e = c("#L{搜索关注人说的话}"), f = c("#L{收起}"), g = c("#L{展开}"), h = c("#L{查找作者、内容或标签}"), i = c("#L{全部}"), j = c("#L{原创}"), k = c("#L{图片}"), l = c("#L{视频}"), m = c("#L{音乐}"), n = c('<a class="W_btn_round2" title="#L{按由新到旧的微博发表时间排序}" href="javascript:void(0);"><span><i class="W_ico16 icon_bytime"></i>#L{时间排序}<em class="W_arrow"><em class="down" node-type="mblog_sort_arrow">◆</em></em></span></a>'), o = c('<a class="W_btn_round2" title="#L{按你对微博感兴趣程度排序}" href="javascript:void(0);"><span><i class="W_ico16 icon_bypopular"></i>#L{智能排序}<em class="W_arrow"><em class="down" node-type="mblog_sort_arrow">◆</em></em></span></a>'), p = a.common.feed.groupAndSearch.filter.base;
    return function(c, f) {
        var g = new p(c, f), q, r = 0, s = 0;
        g.defineCustEvent = function() {
            this.custKeySearch = a.core.evt.custEvent.define(this, "search");
            this.custKeyNewFeed = a.core.evt.custEvent.define(this, "newFeed");
            this.custSmartSort = a.core.evt.custEvent.define(this, "smartSort");
            this.custChangeFeedType = a.core.evt.custEvent.define(this, "changeFeedType")
        };
        g.undefineCustEvt = function(b) {
            b ? a.core.evt.custEvent.undefine(this, b) : a.core.evt.custEvent.undefine(this)
        };
        g.hostDomain = b.path;
        g.defaultCount = 15;
        g.defaultSearchTip = [e, h];
        g.feedType = a.common.feed.groupAndSearch.template.feedType;
        g.init = function(a) {
            s = this.nodes.cnt ? this.nodes.cnt.getAttribute("mblogsorttype") ? this.nodes.cnt.getAttribute("mblogsorttype") : "0" : "0";
            var b = a.pageQuery;
            this.config = b;
            if (b != null && b.is_search == "1")
                this.isAdvSearched = !0;
            else if (b != null) {
                this.config.currentType = 0;
                b.is_ori && b.is_ori == "1" && (this.config.currentType = 1);
                b.is_pic && b.is_pic == "1" && (this.config.currentType = 2);
                b.is_video && b.is_video == "1" && (this.config.currentType = 3);
                b.is_music && b.is_music == "1" && (this.config.currentType = 4)
            }
        };
        g.newFeedNotify = function(b) {
            var c = b.count;
            !c || this.isAdvSearched != !0 && a.core.evt.custEvent.fire(this.custKeyNewFeed, "newFeed", [b])
        };
        g.advDisplayToggle = function(b, c) {
            b = b || this.nodes.search;
            c = c * 1;
            var d = a.domPrev(b);
            if (c == 0) {
                a.setStyle(this.nodes.feed_nav_adv, "display", "none");
                a.setStyle(this.nodes.search_adv_rightbar, "display", "none");
                a.setStyle(this.nodes.search, "display", "")
            } else {
                var e = a.kit.extra.parseURL().url;
                if (e.indexOf("ismiyou=1") == -1) {
                    a.setStyle(this.nodes.feed_nav_adv, "display", "");
                    a.setStyle(this.nodes.search_adv_rightbar, "display", "")
                }
                a.setStyle(this.nodes.search, "display", "none")
            }
        };
        g.advSearchToggle = function(a, b) {
            a = a || this.nodes.search;
            b = b * 1;
            var c, d, e;
            b == null && (b = this.isAdvSearched != null && this.isAdvSearched == !0 ? 0 : 1);
            c = this.config.gid;
            d = this.config.currentType;
            this.reset();
            this.config.gid = c;
            this.config.currentType = d;
            this.nodes.searchForm.reset();
            if (b == 0) {
                this.advDisplayToggle(null, 0);
                this.config.currentType > 0 && this.config.currentType < 5 && this.setAdvForm(this.config.currentType)
            } else if (b == 1) {
                this.advDisplayToggle(null, 1);
                if (this.isAdvSearched != null && this.isAdvSearched == !0 || this.config.currentType == null) {
                    this.searchFilterChange(0);
                    this.clearSimpleSearch()
                }
                this.isAdvSearched = null;
                return
            }
        };
        var t;
        g.clearSimpleSearch = function() {
            if (typeof t == "undefined") {
                var a = document.createElement("input");
                t = "placeholder" in a;
                a = null
            }
            t ? this.nodes.simpleSearch.value = "" : this.nodes.simpleSearch.value = h
        };
        g.searchStart = function() {
            this.isAdvSearched = !0;
            this.hasError != !0 && this.collectParameter(this.nodes.searchForm);
            this.setSmartUI(0);
            if (!this.nodes.keyword || a.trim(this.nodes.keyword.value) != "" && a.trim(this.nodes.simpleSearch.value) != e)
                if (window.WBAD && window.WBAD.refresh) {
                    var b = {rt: 2};
                    window.WBAD.refresh(b)
                }
        };
        g.searchKeyword = function() {
            if (!this.nodes.simpleSearch || a.trim(this.nodes.simpleSearch.value) != "" && a.trim(this.nodes.simpleSearch.value) != h) {
                if (this.hasError != !0) {
                    this.isAdvSearched = !0;
                    this.collectParameter(this.nodes.singleForm)
                }
                this.config.key_word = a.trim(this.nodes.simpleSearch.value);
                this.setSearchTypeUI();
                this.setSmartUI(0);
                if (window.WBAD && window.WBAD.refresh) {
                    var b = {rt: 2};
                    window.WBAD.refresh(b)
                }
            }
        };
        g.switchTabs = function(b) {
            var c = this.nodes.feed_type_tabs;
            if (!!a.isNode(c)) {
                var d = b + "_tab", e = a.sizzle("li.current", c);
                a.foreach(e, function(b) {
                    a.removeClassName(b, "current");
                    var c = a.builder(b).list;
                    c.bg && a.removeNode(c.bg[0])
                });
                var f = '<div class="W_tabarrow_big S_bg4" node-type="bg"></div>', g = a.builder(c).list;
                if (g[d]) {
                    var h = g[d][0];
                    a.addClassName(h, "current");
                    a.insertHTML(h, f, "beforeend")
                }
            }
        };
        g.orderByTime = function() {
            this.advDisplayToggle(null, 1);
            a.setStyle(this.nodes.activity_nav, "display", "none");
            a.setStyle(this.nodes.activity_help, "display", "none");
            var b = this.config.gid, c = this.config.ismiyou, d = this.config.whisper;
            this.reset();
            this.config.gid = b;
            this.config.ismiyou = c;
            this.config.whisper = d;
            this.setSearchTypeUI(0);
            var e = {count: 15,gid: b,ismiyou: c,whisper: d,isGroupAll: f}, f = this.isGroupAll() && "" + this.config.whisper != "1" && "" + this.config.ismiyou != "1";
            s != "1" || !f ? e.mblogsort = 2 : e.mblogsort = 1;
            a.core.evt.custEvent.fire(this.custKeySearch, "search", ["search", e, {isGroupAll: !0,isFilterAll: !0}]);
            s == "1" && f ? this.setSmartUI(1) : this.setSmartUI(0);
            this.switchTabs("feed_group");
            var g = this.getFeedType();
            a.core.evt.custEvent.fire(this.custChangeFeedType, "changeFeedType", [{feedType: g}])
        };
        g.orderByActivity = function() {
            this.setSmartUI(0);
            a.setStyle(this.nodes.feed_nav_adv, "display", "none");
            a.setStyle(this.nodes.activity_nav, "display", "");
            a.setStyle(this.nodes.activity_help, "display", "");
            a.setStyle(this.nodes.search_adv_rightbar, "display", "none");
            a.setStyle(this.nodes.search, "display", "none");
            var b = this.config.gid, c = this.config.ismiyou, d = this.config.whisper;
            this.reset();
            this.config.gid = b;
            this.config.ismiyou = c;
            this.config.whisper = d;
            this.config.activity = 1;
            this.switchTabs("feed_activity");
            var e = this.isGroupAll() && "" + this.config.whisper != "1" && "" + this.config.ismiyou != "1", f = {count: 15,gid: b,ismiyou: c,whisper: d,isGroupAll: e,activity: 1};
            a.core.evt.custEvent.fire(this.custKeySearch, "search", ["search", f, {isGroupAll: !0,isFilterAll: !1}]);
            var g = this.getFeedType();
            a.core.evt.custEvent.fire(this.custChangeFeedType, "changeFeedType", [{feedType: g}])
        };
        g.setGroupUI = function() {
        };
        g.setGroupLayerUI = function() {
        };
        g.setSearchTypeUI = function(b) {
            b = b != null ? b : this.config.currentType;
            var c = a.kit.extra.language(this.feedType), e = d(c), f = a.kit.extra.parseURL();
            f = "/" + f.path;
            var g, h;
            if (this.config.whisper == 1) {
                f += "?whisper=1";
                this.config.key_word != null && (f += "&key_word=" + this.config.key_word + "&is_search=1");
                h = "&"
            } else {
                g = this.config.gid;
                g = g == null || g * 1 == 0 ? "" : "?gid=" + g;
                h = g == "" ? "?" : "&";
                f += g;
                if (this.config.key_word != null) {
                    f += h + "key_word=" + encodeURIComponent(this.config.key_word) + "&is_search=1";
                    h = "&"
                }
            }
            var n = {list: [{id: 0,name: i,url: f,suda: "all"}, {id: 1,name: j,url: f + h + "is_ori=1",suda: "org"}, {id: 2,name: k,url: f + h + "is_pic=1",suda: "pic"}, {id: 3,name: l,url: f + h + "is_video=1",suda: "video"}, {id: 4,name: m,url: f + h + "is_music=1",suda: "music"}],count: 4,current: b * 1}, o = e(n);
            this.nodes.feedType.innerHTML = o
        };
        g.searchFilterChange = function(a) {
            a != "0" && delete this.config.mblogsort;
            var b = this.config.gid, c = this.config.key_word, d = this.config.whisper, e = this.config.ismiyou, f = this.config.mblogsort;
            this.reset();
            this.config.gid = b;
            c != null && (this.config.is_search = 1);
            this.config.key_word = c;
            this.config.whisper = d;
            this.config.ismiyou = e;
            switch (a) {
                case "0":
                    this.config.isAllType = 1;
                    break;
                case "1":
                    this.config.is_ori = 1;
                    break;
                case "2":
                    this.config.is_pic = 1;
                    break;
                case "3":
                    this.config.is_video = 1;
                    break;
                case "4":
                    this.config.is_music = 1
            }
            this.config.currentType = a;
            this.setSearchTypeUI();
            var g = this.isGroupAll() && this.config.is_search != 1 && "" + this.config.whisper != "1" && "" + this.config.ismiyou != "1";
            f && g && (this.config.mblogsort = f);
            g && s == "1" && a == "0" && this.config.isAllType && this.config.isAllType == 1 ? this.setSmartUI(1) : this.setSmartUI(0);
            this.collectParameter()
        };
        g.isGroupAll = function() {
            var a = !0;
            this.config != null && this.config.gid != null && (a = this.config.gid ? !1 : !0);
            return a
        };
        g.reset = function() {
            this.config = {}
        };
        g.smartSort = function(b) {
            if (!b) {
                var c = a.sizzle("[action-type='order_by_smart']", this.nodes.smartSortMore)[0];
                b = {el: c,data: a.queryToJson(c.getAttribute("action-data"))}
            }
            var d = a.kit.extra.actionData(this.nodes.smartSortSelect);
            d.set("cur", b.data.cur);
            s = 1;
            delete this.config.gid;
            this.setSmartUI(1);
            this.reset();
            this.setSearchTypeUI(0);
            this.config.stateNum = r;
            r = 0;
            this.config.mblogsort = 1;
            this.collectParameter();
            a.core.evt.custEvent.fire(this.custSmartSort, "smartSort", ["nowIsSmartSort"])
        };
        g.setSmartUI = function(b) {
            var c = this.nodes.smartSortSelect, d = this.nodes.smartSortMore;
            c && (c.innerHTML = b ? o : n);
            d && (d.style.display = "none");
            var e = b ? "smart" : "time", f = a.kit.extra.actionData(this.nodes.smartSortSelect);
            f.set("cur", e)
        };
        g.smartBackHome = function(b) {
            var c = a.kit.extra.actionData(this.nodes.smartSortSelect);
            c.set("cur", b.data.cur);
            delete this.config.mblogsort;
            s = 0;
            this.config.mblogsort = 2;
            this.setSmartUI(0);
            this.searchFilterChange(0)
        };
        g.getIsSmartSort = function() {
            return s == "1"
        };
        g.smartSortSelect = function(b) {
            var c = this.nodes.smartSortMore, d = this.nodes.smartSortSelect, e = this;
            if (c && d) {
                var f = function(b) {
                    var c = a.sizzle("[node-type='mblog_sort_arrow']", e.nodes.cnt)[0];
                    if (!!c)
                        if (b == "up") {
                            a.removeClassName(c, "down");
                            a.addClassName(c, "up")
                        } else if (b == "down") {
                            a.removeClassName(c, "up");
                            a.addClassName(c, "down")
                        }
                }, g = c.style.display;
                if (g == "none") {
                    var h = b.data.cur, i = a.sizzle("[action-type='order_by_smart'],[action-type='smart_back_home']", c);
                    a.foreach(i, function(b) {
                        var c = a.queryToJson(b.getAttribute("action-data") || "");
                        c.cur == h ? a.setStyle(b, "display", "none") : a.setStyle(b, "display", "")
                    });
                    a.core.evt.custEvent.fire(this.custSmartSort, "smartSort", ["select"])
                }
                var j = function(b) {
                    var e = b ? a.core.evt.fixEvent(b).target : null;
                    if (e && !a.core.dom.contains(c, e) && !a.core.dom.contains(d, e)) {
                        a.core.dom.setStyle(c, "display", "none");
                        a.removeEvent(document.body, "click", j);
                        f("down")
                    }
                };
                if (g == "none") {
                    f("up");
                    a.core.dom.setStyle(c, "display", "");
                    a.addEvent(document.body, "click", j)
                } else {
                    f("down");
                    a.core.dom.setStyle(c, "display", "none");
                    a.removeEvent(document.body, "click", j)
                }
            }
        };
        g.getGroupInfo = function() {
            var a = this.isGroupAll();
            return a ? "" + this.config.whisper == "1" ? "whisper" : "" + this.config.ismiyou == "1" ? "ismiyou" : 0 : this.config.gid
        };
        g.getFeedType = function() {
            var a = "1" == "" + this.config.activity;
            return a ? "activity" : "mblog"
        };
        return g
    }
});
STK.register("common.feed.groupAndSearch.homeFeed", function(a) {
    return function(b, c) {
        if (b != null) {
            c = c || {};
            var d = c.isBigPipe, e = a.core.dom.builder(b);
            e.list = a.kit.dom.parseDOM(e.list);
            var f = e.list;
            f.cnt = e.box;
            var g = a.common.feed.groupAndSearch.filter.homeFeed(f);
            g.initFilter(c);
            var h = a.common.feed.groupAndSearch.homeFeedDelegateEvent(f, g, c);
            g.destroy = function() {
                h.destroy();
                g.undefineCustEvt()
            };
            return g
        }
    }
});
STK.register("common.feed.inter.feedInter", function(a) {
    function b(b) {
        this.custKeySuccess = a.core.evt.custEvent.define(this, "success");
        this.custKeyFailure = a.core.evt.custEvent.define(this, "failure");
        this.init(b.pageQuery)
    }
    b.prototype = {param: null,defaultConfig: {gid: 0,is_ori: 0,is_forward: 0,is_pic: 0,is_video: 0,is_music: 0,is_tag: 0,is_text: 0,key_word: null,start_time: null,end_time: null,page: 0,count: 0,since_id: 0,max_id: 0,pre_page: 0,end_id: 0,is_search: 0,whisper: 0,tag_name: null,rank: 0,is_mood: 0,mblogsort: 0,max_msign: 0,end_msign: 0,profile_ftype: 0,ismiyou: 0,cftype: 0,activity: 0,preview: 0,app_type: 0,filtered_min_id: 0},pageParam: ["page", "count", "since_id", "max_id", "pre_page", "end_id", "pagebar", "uid", "max_msign", "end_msign", "filtered_min_id"],extraParam: ["activity_id", "ac_page"],key: [],init: function(b) {
            b = a.core.json.clone(b);
            for (var c in b)
                c in this.defaultConfig || delete b[c];
            this.initQuery = b
        },evtSearch: function() {
            var b = arguments, c = b[1], d = b[2];
            this.type = c;
            this.param = {};
            for (var e in d)
                this.param[e] = d[e];
            this.key = [];
            var f = a.core.util.getUniqueKey();
            this.param._k = f;
            this.key.push(f);
            this.collectParameter(c)
        },evtRequest: function() {
            var b = arguments, c = b[1], d = b[2] || {};
            this.type = c;
            this.param == null && (this.param = this.initQuery != null ? a.core.json.clone(this.initQuery) : {});
            var e = this.pageParam;
            for (var f = 0, g = e.length; f < g; f++) {
                var h = e[f];
                d[h] != null ? this.param[h] = d[h] : delete this.param[h]
            }
            var i = this.extraParam;
            for (var f = 0, g = i.length; f < g; f++) {
                var h = i[f];
                d[h] != null ? this.param[h] = d[h] : delete this.param[h]
            }
            h = a.core.util.getUniqueKey();
            this.type == "newFeed" || this.type == "lazyload" ? this.key.push(h) : this.key = [];
            this.param._k = h;
            this.key.push(h);
            this.collectParameter(c)
        },getTrans: function() {
            if (this.inter == null) {
                var b = this.trans, c = this;
                b = b.getTrans(this.transKey, {onSuccess: function(b, d) {
                        c.key.join(",").indexOf(b.key) != -1 && a.core.evt.custEvent.fire(c.custKeySuccess, "success", [b.data, c.type])
                    },onError: function(b, d) {
                        a.core.evt.custEvent.fire(c.custKeyFailure, "failure", [b.data, c.type])
                    },onFail: function(b, d) {
                        a.core.evt.custEvent.fire(c.custKeyFailure, "failure", ["", c.type])
                    },noQueue: !0});
                this.inter = b
            }
            return this.inter
        },collectParameter: function(b) {
            this.type != "lazyload" && this.type != "newFeed" && this.isBigPipe && this.setHash(this.param);
            var c = this.getTrans(), d;
            if (this.param.key_word) {
                var e = encodeURIComponent(this.param.key_word);
                d = a.kit.extra.merge(this.param, {key_word: e})
            } else
                d = this.param;
            c.request(d)
        },setHash: function(b) {
            b = a.core.json.clone(b);
            var c = ["count", "pagebar"];
            for (var d = 0, e = c.length; d < e; d++)
                c[d] in b && delete b[c[d]];
            var f = a.core.json.clone(this.defaultConfig);
            for (var g in f)
                b[g] != null ? f[g] = b[g] : f[g] = null;
            STK.historyM.setQuery(f)
        }};
    return b
});
STK.register("common.feed.inter.homeFeedInter", function(a) {
    var b = function(b) {
        this.custKeySuccess = a.core.evt.custEvent.define(this, "success");
        this.custKeyFailure = a.core.evt.custEvent.define(this, "failure");
        this.init(b.pageQuery);
        this.isBigPipe = b != null && b.isBigPipe
    }, c = a.common.feed.inter.feedInter.prototype;
    for (var d in c)
        b.prototype[d] = c[d];
    b.prototype.trans = a.common.trans.feed;
    b.prototype.transKey = "homeSearch";
    b.prototype.setHash = function(b) {
        b = a.core.json.clone(b);
        var c = ["count", "pagebar"];
        for (var d = 0, e = c.length; d < e; d++)
            c[d] in b && delete b[c[d]];
        var f = a.core.json.clone(this.defaultConfig);
        for (var g in f)
            b[g] != null ? f[g] = b[g] : f[g] = null;
        f.lf = null;
        STK.historyM.setQuery(f)
    };
    b.prototype.destroy = function(b) {
        b ? a.core.evt.custEvent.undefine(this, b) : a.core.evt.custEvent.undefine(this)
    };
    return function(a) {
        return new b(a)
    }
});
STK.register("common.trans.favorite", function(a) {
    var b = a.kit.io.inter(), c = b.register;
    c("add", {url: "/aj/fav/mblog/add?_wv=5",method: "post"});
    c("del", {url: "/aj/fav/mblog/del?_wv=5",method: "post"});
    c("change", {url: "/aj/fav/tag/renew?_wv=5",method: "get"});
    c("tagList", {url: "/aj/fav/tag/list?_wv=5",method: "get"});
    c("delTag", {url: "/aj/fav/tag/destroy?_wv=5",method: "post"});
    c("updateTag", {url: "/aj/fav/tag/update?_wv=5",method: "post"});
    c("alter", {url: "/aj/fav/tag/alter?_wv=5",method: "post"});
    c("favlist", {url: "/aj/fav/mblog/favlist?_wv=5",method: "get"});
    c("getFav", {url: "/aj/fav/mblog/byTag?_wv=5",method: "get"});
    c("saveTag", {url: "/aj/fav/mblog/save?_wv=5",method: "post"});
    c("legend", {url: "/aj/fav/mblog/legend?_wv=5",method: "get"});
    c("edit", {url: "/aj/fav/tag/edit?_wv=5",method: "get"});
    return b
});
STK.register("common.feed.feedList.utils", function(a) {
    var b = a.kit.dom.parentAttr, c = a.core.evt.preventDefault, d = {getMid: function(a, c) {
            return a.mid || (a.mid = b(a, "mid", c))
        },getFeedNode: function(b, c) {
            var e = d.getMid(b, c), f = d.getFeeds(c, 'mid="' + e + '"');
            for (var g = 1; g < f.length; g++)
                if (a.contains(f[g], b))
                    return f[g];
            return f[0]
        },getFeeds: function(b, c) {
            return a.sizzle("[" + c + "]", b)
        },preventDefault: function(b) {
            a.preventDefault();
            return !1
        },getFeedTrans: a.common.trans.feed.getTrans,getFavoriteTrans: a.common.trans.favorite.getTrans};
    return d
});
STK.register("common.feed.feedList.feedTemps", function(a) {
    var b = a.kit.extra.language, c = $CONFIG.imgPath + "/style/images/common/loading.gif";
    return {loadingIMG: b('<div class="W_loading"><span>#L{正在加载，请稍候}...</span></div>'),newFeedTipHTML: b('<a node-type="feed_list_newBar" action-type="feed_list_newBar" class="notes" href="javascript:void(0);">#L{有} [n] #L{条新微博}，#L{点击查看}</a>'),activityNewFeedTipHTML: b('<a node-type="feed_list_newBar" action-type="feed_list_newBar" class="notes" href="javascript:void(0);">#L{有} [n] #L{条新动态}，#L{点击查看}</a>'),newCloseFriendFeed: b('<a node-type="feed_list_newBar" action-type="feed_list_newBar" class="notes" href="javascript:void(0);">#L{有新密友微博}，#L{点击查看}</a>'),loadingHTML: b('<div class="W_loading" requestType="[n]"><span>#L{正在加载，请稍候}...</span></div>'),loadErrorRetryHTML: b('<div class="zero_tips S_txt2"><span>#L{加载失败}，<a action-type="feed_list_retry" requestType="[n]" href="javascript:void(0)">#L{请重试}</a></span></div>'),loadErrorEndHTML: b('<div class="zero_tips S_txt2" requestType="[n]"><span>#L{加载失败}。</span></div>'),mediaIMGTEMP: b('<#et temp data><p class="medis_func S_txt3"><a action-type="feed_list_media_toSmall"  href="javascript:void(0);" class="retract" <#if (data.suda && data.suda.retract)>suda-data="${data.suda.retract}"</#if>><em class="W_ico12 ico_retract"></em>#L{收起}</a><i class="W_vline">|</i><a href="${data.largeSrc}" target="_blank" class="show_big" <#if (data.suda && data.suda.showBig)>suda-data="${data.suda.showBig}"</#if>><em class="W_ico12 ico_showbig"></em>#L{查看大图}</a><i class="W_vline">|</i><a action-type="feed_list_media_toLeft" href="javascript:void(0);" class="turn_left" <#if (data.suda && data.suda.left)>suda-data="${data.suda.left}"</#if>><em class="W_ico12 ico_turnleft"></em>#L{向左转}</a><i class="W_vline">|</i><a action-type="feed_list_media_toRight" <#if (data.suda && data.suda.right)>suda-data="${data.suda.right}"</#if> href="javascript:void(0);" class="turn_right"><em class="W_ico12 ico_turnright"></em>#L{向右转}</a></p><div class="smallcursor"  action-type="feed_list_media_bigimgDiv" <#if (data.suda && data.suda.big)>suda-data="${data.suda.big}"</#if>><img dynamic-id="${data.uniqueId}"   action-type="feed_list_media_bigimg" src="${data.bigSrc}" width="${data.bigWidth}"/></div></#et>'),mediaVideoMusicTEMP: b('<#et temp data><p class="medis_func S_txt3"><a href="javascript:void(0);" action-type="feed_list_media_toSmall" class="retract"><em class="W_ico12 ico_retract"></em>#L{收起}</a><i class="W_vline">|</i><a href="${data.short_url}" title="${data.fTitle}" class="show_big" target="_blank"><em class="W_ico12 ico_showbig"></em>${data.title}</a><i class="W_vline">|</i><a action-type="feed_list_media_toFloat" action-data="title=${data.fTitle}" href="javascript:void(0);" class="turn_right">#L{弹出}</a></p><div node-type="feed_list_media_big${data.type}Div" style="text-align:center;min-height:18px;"><img class="loading_gif" src="' + c + '"/></div>' + "</#et>"),mediaVideoMusicFloatTEMP: b('<#et temp data><div node-type="outer" class="W_layer" style=""><div class="bg"><table border="0" cellspacing="0" cellpadding="0"><tr><td><div class="content"><div class="title"><h3>${data.title}</h3></div><a href="####" onclick="return false;" node-type="close" class="W_close"></a><div node-type="mediaContent" style="text-align:center;width:440px;"><img style="margin:10px;" class="loading_gif" src="' + c + '"/></div>' + "</div>" + "</td>" + "</tr>" + "</table>" + "</div>" + "</div>" + "</#et>"),widgetTEMP: b('<#et temp data><p class="medis_func S_txt3"><a href="javascript:void(0);" action-type="feed_list_media_toSmall" class="retract"><em class="W_ico12 ico_retract"></em>#L{收起}</a><i class="W_vline">|</i><a <#if (data.suda)>suda-data="${data.suda}"</#if> href="${data.full_url}" title="${data.full_url}" class="show_big" target="_blank"><em class="W_ico12 ico_showbig"></em>${data.title}</a></p><div node-type="feed_list_media_widgetDiv"><img class="loading_gif" src="' + c + '"/></div>' + "</#et>"),qingTEMP: b('<#et temp data><p class="medis_func S_txt3"><a href="javascript:void(0);" action-type="feed_list_media_toSmall" class="retract"><em class="W_ico12 ico_retract"></em>#L{收起}</a><i class="W_vline">|</i><a <#if (data.suda)>suda-data="${data.suda}"</#if> href="${data.full_url}" title="${data.full_url}" class="show_big" target="_blank"><em class="W_ico12 ico_showbig"></em>${data.title}</a></p><div node-type="feed_list_media_qingDiv"><img class="loading_gif" src="' + c + '"/></div>' + "</#et>"),commonMediaTEMP: b('<#et temp data><p class="medis_func S_txt3"><a href="javascript:void(0);" action-type="common_list_media_hide" action-data="type=${data.type}&id=${data.id}" suda-data="key=tblog_activity_click&value=fold_play" class="retract"><em class="W_ico12 ico_retract"></em>#L{收起}</a><i class="W_vline">|</i><a href="${data.url}" title="${data.title}" class="show_big" target="_blank" suda-data="key=tblog_activity_click&value=url_click"><em class="W_ico12 ico_showbig"></em>${data.title}</a><#if (data.tofloat)><i class="W_vline">|</i><a action-type="common_list_media_toFloat" action-data="title=${data.title}&type=${data.type}&id=${data.id}" href="javascript:void(0);" class="turn_right" suda-data="key=tblog_activity_click&value=bomb_play">#L{弹出}</a></#if></p><div node-type="common_list_media_Div" style="text-align:center;min-height:18px;"><img class="loading_gif" src="' + c + '"/></div>' + "</#et>"),translateTEMP: b('<#et temp data><div class="layer_tips" node-type="feed_translate" style="position:absolute;"><a class="W_ico12 icon_close" href="javascript:void(0)" suda-data="key=tblog_bowen_translate&value=close_button" action-type="feed_translate_close"></a><div class="S_txt2">#L{翻译结果}:</div><div node-type="translate_rs">${data.text}</div><div class="copyright S_txt2"><span class="cr_l">#L{翻译结果由}<a href="http://weibo.com/youdaocidian" target="_blank" suda-data="key=tblog_bowen_translate&value=click_youdao_link" title="#L{有道词典}">#L{有道词典}</a>#L{提供，仅供参考}。</span> <a href="javascript:void(0)" suda-data="key=tblog_bowen_translate&value=click_i_translate" action-type="feed_translate_by_me" action-data="${data.bymedata}">#L{我来翻译}</a></div></div></#et>')}
});
STK.register("kit.dom.lastChild", function(a) {
    var b = a.core.dom.prev;
    return function(a) {
        var c = a.lastChild;
        c && c.nodeType != 1 && (c = b(c));
        return c
    }
});
STK.register("common.channel.window", function(a) {
    return a.common.listener.define("common.channel.window", ["scroll"])
});
STK.register("common.extra.lazyload", function(a) {
    function f() {
        clearTimeout(c);
        c = setTimeout(e, 300)
    }
    function e() {
        var b = a.core.util.scrollPos(), c = a.core.util.pageSize(), d = {scrollLeft: b.left,scrollTop: b.top,winWidth: c.win.width,winHeight: c.win.height,pageWidth: c.page.width,pageHeight: c.page.height};
        a.common.channel.window.fire("scroll", d)
    }
    function d(b, c, d, e) {
        var f, g, h, i = b.length, j = new Date;
        if (b.length > 0)
            for (var k = b.length - 1; k >= 0; k--) {
                f = b[k];
                h = d.parent ? f.parentNode : f;
                g = a.core.dom.position(h).t;
                if (g > e.top && g < e.bottom) {
                    b.splice(k, 1);
                    c(f)
                }
            }
    }
    var b = !1, c;
    return function(c, e, g) {
        if (b == !1) {
            b = !0;
            a.addEvent(window, "scroll", f);
            a.addEvent(window, "resize", f);
            f()
        }
        var h = function(b) {
            var f = {type: "",threshold: 600,parent: !1,over: !1};
            f = a.core.obj.parseParam(f, g);
            d(c, e, g, {top: f.over ? 0 : b.scrollTop,bottom: parseInt(b.scrollTop + b.winHeight + f.threshold, 10)})
        };
        a.common.channel.window.register("scroll", h);
        var i = {destroy: function() {
                a.common.channel.window.remove("scroll", h)
            }};
        return i
    }
});
STK.register("common.feed.feedList.baseFeedList", function(a) {
    var b = a.common.feed.feedList.utils, c = a.common.feed.feedList.feedTemps, d = a.kit.dom.firstChild, e = a.kit.dom.lastChild, f = a.core.dom.insertElement, g = new Date, h = function(b) {
        a.custEvent.fire(b, "clearTips", "base")
    }, i = function(b, e) {
        var f;
        switch (b) {
            case "waiting":
                f = c.loadingHTML;
                break;
            case "retry":
                f = c.loadErrorRetryHTML;
                break;
            case "end":
                f = c.loadErrorEndHTML
        }
        return d(a.builder(f.replace("[n]", e)).box)
    };
    return function(c, j) {
        a.isNode(c) || a.log("baseFeedList : parameter node is not a document node!");
        j = a.parseParam({page: 1,end_id: ""}, j);
        var k = {}, l = a.core.evt.delegatedEvent(c), m, n, o = 0, p = parseInt(j.page), q = !1, r = {}, s = j.end_id;
        l.add("feed_list_retry", "click", function(d) {
            h(c);
            var e = d.el.getAttribute("requestType"), f = k[e];
            f.top ? u("waiting", e) : v("waiting", e);
            a.custEvent.fire(x, "request", [e, r[e].data]);
            return b.preventDefault(d.evt)
        });
        var t = function() {
            if (p < 2) {
                var a = x.getFirstFeed();
                a && (s = a.getAttribute("mid"))
            }
        }, u = function(a, b) {
            q = !0;
            x.removeTopNode();
            f(c, m = i(a, b), "afterbegin")
        }, v = function(a, b) {
            x.removeBottomNode();
            c.appendChild(n = i(a, b))
        }, w = !0, x = {extra: {},extraData: {},getNode: function() {
                return c
            },getNewBar: function() {
                return a.sizzle('[node-type="feed_list_newBar"]', c)
            },removeNewBar: function() {
                var b = x.getNewBar();
                b && b.length > 0 && a.core.dom.removeNode(b[0])
            },clearNewBar: function() {
                var b = x.getNewBar();
                if (b && b.length > 0)
                    for (var c in b)
                        a.core.dom.removeNode(b[c]);
                m = null
            },getRecommend: function() {
                return a.sizzle('[node-type="feed_list_recommend"]', c)
            },removeRecommend: function() {
                var b = x.getRecommend();
                if (b && b.length > 0)
                    for (var c in b)
                        a.core.dom.removeNode(b[c])
            },getNodeList: function() {
                var b = a.sizzle('div[action-type="feed_list_item"]', c);
                return b.length ? b : !1
            },getDEvent: function() {
                return l
            },removeTopNode: function() {
                a.removeNode(m);
                m = null
            },setTopNode: function(a) {
                m = a
            },removeBottomNode: function() {
                a.removeNode(n);
                n = null
            },setBottomNode: function(a) {
                n = a
            },getEndId: function() {
                return s
            },isTopWaiting: function() {
                return q
            },getCurrentPage: function() {
                return p
            },setCurrentPage: function(a) {
                p = a
            },getFeedCount: function() {
                return b.getFeeds(c, 'action-type="feed_list_item"').length
            },setRequestAction: function(b, c) {
                k[b] = a.parseParam({top: !1,center: !1,bottom: !1}, c)
            },setRequestData: function(a, b) {
                r[a] = {data: b,time: 0}
            },getExtraData: function(a) {
                return x.extraData[a]
            },setExtraData: function(a, b) {
                x.extraData[a] = b
            },setExtraFunction: function(a, b) {
                x.extra[a] = b
            },regCustEvent: function(b, c) {
                a.custEvent.define(x, b);
                a.custEvent.add(x, b, c)
            },isFeed: function(a) {
                return a.getAttribute("mid") && !a.getAttribute("feedtype") ? !0 : !1
            },getFirstFeed: function() {
                var b = d(c);
                while (b && !x.isFeed(b))
                    b = a.core.dom.next(b);
                return b
            },getLastFeed: function() {
                var b = e(c);
                while (!x.isFeed(b))
                    b = a.core.dom.prev(b);
                return b
            },getFirstFeedId: function() {
                var b = x.getFirstFeed();
                if (b) {
                    for (var c = 0; c < o && b; c++)
                        b = a.core.dom.next(b);
                    if (b)
                        return b.getAttribute("mid")
                }
            },getLastFeedId: function() {
                var b = a.sizzle('[node-type="feed_list_shieldKeyword"]', c)[0], d = b ? b : e(c), f = n ? a.core.dom.prev(n) : a.core.dom.prev(d);
                if (f)
                    return f.getAttribute("mid")
            },getFirstFeedAttr: function(b) {
                var c = x.getFirstFeed();
                if (c) {
                    for (var d = 0; d < o && c; d++)
                        c = a.core.dom.next(c);
                    if (c)
                        return c.getAttribute(b)
                }
                return ""
            },getLastFeedAttr: function(b) {
                var d = a.sizzle('[node-type="feed_list_shieldKeyword"]', c)[0], f = d ? d : e(c), g = n ? a.core.dom.prev(n) : a.core.dom.prev(f);
                return g ? g.getAttribute(b) : ""
            },showZeroTip: function() {
                var b = a.sizzle('div[node-type="feed_list_zero"]', c)[0];
                b && (b.style.display = "")
            },hideZeroTip: function() {
                var b = a.sizzle('div[node-type="feed_list_zero"]', c)[0];
                b && (b.style.display = "none")
            },insertFakeFeed: function(b) {
                if (typeof b != "string")
                    a.log("insertFakeFeed feedHtml is not String!");
                else {
                    x.hideZeroTip();
                    o++;
                    var d = a.C("div");
                    d.innerHTML = b;
                    var e = a.sizzle('div[action-type="feed_list_item"]', d);
                    e = e[0];
                    var f = a.core.util.scrollPos().top;
                    m ? a.core.dom.insertBefore(e, m) : a.core.dom.insertElement(c, e, "afterbegin");
                    if (f > 350) {
                        var g = a.core.dom.getSize(e).height, h = f + g - 1;
                        document.body.scrollTop = h;
                        document.documentElement.scrollTop = h
                    }
                }
            },updateFeed: function(b, e) {
                if (b && e && k[e]) {
                    x.hideZeroTip();
                    var f = k[e];
                    if (f.top) {
                        q = !1;
                        x.removeTopNode();
                        for (var g = 0; g < o; g++)
                            a.removeNode(d(c));
                        o = 0;
                        a.insertHTML(c, b, "afterbegin")
                    } else if (f.bottom) {
                        x.removeBottomNode();
                        a.insertHTML(c, b)
                    }
                    a.custEvent.fire(x, "updateFeed", [e, b])
                }
            },showWait: function(b) {
                if (b && k[b]) {
                    var d = k[b];
                    if (d.top) {
                        u("waiting", b);
                        d.bottom && x.removeBottomNode()
                    } else
                        d.bottom && v("waiting", b);
                    if (d.center) {
                        m && a.core.util.hideContainer.appendChild(m);
                        n && a.core.util.hideContainer.appendChild(n);
                        c.innerHTML = "";
                        m && c.appendChild(m);
                        n && c.appendChild(n)
                    }
                    r[b].time = 0
                }
            },showError: function(b) {
                if (b && k[b]) {
                    var c = k[b], d = r[b], e;
                    if (d.time >= 3) {
                        d.time = 0;
                        e = "end"
                    } else {
                        d.time++;
                        e = "retry"
                    }
                    c.top ? u(e, b) : c.bottom && v(e, b);
                    a.custEvent.fire(x, "showError", b)
                }
            },resetStartTime: function() {
                var a = g;
                g = new Date;
                return g - a
            },clearAllTimeTip: function() {
                var b = a.sizzle('[node-type="feed_list_timeTip"]', c), d = b.length, e = null, f = null;
                for (var g = d - 1; g >= 0; g--) {
                    e = b[g];
                    f = a.core.dom.prev(e);
                    f && a.removeClassName(f, "WB_feed_new");
                    e && a.removeNode(e)
                }
            },updateTimeTip: function(b) {
                var d = a.sizzle('[node-type="feed_list_timeText"]', c);
                d.length > 0 && (d[0].innerHTML = b)
            }}, y = function() {
            var b = x.getFirstFeed();
            !s && p < 2 && b && (s = b.getAttribute("mid"));
            a.custEvent.define(x, ["request", "updateFeed", "clearTips", "updateEndId", "showError", "inView", "smartSort", "showRecommendTip", "stopRecommendTip"]);
            a.custEvent.add(x, "updateEndId", t)
        };
        y();
        x.destroy = function() {
            l.destroy();
            a.custEvent.undefine(x)
        };
        return x
    }
});
STK.register("kit.extra.require", function(a) {
    var b = window.$CONFIG || {}, c = "loaded", d = "waiting", e = "loading", f = {}, g = {}, h = [], i = [], j = !1, k = {maxLine: 4,maxRetryTimes: 1,baseURL: b.jsPath,version: b.version,timeout: 3e4,urlRule: null}, l = function(a) {
        var b = {}, c;
        for (var d = a.length; d--; ) {
            c = a[d];
            if (b[c])
                return !1;
            b[c] = 1
        }
        return !0
    }, m = function(a) {
        var b = /^http[s]?:\/\//ig;
        return b.test(a)
    }, n = function(b) {
        var c = a.core.arr.indexOf(b, i);
        return c !== -1 ? i.splice(c, 1) : !1
    }, o = function(a) {
        if (typeof k.urlRule == "function")
            return k.urlRule(k.baseURL, a, k.version);
        a = a.replace(/\./ig, "/");
        return k.baseURL + "home/js/" + a + ".js?version=" + k.version
    }, p = function(b) {
        i.push(b);
        g[b].state = e;
        var h = function() {
            var a = g[b].depeKeys, d, e, h;
            n(b);
            g[b].state = c;
            j && s();
            for (var i = a.length; i--; ) {
                e = a[i];
                d = f[e];
                d.unReadyNum -= 1;
                if (d.unReadyNum)
                    return;
                while (f[e].bindFuns.length) {
                    h = d.bindFuns.shift();
                    h.func.apply({}, [].concat(h.data))
                }
            }
        }, l = function() {
            var a = g[b], c, e, h, i;
            n(b);
            a.state = d;
            if (a.retry < k.maxRetryTimes) {
                a.retry += 1;
                return p(b)
            }
            j && s();
            e = a.depeKeys;
            for (var l = e.length; l--; ) {
                h = e[l];
                c = f[h];
                while (c.timeoutFuns.length) {
                    i = c.timeoutFuns.shift();
                    i.call({}, h)
                }
            }
        };
        a.core.io.scriptLoader({url: m(b) ? b : o(b),timeout: k.timeout,onComplete: h,onTimeout: l})
    }, q = function(b, c, e, h) {
        var i = f[b];
        i || a.log("[STK.kit.extra.require]: The depend " + b + " is undefined!");
        if (!i.unReadyNum) {
            a.log("依赖关系已加载完成：" + b);
            return c.apply({}, [].concat(e))
        }
        i.bindFuns.push({func: c,data: e});
        h && typeof h.onTimeout == "function" && i.timeoutFuns.push(h.onTimeout);
        for (var j = i.urlList.length; j--; ) {
            var k = i.urlList[j];
            if (g[k].state === d) {
                g[k].retry = 0;
                p(k)
            }
        }
    }, r = function(b, e, i) {
        (function() {
            if (a.requirePathMapping) {
                var b = [];
                for (var c = 0, d = e.length; c < d; c++)
                    if (a.requirePathMapping[e[c]]) {
                        var f = e[c].split(".");
                        f[f.length - 1] = f[f.length - 1] + "_" + a.requirePathMapping[e[c]];
                        e[c] = f.join(".");
                        f = null
                    }
            }
        })();
        f[b] !== undefined && a.log("[STK.kit.extra.require]: " + b + " has been registered!");
        l(e) || a.log("[STK.kit.extra.require]: The depend URLs is not unique! The depes is [" + e + "]");
        var j, k = 0;
        i = a.parseParam({activeLoad: !1}, i || {});
        for (var m = e.length; m--; ) {
            j = e[m];
            if (!g[j]) {
                g[j] = {depeKeys: [b],state: d,retry: 0};
                i.activeLoad && h.push(j)
            } else {
                g[j].depeKeys.push(b);
                g[j].state === c && (k += 1)
            }
        }
        f[b] = {urlList: e,bindFuns: [],timeoutFuns: [],unReadyNum: e.length - k};
        return f[b]
    }, s = function() {
        if (!h.length)
            j = !1;
        else {
            j = !0;
            var a = k.maxLine - 1 - i.length, b;
            while (a > 0 && h.length) {
                b = h.shift();
                if (g[b].state === d) {
                    p(b);
                    a -= 1
                }
            }
        }
    }, t = function(b) {
        k = a.core.json.merge(k, b)
    }, u = function(a, b, c) {
        if (typeof b != "function")
            throw '[STK.kit.extra.require]: The "func" musts be a Function!';
        return function(d) {
            q(a, b, [].slice.call(arguments), c)
        }
    };
    q.bind = u;
    q.config = t;
    q.register = r;
    q.activeLoad = s;
    return q
});
STK.register("common.depand.feed", function(a) {
    var b = a.kit.extra.require;
    b.register("asyn_forward", ["common.dialog.forward"], {activeLoad: !0});
    b.register("asyn_comment", ["common.comment.comment"], {activeLoad: !0});
    b.register("asyn_addtag", ["common.dialog.addTag"], {activeLoad: !0});
    b.register("external_group4weibo_groupsfeed", [$CONFIG.jsPath + "apps/group4weibo/js/feed.js?version=" + $CONFIG.version]);
    b.register("external_chosen_groupsfeed", [$CONFIG.jsPath + "apps/chosen/js/apps/chosen/home/homeChosen.js?version=" + $CONFIG.version]);
    b.register("asyn_commentDialogue_tip", ["common.dialog.commentDialogueTip"]);
    return b
});
STK.register("common.feed.feedList.plugins.forward", function(a) {
    var b = a.common.feed.feedList.utils, c = a.kit.extra.language("#L{转发}"), d = a.kit.extra.language, e = a.common.depand.feed;
    return function(f, g) {
        if (!f)
            a.log("forward : need object of the baseFeedList Class");
        else {
            g = a.parseParam({forwardStyleId: "1"}, g);
            var h = f.getNode(), i = {}, j, k, l = !1, m = e.bind("asyn_forward", function(d, e) {
                l = !1;
                if (!k) {
                    k = a.common.dialog.forward({styleId: e.forwardStyleId});
                    a.custEvent.add(k, "forward", function(a, b) {
                        if (!!j && !!b.isToMiniBlog) {
                            var d = j.innerHTML.match(/\(([\d]*)\)/);
                            j.innerHTML = c + "(" + (d ? parseInt(d[1]) + 1 : 1) + ")"
                        }
                    });
                    a.custEvent.add(k, "show", function(c, d) {
                        if (d && d.box) {
                            var e = d.box.getOuter(), f = a.common.getDiss({module: "tranlayout"}, b.getFeedNode(j, h));
                            delete f.location;
                            e.setAttribute("diss-data", a.core.json.jsonToQuery(f))
                        }
                    });
                    a.custEvent.add(k, "hide", function() {
                    })
                }
                k.show(d, e)
            }, {onTimeout: function() {
                    l = !1
                }}), n = function(c, e) {
                j = c;
                var f = c.getAttribute("error-msg");
                if (f) {
                    a.ui.alert(f);
                    return b.preventDefault()
                }
                if (e.allowForward == "0") {
                    a.ui.alert(d("#L{抱歉，此微博已经被删除，无法进行转发哦，请试试其他内容吧。 }"));
                    return b.preventDefault()
                }
                var g = b.getMid(c, h), i = b.getFeedNode(c, h), k = {}, n = a.sizzle('[node-type="feed_list_content"]', i)[0];
                k.uid = e.uid ? e.uid : "";
                k.uid = e.rootuid ? e.rootuid : "";
                k.url = (e || "") && e.url;
                if (!n) {
                    a.log("forward : there is not '[node-type=\"feed_list_content\"]' in the feed_item ");
                    return b.preventDefault()
                }
                var o = a.sizzle('[node-type="feed_list_reason"]', n)[0];
                if (!o) {
                    var p = a.sizzle("[nick-name]", i);
                    p.length && (k.originNick = p[0].getAttribute("nick-name"));
                    k.reason = n.innerHTML
                } else {
                    k.originNick = a.sizzle('[node-type="feed_list_originNick"]', n)[0].getAttribute("nick-name") || "";
                    k.reason = (o.innerHTML || "").replace(/[\r\n]+/g, "")
                }
                var q = a.sizzle('[node-type="feed_list_forwardContent"]', i)[0];
                if (q) {
                    k.forwardNick = e.name || k.originNick;
                    k.originNick = a.sizzle('[node-type="feed_list_originNick"]', q)[0].getAttribute("nick-name");
                    var r = a.sizzle('[node-type="feed_list_reason"]', q)[0];
                    if (!r) {
                        a.log("forward : there is not 'em' node in the feed_list_forwardContent node ");
                        return b.preventDefault()
                    }
                    k.origin = r.innerHTML
                } else {
                    k.origin = k.reason;
                    delete k.reason
                }
                for (var s in e)
                    k[s] = e[s];
                if (!l) {
                    l = !0;
                    m(g, k)
                }
            };
            f.getDEvent().add("feed_list_forward", "click", function(c) {
                var d = c.el, e = d.dataset && d.dataset.mark || d.getAttribute("data-mark") || "", f = {};
                e && (f = a.queryToJson(e));
                c.data = a.core.json.merge(c.data, f);
                n(c.el, c.data);
                return b.preventDefault()
            });
            i.showForward = n;
            i.destroy = function() {
                if (k) {
                    a.custEvent.remove(k);
                    k.destroy();
                    k = null
                }
                j = f = h = null
            };
            return i
        }
    }
});
STK.register("ui.tipPrototype", function(a) {
    var b = 10003;
    return function(c) {
        var d, e, f, g, h, i = '<div node-type="outer" style="position: absolute; clear: both; display:none;overflow:hidden;z-index:10003;" ><div node-type="inner" ></div></div>';
        d = a.parseParam({direct: "up",showCallback: a.core.func.empty,hideCallback: a.core.func.empty}, c);
        e = a.ui.mod.layer(i, d);
        f = e.getOuter();
        g = e.getInner();
        e.setTipWH = function() {
            h = this.getSize(!0);
            this.tipWidth = h.w;
            this.tipHeight = h.h;
            return this
        };
        e.setTipWH();
        e.setContent = function(a) {
            typeof a == "string" ? g.innerHTML = a : g.appendChild(a);
            this.setTipWH();
            return this
        };
        e.setLayerXY = function(c) {
            if (!c)
                throw "ui.tipPrototype need pNode as first parameter to set tip position";
            var e = STK.core.dom.position(c), g = e.l, h = c.offsetWidth, i = c.offsetHeight, j = Math.min(Math.max(g + (h - this.tipWidth) / 2, a.scrollPos().left), a.scrollPos().left + STK.winSize().width - this.tipWidth), k = e.t;
            d.direct === "down" && (k += i);
            var l = [";"];
            l.push("z-index:", b++, ";");
            l.push("height:", this.tipHeight, "px;");
            l.push("top:", k, "px;");
            l.push("left:", j, "px;");
            f.style.cssText += l.join("")
        };
        e.aniShow = function() {
            var b = this.getOuter();
            b.style.height = "0px";
            b.style.display = "";
            var c = a.core.ani.tween(b, {end: d.showCallback,duration: 250,animationType: "easeoutcubic"});
            if (d.direct === "down")
                c.play({height: this.tipHeight}, {staticStyle: "overflow:hidden;position:absolute;"});
            else {
                var e = parseInt(b.style.top, 10) - this.tipHeight;
                c.play({height: this.tipHeight,top: Math.max(e, a.scrollPos().top)}, {staticStyle: "overflow:hidden;position:absolute;"})
            }
        };
        e.anihide = function() {
            var b = this.getOuter(), c = this, e = a.core.ani.tween(b, {end: function() {
                    b.style.display = "none";
                    b.style.height = c.tipHeight + "px";
                    d.hideCallback()
                },duration: 300,animationType: "easeoutcubic"});
            if (d.direct === "down")
                e.play({height: 0}, {staticStyle: "overflow:hidden;position:absolute;"});
            else {
                var f = parseInt(b.style.top, 10) + this.tipHeight;
                e.play({height: 0,top: f}, {staticStyle: "overflow:hidden;position:absolute;"})
            }
        };
        document.body.appendChild(f);
        e.destroy = function() {
            document.body.removeChild(f);
            e = null
        };
        return e
    }
});
STK.register("ui.tipConfirm", function(a) {
    return function(b) {
        b = b || {};
        var c = a.kit.extra.language, d = a.ui.tipPrototype(b), e = d.getInner(), f = d.getOuter();
        f.className = "W_layer";
        e.className = "bg";
        b.info = b.info || c("#L{确认要删除这条微博吗？}");
        b.icon = b.icon || "icon_ask";
        var g = b.template || c('<table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td><div class="content layer_mini_info"><p class="clearfix" node-type="info"><span node-type="icon" class="' + b.icon + '"></span>' + b.info + "</p>" + '<p class="btn"><a node-type="ok" class="W_btn_d" href="javascript:void(0)"><span>#L{确定}</span></a><a class="W_btn_b" node-type="cancel" href="javascript:void(0)"><span>#L{取消}</span></a></p>' + "</div>" + "</td></tr></tbody>" + "</table>"), h = a.builder(g);
        d.setContent(h.box);
        if (!h.list.ok)
            return d;
        var i = h.list.ok[0], j = h.list.cancel[0];
        d.setIcon = function(a) {
            h.list.info.className = a;
            d.setTipWH()
        };
        d.setInfo = function(a) {
            h.list.info[0].innerHTML = '<span node-type="icon" class="' + b.icon + '"></span>' + a;
            d.setTipWH()
        };
        d.cancelCallback = function() {
            a.getType(b.cancelCallback) == "function" && b.cancelCallback()
        };
        d.okCallback = function() {
            a.getType(b.okCallback) == "function" && b.okCallback()
        };
        var k = function() {
            d.anihide();
            d.cancelCallback()
        }, l = function() {
            d.anihide();
            d.okCallback()
        };
        a.addEvent(j, "click", k);
        a.addEvent(i, "click", l);
        var m = d.destroy;
        d.destroy = function() {
            a.removeEvent(j, "click", k);
            a.removeEvent(i, "click", l);
            m();
            d = null
        };
        return d
    }
});
STK.register("ui.tipAlert", function(a) {
    var b = a.core.util.easyTemplate;
    return function(c) {
        c = a.parseParam({direct: "up",showCallback: a.core.func.empty,hideCallback: a.core.func.empty,type: "succ",msg: ""}, c);
        var d = a.ui.tipPrototype(c), e = d.getInner(), f = d.getOuter();
        f.className = "W_layer";
        e.className = "bg";
        var g = c.template || '<#et temp data><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div node-type="msgDiv" class="content layer_mini_info"><p class="clearfix"><span class="icon_${data.type}"></span>${data.msg}&nbsp; &nbsp; &nbsp; </p></div></td></tr></tbody></table></#et>', h = a.builder(b(g, {type: c.type,msg: c.msg}).toString());
        d.setContent(h.box);
        var i = d.destroy;
        d.destroy = function() {
            i();
            d = null
        };
        return d
    }
});
STK.register("ui.vipConfirm", function(a) {
    var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt2" node-type="textComplex"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl><div class="btn"><a href="javascript:void(0)" class="W_btn_b" node-type="OK"></a><a href="javascript:void(0)" class="W_btn_a" node-type="toBeVip"></a></div></div>', c = {success: "icon_succM",error: "icon_errorM",warn: "icon_warnM","delete": "icon_delM",question: "icon_questionM"}, d = a.kit.extra.language, e = null;
    return function(f, g) {
        var h, i, j, k, l, m, n;
        h = a.parseParam({title: d("#L{提示}"),icon: "question",textLarge: f,textComplex: "",textSmall: "",OK: a.funcEmpty,OKText: d("#L{确定}"),cancel: a.funcEmpty,cancelText: d("#L{取消}"),toBeVip: a.funcEmpty,toBeVipText: ""}, g);
        h.icon = c[h.icon];
        i = {};
        e || (e = a.kit.extra.reuse(function() {
            var c = a.ui.mod.layer(b);
            return c
        }));
        j = e.getOne();
        k = a.ui.dialog();
        k.setContent(j.getOuter());
        j.getDom("icon").className = h.icon;
        j.getDom("textLarge").innerHTML = h.textLarge;
        j.getDom("textComplex").innerHTML = h.textComplex;
        j.getDom("textSmall").innerHTML = h.textSmall;
        j.getDom("OK").innerHTML = "<span>" + h.OKText + "</span>";
        j.getDom("toBeVip").innerHTML = '<span><em class="W_ico16 ico_member"></em>' + h.toBeVipText + "</span>";
        k.setTitle(h.title);
        var o = function() {
            l = !0;
            m = a.htmlToJson(j.getDom("textComplex"));
            k.hide()
        }, p = function() {
            n = !0;
            k.hide()
        };
        a.addEvent(j.getDom("OK"), "click", o);
        a.addEvent(j.getDom("toBeVip"), "click", p);
        a.custEvent.add(k, "hide", function() {
            a.custEvent.remove(k, "hide", arguments.callee);
            a.removeEvent(j.getDom("OK"), "click", o);
            a.removeEvent(j.getDom("toBeVip"), "click", p);
            e.setUnused(j);
            l ? h.OK(m) : h.cancel(m);
            n && h.toBeVip()
        });
        k.show().setMiddle();
        i.cfm = j;
        i.dia = k;
        return i
    }
});
STK.register("kit.io.cssLoader", function(a) {
    var b = "", c = "http://img.t.sinajs.cn/t4/", d = "http://timg.sjs.sinajs.cn/t4/";
    if (typeof $CONFIG != "undefined") {
        c = $CONFIG.cssPath || c;
        b = $CONFIG.version || ""
    }
    var e = {};
    return function(f, g, h, i, j) {
        i = i || b;
        h = h || function() {
        };
        var k = function(a, b) {
            var c = e[a] || (e[a] = {loaded: !1,list: []});
            if (c.loaded) {
                b(a);
                return !1
            }
            c.list.push(b);
            return c.list.length > 1 ? !1 : !0
        }, l = function(a) {
            var b = e[a].list;
            for (var c = 0; c < b.length; c++)
                b[c](a);
            e[a].loaded = !0;
            delete e[a].list
        };
        if (!!k(f, h)) {
            var m;
            j ? m = d + f : m = c + f + "?version=" + i;
            var n = a.C("link");
            n.setAttribute("rel", "Stylesheet");
            n.setAttribute("type", "text/css");
            n.setAttribute("charset", "utf-8");
            n.setAttribute("href", m);
            document.getElementsByTagName("head")[0].appendChild(n);
            var o = a.C("div");
            o.id = g;
            a.core.util.hideContainer.appendChild(o);
            var p = 3e3, q = function() {
                if (parseInt(a.core.dom.getStyle(o, "height")) == 42) {
                    a.core.util.hideContainer.removeChild(o);
                    l(f)
                } else if (--p > 0)
                    setTimeout(q, 10);
                else {
                    a.log(f + "timeout!");
                    a.core.util.hideContainer.removeChild(o);
                    delete e[f]
                }
            };
            setTimeout(q, 50)
        }
    }
});
STK.register("common.dialog.authentication", function(a) {
    return function(b) {
        var c = a.kit.extra.language, d = a.core.util.browser;
        b = a.parseParam({src: "http://account.weibo.com/sguide/identity/iframe?from=home_verification",icon: "warn",isHold: !0,width: "455px",height: "180px",title: c("#L{提示}")}, b || {});
        var e = {}, f, g, h = !1, i = "tblog_checkfailed_reform", j = {init: function() {
                !d.IE6 && !d.IE7 && (window.document.domain = "weibo.com");
                f = a.ui.dialog(b);
                var e = [];
                e.push('<div class="layer_point layer_check_identity">');
                e.push('<dl class="point clearfix">');
                e.push('\t<dt><span class="icon_warnM"></span></dt>');
                e.push('\t<dd><p class="S_txt1">');
                e.push(c("#L{您的身份信息尚未验证通过，请尽快验证。完成验证后，可以使用全部微博功能，您的帐号也将更加安全。}"));
                e.push('<a suda-data="key=tblog_checkfailed_reform&value=checkfailed_readonly" class="S_spetxt" href="http://weibo.com">');
                e.push(c("#L{先体验微博，稍候再验证}"));
                e.push("</a>");
                e.push("</p></dd></dl>");
                e.push('<iframe id="account_authentication" name="account_authentication" node-type="frame" width="' + b.width + '" height="' + b.height + '" allowtransparency="true" scrolling="no" frameborder="0" src=""></iframe>');
                e.push("</div>");
                var g = a.builder(e.join(""));
                f.setTitle(b.title);
                f.setContent(g.box);
                var h = f.getDomList();
                a.addEvent(h.close[0], "click", function() {
                    history.go(0)
                })
            },show: function() {
                try {
                    SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_box")
                } catch (c) {
                }
                h || a.kit.io.cssLoader("style/css/module/layer/layer_check_identity.css", "js_style_css_module_layer_check_identity", function() {
                    h = !0
                });
                f.show().setMiddle();
                g = a.E("account_authentication");
                var d = decodeURIComponent(b.src) + "&rnd=";
                g.attachEvent ? g.attachEvent("onload", function() {
                    g.height = b.height;
                    f.setMiddle()
                }) : g.onload = function() {
                    g.height = b.height;
                    f.setMiddle()
                };
                g.src = d + a.core.util.getUniqueKey()
            },destroy: function() {
            },hook: function(a, b) {
                try {
                    a == "100000" ? j.verifySucc() : j.verifyFail()
                } catch (c) {
                }
            },verifySucc: function() {
                SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_success");
                f.hide();
                var b = {title: c("#L{提示}"),icon: "success",OK: function() {
                        SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_play");
                        history.go(0)
                    },OKText: c("#L{进入首页}"),msg: c("#L{恭喜，您的身份已验证成功，马上进入新浪微博。}")}, d = a.ui.alert(b.msg, b);
                a.custEvent.add(d, "hide", function() {
                    history.go(0)
                })
            },verifyFail: function() {
                SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_twotimes");
                f.hide();
                var b = {title: c("#L{提示}"),icon: "warn",OK: function() {
                        SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_triple");
                        j.show()
                    },OKText: c("#L{再次验证}"),msg: c("#L{抱歉，您的身份信息不准确，请再次验证。<br/>}") + '<a class="S_spetxt" suda-data="key=tblog_checkfailed_reform&value=checkfailed_havealook" href="http://weibo.com">' + c("#L{您也可以先体验微博，随后再验证身份信息>>}") + "</a>"}, d = a.ui.alert(b.msg, b);
                a.custEvent.add(d, "hide", function() {
                    history.go(0)
                })
            }};
        j.init();
        e.destroy = j.destory;
        e.show = j.show;
        window.App = window.App || {};
        window.App.checkRealName = j.hook;
        return e
    }
});
STK.register("common.dialog.memberDialog", function(a) {
    var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt1" node-type="textComplex"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl><div class="btn"><a class="W_btn_b" node-type="OK"></a><a class="W_btn_d" node-type="cancel"></a><a href="http://vip.weibo.com/paycenter?pageid=byebank" class="W_btn_i" node-type="member"><span><img class="ico_member" alt="" src="' + $CONFIG.imgPath + '/style/images/common/transparent.gif">#L{立即开通会员}</span></a>' + "</div>" + "</div>", c = {success: "icon_succM",error: "icon_errorM",warn: "icon_warnM","delete": "icon_delM",question: "icon_questionM"}, d = a.kit.extra.language, e = function(e, f) {
        var g, h, i, j, k, l;
        g = a.parseParam({title: d("#L{提示}"),icon: "warn",textLarge: e,textComplex: "",textSmall: "",OK: a.funcEmpty,OKText: d("#L{确定}"),cancel: a.funcEmpty,cancelText: d("#L{确认}")}, f);
        g.icon = c[g.icon];
        h = {};
        var i = a.ui.mod.layer(d(b));
        j = a.ui.dialog();
        j.setContent(i.getOuter());
        i.getDom("icon").className = g.icon;
        i.getDom("textLarge").innerHTML = g.textLarge;
        i.getDom("textComplex").innerHTML = g.textComplex;
        i.getDom("textSmall").innerHTML = g.textSmall;
        i.getDom("OK").innerHTML = "<span>" + g.OKText + "</span>";
        i.getDom("cancel").innerHTML = "<span>" + g.cancelText + "</span>";
        j.setTitle(g.title);
        var m = function() {
            k = !0;
            l = a.htmlToJson(i.getDom("textComplex"));
            j.hide()
        };
        a.addEvent(i.getDom("OK"), "click", m);
        a.addEvent(i.getDom("cancel"), "click", j.hide);
        a.custEvent.add(j, "hide", function() {
            a.custEvent.remove(j, "hide", arguments.callee);
            a.removeEvent(i.getDom("OK"), "click", m);
            a.removeEvent(i.getDom("cancel"), "click", j.hide);
            k ? g.OK(l) : g.cancel(l)
        });
        j.show().setMiddle();
        h.cfm = i;
        h.dia = j;
        return h
    };
    return function(b) {
        b = a.parseParam({type: "follow",errortype: "1"}, b);
        var c, f, g = {textLarge: d("#L{您已达到悄悄关注上限！}"),textComplex: d('#L{开通}<a href="http://vip.weibo.com/privilege">#L{微博会员}</a>，#L{悄悄关注上限立即提高}'),textSmall: d('#L{可}<a href="http://vip.weibo.com/paycenter?pageid=byebank" class="S_link2">#L{开通会员}</a>#L{或先将悄悄关注减少至10人以下，再添加}'),OKText: d("#L{管理我的悄悄关注}"),OK: function() {
                a.preventDefault();
                window.location.href = "/" + $CONFIG.uid + "/whisper"
            }}, h = {textLarge: d("#L{您已达到关注上限！}"),textComplex: d('#L{开通}<a href="http://vip.weibo.com/privilege">#L{微博会员}</a>，#L{关注上限立即提高}'),textSmall: d('#L{可}<a href="http://vip.weibo.com/paycenter?pageid=byebank" class="S_link2">#L{开通会员}</a>#L{或先将关注减少至2000人以下，再添加}'),OKText: d("#L{管理我的关注}"),OK: function() {
                a.preventDefault();
                window.location.href = "/" + $CONFIG.uid + "/follow"
            }};
        if (b.type == "quiet") {
            switch (b.errortype) {
                case "2":
                    g.textLarge = d("#L{您当前已达会员等级悄悄关注上限啦！}");
                    g.textComplex = "";
                    g.textSmall = d('<a href="http://vip.weibo.com/privilege" class="S_link2">#L{了解更多会员特权信息»}</a>');
                    break;
                case "1":
                    g.textSmall = ""
            }
            c = g
        } else {
            switch (b.errortype) {
                case "2":
                    h.textLarge = d("#L{您当前已达会员等级关注上限啦！}");
                    h.textComplex = "";
                    h.textSmall = d('<a href="http://vip.weibo.com/privilege" class="S_link2">#L{了解更多会员特权信息»}</a>');
                    break;
                case "1":
                    h.textSmall = ""
            }
            c = h
        }
        f = e("", c);
        b.errortype == "2" ? f.cfm.getDom("member").style.display = "none" : f.cfm.getDom("cancel").style.display = "none"
    }
});
STK.register("common.layer.ioError", function(a) {
    var b = a.kit.extra.language, c;
    return function(d, e, f) {
        var g = {}, h, i, j = function() {
        }, k = {title: b("#L{发布失败}"),warnMsg: b("#L{该组成员已达上限，不能对该组发布定向微博。}"),OKText: b("#L{知道了}"),textComplex: b('#L{微博会员可以提高分组上限} <a href="http://vip.weibo.com/prividesc?priv=1110">#L{了解更多}»</a>'),vip: b("#L{开通会员}")}, l = {init: function() {
                l.data()
            },data: function() {
                i = a.parseParam({auto: !0,call: j,ok: j,cancel: j}, f);
                h = a.parseParam({location: "",icon: "warn",title: b("#L{提示}"),OKText: b("#L{确 定}"),cancelText: b("#L{取 消}"),suda: ""}, e.data);
                h.msg = e.msg || b("#L{系统繁忙}");
                h.OK = function() {
                    a.preventDefault();
                    var b = a.queryToJson(h.suda || "");
                    b = b.ok || {};
                    SUDA.uaTrack && b.key && SUDA.uaTrack(b.key, b.value);
                    i.ok();
                    h.location && (window.location.href = h.location)
                };
                h.cancel = function() {
                    a.preventDefault();
                    var b = a.queryToJson(h.suda || "");
                    b = b.cancel || {};
                    SUDA.uaTrack && b.key && SUDA.uaTrack(b.key, b.value);
                    i.cancel()
                }
            },run: function() {
                var a = m[e.code] || m[100001];
                return a() || i.call(h, e)
            },destroy: function() {
                c && c.destroy()
            }}, m = {100001: function() {
                a.ui.alert(h.msg, h)
            },100002: function() {
                window.location.reload()
            },100003: function() {
                a.ui.confirm(h.msg, h)
            },100004: function() {
                c || (c = a.common.dialog.authentication());
                c.show()
            },100005: function() {
                h.type = "follow";
                return a.common.dialog.memberDialog(h || {})
            },100006: function() {
                a.ui.alert(k.warnMsg, {title: k.title,OKText: k.OKText})
            },100007: function() {
                a.ui.vipConfirm(k.warnMsg, {icon: "warn",title: k.title,toBeVipText: k.vip,textComplex: k.textComplex,OKText: k.OKText,toBeVip: function() {
                        a.preventDefault();
                        window.location.href = "http://vip.weibo.com/paycenter?refer=publish"
                    }})
            }};
        l.init();
        g.getdata = function() {
            return h
        };
        g.getAction = function(a) {
            return a ? m[a] : m
        };
        g.getCode = function() {
            return e.code || ""
        };
        g.run = l.run;
        i.auto && l.run();
        return g
    }
});
STK.register("common.feed.feedList.plugins.deleteFeed", function(a) {
    var b = a.common.feed.feedList.utils, c, d, e, f = a.common.channel.feed, g = a.kit.extra.language, h = a.core.util.templet, i = {DERRORTEXT: g("#L{删除失败}！"),TIPCONFIRM: g('<table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div class="content layer_mini_info layer_mini_center">#{CONTENT}<p class="btn"><a node-type="ok" class="W_btn_a" href="javascript:void(0)"><span>#L{确定}</span></a><a node-type="cancel" class="W_btn_b" href="javascript:void(0)"><span>#L{取消}</span></a></p></div></td></tr></tbody></table>'),DELETETOP: g('<p class="texta_c clearfix">#L{此条微博为置顶状态，}</p><p class="texta_c clearfix">#L{确认要删除这条微博吗？}</p>')}, j = function(b, d) {
        e = a.ui.tipAlert({showCallback: function() {
                setTimeout(function() {
                    e.anihide()
                }, 600)
            },hideCallback: function() {
                c = undefined;
                e.destroy();
                e = null
            },msg: b,type: "error"});
        e.setLayerXY(d);
        e.aniShow()
    }, k = function(c, d, e, g) {
        var h = b.getFeedNode(e, g);
        h.style.height = h.offsetHeight + "px";
        h.style.overflow = "hidden";
        var i = a.tween(h, {end: function() {
                h.innerHTML = "";
                a.removeNode(h);
                g = e = h = null;
                i.destroy();
                c.getFeedCount() < 1 && window.location.reload()
            }}).play({height: 0});
        f.fire("delete")
    };
    return function(f) {
        if (!f)
            a.log("deleteFeed : need object of the baseFeedList Class");
        else {
            var g = f.getNode(), l = f.getDEvent(), m = {}, n = {init: function() {
                    n.bind()
                },bind: function() {
                    f.getDEvent().add("feed_list_delete", "click", n.requestDelete)
                },requestDelete: function(e) {
                    a.custEvent.fire(f, "clearTips", "deleteFeed");
                    var l = e.el, m = b.getMid(l, g);
                    if (c != m) {
                        c = m;
                        var n = b.getFeedNode(l, g).getAttribute("feedtype"), o = {okCallback: function() {
                                b.getFeedTrans("delete", {onSuccess: function() {
                                        k(f, m, l, g)
                                    },onFail: function() {
                                        j(i.DERRORTEXT, l)
                                    },onError: function(b) {
                                        b.code == "100003" ? a.common.layer.ioError(b.code, b) : j(b.msg, l)
                                    }}).request({mid: m})
                            },hideCallback: function() {
                                c = undefined
                            }};
                        n && n == "top" && (o.template = h(i.TIPCONFIRM, {CONTENT: i.DELETETOP}));
                        d = a.ui.tipConfirm(o);
                        d.setLayerXY(l);
                        d.aniShow();
                        return b.preventDefault(e.evt)
                    }
                },hideTip: function(a) {
                    d && (a ? d.hide() : d.anihide())
                },destroy: function() {
                    e && e.destroy();
                    d && d.destroy();
                    d = e = okCallback = n = m = null
                }};
            n.init();
            m.hideTip = n.hideTip;
            m.destroy = n.destroy;
            return m
        }
    }
});
STK.register("common.favorite.favorite", function(a) {
    var b = a.kit.extra.language, c = b("#L{成功}!"), d = b("#L{失败}!"), e = b("#L{取消收藏}"), f = b("#L{收藏}"), g = b("#L{加标签}"), h, i = "", j = b("#L{您已经收藏过此微博}！"), k = b("#L{添加收藏标签}"), l = b("#L{收藏成功!}"), m = function(b, c, d) {
        if (!!b) {
            h = a.ui.tipAlert({showCallback: function() {
                    setTimeout(function() {
                        h && h.anihide()
                    }, d ? 1500 : 600)
                },hideCallback: function() {
                    h && h.destroy();
                    h = null
                },msg: b,type: d ? "del" : undefined});
            h.setLayerXY(c);
            h.aniShow()
        }
    }, n, o, p, q = function(c) {
        return a.ui.tipConfirm({info: b("#L{确认要取消收藏这条微博吗？}"),okCallback: function() {
                n && n()
            },hideCallback: function() {
                o && o()
            }})
    }, r = function(b, g, h, i, j, k) {
        var l = i == "add" ? f : e;
        a.common.trans.favorite.getTrans(i, {onSuccess: function(d) {
                i == "add" ? d.data && !d.data.ispower && (j = !0) : j = !0;
                j && m(l + c, h);
                a.custEvent.fire(b, "success", d)
            },onFail: function() {
                m(l + d, h, !0);
                a.custEvent.fire(b, "fail")
            },onError: function(c) {
                m(c.msg || l + d, h, !0);
                a.custEvent.fire(b, "error", c)
            }}).request(a.common.getDiss({mid: g,mark: k}, h))
    };
    return function(b) {
        var d = {};
        b = a.parseParam({showTip: !0,mid: null,node: null,mark: ""}, b);
        if (!b.mid || !b.node)
            a.log("opts.mid, opts.node 都不能为空!");
        else {
            a.custEvent.define(d, ["success", "showForward", "fail", "error", "cancel"]);
            d.add = function() {
                r(d, b.mid, b.node, "add", b.showTip, b.mark)
            };
            d.del = function() {
                n = function() {
                    r(d, b.mid, b.node, "del", b.showTip, b.mark)
                };
                o = function() {
                    a.custEvent.fire(d, "cancel")
                };
                p = p || q();
                p.setLayerXY(b.node);
                p.aniShow()
            };
            d.hideTip = function() {
                h && h.hide()
            };
            d.anihideTip = function() {
                h && h.anihide()
            };
            d.msgTipDetroy = function() {
                h && h.destroy();
                h = null
            };
            d.destroy = function() {
                h && h.destroy();
                a.custEvent.undefine(d);
                d = b = h = p = null
            };
            d.showSuccTip = function(a) {
                m(g + c, a)
            };
            d.showErrTip = function(a, b) {
                m(b, a, !0)
            };
            return d
        }
    }
});
STK.register("ui.mod.bubble", function(a) {
    return function(b, c) {
        var d, e, f, g, h, i, j;
        e = a.parseParam({width: null,height: null,parent: document.body}, c);
        f = a.ui.mod.layer(b);
        g = f.getDom("outer");
        h = f.getDom("inner");
        f.getDomListByKey("close") && (i = f.getDom("close"));
        g.style.display = "none";
        j = !1;
        var k = function(b) {
            if (j)
                return !0;
            var c = a.fixEvent(b);
            a.contains(g, c.target) || f.hide()
        };
        i && a.addEvent(i, "click", f.hide);
        a.custEvent.add(f, "show", function() {
            setTimeout(function() {
                a.addEvent(document.body, "click", k)
            }, 0)
        });
        a.custEvent.add(f, "hide", function() {
            j = !1;
            a.removeEvent(document.body, "click", k)
        });
        d = f;
        d.setPosition = function(a) {
            g.style.top = a.t + "px";
            g.style.left = a.l + "px";
            return d
        };
        d.setAlignPos = function(b, c, d) {
            d = a.parseParam({offset: {left: 0,top: 0},arrowOffset: 0,align: "left",fail: a.funcEmpty}, d);
            if (!!a.isNode(b) && !!a.isNode(c)) {
                var e = b, h;
                while (e !== document.body) {
                    e = e.parentNode;
                    h = a.getStyle(e, "position");
                    if (h === "absolute")
                        break
                }
                e.appendChild(g);
                h = a.position(e);
                h || (h = {l: 0,t: 0});
                var i = a.core.dom.getSize, j = a.position(c), k = a.position(b), l = i(b), m = 6, n = 14, o, p, q, r = d.offset, s = d.arrowOffset, t = i(g), u = i(c), v = 2;
                if (d.align === "left") {
                    if (t.width < k.l - j.l + Math.ceil(l.width / 2)) {
                        d.fail();
                        return
                    }
                } else if (j.l + u.width - k.l - Math.ceil(l.width / 2) > t.width) {
                    d.fail();
                    return
                }
                d.align === "left" ? o = j.l - v : o = j.l + u.width - t.width + v;
                p = k.t + l.height + m;
                q = k.l + Math.ceil((l.width - n) / 2) - o;
                p -= h.t;
                o -= h.l;
                p += r.top;
                o += r.left;
                q += s;
                g.style.left = o + "px";
                g.style.top = p + "px";
                if (f.getDomListByKey("arrow")) {
                    arrow = f.getDom("arrow");
                    arrow.style.left = q + "px"
                }
            }
        };
        d.setLayout = function(b, c) {
            if (!a.isNode(b))
                throw "ui.mod.bubble.setDown need element as first parameter";
            if (f.getDomListByKey("arrow")) {
                arrow = f.getDom("arrow");
                arrow.style.cssText = ""
            }
            a.kit.dom.layoutPos(g, b, c);
            return d
        };
        d.setContent = function(b) {
            typeof b == "string" ? h.innerHTML = b : a.isNode(b) && h.appendChild(b);
            return d
        };
        d.setArrow = function(a) {
            var b;
            if (f.getDomListByKey("arrow")) {
                b = f.getDom("arrow");
                a.className && (b.className = a.className || "");
                a.style && (b.style.cssText = a.style || "")
            }
        };
        d.clearContent = function() {
            while (h.children.length)
                a.removeNode(h.children[0])
        };
        d.stopBoxClose = function() {
            j = !0
        };
        d.startBoxClose = function() {
            j = !1
        };
        d.destroy = function() {
            a.removeEvent(document.body, "click", k);
            f = null;
            g = null;
            h = null;
            i = null
        };
        return d
    }
});
STK.register("ui.bubble", function(a) {
    var b = ['<div class="W_layer" node-type="outer">', '<div class="bg">', '<table cellspacing="0" cellpadding="0" border="0">', '<tbody><tr><td><div class="content" node-type="layoutContent">', '<a class="W_close" href="javascript:void(0);" node-type="close" title="关闭"></a>', '<div node-type="inner"></div>', "</div></td></tr></tbody>", "</table>", '<div class="arrow arrow_t" node-type="arrow"></div>', "</div>", "</div>"].join(""), c = [];
    return function(d) {
        var e = a.parseParam({template: b,isHold: !1}, d), f = {get: function() {
                return e.isHold ? a.ui.mod.bubble(e.template, e) : f.checkBob()
            },checkBob: function() {
                var a;
                for (var b = 0, d = c.length; b < d; b++)
                    if (!c[b].used) {
                        a = c[b].bub;
                        continue
                    }
                a || (a = f.create());
                return a
            },refresh: function(a, b) {
                for (var d = 0, e = c.length; d < e; d++)
                    if (a === c[d].bub) {
                        c[d].used = b;
                        return
                    }
            },cevt: function(b) {
                a.custEvent.add(b, "hide", function() {
                    f.refresh(b, !1);
                    b.clearContent()
                });
                a.custEvent.add(b, "show", function() {
                    f.refresh(b, !0)
                })
            },create: function() {
                var b = a.ui.mod.bubble(e.template, e);
                c.push({bub: b,used: !0});
                f.cevt(b);
                return b
            }};
        return f.get()
    }
});
STK.register("kit.items.DataController", function(a) {
    return function(b) {
        var c = {}, d = {}, e = [], f = 0;
        a.custEvent.define(c, ["DispItem", "DeletedItem", "ItemSuggest"]);
        c.addItems = function(b) {
            a.isArray(b) || (b = [b]);
            for (var c = 0, g = b.length; c < g; c++) {
                var h = b[c];
                if (!d[h.id]) {
                    f++;
                    d[h.id] = {data: h,index: e.length};
                    e.push(h)
                }
            }
        };
        c.removeItems = function(b) {
            a.isArray(b) || (b = [b]);
            for (var c = 0, g = b.length; c < g; c++) {
                var h = b[c];
                if (d[h.id]) {
                    f > 0 && f--;
                    var i = d[h.id].index;
                    delete d[h.id];
                    e[i] = null
                }
            }
        };
        c.getResult = function() {
            var a = [];
            for (var b = 0, c = e.length; b < c; b++)
                e[b] && a.push(e[b]);
            return a
        };
        c.getResultLength = function() {
            return f
        };
        c.hasKey = function(a) {
            return d[a.id]
        };
        c.destroy = function() {
            a.custEvent.undefine(c);
            c = d = e = f = undefined
        };
        return c
    }
});
STK.register("kit.items.DispItem", function(a) {
    return function(b) {
        if (typeof b != "object")
            throw "DispItem need param object";
        if (typeof b.custObj != "object")
            throw "DispItem need custObj custEvent depute";
        if (typeof b.chosenTpl != "string")
            throw "DispItem need chosenTpl param";
        if (typeof b.unChosenTpl != "string")
            throw "DispItem need unChosenTpl param";
        if (!a.isNode(b.nodeList))
            throw "DispItem need nodeList to depute dom";
        if (typeof b.limitCount != "undefined" && typeof b.DataController == "undefined")
            throw "DispItem need DataController when set limitCount";
        var c = a.core.util.easyTemplate, d = a.kit.extra.language, e = a.kit.dom.firstChild, f = a.kit.extra.merge, g = {}, h;
        g.addItems = function(e, f) {
            a.isArray(e) || (e = [e]);
            var g = c(d(f.type == "chosen" ? b.chosenTpl : b.unChosenTpl), e).toString();
            a.insertHTML(b.nodeList, g, "beforeend")
        };
        g.removeItems = function(c, d) {
            a.isArray(c) || (c = [c]);
            for (var e = 0, f = c.length; e < f; e++) {
                var g = a.sizzle("[itemid='" + (d ? c[e].id : c[e]) + "']", b.nodeList);
                g.length && a.removeNode(g[0])
            }
        };
        var i = function(f, g) {
            a.isArray(f) || (f = [f]);
            for (var h = 0, i = f.length; h < i; h++) {
                var j = a.sizzle("[itemid='" + f[h].id + "']", b.nodeList);
                if (j.length) {
                    var k = a.C("DIV"), l = c(d(g ? b.chosenTpl : b.unChosenTpl), [f[h]]).toString();
                    k.innerHTML = l;
                    a.replaceNode(e(k), j[0])
                }
            }
        }, j = function() {
            if (b.limitCount) {
                var a = b.DataController.getResultLength();
                return a >= b.limitCount ? !0 : !1
            }
            return !1
        };
        g.setCheckedItems = function(a) {
            i(a, !0)
        };
        g.setUncheckedItems = function(a) {
            i(a, !1)
        };
        h = a.delegatedEvent(b.nodeList);
        h.add("check", "click", function(c) {
            setTimeout(function() {
                if (!j()) {
                    var d = f(c.data, {data: c.el.getAttribute("action-data")});
                    g.setCheckedItems(d);
                    a.custEvent.fire(b.custObj, "DispItem", {type: "check",data: d})
                } else
                    a.custEvent.fire(b.custObj, "DispItem", {type: "focusInput",data: {}})
            }, 0)
        });
        h.add("uncheck", "click", function(c) {
            setTimeout(function() {
                var d = f(c.data, {data: c.el.getAttribute("action-data")});
                g.setUncheckedItems(d);
                a.custEvent.fire(b.custObj, "DispItem", {type: "uncheck",data: d})
            }, 0)
        });
        g.destroy = function() {
            h && h.destroy();
            c = d = e = f = g = h = i = j = undefined
        };
        return g
    }
});
STK.register("kit.items.DeletedItem", function(a) {
    return function(b) {
        if (typeof b != "object")
            throw "DeletedItem need param object";
        if (typeof b.custObj != "object")
            throw "DeletedItem need custObj custEvent depute";
        if (typeof b.template != "string")
            throw "DeletedItem need template to display";
        if (!a.isNode(b.nodeList))
            throw "DeletedItem need nodeList to depute dom";
        if (!a.isNode(b.insertBeforeNode))
            throw "DeletedItem need insertBeforeNode to insert dom";
        var c = a.core.util.easyTemplate, d = a.kit.extra.language, e = a.kit.extra.merge, f = {}, g;
        f.addItems = function(e) {
            a.isArray(e) || (e = [e]);
            var f = c(d(b.template), e).toString();
            a.insertHTML(b.insertBeforeNode, f, "beforebegin")
        };
        f.removeItems = function(c, d) {
            a.isArray(c) || (c = [c]);
            for (var e = 0, f = c.length; e < f; e++) {
                var g = a.sizzle("[itemid='" + (d ? c[e].id : c[e]) + "']", b.nodeList);
                g.length && a.removeNode(g[0])
            }
        };
        g = a.delegatedEvent(b.nodeList);
        g.add("remove", "click", function(c) {
            setTimeout(function() {
                var d = e(c.data, {data: c.el.getAttribute("action-data")});
                f.removeItems(d, !0);
                a.custEvent.fire(b.custObj, "DeletedItem", {type: "remove",data: d})
            }, 0)
        });
        f.destroy = function() {
            g && g.destroy();
            c = d = e = g = f = undefined
        };
        return f
    }
});
STK.register("kit.extra.dynamicInputWidth", function(a) {
    return function(b, c) {
        c = c || {};
        var d = {}, e, f, g, h = a.core.dom.getSize, i = a.core.dom.setStyle, j, k;
        a.custEvent.define(d, "textChange");
        var l = function() {
            if (!e) {
                e = 1;
                var b = a.core.dom.cssText("");
                b.push("width", "1000px");
                b.push("height", "55px");
                b.push("position", "absolute");
                b.push("left", "-10000px");
                b.push("top", "-10000px");
                b.push("visibility", "hidden");
                var c = b.getCss();
                e = 1;
                var d = '<div node-type="wrap" style="' + c + '">' + '<span node-type="before"></span>' + "</div>", h = a.core.dom.builder(d);
                g = h.box;
                f = a.kit.dom.parseDOM(h.list);
                document.body.appendChild(g)
            }
        }, m = {focus: function() {
                clearTimeout(k);
                k = setTimeout(m.focusFun, 200)
            },focusFun: function() {
                var e = b.value;
                if (c.limitWords) {
                    var g = a.bLength(e);
                    g > c.limitWords && (b.value = e = a.leftB(e, c.limitWords))
                }
                if (e == j)
                    m.focus();
                else {
                    j = e;
                    l();
                    f.before.innerHTML = a.encodeHTML(e);
                    var k = h(f.before), n = k.width + 20;
                    c.maxInputWidth && n > c.maxInputWidth && (n = c.maxInputWidth);
                    i(b, "width", n + "px");
                    m.focus();
                    a.custEvent.fire(d, "textChange", e)
                }
            },blur: function() {
                clearTimeout(k)
            }}, n = function() {
            a.addEvent(b, "focus", m.focus);
            a.addEvent(b, "blur", m.blur)
        }, o = function() {
            a.removeEvent(b, "focus", m.focus);
            a.removeEvent(b, "blur", m.blur);
            d = null
        }, p = {custObj: d,destroy: o};
        n();
        return p
    }
});
STK.register("ui.mod.suggest", function(a) {
    var b = null, c = a.custEvent, d = c.define, e = c.fire, f = c.add, g = a.addEvent, h = a.removeEvent, i = a.stopEvent, j = [], k = {}, l = {ENTER: 13,ESC: 27,UP: 38,DOWN: 40,TAB: 9}, m = function(b) {
        var c = -1, j = [], k = b.textNode, m = b.uiNode, n = a.core.evt.delegatedEvent(m), o = d(k, ["open", "close", "indexChange", "onSelect", "onIndexChange", "onClose", "onOpen", "openSetFlag"]);
        o.setFlag = p;
        var p = function(a) {
            b.flag = a
        }, q = function() {
            return a.sizzle(["[action-type=", b.actionType, "]"].join(""), m)
        }, r = function() {
            c = -1;
            h(k, "keydown", s);
            n.destroy()
        }, s = function(d) {
            var f, g;
            if (!!(f = d) && !!(g = f.keyCode)) {
                if (g == l.ENTER) {
                    e(o, "onSelect", [c, k, b.flag]);
                    a.preventDefault()
                }
                if (g == l.UP) {
                    i();
                    var h = q().length;
                    c = c < 1 ? h - 1 : c - 1;
                    e(o, "onIndexChange", [c]);
                    return !1
                }
                if (g == l.DOWN) {
                    i();
                    var h = q().length;
                    c = c == h - 1 ? 0 : c + 1;
                    e(o, "onIndexChange", [c]);
                    return !1
                }
                if (g == l.ESC) {
                    i();
                    r();
                    e(o, "onClose");
                    return !1
                }
                if (g == l.TAB) {
                    r();
                    e(o, "onClose");
                    return !1
                }
            }
        }, t = function(c) {
            e(o, "onSelect", [a.core.arr.indexOf(c.el, q()), k, b.flag])
        }, u = function(b) {
            c = a.core.arr.indexOf(b.el, q());
            e(o, "onIndexChange", [a.core.arr.indexOf(b.el, q())])
        };
        f(o, "open", function(a, c) {
            k = c;
            r();
            g(c, "keydown", s);
            n.add(b.actionType, "mouseover", u);
            n.add(b.actionType, "click", t);
            e(o, "onOpen", [b.flag])
        });
        f(o, "openSetFlag", function(a, b) {
            p(b)
        });
        f(o, "close", function() {
            r();
            e(o, "onClose", [b.flag])
        });
        f(o, "indexChange", function(a, d) {
            c = d;
            e(o, "onIndexChange", [c, b.flag])
        });
        return o
    }, n = function(b) {
        var c = b.textNode, d = a.core.arr.indexOf(c, j);
        if (!k[d]) {
            j[d = j.length] = c;
            k[d] = m(b)
        }
        return k[d]
    };
    return function(c) {
        if (!!c.textNode && !!c.uiNode) {
            c = a.parseParam({textNode: b,uiNode: b,actionType: "item",actionData: "index",flag: ""}, c);
            return n(c)
        }
    }
});
STK.register("kit.items.ItemSuggest", function(a) {
    return function(b) {
        if (typeof b != "object")
            throw "ItemSuggest need object params";
        if (typeof b.textEl == "undefined")
            throw "ItemSuggest need textEl";
        if (typeof b.uiNode == "undefined")
            throw "ItemSuggest need uiNode";
        if (typeof b.suggestConf == "undefined")
            throw "ItemSuggest need suggestConf";
        if (typeof b.custObj == "undefined")
            throw "ItemSuggest need custObj";
        var c = a.kit.dom.parseDOM(a.builder(b.uiNode).list), d, e, f;
        b = a.kit.extra.merge({actionType: "suggestItem",actionData: "index",suggestType: "local"}, b);
        var g = {}, h = a.ui.mod.suggest({textNode: b.textEl,uiNode: b.uiNode,actionType: b.actionType,actionData: b.actionData}), i = {BACKSPACE: 8,SPACE: 32}, j = a.core.util.easyTemplate, k = a.kit.extra.language, l = a.core.dom.getSize, m = {hideSuggest: function() {
                a.setStyle(b.uiNode, "display", "none");
                a.custEvent.fire(h, "close", {})
            },keyboardSubmit: function() {
                a.custEvent.fire(b.custObj, "ItemSuggest", {type: "keyboardSubmit",data: {}})
            },addOneItem: function() {
                var c = a.trim(b.textEl.value), e = b.suggestConf.regexp;
                if (c)
                    if (e(c)) {
                        a.custEvent.fire(b.custObj, "ItemSuggest", {type: "addItem",data: {id: c}});
                        a.setStyle(b.textEl, "width", "20px");
                        b.textEl.value = "";
                        m.hideSuggest();
                        d = null
                    } else
                        a.custEvent.fire(b.custObj, "ItemSuggest", {type: "inputError",data: {value: c}})
            },localSearch: function(a) {
                var c = b.suggestConf.data, d = b.suggestConf.searchKey, e = [], f = b.suggestConf.suggestMaxCount, g = 0;
                for (var h = 0, i = c.length; h < i; h++)
                    if (c[h][d] && c[h][d].indexOf(a) == 0)
                        if (f) {
                            if (!(g < f))
                                break;
                            g++;
                            e.push(c[h])
                        } else
                            e.push(c[h]);
                return e
            },setLayerPos: function() {
                a.kit.dom.layoutPos(b.uiNode, b.textEl)
            },getTemplate: function(d) {
                var e = j(k(b.suggestConf.template), d);
                c.suggestContent.innerHTML = e;
                m.setLayerPos();
                if (d.length) {
                    a.setStyle(b.uiNode, "display", "");
                    a.custEvent.fire(h, "open", b.textEl)
                } else
                    m.hideSuggest()
            },reqSucc: function(b, c) {
                a.isArray(b.data) ? m.getTemplate(b.data) : m.getTemplate([])
            },reqFail: function(a, b) {
                m.getTemplate([])
            },buildTrans: function() {
                e = b.suggestConf.trans.getTrans(b.suggestConf.transName, {onSuccess: m.reqSucc,onError: m.reqFail,onFail: m.reqFail})
            },textChange: function(c, d) {
                d && (d = a.trim(d));
                if (!d)
                    m.hideSuggest();
                else if (b.suggestType === "local") {
                    var e = m.localSearch(d);
                    m.getTemplate(e)
                } else if (b.suggestType === "net") {
                    clearTimeout(f);
                    f = setTimeout(function() {
                        m.sendRequest(d)
                    }, 100)
                }
                a.custEvent.fire(b.custObj, "ItemSuggest", {type: "textChange",data: {value: d}})
            },sendRequest: function(a) {
                e || m.buildTrans();
                e.abort();
                e.request({q: a})
            },removeJudge: function() {
                var c = b.textEl.value;
                c == "" && a.custEvent.fire(b.custObj, "ItemSuggest", {type: "remove",data: {}})
            },onSpace: function(b) {
                b = a.fixEvent();
                var c = b.keyCode || b.which;
                if (c == i.SPACE) {
                    m.addOneItem();
                    a.preventDefault()
                }
            },onKeyDown: function(b) {
                b = a.fixEvent();
                var c = b.keyCode || b.which;
                if (c == i.BACKSPACE)
                    m.removeJudge();
                else if (b.ctrlKey && (c == 13 || c == 10)) {
                    m.hideSuggest();
                    m.keyboardSubmit()
                }
            },blur: function() {
                var a = m.hideSuggest;
                setTimeout(function() {
                    a();
                    a = undefined
                }, 150)
            },changeCurrent: function(c, e) {
                var f = b.suggestConf.currentClass;
                d && a.removeClassName(d, f);
                var g = a.sizzle(b.suggestConf.itemTagName, b.uiNode);
                if (g[e]) {
                    a.addClassName(g[e], f);
                    d = g[e]
                } else
                    d = null
            },selectItem: function(c, e) {
                c = a.fixEvent();
                if (!c.ctrlKey) {
                    var f = a.sizzle(b.suggestConf.itemTagName, b.uiNode);
                    if (f[e]) {
                        a.setStyle(b.textEl, "width", "20px");
                        b.textEl.value = "";
                        var g = f[e].getAttribute("action-data");
                        a.custEvent.fire(b.custObj, "ItemSuggest", {type: "select",data: g});
                        m.hideSuggest();
                        try {
                            b.textEl.focus()
                        } catch (h) {
                        }
                        d = null
                    }
                }
            }}, n = a.kit.extra.dynamicInputWidth(b.textEl, {maxInputWidth: b.maxInputWidth,limitWords: b.limitWords});
        a.custEvent.add(n.custObj, "textChange", m.textChange);
        a.addEvent(b.textEl, "blur", m.blur);
        a.addEvent(b.textEl, "keypress", m.onSpace);
        a.addEvent(b.textEl, "keydown", m.onKeyDown);
        a.custEvent.add(h, "onIndexChange", m.changeCurrent);
        a.custEvent.add(h, "onSelect", m.selectItem);
        g.destroy = function() {
            a.custEvent.fire(h, "close", {});
            n && a.custEvent.undefine(n.custObj);
            n && n.destroy();
            a.removeEvent(b.textEl, "blur", m.blur);
            a.removeEvent(b.textEl, "keypress", m.onSpace);
            a.removeEvent(b.textEl, "keydown", m.onKeyDown);
            c = d = e = f = g = h = i = j = k = l = m = n = undefined
        };
        return g
    }
});
STK.register("kit.extra.textareaUtils", function(a) {
    var b = {}, c = document.selection;
    b.selectionStart = function(a) {
        if (!c)
            try {
                return a.selectionStart
            } catch (b) {
                return 0
            }
        var d = c.createRange(), e, f, g = 0, h = document.body.createTextRange();
        try {
            h.moveToElementText(a)
        } catch (b) {
        }
        for (g; h.compareEndPoints("StartToStart", d) < 0; g++)
            h.moveStart("character", 1);
        return g
    };
    b.selectionBefore = function(a) {
        return a.value.slice(0, b.selectionStart(a))
    };
    b.selectText = function(a, b, d) {
        a.focus();
        if (!c)
            a.setSelectionRange(b, d);
        else {
            var e = a.createTextRange();
            e.collapse(1);
            e.moveStart("character", b);
            e.moveEnd("character", d - b);
            e.select()
        }
    };
    b.insertText = function(a, d, e, f) {
        a.focus();
        f = f || 0;
        if (!c) {
            var g = a.value, h = e - f, i = h + d.length;
            a.value = g.slice(0, h) + d + g.slice(e, g.length);
            b.selectText(a, i, i)
        } else {
            var j = c.createRange();
            j.moveStart("character", -f);
            j.text = d
        }
    };
    b.replaceText = function(a, d) {
        a.focus();
        var e = a.value, f = b.getSelectedText(a), g = f.length;
        if (f.length == 0)
            b.insertText(a, d, b.getCursorPos(a));
        else {
            var h = b.getCursorPos(a);
            if (!c) {
                var j = h + f.length;
                a.value = e.slice(0, h) + d + e.slice(h + g, e.length);
                b.setCursor(a, h + d.length);
                return
            }
            var i = c.createRange();
            i.text = d;
            b.setCursor(a, h + d.length)
        }
    };
    b.getCursorPos = function(a) {
        var b = 0;
        if (STK.core.util.browser.IE) {
            a.focus();
            var d = null;
            d = c.createRange();
            var e = d.duplicate();
            e.moveToElementText(a);
            e.setEndPoint("EndToEnd", d);
            a.selectionStartIE = e.text.length - d.text.length;
            a.selectionEndIE = a.selectionStartIE + d.text.length;
            b = a.selectionStartIE
        } else if (a.selectionStart || a.selectionStart == "0")
            b = a.selectionStart;
        return b
    };
    b.getSelectedText = function(a) {
        var b = "", d = function(a) {
            return a.selectionStart != undefined && a.selectionEnd != undefined ? a.value.substring(a.selectionStart, a.selectionEnd) : ""
        };
        window.getSelection ? b = d(a) : b = c.createRange().text;
        return b
    };
    b.setCursor = function(a, b, c) {
        b = b == null ? a.value.length : b;
        c = c == null ? 0 : c;
        a.focus();
        if (a.createTextRange) {
            var d = a.createTextRange();
            d.move("character", b);
            d.moveEnd("character", c);
            d.select()
        } else
            a.setSelectionRange(b, b + c)
    };
    b.unCoverInsertText = function(a, b, c) {
        c = c == null ? {} : c;
        c.rcs = c.rcs == null ? a.value.length : c.rcs * 1;
        c.rccl = c.rccl == null ? 0 : c.rccl * 1;
        var d = a.value, e = d.slice(0, c.rcs), f = d.slice(c.rcs + c.rccl, d == "" ? 0 : d.length);
        a.value = e + b + f;
        this.setCursor(a, c.rcs + (b == null ? 0 : b.length))
    };
    return b
});
STK.register("kit.items.DataItemPicker", function(a) {
    return function(b) {
        var c = a.core.dom.getSize, d = a.kit.extra.merge, e = {}, f, g, h, i, j, k, l, m, n = 0, o = !1, p = function() {
            if (typeof b != "object")
                throw "DataItemPicker need params object";
            if (!a.isNode(b.container))
                throw "DataItemPicker need container(node)";
            if (typeof b.DispItem == "undefined")
                throw "DataItemPicker need DispItem(boolean)";
            if (typeof b.DispItemConf != "object")
                throw "DataItemPicker need DispItemConf";
            if (typeof b.DeletedItem == "undefined")
                throw "DataItemPicker need DeleteItem(boolean)";
            if (typeof b.DeletedItemConf != "object")
                throw "DataItemPicker need DeletedItemConf";
            if (typeof b.ItemSuggest == "undefined")
                throw "DataItemPicker need DeleteItem(boolean)";
            if (typeof b.ItemSuggestConf != "object")
                throw "DataItemPicker need ItemSuggestConf";
            k = b.DispItem;
            l = b.DeletedItem;
            m = b.ItemSuggest;
            o = b.resetHeight
        }, q = function() {
            f = a.kit.dom.parseDOM(a.builder(b.container).list)
        }, r = function() {
            if (m) {
                a.addEvent(f.container, "click", u.focusInput);
                a.addEvent(f.suggestInput, "focus", u.suggestFocus);
                a.addEvent(f.suggestInput, "blur", u.suggestBlur)
            }
        }, s = function() {
            g = a.kit.items.DataController({custObj: e});
            k && (h = a.kit.items.DispItem({custObj: g,limitCount: b.limitCount,DataController: g,nodeList: f.dispItemList,chosenTpl: b.DispItemConf.chosenTpl,unChosenTpl: b.DispItemConf.unChosenTpl}));
            l && (i = a.kit.items.DeletedItem({custObj: g,template: b.DeletedItemConf.template,nodeList: f.container,insertBeforeNode: f.suggestInput}));
            m && (j = a.kit.items.ItemSuggest({textEl: f.suggestInput,uiNode: b.ItemSuggestConf.suggestList,suggestType: b.ItemSuggestConf.suggestType,suggestConf: b.ItemSuggestConf.suggestConf,maxInputWidth: b.ItemSuggestConf.maxInputWidth,limitWords: b.ItemSuggestConf.limitWords,regexp: b.ItemSuggestConf.regexp,custObj: g}));
            k && a.custEvent.add(g, "DispItem", function(b, c) {
                if (c.type == "check") {
                    if (!u.getLimitReach()) {
                        g.addItems(c.data);
                        i.addItems(c.data);
                        a.custEvent.fire(e, "checkedDespItem", {data: c})
                    }
                    u.resetHeight();
                    u.focusInput()
                } else if (c.type == "uncheck") {
                    g.removeItems(c.data);
                    i.removeItems(c.data, !0);
                    u.resetHeight();
                    u.focusInput()
                } else
                    c.type == "focusInput" && u.focusInput()
            });
            l && a.custEvent.add(g, "DeletedItem", function(b, c) {
                if (c.type == "remove") {
                    g.removeItems(c.data);
                    h.setUncheckedItems(c.data);
                    u.resetHeight();
                    a.custEvent.fire(e, "DeletedItemRemove", {DataController: g})
                }
            });
            m && a.custEvent.add(g, "ItemSuggest", function(b, c) {
                if (c.type == "remove") {
                    var j = a.sizzle("[action-type='remove']:last", f.container);
                    if (j.length) {
                        var k = a.queryToJson(j[0].getAttribute("action-data"));
                        k = d(k, {data: j[0].getAttribute("action-data")});
                        g.removeItems(k);
                        i.removeItems(k, !0);
                        h.setUncheckedItems(k);
                        u.resetHeight()
                    }
                    a.custEvent.fire(e, "backspaceKey", {})
                } else if (c.type == "select") {
                    var l = c.data, k = a.queryToJson(l);
                    k = d(k, {data: l});
                    var m = g.hasKey(k);
                    if (!m) {
                        if (!u.getLimitReach()) {
                            g.addItems(k);
                            i.addItems(k);
                            h.setCheckedItems(k)
                        }
                        u.resetHeight()
                    }
                } else if (c.type == "textChange") {
                    u.resetHeight();
                    a.custEvent.fire(e, "textChange", c.data)
                } else if (c.type == "inputError")
                    a.custEvent.fire(e, "inputError", c.data);
                else if (c.type == "addItem") {
                    var n = c.data.id, k = {id: n,data: "id=" + n + "&text=" + n,text: n}, m = g.hasKey(k);
                    if (!m) {
                        if (!u.getLimitReach()) {
                            g.addItems(k);
                            i.addItems(k);
                            h.setCheckedItems(k);
                            a.custEvent.fire(e, "spaceAddItem", c.data)
                        }
                        u.resetHeight()
                    }
                } else
                    c.type == "keyboardSubmit" && a.custEvent.fire(e, "keyboardSubmit", c.data)
            })
        }, t = function() {
            a.custEvent.define(e, ["resultChange", "textChange", "inputError", "keyboardSubmit", "backspaceKey", "DeletedItemRemove", "spaceAddItem", "checkedDespItem"])
        }, u = {suggestFocus: function() {
                n = 1
            },suggestBlur: function() {
                n = 0
            },getLimitReach: function() {
                if (b.limitCount) {
                    var a = g.getResultLength();
                    return a >= b.limitCount ? !0 : !1
                }
                return !1
            },focusInput: function() {
                if (!n) {
                    a.kit.extra.textareaUtils.setCursor(f.suggestInput);
                    n = 1
                }
            },resetHeight: function() {
                if (!!o) {
                    var d = g.getResultLength();
                    if (d) {
                        var e = a.position(f.suggestInput), h = a.position(f.container), i = c(f.suggestInput), j = e.t + i.height - h.t + 3, k = c(f.container).height;
                        k != j && a.setStyle(f.container, "height", j + "px")
                    } else
                        a.setStyle(f.container, "height", b.containerMinHeight + "px")
                }
            }}, v = function() {
            p();
            q();
            r();
            s();
            t()
        };
        v();
        e.getDispItem = function() {
            return h
        };
        e.getDeletedItem = function() {
            return i
        };
        e.getDataController = function() {
            return g
        };
        e.focusInput = u.focusInput;
        e.resetHeight = u.resetHeight;
        e.destroy = function() {
            g.destroy();
            k && h && h.destroy();
            l && i && i.destroy();
            if (m) {
                j && j.destroy();
                a.removeEvent(f.container, "click", u.focusInput);
                a.removeEvent(f.suggestInput, "focus", u.suggestFocus);
                a.removeEvent(f.suggestInput, "blur", u.suggestBlur)
            }
            e = f = g = h = i = j = undefined;
            c = d = k = l = m = n = v = u = undefined
        };
        return e
    }
});
STK.register("kit.dom.addClassNames", function(a) {
    return function(b, c) {
        c = c.split(/\s+/g);
        var d = " " + b.className + " ";
        a.foreach(c, function(a) {
            var b = new RegExp(" " + a + " ");
            b.test(d) || (d += a + " ")
        });
        b.className = a.trim(d)
    }
});
STK.register("kit.dom.removeClassNames", function(a) {
    return function(b, c) {
        c = c.split(/\s+/g);
        var d = " " + b.className + " ";
        a.foreach(c, function(a) {
            var b = new RegExp(" " + a + " ");
            d = d.replace(b, " ")
        });
        b.className = a.trim(d)
    }
});
STK.register("kit.dom.borderedInput", function(a) {
    var b = a.kit.dom.addClassNames, c = a.kit.dom.removeClassNames;
    return function(d, e) {
        e = a.parseParam({addClass: "W_input W_input_focus",removeClass: "W_input_focus",findEl: null}, e);
        var f = {};
        if (!a.isNode(d))
            return {destroy: a.funcEmpty};
        var g = function() {
            var a;
            e.findEl ? a = e.findEl(d) : a = d;
            return a
        }, h = function() {
            var a = g();
            b(a, e.addClass)
        }, i = function() {
            var a = g();
            c(a, e.removeClass)
        };
        a.addEvent(d, "focus", h);
        a.addEvent(d, "blur", i);
        f.destroy = function() {
            a.removeEvent(d, "focus", h);
            a.removeEvent(d, "blur", i)
        };
        return f
    }
});
STK.register("common.extra.rectsPosition", function(a) {
    var b = a.core.util.browser, c = {}, d = 5, e = 20, f = {t: function(a, b) {
            return a.t > b.h
        },b: function(a, b) {
            return a.b > b.h
        },l: function(a, b) {
            return a.l > b.w
        },r: function(a, b) {
            return a.r > b.w
        }}, g = {domSize: function(b) {
            var c = a.core.dom.getSize(b);
            return {w: Math.max(c.width, a.getStyle(b, "width").replace(/px|auto/gi, "")),h: Math.max(c.height, a.getStyle(b, "height").replace(/px|auto/gi, ""))}
        },mouseXY: function(c) {
            var d = {x: c.pageX,y: c.pageY};
            if (b.IE6 || b.IE7) {
                var e = a.core.util.scrollPos();
                d.x = d.x + e.left;
                d.y = d.y + e.top
            }
            return d
        },getRows: function(a) {
            var c = a.getClientRects();
            if (b.IE6 || b.IE7) {
                var d = [], e = {}, f;
                for (var g = 0, h = c.length; g < h; g++) {
                    var i = c[g];
                    e[i.top] || (e[i.top] = []);
                    e[i.top].push(i)
                }
                for (var j in e) {
                    var k = e[j], h = k.length, l = k[0];
                    h > 1 && (l.right = k[h - 1].right);
                    d.push(l)
                }
                c = d
            }
            return c
        },getTextRect: function(b, c) {
            var d = a.parseParam({evt: ""}, c), e = a.core.util.scrollPos(), f;
            if (!b.getClientRects) {
                var h = g.domSize(b);
                return {width: h.w,height: h.h,left: "",right: "",top: "",bottom: ""}
            }
            var i = {rows: g.getRows(b)}, j = g.mouseXY(d.evt), k = {x: j.x - e.left,y: j.y - e.top};
            for (var l = 0, m = i.rows.length; l < m; l++) {
                var n = i.rows[l];
                l == 0 && (f = n);
                if (k.y > n.top && k.y < n.bottom) {
                    f = n;
                    break
                }
            }
            if (a.IE) {
                var h = g.domSize(b);
                f = a.parseParam({width: h.w,height: h.h,left: "",right: "",top: "",bottom: ""}, f)
            }
            return f
        },getDistance: function(b, c) {
            var d = a.core.util.winSize(), e = g.getTextRect(b, c);
            return {win: d,rect: e,w: e.width,h: e.height,t: e.top,l: e.left,r: d.width - e.right,b: d.height - e.bottom}
        },getSeat: function(b, c, d) {
            var h = a.parseParam({distance: e,priority: "trbl"}, d), i = g.getDistance(b, d), j = g.domSize(c);
            i.area = "b";
            var k = h.priority.split("");
            for (var l = 0, m = k.length; l < m; l++) {
                var n = k[l];
                if (!f[n])
                    throw 'priority error, random use "tbrl" combination';
                if (f[n](i, j)) {
                    i.area = n;
                    break
                }
            }
            return i
        },setArrow: function(b) {
            var c = a.parseParam({evt: "",node: "",layer: "",arrow: "",priority: "trbl",css_t: "arrow arrow_b",css_r: "arrow arrow_l",css_b: "arrow arrow_t",css_l: "arrow arrow_r",offset: d,distance: e}, b);
            if (!c.node)
                throw "target node is undefined";
            if (!c.layer)
                throw "layer node is undefined";
            if (!c.arrow)
                throw "arrow node is undefined";
            var f = g.getSeat(c.node, c.layer, c), h = f.area, i = f.rect;
            c.arrow.className = c["css_" + h];
            var j = g.domSize(c.layer), k = a.scrollPos(), l, m;
            if (h == "t" || h == "b") {
                l = h == "t" ? i.top + k.top - j.h - c.offset : i.bottom + k.top + c.offset;
                m = i.left + k.left - c.distance
            } else {
                l = i.top + k.top - c.distance;
                m = h == "r" ? i.right + k.left + c.offset : i.left + k.left - j.w - c.offset
            }
            c.layer.style.top = l + "px";
            c.layer.style.left = m + "px"
        },setLayer: function(b) {
            var c = a.parseParam({evt: "",node: "",layer: "",priority: "btrl",offsetX: 0,offsetY: 0}, b);
            if (!c.node)
                throw "target node is undefined";
            if (!c.layer)
                throw "layer node is undefined";
            var d = g.getSeat(c.node, c.layer, c), e = d.area, f = d.rect, h = g.domSize(c.layer), i = a.scrollPos(), j, k;
            if (e == "t" || e == "b") {
                j = e == "t" ? f.top + i.top - h.h + c.offsetY : f.bottom + i.top - c.offsetY;
                k = f.left + i.left + c.offsetX
            } else {
                j = f.top + i.top + c.offsetY;
                k = e == "r" ? f.right + i.left - c.offsetX : f.left + i.left - h.w + c.offsetX
            }
            c.layer.style.top = j + "px";
            c.layer.style.left = k + "px"
        }};
    c.getTextRect = g.getTextRect;
    c.getDistance = g.getDistance;
    c.getSeat = g.getSeat;
    c.setArrow = g.setArrow;
    c.setLayer = g.setLayer;
    return c
});
STK.register("common.favorite.tagBubble", function(a) {
    var b = function(a, b) {
        window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack(a, b)
    };
    return function(c) {
        var d, e, f, g, h, i, j, k, l = {}, m = 0, n, o, p, q = a.kit.extra.language, r = a.core.util.easyTemplate, s = {ADD: {text: q("#L{最多两个标签，用空格分隔}"),className: "W_tips tips_warn clearfix",classNameS: "icon_warnS"},DEFAULT: {text: q("#L{添加标签来管理你的收藏吧！}"),className: "W_tips tips_warn clearfix",classNameS: "icon_warnS"},ERROR: {text: q("#L{仅支持中英文、数字、减号与“_”}"),className: "W_tips tips_del clearfix",classNameS: "icon_delS"},MAX: {text: q("#L{每条微博最多添加两个标签}"),className: "W_tips tips_del clearfix",classNameS: "icon_delS"},SAME: {text: q("#L{标签不能重复}"),className: "W_tips tips_del clearfix",classNameS: "icon_delS"}}, t = function() {
            if (typeof c == "undefined")
                throw "tagBubble need params";
            if (!a.isNode(c.el))
                throw "tagBubble need el to show";
            if (typeof c.mid == "undefined")
                throw "tagBubble need mid to commit";
            if (typeof c.serverData == "undefined")
                throw "tagBubble need serverData to show"
        }, u = function() {
            d = (c.serverData.my_tags || "").split(" ");
            d.length == 1 && d[0] == "" && (d.length = 0);
            e = c.serverData.mblog_tags || [];
            var b = x.getLabel(), h = {labelText: b.text,labelClass: b.className,labelClassS: b.classNameS,uniqueId: a.getUniqueKey()}, i = '<#et favouriteBubble data><div class="layer_favor_addtags" node-type="eventnode" style="width:215px;_width:240px;"><div class="W_tips tips_succ clearfix"><p class="icon"><span class="icon_succS"></span></p><p class="txt">#L{收藏成功!}</p></div><div class="input_outer" node-type="container"><input type="text" class="W_input" style="width:10px;" value="" name="${data.uniqueId}" id="${data.uniqueId}" node-type="suggestInput" autocomplete="off"/></div><div class="W_tips ${data.labelClass} clearfix" node-type="tipState"><p class="icon"><span class="${data.labelClassS}" node-type="tipStateS"></span></p><p class="txt" node-type="labelText">${data.labelText}</p></div><div class="tags" node-type="dispItemList"></div><div class="btn"><a class="W_btn_d btn_noloading" href="javascript:void(0)" action-type="commitBtn" node-type="commitBtn"><span><b class="loading"></b><em node-type="btnText">#L{添加}</em></span></a><a class="W_btn_b" href="javascript:void(0)" action-type="cancelBtn"><span>#L{取消}</span></a></div></div><div node-type="suggestList" class="layer_menu_list" style="position:absolute;z-index:10000;display:none;"><ul node-type="suggestContent"></ul></div></#et>', j = r(q(i), h).toString();
            g = a.ui.bubble({isHold: !0});
            g.setContent(j);
            f = a.kit.dom.parseDOM(a.builder(g.getOuter()).list)
        }, v = function() {
            k = a.common.trans.favorite.getTrans("alter", {onSuccess: x.commitSucc,onError: x.commitError,onFail: x.commitFail});
            j = a.delegatedEvent(f.eventnode);
            j.add("commitBtn", "click", x.commitBtn);
            j.add("cancelBtn", "click", x.cancelBtn);
            p = a.kit.dom.borderedInput(f.suggestInput, {addClass: "W_input_focus",removeClass: "W_input_focus",findEl: function(a) {
                    return f.container
                }})
        }, w = function() {
            var b = [];
            d.length && (b = b.concat(x.buildItems(d)));
            e.length && (b = b.concat(x.buildItems(e)));
            var c = {};
            for (var i = 0, j = b.length; i < j; i++)
                c[b[i].id] = b[i];
            b.length = 0;
            for (var k in c)
                b[b.length] = c[k];
            h = a.kit.items.DataItemPicker({resetHeight: !1,limitCount: 2,container: g.getOuter(),DispItem: !0,DeletedItem: !0,ItemSuggest: !0,DispItemConf: {chosenTpl: '<#et chosenTpl data><#list data as list><a class="S_link1 choose" href="javascript:void(0)" action-type="uncheck" action-data="${list.data}" itemid="${list.id}">${list.text}</a></#list></#et>',unChosenTpl: '<#et unChosenTpl data><#list data as list><a class="S_link1" href="javascript:void(0)" action-type="check" action-data="${list.data}" itemid="${list.id}">${list.text}</a></#list></#et>'},DeletedItemConf: {template: function() {
                        var a = window.$CONFIG && window.$CONFIG.imgPath || "http://img.t.sinajs.cn/t4/";
                        return '<#et deleteList data><#list data as list><span class="W_btn_deltags" href="javascript:void(0)" itemid="${list.id}">${list.text}<a class="W_ico12 icon_close" href="javascript:void(0)" action-type="remove" action-data="${list.data}"></a></span></#list></#et>'
                    }()},ItemSuggestConf: {suggestType: "none",suggestList: f.suggestList,suggestConf: {regexp: function(a) {
                            return a === "全部" || a === "未加标签" || a === "未加標籤" ? !1 : /^[a-zA-Z0-9\u4e00-\u9fa5\-_]+$/.test(a) ? !0 : !1
                        },suggestMaxCount: 5,itemTagName: "li",currentClass: "cur",template: '<#et suggest data><#list data as list><li action-type="suggestItem" action-data="${list.data}"><a href="javascript:void(0)">${list.text}</a></li></#list></#et>',data: b,searchKey: "text"},maxInputWidth: 200,limitWords: 12},containerMinHeight: 22})
        }, x = {deletedItemRemove: function(b, c) {
                var d = a.trim(f.suggestInput.value);
                x.regExpTest({}, {value: d})
            },commitSucc: function() {
                a.custEvent.fire(l, "success", {})
            },commitError: function(b, c) {
                a.custEvent.fire(l, "error", {msg: b.msg})
            },commitFail: function() {
                a.custEvent.fire(l, "error", {msg: q("#L{标签添加失败}")})
            },getResultStr: function() {
                var a = i.getResult(), b = [];
                for (var c = 0, d = a.length; c < d; c++)
                    b.push(a[c].id);
                return b.join(" ")
            },cancelBtn: function(b) {
                a.preventDefault(b.evt);
                g.hide()
            },realSubmit: function(b) {
                var d = x.getResultStr();
                b && (d ? d += " " + b : d = b);
                if (!d)
                    g.hide();
                else {
                    var e = {mid: c.mid,tags: d};
                    e = a.common.getDiss(e);
                    m = 1;
                    try {
                        f.suggestInput.blur()
                    } catch (h) {
                    }
                    k.request(e);
                    g.hide()
                }
            },inArray: function(a, b) {
                for (var c = 0, d = b.length; c < d; c++)
                    if (b[c].id == a)
                        return !0;
                return !1
            },commit: function() {
                x.commitSuda();
                var b = a.trim(f.suggestInput.value);
                if (b) {
                    var c = i.getResult();
                    if (c.length >= 2) {
                        x.setLabel("max");
                        h.focusInput()
                    } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5\-_]+$/.test(b)) {
                        x.setLabel("error");
                        h.focusInput()
                    } else {
                        var d = x.inArray(b, c);
                        if (d) {
                            x.setLabel("same");
                            h.focusInput()
                        } else
                            x.realSubmit(b)
                    }
                } else
                    x.realSubmit()
            },commitBtn: function(b) {
                a.preventDefault(b.evt);
                m || x.commit()
            },getLabel: function() {
                return d.length ? s.ADD : s.DEFAULT
            },buildItems: function(a) {
                var b = [];
                for (var c = 0, d = a.length; c < d; c++) {
                    var e = a[c];
                    b.push({id: e,data: "id=" + e + "&text=" + e,text: e})
                }
                return b
            },regExpTest: function(a, b) {
                var c = b.value;
                if (c == "" || /^[a-zA-Z0-9\u4e00-\u9fa5\-_]+$/.test(c)) {
                    var d = i.getResultLength();
                    d ? x.setLabel("add") : x.setLabel("right")
                }
            },backSpaceKey: function() {
                x.regExpTest({}, {value: ""})
            },setLabel: function(a, b) {
                if (a == "right") {
                    var c = x.getLabel();
                    f.labelText.innerHTML = c.text;
                    f.tipState.className = c.className;
                    f.tipStateS.className = c.classNameS
                } else {
                    var c = s[a.toUpperCase()];
                    f.labelText.innerHTML = b || c.text;
                    f.tipState.className = c.className;
                    f.tipStateS.className = c.classNameS
                }
            },inputError: function(a, b) {
                b.value === "全部" || b.value === "未加标签" || b.value === "未加標籤" ? x.setLabel("error", q("#L{对不起，不能使用此标签}")) : x.setLabel("error")
            },bubbleHide: function() {
                m || x.closeSuda();
                A();
                a.custEvent.remove(g, "hide", arguments.callee)
            },showFavSucc: function() {
                m || a.custEvent.fire(l, "success", {blankNoTag: !0});
                m = undefined;
                a.custEvent.remove(g, "hide", arguments.callee)
            },setPos: function() {
                var b = a.position(c.el);
                if (!o || o.l != b.l || o.t != b.t) {
                    o = b;
                    a.common.extra.rectsPosition.setArrow({node: c.el,layer: g.getDom("outer"),arrow: g.getDom("arrow"),priority: "btrl"})
                }
            },spaceAddItemSuda: function() {
                b("favor", "input_tag")
            },checkedDespItemSuda: function() {
                b("favor", "click_tag")
            },closeSuda: function() {
                b("favor", "identify_cancel")
            },commitSuda: function() {
                b("favor", "identify_do")
            }}, y = function() {
            a.custEvent.define(l, ["success", "error"]);
            a.custEvent.add(h, "textChange", x.regExpTest);
            a.custEvent.add(h, "inputError", x.inputError);
            a.custEvent.add(h, "keyboardSubmit", x.commit);
            a.custEvent.add(h, "backspaceKey", x.backSpaceKey);
            a.custEvent.add(h, "DeletedItemRemove", x.deletedItemRemove);
            a.custEvent.add(h, "spaceAddItem", x.spaceAddItemSuda);
            a.custEvent.add(h, "checkedDespItem", x.checkedDespItemSuda)
        }, z = function() {
            var b = h.getDispItem(), f = x.buildItems(d.slice(0, 5));
            b.addItems(f, {type: "unChosen"});
            var j = h.getDeletedItem(), k = x.buildItems(e);
            j.addItems(k);
            b.setCheckedItems(k);
            i = h.getDataController();
            i.addItems(k);
            document.body.appendChild(g.getOuter());
            g.show();
            a.custEvent.add(g, "hide", x.showFavSucc);
            a.custEvent.add(g, "hide", x.bubbleHide);
            x.setPos();
            o = a.position(c.el);
            n = setInterval(x.setPos, 1e3);
            h.resetHeight();
            h.focusInput()
        }, A = function() {
            p && p.destroy && p.destroy();
            clearInterval(n);
            j && j.destroy();
            h && h.destroy();
            a.removeNode(g.getOuter());
            g && g.destroy();
            a.custEvent.undefine(h);
            d = e = h = i = j = k = n = o = undefined;
            f = n = q = r = s = x = z = B = A = p = undefined
        }, B = function() {
            t();
            u();
            v();
            w();
            y();
            z()
        };
        B();
        l.destroy = A;
        return l
    }
});
STK.register("common.feed.feedList.plugins.favorite", function(a) {
    var b = a.common.feed.feedList.utils, c = a.kit.extra.language, d, e = c("#L{取消收藏}"), f = c("#L{收藏}"), g, h = function() {
        window.location.href = "/fav";
        return
    }, i = function(b, i, j, k, l, m, n) {
        g && g.destroy();
        var o = !0;
        l === !1 && m === !0 && (o = !1);
        g = a.common.favorite.favorite({showTip: o,mid: k,node: i,mark: n});
        if (!g)
            a.log("favoriteObj is undefined!");
        else {
            var p = e, q = "";
            a.custEvent.add(g, "success", function(e, f) {
                if (l && !m) {
                    g && g.destroy();
                    j.style.height = j.offsetHeight + "px";
                    j.innerHTML = "";
                    var n = a.tween(j, {end: function() {
                            n.destroy();
                            a.removeNode(j);
                            i = j = null;
                            var c = a.kit.extra.parseURL(), d = a.core.json.queryToJson(c.query), e = "";
                            c.path == "fav" && (e = "page");
                            a.custEvent.fire(b, "request", [e, d]);
                            b.getFeedCount() < 1 && h()
                        }}).play({height: 0})
                } else {
                    i.innerHTML = p;
                    i.className = q;
                    i.setAttribute("favorite", m ? "1" : "0");
                    if (m && f.data && f.data.ispower) {
                        i.setAttribute("tagBubble", "1");
                        var o = a.common.favorite.tagBubble({mid: k,el: i,serverData: f.data || {}});
                        a.custEvent.add(o, "success", function(b, c) {
                            a.custEvent.undefine(o);
                            o = undefined;
                            c.blankNoTag || g.showSuccTip(i);
                            i.removeAttribute("tagBubble")
                        });
                        a.custEvent.add(o, "error", function(b, d) {
                            a.custEvent.undefine(o);
                            o = undefined;
                            g.showErrTip(i, d.msg || c("#L{标签添加失败}"));
                            i.removeAttribute("tagBubble")
                        })
                    }
                }
                d = null
            });
            a.custEvent.add(g, "fail", function() {
                d = null
            });
            a.custEvent.add(g, "error", function() {
                d = null
            });
            a.custEvent.add(g, "cancel", function() {
                d = null
            });
            if (m)
                g.add();
            else {
                q = "";
                p = f;
                g.del()
            }
        }
    }, j = function(a, c, e, f, h) {
        var j = c.el, k = b.getMid(j, e), l = c.data.mark, m = b.getFeedNode(j, e);
        if (d != k) {
            j.getAttribute("tagBubble") && setTimeout(function() {
                g && g.msgTipDetroy()
            }, 0);
            d = k;
            var n = j.getAttribute("favorite") != "1";
            i(a, j, m, k, f, n, l)
        }
    };
    return function(c, d) {
        if (!c)
            a.log("favorite : need object of the baseFeedList Class");
        else {
            d = a.parseParam({isFavoritePage: !1}, d);
            var e = c.getNode(), f = {};
            a.custEvent.define(f, "showForward");
            c.getDEvent().add("feed_list_favorite", "click", function(g) {
                a.custEvent.fire(c, "clearTips", "favorite");
                var h = g.el, i = h.dataset && h.dataset.mark || h.getAttribute("data-mark") || "", k = {};
                i && (k = a.queryToJson(i));
                g.data = a.core.json.merge(g.data, k);
                j(c, g, e, d.isFavoritePage, f);
                return b.preventDefault(g.evt)
            });
            f.hideTip = function(a) {
                g && (a ? g.hideTip() : g.anihideTip());
                setTimeout(function() {
                    g && g.msgTipDetroy()
                }, 0)
            };
            f.destroy = function() {
                g && g.destroy()
            };
            return f
        }
    }
});
STK.register("common.trans.comment", function(a) {
    var b = a.kit.io.inter(), c = b.register;
    c("smallList", {url: "/aj/comment/small?_wv=5",method: "get"});
    c("add", {url: "/aj/comment/add?_wv=5",method: "post"});
    c("delete", {url: "/aj/comment/del?_wv=5",method: "post"});
    c("hotChange", {url: "/aj/comment/hotchange?_wv=5"});
    c("privateSetting", {url: "/aj/account/setcommentprivacy?_wv=5",method: "post"});
    c("privateNoMore", {url: "/aj/bubble/closebubble?_wv=5",method: "get"});
    c("cfilter", {url: "/aj/comment/small?_wv=5",method: "get"});
    c("isComment", {url: "/aj/comment/privacy?_wv=5",method: "get"});
    c("getIn", {url: "/aj/commentbox/in?_wv=5",method: "get"});
    c("getOut", {url: "/aj/commentbox/out?_wv=5",method: "get"});
    c("getComment", {url: "/aj/at/comment/comment?_wv=5",method: "get"});
    c("getCommonComent", {url: "/aj/commentbox/common?_wv=5",method: "get"});
    c("dialogue", {url: "/aj/comment/conversation?_wv=5",method: "get"});
    return b
});
STK.register("kit.extra.setPlainHash", function(a) {
    return function(b) {
        try {
            var c = window.$CONFIG;
            c && c.bigpipe === "true" && a.historyM ? a.historyM.setPlainHash(b) : window.location.hash = b
        } catch (d) {
        }
    }
});
STK.register("common.trans.validateCode", function(a) {
    var b = a.kit.io.inter(), c = b.register;
    c("checkValidate", {url: "/aj/pincode/verified?_wv=5",method: "post"});
    return b
});
STK.register("common.dialog.validateCode", function(a) {
    var b = window.$LANG, c = a.kit.extra.language, d = "/aj/pincode/pin?type=rule&lang=" + $CONFIG.lang + "&ts=", e = {dialog_html: '<div class="layer_veriyfycode"><div class="v_image"><img height="50" width="450" class="yzm_img" /></div><p class="v_chng"><a href="#" onclick="return false;" class="yzm_change" action-type="yzm_change">#L{换另一组题目}</a></p><p class="v_ans_t">#L{请输入上面问题的答案}：</p><p class="v_ans_i"><input type="text" class="W_inputStp v_inp yzm_input ontext" action-type="yzm_input"/><div class="M_notice_del yzm_error" style="display:none;"><span class="icon_del"></span><span class="txt"></span></div></p><p class="v_btn"><a class="W_btn_d yzm_submit" href="#" action-type="yzm_submit"><span>#L{确定}</span></a><a class="W_btn_b yzm_cancel" href="#" action-type="yzm_cancel" action-data="value=frombtn"><span>#L{取消}</span></a></p></div>'}, f;
    return function() {
        if (f)
            return f;
        var b = {}, g = {}, h, i, j, k, l = function() {
            g.yzm_error.innerHTML = "";
            g.yzm_error.parentNode.style.display = "none"
        }, m = function(a) {
            g.yzm_error.innerHTML = a;
            g.yzm_error.parentNode.style.display = ""
        }, n = function() {
            a.kit.io.cssLoader("style/css/module/layer/layer_verifycode.css", "js_style_css_module_layer_layer_verifycode", function() {
                h || o();
                l();
                h.show();
                t.changesrc();
                h.setMiddle();
                g.input_text.value = "";
                a.hotKey.add(document.documentElement, ["esc"], t.closeDialog, {type: "keyup",disableInInput: !0})
            })
        }, o = function() {
            h = a.ui.dialog({isHold: !0});
            h.setTitle(c("#L{请输入验证码}"));
            h.setContent(c(e.dialog_html));
            var b = h.getOuter();
            s(b);
            u()
        }, p = a.common.trans.validateCode.getTrans("checkValidate", {onError: function() {
                m(c("#L{验证码错误}"));
                t.changesrc();
                j = !1;
                g.input_text.value = ""
            },onFail: function() {
                m(c("#L{验证码错误}"));
                t.changesrc();
                g.input_text.value = "";
                j = !1
            },onSuccess: function(b, c) {
                var d = b.data.retcode;
                l();
                g.input_text.value = "";
                h.hide();
                var e = i.requestAjax, f = a.kit.extra.merge(i.param, {retcode: d});
                e.request(f);
                j = !1
            }}), q = function() {
        }, r = function() {
        }, s = function(b) {
            g.vImg = a.core.dom.sizzle("img.yzm_img", b)[0];
            g.yzm_change = a.core.dom.sizzle("a.yzm_change", b)[0];
            g.yzm_submit = a.core.dom.sizzle("a.yzm_submit", b)[0];
            g.yzm_cancel = a.core.dom.sizzle("a.yzm_cancel", b)[0];
            g.input_text = a.core.dom.sizzle("input.yzm_input", b)[0];
            g.yzm_error = a.core.dom.sizzle("div.yzm_error span.txt", b)[0];
            g.close_icon = h.getDom("close")
        }, t = {enter: function() {
                a.fireEvent(g.yzm_submit, "click")
            },changesrc: function() {
                var b = d + a.getUniqueKey();
                g.vImg.setAttribute("src", b);
                try {
                    g.yzm_change.blur()
                } catch (c) {
                }
            },checkValidateCode: function() {
                l();
                var b = a.core.str.trim(g.input_text.value);
                if (!b)
                    m(c("#L{请输入验证码}"));
                else if (!j) {
                    j = !0;
                    p.request({secode: b,type: "rule"})
                }
                try {
                    g.yzm_submit.blur()
                } catch (d) {
                }
            },closeDialog: function(b) {
                typeof b == "object" && b.el && h.hide();
                typeof i == "object" && i.onRelease && typeof i.onRelease == "function" && i.onRelease();
                a.hotKey.remove(document.documentElement, ["esc"], t.closeDialog, {type: "keyup"});
                try {
                    a.preventDefault()
                } catch (c) {
                }
            },onFocus: function(b) {
                b = a.core.evt.getEvent();
                var c = b.target || b.srcElement, d = c.value;
                d || l()
            }}, u = function() {
            var b = h.getOuter();
            k = a.core.evt.delegatedEvent(b);
            k.add("yzm_change", "click", function() {
                t.changesrc();
                a.preventDefault()
            });
            k.add("yzm_submit", "click", function() {
                t.checkValidateCode();
                a.preventDefault()
            });
            k.add("yzm_cancel", "click", t.closeDialog);
            a.core.evt.addEvent(g.close_icon, "click", t.closeDialog);
            a.core.evt.addEvent(g.input_text, "focus", t.onFocus);
            a.core.evt.addEvent(g.input_text, "blur", t.onFocus);
            a.hotKey.add(g.input_text, ["enter"], t.enter, {type: "keyup"})
        }, v = function() {
            if (h) {
                k.destroy();
                a.core.evt.removeEvent(g.close_icon, "click", t.closeDialog);
                a.core.evt.removeEvent(g.input_text, "focus", t.onFocus);
                a.core.evt.removeEvent(g.input_text, "blur", t.onFocus);
                h && h.destroy && h.destroy()
            }
            h = f = null
        }, w = function(a, b, c) {
            if (a.code == "100027") {
                i = c;
                n()
            } else if (a.code === "100000")
                try {
                    var d = c.onSuccess;
                    d && d(a, b)
                } catch (e) {
                }
            else
                try {
                    if (a.code === "100002") {
                        window.location.href = a.data;
                        return
                    }
                    var d = c.onError;
                    d && d(a, b)
                } catch (e) {
                }
        };
        r();
        r = null;
        b.destroy = v;
        b.validateIntercept = w;
        b.addUnloadEvent = function() {
            h && a.core.evt.addEvent(window, "unload", v)
        };
        f = b;
        return b
    }
});
STK.register("ui.litePrompt", function(a) {
    var b = a.kit.extra.language, c = a.core.util.easyTemplate;
    return function(b, d) {
        var e, f, g, h, i, d = a.parseParam({hideCallback: a.core.func.empty,type: "succM",msg: "",timeout: ""}, d), j = d.template || '<#et temp data><div class="W_layer" node-type="outer"><div class="bg"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div class="content layer_mini_info_big" node-type="inner"><p class="clearfix"><span class="icon_${data.type}"></span>${data.msg}&nbsp; &nbsp; &nbsp;</p></div></td></tr></tbody></table></div></div></#et>', k = c(j, {type: d.type,msg: b}).toString();
        f = {};
        g = a.ui.mod.layer(k);
        i = g.getOuter();
        a.custEvent.add(g, "hide", function() {
            a.ui.mask.back();
            d.hideCallback && d.hideCallback();
            a.custEvent.remove(g, "hide", arguments.callee);
            clearTimeout(h)
        });
        a.custEvent.add(g, "show", function() {
            document.body.appendChild(i);
            a.ui.mask.showUnderNode(i);
            a.ui.mask.getNode().style.zIndex = 10002
        });
        g.show();
        d.timeout && (h = setTimeout(g.hide, d.timeout));
        var l = a.core.util.winSize(), m = g.getSize(!0);
        i.style.top = a.core.util.scrollPos().top + (l.height - m.h) / 2 + "px";
        i.style.left = (l.width - m.w) / 2 + "px";
        i.style.zIndex = 10002;
        f.layer = g;
        return f
    }
});
STK.register("common.dialog.commentPrivateSetting", function(a) {
    var b = 1, c = 0, d = {}, e, f, g = 0, h, i = {}, j = 0, k = 0, l = a.kit.extra.language, m = function() {
        var d = a.getUniqueKey, f = a.core.util.easyTemplate, g = a.kit.dom.parseDOM, i = {id1: "key" + d(),id2: "key" + d(),id3: "key" + d(),showType: b,set: c}, j = '<#et privateSetting data><div class="detail layer_setup_privacy" node-type="content"><div class="W_tips tips_warn clearfix"><p class="icon"><span class="icon_warnS"></span></p><p class="txt">#L{为了避免受到不必要的骚扰，建议设置“可信用户”可以评论我的微博。}</p></div><p class="privacy_title">#L{设置谁可以评论我的微博}</p><ul class="privacy_repliable">\t<li><label for="${data.id1}"><input type="radio" class="W_radio" value="0" name="comment" id="${data.id1}" action-type="choose" <#if (data.showType == 1)>checked="checked"</#if><#if (data.showType==2 && data.set==0)>checked="checked"</#if>/>&nbsp;#L{所有人}<span class="S_txt2">#L{（不包括你的黑名单用户）}</span></label></li>  <li><label for="${data.id2}"><input type="radio" class="W_radio" value="2" name="comment" id="${data.id2}" action-type="choose" <#if (data.showType==2 && data.set==2)>checked="checked"</#if>/>&nbsp;#L{可信用户}<span class="S_txt2">#L{（包括我关注的人、新浪认证用户、微博达人以及手机绑定用户）}</span></label></li>  <li><label for="${data.id3}"><input type="radio" class="W_radio" value="1" name="comment" id="${data.id3}" action-type="choose" <#if (data.showType==2 && data.set==1)>checked="checked"</#if>/>&nbsp;#L{我关注的人}</label></li></ul><div class="btn"><a href="javascript:void(0)" class="W_btn_d" action-type="OK" node-type="OK" style="visibility:hidden;"><span>#L{保存}</span></a><#if (data.showType==1)><a href="javascript:void(0)" class="W_btn_b" action-type="cancel" node-type="noMore"><span>#L{不再提示}</span></a></#if><#if (data.showType==2)><a href="javascript:void(0)" class="W_btn_b" action-type="hide" node-type="hide"><span>#L{取消}</span></a></#if></div></div></#et>';
        e = a.ui.dialog();
        e.setTitle(l("#L{评论隐私设置}"));
        e.setContent(f(l(j), i).toString());
        h = g(a.builder(e.getOuter()).list)
    }, n = {chooseItem: function(d) {
            g = d.el.value;
            b == 1 ? a.setStyle(h.OK, "visibility", g == 0 ? "hidden" : "visible") : a.setStyle(h.OK, "visibility", g == c ? "hidden" : "visible")
        },save: function(b) {
            g = parseInt(g, 10);
            if (g > -1) {
                if (j)
                    return;
                j = 1;
                i.save.request({comment: g})
            }
            return a.preventDefault(b.evt)
        },cancel: function(b) {
            if (!k) {
                k = 1;
                s();
                e.hide();
                i.noMore.request({bubbletype: 5,time: 604800});
                return a.preventDefault(b.evt)
            }
        },hide: function(b) {
            s();
            e.hide();
            return a.preventDefault(b.evt)
        }}, o = {getSetErr: function() {
            a.ui.alert(l("#L{对不起，评论隐私设置获取失败}"))
        },getAlert: function(b, c, d) {
            var f = a.ui.tipAlert({showCallback: function() {
                    setTimeout(function() {
                        f && f.anihide()
                    }, 500)
                },hideCallback: function() {
                    f && f.destroy();
                    b ? setTimeout(function() {
                        d && d();
                        s();
                        e.hide()
                    }, 200) : d && d()
                },msg: c,type: b ? undefined : "del"});
            return f
        },saveSuccess: function(b, c) {
            e.hide();
            a.ui.litePrompt(l("#L{保存成功}"), {type: "succM",timeout: "1000",hideCallback: function() {
                    window.location.reload()
                }})
        },saveError: function() {
            var a = o.getAlert(!1, l("#L{保存失败，请重试}"), function() {
                j = 0
            });
            a.setLayerXY(h.OK);
            a.aniShow()
        },noMoreSuccess: function() {
            k = 0
        },noMoreError: function() {
            k = 0
        }}, p = function() {
        g = 0;
        k = 0;
        f = a.delegatedEvent(h.content);
        f.add("choose", "click", n.chooseItem);
        f.add("OK", "click", n.save);
        f.add("cancel", "click", n.cancel);
        f.add("hide", "click", n.hide)
    }, q = function() {
        i.save = a.common.trans.comment.getTrans("privateSetting", {onSuccess: o.saveSuccess,onError: o.saveError});
        i.noMore = a.common.trans.comment.getTrans("privateNoMore", {onSuccess: o.noMoreSuccess,onError: o.noMoreError})
    }, r = function(a) {
        if (a) {
            a.data && a.data.set && (c = a.data.set);
            b = !c ? 1 : 2
        }
        q();
        m();
        p();
        e.show();
        e.setMiddle()
    }, s = function() {
        f && f.destroy()
    };
    d.show = r;
    return d
});
STK.register("common.comment.inter", function(a) {
    var b = null, c = function() {
    }, d = a.ui.alert, e, f = a.common.dialog.commentPrivateSetting, g = a.kit.extra.language, h = function(b, c) {
        if (b && b.code) {
            b.code != "100000" && b.code != "100005" && a.common.layer.ioError(b.code, b);
            c(b)
        }
    };
    return function(f, i) {
        e = a.common.dialog.validateCode();
        var j = {}, k = 0, l = a.common.trans.comment;
        f = a.parseParam({delete_success: c,delete_fail: c,delete_error: c,add_success: c,add_fail: c,add_error: c,smallList_success: c,smallList_fail: c,smallList_error: c}, f || {});
        j.conf = a.parseParam({act: b,mid: b,cid: b,uid: $CONFIG.uid,page: b,forward: b,isroot: b,content: b,type: b,is_block: b,appkey: b}, i);
        j.merge = function(b) {
            b = a.kit.extra.merge(j.conf, b);
            return a.core.obj.clear(b)
        };
        j.request = function(b, c) {
            if (!k) {
                k = 1;
                var i = j.merge(c), m = l.getTrans(b, {onComplete: function(c, j) {
                        if (b == "add") {
                            var l = {onSuccess: function(a, c) {
                                    h(a, function(a) {
                                        f[b + (a.code == "100000" ? "_success" : "_fail")](a, i)
                                    })
                                },onError: function(c, e) {
                                    f[b + "_error"](c, i);
                                    c.code == "100005" ? d(g("#L{由于对方隐私设置，你无法进行评论。}"), {textSmall: g("#L{绑定手机后可以更多地参与评论。}") + '<a href="http://account.weibo.com/settings/mobile" target="_blank">' + g("#L{立即绑定}") + "</a>"}) : a.common.layer.ioError(c.code, c)
                                },param: i,requestAjax: m};
                            e.validateIntercept(c, j, l)
                        } else
                            h(c, function(a) {
                                if (a.code == "100000")
                                    f[b + "_success"](a, i);
                                else {
                                    var c = f[b + "_fail"];
                                    typeof c == "function" ? f[b + "_fail"](a, i) : f[b + "_success"](a, i)
                                }
                            });
                        k = 0
                    },onFail: function() {
                        k = 0
                    }});
                m.request(i)
            }
        };
        j.load = function(a) {
            j.request("smallList", a)
        };
        j.del = function(a) {
            j.request("delete", a)
        };
        j.post = function(a) {
            j.request("add", a)
        };
        e.addUnloadEvent();
        return j
    }
});
STK.register("common.channel.at", function(a) {
    var b = ["open", "close"];
    return a.common.listener.define("common.channel.at", b)
});
STK.register("kit.dom.autoHeightTextArea", function(a) {
    var b = a.core.util.browser.MOZ, c = function(c) {
        var d = a.core.dom.getStyle, e;
        c.defaultHeight || (c.defaultHeight = parseInt(d(c, "height"), 10) || parseInt(c.offsetHeight, 10) || 20);
        if (a.core.util.browser.IE) {
            var f = parseInt(d(c, "paddingTop"), 10) + parseInt(d(c, "paddingBottom"), 10);
            e = Math.max(c.scrollHeight - f, c.defaultHeight)
        } else {
            var f = b ? 0 : parseInt(d(c, "paddingTop"), 10) + parseInt(d(c, "paddingBottom"), 10), g = a.E("_____textarea_____");
            if (!g) {
                g = a.C("textarea");
                g.id = "_____textarea_____";
                document.body.appendChild(g)
            }
            if (g.currentTarget != c) {
                var h = [];
                h.push("width:" + d(c, "width"));
                h.push("font-size:" + d(c, "fontSize"));
                h.push("font-family:" + d(c, "fontFamily"));
                h.push("line-height:" + d(c, "lineHeight"));
                h.push("padding-left:" + d(c, "paddingLeft"));
                h.push("padding-right:" + d(c, "paddingRight"));
                h.push("padding-top:" + d(c, "paddingTop"));
                h.push("padding-bottom:" + d(c, "paddingBottom"));
                h.push("top:-1000px");
                h.push("height:0px");
                h.push("position:absolute");
                h.push("overflow:hidden");
                h.push("");
                h = h.join(";");
                g.style.cssText = h
            }
            g.value = c.value;
            e = Math.max(g.scrollHeight - f, c.defaultHeight);
            g.currentTarget = c
        }
        return e
    };
    return function(b) {
        function j(b) {
            var c = a.core.dom.getStyle, d, e = [];
            e.push("width:" + c(b, "width"));
            e.push("font-size:" + c(b, "fontSize"));
            e.push("font-family:" + c(b, "fontFamily"));
            e.push("line-height:" + c(b, "lineHeight"));
            e.push("padding-left:" + c(b, "paddingLeft"));
            e.push("padding-right:" + c(b, "paddingRight"));
            e.push("padding-top:" + c(b, "paddingTop"));
            e.push("padding-bottom:" + c(b, "paddingBottom"));
            e.push("top:-1000px");
            e.push("height:0px");
            e.push("position:absolute");
            e.push("overflow:hidden");
            e.push("");
            e = e.join(";");
            return e
        }
        var d = b.textArea, e = b.maxHeight, f = b.inputListener, g = d.style, h;
        (h = function() {
            typeof f == "function" && f();
            setTimeout(function() {
                var a = c(d), b;
                e = e || a;
                var f = a > e;
                b = f ? e : a;
                g.overflowY = f ? "auto" : "hidden";
                g.height = Math.min(e, a) + "px"
            }, 0)
        })();
        if (!a.core.util.browser.IE)
            try {
                a.common.channel.at.register("open", function() {
                    a.E("_____textarea_____").style.cssText = j(d)
                })
            } catch (i) {
                a.log(i)
            }
        if (!d.binded) {
            a.addEvent(d, "keyup", h);
            a.addEvent(d, "focus", h);
            a.addEvent(d, "blur", h);
            d.binded = !0;
            d.style.overflow = "hidden"
        }
    }
});
STK.register("kit.extra.count", function(a) {
    function b(b) {
        var c = 41, d = 140, e = 20, f = b, g = b.match(/http:\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/,:;@&=\?\~\#\%]*)*/gi) || [], h = 0;
        for (var i = 0, j = g.length; i < j; i++) {
            var k = a.core.str.bLength(g[i]);
            if (/^(http:\/\/t.cn)/.test(g[i]))
                continue;
            /^(http:\/\/)+(t.sina.com.cn|t.sina.cn)/.test(g[i]) || /^(http:\/\/)+(weibo.com|weibo.cn)/.test(g[i]) ? h += k <= c ? k : k <= d ? e : k - d + e : h += k <= d ? e : k - d + e;
            f = f.replace(g[i], "")
        }
        var l = Math.ceil((h + a.core.str.bLength(f)) / 2);
        return l
    }
    return function(a) {
        a = a.replace(/\r\n/g, "\n");
        return b(a)
    }
});
STK.register("ui.mod.editor", function(a) {
    var b = a.core.evt.addEvent, c = a.core.evt.custEvent, d = a.core.dom.getStyle, e = a.core.dom.setStyle;
    return function(b, c) {
        var d = {}, c = c, e = {}, f = "", g = "", h = "", i = {reset: function() {
                e.textEl.value = "";
                a.core.evt.custEvent.fire(d, "changed");
                e.textEl.removeAttribute("extra");
                f = g = h = ""
            },delWords: function(a) {
                var b = i.getWords();
                if (!(b.indexOf(a) > -1))
                    return !1;
                e.textEl.value = "";
                k.textInput(b.replace(a, ""))
            },getWords: function() {
                return a.core.str.trim(e.textEl.value)
            },getExtra: function() {
                var b, c = e.textEl.getAttribute("extra") || "";
                c != null && (b = a.core.str.trim(c));
                return b
            },focus: function(b, c) {
                if (typeof b != "undefined")
                    a.kit.extra.textareaUtils.setCursor(e.textEl, b, c);
                else {
                    var d = e.textEl.value.length;
                    a.kit.extra.textareaUtils.setCursor(e.textEl, d)
                }
                j.cacheCurPos()
            },blur: function() {
                e.textEl.blur()
            },addExtraInfo: function(a) {
                typeof a == "string" && e.textEl.setAttribute("extra", a)
            },disableEditor: function(b) {
                a.core.evt.removeEvent(e.textEl, "mouseup", j.cacheCurPos);
                if (b === !0)
                    e.textEl.setAttribute("disabled", "disabled");
                else {
                    a.core.evt.addEvent(e.textEl, "mouseup", j.cacheCurPos);
                    e.textEl.removeAttribute("disabled")
                }
            },getCurPos: function() {
                var a = e.textEl.getAttribute("range") || "0&0";
                return a.split("&")
            },count: function() {
                var b = a.core.str.trim(e.textEl.value).length == 0 ? a.core.str.trim(e.textEl.value) : e.textEl.value;
                return a.kit.extra.count(b)
            },addShortUrlLog: function(b) {
                b = b && a.trim(b);
                if (b) {
                    var c = new RegExp("^" + b + "$|" + "_" + b + "$|^" + b + "_|" + "_" + b + "_");
                    c.test(f) || (f ? f = f + "_" + b : f = b)
                }
            },getShortUrlLog: function() {
                return f
            },setCurrentLogType: function(a) {
                g = a
            },getCurrentLogType: function() {
                return g
            },setImageLogType: function(a) {
                h = a
            },getImageLogType: function() {
                return h
            }}, j = {textElFocus: function() {
                e.recommendTopic && a.core.dom.setStyle(e.recommendTopic, "display", "none");
                a.custEvent.fire(d, "focus");
                e.num && a.core.dom.setStyle(e.num, "display", "block");
                i.getWords() == c.tipText && i.delWords(c.tipText)
            },textElBlur: function() {
                setTimeout(function() {
                    if (e.textEl.value.length === 0) {
                        e.recommendTopic && a.core.dom.setStyle(e.recommendTopic, "display", "block");
                        e.num && e.recommendTopic && a.core.dom.setStyle(e.num, "display", "none");
                        a.custEvent.fire(d, "blur");
                        typeof c.tipText != "undefined" && (e.textEl.value = c.tipText)
                    }
                }, 50)
            },cacheCurPos: function() {
                var b = a.kit.extra.textareaUtils.getSelectedText(e.textEl), c = b == "" || b == null ? 0 : b.length, d = a.core.dom.textSelectArea(e.textEl).start, f = d + "&" + c;
                e.textEl.setAttribute("range", f)
            }}, k = {textChanged: function() {
                a.custEvent.fire(d, "keyUpCount")
            },textInput: function(b, f) {
                var g = i.getCurPos(), f = g[0], h = g[1];
                i.getWords() == c.tipText && b != c.tipText && i.delWords(c.tipText);
                a.kit.extra.textareaUtils.unCoverInsertText(e.textEl, b, {rcs: g[0],rccl: g[1]});
                j.cacheCurPos();
                a.core.evt.custEvent.fire(d, "changed")
            }}, l = {}, m = function() {
            p();
            q()
        }, n = function() {
            r();
            t();
            u();
            o()
        }, o = function() {
            c.storeWords ? e.textEl.value.length == 0 && k.textInput(c.storeWords) : c.tipText && (e.textEl.value = c.tipText)
        }, p = function() {
            if (!b)
                throw "node is not defined in module editor"
        }, q = function() {
            var c = a.core.dom.builder(b).list;
            e = a.kit.dom.parseDOM(c);
            if (!e.widget)
                throw "can not find nodes.widget in module editor"
        }, r = function() {
            a.core.evt.addEvent(e.textEl, "focus", j.textElFocus);
            a.core.evt.addEvent(e.textEl, "blur", j.textElBlur);
            a.core.evt.addEvent(e.textEl, "mouseup", j.cacheCurPos);
            a.core.evt.addEvent(e.textEl, "keyup", j.cacheCurPos)
        }, s = function() {
            a.core.evt.custEvent.define(d, "changed")
        }, t = function() {
            s();
            a.core.evt.custEvent.add(d, "changed", k.textChanged)
        }, u = function() {
        }, v = function() {
        };
        m();
        var w = {reset: i.reset,getWords: i.getWords,getExtra: i.getExtra,delWords: i.delWords,focus: i.focus,blur: i.blur,insertText: k.textInput,check: k.textChanged,addExtraInfo: i.addExtraInfo,disableEditor: i.disableEditor,getCurPos: i.getCurPos,count: i.count,textElFocus: j.textElFocus,cacheCurPos: j.cacheCurPos,addShortUrlLog: i.addShortUrlLog,getShortUrlLog: i.getShortUrlLog,setCurrentLogType: i.setCurrentLogType,getCurrentLogType: i.getCurrentLogType,setImageLogType: i.setImageLogType,getImageLogType: i.getImageLogType};
        d.destroy = v;
        d.API = w;
        d.nodeList = e;
        d.init = n;
        d.opts = c;
        return d
    }
});
STK.register("common.editor.plugin.count", function(a) {
    function e(a, b) {
        if (!a.textEl)
            throw "[editor plugin count]: plz check nodeList"
    }
    function d(a) {
        var d = c(a), e = Math.abs(b - d), f;
        d > b || d < 1 ? f = {wordsnum: d,vnum: e,overflow: !0} : d == 0 ? f = {wordsnum: d,vnum: e,overflow: !0} : f = {wordsnum: d,vnum: e,overflow: !1};
        return f
    }
    function c(b) {
        var c = 41, d = 140, e = 20, f = b, g = b.match(/(http|https):\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/\,\:;@&=\?~#%]*)*/gi) || [], h = 0;
        for (var i = 0, j = g.length; i < j; i++) {
            var k = a.core.str.bLength(g[i]);
            if (/^(http:\/\/t.cn)/.test(g[i]))
                continue;
            /^(http:\/\/)+(t.sina.com.cn|t.sina.cn)/.test(g[i]) || /^(http:\/\/)+(weibo.com|weibo.cn)/.test(g[i]) ? h += k <= c ? k : k <= d ? e : k - d + e : h += k <= d ? e : k - d + e;
            f = f.replace(g[i], "")
        }
        var l = Math.ceil((h + a.core.str.bLength(f)) / 2);
        return l
    }
    var b;
    return function(c) {
        var f = c.nodeList, g, h = c.opts, i = a.kit.extra.language;
        b = h.limitNum;
        e(f);
        a.core.evt.custEvent.define(c, "textNum");
        a.custEvent.define(c, "keyUpCount");
        var j = f.textEl, k = f.num;
        a.addEvent(j, "focus", function() {
            g = setInterval(function() {
                l()
            }, 200)
        });
        a.addEvent(j, "blur", function() {
            clearInterval(g)
        });
        var l = function() {
            var b = a.core.str.trim(j.value).length == 0 ? a.core.str.trim(j.value) : j.value, e = c && c.opts && c.opts.extendText;
            b = b.replace(/\r\n/g, "\n");
            var f = d(b, h.limitNum);
            b.length >= 0 && j.focus ? f.overflow && f.wordsnum != 0 ? k.innerHTML = (e ? i(e) : "") + i("#L{已经超过}") + '<span class="S_error">' + f.vnum + "</span>字" : k.innerHTML = (e ? i(e) : "") + i("#L{还可以输入}") + "<span>" + f.vnum + "</span>字" : b.length === 0 && (k.innerHTML = (e ? i(e) : "") + i("#L{还可以输入}") + "<span>" + f.vnum + "</span>字");
            a.core.evt.custEvent.fire(c, "textNum", {count: f.wordsnum,isOver: f.overflow})
        };
        STK.core.evt.addEvent(j, "keyup", l);
        a.custEvent.add(c, "keyUpCount", l)
    }
});
STK.register("kit.dom.cssText", function(a) {
    var b = function(a, b) {
        var c = (a + ";" + b).replace(/(\s*(;)\s*)|(\s*(:)\s*)/g, "$2$4"), d;
        while (c && (d = c.match(/(^|;)([\w\-]+:)([^;]*);(.*;)?\2/i)))
            c = c.replace(d[1] + d[2] + d[3], "");
        return c
    };
    return function(a) {
        a = a || "";
        var c = [], d = {push: function(a, b) {
                c.push(a + ":" + b);
                return d
            },remove: function(a) {
                for (var b = 0; b < c.length; b++)
                    c[b].indexOf(a + ":") == 0 && c.splice(b, 1);
                return d
            },getStyleList: function() {
                return c.slice()
            },getCss: function() {
                return b(a, c.join(";"))
            }};
        return d
    }
});
STK.register("kit.dom.isTurnoff", function(a) {
    return function(a) {
        return !a.parentNode || a.parentNode.nodeType == 11 || !!a.disabled
    }
});
STK.register("ui.mod.at", function(a) {
    var b = window, c = document, d = a.core.util.browser, e = "font-family:Tahoma,宋体;", f = a.kit.extra.textareaUtils.selectionStart, g, h, i, j, k, l = function() {
        var a = {"<": "&lt;",">": "&gt;",'"': "&quot;","\\": "&#92;","&": "&amp;","'": "&#039;","\r": "","\n": "<br>"," ": (navigator.userAgent.match(/.+(?:ie) ([\d.]+)/i) || [8])[1] < 8 ? ['<pre style="overflow:hidden;display:inline;', e, 'word-wrap:break-word;"> </pre>'].join("") : ['<span style="white-space:pre-wrap;', e, '"> </span>'].join("")};
        return function(b) {
            var c = b.replace(/(<|>|\"|\\|&|\'|\n|\r| )/g, function(b) {
                return a[b]
            });
            return c
        }
    }(), m = function() {
        var b = [], c = g.textEl.style.cssText, d;
        a.foreach(["margin", "padding", "border"], function(c) {
            a.foreach(["Top", "Left", "Bottom", "Right"], function(d) {
                var e;
                c != "border" ? e = b.push(c, "-", d.toLowerCase(), ":", a.getStyle(g.textEl, c + d), ";") : a.foreach(["Style", "Width"], function(e) {
                    b.push(c, "-", d.toLowerCase(), "-", e.toLowerCase(), ":", a.getStyle(g.textEl, [c, d, e].join("")), ";")
                })
            })
        });
        b.push("font-size:" + a.getStyle(g.textEl, "fontSize") + ";");
        return a.kit.dom.cssText([c, b.join(""), e, "\n\t\t\tword-wrap: break-word;\n\t\t\tline-height: 18px;\n\t\t\toverflow-y:auto;\n\t\t\toverflow-x:hidden;\n\t\t\toutline:none;\n\t\t"].join("")).getCss()
    }, n = function() {
        var b = a.builder(['<div node-type="wrap" style="display:none;">', '<span node-type="before"></span>', '<span node-type="flag"></span>', '<span node-type="after"></span>', "</div>"].join("")).list, e = b.wrap[0], f = b.flag[0], h = b.after[0], i = b.before[0], j = 0, n, o, p, q = function(a) {
            return d.MOZ ? -2 : d.MOBILE && d.SAFARI && (d.IPAD || d.ITOUCH || d.IPHONE) ? -2 : 0
        };
        return {bind: function() {
                if (o !== g.textEl) {
                    k = a.position(g.textEl);
                    var b = ["left:", k.l, "px;top:", k.t + 20, "px;"].join("");
                    o = g.textEl;
                    var d = m();
                    o.style.cssText = d;
                    p = [b, d, "\n\t\t\t\t\tposition:absolute;\n\t\t\t\t\tfilter:alpha(opacity=0);\n\t\t\t\t\topacity:0;\n\t\t\t\t\tz-index:-1000;\n\t\t\t\t"].join("");
                    e.style.cssText = p;
                    if (!j) {
                        j = 1;
                        c.body.appendChild(e)
                    }
                }
            },content: function(b, c, d, j) {
                e.style.cssText = [p, "\n\t\t\t\t\twidth:", (parseInt(a.getStyle(o, "width")) || o.offsetWidth) + q(), "px;\n\t\t\t\t\theight:", parseInt(a.getStyle(o, "height")) || o.offsetHeight, "px;\n\t\t\t\t\toverflow-x:hidden;\n\t\t\t\t\toverflow-y:", /webkit/i.test(navigator.userAgent) ? "hidden" : a.getStyle(o, "overflowY"), ";\n\t\t\t\t"].join("");
                i.innerHTML = l(b);
                f.innerHTML = l(c) || "&thinsp;";
                h.innerHTML = l([d, j].join(""));
                clearTimeout(n);
                n = setTimeout(function() {
                    var b = a.position(f);
                    a.custEvent.fire(g.eId, "at", {t: b.t - o.scrollTop - k.t,l: b.l - k.l,fl: b.l,key: d,flag: c,textarea: g.textEl})
                }, 30)
            },hide: function() {
                e.style.display = "none"
            },show: function() {
                e.style.display = ""
            }}
    }(), o = function() {
        if (a.kit.dom.isTurnoff(g.textEl))
            clearInterval(h);
        else {
            var b = g.textEl.value.replace(/\r/g, ""), c = f(g.textEl);
            if (c < 0 || c == j)
                return;
            j = c;
            var d = b.slice(0, c), e = d.match(new RegExp(["(", g.flag, ")([a-zA-Z0-9一-龥_-]{0,20})$"].join("")));
            if (!e) {
                a.custEvent.fire(g.eId, "hidden");
                return
            }
            var i = b.slice(c);
            d = d.slice(0, -e[0].length);
            n.content(d, e[1], e[2], i)
        }
    };
    return function(b) {
        if (!!b && !!b.textEl) {
            b = a.parseParam({textEl: null,flag: "@",eId: a.custEvent.define({}, ["at", "hidden"])}, b);
            var c = function() {
                if (!!g) {
                    clearInterval(h);
                    a.removeEvent(g.textEl, "blur", c);
                    n.hide()
                }
            }, d = function() {
                c();
                g = b;
                j = null;
                n.bind();
                n.show();
                h = setInterval(o, 200);
                a.addEvent(b.textEl, "blur", c)
            };
            a.addEvent(b.textEl, "focus", d);
            return b.eId
        }
    }
});
STK.register("common.trans.global", function(a) {
    var b = a.kit.io.inter(), c = b.register;
    c("language", {url: "/aj/user/lang?_wv=5",method: "post"});
    c("followList", {url: "/aj/mblog/attention?_wv=5"});
    c("topicList", {url: "/aj/mblog/topic?_wv=5"});
    c("myFollowList", {url: "/aj/relation/attention?_wv=5"});
    c("closetipsbar", {url: "/aj/tipsbar/closetipsbar?_wv=5",method: "post"});
    c("weiqunnew", {url: "/ajm/weiqun?action=aj_remindunread"});
    c("quiet_suggest", {url: "/aj/f/lenovo?ct=10&_wv=5",method: "get"});
    return b
});
STK.register("common.editor.plugin.at", function(a) {
    var b = a.kit.extra.language, c = '<div style="" class="layer_menu_list"><ul node-type="suggestWrap"></ul></div>', d = {"@": {normalTitle: b("#L{选择昵称或轻敲空格完成输入}"),moreTitle: b("#L{选择最近@的人或直接输入}"),noTilte: b("#L{轻敲空格完成输入}")},"#": {normalTitle: b("#L{想用什么话题？}")}}, e = {"@": '<#et temp data><li class="suggest_title">${data.title}</li><#list data.data as list><li action-type="item" <#if (list_index == 0)>class="cur" </#if>action-data="value=${list.screen_name}" value="${list.screen_name}"><a href="#">${list.screen_name}<#if (list.remark)>(${list.remark})</#if></a></li><#if (list.count)><span>${list.count}</span></#if></#list></#et>',"#": '<#et temp data><li class="suggest_title">${data.title}</li><#list data.data as list><li action-type="item" <#if (list_index == 0)>class="cur" </#if>action-data="value=${list.topic}" value="${list.topic}"><a href="#">${list.topic}<#if (list.count)>(${list.count})</#if></a></li></#list></#et>'}, f, g, h, i, j, k, l = !1, m, n, o = {"@": "followList","#": "topicList"}, p = 0, q = function() {
        setTimeout(function() {
            a.custEvent.fire(f, "close")
        }, 200)
    }, r = function() {
        j.style.display = "none"
    }, s = function() {
        a.custEvent.add(f, "onIndexChange", function(a, b) {
            x(b)
        });
        a.custEvent.add(f, "onSelect", function(b, c, d, e) {
            p = 0;
            a.core.evt.stopEvent();
            var g = n[c].getAttribute("value") + "";
            g = g.replace(/\(.*\)/, "");
            try {
                d.focus()
            } catch (h) {
            }
            var i = a.kit.extra.textareaUtils.selectionStart(d) * 1, j = new RegExp(e + "([a-zA-Z0-9一-龥_-]{0,20})$"), k = d.value.replace(/\r+/g, "").slice(0, i).match(j), l = d.value.slice(i, i + 1);
            k = k && k[1] ? k[1].length : 0;
            var m = a.kit.extra.textareaUtils;
            e == "#" ? typeof l != "undefined" && l != e && (g = g + e + " ") : g = g + " ";
            m.insertText(d, g, i, k);
            var o = m.getCursorPos(d);
            if (e == "#" && l == e) {
                m.setCursor(d, o + 1);
                m.insertText(d, " ", o + 1, 0)
            }
            o = m.getCursorPos(d);
            var q = m.getSelectedText(d), r = q == "" || q == null ? 0 : q.length;
            d.setAttribute("range", o + "&" + r);
            a.custEvent.fire(f, "close")
        });
        a.addEvent(h.textEl, "blur", q);
        a.custEvent.add(f, "onClose", r);
        a.custEvent.add(f, "onOpen", function(b, c) {
            i.style.display = "";
            j.style.display = "";
            l = !0;
            setTimeout(function() {
                a.custEvent.fire(f, "indexChange", 0)
            }, 100)
        })
    }, t = function(b, c, f) {
        b == "@" ? c.data && c.data.length > 0 ? c.title = f == "" ? d[b].moreTitle : d[b].normalTitle : c.title = d[b].noTilte : c.title = d[b].normalTitle;
        var g = a.core.util.easyTemplate(e[b], c);
        return g
    }, u = function() {
        a.core.evt.custEvent.add(g, "hidden", function(b, c) {
            a.custEvent.fire(f, "close")
        });
        a.core.evt.custEvent.add(g, "at", function(b, c) {
            k = c.key;
            var d = c.flag;
            if (k.length == 0 && d != "@")
                a.custEvent.fire(f, "close");
            else
                var e = a.common.trans.global.getTrans(o[d], {onSuccess: function(b, e) {
                        var g = t(d, b, k);
                        a.custEvent.fire(f, "openSetFlag", d);
                        a.custEvent.fire(f, "open", c.textarea);
                        var h = a.core.dom.builder(g), l = h.box;
                        i.innerHTML = l;
                        j.style.cssText = ["z-index:11001;background-color:#ffffff;position:absolute;"].join("");
                        a.common.channel.at.fire("open");
                        var m = c.l;
                        document.body.clientWidth < c.fl + a.core.dom.getSize(j).width && c.fl > a.core.dom.getSize(j).width && (m = c.l - a.core.dom.getSize(j).width);
                        a.kit.dom.layoutPos(j, c.textarea, {pos: "left-top",offsetX: m,offsetY: c.t})
                    },onError: function() {
                        a.custEvent.fire(f, "close")
                    }}).request({q: k})
        })
    }, v = function() {
        m = h.textEl;
        g = a.ui.mod.at({textEl: m,flag: "@|#"})
    }, w = function(b) {
        p = 0;
        j && (j.style.display = "none");
        j && (j.innerHTML = "");
        j = STK.C("div");
        document.body.appendChild(j);
        if (j.innerHTML.length == 0) {
            j.innerHTML = c;
            i = a.core.dom.sizzle('[node-type="suggestWrap"]', j)[0];
            j.style.display = "none"
        }
        f && a.custEvent.fire(f, "close");
        f && a.custEvent.remove(f);
        f = a.ui.mod.suggest({textNode: b,uiNode: i,actionType: "item",actionData: "value",flag: "@"});
        s()
    }, x = function(b) {
        n = a.sizzle("li[class!=suggest_title]", i);
        n && n[0] && a.core.dom.removeClassName(n[p], "cur");
        a.core.dom.addClassName(n[b], "cur");
        p = b
    };
    return function(a, b) {
        h = a.nodeList;
        var c = {};
        c.init = function() {
            v();
            w(h.textEl);
            u()
        };
        return c
    }
});
STK.register("common.editor.base", function(a) {
    function c() {
    }
    var b = {limitNum: 140};
    return function(c, d) {
        var e = {}, f, g, h, i;
        f = a.kit.extra.merge(b, d);
        g = a.ui.mod.editor(c, f);
        h = g.nodeList;
        i = [];
        if (typeof d.count == "undefined" || d.count == "enable")
            var j = a.common.editor.plugin.count(g, f);
        var k = a.common.editor.plugin.at(g, f);
        k.init();
        g.init();
        g.widget = function(a, b, c) {
            i.push(a);
            a.init(g, b, c);
            return g
        };
        g.closeWidget = function() {
            if (i && i.length != 0)
                for (var a = 0, b = i.length; a < b; a++)
                    i[a].hide()
        };
        return g
    }
});
STK.register("common.trans.editor", function(a) {
    var b = a.kit.io.inter(), c = b.register;
    c("face", {url: "/aj/mblog/face?type=face&_wv=5"});
    c("magicFace", {url: "/aj/mblog/face?type=ani&_wv=5"});
    c("getTopic", {url: "/aj/mblog/trend?_wv=5"});
    c("cartoon", {url: "/aj/mblog/face?type=cartoon&_wv=5"});
    c("suggestMusic", {url: "/aj/mblog/music/suggest?_wv=5",requestMode: "jsonp"});
    c("searchMusic", {url: "http://music.weibo.com/t/port/ajax_search_music_song.php",method: "get",requestMode: "jsonp"});
    c("addMusic", {url: "/aj/mblog/music/submit?_wv=5",requestMode: "jsonp"});
    c("parseMusic", {url: "/aj/mblog/music/parse?_wv=5",requestMode: "jsonp"});
    c("parseVideo", {url: "/aj/mblog/video?_wv=5"});
    c("waterMark", {url: "/aj/account/watermark?_wv=5"});
    c("publishToWeiqun", {url: "/aj/weiqun/add?_wv=5",method: "post"});
    c("rectopic", {url: "/aj/mblog/rectopic?_wv=5"});
    c("interactive", {url: "/aj/mblog/interactive?_wv=5",method: "post"});
    c("plugin", {url: "/aj/publishplug/plug?_wv=5",method: "post"});
    c("favSongSearch", {url: "http://music.weibo.com/yueku/port/sina_t_getcollect.php",method: "get",requestMode: "jsonp"});
    c("getOutlinkInfo", {url: "http://api.weibo.com/widget/info.json",varkey: "callback",method: "get",requestMode: "jsonp"});
    c("tabLog", {url: "http://music.weibo.com/t/port/ajax_log_action.php",method: "get",requestMode: "jsonp"});
    c("getPublish", {url: "/aj/top/usergroup?_wv=5",method: "get"});
    c("getTvLink", {url: "/aj/proxy/thirdapi?_wv=5",method: "get"});
    c("getuserlist", {url: "/aj/gift/getuserlist?_wv=5",method: "get"});
    c("getlist", {url: "/aj/gift/getlist?_wv=5",method: "post"});
    c("sendGift", {url: "/aj/gift/send?_wv=5",method: "post"});
    return b
});
STK.register("ui.mod.mask", function(a) {
    function k(b) {
        var c;
        (c = b.getAttribute(f)) || b.setAttribute(f, c = a.getUniqueKey());
        return ">" + b.tagName.toLowerCase() + "[" + f + '="' + c + '"]'
    }
    function j() {
        b = a.C("div");
        var c = '<div node-type="outer">';
        a.core.util.browser.IE6 && (c += '<div style="position:absolute;width:100%;height:100%;"></div>');
        c += "</div>";
        b = a.builder(c).list.outer[0];
        document.body.appendChild(b);
        e = !0;
        d = a.kit.dom.fix(b, "lt");
        var f = function() {
            var c = a.core.util.winSize();
            b.style.cssText = a.kit.dom.cssText(b.style.cssText).push("width", c.width + "px").push("height", c.height + "px").getCss()
        };
        i.add(d, "beforeFix", f);
        f()
    }
    var b, c = [], d, e = !1, f = "STK-Mask-Key", g = a.core.dom.setStyle, h = a.core.dom.getStyle, i = a.core.evt.custEvent, l = {getNode: function() {
            return b
        },show: function(c, f) {
            if (e) {
                c = a.core.obj.parseParam({opacity: .3,background: "#000000"}, c);
                b.style.background = c.background;
                g(b, "opacity", c.opacity);
                b.style.display = "";
                d.setAlign("lt");
                f && f()
            } else {
                j();
                l.show(c, f)
            }
            return l
        },hide: function() {
            b.style.display = "none";
            c = [];
            return l
        },showUnderNode: function(d, e) {
            a.isNode(d) && l.show(e, function() {
                g(b, "zIndex", h(d, "zIndex"));
                var e = k(d), f = a.core.arr.indexOf(c, e);
                f != -1 && c.splice(f, 1);
                c.push(e);
                a.core.dom.insertElement(d, b, "beforebegin")
            });
            return l
        },back: function() {
            if (c.length < 1)
                return l;
            var d, e;
            c.pop();
            if (c.length < 1)
                l.hide();
            else if ((e = c[c.length - 1]) && (d = a.sizzle(e, document.body)[0])) {
                g(b, "zIndex", h(d, "zIndex"));
                a.core.dom.insertElement(d, b, "beforebegin")
            } else
                l.back();
            return l
        },destroy: function() {
            i.remove(d);
            b.style.display = "none"
        }};
    return l
});
STK.register("kit.extra.destroyFlash", function(a) {
    var b = a.core.util.browser, c = function(a) {
        if (a) {
            for (var b in a)
                typeof a[b] == "function" && (a[b] = null);
            a.parentNode.removeChild(a)
        }
    };
    return function(d) {
        if (!!a.isNode(d) && d && d.nodeName === "OBJECT")
            if (a.IE && b.OS === "windows") {
                d.style.display = "none";
                (function() {
                    d.readyState === 4 ? c(d) : setTimeout(arguments.callee, 10)
                })()
            } else
                d.parentNode.removeChild(d)
    }
});
STK.register("common.magic", function(a) {
    var b = a.core.util.swf, c = a.ui.mod.mask, d, e, f, g, h, i, j, k = (new Date).getTime() + "", l = (Math.random() + "").replace(".", ""), m = "STK_flash_" + k + l, n = function(b) {
        if (!d) {
            d = a.C("div");
            if (!b)
                d.style.cssText = "display:none;width:440px;height:360px;z-index:100000;";
            else {
                var c = a.core.util.winSize();
                d.style.cssText = "display:none;width:" + c.width + "px;height:" + c.height + "px;z-index:100000;"
            }
            e = a.core.dom.uniqueID(d);
            h = function(b) {
                b = a.fixEvent(b || window.event);
                b.target.getAttribute("name") != e && o.hide()
            };
            document.body.appendChild(d)
        }
    }, o = function(k, l, p) {
        j = typeof l == "function" ? l : a.funcEmpty;
        p = a.parseParam({isV5update: !1}, p);
        n(p.isV5update);
        if (!f) {
            f = !0;
            c.showUnderNode(d);
            a.addEvent(c.getNode(), "click", h);
            c.getNode().title = "点击关闭";
            d.style.display = "";
            if (!p.isV5update) {
                g ? g.setAlign("c") : g = a.kit.dom.fix(d, "c");
                d.innerHTML = b.html(k, {id: e,width: 440,height: 360,paras: {allowScriptAccess: "never",wmode: "transparent"},attrs: {name: e},flashvars: {playMovie: "true"}})
            } else {
                g ? g.setAlign("lb") : g = a.kit.dom.fix(d, "lb");
                _closeFun = function() {
                    o.hide()
                };
                d.innerHTML = b.html(k, {id: e,width: "100%",height: "100%",paras: {menu: "false",scale: "noScale",allowFullscreen: "false",allowScriptAccess: "always",bgcolor: "#FFFFFF",wmode: "transparent",base: "http://flashcrossdomain.mps.weibo.com/t5/home/static/upgrade/v5/"},attrs: {name: e},flashvars: {closeAPI: m,v: $CONFIG.version,bgMusic: "http://service.weibo.com/staticjs/v5/bg001.mp3"}})
            }
            clearInterval(i);
            i = setInterval(function() {
                var a = document[e] || window[e], b = 0;
                if (a && a.PercentLoaded() == 100) {
                    clearInterval(i);
                    i = setInterval(function() {
                        var c = a.CurrentFrame(), d;
                        try {
                            d = a.TotalFrames()
                        } catch (e) {
                            d = a.TotalFrames
                        }
                        c < 0 || (c < d && b <= c ? b = c : o.hide())
                    }, 80)
                }
            }, 100)
        }
    };
    o.hide = function() {
        clearInterval(i);
        if (d) {
            d.style.display = "none";
            a.kit.extra.destroyFlash(a.sizzle("embed,object", d)[0]);
            d.innerHTML = ""
        }
        a.removeEvent(c.getNode(), "click", h);
        c.getNode().title = "";
        c.back();
        f = !1;
        setTimeout(function() {
            typeof j == "function" && j()
        }, 0);
        return o
    };
    o.destroy = function() {
        o.hide();
        g && g.destroy();
        a.removeNode(d);
        i = d = e = f = g = h
    };
    window[m] = function() {
        o.hide()
    };
    return o
});
STK.register("common.bubble.face", function(a) {
    var b = "", c, d = " pftb_itm_lst ";
    if ($CONFIG && $CONFIG.brand && $CONFIG.brand == 1) {
        d = "";
        b = '<li class="pftb_itm pftb_itm_lst S_line1"><a  href="javascript:void(0);" class="pftb_lk S_line5 S_txt1 S_bg1"  node-type="brand">品牌专区</a></li>';
        c = {init: function() {
                s.inner.innerHTML = m;
                a.common.trans.editor.getTrans("face", {onSuccess: function(a, b) {
                        c.cache = a.data.brand.norm || {};
                        c.categorys = [q];
                        for (var d in c.cache)
                            c.categorys.push(d);
                        var e = [];
                        for (var f in a.data.brand.norm)
                            e.push(f);
                        c.cache[q] = a.data.brand.norm[e[0]];
                        c.init = function() {
                            c.page = 0;
                            c.cPoniter = 0;
                            c.currentCategory = q;
                            c.rend();
                            A(c);
                            B(c)
                        };
                        c.init()
                    },onError: function(a, b) {
                    }}).request({})
            },rend: function() {
                var b = c.currentCategory, d = c.cache[y(b)], e = c.page, f = c.itemNumber;
                d = d.slice(e * f, e * f + f);
                d = a.foreach(d, function(b, c) {
                    b.phraseB = b.phrase.slice(1, -1);
                    return a.templet(i, b)
                });
                s.inner.innerHTML = d.join("")
            },page: 0,cache: null,hotList: null,cPoniter: 0,categorys: [],currentCategory: q,itemNumber: 72}
    }
    var e = '<div node-type="outer"><div  class="profile_tab layer_tab S_line5"><ul class="pftb_ul layer_tab S_line1"><li class="pftb_itm S_line1"><a href="javascript:void(0);" class="pftb_lk current S_line5 S_txt1 S_bg5" node-type="general">常用表情</a></li><li class="pftb_itm' + d + ' S_line1"><a  href="javascript:void(0);"  node-type="magic">魔法表情</a></li>' + b + "</ul>" + "</div>" + '<div class="layer_faces">' + '<div class="tab_nosep">' + '<span class="right">' + '<a href="javascript:void(0);" node-type="prev" action-type="prev" class="W_btn_c btn_page_prevdis"><span><em class="W_ico12 ico_page_prev"></em></span></a>' + '<a href="javascript:void(0);" node-type="next" action-type="next" class="W_btn_c btn_page_next"><span><em class="W_ico12 ico_page_next"></em></span></a>' + "</span>" + '<ul class="t_ul clearfix"  node-type="categorys"></ul>' + "</div>" + '<div class="detail">' + '<ul class="faces_list faces_list_hot clearfix" node-type="hotFace"></ul>' + '<ul class="faces_list" node-type="inner"></ul>' + '<div class="W_pages_minibtn" node-type="page"></div>' + "</div>" + "</div>" + "</div></div>", f = '<li class="t_itm"><a href="javascript:void(0);" onclick="return false;" action-type="category" action-data="category=#{itemEncode}" class="t_lk S_txt1">#{item}</a></li>', g = '<li class="t_itm current"><a href="javascript:void(0);" onclick="return false;" action-type="category" action-data="category=#{itemEncode}" class="t_lk S_txt1 S_bg2">#{item}</a></li>', h = '<li action-type="insert" action-data="text=#{phrase}"><img src="#{icon}" alt="#{phraseB}" title="#{phraseB}"/></li>', i = '<li action-type="insert" action-data="text=#{value}"><img src="#{icon}" alt="#{phraseB}" title="#{phraseB}"/></li>', j = '<li><a action-type="insert" action-data="text=#{value}" class="img" href="javascript:void(0);"><img src="#{icon}" alt="#{phrase}" title="#{phrase}"/></a><a title="表情预览" href="javascript:void(0);" action-type="play" action-data="swf=#{swf}"><span class="W_ico16 icon_toplay"></span></a><span>#{phrase}</span></li>', k = '<a action-type="page" action-data="num=#{number}" href="javascript:void(0);" class="page S_bg1" onclick="return false;">#{label}</a>', l = '<a action-type="page" action-data="num=#{number}" href="javascript:void(0);" class="page S_txt1" onclick="return false;">#{label}</a>', m = '<div class="W_loading"><span>正在加载，请稍候...</span></div>', n = '<li class="clear"></li>', o = "", p = 5, q = "默认", r, s, t, u, v, w;
    w = {};
    var x = window.encodeURIComponent, y = window.decodeURIComponent, z = function(a, b, c) {
        for (var d = 0; b[d]; d++)
            a[b[d]] && (a[b[d]].style.display = "");
        for (var d = 0; c[d]; d++)
            a[c[d]] && (a[c[d]].style.display = "none")
    }, A = function(b) {
        var c = b.cPoniter, d = b.categorys, e = y(b.currentCategory), h = d.slice(c, c + p);
        h = a.foreach(h, function(b, c) {
            return e === b ? a.templet(g, {item: b,itemEncode: x(b)}) : a.templet(f, {item: b,itemEncode: x(b)})
        });
        s.categorys.innerHTML = h.join(o);
        c + p >= d.length ? s.next.className = "W_btn_c_disable btn_page_nextdis" : s.next.className = "W_btn_c btn_page_next";
        c <= 0 ? s.prev.className = "W_btn_c_disable btn_page_prevdis" : s.prev.className = "W_btn_c btn_page_prev"
    }, B = function(b) {
        var c = b.page, d = b.cache[y(b.currentCategory)], e = d.length / b.itemNumber, f = [];
        if (e > 1)
            for (var g = 0; g < e; g += 1)
                c == g ? f.push(a.templet(l, {number: g,label: g + 1})) : f.push(a.templet(k, {number: g,label: g + 1}));
        s.page.innerHTML = f.join("");
        c === 0 && b === H && y(b.currentCategory) === q ? s.hotFace.style.display = "" : s.hotFace.style.display = "none"
    }, C = {general: function(a) {
            z(s, ["categorys", "hotFace", "prev", "next"], []);
            v = H;
            v.init();
            s.general.className = "pftb_lk current S_line5 S_txt1 S_bg5";
            s.magic.className = "pftb_lk S_line5 S_txt1 S_bg1";
            s.brand && (s.brand.className = "pftb_lk S_line5 S_txt1 S_bg1");
            s.inner.className = "faces_list clearfix"
        },magic: function(a) {
            z(s, ["categorys", "hotFace", "prev", "next"], []);
            v = I;
            v.init();
            s.general.className = "pftb_lk S_line5 S_txt1 S_bg1";
            s.magic.className = "pftb_lk current S_line5 S_txt1 S_bg5";
            s.brand && (s.brand.className = "pftb_lk S_line5 S_txt1 S_bg1");
            s.inner.className = "faces_magic_list"
        },brand: function(a) {
            z(s, [], ["categorys", "hotFace", "prev", "next"]);
            v = c;
            v.init();
            s.general.className = "pftb_lk S_line5 S_txt1 S_bg1";
            s.magic.className = "pftb_lk S_line5 S_txt1 S_bg1";
            s.brand && (s.brand.className = "pftb_lk current S_line5 S_txt1 S_bg5");
            s.inner.className = "faces_list clearfix"
        }}, D = {category: function(a) {
            v.page = 0;
            v.currentCategory = a.data.category;
            v.rend();
            setTimeout(function() {
                A(v);
                B(v)
            }, 0)
        },prev: function(a) {
            var b = v.cPoniter, c = v.categorys;
            if (b <= 0)
                return !1;
            v.cPoniter -= p;
            A(v)
        },next: function(a) {
            var b = v.cPoniter, c = v.categorys;
            if (b >= c.length - p)
                return !1;
            v.cPoniter += p;
            A(v)
        },play: function(b) {
            t.stopBoxClose();
            a.common.magic(b.data.swf, function() {
                t.startBoxClose()
            })
        },insert: function(b) {
            a.custEvent.fire(w, "insert", {value: b.data.text})
        },page: function(a) {
            v.page = parseInt(a.data.num, 10);
            v.rend();
            setTimeout(function() {
                B(v)
            }, 0)
        }}, E = function(b) {
        t = a.ui.bubble();
        F();
        G();
        C[b]();
        a.custEvent.add(t, "hide", function(b) {
            return function() {
                a.custEvent.remove(b, "hide", arguments.callee);
                a.custEvent.fire(w, "hide", {})
            }
        }(t))
    }, F = function() {
        r = a.ui.mod.layer(e);
        s = {};
        var b = r.getDomList();
        for (var c in b)
            s[c] = b[c][0];
        F = function() {
            t.setContent(s.outer)
        };
        F()
    }, G = function() {
        a.custEvent.define(w, "insert");
        a.custEvent.define(w, "hide");
        a.addEvent(s.general, "click", C.general);
        a.addEvent(s.magic, "click", C.magic);
        s.brand && a.addEvent(s.brand, "click", C.brand);
        u = a.core.evt.delegatedEvent(s.outer);
        u.add("category", "click", D.category);
        u.add("prev", "click", D.prev);
        u.add("next", "click", D.next);
        u.add("insert", "click", D.insert);
        u.add("play", "click", D.play);
        u.add("page", "click", D.page);
        G = function() {
        }
    }, H = {init: function() {
            s.inner.innerHTML = m;
            a.common.trans.editor.getTrans("face", {onSuccess: function(b, c) {
                    H.cache = b.data.more || {};
                    try {
                        H.hotList = b.data.usual.hot.slice(0, 12);
                        s.hotFace.innerHTML = a.foreach(H.hotList, function(b, c) {
                            b.phraseB = b.phrase.slice(1, -1);
                            return a.templet(h, b)
                        }).join("")
                    } catch (d) {
                    }
                    H.categorys = [q];
                    for (var e in H.cache)
                        H.categorys.push(e);
                    H.cache[q] = b.data.usual.norm;
                    H.init = function() {
                        H.page = 0;
                        H.cPoniter = 0;
                        H.currentCategory = q;
                        H.rend();
                        A(H);
                        B(H)
                    };
                    H.init()
                },onError: function(a, b) {
                }}).request({})
        },rend: function() {
            var b = H.currentCategory, c = H.cache[y(b)], d = H.page, e = H.itemNumber;
            c = c.slice(d * e, d * e + e);
            c = a.foreach(c, function(b, c) {
                b.phraseB = b.phrase.slice(1, -1);
                return a.templet(h, b)
            });
            s.inner.innerHTML = c.join("")
        },page: 0,cache: null,hotList: null,cPoniter: 0,categorys: [],currentCategory: q,itemNumber: 72}, I = {init: function() {
            s.inner.innerHTML = m;
            s.hotFace.style.display = "none";
            a.common.trans.editor.getTrans("magicFace", {onSuccess: function(a, b) {
                    I.cache = a.data.more || {};
                    I.categorys = [q];
                    for (var c in I.cache)
                        I.categorys.push(c);
                    I.cache[q] = a.data.usual.norm;
                    I.init = function() {
                        I.page = 0;
                        I.cPoniter = 0;
                        I.currentCategory = q;
                        I.rend();
                        A(I);
                        B(I)
                    };
                    I.init()
                },onError: function(a, b) {
                }}).request({type: "ani"})
        },rend: function(b, c) {
            var d = I.currentCategory, e = I.cache[y(d)], f = I.page, g = I.itemNumber;
            e = e.slice(f * g, f * g + g);
            e = a.foreach(e, function(b, c) {
                b.swf = b.icon.slice(0, -4) + ".swf";
                return a.templet(j, b)
            });
            e.push(n);
            s.inner.innerHTML = e.join("")
        },page: 0,cache: null,cPoniter: 0,categorys: [],currentCategory: q,itemNumber: 12};
    w.getBub = function() {
        return t
    };
    return function(b, c) {
        if (!a.isNode(b))
            throw "common.bubble.face need el as first parameter!";
        E("general");
        if (c.useAlign) {
            c.fail = function() {
                t.setLayout(b, {offsetX: -29,offsetY: 5})
            };
            t.setAlignPos(b, c.refer, c)
        } else
            t.setLayout(b, {offsetX: -29,offsetY: 5});
        t.show();
        return w
    }
});
STK.register("common.editor.widget.face", function(a) {
    return function(b) {
        var c = {}, d, e, f, g;
        g = a.parseParam({t: 0,l: -15,useAlign: !1}, b);
        var h = function(a, b) {
            d.API.insertText(b.value);
            e.getBub().hide()
        }, i = function() {
            a.core.evt.preventDefault();
            g.refer = d.nodeList.textEl;
            e = a.common.bubble.face(d.nodeList[f], g);
            a.custEvent.add(e, "insert", h);
            a.custEvent.fire(c, "show", e);
            a.custEvent.add(e, "hide", function() {
                a.custEvent.remove(e, "hide", arguments.callee);
                a.custEvent.remove(e, "insert", h);
                a.custEvent.fire(c, "hide", e)
            })
        };
        c.init = function(b, e, g) {
            d = b;
            f = e;
            a.addEvent(b.nodeList[f], "click", i);
            a.custEvent.define(c, "show");
            a.custEvent.define(c, "hide")
        };
        c.clear = function() {
        };
        c.show = function() {
        };
        c.hide = function() {
        };
        c.destroy = function() {
            d = null;
            a.custEvent.undefine(c)
        };
        return c
    }
});
STK.register("common.comment.reply", function(a) {
    var b = a.kit.extra.language, c = a.common.trans.comment, d = a.core.dom.setStyle, e = a.core.dom.getStyle, f = a.core.evt.preventDefault, g = a.kit.extra.setPlainHash, h = [], i = {}, j = {reply: b("#L{回复}"),alert: b("#L{写点东西吧，评论内容不能为空哦。}"),success: b("#L{评论成功}"),block: b("#L{同时将此用户加入黑名单}")}, k = new RegExp(["^", j.reply, "@([^:]*):"].join("")), l = function(a, c) {
        c == "normal" ? a.innerHTML = b("#L{评论}") : a.innerHTML = b("#L{提交中...}")
    }, m = function(b, c) {
        var e = {}, f, h, i, m, n, o, p, q, r, s, t, u, v, w, x, y;
        a.custEvent.define(e, ["reply"]);
        var z = a.core.evt.delegatedEvent(b), A = {add_success: function(c) {
                y = 0;
                n.className = "W_btn_d btn_noloading";
                l(p, "normal");
                f.API.reset();
                f.API.insertText(t);
                f.API.blur();
                d(b, "display", "none");
                c.forward = q;
                a.custEvent.fire(e, "reply", [c]);
                a.ui.litePrompt(j.success, {type: "succM",timeout: "500"})
            },add_fail: function(a) {
                y = 0;
                n.className = "W_btn_d btn_noloading";
                l(p, "normal")
            },add_error: function(a) {
                y = 0;
                n.className = "W_btn_d btn_noloading";
                l(p, "normal")
            }}, B = function(b) {
            if (!y) {
                y = 1;
                a.core.evt.preventDefault();
                q = i.checked ? 1 : 0;
                r = a.core.str.trim(m.value);
                u = r.match(k);
                if (r == t || r == "")
                    a.ui.alert(j.alert, {OK: function() {
                            y = 0
                        }});
                else {
                    if (!u || !u[1] || u[1] != s)
                        c.cid = s = null;
                    r = a.leftB(r, 280);
                    c.content = r;
                    v = a.common.getDiss(a.kit.extra.merge(c, {act: "reply",content: r,forward: q,isroot: 0}), b.el);
                    b && b.el ? b.el.className = "W_btn_a_disable" : n && (n.className = "W_btn_a_disable");
                    l(p, "loading");
                    g((+(new Date)).toString());
                    h = a.common.comment.inter(A, v);
                    h.post(v)
                }
            }
        };
        i = a.sizzle('[node-type="forward"]', b)[0];
        m = a.sizzle('[node-type="textEl"]', b)[0];
        n = a.sizzle('[action-type="doReply"]', b)[0];
        p = a.sizzle('[node-type="btnText"]', b)[0];
        n.setAttribute("action-data", x);
        s = c.content;
        t = [j.reply, "@", s, ":"].join("");
        f = a.common.editor.base(b, {count: "disable"});
        f.widget(a.common.editor.widget.face(), "smileyBtn");
        w = f.API.getWords();
        w == "" ? f.API.insertText(t) : f.API.insertText("");
        z.add("doReply", "click", B);
        a.core.evt.hotKey.add(b, ["ctrl+enter"], B);
        a.kit.dom.autoHeightTextArea({textArea: m,maxHeight: 9999,inputListener: function() {
                var b = a.trim(m.value);
                a.bLength(b) > 280 && (m.value = a.leftB(b, 280))
            }});
        e.focus = function() {
            f.API.insertText("")
        };
        return e
    }, n = function(b, c) {
        var d = a.core.arr.indexOf(b, h);
        if (!i[d]) {
            h[d = h.length] = b;
            i[d] = m(b, c)
        }
        return i[d]
    };
    return function(b, c) {
        (!c || !c.mid) && a.log("common/comment/reply.js-------mid is not defined");
        return n(b, c)
    }
});
STK.register("common.comment.commentMsg", function(a) {
    return {noPhoneReplyMsg: '#L{由于用户设置，你无法回复评论。}<br><a href="http://account.weibo.com/settings/mobile" target="_blank">#L{绑定手机}</a>#L{后可以更多地参与评论。}',noPowerReplyMsg: "#L{由于用户设置，你无法回复评论。}"}
});
STK.register("common.dialog.commentDialogue", function(a) {
    var b = a.common.comment.commentMsg, c = a.kit.extra.language, d = {TITLE: c("#L{查看对话}"),FRAME: c('<div class="detail layer_comments_list"><div node-type="more" class="more_list S_link2"></div><div node-type="repeat_list" class="WB_feed"></div></div>'),MOREAREA: {LOADING: c('<p class="layer_comments_list_loading">&nbsp;#L{加载中...}</p>'),DELETEED: c("#L{回复记录中部分评论已被原作者删除。}"),RETRY: c('#L{加载失败，请}<a action-type="older" href="javascript:void(0)" onclick="return false;">#L{重试}</a>#L{。}'),DEFAULT: c('<a action-type="older" href="javascript:void(0)" onclick="return false;"><span class="more_arrow">&laquo;</span>#L{查看更早的评论}</a>')}}, e = {unReply: c(b.noPhoneReplyMsg),unPower: c(b.noPowerReplyMsg)}, f = a.common.trans.comment, g = a.ui.dialog({isHold: !0}), h = null, i = null, j = a.common.trans.comment, k, l = !1;
    return function() {
        var b, c, m, n, o, p, q, r = !0, s = !1, t = [], u = function() {
            g.setTitle(d.TITLE);
            g.setContent(d.FRAME);
            var b = g.getInner();
            k = a.kit.dom.parseDOM(a.builder(b).list);
            k.outer = g.getOuter();
            k.inner = b;
            v();
            l = !0
        }, v = function() {
            q = a.core.evt.delegatedEvent(k.outer);
            q.add("older", "click", b.getDialogueList);
            q.add("replycomment", "click", w.show);
            a.custEvent.add(g, "hide", b.reset)
        }, w = {show: function(b) {
                var c = b.el;
                {
                    if (!a.core.dom.hasClassName(c, "unclick_rep")) {
                        b.data && b.data.ispower == "1" ? j.getTrans("isComment", {onComplete: function(d) {
                                if (d.code == "100000")
                                    w.showReply(b);
                                else {
                                    if (h) {
                                        h.anihide && h.anihide();
                                        h.destroy && h.destroy();
                                        h = null
                                    }
                                    if (d.code == "100022")
                                        h = a.ui.tipAlert({msg: e.unPower,type: "warn"});
                                    else if (d.code == "100001") {
                                        c && c.setAttribute("isphone", "1");
                                        h = a.ui.tipAlert({msg: e.unReply,type: "warn"})
                                    } else
                                        h = a.ui.tipAlert({msg: d.msg,type: "warn"});
                                    h.setLayerXY(c);
                                    h.aniShow();
                                    a.addClassName(c, "unclick_rep");
                                    i && window.clearTimeout(i);
                                    i = window.setTimeout(function() {
                                        h.anihide && h.anihide();
                                        h.destroy && h.destroy();
                                        h = null
                                    }, 3e3)
                                }
                            }}).request(b.data) : w.showReply(b);
                        return a.preventDefault(b.evt)
                    }
                    if (h) {
                        h.anihide && h.anihide();
                        h.destroy && h.destroy();
                        h = null
                    }
                    var d = c.getAttribute("isPhone");
                    d ? h = a.ui.tipAlert({msg: e.unReply,type: "warn"}) : h = a.ui.tipAlert({msg: e.unPower,type: "warn"});
                    h.setLayerXY(c);
                    h.aniShow();
                    i && window.clearTimeout(i);
                    i = window.setTimeout(function() {
                        h.anihide && h.anihide();
                        h.destroy && h.destroy();
                        h = null
                    }, 3e3)
                }
            },showReply: function(b) {
                var c = b.el, d, e, f;
                while (c.tagName.toLowerCase() != "dl")
                    c = c.parentNode;
                d = a.sizzle('[node-type="commentwrap"]', c)[0];
                var g = b.el;
                e = g.getAttribute("status");
                if (a.core.dom.getStyle(d, "display") != "none" && e == "true") {
                    g.setAttribute("status", "false");
                    a.core.dom.setStyle(d, "display", "none")
                } else {
                    g.setAttribute("status", "true");
                    a.core.dom.setStyle(d, "display", "");
                    f && f.focus()
                }
                if (!e) {
                    f = a.common.comment.reply(d, b.data);
                    w.funcs.add(f)
                }
            },reply: function(b, c) {
                a.common.channel.feed.fire("reply", {obj: b,ret: c,cid: n});
                c.data && c.data.content && w.newDialogue(c.data.content)
            },newDialogue: function(b) {
                a.core.dom.insertHTML(a.kit.dom.firstChild(k.repeat_list), b, "beforeend")
            },funcs: {add: function(b) {
                    var c = w.funcs.get(b);
                    if (!t[c]) {
                        t.push(b);
                        a.custEvent.add(b, "reply", w.reply)
                    }
                },remove: function(b) {
                    if (t[b]) {
                        a.custEvent.remove(b);
                        t[b] = null;
                        delete t[b]
                    }
                },get: function(a) {
                    var b, c = !1;
                    for (var d = 0; d < t.length; d++) {
                        var e = t[d];
                        if (e == a) {
                            b = d;
                            c = !0;
                            break
                        }
                    }
                    return b
                },destroy: function() {
                    for (var a = 0; a < t.length; a++)
                        w.funcs.remove(a)
                }}};
        b = {show: function(a) {
                !l && u();
                r = !0;
                c = a.data.cid;
                m = a.data.ouid;
                n = c;
                o = a.data.cuid;
                p = a.data.type || "small";
                b.display();
                b.getDialogueList()
            },getCid: function() {
                var d = !1, e = a.kit.dom.firstChild(k.repeat_list);
                if (e)
                    var d = e.getAttribute("cid");
                if (d) {
                    c = d;
                    b.moreArea.show()
                } else
                    b.moreArea.hide()
            },getDialogueList: function() {
                var a = {cid: c,type: p,ouid: m,cuid: o};
                r && (a.is_more = 1);
                if (!s) {
                    b.loading.start();
                    f.getTrans("dialogue", {onComplete: function(a) {
                            b.loading.end();
                            if (a.code == "100000") {
                                a.data && a.data.html && b.addContent(a.data.html);
                                r = !1;
                                b.getCid();
                                b.moreArea.setContent(a.msg ? a.msg : d.MOREAREA.DEFAULT)
                            } else if (a.code == "100001") {
                                b.moreArea.setContent(d.MOREAREA.RETRY);
                                b.moreArea.show()
                            } else if (a.code == "100011") {
                                b.moreArea.setContent(d.MOREAREA.DELETEED);
                                b.moreArea.show()
                            }
                        }}).request(a)
                }
            },loading: {start: function() {
                    s = !0;
                    b.moreArea.setContent(d.MOREAREA.LOADING)
                },end: function() {
                    s = !1;
                    b.moreArea.setContent(d.MOREAREA.DEFAULT)
                }},addContent: function(b) {
                a.core.dom.insertHTML(k.repeat_list, b, "afterbegin")
            },moreArea: {show: function() {
                    a.setStyle(k.more, "display", "")
                },hide: function() {
                    a.setStyle(k.more, "display", "none")
                },setContent: function(a) {
                    k.more.innerHTML = a
                }},display: function() {
                b.clear();
                g.show();
                g.setMiddle();
                a.setStyle(k.outer, "top", parseInt(a.getStyle(k.outer, "top")) - 30 + "px")
            },clear: function() {
                k.repeat_list.innerHTML = ""
            },reset: function() {
                r = !0;
                b.moreArea.show();
                b.clear();
                w.funcs.destroy()
            },destroy: function() {
                b = null, w = null;
                w.funcs.destroy();
                i && window.clearTimeout(i);
                h && h.anihide && h.anihide();
                h && h.destroy && h.destroy();
                h = null
            }};
        return b
    }
});
STK.register("ui.bubbleLayer", function(a) {
    var b = '<div class="W_layer" node-type="outer" style="display:none;"><div class="bg"><div class="effect"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div class="content clearfix" node-type="inner"></div></td></tr></tbody></table><div node-type="arrow" class="#{arrow_type}"></div></div></div></div>';
    return function(c, d) {
        var e, f, g, h, i, j, k = function(a) {
            a = a ? "arrow arrow_" + a : "";
            return a
        }, l = function(a) {
            f.style.top = a.t + "px";
            f.style.left = a.l + "px";
            return h
        }, m = function() {
            var b = a.core.util.winSize(), c = e.getSize(!0);
            f.style.top = a.core.util.scrollPos().top + (b.height - c.h) / 2 + "px";
            f.style.left = (b.width - c.w) / 2 + "px";
            return h
        }, n = function(a) {
            typeof a == "string" ? g.innerHTML = a : g.appendChild(a);
            return h
        }, o = function(a, b) {
            var c = "";
            a === "t" || a === "b" ? b === "right" ? c = "left:auto;right:30px;" : b === "center" && (c = "left:auto;right:" + (f.offsetWidth / 2 - 8) + "px;") : (a === "l" || a === "r") && b === "bottom" && (c = "top:auto;bottom:20px;");
            i.className = k(a);
            i.style.cssText = c;
            return h
        }, p = function(a) {
            a = k(a);
            i.className = a;
            return h
        }, q = function() {
            d = k(d);
            j = b.replace(/\#\{arrow_type\}/g, d);
            e = a.ui.mod.layer(j);
            f = e.getOuter();
            g = e.getDom("inner");
            i = e.getDom("arrow");
            h = e;
            c && n(c);
            document.body.appendChild(f)
        };
        q();
        h.setPostion = l;
        h.setMiddle = m;
        h.setContent = n;
        h.setArrow = o;
        return h
    }
});
STK.register("common.trans.qFace", function(a) {
    var b = a.kit.io.inter(), c = b.register;
    c("qface", {url: "/aj/comment/qface?_wv=5",method: "get"});
    c("simpqface", {url: "/aj/comment/simpqface?_wv=5",method: "get"});
    c("addqface", {url: "/aj/comment/addqface?_wv=5",method: "post"});
    c("bigqface", {url: "/aj/comment/bigqface?_wv=5",method: "get"});
    c("getAttiudesList", {url: "/aj/comment/attiudes?_wv=5",method: "get"});
    return b
});
STK.register("common.layer.qFace", function(a) {
    var b = a.kit.extra.language, c = {LOADING: b('<div class="W_loading" style="padding-top:10px;padding-bottom:10px;text-align:center"><span>#L{正在加载，请稍候}...</span><i by="` 3`" style="display:none">Your 5\'6.5" cannot fully feed U\'s pit!muhahaha... XD</i></div>')}, d = {}, e = a.common.trans.qFace, f = {pos: "right-bottom",posOffsetX: -185,posOffsetY: 5,arrow: "t",arrowPos: "right",type: "qface",holdOpen: !1}, g = a.ui.bubbleLayer(), h = a.core.evt.delegatedEvent(g.getOuter());
    d.binded = !1;
    d.loaded = !1;
    d.data = {simpqface: null};
    var i = a.C("div");
    i.className = "layer_quick_reply";
    var j = function(a) {
        typeof a == "string" ? i.innerHTML = a : i.appendChild(a)
    };
    g.setContent(i);
    g.setContent = j;
    var k = {parseParam: function(b, c) {
            d.param = b;
            d.options = a.parseParam(f, c || {})
        },rebuildUI: function() {
            g.setArrow(d.options.arrow, d.options.arrowPos)
        },getData: function() {
            if (!d.loaded) {
                d.loaded = !0;
                if (d.data[d.options.type] && d.data[d.options.type] !== null)
                    g.setContent(d.data.simpqface);
                else {
                    g.setContent(c.LOADING);
                    e.getTrans(d.options.type, {onSuccess: function(a) {
                            d.data[d.options.type] === null && (d.data[d.options.type] = a.data.html);
                            g.setContent(a.data.html)
                        }}).request(d.param.data)
                }
            }
        },show: function() {
            k.flushPos();
            g.show();
            k.getData()
        },flushPos: function() {
            a.kit.dom.layoutPos(g.getOuter(), d.param.el, {pos: d.options.pos,offsetX: d.options.posOffsetX,offsetY: d.options.posOffsetY})
        },bind: function() {
            h.add("qface_send", "click", k.send);
            h.add("feed_list_comment", "click", k.openComment);
            d.binded = !0
        },bindCustEvt: function() {
            a.custEvent.add(g, "show", function() {
                setTimeout(function() {
                    a.addEvent(document.body, "click", k.close)
                }, 0)
            });
            a.custEvent.add(g, "hide", function() {
                d.stopBoxClose = !1;
                a.removeEvent(document.body, "click", k.close)
            })
        },close: function(b) {
            if (d.stopBoxClose)
                return !0;
            var c = a.fixEvent(b);
            if (!a.contains(g.getOuter(), c.target) && d.param.el !== c.target) {
                g.hide();
                d.loaded = !1
            }
        },send: function(b) {
            var c = {qid: b.data.qid,mid: b.data.mid || d.param.data.mid};
            e.getTrans("addqface", {onSuccess: function(b, c) {
                    a.common.channel.feed.fire("qfaceAdd", {mid: d.param.data.mid,html: b.data.html});
                    b.uid && a.common.channel.feed.fire("qfaceCount", {mid: d.param.data.mid});
                    if (!d.options.holdOpen) {
                        g.hide();
                        d.loaded = !1
                    }
                },onFail: k.sentProblem,onError: k.sentProblem}).request(c)
        },sentProblem: function(b) {
            b.msg && a.ui.alert(b.msg)
        },openComment: function(b) {
            var c = a.sizzle('[action-type="feed_list_comment"]', d.param.el.parentNode)[0], e = a.sizzle('[node-type="feed_list_repeat"]', a.kit.dom.parentElementBy(d.param.el, document.body, function(a) {
                if (a.nodeName == "DD")
                    return !0
            }))[0];
            if (c && e)
                if (e.style.display == "none")
                    a.core.evt.fireEvent(c, "click");
                else {
                    var f = a.sizzle('[node-type="textEl"]', e)[0];
                    f && f.focus()
                }
            g.hide();
            return a.core.evt.preventDefault(b.evt)
        }};
    return function(b, c) {
        var e = {};
        d.stopBoxClose = !1;
        var f = function() {
            !d.binded && k.bind();
            k.parseParam(b, c);
            k.rebuildUI();
            k.bindCustEvt();
            k.show()
        };
        f();
        e.destroy = function() {
            g.destroy();
            a.removeEvent(document.body, "click", k.close);
            h.remove("qface_send", "click", k.send);
            h.remove("feed_list_comment", "click", k.openComment)
        };
        return e
    }
});
STK.register("common.comment.plugins.qFace", function(a) {
    var b = {listNum: 9}, c = a.common.trans.qFace;
    return function(d, e) {
        var f, g, h, i = {}, j = 0, k = {simpqFaceShow: function(b) {
                g = a.common.layer.qFace(b, {type: "simpqface"});
                return a.preventDefault(b.evt)
            },sWritten: function(c) {
                if (h == c.mid) {
                    var e = a.sizzle('[node-type="qfaceList_container"]', i.list)[0], f = a.sizzle('[node-type="qfaceList"]', i.list)[0];
                    e && (e.style.display = "");
                    var g = $CONFIG.uid, j = a.sizzle('li[uid="' + g + '"]', f)[0], l = a.builder(c.html).box.firstChild;
                    l.setAttribute("uid", g);
                    k.showList();
                    j && a.core.dom.removeNode(j);
                    if (b.listNum > 0) {
                        var e = a.sizzle("li", i.list), m = e.length - 1, n = a.sizzle("[node-type='morebtn']", d)[0];
                        if (m >= b.listNum) {
                            a.core.dom.removeNode(e[m - 1]);
                            n && a.setStyle(n, "display", "")
                        } else
                            n && a.setStyle(n, "display", "none")
                    }
                    a.core.dom.insertElement(f, l, "afterbegin")
                }
            },showList: function() {
                i.list.style.display == "none" && a.setStyle(i.list, "display", "")
            },send: function(b) {
                var d = {qid: b.data.qid,mid: b.data.mid};
                c.getTrans("addqface", {onSuccess: function(b, c) {
                        a.common.channel.feed.fire("qfaceAdd", {mid: c.mid,html: b.data.html});
                        b.uid && a.common.channel.feed.fire("qfaceCount", {mid: c.mid})
                    },onFail: k.sentProblem,onError: k.sentProblem}).request(d)
            },sentProblem: function(b) {
                b.msg && a.ui.alert(b.msg)
            },prev: function(b) {
                a.preventDefault();
                var c = b.data;
                if (c.link != "0") {
                    j = j - 1;
                    k.page(c);
                    return !1
                }
            },next: function(b) {
                a.preventDefault();
                var c = b.data;
                if (c.link != "0") {
                    j = j + 1;
                    k.page(c);
                    return !1
                }
            },page: function(a) {
                c.getTrans("getAttiudesList", {onSuccess: function(a, b) {
                        d.innerHTML = a.data.html
                    },onFail: k.sentProblem,onError: k.sentProblem}).request(a)
            }}, l = function() {
            if (!d || !e.mid)
                throw "Node is not exists OR mid is undefined";
            h = e.mid
        }, m = function() {
            i.list = d
        }, n = function() {
            f = a.core.evt.delegatedEvent(d);
            f.add("simpqface", "click", k.simpqFaceShow);
            f.add("feed_qface_prev", "click", k.prev);
            f.add("feed_qface_next", "click", k.next);
            f.add("qface_send", "click", k.send)
        }, o = function() {
            a.common.channel.feed.register("qfaceAdd", k.sWritten)
        }, p = function() {
            l();
            m();
            n();
            o()
        };
        p();
        return {send: k.send,destroy: function() {
                f.destroy();
                a.common.channel.feed.remove("qfaceAdd", k.sWritten);
                k = f = g = undefined
            }}
    }
});
STK.register("common.comment.commentTemp", function(a) {
    return {reply: '<div class="WB_media_expand repeat S_line1 S_bg1" node-type="commentwrap" style=""><div class="WB_arrow"><em class="S_line1_c">◆</em><span class=" S_bg1_c">◆</span></div><div class="S_line1 input clearfix"><textarea action-type="check" node-type="textEl" name="" rows="" cols="" style="margin: 0px 0px 3px; padding: 4px 4px 0px; border-style: solid; border-width: 1px; font-size: 12px; font-family: Tahoma, 宋体; word-wrap: break-word; line-height: 18px; overflow: hidden; outline: none; height: 20px;" range="11&amp;0"></textarea><div class="action"><span class="W_ico16 ico_faces" node-type="smileyBtn"></span><ul class="commoned_list" node-type="widget"><li><label><input type="checkbox" name="" node-type="forward" class="W_checkbox">#L{同时转发到我的微博}</label></li></ul></div><p class="btn"><a href="javascript:void(0);" class="W_btn_b btn_noloading" action-type="doReply" ><span><b class="loading"></b><em node-type="btnText">#L{评论}</em></span></a></p></div></div>'}
});
STK.register("common.comment.comment", function(a) {
    var b = a.common.comment.commentMsg, c = a.common.comment.commentTemp, d = a.kit.extra.setPlainHash, e = a.common.comment.reply, f = [], g = {}, h = a.ui.alert, i = a.kit.extra.language, j = a.custEvent, k = j.fire, l = null, m = null, n = a.common.trans.comment, o = {content: i("#L{写点东西吧，评论内容不能为空哦。}"),"delete": i("#L{确定要删除该回复吗}"),reply: i("#L{回复}"),blcok: i("#L{同时将此用户加入黑名单}"),unReply: i(b.noPhoneReplyMsg),unPower: i(b.noPowerReplyMsg)}, p = function(b, f) {
        var g, p, q = f.mid, r, s, t, u, v, w, x, y, z, A, B = new RegExp(["^", o.reply, "@([^:]*):(.*)"].join("")), C = a.core.str, D = a.common.dialog.commentDialogue(), E = {}, F, G = f.isMain, H = function(c) {
            var e = a.trim(v.value), j = e.match(B);
            if (e == "" || j && a.trim(j[2]) == "")
                h(o.content);
            else {
                if (!j || !j[1] || j[1] != u)
                    s = u = null;
                if (c && c.el) {
                    c.el.className = "W_btn_a_disable";
                    a.sizzle('em[node-type="btnText"]', c.el)[0].innerHTML = i("#L{提交中...}")
                } else {
                    a.sizzle('[action-type="post"]', b)[0].className = "W_btn_a_disable";
                    a.sizzle('em[node-type="btnText"]', b)[0].innerHTML = i("#L{提交中...}")
                }
                d((+(new Date)).toString());
                g.post(a.common.getDiss({act: j ? "reply" : "post",cid: s,content: C.leftB(e, 280),isroot: x && x.checked ? "1" : "0",forward: w && w.checked ? "1" : "0",appkey: f.appkey,mark: f.mark}, c.el))
            }
        }, I = function(b) {
            var d = b.el, f = b.data.cid, g = b.data.nick, h = a.core.dom.dir(d, {dir: "parent",expr: ".info",matchAll: !1})[0], j = d.getAttribute("status"), k = E[f] && E[f].DOM, l = k ? a.core.dom.contains(document.body, k) : !1;
            if (k && a.getStyle(k, "display") != "none" && l)
                a.setStyle(k, "display", "none");
            else {
                if (!k || !l) {
                    k = a.builder(i(c.reply)).list.commentwrap[0];
                    h && a.core.dom.insertAfter(k, h);
                    E[f] = {handle: e(k, {mid: q,cid: f,content: g,module: "scommlist"}),DOM: k};
                    a.custEvent.add(E[f].handle, "reply", L)
                }
                a.setStyle(k, "display", "");
                E[f] && E[f].handle.focus()
            }
        }, J = a.core.evt.delegatedEvent(b);
        J.add("post", "click", H);
        J.add("reply", "click", function(b) {
            var c = b.el;
            if (a.core.dom.hasClassName(c, "unclick_rep")) {
                if (l) {
                    l.anihide && l.anihide();
                    l.destroy && l.destroy();
                    l = null
                }
                var d = c.getAttribute("isPhone");
                d ? l = a.ui.tipAlert({msg: o.unReply,type: "warn"}) : l = a.ui.tipAlert({msg: o.unPower,type: "warn"});
                l.setLayerXY(c);
                l.aniShow();
                m && window.clearTimeout(m);
                m = window.setTimeout(function() {
                    l.anihide && l.anihide();
                    l.destroy && l.destroy();
                    l = null
                }, 3e3)
            } else
                b.data && b.data.ispower == "1" ? n.getTrans("isComment", {onComplete: function(d) {
                        if (d.code == "100000") {
                            var e, f, g;
                            (e = b.data) && (f = e.nick) && I(b)
                        } else {
                            if (l) {
                                l.anihide && l.anihide();
                                l.destroy && l.destroy();
                                l = null
                            }
                            if (d.code == "100022")
                                l = a.ui.tipAlert({msg: o.unPower,type: "warn"});
                            else if (d.code == "100001") {
                                c && c.setAttribute("isphone", "1");
                                l = a.ui.tipAlert({msg: o.unReply,type: "warn"})
                            } else
                                l = a.ui.tipAlert({msg: d.msg,type: "warn"});
                            l.setLayerXY(c);
                            l.aniShow();
                            a.addClassName(c, "unclick_rep");
                            m && window.clearTimeout(m);
                            m = window.setTimeout(function() {
                                l.anihide && l.anihide();
                                l.destroy && l.destroy();
                                l = null
                            }, 3e3)
                        }
                    }}).request(b.data) : I(b)
        });
        J.add("delete", "click", function(b) {
            var c = b.data.block, d = b.data.block ? ['<input node-type="block_user" id="block_user" name="block_user" value="1" type="checkbox"/><label for="block_user">', o.blcok, "</label>"].join("") : "", e = a.ui.confirm(o["delete"], {OK: function(a) {
                    var c = a.block_user, d, e;
                    (d = b.data) && (e = d.cid) && g.del({act: "delete",cid: e,is_block: c ? "1" : "0"})
                },textComplex: d})
        });
        var K = function(a) {
            t = a.data.cid;
            D.show(a)
        };
        J.add("commentDialogue", "click", K);
        a.common.channel.feed.register("reply", function(a) {
            a.cid == t && M(a.ret)
        });
        var L = function(a, b) {
            M(b)
        }, M = function(b) {
            var c = b.data;
            if (!c)
                return !1;
            s = u = null;
            r += 1;
            typeof G == "undefined" && c.comment && y && a.insertHTML(y, c.comment, "afterend");
            k(p, "count", r);
            k(p, "comment", {count: r,html: c.comment});
            if (c.feed) {
                k(p, "feed");
                a.common.channel.feed.fire("forward", {html: c.feed})
            }
            N.changeSubmitBtn();
            return !0
        }, N = {changeSubmitBtn: function() {
                var c = a.sizzle("em[node-type='btnText']", b)[0], d = a.sizzle("a[action-type='post']", b)[0];
                d.className = "W_btn_d btn_noloading";
                c.innerHTML = i("#L{评论}")
            },add_success: function(a, b) {
                if (M(a)) {
                    v.value = "";
                    v.focus()
                }
            },add_fail: function() {
                N.changeSubmitBtn()
            },add_error: function() {
                N.changeSubmitBtn()
            },delete_success: function(c, d) {
                r = Math.max(r - 1, 0);
                k(p, "count", r);
                var e = a.sizzle(["dl[comment_id=", d.cid, "]"].join(""), b)[0];
                e && e.parentNode.removeChild(e);
                k(p, "del", {commont_id: d.cid})
            },delete_fail: function(a, b) {
            },smallList_success: function(c, d) {
                d.focus = d.focus || !0;
                var e = c.data;
                if (!!e) {
                    e.html && (b.innerHTML = e.html);
                    d.filter !== 4 ? k(p, "count", [r = e.count * 1 || 0]) : k(p, "count", [r = d.count * 1 || 0]);
                    v = a.sizzle("textarea", b)[0];
                    setTimeout(function() {
                        v && a.kit.dom.autoHeightTextArea({textArea: v,maxHeight: 9999,inputListener: function() {
                                var b = a.trim(v.value);
                                C.bLength(b) > 280 && (v.value = C.leftB(b, 280))
                            }});
                        if (v)
                            try {
                                z = a.common.editor.base(b, f);
                                z.widget(a.common.editor.widget.face(), "smileyBtn");
                                d.focus && a.core.dom.selectText(v, {start: 0});
                                d.focus && v.focus()
                            } catch (c) {
                            }
                    }, 25);
                    w = a.sizzle("input[name=forward]", b)[0];
                    x = a.sizzle("input[name=isroot]", b)[0];
                    y = a.sizzle("div[node-type=commentList]", b)[0];
                    a.core.evt.hotKey.add(y, ["ctrl+enter"], H);
                    var f = {count: "disabled"}, g = a.sizzle('[node-type="feed_quick_comment_list"]', b)[0];
                    if (g) {
                        F = a.common.comment.plugins.qFace(g, {mid: d.mid});
                        J.add("qface_send", "click", F.send)
                    }
                }
            }};
        g = a.common.comment.inter(N, f);
        p = j.define(g, ["count", "feed", "comment", "del"]);
        g.destroy = function() {
            z && z.closeWidget();
            if (F) {
                J.remove("qface_send", "click", F.send);
                F.destroy();
                F = undefined
            }
            a.foreach(E, function(b) {
                a.custEvent.remove(b.handle);
                b.DOM = null;
                b.handle = null
            });
            a.core.evt.hotKey.remove(y, ["ctrl+enter"], H);
            m && window.clearTimeout(m);
            l && l.anihide && l.anihide();
            l && l.destroy && l.destroy();
            l = null
        };
        return g
    }, q = function(b, c) {
        var d = a.core.arr.indexOf(b, f);
        if (!g[d]) {
            f[d = f.length] = b;
            g[d] = p(b, c)
        }
        return g[d]
    };
    return function(a, b) {
        if (!a || !a.mid)
            throw "mid is not defined";
        var c = q(b, a);
        if (b.firstChild) {
            b.innerHTML = "";
            b.style.display = "none";
            c.destroy()
        } else if (a) {
            a.act = "list";
            c.load(a);
            b.style.display = ""
        }
        return c
    }
});
STK.register("kit.dom.rotateImage", function(a) {
    var b = {}, c = function(c) {
        var d = a.core.dom.uniqueID(c);
        return b[d] || (b[d] = {})
    }, d = {0: 0,90: 1,180: 2,270: 3}, e = function(a, b) {
        a = ((b || 0) + a) % 360;
        a < 0 && (a = 360 + a);
        var c = Math.PI * a / 180, d = Math.round(Math.cos(c) * Math.pow(10, 15)) / Math.pow(10, 15), e = Math.round(Math.sin(c) * Math.pow(10, 15)) / Math.pow(10, 15);
        return {sin: e,cos: d,M11: d,M12: -e,M21: e,M22: d,angle: a,rotation: c}
    }, f = function(a, b, c, f) {
        c = c || 440;
        var g = e(b, f.oldAngle);
        b = f.oldAngle = g.angle;
        a.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + g.M11 + ",M12=" + g.M12 + ",M21=" + g.M21 + ",M22=" + g.M22 + ",SizingMethod='auto expand')";
        if (d[b] % 2 == 0) {
            a.width = f.originalWidth;
            a.height = f.originalHeight
        } else if (d[b] % 2 == 1) {
            a.height = f.originalHeight > c ? c : f.originalHeight;
            a.width = a.height * f.originalWidth / f.originalHeight
        }
    }, g = function(a, b, c, d) {
        var e = a;
        d.oldAngle = e.angle = ((e.angle == undefined ? 0 : e.angle) + b) % 360;
        if (e.angle >= 0)
            var f = Math.PI * e.angle / 180;
        else
            var f = Math.PI * (360 + e.angle) / 180;
        var g = Math.cos(f), h = Math.sin(f), i = document.createElement("canvas");
        e.oImage ? i.oImage = e.oImage : i.oImage = e;
        i.style.width = i.width = Math.abs(g * i.oImage.width) + Math.abs(h * i.oImage.height);
        i.style.height = i.height = Math.abs(g * i.oImage.height) + Math.abs(h * i.oImage.width);
        if (i.width > c) {
            i.style.width = c + "px";
            i.style.height = c * i.oImage.width / i.oImage.height + "px"
        }
        var j = i.getContext("2d");
        j.save();
        f <= Math.PI / 2 ? j.translate(h * i.oImage.height, 0) : f <= Math.PI ? j.translate(i.width, -g * i.oImage.height) : f <= 1.5 * Math.PI ? j.translate(-g * i.oImage.width, i.height) : j.translate(0, -h * i.oImage.width);
        j.rotate(f);
        try {
            j.drawImage(i.oImage, 0, 0, i.oImage.width, i.oImage.height)
        } catch (k) {
        }
        j.restore();
        i.angle = e.angle;
        e.parentNode.replaceChild(i, e);
        return i
    }, h = function() {
        var a = ["transform", "MozTransform", "webkitTransform", "OTransform"], b = 0, c = document.createElement("div").style;
        while (a[b] && !(a[b] in c))
            ++b;
        return a[b]
    }(), i = function(b, c, f, g) {
        var i = e(c, g.oldAngle), j;
        c = g.oldAngle = i.angle;
        if (!g.rotated) {
            g.rotated = !0;
            j = a.C("div");
            j.style.position = "relative";
            g.textAlign = j.style.textAlign = a.getStyle(b.parentNode, "textAlign");
            b.parentNode.insertBefore(j, b);
            j.appendChild(b);
            b.style.position = "absolute"
        } else
            j = b.parentNode;
        if (d[c] % 2 == 0) {
            g.originalWidth > f ? g.imgViewWidth = b.width = f : g.imgViewWidth = b.width = g.originalWidth;
            g.imgViewHeight = b.height = g.originalHeight
        } else if (d[c] % 2 == 1) {
            g.originalHeight > f ? g.imgViewWidth = b.height = f : g.imgViewWidth = b.height = g.originalHeight;
            g.imgViewHeight = b.width = b.height * g.originalWidth / g.originalHeight
        }
        j.style.height = g.imgViewHeight + "px";
        f > j.offsetWidth && (j.style.width = f + "px");
        b.style[h] = "matrix(" + i.M11 + "," + i.M21 + "," + i.M12 + "," + i.M22 + ", 0, 0)";
        var k = (g.imgViewHeight - g.imgViewWidth) / 2, l = (g.imgViewWidth - g.imgViewHeight) / 2;
        if (d[c] % 2 == 0) {
            b.style.top = "0px";
            g.textAlign == "center" ? b.style.left = (j.offsetWidth - g.imgViewWidth) / 2 + "px" : b.style[g.textAlign == "right" ? "right" : "left"] = "0px"
        } else {
            b.style.top = k + "px";
            g.textAlign == "center" ? b.style.left = l + (j.offsetWidth - g.imgViewWidth) / 2 + "px" : b.style[g.textAlign == "right" ? "right" : "left"] = l + "px"
        }
    }, j = function(b, d, e) {
        var j = c(b);
        if (!("originalWidth" in j)) {
            j.originalWidth = b.width;
            j.originalHeight = b.height
        }
        e || (e = j.originalWidth);
        h ? i(b, d, e, j) : "filters" in a.C("div") ? f(b, d, e, j) : b.canvas = g(b.canvas ? b.canvas : b, d, e, j)
    }, k = {rotateRight: function(a, b, c) {
            j(a, b == undefined ? 90 : b, c)
        },rotateLeft: function(a, b, c) {
            j(a, b == undefined ? -90 : -b, c)
        },rotateDefault: function(a) {
            var b = c(a);
            b.oldAngle && j(a, 360 - b.oldAngle, b.originalWidth)
        },removeDataCache: function(c) {
            var d = a.uniqueID(c), e;
            if (h)
                if (e = c.parentNode && c.parentNode.parentNode) {
                    c.parentNode.parentNode.insertBefore(c, e);
                    a.removeNode(e)
                }
            b[d] && delete b[d]
        },destroy: function() {
            b = {}
        }};
    return k
});
STK.register("common.trans.weiboDetail", function(a) {
    var b = a.kit.io.inter(), c = b.register;
    c("delete", {url: "/aj/comment/del?_wv=5",method: "post"});
    c("deleteWeibo", {url: "/aj/mblog/del?_wv=5",method: "post"});
    c("delmblog", {url: "/aj/mblog/del?_wv=5",method: "post"});
    c("feedlist", {url: "/aj/comment/big?_wv=5",method: "get"});
    c("forward", {url: "/aj/mblog/info/big?_wv=5",method: "get"});
    c("mediaShow", {url: "http://api.weibo.com/widget/show.jsonp",varkey: "jsonp",method: "get",requestMode: "jsonp"});
    c("qingShow", {url: "http://api.t.sina.com.cn/widget/show.json?source=3818214747",varkey: "callback",method: "get",requestMode: "jsonp"});
    c("widget", {url: "/aj/mblog/showinfo?_wv=5",method: "post"});
    c("third_rend", {url: "/aj/mblog/renderfeed?_wv=5",method: "post"});
    return b
});
STK.register("kit.extra.toFeedText", function(a) {
    return function(b) {
        if (typeof b != "string")
            throw "[kit.extra.toFeedText]:need string as first parameter";
        var c = a.core.str.parseHTML(b), d = [];
        for (var e = 0, f = c.length; e < f; e += 1)
            if (!c[e][2])
                d.push(c[e][0]);
            else if (c[e][2].toLowerCase() === "img") {
                var g = c[e][3].match(/(?:alt\s*=\s*["|']?([^"|'|\s]+)["|']?)/), h = c[e][3].match(/(?:brand_face\s*=\s*["|']?([^"|'|\s]+)["|']?)/);
                h ? d.push(h[1]) : g && d.push(g[1])
            }
        return d.join("")
    }
});
STK.register("widget.module.component", function(a) {
    return function() {
        var b = {};
        b.initParam = a.core.func.empty;
        b.initEvent = a.core.func.empty;
        b.destroyParam = a.core.func.empty;
        b.destroyEvent = a.core.func.empty;
        b.init = function() {
            b.initParam();
            b.initEvent()
        };
        b.destroy = function() {
            b.destroyEvent();
            b.destroyParam()
        };
        return b
    }
});
STK.register("widget.parse", function(a) {
    var b = "http://js.t.sinajs.cn/t5/home/js/", c = "STK.", d = ["destroy", "part_destroy", "part_flush"], e = 1, f = typeof $CONFIG == "undefined" ? e : $CONFIG.version;
    return function(e, g) {
        var h = a.widget.module.component(), i = a.core.obj.sup(h, ["init", "destroy"]), j = {}, k, l;
        h.handler = {getMethod: function(b) {
                b = b.split(".");
                var c, d = a;
                while (c = b.shift())
                    if (!(d = d[c]))
                        break;
                return d
            },extract: function(a) {
                var b = h.handler.getMethod(a.ns);
                if (b) {
                    j[a.uniqueID] = {info: a,entity: b(a)};
                    j[a.uniqueID].entity.init()
                }
            },getDomInfo: function(b) {
                return {dom: b,top: h.entity.dom,ns: b.getAttribute("component"),uniqueID: a.core.dom.uniqueID(b),data: a.queryToJson(b.getAttribute("component-data") || ""),param: a.queryToJson(b.getAttribute("component-param") || "")}
            },loadComponent: function(b) {
                var c = h.handler.getDomInfo(b), d = [{url: [k.baseURL, c.ns.replace(/\./g, "/"), ".js?version=", f].join(""),NS: k.baseNS + c.ns}];
                a.core.io.require(d, h.handler.extract, c)
            }};
        h.accept = {partDestroy: function(b, c) {
                var d = c.dom;
                for (var e in j)
                    if (a.contains(d, j[e].info.dom)) {
                        j[e].entity.destroy();
                        delete j[e].info;
                        delete j[e].entity;
                        delete j[e]
                    }
            },partFlush: function(b, c) {
                a.foreach(a.sizzle("[component]", c.dom), h.handler.loadComponent)
            }};
        h.initParam = function() {
            h.entity = {dom: e};
            l = a.custEvent.define(h.entity.dom, d);
            k = a.parseParam({baseURL: b,baseNS: c}, g);
            j = {}
        };
        h.destroyParam = function() {
            k = null;
            j = null
        };
        h.initEvent = function() {
            a.custEvent.add(l, "part_destroy", h.accept.partDestroy);
            a.custEvent.add(l, "part_flush", h.accept.partFlush)
        };
        h.destroyEvent = function() {
            a.custEvent.remove(l, "part_destroy", h.accept.partDestroy);
            a.custEvent.remove(l, "part_flush", h.accept.partFlush)
        };
        h.destroy = function() {
            for (var a in j) {
                j[a].entity.destroy();
                delete j[a].info;
                delete j[a].entity;
                delete j[a]
            }
            i.destroy()
        };
        h.init = function() {
            i.init();
            a.foreach(a.sizzle("[component]", h.entity.dom), h.handler.loadComponent)
        };
        return h
    }
});
STK.register("common.feed.widget", function(a) {
    var b = {};
    return {add: function(c, d) {
            if (!b[c]) {
                b[c] = a.widget.parse(d);
                b[c].init()
            }
        },clear: function(a) {
            if (b[a]) {
                b[a].destroy();
                delete b[a]
            }
        },destroy: function() {
            for (var a in b) {
                b[a].destroy();
                delete b[a]
            }
        }}
});
STK.register("common.content.weiboDetail.utils", function(a) {
    return function() {
        var b = a.core.evt.preventDefault, c = a.kit.extra.language, d = a.kit.dom.firstChild, e = a.kit.dom.parentAttr, f = a.core.util.getUniqueKey, g = a.core.dom.uniqueID, h = a.core.dom.sizzle, i = a.core.dom.next, j = 40, k = 450, l = c("#L{加载失败}!"), m = c("#L{很抱歉，该内容无法显示，请稍后再试。}"), n, o, p = a.kit.dom.fix, q = a.core.util.easyTemplate, r = a.common.feed.feedList.feedTemps, s = a.core.dom.hasClassName, t = a.core.dom.addClassName, u = a.core.dom.removeClassName, v = a.common.trans.weiboDetail.getTrans, w = a.kit.dom.rotateImage, x = a.kit.extra.toFeedText, y = a.kit.extra.parseURL().url, z = $CONFIG.imgPath + "/style/images/common/loading.gif", A, B = {mediaVideoMusicTEMP: c('<#et temp data><p class="medis_func S_txt3"><a href="${data.short_url}" title="${data.fTitle}" class="show_big" target="_blank">${data.title}</a></p><div node-type="feed_list_media_big${data.type}Div" style="text-align:center;min-height:18px;"><img class="loading_gif" src="' + z + '"/></div>' + "</#et>"),widgetTEMP: c('<#et temp data><p class="medis_func S_txt3"><#if (!data.notForward)><a href="javascript:void(0);" action-type="feed_list_media_toSmall" class="retract"><em class="W_ico12 ico_retract"></em>#L{收起}</a><i class="W_vline">|</i></#if><a <#if (data.suda)>suda-data="${data.suda}"</#if> href="${data.full_url}" title="${data.full_url}" class="show_big" target="_blank"><em class="W_ico12 ico_showbig"></em>${data.title}</a></p><div node-type="feed_list_media_widgetDiv"><img class="loading_gif" src="' + z + '"/></div>' + "</#et>"),qingTEMP: c('<#et temp data><p class="medis_func S_txt3"><#if (!data.notForward)><a href="javascript:void(0);" action-type="feed_list_media_toSmall" class="retract"><em class="W_ico12 ico_retract"></em>#L{收起}</a><i class="W_vline">|</i></#if><a <#if (data.suda)>suda-data="${data.suda}"</#if> href="${data.full_url}" title="${data.full_url}" class="show_big" target="_blank"><em class="W_ico12 ico_showbig"></em>${data.title}</a></p><div node-type="feed_list_media_qingDiv"><img class="loading_gif" src="' + z + '"/></div>' + "</#et>")}, C = {getMid: function(a, b) {
                return a.mid || (a.mid = e(a, "mid", b))
            },getFeedNode: function(a) {
                while (a && a.getAttribute && a.getAttribute("node-type") !== "weibo_info" && a.tagName && a.tagName.toLowerCase() != "dl")
                    a = a.parentNode;
                return a
            },preventDefault: function(a) {
                b(a);
                return !1
            },tabSwitch: function(a, b, c, d) {
                var e = a.parentNode, f = !1, g = c.split(" "), i;
                if (d) {
                    var j = a.getAttribute("action-type"), k = a.getAttribute("action-data"), l = j === "forword_tab_click" && (k === "privatemsg" || k === "microgroup");
                    d.feed_list.style.display = l ? "none" : "";
                    d.feed_cate.style.display = l ? "none" : ""
                }
                if (!s(a, b)) {
                    i = h("." + b, e)[0];
                    for (var m = 0; m < g.length; m++)
                        u(i, g[m]);
                    t(a, c);
                    f = !0
                }
                a.blur();
                return f
            },getMediaPDNodes: function(b, c) {
                return {prev: a.sizzle("[node-type=feed_list_media_prev]", b)[0],disp: a.sizzle("[node-type=feed_list_media_disp]", b)[0]}
            },smallImgFun: function(b) {
                var c = b.el, d = C.preventDefault(b.evt);
                if (c.loading)
                    return d;
                c.tagName.toLowerCase() !== "img" && (c = a.sizzle("img", c)[0]);
                c.loading = 1;
                var e = c.src.replace("/thumbnail/", "/bmiddle/"), g = "http://photo.weibo.com/" + data.uid + "/wbphotos/large/photo_id/" + data.mid + "?refer=weibofeedv5", h = C.getFeedNode(c), i = h.getAttribute("isForward") ? 1 : "", j, l;
                if (!h) {
                    a.log("parents attribute mid node is undefined!");
                    return d
                }
                h.isForward = i;
                var m = C.getMediaPDNodes(h, i);
                if (!m || !m.prev || !m.disp) {
                    a.log('node-type="feed_list_media_prev" or node-type="feed_list_media_disp" in a feed\'s node is undefined!');
                    return d
                }
                var n = function() {
                    c.loading = 0;
                    if (j) {
                        c.bigImgWidth = j.width;
                        j.onload = null
                    }
                    l && (l.style.display = "none");
                    m.prev.style.display = "none";
                    m.disp.innerHTML = "";
                    m.disp.appendChild(a.builder(q(r.mediaIMGTEMP, {notForward: !i,uniqueId: f(),bigSrc: e,largeSrc: g,bigWidth: c.bigImgWidth > k ? k : c.bigImgWidth,suda: {retract: "key=feed_image_click&value=image_zoomout",showBig: "key=feed_image_click&value=image_open",left: "key=feed_image_click&value=image_turnlift",right: "key=feed_image_click&value=image_turnright",big: "key=feed_image_click&value=image_zoomout"}}).toString()).box);
                    m.disp.style.display = ""
                };
                if (c.bigImgWidth)
                    n();
                else {
                    var o = c.offsetWidth, p = parseInt(c.offsetHeight / 2 - 8);
                    (l = a.core.dom.next(c)).style.cssText = "margin:" + p + "px " + parseInt(o / 2 - 8) + "px " + p + "px -" + parseInt(o / 2 + 8) + "px;";
                    l.style.display = "";
                    (j = new Image).onload = n;
                    j.src = e
                }
                return d
            },bigImgFun: function(b, c, d) {
                var e = b.el, f = C.preventDefault(b.evt);
                if (!d && !/(img)|(canvas)/.test(b.evt.target.tagName.toLowerCase()))
                    return f;
                var g = C.getFeedNode(e);
                if (!g)
                    a.log("parents attribute mid is undefined!");
                else {
                    g.disp = "";
                    var h = C.getMediaPDNodes(g, g.isForward);
                    if (!h.prev) {
                        a.log('media: node-type="feed_list_media_prev" is not be found in feed item');
                        return
                    }
                    if (!h.disp) {
                        a.log('media: node-type="feed_list_media_disp" is not be found in feed item');
                        return
                    }
                    a.position(h.disp).t < a.scrollPos().top && g.scrollIntoView();
                    h.prev.style.display = "";
                    h.disp.style.display = "none";
                    h.disp.innerHTML = "";
                    var i = g.getAttribute("mid");
                    i && a.common.feed.widget.clear(i);
                    return f
                }
            },toFloatFun: function(b, c, d) {
                o && a.fireEvent(o, "click");
                var e = b.el, f = decodeURIComponent(b.data.title), g = C.getMid(e, c), h = d.dispContentNode[g], i = h.mediaData, j = a.builder(q(r.mediaVideoMusicFloatTEMP, {title: decodeURIComponent(f)}).toString()), k = j.list.outer[0], l = j.list.mediaContent[0];
                o = j.list.close[0];
                document.body.appendChild(k);
                n = p(k, "rb");
                if (i) {
                    l.innerHTML = "";
                    l.appendChild(a.builder(i).box);
                    n.setFixed(!0)
                } else
                    d.dispContentNode[g] = l;
                a.addEvent(o, "click", function() {
                    a.removeEvent(o, "click", arguments.callee);
                    n && n.destroy();
                    a.removeNode(k);
                    n = j = k = o = null
                });
                return C.bigImgFun(b, c, !0)
            },newsFeed: function(b, c) {
                var d = b.el;
                while (d && !a.hasClassName(d, "WB_info"))
                    d = d.parentNode;
                var e = a.sizzle("[node-type=feed_list_news]", d)[0];
                e && (e.style.display = c ? "" : "none")
            },smallVideoMusicClickFun: function(b, c, d, e) {
                try {
                    var f = b.el, g = b.data, h = C.getFeedNode(f), i = h.getAttribute("isForward") ? 1 : "", j = C.getMid(f, c), k = C.getMediaPDNodes(h, i);
                    if (!k.prev) {
                        a.log('media: node-type="feed_list_media_prev" is not be found in feed item');
                        return
                    }
                    if (h.disp == g.short_url)
                        return;
                    h.disp = g.short_url;
                    h.isForward = i;
                    k.prev.style.display = "none";
                    var m = decodeURIComponent(g.title), o = a.bLength(m) > 71 ? a.leftB(m, 70) + "..." : m;
                    m = a.bLength(m) > 24 ? a.leftB(m, 23) + "..." : m;
                    k.disp.innerHTML = "";
                    k.disp.appendChild(a.builder(q(i ? r.mediaVideoMusicTEMP : B.mediaVideoMusicTEMP, {notForward: !i,short_url: decodeURIComponent(g.short_url),full_url: decodeURIComponent(g.full_url),title: m,fTitle: o,type: d}).toString()).box);
                    if (!k.disp) {
                        a.log('media: node-type="feed_list_media_disp" is not be found in feed item');
                        return
                    }
                    k.disp.style.display = "";
                    var p = a.sizzle('div[node-type="feed_list_media_big' + d + 'Div"]', k.disp)[0];
                    if (!p) {
                        a.log('media: note-type="feed_list_media_big' + d + 'Div" is not be found in feed_list_media_disp node!');
                        return
                    }
                    e.dispContentNode[j] = p;
                    var s = "default";
                    try {
                        a.IE ? s = "object" : navigator.plugins["Shockwave Flash"] ? s = "embed" : s = "html5"
                    } catch (t) {
                    }
                    var u = function() {
                        p.innerHTML = l
                    }, w = function(b) {
                        if (!b.result || b.error_code || b.error)
                            u();
                        else {
                            var c = e.dispContentNode[j];
                            c.mediaData = b.result;
                            c.innerHTML = "";
                            c.appendChild(a.builder(c.mediaData).box);
                            n && n.setFixed(!0)
                        }
                    };
                    v("mediaShow", {onComplete: w,onFail: u}).request({vers: 3,lang: $CONFIG.lang,mid: j,short_url: g.short_url.replace(/http\:\/\/(t|sinaurl)\.cn\//, ""),template_name: s,source: "3818214747"});
                    a.scrollTo(k.disp, {step: 1})
                } catch (t) {
                    a.log("video err : ", t.message)
                }
            },rotateImg: function(b, c) {
                var d = b.el, e = C.getFeedNode(d);
                if (!d.parentNode.uid) {
                    var h = a.sizzle('img[action-type="feed_list_media_bigimg"]', e)[0];
                    d.parentNode.uid = g(h) + "_" + f();
                    h.setAttribute("id", d.parentNode.uid)
                }
                var i = c === "right" ? "rotateRight" : "rotateLeft";
                w[i](a.E(d.parentNode.uid), 90, k)
            },getForwardOptions: function(a) {
                var b = d(a), c = C.getFeedNode(b), e = c.getAttribute("mid"), f = h("div.WB_text", a)[0], g = h('[node-type="feed_list_forwardContent"]', c)[0], i = h('[action-type="feed_list_media_img"]', a)[0] || h('[action-type="feed_list_media_bigimg"]', a)[0], j = i && i.src && i.src.replace(/^.*?\/([^\/]+).gif$/, "$1");
                f = h("em", f)[0];
                var k = x(f.innerHTML), l = f.getAttribute("nick-name"), m = null, n = null;
                if (g) {
                    m = k;
                    n = l;
                    k = x(h("div.WB_text", g)[0].innerHTML);
                    l = h("a.WB_name", g)[0].getAttribute("nick-name")
                }
                return {mid: e,appkey: "",url: y,originNick: l,reason: m,origin: k,forwardNick: n,pid: j,styleId: 2}
            },getCount: function(a) {
                var b = a.match(/\(([\d]*)\)/);
                b = b ? parseInt(b[1]) : 0;
                return b
            },qingExpand: function(b, c, d) {
                var e = b.el, f = C.getMid(e, c), g = b.data, h = C.getFeedNode(e, c), i = h.getAttribute("isForward") ? "1" : "", k = C.getMediaPDNodes(h, i);
                if (h.disp != g.short_url) {
                    h.isForward = i;
                    a.common.feed.widget.clear(f);
                    k.disp.innerHTML = "";
                    k.disp.appendChild(a.builder(q(B.qingTEMP, {notForward: !i,short_url: decodeURIComponent(g.short_url),full_url: decodeURIComponent(g.full_url),title: decodeURIComponent(g.title),suda: decodeURIComponent(g.suda || "")}).toString()).box);
                    k.prev.style.display = "none";
                    k.disp.style.display = "";
                    var l = a.sizzle('div[node-type="feed_list_media_qingDiv"]', k.disp)[0], n = function(b) {
                        var c = b.code;
                        if (c + "" == "1") {
                            b = b.data;
                            if (!b.result)
                                return;
                            l.innerHTML = b.result;
                            a.common.feed.widget.add(f, k.disp)
                        } else
                            o(b)
                    }, o = function(a) {
                        l.innerHTML = m
                    }, p = g.template_name;
                    p ? p == "video" && (a.IE ? p = "object" : navigator.plugins && navigator.plugins["Shockwave Flash"] ? p = "embed" : p = "html5") : p = "";
                    v("qingShow", {onComplete: n,onFail: o}).request({short_url: g.short_url,lang: window.$CONFIG && window.$CONFIG.lang || "zh-cn",mid: f,vers: 3,template_name: p});
                    a.scrollTo(k.disp, {step: 1,top: j})
                }
            },thirdExpand: function(b, c, d) {
                var e = b.el, f = C.getMid(e, c), g = b.data, h = C.getFeedNode(e, c), i = h.getAttribute("isForward") ? "1" : "", j = C.getMediaPDNodes(h, i);
                if (h.disp != g.short_url) {
                    h.disp = g.short_url;
                    h.isForward = i;
                    a.common.feed.widget.clear(f);
                    j.disp.innerHTML = "";
                    j.disp.appendChild(a.builder(q(B.widgetTEMP, {notForward: !i,short_url: decodeURIComponent(g.short_url),full_url: decodeURIComponent(g.full_url),title: decodeURIComponent(g.title),suda: decodeURIComponent(g.suda || "")}).toString()).box);
                    j.prev.style.display = "none";
                    j.disp.style.display = "";
                    var k = a.sizzle('div[node-type="feed_list_media_widgetDiv"]', j.disp)[0];
                    v("third_rend", {onSuccess: function(b) {
                            b = b.data;
                            if (!!b.html) {
                                k.innerHTML = b.html;
                                a.scrollTo(j.disp, {step: 1});
                                a.common.feed.widget.add(f, j.disp)
                            }
                        },onFail: function(a) {
                            k.innerHTML = a && a.msg || l
                        },onError: function(a) {
                            k.innerHTML = a && a.msg || l
                        }}).request(a.kit.extra.merge({isforward: i,mid: f}, g))
                }
            },widgetExpand: function(b, c, d) {
                var e = b.el, f = C.getMid(e, c), g = b.data, h = C.getFeedNode(e, c), i = h.getAttribute("isForward") ? "1" : "", j = C.getMediaPDNodes(h, i);
                if (h.disp != g.short_url) {
                    h.disp = g.short_url;
                    h.isForward = i;
                    a.common.feed.widget.clear(f);
                    j.disp.innerHTML = "";
                    j.disp.appendChild(a.builder(q(B.widgetTEMP, {notForward: !i,short_url: decodeURIComponent(g.short_url),full_url: decodeURIComponent(g.full_url),title: decodeURIComponent(g.title),suda: decodeURIComponent(g.suda || "")}).toString()).box);
                    j.prev.style.display = "none";
                    j.disp.style.display = "";
                    var k = a.sizzle('div[node-type="feed_list_media_widgetDiv"]', j.disp)[0];
                    v("widget", {onSuccess: function(b) {
                            b = b.data;
                            if (!!b.html) {
                                k.innerHTML = b.html;
                                a.scrollTo(j.disp, {step: 1});
                                a.common.feed.widget.add(f, j.disp)
                            }
                        },onFail: function(a) {
                            k.innerHTML = a && a.msg || l
                        },onError: function(a) {
                            k.innerHTML = a && a.msg || l
                        }}).request({short_url: decodeURIComponent(g.short_url),isforward: i,mid: f})
                }
            }};
        return C
    }
});
STK.register("common.trans.versionTip", function(a) {
    var b = a.kit.io.inter(), c = b.register;
    c("save", {url: "/aj/guide/versiontip?_wv=5",method: "post"});
    c("userGuider", {url: "/aj/bubble/add?_wv=5",method: "post"});
    c("closeBubble", {url: "/aj/bubble/closebubble?_wv=5",method: "get"});
    return b
});
STK.register("common.guide.util.tipLayer", function(a) {
    var b = {}, c = a.core.dom.getSize, d = 1;
    b.getLayerPosition = function(b, d, e, f) {
        var g = null;
        if (b.style.display == "none") {
            b.style.visibility = "hidden";
            b.style.display = "";
            g = a.position(b);
            b.style.display = "none";
            b.style.visibility = "visible"
        } else
            g = a.position(b);
        var h = c(b), i = c(d), j = f ? c(f) : {width: 0,height: 0};
        e = e || 1;
        var k, l, m = {};
        switch (e) {
            case 1:
            case "top":
                k = g.l + h.width / 2 - i.width / 2;
                l = g.t - i.height;
                m.className = "arrow_down";
                m.left = (i.width - j.width) / 2 + "px";
                m.top = "";
                break;
            case 2:
            case "right":
                k = g.l + h.width;
                l = g.t - i.height / 2;
                m.className = "arrow_left";
                m.left = "";
                m.top = (i.height - j.height) / 2 + "px";
                break;
            case 3:
            case "bottom":
                k = g.l + h.width / 2 - i.width / 2;
                l = g.t + h.height;
                m.className = "arrow_up";
                m.left = (i.width - j.width) / 2 + "px";
                m.top = "";
                break;
            case 4:
            case "left":
                k = g.l - i.width;
                l = g.t - i.height / 2;
                m.className = "arrow_right";
                m.left = "";
                m.top = (i.height - j.height) / 2 + "px"
        }
        return {left: k,top: l,arrow: m}
    };
    b.setPosition = function(a, b) {
        var c = [], d = [], e;
        for (var f in b)
            if (f == "arrow")
                for (var g in b[f]) {
                    e = b[f][g];
                    typeof e == "number" && (e += "px");
                    e && d.push(g + " : " + e)
                }
            else {
                e = b[f];
                typeof e == "number" && (e += "px");
                e && c.push(f + " : " + e)
            }
        a.arrow.className = b.arrow.className;
        a.arrow.style.cssText = d.join(";");
        a.layer.style.cssText = c.join(";")
    };
    b.setPositionByOpts = function(a, c) {
        var d = b.getLayerPosition(a.target, a.layer, a.pos, a.arrow);
        for (var e in c)
            d[e] += c[e];
        b.setPosition(a, d)
    };
    return function() {
        return b
    }
});
STK.register("common.dialog.commentDialogueTip", function(a) {
    var b = a.common.guide.util.tipLayer(), c = {binded: null,node: null,target: null,tip: null}, d, e, f = 0, g = a.E("pl_content_versionTip"), h = a.core.evt.delegatedEvent(g), i = {autoinit: function() {
            if (!f)
                if (c.binded)
                    c.binded === c.node && i.show();
                else {
                    d = a.sizzle('[messageTip="20"]', g)[0];
                    if (d) {
                        var b = i.getTarget(c.node);
                        if (b) {
                            c.binded = c.node;
                            i.createTip();
                            i.show()
                        }
                    } else
                        f = 1
                }
        },getTarget: function(b) {
            return a.sizzle('[action-type="commentDialogue"]', b)[0]
        },createTip: function() {
            c.tip = a.kit.dom.parseDOM(a.builder(d).list);
            c.tip.outer = d;
            h.add("iKnow", "click", i.close);
            a.addEvent()
        },close: function(b) {
            i.signKnown(b.data);
            i.hide();
            return a.core.evt.preventDefault(b.evt)
        },show: function() {
            c.target = i.getTarget(c.binded);
            a.setStyle(c.tip.outer, "visibility", "visible");
            e = window.setInterval(i.flushLocation, 200)
        },flushLocation: function() {
            var a = {target: c.target,layer: c.tip.outer,pos: "top",arrow: c.tip.arrow}, d = b.getLayerPosition(a.target, a.layer, a.pos, a.arrow);
            b.setPosition(a, d)
        },hide: function() {
            if (c.binded === c.node && c.tip) {
                a.setStyle(c.tip.outer, "visibility", "hidden");
                e && window.clearInterval(e)
            }
        },signKnown: function(b) {
            a.common.trans.versionTip.getTrans("closeBubble", {onSuccess: function() {
                    f = 1
                }}).request(b)
        }};
    return function(a) {
        c.node = a;
        return {hide: i.hide,show: i.autoinit}
    }
});
STK.register("common.feed.feedList.plugins.comment", function(a) {
    var b = a.common.feed.feedList.utils, c = a.core.dom.uniqueID, d = a.common.feed.feedList.feedTemps, e = {}, f = a.common.trans.comment.getTrans, g = a.kit.extra.language("#L{评论}"), h = a.kit.extra.language("#L{转发}"), i = a.common.depand.feed, j = a.common.content.weiboDetail.utils(), k = a.kit.extra.language, l = a.common.trans.comment, m = a.kit.extra.setPlainHash;
    return function(n) {
        var o = !1, p = null, q = null, r = {};
        if (!n)
            a.log("comment : need object of the baseFeedList Class");
        else {
            var s = n.getNode(), t = {}, u = !1, v = function(b, c, d, e) {
                var f = b.parentNode, g = !1, h = c.split(" "), i;
                if (!a.core.dom.hasClassName(b, c)) {
                    i = a.core.dom.sizzle("." + e, f)[0];
                    for (var j = 0; j < h.length; j++)
                        a.core.dom.removeClassName(i, h[j]);
                    a.core.dom.addClassName(i, d);
                    a.core.dom.addClassName(b, c);
                    g = !0
                }
                b.blur();
                return g
            }, w = i.bind("asyn_comment", function(f) {
                u = !1;
                var i = f.el, j = c(i), l = e[j], p = b.getMid(i, s), t = b.getFeedNode(i, s), w = a.sizzle('[node-type="feed_list_repeat"]', t)[0], x = i.dataset && i.dataset.mark || i.getAttribute("data-mark") || "", y = {};
                x && (y = a.queryToJson(x));
                if (!w)
                    a.log("feedList.plugins.comment: 评论列表的展示区不存在！");
                else {
                    if (!l) {
                        m((+(new Date)).toString());
                        l = e[j] = a.common.comment.comment(a.common.getDiss(a.core.json.merge(a.core.json.merge({mid: p,appkey: f.data.appkey,isMain: !0}, f.data), y), f.el), w);
                        a.custEvent.add(l, "count", function(a, b) {
                            if (!(parseInt(b) < 1)) {
                                i.innerHTML = g + "(" + b + ")";
                                $CONFIG.location == "home" && A(w)
                            }
                        });
                        a.custEvent.add(l, "comment", function(b, c) {
                            q = a.sizzle('a[node-type="feed_list_commentTabAll"]', t)[0];
                            var d = a.sizzle('[node-type="feed_list_commentList"]', t)[0], e = c.html, f = parseInt(c.count), g = a.sizzle('[node-type="feed_list_commentListNum"]', t)[0];
                            parseInt(f) > 0 && g && (g.innerHTML = k("#L{共}") + f + k("#L{条}"));
                            if (!q)
                                e && a.insertHTML(d, e, "afterbegin");
                            else if (!r[p])
                                e && a.insertHTML(d, e, "afterbegin");
                            else {
                                d.innerHTML = r[p];
                                v(q, "current S_txt1", "S_func1", "current");
                                o = !1;
                                e && a.insertHTML(d, e, "afterbegin")
                            }
                            r[p] = d.innerHTML
                        });
                        a.custEvent.add(l, "feed", function() {
                            var b = a.sizzle('a[action-type="feed_list_forward"]', i.parentNode)[0];
                            if (!b)
                                a.log("feedList.plugins.comment: 转发按钮节点不存在！");
                            else {
                                var c = b.innerHTML.match(/\(([\d]*)\)/);
                                b.innerHTML = h + "(" + (c ? parseInt(c[1]) + 1 : 1) + ")"
                            }
                        });
                        a.custEvent.add(l, "del", function(b, c) {
                            q = a.sizzle('a[node-type="feed_list_commentTabAll"]', t)[0];
                            var d = a.sizzle('[node-type="feed_list_commentList"]', t)[0];
                            if (r[p])
                                if (!o)
                                    d && (r[p] = d.innerHTML);
                                else {
                                    var e = document.createElement("div");
                                    e.innerHTML = r[p];
                                    a.core.util.hideContainer.appendChild(e);
                                    var f = a.sizzle(["dl[comment_id=", c.cid, "]"].join(""), e)[0];
                                    f && f.parentNode.removeChild(f);
                                    r[p] = e.innerHTML;
                                    a.core.util.hideContainer.removeChild(e);
                                    e = null
                                }
                            else
                                q && (r[p] = d.innerHTML)
                        });
                        w.innerHTML = d.loadingIMG;
                        w.style.display = "";
                        a.custEvent.fire(n, "commentShow", i)
                    } else {
                        a.custEvent.remove(l);
                        l.destroy();
                        delete e[j];
                        w.on = 0;
                        w.innerHTML = "";
                        w.style.display = "none";
                        $CONFIG.location == "home" && B(w);
                        a.custEvent.fire(n, "commentHide", i)
                    }
                    return b.preventDefault()
                }
            }, {onTimeout: function() {
                    u = !1
                }}), x = function(b) {
                a.core.evt.preventDefault();
                if (!u) {
                    u = !0;
                    w(b)
                }
            }, y = {getListByType: function(c, d) {
                    var e = c.data, g = e.mid, h = c.el, i = b.getFeedNode(h, s), l = v(c.el, "current S_txt1", "S_func1", "current");
                    if (!l)
                        return j.preventDefault();
                    m((+(new Date)).toString());
                    f("cfilter", {onSuccess: function(b) {
                            d.innerHTML = b.data.html;
                            o || (r[g] = b.data.html);
                            var c = a.sizzle('[node-type="feed_list_commentListNum"]', i)[0];
                            c && b.data && typeof b.data.count != "undefined" && (c.innerHTML = k("#L{共}") + b.data.count + k("#L{条}"));
                            i = null
                        },onFail: function(b) {
                            a.ui.alert(b.msg || a.kit.extra.language("#L{接口返回数据错误}"));
                            i = null
                        },onError: function(b) {
                            a.ui.alert(b.msg || a.kit.extra.language("#L{接口返回数据错误}"));
                            i = null
                        }}).request(e);
                    return !1
                }}, z = function(c) {
                a.preventDefault();
                var d = c.data.mid;
                o = c.el.getAttribute && c.el.getAttribute("node-type") == "feed_list_commentTabAll" ? !1 : !0;
                var e = c.el, f = b.getFeedNode(e, s), g = c.data, h = a.sizzle('[node-type="feed_list_commentList"]', f)[0];
                r[d] || (r[d] = h.innerHTML);
                h ? y.getListByType(c, h) : a.log("feedList.plugins.comment: 评论列表不存在！")
            }, A = i.bind("asyn_commentDialogue_tip", function(b) {
                a.common.dialog.commentDialogueTip(b).show()
            }, {onTimeout: function() {
                }}), B = function(b) {
                a.common.dialog.commentDialogueTip(b).hide()
            };
            n.getDEvent().add("feed_list_comment", "click", x);
            n.getDEvent().add("feed_list_commentSearch", "click", z);
            n.getDEvent().add("feed_private_tipclose", "click", function(c) {
                var d = c.data && c.data.type, e = b.getFeedNode(c.el, s), f = a.sizzle("[node-type='feed_privateset_tip']", e), g = f.length && f[0];
                g && a.setStyle(g, "display", "none");
                l.getTrans("privateNoMore", {onSuccess: function() {
                        d && (window.location.href = c.el.getAttribute("href"))
                    },onError: a.funcEmpty}).request({bubbletype: 7,time: 604800});
                return b.preventDefault()
            });
            n.regCustEvent("showComment", function(a, b) {
                x(b)
            });
            t.destroy = function() {
                for (var a in e)
                    e[a].destroy();
                q = null;
                r = null;
                e = {};
                p = null
            };
            return t
        }
    }
});
STK.register("common.feed.feedList.plugins.media", function(a) {
    var b = a.common.feed.feedList.utils, c = a.common.feed.feedList.feedTemps, d = a.core.util.easyTemplate, e = a.kit.extra.language, f = e("#L{加载失败}!"), g = e("#L{很抱歉，该内容无法显示，请稍后再试。}"), h = a.core.util.browser.IE, i = 40, j = 450, k = function(b, c) {
        return {prev: a.sizzle("[node-type=feed_list_media_prev]", b)[0],disp: a.sizzle("[node-type=feed_list_media_disp]", b)[0]}
    }, l = function(e, f, g) {
        var h = e.el, i = e.data;
        if (!h.loading) {
            h.tagName.toLowerCase() !== "img" && (h = a.sizzle("img", h)[0]);
            h.loading = 1;
            var l = h.src.replace("/thumbnail/", "/bmiddle/"), m = "http://photo.weibo.com/" + i.uid + "/wbphotos/large/photo_id/" + i.mid + "?refer=weibofeedv5", n = b.getFeedNode(h, f), o = n.getAttribute("isForward") ? 1 : "", p = b.getMid(h, f), q, r;
            if (!n) {
                a.log("parents attribute mid node is undefined!");
                return
            }
            n.isForward = o;
            var s = k(n, o);
            if (!s || !s.prev || !s.disp) {
                a.log('node-type="feed_list_media_prev" or node-type="feed_list_media_disp" in a feed\'s node is undefined!');
                return
            }
            if (g.voteObj[p]) {
                g.voteObj[p].destroy();
                delete g.voteObj[p]
            }
            var t = function() {
                h.loading = 0;
                if (q) {
                    h.bigImgWidth = q.width;
                    q.onload = null
                }
                r && (r.style.display = "none");
                s.prev.style.display = "none";
                s.disp.innerHTML = "";
                s.disp.appendChild(a.builder(d(c.mediaIMGTEMP, {notForward: !o,uniqueId: a.core.util.getUniqueKey(),bigSrc: l,largeSrc: m,bigWidth: h.bigImgWidth > j ? j : h.bigImgWidth,suda: {retract: "key=feed_image_click&value=image_zoomout",showBig: "key=feed_image_click&value=image_open",left: "key=feed_image_click&value=image_turnlift",right: "key=feed_image_click&value=image_turnright",big: "key=feed_image_click&value=image_zoomout"}}).toString()).box);
                s.disp.style.display = ""
            };
            if (h.bigImgWidth)
                t();
            else {
                var u = h.offsetWidth, v = parseInt(h.offsetHeight / 2 - 8);
                (r = a.core.dom.next(h)).style.cssText = "margin:" + v + "px " + parseInt(u / 2 - 8) + "px " + v + "px -" + parseInt(u / 2 + 8) + "px;";
                (q = new Image).onload = t;
                q.src = l
            }
        }
    }, m = function(c, d, e) {
        var f = c.el;
        if (!!e || !!/(img)|(canvas)/.test(c.evt.target.tagName.toLowerCase())) {
            var g = b.getFeedNode(f, d);
            if (!g) {
                a.log("parents attribute mid is undefined!");
                return
            }
            g.disp = "";
            var h = k(g, g.isForward);
            if (!h || !h.prev || !h.disp) {
                a.log('node-type="feed_list_media_prev" or node-type="feed_list_media_disp" in a feed\'s node is undefined!');
                return
            }
            a.position(h.disp).t < a.scrollPos().top && g.scrollIntoView();
            h.prev.style.display = "";
            h.disp.style.display = "none";
            h.disp.innerHTML = ""
        }
    }, n = function(c, d, e) {
        var f = c.el, g = b.getFeedNode(f, d);
        if (!f.parentNode.uid) {
            var h = a.sizzle('img[action-type="feed_list_media_bigimg"]', g)[0];
            f.parentNode.uid = a.core.dom.uniqueID(h) + "_" + a.core.util.getUniqueKey();
            h.setAttribute("id", f.parentNode.uid)
        }
        a.kit.dom.rotateImage.rotateRight(a.E(f.parentNode.uid), e, j)
    }, o = function(e, g, j, l) {
        var m = e.el, n = e.data, o = b.getFeedNode(m, g), p = o.getAttribute("isForward") ? "1" : "", r = b.getMid(m, g), s = k(o, p);
        if (!s || !s.prev || !s.disp)
            a.log('node-type="feed_list_media_prev" or node-type="feed_list_media_disp" in a feed\'s node is undefined!');
        else {
            if (o.disp == n.short_url)
                return;
            if (l.voteObj[r]) {
                l.voteObj[r].destroy();
                delete l.voteObj[r]
            }
            o.disp = n.short_url;
            o.isForward = p;
            s.prev.style.display = "none";
            var t = decodeURIComponent(n.title), u = a.bLength(t) > 71 ? a.leftB(t, 70) + "..." : t;
            t = a.bLength(t) > 24 ? a.leftB(t, 23) + "..." : t;
            s.disp.innerHTML = "";
            s.disp.appendChild(a.builder(d(c.mediaVideoMusicTEMP, {notForward: !p,short_url: decodeURIComponent(n.short_url),full_url: decodeURIComponent(n.full_url),title: t,fTitle: u,type: j}).toString()).box);
            s.disp.style.display = "";
            var v = a.sizzle('div[node-type="feed_list_media_big' + j + 'Div"]', s.disp)[0];
            if (!v) {
                a.log('media: node-type="feed_list_media_big' + j + 'Div" is not be found in feed_list_media_disp node!');
                return
            }
            l.dispContentNode[r] = v;
            var w = "default";
            try {
                h ? w = "object" : navigator.plugins["Shockwave Flash"] ? w = "embed" : w = "html5"
            } catch (x) {
            }
            var y = function() {
                v.innerHTML = f
            }, z = function(b) {
                if (!b.result || b.error_code || b.error)
                    y();
                else {
                    var c = l.dispContentNode[r];
                    c.mediaData = b.result;
                    c.innerHTML = "";
                    c.appendChild(a.builder(c.mediaData).box);
                    q && q.setFixed(!0)
                }
            };
            b.getFeedTrans("mediaShow", {onComplete: z,onFail: y}).request({vers: 3,lang: $CONFIG.lang,mid: r,short_url: n.short_url.replace(/http\:\/\/(t|sinaurl)\.cn\//, ""),template_name: w,source: "3818214747"});
            j === "video" && a.scrollTo(s.disp, {step: 1,top: i})
        }
    }, p, q, r = function(e, f, g) {
        p && a.fireEvent(p, "click");
        var h = e.el, i = e.data.title, j = b.getMid(h, f), k = g.dispContentNode[j], l = k.mediaData, n = a.builder(d(c.mediaVideoMusicFloatTEMP, {title: i}).toString()), o = n.list.outer[0], r = n.list.mediaContent[0];
        p = n.list.close[0];
        document.body.appendChild(o);
        q = a.kit.dom.fix(o, "rb");
        if (l) {
            r.innerHTML = "";
            r.appendChild(a.builder(l).box);
            q.setFixed(!0)
        } else
            g.dispContentNode[j] = r;
        a.addEvent(p, "click", function() {
            a.removeEvent(p, "click", arguments.callee);
            q && q.destroy();
            if (a.IE) {
                var b = a.sizzle("object", o);
                for (var c = 0, d = b.length; c < d; c++) {
                    var e = b[c];
                    e && (e = e.parentNode) && (e.innerHTML = "")
                }
            }
            a.removeNode(o);
            q = n = o = p = null
        });
        m(e, f, !0)
    }, s = function() {
        p && a.fireEvent(p, "click")
    }, t = function(e, g, h) {
        var i = e.el, j = b.getMid(i, g), l = e.data, m = b.getFeedNode(i, g), n = m.getAttribute("isForward") ? "1" : "", o = k(m, n);
        if (m.disp != l.short_url && !!o.disp) {
            o.disp.innerHTML = "";
            a.common.feed.widget.clear(j);
            o.disp.appendChild(a.builder(d(c.widgetTEMP, {notForward: !n,short_url: decodeURIComponent(l.short_url),full_url: decodeURIComponent(l.full_url),title: decodeURIComponent(l.title),suda: decodeURIComponent(l.suda || "")}).toString()).box);
            o.prev.style.display = "none";
            o.disp.style.display = "";
            var p = a.sizzle('div[node-type="feed_list_media_widgetDiv"]', o.disp)[0];
            b.getFeedTrans("widget", {onSuccess: function(b) {
                    b = b.data;
                    if (!!b.html) {
                        p.innerHTML = b.html;
                        a.common.feed.widget.add(j, o.disp)
                    }
                },onFail: function(a) {
                    p.innerHTML = a && a.msg || f
                },onError: function(a) {
                    p.innerHTML = a && a.msg || f
                }}).request({short_url: decodeURIComponent(l.short_url),isforward: n,mid: j});
            m.disp = l.short_url;
            m.isForward = n
        }
    }, u = function(e, g, h) {
        var i = e.el, j = b.getMid(i, g), l = e.data, m = b.getFeedNode(i, g), n = m.getAttribute("isForward") ? "1" : "", o = k(m, n);
        if (m.disp != l.short_url) {
            o.disp.innerHTML = "";
            a.common.feed.widget.clear(j);
            o.disp.appendChild(a.builder(d(c.widgetTEMP, {notForward: !n,short_url: decodeURIComponent(l.short_url),full_url: decodeURIComponent(l.full_url),title: decodeURIComponent(l.title),suda: decodeURIComponent(l.suda || "")}).toString()).box);
            o.prev.style.display = "none";
            o.disp.style.display = "";
            var p = a.sizzle('div[node-type="feed_list_media_widgetDiv"]', o.disp)[0];
            b.getFeedTrans("third_rend", {onSuccess: function(b) {
                    b = b.data;
                    if (!!b.html) {
                        p.innerHTML = b.html;
                        a.common.feed.widget.add(j, o.disp)
                    }
                },onFail: function(a) {
                    p.innerHTML = a && a.msg || f
                },onError: function(a) {
                    p.innerHTML = a && a.msg || f
                }}).request(a.kit.extra.merge({isforward: n,mid: j}, l));
            m.disp = l.short_url;
            m.isForward = n
        }
    }, v = function(e, f, h) {
        var j = e.el, l = b.getMid(j, f), m = e.data, n = b.getFeedNode(j, f), o = n.getAttribute("isForward") ? "1" : "", p = k(n, o);
        if (n.disp != m.short_url) {
            p.disp.innerHTML = "";
            a.common.feed.widget.clear(l);
            p.disp.appendChild(a.builder(d(c.qingTEMP, {notForward: !o,short_url: decodeURIComponent(m.short_url),full_url: decodeURIComponent(m.full_url),title: decodeURIComponent(m.title),suda: decodeURIComponent(m.suda || "")}).toString()).box);
            p.prev.style.display = "none";
            p.disp.style.display = "";
            var q = a.sizzle('div[node-type="feed_list_media_qingDiv"]', p.disp)[0], r = function(b) {
                var c = b.code;
                if (c + "" == "1") {
                    b = b.data;
                    if (!b.result)
                        return;
                    q.innerHTML = b.result;
                    a.common.feed.widget.add(l, p.disp)
                } else
                    s(b)
            }, s = function(a) {
                q.innerHTML = g
            }, t = m.template_name;
            t ? t == "video" && (a.IE ? t = "object" : navigator.plugins && navigator.plugins["Shockwave Flash"] ? t = "embed" : t = "html5") : t = "";
            b.getFeedTrans("qingShow", {onComplete: r,onFail: s}).request({short_url: m.short_url,lang: window.$CONFIG && window.$CONFIG.lang || "zh-cn",mid: l,vers: 3,template_name: t});
            n.disp = m.short_url;
            n.isForward = o;
            a.scrollTo(p.disp, {step: 1,top: i})
        }
    };
    return function(c) {
        if (!c)
            a.log("media : need object of the baseFeedList Class");
        else {
            var d = c.getNode(), e = c.getDEvent(), f = {}, g = {dispContentNode: {},voteObj: {}}, h = function() {
                a.custEvent.fire(c, "clearTips", "media")
            };
            e.add("feed_list_media_toSmall", "click", function(c) {
                a.common.feed.widget.clear(b.getMid(c.el, d));
                h();
                m(c, d, !0);
                return b.preventDefault(c.evt)
            });
            e.add("feed_list_media_img", "click", function(a) {
                h();
                l(a, d, g);
                return b.preventDefault(a.evt)
            });
            e.add("feed_list_media_bigimgDiv", "click", function(a) {
                h();
                m(a, d);
                return b.preventDefault(a.evt)
            });
            e.add("feed_list_media_toRight", "click", function(a) {
                h();
                n(a, d, 90);
                return b.preventDefault(a.evt)
            });
            e.add("feed_list_media_toLeft", "click", function(a) {
                h();
                n(a, d, -90);
                return b.preventDefault(a.evt)
            });
            e.add("feed_list_media_video", "click", function(a) {
                h();
                o(a, d, "video", g);
                return b.preventDefault(a.evt)
            });
            e.add("feed_list_media_music", "click", function(b) {
                a.preventDefault();
                h();
                o(b, d, "music", g);
                return
            });
            e.add("feed_list_media_toFloat", "click", function(e) {
                h();
                a.custEvent.fire(c, "clearToFloat");
                r(e, d, g);
                return b.preventDefault(e.evt)
            });
            a.custEvent.define(c, "clearToFloat");
            a.custEvent.add(c, "clearToFloat", s);
            e.add("feed_list_media_magic", "click", function(c) {
                h();
                c.data.swf ? a.common.magic(c.data.swf) : a.log("魔法表情的地址不存在: node上的action-data swf不存在!");
                return b.preventDefault(c.evt)
            });
            e.add("feed_list_media_v5update", "click", function(c) {
                h();
                c.data.swf ? a.common.magic(decodeURIComponent(c.data.swf), undefined, {isV5update: !0}) : a.log("魔法表情的地址不存在: node上的action-data swf不存在!");
                return b.preventDefault(c.evt)
            });
            e.add("feed_list_media_widget", "click", function(c) {
                var e = a.fixEvent(c.evt), f = e.target, i = b.getFeedNode(f, d), j = a.kit.dom.parseDOM(a.builder(i).list), k = j.feed_list_pulishMood;
                if (k) {
                    a.isArray(k) || (k = [k]);
                    for (var l = 0, m = k.length; l < m; l++) {
                        var n = k[l];
                        if (f == n || a.core.dom.contains(n, f))
                            return
                    }
                }
                h();
                t(c, d, g);
                return b.preventDefault(c.evt)
            });
            e.add("feed_list_third_rend", "click", function(a) {
                h();
                u(a, d, g);
                return b.preventDefault(a.evt)
            });
            e.add("feed_list_media_qing", "click", function(a) {
                h();
                v(a, d, g);
                return b.preventDefault(a.evt)
            });
            e.add("feed_list_url", "click", function(a) {
                var c = a.el, e = b.getMid(c, d), f = b.getFeedNode(c, d), g = f.dataset && f.dataset.mark || f.getAttribute("data-mark") || "";
                g ? window.open(c.href + "?u=" + $CONFIG.oid + "&m=" + e + "&" + g) : window.open(c.href + "?u=" + $CONFIG.oid + "&m=" + e);
                return b.preventDefault()
            });
            e.add("vote_toSmallInfo", "click", function(c) {
                var e = c.el, f = b.getFeedNode(e, d), g = a.kit.dom.parseDOM(a.builder(f).list);
                g.vote_bigInfo && (g.vote_bigInfo.style.display = "none");
                g.vote_smallInfo && (g.vote_smallInfo.style.display = "");
                return a.preventDefault(c.evt)
            });
            e.add("vote_toBigInfo", "click", function(c) {
                var e = c.el, f = b.getFeedNode(e, d), g = a.kit.dom.parseDOM(a.builder(f).list);
                g.vote_smallInfo && (g.vote_smallInfo.style.display = "none");
                g.vote_bigInfo && (g.vote_bigInfo.style.display = "");
                return a.preventDefault(c.evt)
            });
            e.add("vote_refresh_code", "click", function(b) {
                var c = b.el, d = c.src.replace(/ts=.+/, "") + "ts=" + a.getUniqueKey();
                c.src = d;
                return a.preventDefault(b.evt)
            });
            f.destroy = function() {
                q && q.destroy();
                d = e = undefined;
                a.common.feed.widget.destroy();
                a.custEvent.remove(c, "clearToFloat", s)
            };
            return f
        }
    }
});
STK.register("common.feed.feedList.plugins.commonMedia", function(a) {
    var b = a.common.feed.feedList.utils, c = a.kit.dom.parentAttr, d = a.common.feed.widget, e = a.common.feed.feedList.feedTemps, f = a.core.util.easyTemplate, g = a.kit.extra.language, h = g("#L{加载失败}!"), i = g("#L{很抱歉，该内容无法显示，请稍后再试。}"), j = a.core.util.browser.IE, k = a.common.trans.feed, l = {}, m = function(b) {
        return {prev: a.sizzle("[node-type=common_list_media_prev]", b)[0],disp: a.sizzle("[node-type=common_list_media_disp]", b)[0]}
    }, n = function(a) {
        return {activity: "act_id",feed: "mid"}[a] || "mid"
    }, o = function(a, b, d) {
        var b = n(b);
        return a.getAttribute(b) || c(a, b, d)
    }, p = function(b, c, d) {
        var c = n(c);
        return a.sizzle("[" + c + "=" + b + "]", d)[0]
    }, q = function(b, c) {
        var g = b.data, j = b.el, n = a.queryToJson(j.getAttribute("data-param"));
        n.lang = $CONFIG && $CONFIG.lang;
        var q = a.queryToJson(j.getAttribute("data-trans")).name, r = j.getAttribute("data-feedtype"), s = o(b.el, r, c), t = p(s, r, c), u = m(t), v = a.builder(f(e.commonMediaTEMP, {title: g.title,url: g.url,tofloat: g.tofloat == "1",type: r,id: s}).toString()), w = v.list.common_list_media_Div[0];
        k.request(q, {onSuccess: function(a) {
                var b = a.data, c = b.render_data;
                l[s] = c;
                w.innerHTML = c;
                d.clear(s);
                d.add(s, u.disp)
            },onError: function(a) {
                w.innerHTML = i
            },onFail: function() {
                w.innerHTML = h
            }}, n);
        if (w) {
            u.disp.appendChild(v.box);
            u.disp.style.display = "";
            u.prev.style.display = "none";
            return !1
        }
    }, r = function(a, b) {
        var c = a.data.id, e = a.data.type, f = p(c, e, b), g = m(f);
        d.clear(c);
        g.disp.innerHTML = "";
        g.disp.style.display = "none";
        g.prev.style.display = ""
    }, s, t, u = function(b, c, d) {
        s && a.fireEvent(s, "click");
        var g = b.el, h = b.data.title, i = b.data.id;
        videoHTML = l[i];
        var j = a.builder(f(e.mediaVideoMusicFloatTEMP, {title: h}).toString()), k = j.list.outer[0], m = j.list.mediaContent[0];
        s = j.list.close[0];
        document.body.appendChild(k);
        t = a.kit.dom.fix(k, "rb");
        if (videoHTML) {
            m.innerHTML = "";
            m.appendChild(a.builder(videoHTML).box);
            t.setFixed(!0)
        }
        a.addEvent(s, "click", function() {
            a.removeEvent(s, "click", arguments.callee);
            t && t.destroy();
            if (a.IE) {
                var b = a.sizzle("object", k);
                for (var c = 0, d = b.length; c < d; c++) {
                    var e = b[c];
                    e && (e = e.parentNode) && (e.innerHTML = "")
                }
            }
            a.removeNode(k);
            t = j = k = s = null
        });
        r(b, c)
    }, v = function() {
        s && a.fireEvent(s, "click")
    };
    return function(c) {
        if (!c)
            a.log("media : need object of the baseFeedList Class");
        else {
            var d = c.getNode(), e = c.getDEvent(), f = {}, g = function() {
                a.custEvent.fire(c, "clearTips", "media")
            };
            e.add("common_list_media_show", "click", function(a) {
                g();
                q(a, d);
                return b.preventDefault(a.evt)
            });
            e.add("common_list_media_hide", "click", function(a) {
                g();
                r(a, d);
                return b.preventDefault(a.evt)
            });
            e.add("common_list_media_toFloat", "click", function(e) {
                g();
                a.custEvent.fire(c, "clearToFloat");
                u(e, d);
                return b.preventDefault(e.evt)
            });
            a.custEvent.define(c, "clearToFloat");
            a.custEvent.add(c, "clearToFloat", v);
            f.destroy = function() {
                t && t.destroy();
                d = e = undefined;
                a.common.feed.widget.destroy();
                a.custEvent.remove(c, "clearToFloat", v)
            };
            return f
        }
    }
});
STK.register("kit.dom.children", function(a) {
    return function(b) {
        if (!a.core.dom.isNode(b))
            throw "Parameter must be an HTMLEelement!";
        var c = [];
        for (var d = 0, e = b.childNodes.length; d < e; d++)
            b.childNodes[d].nodeType == 1 && c.push(b.childNodes[d]);
        return c
    }
});
STK.register("kit.dom.outerHeight", function(a) {
    return function(b) {
        if (!a.core.dom.isNode(b))
            throw "Parameter must be an HTMLEelement!";
        return a.core.dom.getSize(b).height + (parseFloat(a.core.dom.getStyle(b, "marginTop")) || 0) + (parseFloat(a.core.dom.getStyle(b, "marginBottom")) || 0)
    }
});
STK.register("common.feed.feedList.plugins.page", function(a) {
    var b = a.common.feed.feedList.utils, c = typeof $CONFIG != "undefined" && $CONFIG.bigpipe == "true";
    return function(d, e) {
        if (!d)
            a.log("page : need object of the baseFeedList Class");
        else {
            e = a.parseParam({style: 1,loadCount: 15}, e);
            var f = {}, g = d.getNode(), h, i = function(b) {
                a.custEvent.fire(d, "clearTips", "page");
                var c = d.getCurrentPage(), f = {page: b,pre_page: d.getCurrentPage(),count: e.loadCount,end_id: d.getEndId(),max_msign: d.getLastFeedAttr("msign"),filtered_min_id: d.getLastFeedAttr("filtered_min_id")};
                parseInt(c, 10) == b - 1 ? f.end_msign = -1 : f.max_msign = -1;
                d.setCurrentPage(b);
                d.setRequestData("page", f);
                if (b == 1) {
                    h.top = !0;
                    delete f.end_id
                } else
                    h.top = !1;
                d.setRequestAction("page", h);
                d.showWait("page");
                if (a.position(g.parentNode).t < a.scrollPos().top)
                    if (a.E("pl_content_biztips")) {
                        var i = a.E("pl_content_biztips");
                        a.core.util.scrollTo(i, {step: 10,top: 50})
                    } else
                        a.core.util.scrollTo(g.parentNode, {step: 10,top: 40});
                a.custEvent.fire(d, "request", ["page", a.parseParam(f)])
            };
            d.regCustEvent("toFirstPage", function() {
                i(1)
            });
            d.setRequestAction("page", h = {center: !0,bottom: !0});
            var j, k, l, m, n, o, p = {pageMoreDisplay: function(c) {
                    if (n == undefined) {
                        m.style.display = "";
                        c = a.fixEvent(c);
                        var d = l.getAttribute("action-data");
                        if (d) {
                            d = a.core.json.queryToJson(d);
                            if (d.currentPage) {
                                var e = 1 * d.currentPage, f = a.kit.dom.firstChild(m), g = 1 * (d.countPage || a.kit.dom.children(m).length), h = (g - e - 9) * (a.kit.dom.outerHeight(f) - 1);
                                h > 0 && (m.scrollTop = h)
                            }
                        }
                    }
                    n = 1;
                    return b.preventDefault(c)
                },pageMoreOver: function(a) {
                    n == undefined && (m.style.display = "");
                    n = 1;
                    return b.preventDefault(a)
                },pageMoreOut: function(a) {
                    n = 0;
                    clearTimeout(o);
                    o = setTimeout(function() {
                        if (n == 0) {
                            m && (m.style.display = "none");
                            n = undefined
                        }
                    }, 500);
                    return b.preventDefault(a)
                },pageNClick: function(a) {
                    var c = a.el;
                    c.className != "current" && i(parseInt(a.data.page));
                    if (window.WBAD && window.WBAD.refresh) {
                        var d = {rt: 3};
                        window.WBAD.refresh(d)
                    }
                    return b.preventDefault(a.evt)
                }}, q = function() {
                j = a.sizzle('div[node-type="feed_list_page"]', g)[0];
                if (!!j) {
                    if (c) {
                        k = a.core.evt.delegatedEvent(j);
                        k.add("feed_list_page_n", "click", p.pageNClick);
                        k.add("feed_list_page_first", "click", p.pageNClick);
                        k.add("feed_list_page_pre", "click", p.pageNClick);
                        k.add("feed_list_page_next", "click", p.pageNClick)
                    }
                    if ((m = a.sizzle('div[action-type="feed_list_page_morelist"]', j)[0]) && (l = a.sizzle('a[action-type="feed_list_page_more"]', j)[0])) {
                        a.addEvent(l, "mouseover", p.pageMoreDisplay);
                        a.addEvent(m, "mouseover", p.pageMoreOver);
                        a.addEvent(l, "mouseout", p.pageMoreOut);
                        a.addEvent(m, "mouseout", p.pageMoreOut)
                    }
                }
            }, r = function() {
                if (j) {
                    clearTimeout(o);
                    k && k.destroy && k.destroy();
                    if (l) {
                        a.removeEvent(l, "mouseover", p.pageMoreOver);
                        a.removeEvent(m, "mouseover", p.pageMoreOver);
                        a.removeEvent(l, "mouseout", p.pageMoreOut);
                        a.removeEvent(m, "mouseout", p.pageMoreOut)
                    }
                    l = m = n = undefined
                }
            }, s = function(b, c) {
                if (c == "page") {
                    a.custEvent.fire(d, "lazyload");
                    d.getCurrentPage() == 1 && a.custEvent.fire(d, "updateEndId")
                }
                r();
                q()
            };
            a.custEvent.add(d, "updateFeed", s);
            q();
            f.destroy = function() {
                a.custEvent.remove(d, "updateFeed", s);
                r()
            };
            return f
        }
    }
});
STK.register("common.feed.feedList.plugins.activityPage", function(a) {
    var b = a.common.feed.feedList.utils;
    return function(c, d) {
        if (!c)
            a.log("page : need object of the baseFeedList Class");
        else {
            d = a.parseParam({loadCount: 15}, d);
            var e, f = {}, g = {}, h = c.getNode(), i = {setPageId: function(a, b) {
                    g[a] = b
                },getPageId: function(a) {
                    return g[a] || 0
                },clear: function() {
                    g = {}
                }};
            c.setRequestAction("activityPage", e = {center: !0,bottom: !0});
            var j = function(b, f) {
                a.custEvent.fire(c, "clearTips", "activityPage");
                var g = b.page;
                f == "next" && i.setPageId(g, b.activity_id);
                var b = {ac_page: g,count: d.loadCount,activity_id: f == "next" ? b.activity_id : i.getPageId(g)};
                c.setCurrentPage(g);
                c.setRequestData("activityPage", b);
                g == 1 ? e.top = !0 : e.top = !1;
                c.setRequestAction("activityPage", e);
                c.showWait("activityPage");
                a.position(h.parentNode).t < a.scrollPos().top && h.parentNode.scrollIntoView();
                a.custEvent.fire(c, "request", ["activityPage", a.parseParam(b)])
            };
            c.getDEvent().add("feed_list_activitypage_prev", "click", function(a) {
                j(a.data, "prev");
                return b.preventDefault(a.evt)
            });
            c.getDEvent().add("feed_list_activitypage_next", "click", function(a) {
                j(a.data, "next");
                return b.preventDefault(a.evt)
            });
            var k = function(b, d) {
                d == "activityPage" && a.custEvent.fire(c, "lazyload", {})
            };
            a.custEvent.add(c, "updateFeed", k);
            c.regCustEvent("toActivity", function() {
                j({page: 1}, "prev")
            });
            f.destroy = function() {
                a.custEvent.remove(c, "updateFeed", k);
                e = g = i = j = k = null
            };
            return f
        }
    }
});
STK.register("common.map", function(a) {
    var b = "http://js.t.sinajs.cn/t5/";
    if (!1)
        b = $CONFIG.jsPath;
    var c = b + "home/static/map/", d = '<div class="W_layer" node-type="outer" style="display:none;position:absolute;z-index:500">\n\t\t  <div class="bg">\n\t\t\t\t<table border="0" cellspacing="0" cellpadding="0">\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t\t\t<div node-type="inner" class="map_box">\n\t\t\t\t\t\t\t\t\t\t<iframe node-type="iframe" frameborder="0" scrolling="no" src="about:blank;" style="width: 400px; height: 250px; border: 0pt none;" id="mini_map_panel"></iframe>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<a node-type="close" title="关闭" class="W_close" href="javascript:;"></a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t</table>\n\t\t\t\t<div node-type="arrow" class="arrow arrow_b"></div>\n\t\t\t</div>\n\t\t</div>', e = function() {
        var b;
        return function() {
            var e = !1;
            if (!b) {
                b = a.ui.mod.layer(d);
                var f = a.core.obj.sup(b, ["show"]).show, g = b.getDom("close"), h = b.getOuter(), i = b.getDom("iframe"), j = function() {
                    b.hide()
                };
                a.addEvent(g, "click", j);
                b.refresh = function() {
                    e = !1;
                    return this
                };
                b.show = function(b, d) {
                    if (!b)
                        a.log("common.map : node is no defined");
                    else {
                        if (e) {
                            f();
                            return
                        }
                        d = a.parseParam({longitude: "",latitude: "",head: "",internal: "",addr: ""}, d);
                        var g = d.internal == 0 ? "g" : "m";
                        i.onload = i.onreadystatechange = function() {
                            if (!e && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                                f();
                                i.onload = i.onreadystatechange = null;
                                e = !0
                            }
                        };
                        i.src = [c, g, "map.html?ver=", $CONFIG.version, "&", a.jsonToQuery(d)].join("")
                    }
                };
                document.body.appendChild(h);
                b.destroy = function() {
                    a.removeEvent(g, "click", j);
                    a.removeNode(h);
                    e = !1;
                    return this
                }
            }
            return b
        }
    }();
    return e
});
STK.register("common.trans.map", function(a) {
    var b = a.kit.io.inter(), c = b.register;
    c("getInternalInfo", {url: "http://api.weibo.com/2/location/geocode/is_domestic.json",method: "get",varkey: "callback",requestMode: "jsonp"});
    return b
});
STK.register("common.feed.feedList.plugins.map", function(a) {
    var b = a.common.feed.feedList.utils;
    return function(c) {
        if (!c)
            a.log("map : need object of the baseFeedList Class");
        else {
            var d, e;
            c.getDEvent().add("feed_list_geo_info", "click", function(c) {
                var f = a.fixEvent(), g = c.el, h = c.data, i = h.geo;
                if (!i)
                    a.log("map: feed_list_geo_info node geo is empty");
                else {
                    var j = function(a) {
                    }, k = function(b) {
                        if (typeof b == "object" && b.code == 1) {
                            var k = b.data.geo.type, l = i.split(",");
                            d || (d = a.common.map());
                            e != g && d && d.refresh();
                            d.show(g, {latitude: l[1],longitude: l[0],head: h.head,addr: h.title,internal: k});
                            a.common.extra.rectsPosition.setArrow({evt: f,node: c.el,layer: d.getDom("outer"),arrow: d.getDom("arrow")});
                            e = g
                        } else
                            j()
                    };
                    a.common.trans.map.getTrans("getInternalInfo", {onComplete: k,onFail: j}).request({coordinates: i + ",geo",source: "4526198296"});
                    return b.preventDefault(c.evt)
                }
            });
            var f = function(b) {
                if (!!e) {
                    var c = a.fixEvent(b).target;
                    e != c && !a.contains(e, c) && d && d.hide()
                }
            };
            a.addEvent(document, "click", f);
            a.custEvent.add(d, "hide", function() {
                e = undefined
            });
            var g = {destroy: function() {
                    a.removeEvent(document, "click", f);
                    a.custEvent.remove(d);
                    d && d.destroy()
                }};
            return g
        }
    }
});
STK.register("common.feed.formatFeedTime", function(a) {
    var b = a.kit.extra.language, c = b("#L{月}"), d = b("#L{日}"), e = b("#L{今天}"), f = b("#L{秒前}"), g = b("#L{分钟前}");
    return function(a, b) {
        var h = a.getFullYear(), i = b.getFullYear(), j = a.getMonth() + 1, k = b.getMonth() + 1, l = a.getDate(), m = b.getDate(), n = a.getHours(), o = b.getHours();
        o < 10 && (o = "0" + o);
        var p = b.getMinutes();
        p < 10 && (p = "0" + p);
        var q = a - b;
        q = q > 0 ? q : 0;
        q = q / 1e3;
        if (h != i)
            return i + "-" + k + "-" + m + " " + o + ":" + p;
        if (j != k || l != m)
            return k + c + m + d + o + ":" + p;
        if (n != o && q > 3600)
            return e + o + ":" + p;
        if (q < 51) {
            q = q < 1 ? 1 : q;
            return Math.floor((q - 1) / 10) + 1 + "0" + f
        }
        return Math.floor(q / 60 + 1) + g
    }
});
STK.register("common.feed.feedList.plugins.updateTime", function(a) {
    var b = a.common.feed.formatFeedTime, c = typeof $CONFIG != "undefined" && "timeDiff" in $CONFIG ? $CONFIG.timeDiff : 0, d = function(d) {
        var e = a.sizzle('a[node-type="feed_list_item_date"]', d), f = new Date;
        f.setTime(f.getTime() - c);
        var g;
        for (var h = 0; h < e.length; h++) {
            var i = e[h], j = i.getAttribute("date");
            if (!/^\s*\d+\s*$/.test(j))
                continue;
            var k = new Date;
            k.setTime(parseInt(j, 10));
            i.innerHTML = b(f, k);
            g == undefined && (g = f.getTime() - k.getTime() < 6e4)
        }
        return g
    };
    return function(b) {
        if (!b)
            a.log("updateTime : need object of the baseFeedList Class");
        else {
            var c = b.getNode(), e, f = function(a) {
                clearTimeout(e);
                e = setTimeout(function() {
                    d(c) ? f(1e4) : f(6e4)
                }, a)
            }, g = function() {
                f(1e4)
            };
            f(1e4);
            a.custEvent.add(b, "updateFeed", g);
            var h = {destroy: function() {
                    clearTimeout(e);
                    a.custEvent.remove(b, "updateFeed", g);
                    h = b = c = e = f = g = null
                }};
            return h
        }
    }
});
STK.register("common.feed.feedList.plugins.delOverFeeds", function(a) {
    var b = a.common.feed.feedList.utils, c = 1e3, d = function(a, c) {
        var d = b.getFeeds(a, 'action-type="feed_list_item"');
        for (var e = d.length; e > c; e--)
            a.removeChild(d[e - 1]);
        d = undefined
    };
    return function(b, e) {
        if (!b)
            a.log("delOverFeeds : need object of the baseFeedList Class");
        else {
            e = a.parseParam({feedOverNum: c}, e);
            var f = {}, g = b.getNode(), h = function() {
                d(g, e.feedOverNum)
            };
            b.regCustEvent("delOverFeeds", h);
            f.destroy = function() {
                a.custEvent.remove(b, "delOverFeeds", h);
                f = g = undefined
            };
            return f
        }
    }
});
STK.register("common.feed.feedList.plugins.lazyload", function(a) {
    return function(b, c) {
        if (!b)
            a.log("lazyload : need object of the baseFeedList Class");
        else {
            var d = {}, e = b.getNode(), f, g = 0, h = function() {
                f && f.destroy();
                var c = a.sizzle('div[node-type="lazyload"]', e)[0];
                if (!!c) {
                    b.setBottomNode(c);
                    f = a.common.extra.lazyload([c], function() {
                        var c = {pre_page: b.getCurrentPage(),page: b.getCurrentPage(),max_id: b.getLastFeedId(),end_id: b.getEndId(),count: g == 1 ? 15 : 15,pagebar: g == 1 ? 1 : 0,max_msign: b.getLastFeedAttr("msign"),filtered_min_id: b.getLastFeedAttr("filtered_min_id")};
                        b.setRequestData("lazyload", c);
                        b.showWait("lazyload");
                        a.custEvent.fire(b, "request", ["lazyload", a.parseParam(c)]);
                        f.destroy();
                        f = undefined
                    }, {threshold: a.winSize().height * 1.5})
                }
            };
            b.setRequestAction("lazyload", {bottom: !0});
            b.regCustEvent("lazyload", function() {
                g = 0;
                h()
            });
            a.custEvent.add(b, "updateFeed", function(a, b) {
                if (b == "lazyload") {
                    g = g == 0 ? 1 : 0;
                    h()
                }
            });
            h();
            d.destroy = function() {
                f && f.destroy();
                a.custEvent.remove(b, "lazyload");
                d = b = e = f = undefined
            };
            return d
        }
    }
});
STK.register("common.feed.feedList.plugins.newFeed", function(a) {
    var b = a.common.feed.feedList.utils, c = a.common.feed.feedList.feedTemps, d = a.kit.dom.firstChild;
    return function(e) {
        if (!e)
            a.log("newFeed : need object of the baseFeedList Class ");
        else {
            var f = {}, g = e.getNode(), h = !0, i = 0, j = 0, k = "mblog", l = function() {
                return k === "activity" ? 1 : 0
            };
            e.setRequestAction("newFeed", {top: !0});
            e.setExtraFunction("showNewFeedTip", function(b) {
                if (j == 0) {
                    b = a.parseParam({count: 0,isFilterAll: !1,feedType: "mblog"}, b);
                    k = b.feedType;
                    i = b.count;
                    h = !!b.isFilterAll;
                    if (e.isTopWaiting() || !i)
                        return;
                    e.removeTopNode();
                    e.clearNewBar();
                    var f = {mblog: c.newFeedTipHTML,activity: c.activityNewFeedTipHTML}[b.feedType];
                    a.insertHTML(g, f.replace("[n]", i), "AfterBegin");
                    e.setTopNode(d(g));
                    a.custEvent.fire(e, "stopRecommendTip")
                }
            });
            a.custEvent.add(e, "updateFeed", function(b, c) {
                if (c == "newFeed") {
                    var d = a.sizzle("dl.feed_list_new", g)[1];
                    d && a.removeClassName(d, "feed_list_new");
                    a.custEvent.fire(f, "delOverFeeds");
                    e.removeRecommend();
                    a.custEvent.fire(e, "showRecommendTip");
                    setTimeout(function() {
                        j = 0
                    }, 3e4)
                }
            });
            a.custEvent.add(e, "showError", function(a, b) {
                b == "newFeed" && setTimeout(function() {
                    j = 0
                }, 3e4)
            });
            a.custEvent.add(e, "request", function(a, b) {
                b == "newFeed" && (j = 1)
            });
            e.getDEvent().add("feed_list_newBar", "click", function(b) {
                a.custEvent.fire(e, "clearTips", "newFeed");
                var c = l();
                if ((c || h) && i <= 50) {
                    if (e.getCurrentPage() == 1) {
                        if (c)
                            a.custEvent.fire(e, "toActivity");
                        else {
                            var d = {since_id: e.getFirstFeedId(),end_msign: e.getFirstFeedAttr("msign"),activity: c};
                            e.setRequestData("newFeed", d);
                            e.showWait("newFeed");
                            a.custEvent.fire(e, "request", ["newFeed", a.parseParam(d)])
                        }
                        try {
                            SUDA.log()
                        } catch (f) {
                        }
                    } else
                        c ? a.custEvent.fire(e, "toActivity") : a.custEvent.fire(e, "toFirstPage");
                    a.kit.extra.setPlainHash((+(new Date)).toString())
                } else
                    c ? a.custEvent.fire(e, "toActivity") : a.custEvent.fire(e, "backToAll");
                try {
                    a.preventDefault(b.evt)
                } catch (f) {
                }
                if (window.WBAD && window.WBAD.refresh) {
                    var g = {rt: 2};
                    window.WBAD.refresh(g)
                }
                a.historyM && a.historyM.getURL().query.indexOf("lf=reg") != -1 && a.historyM.setQuery({lf: 0});
                return !1
            });
            e.getDEvent().add("feed_tip_tosmart", "click", function(c) {
                a.custEvent.fire(e, "smartSort");
                return b.preventDefault(c.evt)
            });
            a.hotKey.add(document.documentElement, ["r"], function(a) {
                if (!a.ctrlKey) {
                    var b = e.getNewBar()[0];
                    b && e.getDEvent().fireDom(b, "click", null)
                }
            }, {type: "keyup",disableInInput: !0});
            return f
        }
    }
});
STK.register("common.feed.feedList.plugins.backToAll", function(a) {
    var b = a.common.feed.feedList.utils;
    return function(c) {
        if (!c)
            a.log("backToAll : need object of the baseFeedList Class");
        else {
            var d = {}, e = c.getNode(), f = function() {
                a.custEvent.fire(c, "clearTips", "toAllLink");
                var b = {count: 15};
                c.setRequestData("backToAll", b);
                c.showWait("backToAll");
                c.setCurrentPage(1);
                window.scrollTo(0, 0);
                a.custEvent.fire(c, "request", ["backToAll", a.parseParam(b)])
            };
            c.regCustEvent("backToAll", function() {
                f()
            });
            c.setRequestAction("backToAll", {top: !0,center: !0,bottom: !0});
            a.custEvent.add(c, "updateFeed", function(b, d) {
                d == "backToAll" && a.custEvent.fire(c, "lazyload")
            });
            c.getDEvent().add("feed_list_toAllLink", "click", function(a) {
                f();
                return b.preventDefault(a.evt)
            });
            return d
        }
    }
});
STK.register("common.feed.feedList.plugins.search", function(a) {
    return function(b) {
        if (!b)
            a.log("search : need object of the baseFeedList Class");
        else {
            var c = {};
            b.setRequestAction("search", {top: !0,center: !0,bottom: !0});
            b.setRequestData("search", {count: 15});
            a.custEvent.add(b, "updateFeed", function(c, d) {
                if (d == "search") {
                    b.setCurrentPage(1);
                    a.custEvent.fire(b, "updateEndId");
                    a.custEvent.fire(b, "lazyload")
                }
            });
            return c
        }
    }
});
STK.register("common.feed.feedList.plugins.imgAdvLoading", function(a) {
    var b, c = {};
    return function(d, e) {
        if (!d)
            a.log(" imgAdvLoading : need object of the baseFeedList Class");
        else {
            var f = {}, g = [], h, i, j, k = function() {
                h = null;
                g.shift();
                j && (j.onload = j.onerror = null);
                clearTimeout(i);
                m()
            }, l = function() {
                var a = g[0];
                if (a && !c[a]) {
                    h = 1;
                    var b = new Image;
                    c[a] = b;
                    b.onload = b.onerror = k;
                    i = setTimeout(k, 1e4);
                    j = b;
                    b.setAttribute("src", a.replace(/\/thumbnail\//, "/bmiddle/"))
                } else
                    k()
            }, m = function() {
                !h && g.length && l()
            }, n = function(b) {
                b = a.isArray(b) ? b : [b];
                Array.prototype.push.apply(g, b);
                m()
            };
            a.custEvent.add(d, "updateFeed", function(b, c, d) {
                if (!!d) {
                    var e = d.match(/<[^<]*feed_list_media_bgimg[^>]*>/g);
                    if (e) {
                        e = a.foreach(e, function(a) {
                            var b = a.match(/src\s*=\s*(?:'|")*([^'"]*)/);
                            if (b && (b = b[1]) && b.indexOf(".gif") == -1)
                                return b
                        });
                        n(e)
                    }
                }
            });
            var o = a.foreach(a.sizzle("img[node-type=feed_list_media_bgimg]", d.getNode()), function(a) {
                var b = a.getAttribute("src");
                if (b && b.indexOf(".gif") == -1)
                    return b
            }), p, q = function() {
                if (b)
                    r();
                else {
                    a.addEvent(window, "load", function() {
                        if (!b) {
                            clearTimeout(p);
                            b = 1;
                            r()
                        }
                    });
                    p = setTimeout(function() {
                        b = 1;
                        r()
                    }, 5e3)
                }
            }, r = function() {
                o && o.length && n(o)
            };
            q();
            f.destroy = function() {
                g = [];
                k()
            };
            return f
        }
    }
});
STK.register("common.feed.feedList.plugins.feedHotKey", function(a) {
    return function(b) {
        var c = {}, d = function() {
            var a = b.getNodeList(), c = 0, d = STK.core.util.scrollPos, e = STK.core.dom.position, f = 0;
            for (c = 0; c < a.length; c++) {
                f = e(a[c]).t;
                var g = f - d().top;
                if (g > 42)
                    break
            }
            STK.core.util.scrollTo(a[c], {step: 4,top: 42})
        }, e = function() {
            var a = b.getNodeList(), c = 0, d = STK.core.util.scrollPos, e = STK.core.dom.position, f = 0;
            for (c = 0; c < a.length; c++) {
                f = e(a[c]).t;
                var g = f - d().top;
                if (g >= 0)
                    break
            }
            c == 0 ? STK.core.util.scrollTo(document.documentElement, {step: 4}) : STK.core.util.scrollTo(a[c - 1], {step: 4,top: 42})
        }, f = function() {
            var c = b.getNewBar()[0], d = 0;
            if (c) {
                var e = 80;
                clearTimeout(f.timer);
                var g = a.position(c), h = a.core.dom.getSize(c), i = a.core.util.winSize().height;
                if (i < g.t + h.height + e) {
                    var j = a.position(b.getNode()).t - e;
                    j > 0 && (d = j)
                }
                f.timer = setTimeout(function() {
                    b.getDEvent().fireDom(c, "click", null)
                }, 500)
            }
            window.scrollTo(0, d)
        };
        a.hotKey.add(document.documentElement, ["j"], d, {type: "keydown",disableInInput: !0});
        a.hotKey.add(document.documentElement, ["k"], e, {type: "keydown",disableInInput: !0});
        a.hotKey.add(document.documentElement, ["."], f, {type: "keydown",disableInInput: !0});
        c.destroy = function() {
            a.hotKey.remove(document.documentElement, ["j"], d, {type: "keydown",disableInInput: !0});
            a.hotKey.remove(document.documentElement, ["k"], e, {type: "keydown",disableInInput: !0});
            a.hotKey.remove(document.documentElement, ["."], f, {type: "keydown",disableInInput: !0})
        };
        return c
    }
});
STK.register("kit.extra.multiLanguage", function(a) {
    window.$LANG || (window.$LANG = {});
    return function(b, c) {
        var d = [];
        d.push(b);
        d.push($LANG);
        for (var e = 2, f = arguments.length; e < f; e += 1)
            d.push(arguments[e]);
        var g = a.core.util.language.apply({}, d);
        g = g.replace(/\\}/ig, "}");
        c && (g = a.templet(g, c));
        return g
    }
});
STK.register("common.feed.feedList.plugins.feedShield", function(a) {
    var b = a.common.feed.feedList.utils, c = a.kit.extra.multiLanguage, d = a.templet, e = a.common.trans.feed, f = {FRAME: '<div style="display:none;position:absolute" node-type="FSLayer" action-type="feed_list_layer" class="layer_menu_list"></div>',SHIELD: {USER: {ITEM: c('<li><a action-type="feed_list_shield_by_user" href="javascript:void(0)" suda-data="#{SUDA_DATA}" action-data="filter_type=1&uid=#{UID}&nickname=#{NICKNAME}&gender=#{GENDER}">#L{屏蔽%s的微博}</a></li>', {}, "#{NICKNAME}"),CONFIRM: c("<span>#L{确认屏蔽}<strong> #{NICKNAME}</strong> #L{的微博吗？}</span>"),SMALLTEXT: c('#L{在“我的首页”将自动屏蔽}#{GENDER}#L{的新微博。}<br />#L{可以在}<a href="http://account.weibo.com/set/feed" target="_blank">#L{帐号设置-隐私设置}</a>#L{中增加或取消屏蔽。}')},MID: {ITEM: c('<li><a action-type="feed_list_shield_by_mid" href="javascript:void(0)"  suda-data="#{SUDA_DATA}" action-data="filter_type=0&mid=#{MID}&justhide=#{JUSTHIDE}">#L{隐藏这条微博}</a></li>'),CONFIRM: c("<span>#L{确认屏蔽} <strong>#{NICKNAME} #L{的微博吗？}</strong></span>"),SMALLTEXT: c('#L{系统将在你的首页自动屏蔽}#{GENDER}#L{的新微博。}<br />#L{可以在}<a href="http://account.weibo.com/set/feed" target="_blank">#L{帐号设置-隐私设置}</a>中设置和取消屏蔽。}')},APP: {ITEM: c('<li><a action-type="feed_list_shield_by_app" href="javascript:void(0)"  suda-data="#{SUDA_DATA}" action-data="filter_type=2&uid=#{UID}&nickname=#{NICKNAME}&mid=#{MID}&appname=#{APPNAME}&gender=#{GENDER}&member_type=#{MEMBERTYPE}">#L{屏蔽来自%s的微博}</a></li>', {}, "#{APPNAME}"),CONFIRM: c("<span>#L{确认屏蔽来自}<strong> #{APPNAME} </strong> #L{的微博吗？}</span><br />"),SMALLTEXT: c('#L{在“我的首页”将自动屏蔽来自它的新微博。}<br />#L{可以在}<a href="http://account.weibo.com/set/feedsource" target="_blank">#L{帐号设置-隐私设置}</a>#L{中取消屏蔽。}'),SMALLTEXTMEMBER: c('#L{您当前为}<a href="http://vip.weibo.com/privilege">#L{微博会员}</a>#L{，}#L{可正常使用屏蔽功能，}<br />#L{可在}<a href="http://account.weibo.com/set/feedsource" target="_blank">#L{帐号设置-隐私设置}</a>#L{中取消屏蔽。}')},KEYWORD: {ITEM: c('<li><a action-type="feed_list_shield_setkeyword" href="javascript:void(0)" suda-data="key=tblog_screen_keyword&value=screen_keyword">#L{屏蔽关键词}</a></li>')}},TIPS: {USER: {USERMAX: {TITLE: c("#L{提示}"),CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{抱歉！你已经屏蔽了5人的微博，不能继续操作了。}</p><p class="S_txt2">#L{但你可以试试下面的办法}</p></dd></dl><div class="btn"><a class="W_btn_b" href="http://account.weibo.com/set/feed"><span>#L{管理我的屏蔽}</span></a><a class="W_btn_a" href="http://vip.weibo.com/paycenter?from=pbyh"><span><em class="W_ico16 ico_member"></em>#L{立即开通会员}</span></a></div>')},MEMBERMAX: {TITLE: c("#L{提示}"),CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{你的屏蔽数已满，等会员升级后再试吧！}</p></dd></dl><div class="btn"><a href="http://vip.weibo.com/privilege"><span>#L{了解更多会员特权}&raquo;</span></a><a action-type="iknow" class="W_btn_d" href="javascript:void(0)"><span>#L{知道了}</span></a></div>')},MEMBERTIMEOUT: {TITLE: c("#L{提示}"),CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{抱歉！你已经屏蔽了太多人的微博，不能继续操作了。}</p><p class="S_txt2">#L{但你可以试试下面的办法}</p></dd></dl><div class="btn"><a class="W_btn_b" href="http://account.weibo.com/set/feed"><span>#L{管理我的屏蔽}</span></a><a class="W_btn_a" href="http://vip.weibo.com/paycenter"><span><em class="W_ico16 ico_member"></em>#L{立即开通会员}</span></a></div>')}},APP: {UNABLE: {TITLE: c("#L{该来源暂时不可屏蔽哦。}"),CONTENT: c('<a href="http://weibo.com/zt/s?k=9286" target="_blank">#L{我要提建议。}</a>')},NOPERISSION: {TITLE: c("#L{提示}"),CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{您还不是微博会员，不能使用此功能！}</p><p class="S_txt2">#L{开通}<a class="S_link2" href="http://vip.weibo.com/paycenter">#L{微博会员}</a>#L{，可屏蔽来自第三方的应用}</p><p class="S_txt2"><a href="http://vip.weibo.com/privilege"><span>#L{了解更多会员特权}&raquo;</span></a></p></dd></dl><div class="btn"><a class="W_btn_b" href="http://account.weibo.com/set/feedsource"><span>#L{管理我的屏蔽}</span></a><a class="W_btn_a" href="http://vip.weibo.com/paycenter?from=pbly"><span><em class="W_ico16 ico_member"></em>#L{立即开通会员}</span></a></div>')},MEMBERTIMEOUT: {TITLE: c("#L{提示}"),CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{您的会员身份已过期，不能使用此功能！}</p><p class="S_txt2">#L{您可以先}<a class="S_link2" href="http://vip.weibo.com/paycenter">#L{开通会员}</a>#L{再来屏蔽第三方应用}</p></dd></dl><div class="btn"><a class="W_btn_b" href="http://account.weibo.com/set/feedsource"><span>#L{管理我的屏蔽}</span></a><a class="W_btn_a" href="http://vip.weibo.com/paycenter"><span><em class="W_ico16 ico_member"></em>#L{立即开通会员}</span></a></div>')}}}};
    return function(c) {
        var g, h;
        if (!c)
            throw "that : need object of the baseFeedList Class";
        var i, j, k = {}, l = c.getNode(), m = c.getDEvent(), n, o, p = {cache: null,dEvt: null,init: function() {
                p.cache = a.ui.dialog({isHold: !0});
                a.addClassName(p.cache.getInner(), "layer_point");
                p.dEvt = a.core.evt.delegatedEvent(p.cache.getInner());
                p.dEvt.add("iknow", "click", p.cache.hide)
            },show: function(a) {
                p.cache.setTitle(a.title);
                p.cache.setContent(a.content);
                p.cache.show();
                p.cache.setMiddle()
            },destroy: function() {
                p.dEvt.destroy();
                p = undefined
            }}, k = {create: function() {
                g = a.kit.dom.parseDOM(a.core.dom.builder(f.FRAME).list).FSLayer;
                a.sizzle("body")[0].appendChild(g);
                o = a.core.evt.delegatedEvent(g);
                o.add("feed_list_shield_by_user", "click", r.user.behavior);
                o.add("feed_list_shield_by_mid", "click", r.mid.behavior);
                o.add("feed_list_shield_by_app", "click", r.app.behavior);
                o.add("feed_list_shield_setkeyword", "click", function() {
                    a.custEvent.fire(c, "setkeyword")
                })
            },toggle: function(a) {
                j = a.el;
                g || k.create();
                if (h === j)
                    if (g.style.display == "none") {
                        k.show();
                        k.setLayerPos()
                    } else
                        k.hide();
                else {
                    i = a.data;
                    k.reDisplay()
                }
            },reDisplay: function() {
                var b = [];
                for (var c in r)
                    b.push(r[c].item());
                g.innerHTML = "<ul>" + b.join("") + "</ul>";
                b = null;
                k.setLayerPos();
                k.show();
                h && (h.className = "W_ico12 icon_choose");
                h && a.setStyle(h, "visibility", "");
                h = j
            },show: function() {
                a.setStyle(j, "visibility", "visible");
                j.className = "W_ico12 icon_chooseup";
                g && a.setStyle(g, "display", "");
                a.addEvent(document.body, "click", k.autoHide)
            },hide: function() {
                a.setStyle(j, "visibility", "");
                j.className = "W_ico12 icon_choose";
                g && a.setStyle(g, "display", "none");
                a.removeEvent(document.body, "click", k.autoHide)
            },setLayerPos: function() {
                var b = a.core.dom.getSize(g), c = a.core.dom.getSize(j), d = a.core.dom.position(j);
                a.setStyle(g, "top", d.t + c.height + "px");
                a.setStyle(g, "left", d.l + c.width - b.width + "px")
            },outLayer: function() {
                n && clearTimeout(n);
                n = window.setTimeout(function() {
                    k.autoHide()
                }, 50)
            },autoHide: function(b) {
                var c = a.core.evt.getEvent(), d = a.fixEvent(c);
                !a.core.dom.contains(g, d.target) && !a.core.dom.contains(j, d.target) && d.target !== j && k.hide()
            },reflushFeedList: function() {
            }}, q = function(c, d, e) {
            var f = b.getFeedNode(d, e);
            f.style.height = f.offsetHeight + "px";
            f.style.overflow = "hidden";
            var g = a.tween(f, {duration: 200,end: function() {
                    f.innerHTML = "";
                    a.removeNode(f);
                    e = d = f = null;
                    g.destroy();
                    c.getFeedCount() < 1 && window.location.reload()
                }}).play({height: 0})
        }, r = {mid: {item: function() {
                    return i.mid ? d(f.SHIELD.MID.ITEM, {MID: i.mid,JUSTHIDE: i.justhide || 0,SUDA_DATA: i.mblogsorttype == "1" ? "key=smart_feed&value=hidden_feed" : ""}) : ""
                },behavior: function(a) {
                    var b = j, c = a.data;
                    c.location = $CONFIG.location;
                    e.getTrans("feedShield", {onComplete: function(a) {
                            a.justhide = c.justhide;
                            r.user.handle(a, b)
                        }}).request(c);
                    k.hide()
                },handle: function(a, b) {
                    s(a, b)
                }},user: {item: function() {
                    return i.uid && i.nickname ? d(f.SHIELD.USER.ITEM, {UID: i.uid,NICKNAME: i.nickname,GENDER: i.gender,SUDA_DATA: i.mblogsorttype == "1" ? "key=smart_feed&value=block_sbsfeed" : ""}) : ""
                },behavior: function(b) {
                    var c = b.data;
                    c.location = $CONFIG.location;
                    var g = j;
                    a.ui.confirm(d(f.SHIELD.USER.CONFIRM, {UID: b.data.uid,NICKNAME: b.data.nickname,GENDER: b.data.gender == "m" ? "他" : "她"}), {textSmall: d(f.SHIELD.USER.SMALLTEXT, {GENDER: b.data.gender == "m" ? "他" : "她"}),OK: function() {
                            e.getTrans("feedShield", {onComplete: function(a) {
                                    r.user.handle(a, g)
                                }}).request(c)
                        }})
                },handle: function(a, b) {
                    s(a, b)
                }},app: {item: function() {
                    return i.uid && i.nickname && i.mid && i.appname && i.isactive && i.isactive == "1" ? d(f.SHIELD.APP.ITEM, {UID: i.uid,NICKNAME: i.nickname,APPNAME: i.appname,MID: i.mid,GENDER: i.gender,SUDA_DATA: i.mblogsorttype == "1" ? "key=smart_feed&value=block_appkey" : "",MEMBERTYPE: i.member_type || 0}) : ""
                },behavior: function(b) {
                    var c = j, g = b.data;
                    g.location = $CONFIG.location;
                    a.ui.confirm(d(f.SHIELD.APP.CONFIRM, {UID: b.data.uid,NICKNAME: b.data.nickname,APPNAME: b.data.appname,GENDER: b.data.gender == "m" ? "他" : "她"}), {textSmall: g.member_type == 1 ? f.SHIELD.APP.SMALLTEXTMEMBER : f.SHIELD.APP.SMALLTEXT,OK: function() {
                            e.getTrans("feedShield", {onComplete: function(a) {
                                    r.user.handle(a, c)
                                }}).request(g)
                        }});
                    k.hide()
                },handle: function(a, b) {
                    s(a, b)
                }},keyword: {item: function() {
                    return d(f.SHIELD.KEYWORD.ITEM)
                }}}, s = function(b, d) {
            var e = "error";
            b.justhide == 1 && (b.code = "100000");
            if (b.code == "100000") {
                e = "succM";
                q(c, d, l)
            } else if (b.code == "100033") {
                if (b.data && b.data.member_type > -1) {
                    var g = {title: f.TIPS.USER.USERMAX.TITLE,content: f.TIPS.USER.USERMAX.CONTENT};
                    switch (b.data.member_type) {
                        case 0:
                            break;
                        case 1:
                            g.content = f.TIPS.USER.MEMBERMAX.CONTENT;
                            break;
                        case 2:
                            g.content = f.TIPS.USER.MEMBERTIMEOUT.CONTENT;
                            break;
                        default:
                    }
                    p.show(g);
                    return
                }
            } else if (b.code == "100035") {
                if (b.data && b.data.member_type > -1) {
                    var g = {title: f.TIPS.APP.NOPERISSION.TITLE,content: f.TIPS.APP.NOPERISSION.CONTENT};
                    switch (b.data.member_type) {
                        case 0:
                            break;
                        case 1:
                            break;
                        case 2:
                            g.content = f.TIPS.APP.MEMBERTIMEOUT.CONTENT;
                            break;
                        default:
                    }
                    p.show(g);
                    return
                }
                a.ui.alert(f.TIPS.APP.UNABLE.TITLE, {type: "warn",textSmall: f.TIPS.APP.UNABLE.COCONTENT})
            } else
                a.ui.litePrompt(b.msg, {type: e,timeout: "1000"})
        }, t = function() {
            m.add("feed_list_shield", "click", k.toggle);
            p.init()
        };
        t();
        k.destroy = function() {
            o.destroy();
            p.destroy();
            h = g = o = p = k = undefined
        };
        return k
    }
});
STK.register("common.depand.mood", function(a) {
    var b = a.kit.extra.require;
    b.register("asyn_share", ["common.dialog.moodComment"], {activeLoad: !0});
    b.register("asyn_smallPublish", ["common.dialog.moodSmallPublish"], {activeLoad: !0});
    b.register("asyn_detail", ["common.dialog.moodList"], {activeLoad: !0});
    return b
});
STK.register("common.trans.mood", function(a) {
    var b = a.kit.io.inter(), c = b.register;
    c("page", {url: "/aj/mood/datelist?_wv=5",method: "get"});
    c("simppublish", {url: "/aj/mood/simppublish?_wv=5",method: "get"});
    c("getMoodFeed", {url: "/aj/mood/getpublish?_wv=5",method: "get"});
    c("publish", {url: "/aj/mood/add?_wv=5",method: "post"});
    c("myfilter", {url: "/aj/mood/friendlist?_wv=5",method: "get"});
    c("myfiltersimp", {url: "/aj/mood/simpfriendlist?_wv=5",method: "get"});
    c("getpublishstate", {url: "/aj/mood/getstate?_wv=5",method: "get"});
    c("closetip", {url: "/aj/bubble/closebubble?_wv=5",method: "get"});
    c("changecollestion", {url: "/aj/mood/getastro?_wv=5",method: "get"});
    return b
});
STK.register("kit.extra.codec", function(a) {
    var b = {encode: function(b) {
            var c = document.createTextNode(b), d = a.C("div");
            d.appendChild(c);
            var e = d.innerHTML;
            d = c = null;
            return e
        },decode: function(a) {
            var b = document.createElement("div");
            b.innerHTML = a;
            var c = b.innerText == undefined ? b.textContent : b.innerText;
            b = null;
            return c
        }};
    return b
});
STK.register("common.feed.feedList.plugins.mood", function(a) {
    var b = a.common.feed.feedList.utils, c = a.common.depand.mood, d = a.kit.extra.language, e = a.kit.extra.codec;
    return function(f, g) {
        if (!f)
            a.log("forward : need object of the baseFeedList Class");
        else {
            g = a.parseParam({}, g);
            var h = f.getNode(), i = {}, j, k, l, m = !1, n = !1, o = !1, p = c.bind("asyn_smallPublish", function(b, c) {
                m = !1;
                if (!j) {
                    j = a.common.dialog.moodSmallPublish();
                    a.custEvent.add(j, "success", function(a, b) {
                    })
                } else
                    j.reset();
                j.show()
            }, {onTimeout: function() {
                    m = !1
                }}), q = c.bind("asyn_detail", function(b, c) {
                o = !1;
                l = a.common.dialog.moodList({trans: a.common.trans.mood,transName: "myfiltersimp"});
                l.show()
            }, {onTimeout: function() {
                    o = !1
                }}), r = c.bind("asyn_share", function(c) {
                n = !1;
                var f = c.data.mid, g = c.data.nickName, i = g + d("#L{的心情}");
                if (a.bLength(i) > 20) {
                    i = e.decode(i);
                    i = e.encode(a.leftB(i, 20)) + "..."
                }
                var l = b.getFeedNode(c.el, h), m = a.kit.dom.parseDOM(a.builder(l).list), o = m.mood_content.value, p = decodeURIComponent(c.data.mood_url), q = c.data.title || "";
                k = a.common.dialog.moodComment({mid: f,title: i,nickName: g,content: o,mood_url: p,mood_title: q});
                a.custEvent.add(j, "success", function(a, b) {
                });
                k.show()
            }, {onTimeout: function() {
                    n = !1
                }}), s = 0;
            f.getDEvent().add("feed_list_pulishMood", "click", function(c) {
                b.preventDefault();
                if (!s) {
                    s = 1;
                    a.common.trans.mood.getTrans("getpublishstate", {onSuccess: function(a, b) {
                            s = 0;
                            var c = parseInt(a.data.published || "0");
                            if (c) {
                                if (o)
                                    return;
                                o = !0;
                                q()
                            } else {
                                if (m)
                                    return;
                                m = !0;
                                p()
                            }
                        },onError: function() {
                            s = 0
                        },onFail: function() {
                            s = 0
                        }}).request()
                }
            });
            f.getDEvent().add("feed_list_shareMood", "click", function(a) {
                b.preventDefault();
                if (!n) {
                    n = !0;
                    r(a)
                }
            });
            i.destroy = function() {
                if (j) {
                    a.custEvent.remove(j);
                    j.destroy && j.destroy();
                    j = null
                }
                if (k) {
                    a.custEvent.remove(k);
                    k.destroy && k.destroy();
                    k = null
                }
                if (l) {
                    l.destroy && l.destroy();
                    l = null
                }
                l = k = j = f = h = null
            };
            return i
        }
    }
});
STK.register("common.trans.attitude", function(a) {
    var b = a.kit.io.inter(), c = b.register;
    c("feedSmall", {url: "/aj/attitude/small?_wv=5",method: "get"});
    c("add", {url: "/aj/attitude/add?_wv=5",method: "post"});
    c("big", {url: "/aj/attitude/big?_wv=5",method: "get"});
    c("in", {url: "/aj/attitude/in?_wv=5",method: "get"});
    c("del", {url: "/aj/attitude/destroy?_wv=5",method: "get"});
    c("miniadd", {url: "/aj/like/add?_wv=5",method: "post"});
    c("minismall", {url: "/aj/like/small?_wv=5",method: "get"});
    c("likein", {url: "/aj/like/in?_wv=5",method: "get"});
    c("likebig", {url: "/aj/like/big?_wv=5",method: "get"});
    c("minidel", {url: "/aj/like/del?_wv=5",method: "post"});
    return b
});
STK.register("common.feed.feedList.plugins.attitudeMini", function(a) {
    return function(b) {
        var c = a.common.trans.attitude, d = b.getNode(), e = !1, f, g = {}, h = [], i = a.common.feed.feedList.utils, j = b.getDEvent(), k, l = !0, m = [], n = {}, o, p, q, r = 600, s = 350, t = '<div class="W_layer" style="left: 670.5px; top: 2580px; display:none;" node-type="outer"> <div class="bg"><table border="0" cellspacing="0" cellpadding="0"> <tbody><tr><td> <div class="content layer_emotion" node-type="inner"><ul class="emotion_list clearfix" node-type="faceList"></ul> </div></td></tr></tbody></table><div class="arrow arrow_t"></div></div></div>';
        f = a.kit.dom.parseDOM(a.builder(t).list);
        document.body.appendChild(f.outer);
        p = a.delegatedEvent(f.outer);
        var u, v, w = {go: function(b) {
                v = b.el;
                u = parseInt(v.innerHTML.replace(/^.*\((\d+)\)$/, "$1")) || 0;
                e = !0;
                if (a.core.dom.contains(b.el, b.evt.relatedTarget) || f && f.outer.style.display != "none" && b.data.mid == o)
                    y();
                else {
                    w.stop(b, !0);
                    q = setTimeout(function() {
                        w.trans(b)
                    }, r)
                }
            },fill: function(b) {
                if (!!l) {
                    l = !1;
                    var d = a.core.json.merge(b.data, {location: $CONFIG.location});
                    c.getTrans("miniadd", {onSuccess: function(c) {
                            u = parseInt(v.innerHTML.replace(/^.*\((\d+)\)$/, "$1")) || 0;
                            var d = a.sizzle("em", b.el)[0], e = c.data.is_del ? !0 : !1, g = "W_ico20 icon_praised_b" + (e ? "" : "c");
                            e ? u > 0 && u-- : u++;
                            b.el.innerHTML = '<em class="' + g + '"></em>(' + u + ")";
                            if (!e && c.data.html && f) {
                                k && (k.style.display = "none");
                                b.el.title = a.kit.extra.language("#L{取消赞}");
                                a.insertHTML(f.faceList, c.data.html, "afterbegin")
                            } else {
                                b.el.title = a.kit.extra.language("#L{赞}");
                                a.removeNode(a.sizzle('[uid="' + $CONFIG.uid + '"]', f.faceList)[0]);
                                k && (k.style.display = "");
                                a.sizzle("[uid]", f.faceList).length <= 0 && w.stop(b, !0)
                            }
                            var h = a.sizzle('[node-type="faceMore"]', f.faceList)[0];
                            u > 4 ? h && h.style.display == "none" && (h.style.display = "") : h && h.style.display != "none" && (h.style.display = "none");
                            l = !0
                        },onFail: function(b) {
                            a.ui.alert(b.msg);
                            l = !0
                        },onError: function(b) {
                            a.ui.alert(b.msg);
                            l = !0
                        }}).request(d)
                }
            },trans: function(b) {
                if (f && o && f.mid == o && f.mid == b.data.mid) {
                    if (f.outer.style.display == "none" && a.sizzle("[uid]", f.outer).length) {
                        var e = a.position(b.el);
                        f.outer.style.display = "";
                        a.setXY(f.outer, {t: e.t + b.el.offsetHeight + 6,l: e.l + b.el.offsetWidth / 2 - 36})
                    }
                } else {
                    f && f.outer && (f.outer.style.display = "none");
                    c.getTrans("minismall", {onSuccess: function(c) {
                            y();
                            u = c.data.total_number;
                            o = b.data.mid;
                            b.el && (b.el.innerHTML = b.el.innerHTML.replace(/\((.*?)\)/m, "") + (c.data.total_number ? "(" + c.data.total_number + ")" : ""));
                            if (c.data.total_number != "0") {
                                var d = a.kit.dom.parseDOM(a.builder(c.data.html).list);
                                f.faceList.innerHTML = d.faceList.innerHTML;
                                var e = a.sizzle("[uid]", f.faceList);
                                a.sizzle('[uid="' + $CONFIG.uid + '"]', f.faceList)[0] || (k = e[3]);
                                f.mid = b.data.mid;
                                document.body.appendChild(f.outer);
                                f.outer.style.display = "";
                                var g = a.position(b.el);
                                a.setXY(f.outer, {t: g.t + b.el.offsetHeight + 6,l: g.l + b.el.offsetWidth / 2 - 36});
                                w.checkPosition(b.el)
                            }
                        },onFail: function() {
                        },onError: function() {
                        }}).request({mid: i.getMid(b.el, d),location: $CONFIG.location})
                }
            },stop: function(a, b) {
                e = !1;
                if (b)
                    x();
                else {
                    y();
                    h.push(setTimeout(x, s))
                }
            },checkPosition: function(b) {
                n = a.position(f.outer);
                clearInterval(m);
                m = setInterval(function() {
                    var c = a.position(b);
                    (n.l != parseInt(c.l + b.offsetWidth / 2 - 36) || n.t != parseInt(c.t + b.offsetHeight + 6)) && w.stop()
                }, 500)
            },cancelLike: function(b) {
                a.preventDefault();
                u--;
                a.removeNode(a.core.dom.neighbor(b.el).parent("li").getCurrent());
                v.title = a.kit.extra.language("#L{赞}");
                v.innerHTML = '<em class="W_ico20 icon_praised_b"></em>(' + u + ")";
                k && (k.style.display = "");
                a.sizzle("[uid]", f.faceList).length <= 0 && (f.outer.style.display = "none");
                c.getTrans("minidel", {onSuccess: a.core.func.empty,onError: a.core.func.empty}).request(b.data)
            }}, x = function() {
            clearTimeout(q);
            y();
            clearInterval(m);
            f && (f.outer.style.display = "none");
            n = undefined
        }, y = function() {
            while (h.length)
                clearTimeout(h.pop())
        }, z = function() {
            j.add("feed_list_like", "mouseover", w.go);
            j.add("feed_list_like", "click", w.fill);
            j.add("feed_list_like", "mouseout", w.stop);
            p.add("like_del", "click", w.cancelLike)
        }, A = function() {
            z();
            a.addEvent(f.outer, "mouseover", function() {
                clearTimeout(h)
            });
            a.addEvent(f.outer, "mouseout", function() {
                w.stop()
            })
        };
        A();
        g.destroy = function() {
            j.remove("feed_list_like", "mouseover", w.go);
            j.remove("feed_list_like", "click", w.fill);
            j.remove("feed_list_like", "mouseout", w.stop);
            p.destroy();
            a.removeEvent(f.outer, "mouseover");
            a.removeEvent(f.outer, "mouseout")
        };
        return g
    }
});
STK.register("common.trans.setting", function(a) {
    var b = a.kit.io.inter(), c = b.register;
    c("checkNick", {url: "/ajax/relation/checkNick",method: "post"});
    c("baseInfo", {url: "/ajax/relation/baseInfo",method: "post"});
    c("changeEmail", {url: "/ajax/relation/changeEmail",method: "post"});
    c("changePwd", {url: "/ajax/relation/changePwd",method: "post"});
    c("receivingInfo", {url: "/ajax/relation/receivingInfo",method: "post"});
    c("changeDomain", {url: "/ajax/settings/changedomain",method: "post"});
    c("addTags", {url: "/t4/home/_html/common/data/addTags.js",method: "post"});
    c("delTag", {url: "/t4/home/_html/common/data/delTag.js",method: "post"});
    c("tagList", {url: "/t4/home/_html/common/data/tagList.js",method: "get"});
    c("addTagsLayerSubmit", {url: "/aj/tags/addtags?_wv=5",method: "post"});
    c("medalCard", {url: "/aj/badge/card?_wv=5",method: "get"});
    c("darenCard", {url: "/aj/club/card?_wv=5",method: "get"});
    c("getDarenCard", {url: "/aj/badge/card?_wv=5",method: "get"});
    c("levelCard", {url: "/aj/user/rankdetail?_wv=5",method: "get"});
    c("creditCard", {url: "/aj/credit/card?_wv=5",method: "get"});
    c("privateSetting", {url: "/aj/account/setatmeprivacy?_wv=5",method: "post"});
    c("privateNoMore", {url: "/aj/bubble/closebubble?_wv=5",method: "get"});
    c("privateGroupInfo", {url: "/Aj/User/Setsendme?_wv=5",method: "get"});
    return b
});
STK.register("comp.guide.smartSortGuide", function(a) {
    var b = {LAYER: '<div class="W_layer" style="position: absolute; clear: both; overflow: hidden; z-index: 10003; visibility: visible; display: none;" node-type="outer"><div node-type="inner"></div></div>'};
    return function(c, d) {
        var e = a.sizzle('[node-type="smartSortSelect"]')[0];
        if (!a.isNode(e))
            throw "SmartSortGuide say: I need a target!";
        var f = {}, g = a.ui.mod.layer(b.LAYER), h, i, j = [], k = {}, l = 0, m = 0, n, o, p = [{x: -422,y: -55}, {x: -515,y: -120}, {x: -408,y: 24}, {x: -435,y: 24}], q = {init: function() {
                q.parseDom();
                q.bind();
                q.start()
            },bind: function() {
                h = a.core.evt.delegatedEvent(i.inner);
                h.add("next", "click", q.next);
                h.add("close", "click", q.close);
                h.add("end", "click", q.end);
                a.custEvent.define(f, ["end", "close"])
            },parseParam: function() {
                k = a.parseParam(k, d)
            },parseDom: function() {
                g.html("");
                g.appendChild(c);
                i = a.kit.dom.parseDOM(a.builder(c).list);
                i.outer = g.getOuter();
                i.inner = g.getInner();
                a.setStyle(c, "display", "");
                n = a.core.dom.position(e);
                q.step.init()
            },step: {init: function() {
                    if (i.step) {
                        a.isNode(i.step) && (i.step = [i.step]);
                        l = i.step.length;
                        a.setStyles(i.step, "display", "none")
                    }
                },start: function() {
                    l > 0 && q.step.display(m)
                },display: function(b) {
                    o && a.setStyle(o, "display", "none");
                    var c = i.step[b], d = a.core.dom.getSize(c);
                    a.setStyle(c, "display", "");
                    a.setStyle(i.outer, "width", d.width + "px");
                    a.setStyle(i.outer, "height", d.height + "px");
                    a.setStyle(i.outer, "top", n.t + p[b].y + "px");
                    a.setStyle(i.outer, "left", n.l + p[b].x + "px");
                    o = c
                },next: function() {
                    q.step.display(++m)
                }},start: function() {
                a.contains(document.body, i.outer) || document.body.appendChild(i.outer);
                g.show();
                a.ui.mod.mask.showUnderNode(i.outer);
                q.step.start()
            },next: function(b) {
                q.step.next();
                return a.preventDefault(b.evt)
            },close: function(b) {
                a.ui.mod.mask.hide();
                a.custEvent.fire(f, "close");
                q.destroy();
                return a.preventDefault(b.evt)
            },end: function(b) {
                a.ui.mod.mask.hide();
                a.custEvent.fire(f, "end");
                q.destroy();
                return a.preventDefault(b.evt)
            },destroy: function() {
                h.destroy();
                a.custEvent.undefine(f);
                a.core.dom.removeNode(i.outer);
                f = q = h = g = p = undefined
            }};
        q.init();
        f.destroy = q.destroy;
        return f
    }
});
STK.register("common.feed.feedList.plugins.smartSort", function(a) {
    var b = a.common.feed.feedList.utils, c = a.kit.extra.language, d = {EXPENDOM: c('<a action-type="feed_list_smartCollect" href="javascript:void(0);"><span class="txt">#L{收起}</span><span class="W_arrow"><em class="up">◆</em></span></a>'),COLLECTDOM: c('<a action-type="feed_list_smartExpend" href="javascript:void(0);"><span class="txt">#L{展开}</span><span class="W_arrow"><em class="down">◆</em></span></a>')};
    return function(c) {
        if (!c)
            a.log("favorite : need object of the baseFeedList Class");
        else {
            var e = c.getNode(), f = c.getDEvent(), g, h, i = 5, j = {init: function() {
                    j.bind();
                    j.accessGuideAndPlay()
                },bind: function() {
                    f.add("feed_list_smartCollect", "click", function(a) {
                        j.smartFeedToggle(a, 1)
                    });
                    f.add("feed_list_smartExpend", "click", function(a) {
                        j.smartFeedToggle(a, 0)
                    });
                    f.add("feed_list_smartSortTipClose", "click", j.smartSortTipClose);
                    f.add("feed_list_goToSmart", "click", j.goToSmartSort);
                    f.add("feed_list_smartSortGuide", "click", j.smartSortGuide);
                    a.custEvent.add(c, "updateFeed", j.smartSortGuide)
                },smartSortTipClose: function(a) {
                    j.noDisturb(a.data);
                    c.clearNewBar()
                },goToSmartSort: function(d) {
                    j.noDisturb(d.data);
                    c.clearNewBar();
                    a.custEvent.fire(c, "smartSort");
                    return b.preventDefault(d.evt)
                },noDisturb: function(b) {
                    b.bubbletype > -1 && a.common.trans.setting.request("privateNoMore", {}, b)
                },smartFeedToggle: function(c, f) {
                    mid = b.getMid(c.el, e), feedNode = b.getFeedNode(c.el, e);
                    var g = a.sizzle("[node-type='feed_list_smartTools']", feedNode)[0], h = a.sizzle("[node-type='feed_list_smartContent']", feedNode)[0];
                    h && (h.style.display = f ? "none" : "");
                    g && (g.innerHTML = f ? d.COLLECTDOM : d.EXPENDOM);
                    return b.preventDefault(c.evt)
                },smartSortGuide: function(b) {
                    var d = a.sizzle('[node-type="smartSortGuide"]')[0], e = a.sizzle('[node-type="smartSort"]')[0];
                    if (d) {
                        j.stopAccess();
                        g = a.comp.guide.smartSortGuide(d, e);
                        a.custEvent.add(g, "end", function() {
                            j.noDisturb({bubbletype: 27});
                            c.clearNewBar();
                            a.custEvent.fire(c, "smartSort")
                        });
                        a.custEvent.add(g, "deny", function() {
                            j.noDisturb({bubbletype: 27});
                            c.clearNewBar();
                            a.custEvent.fire(c, "smartBackHome")
                        });
                        a.custEvent.add(g, "close", function() {
                            j.noDisturb({bubbletype: 27});
                            c.clearNewBar()
                        })
                    }
                    i > 0 ? i-- : j.stopAccess()
                },accessGuideAndPlay: function() {
                    i = 5;
                    j.stopAccess();
                    h = setInterval(j.smartSortGuide, 2e3)
                },stopAccess: function() {
                    h && clearInterval(h)
                },destroy: function() {
                    g && g.destroy();
                    j.stopAccess();
                    g = j = undefined
                }};
            j.init();
            return {destroy: j.destroy}
        }
    }
});
STK.register("common.feed.feedList.plugins.activityShield", function(a) {
    var b = a.common.feed.feedList.utils, c = a.kit.extra.language, d = a.templet, e = a.common.trans.feed, f = {FRAME: '<div style="display:none;position:absolute" node-type="FSLayer" action-type="feed_list_layer" class="layer_menu_list"></div>',SHIELD: {USER: {ITEM: c('<li><a action-type="activity_list_shield_by_user" href="javascript:void(0)" suda-data="#{SUDA_DATA}" action-data="filter_type=1&uid=#{UID}&nickname=#{NICKNAME}&gender=#{GENDER}">#L{屏蔽} #{NICKNAME} #L{的微博}</a></li>'),CONFIRM: c("<span>#L{确认屏蔽}<strong> #{NICKNAME}</strong> #L{的微博吗？}</span>"),SMALLTEXT: c('#L{在“我的首页”将自动屏蔽}#{GENDER}#L{的新微博。}<br />#L{可以在}<a href="http://account.weibo.com/set/feed" target="_blank">#L{帐号设置-隐私设置}</a>#L{中增加或取消屏蔽。}')},ACT_ID: {ITEM: c('<li><a action-type="activity_list_shield_by_mid" href="javascript:void(0)"  suda-data="#{SUDA_DATA}" action-data="filter_type=0&act_id=#{ACT_ID}&uid=#{UID}">#L{隐藏这条动态}</a></li>'),CONFIRM: c("<span>#L{确认屏蔽} <strong>#{NICKNAME} #L{的动态吗？}</strong></span>"),SMALLTEXT: c('#L{系统将在你的首页自动屏蔽}#{GENDER}#L{的新动态。}<br />#L{可以在}<a href="http://account.weibo.com/set/feed" target="_blank">#L{帐号设置-隐私设置}</a>中设置和取消屏蔽。}')},APP: {ITEM: c('<li><a action-type="activity_list_shield_by_app" href="javascript:void(0)"  suda-data="#{SUDA_DATA}" action-data="filter_type=2&uid=#{UID}&nickname=#{NICKNAME}&act_id=#{ACT_ID}&appname=#{APPNAME}&gender=#{GENDER}&member_type=#{MEMBERTYPE}">#L{屏蔽来自} #{APPNAME} #L{的微博}</a></li>'),CONFIRM: c("<span>#L{确认屏蔽来自}<strong> #{APPNAME} </strong> #L{的微博吗？}</span><br />"),SMALLTEXT: c('#L{在“我的首页”将自动屏蔽来自它的新微博。}<br />#L{可以在}<a href="http://account.weibo.com/set/feedsource" target="_blank">#L{帐号设置-隐私设置}</a>#L{中取消屏蔽。}'),SMALLTEXTMEMBER: c('#L{您当前为}<a href="http://vip.weibo.com/privilege">#L{微博会员}</a>#L{，}#L{可正常使用屏蔽功能，}<br />#L{可在}<a href="http://account.weibo.com/set/feedsource" target="_blank">#L{帐号设置-隐私设置}</a>#L{中取消屏蔽。}')}},TIPS: {USER: {USERMAX: {TITLE: c("#L{提示}"),CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{抱歉！你已经屏蔽了5人的微博，不能继续操作了。}</p><p class="S_txt2">#L{但你可以试试下面的办法}</p></dd></dl><div class="btn"><a class="W_btn_b" href="http://account.weibo.com/set/feed"><span>#L{管理我的屏蔽}</span></a><a class="W_btn_i" href="http://vip.weibo.com/paycenter"><span><img src="' + $CONFIG.imgPath + "style/images/common/transparent.gif?version=" + $CONFIG.version + '" alt="" class="ico_member">#L{立即开通会员}</span></a></div>')},MEMBERMAX: {TITLE: c("#L{提示}"),CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{你的屏蔽数已满，等会员升级后再试吧！}</p></dd></dl><div class="btn"><a href="http://vip.weibo.com/privilege"><span>#L{了解更多会员特权}&raquo;</span></a><a action-type="iknow" class="W_btn_d" href="javascript:void(0)"><span>#L{知道了}</span></a></div>')},MEMBERTIMEOUT: {TITLE: c("#L{提示}"),CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{抱歉！你已经屏蔽了太多人的微博，不能继续操作了。}</p><p class="S_txt2">#L{但你可以试试下面的办法}</p></dd></dl><div class="btn"><a class="W_btn_b" href="http://account.weibo.com/set/feed"><span>#L{管理我的屏蔽}</span></a><a class="W_btn_i" href="http://vip.weibo.com/paycenter"><span><img src="' + $CONFIG.imgPath + "style/images/common/transparent.gif?version=" + $CONFIG.version + '" alt="" class="ico_member">#L{立即开通会员}</span></a></div>')}},APP: {UNABLE: {TITLE: c("#L{该来源暂时不可屏蔽哦。}"),CONTENT: c('<a href="http://weibo.com/zt/s?k=9286" target="_blank">#L{我要提建议。}</a>')},NOPERISSION: {TITLE: c("#L{提示}"),CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{您还不是微博会员，不能使用此功能！}</p><p class="S_txt2">#L{开通}<a class="S_link2" href="http://vip.weibo.com/paycenter">#L{微博会员}</a>#L{，可屏蔽来自第三方的应用}</p><p class="S_txt2"><a href="http://vip.weibo.com/privilege"><span>#L{了解更多会员特权}&raquo;</span></a></p></dd></dl><div class="btn"><a class="W_btn_b" href="http://account.weibo.com/set/feedsource"><span>#L{管理我的屏蔽}</span></a><a class="W_btn_i" href="http://vip.weibo.com/paycenter"><span><img src="' + $CONFIG.imgPath + "style/images/common/transparent.gif?version=" + $CONFIG.version + '" alt="" class="ico_member">#L{立即开通会员}</span></a></div>')},MEMBERTIMEOUT: {TITLE: c("#L{提示}"),CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{您的会员身份已过期，不能使用此功能！}</p><p class="S_txt2">#L{您可以先}<a class="S_link2" href="http://vip.weibo.com/paycenter">#L{开通会员}</a>#L{再来屏蔽第三方应用}</p></dd></dl><div class="btn"><a class="W_btn_b" href="http://account.weibo.com/set/feedsource"><span>#L{管理我的屏蔽}</span></a><a class="W_btn_i" href="http://vip.weibo.com/paycenter"><span><img src="' + $CONFIG.imgPath + "style/images/common/transparent.gif?version=" + $CONFIG.version + '" alt="" class="ico_member">#L{立即开通会员}</span></a></div>')}}}}, g, h;
    return function(i) {
        if (!i)
            throw "that : need object of the baseFeedList Class";
        var j, k, l = {}, m = i.getNode(), n = i.getDEvent(), o, p, q = {cache: null,dEvt: null,init: function() {
                q.cache = a.ui.dialog({isHold: !0});
                a.addClassName(q.cache.getInner(), "layer_point");
                q.dEvt = a.core.evt.delegatedEvent(q.cache.getInner());
                q.dEvt.add("iknow", "click", q.cache.hide)
            },show: function(a) {
                q.cache.setTitle(a.title);
                q.cache.setContent(a.content);
                q.cache.show();
                q.cache.setMiddle()
            },destroy: function() {
                q && q.dEvt && q.dEvt.destroy();
                q.cache = null;
                q = undefined
            }}, l = {create: function() {
                g = a.kit.dom.parseDOM(a.core.dom.builder(f.FRAME).list).FSLayer;
                a.sizzle("body")[0].appendChild(g);
                p = a.core.evt.delegatedEvent(g);
                p.add("activity_list_shield_by_user", "click", s.user.behavior);
                p.add("activity_list_shield_by_mid", "click", s.actId.behavior);
                p.add("activity_list_delete", "click", s.actId.my_behavior);
                p.add("activity_list_shield_by_app", "click", s.app.behavior)
            },toggle: function(a) {
                k = a.el;
                g || l.create();
                if (h === k)
                    if (g.style.display == "none") {
                        l.show();
                        l.setLayerPos()
                    } else
                        l.hide();
                else {
                    j = a.data;
                    l.reDisplay()
                }
            },reDisplay: function() {
                var b = [];
                for (var c in s)
                    b.push(s[c].item());
                g.innerHTML = "<ul>" + b.join("") + "</ul>";
                b = null;
                l.setLayerPos();
                l.show();
                h && a.setStyle(h, "visibility", "");
                h = k
            },show: function() {
                a.setStyle(k, "visibility", "visible");
                g && a.setStyle(g, "display", "");
                a.addEvent(document.body, "click", l.autoHide)
            },hide: function() {
                a.setStyle(k, "visibility", "");
                g && a.setStyle(g, "display", "none");
                a.removeEvent(document.body, "click", l.autoHide)
            },setLayerPos: function() {
                var b = a.core.dom.getSize(g), c = a.core.dom.getSize(k), d = a.core.dom.position(k);
                a.setStyle(g, "top", d.t + c.height + "px");
                a.setStyle(g, "left", d.l + c.width - b.width + "px")
            },outLayer: function() {
                o && clearTimeout(o);
                o = window.setTimeout(function() {
                    l.autoHide()
                }, 50)
            },autoHide: function(b) {
                var c = a.core.evt.getEvent(), d = a.fixEvent(c);
                !a.core.dom.contains(g, d.target) && !a.core.dom.contains(k, d.target) && d.target !== k && l.hide()
            },reflushFeedList: function() {
            }}, r = function(c, d, e) {
            var f = b.getFeedNode(d, e);
            f.style.height = f.offsetHeight + "px";
            f.style.overflow = "hidden";
            var g = a.tween(f, {duration: 200,end: function() {
                    f.innerHTML = "";
                    a.removeNode(f);
                    e = d = f = null;
                    g.destroy();
                    c.getFeedCount() < 1 && window.location.reload()
                }}).play({height: 0})
        }, s = {actId: {item: function() {
                    if (j.act_id) {
                        var a = "", b = f.SHIELD.ACT_ID.ITEM;
                        j.cuid == j.uid && (b = c("<li>" + (j.count_obj <= 1 ? '<a action-type="activity_list_delete" href="javascript:void(0)"  suda-data="" action-data="filter_type=0&act_id=#{ACT_ID}&uid=#{UID}">#L{删除这条动态}</a>' : "") + '<a target="_blank" href="http://app.weibo.com/myaction?refer=single_feed">#L{动态隐私设置}</a></li>'));
                        return d(b, {ACT_ID: j.act_id,UID: j.uid})
                    }
                    return ""
                },behavior: function(a) {
                    var b = k, c = a.data;
                    c.location = $CONFIG.location;
                    e.getTrans("activityShield", {onComplete: function(a) {
                            s.user.handle(a, b)
                        }}).request(c);
                    l.hide()
                },my_behavior: function(b) {
                    var d = k, f = b.data;
                    a.ui.confirm(c("#L{确认要删除这条动态吗？}"), {OK: function() {
                            e.getTrans("activityDelete", {onComplete: function(a) {
                                    t(a, d);
                                    l.hide()
                                }}).request(f)
                        }})
                },handle: function(a, b) {
                    t(a, b)
                }},user: {item: function() {
                    return j.uid && j.nickname ? d(f.SHIELD.USER.ITEM, {ACT_ID: j.act_id,NICKNAME: j.nickname,GENDER: j.gender,SUDA_DATA: j.mblogsorttype == "1" ? "key=smart_feed&value=block_sbsfeed" : ""}) : ""
                },behavior: function(b) {
                    var c = b.data;
                    c.location = $CONFIG.location;
                    var g = k;
                    a.ui.confirm(d(f.SHIELD.USER.CONFIRM, {UID: b.data.uid,NICKNAME: b.data.nickname,GENDER: b.data.gender == "m" ? "他" : "她"}), {textSmall: d(f.SHIELD.USER.SMALLTEXT, {GENDER: b.data.gender == "m" ? "他" : "她"}),OK: function() {
                            e.getTrans("activityShield", {onComplete: function(a) {
                                    s.user.handle(a, g)
                                }}).request(c)
                        }})
                },handle: function(a, b) {
                    t(a, b)
                }},app: {item: function() {
                    return j.uid && j.nickname && j.mid && j.appname && j.isactive && j.isactive == "1" ? d(f.SHIELD.APP.ITEM, {UID: j.uid,NICKNAME: j.nickname,APPNAME: j.appname,ACT_ID: j.act_id,GENDER: j.gender,SUDA_DATA: j.mblogsorttype == "1" ? "key=smart_feed&value=block_appkey" : "",MEMBERTYPE: j.member_type || 0}) : ""
                },behavior: function(b) {
                    var c = k, g = b.data;
                    g.location = $CONFIG.location;
                    a.ui.confirm(d(f.SHIELD.APP.CONFIRM, {UID: b.data.uid,NICKNAME: b.data.nickname,APPNAME: b.data.appname,GENDER: b.data.gender == "m" ? "他" : "她"}), {textSmall: g.member_type == 1 ? f.SHIELD.APP.SMALLTEXTMEMBER : f.SHIELD.APP.SMALLTEXT,OK: function() {
                            e.getTrans("activityShield", {onComplete: function(a) {
                                    s.user.handle(a, c)
                                }}).request(g)
                        }});
                    l.hide()
                },handle: function(a, b) {
                    t(a, b)
                }}}, t = function(b, c) {
            var d = "error";
            if (b.code == "100000") {
                d = "succM";
                r(i, c, m)
            } else if (b.code == "100033") {
                if (b.data && b.data.member_type > -1) {
                    var e = {title: f.TIPS.USER.USERMAX.TITLE,content: f.TIPS.USER.USERMAX.CONTENT};
                    switch (b.data.member_type) {
                        case 0:
                            break;
                        case 1:
                            e.content = f.TIPS.USER.MEMBERMAX.CONTENT;
                            break;
                        case 2:
                            e.content = f.TIPS.USER.MEMBERTIMEOUT.CONTENT;
                            break;
                        default:
                    }
                    q.show(e);
                    return
                }
            } else if (b.code == "100035") {
                if (b.data && b.data.member_type > -1) {
                    var e = {title: f.TIPS.APP.NOPERISSION.TITLE,content: f.TIPS.APP.NOPERISSION.CONTENT};
                    switch (b.data.member_type) {
                        case 0:
                            break;
                        case 1:
                            break;
                        case 2:
                            e.content = f.TIPS.APP.MEMBERTIMEOUT.CONTENT;
                            break;
                        default:
                    }
                    q.show(e);
                    return
                }
                a.ui.alert(f.TIPS.APP.UNABLE.TITLE, {type: "warn",textSmall: f.TIPS.APP.UNABLE.COCONTENT})
            } else
                a.ui.litePrompt(b.msg, {type: d,timeout: "1000"})
        }, u = function() {
            n.add("activity_list_shield", "click", l.toggle);
            q.init()
        };
        u();
        l.destroy = function() {
            p && p.destroy();
            q && q.destroy();
            p = q = l = undefined;
            g = null;
            h = null
        };
        return l
    }
});
STK.register("common.channel.relation", function(a) {
    var b = ["follow", "unFollow", "removeFans", "block", "unBlock", "addFriends", "removeFriends", "updateRemark"];
    return a.common.listener.define("common.channel.relation", b)
});
STK.register("common.trans.relation", function(a) {
    var b = a.kit.io.inter(), c = b.register;
    c("recommendfollow", {url: "/aj/f/recomafterfollow?_wv=5",method: "get"});
    c("closerecommend", {url: "/aj/f/closerecommend?_wv=5",method: "get"});
    c("newuserguide", {url: "/aj/user/interest/newuserguide?_wv=5",method: "get"});
    c("mayinterested", {url: "/aj/user/interest/list?_wv=5",method: "get"});
    c("uninterested", {url: "/aj/user/interest/uninterested?_wv=5",method: "post"});
    c("userCard", {url: "/aj/user/cardv5?_wv=5",method: "get"});
    c("follow", {url: "/aj/f/followed?_wv=5",method: "post"});
    c("unFollow", {url: "/aj/f/unfollow?_wv=5",method: "post"});
    c("follow_register", {url: "/nguide/aj/relation/followed?_wv=5",method: "post"});
    c("unfollow_register", {url: "/nguide/aj/relation/unfollow?_wv=5",method: "post"});
    c("block", {url: "/aj/f/addblack?_wv=5",method: "post"});
    c("unBlock", {url: "/aj/f/delblack?_wv=5",method: "post"});
    c("removeFans", {url: "/aj/f/remove?_wv=5",method: "post"});
    c("requestFollow", {url: "/ajax/relation/requestfollow?_wv=5",method: "post"});
    c("questions", {url: "/aj/invite/attlimit?_wv=5",method: "get"});
    c("answer", {url: "/aj/invite/att?_wv=5",method: "post"});
    c("setRemark", {url: "/aj/f/remarkname?_wv=5",method: "post"});
    c("recommendusers", {url: "/aj/f/recommendusers?_wv=5",method: "get"});
    c("recommendAttUsers", {url: "/aj/f/worthfollowusers?_wv=5",method: "get"});
    c("recommendPopularUsers", {url: "/aj/user/interest/recommendpopularusers?_wv=5",method: "get"});
    c("mayinterestedweiqun", {url: "/aj/weiqun/getinterestedlist?_wv=5",method: "get"});
    c("moreData", {url: "/aj/f/listuserdetail?_wv=5",method: "get"});
    c("getInvite", {url: "/aj/invite/unread?_wv=5",method: "get"});
    c("quiet_addUser", {url: "/aj/f/addwhisper?_wv=5",method: "post"});
    c("quiet_removeUser", {url: "/aj/f/delwhisper?_wv=5",method: "post"});
    c("quiet_know", {url: "/aj/tipsbar/closetipsbar?_wv=5",method: "post"});
    c("groupUserList", {url: "/aj/f/group/getgroupmembers?_wv=5",method: "get"});
    c("smart_sort", {url: "/aj/mblog/mblogcard?_wv=5",method: "post"});
    c("groupSubmit", {url: "/aj/f/group/list?_wv=5",method: "get"});
    c("wqList", {url: "/aj/proxy?api=http://recom.i.t.sina.com.cn/1/weiqun/weiqun_may_interest.php",method: "get"});
    c("uninterestedWq", {url: "/aj/proxy?api=http://recom.i.t.sina.com.cn/1/weiqun/weiqun_uninterest.php",method: "get"});
    c("inviteNeglect", {url: "/aj/invite/handleinvite?_wv=5",method: "post"});
    c("checkNeglect", {url: "/aj/invite/shieldedlist?_wv=5",method: "post"});
    c("inviteLift", {url: "/aj/invite/lift?_wv=5",method: "post"});
    c("inviteAccept", {url: "/aj/invite/handleinvite?_wv=5",method: "post"});
    c("searchByTel", {url: "/aj/relation/getuserbymobile?_wv=5",method: "post"});
    c("inviteCloseTips", {url: "/aj/invite/closetips?_wv=5",method: "post"});
    c("checkrelation", {url: "/aj/f/checkrelation?_wv=5",method: "post"});
    c("addCloseFriend", {url: "/aj/f/createclosefriend?_wv=5",method: "post"});
    c("removeClsFrd", {url: "/aj/f/removeclosefriend?_wv=5",method: "post"});
    c("cfInviteUnread", {url: "/aj/invite/unread?_wv=5",method: "get"});
    c("recommendCf", {url: "/aj/user/closefriend/recommend?_wv=5",method: "get"});
    c("clearInvalidUsers", {url: "/aj/f/clearinvalidfriends?_wv=5",method: "post"});
    c("unIstCf", {url: "/aj/user/closefriend/deny?_wv=5",method: "post"});
    c("checkcloserelation", {url: "/aj/f/checkcloserelation?_wv=5",method: "post"});
    c("closeunfollow", {url: "/aj/profile/closeunfollow?_wv=5",method: "post"});
    c("fanslikemore", {url: "/aj/relation/fanslikemore?_wv=5",method: "get"});
    c("getProfileInfo", {url: "/aj/relation/getprofileinfo?_wv=5",method: "get"});
    c("interestlist", {url: "/aj/user/interest/profileinfo?_wv=5",method: "get"});
    c("recommendGroupMember", {url: "/aj/user/group/recommend?_wv=5",method: "get"});
    return b
});
STK.register("common.relation.followPrototype", function(a) {
    var b = {}, c = a.common.trans.relation, d = a.common.channel.relation, e = a.kit.extra.merge, f = a.common.dialog.validateCode(), g = function(b, c) {
        a.ui.alert(b.msg)
    }, h = function(b, g) {
        var h = a.kit.extra.merge({uid: "",f: 0,extra: "",oid: $CONFIG.oid,nogroup: !1}, g || {});
        if (b === "follow") {
            var i = c.getTrans(b, {onComplete: function(c, h) {
                    var j = {onSuccess: function(a, c) {
                            var f = e(g, a.data);
                            d.fire(b, f);
                            var h = g.onSuccessCb;
                            typeof h == "function" && h(f)
                        },onError: function(b, c) {
                            a.common.layer.ioError(b.code, b)
                        },requestAjax: i,param: h,onRelease: function() {
                        }};
                    f.validateIntercept(c, h, j)
                }});
            i.request(h)
        } else
            a.common.trans.relation.request(b, {onSuccess: function(a, c) {
                    var f = e(g, a.data);
                    d.fire(b, f);
                    var h = g.onSuccessCb;
                    typeof h == "function" && h(f)
                },onError: function(b, c) {
                    a.common.layer.ioError(b.code, b)
                }}, h)
    }, i = function(a) {
        h("follow", a)
    }, j = function(a) {
        h("unFollow", a)
    }, k = function(a) {
        h("block", a)
    }, l = function(a) {
        h("unBlock", a)
    }, m = function(a) {
        h("removeFans", a)
    };
    b.follow = i;
    b.unFollow = j;
    b.block = k;
    b.unBlock = l;
    b.removeFans = m;
    return b
});
STK.register("ui.timerNotice", function(a) {
    var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl></div>', c = {success: "icon_succM",error: "icon_errorM",warn: "icon_warnM","delete": "icon_delM",question: "icon_questionM"}, d = a.kit.extra.language, e = [], f = function() {
        var c = a.ui.mod.layer(d(b));
        e.push({alt: c,used: !0});
        return c
    }, g = function(a) {
        for (var b = 0, c = e.length; b < c; b += 1)
            if (a === e[b].dia) {
                e[b].used = !0;
                return
            }
    }, h = function(a) {
        for (var b = 0, c = e.length; b < c; b += 1)
            if (a === e[b].dia) {
                e[b].used = !1;
                return
            }
    }, i = function(b) {
        var c, d, g, i;
        d = {};
        for (var j = 0, k = e.length; j < k; j += 1)
            if (!e[j].used) {
                e[j].used = !0;
                g = e[j].dia;
                break
            }
        g = g || f();
        i = a.ui.dialog();
        i.appendChild(g.getOuter());
        g.getDom("icon").className = b.icon;
        g.getDom("textLarge").innerHTML = b.textLarge;
        g.getDom("textSmall").innerHTML = b.textSmall;
        i.setTitle(b.title);
        a.custEvent.add(i, "hide", function() {
            b.OK();
            a.custEvent.remove(i, "hide", arguments.callee);
            a.custEvent.remove(i, "show", l);
            h(g)
        });
        var l = function() {
            setTimeout(i.hide, b.timer)
        };
        a.custEvent.add(i, "show", l);
        d.alt = g;
        d.dia = i;
        return d
    };
    return function(b, e) {
        e = e || {};
        var f, g, h;
        f = a.parseParam({title: d("#L{提示}"),icon: "warn",textLarge: b,textSmall: "",OK: function() {
            },timer: 3e3}, e);
        f.icon = c[f.icon];
        g = i(f);
        g.dia.show().setMiddle();
        return g
    }
});
STK.register("common.trans.group", function(a) {
    var b = a.kit.io.inter(), c = b.register;
    c("add", {url: "/aj/f/group/add?_wv=5",method: "post"});
    c("modify", {url: "/aj/relation/rename?_wv=5",method: "post"});
    c("del", {url: "/aj/relation/delete?_wv=5",method: "post"});
    c("info", {url: "/aj/f/group/getgroupinfo?_wv=5",method: "get"});
    c("set", {url: "/aj3/attention/aj_group_update_v4.php",method: "post"});
    c("batchSet", {url: "/aj3/attention/aj_group_batchupdate_v4.php",method: "post"});
    c("list", {url: "/aj/f/group/list?_wv=5",method: "get"});
    c("order", {url: "/aj/f/group/order?_wv=5",method: "post"});
    c("listbygroup", {url: "/aj/f/attchoose?_wv=5",method: "post"});
    c("infolist", {url: "/aj/f/attfilterlist?_wv=5",method: "get"});
    c("orientGroup", {url: "/aj/f/group/groupmembers?_wv=5",method: "get"});
    c("recommendfollow", {url: "/aj3/recommend/aj_addrecommend.php",method: "post"});
    c("groupupdate", {url: "/aj/relation/groupupdate?_wv=5",method: "post"});
    c("unInterest", {url: "/aj/f/group/notinterest?_wv=5",method: "post"});
    c("editdesc", {url: "/aj/f/group/editdesc?_wv=5",method: "post"});
    c("update", {url: "/aj/f/group/update?_wv=5",method: "post"});
    c("followgroup", {url: "/aj/f/group/followgroup?_wv=5",method: "post"});
    c("getGroupDesc", {url: "/aj/f/group/getdesc?_wv=5",method: "get"});
    c("closebubble", {url: "/aj/bubble/closebubble?_wv=5",method: "get"});
    return b
});
STK.register("common.dialog.inviteFollow", function(a) {
    var b = '<#et begFollow data><div class="layer_invite_question" node-type="begFollowPanel"><input type="hidden" name="fuid" value="${data.uid}"><#if (data.questionList&&data.questionList.length)><div class="inqueBg"><p class="question_title">#L{答对}&nbsp;${data.name}&nbsp;#L{的问题，即可发送邀请：}</p><dl class="clearfix"><dt>#L{提问：}</dt><dd><select name="qid" class="htc_select" node-type="questionList"><#list data.questionList as list><option value="${list.question}">${list.question_text}</option></#list></select></dd><dt><span class="S_spetxt">*</span>#L{回答：}</dt><dd class="form_table_single"><input node-type="answer" type="text" value="#L{在这里填写答案}" class="W_input" name="answer"><div class="M_notice_del" node-type="answer_error" style="display:none;"></div></dd></dl></div></#if><dl class="inqueBgNo clearfix"><dt><span class="S_spetxt">*</span>#L{说点什么吧：}</dt><dd class="additional form_table_single"><textarea node-type="content" class="W_input" cols="" rows="" name="content">#L{介绍一下自己吧}</textarea><div class="M_notice_del" style="display:none;" node-type="content_error"></div></dd></dl><div class="btn"><a href="javascript:;" node-type="submit" class="W_btn_a"><span>#L{发送邀请}</span></a><a node-type="cancel" href="javascript:;" class="W_btn_b"><span>#L{取消}</span></a></div></div></#et>', c = a.kit.extra.language;
    errorTemp = '<span class="icon_del"></span><span class="txt">{error}</span>';
    return function(d) {
        d = d || {};
        var e, f, g = a.parseParam({answer: "#L{在这里填写答案}",content: "#L{介绍一下自己吧}",success: "#L{邀请发送成功！}",ans_error: "#L{请输入答案哦。}",con_error: "#L{请输入你想说的话。}",title: "#L{邀请#{name\\}关注我}",defMsg: "",callback: a.core.func.empty,succCallback: a.core.func.empty}, d || {}), h = d.trans || "answer", i = d.successCb || function() {
            a.ui.litePrompt(c(g.success), {type: "succM",timeout: "500"})
        }, j = d.errorCb || function(b, c) {
            b && b.msg && a.ui.alert(b.msg)
        }, k = function(b, d, e, g) {
            var h = f[b + "_error"];
            if (h) {
                h.innerHTML = errorTemp.replace(/\{error\}/, d);
                h.style.display = ""
            } else
                e && e === "100060" ? d && a.ui.confirm(d, {icon: "warn",OKText: c("#L{立刻绑定}"),OK: function() {
                        window.location.href = "http://account.weibo.com/settings/mobile"
                    }}) : typeof g == "function" ? g() : d && a.ui.alert(d)
        }, l = function(a) {
            var b = f[a + "_error"];
            b.style.display = "none"
        }, m = a.common.trans.relation.getTrans(h, {onSuccess: function(a, b) {
                e.hide();
                i(a, b);
                g.succCallback()
            },onError: function(a, b) {
                var c = a.data || {}, d = c.key;
                k(d, a.msg, a.code, function() {
                    j(a, b)
                })
            }}), n = function(b, d) {
            b = a.trim(b || "");
            b === c(d) && (b = "");
            return b
        }, o = {submit: function() {
                var b = a.parseParam({uid: "",name: "",inviteid: ""}, d || {});
                d.tarEl && (b = a.common.getDiss(b, d.tarEl));
                h == "answer" && (b.fuid = d.uid);
                if (f.answer) {
                    b.answer = n(f.answer.value, g.answer);
                    if (!b.answer) {
                        k("answer", c(g.ans_error));
                        return
                    }
                }
                if (f.content) {
                    b.content = n(f.content.value, g.content);
                    if (!b.content) {
                        k("content", c(g.con_error));
                        return
                    }
                }
                f.questionList && (b.qid = f.questionList.value);
                m.request(b);
                a.preventDefault()
            },cancel: function(a) {
                e.hide()
            },focus: function(a) {
                return function() {
                    l(a)
                }
            }}, p = function() {
            a.core.evt.hotKey.add(f.content, ["ctrl+enter", "enter"], function() {
                o.submit()
            });
            a.addEvent(f.answer, "focus", o.focus("answer"));
            a.addEvent(f.content, "focus", o.focus("content"));
            a.addEvent(f.submit, "click", o.submit);
            a.addEvent(f.cancel, "click", o.cancel)
        }, q = function() {
            f.answer && a.kit.dom.smartInput(f.answer, {notice: c(g.answer),noticeStyle: "color:#E0E0E0",maxLength: 20});
            a.kit.dom.smartInput(f.content, {notice: c(g.content),noticeStyle: "color:#E0E0E0",maxLength: 280})
        }, r = function() {
            var h = a.core.util.easyTemplate(c(b), d).toString(), i = a.core.dom.builder(h);
            f = a.kit.dom.parseDOM(i.list);
            e = a.ui.dialog();
            e.setTitle(c(g.title, {name: d.titleName || d.name || d.fnick}));
            g.defMsg && (f.content.value = c(g.defMsg));
            e.appendChild(f.begFollowPanel);
            d.callback && a.custEvent.add(e, "hide", d.callback)
        }, s = function() {
            r();
            p();
            q();
            e.show().setMiddle()
        };
        s()
    }
});
STK.register("common.dialog.userInfoDialog", function(a) {
    return function(b) {
        var c = a.kit.extra.language, d = '<div node-type="outer" class="detail"><div node-type="inner"></div><div node-type="btnBox" class="btn"><a node-type="submit" href="javascript:;" class="W_btn_d"><span>#L{确认}</span></a><a node-type="cancel" href="javascript:;" class="W_btn_b"><span>#L{取消}</span></a></div></div>', e = {}, f = a.ui.dialog({isHold: !0}), g = a.core.dom.builder(c(d)), h = a.kit.dom.parseDOM(g.list), i, j, k, l, m, n;
        f.appendChild(h.outer);
        var o = {}, p = {submit: function(a) {
                typeof m == "function" && m();
                r()
            },cancel: function(a) {
                typeof n == "function" && n();
                r()
            }};
        a.addEvent(h.submit, "click", p.submit);
        a.addEvent(h.cancel, "click", p.cancel);
        var q = function(a) {
            a = a || {};
            m = a.OK;
            n = a.cancel;
            h.inner.innerHTML = a.content;
            f.setTitle(a.title);
            f.show().setMiddle()
        }, r = function() {
            f.hide()
        }, s = function() {
            a.removeEvent(h.submit, "click", p.submit);
            a.removeEvent(h.cancel, "click", p.cancel)
        };
        e.show = q;
        e.hide = r;
        e.destroy = s;
        return e
    }
});
STK.register("common.dialog.cfUserInfo", function(a) {
    return function(b) {
        var c = a.kit.extra.language, d = '<div class="W_layer" node-type="outer" style="display:none;position:absolute;z-index:10001"><div class="bg"><table border="0" cellspacing="0" cellpadding="0"><tr><td><div class="content" node-type="layoutContent"><a href="javascript:void(0);" class="W_close" title="#L{关闭}" node-type="close"></a><div class="detail"><div class="confirm_closefriend clearfix"><div class="tit_cf" node-type="title"><span node-type="title_content"></span></div><div  node-type="inner"></div></div></div></div></td></tr></table></div></div>', e = '<div node-type="outer"><div class="block_cf" node-type="inner"></div><div node-type="btnBox" class="btn"><a node-type="submit" href="javascript:;" class="W_btn_d"><span>#L{确认}</span></a><a node-type="cancel" href="javascript:;" class="W_btn_b"><span>#L{取消}</span></a></div></div>', f = {}, g = a.ui.dialog({template: d,isHold: !0}), h = a.core.dom.builder(c(e)), i = a.kit.dom.parseDOM(h.list), j, k, l, m, n, o;
        g.appendChild(i.outer);
        var p = {}, q = {submit: function(a) {
                typeof n == "function" && n();
                s()
            },cancel: function(a) {
                typeof o == "function" && o();
                s()
            }};
        a.addEvent(i.submit, "click", q.submit);
        a.addEvent(i.cancel, "click", q.cancel);
        var r = function(a) {
            a = a || {};
            n = a.OK;
            o = a.cancel;
            i.inner.innerHTML = a.content;
            g.setTitle(a.title);
            g.show().setMiddle()
        }, s = function() {
            g.hide()
        }, t = function() {
            a.removeEvent(i.submit, "click", q.submit);
            a.removeEvent(i.cancel, "click", q.cancel)
        };
        f.show = r;
        f.hide = s;
        f.destroy = t;
        return f
    }
});
STK.register("common.relation.closeFriend", function(a) {
    var b = {}, c, d, e, f, g, h, i, j, k = a.common.trans.relation, l = a.kit.extra.language, m, n = {unfollow: l("#L{加密友之后也会同时关注对方哦}"),cfSuc_1: l("#L{密友邀请已经发送，请等待对方接受}"),cfSuc_2: l("#L{你已经成功添加对方为密友，你们彼此已经是密友啦}"),cfSucTit_1: l("#L{需要对方通过邀请才能加为密友}"),she: l("#L{她}"),he: l("#L{他}")}, o = l('<div class="confirm_closefriend clearfix" node-type="userinfo"><div class="head"><a target="_blank" href="/#{domain}"><img title="#{screen_name}" alt="" width="50" height="50" src="#{profile_image_url}"></a></div><div class="info"><p class="mb"><a target="_blank" href="/#{domain}" class="W_f14">#{screen_name}</a> <span class="addr">#{location}</span></p><p class="mb W_textb">#{description}</p><p>#L{关注} <a target="_blank" href="/#{id}/follow">#{friends_count}</a><span class="W_vline">|</span>#L{粉丝} <a target="_blank" href="/#{id}/fans">#{followers_count}</a><span class="W_vline">|</span>#L{微博} <a target="_blank" href="/#{domain}">#{statuses_count}</a></p></div></div>'), p = l('<#et tip data><div class="head"><a target="_blank" href="/${data.domain}"><img title="${data.screen_name}" alt="" width="50" height="50" src="${data.profile_image_url}"></a></div><div class="info"><p class="mb"><a target="_blank" href="/${data.domain}" class="W_f14">${data.screen_name}</a><#if (data.verified && data.verified_type == 0)><a target="_blank" href="http://verified.weibo.com/verify"><i title="${data.verified_reason}" class="W_ico16 approve"></i></a></#if><#if (!data.verified && data.verified_type == 220)><a target="_blank" href="http://club.weibo.com/intro"><i title="微博达人" class="W_ico16 ico_club" node-type="daren"></i></a></#if></p><p class="mb"><i class="W_ico16 male"></i><span class="addr">${data.location}</span></p><p>#L{关注} <a target="_blank" href="/${data.id}/follow">${data.friends_count}</a><span class="W_vline">|</span>#L{粉丝}<a target="_blank" href="/${data.id}/fans">${data.followers_count}</a><span class="W_vline">|</span>#L{微博}<a target="_blank" href="/${data.domain}">${data.statuses_count}</a></p></div><#if (data.description)><p>#L{简介：}${data.description}</p></#if></#et>'), q = l('<label><input type="checkbox" value="1" name="unfollow">#L{同时取消关注}</label>'), r = function(b, c) {
        var d = b.data || {}, e = n.cfSuc_2, f;
        if (d.cftype == 2) {
            e = n.cfSuc_1;
            f = n.cfSucTit_1
        }
        a.ui.timerNotice(e, {title: f,icon: "success",timer: 2e3})
    }, s = function(b, c) {
        var d = b.data || {};
        d.overtop == 1 ? a.ui.alert(l("#L{您的密友数量已经达到140上限啦~~}"), {icon: "warn",OKText: l("#L{知道了}")}) : b.code == "100091" ? window.location.href = "http://meyou.weibo.com" : b && b.msg && a.ui.alert(b.msg)
    }, t = function() {
        var b;
        if (i == 3) {
            b = a.parseParam({successCb: r,errorCb: s}, h || {});
            var c = {uid: h.uid,inviteid: h.inviteid,name: h.name};
            h.tarEl && (c = a.common.getDiss(c, h.tarEl));
            k.request("addCloseFriend", {onSuccess: b.successCb,onError: b.errorCb}, c)
        } else if (i == 1)
            a.ui.alert(l("#L{你们彼此已经是密友啦}"));
        else {
            b = a.parseParam({trans: "addCloseFriend",name: "",fnick: "",uid: "",inviteid: "",questionList: j,title: "#L{邀请#{name\\}成为密友}",successCb: r,errorCb: s,callback: function() {
                },tarEl: null}, h || {});
            a.common.dialog.inviteFollow(b)
        }
    }, u = a.ui.tipConfirm({icon: "icon_warn",info: n.unfollow,okCallback: function() {
            setTimeout(function() {
                t()
            }, 300)
        }}), v = {followConfirm: function(a) {
            u.setLayerXY(a);
            u.aniShow()
        }}, w = k.getTrans("checkrelation", {onSuccess: function(b, c) {
            var e = b.data || {}, f = e.relation || {};
            i = f.cftype;
            j = e.questionList;
            if (c.type == "input")
                y(e.userinfo);
            else {
                if (f.following == 1)
                    return t();
                d ? v.followConfirm(d) : a.ui.confirm(n.unfollow, {OK: function() {
                        t()
                    }})
            }
        },onError: s}), x = function(b) {
        var c = document.createTextNode(b), d = a.C("div");
        d.appendChild(c);
        var e = d.innerHTML;
        d = c = null;
        return e
    }, y = function(b) {
        var c = b.screen_name;
        c = a.bLength(c) > 18 ? a.leftB(c, 18) + "…" : c;
        b.screen_name = c;
        b.description = x(b.description);
        m = m || a.common.dialog.cfUserInfo();
        b.description && a.core.str.bLength(b.description) > 100 && (b.description = a.core.str.leftB(b.description, 100) + "...");
        m.show({content: a.core.util.easyTemplate(p, b).toString(),title: l('#L{确认} <a target="_blank" href="/' + b.domain + '">@' + b.screen_name + "</a> #L{是你要邀请的密友么？}"),OK: function() {
                t()
            }})
    }, z = k.getTrans("removeClsFrd", {onSuccess: function(a, b) {
            typeof h.successCb == "function" && h.successCb(a, b)
        },onError: function(b, c) {
            typeof h.errorCb == "function" ? h.errorCb(b, c) : b && b.msg && a.ui.alert(b.msg)
        }}), A = function(b) {
        h = b || {};
        c = a.parseParam({name: "",uid: "",type: "",callback: function() {
            }}, b);
        d = b.node;
        w.request(c)
    }, B = function(b) {
        h = b || {};
        h.uid = h.uid.join(",");
        d = h.node;
        var c = a.parseParam({trans: "addCloseFriend",titleName: l("#L{他们}"),uid: "",sex: "m",inviteid: "",title: "#L{邀请#{name\\}成为密友}",successCb: r,errorCb: s,callback: function() {
            },tarEl: null}, h || {});
        if (h.nick) {
            var e = b.sex == "f" ? n.she : n.he;
            c.defMsg = "@" + h.nick + " #L{想成为你的微博密友，快来回应}" + e + "#L{吧~！}"
        }
        a.common.dialog.inviteFollow(c)
    }, C = function(b) {
        var c = b && b.uid;
        if (a.isArray(c))
            return B(b);
        A(b)
    }, D = function(b) {
        h = b || {};
        c = a.parseParam({name: "",uid: ""}, b);
        d = b.node;
        a.ui.confirm(l("#L{确认将#{sex\\}移出密友？}", {sex: b.sex == "f" ? n.she : n.he}), {textComplex: q,OK: function(a) {
                a.unfollow && (c.unfollow = "1");
                z.request(c)
            }})
    }, E = function() {
        c = null;
        d = null;
        callback = null;
        l.destroy()
    };
    b.add = C;
    b.destroy = E;
    b.remove = D;
    return b
});
STK.register("common.group.groupListPanel", function(a) {
    var b = $CONFIG.miyou == "1";
    return function(c) {
        var d = {}, e = a.kit.extra.language, f = a.C("div"), g = {}, h = {}, i, j = a.delegatedEvent(f), k = $CONFIG.imgPath + "style/images/common/transparent.gif", l = [{mode: "private",className: "W_ico16 i_conn_private",title: e("#L{仅自己可见}")}, {mode: "friend",className: "W_ico16 i_conn_list",title: e("#L{组内成员可见}")}, {mode: "public",className: "W_ico16 i_conn_public",title: e("#L{所有人可见}")}], m = function(a, b, c) {
            if (!!a) {
                c && (c = c.toUpperCase());
                var d = a[b];
                while (d) {
                    if (d.nodeType == 1 && (c ? d.nodeName == c : !0))
                        break;
                    d = d[b]
                }
                return d
            }
        }, n = c.multi ? 'style="display:none;"' : '<#if (item.belong==1)><#else>style="display:none;"</#if>', o = '<h4 class="lsfl_visibility" style="display:none;"><img class="#{className}" alt="" src="' + k + '">#{title}</h4><div class="lsfl_listsBox"><ul node-type="#{mode}" class="lsfl_listsBox_ul"></ul></div>', p = a.core.util.easyTemplate('<#et listItem gList><#list gList as item><li <#if (item.recom_join)> class="S_bg1"</#if>><label for="${item.gid}"><input action-type="select" id="${item.gid}" type="checkbox"<#if (item.recom_join)> recom_join="1" </#if> <#if (item.belong==1)>checked="checked"</#if> class="W_checkbox" value="${item.gid}">${item.gname}</label><#if (item.recom_join)><span class="S_bg1 S_txt2">(' + e("#L{建议加为这个分组}") + ")</span>" + "</#if>" + "</li>" + "</#list>" + "</#et>"), q = e('<li class="lsfl_cf" ' + (b ? "" : 'style="display:none;"') + ">" + '<label for="closefriend_grouplistpanel">' + '<input node-type="cfSelect" type="checkbox" id="closefriend_grouplistpanel" class="W_checkbox">' + '<span node-type="cf_label" class="W_fb W_f_cf">#L{密友圈}</span>' + '<i class="W_ico16 i_conn_close_friend"></i>' + "</label>" + "</li>"), r = function(b) {
            var c = document.createTextNode(b), d = a.C("div");
            d.appendChild(c);
            var e = d.innerHTML;
            d = c = null;
            return e
        }, s = function() {
            var b = "";
            for (var d = 0; d < l.length; d++)
                b += a.templet(o, l[d]);
            f.innerHTML = b;
            i = a.kit.dom.parseDOM(a.core.dom.builder(f).list);
            c.data && C(c.data)
        }, t = function() {
            for (var d = 0; d < l.length; d++) {
                var e = l[d].mode;
                !c.multi && e === "private" && (i[e].innerHTML = q);
                if (g[e]) {
                    for (var h = g[e].length; h--; )
                        g[e][h].desc && (g[e][h].desc = g[e][h].desc);
                    var j = p(g[e]).toString();
                    i[e].innerHTML += j
                } else
                    (!b || e !== "private") && z(i[e], !0)
            }
            var k = a.sizzle('input[node-type="cfSelect"]', f)[0] || {}, m = (c.cftype || 0) > 0;
            setTimeout(function() {
                k.checked = m
            }, 0)
        };
        lengthLimit = function(b) {
            var c = a.fixEvent(b).target;
            a.bLength(c.value) > 16 && (c.value = a.leftB(c.value, 16))
        }, onEnter = function(b) {
            if (b.keyCode === 13) {
                var c = a.fixEvent(b).target;
                a.fireEvent(c, "blur")
            }
        };
        var u = function(b) {
            var c = m(b, "parentNode", "li");
            if (!!c) {
                var d = a.sizzle('input[action-type="select"]', c)[0];
                h[d.id] || (h[d.id] = {});
                return h[d.id]
            }
        }, v = {addCloseFriend: function(a) {
                var b = a.el;
                !b.checked
            },miyouHelp: function(b) {
                a.preventDefault();
                var c = a.kit.extra.parseURL();
                c = "http://" + c.host + "/mymeyou?ismiyou=1";
                var d = a.C("form");
                d.setAttribute("action", c);
                d.setAttribute("method", "POST");
                var e = a.C("input");
                e.setAttribute("name", "step");
                e.setAttribute("value", "1");
                var f = a.C("input");
                f.setAttribute("name", "ismiyou");
                f.setAttribute("value", "1");
                var g = a.C("input");
                g.setAttribute("name", "type");
                g.setAttribute("value", "1");
                var h = a.C("input");
                h.setAttribute("name", "guidetype");
                h.setAttribute("value", "miyou");
                var i = a.C("input");
                i.setAttribute("name", "method");
                i.setAttribute("value", "POST");
                d.appendChild(e);
                d.appendChild(f);
                d.appendChild(g);
                d.appendChild(h);
                d.appendChild(i);
                document.body.appendChild(d);
                d.submit()
            }}, w = function() {
            j.add("select", "click", v.select);
            j.add("miyouHelp", "click", v.miyouHelp)
        }, x = function() {
        }, y = function() {
            s();
            w();
            x()
        }, z = function(b, c) {
            var d = a.domPrev(b.parentNode);
            if (d.style.display === (c ? "" : "none")) {
                d.style.display = c ? "none" : "";
                b.parentNode.style.display = c ? "none" : ""
            }
        }, A = function() {
            return f
        }, B = function(b) {
            var c = b.mode || "private";
            g[c] = g[c] || [];
            g[c].push(b);
            var d = p([b]).toString();
            a.insertHTML(i[c], d, "beforeend");
            z(i[c], !0)
        }, C = function(b) {
            g = {};
            if (a.isArray(b))
                for (var c = 0, d = b.length; c < d; c++) {
                    var e = b[c].mode || "private";
                    g[e] = g[e] || [];
                    g[e].push(b[c])
                }
            t()
        }, D = function() {
            var b = [], d = {suda: [],diss: {allGroup: 0,autoSelect: 0,gid: [],uid: $CONFIG.uid}}, e = a.sizzle('input[action-type="select"]', f), g = a.sizzle('input[node-type="cfSelect"]', f)[0] || {}, h, i;
            d.diss.allGroup = e.length;
            for (var j = e.length; j--; ) {
                var k = {};
                h = i = !1;
                if (e[j].checked) {
                    h = !0;
                    var l = u(e[j]);
                    if (l) {
                        k.gid = e[j].value;
                        b.push(k)
                    }
                }
                if (e[j].getAttribute("recom_join")) {
                    i = !0;
                    d.diss.autoSelect++;
                    d.diss.gid.push(e[j].value)
                }
                (i || h) && d.suda.push(e[j].value + (i ? "_a" : "_b") + (h ? "_1" : "_0"))
            }
            var m = (c.cftype || 0) > 0;
            g.checked !== m && (b.isCfInvite = g.checked ? "add" : "delete");
            b.suda_diss = d;
            return b
        }, E = function() {
            t()
        }, F = function() {
            g = {};
            t()
        }, G = function() {
            j.destroy();
            h = null;
            g = null;
            i = null;
            f = null
        }, H = function() {
            var b = a.sizzle('input[action-type="select"]', f);
            return b.length
        };
        y();
        d.getOuter = A;
        d.length = H;
        d.add = B;
        d.setData = C;
        d.getData = D;
        d.reset = E;
        d.clear = F;
        d.destroy = G;
        return d
    }
});
STK.register("common.layer.vipError", function(a) {
    var b = '<#et temp data><div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="${data.icon}" node-type="icon"></span></dt><dd node-type="inner">${data.info}</dd></dl><div class="btn"><a href="###" <#if (data.lbtnStyle == 1)>class="W_btn_a"<#else if (data.lbtn == 0)>class="W_btn_b"</#if> node-type="lbtn"><span><#if (data.lbtnIcon == 1)><i class="W_ico16 ico_member"></i></#if>${data.lbtnText}</span></a><a href="###" <#if (data.rbtnStyle == 1)>class="W_btn_a"<#else if (data.rbtn == 0)>class="W_btn_b"</#if> node-type="rbtn"><span><#if (data.rbtnIcon == 1)><i class="W_ico16 ico_member"></i></#if>${data.rbtnText}</span></a></div></div></#et>', c = {success: "icon_succM",error: "icon_errorM",warn: "icon_warnM","delete": "icon_delM",question: "icon_questionM"}, d = a.kit.extra.language, e = function(e) {
        var f, g, h;
        f = a.parseParam({title: d("#L{提示}"),icon: "warn",info: "",lbtnFunc: a.funcEmpty,lbtnStyle: 0,lbtnIcon: 0,lbtnText: d("#L{立即开通会员}"),rbtnFunc: a.funcEmpty,rbtnStyle: 0,rbtnIcon: 0,rbtnText: d("#L{立即开通会员}")}, e);
        f.icon = c[f.icon];
        var g = a.ui.mod.layer(a.core.util.easyTemplate(b, f).toString());
        h = a.ui.dialog();
        h.setContent(g.getOuter());
        h.setTitle(f.title);
        var i = function() {
            f.lbtnFunc();
            h.hide()
        }, j = function() {
            f.rbtnFunc();
            h.hide()
        };
        a.addEvent(g.getDom("lbtn"), "click", i);
        a.addEvent(g.getDom("rbtn"), "click", j);
        a.custEvent.add(h, "hide", function() {
            a.custEvent.remove(h, "hide", arguments.callee);
            a.removeEvent(g.getDom("lbtn"), "click", i);
            a.removeEvent(g.getDom("rbtn"), "click", j)
        });
        h.show().setMiddle();
        return h
    };
    return function(a, b) {
        if (a == "100096" || a == "100098") {
            b.lbtnStyle = 0;
            b.lbtnIcon = 0;
            b.lbtnText = d("#L{管理分组}");
            b.rbtnStyle = 1;
            b.rbtnIcon = 1;
            b.rbtnText = d("#L{开通会员}");
            b.rbtnFunc = function() {
                location.href = "http://vip.weibo.com/paycenter?form=group"
            }
        } else if (a == "100097") {
            b.lbtnStyle = 0;
            b.lbtnIcon = 0;
            b.lbtnText = d("#L{管理分组}");
            b.rbtnStyle = 0;
            b.rbtnIcon = 0;
            b.rbtnText = d("#L{知道了}")
        }
        return e(b)
    }
});
STK.register("ui.popCard", function(a) {
    var b = 5, c = 28, d = 38, e = 200, f = 200, g = function(b, c, d) {
        var e, f, g, h, i, j, k = a.core.util.scrollPos(), l = a.core.dom.position(b), m = a.core.util.winSize();
        i = b.offsetWidth;
        j = b.offsetHeight;
        g = l.t - k.top;
        e = l.l - k.left;
        f = m.width - e - i;
        h = m.height - g - j;
        return {t: g,l: e,r: f,b: h,w: i,h: j,x: l.l,y: l.t}
    }, h = function(a) {
        var c = a.nodeW, d = a.nodeH, e = a.dis, f = a.cardWidth, g = a.cardHeight, h = a.arrow, i = a.node, j = a.offsetH, k = a.offsetW, l = a.arPos, m = {};
        switch (h) {
            case "t":
                m.l = e.x - k + c / 2;
                m.t = e.y - b - g;
                break;
            case "r":
                m.l = e.x + c + b;
                m.t = e.y - j + d / 2;
                break;
            case "b":
                m.l = e.x - k + c / 2;
                m.t = e.y + d + b;
                break;
            case "l":
            default:
                m.l = e.x - f - b;
                m.t = e.y - j + d / 2
        }
        return m
    }, i = function(b) {
        var e = b.node, i = b.cardWidth, j = b.cardHeight, k = b.arrowPos || "auto", l = (b.order || "b,r,t,l").split(","), m = l[0], n = Math.max(j, f), o = {l: i,b: n,t: n,r: i}, p = {l: "r",b: "t",t: "b",r: "l"}, q = g(e), r = q.w, s = q.h, t = c, u = d, v = e.getClientRects ? e.getClientRects() : null, w = parseInt(a.getStyle(e, "lineHeight"), 10), x = b.event;
        if (v && v.length > 1) {
            var y;
            if (x.pageX - q.x > r / 2) {
                y = v[0];
                q.x = y.left;
                q.l += y.left - v[1].left;
                s = y.bottom - y.top;
                r = y.right - y.left
            } else {
                y = v[1];
                q.y += y.top - v[0].top;
                q.r += v[0].right - y.right;
                s = y.bottom - y.top;
                r = y.right - y.left
            }
        }
        for (var z = 0, A = l.length; z < A; z++) {
            var B = l[z];
            if (q[B] > o[B]) {
                m = B;
                break
            }
        }
        k === "auto" && ((m === "t" || m === "b") && r / 2 + q.r < i - d ? k = "right" : s / 2 + q.b < j - c && (k = "bottom"));
        k === "right" ? u = i - d : k === "bottom" ? t = j - c : k === "center" && (u = i / 2);
        var C = h({nodeW: r,nodeH: s,dis: q,cardWidth: i,cardHeight: j,arrow: m,node: e,offsetH: t,offsetW: u});
        return {dire: p[m],pos: C,arPos: k}
    }, j = function(a, b) {
        return function() {
            return a.apply(b, arguments)
        }
    }, k = function() {
        this.bubLayer = a.ui.bubbleLayer();
        this.cardPanel = this.bubLayer.getOuter();
        this.initBind()
    };
    k.prototype = {initBind: function() {
            var b = j(this.stopHide, this), c = j(this.hideCard, this);
            a.addEvent(this.cardPanel, "mouseover", b);
            a.addEvent(this.cardPanel, "mouseout", c);
            this.dEvent = a.core.evt.delegatedEvent(this.cardPanel)
        },stopShow: function() {
            this.showTimer && clearTimeout(this.showTimer)
        },stopHide: function() {
            this.hideTimer && clearTimeout(this.hideTimer)
        },showCard: function(a) {
            var b = a.zIndex || 9999;
            this.cardPanel.style.zIndex = b;
            this.bubLayer.setContent(a.content).show();
            this.node = a.node;
            this.arrowPos = a.arrowPos;
            this.order = a.order;
            this.direPos = i({node: this.node,cardWidth: this.cardPanel.offsetWidth,cardHeight: this.cardPanel.offsetHeight,arrowPos: this.arrowPos,order: this.order,event: a.event});
            this.bubLayer.setPostion(this.direPos.pos).setArrow(this.direPos.dire, this.direPos.arPos)
        },setContent: function(a) {
            var b = this.cardPanel.offsetHeight;
            this.bubLayer.setContent(a);
            if (this.direPos.dire === "b") {
                var c = this.cardPanel.offsetHeight - b;
                this.bubLayer.setPostion({l: this.direPos.pos.l,t: this.direPos.pos.t - c})
            }
        },hideCard: function() {
            var a = this;
            this.hideTimer = setTimeout(function() {
                a.bubLayer.hide()
            }, e)
        }};
    return function() {
        return new k
    }
});
STK.register("ui.prompt", function(a) {
    var b = '<div class="layer_prompt" node-type="outer"><p class="son_title" node-type="inner"></p><dl class="clearfix"><dt node-type="label"></dt><dd><input type="text" class="W_input W_input_default" value="" node-type="input" /><p class="S_error" node-type="errorBox"><span class="icon_del"></span><span node-type="errorTxt"></span></p></dd></dl><div class="btn"><a class="W_btn_d" href="javascript:void(0);" node-type="OK"></a><a class="W_btn_b" href="javascript:void(0);" node-type="cancel"></a></div></div>', c = a.kit.extra.language, d = null, e = function(a, b) {
        a.getDom("inner").innerHTML = b.info;
        a.getDom("label").innerHTML = b.label;
        a.getDom("OK").innerHTML = "<span>" + b.OKText + "</span>";
        a.getDom("cancel").innerHTML = "<span>" + b.cancelText + "</span>";
        a.getDom("errorBox").style.visibility = "hidden";
        a.getDom("errorTxt").innerHTML = "";
        a.input.setValue(b.value);
        a.input.setNotice(b.notice);
        a.input.restart()
    }, f = function(f) {
        var g, h, i, j, k, l, m;
        d || (d = a.kit.extra.reuse(function() {
            var d = a.ui.mod.layer(c(b));
            d.input = a.kit.dom.smartInput(d.getDom("input"));
            return d
        }));
        h = d.getOne();
        i = a.ui.dialog();
        i.appendChild(h.getOuter());
        i.setTitle(f.title);
        e(h, f);
        j = function() {
            var a = f.check(h.getDom("input").value);
            a.status ? m() : l(a.msg);
            return a.status
        };
        k = function() {
            j() && f.OK(h.getDom("input").value)
        };
        l = function(a) {
            h.getDom("errorBox").style.visibility = "visible";
            h.getDom("errorTxt").innerHTML = a
        };
        m = function() {
            h.getDom("errorBox").style.visibility = "hidden"
        };
        a.custEvent.add(h.input, "enter", k);
        a.addEvent(h.getDom("OK"), "click", k);
        a.addEvent(h.getDom("cancel"), "click", i.hide);
        a.addEvent(h.getDom("input"), "blur", j);
        a.custEvent.add(i, "hide", function() {
            a.custEvent.remove(i, "hide", arguments.callee);
            a.custEvent.remove(h.input, "enter", k);
            a.removeEvent(h.getDom("OK"), "click", k);
            a.removeEvent(h.getDom("cancel"), "click", i.hide);
            a.removeEvent(h.getDom("input"), "blur", j);
            d.setUnused(h);
            f.cancel();
            h = null;
            i = null
        });
        g = {};
        g.pmt = h;
        g.dia = i;
        g.hide = i.hide;
        g.showError = l;
        g.hideError = m;
        return g
    };
    return function(b) {
        var d, e;
        d = a.parseParam({title: c("#L{提示}"),notice: "",value: "",info: "",label: "",OK: a.funcEmpty,cancel: a.funcEmpty,check: function() {
                return {status: !0}
            },OKText: c("#L{确定}"),cancelText: c("#L{取消}")}, b);
        e = f(d);
        e.dia.show().setMiddle();
        return e
    }
});
STK.register("common.dialog.setRemark", function(a) {
    return function(b) {
        b = b || {};
        var c = b.uid;
        if (b.uid != null) {
            var d = a.trim(b.remark || ""), e = b.callback, f = a.kit.extra.language, g = "", h = a.ui.prompt({title: f("#L{设置备注名}"),notice: f("#L{请输入备注名}"),value: d || "",info: "",label: f("#L{备注名：}"),OK: function(a) {
                    if (d != "" && a == d) {
                        e && e(d);
                        h.hide()
                    } else
                        i.request({touid: c,remark: g})
                },cancel: a.funcEmpty,check: function(b) {
                    var c;
                    if (a.trim(b) == "" || b == f("#L{请输入备注名}")) {
                        c = {status: !0,msg: f("#L{备注名不能为空}")};
                        g = ""
                    } else {
                        c = {status: !0};
                        g = b
                    }
                    return c
                },OKText: f("#L{确定}"),cancelText: f("#L{取消}")});
            h.pmt.input.setMaxLength(30);
            setTimeout(function() {
                var b = h.pmt.getDom("input");
                b.focus();
                a.kit.extra.textareaUtils.setCursor(b)
            }, 0);
            var i = a.common.trans.relation;
            i = i.getTrans("setRemark", {onSuccess: function(a, b) {
                    e && e(g);
                    h.hide()
                } || a.funcEmpty,onError: function(a, b) {
                    h.showError(a.msg)
                },onFail: function(a, b) {
                    h.showError(a.msg || f("#L{系统繁忙，请稍后再试}"))
                }})
        }
    }
});
STK.register("common.layer.userCard", function(a) {
    var b = 3e5, c = 500, d, e, f, g, h, i = '<div style="width:360px;padding-top:15px;padding-bottom:15px;text-align:center"><span>#{msg}</span></div>';
    return function(e, f) {
        var j = {}, k = a.kit.extra.language, l = a.common.channel.relation, m = a.templet, n = a.parseParam({order: "t,b,l,r",zIndex: 9999,type: 0,variety: "userCard",arrowPos: "auto",loadTemp: k('<div class="W_loading" style="width:360px;padding-top:15px;padding-bottom:15px;text-align:center"><span>#L{正在加载，请稍候}...</span></div>')}, f || {}), o = a.common.trans.relation.getTrans(n.variety, {onComplete: function(b, c) {
                if (b.code == "100000") {
                    var e = c.id || c.name;
                    p.setCache(e, b.data);
                    d.setContent(b.data);
                    (d.delayShow || a.funcEmpty)()
                } else {
                    if (!b || !b.msg || typeof b.msg != "string")
                        b = {msg: k("#L{加载失败}")};
                    d.setContent(m(i, b))
                }
            }}), p = {data: [],getCache: function(a) {
                var c = this.data[a], d = "";
                if (c) {
                    var e = new Date;
                    e - c.date < b ? d = c.html : delete this.data[a]
                }
                return d
            },setCache: function(a, b) {
                this.data[a] = {date: new Date,html: b}
            },rmCache: function(a) {
                delete this.data[a]
            }}, q = function(b, e, f, g) {
            d.stopHide();
            d.stopShow();
            f = a.fixEvent(f);
            var h = function() {
                d.delayShow = h;
                var c = a.queryToJson(e), i = c.id || c.name, j = p.getCache(i);
                d.showCard({content: j || n.loadTemp,node: b,order: n.order,arrowPos: n.arrowPos,zIndex: n.zIndex,event: f});
                j || o.request(a.kit.extra.merge({type: n.type,mark: g && g.mark || ""}, c))
            };
            d.showTimer = setTimeout(h, c)
        }, r = function(a, b, c) {
            d.stopShow();
            d.hideCard()
        }, s = {rmCache: function(a) {
                p.rmCache(a.uid);
                p.rmCache(a.fnick)
            }}, t = function(b) {
            g || (g = a.common.dialog.setGroup());
            g.show({uid: b.data.uid,fnick: b.data.fnick,hasRemark: !1})
        }, u = function(b) {
            var c = a.core.dom.firstChild(b.el).innerHTML, d = a.core.str.decodeHTML(c.substring(1, c.length - 1)), e = b.data;
            d === k("#L{设置备注}") && (d = "");
            a.common.dialog.setRemark({uid: e.uid,remark: d,callback: function(a) {
                    p.rmCache(e.uid);
                    p.rmCache(e.fnick)
                }})
        }, v = function(b) {
            var c = b.data;
            a.common.trans.relation.request("questions", {onSuccess: function(b, d) {
                    a.common.dialog.inviteFollow({name: c.fnick,uid: c.uid,questionList: b.data})
                },onError: function(b, c) {
                    b && b.code === "100060" ? b.msg && a.ui.confirm(b.msg, {icon: "warn",OKText: k("#L{立刻绑定}"),OK: function() {
                            window.location.href = "http://account.weibo.com/settings/mobile";
                            return a.preventDefault()
                        }}) : b.msg && a.ui.alert(b.msg)
                }}, {uid: c.uid})
        }, w = function() {
            if (!d) {
                d = a.ui.popCard();
                h = a.common.relation.baseFollow(d.cardPanel);
                a.custEvent.add(h, "followSucc", r);
                d.dEvent.add("setGroup", "click", t);
                d.dEvent.add("setRemark", "click", u);
                d.dEvent.add("inviteFollow", "click", v)
            }
            x();
            y()
        }, x = function() {
            if (!a.core.dom.isNode(e))
                throw "[STK.common.layer.userCard]: node is not a Node!"
        }, y = function() {
            l.register("follow", s.rmCache);
            l.register("unFollow", s.rmCache)
        }, z = function() {
            p.data.length = 0;
            p = null
        };
        w();
        j.destroy = z;
        j.userCard = d;
        j.hideCard = r;
        j.showCard = q;
        return j
    }
});
STK.register("common.dialog.setGroup", function(a) {
    var b = 30, c = !1, d = "http://rs.sinajs.cn/sgmark.gif";
    return function() {
        var e = {}, f = a.kit.extra.language, g = a.ui.dialog({isHold: !0}), h = a.ui.alert, i = {groupBox: '<div class="layer_setup_followlists follow_success" node-type="group_panel" ><input type="hidden" node-type="uid" name="touid"><div class="lsfl_Tit form_table_single" node-type="remarkPanel">#L{备注名称：}<input node-type="remarkInput" type="text" value="#L{设置备注}" class="W_input" name="remark"><div class="M_notice_del" style="display:none;"><span class="icon_del"></span>#L{备注姓名是非法的}</div></div><div class="lsfl_gTit clearfix"><div class="left" node-type="message"></div><div class="right W_textb" action-type="tipsLayer"><span class="icon_askS"></span>#L{为什么要设置分组？}<div class="layer_tips" node-type="groupTips" style="display: none;"><ul><li>#L{可以在首页查看设定分组的微博} </li><li>#L{将已经关注的人设置分组，方便管理}</li><li>#L{分组信息是保密的，只有自己可见}</li></ul><span style="left:180px" class="arrow_up"></span></div></div></div><div><div class="W_loading" node-type="loading"><span>#L{正在加载，请稍候...}</span></div><div node-type="groupList"></div></div><div node-type="addGroupPanel"><div class="lsfl_addNew" node-type="showBtnBox"><a class="addnew" href="javascript:;" action-type="showBtn" suda-uatrack="key=group_aftermark&value=new"><span class="ico_addinv"></span><span class="txt">#L{创建新分组}</span></a></div><div class="lsfl_creaNew form_table_single" node-type="addGroupBox" style="display:none;"><input node-type="groupInput" type="text" value="#L{新分组}" class="W_input"><div style="display:none;" node-type="errorTips" class="M_notice_del"><span class="icon_del"></span></div><a href="javascript:;" class="W_btn_a btn_noloading" action-type="addGroup" node-type="addGroup"><span><b class="loading"></b><em node-type="createBtnTxt">#L{创建}</em></span></a><a href="javascript:;" action-type="hideBtn">#L{取消}</a></div></div><div class="btn"><a href="javascript:;" class="W_btn_a btn_noloading" action-type="submit" node-type="submit"><span><b class="loading"></b><em node-type="btnText">#L{保存}</em></span></a><a href="javascript:;" class="W_btn_b" action-type="cancel" suda-uatrack="key=group_aftermark&value=close"><span>#L{取消}</span></a></div></div>',checkBox: '<input type="checkbox" value="{value}" name="gid" class="W_checkbox" {checked} id="group_{groupId}"><label for="group_{groupId}">{name}</label>',recommend: '<div class="btn"><input type="checkbox" class="W_checkbox" id="id_all" node-type="nomore_appear"><label class="check_all" for="id_all"  >' + f("#L{7天内不再出现}") + "</label>" + '<a class="W_btn_a" href="javascript:void(0);" node-type="innerclose"><span>' + f("#L{关闭}") + "</span></a>" + "  </div>"}, j = {title: "#L{关注成功}",gEmpty: "#L{分组名不能为空}",rEmpty: "#L{备注名不能为空}",gMaxLen: "#L{请不要超过16个字符}",gDefVal: "#L{新分组}",okLabel: "#L{设置成功}",rDefVal: "#L{设置备注}",message: '#L{为   <span class="W_fb">#{nickName\\}</span>  选择分组}',repeat: "#L{此分组名已存在}"}, k = !1, l = [], m = 0, n = a.common.relation.closeFriend, o, p, q, r, s, t, u, v, w, x, y, z = {cfSuc_1: f("#L{密友邀请已经发送，请等待对方接受}"),cfSuc_2: f("#L{你已经成功添加对方为密友，你们彼此已经是密友啦}"),cfSucTit_1: f("#L{需要对方通过邀请才能加为密友}")}, A = function() {
            q.remarkInput.value = f(j.rDefVal);
            q.groupInput.value = f(j.gDefVal);
            q.loading.style.display = "";
            q.groupList.innerHTML = "";
            q.showBtnBox.style.display = "";
            q.addGroupBox.style.display = "none"
        }, B = function() {
            if (!c) {
                c = !0;
                a.common.trans.relation.getTrans("recommendfollow", {onSuccess: function(b) {
                        if (!!b.data) {
                            var d = b.data + i.recommend, e = a.ui.dialog({isHold: !0}), g = e.getInner();
                            window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack("user_aftermark", "close");
                            var h = a.core.str.leftB(o.fnick, 16);
                            a.core.str.bLength(h) < a.core.str.bLength(o.fnick) && (h += "...");
                            g.className = "layer_recommed clearfix";
                            a.insertHTML(g, d, "afterbegin");
                            var j = a.sizzle('[node-type="innerclose"]', g)[0];
                            e.setTitle("@" + (h || "TA") + f("#L{的粉丝还对下面的人感兴趣哦，去看看他们吧~}"));
                            e.show().setMiddle();
                            var k = e.getOuter();
                            k.setAttribute("ucardconf", "type=1");
                            var l, m = function(b) {
                                var c = a.fixEvent(b), d = c.target, e = d.getAttribute("usercard");
                                if (!!e) {
                                    l || (l = a.common.layer.userCard(d, {order: "t",zIndex: 10002}));
                                    l.showCard(d, e, c)
                                }
                            }, n = function(b) {
                                var c = a.fixEvent(b), d = c.target, e = d.getAttribute("usercard");
                                if (!!e) {
                                    l || (l = a.common.layer.userCard(d, {order: "t"}));
                                    l.hideCard(d, e, c)
                                }
                            };
                            a.addEvent(k, "mouseover", m);
                            a.addEvent(k, "mouseout", n);
                            var p = function() {
                                setTimeout(function() {
                                    c = !1
                                }, 3e3);
                                a.removeEvent(k, "mouseover", m);
                                a.removeEvent(k, "mouseout", n);
                                var b = a.sizzle('[node-type="nomore_appear"]', g)[0], d = 0;
                                if (b.checked) {
                                    d = 1;
                                    window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack("user_aftermark", "1")
                                }
                                a.custEvent.remove(e, "hide", p);
                                a.common.trans.relation.getTrans("closerecommend", {onSuccess: function(a) {
                                    },onFail: function() {
                                    },onError: function() {
                                    }}).request({recom_tip: d,cuid: $CONFIG.uid})
                            };
                            a.custEvent.add(e, "hide", p);
                            a.addEvent(j, "click", function() {
                                e.hide()
                            })
                        }
                    },onFail: function() {
                    },onError: function() {
                    }}).request({cuid: $CONFIG.uid,fuid: o.uid})
            }
        }, C = function(a, b) {
            var c, d;
            if (a == "addGroup") {
                c = f("#L{创建}");
                d = "createBtnTxt"
            } else {
                c = f("#L{保存}");
                d = "btnText"
            }
            if (b == "normal") {
                q[a].className = "W_btn_a btn_noloading";
                q[d].innerHTML = c
            } else {
                q[a].className = "W_btn_a_disable";
                q[d].innerHTML = f("#L{保存中...}")
            }
        }, D = function(b) {
            A();
            o = a.parseParam({uid: "",fnick: "",sex: "m",hasRemark: !0,fromFollow: !1,groupList: [],title: f(j.title),successCb: function() {
                },cancelCb: function() {
                }}, b);
            b.tarEl && (o = a.common.getDiss(o, b.tarEl));
            w = o.successCb;
            x = o.cancelCb;
            q.uid.value = o.uid;
            if (o.hasRemark) {
                q.remarkInput.removeAttribute("disabled");
                q.remarkPanel.style.display = ""
            } else {
                q.remarkInput.setAttribute("disabled", "disabled");
                q.remarkPanel.style.display = "none"
            }
            o.groupList.length ? J(o.groupList) : L.request({uid: o.uid});
            q.message.innerHTML = f(j.message, {nickName: o.fnick});
            g.setTitle(o.title);
            g.appendChild(q.group_panel);
            g.show().setMiddle()
        }, E = function(b) {
            if (!!b) {
                if (o && o.fromFollow != !0)
                    return;
                var c = parseInt(Math.random() * 1e4), e = a.C("img");
                e.src = d + "?n=" + b.allGroup + "_" + b.autoSelect + "&gid=" + b.gid.join(",") + "&uid=" + b.uid + "&rd=" + c;
                document.body.appendChild(e);
                setTimeout(function() {
                    e.parentNode.removeChild(e)
                }, 3e3)
            }
        }, F = function(a) {
            var a = a || {};
            g.hide()
        }, G = {defVal: f(j.gDefVal),check: function(b) {
                var c = "";
                b === "" || b === this.defVal ? c = j.gEmpty : a.core.str.bLength(b) > 16 && (c = j.gMaxLen);
                return f(c)
            },checkRepeat: function(a) {
                var b = "";
                for (var c = l.length; c--; )
                    if (a === l[c].gname) {
                        b = j.repeat;
                        break
                    }
                return f(b)
            },showError: function(a) {
                q.errorTips.innerHTML = '<span class="icon_del"></span>' + a;
                q.errorTips.style.display = ""
            },hideError: function() {
                q.errorTips.style.display = "none"
            }}, H = {defVal: f(j.rDefVal),check: function(b) {
                var c = "";
                b === "" ? c = j.rEmpty : a.core.str.bLength(b) > 16 && (c = j.gMaxLen);
                return f(c)
            },showError: function(a) {
            },hideError: function() {
            }}, I = function(b) {
            var c = a.C("li"), d = i.checkBox.replace(/\{value\}/g, b.gid).replace(/\{groupId\}/g, b.gid).replace(/\{name\}/g, b.gname).replace(/\{checked\}/g, b.belong ? "checked" : "");
            c.innerHTML = d;
            return c
        }, J = function(b) {
            l = b;
            q.addGroupPanel.style.display = b.length >= 20 ? "none" : "";
            a.common.trans.relation.request("checkcloserelation", {onSuccess: function(c, d) {
                    var e = c.data || {}, f = {data: b,cftype: e[o.uid] || 0,fnick: o.fnick,uid: o.uid};
                    p = a.common.group.groupListPanel(f);
                    q.groupList.appendChild(p.getOuter());
                    q.loading.style.display = "none"
                }}, {uid: o.uid})
        }, K = {errorCd: function(b, c) {
                if (b.code == "100096" || b.code == "100097" || b.code == "100098") {
                    var d = a.common.layer.vipError(b.code, {info: b.data.html,lbtnFunc: function() {
                            location.href = b.data.gurl
                        }});
                    a.custEvent.add(d, "hide", F)
                } else
                    a.ui.alert(b && b.msg || f("#L{保存失败！}"));
                C("submit", "normal")
            },getGroupSuccess: function(a, b) {
                var c = a.data || [];
                J(c)
            },setGroupSuccess: function(b, c) {
                C("submit", "normal");
                switch (y) {
                    case "add":
                        n.add({uid: o.uid,name: o.fnick,title: "#L{设置分组成功，同时邀请#{name\\}成为密友}",callback: function() {
                                B()
                            }});
                        break;
                    case "delete":
                        n.remove({uid: o.uid,name: o.fnick,sex: o.sex,callback: function() {
                                B()
                            }});
                        break;
                    default:
                        a.ui.litePrompt(f(j.okLabel), {type: "succM",timeout: "500"});
                        setTimeout(B, 550)
                }
                F();
                w(b, c)
            },setGroupError: function(a, b) {
                G.showError(a.msg)
            },addGroupSuccess: function(a, b) {
                C("addGroup", "normal");
                var c = a.data, d;
                q.addGroupPanel.style.display = c.length >= 20 ? "none" : "";
                for (var e in c)
                    if (c[e].belong === 1) {
                        d = c[e];
                        break
                    }
                d && l.push(d);
                p.add(d);
                Q.hideAddPanel();
                q.groupInput.value = f(j.gDefVal);
                p.length() >= 20 && (q.addGroupPanel.style.display = "none")
            }}, L = a.common.trans.group.getTrans("list", {onSuccess: K.getGroupSuccess,onError: K.errorCd}), M = a.common.trans.group.getTrans("update", {onSuccess: K.setGroupSuccess,onError: K.errorCd,onFail: K.errorCd}), N = a.common.trans.group.getTrans("batchSet", {onSuccess: K.setGroupSuccess,onError: K.errorCd}), O = a.common.trans.group.getTrans("add", {onSuccess: K.addGroupSuccess,onError: function(b, c) {
                C("addGroup", "normal");
                a.ui.alert(b.msg)
            }}), P = function(b) {
            var c = document.createTextNode(b), d = a.C("div");
            d.appendChild(c);
            var e = d.innerHTML;
            d = c = null;
            return e
        }, Q = {showAddPanel: function() {
                q.showBtnBox.style.display = "none";
                q.addGroupBox.style.display = "";
                q.groupInput.focus()
            },hideAddPanel: function() {
                q.showBtnBox.style.display = "";
                q.addGroupBox.style.display = "none";
                G.hideError();
                q.groupInput.value = G.defVal
            },addGroup: function() {
                var b = P(a.trim(q.groupInput.value)), c = G.check(b) || G.checkRepeat(b);
                if (c)
                    G.showError(c);
                else {
                    G.hideError();
                    C("addGroup", "loading");
                    O.request({name: b})
                }
            },submit: function() {
                var b = P(a.trim(q.groupInput.value)), c = G.checkRepeat(b);
                if (c)
                    G.showError(c);
                else {
                    var d = {};
                    k = !0;
                    G.hideError();
                    G.check(b) || (d.newgroup = b);
                    d.type = "s";
                    var e = p.getData();
                    y = e.isCfInvite;
                    var g = [], h = q.remarkInput.value;
                    h === f(j.rDefVal) && (h = "");
                    d.remark = h;
                    var i = q.uid.value;
                    d.user = i;
                    d.gid = a.jsonToStr(e);
                    if (e.suda_diss && o.fromFollow == !0) {
                        var l = e.suda_diss.suda, m = e.suda_diss.diss;
                        window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack("group_aftermark", "save:" + l.join(","))
                    }
                    C("submit", "loading");
                    M.request(d)
                }
            },cancel: function() {
                k = !1;
                F()
            },inputFocus: function(b) {
                return function(c) {
                    var c = a.fixEvent(c), d = c.target, e = d.value;
                    b.hideError();
                    e === b.defVal && (d.value = "")
                }
            },inputBlur: function(b) {
                return function(c) {
                    var c = a.fixEvent(c), d = c.target, e = a.trim(d.value);
                    e || (d.value = b.defVal)
                }
            },inputMaxLen: function(c) {
                var c = a.fixEvent(c), d = c.target, e = d.value, f = a.core.str.bLength(e);
                c.keyCode == "13" ? Q.submit() : f > b && (d.value = a.core.str.leftB(e, b))
            },showGroupTips: function() {
                q.groupTips.style.display = ""
            },hideGroupTips: function() {
                q.groupTips.style.display = "none"
            }}, R = function() {
            U();
            S();
            T()
        }, S = function() {
            var b = g.getDomList().close[0];
            b.setAttribute("suda-uatrack", "key=group_aftermark&value=close");
            a.custEvent.define(e, ["hide"]);
            r = a.core.evt.delegatedEvent(q.group_panel);
            s = Q.inputFocus(G);
            t = Q.inputBlur(G);
            u = Q.inputFocus(H);
            v = Q.inputBlur(H);
            a.addEvent(q.remarkInput, "focus", u);
            a.addEvent(q.remarkInput, "blur", v);
            a.addEvent(q.groupInput, "focus", s);
            a.addEvent(q.groupInput, "blur", t);
            a.addEvent(q.remarkInput, "keyup", Q.inputMaxLen);
            a.addEvent(q.groupInput, "keyup", Q.inputMaxLen);
            r.add("showBtn", "click", Q.showAddPanel);
            r.add("hideBtn", "click", Q.hideAddPanel);
            r.add("addGroup", "click", Q.addGroup);
            r.add("submit", "click", Q.submit);
            r.add("cancel", "click", Q.cancel);
            r.add("tipsLayer", "mouseover", Q.showGroupTips);
            r.add("tipsLayer", "mouseout", Q.hideGroupTips)
        }, T = function() {
            a.custEvent.add(g, "hide", function() {
                a.custEvent.fire(e, ["hide"]);
                k || x();
                var b = p.getData();
                b && b.suda_diss && E(b.suda_diss.diss)
            })
        }, U = function() {
            var b = a.core.dom.builder(f(i.groupBox));
            q = a.kit.dom.parseDOM(b.list)
        }, V = function() {
            a.custEvent.undefine(e, ["hide"]);
            a.removeEvent(q.remarkInput, "focus", u);
            a.removeEvent(q.remarkInput, "blur", v);
            a.removeEvent(q.groupInput, "focus", s);
            a.removeEvent(q.groupInput, "blur", t);
            a.removeEvent(q.remarkInput, "keyup", Q.inputMaxLen);
            a.removeEvent(q.groupInput, "keyup", Q.inputMaxLen);
            s = null;
            t = null;
            u = null;
            v = null;
            r && r.destroy()
        };
        R();
        e.show = D;
        e.hide = F;
        e.destroy = V;
        return e
    }
});
STK.register("common.relation.baseFollow", function(a) {
    var b = window.$CONFIG || {}, c = b.imgPath + "/style/images/common/transparent.gif";
    return function(b) {
        var d = {}, e = a.common.channel.relation, f = a.core.evt.delegatedEvent(b), g = a.common.relation.followPrototype, h = a.kit.extra.merge, i = a.kit.extra.language, j = a.common.dialog.setGroup(), k = {unFollowTips: i("#L{确认取消关注吗？}"),bothFollow: i("#L{互相关注}"),singleFollow: i("#L{已关注}")}, l = a.ui.tipConfirm({info: k.unFollowTips}), m = {follow: i('<div class="W_addbtn_even"><img src="' + c + '" title="#L{加关注}"' + 'class="icon_add {className}" alt=""/>{focDoc}<span class="W_vline">|</span>' + '<a class="S_link2" action-type="{actionType}" action-data="uid={uid}&fnick={fnick}&f=1&nogroup={nogroup}" href="javascript:void(0);"><em>#L{取消}</em></a>' + "</div>"),unFollow: i('<a action-type="follow" action-data="uid={uid}&fnick={fnick}&f=1&nogroup={nogroup}" href="javascript:void(0);" class="W_btn_d"><span>{followMe}<img class="icon_add addbtn_b" title="#L{加关注}" src="' + c + '">#L{加关注}</span>' + "</a>"),block: i('<div class="W_addbtn_even">#L{已加入黑名单}<span class="W_vline">|</span><a action-type="unBlock" action-data="uid={uid}&fnick={fnick}&f=1" href="javascript:void(0);" class="S_link2"><em>#L{解除}</em></a></div>'),loading: i('<b class="loading"></b>#L{加关注}'),followMe: i('<img class="icon_add addbtn_g" title="#L{加关注}" src="' + c + '">' + '<em class="vline"></em>')}, n = function(a, b) {
            b = b || {};
            var c = a;
            for (var d in b)
                c = c.replace("{" + d + "}", b[d]);
            return c
        }, o = function(c) {
            var d = a.core.dom.sizzle("a[action-data*=uid=" + c + "]", b)[0], e;
            if (!!d) {
                do {
                    var f = d.getAttribute("node-type");
                    if (f === "followBtnBox") {
                        e = d;
                        break
                    }
                    d = d.parentNode
                } while (d && d.tagName.toLowerCase() !== "body");
                return e
            }
        }, p = {followed: function(a) {
                var b = o(a.uid);
                if (!!b) {
                    var c = "addbtn_d", d = k.singleFollow, e = "unFollow", f = a.relation || {};
                    if (f.following && f.follow_me) {
                        c = "addbtn_c";
                        d = k.bothFollow;
                        e = "unFollow"
                    }
                    var g = n(m.follow, {className: c,focDoc: d,actionType: e,uid: a.uid,fnick: a.fnick,nogroup: a.nogroup || ""});
                    b.innerHTML = g || ""
                }
            },unFollow: function(a) {
                var b = o(a.uid);
                if (!!b) {
                    var c = a.relation || {}, d = n(m.unFollow, {followMe: c.follow_me ? m.followMe : "",uid: a.uid,fnick: a.fnick});
                    b.innerHTML = d
                }
            },blocked: function(a) {
                var b = o(a.uid);
                if (!!b) {
                    var c = n(m.block, {uid: a.uid,fnick: a.fnick});
                    b.innerHTML = c
                }
            }}, q = {followListener: function(a) {
                p.followed(a)
            },unFollowListener: function(a) {
                p.unFollow(a)
            },blockListener: function(a) {
                p.blocked(a)
            },unBlockListener: function(a) {
                p.unFollow(a)
            },removeFansListener: function(a) {
                var b = a.relation || {};
                b.following ? p.followed(a) : p.unFollow(a)
            }}, r = {follow: function(b) {
                var c = a.sizzle("span", b.el)[0];
                c.innerHTML = m.loading;
                var e = b.el.dataset && b.el.dataset.mark || b.el.getAttribute("data-mark") || "", f = {};
                e && (f = a.queryToJson(e));
                var h = a.common.getDiss(a.kit.extra.merge(a.kit.extra.merge({onSuccessCb: function(b) {
                        var c = {uid: b.uid,fnick: b.fnick,groupList: b.group,hasRemark: !0,nogroup: b.nogroup || "",fromFollow: !0};
                        a.custEvent.fire(d, "followSucc", c);
                        c.nogroup || j.show(c)
                    }}, b.data || {}), f), b.el);
                g.follow(h)
            },unFollow: function(b) {
                if (!b.data.nogroup) {
                    var c = b.data.fnick || i("#L{该用户}");
                    l.setInfo(i("#L{确定不再关注}") + c + "?");
                    l.setLayerXY(b.el);
                    l.aniShow();
                    l.okCallback = function() {
                        g.unFollow(a.common.getDiss(b.data, b.el))
                    }
                } else
                    g.unFollow(a.common.getDiss(b.data, b.el))
            },unBlock: function(b) {
                a.ui.confirm(i("#L{确认将此用户从你的黑名单中解除吗？}"), {OK: function() {
                        g.unBlock(b.data)
                    }})
            }}, s = function() {
            t();
            u()
        }, t = function() {
            e.register("block", q.blockListener);
            e.register("follow", q.followListener);
            e.register("unBlock", q.unBlockListener);
            e.register("unFollow", q.unFollowListener);
            e.register("removeFans", q.removeFansListener)
        }, u = function() {
            f.add("follow", "click", r.follow);
            f.add("unBlock", "click", r.unBlock);
            f.add("unFollow", "click", r.unFollow);
            a.custEvent.define(d, ["followSucc"])
        }, v = function(b) {
            if (!a.core.dom.isNode(b))
                throw "[STK.common.relation.baseFollow]:node is not a Node!"
        }, w = function() {
            f.destroy();
            j.destroy();
            e.remove("block", q.blockListener);
            e.remove("follow", q.followListener);
            e.remove("unBlock", q.unBlockListener);
            e.remove("unFollow", q.unFollowListener);
            e.remove("removeFans", q.removeFansListener);
            q = null
        };
        s();
        d.destroy = w;
        return d
    }
});
STK.register("common.feed.feedList.plugins.recommendFeed", function(a) {
    return function(b) {
        if (!b)
            a.log("recommendFeed: need object of the baseFeedList Class ");
        else {
            if (!b.getRecommend()[0]) {
                a.log("recommendFeed: need object of the baseFeedList Class ");
                return
            }
            var c = {}, d = a.common.dialog.setGroup(), e, f = b.getDEvent(), g, h, i, j, k = a.kit.extra.language, l = a.common.trans.feed, m = a.common.channel.relation, n = !1, o = {followed: k('<div node-type="followed" href="" class="W_btn_c"><span>#L{已关注}</span></div>'),layerTemp: k('<div style="position: absolute; display:none;" node-type="closeLayer" class="layer_menu_list"><ul><li><a action-type="closeRecommendByDay" href="javascript:void(0)" action-data="code=close" suda-data="key=tblog_feed_recommend&value=close_lose">#L{仅当天关闭}</a></li><li><a action-type="closeRecommendForever" href="javascript:void(0)" action-data="code=closeForever" suda-data="key=tblog_feed_recommend&value=close_forever">#L{永久关闭}</a></li></ul></div>')}, p = {create: function() {
                    j = a.kit.dom.parseDOM(a.core.dom.builder(o.layerTemp).list).closeLayer;
                    document.body.appendChild(j);
                    LEvent = a.delegatedEvent(j);
                    LEvent.add("closeRecommendByDay", "click", p.closeByDay);
                    LEvent.add("closeRecommendForever", "click", p.closeForever)
                },show: function(b) {
                    b.className = "W_ico12 icon_chooseup";
                    var c = a.core.dom.getSize(j), d = a.core.dom.getSize(i), e = a.core.dom.position(i);
                    a.setStyle(j, "top", e.t + d.height + "px");
                    a.setStyle(j, "left", e.l + d.width - c.width + "px");
                    j.style.display = "";
                    a.addEvent(document.body, "click", p.autoHide)
                },hide: function(b) {
                    j.style.display = "none";
                    b ? b.className = "W_ico12 icon_choose" : a.sizzle('[action-type="feed_recommend_close"]', i)[0].className = "W_ico12 icon_choose";
                    a.removeEvent(document.body, "click", p.autoHide)
                },autoHide: function() {
                    var b = a.core.evt.getEvent(), c = a.fixEvent(b);
                    !a.core.dom.contains(j, c.target) && !a.core.dom.contains(i, c.target) && c.target !== i && p.hide()
                },closeByDay: function(c) {
                    a.preventDefault();
                    p.hide();
                    a.removeNode(e);
                    a.custEvent.fire(b, "stopRecommendTip");
                    l.getTrans("closeRecommend", {onSuccess: function() {
                        },onError: function() {
                        }}).request(c.data);
                    t.destroy()
                },closeForever: function(c) {
                    a.preventDefault();
                    p.hide();
                    a.removeNode(e);
                    a.custEvent.fire(b, "stopRecommendTip");
                    l.getTrans("closeRecommend", {onSuccess: function() {
                        },onError: function() {
                        }}).request(c.data);
                    t.destroy()
                }}, q = {follow: function(b) {
                    a.preventDefault();
                    var c = b.el, e = a.kit.extra.merge({onSuccessCb: function(a) {
                            d.show({uid: a.uid,fnick: a.fnick,groupList: a.group,hasRemark: !0})
                        }}, b.data || {});
                    e = a.common.getDiss(e, b.el);
                    a.common.relation.followPrototype.follow(e)
                },refresh: function(c) {
                    a.preventDefault();
                    e = b.getRecommend()[0];
                    if (!n) {
                        n = !0;
                        l.getTrans("refreshRecommend", {onSuccess: function(b) {
                                e.innerHTML = a.builder(b.data.html).list.feed_list_recommend[0].innerHTML;
                                i = a.sizzle('[node-type="feed_recommend_close"]', e)[0];
                                n = !1
                            },onError: function(a) {
                                n = !1
                            }}).request({})
                    }
                },close: function(b) {
                    a.preventDefault();
                    t.build();
                    j || p.create();
                    j.style.display != "none" ? p.hide(b.el) : p.show(b.el)
                }}, r = function(b) {
                var c = a.core.dom.sizzle("[action-data*=uid=" + b + "]", e)[0];
                if (!!c)
                    return c
            }, s = {followListener: function(b) {
                    var c = r(b.uid);
                    if (!!c) {
                        c.style.display = "none";
                        var d = a.kit.dom.parentElementBy(c, e, function(a) {
                            if (a.getAttribute("node-type") == "followBtn")
                                return !0
                        });
                        a.sizzle('[node-type="followed"]', d)[0] || a.insertHTML(d, o.followed);
                        g = a.sizzle('[node-type="followed"]', d)[0];
                        a.core.dom.next(c).style.display = ""
                    }
                },unFollowListener: function(b) {
                    var c = r(b.uid);
                    if (!!c) {
                        g = a.sizzle('[node-type="followed"]', c.parentNode)[0];
                        g.style.display = "none";
                        c.style.display = ""
                    }
                }}, t = {init: function() {
                    t.build();
                    t.bind();
                    t.bindListener()
                },build: function() {
                    e = b.getRecommend()[0];
                    i = a.sizzle('[node-type="feed_recommend_close"]', e)[0]
                },bind: function() {
                    f.add("followBtn", "click", q.follow);
                    f.add("feed_recommend_fresh", "click", q.refresh);
                    f.add("feed_recommend_close", "click", q.close)
                },bindListener: function() {
                    m.register("follow", s.followListener);
                    m.register("unFollow", s.unFollowListener)
                },destroy: function() {
                    f.destroy();
                    LEvent.destroy();
                    g = null;
                    b = e = f = null;
                    m.remove("follow", s.followListener);
                    m.remove("unFollow", s.unFollowListener);
                    m = null
                }};
            t.init();
            c.destroy = t.destroy;
            return c
        }
    }
});
STK.register("common.feed.feedList.plugins.recommendTip", function(a) {
    return function(b) {
        var c = {}, d, e = 3e5, f = a.common.trans.feed, g = a.kit.extra.language, h = b.getDEvent(), i = $CONFIG.recfeed, j = !1;
        !i && !a.core.obj.isEmpty(b.getRecommend()) && (i = 1);
        var k = {yellowHTML: g('<a node-type="feed_list_newBar" action-type="moreRecommend" class="notes" href="javascript:void(0);" suda-data="key=tblog_feed_recommend&value=yellow_banner_click">#L{你关注的人还没有新微博，我们为你推荐了一些精彩微博　点击查看}</a>')}, l = {showTip: function() {
                d && clearInterval(d);
                b.getRecommend()[0] || i && (d = setInterval(function() {
                    b.removeTopNode();
                    b.clearNewBar();
                    var c = window.$CONFIG && $CONFIG.uid || "";
                    window.WBEXP && window.WBEXP.collect && window.WBEXP.collect({uid: c}, {src: "http://rs.sinajs.cn/wgzhttj.gif"});
                    a.insertHTML(b.getNode(), k.yellowHTML, "AfterBegin");
                    h.add("moreRecommend", "click", l.moreRecommend);
                    clearInterval(d)
                }, e))
            },stopTip: function() {
                d && clearInterval(d)
            },moreRecommend: function() {
                a.preventDefault();
                if (!j) {
                    j = !0;
                    f.getTrans("refreshRecommend", {onSuccess: function(c) {
                            b.removeTopNode();
                            b.clearNewBar();
                            a.insertHTML(b.getNode(), c.data.html, "AfterBegin");
                            h.remove("moreRecommend", "click", l.moreRecommend);
                            a.common.feed.feedList.plugins.recommendFeed(b);
                            l.showTip();
                            j = !1
                        },onError: function(a) {
                            j = !1
                        }}).request({})
                }
            }};
        a.custEvent.add(b, "showRecommendTip", l.showTip);
        a.custEvent.add(b, "stopRecommendTip", l.stopTip);
        c.destroy = function() {
            h.destroy();
            a.custEvent.remove(b, "showRecommendTip", l.showTip);
            a.custEvent.remove(b, "stopRecommendTip", l.stopTip);
            d && clearInterval(d);
            a.common.feed.feedList.plugins.recommendFeed.destroy()
        };
        return c
    }
});
STK.register("common.feed.feedList.plugins.recGroupMembers", function(a) {
    var b = a.common.feed.feedList.utils;
    return function(b) {
        if (!b)
            a.log("quote : need object of the baseFeedList Class");
        else {
            var c = {}, d, e, f, g, h = [], i, j, k, l = a.kit.extra.language, m = {suc: l("#L{已成功加入该分组}")}, n = {setCount: function() {
                    h = [];
                    for (var b = 0; e[b]; b++)
                        if (e[b].checked) {
                            var c = e[b].getAttribute("action-data"), d = a.core.json.queryToJson(c);
                            h.push(d.uid)
                        }
                    var j = h.length;
                    f.innerHTML = j;
                    j == e.length ? g.checked = !0 : g.checked = !1;
                    j > 0 ? a.core.dom.removeClassName(i, "W_btn_a_disable") : a.core.dom.addClassName(i, "W_btn_a_disable")
                },getNodes: function() {
                    e || (e = a.sizzle('input[action-type="selectOne"]', d));
                    f || (f = a.sizzle('[node-type="count"]', d)[0] || null);
                    g || (g = a.sizzle('[action-type="selectAll"]', d)[0] || null);
                    i || (i = a.sizzle('[action-type="addToGroup"]', d)[0] || null);
                    if (!j) {
                        var b = a.historyM ? a.historyM.parseURL() : a.core.str.parseURL(location.href), c = a.core.json.queryToJson(b.query);
                        j = c.gid || ""
                    }
                }}, o = {selectOne: function(a) {
                    n.getNodes();
                    n.setCount()
                },selectAll: function(a) {
                    n.getNodes();
                    if (g.checked)
                        for (var b = 0; e[b]; b++)
                            e[b].checked = !0;
                    else
                        for (var b = 0; e[b]; b++)
                            e[b].checked = !1;
                    n.setCount()
                },addToGroup: function(b) {
                    if (!!h[0]) {
                        var c = a.common.trans.group;
                        c.getTrans("update", {onSuccess: function(c, d) {
                                var e, f = a.ui.tipAlert({showCallback: function() {
                                        e = setTimeout(function() {
                                            f && f.anihide();
                                            window.location.reload()
                                        }, 2e3)
                                    },hideCallback: function() {
                                        f && f.destroy();
                                        f = null
                                    },msg: m.suc});
                                f.setLayerXY(b.el);
                                f.aniShow()
                            },onError: function(b, c) {
                                a.ui.alert(b.msg, {})
                            }}).request({gid: '["' + j + '"]',type: "m",user: '["' + h.join('","') + '"]'})
                    }
                }}, p = function() {
                k.add("selectOne", "click", o.selectOne);
                k.add("selectAll", "click", o.selectAll);
                k.add("addToGroup", "click", o.addToGroup)
            }, q = function() {
                k = b.getDEvent();
                d = b.getNode();
                nodes = b.getNodeList();
                p()
            };
            q();
            var r = function() {
                k.remove("selectOne", "click", o.selectOne);
                k.remove("selectAll", "click", o.selectAll);
                k.remove("addToGroup", "click", o.addToGroup);
                k.destroy();
                e = null;
                f = null;
                i = null;
                g = null
            };
            c.destroy = r;
            return c
        }
    }
});
STK.register("kit.extra.crc32", function(a) {
    return function(a, b) {
        function c(a) {
            a = a.replace(/\r\n/g, "\n");
            var b = "";
            for (var c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                if (d < 128)
                    b += String.fromCharCode(d);
                else if (d > 127 && d < 2048) {
                    b += String.fromCharCode(d >> 6 | 192);
                    b += String.fromCharCode(d & 63 | 128)
                } else {
                    b += String.fromCharCode(d >> 12 | 224);
                    b += String.fromCharCode(d >> 6 & 63 | 128);
                    b += String.fromCharCode(d & 63 | 128)
                }
            }
            return b
        }
        a = c(a);
        var d = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D", b;
        typeof b == "undefined" && (b = 0);
        var e = 0, f = 0;
        b = b ^ -1;
        for (var g = 0, h = a.length; g < h; g++) {
            f = (b ^ a.charCodeAt(g)) & 255;
            e = "0x" + d.substr(f * 9, 8);
            b = b >>> 8 ^ e
        }
        var i = b ^ -1;
        i < 0 && (i = 4294967296 + i);
        return i
    }
});
STK.register("common.extra.imageURL", function(a) {
    return function(b, c) {
        function f(a) {
            a = (a + "").replace(/[^a-f0-9]/gi, "");
            return parseInt(a, 16)
        }
        var d = {size: "small"};
        if (typeof b == "string") {
            d = a.core.obj.parseParam(d, c);
            var e = d.size, g = {ss: {middle: "&690",bmiddle: "&690",small: "&690",thumbnail: "&690",square: "&690",orignal: "&690",thumb180: "&690"},ww: {middle: "bmiddle",large: "large",bmiddle: "bmiddle",small: "small",thumbnail: "thumbnail",square: "square",orignal: "large",thumb180: "thumb180"}}, h = b.charAt(9) == "w", i = b.charAt(21) == "g" ? ".gif" : ".jpg", j = h ? a.kit.extra.crc32(b) % 4 + 1 : f(b.substr(19, 2)) % 16 + 1, k = "http://" + (h ? "ww" : "ss") + j + ".sinaimg.cn/" + (h ? g.ww[e] : e) + "/" + b + (h ? i : "") + (h ? "" : g.ss[e]);
            return k
        }
    }
});
STK.register("ui.mod.tab", function(a) {
    return function(b, c) {
        function u(b, c) {
            var e = {evtType: "click",tNodes: "",dNodes: "",className: "cur",addClassNames: "",removeClassNames: "",cb: function() {
                },defaultIdx: 0};
            e = a.core.obj.parseParam(e, c);
            l = e.cb;
            n = e.className;
            p = e.defaultIdx;
            q = e.removeClassNames;
            r = e.addClassNames;
            m = e.evtType;
            j = typeof e.tNodes == "string" ? a.sizzle(e.tNodes, b) : e.tNodes;
            o = j.length;
            if (e.dNodes !== "") {
                k = typeof e.dNodes == "string" ? a.sizzle(e.dNodes, b) : e.dNodes;
                t()
            }
            for (var f = 0; f < o; f++)
                d(j[f], m, function(a) {
                    return function() {
                        h();
                        s(a)
                    }
                }(f))
        }
        function t() {
            if (!g(j))
                throw "ui.mod.tab needs tNodes as Array!";
            if (!g(k))
                throw "ui.mod.tab needs tNodes as Array!";
            if (j.length != k.length)
                throw "ui.mod.tab needs tNodes'length equal to dNodes'length!"
        }
        function s(a) {
            var b = g(l) ? l[a] : l, c = j[a], d = g(k) ? k[a] : null, h = j[p], m = g(k) ? k[p] : null;
            if (d) {
                i(k[p], "display", "none");
                i(k[a], "display", "")
            }
            if (!q && !r) {
                f(j[p], n);
                e(j[a], n)
            } else {
                j[p].className = q;
                j[a].className = r
            }
            if (a != p) {
                b({idx: a,node: d});
                p = a
            }
        }
        var d = a.core.evt.addEvent, e = a.core.dom.addClassName, f = a.core.dom.removeClassName, g = a.core.arr.isArray, h = a.core.evt.preventDefault, i = a.core.dom.setStyle, j, k, l, m, n, o, p, q, r, v = {};
        v.initView = function(a) {
            a = a || c.defaultIdx;
            i(k[a], "display", "");
            e(j[a], n);
            var b = g(l) ? l[a] : l, d = g(k) ? k[a] : null;
            b({idx: a,node: d});
            p = a
        };
        v.refresh = function(b) {
            j[b] && a.fireEvent(j[b], "click")
        };
        u(b, c);
        return v
    }
});
STK.register("kit.extra.swfobject", function(a) {
    var b = function() {
        function W(b) {
            var c = /[\\\"<>\.;]/, d = c.exec(b) != null;
            return d && typeof encodeURIComponent != a ? encodeURIComponent(b) : b
        }
        function V(a, b) {
            if (!!y) {
                var c = b ? "visible" : "hidden";
                u && Q(a) ? Q(a).style.visibility = c : U("#" + a, "visibility:" + c)
            }
        }
        function U(b, d, e, f) {
            if (!z.ie || !z.mac) {
                var g = j.getElementsByTagName("head")[0];
                if (!g)
                    return;
                var h = e && typeof e == "string" ? e : "screen";
                if (f) {
                    w = null;
                    x = null
                }
                if (!w || x != h) {
                    var i = R("style");
                    i.setAttribute("type", "text/css");
                    i.setAttribute("media", h);
                    w = g.appendChild(i);
                    z.ie && z.win && typeof j.styleSheets != a && j.styleSheets.length > 0 && (w = j.styleSheets[j.styleSheets.length - 1]);
                    x = h
                }
                z.ie && z.win ? w && typeof w.addRule == c && w.addRule(b, d) : w && typeof j.createTextNode != a && w.appendChild(j.createTextNode(b + " {" + d + "}"))
            }
        }
        function T(a) {
            var b = z.pv, c = a.split(".");
            c[0] = parseInt(c[0], 10);
            c[1] = parseInt(c[1], 10) || 0;
            c[2] = parseInt(c[2], 10) || 0;
            return b[0] > c[0] || b[0] == c[0] && b[1] > c[1] || b[0] == c[0] && b[1] == c[1] && b[2] >= c[2] ? !0 : !1
        }
        function S(a, b, c) {
            a.attachEvent(b, c);
            p[p.length] = [a, b, c]
        }
        function R(a) {
            return j.createElement(a)
        }
        function Q(a) {
            var b = null;
            try {
                b = j.getElementById(a)
            } catch (c) {
            }
            return b
        }
        function P(a) {
            var b = Q(a);
            if (b) {
                for (var c in b)
                    typeof b[c] == "function" && (b[c] = null);
                b.parentNode.removeChild(b)
            }
        }
        function O(a) {
            var b = Q(a);
            if (b && b.nodeName == "OBJECT")
                if (z.ie && z.win) {
                    b.style.display = "none";
                    (function() {
                        b.readyState == 4 ? P(a) : setTimeout(arguments.callee, 10)
                    })()
                } else
                    b.parentNode.removeChild(b)
        }
        function N(a, b, c) {
            var d = R("param");
            d.setAttribute("name", b);
            d.setAttribute("value", c);
            a.appendChild(d)
        }
        function M(b, d, e) {
            var g, h = Q(e);
            if (z.wk && z.wk < 312)
                return g;
            if (h) {
                typeof b.id == a && (b.id = e);
                if (z.ie && z.win) {
                    var i = "";
                    for (var j in b)
                        b[j] != Object.prototype[j] && (j.toLowerCase() == "data" ? d.movie = b[j] : j.toLowerCase() == "styleclass" ? i += ' class="' + b[j] + '"' : j.toLowerCase() != "classid" && (i += " " + j + '="' + b[j] + '"'));
                    var k = "";
                    for (var l in d)
                        d[l] != Object.prototype[l] && (k += '<param name="' + l + '" value="' + d[l] + '" />');
                    h.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + i + ">" + k + "</object>";
                    o[o.length] = b.id;
                    g = Q(b.id)
                } else {
                    var m = R(c);
                    m.setAttribute("type", f);
                    for (var n in b)
                        b[n] != Object.prototype[n] && (n.toLowerCase() == "styleclass" ? m.setAttribute("class", b[n]) : n.toLowerCase() != "classid" && m.setAttribute(n, b[n]));
                    for (var p in d)
                        d[p] != Object.prototype[p] && p.toLowerCase() != "movie" && N(m, p, d[p]);
                    h.parentNode.replaceChild(m, h);
                    g = m
                }
            }
            return g
        }
        function L(a) {
            var b = R("div");
            if (z.win && z.ie)
                b.innerHTML = a.innerHTML;
            else {
                var d = a.getElementsByTagName(c)[0];
                if (d) {
                    var e = d.childNodes;
                    if (e) {
                        var f = e.length;
                        for (var g = 0; g < f; g++)
                            (e[g].nodeType != 1 || e[g].nodeName != "PARAM") && e[g].nodeType != 8 && b.appendChild(e[g].cloneNode(!0))
                    }
                }
            }
            return b
        }
        function K(a) {
            if (z.ie && z.win && a.readyState != 4) {
                var b = R("div");
                a.parentNode.insertBefore(b, a);
                b.parentNode.replaceChild(L(a), b);
                a.style.display = "none";
                (function() {
                    a.readyState == 4 ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
                })()
            } else
                a.parentNode.replaceChild(L(a), a)
        }
        function J(b, c, d, e) {
            v = !0;
            s = e || null;
            t = {success: !1,id: d};
            var f = Q(d);
            if (f) {
                if (f.nodeName == "OBJECT") {
                    q = L(f);
                    r = null
                } else {
                    q = f;
                    r = d
                }
                b.id = g;
                if (typeof b.width == a || !/%$/.test(b.width) && parseInt(b.width, 10) < 310)
                    b.width = "310";
                if (typeof b.height == a || !/%$/.test(b.height) && parseInt(b.height, 10) < 137)
                    b.height = "137";
                j.title = j.title.slice(0, 47) + " - Flash Player Installation";
                var h = z.ie && z.win ? "ActiveX" : "PlugIn", k = "MMredirectURL=" + i.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + h + "&MMdoctitle=" + j.title;
                typeof c.flashvars != a ? c.flashvars += "&" + k : c.flashvars = k;
                if (z.ie && z.win && f.readyState != 4) {
                    var l = R("div");
                    d += "SWFObjectNew";
                    l.setAttribute("id", d);
                    f.parentNode.insertBefore(l, f);
                    f.style.display = "none";
                    (function() {
                        f.readyState == 4 ? f.parentNode.removeChild(f) : setTimeout(arguments.callee, 10)
                    })()
                }
                M(b, c, d)
            }
        }
        function I() {
            return !v && T("6.0.65") && (z.win || z.mac) && !(z.wk && z.wk < 312)
        }
        function H(b) {
            var d = null, e = Q(b);
            if (e && e.nodeName == "OBJECT")
                if (typeof e.SetVariable != a)
                    d = e;
                else {
                    var f = e.getElementsByTagName(c)[0];
                    f && (d = f)
                }
            return d
        }
        function G() {
            var b = n.length;
            if (b > 0)
                for (var c = 0; c < b; c++) {
                    var d = n[c].id, e = n[c].callbackFn, f = {success: !1,id: d};
                    if (z.pv[0] > 0) {
                        var g = Q(d);
                        if (g)
                            if (T(n[c].swfVersion) && !(z.wk && z.wk < 312)) {
                                V(d, !0);
                                if (e) {
                                    f.success = !0;
                                    f.ref = H(d);
                                    e(f)
                                }
                            } else if (n[c].expressInstall && I()) {
                                var h = {};
                                h.data = n[c].expressInstall;
                                h.width = g.getAttribute("width") || "0";
                                h.height = g.getAttribute("height") || "0";
                                g.getAttribute("class") && (h.styleclass = g.getAttribute("class"));
                                g.getAttribute("align") && (h.align = g.getAttribute("align"));
                                var i = {}, j = g.getElementsByTagName("param"), k = j.length;
                                for (var l = 0; l < k; l++)
                                    j[l].getAttribute("name").toLowerCase() != "movie" && (i[j[l].getAttribute("name")] = j[l].getAttribute("value"));
                                J(h, i, d, e)
                            } else {
                                K(g);
                                e && e(f)
                            }
                    } else {
                        V(d, !0);
                        if (e) {
                            var m = H(d);
                            if (m && typeof m.SetVariable != a) {
                                f.success = !0;
                                f.ref = m
                            }
                            e(f)
                        }
                    }
                }
        }
        function F() {
            var b = j.getElementsByTagName("body")[0], d = R(c);
            d.setAttribute("type", f);
            var e = b.appendChild(d);
            if (e) {
                var g = 0;
                (function() {
                    if (typeof e.GetVariable != a) {
                        var c = e.GetVariable("$version");
                        if (c) {
                            c = c.split(" ")[1].split(",");
                            z.pv = [parseInt(c[0], 10), parseInt(c[1], 10), parseInt(c[2], 10)]
                        }
                    } else if (g < 10) {
                        g++;
                        setTimeout(arguments.callee, 10);
                        return
                    }
                    b.removeChild(d);
                    e = null;
                    G()
                })()
            } else
                G()
        }
        function E() {
            l ? F() : G()
        }
        function D(b) {
            if (typeof i.addEventListener != a)
                i.addEventListener("load", b, !1);
            else if (typeof j.addEventListener != a)
                j.addEventListener("load", b, !1);
            else if (typeof i.attachEvent != a)
                S(i, "onload", b);
            else if (typeof i.onload == "function") {
                var c = i.onload;
                i.onload = function() {
                    c();
                    b()
                }
            } else
                i.onload = b
        }
        function C(a) {
            u ? a() : m[m.length] = a
        }
        function B() {
            if (!u) {
                try {
                    var a = j.getElementsByTagName("body")[0].appendChild(R("span"));
                    a.parentNode.removeChild(a)
                } catch (b) {
                    return
                }
                u = !0;
                var c = m.length;
                for (var d = 0; d < c; d++)
                    m[d]()
            }
        }
        var a = "undefined", c = "object", d = "Shockwave Flash", e = "ShockwaveFlash.ShockwaveFlash", f = "application/x-shockwave-flash", g = "SWFObjectExprInst", h = "onreadystatechange", i = window, j = document, k = navigator, l = !1, m = [E], n = [], o = [], p = [], q, r, s, t, u = !1, v = !1, w, x, y = !0, z = function() {
            var b = typeof j.getElementById != a && typeof j.getElementsByTagName != a && typeof j.createElement != a, g = k.userAgent.toLowerCase(), h = k.platform.toLowerCase(), m = h ? /win/.test(h) : /win/.test(g), n = h ? /mac/.test(h) : /mac/.test(g), o = /webkit/.test(g) ? parseFloat(g.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1, p = !1, q = [0, 0, 0], r = null;
            if (typeof k.plugins != a && typeof k.plugins[d] == c) {
                r = k.plugins[d].description;
                if (r && (typeof k.mimeTypes == a || !k.mimeTypes[f] || !!k.mimeTypes[f].enabledPlugin)) {
                    l = !0;
                    p = !1;
                    r = r.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    q[0] = parseInt(r.replace(/^(.*)\..*$/, "$1"), 10);
                    q[1] = parseInt(r.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    q[2] = /[a-zA-Z]/.test(r) ? parseInt(r.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                }
            } else if (typeof i.ActiveXObject != a)
                try {
                    var s = new ActiveXObject(e);
                    if (s) {
                        r = s.GetVariable("$version");
                        if (r) {
                            p = !0;
                            r = r.split(" ")[1].split(",");
                            q = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)]
                        }
                    }
                } catch (t) {
                }
            return {w3: b,pv: q,wk: o,ie: p,win: m,mac: n}
        }(), A = function() {
            if (!!z.w3) {
                (typeof j.readyState != a && j.readyState == "complete" || typeof j.readyState == a && (j.getElementsByTagName("body")[0] || j.body)) && B();
                if (!u) {
                    typeof j.addEventListener != a && j.addEventListener("DOMContentLoaded", B, !1);
                    if (z.ie && z.win) {
                        j.attachEvent(h, function() {
                            if (j.readyState == "complete") {
                                j.detachEvent(h, arguments.callee);
                                B()
                            }
                        });
                        i == top && function() {
                            if (!u) {
                                try {
                                    j.documentElement.doScroll("left")
                                } catch (a) {
                                    setTimeout(arguments.callee, 0);
                                    return
                                }
                                B()
                            }
                        }()
                    }
                    z.wk && function() {
                        if (!u) {
                            if (!/loaded|complete/.test(j.readyState)) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            B()
                        }
                    }();
                    D(B)
                }
            }
        }(), X = function() {
            z.ie && z.win && window.attachEvent("onunload", function() {
                var a = p.length;
                for (var c = 0; c < a; c++)
                    p[c][0].detachEvent(p[c][1], p[c][2]);
                var d = o.length;
                for (var e = 0; e < d; e++)
                    O(o[e]);
                for (var f in z)
                    z[f] = null;
                z = null;
                for (var g in b)
                    b[g] = null;
                b = null
            })
        }();
        return {registerObject: function(a, b, c, d) {
                if (z.w3 && a && b) {
                    var e = {};
                    e.id = a;
                    e.swfVersion = b;
                    e.expressInstall = c;
                    e.callbackFn = d;
                    n[n.length] = e;
                    V(a, !1)
                } else
                    d && d({success: !1,id: a})
            },getObjectById: function(a) {
                if (z.w3)
                    return H(a)
            },embedSWF: function(b, d, e, f, g, h, i, j, k, l) {
                var m = {success: !1,id: d};
                if (z.w3 && !(z.wk && z.wk < 312) && b && d && e && f && g) {
                    V(d, !1);
                    C(function() {
                        e += "";
                        f += "";
                        var n = {};
                        if (k && typeof k === c)
                            for (var o in k)
                                n[o] = k[o];
                        n.data = b;
                        n.width = e;
                        n.height = f;
                        var p = {};
                        if (j && typeof j === c)
                            for (var q in j)
                                p[q] = j[q];
                        if (i && typeof i === c)
                            for (var r in i)
                                typeof p.flashvars != a ? p.flashvars += "&" + r + "=" + i[r] : p.flashvars = r + "=" + i[r];
                        if (T(g)) {
                            var s = M(n, p, d);
                            n.id == d && V(d, !0);
                            m.success = !0;
                            m.ref = s
                        } else {
                            if (h && I()) {
                                n.data = h;
                                J(n, p, d, l);
                                return
                            }
                            V(d, !0)
                        }
                        l && l(m)
                    })
                } else
                    l && l(m)
            },switchOffAutoHideShow: function() {
                y = !1
            },ua: z,getFlashPlayerVersion: function() {
                return {major: z.pv[0],minor: z.pv[1],release: z.pv[2]}
            },hasFlashPlayerVersion: T,createSWF: function(a, b, c) {
                return z.w3 ? M(a, b, c) : undefined
            },showExpressInstall: function(a, b, c, d) {
                z.w3 && I() && J(a, b, c, d)
            },removeSWF: function(a) {
                z.w3 && O(a)
            },createCSS: function(a, b, c, d) {
                z.w3 && U(a, b, c, d)
            },addDomLoadEvent: C,addLoadEvent: D,getQueryParamValue: function(a) {
                var b = j.location.search || j.location.hash;
                if (b) {
                    /\?/.test(b) && (b = b.split("?")[1]);
                    if (a == null)
                        return W(b);
                    var c = b.split("&");
                    for (var d = 0; d < c.length; d++)
                        if (c[d].substring(0, c[d].indexOf("=")) == a)
                            return W(c[d].substring(c[d].indexOf("=") + 1))
                }
                return ""
            },expressInstallCallback: function() {
                if (v) {
                    var a = Q(g);
                    if (a && q) {
                        a.parentNode.replaceChild(q, a);
                        if (r) {
                            V(r, !0);
                            z.ie && z.win && (q.style.display = "block")
                        }
                        s && s(t)
                    }
                    v = !1
                }
            }}
    }();
    return b
});
STK.register("common.flash.imgUpload", function(a) {
    var b = document.documentElement, c = document.body, d = {getScroll: function() {
            var a, d, e, f;
            if (b && b.scrollTop) {
                a = b.scrollTop;
                d = b.scrollLeft;
                e = b.scrollWidth;
                f = b.scrollHeight
            } else if (c) {
                a = c.scrollTop;
                d = c.scrollLeft;
                e = c.scrollWidth;
                f = c.scrollHeight
            }
            return {t: a,l: d,w: e,h: f}
        },getScreen: function() {
            var c = {};
            if (a.IE) {
                c.w = b.clientWidth;
                c.h = b.clientHeight
            } else {
                c.w = window.innerWidth;
                c.h = window.innerHeight
            }
            return c
        }}, e = function(a) {
        var b = {cn: "zh_CN",tw: "zh_TW"};
        a = a.toLowerCase();
        a = a.replace(/zh-/g, "");
        return b[a]
    };
    return function(b, f) {
        var g = {version: $CONFIG.version,swf_path: $CONFIG.jsPath + "home/static/swf/img/",service: b.service,ed_swf: b.swf || "PhotoEditor.swf",exp_swf: "expressInstall.swf",h: b.h || 385,w: b.w || 528,f_version: "10.0.0",channel: b.id + "_channel",id_panel: b.id + "_panel",id_swf: b.id + "_swf"}, h = {}, i, j, k = {init: function() {
                f.init && f.init(h, b)
            },setHeight: function(b) {
                a.IE || (m.getFlash(g.id_swf).height = b)
            },upComplate: function(a) {
                b.sucess && b.sucess(a);
                i.style.display = "none";
                h.destory()
            },closeEditor: function() {
                i.style.display = "none";
                h.destory();
                f.close && f.close(h, b)
            },suda: function(a) {
                SUDA && SUDA.uaTrack && SUDA.uaTrack("meitu", "v4||" + a)
            }}, l = {version: g.version,language: e($CONFIG.lang),channel: g.channel,JSHandler: "STK.core.util.listener.fire",initFun: "init",changeFlashHeightFun: "setHeight",uploadCompleteFun: "upComplate",closePhotoEditorFun: "closeEditor",suda: "suda"}, m = {init: function() {
                if (!!b.id) {
                    i = a.E(g.id_panel);
                    j = a.E(g.id_swf);
                    if (!i) {
                        i = a.C("div");
                        i.id = g.id_panel;
                        c.appendChild(i)
                    }
                    if (!j) {
                        j = a.C("div");
                        j.id = g.id_swf;
                        i.appendChild(j)
                    }
                    i.style.display = "none";
                    m.getFlash(g.id_swf) || m.build()
                }
            },checkAction: function(a, b) {
                var c = STK.core.util.listener.list;
                return !!c[a] && !!c[a][b]
            },bindEvt: function(a) {
                for (var b in a)
                    k[a[b]] && !m.checkAction(g.channel, a[b]) && STK.core.util.listener.register(g.channel, a[b], k[a[b]])
            },build: function() {
                var c = b.baseDir ? b.baseDir + "/" : "", d = {menu: "true",scale: "noScale",allowFullscreen: "true",allowScriptAccess: "always",bgcolor: "#FFFFFF",wmode: a.IE ? "window" : "transparent",base: g.swf_path + c}, e = {id: b.id};
                m.bindEvt(l);
                a.kit.extra.swfobject.embedSWF(g.swf_path + c + g.ed_swf + "?version=" + g.version, g.id_swf, g.w, g.h, g.f_version, g.swf_path + g.exp_swf, l, d, e)
            },getFlash: function() {
                return navigator.appName.indexOf("Microsoft") != -1 ? window[b.id] : document[b.id]
            },setPos: function() {
                var c, e, f, h, j = d.getScroll(), k = d.getScreen();
                f = Math.round(g.h > k.h ? k.h / 5 + j.t : (k.h - g.h) / 2 + j.t);
                h = Math.round(g.w > k.w ? k.w / 5 + j.l : (k.w - g.w) / 2 + j.l);
                c = b.pos.t - 1 || f;
                e = b.pos.l || h;
                i.style.zIndex = b.zIndex || 2e4;
                a.setStyle(i, "position", "absolute");
                a.setStyle(i, "left", e + "px");
                a.setStyle(i, "top", c + "px");
                m.autoScroll(j.t, j.t + (c - f))
            },autoScroll: function(a, b, c) {
                var d, e, f, g = 8, h;
                g = c || g;
                h = a - b;
                e = [h];
                e[g] = 0;
                f = 1;
                for (f; f < g; f++)
                    e[f] = h = h / 2;
                clearInterval(d);
                d = setInterval(function() {
                    e.length ? window.scrollTo(0, b + e.shift()) : clearInterval(d)
                }, 30)
            }};
        h.show = function(a) {
            a && (b.id = a);
            i && (i.style.display = "");
            m.setPos();
            return this
        };
        h.hide = function() {
            i && (i.style.display = "");
            return this
        };
        h.setPars = function(a) {
            var b = {imageURL: a || "",uploadURL: g.service};
            m.getFlash(g.id_swf).editPhoto(b);
            return this
        };
        h.getSwf = m.getFlash;
        h.destory = function() {
            if (a.IE) {
                for (var b in l)
                    k[l[b]] && STK.core.util.listener.remove(g.channel, l[b], k[l[b]]);
                i.innerHTML = ""
            }
        };
        m.init();
        return h
    }
});
STK.register("kit.extra.watermark", function(a) {
    var b = {trans: null,conf: null,success: function(a, c) {
            b.conf = a.data
        }};
    return function(c) {
        if (typeof c == "function")
            if (b.conf)
                c(b.conf);
            else {
                b.trans || (b.trans = a.common.trans.editor.getTrans("waterMark", {onSuccess: function() {
                        b.success.apply(null, arguments);
                        c(b.conf)
                    },onError: a.funcEmpty,onFail: a.funcEmpty}));
                b.trans.abort();
                b.trans.request()
            }
    }
});
STK.register("kit.extra.upload", function(a) {
    var b = a.kit.extra.language;
    return function(c) {
        var d = {}, e = window.location.href, f;
        c = a.parseParam({type: "common",form: null,base64Str: "",imgName: "",uploadArgs: {}}, c);
        a.custEvent.define(d, ["uploadError", "uploadSucc"]);
        var g = {base64form: null,upload: function(b) {
                var d, e = b, h = "weibo.com/", i = window.$CONFIG, j = c.type;
                if (j === "common")
                    d = c.form;
                else if (j === "base64") {
                    d = a.C("form");
                    g.base64form = d;
                    d.method = "POST";
                    var k = a.C("input");
                    k.name = "b64_data";
                    k.type = "hidden";
                    k.value = c.base64Str;
                    d.appendChild(k);
                    document.body.appendChild(d)
                }
                var l = {marks: 1,app: "miniblog",s: "rdxt"};
                c.type === "common" || c.type === "base64" ? l = a.kit.extra.merge({url: e.domain == "1" ? h + (i && i.watermark || i.domain) : 0,markpos: e.position || "",logo: e.logo || "",nick: e.nickname == "1" ? "@" + (i && i.nick) : 0}, l) : c.type === "custom" && (l = a.kit.extra.merge(c.uploadArgs, l));
                j === "base64" && (l = a.kit.extra.merge({mime: "image/jpeg",data: "base64"}, l));
                f = a.core.io.ijax({url: "http://picupload.service.weibo.com/interface/pic_upload.php",form: d,abaurl: "http://" + document.domain + "/aj/static/upimgback.html",abakey: "cb",timeout: 18e5,onComplete: g.handle,onTimeout: g.handle,args: l})
            },sendError: function(b) {
                var c = new Image, d = encodeURIComponent(navigator.userAgent), f = window.$CONFIG, g = a.kit.extra.merge(b, {ua: d,rnd: (new Date).getTime(),uid: f ? f.uid : 0,referer: encodeURIComponent(e)});
                g = a.core.json.jsonToQuery(g);
                g = "http://ww1.sinaimg.cn/do_not_delete/fc.html?" + g;
                c.setAttribute("src", g)
            },handle: function(e) {
                a.removeNode(g.base64form);
                g.base64form = null;
                var f = Math.abs(e.ret);
                if (!e || e.ret < 0) {
                    var h = "";
                    switch (f) {
                        case 1:
                            h = "#L{没有登录}";
                            break;
                        case 4:
                        case 9:
                            h = "#L{请上传5M以内的JPG、GIF、PNG图片。}";
                            break;
                        default:
                            h = "#L{上传图片超时}"
                    }
                    e ? g.sendError({ret: e.ret}) : g.sendError({ret: "none"});
                    a.custEvent.fire(d, "uploadError", {code: f,msg: b(h)})
                } else {
                    var i = new Date, j = function(a) {
                        return a < 10 ? "0" + a : a
                    }, k;
                    if (c.type === "common")
                        k = c.imgName;
                    else if (c.type === "base64") {
                        var l = [i.getFullYear(), j(i.getMonth() + 1), j(i.getDate()), j(i.getHours()), j(i.getMinutes()), j(i.getSeconds())].join("");
                        k = b("#L{微博桌面截图}") + l + ".jpg"
                    }
                    a.custEvent.fire(d, "uploadSucc", {pid: e.pid,imgName: k})
                }
            },init: function() {
                c.type === "common" || c.type === "base64" ? a.kit.extra.watermark(function(a) {
                    g.upload(a)
                }) : g.upload()
            },destroy: function() {
                a.custEvent.undefine(d);
                a.removeNode(g.base64form)
            }};
        g.init();
        d.destroy = g.destroy;
        d.abort = function() {
            if (f)
                try {
                    f.abort()
                } catch (a) {
                }
        };
        return d
    }
});
STK.register("common.plugin.plugInstallState", function(a) {
    return function(b, c, d, e) {
        var f = {}, g = a.core.util.browser, h = window.navigator, i = a.IE, j = g.MOZ, k = g.OPERA, l = g.SAFARI, m = g.CHROME, n = g.Version, o = c.embedId, p = c.embedType, q = b.pluginName, r = b.activeXName;
        f.instance = e;
        var s = function() {
            var a;
            for (a = 0; a < d.length; a++)
                if (!(d.param[a] in f.instance))
                    break;
            return a < d.length - 1 ? !1 : !0
        };
        f.getInstallState = function() {
            if (i) {
                var b;
                if (!f.instance)
                    try {
                        f.instance = new ActiveXObject(r);
                        b = !0
                    } catch (c) {
                        f.instance = null
                    }
                if (f.instance) {
                    if (s())
                        return "ieinstalled";
                    if (!b)
                        try {
                            f.instance = new ActiveXObject(r)
                        } catch (c) {
                            f.instance = null
                        }
                    return f.instance ? s() ? "ieinstalled" : "ieneedUpdate" : "ieneedInstall"
                }
                return "ieneedInstall"
            }
            var d = h.plugins, e;
            if (d && d.length)
                for (var g = 0, j = d.length; g < j; g++) {
                    var k = d[g];
                    if (k && k.name && k.name === q) {
                        e = !0;
                        break
                    }
                }
            if (e) {
                if (!f.instance) {
                    var l = a.C("embed");
                    l.id = o;
                    l.type = p;
                    l.setAttribute("hidden", !0);
                    document.body.appendChild(l);
                    f.instance = l
                }
                return "installed"
            }
            f.instance = null;
            return "needInstall"
        };
        return f
    }
});
STK.register("common.plugin.screenCapture", function(a) {
    var b = a.core.util.browser, c = a.kit.extra.language, d = function(a, b) {
        window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack(a, b)
    }, e = a.IE, f = b.MOZ, g = b.OPERA, h = b.SAFARI, i = b.CHROME, j = b.Version, k = "weibo_screen_grab_download", l = {pluginName: "npScreenGrab Plugin",activeXName: "ScreenGrab.ScreenGrabCom.1"}, m = {embedId: "weibo_screen_grab_embed",embedType: "application/x-screengrab-sina"}, n = {param1: "OnGrapContent",param2: "CloseScreenGrabCtrlWnd",param3: "onmsgfireevent"}, o, p = {spec: null,setCurrentSpec: function(a) {
            p.spec = a
        },setup: function() {
            if (typeof o.OnGrapContent != "function") {
                o.OnGrapContent = function(a, b, c, d) {
                    var e = p.spec;
                    q.focusWindow();
                    if (a === 2) {
                        if (e.captureType === "base64")
                            e.captureSuccess(c);
                        else if (e.captureType === "pid") {
                            e.beforeUpload();
                            e.upload(c)
                        }
                    } else if (a === 3) {
                        q.focusWindow();
                        e.captureCancel()
                    }
                };
                o.onmsgfireevent = function(a, b) {
                    if (b === 2) {
                        q.focusWindow();
                        spec.captureCancel()
                    }
                };
                a.addEvent(window, "unload", function() {
                    a.removeEvent(window, "unload", arguments.callee);
                    if (o)
                        try {
                            o.CloseScreenGrabCtrlWnd();
                            o.onmsgfireevent = null;
                            o.OnGrapContent = null;
                            o = null
                        } catch (b) {
                        }
                })
            }
        }}, q = {};
    q.isSupport = function() {
        return b.OS === "windows" ? e ? !0 : f ? j >= 3.6 ? !0 : !1 : g ? !1 : h ? !1 : i ? j >= 4 ? !0 : !1 : !1 : !1
    };
    q.focusWindow = function() {
        window.focus()
    };
    q.hide = function() {
        o && o.CloseScreenGrabCtrlWnd()
    };
    q.screenCapture = function(b) {
        var g, h = {uploadSucc: function(a, c) {
                q.focusWindow();
                b.captureSuccess(c)
            },uploadErr: function(a, c) {
                b.captureError(c)
            }}, j = function(b) {
            g && g.destroy();
            g = a.kit.extra.upload({type: "base64",base64Str: b});
            a.custEvent.add(g, "uploadSucc", h.uploadSucc);
            a.custEvent.add(g, "uploadError", h.uploadErr)
        }, r = function() {
            b.upload = function(a) {
                j(a)
            };
            p.setup();
            p.setCurrentSpec(b);
            if (a.isArray(b.showPos)) {
                var c = b.showPos;
                o.ShowControlWnd(c[0], c[1], c[2], c[3])
            } else if (typeof b.showPos == "function") {
                var c = b.showPos();
                a.isArray(c) && o.ShowControlWnd(c[0], c[1], c[2], c[3])
            } else if (b.showPos === "center") {
                var d = a.scrollPos(), e = 200, f = 200, g = a.winSize(), h = Math.floor(d.top + (g.height - e) / 2), i = Math.floor(d.left + (g.width - f) / 2);
                o.ShowControlWnd(window.screenLeft + i, window.screenTop + h, f, e)
            } else
                b.showPos === "default" && o.ShowControlWnd(-1, -1, -1, -1)
        }, s = function(b, e) {
            var f = "http://desktop.weibo.com/download.php?source=jietu", g = '<#et screentip data><div class="layer_screenshot_tips"><p class="tip" style="width:338px"><span class="icon_warnM"></span>${data.titletip}。</p><div><a href="http://desktop.weibo.com" target="_blank"><img src="${data.imgsrc}" width="338" height="147"/></a></div><div class="btn"><a node-type="download" href="javascript:void(0)" class="W_btn_a"><span>${data.downloadTitle}</span></a><a node-type="nodownload" href="javascript:void(0)" class="W_btn_b"><span>#L{取消下载}</span></a></div></div></#et>', h = {imgsrc: (window.$CONFIG && window.$CONFIG.imgPath || "http://img.t.sinajs.cn/t4/") + "style/images/index/pic_screenshot.png?version=" + (window.$CONFIG && window.$CONFIG.version || ""),titletip: b === "IE" ? "#L{使用此功能，需要先安装微博桌面}" : "#L{使用此功能，需要先安装微博桌面插件}" + (b === "FF" ? "，#L{并重新启动浏览器才能使用}" : ""),downloadTitle: "#L{立即下载}"}, i = a.ui.dialog();
            i.setTitle(c("#L{截屏插件安装提示}"));
            i.setContent(c(a.core.util.easyTemplate(g, h).toString()));
            i.show();
            i.setMiddle();
            var j = a.kit.dom.parseDOM(a.builder(i.getInner()).list), l = function() {
                i.hide();
                d("tblog_image_cut", "cancel_download")
            }, m = function(b) {
                var c = a.E(k);
                if (!c) {
                    c = a.C("iframe");
                    c.id = k;
                    c.style.display = "none";
                    a.core.util.hideContainer.appendChild(c)
                }
                c.src = f;
                d("tblog_image_cut", "download");
                i.hide()
            };
            a.addEvent(j.download, "click", m);
            a.addEvent(j.nodownload, "click", l);
            a.custEvent.add(i, "hide", function() {
                a.custEvent.remove(i, "hide", arguments.callee);
                a.removeEvent(j.download, "click", m);
                a.removeEvent(j.nodownload, "click", l);
                e()
            })
        }, t = function() {
            b.beforeSupportTip();
            a.ui.alert(c("#L{微博截图功能暂未支持你的浏览器，目前微博截图插件支持Windows系统下的以下浏览器：IE浏览器，支持IE6及更新版本。IE内核浏览器，如360安全浏览器，傲游等浏览器。Firefox浏览器，支持3.6及更新版本。Chrome浏览器，支持4.0及更新版本。Chronium内核浏览器，如360急速浏览器，搜狗等浏览器}。"), {title: c("#L{暂不支持当前浏览器}"),OK: function() {
                    setTimeout(function() {
                        b.supportTipOk()
                    }, 0)
                }});
            d("tblog_image_cut", "not_support_browser")
        }, u = function() {
            var c = e ? "IE" : f ? "FF" : i ? "CHROME" : "";
            b = a.parseParam({captureType: "base64",captureSuccess: a.funcEmpty,captureCancel: a.funcEmpty,captureError: a.funcEmpty,beforeUpload: a.funcEmpty,showPos: "default",beforeSupportTip: a.funcEmpty,supportTip: t,supportTipOk: a.funcEmpty,beforeIeInstallTip: a.funcEmpty,ieInstallTip: function() {
                    b.beforeIeInstallTip();
                    s(c, b.ieInstallTipOk)
                },ieInstallTipOk: a.funcEmpty,beforeInstallTip: a.funcEmpty,installTip: function() {
                    b.beforeInstallTip();
                    s(c, b.installTipOk)
                },installTipOk: a.funcEmpty}, b || {});
            var d = q.isSupport();
            if (!d)
                b.supportTip();
            else {
                var g = a.common.plugin.plugInstallState(l, m, n, o), h = g.getInstallState();
                o = g.instance;
                h === "installed" || h === "ieinstalled" ? r() : h === "ieneedUpdate" || h === "ieneedInstall" ? b.ieInstallTip() : h === "needInstall" && b.installTip()
            }
        };
        return {doit: u,hide: q.hide,focusWindow: q.focusWindow,abort: function() {
                try {
                    g && g.abort()
                } catch (a) {
                }
            }}
    };
    return q
});
STK.register("kit.extra.getFlashVersion", function(a) {
    return function() {
        var a = "1", b = navigator;
        if (b.plugins && b.plugins.length) {
            for (var c = 0; c < b.plugins.length; c++)
                if (b.plugins[c] && b.plugins[c].name && b.plugins[c].name.indexOf("Shockwave Flash") != -1) {
                    a = b.plugins[c].description.split("Shockwave Flash ")[1];
                    break
                }
        } else if (window.ActiveXObject)
            for (var c = 10; c >= 2; c--)
                try {
                    var d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + c);
                    if (d) {
                        a = c + ".0";
                        break
                    }
                } catch (e) {
                }
        return parseInt(a.split(".")[0])
    }
});
STK.register("kit.extra.installFlash", function(a) {
    var b = a.kit.extra.language;
    return function(c) {
        c = a.parseParam({onHide: a.funcEmpty}, c);
        var d = '<div class="layer_version_upgrade"><dl class="point clearfix"><dt><span class="icon_versionup"></span></dt><dd><p class="S_txt1">#L{你的Flash版本过低，请安装更高版本的Flash插件后，再刷新页面重试}</p></dd></dl><div class="versionup_btn"><a class="btn_l" href="http://get.adobe.com/cn/flashplayer/" target="_blank"><img width="16" height="16" class="icon_install" title="" src="' + $CONFIG.imgPath + 'style/images/common/transparent.gif">' + '<span class="txt">#L{安装更新}</span></a><a class="btn_r" href="javascript:void(0);" onclick="window.location.reload()">' + ' <img width="16" height="16" class="icon_refreshpage" title="" src="' + $CONFIG.imgPath + 'style/images/common/transparent.gif">' + '<span class="txt">#L{刷新页面}</span></a></div>' + "</div>";
        a.kit.io.cssLoader("style/css/module/layer/layer_version_upgrade.css", "js_style_css_module_layer_layer_version_upgrade", function() {
            var e = a.ui.dialog();
            e.setTitle(b("#L{提示}"));
            var f = a.C("div");
            f.innerHTML = b(d);
            e.appendChild(f);
            f = null;
            e.show();
            e.setMiddle();
            a.custEvent.add(e, "hide", function() {
                a.custEvent.remove(e, "hide", arguments.callee);
                setTimeout(function() {
                    c.onHide()
                }, 0)
            })
        })
    }
});
STK.register("common.bubble.image", function(a) {
    var b = window.$CONFIG, c = [];
    (function() {
        b && b.bigpipe === "true" && a.historyM && a.historyM.onpopstate(function(b, d) {
            if (d) {
                a.foreach(c, function(a) {
                    a()
                });
                c = []
            }
        })
    })();
    return function(d, e) {
        var f, g = a.common.plugin.screenCapture, h = a.kit.extra.language, i = '<div node-type="outer"><div class="layer_send_pic" node-type="wrap"><div node-type="inner"><div class="profile_tab S_line5"><ul class="pftb_ul layer_tab S_line1"><li class="pftb_itm S_line1"><a class="pftb_lk current S_line5 S_txt1 S_bg5" href="javascript:void(0);" node-type="tab">#L{本地上传}</a></li><li class="pftb_itm pftb_itm_lst S_line1"><a  class="pftb_lk S_line5 S_txt1 S_bg1" href="javascript:void(0);" node-type="tab">#L{推荐配图}</a></li></ul></div><div node-type="content"></div></div><div node-type="uploaded" style="display:none"><div class="laPic_tit"><span node-type="pName"></span><span class="right"></span></div><div node-type="picWrap" class="laPic_Pic"></div><div class="lapic_edit"><a class="beautify" href="javascript:void(0);" node-type="beautify" action-type="beautify" suda-data="key=meitu&value=v4||publish||editor"><span class="W_ico12 icon_edit"></span>#L{编辑}</a><a class="delete" href="javascript:void(0);" action-type="delete"><span class="W_ico12 ico_del"></span>#L{删除}</a></div></div></div><div node-type="flashPanel"></div>', j = '<#et uppic data><div node-type="uppic">    <div class="laPic_btnBox clearfix">        <div class="laPic_btnmore">            <a href="javascript:void(0);" class="W_btn_e" node-type="inputCover">                <span><em class="ico_one"></em>#L{单张图片}</span>                <form node-type="form" action-type="form" id="pic_upload" name="pic_upload" target="upload_target" enctype="multipart/form-data" method="POST" action="">                    <input class="input_f" type="file" hidefoucs="true" style="" node-type="fileBtn" name="pic1"/>                </form></a>        </div>        <div class="laPic_btnmore">            <a href="javascript:void(0);" class="W_btn_e" action-type="more" suda-data="key=meitu&value=v4||publish||more">                <span><em class="ico_ones"></em>#L{多张图片}</span>            </a>        </div>        <#if (data.supportCapture)><div class="laPic_btnmore">            <a href="javascript:void(0);" class="W_btn_e" action-type="screen_window" suda-data="key=tblog_image_cut&value=open_image_cut">                <span><em class="ico_screenshot"></em>#L{截屏上传}</span>            </a>        </div></#if>       <div class="laPic_btnmore">           <a href="javascript:void(0);" class="W_btn_e" action-type="face_sticker">               <span><em class="ico_bigface"></em>#L{大 头 贴}</span>           </a>       </div>       <div class="laPic_btnmore">           <a href="javascript:void(0);" class="W_btn_e" action-type="upload_album">               <span><em class="ico_toalbum"></em>#L{上传到相册}</span>           </a>       </div>    </div></div><div node-type="loading"  style="width:230px;display:none"><div class="laPic_con"><div class="W_loading"><span>#L{图片正在上传，请等待}...</span></div></div><div class="laPic_btn"><a href="javascript:void(0);" class="W_btn_b" action-type="cancel"><span>#L{取消上传}</span></a></div></div></#et>', k = '<p class="tab_kind S_link2"><span class="right"><a class="pre_d" action-type="prev" node-type="prev" href="javascript:void(0);"></a><a class="next" action-type="next" node-type="next" href="javascript:void(0);"></a></span><em node-type="categorys"></em></p><div node-type="loading"></div><div class="detail"><ul node-type="list" class="faces_magic_list clearfix"></ul><div node-type="page" class="W_pages_minibtn"></div></div>', l = '<div class="W_loading"><span>正在加载，请稍候...</span></div>', m = '<a href="javascript:void(0);" onclick="return false;" action-type="category" action-data="category=#{item}">#{item}</a>', n = '<a href="javascript:void(0);"  onclick="return false;" action-type="category" action-data="category=#{item}" class="current S_txt1">#{item}</a>', o = '<li><a action-type="insertSmiley" action-data="url=#{thumb}&pid=#{picid}&value=#{value}" class="img" href="javascript:void(0);"><img src="#{thumb}" original="#{original}" title="#{value}" alt="#{phrase}" /></a><span title="#{value}"  action-type="insertSmiley" action-data="url=#{thumb}&pid=#{picid}&value=#{value}">#{phrase}</span></li>', p = '<a action-type="page" class="page S_bg1" action-data="num=#{number}" href="javascript:void(0);" >#{label}</a>', q = '<a action-type="page" action-data="num=#{number}" href="javascript:void(0);"  class="page S_txt1"  onclick="return false;">#{label}</a>', r = "", s = h("#L{默认}"), t = "#L{分享图片}", u = "##L{微博大头贴}#", v = 5, w = "weibo.com/", x, y, z, A, B, C, D, E, F, G, H, I, J = {}, K = {page: 0,cache: null,cPoniter: 0,categorys: [],currentCategory: s,itemNumber: 10}, L, M, N = a.core.dom.position, O = a.core.evt.addEvent, P = a.core.evt.removeEvent, Q = function() {
            z = R;
            a.custEvent.define(J, ["uploaded", "hide", "insert", "deletePIC", "picLoad"]);
            a.custEvent.add(f, "hide", function(b) {
                return function() {
                    R.abortUpload();
                    R.hideCapture();
                    a.custEvent.remove(b, "hide", arguments.callee);
                    a.custEvent.fire(J, "hide", {});
                    F = 0
                }
            }(f));
            a.ui.mod.tab(x, {evtType: "click",tNodes: '[node-type="tab"]',className: "current",removeClassNames: "pftb_lk S_line5 S_txt1 S_bg1",addClassNames: "pftb_lk current S_line5 S_txt1 S_bg5",cb: [R.init, S.init]});
            I = a.core.evt.delegatedEvent(x);
            R.bind()
        }, R = {abortUpload: function() {
                C && C.abort();
                D && D.abort()
            },init: function() {
                z = R;
                R.initDom();
                R.bind()
            },initDom: function() {
                var b;
                L.wrap.className = "layer_send_pic";
                var c = {supportCapture: !0};
                L.content.innerHTML = h(a.core.util.easyTemplate(j, c).toString());
                L.close = f.getDomList().close[0];
                b = a.kit.dom.parseDOM(a.core.dom.builder(x).list);
                L = a.kit.extra.merge(L, b);
                R.exchangeInput()
            },bind: function() {
                O(L.fileBtn, "change", T.upload);
                O(L.fileBtn, "click", R.hideCapture);
                I.add("delete", "click", R.deletePic);
                I.add("cancel", "click", R.cancelUpload);
                I.add("more", "click", R.morePic);
                I.add("beautify", "click", R.beautify);
                I.add("screen_window", "click", R.captureWindow);
                I.add("face_sticker", "click", R.faceSticker);
                I.add("upload_album", "click", R.uploadAblum)
            },destroy: function() {
                L.fileBtn && P(L.fileBtn, "click", R.hideCapture);
                L.fileBtn && P(L.fileBtn, "change", T.upload)
            },handleError: function(b) {
                R.stopUpload();
                f.stopBoxClose();
                R.resetInput();
                a.ui.alert(h(b.msg), {OK: function() {
                        b.code == 1 && window.location.reload();
                        setTimeout(function() {
                            f.startBoxClose()
                        }, 0)
                    }})
            },handleSucc: function(a) {
                R.rendSucc(a);
                R.stopUpload()
            },rendLoad: function() {
                f.stopBoxClose();
                L.uppic.style.display = "none";
                L.loading.style.display = ""
            },rendSucc: function(b) {
                var c = a.common.extra.imageURL(b.pid), d = [], e, f;
                H = H || b.pid;
                d = H.split(/\/|\\/);
                e = d[d.length - 1];
                d = e.split(".");
                if (d.length > 1 && a.bLength(d[0]) > 20) {
                    d[0] = a.leftB(d[0], 20);
                    f = [d[0], "...", d[1]].join("")
                } else
                    f = e;
                B = b.pid;
                T.loadPic({url: c,value: f,pid: b.pid});
                L.beautify && (L.beautify.style.display = "")
            },deletePic: function() {
                a.preventDefault();
                L.close.style.display = "";
                L.inner.style.display = "";
                L.wrap.style.width = "";
                L.uploaded.style.display = "none";
                L.picWrap.innerHTML = "";
                z.destroy();
                z.init();
                f.startBoxClose();
                a.custEvent.fire(J, "deletePIC", {text: h(G)});
                F = 0
            },stopUpload: function() {
                L.loading.style.display = "none";
                L.uppic.style.display = ""
            },cancelUpload: function() {
                R.abortUpload();
                R.stopUpload();
                R.resetInput();
                f.startBoxClose()
            },exchangeInput: function() {
                var b = L.fileBtn, c = b.parentNode, d = b.className, e = b.name, f = a.C("input");
                f.className = d;
                f.name = e;
                f.type = "file";
                f.hideFocus = "true";
                L.fileBtn = f;
                c.removeChild(b);
                c.appendChild(f)
            },resetInput: function() {
                P(L.fileBtn, "click", R.hideCapture);
                P(L.fileBtn, "change", T.upload);
                R.exchangeInput();
                O(L.fileBtn, "change", T.upload);
                O(L.fileBtn, "click", R.hideCapture)
            },beautifySucess: function(a) {
                H = a;
                R.handleSucc({pid: a})
            },faceStickerSucess: function(a) {
                F = 1;
                H = a;
                R.handleSucc({pid: a})
            },morePic: function() {
                R.uploadWaterMarkFlash({id: "photo_merge",swf: "SinaCollage.swf",width: 528,height: 470,sucess: R.beautifySucess})
            },faceSticker: function() {
                R.uploadWaterMarkFlash({id: "photo_facesticker",swf: "FacePhoto.swf",width: 568,height: 478,baseDir: "facesticker",sucess: R.faceStickerSucess})
            },uploadWaterMarkFlash: function(c) {
                a.preventDefault();
                R.hideCapture();
                f.stopBoxClose();
                if (a.kit.extra.getFlashVersion() < 10)
                    a.kit.extra.installFlash({onHide: function() {
                            f.startBoxClose()
                        }});
                else {
                    var d = function(d) {
                        var e = d.nickname != "0" || d.logo != "0" || d.domain != "0", g = b && b.nick || "", h = "http://picupload.service.weibo.com/interface/pic_upload.php?app=miniblog&marks=" + (e ? "1" : "0") + (d.logo == "1" ? "&logo=1" : "") + (d.nickname == "1" ? "&nick=" + (g ? encodeURIComponent("@" + g) : "") : "") + (d.domain == "1" ? "&url=" + w + (b && b.watermark || b.domain) : "") + (d.position ? "&markpos=" + d.position : "") + "&s=xml&cb=http://weibo.com/upimgback.html&rq=http%3A%2F%2Fphoto.i.weibo.com%2Fpic%2Fadd.php%3Fapp%3D1", i = {id: c.id,pos: f.getPosition(),service: h,sucess: c.sucess,h: c.height,w: c.width,swf: c.swf,baseDir: c.baseDir || ""};
                        a.common.flash.imgUpload(i, {init: function(a, b) {
                                a.setPars()
                            },close: function(a, b) {
                                setTimeout(function() {
                                    f.startBoxClose()
                                }, 100)
                            }}).show()
                    };
                    a.kit.extra.watermark(function(a) {
                        d(a)
                    })
                }
            },beautify: function() {
                a.preventDefault();
                if (a.kit.extra.getFlashVersion() < 10)
                    a.kit.extra.installFlash();
                else {
                    var b = {id: "photo_editor",pos: f.getPosition(),service: "http://picupload.service.weibo.com/interface/pic_upload.php?app=miniblog&s=xml&cb=http://weibo.com/upimgback.html&rq=http%3A%2F%2Fphoto.i.weibo.com%2Fpic%2Fadd.php%3Fapp%3D1",sucess: R.beautifySucess,h: 385,w: 528,swf: "PhotoEditor.swf"};
                    a.common.flash.imgUpload(b, {init: function(b, c) {
                            b.setPars(a.common.extra.imageURL(B, {size: "large"}))
                        },close: function(a, b) {
                        }}).show()
                }
            },hideCapture: function() {
                D && D.hide()
            },captureWindow: function() {
                a.preventDefault();
                if (!D) {
                    var b = function() {
                        f.stopBoxClose()
                    }, c = function() {
                        f.startBoxClose()
                    };
                    D = g.screenCapture({captureType: "pid",beforeUpload: R.beforeCaptureUpload,captureSuccess: R.captureSuccess,captureError: R.handleError,beforeSupportTip: b,supportTipOk: c,beforeIeInstallTip: b,ieInstallTipOk: c,beforeInstallTip: b,installTipOk: c})
                }
                D.doit()
            },beforeCaptureUpload: function() {
                R.rendLoad()
            },captureSuccess: function(a) {
                H = a.imgName;
                E = 1;
                R.handleSucc(a)
            },uploadAblum: function() {
                window.open("http://photo.weibo.com/upload/weibo", "", "width=650, height=470, top=300, left=400")
            }}, S = {init: function() {
                z = S;
                R.abortUpload();
                R.hideCapture();
                var b;
                L.wrap.className = "layer_faces";
                R.destroy();
                L.content.innerHTML = h(k);
                b = a.kit.dom.parseDOM(a.core.dom.builder(x).list);
                L = a.kit.extra.merge(L, b);
                L.loading.innerHTML = h(l);
                S.cartoonStart();
                S.bind()
            },bind: function() {
                I.add("insertSmiley", "click", function(a) {
                    STK.core.evt.preventDefault();
                    L.beautify && (L.beautify.style.display = "none");
                    var b = a.data.url, c = a.data.pid, d = a.data.value;
                    T.loadPic({url: b,value: d,pid: c})
                });
                I.add("category", "click", function(a) {
                    K.page = 0;
                    K.currentCategory = a.data.category;
                    S.rend();
                    setTimeout(function() {
                        S.rendCategory(K);
                        S.rendPage(K)
                    }, 0)
                });
                I.add("prev", "click", function(b) {
                    a.preventDefault(b.evt);
                    var c = K.cPoniter;
                    if (c <= 0)
                        return !1;
                    K.cPoniter -= v;
                    S.rendCategory(K)
                });
                I.add("next", "click", function(b) {
                    a.preventDefault(b.evt);
                    var c = K.cPoniter, d = K.categorys;
                    if (c >= d.length - v)
                        return !1;
                    K.cPoniter += v;
                    S.rendCategory(K)
                });
                I.add("page", "click", function(a) {
                    K.page = parseInt(a.data.num, 10);
                    S.rend();
                    setTimeout(function() {
                        S.rendPage(K)
                    }, 0);
                    return STK.preventDefault(a.evt)
                })
            },cartoonStart: function() {
                a.common.trans.editor.getTrans("cartoon", {onSuccess: function(a, b) {
                        K.cache = a.data.more || {};
                        K.categorys = [s];
                        for (var c in K.cache)
                            K.categorys.push(c);
                        K.cache[s] = a.data.usual.norm;
                        S.cartoonStart = function() {
                            K.page = 0;
                            K.cPoniter = 0;
                            K.currentCategory = s;
                            S.rend();
                            S.rendCategory(K);
                            S.rendPage(K)
                        };
                        S.cartoonStart()
                    }}).request({})
            },rend: function(b, c) {
                var d = K.currentCategory, e = K.cache[d], f = K.page, g = K.itemNumber;
                e = e.slice(f * g, f * g + g);
                e = a.foreach(e, function(b, c) {
                    a.bLength(b.phrase) > 8 && (b.phrase = [a.leftB(b.phrase, 6), "..."].join(""));
                    return a.templet(h(o), b)
                });
                L.loading.innerHTML = "";
                L.list.innerHTML = e.join("")
            },rendCategory: function(b) {
                var c = b.cPoniter, d = b.categorys, e = b.currentCategory, f = d.slice(c, c + v);
                f = a.foreach(f, function(b, c) {
                    return e === b ? a.templet(h(n), {item: b}) : a.templet(h(m), {item: b})
                });
                L.categorys.innerHTML = f.join(r);
                c + 6 >= d.length ? L.next.className = "next_d" : L.next.className = "next";
                c <= 0 ? L.prev.className = "pre_d" : L.prev.className = "pre"
            },rendPage: function(b) {
                var c = b.page, d = b.cache[b.currentCategory], e = d.length / b.itemNumber, f = [];
                for (var g = 0; g < e; g += 1)
                    c == g ? f.push(a.templet(h(q), {number: g,label: g + 1})) : f.push(a.templet(h(p), {number: g,label: g + 1}));
                L.page.innerHTML = f.join("")
            },destroy: function() {
            }}, T = {trans: function() {
                C && C.destroy();
                C = a.kit.extra.upload({type: "common",form: L.form,imgName: H});
                a.custEvent.add(C, "uploadSucc", function(a, b) {
                    R.handleSucc(b)
                });
                a.custEvent.add(C, "uploadError", function(a, b) {
                    R.handleError(b)
                })
            },upload: function() {
                H = L.fileBtn.value;
                if (a.core.str.trim(H) !== "") {
                    R.rendLoad();
                    T.trans()
                }
            },loadPic: function(b) {
                L.picWrap.innerHTML = "";
                var c = b.url, d = L.close, e = a.C("img");
                b.value && (L.pName.innerHTML = b.value);
                E && (e.onload = function() {
                    window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack("tblog_image_cut", "succeed_image_cut")
                });
                E = 0;
                e.src = c;
                f.stopBoxClose();
                G = F ? u : t;
                a.core.evt.custEvent.fire(J, "uploaded", {text: h(G),pid: b.pid});
                L.wrap.style.display = "";
                L.wrap.className = "layer_send_pic";
                L.wrap.style.width = "240px";
                L.inner.style.display = "none";
                L.uploaded.style.display = "";
                d.style.display = "none";
                L.picWrap.appendChild(e)
            }}, U = {};
        J = {};
        J.getBub = function() {
            return f
        };
        if (!a.isNode(d))
            throw "common.bubble.image need el as first parameter!";
        M = window.location.href;
        L = a.kit.dom.parseDOM(a.core.dom.builder(h(i)).list);
        x = L.outer;
        f = a.ui.bubble();
        R.initDom();
        if (e && e.pid) {
            var V = a.common.extra.imageURL(e.pid);
            T.loadPic({url: V,pid: e.pid})
        }
        Q();
        f.setContent(x);
        e.fail = function() {
            f.setLayout(d, {offsetX: -24,offsetY: 5})
        };
        f.setAlignPos(d, e.refer, e);
        J.bubble = f;
        f.show();
        c.push(function() {
            f && f.hide()
        });
        return J
    }
});
STK.register("common.editor.widget.image", function(a) {
    return function(b) {
        a.log(b);
        var c = {}, d, e, f, g, h, i = function(a, b) {
            d.API.insertText(b.value);
            e.getBub().hide()
        }, j = function(b, c) {
            a.log("upload");
            var e = d.API.getWords();
            e.length == 0 && d.API.insertText(c.text);
            d.API.addExtraInfo(c.pid);
            g = !0
        }, k = function(a, b) {
            d.API.delWords(b.text);
            d.API.addExtraInfo("");
            clearInterval(h)
        }, l = function(b) {
            if (!g) {
                a.core.evt.preventDefault();
                var c = d.nodeList.textEl;
                if (typeof b == "string") {
                    e = a.common.bubble.image(d.nodeList[f], {pid: b,refer: c,arrowOffset: -5});
                    a.log("has pid");
                    h = setInterval(function() {
                        e.bubble.setLayout(d.nodeList[f], {offsetX: -29,offsetY: 5})
                    }, 200)
                } else
                    e = a.common.bubble.image(d.nodeList[f], {refer: c,arrowOffset: -5});
                a.custEvent.add(e, "uploaded", j);
                a.log(2222);
                a.custEvent.add(e, "insert", i);
                a.custEvent.add(e, "deletePIC", k);
                a.custEvent.add(e, "hide", function() {
                    a.custEvent.remove(e, "hide", arguments.callee);
                    a.custEvent.remove(e, "uploaded", j);
                    a.custEvent.remove(e, "insert", i);
                    a.custEvent.remove(e, "deletePIC", k);
                    a.custEvent.remove(e, "changeType");
                    g = !1
                })
            }
        };
        c.init = function(b, c, e) {
            d = b;
            f = c;
            a.addEvent(b.nodeList[f], "click", l);
            e && e.pid && l(e.pid)
        };
        c.clear = function() {
        };
        c.show = function() {
        };
        c.hide = function() {
            e && e.getBub().hide()
        };
        c.resetBubble = function(a) {
            if (e) {
                var b = {fail: function() {
                        e.bubble.setLayout(a, {offsetX: -29,offsetY: 5})
                    },arrowOffset: -5};
                e.bubble.setAlignPos(a, d.nodeList.textEl, b)
            }
        };
        c.destroy = function() {
            d = null
        };
        return c
    }
});
STK.register("common.extra.shine", function(a) {
    var b = function(a) {
        return a.slice(0, a.length - 1).concat(a.concat([]).reverse())
    };
    return function(c, d) {
        var e = a.parseParam({start: "#fff",color: "#fbb",times: 2,step: 5,length: 4}, d), f = e.start.split(""), g = e.color.split(""), h = [];
        for (var i = 0; i < e.step; i += 1) {
            var j = f[0];
            for (var k = 1; k < e.length; k += 1) {
                var l = parseInt(f[k], 16), m = parseInt(g[k], 16);
                j += Math.floor(parseInt(l + (m - l) * i / e.step, 10)).toString(16)
            }
            h.push(j)
        }
        for (var i = 0; i < e.times; i += 1)
            h = b(h);
        var n = !1, o = a.timer.add(function() {
            if (!h.length)
                a.timer.remove(o);
            else {
                if (n) {
                    n = !1;
                    return
                }
                n = !0;
                c.style.backgroundColor = h.pop()
            }
        })
    }
});
STK.register("common.extra.keyboardCapture", function(a) {
    var b = {13: "enter",27: "esc",32: "space",38: "up",40: "down",9: "tab"};
    return function(c, d) {
        d = d || {};
        var e = {}, f, g = {keydown: function(c) {
                d.stopScroll && a.stopEvent();
                var f, g;
                !!(f = c) && !!(g = f.keyCode) && b[g] && a.custEvent.fire(e, b[g])
            }}, h = {init: function() {
                h.pars();
                h.bind()
            },pars: function() {
            },bind: function() {
                for (var b in g)
                    a.addEvent(c, b, g[b])
            },getKey: function(a) {
                return b[a]
            },destroy: function() {
                for (var b in g)
                    a.removeEvent(c, b, g[b])
            }};
        h.init();
        e.getKey = h.getKey;
        e.destroy = h.destroy;
        return e
    }
});
STK.register("common.editor.plugin.publishTo", function(a) {
    var b = a.kit.extra.language, c = a.core.util.templet, d = a.core.util.easyTemplate, e;
    return function(c) {
        var d, f, g = c && c.editorWrapEl, h = c && c.textEl, i = {}, j = [], k, l = {}, m, n, o = function() {
            if (!a.isNode(g))
                throw "publishTo need a wrapper node to parseDOM"
        }, p = a.getUniqueKey(), q = function(a) {
            var b = [], c;
            b.push('<div style="position: absolute;display:none;z-index:9998;outline:none;" hideFocus="true" node-type="publishTo" class="layer_menu_list" tabindex="10">');
            b.push('<ul id="' + p + '">');
            b.push('<li><a title="#L{公开-你发表的微博可以被大家公开查看哦}" suda-data="key=tblog_edit_exposure&value=edit_public" href="javascript:void(0)" action-data="rank=0&text=#L{公开}&rankid=" action-type="publishTo"><i class="W_ico16 i_conn_public"></i>#L{公开}</a></li>');
            b.push($CONFIG.miyou === 1 ? '<li><a title="#L{密友可见-发表的微博只有你的密友才能看到}" href="javascript:void(0)" action-data="rank=2&text=#L{密友可见}&rankid=" action-type="publishTo"><i class="W_ico16 i_conn_close_friend"></i>#L{密友可见}</a></li>' : "");
            b.push('<li><a title="#L{仅自己可见-发表的微博只有自己才能看到}" suda-data="key=tblog_edit_exposure&value=edit_private" href="javascript:void(0)" action-data="rank=1&text=#L{仅自己可见}&rankid=" action-type="publishTo"><i class="W_ico16 i_conn_private"></i>#L{仅自己可见}</a></li>');
            b.push('<li class="line"></li>');
            b.push('<li><a action-type="more" href="javascript:void(0);"><i class="W_ico16 i_conn_list"></i>#L{分组可见}</a></li>');
            b.push("</ul></div>");
            return b.join("")
        }, r = function(a) {
            var b = [], c = a.length, d;
            c > 8 ? b.push('<ul class="scroll_bar" style="width:110px;" id="' + p + '">') : b.push('<ul class="scroll_bar" style="height:auto;width:110px;" id="' + p + '">');
            for (var e = 0; e < c; e++) {
                d = a[e];
                b.push('<li><a action-type="publishTo" action-data="rank=3&text=' + d.gname + "&rankid=" + d.gid + '" title="' + d.gname + '" href="javascript:void(0);" onclick="return false;"><i class="W_ico16 i_conn_list"></i>' + d.gname + "</a></li>")
            }
            b.push("</ul>");
            b.push('<ul><li class="line"></li>');
            b.push('<li class="opt"><a href="javascript:void(0)" onclick="return false;" action-type="back">#L{返回}</a></li>');
            b.push("</ul>");
            return b.join("")
        }, s = function() {
            f = a.kit.dom.parseDOM(a.builder(g).list);
            f.wrap || (f.wrap = g);
            n = f.wrap.className
        }, t = function() {
            d = function() {
                var c = {}, d, i, l, o, s = f.showPublishTo;
                i = d = s && s.getAttribute("action-data") && a.core.json.queryToJson(s.getAttribute("action-data")) || {rank: "all",rankid: ""};
                c.node = a.core.evt.delegatedEvent(g);
                var t = !1, u = {hotKeyChangeRank: function(c, f) {
                        var g = f.match(/\d+/);
                        if (g && g[0]) {
                            var h = parseInt(g[0], 10) - 1, i = [{rank: 0,rankid: "",text: b("#L{公开}"),title: b("#L{公开-你发表的微博可以被大家公开查看哦}")}, {rank: 2,rankid: "",text: b("#L{密友可见}"),title: b("#L{密友可见-发表的微博只有你的密友才能看到}")}, {rank: 1,rankid: "",text: b("#L{仅自己可见}"),title: b("#L{仅自己可见-发表的微博只有自己才能看到}")}], j = function() {
                                a.foreach(k, function(a) {
                                    a.rank = 3;
                                    a.rankid = a.gid;
                                    a.text = a.gname;
                                    a.title = a.gname
                                });
                                i = i.concat(k);
                                var b = window.$CONFIG && window.$CONFIG.miyou == "1";
                                b || i.splice(1, 1);
                                if (i[h]) {
                                    d = i[h];
                                    z.btnContent(d.text);
                                    z.btnTitle(d.title);
                                    t = !1;
                                    a.custEvent.fire(z, "changeRank", d)
                                }
                            }, k = function() {
                                if (e)
                                    return a.core.arr.copy(e);
                                A.group.request(function(b) {
                                    k = a.core.arr.copy(b);
                                    j()
                                });
                                return null
                            }();
                            k && j()
                        }
                    }}, v = function() {
                    c.node.add("showPublishTo", "click", z.show)
                }, w = function() {
                    A.normal.bind();
                    A.group.bind();
                    x.bind()
                }, x = {keyboardManager: null,keyTypes: ["up", "down", "esc", "enter"],getIndex: function(b) {
                        var c = x.getList(), d = x.lastCur, e;
                        a.foreach(c, function(a, b) {
                            if (d === a) {
                                e = b;
                                return !1
                            }
                        });
                        b > 0 ? e++ : e--;
                        e >= c.length ? e = 0 : e < 0 && (e = c.length - 1);
                        return e
                    },up: function() {
                        var a = x.getIndex(-1), b = x.getList()[a];
                        x.setCur(b, a)
                    },down: function() {
                        var a = x.getIndex(1), b = x.getList()[a];
                        x.setCur(b, a)
                    },enter: function() {
                        var b = x.lastCur;
                        b.getAttribute("action-type") || (b = a.sizzle("[action-type]", b)[0]);
                        b && c.layer.fireDom(b, "click", null)
                    },esc: function() {
                        z.hide()
                    },bind: function() {
                        x.keyboardManager = a.common.extra.keyboardCapture(f.publishTo, {stopScroll: !0});
                        a.custEvent.define(x.keyboardManager, x.keyTypes);
                        for (var b = 0, c = x.keyTypes.length; b < c; b++) {
                            var d = x.keyTypes[b];
                            a.custEvent.add(x.keyboardManager, d, x[d])
                        }
                    },list: null,lastCur: null,focusPublishTo: function() {
                        f.publishTo.focus();
                        var a = this.getList(!0);
                        this.setCur(a[0], 0)
                    },setCur: function(b, c) {
                        this.lastCur && a.removeClassName(this.lastCur, "cur");
                        a.addClassName(b, "cur");
                        this.lastCur = b;
                        var d = a.E(p);
                        if (a.contains(d, b)) {
                            var e = a.kit.dom.outerHeight, f = c + 1, g = Math.max(e(b), e(a.sizzle("a", b)[0]));
                            f > 7 ? d.scrollTop = (f - 7) * g : d.scrollTop = 0
                        }
                    },getList: function(b) {
                        if (b || !this.list) {
                            var c = a.sizzle("li", f.publishTo), d = [];
                            a.foreach(c, function(b) {
                                a.getStyle(b, "display") != "none" && b.className != "line" && d.push(b)
                            });
                            this.list = d
                        }
                        return this.list
                    }}, y = {setPos: function() {
                        var b = a.core.dom.getSize, c = b(f.showPublishTo).width - b(f.publishTo).width;
                        a.kit.dom.layoutPos(f.publishTo, f.showPublishTo, {offsetX: c + 2,offsetY: 2})
                    },init: function() {
                        c.layer = a.core.evt.delegatedEvent(f.publishTo);
                        c.closeFriend = a.core.evt.delegatedEvent(f.publishTo)
                    },setArrow: function(b) {
                        var c = f.publish_to_arrow;
                        if (!!c)
                            if (b == "up") {
                                a.removeClassName(c, "down");
                                a.addClassName(c, "up")
                            } else if (b == "down") {
                                a.removeClassName(c, "up");
                                a.addClassName(c, "down")
                            }
                    },show: function() {
                        a.foreach(a.sizzle("li", f.publishTo), function(b) {
                            var c = a.sizzle("a", b)[0];
                            if (c) {
                                var e = a.kit.extra.actionData(c), f = e.get("rank"), g = e.get("rankid");
                                d.rank != "3" ? d.rank == f && f != "" && a.setStyle(b, "display", "none") : d.rankid == g && a.setStyle(b, "display", "none")
                            }
                        });
                        y.setPos();
                        a.setStyle(f.publishTo, "display", "");
                        x.focusPublishTo();
                        y.setArrow("up");
                        if (!k) {
                            k = 1;
                            y.bindBodyEvt()
                        }
                        return !1
                    },hide: function() {
                        a.setStyle(f.publishTo, "display", "none");
                        t = !1;
                        if (k) {
                            k = 0;
                            y.removeBodyEvt()
                        }
                    },autoHide: function(b) {
                        b = a.core.evt.fixEvent(b);
                        f.showPublishTo !== b.target && !a.core.dom.contains(f.showPublishTo, b.target) && !a.core.dom.contains(f.publishTo, b.target) && z.hide()
                    },content: function(a) {
                        if (typeof a == "undefined")
                            return f.publishTo.innerHTML;
                        f.publishTo.innerHTML = a
                    },bindBodyEvt: function() {
                        a.addEvent(document.body, "click", y.autoHide)
                    },removeBodyEvt: function() {
                        a.removeEvent(document.body, "click", y.autoHide)
                    }}, z = {enable: function() {
                        f.showPublishTo.setAttribute("action-type", "showPublishTo")
                    },disable: function() {
                        f.showPublishTo.setAttribute("action-type", "")
                    },miYouStyle: function(b, c) {
                        var d = "2", e = $CONFIG.lang == "zh-cn" ? "" : "_CHT";
                        d == c.rank ? a.core.dom.addClassName(f.wrap, "send_weibo_cf" + e) : a.core.dom.removeClassName(f.wrap, "send_weibo_cf" + e)
                    },show: function() {
                        var b = function() {
                            a.custEvent.fire(z, "show");
                            t ? A.group.show() : A.normal.show()
                        };
                        if (f.publishTo) {
                            var c = a.getStyle(f.publishTo, "display");
                            if (c === "none")
                                b();
                            else {
                                a.setStyle(f.publishTo, "display", "none");
                                t = !1;
                                y.setArrow("down")
                            }
                        } else
                            b();
                        a.preventDefault()
                    },btnContent: function(a) {
                        a && (l.innerHTML = a)
                    },btnTitle: function(a) {
                        a && f.showPublishTo.setAttribute("title", a)
                    },hide: function() {
                        y.hide();
                        y.setArrow("down")
                    },toggle: function() {
                        t || (f.publishTo.style.display == "none" ? z.show() : z.hide())
                    },rank: function() {
                        return d
                    },reset: function() {
                        z.enable();
                        f.wrap.className = n;
                        z.btnContent(o.content);
                        z.btnTitle(o.title);
                        d = null;
                        t = !1;
                        d = i
                    },destroy: function() {
                        try {
                            for (var b in c)
                                c[b].destroy()
                        } catch (d) {
                        }
                        j.length && a.hotKey.remove(h, j, u.hotKeyChangeRank);
                        a.removeNode(f.publishTo);
                        a.custEvent.undefine(z);
                        if (x.keyboardManager) {
                            x.keyboardManager.destroy();
                            a.custEvent.undefine(x.keyboardManager, x.keyTypes)
                        }
                    },changeRank: function(b) {
                        b = b > 0 ? b - 1 : 0;
                        var c = a.sizzle('a[action-type="publishTo"]', f.publishTo)[b];
                        if (c) {
                            A.normal.changeRank({el: c,data: a.core.json.queryToJson(c.getAttribute("action-data") || "")});
                            var d = c.getAttribute("suda-data");
                            if (d) {
                                var e = d.match(/key=(.+?)&value=(.+)/);
                                e && e.length === 3 && window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack(e[1], e[2])
                            }
                        }
                    },getDomHeight: function() {
                        return f.publishTo.style.display == "none" ? {width: 0,heigth: 0} : a.core.dom.getSize(f.publishTo)
                    },bindAltKey: function() {
                        if (a.isNode(h)) {
                            var b = a.core.util.browser.OS === "macintosh";
                            if (b)
                                for (var c = 1; c <= 9; c++)
                                    j.push("ctrl+" + c);
                            else
                                for (var c = 1; c <= 9; c++)
                                    j.push("alt+" + c);
                            a.hotKey.add(h, j, u.hotKeyChangeRank)
                        }
                    }}, A = {normal: {bind: function() {
                            c.layer.add("publishTo", "click", A.normal.changeRank);
                            c.layer.add("more", "click", A.normal.more)
                        },getList: function() {
                            y.content(m)
                        },more: function() {
                            A.group.show();
                            t = !0;
                            a.core.evt.stopEvent()
                        },show: function() {
                            var a = function() {
                                if (!f.publishTo) {
                                    B();
                                    y.init();
                                    w()
                                }
                                A.normal.getList();
                                y.show()
                            };
                            e ? a() : A.group.request(a)
                        },changeRank: function(b) {
                            try {
                                a.preventDefault(b.evt)
                            } catch (c) {
                            }
                            d = b.data;
                            var e = b.data.text;
                            z.btnContent(e);
                            z.btnTitle(b.el.getAttribute("title"));
                            d.rank == "group" ? A.group.show() : z.hide();
                            a.custEvent.fire(z, "changeRank", d)
                        }},group: {request: function(b) {
                            a.common.trans.group.getTrans("list", {onSuccess: function(a) {
                                    var c = a.data.length;
                                    for (var d = 0; d < c; d++)
                                        a.data[d].index = d + 1;
                                    e = a.data;
                                    b && b(e)
                                }}).request({})
                        },bind: function() {
                            c.layer.add("back", "click", A.group.back)
                        },getList: function() {
                            if (!A.group.cache) {
                                var a = b(r(e));
                                A.group.cache = a;
                                y.content(A.group.cache)
                            } else
                                y.content(A.group.cache)
                        },show: function() {
                            A.group.getList();
                            y.show()
                        },back: function() {
                            var b = a.core.evt.fixEvent();
                            a.core.evt.stopEvent(b);
                            t = !1;
                            A.normal.show()
                        }}}, B = function(c) {
                    var d = b(q(c));
                    f.publishTo = a.insertHTML(document.body, d, "beforeend");
                    m = f.publishTo.innerHTML
                }, C = function() {
                    if (!a.isNode(f.showPublishTo))
                        return 0;
                    l = f.publishTotext;
                    o = {content: l.innerHTML,title: f.showPublishTo.getAttribute("title")};
                    v();
                    return 1
                }, D = C();
                a.custEvent.define(z, ["show", "hide", "changeRank"]);
                return D ? z : null
            }();
            d && d.bindAltKey && d.bindAltKey()
        }, u = function() {
            o();
            s();
            t()
        };
        u();
        return d
    }
});
STK.register("common.dialog.publish", function(a) {
    var b = '<#et temp data><div class="detail" node-type="outer"><div class="send_weibo clearfix" node-type="wrap"><div class="title_area clearfix"><div class="title" node-type="info"></div><div class="num S_txt2" node-type="num"><span>140</span>#L{字}</div><div class="key S_textb"  ></div></div><div class="input clicked" style="width:460px;"><textarea name="" class="input_detail" node-type="textEl"></textarea><div class="send_succpic" style="display:none" node-type="successTip"></div><span class="arrow"></span></div><div class="func_area clearfix"><div class="func"><div class="limits"><a href="javascript:void(0);" node-type="showPublishTo" action-type="showPublishTo" action-data="rank=0"><span node-type="publishTotext">#L{公开}</span><span class="W_arrow"><em class="down" node-type="publish_to_arrow">◆</em></span></a></div><a href="javascript:void(0)" class="send_btn disable" diss-data="module=shissue" node-type="submit"></a></div><div class="kind S_txt3" node-type="widget"><span class="kind_detail"><#if (data.smileyBtn)><a href="javascript:void(0)" class="W_ico16 icon_sw_face" node-type="smileyBtn">#L{表情}</a></#if><#if (data.picBtn)><a href="javascript:void(0)" class="W_ico16 icon_sw_img" node-type="picBtn">#L{图片}</a></#if></span></div></div></div></div>', c = {title: "#L{有什么新鲜事想告诉大家}"}, d = a.kit.extra.language, e = {limitNum: 140,extendText: '<a target="_blank" class="S_txt2" href="http://weibo.com/z/guize/gongyue.html">#L{发言请遵守社区公约}</a>，'};
    return function(f) {
        var g = {}, h, i, j, k, l, m, n, o, p, q, r;
        h = a.parseParam({templete: d(b),appkey: "",styleId: "1",smileyBtn: !0,picBtn: !0,pid: ""}, f);
        o = a.custEvent.define(g, "publish");
        a.custEvent.define(g, "hide");
        var s = function() {
            var b = l.textEl;
            if (i)
                j === "error" && a.common.extra.shine(b);
            else {
                i = !0;
                j = "loading";
                var c = a.common.getDiss(t(), l.submit);
                c.pub_type = "dialog";
                r && r.disable();
                n.request(c)
            }
        }, t = function() {
            var b = m.API.getWords();
            p && b.indexOf(p) === -1 && (b = b + p);
            var c = {};
            c.appkey = h.appkey;
            c.style_type = h.styleId;
            c.text = b;
            var d = m.API.getExtra();
            if (d)
                if (d.indexOf("=") < 0)
                    c.pic_id = m.API.getExtra() || "";
                else {
                    var e = d, f = a.core.json.queryToJson(e);
                    for (var g in f)
                        c[g] = f[g];
                    a.log(c)
                }
            if (r && r.rank) {
                var i = r.rank();
                c.rank = i.rank;
                c.rankid = i.rankid
            }
            return c
        }, u = function(a) {
            if ((a.keyCode === 13 || a.keyCode === 10) && a.ctrlKey) {
                s();
                m.API.blur()
            }
        }, v = function(a, b) {
            var c = b.isOver;
            if (!c) {
                i = !1;
                j = "";
                l.submit.className = "send_btn";
                l.num.innerHTML = (e.extendText ? d(e.extendText) : "") + d("#L{还可以输入}") + "<span>" + (140 - b.count) + "</span>字"
            } else {
                i = !0;
                j = "error";
                l.submit.className = "send_btn disable"
            }
        }, w = function(b, c) {
            j = "";
            l.successTip.style.display = "";
            l.textEl.value = "";
            setTimeout(function() {
                i = !1;
                l.successTip.style.display = "none";
                k && k.hide();
                l.submit && (l.submit.className = "send_btn")
            }, 2e3);
            a.custEvent.fire(o, "publish", [b.data, c]);
            a.common.channel.feed.fire("publish", [b.data, c]);
            l.submit.className = "send_btn disable";
            m.API.reset();
            r && r.reset && r.reset()
        }, x = function(b, c) {
            i = !1;
            j = "";
            b.msg = b.msg || d("操作失败");
            a.common.layer.ioError(b.code, b);
            l.submit && (l.submit.className = "send_btn");
            r && r.enable()
        }, y = function(a) {
            l.textEl.value = "";
            m.API.insertText(a.content);
            l.info.innerHTML = a.info;
            a.appkey && (h.appkey = a.appkey);
            if (a.content) {
                i = !1;
                j = "";
                l.submit.className = "send_btn"
            } else {
                i = !0;
                j = "error";
                l.submit.className = "send_btn disable"
            }
        }, z = function() {
            i = !1
        }, A = function() {
            m = a.common.editor.base(a.core.util.easyTemplate(a.kit.extra.language(h.templete), h).toString(), e);
            h.smileyBtn && m.widget(a.common.editor.widget.face({useAlign: !0}), "smileyBtn");
            h.picBtn && m.widget(a.common.editor.widget.image(), "picBtn");
            l = m.nodeList;
            r = a.common.editor.plugin.publishTo({editorWrapEl: l.wrap,textEl: l.textEl});
            q = a.common.dialog.validateCode()
        }, B = function() {
            a.addEvent(l.submit, "click", s);
            a.addEvent(l.textEl, "keypress", u)
        }, C = function() {
            r && r.miYouStyle.apply(null, arguments)
        }, D = function() {
            a.custEvent.add(m, "textNum", v);
            r && a.custEvent.add(r, "changeRank", C)
        }, E = function() {
            n = a.common.trans.feed.getTrans("publish", {onComplete: function(a, b) {
                    var c = {onSuccess: w,onError: x,requestAjax: n,param: t(),onRelease: function() {
                            i = !1;
                            j = "";
                            l.submit && (l.submit.className = "send_btn");
                            r && r.enable()
                        }};
                    q.validateIntercept(a, b, c)
                },onFail: x,onTimeout: x})
        }, F = function() {
            A();
            B();
            D();
            E()
        }, G = function(b) {
            m || F();
            var e = a.parseParam({appkey: "",content: "",defaultValue: "",info: "",title: d(c.title)}, b);
            k = a.ui.dialog();
            k.setTitle(e.title);
            k.appendChild(l.outer);
            k.show();
            k.setMiddle();
            y(e);
            m.API.focus();
            a.custEvent.add(k, "hide", function() {
                a.custEvent.remove(k, "hide", arguments.callee);
                m.closeWidget();
                z();
                k = null;
                a.custEvent.fire(o, "hide")
            });
            p = e.defaultValue
        }, H = function() {
            k.hide()
        }, I = function(a) {
            m.API.addExtraInfo(a)
        }, J = function(a) {
            m.API.disableEditor(a)
        }, K = function() {
            k && k.hide();
            l && l.submit && a.removeEvent(l.submit, "click", s);
            l && l.textEl && a.removeEvent(l.textEl, "keypress", u);
            a.custEvent.remove(m, "textNum", v);
            r && a.custEvent.remove(r, "changeRank", C);
            a.custEvent.undefine(o, "publish");
            q && q.destroy && q.destroy();
            r && r.destroy && r.destroy();
            l = null;
            n = null;
            i = !1;
            for (var b in g)
                delete g[b];
            g = null
        };
        g.addExtraInfo = I;
        g.disableEditor = J;
        g.show = G;
        g.hide = H;
        g.destroy = K;
        return g
    }
});
STK.register("common.editor.plugin.textareaUtils", function(a) {
    var b = {}, c = document.selection;
    b.selectionStart = function(a) {
        if (!c)
            return a.selectionStart;
        var b = c.createRange(), d, e, f = 0, g = document.body.createTextRange();
        g.moveToElementText(a);
        for (f; g.compareEndPoints("StartToStart", b) < 0; f++)
            g.moveStart("character", 1);
        return f
    };
    b.selectionBefore = function(a) {
        return a.value.slice(0, b.selectionStart(a))
    };
    b.selectText = function(a, b, d) {
        a.focus();
        if (!c)
            a.setSelectionRange(b, d);
        else {
            var e = a.createTextRange();
            e.collapse(1);
            e.moveStart("character", b);
            e.moveEnd("character", d - b);
            e.select()
        }
    };
    b.insertText = function(a, d, e, f) {
        a.focus();
        f = f || 0;
        if (!c) {
            var g = a.value, h = e - f, i = h + d.length;
            a.value = g.slice(0, h) + d + g.slice(e, g.length);
            b.selectText(a, i, i)
        } else {
            var j = c.createRange();
            j.moveStart("character", -f);
            j.text = d
        }
    };
    b.replaceText = function(a, d) {
        a.focus();
        var e = a.value, f = b.getSelectedText(a), g = f.length;
        if (f.length == 0)
            b.insertText(a, d, b.getCursorPos(a));
        else {
            var h = b.getCursorPos(a);
            if (!c) {
                var j = h + f.length;
                a.value = e.slice(0, h) + d + e.slice(h + g, e.length);
                b.setCursor(a, h + d.length);
                return
            }
            var i = c.createRange();
            i.text = d;
            b.setCursor(a, h + d.length)
        }
    };
    b.getCursorPos = function(a) {
        var b = 0;
        if (STK.core.util.browser.IE) {
            a.focus();
            var d = null;
            d = c.createRange();
            var e = d.duplicate();
            e.moveToElementText(a);
            e.setEndPoint("EndToEnd", d);
            a.selectionStartIE = e.text.length - d.text.length;
            a.selectionEndIE = a.selectionStartIE + d.text.length;
            b = a.selectionStartIE
        } else if (a.selectionStart || a.selectionStart == "0")
            b = a.selectionStart;
        return b
    };
    b.getSelectedText = function(a) {
        var b = "", d = function(a) {
            return a.selectionStart != undefined && a.selectionEnd != undefined ? a.value.substring(a.selectionStart, a.selectionEnd) : ""
        };
        window.getSelection ? b = d(a) : b = c.createRange().text;
        return b
    };
    b.setCursor = function(a, b, c) {
        b = b == null ? a.value.length : b;
        c = c == null ? 0 : c;
        a.focus();
        if (a.createTextRange) {
            var d = a.createTextRange();
            d.move("character", b);
            d.moveEnd("character", c);
            d.select()
        } else
            a.setSelectionRange(b, b + c)
    };
    b.unCoverInsertText = function(a, b, c) {
        c = c == null ? {} : c;
        c.rcs = c.rcs == null ? a.value.length : c.rcs * 1;
        c.rccl = c.rccl == null ? 0 : c.rccl * 1;
        var d = a.value, e = d.slice(0, c.rcs), f = d.slice(c.rcs + c.rccl, d == "" ? 0 : d.length);
        a.value = e + b + f;
        this.setCursor(a, c.rcs + (b == null ? 0 : b.length))
    };
    return b
});
STK.register("common.feed.feedList.plugins.keywordShield", function(a) {
    var b = a.common.feed.feedList.utils, c = a.kit.extra.language;
    return function(d) {
        if (!d) {
            a.log("feed区不存在");
            !1
        }
        var e = {}, f = ["", "<#et temp data>", "<#if (!data.isMember)>", '<div class="W_tips tips_warn clearfix">', '<p class="icon"><span class="icon_warnS"></span></p>', "<#if (data.list.length)>", '<p class="txt">${data.messageTip}</p>', "<#else>", '<p class="txt">${data.zeroTip}</p>', "</#if>", "</div>", "</#if>", '<dl class="add_kw">', '<dt><i class="kw_tit">#L{添加关键词}</i>', '<i class="tips">#L{（每个关键词3-20个字符，关键词之间以空格分隔）}</i>', "</dt>", "<dd>", '<input type="text" node-type="input" class="W_input W_input_default" value="#L{请输入关键词}">', '<a suda-uatrack="key=tblog_screen_keyword&value=add_keyword" action-type="addKey" node-type="addNode" href="javascript:void(0)" class="W_btn_c"><span>#L{添加}</span></a>', "</dd>", '<dd><div node-type="errorNode" style="display:none" class="W_tips tips_rederror clearfix">', '<p class="icon"><span class="icon_rederrorS"></span></p>', '<p class="txt" node-type="errorTip">#L{请输入关键词}</p>', "</p></div></dd>", "</dl>", '<dl class="kw_added">', '<dt class="title">#L{已经添加的关键词：}</dt>', "<#if (data.list.length)>", '<dd class="profile_pinfo" node-type="noEmpty">', '<div class="fake_input tag_edit S_bg5 S_line2" node-type="keyList">', "<#list data.list as item>", '<div class="W_btn_arrow tag" node-type="keyNode" >', '<span class="S_func1" ><i node-type="keyWord">${item}</i><a action-data="key=${item}" href="javascript:void(0)" class="W_ico12 icon_close" action-type="deleteKey" suda-uatrack="key=tblog_screen_keyword&value=delete_keyword"></a></span>', "</div>", "</#list>", "</dd>", '<dd class="W_empty" style="display:none" node-type="empty">', '<div class="W_tips empty clearfix">', '<p class="icon"><span class="icon_warnS"></span></p><p class="txt S_txt2">${data.nokeyTip}</p>', "</div></dd>", "<#else>", '<dd class="profile_pinfo" node-type="noEmpty" style="display:none">', '<div class="fake_input tag_edit S_bg5 S_line2" node-type="keyList">', "<#list data.list as item>", '<div class="W_btn_arrow tag" node-type="keyNode" >', '<span class="S_func1" node-type="keyWord">${item}</span><a action-data="key=${item}" href="javascript:void(0)" class="W_ico12 icon_close" action-type="deleteKey" suda-uatrack="key=tblog_screen_keyword&value=delete_keyword"></a>', "</div>", "</#list>", "</dd>", '<dd class="W_empty" node-type="empty">', '<div class="W_tips empty clearfix">', '<p class="icon"><span class="icon_warnS"></span></p><p class="txt S_txt2">${data.nokeyTip}</p>', "</div></dd>", "</#if>", "</dl>", '<div class="footer clearfix">', '<a target="_blank" suda-uatrack="key=tblog_screen_keyword&value=more_install" href="http://account.weibo.com/set/feed" class="S_link1">#L{更多屏蔽设置}</a>', "</div>", "</#et>"].join(""), g = {0: {messageTip: '#L{此功能为微博会员特权，请先}<a target="_blank" href="http://vip.weibo.com/paycenter?from=pbkeyword">#L{开通会员}</a>#L{再添加屏蔽关键词}  <a target="_blank" href="http://vip.weibo.com/prividesc?priv=1104">#L{了解更多信息}</a>',zeroTip: '#L{此功能为微博会员特权，请先}<a target="_blank" href="http://vip.weibo.com/paycenter?from=pbkeyword">#L{开通会员}</a>再添加屏蔽关键词<a target="_blank" href="http://vip.weibo.com/prividesc?priv=1104">#L{了解更多信息}</a>',nokeyTip: "#L{你暂时还没有添加关键词}"},1: {nokeyTip: '#L{你暂时还没有添加关键词，}<a href="javascript:void(0)" action-type="gotoAdd">#L{立即添加}</a>'},2: {nokeyTip: '#L{你暂时还没有添加关键词，}<a href="javascript:void(0)" action-type="gotoAdd">#L{立即添加}</a>'},3: {messageTip: '#L{此功能为微博会员特权，}<a target="_blank" href="http://vip.weibo.com/paycenter?from=pbkeyword">#L{开通会员}</a>#L{可立即屏蔽含以下关键词的微博}<a target="_blank" href="http://vip.weibo.com/prividesc?priv=1104">#L{了解更多信息}</a>',zeroTip: '#L{此功能为微博会员特权，请先}<a target="_blank" href="http://vip.weibo.com/paycenter?from=pbkeyword">#L{开通会员}</a>#L{再添加屏蔽关键词}<a target="_blank" href="http://vip.weibo.com/prividesc?priv=1104">#L{了解更多信息}</a>',nokeyTip: "#L{你还未设置关键词}"}}, h = {empty: c("#L{请输入关键词}"),"char": c("#L{关键词仅支持中英文和数字}"),tooShort: c("#L{屏蔽的关键词不可少于3个字符}"),tooLong: c("#L{屏蔽的关键词不可超过20个字符}")}, i, j = a.ui.dialog(), k = d.getDEvent(), l = [], m = !1, n = !1, o, p = !1, q = !1, r = !1, s = 3, t = 20, u = {DEvent: null,init: function() {
                j.getInner().className = "W_shield_kw";
                u.DEvent = a.delegatedEvent(j.getInner());
                u.DEvent.add("addKey", "click", u.addKey);
                u.DEvent.add("deleteKey", "click", u.deleteKey);
                u.DEvent.add("gotoAdd", "click", u.gotoAdd)
            },show: function(b) {
                j.setTitle(c("#L{屏蔽关键词}"));
                j.setContent(b);
                u.nodes = a.kit.dom.parseDOM(a.builder(j.getInner()).list);
                if (!p) {
                    u.nodes.addNode.className = "W_btn_a_disable";
                    u.nodes.input.disabled = "true"
                }
                j.show();
                j.setMiddle();
                u.defaultInput = a.core.str.trim(u.nodes.input.value);
                a.addEvent(j.getDom("close"), "click", u.cancelFun);
                a.addEvent(u.nodes.input, "focus", u.inputFocus);
                a.addEvent(u.nodes.input, "blur", u.inputBlur);
                a.custEvent.add(j, "hide", function() {
                    if (!!r) {
                        var b = a.common.dialog.publish({styleId: "1",picBtn: !1});
                        b.show({title: c("#L{微博会员新特权，把它推荐给你的粉丝吧~}"),content: c("#L{微博会员新特权【屏蔽关键词】，魔法般的让那些烦人的微博都消失啦，哈哈···点击了解此特权：http://vip.weibo.com/prividesc?priv=1104}")});
                        b.addExtraInfo("pic_id=90b35fa5jw1dzhhft0m93j");
                        a.custEvent.add(b, "publish", function() {
                            b.hide();
                            a.ui.litePrompt(c("#L{推荐成功。}"), {type: "succM",timeout: "500",hideCallback: function() {
                                    window.location.reload()
                                }});
                            a.custEvent.remove(b, "publish", arguments.callee)
                        });
                        a.custEvent.add(b, "hide", function() {
                            a.custEvent.remove(b, "hide", arguments.callee);
                            window.location.reload()
                        })
                    }
                })
            },addKey: function() {
                if (!p)
                    return !1;
                var c = a.core.str.trim(u.nodes.input.value) == u.defaultInput ? [] : u.nodes.input.value.split(/\s+/g);
                c = a.core.arr.clear(c);
                var d = u.checkKeys(c, l);
                if (!q) {
                    u.nodes.errorTip.innerHTML = h[d];
                    u.nodes.errorNode.style.display = ""
                } else {
                    if (m)
                        return !1;
                    m = !0;
                    var e = {}, f = [];
                    f = l.concat(c);
                    e.blockwords = f.join(" ");
                    b.getFeedTrans("update", {onSuccess: function() {
                            l = l.concat(c);
                            u.nodes.errorNode.style.display = "none";
                            u.nodes.errorTip.innerHTML = "";
                            u.nodes.empty.style.display = "none";
                            u.nodes.noEmpty.style.display = "";
                            var b = "";
                            a.core.arr.foreach(c, function(a, c) {
                                b += '<div class="W_btn_arrow tag highlight" node-type="keyNode" ><span class="S_func1"><i node-type="keyWord">' + a + '</i><a  action-data="key=' + a + '" href="javascript:void(0)" class="W_ico12 icon_close" action-type="deleteKey" suda-uatrack="key=tblog_screen_keyword&value=delete_keyword"></a></span></div>'
                            });
                            a.insertHTML(u.nodes.keyList, b, "afterbegin");
                            q = !0;
                            u.nodes.input.value = u.defaultInput;
                            r = !0;
                            m = !1
                        },onError: function(a) {
                            u.nodes.errorTip.innerHTML = a.msg;
                            u.nodes.errorNode.style.display = "";
                            m = !1
                        }}).request(e)
                }
                a.preventDefault()
            },deleteKey: function(c) {
                a.preventDefault();
                if (!m) {
                    m = !0;
                    var d = c.el.parentNode;
                    while (d.getAttribute("node-type") != "keyNode")
                        d = d.parentNode;
                    var e = a.core.arr.indexOf(c.data.key, l);
                    if (e == -1)
                        return;
                    var f = {}, g = l;
                    g.splice(e, 1);
                    f.blockwords = g.join(" ");
                    b.getFeedTrans("update", {onSuccess: function() {
                            allkeys = g;
                            a.removeNode(d);
                            if (!l.length) {
                                u.nodes.noEmpty.style.display = "none";
                                u.nodes.empty.style.display = ""
                            }
                            m = !1
                        },onError: function() {
                            m = !1
                        }}).request(f)
                }
            },gotoAdd: function() {
                a.preventDefault();
                a.common.editor.plugin.textareaUtils.setCursor(u.nodes.input)
            },inputFocus: function(b) {
                a.core.str.trim(u.nodes.input.value) == u.defaultInput && (u.nodes.input.value = "")
            },inputBlur: function(b) {
                a.core.str.trim(u.nodes.input.value) == "" && (u.nodes.input.value = u.defaultInput)
            },checkKeys: function(b, c) {
                var d = "";
                if (!b.length) {
                    q = !1;
                    d = "empty";
                    return d
                }
                var e = {"char": function(a) {
                        if (/[^a-zA-Z0-9\u4e00-\u9fa5]/.test(a))
                            return !0
                    },tooShort: function(b) {
                        if (a.core.str.bLength(b) < s)
                            return !0
                    },tooLong: function(b) {
                        if (a.core.str.bLength(b) > t)
                            return !0
                    }};
                for (var f in e)
                    for (var g = 0, h = b.length; g < h; g++)
                        if (e[f](b[g])) {
                            q = !1;
                            d = f;
                            return d
                        }
                q = !0;
                return d
            },destroy: function() {
                u.DEvent.destroy();
                j = null;
                a.removeEvent(j.getDom("close"), "click", u.cancelFun);
                a.removeEvent(u.nodes.input, "focus", u.inputFocus);
                a.removeEvent(u.nodes.input, "blur", u.inputBlur)
            }}, v = function(e) {
            var f = d.getNode(), g = b.getFeeds(f, 'node-type="feed_list_shieldKeyword"')[0], h = a.core.dom.dir(g, {dir: "next",expr: '[action-type="feed_list_item"]',endpoint: b.getFeeds(f, 'node-type="feed_list_page"')[0],matchAll: !0});
            if (n) {
                h.length && a.core.arr.foreach(h, function(b, c) {
                    a.removeNode(b)
                });
                e.el.innerHTML = c("#L{查看已过滤微博}");
                n = !n
            } else {
                if (m)
                    return !1;
                m = !0;
                b.getFeedTrans("showfiltermblogs", {onSuccess: function(b) {
                        a.insertHTML(g, b.data, "afterend");
                        n = !n;
                        e.el.innerHTML = c("#L{收起已过滤微博}");
                        m = !1
                    },onError: function() {
                        m = !1
                    }}).request(e.data)
            }
            return b.preventDefault
        }, w = function() {
            if (m)
                return !1;
            m = !0;
            j || (j = a.ui.dialog());
            u.init();
            b.getFeedTrans("showblock", {onSuccess: function(b) {
                    var d = {isMember: !1,messageTip: "",zeroTip: "",nokeyTip: "",list: []};
                    o = b.data.is_member;
                    d = a.parseParam(d, g[o]);
                    if (o == "1" || o == "2")
                        p = d.isMember = !0;
                    b.data.blockwords && (d.list = b.data.blockwords.split(/\s+/g));
                    l = d.list;
                    var e = c(a.core.util.easyTemplate(f, d).toString());
                    u.show(e);
                    r = !1;
                    m = !1
                },onError: function() {
                    m = !1
                }}).request({});
            return b.preventDefault
        };
        k.add("feed_list_shieldBar", "click", v);
        k.add("setKeyword", "click", w);
        a.custEvent.define(d, "setkeyword");
        a.custEvent.add(d, "setkeyword", w);
        e.destroy = function() {
            k.destroy();
            u.destroy();
            a.custEvent.remove(d, "setkeyword", w)
        };
        return e
    }
});
STK.register("common.dialog.orientGrpMem", function(a) {
    var b = a.kit.extra.language, c = a.common.relation.followPrototype, d = '<div class="W_layer" node-type="outer" style="display:none;position:absolute;z-index:10001"><div class="bg"><table border="0" cellspacing="0" cellpadding="0"><tr><td><div class="content" node-type="layoutContent"><div class="title" node-type="title"><span node-type="title_content"></span></div><a href="javascript:void(0);" class="W_close" title="#L{关闭}" node-type="close"></a><div node-type="inner" class="layer_group_person"></div></div></td></tr></table></div></div>';
    return function(e) {
        var f = 0, g = [], h = 1, i, j, k, l, m, n, o, p = !1, q = {}, r = function(a) {
            if (!j || !k)
                return !1;
            j.innerHTML = "(" + a + ")";
            a == 0 ? k.className = "W_btn_a_disable" : k.className = "W_btn_a"
        }, s = a.common.trans.group.getTrans("orientGroup", {onSuccess: function(c) {
                var d = c.data.html;
                d && m.setContent(d);
                u.initPars();
                if (p) {
                    o = "#L{查看分组成员}：(" + c.data.num + "#L{人})";
                    m.setTitle(b(o));
                    a.custEvent.fire(q, "showDia", !0);
                    p = !1
                }
            },onError: function(c) {
                a.ui.alert(c.msg || b("#L{错误}"));
                a.custEvent.fire(q, "showDia", !1)
            }}), t = {prev: function(b) {
                a.preventDefault();
                h = h - 1;
                i.page = b.data.page;
                s.request(i)
            },next: function(b) {
                a.preventDefault();
                h = h + 1;
                i.page = b.data.page;
                s.request(i)
            },tab: function(b) {
                a.preventDefault();
                h = 1;
                var c = b.data;
                i.page = c.page;
                i.g_type = c.g_type;
                s.request(i)
            },followBtnClick: function(b) {
                a.preventDefault();
                if (f == 0)
                    return !1;
                var d = {};
                if (g.length) {
                    d.uid = g.join(",");
                    d.location = "all";
                    d.refer_sort = "targeted-micro";
                    d.refer_flag = "all";
                    d.onSuccessCb = function() {
                        i.page = h;
                        s.request(i)
                    };
                    c.follow(d)
                }
            },itemClick: function(b) {
                var c = b.data.uid, d = a.core.arr.indexOf(c, g);
                if (d < 0) {
                    g.push(c);
                    r(++f);
                    b.el.className = "myfollow_list selected S_line2 SW_fun"
                } else {
                    g.splice(d, 1);
                    r(--f);
                    b.el.className = "myfollow_list S_line2 SW_fun"
                }
            }}, u = {init: function() {
                m = a.ui.mod.dialog(b(d));
                a.kit.dom.drag(m.getDom("title"), {actObj: m,moveDom: m.getOuter()});
                q = m;
                u.bind()
            },bind: function() {
                a.custEvent.define(q, "showDia");
                l = a.core.evt.delegatedEvent(m.getDom("outer"));
                for (var b in t)
                    l.add(b, "click", t[b])
            },newGroup: function(b) {
                p = !0;
                h = 1;
                i = a.parseParam({uid: "",gid: "",g_type: 0,page: 1}, b);
                s.request(i)
            },initPars: function() {
                try {
                    f = 0;
                    g = [];
                    n = a.builder(m.getDom("inner")).list;
                    j = n.followNumNode[0];
                    k = n.followBtn[0]
                } catch (b) {
                }
            },destroy: function() {
                l && l.destroy();
                m.hide();
                m = null
            }};
        u.init();
        q.newGroup = u.newGroup;
        q.destroy = u.destroy;
        return q
    }
});
STK.register("common.feed.feedList.plugins.orientGrpMem", function(a) {
    var b = a.common.feed.feedList.utils;
    return function(c) {
        if (!c)
            a.log("orientGrpMem : need object of the baseFeedList Class");
        else {
            var d, e, f, g, h = !1, i = function() {
                var c = g.offsetHeight, e = b.getFeedNode(g), f = d.getOuter(), h = a.position(e);
                h.l = h.l + e.offsetWidth / 2 - f.offsetWidth / 2;
                h.t = h.t + c;
                d.setPosition(h)
            }, j = {feed_list_grpMember: function(c) {
                    f = b.getMid(c.el);
                    g = c.el;
                    if (e == f || h)
                        return !1;
                    if (!d) {
                        d = a.common.dialog.orientGrpMem();
                        d.setBeforeHideFn(function() {
                            e = undefined;
                            h = !1
                        });
                        a.custEvent.add(d, "showDia", function(a, b) {
                            if (f != e && b) {
                                d.show();
                                i();
                                e = f
                            }
                            h = !1
                        })
                    }
                    h = !0;
                    d.newGroup(c.data);
                    return b.preventDefault(c.evt)
                }}, k = {init: function() {
                    k.bind()
                },bind: function() {
                    c.getDEvent().add("feed_list_grpMember", "click", j.feed_list_grpMember)
                },destroy: function() {
                    c.getDEvent().remove("feed_list_grpMember", "click", j.feed_list_grpMember);
                    d && d.destroy && d.destroy()
                }};
            k.init();
            var l = {};
            l.destroy = k.destroy;
            return l
        }
    }
});
STK.register("common.feed.feedList.plugins.wbmlLoader", function(a) {
    var b = a.common.feed.feedList.utils;
    return function(b) {
        if (!b)
            a.log("wbmlLoader : need object of the baseFeedList Class");
        else {
            var c = {}, d = b.getNode(), e = {}, f = function(b) {
                var c = b.getAttribute("wbml-data"), f = a.core.json.queryToJson(c);
                if (f.preload) {
                    mid = a.kit.dom.parentAttr(b, "mid", d);
                    mid = "repload" + mid;
                    if (e[mid])
                        return;
                    a.common.feed.widget.clear(mid);
                    a.common.feed.widget.add(mid, b);
                    e[mid] = b
                }
            }, g = function(b, c) {
                setTimeout(function() {
                    var b = a.sizzle("[mid]", d)[0], c = a.sizzle("[wbml-data]", b)[0];
                    c && f(c)
                }, 100)
            }, h = function() {
                var b = a.core.util.scrollPos(), c = a.core.util.pageSize(), d = {scrollLeft: b.left,scrollTop: b.top,winWidth: c.win.width,winHeight: c.win.height,pageWidth: c.page.width,pageHeight: c.page.height};
                a.common.channel.window.fire("scroll", d)
            }, i = function(b, c) {
                c != "lazyload" && c != "newFeed" && (e = {});
                setTimeout(function() {
                    var b = a.sizzle("div[wbml-data]", d);
                    b = a.common.extra.lazyload(b, function(a) {
                        f(a)
                    }, {threshold: a.winSize().height});
                    h()
                }, 100)
            };
            i();
            setTimeout(function() {
                var b = a.core.util.scrollPos(), c = a.core.util.pageSize(), d = {scrollLeft: 0,scrollTop: 0,winWidth: c.win.width + b.left,winHeight: c.win.height + b.top,pageWidth: c.page.width,pageHeight: c.page.height};
                a.common.channel.window.fire("scroll", d)
            }, 300);
            a.common.channel.feed.register("forward", g);
            a.common.channel.feed.register("publish", g);
            a.custEvent.add(b, "updateFeed", i);
            c.destroy = function() {
                a.custEvent.remove(b, "updateFeed", i);
                a.common.channel.feed.remove("forward", g);
                a.common.channel.feed.remove("publish", g);
                e = null
            };
            return c
        }
    }
});
STK.register("common.feed.feedList.plugins.followbtn", function(a) {
    var b = a.kit.extra.language, c = a.common.channel.relation, d = a.common.relation.followPrototype, e = {followed: b('<a node-type="feedfollow" href="javascript:void(0)" class="W_btn_c"><span>#L{已关注}</span></a>'),unfollow: b('<a node-type="feedfollow" action-type="feedfollow" href="javascript:void(0)" class="W_btn_b"><span><em class="addicon">+</em>#L{关注}</span></a>')};
    return function(b) {
        if (!b)
            a.log("follow: need object of the baseFeedList Class ");
        else {
            var f = {}, g, h, i, j = function(b) {
                return a.sizzle("[feedfollow_uid=" + b + "]", g)
            }, k = function(b) {
                var c = a.kit.extra.merge({onSuccessCb: function(b) {
                        i = i || a.common.dialog.setGroup();
                        i.show({uid: b.uid,fnick: b.fnick,groupList: b.group,hasRemark: !0})
                    }}, b.data || {});
                c = a.kit.extra.merge(c, a.queryToJson(b.el.getAttribute("data-mark") || "") || {});
                c = a.common.getDiss(c, b.el);
                d.follow(c);
                a.preventDefault()
            }, l = function(b) {
                var c = b.uid, d = j(c);
                for (var f = 0, g = d.length, h, i, k; f < g; f++) {
                    h = a.builder(e.followed).list.feedfollow[0];
                    h.setAttribute("feedfollow_uid", c);
                    h.setAttribute("action-data", d[f].getAttribute("action-data"));
                    (i = d[f].getAttribute("data-mark")) && h.setAttribute("data-mark", i);
                    (k = d[f].getAttribute("diss-data")) && h.setAttribute("diss-data", k);
                    a.replaceNode(h, d[f])
                }
            }, m = function(b) {
                var c = b.uid, d = j(c);
                for (var f = 0, g = d.length, h, i, k; f < g; f++) {
                    h = a.builder(e.unfollow).list.feedfollow[0];
                    h.setAttribute("feedfollow_uid", c);
                    h.setAttribute("action-data", d[f].getAttribute("action-data"));
                    (i = d[f].getAttribute("data-mark")) && h.setAttribute("data-mark", i);
                    (k = d[f].getAttribute("diss-data")) && h.setAttribute("diss-data", k);
                    a.replaceNode(h, d[f])
                }
            }, n = function() {
                g = b.getNode()
            }, o = function() {
                h = b.getDEvent();
                h.add("feedfollow", "click", k);
                c.register("follow", l);
                c.register("unFollow", m)
            }, p = function() {
                n();
                o()
            }, q = function() {
                i && i.destroy();
                i = null;
                h && h.destroy();
                h = null;
                c.remove("follow", l);
                c.remove("unFollow", m)
            };
            p();
            f.destroy = q;
            return f
        }
    }
});
STK.register("common.trans.forward", function(a) {
    var b = a.kit.io.inter(), c = b.register;
    c("toMicroblog", {url: "/aj/mblog/forward?_wv=5",method: "post"});
    c("toMicrogroup", {url: "/aj/weiqun/forward?_wv=5",method: "post"});
    c("setDefault", {url: "/aj/mblog/repost/setdefault?_wv=5",method: "post"});
    c("simpleForwardLinks", {url: "/aj/mblog/repost/unexpanded?_wv=5",method: "get"});
    c("detailForwardLinks", {url: "/aj/mblog/repost/small?_wv=5",method: "get"});
    c("microgroupList", {url: "/aj/weiqun/mylist?_wv=5",method: "get"});
    return b
});
STK.register("common.forward.utils", function(a) {
    var b = {checkAtNum: function(a) {
            var b = a.match(/@[a-zA-Z0-9\u4e00-\u9fa5_]{0,20}/g), c = a.match(/\/\/@[a-zA-Z0-9\u4e00-\u9fa5_]{0,20}/g);
            b = b ? b.length : 0;
            c = c ? c.length : 0;
            return b - c
        },preventDefault: function(b) {
            a.core.evt.preventDefault(b);
            return !1
        }};
    return b
});
STK.register("common.content.report", function(a) {
    return function(b) {
        window.open("http://weibo.com/complaint/complaint.php?url=" + a.kit.extra.parseURL().url);
        a.core.evt.preventDefault(b.evt);
        return !1
    }
});
STK.register("common.forward.toMicroblog", function(a) {
    var b = a.kit.extra.language, c = null, d = a.common.dialog.validateCode(), e = b('<#et userlist data><div node-type="toMicroblog_client" class="toMicroblog<#if (data.isDialog == true)>Layer</#if>"><#if (data.isDialog == true)><div class="forward_content" node-type="content"><#if (data.showArrow == true)><span class="W_arrow" action-type="origin_all"><em class="down">◆</em></span></#if>${data.content}</div></#if><div class="feed_repeat"><div class="input clearfix"><p class="num" node-type="num">140 #L{字}</p><textarea class="W_input" name="" rows="" cols="" title="#L{转发微博}#L{内容}" node-type="textEl">${data.reason}</textarea><div class="action clearfix" node-type="widget"><span class="W_ico16 ico_faces" title="#L{表情}" node-type="smileyBtn"></span><ul node-type="cmtopts" class="commoned_list"><#if (data.forwardNick)><li node-type="forwardLi"><label><input type="checkbox" node-type="forwardInput" class="W_checkbox" />#L{同时评论给} ${data.forwardNick}</label></li></#if><#if (data.originNick)><li node-type="originLi"><label><input type="checkbox" node-type="originInput" class="W_checkbox" /><#if (data.forwardNick)>#L{同时评论给原文作者} <#else>#L{同时评论给} </#if>${data.originNick}</label></li></#if></ul></div><p class="btn"><a action-data="rank=0" action-type="showPublishTo" node-type="showPublishTo" href="javascript:void(0)" class="W_moredown" title="#L{公开-你发表的微博可以被大家公开查看哦}"><span node-type="publishTotext">#L{公开}</span><span class="W_arrow"><em class="down" node-type="publish_to_arrow">◆</em></span></a><a href="#" title="#L{转发}#L{按钮}" onclick="return false;" class="W_btn_d btn_noloading" node-type="submit"><span><b class="loading"></b><em node-type="btnText">#L{转发}</em></span></a></p></div></div><#if (data.isDialog == true)><div node-type="forward_link"></div></#if></div>'), f = {notice: "#L{请输入转发理由}",defUpdate: "#L{转发微博}",netError: "#L{系统繁忙}",success: "#L{转发成功}!",retry: '#L{读取失败，请}<a href="#" onclick="return false;" action-type="retry" value="retry">#L{重试}</a>',off: "#L{关闭}",on: "#L{开启}"}, g = {limitNum: 140,tipText: b(f.notice),count: "disable"}, h = function(a, c) {
        c == "normal" ? a.innerHTML = b("#L{转发}") : a.innerHTML = b("#L{提交中...}")
    };
    return function(i, j, k) {
        if (i == null || j == null)
            throw new Error("[common.forward.toMicroblog]Required parameter client is missing");
        var l = k.data, m = 56, n = !1, o = l.originNick ? "@" + l.originNick : "", p = a.kit.extra.toFeedText(l.origin.replace(/<[^>]+>/gi, ""));
        l.content = p + "";
        if (a.bLength(a.core.str.decodeHTML(a.kit.extra.toFeedText(p + o))) > m) {
            l.content = a.leftB(p, m - a.bLength(o)) + "...";
            n = !0
        } else
            l.content = l.origin;
        o ? o = '<a class="S_func1" href="/' + (l.domain || l.rootuid || l.uid) + '" target="_blank">' + o + "</a>:" : o = "";
        l.content = o + l.content;
        var q = l.reason || "", r = l.forwardNick ? "//@" + l.forwardNick + ":" + " " : "", s, t, u, v, w, x, y, z, A, B, C, D, E, F, G = !1, H = !1, I, J, K = a.common.forward.utils, L, M = {};
        M.client = i;
        M.opts = k.data || {};
        M.isInit = !1;
        u = a.parseParam({appkey: "",styleId: "1",mark: ""}, M.opts);
        a.custEvent.define(M, ["forward", "hide", "center", "count"]);
        var N = function() {
            if (v)
                w === "error" && a.common.extra.shine(t.textEl);
            else {
                var d = a.trim(s.API.getWords() || "");
                d === b(f.notice) && (d = "");
                v = !0;
                w = "loading";
                t.submit.className = "W_btn_a_disable";
                h(t.btnText, "loading");
                var e = {};
                e.appkey = u.appkey;
                e.mid = j;
                e.style_type = u.styleId;
                e.mark = u.mark;
                e.reason = d || b(f.defUpdate);
                t.originInput && t.originInput.checked && (e.is_comment_base = "1");
                if (t.forwardInput && t.forwardInput.checked) {
                    e.is_comment = "1";
                    G = !0
                }
                L && L.disable();
                if (L) {
                    var g = L.rank();
                    e.rank = g.rank;
                    e.rankid = g.rankid
                }
                e = a.common.getDiss(e, t.submit);
                c = e;
                if (K.checkAtNum(d) > 5) {
                    a.ui.confirm(b("#L{单条微博里面@ 太多的人，可能被其它用户投诉。如果投诉太多可能会被系统封禁。是否继续转发？}"), {OK: function() {
                            x.request(e)
                        },cancel: function() {
                            v = !1;
                            w = "";
                            t.submit.className = "W_btn_d btn_noloading";
                            h(t.btnText, "normal")
                        }});
                    return
                }
                x.request(e)
            }
        }, O = function(a) {
            if ((a.keyCode === 13 || a.keyCode === 10) && a.ctrlKey) {
                s.API.blur();
                N()
            }
        }, P = function() {
            var a = s.API.count(), c = g.limitNum - a, d = c >= 0 ? !0 : !1;
            if (d) {
                v = !1;
                w = "";
                d && (t.num.innerHTML = b("#L{还可以输入}<span>" + c + "</span> #L{字}"))
            } else {
                v = !0;
                w = "error";
                t.num.innerHTML = b('#L{已经超过}<span class="S_error">' + Math.abs(c) + "</span> #L{字}")
            }
        }, Q = function(d, e) {
            v = !1;
            w = "";
            c = null;
            t.submit.className = "W_btn_d btn_noloading";
            h(t.btnText, "normal");
            try {
                d.data.isComment = G;
                d.data.isToMiniBlog = !0;
                a.custEvent.fire(M, "forward", [d.data, e, k.inDialog]);
                a.common.channel.feed.fire("forward", [d.data, e, k.inDialog])
            } catch (g) {
            }
            a.custEvent.fire(M, "hide");
            setTimeout(function() {
                a.ui.litePrompt(b(f.success), {type: "succM",timeout: "500"})
            }, 50);
            G = !1;
            s.API.reset();
            L && L.reset()
        }, R = function(c, d) {
            v = !1;
            w = "";
            t.submit.className = "W_btn_d btn_noloading";
            h(t.btnText, "normal");
            c.msg = c.msg || b(f.netError);
            a.common.layer.ioError(c.code, c);
            G = !1;
            L && L.enable()
        }, S = function(c, d) {
            v = !1;
            w = "";
            t.submit.className = "W_btn_d btn_noloading";
            h(t.btnText, "normal");
            a.ui.alert(b(f.netError));
            L && L.enable()
        }, T = function() {
            A.request({mid: j,d_expanded: C,expanded_status: H ? D === "on" ? 1 : 2 : ""});
            H = !0
        }, U = function() {
            C = a.core.util.storage.get("forward_link_status");
            C == "null" && (C = "off");
            D = C
        }, V = function(b) {
            if (b == null)
                throw new Error("[common.forward.toMicroblog]function - setSwitchStatus required parameter sStatus is missing");
            y.request({d_expanded: b});
            a.core.util.storage.set("forward_link_status", b);
            C = b
        }, W = function() {
            B = a.builder(i);
            B = a.kit.dom.parseDOM(B.list).toMicroblog_client;
            s = a.common.editor.base(B, g);
            s.widget(a.common.editor.widget.face(), "smileyBtn");
            t = s.nodeList;
            L = a.common.editor.plugin.publishTo({editorWrapEl: i,textEl: t.textEl});
            a.addEvent(t.textEl, "focus", function() {
                I = setInterval(function() {
                    P()
                }, 200)
            });
            a.addEvent(t.textEl, "blur", function() {
                clearInterval(I)
            });
            s.API.insertText(r + a.core.str.decodeHTML(a.kit.extra.toFeedText(q)));
            a.kit.dom.autoHeightTextArea({textArea: t.textEl,maxHeight: 145,inputListener: a.funcEmpty});
            F && T()
        }, X = function() {
            a.addEvent(t.submit, "click", N);
            a.addEvent(t.textEl, "keypress", O);
            if (F) {
                E = a.delegatedEvent(B);
                E.add("origin_all", "click", function(a) {
                    t.content.innerHTML = o + l.origin
                });
                E.add("report", "click", function(b) {
                    return a.common.content.report(b)
                });
                E.add("switch", "click", function(c) {
                    var d = {1: "on",2: "off"}, e = d[c.data.id];
                    V(e);
                    a.setStyle(c.el, "left", e == "on" ? "23px" : "0px");
                    c.el.setAttribute("action-data", e == "on" ? "id=2" : "id=1");
                    c.el.setAttribute("title", e == "on" ? b(f.off) : b(f.on))
                });
                E.add("retry", "click", function(a) {
                    T()
                });
                E.add("show", "click", function(a) {
                    D = a.data.id * 1 == 1 ? "on" : "off";
                    T()
                })
            }
        }, Y = function() {
        }, Z = function(a, b) {
            D = D == "on" ? "off" : "on";
            t.forward_link.innerHTML = a.data.html || "";
            if (t.cmtopts && a.data.permission && a.data.permission.allowComment == 0) {
                t.cmtopts.style.display = "none";
                t.cmtopts.innerHTML = ""
            } else if (t.originLi && a.data.permission && a.data.permission.allowRootComment == 0) {
                t.originLi.style.display = "none";
                t.originLi.innerHTML = ""
            }
        }, _ = function() {
            t.forward_link.innerHTML = b(f.retry)
        }, ba = function(a, b) {
            D = D == "on" ? "off" : "on"
        }, bb = function() {
            a.ui.alert(b(f.netError))
        }, bc = function() {
            x = a.common.trans.forward.getTrans("toMicroblog", {onComplete: function(a, b) {
                    var e = {onSuccess: Q,onError: R,requestAjax: x,param: c,onRelease: function() {
                            v = !1;
                            w = "";
                            t.submit.className = "W_btn_d btn_noloading";
                            h(t.btnText, "normal");
                            G = !1;
                            L && L.enable()
                        }};
                    d.validateIntercept(a, b, e)
                },onFail: S,onTimeout: R});
            y = a.common.trans.forward.getTrans("setDefault", {onSuccess: ba,onError: bb,onFail: bb});
            z = a.common.trans.forward.getTrans("simpleForwardLinks", {onSuccess: Z,onError: _,onFail: _});
            A = a.common.trans.forward.getTrans("detailForwardLinks", {onSuccess: Z,onError: _,onFail: _})
        }, bd = function() {
        }, be = function() {
            U();
            bc();
            W();
            X();
            bd();
            Y()
        }, bf = function(b) {
            if (M.isInit == !1) {
                k.data.isDialog = b;
                F = b;
                k.data.showArrow = n;
                a.addHTML(i, a.core.util.easyTemplate(e, k.data));
                s || be();
                M.isInit = !0
            } else
                B && a.setStyle(B, "display", "");
            s.API.focus(0)
        }, bg = function() {
            a.common.extra.shine(s.nodeList.textEl)
        }, bh = function() {
            s.API.blur();
            B != null && a.setStyle(B, "display", "none")
        }, bi = function() {
            a.removeEvent(t.submit, "click", N);
            a.removeEvent(t.textEl, "keypress", O);
            a.custEvent.undefine(M);
            E && E.remove("origin_all", "click");
            E && E.remove("report", "click");
            E && E.remove("switch", "click");
            E && E.remove("retry", "click");
            E && E.remove("show", "click");
            E = null;
            d && d.destroy && d.destroy();
            L && L.destroy && L.destroy();
            s.closeWidget();
            I && clearInterval(I);
            s = null;
            t = null;
            x = null;
            B = null;
            for (var b in M)
                delete M[b];
            M = null
        };
        M.show = bf;
        M.hide = bh;
        M.shine = bg;
        M.destory = bi;
        return M
    }
});
STK.register("common.trans.message", function(a) {
    var b = a.kit.io.inter(), c = b.register;
    c("delete", {url: "/aj/message/del?_wv=5",method: "post"});
    c("getMsg", {url: "/aj/message/getmessagedetail?_wv=5",method: "get"});
    c("deleteUserMsg", {url: "/aj/message/destroy?_wv=5",method: "post"});
    c("create", {url: "/aj/message/add?_wv=5",method: "post"});
    c("search", {url: "/message",method: "get"});
    c("attachDel", {url: "/aj/message/attach/del?_wv=5",method: "get"});
    c("getDetail", {url: "/aj/message/detail?_wv=5",method: "get"});
    c("getSearchList", {url: "/aj/message/detail?_wv=5",method: "get"});
    c("getDetailList", {url: "/aj/message/detail?_wv=5",method: "get"});
    c("noConfirm", {url: "/aj/bubble/closebubble?_wv=5",method: "get"});
    return b
});
STK.register("common.bubble.myFollowSuggest", function(a) {
    var b = '<div style="position: absolute; top: -2000px; left: -2000px; z-index: 100001;" node-type="___followListSuggest___" class="layer_menu_list"></div>', c = '<#et userlist data><ul><#list data.users as list><li action-type="followItem" action-data="index=${list.uid}"><a href="#" onclick="return false;">${list.screen_name}</a></li></#list></ul>';
    return function(d) {
        function F() {
            a.removeEvent(g, "keyup", r);
            g = null
        }
        function E() {
            h.innerHTML = "";
            a.setStyle(h, "left", "-2000px");
            a.setStyle(h, "top", "-2000px");
            k = null;
            a.removeEvent(document.body, "click", E)
        }
        function D() {
            y();
            e || C()
        }
        function C() {
            j = g.value;
            z();
            A();
            B()
        }
        function B() {
            e = a.ui.mod.suggest({textNode: g,uiNode: h,actionType: "followItem",actionData: "index"});
            a.custEvent.add(e, "onIndexChange", w);
            a.custEvent.add(e, "onSelect", x);
            a.custEvent.add(e, "onClose", E);
            a.addEvent(g, "keyup", r)
        }
        function A() {
            f = a.common.trans.global.getTrans(d.transName || "followList", {onSuccess: t,onError: u,onFail: u})
        }
        function z() {
            var c = a.sizzle('div[node-type="___followListSuggest___"]', document.body);
            if (a.objIsEmpty(c) && !h) {
                c = a.builder(b);
                document.body.appendChild(c.box);
                c = a.sizzle('div[node-type="___followListSuggest___"]', document.body);
                !a.objIsEmpty(c) && (c = c[0])
            }
            h = a.isArray(c) ? c[0] : c;
            d.width && function() {
                var a = parseInt(d.width, 10);
                h.style.width = d.width + (a == d.width ? "px" : "")
            }()
        }
        function y() {
            i = -1
        }
        function x(a, b) {
            if (!(b == null || b < 0)) {
                j = n[b].screen_name;
                j = j.replace(/\(.*\)/, "");
                g.value = j;
                E();
                p && p(n[b])
            }
        }
        function w(a, b) {
            if (!!m && m.length != 0) {
                l != null && m[l] && (m[l].className = "");
                b == null && (b = 0);
                m[b].className = "cur";
                l = b
            }
        }
        function v() {
            var b = a.sizzle("li", h);
            m = b
        }
        function u(a, b) {
            E()
        }
        function t(b, d) {
            var e;
            h.innerHTML = a.core.util.easyTemplate(c, {users: b.data || []});
            a.addEvent(document.body, "click", E);
            n = b.data;
            e = a.position(g);
            a.setStyle(h, "left", e.l + "px");
            a.setStyle(h, "top", e.t + g.scrollHeight + "px");
            v();
            a.custEvent.fire(g, "indexChange", 0);
            b.data.length || E()
        }
        function s() {
            f.request(a.parseParam({q: g.value,type: 0}, d))
        }
        function r() {
            if (!k) {
                a.custEvent.fire(g, "open", g);
                k = !0
            }
            if (a.trim(g.value) != "" && g.value != j) {
                j = g.value;
                s()
            } else if (a.trim(g.value) == "") {
                E();
                j = ""
            }
        }
        var e, f, g, h, i, j, k, l, m, n, o, p;
        if (d == null || d != null && d.textNode == null)
            throw new Error("[common.bubble.myFollowSuggest]Required parameter opts.textNode is missing");
        g = d.textNode;
        p = d.callback;
        d.list_template && (c = d.list_template);
        if (!a.isNode(g))
            throw new Error("[common.bubble.myFollowSuggest]Required parameter opts.textNode is NOT a html node.");
        var q = {};
        q.show = D;
        q.hide = E;
        q.destroy = F;
        return q
    }
});
STK.register("common.content.message.upload.start", function(a) {
    var b = a.kit.extra.language;
    return function(b, c, d) {
        var e = c, c = a.core.str.bLength(c) > 20 ? a.core.str.leftB(c, 20) + "..." : c;
        a.log("[common.content.message.upload.start]: swf", a.sizzle("[swfid=" + b + "]"), d);
        var f = '<li node-type="li_' + d + '"><p class="W_loading"><span>' + c + '&nbsp;&nbsp;上传中... <a href="javascript:void(0);" token="' + d + '" node-type="cancelUpload" action-type="cancelUpload" action-data="swfId=' + b + '">取消上传</a></span></p></li>', g = a.sizzle("[swfid=" + b + "]")[0];
        g.style.display = "block";
        g.innerHTML += f
    }
});
STK.register("common.content.message.upload.getExt", function(a) {
    var b = {csv: "csv",doc: "word",docx: "word",xls: "excel",xlsx: "excel",ppt: "ppt",pptx: "ppt",pdf: "pdf",rar: "rar",zip: "rar",txt: "txt",mp3: "music",avi: "video",flv: "video",mkv: "video",mp4: "video",mpeg: "video",mpg2: "video",rmvb: "video"};
    return function(c) {
        var d = a.trim(c.match(/[^\.]+$/)[0]).toLowerCase();
        return typeof b[d] != "undefined" ? b[d] : "default"
    }
});
STK.register("common.channel.flashUpImg", function(a) {
    var b = ["initFun", "changeFlashHeightFun", "uploadCompleteFun", "closePhotoEditorFun", "cannelUpload", "completeUpload"];
    return a.common.listener.define("common.channel.flashUpImg", b)
});
STK.register("common.content.message.upload.complete", function(a) {
    return function(b, c, d, e) {
        var f, g, h, i = a.common.content.message.upload.getExt(d), j = d, d = a.core.str.bLength(d) > 20 ? a.core.str.leftB(d, 20) + "..." : d;
        if (typeof e == "object") {
            f = e;
            g = STK.core.json.jsonToQuery(f)
        } else if (typeof e == "string") {
            g = e;
            f = STK.core.json.strToJson(e)
        }
        e.thumbnail ? h = '<img src="' + e.thumbnail + '" class="img" alt="图片" title="' + j + '">' + d + '<span class="func"><a class="S_link2 del" href="javascript:void(0)" node-type="deleteFile" action-type="deleteFile" action-data="swfId=' + b + "&" + g + '">删除</a></span>' : h = '<i><img src="' + $CONFIG.imgPath + "style/images/accessory/" + i + '.png" class="doc" alt="附件文件" title="' + j + '"></i>' + d + '<span class="func"><a class="S_link2 del" href="javascript:void(0)" node-type="deleteFile" action-type="deleteFile" action-data="swfId=' + b + "&" + g + '">删除</a></span>';
        var k = a.sizzle('li[node-type="li_' + c + '"]')[0];
        k.innerHTML = h;
        var l = k.parentNode.getAttribute("fid") || "";
        k.parentNode.setAttribute("fid", l + f.fid + ",");
        a.common.channel.flashUpImg.fire("completeUpload")
    }
});
STK.register("common.content.message.upload.showMsg", function(a) {
    return function(a) {
        STK.ui.alert(a)
    }
});
STK.register("kit.dom.dir", function(a) {
    return function(b, c) {
        c = a.parseParam({dir: "parentNode",expr: undefined,endpoint: document,maxLength: 1}, c);
        var d = c.dir, e = c.expr, f = c.endpoint, g = c.maxLength;
        if (!b || !e)
            a.log("kit dir: node or opts.expr is undefined.");
        else {
            var h = [], i = b[d];
            while (i) {
                if (i.nodeType == 1 && a.sizzle(e, null, null, [i]).length > 0) {
                    h.push(i);
                    if (h.length == g)
                        break
                }
                if (i == f)
                    break;
                i = i[d]
            }
            return h
        }
    }
});
STK.register("kit.dom.parents", function(a) {
    return function(b, c) {
        c = a.parseParam({expr: undefined,endpoint: document,maxLength: 1}, c);
        var d = c.expr;
        if (!b || !d)
            a.log("kit parents: node or opts.expr is undefined.");
        else
            return a.kit.dom.dir(b, c)
    }
});
STK.register("common.content.message.upload.deleteItem", function(a) {
    return function(b, c, d) {
        var e;
        e = b;
        if (b.tagName != "LI")
            var f = a.kit.dom.parents(b, {expr: "li"}), e = f[0];
        var g = e.parentNode;
        a.removeNode(e);
        if (g.tagName == "UL") {
            a.sizzle("li", g).length == 0 && (g.style.display = "none");
            if (c == "delete") {
                var h = d.fid, i = g.getAttribute("fid"), j = i.replace(h + ",", "");
                g.setAttribute("fid", j)
            }
        }
    }
});
STK.register("common.content.message.upload.addItem", function(a) {
    var b = a.kit.extra.language;
    return function(b, c, d) {
        var e = b.getAttribute("swfId") || "", f, g = a.common.content.message.upload.getExt(c), h = c, c = a.core.str.bLength(c) > 20 ? a.core.str.leftB(c, 20) + "..." : c;
        d.thumbnail && d.thumbnail.length != 0 ? f = '<img src="' + d.thumbnail + '" class="img" alt="图片" title="' + h + '">' + c + '<span class="func"><a class="S_link2 del" href="javascript:void(0)" node-type="deleteFile" action-type="deleteFile" action-data="swfId=' + e + "&" + STK.core.json.jsonToQuery(d) + '">删除</a></span>' : f = '<i><img src="' + $CONFIG.imgPath + "style/images/accessory/" + g + '.png" class="doc" alt="附件文件" title="' + h + '"></i>' + c + '<span class="func"><a class="S_link2 del" href="javascript:void(0)" node-type="deleteFile" action-type="deleteFile" action-data="swfId=' + e + "&" + STK.core.json.jsonToQuery(d) + '">删除</a></span>';
        var i = "<li>" + f + "</li>";
        b.style.display = "block";
        b.innerHTML += i;
        var j = b.getAttribute("fid") || "";
        b.setAttribute("fid", j + d.fid + ",")
    }
});
STK.register("kit.extra.runFlashMethod", function(a) {
    return function(a, b, c) {
        var d, e, f, g = function() {
            if (a[b]) {
                e = !0;
                clearTimeout(d);
                try {
                    a.TotalFrames()
                } catch (h) {
                    a.TotalFrames
                }
                c()
            } else
                f = setTimeout(g, 100)
        };
        g();
        d = setTimeout(function() {
            e || clearTimeout(f)
        }, 1e4);
        return {destroy: function() {
                clearTimeout(d);
                clearTimeout(f)
            }}
    }
});
STK.register("common.content.message.upload.getFlash", function(a) {
    return function(b) {
        return a.sizzle('[flashobj="' + b + '"]')[0]
    }
});
STK.register("common.content.message.upload.cancel", function(a) {
    return function(b, c) {
        a.log("cancelUpload", b, c);
        var d = a.sizzle('li[node-type="li_' + c + '"]')[0];
        a.common.content.message.upload.deleteItem(d, "cancel");
        a.common.channel.flashUpImg.fire("cannelUpload");
        var e = a.common.content.message.upload.getFlash(b);
        a.kit.extra.runFlashMethod(e, "cancelUpload", function() {
            try {
                e.cancelUpload(c)
            } catch (a) {
            }
        })
    }
});
STK.register("module.getLang", function(a) {
    return function(a, b) {
        return $CONFIG.lang
    }
});
STK.register("common.content.message.upload.loadSwf", function(a) {
    return function(b, c) {
        var d = parseInt(Math.random() * 1e4, 10), e = {width: "110",height: "16",paras: {allowScriptAccess: "always",wmode: "transparent"},flashvars: {space: "17",maxNum: 10,width: "18",height: "15",swfid: d,maxSize: 52428800,iExt: "*.jpg; *.gif; *.jpeg; *.png",fExt: "",domain: "http://" + document.domain}}, f = c && c.flashvars;
        if (f)
            for (var g in f)
                e.flashvars[g] = f[g];
        a.log("parrentDom", b, STK.sizzle('[node-type="uploadSwf"]', b));
        var h = function() {
            a.kit.extra.installFlash()
        };
        if (a.kit.extra.getFlashVersion() >= 10) {
            var i = STK.core.util.swf.create(STK.sizzle('[node-type="uploadSwf"]', b)[0], $CONFIG.jsPath + "home/static/swf/upload.swf?ver=" + $CONFIG.version, e);
            i.setAttribute("flashObj", d);
            i.flashObj = d;
            a.sizzle('[node-type="uploadList"]', b)[0].setAttribute("swfid", d)
        } else {
            var j = STK.sizzle('[node-type="uploadSwf"]', b)[0];
            j.style.cssText = "background:#000;filter:alpha(opacity=0)9;opacity:0;width:110px;";
            a.addEvent(j, "click", h)
        }
        return d
    }
});
STK.register("common.content.message.upload.delegateEvt", function(a) {
    var b = a.kit.extra.language;
    return function(b) {
        var b = b, c = {}, d = function(b) {
            a.log("cancelUpload", b);
            var c = b.el, d = b.data, e = c.getAttribute("token"), f = d.swfId;
            a.common.content.message.upload.deleteItem(c, "cancel", d);
            var g = a.common.content.message.upload.getFlash(f);
            a.kit.extra.runFlashMethod(g, "cancelUpload", function() {
                try {
                    g.cancelUpload(e)
                } catch (a) {
                }
            });
            a.common.channel.flashUpImg.fire("cannelUpload");
            return !1
        }, e = function(b) {
            var c = b.el, d = b.data, e = d.swfId;
            a.log(e);
            a.common.content.message.upload.deleteItem(c, "delete", d);
            if (d.size) {
                var f = a.common.content.message.upload.getFlash(e);
                a.kit.extra.runFlashMethod(f, "afterDelete", function() {
                    f.afterDelete(d.size)
                })
            }
            return !1
        }, f = function() {
            var c = a.kit.dom.parseDOM(a.core.dom.builder(b.parentNode).list);
            c.uploadList.setAttribute("fid", "");
            c.uploadList.innerHTML = "";
            c.uploadList.style.display = "none"
        }, g = a.core.evt.delegatedEvent(b);
        g.add("cancelUpload", "click", d);
        g.add("deleteFile", "click", e);
        c.reset = f;
        return c
    }
});
STK.register("common.forward.toPrivateMsg", function(a) {
    var b = a.kit.extra.language, c, d, e = {limitNum: 300,count: "disable"}, f = b('<#et userlist data><div node-type="toPrivateMsg_client" class="toPrivateMsg<#if (data.isDialog == true)>Layer</#if>"><dl class="${data.className} clearfix"><dt>#L{收信人：}</dt><dd><input type="text" name="" class="W_input" node-type="msgTo" value="${data.msgTo}" /></dd><dt>#L{内　容：}</dt><dd><div class="feed_repeat"><div class="input clearfix" node-type="uploadTd"><div class="action clearfix actionControl" node-type="widget"><a class="W_ico16 ico_faces" title="#L{表情}" href="#" onclick="return false;" node-type="smileyBtn"></a><a class="W_ico16 icon_sw_img" title="#L{图片}" href="#" onclick="return false;" node-type="picBtn"></a><a class="W_ico16 icon_sw_accessory" title="#L{文件}" href="#" onclick="return false;" node-type="attachBtn"></a><div id="uploadSwf" node-type="uploadSwf" class="flash" style="background:#000;filter:alpha(opacity=0)9;opacity:0;"></div></div><p class="num" node-type="num">#L{还可输入 } <span>' + e.limitNum + "</span> #L{字}</p>" + '<textarea class="W_input" name="" rows="" cols="" title="#L{转发到}#L{私信}#L{内容}" node-type="textEl">#L{给你推荐一条微博：}' + "<#if (data.forwardNick)>" + "//@${data.forwardNick}:${data.reason}" + "</#if>" + "<#if (data.originNick)>" + " - //@${data.originNick}:${data.origin}" + "</#if>" + '<#if (data.allowForward==="0")>' + " - //${data.origin}" + "</#if>" + "<#if (data.url)>" + " - #L{原文地址：}${data.url}" + "</#if>" + "</textarea>" + '<p class="btn"><a href="#" title="#L{转发}#L{按钮}" onclick="return false;" class="W_btn_d btn_noloading" node-type="submit"><span><b class="loading"></b><em node-type="btnText">#L{发送}</em></span></a></p>' + '<ul class="p_sendlist" node-type="uploadList" style="display:none" fid=""></ul>' + "</div>" + "</div>" + "</dd>" + "</dl>" + "</div>"), g = {notice: "#L{请输入转发理由}",nameNotice: "#L{请输入收信人昵称}",defUpdate: "#L{转发微博}",netError: "#L{系统繁忙}",success: "#L{转发成功}!",retry: '#L{读取失败，请}<a href="#" onclick="return false;" action-type="retry" value="retry">#L{重试}</a>',off: "#L{关闭}",on: "#L{开启}"}, h = function(a, c) {
        c == "normal" ? a.innerHTML = b("#L{发送}") : a.innerHTML = b("#L{提交中...}")
    };
    return function(i, j, k) {
        function J() {
            a.trim(n.msgTo.value) === b(g.nameNotice) && (n.msgTo.value = "")
        }
        function I() {
            a.trim(n.msgTo.value) === "" && (n.msgTo.value = b(g.nameNotice))
        }
        function H() {
            a.removeEvent(n.msgTo, "focus", H);
            x = new a.common.bubble.myFollowSuggest({textNode: n.msgTo,callback: function(a) {
                }});
            x.show()
        }
        var l = a.common.dialog.validateCode();
        if (i == null || j == null)
            throw new Error("[common.forward.toPrivateMsg]Required parameter client is missing");
        var m, n, o, p, q, r, s, t, u, v, w = a.common.forward.utils, x, y = {};
        y.client = i;
        y.opts = k || {};
        y.isInit = !1;
        a.custEvent.define(y, ["forward", "hide", "center"]);
        var z = function() {
            p = !1;
            q = "";
            n.submit.className = "W_btn_d btn_noloading";
            h(n.btnText, "normal")
        }, z = function() {
            if (d) {
                p = !1;
                q = "";
                d = null;
                n.submit.className = "W_btn_d btn_noloading";
                h(n.btnText, "normal")
            }
        }, A = function() {
            if (d) {
                var b = a.common.content.message.upload.getFlash(c), e = 1;
                if (b && b.getUploadStatus)
                    try {
                        e = b.getUploadStatus()
                    } catch (f) {
                        e = b.getUploadStatus
                    }
                else
                    e = 0;
                if (e == 0) {
                    var g = n.uploadList.getAttribute("fid") || "";
                    g.length != 0 && (g = g.substring(0, g.length - 1));
                    d.fids = g;
                    d = a.common.getDiss(d, n.submit);
                    r.request(d)
                }
            }
        }, B = function() {
            var c = m.API.getExtra();
            if (p)
                q === "error" && a.common.extra.shine(n.textEl);
            else {
                var e = a.trim(m.API.getWords() || "");
                e === b(g.notice) && (e = "");
                var f = a.trim(n.msgTo.value);
                f === b(g.nameNotice) && (f = "");
                if (e === "") {
                    a.common.extra.shine(n.textEl);
                    return
                }
                p = !0;
                q = "loading";
                n.submit.className = "W_btn_a_disable";
                h(n.btnText, "loading");
                var i = {};
                i.text = e || b(g.defUpdate);
                var k = n.uploadList.getAttribute("fid") || "";
                if (k.length != 0) {
                    k = k.substring(0, k.length - 1);
                    i.fids = k
                }
                i.appkey = y.opts.data.appkey;
                i.id = j;
                i.screen_name = f;
                d = i;
                A()
            }
        }, C = function(b) {
            if ((b.keyCode === 13 || b.keyCode === 10) && b.ctrlKey) {
                m.API.blur();
                a.core.evt.fireEvent(n.submit, "click")
            }
        }, D = function() {
            var a = m.API.count(), c = e.limitNum - a, d = c >= 0 ? !0 : !1;
            if (d) {
                p = !1;
                q = "";
                d && (n.num.innerHTML = b("#L{还可以输入}<span>" + c + "</span> #L{字}"))
            } else {
                p = !0;
                q = "error";
                n.num.innerHTML = b('#L{已经超过}<span class="S_error">' + Math.abs(c) + "</span> #L{字}")
            }
        }, E = function(c, e) {
            d = null;
            p = !1;
            q = "";
            n.submit.className = "W_btn_d btn_noloading";
            h(n.btnText, "normal");
            try {
                a.custEvent.fire(y, "forward", [c.data, e, k.inDialog]);
                a.common.channel.feed.fire("forward", [c.data, e, k.inDialog])
            } catch (f) {
            }
            a.custEvent.fire(y, "hide");
            a.ui.litePrompt(b(g.success), {type: "succM",timeout: "500"});
            m.API.reset();
            v.reset()
        }, F = function(b, c) {
            p = !1;
            d = null;
            q = "";
            n.submit.className = "W_btn_d btn_noloading";
            h(n.btnText, "normal");
            a.common.layer.ioError(b.code, b)
        }, G = function(b, c) {
            p = !1;
            q = "";
            d = null;
            n.submit.className = "W_btn_d btn_noloading";
            h(n.btnText, "normal");
            a.common.layer.ioError(b.code, b)
        }, K = function() {
            var b;
            s = a.builder(i);
            b = a.kit.dom.parseDOM(s.list);
            s = b.toPrivateMsg_client;
            m = a.common.editor.base(s, e);
            m.widget(a.common.editor.widget.face(), "smileyBtn");
            c = a.common.content.message.upload.loadSwf(b.uploadTd);
            v = a.common.content.message.upload.delegateEvt(b.uploadList);
            n = m.nodeList;
            a.addEvent(n.textEl, "focus", function() {
                u = setInterval(function() {
                    D()
                }, 200)
            });
            a.addEvent(n.textEl, "blur", function() {
                clearInterval(u)
            });
            a.kit.dom.autoHeightTextArea({textArea: n.textEl,maxHeight: 145,inputListener: a.funcEmpty})
        }, L = function() {
            a.addEvent(n.submit, "click", B);
            a.addEvent(n.textEl, "keypress", C);
            a.addEvent(n.msgTo, "focus", H);
            a.addEvent(n.msgTo, "focus", J);
            a.addEvent(n.msgTo, "blur", I)
        }, M = function() {
        }, N = function() {
            r = a.common.trans.message.getTrans("create", {onComplete: function(a, b) {
                    var c = {onSuccess: E,onError: F,requestAjax: r,param: b,onRelease: function() {
                            p = !1;
                            d = null;
                            q = "";
                            n.submit.className = "W_btn_d btn_noloading";
                            h(n.btnText, "normal")
                        }};
                    l.validateIntercept(a, b, c)
                },onFail: G})
        }, O = function() {
            a.common.channel.flashUpImg.register("completeUpload", A);
            a.common.channel.flashUpImg.register("cannelUpload", z)
        }, P = function() {
            N();
            K();
            L();
            M();
            O()
        }, Q = function(c) {
            if (y.isInit == !1) {
                k.data.className = c ? "layer_forward_group" : "forward__letter";
                t = c;
                k.data.msgTo = b(g.nameNotice);
                k.data.isDialog = c;
                k.data.origin = a.trim(k.data.origin);
                a.addHTML(i, a.core.util.easyTemplate(f, k.data));
                m || P();
                y.isInit = !0
            } else
                s && a.setStyle(s, "display", "");
            m.API.focus(0)
        }, R = function() {
            m.API.blur();
            s != null && a.setStyle(s, "display", "none")
        }, S = function() {
            a.removeEvent(n.submit, "click", B);
            a.removeEvent(n.textEl, "keypress", C);
            a.removeEvent(n.msgTo, "focus", J);
            a.removeEvent(n.msgTo, "blur", I);
            a.custEvent.undefine(y);
            x && x.destroy();
            m.closeWidget();
            d = null;
            u && clearInterval(u);
            l && l.destroy && l.destroy();
            m = null;
            n = null;
            r = null;
            s = null;
            for (var b in y)
                delete y[b];
            y = null
        };
        y.show = Q;
        y.hide = R;
        y.destory = S;
        return y
    }
});
STK.register("common.forward.publisher", function(a) {
    var b = a.kit.extra.language, c = a.common.forward, d = b('<#et userlist data><div node-type="forward_tab" class="profile_tab S_line5"><ul class="pftb_ul S_line1"><li class="pftb_title">#L{转发到}：</li><#list data.tab as list><li <#if (list.last_one)> class="pftb_itm pftb_itm_lst S_line1" <#else> class="pftb_itm S_line1" </#if>><a href="#" onclick="return false;" action-type="tab_item" action-data="id=${list.id}"<#if (list.id==data.type)> class="pftb_lk S_line5 S_txt1 S_bg5 current"<#else> class="pftb_lk S_line5 S_txt1 S_bg1"</#if>>${list.name}</a></li></#list></ul></div><div node-type="forward_client"></div>'), e = [{id: 1,name: b("#L{我的微博}")}, {id: 2,name: b("#L{私信}"),last_one: !0}];
    return function(f, g) {
        if (f == null)
            throw new Error("[common.forward.publisher]Required parameter mid is missing");
        g = g || {type: 1,styleId: "1"};
        var h = {instances: {}}, i = g.type, j, k, l, m, n, o, p = a.kit.extra.toFeedText, q = {1: c.toMicroblog,2: c.toPrivateMsg,3: c.toMicrogroup}, r = {appkey: "",domInit: !1,forwardNick: "",originNick: "",origin: "",reason: "",url: null,styleId: "1",allowComment: "1",allowForward: "1",allowRootComment: "1",uid: "",rootuid: "",pid: "",domain: "",mark: ""}, s = function() {
            if (g.domInit == !1)
                var b = a.core.util.easyTemplate(d), c = b({type: i,tab: e,tab_count: e.length}).toString(), f = a.builder(c);
            var h = a.kit.dom.parseDOM(f.list);
            j = h.forward_tab;
            k = h.forward_client;
            return f.box
        };
        a.custEvent.define(h, ["hide", "center", "forward"]);
        var t = function(a) {
            if (f == null)
                throw new Error("[common.forward.publisher]Required parameter inner is missing");
            l = a;
            v();
            w(i, {data: g,client: k})
        }, u = function(a) {
            m && (m.className = "pftb_lk S_line5 S_txt1 S_bg1");
            m = a.el;
            m.className = "pftb_lk S_line5 S_txt1 S_bg5 current";
            i = a.data.id || i;
            w(i, {data: g,client: k})
        }, v = function() {
            m = a.sizzle('a[class="pftb_lk S_line5 S_txt1 S_bg5 current"]', l);
            m = m.length > 0 ? m[0] : null;
            var b = a.sizzle('div[node-type="forward_tab"]', l);
            b = b.length > 0 ? b[0] : null;
            if (b) {
                n = a.delegatedEvent(b);
                n.add("tab_item", "click", function(a) {
                    i != a.data.id && u(a)
                })
            }
        }, w = function(c, d) {
            o != null && o.hide();
            c = c.toString();
            var e;
            if (h.instances[c] == null) {
                var g = {}, i;
                for (var j in r)
                    g[j] = d.data[j];
                g.type = c;
                i = {client: k,data: g,inDialog: !0};
                if (parseInt(c) != 1) {
                    if (i.data.allowForward === "0") {
                        i.data.originNick = "";
                        i.data.origin = b("#L{此微博已被原作者删除}")
                    }
                    i.data.reason = p(i.data.reason);
                    i.data.origin = p(i.data.origin)
                }
                e = q[c](k, f, i);
                h.instances[c] = e;
                a.custEvent.add(e, "hide", function() {
                    a.custEvent.fire(h, "hide")
                });
                a.custEvent.add(e, "center", function() {
                    a.custEvent.fire(h, "center")
                });
                a.custEvent.add(e, "forward", function(b, c) {
                    a.custEvent.fire(h, "forward", c)
                })
            } else
                e = h.instances[c];
            e.show(!0);
            o = e
        }, x = function() {
            for (var b in h.instances) {
                var c = h.instances[b];
                c.destory();
                c = null
            }
            h.instances = null;
            a.custEvent.undefine(h);
            j = null;
            k = null;
            l = null;
            m = null;
            n && n.remove("tab_item", "click");
            n = null
        };
        h.getDom = s;
        h.init = t;
        h.destroy = x;
        return h
    }
});
STK.register("common.dialog.forward", function(a) {
    var b = {title: "#L{转发微博}",commentPerson: "#L{同时评论给}",originPerson: "#L{同时评论给原文作者}",notice: "#L{请输入转发理由}",defUpdate: "#L{转发微博}"}, c = a.kit.extra.language;
    return function(d) {
        var e = {}, f, g, h, i;
        f = a.parseParam({styleId: "1"}, d);
        var j;
        a.custEvent.define(e, ["forward", "hide", "show"]);
        var k = function(d, f) {
            if (typeof d != "string" && typeof d != "number")
                throw new Error("$.common.dialog.forward.show need string (or number) as weiboId");
            g = d;
            f.pic && (f.pid = f.pic);
            var k = a.parseParam({appkey: "",type: 1,origin: "",reason: "",originNick: "",forwardNick: "",title: c(b.title),domInit: !1,url: null,styleId: "1",allowComment: "1",allowForward: "1",allowRootComment: "1",pid: "",domain: "",mark: ""}, f);
            i = a.ui.dialog();
            i.setTitle(k.title);
            h = new a.common.forward.publisher(g, k);
            i.appendChild(h.getDom());
            i.setBeforeHideFn(function() {
                j.className = "detail";
                h.destroy();
                i.clearBeforeHideFn()
            });
            j = i.getInner();
            j.className = "detail layer_forward";
            j.style.height = "260px";
            i.show();
            m();
            h.init(j);
            j.style.height = "";
            a.custEvent.add(h, "hide", function() {
                l()
            });
            a.custEvent.add(h, "center", function() {
            });
            a.custEvent.add(h, "forward", function(b, c) {
                a.custEvent.fire(e, "forward", c)
            });
            a.custEvent.add(i, "hide", function() {
                var b = i, c = arguments.callee;
                a.custEvent.remove(b, "hide", c);
                i = null;
                b = null;
                a.custEvent.fire(e, "hide")
            });
            a.custEvent.fire(e, "show", {box: i});
            e.publisher = h
        }, l = function() {
            n();
            i.hide()
        }, m = function() {
            i.setMiddle(j)
        }, n = function() {
            h.destroy()
        };
        e.show = k;
        e.destroy = n;
        return e
    }
});
STK.register("common.feed.feedList.plugins.translate", function(a) {
    var b = a.core.util.easyTemplate, c = a.kit.extra.language, d = a.kit.extra.toFeedText, e = a.kit.extra.textareaUtils, f = "#" + c("#L{我来翻译}") + "#", g = a.common.feed.feedList.feedTemps.translateTEMP, h = a.common.feed.feedList.feedTemps.loadingIMG;
    return function(c) {
        var i = c.getNode(), j = c.getDEvent(), k, l = {}, m = {}, n = function(b) {
            var c = {parent: "[node-type=feed_list_reason],[node-type=feed_list_content]",translate: "[node-type=feed_translate]"}, d = a.core.dom.dir(b, {dir: "parent",expr: c.parent})[0], e = d ? a.core.dom.dir(d, {dir: "next",expr: c.translate})[0] : null;
            return {parent: d,translate: e}
        }, o = function(b, c) {
            c = c || {};
            var d = c.callback || a.funcEmpty, e = c.text || "";
            if (m[b])
                d(m[b].translated);
            else {
                var f = a.common.trans.feed.getTrans("translate", {onSuccess: function(a) {
                        var c = a.data;
                        m[b] = {prev: e,translated: c};
                        d(c)
                    },onError: function(a) {
                        var b = a.msg;
                        b && d(b)
                    }});
                f.request({text: e})
            }
        }, p, q = function() {
            clearTimeout(p)
        }, r = function(c) {
            p = setTimeout(function() {
                var e = c.data, f = c.el, i = n(c.el), j = i.translate;
                if (!j) {
                    var k = {text: h,bymedata: a.jsonToQuery(c.data)}, l = a.builder(b(g, k).toString()).list, m = l.translate_rs[0], j = l.feed_translate[0];
                    a.insertAfter(j, i.parent);
                    o(e.mid, {text: d(i.parent.innerHTML),callback: function(a) {
                            m.innerHTML = a
                        }});
                    try {
                        window.SUDA && SUDA.uaTrack && SUDA.uaTrack("tblog_bowen_translate", "click_translate")
                    } catch (p) {
                    }
                }
            }, 300)
        }, s = function(b) {
            var c = a.core.dom.dir(b.el, {dir: "parent",expr: "[node-type=feed_translate]"})[0];
            c && a.removeNode(c)
        }, t = function(b) {
            var c = b.data, d, g, h = 1;
            !k && (k = a.common.dialog.forward());
            k.show(c.mid, {originNick: c.originnick,origin: m[c.mid].prev,url: c.url,reason: f,type: h});
            if (d = k.publisher) {
                d = d.instances[h].client;
                (g = a.sizzle("[node-type=textEl]", d)[0]) && e.setCursor(g)
            }
        }, u = function() {
            j.add("feed_translate", "mouseover", r);
            j.add("feed_translate", "mouseout", q);
            j.add("feed_translate_close", "click", s);
            j.add("feed_translate_by_me", "click", t)
        }, v = function() {
            j.add("feed_translate", "mouseover", r);
            j.add("feed_translate", "mouseout", q);
            j.remove("feed_translate_close", "click", s);
            j.remove("feed_translate_by_me", "click", t)
        };
        u();
        l.destroy = v;
        return l
    }
});
STK.register("common.feed.feedList.homeFeedList", function(a) {
    return function(b, c) {
        if (!b)
            a.log("in homeFeedList: node is not defined!");
        else {
            var d = a.common.feed.feedList, e, f, g = [], h = d.baseFeedList(b, c);
            g.push((d = d.plugins).forward(h));
            g.push(e = d.deleteFeed(h));
            g.push(f = d.favorite(h));
            g.push(d.comment(h));
            g.push(d.media(h));
            g.push(d.commonMedia(h));
            g.push(d.page(h));
            g.push(d.activityPage(h));
            g.push(d.map(h));
            g.push(d.updateTime(h));
            g.push(d.delOverFeeds(h));
            g.push(d.lazyload(h));
            g.push(d.newFeed(h));
            g.push(d.backToAll(h));
            g.push(d.search(h));
            g.push(d.imgAdvLoading(h));
            g.push(d.feedHotKey(h));
            g.push(d.feedShield(h));
            g.push(d.mood(h));
            g.push(d.smartSort(h));
            g.push(d.activityShield(h));
            g.push(d.attitudeMini(h));
            g.push(d.recommendFeed(h));
            g.push(d.recommendTip(h));
            g.push(d.wbmlLoader(h));
            g.push(d.recGroupMembers(h));
            g.push(d.keywordShield(h));
            g.push(d.orientGrpMem(h));
            g.push(d.followbtn(h));
            g.push(d.translate(h));
            a.custEvent.add(h, "clearTips", function(a, b) {
                if (b == "favorite")
                    e.hideTip();
                else if (b == "deleteFeed")
                    f.hideTip();
                else {
                    f.hideTip(b == "base");
                    e.hideTip(b == "base")
                }
            });
            var i = h.destroy;
            h.destroy = function() {
                i();
                for (var a = 0; a < g.length; a++)
                    try {
                        g[a].destroy()
                    } catch (b) {
                    }
                h = d = e = f = g = i = undefined
            };
            return h
        }
    }
});
STK.register("pl.content.homeFeed.source.init", function(a) {
    return function(b, c) {
        var d = {}, e = a.kit.extra.language, f, g, h, i, j, k, l, m, n, o = $CONFIG != null && $CONFIG.bigpipe != null && ($CONFIG.bigpipe === "true" || $CONFIG.bigpipe === !0), p = {}, q = {}, r = {newFeed: function(a) {
                var b = a.data || {}, c = 0, d = f.getGroupInfo() + "", e = f.getFeedType();
                e === "mblog" ? d === "0" ? c = b.status || 0 : c = b["status_" + d] || 0 : d === "0" ? c = b.activity || 0 : c = b["activity_" + d] || 0;
                f.newFeedNotify({count: c,feedType: e})
            },fakeFeed: function(b) {
                var c = a.core.str.parseURL(location.href).query, d = a.core.json.queryToJson(c);
                if (!d.ismiyou || d.ismiyou !== "1")
                    if (l && m && f && f.isAdvSearched != !0) {
                        typeof b != "string" && (b = b != null ? b.html : "");
                        h.clearNewBar();
                        h.insertFakeFeed(b)
                    }
            }}, s = function() {
            t();
            u();
            w();
            x();
            y();
            z();
            A()
        }, t = function() {
            if (b == null || b != null && !a.core.dom.isNode(b))
                throw "[comp.centent.homeFeed]:argsCheck()-The param node is not a DOM node.";
            c = a.core.obj.parseParam({html: ""}, c);
            j = function() {
                var b = a.kit.extra.parseURL(), c = a.core.json.queryToJson(b.query);
                l = c.gid == null && c.ismiyou == null && c.whisper == null;
                m = c.is_ori != 1 && c.is_pic != 1 && c.is_video != 1 && c.is_music != 1 && c.is_foward != 1 && c.is_text != 1 && c.key_word == null && c.start_time == null && c.end_time == null && c.activity == null;
                return c
            }()
        }, u = function() {
            c.html && (b.innerHTML = c.html);
            i = {feedNav: a.core.dom.sizzle('[node-type="feed_nav"]', b)[0],feedList: a.core.dom.sizzle('[node-type="feed_list"]', b)[0]};
            if (!i.feedNav || !i.feedList)
                throw "[comp.centent.homeFeed]:parseDOM()-You should provide the nodes required."
        }, v = function() {
            var b;
            j.page ? b = j.page : b = 1;
            l && m && b == 1 && a.custEvent.fire(h, "showRecommendTip")
        }, w = function() {
            f = a.common.feed.groupAndSearch.homeFeed(i.feedNav, {pageQuery: j,isBigPipe: o});
            g = a.common.feed.inter.homeFeedInter({pageQuery: j,isBigPipe: o});
            h = a.common.feed.feedList.homeFeedList(i.feedList, {page: j.page,end_id: j.end_id});
            v()
        }, x = function() {
            var b = a.E("focus_feed_list"), c = i.feedList;
            b && (b.onfocus = function() {
                var a = c.getElementsByTagName("a");
                a.length > 1 && a[0].focus();
                return !1
            })
        }, y = function() {
            a.custEvent.add(f, "search", function() {
                h.showWait("search");
                var b = arguments[3];
                if (b != null) {
                    l = b.isGroupAll;
                    m = b.isFilterAll
                }
                l && m && !arguments[2].is_search ? a.custEvent.fire(h, "showRecommendTip") : a.custEvent.fire(h, "stopRecommendTip");
                g.evtSearch.apply(g, arguments)
            });
            a.custEvent.add(f, "smartSort", function(b, c) {
                if (c === "nowIsSmartSort") {
                    try {
                        a.common.channel.topTip.remove("readed", r.newFeed)
                    } catch (d) {
                    }
                    a.common.channel.topTip.fire("currentGroup", 0);
                    a.common.channel.topTip.fire("currentStatusType", "0");
                    a.common.channel.topTip.register("readed", r.newFeed)
                }
            });
            a.custEvent.add(h, "request", function() {
                var b = arguments, c;
                if (b.length < 3)
                    throw new Error("[comp.content.homeFeed]:bindCustEvt()-custom event 'success' should supply enough arguments.");
                c = b[1];
                c == "page" && l && m && (b[2].page == 1 ? a.custEvent.fire(h, "showRecommendTip") : a.custEvent.fire(h, "stopRecommendTip"));
                (c == "newFeed" || c == "toFirstPage") && f.getIsSmartSort() && (f.config.mblogsort = 1);
                if (c == "backToAll") {
                    delete f.config.key_word;
                    if (f.isAdvSearched)
                        f.advSearchToggle.call(f, null, 1);
                    else {
                        f.advSearchToggle.call(f, null, 1);
                        f.searchFilterChange.call(f, "0")
                    }
                } else
                    g.evtRequest.apply(g, arguments)
            });
            h.regCustEvent("smartSort", function() {
                if (o)
                    f.smartSort();
                else {
                    var b = a.kit.extra.parseURL();
                    window.location.href = "/" + b.path + "?" + "mblogsort=1"
                }
            });
            a.custEvent.add(g, "success", function() {
                var a = arguments, b, c;
                if (a.length < 3)
                    throw new Error("[comp.content.homeFeed]:bindCustEvt()-custom event 'success' should supply enough arguments.");
                b = a[1];
                c = a[2];
                if (c == "newFeed" && b) {
                    var d = Math.ceil(h.resetStartTime() / 6e4), f = e("[n]#L{你看到这里}");
                    h.clearAllTimeTip();
                    var g = e("#L{之前}");
                    if (d >= 60 && d < 1440) {
                        var i = parseInt(d / 60, 10), j = d - i * 60;
                        g = i + e("#L{小时}") + (j > 0 ? j + e("#L{分钟前，}") : e("#L{前，}"))
                    } else
                        d < 60 && (g = d + e("#L{分钟前，}"));
                    f = f.replace("[n]", g);
                    h.updateFeed(b, c);
                    h.updateTimeTip(f)
                } else
                    h.updateFeed(b, c)
            });
            a.custEvent.add(g, "failure", function() {
                if (arguments.length < 3)
                    throw new Error("[comp.content.homeFeed]:bindCustEvt()-custom event 'success' should supply enough arguments.");
                var a = arguments[2];
                h.showError(a)
            });
            a.custEvent.add(f, "newFeed", function() {
                h.extra.showNewFeedTip(a.parseParam({count: 0,isFilterAll: m,feedType: "mblog"}, arguments[1]))
            });
            a.custEvent.add(f, "changeFeedType", function(b, c) {
                var d = c.feedType;
                a.common.channel.topTip.fire("currentStatusType", d === "activity" ? "1" : "0")
            })
        }, z = function() {
            k = setTimeout(function() {
                var b = f.getGroupInfo(), c = a.core.arr.indexOf(b, ["whisper", "ismiyou"]) === -1;
                if (c) {
                    var d = f.getFeedType();
                    a.common.channel.topTip.fire("currentGroup", b);
                    a.common.channel.topTip.fire("currentStatusType", d === "activity" ? "1" : "0");
                    a.common.channel.topTip.register("readed", r.newFeed)
                }
            }, 30010);
            a.common.channel.feed.register("publish", r.fakeFeed);
            a.common.channel.feed.register("forward", r.fakeFeed)
        }, A = function() {
        }, B = function() {
            k && clearTimeout(k);
            a.common.channel.feed.remove("publish", r.fakeFeed);
            a.common.channel.feed.remove("forward", r.fakeFeed);
            f.destroy();
            g.destroy();
            h.destroy();
            var b = a.E("focus_feed_list");
            b && (b.onfocus = null)
        };
        s();
        d.destroy = B;
        return d
    }
});
STK.pageletM.register("pl.content.homeFeed.index", function(a) {
    var b = {}, c = a.E("pl_content_homeFeed"), d = a.pl.content.homeFeed.source.init(c, b);
    return d
});
