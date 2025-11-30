require("../../@babel/runtime/helpers/Arrayincludes"), (global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/consult/confirm"], {
    "0ea7": function (e, t, r) {
      r.r(t);
      var n = r("568b"),
        o = r("eb02");
      for (var i in o)["default"].indexOf(i) < 0 && function (e) {
        r.d(t, e, (function () {
          return o[e]
        }))
      }(i);
      r("0132");
      var s = r("828b"),
        a = Object(s.a)(o.default, n.b, n.c, !1, null, "57102c46", null, !1, n.a, void 0);
      t.default = a.exports
    },
    "4ba6": function (e, t, r) {
      (function (e, n) {
        var o = r("47a9"),
          i = r("3b2d");
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.default = void 0;
        var s = o(r("7eb4")),
          a = o(r("af34")),
          u = o(r("34cf")),
          c = o(r("ee10")),
          l = o(r("7ca3")),
          f = r("c4a0"),
          d = r("a418"),
          h = r("9359"),
          m = (r("90c1"), D(r("9b32"))),
          p = r("a91b"),
          v = r("72b7"),
          g = r("c074"),
          y = r("1e0d"),
          T = o(r("e956")),
          b = o(r("12db"));

        function C(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap,
            r = new WeakMap;
          return (C = function (e) {
            return e ? r : t
          })(e)
        }

        function D(e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || "object" !== i(e) && "function" != typeof e) return {
            default: e
          };
          var r = C(t);
          if (r && r.has(e)) return r.get(e);
          var n = {},
            o = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var s in e)
            if ("default" !== s && Object.prototype.hasOwnProperty.call(e, s)) {
              var a = o ? Object.getOwnPropertyDescriptor(e, s) : null;
              a && (a.get || a.set) ? Object.defineProperty(n, s, a) : n[s] = e[s]
            } return n.default = e, r && r.set(e, n), n
        }

        function I(e, t) {
          var r = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
          }
          return r
        }

        function w(e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? I(Object(r), !0).forEach((function (t) {
              (0, l.default)(e, t, r[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : I(Object(r)).forEach((function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            }))
          }
          return e
        }
        D(r("bc16"));
        var O = function (t, r, n, o) {
            var i = e.getStorageSync("confirm_storage") || {};
            e.setStorageSync("confirm_storage", w(w({}, i), {}, (0, l.default)({}, t, {
              consultType: r,
              consultWay: n,
              visitorId: o
            })))
          },
          k = function (t) {
            var r = e.getStorageSync("confirm_storage");
            return r && r[t] ? r[t] : null
          },
          S = {
            components: {
              Navbar: function () {
                Promise.all([r.e("common/vendor"), r.e("components/Navbar")]).then(function () {
                  return resolve(r("8412"))
                }.bind(null, r)).catch(r.oe)
              },
              Calender: function () {
                r.e("components/Calender").then(function () {
                  return resolve(r("9452"))
                }.bind(null, r)).catch(r.oe)
              }
            },
            filters: {
              resetDay: function (e) {
                return !1 != !!e ? e.split("-")[1] + "-" + e.split("-")[2] : ""
              },
              checkConsultType: function (e) {
                return 0 === e ? "网络咨询" : 1 === e ? "低价咨询" : 2 === e ? "地面咨询" : 3 === e ? "青少年父母咨询" : ""
              }
            },
            setup: function () {
              var t, r = (0, y.useLogin)(),
                n = (0, f.ref)(null),
                o = function () {
                  var e = (0, c.default)(s.default.mark((function e(t) {
                    return s.default.wrap((function (e) {
                      for (;;) switch (e.prev = e.next) {
                        case 0:
                          return e.next = 2, (0, v.getCounselor)(t);
                        case 2:
                          n.value = e.sent;
                        case 3:
                        case "end":
                          return e.stop()
                      }
                    }), e)
                  })));
                  return function (t) {
                    return e.apply(this, arguments)
                  }
                }(),
                i = function () {
                  var e = (0, f.ref)(null),
                    t = (0, f.ref)([]),
                    r = (0, f.ref)([]),
                    n = function () {
                      var e = (0, c.default)(s.default.mark((function e(n) {
                        var o, i;
                        return s.default.wrap((function (e) {
                          for (;;) switch (e.prev = e.next) {
                            case 0:
                              return e.next = 2, Promise.all([m.getAdults(n), Promise.resolve([])]);
                            case 2:
                              o = e.sent, i = (0, u.default)(o, 2), t.value = i[0], r.value = i[1];
                            case 6:
                            case "end":
                              return e.stop()
                          }
                        }), e)
                      })));
                      return function (t) {
                        return e.apply(this, arguments)
                      }
                    }(),
                    o = function () {
                      return (0, a.default)(t.value)
                    },
                    i = function () {
                      return t.value.length > 0
                    },
                    l = function () {
                      return r.value.length > 0
                    };
                  return {
                    update: n,
                    getUsefuls: o,
                    hasAdult: i,
                    hasChild: l,
                    hasVisitor: function () {
                      return i() || l()
                    },
                    getItem: function (e) {
                      return o().find((function (t) {
                        return t.id === e
                      }))
                    },
                    select: function (t) {
                      e.value = t
                    },
                    isSelected: function (t) {
                      return e.value === t.id
                    },
                    getSelected: function () {
                      return o().find((function (t) {
                        return t.id === e.value
                      }))
                    }
                  }
                }(),
                l = function () {
                  var t = (0, f.ref)(null),
                    r = (0, f.ref)(!1);
                  return {
                    inOrder: function () {
                      return r.value
                    },
                    update: function () {
                      var e = (0, c.default)(s.default.mark((function e(n) {
                        return s.default.wrap((function (e) {
                          for (;;) switch (e.prev = e.next) {
                            case 0:
                              return e.next = 2, (0, g.getOrderDetail)(n);
                            case 2:
                              t.value = e.sent, r.value = !0;
                            case 4:
                            case "end":
                              return e.stop()
                          }
                        }), e)
                      })));
                      return function (t) {
                        return e.apply(this, arguments)
                      }
                    }(),
                    updateOrderTime: function () {
                      var r = (0, c.default)(s.default.mark((function r(n, o) {
                        return s.default.wrap((function (r) {
                          for (;;) switch (r.prev = r.next) {
                            case 0:
                              return r.next = 2, (0, g.updateOrderConsultTime)(t.value.orderId, n, o);
                            case 2:
                              e.showToast({
                                title: "修改成功",
                                icon: "none"
                              }), t.value.orderAmount > 0 ? e.redirectTo({
                                url: "/pages/appointment/appointDetail?orderId=" + t.value.orderId
                              }) : 0 === t.value.orderAmount && e.redirectTo({
                                url: "/pages/consult/orderDetail?orderId=" + t.value.orderId
                              });
                            case 4:
                            case "end":
                              return r.stop()
                          }
                        }), r)
                      })));
                      return function (e, t) {
                        return r.apply(this, arguments)
                      }
                    }()
                  }
                }();
              return (0, d.onShow)((function () {
                return t && t()
              })), {
                loginc: r,
                counselor: n,
                updateCounselor: o,
                ConsultType: T.default,
                visitorc: i,
                orderc: l,
                onShowLifecycle: function (e) {
                  t = e
                }
              }
            },
            data: function () {
              return {
                indexSearchBar: "margin-top: " + (e.getSystemInfoSync().statusBarHeight - 10) + "px",
                tabLists: [{
                  name: "可使用优惠券",
                  id: 0
                }, {
                  name: "不可使用优惠券",
                  id: 1
                }],
                orderInfo: {
                  orderNo: null
                },
                availableCount: 0,
                unAvailableCount: 0,
                availableMoney: 0,
                createOrderStatus: !0,
                weeks: [{
                  number: "周一"
                }, {
                  number: "周二"
                }, {
                  number: "周三"
                }, {
                  number: "周四"
                }, {
                  number: "周五"
                }, {
                  number: "周六"
                }, {
                  number: "周日"
                }],
                currectDay: null,
                getDateConsult: {},
                consultDateList: {},
                chooseDateTime: {
                  date: "",
                  time: ""
                },
                globalData: null,
                formCreate: {
                  consultWay: null,
                  consultType: null,
                  counselorId: null,
                  serviceType: 1,
                  date: null,
                  time: null
                },
                lastTimeFlag: null,
                showStartTime: null
              }
            },
            computed: {
              isNewUser: function () {
                return !this.visitorc.hasVisitor()
              },
              consultTypeList: function () {
                return this.counselor ? T.default.optionalTypes(this.counselor.consult) : null
              },
              selectedConsultTypeItem: function () {
                var e = this;
                return this.counselor ? (this.consultTypeList || []).find((function (t) {
                  return t.value === e.formCreate.consultType
                })) : null
              },
              consultWayList: function () {
                return this.selectedConsultTypeItem ? b.default.create(this.counselor) : null
              }
            },
            onLoad: function (e) {
              var t = this;
              return (0, c.default)(s.default.mark((function r() {
                var n, o, i;
                return s.default.wrap((function (r) {
                  for (;;) switch (r.prev = r.next) {
                    case 0:
                      return n = t, t.getCurrentWeek(), o = function () {
                        var t = {};
                        return e.counselorId && (t.counselorId = e.counselorId), e.orderId && (t.orderId = e.orderId), e.counseloruser && "null" !== e.counseloruser && Object.assign(t, JSON.parse(decodeURIComponent(e.counseloruser))), t
                      }(), n.formCreate.counselorId = o.counselorId, r.next = 7, n.updateCounselor(o.counselorId);
                    case 7:
                      return n.formCreate.serviceType = t.counselor.serviceType, r.next = 10, t.visitorc.update(t.loginc.getInfo().userId);
                    case 10:
                      t.onShowLifecycle((0, c.default)(s.default.mark((function e() {
                        return s.default.wrap((function (e) {
                          for (;;) switch (e.prev = e.next) {
                            case 0:
                              return e.next = 2, t.visitorc.update(t.loginc.getInfo().userId);
                            case 2:
                            case "end":
                              return e.stop()
                          }
                        }), e)
                      })))), (i = k(n.formCreate.counselorId)) ? (t.selectVisitor(i.visitorId), t.selectConsultType(i.consultType), t.selectConsultWay(i.consultWay), t.selectDefault()) : t.selectDefault(), o.orderId && t.orderc.update(o.orderId);
                    case 14:
                    case "end":
                      return r.stop()
                  }
                }), r)
              })))()
            },
            methods: {
              payCheck: function () {
                return this.isNewUser || this.visitorc.getSelected() ? [null, void 0].includes(this.formCreate.consultType) ? "请选择咨询类型" : this.formCreate.consultWay ? this.chooseDateTime.time ? null : "请选择您的咨询时间" : "请选择咨询方式" : "请选择账户"
              },
              selectVisitor: function (e) {
                if (!this.orderc.inOrder()) {
                  var t = this.visitorc.getItem(e);
                  t && this.visitorc.select(t.id)
                }
              },
              selectConsultType: function (e) {
                if (!this.orderc.inOrder()) {
                  var t = (this.consultTypeList || []).find((function (t) {
                    return t.value === e
                  }));
                  t && (this.formCreate.consultType = t.value, this.formCreate.consultWay && this.selectConsultWay(this.formCreate.consultWay))
                }
              },
              selectConsultWay: function (e) {
                if (!this.orderc.inOrder()) {
                  var t = (this.consultWayList || []).find((function (t) {
                    return t.value === e
                  }));
                  t && (this.formCreate.consultWay = t.value, this.getCalendar(), this.setLastTimeFlag(t.value), this.chooseDateTime.time = "", this.chooseDateTime.date = "")
                }
              },
              selectDefault: function () {
                if (this.isNewUser || this.visitorc.getSelected() || this.selectVisitor(this.visitorc.getUsefuls()[0].id), [null, void 0].includes(this.formCreate.consultType) && this.consultTypeList && this.consultTypeList.length > 0) {
                  var e = this.consultTypeList.find((function (e) {
                    return 4 === e.value
                  }));
                  this.selectConsultType(e ? e.value : this.consultTypeList[0].value)
                }
                if ([null, void 0].includes(this.formCreate.consultWay) && this.consultWayList && this.consultWayList.length >= 0) {
                  var t = this.consultWayList.find((function (e) {
                    return 1 === e.value
                  }));
                  this.selectConsultWay(t ? t.value : this.consultWayList[0].value)
                }
              },
              timeClose: function () {
                this.$refs.timeDialog.close()
              },
              checkDiscount: function () {
                this.$refs.discountDialog.open()
              },
              discountClose: function () {
                this.$refs.discountDialog.close()
              },
              nothing: function () {},
              dialogConfirm: function () {
                this.$refs.submitDialog.close(), n.navigateBack({
                  delta: 1
                })
              },
              cancelDialog: function () {
                this.$refs.submitDialog.close()
              },
              clickBack: function () {
                this.$refs.submitDialog.open()
              },
              chooseVisitor: function () {
                this.$refs.chooseVDialog.open("center")
              },
              choosePerson: function (e, t) {
                this.selectVisitor(t.id)
              },
              toVisitorInfo: function (e) {
                0 === e.type ? this.toAdultsInfo(e.id) : this.toChildInfo(e.id)
              },
              toAdultsInfo: function (t) {
                e.navigateTo({
                  url: "/pages/consult/completeInfo?visitorID=" + t
                })
              },
              toChildInfo: function (t) {
                e.navigateTo({
                  url: "/pages/consult/completeDetail?visitorID=" + t
                })
              },
              setLastTimeFlag: function (e) {
                var t = null,
                  r = new Date;
                if (t = 1 === e ? r.getTime() + 108e5 : r.getTime() + 432e5, parseInt((0, p.parseTime)(t, "{h}")) > 20) {
                  var n = (0, p.parseTime)(t, "{y}/{m}/{d}") + " 21:00:00";
                  t = new Date(n).getTime(), t += 396e5
                }
                this.lastTimeFlag = (0, p.parseTime)(t, "{y}-{m}-{d}{h}")
              },
              chooseTime: function () {
                this.reCheckDate(this.chooseDateTime.date, this.chooseDateTime.time) ? (this.formCreate.date = this.chooseDateTime.date, this.formCreate.time = this.chooseDateTime.time) : (this.chooseDateTime.time = "", this.chooseDateTime.date = "", e.showToast({
                  title: "所选时段距离当前时间太近，无法确认时间，有需要请联系客服。",
                  icon: "none"
                }))
              },
              getTime: function (e) {
                var t = new Date(e.date),
                  r = t.getFullYear(),
                  n = t.getMonth() + 1;
                return "".concat(r, "年").concat(n, "月")
              },
              reCheckDate: function (e, t) {
                var r = e + t,
                  n = r.split("-")[0] + r.split("-")[1] + r.split("-")[2].substring(0, 4);
                if (null !== this.lastTimeFlag) {
                  var o = this.lastTimeFlag.split("-")[0] + this.lastTimeFlag.split("-")[1] + this.lastTimeFlag.split("-")[2];
                  return parseInt(o) <= parseInt(n) || void 0
                }
              },
              cleanTime: function () {
                this.formCreate.time = null, this.showStartTime = null, this.chooseDateTime.date = null, this.chooseDateTime.time = null
              },
              checkTime: function () {
                !(!this.chooseDateTime.date || !this.chooseDateTime.time) ? (this.formCreate.date = this.chooseDateTime.date, this.formCreate.time = this.chooseDateTime.time, this.$refs.timeDialog.close(), this.showStartTime = this.formCreate.date + " " + this.formCreate.time) : e.showToast({
                  title: "请选择咨询时间",
                  icon: "none"
                })
              },
              getCurrentWeek: function () {
                var e = new Date;
                e.getTime(), e.getDay(), this.currectDay = (0, p.parseTime)(e.toLocaleDateString(), "{y}-{m}-{d}")
              },
              getCalendar: function () {
                var t = this;
                return (0, c.default)(s.default.mark((function r() {
                  var n;
                  return s.default.wrap((function (r) {
                    for (;;) switch (r.prev = r.next) {
                      case 0:
                        return r.next = 2, (0, v.getCalendar)(t.counselor.counselorId, t.formCreate.consultType, t.formCreate.consultWay, t.currectDay);
                      case 2:
                        n = r.sent, t.consultDateList = n.dateList, t.consultDateList.length <= 0 && e.showToast({
                          title: "没有可约时间",
                          icon: "none"
                        });
                      case 5:
                      case "end":
                        return r.stop()
                    }
                  }), r)
                })))()
              },
              showProtocol: function (t) {
                var r = this.formCreate.date,
                  n = this.counselor.name,
                  o = this.formCreate.userName;
                e.navigateTo({
                  url: "/pages/consult/protocolPage?value=" + t + "&counselorName=" + n + "&consultDate=" + r + "&userName=" + o
                })
              },
              createOrder: function () {
                var t = this;
                t.formCreate.serviceType = 1;
                var r = this.visitorc.getSelected();
                this.payCheck() ? e.showToast({
                  title: this.payCheck(),
                  icon: "none"
                }) : this.createOrderStatus && (this.createOrderStatus = !1, (0, h.irequestdata)({
                  url: "/visitor/order/submit",
                  method: "post",
                  data: w(w({}, t.formCreate), {}, {
                    userVisitorId: r ? r.id : null,
                    userName: r ? r.name : null
                  }),
                  success: function (n) {
                    if (console.log("order", n), 200 === n.data.code) {
                      O(t.formCreate.counselorId, t.formCreate.consultType, t.formCreate.consultWay, r ? r.id : null);
                      var o = n.data.data;
                      t.createOrderStatus = !0, o.orderAmount > 0 ? e.redirectTo({
                        url: "/pages/appointment/appointDetail?orderId=" + o.orderId
                      }) : 0 === o.orderAmount && e.redirectTo({
                        url: "/pages/consult/orderDetail?orderId=" + o.orderId
                      })
                    } else t.createOrderStatus = !0, e.showToast({
                      title: n.data.msg,
                      icon: "none"
                    })
                  },
                  error: function () {
                    t.createOrderStatus = !0, console.log("新增失败")
                  }
                }))
              }
            }
          };
        t.default = S
      }).call(this, r("df3c").default, r("3223").default)
    },
    "568b": function (e, t, r) {
      r.d(t, "b", (function () {
        return n
      })), r.d(t, "c", (function () {
        return o
      })), r.d(t, "a", (function () {}));
      var n = function () {
          var e = this,
            t = (e.$createElement, e._self._c, e.isNewUser ? null : e.__map(e.visitorc.getUsefuls(), (function (t, r) {
              return {
                $orig: e.__get_orig(t),
                g0: e.visitorc.isSelected(t)
              }
            }))),
            r = e.isNewUser ? null : e.visitorc.hasAdult(),
            n = e.payCheck(),
            o = n ? e.payCheck() : null,
            i = e.orderc.inOrder(),
            s = e.orderc.inOrder(),
            a = s ? null : e.payCheck();
          e._isMounted || (e.e0 = function (t, r) {
            var n = arguments[arguments.length - 1].currentTarget.dataset;
            r = JSON.parse(n.item), e.choosePerson(r.type, r)
          }, e.e1 = function (t, r) {
            var n = arguments[arguments.length - 1].currentTarget.dataset;
            r = JSON.parse(n.item), e.toVisitorInfo(r)
          }, e.e2 = function (t) {
            return e.orderc.updateOrderTime(e.chooseDateTime.date, e.chooseDateTime.time)
          }), e.$mp.data = Object.assign({}, {
            $root: {
              l0: t,
              g1: r,
              m0: n,
              m1: o,
              g2: i,
              g3: s,
              m2: a
            }
          })
        },
        o = []
    },
    "7b6d": function (e, t, r) {
      (function (e, t) {
        var n = r("47a9");
        r("6686"), n(r("3240"));
        var o = n(r("0ea7"));
        e.__webpack_require_UNI_MP_PLUGIN__ = r, t(o.default)
      }).call(this, r("3223").default, r("df3c").createPage)
    },
    eb02: function (e, t, r) {
      r.r(t);
      var n = r("4ba6"),
        o = r.n(n);
      for (var i in n)["default"].indexOf(i) < 0 && function (e) {
        r.d(t, e, (function () {
          return n[e]
        }))
      }(i);
      t.default = o.a
    }
  },
  [
    ["7b6d", "common/runtime", "common/vendor"]
  ]
]);