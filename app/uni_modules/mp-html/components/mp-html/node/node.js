(global.webpackJsonp = global.webpackJsonp || []).push([["uni_modules/mp-html/components/mp-html/node/node"], {
    "4d7d": function (t, e, o) {
        var n = o("5531");
        o.n(n).a
    }, "525e": function (t, e, o) {
        o.d(e, "b", (function () {
            return n
        })), o.d(e, "c", (function () {
            return r
        })), o.d(e, "a", (function () {
        }));
        var n = function () {
            this.$createElement;
            this._self._c
        }, r = []
    }, 5531: function (t, e, o) {
    }, "5c88": function (t, e, o) {
        o.r(e);
        var n = o("525e"), r = o("b595");
        for (var i in r) ["default"].indexOf(i) < 0 && function (t) {
            o.d(e, t, (function () {
                return r[t]
            }))
        }(i);
        o("4d7d");
        var s = o("828b"), a = o("d066"), c = Object(s.a)(r.default, n.b, n.c, !1, null, null, null, !1, n.a, void 0);
        "function" == typeof a.a && Object(a.a)(c), e.default = c.exports
    }, b595: function (t, e, o) {
        o.r(e);
        var n = o("be2d"), r = o.n(n);
        for (var i in n) ["default"].indexOf(i) < 0 && function (t) {
            o.d(e, t, (function () {
                return n[t]
            }))
        }(i);
        e.default = r.a
    }, be2d: function (t, e, o) {
        (function (t) {
            var n = o("47a9");
            Object.defineProperty(e, "__esModule", {value: !0}), e.default = void 0;
            var r = n(o("7ca3"));

            function i(t, e) {
                var o = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(t);
                    e && (n = n.filter((function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), o.push.apply(o, n)
                }
                return o
            }

            function s(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var o = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? i(Object(o), !0).forEach((function (e) {
                        (0, r.default)(t, e, o[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o)) : i(Object(o)).forEach((function (e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e))
                    }))
                }
                return t
            }

            var a = {
                name: "node", options: {virtualHost: !0}, data: function () {
                    return {ctrl: {}, isiOS: t.getSystemInfoSync().system.includes("iOS")}
                }, props: {
                    name: String, attrs: {
                        type: Object, default: function () {
                            return {}
                        }
                    }, childs: Array, opts: Array
                }, components: {
                    node: function () {
                        Promise.resolve().then(function () {
                            return resolve(o("5c88"))
                        }.bind(null, o)).catch(o.oe)
                    }
                }, mounted: function () {
                    var t = this;
                    this.$nextTick((function () {
                        for (t.root = t.$parent; "mp-html" !== t.root.$options.name; t.root = t.root.$parent) ;
                    }))
                }, beforeDestroy: function () {
                }, methods: {
                    toJSON: function () {
                        return this
                    }, play: function (e) {
                        var o = e.currentTarget.dataset.i, n = this.childs[o];
                        if (this.root.$emit("play", {
                            source: n.name,
                            attrs: s(s({}, n.attrs), {}, {src: n.src[this.ctrl[o] || 0]})
                        }), this.root.pauseVideo) {
                            for (var r = !1, i = e.target.id, a = this.root._videos.length; a--;) this.root._videos[a].id === i ? r = !0 : this.root._videos[a].pause();
                            if (!r) {
                                var c = t.createVideoContext(i, this);
                                c.id = i, this.root.playbackRate && c.playbackRate(this.root.playbackRate), this.root._videos.push(c)
                            }
                        }
                    }, imgTap: function (e) {
                        var o = this.childs[e.currentTarget.dataset.i];
                        o.a ? this.linkTap(o.a) : o.attrs.ignore || (this.root.$emit("imgtap", o.attrs), this.root.previewImg && t.previewImage({
                            showmenu: this.root.showImgMenu,
                            current: parseInt(o.attrs.i),
                            urls: this.root.imgList
                        }))
                    }, imgLongTap: function (t) {
                    }, imgLoad: function (t) {
                        var e = t.currentTarget.dataset.i;
                        this.childs[e].w ? (this.opts[1] && !this.ctrl[e] || -1 === this.ctrl[e]) && this.$set(this.ctrl, e, 1) : this.$set(this.ctrl, e, t.detail.width), this.checkReady()
                    }, checkReady: function () {
                        var t = this;
                        this.root && !this.root.lazyLoad && (this.root._unloadimgs -= 1, this.root._unloadimgs || setTimeout((function () {
                            t.root.getRect().then((function (e) {
                                t.root.$emit("ready", e)
                            })).catch((function () {
                                t.root.$emit("ready", {})
                            }))
                        }), 350))
                    }, linkTap: function (e) {
                        var o = e.currentTarget ? this.childs[e.currentTarget.dataset.i] : {}, n = o.attrs || e,
                            r = n.href;
                        this.root.$emit("linktap", Object.assign({innerText: this.root.getText(o.children || [])}, n)), r && ("#" === r[0] ? this.root.navigateTo(r.substring(1)).catch((function () {
                        })) : r.split("?")[0].includes("://") ? this.root.copyLink && t.setClipboardData({
                            data: r,
                            success: function () {
                                return t.showToast({title: "链接已复制"})
                            }
                        }) : t.navigateTo({
                            url: r, fail: function () {
                                t.switchTab({
                                    url: r, fail: function () {
                                    }
                                })
                            }
                        }))
                    }, mediaError: function (t) {
                        var e = t.currentTarget.dataset.i, o = this.childs[e];
                        if ("video" === o.name || "audio" === o.name) {
                            var n = (this.ctrl[e] || 0) + 1;
                            if (n > o.src.length && (n = 0), n < o.src.length) return void this.$set(this.ctrl, e, n)
                        } else "img" === o.name && (this.opts[2] && this.$set(this.ctrl, e, -1), this.checkReady());
                        this.root && this.root.$emit("error", {source: o.name, attrs: o.attrs, errMsg: t.detail.errMsg})
                    }
                }
            };
            e.default = a
        }).call(this, o("df3c").default)
    }, d066: function (t, e, o) {
        e.a = function (t) {
            t.options.wxsCallMethods || (t.options.wxsCallMethods = [])
        }
    }
}]), (global.webpackJsonp = global.webpackJsonp || []).push(["uni_modules/mp-html/components/mp-html/node/node-create-component", {
    "uni_modules/mp-html/components/mp-html/node/node-create-component": function (t, e, o) {
        o("df3c").createComponent(o("5c88"))
    }
}, [["uni_modules/mp-html/components/mp-html/node/node-create-component"]]]);