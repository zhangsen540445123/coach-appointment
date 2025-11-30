(global.webpackJsonp = global.webpackJsonp || []).push([
  ["components/feng-parse/components/wxParseAudio"], {
    "8ec3": function (n, e, o) {
      o.r(e);
      var t = o("9505"),
        a = o.n(t);
      for (var c in t)["default"].indexOf(c) < 0 && function (n) {
        o.d(e, n, (function () {
          return t[n]
        }))
      }(c);
      e.default = a.a
    },
    9505: function (n, e, o) {
      Object.defineProperty(e, "__esModule", {
        value: !0
      }), e.default = void 0;
      var t = {
        name: "wxParseAudio",
        props: {
          node: {
            type: Object,
            default: function () {
              return {}
            }
          }
        }
      };
      e.default = t
    },
    b1a5: function (n, e, o) {
      o.d(e, "b", (function () {
        return t
      })), o.d(e, "c", (function () {
        return a
      })), o.d(e, "a", (function () {}));
      var t = function () {
          this.$createElement;
          this._self._c
        },
        a = []
    },
    d5b8: function (n, e, o) {
      o.r(e);
      var t = o("b1a5"),
        a = o("8ec3");
      for (var c in a)["default"].indexOf(c) < 0 && function (n) {
        o.d(e, n, (function () {
          return a[n]
        }))
      }(c);
      var r = o("828b"),
        u = Object(r.a)(a.default, t.b, t.c, !1, null, null, null, !1, t.a, void 0);
      e.default = u.exports
    }
  }
]), (global.webpackJsonp = global.webpackJsonp || []).push(["components/feng-parse/components/wxParseAudio-create-component", {
    "components/feng-parse/components/wxParseAudio-create-component": function (n, e, o) {
      o("df3c").createComponent(o("d5b8"))
    }
  },
  [
    ["components/feng-parse/components/wxParseAudio-create-component"]
  ]
]);