(global.webpackJsonp = global.webpackJsonp || []).push([
  ["components/studio/Item"], {
    "18a7": function (n, t, e) {},
    "43b4": function (n, t, e) {
      var o = e("18a7");
      e.n(o).a
    },
    "48fb": function (n, t, e) {
      (function (n) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.default = void 0;
        var e = {
          props: {
            studio: Object
          },
          setup: function () {
            return {
              gotoStudioDetails: function (t) {
                n.navigateTo({
                  url: "/pages/studio/details?id=".concat(t.studioId)
                })
              }
            }
          }
        };
        t.default = e
      }).call(this, e("df3c").default)
    },
    "5f55": function (n, t, e) {
      e.r(t);
      var o = e("6ed5"),
        u = e("9372");
      for (var c in u)["default"].indexOf(c) < 0 && function (n) {
        e.d(t, n, (function () {
          return u[n]
        }))
      }(c);
      e("43b4");
      var a = e("828b"),
        i = Object(a.a)(u.default, o.b, o.c, !1, null, "903b10fa", null, !1, o.a, void 0);
      t.default = i.exports
    },
    "6ed5": function (n, t, e) {
      e.d(t, "b", (function () {
        return o
      })), e.d(t, "c", (function () {
        return u
      })), e.d(t, "a", (function () {}));
      var o = function () {
          this.$createElement;
          this._self._c
        },
        u = []
    },
    9372: function (n, t, e) {
      e.r(t);
      var o = e("48fb"),
        u = e.n(o);
      for (var c in o)["default"].indexOf(c) < 0 && function (n) {
        e.d(t, n, (function () {
          return o[n]
        }))
      }(c);
      t.default = u.a
    }
  }
]), (global.webpackJsonp = global.webpackJsonp || []).push(["components/studio/Item-create-component", {
    "components/studio/Item-create-component": function (n, t, e) {
      e("df3c").createComponent(e("5f55"))
    }
  },
  [
    ["components/studio/Item-create-component"]
  ]
]);