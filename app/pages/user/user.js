(global.webpackJsonp = global.webpackJsonp || []).push([["pages/user/user"], {
    "076e": function (n, o, e) {
        (function (n) {
            Object.defineProperty(o, "__esModule", {value: !0}), o.default = void 0;
            var t = e("9359"), a = e("1e0d"), i = {
                components: {
                    Navbar: function () {
                        Promise.all([e.e("common/vendor"), e.e("components/Navbar")]).then(function () {
                            return resolve(e("8412"))
                        }.bind(null, e)).catch(e.oe)
                    }, PageContainer: function () {
                        Promise.all([e.e("common/vendor"), e.e("components/PageContainer")]).then(function () {
                            return resolve(e("9de0"))
                        }.bind(null, e)).catch(e.oe)
                    }
                }, setup: function () {
                    return {loginc: (0, a.useLogin)()}
                }, data: function () {
                    return {hasInfo: !0}
                }, onShow: function () {
                    var n = this;
                    this.loginc.isLogined() || this.$refs.pageContainer.openLoginPanel(), this.loginc.onlyLogin((function () {
                        n.getHasInfo()
                        // [修复] 移除自动登录调用: n.loginc.login()
                    }))
                }, methods: {
                    toInfoList: function () {
                        n.navigateTo({url: "/pages/user/infoNotice"})
                    }, showProtocol: function (o) {
                        n.navigateTo({url: "/pages/consult/protocolPage?value=" + o})
                    }, toInfoEdit: function () {
                        n.navigateTo({url: "/pages/user/infoEdit"})
                    }, toVisiorInfo: function () {
                        n.navigateTo({url: "/pages/consult/completeInfo"})
                    }, gotoCouponDetail: function () {
                        n.navigateTo({url: "/pages/user/coupon"})
                    }, gotoInfoNotice: function () {
                        n.navigateTo({url: "/pages/user/infoNotice"})
                    }, toUserFocus: function () {
                        this.loginc.isLogined() ? n.navigateTo({url: "/pages/user/userFocus"}) : this.$refs.pageContainer.openLoginPanel()
                    }, toPreOrderList: function () {
                        n.navigateTo({url: "/pages/userList/preOrderList"})
                    }, toAccountMassage: function () {
                        n.navigateTo({url: "/pages/userList/accountMassage"})
                    }, toConsultGuide: function () {
                        n.navigateTo({url: "/pages/userList/consultGuide"})
                    }, toUserFeedback: function () {
                        n.navigateTo({url: "/pages/feedback/feedback"})
                    }, toAboutUm: function () {
                        n.navigateTo({url: "/pages/contact/contact"})
                    }, getHasInfo: function () {
                        var n = this;
                        (0, t.irequestdata)({
                            url: "/visitor/user/hasMessage", method: "get", success: function (o) {
                                console.log(o), 200 === o.data.code && (n.hasInfo = o.data.data)
                            }, error: function () {
                            }
                        })
                    }
                }
            };
            o.default = i
        }).call(this, e("df3c").default)
    }, "1f8b": function (n, o, e) {
        e.r(o);
        var t = e("076e"), a = e.n(t);
        for (var i in t) ["default"].indexOf(i) < 0 && function (n) {
            e.d(o, n, (function () {
                return t[n]
            }))
        }(i);
        o.default = a.a
    }, "2a54": function (n, o, e) {
        e.d(o, "b", (function () {
            return t
        })), e.d(o, "c", (function () {
            return a
        })), e.d(o, "a", (function () {
        }));
        var t = function () {
            this.$createElement;
            var n = (this._self._c, e("42d6")), o = this.loginc.getInfo(), t = o.headUrl ? this.loginc.getInfo() : null,
                a = o.headUrl ? null : e("3d73"), i = this.loginc.getInfo().nickName || "微信用户",
                u = this.loginc.getInfo().mobile || "****";
            this.$mp.data = Object.assign({}, {$root: {m0: n, g0: o, g1: t, m1: a, g2: i, g3: u}})
        }, a = []
    }, "82ad": function (n, o, e) {
        (function (n, o) {
            var t = e("47a9");
            e("6686"), t(e("3240"));
            var a = t(e("af9f"));
            n.__webpack_require_UNI_MP_PLUGIN__ = e, o(a.default)
        }).call(this, e("3223").default, e("df3c").createPage)
    }, af9f: function (n, o, e) {
        e.r(o);
        var t = e("2a54"), a = e("1f8b");
        for (var i in a) ["default"].indexOf(i) < 0 && function (n) {
            e.d(o, n, (function () {
                return a[n]
            }))
        }(i);
        e("fd51");
        var u = e("828b"), r = Object(u.a)(a.default, t.b, t.c, !1, null, "03281493", null, !1, t.a, void 0);
        o.default = r.exports
    }
}, [["82ad", "common/runtime", "common/vendor"]]]);