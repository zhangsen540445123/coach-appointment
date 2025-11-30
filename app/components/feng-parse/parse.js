(global.webpackJsonp = global.webpackJsonp || []).push([
  ["components/feng-parse/parse"], {
    "24e1": function (t, e, n) {
      n.d(e, "b", (function () {
        return o
      })), n.d(e, "c", (function () {
        return i
      })), n.d(e, "a", (function () {}));
      var o = function () {
          this.$createElement;
          this._self._c
        },
        i = []
    },
    4930: function (t, e, n) {
      (function (t) {
        var o = n("47a9");
        Object.defineProperty(e, "__esModule", {
          value: !0
        }), e.default = void 0;
        var i = o(n("0270")),
          a = {
            name: "wxParse",
            props: {
              userSelect: {
                type: String,
                default: "text"
              },
              imgOptions: {
                type: [Object, Boolean],
                default: function () {
                  return {
                    loop: !1,
                    indicator: "number",
                    longPressActions: !1
                  }
                }
              },
              loading: {
                type: Boolean,
                default: !1
              },
              className: {
                type: String,
                default: ""
              },
              content: {
                type: String,
                default: ""
              },
              noData: {
                type: String,
                default: ""
              },
              startHandler: {
                type: Function,
                default: function () {
                  return function (t) {
                    t.attr.class = null, t.attr.style = null
                  }
                }
              },
              endHandler: {
                type: Function,
                default: function () {
                  return function (t) {
                    t = t
                  }
                }
              },
              charsHandler: {
                type: Function,
                default: function () {
                  return function (t) {
                    t = t
                  }
                }
              },
              imageProp: {
                type: Object,
                default: function () {
                  return {
                    mode: "aspectFit",
                    padding: 0,
                    lazyLoad: !1,
                    domain: ""
                  }
                }
              }
            },
            components: {
              wxParseTemplate: function () {
                n.e("components/feng-parse/components/wxParseTemplate0").then(function () {
                  return resolve(n("7e06"))
                }.bind(null, n)).catch(n.oe)
              }
            },
            data: function () {
              return {
                nodes: {},
                imageUrls: [],
                wxParseWidth: {
                  value: 0
                }
              }
            },
            computed: {},
            mounted: function () {
              this.setHtml()
            },
            methods: {
              setHtml: function () {
                var t = this;
                this.getWidth().then((function (e) {
                  t.wxParseWidth.value = e
                }));
                var e = this.content,
                  n = this.noData,
                  o = this.imageProp,
                  a = e || n,
                  r = {
                    start: this.startHandler,
                    end: this.endHandler,
                    chars: this.charsHandler
                  },
                  s = (0, i.default)(a, r, o, this);
                this.imageUrls = s.imageUrls, this.nodes = [], s.nodes.forEach((function (e) {
                  setTimeout((function () {
                    e.node && t.nodes.push(e)
                  }), 0)
                }))
              },
              getWidth: function () {
                var e = this;
                return new Promise((function (n, o) {
                  t.createSelectorQuery().in(e).select(".wxParse").fields({
                    size: !0,
                    scrollOffset: !0
                  }, (function (t) {
                    n(t.width)
                  })).exec()
                }))
              },
              navigate: function (t, e, n) {
                console.log(t, n), this.$emit("navigate", t, e)
              },
              preview: function (e, n) {
                this.imageUrls.length && "boolean" != typeof this.imgOptions && t.previewImage({
                  current: e,
                  urls: this.imageUrls,
                  loop: this.imgOptions.loop,
                  indicator: this.imgOptions.indicator,
                  longPressActions: this.imgOptions.longPressActions
                }), this.$emit("preview", e, n)
              },
              removeImageUrl: function (t) {
                var e = this.imageUrls;
                e.splice(e.indexOf(t), 1)
              }
            },
            provide: function () {
              return {
                parseWidth: this.wxParseWidth,
                parseSelect: this.userSelect
              }
            },
            watch: {
              content: function (t) {
                this.setHtml()
              }
            }
          };
        e.default = a
      }).call(this, n("df3c").default)
    },
    "5c39": function (t, e, n) {
      n.r(e);
      var o = n("24e1"),
        i = n("76b3");
      for (var a in i)["default"].indexOf(a) < 0 && function (t) {
        n.d(e, t, (function () {
          return i[t]
        }))
      }(a);
      var r = n("828b"),
        s = Object(r.a)(i.default, o.b, o.c, !1, null, null, null, !1, o.a, void 0);
      e.default = s.exports
    },
    "76b3": function (t, e, n) {
      n.r(e);
      var o = n("4930"),
        i = n.n(o);
      for (var a in o)["default"].indexOf(a) < 0 && function (t) {
        n.d(e, t, (function () {
          return o[t]
        }))
      }(a);
      e.default = i.a
    }
  }
]), (global.webpackJsonp = global.webpackJsonp || []).push(["components/feng-parse/parse-create-component", {
    "components/feng-parse/parse-create-component": function (t, e, n) {
      n("df3c").createComponent(n("5c39"))
    }
  },
  [
    ["components/feng-parse/parse-create-component"]
  ]
]);