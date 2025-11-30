(global.webpackJsonp = global.webpackJsonp || []).push([
  ["components/feng-parse/components/wxParseVideo"], {
    "00e8": function (n, e, o) {
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
    "30f5": function (n, e, o) {
      var t = o("8d83");
      o.n(t).a
    },
    "8d83": function (n, e, o) {},
    a176: function (n, e, o) {
      o.r(e);
      var t = o("eec6"),
        a = o.n(t);
      for (var c in t)["default"].indexOf(c) < 0 && function (n) {
        o.d(e, n, (function () {
          return t[n]
        }))
      }(c);
      e.default = a.a
    },
    cf23: function (n, e, o) {
      o.r(e);
      var t = o("00e8"),
        a = o("a176");
      for (var c in a)["default"].indexOf(c) < 0 && function (n) {
        o.d(e, n, (function () {
          return a[n]
        }))
      }(c);
      o("30f5");
      var f = o("828b"),
        i = Object(f.a)(a.default, t.b, t.c, !1, null, null, null, !1, t.a, void 0);
      e.default = i.exports
    },
    eec6: function (n, e, o) {
      (function (n) {
        Object.defineProperty(e, "__esModule", {
          value: !0
        }), e.default = void 0;
        var o = {
          name: "wxParseVideo",
          props: {
            node: {}
          },
          data: function () {
            return {
              playState: !0,
              videoStyle: "width: 100%;"
            }
          },
          methods: {
            play: function () {
              console.log("点击了video 播放"), this.playState = !this.playState
            }
          },
          mounted: function () {
            var e = this;
            n.$on("slideMenuShow", (function (n) {
              console.log("捕获事件：" + n), "show" == n && e.playState && (e.playState = !1)
            }))
          }
        };
        e.default = o
      }).call(this, o("df3c").default)
    }
  }
]), (global.webpackJsonp = global.webpackJsonp || []).push(["components/feng-parse/components/wxParseVideo-create-component", {
    "components/feng-parse/components/wxParseVideo-create-component": function (n, e, o) {
      o("df3c").createComponent(o("cf23"))
    }
  },
  [
    ["components/feng-parse/components/wxParseVideo-create-component"]
  ]
]);