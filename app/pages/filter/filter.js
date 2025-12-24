require("../../@babel/runtime/helpers/Objectvalues"), require("../../@babel/runtime/helpers/Arrayincludes"), require("./common/vendor.js"), (global.webpackJsonp = global.webpackJsonp || []).push([
    ["pages/filter/filter"], {
        "37ac": function(t, e, n) {
            n.d(e, "b", (function() {
                return a
            })), n.d(e, "c", (function() {
                return r
            })), n.d(e, "a", (function() {
                return o
            }));
            var o = {
                    HMFilterDropdown: function() {
                        return Promise.all([n.e("common/vendor"), n.e("uni_modules/HM-filterDropdown/components/HM-filterDropdown/HM-filterDropdown")]).then(n.bind(null, "cb82"))
                    }
                },
                a = function() {
                    var t = this,
                        e = (t.$createElement, t._self._c, t.$refs.pageContainer.isShowAdviser && t.$refs.pageContainer.isShowAdviser()),
                        o = e ? n("f379") : null;
                    t._isMounted || (t.e0 = function(e) {
                        return t.$refs.pageContainer.openAdviser()
                    }), t.$mp.data = Object.assign({}, {
                        $root: {
                            g0: e,
                            m0: o
                        }
                    })
                },
                r = []
        },
        "4d2c": function(t, e, n) {
            (function(t) {
                var o = n("47a9");
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.default = void 0;
                var a = o(n("7eb4")),
                    r = o(n("af34")),
                    i = o(n("ee10")),
                    s = n("c4a0"),
                    l = n("9359"),
                    u = o(n("d32f")),
                    c = o(n("4b0e")),
                    f = n("acbb"),
                    d = o(n("6eb3")),
                    h = o(n("946a")),
                    p = o(n("2205")),
                    m = o(n("91c1")),
                    g = {
                        setup: function() {
                            return {
                                navbarc: (0, c.default)(),
                                bg: (0, s.ref)(null),
                                isTop: (0, s.ref)(!0)
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
                                        size: 100
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
                                    direction: null,
                                    directions: null
                                },
                                shortcutValue: null, // 保存原始 shortcut 值
                                totalPages: 0,
                                orderNo: null,
                                chooseOnFace: !1,
                                counselorList: [],
                                filterData: [],
                                registerDialog: !1,
                                notifyDialogInfo: {}
                            }
                        },
                        onShareAppMessage: function(t) {
                            return {
                                title: "悦行教练",
                                path: "/pages/consult/consult"
                            }
                        },
                        onLoad: function(t) {
                            var e = this;
                            return (0, i.default)(a.default.mark((function n() {
                                return a.default.wrap((function(n) {
                                    for (;;) switch (n.prev = n.next) {
                                        case 0:
                                            // 使用默认数据作为后备，然后尝试从后端加载
                                            e.filterData = u.default;
                                            e.loadFilterConfig();
                                            e.formData.pager.index = 1;
                                            e.bg = {
                                                "近期可约": d.default,
                                                "低价咨询": h.default,
                                                "线下咨询": p.default,
                                                "青少年父母": m.default
                                            }[t.mode];
                                            // 保存原始 shortcut 值，用于初始化 sort 选项
                                            e.shortcutValue = +t.shortcut;
                                            // 保持 shortcut 值传递给后端
                                            e.formData.shortcut = +t.shortcut;
                                            // 初始化 filter 对象，根据 shortcut 设置默认排序
                                            // shortcut: 0=近期可约, 1=低价咨询, 2=线下咨询, 3=青少年父母
                                            // sort: 0=推荐排序, 1=低价优先, 2=高价优先, 3=近期可预约优先
                                            var defaultSort = 0;
                                            if (e.shortcutValue === 0) {
                                                // 近期可约 -> 近期可预约优先
                                                defaultSort = 3;
                                            } else if (e.shortcutValue === 1) {
                                                // 低价咨询 -> 低价优先
                                                defaultSort = 1;
                                            }
                                            e.seachData.sort = defaultSort;
                                            e.seachData.consultTypeList = [];
                                            e.seachData.serviceType = [];
                                            e.seachData.sexList = [];
                                            e.seachData.priceList = null;
                                            e.seachData.consultTimeList = [];
                                            e.seachData.troubleList = [];
                                            e.seachData.address = null;
                                            e.seachData.consultWay = null;
                                            e.seachData.direction = null;
                                            e.seachData.directions = null;
                                            e.formData.filter = e.seachData;
                                            n.next = 17;
                                            return e.counselorUserList();
                                        case 17:
                                        case "end":
                                            return n.stop()
                                    }
                                }), n)
                            })))()
                        },
                        onReachBottom: function() {
                            console.log("wer"), this.loadMore()
                        },
                        onPullDownRefresh: function() {
                            var e = this;
                            return (0, i.default)(a.default.mark((function n() {
                                return a.default.wrap((function(n) {
                                    for (;;) switch (n.prev = n.next) {
                                        case 0:
                                            return e.formData.pager.index = 1, n.next = 3, e.counselorUserList();
                                        case 3:
                                            t.stopPullDownRefresh();
                                        case 4:
                                        case "end":
                                            return n.stop()
                                    }
                                }), n)
                            })))()
                        },
                        onPageScroll: function(t) {
                            this.isTop = t.scrollTop <= 0
                        },
                        methods: {
                            loadFilterConfig: function() {
                                var self = this;
                                (0, l.irequestdata)({
                                    url: '/filter/config',
                                    method: 'GET',
                                    success: function(res) {
                                        console.log('筛选配置响应:', res);
                                        if (res.data && res.data.code === 200 && res.data.data && res.data.data.filterData) {
                                            self.filterData = res.data.data.filterData;
                                            console.log('从后端加载筛选配置成功:', self.filterData);
                                        } else {
                                            console.warn('筛选配置数据格式不正确，使用默认配置');
                                            self.filterData = u.default;
                                        }
                                    },
                                    fail: function(err) {
                                        console.error('获取筛选配置失败，使用默认配置:', err);
                                        self.filterData = u.default;
                                    }
                                });
                            },
                            confirm: function(e) {
                                // 新的筛选结构：[话题方向(多选filter), 排序(单选radio)]
                                // 对于 filter 类型：e.value[0][0] 已经是转换后的 value 数组 (如 ["身心健康", "人际关系"])
                                // 对于 radio 类型：e.value[1][0][0] = 排序值
                                console.log('confirm e.value:', JSON.stringify(e.value));
                                console.log('confirm e.index:', JSON.stringify(e.index));

                                // 获取话题方向的多选值
                                // HM-filterDropdown 的 confirm 方法已将索引转换为 value
                                // e.value[0][0] 直接就是 value 数组
                                var directions = [];
                                if (e.value[0] && e.value[0][0] && Array.isArray(e.value[0][0])) {
                                    // filter 类型：e.value[0][0] 已经是转换后的 value 数组
                                    for (var i = 0; i < e.value[0][0].length; i++) {
                                        var val = e.value[0][0][i];
                                        if (val !== null && val !== undefined) {
                                            directions.push(val);
                                        }
                                    }
                                }

                                var sortValue = e.value[1] && e.value[1][0] ? e.value[1][0][0] : 0;
                                console.log('directions:', JSON.stringify(directions), 'sortValue:', sortValue);

                                // 设置筛选条件 - directions 为数组
                                this.seachData.directions = directions.length > 0 ? directions : null;
                                this.seachData.direction = null; // 清除旧的单选字段
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
                                // 保持原始 shortcut 值
                                this.formData.shortcut = this.shortcutValue;
                                this.resetIndex();
                                this.counselorUserList();
                            },
                            searchCounselorByName: function() {
                                // 搜索时保持 shortcut 值
                                this.formData.shortcut = this.shortcutValue;
                                this.seachData.directions = null;
                                this.seachData.direction = null;
                                this.seachData.sort = 0;
                                this.formData.filter = this.seachData;
                                this.resetIndex();
                                this.counselorUserList();
                            },
                            resetIndex: function() {
                                this.formData.pager.index = 1
                            },
                            toSearchCounselorList: function(t) {
                                // 快捷方式筛选时保持 shortcut 值
                                this.formData.shortcut = this.shortcutValue;
                                this.formData.name = null;
                                // 根据快捷方式设置默认排序
                                var defaultSort = 0;
                                if (t === 0) {
                                    // 近期可约 -> 近期可预约优先
                                    defaultSort = 3;
                                } else if (t === 1) {
                                    // 低价咨询 -> 低价优先
                                    defaultSort = 1;
                                }
                                this.seachData.sort = defaultSort;
                                this.seachData.directions = null;
                                this.seachData.direction = null;
                                this.formData.filter = this.seachData;
                                this.resetIndex();
                                this.counselorUserList();
                            },
                            getAddressList: function() {
                                var t = this;
                                return (0, i.default)(a.default.mark((function e() {
                                    var n, o;
                                    return a.default.wrap((function(e) {
                                        for (;;) switch (e.prev = e.next) {
                                            case 0:
                                                return n = t, e.next = 3, (0, f.getCurrentCity)();
                                            case 3:
                                                o = e.sent, (0, l.irequestdata)({
                                                    url: "/orderConsult/getCityList",
                                                    method: "get",
                                                    success: function(t) {
                                                        if (200 === t.data.code && t.data.data.length > 0) {
                                                            var e = {
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
                                                                    }].filter((function(t) {
                                                                        return t
                                                                    }))
                                                                }, {
                                                                    name: "热门城市",
                                                                    submenu: t.data.data.reduce((function(t, e) {
                                                                        return "全部" !== e.name && t.push.apply(t, (0, r.default)(e.submenu.map((function(t) {
                                                                            return {
                                                                                name: t.name,
                                                                                value: "".concat(e.value, "---").concat(t.value)
                                                                            }
                                                                        })))), t
                                                                    }), [])
                                                                }]
                                                            };
                                                            n.filterData.splice(0, 1, e)
                                                        }
                                                    },
                                                    error: function() {
                                                        console.log("新增失败")
                                                    }
                                                });
                                            case 5:
                                            case "end":
                                                return e.stop()
                                        }
                                    }), e)
                                })))()
                            },
                            gotoFeedback: function() {
                                t.navigateTo({
                                    url: "/pages/appointment/feedback?orderNo=" + this.orderNo
                                }), this.dialogClose()
                            },
                            scrollChange: function(t) {
                                this.oldScrollTop = t.detail.scrollTop
                            },
                            toTop: function() {
                                console.log("1234"), t.pageScrollTo({
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
                                var e = this,
                                    n = this;
                                console.log("---\x3e>", this.formData), (0, l.irequestdata)({
                                    url: "/orderConsult/filter",
                                    method: "post",
                                    data: this.formData,
                                    success: function(o) {
                                        console.log(o), 200 === o.data.code && o.data.data.list.length > 0 ? (console.log(",,,---\x3e", o.data.data.list), n.counselorList = o.data.data.list, n.totalPages = o.data.data.pages, n.notifyDialogInfo = o.data.data.notify_dialog_info, n.notifyDialogInfo && n.notifyDialogInfo.imageUrl && e.$refs.notifyDialog.open("center")) : (n.counselorList = [], n.totalPages = 0, t.showToast({
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
                                console.log(this.notifyDialogInfo.openUrl), this.notifyDialogInfo.openUrl && "" !== this.notifyDialogInfo.openUrl ? t.navigateTo({
                                    url: this.notifyDialogInfo.openUrl
                                }) : this.$refs.notifyDialog.close("center")
                            },
                            loadMore: function() {
                                var e = this;
                                if (this.formData.pager.index < this.totalPages) {
                                    t.showLoading({
                                        title: "加载中"
                                    }), this.formData.pager.index = this.formData.pager.index + 1;
                                    var n = this;
                                    setTimeout((function() {
                                        (0, l.irequestdata)({
                                            url: "/orderConsult/filter",
                                            method: "post",
                                            data: e.formData,
                                            success: function(e) {
                                                200 === e.data.code && e.data.data.list.length > 0 && (n.counselorList = n.counselorList.concat(e.data.data.list), n.totalPages = e.data.data.pages, t.hideLoading())
                                            },
                                            error: function() {
                                                console.log("新增失败")
                                            }
                                        })
                                    }), 500)
                                }
                            }
                        }
                    };
                e.default = g
            }).call(this, n("df3c").default)
        },
        a813: function(t, e, n) {
            n.r(e);
            var o = n("37ac"),
                a = n("e3be");
            for (var r in a)["default"].indexOf(r) < 0 && function(t) {
                n.d(e, t, (function() {
                    return a[t]
                }))
            }(r);
            n("fe31");
            var i = n("828b"),
                s = Object(i.a)(a.default, o.b, o.c, !1, null, "4021c372", null, !1, o.a, void 0);
            e.default = s.exports
        },
        e3be: function(t, e, n) {
            n.r(e);
            var o = n("4d2c"),
                a = n.n(o);
            for (var r in o)["default"].indexOf(r) < 0 && function(t) {
                n.d(e, t, (function() {
                    return o[t]
                }))
            }(r);
            e.default = a.a
        },
        fb30: function(t, e, n) {
            (function(t, e) {
                var o = n("47a9");
                n("6686"), o(n("3240"));
                var a = o(n("a813"));
                t.__webpack_require_UNI_MP_PLUGIN__ = n, e(a.default)
            }).call(this, n("3223").default, n("df3c").createPage)
        }
    },
    [
        ["fb30", "common/runtime", "common/vendor", "pages/filter/common/vendor"]
    ]
]);