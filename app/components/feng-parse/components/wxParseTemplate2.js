(global.webpackJsonp = global.webpackJsonp || []).push([
  ["components/feng-parse/components/wxParseTemplate2"], {
    "7c1f": function (e, n, o) {
      Object.defineProperty(n, "__esModule", {
        value: !0
      }), n.default = void 0;
      var t = {
        name: "wxParseTemplate2",
        props: {
          node: {}
        },
        components: {
          wxParseTemplate: function () {
            o.e("components/feng-parse/components/wxParseTemplate3").then(function () {
              return resolve(o("a2ab"))
            }.bind(null, o)).catch(o.oe)
          },
          wxParseImg: function () {
            o.e("components/feng-parse/components/wxParseImg").then(function () {
              return resolve(o("39f3"))
            }.bind(null, o)).catch(o.oe)
          },
          wxParseVideo: function () {
            o.e("components/feng-parse/components/wxParseVideo").then(function () {
              return resolve(o("cf23"))
            }.bind(null, o)).catch(o.oe)
          },
          wxParseAudio: function () {
            o.e("components/feng-parse/components/wxParseAudio").then(function () {
              return resolve(o("d5b8"))
            }.bind(null, o)).catch(o.oe)
          },
          wxParseTable: function () {
            o.e("components/feng-parse/components/wxParseTable").then(function () {
              return resolve(o("d982"))
            }.bind(null, o)).catch(o.oe)
          }
        },
        methods: {
          wxParseATap: function (e, n) {
            var o = n.currentTarget.dataset.href;
            if (o) {
              for (var t = this.$parent; !t.preview || "function" != typeof t.preview;) t = t.$parent;
              t.navigate(o, n, e)
            }
          }
        }
      };
      n.default = t
    },
    "9afd": function (e, n, o) {
      o.r(n);
      var t = o("b73b"),
        a = o("efb1");
      for (var r in a)["default"].indexOf(r) < 0 && function (e) {
        o.d(n, e, (function () {
          return a[e]
        }))
      }(r);
      var c = o("828b"),
        s = Object(c.a)(a.default, t.b, t.c, !1, null, null, null, !1, t.a, void 0);
      n.default = s.exports
    },
    b73b: function (e, n, o) {
      o.d(n, "b", (function () {
        return t
      })), o.d(n, "c", (function () {
        return a
      })), o.d(n, "a", (function () {}));
      var t = function () {
          this.$createElement;
          this._self._c
        },
        a = []
    },
    efb1: function (e, n, o) {
      o.r(n);
      var t = o("7c1f"),
        a = o.n(t);
      for (var r in t)["default"].indexOf(r) < 0 && function (e) {
        o.d(n, e, (function () {
          return t[e]
        }))
      }(r);
      n.default = a.a
    }
  }
]), (global.webpackJsonp = global.webpackJsonp || []).push(["components/feng-parse/components/wxParseTemplate2-create-component", {
    "components/feng-parse/components/wxParseTemplate2-create-component": function (e, n, o) {
      o("df3c").createComponent(o("9afd"))
    }
  },
  [
    ["components/feng-parse/components/wxParseTemplate2-create-component"]
  ]
]);