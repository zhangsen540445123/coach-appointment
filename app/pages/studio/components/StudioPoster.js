require("../common/vendor.js"), (global.webpackJsonp = global.webpackJsonp || []).push([["pages/studio/components/StudioPoster"], {
    "0520": function (e, t, n) {
        n.r(t);
        var o = n("975c"), r = n.n(o);
        for (var a in o) ["default"].indexOf(a) < 0 && function (e) {
            n.d(t, e, (function () {
                return o[e]
            }))
        }(a);
        t.default = r.a
    }, 1006: function (e, t, n) {
    }, "1ccc": function (e, t, n) {
        n.d(t, "b", (function () {
            return r
        })), n.d(t, "c", (function () {
            return a
        })), n.d(t, "a", (function () {
            return o
        }));
        var o = {
            uniPopup: function () {
                return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null, "61d1"))
            }
        }, r = function () {
            this.$createElement;
            this._self._c
        }, a = []
    }, 3140: function (e, t, n) {
        n.r(t);
        var o = n("1ccc"), r = n("0520");
        for (var a in r) ["default"].indexOf(a) < 0 && function (e) {
            n.d(t, e, (function () {
                return r[e]
            }))
        }(a);
        n("e3d8");
        var s = n("828b"), i = Object(s.a)(r.default, o.b, o.c, !1, null, "42d24b35", null, !1, o.a, void 0);
        t.default = i.exports
    }, "975c": function (e, t, n) {
        (function (e, o) {
            var r = n("47a9");
            Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0;
            var a = r(n("7eb4")), s = r(n("ee10")), i = r(n("af34")), c = r(n("8e2a")), u = n("e05e"), f = n("83b8"),
                l = function (e) {
                    return new Promise((function (t) {
                        setTimeout(t, e)
                    }))
                }, d = {
                    components: {
                        Share: function () {
                            Promise.all([n.e("common/vendor"), n.e("components/Share")]).then(function () {
                                return resolve(n("e72a"))
                            }.bind(null, n)).catch(n.oe)
                        }
                    }, data: function () {
                        return {drawing: !1, result: ""}
                    }, watch: {
                        drawing: function (t) {
                            t ? e.showLoading({title: "绘制中..."}) : e.hideLoading()
                        }
                    }, methods: {
                        getCtx: function () {
                            var e = this;
                            return new Promise((function (t, n) {
                                var r = o.createCanvasContext("poster-canvas", e);
                                e.createSelectorQuery().select("#poster-canvas").fields({
                                    node: !0,
                                    size: !0
                                }).exec((function (e) {
                                    var n = e[0];
                                    t({ctx: r, width: n.width, height: n.height})
                                }))
                            }))
                        }, getImage: function (e, t) {
                            return (0, f.getImage)("studio_poster_".concat(e), t)
                        }, toImage: function () {
                            var e = this;
                            return new Promise((function (t, n) {
                                o.canvasToTempFilePath({
                                    canvasId: "poster-canvas", success: function (e) {
                                        t(e.tempFilePath)
                                    }, fail: n
                                }, e)
                            }))
                        }, split: function (e) {
                            var t = e.ctx, n = e.fontSize, o = e.lineHeight, r = e.width, a = e.text, s = e.max, c = [],
                                u = 0;
                            return (0, i.default)(a).forEach((function (e) {
                                if (u >= s) {
                                    var a = c[u - 1];
                                    a.w >= r && (a.text = a.text.slice(0, -3) + "...")
                                } else {
                                    c[u] = c[u] || {text: "", w: 0, y: (n + o + 10) * u}, c[u].text += e;
                                    var i = t.measureText(c[u].text).width;
                                    c[u].w = i, i >= r && u++
                                }
                            })), c
                        }, draw: function (e) {
                            var t = this;
                            return (0, s.default)(a.default.mark((function n() {
                                var o, r, s, i, f, l, d, p, m, g;
                                return a.default.wrap((function (n) {
                                    for (; ;) switch (n.prev = n.next) {
                                        case 0:
                                            return n.next = 2, t.getCtx();
                                        case 2:
                                            return o = n.sent, r = o.ctx, s = o.width, i = o.height, f = function (e) {
                                                return e * s / 600
                                            }, l = function (e, t, n) {
                                                r.fillText(e, t, n + 10)
                                            }, r.setFillStyle("#fff"), r.fillRect(f(20), f(20), s - f(40), i - f(40)), n.next = 12, t.getImage("picture", e.studioCoverImgList[0]);
                                        case 12:
                                            return d = n.sent, r.drawImage(d, f(24), f(24), f(552), f(310)), n.next = 16, (0, u.createQrcode)({
                                                page: "pages/studio/details",
                                                scene: {id: e.studioId}
                                            });
                                        case 16:
                                            return p = n.sent, n.next = 19, t.getImage("qrcode", p);
                                        case 19:
                                            return m = n.sent, r.drawImage(m, f(442), f(546), f(116), f(116)), n.next = 23, t.getImage("bg", c.default);
                                        case 23:
                                            return g = n.sent, r.drawImage(g, 0, 0, s, i), r.setFillStyle("rgb(31, 31, 31)"), r.font = "bold 20px sans-serif", r.setFontSize(f(32)), l(e.studioName, f(44), f(368)), r.setFillStyle("rgb(92, 92, 92)"), r.font = "normal 20px sans-serif", r.setFontSize(f(20)), l("营业时间：".concat(e.studioOpenTime), f(44), f(416)), e.summaryAddress && (r.setFillStyle("rgb(92, 92, 92)"), r.font = "normal 20px sans-serif", r.setFontSize(f(20)), t.split({
                                                ctx: r,
                                                fontSize: f(20),
                                                lineHeight: f(36),
                                                width: f(512),
                                                text: "地址：".concat(e.summaryAddress),
                                                max: 1
                                            }).forEach((function (e) {
                                                l(e.text, f(44), f(440 + e.y + 10))
                                            }))), r.setFillStyle("rgb(156, 112, 90)"), r.font = "bold 20px sans-serif", r.setFontSize(f(30)), l("有弥联合心理", f(40), f(576)), r.setFillStyle("rgb(156, 112, 90)"), r.font = "normal 20px sans-serif", r.setFontSize(f(20)), l("累计温暖10万+来访用户", f(40), f(615)), n.next = 44, new Promise((function (e) {
                                                return r.draw(!1, e)
                                            }));
                                        case 44:
                                            return n.next = 46, t.toImage();
                                        case 46:
                                            t.result = n.sent;
                                        case 47:
                                        case"end":
                                            return n.stop()
                                    }
                                }), n)
                            })))()
                        }, open: function (e) {
                            var t = this;
                            return (0, s.default)(a.default.mark((function n() {
                                return a.default.wrap((function (n) {
                                    for (; ;) switch (n.prev = n.next) {
                                        case 0:
                                            return n.prev = 0, t.drawing = !0, t.$refs.popup.open("center"), n.next = 5, l(300);
                                        case 5:
                                            return n.next = 7, t.draw(e);
                                        case 7:
                                            t.drawing = !1, n.next = 16;
                                            break;
                                        case 10:
                                            n.prev = 10, n.t0 = n.catch(0), t.drawing = !1, o.showToast({
                                                title: "绘图失败",
                                                icon: "none"
                                            }), t.close(), console.error("studio-poster error", n.t0);
                                        case 16:
                                        case"end":
                                            return n.stop()
                                    }
                                }), n, null, [[0, 10]])
                            })))()
                        }, close: function () {
                            this.$refs.popup.close()
                        }
                    }
                };
            t.default = d
        }).call(this, n("3223").default, n("df3c").default)
    }, e3d8: function (e, t, n) {
        var o = n("1006");
        n.n(o).a
    }
}]), (global.webpackJsonp = global.webpackJsonp || []).push(["pages/studio/components/StudioPoster-create-component", {
    "pages/studio/components/StudioPoster-create-component": function (e, t, n) {
        n("df3c").createComponent(n("3140"))
    }
}, [["pages/studio/components/StudioPoster-create-component"]]]);