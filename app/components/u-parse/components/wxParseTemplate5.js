(global.webpackJsonp = global.webpackJsonp || []).push([["components/u-parse/components/wxParseTemplate5"], {
    "1bfd": function (e, n, t) {
        t.r(n);
        var o = t("cbbd"), a = t("456b");
        for (var r in a) ["default"].indexOf(r) < 0 && function (e) {
            t.d(n, e, (function () {
                return a[e]
            }))
        }(r);
        var c = t("828b"), u = Object(c.a)(a.default, o.b, o.c, !1, null, null, null, !1, o.a, void 0);
        n.default = u.exports
    }, "456b": function (e, n, t) {
        t.r(n);
        var o = t("c96a"), a = t.n(o);
        for (var r in o) ["default"].indexOf(r) < 0 && function (e) {
            t.d(n, e, (function () {
                return o[e]
            }))
        }(r);
        n.default = a.a
    }, c96a: function (e, n, t) {
        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        var o = {
            name: "wxParseTemplate5", props: {node: {}}, components: {
                wxParseTemplate: function () {
                    t.e("components/u-parse/components/wxParseTemplate6").then(function () {
                        return resolve(t("8815"))
                    }.bind(null, t)).catch(t.oe)
                }, wxParseImg: function () {
                    t.e("components/u-parse/components/wxParseImg").then(function () {
                        return resolve(t("8baa"))
                    }.bind(null, t)).catch(t.oe)
                }, wxParseVideo: function () {
                    t.e("components/u-parse/components/wxParseVideo").then(function () {
                        return resolve(t("f3e8"))
                    }.bind(null, t)).catch(t.oe)
                }, wxParseAudio: function () {
                    t.e("components/u-parse/components/wxParseAudio").then(function () {
                        return resolve(t("6cf5"))
                    }.bind(null, t)).catch(t.oe)
                }
            }, methods: {
                wxParseATap: function (e) {
                    var n = e.currentTarget.dataset.href;
                    if (n) {
                        for (var t = this.$parent; !t.preview || "function" != typeof t.preview;) t = t.$parent;
                        t.navigate(n, e)
                    }
                }
            }
        };
        n.default = o
    }, cbbd: function (e, n, t) {
        t.d(n, "b", (function () {
            return o
        })), t.d(n, "c", (function () {
            return a
        })), t.d(n, "a", (function () {
        }));
        var o = function () {
            this.$createElement;
            this._self._c
        }, a = []
    }
}]), (global.webpackJsonp = global.webpackJsonp || []).push(["components/u-parse/components/wxParseTemplate5-create-component", {
    "components/u-parse/components/wxParseTemplate5-create-component": function (e, n, t) {
        t("df3c").createComponent(t("1bfd"))
    }
}, [["components/u-parse/components/wxParseTemplate5-create-component"]]]);