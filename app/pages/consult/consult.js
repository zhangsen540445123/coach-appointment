require("../../@babel/runtime/helpers/Objectvalues"), require("../../@babel/runtime/helpers/Arrayincludes"), (global.webpackJsonp = global.webpackJsonp || []).push([
    ["pages/consult/consult"], {
        1728: function(e, t, n) {
            n.r(t);
            var o = n("d3bc"),
                a = n.n(o);
            for (var r in o)["default"].indexOf(r) < 0 && function(e) {
                n.d(t, e, (function() {
                    return o[e]
                }))
            }(r);
            t.default = a.a
        },
        "1aa7": function(e, t, n) {
            n.d(t, "b", (function() {
                return a
            })), n.d(t, "c", (function() {
                return r
            })), n.d(t, "a", (function() {
                return o
            }));
            var o = {
                    HMFilterDropdown: function() {
                        return Promise.all([n.e("common/vendor"), n.e("uni_modules/HM-filterDropdown/components/HM-filterDropdown/HM-filterDropdown")]).then(n.bind(null, "cb82"))
                    },
                    uniPopup: function() {
                        return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null, "61d1"))
                    }
                },
                a = function() {
                    var e = this,
                        t = (e.$createElement, e._self._c, n("3eee")),
                        o = n("ff2d"),
                        a = e.$refs.pageContainer.isShowAdviser && e.$refs.pageContainer.isShowAdviser(),
                        r = a ? n("f379") : null,
                        i = n("d344");
                    e._isMounted || (e.e0 = function(t) {
                        return e.$refs.pageContainer.openAdviser()
                    }), e.$mp.data = Object.assign({}, {
                        $root: {
                            m0: t,
                            m1: o,
                            g0: a,
                            m2: r,
                            m3: i
                        }
                    })
                },
                r = []
        },
        d3bc: function(e, t, n) {
            (function(e) {
                var o = n("47a9");
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.default = void 0;
                var a = o(n("7eb4")),
                    r = o(n("af34")),
                    i = o(n("ee10")),
                    s = n("9359"),
                    l = (n("90c1"), o(n("d32f"))),
                    u = o(n("4b0e")),
                    c = n("acbb"),
                    f = n("2052"),
                    d = {
                        setup: function() {
                            return {
                                navbar: (0, u.default)()
                            }
                        },
                        components: {
                            PageContainer: function() {
                                Promise.all([n.e("common/vendor"), n.e("components/PageContainer")]).then(function() {
                                    return resolve(n("9de0"))
                                }.bind(null, n)).catch(n.oe)
                            },
                            Navbar: function() {
                                Promise.all([n.e("common/vendor"), n.e("components/Navbar")]).then(function() {
                                    return resolve(n("8412"))
                                }.bind(null, n)).catch(n.oe)
                            },
                            PaymentReminder: function() {
                                Promise.all([n.e("common/vendor"), n.e("components/PaymentReminder")]).then(function() {
                                    return resolve(n("01b2"))
                                }.bind(null, n)).catch(n.oe)
                            },
                            KeyFeatureZone: function() {
                                Promise.all([n.e("common/vendor"), n.e("components/KeyFeatureZone")]).then(function() {
                                    return resolve(n("fa08"))
                                }.bind(null, n)).catch(n.oe)
                            },
                            ZhixunGuide: function() {
                                Promise.all([n.e("common/vendor"), n.e("components/HomePage/ZhixunGuide")]).then(function() {
                                    return resolve(n("bb04"))
                                }.bind(null, n)).catch(n.oe)
                            },
                            ConsultantItem: function() {
                                Promise.all([n.e("common/vendor"), n.e("components/consult/Consultant")]).then(function() {
                                    return resolve(n("131f"))
                                }.bind(null, n)).catch(n.oe)
                            }
                        },
                        data: function() {
                            return {
                                indexSearchBar: "padding-top: " + (2 * this.StatusBar + 20) + "px",
                                scrollTop: 0,
                                oldScrollTop: 0,
                                banners: [],
                                formData: {
                                    name: null,
                                    shortcut: null,
                                    filter: null,
                                    pager: {
                                        index: 1,
                                        size: 7
                                    }
                                },
                                seachData: {
                                    consultTypeList: [],
                                    serviceType: null,
                                    sexList: null,
                                    priceList: [],
                                    consultTimeList: [],
                                    troubleList: [],
                                    address: null,
                                    sort: null,
                                    consultWay: 0,
                                    direction: null
                                },
                                totalPages: 0,
                                orderNo: null,
                                chooseOnFace: !1,
                                counselorList: [],
                                filterData: [],
                                registerDialog: !1,
                                notifyDialogInfo: {},
                                inLoadmore: !1
                            }
                        },
                        onShareAppMessage: function(e) {
                            return {
                                title: "悦行教练",
                                path: "/pages/consult/consult"
                            }
                        },
                        onLoad: function() {
                            var self = this;
                            // 从后端API获取筛选配置
                            this.loadFilterConfig().then(function() {
                                self.formData.pager.index = 1;
                                self.counselorUserList();
                            }).catch(function(err) {
                                console.error('加载筛选配置失败，使用默认配置:', err);
                                self.filterData = l.default;
                                self.formData.pager.index = 1;
                                self.counselorUserList();
                            });
                        },
                        onShow: function() {
                            // [修复] 预约咨询页面无需登录，移除自动登录调用
                            this.$refs.paymentReminder && this.$refs.paymentReminder.updateInfo()
                                // 原代码已移除: setTimeout(() => refreshLoginInfo(), 500)
                        },
                        computed: {},
                        onReachBottom: function() {
                            console.log("wer"), this.loadMore()
                        },
                        onPullDownRefresh: function() {
                            var t = this;
                            return (0, i.default)(a.default.mark((function n() {
                                return a.default.wrap((function(n) {
                                    for (;;) switch (n.prev = n.next) {
                                        case 0:
                                            return t.formData.pager.index = 1, n.next = 3, t.counselorUserList();
                                        case 3:
                                            t.$refs.paymentReminder && t.$refs.paymentReminder.updateInfo(), e.stopPullDownRefresh();
                                        case 5:
                                        case "end":
                                            return n.stop()
                                    }
                                }), n)
                            })))()
                        },
                        methods: {
                            loadFilterConfig: function() {
                                var self = this;
                                return new Promise(function(resolve, reject) {
                                    var loginManager = require('../../utils/loginManager');
                                    wx.request({
                                        url: loginManager.BASE_URL + '/api/filter/config',
                                        method: 'GET',
                                        success: function(res) {
                                            console.log('筛选配置响应:', res);
                                            if (res.data && res.data.code === 200 && res.data.data && res.data.data.filterData) {
                                                self.filterData = res.data.data.filterData;
                                                console.log('从后端加载筛选配置成功:', self.filterData);
                                                resolve();
                                            } else {
                                                console.warn('筛选配置数据格式不正确，使用默认配置');
                                                self.filterData = l.default;
                                                resolve();
                                            }
                                        },
                                        fail: function(err) {
                                            console.error('获取筛选配置失败:', err);
                                            reject(err);
                                        }
                                    });
                                });
                            },
                            confirm: function(e) {
                                // 新的筛选结构：[话题方向, 排序]
                                // e.value[0][0][0] = 话题方向值 (null 或 "身心健康" 等)
                                // e.value[1][0][0] = 排序值 (0=推荐排序, 1=低价优先, 2=高价优先, 3=近期可预约优先)
                                var direction = e.value[0] && e.value[0][0] ? e.value[0][0][0] : null,
                                    sortValue = e.value[1] && e.value[1][0] ? e.value[1][0][0] : 0;

                                // 设置筛选条件
                                this.seachData.direction = direction;
                                this.seachData.sort = sortValue;
                                // 清空其他不再使用的筛选条件
                                this.seachData.consultTypeList = [];
                                this.seachData.serviceType = [];
                                this.seachData.sexList = [];
                                this.seachData.priceList = null;
                                this.seachData.consultTimeList = [];
                                this.seachData.troubleList = [];
                                this.seachData.address = null;
                                this.seachData.consultWay = null;

                                this.formData.filter = this.seachData;
                                this.formData.name = null;
                                this.formData.shortcut = null;
                                this.resetIndex();
                                this.counselorUserList();
                            },
                            searchCounselorByName: function() {
                                this.formData.shortcut = null, this.formData.filter = null, this.resetIndex(), this.counselorUserList()
                            },
                            resetIndex: function() {
                                this.formData.pager.index = 1
                            },
                            toSearchCounselorList: function(e) {
                                this.formData.shortcut === e ? this.formData.shortcut = null : this.formData.shortcut = e, this.formData.filter = null, this.formData.name = null, this.resetIndex(), this.counselorUserList()
                            },
                            checkConsultType: function(e) {
                                var t = [];
                                if (e.length > 0)
                                    for (var n = 0; n < e.length; n++) 0 === e[n] ? t.push("网络") : 1 === e[n] ? t.push("低价") : 2 === e[n] ? t.push("地面") : 3 === e[n] && t.push("青少年父母");
                                return t.length > 0 ? t.join(" | ") : ""
                            },
                            getBannerList: function() {
                                var e = this;
                                (0, s.irequestdata)({
                                    url: "/orderConsult/getCarousel",
                                    method: "get",
                                    success: function(t) {
                                        200 === t.data.code && t.data.data.length > 0 ? e.banners = t.data.data : e.banners = []
                                    },
                                    error: function() {
                                        console.log("新增失败")
                                    }
                                })
                            },
                            getAddressList: function() {
                                var e = this;
                                return (0, i.default)(a.default.mark((function t() {
                                    var n, o;
                                    return a.default.wrap((function(t) {
                                        for (;;) switch (t.prev = t.next) {
                                            case 0:
                                                return n = e, t.next = 3, (0, c.getCurrentCity)();
                                            case 3:
                                                o = t.sent, (0, s.irequestdata)({
                                                    url: "/orderConsult/getCityList",
                                                    method: "get",
                                                    success: function(e) {
                                                        if (200 === e.data.code && e.data.data.length > 0) {
                                                            var t = {
                                                                name: "城市",
                                                                type: "radio",
                                                                submenu: [{
                                                                    name: "推荐",
                                                                    submenu: [o ? {
                                                                        name: o.city,
                                                                        value: "".concat(o.province, "---").concat(o.city),
                                                                        tip: "当前城市",
                                                                        icon: "cuIcon-locationfill"
                                                                    } : null, {
                                                                        name: "不限城市",
                                                                        value: "全部",
                                                                        all: !0
                                                                    }].filter((function(e) {
                                                                        return e
                                                                    }))
                                                                }, {
                                                                    name: "热门城市",
                                                                    submenu: e.data.data.reduce((function(e, t) {
                                                                        return "全部" !== t.name && e.push.apply(e, (0, r.default)(t.submenu.map((function(e) {
                                                                            return {
                                                                                name: e.name,
                                                                                value: "".concat(t.value, "---").concat(e.value)
                                                                            }
                                                                        })))), e
                                                                    }), [])
                                                                }]
                                                            };
                                                            n.filterData.splice(0, 1, t)
                                                        }
                                                    },
                                                    error: function() {
                                                        console.log("新增失败")
                                                    }
                                                });
                                            case 5:
                                            case "end":
                                                return t.stop()
                                        }
                                    }), t)
                                })))()
                            },
                            gotoFeedback: function() {
                                e.navigateTo({
                                    url: "/pages/appointment/feedback?orderNo=" + this.orderNo
                                }), this.dialogClose()
                            },
                            scrollChange: function(e) {
                                this.oldScrollTop = e.detail.scrollTop
                            },
                            toTop: function() {
                                console.log("1234"), e.pageScrollTo({
                                    scrollTop: 0
                                })
                            },
                            dialogClose: function() {
                                this.$refs.toPayDialog.close()
                            },
                            showDialog: function() {
                                this.$refs.toPayDialog.open("center")
                            },
                            counselorUserList: function() {
                                var t = this,
                                    n = this;
                                console.log("---\x3e>", this.formData), (0, s.irequestdata)({
                                    url: "/orderConsult/filter",
                                    method: "post",
                                    data: this.formData,
                                    success: function(o) {
                                        console.log(o), 200 === o.data.code && o.data.data.list.length > 0 ? (console.log(",,,---\x3e", o.data.data.list), n.counselorList = o.data.data.list, n.totalPages = o.data.data.pages, n.notifyDialogInfo = o.data.data.notify_dialog_info, n.notifyDialogInfo && n.notifyDialogInfo.imageUrl && t.$refs.notifyDialog.open("center")) : (n.counselorList = [], n.totalPages = 0, e.showToast({
                                            title: "你筛选的条件暂时无匹配到的教练，请更换筛选条件再次匹配",
                                            icon: "none"
                                        }))
                                    },
                                    error: function() {
                                        console.log("新增失败")
                                    }
                                })
                            },
                            handleNotifyDialogClick: function() {
                                console.log(this.notifyDialogInfo.openUrl), this.notifyDialogInfo.openUrl && "" !== this.notifyDialogInfo.openUrl ? e.navigateTo({
                                    url: this.notifyDialogInfo.openUrl
                                }) : this.$refs.notifyDialog.close("center")
                            },
                            loadMore: function() {
                                var e = this;
                                if (clearTimeout(this.loadMore._timeoutId), this.formData.pager.index < this.totalPages) {
                                    this.inLoadmore = !0, this.formData.pager.index = this.formData.pager.index + 1;
                                    var t = this;
                                    this.loadMore._timeoutId = setTimeout((function() {
                                        (0, s.irequestdata)({
                                            url: "/orderConsult/filter",
                                            method: "post",
                                            data: e.formData,
                                            success: function(n) {
                                                200 === n.data.code && n.data.data.list.length > 0 && (t.counselorList = t.counselorList.concat(n.data.data.list), t.totalPages = n.data.data.pages), e.inLoadmore = !1
                                            },
                                            error: function() {
                                                console.log("新增失败"), e.inLoadmore = !1
                                            }
                                        })
                                    }), 500)
                                }
                            }
                        }
                    };
                t.default = d
            }).call(this, n("df3c").default)
        },
        e252: function(e, t, n) {
            (function(e, t) {
                var o = n("47a9");
                n("6686"), o(n("3240"));
                var a = o(n("f643"));
                e.__webpack_require_UNI_MP_PLUGIN__ = n, t(a.default)
            }).call(this, n("3223").default, n("df3c").createPage)
        },
        f643: function(e, t, n) {
            n.r(t);
            var o = n("1aa7"),
                a = n("1728");
            for (var r in a)["default"].indexOf(r) < 0 && function(e) {
                n.d(t, e, (function() {
                    return a[e]
                }))
            }(r);
            n("83bc");
            var i = n("828b"),
                s = Object(i.a)(a.default, o.b, o.c, !1, null, "64ec1c54", null, !1, o.a, void 0);
            t.default = s.exports
        }
    },
    [
        ["e252", "common/runtime", "common/vendor"]
    ]
]);