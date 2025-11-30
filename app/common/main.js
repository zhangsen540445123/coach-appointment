(global.webpackJsonp = global.webpackJsonp || []).push([
  ["common/main"], {
    "128b": function (t, e, n) {},
    2041: function (t, e, n) {
      n.r(e);
      var o = n("b9b2"),
        r = n.n(o);
      for (var u in o)["default"].indexOf(u) < 0 && function (t) {
        n.d(e, t, (function () {
          return o[t]
        }))
      }(u);
      e.default = r.a
    },
    5158: function (t, e, n) {
      n.r(e);
      var o = n("2041");
      for (var r in o)["default"].indexOf(r) < 0 && function (t) {
        n.d(e, t, (function () {
          return o[t]
        }))
      }(r);
      n("cc78");
      var u = n("828b"),
        c = Object(u.a)(o.default, void 0, void 0, !1, null, null, null, !1, void 0, void 0);
      e.default = c.exports
    },
    7226: function (t, e, n) {
      (function (t, e) {
        var o = n("47a9"),
          r = o(n("7ca3"));
        n("6686"), n("fd42");
        var u = o(n("3240")),
          c = o(n("5158"));

        function a(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            e && (o = o.filter((function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable
            }))), n.push.apply(n, o)
          }
          return n
        }
        t.__webpack_require_UNI_MP_PLUGIN__ = n, u.default.component("cu-custom", (function () {
          n.e("colorui/components/cu-custom").then(function () {
            return resolve(n("95d1"))
          }.bind(null, n)).catch(n.oe)
        })), u.default.config.productionTip = !1, c.default.mpType = "app";
        var f = new u.default(function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? a(Object(n), !0).forEach((function (e) {
              (0, r.default)(t, e, n[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : a(Object(n)).forEach((function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            }))
          }
          return t
        }({}, c.default));
        e(f).$mount()
      }).call(this, n("3223").default, n("df3c").createApp)
    },
    b9b2: function (t, e, n) {
      (function (t, o) {
        var r = n("47a9");
        Object.defineProperty(e, "__esModule", {
          value: !0
        }), e.default = void 0, n("9359"), n("9816"), n("90c1");
        var u = r(n("3240")),
          c = r(n("4b0e")),
          a = n("1e0d"),
          f = {
            setup: function () {
              var t = (0, c.default)(),
                e = (0, a.useLogin)();
              t.update(), e.restore()
            },
            onLaunch: function () {
              var e = t.getWindowInfo();
              u.default.prototype.StatusBar = e.statusBarHeight;
              var n = o.getMenuButtonBoundingClientRect();
              u.default.prototype.Custom = n, u.default.prototype.CustomBar = n.bottom + n.top - e.statusBarHeight
            },
            onShow: function () {},
            onHide: function () {}
          };
        e.default = f
      }).call(this, n("df3c").default, n("3223").default)
    },
    cc78: function (t, e, n) {
      var o = n("128b");
      n.n(o).a
    }
  },
  [
    ["7226", "common/runtime", "common/vendor"]
  ]
]);