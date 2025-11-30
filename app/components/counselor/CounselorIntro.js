(global.webpackJsonp = global.webpackJsonp || []).push([
  ["components/counselor/CounselorIntro"], {
    "15cd": function (t, n, e) {
      e.r(n);
      var o = e("ab12"),
        u = e.n(o);
      for (var c in o)["default"].indexOf(c) < 0 && function (t) {
        e.d(n, t, (function () {
          return o[t]
        }))
      }(c);
      n.default = u.a
    },
    "2c4e": function (t, n, e) {
      e.r(n);
      var o = e("65b1"),
        u = e("15cd");
      for (var c in u)["default"].indexOf(c) < 0 && function (t) {
        e.d(n, t, (function () {
          return u[t]
        }))
      }(c);
      e("ec82");
      var r = e("828b"),
        a = Object(r.a)(u.default, o.b, o.c, !1, null, "5bee67f0", null, !1, o.a, void 0);
      n.default = a.exports
    },
    "65b1": function (t, n, e) {
      e.d(n, "b", (function () {
        return o
      })), e.d(n, "c", (function () {
        return u
      })), e.d(n, "a", (function () {}));
      var o = function () {
          this.$createElement;
          var t = (this._self._c, this.isToggle(this.status) && !this.status.toggle),
            n = this.isToggle(this.status) && !this.status.toggle;
          this.$mp.data = Object.assign({}, {
            $root: {
              m0: t,
              m1: n
            }
          })
        },
        u = []
    },
    ab12: function (t, n, e) {
      Object.defineProperty(n, "__esModule", {
        value: !0
      }), n.default = void 0;
      var o = e("c4a0"),
        u = function (t) {
          return {
            type: "toggle",
            toggle: t
          }
        },
        c = function (t) {
          return "toggle" === t.type
        },
        r = {
          props: {
            text: String
          },
          setup: function (t) {
            var n = (0, o.ref)({
              type: "no"
            });
            return t.text.length > 200 && (n.value = u(!1)), {
              status: n,
              isToggle: c,
              change: function () {
                c(n.value) && !n.value.toggle && (n.value = u(!0))
              }
            }
          }
        };
      n.default = r
    },
    ec82: function (t, n, e) {
      var o = e("fc20");
      e.n(o).a
    },
    fc20: function (t, n, e) {}
  }
]), (global.webpackJsonp = global.webpackJsonp || []).push(["components/counselor/CounselorIntro-create-component", {
    "components/counselor/CounselorIntro-create-component": function (t, n, e) {
      e("df3c").createComponent(e("2c4e"))
    }
  },
  [
    ["components/counselor/CounselorIntro-create-component"]
  ]
]);