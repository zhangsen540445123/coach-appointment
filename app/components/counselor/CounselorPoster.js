(global.webpackJsonp = global.webpackJsonp || []).push([
  ["components/counselor/CounselorPoster"], {
    "011a9": function (e, t, n) {
      n.r(t);
      var r = n("5472"),
        a = n.n(r);
      for (var o in r)["default"].indexOf(o) < 0 && function (e) {
        n.d(t, e, (function () {
          return r[e]
        }))
      }(o);
      t.default = a.a
    },
    4979: function (e, t, n) {},
    "4fda": function (e, t, n) {
      n.d(t, "b", (function () {
        return a
      })), n.d(t, "c", (function () {
        return o
      })), n.d(t, "a", (function () {
        return r
      }));
      var r = {
          uniPopup: function () {
            return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null, "61d1"))
          }
        },
        a = function () {
          this.$createElement;
          this._self._c
        },
        o = []
    },
    5472: function (e, t, n) {
      (function (e, r) {
        var a = n("47a9");
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.default = void 0;
        var o = a(n("7eb4")),
          c = a(n("ee10")),
          s = n("c4a0"),
          i = a(n("6228")),
          u = a(n("a92f")),
          l = a(n("21e3")),
          f = a(n("8a5b")),
          d = a(n("12db")),
          p = n("e05e"),
          x = n("83b8"),
          g = function (e) {
            return new Promise((function (t) {
              setTimeout(t, e)
            }))
          },
          m = {
            components: {
              Share: function () {
                Promise.all([n.e("common/vendor"), n.e("components/Share")]).then(function () {
                  return resolve(n("e72a"))
                }.bind(null, n)).catch(n.oe)
              }
            },
            data: function () {
              return {
                drawing: !1,
                result: ""
              }
            },
            watch: {
              drawing: function (t) {
                t ? e.showLoading({
                  title: "绘制中..."
                }) : e.hideLoading()
              }
            },
            methods: {
              getCtx: function () {
                var e = this;
                return new Promise((function (t, n) {
                  var a = r.createCanvasContext("counselor-poster-canvas", e);
                  e.createSelectorQuery().select("#counselor-poster-canvas").fields({
                    node: !0,
                    size: !0
                  }).exec((function (e) {
                    var n = e[0];
                    t({
                      ctx: a,
                      width: n.width,
                      height: n.height
                    })
                  }))
                }))
              },
              getImage: function (e, t) {
                return (0, x.getImage)("counselor_poster_".concat(e), t)
              },
              toImage: function () {
                var e = this;
                return new Promise((function (t, n) {
                  r.canvasToTempFilePath({
                    canvasId: "counselor-poster-canvas",
                    success: function (e) {
                      t(e.tempFilePath)
                    },
                    fail: n
                  }, e)
                }))
              },
              split: function (e) {
                var t = e.ctx,
                  n = e.fontSize,
                  r = e.lineHeight,
                  a = e.width,
                  o = e.text,
                  c = e.max,
                  s = 0,
                  i = [];
                return o.split(/\r?\n|\r/g).forEach((function (e) {
                  Array.from(e.replace(/^\s+/, "").replace(/\s+$/, "")).forEach((function (o, u) {
                    if (s >= c) {
                      var l = i[s - 1];
                      l.w >= a && (l.text = l.text.slice(0, -3) + "...")
                    } else {
                      i[s] = i[s] || {
                        text: "",
                        w: 0,
                        y: (n + r + 10) * s
                      }, i[s].text += o;
                      var f = t.measureText(i[s].text).width;
                      i[s].w = f, (f >= a || u === e.length - 1) && s++
                    }
                  }))
                })), console.log(i), i
              },
              draw: function (e) {
                var t = this;
                return (0, c.default)(o.default.mark((function n() {
                  var r, a, c, x, g, m, h, w, v, b, S, y, F;
                  return o.default.wrap((function (n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        return n.next = 2, t.getCtx();
                      case 2:
                        return r = n.sent, a = r.ctx, c = r.width, x = r.height, g = function (e) {
                          return e * c / 600
                        }, m = function (e, t, n) {
                          a.fillText(e, t, n + 10)
                        }, a.setFillStyle("#fff"), a.fillRect(g(20), g(20), c - g(40), x - g(40)), n.next = 12, t.getImage("avatar", e.headUrl);
                      case 12:
                        return h = n.sent, a.drawImage(h, g(44), g(44), g(128), g(128)), n.next = 16, (0, p.createQrcode)({
                          page: "pages/consult/counselor",
                          scene: {
                            counselorId: e.counselorId
                          }
                        });
                      case 16:
                        return w = n.sent, n.next = 19, t.getImage("qrcode", w);
                      case 19:
                        return v = n.sent, a.drawImage(v, g(440), g(558), g(116), g(116)), n.next = 23, t.getImage("bg", i.default);
                      case 23:
                        if (b = n.sent, a.drawImage(b, 0, 0, c, x), a.setFillStyle("rgba(42, 42, 42, 1)"), a.font = "bold 20px sans-serif", a.setFontSize(g(32)), m(e.name, g(192), g(57)), (S = e.qualifications[0]) && (a.setFillStyle("#ffeed1"), a.fillRect(g(310), g(50), g(23 * S.length + 8), g(32)), a.setFillStyle("rgba(64, 46, 50, 0.7)"), a.font = "normal 20px sans-serif", a.setFontSize(g(22)), m(S, g(318), g(54))), a.setFillStyle("rgba(64, 46, 50, 0.7)"), a.setFontSize(g(22)), m("从业".concat(f.default.years(e.experience.date), "年 · 咨询经验 ").concat(f.default.hours(e.experience.time), "+小时"), g(196), g(101)), !e.cityName) {
                          n.next = 43;
                          break
                        }
                        return n.next = 37, t.getImage("pos", u.default);
                      case 37:
                        y = n.sent, a.drawImage(y, g(194), g(137), g(28), g(28)), m(e.cityName, g(227), g(143)), m(d.default.parseTexts(e).join("/"), g(334), g(143)), n.next = 44;
                        break;
                      case 43:
                        m(d.default.parseTexts(e).join("/"), g(194), g(143));
                      case 44:
                        return n.next = 46, t.getImage("titleBg", l.default);
                      case 46:
                        return F = n.sent, a.drawImage(F, g(46), g(236), g(98), g(28)), a.setFillStyle("rgba(0, 0, 0, 1)"), a.font = "bold 20px sans-serif", a.setFontSize(g(24)), m("个人简介", g(48), g(228)), a.setFillStyle("rgba(64, 46, 50, 1)"), a.font = "normal 20px sans-serif", a.setFontSize(g(20)), t.split({
                          ctx: a,
                          fontSize: g(20),
                          lineHeight: g(36),
                          width: g(480),
                          text: e.introduction,
                          max: 6
                        }).forEach((function (e) {
                          m(e.text, g(48), g(283 + e.y))
                        })), n.next = 59, (0, s.nextTick)();
                      case 59:
                        return n.next = 61, (0, s.nextTick)();
                      case 61:
                        return n.next = 63, (0, s.nextTick)();
                      case 63:
                        return a.setFillStyle("rgba(156, 112, 90, 1)"), a.font = "bold 20px sans-serif", a.setFontSize(g(20)), m("教练寄语：", g(40), g(580)), a.font = "normal 20px sans-serif", a.setFontSize(g(20)), t.split({
                          ctx: a,
                          fontSize: g(20),
                          lineHeight: g(30),
                          width: g(350),
                          text: e.special || "或许改变不会即刻发生，但每份勇气都值得致敬，当你准备好我就在这里。",
                          max: 3
                        }).forEach((function (e) {
                          m(e.text, g(40), g(617 + e.y))
                        })), n.next = 73, (0, s.nextTick)();
                      case 73:
                        return n.next = 75, (0, s.nextTick)();
                      case 75:
                        return n.next = 77, (0, s.nextTick)();
                      case 77:
                        return n.next = 79, new Promise((function (e) {
                          return a.draw(!1, e)
                        }));
                      case 79:
                        return n.next = 81, t.toImage();
                      case 81:
                        t.result = n.sent;
                      case 82:
                      case "end":
                        return n.stop()
                    }
                  }), n)
                })))()
              },
              open: function (e) {
                var t = this;
                return (0, c.default)(o.default.mark((function n() {
                  return o.default.wrap((function (n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        return n.prev = 0, t.drawing = !0, t.$refs.popup.open("center"), n.next = 5, g(300);
                      case 5:
                        return n.next = 7, t.draw(e);
                      case 7:
                        t.drawing = !1, n.next = 15;
                        break;
                      case 10:
                        n.prev = 10, n.t0 = n.catch(0), t.drawing = !1, r.showToast({
                          title: "绘图失败",
                          icon: "none"
                        }), t.close();
                      case 15:
                      case "end":
                        return n.stop()
                    }
                  }), n, null, [
                    [0, 10]
                  ])
                })))()
              },
              close: function () {
                this.$refs.popup.close()
              }
            }
          };
        t.default = m
      }).call(this, n("3223").default, n("df3c").default)
    },
    ce92: function (e, t, n) {
      n.r(t);
      var r = n("4fda"),
        a = n("011a9");
      for (var o in a)["default"].indexOf(o) < 0 && function (e) {
        n.d(t, e, (function () {
          return a[e]
        }))
      }(o);
      n("da45");
      var c = n("828b"),
        s = Object(c.a)(a.default, r.b, r.c, !1, null, "441afb9c", null, !1, r.a, void 0);
      t.default = s.exports
    },
    da45: function (e, t, n) {
      var r = n("4979");
      n.n(r).a
    }
  }
]), (global.webpackJsonp = global.webpackJsonp || []).push(["components/counselor/CounselorPoster-create-component", {
    "components/counselor/CounselorPoster-create-component": function (e, t, n) {
      n("df3c").createComponent(n("ce92"))
    }
  },
  [
    ["components/counselor/CounselorPoster-create-component"]
  ]
]);