(global.webpackJsonp = global.webpackJsonp || []).push([
  ["colorui/components/cu-custom"], {
    "09e6": function (t, e, n) {
      n.d(e, "b", (function () {
        return o
      })), n.d(e, "c", (function () {
        return a
      })), n.d(e, "a", (function () {}));
      var o = function () {
          this.$createElement;
          this._self._c
        },
        a = []
    },
    "4e9b": function (t, e, n) {
      (function (t) {
        Object.defineProperty(e, "__esModule", {
          value: !0
        }), e.default = void 0;
        var n = {
          data: function () {
            return {
              StatusBar: this.StatusBar,
              CustomBar: this.CustomBar,
              Custom: this.Custom
            }
          },
          name: "cu-custom",
          computed: {
            style: function () {
              var t = this.StatusBar,
                e = this.CustomBar;
              console.log("123", this.CustomBar);
              var n = this.bgImage,
                o = "height:".concat(e, "px;padding-top:").concat(t, "px;");
              return this.bgImage && (o = "".concat(o, "background-image:url(").concat(n, ");")), o
            },
            styleCust: function () {
              var t = this.Custom;
              return "width:".concat(t.width, "px;height:").concat(t.height, "px;margin-left:calc(750rpx - ").concat(t.right, "px)")
            }
          },
          props: {
            bgColor: {
              type: String,
              default: ""
            },
            isBack: {
              type: [Boolean, String],
              default: !1
            },
            isCustom: {
              type: [Boolean, String],
              default: !1
            },
            homePage: {
              type: String,
              default: ""
            },
            bgImage: {
              type: String,
              default: ""
            }
          },
          methods: {
            BackPage: function () {
              if (getCurrentPages().length < 2 && "undefined" != typeof __wxConfig) {
                var e = "/" + __wxConfig.pages[0];
                return t.redirectTo({
                  url: e
                })
              }
              t.navigateBack({
                delta: 1
              })
            },
            toHome: function () {
              "" !== this.homePage ? t.reLaunch({
                url: this.homePage
              }) : t.reLaunch({
                url: "/pages/consult/consult"
              })
            }
          }
        };
        e.default = n
      }).call(this, n("df3c").default)
    },
    "95d1": function (t, e, n) {
      n.r(e);
      var o = n("09e6"),
        a = n("9b48");
      for (var u in a)["default"].indexOf(u) < 0 && function (t) {
        n.d(e, t, (function () {
          return a[t]
        }))
      }(u);
      var c = n("828b"),
        r = Object(c.a)(a.default, o.b, o.c, !1, null, null, null, !1, o.a, void 0);
      e.default = r.exports
    },
    "9b48": function (t, e, n) {
      n.r(e);
      var o = n("4e9b"),
        a = n.n(o);
      for (var u in o)["default"].indexOf(u) < 0 && function (t) {
        n.d(e, t, (function () {
          return o[t]
        }))
      }(u);
      e.default = a.a
    }
  }
]), (global.webpackJsonp = global.webpackJsonp || []).push(["colorui/components/cu-custom-create-component", {
    "colorui/components/cu-custom-create-component": function (t, e, n) {
      n("df3c").createComponent(n("95d1"))
    }
  },
  [
    ["colorui/components/cu-custom-create-component"]
  ]
]);