// ============ 全局配置 - 修改此处即可更换环境 ============
var __APP_CONFIG__ = {
    // 开发环境
    // baseUrl: "https://localhost/api",
    // imageBaseUrl: "https://localhost/api/file/image",

    // 生产环境 - 发布时取消注释下面两行，注释上面两行
    baseUrl: "https://localhost/api",
    imageBaseUrl: "https://localhost/api/file/image",

    appId: "wxd3578c75e67172b3"
};
// ========================================================
(global.webpackJsonp = global.webpackJsonp || []).push([
    ["pages/studio/common/vendor"], {
        "8e2a": function(t, e) {
            t.exports = __APP_CONFIG__.imageBaseUrl  +  "/studio-poster-bg@3x.png"
        },
        "99d5": function(t, e, r) {
            var n = r("47a9");
            Object.defineProperty(e, "__esModule", { value: !0 }), e.getStudioList = e.getStudioDetails = e.getStudioCounselorList = void 0;
            var u = n(r("7eb4")),
                a = n(r("7ca3")),
                o = n(r("ee10")),
                s = n(r("8138"));

            function i(t, e) {
                var r = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(t);
                    e && (n = n.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function c(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var r = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? i(Object(r), !0).forEach((function(e) {
                        (0, a.default)(t, e, r[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : i(Object(r)).forEach((function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e))
                    }))
                }
                return t
            }

            var d = function() {
                var t = (0, o.default)(u.default.mark((function t() {
                    var e;
                    return u.default.wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return t.next = 2, (0, s.default)({
                                    url: "/consultStudio/list",
                                    method: "post",
                                    data: { pager: { index: 1, size: 100 } }
                                });
                            case 2:
                                return e = t.sent, t.abrupt("return", c(c({}, e.data.data), {}, {
                                    list: e.data.data.list.map((function(t) {
                                        return c(c({}, t), {}, { studioCoverImgList: JSON.parse(t.studioCoverImgList || "[]") })
                                    }))
                                }));
                            case 4:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })));
                return function() {
                    return t.apply(this, arguments)
                }
            }();
            e.getStudioList = d;
            var p = function() {
                var t = (0, o.default)(u.default.mark((function t(e) {
                    var r;
                    return u.default.wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return t.next = 2, (0, s.default)({
                                    url: "/consultStudio/info",
                                    method: "post",
                                    data: { studioId: e }
                                });
                            case 2:
                                return r = t.sent, t.abrupt("return", c(c({}, r.data.data.consultStudio), {}, { studioCoverImgList: JSON.parse(r.data.data.consultStudio.studioCoverImgList || "[]") }));
                            case 4:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })));
                return function(e) {
                    return t.apply(this, arguments)
                }
            }();
            e.getStudioDetails = p;
            var l = function() {
                var t = (0, o.default)(u.default.mark((function t(e) {
                    var r;
                    return u.default.wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return t.next = 2, (0, s.default)({
                                    url: "/consultStudio/counselorList",
                                    method: "post",
                                    data: { studioId: e, pager: { index: 1, size: 20 } }
                                });
                            case 2:
                                return r = t.sent, t.abrupt("return", r.data.data.counselorList || []);
                            case 4:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })));
                return function(e) {
                    return t.apply(this, arguments)
                }
            }();
            e.getStudioCounselorList = l
        },
        fd98: function(t, e) {
            t.exports = __APP_CONFIG__.imageBaseUrl  + "/导航2.png"
        }
    }
]);