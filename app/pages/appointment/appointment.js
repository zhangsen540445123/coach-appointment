require("../../@babel/runtime/helpers/Arrayincludes"), (global.webpackJsonp = global.webpackJsonp || []).push([
    ["pages/appointment/appointment"], {
        "153a": function(t, e, a) {
            a.r(e);
            var o = a("16dd"),
                n = a("1fe5");
            for (var i in n)["default"].indexOf(i) < 0 && function(t) {
                a.d(e, t, (function() {
                    return n[t]
                }))
            }(i);
            a("ee6b");
            var s = a("828b"),
                r = Object(s.a)(n.default, o.b, o.c, !1, null, "0c52853b", null, !1, o.a, void 0);
            e.default = r.exports
        },
        "16dd": function(t, e, a) {
            a.d(e, "b", (function() {
                return n
            })), a.d(e, "c", (function() {
                return i
            })), a.d(e, "a", (function() {
                return o
            }));
            var o = {
                    uniPopup: function() {
                        return a.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(a.bind(null, "61d1"))
                    }
                },
                n = function() {
                    var t = this,
                        e = (t.$createElement, t._self._c, a("42d6")),
                        o = a("42d6"),
                        n = t.dataList.length,
                        i = n <= 0 ? null : t.__map(t.dataList, (function(e, a) {
                            var o = t.__get_orig(e),
                                n = t.ConsultType.parseText(e.consultType),
                                i = t.orderStatusDesc(e.orderStatus),
                                s = 0 === e.orderStatus && t.cancelTimec.getText(e.orderId);
                            return {
                                $orig: o,
                                g1: n,
                                m2: i,
                                g2: s,
                                g3: s ? t.cancelTimec.getText(e.orderId) : null,
                                g4: [0].includes(e.orderStatus),
                                g5: [1, 2, 3, 4].includes(e.orderStatus),
                                g6: [2, 3, 4].includes(e.orderStatus)
                            }
                        })),
                        s = a("d344"),
                        r = a("d344"),
                        l = 1 === t.checkStatus ? a("1d4f") : null,
                        c = 1 !== t.checkStatus ? a("7a32") : null,
                        u = a("d344"),
                        d = 1 === t.checkStatus ? a("1d4f") : null,
                        h = 1 !== t.checkStatus ? a("7a32") : null,
                        f = a("d344"),
                        g = t.__map(t.selectedOrderLists, (function(e, a) {
                            return {
                                $orig: t.__get_orig(e),
                                m11: t.checkConsultType(e.consultType)
                            }
                        })),
                        p = 1 === t.protocolCheckStatus ? a("1d4f") : null,
                        m = 1 !== t.protocolCheckStatus ? a("7a32") : null,
                        T = t.selectedOrderLists.length;
                    t.$mp.data = Object.assign({}, {
                        $root: {
                            m0: e,
                            m1: o,
                            g0: n,
                            l0: i,
                            m3: s,
                            m4: r,
                            m5: l,
                            m6: c,
                            m7: u,
                            m8: d,
                            m9: h,
                            m10: f,
                            l1: g,
                            m12: p,
                            m13: m,
                            g7: T
                        }
                    })
                },
                i = []
        },
        "1fe5": function(t, e, a) {
            a.r(e);
            var o = a("af09"),
                n = a.n(o);
            for (var i in o)["default"].indexOf(i) < 0 && function(t) {
                a.d(e, t, (function() {
                    return o[t]
                }))
            }(i);
            e.default = n.a
        },
        "85c2": function(t, e, a) {
            (function(t, e) {
                var o = a("47a9");
                a("6686"), o(a("3240"));
                var n = o(a("153a"));
                t.__webpack_require_UNI_MP_PLUGIN__ = a, e(n.default)
            }).call(this, a("3223").default, a("df3c").createPage)
        },
        af09: function(t, e, a) {
            (function(t) {
                var o = a("47a9");
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.default = void 0;
                var n = o(a("7eb4")),
                    i = o(a("ee10")),
                    s = a("9359"),
                    r = a("90c1"),
                    l = (a("9816"), a("c074")),
                    c = a("2052"),
                    u = o(a("e956")),
                    d = o(a("4b0e")),
                    h = a("1e0d"),
                    f = a("28b7"),
                    g = {
                        setup: function() {
                            var e = (0, d.default)(),
                                a = (0, h.useLogin)(),
                                o = (0, f.useCancelTime)();
                            return {
                                ConsultType: u.default,
                                navbar: e,
                                loginc: a,
                                cancelTimec: o,
                                gotoRenew: function(e) {
                                    t.navigateTo({
                                        url: "/pages/consult/confirm?counselorId=".concat(e.counselorId)
                                    })
                                }
                            }
                        },
                        components: {
                            Navbar: function() {
                                Promise.all([a.e("common/vendor"), a.e("components/Navbar")]).then(function() {
                                    return resolve(a("8412"))
                                }.bind(null, a)).catch(a.oe)
                            },
                            PageContainer: function() {
                                Promise.all([a.e("common/vendor"), a.e("components/PageContainer")]).then(function() {
                                    return resolve(a("9de0"))
                                }.bind(null, a)).catch(a.oe)
                            }
                        },
                        data: function() {
                            return {
                                scrollTop: 0,
                                oldScrollTop: 0,
                                needLogin: !1,
                                consultText: "<<心理咨询协议>>",
                                longServiceText: "<<长程心理咨询协议>>",
                                serviceText: "<<知情同意书>>",
                                tabLists: [{
                                    name: "全部",
                                    id: 0
                                }, {
                                    name: "待支付",
                                    id: 1
                                }, {
                                    name: "进行中",
                                    id: 2
                                }, {
                                    name: "已完成",
                                    id: 3
                                }],
                                checkStatus: 0,
                                loginCheckStatus: 0,
                                paymentCountTime: null,
                                maskStatus: !1,
                                dataList: [],
                                current: 0,
                                globalData: {
                                    mobile: null
                                },
                                cancelOrderNo: null,
                                formData: {
                                    orderStatus: 0,
                                    pager: {
                                        index: 1,
                                        size: 20
                                    }
                                },
                                tempItem: null,
                                sessionKey: null,
                                selectedOrderLists: [],
                                totalPrice: 0,
                                selectAllStatus: !1,
                                payText: "支付",
                                protocolCheckStatus: 0
                            }
                        },
                        watch: {
                            dataList: function(t) {
                                this.cancelTimec.start(t)
                            }
                        },
                        onLoad: function() {
                            var t = this;
                            this.loginc.onLogined((function() {
                                t.formData.visitoruserId = t.loginc.getInfo().userId, t.formData.pager.index = 1, t.orderList()
                            }))
                        },
                        onShow: function() {
                            // [修复] 先从本地存储恢复登录状态，确保跨页面切换时登录状态同步
                            this.loginc.restore();
                            this.loginc.isLogined() || this.$refs.pageContainer.openLoginPanel()
                        },
                        onReachBottom: function() {
                            this.loadMore()
                        },
                        onPullDownRefresh: function() {
                            var e = this;
                            return (0, i.default)(n.default.mark((function a() {
                                return n.default.wrap((function(a) {
                                    for (;;) switch (a.prev = a.next) {
                                        case 0:
                                            if (e.loginc.isLogined()) {
                                                a.next = 5;
                                                break
                                            }
                                            e.$refs.pageContainer.openLoginPanel(), t.stopPullDownRefresh(), a.next = 10;
                                            break;
                                        case 5:
                                            return e.formData.visitoruserId = e.loginc.getInfo().userId, e.formData.pager.index = 1, a.next = 9, e.orderList();
                                        case 9:
                                            t.stopPullDownRefresh();
                                        case 10:
                                        case "end":
                                            return a.stop()
                                    }
                                }), a)
                            })))()
                        },
                        methods: {
                            showProtocol: function(e) {
                                var a = this.tempItem.counselorName,
                                    o = this.tempItem.consultDate.split(" ")[0],
                                    n = this.tempItem.visitorName;
                                t.navigateTo({
                                    url: "/pages/consult/protocolPage?value=" + e + "&counselorName=" + a + "&consultDate=" + o + "&userName=" + n
                                })
                            },
                            gotoProtocolPage: function(e) {
                                t.navigateTo({
                                    url: "/pages/consult/protocolPage?value=" + e + "&counselorName=以订单详情页为准&consultDate=以订单详情页为准&userName=以订单详情页为准"
                                })
                            },
                            payDialogClose: function() {
                                this.$refs.payDialog.close()
                            },
                            showNote: function(t) {
                                this.maskStatus = !0, this.checkStatus = 0, this.cancelOrderNo = t.orderId, 0 === t.orderStatus ? this.$refs.cancelDialog.open() : this.$refs.noteDialog.open()
                            },
                            noteDialogClose: function() {
                                this.maskStatus = !1, this.$refs.noteDialog.close()
                            },
                            showCancel: function() {
                                1 !== this.checkStatus ? t.showToast({
                                    title: "请确认我已知晓并同意退费须知所有内容",
                                    icon: "none"
                                }) : (this.$refs.noteDialog.close(), this.$refs.cancelDialog.open())
                            },
                            dialogClose: function() {
                                this.$refs.cancelDialog.close(), this.maskStatus = !1
                            },
                            changeType: function() {
                                1 === this.checkStatus ? this.checkStatus = 0 : this.checkStatus = 1
                            },
                            orderStatusDesc: function(t) {
                                return 0 === t ? "待支付" : 1 === t ? "待服务" : 2 === t ? "已完成" : 3 === t || 4 === t ? "已取消" : ""
                            },
                            itemClick: function(t) {
                                // this.current !== t && (this.current = t, this.formData.orderStatus = this.current, this.dataList = [], this.toTop(), this.formData.pager.index = 1, this.orderList(), null !== this.paymentCountTime && (clearInterval(this.paymentCountTime), this.paymentCountTime = null))
                            },
                            visitorCancelOrder: function() {
                                var e = this,
                                    a = this;
                                (0, s.irequestdata)({
                                    url: "/visitor/order/cancel",
                                    method: "post",
                                    data: {
                                        orderId: a.cancelOrderNo
                                    },
                                    success: function(o) {
                                        console.log("res", o), 200 === o.data.code && (e.$refs.cancelDialog.close(), t.showToast({
                                            title: "订单已经取消",
                                            icon: "none",
                                            duration: 2e3
                                        }), setTimeout((function() {
                                            a.orderList()
                                        }), 300))
                                    },
                                    error: function() {
                                        console.log("新增失败")
                                    }
                                })
                            },
                            loadMore: function() {
                                if (this.formData.pager.index < this.totalPages) {
                                    this.formData.pager.index = this.formData.pager.index + 1;
                                    var t = this;
                                    (0, s.irequestdata)({
                                        url: "/visitor/order/getList",
                                        method: "post",
                                        data: this.formData,
                                        success: function(e) {
                                            200 === e.data.code && e.data.data.list.length > 0 && (t.dataList = t.dataList.concat(e.data.data.list), t.totalPages = e.data.data.pages, t.initPaymentTimes())
                                        },
                                        error: function() {
                                            console.log("新增失败")
                                        }
                                    })
                                }
                            },
                            resetDataList: function() {
                                for (var t = 0; t < this.dataList.length; t++)
                                    if (this.dataList[t].paymentAvailableMinutes > 0) {
                                        var e = (0, r.countTimes)(this.dataList[t].paymentAvailableMinutes);
                                        this.dataList[t].payTimeout = e, this.dataList[t].paymentAvailableMinutes = this.dataList[t].paymentAvailableMinutes - 1, this.$set(this.dataList, t, this.dataList[t])
                                    } else this.dataList[t].payTimeout = 0, this.$set(this.dataList, t, this.dataList[t]);
                                0 === this.dataList.filter((function(t) {
                                    return null !== t.payTimeout && void 0 !== t.payTimeout && 0 !== t.payTimeout
                                })).length && (clearInterval(this.paymentCountTime), this.paymentCountTime = null)
                            },
                            initPaymentTimes: function() {
                                var t = this;
                                null !== t.paymentCountTime && (clearInterval(t.paymentCountTime), t.paymentCountTime = null), t.resetDataList(), t.paymentCountTime = setInterval((function() {
                                    t.resetDataList()
                                }), 6e4)
                            },
                            scrollChange: function(t) {
                                this.oldScrollTop = t.detail.scrollTop
                            },
                            toTop: function() {
                                var t = this;
                                this.scrollTop = this.oldScrollTop, this.$nextTick((function() {
                                    t.scrollTop = 0
                                })), console.log("toTop！")
                            },
                            orderList: function() {
                                var t = this;
                                return (0, i.default)(n.default.mark((function e() {
                                    var a, o;
                                    return n.default.wrap((function(e) {
                                        for (;;) switch (e.prev = e.next) {
                                            case 0:
                                                return a = t, e.next = 3, (0, l.getList)(t.formData);
                                            case 3:
                                                200 === (o = e.sent).data.code && o.data.data.list.length > 0 ? (a.dataList = o.data.data.list, console.log("dataList====>>", a.dataList), a.totalPages = o.data.data.pages, a.initPaymentTimes()) : (a.dataList = [], a.totalPages = 0);
                                            case 5:
                                            case "end":
                                                return e.stop()
                                        }
                                    }), e)
                                })))()
                            },
                            showPayS: function() {
                                1 !== this.checkStatus ? t.showToast({
                                    title: "请同意再继续",
                                    icon: "none"
                                }) : (this.$refs.payDialog.close(), this.submitPayDialog())
                            },
                            submitPayDialog: function() {
                                var e = this;
                                (0, s.irequestdata)({
                                    url: "/pay/toPay/" + this.tempItem.orderId,
                                    method: "post",
                                    success: function(a) {
                                        200 === a.data.code ? t.requestPayment({
                                            timeStamp: a.data.data.timeStamp,
                                            nonceStr: a.data.data.nonceStr,
                                            package: a.data.data.packageValue,
                                            signType: a.data.data.signType,
                                            paySign: a.data.data.paySign,
                                            success: function(a) {
                                                this.$refs.payDialog.close(), t.showToast({
                                                    title: "支付成功",
                                                    icon: "none"
                                                }), setTimeout((function() {
                                                    e.orderList()
                                                }), 300)
                                            },
                                            fail: function(e) {
                                                t.showToast({
                                                    title: "支付失败",
                                                    icon: "none"
                                                })
                                            }
                                        }) : t.showToast({
                                            title: a.data.msg,
                                            icon: "none"
                                        })
                                    },
                                    error: function() {
                                        console.log("新增失败")
                                    }
                                })
                            },
                            pageSubmit: function(t) {
                                this.tempItem = t, console.log("item", t), 2 === t.creatorType || 3 === t.creatorType ? this.$refs.payDialog.open() : this.submitPayDialog()
                            },
                            checkDetail: function(e) {
                                null !== this.paymentCountTime && (clearInterval(this.paymentCountTime), this.paymentCountTime = null), JSON.stringify(e), 0 === e.orderStatus ? t.navigateTo({
                                    url: "/pages/appointment/appointDetail?orderId=" + e.orderId
                                }) : 3 === e.orderStatus ? t.navigateTo({
                                    url: "/pages/consult/orderDetailCancel?orderId=" + e.orderId
                                }) : t.navigateTo({
                                    url: "/pages/consult/orderDetail?orderId=" + e.orderId
                                })
                            },
                            changeLoginType: function() {
                                1 === this.loginCheckStatus ? this.loginCheckStatus = 0 : this.loginCheckStatus = 1
                            },
                            toShowCheck: function() {
                                if (0 === this.loginCheckStatus) return t.showToast({
                                    title: "请勾选相应协议",
                                    icon: "none"
                                }), !1
                            },
                            getPhoneNumber: function(e) {
                                "getPhoneNumber:ok" === e.detail.errMsg ? (console.log(e), (0, c.loginWithMobileAuth)(e.detail).then((function() {
                                    t.switchTab({
                                        url: "/pages/user/user"
                                    })
                                }))) : (0, c.showMobileAuthDenyDialog)()
                            },
                            checkboxChange: function(t) {
                                var e = t.detail.value;
                                this.selectedOrderLists = this.dataList.filter((function(t) {
                                    return e.includes(t.orderId)
                                })), console.info(" -----  " + this.selectedOrderLists), this.selectAllStatus = this.selectedOrderLists.length === this.dataList.length;
                                for (var a = 0, o = 0; o < this.dataList.length; ++o) {
                                    var n = this.dataList[o];
                                    e.includes(n.orderId) && (a += n.payAmount)
                                }
                                this.totalPrice = a.toFixed(2), this.changePayBtnText()
                            },
                            clickRadio: function() {
                                if (console.log("clickRadio！"), this.selectAllStatus = !this.selectAllStatus, this.selectAllStatus) {
                                    this.selectedOrderLists = this.dataList.slice();
                                    for (var t = 0, e = 0; e < this.dataList.length; ++e) t += this.dataList[e].payAmount;
                                    this.totalPrice = t.toFixed(2)
                                } else this.selectedOrderLists = [], this.totalPrice = 0;
                                this.changePayBtnText()
                            },
                            lower: function(t) {
                                console.log(t), this.loadMore()
                            },
                            showMergePayDialog: function() {
                                this.selectedOrderLists.length > 0 ? this.$refs.mergePayDialog.open() : t.showToast({
                                    title: "请至少选择一个订单",
                                    icon: "none"
                                })
                            },
                            mergePayDialogClose: function() {
                                this.protocolCheckStatus = 0, this.$refs.mergePayDialog.close()
                            },
                            changeProtocolType: function() {
                                1 === this.protocolCheckStatus ? this.protocolCheckStatus = 0 : this.protocolCheckStatus = 1
                            },
                            mergePay: function() {
                                if (console.log("mergePay"), 1 === this.protocolCheckStatus) {
                                    var e = this;
                                    (0, s.irequestdata)({
                                        url: "/pay/toBatchPay",
                                        method: "post",
                                        data: {
                                            orderIdList: this.selectedOrderLists.map((function(t) {
                                                return t.orderId
                                            }))
                                        },
                                        success: function(a) {
                                            200 === a.data.code ? t.requestPayment({
                                                timeStamp: a.data.data.timeStamp,
                                                nonceStr: a.data.data.nonceStr,
                                                package: a.data.data.packageValue,
                                                signType: a.data.data.signType,
                                                paySign: a.data.data.paySign,
                                                success: function(a) {
                                                    console.log("pay success"), t.showToast({
                                                        title: "支付成功",
                                                        icon: "none"
                                                    }), e.totalPrice = 0, e.selectedOrderLists = [], e.orderList(), e.mergePayDialogClose()
                                                },
                                                fail: function(a) {
                                                    console.log("pay fail"), t.showToast({
                                                        title: "支付取消",
                                                        icon: "none"
                                                    }), e.mergePayDialogClose()
                                                }
                                            }) : (console.log("pay code is not 200"), t.showToast({
                                                title: a.data.msg,
                                                icon: "none"
                                            }))
                                        },
                                        error: function() {
                                            console.log("获取支付信息失败")
                                        }
                                    })
                                } else t.showToast({
                                    title: "请勾选协议",
                                    icon: "none"
                                })
                            },
                            checkConsultType: function(t) {
                                return 0 === t ? "网络" : 1 === t ? "低价" : 2 === t ? "地面" : 3 === t ? "青少年父母" : ""
                            },
                            changePayBtnText: function() {
                                this.selectedOrderLists.length > 1 ? this.payText = "合并支付" : this.payText = "支付"
                            }
                        }
                    };
                e.default = g
            }).call(this, a("df3c").default)
        }
    },
    [
        ["85c2", "common/runtime", "common/vendor"]
    ]
]);