if (!STK)
    var STK = function() {
        var a = {}, b = "theia";
        a[b] = {IE: /msie/i.test(navigator.userAgent),E: function(a) {
                return typeof a == "string" ? document.getElementById(a) : a
            },C: function(a) {
                var b;
                a = a.toUpperCase();
                a == "TEXT" ? b = document.createTextNode("") : a == "BUFFER" ? b = document.createDocumentFragment() : b = document.createElement(a);
                return b
            },log: function(a) {
            }};
        var c = a[b];
        c.register = function(c, d, e) {
            if (!e || typeof e != "string")
                e = b;
            a[e] || (a[e] = {});
            var f = a[e], g = c.split("."), h = f, i = null;
            while (i = g.shift())
                if (g.length) {
                    h[i] === undefined && (h[i] = {});
                    h = h[i]
                } else if (h[i] === undefined)
                    try {
                        if (e && e !== b) {
                            if (c === "core.util.listener") {
                                h[i] = a[b].core.util.listener;
                                return !0
                            }
                            if (c === "core.util.connect") {
                                h[i] = a[b].core.util.connect;
                                return !0
                            }
                        }
                        h[i] = d(f);
                        return !0
                    } catch (j) {
                        setTimeout(function() {
                        }, 0)
                    }
            return !1
        };
        c.unRegister = function(c, d) {
            if (!d || typeof d != "string")
                d = b;
            var e = a[d], f = c.split("."), g = e, h = null;
            while (h = f.shift())
                if (f.length) {
                    if (g[h] === undefined)
                        return !1;
                    g = g[h]
                } else if (g[h] !== undefined) {
                    delete g[h];
                    return !0
                }
            return !1
        };
        c.regShort = function(a, b) {
            if (c[a] !== undefined)
                throw "[" + a + "] : short : has been register";
            c[a] = b
        };
        c.shortRegister = function(c, d, e) {
            if (!e || typeof e != "string")
                e = b;
            var f = a[e], g = c.split(".");
            if (!d)
                return !1;
            if (f[d])
                return !1;
            var h = f, i = null;
            while (i = g.shift())
                if (g.length) {
                    if (h[i] === undefined)
                        return !1;
                    h = h[i]
                } else if (h[i] !== undefined) {
                    if (f[d])
                        return !1;
                    f[d] = h[i];
                    return !0
                }
            return !1
        };
        c.getPKG = function(c) {
            if (!c || typeof c != "string")
                c = b;
            return a[c]
        };
        return c
    }();
