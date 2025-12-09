(global.webpackJsonp = global.webpackJsonp || []).push([["pages/user/infoNotice"], {
    "091c": function (t, n, e) {
        var a = e("6a9d");
        e.n(a).a
    }, "2f60": function (t, n, e) {
        (function (t, n) {
            var a = e("47a9");
            e("6686"), a(e("3240"));
            var o = a(e("5544"));
            t.__webpack_require_UNI_MP_PLUGIN__ = e, n(o.default)
        }).call(this, e("3223").default, e("df3c").createPage)
    }, 5544: function (t, n, e) {
        e.r(n);
        var a = e("cc05"), o = e("94bc");
        for (var r in o) ["default"].indexOf(r) < 0 && function (t) {
            e.d(n, t, (function () {
                return o[t]
            }))
        }(r);
        e("684c"), e("091c");
        var c = e("828b"), i = Object(c.a)(o.default, a.b, a.c, !1, null, "59b3a274", null, !1, a.a, void 0);
        n.default = i.exports
    }, "684c": function (t, n, e) {
        var a = e("a0e2");
        e.n(a).a
    }, "6a9d": function (t, n, e) {
    }, "94bc": function (t, n, e) {
        e.r(n);
        var a = e("e889"), o = e.n(a);
        for (var r in a) ["default"].indexOf(r) < 0 && function (t) {
            e.d(n, t, (function () {
                return a[t]
            }))
        }(r);
        n.default = o.a
    }, a0e2: function (t, n, e) {
    }, cc05: function (t, n, e) {
        e.d(n, "b", (function () {
            return a
        })), e.d(n, "c", (function () {
            return o
        })), e.d(n, "a", (function () {
        }));
        var a = function () {
            this.$createElement;
            this._self._c
        }, o = []
    }, e889: function (t, n, e) {
        var a = e("47a9");
        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        var o = a(e("7eb4")), r = a(e("ee10")), c = e("9359"), i = e("3eae"), u = {
            data: function () {
                return {infoList: [], formData: {pager: {index: 1, size: 999}}}
            }, onShow: function () {
                this.getInfoList()
            }, methods: {
                getInfoList: function () {
                    var t = this;
                    return (0, r.default)(o.default.mark((function n() {
                        var e, a;
                        return o.default.wrap((function (n) {
                            for (; ;) switch (n.prev = n.next) {
                                case 0:
                                    return e = t, n.next = 3, (0, i.getMessageList)(t.formData);
                                case 3:
                                    a = n.sent, e.infoList = a.data.data.list;
                                case 5:
                                case"end":
                                    return n.stop()
                            }
                        }), n)
                    })))()
                }, readInfo: function (t) {
                    var n = this, e = {msgIdList: [t]};
                    (0, c.irequestdata)({
                        url: "/visitor/user/readMessage",
                        method: "post",
                        data: e,
                        success: function (t) {
                            console.log(t), 200 === t.data.code && n.getInfoList()
                        },
                        error: function () {
                        }
                    })
                }
            }
        };
        n.default = u
    }
}, [["2f60", "common/runtime", "common/vendor"]]]);