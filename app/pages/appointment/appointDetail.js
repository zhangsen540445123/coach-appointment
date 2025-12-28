require("../../@babel/runtime/helpers/Arrayincludes"), (global.webpackJsonp = global.webpackJsonp || []).push([
    ["pages/appointment/appointDetail"], {
        "3b99": function(e, t, n) {
            n.r(t);
            var o = n("c37e"),
                r = n.n(o);
            for (var a in o)["default"].indexOf(a) < 0 && function(e) {
                n.d(t, e, (function() {
                    return o[e]
                }))
            }(a);
            t.default = r.a
        },
        "8cff": function(e, t, n) {
            n.r(t);
            var o = n("d7a1"),
                r = n("3b99");
            for (var a in r)["default"].indexOf(a) < 0 && function(e) {
                n.d(t, e, (function() {
                    return r[e]
                }))
            }(a);
            n("a076");
            var i = n("828b"),
                u = Object(i.a)(r.default, o.b, o.c, !1, null, "7c721620", null, !1, o.a, void 0);
            t.default = u.exports
        },
        a575: function(e, t, n) {
            (function(e, t) {
                var o = n("47a9");
                n("6686"), o(n("3240"));
                var r = o(n("8cff"));
                e.__webpack_require_UNI_MP_PLUGIN__ = n, t(r.default)
            }).call(this, n("3223").default, n("df3c").createPage)
        },
        c37e: function(e, t, n) {
            (function(e, o) {
                var r = n("47a9"),
                    a = n("3b2d");
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.default = void 0;
                var i = r(n("7eb4")),
                    u = r(n("ee10")),
                    l = n("c4a0"),
                    c = n("9359"),
                    s = n("c074"),
                    d = n("72b7"),
                    f = n("f8f0"),
                    p = n("28b7"),
                    h = function(e, t) {
                        if (e && e.__esModule) return e;
                        if (null === e || "object" !== a(e) && "function" != typeof e) return {
                            default: e
                        };
                        var n = function(e) {
                            if ("function" != typeof WeakMap) return null;
                            var t = new WeakMap,
                                n = new WeakMap;
                            return function(e) {
                                return e ? n : t
                            }(e)
                        }(t);
                        if (n && n.has(e)) return n.get(e);
                        var o = {},
                            r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                        for (var i in e)
                            if ("default" !== i && Object.prototype.hasOwnProperty.call(e, i)) {
                                var u = r ? Object.getOwnPropertyDescriptor(e, i) : null;
                                u && (u.get || u.set) ? Object.defineProperty(o, i, u) : o[i] = e[i]
                            }
                        return o.default = e, n && n.set(e, o), o
                    }(n("bc16"));
                var m = {
                    components: {
                        Navbar: function() {
                            Promise.all([n.e("common/vendor"), n.e("components/Navbar")]).then(function() {
                                return resolve(n("8412"))
                            }.bind(null, n)).catch(n.oe)
                        },
                        OrderHeader: function() {
                            n.e("components/order/OrderHeader").then(function() {
                                return resolve(n("f187"))
                            }.bind(null, n)).catch(n.oe)
                        },
                        OrderInfo: function() {
                            Promise.all([n.e("common/vendor"), n.e("components/order/OrderInfo")]).then(function() {
                                return resolve(n("c09c"))
                            }.bind(null, n)).catch(n.oe)
                        },
                        CouponDialog: function() {
                            n.e("components/coupon/CouponDialog").then(function() {
                                return resolve(n("df29"))
                            }.bind(null, n)).catch(n.oe)
                        }
                    },
                    setup: function() {
                        var e = function() {
                                var e = (0, l.ref)(null);
                                return {
                                    getValue: function() {
                                        return e.value && e.value.value
                                    },
                                    getCouponId: function() {
                                        return e.value && e.value.couponId
                                    },
                                    update: function(t) {
                                        var n = t.couponId,
                                            o = t.value;
                                        e.value = {
                                            couponId: n,
                                            value: o
                                        }
                                    },
                                    updateValue: function(t) {
                                        if (e.value) {
                                            e.value.value = t
                                        }
                                    }
                                }
                            }(),
                            t = (0, p.useCancelTime)(),
                            n = (0, l.ref)("-"),
                            o = function() {
                                var t = (0, u.default)(i.default.mark((function t(o) {
                                    var r;
                                    return i.default.wrap((function(t) {
                                        for (;;) switch (t.prev = t.next) {
                                            case 0:
                                                return t.next = 2, (0, f.getOrderPrice)(o, e.getCouponId());
                                            case 2:
                                                r = t.sent;
                                                if (r && r.price !== undefined && r.price !== null) {
                                                    n.value = r.price;
                                                    if (r.discountAmount !== undefined && r.discountAmount !== null) {
                                                        e.updateValue(r.discountAmount);
                                                    }
                                                } else {
                                                    n.value = "-";
                                                }
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
                        return {
                            couponc: e,
                            cancelTimec: t,
                            price: n,
                            updatePrice: o,
                            selectCoupon: function(t, n) {
                                e.update(n), o(t)
                            }
                        }
                    },
                    data: function() {
                        return {
                            consultText: "<<心理咨询协议>>",
                            longServiceText: "<<长程心理咨询协议>>",
                            serviceText: "<<知情同意书>>",
                            checkStatus: 0,
                            protocolCheckStatus: 0,
                            cancelOrderNo: null,
                            paymentCountTime: null,
                            payTimeString: null,
                            orderDetail: {
                                consultDate: null,
                                headUrl: null,
                                directions: [],
                                orderId: null,
                                consultType: null,
                                serviceType: null,
                                orderStatus: null,
                                orderCreateTime: null,
                                name: null,
                                qualifications: [],
                                orderAmount: null,
                                payAmount: null,
                                payTime: null,
                                isAm: null,
                                startTimeslot: null,
                                endTimeslot: null,
                                roomCode: null,
                                roomAddress: null
                            },
                            tempItem: null,
                            userDetail: {
                                address: null,
                                qq: null,
                                qqUrl: null,
                                wechat: null,
                                wechatUrl: null
                            }
                        }
                    },
                    onLoad: function(e) {
                        var t = this;
                        return (0, u.default)(i.default.mark((function n() {
                            var o;
                            return i.default.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        if (o = t, !e.orderId || "null" === e.orderId) {
                                            n.next = 8;
                                            break
                                        }
                                        return o.orderDetail.orderId = e.orderId, n.next = 5, o.getOrderDetail();
                                    case 5:
                                        return o.cancelTimec.start([o.orderDetail]), n.next = 8, o.updatePrice(o.orderDetail.orderId);
                                    case 8:
                                    case "end":
                                        return n.stop()
                                }
                            }), n)
                        })))()
                    },
                    methods: {
                        showProtocol: function(t) {
                            var n = this.orderDetail.name,
                                o = this.orderDetail.consultDate,
                                r = this.orderDetail.visitorName;
                            e.navigateTo({
                                url: "/pages/consult/protocolPage?value=" + t + "&counselorName=" + n + "&consultDate=" + o + "&userName=" + r
                            })
                        },
                        changeProtocolType: function() {
                            1 === this.protocolCheckStatus ? this.protocolCheckStatus = 0 : this.protocolCheckStatus = 1
                        },
                        backClick: function() {
                            o.navigateBack({
                                delta: 1
                            })
                        },
                        gotoTab: function() {
                            e.switchTab({
                                url: "/pages/appointment/appointment"
                            })
                        },
                        getQualifications: function() {
                            var e = [];
                            if (this.orderDetail.qualifications.length > 0)
                                for (var t = 0; t < this.orderDetail.qualifications.length; t++) this.orderDetail.qualifications[t] && e.push(this.orderDetail.qualifications[t]);
                            return e.length > 0 ? e.join(",") : ""
                        },
                        clipboardData: function() {
                            e.setClipboardData({
                                data: this.orderDetail.orderId,
                                success: function() {
                                    console.log("success")
                                }
                            })
                        },
                        submitPayDialog: function() {
                            var t = this,
                                n = this;
                            (0, c.irequestdata)({
                                url: "/pay/toPay/" + this.orderDetail.orderId,
                                method: "post",
                                data: {
                                    couponDetailId: this.couponc.getCouponId()
                                },
                                success: function(o) {
                                    var r = function() {
                                        n.orderDetail.visitorName ? e.redirectTo({
                                            url: "/pages/consult/orderDetail?orderId=" + n.orderDetail.orderId
                                        }) : n.gotoBindVisitor()
                                    };
                                    200 === o.data.code ? (o.data.data.paymentAmount <= 0 ? r() : e.requestPayment({
                                        timeStamp: o.data.data.timeStamp,
                                        nonceStr: o.data.data.nonceStr,
                                        package: o.data.data.packageValue,
                                        signType: o.data.data.signType,
                                        paySign: o.data.data.paySign,
                                        success: function(n) {
                                            e.showToast({
                                                title: "支付成功,正在跳转待服务页面",
                                                icon: "none"
                                            }), setTimeout((function() {
                                                r(), t.pageSubmit.loading = !1
                                            }), 300)
                                        },
                                        fail: function(n) {
                                            e.showToast({
                                                title: "支付失败",
                                                icon: "none"
                                            }), t.pageSubmit.loading = !1
                                        }
                                    }), h.paySuccess(n.orderDetail.counselorId)) : (e.showToast({
                                        title: o.data.msg,
                                        icon: "none"
                                    }), t.pageSubmit.loading = !1)
                                },
                                error: function() {
                                    console.log("新增失败"), t.pageSubmit.loading = !1
                                }
                            })
                        },
                        pageSubmit: function(t) {
                            if (!this.pageSubmit.loading) {
                                if (this.pageSubmit.loading = !0, 0 === this.protocolCheckStatus) return e.showToast({
                                    title: "请勾选相应协议",
                                    icon: "none"
                                }), void(this.pageSubmit.loading = !1);
                                this.submitPayDialog()
                            }
                        },
                        gotoBindVisitor: function() {
                            var t = ["orderId=".concat(this.orderDetail.orderId), "paymentAvailableMinutes=".concat(this.orderDetail.paymentAvailableMinutes), "consultType=".concat(this.orderDetail.consultType)].join("&");
                            e.redirectTo({
                                url: "/pages/appointment/bindVisitor?".concat(t)
                            })
                        },
                        showNote: function() {
                            this.checkStatus = 0, this.cancelOrderNo = this.orderDetail.orderId, 0 === this.orderDetail.orderStatus ? this.$refs.cancelDialog.open() : this.$refs.noteDialog.open()
                        },
                        noteDialogClose: function() {
                            this.$refs.noteDialog.close()
                        },
                        showCancel: function() {
                            1 !== this.checkStatus ? e.showToast({
                                title: "请确认我已知晓并同意退费须知所有内容",
                                icon: "none"
                            }) : (this.$refs.noteDialog.close(), this.$refs.cancelDialog.open())
                        },
                        dialogClose: function() {
                            this.$refs.cancelDialog.close()
                        },
                        visitorCancelOrder: function() {
                            var t = this,
                                n = this;
                            (0, c.irequestdata)({
                                url: "/visitor/order/cancel",
                                method: "post",
                                data: {
                                    orderId: n.cancelOrderNo
                                },
                                success: function(o) {
                                    console.log("res", o), 200 === o.data.code && (t.$refs.cancelDialog.close(), setTimeout((function() {
                                        e.navigateTo({
                                            url: "/pages/consult/orderDetailCancel?orderId=" + n.orderDetail.orderId
                                        })
                                    }), 300))
                                },
                                error: function() {
                                    console.log("新增失败")
                                }
                            })
                        },
                        getOrderDetail: function() {
                            var e = this;
                            return (0, u.default)(i.default.mark((function t() {
                                var n;
                                return i.default.wrap((function(t) {
                                    for (;;) switch (t.prev = t.next) {
                                        case 0:
                                            return (n = e).paymentCountTime && (clearInterval(n.paymentCountTime), n.paymentCountTime = null), t.next = 4, (0, s.getOrderDetail)(n.orderDetail.orderId);
                                        case 4:
                                            n.orderDetail = t.sent, e.getUserDetail(e.orderDetail.counselorId);
                                        case 6:
                                        case "end":
                                            return t.stop()
                                    }
                                }), t)
                            })))()
                        },
                        getUserDetail: function(e) {
                            var t = this;
                            return (0, u.default)(i.default.mark((function n() {
                                return i.default.wrap((function(n) {
                                    for (;;) switch (n.prev = n.next) {
                                        case 0:
                                            return n.next = 2, (0, d.getCounselor)(e);
                                        case 2:
                                            t.userDetail = n.sent;
                                        case 3:
                                        case "end":
                                            return n.stop()
                                    }
                                }), n)
                            })))()
                        }
                    }
                };
                t.default = m
            }).call(this, n("df3c").default, n("3223").default)
        },
        d7a1: function(e, t, n) {
            n.d(t, "b", (function() {
                return r
            })), n.d(t, "c", (function() {
                return a
            })), n.d(t, "a", (function() {
                return o
            }));
            var o = {
                    uniPopup: function() {
                        return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null, "61d1"))
                    }
                },
                r = function() {
                    var e = this,
                        t = (e.$createElement, e._self._c, n("42d6")),
                        o = e.cancelTimec.getText(e.orderDetail.orderId),
                        r = {
                            userful: e.$refs.couponDialog.availableCoupons && e.$refs.couponDialog.availableCoupons.length > 0,
                            value: e.couponc.getValue()
                        },
                        a = n("d344"),
                        i = n("d344"),
                        u = 1 === e.checkStatus ? n("1d4f") : null,
                        l = 1 !== e.checkStatus ? n("7a32") : null;
                    e._isMounted || (e.e0 = function(t) {
                        return e.$refs.couponDialog.open()
                    }), e.$mp.data = Object.assign({}, {
                        $root: {
                            m0: t,
                            g0: o,
                            a0: r,
                            m1: a,
                            m2: i,
                            m3: u,
                            m4: l
                        }
                    })
                },
                a = []
        }
    },
    [
        ["a575", "common/runtime", "common/vendor"]
    ]
]);