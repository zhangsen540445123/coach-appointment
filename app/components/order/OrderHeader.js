(global.webpackJsonp = global.webpackJsonp || []).push([
  ["components/order/OrderHeader"], {
    "0447": function (e, t, r) {
      r.d(t, "b", (function () {
        return o
      })), r.d(t, "c", (function () {
        return n
      })), r.d(t, "a", (function () {}));
      var o = function () {
          this.$createElement;
          this._self._c
        },
        n = []
    },
    "67f5": function (e, t, r) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0;
      var o = {
        props: {
          orderDetail: Object,
          time: String
        },
        computed: {
          title: function () {
            return 0 === this.orderDetail.orderStatus ? "待付款" : 1 !== this.orderDetail.orderStatus || this.orderDetail.visitorName ? 1 === this.orderDetail.orderStatus ? "待咨询" : 2 === this.orderDetail.orderStatus ? "已完成" : 3 === this.orderDetail.orderStatus || 4 === this.orderDetail.orderStatus ? "已取消" : void 0 : "支付成功"
          },
          intro: function () {
            return 0 === this.orderDetail.orderStatus ? "请尽快支付，以免该时段被其他人约走" : 1 === this.orderDetail.orderStatus && 1 === this.orderDetail.consultWay ? "您已预约成功，请按时在「微信」上等候" : 1 === this.orderDetail.orderStatus ? "您已预约成功，请按时到咨询室等待" : 2 === this.orderDetail.orderStatus ? "如有需要，请点击底部立即续约" : 3 === this.orderDetail.orderStatus || 4 === this.orderDetail.orderStatus ? "订单取消，欢迎再次预约" : void 0
          }
        }
      };
      t.default = o
    },
    a303: function (e, t, r) {},
    b78f: function (e, t, r) {
      var o = r("a303");
      r.n(o).a
    },
    e1f2: function (e, t, r) {
      r.r(t);
      var o = r("67f5"),
        n = r.n(o);
      for (var a in o)["default"].indexOf(a) < 0 && function (e) {
        r.d(t, e, (function () {
          return o[e]
        }))
      }(a);
      t.default = n.a
    },
    f187: function (e, t, r) {
      r.r(t);
      var o = r("0447"),
        n = r("e1f2");
      for (var a in n)["default"].indexOf(a) < 0 && function (e) {
        r.d(t, e, (function () {
          return n[e]
        }))
      }(a);
      r("b78f");
      var i = r("828b"),
        d = Object(i.a)(n.default, o.b, o.c, !1, null, "39b5c25a", null, !1, o.a, void 0);
      t.default = d.exports
    }
  }
]), (global.webpackJsonp = global.webpackJsonp || []).push(["components/order/OrderHeader-create-component", {
    "components/order/OrderHeader-create-component": function (e, t, r) {
      r("df3c").createComponent(r("f187"))
    }
  },
  [
    ["components/order/OrderHeader-create-component"]
  ]
]);