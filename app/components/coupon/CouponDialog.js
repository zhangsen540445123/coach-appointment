(global.webpackJsonp = global.webpackJsonp || []).push([
    ["components/coupon/CouponDialog"], {
        "28d8": function(n, o, t) {
            Object.defineProperty(o, "__esModule", {
                value: !0
            }), o.default = void 0;
            var e = t("9359"),
                u = {
                    props: {
                        isConsultType: Number,
                        counselorId: [Number, String] // 教练ID，用于过滤优惠券
                    },
                    data: function() {
                        return {
                            current: 0,
                            availableCoupons: [],
                            availableCount: 0,
                            unAvailableCoupons: [],
                            unAvailableCount: 0,
                            selectCountCode: null,
                            tabLists: [{
                                name: "可使用优惠券",
                                id: 0
                            }, {
                                name: "不可使用优惠券",
                                id: 1
                            }]
                        }
                    },
                    computed: {
                        couponList: function() {
                            return 0 === this.current ? this.availableCoupons : this.unAvailableCoupons
                        }
                    },
                    methods: {
                        nothing: function() {},
                        open: function() {
                            this.$refs.discountDialog.open()
                        },
                        close: function() {
                            this.$refs.discountDialog.close()
                        },
                        itemClick: function(n) {
                            this.current = n
                        },
                        resetCoupons: function() {
                            this.selectCountCode = null, this.$emit("change", {
                                couponId: null,
                                value: null
                            }), this.$refs.discountDialog.close()
                        },
                        submitCoupon: function() {
                            var n, o = this,
                                t = this.availableCoupons.find((function(n) {
                                    return n.couponDetailId === o.selectCountCode
                                }));
                            n = t ? t.amount : 0, this.$emit("change", {
                                couponId: this.selectCountCode,
                                value: n
                            }), this.$refs.discountDialog.close()
                        },
                        couponClick: function(n) {
                            1 !== this.current && (this.selectCountCode === n.couponDetailId ? this.selectCountCode = null : this.selectCountCode = n.couponDetailId)
                        },
                        myCouponList: function() {
                            var n = this;
                            // 从 counselor_info 中获取 userId（与其他页面保持一致）
                            var counselorInfo = wx.getStorageSync('counselor_info');
                            var userId = counselorInfo && counselorInfo.userId;
                            if (!userId) {
                                console.log("用户未登录，无法获取优惠券列表");
                                n.availableCoupons = [];
                                n.availableCount = 0;
                                n.unAvailableCoupons = [];
                                n.unAvailableCount = 0;
                                return;
                            }
                            // 构建请求URL，如果有 counselorId 则添加到查询参数中
                            var baseUrl = "/visitor/coupon/list?userId=" + userId;
                            var counselorIdParam = n.counselorId ? "&counselorId=" + n.counselorId : "";

                            // 获取可用优惠券 (valid=1)
                            (0, e.irequestdata)({
                                url: baseUrl + "&valid=1" + counselorIdParam,
                                method: "get",
                                success: function(o) {
                                    if (200 === o.data.code) {
                                        n.availableCoupons = o.data.data || [];
                                        n.availableCount = n.availableCoupons.length;
                                    } else {
                                        n.availableCoupons = [];
                                        n.availableCount = 0;
                                    }
                                },
                                error: function() {
                                    console.log("获取可用优惠券失败");
                                    n.availableCoupons = [];
                                    n.availableCount = 0;
                                }
                            });
                            // 获取不可用优惠券 (valid=0) - 不可用优惠券不需要按教练过滤
                            (0, e.irequestdata)({
                                url: baseUrl + "&valid=0",
                                method: "get",
                                success: function(o) {
                                    if (200 === o.data.code) {
                                        n.unAvailableCoupons = o.data.data || [];
                                        n.unAvailableCount = n.unAvailableCoupons.length;
                                    } else {
                                        n.unAvailableCoupons = [];
                                        n.unAvailableCount = 0;
                                    }
                                },
                                error: function() {
                                    console.log("获取不可用优惠券失败");
                                    n.unAvailableCoupons = [];
                                    n.unAvailableCount = 0;
                                }
                            });
                        }
                    },
                    onReady: function() {
                        this.myCouponList()
                    }
                };
            o.default = u
        },
        "6a0d": function(n, o, t) {},
        "71dc": function(n, o, t) {
            t.r(o);
            var e = t("28d8"),
                u = t.n(e);
            for (var a in e)["default"].indexOf(a) < 0 && function(n) {
                t.d(o, n, (function() {
                    return e[n]
                }))
            }(a);
            o.default = u.a
        },
        "814b": function(n, o, t) {
            var e = t("6a0d");
            t.n(e).a
        },
        df29: function(n, o, t) {
            t.r(o);
            var e = t("f217"),
                u = t("71dc");
            for (var a in u)["default"].indexOf(a) < 0 && function(n) {
                t.d(o, n, (function() {
                    return u[n]
                }))
            }(a);
            t("814b");
            var i = t("828b"),
                l = Object(i.a)(u.default, e.b, e.c, !1, null, "9507d446", null, !1, e.a, void 0);
            o.default = l.exports
        },
        f217: function(n, o, t) {
            t.d(o, "b", (function() {
                return u
            })), t.d(o, "c", (function() {
                return a
            })), t.d(o, "a", (function() {
                return e
            }));
            var e = {
                    uniPopup: function() {
                        return t.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(t.bind(null, "61d1"))
                    }
                },
                u = function() {
                    this.$createElement;
                    var n = (this._self._c, t("d344"));
                    this.$mp.data = Object.assign({}, {
                        $root: {
                            m0: n
                        }
                    })
                },
                a = []
        }
    }
]), (global.webpackJsonp = global.webpackJsonp || []).push(["components/coupon/CouponDialog-create-component", {
        "components/coupon/CouponDialog-create-component": function(n, o, t) {
            t("df3c").createComponent(t("df29"))
        }
    },
    [
        ["components/coupon/CouponDialog-create-component"]
    ]
]);