STK.register("core.ani.algorithm", function(a) {
    var b = {linear: function(a, b, c, d, e) {
            return c * a / d + b
        },easeincubic: function(a, b, c, d, e) {
            return c * (a /= d) * a * a + b
        },easeoutcubic: function(a, b, c, d, e) {
            return (a /= d / 2) < 1 ? c / 2 * a * a * a + b : c / 2 * ((a -= 2) * a * a + 2) + b
        },easeinoutcubic: function(a, b, c, d, e) {
            e == undefined && (e = 1.70158);
            return c * (a /= d) * a * ((e + 1) * a - e) + b
        },easeinback: function(a, b, c, d, e) {
            e == undefined && (e = 1.70158);
            return c * (a /= d) * a * ((e + 1) * a - e) + b
        },easeoutback: function(a, b, c, d, e) {
            e == undefined && (e = 1.70158);
            return c * ((a = a / d - 1) * a * ((e + 1) * a + e) + 1) + b
        },easeinoutback: function(a, b, c, d, e) {
            e == undefined && (e = 1.70158);
            return (a /= d / 2) < 1 ? c / 2 * a * a * (((e *= 1.525) + 1) * a - e) + b : c / 2 * ((a -= 2) * a * (((e *= 1.525) + 1) * a + e) + 2) + b
        }};
    return {addAlgorithm: function(a, c) {
            if (b[a])
                throw "[core.ani.tweenValue] this algorithm :" + a + "already exist";
            b[a] = c
        },compute: function(a, c, d, e, f, g, h) {
            if (typeof b[a] != "function")
                throw "[core.ani.tweenValue] this algorithm :" + a + "do not exist";
            return b[a](e, c, d, f, g, h)
        }}
});
STK.register("core.func.empty", function() {
    return function() {
    }
});
STK.register("core.obj.parseParam", function(a) {
    return function(a, b, c) {
        var d, e = {};
        b = b || {};
        for (d in a) {
            e[d] = a[d];
            b[d] != null && (c ? a.hasOwnProperty[d] && (e[d] = b[d]) : e[d] = b[d])
        }
        return e
    }
});
STK.register("core.ani.tweenArche", function(a) {
    return function(b, c) {
        var d, e, f, g, h, i, j, k;
        e = {};
        d = a.core.obj.parseParam({animationType: "linear",distance: 1,duration: 500,callback: a.core.func.empty,algorithmParams: {},extra: 5,delay: 25}, c);
        var l = function() {
            f = +(new Date) - g;
            if (f < d.duration) {
                h = a.core.ani.algorithm.compute(d.animationType, 0, d.distance, f, d.duration, d.extra, d.algorithmParams);
                b(h);
                i = setTimeout(l, d.delay)
            } else {
                k = "stop";
                d.callback()
            }
        };
        k = "stop";
        e.getStatus = function() {
            return k
        };
        e.play = function() {
            g = +(new Date);
            h = null;
            l();
            k = "play";
            return e
        };
        e.stop = function() {
            clearTimeout(i);
            k = "stop";
            return e
        };
        e.resume = function() {
            if (j) {
                g += +(new Date) - j;
                l()
            }
            return e
        };
        e.pause = function() {
            clearTimeout(i);
            j = +(new Date);
            k = "pause";
            return e
        };
        e.destroy = function() {
            clearTimeout(i);
            j = 0;
            k = "stop"
        };
        return e
    }
});
STK.register("core.dom.getStyle", function(a) {
    function b() {
        return "y" in b ? b.y : b.y = "filters" in a.C("div")
    }
    return function(a, c) {
        if (!b()) {
            c == "float" && (c = "cssFloat");
            try {
                var d = document.defaultView.getComputedStyle(a, "")
            } catch (e) {
            }
            return a.style[c] || d ? d[c] : null
        }
        switch (c) {
            case "opacity":
                var f = 100;
                try {
                    f = a.filters["DXImageTransform.Microsoft.Alpha"].opacity
                } catch (e) {
                    try {
                        f = a.filters("alpha").opacity
                    } catch (e) {
                    }
                }
                return f / 100;
            case "float":
                c = "styleFloat";
            default:
                var g = a.currentStyle ? a.currentStyle[c] : null;
                return a.style[c] || g
        }
    }
});
STK.register("core.util.browser", function(a) {
    var b = navigator.userAgent.toLowerCase(), c = window.external || "", d, e, f, g, h, i = function(a) {
        var b = 0;
        return parseFloat(a.replace(/\./g, function() {
            return b++ == 1 ? "" : "."
        }))
    };
    try {
        /windows|win32/i.test(b) ? h = "windows" : /macintosh/i.test(b) ? h = "macintosh" : /rhino/i.test(b) && (h = "rhino");
        if ((e = b.match(/applewebkit\/([^\s]*)/)) && e[1]) {
            d = "webkit";
            g = i(e[1])
        } else if ((e = b.match(/presto\/([\d.]*)/)) && e[1]) {
            d = "presto";
            g = i(e[1])
        } else if (e = b.match(/msie\s([^;]*)/)) {
            d = "trident";
            g = 1;
            (e = b.match(/trident\/([\d.]*)/)) && e[1] && (g = i(e[1]))
        } else if (/gecko/.test(b)) {
            d = "gecko";
            g = 1;
            (e = b.match(/rv:([\d.]*)/)) && e[1] && (g = i(e[1]))
        }
        /world/.test(b) ? f = "world" : /360se/.test(b) ? f = "360" : /maxthon/.test(b) || typeof c.max_version == "number" ? f = "maxthon" : /tencenttraveler\s([\d.]*)/.test(b) ? f = "tt" : /se\s([\d.]*)/.test(b) && (f = "sogou")
    } catch (j) {
    }
    var k = {OS: h,CORE: d,Version: g,EXTRA: f ? f : !1,IE: /msie/.test(b),OPERA: /opera/.test(b),MOZ: /gecko/.test(b) && !/(compatible|webkit)/.test(b),IE5: /msie 5 /.test(b),IE55: /msie 5.5/.test(b),IE6: /msie 6/.test(b),IE7: /msie 7/.test(b),IE8: /msie 8/.test(b),IE9: /msie 9/.test(b),SAFARI: !/chrome\/([\d.]*)/.test(b) && /\/([\da-f.]*) safari/.test(b),CHROME: /chrome\/([\d.]*)/.test(b),IPAD: /\(ipad/i.test(b),IPHONE: /\(iphone/i.test(b),ITOUCH: /\(itouch/i.test(b),MOBILE: /mobile/i.test(b)};
    return k
});
STK.register("core.dom.cssText", function(a) {
    var b = function(a) {
        var b = 0, c = [], d = "close", e = !1, f = null, g = function(d) {
            c.push({type: "info",content: a.slice(0, b)});
            c.push({type: "sign",content: a.slice(b, b + 1)});
            a = a.slice(b + 1);
            b = 0
        };
        while (a) {
            var h = a.charAt(b);
            switch (h) {
                case ":":
                    if (!e && d === "close") {
                        c.push({type: "attr",content: a.slice(0, b)});
                        c.push({type: "sign",content: a.slice(b, b + 1)});
                        a = a.slice(b + 1);
                        b = 0;
                        d = "open";
                        break
                    }
                    b += 1;
                    break;
                case ";":
                    if (!e) {
                        if (d === "open") {
                            c.push({type: "info",content: a.slice(0, b)});
                            c.push({type: "sign",content: a.slice(b, b + 1)})
                        }
                        a = a.slice(b + 1);
                        b = 0;
                        d = "close";
                        break
                    }
                    b += 1;
                    break;
                case '"':
                case "'":
                    if (e) {
                        if (h === f) {
                            e = !e;
                            f = null
                        }
                    } else {
                        e = !e;
                        f = h
                    }
                    b += 1;
                    break;
                case " ":
                case "!":
                case ",":
                case "(":
                case ")":
                    g(h);
                    break;
                case "":
                    c.push({type: "info",content: a.slice(0, b)});
                    a = "";
                    b = 0;
                    break;
                default:
                    b += 1
            }
        }
        return c
    }, c = function(a) {
        var b = {}, c;
        for (var d = 0, e = a.length; d < e; d += 1)
            if (a[d].type === "attr") {
                c = a[d].content;
                b[c] = ""
            } else {
                if (a[d].type === "sign" && a[d].content === ";") {
                    c = null;
                    continue
                }
                if (a[d].type === "sign" && a[d].content === ":")
                    continue;
                c !== null;
                b[c] += a[d].content
            }
        return b
    }, d = {webkit: "-webkit-",presto: "-o-",trident: "-ms-",gecko: "-moz-"}[a.core.util.browser.CORE], e = ["transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function"], f = function(a) {
        for (var b = 0, c = e.length; b < c; b += 1)
            if (a === e[b])
                return !0;
        return !1
    };
    return function(a) {
        var e = c(b(a || "")), g = function(a, b) {
            a = a.toLowerCase();
            e[a] = b;
            f(a) && (e[d + a] = b);
            return h
        }, h = {push: g,remove: function(a) {
                a = a.toLowerCase();
                e[a] && delete e[a];
                f(a) && e[d + a] && delete e[d + a];
                return h
            },merge: function(a) {
                var d = c(b(a || ""));
                for (var e in d)
                    g(e, d[e])
            },getCss: function() {
                var a = [];
                for (var b in e)
                    a.push(b + ":" + e[b]);
                return a.join(";")
            }};
        return h
    }
});
STK.register("core.func.getType", function(a) {
    return function(a) {
        var b;
        return ((b = typeof a) == "object" ? a == null && "null" || Object.prototype.toString.call(a).slice(8, -1) : b).toLowerCase()
    }
});
STK.register("core.arr.isArray", function(a) {
    return function(a) {
        return Object.prototype.toString.call(a) === "[object Array]"
    }
});
STK.register("core.arr.foreach", function(a) {
    var b = function(a, b) {
        var c = [];
        for (var d = 0, e = a.length; d < e; d += 1) {
            var f = b(a[d], d);
            if (f === !1)
                break;
            f !== null && (c[d] = f)
        }
        return c
    }, c = function(a, b) {
        var c = {};
        for (var d in a) {
            var e = b(a[d], d);
            if (e === !1)
                break;
            e !== null && (c[d] = e)
        }
        return c
    };
    return function(d, e) {
        return a.core.arr.isArray(d) || d.length && d[0] !== undefined ? b(d, e) : typeof d == "object" ? c(d, e) : null
    }
});
STK.register("core.arr.indexOf", function(a) {
    return function(a, b) {
        if (b.indexOf)
            return b.indexOf(a);
        for (var c = 0, d = b.length; c < d; c++)
            if (b[c] === a)
                return c;
        return -1
    }
});
STK.register("core.arr.inArray", function(a) {
    return function(b, c) {
        return a.core.arr.indexOf(b, c) > -1
    }
});
STK.register("core.dom.isNode", function(a) {
    return function(a) {
        return a != undefined && Boolean(a.nodeName) && Boolean(a.nodeType)
    }
});
STK.register("core.json.merge", function(a) {
    var b = function(b) {
        return b === undefined ? !0 : b === null ? !0 : a.core.arr.inArray(typeof b, ["number", "string", "function", "boolean"]) ? !0 : a.core.dom.isNode(b) ? !0 : !1
    }, c = function(d, e, f) {
        if (b(f))
            d[e] = f;
        else {
            if (a.core.arr.isArray(f)) {
                a.core.arr.isArray(d[e]) || (d[e] = []);
                for (var g = 0, h = f.length; g < h; g += 1)
                    c(d[e], g, f[g]);
                return
            }
            if (typeof f == "object") {
                if (b(d[e]) || a.core.arr.isArray(d[e]))
                    d[e] = {};
                for (var i in f)
                    c(d[e], i, f[i]);
                return
            }
        }
    }, d = function(a, b, d) {
        var e = {};
        if (d) {
            for (var f in a)
                c(e, f, a[f]);
            for (var f in b)
                c(e, f, b[f])
        } else {
            for (var f in a)
                e[f] = a[f];
            for (var f in b)
                e[f] = b[f]
        }
        return e
    };
    return function(b, c, e) {
        var f = a.core.obj.parseParam({isDeep: !1}, e);
        return d(b, c, f.isDeep)
    }
});
STK.register("core.util.color", function(a) {
    var b = /^#([a-fA-F0-9]{3,8})$/, c = /^rgb[a]?\s*\((\s*([0-9]{1,3})\s*,){2,3}(\s*([0-9]{1,3})\s*)\)$/, d = /([0-9]{1,3})/ig, e = /([a-fA-F0-9]{2})/ig, f = a.core.arr.foreach, g = function(a) {
        var g = [], h = [];
        if (b.test(a)) {
            h = a.match(b);
            h[1].length <= 4 ? g = f(h[1].split(""), function(a, b) {
                return parseInt(a + a, 16)
            }) : h[1].length <= 8 && (g = f(h[1].match(e), function(a, b) {
                return parseInt(a, 16)
            }));
            return g
        }
        if (c.test(a)) {
            h = a.match(d);
            g = f(h, function(a, b) {
                return parseInt(a, 10)
            });
            return g
        }
        return !1
    };
    return function(a, b) {
        var c = g(a);
        if (!c)
            return !1;
        var d = {};
        d.getR = function() {
            return c[0]
        };
        d.getG = function() {
            return c[1]
        };
        d.getB = function() {
            return c[2]
        };
        d.getA = function() {
            return c[3]
        };
        return d
    }
});
STK.register("core.ani.tween", function(a) {
    var b = a.core.ani.tweenArche, c = a.core.arr.foreach, d = a.core.dom.getStyle, e = a.core.func.getType, f = a.core.obj.parseParam, g = a.core.json.merge, h = a.core.util.color, i = function(a) {
        var b = /(-?\d\.?\d*)([a-z%]*)/i.exec(a), c = [0, "px"];
        if (b) {
            b[1] && (c[0] = b[1] - 0);
            b[2] && (c[1] = b[2])
        }
        return c
    }, j = function(a) {
        for (var b = 0, c = a.length; b < c; b += 1) {
            var d = a.charCodeAt(b);
            if (d > 64 && d < 90) {
                var e = a.substr(0, b), f = a.substr(b, 1), g = a.slice(b + 1);
                return e + "-" + f.toLowerCase() + g
            }
        }
        return a
    }, k = function(a, b, c) {
        var f = d(a, c);
        if (e(f) === "undefined" || f === "auto") {
            c === "height" && (f = a.offsetHeight);
            c === "width" && (f = a.offsetWidth)
        }
        var g = {start: f,end: b,unit: "",key: c,defaultColor: !1};
        if (e(b) === "number") {
            var j = [0, "px"];
            e(f) === "number" ? j[0] = f : j = i(f);
            g.start = j[0];
            g.unit = j[1]
        }
        if (e(b) === "string") {
            var k, l;
            k = h(b);
            if (k) {
                l = h(f);
                l || (l = h("#fff"));
                g.start = l;
                g.end = k;
                g.defaultColor = !0
            }
        }
        a = null;
        return g
    }, l = {opacity: function(a, b, c, d) {
            var e = a * (c - b) + b;
            return {filter: "alpha(opacity=" + e * 100 + ")",opacity: Math.max(Math.min(1, e), 0),zoom: "1"}
        },defaultColor: function(a, b, c, d, e) {
            var f = Math.max(0, Math.min(255, Math.ceil(a * (c.getR() - b.getR()) + b.getR()))), g = Math.max(0, Math.min(255, Math.ceil(a * (c.getG() - b.getG()) + b.getG()))), h = Math.max(0, Math.min(255, Math.ceil(a * (c.getB() - b.getB()) + b.getB()))), i = {};
            i[j(e)] = "#" + (f < 16 ? "0" : "") + f.toString(16) + (g < 16 ? "0" : "") + g.toString(16) + (h < 16 ? "0" : "") + h.toString(16);
            return i
        },"default": function(a, b, c, d, e) {
            var f = a * (c - b) + b, g = {};
            g[j(e)] = f + d;
            return g
        }};
    return function(d, e) {
        var h, i, j, m, n, o, p, q, r, s;
        e = e || {};
        i = f({animationType: "linear",duration: 500,algorithmParams: {},extra: 5,delay: 25}, e);
        i.distance = 1;
        var t, u;
        i.callback = function() {
            u = e.end || a.core.func.empty;
            t = e.tween || a.core.func.empty;
            return function() {
                m(1);
                p();
                u(d)
            }
        }();
        j = g(l, e.propertys || {});
        o = null;
        n = {};
        r = [];
        m = function(a) {
            var b = [], e = c(n, function(b, c) {
                var d;
                j[c] ? d = j[c] : b.defaultColor ? d = j.defaultColor : d = j["default"];
                var e = d(a, b.start, b.end, b.unit, b.key);
                for (var f in e)
                    o.push(f, e[f]);
                try {
                    t(a)
                } catch (g) {
                }
            });
            d.style.cssText = o.getCss()
        };
        p = function() {
            var a;
            while (a = r.shift())
                try {
                    a.fn();
                    if (a.type === "play")
                        break;
                    if (a.type === "destroy")
                        break
                } catch (b) {
                }
        };
        s = b(m, i);
        var v = function(a) {
            s.getStatus() !== "play" ? d = a : r.push({fn: v,type: "setNode"})
        }, w = function(b) {
            if (s.getStatus() !== "play") {
                n = c(b, function(a, b) {
                    return k(d, a, b)
                });
                o = a.core.dom.cssText(d.style.cssText + (e.staticStyle || ""));
                s.play()
            } else
                r.push({fn: function() {
                        w(b)
                    },type: "play"})
        }, x = function() {
            if (s.getStatus() !== "play") {
                s.destroy();
                d = null;
                h = null;
                i = null;
                j = null;
                m = null;
                n = null;
                o = null;
                p = null;
                q = null;
                r = null
            } else
                r.push({fn: x,type: "destroy"})
        };
        h = {};
        h.play = function(a) {
            w(a);
            return h
        };
        h.stop = function() {
            s.stop();
            return h
        };
        h.pause = function() {
            s.pause();
            return h
        };
        h.resume = function() {
            s.resume();
            return h
        };
        h.finish = function(a) {
            w(a);
            x();
            return h
        };
        h.setNode = function(a) {
            v(a);
            return h
        };
        h.destroy = function() {
            x();
            return h
        };
        return h
    }
});
STK.register("core.dom.hasClassName", function(a) {
    return function(a, b) {
        return (new RegExp("(^|\\s)" + b + "($|\\s)")).test(a.className)
    }
});
STK.register("core.str.trim", function(a) {
    return function(a) {
        if (typeof a != "string")
            throw "trim need a string as parameter";
        var b = a.length, c = 0, d = /(\u3000|\s|\t|\u00A0)/;
        while (c < b) {
            if (!d.test(a.charAt(c)))
                break;
            c += 1
        }
        while (b > c) {
            if (!d.test(a.charAt(b - 1)))
                break;
            b -= 1
        }
        return a.slice(c, b)
    }
});
STK.register("core.dom.addClassName", function(a) {
    return function(b, c) {
        b.nodeType === 1 && (a.core.dom.hasClassName(b, c) || (b.className = a.core.str.trim(b.className) + " " + c))
    }
});
STK.register("core.dom.removeClassName", function(a) {
    return function(b, c) {
        b.nodeType === 1 && a.core.dom.hasClassName(b, c) && (b.className = b.className.replace(new RegExp("(^|\\s)" + c + "($|\\s)"), " "))
    }
});
STK.register("core.evt.addEvent", function(a) {
    return function(b, c, d) {
        b = a.E(b);
        if (b == null)
            return !1;
        if (typeof d != "function")
            return !1;
        b.addEventListener ? b.addEventListener(c, d, !1) : b.attachEvent ? b.attachEvent("on" + c, d) : b["on" + c] = d;
        return !0
    }
});
STK.register("core.evt.removeEvent", function(a) {
    return function(b, c, d) {
        b = a.E(b);
        if (b == null)
            return !1;
        if (typeof d != "function")
            return !1;
        b.removeEventListener ? b.removeEventListener(c, d, !1) : b.detachEvent && b.detachEvent("on" + c, d);
        b["on" + c] = null;
        return !0
    }
});
STK.register("core.ani.transition", function(a) {
    var b = function() {
        var a = document.createElement("style"), b = "STK_transition_" + +(new Date), c = null, d = {};
        a.setAttribute("type", "text/css");
        a.setAttribute("id", b);
        document.head.appendChild(a);
        for (var e = 0, f = document.styleSheets.length; e < f; e += 1)
            if (document.styleSheets[e].ownerNode.id === b) {
                c = document.styleSheets[e];
                break
            }
        d.getCssSheet = function() {
            return c
        };
        d.addRule = function(a, b) {
            var d = c.rules || c.cssRules;
            c.addRule ? c.addRule(a, b, d.length) : c.insertRule && c.insertRule(a + " {" + b + "}", d.length)
        };
        d.destory = function() {
            document.head.removeChild(a);
            a = null;
            c = null;
            b = null
        };
        return d
    };
    return function(c, d) {
        var e = a.core.obj.parseParam({target: "",duration: 500,timingFn: [0, 0, 1, 1],callback: function() {
            }}, d), f = "all " + e.duration + "ms cubic-bezier(" + e.timingFn.join(",") + ")", g = a.core.dom.cssText(c.style.cssText), h = "test", i = b();
        g.merge(e.target);
        g.push("transition", f);
        i.addRule("." + h, g.getCss());
        a.core.evt.addEvent(c, "transitionend", function() {
            a.core.evt.removeEvent(c, "transitionend", arguments.callee);
            c.style.cssText = g.remove("transition").getCss();
            a.core.dom.removeClassName(c, h);
            i.destory();
            f = null;
            g = null;
            h = null;
            i = null;
            e.callback(c);
            e = null
        });
        a.core.dom.addClassName(c, h);
        c.style.cssText = ""
    }
});
STK.register("core.arr.findout", function(a) {
    return function(b, c) {
        if (!a.core.arr.isArray(b))
            throw "the findout function needs an array as first parameter";
        var d = [];
        for (var e = 0, f = b.length; e < f; e += 1)
            b[e] === c && d.push(e);
        return d
    }
});
STK.register("core.arr.clear", function(a) {
    return function(b) {
        if (!a.core.arr.isArray(b))
            throw "the clear function needs an array as first parameter";
        var c = [];
        for (var d = 0, e = b.length; d < e; d += 1)
            a.core.arr.findout([undefined, null, ""], b[d]).length || c.push(b[d]);
        return c
    }
});
STK.register("core.arr.copy", function(a) {
    return function(b) {
        if (!a.core.arr.isArray(b))
            throw "the copy function needs an array as first parameter";
        return b.slice(0)
    }
});
STK.register("core.arr.hasby", function(a) {
    return function(b, c) {
        if (!a.core.arr.isArray(b))
            throw "the hasBy function needs an array as first parameter";
        var d = [];
        for (var e = 0, f = b.length; e < f; e += 1)
            c(b[e], e) && d.push(e);
        return d
    }
});
STK.register("core.arr.unique", function(a) {
    return function(b) {
        if (!a.core.arr.isArray(b))
            throw "the unique function needs an array as first parameter";
        var c = [];
        for (var d = 0, e = b.length; d < e; d += 1)
            a.core.arr.indexOf(b[d], c) === -1 && c.push(b[d]);
        return c
    }
});
STK.register("core.dom.addHTML", function(a) {
    return function(a, b) {
        if (a.insertAdjacentHTML)
            a.insertAdjacentHTML("BeforeEnd", b);
        else {
            var c = a.ownerDocument.createRange();
            c.setStartBefore(a);
            var d = c.createContextualFragment(b);
            a.appendChild(d)
        }
    }
});
STK.register("core.dom.sizzle", function(a) {
    function c(a, b, c, d, e, f) {
        for (var g = 0, h = d.length; g < h; g++) {
            var i = d[g];
            if (i) {
                i = i[a];
                var j = !1;
                while (i) {
                    if (i.sizcache === c) {
                        j = d[i.sizset];
                        break
                    }
                    if (i.nodeType === 1 && !f) {
                        i.sizcache = c;
                        i.sizset = g
                    }
                    if (i.nodeName.toLowerCase() === b) {
                        j = i;
                        break
                    }
                    i = i[a]
                }
                d[g] = j
            }
        }
    }
    function b(a, b, c, d, e, f) {
        for (var g = 0, h = d.length; g < h; g++) {
            var j = d[g];
            if (j) {
                j = j[a];
                var k = !1;
                while (j) {
                    if (j.sizcache === c) {
                        k = d[j.sizset];
                        break
                    }
                    if (j.nodeType === 1) {
                        if (!f) {
                            j.sizcache = c;
                            j.sizset = g
                        }
                        if (typeof b != "string") {
                            if (j === b) {
                                k = !0;
                                break
                            }
                        } else if (i.filter(b, [j]).length > 0) {
                            k = j;
                            break
                        }
                    }
                    j = j[a]
                }
                d[g] = k
            }
        }
    }
    var d = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, e = 0, f = Object.prototype.toString, g = !1, h = !0;
    [0, 0].sort(function() {
        h = !1;
        return 0
    });
    var i = function(a, b, c, e) {
        c = c || [];
        b = b || document;
        var g = b;
        if (b.nodeType !== 1 && b.nodeType !== 9)
            return [];
        if (!a || typeof a != "string")
            return c;
        var h = [], l, m, o, p, r = !0, s = i.isXML(b), t = a, u, v, w, x;
        do {
            d.exec("");
            l = d.exec(t);
            if (l) {
                t = l[3];
                h.push(l[1]);
                if (l[2]) {
                    p = l[3];
                    break
                }
            }
        } while (l);
        if (h.length > 1 && k.exec(a))
            if (h.length === 2 && j.relative[h[0]])
                m = q(h[0] + h[1], b);
            else {
                m = j.relative[h[0]] ? [b] : i(h.shift(), b);
                while (h.length) {
                    a = h.shift();
                    j.relative[a] && (a += h.shift());
                    m = q(a, m)
                }
            }
        else {
            if (!e && h.length > 1 && b.nodeType === 9 && !s && j.match.ID.test(h[0]) && !j.match.ID.test(h[h.length - 1])) {
                u = i.find(h.shift(), b, s);
                b = u.expr ? i.filter(u.expr, u.set)[0] : u.set[0]
            }
            if (b) {
                u = e ? {expr: h.pop(),set: n(e)} : i.find(h.pop(), h.length === 1 && (h[0] === "~" || h[0] === "+") && b.parentNode ? b.parentNode : b, s);
                m = u.expr ? i.filter(u.expr, u.set) : u.set;
                h.length > 0 ? o = n(m) : r = !1;
                while (h.length) {
                    v = h.pop();
                    w = v;
                    j.relative[v] ? w = h.pop() : v = "";
                    w == null && (w = b);
                    j.relative[v](o, w, s)
                }
            } else
                o = h = []
        }
        o || (o = m);
        o || i.error(v || a);
        if (f.call(o) === "[object Array]")
            if (!r)
                c.push.apply(c, o);
            else if (b && b.nodeType === 1)
                for (x = 0; o[x] != null; x++)
                    o[x] && (o[x] === !0 || o[x].nodeType === 1 && i.contains(b, o[x])) && c.push(m[x]);
            else
                for (x = 0; o[x] != null; x++)
                    o[x] && o[x].nodeType === 1 && c.push(m[x]);
        else
            n(o, c);
        if (p) {
            i(p, g, c, e);
            i.uniqueSort(c)
        }
        return c
    };
    i.uniqueSort = function(a) {
        if (p) {
            g = h;
            a.sort(p);
            if (g)
                for (var b = 1; b < a.length; b++)
                    a[b] === a[b - 1] && a.splice(b--, 1)
        }
        return a
    };
    i.matches = function(a, b) {
        return i(a, null, null, b)
    };
    i.find = function(a, b, c) {
        var d;
        if (!a)
            return [];
        for (var e = 0, f = j.order.length; e < f; e++) {
            var g = j.order[e], h;
            if (h = j.leftMatch[g].exec(a)) {
                var i = h[1];
                h.splice(1, 1);
                if (i.substr(i.length - 1) !== "\\") {
                    h[1] = (h[1] || "").replace(/\\/g, "");
                    d = j.find[g](h, b, c);
                    if (d != null) {
                        a = a.replace(j.match[g], "");
                        break
                    }
                }
            }
        }
        d || (d = b.getElementsByTagName("*"));
        return {set: d,expr: a}
    };
    i.filter = function(a, b, c, d) {
        var e = a, f = [], g = b, h, k, l = b && b[0] && i.isXML(b[0]);
        while (a && b.length) {
            for (var m in j.filter)
                if ((h = j.leftMatch[m].exec(a)) != null && h[2]) {
                    var n = j.filter[m], o, p, q = h[1];
                    k = !1;
                    h.splice(1, 1);
                    if (q.substr(q.length - 1) === "\\")
                        continue;
                    g === f && (f = []);
                    if (j.preFilter[m]) {
                        h = j.preFilter[m](h, g, c, f, d, l);
                        if (!h)
                            k = o = !0;
                        else if (h === !0)
                            continue
                    }
                    if (h)
                        for (var r = 0; (p = g[r]) != null; r++)
                            if (p) {
                                o = n(p, h, r, g);
                                var s = d ^ !!o;
                                if (c && o != null)
                                    s ? k = !0 : g[r] = !1;
                                else if (s) {
                                    f.push(p);
                                    k = !0
                                }
                            }
                    if (o !== undefined) {
                        c || (g = f);
                        a = a.replace(j.match[m], "");
                        if (!k)
                            return [];
                        break
                    }
                }
            if (a === e)
                if (k == null)
                    i.error(a);
                else
                    break;
            e = a
        }
        return g
    };
    i.error = function(a) {
        throw "Syntax error, unrecognized expression: " + a
    };
    var j = {order: ["ID", "NAME", "TAG"],match: {ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch: {},attrMap: {"class": "className","for": "htmlFor"},attrHandle: {href: function(a) {
                return a.getAttribute("href")
            }},relative: {"+": function(a, b) {
                var c = typeof b == "string", d = c && !/\W/.test(b), e = c && !d;
                d && (b = b.toLowerCase());
                for (var f = 0, g = a.length, h; f < g; f++)
                    if (h = a[f]) {
                        while ((h = h.previousSibling) && h.nodeType !== 1)
                            ;
                        a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                    }
                e && i.filter(b, a, !0)
            },">": function(a, b) {
                var c = typeof b == "string", d, e = 0, f = a.length;
                if (c && !/\W/.test(b)) {
                    b = b.toLowerCase();
                    for (; e < f; e++) {
                        d = a[e];
                        if (d) {
                            var g = d.parentNode;
                            a[e] = g.nodeName.toLowerCase() === b ? g : !1
                        }
                    }
                } else {
                    for (; e < f; e++) {
                        d = a[e];
                        d && (a[e] = c ? d.parentNode : d.parentNode === b)
                    }
                    c && i.filter(b, a, !0)
                }
            },"": function(a, d, f) {
                var g = e++, h = b, i;
                if (typeof d == "string" && !/\W/.test(d)) {
                    d = d.toLowerCase();
                    i = d;
                    h = c
                }
                h("parentNode", d, g, a, i, f)
            },"~": function(a, d, f) {
                var g = e++, h = b, i;
                if (typeof d == "string" && !/\W/.test(d)) {
                    d = d.toLowerCase();
                    i = d;
                    h = c
                }
                h("previousSibling", d, g, a, i, f)
            }},find: {ID: function(a, b, c) {
                if (typeof b.getElementById != "undefined" && !c) {
                    var d = b.getElementById(a[1]);
                    return d ? [d] : []
                }
            },NAME: function(a, b) {
                if (typeof b.getElementsByName != "undefined") {
                    var c = [], d = b.getElementsByName(a[1]);
                    for (var e = 0, f = d.length; e < f; e++)
                        d[e].getAttribute("name") === a[1] && c.push(d[e]);
                    return c.length === 0 ? null : c
                }
            },TAG: function(a, b) {
                return b.getElementsByTagName(a[1])
            }},preFilter: {CLASS: function(a, b, c, d, e, f) {
                a = " " + a[1].replace(/\\/g, "") + " ";
                if (f)
                    return a;
                for (var g = 0, h; (h = b[g]) != null; g++)
                    h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                return !1
            },ID: function(a) {
                return a[1].replace(/\\/g, "")
            },TAG: function(a, b) {
                return a[1].toLowerCase()
            },CHILD: function(a) {
                if (a[1] === "nth") {
                    var b = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                    a[2] = b[1] + (b[2] || 1) - 0;
                    a[3] = b[3] - 0
                }
                a[0] = e++;
                return a
            },ATTR: function(a, b, c, d, e, f) {
                var g = a[1].replace(/\\/g, "");
                !f && j.attrMap[g] && (a[1] = j.attrMap[g]);
                a[2] === "~=" && (a[4] = " " + a[4] + " ");
                return a
            },PSEUDO: function(a, b, c, e, f) {
                if (a[1] === "not")
                    if ((d.exec(a[3]) || "").length > 1 || /^\w/.test(a[3]))
                        a[3] = i(a[3], null, null, b);
                    else {
                        var g = i.filter(a[3], b, c, !0 ^ f);
                        c || e.push.apply(e, g);
                        return !1
                    }
                else if (j.match.POS.test(a[0]) || j.match.CHILD.test(a[0]))
                    return !0;
                return a
            },POS: function(a) {
                a.unshift(!0);
                return a
            }},filters: {enabled: function(a) {
                return a.disabled === !1 && a.type !== "hidden"
            },disabled: function(a) {
                return a.disabled === !0
            },checked: function(a) {
                return a.checked === !0
            },selected: function(a) {
                a.parentNode.selectedIndex;
                return a.selected === !0
            },parent: function(a) {
                return !!a.firstChild
            },empty: function(a) {
                return !a.firstChild
            },has: function(a, b, c) {
                return !!i(c[3], a).length
            },header: function(a) {
                return /h\d/i.test(a.nodeName)
            },text: function(a) {
                return "text" === a.type
            },radio: function(a) {
                return "radio" === a.type
            },checkbox: function(a) {
                return "checkbox" === a.type
            },file: function(a) {
                return "file" === a.type
            },password: function(a) {
                return "password" === a.type
            },submit: function(a) {
                return "submit" === a.type
            },image: function(a) {
                return "image" === a.type
            },reset: function(a) {
                return "reset" === a.type
            },button: function(a) {
                return "button" === a.type || a.nodeName.toLowerCase() === "button"
            },input: function(a) {
                return /input|select|textarea|button/i.test(a.nodeName)
            }},setFilters: {first: function(a, b) {
                return b === 0
            },last: function(a, b, c, d) {
                return b === d.length - 1
            },even: function(a, b) {
                return b % 2 === 0
            },odd: function(a, b) {
                return b % 2 === 1
            },lt: function(a, b, c) {
                return b < c[3] - 0
            },gt: function(a, b, c) {
                return b > c[3] - 0
            },nth: function(a, b, c) {
                return c[3] - 0 === b
            },eq: function(a, b, c) {
                return c[3] - 0 === b
            }},filter: {PSEUDO: function(a, b, c, d) {
                var e = b[1], f = j.filters[e];
                if (f)
                    return f(a, c, b, d);
                if (e === "contains")
                    return (a.textContent || a.innerText || i.getText([a]) || "").indexOf(b[3]) >= 0;
                if (e === "not") {
                    var g = b[3];
                    for (var h = 0, k = g.length; h < k; h++)
                        if (g[h] === a)
                            return !1;
                    return !0
                }
                i.error("Syntax error, unrecognized expression: " + e)
            },CHILD: function(a, b) {
                var c = b[1], d = a;
                switch (c) {
                    case "only":
                    case "first":
                        while (d = d.previousSibling)
                            if (d.nodeType === 1)
                                return !1;
                        if (c === "first")
                            return !0;
                        d = a;
                    case "last":
                        while (d = d.nextSibling)
                            if (d.nodeType === 1)
                                return !1;
                        return !0;
                    case "nth":
                        var e = b[2], f = b[3];
                        if (e === 1 && f === 0)
                            return !0;
                        var g = b[0], h = a.parentNode;
                        if (h && (h.sizcache !== g || !a.nodeIndex)) {
                            var i = 0;
                            for (d = h.firstChild; d; d = d.nextSibling)
                                d.nodeType === 1 && (d.nodeIndex = ++i);
                            h.sizcache = g
                        }
                        var j = a.nodeIndex - f;
                        return e === 0 ? j === 0 : j % e === 0 && j / e >= 0
                }
            },ID: function(a, b) {
                return a.nodeType === 1 && a.getAttribute("id") === b
            },TAG: function(a, b) {
                return b === "*" && a.nodeType === 1 || a.nodeName.toLowerCase() === b
            },CLASS: function(a, b) {
                return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
            },ATTR: function(a, b) {
                var c = b[1], d = j.attrHandle[c] ? j.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c), e = d + "", f = b[2], g = b[4];
                return d == null ? f === "!=" : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
            },POS: function(a, b, c, d) {
                var e = b[2], f = j.setFilters[e];
                if (f)
                    return f(a, c, b, d)
            }}};
    i.selectors = j;
    var k = j.match.POS, l = function(a, b) {
        return "\\" + (b - 0 + 1)
    };
    for (var m in j.match) {
        j.match[m] = new RegExp(j.match[m].source + /(?![^\[]*\])(?![^\(]*\))/.source);
        j.leftMatch[m] = new RegExp(/(^(?:.|\r|\n)*?)/.source + j.match[m].source.replace(/\\(\d+)/g, l))
    }
    var n = function(a, b) {
        a = Array.prototype.slice.call(a, 0);
        if (b) {
            b.push.apply(b, a);
            return b
        }
        return a
    };
    try {
        Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
    } catch (o) {
        n = function(a, b) {
            var c = b || [], d = 0;
            if (f.call(a) === "[object Array]")
                Array.prototype.push.apply(c, a);
            else if (typeof a.length == "number")
                for (var e = a.length; d < e; d++)
                    c.push(a[d]);
            else
                for (; a[d]; d++)
                    c.push(a[d]);
            return c
        }
    }
    var p;
    document.documentElement.compareDocumentPosition ? p = function(a, b) {
        if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
            a == b && (g = !0);
            return a.compareDocumentPosition ? -1 : 1
        }
        var c = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
        c === 0 && (g = !0);
        return c
    } : "sourceIndex" in document.documentElement ? p = function(a, b) {
        if (!a.sourceIndex || !b.sourceIndex) {
            a == b && (g = !0);
            return a.sourceIndex ? -1 : 1
        }
        var c = a.sourceIndex - b.sourceIndex;
        c === 0 && (g = !0);
        return c
    } : document.createRange && (p = function(a, b) {
        if (!a.ownerDocument || !b.ownerDocument) {
            a == b && (g = !0);
            return a.ownerDocument ? -1 : 1
        }
        var c = a.ownerDocument.createRange(), d = b.ownerDocument.createRange();
        c.setStart(a, 0);
        c.setEnd(a, 0);
        d.setStart(b, 0);
        d.setEnd(b, 0);
        var e = c.compareBoundaryPoints(Range.START_TO_END, d);
        e === 0 && (g = !0);
        return e
    });
    i.getText = function(a) {
        var b = "", c;
        for (var d = 0; a[d]; d++) {
            c = a[d];
            c.nodeType === 3 || c.nodeType === 4 ? b += c.nodeValue : c.nodeType !== 8 && (b += i.getText(c.childNodes))
        }
        return b
    };
    (function() {
        var a = document.createElement("div"), b = "script" + (new Date).getTime();
        a.innerHTML = "<a name='" + b + "'/>";
        var c = document.documentElement;
        c.insertBefore(a, c.firstChild);
        if (document.getElementById(b)) {
            j.find.ID = function(a, b, c) {
                if (typeof b.getElementById != "undefined" && !c) {
                    var d = b.getElementById(a[1]);
                    return d ? d.id === a[1] || typeof d.getAttributeNode != "undefined" && d.getAttributeNode("id").nodeValue === a[1] ? [d] : undefined : []
                }
            };
            j.filter.ID = function(a, b) {
                var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b
            }
        }
        c.removeChild(a);
        c = a = null
    })();
    (function() {
        var a = document.createElement("div");
        a.appendChild(document.createComment(""));
        a.getElementsByTagName("*").length > 0 && (j.find.TAG = function(a, b) {
            var c = b.getElementsByTagName(a[1]);
            if (a[1] === "*") {
                var d = [];
                for (var e = 0; c[e]; e++)
                    c[e].nodeType === 1 && d.push(c[e]);
                c = d
            }
            return c
        });
        a.innerHTML = "<a href='#'></a>";
        a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (j.attrHandle.href = function(a) {
            return a.getAttribute("href", 2)
        });
        a = null
    })();
    document.querySelectorAll && function() {
        var a = i, b = document.createElement("div");
        b.innerHTML = "<p class='TEST'></p>";
        if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
            i = function(b, c, d, e) {
                c = c || document;
                if (!e && c.nodeType === 9 && !i.isXML(c))
                    try {
                        return n(c.querySelectorAll(b), d)
                    } catch (f) {
                    }
                return a(b, c, d, e)
            };
            for (var c in a)
                i[c] = a[c];
            b = null
        }
    }();
    (function() {
        var a = document.createElement("div");
        a.innerHTML = "<div class='test e'></div><div class='test'></div>";
        if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
            a.lastChild.className = "e";
            if (a.getElementsByClassName("e").length === 1)
                return;
            j.order.splice(1, 0, "CLASS");
            j.find.CLASS = function(a, b, c) {
                if (typeof b.getElementsByClassName != "undefined" && !c)
                    return b.getElementsByClassName(a[1])
            };
            a = null
        }
    })();
    i.contains = document.compareDocumentPosition ? function(a, b) {
        return !!(a.compareDocumentPosition(b) & 16)
    } : function(a, b) {
        return a !== b && (a.contains ? a.contains(b) : !0)
    };
    i.isXML = function(a) {
        var b = (a ? a.ownerDocument || a : 0).documentElement;
        return b ? b.nodeName !== "HTML" : !1
    };
    var q = function(a, b) {
        var c = [], d = "", e, f = b.nodeType ? [b] : b;
        while (e = j.match.PSEUDO.exec(a)) {
            d += e[0];
            a = a.replace(j.match.PSEUDO, "")
        }
        a = j.relative[a] ? a + "*" : a;
        for (var g = 0, h = f.length; g < h; g++)
            i(a, f[g], c);
        return i.filter(d, c)
    };
    return i
});
STK.register("core.dom.builder", function(a) {
    return function(b, c) {
        var d = typeof b == "string", e = b;
        if (d) {
            e = a.C("div");
            e.innerHTML = b
        }
        var f, g;
        g = a.core.dom.sizzle("[node-type]", e);
        f = {};
        for (var h = 0, i = g.length; h < i; h += 1) {
            var j = g[h].getAttribute("node-type");
            f[j] || (f[j] = []);
            f[j].push(g[h])
        }
        var k = b;
        if (d) {
            k = a.C("buffer");
            while (e.childNodes[0])
                k.appendChild(e.childNodes[0])
        }
        return {box: k,list: f}
    }
});
STK.register("core.dom.setStyle", function(a) {
    function b() {
        return "y" in b ? b.y : b.y = "filters" in a.C("div")
    }
    return function(a, c, d) {
        if (b())
            switch (c) {
                case "opacity":
                    a.style.filter = "alpha(opacity=" + d * 100 + ")";
                    if (!a.currentStyle || !a.currentStyle.hasLayout)
                        a.style.zoom = 1;
                    break;
                case "float":
                    c = "styleFloat";
                default:
                    a.style[c] = d
            }
        else {
            c == "float" && (c = "cssFloat");
            a.style[c] = d
        }
    }
});
STK.register("core.dom.insertAfter", function(a) {
    return function(a, b) {
        var c = b.parentNode;
        c.lastChild == b ? c.appendChild(a) : c.insertBefore(a, b.nextSibling)
    }
});
STK.register("core.dom.insertBefore", function(a) {
    return function(a, b) {
        var c = b.parentNode;
        c.insertBefore(a, b)
    }
});
STK.register("core.dom.trimNode", function(a) {
    return function(a) {
        var b = a.childNodes;
        for (var c = b.length - 1; c >= 0; c -= 1)
            b[c] && (b[c].nodeType == 3 || b[c].nodeType == 8) && a.removeChild(b[c])
    }
});
STK.register("core.dom.removeNode", function(a) {
    return function(b) {
        b = a.E(b) || b;
        try {
            b.parentNode.removeChild(b)
        } catch (c) {
        }
    }
});
STK.register("core.evt.fireEvent", function(a) {
    return function(b, c) {
        var d = a.E(b);
        if (d.addEventListener) {
            var e = document.createEvent("HTMLEvents");
            e.initEvent(c, !0, !0);
            d.dispatchEvent(e)
        } else
            d.fireEvent("on" + c)
    }
});
STK.register("core.util.scrollPos", function(a) {
    return function(a) {
        a = a || document;
        var b = a.documentElement, c = a.body;
        return {top: Math.max(window.pageYOffset || 0, b.scrollTop, c.scrollTop),left: Math.max(window.pageXOffset || 0, b.scrollLeft, c.scrollLeft)}
    }
});
STK.register("core.dom.position", function(a) {
    var b = function(b) {
        var c, d, e, f, g, h;
        c = b.getBoundingClientRect();
        d = a.core.util.scrollPos();
        e = b.ownerDocument.body;
        f = b.ownerDocument.documentElement;
        g = f.clientTop || e.clientTop || 0;
        h = f.clientLeft || e.clientLeft || 0;
        return {l: parseInt(c.left + d.left - h, 10) || 0,t: parseInt(c.top + d.top - g, 10) || 0}
    }, c = function(b, c) {
        var d, e;
        d = [b.offsetLeft, b.offsetTop];
        e = b.offsetParent;
        if (e !== b && e !== c)
            while (e) {
                d[0] += e.offsetLeft;
                d[1] += e.offsetTop;
                e = e.offsetParent
            }
        if (a.core.util.browser.OPERA != -1 || a.core.util.browser.SAFARI != -1 && b.style.position == "absolute") {
            d[0] -= document.body.offsetLeft;
            d[1] -= document.body.offsetTop
        }
        b.parentNode ? e = b.parentNode : e = null;
        while (e && !/^body|html$/i.test(e.tagName) && e !== c) {
            if (e.style.display.search(/^inline|table-row.*$/i)) {
                d[0] -= e.scrollLeft;
                d[1] -= e.scrollTop
            }
            e = e.parentNode
        }
        return {l: parseInt(d[0], 10),t: parseInt(d[1], 10)}
    };
    return function(d, e) {
        if (d == document.body)
            return !1;
        if (d.parentNode == null)
            return !1;
        if (d.style.display == "none")
            return !1;
        var f = a.core.obj.parseParam({parent: null}, e);
        if (d.getBoundingClientRect) {
            if (f.parent) {
                var g = b(d), h = b(f.parent);
                return {l: g.l - h.l,t: g.t - h.t}
            }
            return b(d)
        }
        return c(d, f.parent || document.body)
    }
});
STK.register("core.dom.setXY", function(a) {
    return function(b, c) {
        var d = a.core.dom.getStyle(b, "position");
        if (d == "static") {
            a.core.dom.setStyle(b, "position", "relative");
            d = "relative"
        }
        var e = a.core.dom.position(b);
        if (e != !1) {
            var f = {l: parseInt(a.core.dom.getStyle(b, "left"), 10),t: parseInt(a.core.dom.getStyle(b, "top"), 10)};
            isNaN(f.l) && (f.l = d == "relative" ? 0 : b.offsetLeft);
            isNaN(f.t) && (f.t = d == "relative" ? 0 : b.offsetTop);
            c.l != null && (b.style.left = c.l - e.l + f.l + "px");
            c.t != null && (b.style.top = c.t - e.t + f.t + "px")
        }
    }
});
STK.register("core.str.encodeHTML", function(a) {
    return function(a) {
        if (typeof a != "string")
            throw "encodeHTML need a string as parameter";
        return a.replace(/\&/g, "&amp;").replace(/"/g, "&quot;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\'/g, "&#39;").replace(/\u00A0/g, "&nbsp;").replace(/(\u0020|\u000B|\u2028|\u2029|\f)/g, "&#32;")
    }
});
STK.register("core.str.decodeHTML", function(a) {
    return function(a) {
        if (typeof a != "string")
            throw "decodeHTML need a string as parameter";
        return a.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&nbsp;/g, "聽").replace(/&#32;/g, " ").replace(/&amp;/g, "&")
    }
});
STK.register("core.dom.cascadeNode", function(a) {
    return function(b) {
        var c = {}, d = b.style.display || "";
        d = d === "none" ? "" : d;
        var e = [];
        c.setStyle = function(e, f) {
            a.core.dom.setStyle(b, e, f);
            e === "display" && (d = f === "none" ? "" : f);
            return c
        };
        c.insertAfter = function(d) {
            a.core.dom.insertAfter(d, b);
            return c
        };
        c.insertBefore = function(d) {
            a.core.dom.insertBefore(d, b);
            return c
        };
        c.addClassName = function(d) {
            a.core.dom.addClassName(b, d);
            return c
        };
        c.removeClassName = function(d) {
            a.core.dom.removeClassName(b, d);
            return c
        };
        c.trimNode = function() {
            a.core.dom.trimNode(b);
            return c
        };
        c.removeNode = function() {
            a.core.dom.removeNode(b);
            return c
        };
        c.on = function(d, f) {
            for (var g = 0, h = e.length; g < h; g += 1)
                if (e[g].fn === f && e[g].type === d)
                    return c;
            e.push({fn: f,type: d});
            a.core.evt.addEvent(b, d, f);
            return c
        };
        c.unon = function(d, f) {
            for (var g = 0, h = e.length; g < h; g += 1)
                if (e[g].fn === f && e[g].type === d) {
                    a.core.evt.removeEvent(b, f, d);
                    e.splice(g, 1);
                    break
                }
            return c
        };
        c.fire = function(d) {
            a.core.evt.fireEvent(d, b);
            return c
        };
        c.appendChild = function(a) {
            b.appendChild(a);
            return c
        };
        c.removeChild = function(a) {
            b.removeChild(a);
            return c
        };
        c.toggle = function() {
            b.style.display === "none" ? b.style.display = d : b.style.display = "none";
            return c
        };
        c.show = function() {
            b.style.display === "none" && (d === "none" ? b.style.display = "" : b.style.display = d);
            return c
        };
        c.hidd = function() {
            b.style.display !== "none" && (b.style.display = "none");
            return c
        };
        c.hide = c.hidd;
        c.scrollTo = function(a, d) {
            a === "left" && (b.scrollLeft = d);
            a === "top" && (b.scrollTop = d);
            return c
        };
        c.replaceChild = function(a, d) {
            b.replaceChild(a, d);
            return c
        };
        c.position = function(c) {
            c !== undefined && a.core.dom.setXY(b, c);
            return a.core.dom.position(b)
        };
        c.setPosition = function(d) {
            d !== undefined && a.core.dom.setXY(b, d);
            return c
        };
        c.getPosition = function(c) {
            return a.core.dom.position(b)
        };
        c.html = function(a) {
            a !== undefined && (b.innerHTML = a);
            return b.innerHTML
        };
        c.setHTML = function(a) {
            a !== undefined && (b.innerHTML = a);
            return c
        };
        c.getHTML = function() {
            return b.innerHTML
        };
        c.text = function(c) {
            c !== undefined && (b.innerHTML = a.core.str.encodeHTML(c));
            return a.core.str.decodeHTML(b.innerHTML)
        };
        c.ttext = c.text;
        c.setText = function(d) {
            d !== undefined && (b.innerHTML = a.core.str.encodeHTML(d));
            return c
        };
        c.getText = function() {
            return a.core.str.decodeHTML(b.innerHTML)
        };
        c.get = function(c) {
            return c === "node" ? b : a.core.dom.getStyle(b, c)
        };
        c.getStyle = function(c) {
            return a.core.dom.getStyle(b, c)
        };
        c.getOriginNode = function() {
            return b
        };
        c.destroy = function() {
            for (var c = 0, f = e; c < f; c += 1)
                a.core.evt.removeEvent(b, e[c].fn, e[c].type);
            d = null;
            e = null;
            b = null
        };
        return c
    }
});
STK.register("core.dom.contains", function(a) {
    return function(a, b) {
        if (a === b)
            return !1;
        if (a.compareDocumentPosition)
            return (a.compareDocumentPosition(b) & 16) === 16;
        if (a.contains && b.nodeType === 1)
            return a.contains(b);
        while (b = b.parentNode)
            if (a === b)
                return !0;
        return !1
    }
});
STK.register("core.dom.dir", function(a) {
    var b = {parent: "parentNode",next: "nextSibling",prev: "previousSibling"}, c = function(c, d) {
        d = a.core.obj.parseParam({dir: "parent",expr: undefined,endpoint: document,matchAll: !1}, d);
        var e = b[d.dir], f = d.expr, g = d.endpoint, h = !!d.matchAll;
        if (!c)
            throw "core.dom.dir: el is undefined.";
        if (!e)
            throw "core.dom.dir: spec.dir is undefined.";
        var i = [], j = c[e];
        while (j) {
            if (j.nodeType == 1)
                if (!f || a.core.dom.sizzle.matches(f, [j]).length > 0) {
                    i.push(j);
                    if (!h)
                        break
                }
            if (j == g)
                break;
            j = j[e]
        }
        return i
    };
    c.parent = function(a, b) {
        b = b || {};
        b.dir = "parent";
        return c(a, b)
    };
    c.prev = function(a, b) {
        b = b || {};
        b.dir = "prev";
        return c(a, b)
    };
    c.next = function(a, b) {
        b = b || {};
        b.dir = "next";
        return c(a, b)
    };
    return c
});
STK.register("core.dom.firstChild", function(a) {
    var b = a.core.dom.dir;
    return function(a) {
        if (a.firstElementChild)
            return a.firstElementChild;
        var c = a.firstChild;
        c && c.nodeType != 1 && (c = b.next(c)[0]);
        return c
    }
});
STK.register("core.util.hideContainer", function(a) {
    var b, c = function() {
        if (!b) {
            b = a.C("div");
            b.style.cssText = "position:absolute;top:-9999px;left:-9999px;";
            document.getElementsByTagName("head")[0].appendChild(b)
        }
    }, d = {appendChild: function(d) {
            if (a.core.dom.isNode(d)) {
                c();
                b.appendChild(d)
            }
        },removeChild: function(c) {
            a.core.dom.isNode(c) && b && b.removeChild(c)
        }};
    return d
});
STK.register("core.dom.getSize", function(a) {
    var b = function(b) {
        if (!a.core.dom.isNode(b))
            throw "core.dom.getSize need Element as first parameter";
        return {width: b.offsetWidth,height: b.offsetHeight}
    }, c = function(a) {
        var c = null;
        if (a.style.display === "none") {
            a.style.visibility = "hidden";
            a.style.display = "";
            c = b(a);
            a.style.display = "none";
            a.style.visibility = "visible"
        } else
            c = b(a);
        return c
    };
    return function(b) {
        var d = {};
        if (!b.parentNode) {
            a.core.util.hideContainer.appendChild(b);
            d = c(b);
            a.core.util.hideContainer.removeChild(b)
        } else
            d = c(b);
        return d
    }
});
STK.register("core.dom.insertHTML", function(a) {
    return function(b, c, d) {
        b = a.E(b) || document.body;
        d = d ? d.toLowerCase() : "beforeend";
        if (b.insertAdjacentHTML) {
            switch (d) {
                case "beforebegin":
                    b.insertAdjacentHTML("BeforeBegin", c);
                    return b.previousSibling;
                case "afterbegin":
                    b.insertAdjacentHTML("AfterBegin", c);
                    return b.firstChild;
                case "beforeend":
                    b.insertAdjacentHTML("BeforeEnd", c);
                    return b.lastChild;
                case "afterend":
                    b.insertAdjacentHTML("AfterEnd", c);
                    return b.nextSibling
            }
            throw 'Illegal insertion point -> "' + d + '"'
        }
        var e = b.ownerDocument.createRange(), f;
        switch (d) {
            case "beforebegin":
                e.setStartBefore(b);
                f = e.createContextualFragment(c);
                b.parentNode.insertBefore(f, b);
                return b.previousSibling;
            case "afterbegin":
                if (b.firstChild) {
                    e.setStartBefore(b.firstChild);
                    f = e.createContextualFragment(c);
                    b.insertBefore(f, b.firstChild);
                    return b.firstChild
                }
                b.innerHTML = c;
                return b.firstChild;
            case "beforeend":
                if (b.lastChild) {
                    e.setStartAfter(b.lastChild);
                    f = e.createContextualFragment(c);
                    b.appendChild(f);
                    return b.lastChild
                }
                b.innerHTML = c;
                return b.lastChild;
            case "afterend":
                e.setStartAfter(b);
                f = e.createContextualFragment(c);
                b.parentNode.insertBefore(f, b.nextSibling);
                return b.nextSibling
        }
        throw 'Illegal insertion point -> "' + d + '"'
    }
});
STK.register("core.dom.insertElement", function(a) {
    return function(b, c, d) {
        b = a.E(b) || document.body;
        d = d ? d.toLowerCase() : "beforeend";
        switch (d) {
            case "beforebegin":
                b.parentNode.insertBefore(c, b);
                break;
            case "afterbegin":
                b.insertBefore(c, b.firstChild);
                break;
            case "beforeend":
                b.appendChild(c);
                break;
            case "afterend":
                b.nextSibling ? b.parentNode.insertBefore(c, b.nextSibling) : b.parentNode.appendChild(c)
        }
    }
});
STK.register("core.dom.ready", function(a) {
    var b = [], c = !1, d = a.core.func.getType, e = a.core.util.browser, f = a.core.evt.addEvent, g = function() {
        return !c && document.readyState === "complete" ? !0 : c
    }, h = function() {
        if (c != !0) {
            c = !0;
            for (var a = 0, e = b.length; a < e; a++)
                if (d(b[a]) === "function")
                    try {
                        b[a].call()
                    } catch (f) {
                    }
            b = []
        }
    }, i = function() {
        if (g())
            h();
        else {
            try {
                document.documentElement.doScroll("left")
            } catch (a) {
                setTimeout(arguments.callee, 25);
                return
            }
            h()
        }
    }, j = function() {
        g() ? h() : setTimeout(arguments.callee, 25)
    }, k = function() {
        f(document, "DOMContentLoaded", h)
    }, l = function() {
        f(window, "load", h)
    };
    if (!g()) {
        a.IE && window === window.top && i();
        k();
        j();
        l()
    }
    return function(a) {
        g() ? d(a) === "function" && a.call() : b.push(a)
    }
});
STK.register("core.dom.isDomReady", function(a) {
    var b = !1;
    a.core.dom.ready(function() {
        b = !0
    });
    return function() {
        return b
    }
});
STK.register("core.dom.lastChild", function(a) {
    var b = a.core.dom.dir;
    return function(a) {
        if (a.lastElementChild)
            return a.lastElementChild;
        var c = a.lastChild;
        c && c.nodeType != 1 && (c = b.prev(c)[0]);
        return c
    }
});
STK.register("core.dom.neighbor", function(a) {
    var b = function(b, c, d) {
        return a.core.dom.dir(b, {dir: c,expr: d})[0]
    }, c = function(c) {
        var d = c, e = {getCurrent: function() {
                return d
            },setCurrent: function(a) {
                a && (d = a);
                return e
            },finish: function() {
                var a = d;
                d = null;
                return a
            },parent: function(a) {
                d = b(d, "parent", a) || d;
                return e
            },child: function(b) {
                d = (b ? a.core.dom.sizzle(b, d)[0] : a.core.dom.firstChild(d)) || d;
                return e
            },firstChild: function(b) {
                d = a.core.dom.firstChild(d) || d;
                return e
            },lastChild: function(b) {
                d = a.core.dom.lastChild(d) || d;
                return e
            },prev: function(a) {
                d = b(d, "prev", a) || d;
                return e
            },next: function(a) {
                d = b(d, "next", a) || d;
                return e
            },destroy: function() {
                d = null
            }};
        return e
    };
    return c
});
STK.register("core.dom.next", function(a) {
    return function(a) {
        var b = a.nextSibling;
        while (b && b.nodeType !== 1)
            b = b.nextSibling;
        return b
    }
});
STK.register("core.dom.prev", function(a) {
    return function(a) {
        var b = a.previousSibling;
        while (b && b.nodeType !== 1)
            b = b.previousSibling;
        return b
    }
});
STK.register("core.dom.replaceNode", function(a) {
    return function(a, b) {
        if (a == null || b == null)
            throw "replaceNode need node as paramster";
        b.parentNode.replaceChild(a, b)
    }
});
STK.register("core.dom.selector", function(a) {
    var b = function(b, c, d, e) {
        var f = [];
        if (typeof b == "string") {
            var g = a.core.dom.sizzle(b, c, d, e);
            for (var h = 0, i = g.length; h < i; h += 1)
                f[h] = g[h]
        } else if (a.core.dom.isNode(b))
            c ? a.core.dom.contains(c, b) && (f = [b]) : f = [b];
        else if (a.core.arr.isArray(b))
            if (c)
                for (var h = 0, i = b.length; h < i; h += 1)
                    a.core.dom.contains(c, b[h]) && f.push(b[h]);
            else
                f = b;
        return f
    };
    return function(c, d, e, f) {
        var g = b.apply(window, arguments);
        g.on = function(b, c) {
            for (var d = 0, e = g.length; d < e; d += 1)
                a.core.evt.addEvent(g[d], b, c);
            return g
        };
        g.css = function(b, c) {
            for (var d = 0, e = g.length; d < e; d += 1)
                a.core.dom.setStyle(g[d], b, c);
            return g
        };
        g.show = function() {
            for (var a = 0, b = g.length; a < b; a += 1)
                g[a].style.display = "";
            return g
        };
        g.hidd = function() {
            for (var a = 0, b = g.length; a < b; a += 1)
                g[a].style.display = "none";
            return g
        };
        g.hide = g.hidd;
        return g
    }
});
STK.register("core.dom.selectText", function(a) {
    return function(a, b) {
        var c = b.start, d = b.len || 0;
        a.focus();
        if (a.setSelectionRange)
            a.setSelectionRange(c, c + d);
        else if (a.createTextRange) {
            var e = a.createTextRange();
            e.collapse(1);
            e.moveStart("character", c);
            e.moveEnd("character", d);
            e.select()
        }
    }
});
STK.register("core.dom.setStyles", function(a) {
    return function(b, c, d) {
        if (!a.core.arr.isArray(b))
            var b = [b];
        for (var e = 0, f = b.length; e < f; e++)
            a.core.dom.setStyle(b[e], c, d);
        return b
    }
});
STK.register("core.dom.textSelectArea", function(a) {
    return function(a) {
        var b = {start: 0,len: 0};
        if (typeof a.selectionStart == "number") {
            b.start = a.selectionStart;
            b.len = a.selectionEnd - a.selectionStart
        } else if (typeof document.selection != "undefined") {
            var c = document.selection.createRange();
            if (a.tagName === "INPUT")
                var d = a.createTextRange();
            else if (a.tagName === "TEXTAREA") {
                var d = c.duplicate();
                d.moveToElementText(a)
            }
            d.setEndPoint("EndToStart", c);
            b.start = d.text.length;
            b.len = c.text.length;
            var e = 0;
            d.moveEnd("character", a.value.length - b.start);
            d.moveStart("character", b.start);
            for (var f = b.start; f < a.value.length; f += 1) {
                if (!(d.compareEndPoints("StartToStart", c) < 0))
                    break;
                d.moveStart("character", 1);
                e += 2
            }
            b.start += e;
            c = null;
            d = null
        }
        return b
    }
});
STK.register("core.dom.toggleClassName", function(a) {
    return function(b, c) {
        a.core.dom.hasClassName(b, c) ? a.core.dom.removeClassName(b, c) : a.core.dom.addClassName(b, c)
    }
});
STK.register("core.util.getUniqueKey", function(a) {
    var b = (new Date).getTime().toString(), c = 1;
    return function() {
        return b + c++
    }
});
STK.register("core.dom.uniqueID", function(a) {
    return function(b) {
        return b && (b.uniqueID || (b.uniqueID = a.core.util.getUniqueKey()))
    }
});
STK.register("core.evt.custEvent", function(a) {
    var b = "__custEventKey__", c = 1, d = {}, e = function(a, c) {
        var e = typeof a == "number" ? a : a[b];
        return e && d[e] && {obj: typeof c == "string" ? d[e][c] : d[e],key: e}
    }, f = {}, g = function(a, b, c, d, f) {
        if (a && typeof b == "string" && c) {
            var g = e(a, b);
            if (!g || !g.obj)
                throw "custEvent (" + b + ") is undefined !";
            g.obj.push({fn: c,data: d,once: f});
            return g.key
        }
    }, h = function(b, c, d, f) {
        var g = !0, h = function() {
            g = !1
        };
        if (b && typeof c == "string") {
            var i = e(b, c), j;
            if (i && (j = i.obj)) {
                d = typeof d != "undefined" && [].concat(d) || [];
                for (var k = j.length - 1; k > -1 && j[k]; k--) {
                    var l = j[k].fn, m = j[k].once;
                    if (l && l.apply)
                        try {
                            l.apply(b, [{obj: b,type: c,data: j[k].data,preventDefault: h}].concat(d));
                            m && j.splice(k, 1)
                        } catch (n) {
                            a.log("[error][custEvent]" + n.message, n, n.stack)
                        }
                }
                g && a.core.func.getType(f) === "function" && f();
                return i.key
            }
        }
    }, i = {define: function(a, e) {
            if (a && e) {
                var f = typeof a == "number" ? a : a[b] || (a[b] = c++), g = d[f] || (d[f] = {});
                e = [].concat(e);
                for (var h = 0; h < e.length; h++)
                    g[e[h]] || (g[e[h]] = []);
                return f
            }
        },undefine: function(a, c) {
            if (a) {
                var e = typeof a == "number" ? a : a[b];
                if (e && d[e])
                    if (c) {
                        c = [].concat(c);
                        for (var f = 0; f < c.length; f++)
                            c[f] in d[e] && delete d[e][c[f]]
                    } else
                        delete d[e]
            }
        },add: function(a, b, c, d) {
            return g(a, b, c, d, !1)
        },once: function(a, b, c, d) {
            return g(a, b, c, d, !0)
        },remove: function(b, c, d) {
            if (b) {
                var f = e(b, c), g, h;
                if (f && (g = f.obj)) {
                    if (a.core.arr.isArray(g))
                        if (d) {
                            var i = 0;
                            while (g[i]) {
                                if (g[i].fn === d)
                                    break;
                                i++
                            }
                            g.splice(i, 1)
                        } else
                            g.splice(0, g.length);
                    else
                        for (var i in g)
                            g[i] = [];
                    return f.key
                }
            }
        },fire: function(a, b, c, d) {
            return h(a, b, c, d)
        },hook: function(a, e, g) {
            if (!(!a || !e || !g)) {
                var j = [], k = a[b], l = k && d[k], m, n = e[b] || (e[b] = c++), o;
                if (l) {
                    o = f[k + "_" + n] || (f[k + "_" + n] = {});
                    var p = function(a) {
                        var b = !0;
                        h(e, o[a.type].type, Array.prototype.slice.apply(arguments, [1, arguments.length]), function() {
                            b = !1
                        });
                        b && a.preventDefault()
                    };
                    for (var q in g) {
                        var r = g[q];
                        if (!o[q])
                            if (m = l[q]) {
                                m.push({fn: p,data: undefined});
                                o[q] = {fn: p,type: r};
                                j.push(r)
                            }
                    }
                    i.define(e, j)
                }
            }
        },unhook: function(a, c, d) {
            if (!(!a || !c || !d)) {
                var e = a[b], g = c[b], h = f[e + "_" + g];
                if (h)
                    for (var j in d) {
                        var k = d[j];
                        h[j] && i.remove(a, j, h[j].fn)
                    }
            }
        },destroy: function() {
            d = {};
            c = 1;
            f = {}
        }};
    return i
});
STK.register("core.json.queryToJson", function(a) {
    return function(b, c) {
        var d = a.core.str.trim(b).split("&"), e = {}, f = function(a) {
            return c ? decodeURIComponent(a) : a
        };
        for (var g = 0, h = d.length; g < h; g++)
            if (d[g]) {
                var i = d[g].split("="), j = i[0], k = i[1];
                if (i.length < 2) {
                    k = j;
                    j = "$nullName"
                }
                if (!e[j])
                    e[j] = f(k);
                else {
                    a.core.arr.isArray(e[j]) != !0 && (e[j] = [e[j]]);
                    e[j].push(f(k))
                }
            }
        return e
    }
});
STK.register("core.evt.getEvent", function(a) {
    return function() {
        return document.addEventListener ? function() {
            var a = arguments.callee, b;
            do {
                b = a.arguments[0];
                if (b && (b.constructor == Event || b.constructor == MouseEvent || b.constructor == KeyboardEvent))
                    return b
            } while (a = a.caller);
            return b
        } : function(a, b, c) {
            return window.event
        }
    }()
});
STK.register("core.evt.fixEvent", function(a) {
    var b = "clientX clientY pageX pageY screenX screenY".split(" ");
    return function(b) {
        b = b || a.core.evt.getEvent();
        b.target || (b.target = b.srcElement || document);
        if (b.pageX == null && b.clientX != null) {
            var c = document.documentElement, d = document.body;
            b.pageX = b.clientX + (c.scrollLeft || d && d.scrollLeft || 0) - (c.clientLeft || d && d.clientLeft || 0);
            b.pageY = b.clientY + (c.scrollTop || d && d.scrollTop || 0) - (c.clientTop || d && d.clientTop || 0)
        }
        !b.which && b.button && (b.button & 1 ? b.which = 1 : b.button & 4 ? b.which = 2 : b.button & 2 && (b.which = 3));
        b.relatedTarget === undefined && (b.relatedTarget = b.fromElement || b.toElement);
        if (b.layerX == null && b.offsetX != null) {
            b.layerX = b.offsetX;
            b.layerY = b.offsetY
        }
        return b
    }
});
STK.register("core.obj.isEmpty", function(a) {
    return function(a, b) {
        for (var c in a)
            if (b || a.hasOwnProperty(c))
                return !1;
        return !0
    }
});
STK.register("core.evt.delegatedEvent", function(a) {
    var b = function(b, c) {
        for (var d = 0, e = b.length; d < e; d += 1)
            if (a.core.dom.contains(b[d], c))
                return !0;
        return !1
    };
    return function(c, d) {
        if (!a.core.dom.isNode(c))
            throw "core.evt.delegatedEvent need an Element as first Parameter";
        d || (d = []);
        a.core.arr.isArray(d) && (d = [d]);
        var e = {}, f = function(b) {
            var c = a.core.evt.fixEvent(b), d = c.target, e = b.type;
            g(d, e, c)
        }, g = function(f, g, h) {
            var i = null, j = function() {
                var b, d, e;
                b = f.getAttribute("action-target");
                if (b) {
                    d = a.core.dom.sizzle(b, c);
                    d.length && (e = h.target = d[0])
                }
                j = a.core.func.empty;
                return e
            }, k = function() {
                var b = j() || f;
                return e[g] && e[g][i] ? e[g][i]({evt: h,el: b,box: c,data: a.core.json.queryToJson(b.getAttribute("action-data") || "")}) : !0
            };
            if (b(d, f))
                return !1;
            if (!a.core.dom.contains(c, f))
                return !1;
            while (f && f !== c) {
                if (f.nodeType === 1) {
                    i = f.getAttribute("action-type");
                    if (i && k() === !1)
                        break
                }
                f = f.parentNode
            }
        }, h = {};
        h.add = function(b, d, g) {
            if (!e[d]) {
                e[d] = {};
                a.core.evt.addEvent(c, d, f)
            }
            var h = e[d];
            h[b] = g
        };
        h.remove = function(b, d) {
            if (e[d]) {
                delete e[d][b];
                if (a.core.obj.isEmpty(e[d])) {
                    delete e[d];
                    a.core.evt.removeEvent(c, d, f)
                }
            }
        };
        h.pushExcept = function(a) {
            d.push(a)
        };
        h.removeExcept = function(a) {
            if (!a)
                d = [];
            else
                for (var b = 0, c = d.length; b < c; b += 1)
                    d[b] === a && d.splice(b, 1)
        };
        h.clearExcept = function(a) {
            d = []
        };
        h.fireAction = function(b, d, f, g) {
            var h = "";
            g && g.actionData && (h = g.actionData);
            e[d] && e[d][b] && e[d][b]({evt: f,el: null,box: c,data: a.core.json.queryToJson(h),fireFrom: "fireAction"})
        };
        h.fireInject = function(b, d, f) {
            var g = b.getAttribute("action-type"), h = b.getAttribute("action-data");
            g && e[d] && e[d][g] && e[d][g]({evt: f,el: b,box: c,data: a.core.json.queryToJson(h || ""),fireFrom: "fireInject"})
        };
        h.fireDom = function(a, b, c) {
            g(a, b, c || {})
        };
        h.destroy = function() {
            for (var b in e) {
                for (var d in e[b])
                    delete e[b][d];
                delete e[b];
                a.core.evt.removeEvent(c, b, f)
            }
        };
        return h
    }
});
STK.register("core.evt.getActiveElement", function(a) {
    return function() {
        try {
            var b = a.core.evt.getEvent();
            return document.activeElement ? document.activeElement : b.explicitOriginalTarget
        } catch (c) {
            return document.body
        }
    }
});
STK.register("core.evt.hasEvent", function(a) {
    var b = {};
    return function(c, d) {
        if (typeof d != "string")
            throw new Error("[STK.core.evt.hasEvent] tagName is not a String!");
        d = d.toLowerCase();
        c = "on" + c;
        if (b[d] && b[d][c] !== undefined)
            return b[d][c];
        var e = a.C(d), f = c in e;
        if (!f) {
            e.setAttribute(c, "return;");
            f = typeof e[c] == "function"
        }
        b[d] || (b[d] = {});
        b[d][c] = f;
        e = null;
        return f
    }
});
STK.register("core.evt.hitTest", function(a) {
    function b(b) {
        var c = STK.E(b), d = a.core.dom.position(c), e = {left: d.l,top: d.t,right: d.l + c.offsetWidth,bottom: d.t + c.offsetHeight};
        return e
    }
    return function(c, d) {
        var e = b(c);
        if (d == null)
            d = a.core.evt.getEvent();
        else {
            if (d.nodeType == 1) {
                var f = b(d);
                return e.right > f.left && e.left < f.right && e.bottom > f.top && e.top < f.bottom ? !0 : !1
            }
            if (d.clientX == null)
                throw "core.evt.hitTest: [" + d + ":oEvent] is not a valid value"
        }
        var g = a.core.util.scrollPos(), h = d.clientX + g.left, i = d.clientY + g.top;
        return h >= e.left && h <= e.right && i >= e.top && i <= e.bottom
    }
});
STK.register("core.evt.stopEvent", function(a) {
    return function(b) {
        b = b || a.core.evt.getEvent();
        if (b.preventDefault) {
            b.preventDefault();
            b.stopPropagation()
        } else {
            b.cancelBubble = !0;
            b.returnValue = !1
        }
        return !1
    }
});
STK.register("core.evt.preventDefault", function(a) {
    return function(b) {
        b = b || a.core.evt.getEvent();
        b.preventDefault ? b.preventDefault() : b.returnValue = !1
    }
});
STK.register("core.evt.hotKey", function(a) {
    var b = a.core.dom.uniqueID, c = {reg1: /^keypress|keydown|keyup$/,keyMap: {27: "esc",9: "tab",32: "space",10: "enter",13: "enter",8: "backspace",145: "scrollclock",20: "capslock",144: "numlock",19: "pause",45: "insert",36: "home",46: "delete",35: "end",33: "pageup",34: "pagedown",37: "left",38: "up",39: "right",40: "down",112: "f1",113: "f2",114: "f3",115: "f4",116: "f5",117: "f6",118: "f7",119: "f8",120: "f9",121: "f10",122: "f11",123: "f12",191: "/",17: "ctrl",16: "shift",109: "-",107: "=",219: "[",221: "]",220: "\\",222: "'",187: "=",188: ",",189: "-",190: ".",191: "/",96: "0",97: "1",98: "2",99: "3",100: "4",101: "5",102: "6",103: "7",104: "8",105: "9",106: "*",110: ".",111: "/"},keyEvents: {}};
    c.preventDefault = function() {
        this.returnValue = !1
    };
    c.handler = function(a) {
        a = a || window.event;
        a.target || (a.target = a.srcElement || document);
        !a.which && (a.charCode || a.charCode === 0 ? a.charCode : a.keyCode) && (a.which = a.charCode || a.keyCode);
        a.preventDefault || (a.preventDefault = c.preventDefault);
        var d = b(this), e, f;
        if (d && (e = c.keyEvents[d]) && (f = e[a.type])) {
            var g;
            switch (a.type) {
                case "keypress":
                    if (a.ctrlKey || a.altKey)
                        return;
                    a.which == 13 && (g = c.keyMap[13]);
                    a.which == 32 && (g = c.keyMap[32]);
                    a.which >= 33 && a.which <= 126 && (g = String.fromCharCode(a.which));
                    break;
                case "keyup":
                case "keydown":
                    c.keyMap[a.which] && (g = c.keyMap[a.which]);
                    g || (a.which >= 48 && a.which <= 57 ? g = String.fromCharCode(a.which) : a.which >= 65 && a.which <= 90 && (g = String.fromCharCode(a.which + 32)));
                    if (g && a.type == "keydown") {
                        e.linkedKey += e.linkedKey ? ">" + g : g;
                        a.altKey && (g = "alt+" + g);
                        a.shiftKey && (g = "shift+" + g);
                        a.ctrlKey && (g = "ctrl+" + g)
                    }
            }
            var h = /^select|textarea|input$/.test(a.target.nodeName.toLowerCase());
            if (g) {
                var i = [], j = !1;
                if (e.linkedKey && e.linkKeyStr)
                    if (e.linkKeyStr.indexOf(" " + e.linkedKey) != -1) {
                        if (e.linkKeyStr.indexOf(" " + e.linkedKey + " ") != -1) {
                            i = i.concat(f[e.linkedKey]);
                            e.linkedKey = ""
                        }
                        j = !0
                    } else
                        e.linkedKey = "";
                j || (i = i.concat(f[g]));
                for (var k = 0; k < i.length; k++)
                    i[k] && (!i[k].disableInInput || !h) && i[k].fn.apply(this, [a, i[k].key])
            }
        }
    };
    var d = function(b, d, e, f) {
        var g = {};
        if (!a.core.dom.isNode(b) || a.core.func.getType(e) !== "function")
            return g;
        if (typeof d != "string" || !(d = d.replace(/\s*/g, "")))
            return g;
        f || (f = {});
        f.disableInInput || (f.disableInInput = !1);
        f.type || (f.type = "keypress");
        f.type = f.type.replace(/\s*/g, "");
        if (!c.reg1.test(f.type) || f.disableInInput && /^select|textarea|input$/.test(b.nodeName.toLowerCase()))
            return g;
        if (d.length > 1 || f.type != "keypress")
            d = d.toLowerCase();
        if (!/(^(\+|>)$)|(^([^\+>]+)$)/.test(d)) {
            var h = "";
            if (/((ctrl)|(shift)|(alt))\+(\+|([^\+]+))$/.test(d)) {
                d.indexOf("ctrl+") != -1 && (h += "ctr+");
                d.indexOf("shift+") != -1 && (h += "shift+");
                d.indexOf("alt+") != -1 && (h += "alt+");
                h += d.match(/\+(([^\+]+)|(\+))$/)[1]
            } else if (!/(^>)|(>$)|>>/.test(d) && d.length > 2)
                g.linkFlag = !0;
            else
                return g;
            f.type = "keydown"
        }
        g.keys = d;
        g.fn = e;
        g.opt = f;
        return g
    }, e = {add: function(f, g, h, i) {
            if (a.core.arr.isArray(g))
                for (var j = 0; j < g.length; j++)
                    e.add(f, g[j], h, i);
            else {
                var k = d(f, g, h, i);
                if (!k.keys)
                    return;
                g = k.keys;
                h = k.fn;
                i = k.opt;
                var l = k.linkFlag, m = b(f);
                c.keyEvents[m] || (c.keyEvents[m] = {linkKeyStr: "",linkedKey: ""});
                c.keyEvents[m].handler || (c.keyEvents[m].handler = function() {
                    c.handler.apply(f, arguments)
                });
                l && c.keyEvents[m].linkKeyStr.indexOf(" " + g + " ") == -1 && (c.keyEvents[m].linkKeyStr += " " + g + " ");
                var n = i.type;
                if (!c.keyEvents[m][n]) {
                    c.keyEvents[m][n] = {};
                    a.core.evt.addEvent(f, n, c.keyEvents[m].handler)
                }
                c.keyEvents[m][n][g] || (c.keyEvents[m][n][g] = []);
                c.keyEvents[m][n][g].push({fn: h,disableInInput: i.disableInInput,key: g})
            }
        },remove: function(f, g, h, i) {
            if (a.core.arr.isArray(g))
                for (var j = 0; j < g.length; j++)
                    e.remove(f, g[j], h, i);
            else {
                var k = d(f, g, h, i);
                if (!k.keys)
                    return;
                g = k.keys;
                h = k.fn;
                i = k.opt;
                var l = k.linkFlag, m = b(f), n, o, p, q = i.type;
                if (m && (n = c.keyEvents[m]) && (o = n[q]) && n.handler && (p = o[g])) {
                    for (var j = 0; j < p.length; )
                        p[j].fn === h ? p.splice(j, 1) : j++;
                    p.length < 1 && delete o[g];
                    var r = !1;
                    for (var s in o) {
                        r = !0;
                        break
                    }
                    if (!r) {
                        a.core.evt.removeEvent(f, q, n.handler);
                        delete n[q]
                    }
                    l && n.linkKeyStr && (n.linkKeyStr = n.linkKeyStr.replace(" " + g + " ", ""))
                }
            }
        }};
    return e
});
STK.register("core.evt.eventName", function(a) {
    var b = {WebkitTransition: "webkitTransitionEnd",MozTransition: "transitionend",OTransition: "oTransitionEnd",msTransition: "MSTransitionEnd",transition: "transitionend"};
    return function(c) {
        if (c === "mousewheel")
            return "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";
        if (c === "transitionend") {
            var d = a.C("div");
            for (var e in b)
                if (e in d.style)
                    return b[e]
        }
        return c
    }
});
STK.register("core.func.bind", function(a) {
    return function(b, c, d) {
        d = a.core.arr.isArray(d) ? d : [d];
        return function() {
            return c.apply(b, d)
        }
    }
});
STK.register("core.func.memorize", function(a) {
    return function(a, b) {
        if (typeof a != "function")
            throw "core.func.memorize need a function as first parameter";
        b = b || {};
        var c = {};
        b.timeout && setInterval(function() {
            c = {}
        }, b.timeout);
        return function() {
            var d = Array.prototype.join.call(arguments, "_");
            d in c || (c[d] = a.apply(b.context || {}, arguments));
            return c[d]
        }
    }
});
STK.register("core.func.methodBefore", function(a) {
    return function() {
        var b = !1, c = [], d = {};
        d.add = function(d, e) {
            var f = a.core.obj.parseParam({args: [],pointer: window,top: !1}, e);
            f.top == !0 ? c.unshift([d, f.args, f.pointer]) : c.push([d, f.args, f.pointer]);
            return !b
        };
        d.start = function() {
            var a, d, e, f, g;
            if (b != !0) {
                b = !0;
                for (a = 0, d = c.length; a < d; a++) {
                    e = c[a][0];
                    f = c[a][1];
                    g = c[a][2];
                    e.apply(g, f)
                }
            }
        };
        d.reset = function() {
            c = [];
            b = !1
        };
        d.getList = function() {
            return c
        };
        return d
    }
});
STK.register("core.func.timedChunk", function(a) {
    var b = {process: function(a) {
            typeof a == "function" && a()
        },context: {},callback: null,delay: 25,execTime: 50};
    return function(c, d) {
        if (!a.core.arr.isArray(c))
            throw "core.func.timedChunk need an array as first parameter";
        var e = c.concat(), f = a.core.obj.parseParam(b, d), g = null, h = function() {
            var a = +(new Date);
            do
                f.process.call(f.context, e.shift());
            while (e.length > 0 && +(new Date) - a < f.execTime);
            e.length <= 0 ? f.callback && f.callback(c) : setTimeout(arguments.callee, f.delay)
        };
        g = setTimeout(h, f.delay)
    }
});
STK.register("core.io.getXHR", function(a) {
    return function() {
        var a = !1;
        try {
            a = new XMLHttpRequest
        } catch (b) {
            try {
                a = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (c) {
                try {
                    a = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (d) {
                    a = !1
                }
            }
        }
        return a
    }
});
STK.register("core.str.parseURL", function(a) {
    return function(a) {
        var b = /^(?:([A-Za-z]+):(\/{0,3}))?([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/, c = ["url", "scheme", "slash", "host", "port", "path", "query", "hash"], d = b.exec(a), e = {};
        for (var f = 0, g = c.length; f < g; f += 1)
            e[c[f]] = d[f] || "";
        return e
    }
});
STK.register("core.json.jsonToQuery", function(a) {
    var b = function(b, c) {
        b = b == null ? "" : b;
        b = a.core.str.trim(b.toString());
        return c ? encodeURIComponent(b) : b
    };
    return function(a, c) {
        var d = [];
        if (typeof a == "object")
            for (var e in a) {
                if (e === "$nullName") {
                    d = d.concat(a[e]);
                    continue
                }
                if (a[e] instanceof Array)
                    for (var f = 0, g = a[e].length; f < g; f++)
                        d.push(e + "=" + b(a[e][f], c));
                else
                    typeof a[e] != "function" && d.push(e + "=" + b(a[e], c))
            }
        return d.length ? d.join("&") : ""
    }
});
STK.register("core.util.URL", function(a) {
    return function(b, c) {
        var d = a.core.obj.parseParam({isEncodeQuery: !1,isEncodeHash: !1}, c || {}), e = {}, f = a.core.str.parseURL(b), g = a.core.json.queryToJson(f.query), h = a.core.json.queryToJson(f.hash);
        e.setParam = function(a, b) {
            g[a] = b;
            return this
        };
        e.getParam = function(a) {
            return g[a]
        };
        e.setParams = function(a) {
            for (var b in a)
                e.setParam(b, a[b]);
            return this
        };
        e.setHash = function(a, b) {
            h[a] = b;
            return this
        };
        e.getHash = function(a) {
            return h[a]
        };
        e.valueOf = e.toString = function() {
            var b = [], c = a.core.json.jsonToQuery(g, d.isEncodeQuery), e = a.core.json.jsonToQuery(h, d.isEncodeQuery);
            if (f.scheme != "") {
                b.push(f.scheme + ":");
                b.push(f.slash)
            }
            if (f.host != "") {
                b.push(f.host);
                if (f.port != "") {
                    b.push(":");
                    b.push(f.port)
                }
            }
            b.push("/");
            b.push(f.path);
            c != "" && b.push("?" + c);
            e != "" && b.push("#" + e);
            return b.join("")
        };
        return e
    }
});
STK.register("core.json.strToJson", function(a) {
    var b, c, d = {'"': '"',"\\": "\\","/": "/",b: "\b",f: "\f",n: "\n",r: "\r",t: "\t"}, e, f = function(a) {
        throw {name: "SyntaxError",message: a,at: b,text: e}
    }, g = function(a) {
        a && a !== c && f("Expected '" + a + "' instead of '" + c + "'");
        c = e.charAt(b);
        b += 1;
        return c
    }, h = function() {
        var a, b = "";
        if (c === "-") {
            b = "-";
            g("-")
        }
        while (c >= "0" && c <= "9") {
            b += c;
            g()
        }
        if (c === ".") {
            b += ".";
            while (g() && c >= "0" && c <= "9")
                b += c
        }
        if (c === "e" || c === "E") {
            b += c;
            g();
            if (c === "-" || c === "+") {
                b += c;
                g()
            }
            while (c >= "0" && c <= "9") {
                b += c;
                g()
            }
        }
        a = +b;
        if (isNaN(a))
            f("Bad number");
        else
            return a
    }, i = function() {
        var a, b, e = "", h;
        if (c === '"')
            while (g()) {
                if (c === '"') {
                    g();
                    return e
                }
                if (c === "\\") {
                    g();
                    if (c === "u") {
                        h = 0;
                        for (b = 0; b < 4; b += 1) {
                            a = parseInt(g(), 16);
                            if (!isFinite(a))
                                break;
                            h = h * 16 + a
                        }
                        e += String.fromCharCode(h)
                    } else if (typeof d[c] == "string")
                        e += d[c];
                    else
                        break
                } else
                    e += c
            }
        f("Bad string")
    }, j = function() {
        while (c && c <= " ")
            g()
    }, k = function() {
        switch (c) {
            case "t":
                g("t");
                g("r");
                g("u");
                g("e");
                return !0;
            case "f":
                g("f");
                g("a");
                g("l");
                g("s");
                g("e");
                return !1;
            case "n":
                g("n");
                g("u");
                g("l");
                g("l");
                return null
        }
        f("Unexpected '" + c + "'")
    }, l, m = function() {
        var a = [];
        if (c === "[") {
            g("[");
            j();
            if (c === "]") {
                g("]");
                return a
            }
            while (c) {
                a.push(l());
                j();
                if (c === "]") {
                    g("]");
                    return a
                }
                g(",");
                j()
            }
        }
        f("Bad array")
    }, n = function() {
        var a, b = {};
        if (c === "{") {
            g("{");
            j();
            if (c === "}") {
                g("}");
                return b
            }
            while (c) {
                a = i();
                j();
                g(":");
                Object.hasOwnProperty.call(b, a) && f('Duplicate key "' + a + '"');
                b[a] = l();
                j();
                if (c === "}") {
                    g("}");
                    return b
                }
                g(",");
                j()
            }
        }
        f("Bad object")
    };
    l = function() {
        j();
        switch (c) {
            case "{":
                return n();
            case "[":
                return m();
            case '"':
                return i();
            case "-":
                return h();
            default:
                return c >= "0" && c <= "9" ? h() : k()
        }
    };
    return function(a, d) {
        if (window.JSON && window.JSON.parse)
            return window.JSON.parse(a, d);
        var g;
        e = a;
        b = 0;
        c = " ";
        g = l();
        j();
        c && f("Syntax error");
        return typeof d == "function" ? function h(a, b) {
            var c, e, f = a[b];
            if (f && typeof f == "object")
                for (c in f)
                    if (Object.hasOwnProperty.call(f, c)) {
                        e = h(f, c);
                        e !== undefined ? f[c] = e : delete f[c]
                    }
            return d.call(a, b, f)
        }({"": g}, "") : g
    }
});
STK.register("core.io.ajax", function($) {
    return function(oOpts) {
        var opts = $.core.obj.parseParam({url: "",charset: "UTF-8",timeout: 3e4,args: {},onComplete: null,onTimeout: $.core.func.empty,uniqueID: null,onFail: $.core.func.empty,method: "get",asynchronous: !0,header: {},isEncode: !1,responseType: "json"}, oOpts);
        if (opts.url == "")
            throw "ajax need url in parameters object";
        var tm, trans = $.core.io.getXHR(), cback = function() {
            if (trans.readyState == 4) {
                clearTimeout(tm);
                var data = "";
                if (opts.responseType === "xml")
                    data = trans.responseXML;
                else if (opts.responseType === "text")
                    data = trans.responseText;
                else
                    try {
                        trans.responseText && typeof trans.responseText == "string" ? data = eval("(" + trans.responseText + ")") : data = {}
                    } catch (exp) {
                        data = opts.url + "return error : data error"
                    }
                trans.status == 200 ? opts.onComplete != null && opts.onComplete(data) : trans.status != 0 && opts.onFail != null && opts.onFail(data, trans)
            } else
                opts.onTraning != null && opts.onTraning(trans)
        };
        trans.onreadystatechange = cback;
        opts.header["Content-Type"] || (opts.header["Content-Type"] = "application/x-www-form-urlencoded");
        opts.header["X-Requested-With"] || (opts.header["X-Requested-With"] = "XMLHttpRequest");
        if (opts.method.toLocaleLowerCase() == "get") {
            var url = $.core.util.URL(opts.url, {isEncodeQuery: opts.isEncode});
            url.setParams(opts.args);
            url.setParam("__rnd", (new Date).valueOf());
            trans.open(opts.method, url.toString(), opts.asynchronous);
            try {
                for (var k in opts.header)
                    trans.setRequestHeader(k, opts.header[k])
            } catch (exp) {
            }
            trans.send("")
        } else {
            trans.open(opts.method, opts.url, opts.asynchronous);
            try {
                for (var k in opts.header)
                    trans.setRequestHeader(k, opts.header[k])
            } catch (exp) {
            }
            trans.send($.core.json.jsonToQuery(opts.args, opts.isEncode))
        }
        opts.timeout && (tm = setTimeout(function() {
            try {
                trans.abort();
                opts.onTimeout({}, trans);
                opts.onFail({}, trans)
            } catch (a) {
            }
        }, opts.timeout));
        return trans
    }
});
STK.register("core.io.scriptLoader", function(a) {
    var b = {}, c = {url: "",charset: "UTF-8",timeout: 3e4,args: {},onComplete: a.core.func.empty,onTimeout: a.core.func.empty,isEncode: !1,uniqueID: null};
    return function(d) {
        var e, f, g = a.core.obj.parseParam(c, d);
        if (g.url == "")
            throw "scriptLoader: url is null";
        var h = g.uniqueID || a.core.util.getUniqueKey();
        e = b[h];
        if (e != null && a.IE != !0) {
            a.core.dom.removeNode(e);
            e = null
        }
        e == null && (e = b[h] = a.C("script"));
        e.charset = g.charset;
        e.id = "scriptRequest_script_" + h;
        e.type = "text/javascript";
        g.onComplete != null && (a.IE ? e.onreadystatechange = function() {
            if (e.readyState.toLowerCase() == "loaded" || e.readyState.toLowerCase() == "complete") {
                try {
                    clearTimeout(f);
                    document.getElementsByTagName("head")[0].removeChild(e);
                    e.onreadystatechange = null
                } catch (a) {
                }
                g.onComplete()
            }
        } : e.onload = function() {
            try {
                clearTimeout(f);
                a.core.dom.removeNode(e)
            } catch (b) {
            }
            g.onComplete()
        });
        e.src = a.core.util.URL(g.url, {isEncodeQuery: g.isEncode}).setParams(g.args).toString();
        document.getElementsByTagName("head")[0].appendChild(e);
        g.timeout > 0 && (f = setTimeout(function() {
            try {
                document.getElementsByTagName("head")[0].removeChild(e)
            } catch (a) {
            }
            g.onTimeout()
        }, g.timeout));
        return e
    }
});
STK.register("core.io.jsonp", function(a) {
    return function(b) {
        var c = a.core.obj.parseParam({url: "",charset: "UTF-8",timeout: 3e4,args: {},onComplete: null,onTimeout: null,responseName: null,isEncode: !1,varkey: "callback"}, b), d = -1, e = c.responseName || "STK_" + a.core.util.getUniqueKey();
        c.args[c.varkey] = e;
        var f = c.onComplete, g = c.onTimeout;
        window[e] = function(a) {
            if (d != 2 && f != null) {
                d = 1;
                f(a)
            }
        };
        c.onComplete = null;
        c.onTimeout = function() {
            if (d != 1 && g != null) {
                d = 2;
                g()
            }
        };
        return a.core.io.scriptLoader(c)
    }
});
STK.register("core.util.templet", function(a) {
    return function(a, b) {
        return a.replace(/#\{(.+?)\}/ig, function() {
            var a = arguments[1].replace(/\s/ig, ""), c = arguments[0], d = a.split("||");
            for (var e = 0, f = d.length; e < f; e += 1) {
                if (/^default:.*$/.test(d[e])) {
                    c = d[e].replace(/^default:/, "");
                    break
                }
                if (b[d[e]] !== undefined) {
                    c = b[d[e]];
                    break
                }
            }
            return c
        })
    }
});
STK.register("core.io.getIframeTrans", function(a) {
    var b = '<iframe id="#{id}" name="#{id}" height="0" width="0" frameborder="no"></iframe>';
    return function(c) {
        var d, e, f;
        e = a.core.obj.parseParam({id: "STK_iframe_" + a.core.util.getUniqueKey()}, c);
        f = {};
        d = a.C("DIV");
        d.innerHTML = a.core.util.templet(b, e);
        a.core.util.hideContainer.appendChild(d);
        f.getId = function() {
            return e.id
        };
        f.destroy = function() {
            d.innerHTML = "";
            try {
                d.getElementsByTagName("iframe")[0].src = "about:blank"
            } catch (b) {
            }
            a.core.util.hideContainer.removeChild(d);
            d = null
        };
        return f
    }
});
STK.register("core.io.require", function(a) {
    var b = "http://js.t.sinajs.cn/STK/js/", c = function(a, b) {
        var c = b.split("."), d = a, e = null;
        while (e = c.shift()) {
            d = d[e];
            if (d === undefined)
                return !1
        }
        return !0
    }, d = [], e = function(b) {
        if (a.core.arr.indexOf(b, d) !== -1)
            return !1;
        d.push(b);
        a.core.io.scriptLoader({url: b,callback: function() {
                a.core.arr.foreach(d, function(a, c) {
                    if (a === b) {
                        d.splice(c, 1);
                        return !1
                    }
                })
            }});
        return !1
    }, f = function(d, f, g) {
        var h = null;
        for (var i = 0, j = d.length; i < j; i += 1) {
            var k = d[i];
            typeof k == "string" ? c(a, k) || e(b + k.replace(/\./ig, "/") + ".js") : c(window, k.NS) || e(k.url)
        }
        var l = function() {
            for (var b = 0, e = d.length; b < e; b += 1) {
                var i = d[b];
                if (typeof i == "string") {
                    if (!c(a, i)) {
                        h = setTimeout(l, 25);
                        return !1
                    }
                } else if (!c(window, i.NS)) {
                    h = setTimeout(l, 25);
                    return !1
                }
            }
            clearTimeout(h);
            f.apply({}, [].concat(g))
        };
        h = setTimeout(l, 25)
    };
    f.setBaseURL = function(a) {
        if (typeof a != "string")
            throw "[STK.kit.extra.require.setBaseURL] need string as frist parameter";
        b = a
    };
    return f
});
STK.register("core.io.ijax", function(a) {
    return function(b) {
        var c, d, e, f, g, h, i;
        c = a.core.obj.parseParam({url: "",form: null,args: {},uniqueID: null,timeout: 3e4,onComplete: a.core.func.empty,onTimeout: a.core.func.empty,onFail: a.core.func.empty,asynchronous: !0,isEncode: !0,abaurl: null,responseName: null,varkey: "callback",abakey: "callback"}, b);
        i = {};
        if (c.url == "")
            throw "ijax need url in parameters object";
        if (!c.form)
            throw "ijax need form in parameters object";
        d = a.core.io.getIframeTrans();
        e = c.responseName || "STK_ijax_" + a.core.util.getUniqueKey();
        h = {};
        h[c.varkey] = e;
        if (c.abaurl) {
            c.abaurl = a.core.util.URL(c.abaurl).setParams(h);
            h = {};
            h[c.abakey] = c.abaurl.toString()
        }
        c.url = a.core.util.URL(c.url, {isEncodeQuery: c.isEncode}).setParams(h).setParams(c.args);
        g = function() {
            window[e] = null;
            d.destroy();
            d = null;
            clearTimeout(f)
        };
        f = setTimeout(function() {
            try {
                c.onTimeout();
                c.onFail()
            } catch (a) {
            }finally {
                g()
            }
        }, c.timeout);
        window[e] = function(a, b) {
            try {
                c.onComplete(a, b)
            } catch (d) {
            }finally {
                g()
            }
        };
        c.form.action = c.url.toString();
        c.form.target = d.getId();
        c.form.submit();
        i.abort = g;
        return i
    }
});
STK.register("core.json.clone", function(a) {
    function b(a) {
        var c;
        if (a instanceof Array) {
            c = [];
            var d = a.length;
            while (d--)
                c[d] = b(a[d]);
            return c
        }
        if (a instanceof Object) {
            c = {};
            for (var e in a)
                c[e] = b(a[e]);
            return c
        }
        return a
    }
    return b
});
STK.register("core.json.include", function(a) {
    return function(a, b) {
        for (var c in b)
            if (typeof b[c] == "object")
                if (b[c] instanceof Array) {
                    if (!(a[c] instanceof Array))
                        return !1;
                    if (b[c].length !== a[c].length)
                        return !1;
                    for (var d = 0, e = b[c].length; d < e; d += 1)
                        if (!arguments.callee(b[c][d], a[c][d]))
                            return !1
                } else {
                    if (typeof a[c] != "object")
                        return !1;
                    if (!arguments.callee(b[c], a[c]))
                        return !1
                }
            else if (typeof b[c] == "number" || typeof b[c] == "string") {
                if (b[c] !== a[c])
                    return !1
            } else if (b[c] !== undefined && b[c] !== null) {
                if (a[c] === undefined || a[c] === null)
                    return !1;
                if (!b[c].toString || !a[c].toString)
                    throw "json1[k] or json2[k] do not have toString method";
                if (b[c].toString() !== a[c].toString())
                    return !1
            }
        return !0
    }
});
STK.register("core.json.compare", function(a) {
    return function(b, c) {
        return a.core.json.include(b, c) && a.core.json.include(c, b) ? !0 : !1
    }
});
STK.register("core.json.jsonToStr", function(a) {
    function d(a) {
        return a < 10 ? "0" + a : a
    }
    function c(a) {
        f.lastIndex = 0;
        return f.test(a) ? '"' + a.replace(f, function(a) {
            var b = i[a];
            return typeof b == "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }
    function b(a, d) {
        var e, f, i, k, l = g, m, n = d[a];
        n && typeof n == "object" && typeof n.toJSON == "function" && (n = n.toJSON(a));
        typeof j == "function" && (n = j.call(d, a, n));
        switch (typeof n) {
            case "string":
                return c(n);
            case "number":
                return isFinite(n) ? String(n) : "null";
            case "boolean":
            case "null":
                return String(n);
            case "object":
                if (!n)
                    return "null";
                g += h;
                m = [];
                if (Object.prototype.toString.apply(n) === "[object Array]") {
                    k = n.length;
                    for (e = 0; e < k; e += 1)
                        m[e] = b(e, n) || "null";
                    i = m.length === 0 ? "[]" : g ? "[\n" + g + m.join(",\n" + g) + "\n" + l + "]" : "[" + m.join(",") + "]";
                    g = l;
                    return i
                }
                if (j && typeof j == "object") {
                    k = j.length;
                    for (e = 0; e < k; e += 1) {
                        f = j[e];
                        if (typeof f == "string") {
                            i = b(f, n);
                            i && m.push(c(f) + (g ? ": " : ":") + i)
                        }
                    }
                } else
                    for (f in n)
                        if (Object.hasOwnProperty.call(n, f)) {
                            i = b(f, n);
                            i && m.push(c(f) + (g ? ": " : ":") + i)
                        }
                i = m.length === 0 ? "{}" : g ? "{\n" + g + m.join(",\n" + g) + "\n" + l + "}" : "{" + m.join(",") + "}";
                g = l;
                return i
        }
    }
    if (typeof Date.prototype.toJSON != "function") {
        Date.prototype.toJSON = function(a) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + d(this.getUTCMonth() + 1) + "-" + d(this.getUTCDate()) + "T" + d(this.getUTCHours()) + ":" + d(this.getUTCMinutes()) + ":" + d(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(a) {
            return this.valueOf()
        }
    }
    var e = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, f = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, g, h, i = {"\b": "\\b","\t": "\\t","\n": "\\n","\f": "\\f","\r": "\\r",'"': '\\"',"\\": "\\\\"}, j;
    return function(a, c, d) {
        if (window.JSON && window.JSON.stringify)
            return window.JSON.stringify(a, c, d);
        var e;
        g = "";
        h = "";
        if (typeof d == "number")
            for (e = 0; e < d; e += 1)
                h += " ";
        else
            typeof d == "string" && (h = d);
        j = c;
        if (!c || typeof c == "function" || typeof c == "object" && typeof c.length == "number")
            return b("", {"": a});
        throw new Error("JSON.stringify")
    }
});
STK.register("core.obj.beget", function(a) {
    var b = function() {
    };
    return function(a) {
        b.prototype = a;
        return new b
    }
});
STK.register("core.obj.cascade", function(a) {
    return function(a, b) {
        for (var c = 0, d = b.length; c < d; c += 1) {
            if (typeof a[b[c]] != "function")
                throw "cascade need function list as the second paramsters";
            a[b[c]] = function(b) {
                return function() {
                    b.apply(a, arguments);
                    return a
                }
            }(a[b[c]])
        }
    }
});
STK.register("core.obj.clear", function(a) {
    return function(a) {
        var b, c = {};
        for (b in a)
            a[b] != null && (c[b] = a[b]);
        return c
    }
});
STK.register("core.obj.cut", function(a) {
    return function(b, c) {
        var d = {};
        if (!a.core.arr.isArray(c))
            throw "core.obj.cut need array as second parameter";
        for (var e in b)
            a.core.arr.inArray(e, c) || (d[e] = b[e]);
        return d
    }
});
STK.register("core.obj.sup", function(a) {
    return function(a, b) {
        var c = {};
        for (var d = 0, e = b.length; d < e; d += 1) {
            if (typeof a[b[d]] != "function")
                throw "super need function list as the second paramsters";
            c[b[d]] = function(b) {
                return function() {
                    return b.apply(a, arguments)
                }
            }(a[b[d]])
        }
        return c
    }
});
STK.register("core.str.bLength", function(a) {
    return function(a) {
        if (!a)
            return 0;
        var b = a.match(/[^\x00-\xff]/g);
        return a.length + (b ? b.length : 0)
    }
});
STK.register("core.str.dbcToSbc", function(a) {
    return function(a) {
        return a.replace(/[\uff01-\uff5e]/g, function(a) {
            return String.fromCharCode(a.charCodeAt(0) - 65248)
        }).replace(/\u3000/g, " ")
    }
});
STK.register("core.str.parseHTML", function(a) {
    return function(a) {
        var b = /[^<>]+|<(\/?)([A-Za-z0-9]+)([^<>]*)>/g, c, d, e = [];
        while (c = b.exec(a)) {
            var f = [];
            for (d = 0; d < c.length; d += 1)
                f.push(c[d]);
            e.push(f)
        }
        return e
    }
});
STK.register("core.str.leftB", function(a) {
    return function(b, c) {
        var d = b.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**");
        b = b.slice(0, d.slice(0, c).replace(/\*\*/g, " ").replace(/\*/g, "").length);
        a.core.str.bLength(b) > c && c > 0 && (b = b.slice(0, b.length - 1));
        return b
    }
});
STK.register("core.str.queryString", function(a) {
    return function(b, c) {
        var d = a.core.obj.parseParam({source: window.location.href.toString(),split: "&"}, c), e = (new RegExp("(^|)" + b + "=([^\\" + d.split + "]*)(\\" + d.split + "|$)", "gi")).exec(d.source), f;
        return (f = e) ? f[2] : null
    }
});
STK.register("core.util.cookie", function(a) {
    var b = {set: function(b, c, d) {
            var e = [], f, g, h = a.core.obj.parseParam({expire: null,path: "/",domain: null,secure: null,encode: !0}, d);
            h.encode == !0 && (c = escape(c));
            e.push(b + "=" + c);
            h.path != null && e.push("path=" + h.path);
            h.domain != null && e.push("domain=" + h.domain);
            h.secure != null && e.push(h.secure);
            if (h.expire != null) {
                f = new Date;
                g = f.getTime() + h.expire * 36e5;
                f.setTime(g);
                e.push("expires=" + f.toGMTString())
            }
            document.cookie = e.join(";")
        },get: function(a) {
            a = a.replace(/([\.\[\]\$])/g, "\\$1");
            var b = new RegExp(a + "=([^;]*)?;", "i"), c = document.cookie + ";", d = c.match(b);
            return d ? d[1] || "" : ""
        },remove: function(a, c) {
            c = c || {};
            c.expire = -10;
            b.set(a, "", c)
        }};
    return b
});
STK.register("core.util.connect", function(a) {
    var b = {}, c = {}, d = 0, e = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }, f = function() {
        return ++d + "" + (new Date).getTime()
    }, g = function(b, d, f, g) {
        if (!e(c, b))
            return !1;
        var h = c[b];
        if (!e(h.callback, d))
            return !1;
        var i = h.callback[d].onSuccess, j = h.callback[d].onError, k = a.core.json.jsonToStr(g || {});
        setTimeout(function() {
            var b = a.core.json.strToJson(k);
            if (f) {
                b.type = "error";
                j(b, d)
            } else
                i(b, d)
        }, 0);
        delete h.callback[d];
        return !0
    };
    b.request = function(b) {
        var d = b.sid;
        if (!d || typeof d != "string")
            return -1;
        if (!e(c, d))
            return -1;
        var h = c[d], i = f(), j = a.core.json.jsonToStr(b.data || {});
        h.callback[i] = {onSuccess: b.onSuccess || a.core.func.empty,onError: b.onError || a.core.func.empty};
        var k = function(a) {
            g(d, i, a.error, a.data)
        };
        setTimeout(function() {
            h.handle(k, a.core.json.strToJson(j), i)
        }, 0);
        return i
    };
    b.create = function(b) {
        if (!b)
            return !1;
        var d = b.sid;
        if (!d || typeof d != "string")
            return !1;
        if (e(c, d))
            return !1;
        var f = b.handle;
        if (typeof f != "function")
            return !1;
        c[d] = {handle: f,onAbort: b.onAbort || a.core.func.empty,callback: {}};
        return !0
    };
    b.abort = function(a) {
        if (!a)
            return !1;
        for (var b in c) {
            var d = c[b];
            if (e(d.callback, a)) {
                setTimeout(function() {
                    d.onAbort(a)
                }, 0);
                delete d.callback[a];
                return !0
            }
        }
        return !1
    };
    b.destory = function(a) {
        if (!a || typeof a != "string")
            return !1;
        if (!e(c, a))
            return !1;
        for (var b in c[a].callback)
            try {
                c[a].callback[b].onError({type: "destroy"}, b)
            } catch (d) {
            }
        delete c[a];
        return !0
    };
    return b
});
STK.register("core.util.drag", function(a) {
    var b = function(a) {
        a.cancelBubble = !0;
        return !1
    }, c = function(b, c) {
        b.clientX = c.clientX;
        b.clientY = c.clientY;
        b.pageX = c.clientX + a.core.util.scrollPos().left;
        b.pageY = c.clientY + a.core.util.scrollPos().top;
        return b
    };
    return function(d, e) {
        if (!a.core.dom.isNode(d))
            throw "core.util.drag need Element as first parameter";
        var f = a.core.obj.parseParam({actRect: [],actObj: {}}, e), g = {}, h = a.core.evt.custEvent.define(f.actObj, "dragStart"), i = a.core.evt.custEvent.define(f.actObj, "dragEnd"), j = a.core.evt.custEvent.define(f.actObj, "draging"), k = function(d) {
            var e = c({}, d);
            document.body.onselectstart = function() {
                return !1
            };
            a.core.evt.addEvent(document, "mousemove", l);
            a.core.evt.addEvent(document, "mouseup", m);
            a.core.evt.addEvent(document, "click", b, !0);
            if (d.preventDefault) {
                d.preventDefault();
                d.stopPropagation()
            }
            a.core.evt.custEvent.fire(h, "dragStart", e);
            return !1
        }, l = function(b) {
            var d = c({}, b);
            b.cancelBubble = !0;
            a.core.evt.custEvent.fire(h, "draging", d)
        }, m = function(d) {
            var e = c({}, d);
            document.body.onselectstart = function() {
                return !0
            };
            a.core.evt.removeEvent(document, "mousemove", l);
            a.core.evt.removeEvent(document, "mouseup", m);
            a.core.evt.removeEvent(document, "click", b, !0);
            a.core.evt.custEvent.fire(h, "dragEnd", e)
        };
        a.core.evt.addEvent(d, "mousedown", k);
        g.destroy = function() {
            a.core.evt.removeEvent(d, "mousedown", k);
            f = null
        };
        g.getActObj = function() {
            return f.actObj
        };
        return g
    }
});
STK.register("core.util.easyTemplate", function(a) {
    var b = function(a, c) {
        if (!a)
            return "";
        if (a !== b.template) {
            b.template = a;
            b.aStatement = b.parsing(b.separate(a))
        }
        var d = b.aStatement, e = function(a) {
            a && (c = a);
            return arguments.callee
        };
        e.toString = function() {
            return (new Function(d[0], d[1]))(c)
        };
        return e
    };
    b.separate = function(a) {
        var b = /\\'/g, c = a.replace(/(<(\/?)#(.*?(?:\(.*?\))*)>)|(')|([\r\n\t])|(\$\{([^\}]*?)\})/g, function(a, c, d, e, f, g, h, i) {
            if (c)
                return "{|}" + (d ? "-" : "+") + e + "{|}";
            if (f)
                return "\\'";
            if (g)
                return "";
            if (h)
                return "'+(" + i.replace(b, "'") + ")+'"
        });
        return c
    };
    b.parsing = function(a) {
        var b, c, d, e, f, g, h, i = ["var aRet = [];"];
        h = a.split(/\{\|\}/);
        var j = /\s/;
        while (h.length) {
            d = h.shift();
            if (!d)
                continue;
            f = d.charAt(0);
            if (f !== "+" && f !== "-") {
                d = "'" + d + "'";
                i.push("aRet.push(" + d + ");");
                continue
            }
            e = d.split(j);
            switch (e[0]) {
                case "+et":
                    b = e[1];
                    c = e[2];
                    i.push('aRet.push("<!--' + b + ' start-->");');
                    break;
                case "-et":
                    i.push('aRet.push("<!--' + b + ' end-->");');
                    break;
                case "+if":
                    e.splice(0, 1);
                    i.push("if" + e.join(" ") + "{");
                    break;
                case "+elseif":
                    e.splice(0, 1);
                    i.push("}else if" + e.join(" ") + "{");
                    break;
                case "-if":
                    i.push("}");
                    break;
                case "+else":
                    i.push("}else{");
                    break;
                case "+list":
                    i.push("if(" + e[1] + ".constructor === Array){with({i:0,l:" + e[1] + ".length," + e[3] + "_index:0," + e[3] + ":null}){for(i=l;i--;){" + e[3] + "_index=(l-i-1);" + e[3] + "=" + e[1] + "[" + e[3] + "_index];");
                    break;
                case "-list":
                    i.push("}}}");
                    break;
                default:
            }
        }
        i.push('return aRet.join("");');
        return [c, i.join("")]
    };
    return b
});
STK.register("core.util.htmlParser", function(a) {
    var b = function(a) {
        var b = {}, c = a.split(",");
        for (var d = 0; d < c.length; d++)
            b[c[d]] = !0;
        return b
    }, c = /^<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/, d = /^<\/(\w+)[^>]*>/, e = /([\w|\-]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g, f = b("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed"), g = b("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul"), h = b("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), i = b("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), j = b("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), k = b("script,style"), l = function(a, b) {
        var l, m, n, o = [], p = a, q = function(c, d, k, l) {
            if (g[d])
                while (o.last() && h[o.last()])
                    r("", o.last());
            i[d] && o.last() == d && r("", d);
            l = f[d] || !!l;
            l || o.push(d);
            var m = [];
            if (c === "textarea") {
                var n = a.match(/^(.*)<\/textarea[^>]*>/);
                m.push({name: "text",value: a.slice(0, n[0].length)});
                a = a.substring(n[0].length)
            }
            if (b.start && typeof b.start == "function") {
                k.replace(e, function(a, b) {
                    var c = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : j[b] ? b : "";
                    m.push({name: b,value: c,escaped: c.replace(/(^|[^\\])"/g, '$1\\"')})
                });
                b.start(d, m, l)
            }
        }, r = function(a, c) {
            if (!c)
                var d = 0;
            else
                for (var d = o.length - 1; d >= 0; d--)
                    if (o[d] == c)
                        break;
            if (d >= 0) {
                for (var e = o.length - 1; e >= d; e--)
                    b.end && typeof b.end == "function" && b.end(o[e]);
                o.length = d
            }
        };
        o.last = function() {
            return this[this.length - 1]
        };
        while (a) {
            m = !0;
            if (!o.last() || !k[o.last()]) {
                if (a.indexOf("<!--") === 0) {
                    l = a.indexOf("-->");
                    if (l >= 0) {
                        b.comment && typeof b.comment == "function" && b.comment(a.substring(4, l));
                        a = a.substring(l + 3);
                        m = !1
                    }
                } else if (a.indexOf("</") === 0) {
                    n = a.match(d);
                    if (n) {
                        a = a.substring(n[0].length);
                        n[0].replace(d, r);
                        m = !1
                    }
                } else if (a.indexOf("<") === 0) {
                    n = a.match(c);
                    if (n) {
                        a = a.substring(n[0].length);
                        n[0].replace(c, q);
                        m = !1
                    }
                }
                if (m) {
                    l = a.indexOf("<");
                    var s = l < 0 ? a : a.substring(0, l);
                    a = l < 0 ? "" : a.substring(l);
                    b.chars && typeof b.chars == "function" && b.chars(s)
                }
            } else {
                a = a.replace(new RegExp("(.*)</" + o.last() + "[^>]*>"), function(a, c) {
                    c = c.replace(/<!--(.*?)-->/g, "$1").replace(/<!\[CDATA\[(.*?)]]>/g, "$1");
                    b.chars && typeof b.chars == "function" && b.chars(c);
                    return ""
                });
                r("", o.last())
            }
            if (a == p)
                throw "Parse Error: " + a;
            p = a
        }
        r()
    };
    return l
});
STK.register("core.util.nameValue", function(a) {
    return function(b) {
        var c = b.getAttribute("name"), d = b.getAttribute("type"), e = b.tagName, f = {name: c,value: ""}, g = function(b) {
            b === !1 ? f = !1 : f.value ? f.value = [a.core.str.trim(b || "")].concat(f.value) : f.value = a.core.str.trim(b || "")
        };
        if (!!b.disabled || !c)
            return !1;
        switch (e) {
            case "INPUT":
                d == "radio" || d == "checkbox" ? b.checked ? g(b.value) : g(!1) : d == "reset" || d == "submit" || d == "image" ? g(!1) : g(b.value);
                break;
            case "SELECT":
                if (b.multiple) {
                    var h = b.options;
                    for (var i = 0, j = h.length; i < j; i++)
                        h[i].selected && g(h[i].value)
                } else
                    g(b.value);
                break;
            case "TEXTAREA":
                g(b.value || b.getAttribute("value") || !1);
                break;
            case "BUTTON":
            default:
                g(b.value || b.getAttribute("value") || b.innerHTML || !1)
        }
        return f
    }
});
STK.register("core.util.htmlToJson", function(a) {
    return function(b, c, d) {
        var e = {};
        c = c || ["INPUT", "TEXTAREA", "BUTTON", "SELECT"];
        if (!b || !c)
            return !1;
        var f = a.core.util.nameValue;
        for (var g = 0, h = c.length; g < h; g++) {
            var i = b.getElementsByTagName(c[g]);
            for (var j = 0, k = i.length; j < k; j++) {
                var l = f(i[j]);
                if (!l || d && l.value === "")
                    continue;
                e[l.name] ? e[l.name] instanceof Array ? e[l.name] = e[l.name].concat(l.value) : e[l.name] = [e[l.name]].concat(l.value) : e[l.name] = l.value
            }
        }
        return e
    }
});
STK.register("core.util.jobsM", function(a) {
    return function() {
        var b = [], c = {}, d = !1, e = {}, f = function(b) {
            var d = b.name, e = b.func, f = +(new Date);
            if (!c[d])
                try {
                    e(a);
                    e[d] = !0
                } catch (g) {
                    a.log("[error][jobs]" + d)
                }
        }, g = function(b) {
            if (b.length) {
                a.core.func.timedChunk(b, {process: f,callback: arguments.callee});
                b.splice(0, b.length)
            } else
                d = !1
        };
        e.register = function(a, c) {
            b.push({name: a,func: c})
        };
        e.start = function() {
            if (d)
                return !0;
            d = !0;
            g(b)
        };
        e.load = function() {
        };
        a.core.dom.ready(e.start);
        return e
    }()
});
STK.register("core.util.language", function(a) {
    return function(a, b) {
        var c = [];
        for (var d = 2, e = arguments.length; d < e; d += 1)
            c.push(arguments[d]);
        return a.replace(/#L\{((.*?)(?:[^\\]))\}/ig, function() {
            var a = arguments[1], d;
            b && b[a] !== undefined ? d = b[a] : d = a;
            c.length && (d = d.replace(/(\%s)/ig, function() {
                var a = c.shift();
                return a !== undefined ? a : arguments[0]
            }));
            return d
        })
    }
});
STK.register("core.util.listener", function(a) {
    return function() {
        var a = {}, b = [], c, d = function() {
            if (b.length != 0) {
                clearTimeout(c);
                var a = b.splice(0, 1)[0];
                try {
                    a.func.apply(a.func, [].concat(a.data))
                } catch (e) {
                }
                c = setTimeout(d, 25)
            }
        };
        return {register: function(b, c, d) {
                a[b] = a[b] || {};
                a[b][c] = a[b][c] || [];
                a[b][c].push(d)
            },fire: function(c, e, f) {
                var g, h, i;
                if (a[c] && a[c][e] && a[c][e].length > 0) {
                    g = a[c][e];
                    g.data_cache = f;
                    for (h = 0, i = g.length; h < i; h++)
                        b.push({channel: c,evt: e,func: g[h],data: f});
                    d()
                }
            },remove: function(b, c, d) {
                if (a[b] && a[b][c])
                    for (var e = 0, f = a[b][c].length; e < f; e++)
                        if (a[b][c][e] === d) {
                            a[b][c].splice(e, 1);
                            break
                        }
            },list: function() {
                return a
            },cache: function(b, c) {
                if (a[b] && a[b][c])
                    return a[b][c].data_cache
            }}
    }()
});
STK.register("core.util.pageletM", function(a) {
    var b = "", c = "";
    if (typeof $CONFIG != "undefined") {
        b = $CONFIG.jsPath || b;
        c = $CONFIG.cssPath || c
    }
    var d = a.core.arr.indexOf, e = {}, f, g = {}, h = {}, i = {}, j = {}, k, l;
    if (a.IE) {
        k = {};
        l = function() {
            var b, c, d;
            for (b in k)
                if (k[b].length < 31) {
                    d = a.E(b);
                    break
                }
            if (!d) {
                b = "style_" + a.core.util.getUniqueKey(), d = document.createElement("style");
                d.setAttribute("type", "text/css");
                d.setAttribute("id", b);
                document.getElementsByTagName("head")[0].appendChild(d);
                k[b] = []
            }
            return {styleID: b,styleSheet: d.styleSheet || d.sheet}
        }
    }
    var m = function(b, c) {
        i[b] = {cssURL: c};
        if (a.IE) {
            var d = l();
            d.styleSheet.addImport(c);
            k[d.styleID].push(b);
            i[b].styleID = d.styleID
        } else {
            var e = a.C("link");
            e.setAttribute("rel", "Stylesheet");
            e.setAttribute("type", "text/css");
            e.setAttribute("charset", "utf-8");
            e.setAttribute("href", c);
            e.setAttribute("id", b);
            document.getElementsByTagName("head")[0].appendChild(e)
        }
    }, n = {}, o = function(b, c) {
        var d = a.E(b);
        if (d) {
            c(d);
            n[b] && delete n[b];
            for (var e in n)
                o(e, n[e])
        } else
            n[b] = c
    }, p = function(b) {
        if (a.IE) {
            var c = i[b].styleID, f = k[c], g = a.E(c), h;
            if ((h = d(b, f)) > -1) {
                (g.styleSheet || g.sheet).removeImport(h);
                f.splice(h, 1)
            }
        } else
            a.core.dom.removeNode(a.E(b));
        delete e[i[b].cssURL];
        delete i[b]
    }, q = function(b, d, e) {
        for (var f in j)
            a.E(f) || delete j[f];
        j[b] = {js: {},css: {}};
        if (e)
            for (var f = 0, g = e.length; f < g; ++f)
                j[b].css[c + e[f]] = 1
    }, r = function() {
        for (var a in i) {
            var b = !1, c = i[a].cssURL;
            for (var d in j)
                if (j[d].css[c]) {
                    b = !0;
                    break
                }
            b || p(a)
        }
    }, s = function(a, b) {
        var c = e[a] || (e[a] = {loaded: !1,list: []});
        if (c.loaded) {
            b(a);
            return !1
        }
        c.list.push(b);
        return c.list.length > 1 ? !1 : !0
    }, t = function(a) {
        var b = e[a].list;
        if (b) {
            for (var c = 0; c < b.length; c++)
                b[c](a);
            e[a].loaded = !0;
            delete e[a].list
        }
    }, u = function(b) {
        var d = b.url, e = b.load_ID, f = b.complete, g = b.pid, h = c + d, i = "css_" + a.core.util.getUniqueKey();
        if (!!s(h, f)) {
            m(i, h);
            var j = a.C("div");
            j.id = e;
            a.core.util.hideContainer.appendChild(j);
            var k = 3e3, l = function() {
                if (parseInt(a.core.dom.getStyle(j, "height")) == 42) {
                    a.core.util.hideContainer.removeChild(j);
                    t(h)
                } else if (--k > 0)
                    setTimeout(l, 10);
                else {
                    a.log(h + "timeout!");
                    a.core.util.hideContainer.removeChild(j);
                    t(h);
                    p(i);
                    m(i, h)
                }
            };
            setTimeout(l, 50)
        }
    }, v = function(c, d) {
        var f = b + c;
        !s(f, d) || a.core.io.scriptLoader({url: f,onComplete: function() {
                t(f)
            },onTimeout: function() {
                a.log(f + "timeout!");
                delete e[f]
            }})
    }, w = function(a, b) {
        g[a] || (g[a] = b)
    }, x = function(b) {
        if (b)
            if (g[b])
                try {
                    h[b] || (h[b] = g[b](a))
                } catch (c) {
                    a.log(b, c, c.stack)
                }
            else
                a.log("start:ns=" + b + " ,have not been registed");
        else {
            var d = [];
            for (b in g)
                d.push(b);
            a.core.func.timedChunk(d, {process: function(b) {
                    try {
                        h[b] || (h[b] = g[b](a))
                    } catch (c) {
                        a.log(b, c, c.stack)
                    }
                }})
        }
    }, y = function(b) {
        var c = 1, d, e, f, g, h, i, j;
        b = b || {};
        e = b.pid;
        f = b.html;
        h = b.js ? [].concat(b.js) : [];
        g = b.css ? [].concat(b.css) : [];
        if (e == undefined)
            a.log("node pid[" + e + "] is undefined");
        else {
            q(e, h, g);
            i = function() {
                --c > 0 || o(e, function(a) {
                    f != undefined && (a.innerHTML = f);
                    h.length > 0 && j();
                    r()
                })
            };
            j = function(a) {
                h.length > 0 && v(h.shift(), j);
                if (a && a.indexOf("/pl/") != -1) {
                    var b = a.replace(/^.*?\/(pl\/.*)\.js\??.*$/, "$1").replace(/\//g, ".");
                    z(b);
                    x(b)
                }
            };
            if (g.length > 0) {
                c += g.length;
                for (var k = 0, l; l = g[k]; k++)
                    u({url: l,load_ID: "js_" + l.replace(/^\/?(.*)\.css\??.*$/i, "$1").replace(/\//g, "_"),complete: i,pid: e})
            }
            i()
        }
    }, z = function(b) {
        if (b) {
            if (h[b]) {
                a.log("destroy:" + b);
                try {
                    h[b].destroy()
                } catch (c) {
                    a.log(c, c.stack)
                }
                delete h[b]
            }
        } else {
            for (b in h) {
                a.log("destroy:" + b);
                try {
                    h[b] && h[b].destroy && h[b].destroy()
                } catch (c) {
                    a.log(b, c, c.stack)
                }
            }
            h = {}
        }
    }, A = {register: w,start: x,view: y,clear: z,destroy: function() {
            A.clear();
            e = {};
            h = {};
            g = {};
            f = undefined
        }};
    a.core.dom.ready(function() {
        a.core.evt.addEvent(window, "unload", function() {
            a.core.evt.removeEvent(window, "unload", arguments.callee);
            A.destroy()
        })
    });
    return A
});
STK.register("core.util.winSize", function(a) {
    return function(a) {
        var b, c, d;
        a ? d = a.document : d = document;
        if (d.compatMode === "CSS1Compat") {
            b = d.documentElement.clientWidth;
            c = d.documentElement.clientHeight
        } else if (self.innerHeight) {
            a ? d = a.self : d = self;
            b = d.innerWidth;
            c = d.innerHeight
        } else if (d.documentElement && d.documentElement.clientHeight) {
            b = d.documentElement.clientWidth;
            c = d.documentElement.clientHeight
        } else if (d.body) {
            b = d.body.clientWidth;
            c = d.body.clientHeight
        }
        return {width: b,height: c}
    }
});
STK.register("core.util.pageSize", function(a) {
    return function(b) {
        var c;
        b ? c = b.document : c = document;
        var d = c.compatMode == "CSS1Compat" ? c.documentElement : c.body, e, f, g, h;
        if (window.innerHeight && window.scrollMaxY) {
            e = d.scrollWidth;
            f = window.innerHeight + window.scrollMaxY
        } else if (d.scrollHeight > d.offsetHeight) {
            e = d.scrollWidth;
            f = d.scrollHeight
        } else {
            e = d.offsetWidth;
            f = d.offsetHeight
        }
        var i = a.core.util.winSize(b);
        f < i.height ? g = i.height : g = f;
        e < i.width ? h = i.width : h = e;
        return {page: {width: h,height: g},win: {width: i.width,height: i.height}}
    }
});
STK.register("core.util.queue", function(a) {
    return function() {
        var a = {}, b = [];
        a.add = function(c) {
            b.push(c);
            return a
        };
        a.get = function() {
            return b.length > 0 ? b.shift() : !1
        };
        return a
    }
});
STK.register("core.util.timer", function(a) {
    return function() {
        var a = {}, b = {}, c = 0, d = null, e = !1, f = 25, g = function() {
            for (var c in b)
                b[c].pause || b[c].fun();
            return a
        };
        a.add = function(d) {
            if (typeof d != "function")
                throw "The timer needs add a function as a parameters";
            var e = "" + (new Date).getTime() + Math.random() * Math.pow(10, 17);
            b[e] = {fun: d,pause: !1};
            c <= 0 && a.start();
            c++;
            return e
        };
        a.remove = function(d) {
            if (b[d]) {
                delete b[d];
                c--
            }
            c <= 0 && a.stop();
            return a
        };
        a.pause = function(c) {
            b[c] && (b[c].pause = !0);
            return a
        };
        a.play = function(c) {
            b[c] && (b[c].pause = !1);
            return a
        };
        a.stop = function() {
            clearInterval(d);
            d = null;
            return a
        };
        a.start = function() {
            d = setInterval(g, f);
            return a
        };
        a.loop = g;
        a.get = function(a) {
            if (a === "delay")
                return f;
            if (a === "functionList")
                return b
        };
        a.set = function(a, b) {
            a === "delay" && typeof b == "number" && (f = Math.max(25, Math.min(b, 200)))
        };
        return a
    }()
});
STK.register("core.util.scrollTo", function(a) {
    return function(b, c) {
        if (!a.core.dom.isNode(b))
            throw "core.dom.isNode need element as the first parameter";
        var d = a.core.obj.parseParam({box: document.documentElement,top: 0,step: 2,onMoveStop: null}, c);
        d.step = Math.max(2, Math.min(10, d.step));
        var e = [], f = a.core.dom.position(b), g;
        d.box == document.documentElement ? g = {t: 0} : g = a.core.dom.position(d.box);
        var h = Math.max(0, (f ? f.t : 0) - (g ? g.t : 0) - d.top), i = d.box === document.documentElement ? d.box.scrollTop || document.body.scrollTop || window.pageYOffset : d.box.scrollTop;
        while (Math.abs(i - h) > d.step && i !== 0) {
            e.push(Math.round(i + (h - i) * d.step / 10));
            i = e[e.length - 1]
        }
        e.length || e.push(h);
        var j = a.core.util.timer.add(function() {
            if (e.length)
                d.box === document.documentElement ? window.scrollTo(0, e.shift()) : d.box.scrollTop = e.shift();
            else {
                d.box === document.documentElement ? window.scrollTo(0, h) : d.box.scrollTop = h;
                a.core.util.timer.remove(j);
                typeof d.onMoveStop == "function" && d.onMoveStop()
            }
        })
    }
});
STK.register("core.util.stack", function(a) {
    return function() {
        var a = {}, b = [];
        a.add = function(c) {
            b.push(c);
            return a
        };
        a.get = function() {
            return b.length > 0 ? b.pop() : !1
        };
        return a
    }
});
STK.register("core.util.swf", function(a) {
    function b(b, c) {
        var d = a.core.obj.parseParam({id: "swf_" + parseInt(Math.random() * 1e4, 10),width: 1,height: 1,attrs: {},paras: {},flashvars: {},html: ""}, c);
        if (b == null)
            throw "swf: [sURL] 鏈畾涔?";
        var e, f = [], g = [];
        for (e in d.attrs)
            g.push(e + '="' + d.attrs[e] + '" ');
        var h = [];
        for (e in d.flashvars)
            h.push(e + "=" + d.flashvars[e]);
        d.paras.flashvars = h.join("&");
        if (a.IE) {
            f.push('<object width="' + d.width + '" height="' + d.height + '" id="' + d.id + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ');
            f.push(g.join(""));
            f.push('><param name="movie" value="' + b + '" />');
            for (e in d.paras)
                f.push('<param name="' + e + '" value="' + d.paras[e] + '" />');
            f.push("</object>")
        } else {
            f.push('<embed width="' + d.width + '" height="' + d.height + '" id="' + d.id + '" src="' + b + '" type="application/x-shockwave-flash" ');
            f.push(g.join(""));
            for (e in d.paras)
                f.push(e + '="' + d.paras[e] + '" ');
            f.push(" />")
        }
        d.html = f.join("");
        return d
    }
    var c = {};
    c.create = function(c, d, e) {
        var f = a.E(c);
        if (f == null)
            throw "swf: [" + c + "] 鏈壘鍒?";
        var g = b(d, e);
        f.innerHTML = g.html;
        return a.E(g.id)
    };
    c.html = function(a, c) {
        var d = b(a, c);
        return d.html
    };
    c.check = function() {
        var b = -1;
        if (a.IE)
            try {
                var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                b = c.GetVariable("$version")
            } catch (d) {
            }
        else
            navigator.plugins["Shockwave Flash"] && (b = navigator.plugins["Shockwave Flash"].description);
        return b
    };
    return c
});
STK.register("core.util.storage", function(a) {
    var b = window.localStorage;
    if (b)
        return {get: function(a) {
                return unescape(b.getItem(a))
            },set: function(a, c, d) {
                b.setItem(a, escape(c))
            },del: function(a) {
                b.removeItem(a)
            },clear: function() {
                b.clear()
            },getAll: function() {
                var a = b.length, c = null, d = [];
                for (var e = 0; e < a; e++) {
                    c = b.key(e);
                    d.push(c + "=" + this.getKey(c))
                }
                return d.join("; ")
            }};
    if (window.ActiveXObject) {
        var c = document.documentElement, d = "localstorage";
        try {
            c.addBehavior("#default#userdata");
            c.save("localstorage")
        } catch (e) {
        }
        return {set: function(a, b) {
                c.setAttribute(a, b);
                c.save(d)
            },get: function(a) {
                c.load(d);
                return c.getAttribute(a)
            },del: function(a) {
                c.removeAttribute(a);
                c.save(d)
            }}
    }
    return {get: function(a) {
            var b = document.cookie.split("; "), c = b.length, d = [];
            for (var e = 0; e < c; e++) {
                d = b[e].split("=");
                if (a === d[0])
                    return unescape(d[1])
            }
            return null
        },set: function(a, b, c) {
            if (!(c && c instanceof Date)) {
                c = new Date;
                c.setDate(c.getDate() + 1)
            }
            document.cookie = a + "=" + escape(b) + "; expires=" + c.toGMTString()
        },del: function(a) {
            document.cookie = a + "=''; expires=Fri, 31 Dec 1999 23:59:59 GMT;"
        },clear: function() {
            var a = document.cookie.split("; "), b = a.length, c = [];
            for (var d = 0; d < b; d++) {
                c = a[d].split("=");
                this.deleteKey(c[0])
            }
        },getAll: function() {
            return unescape(document.cookie.toString())
        }}
});
(function() {
    var a = STK.core, b = {tween: "core.ani.tween",tweenArche: "core.ani.tweenArche",arrCopy: "core.arr.copy",arrClear: "core.arr.clear",hasby: "core.arr.hasby",unique: "core.arr.unique",foreach: "core.arr.foreach",isArray: "core.arr.isArray",inArray: "core.arr.inArray",arrIndexOf: "core.arr.indexOf",findout: "core.arr.findout",domNext: "core.dom.next",domPrev: "core.dom.prev",isNode: "core.dom.isNode",addHTML: "core.dom.addHTML",insertHTML: "core.dom.insertHTML",setXY: "core.dom.setXY",contains: "core.dom.contains",position: "core.dom.position",trimNode: "core.dom.trimNode",insertAfter: "core.dom.insertAfter",insertBefore: "core.dom.insertBefore",removeNode: "core.dom.removeNode",replaceNode: "core.dom.replaceNode",Ready: "core.dom.ready",setStyle: "core.dom.setStyle",setStyles: "core.dom.setStyles",getStyle: "core.dom.getStyle",addClassName: "core.dom.addClassName",hasClassName: "core.dom.hasClassName",removeClassName: "core.dom.removeClassName",builder: "core.dom.builder",cascadeNode: "core.dom.cascadeNode",selector: "core.dom.selector",sizzle: "core.dom.sizzle",addEvent: "core.evt.addEvent",custEvent: "core.evt.custEvent",removeEvent: "core.evt.removeEvent",fireEvent: "core.evt.fireEvent",fixEvent: "core.evt.fixEvent",getEvent: "core.evt.getEvent",stopEvent: "core.evt.stopEvent",delegatedEvent: "core.evt.delegatedEvent",preventDefault: "core.evt.preventDefault",hotKey: "core.evt.hotKey",memorize: "core.func.memorize",bind: "core.func.bind",getType: "core.func.getType",methodBefore: "core.func.methodBefore",timedChunk: "core.func.timedChunk",funcEmpty: "core.func.empty",ajax: "core.io.ajax",jsonp: "core.io.jsonp",ijax: "core.io.ijax",scriptLoader: "core.io.scriptLoader",require: "core.io.require",jsonInclude: "core.json.include",jsonCompare: "core.json.compare",jsonClone: "core.json.clone",jsonToQuery: "core.json.jsonToQuery",queryToJson: "core.json.queryToJson",jsonToStr: "core.json.jsonToStr",strToJson: "core.json.strToJson",objIsEmpty: "core.obj.isEmpty",beget: "core.obj.beget",cascade: "core.obj.cascade",objSup: "core.obj.sup",parseParam: "core.obj.parseParam",bLength: "core.str.bLength",dbcToSbc: "core.str.dbcToSbc",leftB: "core.str.leftB",trim: "core.str.trim",encodeHTML: "core.str.encodeHTML",decodeHTML: "core.str.decodeHTML",parseURL: "core.str.parseURL",parseHTML: "core.str.parseHTML",queryString: "core.str.queryString",htmlToJson: "core.util.htmlToJson",cookie: "core.util.cookie",drag: "core.util.drag",timer: "core.util.timer",jobsM: "core.util.jobsM",listener: "core.util.listener",winSize: "core.util.winSize",pageSize: "core.util.pageSize",templet: "core.util.templet",queue: "core.util.queue",stack: "core.util.stack",swf: "core.util.swf",URL: "core.util.URL",scrollPos: "core.util.scrollPos",scrollTo: "core.util.scrollTo",getUniqueKey: "core.util.getUniqueKey",storage: "core.util.storage",pageletM: "core.util.pageletM"};
    for (var c in b)
        STK.shortRegister(b[c], c, "theia");
    var d = "theia_1_1"
})();
STK.register("historyM", function(a) {
    function D(a) {
        a && h.push(a);
        return F
    }
    function C(b, c) {
        if (typeof b == "string" && !/^!/.test(b)) {
            var d = a.parseURL(window.location.toString()).hash, e, f = s(window.location.toString());
            if (/^!/.test(d)) {
                d = s(d);
                e = "#" + d + "#" + b
            } else
                e = "#" + b;
            c ? window.location.hash = e : window.location.replace(f + e)
        }
        return F
    }
    function B(b, c) {
        if (!!b) {
            c = c || !1;
            var d = z(), e = a.queryToJson(d.query);
            for (var f in b)
                b[f] === null ? delete e[f] : e[f] = b[f];
            d.query = a.jsonToQuery(e);
            var g = ["/", d.path, d.query == "" ? "" : "?", d.query, d.hash == "" ? "" : "#", d.hash].join("");
            A(decodeURIComponent(g), {callChange: c})
        }
    }
    function A(b, c) {
        if (!/^\//.test(b))
            a.log("地址:(" + b + ") 不为正确的路径,请使用绝对路径; 例：/directory/page.php?params#hash");
        else {
            c = a.parseParam({callChange: !0,callChangeOnSame: !0}, c);
            j = c.callChange;
            if (k) {
                if (t(i, b)) {
                    if (!c.callChangeOnSame)
                        return
                } else
                    history.pushState(null, null, i = b);
                p(b);
                return
            }
            var d = "#!" + b;
            t(i, b) ? c.callChangeOnSame && p(b) : window.location.hash = d
        }
    }
    function z() {
        var b = a.parseURL(q());
        return /^!/.test(b.hash) ? a.parseURL("http://" + b.host + b.hash.substr(1)) : b
    }
    function y() {
        clearTimeout(u)
    }
    function x(b) {
        var c = b.split("#", 2)[1];
        if (c) {
            v = a.scrollPos().top;
            y();
            w(c, 10);
            return !0
        }
    }
    function w(b, c) {
        if (v != a.scrollPos().top)
            return y();
        var d = a.E(b) || g.getElementsByName(b)[0];
        if (d) {
            d.scrollIntoView();
            v = a.scrollPos().top
        }
        c > 0 && (u = setTimeout(function() {
            w(b, c - 1)
        }, 333))
    }
    function t(a, b) {
        return s(a) == s(b)
    }
    function s(a) {
        return a.replace(/#.*$/, "")
    }
    function r(b) {
        var c = a.parseURL(b || q());
        return {host: c.host,path: "/" + c.path,query: c.query && "?" + c.query,hash: c.hash && "#" + c.hash}
    }
    function q() {
        return decodeURIComponent(window.location.toString())
    }
    function p(c, d) {
        n && !d && n("#!" + c);
        a.custEvent.fire(b, "popstate", [s(c), j, c]);
        j = !0
    }
    if (typeof $CONFIG != "undefined" && $CONFIG.bigpipe == "true") {
        var b = {}, c = a.core.util.browser, d = a.core.util.hideContainer, e = a.addEvent, f = a.removeEvent, g = document, h = [], i, j = !0, k = !!history.pushState, l = "onhashchange" in window && (typeof document.documentMode == "undefined" || document.documentMode == 8), m, n, o;
        if (!l && (c.IE6 || c.IE7)) {
            (m = a.C("iframe")).style.display = "none";
            d.appendChild(m);
            m = m.contentWindow;
            n = function(a) {
                a = encodeURIComponent(a);
                m.document.open("text/html");
                m.document.write("<html><head></head><body onload=\"parent.STK&&parent.STK.historyM&&parent.STK.historyM.hashFrameChangeHash&&parent.STK.historyM.hashFrameChangeHash('" + a + "');\"></body></html>");
                m.document.close()
            };
            o = function(a) {
                a = decodeURIComponent(a);
                if (!o.first)
                    o.first = 1;
                else {
                    window.location.hash = a;
                    a != "#!" + i && p(i = a.substr(2), !0)
                }
            }
        }
        var u, v;
        i = q().replace(/^http:\/\/.*?\//, "/");
        if (k)
            e(window, "popstate", function() {
                setTimeout(function() {
                    var a = r(), b = a.path + a.query + a.hash;
                    t(i, b) || p(i = b)
                })
            });
        else {
            var E = function() {
                var a, b = r();
                /^#!/.test(b.hash) ? a = b.hash.substr(2) : a = b.path + b.query + b.hash;
                t(i, a) || p(i = a)
            };
            l ? e(window, "hashchange", function() {
                E()
            }) : setInterval(function() {
                E()
            }, 200)
        }
        n && n("#!" + i);
        x(i);
        var F = {parseURL: z,getURL: r,pushState: A,setQuery: B,setPlainHash: C,onpopstate: D,removePopstate: function(b) {
                var c = a.core.arr.indexOf(b, h);
                c > -1 && h.splice(c, 1)
            },checkAnchor: x,clearAnchorTimer: y,hashFrameChangeHash: o};
        a.custEvent.define(b, "popstate");
        a.custEvent.add(b, "popstate", function(b, c, d, e) {
            a.foreach(h, function(b) {
                try {
                    b(c, d, e)
                } catch (f) {
                    a.log("popstate error: ", f, b)
                }
            })
        });
        return F
    }
});
STK.register("bigpipeM", function(a) {
    var b;
    if (typeof $CONFIG != "undefined" && $CONFIG.bigpipe == "true") {
        var c = a.core.util.browser.OS == "macintosh", d = a.historyM, e = /img|span|i/, f, g, h;
        typeof $CONFIG != "undefined" && (h = $CONFIG.bpType);
        var i = function() {
            i.timer = setTimeout(function() {
                a.core.util.hideContainer.removeChild(g);
                document.body.style.cursor = "";
                f && (f.style.cursor = "");
                i.timer = g = null;
                a.custEvent.fire(b, "pipeLoadEnd", g && g.src)
            })
        }, j = function(c) {
            c = c.replace(/#.*$/, "");
            c.indexOf("?") != -1 ? c = c + "&ajaxpagelet=1" : c = c + "?ajaxpagelet=1";
            c += "&_t=" + (new Date).getTime();
            if (g) {
                i.timer && clearTimeout(i.timer);
                a.removeEvent(g, "load", i);
                a.core.util.hideContainer.removeChild(g);
                a.custEvent.fire(b, "pipeLoadAbort", g.src)
            }
            g = a.C("iframe");
            g.src = c;
            g.style.display = "none";
            a.core.util.hideContainer.appendChild(g);
            document.body.style.cursor = "progress";
            f && (f.style.cursor = "progress");
            a.addEvent(g, "load", i);
            a.custEvent.fire(b, "pipeLoadStart", c)
        }, k = function() {
            a.core.evt.addEvent(document, "click", function(b) {
                b = a.fixEvent(b);
                var g = b.target, i = g.tagName.toLowerCase(), j = i == "a";
                if (!j && e.test(i))
                    for (var k = 0; k < 2; k++) {
                        if (!(g = g.parentNode))
                            return;
                        if ((i = g.tagName.toLowerCase()) == "a") {
                            j = !0;
                            break
                        }
                    }
                if (j) {
                    if (g.getAttribute("bpfilter") && g.getAttribute("bpfilter") == h && !b.ctrlKey && !b.shiftKey && b.button == 0 && (!c || !b.metaKey)) {
                        a.log("bigpipeM: 点击行为拦截成功，使用Bigpipe模式加载");
                        var l = g.href, m = d.getURL(), n = d.getURL(l);
                        if (n.host != m.host)
                            return;
                        f && (f.style.cursor = "");
                        f = g;
                        d.pushState(n.path + n.query + n.hash)
                    } else if (!/^#/.test(g.href))
                        return;
                    b.preventDefault ? b.preventDefault() : b.returnValue = !1
                }
            })
        }, l = function(b, c, e) {
            if (c) {
                a.pageletM.clear();
                d.checkAnchor(e) || window.scrollTo(0, 0);
                j(b)
            }
        };
        d.onpopstate(l);
        k();
        b = {ajaxpipeLoader: j,destroy: function() {
                d.removePopstate(l)
            }};
        a.custEvent.define(b, ["pipeLoadStart", "pipeLoadAbort", "pipeLoadEnd"]);
        return b
    }
});
STK.register("pageletView", function(a) {
    var b = {}, c = !1, d = "", e = "", f, g, h;
    if (typeof $CONFIG != "undefined") {
        d = $CONFIG.jsPath || d;
        e = $CONFIG.cssPath || e;
        f = $CONFIG.mJsPath;
        g = $CONFIG.mCssPath;
        f.MODN = f[2] - f[1] + 2;
        g.MODN = g[2] - g[1] + 2
    }
    var i = {}, j = function(a, b) {
        b = b.replace(/\?.*$/, "");
        var c = 0, d = 0, e, g;
        while (e = b.charCodeAt(c++))
            d += e;
        return a[0].replace("{n}", d % f.MODN || "")
    }, k = function(a) {
        return f ? i[a] || (i[a] = j(f, a)) : d
    }, l = function(a) {
        return e
    }, m = a.core.arr.indexOf, n = {}, o = {}, p = {}, q = 0;
    a.historyM.onpopstate(function() {
        q++
    });
    var r = function(a) {
        return new RegExp("^.*?\\/(" + a + "\\/.*?)(_[a-z\\d]{16})?\\.js\\??.*$")
    }, s, t;
    if (a.IE) {
        s = {};
        t = function() {
            var b, c, d;
            for (b in s)
                if (s[b].length < 31) {
                    d = a.E(b);
                    break
                }
            if (!d) {
                b = "style_" + a.core.util.getUniqueKey();
                d = document.createElement("style");
                d.setAttribute("type", "text/css");
                d.setAttribute("id", b);
                document.getElementsByTagName("head")[0].appendChild(d);
                s[b] = []
            }
            return {styleID: b,styleSheet: d.styleSheet || d.sheet}
        }
    }
    var u = function(b, c, d) {
        o[b] = {cssURL: d};
        if (a.IE) {
            var e = t();
            e.styleSheet.addImport(c);
            s[e.styleID].push(b);
            o[b].styleID = e.styleID
        } else {
            var f = a.C("link");
            f.setAttribute("rel", "Stylesheet");
            f.setAttribute("type", "text/css");
            f.setAttribute("charset", "utf-8");
            f.setAttribute("href", c);
            f.setAttribute("id", b);
            document.getElementsByTagName("head")[0].appendChild(f)
        }
    }, v = {}, w = function(b, c) {
        var d = a.E(b);
        if (d) {
            v[b] && delete v[b];
            c(d)
        } else
            v[b] = c
    }, x = function() {
        for (var a in v)
            w(a, v[a])
    }, y = function(b) {
        if (a.IE) {
            var c = o[b].styleID, d, e = s[c], f = a.E(c);
            if ((d = m(b, e)) > -1) {
                (f.styleSheet || f.sheet).removeImport(d);
                e.splice(d, 1)
            }
        } else
            a.core.dom.removeNode(a.E(b));
        delete n[o[b].cssURL];
        delete o[b]
    }, z = function(b, c, d) {
        for (var e in p)
            a.E(e) || delete p[e];
        p[b] = {js: {},css: {}};
        if (d)
            for (var e = 0, f = d.length; e < f; ++e)
                p[b].css[d[e]] = 1
    }, A = function() {
        for (var a in o) {
            var b = !1, c = o[a].cssURL;
            for (var d in p)
                if (p[d].css[c]) {
                    b = !0;
                    break
                }
            b || y(a)
        }
        X()
    }, B = function(a, b) {
        if (V(a)) {
            b(a);
            return !1
        }
        var c = n[a] || (n[a] = {loaded: !1,list: []});
        if (c.loaded) {
            b(a);
            return !1
        }
        c.list.push(b);
        return c.list.length > 1 ? !1 : !0
    }, C = function(a) {
        var b;
        if (n[a] && (b = n[a].list)) {
            for (var c = 0; c < b.length; c++)
                b[c](a);
            n[a].loaded = !0;
            delete n[a].list
        }
    }, D = function(b) {
        var c = b.url, d = b.load_ID, e = b.complete, f = b.pid, g = c, h = "css_" + a.core.util.getUniqueKey();
        if (!!B(c, e)) {
            /^http\:\/\//.test(c.toLowerCase()) || (g = l(c) + c);
            u(h, g, c);
            var i = a.C("div");
            i.id = d;
            a.core.util.hideContainer.appendChild(i);
            var j = 3e3, k = function() {
                if (parseInt(a.core.dom.getStyle(i, "height")) == 42) {
                    a.core.util.hideContainer.removeChild(i);
                    C(c)
                } else if (--j > 0)
                    setTimeout(k, 10);
                else {
                    a.log(c + "timeout!");
                    a.core.util.hideContainer.removeChild(i);
                    C(c);
                    y(h);
                    u(h, g, c)
                }
            };
            setTimeout(k, 50)
        }
    }, E = function(b, c) {
        if (!!B(b, c)) {
            var d = b;
            /^http\:\/\//.test(b.toLowerCase()) || (d = k(b) + b);
            a.core.io.scriptLoader({url: d,onComplete: function() {
                    C(b)
                },onTimeout: function() {
                    a.log(b + "timeout!");
                    delete n[b]
                }})
        }
    }, F, G = [];
    b.onload = function(a) {
        F ? a() : G.push(a)
    };
    a.addEvent(window, "load", function() {
        a.core.evt.removeEvent(window, "load", arguments.callee);
        F = !0;
        for (var b = 0; b < G.length; ++b)
            G[b]();
        G = undefined
    });
    var H = window, I = H.requestAnimationFrame || H.webkitRequestAnimationFrame || H.mozRequestAnimationFrame || H.oRequestAnimationFrame || H.msRequestAnimationFrame, J = function(a) {
        return setTimeout(a, 2)
    };
    I && I(function() {
        J = I
    });
    var K = function() {
        var a = [], b, c = function() {
            if (a.length > 0) {
                b = !0;
                a.shift()();
                J(c)
            } else
                b = !1
        };
        return function(d) {
            if (q)
                d();
            else {
                a.push(d);
                b || c()
            }
        }
    }(), L = !1;
    b.originalPagePlRendReady = function() {
        return L
    };
    var M = 0, N = 0, O = !1, P = !1, Q = function() {
        M = N = 0;
        clearTimeout(R);
        O = !1;
        P = !0
    }, R, S = function() {
        clearTimeout(R);
        c && !P && !O && (M === N && M ? R = setTimeout(function() {
            if (!O) {
                R = undefined;
                L = !0;
                O = !0;
                a.historyM.clearAnchorTimer();
                a.custEvent.fire(b, "allPlRendReady")
            }
        }, 800) : R = setTimeout(S, 100))
    };
    a.custEvent.add(a.bigpipeM, "pipeLoadStart", Q);
    a.custEvent.add(a.bigpipeM, "pipeLoadEnd", function() {
        J(function() {
            P = !1;
            S()
        })
    });
    var T = function(b) {
        var c = 1, d, e, f, g, h, i, j, k, l;
        e = b.pid;
        f = b.html;
        h = b.js ? [].concat(b.js) : [];
        g = b.css ? [].concat(b.css) : [];
        z(e, h, g);
        var m = function() {
            k();
            q && A();
            x();
            S()
        };
        i = function() {
            N++;
            w(e, function(a) {
                f != undefined ? K(function() {
                    a.innerHTML = f;
                    J(m)
                }) : m()
            })
        };
        j = function() {
            if (!(--c > 0) && typeof l != "undefined") {
                clearTimeout(l);
                i()
            }
        };
        k = function(b) {
            h.length > 0 && E(h.shift(), k);
            var c, d;
            if (b && ((d = b.match(r("pl"))) || (d = b.match(r("trustPagelet"))))) {
                c = d[1].replace(/\//g, ".");
                a.pageletM.clear(c);
                a.pageletM.start(c)
            }
        };
        if (g.length > 0) {
            c += g.length;
            for (var n = 0, o; o = g[n]; n++)
                D({url: o,load_ID: "js_" + o.replace(/^\/?(.*)\.css\??.*$/i, "$1").replace(/\//g, "_"),complete: j,pid: e})
        }
        l = setTimeout(function() {
            l = undefined;
            i()
        }, 5e3);
        j()
    }, U = {}, V = function(a) {
        for (var b in U)
            if (U[b].includes[a])
                return !0
    }, W = function() {
        var b = document.getElementsByTagName("link"), c, d;
        for (var e = 0; e < b.length; ++e)
            if (c = b[e].getAttribute("includes")) {
                d = a.core.dom.uniqueID(b[e]);
                c = c.split("|");
                var f = {};
                for (var g = 0; g < c.length; ++g)
                    f[c[g]] = 1;
                U[d] = {element: b[e],includes: f}
            }
    }, X = function() {
        var b = {}, c, d;
        for (var e in U) {
            c = U[e].includes;
            for (var f in c) {
                d = !1;
                for (var g in p)
                    if (p[g].css[f]) {
                        d = !0;
                        break
                    }
                if (d) {
                    b[e] = !0;
                    break
                }
            }
        }
        for (var e in U)
            if (!b[e]) {
                a.core.dom.removeNode(U[e].element);
                delete U[e]
            }
    };
    W();
    a.pageletM.view = function(b) {
        if (!b || !b.pid)
            a.log("pagelet view pid is undefined");
        else {
            if (M++ == 0) {
                T(b);
                return
            }
            J(function() {
                T(b)
            })
        }
    };
    a.custEvent.define(b, ["allPlRendReady"]);
    a.core.dom.ready(function() {
        a.addEvent(window, "unload", function() {
            a.removeEvent(window, "unload", arguments.callee);
            n = o = p = s = t = v = U = undefined
        });
        J(function() {
            c = !0;
            S()
        })
    });
    return b
});
STK.register("fm", function(a) {
    var b = {};
    b.v = a.pageletM.view;
    b.vStart = a.funcEmpty;
    b.vEnd = a.funcEmpty;
    return b
});
STK.register("kit.extra.statsTime", function(a) {
    window.__GLOBAL_STATS_PAGESTART_TIME__ = $CONFIG.timeDiff + parseInt($CONFIG.servertime + "000");
    a.core.dom.ready(function() {
        window.__GLOBAL_STATS_DOMREADY_TIME__ = (new Date).getTime()
    });
    a.addEvent(window, "load", function() {
        window.__GLOBAL_STATS_PAGEONLOAD_TIME__ = (new Date).getTime()
    })
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
STK.register("ui.confirm", function(a) {
    var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt2" node-type="textComplex"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl><div class="btn"><a href="javascript:void(0)" class="W_btn_d" node-type="OK"></a><a href="javascript:void(0)" class="W_btn_b" node-type="cancel"></a></div></div>', c = {success: "icon_succM",error: "icon_errorM",warn: "icon_warnM","delete": "icon_delM",question: "icon_questionM"}, d = a.kit.extra.language, e = null;
    return function(f, g) {
        var h, i, j, k, l, m;
        h = a.parseParam({title: d("#L{提示}"),icon: "question",textLarge: f,textComplex: "",textSmall: "",OK: a.funcEmpty,OKText: d("#L{确定}"),cancel: a.funcEmpty,cancelText: d("#L{取消}")}, g);
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
            l ? h.OK(m) : h.cancel(m)
        });
        k.show().setMiddle();
        j.getDom("OK").focus();
        i.cfm = j;
        i.dia = k;
        return i
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
STK.register("comp.content.changeLanguage", function(a) {
    var b = a.kit.extra.language, c;
    return function(d) {
        if (!c) {
            var e, f = {init: function() {
                    f.pars();
                    f.bind()
                },pars: function() {
                    c = {};
                    e = a.parseParam({login: 1}, a.queryToJson(d.getAttribute("action-data") || ""));
                    e.login = parseInt(e.login)
                },bind: function() {
                    a.addEvent(d, "change", h.change)
                },destroy: function() {
                    a.removeEvent(d, "change", h.change)
                }}, g = function() {
                var b = function(a) {
                    window.location.reload()
                }, c = function(b) {
                    a.ui.alert(b.msg)
                }, d = a.common.trans.global.getTrans("language", {onSuccess: b,onError: c});
                return function(a) {
                    d.request({lang: a})
                }
            }(), h = {change: function() {
                    var c = d.value, f = d.options[d.selectedIndex];
                    a.ui.confirm(b("#L{确认切换到}") + f.innerHTML + b("#L{版吗？}"), {OK: function() {
                            a.preventDefault();
                            if (e.login)
                                g(c);
                            else {
                                var b = window.location.href;
                                /\?/.test(b) ? /(\?|\&)lang=([^&]+)/.test(b) ? b = b.replace(/(\?|\&)lang=([^&]+)/, "$1lang=" + c) : b = b + "&lang=" + c : b = b + "?lang=" + c;
                                window.location.href = b
                            }
                        },cancel: function() {
                            a.preventDefault();
                            d.value = $CONFIG.lang
                        }})
                }};
            f.init();
            c.destroy = a.core.func.empty;
            return c
        }
        return c
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
                            h = "#L{娌℃湁鐧诲綍}";
                            break;
                        case 4:
                        case 9:
                            h = "#L{璇蜂笂浼�5M浠ュ唴鐨凧PG銆丟IF銆丳NG鍥剧墖銆倉";
                            break;
                        default:
                            h = "#L{涓婁紶鍥剧墖瓒呮椂}"
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
                        k = b("#L{寰崥妗岄潰鎴浘}") + l + ".jpg"
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

STK.pageletM.register("pl.content.changeLanguage", function(a) {
    var b = a.E("pl_content_changeLanguage"), c = a.comp.content.changeLanguage(b);
    return c
});
;
