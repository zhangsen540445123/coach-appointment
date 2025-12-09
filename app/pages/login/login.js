(global.webpackJsonp = global.webpackJsonp || []).push([["pages/login/login"], {
    "38a2": function (n, t, o) {
        (function (n, t) {
            var e = o("47a9");
            o("6686"), e(o("3240"));
            var i = e(o("52ed"));
            n.__webpack_require_UNI_MP_PLUGIN__ = o, t(i.default)
        }).call(this, o("3223").default, o("df3c").createPage)
    }, "3f43": function (n, t, o) {
        o.r(t);
        var e = o("e02c"), i = o.n(e);
        for (var a in e) ["default"].indexOf(a) < 0 && function (n) {
            o.d(t, n, (function () {
                return e[n]
            }))
        }(a);
        t.default = i.a
    }, "52ed": function (n, t, o) {
        o.r(t);
        var e = o("f5fe"), i = o("3f43");
        for (var a in i) ["default"].indexOf(a) < 0 && function (n) {
            o.d(t, n, (function () {
                return i[n]
            }))
        }(a);
        o("6bbc");
        var c = o("828b"), u = Object(c.a)(i.default, e.b, e.c, !1, null, "1e04f750", null, !1, e.a, void 0);
        t.default = u.exports
    }, "6bbc": function (n, t, o) {
        var e = o("a336");
        o.n(e).a
    }, a336: function (n, t, o) {
    }, e02c: function (n, t, o) {
        (function (n) {
            Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0;
            var e = o("2052"), i = {
                components: {}, data: function () {
                    return {loginCheckStatus: 0}
                }, onLoad: function (n) {
                    console.log("login page onload options = ", JSON.stringify(n), " currentpage=", getCurrentPages())
                }, onShow: function () {
                    console.log("onShow this=", this)
                }, methods: {
                    showProtocol: function (t) {
                        n.navigateTo({url: "/pages/consult/protocolPage?value=" + t})
                    }, processLoginSuccessData: function () {
                        n.reLaunch({url: "/pages/consult/consult"})
                    }, changeLoginType: function () {
                        1 === this.loginCheckStatus ? this.loginCheckStatus = 0 : this.loginCheckStatus = 1
                    }, toShowCheck: function () {
                        if (0 === this.loginCheckStatus) return n.showToast({title: "请勾选相应协议", icon: "none"}), !1
                    }, getPhoneNumber: function (t) {
                        var o = this;
                        "getPhoneNumber:ok" === t.detail.errMsg ? (console.log("getPhoneNumber"), (0, e.loginWithMobileAuth)(t.detail).then((function () {
                            return o.processLoginSuccessData()
                        })).catch((function (t) {
                            n.showToast({title: "登录失败:" + t, icon: "none"})
                        }))) : (0, e.showMobileAuthDenyDialog)()
                    }
                }
            };
            t.default = i
        }).call(this, o("df3c").default)
    }, f5fe: function (n, t, o) {
        o.d(t, "b", (function () {
            return e
        })), o.d(t, "c", (function () {
            return i
        })), o.d(t, "a", (function () {
        }));
        var e = function () {
            this.$createElement;
            var n = (this._self._c, o("5c90")), t = 1 === this.loginCheckStatus ? o("1d4f") : null,
                e = 1 !== this.loginCheckStatus ? o("7a32") : null;
            this.$mp.data = Object.assign({}, {$root: {m0: n, m1: t, m2: e}})
        }, i = []
    }
}, [["38a2", "common/runtime", "common/vendor"]]]);