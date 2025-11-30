require("../../@babel/runtime/helpers/Arrayincludes"), (global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/consult/orderDetail"], {
    "47e3": function (e, t, n) {
      (function (e, r) {
        var o = n("47a9");
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.default = void 0;
        var a = o(n("7eb4")),
          i = o(n("ee10")),
          l = n("9359"),
          c = (n("90c1"), n("72b7")),
          u = n("c074"),
          s = n("28b7"),
          d = {
            components: {
              PageContainer: function () {
                Promise.all([n.e("common/vendor"), n.e("components/PageContainer")]).then(function () {
                  return resolve(n("9de0"))
                }.bind(null, n)).catch(n.oe)
              },
              Navbar: function () {
                Promise.all([n.e("common/vendor"), n.e("components/Navbar")]).then(function () {
                  return resolve(n("8412"))
                }.bind(null, n)).catch(n.oe)
              },
              OrderHeader: function () {
                n.e("components/order/OrderHeader").then(function () {
                  return resolve(n("f187"))
                }.bind(null, n)).catch(n.oe)
              },
              OrderInfo: function () {
                Promise.all([n.e("common/vendor"), n.e("components/order/OrderInfo")]).then(function () {
                  return resolve(n("c09c"))
                }.bind(null, n)).catch(n.oe)
              },
              OrderTip: function () {
                n.e("components/order/OrderTip").then(function () {
                  return resolve(n("4cee"))
                }.bind(null, n)).catch(n.oe)
              }
            },
            setup: function () {
              return {
                cancelTimec: (0, s.useCancelTime)()
              }
            },
            data: function () {
              return {
                statusBarHeight: "padding-top: " + e.getSystemInfoSync().statusBarHeight + "px",
                consultText: "<<咨询协议>>",
                serviceText: "<<低价心理咨询用户协议>>",
                checkStatus: 0,
                cancelOrderNo: "",
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
                userDetail: {
                  address: null,
                  qq: null,
                  qqUrl: null,
                  wechat: null,
                  wechatUrl: null
                },
                locationCode: [],
                timeCanCancel: null
              }
            },
            onLoad: function (e) {
              e.orderId && "null" !== e.orderId && (this.orderDetail.orderId = e.orderId, this.getOrderDetail(), this.getCanCancelTime())
            },
            methods: {
              gotoBindVisitor: function () {
                var t = ["orderId=".concat(this.orderDetail.orderId), "paymentAvailableMinutes=".concat(this.orderDetail.paymentAvailableMinutes)].join("&");
                e.redirectTo({
                  url: "/pages/consult/completeInfo?" + t
                })
              },
              backClick: function () {
                r.navigateBack({
                  delta: 1
                })
              },
              gotoTab: function () {
                e.switchTab({
                  url: "/pages/appointment/appointment"
                })
              },
              clipboardData: function () {
                e.setClipboardData({
                  data: this.orderDetail.orderId,
                  success: function () {
                    console.log("success")
                  }
                })
              },
              getQualifications: function () {
                var e = [];
                if (this.orderDetail.qualifications.length > 0)
                  for (var t = 0; t < this.orderDetail.qualifications.length; t++) this.orderDetail.qualifications[t] && e.push(this.orderDetail.qualifications[t]);
                return e.length > 0 ? e.join(",") : ""
              },
              getCanCancelTime: function () {
                var e = this;
                (0, l.irequestdata)({
                  url: "/visitor/order/getCanRefundHour",
                  method: "get",
                  success: function (t) {
                    200 === t.data.code && (e.timeCanCancel = t.data.data)
                  }
                })
              },
              getWeekDay: function (e) {
                var t = new Date(e).getDay();
                return new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六")[t]
              },
              toFeedback: function () {
                e.navigateTo({
                  url: "/pages/appointment/feedback?messageCode=2&&orderId=" + this.orderDetail.orderId
                })
              },
              tosendMseeage: function () {
                e.navigateTo({
                  url: "/pages/appointment/feedback?messageCode=1&&orderId=" + this.orderDetail.orderId
                })
              },
              showNote: function () {
                this.checkStatus = 0, this.cancelOrderNo = this.orderDetail.orderId, 0 === this.orderDetail.orderStatus ? this.$refs.cancelDialog.open() : this.$refs.noteDialog.open()
              },
              changeType: function () {
                1 === this.checkStatus ? this.checkStatus = 0 : this.checkStatus = 1
              },
              noteDialogClose: function () {
                this.$refs.noteDialog.close()
              },
              showCancel: function () {
                1 !== this.checkStatus ? e.showToast({
                  title: "请确认我已知晓并同意退费须知所有内容",
                  icon: "none"
                }) : (this.$refs.noteDialog.close(), this.$refs.cancelDialog.open())
              },
              dialogClose: function () {
                this.$refs.cancelDialog.close()
              },
              visitorCancelOrder: function () {
                var t = this,
                  n = this;
                (0, l.irequestdata)({
                  url: "/visitor/order/cancel",
                  method: "post",
                  data: {
                    orderId: n.cancelOrderNo
                  },
                  success: function (r) {
                    console.log("res", r), 200 === r.data.code && (t.$refs.cancelDialog.close(), setTimeout((function () {
                      e.navigateTo({
                        url: "/pages/consult/orderDetailCancel?orderId=" + n.orderDetail.orderId
                      })
                    }), 300))
                  },
                  error: function () {
                    console.log("新增失败")
                  }
                })
              },
              getOrderDetail: function () {
                var e = this;
                return (0, i.default)(a.default.mark((function t() {
                  var n;
                  return a.default.wrap((function (t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return n = e, t.next = 3, (0, u.getOrderDetail)(n.orderDetail.orderId);
                      case 3:
                        n.orderDetail = t.sent, 1 === n.orderDetail.orderStatus ? e.getUserDetailFromOrder() : n.getUserDetail(n.orderDetail.counselorId), n.orderDetail.visitorName || n.cancelTimec.start([n.orderDetail]);
                      case 6:
                      case "end":
                        return t.stop()
                    }
                  }), t)
                })))()
              },
              getUserDetailFromOrder: function () {
                var t = this;
                (0, l.irequestdata)({
                  url: "/visitor/order/getConsultInfo",
                  method: "post",
                  data: {
                    orderId: t.orderDetail.orderId
                  },
                  success: function (n) {
                    200 === n.data.code ? t.userDetail = n.data.data : e.showToast({
                      title: n.data.msg,
                      icon: "none"
                    })
                  },
                  error: function () {
                    console.log("新增失败")
                  }
                })
              },
              getUserDetail: function (e) {
                var t = this;
                return (0, i.default)(a.default.mark((function n() {
                  var r;
                  return a.default.wrap((function (n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        return r = t, n.next = 3, (0, c.getCounselor)(e);
                      case 3:
                        r.userDetail = n.sent;
                      case 4:
                      case "end":
                        return n.stop()
                    }
                  }), n)
                })))()
              },
              gotoRenew: function () {
                e.navigateTo({
                  url: "/pages/consult/confirm?counselorId=".concat(this.orderDetail.counselorId)
                })
              }
            }
          };
        t.default = d
      }).call(this, n("df3c").default, n("3223").default)
    },
    9410: function (e, t, n) {
      n.r(t);
      var r = n("c488"),
        o = n("af94");
      for (var a in o)["default"].indexOf(a) < 0 && function (e) {
        n.d(t, e, (function () {
          return o[e]
        }))
      }(a);
      n("1d65");
      var i = n("828b"),
        l = Object(i.a)(o.default, r.b, r.c, !1, null, "64d0111f", null, !1, r.a, void 0);
      t.default = l.exports
    },
    af94: function (e, t, n) {
      n.r(t);
      var r = n("47e3"),
        o = n.n(r);
      for (var a in r)["default"].indexOf(a) < 0 && function (e) {
        n.d(t, e, (function () {
          return r[e]
        }))
      }(a);
      t.default = o.a
    },
    c488: function (e, t, n) {
      n.d(t, "b", (function () {
        return o
      })), n.d(t, "c", (function () {
        return a
      })), n.d(t, "a", (function () {
        return r
      }));
      var r = {
          uniPopup: function () {
            return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null, "61d1"))
          }
        },
        o = function () {
          var e = this,
            t = (e.$createElement, e._self._c, n("42d6")),
            r = e.cancelTimec.getText(e.orderDetail.orderId),
            o = 1 !== e.orderDetail.orderStatus || e.orderDetail.visitorName ? e.$refs.pageContainer.isShowAdviser && e.$refs.pageContainer.isShowAdviser() : null,
            a = [2].includes(e.orderDetail.orderStatus),
            i = n("d344"),
            l = n("d344"),
            c = 1 === e.checkStatus ? n("1d4f") : null,
            u = 1 !== e.checkStatus ? n("7a32") : null;
          e._isMounted || (e.e0 = function (t) {
            return e.$refs.pageContainer.openAdviser()
          }), e.$mp.data = Object.assign({}, {
            $root: {
              m0: t,
              g0: r,
              g1: o,
              g2: a,
              m1: i,
              m2: l,
              m3: c,
              m4: u
            }
          })
        },
        a = []
    },
    e455: function (e, t, n) {
      (function (e, t) {
        var r = n("47a9");
        n("6686"), r(n("3240"));
        var o = r(n("9410"));
        e.__webpack_require_UNI_MP_PLUGIN__ = n, t(o.default)
      }).call(this, n("3223").default, n("df3c").createPage)
    }
  },
  [
    ["e455", "common/runtime", "common/vendor"]
  ]
]);