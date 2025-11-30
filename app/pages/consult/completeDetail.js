(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/consult/completeDetail"], {
    7464: function (t, e, o) {
      o.d(e, "b", (function () {
        return i
      })), o.d(e, "c", (function () {
        return a
      })), o.d(e, "a", (function () {
        return n
      }));
      var n = {
          uniDataCheckbox: function () {
            return Promise.all([o.e("common/vendor"), o.e("uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox")]).then(o.bind(null, "eebd"))
          }
        },
        i = function () {
          this.$createElement;
          var t = (this._self._c, o("42d6")),
            e = this.params.orderId ? this.cancelTimec.getText(this.params.orderId) : null;
          this.$mp.data = Object.assign({}, {
            $root: {
              m0: t,
              g0: e
            }
          })
        },
        a = []
    },
    "759d": function (t, e, o) {
      (function (t, e) {
        var n = o("47a9");
        o("6686"), n(o("3240"));
        var i = n(o("df48"));
        t.__webpack_require_UNI_MP_PLUGIN__ = o, e(i.default)
      }).call(this, o("3223").default, o("df3c").createPage)
    },
    a0d0: function (t, e, o) {
      o.r(e);
      var n = o("b80b"),
        i = o.n(n);
      for (var a in n)["default"].indexOf(a) < 0 && function (t) {
        o.d(e, t, (function () {
          return n[t]
        }))
      }(a);
      e.default = i.a
    },
    b80b: function (t, e, o) {
      (function (t, n) {
        var i = o("47a9");
        Object.defineProperty(e, "__esModule", {
          value: !0
        }), e.default = void 0;
        var a = i(o("7eb4")),
          r = i(o("34cf")),
          s = i(o("ee10")),
          c = o("c4a0"),
          u = o("9359"),
          l = o("90c1"),
          d = o("2052"),
          f = o("28b7"),
          h = o("c074"),
          m = o("9b32"),
          v = o("1e0d"),
          p = {
            components: {
              Navbar: function () {
                Promise.all([o.e("common/vendor"), o.e("components/Navbar")]).then(function () {
                  return resolve(o("8412"))
                }.bind(null, o)).catch(o.oe)
              },
              VisitorHeader: function () {
                o.e("components/visitor/VisitorHeader").then(function () {
                  return resolve(o("632c"))
                }.bind(null, o)).catch(o.oe)
              }
            },
            setup: function () {
              return {
                loginc: (0, v.useLogin)(),
                cancelTimec: (0, f.useCancelTime)(),
                params: (0, c.ref)({
                  orderId: null,
                  paymentAvailableMinutes: null
                })
              }
            },
            data: function () {
              return {
                statusBarHeight: "padding-top: " + t.getSystemInfoSync().statusBarHeight + "px",
                globalData: null,
                sexType: [{
                  value: 0,
                  text: "女"
                }, {
                  value: 1,
                  text: "男"
                }],
                checkStatus: 0,
                formVisitor: {
                  age: null,
                  contactMobile: null,
                  contactRelation: null,
                  contactName: null,
                  sex: null,
                  type: 1,
                  userId: null,
                  name: null
                },
                orderInfo: null
              }
            },
            computed: {
              buttomStatus: function () {
                return !1 != !!this.formVisitor.name && !1 != !!this.formVisitor.age && null !== this.formVisitor.sex && !1 != !!this.formVisitor.contactName && !1 != !!this.formVisitor.contactRelation && !1 != !!this.formVisitor.contactMobile && 0 !== this.checkStatus
              }
            },
            onLoad: function (t) {
              var e = this;
              this.params = {
                orderId: t.orderId,
                paymentAvailableMinutes: +t.paymentAvailableMinutes
              }, t.visitorID && "undefined" !== t.visitorID && e.latestVisitorDetail(t), this.params.orderId && this.cancelTimec.start([this.params]), setTimeout((function () {
                e.globalData = (0, l.storeGet)("counselor_info"), !1 != !!e.globalData.userId && (e.formVisitor.userId = e.globalData.userId)
              }), 500)
            },
            methods: {
              backClick: function () {
                n.navigateBack({
                  delta: 1
                })
              },
              gotoTab: function () {
                t.switchTab({
                  url: "/pages//user/user"
                })
              },
              checkPhone: function (t) {
                var e = this,
                  o = t.detail.value;
                o = o.replace(/[^\d]/g, ""), setTimeout((function () {
                  e.formVisitor.mobile = o
                }), 1)
              },
              checkAge: function (t) {
                var e = this,
                  o = t.detail.value;
                o = o.replace(/[^\d]/g, ""), setTimeout((function () {
                  e.formVisitor.age = o
                }), 1)
              },
              checkContact: function (t) {
                var e = this,
                  o = t.detail.value;
                o = o.replace(/[^\d]/g, ""), setTimeout((function () {
                  e.formVisitor.contactMobile = o
                }), 1)
              },
              sexChange: function (t) {
                this.formVisitor.sex = t.detail.value
              },
              latestVisitorDetail: function (t) {
                var e = this;
                (0, u.irequestdata)({
                  url: "/visitor/visitorInfo/showUserVisitorInfoById/" + t.visitorID,
                  method: "get",
                  success: function (t) {
                    console.log(t), 200 === t.data.code && (e.formVisitor = t.data.data)
                  },
                  error: function () {}
                })
              },
              phoneFun: function (t) {
                return /^[1][1,2,3,4,5,6,7,8,9, 0][0-9]{9}$/.test(t) ? (console.log("手机号格式正确"), !0) : (console.log("手机号格式不正确"), !1)
              },
              showProtocol: function (e) {
                t.navigateTo({
                  url: "/pages/consult/protocolPage?value=" + e
                })
              },
              changeType: function () {
                1 === this.checkStatus ? this.checkStatus = 0 : this.checkStatus = 1
              },
              saveSubmit: function () {
                var e = this,
                  o = this;
                console.log("----form:" + JSON.stringify(this.formVisitor)), !1 != !!this.formVisitor.name ? !1 != !!this.formVisitor.age ? null !== this.formVisitor.sex ? !1 != !!this.formVisitor.contactName ? null !== this.formVisitor.contactRelation ? !1 != !!this.formVisitor.contactMobile ? 0 !== this.checkStatus ? (0, u.irequestdata)({
                  url: "/visitor/visitorInfo/updateAdultsInfo",
                  method: "post",
                  data: o.formVisitor,
                  success: function () {
                    var n = (0, s.default)(a.default.mark((function n(i) {
                      var s, c, u;
                      return a.default.wrap((function (n) {
                        for (;;) switch (n.prev = n.next) {
                          case 0:
                            if (console.log(i), 200 !== i.data.code) {
                              n.next = 15;
                              break
                            }
                            if (t.showToast({
                                title: "提交成功"
                              }), !o.params.orderId) {
                              n.next = 14;
                              break
                            }
                            return n.next = 6, (0, m.getChilds)(e.loginc.getInfo().userId);
                          case 6:
                            return s = n.sent, c = (0, r.default)(s, 1), u = c[0], n.next = 11, (0, h.bindVisitorToOrder)(o.params.orderId, u.id);
                          case 11:
                            t.redirectTo({
                              url: "/pages/consult/orderDetail?orderId=".concat(o.params.orderId)
                            }), n.next = 15;
                            break;
                          case 14:
                            t.navigateBack({
                              delta: 1
                            });
                          case 15:
                          case "end":
                            return n.stop()
                        }
                      }), n)
                    })));
                    return function (t) {
                      return n.apply(this, arguments)
                    }
                  }(),
                  error: function () {}
                }) : t.showToast({
                  title: "请勾选相应协议",
                  icon: "none"
                }) : t.showToast({
                  title: "请输入监护人联系方式",
                  icon: "none"
                }) : t.showToast({
                  title: "请选择监护人关系",
                  icon: "none"
                }) : t.showToast({
                  title: "请输入监护人姓名",
                  icon: "none"
                }) : t.showToast({
                  title: "请选择性别",
                  icon: "none"
                }) : t.showToast({
                  title: "请输入年龄",
                  icon: "none"
                }) : t.showToast({
                  title: "请输入姓名",
                  icon: "none"
                })
              },
              deleteVisitor: function () {
                var e = this;
                t.showModal({
                  title: "警告",
                  content: "删除客户操作无法撤销，请谨慎操作！",
                  showCancel: !0,
                  cancelText: "确认删除",
                  confirmText: "我再想想",
                  cancelColor: "#cccccc",
                  success: function (o) {
                    o.cancel && (0, d.requestDeleteVisitor)(e.formVisitor.id).then((function () {
                      t.showToast({
                        title: "删除成功",
                        icon: "none",
                        duration: 1e3
                      }), setTimeout((function () {
                        n.navigateBack({
                          delta: 1
                        })
                      }), 1e3)
                    })).catch((function (e) {
                      t.showToast({
                        title: e,
                        icon: "none",
                        duration: 2e3
                      })
                    }))
                  }
                })
              }
            }
          };
        e.default = p
      }).call(this, o("df3c").default, o("3223").default)
    },
    df48: function (t, e, o) {
      o.r(e);
      var n = o("7464"),
        i = o("a0d0");
      for (var a in i)["default"].indexOf(a) < 0 && function (t) {
        o.d(e, t, (function () {
          return i[t]
        }))
      }(a);
      o("69ff");
      var r = o("828b"),
        s = Object(r.a)(i.default, n.b, n.c, !1, null, "78690c71", null, !1, n.a, void 0);
      e.default = s.exports
    }
  },
  [
    ["759d", "common/runtime", "common/vendor"]
  ]
]);