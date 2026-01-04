require("./common/vendor.js"), (global.webpackJsonp = global.webpackJsonp || []).push([["pages/studio/details"], {
    "0dea": function (e, n, t) {
        var o = t("587b");
        t.n(o).a
    }, 4456: function (e, n, t) {
        (function (e, n) {
            var o = t("47a9");
            t("6686"), o(t("3240"));
            var i = o(t("8ca0"));
            e.__webpack_require_UNI_MP_PLUGIN__ = t, n(i.default)
        }).call(this, t("3223").default, t("df3c").createPage)
    }, "587b": function (e, n, t) {
    }, "75f5": function (e, n, t) {
        (function (e) {
            var o = t("47a9");
            Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
            var i = o(t("7eb4")), r = o(t("34cf")), a = o(t("ee10")), u = t("c4a0"), c = t("a418"), l = o(t("4b0e")),
                s = t("99d5"), d = {
                    components: {
                        PageContainer: function () {
                            Promise.all([t.e("common/vendor"), t.e("components/PageContainer")]).then(function () {
                                return resolve(t("9de0"))
                            }.bind(null, t)).catch(t.oe)
                        }, ContentTab: function () {
                            t.e("components/ContentTab").then(function () {
                                return resolve(t("ebef"))
                            }.bind(null, t)).catch(t.oe)
                        }, ConsultantItem: function () {
                            Promise.all([t.e("common/vendor"), t.e("components/consult/Consultant")]).then(function () {
                                return resolve(t("131f"))
                            }.bind(null, t)).catch(t.oe)
                        }, StudioPoster: function () {
                            Promise.all([t.e("common/vendor"), t.e("pages/studio/common/vendor"), t.e("pages/studio/components/StudioPoster")]).then(function () {
                                return resolve(t("3140"))
                            }.bind(null, t)).catch(t.oe)
                        }
                    }, setup: function () {
                        var n = (0, u.ref)({studioCoverImgList: [], studioName: '', studioOpenTime: '', studioDetail: '', summaryAddress: '', concatPhone: '', studioType: 0, locationLongitude: null, locationLatitude: null}), t = (0, u.ref)([]), o = (0, u.getCurrentInstance)(), d = (0, l.default)(),
                            f = (0, u.computed)((function () {
                                return [{text: "活动介绍", value: "details", visible: !0}, {
                                    text: "教练",
                                    value: "recommends",
                                    visible: t.value.length > 0
                                }].filter((function (e) {
                                    return e.visible
                                }))
                            })), m = (0, u.ref)("details");
                        return (0, c.onLoad)(function () {
                            var u = (0, a.default)(i.default.mark((function a(u) {
                                var c;
                                return i.default.wrap((function (i) {
                                    for (; ;) switch (i.prev = i.next) {
                                        case 0:
                                            return c = function () {
                                                return u.scene ? decodeURIComponent(u.scene).split("&").reduce((function (e, n) {
                                                    var t = n.split("="), o = (0, r.default)(t, 2), i = o[0], a = o[1];
                                                    return e[i] = a, e
                                                }), {}) : u
                                            }(), e.createIntersectionObserver(o.proxy).relativeToViewport().observe("#recommends", (function (e) {
                                                e.intersectionRatio > 0 ? m.value = "recommends" : m.value = "details"
                                            })), i.next = 6, (0, s.getStudioDetails)(c.id);
                                        case 6:
                                            return n.value = i.sent, console.log('Studio details loaded:', n.value), i.next = 9, (0, s.getStudioCounselorList)(c.id);
                                        case 9:
                                            t.value = i.sent, console.log('Counselor list loaded:', t.value), setTimeout((function() {
                                                var pageInstance = getCurrentPages()[getCurrentPages().length - 1];
                                                if (pageInstance && pageInstance.loadBookingStatus) {
                                                    pageInstance.loadBookingStatus();
                                                }
                                            }), 100);
                                        case 10:
                                        case"end":
                                            return i.stop()
                                    }
                                }), a)
                            })));
                            return function (e) {
                                return u.apply(this, arguments)
                            }
                        }()), {
                            navbar: d, details: n, tabs: f, tabActive: m, scollTo: function (n) {
                                e.pageScrollTo({selector: "#".concat(n)})
                            }, consultorList: t, call: function () {
                                e.makePhoneCall({phoneNumber: n.value.concatPhone})
                            }, openLocation: function () {
                                e.openLocation({
                                    longitude: +n.value.locationLongitude,
                                    latitude: +n.value.locationLatitude,
                                    success: console.log,
                                    fail: console.log
                                })
                            }, handleBooking: function () {
                                console.log('handleBooking called');
                                var studioId = n.value.studioId;
                                if (!studioId) {
                                    console.log('studioId is empty');
                                    e.showToast({title: '活动信息加载中', icon: 'none'});
                                    return;
                                }
                                // 检查登录状态
                                var loginManager = require('../../utils/loginManager.js');
                                if (!loginManager.isLogined()) {
                                    console.log('未登录');
                                    e.showToast({title: '请先登录', icon: 'none'});
                                    return;
                                }
                                // 检查手机号
                                var userInfo = loginManager.getInfo();
                                if (!userInfo.mobile) {
                                    e.showModal({
                                        title: '提示',
                                        content: '预约活动需要绑定手机号',
                                        confirmText: '去绑定',
                                        success: function (res) {
                                            if (res.confirm) {
                                                e.navigateTo({url: '/pages/consult/completeInfo'});
                                            }
                                        }
                                    });
                                    return;
                                }
                                // 调用预约接口
                                e.showLoading({title: '预约中...'});
                                var api = require('../../utils/api.js');
                                api.studioApi.bookStudio(studioId).then(function (res) {
                                    e.hideLoading();
                                    console.log('预约结果:', res);
                                    if (res.data && res.data.code === 200) {
                                        e.showToast({title: '预约成功', icon: 'success'});
                                    } else {
                                        e.showToast({title: res.data.message || '预约失败', icon: 'none'});
                                    }
                                }).catch(function (err) {
                                    e.hideLoading();
                                    console.error('预约失败:', err);
                                    e.showToast({title: '预约失败', icon: 'none'});
                                });
                            }
                        }
                    }, data: function () {
                        return {studioCoverImgListIndex: 0, showQrModal: false, bookingStatus: null}
                    }, methods: {
                        previewQrCode: function () {
                            this.showQrModal = true
                        },
                        closeQrModal: function () {
                            this.showQrModal = false
                        }
                            // 检查登录状态
                            var loginManager = require('../../utils/loginManager.js');
                            if (!loginManager.isLogined()) {
                                console.log('未登录，打开登录面板');
                                this.$refs.pageContainer.openLoginPanel();
                                return;
                            }
                            // 检查手机号绑定
                            var userInfo = loginManager.getInfo();
                            if (!userInfo.mobile) {
                                e.showModal({
                                    title: '提示',
                                    content: '预约活动需要绑定手机号，请先完善个人信息',
                                    confirmText: '去绑定',
                                    success: function (res) {
                                        if (res.confirm) {
                                            e.navigateTo({
                                                url: '/pages/consult/completeInfo'
                                            });
                                        }
                                    }
                                });
                                return;
                            }
                            // 如果是待支付状态，调起支付
                            if (n.bookingStatus && n.bookingStatus.status === 0) {
                                n.payForBooking(n.bookingStatus.bookingId);
                                return;
                            }
                            // 如果已预约，提示
                            if (n.bookingStatus && n.bookingStatus.status === 1) {
                                e.showToast({
                                    title: '您已预约该活动',
                                    icon: 'none'
                                });
                                return;
                            }
                            // 调用预约接口
                            n.bookStudio();
                        },
                        bookStudio: function () {
                            var n = this;
                            var studioId = n.details.studioId;
                            console.log('开始预约活动:', studioId);
                            e.showLoading({
                                title: '预约中...'
                            });
                            var api = require('../../utils/api.js');
                            api.studioApi.bookStudio(studioId).then(function (res) {
                                e.hideLoading();
                                console.log('预约结果:', res);
                                if (res.data.code === 200) {
                                    var data = res.data.data;
                                    if (data.isFree) {
                                        // 免费活动，直接预约成功
                                        e.showToast({
                                            title: '预约成功',
                                            icon: 'success'
                                        });
                                        n.bookingStatus = {
                                            status: 1,
                                            bookingId: data.bookingId
                                        };
                                    } else {
                                        // 收费活动，调起支付
                                        n.bookingStatus = {
                                            status: 0,
                                            bookingId: data.bookingId
                                        };
                                        n.payForBooking(data.bookingId);
                                    }
                                } else {
                                    e.showToast({
                                        title: res.data.message || '预约失败',
                                        icon: 'none'
                                    });
                                }
                            }).catch(function (err) {
                                e.hideLoading();
                                console.error('预约失败:', err);
                                e.showToast({
                                    title: '预约失败，请重试',
                                    icon: 'none'
                                });
                            });
                        },
                        payForBooking: function (bookingId) {
                            var n = this;
                            console.log('开始支付:', bookingId);
                            e.showLoading({
                                title: '获取支付参数...'
                            });
                            var api = require('../../utils/api.js');
                            api.studioApi.payForBooking(bookingId).then(function (res) {
                                e.hideLoading();
                                console.log('支付参数:', res);
                                if (res.data.code === 200) {
                                    var payParams = res.data.data;
                                    e.requestPayment({
                                        timeStamp: payParams.timeStamp,
                                        nonceStr: payParams.nonceStr,
                                        package: payParams.package,
                                        signType: payParams.signType,
                                        paySign: payParams.paySign,
                                        success: function () {
                                            e.showToast({
                                                title: '支付成功',
                                                icon: 'success'
                                            });
                                            n.bookingStatus = {
                                                status: 1,
                                                bookingId: bookingId
                                            };
                                        },
                                        fail: function (err) {
                                            console.error('支付失败:', err);
                                            if (err.errMsg.indexOf('cancel') > -1) {
                                                e.showToast({
                                                    title: '已取消支付',
                                                    icon: 'none'
                                                });
                                            } else {
                                                e.showToast({
                                                    title: '支付失败',
                                                    icon: 'none'
                                                });
                                            }
                                        }
                                    });
                                } else {
                                    e.showToast({
                                        title: res.data.message || '获取支付参数失败',
                                        icon: 'none'
                                    });
                                }
                            }).catch(function (err) {
                                e.hideLoading();
                                console.error('获取支付参数失败:', err);
                                e.showToast({
                                    title: '获取支付参数失败',
                                    icon: 'none'
                                });
                            });
                        },
                        loadBookingStatus: function () {
                            var n = this;
                            var studioId = n.details.studioId;
                            if (!studioId) return;
                            var loginManager = require('../../utils/loginManager.js');
                            if (!loginManager.isLogined()) return;
                            var api = require('../../utils/api.js');
                            api.studioApi.getBookingStatus(studioId).then(function (res) {
                                console.log('预约状态:', res);
                                if (res.data.code === 200 && res.data.data) {
                                    n.bookingStatus = res.data.data;
                                }
                            }).catch(function (err) {
                                console.error('获取预约状态失败:', err);
                            });
                        }
                    }
                };
            n.default = d
        }).call(this, t("df3c").default)
    }, "83c5": function (e, n, t) {
        t.d(n, "b", (function () {
            return i
        })), t.d(n, "c", (function () {
            return r
        })), t.d(n, "a", (function () {
            return o
        }));
        var o = {
            mpHtml: function () {
                return Promise.all([t.e("common/vendor"), t.e("uni_modules/mp-html/components/mp-html/mp-html")]).then(t.bind(null, "bdf5"))
            }
        }, i = function () {
            var e = this,
                n = (e.$createElement, e._self._c, e.details.studioCoverImgList ? e.details.studioCoverImgList.length : null),
                o = 0 === e.details.studioType && e.details.summaryAddress && e.details.locationLongitude && e.details.locationLatitude ? t("fd98") : null,
                i = e.consultorList.length,
                r = e.$refs.pageContainer && e.$refs.pageContainer.isShowAdviser && e.$refs.pageContainer.isShowAdviser();
            e._isMounted || (e.e0 = function (n) {
                e.studioCoverImgListIndex = n.detail.current
            }, e.e1 = function (n) {
                return e.$refs.studioPoster.open(e.details)
            }, e.e2 = function (n) {
                e.tabActive = n, e.scollTo(n)
            }, e.e3 = function (n) {
                return e.$refs.pageContainer.openAdviser()
            }), e.$mp.data = Object.assign({}, {$root: {g0: n, m0: o, g1: i, g2: r}})
        }, r = []
    }, "8ca0": function (e, n, t) {
        t.r(n);
        var o = t("83c5"), i = t("d5a5");
        for (var r in i) ["default"].indexOf(r) < 0 && function (e) {
            t.d(n, e, (function () {
                return i[e]
            }))
        }(r);
        t("0dea");
        var a = t("828b"), u = Object(a.a)(i.default, o.b, o.c, !1, null, "a87f5706", null, !1, o.a, void 0);
        n.default = u.exports
    }, d5a5: function (e, n, t) {
        t.r(n);
        var o = t("75f5"), i = t.n(o);
        for (var r in o) ["default"].indexOf(r) < 0 && function (e) {
            t.d(n, e, (function () {
                return o[e]
            }))
        }(r);
        n.default = i.a
    }
}, [["4456", "common/runtime", "common/vendor", "pages/studio/common/vendor"]]]);