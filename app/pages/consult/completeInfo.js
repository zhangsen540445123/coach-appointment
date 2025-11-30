(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/consult/completeInfo"], {
    3529: function (e, t, o) {
      (function (e, i) {
        var n = o("47a9");
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.default = void 0;
        var r = n(o("7eb4")),
          a = n(o("34cf")),
          s = n(o("ee10")),
          l = n(o("7ca3")),
          c = o("c4a0"),
          u = o("9359"),
          f = o("2052"),
          m = o("90c1"),
          h = o("28b7"),
          d = o("c074"),
          p = o("9b32"),
          v = o("1e0d");

        function g(e, t) {
          var o = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            t && (i = i.filter((function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), o.push.apply(o, i)
          }
          return o
        }

        function b(e) {
          for (var t = 1; t < arguments.length; t++) {
            var o = null != arguments[t] ? arguments[t] : {};
            t % 2 ? g(Object(o), !0).forEach((function (t) {
              (0, l.default)(e, t, o[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : g(Object(o)).forEach((function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t))
            }))
          }
          return e
        }
        var V = {
          components: {
            Navbar: function () {
              Promise.all([o.e("common/vendor"), o.e("components/Navbar")]).then(function () {
                return resolve(o("8412"))
              }.bind(null, o)).catch(o.oe)
            },
            pickerAddress: function () {
              Promise.all([o.e("common/vendor"), o.e("components/pickerAddress/pickerAddress")]).then(function () {
                return resolve(o("3774"))
              }.bind(null, o)).catch(o.oe)
            },
            RealNameVerify: function () {
              Promise.all([o.e("common/vendor"), o.e("components/RealNameVerify")]).then(function () {
                return resolve(o("6ef7"))
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
              cancelTimec: (0, h.useCancelTime)(),
              params: (0, c.ref)({
                orderId: null,
                paymentAvailableMinutes: null
              })
            }
          },
          data: function () {
            return {
              statusBarHeight: "padding-top: " + e.getSystemInfoSync().statusBarHeight + "px",
              addressStatus: !1,
              professionIndex: 0,
              array: [{
                name: "国企事业单位"
              }, {
                name: "外资"
              }, {
                name: "私企"
              }, {
                name: "个体"
              }, {
                name: "自由职业"
              }, {
                name: "专业人员(医生、律师、老师)"
              }, {
                name: "学生"
              }, {
                name: "退休人员"
              }, {
                name: "其他"
              }],
              globalData: null,
              sexType: [{
                value: 0,
                text: "女"
              }, {
                value: 1,
                text: "男"
              }],
              verifyTypes: [{
                value: 0,
                text: "手机号验证"
              }, {
                value: 1,
                text: "身份证验证"
              }],
              otherUm: [{
                value: 0,
                text: "否"
              }, {
                value: 1,
                text: "是"
              }],
              isConsultOther: [{
                value: 0,
                text: "否"
              }, {
                value: 1,
                text: "是"
              }],
              partnerShip: [{
                value: "父母",
                text: "父母"
              }, {
                value: "夫妻",
                text: "夫妻"
              }, {
                value: "子女",
                text: "子女"
              }, {
                value: "恋人",
                text: "恋人"
              }, {
                value: "朋友",
                text: "朋友"
              }, {
                value: "同事",
                text: "同事"
              }, {
                value: "其他",
                text: "其他"
              }],
              career: ["国企事业单位", "外资", "私企", "个体", "自由职业", "专业人员(医生、律师、老师)", "学生", "退休人员", "其他"],
              revenue: ["4000以下", "4000~5999", "6000~9999", "10000以上", "其他"],
              education: ["博士", "硕士", "本科", "大专", "高中", "中专及以下"],
              marriageData: ["已婚", "单身", "恋爱中", "丧偶", "离异", "其他"],
              childrenData: ["没有", "一个孩子", "一个以上", "其他"],
              directionLength: 0,
              checkStatus: 0,
              tempImageList: [],
              countImageList: [],
              isRealName: !1,
              needToRealName: {
                idcard: null,
                mobile: null,
                mobileArea: 86,
                name: null
              },
              formVisitor: {
                idcard: null,
                age: null,
                otherCity: null,
                otherCareer: null,
                otherChildren: null,
                type: 0,
                contactMobile: null,
                contactRelation: null,
                contactName: null,
                sex: null,
                otherHistory: null,
                otherIncome: null,
                otherMarrage: null,
                otherHistoryDesc: null,
                otherHistoryUrl: [],
                otherUm: null,
                consultOther: null,
                mobile: null,
                mobileArea: null,
                unionId: null,
                userId: null,
                name: null,
                verifyType: 0,
                realizeChannel: null,
                realizeChannelName: null
              }
            }
          },
          computed: {
            buttomStatus: function () {
              return !!((this.formVisitor.mobile || this.formVisitor.idcard) && this.formVisitor.age && null !== this.formVisitor.sex && this.formVisitor.contactName && this.formVisitor.contactRelation && this.formVisitor.contactMobile && null !== this.formVisitor.otherHistory && this.checkStatus)
            },
            channelOptions: function () {
              return [{
                value: 1,
                text: "公众号"
              }, {
                value: 2,
                text: "抖音"
              }, {
                value: 3,
                text: "视频号"
              }, {
                value: 4,
                text: "小红书"
              }, {
                value: 5,
                text: "其他"
              }]
            }
          },
          onLoad: function (e) {
            var t = this;
            console.log("options", e), console.log("statusBarHeight", this.statusBarHeight), this.params = {
              orderId: e.orderId,
              paymentAvailableMinutes: +e.paymentAvailableMinutes
            }, e.visitorID && "undefined" !== e.visitorID && t.latestVisitorDetail(e), this.params.orderId && this.cancelTimec.start([this.params]), setTimeout((function () {
              t.globalData = (0, m.storeGet)("counselor_info"), !1 != !!t.globalData.userId && (t.formVisitor.userId = t.globalData.userId)
            }), 500)
          },
          methods: {
            backClick: function () {
              i.navigateBack({
                delta: 1
              })
            },
            gotoTab: function () {
              e.switchTab({
                url: "/pages//user/user"
              })
            },
            checkPhone: function (e) {
              var t = this,
                o = e.detail.value;
              o = o.replace(/[^\d]/g, ""), setTimeout((function () {
                t.formVisitor.mobile = o
              }), 1)
            },
            checkContact: function (e) {
              var t = this,
                o = e.detail.value;
              o = o.replace(/[^\d]/g, ""), setTimeout((function () {
                t.formVisitor.contactMobile = o
              }), 1)
            },
            bindAddress: function (e) {
              this.formVisitor.otherCity = e.data.join(" ")
            },
            bindCareer: function (e) {
              console.log("e--\x3e", e), this.formVisitor.otherCareer = this.career[e.detail.value]
            },
            bindIncome: function (e) {
              this.formVisitor.otherIncome = this.revenue[e.detail.value]
            },
            bindMarriage: function (e) {
              this.formVisitor.otherMarrage = this.marriageData[e.detail.value]
            },
            bindChildren: function (e) {
              this.formVisitor.otherChildren = this.childrenData[e.detail.value]
            },
            getCountryCode: function (e) {
              this.needToRealName.mobileArea = e
            },
            toOpenVerification: function () {
              this.$refs.realNameVerify.open(this.needToRealName)
            },
            onRealNameVerifySuccess: function (e) {
              var t = e.isRealName,
                o = e.needToRealName,
                i = e.verifyType;
              this.isRealName = t, this.needToRealName = b(b({}, this.needToRealName), o), this.formVisitor.verifyType = i, this.formVisitor.idcard = o.idcard, this.formVisitor.name = o.name, this.formVisitor.mobile = o.mobile, this.formVisitor.mobileArea = o.mobileArea
            },
            removeImage: function (e) {
              for (var t = 0; t < this.countImageList.length; t++)
                if (-1 !== e.tempFilePath.indexOf(this.countImageList[t].fileName)) {
                  this.countImageList.splice(t, 1);
                  break
                }
            },
            uploadImageList: function (e) {
              console.log(e);
              for (var t = 0; t < e.tempFilePaths.length; t++) this.uploadSingleImage("name", e.tempFilePaths[t], 0)
            },
            ViewImage: function (t) {
              e.previewImage({
                urls: this.imgList,
                current: t.currentTarget.dataset.url
              })
            },
            uploadSingleImage: function (t, o, i) {
              var n = this;
              (0, u.uploadFile)({
                url: "/resources/upload",
                method: "post",
                filePath: o,
                name: "file",
                success: function (t) {
                  console.log(t);
                  var o = JSON.parse(t.data);
                  200 === o.code ? (e.showToast({
                    title: "图片上传成功",
                    icon: "none"
                  }), n.countImageList.push(o.data)) : (e.showToast({
                    title: "图片上传失败",
                    icon: "none"
                  }), n.$refs.imagesRef.delFile(n.$refs.imagesRef.filesList.length - 1))
                },
                error: function () {
                  console.log("失败")
                }
              })
            },
            checkMedicine: function (e) {
              this.formVisitor.otherHistory = e
            },
            checkRecord: function (e) {
              this.formVisitor.videoTape = e
            },
            showProtocol: function (t) {
              e.navigateTo({
                url: "/pages/consult/protocolPage?value=" + t
              })
            },
            radioChange: function (e) {
              var t = e.detail.value,
                o = this.partnerShip[t];
              this.formVisitor.contactRelation = o.text, this.formVisitor.contactRelationValue = o.value
            },
            bindReasonContent: function (e) {
              this.formVisitor.reasonContent = e.detail.value
            },
            bindContentIncome: function (e) {
              this.formVisitor.otherIncome = e.detail.value
            },
            bindContent: function (e) {
              this.formVisitor.otherHistoryDesc = e.detail.value
            },
            latestVisitorDetail: function (e) {
              var t = this,
                o = this;
              (0, u.irequestdata)({
                url: "/visitor/visitorInfo/showUserVisitorInfoById/" + e.visitorID,
                method: "get",
                success: function (e) {
                  if (200 === e.data.code) {
                    if (o.formVisitor = e.data.data, o.needToRealName.verifyType = 0, o.needToRealName.mobileArea = e.data.data.mobileArea, t.isRealName = !0, o.countImageList = [], null !== o.formVisitor.otherHistoryUrl && o.formVisitor.otherHistoryUrl.length > 0)
                      for (var i = 0; i < o.formVisitor.otherHistoryUrl.length; i++) o.countImageList.push({
                        url: o.formVisitor.otherHistoryUrl[i],
                        fileName: o.formVisitor.otherHistoryUrl[i]
                      });
                    o.tempImageList = o.countImageList
                  }
                },
                error: function () {}
              })
            },
            phoneFun: function (e) {
              return /^[1][1,2,3,4,5,6,7,8,9, 0][0-9]{9}$/.test(e) ? (console.log("手机号格式正确"), !0) : (console.log("手机号格式不正确"), !1)
            },
            changeType: function () {
              1 === this.checkStatus ? this.checkStatus = 0 : this.checkStatus = 1
            },
            saveSubmit: function () {
              var t = this,
                o = this;
              if (console.log("----form:" + JSON.stringify(this.formVisitor)), console.log("checkStatus = " + this.checkStatus), !1 !== this.isRealName)
                if (this.formVisitor.age)
                  if (0 !== this.formVisitor.verifyType || this.formVisitor.mobile)
                    if (null !== this.formVisitor.sex)
                      if (this.formVisitor.contactName)
                        if (this.formVisitor.contactRelation)
                          if (this.formVisitor.contactMobile)
                            if (null !== this.formVisitor.otherHistory)
                              if (1 !== this.formVisitor.otherHistory || this.formVisitor.otherHistoryDesc)
                                if (0 !== this.checkStatus) {
                                  this.formVisitor.otherHistoryUrl = [];
                                  for (var i = 0; i < this.countImageList.length; i++) this.formVisitor.otherHistoryUrl.push(this.countImageList[i].url);
                                  1 !== this.formVisitor.otherHistory && (this.formVisitor.otherHistoryUrl = [], this.formVisitor.otherHistoryDesc = null), (0, u.irequestdata)({
                                    url: "/visitor/visitorInfo/updateAdultsInfo",
                                    method: "post",
                                    data: o.formVisitor,
                                    success: function () {
                                      var i = (0, s.default)(r.default.mark((function i(n) {
                                        var s, l, c;
                                        return r.default.wrap((function (i) {
                                          for (;;) switch (i.prev = i.next) {
                                            case 0:
                                              if (console.log(n), 200 !== n.data.code) {
                                                i.next = 15;
                                                break
                                              }
                                              if (e.showToast({
                                                  title: "提交成功"
                                                }), !o.params.orderId) {
                                                i.next = 14;
                                                break
                                              }
                                              return i.next = 6, (0, p.getAdults)(t.loginc.getInfo().userId);
                                            case 6:
                                              return s = i.sent, l = (0, a.default)(s, 1), c = l[0], i.next = 11, (0, d.bindVisitorToOrder)(o.params.orderId, c.id);
                                            case 11:
                                              e.redirectTo({
                                                url: "/pages/consult/orderDetail?orderId=".concat(o.params.orderId)
                                              }), i.next = 15;
                                              break;
                                            case 14:
                                              e.navigateBack({
                                                delta: 1
                                              });
                                            case 15:
                                            case "end":
                                              return i.stop()
                                          }
                                        }), i)
                                      })));
                                      return function (e) {
                                        return i.apply(this, arguments)
                                      }
                                    }(),
                                    error: function () {}
                                  })
                                } else e.showToast({
                                  title: "请勾选相应协议",
                                  icon: "none"
                                });
              else e.showToast({
                title: "请填写精神科服药史或者就医史",
                icon: "none"
              });
              else e.showToast({
                title: "请选择是否有精神科服药史或者就医史",
                icon: "none"
              });
              else e.showToast({
                title: "请输入紧急联系人联系方式",
                icon: "none"
              });
              else e.showToast({
                title: "请选择紧急联系人关系",
                icon: "none"
              });
              else e.showToast({
                title: "请输入紧急联系人姓名",
                icon: "none"
              });
              else e.showToast({
                title: "请选择性别",
                icon: "none"
              });
              else e.showToast({
                title: "请输入正确的手机号码",
                icon: "none"
              });
              else e.showToast({
                title: "请输入年龄",
                icon: "none"
              });
              else e.showToast({
                title: "请先进行实名认证",
                icon: "none"
              })
            },
            deleteVisitor: function () {
              var t = this;
              e.showModal({
                title: "警告",
                content: "删除客户操作无法撤销，请谨慎操作！",
                showCancel: !0,
                cancelText: "确认删除",
                confirmText: "我再想想",
                cancelColor: "#cccccc",
                success: function (o) {
                  o.cancel && (0, f.requestDeleteVisitor)(t.formVisitor.id).then((function () {
                    e.showToast({
                      title: "删除成功",
                      icon: "none",
                      duration: 1e3
                    }), setTimeout((function () {
                      i.navigateBack({
                        delta: 1
                      })
                    }), 1e3)
                  })).catch((function (t) {
                    e.showToast({
                      title: t,
                      icon: "none",
                      duration: 2e3
                    })
                  }))
                }
              })
            }
          }
        };
        t.default = V
      }).call(this, o("df3c").default, o("3223").default)
    },
    "6a13": function (e, t, o) {
      o.d(t, "b", (function () {
        return n
      })), o.d(t, "c", (function () {
        return r
      })), o.d(t, "a", (function () {
        return i
      }));
      var i = {
          uniDataCheckbox: function () {
            return Promise.all([o.e("common/vendor"), o.e("uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox")]).then(o.bind(null, "eebd"))
          },
          pickerAddress: function () {
            return Promise.all([o.e("common/vendor"), o.e("components/pickerAddress/pickerAddress")]).then(o.bind(null, "3774"))
          },
          uniFilePicker: function () {
            return Promise.all([o.e("common/vendor"), o.e("uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker")]).then(o.bind(null, "b5ea"))
          }
        },
        n = function () {
          var e = this,
            t = (e.$createElement, e._self._c, o("42d6")),
            i = e.params.orderId ? e.cancelTimec.getText(e.params.orderId) : null,
            n = 1 === e.formVisitor.otherHistory ? e.tempImageList.length : null,
            r = e.channelOptions.slice(0, 4),
            a = e.channelOptions.slice(4);
          e.$mp.data = Object.assign({}, {
            $root: {
              m0: t,
              g0: i,
              g1: n,
              g2: r,
              g3: a
            }
          })
        },
        r = []
    },
    a807: function (e, t, o) {
      o.r(t);
      var i = o("6a13"),
        n = o("d2d4");
      for (var r in n)["default"].indexOf(r) < 0 && function (e) {
        o.d(t, e, (function () {
          return n[e]
        }))
      }(r);
      o("3a46");
      var a = o("828b"),
        s = Object(a.a)(n.default, i.b, i.c, !1, null, "462077b2", null, !1, i.a, void 0);
      t.default = s.exports
    },
    d2d4: function (e, t, o) {
      o.r(t);
      var i = o("3529"),
        n = o.n(i);
      for (var r in i)["default"].indexOf(r) < 0 && function (e) {
        o.d(t, e, (function () {
          return i[e]
        }))
      }(r);
      t.default = n.a
    },
    fa80: function (e, t, o) {
      (function (e, t) {
        var i = o("47a9");
        o("6686"), i(o("3240"));
        var n = i(o("a807"));
        e.__webpack_require_UNI_MP_PLUGIN__ = o, t(n.default)
      }).call(this, o("3223").default, o("df3c").createPage)
    }
  },
  [
    ["fa80", "common/runtime", "common/vendor"]
  ]
]);