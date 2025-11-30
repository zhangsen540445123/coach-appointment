require("../../@babel/runtime/helpers/Arrayincludes"), (global.webpackJsonp = global.webpackJsonp || []).push([
  ["components/order/OrderInfo"], {
    3842: function (e, t, r) {
      var n = r("c528");
      r.n(n).a
    },
    "65af": function (e, t, r) {
      r.r(t);
      var n = r("7100"),
        o = r.n(n);
      for (var c in n)["default"].indexOf(c) < 0 && function (e) {
        r.d(t, e, (function () {
          return n[e]
        }))
      }(c);
      t.default = o.a
    },
    7100: function (e, t, r) {
      (function (e) {
        var n = r("47a9");
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.default = void 0;
        var o = n(r("7ca3")),
          c = n(r("e956")),
          u = n(r("12db"));

        function a(e, t) {
          var r = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
          }
          return r
        }

        function l(e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? a(Object(r), !0).forEach((function (t) {
              (0, o.default)(e, t, r[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : a(Object(r)).forEach((function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            }))
          }
          return e
        }
        var i = {
          props: {
            orderDetail: Object,
            counselor: Object,
            coupon: Object
          },
          setup: function () {
            return {
              ConsultType: c.default,
              ConsultWay: u.default
            }
          },
          computed: {
            faceToFace: function () {
              return 2 === this.orderDetail.consultWay
            },
            contact: function () {
              return this.counselor ? this.counselor.wechatWorkUrl ? {
                text: "企业微信",
                url: this.counselor.wechatWorkUrl
              } : this.counselor.wechatUrl ? {
                text: "微信",
                url: this.counselor.wechatUrl
              } : this.counselor.qqUrl ? {
                text: "QQ",
                url: this.counselor.qqUrl
              } : null : null
            },
            refund: function () {
              if (3 !== this.orderDetail.orderStatus) return null;
              switch (this.orderDetail.refundStatus) {
                case 0:
                  return "正在退款";
                case 1:
                  return "退款中";
                case 2:
                  return "已退款";
                case 3:
                  return "退款关闭";
                case 4:
                  return "退款拒绝"
              }
              return null
            },
            studio: function () {
              var e = (this.counselor.consultStudioList || []).find((function (e) {
                return 0 === e.studioType
              }));
              return e ? l(l({}, e), {}, {
                studioCoverImgList: JSON.parse(e.studioCoverImgList || "[]")
              }) : null
            }
          },
          methods: {
            getWeekDay: function (e) {
              var t = new Date(e).getDay();
              return new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六")[t]
            },
            hasContact: function () {
              return !!this.contact
            },
            doContact: function () {
              e.previewImage({
                urls: [this.contact.url],
                current: this.contact.url,
                success: function (e) {
                  console.log("showUrl", e)
                },
                fail: function () {
                  e.showToast({
                    title: "图片暂时无法显示，请联系客服或直接根据号码添加教练",
                    icon: "none"
                  })
                }
              })
            },
            changeTime: function () {
              e.redirectTo({
                url: "/pages/consult/confirm?counselorId=".concat(this.counselor.counselorId, "&orderId=").concat(this.orderDetail.orderId)
              })
            },
            renew: function () {
              e.navigateTo({
                url: "/pages/consult/confirm?counselorId=".concat(this.counselor.counselorId)
              })
            },
            gotoBindVisitor: function () {
              var t = ["orderId=".concat(this.orderDetail.orderId), "paymentAvailableMinutes=".concat(this.orderDetail.paymentAvailableMinutes)].join("&");
              e.redirectTo({
                url: "/pages/consult/completeInfo?" + t
              })
            },
            openLocation: function (t, r) {
              e.openLocation({
                longitude: +t,
                latitude: +r
              })
            }
          }
        };
        t.default = i
      }).call(this, r("df3c").default)
    },
    c09c: function (e, t, r) {
      r.r(t);
      var n = r("cf21"),
        o = r("65af");
      for (var c in o)["default"].indexOf(c) < 0 && function (e) {
        r.d(t, e, (function () {
          return o[e]
        }))
      }(c);
      r("3842");
      var u = r("828b"),
        a = Object(u.a)(o.default, n.b, n.c, !1, null, "2f757985", null, !1, n.a, void 0);
      t.default = a.exports
    },
    c528: function (e, t, r) {},
    cf21: function (e, t, r) {
      r.d(t, "b", (function () {
        return n
      })), r.d(t, "c", (function () {
        return o
      })), r.d(t, "a", (function () {}));
      var n = function () {
          var e = this,
            t = (e.$createElement, e._self._c, [0].includes(e.orderDetail.orderStatus)),
            r = t ? null : [1, 2].includes(e.orderDetail.orderStatus),
            n = [1, 2, 3, 4].includes(e.orderDetail.orderStatus),
            o = e.orderDetail.startTimeslot ? e.getWeekDay(e.orderDetail.consultDate) : null,
            c = e.orderDetail.startTimeslot ? e.orderDetail.startTimeslot.replace(/:00$/, "") || "" : null,
            u = e.orderDetail.startTimeslot ? e.orderDetail.endTimeslot.replace(/:00$/, "") || "" : null,
            a = e.ConsultType.parseText(e.orderDetail.consultType),
            l = e.ConsultWay.parseText(e.orderDetail.consultWay);
          e.$mp.data = Object.assign({}, {
            $root: {
              g0: t,
              g1: r,
              g2: n,
              m0: o,
              g3: c,
              g4: u,
              g5: a,
              g6: l
            }
          })
        },
        o = []
    }
  }
]), (global.webpackJsonp = global.webpackJsonp || []).push(["components/order/OrderInfo-create-component", {
    "components/order/OrderInfo-create-component": function (e, t, r) {
      r("df3c").createComponent(r("c09c"))
    }
  },
  [
    ["components/order/OrderInfo-create-component"]
  ]
]);