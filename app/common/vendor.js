require("../@babel/runtime/helpers/Arrayincludes");
var e = require("../@babel/runtime/helpers/typeof");
(global.webpackJsonp = global.webpackJsonp || []).push([
  ["common/vendor"], {
    "011a": function (e, t) {
      function n() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {})))
        } catch (t) {}
        return (e.exports = n = function () {
          return !!t
        }, e.exports.__esModule = !0, e.exports.default = e.exports)()
      }
      e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    "0132": function (e, t, n) {
      var o = n("e3b2");
      n.n(o).a
    },
    "01f1": function (e, t, n) {
      (function (e) {
        var o = n("47a9");
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.login = t.getUserinfo = void 0;
        var c = o(n("7eb4")),
          a = o(n("ee10")),
          r = o(n("7ca3")),
          u = o(n("8138")),
          i = n("9816");

        function s(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            t && (o = o.filter((function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), n.push.apply(n, o)
          }
          return n
        }

        function y(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? s(Object(n), !0).forEach((function (t) {
              (0, r.default)(e, t, n[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : s(Object(n)).forEach((function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }))
          }
          return e
        }
        o(n("8dc7"));
        var d = function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return new Promise((function (n, o) {
              e.login({
                success: function (e) {
                  n((0, u.default)({
                    url: "/wx/user/" + i.appid + "/login",
                    method: "get",
                    data: y(y({}, t), {}, {
                      code: e.code
                    })
                  }))
                }
              })
            }))
          },
          l = function () {
            var e = (0, a.default)(c.default.mark((function e(t) {
              return c.default.wrap((function (e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.abrupt("return", d(t));
                  case 1:
                  case "end":
                    return e.stop()
                }
              }), e)
            })));
            return function (t) {
              return e.apply(this, arguments)
            }
          }();
        t.getUserinfo = l;
        var f = l;
        t.login = f
      }).call(this, n("df3c").default)
    },
    "0270": function (e, t, n) {
      (function (e) {
        var o = n("47a9");
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.default = void 0;
        var c = o(n("6280")),
          a = o(n("dc03"));

        function r(e) {
          for (var t = {}, n = e.split(","), o = 0; o < n.length; o += 1) t[n[o]] = !0;
          return t
        }
        var u = r("br,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"),
          i = r("a,abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),
          s = r("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
        t.default = function (t, n, o, r) {
          t = function (e) {
            return e.replace(/<!--.*?-->/gi, "").replace(/\/\*.*?\*\//gi, "").replace(/<script[^]*<\/script>/gi, "").replace(/<style[^]*<\/style>/gi, "")
          }(t = function (e) {
            return /<body.*>([^]*)<\/body>/.test(e) ? RegExp.$1 : e
          }(t)), t = c.default.strDiscode(t);
          var y = [],
            d = {
              nodes: [],
              imageUrls: []
            },
            l = function () {
              var t = {};
              return e.getSystemInfo({
                success: function (e) {
                  t.width = e.windowWidth, t.height = e.windowHeight
                }
              }), t
            }();

          function f(e) {
            this.node = "element", this.tag = e, this.$screen = l
          }
          return (0, a.default)(t, {
            start: function (e, t, a) {
              var r = new f(e);
              if (0 !== y.length) {
                var l = y[0];
                void 0 === l.nodes && (l.nodes = [])
              }
              if (u[e] ? r.tagType = "block" : i[e] ? r.tagType = "inline" : s[e] && (r.tagType = "closeSelf"), r.attr = t.reduce((function (e, t) {
                  var n = t.name,
                    o = t.value;
                  return "class" === n && (r.classStr = o), "style" === n && (r.styleStr = o), o.match(/ /) && (o = o.split(" ")), e[n] ? Array.isArray(e[n]) ? e[n].push(o) : e[n] = [e[n], o] : e[n] = o, e
                }), {}), r.classStr ? r.classStr += " ".concat(r.tag) : r.classStr = r.tag, "inline" === r.tagType && (r.classStr += " inline"), "img" === r.tag) {
                var m = r.attr.src;
                m = c.default.urlToHttpUrl(m, o.domain), Object.assign(r.attr, o, {
                  src: m || ""
                }), m && d.imageUrls.push(m)
              }
              if ("a" === r.tag && (r.attr.href = r.attr.href || ""), "table" !== r.tag && "tr" !== r.tag && "td" !== r.tag || (r.styleStr = "", r.attr.width && (r.styleStr += "width:" + r.attr.width + "px;", r.attr.width > r.$screen.width && r.attr.height && (r.attr.height = r.$screen.width * r.attr.height / r.attr.width)), r.attr.height && (r.styleStr += "height:" + r.attr.height + "px;")), "video" === r.tag && (r.styleStr = "", r.attr.width && (r.styleStr += "width:" + r.attr.width + "px;", r.attr.width > r.$screen.width && r.attr.height && (r.attr.height = r.$screen.width * r.attr.height / r.attr.width)), r.attr.height && (r.styleStr += "height:" + r.attr.height + "px;")), "font" === r.tag) {
                var p = ["x-small", "small", "medium", "large", "x-large", "xx-large", "-webkit-xxx-large"],
                  h = {
                    color: "color",
                    face: "font-family",
                    size: "font-size"
                  };
                r.styleStr || (r.styleStr = ""), Object.keys(h).forEach((function (e) {
                  if (r.attr[e]) {
                    var t = "size" === e ? p[r.attr[e] - 1] : r.attr[e];
                    r.styleStr += "".concat(h[e], ": ").concat(t, ";")
                  }
                }))
              }
              if ("source" === r.tag && (d.source = r.attr.src), n.start && n.start(r, d), a) {
                var C = y[0] || d;
                void 0 === C.nodes && (C.nodes = []), C.nodes.push(r)
              } else y.unshift(r)
            },
            end: function (e) {
              var t = y.shift();
              if (t.tag !== e && console.error("invalid state: mismatch end tag"), "video" === t.tag && d.source && (t.attr.src = d.source, delete d.source), n && n.end && n.end(t, d), 0 === y.length) d.nodes.push(t);
              else {
                var o = y[0];
                o.nodes || (o.nodes = []), o.nodes.push(t)
              }
            },
            chars: function (e) {
              if (e.trim()) {
                var t = {
                  node: "text",
                  text: e
                };
                if (n.chars && n.chars(t, d), 0 === y.length) d.nodes.push(t);
                else {
                  var o = y[0];
                  void 0 === o.nodes && (o.nodes = []), o.nodes.push(t)
                }
              }
            }
          }), d
        }
      }).call(this, n("3223").default)
    },
    "02ea": function (e, t, n) {},
    "0815": function (e, t) {
      e.exports = "https://localhost/api/file/image/位图.png"
    },
    "09cc": function (e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0, t.default = {
        pulldown: "",
        refreshempty: "",
        back: "",
        forward: "",
        more: "",
        "more-filled": "",
        scan: "",
        qq: "",
        weibo: "",
        weixin: "",
        pengyouquan: "",
        loop: "",
        refresh: "",
        "refresh-filled": "",
        arrowthindown: "",
        arrowthinleft: "",
        arrowthinright: "",
        arrowthinup: "",
        "undo-filled": "",
        undo: "",
        redo: "",
        "redo-filled": "",
        bars: "",
        chatboxes: "",
        camera: "",
        "chatboxes-filled": "",
        "camera-filled": "⿷",
        "cart-filled": "",
        cart: "",
        "checkbox-filled": "",
        checkbox: "",
        arrowleft: "",
        arrowdown: "",
        arrowright: "",
        "smallcircle-filled": "",
        arrowup: "",
        circle: "",
        "eye-filled": "",
        "eye-slash-filled": "⺌",
        "eye-slash": "⺗",
        eye: "㥮",
        "flag-filled": "㤘",
        flag: "",
        "gear-filled": "",
        reload: "",
        gear: "",
        "hand-thumbsdown-filled": "",
        "hand-thumbsdown": "䎱",
        "hand-thumbsup-filled": "䎬",
        "heart-filled": "⺻",
        "hand-thumbsup": "䏝",
        heart: "䓖",
        home: "",
        info: "",
        "home-filled": "",
        "info-filled": "",
        "circle-filled": "",
        "chat-filled": "䞍",
        chat: "",
        "mail-open-filled": "䦃",
        "email-filled": "",
        "mail-open": "䦅",
        email: "",
        checkmarkempty: "",
        list: "",
        "locked-filled": "䲣",
        locked: "",
        "map-filled": "䴓",
        "map-pin": "䴕",
        "map-pin-ellipse": "",
        map: "",
        "minus-filled": "",
        "mic-filled": "",
        minus: "",
        micoff: "",
        mic: "",
        clear: "",
        smallcircle: "?",
        close: "",
        closeempty: "",
        paperclip: "",
        paperplane: "",
        "paperplane-filled": "?",
        "person-filled": "",
        "contact-filled": "",
        person: "",
        contact: "",
        "images-filled": "?",
        phone: "",
        images: "?",
        image: "",
        "image-filled": "?",
        "location-filled": "",
        location: "",
        "plus-filled": "",
        plus: "",
        plusempty: "",
        "help-filled": "",
        help: "",
        "navigate-filled": "?",
        navigate: "",
        "mic-slash-filled": "?",
        search: "",
        settings: "",
        sound: "",
        "sound-filled": "?",
        "spinner-cycle": "",
        "download-filled": "?",
        "personadd-filled": "",
        "videocam-filled": "?",
        personadd: "",
        upload: "",
        "upload-filled": "?",
        starhalf: "",
        "star-filled": "",
        star: "",
        trash: "",
        "phone-filled": "",
        compose: "",
        videocam: "",
        "trash-filled": "?",
        download: "",
        "chatbubble-filled": "",
        chatbubble: "",
        "cloud-download": "?",
        "cloud-upload-filled": "?",
        "cloud-upload": "?",
        "cloud-download-filled": "?",
        headphones: "?",
        shop: ""
      }
    },
    "0ab2": function (e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0;
      var o = (0, n("c4a0").ref)(86);
      t.default = function () {
        return {
          getValue: function () {
            return o.value
          },
          setValue: function (e) {
            return o.value = e
          },
          resetValue: function () {
            return o.value = 86
          }
        }
      }
    },
    "0bdb": function (e, t, n) {
      var o = n("d551");

      function c(e, t) {
        for (var n = 0; n < t.length; n++) {
          var c = t[n];
          c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(e, o(c.key), c)
        }
      }
      e.exports = function (e, t, n) {
        return t && c(e.prototype, t), n && c(e, n), Object.defineProperty(e, "prototype", {
          writable: !1
        }), e
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    "0d97": function (e, t, n) {},
    "0ee4": function (t, n) {
      var o;
      o = function () {
        return this
      }();
      try {
        o = o || new Function("return this")()
      } catch (t) {
        "object" === ("undefined" == typeof window ? "undefined" : e(window)) && (o = window)
      }
      t.exports = o
    },
    "10d8": function (e, t, n) {
      (function (e, n) {
        function o(e, t) {
          var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
          if (!n) {
            if (Array.isArray(e) || (n = function (e, t) {
                if (e) {
                  if ("string" == typeof e) return c(e, t);
                  var n = Object.prototype.toString.call(e).slice(8, -1);
                  return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? c(e, t) : void 0
                }
              }(e)) || t && e && "number" == typeof e.length) {
              n && (e = n);
              var o = 0,
                a = function () {};
              return {
                s: a,
                n: function () {
                  return o >= e.length ? {
                    done: !0
                  } : {
                    done: !1,
                    value: e[o++]
                  }
                },
                e: function (e) {
                  throw e
                },
                f: a
              }
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
          }
          var r, u = !0,
            i = !1;
          return {
            s: function () {
              n = n.call(e)
            },
            n: function () {
              var e = n.next();
              return u = e.done, e
            },
            e: function (e) {
              i = !0, r = e
            },
            f: function () {
              try {
                u || null == n.return || n.return()
              } finally {
                if (i) throw r
              }
            }
          }
        }

        function c(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
          return o
        }
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.default = void 0;
        var a, r, u = {
            trustTags: l("a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,ruby,rt,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video"),
            blockTags: l("address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section"),
            ignoreTags: l("area,base,canvas,embed,frame,head,iframe,input,link,map,meta,param,rp,script,source,style,textarea,title,track,wbr"),
            voidTags: l("area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr"),
            entities: {
              lt: "<",
              gt: ">",
              quot: '"',
              apos: "'",
              ensp: "?",
              emsp: "?",
              nbsp: "?",
              semi: ";",
              ndash: "–",
              mdash: "—",
              middot: "·",
              lsquo: "‘",
              rsquo: "’",
              ldquo: "“",
              rdquo: "”",
              bull: "?",
              hellip: "…",
              larr: "←",
              uarr: "↑",
              rarr: "→",
              darr: "↓"
            },
            tagStyle: {
              address: "font-style:italic",
              big: "display:inline;font-size:1.2em",
              caption: "display:table-caption;text-align:center",
              center: "text-align:center",
              cite: "font-style:italic",
              dd: "margin-left:40px",
              mark: "background-color:yellow",
              pre: "font-family:monospace;white-space:pre",
              s: "text-decoration:line-through",
              small: "display:inline;font-size:0.8em",
              strike: "text-decoration:line-through",
              u: "text-decoration:underline"
            },
            svgDict: {
              animatetransform: "animateTransform",
              lineargradient: "linearGradient",
              viewbox: "viewBox",
              attributename: "attributeName",
              repeatcount: "repeatCount",
              repeatdur: "repeatDur",
              foreignobject: "foreignObject"
            }
          },
          i = {};
        if (e.canIUse("getWindowInfo")) a = e.getWindowInfo().windowWidth, r = e.getDeviceInfo().system;
        else {
          var s = e.getSystemInfoSync();
          a = s.windowWidth, r = s.system
        }
        var y = l(" ,\r,\n,\t,\f"),
          d = 0;

        function l(e) {
          for (var t = Object.create(null), n = e.split(","), o = n.length; o--;) t[n[o]] = !0;
          return t
        }

        function f(e, t) {
          for (var n = e.indexOf("&"); - 1 !== n;) {
            var o = e.indexOf(";", n + 3),
              c = void 0;
            if (-1 === o) break;
            "#" === e[n + 1] ? (c = parseInt(("x" === e[n + 2] ? "0" : "") + e.substring(n + 2, o)), isNaN(c) || (e = e.substr(0, n) + String.fromCharCode(c) + e.substr(o + 1))) : (c = e.substring(n + 1, o), (u.entities[c] || "amp" === c && t) && (e = e.substr(0, n) + (u.entities[c] || "&") + e.substr(o + 1))), n = e.indexOf("&", n + 1)
          }
          return e
        }

        function m(e) {
          for (var t = e.length - 1, n = t; n >= -1; n--)(-1 === n || e[n].c || !e[n].name || "div" !== e[n].name && "p" !== e[n].name && "h" !== e[n].name[0] || (e[n].attrs.style || "").includes("inline")) && (t - n >= 5 && e.splice(n + 1, t - n, {
            name: "div",
            attrs: {},
            children: e.slice(n + 1, t + 1)
          }), t = n - 1)
        }

        function p(e) {
          this.options = e || {}, this.tagStyle = Object.assign({}, u.tagStyle, this.options.tagStyle), this.imgList = e.imgList || [], this.imgList._unloadimgs = 0, this.plugins = e.plugins || [], this.attrs = Object.create(null), this.stack = [], this.nodes = [], this.pre = (this.options.containerStyle || "").includes("white-space") && this.options.containerStyle.includes("pre") ? 2 : 0
        }

        function h(e) {
          this.handler = e
        }
        p.prototype.parse = function (e) {
          for (var t = this.plugins.length; t--;) this.plugins[t].onUpdate && (e = this.plugins[t].onUpdate(e, u) || e);
          for (new h(this).parse(e); this.stack.length;) this.popNode();
          return this.nodes.length > 50 && m(this.nodes), this.nodes
        }, p.prototype.expose = function () {
          for (var e = this.stack.length; e--;) {
            var t = this.stack[e];
            if (t.c || "a" === t.name || "video" === t.name || "audio" === t.name) return;
            t.c = 1
          }
        }, p.prototype.hook = function (e) {
          for (var t = this.plugins.length; t--;)
            if (this.plugins[t].onParse && !1 === this.plugins[t].onParse(e, this)) return !1;
          return !0
        }, p.prototype.getUrl = function (e) {
          var t = this.options.domain;
          return "/" === e[0] ? "/" === e[1] ? e = (t ? t.split("://")[0] : "http") + ":" + e : t && (e = t + e) : e.includes("data:") || e.includes("://") || t && (e = t + "/" + e), e
        }, p.prototype.parseStyle = function (e) {
          var t = e.attrs,
            n = (this.tagStyle[e.name] || "").split(";").concat((t.style || "").split(";")),
            o = {},
            c = "";
          t.id && !this.xml && (this.options.useAnchor ? this.expose() : "img" !== e.name && "a" !== e.name && "video" !== e.name && "audio" !== e.name && (t.id = void 0)), t.width && (o.width = parseFloat(t.width) + (t.width.includes("%") ? "%" : "px"), t.width = void 0), t.height && (o.height = parseFloat(t.height) + (t.height.includes("%") ? "%" : "px"), t.height = void 0);
          for (var r = 0, u = n.length; r < u; r++) {
            var i = n[r].split(":");
            if (!(i.length < 2)) {
              var s = i.shift().trim().toLowerCase(),
                d = i.join(":").trim();
              if ("-" === d[0] && d.lastIndexOf("-") > 0 || d.includes("safe")) c += ";".concat(s, ":").concat(d);
              else if (!o[s] || d.includes("import") || !o[s].includes("import")) {
                if (d.includes("url")) {
                  var l = d.indexOf("(") + 1;
                  if (l) {
                    for (;
                      '"' === d[l] || "'" === d[l] || y[d[l]];) l++;
                    d = d.substr(0, l) + this.getUrl(d.substr(l))
                  }
                } else d.includes("rpx") && (d = d.replace(/[0-9.]+\s*rpx/g, (function (e) {
                  return parseFloat(e) * a / 750 + "px"
                })));
                o[s] = d
              }
            }
          }
          return e.attrs.style = c, o
        }, p.prototype.onTagName = function (e) {
          this.tagName = this.xml ? e : e.toLowerCase(), "svg" === this.tagName && (this.xml = (this.xml || 0) + 1, u.ignoreTags.style = void 0)
        }, p.prototype.onAttrName = function (e) {
          "data-" === (e = this.xml ? e : e.toLowerCase()).substr(0, 5) ? "data-src" !== e || this.attrs.src ? "img" === this.tagName || "a" === this.tagName ? this.attrName = e : this.attrName = void 0 : this.attrName = "src" : (this.attrName = e, this.attrs[e] = "T")
        }, p.prototype.onAttrVal = function (e) {
          var t = this.attrName || "";
          "style" === t || "href" === t ? this.attrs[t] = f(e, !0) : t.includes("src") ? this.attrs[t] = this.getUrl(f(e, !0)) : t && (this.attrs[t] = e)
        }, p.prototype.onOpenTag = function (e) {
          var t = Object.create(null);
          t.name = this.tagName, t.attrs = this.attrs, this.options.nodes.length && (t.type = "node"), this.attrs = Object.create(null);
          var n = t.attrs,
            o = this.stack[this.stack.length - 1],
            c = o ? o.children : this.nodes,
            r = this.xml ? e : u.voidTags[t.name];
          if (i[t.name] && (n.class = i[t.name] + (n.class ? " " + n.class : "")), "embed" === t.name) {
            var s = n.src || "";
            s.includes(".mp4") || s.includes(".3gp") || s.includes(".m3u8") || (n.type || "").includes("video") ? t.name = "video" : (s.includes(".mp3") || s.includes(".wav") || s.includes(".aac") || s.includes(".m4a") || (n.type || "").includes("audio")) && (t.name = "audio"), n.autostart && (n.autoplay = "T"), n.controls = "T"
          }
          if ("video" !== t.name && "audio" !== t.name || ("video" !== t.name || n.id || (n.id = "v" + d++), n.controls || n.autoplay || (n.controls = "T"), t.src = [], n.src && (t.src.push(n.src), n.src = void 0), this.expose()), r) {
            if (!this.hook(t) || u.ignoreTags[t.name]) return void("base" !== t.name || this.options.domain ? "source" === t.name && o && ("video" === o.name || "audio" === o.name) && n.src && o.src.push(n.src) : this.options.domain = n.href);
            var y = this.parseStyle(t);
            if ("img" === t.name) {
              if (n.src && (n.src.includes("webp") && (t.webp = "T"), n.src.includes("data:") && "all" !== this.options.previewImg && !n["original-src"] && (n.ignore = "T"), !n.ignore || t.webp || n.src.includes("cloud://"))) {
                for (var l = this.stack.length; l--;) {
                  var f = this.stack[l];
                  "a" === f.name && (t.a = f.attrs), "table" !== f.name || t.webp || n.src.includes("cloud://") || (!y.display || y.display.includes("inline") ? t.t = "inline-block" : t.t = y.display, y.display = void 0);
                  var m = f.attrs.style || "";
                  if (!m.includes("flex:") || m.includes("flex:0") || m.includes("flex: 0") || y.width && !(parseInt(y.width) > 100))
                    if (m.includes("flex") && "100%" === y.width)
                      for (var p = l + 1; p < this.stack.length; p++) {
                        var h = this.stack[p].attrs.style || "";
                        if (!h.includes(";width") && !h.includes(" width") && 0 !== h.indexOf("width")) {
                          y.width = "";
                          break
                        }
                      } else m.includes("inline-block") && (y.width && "%" === y.width[y.width.length - 1] ? (f.attrs.style += ";max-width:" + y.width, y.width = "") : f.attrs.style += ";max-width:100%");
                    else {
                      y.width = "100% !important", y.height = "";
                      for (var C = l + 1; C < this.stack.length; C++) this.stack[C].attrs.style = (this.stack[C].attrs.style || "").replace("inline-", "")
                    } f.c = 1
                }
                n.i = this.imgList.length.toString();
                var g = n["original-src"] || n.src;
                if (this.imgList.includes(g)) {
                  var v = g.indexOf("://");
                  if (-1 !== v) {
                    v += 3;
                    for (var N = g.substr(0, v); v < g.length && "/" !== g[v]; v++) N += Math.random() > .5 ? g[v].toUpperCase() : g[v];
                    N += g.substr(v), g = N
                  }
                }
                this.imgList.push(g), t.t || (this.imgList._unloadimgs += 1)
              }
              "inline" === y.display && (y.display = ""), n.ignore && (y["max-width"] = y["max-width"] || "100%", n.style += ";-webkit-touch-callout:none"), parseInt(y.width) > a && (y.height = void 0), isNaN(parseInt(y.width)) || (t.w = "T"), !isNaN(parseInt(y.height)) && (!y.height.includes("%") || o && (o.attrs.style || "").includes("height")) && (t.h = "T"), t.w && t.h && y["object-fit"] && ("contain" === y["object-fit"] ? t.m = "aspectFit" : "cover" === y["object-fit"] && (t.m = "aspectFill"))
            } else if ("svg" === t.name) return c.push(t), this.stack.push(t), void this.popNode();
            for (var b in y) y[b] && (n.style += ";".concat(b, ":").concat(y[b].replace(" !important", "")));
            n.style = n.style.substr(1) || void 0
          } else("pre" === t.name || (n.style || "").includes("white-space") && n.style.includes("pre")) && 2 !== this.pre && (this.pre = t.pre = 1), t.children = [], this.stack.push(t);
          c.push(t)
        }, p.prototype.onCloseTag = function (e) {
          var t;
          for (e = this.xml ? e : e.toLowerCase(), t = this.stack.length; t-- && this.stack[t].name !== e;);
          if (-1 !== t)
            for (; this.stack.length > t;) this.popNode();
          else if ("p" === e || "br" === e) {
            (this.stack.length ? this.stack[this.stack.length - 1].children : this.nodes).push({
              name: e,
              attrs: {
                class: i[e] || "",
                style: this.tagStyle[e] || ""
              }
            })
          }
        }, p.prototype.popNode = function () {
          var t = this.stack.pop(),
            c = t.attrs,
            r = t.children,
            i = this.stack[this.stack.length - 1],
            s = i ? i.children : this.nodes;
          if (!this.hook(t) || u.ignoreTags[t.name]) return "title" === t.name && r.length && "text" === r[0].type && this.options.setTitle && e.setNavigationBarTitle({
            title: r[0].text
          }), void s.pop();
          if (t.pre && 2 !== this.pre) {
            this.pre = t.pre = void 0;
            for (var y = this.stack.length; y--;) this.stack[y].pre && (this.pre = 1)
          }
          var d = {};
          if ("svg" === t.name) {
            if (this.xml > 1) return void this.xml--;
            var l = "",
              f = c.style;
            return c.style = "", c.xmlns = "http://www.w3.org/2000/svg",
              function e(t) {
                if ("text" !== t.type) {
                  var n = u.svgDict[t.name] || t.name;
                  if ("foreignObject" === n) {
                    var c, a = o(t.children || []);
                    try {
                      for (a.s(); !(c = a.n()).done;) {
                        var r = c.value;
                        if (r.attrs && !r.attrs.xmlns) {
                          r.attrs.xmlns = "http://www.w3.org/1999/xhtml";
                          break
                        }
                      }
                    } catch (e) {
                      a.e(e)
                    } finally {
                      a.f()
                    }
                  }
                  for (var i in l += "<" + n, t.attrs) {
                    var s = t.attrs[i];
                    s && (l += " ".concat(u.svgDict[i] || i, '="').concat(s.replace(/"/g, ""), '"'))
                  }
                  if (t.children) {
                    l += ">";
                    for (var y = 0; y < t.children.length; y++) e(t.children[y]);
                    l += "</" + n + ">"
                  } else l += "/>"
                } else l += t.text
              }(t), t.name = "img", t.attrs = {
                src: "data:image/svg+xml;utf8," + l.replace(/#/g, "%23"),
                style: f,
                ignore: "T"
              }, t.children = void 0, this.xml = !1, void(u.ignoreTags.style = !0)
          }
          if (c.align && ("table" === t.name ? "center" === c.align ? d["margin-inline-start"] = d["margin-inline-end"] = "auto" : d.float = c.align : d["text-align"] = c.align, c.align = void 0), c.dir && (d.direction = c.dir, c.dir = void 0), "font" === t.name && (c.color && (d.color = c.color, c.color = void 0), c.face && (d["font-family"] = c.face, c.face = void 0), c.size)) {
            var p = parseInt(c.size);
            isNaN(p) || (p < 1 ? p = 1 : p > 7 && (p = 7), d["font-size"] = ["x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large"][p - 1]), c.size = void 0
          }
          if ((c.class || "").includes("align-center") && (d["text-align"] = "center"), Object.assign(d, this.parseStyle(t)), "table" !== t.name && parseInt(d.width) > a && (d["max-width"] = "100%", d["box-sizing"] = "border-box"), u.blockTags[t.name] ? t.name = "div" : u.trustTags[t.name] || this.xml || (t.name = "span"), "a" === t.name || "ad" === t.name) this.expose();
          else if ("video" === t.name)(d.height || "").includes("auto") && (d.height = void 0);
          else if ("ul" !== t.name && "ol" !== t.name || !t.c)
            if ("table" === t.name) {
              var h = parseFloat(c.cellpadding),
                C = parseFloat(c.cellspacing),
                g = parseFloat(c.border),
                v = d["border-color"],
                N = d["border-style"];
              if (t.c && (isNaN(h) && (h = 2), isNaN(C) && (C = 2)), g && (c.style += ";border:".concat(g, "px ").concat(N || "solid", " ").concat(v || "gray")), t.flag && t.c) {
                d.display = "grid", "collapse" === d["border-collapse"] && (d["border-collapse"] = void 0, C = 0), C ? (d["grid-gap"] = C + "px", d.padding = C + "px") : g && (c.style += ";border-left:0;border-top:0");
                var b = [],
                  _ = [],
                  x = [],
                  w = {};
                ! function e(t) {
                  for (var n = 0; n < t.length; n++)
                    if ("tr" === t[n].name) _.push(t[n]);
                    else if ("colgroup" === t[n].name) {
                    var c, a = 1,
                      r = o(t[n].children || []);
                    try {
                      for (r.s(); !(c = r.n()).done;) {
                        var u = c.value;
                        if ("col" === u.name) {
                          var i = u.attrs.style || "",
                            s = i.indexOf("width") ? i.indexOf(";width") : 0;
                          if (-1 !== s) {
                            var y = i.indexOf(";", s + 6); - 1 === y && (y = i.length), b[a] = i.substring(s ? s + 7 : 6, y)
                          }
                          a += 1
                        }
                      }
                    } catch (e) {
                      r.e(e)
                    } finally {
                      r.f()
                    }
                  } else e(t[n].children || [])
                }(r);
                for (var k = 1; k <= _.length; k++) {
                  for (var O = 1, S = 0; S < _[k - 1].children.length; S++) {
                    var P = _[k - 1].children[S];
                    if ("td" === P.name || "th" === P.name) {
                      for (; w[k + "." + O];) O++;
                      var A = P.attrs.style || "",
                        T = A.indexOf("width") ? A.indexOf(";width") : 0;
                      if (-1 !== T) {
                        var I = A.indexOf(";", T + 6); - 1 === I && (I = A.length), P.attrs.colspan || (b[O] = A.substring(T ? T + 7 : 6, I)), A = A.substr(0, T) + A.substr(I)
                      }
                      if (-1 !== (T = (A += ";display:flex").indexOf("vertical-align"))) {
                        var j = A.substr(T + 15, 10);
                        j.includes("middle") ? A += ";align-items:center" : j.includes("bottom") && (A += ";align-items:flex-end")
                      } else A += ";align-items:center";
                      if (-1 !== (T = A.indexOf("text-align"))) {
                        var E = A.substr(T + 11, 10);
                        E.includes("center") ? A += ";justify-content: center" : E.includes("right") && (A += ";justify-content: right")
                      }
                      if (A = (g ? ";border:".concat(g, "px ").concat(N || "solid", " ").concat(v || "gray") + (C ? "" : ";border-right:0;border-bottom:0") : "") + (h ? ";padding:".concat(h, "px") : "") + ";" + A, P.attrs.colspan && (A += ";grid-column-start:".concat(O, ";grid-column-end:").concat(O + parseInt(P.attrs.colspan)), P.attrs.rowspan || (A += ";grid-row-start:".concat(k, ";grid-row-end:").concat(k + 1)), O += parseInt(P.attrs.colspan) - 1), P.attrs.rowspan) {
                        A += ";grid-row-start:".concat(k, ";grid-row-end:").concat(k + parseInt(P.attrs.rowspan)), P.attrs.colspan || (A += ";grid-column-start:".concat(O, ";grid-column-end:").concat(O + 1));
                        for (var $ = 1; $ < P.attrs.rowspan; $++)
                          for (var D = 0; D < (P.attrs.colspan || 1); D++) w[k + $ + "." + (O - D)] = 1
                      }
                      A && (P.attrs.style = A), x.push(P), O++
                    }
                  }
                  if (1 === k) {
                    for (var L = "", M = 1; M < O; M++) L += (b[M] ? b[M] : "auto") + " ";
                    d["grid-template-columns"] = L
                  }
                }
                t.children = x
              } else t.c && (d.display = "table"), isNaN(C) || (d["border-spacing"] = C + "px"), (g || h) && function e(t) {
                for (var n = 0; n < t.length; n++) {
                  var o = t[n];
                  "th" === o.name || "td" === o.name ? (g && (o.attrs.style = "border:".concat(g, "px ").concat(N || "solid", " ").concat(v || "gray", ";").concat(o.attrs.style || "")), h && (o.attrs.style = "padding:".concat(h, "px;").concat(o.attrs.style || ""))) : o.children && e(o.children)
                }
              }(r);
              if (this.options.scrollTable && !(c.style || "").includes("inline")) {
                var U = Object.assign({}, t);
                t.name = "div", t.attrs = {
                  style: "overflow:auto"
                }, t.children = [U], c = U.attrs
              }
            } else if (("tbody" === t.name || "tr" === t.name) && t.flag && t.c) t.flag = void 0,
            function e(t) {
              for (var n = 0; n < t.length; n++)
                if ("td" === t[n].name)
                  for (var o = 0, c = ["color", "background", "background-color"]; o < c.length; o++) {
                    var a = c[o];
                    d[a] && (t[n].attrs.style = a + ":" + d[a] + ";" + (t[n].attrs.style || ""))
                  } else e(t[n].children || [])
            }(r);
          else if ("td" !== t.name && "th" !== t.name || !c.colspan && !c.rowspan)
            if ("ruby" === t.name) {
              t.name = "span";
              for (var R = 0; R < r.length - 1; R++) "text" === r[R].type && "rt" === r[R + 1].name && (r[R] = {
                name: "div",
                attrs: {
                  style: "display:inline-block;text-align:center"
                },
                children: [{
                  name: "div",
                  attrs: {
                    style: "font-size:50%;" + (r[R + 1].attrs.style || "")
                  },
                  children: r[R + 1].children
                }, r[R]]
              }, r.splice(R + 1, 1))
            } else t.c && function (e) {
              e.c = 2;
              for (var t = e.children.length; t--;) {
                var n = e.children[t];
                n.c && "table" !== n.name || (e.c = 1)
              }
            }(t);
          else
            for (var F = this.stack.length; F--;) "table" !== this.stack[F].name && "tbody" !== this.stack[F].name && "tr" !== this.stack[F].name || (this.stack[F].flag = 1);
          else {
            var q = {
              a: "lower-alpha",
              A: "upper-alpha",
              i: "lower-roman",
              I: "upper-roman"
            };
            q[c.type] && (c.style += ";list-style-type:" + q[c.type], c.type = void 0);
            for (var B = r.length; B--;) "li" === r[B].name && (r[B].c = 1)
          }
          if ((d.display || "").includes("flex") && !t.c)
            for (var V = r.length; V--;) {
              var H = r[V];
              H.f && (H.attrs.style = (H.attrs.style || "") + H.f, H.f = void 0)
            }
          var z = i && ((i.attrs.style || "").includes("flex") || (i.attrs.style || "").includes("grid")) && !(t.c && n.getNFCAdapter);
          for (var K in z && (t.f = ";max-width:100%"), r.length >= 50 && t.c && !(d.display || "").includes("flex") && m(r), d)
            if (d[K]) {
              var W = ";".concat(K, ":").concat(d[K].replace(" !important", ""));
              z && (K.includes("flex") && "flex-direction" !== K || "align-self" === K || K.includes("grid") || "-" === d[K][0] || K.includes("width") && W.includes("%")) ? (t.f += W, "width" === K && (c.style += ";width:100%")) : c.style += W
            } c.style = c.style.substr(1) || void 0
        }, p.prototype.onText = function (t) {
          if (!this.pre) {
            for (var n, o = "", c = 0, a = t.length; c < a; c++) y[t[c]] ? (" " !== o[o.length - 1] && (o += " "), "\n" !== t[c] || n || (n = !0)) : o += t[c];
            if (" " === o && n) return;
            t = o
          }
          var u = Object.create(null);
          (u.type = "text", u.text = f(t), this.hook(u)) && ("force" === this.options.selectable && r.includes("iOS") && !e.canIUse("rich-text.user-select") && this.expose(), (this.stack.length ? this.stack[this.stack.length - 1].children : this.nodes).push(u))
        }, h.prototype.parse = function (e) {
          this.content = e || "", this.i = 0, this.start = 0, this.state = this.text;
          for (var t = this.content.length; - 1 !== this.i && this.i < t;) this.state()
        }, h.prototype.checkClose = function (e) {
          var t = "/" === this.content[this.i];
          return !!(">" === this.content[this.i] || t && ">" === this.content[this.i + 1]) && (e && this.handler[e](this.content.substring(this.start, this.i)), this.i += t ? 2 : 1, this.start = this.i, this.handler.onOpenTag(t), "script" === this.handler.tagName ? (this.i = this.content.indexOf("</", this.i), -1 !== this.i && (this.i += 2, this.start = this.i), this.state = this.endTag) : this.state = this.text, !0)
        }, h.prototype.text = function () {
          if (this.i = this.content.indexOf("<", this.i), -1 !== this.i) {
            var e = this.content[this.i + 1];
            if (e >= "a" && e <= "z" || e >= "A" && e <= "Z") this.start !== this.i && this.handler.onText(this.content.substring(this.start, this.i)), this.start = ++this.i, this.state = this.tagName;
            else if ("/" === e || "!" === e || "?" === e) {
              this.start !== this.i && this.handler.onText(this.content.substring(this.start, this.i));
              var t = this.content[this.i + 2];
              if ("/" === e && (t >= "a" && t <= "z" || t >= "A" && t <= "Z")) return this.i += 2, this.start = this.i, void(this.state = this.endTag);
              var n = "--\x3e";
              "!" === e && "-" === this.content[this.i + 2] && "-" === this.content[this.i + 3] || (n = ">"), this.i = this.content.indexOf(n, this.i), -1 !== this.i && (this.i += n.length, this.start = this.i)
            } else this.i++
          } else this.start < this.content.length && this.handler.onText(this.content.substring(this.start, this.content.length))
        }, h.prototype.tagName = function () {
          if (y[this.content[this.i]]) {
            for (this.handler.onTagName(this.content.substring(this.start, this.i)); y[this.content[++this.i]];);
            this.i < this.content.length && !this.checkClose() && (this.start = this.i, this.state = this.attrName)
          } else this.checkClose("onTagName") || this.i++
        }, h.prototype.attrName = function () {
          var e = this.content[this.i];
          if (y[e] || "=" === e) {
            this.handler.onAttrName(this.content.substring(this.start, this.i));
            for (var t = "=" === e, n = this.content.length; ++this.i < n;)
              if (e = this.content[this.i], !y[e]) {
                if (this.checkClose()) return;
                if (t) return this.start = this.i, void(this.state = this.attrVal);
                if ("=" !== this.content[this.i]) return this.start = this.i, void(this.state = this.attrName);
                t = !0
              }
          } else this.checkClose("onAttrName") || this.i++
        }, h.prototype.attrVal = function () {
          var e = this.content[this.i],
            t = this.content.length;
          if ('"' === e || "'" === e) {
            if (this.start = ++this.i, this.i = this.content.indexOf(e, this.i), -1 === this.i) return;
            this.handler.onAttrVal(this.content.substring(this.start, this.i))
          } else
            for (; this.i < t; this.i++) {
              if (y[this.content[this.i]]) {
                this.handler.onAttrVal(this.content.substring(this.start, this.i));
                break
              }
              if (this.checkClose("onAttrVal")) return
            }
          for (; y[this.content[++this.i]];);
          this.i < t && !this.checkClose() && (this.start = this.i, this.state = this.attrName)
        }, h.prototype.endTag = function () {
          var e = this.content[this.i];
          if (y[e] || ">" === e || "/" === e) {
            if (this.handler.onCloseTag(this.content.substring(this.start, this.i)), ">" !== e && (this.i = this.content.indexOf(">", this.i), -1 === this.i)) return;
            this.start = ++this.i, this.state = this.text
          } else this.i++
        };
        var C = p;
        t.default = C
      }).call(this, n("df3c").default, n("3223").default)
    },
    "115a": function (e, t) {
      e.exports = "https://localhost/api/file/image/04_qsn@3x.png"
    },
    "122b": function (e, t, n) {},
    "12db": function (e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0;
      var o = [{
          value: 0,
          name: "不限"
        }, {
          value: 1,
          name: "视频"
        }, {
          value: 2,
          name: "面询"
        }],
        c = o.reduce((function (e, t) {
          return e[t.value] = t, e
        }), {}),
        a = function (e) {
          return c[e] ? c[e].name : ""
        },
        r = {
          parseText: a,
          parseTexts: function (e) {
            if ("number" == typeof e) {
              var t = e;
              return 0 === t ? o.filter((function (e) {
                return [1, 2].includes(e.value)
              })) : o.filter((function (e) {
                return e.value === t
              }))
            }
            var n = e.supportOnlineConsult,
              c = e.supportOfflineConsult;
            return [n, c].every((function (e) {
              return 1 === e
            })) ? [a(1), a(2)] : n ? [a(1)] : c ? [a(2)] : []
          },
          create: function (e) {
            var t = e.supportOnlineConsult,
              n = e.supportOfflineConsult;
            return [t, n].every((function (e) {
              return 1 === e
            })) ? [c[1], c[2]] : t ? [c[1]] : n ? [c[2]] : []
          }
        };
      t.default = r
    },
    "1d4f": function (e, t) {
      e.exports = "/static/img/radio-ac.png"
    },
    "1d65": function (e, t, n) {
      var o = n("122b");
      n.n(o).a
    },
    "1e0d": function (e, t, n) {
      (function (e) {
        var o = n("47a9");
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.useLogin = t.dangerousSetInfoFromApi = t.dangerousLogin = t.dangerousIsLogined = t.dangerousGetInfo = void 0;
        var c = o(n("7eb4")),
          a = o(n("ee10")),
          r = n("c4a0"),
          u = n("90c1"),
          i = n("01f1"),
          s = (0, r.ref)(null),
          y = function () {
            s.value = (0, u.storeGet)("counselor_info") || null
          },
          d = function (t) {
            return s.value = {
              headUrl: t.data.data.headUrl,
              nickName: t.data.data.nickName,
              openId: t.data.data.openId,
              userId: t.data.data.userId,
              mobile: t.data.data.mobile,
              wechatNoticeOn: t.data.data.wechatNoticeOn,
              smsNoticeOn: t.data.data.smsNoticeOn,
              authorization: t.header.Authorization
            }, e.setStorageSync("counselor_info", s.value), s.value
          },
          l = function () {
            var e = (0, a.default)(c.default.mark((function e() {
              var t;
              return c.default.wrap((function (e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, (0, i.login)();
                  case 2:
                    return t = e.sent, e.abrupt("return", d(t));
                  case 4:
                  case "end":
                    return e.stop()
                }
              }), e)
            })));
            return function () {
              return e.apply(this, arguments)
            }
          }(),
          f = function () {
            return !(!s.value || !s.value.mobile)
          },
          m = function () {
            return s.value || {}
          },
          p = function (e) {
            return f() && e()
          };
        t.useLogin = function () {
          return {
            restore: y,
            login: l,
            isLogined: f,
            getInfo: m,
            onlyLogin: p,
            onLogined: function (e) {
              if (f()) return e();
              (0, r.watch)((function () {
                return f()
              }), (function (t, n) {
                !1 === n && !0 === t && e()
              }))
            }
          }
        }, t.dangerousSetInfoFromApi = function (e) {
          return d(e)
        };
        var h = f;
        t.dangerousIsLogined = h;
        var C = l;
        t.dangerousLogin = C;
        var g = m;
        t.dangerousGetInfo = g
      }).call(this, n("df3c").default)
    },
    "1ea4": function (e, t, n) {
      (function (e) {
        var o = n("47a9");
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.createAnimation = function (e, t) {
          if (t) return clearTimeout(t.timer), new s(e, t)
        };
        var c = o(n("7ca3")),
          a = o(n("67ad")),
          r = o(n("0bdb"));

        function u(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            t && (o = o.filter((function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), n.push.apply(n, o)
          }
          return n
        }

        function i(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? u(Object(n), !0).forEach((function (t) {
              (0, c.default)(e, t, n[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach((function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }))
          }
          return e
        }
        var s = function () {
            function t(n, o) {
              (0, a.default)(this, t), this.options = n, this.animation = e.createAnimation(n), this.currentStepAnimates = {}, this.next = 0, this.$ = o
            }
            return (0, r.default)(t, [{
              key: "_nvuePushAnimates",
              value: function (e, t) {
                var n = {};
                if (n = this.currentStepAnimates[this.next] || {
                    styles: {},
                    config: {}
                  }, y.includes(e)) {
                  n.styles.transform || (n.styles.transform = "");
                  var o = "";
                  "rotate" === e && (o = "deg"), n.styles.transform += "".concat(e, "(").concat(t + o, ") ")
                } else n.styles[e] = "".concat(t);
                this.currentStepAnimates[this.next] = n
              }
            }, {
              key: "_animateRun",
              value: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                  t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                  n = this.$.$refs.ani.ref;
                if (n) return new Promise((function (o, c) {
                  nvueAnimation.transition(n, i({
                    styles: e
                  }, t), (function (e) {
                    o()
                  }))
                }))
              }
            }, {
              key: "_nvueNextAnimate",
              value: function (e) {
                var t = this,
                  n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                  o = arguments.length > 2 ? arguments[2] : void 0,
                  c = e[n];
                if (c) {
                  var a = c.styles,
                    r = c.config;
                  this._animateRun(a, r).then((function () {
                    n += 1, t._nvueNextAnimate(e, n, o)
                  }))
                } else this.currentStepAnimates = {}, "function" == typeof o && o(), this.isEnd = !0
              }
            }, {
              key: "step",
              value: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return this.animation.step(e), this
              }
            }, {
              key: "run",
              value: function (e) {
                this.$.animationData = this.animation.export(), this.$.timer = setTimeout((function () {
                  "function" == typeof e && e()
                }), this.$.durationTime)
              }
            }]), t
          }(),
          y = ["matrix", "matrix3d", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "translate", "translate3d", "translateX", "translateY", "translateZ"];
        y.concat(["opacity", "backgroundColor"], ["width", "height", "left", "right", "top", "bottom"]).forEach((function (e) {
          s.prototype[e] = function () {
            var t;
            return (t = this.animation)[e].apply(t, arguments), this
          }
        }))
      }).call(this, n("df3c").default)
    },
    2052: function (e, t, n) {
      (function (t) {
        var o = n("47a9"),
          c = o(n("7eb4")),
          a = o(n("7ca3")),
          r = o(n("ee10")),
          u = n("9359"),
          i = n("9816"),
          s = (n("90c1"), n("01f1"), n("1e0d"));

        function y(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            t && (o = o.filter((function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), n.push.apply(n, o)
          }
          return n
        }

        function d(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? y(Object(n), !0).forEach((function (t) {
              (0, a.default)(e, t, n[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : y(Object(n)).forEach((function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }))
          }
          return e
        }
        var l = function (e) {
            return new Promise((function (t, n) {
              (0, u.irequestdata)({
                url: "/visitor/user/changeIP",
                method: "post",
                data: {
                  userId: e.userId
                },
                success: function (n) {
                  t(e)
                },
                error: function (e) {
                  n(e)
                }
              })
            }))
          },
          f = function () {
            var e = (0, r.default)(c.default.mark((function e() {
              var n;
              return c.default.wrap((function (e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (!(0, s.dangerousIsLogined)()) {
                      e.next = 2;
                      break
                    }
                    return e.abrupt("return", (0, s.dangerousGetInfo)());
                  case 2:
                    // [修复] 不再自动调用后端登录接口，仅返回空对象
                    // 原代码: return e.next = 4, (0, s.dangerousLogin)();
                    console.log("[refreshLoginInfo] 用户未登录，跳过自动登录");
                    return e.abrupt("return", {});
                  case 4:
                  case 7:
                  case "end":
                    return e.stop()
                }
              }), e)
            })));
            return function () {
              return e.apply(this, arguments)
            }
          }(),
          m = function () {
            return new Promise((function (e, n) {
              t.login({
                success: function (t) {
                  console.log("getWxCode loginRes = ", t), e(t.code)
                },
                error: function (e) {
                  n(e)
                }
              })
            }))
          },
          p = function (e) {
            return new Promise((function (t, n) {
              (0, u.irequestdata)({
                url: "/wx/user/" + i.appid + "/getSessionKey",
                method: "get",
                data: {
                  code: e
                },
                success: function (e) {
                  200 === e.data.code && "success" === e.data.msg ? t(e.data.data) : n("获取微信会话信息失败")
                },
                error: function (e) {
                  n(e)
                }
              })
            }))
          },
          h = function (e, t, n) {
            // [修复] 支持新版API（使用code参数）和旧版API（使用encryptedData）
            return new Promise((function (o, c) {
              // 判断是新版还是旧版参数
              var requestData = {};
              if (typeof e === 'string' && e.length > 20 && !t && !n) {
                // 新版API: e 是 phoneCode
                requestData = { code: e };
                console.log("[getPhone] 使用新版API, code:", e.substring(0, 20) + "...");
              } else {
                // 旧版API: e 是 sessionKey, t 是 encryptedData, n 是 iv
                requestData = {
                  appid: i.appid,
                  encryptedData: t,
                  iv: n,
                  sessionKey: e
                };
                console.log("[getPhone] 使用旧版API");
              }
              (0, u.irequestdata)({
                url: "/wx/user/".concat(i.appid, "/phone"),
                data: requestData,
                method: "get",
                success: function (e) {
                  e.data && 200 === e.data.code && e.data.data && e.data.data.phoneNumber ? o({
                    mobile: e.data.data.purePhoneNumber,
                    mobileArea: e.data.data.countryCode
                  }) : c("获取手机号码失败")
                },
                error: function (e) {
                  c("获取手机号码失败:" + e)
                }
              })
            }))
          },
          C = function (e) {
            return new Promise((function (t, n) {
              (0, u.irequestdata)({
                url: "/wx/user/".concat(i.appid, "/loginByPhone"),
                method: "get",
                data: d({}, e),
                success: function (e) {
                  200 === e.data.code && "success" === e.data.msg && e.data.data && e.data.data.mobile ? t(e) : n("登录失败")
                },
                error: function (e) {
                  n("登录失败:" + e)
                }
              })
            }))
          },
          g = function (e) {
            var n = (0, s.dangerousSetInfoFromApi)(e);
            return t.$emit("login_success", n), n
          };
        e.exports = {
          refreshLoginInfo: f,
          processLoginSuccessRes: g,
          getWxCode: m,
          getSessionKey: p,
          getPhone: h,
          loginByPhone: C,
          loginWithMobileAuth: function (e) {
            // [修复] 优先使用新版API (e.code)，如果没有则使用旧版API (encryptedData + iv)
            console.log("[loginWithMobileAuth] 开始登录，参数:", { hasCode: !!e.code, hasEncryptedData: !!e.encryptedData });

            if (e.code) {
              // 新版API: 直接使用手机号授权返回的 code
              console.log("[loginWithMobileAuth] 使用新版API, phoneCode:", e.code.substring(0, 20) + "...");
              return h(e.code).then((function (t) {
                // t = { mobile, mobileArea }
                return m().then((function (n) {
                  return d({ code: n }, t)
                }))
              })).then((function (e) {
                return C(e)
              })).then((function (e) {
                return g(e)
              }))
            } else {
              // 旧版API: 使用 encryptedData + iv + sessionKey
              console.log("[loginWithMobileAuth] 使用旧版API");
              return m().then((function (e) {
                return p(e)
              })).then((function (t) {
                return h(t, e.encryptedData, e.iv)
              })).then((function (e) {
                return m().then((function (t) {
                  return d({
                    code: t
                  }, e)
                }))
              })).then((function (e) {
                return C(e)
              })).then((function (e) {
                return g(e)
              }))
            }
          },
          showMobileAuthDenyDialog: function () {
            t.showModal({
              title: "警告",
              content: "绑定手机能够提供更加方便的服务!!!",
              showCancel: !1,
              confirmText: "返回授权",
              success: function (e) {
                e.confirm && console.log("用户拒绝授权！")
              }
            })
          },
          requestDeleteAccount: function () {
            return new Promise((function (e, t) {
              (0, u.irequestdata)({
                url: "/visitor/user/requestDeleteAccount",
                method: "post",
                data: {},
                success: function (n) {
                  console.log("requestDeleteAccount success", n), 200 === n.data.code && "success" === n.data.msg ? e(n) : t("请求失败，请重试")
                },
                error: function (e) {
                  console.log("requestDeleteAccount error", e), t(e && e.data && e.data.msg ? e.data.msg : "请求失败，请重试")
                }
              })
            }))
          },
          requestDeleteVisitor: function (e) {
            return new Promise((function (t, n) {
              (0, u.irequestdata)({
                url: "/visitor/visitorInfo/deleteVisitor",
                method: "post",
                data: {
                  id: e
                },
                success: function (e) {
                  console.log("deleteVisitor success", e), 200 === e.data.code && "success" === e.data.msg ? t(e) : n("请求失败，请重试")
                },
                error: function (e) {
                  console.log("deleteVisitor error", e), n(e && e.data && e.data.msg ? e.data.msg : "请求失败，请重试")
                }
              })
            }))
          }
        }
      }).call(this, n("df3c").default)
    },
    "21e3": function (e, t) {
      e.exports = "https://localhost/api/file/image/矩形_2.png"
    },
    "22ab": function (e, t, n) {},
    "272c": function (e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.capitalize = t.isPlainObject = t.hasOwn = t.extend = void 0, t.extend = Object.assign;
      var o = Object.prototype.hasOwnProperty;
      t.hasOwn = function (e, t) {
        return o.call(e, t)
      };
      var c = Object.prototype.toString;
      t.isPlainObject = function (e) {
        return "[object Object]" === function (e) {
          return c.call(e)
        }(e)
      }, t.capitalize = function (e) {
        var t = Object.create(null);
        return function (e) {
          return t[e] || (t[e] = function (e) {
            return e.charAt(0).toUpperCase() + e.slice(1)
          }(e))
        }
      }()
    },
    2877: function (e, t, n) {
      (function (e) {
        var o = n("47a9");
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.get_files_and_is_max = t.get_file_info = t.get_file_ext = t.get_file_data = t.get_extname = void 0;
        var c = o(n("7eb4")),
          a = o(n("ee10")),
          r = function (e) {
            var t = e.lastIndexOf("."),
              n = e.length;
            return {
              name: e.substring(0, t),
              ext: e.substring(t + 1, n)
            }
          };
        t.get_file_ext = r, t.get_extname = function (e) {
          return Array.isArray(e) ? e : e.replace(/(\[|\])/g, "").split(",")
        }, t.get_files_and_is_max = function (t, n) {
          var o = [],
            c = [];
          return n && 0 !== n.length ? (t.tempFiles.forEach((function (e) {
            var t = r(e.name).ext.toLowerCase(); - 1 !== n.indexOf(t) && (c.push(e), o.push(e.path))
          })), c.length !== t.tempFiles.length && e.showToast({
            title: "当前选择了".concat(t.tempFiles.length, "个文件 ，").concat(t.tempFiles.length - c.length, " 个文件格式不正确"),
            icon: "none",
            duration: 5e3
          }), {
            filePaths: o,
            files: c
          }) : {
            filePaths: o,
            files: c
          }
        };
        var u = function (t) {
          return new Promise((function (n, o) {
            e.getImageInfo({
              src: t,
              success: function (e) {
                n(e)
              },
              fail: function (e) {
                o(e)
              }
            })
          }))
        };
        t.get_file_info = u;
        var i = function () {
          var e = (0, a.default)(c.default.mark((function e(t) {
            var n, o, a, i, s, y = arguments;
            return c.default.wrap((function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  if (n = y.length > 1 && void 0 !== y[1] ? y[1] : "image", o = r(t.name), a = o.ext.toLowerCase(), i = {
                      name: t.name,
                      uuid: t.uuid,
                      extname: a || "",
                      cloudPath: t.cloudPath,
                      fileType: t.fileType,
                      url: t.path || t.path,
                      size: t.size,
                      image: {},
                      path: t.path,
                      video: {}
                    }, "image" !== n) {
                    e.next = 14;
                    break
                  }
                  return e.next = 7, u(t.path);
                case 7:
                  s = e.sent, delete i.video, i.image.width = s.width, i.image.height = s.height, i.image.location = s.path, e.next = 15;
                  break;
                case 14:
                  delete i.image;
                case 15:
                  return e.abrupt("return", i);
                case 16:
                case "end":
                  return e.stop()
              }
            }), e)
          })));
          return function (t) {
            return e.apply(this, arguments)
          }
        }();
        t.get_file_data = i
      }).call(this, n("df3c").default)
    },
    "28b7": function (e, t, n) {
      var o = n("47a9");
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.useCancelTime = void 0;
      var c = o(n("7ca3")),
        a = n("c4a0"),
        r = n("a418");

      function u(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          t && (o = o.filter((function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
          }))), n.push.apply(n, o)
        }
        return n
      }

      function i(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2 ? u(Object(n), !0).forEach((function (t) {
            (0, c.default)(e, t, n[t])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach((function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
          }))
        }
        return e
      }
      t.useCancelTime = function () {
        var e, t = (0, a.ref)({}),
          n = (0, a.ref)({});
        return (0, r.onUnload)((function () {
          clearInterval(e)
        })), {
          start: function (o) {
            o.forEach((function (e) {
              return function (e) {
                n.value = i(i({}, n.value), {}, (0, c.default)({}, "".concat(e.orderId, "---").concat(e.paymentAvailableMinutes), new Date))
              }(e)
            })), clearInterval(e);
            var a = function () {
              t.value = o.reduce((function (e, t) {
                return t.paymentAvailableMinutes ? e[t.orderId] = function (e, t) {
                  var n = new Date(e);
                  n.setMinutes(n.getMinutes() + t);
                  var o = n.getTime() - Date.now();
                  return o <= 0 ? null : function (e) {
                    var t = Math.floor(e / 36e5),
                      n = Math.floor(e % 36e5 / 6e4),
                      o = Math.floor(e % 6e4 / 1e3),
                      c = t.toString().padStart(2, "0"),
                      a = n.toString().padStart(2, "0"),
                      r = o.toString().padStart(2, "0");
                    return "".concat(c, ":").concat(a, ":").concat(r)
                  }(o)
                }(function (e) {
                  return n.value["".concat(e.orderId, "---").concat(e.paymentAvailableMinutes)]
                }(t), t.paymentAvailableMinutes) : e[t.orderId] = null, e
              }), {})
            };
            a(), e = setInterval((function () {
              a()
            }), 1e3)
          },
          getText: function (e) {
            return t.value[e]
          }
        }
      }
    },
    "2a06": function (e, t, n) {},
    "2c36": function (e, t) {
      e.exports = "https://localhost/api/file/image/02_dj@3x.png"
    },
    "2cb5": function (e, t) {
      e.exports = "https://localhost/api/file/image/咨询顾问弹框@3x.png"
    },
    "2f29": function (e, t) {
      e.exports = "https://localhost/api/file/image/家庭困扰@3x.png"
    },
    "320f": function (t, n, o) {
      Object.defineProperty(n, "__esModule", {
        value: !0
      });
      var c, a = function (e, t) {
          return (a = Object.setPrototypeOf || {
              __proto__: []
            }
            instanceof Array && function (e, t) {
              e.__proto__ = t
            } || function (e, t) {
              for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            })(e, t)
        },
        r = function () {
          return (r = Object.assign || function (e) {
            for (var t, n = 1, o = arguments.length; n < o; n++)
              for (var c in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, c) && (e[c] = t[c]);
            return e
          }).apply(this, arguments)
        };

      function u(e) {
        var t = "function" == typeof Symbol && Symbol.iterator,
          n = t && e[t],
          o = 0;
        if (n) return n.call(e);
        if (e && "number" == typeof e.length) return {
          next: function () {
            return e && o >= e.length && (e = void 0), {
              value: e && e[o++],
              done: !e
            }
          }
        };
        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
      }

      function i(e, t) {
        var n = "function" == typeof Symbol && e[Symbol.iterator];
        if (!n) return e;
        var o, c, a = n.call(e),
          r = [];
        try {
          for (;
            (void 0 === t || t-- > 0) && !(o = a.next()).done;) r.push(o.value)
        } catch (e) {
          c = {
            error: e
          }
        } finally {
          try {
            o && !o.done && (n = a.return) && n.call(a)
          } finally {
            if (c) throw c.error
          }
        }
        return r
      }

      function s(e, t, n) {
        if (n || 2 === arguments.length)
          for (var o, c = 0, a = t.length; c < a; c++) !o && c in t || (o || (o = Array.prototype.slice.call(t, 0, c)), o[c] = t[c]);
        return e.concat(o || Array.prototype.slice.call(t))
      }
      var y = [],
        d = function () {
          function e(e) {
            this.active = !0, this.effects = [], this.cleanups = [], this.vm = e
          }
          return e.prototype.run = function (e) {
            if (this.active) try {
              return this.on(), e()
            } finally {
              this.off()
            }
          }, e.prototype.on = function () {
            this.active && (y.push(this), c = this)
          }, e.prototype.off = function () {
            this.active && (y.pop(), c = y[y.length - 1])
          }, e.prototype.stop = function () {
            this.active && (this.vm.$destroy(), this.effects.forEach((function (e) {
              return e.stop()
            })), this.cleanups.forEach((function (e) {
              return e()
            })), this.active = !1)
          }, e
        }(),
        l = function (e) {
          function t(t) {
            void 0 === t && (t = !1);
            var n, o = void 0;
            return function (e) {
              var t = v;
              v = !1;
              try {
                o = B(b())
              } finally {
                v = t
              }
            }(), n = e.call(this, o) || this, t || function (e, t) {
              var n;
              if ((t = t || c) && t.active) t.effects.push(e);
              else {
                var o = null === (n = w()) || void 0 === n ? void 0 : n.proxy;
                o && o.$on("hook:destroyed", (function () {
                  return e.stop()
                }))
              }
            }(n), n
          }
          return function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function n() {
              this.constructor = e
            }
            a(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
          }(t, e), t
        }(d);

      function f() {
        return c
      }

      function m() {
        var e, t;
        return (null === (e = f()) || void 0 === e ? void 0 : e.vm) || (null === (t = w()) || void 0 === t ? void 0 : t.proxy)
      }
      var p = void 0;
      try {
        var h = o("3240");
        h && N(h) ? p = h : h && "default" in h && N(h.default) && (p = h.default)
      } catch (e) {}
      var C = null,
        g = null,
        v = !0;

      function N(e) {
        return e && F(e) && "Vue" === e.name
      }

      function b() {
        return C
      }

      function _() {
        return C || p
      }

      function x(e) {
        if (v) {
          null == g || g.scope.off(), null == (g = e) || g.scope.on()
        }
      }

      function w() {
        return g
      }
      var k = new WeakMap;

      function O(e) {
        if (k.has(e)) return k.get(e);
        var t = {
          proxy: e,
          update: e.$forceUpdate,
          type: e.$options,
          uid: e._uid,
          emit: e.$emit.bind(e),
          parent: null,
          root: null
        };
        return function (e) {
          if (!e.scope) {
            var t = new d(e.proxy);
            e.scope = t, e.proxy.$on("hook:destroyed", (function () {
              return t.stop()
            }))
          }
          e.scope
        }(t), ["data", "props", "attrs", "refs", "vnode", "slots"].forEach((function (n) {
          T(t, n, {
            get: function () {
              return e["$".concat(n)]
            }
          })
        })), T(t, "isMounted", {
          get: function () {
            return e._isMounted
          }
        }), T(t, "isUnmounted", {
          get: function () {
            return e._isDestroyed
          }
        }), T(t, "isDeactivated", {
          get: function () {
            return e._inactive
          }
        }), T(t, "emitted", {
          get: function () {
            return e._events
          }
        }), k.set(e, t), e.$parent && (t.parent = O(e.$parent)), e.$root && (t.root = O(e.$root)), t
      }

      function S(e) {
        return "function" == typeof e && /native code/.test(e.toString())
      }
      var P = "undefined" != typeof Symbol && S(Symbol) && "undefined" != typeof Reflect && S(Reflect.ownKeys),
        A = function (e) {
          return e
        };

      function T(e, t, n) {
        var o = n.get,
          c = n.set;
        Object.defineProperty(e, t, {
          enumerable: !0,
          configurable: !0,
          get: o || A,
          set: c || A
        })
      }

      function I(e, t, n, o) {
        Object.defineProperty(e, t, {
          value: n,
          enumerable: !!o,
          writable: !0,
          configurable: !0
        })
      }

      function j(e, t) {
        return Object.hasOwnProperty.call(e, t)
      }

      function E(e) {
        return Array.isArray(e)
      }
      var $, D = Object.prototype.toString,
        L = function (e) {
          return D.call(e)
        };

      function M(e) {
        var t = parseFloat(String(e));
        return t >= 0 && Math.floor(t) === t && isFinite(e) && t <= 4294967295
      }

      function U(t) {
        return null !== t && "object" == e(t)
      }

      function R(e) {
        return "[object Object]" === function (e) {
          return Object.prototype.toString.call(e)
        }(e)
      }

      function F(e) {
        return "function" == typeof e
      }

      function q(e, t) {
        return t || w()
      }

      function B(e, t) {
        void 0 === t && (t = {});
        var n = e.config.silent;
        e.config.silent = !0;
        var o = new e(t);
        return e.config.silent = n, o
      }

      function V(e, t) {
        return function () {
          for (var n = [], o = 0; o < arguments.length; o++) n[o] = arguments[o];
          if (e.$scopedSlots[t]) return e.$scopedSlots[t].apply(e, n)
        }
      }

      function H(e) {
        return P ? Symbol.for(e) : e
      }
      var z = H("composition-api.preFlushQueue"),
        K = H("composition-api.postFlushQueue"),
        W = "composition-api.refKey",
        J = new WeakMap,
        G = new WeakMap,
        Q = new WeakMap;

      function Y(e, t, n) {
        var o = b().util;
        o.warn;
        var c = o.defineReactive,
          a = e.__ob__;

        function r() {
          a && U(n) && !j(n, "__ob__") && le(n)
        }
        if (E(e)) {
          if (M(t)) return e.length = Math.max(e.length, t), e.splice(t, 1, n), r(), n;
          if ("length" === t && n !== e.length) return e.length = n, null == a || a.dep.notify(), n
        }
        return t in e && !(t in Object.prototype) ? (e[t] = n, r(), n) : e._isVue || a && a.vmCount ? n : a ? (c(a.value, t, n), ye(e, t, n), r(), a.dep.notify(), n) : (e[t] = n, n)
      }
      var Z = !1;

      function X(e) {
        Z = e
      }
      var ee = function (e) {
        T(this, "value", {
          get: e.get,
          set: e.set
        })
      };

      function te(e, t, n) {
        void 0 === t && (t = !1), void 0 === n && (n = !1);
        var o = new ee(e);
        n && (o.effect = !0);
        var c = Object.seal(o);
        return t && Q.set(c, !0), c
      }

      function ne(e) {
        var t;
        if (oe(e)) return e;
        var n = pe(((t = {})[W] = e, t));
        return te({
          get: function () {
            return n[W]
          },
          set: function (e) {
            return n[W] = e
          }
        })
      }

      function oe(e) {
        return e instanceof ee
      }

      function ce(e) {
        return oe(e) ? e.value : e
      }

      function ae(e) {
        if (!R(e)) return e;
        var t = {};
        for (var n in e) t[n] = re(e, n);
        return t
      }

      function re(e, t) {
        t in e || Y(e, t, void 0);
        var n = e[t];
        return oe(n) ? n : te({
          get: function () {
            return e[t]
          },
          set: function (n) {
            return e[t] = n
          }
        })
      }

      function ue(t) {
        var n;
        return Boolean(t && j(t, "__ob__") && "object" == e(t.__ob__) && (null === (n = t.__ob__) || void 0 === n ? void 0 : n.__v_skip))
      }

      function ie(t) {
        var n;
        return Boolean(t && j(t, "__ob__") && "object" == e(t.__ob__) && !(null === (n = t.__ob__) || void 0 === n ? void 0 : n.__v_skip))
      }

      function se(e) {
        if (!(!R(e) || ue(e) || E(e) || oe(e) || (t = e, n = b(), n && t instanceof n) || J.has(e))) {
          var t, n;
          J.set(e, !0);
          for (var o = Object.keys(e), c = 0; c < o.length; c++) ye(e, o[c])
        }
      }

      function ye(e, t, n) {
        if ("__ob__" !== t && !ue(e[t])) {
          var o, c, a = Object.getOwnPropertyDescriptor(e, t);
          if (a) {
            if (!1 === a.configurable) return;
            o = a.get, c = a.set, o && !c || 2 !== arguments.length || (n = e[t])
          }
          se(n), T(e, t, {
            get: function () {
              var c = o ? o.call(e) : n;
              return t !== W && oe(c) ? c.value : c
            },
            set: function (a) {
              o && !c || (t !== W && oe(n) && !oe(a) ? n.value = a : c ? (c.call(e, a), n = a) : n = a, se(a))
            }
          })
        }
      }

      function de(e) {
        var t, n = _();
        return j(t = n.observable ? n.observable(e) : B(n, {
          data: {
            $$state: e
          }
        })._data.$$state, "__ob__") || le(t), t
      }

      function le(e, t) {
        var n, o;
        if (void 0 === t && (t = new Set), !t.has(e) && !j(e, "__ob__") && Object.isExtensible(e)) {
          I(e, "__ob__", function (e) {
            return void 0 === e && (e = {}), {
              value: e,
              dep: {
                notify: A,
                depend: A,
                addSub: A,
                removeSub: A
              }
            }
          }(e)), t.add(e);
          try {
            for (var c = u(Object.keys(e)), a = c.next(); !a.done; a = c.next()) {
              var r = e[a.value];
              (R(r) || E(r)) && !ue(r) && Object.isExtensible(r) && le(r, t)
            }
          } catch (e) {
            n = {
              error: e
            }
          } finally {
            try {
              a && !a.done && (o = c.return) && o.call(c)
            } finally {
              if (n) throw n.error
            }
          }
        }
      }

      function fe() {
        return de({}).__ob__
      }

      function me(e) {
        var t, n;
        if (!U(e)) return e;
        if (!R(e) && !E(e) || ue(e) || !Object.isExtensible(e)) return e;
        var o = de(E(e) ? [] : {}),
          c = o.__ob__,
          a = function (t) {
            var n, a, r = e[t],
              u = Object.getOwnPropertyDescriptor(e, t);
            if (u) {
              if (!1 === u.configurable) return "continue";
              n = u.get, a = u.set
            }
            T(o, t, {
              get: function () {
                var e;
                return null === (e = c.dep) || void 0 === e || e.depend(), r
              },
              set: function (t) {
                var o;
                n && !a || (Z || r !== t) && (a ? a.call(e, t) : r = t, null === (o = c.dep) || void 0 === o || o.notify())
              }
            })
          };
        try {
          for (var r = u(Object.keys(e)), i = r.next(); !i.done; i = r.next()) a(i.value)
        } catch (e) {
          t = {
            error: e
          }
        } finally {
          try {
            i && !i.done && (n = r.return) && n.call(r)
          } finally {
            if (t) throw t.error
          }
        }
        return o
      }

      function pe(e) {
        if (!U(e)) return e;
        if (!R(e) && !E(e) || ue(e) || !Object.isExtensible(e)) return e;
        var t = de(e);
        return se(t), t
      }

      function he(e) {
        return function (t, n) {
          var o, c = q("on".concat((o = e)[0].toUpperCase() + o.slice(1)), n);
          return c && function (e, t, n, o) {
            var c = t.proxy.$options,
              a = e.config.optionMergeStrategies[n],
              r = function (e, t) {
                return function () {
                  for (var n = [], o = 0; o < arguments.length; o++) n[o] = arguments[o];
                  var c = w();
                  x(e);
                  try {
                    return t.apply(void 0, s([], i(n), !1))
                  } finally {
                    x(c)
                  }
                }
              }(t, o);
            return c[n] = a(c[n], r), r
          }(b(), c, e, t)
        }
      }
      var Ce, ge = he("beforeMount"),
        ve = he("mounted"),
        Ne = he("beforeUpdate"),
        be = he("updated"),
        _e = he("beforeDestroy"),
        xe = he("destroyed"),
        we = he("errorCaptured"),
        ke = he("activated"),
        Oe = he("deactivated"),
        Se = he("serverPrefetch");

      function Pe() {
        Ie(this, z)
      }

      function Ae() {
        Ie(this, K)
      }

      function Te() {
        var e = m();
        return e ? function (e) {
          return void 0 !== e[z]
        }(e) || function (e) {
          e[z] = [], e[K] = [], e.$on("hook:beforeUpdate", Pe), e.$on("hook:updated", Ae)
        }(e) : (Ce || (Ce = B(b())), e = Ce), e
      }

      function Ie(e, t) {
        for (var n = e[t], o = 0; o < n.length; o++) n[o]();
        n.length = 0
      }

      function je(e, t, n) {
        var o = function () {
          e.$nextTick((function () {
            e[z].length && Ie(e, z), e[K].length && Ie(e, K)
          }))
        };
        switch (n) {
          case "pre":
            o(), e[z].push(t);
            break;
          case "post":
            o(), e[K].push(t);
            break;
          default:
            ! function (e, t) {
              throw new Error("[vue-composition-api] ".concat(t))
            }(0, 'flush must be one of ["post", "pre", "sync"], but got '.concat(n))
        }
      }

      function Ee(e, t) {
        var n = e.teardown;
        e.teardown = function () {
          for (var o = [], c = 0; c < arguments.length; c++) o[c] = arguments[c];
          n.apply(e, o), t()
        }
      }

      function $e(e, t, n, o) {
        var c, a, r = o.flush,
          u = "sync" === r,
          y = function (e) {
            a = function () {
              try {
                e()
              } catch (e) {
                ! function (e, t, n) {
                  if ("undefined" == typeof window || "undefined" == typeof console) throw e;
                  console.error(e)
                }(e)
              }
            }
          },
          d = function () {
            a && (a(), a = null)
          },
          l = function (t) {
            return u || e === Ce ? t : function () {
              for (var n = [], o = 0; o < arguments.length; o++) n[o] = arguments[o];
              return je(e, (function () {
                t.apply(void 0, s([], i(n), !1))
              }), r)
            }
          };
        if (null === n) {
          var f = !1,
            m = function (e, t, n, o) {
              var c = e._watchers.length;
              return e.$watch(t, n, {
                immediate: o.immediateInvokeCallback,
                deep: o.deep,
                lazy: o.noRun,
                sync: o.sync,
                before: o.before
              }), e._watchers[c]
            }(e, (function () {
              if (!f) try {
                f = !0, t(y)
              } finally {
                f = !1
              }
            }), A, {
              deep: o.deep || !1,
              sync: u,
              before: d
            });
          Ee(m, d), m.lazy = !1;
          var p = m.get.bind(m);
          return m.get = l(p),
            function () {
              m.teardown()
            }
        }
        var h, C = o.deep,
          g = !1;
        if (oe(t) ? h = function () {
            return t.value
          } : ie(t) ? (h = function () {
            return t
          }, C = !0) : E(t) ? (g = !0, h = function () {
            return t.map((function (e) {
              return oe(e) ? e.value : ie(e) ? Le(e) : F(e) ? e() : A
            }))
          }) : h = F(t) ? t : A, C) {
          var v = h;
          h = function () {
            return Le(v())
          }
        }
        var N = function (e, t) {
            if (C || !g || !e.every((function (e, n) {
                return (o = e) === (c = t[n]) ? 0 !== o || 1 / o == 1 / c : o != o && c != c;
                var o, c
              }))) return d(), n(e, t, y)
          },
          b = l(N);
        if (o.immediate) {
          var _ = b,
            x = function (e, t) {
              return x = _, N(e, E(e) ? [] : t)
            };
          b = function (e, t) {
            return x(e, t)
          }
        }
        var w = e.$watch(h, b, {
            immediate: o.immediate,
            deep: C,
            sync: u
          }),
          k = e._watchers[e._watchers.length - 1];
        return ie(k.value) && (null === (c = k.value.__ob__) || void 0 === c ? void 0 : c.dep) && C && k.value.__ob__.dep.addSub({
            update: function () {
              k.run()
            }
          }), Ee(k, d),
          function () {
            w()
          }
      }

      function De(e, t) {
        var n = function (e) {
          return r({
            flush: "pre"
          }, e)
        }(t);
        return $e(Te(), e, null, n)
      }

      function Le(e, t) {
        if (void 0 === t && (t = new Set), !U(e) || t.has(e) || G.has(e)) return e;
        if (t.add(e), oe(e)) Le(e.value, t);
        else if (E(e))
          for (var n = 0; n < e.length; n++) Le(e[n], t);
        else if ("[object Set]" === L(e) || function (e) {
            return "[object Map]" === L(e)
          }(e)) e.forEach((function (e) {
          Le(e, t)
        }));
        else if (R(e))
          for (var o in e) Le(e[o], t);
        return e
      }
      var Me = {};

      function Ue(e, t) {
        for (var n = t; n;) {
          if (n._provided && j(n._provided, e)) return n._provided[e];
          n = n.$parent
        }
        return Me
      }
      var Re, Fe = {},
        qe = function (e) {
          var t;
          void 0 === e && (e = "$style");
          var n = w();
          return n && (null === (t = n.proxy) || void 0 === t ? void 0 : t[e]) || Fe
        },
        Be = qe;

      function Ve() {
        return w().setupContext
      }
      var He = function (e, t, n) {
          (e.__composition_api_state__ = e.__composition_api_state__ || {})[t] = n
        },
        ze = function (e, t) {
          return (e.__composition_api_state__ || {})[t]
        };

      function Ke(e) {
        var t = ze(e, "rawBindings") || {};
        if (t && Object.keys(t).length) {
          for (var n = e.$refs, o = ze(e, "refs") || [], c = 0; c < o.length; c++) {
            var a = t[i = o[c]];
            !n[i] && a && oe(a) && (a.value = null)
          }
          var r = Object.keys(n),
            u = [];
          for (c = 0; c < r.length; c++) {
            var i;
            a = t[i = r[c]], n[i] && a && oe(a) && (a.value = n[i], u.push(i))
          }
          He(e, "refs", u)
        }
      }

      function We(e) {
        for (var t, n = [e._vnode]; n.length;) {
          var o = n.pop();
          if (o && (o.context && (Ke(o.context), t = !0), o.children))
            for (var c = 0; c < o.children.length; ++c) n.push(o.children[c])
        }
        t || Ke(e)
      }

      function Je(e, t) {
        var n, o;
        if (e) {
          var c = ze(e, "attrBindings");
          if (c || t) {
            if (!c) {
              var a = pe({});
              He(e, "attrBindings", c = {
                ctx: t,
                data: a
              }), T(t, "attrs", {
                get: function () {
                  return null == c ? void 0 : c.data
                },
                set: function () {}
              })
            }
            var r = e.$attrs,
              i = function (t) {
                j(c.data, t) || T(c.data, t, {
                  get: function () {
                    return e.$attrs[t]
                  }
                })
              };
            try {
              for (var s = u(Object.keys(r)), y = s.next(); !y.done; y = s.next()) i(y.value)
            } catch (e) {
              n = {
                error: e
              }
            } finally {
              try {
                y && !y.done && (o = s.return) && o.call(s)
              } finally {
                if (n) throw n.error
              }
            }
          }
        }
      }

      function Ge(e, t) {
        var n = e.$options._parentVnode;
        if (n) {
          for (var o = ze(e, "slots") || [], c = function (e, t) {
              var n;
              if (e) {
                if (e._normalized) return e._normalized;
                for (var o in n = {}, e) e[o] && "$" !== o[0] && (n[o] = !0)
              } else n = {};
              for (var o in t) o in n || (n[o] = !0);
              return n
            }(n.data.scopedSlots, e.$slots), a = 0; a < o.length; a++) c[u = o[a]] || delete t[u];
          var r = Object.keys(c);
          for (a = 0; a < r.length; a++) {
            var u;
            t[u = r[a]] || (t[u] = V(e, u))
          }
          He(e, "slots", r)
        }
      }

      function Qe(e, t, n) {
        var o = w();
        x(e);
        try {
          return t(e)
        } catch (e) {
          if (!n) throw e;
          n(e)
        } finally {
          x(o)
        }
      }

      function Ye(e) {
        (function (e) {
          return C && j(e, "__composition_api_installed__")
        })(e) || (e.config.optionMergeStrategies.setup = function (e, t) {
          return function (n, o) {
            return function e(t, n) {
              if (!t) return n;
              if (!n) return t;
              for (var o, c, a, r = P ? Reflect.ownKeys(t) : Object.keys(t), u = 0; u < r.length; u++) "__ob__" !== (o = r[u]) && (c = n[o], a = t[o], j(n, o) ? c !== a && R(c) && !oe(c) && R(a) && !oe(a) && e(a, c) : n[o] = a);
              return n
            }(F(e) ? e(n, o) || {} : void 0, F(t) ? t(n, o) || {} : void 0)
          }
        }, function (e) {
          C = e, Object.defineProperty(e, "__composition_api_installed__", {
            configurable: !0,
            writable: !0,
            value: !0
          })
        }(e), function (e) {
          e.mixin({
            beforeCreate: function () {
              var e = this,
                t = e.$options,
                n = t.setup,
                o = t.render;
              if (o && (t.render = function () {
                  for (var t = this, n = [], c = 0; c < arguments.length; c++) n[c] = arguments[c];
                  return Qe(O(e), (function () {
                    return o.apply(t, n)
                  }))
                }), n && F(n)) {
                var c = t.data;
                t.data = function () {
                  return function (e, t) {
                    void 0 === t && (t = {});
                    var n, o = e.$options.setup,
                      c = function (e) {
                        var t = {
                          slots: {}
                        };
                        return ["root", "parent", "refs", "listeners", "isServer", "ssrContext"].forEach((function (n) {
                          var o = "$".concat(n);
                          T(t, n, {
                            get: function () {
                              return e[o]
                            },
                            set: function () {}
                          })
                        })), Je(e, t), ["emit"].forEach((function (n) {
                          var o = "$".concat(n);
                          T(t, n, {
                            get: function () {
                              return function () {
                                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                                e[o].apply(e, t)
                              }
                            }
                          })
                        })), t
                      }(e),
                      a = O(e);
                    if (a.setupContext = c, I(t, "__ob__", fe()), Ge(e, c.slots), Qe(a, (function () {
                        n = o(t, c)
                      })), n)
                      if (F(n)) {
                        var r = n;
                        e.$options.render = function () {
                          return Ge(e, c.slots), Qe(a, (function () {
                            return r()
                          }))
                        }
                      } else if (U(n)) {
                      ie(n) && (n = ae(n)), He(e, "rawBindings", n);
                      var u = n;
                      Object.keys(u).forEach((function (t) {
                        var n = u[t];
                        if (!oe(n))
                          if (ie(n)) E(n) && (n = ne(n));
                          else if (F(n)) {
                          var o = n;
                          n = n.bind(e), Object.keys(o).forEach((function (e) {
                            n[e] = o[e]
                          }))
                        } else U(n) ? function e(t, n) {
                          return void 0 === n && (n = new Map), n.has(t) ? n.get(t) : (n.set(t, !1), E(t) && ie(t) ? (n.set(t, !0), !0) : !(!R(t) || ue(t) || oe(t)) && Object.keys(t).some((function (o) {
                            return e(t[o], n)
                          })))
                        }(n) && function e(t, n) {
                          if (void 0 === n && (n = new Set), !n.has(t) && R(t) && !oe(t) && !ie(t) && !ue(t)) {
                            var o = b().util.defineReactive;
                            Object.keys(t).forEach((function (c) {
                              var a = t[c];
                              o(t, c, a), a && (n.add(a), e(a, n))
                            }))
                          }
                        }(n) : n = ne(n);
                        ! function (e, t, n) {
                          var o = e.$options.props;
                          t in e || o && j(o, t) || (oe(n) ? T(e, t, {
                            get: function () {
                              return n.value
                            },
                            set: function (e) {
                              n.value = e
                            }
                          }) : T(e, t, {
                            get: function () {
                              return ie(n) && n.__ob__.dep.depend(), n
                            },
                            set: function (e) {
                              n = e
                            }
                          }))
                        }(e, t, n)
                      }))
                    }
                  }(e, e.$props), F(c) ? c.call(e, e) : c || {}
                }
              }
            },
            mounted: function () {
              We(this)
            },
            beforeUpdate: function () {
              Je(this)
            },
            updated: function () {
              We(this)
            }
          })
        }(e))
      }
      var Ze = {
        install: function (e) {
          return Ye(e)
        }
      };
      "undefined" != typeof window && window.Vue && window.Vue.use(Ze), n.EffectScope = l, n.computed = function (e) {
        var t, n, o, c, a = m();
        if (F(e) ? t = e : (t = e.get, n = e.set), a && !a.$isServer) {
          var r, u = function () {
              if (!$) {
                var e = B(b(), {
                    computed: {
                      value: function () {
                        return 0
                      }
                    }
                  }),
                  t = e._computedWatchers.value.constructor,
                  n = e._data.__ob__.dep.constructor;
                $ = {
                  Watcher: t,
                  Dep: n
                }, e.$destroy()
              }
              return $
            }(),
            i = u.Watcher,
            s = u.Dep;
          c = function () {
            return r || (r = new i(a, t, A, {
              lazy: !0
            })), r.dirty && r.evaluate(), s.target && r.depend(), r.value
          }, o = function (e) {
            n && n(e)
          }
        } else {
          var y = B(b(), {
            computed: {
              $$state: {
                get: t,
                set: n
              }
            }
          });
          a && a.$on("hook:destroyed", (function () {
            return y.$destroy()
          })), c = function () {
            return y.$$state
          }, o = function (e) {
            y.$$state = e
          }
        }
        return te({
          get: c,
          set: o
        }, !n, !0)
      }, n.createApp = function (e, t) {
        void 0 === t && (t = void 0);
        var n = b(),
          o = void 0,
          c = {},
          a = {
            config: n.config,
            use: n.use.bind(n),
            mixin: n.mixin.bind(n),
            component: n.component.bind(n),
            provide: function (e, t) {
              return c[e] = t, this
            },
            directive: function (e, t) {
              return t ? (n.directive(e, t), a) : n.directive(e)
            },
            mount: function (a, u) {
              return o || ((o = new n(r(r({
                propsData: t
              }, e), {
                provide: r(r({}, c), e.provide)
              }))).$mount(a, u), o)
            },
            unmount: function () {
              o && (o.$destroy(), o = void 0)
            }
          };
        return a
      }, n.createLifeCycle = he, n.createRef = te, n.customRef = function (e) {
        var t = ne(0);
        return te(e((function () {
          t.value
        }), (function () {
          ++t.value
        })))
      }, n.default = Ze, n.defineAsyncComponent = function (e) {
        F(e) && (e = {
          loader: e
        });
        var t = e.loader,
          n = e.loadingComponent,
          o = e.errorComponent,
          c = e.delay,
          a = void 0 === c ? 200 : c,
          r = e.timeout;
        e.suspensible;
        var u = e.onError,
          i = null,
          s = 0,
          y = function e() {
            var n;
            return i || (n = i = t().catch((function (t) {
              if (t = t instanceof Error ? t : new Error(String(t)), u) return new Promise((function (n, o) {
                u(t, (function () {
                  return n((s++, i = null, e()))
                }), (function () {
                  return o(t)
                }), s + 1)
              }));
              throw t
            })).then((function (e) {
              return n !== i && i ? i : (e && (e.__esModule || "Module" === e[Symbol.toStringTag]) && (e = e.default), e)
            })))
          };
        return function () {
          return {
            component: y(),
            delay: a,
            timeout: r,
            error: o,
            loading: n
          }
        }
      }, n.defineComponent = function (e) {
        return e
      }, n.del = function (e, t) {
        if (b().util.warn, E(e) && M(t)) e.splice(t, 1);
        else {
          var n = e.__ob__;
          e._isVue || n && n.vmCount || j(e, t) && (delete e[t], n && n.dep.notify())
        }
      }, n.effectScope = function (e) {
        return new l(e)
      }, n.getCurrentInstance = w, n.getCurrentScope = f, n.h = function () {
        for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        var o = (null == this ? void 0 : this.proxy) || (null === (e = w()) || void 0 === e ? void 0 : e.proxy);
        return o ? o.$createElement.apply(o, t) : (Re || (Re = B(b()).$createElement), Re.apply(Re, t))
      }, n.inject = function (e, t, n) {
        var o;
        void 0 === n && (n = !1);
        var c = null === (o = w()) || void 0 === o ? void 0 : o.proxy;
        if (c) {
          if (!e) return t;
          var a = Ue(e, c);
          return a !== Me ? a : arguments.length > 1 ? n && F(t) ? t() : t : void 0
        }
      }, n.isRaw = ue, n.isReactive = ie, n.isReadonly = function (e) {
        return Q.has(e)
      }, n.isRef = oe, n.markRaw = function (e) {
        if (!R(e) && !E(e) || !Object.isExtensible(e)) return e;
        var t = fe();
        return t.__v_skip = !0, I(e, "__ob__", t), G.set(e, !0), e
      }, n.nextTick = function () {
        for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        return null === (e = b()) || void 0 === e ? void 0 : e.nextTick.apply(this, t)
      }, n.onActivated = ke, n.onBeforeMount = ge, n.onBeforeUnmount = _e, n.onBeforeUpdate = Ne, n.onDeactivated = Oe, n.onErrorCaptured = we, n.onMounted = ve, n.onScopeDispose = function (e) {
        c && c.cleanups.push(e)
      }, n.onServerPrefetch = Se, n.onUnmounted = xe, n.onUpdated = be, n.provide = function (e, t) {
        var n, o = null === (n = q()) || void 0 === n ? void 0 : n.proxy;
        if (o) {
          if (!o._provided) {
            var c = {};
            T(o, "_provided", {
              get: function () {
                return c
              },
              set: function (e) {
                return Object.assign(c, e)
              }
            })
          }
          o._provided[e] = t
        }
      }, n.proxyRefs = function (e) {
        var t, n, o;
        if (ie(e)) return e;
        var c = pe(((t = {})[W] = e, t));
        I(c, W, c[W], !1);
        var a = function (e) {
          T(c, e, {
            get: function () {
              return oe(c[W][e]) ? c[W][e].value : c[W][e]
            },
            set: function (t) {
              if (oe(c[W][e])) return c[W][e].value = ce(t);
              c[W][e] = ce(t)
            }
          })
        };
        try {
          for (var r = u(Object.keys(e)), i = r.next(); !i.done; i = r.next()) a(i.value)
        } catch (e) {
          n = {
            error: e
          }
        } finally {
          try {
            i && !i.done && (o = r.return) && o.call(r)
          } finally {
            if (n) throw n.error
          }
        }
        return c
      }, n.reactive = pe, n.readonly = function (e) {
        return Q.set(e, !0), e
      }, n.ref = ne, n.set = Y, n.shallowReactive = me, n.shallowReadonly = function (e) {
        var t, n;
        if (!U(e)) return e;
        if (!R(e) && !E(e) || !Object.isExtensible(e) && !oe(e)) return e;
        var o = oe(e) ? new ee({}) : ie(e) ? de({}) : {},
          c = pe({}).__ob__,
          a = function (t) {
            var n, a = e[t],
              r = Object.getOwnPropertyDescriptor(e, t);
            if (r) {
              if (!1 === r.configurable && !oe(e)) return "continue";
              n = r.get
            }
            T(o, t, {
              get: function () {
                var t = n ? n.call(e) : a;
                return c.dep.depend(), t
              },
              set: function (e) {}
            })
          };
        try {
          for (var r = u(Object.keys(e)), i = r.next(); !i.done; i = r.next()) a(i.value)
        } catch (e) {
          t = {
            error: e
          }
        } finally {
          try {
            i && !i.done && (n = r.return) && n.call(r)
          } finally {
            if (t) throw t.error
          }
        }
        return Q.set(o, !0), o
      }, n.shallowRef = function (e) {
        var t;
        if (oe(e)) return e;
        var n = me(((t = {})[W] = e, t));
        return te({
          get: function () {
            return n[W]
          },
          set: function (e) {
            return n[W] = e
          }
        })
      }, n.toRaw = function (e) {
        var t;
        return ue(e) || !Object.isExtensible(e) ? e : (null === (t = null == e ? void 0 : e.__ob__) || void 0 === t ? void 0 : t.value) || e
      }, n.toRef = re, n.toRefs = ae, n.triggerRef = function (e) {
        oe(e) && (X(!0), e.value = e.value, X(!1))
      }, n.unref = ce, n.useAttrs = function () {
        return Ve().attrs
      }, n.useCSSModule = Be, n.useCssModule = qe, n.useSlots = function () {
        return Ve().slots
      }, n.version = "1.7.0", n.warn = function (e) {
        var t, n, o, c;
        n = e, o = null === (t = w()) || void 0 === t ? void 0 : t.proxy, (c = _()) && c.util ? c.util.warn(n, o) : console.warn("[vue-composition-api] ".concat(n))
      }, n.watch = function (e, t, n) {
        var o = null;
        F(t) ? o = t : (n = t, o = null);
        var c = function (e) {
          return r({
            immediate: !1,
            deep: !1,
            flush: "pre"
          }, e)
        }(n);
        return $e(Te(), e, o, c)
      }, n.watchEffect = De, n.watchPostEffect = function (e) {
        return De(e, {
          flush: "post"
        })
      }, n.watchSyncEffect = function (e) {
        return De(e, {
          flush: "sync"
        })
      }
    },
    3223: function (e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0;
      var o = ["qy", "env", "error", "version", "lanDebug", "cloud", "serviceMarket", "router", "worklet", "__webpack_require_UNI_MP_PLUGIN__"],
        c = ["lanDebug", "router", "worklet"],
        a = "undefined" != typeof globalThis ? globalThis : function () {
          return this
        }(),
        r = ["w", "x"].join(""),
        u = a[r],
        i = u.getLaunchOptionsSync ? u.getLaunchOptionsSync() : null;

      function s(e) {
        return (!i || 1154 !== i.scene || !c.includes(e)) && (o.indexOf(e) > -1 || "function" == typeof u[e])
      }
      a[r] = function () {
        var e = {};
        for (var t in u) s(t) && (e[t] = u[t]);
        return e
      }();
      var y = a[r];
      t.default = y
    },
    3240: function (t, n, o) {
      o.r(n),
        function (t) {
          /*!
           * Vue.js v2.6.11
           * (c) 2014-2024 Evan You
           * Released under the MIT License.
           */
          var o = Object.freeze({});

          function c(e) {
            return null == e
          }

          function a(e) {
            return null != e
          }

          function r(e) {
            return !0 === e
          }

          function u(t) {
            return "string" == typeof t || "number" == typeof t || "symbol" === e(t) || "boolean" == typeof t
          }

          function i(t) {
            return null !== t && "object" === e(t)
          }
          var s = Object.prototype.toString;

          function y(e) {
            return "[object Object]" === s.call(e)
          }

          function d(e) {
            var t = parseFloat(String(e));
            return t >= 0 && Math.floor(t) === t && isFinite(e)
          }

          function l(e) {
            return a(e) && "function" == typeof e.then && "function" == typeof e.catch
          }

          function f(e) {
            return null == e ? "" : Array.isArray(e) || y(e) && e.toString === s ? JSON.stringify(e, null, 2) : String(e)
          }

          function m(e) {
            var t = parseFloat(e);
            return isNaN(t) ? e : t
          }

          function p(e, t) {
            for (var n = Object.create(null), o = e.split(","), c = 0; c < o.length; c++) n[o[c]] = !0;
            return t ? function (e) {
              return n[e.toLowerCase()]
            } : function (e) {
              return n[e]
            }
          }
          p("slot,component", !0);
          var h = p("key,ref,slot,slot-scope,is");

          function C(e, t) {
            if (e.length) {
              var n = e.indexOf(t);
              if (n > -1) return e.splice(n, 1)
            }
          }
          var g = Object.prototype.hasOwnProperty;

          function v(e, t) {
            return g.call(e, t)
          }

          function N(e) {
            var t = Object.create(null);
            return function (n) {
              return t[n] || (t[n] = e(n))
            }
          }
          var b = /-(\w)/g,
            _ = N((function (e) {
              return e.replace(b, (function (e, t) {
                return t ? t.toUpperCase() : ""
              }))
            })),
            x = N((function (e) {
              return e.charAt(0).toUpperCase() + e.slice(1)
            })),
            w = /\B([A-Z])/g,
            k = N((function (e) {
              return e.replace(w, "-$1").toLowerCase()
            })),
            O = Function.prototype.bind ? function (e, t) {
              return e.bind(t)
            } : function (e, t) {
              function n(n) {
                var o = arguments.length;
                return o ? o > 1 ? e.apply(t, arguments) : e.call(t, n) : e.call(t)
              }
              return n._length = e.length, n
            };

          function S(e, t) {
            t = t || 0;
            for (var n = e.length - t, o = new Array(n); n--;) o[n] = e[n + t];
            return o
          }

          function P(e, t) {
            for (var n in t) e[n] = t[n];
            return e
          }

          function A(e) {
            for (var t = {}, n = 0; n < e.length; n++) e[n] && P(t, e[n]);
            return t
          }

          function T(e, t, n) {}
          var I = function (e, t, n) {
              return !1
            },
            j = function (e) {
              return e
            };

          function E(e, t) {
            if (e === t) return !0;
            var n = i(e),
              o = i(t);
            if (!n || !o) return !n && !o && String(e) === String(t);
            try {
              var c = Array.isArray(e),
                a = Array.isArray(t);
              if (c && a) return e.length === t.length && e.every((function (e, n) {
                return E(e, t[n])
              }));
              if (e instanceof Date && t instanceof Date) return e.getTime() === t.getTime();
              if (c || a) return !1;
              var r = Object.keys(e),
                u = Object.keys(t);
              return r.length === u.length && r.every((function (n) {
                return E(e[n], t[n])
              }))
            } catch (e) {
              return !1
            }
          }

          function $(e, t) {
            for (var n = 0; n < e.length; n++)
              if (E(e[n], t)) return n;
            return -1
          }

          function D(e) {
            var t = !1;
            return function () {
              t || (t = !0, e.apply(this, arguments))
            }
          }
          var L = ["component", "directive", "filter"],
            M = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestroy", "destroyed", "activated", "deactivated", "errorCaptured", "serverPrefetch"],
            U = {
              optionMergeStrategies: Object.create(null),
              silent: !1,
              productionTip: !1,
              devtools: !1,
              performance: !1,
              errorHandler: null,
              warnHandler: null,
              ignoredElements: [],
              keyCodes: Object.create(null),
              isReservedTag: I,
              isReservedAttr: I,
              isUnknownElement: I,
              getTagNamespace: T,
              parsePlatformTagName: j,
              mustUseProp: I,
              async: !0,
              _lifecycleHooks: M
            };

          function R(e) {
            var t = (e + "").charCodeAt(0);
            return 36 === t || 95 === t
          }

          function F(e, t, n, o) {
            Object.defineProperty(e, t, {
              value: n,
              enumerable: !!o,
              writable: !0,
              configurable: !0
            })
          }
          var q, B = new RegExp("[^" + /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/.source + ".$_\\d]"),
            V = "__proto__" in {},
            H = "undefined" != typeof window,
            z = "undefined" != typeof WXEnvironment && !!WXEnvironment.platform,
            K = z && WXEnvironment.platform.toLowerCase(),
            W = H && window.navigator && window.navigator.userAgent.toLowerCase(),
            J = W && /msie|trident/.test(W),
            G = (W && W.indexOf("msie 9.0"), W && W.indexOf("edge/"), W && W.indexOf("android"), W && /iphone|ipad|ipod|ios/.test(W) || "ios" === K),
            Q = (W && /chrome\/\d+/.test(W), W && /phantomjs/.test(W), W && W.match(/firefox\/(\d+)/), {}.watch);
          if (H) try {
            var Y = {};
            Object.defineProperty(Y, "passive", {
              get: function () {}
            }), window.addEventListener("test-passive", null, Y)
          } catch (e) {}
          var Z = function () {
              return void 0 === q && (q = !H && !z && void 0 !== t && t.process && "server" === t.process.env.VUE_ENV), q
            },
            X = H && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

          function ee(e) {
            return "function" == typeof e && /native code/.test(e.toString())
          }
          var te, ne = "undefined" != typeof Symbol && ee(Symbol) && "undefined" != typeof Reflect && ee(Reflect.ownKeys);
          te = "undefined" != typeof Set && ee(Set) ? Set : function () {
            function e() {
              this.set = Object.create(null)
            }
            return e.prototype.has = function (e) {
              return !0 === this.set[e]
            }, e.prototype.add = function (e) {
              this.set[e] = !0
            }, e.prototype.clear = function () {
              this.set = Object.create(null)
            }, e
          }();
          var oe = T,
            ce = 0,
            ae = function () {
              this.id = ce++, this.subs = []
            };

          function re(e) {
            ae.SharedObject.targetStack.push(e), ae.SharedObject.target = e, ae.target = e
          }

          function ue() {
            ae.SharedObject.targetStack.pop(), ae.SharedObject.target = ae.SharedObject.targetStack[ae.SharedObject.targetStack.length - 1], ae.target = ae.SharedObject.target
          }
          ae.prototype.addSub = function (e) {
            this.subs.push(e)
          }, ae.prototype.removeSub = function (e) {
            C(this.subs, e)
          }, ae.prototype.depend = function () {
            ae.SharedObject.target && ae.SharedObject.target.addDep(this)
          }, ae.prototype.notify = function () {
            for (var e = this.subs.slice(), t = 0, n = e.length; t < n; t++) e[t].update()
          }, (ae.SharedObject = {}).target = null, ae.SharedObject.targetStack = [];
          var ie = function (e, t, n, o, c, a, r, u) {
              this.tag = e, this.data = t, this.children = n, this.text = o, this.elm = c, this.ns = void 0, this.context = a, this.fnContext = void 0, this.fnOptions = void 0, this.fnScopeId = void 0, this.key = t && t.key, this.componentOptions = r, this.componentInstance = void 0, this.parent = void 0, this.raw = !1, this.isStatic = !1, this.isRootInsert = !0, this.isComment = !1, this.isCloned = !1, this.isOnce = !1, this.asyncFactory = u, this.asyncMeta = void 0, this.isAsyncPlaceholder = !1
            },
            se = {
              child: {
                configurable: !0
              }
            };
          se.child.get = function () {
            return this.componentInstance
          }, Object.defineProperties(ie.prototype, se);
          var ye = function (e) {
            void 0 === e && (e = "");
            var t = new ie;
            return t.text = e, t.isComment = !0, t
          };

          function de(e) {
            return new ie(void 0, void 0, void 0, String(e))
          }
          var le = Array.prototype,
            fe = Object.create(le);
          ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach((function (e) {
            var t = le[e];
            F(fe, e, (function () {
              for (var n = [], o = arguments.length; o--;) n[o] = arguments[o];
              var c, a = t.apply(this, n),
                r = this.__ob__;
              switch (e) {
                case "push":
                case "unshift":
                  c = n;
                  break;
                case "splice":
                  c = n.slice(2)
              }
              return c && r.observeArray(c), r.dep.notify(), a
            }))
          }));
          var me = Object.getOwnPropertyNames(fe),
            pe = !0;

          function he(e) {
            pe = e
          }
          var Ce = function (e) {
            this.value = e, this.dep = new ae, this.vmCount = 0, F(e, "__ob__", this), Array.isArray(e) ? (V ? e.push !== e.__proto__.push ? ge(e, fe, me) : function (e, t) {
              e.__proto__ = t
            }(e, fe) : ge(e, fe, me), this.observeArray(e)) : this.walk(e)
          };

          function ge(e, t, n) {
            for (var o = 0, c = n.length; o < c; o++) {
              var a = n[o];
              F(e, a, t[a])
            }
          }

          function ve(e, t) {
            var n;
            if (i(e) && !(e instanceof ie)) return v(e, "__ob__") && e.__ob__ instanceof Ce ? n = e.__ob__ : !pe || Z() || !Array.isArray(e) && !y(e) || !Object.isExtensible(e) || e._isVue || e.__v_isMPComponent || (n = new Ce(e)), t && n && n.vmCount++, n
          }

          function Ne(e, t, n, o, c) {
            var a = new ae,
              r = Object.getOwnPropertyDescriptor(e, t);
            if (!r || !1 !== r.configurable) {
              var u = r && r.get,
                i = r && r.set;
              u && !i || 2 !== arguments.length || (n = e[t]);
              var s = !c && ve(n);
              Object.defineProperty(e, t, {
                enumerable: !0,
                configurable: !0,
                get: function () {
                  var t = u ? u.call(e) : n;
                  return ae.SharedObject.target && (a.depend(), s && (s.dep.depend(), Array.isArray(t) && xe(t))), t
                },
                set: function (t) {
                  var o = u ? u.call(e) : n;
                  t === o || t != t && o != o || u && !i || (i ? i.call(e, t) : n = t, s = !c && ve(t), a.notify())
                }
              })
            }
          }

          function be(e, t, n) {
            if (Array.isArray(e) && d(t)) return e.length = Math.max(e.length, t), e.splice(t, 1, n), n;
            if (t in e && !(t in Object.prototype)) return e[t] = n, n;
            var o = e.__ob__;
            return e._isVue || o && o.vmCount ? n : o ? (Ne(o.value, t, n), o.dep.notify(), n) : (e[t] = n, n)
          }

          function _e(e, t) {
            if (Array.isArray(e) && d(t)) e.splice(t, 1);
            else {
              var n = e.__ob__;
              e._isVue || n && n.vmCount || v(e, t) && (delete e[t], n && n.dep.notify())
            }
          }

          function xe(e) {
            for (var t = void 0, n = 0, o = e.length; n < o; n++)(t = e[n]) && t.__ob__ && t.__ob__.dep.depend(), Array.isArray(t) && xe(t)
          }
          Ce.prototype.walk = function (e) {
            for (var t = Object.keys(e), n = 0; n < t.length; n++) Ne(e, t[n])
          }, Ce.prototype.observeArray = function (e) {
            for (var t = 0, n = e.length; t < n; t++) ve(e[t])
          };
          var we = U.optionMergeStrategies;

          function ke(e, t) {
            if (!t) return e;
            for (var n, o, c, a = ne ? Reflect.ownKeys(t) : Object.keys(t), r = 0; r < a.length; r++) "__ob__" !== (n = a[r]) && (o = e[n], c = t[n], v(e, n) ? o !== c && y(o) && y(c) && ke(o, c) : be(e, n, c));
            return e
          }

          function Oe(e, t, n) {
            return n ? function () {
              var o = "function" == typeof t ? t.call(n, n) : t,
                c = "function" == typeof e ? e.call(n, n) : e;
              return o ? ke(o, c) : c
            } : t ? e ? function () {
              return ke("function" == typeof t ? t.call(this, this) : t, "function" == typeof e ? e.call(this, this) : e)
            } : t : e
          }

          function Se(e, t) {
            var n = t ? e ? e.concat(t) : Array.isArray(t) ? t : [t] : e;
            return n ? function (e) {
              for (var t = [], n = 0; n < e.length; n++) - 1 === t.indexOf(e[n]) && t.push(e[n]);
              return t
            }(n) : n
          }

          function Pe(e, t, n, o) {
            var c = Object.create(e || null);
            return t ? P(c, t) : c
          }
          we.data = function (e, t, n) {
            return n ? Oe(e, t, n) : t && "function" != typeof t ? e : Oe(e, t)
          }, M.forEach((function (e) {
            we[e] = Se
          })), L.forEach((function (e) {
            we[e + "s"] = Pe
          })), we.watch = function (e, t, n, o) {
            if (e === Q && (e = void 0), t === Q && (t = void 0), !t) return Object.create(e || null);
            if (!e) return t;
            var c = {};
            for (var a in P(c, e), t) {
              var r = c[a],
                u = t[a];
              r && !Array.isArray(r) && (r = [r]), c[a] = r ? r.concat(u) : Array.isArray(u) ? u : [u]
            }
            return c
          }, we.props = we.methods = we.inject = we.computed = function (e, t, n, o) {
            if (!e) return t;
            var c = Object.create(null);
            return P(c, e), t && P(c, t), c
          }, we.provide = Oe;
          var Ae = function (e, t) {
            return void 0 === t ? e : t
          };

          function Te(e, t, n) {
            if ("function" == typeof t && (t = t.options), function (e, t) {
                var n = e.props;
                if (n) {
                  var o, c, a = {};
                  if (Array.isArray(n))
                    for (o = n.length; o--;) "string" == typeof (c = n[o]) && (a[_(c)] = {
                      type: null
                    });
                  else if (y(n))
                    for (var r in n) c = n[r], a[_(r)] = y(c) ? c : {
                      type: c
                    };
                  e.props = a
                }
              }(t), function (e, t) {
                var n = e.inject;
                if (n) {
                  var o = e.inject = {};
                  if (Array.isArray(n))
                    for (var c = 0; c < n.length; c++) o[n[c]] = {
                      from: n[c]
                    };
                  else if (y(n))
                    for (var a in n) {
                      var r = n[a];
                      o[a] = y(r) ? P({
                        from: a
                      }, r) : {
                        from: r
                      }
                    }
                }
              }(t), function (e) {
                var t = e.directives;
                if (t)
                  for (var n in t) {
                    var o = t[n];
                    "function" == typeof o && (t[n] = {
                      bind: o,
                      update: o
                    })
                  }
              }(t), !t._base && (t.extends && (e = Te(e, t.extends, n)), t.mixins))
              for (var o = 0, c = t.mixins.length; o < c; o++) e = Te(e, t.mixins[o], n);
            var a, r = {};
            for (a in e) u(a);
            for (a in t) v(e, a) || u(a);

            function u(o) {
              var c = we[o] || Ae;
              r[o] = c(e[o], t[o], n, o)
            }
            return r
          }

          function Ie(e, t, n, o) {
            if ("string" == typeof n) {
              var c = e[t];
              if (v(c, n)) return c[n];
              var a = _(n);
              if (v(c, a)) return c[a];
              var r = x(a);
              return v(c, r) ? c[r] : c[n] || c[a] || c[r]
            }
          }

          function je(e, t, n, o) {
            var c = t[e],
              a = !v(n, e),
              r = n[e],
              u = De(Boolean, c.type);
            if (u > -1)
              if (a && !v(c, "default")) r = !1;
              else if ("" === r || r === k(e)) {
              var i = De(String, c.type);
              (i < 0 || u < i) && (r = !0)
            }
            if (void 0 === r) {
              r = function (e, t, n) {
                if (v(t, "default")) {
                  var o = t.default;
                  return e && e.$options.propsData && void 0 === e.$options.propsData[n] && void 0 !== e._props[n] ? e._props[n] : "function" == typeof o && "Function" !== Ee(t.type) ? o.call(e) : o
                }
              }(o, c, e);
              var s = pe;
              he(!0), ve(r), he(s)
            }
            return r
          }

          function Ee(e) {
            var t = e && e.toString().match(/^\s*function (\w+)/);
            return t ? t[1] : ""
          }

          function $e(e, t) {
            return Ee(e) === Ee(t)
          }

          function De(e, t) {
            if (!Array.isArray(t)) return $e(t, e) ? 0 : -1;
            for (var n = 0, o = t.length; n < o; n++)
              if ($e(t[n], e)) return n;
            return -1
          }

          function Le(e, t, n) {
            re();
            try {
              if (t)
                for (var o = t; o = o.$parent;) {
                  var c = o.$options.errorCaptured;
                  if (c)
                    for (var a = 0; a < c.length; a++) try {
                      if (!1 === c[a].call(o, e, t, n)) return
                    } catch (e) {
                      Ue(e, o, "errorCaptured hook")
                    }
                }
              Ue(e, t, n)
            } finally {
              ue()
            }
          }

          function Me(e, t, n, o, c) {
            var a;
            try {
              (a = n ? e.apply(t, n) : e.call(t)) && !a._isVue && l(a) && !a._handled && (a.catch((function (e) {
                return Le(e, o, c + " (Promise/async)")
              })), a._handled = !0)
            } catch (e) {
              Le(e, o, c)
            }
            return a
          }

          function Ue(e, t, n) {
            if (U.errorHandler) try {
              return U.errorHandler.call(null, e, t, n)
            } catch (t) {
              t !== e && Re(t, null, "config.errorHandler")
            }
            Re(e, t, n)
          }

          function Re(e, t, n) {
            if (!H && !z || "undefined" == typeof console) throw e;
            console.error(e)
          }
          var Fe, qe = [],
            Be = !1;

          function Ve() {
            Be = !1;
            var e = qe.slice(0);
            qe.length = 0;
            for (var t = 0; t < e.length; t++) e[t]()
          }
          if ("undefined" != typeof Promise && ee(Promise)) {
            var He = Promise.resolve();
            Fe = function () {
              He.then(Ve), G && setTimeout(T)
            }
          } else if (J || "undefined" == typeof MutationObserver || !ee(MutationObserver) && "[object MutationObserverConstructor]" !== MutationObserver.toString()) Fe = "undefined" != typeof setImmediate && ee(setImmediate) ? function () {
            setImmediate(Ve)
          } : function () {
            setTimeout(Ve, 0)
          };
          else {
            var ze = 1,
              Ke = new MutationObserver(Ve),
              We = document.createTextNode(String(ze));
            Ke.observe(We, {
              characterData: !0
            }), Fe = function () {
              ze = (ze + 1) % 2, We.data = String(ze)
            }
          }

          function Je(e, t) {
            var n;
            if (qe.push((function () {
                if (e) try {
                  e.call(t)
                } catch (e) {
                  Le(e, t, "nextTick")
                } else n && n(t)
              })), Be || (Be = !0, Fe()), !e && "undefined" != typeof Promise) return new Promise((function (e) {
              n = e
            }))
          }
          var Ge = new te;

          function Qe(e) {
            (function e(t, n) {
              var o, c, a = Array.isArray(t);
              if (!(!a && !i(t) || Object.isFrozen(t) || t instanceof ie)) {
                if (t.__ob__) {
                  var r = t.__ob__.dep.id;
                  if (n.has(r)) return;
                  n.add(r)
                }
                if (a)
                  for (o = t.length; o--;) e(t[o], n);
                else
                  for (o = (c = Object.keys(t)).length; o--;) e(t[c[o]], n)
              }
            })(e, Ge), Ge.clear()
          }
          var Ye = N((function (e) {
            var t = "&" === e.charAt(0),
              n = "~" === (e = t ? e.slice(1) : e).charAt(0),
              o = "!" === (e = n ? e.slice(1) : e).charAt(0);
            return {
              name: e = o ? e.slice(1) : e,
              once: n,
              capture: o,
              passive: t
            }
          }));

          function Ze(e, t) {
            function n() {
              var e = arguments,
                o = n.fns;
              if (!Array.isArray(o)) return Me(o, null, arguments, t, "v-on handler");
              for (var c = o.slice(), a = 0; a < c.length; a++) Me(c[a], null, e, t, "v-on handler")
            }
            return n.fns = e, n
          }

          function Xe(e, t, n, o) {
            var r = t.options.mpOptions && t.options.mpOptions.properties;
            if (c(r)) return n;
            var u = t.options.mpOptions.externalClasses || [],
              i = e.attrs,
              s = e.props;
            if (a(i) || a(s))
              for (var y in r) {
                var d = k(y);
                (et(n, s, y, d, !0) || et(n, i, y, d, !1)) && n[y] && -1 !== u.indexOf(d) && o[_(n[y])] && (n[y] = o[_(n[y])])
              }
            return n
          }

          function et(e, t, n, o, c) {
            if (a(t)) {
              if (v(t, n)) return e[n] = t[n], c || delete t[n], !0;
              if (v(t, o)) return e[n] = t[o], c || delete t[o], !0
            }
            return !1
          }

          function tt(e) {
            return u(e) ? [de(e)] : Array.isArray(e) ? function e(t, n) {
              var o, i, s, y, d = [];
              for (o = 0; o < t.length; o++) c(i = t[o]) || "boolean" == typeof i || (y = d[s = d.length - 1], Array.isArray(i) ? i.length > 0 && (nt((i = e(i, (n || "") + "_" + o))[0]) && nt(y) && (d[s] = de(y.text + i[0].text), i.shift()), d.push.apply(d, i)) : u(i) ? nt(y) ? d[s] = de(y.text + i) : "" !== i && d.push(de(i)) : nt(i) && nt(y) ? d[s] = de(y.text + i.text) : (r(t._isVList) && a(i.tag) && c(i.key) && a(n) && (i.key = "__vlist" + n + "_" + o + "__"), d.push(i)));
              return d
            }(e) : void 0
          }

          function nt(e) {
            return a(e) && a(e.text) && function (e) {
              return !1 === e
            }(e.isComment)
          }

          function ot(e) {
            var t = e.$options.provide;
            t && (e._provided = "function" == typeof t ? t.call(e) : t)
          }

          function ct(e) {
            var t = at(e.$options.inject, e);
            t && (he(!1), Object.keys(t).forEach((function (n) {
              Ne(e, n, t[n])
            })), he(!0))
          }

          function at(e, t) {
            if (e) {
              for (var n = Object.create(null), o = ne ? Reflect.ownKeys(e) : Object.keys(e), c = 0; c < o.length; c++) {
                var a = o[c];
                if ("__ob__" !== a) {
                  for (var r = e[a].from, u = t; u;) {
                    if (u._provided && v(u._provided, r)) {
                      n[a] = u._provided[r];
                      break
                    }
                    u = u.$parent
                  }
                  if (!u && "default" in e[a]) {
                    var i = e[a].default;
                    n[a] = "function" == typeof i ? i.call(t) : i
                  }
                }
              }
              return n
            }
          }

          function rt(e, t) {
            if (!e || !e.length) return {};
            for (var n = {}, o = 0, c = e.length; o < c; o++) {
              var a = e[o],
                r = a.data;
              if (r && r.attrs && r.attrs.slot && delete r.attrs.slot, a.context !== t && a.fnContext !== t || !r || null == r.slot) a.asyncMeta && a.asyncMeta.data && "page" === a.asyncMeta.data.slot ? (n.page || (n.page = [])).push(a) : (n.default || (n.default = [])).push(a);
              else {
                var u = r.slot,
                  i = n[u] || (n[u] = []);
                "template" === a.tag ? i.push.apply(i, a.children || []) : i.push(a)
              }
            }
            for (var s in n) n[s].every(ut) && delete n[s];
            return n
          }

          function ut(e) {
            return e.isComment && !e.asyncFactory || " " === e.text
          }

          function it(e, t, n) {
            var c, a = Object.keys(t).length > 0,
              r = e ? !!e.$stable : !a,
              u = e && e.$key;
            if (e) {
              if (e._normalized) return e._normalized;
              if (r && n && n !== o && u === n.$key && !a && !n.$hasNormal) return n;
              for (var i in c = {}, e) e[i] && "$" !== i[0] && (c[i] = st(t, i, e[i]))
            } else c = {};
            for (var s in t) s in c || (c[s] = yt(t, s));
            return e && Object.isExtensible(e) && (e._normalized = c), F(c, "$stable", r), F(c, "$key", u), F(c, "$hasNormal", a), c
          }

          function st(t, n, o) {
            var c = function () {
              var t = arguments.length ? o.apply(null, arguments) : o({});
              return (t = t && "object" === e(t) && !Array.isArray(t) ? [t] : tt(t)) && (0 === t.length || 1 === t.length && t[0].isComment) ? void 0 : t
            };
            return o.proxy && Object.defineProperty(t, n, {
              get: c,
              enumerable: !0,
              configurable: !0
            }), c
          }

          function yt(e, t) {
            return function () {
              return e[t]
            }
          }

          function dt(e, t) {
            var n, o, c, r, u;
            if (Array.isArray(e) || "string" == typeof e)
              for (n = new Array(e.length), o = 0, c = e.length; o < c; o++) n[o] = t(e[o], o, o, o);
            else if ("number" == typeof e)
              for (n = new Array(e), o = 0; o < e; o++) n[o] = t(o + 1, o, o, o);
            else if (i(e))
              if (ne && e[Symbol.iterator]) {
                n = [];
                for (var s = e[Symbol.iterator](), y = s.next(); !y.done;) n.push(t(y.value, n.length, o, o++)), y = s.next()
              } else
                for (r = Object.keys(e), n = new Array(r.length), o = 0, c = r.length; o < c; o++) u = r[o], n[o] = t(e[u], u, o, o);
            return a(n) || (n = []), n._isVList = !0, n
          }

          function lt(e, t, n, o) {
            var c, a = this.$scopedSlots[e];
            a ? (n = n || {}, o && (n = P(P({}, o), n)), c = a(n, this, n._i) || t) : c = this.$slots[e] || t;
            var r = n && n.slot;
            return r ? this.$createElement("template", {
              slot: r
            }, c) : c
          }

          function ft(e) {
            return Ie(this.$options, "filters", e) || j
          }

          function mt(e, t) {
            return Array.isArray(e) ? -1 === e.indexOf(t) : e !== t
          }

          function pt(e, t, n, o, c) {
            var a = U.keyCodes[t] || n;
            return c && o && !U.keyCodes[t] ? mt(c, o) : a ? mt(a, e) : o ? k(o) !== t : void 0
          }

          function ht(e, t, n, o, c) {
            if (n && i(n)) {
              var a;
              Array.isArray(n) && (n = A(n));
              var r = function (r) {
                if ("class" === r || "style" === r || h(r)) a = e;
                else {
                  var u = e.attrs && e.attrs.type;
                  a = o || U.mustUseProp(t, u, r) ? e.domProps || (e.domProps = {}) : e.attrs || (e.attrs = {})
                }
                var i = _(r),
                  s = k(r);
                i in a || s in a || (a[r] = n[r], !c) || ((e.on || (e.on = {}))["update:" + r] = function (e) {
                  n[r] = e
                })
              };
              for (var u in n) r(u)
            }
            return e
          }

          function Ct(e, t) {
            var n = this._staticTrees || (this._staticTrees = []),
              o = n[e];
            return o && !t || vt(o = n[e] = this.$options.staticRenderFns[e].call(this._renderProxy, null, this), "__static__" + e, !1), o
          }

          function gt(e, t, n) {
            return vt(e, "__once__" + t + (n ? "_" + n : ""), !0), e
          }

          function vt(e, t, n) {
            if (Array.isArray(e))
              for (var o = 0; o < e.length; o++) e[o] && "string" != typeof e[o] && Nt(e[o], t + "_" + o, n);
            else Nt(e, t, n)
          }

          function Nt(e, t, n) {
            e.isStatic = !0, e.key = t, e.isOnce = n
          }

          function bt(e, t) {
            if (t && y(t)) {
              var n = e.on = e.on ? P({}, e.on) : {};
              for (var o in t) {
                var c = n[o],
                  a = t[o];
                n[o] = c ? [].concat(c, a) : a
              }
            }
            return e
          }

          function _t(e, t, n, o) {
            t = t || {
              $stable: !n
            };
            for (var c = 0; c < e.length; c++) {
              var a = e[c];
              Array.isArray(a) ? _t(a, t, n) : a && (a.proxy && (a.fn.proxy = !0), t[a.key] = a.fn)
            }
            return o && (t.$key = o), t
          }

          function xt(e, t) {
            for (var n = 0; n < t.length; n += 2) {
              var o = t[n];
              "string" == typeof o && o && (e[t[n]] = t[n + 1])
            }
            return e
          }

          function wt(e, t) {
            return "string" == typeof e ? t + e : e
          }

          function kt(e) {
            e._o = gt, e._n = m, e._s = f, e._l = dt, e._t = lt, e._q = E, e._i = $, e._m = Ct, e._f = ft, e._k = pt, e._b = ht, e._v = de, e._e = ye, e._u = _t, e._g = bt, e._d = xt, e._p = wt
          }

          function Ot(e, t, n, c, a) {
            var u, i = this,
              s = a.options;
            v(c, "_uid") ? (u = Object.create(c))._original = c : (u = c, c = c._original);
            var y = r(s._compiled),
              d = !y;
            this.data = e, this.props = t, this.children = n, this.parent = c, this.listeners = e.on || o, this.injections = at(s.inject, c), this.slots = function () {
              return i.$slots || it(e.scopedSlots, i.$slots = rt(n, c)), i.$slots
            }, Object.defineProperty(this, "scopedSlots", {
              enumerable: !0,
              get: function () {
                return it(e.scopedSlots, this.slots())
              }
            }), y && (this.$options = s, this.$slots = this.slots(), this.$scopedSlots = it(e.scopedSlots, this.$slots)), s._scopeId ? this._c = function (e, t, n, o) {
              var a = Et(u, e, t, n, o, d);
              return a && !Array.isArray(a) && (a.fnScopeId = s._scopeId, a.fnContext = c), a
            } : this._c = function (e, t, n, o) {
              return Et(u, e, t, n, o, d)
            }
          }

          function St(e, t, n, o, c) {
            var a = function (e) {
              var t = new ie(e.tag, e.data, e.children && e.children.slice(), e.text, e.elm, e.context, e.componentOptions, e.asyncFactory);
              return t.ns = e.ns, t.isStatic = e.isStatic, t.key = e.key, t.isComment = e.isComment, t.fnContext = e.fnContext, t.fnOptions = e.fnOptions, t.fnScopeId = e.fnScopeId, t.asyncMeta = e.asyncMeta, t.isCloned = !0, t
            }(e);
            return a.fnContext = n, a.fnOptions = o, t.slot && ((a.data || (a.data = {})).slot = t.slot), a
          }

          function Pt(e, t) {
            for (var n in t) e[_(n)] = t[n]
          }
          kt(Ot.prototype);
          var At = {
              init: function (e, t) {
                if (e.componentInstance && !e.componentInstance._isDestroyed && e.data.keepAlive) {
                  var n = e;
                  At.prepatch(n, n)
                } else {
                  (e.componentInstance = function (e, t) {
                    var n = {
                        _isComponent: !0,
                        _parentVnode: e,
                        parent: t
                      },
                      o = e.data.inlineTemplate;
                    return a(o) && (n.render = o.render, n.staticRenderFns = o.staticRenderFns), new e.componentOptions.Ctor(n)
                  }(e, Bt)).$mount(t ? e.elm : void 0, t)
                }
              },
              prepatch: function (e, t) {
                var n = t.componentOptions;
                ! function (e, t, n, c, a) {
                  var r = c.data.scopedSlots,
                    u = e.$scopedSlots,
                    i = !!(r && !r.$stable || u !== o && !u.$stable || r && e.$scopedSlots.$key !== r.$key),
                    s = !!(a || e.$options._renderChildren || i);
                  if (e.$options._parentVnode = c, e.$vnode = c, e._vnode && (e._vnode.parent = c), e.$options._renderChildren = a, e.$attrs = c.data.attrs || o, e.$listeners = n || o, t && e.$options.props) {
                    he(!1);
                    for (var y = e._props, d = e.$options._propKeys || [], l = 0; l < d.length; l++) {
                      var f = d[l],
                        m = e.$options.props;
                      y[f] = je(f, m, t, e)
                    }
                    he(!0), e.$options.propsData = t
                  }
                  e._$updateProperties && e._$updateProperties(e), n = n || o;
                  var p = e.$options._parentListeners;
                  e.$options._parentListeners = n, qt(e, n, p), s && (e.$slots = rt(a, c.context), e.$forceUpdate())
                }(t.componentInstance = e.componentInstance, n.propsData, n.listeners, t, n.children)
              },
              insert: function (e) {
                var t = e.context,
                  n = e.componentInstance;
                n._isMounted || (zt(n, "onServiceCreated"), zt(n, "onServiceAttached"), n._isMounted = !0, zt(n, "mounted")), e.data.keepAlive && (t._isMounted ? function (e) {
                  e._inactive = !1, Wt.push(e)
                }(n) : Ht(n, !0))
              },
              destroy: function (e) {
                var t = e.componentInstance;
                t._isDestroyed || (e.data.keepAlive ? function e(t, n) {
                  if (!(n && (t._directInactive = !0, Vt(t)) || t._inactive)) {
                    t._inactive = !0;
                    for (var o = 0; o < t.$children.length; o++) e(t.$children[o]);
                    zt(t, "deactivated")
                  }
                }(t, !0) : t.$destroy())
              }
            },
            Tt = Object.keys(At);

          function It(e, t, n, u, s) {
            if (!c(e)) {
              var y = n.$options._base;
              if (i(e) && (e = y.extend(e)), "function" == typeof e) {
                var d;
                if (c(e.cid) && void 0 === (e = function (e, t) {
                    if (r(e.error) && a(e.errorComp)) return e.errorComp;
                    if (a(e.resolved)) return e.resolved;
                    var n = Dt;
                    if (n && a(e.owners) && -1 === e.owners.indexOf(n) && e.owners.push(n), r(e.loading) && a(e.loadingComp)) return e.loadingComp;
                    if (n && !a(e.owners)) {
                      var o = e.owners = [n],
                        u = !0,
                        s = null,
                        y = null;
                      n.$on("hook:destroyed", (function () {
                        return C(o, n)
                      }));
                      var d = function (e) {
                          for (var t = 0, n = o.length; t < n; t++) o[t].$forceUpdate();
                          e && (o.length = 0, null !== s && (clearTimeout(s), s = null), null !== y && (clearTimeout(y), y = null))
                        },
                        f = D((function (n) {
                          e.resolved = Lt(n, t), u ? o.length = 0 : d(!0)
                        })),
                        m = D((function (t) {
                          a(e.errorComp) && (e.error = !0, d(!0))
                        })),
                        p = e(f, m);
                      return i(p) && (l(p) ? c(e.resolved) && p.then(f, m) : l(p.component) && (p.component.then(f, m), a(p.error) && (e.errorComp = Lt(p.error, t)), a(p.loading) && (e.loadingComp = Lt(p.loading, t), 0 === p.delay ? e.loading = !0 : s = setTimeout((function () {
                        s = null, c(e.resolved) && c(e.error) && (e.loading = !0, d(!1))
                      }), p.delay || 200)), a(p.timeout) && (y = setTimeout((function () {
                        y = null, c(e.resolved) && m(null)
                      }), p.timeout)))), u = !1, e.loading ? e.loadingComp : e.resolved
                    }
                  }(d = e, y))) return function (e, t, n, o, c) {
                  var a = ye();
                  return a.asyncFactory = e, a.asyncMeta = {
                    data: t,
                    context: n,
                    children: o,
                    tag: c
                  }, a
                }(d, t, n, u, s);
                t = t || {}, ln(e), a(t.model) && function (e, t) {
                  var n = e.model && e.model.prop || "value",
                    o = e.model && e.model.event || "input";
                  (t.attrs || (t.attrs = {}))[n] = t.model.value;
                  var c = t.on || (t.on = {}),
                    r = c[o],
                    u = t.model.callback;
                  a(r) ? (Array.isArray(r) ? -1 === r.indexOf(u) : r !== u) && (c[o] = [u].concat(r)) : c[o] = u
                }(e.options, t);
                var f = function (e, t, n, o) {
                  var r = t.options.props;
                  if (c(r)) return Xe(e, t, {}, o);
                  var u = {},
                    i = e.attrs,
                    s = e.props;
                  if (a(i) || a(s))
                    for (var y in r) {
                      var d = k(y);
                      et(u, s, y, d, !0) || et(u, i, y, d, !1)
                    }
                  return Xe(e, t, u, o)
                }(t, e, 0, n);
                if (r(e.options.functional)) return function (e, t, n, c, r) {
                  var u = e.options,
                    i = {},
                    s = u.props;
                  if (a(s))
                    for (var y in s) i[y] = je(y, s, t || o);
                  else a(n.attrs) && Pt(i, n.attrs), a(n.props) && Pt(i, n.props);
                  var d = new Ot(n, i, r, c, e),
                    l = u.render.call(null, d._c, d);
                  if (l instanceof ie) return St(l, n, d.parent, u);
                  if (Array.isArray(l)) {
                    for (var f = tt(l) || [], m = new Array(f.length), p = 0; p < f.length; p++) m[p] = St(f[p], n, d.parent, u);
                    return m
                  }
                }(e, f, t, n, u);
                var m = t.on;
                if (t.on = t.nativeOn, r(e.options.abstract)) {
                  var p = t.slot;
                  t = {}, p && (t.slot = p)
                }! function (e) {
                  for (var t = e.hook || (e.hook = {}), n = 0; n < Tt.length; n++) {
                    var o = Tt[n],
                      c = t[o],
                      a = At[o];
                    c === a || c && c._merged || (t[o] = c ? jt(a, c) : a)
                  }
                }(t);
                var h = e.options.name || s;
                return new ie("vue-component-" + e.cid + (h ? "-" + h : ""), t, void 0, void 0, void 0, n, {
                  Ctor: e,
                  propsData: f,
                  listeners: m,
                  tag: s,
                  children: u
                }, d)
              }
            }
          }

          function jt(e, t) {
            var n = function (n, o) {
              e(n, o), t(n, o)
            };
            return n._merged = !0, n
          }

          function Et(e, t, n, o, s, y) {
            return (Array.isArray(n) || u(n)) && (s = o, o = n, n = void 0), r(y) && (s = 2),
              function (e, t, n, o, u) {
                if (a(n) && a(n.__ob__)) return ye();
                if (a(n) && a(n.is) && (t = n.is), !t) return ye();
                var s, y, d;
                (Array.isArray(o) && "function" == typeof o[0] && ((n = n || {}).scopedSlots = {
                  default: o[0]
                }, o.length = 0), 2 === u ? o = tt(o) : 1 === u && (o = function (e) {
                  for (var t = 0; t < e.length; t++)
                    if (Array.isArray(e[t])) return Array.prototype.concat.apply([], e);
                  return e
                }(o)), "string" == typeof t) ? (y = e.$vnode && e.$vnode.ns || U.getTagNamespace(t), s = U.isReservedTag(t) ? new ie(U.parsePlatformTagName(t), n, o, void 0, void 0, e) : n && n.pre || !a(d = Ie(e.$options, "components", t)) ? new ie(t, n, o, void 0, void 0, e) : It(d, n, e, o, t)) : s = It(t, n, e, o);
                return Array.isArray(s) ? s : a(s) ? (a(y) && function e(t, n, o) {
                  if (t.ns = n, "foreignObject" === t.tag && (n = void 0, o = !0), a(t.children))
                    for (var u = 0, i = t.children.length; u < i; u++) {
                      var s = t.children[u];
                      a(s.tag) && (c(s.ns) || r(o) && "svg" !== s.tag) && e(s, n, o)
                    }
                }(s, y), a(n) && function (e) {
                  i(e.style) && Qe(e.style), i(e.class) && Qe(e.class)
                }(n), s) : ye()
              }(e, t, n, o, s)
          }
          var $t, Dt = null;

          function Lt(e, t) {
            return (e.__esModule || ne && "Module" === e[Symbol.toStringTag]) && (e = e.default), i(e) ? t.extend(e) : e
          }

          function Mt(e) {
            return e.isComment && e.asyncFactory
          }

          function Ut(e, t) {
            $t.$on(e, t)
          }

          function Rt(e, t) {
            $t.$off(e, t)
          }

          function Ft(e, t) {
            var n = $t;
            return function o() {
              var c = t.apply(null, arguments);
              null !== c && n.$off(e, o)
            }
          }

          function qt(e, t, n) {
            $t = e,
              function (e, t, n, o, a, u) {
                var i, s, y, d;
                for (i in e) s = e[i], y = t[i], d = Ye(i), c(s) || (c(y) ? (c(s.fns) && (s = e[i] = Ze(s, u)), r(d.once) && (s = e[i] = a(d.name, s, d.capture)), n(d.name, s, d.capture, d.passive, d.params)) : s !== y && (y.fns = s, e[i] = y));
                for (i in t) c(e[i]) && o((d = Ye(i)).name, t[i], d.capture)
              }(t, n || {}, Ut, Rt, Ft, e), $t = void 0
          }
          var Bt = null;

          function Vt(e) {
            for (; e && (e = e.$parent);)
              if (e._inactive) return !0;
            return !1
          }

          function Ht(e, t) {
            if (t) {
              if (e._directInactive = !1, Vt(e)) return
            } else if (e._directInactive) return;
            if (e._inactive || null === e._inactive) {
              e._inactive = !1;
              for (var n = 0; n < e.$children.length; n++) Ht(e.$children[n]);
              zt(e, "activated")
            }
          }

          function zt(e, t) {
            re();
            var n = e.$options[t],
              o = t + " hook";
            if (n)
              for (var c = 0, a = n.length; c < a; c++) Me(n[c], e, null, e, o);
            e._hasHookEvent && e.$emit("hook:" + t), ue()
          }
          var Kt = [],
            Wt = [],
            Jt = {},
            Gt = !1,
            Qt = !1,
            Yt = 0,
            Zt = Date.now;
          if (H && !J) {
            var Xt = window.performance;
            Xt && "function" == typeof Xt.now && Zt() > document.createEvent("Event").timeStamp && (Zt = function () {
              return Xt.now()
            })
          }

          function en() {
            var e, t;
            for (Zt(), Qt = !0, Kt.sort((function (e, t) {
                return e.id - t.id
              })), Yt = 0; Yt < Kt.length; Yt++)(e = Kt[Yt]).before && e.before(), t = e.id, Jt[t] = null, e.run();
            var n = Wt.slice(),
              o = Kt.slice();
            Yt = Kt.length = Wt.length = 0, Jt = {}, Gt = Qt = !1,
              function (e) {
                for (var t = 0; t < e.length; t++) e[t]._inactive = !0, Ht(e[t], !0)
              }(n),
              function (e) {
                for (var t = e.length; t--;) {
                  var n = e[t],
                    o = n.vm;
                  o._watcher === n && o._isMounted && !o._isDestroyed && zt(o, "updated")
                }
              }(o), X && U.devtools && X.emit("flush")
          }
          var tn = 0,
            nn = function (e, t, n, o, c) {
              this.vm = e, c && (e._watcher = this), e._watchers.push(this), o ? (this.deep = !!o.deep, this.user = !!o.user, this.lazy = !!o.lazy, this.sync = !!o.sync, this.before = o.before) : this.deep = this.user = this.lazy = this.sync = !1, this.cb = n, this.id = ++tn, this.active = !0, this.dirty = this.lazy, this.deps = [], this.newDeps = [], this.depIds = new te, this.newDepIds = new te, this.expression = "", "function" == typeof t ? this.getter = t : (this.getter = function (e) {
                if (!B.test(e)) {
                  var t = e.split(".");
                  return function (e) {
                    for (var n = 0; n < t.length; n++) {
                      if (!e) return;
                      e = e[t[n]]
                    }
                    return e
                  }
                }
              }(t), this.getter || (this.getter = T)), this.value = this.lazy ? void 0 : this.get()
            };
          nn.prototype.get = function () {
            var e;
            re(this);
            var t = this.vm;
            try {
              e = this.getter.call(t, t)
            } catch (e) {
              if (!this.user) throw e;
              Le(e, t, 'getter for watcher "' + this.expression + '"')
            } finally {
              this.deep && Qe(e), ue(), this.cleanupDeps()
            }
            return e
          }, nn.prototype.addDep = function (e) {
            var t = e.id;
            this.newDepIds.has(t) || (this.newDepIds.add(t), this.newDeps.push(e), this.depIds.has(t) || e.addSub(this))
          }, nn.prototype.cleanupDeps = function () {
            for (var e = this.deps.length; e--;) {
              var t = this.deps[e];
              this.newDepIds.has(t.id) || t.removeSub(this)
            }
            var n = this.depIds;
            this.depIds = this.newDepIds, this.newDepIds = n, this.newDepIds.clear(), n = this.deps, this.deps = this.newDeps, this.newDeps = n, this.newDeps.length = 0
          }, nn.prototype.update = function () {
            this.lazy ? this.dirty = !0 : this.sync ? this.run() : function (e) {
              var t = e.id;
              if (null == Jt[t]) {
                if (Jt[t] = !0, Qt) {
                  for (var n = Kt.length - 1; n > Yt && Kt[n].id > e.id;) n--;
                  Kt.splice(n + 1, 0, e)
                } else Kt.push(e);
                Gt || (Gt = !0, Je(en))
              }
            }(this)
          }, nn.prototype.run = function () {
            if (this.active) {
              var e = this.get();
              if (e !== this.value || i(e) || this.deep) {
                var t = this.value;
                if (this.value = e, this.user) try {
                  this.cb.call(this.vm, e, t)
                } catch (e) {
                  Le(e, this.vm, 'callback for watcher "' + this.expression + '"')
                } else this.cb.call(this.vm, e, t)
              }
            }
          }, nn.prototype.evaluate = function () {
            this.value = this.get(), this.dirty = !1
          }, nn.prototype.depend = function () {
            for (var e = this.deps.length; e--;) this.deps[e].depend()
          }, nn.prototype.teardown = function () {
            if (this.active) {
              this.vm._isBeingDestroyed || C(this.vm._watchers, this);
              for (var e = this.deps.length; e--;) this.deps[e].removeSub(this);
              this.active = !1
            }
          };
          var on = {
            enumerable: !0,
            configurable: !0,
            get: T,
            set: T
          };

          function cn(e, t, n) {
            on.get = function () {
              return this[t][n]
            }, on.set = function (e) {
              this[t][n] = e
            }, Object.defineProperty(e, n, on)
          }
          var an = {
            lazy: !0
          };

          function rn(e, t, n) {
            var o = !Z();
            "function" == typeof n ? (on.get = o ? un(t) : sn(n), on.set = T) : (on.get = n.get ? o && !1 !== n.cache ? un(t) : sn(n.get) : T, on.set = n.set || T), Object.defineProperty(e, t, on)
          }

          function un(e) {
            return function () {
              var t = this._computedWatchers && this._computedWatchers[e];
              if (t) return t.dirty && t.evaluate(), ae.SharedObject.target && t.depend(), t.value
            }
          }

          function sn(e) {
            return function () {
              return e.call(this, this)
            }
          }

          function yn(e, t, n, o) {
            return y(n) && (o = n, n = n.handler), "string" == typeof n && (n = e[n]), e.$watch(t, n, o)
          }
          var dn = 0;

          function ln(e) {
            var t = e.options;
            if (e.super) {
              var n = ln(e.super);
              if (n !== e.superOptions) {
                e.superOptions = n;
                var o = function (e) {
                  var t, n = e.options,
                    o = e.sealedOptions;
                  for (var c in n) n[c] !== o[c] && (t || (t = {}), t[c] = n[c]);
                  return t
                }(e);
                o && P(e.extendOptions, o), (t = e.options = Te(n, e.extendOptions)).name && (t.components[t.name] = e)
              }
            }
            return t
          }

          function fn(e) {
            this._init(e)
          }

          function mn(e) {
            return e && (e.Ctor.options.name || e.tag)
          }

          function pn(e, t) {
            return Array.isArray(e) ? e.indexOf(t) > -1 : "string" == typeof e ? e.split(",").indexOf(t) > -1 : !! function (e) {
              return "[object RegExp]" === s.call(e)
            }(e) && e.test(t)
          }

          function hn(e, t) {
            var n = e.cache,
              o = e.keys,
              c = e._vnode;
            for (var a in n) {
              var r = n[a];
              if (r) {
                var u = mn(r.componentOptions);
                u && !t(u) && Cn(n, a, o, c)
              }
            }
          }

          function Cn(e, t, n, o) {
            var c = e[t];
            !c || o && c.tag === o.tag || c.componentInstance.$destroy(), e[t] = null, C(n, t)
          }(function (e) {
            e.prototype._init = function (e) {
              var t = this;
              t._uid = dn++, t._isVue = !0, e && e._isComponent ? function (e, t) {
                  var n = e.$options = Object.create(e.constructor.options),
                    o = t._parentVnode;
                  n.parent = t.parent, n._parentVnode = o;
                  var c = o.componentOptions;
                  n.propsData = c.propsData, n._parentListeners = c.listeners, n._renderChildren = c.children, n._componentTag = c.tag, t.render && (n.render = t.render, n.staticRenderFns = t.staticRenderFns)
                }(t, e) : t.$options = Te(ln(t.constructor), e || {}, t), t._renderProxy = t, t._self = t,
                function (e) {
                  var t = e.$options,
                    n = t.parent;
                  if (n && !t.abstract) {
                    for (; n.$options.abstract && n.$parent;) n = n.$parent;
                    n.$children.push(e)
                  }
                  e.$parent = n, e.$root = n ? n.$root : e, e.$children = [], e.$refs = {}, e._watcher = null, e._inactive = null, e._directInactive = !1, e._isMounted = !1, e._isDestroyed = !1, e._isBeingDestroyed = !1
                }(t),
                function (e) {
                  e._events = Object.create(null), e._hasHookEvent = !1;
                  var t = e.$options._parentListeners;
                  t && qt(e, t)
                }(t),
                function (e) {
                  e._vnode = null, e._staticTrees = null;
                  var t = e.$options,
                    n = e.$vnode = t._parentVnode,
                    c = n && n.context;
                  e.$slots = rt(t._renderChildren, c), e.$scopedSlots = o, e._c = function (t, n, o, c) {
                    return Et(e, t, n, o, c, !1)
                  }, e.$createElement = function (t, n, o, c) {
                    return Et(e, t, n, o, c, !0)
                  };
                  var a = n && n.data;
                  Ne(e, "$attrs", a && a.attrs || o, null, !0), Ne(e, "$listeners", t._parentListeners || o, null, !0)
                }(t), zt(t, "beforeCreate"), !t._$fallback && ct(t),
                function (e) {
                  e._watchers = [];
                  var t = e.$options;
                  t.props && function (e, t) {
                    var n = e.$options.propsData || {},
                      o = e._props = {},
                      c = e.$options._propKeys = [];
                    !e.$parent || he(!1);
                    var a = function (a) {
                      c.push(a);
                      var r = je(a, t, n, e);
                      Ne(o, a, r), a in e || cn(e, "_props", a)
                    };
                    for (var r in t) a(r);
                    he(!0)
                  }(e, t.props), t.methods && function (e, t) {
                    for (var n in e.$options.props, t) e[n] = "function" != typeof t[n] ? T : O(t[n], e)
                  }(e, t.methods), t.data ? function (e) {
                    var t = e.$options.data;
                    y(t = e._data = "function" == typeof t ? function (e, t) {
                      re();
                      try {
                        return e.call(t, t)
                      } catch (e) {
                        return Le(e, t, "data()"), {}
                      } finally {
                        ue()
                      }
                    }(t, e) : t || {}) || (t = {});
                    for (var n = Object.keys(t), o = e.$options.props, c = (e.$options.methods, n.length); c--;) {
                      var a = n[c];
                      o && v(o, a) || R(a) || cn(e, "_data", a)
                    }
                    ve(t, !0)
                  }(e) : ve(e._data = {}, !0), t.computed && function (e, t) {
                    var n = e._computedWatchers = Object.create(null),
                      o = Z();
                    for (var c in t) {
                      var a = t[c],
                        r = "function" == typeof a ? a : a.get;
                      o || (n[c] = new nn(e, r || T, T, an)), c in e || rn(e, c, a)
                    }
                  }(e, t.computed), t.watch && t.watch !== Q && function (e, t) {
                    for (var n in t) {
                      var o = t[n];
                      if (Array.isArray(o))
                        for (var c = 0; c < o.length; c++) yn(e, n, o[c]);
                      else yn(e, n, o)
                    }
                  }(e, t.watch)
                }(t), !t._$fallback && ot(t), !t._$fallback && zt(t, "created"), t.$options.el && t.$mount(t.$options.el)
            }
          })(fn),
          function (e) {
            Object.defineProperty(e.prototype, "$data", {
              get: function () {
                return this._data
              }
            }), Object.defineProperty(e.prototype, "$props", {
              get: function () {
                return this._props
              }
            }), e.prototype.$set = be, e.prototype.$delete = _e, e.prototype.$watch = function (e, t, n) {
              if (y(t)) return yn(this, e, t, n);
              (n = n || {}).user = !0;
              var o = new nn(this, e, t, n);
              if (n.immediate) try {
                t.call(this, o.value)
              } catch (e) {
                Le(e, this, 'callback for immediate watcher "' + o.expression + '"')
              }
              return function () {
                o.teardown()
              }
            }
          }(fn),
          function (e) {
            var t = /^hook:/;
            e.prototype.$on = function (e, n) {
              var o = this;
              if (Array.isArray(e))
                for (var c = 0, a = e.length; c < a; c++) o.$on(e[c], n);
              else(o._events[e] || (o._events[e] = [])).push(n), t.test(e) && (o._hasHookEvent = !0);
              return o
            }, e.prototype.$once = function (e, t) {
              var n = this;

              function o() {
                n.$off(e, o), t.apply(n, arguments)
              }
              return o.fn = t, n.$on(e, o), n
            }, e.prototype.$off = function (e, t) {
              var n = this;
              if (!arguments.length) return n._events = Object.create(null), n;
              if (Array.isArray(e)) {
                for (var o = 0, c = e.length; o < c; o++) n.$off(e[o], t);
                return n
              }
              var a, r = n._events[e];
              if (!r) return n;
              if (!t) return n._events[e] = null, n;
              for (var u = r.length; u--;)
                if ((a = r[u]) === t || a.fn === t) {
                  r.splice(u, 1);
                  break
                } return n
            }, e.prototype.$emit = function (e) {
              var t = this,
                n = t._events[e];
              if (n) {
                n = n.length > 1 ? S(n) : n;
                for (var o = S(arguments, 1), c = 'event handler for "' + e + '"', a = 0, r = n.length; a < r; a++) Me(n[a], t, o, t, c)
              }
              return t
            }
          }(fn),
          function (e) {
            e.prototype._update = function (e, t) {
              var n = this,
                o = n.$el,
                c = n._vnode,
                a = function (e) {
                  var t = Bt;
                  return Bt = e,
                    function () {
                      Bt = t
                    }
                }(n);
              n._vnode = e, n.$el = c ? n.__patch__(c, e) : n.__patch__(n.$el, e, t, !1), a(), o && (o.__vue__ = null), n.$el && (n.$el.__vue__ = n), n.$vnode && n.$parent && n.$vnode === n.$parent._vnode && (n.$parent.$el = n.$el)
            }, e.prototype.$forceUpdate = function () {
              this._watcher && this._watcher.update()
            }, e.prototype.$destroy = function () {
              var e = this;
              if (!e._isBeingDestroyed) {
                zt(e, "beforeDestroy"), e._isBeingDestroyed = !0;
                var t = e.$parent;
                !t || t._isBeingDestroyed || e.$options.abstract || C(t.$children, e), e._watcher && e._watcher.teardown();
                for (var n = e._watchers.length; n--;) e._watchers[n].teardown();
                e._data.__ob__ && e._data.__ob__.vmCount--, e._isDestroyed = !0, e.__patch__(e._vnode, null), zt(e, "destroyed"), e.$off(), e.$el && (e.$el.__vue__ = null), e.$vnode && (e.$vnode.parent = null)
              }
            }
          }(fn),
          function (e) {
            kt(e.prototype), e.prototype.$nextTick = function (e) {
              return Je(e, this)
            }, e.prototype._render = function () {
              var e, t = this,
                n = t.$options,
                o = n.render,
                c = n._parentVnode;
              c && (t.$scopedSlots = it(c.data.scopedSlots, t.$slots, t.$scopedSlots)), t.$vnode = c;
              try {
                Dt = t, e = o.call(t._renderProxy, t.$createElement)
              } catch (n) {
                Le(n, t, "render"), e = t._vnode
              } finally {
                Dt = null
              }
              return Array.isArray(e) && 1 === e.length && (e = e[0]), e instanceof ie || (e = ye()), e.parent = c, e
            }
          }(fn);
          var gn = [String, RegExp, Array],
            vn = {
              KeepAlive: {
                name: "keep-alive",
                abstract: !0,
                props: {
                  include: gn,
                  exclude: gn,
                  max: [String, Number]
                },
                created: function () {
                  this.cache = Object.create(null), this.keys = []
                },
                destroyed: function () {
                  for (var e in this.cache) Cn(this.cache, e, this.keys)
                },
                mounted: function () {
                  var e = this;
                  this.$watch("include", (function (t) {
                    hn(e, (function (e) {
                      return pn(t, e)
                    }))
                  })), this.$watch("exclude", (function (t) {
                    hn(e, (function (e) {
                      return !pn(t, e)
                    }))
                  }))
                },
                render: function () {
                  var e = this.$slots.default,
                    t = function (e) {
                      if (Array.isArray(e))
                        for (var t = 0; t < e.length; t++) {
                          var n = e[t];
                          if (a(n) && (a(n.componentOptions) || Mt(n))) return n
                        }
                    }(e),
                    n = t && t.componentOptions;
                  if (n) {
                    var o = mn(n),
                      c = this.include,
                      r = this.exclude;
                    if (c && (!o || !pn(c, o)) || r && o && pn(r, o)) return t;
                    var u = this.cache,
                      i = this.keys,
                      s = null == t.key ? n.Ctor.cid + (n.tag ? "::" + n.tag : "") : t.key;
                    u[s] ? (t.componentInstance = u[s].componentInstance, C(i, s), i.push(s)) : (u[s] = t, i.push(s), this.max && i.length > parseInt(this.max) && Cn(u, i[0], i, this._vnode)), t.data.keepAlive = !0
                  }
                  return t || e && e[0]
                }
              }
            };
          (function (e) {
            var t = {
              get: function () {
                return U
              }
            };
            Object.defineProperty(e, "config", t), e.util = {
                warn: oe,
                extend: P,
                mergeOptions: Te,
                defineReactive: Ne
              }, e.set = be, e.delete = _e, e.nextTick = Je, e.observable = function (e) {
                return ve(e), e
              }, e.options = Object.create(null), L.forEach((function (t) {
                e.options[t + "s"] = Object.create(null)
              })), e.options._base = e, P(e.options.components, vn),
              function (e) {
                e.use = function (e) {
                  var t = this._installedPlugins || (this._installedPlugins = []);
                  if (t.indexOf(e) > -1) return this;
                  var n = S(arguments, 1);
                  return n.unshift(this), "function" == typeof e.install ? e.install.apply(e, n) : "function" == typeof e && e.apply(null, n), t.push(e), this
                }
              }(e),
              function (e) {
                e.mixin = function (e) {
                  return this.options = Te(this.options, e), this
                }
              }(e),
              function (e) {
                e.cid = 0;
                var t = 1;
                e.extend = function (e) {
                  e = e || {};
                  var n = this,
                    o = n.cid,
                    c = e._Ctor || (e._Ctor = {});
                  if (c[o]) return c[o];
                  var a = e.name || n.options.name,
                    r = function (e) {
                      this._init(e)
                    };
                  return (r.prototype = Object.create(n.prototype)).constructor = r, r.cid = t++, r.options = Te(n.options, e), r.super = n, r.options.props && function (e) {
                    var t = e.options.props;
                    for (var n in t) cn(e.prototype, "_props", n)
                  }(r), r.options.computed && function (e) {
                    var t = e.options.computed;
                    for (var n in t) rn(e.prototype, n, t[n])
                  }(r), r.extend = n.extend, r.mixin = n.mixin, r.use = n.use, L.forEach((function (e) {
                    r[e] = n[e]
                  })), a && (r.options.components[a] = r), r.superOptions = n.options, r.extendOptions = e, r.sealedOptions = P({}, r.options), c[o] = r, r
                }
              }(e),
              function (e) {
                L.forEach((function (t) {
                  e[t] = function (e, n) {
                    return n ? ("component" === t && y(n) && (n.name = n.name || e, n = this.options._base.extend(n)), "directive" === t && "function" == typeof n && (n = {
                      bind: n,
                      update: n
                    }), this.options[t + "s"][e] = n, n) : this.options[t + "s"][e]
                  }
                }))
              }(e)
          })(fn), Object.defineProperty(fn.prototype, "$isServer", {
            get: Z
          }), Object.defineProperty(fn.prototype, "$ssrContext", {
            get: function () {
              return this.$vnode && this.$vnode.ssrContext
            }
          }), Object.defineProperty(fn, "FunctionalRenderContext", {
            value: Ot
          }), fn.version = "2.6.11";
          var Nn = "[object Array]",
            bn = "[object Object]";

          function _n(e, t, n) {
            e[t] = n
          }

          function xn(e) {
            return Object.prototype.toString.call(e)
          }

          function wn(e) {
            if (e.__next_tick_callbacks && e.__next_tick_callbacks.length) {
              if (Object({
                  NODE_ENV: "production",
                  VUE_APP_DARK_MODE: "false",
                  VUE_APP_NAME: "consult-visitor-front",
                  VUE_APP_PLATFORM: "mp-weixin",
                  BASE_URL: "/"
                }).VUE_APP_DEBUG) {
                var t = e.$scope;
                console.log("[" + +new Date + "][" + (t.is || t.route) + "][" + e._uid + "]:flushCallbacks[" + e.__next_tick_callbacks.length + "]")
              }
              var n = e.__next_tick_callbacks.slice(0);
              e.__next_tick_callbacks.length = 0;
              for (var o = 0; o < n.length; o++) n[o]()
            }
          }

          function kn(e, t) {
            return t && (t._isVue || t.__v_isMPComponent) ? {} : t
          }

          function On() {}
          var Sn = N((function (e) {
              var t = {},
                n = /:(.+)/;
              return e.split(/;(?![^(]*\))/g).forEach((function (e) {
                if (e) {
                  var o = e.split(n);
                  o.length > 1 && (t[o[0].trim()] = o[1].trim())
                }
              })), t
            })),
            Pn = ["createSelectorQuery", "createIntersectionObserver", "selectAllComponents", "selectComponent"],
            An = ["onLaunch", "onShow", "onHide", "onUniNViewMessage", "onPageNotFound", "onThemeChange", "onError", "onUnhandledRejection", "onInit", "onLoad", "onReady", "onUnload", "onPullDownRefresh", "onReachBottom", "onTabItemTap", "onAddToFavorites", "onShareTimeline", "onShareAppMessage", "onResize", "onPageScroll", "onNavigationBarButtonTap", "onBackPress", "onNavigationBarSearchInputChanged", "onNavigationBarSearchInputConfirmed", "onNavigationBarSearchInputClicked", "onUploadDouyinVideo", "onNFCReadMessage", "onPageShow", "onPageHide", "onPageResize"];
          fn.prototype.__patch__ = function (e, t) {
              var n = this;
              if (null !== t && ("page" === this.mpType || "component" === this.mpType)) {
                var o = this.$scope,
                  c = Object.create(null);
                try {
                  c = function (e) {
                    var t = Object.create(null);
                    [].concat(Object.keys(e._data || {}), Object.keys(e._computedWatchers || {})).reduce((function (t, n) {
                      return t[n] = e[n], t
                    }), t);
                    var n = e.__composition_api_state__ || e.__secret_vfa_state__,
                      o = n && n.rawBindings;
                    return o && Object.keys(o).forEach((function (n) {
                      t[n] = e[n]
                    })), Object.assign(t, e.$mp.data || {}), Array.isArray(e.$options.behaviors) && -1 !== e.$options.behaviors.indexOf("uni://form-field") && (t.name = e.name, t.value = e.value), JSON.parse(JSON.stringify(t, kn))
                  }(this)
                } catch (e) {
                  console.error(e)
                }
                c.__webviewId__ = o.data.__webviewId__;
                var a = Object.create(null);
                Object.keys(c).forEach((function (e) {
                  a[e] = o.data[e]
                }));
                var r = !1 === this.$shouldDiffData ? c : function (e, t) {
                  var n = {};
                  return function e(t, n) {
                      if (t !== n) {
                        var o = xn(t),
                          c = xn(n);
                        if (o == bn && c == bn) {
                          if (Object.keys(t).length >= Object.keys(n).length)
                            for (var a in n) {
                              var r = t[a];
                              void 0 === r ? t[a] = null : e(r, n[a])
                            }
                        } else o == Nn && c == Nn && t.length >= n.length && n.forEach((function (n, o) {
                          e(t[o], n)
                        }))
                      }
                    }(e, t),
                    function e(t, n, o, c) {
                      if (t !== n) {
                        var a = xn(t),
                          r = xn(n);
                        if (a == bn)
                          if (r != bn || Object.keys(t).length < Object.keys(n).length) _n(c, o, t);
                          else {
                            var u = function (a) {
                              var r = t[a],
                                u = n[a],
                                i = xn(r),
                                s = xn(u);
                              if (i != Nn && i != bn) r !== n[a] && function (e, t) {
                                return "[object Null]" !== e && "[object Undefined]" !== e || "[object Null]" !== t && "[object Undefined]" !== t
                              }(i, s) && _n(c, ("" == o ? "" : o + ".") + a, r);
                              else if (i == Nn) s != Nn || r.length < u.length ? _n(c, ("" == o ? "" : o + ".") + a, r) : r.forEach((function (t, n) {
                                e(t, u[n], ("" == o ? "" : o + ".") + a + "[" + n + "]", c)
                              }));
                              else if (i == bn)
                                if (s != bn || Object.keys(r).length < Object.keys(u).length) _n(c, ("" == o ? "" : o + ".") + a, r);
                                else
                                  for (var y in r) e(r[y], u[y], ("" == o ? "" : o + ".") + a + "." + y, c)
                            };
                            for (var i in t) u(i)
                          }
                        else a == Nn ? r != Nn || t.length < n.length ? _n(c, o, t) : t.forEach((function (t, a) {
                          e(t, n[a], o + "[" + a + "]", c)
                        })) : _n(c, o, t)
                      }
                    }(e, t, "", n), n
                }(c, a);
                Object.keys(r).length ? (Object({
                  NODE_ENV: "production",
                  VUE_APP_DARK_MODE: "false",
                  VUE_APP_NAME: "consult-visitor-front",
                  VUE_APP_PLATFORM: "mp-weixin",
                  BASE_URL: "/"
                }).VUE_APP_DEBUG && console.log("[" + +new Date + "][" + (o.is || o.route) + "][" + this._uid + "]差量更新", JSON.stringify(r)), this.__next_tick_pending = !0, o.setData(r, (function () {
                  n.__next_tick_pending = !1, wn(n)
                }))) : wn(this)
              }
            }, fn.prototype.$mount = function (e, t) {
              return function (e, t, n) {
                return e.mpType ? ("app" === e.mpType && (e.$options.render = On), e.$options.render || (e.$options.render = On), !e._$fallback && zt(e, "beforeMount"), new nn(e, (function () {
                  e._update(e._render(), n)
                }), T, {
                  before: function () {
                    e._isMounted && !e._isDestroyed && zt(e, "beforeUpdate")
                  }
                }, !0), n = !1, e) : e
              }(this, 0, t)
            },
            function (e) {
              var t = e.extend;
              e.extend = function (e) {
                var n = (e = e || {}).methods;
                return n && Object.keys(n).forEach((function (t) {
                  -1 !== An.indexOf(t) && (e[t] = n[t], delete n[t])
                })), t.call(this, e)
              };
              var n = e.config.optionMergeStrategies,
                o = n.created;
              An.forEach((function (e) {
                n[e] = o
              })), e.prototype.__lifecycle_hooks__ = An
            }(fn),
            function (e) {
              e.config.errorHandler = function (t, n, o) {
                e.util.warn("Error in " + o + ': "' + t.toString() + '"', n), console.error(t);
                var c = "function" == typeof getApp && getApp();
                c && c.onError && c.onError(t)
              };
              var t = e.prototype.$emit;
              e.prototype.$emit = function (e) {
                if (this.$scope && e) {
                  var n = this.$scope._triggerEvent || this.$scope.triggerEvent;
                  if (n) try {
                    n.call(this.$scope, e, {
                      __args__: S(arguments, 1)
                    })
                  } catch (e) {}
                }
                return t.apply(this, arguments)
              }, e.prototype.$nextTick = function (e) {
                return function (e, t) {
                  if (!e.__next_tick_pending && ! function (e) {
                      return Kt.find((function (t) {
                        return e._watcher === t
                      }))
                    }(e)) {
                    if (Object({
                        NODE_ENV: "production",
                        VUE_APP_DARK_MODE: "false",
                        VUE_APP_NAME: "consult-visitor-front",
                        VUE_APP_PLATFORM: "mp-weixin",
                        BASE_URL: "/"
                      }).VUE_APP_DEBUG) {
                      var n = e.$scope;
                      console.log("[" + +new Date + "][" + (n.is || n.route) + "][" + e._uid + "]:nextVueTick")
                    }
                    return Je(t, e)
                  }
                  if (Object({
                      NODE_ENV: "production",
                      VUE_APP_DARK_MODE: "false",
                      VUE_APP_NAME: "consult-visitor-front",
                      VUE_APP_PLATFORM: "mp-weixin",
                      BASE_URL: "/"
                    }).VUE_APP_DEBUG) {
                    var o = e.$scope;
                    console.log("[" + +new Date + "][" + (o.is || o.route) + "][" + e._uid + "]:nextMPTick")
                  }
                  var c;
                  if (e.__next_tick_callbacks || (e.__next_tick_callbacks = []), e.__next_tick_callbacks.push((function () {
                      if (t) try {
                        t.call(e)
                      } catch (t) {
                        Le(t, e, "nextTick")
                      } else c && c(e)
                    })), !t && "undefined" != typeof Promise) return new Promise((function (e) {
                    c = e
                  }))
                }(this, e)
              }, Pn.forEach((function (t) {
                e.prototype[t] = function (e) {
                  return this.$scope && this.$scope[t] ? this.$scope[t](e) : "undefined" != typeof my ? "createSelectorQuery" === t ? my.createSelectorQuery(e) : "createIntersectionObserver" === t ? my.createIntersectionObserver(e) : void 0 : void 0
                }
              })), e.prototype.__init_provide = ot, e.prototype.__init_injections = ct, e.prototype.__call_hook = function (e, t) {
                var n = this;
                re();
                var o, c = n.$options[e],
                  a = e + " hook";
                if (c)
                  for (var r = 0, u = c.length; r < u; r++) o = Me(c[r], n, t ? [t] : null, n, a);
                return n._hasHookEvent && n.$emit("hook:" + e, t), ue(), o
              }, e.prototype.__set_model = function (t, n, o, c) {
                Array.isArray(c) && (-1 !== c.indexOf("trim") && (o = o.trim()), -1 !== c.indexOf("number") && (o = this._n(o))), t || (t = this), e.set(t, n, o)
              }, e.prototype.__set_sync = function (t, n, o) {
                t || (t = this), e.set(t, n, o)
              }, e.prototype.__get_orig = function (e) {
                return y(e) && e.$orig || e
              }, e.prototype.__get_value = function (e, t) {
                return function e(t, n) {
                  var o = n.split("."),
                    c = o[0];
                  return 0 === c.indexOf("__$n") && (c = parseInt(c.replace("__$n", ""))), 1 === o.length ? t[c] : e(t[c], o.slice(1).join("."))
                }(t || this, e)
              }, e.prototype.__get_class = function (e, t) {
                return function (e, t) {
                  return a(e) || a(t) ? function (e, t) {
                    return e ? t ? e + " " + t : e : t || ""
                  }(e, function e(t) {
                    return Array.isArray(t) ? function (t) {
                      for (var n, o = "", c = 0, r = t.length; c < r; c++) a(n = e(t[c])) && "" !== n && (o && (o += " "), o += n);
                      return o
                    }(t) : i(t) ? function (e) {
                      var t = "";
                      for (var n in e) e[n] && (t && (t += " "), t += n);
                      return t
                    }(t) : "string" == typeof t ? t : ""
                  }(t)) : ""
                }(t, e)
              }, e.prototype.__get_style = function (e, t) {
                if (!e && !t) return "";
                var n = function (e) {
                    return Array.isArray(e) ? A(e) : "string" == typeof e ? Sn(e) : e
                  }(e),
                  o = t ? P(t, n) : n;
                return Object.keys(o).map((function (e) {
                  return k(e) + ":" + o[e]
                })).join(";")
              }, e.prototype.__map = function (e, t) {
                var n, o, c, a, r;
                if (Array.isArray(e)) {
                  for (n = new Array(e.length), o = 0, c = e.length; o < c; o++) n[o] = t(e[o], o);
                  return n
                }
                if (i(e)) {
                  for (a = Object.keys(e), n = Object.create(null), o = 0, c = a.length; o < c; o++) n[r = a[o]] = t(e[r], r, o);
                  return n
                }
                if ("number" == typeof e) {
                  for (n = new Array(e), o = 0, c = e; o < c; o++) n[o] = t(o, o);
                  return n
                }
                return []
              }
            }(fn), n.default = fn
        }.call(this, o("0ee4"))
    },
    3352: function (e, t) {
      e.exports = function (e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    "34cf": function (e, t, n) {
      var o = n("ed45"),
        c = n("7172"),
        a = n("6382"),
        r = n("dd3e");
      e.exports = function (e, t) {
        return o(e) || c(e, t) || a(e, t) || r()
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    "366a": function (e, t) {
      e.exports = "https://localhost/api/file/image/学业职场@3x.png"
    },
    "392e": function (e, t, n) {},
    "3a46": function (e, t, n) {
      var o = n("3eed");
      n.n(o).a
    },
    "3b2d": function (t, n) {
      function o(n) {
        return t.exports = o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function (t) {
          return e(t)
        } : function (t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
        }, t.exports.__esModule = !0, t.exports.default = t.exports, o(n)
      }
      t.exports = o, t.exports.__esModule = !0, t.exports.default = t.exports
    },
    "3c22": function (e, t) {
      e.exports = "https://localhost/api/file/image/情绪困扰@3x.png"
    },
    "3d73": function (e, t) {
      e.exports = "/static/img/photo.png"
    },
    "3e60": function (e, t) {
      e.exports = "/static/img/down.png"
    },
    "3eae": function (e, t, n) {
      var o = n("47a9");
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getMessageList = void 0;
      var c = o(n("8138"));
      t.getMessageList = function (e) {
        return (0, c.default)({
          url: "/visitor/user/getMessageList",
          method: "post",
          data: e
        })
      }
    },
    "3eed": function (e, t, n) {},
    "3eee": function (e, t) {
      e.exports = "https://localhost/api/file/image/首页-2@3x.jpg"
    },
    "42d6": function (e, t) {
      e.exports = "https://localhost/api/file/image/背景蒙版@3x.png"
    },
    4679: function (e, t, n) {
      (function (e) {
        var o = n("47a9");
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.usePendingPayment = void 0;
        var c = o(n("7eb4")),
          a = o(n("ee10")),
          r = n("c4a0"),
          u = n("1e0d"),
          i = n("c074"),
          s = (0, r.ref)(null),
          y = (0, r.ref)([]);
        t.usePendingPayment = function () {
          var t = (0, u.useLogin)();
          return {
            getCounselor: function () {
              return s.value
            },
            getOrderList: function () {
              return y.value
            },
            gotoPay: function () {
              e.navigateTo({
                url: "/pages/appointment/pendingPayment"
              })
            },
            update: function () {
              var e = (0, a.default)(c.default.mark((function e() {
                var n;
                return c.default.wrap((function (e) {
                  for (;;) switch (e.prev = e.next) {
                    case 0:
                      if (!t.isLogined()) {
                        e.next = 8;
                        break
                      }
                      return e.next = 3, (0, i.getUnPayOrderFromAdmin)();
                    case 3:
                      if (n = e.sent) {
                        e.next = 6;
                        break
                      }
                      return e.abrupt("return");
                    case 6:
                      s.value = n.counselor, y.value = n.orderList;
                    case 8:
                    case "end":
                      return e.stop()
                  }
                }), e)
              })));
              return function () {
                return e.apply(this, arguments)
              }
            }()
          }
        }
      }).call(this, n("df3c").default)
    },
    "47a9": function (e, t) {
      e.exports = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    4965: function (e, t) {
      e.exports = function (e) {
        try {
          return -1 !== Function.toString.call(e).indexOf("[native code]")
        } catch (t) {
          return "function" == typeof e
        }
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    4990: function (e, t) {
      e.exports = "https://localhost/api/file/image/zxs_tx@3x.png"
    },
    "4b0e": function (e, t, n) {
      (function (e) {
        var o = n("47a9");
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.default = void 0;
        var c = o(n("7eb4")),
          a = o(n("34cf")),
          r = o(n("ee10")),
          u = n("c4a0"),
          i = n("a418"),
          s = (0, u.reactive)({
            status: 0,
            tab: 20,
            total: 44,
            gap: 12
          }),
          y = function () {
            var t = e.getWindowInfo().statusBarHeight,
              n = e.getMenuButtonBoundingClientRect(),
              o = n.height;
            return [t, o, t + o + 2 * (n.top - t), n.top - t]
          };
        t.default = function () {
          var e = function () {
            var e = (0, r.default)(c.default.mark((function e() {
              return c.default.wrap((function (e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    (0, i.onLaunch)((0, r.default)(c.default.mark((function e() {
                      var t, n, o, r, u, i;
                      return c.default.wrap((function (e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            t = y(), n = (0, a.default)(t, 4), o = n[0], r = n[1], u = n[2], i = n[3], s.status = o, s.tab = r, s.total = u, s.gap = i;
                          case 5:
                          case "end":
                            return e.stop()
                        }
                      }), e)
                    }))));
                  case 1:
                  case "end":
                    return e.stop()
                }
              }), e)
            })));
            return function () {
              return e.apply(this, arguments)
            }
          }();
          return {
            height: s,
            update: e
          }
        }
      }).call(this, n("df3c").default)
    },
    "4c18": function (e, t, n) {
      (function (e) {
        var o = n("47a9");
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.default = void 0;
        var c = o(n("ecbe")),
          a = o(n("8ef6"));

        function r(e) {
          for (var t = {}, n = e.split(","), o = 0; o < n.length; o += 1) t[n[o]] = !0;
          return t
        }
        var u = r("br,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"),
          i = r("a,abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),
          s = r("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
        t.default = function (t, n, o, r) {
          t = function (e) {
            return e.replace(/<!--.*?-->/gi, "").replace(/\/\*.*?\*\//gi, "").replace(/[ ]+</gi, "<").replace(/<script[^]*<\/script>/gi, "").replace(/<style[^]*<\/style>/gi, "")
          }(t = function (e) {
            return /<body.*>([^]*)<\/body>/.test(e) ? RegExp.$1 : e
          }(t)), t = c.default.strDiscode(t);
          var y = [],
            d = {
              nodes: [],
              imageUrls: []
            },
            l = function () {
              var t = {};
              return e.getSystemInfo({
                success: function (e) {
                  t.width = e.windowWidth, t.height = e.windowHeight
                }
              }), t
            }();

          function f(e) {
            this.node = "element", this.tag = e, this.$screen = l
          }
          return (0, a.default)(t, {
            start: function (e, t, a) {
              var r = new f(e);
              if (0 !== y.length) {
                var l = y[0];
                void 0 === l.nodes && (l.nodes = [])
              }
              if (u[e] ? r.tagType = "block" : i[e] ? r.tagType = "inline" : s[e] && (r.tagType = "closeSelf"), r.attr = t.reduce((function (e, t) {
                  var n = t.name,
                    o = t.value;
                  return "class" === n && (r.classStr = o), "style" === n && (r.styleStr = o), o.match(/ /) && (o = o.split(" ")), e[n] ? Array.isArray(e[n]) ? e[n].push(o) : e[n] = [e[n], o] : e[n] = o, e
                }), {}), r.classStr ? r.classStr += " ".concat(r.tag) : r.classStr = r.tag, "inline" === r.tagType && (r.classStr += " inline"), "img" === r.tag) {
                var m = r.attr.src;
                m = c.default.urlToHttpUrl(m, o.domain), Object.assign(r.attr, o, {
                  src: m || ""
                }), m && d.imageUrls.push(m)
              }
              if ("a" === r.tag && (r.attr.href = r.attr.href || ""), "font" === r.tag) {
                var p = ["x-small", "small", "medium", "large", "x-large", "xx-large", "-webkit-xxx-large"],
                  h = {
                    color: "color",
                    face: "font-family",
                    size: "font-size"
                  };
                r.styleStr || (r.styleStr = ""), Object.keys(h).forEach((function (e) {
                  if (r.attr[e]) {
                    var t = "size" === e ? p[r.attr[e] - 1] : r.attr[e];
                    r.styleStr += "".concat(h[e], ": ").concat(t, ";")
                  }
                }))
              }
              if ("source" === r.tag && (d.source = r.attr.src), n.start && n.start(r, d), a) {
                var C = y[0] || d;
                void 0 === C.nodes && (C.nodes = []), C.nodes.push(r)
              } else y.unshift(r)
            },
            end: function (e) {
              var t = y.shift();
              if (t.tag !== e && console.error("invalid state: mismatch end tag"), "video" === t.tag && d.source && (t.attr.src = d.source, delete d.source), n.end && n.end(t, d), 0 === y.length) d.nodes.push(t);
              else {
                var o = y[0];
                o.nodes || (o.nodes = []), o.nodes.push(t)
              }
            },
            chars: function (e) {
              if (e.trim()) {
                var t = {
                  node: "text",
                  text: e
                };
                if (n.chars && n.chars(t, d), 0 === y.length) d.nodes.push(t);
                else {
                  var o = y[0];
                  void 0 === o.nodes && (o.nodes = []), o.nodes.push(t)
                }
              }
            }
          }), d
        }
      }).call(this, n("3223").default)
    },
    "4ed8": function (e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.init = void 0;
      var o = n("3240");

      function c(e, t, n) {
        if (n)
          if (n.lifecycles) n.lifecycles.forEach((function (e) {
            t.includes(e) || t.push(e)
          }));
          else {
            var o = n.toString();
            e.forEach((function (e) {
              !t.includes(e) && new RegExp("\\b(".concat(e, ")\\b")).test(o) && t.push(e)
            }))
          }
      }
      t.init = function (e) {
        var t = o.default.config.optionMergeStrategies.setup,
          n = o.default.extend;
        o.default.extend = function () {
          var e = n.apply(this, arguments),
            t = e.options,
            o = t.setup;
          return o && o.lifecycles && o.lifecycles.forEach((function (e) {
            t[e] = t[e] || [function () {}]
          })), e
        }, Object.defineProperty(o.default.config.optionMergeStrategies, "setup", {
          set: function (e) {
            t = e
          },
          get: function () {
            return function (n, o) {
              if ("function" == typeof t) {
                var a = t.apply(this, arguments);
                return a.lifecycles = a.lifecycles || [], c(e, a.lifecycles, o), c(e, a.lifecycles, n), a
              }
            }
          }
        })
      }
    },
    "4ffb": function (e, t, n) {
      var o = n("3b2d").default,
        c = n("3352");
      e.exports = function (e, t) {
        if (t && ("object" === o(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return c(e)
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    5192: function (e, t, n) {
      (function (e, n, o) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.chooseAndUploadFile = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
            type: "all"
          };
          return "image" === e.type ? s(a(e), e) : "video" === e.type ? s(r(e), e) : s(u(e), e)
        }, t.uploadCloudFiles = function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5,
            n = arguments.length > 2 ? arguments[2] : void 0,
            c = (e = JSON.parse(JSON.stringify(e))).length,
            a = 0,
            r = this;
          return new Promise((function (u) {
            for (; a < t;) i();

            function i() {
              var t = a++;
              if (t >= c) !e.find((function (e) {
                return !e.url && !e.errMsg
              })) && u(e);
              else {
                var s = e[t],
                  y = r.files.findIndex((function (e) {
                    return e.uuid === s.uuid
                  }));
                s.url = "", delete s.errMsg, o.uploadFile({
                  filePath: s.path,
                  cloudPath: s.cloudPath,
                  fileType: s.fileType,
                  onUploadProgress: function (e) {
                    e.index = y, n && n(e)
                  }
                }).then((function (e) {
                  s.url = e.fileID, s.index = y, t < c && i()
                })).catch((function (e) {
                  s.errMsg = e.errMsg || e.message, s.index = y, t < c && i()
                }))
              }
            }
          }))
        };
        var c = "chooseAndUploadFile:fail";

        function a(t) {
          var n = t.count,
            o = t.sizeType,
            a = void 0 === o ? ["original", "compressed"] : o,
            r = t.sourceType,
            u = void 0 === r ? ["album", "camera"] : r,
            s = t.extension;
          return new Promise((function (t, o) {
            e.chooseImage({
              count: n,
              sizeType: a,
              sourceType: u,
              extension: s,
              success: function (e) {
                t(i(e, "image"))
              },
              fail: function (e) {
                o({
                  errMsg: e.errMsg.replace("chooseImage:fail", c)
                })
              }
            })
          }))
        }

        function r(t) {
          var n = t.camera,
            o = t.compressed,
            a = t.maxDuration,
            r = t.sourceType,
            u = void 0 === r ? ["album", "camera"] : r,
            s = t.extension;
          return new Promise((function (t, r) {
            e.chooseVideo({
              camera: n,
              compressed: o,
              maxDuration: a,
              sourceType: u,
              extension: s,
              success: function (e) {
                var n = e.tempFilePath,
                  o = e.duration,
                  c = e.size,
                  a = e.height,
                  r = e.width;
                t(i({
                  errMsg: "chooseVideo:ok",
                  tempFilePaths: [n],
                  tempFiles: [{
                    name: e.tempFile && e.tempFile.name || "",
                    path: n,
                    size: c,
                    type: e.tempFile && e.tempFile.type || "",
                    width: r,
                    height: a,
                    duration: o,
                    fileType: "video",
                    cloudPath: ""
                  }]
                }, "video"))
              },
              fail: function (e) {
                r({
                  errMsg: e.errMsg.replace("chooseVideo:fail", c)
                })
              }
            })
          }))
        }

        function u(t) {
          var o = t.count,
            a = t.extension;
          return new Promise((function (t, r) {
            var u = e.chooseFile;
            if (void 0 !== n && "function" == typeof n.chooseMessageFile && (u = n.chooseMessageFile), "function" != typeof u) return r({
              errMsg: c + " 请指定 type 类型，该平台仅支持选择 image 或 video。"
            });
            u({
              type: "all",
              count: o,
              extension: a,
              success: function (e) {
                t(i(e))
              },
              fail: function (e) {
                r({
                  errMsg: e.errMsg.replace("chooseFile:fail", c)
                })
              }
            })
          }))
        }

        function i(e, t) {
          return e.tempFiles.forEach((function (e, n) {
            e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + n + e.name.substring(e.name.lastIndexOf("."))
          })), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map((function (e) {
            return e.path
          }))), e
        }

        function s(e, t) {
          var n = t.onChooseFile;
          return t.onUploadProgress, e.then((function (e) {
            if (n) {
              var t = n(e);
              if (void 0 !== t) return Promise.resolve(t).then((function (t) {
                return void 0 === t ? e : t
              }))
            }
            return e
          })).then((function (e) {
            return !1 === e ? {
              errMsg: "chooseAndUploadFile:ok",
              tempFilePaths: [],
              tempFiles: []
            } : e
          }))
        }
      }).call(this, n("df3c").default, n("3223").default, n("861b").uniCloud)
    },
    5814: function (e, t) {
      e.exports = "https://localhost/api/file/image/个人成长@3x.png"
    },
    "5bd7": function (e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.isProduction = t.isDevelopment = void 0, t.isDevelopment = !1, t.isProduction = !0
    },
    "5c90": function (e, t) {
      e.exports = "/static/img/loginImg.png"
    },
    "5dad": function (e, t) {
      e.exports = "/static/img/exchange.png"
    },
    "60c7": function (e, t) {
      e.exports = "https://localhost/api/file/image/05_gzs@3x.png"
    },
    "613d": function (e, t, n) {
      var o = n("8000");
      n.n(o).a
    },
    6228: function (e, t) {
      e.exports = "https://localhost/api/file/image/BG@3x.png"
    },
    "624a": function (e, t, n) {
      var o = n("47a9");
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getCurrentCity = void 0;
      var c = o(n("7eb4")),
        a = o(n("ee10")),
        r = o(n("8138")),
        u = function () {
          var e = (0, a.default)(c.default.mark((function e(t, n) {
            var o, a;
            return c.default.wrap((function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, (0, r.default)({
                    url: "/global/getLocationInfo?lat=".concat(t, "&lng=").concat(n),
                    method: "get"
                  });
                case 2:
                  return o = e.sent, a = o.data.data.locationInfo.ad_info, e.abrupt("return", {
                    province: a.province,
                    city: a.city,
                    district: null
                  });
                case 5:
                case "end":
                  return e.stop()
              }
            }), e)
          })));
          return function (t, n) {
            return e.apply(this, arguments)
          }
        }();
      t.getCurrentCity = u
    },
    6280: function (e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0;
      t.default = {
        strDiscode: function (e) {
          return e = function (e) {
            return e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/&OElig;|&#338;|&#x152;/g, "?")).replace(/&oelig;|&#339;|&#x153;/g, "?")).replace(/&Scaron;|&#352;|&#x160;/g, "?")).replace(/&scaron;|&#353;|&#x161;/g, "?")).replace(/&Yuml;|&#376;|&#x178;/g, "?")).replace(/&fnof;|&#402;|&#x192;/g, "?")).replace(/&circ;|&#710;|&#x2c6;/g, "?")).replace(/&tilde;|&#732;|&#x2dc;/g, "?")).replace(/&thinsp;|$#8201;|&#x2009;/g, "<span class='spaceshow'>?</span>")).replace(/&zwnj;|&#8204;|&#x200C;/g, "<span class='spaceshow'>?</span>")).replace(/&zwj;|$#8205;|&#x200D;/g, "<span class='spaceshow'>?</span>")).replace(/&lrm;|$#8206;|&#x200E;/g, "<span class='spaceshow'>?</span>")).replace(/&rlm;|&#8207;|&#x200F;/g, "<span class='spaceshow'>?</span>")).replace(/&ndash;|&#8211;|&#x2013;/g, "–")).replace(/&mdash;|&#8212;|&#x2014;/g, "—")).replace(/&lsquo;|&#8216;|&#x2018;/g, "‘")).replace(/&rsquo;|&#8217;|&#x2019;/g, "’")).replace(/&sbquo;|&#8218;|&#x201a;/g, "?")).replace(/&ldquo;|&#8220;|&#x201c;/g, "“")).replace(/&rdquo;|&#8221;|&#x201d;/g, "”")).replace(/&bdquo;|&#8222;|&#x201e;/g, "?")).replace(/&dagger;|&#8224;|&#x2020;/g, "?")).replace(/&Dagger;|&#8225;|&#x2021;/g, "?")).replace(/&bull;|&#8226;|&#x2022;/g, "?")).replace(/&hellip;|&#8230;|&#x2026;/g, "…")).replace(/&permil;|&#8240;|&#x2030;/g, "‰")).replace(/&prime;|&#8242;|&#x2032;/g, "′")).replace(/&Prime;|&#8243;|&#x2033;/g, "″")).replace(/&lsaquo;|&#8249;|&#x2039;/g, "?")).replace(/&rsaquo;|&#8250;|&#x203a;/g, "?")).replace(/&oline;|&#8254;|&#x203e;/g, "￣")).replace(/&euro;|&#8364;|&#x20ac;/g, "�")).replace(/&trade;|&#8482;|&#x2122;/g, "?")).replace(/&larr;|&#8592;|&#x2190;/g, "←")).replace(/&uarr;|&#8593;|&#x2191;/g, "↑")).replace(/&rarr;|&#8594;|&#x2192;/g, "→")).replace(/&darr;|&#8595;|&#x2193;/g, "↓")).replace(/&harr;|&#8596;|&#x2194;/g, "?")).replace(/&crarr;|&#8629;|&#x21b5;/g, "?")).replace(/&lceil;|&#8968;|&#x2308;/g, "?")).replace(/&rceil;|&#8969;|&#x2309;/g, "?")).replace(/&lfloor;|&#8970;|&#x230a;/g, "?")).replace(/&rfloor;|&#8971;|&#x230b;/g, "?")).replace(/&loz;|&#9674;|&#x25ca;/g, "?")).replace(/&spades;|&#9824;|&#x2660;/g, "?")).replace(/&clubs;|&#9827;|&#x2663;/g, "?")).replace(/&hearts;|&#9829;|&#x2665;/g, "?")).replace(/&diams;|&#9830;|&#x2666;/g, "?")
          }(e = function (e) {
            return e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/&nbsp;|&#32;|&#x20;/g, "&nbsp;")).replace(/&ensp;|&#8194;|&#x2002;/g, "&ensp;")).replace(/&#12288;|&#x3000;/g, "<span class='spaceshow'>　</span>")).replace(/&emsp;|&#8195;|&#x2003;/g, "&emsp;")).replace(/&quot;|&#34;|&#x22;/g, '"')).replace(/&apos;|&#39;|&#x27;/g, "&apos;")).replace(/&acute;|&#180;|&#xB4;/g, "′")).replace(/&times;|&#215;|&#xD7;/g, "×")).replace(/&divide;|&#247;|&#xF7;/g, "÷")).replace(/&amp;|&#38;|&#x26;/g, "&amp;")).replace(/&lt;|&#60;|&#x3c;/g, "&lt;")).replace(/&gt;|&#62;|&#x3e;/g, "&gt;")).replace(/&nbsp;|&#32;|&#x20;/g, "<span class='spaceshow'> </span>")).replace(/&ensp;|&#8194;|&#x2002;/g, "<span class='spaceshow'>?</span>")).replace(/&#12288;|&#x3000;/g, "<span class='spaceshow'>　</span>")).replace(/&emsp;|&#8195;|&#x2003;/g, "<span class='spaceshow'>?</span>")).replace(/&quot;|&#34;|&#x22;/g, '"')).replace(/&quot;|&#39;|&#x27;/g, "'")).replace(/&acute;|&#180;|&#xB4;/g, "′")).replace(/&times;|&#215;|&#xD7;/g, "×")).replace(/&divide;|&#247;|&#xF7;/g, "÷")).replace(/&amp;|&#38;|&#x26;/g, "&")).replace(/&lt;|&#60;|&#x3c;/g, "<")).replace(/&gt;|&#62;|&#x3e;/g, ">")
          }(e = function (e) {
            return e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/&Alpha;|&#913;|&#x391;/g, "Α")).replace(/&Beta;|&#914;|&#x392;/g, "Β")).replace(/&Gamma;|&#915;|&#x393;/g, "Γ")).replace(/&Delta;|&#916;|&#x394;/g, "Δ")).replace(/&Epsilon;|&#917;|&#x395;/g, "Ε")).replace(/&Zeta;|&#918;|&#x396;/g, "Ζ")).replace(/&Eta;|&#919;|&#x397;/g, "Η")).replace(/&Theta;|&#920;|&#x398;/g, "Θ")).replace(/&Iota;|&#921;|&#x399;/g, "Ι")).replace(/&Kappa;|&#922;|&#x39a;/g, "Κ")).replace(/&Lambda;|&#923;|&#x39b;/g, "Λ")).replace(/&Mu;|&#924;|&#x39c;/g, "Μ")).replace(/&Nu;|&#925;|&#x39d;/g, "Ν")).replace(/&Xi;|&#925;|&#x39d;/g, "Ν")).replace(/&Omicron;|&#927;|&#x39f;/g, "Ο")).replace(/&Pi;|&#928;|&#x3a0;/g, "Π")).replace(/&Rho;|&#929;|&#x3a1;/g, "Ρ")).replace(/&Sigma;|&#931;|&#x3a3;/g, "Σ")).replace(/&Tau;|&#932;|&#x3a4;/g, "Τ")).replace(/&Upsilon;|&#933;|&#x3a5;/g, "Υ")).replace(/&Phi;|&#934;|&#x3a6;/g, "Φ")).replace(/&Chi;|&#935;|&#x3a7;/g, "Χ")).replace(/&Psi;|&#936;|&#x3a8;/g, "Ψ")).replace(/&Omega;|&#937;|&#x3a9;/g, "Ω")).replace(/&alpha;|&#945;|&#x3b1;/g, "α")).replace(/&beta;|&#946;|&#x3b2;/g, "β")).replace(/&gamma;|&#947;|&#x3b3;/g, "γ")).replace(/&delta;|&#948;|&#x3b4;/g, "δ")).replace(/&epsilon;|&#949;|&#x3b5;/g, "ε")).replace(/&zeta;|&#950;|&#x3b6;/g, "ζ")).replace(/&eta;|&#951;|&#x3b7;/g, "η")).replace(/&theta;|&#952;|&#x3b8;/g, "θ")).replace(/&iota;|&#953;|&#x3b9;/g, "ι")).replace(/&kappa;|&#954;|&#x3ba;/g, "κ")).replace(/&lambda;|&#955;|&#x3bb;/g, "λ")).replace(/&mu;|&#956;|&#x3bc;/g, "μ")).replace(/&nu;|&#957;|&#x3bd;/g, "ν")).replace(/&xi;|&#958;|&#x3be;/g, "ξ")).replace(/&omicron;|&#959;|&#x3bf;/g, "ο")).replace(/&pi;|&#960;|&#x3c0;/g, "π")).replace(/&rho;|&#961;|&#x3c1;/g, "ρ")).replace(/&sigmaf;|&#962;|&#x3c2;/g, "?")).replace(/&sigma;|&#963;|&#x3c3;/g, "σ")).replace(/&tau;|&#964;|&#x3c4;/g, "τ")).replace(/&upsilon;|&#965;|&#x3c5;/g, "υ")).replace(/&phi;|&#966;|&#x3c6;/g, "φ")).replace(/&chi;|&#967;|&#x3c7;/g, "χ")).replace(/&psi;|&#968;|&#x3c8;/g, "ψ")).replace(/&omega;|&#969;|&#x3c9;/g, "ω")).replace(/&thetasym;|&#977;|&#x3d1;/g, "?")).replace(/&upsih;|&#978;|&#x3d2;/g, "?")).replace(/&piv;|&#982;|&#x3d6;/g, "?")).replace(/&middot;|&#183;|&#xb7;/g, "·")
          }(e = function (e) {
            return e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/&forall;|&#8704;|&#x2200;/g, "?")).replace(/&part;|&#8706;|&#x2202;/g, "?")).replace(/&exist;|&#8707;|&#x2203;/g, "?")).replace(/&empty;|&#8709;|&#x2205;/g, "?")).replace(/&nabla;|&#8711;|&#x2207;/g, "?")).replace(/&isin;|&#8712;|&#x2208;/g, "∈")).replace(/&notin;|&#8713;|&#x2209;/g, "?")).replace(/&ni;|&#8715;|&#x220b;/g, "?")).replace(/&prod;|&#8719;|&#x220f;/g, "∏")).replace(/&sum;|&#8721;|&#x2211;/g, "∑")).replace(/&minus;|&#8722;|&#x2212;/g, "?")).replace(/&lowast;|&#8727;|&#x2217;/g, "?")).replace(/&radic;|&#8730;|&#x221a;/g, "√")).replace(/&prop;|&#8733;|&#x221d;/g, "∝")).replace(/&infin;|&#8734;|&#x221e;/g, "∞")).replace(/&ang;|&#8736;|&#x2220;/g, "∠")).replace(/&and;|&#8743;|&#x2227;/g, "∧")).replace(/&or;|&#8744;|&#x2228;/g, "∨")).replace(/&cap;|&#8745;|&#x2229;/g, "∩")).replace(/&cup;|&#8746;|&#x222a;/g, "∪")).replace(/&int;|&#8747;|&#x222b;/g, "∫")).replace(/&there4;|&#8756;|&#x2234;/g, "∴")).replace(/&sim;|&#8764;|&#x223c;/g, "～")).replace(/&cong;|&#8773;|&#x2245;/g, "?")).replace(/&asymp;|&#8776;|&#x2248;/g, "≈")).replace(/&ne;|&#8800;|&#x2260;/g, "≠")).replace(/&le;|&#8804;|&#x2264;/g, "≤")).replace(/&ge;|&#8805;|&#x2265;/g, "≥")).replace(/&sub;|&#8834;|&#x2282;/g, "?")).replace(/&sup;|&#8835;|&#x2283;/g, "?")).replace(/&nsub;|&#8836;|&#x2284;/g, "?")).replace(/&sube;|&#8838;|&#x2286;/g, "?")).replace(/&supe;|&#8839;|&#x2287;/g, "?")).replace(/&oplus;|&#8853;|&#x2295;/g, "⊕")).replace(/&otimes;|&#8855;|&#x2297;/g, "?")).replace(/&perp;|&#8869;|&#x22a5;/g, "⊥")).replace(/&sdot;|&#8901;|&#x22c5;/g, "?")
          }(e))))
        },
        urlToHttpUrl: function (e, t) {
          return /^\/\//.test(e) ? "https:".concat(e) : /^\//.test(e) ? "https://".concat(t).concat(e) : e
        }
      }
    },
    "62ba": function (e, t) {
      e.exports = "https://localhost/api/file/image/性心理@3x.png"
    },
    6382: function (e, t, n) {
      var o = n("6454");
      e.exports = function (e, t) {
        if (e) {
          if ("string" == typeof e) return o(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0
        }
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    6454: function (e, t) {
      e.exports = function (e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
        return o
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    6487: function (e, t) {
      e.exports = "https://localhost/api/file/image/咨询寄语bg@3x.png"
    },
    "65f1": function (e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0, t.default = {
        pages: [{
          path: "pages/consult/consult",
          style: {
            navigationBarTitleText: "预约咨询",
            navigationStyle: "custom",
            enablePullDownRefresh: !0,
            onReachBottomDistance: 200
          }
        }, {
          path: "pages/login/login",
          style: {
            navigationBarTitleText: "登录",
            navigationStyle: "custom",
            enablePullDownRefresh: !1
          }
        }, {
          path: "pages/user/user",
          style: {
            navigationBarTitleText: "个人中心",
            navigationStyle: "custom",
            enablePullDownRefresh: !1,
            disableScroll: !0
          }
        }, {
          path: "pages/appointment/appointment",
          style: {
            navigationBarTitleText: "我的预约",
            enablePullDownRefresh: !0,
            navigationStyle: "custom",
            onReachBottomDistance: 300
          }
        }, {
          path: "pages/consult/counselor",
          style: {
            navigationBarTitleText: "教练详情",
            navigationStyle: "custom",
            enablePullDownRefresh: !1
          }
        }, {
          path: "pages/consult/appointForm",
          style: {
            navigationBarTitleText: "预约申请表",
            enablePullDownRefresh: !1
          }
        }, {
          path: "pages/consult/confirm",
          style: {
            navigationStyle: "custom",
            enablePullDownRefresh: !1
          }
        }, {
          path: "pages/consult/protocolPage",
          style: {
            navigationBarTitleText: "协议",
            enablePullDownRefresh: !1
          }
        }, {
          path: "pages/consult/payOrder",
          style: {
            navigationBarTitleText: "支付订单",
            enablePullDownRefresh: !1,
            navigationBarBackgroundColor: "#FFFFFF"
          }
        }, {
          path: "pages/consult/certification",
          style: {
            navigationBarTitleText: "实名认证",
            enablePullDownRefresh: !1
          }
        }, {
          path: "pages/consult/completeInfo",
          style: {
            navigationBarTitleText: "完善信息",
            enablePullDownRefresh: !1,
            navigationStyle: "custom"
          }
        }, {
          path: "pages/consult/completeDetail",
          style: {
            navigationBarTitleText: "完善儿童信息",
            enablePullDownRefresh: !1,
            navigationStyle: "custom"
          }
        }, {
          path: "pages/consult/orderDetail",
          style: {
            navigationBarTitleText: "订单详情",
            enablePullDownRefresh: !1,
            navigationStyle: "custom"
          }
        }, {
          path: "pages/appointment/appointDetail",
          style: {
            navigationBarTitleText: "订单详情",
            enablePullDownRefresh: !1,
            navigationStyle: "custom"
          }
        }, {
          path: "pages/appointment/bindVisitor",
          style: {
            navigationBarTitleText: "",
            enablePullDownRefresh: !1,
            navigationStyle: "custom"
          }
        }, {
          path: "pages/appointment/feedback",
          style: {
            navigationBarTitleText: "反馈表",
            enablePullDownRefresh: !1
          }
        }, {
          path: "pages/user/coupon",
          style: {
            navigationBarTitleText: "我的优惠券",
            enablePullDownRefresh: !1
          }
        }, {
          path: "pages/user/couponDetail",
          style: {
            navigationBarTitleText: "优惠券",
            enablePullDownRefresh: !1
          }
        }, {
          path: "pages/consult/orderDetailCancel",
          style: {
            navigationBarTitleText: "订单详情",
            enablePullDownRefresh: !1,
            navigationStyle: "custom"
          }
        }, {
          path: "pages/user/infoEdit",
          style: {
            navigationBarTitleText: "信息编辑",
            navigationStyle: "custom",
            enablePullDownRefresh: !1
          }
        }, {
          path: "pages/user/visitorInfo",
          style: {
            navigationBarTitleText: "咨询人信息",
            enablePullDownRefresh: !1
          }
        }, {
          path: "pages/user/infoNotice",
          style: {
            navigationBarTitleText: "消息通知",
            enablePullDownRefresh: !1
          }
        }, {
          path: "pages/user/userFocus",
          style: {
            navigationBarTitleText: "我的关注",
            enablePullDownRefresh: !1,
            navigationStyle: "custom"
          }
        }, {
          path: "pages/user/followFWH",
          style: {
            navigationBarTitleText: "跳转服务号",
            enablePullDownRefresh: !1
          }
        }, {
          path: "pages/appointment/pendingPayment",
          style: {
            navigationBarTitleText: "",
            navigationStyle: "custom",
            enablePullDownRefresh: !1
          }
        }],
        subPackages: [{
          root: "pages/userList",
          pages: [{
            path: "accountMassage",
            style: {
              navigationBarTitleText: "账号管理",
              enablePullDownRefresh: !1
            }
          }, {
            path: "userFeedbackLIst",
            style: {
              navigationBarTitleText: "用户反馈",
              enablePullDownRefresh: !1
            }
          }, {
            path: "aboutUm",
            style: {
              navigationBarTitleText: "关于UM心理",
              enablePullDownRefresh: !1
            }
          }, {
            path: "userFeedback",
            style: {
              navigationBarTitleText: "给我们反馈",
              enablePullDownRefresh: !1
            }
          }, {
            path: "preOrderList",
            style: {
              navigationBarTitleText: "原咨询记录",
              enablePullDownRefresh: !1
            }
          }, {
            path: "consultGuide",
            style: {
              navigationBarTitleText: "咨询指南",
              enablePullDownRefresh: !1
            }
          }]
        }, {
          root: "pages/studio",
          pages: [{
            path: "list",
            style: {
              navigationBarTitleText: "线下自营工作室",
              navigationStyle: "custom",
              enablePullDownRefresh: !1
            }
          }, {
            path: "details",
            style: {
              navigationBarTitleText: "",
              enablePullDownRefresh: !1
            }
          }]
        }, {
          root: "pages/information",
          pages: [{
            path: "informationList",
            style: {
              navigationBarTitleText: "了解咨询",
              enablePullDownRefresh: !1,
              navigationStyle: "custom",
              disableScroll: !0
            }
          }, {
            path: "informationDetail",
            style: {
              navigationBarTitleText: "咨询详情",
              enablePullDownRefresh: !1
            }
          }]
        }, {
          root: "pages/service",
          pages: [{
            path: "acservice",
            style: {
              navigationBarTitleText: "活动服务",
              navigationStyle: "custom",
              onReachBottomDistance: 300
            }
          }]
        }, {
          root: "pages/com",
          pages: [{
            path: "comWxLogin",
            style: {
              navigationBarTitleText: "手机号快捷登录",
              enablePullDownRefresh: !1,
              navigationStyle: "custom"
            }
          }, {
            path: "showProtocol",
            style: {
              navigationBarTitleText: "查看协议",
              enablePullDownRefresh: !1
            }
          }]
        }, {
          root: "pages/countryCode",
          pages: [{
            path: "countryCode",
            style: {
              navigationBarTitleText: "选择国际电话区号",
              enablePullDownRefresh: !1
            }
          }]
        }, {
          root: "pages/filter",
          pages: [{
            path: "filter",
            style: {
              navigationStyle: "custom",
              enablePullDownRefresh: !0
            }
          }]
        }],
        preloadRule: {
          "pages/consult/consult": {
            network: "all",
            packages: ["pages/studio", "pages/filter"]
          }
        },
        globalStyle: {
          navigationBarTextStyle: "black",
          navigationBarTitleText: "uni-app",
          navigationBarBackgroundColor: "#ffffff",
          backgroundColor: "#F8F8F8",
          "app-plus": {
            background: "#efeff4"
          }
        },
        tabBar: {
          borderStyle: "black",
          backgroundColor: "#fff",
          color: "#402E32",
          selectedColor: "#402E32",
          list: [{
            pagePath: "pages/consult/consult",
            iconPath: "static/img/home/首页_默认@3x.png",
            selectedIconPath: "static/img/home/首页_选中@3x.png",
            text: "预约咨询"
          }, {
            pagePath: "pages/appointment/appointment",
            iconPath: "static/img/home/预约_默认@3x.png",
            selectedIconPath: "static/img/home/预约_选中@3x.png",
            text: "我的预约"
          }, {
            pagePath: "pages/user/user",
            iconPath: "static/img/home/我的_默认@3x.png",
            selectedIconPath: "static/img/home/我的_选中@3x.png",
            text: "个人中心"
          }]
        }
      }
    },
    6686: function (e, t) {},
    "67ad": function (e, t) {
      e.exports = function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    "69ff": function (e, t, n) {
      var o = n("22ab");
      n.n(o).a
    },
    "6a84": function (e, t, n) {
      var o = n("0d97");
      n.n(o).a
    },
    7172: function (e, t) {
      e.exports = function (e, t) {
        var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
        if (null != n) {
          var o, c, a, r, u = [],
            i = !0,
            s = !1;
          try {
            if (a = (n = n.call(e)).next, 0 === t) {
              if (Object(n) !== n) return;
              i = !1
            } else
              for (; !(i = (o = a.call(n)).done) && (u.push(o.value), u.length !== t); i = !0);
          } catch (e) {
            s = !0, c = e
          } finally {
            try {
              if (!i && null != n.return && (r = n.return(), Object(r) !== r)) return
            } finally {
              if (s) throw c
            }
          }
          return u
        }
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    "72b7": function (e, t, n) {
      var o = n("47a9");
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getCounselor = t.getCalendar = void 0;
      var c = o(n("7ca3")),
        a = o(n("8138"));

      function r(e, t) {
        var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
        if (!n) {
          if (Array.isArray(e) || (n = function (e, t) {
              if (e) {
                if ("string" == typeof e) return u(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? u(e, t) : void 0
              }
            }(e)) || t && e && "number" == typeof e.length) {
            n && (e = n);
            var o = 0,
              c = function () {};
            return {
              s: c,
              n: function () {
                return o >= e.length ? {
                  done: !0
                } : {
                  done: !1,
                  value: e[o++]
                }
              },
              e: function (e) {
                throw e
              },
              f: c
            }
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var a, r = !0,
          i = !1;
        return {
          s: function () {
            n = n.call(e)
          },
          n: function () {
            var e = n.next();
            return r = e.done, e
          },
          e: function (e) {
            i = !0, a = e
          },
          f: function () {
            try {
              r || null == n.return || n.return()
            } finally {
              if (i) throw a
            }
          }
        }
      }

      function u(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
        return o
      }

      function i(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          t && (o = o.filter((function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
          }))), n.push.apply(n, o)
        }
        return n
      }

      function s(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2 ? i(Object(n), !0).forEach((function (t) {
            (0, c.default)(e, t, n[t])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : i(Object(n)).forEach((function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
          }))
        }
        return e
      }
      t.getCalendar = function (e, t, n, o) {
        return (0, a.default)({
          url: "/vCounselor/getCalendar",
          method: "post",
          data: {
            counselorId: e,
            consultType: t,
            consultWay: n,
            date: o
          }
        }).then((function (e) {
          var t, n, o = e.data.data.list.sort((function (e, t) {
            return new Date(e.date) - new Date(t.date)
          })).reduce((function (e, t) {
            var n = new Date(t.date),
              o = n.getMonth() + 1,
              c = e[o] || [];
            return c.push(s(s({}, t), {}, {
              timeDate: n
            })), e[o] = c, e
          }), {});
          t = Object.keys(o).map((function (e) {
            return {
              k: e,
              v: o[e]
            }
          })).sort((function (e, t) {
            return e.v[0].timeDate - t.v[0].timeDate
          })), n = e.data.data.canSubmitOrder;
          var c, a = 0,
            u = r(t);
          try {
            for (u.s(); !(c = u.n()).done;) {
              var i = c.value.v,
                y = i[0];
              null != y.inWeek ? (y.marginLeftCount = y.inWeek - 1, a = (i.length + y.inWeek - 1) % 7) : (y.marginLeftCount = a, a = (i.length + a) % 7)
            }
          } catch (e) {
            u.e(e)
          } finally {
            u.f()
          }
          return {
            canSubmitOrder: n,
            dateList: t = t.map((function (e) {
              var t = e.v.reduce((function (e, t, n) {
                return t.time.length > 0 ? n : e
              }), 0);
              return s(s({}, e), {}, {
                v: e.v.slice(0, t + 1)
              })
            })).filter((function (e) {
              return !!e.v.find((function (e) {
                return e.time.length > 0
              }))
            }))
          }
        }))
      }, t.getCounselor = function (e) {
        return (0, a.default)({
          url: "/vCounselor/getInfo",
          method: "post",
          data: {
            counselorId: e
          }
        }).then((function (e) {
          return e.data.data
        }))
      }
    },
    "72f8": function (e, t) {
      e.exports = "https://localhost/api/file/image/save@3x.png"
    },
    "75e3": function (e, t, n) {
      var o = n("a75d");
      n.n(o).a
    },
    7647: function (e, t) {
      function n(t, o) {
        return e.exports = n = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
          return e.__proto__ = t, e
        }, e.exports.__esModule = !0, e.exports.default = e.exports, n(t, o)
      }
      e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    "7a32": function (e, t) {
      e.exports = "/static/img/radio-in.png"
    },
    "7b13": function (e, t) {
      e.exports = "/static/img/img-done.png"
    },
    "7ca3": function (e, t, n) {
      var o = n("d551");
      e.exports = function (e, t, n) {
        return (t = o(t)) in e ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : e[t] = n, e
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    "7ce1": function (e, t, n) {
      var o = n("b4d2"),
        c = n("7647"),
        a = n("4965"),
        r = n("931d");

      function u(t) {
        var n = "function" == typeof Map ? new Map : void 0;
        return e.exports = u = function (e) {
          if (null === e || !a(e)) return e;
          if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
          if (void 0 !== n) {
            if (n.has(e)) return n.get(e);
            n.set(e, t)
          }

          function t() {
            return r(e, arguments, o(this).constructor)
          }
          return t.prototype = Object.create(e.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), c(t, e)
        }, e.exports.__esModule = !0, e.exports.default = e.exports, u(t)
      }
      e.exports = u, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    "7eb4": function (e, t, n) {
      var o = n("9fc1")();
      e.exports = o
    },
    8e3: function (e, t, n) {},
    8138: function (e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0;
      var o = n("9359");
      t.default = function (e) {
        var t = e.url,
          n = e.method,
          c = e.data;
        return new Promise((function (e, a) {
          (0, o.irequestdata)({
            url: t,
            method: n,
            data: c,
            success: function (t) {
              200 === t.data.code ? e(t) : a(t)
            },
            error: function (e) {
              a(e)
            }
          })
        }))
      }
    },
    "828b": function (e, t, n) {
      function o(e, t, n, o, c, a, r, u, i, s) {
        var y, d = "function" == typeof e ? e.options : e;
        if (i) {
          d.components || (d.components = {});
          var l = Object.prototype.hasOwnProperty;
          for (var f in i) l.call(i, f) && !l.call(d.components, f) && (d.components[f] = i[f])
        }
        if (s && ("function" == typeof s.beforeCreate && (s.beforeCreate = [s.beforeCreate]), (s.beforeCreate || (s.beforeCreate = [])).unshift((function () {
            this[s.__module] = this
          })), (d.mixins || (d.mixins = [])).push(s)), t && (d.render = t, d.staticRenderFns = n, d._compiled = !0), o && (d.functional = !0), a && (d._scopeId = "data-v-" + a), r ? (y = function (e) {
            (e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), c && c.call(this, e), e && e._registeredComponents && e._registeredComponents.add(r)
          }, d._ssrRegister = y) : c && (y = u ? function () {
            c.call(this, this.$root.$options.shadowRoot)
          } : c), y)
          if (d.functional) {
            d._injectStyles = y;
            var m = d.render;
            d.render = function (e, t) {
              return y.call(t), m(e, t)
            }
          } else {
            var p = d.beforeCreate;
            d.beforeCreate = p ? [].concat(p, y) : [y]
          } return {
          exports: e,
          options: d
        }
      }
      n.d(t, "a", (function () {
        return o
      }))
    },
    "83b8": function (e, t, n) {
      (function (e, o) {
        var c = n("47a9");
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.getImage = void 0;
        var a = c(n("67ad")),
          r = c(n("0bdb")),
          u = /^data:image\/(png|jpe?g|gif|webp|bmp|svg\+xml);base64,/,
          i = function () {
            function e(t, n) {
              (0, a.default)(this, e), this._name = t, this._src = n
            }
            return (0, r.default)(e, [{
              key: "getFileExt",
              value: function () {
                var e = u.exec(this._src);
                return e ? e[1] : "png"
              }
            }, {
              key: "getSimpleSrc",
              value: function () {
                return this._src.replace(u, "")
              }
            }]), e
          }();
        i.test = function (e) {
          return u.test(e)
        }, i.create = function (e, t) {
          return new i(e, t)
        }, t.getImage = function (t, n) {
          return /^\/static\//.test(n) ? n : i.test(n) ? function (t, n) {
            var o = i.create(t, n);
            return new Promise((function (n, c) {
              var a = e.getFileSystemManager(),
                r = "".concat(e.env.USER_DATA_PATH, "/").concat(t, ".").concat(o.getFileExt());
              a.writeFile({
                filePath: r,
                data: o.getSimpleSrc(),
                encoding: "base64",
                success: function () {
                  n(r)
                },
                fail: function (e) {
                  c(e)
                }
              })
            }))
          }(t, n) : function (e) {
            return new Promise((function (t, n) {
              o.getImageInfo({
                src: e,
                success: function (e) {
                  var n = e.path;
                  t(n)
                },
                fail: function (e) {
                  n(e)
                }
              })
            }))
          }(n)
        }
      }).call(this, n("3223").default, n("df3c").default)
    },
    "83bc": function (e, t, n) {
      var o = n("02ea");
      n.n(o).a
    },
    "861b": function (e, t, n) {
      (function (e, o, c) {
        var a = n("47a9");
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.uniCloud = t.default = t.UniCloudError = void 0;
        var r = a(n("7eb4")),
          u = a(n("3352")),
          i = a(n("34cf")),
          s = a(n("3b2d")),
          y = a(n("af34")),
          d = a(n("ee10")),
          l = a(n("7ca3")),
          f = a(n("8ffa")),
          m = a(n("4ffb")),
          p = a(n("b4d2")),
          h = a(n("7ce1")),
          C = a(n("67ad")),
          g = a(n("0bdb")),
          v = a(n("65f1"));

        function N(e, t) {
          var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
          if (!n) {
            if (Array.isArray(e) || (n = function (e, t) {
                if (e) {
                  if ("string" == typeof e) return b(e, t);
                  var n = Object.prototype.toString.call(e).slice(8, -1);
                  return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? b(e, t) : void 0
                }
              }(e)) || t && e && "number" == typeof e.length) {
              n && (e = n);
              var o = 0,
                c = function () {};
              return {
                s: c,
                n: function () {
                  return o >= e.length ? {
                    done: !0
                  } : {
                    done: !1,
                    value: e[o++]
                  }
                },
                e: function (e) {
                  throw e
                },
                f: c
              }
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
          }
          var a, r = !0,
            u = !1;
          return {
            s: function () {
              n = n.call(e)
            },
            n: function () {
              var e = n.next();
              return r = e.done, e
            },
            e: function (e) {
              u = !0, a = e
            },
            f: function () {
              try {
                r || null == n.return || n.return()
              } finally {
                if (u) throw a
              }
            }
          }
        }

        function b(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
          return o
        }

        function _(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            t && (o = o.filter((function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), n.push.apply(n, o)
          }
          return n
        }

        function x(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? _(Object(n), !0).forEach((function (t) {
              (0, l.default)(e, t, n[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _(Object(n)).forEach((function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }))
          }
          return e
        }

        function w(e) {
          var t = function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
            } catch (e) {
              return !1
            }
          }();
          return function () {
            var n, o = (0, p.default)(e);
            if (t) {
              var c = (0, p.default)(this).constructor;
              n = Reflect.construct(o, arguments, c)
            } else n = o.apply(this, arguments);
            return (0, m.default)(this, n)
          }
        }

        function k(e, t, n) {
          return e(n = {
            path: t,
            exports: {},
            require: function (e, t) {
              return function () {
                throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
              }(null == t && n.path)
            }
          }, n.exports), n.exports
        }
        "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : void 0 !== e || "undefined" != typeof self && self;
        var O = k((function (e, t) {
            var n;
            e.exports = n = n || function (e, t) {
              var n = Object.create || function () {
                  function e() {}
                  return function (t) {
                    var n;
                    return e.prototype = t, n = new e, e.prototype = null, n
                  }
                }(),
                o = {},
                c = o.lib = {},
                a = c.Base = {
                  extend: function (e) {
                    var t = n(this);
                    return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {
                      t.$super.init.apply(this, arguments)
                    }), t.init.prototype = t, t.$super = this, t
                  },
                  create: function () {
                    var e = this.extend();
                    return e.init.apply(e, arguments), e
                  },
                  init: function () {},
                  mixIn: function (e) {
                    for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                    e.hasOwnProperty("toString") && (this.toString = e.toString)
                  },
                  clone: function () {
                    return this.init.prototype.extend(this)
                  }
                },
                r = c.WordArray = a.extend({
                  init: function (e, t) {
                    e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length
                  },
                  toString: function (e) {
                    return (e || i).stringify(this)
                  },
                  concat: function (e) {
                    var t = this.words,
                      n = e.words,
                      o = this.sigBytes,
                      c = e.sigBytes;
                    if (this.clamp(), o % 4)
                      for (var a = 0; a < c; a++) {
                        var r = n[a >>> 2] >>> 24 - a % 4 * 8 & 255;
                        t[o + a >>> 2] |= r << 24 - (o + a) % 4 * 8
                      } else
                        for (a = 0; a < c; a += 4) t[o + a >>> 2] = n[a >>> 2];
                    return this.sigBytes += c, this
                  },
                  clamp: function () {
                    var t = this.words,
                      n = this.sigBytes;
                    t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4)
                  },
                  clone: function () {
                    var e = a.clone.call(this);
                    return e.words = this.words.slice(0), e
                  },
                  random: function (t) {
                    for (var n, o = [], c = function (t) {
                        var n = 987654321,
                          o = 4294967295;
                        return function () {
                          var c = ((n = 36969 * (65535 & n) + (n >> 16) & o) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & o) & o;
                          return c /= 4294967296, (c += .5) * (e.random() > .5 ? 1 : -1)
                        }
                      }, a = 0; a < t; a += 4) {
                      var u = c(4294967296 * (n || e.random()));
                      n = 987654071 * u(), o.push(4294967296 * u() | 0)
                    }
                    return new r.init(o, t)
                  }
                }),
                u = o.enc = {},
                i = u.Hex = {
                  stringify: function (e) {
                    for (var t = e.words, n = e.sigBytes, o = [], c = 0; c < n; c++) {
                      var a = t[c >>> 2] >>> 24 - c % 4 * 8 & 255;
                      o.push((a >>> 4).toString(16)), o.push((15 & a).toString(16))
                    }
                    return o.join("")
                  },
                  parse: function (e) {
                    for (var t = e.length, n = [], o = 0; o < t; o += 2) n[o >>> 3] |= parseInt(e.substr(o, 2), 16) << 24 - o % 8 * 4;
                    return new r.init(n, t / 2)
                  }
                },
                s = u.Latin1 = {
                  stringify: function (e) {
                    for (var t = e.words, n = e.sigBytes, o = [], c = 0; c < n; c++) {
                      var a = t[c >>> 2] >>> 24 - c % 4 * 8 & 255;
                      o.push(String.fromCharCode(a))
                    }
                    return o.join("")
                  },
                  parse: function (e) {
                    for (var t = e.length, n = [], o = 0; o < t; o++) n[o >>> 2] |= (255 & e.charCodeAt(o)) << 24 - o % 4 * 8;
                    return new r.init(n, t)
                  }
                },
                y = u.Utf8 = {
                  stringify: function (e) {
                    try {
                      return decodeURIComponent(escape(s.stringify(e)))
                    } catch (e) {
                      throw new Error("Malformed UTF-8 data")
                    }
                  },
                  parse: function (e) {
                    return s.parse(unescape(encodeURIComponent(e)))
                  }
                },
                d = c.BufferedBlockAlgorithm = a.extend({
                  reset: function () {
                    this._data = new r.init, this._nDataBytes = 0
                  },
                  _append: function (e) {
                    "string" == typeof e && (e = y.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
                  },
                  _process: function (t) {
                    var n = this._data,
                      o = n.words,
                      c = n.sigBytes,
                      a = this.blockSize,
                      u = c / (4 * a),
                      i = (u = t ? e.ceil(u) : e.max((0 | u) - this._minBufferSize, 0)) * a,
                      s = e.min(4 * i, c);
                    if (i) {
                      for (var y = 0; y < i; y += a) this._doProcessBlock(o, y);
                      var d = o.splice(0, i);
                      n.sigBytes -= s
                    }
                    return new r.init(d, s)
                  },
                  clone: function () {
                    var e = a.clone.call(this);
                    return e._data = this._data.clone(), e
                  },
                  _minBufferSize: 0
                });
              c.Hasher = d.extend({
                cfg: a.extend(),
                init: function (e) {
                  this.cfg = this.cfg.extend(e), this.reset()
                },
                reset: function () {
                  d.reset.call(this), this._doReset()
                },
                update: function (e) {
                  return this._append(e), this._process(), this
                },
                finalize: function (e) {
                  return e && this._append(e), this._doFinalize()
                },
                blockSize: 16,
                _createHelper: function (e) {
                  return function (t, n) {
                    return new e.init(n).finalize(t)
                  }
                },
                _createHmacHelper: function (e) {
                  return function (t, n) {
                    return new l.HMAC.init(e, n).finalize(t)
                  }
                }
              });
              var l = o.algo = {};
              return o
            }(Math)
          })),
          S = (k((function (e, t) {
            var n;
            e.exports = (n = O, function (e) {
              var t = n,
                o = t.lib,
                c = o.WordArray,
                a = o.Hasher,
                r = t.algo,
                u = [];
              ! function () {
                for (var t = 0; t < 64; t++) u[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0
              }();
              var i = r.MD5 = a.extend({
                _doReset: function () {
                  this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878])
                },
                _doProcessBlock: function (e, t) {
                  for (var n = 0; n < 16; n++) {
                    var o = t + n,
                      c = e[o];
                    e[o] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8)
                  }
                  var a = this._hash.words,
                    r = e[t + 0],
                    i = e[t + 1],
                    f = e[t + 2],
                    m = e[t + 3],
                    p = e[t + 4],
                    h = e[t + 5],
                    C = e[t + 6],
                    g = e[t + 7],
                    v = e[t + 8],
                    N = e[t + 9],
                    b = e[t + 10],
                    _ = e[t + 11],
                    x = e[t + 12],
                    w = e[t + 13],
                    k = e[t + 14],
                    O = e[t + 15],
                    S = a[0],
                    P = a[1],
                    A = a[2],
                    T = a[3];
                  S = s(S, P, A, T, r, 7, u[0]), T = s(T, S, P, A, i, 12, u[1]), A = s(A, T, S, P, f, 17, u[2]), P = s(P, A, T, S, m, 22, u[3]), S = s(S, P, A, T, p, 7, u[4]), T = s(T, S, P, A, h, 12, u[5]), A = s(A, T, S, P, C, 17, u[6]), P = s(P, A, T, S, g, 22, u[7]), S = s(S, P, A, T, v, 7, u[8]), T = s(T, S, P, A, N, 12, u[9]), A = s(A, T, S, P, b, 17, u[10]), P = s(P, A, T, S, _, 22, u[11]), S = s(S, P, A, T, x, 7, u[12]), T = s(T, S, P, A, w, 12, u[13]), A = s(A, T, S, P, k, 17, u[14]), S = y(S, P = s(P, A, T, S, O, 22, u[15]), A, T, i, 5, u[16]), T = y(T, S, P, A, C, 9, u[17]), A = y(A, T, S, P, _, 14, u[18]), P = y(P, A, T, S, r, 20, u[19]), S = y(S, P, A, T, h, 5, u[20]), T = y(T, S, P, A, b, 9, u[21]), A = y(A, T, S, P, O, 14, u[22]), P = y(P, A, T, S, p, 20, u[23]), S = y(S, P, A, T, N, 5, u[24]), T = y(T, S, P, A, k, 9, u[25]), A = y(A, T, S, P, m, 14, u[26]), P = y(P, A, T, S, v, 20, u[27]), S = y(S, P, A, T, w, 5, u[28]), T = y(T, S, P, A, f, 9, u[29]), A = y(A, T, S, P, g, 14, u[30]), S = d(S, P = y(P, A, T, S, x, 20, u[31]), A, T, h, 4, u[32]), T = d(T, S, P, A, v, 11, u[33]), A = d(A, T, S, P, _, 16, u[34]), P = d(P, A, T, S, k, 23, u[35]), S = d(S, P, A, T, i, 4, u[36]), T = d(T, S, P, A, p, 11, u[37]), A = d(A, T, S, P, g, 16, u[38]), P = d(P, A, T, S, b, 23, u[39]), S = d(S, P, A, T, w, 4, u[40]), T = d(T, S, P, A, r, 11, u[41]), A = d(A, T, S, P, m, 16, u[42]), P = d(P, A, T, S, C, 23, u[43]), S = d(S, P, A, T, N, 4, u[44]), T = d(T, S, P, A, x, 11, u[45]), A = d(A, T, S, P, O, 16, u[46]), S = l(S, P = d(P, A, T, S, f, 23, u[47]), A, T, r, 6, u[48]), T = l(T, S, P, A, g, 10, u[49]), A = l(A, T, S, P, k, 15, u[50]), P = l(P, A, T, S, h, 21, u[51]), S = l(S, P, A, T, x, 6, u[52]), T = l(T, S, P, A, m, 10, u[53]), A = l(A, T, S, P, b, 15, u[54]), P = l(P, A, T, S, i, 21, u[55]), S = l(S, P, A, T, v, 6, u[56]), T = l(T, S, P, A, O, 10, u[57]), A = l(A, T, S, P, C, 15, u[58]), P = l(P, A, T, S, w, 21, u[59]), S = l(S, P, A, T, p, 6, u[60]), T = l(T, S, P, A, _, 10, u[61]), A = l(A, T, S, P, f, 15, u[62]), P = l(P, A, T, S, N, 21, u[63]), a[0] = a[0] + S | 0, a[1] = a[1] + P | 0, a[2] = a[2] + A | 0, a[3] = a[3] + T | 0
                },
                _doFinalize: function () {
                  var t = this._data,
                    n = t.words,
                    o = 8 * this._nDataBytes,
                    c = 8 * t.sigBytes;
                  n[c >>> 5] |= 128 << 24 - c % 32;
                  var a = e.floor(o / 4294967296),
                    r = o;
                  n[15 + (c + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), n[14 + (c + 64 >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), t.sigBytes = 4 * (n.length + 1), this._process();
                  for (var u = this._hash, i = u.words, s = 0; s < 4; s++) {
                    var y = i[s];
                    i[s] = 16711935 & (y << 8 | y >>> 24) | 4278255360 & (y << 24 | y >>> 8)
                  }
                  return u
                },
                clone: function () {
                  var e = a.clone.call(this);
                  return e._hash = this._hash.clone(), e
                }
              });

              function s(e, t, n, o, c, a, r) {
                var u = e + (t & n | ~t & o) + c + r;
                return (u << a | u >>> 32 - a) + t
              }

              function y(e, t, n, o, c, a, r) {
                var u = e + (t & o | n & ~o) + c + r;
                return (u << a | u >>> 32 - a) + t
              }

              function d(e, t, n, o, c, a, r) {
                var u = e + (t ^ n ^ o) + c + r;
                return (u << a | u >>> 32 - a) + t
              }

              function l(e, t, n, o, c, a, r) {
                var u = e + (n ^ (t | ~o)) + c + r;
                return (u << a | u >>> 32 - a) + t
              }
              t.MD5 = a._createHelper(i), t.HmacMD5 = a._createHmacHelper(i)
            }(Math), n.MD5)
          })), k((function (e, t) {
            var n;
            e.exports = (n = O, void
              function () {
                var e = n,
                  t = e.lib.Base,
                  o = e.enc.Utf8;
                e.algo.HMAC = t.extend({
                  init: function (e, t) {
                    e = this._hasher = new e.init, "string" == typeof t && (t = o.parse(t));
                    var n = e.blockSize,
                      c = 4 * n;
                    t.sigBytes > c && (t = e.finalize(t)), t.clamp();
                    for (var a = this._oKey = t.clone(), r = this._iKey = t.clone(), u = a.words, i = r.words, s = 0; s < n; s++) u[s] ^= 1549556828, i[s] ^= 909522486;
                    a.sigBytes = r.sigBytes = c, this.reset()
                  },
                  reset: function () {
                    var e = this._hasher;
                    e.reset(), e.update(this._iKey)
                  },
                  update: function (e) {
                    return this._hasher.update(e), this
                  },
                  finalize: function (e) {
                    var t = this._hasher,
                      n = t.finalize(e);
                    return t.reset(), t.finalize(this._oKey.clone().concat(n))
                  }
                })
              }())
          })), k((function (e, t) {
            e.exports = O.HmacMD5
          }))),
          P = k((function (e, t) {
            e.exports = O.enc.Utf8
          })),
          A = k((function (e, t) {
            var n;
            e.exports = (n = O, function () {
              var e = n,
                t = e.lib.WordArray;

              function o(e, n, o) {
                for (var c = [], a = 0, r = 0; r < n; r++)
                  if (r % 4) {
                    var u = o[e.charCodeAt(r - 1)] << r % 4 * 2,
                      i = o[e.charCodeAt(r)] >>> 6 - r % 4 * 2;
                    c[a >>> 2] |= (u | i) << 24 - a % 4 * 8, a++
                  } return t.create(c, a)
              }
              e.enc.Base64 = {
                stringify: function (e) {
                  var t = e.words,
                    n = e.sigBytes,
                    o = this._map;
                  e.clamp();
                  for (var c = [], a = 0; a < n; a += 3)
                    for (var r = (t[a >>> 2] >>> 24 - a % 4 * 8 & 255) << 16 | (t[a + 1 >>> 2] >>> 24 - (a + 1) % 4 * 8 & 255) << 8 | t[a + 2 >>> 2] >>> 24 - (a + 2) % 4 * 8 & 255, u = 0; u < 4 && a + .75 * u < n; u++) c.push(o.charAt(r >>> 6 * (3 - u) & 63));
                  var i = o.charAt(64);
                  if (i)
                    for (; c.length % 4;) c.push(i);
                  return c.join("")
                },
                parse: function (e) {
                  var t = e.length,
                    n = this._map,
                    c = this._reverseMap;
                  if (!c) {
                    c = this._reverseMap = [];
                    for (var a = 0; a < n.length; a++) c[n.charCodeAt(a)] = a
                  }
                  var r = n.charAt(64);
                  if (r) {
                    var u = e.indexOf(r); - 1 !== u && (t = u)
                  }
                  return o(e, t, c)
                },
                _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
              }
            }(), n.enc.Base64)
          })),
          T = "uni_id_token",
          I = "uni_id_token_expired",
          j = "FUNCTION",
          E = "OBJECT",
          $ = "CLIENT_DB",
          D = "pending",
          L = "rejected";

        function M(e) {
          return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
        }

        function U(e) {
          return "object" === M(e)
        }

        function R(e) {
          return "function" == typeof e
        }

        function F(e) {
          return function () {
            try {
              return e.apply(e, arguments)
            } catch (e) {
              console.error(e)
            }
          }
        }
        var q = "REJECTED",
          B = "NOT_PENDING",
          V = function () {
            function e() {
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                n = t.createPromise,
                o = t.retryRule,
                c = void 0 === o ? q : o;
              (0, C.default)(this, e), this.createPromise = n, this.status = null, this.promise = null, this.retryRule = c
            }
            return (0, g.default)(e, [{
              key: "needRetry",
              get: function () {
                if (!this.status) return !0;
                switch (this.retryRule) {
                  case q:
                    return this.status === L;
                  case B:
                    return this.status !== D
                }
              }
            }, {
              key: "exec",
              value: function () {
                var e = this;
                return this.needRetry ? (this.status = D, this.promise = this.createPromise().then((function (t) {
                  return e.status = "fulfilled", Promise.resolve(t)
                }), (function (t) {
                  return e.status = L, Promise.reject(t)
                })), this.promise) : this.promise
              }
            }]), e
          }(),
          H = function () {
            function e() {
              (0, C.default)(this, e), this._callback = {}
            }
            return (0, g.default)(e, [{
              key: "addListener",
              value: function (e, t) {
                this._callback[e] || (this._callback[e] = []), this._callback[e].push(t)
              }
            }, {
              key: "on",
              value: function (e, t) {
                return this.addListener(e, t)
              }
            }, {
              key: "removeListener",
              value: function (e, t) {
                if (!t) throw new Error('The "listener" argument must be of type function. Received undefined');
                var n = this._callback[e];
                if (n) {
                  var o = function (e, t) {
                    for (var n = e.length - 1; n >= 0; n--)
                      if (e[n] === t) return n;
                    return -1
                  }(n, t);
                  n.splice(o, 1)
                }
              }
            }, {
              key: "off",
              value: function (e, t) {
                return this.removeListener(e, t)
              }
            }, {
              key: "removeAllListener",
              value: function (e) {
                delete this._callback[e]
              }
            }, {
              key: "emit",
              value: function (e) {
                for (var t = this._callback[e], n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), c = 1; c < n; c++) o[c - 1] = arguments[c];
                if (t)
                  for (var a = 0; a < t.length; a++) t[a].apply(t, o)
              }
            }]), e
          }();

        function z(e) {
          return e && "string" == typeof e ? JSON.parse(e) : e
        }
        var K = z([]),
          W = "mp-weixin",
          J = (z(void 0), z([]) || []);
        try {
          (n("b81f").default || n("b81f")).appid
        } catch (e) {}
        var G = {};

        function Q(e) {
          var t, n, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return t = G, n = e, Object.prototype.hasOwnProperty.call(t, n) || (G[e] = o), G[e]
        }
        var Y = ["invoke", "success", "fail", "complete"],
          Z = Q("_globalUniCloudInterceptor");

        function X(e, t) {
          Z[e] || (Z[e] = {}), U(t) && Object.keys(t).forEach((function (n) {
            Y.indexOf(n) > -1 && function (e, t, n) {
              var o = Z[e][t];
              o || (o = Z[e][t] = []), -1 === o.indexOf(n) && R(n) && o.push(n)
            }(e, n, t[n])
          }))
        }

        function ee(e, t) {
          Z[e] || (Z[e] = {}), U(t) ? Object.keys(t).forEach((function (n) {
            Y.indexOf(n) > -1 && function (e, t, n) {
              var o = Z[e][t];
              if (o) {
                var c = o.indexOf(n);
                c > -1 && o.splice(c, 1)
              }
            }(e, n, t[n])
          })) : delete Z[e]
        }

        function te(e, t) {
          return e && 0 !== e.length ? e.reduce((function (e, n) {
            return e.then((function () {
              return n(t)
            }))
          }), Promise.resolve()) : Promise.resolve()
        }

        function ne(e, t) {
          return Z[e] && Z[e][t] || []
        }

        function oe(e) {
          X("callObject", e)
        }
        var ce = Q("_globalUniCloudListener"),
          ae = "response",
          re = "needLogin",
          ue = "refreshToken",
          ie = "clientdb",
          se = "cloudfunction",
          ye = "cloudobject";

        function de(e) {
          return ce[e] || (ce[e] = []), ce[e]
        }

        function le(e, t) {
          var n = de(e);
          n.includes(t) || n.push(t)
        }

        function fe(e, t) {
          var n = de(e),
            o = n.indexOf(t); - 1 !== o && n.splice(o, 1)
        }

        function me(e, t) {
          for (var n = de(e), o = 0; o < n.length; o++)(0, n[o])(t)
        }
        var pe, he = !1;

        function Ce() {
          return pe || (pe = new Promise((function (e) {
            he && e(),
              function t() {
                if ("function" == typeof getCurrentPages) {
                  var n = getCurrentPages();
                  n && n[0] && (he = !0, e())
                }
                he || setTimeout((function () {
                  t()
                }), 30)
              }()
          })))
        }

        function ge(e) {
          var t = {};
          for (var n in e) {
            var o = e[n];
            R(o) && (t[n] = F(o))
          }
          return t
        }
        var ve = function (e) {
          (0, f.default)(n, e);
          var t = w(n);

          function n(e) {
            var o;
            return (0, C.default)(this, n), (o = t.call(this, e.message)).errMsg = e.message || e.errMsg || "unknown system error", o.code = o.errCode = e.code || e.errCode || "SYSTEM_ERROR", o.errSubject = o.subject = e.subject || e.errSubject, o.cause = e.cause, o.requestId = e.requestId, o
          }
          return (0, g.default)(n, [{
            key: "toJson",
            value: function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
              if (!(e >= 10)) return e++, {
                errCode: this.errCode,
                errMsg: this.errMsg,
                errSubject: this.errSubject,
                cause: this.cause && this.cause.toJson ? this.cause.toJson(e) : this.cause
              }
            }
          }]), n
        }((0, h.default)(Error));
        t.UniCloudError = ve;
        var Ne, be, _e = {
          request: function (e) {
            return o.request(e)
          },
          uploadFile: function (e) {
            return o.uploadFile(e)
          },
          setStorageSync: function (e, t) {
            return o.setStorageSync(e, t)
          },
          getStorageSync: function (e) {
            return o.getStorageSync(e)
          },
          removeStorageSync: function (e) {
            return o.removeStorageSync(e)
          },
          clearStorageSync: function () {
            return o.clearStorageSync()
          },
          connectSocket: function (e) {
            return o.connectSocket(e)
          }
        };

        function xe() {
          return {
            token: _e.getStorageSync(T) || _e.getStorageSync("uniIdToken"),
            tokenExpired: _e.getStorageSync(I)
          }
        }

        function we() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.token,
            n = e.tokenExpired;
          t && _e.setStorageSync(T, t), n && _e.setStorageSync(I, n)
        }

        function ke() {
          return Ne || (Ne = o.getSystemInfoSync()), Ne
        }
        var Oe = {};

        function Se() {
          var e = o.getLocale && o.getLocale() || "en";
          if (be) return x(x(x({}, Oe), be), {}, {
            locale: e,
            LOCALE: e
          });
          var t = ke(),
            n = t.deviceId,
            c = t.osName,
            a = t.uniPlatform,
            r = t.appId,
            u = ["appId", "appLanguage", "appName", "appVersion", "appVersionCode", "appWgtVersion", "browserName", "browserVersion", "deviceBrand", "deviceId", "deviceModel", "deviceType", "osName", "osVersion", "romName", "romVersion", "ua", "hostName", "hostVersion", "uniPlatform", "uniRuntimeVersion", "uniRuntimeVersionCode", "uniCompilerVersion", "uniCompilerVersionCode"];
          for (var i in t) Object.hasOwnProperty.call(t, i) && -1 === u.indexOf(i) && delete t[i];
          return be = x(x({
            PLATFORM: a,
            OS: c,
            APPID: r,
            DEVICEID: n
          }, function () {
            var e, t;
            try {
              if (o.getLaunchOptionsSync) {
                if (o.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1) return;
                var n = o.getLaunchOptionsSync(),
                  c = n.scene;
                e = n.channel, t = c
              }
            } catch (e) {}
            return {
              channel: e,
              scene: t
            }
          }()), t), x(x(x({}, Oe), be), {}, {
            locale: e,
            LOCALE: e
          })
        }
        var Pe, Ae = function (e, t) {
            var n = "";
            return Object.keys(e).sort().forEach((function (t) {
              e[t] && (n = n + "&" + t + "=" + e[t])
            })), n = n.slice(1), S(n, t).toString()
          },
          Te = function (e, t) {
            return new Promise((function (n, o) {
              t(Object.assign(e, {
                complete: function (e) {
                  e || (e = {});
                  var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];
                  if (!e.statusCode || e.statusCode >= 400) {
                    var c = e.data && e.data.error && e.data.error.code || "SYS_ERR",
                      a = e.data && e.data.error && e.data.error.message || e.errMsg || "request:fail";
                    return o(new ve({
                      code: c,
                      message: a,
                      requestId: t
                    }))
                  }
                  var r = e.data;
                  if (r.error) return o(new ve({
                    code: r.error.code,
                    message: r.error.message,
                    requestId: t
                  }));
                  r.result = r.data, r.requestId = t, delete r.data, n(r)
                }
              }))
            }))
          },
          Ie = function (e) {
            return A.stringify(P.parse(e))
          },
          je = function () {
            function e(t) {
              var n = this;
              (0, C.default)(this, e), ["spaceId", "clientSecret"].forEach((function (e) {
                if (!Object.prototype.hasOwnProperty.call(t, e)) throw new Error("".concat(e, " required"))
              })), this.config = Object.assign({}, {
                endpoint: 0 === t.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com"
              }, t), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = _e, this._getAccessTokenPromiseHub = new V({
                createPromise: function () {
                  return n.requestAuth(n.setupRequest({
                    method: "serverless.auth.user.anonymousAuthorize",
                    params: "{}"
                  }, "auth")).then((function (e) {
                    if (!e.result || !e.result.accessToken) throw new ve({
                      code: "AUTH_FAILED",
                      message: "获取accessToken失败"
                    });
                    n.setAccessToken(e.result.accessToken)
                  }))
                },
                retryRule: B
              })
            }
            return (0, g.default)(e, [{
              key: "hasAccessToken",
              get: function () {
                return !!this.accessToken
              }
            }, {
              key: "setAccessToken",
              value: function (e) {
                this.accessToken = e
              }
            }, {
              key: "requestWrapped",
              value: function (e) {
                return Te(e, this.adapter.request)
              }
            }, {
              key: "requestAuth",
              value: function (e) {
                return this.requestWrapped(e)
              }
            }, {
              key: "request",
              value: function (e, t) {
                var n = this;
                return Promise.resolve().then((function () {
                  return n.hasAccessToken ? t ? n.requestWrapped(e) : n.requestWrapped(e).catch((function (t) {
                    return new Promise((function (e, n) {
                      !t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? n(t) : e()
                    })).then((function () {
                      return n.getAccessToken()
                    })).then((function () {
                      var t = n.rebuildRequest(e);
                      return n.request(t, !0)
                    }))
                  })) : n.getAccessToken().then((function () {
                    var t = n.rebuildRequest(e);
                    return n.request(t, !0)
                  }))
                }))
              }
            }, {
              key: "rebuildRequest",
              value: function (e) {
                var t = Object.assign({}, e);
                return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = Ae(t.data, this.config.clientSecret), t
              }
            }, {
              key: "setupRequest",
              value: function (e, t) {
                var n = Object.assign({}, e, {
                    spaceId: this.config.spaceId,
                    timestamp: Date.now()
                  }),
                  o = {
                    "Content-Type": "application/json"
                  };
                return "auth" !== t && (n.token = this.accessToken, o["x-basement-token"] = this.accessToken), o["x-serverless-sign"] = Ae(n, this.config.clientSecret), {
                  url: this.config.requestUrl,
                  method: "POST",
                  data: n,
                  dataType: "json",
                  header: o
                }
              }
            }, {
              key: "getAccessToken",
              value: function () {
                return this._getAccessTokenPromiseHub.exec()
              }
            }, {
              key: "authorize",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e() {
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.getAccessToken();
                      case 2:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function () {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "callFunction",
              value: function (e) {
                var t = {
                  method: "serverless.function.runtime.invoke",
                  params: JSON.stringify({
                    functionTarget: e.name,
                    functionArgs: e.data || {}
                  })
                };
                return this.request(x(x({}, this.setupRequest(t)), {}, {
                  timeout: e.timeout
                }))
              }
            }, {
              key: "getOSSUploadOptionsFromPath",
              value: function (e) {
                var t = {
                  method: "serverless.file.resource.generateProximalSign",
                  params: JSON.stringify(e)
                };
                return this.request(this.setupRequest(t))
              }
            }, {
              key: "uploadFileToOSS",
              value: function (e) {
                var t = this,
                  n = e.url,
                  o = e.formData,
                  c = e.name,
                  a = e.filePath,
                  r = e.fileType,
                  u = e.onUploadProgress;
                return new Promise((function (e, i) {
                  var s = t.adapter.uploadFile({
                    url: n,
                    formData: o,
                    name: c,
                    filePath: a,
                    fileType: r,
                    header: {
                      "X-OSS-server-side-encrpytion": "AES256"
                    },
                    success: function (t) {
                      t && t.statusCode < 400 ? e(t) : i(new ve({
                        code: "UPLOAD_FAILED",
                        message: "文件上传失败"
                      }))
                    },
                    fail: function (e) {
                      i(new ve({
                        code: e.code || "UPLOAD_FAILED",
                        message: e.message || e.errMsg || "文件上传失败"
                      }))
                    }
                  });
                  "function" == typeof u && s && "function" == typeof s.onProgressUpdate && s.onProgressUpdate((function (e) {
                    u({
                      loaded: e.totalBytesSent,
                      total: e.totalBytesExpectedToSend
                    })
                  }))
                }))
              }
            }, {
              key: "reportOSSUpload",
              value: function (e) {
                var t = {
                  method: "serverless.file.resource.report",
                  params: JSON.stringify(e)
                };
                return this.request(this.setupRequest(t))
              }
            }, {
              key: "uploadFile",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t) {
                  var n, o, c, a, u, i, s, y, d, l, f, m, p, h, C, g, v, N, b, _, x, w;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (n = t.filePath, o = t.cloudPath, c = t.fileType, a = void 0 === c ? "image" : c, u = t.cloudPathAsRealPath, i = void 0 !== u && u, s = t.onUploadProgress, y = t.config, "string" === M(o)) {
                          e.next = 3;
                          break
                        }
                        throw new ve({
                          code: "INVALID_PARAM",
                          message: "cloudPath必须为字符串类型"
                        });
                      case 3:
                        if (o = o.trim()) {
                          e.next = 5;
                          break
                        }
                        throw new ve({
                          code: "INVALID_PARAM",
                          message: "cloudPath不可为空"
                        });
                      case 5:
                        if (!/:\/\//.test(o)) {
                          e.next = 7;
                          break
                        }
                        throw new ve({
                          code: "INVALID_PARAM",
                          message: "cloudPath不合法"
                        });
                      case 7:
                        if (d = y && y.envType || this.config.envType, !(i && ("/" !== o[0] && (o = "/" + o), o.indexOf("\\") > -1))) {
                          e.next = 10;
                          break
                        }
                        throw new ve({
                          code: "INVALID_PARAM",
                          message: "使用cloudPath作为路径时，cloudPath不可包含“\\”"
                        });
                      case 10:
                        return e.next = 12, this.getOSSUploadOptionsFromPath({
                          env: d,
                          filename: i ? o.split("/").pop() : o,
                          fileId: i ? o : void 0
                        });
                      case 12:
                        return l = e.sent.result, f = "https://" + l.cdnDomain + "/" + l.ossPath, m = l.securityToken, p = l.accessKeyId, h = l.signature, C = l.host, g = l.ossPath, v = l.id, N = l.policy, b = l.ossCallbackUrl, _ = {
                          "Cache-Control": "max-age=2592000",
                          "Content-Disposition": "attachment",
                          OSSAccessKeyId: p,
                          Signature: h,
                          host: C,
                          id: v,
                          key: g,
                          policy: N,
                          success_action_status: 200
                        }, m && (_["x-oss-security-token"] = m), b && (x = JSON.stringify({
                          callbackUrl: b,
                          callbackBody: JSON.stringify({
                            fileId: v,
                            spaceId: this.config.spaceId
                          }),
                          callbackBodyType: "application/json"
                        }), _.callback = Ie(x)), w = {
                          url: "https://" + l.host,
                          formData: _,
                          fileName: "file",
                          name: "file",
                          filePath: n,
                          fileType: a
                        }, e.next = 27, this.uploadFileToOSS(Object.assign({}, w, {
                          onUploadProgress: s
                        }));
                      case 27:
                        if (!b) {
                          e.next = 29;
                          break
                        }
                        return e.abrupt("return", {
                          success: !0,
                          filePath: n,
                          fileID: f
                        });
                      case 29:
                        return e.next = 31, this.reportOSSUpload({
                          id: v
                        });
                      case 31:
                        if (!e.sent.success) {
                          e.next = 33;
                          break
                        }
                        return e.abrupt("return", {
                          success: !0,
                          filePath: n,
                          fileID: f
                        });
                      case 33:
                        throw new ve({
                          code: "UPLOAD_FAILED",
                          message: "文件上传失败"
                        });
                      case 34:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "getTempFileURL",
              value: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                  t = e.fileList;
                return new Promise((function (e, n) {
                  Array.isArray(t) && 0 !== t.length || n(new ve({
                    code: "INVALID_PARAM",
                    message: "fileList的元素必须是非空的字符串"
                  })), e({
                    fileList: t.map((function (e) {
                      return {
                        fileID: e,
                        tempFileURL: e
                      }
                    }))
                  })
                }))
              }
            }, {
              key: "getFileInfo",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e() {
                  var t, n, o, c = arguments;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (t = c.length > 0 && void 0 !== c[0] ? c[0] : {}, n = t.fileList, Array.isArray(n) && 0 !== n.length) {
                          e.next = 3;
                          break
                        }
                        throw new ve({
                          code: "INVALID_PARAM",
                          message: "fileList的元素必须是非空的字符串"
                        });
                      case 3:
                        return o = {
                          method: "serverless.file.resource.info",
                          params: JSON.stringify({
                            id: n.map((function (e) {
                              return e.split("?")[0]
                            })).join(",")
                          })
                        }, e.next = 6, this.request(this.setupRequest(o));
                      case 6:
                        return e.t0 = e.sent.result, e.abrupt("return", {
                          fileList: e.t0
                        });
                      case 8:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function () {
                  return e.apply(this, arguments)
                }
              }()
            }]), e
          }(),
          Ee = {
            init: function (e) {
              var t = new je(e),
                n = {
                  signInAnonymously: function () {
                    return t.authorize()
                  },
                  getLoginState: function () {
                    return Promise.resolve(!1)
                  }
                };
              return t.auth = function () {
                return n
              }, t.customAuth = t.auth, t
            }
          },
          $e = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
        ! function (e) {
          e.local = "local", e.none = "none", e.session = "session"
        }(Pe || (Pe = {}));
        var De, Le = k((function (e, t) {
            var n;
            e.exports = (n = O, function (e) {
              var t = n,
                o = t.lib,
                c = o.WordArray,
                a = o.Hasher,
                r = t.algo,
                u = [],
                i = [];
              ! function () {
                function t(t) {
                  for (var n = e.sqrt(t), o = 2; o <= n; o++)
                    if (!(t % o)) return !1;
                  return !0
                }

                function n(e) {
                  return 4294967296 * (e - (0 | e)) | 0
                }
                for (var o = 2, c = 0; c < 64;) t(o) && (c < 8 && (u[c] = n(e.pow(o, .5))), i[c] = n(e.pow(o, 1 / 3)), c++), o++
              }();
              var s = [],
                y = r.SHA256 = a.extend({
                  _doReset: function () {
                    this._hash = new c.init(u.slice(0))
                  },
                  _doProcessBlock: function (e, t) {
                    for (var n = this._hash.words, o = n[0], c = n[1], a = n[2], r = n[3], u = n[4], y = n[5], d = n[6], l = n[7], f = 0; f < 64; f++) {
                      if (f < 16) s[f] = 0 | e[t + f];
                      else {
                        var m = s[f - 15],
                          p = (m << 25 | m >>> 7) ^ (m << 14 | m >>> 18) ^ m >>> 3,
                          h = s[f - 2],
                          C = (h << 15 | h >>> 17) ^ (h << 13 | h >>> 19) ^ h >>> 10;
                        s[f] = p + s[f - 7] + C + s[f - 16]
                      }
                      var g = o & c ^ o & a ^ c & a,
                        v = (o << 30 | o >>> 2) ^ (o << 19 | o >>> 13) ^ (o << 10 | o >>> 22),
                        N = l + ((u << 26 | u >>> 6) ^ (u << 21 | u >>> 11) ^ (u << 7 | u >>> 25)) + (u & y ^ ~u & d) + i[f] + s[f];
                      l = d, d = y, y = u, u = r + N | 0, r = a, a = c, c = o, o = N + (v + g) | 0
                    }
                    n[0] = n[0] + o | 0, n[1] = n[1] + c | 0, n[2] = n[2] + a | 0, n[3] = n[3] + r | 0, n[4] = n[4] + u | 0, n[5] = n[5] + y | 0, n[6] = n[6] + d | 0, n[7] = n[7] + l | 0
                  },
                  _doFinalize: function () {
                    var t = this._data,
                      n = t.words,
                      o = 8 * this._nDataBytes,
                      c = 8 * t.sigBytes;
                    return n[c >>> 5] |= 128 << 24 - c % 32, n[14 + (c + 64 >>> 9 << 4)] = e.floor(o / 4294967296), n[15 + (c + 64 >>> 9 << 4)] = o, t.sigBytes = 4 * n.length, this._process(), this._hash
                  },
                  clone: function () {
                    var e = a.clone.call(this);
                    return e._hash = this._hash.clone(), e
                  }
                });
              t.SHA256 = a._createHelper(y), t.HmacSHA256 = a._createHmacHelper(y)
            }(Math), n.SHA256)
          })),
          Me = k((function (e, t) {
            e.exports = O.HmacSHA256
          })),
          Ue = function () {
            var e;
            if (!Promise) {
              (e = function () {}).promise = {};
              var t = function () {
                throw new ve({
                  message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.'
                })
              };
              return Object.defineProperty(e.promise, "then", {
                get: t
              }), Object.defineProperty(e.promise, "catch", {
                get: t
              }), e
            }
            var n = new Promise((function (t, n) {
              e = function (e, o) {
                return e ? n(e) : t(o)
              }
            }));
            return e.promise = n, e
          };

        function Re(e) {
          return void 0 === e
        }

        function Fe(e) {
          return "[object Null]" === Object.prototype.toString.call(e)
        }

        function qe() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
          return e.replace(/([\s\S]+)\s+(请前往云开发AI小助手查看问题：.*)/, "$1")
        }

        function Be() {
          for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 32, t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = "", o = 0; o < e; o++) n += t.charAt(Math.floor(62 * Math.random()));
          return n
        }! function (e) {
          e.WEB = "web", e.WX_MP = "wx_mp"
        }(De || (De = {}));
        var Ve = {
            adapter: null,
            runtime: void 0
          },
          He = ["anonymousUuidKey"],
          ze = function (e) {
            (0, f.default)(n, e);
            var t = w(n);

            function n() {
              var e;
              return (0, C.default)(this, n), e = t.call(this), Ve.adapter.root.tcbObject || (Ve.adapter.root.tcbObject = {}), e
            }
            return (0, g.default)(n, [{
              key: "setItem",
              value: function (e, t) {
                Ve.adapter.root.tcbObject[e] = t
              }
            }, {
              key: "getItem",
              value: function (e) {
                return Ve.adapter.root.tcbObject[e]
              }
            }, {
              key: "removeItem",
              value: function (e) {
                delete Ve.adapter.root.tcbObject[e]
              }
            }, {
              key: "clear",
              value: function () {
                delete Ve.adapter.root.tcbObject
              }
            }]), n
          }((function () {}));

        function Ke(e, t) {
          switch (e) {
            case "local":
              return t.localStorage || new ze;
            case "none":
              return new ze;
            default:
              return t.sessionStorage || new ze
          }
        }
        var We = function () {
            function e(t) {
              if ((0, C.default)(this, e), !this._storage) {
                this._persistence = Ve.adapter.primaryStorage || t.persistence, this._storage = Ke(this._persistence, Ve.adapter);
                var n = "access_token_".concat(t.env),
                  o = "access_token_expire_".concat(t.env),
                  c = "refresh_token_".concat(t.env),
                  a = "anonymous_uuid_".concat(t.env),
                  r = "login_type_".concat(t.env),
                  u = "token_type_".concat(t.env),
                  i = "user_info_".concat(t.env);
                this.keys = {
                  accessTokenKey: n,
                  accessTokenExpireKey: o,
                  refreshTokenKey: c,
                  anonymousUuidKey: a,
                  loginTypeKey: r,
                  userInfoKey: i,
                  deviceIdKey: "device_id",
                  tokenTypeKey: u
                }
              }
            }
            return (0, g.default)(e, [{
              key: "updatePersistence",
              value: function (e) {
                if (e !== this._persistence) {
                  var t = "local" === this._persistence;
                  this._persistence = e;
                  var n = Ke(e, Ve.adapter);
                  for (var o in this.keys) {
                    var c = this.keys[o];
                    if (!t || !He.includes(o)) {
                      var a = this._storage.getItem(c);
                      Re(a) || Fe(a) || (n.setItem(c, a), this._storage.removeItem(c))
                    }
                  }
                  this._storage = n
                }
              }
            }, {
              key: "setStore",
              value: function (e, t, n) {
                if (this._storage) {
                  var o = {
                      version: n || "localCachev1",
                      content: t
                    },
                    c = JSON.stringify(o);
                  try {
                    this._storage.setItem(e, c)
                  } catch (e) {
                    throw e
                  }
                }
              }
            }, {
              key: "getStore",
              value: function (e, t) {
                try {
                  if (!this._storage) return
                } catch (e) {
                  return ""
                }
                t = t || "localCachev1";
                var n = this._storage.getItem(e);
                return n && n.indexOf(t) >= 0 ? JSON.parse(n).content : ""
              }
            }, {
              key: "removeStore",
              value: function (e) {
                this._storage.removeItem(e)
              }
            }]), e
          }(),
          Je = {},
          Ge = {};

        function Qe(e) {
          return Je[e]
        }
        var Ye = (0, g.default)((function e(t, n) {
            (0, C.default)(this, e), this.data = n || null, this.name = t
          })),
          Ze = function (e) {
            (0, f.default)(n, e);
            var t = w(n);

            function n(e, o) {
              var c;
              return (0, C.default)(this, n), (c = t.call(this, "error", {
                error: e,
                data: o
              })).error = e, c
            }
            return (0, g.default)(n)
          }(Ye),
          Xe = new(function () {
            function e() {
              (0, C.default)(this, e), this._listeners = {}
            }
            return (0, g.default)(e, [{
              key: "on",
              value: function (e, t) {
                return function (e, t, n) {
                  n[e] = n[e] || [], n[e].push(t)
                }(e, t, this._listeners), this
              }
            }, {
              key: "off",
              value: function (e, t) {
                return function (e, t, n) {
                  if (n && n[e]) {
                    var o = n[e].indexOf(t); - 1 !== o && n[e].splice(o, 1)
                  }
                }(e, t, this._listeners), this
              }
            }, {
              key: "fire",
              value: function (e, t) {
                if (e instanceof Ze) return console.error(e.error), this;
                var n = "string" == typeof e ? new Ye(e, t || {}) : e,
                  o = n.name;
                if (this._listens(o)) {
                  n.target = this;
                  var c, a = N(this._listeners[o] ? (0, y.default)(this._listeners[o]) : []);
                  try {
                    for (a.s(); !(c = a.n()).done;) {
                      c.value.call(this, n)
                    }
                  } catch (e) {
                    a.e(e)
                  } finally {
                    a.f()
                  }
                }
                return this
              }
            }, {
              key: "_listens",
              value: function (e) {
                return this._listeners[e] && this._listeners[e].length > 0
              }
            }]), e
          }());

        function et(e, t) {
          Xe.on(e, t)
        }

        function tt(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          Xe.fire(e, t)
        }

        function nt(e, t) {
          Xe.off(e, t)
        }
        var ot, ct = "loginStateChanged",
          at = "loginStateExpire",
          rt = "loginTypeChanged",
          ut = "anonymousConverted",
          it = "refreshAccessToken";
        ! function (e) {
          e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL"
        }(ot || (ot = {}));
        var st = function () {
            function e() {
              (0, C.default)(this, e), this._fnPromiseMap = new Map
            }
            return (0, g.default)(e, [{
              key: "run",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t, n) {
                  var o, c = this;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return o = this._fnPromiseMap.get(t), e.abrupt("return", (o || (o = new Promise(function () {
                          var e = (0, d.default)(r.default.mark((function e(o, a) {
                            var u;
                            return r.default.wrap((function (e) {
                              for (;;) switch (e.prev = e.next) {
                                case 0:
                                  return e.prev = 0, e.next = 3, c._runIdlePromise();
                                case 3:
                                  return u = n(), e.t0 = o, e.next = 7, u;
                                case 7:
                                  e.t1 = e.sent, (0, e.t0)(e.t1), e.next = 14;
                                  break;
                                case 11:
                                  e.prev = 11, e.t2 = e.catch(0), a(e.t2);
                                case 14:
                                  return e.prev = 14, c._fnPromiseMap.delete(t), e.finish(14);
                                case 17:
                                case "end":
                                  return e.stop()
                              }
                            }), e, null, [
                              [0, 11, 14, 17]
                            ])
                          })));
                          return function (t, n) {
                            return e.apply(this, arguments)
                          }
                        }()), this._fnPromiseMap.set(t, o)), o));
                      case 2:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t, n) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "_runIdlePromise",
              value: function () {
                return Promise.resolve()
              }
            }]), e
          }(),
          yt = function () {
            function e(t) {
              (0, C.default)(this, e), this._singlePromise = new st, this._cache = Qe(t.env), this._baseURL = "https://".concat(t.env, ".ap-shanghai.tcb-api.tencentcloudapi.com"), this._reqClass = new Ve.adapter.reqClass({
                timeout: t.timeout,
                timeoutMsg: "请求在".concat(t.timeout / 1e3, "s内未完成，已中断"),
                restrictedMethods: ["post"]
              })
            }
            return (0, g.default)(e, [{
              key: "_getDeviceId",
              value: function () {
                if (this._deviceID) return this._deviceID;
                var e = this._cache.keys.deviceIdKey,
                  t = this._cache.getStore(e);
                return "string" == typeof t && t.length >= 16 && t.length <= 48 || (t = Be(), this._cache.setStore(e, t)), this._deviceID = t, t
              }
            }, {
              key: "_request",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t, n) {
                  var o, c, a, u, i, s = arguments;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (o = s.length > 2 && void 0 !== s[2] ? s[2] : {}, c = {
                            "x-request-id": Be(),
                            "x-device-id": this._getDeviceId()
                          }, !o.withAccessToken) {
                          e.next = 9;
                          break
                        }
                        return a = this._cache.keys.tokenTypeKey, e.next = 6, this.getAccessToken();
                      case 6:
                        u = e.sent, i = this._cache.getStore(a), c.authorization = "".concat(i, " ").concat(u);
                      case 9:
                        return e.abrupt("return", this._reqClass["get" === o.method ? "get" : "post"]({
                          url: "".concat(this._baseURL).concat(t),
                          data: n,
                          headers: c
                        }));
                      case 10:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t, n) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "_fetchAccessToken",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e() {
                  var t, n, o, c, a, u, i, s, y, l, f = this;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (t = this._cache.keys, n = t.loginTypeKey, o = t.accessTokenKey, c = t.accessTokenExpireKey, a = t.tokenTypeKey, !(u = this._cache.getStore(n)) || u === ot.ANONYMOUS) {
                          e.next = 3;
                          break
                        }
                        throw new ve({
                          code: "INVALID_OPERATION",
                          message: "非匿名登录不支持刷新 access token"
                        });
                      case 3:
                        return e.next = 5, this._singlePromise.run("fetchAccessToken", (0, d.default)(r.default.mark((function e() {
                          return r.default.wrap((function (e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return e.next = 2, f._request("/auth/v1/signin/anonymously", {}, {
                                  method: "post"
                                });
                              case 2:
                                return e.abrupt("return", e.sent.data);
                              case 3:
                              case "end":
                                return e.stop()
                            }
                          }), e)
                        }))));
                      case 5:
                        return i = e.sent, s = i.access_token, y = i.expires_in, l = i.token_type, e.abrupt("return", (this._cache.setStore(a, l), this._cache.setStore(o, s), this._cache.setStore(c, Date.now() + 1e3 * y), s));
                      case 10:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function () {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "isAccessTokenExpired",
              value: function (e, t) {
                var n = !0;
                return e && t && (n = t < Date.now()), n
              }
            }, {
              key: "getAccessToken",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e() {
                  var t, n, o, c, a;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return t = this._cache.keys, n = t.accessTokenKey, o = t.accessTokenExpireKey, c = this._cache.getStore(n), a = this._cache.getStore(o), e.abrupt("return", this.isAccessTokenExpired(c, a) ? this._fetchAccessToken() : c);
                      case 2:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function () {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "refreshAccessToken",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e() {
                  var t, n, o, c;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return t = this._cache.keys, n = t.accessTokenKey, o = t.accessTokenExpireKey, c = t.loginTypeKey, e.abrupt("return", (this._cache.removeStore(n), this._cache.removeStore(o), this._cache.setStore(c, ot.ANONYMOUS), this.getAccessToken()));
                      case 2:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function () {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "getUserInfo",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e() {
                  var t = this;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.abrupt("return", this._singlePromise.run("getUserInfo", (0, d.default)(r.default.mark((function e() {
                          return r.default.wrap((function (e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return e.next = 2, t._request("/auth/v1/user/me", {}, {
                                  withAccessToken: !0,
                                  method: "get"
                                });
                              case 2:
                                return e.abrupt("return", e.sent.data);
                              case 3:
                              case "end":
                                return e.stop()
                            }
                          }), e)
                        })))));
                      case 1:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function () {
                  return e.apply(this, arguments)
                }
              }()
            }]), e
          }(),
          dt = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],
          lt = {
            "X-SDK-Version": "1.3.5"
          };

        function ft(e, t, n) {
          var o = e[t];
          e[t] = function (t) {
            var c = {},
              a = {};
            n.forEach((function (n) {
              var o = n.call(e, t),
                r = o.data,
                u = o.headers;
              Object.assign(c, r), Object.assign(a, u)
            }));
            var r = t.data;
            return r && function () {
              var e;
              if (e = r, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = x(x({}, r), c);
              else
                for (var n in c) r.append(n, c[n])
            }(), t.headers = x(x({}, t.headers || {}), a), o.call(e, t)
          }
        }

        function mt() {
          var e = Math.random().toString(16).slice(2);
          return {
            data: {
              seqId: e
            },
            headers: x(x({}, lt), {}, {
              "x-seqid": e
            })
          }
        }
        var pt = function () {
            function e() {
              var t, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              (0, C.default)(this, e), this.config = n, this._reqClass = new Ve.adapter.reqClass({
                timeout: this.config.timeout,
                timeoutMsg: "请求在".concat(this.config.timeout / 1e3, "s内未完成，已中断"),
                restrictedMethods: ["post"]
              }), this._cache = Qe(this.config.env), this._localCache = (t = this.config.env, Ge[t]), this.oauth = new yt(this.config), ft(this._reqClass, "post", [mt]), ft(this._reqClass, "upload", [mt]), ft(this._reqClass, "download", [mt])
            }
            return (0, g.default)(e, [{
              key: "post",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t) {
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this._reqClass.post(t);
                      case 2:
                        return e.abrupt("return", e.sent);
                      case 3:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "upload",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t) {
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this._reqClass.upload(t);
                      case 2:
                        return e.abrupt("return", e.sent);
                      case 3:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "download",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t) {
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this._reqClass.download(t);
                      case 2:
                        return e.abrupt("return", e.sent);
                      case 3:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "refreshAccessToken",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e() {
                  var t, n;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken()), e.prev = 1, e.next = 4, this._refreshAccessTokenPromise;
                      case 4:
                        t = e.sent, e.next = 10;
                        break;
                      case 7:
                        e.prev = 7, e.t0 = e.catch(1), n = e.t0;
                      case 10:
                        if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, !n) {
                          e.next = 12;
                          break
                        }
                        throw n;
                      case 12:
                        return e.abrupt("return", t);
                      case 13:
                      case "end":
                        return e.stop()
                    }
                  }), e, this, [
                    [1, 7]
                  ])
                })));
                return function () {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "_refreshAccessToken",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e() {
                  var t, n, o, c, a, u, i, s, y, d, l, f, m;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (t = this._cache.keys, n = t.accessTokenKey, o = t.accessTokenExpireKey, c = t.refreshTokenKey, a = t.loginTypeKey, u = t.anonymousUuidKey, this._cache.removeStore(n), this._cache.removeStore(o), i = this._cache.getStore(c)) {
                          e.next = 5;
                          break
                        }
                        throw new ve({
                          message: "未登录CloudBase"
                        });
                      case 5:
                        return s = {
                          refresh_token: i
                        }, e.next = 8, this.request("auth.fetchAccessTokenWithRefreshToken", s);
                      case 8:
                        if (!(y = e.sent).data.code) {
                          e.next = 21;
                          break
                        }
                        if ("SIGN_PARAM_INVALID" !== (d = y.data.code) && "REFRESH_TOKEN_EXPIRED" !== d && "INVALID_REFRESH_TOKEN" !== d) {
                          e.next = 20;
                          break
                        }
                        if (this._cache.getStore(a) !== ot.ANONYMOUS || "INVALID_REFRESH_TOKEN" !== d) {
                          e.next = 19;
                          break
                        }
                        return l = this._cache.getStore(u), f = this._cache.getStore(c), e.next = 17, this.send("auth.signInAnonymously", {
                          anonymous_uuid: l,
                          refresh_token: f
                        });
                      case 17:
                        return m = e.sent, e.abrupt("return", (this.setRefreshToken(m.refresh_token), this._refreshAccessToken()));
                      case 19:
                        tt(at), this._cache.removeStore(c);
                      case 20:
                        throw new ve({
                          code: y.data.code,
                          message: "刷新access token失败：".concat(y.data.code)
                        });
                      case 21:
                        if (!y.data.access_token) {
                          e.next = 23;
                          break
                        }
                        return e.abrupt("return", (tt(it), this._cache.setStore(n, y.data.access_token), this._cache.setStore(o, y.data.access_token_expire + Date.now()), {
                          accessToken: y.data.access_token,
                          accessTokenExpire: y.data.access_token_expire
                        }));
                      case 23:
                        y.data.refresh_token && (this._cache.removeStore(c), this._cache.setStore(c, y.data.refresh_token), this._refreshAccessToken());
                      case 24:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function () {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "getAccessToken",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e() {
                  var t, n, o, c, a, u, i;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (t = this._cache.keys, n = t.accessTokenKey, o = t.accessTokenExpireKey, c = t.refreshTokenKey, this._cache.getStore(c)) {
                          e.next = 3;
                          break
                        }
                        throw new ve({
                          message: "refresh token不存在，登录状态异常"
                        });
                      case 3:
                        if (a = this._cache.getStore(n), u = this._cache.getStore(o), i = !0, e.t0 = this._shouldRefreshAccessTokenHook, !e.t0) {
                          e.next = 9;
                          break
                        }
                        return e.next = 8, this._shouldRefreshAccessTokenHook(a, u);
                      case 8:
                        e.t0 = !e.sent;
                      case 9:
                        if (e.t1 = e.t0, !e.t1) {
                          e.next = 12;
                          break
                        }
                        i = !1;
                      case 12:
                        return e.abrupt("return", (!a || !u || u < Date.now()) && i ? this.refreshAccessToken() : {
                          accessToken: a,
                          accessTokenExpire: u
                        });
                      case 13:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function () {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "request",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t, n, o) {
                  var c, a, u, i, s, y, d, l, f, m, p, h, C, g, v;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (c = "x-tcb-trace_".concat(this.config.env), a = "application/x-www-form-urlencoded", u = x({
                            action: t,
                            env: this.config.env,
                            dataVersion: "2019-08-16"
                          }, n), e.t0 = -1 === dt.indexOf(t), !e.t0) {
                          e.next = 9;
                          break
                        }
                        return this._cache.keys, e.next = 8, this.oauth.getAccessToken();
                      case 8:
                        u.access_token = e.sent;
                      case 9:
                        if ("storage.uploadFile" !== t) {
                          e.next = 15;
                          break
                        }
                        for (s in i = new FormData) i.hasOwnProperty(s) && void 0 !== i[s] && i.append(s, u[s]);
                        a = "multipart/form-data", e.next = 17;
                        break;
                      case 15:
                        for (y in a = "application/json", i = {}, u) void 0 !== u[y] && (i[y] = u[y]);
                      case 17:
                        return d = {
                          headers: {
                            "content-type": a
                          }
                        }, o && o.timeout && (d.timeout = o.timeout), o && o.onUploadProgress && (d.onUploadProgress = o.onUploadProgress), (l = this._localCache.getStore(c)) && (d.headers["X-TCB-Trace"] = l), f = n.parse, m = n.inQuery, p = n.search, h = {
                          env: this.config.env
                        }, f && (h.parse = !0), m && (h = x(x({}, m), h)), C = function (e, t) {
                          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                            o = /\?/.test(t),
                            c = "";
                          for (var a in n) "" === c ? !o && (t += "?") : c += "&", c += "".concat(a, "=").concat(encodeURIComponent(n[a]));
                          return /^http(s)?\:\/\//.test(t += c) ? t : "".concat(e).concat(t)
                        }($e, "//tcb-api.tencentcloudapi.com/web", h), p && (C += p), e.next = 28, this.post(x({
                          url: C,
                          data: i
                        }, d));
                      case 28:
                        if (g = e.sent, (v = g.header && g.header["x-tcb-trace"]) && this._localCache.setStore(c, v), (200 === Number(g.status) || 200 === Number(g.statusCode)) && g.data) {
                          e.next = 32;
                          break
                        }
                        throw new ve({
                          code: "NETWORK_ERROR",
                          message: "network request error"
                        });
                      case 32:
                        return e.abrupt("return", g);
                      case 33:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t, n, o) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "send",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t) {
                  var n, o, c, a, u = arguments;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return n = u.length > 1 && void 0 !== u[1] ? u[1] : {}, o = u.length > 2 && void 0 !== u[2] ? u[2] : {}, e.next = 4, this.request(t, n, x(x({}, o), {}, {
                          onUploadProgress: n.onUploadProgress
                        }));
                      case 4:
                        if ("ACCESS_TOKEN_DISABLED" !== (c = e.sent).data.code && "ACCESS_TOKEN_EXPIRED" !== c.data.code || -1 !== dt.indexOf(t)) {
                          e.next = 14;
                          break
                        }
                        return e.next = 8, this.oauth.refreshAccessToken();
                      case 8:
                        return e.next = 10, this.request(t, n, x(x({}, o), {}, {
                          onUploadProgress: n.onUploadProgress
                        }));
                      case 10:
                        if (!(a = e.sent).data.code) {
                          e.next = 13;
                          break
                        }
                        throw new ve({
                          code: a.data.code,
                          message: qe(a.data.message)
                        });
                      case 13:
                        return e.abrupt("return", a.data);
                      case 14:
                        if (!c.data.code) {
                          e.next = 16;
                          break
                        }
                        throw new ve({
                          code: c.data.code,
                          message: qe(c.data.message)
                        });
                      case 16:
                        return e.abrupt("return", c.data);
                      case 17:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "setRefreshToken",
              value: function (e) {
                var t = this._cache.keys,
                  n = t.accessTokenKey,
                  o = t.accessTokenExpireKey,
                  c = t.refreshTokenKey;
                this._cache.removeStore(n), this._cache.removeStore(o), this._cache.setStore(c, e)
              }
            }]), e
          }(),
          ht = {};

        function Ct(e) {
          return ht[e]
        }
        var gt = function () {
            function e(t) {
              (0, C.default)(this, e), this.config = t, this._cache = Qe(t.env), this._request = Ct(t.env)
            }
            return (0, g.default)(e, [{
              key: "setRefreshToken",
              value: function (e) {
                var t = this._cache.keys,
                  n = t.accessTokenKey,
                  o = t.accessTokenExpireKey,
                  c = t.refreshTokenKey;
                this._cache.removeStore(n), this._cache.removeStore(o), this._cache.setStore(c, e)
              }
            }, {
              key: "setAccessToken",
              value: function (e, t) {
                var n = this._cache.keys,
                  o = n.accessTokenKey,
                  c = n.accessTokenExpireKey;
                this._cache.setStore(o, e), this._cache.setStore(c, t)
              }
            }, {
              key: "refreshUserInfo",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e() {
                  var t, n;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this._request.send("auth.getUserInfo", {});
                      case 2:
                        return t = e.sent, n = t.data, e.abrupt("return", (this.setLocalUserInfo(n), n));
                      case 5:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function () {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "setLocalUserInfo",
              value: function (e) {
                var t = this._cache.keys.userInfoKey;
                this._cache.setStore(t, e)
              }
            }]), e
          }(),
          vt = function () {
            function e(t) {
              if ((0, C.default)(this, e), !t) throw new ve({
                code: "PARAM_ERROR",
                message: "envId is not defined"
              });
              this._envId = t, this._cache = Qe(this._envId), this._request = Ct(this._envId), this.setUserInfo()
            }
            return (0, g.default)(e, [{
              key: "linkWithTicket",
              value: function (e) {
                if ("string" != typeof e) throw new ve({
                  code: "PARAM_ERROR",
                  message: "ticket must be string"
                });
                return this._request.send("auth.linkWithTicket", {
                  ticket: e
                })
              }
            }, {
              key: "linkWithRedirect",
              value: function (e) {
                e.signInWithRedirect()
              }
            }, {
              key: "updatePassword",
              value: function (e, t) {
                return this._request.send("auth.updatePassword", {
                  oldPassword: t,
                  newPassword: e
                })
              }
            }, {
              key: "updateEmail",
              value: function (e) {
                return this._request.send("auth.updateEmail", {
                  newEmail: e
                })
              }
            }, {
              key: "updateUsername",
              value: function (e) {
                if ("string" != typeof e) throw new ve({
                  code: "PARAM_ERROR",
                  message: "username must be a string"
                });
                return this._request.send("auth.updateUsername", {
                  username: e
                })
              }
            }, {
              key: "getLinkedUidList",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e() {
                  var t, n, o, c;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this._request.send("auth.getLinkedUidList", {});
                      case 2:
                        return t = e.sent, n = t.data, o = !1, c = n.users, e.abrupt("return", (c.forEach((function (e) {
                          e.wxOpenId && e.wxPublicId && (o = !0)
                        })), {
                          users: c,
                          hasPrimaryUid: o
                        }));
                      case 7:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function () {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "setPrimaryUid",
              value: function (e) {
                return this._request.send("auth.setPrimaryUid", {
                  uid: e
                })
              }
            }, {
              key: "unlink",
              value: function (e) {
                return this._request.send("auth.unlink", {
                  platform: e
                })
              }
            }, {
              key: "update",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t) {
                  var n, o, c, a, u, i, s, y;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return n = t.nickName, o = t.gender, c = t.avatarUrl, a = t.province, u = t.country, i = t.city, e.next = 8, this._request.send("auth.updateUserInfo", {
                          nickName: n,
                          gender: o,
                          avatarUrl: c,
                          province: a,
                          country: u,
                          city: i
                        });
                      case 8:
                        s = e.sent, y = s.data, this.setLocalUserInfo(y);
                      case 11:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "refresh",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e() {
                  var t;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this._request.oauth.getUserInfo();
                      case 2:
                        return t = e.sent, e.abrupt("return", (this.setLocalUserInfo(t), t));
                      case 4:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function () {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "setUserInfo",
              value: function () {
                var e = this,
                  t = this._cache.keys.userInfoKey,
                  n = this._cache.getStore(t);
                ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((function (t) {
                  e[t] = n[t]
                })), this.location = {
                  country: n.country,
                  province: n.province,
                  city: n.city
                }
              }
            }, {
              key: "setLocalUserInfo",
              value: function (e) {
                var t = this._cache.keys.userInfoKey;
                this._cache.setStore(t, e), this.setUserInfo()
              }
            }]), e
          }(),
          Nt = function () {
            function e(t) {
              if ((0, C.default)(this, e), !t) throw new ve({
                code: "PARAM_ERROR",
                message: "envId is not defined"
              });
              this._cache = Qe(t);
              var n = this._cache.keys,
                o = n.refreshTokenKey,
                c = n.accessTokenKey,
                a = n.accessTokenExpireKey,
                r = this._cache.getStore(o),
                u = this._cache.getStore(c),
                i = this._cache.getStore(a);
              this.credential = {
                refreshToken: r,
                accessToken: u,
                accessTokenExpire: i
              }, this.user = new vt(t)
            }
            return (0, g.default)(e, [{
              key: "isAnonymousAuth",
              get: function () {
                return this.loginType === ot.ANONYMOUS
              }
            }, {
              key: "isCustomAuth",
              get: function () {
                return this.loginType === ot.CUSTOM
              }
            }, {
              key: "isWeixinAuth",
              get: function () {
                return this.loginType === ot.WECHAT || this.loginType === ot.WECHAT_OPEN || this.loginType === ot.WECHAT_PUBLIC
              }
            }, {
              key: "loginType",
              get: function () {
                return this._cache.getStore(this._cache.keys.loginTypeKey)
              }
            }]), e
          }(),
          bt = function (e) {
            (0, f.default)(n, e);
            var t = w(n);

            function n() {
              return (0, C.default)(this, n), t.apply(this, arguments)
            }
            return (0, g.default)(n, [{
              key: "signIn",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e() {
                  var t;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return this._cache.updatePersistence("local"), e.next = 3, this._request.oauth.getAccessToken();
                      case 3:
                        return tt(ct), tt(rt, {
                          env: this.config.env,
                          loginType: ot.ANONYMOUS,
                          persistence: "local"
                        }), t = new Nt(this.config.env), e.next = 8, t.user.refresh();
                      case 8:
                        return e.abrupt("return", t);
                      case 9:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function () {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "linkAndRetrieveDataWithTicket",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t) {
                  var n, o, c, a, u, i;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return n = this._cache.keys, o = n.anonymousUuidKey, c = n.refreshTokenKey, a = this._cache.getStore(o), u = this._cache.getStore(c), e.next = 7, this._request.send("auth.linkAndRetrieveDataWithTicket", {
                          anonymous_uuid: a,
                          refresh_token: u,
                          ticket: t
                        });
                      case 7:
                        if (!(i = e.sent).refresh_token) {
                          e.next = 16;
                          break
                        }
                        return this._clearAnonymousUUID(), this.setRefreshToken(i.refresh_token), e.next = 13, this._request.refreshAccessToken();
                      case 13:
                        return tt(ut, {
                          env: this.config.env
                        }), tt(rt, {
                          loginType: ot.CUSTOM,
                          persistence: "local"
                        }), e.abrupt("return", {
                          credential: {
                            refreshToken: i.refresh_token
                          }
                        });
                      case 16:
                        throw new ve({
                          message: "匿名转化失败"
                        });
                      case 17:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "_setAnonymousUUID",
              value: function (e) {
                var t = this._cache.keys,
                  n = t.anonymousUuidKey,
                  o = t.loginTypeKey;
                this._cache.removeStore(n), this._cache.setStore(n, e), this._cache.setStore(o, ot.ANONYMOUS)
              }
            }, {
              key: "_clearAnonymousUUID",
              value: function () {
                this._cache.removeStore(this._cache.keys.anonymousUuidKey)
              }
            }]), n
          }(gt),
          _t = function (e) {
            (0, f.default)(n, e);
            var t = w(n);

            function n() {
              return (0, C.default)(this, n), t.apply(this, arguments)
            }
            return (0, g.default)(n, [{
              key: "signIn",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t) {
                  var n, o;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if ("string" == typeof t) {
                          e.next = 2;
                          break
                        }
                        throw new ve({
                          code: "PARAM_ERROR",
                          message: "ticket must be a string"
                        });
                      case 2:
                        return n = this._cache.keys.refreshTokenKey, e.next = 5, this._request.send("auth.signInWithTicket", {
                          ticket: t,
                          refresh_token: this._cache.getStore(n) || ""
                        });
                      case 5:
                        if (!(o = e.sent).refresh_token) {
                          e.next = 15;
                          break
                        }
                        return this.setRefreshToken(o.refresh_token), e.next = 10, this._request.refreshAccessToken();
                      case 10:
                        return tt(ct), tt(rt, {
                          env: this.config.env,
                          loginType: ot.CUSTOM,
                          persistence: this.config.persistence
                        }), e.next = 14, this.refreshUserInfo();
                      case 14:
                        return e.abrupt("return", new Nt(this.config.env));
                      case 15:
                        throw new ve({
                          message: "自定义登录失败"
                        });
                      case 16:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t) {
                  return e.apply(this, arguments)
                }
              }()
            }]), n
          }(gt),
          xt = function (e) {
            (0, f.default)(n, e);
            var t = w(n);

            function n() {
              return (0, C.default)(this, n), t.apply(this, arguments)
            }
            return (0, g.default)(n, [{
              key: "signIn",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t, n) {
                  var o, c, a, u, i;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if ("string" == typeof t) {
                          e.next = 2;
                          break
                        }
                        throw new ve({
                          code: "PARAM_ERROR",
                          message: "email must be a string"
                        });
                      case 2:
                        return o = this._cache.keys.refreshTokenKey, e.next = 5, this._request.send("auth.signIn", {
                          loginType: "EMAIL",
                          email: t,
                          password: n,
                          refresh_token: this._cache.getStore(o) || ""
                        });
                      case 5:
                        if (c = e.sent, a = c.refresh_token, u = c.access_token, i = c.access_token_expire, !a) {
                          e.next = 22;
                          break
                        }
                        if (this.setRefreshToken(a), !u || !i) {
                          e.next = 15;
                          break
                        }
                        this.setAccessToken(u, i), e.next = 17;
                        break;
                      case 15:
                        return e.next = 17, this._request.refreshAccessToken();
                      case 17:
                        return e.next = 19, this.refreshUserInfo();
                      case 19:
                        return tt(ct), tt(rt, {
                          env: this.config.env,
                          loginType: ot.EMAIL,
                          persistence: this.config.persistence
                        }), e.abrupt("return", new Nt(this.config.env));
                      case 22:
                        throw c.code ? new ve({
                          code: c.code,
                          message: "邮箱登录失败: ".concat(c.message)
                        }) : new ve({
                          message: "邮箱登录失败"
                        });
                      case 23:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t, n) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "activate",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t) {
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.abrupt("return", this._request.send("auth.activateEndUserMail", {
                          token: t
                        }));
                      case 1:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "resetPasswordWithToken",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t, n) {
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.abrupt("return", this._request.send("auth.resetPasswordWithToken", {
                          token: t,
                          newPassword: n
                        }));
                      case 1:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t, n) {
                  return e.apply(this, arguments)
                }
              }()
            }]), n
          }(gt),
          wt = function (e) {
            (0, f.default)(n, e);
            var t = w(n);

            function n() {
              return (0, C.default)(this, n), t.apply(this, arguments)
            }
            return (0, g.default)(n, [{
              key: "signIn",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t, n) {
                  var o, c, a, u, i;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if ("string" == typeof t) {
                          e.next = 2;
                          break
                        }
                        throw new ve({
                          code: "PARAM_ERROR",
                          message: "username must be a string"
                        });
                      case 2:
                        return "string" != typeof n && (n = "", console.warn("password is empty")), o = this._cache.keys.refreshTokenKey, e.next = 6, this._request.send("auth.signIn", {
                          loginType: ot.USERNAME,
                          username: t,
                          password: n,
                          refresh_token: this._cache.getStore(o) || ""
                        });
                      case 6:
                        if (c = e.sent, a = c.refresh_token, u = c.access_token_expire, i = c.access_token, !a) {
                          e.next = 23;
                          break
                        }
                        if (this.setRefreshToken(a), !i || !u) {
                          e.next = 16;
                          break
                        }
                        this.setAccessToken(i, u), e.next = 18;
                        break;
                      case 16:
                        return e.next = 18, this._request.refreshAccessToken();
                      case 18:
                        return e.next = 20, this.refreshUserInfo();
                      case 20:
                        return tt(ct), tt(rt, {
                          env: this.config.env,
                          loginType: ot.USERNAME,
                          persistence: this.config.persistence
                        }), e.abrupt("return", new Nt(this.config.env));
                      case 23:
                        throw c.code ? new ve({
                          code: c.code,
                          message: "用户名密码登录失败: ".concat(c.message)
                        }) : new ve({
                          message: "用户名密码登录失败"
                        });
                      case 24:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t, n) {
                  return e.apply(this, arguments)
                }
              }()
            }]), n
          }(gt),
          kt = function () {
            function e(t) {
              (0, C.default)(this, e), this.config = t, this._cache = Qe(t.env), this._request = Ct(t.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), et(rt, this._onLoginTypeChanged)
            }
            return (0, g.default)(e, [{
              key: "currentUser",
              get: function () {
                var e = this.hasLoginState();
                return e && e.user || null
              }
            }, {
              key: "loginType",
              get: function () {
                return this._cache.getStore(this._cache.keys.loginTypeKey)
              }
            }, {
              key: "anonymousAuthProvider",
              value: function () {
                return new bt(this.config)
              }
            }, {
              key: "customAuthProvider",
              value: function () {
                return new _t(this.config)
              }
            }, {
              key: "emailAuthProvider",
              value: function () {
                return new xt(this.config)
              }
            }, {
              key: "usernameAuthProvider",
              value: function () {
                return new wt(this.config)
              }
            }, {
              key: "signInAnonymously",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e() {
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.abrupt("return", new bt(this.config).signIn());
                      case 1:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function () {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "signInWithEmailAndPassword",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t, n) {
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.abrupt("return", new xt(this.config).signIn(t, n));
                      case 1:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t, n) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "signInWithUsernameAndPassword",
              value: function (e, t) {
                return new wt(this.config).signIn(e, t)
              }
            }, {
              key: "linkAndRetrieveDataWithTicket",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t) {
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return this._anonymousAuthProvider || (this._anonymousAuthProvider = new bt(this.config)), et(ut, this._onAnonymousConverted), e.next = 3, this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(t);
                      case 3:
                        return e.abrupt("return", e.sent);
                      case 4:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "signOut",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e() {
                  var t, n, o, c, a, u;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (this.loginType !== ot.ANONYMOUS) {
                          e.next = 2;
                          break
                        }
                        throw new ve({
                          message: "匿名用户不支持登出操作"
                        });
                      case 2:
                        if (t = this._cache.keys, n = t.refreshTokenKey, o = t.accessTokenKey, c = t.accessTokenExpireKey, a = this._cache.getStore(n)) {
                          e.next = 5;
                          break
                        }
                        return e.abrupt("return");
                      case 5:
                        return e.next = 7, this._request.send("auth.logout", {
                          refresh_token: a
                        });
                      case 7:
                        return u = e.sent, e.abrupt("return", (this._cache.removeStore(n), this._cache.removeStore(o), this._cache.removeStore(c), tt(ct), tt(rt, {
                          env: this.config.env,
                          loginType: ot.NULL,
                          persistence: this.config.persistence
                        }), u));
                      case 9:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function () {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "signUpWithEmailAndPassword",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t, n) {
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", {
                          email: t,
                          password: n
                        }));
                      case 1:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t, n) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "sendPasswordResetEmail",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t) {
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.abrupt("return", this._request.send("auth.sendPasswordResetEmail", {
                          email: t
                        }));
                      case 1:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "onLoginStateChanged",
              value: function (e) {
                var t = this;
                et(ct, (function () {
                  var n = t.hasLoginState();
                  e.call(t, n)
                }));
                var n = this.hasLoginState();
                e.call(this, n)
              }
            }, {
              key: "onLoginStateExpired",
              value: function (e) {
                et(at, e.bind(this))
              }
            }, {
              key: "onAccessTokenRefreshed",
              value: function (e) {
                et(it, e.bind(this))
              }
            }, {
              key: "onAnonymousConverted",
              value: function (e) {
                et(ut, e.bind(this))
              }
            }, {
              key: "onLoginTypeChanged",
              value: function (e) {
                var t = this;
                et(rt, (function () {
                  var n = t.hasLoginState();
                  e.call(t, n)
                }))
              }
            }, {
              key: "getAccessToken",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e() {
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this._request.getAccessToken();
                      case 2:
                        return e.t0 = e.sent.accessToken, e.t1 = this.config.env, e.abrupt("return", {
                          accessToken: e.t0,
                          env: e.t1
                        });
                      case 5:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function () {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "hasLoginState",
              value: function () {
                var e = this._cache.keys,
                  t = e.accessTokenKey,
                  n = e.accessTokenExpireKey,
                  o = this._cache.getStore(t),
                  c = this._cache.getStore(n);
                return this._request.oauth.isAccessTokenExpired(o, c) ? null : new Nt(this.config.env)
              }
            }, {
              key: "isUsernameRegistered",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t) {
                  var n, o;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if ("string" == typeof t) {
                          e.next = 2;
                          break
                        }
                        throw new ve({
                          code: "PARAM_ERROR",
                          message: "username must be a string"
                        });
                      case 2:
                        return e.next = 4, this._request.send("auth.isUsernameRegistered", {
                          username: t
                        });
                      case 4:
                        return n = e.sent, o = n.data, e.abrupt("return", o && o.isRegistered);
                      case 7:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "getLoginState",
              value: function () {
                return Promise.resolve(this.hasLoginState())
              }
            }, {
              key: "signInWithTicket",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t) {
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.abrupt("return", new _t(this.config).signIn(t));
                      case 1:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "shouldRefreshAccessToken",
              value: function (e) {
                this._request._shouldRefreshAccessTokenHook = e.bind(this)
              }
            }, {
              key: "getUserInfo",
              value: function () {
                return this._request.send("auth.getUserInfo", {}).then((function (e) {
                  return e.code ? e : x(x({}, e.data), {}, {
                    requestId: e.seqId
                  })
                }))
              }
            }, {
              key: "getAuthHeader",
              value: function () {
                var e = this._cache.keys,
                  t = e.refreshTokenKey,
                  n = e.accessTokenKey,
                  o = this._cache.getStore(t);
                return {
                  "x-cloudbase-credentials": this._cache.getStore(n) + "/@@/" + o
                }
              }
            }, {
              key: "_onAnonymousConverted",
              value: function (e) {
                e.data.env === this.config.env && this._cache.updatePersistence(this.config.persistence)
              }
            }, {
              key: "_onLoginTypeChanged",
              value: function (e) {
                var t = e.data,
                  n = t.loginType,
                  o = t.persistence;
                t.env === this.config.env && (this._cache.updatePersistence(o), this._cache.setStore(this._cache.keys.loginTypeKey, n))
              }
            }]), e
          }(),
          Ot = function (e, t) {
            t = t || Ue();
            var n = Ct(this.config.env),
              o = e.cloudPath,
              c = e.filePath,
              a = e.onUploadProgress,
              r = e.fileType,
              u = void 0 === r ? "image" : r;
            return n.send("storage.getUploadMetadata", {
              path: o
            }).then((function (e) {
              var r = e.data,
                i = r.url,
                s = r.authorization,
                y = r.token,
                d = r.fileId,
                l = r.cosFileId,
                f = e.requestId,
                m = {
                  key: o,
                  signature: s,
                  "x-cos-meta-fileid": l,
                  success_action_status: "201",
                  "x-cos-security-token": y
                };
              n.upload({
                url: i,
                data: m,
                file: c,
                name: o,
                fileType: u,
                onUploadProgress: a
              }).then((function (e) {
                201 === e.statusCode ? t(null, {
                  fileID: d,
                  requestId: f
                }) : t(new ve({
                  code: "STORAGE_REQUEST_FAIL",
                  message: "STORAGE_REQUEST_FAIL: ".concat(e.data)
                }))
              })).catch((function (e) {
                t(e)
              }))
            })).catch((function (e) {
              t(e)
            })), t.promise
          },
          St = function (e, t) {
            t = t || Ue();
            var n = Ct(this.config.env),
              o = e.cloudPath;
            return n.send("storage.getUploadMetadata", {
              path: o
            }).then((function (e) {
              t(null, e)
            })).catch((function (e) {
              t(e)
            })), t.promise
          },
          Pt = function (e, t) {
            var n = e.fileList;
            if (t = t || Ue(), !n || !Array.isArray(n)) return {
              code: "INVALID_PARAM",
              message: "fileList必须是非空的数组"
            };
            var o, c = N(n);
            try {
              for (c.s(); !(o = c.n()).done;) {
                var a = o.value;
                if (!a || "string" != typeof a) return {
                  code: "INVALID_PARAM",
                  message: "fileList的元素必须是非空的字符串"
                }
              }
            } catch (e) {
              c.e(e)
            } finally {
              c.f()
            }
            var r = {
              fileid_list: n
            };
            return Ct(this.config.env).send("storage.batchDeleteFile", r).then((function (e) {
              e.code ? t(null, e) : t(null, {
                fileList: e.data.delete_list,
                requestId: e.requestId
              })
            })).catch((function (e) {
              t(e)
            })), t.promise
          },
          At = function (e, t) {
            var n = e.fileList;
            t = t || Ue(), n && Array.isArray(n) || t(null, {
              code: "INVALID_PARAM",
              message: "fileList必须是非空的数组"
            });
            var o, c = [],
              a = N(n);
            try {
              for (a.s(); !(o = a.n()).done;) {
                var r = o.value;
                "object" == (0, s.default)(r) ? (r.hasOwnProperty("fileID") && r.hasOwnProperty("maxAge") || t(null, {
                  code: "INVALID_PARAM",
                  message: "fileList的元素必须是包含fileID和maxAge的对象"
                }), c.push({
                  fileid: r.fileID,
                  max_age: r.maxAge
                })) : "string" == typeof r ? c.push({
                  fileid: r
                }) : t(null, {
                  code: "INVALID_PARAM",
                  message: "fileList的元素必须是字符串"
                })
              }
            } catch (e) {
              a.e(e)
            } finally {
              a.f()
            }
            var u = {
              file_list: c
            };
            return Ct(this.config.env).send("storage.batchGetDownloadUrl", u).then((function (e) {
              e.code ? t(null, e) : t(null, {
                fileList: e.data.download_list,
                requestId: e.requestId
              })
            })).catch((function (e) {
              t(e)
            })), t.promise
          },
          Tt = function () {
            var e = (0, d.default)(r.default.mark((function e(t, n) {
              var o, c, a, u;
              return r.default.wrap((function (e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return o = t.fileID, e.next = 3, At.call(this, {
                      fileList: [{
                        fileID: o,
                        maxAge: 600
                      }]
                    });
                  case 3:
                    if ("SUCCESS" === (c = e.sent.fileList[0]).code) {
                      e.next = 6;
                      break
                    }
                    return e.abrupt("return", n ? n(c) : new Promise((function (e) {
                      e(c)
                    })));
                  case 6:
                    if (a = Ct(this.config.env), u = c.download_url, u = encodeURI(u), n) {
                      e.next = 10;
                      break
                    }
                    return e.abrupt("return", a.download({
                      url: u
                    }));
                  case 10:
                    return e.t0 = n, e.next = 13, a.download({
                      url: u
                    });
                  case 13:
                    e.t1 = e.sent, (0, e.t0)(e.t1);
                  case 15:
                  case "end":
                    return e.stop()
                }
              }), e, this)
            })));
            return function (t, n) {
              return e.apply(this, arguments)
            }
          }(),
          It = function (e, t) {
            var n, o = e.name,
              c = e.data,
              a = e.query,
              r = e.parse,
              u = e.search,
              i = e.timeout,
              s = t || Ue();
            try {
              n = c ? JSON.stringify(c) : ""
            } catch (o) {
              return Promise.reject(o)
            }
            if (!o) return Promise.reject(new ve({
              code: "PARAM_ERROR",
              message: "函数名不能为空"
            }));
            var y = {
              inQuery: a,
              parse: r,
              search: u,
              function_name: o,
              request_data: n
            };
            return Ct(this.config.env).send("functions.invokeFunction", y, {
              timeout: i
            }).then((function (e) {
              if (e.code) s(null, e);
              else {
                var t = e.data.response_data;
                if (r) s(null, {
                  result: t,
                  requestId: e.requestId
                });
                else try {
                  t = JSON.parse(e.data.response_data), s(null, {
                    result: t,
                    requestId: e.requestId
                  })
                } catch (e) {
                  s(new ve({
                    message: "response data must be json"
                  }))
                }
              }
              return s.promise
            })).catch((function (e) {
              s(e)
            })), s.promise
          },
          jt = {
            timeout: 15e3,
            persistence: "session"
          },
          Et = {},
          $t = new(function () {
            function e(t) {
              (0, C.default)(this, e), this.config = t || this.config, this.authObj = void 0
            }
            return (0, g.default)(e, [{
              key: "init",
              value: function (t) {
                switch (Ve.adapter || (this.requestClient = new Ve.adapter.reqClass({
                    timeout: t.timeout || 5e3,
                    timeoutMsg: "请求在".concat((t.timeout || 5e3) / 1e3, "s内未完成，已中断")
                  })), this.config = x(x({}, jt), t), !0) {
                  case this.config.timeout > 6e5:
                    console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
                    break;
                  case this.config.timeout < 100:
                    console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100
                }
                return new e(this.config)
              }
            }, {
              key: "auth",
              value: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                  t = e.persistence;
                if (this.authObj) return this.authObj;
                var n, o = t || Ve.adapter.primaryStorage || jt.persistence;
                return o !== this.config.persistence && (this.config.persistence = o),
                  function (e) {
                    var t = e.env;
                    Je[t] = new We(e), Ge[t] = new We(x(x({}, e), {}, {
                      persistence: "local"
                    }))
                  }(this.config), n = this.config, ht[n.env] = new pt(n), this.authObj = new kt(this.config), this.authObj
              }
            }, {
              key: "on",
              value: function (e, t) {
                return et.apply(this, [e, t])
              }
            }, {
              key: "off",
              value: function (e, t) {
                return nt.apply(this, [e, t])
              }
            }, {
              key: "callFunction",
              value: function (e, t) {
                return It.apply(this, [e, t])
              }
            }, {
              key: "deleteFile",
              value: function (e, t) {
                return Pt.apply(this, [e, t])
              }
            }, {
              key: "getTempFileURL",
              value: function (e, t) {
                return At.apply(this, [e, t])
              }
            }, {
              key: "downloadFile",
              value: function (e, t) {
                return Tt.apply(this, [e, t])
              }
            }, {
              key: "uploadFile",
              value: function (e, t) {
                return Ot.apply(this, [e, t])
              }
            }, {
              key: "getUploadMetadata",
              value: function (e, t) {
                return St.apply(this, [e, t])
              }
            }, {
              key: "registerExtension",
              value: function (e) {
                Et[e.name] = e
              }
            }, {
              key: "invokeExtension",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t, n) {
                  var o;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (o = Et[t]) {
                          e.next = 3;
                          break
                        }
                        throw new ve({
                          message: "扩展".concat(t, " 必须先注册")
                        });
                      case 3:
                        return e.next = 5, o.invoke(n, this);
                      case 5:
                        return e.abrupt("return", e.sent);
                      case 6:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t, n) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "useAdapters",
              value: function (e) {
                var t = function (e) {
                    var t, n, o = N((t = e, "[object Array]" === Object.prototype.toString.call(t) ? e : [e]));
                    try {
                      for (o.s(); !(n = o.n()).done;) {
                        var c = n.value,
                          a = c.isMatch,
                          r = c.genAdapter,
                          u = c.runtime;
                        if (a()) return {
                          adapter: r(),
                          runtime: u
                        }
                      }
                    } catch (e) {
                      o.e(e)
                    } finally {
                      o.f()
                    }
                  }(e) || {},
                  n = t.adapter,
                  o = t.runtime;
                n && (Ve.adapter = n), o && (Ve.runtime = o)
              }
            }]), e
          }());

        function Dt(e, t, n) {
          void 0 === n && (n = {});
          var o = /\?/.test(t),
            c = "";
          for (var a in n) "" === c ? !o && (t += "?") : c += "&", c += a + "=" + encodeURIComponent(n[a]);
          return /^http(s)?:\/\//.test(t += c) ? t : "" + e + t
        }
        var Lt = function () {
            function e() {
              (0, C.default)(this, e)
            }
            return (0, g.default)(e, [{
              key: "get",
              value: function (e) {
                var t = e.url,
                  n = e.data,
                  o = e.headers,
                  c = e.timeout;
                return new Promise((function (e, a) {
                  _e.request({
                    url: Dt("https:", t),
                    data: n,
                    method: "GET",
                    header: o,
                    timeout: c,
                    success: function (t) {
                      e(t)
                    },
                    fail: function (e) {
                      a(e)
                    }
                  })
                }))
              }
            }, {
              key: "post",
              value: function (e) {
                var t = e.url,
                  n = e.data,
                  o = e.headers,
                  c = e.timeout;
                return new Promise((function (e, a) {
                  _e.request({
                    url: Dt("https:", t),
                    data: n,
                    method: "POST",
                    header: o,
                    timeout: c,
                    success: function (t) {
                      e(t)
                    },
                    fail: function (e) {
                      a(e)
                    }
                  })
                }))
              }
            }, {
              key: "upload",
              value: function (e) {
                return new Promise((function (t, n) {
                  var o = e.url,
                    c = e.file,
                    a = e.data,
                    r = e.headers,
                    u = e.fileType,
                    i = _e.uploadFile({
                      url: Dt("https:", o),
                      name: "file",
                      formData: Object.assign({}, a),
                      filePath: c,
                      fileType: u,
                      header: r,
                      success: function (e) {
                        var n = {
                          statusCode: e.statusCode,
                          data: e.data || {}
                        };
                        200 === e.statusCode && a.success_action_status && (n.statusCode = parseInt(a.success_action_status, 10)), t(n)
                      },
                      fail: function (e) {
                        n(new Error(e.errMsg || "uploadFile:fail"))
                      }
                    });
                  "function" == typeof e.onUploadProgress && i && "function" == typeof i.onProgressUpdate && i.onProgressUpdate((function (t) {
                    e.onUploadProgress({
                      loaded: t.totalBytesSent,
                      total: t.totalBytesExpectedToSend
                    })
                  }))
                }))
              }
            }]), e
          }(),
          Mt = {
            setItem: function (e, t) {
              _e.setStorageSync(e, t)
            },
            getItem: function (e) {
              return _e.getStorageSync(e)
            },
            removeItem: function (e) {
              _e.removeStorageSync(e)
            },
            clear: function () {
              _e.clearStorageSync()
            }
          },
          Ut = {
            genAdapter: function () {
              return {
                root: {},
                reqClass: Lt,
                localStorage: Mt,
                primaryStorage: "local"
              }
            },
            isMatch: function () {
              return !0
            },
            runtime: "uni_app"
          };
        $t.useAdapters(Ut);
        var Rt = $t,
          Ft = Rt.init;
        Rt.init = function (e) {
          e.env = e.spaceId;
          var t = Ft.call(this, e);
          t.config.provider = "tencent", t.config.spaceId = e.spaceId;
          var n = t.auth;
          return t.auth = function (e) {
            var t = n.call(this, e);
            return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((function (e) {
              var n;
              t[e] = (n = t[e], function (e) {
                var t = ge(e = e || {}),
                  o = t.success,
                  c = t.fail,
                  a = t.complete;
                if (!(o || c || a)) return n.call(this, e);
                n.call(this, e).then((function (e) {
                  o && o(e), a && a(e)
                }), (function (e) {
                  c && c(e), a && a(e)
                }))
              }).bind(t)
            })), t
          }, t.customAuth = t.auth, t
        };
        var qt = Rt;

        function Bt(e, t) {
          return Vt.apply(this, arguments)
        }

        function Vt() {
          return (Vt = (0, d.default)(r.default.mark((function e(t, n) {
            var o, c, a;
            return r.default.wrap((function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return o = "http://".concat(t, ":").concat(n, "/system/ping"), e.prev = 1, e.next = 4, a = {
                    url: o,
                    timeout: 500
                  }, new Promise((function (e, t) {
                    _e.request(x(x({}, a), {}, {
                      success: function (t) {
                        e(t)
                      },
                      fail: function (e) {
                        t(e)
                      }
                    }))
                  }));
                case 4:
                  return c = e.sent, e.abrupt("return", !(!c.data || 0 !== c.data.code));
                case 8:
                  return e.prev = 8, e.t0 = e.catch(1), e.abrupt("return", !1);
                case 11:
                case "end":
                  return e.stop()
              }
            }), e, null, [
              [1, 8]
            ])
          })))).apply(this, arguments)
        }

        function Ht(e, t) {
          return zt.apply(this, arguments)
        }

        function zt() {
          return (zt = (0, d.default)(r.default.mark((function e(t, n) {
            var o, c, a;
            return r.default.wrap((function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  c = 0;
                case 1:
                  if (!(c < t.length)) {
                    e.next = 11;
                    break
                  }
                  return a = t[c], e.next = 5, Bt(a, n);
                case 5:
                  if (!e.sent) {
                    e.next = 8;
                    break
                  }
                  return o = a, e.abrupt("break", 11);
                case 8:
                  c++, e.next = 1;
                  break;
                case 11:
                  return e.abrupt("return", {
                    address: o,
                    port: n
                  });
                case 12:
                case "end":
                  return e.stop()
              }
            }), e)
          })))).apply(this, arguments)
        }
        var Kt = {
            "serverless.file.resource.generateProximalSign": "storage/generate-proximal-sign",
            "serverless.file.resource.report": "storage/report",
            "serverless.file.resource.delete": "storage/delete",
            "serverless.file.resource.getTempFileURL": "storage/get-temp-file-url"
          },
          Wt = function () {
            function e(t) {
              if ((0, C.default)(this, e), ["spaceId", "clientSecret"].forEach((function (e) {
                  if (!Object.prototype.hasOwnProperty.call(t, e)) throw new Error("".concat(e, " required"))
                })), !t.endpoint) throw new Error("集群空间未配置ApiEndpoint，配置后需要重新关联服务空间后生效");
              this.config = Object.assign({}, t), this.config.provider = "dcloud", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.adapter = _e
            }
            return (0, g.default)(e, [{
              key: "request",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t) {
                  var n, o = this,
                    c = arguments;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (!(c.length > 1 && void 0 !== c[1]) || c[1], !(n = !1)) {
                          e.next = 8;
                          break
                        }
                        return e.next = 5, this.setupLocalRequest(t);
                      case 5:
                        e.t0 = e.sent, e.next = 9;
                        break;
                      case 8:
                        e.t0 = this.setupRequest(t);
                      case 9:
                        return t = e.t0, e.abrupt("return", Promise.resolve().then((function () {
                          return n ? o.requestLocal(t) : Te(t, o.adapter.request)
                        })));
                      case 11:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "requestLocal",
              value: function (e) {
                var t = this;
                return new Promise((function (n, o) {
                  t.adapter.request(Object.assign(e, {
                    complete: function (e) {
                      if (e || (e = {}), !e.statusCode || e.statusCode >= 400) {
                        var t = e.data && e.data.code || "SYS_ERR",
                          c = e.data && e.data.message || "request:fail";
                        return o(new ve({
                          code: t,
                          message: c
                        }))
                      }
                      n({
                        success: !0,
                        result: e.data
                      })
                    }
                  }))
                }))
              }
            }, {
              key: "setupRequest",
              value: function (e) {
                var t = Object.assign({}, e, {
                    spaceId: this.config.spaceId,
                    timestamp: Date.now()
                  }),
                  n = {
                    "Content-Type": "application/json"
                  };
                n["x-serverless-sign"] = Ae(t, this.config.clientSecret);
                var o = Se();
                n["x-client-info"] = encodeURIComponent(JSON.stringify(o));
                var c = xe().token;
                return n["x-client-token"] = c, {
                  url: this.config.requestUrl,
                  method: "POST",
                  data: t,
                  dataType: "json",
                  header: JSON.parse(JSON.stringify(n))
                }
              }
            }, {
              key: "setupLocalRequest",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t) {
                  var n, o, c, a, u, i, s, y, d;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return n = Se(), o = xe(), c = o.token, a = Object.assign({}, t, {
                          spaceId: this.config.spaceId,
                          timestamp: Date.now(),
                          clientInfo: n,
                          token: c
                        }), u = this.__dev__ && this.__dev__.debugInfo || {}, i = u.address, s = u.servePort, e.next = 9, Ht(i, s);
                      case 9:
                        return y = e.sent, d = y.address, e.abrupt("return", {
                          url: "http://".concat(d, ":").concat(s, "/").concat(Kt[t.method]),
                          method: "POST",
                          data: a,
                          dataType: "json",
                          header: JSON.parse(JSON.stringify({
                            "Content-Type": "application/json"
                          }))
                        });
                      case 12:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "callFunction",
              value: function (e) {
                var t = {
                  method: "serverless.function.runtime.invoke",
                  params: JSON.stringify({
                    functionTarget: e.name,
                    functionArgs: e.data || {}
                  })
                };
                return this.request(t, !1)
              }
            }, {
              key: "getUploadFileOptions",
              value: function (e) {
                var t = {
                  method: "serverless.file.resource.generateProximalSign",
                  params: JSON.stringify(e)
                };
                return this.request(t)
              }
            }, {
              key: "reportUploadFile",
              value: function (e) {
                var t = {
                  method: "serverless.file.resource.report",
                  params: JSON.stringify(e)
                };
                return this.request(t)
              }
            }, {
              key: "uploadFile",
              value: function (e) {
                var t, n = this,
                  o = e.filePath,
                  c = e.cloudPath,
                  a = e.fileType,
                  r = void 0 === a ? "image" : a,
                  u = e.onUploadProgress;
                if (!c) throw new ve({
                  code: "CLOUDPATH_REQUIRED",
                  message: "cloudPath不可为空"
                });
                return this.getUploadFileOptions({
                  cloudPath: c
                }).then((function (e) {
                  var c = e.result,
                    a = c.url,
                    i = c.formData,
                    s = c.name;
                  return t = e.result.fileUrl, new Promise((function (e, t) {
                    var c = n.adapter.uploadFile({
                      url: a,
                      formData: i,
                      name: s,
                      filePath: o,
                      fileType: r,
                      success: function (n) {
                        n && n.statusCode < 400 ? e(n) : t(new ve({
                          code: "UPLOAD_FAILED",
                          message: "文件上传失败"
                        }))
                      },
                      fail: function (e) {
                        t(new ve({
                          code: e.code || "UPLOAD_FAILED",
                          message: e.message || e.errMsg || "文件上传失败"
                        }))
                      }
                    });
                    "function" == typeof u && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate((function (e) {
                      u({
                        loaded: e.totalBytesSent,
                        total: e.totalBytesExpectedToSend
                      })
                    }))
                  }))
                })).then((function () {
                  return n.reportUploadFile({
                    cloudPath: c
                  })
                })).then((function (e) {
                  return new Promise((function (n, c) {
                    e.success ? n({
                      success: !0,
                      filePath: o,
                      fileID: t
                    }) : c(new ve({
                      code: "UPLOAD_FAILED",
                      message: "文件上传失败"
                    }))
                  }))
                }))
              }
            }, {
              key: "deleteFile",
              value: function (e) {
                var t = e.fileList,
                  n = {
                    method: "serverless.file.resource.delete",
                    params: JSON.stringify({
                      fileList: t
                    })
                  };
                return this.request(n).then((function (e) {
                  if (e.success) return e.result;
                  throw new ve({
                    code: "DELETE_FILE_FAILED",
                    message: "删除文件失败"
                  })
                }))
              }
            }, {
              key: "getTempFileURL",
              value: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                  t = e.fileList,
                  n = e.maxAge;
                if (!Array.isArray(t) || 0 === t.length) throw new ve({
                  code: "INVALID_PARAM",
                  message: "fileList的元素必须是非空的字符串"
                });
                var o = {
                  method: "serverless.file.resource.getTempFileURL",
                  params: JSON.stringify({
                    fileList: t,
                    maxAge: n
                  })
                };
                return this.request(o).then((function (e) {
                  if (e.success) return {
                    fileList: e.result.fileList.map((function (e) {
                      return {
                        fileID: e.fileID,
                        tempFileURL: e.tempFileURL
                      }
                    }))
                  };
                  throw new ve({
                    code: "GET_TEMP_FILE_URL_FAILED",
                    message: "获取临时文件链接失败"
                  })
                }))
              }
            }]), e
          }(),
          Jt = {
            init: function (e) {
              var t = new Wt(e),
                n = {
                  signInAnonymously: function () {
                    return Promise.resolve()
                  },
                  getLoginState: function () {
                    return Promise.resolve(!1)
                  }
                };
              return t.auth = function () {
                return n
              }, t.customAuth = t.auth, t
            }
          },
          Gt = k((function (e, t) {
            e.exports = O.enc.Hex
          }));

        function Qt() {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (e) {
            var t = 16 * Math.random() | 0;
            return ("x" === e ? t : 3 & t | 8).toString(16)
          }))
        }

        function Yt() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = t.data,
            o = t.functionName,
            c = t.method,
            a = t.headers,
            r = t.signHeaderKeys,
            u = void 0 === r ? [] : r,
            s = t.config,
            y = String(Date.now()),
            d = Qt(),
            l = Object.assign({}, a, {
              "x-from-app-id": s.spaceAppId,
              "x-from-env-id": s.spaceId,
              "x-to-env-id": s.spaceId,
              "x-from-instance-id": y,
              "x-from-function-name": o,
              "x-client-timestamp": y,
              "x-alipay-source": "client",
              "x-request-id": d,
              "x-alipay-callid": d,
              "x-trace-id": d
            }),
            f = ["x-from-app-id", "x-from-env-id", "x-to-env-id", "x-from-instance-id", "x-from-function-name", "x-client-timestamp"].concat(u),
            m = e.split("?") || [],
            p = (0, i.default)(m, 2),
            h = p[0],
            C = void 0 === h ? "" : h,
            g = p[1],
            v = void 0 === g ? "" : g,
            N = function (e) {
              var t = "HMAC-SHA256",
                n = e.signedHeaders.join(";"),
                o = e.signedHeaders.map((function (t) {
                  return "".concat(t.toLowerCase(), ":").concat(e.headers[t], "\n")
                })).join(""),
                c = Le(e.body).toString(Gt),
                a = "".concat(e.method.toUpperCase(), "\n").concat(e.path, "\n").concat(e.query, "\n").concat(o, "\n").concat(n, "\n").concat(c, "\n"),
                r = Le(a).toString(Gt),
                u = "".concat(t, "\n").concat(e.timestamp, "\n").concat(r, "\n"),
                i = Me(u, e.secretKey).toString(Gt);
              return "".concat(t, " Credential=").concat(e.secretId, ", SignedHeaders=").concat(n, ", Signature=").concat(i)
            }({
              path: C,
              query: v,
              method: c,
              headers: l,
              timestamp: y,
              body: JSON.stringify(n),
              secretId: s.accessKey,
              secretKey: s.secretKey,
              signedHeaders: f.sort()
            });
          return {
            url: "".concat(s.endpoint).concat(e),
            headers: Object.assign({}, l, {
              Authorization: N
            })
          }
        }

        function Zt(e) {
          var t = e.url,
            n = e.data,
            o = e.method,
            c = void 0 === o ? "POST" : o,
            a = e.headers,
            r = void 0 === a ? {} : a,
            u = e.timeout;
          return new Promise((function (e, o) {
            _e.request({
              url: t,
              method: c,
              data: "object" == (0, s.default)(n) ? JSON.stringify(n) : n,
              header: r,
              dataType: "json",
              timeout: u,
              complete: function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                  n = r["x-trace-id"] || "";
                if (!t.statusCode || t.statusCode >= 400) {
                  var c = t.data || {},
                    a = c.message,
                    u = c.errMsg,
                    i = c.trace_id;
                  return o(new ve({
                    code: "SYS_ERR",
                    message: a || u || "request:fail",
                    requestId: i || n
                  }))
                }
                e({
                  status: t.statusCode,
                  data: t.data,
                  headers: t.header,
                  requestId: n
                })
              }
            })
          }))
        }

        function Xt(e, t) {
          var n = e.path,
            o = e.data,
            c = e.method,
            a = void 0 === c ? "GET" : c,
            r = Yt(n, {
              functionName: "",
              data: o,
              method: a,
              headers: {
                "x-alipay-cloud-mode": "oss",
                "x-data-api-type": "oss",
                "x-expire-timestamp": Date.now() + 6e4
              },
              signHeaderKeys: ["x-data-api-type", "x-expire-timestamp"],
              config: t
            });
          return Zt({
            url: r.url,
            data: o,
            method: a,
            headers: r.headers
          }).then((function (e) {
            var t = e.data || {};
            if (!t.success) throw new ve({
              code: e.errCode,
              message: e.errMsg,
              requestId: e.requestId
            });
            return t.data || {}
          })).catch((function (e) {
            throw new ve({
              code: e.errCode,
              message: e.errMsg,
              requestId: e.requestId
            })
          }))
        }

        function en() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
            t = e.trim().replace(/^cloud:\/\//, ""),
            n = t.indexOf("/");
          if (n <= 0) throw new ve({
            code: "INVALID_PARAM",
            message: "fileID不合法"
          });
          var o = t.substring(0, n),
            c = t.substring(n + 1);
          return o !== this.config.spaceId && console.warn("file ".concat(e, " does not belong to env ").concat(this.config.spaceId)), c
        }

        function tn() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
          return "cloud://".concat(this.config.spaceId, "/").concat(e.replace(/^\/+/, ""))
        }
        var nn = function () {
            function e(t) {
              (0, C.default)(this, e), this.config = t
            }
            return (0, g.default)(e, [{
              key: "signedURL",
              value: function (e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                  n = "/ws/function/".concat(e),
                  o = this.config.wsEndpoint.replace(/^ws(s)?:\/\//, ""),
                  c = Object.assign({}, t, {
                    accessKeyId: this.config.accessKey,
                    signatureNonce: Qt(),
                    timestamp: "" + Date.now()
                  }),
                  a = [n, ["accessKeyId", "authorization", "signatureNonce", "timestamp"].sort().map((function (e) {
                    return c[e] ? "".concat(e, "=").concat(c[e]) : null
                  })).filter(Boolean).join("&"), "host:".concat(o)].join("\n"),
                  r = ["HMAC-SHA256", Le(a).toString(Gt)].join("\n"),
                  u = Me(r, this.config.secretKey).toString(Gt),
                  i = Object.keys(c).map((function (e) {
                    return "".concat(e, "=").concat(encodeURIComponent(c[e]))
                  })).join("&");
                return "".concat(this.config.wsEndpoint).concat(n, "?").concat(i, "&signature=").concat(u)
              }
            }]), e
          }(),
          on = function () {
            function e(t) {
              if ((0, C.default)(this, e), ["spaceId", "spaceAppId", "accessKey", "secretKey"].forEach((function (e) {
                  if (!Object.prototype.hasOwnProperty.call(t, e)) throw new Error("".concat(e, " required"))
                })), t.endpoint) {
                if ("string" != typeof t.endpoint) throw new Error("endpoint must be string");
                if (!/^https:\/\//.test(t.endpoint)) throw new Error("endpoint must start with https://");
                t.endpoint = t.endpoint.replace(/\/$/, "")
              }
              this.config = Object.assign({}, t, {
                endpoint: t.endpoint || "https://".concat(t.spaceId, ".api-hz.cloudbasefunction.cn"),
                wsEndpoint: t.wsEndpoint || "wss://".concat(t.spaceId, ".api-hz.cloudbasefunction.cn")
              }), this._websocket = new nn(this.config)
            }
            return (0, g.default)(e, [{
              key: "callFunction",
              value: function (e) {
                return function (e, t) {
                  var n = e.name,
                    o = e.data,
                    c = e.async,
                    a = void 0 !== c && c,
                    r = e.timeout,
                    u = "POST",
                    i = {
                      "x-to-function-name": n
                    };
                  a && (i["x-function-invoke-type"] = "async");
                  var s = Yt("/functions/invokeFunction", {
                    functionName: n,
                    data: o,
                    method: u,
                    headers: i,
                    signHeaderKeys: ["x-to-function-name"],
                    config: t
                  });
                  return Zt({
                    url: s.url,
                    data: o,
                    method: u,
                    headers: s.headers,
                    timeout: r
                  }).then((function (e) {
                    var t = 0;
                    if (a) {
                      var n = e.data || {};
                      t = "200" === n.errCode ? 0 : n.errCode, e.data = n.data || {}, e.errMsg = n.errMsg
                    }
                    if (0 !== t) throw new ve({
                      code: t,
                      message: e.errMsg,
                      requestId: e.requestId
                    });
                    return {
                      errCode: t,
                      success: 0 === t,
                      requestId: e.requestId,
                      result: e.data
                    }
                  })).catch((function (e) {
                    throw new ve({
                      code: e.errCode,
                      message: e.errMsg,
                      requestId: e.requestId
                    })
                  }))
                }(e, this.config)
              }
            }, {
              key: "uploadFileToOSS",
              value: function (e) {
                var t = e.url,
                  n = e.filePath,
                  o = e.fileType,
                  c = e.formData,
                  a = e.onUploadProgress;
                return new Promise((function (e, r) {
                  var u = _e.uploadFile({
                    url: t,
                    filePath: n,
                    fileType: o,
                    formData: c,
                    name: "file",
                    success: function (t) {
                      t && t.statusCode < 400 ? e(t) : r(new ve({
                        code: "UPLOAD_FAILED",
                        message: "文件上传失败"
                      }))
                    },
                    fail: function (e) {
                      r(new ve({
                        code: e.code || "UPLOAD_FAILED",
                        message: e.message || e.errMsg || "文件上传失败"
                      }))
                    }
                  });
                  "function" == typeof a && u && "function" == typeof u.onProgressUpdate && u.onProgressUpdate((function (e) {
                    a({
                      loaded: e.totalBytesSent,
                      total: e.totalBytesExpectedToSend
                    })
                  }))
                }))
              }
            }, {
              key: "uploadFile",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t) {
                  var n, o, c, a, u, i, s, y, d, l, f;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (n = t.filePath, o = t.cloudPath, c = void 0 === o ? "" : o, a = t.fileType, u = void 0 === a ? "image" : a, i = t.onUploadProgress, "string" === M(c)) {
                          e.next = 3;
                          break
                        }
                        throw new ve({
                          code: "INVALID_PARAM",
                          message: "cloudPath必须为字符串类型"
                        });
                      case 3:
                        if (c = c.trim()) {
                          e.next = 5;
                          break
                        }
                        throw new ve({
                          code: "INVALID_PARAM",
                          message: "cloudPath不可为空"
                        });
                      case 5:
                        if (!/:\/\//.test(c)) {
                          e.next = 7;
                          break
                        }
                        throw new ve({
                          code: "INVALID_PARAM",
                          message: "cloudPath不合法"
                        });
                      case 7:
                        return e.next = 9, Xt({
                          path: "/".concat(c.replace(/^\//, ""), "?post_url")
                        }, this.config);
                      case 9:
                        return s = e.sent, y = s.file_id, d = s.upload_url, l = s.form_data, f = l && l.reduce((function (e, t) {
                          return e[t.key] = t.value, e
                        }), {}), e.abrupt("return", this.uploadFileToOSS({
                          url: d,
                          filePath: n,
                          fileType: u,
                          formData: f,
                          onUploadProgress: i
                        }).then((function () {
                          return {
                            fileID: y
                          }
                        })));
                      case 15:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "getTempFileURL",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t) {
                  var n, o = this;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return n = t.fileList, e.abrupt("return", new Promise((function (e, t) {
                          (!n || n.length < 0) && e({
                            code: "INVALID_PARAM",
                            message: "fileList不能为空数组"
                          }), n.length > 50 && e({
                            code: "INVALID_PARAM",
                            message: "fileList数组长度不能超过50"
                          });
                          var c, a = [],
                            r = N(n);
                          try {
                            for (r.s(); !(c = r.n()).done;) {
                              var u = c.value,
                                i = void 0;
                              "string" !== M(u) && e({
                                code: "INVALID_PARAM",
                                message: "fileList的元素必须是非空的字符串"
                              });
                              try {
                                i = en.call(o, u)
                              } catch (e) {
                                console.warn(e.errCode, e.errMsg), i = u
                              }
                              a.push({
                                file_id: i,
                                expire: 600
                              })
                            }
                          } catch (e) {
                            r.e(e)
                          } finally {
                            r.f()
                          }
                          Xt({
                            path: "/?download_url",
                            data: {
                              file_list: a
                            },
                            method: "POST"
                          }, o.config).then((function (t) {
                            var n = t.file_list;
                            e({
                              fileList: (void 0 === n ? [] : n).map((function (e) {
                                return {
                                  fileID: tn.call(o, e.file_id),
                                  tempFileURL: e.download_url
                                }
                              }))
                            })
                          })).catch((function (e) {
                            return t(e)
                          }))
                        })));
                      case 2:
                      case "end":
                        return e.stop()
                    }
                  }), e)
                })));
                return function (t) {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "connectWebSocket",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e(t) {
                  var n, o;
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return n = t.name, o = t.query, e.abrupt("return", _e.connectSocket({
                          url: this._websocket.signedURL(n, o),
                          complete: function () {}
                        }));
                      case 2:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function (t) {
                  return e.apply(this, arguments)
                }
              }()
            }]), e
          }(),
          cn = {
            init: function (e) {
              e.provider = "alipay";
              var t = new on(e);
              return t.auth = function () {
                return {
                  signInAnonymously: function () {
                    return Promise.resolve()
                  },
                  getLoginState: function () {
                    return Promise.resolve(!0)
                  }
                }
              }, t
            }
          };

        function an(e) {
          var t, n = e.data;
          t = Se();
          var o = JSON.parse(JSON.stringify(n || {}));
          if (Object.assign(o, {
              clientInfo: t
            }), !o.uniIdToken) {
            var c = xe().token;
            c && (o.uniIdToken = c)
          }
          return o
        }
        var rn = [{
            rule: /fc_function_not_found|FUNCTION_NOT_FOUND/,
            content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间",
            mode: "append"
          }],
          un = /[\\^$.*+?()[\]{}|]/g,
          sn = RegExp(un.source);

        function yn(e, t, n) {
          return e.replace(new RegExp((o = t) && sn.test(o) ? o.replace(un, "\\$&") : o, "g"), n);
          var o
        }
        var dn = "request",
          ln = "response",
          fn = "both",
          mn = "_globalUniCloudStatus";
        var pn, hn = {
            code: 2e4,
            message: "System error"
          },
          Cn = {
            code: 20101,
            message: "Invalid client"
          };

        function gn(e) {
          var t = e || {},
            n = t.errSubject,
            o = t.subject,
            c = t.errCode,
            a = t.errMsg,
            r = t.code,
            u = t.message,
            i = t.cause;
          return new ve({
            subject: n || o || "uni-secure-network",
            code: c || r || hn.code,
            message: a || u,
            cause: i
          })
        }

        function vn() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.secretType;
          return t === dn || t === ln || t === fn
        }

        function Nn() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          e.name, e.data;
          return !1
        }

        function bn(e) {
          e.functionName, e.result, e.logPvd
        }

        function _n(e) {
          var t = e.callFunction,
            n = function (n) {
              var o = this,
                c = n.name;
              n.data = an.call(e, {
                data: n.data
              });
              var a = {
                  aliyun: "aliyun",
                  tencent: "tcb",
                  tcb: "tcb",
                  alipay: "alipay",
                  dcloud: "dcloud"
                } [this.config.provider],
                r = vn(n),
                u = Nn(n),
                i = r || u;
              return t.call(this, n).then((function (e) {
                return e.errCode = 0, !i && bn.call(o, {
                  functionName: c,
                  result: e,
                  logPvd: a
                }), Promise.resolve(e)
              }), (function (e) {
                return !i && bn.call(o, {
                  functionName: c,
                  result: e,
                  logPvd: a
                }), e && e.message && (e.message = function () {
                  for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.message, n = void 0 === t ? "" : t, o = e.extraInfo, c = void 0 === o ? {} : o, a = e.formatter, r = void 0 === a ? [] : a, u = 0; u < r.length; u++) {
                    var i = r[u],
                      s = i.rule,
                      y = i.content,
                      d = i.mode,
                      l = n.match(s);
                    if (l) {
                      for (var f = y, m = 1; m < l.length; m++) f = yn(f, "{$".concat(m, "}"), l[m]);
                      for (var p in c) f = yn(f, "{".concat(p, "}"), c[p]);
                      return "replace" === d ? f : n + f
                    }
                  }
                  return n
                }({
                  message: "[".concat(n.name, "]: ").concat(e.message),
                  formatter: rn,
                  extraInfo: {
                    functionName: c
                  }
                })), Promise.reject(e)
              }))
            };
          e.callFunction = function (t) {
            var o, c, a = e.config,
              r = a.provider,
              u = a.spaceId,
              i = t.name;
            return t.data = t.data || {}, o = (o = n).bind(e), c = Nn(t) ? n.call(e, t) : function (e) {
              var t = e.name,
                n = e.data;
              return "uni-id-co" === t && "secureNetworkHandshakeByWeixin" === (void 0 === n ? {} : n).method
            }(t) ? o.call(e, t) : vn(t) ? new pn({
              secretType: t.secretType,
              uniCloudIns: e
            }).wrapEncryptDataCallFunction(n.bind(e))(t) : function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.provider,
                n = e.spaceId,
                o = e.functionName,
                c = ke(),
                a = c.appId,
                r = c.uniPlatform,
                u = c.osName,
                i = r;
              "app" === r && (i = u);
              var s = function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                  t = e.provider,
                  n = e.spaceId,
                  o = K;
                if (!o) return {};
                t = function (e) {
                  return "tencent" === e ? "tcb" : e
                }(t);
                var c = o.find((function (e) {
                  return e.provider === t && e.spaceId === n
                }));
                return c && c.config
              }({
                provider: t,
                spaceId: n
              });
              if (!s || !s.accessControl || !s.accessControl.enable) return !1;
              var y = s.accessControl.function || {},
                d = Object.keys(y);
              if (0 === d.length) return !0;
              var l = function (e, t) {
                for (var n, o, c, a = 0; a < e.length; a++) {
                  var r = e[a];
                  r !== t ? "*" !== r ? r.split(",").map((function (e) {
                    return e.trim()
                  })).indexOf(t) > -1 && (o = r) : c = r : n = r
                }
                return n || o || c
              }(d, o);
              if (!l) return !1;
              if ((y[l] || []).find((function () {
                  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                  return e.appId === a && (e.platform || "").toLowerCase() === i.toLowerCase()
                }))) return !0;
              throw console.error("此应用[appId: ".concat(a, ", platform: ").concat(i, "]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client")), gn(Cn)
            }({
              provider: r,
              spaceId: u,
              functionName: i
            }) ? new pn({
              secretType: t.secretType,
              uniCloudIns: e
            }).wrapVerifyClientCallFunction(n.bind(e))(t) : o(t), Object.defineProperty(c, "result", {
              get: function () {
                return console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}
              }
            }), c.then((function (e) {
              return "undefined" != typeof UTSJSONObject && (e.result = new UTSJSONObject(e.result)), e
            }))
          }
        }
        pn = (0, g.default)((function e() {
          throw (0, C.default)(this, e), gn({
            message: "Platform ".concat(W, " is not enabled, please check whether secure network module is enabled in your manifest.json")
          })
        }));
        var xn = Symbol("CLIENT_DB_INTERNAL");

        function wn(e, t) {
          return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = xn, e.inspect = null, e.__ob__ = void 0, new Proxy(e, {
            get: function (e, n, o) {
              if ("_uniClient" === n) return null;
              if ("symbol" == (0, s.default)(n)) return e[n];
              if (n in e || "string" != typeof n) {
                var c = e[n];
                return "function" == typeof c ? c.bind(e) : c
              }
              return t.get(e, n, o)
            }
          })
        }

        function kn(e) {
          return {
            on: function (t, n) {
              e[t] = e[t] || [], e[t].indexOf(n) > -1 || e[t].push(n)
            },
            off: function (t, n) {
              e[t] = e[t] || [];
              var o = e[t].indexOf(n); - 1 !== o && e[t].splice(o, 1)
            }
          }
        }
        var On = ["db.Geo", "db.command", "command.aggregate"];

        function Sn(e, t) {
          return On.indexOf("".concat(e, ".").concat(t)) > -1
        }

        function Pn(e) {
          switch (M(e)) {
            case "array":
              return e.map((function (e) {
                return Pn(e)
              }));
            case "object":
              return e._internalType === xn || Object.keys(e).forEach((function (t) {
                e[t] = Pn(e[t])
              })), e;
            case "regexp":
              return {
                $regexp: {
                  source: e.source,
                  flags: e.flags
                }
              };
            case "date":
              return {
                $date: e.toISOString()
              };
            default:
              return e
          }
        }

        function An(e) {
          return e && e.content && e.content.$method
        }
        var Tn = function () {
          function e(t, n, o) {
            (0, C.default)(this, e), this.content = t, this.prevStage = n || null, this.udb = null, this._database = o
          }
          return (0, g.default)(e, [{
            key: "toJSON",
            value: function () {
              for (var e = this, t = [e.content]; e.prevStage;) e = e.prevStage, t.push(e.content);
              return {
                $db: t.reverse().map((function (e) {
                  return {
                    $method: e.$method,
                    $param: Pn(e.$param)
                  }
                }))
              }
            }
          }, {
            key: "toString",
            value: function () {
              return JSON.stringify(this.toJSON())
            }
          }, {
            key: "getAction",
            value: function () {
              var e = this.toJSON().$db.find((function (e) {
                return "action" === e.$method
              }));
              return e && e.$param && e.$param[0]
            }
          }, {
            key: "getCommand",
            value: function () {
              return {
                $db: this.toJSON().$db.filter((function (e) {
                  return "action" !== e.$method
                }))
              }
            }
          }, {
            key: "isAggregate",
            get: function () {
              for (var e = this; e;) {
                var t = An(e),
                  n = An(e.prevStage);
                if ("aggregate" === t && "collection" === n || "pipeline" === t) return !0;
                e = e.prevStage
              }
              return !1
            }
          }, {
            key: "isCommand",
            get: function () {
              for (var e = this; e;) {
                if ("command" === An(e)) return !0;
                e = e.prevStage
              }
              return !1
            }
          }, {
            key: "isAggregateCommand",
            get: function () {
              for (var e = this; e;) {
                var t = An(e),
                  n = An(e.prevStage);
                if ("aggregate" === t && "command" === n) return !0;
                e = e.prevStage
              }
              return !1
            }
          }, {
            key: "getNextStageFn",
            value: function (e) {
              var t = this;
              return function () {
                return In({
                  $method: e,
                  $param: Pn(Array.from(arguments))
                }, t, t._database)
              }
            }
          }, {
            key: "count",
            get: function () {
              return this.isAggregate ? this.getNextStageFn("count") : function () {
                return this._send("count", Array.from(arguments))
              }
            }
          }, {
            key: "remove",
            get: function () {
              return this.isCommand ? this.getNextStageFn("remove") : function () {
                return this._send("remove", Array.from(arguments))
              }
            }
          }, {
            key: "get",
            value: function () {
              return this._send("get", Array.from(arguments))
            }
          }, {
            key: "add",
            get: function () {
              return this.isCommand ? this.getNextStageFn("add") : function () {
                return this._send("add", Array.from(arguments))
              }
            }
          }, {
            key: "update",
            value: function () {
              return this._send("update", Array.from(arguments))
            }
          }, {
            key: "end",
            value: function () {
              return this._send("end", Array.from(arguments))
            }
          }, {
            key: "set",
            get: function () {
              return this.isCommand ? this.getNextStageFn("set") : function () {
                throw new Error("JQL禁止使用set方法")
              }
            }
          }, {
            key: "_send",
            value: function (e, t) {
              var n = this.getAction(),
                o = this.getCommand();
              return o.$db.push({
                $method: e,
                $param: Pn(t)
              }), this._database._callCloudFunction({
                action: n,
                command: o
              })
            }
          }]), e
        }();

        function In(e, t, n) {
          return wn(new Tn(e, t, n), {
            get: function (e, t) {
              var o = "db";
              return e && e.content && (o = e.content.$method), Sn(o, t) ? In({
                $method: t
              }, e, n) : function () {
                return In({
                  $method: t,
                  $param: Pn(Array.from(arguments))
                }, e, n)
              }
            }
          })
        }

        function jn(e) {
          var t = e.path,
            n = e.method;
          return function () {
            function e() {
              (0, C.default)(this, e), this.param = Array.from(arguments)
            }
            return (0, g.default)(e, [{
              key: "toJSON",
              value: function () {
                return {
                  $newDb: [].concat((0, y.default)(t.map((function (e) {
                    return {
                      $method: e
                    }
                  }))), [{
                    $method: n,
                    $param: this.param
                  }])
                }
              }
            }, {
              key: "toString",
              value: function () {
                return JSON.stringify(this.toJSON())
              }
            }]), e
          }()
        }

        function En(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return wn(new e(t), {
            get: function (e, t) {
              return Sn("db", t) ? In({
                $method: t
              }, null, e) : function () {
                return In({
                  $method: t,
                  $param: Pn(Array.from(arguments))
                }, null, e)
              }
            }
          })
        }
        var $n = function (e) {
            (0, f.default)(n, e);
            var t = w(n);

            function n() {
              return (0, C.default)(this, n), t.apply(this, arguments)
            }
            return (0, g.default)(n, [{
              key: "_parseResult",
              value: function (e) {
                return this._isJQL ? e.result : e
              }
            }, {
              key: "_callCloudFunction",
              value: function (e) {
                var t = this,
                  n = e.action,
                  o = e.command,
                  c = e.multiCommand,
                  a = e.queryList;

                function r(e, t) {
                  if (c && a)
                    for (var n = 0; n < a.length; n++) {
                      var o = a[n];
                      o.udb && "function" == typeof o.udb.setResult && (t ? o.udb.setResult(t) : o.udb.setResult(e.result.dataList[n]))
                    }
                }
                var u = this,
                  i = this._isJQL ? "databaseForJQL" : "database";

                function s(e) {
                  return u._callback("error", [e]), te(ne(i, "fail"), e).then((function () {
                    return te(ne(i, "complete"), e)
                  })).then((function () {
                    return r(null, e), me(ae, {
                      type: ie,
                      content: e
                    }), Promise.reject(e)
                  }))
                }
                var y = te(ne(i, "invoke")),
                  d = this._uniClient;
                return y.then((function () {
                  return d.callFunction({
                    name: "DCloud-clientDB",
                    type: $,
                    data: {
                      action: n,
                      command: o,
                      multiCommand: c
                    }
                  })
                })).then((function (e) {
                  var n = e.result,
                    o = n.code,
                    c = n.message,
                    a = n.token,
                    y = n.tokenExpired,
                    d = n.systemInfo,
                    l = void 0 === d ? [] : d;
                  if (l)
                    for (var f = 0; f < l.length; f++) {
                      var m = l[f],
                        p = m.level,
                        h = m.message,
                        C = m.detail,
                        g = "[System Info]" + h;
                      C && (g = "".concat(g, "\n详细信息：").concat(C)), (console[p] || console.log)(g)
                    }
                  if (o) return s(new ve({
                    code: o,
                    message: c,
                    requestId: e.requestId
                  }));
                  e.result.errCode = e.result.errCode || e.result.code, e.result.errMsg = e.result.errMsg || e.result.message, a && y && (we({
                    token: a,
                    tokenExpired: y
                  }), t._callbackAuth("refreshToken", [{
                    token: a,
                    tokenExpired: y
                  }]), t._callback("refreshToken", [{
                    token: a,
                    tokenExpired: y
                  }]), me(ue, {
                    token: a,
                    tokenExpired: y
                  }));
                  for (var v = [{
                      prop: "affectedDocs",
                      tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代"
                    }, {
                      prop: "code",
                      tips: "code不再推荐使用，请使用errCode替代"
                    }, {
                      prop: "message",
                      tips: "message不再推荐使用，请使用errMsg替代"
                    }], N = function (t) {
                      var n = v[t],
                        o = n.prop,
                        c = n.tips;
                      if (o in e.result) {
                        var a = e.result[o];
                        Object.defineProperty(e.result, o, {
                          get: function () {
                            return console.warn(c), a
                          }
                        })
                      }
                    }, b = 0; b < v.length; b++) N(b);
                  return function (e) {
                    return te(ne(i, "success"), e).then((function () {
                      return te(ne(i, "complete"), e)
                    })).then((function () {
                      r(e, null);
                      var t = u._parseResult(e);
                      return me(ae, {
                        type: ie,
                        content: t
                      }), Promise.resolve(t)
                    }))
                  }(e)
                }), (function (e) {
                  return /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB"), s(new ve({
                    code: e.code || "SYSTEM_ERROR",
                    message: e.message,
                    requestId: e.requestId
                  }))
                }))
              }
            }]), n
          }(function () {
            function e() {
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                n = t.uniClient,
                o = void 0 === n ? {} : n,
                c = t.isJQL,
                a = void 0 !== c && c;
              (0, C.default)(this, e), this._uniClient = o, this._authCallBacks = {}, this._dbCallBacks = {}, o._isDefault && (this._dbCallBacks = Q("_globalUniCloudDatabaseCallback")), a || (this.auth = kn(this._authCallBacks)), this._isJQL = a, Object.assign(this, kn(this._dbCallBacks)), this.env = wn({}, {
                get: function (e, t) {
                  return {
                    $env: t
                  }
                }
              }), this.Geo = wn({}, {
                get: function (e, t) {
                  return jn({
                    path: ["Geo"],
                    method: t
                  })
                }
              }), this.serverDate = jn({
                path: [],
                method: "serverDate"
              }), this.RegExp = jn({
                path: [],
                method: "RegExp"
              })
            }
            return (0, g.default)(e, [{
              key: "getCloudEnv",
              value: function (e) {
                if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv参数错误");
                return {
                  $env: e.replace("$cloudEnv_", "")
                }
              }
            }, {
              key: "_callback",
              value: function (e, t) {
                var n = this._dbCallBacks;
                n[e] && n[e].forEach((function (e) {
                  e.apply(void 0, (0, y.default)(t))
                }))
              }
            }, {
              key: "_callbackAuth",
              value: function (e, t) {
                var n = this._authCallBacks;
                n[e] && n[e].forEach((function (e) {
                  e.apply(void 0, (0, y.default)(t))
                }))
              }
            }, {
              key: "multiSend",
              value: function () {
                var e = Array.from(arguments),
                  t = e.map((function (e) {
                    var t = e.getAction(),
                      n = e.getCommand();
                    if ("getTemp" !== n.$db[n.$db.length - 1].$method) throw new Error("multiSend只支持子命令内使用getTemp");
                    return {
                      action: t,
                      command: n
                    }
                  }));
                return this._callCloudFunction({
                  multiCommand: t,
                  queryList: e
                })
              }
            }]), e
          }()),
          Dn = "token无效，跳转登录页面",
          Ln = "token过期，跳转登录页面",
          Mn = {
            TOKEN_INVALID_TOKEN_EXPIRED: Ln,
            TOKEN_INVALID_INVALID_CLIENTID: Dn,
            TOKEN_INVALID: Dn,
            TOKEN_INVALID_WRONG_TOKEN: Dn,
            TOKEN_INVALID_ANONYMOUS_USER: Dn
          },
          Un = {
            "uni-id-token-expired": Ln,
            "uni-id-check-token-failed": Dn,
            "uni-id-token-not-exist": Dn,
            "uni-id-check-device-feature-failed": Dn
          };

        function Rn(e, t) {
          return (e ? "".concat(e, "/").concat(t) : t).replace(/^\//, "")
        }

        function Fn() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            n = [],
            o = [];
          return e.forEach((function (e) {
            !0 === e.needLogin ? n.push(Rn(t, e.path)) : !1 === e.needLogin && o.push(Rn(t, e.path))
          })), {
            needLoginPage: n,
            notNeedLoginPage: o
          }
        }

        function qn(e) {
          return e.split("?")[0].replace(/^\//, "")
        }

        function Bn() {
          return function (e) {
            var t = e && e.$page && e.$page.fullPath || "";
            return t ? ("/" !== t.charAt(0) && (t = "/" + t), t) : t
          }(function () {
            var e = getCurrentPages();
            return e[e.length - 1]
          }())
        }

        function Vn() {
          return qn(Bn())
        }

        function Hn() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          if (!e) return !1;
          if (!(t && t.list && t.list.length)) return !1;
          var n = t.list,
            o = qn(e);
          return n.some((function (e) {
            return e.pagePath === o
          }))
        }
        var zn, Kn = !!v.default.uniIdRouter,
          Wn = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : v.default,
              t = e.pages,
              n = void 0 === t ? [] : t,
              o = e.subPackages,
              c = void 0 === o ? [] : o,
              a = e.uniIdRouter,
              r = void 0 === a ? {} : a,
              u = e.tabBar,
              i = void 0 === u ? {} : u,
              s = r.loginPage,
              d = r.needLogin,
              l = void 0 === d ? [] : d,
              f = r.resToLogin,
              m = void 0 === f || f,
              p = Fn(n),
              h = p.needLoginPage,
              C = p.notNeedLoginPage,
              g = function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                  t = [],
                  n = [];
                return e.forEach((function (e) {
                  var o = e.root,
                    c = e.pages,
                    a = Fn(void 0 === c ? [] : c, o),
                    r = a.needLoginPage,
                    u = a.notNeedLoginPage;
                  t.push.apply(t, (0, y.default)(r)), n.push.apply(n, (0, y.default)(u))
                })), {
                  needLoginPage: t,
                  notNeedLoginPage: n
                }
              }(c),
              N = g.needLoginPage,
              b = g.notNeedLoginPage;
            return {
              loginPage: s,
              routerNeedLogin: l,
              resToLogin: m,
              needLoginPage: [].concat((0, y.default)(h), (0, y.default)(N)),
              notNeedLoginPage: [].concat((0, y.default)(C), (0, y.default)(b)),
              loginPageInTabBar: Hn(s, i)
            }
          }(),
          Jn = Wn.loginPage,
          Gn = Wn.routerNeedLogin,
          Qn = Wn.resToLogin,
          Yn = Wn.needLoginPage,
          Zn = Wn.notNeedLoginPage,
          Xn = Wn.loginPageInTabBar;
        if (Yn.indexOf(Jn) > -1) throw new Error("Login page [".concat(Jn, '] should not be "needLogin", please check your pages.json'));

        function eo(e) {
          var t = Vn();
          if ("/" === e.charAt(0)) return e;
          var n = e.split("?"),
            o = (0, i.default)(n, 2),
            c = o[0],
            a = o[1],
            r = c.replace(/^\//, "").split("/"),
            u = t.split("/");
          u.pop();
          for (var s = 0; s < r.length; s++) {
            var y = r[s];
            ".." === y ? u.pop() : "." !== y && u.push(y)
          }
          return "" === u[0] && u.shift(), "/" + u.join("/") + (a ? "?" + a : "")
        }

        function to(e) {
          var t = qn(eo(e));
          return !(Zn.indexOf(t) > -1) && (Yn.indexOf(t) > -1 || Gn.some((function (t) {
            return function (e, t) {
              return new RegExp(t).test(e)
            }(e, t)
          })))
        }

        function no(e) {
          var t = qn(e.redirect),
            n = qn(Jn);
          return Vn() !== n && t !== n
        }

        function oo() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.api,
            n = e.redirect;
          if (n && no({
              redirect: n
            })) {
            var c = function (e, t) {
              return "/" !== e.charAt(0) && (e = "/" + e), t ? e.indexOf("?") > -1 ? e + "&uniIdRedirectUrl=".concat(encodeURIComponent(t)) : e + "?uniIdRedirectUrl=".concat(encodeURIComponent(t)) : e
            }(Jn, n);
            Xn ? "navigateTo" !== t && "redirectTo" !== t || (t = "switchTab") : "switchTab" === t && (t = "navigateTo");
            var a = {
              navigateTo: o.navigateTo,
              redirectTo: o.redirectTo,
              switchTab: o.switchTab,
              reLaunch: o.reLaunch
            };
            setTimeout((function () {
              a[t]({
                url: c
              })
            }), 0)
          }
        }

        function co() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.url,
            n = {
              abortLoginPageJump: !1,
              autoToLoginPage: !1
            },
            o = function () {
              var e, t = xe(),
                n = t.token,
                o = t.tokenExpired;
              if (n) {
                if (o < Date.now()) {
                  var c = "uni-id-token-expired";
                  e = {
                    errCode: c,
                    errMsg: Un[c]
                  }
                }
              } else {
                var a = "uni-id-check-token-failed";
                e = {
                  errCode: a,
                  errMsg: Un[a]
                }
              }
              return e
            }();
          if (to(t) && o) {
            if (o.uniIdRedirectUrl = t, de(re).length > 0) return setTimeout((function () {
              me(re, o)
            }), 0), n.abortLoginPageJump = !0, n;
            n.autoToLoginPage = !0
          }
          return n
        }

        function ao() {
          ! function () {
            var e = Bn(),
              t = co({
                url: e
              }),
              n = t.abortLoginPageJump,
              o = t.autoToLoginPage;
            n || o && oo({
              api: "redirectTo",
              redirect: e
            })
          }();
          for (var e = ["navigateTo", "redirectTo", "reLaunch", "switchTab"], t = function (t) {
              var n = e[t];
              o.addInterceptor(n, {
                invoke: function (e) {
                  var t = co({
                      url: e.url
                    }),
                    o = t.abortLoginPageJump,
                    c = t.autoToLoginPage;
                  return o ? e : c ? (oo({
                    api: n,
                    redirect: eo(e.url)
                  }), !1) : e
                }
              })
            }, n = 0; n < e.length; n++) t(n)
        }

        function ro() {
          this.onResponse((function (e) {
            var t = e.type,
              n = e.content,
              o = !1;
            switch (t) {
              case "cloudobject":
                o = function (e) {
                  return "object" == (0, s.default)(e) && (e || {}).errCode in Un
                }(n);
                break;
              case "clientdb":
                o = function (e) {
                  return "object" == (0, s.default)(e) && (e || {}).errCode in Mn
                }(n)
            }
            o && function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = de(re);
              Ce().then((function () {
                var n = Bn();
                if (n && no({
                    redirect: n
                  })) return t.length > 0 ? me(re, Object.assign({
                  uniIdRedirectUrl: n
                }, e)) : void(Jn && oo({
                  api: "navigateTo",
                  redirect: n
                }))
              }))
            }(n)
          }))
        }

        function uo(e) {
          ! function (e) {
            e.onResponse = function (e) {
              le(ae, e)
            }, e.offResponse = function (e) {
              fe(ae, e)
            }
          }(e),
          function (e) {
            e.onNeedLogin = function (e) {
              le(re, e)
            }, e.offNeedLogin = function (e) {
              fe(re, e)
            }, Kn && (Q(mn).needLoginInit || (Q(mn).needLoginInit = !0, Ce().then((function () {
              ao.call(e)
            })), Qn && ro.call(e)))
          }(e),
          function (e) {
            e.onRefreshToken = function (e) {
              le(ue, e)
            }, e.offRefreshToken = function (e) {
              fe(ue, e)
            }
          }(e)
        }
        var io = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          so = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

        function yo() {
          var e, t, n = xe().token || "",
            o = n.split(".");
          if (!n || 3 !== o.length) return {
            uid: null,
            role: [],
            permission: [],
            tokenExpired: 0
          };
          try {
            e = JSON.parse((t = o[1], decodeURIComponent(zn(t).split("").map((function (e) {
              return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
            })).join(""))))
          } catch (n) {
            throw new Error("获取当前用户信息出错，详细错误信息为：" + n.message)
          }
          return e.tokenExpired = 1e3 * e.exp, delete e.exp, delete e.iat, e
        }
        zn = "function" != typeof atob ? function (e) {
          if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !so.test(e)) throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
          var t;
          e += "==".slice(2 - (3 & e.length));
          for (var n, o, c = "", a = 0; a < e.length;) t = io.indexOf(e.charAt(a++)) << 18 | io.indexOf(e.charAt(a++)) << 12 | (n = io.indexOf(e.charAt(a++))) << 6 | (o = io.indexOf(e.charAt(a++))), c += 64 === n ? String.fromCharCode(t >> 16 & 255) : 64 === o ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);
          return c
        } : atob;
        var lo = function (e) {
            return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
          }(k((function (e, t) {
            Object.defineProperty(t, "__esModule", {
              value: !0
            });
            var n = "chooseAndUploadFile:ok",
              a = "chooseAndUploadFile:fail";

            function r(e, t) {
              return e.tempFiles.forEach((function (e, n) {
                e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + n + e.name.substring(e.name.lastIndexOf("."))
              })), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map((function (e) {
                return e.path
              }))), e
            }

            function u(e, t, o) {
              var c = o.onChooseFile,
                a = o.onUploadProgress;
              return t.then((function (e) {
                if (c) {
                  var t = c(e);
                  if (void 0 !== t) return Promise.resolve(t).then((function (t) {
                    return void 0 === t ? e : t
                  }))
                }
                return e
              })).then((function (t) {
                return !1 === t ? {
                  errMsg: n,
                  tempFilePaths: [],
                  tempFiles: []
                } : function (e, t) {
                  var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 5,
                    c = arguments.length > 3 ? arguments[3] : void 0;
                  (t = Object.assign({}, t)).errMsg = n;
                  var a = t.tempFiles,
                    r = a.length,
                    u = 0;
                  return new Promise((function (n) {
                    for (; u < o;) i();

                    function i() {
                      var o = u++;
                      if (o >= r) !a.find((function (e) {
                        return !e.url && !e.errMsg
                      })) && n(t);
                      else {
                        var s = a[o];
                        e.uploadFile({
                          provider: s.provider,
                          filePath: s.path,
                          cloudPath: s.cloudPath,
                          fileType: s.fileType,
                          cloudPathAsRealPath: s.cloudPathAsRealPath,
                          onUploadProgress: function (e) {
                            e.index = o, e.tempFile = s, e.tempFilePath = s.path, c && c(e)
                          }
                        }).then((function (e) {
                          s.url = e.fileID, o < r && i()
                        })).catch((function (e) {
                          s.errMsg = e.errMsg || e.message, o < r && i()
                        }))
                      }
                    }
                  }))
                }(e, t, 5, a)
              }))
            }
            t.initChooseAndUploadFile = function (e) {
              return function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                  type: "all"
                };
                return "image" === t.type ? u(e, function (e) {
                  var t = e.count,
                    n = e.sizeType,
                    c = e.sourceType,
                    u = void 0 === c ? ["album", "camera"] : c,
                    i = e.extension;
                  return new Promise((function (e, c) {
                    o.chooseImage({
                      count: t,
                      sizeType: n,
                      sourceType: u,
                      extension: i,
                      success: function (t) {
                        e(r(t, "image"))
                      },
                      fail: function (e) {
                        c({
                          errMsg: e.errMsg.replace("chooseImage:fail", a)
                        })
                      }
                    })
                  }))
                }(t), t) : "video" === t.type ? u(e, function (e) {
                  var t = e.camera,
                    n = e.compressed,
                    c = e.maxDuration,
                    u = e.sourceType,
                    i = void 0 === u ? ["album", "camera"] : u,
                    s = e.extension;
                  return new Promise((function (e, u) {
                    o.chooseVideo({
                      camera: t,
                      compressed: n,
                      maxDuration: c,
                      sourceType: i,
                      extension: s,
                      success: function (t) {
                        var n = t.tempFilePath,
                          o = t.duration,
                          c = t.size,
                          a = t.height,
                          u = t.width;
                        e(r({
                          errMsg: "chooseVideo:ok",
                          tempFilePaths: [n],
                          tempFiles: [{
                            name: t.tempFile && t.tempFile.name || "",
                            path: n,
                            size: c,
                            type: t.tempFile && t.tempFile.type || "",
                            width: u,
                            height: a,
                            duration: o,
                            fileType: "video",
                            cloudPath: ""
                          }]
                        }, "video"))
                      },
                      fail: function (e) {
                        u({
                          errMsg: e.errMsg.replace("chooseVideo:fail", a)
                        })
                      }
                    })
                  }))
                }(t), t) : u(e, function (e) {
                  var t = e.count,
                    n = e.extension;
                  return new Promise((function (e, u) {
                    var i = o.chooseFile;
                    if (void 0 !== c && "function" == typeof c.chooseMessageFile && (i = c.chooseMessageFile), "function" != typeof i) return u({
                      errMsg: a + " 请指定 type 类型，该平台仅支持选择 image 或 video。"
                    });
                    i({
                      type: "all",
                      count: t,
                      extension: n,
                      success: function (t) {
                        e(r(t))
                      },
                      fail: function (e) {
                        u({
                          errMsg: e.errMsg.replace("chooseFile:fail", a)
                        })
                      }
                    })
                  }))
                }(t), t)
              }
            }
          }))),
          fo = "manual";

        function mo(e) {
          return {
            props: {
              localdata: {
                type: Array,
                default: function () {
                  return []
                }
              },
              options: {
                type: [Object, Array],
                default: function () {
                  return {}
                }
              },
              spaceInfo: {
                type: Object,
                default: function () {
                  return {}
                }
              },
              collection: {
                type: [String, Array],
                default: ""
              },
              action: {
                type: String,
                default: ""
              },
              field: {
                type: String,
                default: ""
              },
              orderby: {
                type: String,
                default: ""
              },
              where: {
                type: [String, Object],
                default: ""
              },
              pageData: {
                type: String,
                default: "add"
              },
              pageCurrent: {
                type: Number,
                default: 1
              },
              pageSize: {
                type: Number,
                default: 20
              },
              getcount: {
                type: [Boolean, String],
                default: !1
              },
              gettree: {
                type: [Boolean, String],
                default: !1
              },
              gettreepath: {
                type: [Boolean, String],
                default: !1
              },
              startwith: {
                type: String,
                default: ""
              },
              limitlevel: {
                type: Number,
                default: 10
              },
              groupby: {
                type: String,
                default: ""
              },
              groupField: {
                type: String,
                default: ""
              },
              distinct: {
                type: [Boolean, String],
                default: !1
              },
              foreignKey: {
                type: String,
                default: ""
              },
              loadtime: {
                type: String,
                default: "auto"
              },
              manual: {
                type: Boolean,
                default: !1
              }
            },
            data: function () {
              return {
                mixinDatacomLoading: !1,
                mixinDatacomHasMore: !1,
                mixinDatacomResData: [],
                mixinDatacomErrorMessage: "",
                mixinDatacomPage: {},
                mixinDatacomError: null
              }
            },
            created: function () {
              var e = this;
              this.mixinDatacomPage = {
                current: this.pageCurrent,
                size: this.pageSize,
                count: 0
              }, this.$watch((function () {
                var t = [];
                return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((function (n) {
                  t.push(e[n])
                })), t
              }), (function (t, n) {
                if (e.loadtime !== fo) {
                  for (var o = !1, c = [], a = 2; a < t.length; a++) t[a] !== n[a] && (c.push(t[a]), o = !0);
                  t[0] !== n[0] && (e.mixinDatacomPage.current = e.pageCurrent), e.mixinDatacomPage.size = e.pageSize, e.onMixinDatacomPropsChange(o, c)
                }
              }))
            },
            methods: {
              onMixinDatacomPropsChange: function (e, t) {},
              mixinDatacomEasyGet: function () {
                var e = this,
                  t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                  n = t.getone,
                  o = void 0 !== n && n,
                  c = t.success,
                  a = t.fail;
                this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomError = null, this.mixinDatacomGet().then((function (t) {
                  e.mixinDatacomLoading = !1;
                  var n = t.result,
                    a = n.data,
                    r = n.count;
                  e.getcount && (e.mixinDatacomPage.count = r), e.mixinDatacomHasMore = a.length < e.pageSize;
                  var u = o ? a.length ? a[0] : void 0 : a;
                  e.mixinDatacomResData = u, c && c(u)
                })).catch((function (t) {
                  e.mixinDatacomLoading = !1, e.mixinDatacomErrorMessage = t, e.mixinDatacomError = t, a && a(t)
                })))
              },
              mixinDatacomGet: function () {
                var t, n, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                o = o || {}, n = "undefined" != typeof __uniX && __uniX ? e.databaseForJQL(this.spaceInfo) : e.database(this.spaceInfo);
                var c = o.action || this.action;
                c && (n = n.action(c));
                var a = o.collection || this.collection;
                n = Array.isArray(a) ? (t = n).collection.apply(t, (0, y.default)(a)) : n.collection(a);
                var r = o.where || this.where;
                r && Object.keys(r).length && (n = n.where(r));
                var u = o.field || this.field;
                u && (n = n.field(u));
                var i = o.foreignKey || this.foreignKey;
                i && (n = n.foreignKey(i));
                var s = o.groupby || this.groupby;
                s && (n = n.groupBy(s));
                var d = o.groupField || this.groupField;
                d && (n = n.groupField(d)), !0 === (void 0 !== o.distinct ? o.distinct : this.distinct) && (n = n.distinct());
                var l = o.orderby || this.orderby;
                l && (n = n.orderBy(l));
                var f = void 0 !== o.pageCurrent ? o.pageCurrent : this.mixinDatacomPage.current,
                  m = void 0 !== o.pageSize ? o.pageSize : this.mixinDatacomPage.size,
                  p = void 0 !== o.getcount ? o.getcount : this.getcount,
                  h = void 0 !== o.gettree ? o.gettree : this.gettree,
                  C = void 0 !== o.gettreepath ? o.gettreepath : this.gettreepath,
                  g = {
                    getCount: p
                  },
                  v = {
                    limitLevel: void 0 !== o.limitlevel ? o.limitlevel : this.limitlevel,
                    startWith: void 0 !== o.startwith ? o.startwith : this.startwith
                  };
                return h && (g.getTree = v), C && (g.getTreePath = v), n = n.skip(m * (f - 1)).limit(m).get(g)
              }
            }
          }
        }

        function po(e) {
          return Q("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e.config.spaceId))
        }

        function ho() {
          return Co.apply(this, arguments)
        }

        function Co() {
          return (Co = (0, d.default)(r.default.mark((function e() {
            var t, n, c, a, u, i, s, y = arguments;
            return r.default.wrap((function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  t = y.length > 0 && void 0 !== y[0] ? y[0] : {}, n = t.openid, c = t.callLoginByWeixin, a = void 0 !== c && c, u = po(this), e.next = 4;
                  break;
                case 4:
                  if (!n || !a) {
                    e.next = 6;
                    break
                  }
                  throw new Error("[SecureNetwork] openid and callLoginByWeixin cannot be passed at the same time");
                case 6:
                  if (!n) {
                    e.next = 8;
                    break
                  }
                  return e.abrupt("return", (u.mpWeixinOpenid = n, {}));
                case 8:
                  return e.next = 10, new Promise((function (e, t) {
                    o.login({
                      success: function (t) {
                        e(t.code)
                      },
                      fail: function (e) {
                        t(new Error(e.errMsg))
                      }
                    })
                  }));
                case 10:
                  return i = e.sent, s = this.importObject("uni-id-co", {
                    customUI: !0
                  }), e.next = 14, s.secureNetworkHandshakeByWeixin({
                    code: i,
                    callLoginByWeixin: a
                  });
                case 14:
                  return u.mpWeixinCode = i, e.abrupt("return", {
                    code: i
                  });
                case 16:
                case "end":
                  return e.stop()
              }
            }), e, this)
          })))).apply(this, arguments)
        }

        function go(e) {
          return vo.apply(this, arguments)
        }

        function vo() {
          return (vo = (0, d.default)(r.default.mark((function e(t) {
            var n;
            return r.default.wrap((function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return n = po(this), e.abrupt("return", (n.initPromise || (n.initPromise = ho.call(this, t).then((function (e) {
                    return e
                  })).catch((function (e) {
                    throw delete n.initPromise, e
                  }))), n.initPromise));
                case 2:
                case "end":
                  return e.stop()
              }
            }), e, this)
          })))).apply(this, arguments)
        }

        function No(e) {
          ! function (e) {
            Oe = e
          }(e)
        }

        function bo(e) {
          var t = {
            getSystemInfo: o.getSystemInfo,
            getPushClientId: o.getPushClientId
          };
          return function (n) {
            return new Promise((function (o, c) {
              t[e](x(x({}, n), {}, {
                success: function (e) {
                  o(e)
                },
                fail: function (e) {
                  c(e)
                }
              }))
            }))
          }
        }
        var _o = function (e) {
            (0, f.default)(n, e);
            var t = w(n);

            function n() {
              var e;
              return (0, C.default)(this, n), (e = t.call(this))._uniPushMessageCallback = e._receivePushMessage.bind((0, u.default)(e)), e._currentMessageId = -1, e._payloadQueue = [], e
            }
            return (0, g.default)(n, [{
              key: "init",
              value: function () {
                var e = this;
                return Promise.all([bo("getSystemInfo")(), bo("getPushClientId")()]).then((function () {
                  var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                    n = (0, i.default)(t, 2),
                    o = n[0],
                    c = (o = void 0 === o ? {} : o).appId,
                    a = n[1],
                    r = (a = void 0 === a ? {} : a).cid;
                  if (!c) throw new Error("Invalid appId, please check the manifest.json file");
                  if (!r) throw new Error("Invalid push client id");
                  e._appId = c, e._pushClientId = r, e._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), e.emit("open"), e._initMessageListener()
                }), (function (t) {
                  throw e.emit("error", t), e.close(), t
                }))
              }
            }, {
              key: "open",
              value: function () {
                var e = (0, d.default)(r.default.mark((function e() {
                  return r.default.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.abrupt("return", this.init());
                      case 1:
                      case "end":
                        return e.stop()
                    }
                  }), e, this)
                })));
                return function () {
                  return e.apply(this, arguments)
                }
              }()
            }, {
              key: "_isUniCloudSSE",
              value: function (e) {
                if ("receive" !== e.type) return !1;
                var t = e && e.data && e.data.payload;
                return !(!t || "UNI_CLOUD_SSE" !== t.channel || t.seqId !== this._seqId)
              }
            }, {
              key: "_receivePushMessage",
              value: function (e) {
                if (this._isUniCloudSSE(e)) {
                  var t = e && e.data && e.data.payload,
                    n = t.action,
                    o = t.messageId,
                    c = t.message;
                  this._payloadQueue.push({
                    action: n,
                    messageId: o,
                    message: c
                  }), this._consumMessage()
                }
              }
            }, {
              key: "_consumMessage",
              value: function () {
                for (var e = this;;) {
                  var t = this._payloadQueue.find((function (t) {
                    return t.messageId === e._currentMessageId + 1
                  }));
                  if (!t) break;
                  this._currentMessageId++, this._parseMessagePayload(t)
                }
              }
            }, {
              key: "_parseMessagePayload",
              value: function (e) {
                var t = e.action,
                  n = e.messageId,
                  o = e.message;
                "end" === t ? this._end({
                  messageId: n,
                  message: o
                }) : "message" === t && this._appendMessage({
                  messageId: n,
                  message: o
                })
              }
            }, {
              key: "_appendMessage",
              value: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                  t = (e.messageId, e.message);
                this.emit("message", t)
              }
            }, {
              key: "_end",
              value: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                  t = (e.messageId, e.message);
                this.emit("end", t), this.close()
              }
            }, {
              key: "_initMessageListener",
              value: function () {
                o.onPushMessage(this._uniPushMessageCallback)
              }
            }, {
              key: "_destroy",
              value: function () {
                o.offPushMessage(this._uniPushMessageCallback)
              }
            }, {
              key: "toJSON",
              value: function () {
                return {
                  appId: this._appId,
                  pushClientId: this._pushClientId,
                  seqId: this._seqId
                }
              }
            }, {
              key: "close",
              value: function () {
                this._destroy(), this.emit("close")
              }
            }]), n
          }(H),
          xo = {
            tcb: qt,
            tencent: qt,
            aliyun: Ee,
            private: Jt,
            dcloud: Jt,
            alipay: cn
          },
          wo = new(function () {
            function e() {
              (0, C.default)(this, e)
            }
            return (0, g.default)(e, [{
              key: "init",
              value: function (e) {
                var t = {},
                  n = xo[e.provider];
                if (!n) throw new Error("未提供正确的provider参数");
                return function (e) {
                    e._initPromiseHub || (e._initPromiseHub = new V({
                      createPromise: function () {
                        var t = Promise.resolve();
                        t = new Promise((function (e) {
                          setTimeout((function () {
                            e()
                          }), 1)
                        }));
                        var n = e.auth();
                        return t.then((function () {
                          return n.getLoginState()
                        })).then((function (e) {
                          return e ? Promise.resolve() : n.signInAnonymously()
                        }))
                      }
                    }))
                  }(t = n.init(e)), _n(t),
                  function (e) {
                    var t = e.uploadFile;
                    e.uploadFile = function (e) {
                      return t.call(this, e)
                    }
                  }(t),
                  function (e) {
                    e.database = function (t) {
                      if (t && Object.keys(t).length > 0) return e.init(t).database();
                      if (this._database) return this._database;
                      var n = En($n, {
                        uniClient: e
                      });
                      return this._database = n, n
                    }, e.databaseForJQL = function (t) {
                      if (t && Object.keys(t).length > 0) return e.init(t).databaseForJQL();
                      if (this._databaseForJQL) return this._databaseForJQL;
                      var n = En($n, {
                        uniClient: e,
                        isJQL: !0
                      });
                      return this._databaseForJQL = n, n
                    }
                  }(t),
                  function (e) {
                    e.getCurrentUserInfo = yo, e.chooseAndUploadFile = lo.initChooseAndUploadFile(e), Object.assign(e, {
                      get mixinDatacom() {
                        return mo(e)
                      }
                    }), e.SSEChannel = _o, e.initSecureNetworkByWeixin = function (e) {
                      return function () {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                          n = t.openid,
                          o = t.callLoginByWeixin,
                          c = void 0 !== o && o;
                        return go.call(e, {
                          openid: n,
                          callLoginByWeixin: c
                        })
                      }
                    }(e), e.setCustomClientInfo = No, e.importObject = function (e) {
                      return function (t) {
                        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                          c = n = function (e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            return e.customUI = t.customUI || e.customUI, e.parseSystemError = t.parseSystemError || e.parseSystemError, Object.assign(e.loadingOptions, t.loadingOptions), Object.assign(e.errorOptions, t.errorOptions), "object" == (0, s.default)(t.secretMethods) && (e.secretMethods = t.secretMethods), e
                          }({
                            customUI: !1,
                            loadingOptions: {
                              title: "加载中...",
                              mask: !0
                            },
                            errorOptions: {
                              type: "modal",
                              retry: !1
                            }
                          }, n),
                          a = c.customUI,
                          u = c.loadingOptions,
                          i = c.errorOptions,
                          y = c.parseSystemError,
                          l = !a;
                        return new Proxy({}, {
                          get: function (c, a) {
                            switch (a) {
                              case "toString":
                                return "[object UniCloudObject]";
                              case "toJSON":
                                return {}
                            }
                            return function () {
                              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                t = e.fn,
                                n = e.interceptorName,
                                o = e.getCallbackArgs;
                              return (0, d.default)(r.default.mark((function e() {
                                var c, a, u, i, s, y, d = arguments;
                                return r.default.wrap((function (e) {
                                  for (;;) switch (e.prev = e.next) {
                                    case 0:
                                      for (c = d.length, a = new Array(c), u = 0; u < c; u++) a[u] = d[u];
                                      return i = o ? o({
                                        params: a
                                      }) : {}, e.prev = 2, e.next = 5, te(ne(n, "invoke"), x({}, i));
                                    case 5:
                                      return e.next = 7, t.apply(void 0, a);
                                    case 7:
                                      return s = e.sent, e.next = 10, te(ne(n, "success"), x(x({}, i), {}, {
                                        result: s
                                      }));
                                    case 10:
                                      return e.abrupt("return", s);
                                    case 13:
                                      return e.prev = 13, e.t0 = e.catch(2), y = e.t0, e.next = 18, te(ne(n, "fail"), x(x({}, i), {}, {
                                        error: y
                                      }));
                                    case 18:
                                      throw y;
                                    case 19:
                                      return e.prev = 19, e.next = 22, te(ne(n, "complete"), x(x({}, i), {}, y ? {
                                        error: y
                                      } : {
                                        result: s
                                      }));
                                    case 22:
                                      return e.finish(19);
                                    case 23:
                                    case "end":
                                      return e.stop()
                                  }
                                }), e, null, [
                                  [2, 13, 19, 23]
                                ])
                              })))
                            }({
                              fn: function () {
                                var c = (0, d.default)(r.default.mark((function c() {
                                  var m, p, h, C, g, v, N, b, _, w, k, O, S, P, A, T = arguments;
                                  return r.default.wrap((function (c) {
                                    for (;;) switch (c.prev = c.next) {
                                      case 0:
                                        for (l && o.showLoading({
                                            title: u.title,
                                            mask: u.mask
                                          }), p = T.length, h = new Array(p), C = 0; C < p; C++) h[C] = T[C];
                                        return g = {
                                          name: t,
                                          type: E,
                                          data: {
                                            method: a,
                                            params: h
                                          }
                                        }, "object" == (0, s.default)(n.secretMethods) && function (e, t) {
                                          var n = t.data.method,
                                            o = e.secretMethods || {},
                                            c = o[n] || o["*"];
                                          c && (t.secretType = c)
                                        }(n, g), v = !1, c.prev = 5, c.next = 8, e.callFunction(g);
                                      case 8:
                                        m = c.sent, c.next = 14;
                                        break;
                                      case 11:
                                        c.prev = 11, c.t0 = c.catch(5), v = !0, m = {
                                          result: new ve(c.t0)
                                        };
                                      case 14:
                                        if (N = m.result || {}, b = N.errSubject, _ = N.errCode, w = N.errMsg, k = N.newToken, l && o.hideLoading(), k && k.token && k.tokenExpired && (we(k), me(ue, x({}, k))), !_) {
                                          c.next = 39;
                                          break
                                        }
                                        if (O = w, !v || !y) {
                                          c.next = 24;
                                          break
                                        }
                                        return c.next = 20, y({
                                          objectName: t,
                                          methodName: a,
                                          params: h,
                                          errSubject: b,
                                          errCode: _,
                                          errMsg: w
                                        });
                                      case 20:
                                        if (c.t1 = c.sent.errMsg, c.t1) {
                                          c.next = 23;
                                          break
                                        }
                                        c.t1 = w;
                                      case 23:
                                        O = c.t1;
                                      case 24:
                                        if (!l) {
                                          c.next = 37;
                                          break
                                        }
                                        if ("toast" !== i.type) {
                                          c.next = 29;
                                          break
                                        }
                                        o.showToast({
                                          title: O,
                                          icon: "none"
                                        }), c.next = 37;
                                        break;
                                      case 29:
                                        if ("modal" === i.type) {
                                          c.next = 31;
                                          break
                                        }
                                        throw new Error("Invalid errorOptions.type: ".concat(i.type));
                                      case 31:
                                        return c.next = 33, (0, d.default)(r.default.mark((function e() {
                                          var t, n, c, a, u, i, s = arguments;
                                          return r.default.wrap((function (e) {
                                            for (;;) switch (e.prev = e.next) {
                                              case 0:
                                                return t = s.length > 0 && void 0 !== s[0] ? s[0] : {}, n = t.title, c = t.content, a = t.showCancel, u = t.cancelText, i = t.confirmText, e.abrupt("return", new Promise((function (e, t) {
                                                  o.showModal({
                                                    title: n,
                                                    content: c,
                                                    showCancel: a,
                                                    cancelText: u,
                                                    confirmText: i,
                                                    success: function (t) {
                                                      e(t)
                                                    },
                                                    fail: function () {
                                                      e({
                                                        confirm: !1,
                                                        cancel: !0
                                                      })
                                                    }
                                                  })
                                                })));
                                              case 2:
                                              case "end":
                                                return e.stop()
                                            }
                                          }), e)
                                        })))({
                                          title: "提示",
                                          content: O,
                                          showCancel: i.retry,
                                          cancelText: "取消",
                                          confirmText: i.retry ? "重试" : "确定"
                                        });
                                      case 33:
                                        if (S = c.sent, P = S.confirm, !i.retry || !P) {
                                          c.next = 37;
                                          break
                                        }
                                        return c.abrupt("return", f.apply(void 0, h));
                                      case 37:
                                        throw (A = new ve({
                                          subject: b,
                                          code: _,
                                          message: w,
                                          requestId: m.requestId
                                        })).detail = m.result, me(ae, {
                                          type: ye,
                                          content: A
                                        }), A;
                                      case 39:
                                        return c.abrupt("return", (me(ae, {
                                          type: ye,
                                          content: m.result
                                        }), m.result));
                                      case 40:
                                      case "end":
                                        return c.stop()
                                    }
                                  }), c, null, [
                                    [5, 11]
                                  ])
                                })));

                                function f() {
                                  return c.apply(this, arguments)
                                }
                                return f
                              }(),
                              interceptorName: "callObject",
                              getCallbackArgs: function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                  n = e.params;
                                return {
                                  objectName: t,
                                  methodName: a,
                                  params: n
                                }
                              }
                            })
                          }
                        })
                      }
                    }(e)
                  }(t), ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((function (e) {
                    if (t[e]) {
                      var n = t[e];
                      t[e] = function () {
                        return n.apply(t, Array.from(arguments))
                      }, t[e] = function (e, t) {
                        return function (n) {
                          var o = this,
                            c = !1;
                          if ("callFunction" === t) {
                            var a = n && n.type || j;
                            c = a !== j
                          }
                          var r = "callFunction" === t && !c,
                            u = this._initPromiseHub.exec(),
                            i = ge(n = n || {}),
                            s = i.success,
                            y = i.fail,
                            d = i.complete,
                            l = u.then((function () {
                              return c ? Promise.resolve() : te(ne(t, "invoke"), n)
                            })).then((function () {
                              return e.call(o, n)
                            })).then((function (e) {
                              return c ? Promise.resolve(e) : te(ne(t, "success"), e).then((function () {
                                return te(ne(t, "complete"), e)
                              })).then((function () {
                                return r && me(ae, {
                                  type: se,
                                  content: e
                                }), Promise.resolve(e)
                              }))
                            }), (function (e) {
                              return c ? Promise.reject(e) : te(ne(t, "fail"), e).then((function () {
                                return te(ne(t, "complete"), e)
                              })).then((function () {
                                return me(ae, {
                                  type: se,
                                  content: e
                                }), Promise.reject(e)
                              }))
                            }));
                          if (!(s || y || d)) return l;
                          l.then((function (e) {
                            s && s(e), d && d(e), r && me(ae, {
                              type: se,
                              content: e
                            })
                          }), (function (e) {
                            y && y(e), d && d(e), r && me(ae, {
                              type: se,
                              content: e
                            })
                          }))
                        }
                      }(t[e], e).bind(t)
                    }
                  })), t.init = this.init, t
              }
            }]), e
          }());
        t.uniCloud = wo,
          function () {
            var e, n = J,
              o = {};
            n && 1 === n.length ? (o = n[0], t.uniCloud = wo = wo.init(o), wo._isDefault = !0) : (e = n && n.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"].forEach((function (t) {
              wo[t] = function () {
                return console.error(e), Promise.reject(new ve({
                  code: "SYS_ERR",
                  message: e
                }))
              }
            })));
            Object.assign(wo, {
              get mixinDatacom() {
                return mo(wo)
              }
            }), uo(wo), wo.addInterceptor = X, wo.removeInterceptor = ee, wo.interceptObject = oe
          }();
        var ko = wo;
        t.default = ko
      }).call(this, n("0ee4"), n("df3c").default, n("3223").default)
    },
    "88bd": function (e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.init = void 0;
      var o = n("3240");
      t.init = function () {
        var e, t = o.default ? o.default : o,
          n = t.config.optionMergeStrategies.mounted;
        t.config.optionMergeStrategies.mounted = function (t, o) {
          var c = n.call(this, t, o);
          if (Array.isArray(c)) {
            var a = void 0;
            e ? a = c.indexOf(e) : (a = c.findIndex((function (e) {
              return e.toString().includes("onReady")
            })), e = c[a]), -1 !== a && (c.splice(a, 1), c.push(e))
          }
          return c
        }
      }
    },
    "8a5b": function (e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0;
      var o = {
        years: function (e) {
          if (e) {
            var t = 0,
              n = (new Date).getFullYear(),
              o = (new Date).getMonth() + 1,
              c = e.split("-");
            return t = n - c[0], o > parseInt(c[1]) && (t += 1), t < 1 && (t = 1), t
          }
          return 1
        },
        hours: function (e) {
          var t = 0;
          return null != e && "" !== e && (t = parseInt(e)), t
        }
      };
      t.default = o
    },
    "8dc7": function (e) {
      e.exports = JSON.parse('{"code":200,"msg":"success","data":{"userId":"1947220554149343232","nickName":null,"headUrl":null,"mobile":"18620771729","mobileArea":"86","inviteId":null,"lastLoginTime":"2025-07-25 16:34:59","lastLoginIp":"119.34.179.57","openId":"or6Tr5ZcuLWjocAgXb8QkzLgkqpA","unionId":null,"wechatNoticeOn":1,"smsNoticeOn":1,"createTime":"2025-07-21 17:02:12","firstPayTime":null,"lastOrderTime":null,"noticeOpenId":null,"deleted":0}}')
    },
    "8ef6": function (e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0;
      var o = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z0-9_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
        c = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
        a = /([a-zA-Z0-9_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

      function r(e) {
        for (var t = {}, n = e.split(","), o = 0; o < n.length; o += 1) t[n[o]] = !0;
        return t
      }
      var u = r("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"),
        i = r("address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"),
        s = r("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),
        y = r("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),
        d = r("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");
      t.default = function (e, t) {
        var n, r, l, f = e,
          m = [];

        function p(e, n) {
          var o;
          if (n)
            for (n = n.toLowerCase(), o = m.length - 1; o >= 0 && m[o] !== n; o -= 1);
          else o = 0;
          if (o >= 0) {
            for (var c = m.length - 1; c >= o; c -= 1) t.end && t.end(m[c]);
            m.length = o
          }
        }

        function h(e, n, o, c) {
          if (n = n.toLowerCase(), i[n])
            for (; m.last() && s[m.last()];) p(0, m.last());
          if (y[n] && m.last() === n && p(0, n), (c = u[n] || !!c) || m.push(n), t.start) {
            var r = [];
            o.replace(a, (function (e, t) {
              var n = arguments[2] || arguments[3] || arguments[4] || (d[t] ? t : "");
              r.push({
                name: t,
                value: n,
                escaped: n.replace(/(^|[^\\])"/g, '$1\\"')
              })
            })), t.start && t.start(n, r, c)
          }
        }
        for (m.last = function () {
            return m[m.length - 1]
          }; e;) {
          if (r = !0, 0 === e.indexOf("</") ? (l = e.match(c), l && (e = e.substring(l[0].length), l[0].replace(c, p), r = !1)) : 0 === e.indexOf("<") && (l = e.match(o), l && (e = e.substring(l[0].length), l[0].replace(o, h), r = !1)), r) {
            n = e.indexOf("<");
            for (var C = ""; 0 === n;) C += "<", n = (e = e.substring(1)).indexOf("<");
            C += n < 0 ? e : e.substring(0, n), e = n < 0 ? "" : e.substring(n), t.chars && t.chars(C)
          }
          if (e === f) throw new Error("Parse Error: ".concat(e));
          f = e
        }
        p()
      }
    },
    "8ffa": function (e, t, n) {
      var o = n("7647");
      e.exports = function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            writable: !0,
            configurable: !0
          }
        }), Object.defineProperty(e, "prototype", {
          writable: !1
        }), t && o(e, t)
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    9008: function (e, t) {
      e.exports = function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    "90c1": function (e, t, n) {
      (function (t, o) {
        var c, a = n("7ca3"),
          r = function (e) {
            var t = (e = new Date(e)).getFullYear(),
              n = e.getMonth() + 1,
              o = e.getDate(),
              c = e.getHours(),
              a = e.getMinutes(),
              r = e.getSeconds();
            return [t, n, o].map(i).join("/") + " " + [c, a, r].map(i).join(":")
          };

        function u(e, t) {
          var n = 0,
            o = e.toString(),
            c = t.toString();
          try {
            n += o.split(".")[1].length
          } catch (e) {}
          try {
            n += c.split(".")[1].length
          } catch (e) {}
          return Number(o.replace(".", "")) * Number(c.replace(".", "")) / Math.pow(10, n)
        }
        var i = function (e) {
            return (e = e.toString())[1] ? e : "0" + e
          },
          s = function (e, t, n) {
            o.setStorageSync(e, t);
            var c = parseInt(n);
            if (c > 0) {
              var a = Date.parse(new Date);
              a = a / 1e3 + c, o.setStorageSync(e + "_deadtime", a + "")
            } else o.removeStorageSync(e + "_deadtime")
          };
        e.exports = (c = {
          formatTime: r,
          formatdate: function (e) {
            var t = (e = new Date(e)).getFullYear(),
              n = e.getMonth() + 1,
              o = e.getDate();
            return e.getHours(), e.getMinutes(), e.getSeconds(), [t, n, o].map(i).join(".")
          },
          SearchData: function (e, t) {
            for (var n = "", o = 0; o < t.length;) {
              if (e == t[o].key) {
                n = t[o].title;
                break
              }
              o++
            }
            return n
          },
          SearchDataIndex: function (e, t) {
            for (var n = "", o = 0; o < t.length;) {
              if (e == t[o].key) {
                n = o;
                break
              }
              o++
            }
            return n
          },
          storePut: s,
          storeGet: function (e, t) {
            var n = parseInt(o.getStorageSync(e + "_deadtime"));
            return n && parseInt(n) < Date.parse(new Date) / 1e3 ? t || void 0 : o.getStorageSync(e) || t
          },
          storePutUserInfo: function (e, t) {
            s(e, t, 2592e3)
          },
          storePutNurseAddressInfo: function (e, t) {
            s(e, t, 300)
          },
          storePutUserLocation: function (e, t) {
            s(e, t, 300)
          },
          storeRemove: function (e) {
            o.removeStorageSync(e), o.removeStorageSync(e + "_deadtime")
          },
          storeClear: function () {
            o.clearStorageSync()
          },
          numMulti: function (e, t) {
            var n = 0;
            try {
              n += e.toString().split(".")[1].length
            } catch (e) {}
            try {
              n += t.toString().split(".")[1].length
            } catch (e) {}
            return Number(e.toString().replace(".", "")) * Number(t.toString().replace(".", "")) / Math.pow(10, n)
          },
          add: function (e, t) {
            var n, o, c;
            try {
              n = e.toString().split(".")[1].length
            } catch (e) {
              n = 0
            }
            try {
              o = t.toString().split(".")[1].length
            } catch (e) {
              o = 0
            }
            return (u(e, c = Math.pow(10, Math.max(n, o))) + u(t, c)) / c
          },
          sub: function (e, t) {
            var n, o, c;
            try {
              n = e.toString().split(".")[1].length
            } catch (e) {
              n = 0
            }
            try {
              o = t.toString().split(".")[1].length
            } catch (e) {
              o = 0
            }
            return (u(e, c = Math.pow(10, Math.max(n, o))) - u(t, c)) / c
          },
          mul: u,
          div: function (e, t) {
            var n = 0,
              o = 0;
            try {
              n = e.toString().split(".")[1].length
            } catch (e) {}
            try {
              o = t.toString().split(".")[1].length
            } catch (e) {}
            return u(Number(e.toString().replace(".", "")) / Number(t.toString().replace(".", "")), Math.pow(10, o - n))
          },
          showLoading: function (e) {
            t.showLoading ? t.showLoading({
              title: e,
              mask: !0
            }) : t.showToast({
              title: e,
              icon: "loading",
              mask: !0,
              duration: 2e4
            })
          },
          hideLoading: function () {
            t.hideLoading ? t.hideLoading() : t.hideToast()
          }
        }, a(c, "formatTime", r), a(c, "sha1", (function (e) {
          var t, n, o = new Uint8Array(function (e) {
              var t, n, o, c = [];
              for (t = 0; t < e.length; t++)(n = e.charCodeAt(t)) < 128 ? c.push(n) : n < 2048 ? c.push(192 + (n >> 6 & 31), 128 + (63 & n)) : ((o = 55296 ^ n) >> 10 == 0 ? (n = (o << 10) + (56320 ^ e.charCodeAt(++t)) + 65536, c.push(240 + (n >> 18 & 7), 128 + (n >> 12 & 63))) : c.push(224 + (n >> 12 & 15)), c.push(128 + (n >> 6 & 63), 128 + (63 & n)));
              return c
            }(e)),
            c = 16 + (o.length + 8 >>> 6 << 4);
          for ((e = new Uint8Array(c << 2)).set(new Uint8Array(o.buffer)), e = new Uint32Array(e.buffer), n = new DataView(e.buffer), d = 0; d < c; d++) e[d] = n.getUint32(d << 2);
          e[o.length >> 2] |= 128 << 24 - 8 * (3 & o.length), e[c - 1] = o.length << 3;
          var a = [],
            r = [function () {
              return s[1] & s[2] | ~s[1] & s[3]
            }, function () {
              return s[1] ^ s[2] ^ s[3]
            }, function () {
              return s[1] & s[2] | s[1] & s[3] | s[2] & s[3]
            }, function () {
              return s[1] ^ s[2] ^ s[3]
            }],
            u = function (e, t) {
              return e << t | e >>> 32 - t
            },
            i = [1518500249, 1859775393, -1894007588, -899497514],
            s = [1732584193, -271733879, null, null, -1009589776];
          for (s[2] = ~s[0], s[3] = ~s[1], d = 0; d < e.length; d += 16) {
            var y = s.slice(0);
            for (t = 0; t < 80; t++) a[t] = t < 16 ? e[d + t] : u(a[t - 3] ^ a[t - 8] ^ a[t - 14] ^ a[t - 16], 1), n = u(s[0], 5) + r[t / 20 | 0]() + s[4] + a[t] + i[t / 20 | 0] | 0, s[1] = u(s[1], 30), s.pop(), s.unshift(n);
            for (t = 0; t < 5; t++) s[t] = s[t] + y[t] | 0
          }
          n = new DataView(new Uint32Array(s).buffer);
          for (var d = 0; d < 5; d++) s[d] = n.getUint32(d << 2);
          return Array.prototype.map.call(new Uint8Array(new Uint32Array(s).buffer), (function (e) {
            return (e < 16 ? "0" : "") + e.toString(16)
          })).join("")
        })), a(c, "countTimes", (function (e) {
          var t = "";
          e > 0 ? t = Math.floor(e / 60 / 24) + "天" + Math.floor(e / 60 % 24) + "小时" + Math.floor(e % 60) + "分" : t = 0;
          return t
        })), a(c, "throttle", (function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
            n = null;
          return function () {
            var o = new Date,
              c = n ? t - (o - n) : 0;
            if (c <= 0 || c > t) return n = o, e.apply(this, arguments)
          }
        })), c)
      }).call(this, n("3223").default, n("df3c").default)
    },
    "931d": function (e, t, n) {
      var o = n("7647"),
        c = n("011a");
      e.exports = function (e, t, n) {
        if (c()) return Reflect.construct.apply(null, arguments);
        var a = [null];
        a.push.apply(a, t);
        var r = new(e.bind.apply(e, a));
        return n && o(r, n.prototype), r
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    9359: function (e, t, n) {
      (function (t) {
        var o = n("47a9"),
          c = n("9816"),
          a = (o(n("a346")), n("90c1"));
        e.exports = {
          irequestdata: function (e) {
            var n = (0, a.storeGet)("counselor_info");
            (e = e || {}).url = e.url || "", e.data = e.data || null, e.method = e.method || "GET", e.header = e.header || {
              "Content-Type": "application/json"
            }, e.success = e.success || function () {}, e.data = Object.assign({}, e.data), n && !1 != !!n.userId && (e.header = Object.assign(e.header, {
              Authorization: n.authorization
            })), t.request({
              url: c.baseUrl + e.url,
              data: e.data,
              method: e.method,
              header: e.header,
              dataType: "json",
              success: function (n) {
                200 === n.data.code ? e.success(n) : (e.error(n), e.hideToast || t.showToast({
                  title: n.data.msg,
                  icon: "none",
                  duration: 3e3
                }), 401 === n.data.code && (t.navigateTo({
                  url: "/pages/login/login"
                }), console.log("auth failed,jump to login page")))
              },
              fail: function () {
                t.showToast({
                  title: "网络繁忙请稍后重试"
                })
              }
            })
          },
          uploadFile: function (e) {
            (e = e || {}).url = e.url || "", e.filePath = e.filePath || null, e.name = e.name || null, e.header = e.header || {
              "Content-Type": "application/json"
            }, e.filePath = e.filePath || null, e.success = e.success || function () {};
            var n = (0, a.storeGet)("counselor_info");
            n && !1 != !!n.userId && (e.header = Object.assign(e.header, {
              Authorization: n.authorization
            })), t.uploadFile({
              url: c.baseUrl + e.url,
              filePath: e.filePath,
              name: e.name,
              header: e.header,
              success: function (t) {
                e.success(t)
              },
              fail: function (e) {
                console.log(e), t.showToast({
                  title: "请稍后重试网络错误!"
                })
              }
            })
          }
        }
      }).call(this, n("df3c").default)
    },
    "93f8": function (e, t, n) {
      (function (e) {
        t.__esModule = !0, t.initUtsClassName = t.initUtsIndexClassName = t.initUtsPackageName = t.initUtsProxyClass = t.initUtsProxyFunction = t.normalizeArg = void 0;
        var o, c = n("272c"),
          a = 1,
          r = {};

        function u(e) {
          if ("function" == typeof e) {
            var t = Object.keys(r).find((function (t) {
                return r[t] === e
              })),
              n = t ? parseInt(t) : a++;
            return r[n] = e, n
          }
          return (0, c.isPlainObject)(e) && Object.keys(e).forEach((function (t) {
            e[t] = u(e[t])
          })), e
        }

        function i(e, t, n) {
          return l(e, t, n)
        }

        function s() {
          return o || (o = e.requireNativePlugin("UTS-Proxy")), o
        }

        function y(e) {
          if (e.errMsg) throw new Error(e.errMsg);
          return e.params
        }

        function d(e) {
          if (e.errMsg) throw new Error(e.errMsg);
          return delete e.errMsg, y(s().invokeSync(e, (function () {})))
        }

        function l(e, t, n) {
          var o = t.package,
            a = t.class,
            i = t.name,
            d = t.method,
            l = t.companion,
            f = t.params,
            m = t.errMsg,
            p = function (e) {
              var t = e.id,
                n = e.name,
                c = e.params,
                u = e.keepAlive,
                s = r[t];
              s ? (s.apply(void 0, c), u || delete r[t]) : console.error("".concat(o).concat(a, ".").concat(i, " ").concat(n, " is not found"))
            },
            h = n ? {
              id: n,
              name: i,
              method: f
            } : {
              package: o,
              class: a,
              name: d || i,
              companion: l,
              method: f
            };
          return function () {
            for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
            if (m) throw new Error(m);
            var o = (0, c.extend)({}, h, {
              params: t.map((function (e) {
                return u(e)
              }))
            });
            return e ? new Promise((function (e, t) {
              s().invokeAsync(o, (function (n) {
                "return" !== n.type ? p(n) : n.errMsg ? t(n.errMsg) : e(n.params)
              }))
            })) : y(s().invokeSync(o, p))
          }
        }

        function f(e, t) {
          return t.main && !t.method && "undefined" != typeof plus && "iOS" === plus.os.name && (t.method = "s_" + t.name), l(e, t, 0)
        }

        function m(e, t, n) {
          return "undefined" == typeof plus ? "" : "Android" === plus.os.name ? t : "iOS" === plus.os.name ? "UTSSDK" + (n ? "Modules" : "") + (0, c.capitalize)(e) + (0, c.capitalize)(t) : ""
        }
        t.normalizeArg = u, t.initUtsProxyFunction = f, t.initUtsProxyClass = function (e) {
          var t = e.package,
            n = e.class,
            o = e.constructor.params,
            a = e.methods,
            r = e.props,
            u = e.staticProps,
            s = e.staticMethods,
            y = e.errMsg,
            m = {
              package: t,
              class: n,
              errMsg: y
            },
            p = function () {
              for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
              if (y) throw new Error(y);
              var u = {},
                s = l(!1, (0, c.extend)({
                  name: "constructor",
                  params: o
                }, m), 0).apply(null, e);
              if (!s) throw new Error("new ".concat(n, " is failed"));
              return new Proxy(this, {
                get: function (e, t) {
                  if (!u[t])
                    if ((0, c.hasOwn)(a, t)) {
                      var n = a[t],
                        o = n.async,
                        l = n.params;
                      u[t] = i(!!o, (0, c.extend)({
                        name: t,
                        params: l
                      }, m), s)
                    } else if (r.includes(t)) return d({
                    id: s,
                    name: t,
                    errMsg: y
                  });
                  return u[t]
                }
              })
            },
            h = {};
          return new Proxy(p, {
            get: function (e, t, n) {
              if ((0, c.hasOwn)(s, t)) {
                if (!h[t]) {
                  var o = s[t],
                    a = o.async,
                    r = o.params;
                  h[t] = f(!!a, (0, c.extend)({
                    name: t,
                    companion: !0,
                    params: r
                  }, m))
                }
                return h[t]
              }
              return u.includes(t) ? d((0, c.extend)({
                name: t,
                companion: !0
              }, m)) : Reflect.get(e, t, n)
            }
          })
        }, t.initUtsPackageName = function (e, t) {
          return "undefined" != typeof plus && "Android" === plus.os.name ? "uts.sdk." + (t ? "modules." : "") + e : ""
        }, t.initUtsIndexClassName = function (e, t) {
          return "undefined" == typeof plus ? "" : m(e, "iOS" === plus.os.name ? "IndexSwift" : "IndexKt", t)
        }, t.initUtsClassName = m
      }).call(this, n("df3c").default)
    },
    "979e": function (e, t) {
      e.exports = "https://localhost/api/file/image/03_xx@3x.png"
    },
    9816: function (e, t, n) {
      var o = n("5bd7"),
        c = null,
        a = null;
      o.isProduction ? (c = "wxd3578c75e67172b3", a = "https://localhost/api") : o.isDevelopment && (c = "wxd3578c75e67172b3", a = "https://localhost/api"), e.exports = {
        baseUrl: a,
        appid: c
      }
    },
    "9b32": function (e, t, n) {
      var o = n("47a9");
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getChilds = t.getAdults = void 0;
      var c = o(n("7eb4")),
        a = o(n("ee10")),
        r = o(n("8138")),
        u = function () {
          var e = (0, a.default)(c.default.mark((function e(t) {
            var n;
            return c.default.wrap((function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, (0, r.default)({
                    url: "/visitor/visitorInfo/showUserVisitorInfoByUserid",
                    method: "get",
                    data: {
                      userId: t,
                      type: 0
                    }
                  });
                case 2:
                  return n = e.sent, e.abrupt("return", n.data.data);
                case 4:
                case "end":
                  return e.stop()
              }
            }), e)
          })));
          return function (t) {
            return e.apply(this, arguments)
          }
        }();
      t.getAdults = u;
      var i = function () {
        var e = (0, a.default)(c.default.mark((function e(t) {
          var n;
          return c.default.wrap((function (e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, (0, r.default)({
                  url: "/visitor/visitorInfo/showUserVisitorInfoByUserid",
                  method: "get",
                  data: {
                    userId: t,
                    type: 1
                  }
                });
              case 2:
                return n = e.sent, e.abrupt("return", n.data.data);
              case 4:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function (t) {
          return e.apply(this, arguments)
        }
      }();
      t.getChilds = i
    },
    "9e37": function (e, t) {
      e.exports = "https://localhost/api/file/image/电话@3x.png"
    },
    "9fc1": function (e, t, n) {
      var o = n("3b2d").default;

      function c() {
        /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
        e.exports = c = function () {
          return n
        }, e.exports.__esModule = !0, e.exports.default = e.exports;
        var t, n = {},
          a = Object.prototype,
          r = a.hasOwnProperty,
          u = Object.defineProperty || function (e, t, n) {
            e[t] = n.value
          },
          i = "function" == typeof Symbol ? Symbol : {},
          s = i.iterator || "@@iterator",
          y = i.asyncIterator || "@@asyncIterator",
          d = i.toStringTag || "@@toStringTag";

        function l(e, t, n) {
          return Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }), e[t]
        }
        try {
          l({}, "")
        } catch (t) {
          l = function (e, t, n) {
            return e[t] = n
          }
        }

        function f(e, t, n, o) {
          var c = t && t.prototype instanceof v ? t : v,
            a = Object.create(c.prototype),
            r = new j(o || []);
          return u(a, "_invoke", {
            value: P(e, n, r)
          }), a
        }

        function m(e, t, n) {
          try {
            return {
              type: "normal",
              arg: e.call(t, n)
            }
          } catch (e) {
            return {
              type: "throw",
              arg: e
            }
          }
        }
        n.wrap = f;
        var p = "suspendedStart",
          h = "executing",
          C = "completed",
          g = {};

        function v() {}

        function N() {}

        function b() {}
        var _ = {};
        l(_, s, (function () {
          return this
        }));
        var x = Object.getPrototypeOf,
          w = x && x(x(E([])));
        w && w !== a && r.call(w, s) && (_ = w);
        var k = b.prototype = v.prototype = Object.create(_);

        function O(e) {
          ["next", "throw", "return"].forEach((function (t) {
            l(e, t, (function (e) {
              return this._invoke(t, e)
            }))
          }))
        }

        function S(e, t) {
          function n(c, a, u, i) {
            var s = m(e[c], e, a);
            if ("throw" !== s.type) {
              var y = s.arg,
                d = y.value;
              return d && "object" == o(d) && r.call(d, "__await") ? t.resolve(d.__await).then((function (e) {
                n("next", e, u, i)
              }), (function (e) {
                n("throw", e, u, i)
              })) : t.resolve(d).then((function (e) {
                y.value = e, u(y)
              }), (function (e) {
                return n("throw", e, u, i)
              }))
            }
            i(s.arg)
          }
          var c;
          u(this, "_invoke", {
            value: function (e, o) {
              function a() {
                return new t((function (t, c) {
                  n(e, o, t, c)
                }))
              }
              return c = c ? c.then(a, a) : a()
            }
          })
        }

        function P(e, n, o) {
          var c = p;
          return function (a, r) {
            if (c === h) throw Error("Generator is already running");
            if (c === C) {
              if ("throw" === a) throw r;
              return {
                value: t,
                done: !0
              }
            }
            for (o.method = a, o.arg = r;;) {
              var u = o.delegate;
              if (u) {
                var i = A(u, o);
                if (i) {
                  if (i === g) continue;
                  return i
                }
              }
              if ("next" === o.method) o.sent = o._sent = o.arg;
              else if ("throw" === o.method) {
                if (c === p) throw c = C, o.arg;
                o.dispatchException(o.arg)
              } else "return" === o.method && o.abrupt("return", o.arg);
              c = h;
              var s = m(e, n, o);
              if ("normal" === s.type) {
                if (c = o.done ? C : "suspendedYield", s.arg === g) continue;
                return {
                  value: s.arg,
                  done: o.done
                }
              }
              "throw" === s.type && (c = C, o.method = "throw", o.arg = s.arg)
            }
          }
        }

        function A(e, n) {
          var o = n.method,
            c = e.iterator[o];
          if (c === t) return n.delegate = null, "throw" === o && e.iterator.return && (n.method = "return", n.arg = t, A(e, n), "throw" === n.method) || "return" !== o && (n.method = "throw", n.arg = new TypeError("The iterator does not provide a '" + o + "' method")), g;
          var a = m(c, e.iterator, n.arg);
          if ("throw" === a.type) return n.method = "throw", n.arg = a.arg, n.delegate = null, g;
          var r = a.arg;
          return r ? r.done ? (n[e.resultName] = r.value, n.next = e.nextLoc, "return" !== n.method && (n.method = "next", n.arg = t), n.delegate = null, g) : r : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, g)
        }

        function T(e) {
          var t = {
            tryLoc: e[0]
          };
          1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
        }

        function I(e) {
          var t = e.completion || {};
          t.type = "normal", delete t.arg, e.completion = t
        }

        function j(e) {
          this.tryEntries = [{
            tryLoc: "root"
          }], e.forEach(T, this), this.reset(!0)
        }

        function E(e) {
          if (e || "" === e) {
            var n = e[s];
            if (n) return n.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) {
              var c = -1,
                a = function n() {
                  for (; ++c < e.length;)
                    if (r.call(e, c)) return n.value = e[c], n.done = !1, n;
                  return n.value = t, n.done = !0, n
                };
              return a.next = a
            }
          }
          throw new TypeError(o(e) + " is not iterable")
        }
        return N.prototype = b, u(k, "constructor", {
          value: b,
          configurable: !0
        }), u(b, "constructor", {
          value: N,
          configurable: !0
        }), N.displayName = l(b, d, "GeneratorFunction"), n.isGeneratorFunction = function (e) {
          var t = "function" == typeof e && e.constructor;
          return !!t && (t === N || "GeneratorFunction" === (t.displayName || t.name))
        }, n.mark = function (e) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(e, b) : (e.__proto__ = b, l(e, d, "GeneratorFunction")), e.prototype = Object.create(k), e
        }, n.awrap = function (e) {
          return {
            __await: e
          }
        }, O(S.prototype), l(S.prototype, y, (function () {
          return this
        })), n.AsyncIterator = S, n.async = function (e, t, o, c, a) {
          void 0 === a && (a = Promise);
          var r = new S(f(e, t, o, c), a);
          return n.isGeneratorFunction(t) ? r : r.next().then((function (e) {
            return e.done ? e.value : r.next()
          }))
        }, O(k), l(k, d, "Generator"), l(k, s, (function () {
          return this
        })), l(k, "toString", (function () {
          return "[object Generator]"
        })), n.keys = function (e) {
          var t = Object(e),
            n = [];
          for (var o in t) n.push(o);
          return n.reverse(),
            function e() {
              for (; n.length;) {
                var o = n.pop();
                if (o in t) return e.value = o, e.done = !1, e
              }
              return e.done = !0, e
            }
        }, n.values = E, j.prototype = {
          constructor: j,
          reset: function (e) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(I), !e)
              for (var n in this) "t" === n.charAt(0) && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = t)
          },
          stop: function () {
            this.done = !0;
            var e = this.tryEntries[0].completion;
            if ("throw" === e.type) throw e.arg;
            return this.rval
          },
          dispatchException: function (e) {
            if (this.done) throw e;
            var n = this;

            function o(o, c) {
              return u.type = "throw", u.arg = e, n.next = o, c && (n.method = "next", n.arg = t), !!c
            }
            for (var c = this.tryEntries.length - 1; c >= 0; --c) {
              var a = this.tryEntries[c],
                u = a.completion;
              if ("root" === a.tryLoc) return o("end");
              if (a.tryLoc <= this.prev) {
                var i = r.call(a, "catchLoc"),
                  s = r.call(a, "finallyLoc");
                if (i && s) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                } else if (i) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0)
                } else {
                  if (!s) throw Error("try statement without catch or finally");
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                }
              }
            }
          },
          abrupt: function (e, t) {
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var o = this.tryEntries[n];
              if (o.tryLoc <= this.prev && r.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                var c = o;
                break
              }
            }
            c && ("break" === e || "continue" === e) && c.tryLoc <= t && t <= c.finallyLoc && (c = null);
            var a = c ? c.completion : {};
            return a.type = e, a.arg = t, c ? (this.method = "next", this.next = c.finallyLoc, g) : this.complete(a)
          },
          complete: function (e, t) {
            if ("throw" === e.type) throw e.arg;
            return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), g
          },
          finish: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var n = this.tryEntries[t];
              if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), I(n), g
            }
          },
          catch: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var n = this.tryEntries[t];
              if (n.tryLoc === e) {
                var o = n.completion;
                if ("throw" === o.type) {
                  var c = o.arg;
                  I(n)
                }
                return c
              }
            }
            throw Error("illegal catch attempt")
          },
          delegateYield: function (e, n, o) {
            return this.delegate = {
              iterator: E(e),
              resultName: n,
              nextLoc: o
            }, "next" === this.method && (this.arg = t), g
          }
        }, n
      }
      e.exports = c, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    a076: function (e, t, n) {
      var o = n("392e");
      n.n(o).a
    },
    a346: function (e, t, n) {
      (function (t) {
        var o = n("3b2d");
        Date.now = Date.now || function () {
          return (new Date).getTime()
        };
        var c = Date.now(),
          a = function () {},
          r = {
            noop: a,
            warn: function () {
              var e = "object" == ("undefined" == typeof console ? "undefined" : o(console)) ? console.warn : a;
              try {
                var t = {
                  warn: e
                };
                t.warn.call(t)
              } catch (e) {
                return a
              }
              return e
            }(),
            key: "__bl",
            win: "object" == ("undefined" == typeof window ? "undefined" : o(window)) && window.document ? window : void 0,
            regionMap: {
              cn: "https://arms-retcode.aliyuncs.com/r.png?",
              sg: "https://arms-retcode-sg.aliyuncs.com/r.png?",
              sg_2: "https://retcode-sg-lazada.arms.aliyuncs.com/r.png?",
              daily: "http://arms-retcode-daily.alibaba.net/r.png?",
              daily_2: "https://arms-retcode-daily.alibaba.net/r.png?",
              us: "https://retcode-us-west-1.arms.aliyuncs.com/r.png?"
            },
            defaultImgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
            $a2: function (e) {
              if (Object.create) return Object.create(e);
              var t = function () {};
              return t.prototype = e, new t
            },
            each: function (e, t) {
              var n = 0,
                o = e.length;
              if (this.T(e, "Array"))
                for (; n < o && !1 !== t.call(e[n], e[n], n); n++);
              else
                for (n in e)
                  if (!1 === t.call(e[n], e[n], n)) break;
              return e
            },
            $a3: function (e, t, n) {
              if ("function" != typeof e) return n;
              try {
                return e.apply(this, t)
              } catch (e) {
                return n
              }
            },
            T: function (e, t) {
              var n = Object.prototype.toString.call(e).substring(8).replace("]", "");
              return t ? n === t : n
            },
            $a4: function (e, t) {
              if (!e) return "";
              if (!t) return e;
              var n = this,
                o = n.T(t);
              return "Function" === o ? n.$a3(t, [e], e) : "Array" === o ? (this.each(t, (function (t) {
                e = n.$a4(e, t)
              })), e) : "Object" === o ? e.replace(t.rule, t.target || "") : e.replace(t, "")
            },
            $a5: function (e, t) {
              if (!e || !t) return !1;
              if ((this.isString(t) || t.source || "Function" === this.T(t)) && (t = [t]), !this.isArray(t)) return r.warn("[arms] invalid rules of ignore config, (list of) String/RegExp/Funcitons are available"), !1;
              for (var n, o = [], c = 0, a = t.length; c < a; c++)
                if (n = t[c], this.isString(n)) o.push(n.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"));
                else if (n && n.source) o.push(n.source);
              else if (n && "Function" === this.T(n) && !0 === this.$a3(n, [e], !1)) return !0;
              var u = new RegExp(o.join("|"), "i");
              return !!(o.length && u.test && u.test(e))
            },
            J: function (e) {
              if (!e || "string" != typeof e) return e;
              var t = null;
              try {
                t = JSON.parse(e)
              } catch (e) {}
              return t
            },
            pick: function (e) {
              return 1 === e || 1 === Math.ceil(Math.random() * e)
            },
            $a6: function (e) {
              if ("sample" in e) {
                var t = e.sample,
                  n = t;
                t && /^\d+(\.\d+)?%$/.test(t) && (n = parseInt(100 / parseFloat(t))), 0 < n && 1 > n && (n = parseInt(1 / n)), n >= 1 && n <= 100 ? e.sample = n : delete e.sample
              }
              return e
            },
            on: function (e, t, n, o) {
              return e.addEventListener ? e.addEventListener(t, (function c(a) {
                o && e.removeEventListener(t, c, !1), n.call(this, a)
              }), !1) : e.attachEvent && e.attachEvent("on" + t, (function c(a) {
                o && e.detachEvent("on" + t, c), n.call(this, a)
              })), this
            },
            off: function (e, t, n) {
              return n ? (e.removeEventListener ? e.removeEventListener(t, n) : e.detachEvent && e.detachEvent(t, n), this) : this
            },
            delay: function (e, t) {
              return -1 === t ? (e(), null) : setTimeout(e, t || 0)
            },
            ext: function (e) {
              for (var t = 1, n = arguments.length; t < n; t++) {
                var o = arguments[t];
                for (var c in o) Object.prototype.hasOwnProperty.call(o, c) && (e[c] = o[c])
              }
              return e
            },
            sub: function (e, t) {
              var n = {};
              return this.each(e, (function (e, o) {
                -1 !== t.indexOf(o) && (n[o] = e)
              })), n
            },
            uu: function () {
              for (var e, t, n = 20, o = new Array(n), c = Date.now().toString(36).split(""); n-- > 0;) t = (e = 36 * Math.random() | 0).toString(36), o[n] = e % 3 ? t : t.toUpperCase();
              for (var a = 0; a < 8; a++) o.splice(3 * a + 2, 0, c[a]);
              return o.join("")
            },
            seq: function () {
              return (c++).toString(36)
            },
            decode: function (e) {
              try {
                e = decodeURIComponent(e)
              } catch (e) {}
              return e
            },
            encode: function (e, t) {
              try {
                e = t ? encodeURIComponent(e).replace(/\(/g, "%28").replace(/\)/g, "%29") : encodeURIComponent(e)
              } catch (e) {}
              return e
            },
            serialize: function (e) {
              e = e || {};
              var t = [];
              for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && void 0 !== e[n] && t.push(n + "=" + this.encode(e[n], "msg" === n));
              return t.join("&")
            },
            $a7: function (e, t) {
              if (!e || "string" != typeof e) return !1;
              var n = /arms-retcode[\w-]*\.aliyuncs/.test(e);
              return !n && t && (n = /(\.png)|(\.gif)|(alicdn\.com)/.test(e)), !n
            },
            $a8: function (e) {
              return !(!e || !e.message || /failed[\w\s]+fetch/i.test(e.message))
            },
            $a9: function (e) {
              return e && "string" == typeof e ? e.replace(/^(https?:)?\/\//, "").replace(/\?.*$/, "") : ""
            },
            $aa: function (e) {
              return function () {
                return e + "() { [native code] }"
              }
            },
            checkSameOrigin: function (e, t) {
              if (!t || !e) return !1;
              var n = "//" + t.split("/")[2];
              return e === t || e.slice(0, t.length + 1) === t + "/" || e === n || e.slice(0, n.length + 1) === n + "/" || !/^(\/\/|http:|https:).*/.test(e)
            },
            getRandIP: function () {
              for (var e = [], t = 0; t < 4; t++) {
                var n = Math.floor(256 * Math.random());
                e[t] = (n > 15 ? "" : "0") + n.toString(16)
              }
              return e.join("")
            },
            getSortNum: function (e) {
              return e ? (e += 1) >= 1e3 && e <= 9999 ? e : e < 1e3 ? e + 1e3 : e % 1e4 + 1e3 : 1e3
            },
            getRandNum: function (e) {
              return e && "string" == typeof e ? e.length < 5 ? this.getNum(5) : e.substring(e.length - 5) : this.getNum(5)
            },
            getNum: function (e) {
              for (var t = [], n = 0; n < e; n++) {
                var o = Math.floor(16 * Math.random());
                t[n] = o.toString(16)
              }
              return t.join("")
            },
            isFunction: function (e) {
              return "function" == typeof e
            },
            isPlainObject: function (e) {
              return "[object Object]" === Object.prototype.toString.call(e)
            },
            isString: function (e) {
              return "[object String]" === Object.prototype.toString.call(e)
            },
            isArray: function (e) {
              return "[object Array]" === Object.prototype.toString.call(e)
            },
            joinRegExp: function (e) {
              for (var t, n = [], o = 0, c = e.length; o < c; o++) t = e[o], this.isString(t) ? n.push(t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : t && t.source && n.push(t.source);
              return new RegExp(n.join("|"), "i")
            }
          },
          u = r,
          i = function e(t) {
            return this.ver = "1.7.1", this._conf = u.ext({}, e.dftCon), this.$af = {}, this.$ab = [], this.hash = u.seq(), this.$ag(), this.setConfig(t), this.rip = u.getRandIP(), this.record = 999, this["EagleEye-TraceID"] = this.getTraceId()["EagleEye-TraceID"], this._common = {}, this
          };
        i.dftCon = {
          sample: 1,
          tag: "",
          imgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
          region: null,
          ignore: {
            ignoreUrls: [],
            ignoreApis: [],
            ignoreErrors: []
          },
          release: void 0,
          environment: "production"
        }, i.prototype = {
          constructor: i,
          $ac: function (e) {
            return e()
          },
          $ah: function () {
            var e = this._conf.page;
            return u.$a3(e, [], e + "")
          },
          setPage: function () {},
          setConfig: function (e) {
            e && "object" == o(e) && (u.$a6(e), e = this.$ai(e), this._conf = u.ext({}, this._conf, e))
          },
          $ai: function (e) {
            var t = e.region,
              n = e.imgUrl;
            if (t) {
              var o = u.regionMap[t];
              return e.imgUrl = o || u.defaultImgUrl, e
            }
            return n && (e.imgUrl = n), e
          },
          $aj: function (e) {
            if (this.getConfig("debug")) return !0;
            var t = u.regionMap,
              n = !1;
            for (var o in t)
              if (t[o] === e) {
                n = !0;
                break
              } return !n && u.warn("[retcode] invalid url: " + e), n
          },
          $ak: function () {},
          $al: function (e) {
            ! function (e, t) {
              "object" == o(e) && (e = u.serialize(e));
              var n = t + e;
              window && window.navigator && "function" == typeof window.navigator.sendBeacon ? window.navigator.sendBeacon(n, {}) : u.warn("[arms] navigator.sendBeacon not surported")
            }(e, this.getConfig("imgUrl"))
          },
          $am: function () {},
          $an: function () {
            return {}
          },
          setCommonInfo: function (e) {
            e && "object" == o(e) && (this._common = u.ext({}, this._common, e))
          },
          $ag: function () {
            this.session = u.uu(), this.sBegin = Date.now()
          },
          getTraceId: function () {
            var e = this.rip,
              t = Date.now(),
              n = u.getSortNum(this.record),
              o = e + t + n + u.getRandNum(this._conf.pid);
            return this["EagleEye-TraceID"] = o, this.record = n, {
              "EagleEye-TraceID": o
            }
          },
          getSessionId: function () {
            return {
              "EagleEye-SessionID": this.session
            }
          },
          getConfig: function (e) {
            return e ? this._conf[e] : u.ext({}, this._conf)
          },
          $ao: function (e) {
            return 1 === e || ("boolean" == typeof this.$af[e] || (this.$af[e] = u.pick(e)), this.$af[e])
          },
          $ae: function () {
            var e;
            clearTimeout(this.$ad), this.$ad = null;
            for (var t = this._conf && "function" == typeof this._conf.sendRequest; e = this.$ab.pop();) "res" === e.t ? this.$am(e, "res") : "error" === e.t ? this.$am(e, "err") : "behavior" === e.t ? this.$am(e, "behavior") : "health" === e.t && !t && window && window.navigator && "function" == typeof window.navigator.sendBeacon ? this.$al(e) : this.$ak(e);
            return this
          },
          _lg: function (e, t, n) {
            var o = this._conf,
              c = this.$ah(),
              a = o.ignore || {},
              r = a.ignoreErrors,
              i = a.ignoreUrls,
              s = a.ignoreApis;
            return u.$a5(c, i) || u.$a5(u.decode(c), i) || "error" === e && (u.$a5(t.msg, r) || u.$a5(u.decode(t.msg), r)) || "api" === e && (u.$a5(t.api, s) || u.$a5(u.decode(t.api), s)) ? this : this.$aj(o.imgUrl) && t && !o.disabled && o.pid ? n && !this.$ao(n) ? this : function (e, t) {
              var n;
              if ("error" !== t.t || !(n = e.$ab[0]) || "error" !== n.t || t.msg !== n.msg) {
                if ("behavior" === t.t) {
                  var o = e.$ab && e.$ab.length;
                  if (o > 0 && "behavior" === e.$ab[o - 1].t) {
                    var c = t.behavior || [];
                    e.$ab[o - 1].behavior.concat(c)
                  } else e.$ab.push(t)
                } else e.$ab.unshift(t);
                return e.$ac((function () {
                  e.$ad = u.delay((function () {
                    e.$ae()
                  }), e.$ab[0] && "error" === e.$ab[0].t ? 3e3 : -1)
                })), !0
              }
              n.times++
            }(this, t = u.ext({
              t: e,
              times: 1,
              page: c,
              tag: o.tag || "",
              release: o.release || "",
              environment: o.environment,
              begin: Date.now()
            }, t, this.$an(), this._common, {
              pid: o.pid,
              _v: this.ver,
              sid: this.session,
              sampling: n || 1,
              z: u.seq(),
              c1: o.c1,
              c2: o.c2,
              c3: o.c3
            })) : this
          },
          custom: function (e, t) {
            if (!e || "object" != o(e)) return this;
            var n = !1,
              c = {
                begin: Date.now()
              };
            return u.each(e, (function (e, t) {
              return !(n = t && t.length <= 20) && u.warn("[retcode] invalid key: " + t), c["x-" + t] = e, n
            })), n ? this._lg("custom", c, t || 1) : this
          }
        };
        var s = i,
          y = ["api", "success", "time", "code", "msg", "trace", "traceId", "begin", "sid", "seq"],
          d = function (e, t) {
            var n = e.split("::");
            return n.length > 1 ? u.ext({
              group: n[0],
              key: n[1]
            }, t) : u.ext({
              group: "default_group",
              key: n[0]
            }, t)
          },
          l = function (e) {
            var t;
            s.call(this, e);
            try {
              t = "object" == ("undefined" == typeof performance ? "undefined" : o(performance)) ? performance.timing.fetchStart : Date.now()
            } catch (e) {
              t = Date.now()
            }
            return this._startTime = t, this
          };
        l.prototype = u.$a2(s.prototype), u.ext(s.dftCon, {
          startTime: null
        }), u.ext(l.prototype, {
          constructor: l,
          _super: s,
          sum: function (e, t, n) {
            try {
              return this._lg("sum", d(e, {
                val: t || 1,
                begin: Date.now()
              }), n)
            } catch (e) {
              u.warn("[retcode] can not get parseStatData: " + e)
            }
          },
          avg: function (e, t, n) {
            try {
              return this._lg("avg", d(e, {
                val: t || 0,
                begin: Date.now()
              }), n)
            } catch (e) {
              u.warn("[retcode] can not get parseStatData: " + e)
            }
          },
          percent: function (e, t, n, o) {
            try {
              return this._lg("percent", d(e, {
                subkey: t,
                val: n || 0,
                begin: Date.now()
              }), o)
            } catch (e) {
              u.warn("[retcode] can not get parseStatData: " + e)
            }
          },
          msg: function (e, t) {
            if (e && !(e.length > 180)) return this.custom({
              msg: e
            }, t)
          },
          error: function (e, t) {
            if (!e) return u.warn("[retcode] invalid param e: " + e), this;
            1 === arguments.length ? ("string" == typeof e && (e = {
              message: e
            }, t = {}), "object" == o(e) && (t = e = e.error || e)) : ("string" == typeof e && (e = {
              message: e
            }), "object" != o(t) && (t = {}));
            var n = e.name || "CustomError",
              c = e.message || "",
              a = e.stack || "";
            t = t || {};
            var r = {
                begin: Date.now(),
                cate: n,
                msg: c && c.substring(0, 1e3),
                stack: a && a.substring(0, 1e3),
                file: t.filename || "",
                line: t.lineno || "",
                col: t.colno || "",
                err: {
                  msg_raw: u.encode(c),
                  stack_raw: u.encode(a)
                }
              },
              i = (this.getConfig("ignore") || {}).ignoreErrors;
            return u.$a5(r.msg, i) || u.$a5(u.decode(r.msg), i) ? this : (this.$ar && this.$ar("error", r), this._lg("error", r, 1))
          },
          behavior: function (e) {
            if (e) {
              var t = "object" == o(e) && e.behavior ? e : {
                behavior: e
              };
              return this.$ar && this.$ar("behavior", t), this._lg("behavior", t, 1)
            }
          },
          api: function (e, t, n, o, c, a, r, i) {
            if (!e) return u.warn("[retcode] api is null"), this;
            if (e = "string" == typeof e ? {
                api: e,
                success: t,
                time: n,
                code: o,
                msg: c,
                begin: a,
                traceId: r,
                sid: i
              } : u.sub(e, y), !u.$a7(e.api)) return this;
            if (e.code = e.code || "", e.msg = e.msg || "", e.success = e.success ? 1 : 0, e.time = +e.time, e.begin = e.begin, e.traceId = e.traceId || "", e.sid = e.sid || "", !e.api || isNaN(e.time)) return u.warn("[retcode] invalid time or api"), this;
            var s = (this.getConfig("ignore") || {}).ignoreApis;
            if (u.$a5(e.api, s) || u.$a5(u.decode(e.api), s)) return this;
            this.$ar && this.$ar("api", e);
            var d = {
              type: "api",
              data: {
                message: c,
                url: e.api,
                status: o || ""
              },
              timestamp: a
            };
            try {
              this.getConfig("behavior") && this.addBehavior && this.addBehavior(d)
            } catch (e) {}
            return this._lg("api", e, e.success && this.getConfig("sample"))
          },
          speed: function (e, t, n) {
            var o = this,
              c = this.getConfig("startTime") || this._startTime;
            return /^s(\d|1[0])$/.test(e) ? (t = "number" != typeof t ? Date.now() - c : t >= c ? t - c : t, o.$ap = o.$ap || {}, o.$ap[e] = t, o.$ap.begin = c, clearTimeout(o.$aq), o.$aq = setTimeout((function () {
              n || (o.$ap.page = o.$ah(!0)), o._lg("speed", o.$ap), o.$ap = null
            }), 5e3), o) : (u.warn("[retcode] invalid point: " + e), o)
          },
          performance: function (e) {
            if (e) {
              var t = {};
              for (var n in e)(/^t([1-9]|1[0])$/.test(n) || "ctti" === n || "cfpt" === n) && (t[n] = e[n]);
              "{}" !== JSON.stringify(t) && (this.$as = t)
            }
          },
          resource: function (e, t) {
            if (!e || !u.isPlainObject(e)) return u.warn("[arms] invalid param data: " + e), this;
            var n = Object.keys(e),
              o = ["begin", "dom", "load", "res", "dl"],
              c = !1;
            for (var a in o)
              if (n.indexOf(o[a]) < 0) {
                c = !0;
                break
              } if (c) return u.warn("[arms] lack param data: " + e), this;
            var r = {
              begin: e.begin || Date.now(),
              dom: e.dom || "",
              load: e.load || "",
              res: u.isArray(e.res) ? JSON.stringify(e.res) : JSON.stringify([]),
              dl: e.dl || ""
            };
            return this._lg("res", r, t)
          }
        }), l._super = s, l._root = s, s.Reporter = l;
        var f = l,
          m = function (e) {
            e && e.pid || u.warn("[arms] pid is a required prop to instatiate MiniProgramLogger");
            var t = this;
            return f.call(t, e), t._health = {
              errcount: 0,
              apisucc: 0,
              apifail: 0
            }, t.DEFAUT_PAGE_PATH = "[app]", t.isSendPerf = !1, t.$ar = function (e, n) {
              "error" === e ? t._health.errcount++ : "api" === e && t._health[n.success ? "apisucc" : "apifail"]++
            }, "function" == typeof t.$at && t.$at(), "function" == typeof t.$au && t.$au(), this
          };
        m.prototype = u.$a2(f.prototype), u.ext(f._root.dftCon, {
          uid: null,
          disableHook: !1,
          enableLinkTrace: !1,
          sendRequest: function () {},
          getCurrentPage: function () {}
        }), u.ext(m.prototype, {
          constructor: m,
          _super: f,
          $ac: function (e) {
            e()
          },
          $ak: function (e, t) {
            if (this.getConfig("debug")) "undefined" != typeof console && console && "function" == typeof console.log && console.log("[arms] [DEBUG MODE] log data", e);
            else {
              var n = this.getConfig("imgUrl");
              "object" == o(e) && (e = u.serialize(e));
              var c = n + e;
              t && (c += "&post_res=");
              var a = this._conf.sendRequest;
              if ("function" == typeof a) try {
                a(c, t)
              } catch (e) {
                u.warn("[arms] error in $ak", e)
              }
            }
          },
          $am: function (e, t) {
            var n = {};
            n[t] = e[t], delete e[t], this.$ak(e, n)
          },
          $ah: function () {
            var e = this._conf.getCurrentPage;
            if ("function" == typeof e) try {
              var t = e();
              if (t && "string" == typeof t) return t
            } catch (e) {
              u.warn("[arms] error in $ah", e)
            }
            return "string" == typeof e && e ? e : this.DEFAUT_PAGE_PATH
          },
          setConfig: function (e) {
            if (e && "object" == o(e)) {
              u.$a6(e), e = this.$ai(e);
              var t = this._conf;
              this._conf = u.ext({}, this._conf, e);
              var n = "disableHook";
              n in e && t[n] !== e[n] && (e[n] ? "function" == typeof this.removeHook && this.removeHook() : "function" == typeof this.addHook && this.addHook())
            }
          },
          pageShow: function () {
            var e = this;
            e.$ag(), e.$av(), clearTimeout(e.$aw), e.$ax(), e.$aw = setTimeout((function () {
              e.$ay()
            }), 10), e.sessionPage = e.$ah()
          },
          pageHide: function () {
            this.$ax()
          },
          addHook: function () {
            return this
          },
          removeHook: function () {
            return this
          },
          hookApp: function (e) {
            var t = this,
              n = {
                onError: function (n) {
                  var o = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
                    c = e.onError;
                  try {
                    t.error(n)
                  } catch (n) {
                    u.warn("[arms] error in hookApp:onError", n)
                  }
                  if ("function" == typeof c) return c.apply(this, o)
                }
              };
            return u.ext({}, e, n)
          },
          hookPage: function (e) {
            var t = this,
              n = {
                onShow: function () {
                  var n = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
                    o = e.onShow;
                  try {
                    t.pageShow()
                  } catch (e) {
                    u.warn("[arms] error in hookPage:pageShow", e)
                  }
                  if ("function" == typeof o) return o.apply(this, n)
                },
                onHide: function () {
                  var n = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
                    o = e.onHide;
                  try {
                    t.pageHide()
                  } catch (e) {
                    u.warn("[arms] error in hookPage:onHide", e)
                  }
                  if ("function" == typeof o) return o.apply(this, n)
                },
                onUnload: function () {
                  var n = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
                    o = e.onUnload;
                  try {
                    t.pageHide()
                  } catch (e) {
                    u.warn("[arms] error in hookPage:onUnload", e)
                  }
                  if ("function" == typeof o) return o.apply(this, n)
                }
              };
            return u.ext({}, e, n)
          },
          $at: function () {},
          $au: function () {
            this.setCommonInfo({
              app: "mini_common",
              uid: this._conf.uid
            })
          },
          $ay: function () {
            var e = this;
            e.$ac((function () {
              e._lg("pv", {})
            }))
          },
          $av: function () {
            var e = this;
            e.isSendPerf || (e.$ac((function () {
              var t = {
                fpt: Date.now() - e.sBegin
              };
              e._lg("perf", t)
            })), e.isSendPerf = !0)
          },
          $ax: function () {
            this.$az(), this.$ap && (this._lg("speed", this.$ap), this.$ap = null, clearTimeout(this.$aq)), this.$ae()
          },
          $az: function () {
            if (this.sessionPage) {
              var e = u.ext({}, this._health);
              e.healthy = e.errcount > 0 ? 0 : 1, e.begin = Date.now();
              var t = e.begin - this.sBegin;
              e.page = this.sessionPage, e.stay = t, this._lg("health", e, 1), this._health = {
                errcount: 0,
                apisucc: 0,
                apifail: 0
              }, this.sessionPage = null
            }
          }
        });
        var p = null,
          h = function (e) {
            return p || (p = new m(e || {})), p
          };
        m.createExtraInstance = function (e) {
          return e && "object" == o(e) ? e.disableHook = !0 : e = {
            disableHook: !0
          }, new m(e)
        }, m.init = h, m.singleton = h, m._super = f, m._root = f._root, f.MiniProgramLogger = m;
        var C = m,
          g = function (e) {
            return C.call(this, e), this
          };
        g.prototype = u.$a2(C.prototype), u.ext(C._root.dftCon, {
            sendRequest: function (e, n) {
              if (void 0 !== t && t && "function" == typeof t.request) try {
                var o, c = "GET";
                n && (c = "POST", o = JSON.stringify(n)), t.request({
                  url: e,
                  method: c,
                  data: o,
                  fail: function (e) {
                    u.warn("[arms] sendRequest fail", e)
                  }
                })
              } catch (e) {
                u.warn("[arms] error in conf sendRequest", e)
              }
            },
            getCurrentPage: function () {
              if ("function" == typeof getCurrentPages) try {
                var e = getCurrentPages() || [],
                  t = e[e.length - 1];
                return t && t.route || null
              } catch (e) {
                u.warn("[arms] error in conf getCurrentPage", e)
              }
            }
          }), u.ext(g.prototype, {
            constructor: g,
            _super: C,
            $au: function () {
              this.setCommonInfo({
                app: "mini_wx"
              }), this.$b1(), this.$b2(), this.$b3()
            },
            $b3: function () {
              if (this._conf && this._conf.uid) this.setCommonInfo({
                uid: this._conf.uid
              });
              else if (void 0 !== t && t && "function" == typeof t.getStorageSync) try {
                var e = t.getStorageSync("ARMS_STORAGE_MINIPROGRAM_WX_UID_KEY");
                if (e && "string" == typeof e) this.setCommonInfo({
                  uid: e
                });
                else if ("function" == typeof t.setStorageSync) {
                  var n = u.uu();
                  t.setStorageSync("ARMS_STORAGE_MINIPROGRAM_WX_UID_KEY", n), this.setCommonInfo({
                    uid: n
                  })
                }
              } catch (e) {
                u.warn("[arms] error in $b3", e)
              }
            },
            $b1: function () {
              if (void 0 !== t && t && "function" == typeof t.getSystemInfoSync) try {
                var e = t.getSystemInfoSync();
                "object" == o(e) && this.setCommonInfo({
                  sr: (e.screenWidth || 0) + "x" + (e.screenHeight || 0),
                  vp: (e.windowWidth || 0) + "x" + (e.windowHeight || 0),
                  dpr: e.pixelRatio,
                  ul: e.language
                })
              } catch (e) {
                u.warn("[arms] error in $b1", e)
              }
            },
            $b2: function () {
              var e = this;
              if (void 0 !== t && t && "function" == typeof t.getNetworkType) try {
                t.getNetworkType({
                  success: function (t) {
                    t && "string" == typeof t.networkType && e.setCommonInfo({
                      ct: t.networkType
                    })
                  },
                  fail: function (e) {
                    u.warn("[arms] $b2 getNetworkType fail", e)
                  }
                })
              } catch (e) {
                u.warn("[arms] error in $b2", e)
              }
            },
            hookApp: function (e) {
              var t = this,
                n = {
                  onError: function (n) {
                    var c = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
                      a = e.onError;
                    try {
                      if (n && "object" == o(n) && t.error(n), n && "string" == typeof n) {
                        var r = n.split("\n"),
                          i = "",
                          s = "";
                        r.length > 1 && (i = r[0] && r[0].length < 100 ? r[0] : r[0].substring(0, 100), s = r[1]), t.error({
                          name: i,
                          message: s || n,
                          stack: n
                        })
                      }
                    } catch (n) {
                      u.warn("[arms] error in hookApp:onError", n)
                    }
                    if ("function" == typeof a) return a.apply(this, c)
                  }
                };
              return u.ext({}, e, n)
            }
          }),
          function (e) {
            var n = u,
              c = null,
              a = {};
            n.ext(e.prototype, {
              addHook: function () {
                return this.isHookInstantiated || (function () {
                  var e = this;
                  if (void 0 !== t && t && "function" == typeof t.request) {
                    c = t;
                    var r = {
                      request: function (t) {
                        var c = (new Date).getTime();
                        if (t && "object" == o(t) && t[0]) {
                          var a, r, u = t[0],
                            i = n.$a9(u.url),
                            s = u.success,
                            y = u.fail,
                            d = u && u.header;
                          d && "object" == o(d) || (d = {});
                          var l = {};
                          if (e.getConfig("enableLinkTrace")) {
                            var f = d["EagleEye-pAppName"];
                            if (a = d["EagleEye-TraceID"], r = d["EagleEye-SessionID"], a || (a = e.getTraceId()["EagleEye-TraceID"], l["EagleEye-TraceID"] = a), r || (r = e.getSessionId()["EagleEye-SessionID"], l["EagleEye-SessionID"] = r), !f) {
                              var m = e.getConfig("pid");
                              l["EagleEye-pAppName"] = m
                            }
                          }
                          u.success = function () {
                            var o = (new Date).getTime();
                            if (n.$a7(i, !0)) {
                              var u = arguments && arguments[0] && arguments[0].statusCode || 200;
                              e.api({
                                api: t[0].url,
                                success: !0,
                                time: o - c,
                                code: u,
                                begin: c,
                                traceId: a,
                                sid: r
                              })
                            }
                            s && s.apply(e, [].slice.call(arguments))
                          }, u.fail = function () {
                            var u = (new Date).getTime();
                            if (n.$a7(i, !0)) {
                              var s = "";
                              arguments && arguments[0] && "object" == o(arguments[0]) && (s = (s = JSON.stringify(arguments[0])).substring(0, 1e3));
                              var d = arguments && arguments[0] && arguments[0].statusCode || "FAILED";
                              e.api({
                                api: t[0].url,
                                success: !1,
                                time: u - c,
                                code: d,
                                msg: s,
                                begin: c,
                                traceId: a,
                                sid: r
                              })
                            }
                            y && y.apply(e, [].slice.call(arguments))
                          }, u.header = n.ext({}, d, l)
                        }
                      }
                    };
                    for (var u in t)
                      if (r[u]) {
                        var i = u.toString();
                        a[i] = function () {
                          return r[i](arguments), c[i].apply(c, [].slice.call(arguments))
                        }
                      } else a[u] = c[u];
                    t = a
                  }
                }.call(this), this.isHookInstantiated = !0), this
              },
              removeHook: function () {
                return this.isHookInstantiated ? (function () {
                  void 0 !== t && t && c && (t = c, c = null)
                }.call(this), this.isHookInstantiated = !1, this) : this
              },
              $at: function () {
                return this.$b0 || (this.getConfig("disableHook") || this.addHook(), this.$b0 = !0), this
              }
            })
          }(g);
        var v = null,
          N = function (e) {
            return v || (v = new g(e || {})), v
          };
        g.createExtraInstance = function (e) {
          return e && "object" == o(e) ? e.disableHook = !0 : e = {
            disableHook: !0
          }, new g(e)
        }, g.init = N, g.singleton = N, g._super = C, g._root = C._root, C.WXLogger = g;
        var b = g;
        e.exports = b
      }).call(this, n("3223").default)
    },
    a418: function (t, n, o) {
      Object.defineProperty(n, "__esModule", {
        value: !0
      }), n.onNavigationBarSearchInputClicked = n.onNavigationBarSearchInputConfirmed = n.onNavigationBarSearchInputChanged = n.onBackPress = n.onNavigationBarButtonTap = n.onTabItemTap = n.onResize = n.onPageScroll = n.onAddToFavorites = n.onShareTimeline = n.onShareAppMessage = n.onReachBottom = n.onPullDownRefresh = n.onUnload = n.onReady = n.onLoad = n.onInit = n.onUniNViewMessage = n.onThemeChange = n.onUnhandledRejection = n.onPageNotFound = n.onError = n.onLaunch = n.onHide = n.onShow = n.initUtsPackageName = n.initUtsClassName = n.initUtsIndexClassName = n.initUtsProxyFunction = n.initUtsProxyClass = void 0;
      var c = o("c4a0"),
        a = o("88bd"),
        r = o("4ed8"),
        u = o("93f8");
      Object.defineProperty(n, "initUtsProxyClass", {
        enumerable: !0,
        get: function () {
          return u.initUtsProxyClass
        }
      }), Object.defineProperty(n, "initUtsProxyFunction", {
        enumerable: !0,
        get: function () {
          return u.initUtsProxyFunction
        }
      }), Object.defineProperty(n, "initUtsIndexClassName", {
        enumerable: !0,
        get: function () {
          return u.initUtsIndexClassName
        }
      }), Object.defineProperty(n, "initUtsClassName", {
        enumerable: !0,
        get: function () {
          return u.initUtsClassName
        }
      }), Object.defineProperty(n, "initUtsPackageName", {
        enumerable: !0,
        get: function () {
          return u.initUtsPackageName
        }
      });
      var i = [],
        s = function (e) {
          i.push(e);
          var t = (0, c.createLifeCycle)(e);
          return function (e, n) {
            return t(e, n)
          }
        };
      "object" === ("undefined" == typeof plus ? "undefined" : e(plus)) ? a.init(): "object" === ("undefined" == typeof window ? "undefined" : e(window)) && "document" in window || r.init(i), n.onShow = s("onShow"), n.onHide = s("onHide"), n.onLaunch = s("onLaunch"), n.onError = s("onError"), n.onPageNotFound = s("onPageNotFound"), n.onUnhandledRejection = s("onUnhandledRejection"), n.onThemeChange = s("onThemeChange"), n.onUniNViewMessage = s("onUniNViewMessage"), n.onInit = s("onInit"), n.onLoad = s("onLoad"), n.onReady = s("onReady"), n.onUnload = s("onUnload"), n.onPullDownRefresh = s("onPullDownRefresh"), n.onReachBottom = s("onReachBottom"), n.onShareAppMessage = s("onShareAppMessage"), n.onShareTimeline = s("onShareTimeline"), n.onAddToFavorites = s("onAddToFavorites"), n.onPageScroll = s("onPageScroll"), n.onResize = s("onResize"), n.onTabItemTap = s("onTabItemTap"), n.onNavigationBarButtonTap = s("onNavigationBarButtonTap"), n.onBackPress = s("onBackPress"), n.onNavigationBarSearchInputChanged = s("onNavigationBarSearchInputChanged"), n.onNavigationBarSearchInputConfirmed = s("onNavigationBarSearchInputConfirmed"), n.onNavigationBarSearchInputClicked = s("onNavigationBarSearchInputClicked")
    },
    a708: function (e, t, n) {
      var o = n("6454");
      e.exports = function (e) {
        if (Array.isArray(e)) return o(e)
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    a75d: function (e, t, n) {},
    a84c: function (e, t) {
      e.exports = "https://localhost/api/file/image/01_jq@3x.png"
    },
    a91b: function (e, t, n) {
      var o = n("47a9");
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.addDateRange = function (e, t, n) {
        var o = e;
        return o.params = {}, null !== t && "" !== t && (void 0 === n ? (o.params.beginTime = t[0], o.params.endTime = t[1]) : (o.params["begin" + n] = t[0], o.params["end" + n] = t[1])), o
      }, t.download = function (e) {
        window.location.href = u + "/common/download?fileName=" + encodeURI(e) + "&delete=" + !0
      }, t.handleTree = function (e, t, n, o) {
        var c, r = t || "id",
          u = n || "parentId",
          i = o || "children",
          s = {},
          y = {},
          d = [],
          l = a(e);
        try {
          for (l.s(); !(c = l.n()).done;) {
            var f = c.value,
              m = f[u];
            null == s[m] && (s[m] = []), y[f[r]] = f, s[m].push(f)
          }
        } catch (e) {
          l.e(e)
        } finally {
          l.f()
        }
        var p, h = a(e);
        try {
          for (h.s(); !(p = h.n()).done;) {
            var C = p.value;
            null == y[C[u]] && d.push(C)
          }
        } catch (e) {
          h.e(e)
        } finally {
          h.f()
        }
        for (var g = 0, v = d; g < v.length; g++) {
          N(v[g])
        }

        function N(e) {
          if (null !== s[e[r]] && (e[i] = s[e[r]]), e[i]) {
            var t, n = a(e[i]);
            try {
              for (n.s(); !(t = n.n()).done;) {
                N(t.value)
              }
            } catch (e) {
              n.e(e)
            } finally {
              n.f()
            }
          }
        }
        return d
      }, t.parseTime = function (e, t) {
        if (0 === arguments.length || !e) return null;
        var n, o = t || "{y}-{m}-{d} {h}:{i}:{s}";
        "object" === (0, c.default)(e) ? n = e: ("string" == typeof e && /^[0-9]+$/.test(e) ? e = parseInt(e) : "string" == typeof e && (e = e.replace(new RegExp(/-/gm), "/")), "number" == typeof e && 10 === e.toString().length && (e *= 1e3), n = new Date(e));
        var a = {
            y: n.getFullYear(),
            m: n.getMonth() + 1,
            d: n.getDate(),
            h: n.getHours(),
            i: n.getMinutes(),
            s: n.getSeconds(),
            a: n.getDay()
          },
          r = o.replace(/{(y|m|d|h|i|s|a)+}/g, (function (e, t) {
            var n = a[t];
            return "a" === t ? ["日", "一", "二", "三", "四", "五", "六"][n] : (e.length > 0 && n < 10 && (n = "0" + n), n || 0)
          }));
        return r
      }, t.praseStrEmpty = function (e) {
        return e && "undefined" !== e && "null" !== e ? e : ""
      }, t.resetForm = function (e) {
        this.$refs[e] && this.$refs[e].resetFields()
      }, t.selectDictLabel = function (e, t) {
        var n = [];
        return Object.keys(e).some((function (o) {
          if (e[o].dictValue === "" + t) return n.push(e[o].dictLabel), !0
        })), n.join("")
      }, t.selectDictLabels = function (e, t, n) {
        var o = [],
          c = void 0 === n ? "," : n,
          a = t.split(c);
        return Object.keys(t.split(c)).some((function (t) {
          Object.keys(e).some((function (n) {
            e[n].dictValue === "" + a[t] && o.push(e[n].dictLabel + c)
          }))
        })), o.join("").substring(0, o.join("").length - 1)
      }, t.sprintf = function (e) {
        var t = arguments,
          n = !0,
          o = 1;
        return e = e.replace(/%s/g, (function () {
          var e = t[o++];
          return void 0 === e ? (n = !1, "") : e
        })), n ? e : ""
      };
      var c = o(n("3b2d"));

      function a(e, t) {
        var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
        if (!n) {
          if (Array.isArray(e) || (n = function (e, t) {
              if (e) {
                if ("string" == typeof e) return r(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? r(e, t) : void 0
              }
            }(e)) || t && e && "number" == typeof e.length) {
            n && (e = n);
            var o = 0,
              c = function () {};
            return {
              s: c,
              n: function () {
                return o >= e.length ? {
                  done: !0
                } : {
                  done: !1,
                  value: e[o++]
                }
              },
              e: function (e) {
                throw e
              },
              f: c
            }
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var a, u = !0,
          i = !1;
        return {
          s: function () {
            n = n.call(e)
          },
          n: function () {
            var e = n.next();
            return u = e.done, e
          },
          e: function (e) {
            i = !0, a = e
          },
          f: function () {
            try {
              u || null == n.return || n.return()
            } finally {
              if (i) throw a
            }
          }
        }
      }

      function r(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
        return o
      }
      var u = Object({
        NODE_ENV: "production",
        VUE_APP_DARK_MODE: "false",
        VUE_APP_NAME: "consult-visitor-front",
        VUE_APP_PLATFORM: "mp-weixin",
        BASE_URL: "/"
      }).VUE_APP_BASE_API
    },
    a92f: function (e, t) {
      e.exports = "https://localhost/api/file/image/定位@3x.png"
    },
    ab45: function (e, t) {
      e.exports = "https://localhost/api/file/image/咨询经验_bg@3x.png"
    },
    acbb: function (e, t, n) {
      (function (e) {
        var o = n("47a9");
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.getCurrentCity = void 0;
        var c = o(n("7eb4")),
          a = o(n("34cf")),
          r = o(n("ee10")),
          u = n("624a"),
          i = function () {
            var t = (0, r.default)(c.default.mark((function t() {
              var n, o, r, i, s, y;
              return c.default.wrap((function (t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, e.authorize({
                      scope: "scope.userFuzzyLocation"
                    });
                  case 2:
                    return t.next = 4, e.getFuzzyLocation({
                      type: "wgs84"
                    });
                  case 4:
                    if (n = t.sent, o = (0, a.default)(n, 2), r = o[0], i = o[1], !r) {
                      t.next = 11;
                      break
                    }
                    return console.error(r), t.abrupt("return", null);
                  case 11:
                    return s = i.latitude, y = i.longitude, t.abrupt("return", (0, u.getCurrentCity)(s, y));
                  case 13:
                  case "end":
                    return t.stop()
                }
              }), t)
            })));
            return function () {
              return t.apply(this, arguments)
            }
          }();
        t.getCurrentCity = i
      }).call(this, n("df3c").default)
    },
    af34: function (e, t, n) {
      var o = n("a708"),
        c = n("b893"),
        a = n("6382"),
        r = n("9008");
      e.exports = function (e) {
        return o(e) || c(e) || a(e) || r()
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    b129: function (e, t, n) {
      var o = n("47a9");
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getGuides = void 0;
      var c = o(n("7eb4")),
        a = o(n("ee10")),
        r = o(n("8138")),
        u = function () {
          var e = (0, a.default)(c.default.mark((function e() {
            var t;
            return c.default.wrap((function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, (0, r.default)({
                    url: "/article/getNormalList",
                    method: "get"
                  });
                case 2:
                  return t = e.sent, e.abrupt("return", t.data.data);
                case 4:
                case "end":
                  return e.stop()
              }
            }), e)
          })));
          return function () {
            return e.apply(this, arguments)
          }
        }();
      t.getGuides = u
    },
    b4d2: function (e, t) {
      function n(t) {
        return e.exports = n = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e)
        }, e.exports.__esModule = !0, e.exports.default = e.exports, n(t)
      }
      e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    b81f: function (e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0, t.default = {
        appid: "__UNI__C60B75C"
      }
    },
    b893: function (e, t) {
      e.exports = function (e) {
        if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    bc16: function (e, t, n) {
      var o = n("47a9");
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.paySuccess = t.log = t.counselorShow = t.counselorDetailShow = t.confirm = void 0;
      var c = o(n("8138")),
        a = function (e, t) {
          (0, c.default)({
            url: "/user/event/log",
            method: "post",
            data: {
              targetId: e,
              eventName: t
            }
          })
        };
      t.log = a, t.counselorShow = function (e) {
        return a(e, "counselor_show")
      }, t.counselorDetailShow = function (e) {
        return a(e, "counselor_detail_show")
      }, t.confirm = function (e) {
        return a(e, "consult_click")
      }, t.paySuccess = function (e) {
        return a(e, "consult_success")
      }
    },
    bdc3: function (e, t) {
      e.exports = "https://localhost/api/file/image/亲子教育@3x.png"
    },
    c074: function (e, t, n) {
      var o = n("47a9");
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.updateOrderConsultTime = t.getUnPayOrderFromAdmin = t.getOrderDetail = t.getList = t.bindVisitorToOrder = void 0;
      var c = o(n("7eb4")),
        a = o(n("ee10")),
        r = o(n("8138"));
      t.getList = function (e) {
        return (0, r.default)({
          url: "/visitor/order/getList",
          method: "post",
          data: e
        })
      };
      var u = function () {
        var e = (0, a.default)(c.default.mark((function e() {
          var t;
          return c.default.wrap((function (e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, (0, r.default)({
                  url: "/visitor/order/getSysOrderList",
                  method: "post",
                  data: {
                    pager: {
                      index: 1,
                      size: 100
                    }
                  }
                });
              case 2:
                return t = e.sent, e.abrupt("return", t.data.data.list[0]);
              case 4:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function () {
          return e.apply(this, arguments)
        }
      }();
      t.getUnPayOrderFromAdmin = u;
      var i = function () {
        var e = (0, a.default)(c.default.mark((function e(t) {
          var n;
          return c.default.wrap((function (e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, (0, r.default)({
                  url: "/visitor/order/getOrderInfo",
                  method: "post",
                  data: {
                    orderId: t
                  }
                });
              case 2:
                return n = e.sent, e.abrupt("return", n.data.data);
              case 4:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function (t) {
          return e.apply(this, arguments)
        }
      }();
      t.getOrderDetail = i;
      var s = function () {
        var e = (0, a.default)(c.default.mark((function e(t, n, o) {
          var a;
          return c.default.wrap((function (e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, (0, r.default)({
                  url: "/visitor/order/updateConsultTime",
                  method: "post",
                  data: {
                    orderId: t,
                    consultDate: n,
                    consultHour: Number(o.split(":")[0])
                  }
                });
              case 2:
                return a = e.sent, e.abrupt("return", a.data.data);
              case 4:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function (t, n, o) {
          return e.apply(this, arguments)
        }
      }();
      t.updateOrderConsultTime = s;
      var y = function () {
        var e = (0, a.default)(c.default.mark((function e(t, n) {
          var o;
          return c.default.wrap((function (e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, (0, r.default)({
                  url: "/visitor/order/bind_visitor",
                  method: "post",
                  data: {
                    orderId: t,
                    visitorId: n
                  }
                });
              case 2:
                return o = e.sent, e.abrupt("return", o.data.data);
              case 4:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function (t, n) {
          return e.apply(this, arguments)
        }
      }();
      t.bindVisitorToOrder = y
    },
    c4a0: function (e, t, n) {
      e.exports = n("320f")
    },
    c520: function (e, t) {
      e.exports = "https://localhost/api/file/image/婚姻恋爱@3x.png"
    },
    cb76: function (e, t) {
      e.exports = "https://localhost/api/file/image/人际关系@3x.png"
    },
    d32f: function (e, t, n) {
      var o = n("47a9");
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0;
      var c = o(n("af34")),
        a = {
          name: "困扰",
          type: "filter",
          submenu: [{
            name: "情绪困扰",
            value: 1,
            submenu: [{
              name: "全部",
              value: "全部"
            }, {
              name: "焦虑",
              value: "焦虑"
            }, {
              name: "无意义感",
              value: "无意义感"
            }, {
              name: "易怒",
              value: "易怒"
            }, {
              name: "孤独",
              value: "孤独"
            }, {
              name: "孕产期问题",
              value: "孕产期问题"
            }, {
              name: "无助",
              value: "无助"
            }, {
              name: "情绪不稳定",
              value: "情绪不稳定"
            }, {
              name: "抑郁",
              value: "抑郁"
            }, {
              name: "空虚感",
              value: "空虚感"
            }, {
              name: "内疚",
              value: "内疚"
            }]
          }, {
            name: "婚姻恋爱",
            value: 2,
            submenu: [{
              name: "全部",
              value: "全部"
            }, {
              name: "伴侣沟通",
              value: "伴侣沟通"
            }, {
              name: "安全感",
              value: "安全感"
            }, {
              name: "家庭矛盾",
              value: "家庭矛盾"
            }, {
              name: "感情淡漠",
              value: "感情淡漠"
            }, {
              name: "感情变故",
              value: "感情变故"
            }, {
              name: "恋爱技巧",
              value: "恋爱技巧"
            }, {
              name: "夫妻关系",
              value: "夫妻关系"
            }]
          }, {
            name: "人际关系",
            value: 3,
            submenu: [{
              name: "全部",
              value: "全部"
            }, {
              name: "人际沟通",
              value: "人际沟通"
            }, {
              name: "讨好型人格",
              value: "讨好型人格"
            }, {
              name: "信任问题",
              value: "信任问题"
            }, {
              name: "社交回避",
              value: "社交回避"
            }, {
              name: "适应困难",
              value: "适应困难"
            }, {
              name: "个人界限",
              value: "个人界限"
            }]
          }, {
            name: "家庭困扰",
            value: 4,
            submenu: [{
              name: "全部",
              value: "全部"
            }, {
              name: "成长创伤",
              value: "成长创伤"
            }, {
              name: "家庭冲突",
              value: "家庭冲突"
            }, {
              name: "成长枷锁",
              value: "成长枷锁"
            }, {
              name: "父母沟通",
              value: "父母沟通"
            }, {
              name: "育儿分歧",
              value: "育儿分歧"
            }, {
              name: "婆媳关系",
              value: "婆媳关系"
            }, {
              name: "个人空间",
              value: "个人空间"
            }]
          }, {
            name: "个人成长",
            value: 5,
            submenu: [{
              name: "全部",
              value: "全部"
            }, {
              name: "自我探索",
              value: "自我探索"
            }, {
              name: "自我封闭",
              value: "自我封闭"
            }, {
              name: "完美主义",
              value: "完美主义"
            }, {
              name: "生活意义",
              value: "生活意义"
            }, {
              name: "女性成长",
              value: "女性成长"
            }, {
              name: "男性成长",
              value: "男性成长"
            }, {
              name: "跨文化适应",
              value: "跨文化适应"
            }]
          }, {
            name: "学业职场",
            value: 6,
            submenu: [{
              name: "全部",
              value: "全部"
            }, {
              name: "学业压力",
              value: "学业压力"
            }, {
              name: "管理困难",
              value: "管理困难"
            }, {
              name: "职场倦怠",
              value: "职场倦怠"
            }, {
              name: "职业迷茫",
              value: "职业迷茫"
            }, {
              name: "职场人际关系",
              value: "职场人际关系"
            }, {
              name: "工作家庭冲突",
              value: "工作家庭冲突"
            }]
          }, {
            name: "亲子教育",
            value: 7,
            submenu: [{
              name: "全部",
              value: "全部"
            }, {
              name: "亲子沟通",
              value: "亲子沟通"
            }, {
              name: "青春期",
              value: "青春期"
            }, {
              name: "中高考",
              value: "中高考"
            }, {
              name: "厌学",
              value: "厌学"
            }, {
              name: "青少年抑郁",
              value: "青少年抑郁"
            }, {
              name: "青少年焦虑",
              value: "青少年焦虑"
            }]
          }, {
            name: "身心健康",
            value: 8,
            submenu: [{
              name: "全部",
              value: "全部"
            }, {
              name: "心理性疼痛",
              value: "心理性疼痛"
            }, {
              name: "强迫",
              value: "强迫"
            }, {
              name: "失眠多梦",
              value: "失眠多梦"
            }, {
              name: "成瘾",
              value: "成瘾"
            }, {
              name: "进食障碍",
              value: "进食障碍"
            }, {
              name: "创伤",
              value: "创伤"
            }, {
              name: "依恋",
              value: "依恋"
            }, {
              name: "拖延",
              value: "拖延"
            }]
          }, {
            name: "性心理",
            value: 9,
            submenu: [{
              name: "全部",
              value: "全部"
            }, {
              name: "LGBTQ友善咨询",
              value: "LGBTQ友善咨询"
            }, {
              name: "性别认同",
              value: "性别认同"
            }, {
              name: "性心理障碍",
              value: "性心理障碍"
            }]
          }]
        };
      a.submenu = [{
        name: "大分类",
        hideName: !0,
        submenu: [{
          name: "全部",
          value: 0
        }].concat((0, c.default)(a.submenu.map((function (e) {
          return {
            name: e.name,
            value: e.value
          }
        }))))
      }];
      var r = [{
        name: "话题方向",
        type: "radio",
        submenu: [{
          name: "话题方向",
          hideName: !0,
          submenu: [{
            name: "全部",
            value: null
          }, {
            name: "身心健康",
            value: "身心健康"
          }, {
            name: "人际关系",
            value: "人际关系"
          }, {
            name: "婚姻恋爱",
            value: "婚姻恋爱"
          }, {
            name: "亲子教育",
            value: "亲子教育"
          }, {
            name: "个人成长",
            value: "个人成长"
          }, {
            name: "情绪困扰",
            value: "情绪困扰"
          }, {
            name: "学业职场",
            value: "学业职场"
          }, {
            name: "家庭困扰",
            value: "家庭困扰"
          }, {
            name: "性心理",
            value: "性心理"
          }]
        }]
      }, {
        name: "排序",
        type: "radio",
        submenu: [{
          name: "排序方式",
          hideName: !0,
          submenu: [{
            name: "推荐排序",
            value: 0
          }, {
            name: "低价优先",
            value: 1
          }, {
            name: "高价优先",
            value: 2
          }, {
            name: "近期可预约优先",
            value: 3
          }]
        }]
      }];
      t.default = r
    },
    d344: function (e, t) {
      e.exports = "/static/img/icon-close.png"
    },
    d3b4: function (e, t, n) {
      (function (e, o) {
        var c = n("47a9");
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.LOCALE_ZH_HANT = t.LOCALE_ZH_HANS = t.LOCALE_FR = t.LOCALE_ES = t.LOCALE_EN = t.I18n = t.Formatter = void 0, t.compileI18nJsonStr = function (e, t) {
          var n = t.locale,
            o = t.locales,
            c = t.delimiters;
          if (!k(e, c)) return e;
          x || (x = new d);
          var a = [];
          Object.keys(o).forEach((function (e) {
            e !== n && a.push({
              locale: e,
              values: o[e]
            })
          })), a.unshift({
            locale: n,
            values: o[n]
          });
          try {
            return JSON.stringify(function e(t, n, o) {
              return S(t, (function (t, c) {
                ! function (t, n, o, c) {
                  var a = t[n];
                  if (w(a)) {
                    if (k(a, c) && (t[n] = O(a, o[0].values, c), o.length > 1)) {
                      var r = t[n + "Locales"] = {};
                      o.forEach((function (e) {
                        r[e.locale] = O(a, e.values, c)
                      }))
                    }
                  } else e(a, o, c)
                }(t, c, n, o)
              })), t
            }(JSON.parse(e), a, c), null, 2)
          } catch (e) {}
          return e
        }, t.hasI18nJson = function e(t, n) {
          return x || (x = new d), S(t, (function (t, o) {
            var c = t[o];
            return w(c) ? !!k(c, n) || void 0 : e(c, n)
          }))
        }, t.initVueI18n = function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = arguments.length > 2 ? arguments[2] : void 0,
            o = arguments.length > 3 ? arguments[3] : void 0;
          if ("string" != typeof e) {
            var c = [t, e];
            e = c[0], t = c[1]
          }
          "string" != typeof e && (e = _()), "string" != typeof n && (n = "undefined" != typeof __uniConfig && __uniConfig.fallbackLocale || "en");
          var a = new N({
              locale: e,
              fallbackLocale: n,
              messages: t,
              watcher: o
            }),
            r = function (e, t) {
              if ("function" != typeof getApp) r = function (e, t) {
                return a.t(e, t)
              };
              else {
                var n = !1;
                r = function (e, t) {
                  var o = getApp().$vm;
                  return o && (o.$locale, n || (n = !0, b(o, a))), a.t(e, t)
                }
              }
              return r(e, t)
            };
          return {
            i18n: a,
            f: function (e, t, n) {
              return a.f(e, t, n)
            },
            t: function (e, t) {
              return r(e, t)
            },
            add: function (e, t) {
              var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
              return a.add(e, t, n)
            },
            watch: function (e) {
              return a.watchLocale(e)
            },
            getLocale: function () {
              return a.getLocale()
            },
            setLocale: function (e) {
              return a.setLocale(e)
            }
          }
        }, t.isI18nStr = k, t.isString = void 0, t.normalizeLocale = v, t.parseI18nJson = function e(t, n, o) {
          return x || (x = new d), S(t, (function (t, c) {
            var a = t[c];
            w(a) ? k(a, o) && (t[c] = O(a, n, o)) : e(a, n, o)
          })), t
        }, t.resolveLocale = function (e) {
          return function (t) {
            return t ? function (e) {
              for (var t = [], n = e.split("-"); n.length;) t.push(n.join("-")), n.pop();
              return t
            }(t = v(t) || t).find((function (t) {
              return e.indexOf(t) > -1
            })) : t
          }
        };
        var a = c(n("34cf")),
          r = c(n("67ad")),
          u = c(n("0bdb")),
          i = c(n("3b2d")),
          s = function (e) {
            return null !== e && "object" === (0, i.default)(e)
          },
          y = ["{", "}"],
          d = function () {
            function e() {
              (0, r.default)(this, e), this._caches = Object.create(null)
            }
            return (0, u.default)(e, [{
              key: "interpolate",
              value: function (e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : y;
                if (!t) return [e];
                var o = this._caches[e];
                return o || (o = m(e, n), this._caches[e] = o), p(o, t)
              }
            }]), e
          }();
        t.Formatter = d;
        var l = /^(?:\d)+/,
          f = /^(?:\w)+/;

        function m(e, t) {
          for (var n = (0, a.default)(t, 2), o = n[0], c = n[1], r = [], u = 0, i = ""; u < e.length;) {
            var s = e[u++];
            if (s === o) {
              i && r.push({
                type: "text",
                value: i
              }), i = "";
              var y = "";
              for (s = e[u++]; void 0 !== s && s !== c;) y += s, s = e[u++];
              var d = s === c,
                m = l.test(y) ? "list" : d && f.test(y) ? "named" : "unknown";
              r.push({
                value: y,
                type: m
              })
            } else i += s
          }
          return i && r.push({
            type: "text",
            value: i
          }), r
        }

        function p(e, t) {
          var n = [],
            o = 0,
            c = Array.isArray(t) ? "list" : s(t) ? "named" : "unknown";
          if ("unknown" === c) return n;
          for (; o < e.length;) {
            var a = e[o];
            switch (a.type) {
              case "text":
                n.push(a.value);
                break;
              case "list":
                n.push(t[parseInt(a.value, 10)]);
                break;
              case "named":
                "named" === c && n.push(t[a.value])
            }
            o++
          }
          return n
        }
        t.LOCALE_ZH_HANS = "zh-Hans", t.LOCALE_ZH_HANT = "zh-Hant", t.LOCALE_EN = "en", t.LOCALE_FR = "fr", t.LOCALE_ES = "es";
        var h = Object.prototype.hasOwnProperty,
          C = function (e, t) {
            return h.call(e, t)
          },
          g = new d;

        function v(e, t) {
          if (e) {
            if (e = e.trim().replace(/_/g, "-"), t && t[e]) return e;
            if ("chinese" === (e = e.toLowerCase())) return "zh-Hans";
            if (0 === e.indexOf("zh")) return e.indexOf("-hans") > -1 ? "zh-Hans" : e.indexOf("-hant") > -1 || function (e, t) {
              return !!["-tw", "-hk", "-mo", "-cht"].find((function (t) {
                return -1 !== e.indexOf(t)
              }))
            }(e) ? "zh-Hant" : "zh-Hans";
            var n = ["en", "fr", "es"];
            return t && Object.keys(t).length > 0 && (n = Object.keys(t)),
              function (e, t) {
                return t.find((function (t) {
                  return 0 === e.indexOf(t)
                }))
              }(e, n) || void 0
          }
        }
        var N = function () {
          function e(t) {
            var n = t.locale,
              o = t.fallbackLocale,
              c = t.messages,
              a = t.watcher,
              u = t.formater;
            (0, r.default)(this, e), this.locale = "en", this.fallbackLocale = "en", this.message = {}, this.messages = {}, this.watchers = [], o && (this.fallbackLocale = o), this.formater = u || g, this.messages = c || {}, this.setLocale(n || "en"), a && this.watchLocale(a)
          }
          return (0, u.default)(e, [{
            key: "setLocale",
            value: function (e) {
              var t = this,
                n = this.locale;
              this.locale = v(e, this.messages) || this.fallbackLocale, this.messages[this.locale] || (this.messages[this.locale] = {}), this.message = this.messages[this.locale], n !== this.locale && this.watchers.forEach((function (e) {
                e(t.locale, n)
              }))
            }
          }, {
            key: "getLocale",
            value: function () {
              return this.locale
            }
          }, {
            key: "watchLocale",
            value: function (e) {
              var t = this,
                n = this.watchers.push(e) - 1;
              return function () {
                t.watchers.splice(n, 1)
              }
            }
          }, {
            key: "add",
            value: function (e, t) {
              var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                o = this.messages[e];
              o ? n ? Object.assign(o, t) : Object.keys(t).forEach((function (e) {
                C(o, e) || (o[e] = t[e])
              })) : this.messages[e] = t
            }
          }, {
            key: "f",
            value: function (e, t, n) {
              return this.formater.interpolate(e, t, n).join("")
            }
          }, {
            key: "t",
            value: function (e, t, n) {
              var o = this.message;
              return "string" == typeof t ? (t = v(t, this.messages)) && (o = this.messages[t]) : n = t, C(o, e) ? this.formater.interpolate(o[e], n).join("") : (console.warn("Cannot translate the value of keypath ".concat(e, ". Use the value of keypath as default.")), e)
            }
          }]), e
        }();

        function b(e, t) {
          e.$watchLocale ? e.$watchLocale((function (e) {
            t.setLocale(e)
          })) : e.$watch((function () {
            return e.$locale
          }), (function (e) {
            t.setLocale(e)
          }))
        }

        function _() {
          return void 0 !== e && e.getLocale ? e.getLocale() : void 0 !== o && o.getLocale ? o.getLocale() : "en"
        }
        t.I18n = N;
        var x, w = function (e) {
          return "string" == typeof e
        };

        function k(e, t) {
          return e.indexOf(t[0]) > -1
        }

        function O(e, t, n) {
          return x.interpolate(e, t, n).join("")
        }

        function S(e, t) {
          if (Array.isArray(e)) {
            for (var n = 0; n < e.length; n++)
              if (t(e, n)) return !0
          } else if (s(e))
            for (var o in e)
              if (t(e, o)) return !0;
          return !1
        }
        t.isString = w
      }).call(this, n("df3c").default, n("0ee4"))
    },
    d53b: function (e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0, t.default = [{
        provinceCode: "110000",
        provinceName: "北京",
        city: [{
          cityCode: "110000-1",
          cityName: "北京市",
          county: [{
            countyCode: "110115",
            countyName: "大兴区"
          }, {
            countyCode: "110116",
            countyName: "怀柔区"
          }, {
            countyCode: "110105",
            countyName: "朝阳区"
          }, {
            countyCode: "110229",
            countyName: "延庆区"
          }, {
            countyCode: "110114",
            countyName: "昌平区"
          }, {
            countyCode: "110108",
            countyName: "海淀区"
          }, {
            countyCode: "110107",
            countyName: "石景山区"
          }, {
            countyCode: "110112",
            countyName: "通州区"
          }, {
            countyCode: "110228",
            countyName: "密云区"
          }, {
            countyCode: "110117",
            countyName: "平谷区"
          }, {
            countyCode: "110109",
            countyName: "门头沟区"
          }, {
            countyCode: "110113",
            countyName: "顺义区"
          }, {
            countyCode: "110106",
            countyName: "丰台区"
          }, {
            countyCode: "110111",
            countyName: "房山区"
          }, {
            countyCode: "110101",
            countyName: "东城区"
          }, {
            countyCode: "110102",
            countyName: "西城区"
          }]
        }]
      }, {
        provinceCode: "120000",
        provinceName: "天津",
        city: [{
          cityCode: "120000-1",
          cityName: "天津市",
          county: [{
            countyCode: "120103",
            countyName: "河西区"
          }, {
            countyCode: "120106",
            countyName: "红桥区"
          }, {
            countyCode: "120223",
            countyName: "静海区"
          }, {
            countyCode: "120114",
            countyName: "武清区"
          }, {
            countyCode: "120110",
            countyName: "东丽区"
          }, {
            countyCode: "120111",
            countyName: "西青区"
          }, {
            countyCode: "120225",
            countyName: "蓟州区"
          }, {
            countyCode: "120116",
            countyName: "滨海新区"
          }, {
            countyCode: "120113",
            countyName: "北辰区"
          }, {
            countyCode: "120115",
            countyName: "宝坻区"
          }, {
            countyCode: "120101",
            countyName: "和平区"
          }, {
            countyCode: "120112",
            countyName: "津南区"
          }, {
            countyCode: "120221",
            countyName: "宁河区"
          }, {
            countyCode: "120104",
            countyName: "南开区"
          }, {
            countyCode: "120105",
            countyName: "河北区"
          }, {
            countyCode: "120102",
            countyName: "河东区"
          }]
        }]
      }, {
        provinceCode: "130000",
        provinceName: "河北省",
        city: [{
          cityCode: "130400",
          cityName: "邯郸市",
          county: [{
            countyCode: "130404",
            countyName: "复兴区"
          }, {
            countyCode: "130424",
            countyName: "成安县"
          }, {
            countyCode: "130403",
            countyName: "丛台区"
          }, {
            countyCode: "130402",
            countyName: "邯山区"
          }, {
            countyCode: "130434",
            countyName: "魏县"
          }, {
            countyCode: "130429",
            countyName: "永年区"
          }, {
            countyCode: "130427",
            countyName: "磁县"
          }, {
            countyCode: "130433",
            countyName: "馆陶县"
          }, {
            countyCode: "130421",
            countyName: "邯郸县"
          }, {
            countyCode: "130435",
            countyName: "曲周县"
          }, {
            countyCode: "130425",
            countyName: "大名县"
          }, {
            countyCode: "130426",
            countyName: "涉县"
          }, {
            countyCode: "130423",
            countyName: "临漳县"
          }, {
            countyCode: "130431",
            countyName: "鸡泽县"
          }, {
            countyCode: "130406",
            countyName: "峰峰矿区"
          }, {
            countyCode: "130430",
            countyName: "邱县"
          }, {
            countyCode: "130428",
            countyName: "肥乡区"
          }, {
            countyCode: "130432",
            countyName: "广平县"
          }, {
            countyCode: "130481",
            countyName: "武安市"
          }]
        }, {
          cityCode: "131100",
          cityName: "衡水市",
          county: [{
            countyCode: "131127",
            countyName: "景县"
          }, {
            countyCode: "131102",
            countyName: "桃城区"
          }, {
            countyCode: "131128",
            countyName: "阜城县"
          }, {
            countyCode: "131125",
            countyName: "安平县"
          }, {
            countyCode: "131121",
            countyName: "枣强县"
          }, {
            countyCode: "131123",
            countyName: "武强县"
          }, {
            countyCode: "131122",
            countyName: "武邑县"
          }, {
            countyCode: "131181",
            countyName: "冀州区"
          }, {
            countyCode: "131126",
            countyName: "故城县"
          }, {
            countyCode: "131124",
            countyName: "饶阳县"
          }, {
            countyCode: "131182",
            countyName: "深州市"
          }]
        }, {
          cityCode: "130900",
          cityName: "沧州市",
          county: [{
            countyCode: "130930",
            countyName: "孟村回族自治县"
          }, {
            countyCode: "130923",
            countyName: "东光县"
          }, {
            countyCode: "130981",
            countyName: "泊头市"
          }, {
            countyCode: "130924",
            countyName: "海兴县"
          }, {
            countyCode: "130927",
            countyName: "南皮县"
          }, {
            countyCode: "130922",
            countyName: "青县"
          }, {
            countyCode: "130902",
            countyName: "新华区"
          }, {
            countyCode: "130925",
            countyName: "盐山县"
          }, {
            countyCode: "130903",
            countyName: "运河区"
          }, {
            countyCode: "130921",
            countyName: "沧县"
          }, {
            countyCode: "130984",
            countyName: "河间市"
          }, {
            countyCode: "130926",
            countyName: "肃宁县"
          }, {
            countyCode: "130982",
            countyName: "任丘市"
          }, {
            countyCode: "130983",
            countyName: "黄骅市"
          }, {
            countyCode: "130928",
            countyName: "吴桥县"
          }, {
            countyCode: "130929",
            countyName: "献县"
          }]
        }, {
          cityCode: "130200",
          cityName: "唐山市",
          county: [{
            countyCode: "130207",
            countyName: "丰南区"
          }, {
            countyCode: "130204",
            countyName: "古冶区"
          }, {
            countyCode: "130224",
            countyName: "滦南县"
          }, {
            countyCode: "130209",
            countyName: "曹妃甸区"
          }, {
            countyCode: "130202",
            countyName: "路南区"
          }, {
            countyCode: "130208",
            countyName: "丰润区"
          }, {
            countyCode: "130203",
            countyName: "路北区"
          }, {
            countyCode: "130281",
            countyName: "遵化市"
          }, {
            countyCode: "130205",
            countyName: "开平区"
          }, {
            countyCode: "130283",
            countyName: "迁安市"
          }, {
            countyCode: "130227",
            countyName: "迁西县"
          }, {
            countyCode: "130229",
            countyName: "玉田县"
          }, {
            countyCode: "130225",
            countyName: "乐亭县"
          }, {
            countyCode: "130223",
            countyName: "滦州市"
          }]
        }, {
          cityCode: "130700",
          cityName: "张家口市",
          county: [{
            countyCode: "130728",
            countyName: "怀安县"
          }, {
            countyCode: "130723",
            countyName: "康保县"
          }, {
            countyCode: "130702",
            countyName: "桥东区"
          }, {
            countyCode: "130732",
            countyName: "赤城县"
          }, {
            countyCode: "130733",
            countyName: "崇礼区"
          }, {
            countyCode: "130727",
            countyName: "阳原县"
          }, {
            countyCode: "130731",
            countyName: "涿鹿县"
          }, {
            countyCode: "130705",
            countyName: "宣化区"
          }, {
            countyCode: "130722",
            countyName: "张北县"
          }, {
            countyCode: "130729",
            countyName: "万全区"
          }, {
            countyCode: "130724",
            countyName: "沽源县"
          }, {
            countyCode: "130703",
            countyName: "桥西区"
          }, {
            countyCode: "130706",
            countyName: "下花园区"
          }, {
            countyCode: "130730",
            countyName: "怀来县"
          }, {
            countyCode: "130725",
            countyName: "尚义县"
          }, {
            countyCode: "130726",
            countyName: "蔚县"
          }, {
            countyCode: "130721",
            countyName: "宣化县"
          }]
        }, {
          cityCode: "131000",
          cityName: "廊坊市",
          county: [{
            countyCode: "131002",
            countyName: "安次区"
          }, {
            countyCode: "131082",
            countyName: "三河市"
          }, {
            countyCode: "131025",
            countyName: "大城县"
          }, {
            countyCode: "131023",
            countyName: "永清县"
          }, {
            countyCode: "131028",
            countyName: "大厂回族自治县"
          }, {
            countyCode: "131022",
            countyName: "固安县"
          }, {
            countyCode: "131003",
            countyName: "广阳区"
          }, {
            countyCode: "131081",
            countyName: "霸州市"
          }, {
            countyCode: "131026",
            countyName: "文安县"
          }, {
            countyCode: "131024",
            countyName: "香河县"
          }]
        }, {
          cityCode: "130300",
          cityName: "秦皇岛市",
          county: [{
            countyCode: "130323",
            countyName: "抚宁区"
          }, {
            countyCode: "130321",
            countyName: "青龙满族自治县"
          }, {
            countyCode: "130303",
            countyName: "山海关区"
          }, {
            countyCode: "130304",
            countyName: "北戴河区"
          }, {
            countyCode: "130302",
            countyName: "海港区"
          }, {
            countyCode: "130322",
            countyName: "昌黎县"
          }, {
            countyCode: "130324",
            countyName: "卢龙县"
          }]
        }, {
          cityCode: "130500",
          cityName: "邢台市",
          county: [{
            countyCode: "130533",
            countyName: "威县"
          }, {
            countyCode: "130532",
            countyName: "平乡县"
          }, {
            countyCode: "130527",
            countyName: "南和县"
          }, {
            countyCode: "130521",
            countyName: "邢台县"
          }, {
            countyCode: "130524",
            countyName: "柏乡县"
          }, {
            countyCode: "130522",
            countyName: "临城县"
          }, {
            countyCode: "130530",
            countyName: "新河县"
          }, {
            countyCode: "130534",
            countyName: "清河县"
          }, {
            countyCode: "130582",
            countyName: "沙河市"
          }, {
            countyCode: "130531",
            countyName: "广宗县"
          }, {
            countyCode: "130525",
            countyName: "隆尧县"
          }, {
            countyCode: "130529",
            countyName: "巨鹿县"
          }, {
            countyCode: "130523",
            countyName: "内丘县"
          }, {
            countyCode: "130528",
            countyName: "宁晋县"
          }, {
            countyCode: "130526",
            countyName: "任县"
          }, {
            countyCode: "130581",
            countyName: "南宫市"
          }, {
            countyCode: "130535",
            countyName: "临西县"
          }, {
            countyCode: "130502",
            countyName: "桥东区"
          }, {
            countyCode: "130503",
            countyName: "桥西区"
          }]
        }, {
          cityCode: "130100",
          cityName: "石家庄市",
          county: [{
            countyCode: "130125",
            countyName: "行唐县"
          }, {
            countyCode: "130185",
            countyName: "鹿泉区"
          }, {
            countyCode: "130123",
            countyName: "正定县"
          }, {
            countyCode: "130107",
            countyName: "井陉矿区"
          }, {
            countyCode: "130102",
            countyName: "长安区"
          }, {
            countyCode: "130184",
            countyName: "新乐市"
          }, {
            countyCode: "130183",
            countyName: "晋州市"
          }, {
            countyCode: "130128",
            countyName: "深泽县"
          }, {
            countyCode: "130181",
            countyName: "辛集市"
          }, {
            countyCode: "130124",
            countyName: "栾城区"
          }, {
            countyCode: "130126",
            countyName: "灵寿县"
          }, {
            countyCode: "130104",
            countyName: "桥西区"
          }, {
            countyCode: "130130",
            countyName: "无极县"
          }, {
            countyCode: "130108",
            countyName: "裕华区"
          }, {
            countyCode: "130129",
            countyName: "赞皇县"
          }, {
            countyCode: "130133",
            countyName: "赵县"
          }, {
            countyCode: "130182",
            countyName: "藁城区"
          }, {
            countyCode: "130127",
            countyName: "高邑县"
          }, {
            countyCode: "130132",
            countyName: "元氏县"
          }, {
            countyCode: "130131",
            countyName: "平山县"
          }, {
            countyCode: "130121",
            countyName: "井陉县"
          }, {
            countyCode: "130105",
            countyName: "新华区"
          }]
        }, {
          cityCode: "130800",
          cityName: "承德市",
          county: [{
            countyCode: "130803",
            countyName: "双滦区"
          }, {
            countyCode: "130827",
            countyName: "宽城满族自治县"
          }, {
            countyCode: "130802",
            countyName: "双桥区"
          }, {
            countyCode: "130826",
            countyName: "丰宁满族自治县"
          }, {
            countyCode: "130821",
            countyName: "承德县"
          }, {
            countyCode: "130828",
            countyName: "围场满族蒙古族自治县"
          }, {
            countyCode: "130822",
            countyName: "兴隆县"
          }, {
            countyCode: "130825",
            countyName: "隆化县"
          }, {
            countyCode: "130823",
            countyName: "平泉市"
          }, {
            countyCode: "130804",
            countyName: "鹰手营子矿区"
          }, {
            countyCode: "130824",
            countyName: "滦平县"
          }]
        }, {
          cityCode: "130600",
          cityName: "保定市",
          county: [{
            countyCode: "130638",
            countyName: "雄县"
          }, {
            countyCode: "130625",
            countyName: "徐水区"
          }, {
            countyCode: "130682",
            countyName: "定州市"
          }, {
            countyCode: "130631",
            countyName: "望都县"
          }, {
            countyCode: "130630",
            countyName: "涞源县"
          }, {
            countyCode: "130621",
            countyName: "满城区"
          }, {
            countyCode: "130626",
            countyName: "定兴县"
          }, {
            countyCode: "130624",
            countyName: "阜平县"
          }, {
            countyCode: "130636",
            countyName: "顺平县"
          }, {
            countyCode: "130627",
            countyName: "唐县"
          }, {
            countyCode: "130623",
            countyName: "涞水县"
          }, {
            countyCode: "130629",
            countyName: "容城县"
          }, {
            countyCode: "130634",
            countyName: "曲阳县"
          }, {
            countyCode: "130637",
            countyName: "博野县"
          }, {
            countyCode: "130622",
            countyName: "清苑区"
          }, {
            countyCode: "130632",
            countyName: "安新县"
          }, {
            countyCode: "130684",
            countyName: "高碑店市"
          }, {
            countyCode: "130633",
            countyName: "易县"
          }, {
            countyCode: "130628",
            countyName: "高阳县"
          }, {
            countyCode: "130683",
            countyName: "安国市"
          }, {
            countyCode: "130604",
            countyName: "南市区"
          }, {
            countyCode: "130603",
            countyName: "北市区"
          }, {
            countyCode: "130681",
            countyName: "涿州市"
          }, {
            countyCode: "130635",
            countyName: "蠡县"
          }, {
            countyCode: "130602",
            countyName: "竞秀区"
          }, {
            countyCode: "130606",
            countyName: "莲池区"
          }]
        }]
      }, {
        provinceCode: "140000",
        provinceName: "山西省",
        city: [{
          cityCode: "141000",
          cityName: "临汾市",
          county: [{
            countyCode: "141033",
            countyName: "蒲县"
          }, {
            countyCode: "141025",
            countyName: "古县"
          }, {
            countyCode: "141034",
            countyName: "汾西县"
          }, {
            countyCode: "141027",
            countyName: "浮山县"
          }, {
            countyCode: "141021",
            countyName: "曲沃县"
          }, {
            countyCode: "141032",
            countyName: "永和县"
          }, {
            countyCode: "141082",
            countyName: "霍州市"
          }, {
            countyCode: "141028",
            countyName: "吉县"
          }, {
            countyCode: "141022",
            countyName: "翼城县"
          }, {
            countyCode: "141030",
            countyName: "大宁县"
          }, {
            countyCode: "141081",
            countyName: "侯马市"
          }, {
            countyCode: "141002",
            countyName: "尧都区"
          }, {
            countyCode: "141026",
            countyName: "安泽县"
          }, {
            countyCode: "141024",
            countyName: "洪洞县"
          }, {
            countyCode: "141023",
            countyName: "襄汾县"
          }, {
            countyCode: "141029",
            countyName: "乡宁县"
          }, {
            countyCode: "141031",
            countyName: "隰县"
          }]
        }, {
          cityCode: "140200",
          cityName: "大同市",
          county: [{
            countyCode: "140223",
            countyName: "广灵县"
          }, {
            countyCode: "140203",
            countyName: "矿区"
          }, {
            countyCode: "140212",
            countyName: "新荣区"
          }, {
            countyCode: "140224",
            countyName: "灵丘县"
          }, {
            countyCode: "140222",
            countyName: "天镇县"
          }, {
            countyCode: "140213",
            countyName: "平城区"
          }, {
            countyCode: "140227",
            countyName: "云州区"
          }, {
            countyCode: "140202",
            countyName: "城区"
          }, {
            countyCode: "140225",
            countyName: "浑源县"
          }, {
            countyCode: "140221",
            countyName: "阳高县"
          }, {
            countyCode: "140211",
            countyName: "南郊区"
          }, {
            countyCode: "140214",
            countyName: "云冈区"
          }, {
            countyCode: "140226",
            countyName: "左云县"
          }]
        }, {
          cityCode: "140700",
          cityName: "晋中市",
          county: [{
            countyCode: "140722",
            countyName: "左权县"
          }, {
            countyCode: "140721",
            countyName: "榆社县"
          }, {
            countyCode: "140728",
            countyName: "平遥县"
          }, {
            countyCode: "140723",
            countyName: "和顺县"
          }, {
            countyCode: "140726",
            countyName: "太谷县"
          }, {
            countyCode: "140781",
            countyName: "介休市"
          }, {
            countyCode: "140725",
            countyName: "寿阳县"
          }, {
            countyCode: "140727",
            countyName: "祁县"
          }, {
            countyCode: "140724",
            countyName: "昔阳县"
          }, {
            countyCode: "140702",
            countyName: "榆次区"
          }, {
            countyCode: "140729",
            countyName: "灵石县"
          }]
        }, {
          cityCode: "140500",
          cityName: "晋城市",
          county: [{
            countyCode: "140521",
            countyName: "沁水县"
          }, {
            countyCode: "140581",
            countyName: "高平市"
          }, {
            countyCode: "140524",
            countyName: "陵川县"
          }, {
            countyCode: "140522",
            countyName: "阳城县"
          }, {
            countyCode: "140525",
            countyName: "泽州县"
          }, {
            countyCode: "140502",
            countyName: "城区"
          }]
        }, {
          cityCode: "140600",
          cityName: "朔州市",
          county: [{
            countyCode: "140621",
            countyName: "山阴县"
          }, {
            countyCode: "140623",
            countyName: "右玉县"
          }, {
            countyCode: "140603",
            countyName: "平鲁区"
          }, {
            countyCode: "140602",
            countyName: "朔城区"
          }, {
            countyCode: "140622",
            countyName: "应县"
          }, {
            countyCode: "140624",
            countyName: "怀仁市"
          }]
        }, {
          cityCode: "141100",
          cityName: "吕梁市",
          county: [{
            countyCode: "141125",
            countyName: "柳林县"
          }, {
            countyCode: "141127",
            countyName: "岚县"
          }, {
            countyCode: "141122",
            countyName: "交城县"
          }, {
            countyCode: "141128",
            countyName: "方山县"
          }, {
            countyCode: "141129",
            countyName: "中阳县"
          }, {
            countyCode: "141102",
            countyName: "离石区"
          }, {
            countyCode: "141126",
            countyName: "石楼县"
          }, {
            countyCode: "141182",
            countyName: "汾阳市"
          }, {
            countyCode: "141130",
            countyName: "交口县"
          }, {
            countyCode: "141124",
            countyName: "临县"
          }, {
            countyCode: "141181",
            countyName: "孝义市"
          }, {
            countyCode: "141123",
            countyName: "兴县"
          }, {
            countyCode: "141121",
            countyName: "文水县"
          }]
        }, {
          cityCode: "140900",
          cityName: "忻州市",
          county: [{
            countyCode: "140902",
            countyName: "忻府区"
          }, {
            countyCode: "140922",
            countyName: "五台县"
          }, {
            countyCode: "140981",
            countyName: "原平市"
          }, {
            countyCode: "140932",
            countyName: "偏关县"
          }, {
            countyCode: "140927",
            countyName: "神池县"
          }, {
            countyCode: "140925",
            countyName: "宁武县"
          }, {
            countyCode: "140924",
            countyName: "繁峙县"
          }, {
            countyCode: "140931",
            countyName: "保德县"
          }, {
            countyCode: "140926",
            countyName: "静乐县"
          }, {
            countyCode: "140930",
            countyName: "河曲县"
          }, {
            countyCode: "140921",
            countyName: "定襄县"
          }, {
            countyCode: "140923",
            countyName: "代县"
          }, {
            countyCode: "140928",
            countyName: "五寨县"
          }, {
            countyCode: "140929",
            countyName: "岢岚县"
          }]
        }, {
          cityCode: "140100",
          cityName: "太原市",
          county: [{
            countyCode: "140107",
            countyName: "杏花岭区"
          }, {
            countyCode: "140109",
            countyName: "万柏林区"
          }, {
            countyCode: "140105",
            countyName: "小店区"
          }, {
            countyCode: "140181",
            countyName: "古交市"
          }, {
            countyCode: "140110",
            countyName: "晋源区"
          }, {
            countyCode: "140122",
            countyName: "阳曲县"
          }, {
            countyCode: "140108",
            countyName: "尖草坪区"
          }, {
            countyCode: "140121",
            countyName: "清徐县"
          }, {
            countyCode: "140123",
            countyName: "娄烦县"
          }, {
            countyCode: "140106",
            countyName: "迎泽区"
          }]
        }, {
          cityCode: "140300",
          cityName: "阳泉市",
          county: [{
            countyCode: "140302",
            countyName: "城区"
          }, {
            countyCode: "140321",
            countyName: "平定县"
          }, {
            countyCode: "140311",
            countyName: "郊区"
          }, {
            countyCode: "140303",
            countyName: "矿区"
          }, {
            countyCode: "140322",
            countyName: "盂县"
          }]
        }, {
          cityCode: "140800",
          cityName: "运城市",
          county: [{
            countyCode: "140802",
            countyName: "盐湖区"
          }, {
            countyCode: "140829",
            countyName: "平陆县"
          }, {
            countyCode: "140828",
            countyName: "夏县"
          }, {
            countyCode: "140825",
            countyName: "新绛县"
          }, {
            countyCode: "140830",
            countyName: "芮城县"
          }, {
            countyCode: "140823",
            countyName: "闻喜县"
          }, {
            countyCode: "140826",
            countyName: "绛县"
          }, {
            countyCode: "140822",
            countyName: "万荣县"
          }, {
            countyCode: "140821",
            countyName: "临猗县"
          }, {
            countyCode: "140827",
            countyName: "垣曲县"
          }, {
            countyCode: "140824",
            countyName: "稷山县"
          }, {
            countyCode: "140881",
            countyName: "永济市"
          }, {
            countyCode: "140882",
            countyName: "河津市"
          }]
        }, {
          cityCode: "140400",
          cityName: "长治市",
          county: [{
            countyCode: "140428",
            countyName: "长子县"
          }, {
            countyCode: "140430",
            countyName: "沁县"
          }, {
            countyCode: "140426",
            countyName: "黎城县"
          }, {
            countyCode: "140481",
            countyName: "潞城市"
          }, {
            countyCode: "140403",
            countyName: "潞州区"
          }, {
            countyCode: "140402",
            countyName: "城区"
          }, {
            countyCode: "140427",
            countyName: "壶关县"
          }, {
            countyCode: "140429",
            countyName: "武乡县"
          }, {
            countyCode: "140425",
            countyName: "平顺县"
          }, {
            countyCode: "140421",
            countyName: "长治县"
          }, {
            countyCode: "140424",
            countyName: "屯留县"
          }, {
            countyCode: "140431",
            countyName: "沁源县"
          }, {
            countyCode: "140411",
            countyName: "郊区"
          }, {
            countyCode: "140423",
            countyName: "襄垣县"
          }]
        }]
      }, {
        provinceCode: "150000",
        provinceName: "内蒙古自治区",
        city: [{
          cityCode: "150100",
          cityName: "呼和浩特市",
          county: [{
            countyCode: "150125",
            countyName: "武川县"
          }, {
            countyCode: "150124",
            countyName: "清水河县"
          }, {
            countyCode: "150105",
            countyName: "赛罕区"
          }, {
            countyCode: "150122",
            countyName: "托克托县"
          }, {
            countyCode: "150121",
            countyName: "土默特左旗"
          }, {
            countyCode: "150102",
            countyName: "新城区"
          }, {
            countyCode: "150104",
            countyName: "玉泉区"
          }, {
            countyCode: "150123",
            countyName: "和林格尔县"
          }, {
            countyCode: "150103",
            countyName: "回民区"
          }]
        }, {
          cityCode: "150300",
          cityName: "乌海市",
          county: [{
            countyCode: "150303",
            countyName: "海南区"
          }, {
            countyCode: "150302",
            countyName: "海勃湾区"
          }, {
            countyCode: "150304",
            countyName: "乌达区"
          }]
        }, {
          cityCode: "150500",
          cityName: "通辽市",
          county: [{
            countyCode: "150502",
            countyName: "科尔沁区"
          }, {
            countyCode: "150526",
            countyName: "扎鲁特旗"
          }, {
            countyCode: "150522",
            countyName: "科尔沁左翼后旗"
          }, {
            countyCode: "150523",
            countyName: "开鲁县"
          }, {
            countyCode: "150524",
            countyName: "库伦旗"
          }, {
            countyCode: "150525",
            countyName: "奈曼旗"
          }, {
            countyCode: "150521",
            countyName: "科尔沁左翼中旗"
          }, {
            countyCode: "150581",
            countyName: "霍林郭勒市"
          }]
        }, {
          cityCode: "150400",
          cityName: "赤峰市",
          county: [{
            countyCode: "150422",
            countyName: "巴林左旗"
          }, {
            countyCode: "150429",
            countyName: "宁城县"
          }, {
            countyCode: "150421",
            countyName: "阿鲁科尔沁旗"
          }, {
            countyCode: "150423",
            countyName: "巴林右旗"
          }, {
            countyCode: "150425",
            countyName: "克什克腾旗"
          }, {
            countyCode: "150426",
            countyName: "翁牛特旗"
          }, {
            countyCode: "150402",
            countyName: "红山区"
          }, {
            countyCode: "150430",
            countyName: "敖汉旗"
          }, {
            countyCode: "150428",
            countyName: "喀喇沁旗"
          }, {
            countyCode: "150404",
            countyName: "松山区"
          }, {
            countyCode: "150424",
            countyName: "林西县"
          }, {
            countyCode: "150403",
            countyName: "元宝山区"
          }]
        }, {
          cityCode: "150200",
          cityName: "包头市",
          county: [{
            countyCode: "150203",
            countyName: "昆都仑区"
          }, {
            countyCode: "150204",
            countyName: "青山区"
          }, {
            countyCode: "150205",
            countyName: "石拐区"
          }, {
            countyCode: "150221",
            countyName: "土默特右旗"
          }, {
            countyCode: "150222",
            countyName: "固阳县"
          }, {
            countyCode: "150223",
            countyName: "达尔罕茂明安联合旗"
          }, {
            countyCode: "150206",
            countyName: "白云鄂博矿区"
          }, {
            countyCode: "150202",
            countyName: "东河区"
          }, {
            countyCode: "150207",
            countyName: "九原区"
          }]
        }, {
          cityCode: "150700",
          cityName: "呼伦贝尔市",
          county: [{
            countyCode: "150721",
            countyName: "阿荣旗"
          }, {
            countyCode: "150723",
            countyName: "鄂伦春自治旗"
          }, {
            countyCode: "150785",
            countyName: "根河市"
          }, {
            countyCode: "150782",
            countyName: "牙克石市"
          }, {
            countyCode: "150783",
            countyName: "扎兰屯市"
          }, {
            countyCode: "150724",
            countyName: "鄂温克族自治旗"
          }, {
            countyCode: "150784",
            countyName: "额尔古纳市"
          }, {
            countyCode: "150727",
            countyName: "新巴尔虎右旗"
          }, {
            countyCode: "150726",
            countyName: "新巴尔虎左旗"
          }, {
            countyCode: "150702",
            countyName: "海拉尔区"
          }, {
            countyCode: "150703",
            countyName: "扎赉诺尔区"
          }, {
            countyCode: "150781",
            countyName: "满洲里市"
          }, {
            countyCode: "150725",
            countyName: "陈巴尔虎旗"
          }, {
            countyCode: "150722",
            countyName: "莫力达瓦达斡尔族自治旗"
          }]
        }, {
          cityCode: "152500",
          cityName: "锡林郭勒盟",
          county: [{
            countyCode: "152529",
            countyName: "正镶白旗"
          }, {
            countyCode: "152501",
            countyName: "二连浩特市"
          }, {
            countyCode: "152525",
            countyName: "东乌珠穆沁旗"
          }, {
            countyCode: "152524",
            countyName: "苏尼特右旗"
          }, {
            countyCode: "152523",
            countyName: "苏尼特左旗"
          }, {
            countyCode: "152526",
            countyName: "西乌珠穆沁旗"
          }, {
            countyCode: "152531",
            countyName: "多伦县"
          }, {
            countyCode: "152528",
            countyName: "镶黄旗"
          }, {
            countyCode: "152530",
            countyName: "正蓝旗"
          }, {
            countyCode: "152522",
            countyName: "阿巴嘎旗"
          }, {
            countyCode: "152502",
            countyName: "锡林浩特市"
          }, {
            countyCode: "152527",
            countyName: "太仆寺旗"
          }]
        }, {
          cityCode: "152200",
          cityName: "兴安盟",
          county: [{
            countyCode: "152221",
            countyName: "科尔沁右翼前旗"
          }, {
            countyCode: "152223",
            countyName: "扎赉特旗"
          }, {
            countyCode: "152201",
            countyName: "乌兰浩特市"
          }, {
            countyCode: "152224",
            countyName: "突泉县"
          }, {
            countyCode: "152222",
            countyName: "科尔沁右翼中旗"
          }, {
            countyCode: "152202",
            countyName: "阿尔山市"
          }]
        }, {
          cityCode: "150900",
          cityName: "乌兰察布市",
          county: [{
            countyCode: "150902",
            countyName: "集宁区"
          }, {
            countyCode: "150921",
            countyName: "卓资县"
          }, {
            countyCode: "150922",
            countyName: "化德县"
          }, {
            countyCode: "150923",
            countyName: "商都县"
          }, {
            countyCode: "150928",
            countyName: "察哈尔右翼后旗"
          }, {
            countyCode: "150926",
            countyName: "察哈尔右翼前旗"
          }, {
            countyCode: "150927",
            countyName: "察哈尔右翼中旗"
          }, {
            countyCode: "150929",
            countyName: "四子王旗"
          }, {
            countyCode: "150981",
            countyName: "丰镇市"
          }, {
            countyCode: "150925",
            countyName: "凉城县"
          }, {
            countyCode: "150924",
            countyName: "兴和县"
          }]
        }, {
          cityCode: "150600",
          cityName: "鄂尔多斯市",
          county: [{
            countyCode: "150624",
            countyName: "鄂托克旗"
          }, {
            countyCode: "150621",
            countyName: "达拉特旗"
          }, {
            countyCode: "150626",
            countyName: "乌审旗"
          }, {
            countyCode: "150602",
            countyName: "东胜区"
          }, {
            countyCode: "150603",
            countyName: "康巴什区"
          }, {
            countyCode: "150623",
            countyName: "鄂托克前旗"
          }, {
            countyCode: "150622",
            countyName: "准格尔旗"
          }, {
            countyCode: "150625",
            countyName: "杭锦旗"
          }, {
            countyCode: "150627",
            countyName: "伊金霍洛旗"
          }]
        }, {
          cityCode: "152900",
          cityName: "阿拉善盟",
          county: [{
            countyCode: "152923",
            countyName: "额济纳旗"
          }, {
            countyCode: "152921",
            countyName: "阿拉善左旗"
          }, {
            countyCode: "152922",
            countyName: "阿拉善右旗"
          }]
        }, {
          cityCode: "150800",
          cityName: "巴彦淖尔市",
          county: [{
            countyCode: "150802",
            countyName: "临河区"
          }, {
            countyCode: "150823",
            countyName: "乌拉特前旗"
          }, {
            countyCode: "150821",
            countyName: "五原县"
          }, {
            countyCode: "150826",
            countyName: "杭锦后旗"
          }, {
            countyCode: "150825",
            countyName: "乌拉特后旗"
          }, {
            countyCode: "150824",
            countyName: "乌拉特中旗"
          }, {
            countyCode: "150822",
            countyName: "磴口县"
          }]
        }]
      }, {
        provinceCode: "210000",
        provinceName: "辽宁省",
        city: [{
          cityCode: "211200",
          cityName: "铁岭市",
          county: [{
            countyCode: "211281",
            countyName: "调兵山市"
          }, {
            countyCode: "211221",
            countyName: "铁岭县"
          }, {
            countyCode: "211224",
            countyName: "昌图县"
          }, {
            countyCode: "211223",
            countyName: "西丰县"
          }, {
            countyCode: "211282",
            countyName: "开原市"
          }, {
            countyCode: "211202",
            countyName: "银州区"
          }, {
            countyCode: "211204",
            countyName: "清河区"
          }]
        }, {
          cityCode: "210500",
          cityName: "本溪市",
          county: [{
            countyCode: "210522",
            countyName: "桓仁满族自治县"
          }, {
            countyCode: "210502",
            countyName: "平山区"
          }, {
            countyCode: "210503",
            countyName: "溪湖区"
          }, {
            countyCode: "210505",
            countyName: "南芬区"
          }, {
            countyCode: "210504",
            countyName: "明山区"
          }, {
            countyCode: "210521",
            countyName: "本溪满族自治县"
          }]
        }, {
          cityCode: "211400",
          cityName: "葫芦岛市",
          county: [{
            countyCode: "211421",
            countyName: "绥中县"
          }, {
            countyCode: "211481",
            countyName: "兴城市"
          }, {
            countyCode: "211403",
            countyName: "龙港区"
          }, {
            countyCode: "211404",
            countyName: "南票区"
          }, {
            countyCode: "211422",
            countyName: "建昌县"
          }, {
            countyCode: "211402",
            countyName: "连山区"
          }]
        }, {
          cityCode: "210100",
          cityName: "沈阳市",
          county: [{
            countyCode: "210122",
            countyName: "辽中区"
          }, {
            countyCode: "210104",
            countyName: "大东区"
          }, {
            countyCode: "210105",
            countyName: "皇姑区"
          }, {
            countyCode: "210123",
            countyName: "康平县"
          }, {
            countyCode: "210124",
            countyName: "法库县"
          }, {
            countyCode: "210181",
            countyName: "新民市"
          }, {
            countyCode: "210103",
            countyName: "沈河区"
          }, {
            countyCode: "210111",
            countyName: "苏家屯区"
          }, {
            countyCode: "210106",
            countyName: "铁西区"
          }, {
            countyCode: "210102",
            countyName: "和平区"
          }, {
            countyCode: "210113",
            countyName: "沈北新区"
          }, {
            countyCode: "210114",
            countyName: "于洪区"
          }, {
            countyCode: "210112",
            countyName: "浑南区"
          }]
        }, {
          cityCode: "210900",
          cityName: "阜新市",
          county: [{
            countyCode: "210905",
            countyName: "清河门区"
          }, {
            countyCode: "210911",
            countyName: "细河区"
          }, {
            countyCode: "210921",
            countyName: "阜新蒙古族自治县"
          }, {
            countyCode: "210902",
            countyName: "海州区"
          }, {
            countyCode: "210903",
            countyName: "新邱区"
          }, {
            countyCode: "210922",
            countyName: "彰武县"
          }, {
            countyCode: "210904",
            countyName: "太平区"
          }]
        }, {
          cityCode: "210800",
          cityName: "营口市",
          county: [{
            countyCode: "210802",
            countyName: "站前区"
          }, {
            countyCode: "210804",
            countyName: "鲅鱼圈区"
          }, {
            countyCode: "210811",
            countyName: "老边区"
          }, {
            countyCode: "210882",
            countyName: "大石桥市"
          }, {
            countyCode: "210881",
            countyName: "盖州市"
          }, {
            countyCode: "210803",
            countyName: "西市区"
          }]
        }, {
          cityCode: "210300",
          cityName: "鞍山市",
          county: [{
            countyCode: "210304",
            countyName: "立山区"
          }, {
            countyCode: "210381",
            countyName: "海城市"
          }, {
            countyCode: "210321",
            countyName: "台安县"
          }, {
            countyCode: "210311",
            countyName: "千山区"
          }, {
            countyCode: "210302",
            countyName: "铁东区"
          }, {
            countyCode: "210303",
            countyName: "铁西区"
          }, {
            countyCode: "210323",
            countyName: "岫岩满族自治县"
          }]
        }, {
          cityCode: "210700",
          cityName: "锦州市",
          county: [{
            countyCode: "210727",
            countyName: "义县"
          }, {
            countyCode: "210781",
            countyName: "凌海市"
          }, {
            countyCode: "210711",
            countyName: "太和区"
          }, {
            countyCode: "210726",
            countyName: "黑山县"
          }, {
            countyCode: "210782",
            countyName: "北镇市"
          }, {
            countyCode: "210702",
            countyName: "古塔区"
          }, {
            countyCode: "210703",
            countyName: "凌河区"
          }]
        }, {
          cityCode: "210400",
          cityName: "抚顺市",
          county: [{
            countyCode: "210403",
            countyName: "东洲区"
          }, {
            countyCode: "210411",
            countyName: "顺城区"
          }, {
            countyCode: "210404",
            countyName: "望花区"
          }, {
            countyCode: "210402",
            countyName: "新抚区"
          }, {
            countyCode: "210421",
            countyName: "抚顺县"
          }, {
            countyCode: "210423",
            countyName: "清原满族自治县"
          }, {
            countyCode: "210422",
            countyName: "新宾满族自治县"
          }]
        }, {
          cityCode: "210200",
          cityName: "大连市",
          county: [{
            countyCode: "210213",
            countyName: "金州区"
          }, {
            countyCode: "210202",
            countyName: "中山区"
          }, {
            countyCode: "210282",
            countyName: "普兰店区"
          }, {
            countyCode: "210204",
            countyName: "沙河口区"
          }, {
            countyCode: "210203",
            countyName: "西岗区"
          }, {
            countyCode: "210281",
            countyName: "瓦房店市"
          }, {
            countyCode: "210211",
            countyName: "甘井子区"
          }, {
            countyCode: "210212",
            countyName: "旅顺口区"
          }, {
            countyCode: "210224",
            countyName: "长海县"
          }, {
            countyCode: "210283",
            countyName: "庄河市"
          }]
        }, {
          cityCode: "211000",
          cityName: "辽阳市",
          county: [{
            countyCode: "211003",
            countyName: "文圣区"
          }, {
            countyCode: "211081",
            countyName: "灯塔市"
          }, {
            countyCode: "211011",
            countyName: "太子河区"
          }, {
            countyCode: "211005",
            countyName: "弓长岭区"
          }, {
            countyCode: "211004",
            countyName: "宏伟区"
          }, {
            countyCode: "211021",
            countyName: "辽阳县"
          }, {
            countyCode: "211002",
            countyName: "白塔区"
          }]
        }, {
          cityCode: "210600",
          cityName: "丹东市",
          county: [{
            countyCode: "210603",
            countyName: "振兴区"
          }, {
            countyCode: "210681",
            countyName: "东港市"
          }, {
            countyCode: "210624",
            countyName: "宽甸满族自治县"
          }, {
            countyCode: "210682",
            countyName: "凤城市"
          }, {
            countyCode: "210604",
            countyName: "振安区"
          }, {
            countyCode: "210602",
            countyName: "元宝区"
          }]
        }, {
          cityCode: "211300",
          cityName: "朝阳市",
          county: [{
            countyCode: "211382",
            countyName: "凌源市"
          }, {
            countyCode: "211322",
            countyName: "建平县"
          }, {
            countyCode: "211381",
            countyName: "北票市"
          }, {
            countyCode: "211303",
            countyName: "龙城区"
          }, {
            countyCode: "211302",
            countyName: "双塔区"
          }, {
            countyCode: "211324",
            countyName: "喀喇沁左翼蒙古族自治县"
          }, {
            countyCode: "211321",
            countyName: "朝阳县"
          }]
        }, {
          cityCode: "211100",
          cityName: "盘锦市",
          county: [{
            countyCode: "211122",
            countyName: "盘山县"
          }, {
            countyCode: "211103",
            countyName: "兴隆台区"
          }, {
            countyCode: "211102",
            countyName: "双台子区"
          }, {
            countyCode: "211121",
            countyName: "大洼区"
          }]
        }]
      }, {
        provinceCode: "220000",
        provinceName: "吉林省",
        city: [{
          cityCode: "220600",
          cityName: "白山市",
          county: [{
            countyCode: "220621",
            countyName: "抚松县"
          }, {
            countyCode: "220602",
            countyName: "浑江区"
          }, {
            countyCode: "220622",
            countyName: "靖宇县"
          }, {
            countyCode: "220605",
            countyName: "江源区"
          }, {
            countyCode: "220681",
            countyName: "临江市"
          }, {
            countyCode: "220623",
            countyName: "长白朝鲜族自治县"
          }]
        }, {
          cityCode: "220500",
          cityName: "通化市",
          county: [{
            countyCode: "220523",
            countyName: "辉南县"
          }, {
            countyCode: "220521",
            countyName: "通化县"
          }, {
            countyCode: "220581",
            countyName: "梅河口市"
          }, {
            countyCode: "220502",
            countyName: "东昌区"
          }, {
            countyCode: "220524",
            countyName: "柳河县"
          }, {
            countyCode: "220503",
            countyName: "二道江区"
          }, {
            countyCode: "220582",
            countyName: "集安市"
          }]
        }, {
          cityCode: "220700",
          cityName: "松原市",
          county: [{
            countyCode: "220722",
            countyName: "长岭县"
          }, {
            countyCode: "220702",
            countyName: "宁江区"
          }, {
            countyCode: "220724",
            countyName: "扶余市"
          }, {
            countyCode: "220721",
            countyName: "前郭尔罗斯蒙古族自治县"
          }, {
            countyCode: "220723",
            countyName: "乾安县"
          }]
        }, {
          cityCode: "220800",
          cityName: "白城市",
          county: [{
            countyCode: "220802",
            countyName: "洮北区"
          }, {
            countyCode: "220821",
            countyName: "镇赉县"
          }, {
            countyCode: "220822",
            countyName: "通榆县"
          }, {
            countyCode: "220881",
            countyName: "洮南市"
          }, {
            countyCode: "220882",
            countyName: "大安市"
          }]
        }, {
          cityCode: "220100",
          cityName: "长春市",
          county: [{
            countyCode: "220105",
            countyName: "二道区"
          }, {
            countyCode: "220182",
            countyName: "榆树市"
          }, {
            countyCode: "220106",
            countyName: "绿园区"
          }, {
            countyCode: "220181",
            countyName: "九台区"
          }, {
            countyCode: "220122",
            countyName: "农安县"
          }, {
            countyCode: "220103",
            countyName: "宽城区"
          }, {
            countyCode: "220102",
            countyName: "南关区"
          }, {
            countyCode: "220104",
            countyName: "朝阳区"
          }, {
            countyCode: "220183",
            countyName: "德惠市"
          }, {
            countyCode: "220112",
            countyName: "双阳区"
          }]
        }, {
          cityCode: "222400",
          cityName: "延边朝鲜族自治州",
          county: [{
            countyCode: "222424",
            countyName: "汪清县"
          }, {
            countyCode: "222401",
            countyName: "延吉市"
          }, {
            countyCode: "222404",
            countyName: "珲春市"
          }, {
            countyCode: "222405",
            countyName: "龙井市"
          }, {
            countyCode: "222402",
            countyName: "图们市"
          }, {
            countyCode: "222426",
            countyName: "安图县"
          }, {
            countyCode: "222406",
            countyName: "和龙市"
          }, {
            countyCode: "222403",
            countyName: "敦化市"
          }]
        }, {
          cityCode: "220400",
          cityName: "辽源市",
          county: [{
            countyCode: "220422",
            countyName: "东辽县"
          }, {
            countyCode: "220402",
            countyName: "龙山区"
          }, {
            countyCode: "220421",
            countyName: "东丰县"
          }, {
            countyCode: "220403",
            countyName: "西安区"
          }]
        }, {
          cityCode: "220300",
          cityName: "四平市",
          county: [{
            countyCode: "220381",
            countyName: "公主岭市"
          }, {
            countyCode: "220323",
            countyName: "伊通满族自治县"
          }, {
            countyCode: "220322",
            countyName: "梨树县"
          }, {
            countyCode: "220382",
            countyName: "双辽市"
          }, {
            countyCode: "220302",
            countyName: "铁西区"
          }, {
            countyCode: "220303",
            countyName: "铁东区"
          }]
        }, {
          cityCode: "220200",
          cityName: "吉林市",
          county: [{
            countyCode: "220204",
            countyName: "船营区"
          }, {
            countyCode: "220283",
            countyName: "舒兰市"
          }, {
            countyCode: "220282",
            countyName: "桦甸市"
          }, {
            countyCode: "220202",
            countyName: "昌邑区"
          }, {
            countyCode: "220281",
            countyName: "蛟河市"
          }, {
            countyCode: "220284",
            countyName: "磐石市"
          }, {
            countyCode: "220211",
            countyName: "丰满区"
          }, {
            countyCode: "220203",
            countyName: "龙潭区"
          }, {
            countyCode: "220221",
            countyName: "永吉县"
          }]
        }]
      }, {
        provinceCode: "230000",
        provinceName: "黑龙江省",
        city: [{
          cityCode: "230400",
          cityName: "鹤岗市",
          county: [{
            countyCode: "230406",
            countyName: "东山区"
          }, {
            countyCode: "230407",
            countyName: "兴山区"
          }, {
            countyCode: "230422",
            countyName: "绥滨县"
          }, {
            countyCode: "230403",
            countyName: "工农区"
          }, {
            countyCode: "230404",
            countyName: "南山区"
          }, {
            countyCode: "230421",
            countyName: "萝北县"
          }, {
            countyCode: "230402",
            countyName: "向阳区"
          }, {
            countyCode: "230405",
            countyName: "兴安区"
          }]
        }, {
          cityCode: "230700",
          cityName: "伊春市",
          county: [{
            countyCode: "230708",
            countyName: "美溪区"
          }, {
            countyCode: "230705",
            countyName: "西林区"
          }, {
            countyCode: "230722",
            countyName: "嘉荫县"
          }, {
            countyCode: "230709",
            countyName: "金山屯区"
          }, {
            countyCode: "230711",
            countyName: "乌马河区"
          }, {
            countyCode: "230707",
            countyName: "新青区"
          }, {
            countyCode: "230702",
            countyName: "伊春区"
          }, {
            countyCode: "230704",
            countyName: "友好区"
          }, {
            countyCode: "230703",
            countyName: "南岔区"
          }, {
            countyCode: "230710",
            countyName: "五营区"
          }, {
            countyCode: "230716",
            countyName: "上甘岭区"
          }, {
            countyCode: "230712",
            countyName: "汤旺河区"
          }, {
            countyCode: "230781",
            countyName: "铁力市"
          }, {
            countyCode: "230714",
            countyName: "乌伊岭区"
          }, {
            countyCode: "230715",
            countyName: "红星区"
          }, {
            countyCode: "230706",
            countyName: "翠峦区"
          }, {
            countyCode: "230713",
            countyName: "带岭区"
          }]
        }, {
          cityCode: "230800",
          cityName: "佳木斯市",
          county: [{
            countyCode: "230881",
            countyName: "同江市"
          }, {
            countyCode: "230805",
            countyName: "东风区"
          }, {
            countyCode: "230811",
            countyName: "郊区"
          }, {
            countyCode: "230882",
            countyName: "富锦市"
          }, {
            countyCode: "230828",
            countyName: "汤原县"
          }, {
            countyCode: "230833",
            countyName: "抚远市"
          }, {
            countyCode: "230804",
            countyName: "前进区"
          }, {
            countyCode: "230803",
            countyName: "向阳区"
          }, {
            countyCode: "230826",
            countyName: "桦川县"
          }, {
            countyCode: "230822",
            countyName: "桦南县"
          }]
        }, {
          cityCode: "230200",
          cityName: "齐齐哈尔市",
          county: [{
            countyCode: "230207",
            countyName: "碾子山区"
          }, {
            countyCode: "230203",
            countyName: "建华区"
          }, {
            countyCode: "230204",
            countyName: "铁锋区"
          }, {
            countyCode: "230208",
            countyName: "梅里斯达斡尔族区"
          }, {
            countyCode: "230230",
            countyName: "克东县"
          }, {
            countyCode: "230227",
            countyName: "富裕县"
          }, {
            countyCode: "230205",
            countyName: "昂昂溪区"
          }, {
            countyCode: "230221",
            countyName: "龙江县"
          }, {
            countyCode: "230206",
            countyName: "富拉尔基区"
          }, {
            countyCode: "230223",
            countyName: "依安县"
          }, {
            countyCode: "230225",
            countyName: "甘南县"
          }, {
            countyCode: "230229",
            countyName: "克山县"
          }, {
            countyCode: "230281",
            countyName: "讷河市"
          }, {
            countyCode: "230202",
            countyName: "龙沙区"
          }, {
            countyCode: "230231",
            countyName: "拜泉县"
          }, {
            countyCode: "230224",
            countyName: "泰来县"
          }]
        }, {
          cityCode: "230500",
          cityName: "双鸭山市",
          county: [{
            countyCode: "230524",
            countyName: "饶河县"
          }, {
            countyCode: "230506",
            countyName: "宝山区"
          }, {
            countyCode: "230503",
            countyName: "岭东区"
          }, {
            countyCode: "230505",
            countyName: "四方台区"
          }, {
            countyCode: "230523",
            countyName: "宝清县"
          }, {
            countyCode: "230521",
            countyName: "集贤县"
          }, {
            countyCode: "230522",
            countyName: "友谊县"
          }, {
            countyCode: "230502",
            countyName: "尖山区"
          }]
        }, {
          cityCode: "230100",
          cityName: "哈尔滨市",
          county: [{
            countyCode: "230109",
            countyName: "松北区"
          }, {
            countyCode: "230127",
            countyName: "木兰县"
          }, {
            countyCode: "230124",
            countyName: "方正县"
          }, {
            countyCode: "230103",
            countyName: "南岗区"
          }, {
            countyCode: "230183",
            countyName: "尚志市"
          }, {
            countyCode: "230129",
            countyName: "延寿县"
          }, {
            countyCode: "230126",
            countyName: "巴彦县"
          }, {
            countyCode: "230125",
            countyName: "宾县"
          }, {
            countyCode: "230102",
            countyName: "道里区"
          }, {
            countyCode: "230111",
            countyName: "呼兰区"
          }, {
            countyCode: "230112",
            countyName: "阿城区"
          }, {
            countyCode: "230110",
            countyName: "香坊区"
          }, {
            countyCode: "230108",
            countyName: "平房区"
          }, {
            countyCode: "230182",
            countyName: "双城区"
          }, {
            countyCode: "230123",
            countyName: "依兰县"
          }, {
            countyCode: "230184",
            countyName: "五常市"
          }, {
            countyCode: "230104",
            countyName: "道外区"
          }, {
            countyCode: "230128",
            countyName: "通河县"
          }]
        }, {
          cityCode: "231000",
          cityName: "牡丹江市",
          county: [{
            countyCode: "231003",
            countyName: "阳明区"
          }, {
            countyCode: "231005",
            countyName: "西安区"
          }, {
            countyCode: "231025",
            countyName: "林口县"
          }, {
            countyCode: "231024",
            countyName: "东宁市"
          }, {
            countyCode: "231004",
            countyName: "爱民区"
          }, {
            countyCode: "231084",
            countyName: "宁安市"
          }, {
            countyCode: "231083",
            countyName: "海林市"
          }, {
            countyCode: "231002",
            countyName: "东安区"
          }, {
            countyCode: "231085",
            countyName: "穆棱市"
          }, {
            countyCode: "231081",
            countyName: "绥芬河市"
          }]
        }, {
          cityCode: "230900",
          cityName: "七台河市",
          county: [{
            countyCode: "230904",
            countyName: "茄子河区"
          }, {
            countyCode: "230921",
            countyName: "勃利县"
          }, {
            countyCode: "230902",
            countyName: "新兴区"
          }, {
            countyCode: "230903",
            countyName: "桃山区"
          }]
        }, {
          cityCode: "231100",
          cityName: "黑河市",
          county: [{
            countyCode: "231102",
            countyName: "爱辉区"
          }, {
            countyCode: "231182",
            countyName: "五大连池市"
          }, {
            countyCode: "231181",
            countyName: "北安市"
          }, {
            countyCode: "231124",
            countyName: "孙吴县"
          }, {
            countyCode: "231123",
            countyName: "逊克县"
          }, {
            countyCode: "231121",
            countyName: "嫩江县"
          }]
        }, {
          cityCode: "230600",
          cityName: "大庆市",
          county: [{
            countyCode: "230605",
            countyName: "红岗区"
          }, {
            countyCode: "230606",
            countyName: "大同区"
          }, {
            countyCode: "230623",
            countyName: "林甸县"
          }, {
            countyCode: "230622",
            countyName: "肇源县"
          }, {
            countyCode: "230621",
            countyName: "肇州县"
          }, {
            countyCode: "230624",
            countyName: "杜尔伯特蒙古族自治县"
          }, {
            countyCode: "230603",
            countyName: "龙凤区"
          }, {
            countyCode: "230602",
            countyName: "萨尔图区"
          }, {
            countyCode: "230604",
            countyName: "让胡路区"
          }]
        }, {
          cityCode: "232700",
          cityName: "大兴安岭地区",
          county: [{
            countyCode: "232703",
            countyName: "新林区"
          }, {
            countyCode: "232702",
            countyName: "松岭区"
          }, {
            countyCode: "232701",
            countyName: "加格达奇区"
          }, {
            countyCode: "232722",
            countyName: "塔河县"
          }, {
            countyCode: "232721",
            countyName: "呼玛县"
          }, {
            countyCode: "232704",
            countyName: "呼中区"
          }, {
            countyCode: "232723",
            countyName: "漠河市"
          }]
        }, {
          cityCode: "231200",
          cityName: "绥化市",
          county: [{
            countyCode: "231281",
            countyName: "安达市"
          }, {
            countyCode: "231224",
            countyName: "庆安县"
          }, {
            countyCode: "231282",
            countyName: "肇东市"
          }, {
            countyCode: "231283",
            countyName: "海伦市"
          }, {
            countyCode: "231225",
            countyName: "明水县"
          }, {
            countyCode: "231222",
            countyName: "兰西县"
          }, {
            countyCode: "231223",
            countyName: "青冈县"
          }, {
            countyCode: "231226",
            countyName: "绥棱县"
          }, {
            countyCode: "231221",
            countyName: "望奎县"
          }, {
            countyCode: "231202",
            countyName: "北林区"
          }]
        }, {
          cityCode: "230300",
          cityName: "鸡西市",
          county: [{
            countyCode: "230303",
            countyName: "恒山区"
          }, {
            countyCode: "230302",
            countyName: "鸡冠区"
          }, {
            countyCode: "230305",
            countyName: "梨树区"
          }, {
            countyCode: "230321",
            countyName: "鸡东县"
          }, {
            countyCode: "230304",
            countyName: "滴道区"
          }, {
            countyCode: "230381",
            countyName: "虎林市"
          }, {
            countyCode: "230307",
            countyName: "麻山区"
          }, {
            countyCode: "230306",
            countyName: "城子河区"
          }, {
            countyCode: "230382",
            countyName: "密山市"
          }]
        }]
      }, {
        provinceCode: "310000",
        provinceName: "上海",
        city: [{
          cityCode: "310000-1",
          cityName: "上海市",
          county: [{
            countyCode: "310115",
            countyName: "浦东新区"
          }, {
            countyCode: "310110",
            countyName: "杨浦区"
          }, {
            countyCode: "310230",
            countyName: "崇明区"
          }, {
            countyCode: "310113",
            countyName: "宝山区"
          }, {
            countyCode: "310114",
            countyName: "嘉定区"
          }, {
            countyCode: "310109",
            countyName: "虹口区"
          }, {
            countyCode: "310101",
            countyName: "黄浦区"
          }, {
            countyCode: "310120",
            countyName: "奉贤区"
          }, {
            countyCode: "310118",
            countyName: "青浦区"
          }, {
            countyCode: "310112",
            countyName: "闵行区"
          }, {
            countyCode: "310105",
            countyName: "长宁区"
          }, {
            countyCode: "310104",
            countyName: "徐汇区"
          }, {
            countyCode: "310117",
            countyName: "松江区"
          }, {
            countyCode: "310106",
            countyName: "静安区"
          }, {
            countyCode: "310107",
            countyName: "普陀区"
          }, {
            countyCode: "310116",
            countyName: "金山区"
          }]
        }]
      }, {
        provinceCode: "340000",
        provinceName: "安徽省",
        city: [{
          cityCode: "341000",
          cityName: "黄山市",
          county: [{
            countyCode: "341022",
            countyName: "休宁县"
          }, {
            countyCode: "341024",
            countyName: "祁门县"
          }, {
            countyCode: "341021",
            countyName: "歙县"
          }, {
            countyCode: "341003",
            countyName: "黄山区"
          }, {
            countyCode: "341023",
            countyName: "黟县"
          }, {
            countyCode: "341004",
            countyName: "徽州区"
          }, {
            countyCode: "341002",
            countyName: "屯溪区"
          }]
        }, {
          cityCode: "340200",
          cityName: "芜湖市",
          county: [{
            countyCode: "340208",
            countyName: "三山区"
          }, {
            countyCode: "340222",
            countyName: "繁昌县"
          }, {
            countyCode: "340207",
            countyName: "鸠江区"
          }, {
            countyCode: "340221",
            countyName: "芜湖县"
          }, {
            countyCode: "340202",
            countyName: "镜湖区"
          }, {
            countyCode: "340203",
            countyName: "弋江区"
          }, {
            countyCode: "340225",
            countyName: "无为县"
          }, {
            countyCode: "340223",
            countyName: "南陵县"
          }]
        }, {
          cityCode: "340800",
          cityName: "安庆市",
          county: [{
            countyCode: "340826",
            countyName: "宿松县"
          }, {
            countyCode: "340824",
            countyName: "潜山市"
          }, {
            countyCode: "340881",
            countyName: "桐城市"
          }, {
            countyCode: "340828",
            countyName: "岳西县"
          }, {
            countyCode: "340825",
            countyName: "太湖县"
          }, {
            countyCode: "340811",
            countyName: "宜秀区"
          }, {
            countyCode: "340803",
            countyName: "大观区"
          }, {
            countyCode: "340827",
            countyName: "望江县"
          }, {
            countyCode: "340802",
            countyName: "迎江区"
          }, {
            countyCode: "340822",
            countyName: "怀宁县"
          }]
        }, {
          cityCode: "341100",
          cityName: "滁州市",
          county: [{
            countyCode: "341103",
            countyName: "南谯区"
          }, {
            countyCode: "341102",
            countyName: "琅琊区"
          }, {
            countyCode: "341181",
            countyName: "天长市"
          }, {
            countyCode: "341125",
            countyName: "定远县"
          }, {
            countyCode: "341124",
            countyName: "全椒县"
          }, {
            countyCode: "341122",
            countyName: "来安县"
          }, {
            countyCode: "341182",
            countyName: "明光市"
          }, {
            countyCode: "341126",
            countyName: "凤阳县"
          }]
        }, {
          cityCode: "340600",
          cityName: "淮北市",
          county: [{
            countyCode: "340621",
            countyName: "濉溪县"
          }, {
            countyCode: "340603",
            countyName: "相山区"
          }, {
            countyCode: "340602",
            countyName: "杜集区"
          }, {
            countyCode: "340604",
            countyName: "烈山区"
          }]
        }, {
          cityCode: "340700",
          cityName: "铜陵市",
          county: [{
            countyCode: "340711",
            countyName: "郊区"
          }, {
            countyCode: "340702",
            countyName: "铜官山区"
          }, {
            countyCode: "340823",
            countyName: "枞阳县"
          }, {
            countyCode: "340703",
            countyName: "铜官区"
          }, {
            countyCode: "340721",
            countyName: "义安区"
          }]
        }, {
          cityCode: "340300",
          cityName: "蚌埠市",
          county: [{
            countyCode: "340303",
            countyName: "蚌山区"
          }, {
            countyCode: "340323",
            countyName: "固镇县"
          }, {
            countyCode: "340322",
            countyName: "五河县"
          }, {
            countyCode: "340304",
            countyName: "禹会区"
          }, {
            countyCode: "340311",
            countyName: "淮上区"
          }, {
            countyCode: "340302",
            countyName: "龙子湖区"
          }, {
            countyCode: "340321",
            countyName: "怀远县"
          }]
        }, {
          cityCode: "340400",
          cityName: "淮南市",
          county: [{
            countyCode: "340421",
            countyName: "凤台县"
          }, {
            countyCode: "341521",
            countyName: "寿县"
          }, {
            countyCode: "340403",
            countyName: "田家庵区"
          }, {
            countyCode: "340404",
            countyName: "谢家集区"
          }, {
            countyCode: "340406",
            countyName: "潘集区"
          }, {
            countyCode: "340405",
            countyName: "八公山区"
          }, {
            countyCode: "340402",
            countyName: "大通区"
          }]
        }, {
          cityCode: "341300",
          cityName: "宿州市",
          county: [{
            countyCode: "341321",
            countyName: "砀山县"
          }, {
            countyCode: "341322",
            countyName: "萧县"
          }, {
            countyCode: "341324",
            countyName: "泗县"
          }, {
            countyCode: "341323",
            countyName: "灵璧县"
          }, {
            countyCode: "341302",
            countyName: "埇桥区"
          }]
        }, {
          cityCode: "341700",
          cityName: "池州市",
          county: [{
            countyCode: "341723",
            countyName: "青阳县"
          }, {
            countyCode: "341722",
            countyName: "石台县"
          }, {
            countyCode: "341721",
            countyName: "东至县"
          }, {
            countyCode: "341702",
            countyName: "贵池区"
          }]
        }, {
          cityCode: "340500",
          cityName: "马鞍山市",
          county: [{
            countyCode: "340522",
            countyName: "含山县"
          }, {
            countyCode: "340503",
            countyName: "花山区"
          }, {
            countyCode: "340506",
            countyName: "博望区"
          }, {
            countyCode: "340523",
            countyName: "和县"
          }, {
            countyCode: "340521",
            countyName: "当涂县"
          }, {
            countyCode: "340504",
            countyName: "雨山区"
          }]
        }, {
          cityCode: "341200",
          cityName: "阜阳市",
          county: [{
            countyCode: "341222",
            countyName: "太和县"
          }, {
            countyCode: "341226",
            countyName: "颍上县"
          }, {
            countyCode: "341221",
            countyName: "临泉县"
          }, {
            countyCode: "341204",
            countyName: "颍泉区"
          }, {
            countyCode: "341225",
            countyName: "阜南县"
          }, {
            countyCode: "341282",
            countyName: "界首市"
          }, {
            countyCode: "341203",
            countyName: "颍东区"
          }, {
            countyCode: "341202",
            countyName: "颍州区"
          }]
        }, {
          cityCode: "341600",
          cityName: "亳州市",
          county: [{
            countyCode: "341621",
            countyName: "涡阳县"
          }, {
            countyCode: "341623",
            countyName: "利辛县"
          }, {
            countyCode: "341602",
            countyName: "谯城区"
          }, {
            countyCode: "341622",
            countyName: "蒙城县"
          }]
        }, {
          cityCode: "341800",
          cityName: "宣城市",
          county: [{
            countyCode: "341881",
            countyName: "宁国市"
          }, {
            countyCode: "341822",
            countyName: "广德县"
          }, {
            countyCode: "341821",
            countyName: "郎溪县"
          }, {
            countyCode: "341823",
            countyName: "泾县"
          }, {
            countyCode: "341825",
            countyName: "旌德县"
          }, {
            countyCode: "341802",
            countyName: "宣州区"
          }, {
            countyCode: "341824",
            countyName: "绩溪县"
          }]
        }, {
          cityCode: "340100",
          cityName: "合肥市",
          county: [{
            countyCode: "340181",
            countyName: "巢湖市"
          }, {
            countyCode: "340104",
            countyName: "蜀山区"
          }, {
            countyCode: "340122",
            countyName: "肥东县"
          }, {
            countyCode: "340111",
            countyName: "包河区"
          }, {
            countyCode: "340102",
            countyName: "瑶海区"
          }, {
            countyCode: "340123",
            countyName: "肥西县"
          }, {
            countyCode: "340124",
            countyName: "庐江县"
          }, {
            countyCode: "340121",
            countyName: "长丰县"
          }, {
            countyCode: "340103",
            countyName: "庐阳区"
          }]
        }, {
          cityCode: "341500",
          cityName: "六安市",
          county: [{
            countyCode: "341525",
            countyName: "霍山县"
          }, {
            countyCode: "341502",
            countyName: "金安区"
          }, {
            countyCode: "341503",
            countyName: "裕安区"
          }, {
            countyCode: "341522",
            countyName: "霍邱县"
          }, {
            countyCode: "341504",
            countyName: "叶集区"
          }, {
            countyCode: "341523",
            countyName: "舒城县"
          }, {
            countyCode: "341524",
            countyName: "金寨县"
          }]
        }]
      }, {
        provinceCode: "350000",
        provinceName: "福建省",
        city: [{
          cityCode: "350200",
          cityName: "厦门市",
          county: [{
            countyCode: "350206",
            countyName: "湖里区"
          }, {
            countyCode: "350212",
            countyName: "同安区"
          }, {
            countyCode: "350203",
            countyName: "思明区"
          }, {
            countyCode: "350213",
            countyName: "翔安区"
          }, {
            countyCode: "350205",
            countyName: "海沧区"
          }, {
            countyCode: "350211",
            countyName: "集美区"
          }]
        }, {
          cityCode: "350800",
          cityName: "龙岩市",
          county: [{
            countyCode: "350881",
            countyName: "漳平市"
          }, {
            countyCode: "350825",
            countyName: "连城县"
          }, {
            countyCode: "350821",
            countyName: "长汀县"
          }, {
            countyCode: "350802",
            countyName: "新罗区"
          }, {
            countyCode: "350823",
            countyName: "上杭县"
          }, {
            countyCode: "350822",
            countyName: "永定区"
          }, {
            countyCode: "350824",
            countyName: "武平县"
          }]
        }, {
          cityCode: "350100",
          cityName: "福州市",
          county: [{
            countyCode: "350124",
            countyName: "闽清县"
          }, {
            countyCode: "350103",
            countyName: "台江区"
          }, {
            countyCode: "350121",
            countyName: "闽侯县"
          }, {
            countyCode: "350182",
            countyName: "长乐区"
          }, {
            countyCode: "350125",
            countyName: "永泰县"
          }, {
            countyCode: "350111",
            countyName: "晋安区"
          }, {
            countyCode: "350123",
            countyName: "罗源县"
          }, {
            countyCode: "350102",
            countyName: "鼓楼区"
          }, {
            countyCode: "350105",
            countyName: "马尾区"
          }, {
            countyCode: "350104",
            countyName: "仓山区"
          }, {
            countyCode: "350128",
            countyName: "平潭县"
          }, {
            countyCode: "350181",
            countyName: "福清市"
          }, {
            countyCode: "350122",
            countyName: "连江县"
          }]
        }, {
          cityCode: "350700",
          cityName: "南平市",
          county: [{
            countyCode: "350724",
            countyName: "松溪县"
          }, {
            countyCode: "350783",
            countyName: "建瓯市"
          }, {
            countyCode: "350725",
            countyName: "政和县"
          }, {
            countyCode: "350723",
            countyName: "光泽县"
          }, {
            countyCode: "350721",
            countyName: "顺昌县"
          }, {
            countyCode: "350781",
            countyName: "邵武市"
          }, {
            countyCode: "350782",
            countyName: "武夷山市"
          }, {
            countyCode: "350722",
            countyName: "浦城县"
          }, {
            countyCode: "350784",
            countyName: "建阳区"
          }, {
            countyCode: "350702",
            countyName: "延平区"
          }]
        }, {
          cityCode: "350900",
          cityName: "宁德市",
          county: [{
            countyCode: "350922",
            countyName: "古田县"
          }, {
            countyCode: "350924",
            countyName: "寿宁县"
          }, {
            countyCode: "350902",
            countyName: "蕉城区"
          }, {
            countyCode: "350926",
            countyName: "柘荣县"
          }, {
            countyCode: "350925",
            countyName: "周宁县"
          }, {
            countyCode: "350982",
            countyName: "福鼎市"
          }, {
            countyCode: "350923",
            countyName: "屏南县"
          }, {
            countyCode: "350981",
            countyName: "福安市"
          }, {
            countyCode: "350921",
            countyName: "霞浦县"
          }]
        }, {
          cityCode: "350500",
          cityName: "泉州市",
          county: [{
            countyCode: "350526",
            countyName: "德化县"
          }, {
            countyCode: "350582",
            countyName: "晋江市"
          }, {
            countyCode: "350583",
            countyName: "南安市"
          }, {
            countyCode: "350503",
            countyName: "丰泽区"
          }, {
            countyCode: "350581",
            countyName: "石狮市"
          }, {
            countyCode: "350525",
            countyName: "永春县"
          }, {
            countyCode: "350521",
            countyName: "惠安县"
          }, {
            countyCode: "350524",
            countyName: "安溪县"
          }, {
            countyCode: "350502",
            countyName: "鲤城区"
          }, {
            countyCode: "350505",
            countyName: "泉港区"
          }, {
            countyCode: "350527",
            countyName: "金门县"
          }, {
            countyCode: "350504",
            countyName: "洛江区"
          }]
        }, {
          cityCode: "350400",
          cityName: "三明市",
          county: [{
            countyCode: "350421",
            countyName: "明溪县"
          }, {
            countyCode: "350403",
            countyName: "三元区"
          }, {
            countyCode: "350423",
            countyName: "清流县"
          }, {
            countyCode: "350426",
            countyName: "尤溪县"
          }, {
            countyCode: "350481",
            countyName: "永安市"
          }, {
            countyCode: "350424",
            countyName: "宁化县"
          }, {
            countyCode: "350425",
            countyName: "大田县"
          }, {
            countyCode: "350427",
            countyName: "沙县"
          }, {
            countyCode: "350430",
            countyName: "建宁县"
          }, {
            countyCode: "350428",
            countyName: "将乐县"
          }, {
            countyCode: "350402",
            countyName: "梅列区"
          }, {
            countyCode: "350429",
            countyName: "泰宁县"
          }]
        }, {
          cityCode: "350300",
          cityName: "莆田市",
          county: [{
            countyCode: "350322",
            countyName: "仙游县"
          }, {
            countyCode: "350303",
            countyName: "涵江区"
          }, {
            countyCode: "350304",
            countyName: "荔城区"
          }, {
            countyCode: "350302",
            countyName: "城厢区"
          }, {
            countyCode: "350305",
            countyName: "秀屿区"
          }]
        }, {
          cityCode: "350600",
          cityName: "漳州市",
          county: [{
            countyCode: "350629",
            countyName: "华安县"
          }, {
            countyCode: "350623",
            countyName: "漳浦县"
          }, {
            countyCode: "350602",
            countyName: "芗城区"
          }, {
            countyCode: "350625",
            countyName: "长泰县"
          }, {
            countyCode: "350603",
            countyName: "龙文区"
          }, {
            countyCode: "350622",
            countyName: "云霄县"
          }, {
            countyCode: "350628",
            countyName: "平和县"
          }, {
            countyCode: "350627",
            countyName: "南靖县"
          }, {
            countyCode: "350681",
            countyName: "龙海市"
          }, {
            countyCode: "350624",
            countyName: "诏安县"
          }, {
            countyCode: "350626",
            countyName: "东山县"
          }]
        }]
      }, {
        provinceCode: "360000",
        provinceName: "江西省",
        city: [{
          cityCode: "361000",
          cityName: "抚州市",
          county: [{
            countyCode: "361002",
            countyName: "临川区"
          }, {
            countyCode: "361023",
            countyName: "南丰县"
          }, {
            countyCode: "361026",
            countyName: "宜黄县"
          }, {
            countyCode: "361028",
            countyName: "资溪县"
          }, {
            countyCode: "361029",
            countyName: "东乡区"
          }, {
            countyCode: "361027",
            countyName: "金溪县"
          }, {
            countyCode: "361022",
            countyName: "黎川县"
          }, {
            countyCode: "361021",
            countyName: "南城县"
          }, {
            countyCode: "361025",
            countyName: "乐安县"
          }, {
            countyCode: "361024",
            countyName: "崇仁县"
          }, {
            countyCode: "361030",
            countyName: "广昌县"
          }]
        }, {
          cityCode: "360900",
          cityName: "宜春市",
          county: [{
            countyCode: "360981",
            countyName: "丰城市"
          }, {
            countyCode: "360902",
            countyName: "袁州区"
          }, {
            countyCode: "360921",
            countyName: "奉新县"
          }, {
            countyCode: "360983",
            countyName: "高安市"
          }, {
            countyCode: "360922",
            countyName: "万载县"
          }, {
            countyCode: "360926",
            countyName: "铜鼓县"
          }, {
            countyCode: "360923",
            countyName: "上高县"
          }, {
            countyCode: "360924",
            countyName: "宜丰县"
          }, {
            countyCode: "360925",
            countyName: "靖安县"
          }, {
            countyCode: "360982",
            countyName: "樟树市"
          }]
        }, {
          cityCode: "360100",
          cityName: "南昌市",
          county: [{
            countyCode: "360104",
            countyName: "青云谱区"
          }, {
            countyCode: "360105",
            countyName: "湾里区"
          }, {
            countyCode: "360124",
            countyName: "进贤县"
          }, {
            countyCode: "360102",
            countyName: "东湖区"
          }, {
            countyCode: "360123",
            countyName: "安义县"
          }, {
            countyCode: "360122",
            countyName: "新建区"
          }, {
            countyCode: "360121",
            countyName: "南昌县"
          }, {
            countyCode: "360111",
            countyName: "青山湖区"
          }, {
            countyCode: "360103",
            countyName: "西湖区"
          }]
        }, {
          cityCode: "360700",
          cityName: "赣州市",
          county: [{
            countyCode: "360725",
            countyName: "崇义县"
          }, {
            countyCode: "360727",
            countyName: "龙南县"
          }, {
            countyCode: "360728",
            countyName: "定南县"
          }, {
            countyCode: "360723",
            countyName: "大余县"
          }, {
            countyCode: "360734",
            countyName: "寻乌县"
          }, {
            countyCode: "360702",
            countyName: "章贡区"
          }, {
            countyCode: "360726",
            countyName: "安远县"
          }, {
            countyCode: "360729",
            countyName: "全南县"
          }, {
            countyCode: "360735",
            countyName: "石城县"
          }, {
            countyCode: "360782",
            countyName: "南康区"
          }, {
            countyCode: "360721",
            countyName: "赣县区"
          }, {
            countyCode: "360732",
            countyName: "兴国县"
          }, {
            countyCode: "360781",
            countyName: "瑞金市"
          }, {
            countyCode: "360724",
            countyName: "上犹县"
          }, {
            countyCode: "360730",
            countyName: "宁都县"
          }, {
            countyCode: "360733",
            countyName: "会昌县"
          }, {
            countyCode: "360722",
            countyName: "信丰县"
          }, {
            countyCode: "360731",
            countyName: "于都县"
          }]
        }, {
          cityCode: "360200",
          cityName: "景德镇市",
          county: [{
            countyCode: "360222",
            countyName: "浮梁县"
          }, {
            countyCode: "360281",
            countyName: "乐平市"
          }, {
            countyCode: "360202",
            countyName: "昌江区"
          }, {
            countyCode: "360203",
            countyName: "珠山区"
          }]
        }, {
          cityCode: "360800",
          cityName: "吉安市",
          county: [{
            countyCode: "360829",
            countyName: "安福县"
          }, {
            countyCode: "360821",
            countyName: "吉安县"
          }, {
            countyCode: "360827",
            countyName: "遂川县"
          }, {
            countyCode: "360803",
            countyName: "青原区"
          }, {
            countyCode: "360828",
            countyName: "万安县"
          }, {
            countyCode: "360826",
            countyName: "泰和县"
          }, {
            countyCode: "360823",
            countyName: "峡江县"
          }, {
            countyCode: "360822",
            countyName: "吉水县"
          }, {
            countyCode: "360802",
            countyName: "吉州区"
          }, {
            countyCode: "360824",
            countyName: "新干县"
          }, {
            countyCode: "360830",
            countyName: "永新县"
          }, {
            countyCode: "360881",
            countyName: "井冈山市"
          }, {
            countyCode: "360825",
            countyName: "永丰县"
          }]
        }, {
          cityCode: "360400",
          cityName: "九江市",
          county: [{
            countyCode: "360423",
            countyName: "武宁县"
          }, {
            countyCode: "360421",
            countyName: "柴桑区"
          }, {
            countyCode: "360429",
            countyName: "湖口县"
          }, {
            countyCode: "360427",
            countyName: "庐山市"
          }, {
            countyCode: "360426",
            countyName: "德安县"
          }, {
            countyCode: "360428",
            countyName: "都昌县"
          }, {
            countyCode: "360430",
            countyName: "彭泽县"
          }, {
            countyCode: "360403",
            countyName: "浔阳区"
          }, {
            countyCode: "360402",
            countyName: "濂溪区"
          }, {
            countyCode: "360424",
            countyName: "修水县"
          }, {
            countyCode: "360481",
            countyName: "瑞昌市"
          }, {
            countyCode: "360425",
            countyName: "永修县"
          }, {
            countyCode: "360482",
            countyName: "共青城市"
          }]
        }, {
          cityCode: "360600",
          cityName: "鹰潭市",
          county: [{
            countyCode: "360602",
            countyName: "月湖区"
          }, {
            countyCode: "360622",
            countyName: "余江区"
          }, {
            countyCode: "360681",
            countyName: "贵溪市"
          }]
        }, {
          cityCode: "360500",
          cityName: "新余市",
          county: [{
            countyCode: "360521",
            countyName: "分宜县"
          }, {
            countyCode: "360502",
            countyName: "渝水区"
          }]
        }, {
          cityCode: "361100",
          cityName: "上饶市",
          county: [{
            countyCode: "361181",
            countyName: "德兴市"
          }, {
            countyCode: "361102",
            countyName: "信州区"
          }, {
            countyCode: "361130",
            countyName: "婺源县"
          }, {
            countyCode: "361128",
            countyName: "鄱阳县"
          }, {
            countyCode: "361129",
            countyName: "万年县"
          }, {
            countyCode: "361123",
            countyName: "玉山县"
          }, {
            countyCode: "361122",
            countyName: "广丰区"
          }, {
            countyCode: "361124",
            countyName: "铅山县"
          }, {
            countyCode: "361121",
            countyName: "上饶县"
          }, {
            countyCode: "361127",
            countyName: "余干县"
          }, {
            countyCode: "361126",
            countyName: "弋阳县"
          }, {
            countyCode: "361125",
            countyName: "横峰县"
          }]
        }, {
          cityCode: "360300",
          cityName: "萍乡市",
          county: [{
            countyCode: "360322",
            countyName: "上栗县"
          }, {
            countyCode: "360313",
            countyName: "湘东区"
          }, {
            countyCode: "360302",
            countyName: "安源区"
          }, {
            countyCode: "360323",
            countyName: "芦溪县"
          }, {
            countyCode: "360321",
            countyName: "莲花县"
          }]
        }]
      }, {
        provinceCode: "370000",
        provinceName: "山东省",
        city: [{
          cityCode: "370400",
          cityName: "枣庄市",
          county: [{
            countyCode: "370402",
            countyName: "市中区"
          }, {
            countyCode: "370481",
            countyName: "滕州市"
          }, {
            countyCode: "370406",
            countyName: "山亭区"
          }, {
            countyCode: "370405",
            countyName: "台儿庄区"
          }, {
            countyCode: "370403",
            countyName: "薛城区"
          }, {
            countyCode: "370404",
            countyName: "峄城区"
          }]
        }, {
          cityCode: "371100",
          cityName: "日照市",
          county: [{
            countyCode: "371121",
            countyName: "五莲县"
          }, {
            countyCode: "371102",
            countyName: "东港区"
          }, {
            countyCode: "371122",
            countyName: "莒县"
          }, {
            countyCode: "371103",
            countyName: "岚山区"
          }]
        }, {
          cityCode: "371700",
          cityName: "菏泽市",
          county: [{
            countyCode: "371722",
            countyName: "单县"
          }, {
            countyCode: "371724",
            countyName: "巨野县"
          }, {
            countyCode: "371721",
            countyName: "曹县"
          }, {
            countyCode: "371702",
            countyName: "牡丹区"
          }, {
            countyCode: "371727",
            countyName: "定陶区"
          }, {
            countyCode: "371728",
            countyName: "东明县"
          }, {
            countyCode: "371723",
            countyName: "成武县"
          }, {
            countyCode: "371725",
            countyName: "郓城县"
          }, {
            countyCode: "371726",
            countyName: "鄄城县"
          }]
        }, {
          cityCode: "371500",
          cityName: "聊城市",
          county: [{
            countyCode: "371524",
            countyName: "东阿县"
          }, {
            countyCode: "371521",
            countyName: "阳谷县"
          }, {
            countyCode: "371526",
            countyName: "高唐县"
          }, {
            countyCode: "371502",
            countyName: "东昌府区"
          }, {
            countyCode: "371581",
            countyName: "临清市"
          }, {
            countyCode: "371522",
            countyName: "莘县"
          }, {
            countyCode: "371525",
            countyName: "冠县"
          }, {
            countyCode: "371523",
            countyName: "茌平县"
          }]
        }, {
          cityCode: "371000",
          cityName: "威海市",
          county: [{
            countyCode: "371002",
            countyName: "环翠区"
          }, {
            countyCode: "371083",
            countyName: "乳山市"
          }, {
            countyCode: "371082",
            countyName: "荣成市"
          }, {
            countyCode: "371081",
            countyName: "文登区"
          }]
        }, {
          cityCode: "370300",
          cityName: "淄博市",
          county: [{
            countyCode: "370322",
            countyName: "高青县"
          }, {
            countyCode: "370321",
            countyName: "桓台县"
          }, {
            countyCode: "370305",
            countyName: "临淄区"
          }, {
            countyCode: "370306",
            countyName: "周村区"
          }, {
            countyCode: "370323",
            countyName: "沂源县"
          }, {
            countyCode: "370304",
            countyName: "博山区"
          }, {
            countyCode: "370302",
            countyName: "淄川区"
          }, {
            countyCode: "370303",
            countyName: "张店区"
          }]
        }, {
          cityCode: "370800",
          cityName: "济宁市",
          county: [{
            countyCode: "370811",
            countyName: "任城区"
          }, {
            countyCode: "370802",
            countyName: "市中区"
          }, {
            countyCode: "370882",
            countyName: "兖州区"
          }, {
            countyCode: "370830",
            countyName: "汶上县"
          }, {
            countyCode: "370883",
            countyName: "邹城市"
          }, {
            countyCode: "370828",
            countyName: "金乡县"
          }, {
            countyCode: "370829",
            countyName: "嘉祥县"
          }, {
            countyCode: "370826",
            countyName: "微山县"
          }, {
            countyCode: "370881",
            countyName: "曲阜市"
          }, {
            countyCode: "370827",
            countyName: "鱼台县"
          }, {
            countyCode: "370831",
            countyName: "泗水县"
          }, {
            countyCode: "370832",
            countyName: "梁山县"
          }]
        }, {
          cityCode: "371200",
          cityName: "莱芜市",
          county: [{
            countyCode: "371202",
            countyName: "莱城区"
          }, {
            countyCode: "371203",
            countyName: "钢城区"
          }]
        }, {
          cityCode: "370500",
          cityName: "东营市",
          county: [{
            countyCode: "370523",
            countyName: "广饶县"
          }, {
            countyCode: "370521",
            countyName: "垦利区"
          }, {
            countyCode: "370502",
            countyName: "东营区"
          }, {
            countyCode: "370522",
            countyName: "利津县"
          }, {
            countyCode: "370503",
            countyName: "河口区"
          }]
        }, {
          cityCode: "371600",
          cityName: "滨州市",
          county: [{
            countyCode: "371625",
            countyName: "博兴县"
          }, {
            countyCode: "371622",
            countyName: "阳信县"
          }, {
            countyCode: "371621",
            countyName: "惠民县"
          }, {
            countyCode: "371626",
            countyName: "邹平市"
          }, {
            countyCode: "371602",
            countyName: "滨城区"
          }, {
            countyCode: "371623",
            countyName: "无棣县"
          }, {
            countyCode: "371624",
            countyName: "沾化区"
          }]
        }, {
          cityCode: "371300",
          cityName: "临沂市",
          county: [{
            countyCode: "371328",
            countyName: "蒙阴县"
          }, {
            countyCode: "371302",
            countyName: "兰山区"
          }, {
            countyCode: "371329",
            countyName: "临沭县"
          }, {
            countyCode: "371321",
            countyName: "沂南县"
          }, {
            countyCode: "371311",
            countyName: "罗庄区"
          }, {
            countyCode: "371325",
            countyName: "费县"
          }, {
            countyCode: "371326",
            countyName: "平邑县"
          }, {
            countyCode: "371327",
            countyName: "莒南县"
          }, {
            countyCode: "371312",
            countyName: "河东区"
          }, {
            countyCode: "371324",
            countyName: "兰陵县"
          }, {
            countyCode: "371323",
            countyName: "沂水县"
          }, {
            countyCode: "371322",
            countyName: "郯城县"
          }]
        }, {
          cityCode: "370200",
          cityName: "青岛市",
          county: [{
            countyCode: "370211",
            countyName: "黄岛区"
          }, {
            countyCode: "370203",
            countyName: "市北区"
          }, {
            countyCode: "370281",
            countyName: "胶州市"
          }, {
            countyCode: "370212",
            countyName: "崂山区"
          }, {
            countyCode: "370202",
            countyName: "市南区"
          }, {
            countyCode: "370282",
            countyName: "即墨区"
          }, {
            countyCode: "370205",
            countyName: "四方区"
          }, {
            countyCode: "370214",
            countyName: "城阳区"
          }, {
            countyCode: "370283",
            countyName: "平度市"
          }, {
            countyCode: "370213",
            countyName: "李沧区"
          }, {
            countyCode: "370285",
            countyName: "莱西市"
          }]
        }, {
          cityCode: "370100",
          cityName: "济南市",
          county: [{
            countyCode: "370124",
            countyName: "平阴县"
          }, {
            countyCode: "370103",
            countyName: "市中区"
          }, {
            countyCode: "370181",
            countyName: "章丘区"
          }, {
            countyCode: "370126",
            countyName: "商河县"
          }, {
            countyCode: "370125",
            countyName: "济阳区"
          }, {
            countyCode: "370113",
            countyName: "长清区"
          }, {
            countyCode: "370102",
            countyName: "历下区"
          }, {
            countyCode: "370112",
            countyName: "历城区"
          }, {
            countyCode: "370105",
            countyName: "天桥区"
          }, {
            countyCode: "370104",
            countyName: "槐荫区"
          }]
        }, {
          cityCode: "371400",
          cityName: "德州市",
          county: [{
            countyCode: "371481",
            countyName: "乐陵市"
          }, {
            countyCode: "371423",
            countyName: "庆云县"
          }, {
            countyCode: "371421",
            countyName: "陵城区"
          }, {
            countyCode: "371482",
            countyName: "禹城市"
          }, {
            countyCode: "371424",
            countyName: "临邑县"
          }, {
            countyCode: "371426",
            countyName: "平原县"
          }, {
            countyCode: "371425",
            countyName: "齐河县"
          }, {
            countyCode: "371427",
            countyName: "夏津县"
          }, {
            countyCode: "371422",
            countyName: "宁津县"
          }, {
            countyCode: "371428",
            countyName: "武城县"
          }, {
            countyCode: "371402",
            countyName: "德城区"
          }]
        }, {
          cityCode: "370900",
          cityName: "泰安市",
          county: [{
            countyCode: "370911",
            countyName: "岱岳区"
          }, {
            countyCode: "370923",
            countyName: "东平县"
          }, {
            countyCode: "370983",
            countyName: "肥城市"
          }, {
            countyCode: "370921",
            countyName: "宁阳县"
          }, {
            countyCode: "370982",
            countyName: "新泰市"
          }, {
            countyCode: "370902",
            countyName: "泰山区"
          }]
        }, {
          cityCode: "370600",
          cityName: "烟台市",
          county: [{
            countyCode: "370686",
            countyName: "栖霞市"
          }, {
            countyCode: "370634",
            countyName: "长岛县"
          }, {
            countyCode: "370613",
            countyName: "莱山区"
          }, {
            countyCode: "370612",
            countyName: "牟平区"
          }, {
            countyCode: "370681",
            countyName: "龙口市"
          }, {
            countyCode: "370683",
            countyName: "莱州市"
          }, {
            countyCode: "370602",
            countyName: "芝罘区"
          }, {
            countyCode: "370682",
            countyName: "莱阳市"
          }, {
            countyCode: "370685",
            countyName: "招远市"
          }, {
            countyCode: "370611",
            countyName: "福山区"
          }, {
            countyCode: "370684",
            countyName: "蓬莱市"
          }, {
            countyCode: "370687",
            countyName: "海阳市"
          }]
        }, {
          cityCode: "370700",
          cityName: "潍坊市",
          county: [{
            countyCode: "370781",
            countyName: "青州市"
          }, {
            countyCode: "370782",
            countyName: "诸城市"
          }, {
            countyCode: "370703",
            countyName: "寒亭区"
          }, {
            countyCode: "370785",
            countyName: "高密市"
          }, {
            countyCode: "370702",
            countyName: "潍城区"
          }, {
            countyCode: "370725",
            countyName: "昌乐县"
          }, {
            countyCode: "370704",
            countyName: "坊子区"
          }, {
            countyCode: "370784",
            countyName: "安丘市"
          }, {
            countyCode: "370705",
            countyName: "奎文区"
          }, {
            countyCode: "370724",
            countyName: "临朐县"
          }, {
            countyCode: "370786",
            countyName: "昌邑市"
          }, {
            countyCode: "370783",
            countyName: "寿光市"
          }]
        }]
      }, {
        provinceCode: "410000",
        provinceName: "河南省",
        city: [{
          cityCode: "411500",
          cityName: "信阳市",
          county: [{
            countyCode: "411523",
            countyName: "新县"
          }, {
            countyCode: "411525",
            countyName: "固始县"
          }, {
            countyCode: "411524",
            countyName: "商城县"
          }, {
            countyCode: "411528",
            countyName: "息县"
          }, {
            countyCode: "411502",
            countyName: "浉河区"
          }, {
            countyCode: "411521",
            countyName: "罗山县"
          }, {
            countyCode: "411522",
            countyName: "光山县"
          }, {
            countyCode: "411503",
            countyName: "平桥区"
          }, {
            countyCode: "411526",
            countyName: "潢川县"
          }, {
            countyCode: "411527",
            countyName: "淮滨县"
          }]
        }, {
          cityCode: "410300",
          cityName: "洛阳市",
          county: [{
            countyCode: "410323",
            countyName: "新安县"
          }, {
            countyCode: "410306",
            countyName: "吉利区"
          }, {
            countyCode: "410328",
            countyName: "洛宁县"
          }, {
            countyCode: "410325",
            countyName: "嵩县"
          }, {
            countyCode: "410302",
            countyName: "老城区"
          }, {
            countyCode: "410322",
            countyName: "孟津县"
          }, {
            countyCode: "410311",
            countyName: "洛龙区"
          }, {
            countyCode: "410304",
            countyName: "瀍河回族区"
          }, {
            countyCode: "410327",
            countyName: "宜阳县"
          }, {
            countyCode: "410381",
            countyName: "偃师市"
          }, {
            countyCode: "410326",
            countyName: "汝阳县"
          }, {
            countyCode: "410329",
            countyName: "伊川县"
          }, {
            countyCode: "410305",
            countyName: "涧西区"
          }, {
            countyCode: "410324",
            countyName: "栾川县"
          }, {
            countyCode: "410303",
            countyName: "西工区"
          }]
        }, {
          cityCode: "411200",
          cityName: "三门峡市",
          county: [{
            countyCode: "411222",
            countyName: "陕州区"
          }, {
            countyCode: "411281",
            countyName: "义马市"
          }, {
            countyCode: "411282",
            countyName: "灵宝市"
          }, {
            countyCode: "411221",
            countyName: "渑池县"
          }, {
            countyCode: "411202",
            countyName: "湖滨区"
          }, {
            countyCode: "411224",
            countyName: "卢氏县"
          }]
        }, {
          cityCode: "411700",
          cityName: "驻马店市",
          county: [{
            countyCode: "411729",
            countyName: "新蔡县"
          }, {
            countyCode: "411728",
            countyName: "遂平县"
          }, {
            countyCode: "411727",
            countyName: "汝南县"
          }, {
            countyCode: "411724",
            countyName: "正阳县"
          }, {
            countyCode: "411723",
            countyName: "平舆县"
          }, {
            countyCode: "411725",
            countyName: "确山县"
          }, {
            countyCode: "411722",
            countyName: "上蔡县"
          }, {
            countyCode: "411702",
            countyName: "驿城区"
          }, {
            countyCode: "411721",
            countyName: "西平县"
          }, {
            countyCode: "411726",
            countyName: "泌阳县"
          }]
        }, {
          cityCode: "410500",
          cityName: "安阳市",
          county: [{
            countyCode: "410505",
            countyName: "殷都区"
          }, {
            countyCode: "410527",
            countyName: "内黄县"
          }, {
            countyCode: "410522",
            countyName: "安阳县"
          }, {
            countyCode: "410526",
            countyName: "滑县"
          }, {
            countyCode: "410502",
            countyName: "文峰区"
          }, {
            countyCode: "410503",
            countyName: "北关区"
          }, {
            countyCode: "410506",
            countyName: "龙安区"
          }, {
            countyCode: "410523",
            countyName: "汤阴县"
          }, {
            countyCode: "410581",
            countyName: "林州市"
          }]
        }, {
          cityCode: "411300",
          cityName: "南阳市",
          county: [{
            countyCode: "411325",
            countyName: "内乡县"
          }, {
            countyCode: "411328",
            countyName: "唐河县"
          }, {
            countyCode: "411381",
            countyName: "邓州市"
          }, {
            countyCode: "411322",
            countyName: "方城县"
          }, {
            countyCode: "411330",
            countyName: "桐柏县"
          }, {
            countyCode: "411321",
            countyName: "南召县"
          }, {
            countyCode: "411323",
            countyName: "西峡县"
          }, {
            countyCode: "411327",
            countyName: "社旗县"
          }, {
            countyCode: "411302",
            countyName: "宛城区"
          }, {
            countyCode: "411303",
            countyName: "卧龙区"
          }, {
            countyCode: "411326",
            countyName: "淅川县"
          }, {
            countyCode: "411329",
            countyName: "新野县"
          }, {
            countyCode: "411324",
            countyName: "镇平县"
          }]
        }, {
          cityCode: "410700",
          cityName: "新乡市",
          county: [{
            countyCode: "410711",
            countyName: "牧野区"
          }, {
            countyCode: "410721",
            countyName: "新乡县"
          }, {
            countyCode: "410704",
            countyName: "凤泉区"
          }, {
            countyCode: "410781",
            countyName: "卫辉市"
          }, {
            countyCode: "410727",
            countyName: "封丘县"
          }, {
            countyCode: "410702",
            countyName: "红旗区"
          }, {
            countyCode: "410726",
            countyName: "延津县"
          }, {
            countyCode: "410703",
            countyName: "卫滨区"
          }, {
            countyCode: "410782",
            countyName: "辉县市"
          }, {
            countyCode: "410728",
            countyName: "长垣县"
          }, {
            countyCode: "410724",
            countyName: "获嘉县"
          }, {
            countyCode: "410725",
            countyName: "原阳县"
          }]
        }, {
          cityCode: "410200",
          cityName: "开封市",
          county: [{
            countyCode: "410205",
            countyName: "禹王台区"
          }, {
            countyCode: "410222",
            countyName: "通许县"
          }, {
            countyCode: "410225",
            countyName: "兰考县"
          }, {
            countyCode: "410223",
            countyName: "尉氏县"
          }, {
            countyCode: "410203",
            countyName: "顺河回族区"
          }, {
            countyCode: "410204",
            countyName: "鼓楼区"
          }, {
            countyCode: "410224",
            countyName: "祥符区"
          }, {
            countyCode: "410221",
            countyName: "杞县"
          }, {
            countyCode: "410211",
            countyName: "金明区"
          }, {
            countyCode: "410202",
            countyName: "龙亭区"
          }]
        }, {
          cityCode: "411400",
          cityName: "商丘市",
          county: [{
            countyCode: "411402",
            countyName: "梁园区"
          }, {
            countyCode: "411422",
            countyName: "睢县"
          }, {
            countyCode: "411423",
            countyName: "宁陵县"
          }, {
            countyCode: "411421",
            countyName: "民权县"
          }, {
            countyCode: "411424",
            countyName: "柘城县"
          }, {
            countyCode: "411425",
            countyName: "虞城县"
          }, {
            countyCode: "411426",
            countyName: "夏邑县"
          }, {
            countyCode: "411481",
            countyName: "永城市"
          }, {
            countyCode: "411403",
            countyName: "睢阳区"
          }]
        }, {
          cityCode: "411000",
          cityName: "许昌市",
          county: [{
            countyCode: "411024",
            countyName: "鄢陵县"
          }, {
            countyCode: "411082",
            countyName: "长葛市"
          }, {
            countyCode: "411002",
            countyName: "魏都区"
          }, {
            countyCode: "411081",
            countyName: "禹州市"
          }, {
            countyCode: "411025",
            countyName: "襄城县"
          }, {
            countyCode: "411023",
            countyName: "建安区"
          }]
        }, {
          cityCode: "410100",
          cityName: "郑州市",
          county: [{
            countyCode: "410185",
            countyName: "登封市"
          }, {
            countyCode: "410182",
            countyName: "荥阳市"
          }, {
            countyCode: "410104",
            countyName: "管城回族区"
          }, {
            countyCode: "410108",
            countyName: "惠济区"
          }, {
            countyCode: "410122",
            countyName: "中牟县"
          }, {
            countyCode: "410105",
            countyName: "金水区"
          }, {
            countyCode: "410183",
            countyName: "新密市"
          }, {
            countyCode: "410184",
            countyName: "新郑市"
          }, {
            countyCode: "410181",
            countyName: "巩义市"
          }, {
            countyCode: "410106",
            countyName: "上街区"
          }, {
            countyCode: "410103",
            countyName: "二七区"
          }, {
            countyCode: "410102",
            countyName: "中原区"
          }]
        }, {
          cityCode: "419001",
          cityName: "济源市",
          county: [{
            countyCode: "419001-1",
            countyName: "济源市"
          }]
        }, {
          cityCode: "410400",
          cityName: "平顶山市",
          county: [{
            countyCode: "410481",
            countyName: "舞钢市"
          }, {
            countyCode: "410421",
            countyName: "宝丰县"
          }, {
            countyCode: "410482",
            countyName: "汝州市"
          }, {
            countyCode: "410404",
            countyName: "石龙区"
          }, {
            countyCode: "410403",
            countyName: "卫东区"
          }, {
            countyCode: "410411",
            countyName: "湛河区"
          }, {
            countyCode: "410402",
            countyName: "新华区"
          }, {
            countyCode: "410423",
            countyName: "鲁山县"
          }, {
            countyCode: "410422",
            countyName: "叶县"
          }, {
            countyCode: "410425",
            countyName: "郏县"
          }]
        }, {
          cityCode: "410900",
          cityName: "濮阳市",
          county: [{
            countyCode: "410902",
            countyName: "华龙区"
          }, {
            countyCode: "410922",
            countyName: "清丰县"
          }, {
            countyCode: "410926",
            countyName: "范县"
          }, {
            countyCode: "410927",
            countyName: "台前县"
          }, {
            countyCode: "410923",
            countyName: "南乐县"
          }, {
            countyCode: "410928",
            countyName: "濮阳县"
          }]
        }, {
          cityCode: "410600",
          cityName: "鹤壁市",
          county: [{
            countyCode: "410603",
            countyName: "山城区"
          }, {
            countyCode: "410611",
            countyName: "淇滨区"
          }, {
            countyCode: "410602",
            countyName: "鹤山区"
          }, {
            countyCode: "410621",
            countyName: "浚县"
          }, {
            countyCode: "410622",
            countyName: "淇县"
          }]
        }, {
          cityCode: "411100",
          cityName: "漯河市",
          county: [{
            countyCode: "411102",
            countyName: "源汇区"
          }, {
            countyCode: "411122",
            countyName: "临颍县"
          }, {
            countyCode: "411103",
            countyName: "郾城区"
          }, {
            countyCode: "411104",
            countyName: "召陵区"
          }, {
            countyCode: "411121",
            countyName: "舞阳县"
          }]
        }, {
          cityCode: "411600",
          cityName: "周口市",
          county: [{
            countyCode: "411626",
            countyName: "淮阳县"
          }, {
            countyCode: "411681",
            countyName: "项城市"
          }, {
            countyCode: "411624",
            countyName: "沈丘县"
          }, {
            countyCode: "411622",
            countyName: "西华县"
          }, {
            countyCode: "411627",
            countyName: "太康县"
          }, {
            countyCode: "411623",
            countyName: "商水县"
          }, {
            countyCode: "411628",
            countyName: "鹿邑县"
          }, {
            countyCode: "411602",
            countyName: "川汇区"
          }, {
            countyCode: "411621",
            countyName: "扶沟县"
          }, {
            countyCode: "411625",
            countyName: "郸城县"
          }]
        }, {
          cityCode: "410800",
          cityName: "焦作市",
          county: [{
            countyCode: "410883",
            countyName: "孟州市"
          }, {
            countyCode: "410823",
            countyName: "武陟县"
          }, {
            countyCode: "410882",
            countyName: "沁阳市"
          }, {
            countyCode: "410822",
            countyName: "博爱县"
          }, {
            countyCode: "410821",
            countyName: "修武县"
          }, {
            countyCode: "410825",
            countyName: "温县"
          }, {
            countyCode: "410804",
            countyName: "马村区"
          }, {
            countyCode: "410802",
            countyName: "解放区"
          }, {
            countyCode: "410811",
            countyName: "山阳区"
          }, {
            countyCode: "410803",
            countyName: "中站区"
          }]
        }]
      }, {
        provinceCode: "420000",
        provinceName: "湖北省",
        city: [{
          cityCode: "429004",
          cityName: "仙桃市",
          county: [{
            countyCode: "429004-1",
            countyName: "仙桃市"
          }]
        }, {
          cityCode: "421200",
          cityName: "咸宁市",
          county: [{
            countyCode: "421223",
            countyName: "崇阳县"
          }, {
            countyCode: "421224",
            countyName: "通山县"
          }, {
            countyCode: "421202",
            countyName: "咸安区"
          }, {
            countyCode: "421222",
            countyName: "通城县"
          }, {
            countyCode: "421221",
            countyName: "嘉鱼县"
          }, {
            countyCode: "421281",
            countyName: "赤壁市"
          }]
        }, {
          cityCode: "421300",
          cityName: "随州市",
          county: [{
            countyCode: "421381",
            countyName: "广水市"
          }, {
            countyCode: "421303",
            countyName: "曾都区"
          }, {
            countyCode: "421321",
            countyName: "随县"
          }]
        }, {
          cityCode: "422800",
          cityName: "恩施土家族苗族自治州",
          county: [{
            countyCode: "422828",
            countyName: "鹤峰县"
          }, {
            countyCode: "422825",
            countyName: "宣恩县"
          }, {
            countyCode: "422801",
            countyName: "恩施市"
          }, {
            countyCode: "422822",
            countyName: "建始县"
          }, {
            countyCode: "422823",
            countyName: "巴东县"
          }, {
            countyCode: "422826",
            countyName: "咸丰县"
          }, {
            countyCode: "422827",
            countyName: "来凤县"
          }, {
            countyCode: "422802",
            countyName: "利川市"
          }]
        }, {
          cityCode: "420900",
          cityName: "孝感市",
          county: [{
            countyCode: "420902",
            countyName: "孝南区"
          }, {
            countyCode: "420981",
            countyName: "应城市"
          }, {
            countyCode: "420923",
            countyName: "云梦县"
          }, {
            countyCode: "420982",
            countyName: "安陆市"
          }, {
            countyCode: "420922",
            countyName: "大悟县"
          }, {
            countyCode: "420921",
            countyName: "孝昌县"
          }, {
            countyCode: "420984",
            countyName: "汉川市"
          }]
        }, {
          cityCode: "420100",
          cityName: "武汉市",
          county: [{
            countyCode: "420104",
            countyName: "硚口区"
          }, {
            countyCode: "420107",
            countyName: "青山区"
          }, {
            countyCode: "420116",
            countyName: "黄陂区"
          }, {
            countyCode: "420102",
            countyName: "江岸区"
          }, {
            countyCode: "420115",
            countyName: "江夏区"
          }, {
            countyCode: "420114",
            countyName: "蔡甸区"
          }, {
            countyCode: "420106",
            countyName: "武昌区"
          }, {
            countyCode: "420112",
            countyName: "东西湖区"
          }, {
            countyCode: "420105",
            countyName: "汉阳区"
          }, {
            countyCode: "420113",
            countyName: "汉南区"
          }, {
            countyCode: "420111",
            countyName: "洪山区"
          }, {
            countyCode: "420103",
            countyName: "江汉区"
          }, {
            countyCode: "420117",
            countyName: "新洲区"
          }]
        }, {
          cityCode: "420500",
          cityName: "宜昌市",
          county: [{
            countyCode: "420502",
            countyName: "西陵区"
          }, {
            countyCode: "420505",
            countyName: "猇亭区"
          }, {
            countyCode: "420503",
            countyName: "伍家岗区"
          }, {
            countyCode: "420581",
            countyName: "宜都市"
          }, {
            countyCode: "420504",
            countyName: "点军区"
          }, {
            countyCode: "420526",
            countyName: "兴山县"
          }, {
            countyCode: "420525",
            countyName: "远安县"
          }, {
            countyCode: "420527",
            countyName: "秭归县"
          }, {
            countyCode: "420583",
            countyName: "枝江市"
          }, {
            countyCode: "420529",
            countyName: "五峰土家族自治县"
          }, {
            countyCode: "420582",
            countyName: "当阳市"
          }, {
            countyCode: "420506",
            countyName: "夷陵区"
          }, {
            countyCode: "420528",
            countyName: "长阳土家族自治县"
          }]
        }, {
          cityCode: "420800",
          cityName: "荆门市",
          county: [{
            countyCode: "420804",
            countyName: "掇刀区"
          }, {
            countyCode: "420822",
            countyName: "沙洋县"
          }, {
            countyCode: "420802",
            countyName: "东宝区"
          }, {
            countyCode: "420881",
            countyName: "钟祥市"
          }, {
            countyCode: "420821",
            countyName: "京山市"
          }]
        }, {
          cityCode: "429006",
          cityName: "天门市",
          county: [{
            countyCode: "429006-1",
            countyName: "天门市"
          }]
        }, {
          cityCode: "421000",
          cityName: "荆州市",
          county: [{
            countyCode: "421003",
            countyName: "荆州区"
          }, {
            countyCode: "421023",
            countyName: "监利县"
          }, {
            countyCode: "421087",
            countyName: "松滋市"
          }, {
            countyCode: "421022",
            countyName: "公安县"
          }, {
            countyCode: "421002",
            countyName: "沙市区"
          }, {
            countyCode: "421024",
            countyName: "江陵县"
          }, {
            countyCode: "421081",
            countyName: "石首市"
          }, {
            countyCode: "421083",
            countyName: "洪湖市"
          }]
        }, {
          cityCode: "420600",
          cityName: "襄阳市",
          county: [{
            countyCode: "420625",
            countyName: "谷城县"
          }, {
            countyCode: "420607",
            countyName: "襄州区"
          }, {
            countyCode: "420606",
            countyName: "樊城区"
          }, {
            countyCode: "420602",
            countyName: "襄城区"
          }, {
            countyCode: "420626",
            countyName: "保康县"
          }, {
            countyCode: "420624",
            countyName: "南漳县"
          }, {
            countyCode: "420683",
            countyName: "枣阳市"
          }, {
            countyCode: "420682",
            countyName: "老河口市"
          }, {
            countyCode: "420684",
            countyName: "宜城市"
          }]
        }, {
          cityCode: "420700",
          cityName: "鄂州市",
          county: [{
            countyCode: "420702",
            countyName: "梁子湖区"
          }, {
            countyCode: "420703",
            countyName: "华容区"
          }, {
            countyCode: "420704",
            countyName: "鄂城区"
          }]
        }, {
          cityCode: "429021",
          cityName: "神农架林区",
          county: [{
            countyCode: "429021-1",
            countyName: "神农架林区"
          }]
        }, {
          cityCode: "420200",
          cityName: "黄石市",
          county: [{
            countyCode: "420202",
            countyName: "黄石港区"
          }, {
            countyCode: "420281",
            countyName: "大冶市"
          }, {
            countyCode: "420205",
            countyName: "铁山区"
          }, {
            countyCode: "420222",
            countyName: "阳新县"
          }, {
            countyCode: "420203",
            countyName: "西塞山区"
          }, {
            countyCode: "420204",
            countyName: "下陆区"
          }]
        }, {
          cityCode: "421100",
          cityName: "黄冈市",
          county: [{
            countyCode: "421181",
            countyName: "麻城市"
          }, {
            countyCode: "421125",
            countyName: "浠水县"
          }, {
            countyCode: "421121",
            countyName: "团风县"
          }, {
            countyCode: "421182",
            countyName: "武穴市"
          }, {
            countyCode: "421124",
            countyName: "英山县"
          }, {
            countyCode: "421122",
            countyName: "红安县"
          }, {
            countyCode: "421102",
            countyName: "黄州区"
          }, {
            countyCode: "421123",
            countyName: "罗田县"
          }, {
            countyCode: "421126",
            countyName: "蕲春县"
          }, {
            countyCode: "421127",
            countyName: "黄梅县"
          }]
        }, {
          cityCode: "420300",
          cityName: "十堰市",
          county: [{
            countyCode: "420322",
            countyName: "郧西县"
          }, {
            countyCode: "420321",
            countyName: "郧阳区"
          }, {
            countyCode: "420323",
            countyName: "竹山县"
          }, {
            countyCode: "420324",
            countyName: "竹溪县"
          }, {
            countyCode: "420325",
            countyName: "房县"
          }, {
            countyCode: "420302",
            countyName: "茅箭区"
          }, {
            countyCode: "420303",
            countyName: "张湾区"
          }, {
            countyCode: "420381",
            countyName: "丹江口市"
          }]
        }, {
          cityCode: "429005",
          cityName: "潜江市",
          county: [{
            countyCode: "429005-1",
            countyName: "潜江市"
          }]
        }]
      }, {
        provinceCode: "430000",
        provinceName: "湖南省",
        city: [{
          cityCode: "430300",
          cityName: "湘潭市",
          county: [{
            countyCode: "430381",
            countyName: "湘乡市"
          }, {
            countyCode: "430302",
            countyName: "雨湖区"
          }, {
            countyCode: "430382",
            countyName: "韶山市"
          }, {
            countyCode: "430321",
            countyName: "湘潭县"
          }, {
            countyCode: "430304",
            countyName: "岳塘区"
          }]
        }, {
          cityCode: "430600",
          cityName: "岳阳市",
          county: [{
            countyCode: "430623",
            countyName: "华容县"
          }, {
            countyCode: "430682",
            countyName: "临湘市"
          }, {
            countyCode: "430603",
            countyName: "云溪区"
          }, {
            countyCode: "430681",
            countyName: "汨罗市"
          }, {
            countyCode: "430624",
            countyName: "湘阴县"
          }, {
            countyCode: "430602",
            countyName: "岳阳楼区"
          }, {
            countyCode: "430626",
            countyName: "平江县"
          }, {
            countyCode: "430611",
            countyName: "君山区"
          }, {
            countyCode: "430621",
            countyName: "岳阳县"
          }]
        }, {
          cityCode: "430100",
          cityName: "长沙市",
          county: [{
            countyCode: "430111",
            countyName: "雨花区"
          }, {
            countyCode: "430103",
            countyName: "天心区"
          }, {
            countyCode: "430104",
            countyName: "岳麓区"
          }, {
            countyCode: "430181",
            countyName: "浏阳市"
          }, {
            countyCode: "430124",
            countyName: "宁乡市"
          }, {
            countyCode: "430112",
            countyName: "望城区"
          }, {
            countyCode: "430121",
            countyName: "长沙县"
          }, {
            countyCode: "430105",
            countyName: "开福区"
          }, {
            countyCode: "430102",
            countyName: "芙蓉区"
          }]
        }, {
          cityCode: "430200",
          cityName: "株洲市",
          county: [{
            countyCode: "430202",
            countyName: "荷塘区"
          }, {
            countyCode: "430225",
            countyName: "炎陵县"
          }, {
            countyCode: "430281",
            countyName: "醴陵市"
          }, {
            countyCode: "430203",
            countyName: "芦淞区"
          }, {
            countyCode: "430224",
            countyName: "茶陵县"
          }, {
            countyCode: "430211",
            countyName: "天元区"
          }, {
            countyCode: "430221",
            countyName: "株洲县"
          }, {
            countyCode: "430223",
            countyName: "攸县"
          }, {
            countyCode: "430204",
            countyName: "石峰区"
          }]
        }, {
          cityCode: "431000",
          cityName: "郴州市",
          county: [{
            countyCode: "431028",
            countyName: "安仁县"
          }, {
            countyCode: "431021",
            countyName: "桂阳县"
          }, {
            countyCode: "431002",
            countyName: "北湖区"
          }, {
            countyCode: "431027",
            countyName: "桂东县"
          }, {
            countyCode: "431024",
            countyName: "嘉禾县"
          }, {
            countyCode: "431026",
            countyName: "汝城县"
          }, {
            countyCode: "431023",
            countyName: "永兴县"
          }, {
            countyCode: "431025",
            countyName: "临武县"
          }, {
            countyCode: "431022",
            countyName: "宜章县"
          }, {
            countyCode: "431003",
            countyName: "苏仙区"
          }, {
            countyCode: "431081",
            countyName: "资兴市"
          }]
        }, {
          cityCode: "431200",
          cityName: "怀化市",
          county: [{
            countyCode: "431223",
            countyName: "辰溪县"
          }, {
            countyCode: "431202",
            countyName: "鹤城区"
          }, {
            countyCode: "431224",
            countyName: "溆浦县"
          }, {
            countyCode: "431226",
            countyName: "麻阳苗族自治县"
          }, {
            countyCode: "431229",
            countyName: "靖州苗族侗族自治县"
          }, {
            countyCode: "431230",
            countyName: "通道侗族自治县"
          }, {
            countyCode: "431281",
            countyName: "洪江市"
          }, {
            countyCode: "431228",
            countyName: "芷江侗族自治县"
          }, {
            countyCode: "431221",
            countyName: "中方县"
          }, {
            countyCode: "431225",
            countyName: "会同县"
          }, {
            countyCode: "431227",
            countyName: "新晃侗族自治县"
          }, {
            countyCode: "431222",
            countyName: "沅陵县"
          }]
        }, {
          cityCode: "431100",
          cityName: "永州市",
          county: [{
            countyCode: "431123",
            countyName: "双牌县"
          }, {
            countyCode: "431125",
            countyName: "江永县"
          }, {
            countyCode: "431102",
            countyName: "零陵区"
          }, {
            countyCode: "431129",
            countyName: "江华瑶族自治县"
          }, {
            countyCode: "431124",
            countyName: "道县"
          }, {
            countyCode: "431127",
            countyName: "蓝山县"
          }, {
            countyCode: "431103",
            countyName: "冷水滩区"
          }, {
            countyCode: "431122",
            countyName: "东安县"
          }, {
            countyCode: "431128",
            countyName: "新田县"
          }, {
            countyCode: "431121",
            countyName: "祁阳县"
          }, {
            countyCode: "431126",
            countyName: "宁远县"
          }]
        }, {
          cityCode: "430700",
          cityName: "常德市",
          county: [{
            countyCode: "430703",
            countyName: "鼎城区"
          }, {
            countyCode: "430725",
            countyName: "桃源县"
          }, {
            countyCode: "430724",
            countyName: "临澧县"
          }, {
            countyCode: "430781",
            countyName: "津市市"
          }, {
            countyCode: "430702",
            countyName: "武陵区"
          }, {
            countyCode: "430721",
            countyName: "安乡县"
          }, {
            countyCode: "430726",
            countyName: "石门县"
          }, {
            countyCode: "430722",
            countyName: "汉寿县"
          }, {
            countyCode: "430723",
            countyName: "澧县"
          }]
        }, {
          cityCode: "431300",
          cityName: "娄底市",
          county: [{
            countyCode: "431322",
            countyName: "新化县"
          }, {
            countyCode: "431302",
            countyName: "娄星区"
          }, {
            countyCode: "431321",
            countyName: "双峰县"
          }, {
            countyCode: "431381",
            countyName: "冷水江市"
          }, {
            countyCode: "431382",
            countyName: "涟源市"
          }]
        }, {
          cityCode: "430800",
          cityName: "张家界市",
          county: [{
            countyCode: "430821",
            countyName: "慈利县"
          }, {
            countyCode: "430822",
            countyName: "桑植县"
          }, {
            countyCode: "430802",
            countyName: "永定区"
          }, {
            countyCode: "430811",
            countyName: "武陵源区"
          }]
        }, {
          cityCode: "430400",
          cityName: "衡阳市",
          county: [{
            countyCode: "430423",
            countyName: "衡山县"
          }, {
            countyCode: "430408",
            countyName: "蒸湘区"
          }, {
            countyCode: "430405",
            countyName: "珠晖区"
          }, {
            countyCode: "430481",
            countyName: "耒阳市"
          }, {
            countyCode: "430422",
            countyName: "衡南县"
          }, {
            countyCode: "430426",
            countyName: "祁东县"
          }, {
            countyCode: "430407",
            countyName: "石鼓区"
          }, {
            countyCode: "430482",
            countyName: "常宁市"
          }, {
            countyCode: "430424",
            countyName: "衡东县"
          }, {
            countyCode: "430406",
            countyName: "雁峰区"
          }, {
            countyCode: "430421",
            countyName: "衡阳县"
          }, {
            countyCode: "430412",
            countyName: "南岳区"
          }]
        }, {
          cityCode: "430500",
          cityName: "邵阳市",
          county: [{
            countyCode: "430524",
            countyName: "隆回县"
          }, {
            countyCode: "430503",
            countyName: "大祥区"
          }, {
            countyCode: "430528",
            countyName: "新宁县"
          }, {
            countyCode: "430529",
            countyName: "城步苗族自治县"
          }, {
            countyCode: "430581",
            countyName: "武冈市"
          }, {
            countyCode: "430502",
            countyName: "双清区"
          }, {
            countyCode: "430523",
            countyName: "邵阳县"
          }, {
            countyCode: "430522",
            countyName: "新邵县"
          }, {
            countyCode: "430521",
            countyName: "邵东县"
          }, {
            countyCode: "430525",
            countyName: "洞口县"
          }, {
            countyCode: "430511",
            countyName: "北塔区"
          }, {
            countyCode: "430527",
            countyName: "绥宁县"
          }]
        }, {
          cityCode: "433100",
          cityName: "湘西土家族苗族自治州",
          county: [{
            countyCode: "433123",
            countyName: "凤凰县"
          }, {
            countyCode: "433126",
            countyName: "古丈县"
          }, {
            countyCode: "433125",
            countyName: "保靖县"
          }, {
            countyCode: "433124",
            countyName: "花垣县"
          }, {
            countyCode: "433127",
            countyName: "永顺县"
          }, {
            countyCode: "433122",
            countyName: "泸溪县"
          }, {
            countyCode: "433101",
            countyName: "吉首市"
          }, {
            countyCode: "433130",
            countyName: "龙山县"
          }]
        }, {
          cityCode: "430900",
          cityName: "益阳市",
          county: [{
            countyCode: "430923",
            countyName: "安化县"
          }, {
            countyCode: "430921",
            countyName: "南县"
          }, {
            countyCode: "430902",
            countyName: "资阳区"
          }, {
            countyCode: "430981",
            countyName: "沅江市"
          }, {
            countyCode: "430903",
            countyName: "赫山区"
          }, {
            countyCode: "430922",
            countyName: "桃江县"
          }]
        }]
      }, {
        provinceCode: "450000",
        provinceName: "广西壮族自治区",
        city: [{
          cityCode: "450400",
          cityName: "梧州市",
          county: [{
            countyCode: "450481",
            countyName: "岑溪市"
          }, {
            countyCode: "450423",
            countyName: "蒙山县"
          }, {
            countyCode: "450421",
            countyName: "苍梧县"
          }, {
            countyCode: "450422",
            countyName: "藤县"
          }, {
            countyCode: "450403",
            countyName: "万秀区"
          }, {
            countyCode: "450405",
            countyName: "长洲区"
          }, {
            countyCode: "450424",
            countyName: "龙圩区"
          }, {
            countyCode: "450404",
            countyName: "蝶山区"
          }]
        }, {
          cityCode: "450500",
          cityName: "北海市",
          county: [{
            countyCode: "450521",
            countyName: "合浦县"
          }, {
            countyCode: "450512",
            countyName: "铁山港区"
          }, {
            countyCode: "450502",
            countyName: "海城区"
          }, {
            countyCode: "450503",
            countyName: "银海区"
          }]
        }, {
          cityCode: "450300",
          cityName: "桂林市",
          county: [{
            countyCode: "450327",
            countyName: "灌阳县"
          }, {
            countyCode: "450305",
            countyName: "七星区"
          }, {
            countyCode: "450326",
            countyName: "永福县"
          }, {
            countyCode: "450325",
            countyName: "兴安县"
          }, {
            countyCode: "450321",
            countyName: "阳朔县"
          }, {
            countyCode: "450332",
            countyName: "恭城瑶族自治县"
          }, {
            countyCode: "450302",
            countyName: "秀峰区"
          }, {
            countyCode: "450304",
            countyName: "象山区"
          }, {
            countyCode: "450330",
            countyName: "平乐县"
          }, {
            countyCode: "450331",
            countyName: "荔浦县"
          }, {
            countyCode: "450329",
            countyName: "资源县"
          }, {
            countyCode: "450323",
            countyName: "灵川县"
          }, {
            countyCode: "450324",
            countyName: "全州县"
          }, {
            countyCode: "450322",
            countyName: "临桂区"
          }, {
            countyCode: "450303",
            countyName: "叠彩区"
          }, {
            countyCode: "450311",
            countyName: "雁山区"
          }, {
            countyCode: "450328",
            countyName: "龙胜各族自治县"
          }]
        }, {
          cityCode: "451100",
          cityName: "贺州市",
          county: [{
            countyCode: "451121",
            countyName: "昭平县"
          }, {
            countyCode: "451122",
            countyName: "钟山县"
          }, {
            countyCode: "451102",
            countyName: "八步区"
          }, {
            countyCode: "451123",
            countyName: "富川瑶族自治县"
          }, {
            countyCode: "451103",
            countyName: "平桂区"
          }]
        }, {
          cityCode: "450800",
          cityName: "贵港市",
          county: [{
            countyCode: "450804",
            countyName: "覃塘区"
          }, {
            countyCode: "450881",
            countyName: "桂平市"
          }, {
            countyCode: "450821",
            countyName: "平南县"
          }, {
            countyCode: "450803",
            countyName: "港南区"
          }, {
            countyCode: "450802",
            countyName: "港北区"
          }]
        }, {
          cityCode: "450900",
          cityName: "玉林市",
          county: [{
            countyCode: "450921",
            countyName: "容县"
          }, {
            countyCode: "450924",
            countyName: "兴业县"
          }, {
            countyCode: "450902",
            countyName: "玉州区"
          }, {
            countyCode: "450903",
            countyName: "福绵区"
          }, {
            countyCode: "450981",
            countyName: "北流市"
          }, {
            countyCode: "450923",
            countyName: "博白县"
          }, {
            countyCode: "450922",
            countyName: "陆川县"
          }]
        }, {
          cityCode: "450200",
          cityName: "柳州市",
          county: [{
            countyCode: "450225",
            countyName: "融水苗族自治县"
          }, {
            countyCode: "450202",
            countyName: "城中区"
          }, {
            countyCode: "450223",
            countyName: "鹿寨县"
          }, {
            countyCode: "450226",
            countyName: "三江侗族自治县"
          }, {
            countyCode: "450204",
            countyName: "柳南区"
          }, {
            countyCode: "450203",
            countyName: "鱼峰区"
          }, {
            countyCode: "450222",
            countyName: "柳城县"
          }, {
            countyCode: "450224",
            countyName: "融安县"
          }, {
            countyCode: "450205",
            countyName: "柳北区"
          }, {
            countyCode: "450221",
            countyName: "柳江区"
          }]
        }, {
          cityCode: "451000",
          cityName: "百色市",
          county: [{
            countyCode: "451002",
            countyName: "右江区"
          }, {
            countyCode: "451031",
            countyName: "隆林各族自治县"
          }, {
            countyCode: "451027",
            countyName: "凌云县"
          }, {
            countyCode: "451023",
            countyName: "平果县"
          }, {
            countyCode: "451026",
            countyName: "那坡县"
          }, {
            countyCode: "451030",
            countyName: "西林县"
          }, {
            countyCode: "451024",
            countyName: "德保县"
          }, {
            countyCode: "451022",
            countyName: "田东县"
          }, {
            countyCode: "451021",
            countyName: "田阳县"
          }, {
            countyCode: "451028",
            countyName: "乐业县"
          }, {
            countyCode: "451029",
            countyName: "田林县"
          }, {
            countyCode: "451025",
            countyName: "靖西市"
          }]
        }, {
          cityCode: "451300",
          cityName: "来宾市",
          county: [{
            countyCode: "451381",
            countyName: "合山市"
          }, {
            countyCode: "451322",
            countyName: "象州县"
          }, {
            countyCode: "451324",
            countyName: "金秀瑶族自治县"
          }, {
            countyCode: "451321",
            countyName: "忻城县"
          }, {
            countyCode: "451302",
            countyName: "兴宾区"
          }, {
            countyCode: "451323",
            countyName: "武宣县"
          }]
        }, {
          cityCode: "450100",
          cityName: "南宁市",
          county: [{
            countyCode: "450105",
            countyName: "江南区"
          }, {
            countyCode: "450107",
            countyName: "西乡塘区"
          }, {
            countyCode: "450109",
            countyName: "邕宁区"
          }, {
            countyCode: "450126",
            countyName: "宾阳县"
          }, {
            countyCode: "450108",
            countyName: "良庆区"
          }, {
            countyCode: "450125",
            countyName: "上林县"
          }, {
            countyCode: "450123",
            countyName: "隆安县"
          }, {
            countyCode: "450124",
            countyName: "马山县"
          }, {
            countyCode: "450122",
            countyName: "武鸣区"
          }, {
            countyCode: "450102",
            countyName: "兴宁区"
          }, {
            countyCode: "450127",
            countyName: "横县"
          }, {
            countyCode: "450103",
            countyName: "青秀区"
          }]
        }, {
          cityCode: "450700",
          cityName: "钦州市",
          county: [{
            countyCode: "450702",
            countyName: "钦南区"
          }, {
            countyCode: "450722",
            countyName: "浦北县"
          }, {
            countyCode: "450721",
            countyName: "灵山县"
          }, {
            countyCode: "450703",
            countyName: "钦北区"
          }]
        }, {
          cityCode: "450600",
          cityName: "防城港市",
          county: [{
            countyCode: "450603",
            countyName: "防城区"
          }, {
            countyCode: "450621",
            countyName: "上思县"
          }, {
            countyCode: "450602",
            countyName: "港口区"
          }, {
            countyCode: "450681",
            countyName: "东兴市"
          }]
        }, {
          cityCode: "451200",
          cityName: "河池市",
          county: [{
            countyCode: "451202",
            countyName: "金城江区"
          }, {
            countyCode: "451281",
            countyName: "宜州区"
          }, {
            countyCode: "451221",
            countyName: "南丹县"
          }, {
            countyCode: "451224",
            countyName: "东兰县"
          }, {
            countyCode: "451228",
            countyName: "都安瑶族自治县"
          }, {
            countyCode: "451229",
            countyName: "大化瑶族自治县"
          }, {
            countyCode: "451222",
            countyName: "天峨县"
          }, {
            countyCode: "451225",
            countyName: "罗城仫佬族自治县"
          }, {
            countyCode: "451227",
            countyName: "巴马瑶族自治县"
          }, {
            countyCode: "451226",
            countyName: "环江毛南族自治县"
          }, {
            countyCode: "451223",
            countyName: "凤山县"
          }]
        }, {
          cityCode: "451400",
          cityName: "崇左市",
          county: [{
            countyCode: "451423",
            countyName: "龙州县"
          }, {
            countyCode: "451425",
            countyName: "天等县"
          }, {
            countyCode: "451481",
            countyName: "凭祥市"
          }, {
            countyCode: "451422",
            countyName: "宁明县"
          }, {
            countyCode: "451402",
            countyName: "江州区"
          }, {
            countyCode: "451421",
            countyName: "扶绥县"
          }, {
            countyCode: "451424",
            countyName: "大新县"
          }]
        }]
      }, {
        provinceCode: "460000",
        provinceName: "海南省",
        city: [{
          cityCode: "469005",
          cityName: "文昌市",
          county: [{
            countyCode: "469005-1",
            countyName: "文昌市"
          }]
        }, {
          cityCode: "460300",
          cityName: "三沙市",
          county: [{
            countyCode: "460321",
            countyName: "西沙群岛"
          }, {
            countyCode: "460322",
            countyName: "南沙群岛"
          }, {
            countyCode: "469031",
            countyName: "西沙群岛"
          }, {
            countyCode: "469032",
            countyName: "南沙群岛"
          }, {
            countyCode: "460323",
            countyName: "中沙群岛的岛礁及其海域"
          }]
        }, {
          cityCode: "469027",
          cityName: "乐东黎族自治县",
          county: [{
            countyCode: "469027-1",
            countyName: "乐东黎族自治县"
          }]
        }, {
          cityCode: "460200",
          cityName: "三亚市",
          county: [{
            countyCode: "460203",
            countyName: "吉阳区"
          }, {
            countyCode: "460202",
            countyName: "海棠区"
          }, {
            countyCode: "460205",
            countyName: "崖州区"
          }, {
            countyCode: "460204",
            countyName: "天涯区"
          }]
        }, {
          cityCode: "469002",
          cityName: "琼海市",
          county: [{
            countyCode: "469002-1",
            countyName: "琼海市"
          }]
        }, {
          cityCode: "469021",
          cityName: "定安县",
          county: [{
            countyCode: "469021-1",
            countyName: "定安县"
          }]
        }, {
          cityCode: "460100",
          cityName: "海口市",
          county: [{
            countyCode: "460107",
            countyName: "琼山区"
          }, {
            countyCode: "460108",
            countyName: "美兰区"
          }, {
            countyCode: "460105",
            countyName: "秀英区"
          }, {
            countyCode: "460106",
            countyName: "龙华区"
          }]
        }, {
          cityCode: "469006",
          cityName: "万宁市",
          county: [{
            countyCode: "469006-1",
            countyName: "万宁市"
          }]
        }, {
          cityCode: "469029",
          cityName: "保亭黎族苗族自治县",
          county: [{
            countyCode: "469029-1",
            countyName: "保亭黎族苗族自治县"
          }]
        }, {
          cityCode: "469003",
          cityName: "儋州市",
          county: [{
            countyCode: "469003-1",
            countyName: "儋州市"
          }]
        }, {
          cityCode: "469023",
          cityName: "澄迈县",
          county: [{
            countyCode: "469023-1",
            countyName: "澄迈县"
          }]
        }, {
          cityCode: "469022",
          cityName: "屯昌县",
          county: [{
            countyCode: "469022-1",
            countyName: "屯昌县"
          }]
        }, {
          cityCode: "469028",
          cityName: "陵水黎族自治县",
          county: [{
            countyCode: "469028-1",
            countyName: "陵水黎族自治县"
          }]
        }, {
          cityCode: "469007",
          cityName: "东方市",
          county: [{
            countyCode: "469007-1",
            countyName: "东方市"
          }]
        }, {
          cityCode: "469001",
          cityName: "五指山市",
          county: [{
            countyCode: "469001-1",
            countyName: "五指山市"
          }]
        }, {
          cityCode: "469025",
          cityName: "白沙黎族自治县",
          county: [{
            countyCode: "469025-1",
            countyName: "白沙黎族自治县"
          }]
        }, {
          cityCode: "469026",
          cityName: "昌江黎族自治县",
          county: [{
            countyCode: "469026-1",
            countyName: "昌江黎族自治县"
          }]
        }, {
          cityCode: "469024",
          cityName: "临高县",
          county: [{
            countyCode: "469024-1",
            countyName: "临高县"
          }]
        }, {
          cityCode: "469030",
          cityName: "琼中黎族苗族自治县",
          county: [{
            countyCode: "469030-1",
            countyName: "琼中黎族苗族自治县"
          }]
        }]
      }, {
        provinceCode: "500000",
        provinceName: "重庆",
        city: [{
          cityCode: "500000-1",
          cityName: "重庆市",
          county: [{
            countyCode: "500108",
            countyName: "南岸区"
          }, {
            countyCode: "500101",
            countyName: "万州区"
          }, {
            countyCode: "500103",
            countyName: "渝中区"
          }, {
            countyCode: "500106",
            countyName: "沙坪坝区"
          }, {
            countyCode: "500102",
            countyName: "涪陵区"
          }, {
            countyCode: "500226",
            countyName: "荣昌区"
          }, {
            countyCode: "500223",
            countyName: "潼南区"
          }, {
            countyCode: "500242",
            countyName: "酉阳土家族苗族自治县"
          }, {
            countyCode: "500232",
            countyName: "武隆区"
          }, {
            countyCode: "500113",
            countyName: "巴南区"
          }, {
            countyCode: "500109",
            countyName: "北碚区"
          }, {
            countyCode: "500104",
            countyName: "大渡口区"
          }, {
            countyCode: "500117",
            countyName: "合川区"
          }, {
            countyCode: "500112",
            countyName: "渝北区"
          }, {
            countyCode: "500116",
            countyName: "江津区"
          }, {
            countyCode: "500228",
            countyName: "梁平区"
          }, {
            countyCode: "500119",
            countyName: "南川区"
          }, {
            countyCode: "500110",
            countyName: "綦江区"
          }, {
            countyCode: "500227",
            countyName: "璧山区"
          }, {
            countyCode: "500115",
            countyName: "长寿区"
          }, {
            countyCode: "500231",
            countyName: "垫江县"
          }, {
            countyCode: "500230",
            countyName: "丰都县"
          }, {
            countyCode: "500224",
            countyName: "铜梁区"
          }, {
            countyCode: "500243",
            countyName: "彭水苗族土家族自治县"
          }, {
            countyCode: "500105",
            countyName: "江北区"
          }, {
            countyCode: "500107",
            countyName: "九龙坡区"
          }, {
            countyCode: "500236",
            countyName: "奉节县"
          }, {
            countyCode: "500111",
            countyName: "大足区"
          }, {
            countyCode: "500234",
            countyName: "开州区"
          }, {
            countyCode: "500241",
            countyName: "秀山土家族苗族自治县"
          }, {
            countyCode: "500229",
            countyName: "城口县"
          }, {
            countyCode: "500238",
            countyName: "巫溪县"
          }, {
            countyCode: "500118",
            countyName: "永川区"
          }, {
            countyCode: "500233",
            countyName: "忠县"
          }, {
            countyCode: "500240",
            countyName: "石柱土家族自治县"
          }, {
            countyCode: "500114",
            countyName: "黔江区"
          }, {
            countyCode: "500237",
            countyName: "巫山县"
          }, {
            countyCode: "500235",
            countyName: "云阳县"
          }]
        }]
      }, {
        provinceCode: "510000",
        provinceName: "四川省",
        city: [{
          cityCode: "511300",
          cityName: "南充市",
          county: [{
            countyCode: "511304",
            countyName: "嘉陵区"
          }, {
            countyCode: "511323",
            countyName: "蓬安县"
          }, {
            countyCode: "511322",
            countyName: "营山县"
          }, {
            countyCode: "511381",
            countyName: "阆中市"
          }, {
            countyCode: "511303",
            countyName: "高坪区"
          }, {
            countyCode: "511324",
            countyName: "仪陇县"
          }, {
            countyCode: "511302",
            countyName: "顺庆区"
          }, {
            countyCode: "511321",
            countyName: "南部县"
          }, {
            countyCode: "511325",
            countyName: "西充县"
          }]
        }, {
          cityCode: "511800",
          cityName: "雅安市",
          county: [{
            countyCode: "511826",
            countyName: "芦山县"
          }, {
            countyCode: "511824",
            countyName: "石棉县"
          }, {
            countyCode: "511803",
            countyName: "名山区"
          }, {
            countyCode: "511827",
            countyName: "宝兴县"
          }, {
            countyCode: "511802",
            countyName: "雨城区"
          }, {
            countyCode: "511823",
            countyName: "汉源县"
          }, {
            countyCode: "511825",
            countyName: "天全县"
          }, {
            countyCode: "511822",
            countyName: "荥经县"
          }]
        }, {
          cityCode: "513400",
          cityName: "凉山彝族自治州",
          county: [{
            countyCode: "513427",
            countyName: "宁南县"
          }, {
            countyCode: "513432",
            countyName: "喜德县"
          }, {
            countyCode: "513431",
            countyName: "昭觉县"
          }, {
            countyCode: "513401",
            countyName: "西昌市"
          }, {
            countyCode: "513437",
            countyName: "雷波县"
          }, {
            countyCode: "513433",
            countyName: "冕宁县"
          }, {
            countyCode: "513434",
            countyName: "越西县"
          }, {
            countyCode: "513435",
            countyName: "甘洛县"
          }, {
            countyCode: "513429",
            countyName: "布拖县"
          }, {
            countyCode: "513430",
            countyName: "金阳县"
          }, {
            countyCode: "513436",
            countyName: "美姑县"
          }, {
            countyCode: "513428",
            countyName: "普格县"
          }, {
            countyCode: "513424",
            countyName: "德昌县"
          }, {
            countyCode: "513425",
            countyName: "会理县"
          }, {
            countyCode: "513423",
            countyName: "盐源县"
          }, {
            countyCode: "513426",
            countyName: "会东县"
          }, {
            countyCode: "513422",
            countyName: "木里藏族自治县"
          }]
        }, {
          cityCode: "511400",
          cityName: "眉山市",
          county: [{
            countyCode: "511422",
            countyName: "彭山区"
          }, {
            countyCode: "511424",
            countyName: "丹棱县"
          }, {
            countyCode: "511425",
            countyName: "青神县"
          }, {
            countyCode: "511402",
            countyName: "东坡区"
          }, {
            countyCode: "511423",
            countyName: "洪雅县"
          }, {
            countyCode: "511421",
            countyName: "仁寿县"
          }]
        }, {
          cityCode: "510300",
          cityName: "自贡市",
          county: [{
            countyCode: "510304",
            countyName: "大安区"
          }, {
            countyCode: "510302",
            countyName: "自流井区"
          }, {
            countyCode: "510321",
            countyName: "荣县"
          }, {
            countyCode: "510303",
            countyName: "贡井区"
          }, {
            countyCode: "510322",
            countyName: "富顺县"
          }, {
            countyCode: "510311",
            countyName: "沿滩区"
          }]
        }, {
          cityCode: "511900",
          cityName: "巴中市",
          county: [{
            countyCode: "511903",
            countyName: "恩阳区"
          }, {
            countyCode: "511921",
            countyName: "通江县"
          }, {
            countyCode: "511922",
            countyName: "南江县"
          }, {
            countyCode: "511902",
            countyName: "巴州区"
          }, {
            countyCode: "511923",
            countyName: "平昌县"
          }]
        }, {
          cityCode: "513300",
          cityName: "甘孜藏族自治州",
          county: [{
            countyCode: "513328",
            countyName: "甘孜县"
          }, {
            countyCode: "513324",
            countyName: "九龙县"
          }, {
            countyCode: "513332",
            countyName: "石渠县"
          }, {
            countyCode: "513337",
            countyName: "稻城县"
          }, {
            countyCode: "513326",
            countyName: "道孚县"
          }, {
            countyCode: "513330",
            countyName: "德格县"
          }, {
            countyCode: "513336",
            countyName: "乡城县"
          }, {
            countyCode: "513325",
            countyName: "雅江县"
          }, {
            countyCode: "513334",
            countyName: "理塘县"
          }, {
            countyCode: "513329",
            countyName: "新龙县"
          }, {
            countyCode: "513338",
            countyName: "得荣县"
          }, {
            countyCode: "513331",
            countyName: "白玉县"
          }, {
            countyCode: "513323",
            countyName: "丹巴县"
          }, {
            countyCode: "513327",
            countyName: "炉霍县"
          }, {
            countyCode: "513335",
            countyName: "巴塘县"
          }, {
            countyCode: "513321",
            countyName: "康定市"
          }, {
            countyCode: "513333",
            countyName: "色达县"
          }, {
            countyCode: "513322",
            countyName: "泸定县"
          }]
        }, {
          cityCode: "511700",
          cityName: "达州市",
          county: [{
            countyCode: "511722",
            countyName: "宣汉县"
          }, {
            countyCode: "511781",
            countyName: "万源市"
          }, {
            countyCode: "511724",
            countyName: "大竹县"
          }, {
            countyCode: "511723",
            countyName: "开江县"
          }, {
            countyCode: "511721",
            countyName: "达川区"
          }, {
            countyCode: "511702",
            countyName: "通川区"
          }, {
            countyCode: "511725",
            countyName: "渠县"
          }]
        }, {
          cityCode: "510500",
          cityName: "泸州市",
          county: [{
            countyCode: "510524",
            countyName: "叙永县"
          }, {
            countyCode: "510521",
            countyName: "泸县"
          }, {
            countyCode: "510502",
            countyName: "江阳区"
          }, {
            countyCode: "510504",
            countyName: "龙马潭区"
          }, {
            countyCode: "510525",
            countyName: "古蔺县"
          }, {
            countyCode: "510522",
            countyName: "合江县"
          }, {
            countyCode: "510503",
            countyName: "纳溪区"
          }]
        }, {
          cityCode: "510800",
          cityName: "广元市",
          county: [{
            countyCode: "510802",
            countyName: "利州区"
          }, {
            countyCode: "510811",
            countyName: "昭化区"
          }, {
            countyCode: "510824",
            countyName: "苍溪县"
          }, {
            countyCode: "510812",
            countyName: "朝天区"
          }, {
            countyCode: "510823",
            countyName: "剑阁县"
          }, {
            countyCode: "510821",
            countyName: "旺苍县"
          }, {
            countyCode: "510822",
            countyName: "青川县"
          }]
        }, {
          cityCode: "512000",
          cityName: "资阳市",
          county: [{
            countyCode: "512022",
            countyName: "乐至县"
          }, {
            countyCode: "512021",
            countyName: "安岳县"
          }, {
            countyCode: "512002",
            countyName: "雁江区"
          }]
        }, {
          cityCode: "510400",
          cityName: "攀枝花市",
          county: [{
            countyCode: "510411",
            countyName: "仁和区"
          }, {
            countyCode: "510422",
            countyName: "盐边县"
          }, {
            countyCode: "510403",
            countyName: "西区"
          }, {
            countyCode: "510421",
            countyName: "米易县"
          }, {
            countyCode: "510402",
            countyName: "东区"
          }]
        }, {
          cityCode: "510100",
          cityName: "成都市",
          county: [{
            countyCode: "510115",
            countyName: "温江区"
          }, {
            countyCode: "510105",
            countyName: "青羊区"
          }, {
            countyCode: "510124",
            countyName: "郫都区"
          }, {
            countyCode: "510122",
            countyName: "双流区"
          }, {
            countyCode: "510129",
            countyName: "大邑县"
          }, {
            countyCode: "510106",
            countyName: "金牛区"
          }, {
            countyCode: "510112",
            countyName: "龙泉驿区"
          }, {
            countyCode: "512081",
            countyName: "简阳市"
          }, {
            countyCode: "510181",
            countyName: "都江堰市"
          }, {
            countyCode: "510108",
            countyName: "成华区"
          }, {
            countyCode: "510132",
            countyName: "新津县"
          }, {
            countyCode: "510113",
            countyName: "青白江区"
          }, {
            countyCode: "510182",
            countyName: "彭州市"
          }, {
            countyCode: "510114",
            countyName: "新都区"
          }, {
            countyCode: "510184",
            countyName: "崇州市"
          }, {
            countyCode: "510121",
            countyName: "金堂县"
          }, {
            countyCode: "510107",
            countyName: "武侯区"
          }, {
            countyCode: "510104",
            countyName: "锦江区"
          }, {
            countyCode: "510131",
            countyName: "蒲江县"
          }, {
            countyCode: "510183",
            countyName: "邛崃市"
          }]
        }, {
          cityCode: "511100",
          cityName: "乐山市",
          county: [{
            countyCode: "511132",
            countyName: "峨边彝族自治县"
          }, {
            countyCode: "511113",
            countyName: "金口河区"
          }, {
            countyCode: "511111",
            countyName: "沙湾区"
          }, {
            countyCode: "511181",
            countyName: "峨眉山市"
          }, {
            countyCode: "511126",
            countyName: "夹江县"
          }, {
            countyCode: "511102",
            countyName: "市中区"
          }, {
            countyCode: "511112",
            countyName: "五通桥区"
          }, {
            countyCode: "511124",
            countyName: "井研县"
          }, {
            countyCode: "511129",
            countyName: "沐川县"
          }, {
            countyCode: "511123",
            countyName: "犍为县"
          }, {
            countyCode: "511133",
            countyName: "马边彝族自治县"
          }]
        }, {
          cityCode: "510700",
          cityName: "绵阳市",
          county: [{
            countyCode: "510724",
            countyName: "安州区"
          }, {
            countyCode: "510725",
            countyName: "梓潼县"
          }, {
            countyCode: "510781",
            countyName: "江油市"
          }, {
            countyCode: "510704",
            countyName: "游仙区"
          }, {
            countyCode: "510727",
            countyName: "平武县"
          }, {
            countyCode: "510723",
            countyName: "盐亭县"
          }, {
            countyCode: "510703",
            countyName: "涪城区"
          }, {
            countyCode: "510722",
            countyName: "三台县"
          }, {
            countyCode: "510726",
            countyName: "北川羌族自治县"
          }]
        }, {
          cityCode: "511600",
          cityName: "广安市",
          county: [{
            countyCode: "511623",
            countyName: "邻水县"
          }, {
            countyCode: "511622",
            countyName: "武胜县"
          }, {
            countyCode: "511603000000",
            countyName: "前锋区"
          }, {
            countyCode: "511602",
            countyName: "广安区"
          }, {
            countyCode: "511621",
            countyName: "岳池县"
          }, {
            countyCode: "511681",
            countyName: "华蓥市"
          }]
        }, {
          cityCode: "511500",
          cityName: "宜宾市",
          county: [{
            countyCode: "511523",
            countyName: "江安县"
          }, {
            countyCode: "511521",
            countyName: "叙州区"
          }, {
            countyCode: "511525",
            countyName: "高县"
          }, {
            countyCode: "511529",
            countyName: "屏山县"
          }, {
            countyCode: "511528",
            countyName: "兴文县"
          }, {
            countyCode: "511502",
            countyName: "翠屏区"
          }, {
            countyCode: "511527",
            countyName: "筠连县"
          }, {
            countyCode: "511524",
            countyName: "长宁县"
          }, {
            countyCode: "511526",
            countyName: "珙县"
          }, {
            countyCode: "511503",
            countyName: "南溪区"
          }]
        }, {
          cityCode: "511000",
          cityName: "内江市",
          county: [{
            countyCode: "511024",
            countyName: "威远县"
          }, {
            countyCode: "511002",
            countyName: "市中区"
          }, {
            countyCode: "511011",
            countyName: "东兴区"
          }, {
            countyCode: "511028",
            countyName: "隆昌市"
          }, {
            countyCode: "511025",
            countyName: "资中县"
          }]
        }, {
          cityCode: "513200",
          cityName: "阿坝藏族羌族自治州",
          county: [{
            countyCode: "513230",
            countyName: "壤塘县"
          }, {
            countyCode: "513225",
            countyName: "九寨沟县"
          }, {
            countyCode: "513223",
            countyName: "茂县"
          }, {
            countyCode: "513226",
            countyName: "金川县"
          }, {
            countyCode: "513227",
            countyName: "小金县"
          }, {
            countyCode: "513233",
            countyName: "红原县"
          }, {
            countyCode: "513222",
            countyName: "理县"
          }, {
            countyCode: "513232",
            countyName: "若尔盖县"
          }, {
            countyCode: "513221",
            countyName: "汶川县"
          }, {
            countyCode: "513228",
            countyName: "黑水县"
          }, {
            countyCode: "513229",
            countyName: "马尔康市"
          }, {
            countyCode: "513231",
            countyName: "阿坝县"
          }, {
            countyCode: "513224",
            countyName: "松潘县"
          }]
        }, {
          cityCode: "510900",
          cityName: "遂宁市",
          county: [{
            countyCode: "510904",
            countyName: "安居区"
          }, {
            countyCode: "510923",
            countyName: "大英县"
          }, {
            countyCode: "510922",
            countyName: "射洪县"
          }, {
            countyCode: "510903",
            countyName: "船山区"
          }, {
            countyCode: "510921",
            countyName: "蓬溪县"
          }]
        }, {
          cityCode: "510600",
          cityName: "德阳市",
          county: [{
            countyCode: "510682",
            countyName: "什邡市"
          }, {
            countyCode: "510683",
            countyName: "绵竹市"
          }, {
            countyCode: "510623",
            countyName: "中江县"
          }, {
            countyCode: "510681",
            countyName: "广汉市"
          }, {
            countyCode: "510626",
            countyName: "罗江区"
          }, {
            countyCode: "510603",
            countyName: "旌阳区"
          }]
        }]
      }, {
        provinceCode: "520000",
        provinceName: "贵州省",
        city: [{
          cityCode: "520100",
          cityName: "贵阳市",
          county: [{
            countyCode: "520103",
            countyName: "云岩区"
          }, {
            countyCode: "520123",
            countyName: "修文县"
          }, {
            countyCode: "520121",
            countyName: "开阳县"
          }, {
            countyCode: "520114",
            countyName: "小河区"
          }, {
            countyCode: "520122",
            countyName: "息烽县"
          }, {
            countyCode: "520113",
            countyName: "白云区"
          }, {
            countyCode: "520115",
            countyName: "观山湖区"
          }, {
            countyCode: "520102",
            countyName: "南明区"
          }, {
            countyCode: "520181",
            countyName: "清镇市"
          }, {
            countyCode: "520112",
            countyName: "乌当区"
          }, {
            countyCode: "520111",
            countyName: "花溪区"
          }]
        }, {
          cityCode: "520300",
          cityName: "遵义市",
          county: [{
            countyCode: "520381",
            countyName: "赤水市"
          }, {
            countyCode: "520329",
            countyName: "余庆县"
          }, {
            countyCode: "520325",
            countyName: "道真仡佬族苗族自治县"
          }, {
            countyCode: "520326",
            countyName: "务川仡佬族苗族自治县"
          }, {
            countyCode: "520328",
            countyName: "湄潭县"
          }, {
            countyCode: "520327",
            countyName: "凤冈县"
          }, {
            countyCode: "520302",
            countyName: "红花岗区"
          }, {
            countyCode: "520382",
            countyName: "仁怀市"
          }, {
            countyCode: "520321",
            countyName: "播州区"
          }, {
            countyCode: "520330",
            countyName: "习水县"
          }, {
            countyCode: "520324",
            countyName: "正安县"
          }, {
            countyCode: "520303",
            countyName: "汇川区"
          }, {
            countyCode: "520323",
            countyName: "绥阳县"
          }, {
            countyCode: "520322",
            countyName: "桐梓县"
          }]
        }, {
          cityCode: "522700",
          cityName: "黔南布依族苗族自治州",
          county: [{
            countyCode: "522722",
            countyName: "荔波县"
          }, {
            countyCode: "522725",
            countyName: "瓮安县"
          }, {
            countyCode: "522702",
            countyName: "福泉市"
          }, {
            countyCode: "522728",
            countyName: "罗甸县"
          }, {
            countyCode: "522723",
            countyName: "贵定县"
          }, {
            countyCode: "522701",
            countyName: "都匀市"
          }, {
            countyCode: "522726",
            countyName: "独山县"
          }, {
            countyCode: "522731",
            countyName: "惠水县"
          }, {
            countyCode: "522732",
            countyName: "三都水族自治县"
          }, {
            countyCode: "522727",
            countyName: "平塘县"
          }, {
            countyCode: "522729",
            countyName: "长顺县"
          }, {
            countyCode: "522730",
            countyName: "龙里县"
          }]
        }, {
          cityCode: "520200",
          cityName: "六盘水市",
          county: [{
            countyCode: "520222",
            countyName: "盘州市"
          }, {
            countyCode: "520203",
            countyName: "六枝特区"
          }, {
            countyCode: "520201",
            countyName: "钟山区"
          }, {
            countyCode: "520221",
            countyName: "水城县"
          }]
        }, {
          cityCode: "520400",
          cityName: "安顺市",
          county: [{
            countyCode: "520424",
            countyName: "关岭布依族苗族自治县"
          }, {
            countyCode: "520423",
            countyName: "镇宁布依族苗族自治县"
          }, {
            countyCode: "520422",
            countyName: "普定县"
          }, {
            countyCode: "520421",
            countyName: "平坝区"
          }, {
            countyCode: "520425",
            countyName: "紫云苗族布依族自治县"
          }, {
            countyCode: "520402",
            countyName: "西秀区"
          }]
        }, {
          cityCode: "520500",
          cityName: "毕节市",
          county: [{
            countyCode: "520523",
            countyName: "金沙县"
          }, {
            countyCode: "520524",
            countyName: "织金县"
          }, {
            countyCode: "520525",
            countyName: "纳雍县"
          }, {
            countyCode: "520522",
            countyName: "黔西县"
          }, {
            countyCode: "520526",
            countyName: "威宁彝族回族苗族自治县"
          }, {
            countyCode: "520527",
            countyName: "赫章县"
          }, {
            countyCode: "520521",
            countyName: "大方县"
          }, {
            countyCode: "520502",
            countyName: "七星关区"
          }]
        }, {
          cityCode: "522600",
          cityName: "黔东南苗族侗族自治州",
          county: [{
            countyCode: "522626",
            countyName: "岑巩县"
          }, {
            countyCode: "522630",
            countyName: "台江县"
          }, {
            countyCode: "522624",
            countyName: "三穗县"
          }, {
            countyCode: "522625",
            countyName: "镇远县"
          }, {
            countyCode: "522636",
            countyName: "丹寨县"
          }, {
            countyCode: "522633",
            countyName: "从江县"
          }, {
            countyCode: "522634",
            countyName: "雷山县"
          }, {
            countyCode: "522623",
            countyName: "施秉县"
          }, {
            countyCode: "522629",
            countyName: "剑河县"
          }, {
            countyCode: "522628",
            countyName: "锦屏县"
          }, {
            countyCode: "522632",
            countyName: "榕江县"
          }, {
            countyCode: "522631",
            countyName: "黎平县"
          }, {
            countyCode: "522627",
            countyName: "天柱县"
          }, {
            countyCode: "522622",
            countyName: "黄平县"
          }, {
            countyCode: "522635",
            countyName: "麻江县"
          }, {
            countyCode: "522601",
            countyName: "凯里市"
          }]
        }, {
          cityCode: "522300",
          cityName: "黔西南布依族苗族自治州",
          county: [{
            countyCode: "522326",
            countyName: "望谟县"
          }, {
            countyCode: "522327",
            countyName: "册亨县"
          }, {
            countyCode: "522323",
            countyName: "普安县"
          }, {
            countyCode: "522322",
            countyName: "兴仁县"
          }, {
            countyCode: "522301",
            countyName: "兴义市"
          }, {
            countyCode: "522328",
            countyName: "安龙县"
          }, {
            countyCode: "522324",
            countyName: "晴隆县"
          }, {
            countyCode: "522325",
            countyName: "贞丰县"
          }]
        }, {
          cityCode: "520600",
          cityName: "铜仁市",
          county: [{
            countyCode: "520602",
            countyName: "碧江区"
          }, {
            countyCode: "520622",
            countyName: "玉屏侗族自治县"
          }, {
            countyCode: "520603",
            countyName: "万山区"
          }, {
            countyCode: "520627",
            countyName: "沿河土家族自治县"
          }, {
            countyCode: "520624",
            countyName: "思南县"
          }, {
            countyCode: "520626",
            countyName: "德江县"
          }, {
            countyCode: "520628",
            countyName: "松桃苗族自治县"
          }, {
            countyCode: "520621",
            countyName: "江口县"
          }, {
            countyCode: "520623",
            countyName: "石阡县"
          }, {
            countyCode: "520625",
            countyName: "印江土家族苗族自治县"
          }]
        }]
      }, {
        provinceCode: "530000",
        provinceName: "云南省",
        city: [{
          cityCode: "530400",
          cityName: "玉溪市",
          county: [{
            countyCode: "530425",
            countyName: "易门县"
          }, {
            countyCode: "530423",
            countyName: "通海县"
          }, {
            countyCode: "530421",
            countyName: "江川区"
          }, {
            countyCode: "530424",
            countyName: "华宁县"
          }, {
            countyCode: "530426",
            countyName: "峨山彝族自治县"
          }, {
            countyCode: "530402",
            countyName: "红塔区"
          }, {
            countyCode: "530422",
            countyName: "澄江县"
          }, {
            countyCode: "530427",
            countyName: "新平彝族傣族自治县"
          }, {
            countyCode: "530428",
            countyName: "元江哈尼族彝族傣族自治县"
          }]
        }, {
          cityCode: "533100",
          cityName: "德宏傣族景颇族自治州",
          county: [{
            countyCode: "533124",
            countyName: "陇川县"
          }, {
            countyCode: "533122",
            countyName: "梁河县"
          }, {
            countyCode: "533123",
            countyName: "盈江县"
          }, {
            countyCode: "533103",
            countyName: "芒市"
          }, {
            countyCode: "533102",
            countyName: "瑞丽市"
          }]
        }, {
          cityCode: "532900",
          cityName: "大理白族自治州",
          county: [{
            countyCode: "532927",
            countyName: "巍山彝族回族自治县"
          }, {
            countyCode: "532931",
            countyName: "剑川县"
          }, {
            countyCode: "532923",
            countyName: "祥云县"
          }, {
            countyCode: "532932",
            countyName: "鹤庆县"
          }, {
            countyCode: "532928",
            countyName: "永平县"
          }, {
            countyCode: "532929",
            countyName: "云龙县"
          }, {
            countyCode: "532930",
            countyName: "洱源县"
          }, {
            countyCode: "532924",
            countyName: "宾川县"
          }, {
            countyCode: "532925",
            countyName: "弥渡县"
          }, {
            countyCode: "532926",
            countyName: "南涧彝族自治县"
          }, {
            countyCode: "532901",
            countyName: "大理市"
          }, {
            countyCode: "532922",
            countyName: "漾濞彝族自治县"
          }]
        }, {
          cityCode: "530100",
          cityName: "昆明市",
          county: [{
            countyCode: "530124",
            countyName: "富民县"
          }, {
            countyCode: "530114",
            countyName: "呈贡区"
          }, {
            countyCode: "530126",
            countyName: "石林彝族自治县"
          }, {
            countyCode: "530181",
            countyName: "安宁市"
          }, {
            countyCode: "530128",
            countyName: "禄劝彝族苗族自治县"
          }, {
            countyCode: "530125",
            countyName: "宜良县"
          }, {
            countyCode: "530103",
            countyName: "盘龙区"
          }, {
            countyCode: "530102",
            countyName: "五华区"
          }, {
            countyCode: "530122",
            countyName: "晋宁区"
          }, {
            countyCode: "530113",
            countyName: "东川区"
          }, {
            countyCode: "530111",
            countyName: "官渡区"
          }, {
            countyCode: "530127",
            countyName: "嵩明县"
          }, {
            countyCode: "530112",
            countyName: "西山区"
          }, {
            countyCode: "530129",
            countyName: "寻甸回族彝族自治县"
          }]
        }, {
          cityCode: "530900",
          cityName: "临沧市",
          county: [{
            countyCode: "530921",
            countyName: "凤庆县"
          }, {
            countyCode: "530926",
            countyName: "耿马傣族佤族自治县"
          }, {
            countyCode: "530922",
            countyName: "云县"
          }, {
            countyCode: "530924",
            countyName: "镇康县"
          }, {
            countyCode: "530923",
            countyName: "永德县"
          }, {
            countyCode: "530927",
            countyName: "沧源佤族自治县"
          }, {
            countyCode: "530925",
            countyName: "双江拉祜族佤族布朗族傣族自治县"
          }, {
            countyCode: "530902",
            countyName: "临翔区"
          }]
        }, {
          cityCode: "532300",
          cityName: "楚雄彝族自治州",
          county: [{
            countyCode: "532329",
            countyName: "武定县"
          }, {
            countyCode: "532324",
            countyName: "南华县"
          }, {
            countyCode: "532327",
            countyName: "永仁县"
          }, {
            countyCode: "532328",
            countyName: "元谋县"
          }, {
            countyCode: "532331",
            countyName: "禄丰县"
          }, {
            countyCode: "532326",
            countyName: "大姚县"
          }, {
            countyCode: "532325",
            countyName: "姚安县"
          }, {
            countyCode: "532301",
            countyName: "楚雄市"
          }, {
            countyCode: "532323",
            countyName: "牟定县"
          }, {
            countyCode: "532322",
            countyName: "双柏县"
          }]
        }, {
          cityCode: "532800",
          cityName: "西双版纳傣族自治州",
          county: [{
            countyCode: "532823",
            countyName: "勐腊县"
          }, {
            countyCode: "532801",
            countyName: "景洪市"
          }, {
            countyCode: "532822",
            countyName: "勐海县"
          }]
        }, {
          cityCode: "532600",
          cityName: "文山壮族苗族自治州",
          county: [{
            countyCode: "532601",
            countyName: "文山市"
          }, {
            countyCode: "532623",
            countyName: "西畴县"
          }, {
            countyCode: "532627",
            countyName: "广南县"
          }, {
            countyCode: "532625",
            countyName: "马关县"
          }, {
            countyCode: "532622",
            countyName: "砚山县"
          }, {
            countyCode: "532628",
            countyName: "富宁县"
          }, {
            countyCode: "532624",
            countyName: "麻栗坡县"
          }, {
            countyCode: "532626",
            countyName: "丘北县"
          }]
        }, {
          cityCode: "530300",
          cityName: "曲靖市",
          county: [{
            countyCode: "530302",
            countyName: "麒麟区"
          }, {
            countyCode: "530325",
            countyName: "富源县"
          }, {
            countyCode: "530326",
            countyName: "会泽县"
          }, {
            countyCode: "530324",
            countyName: "罗平县"
          }, {
            countyCode: "530328",
            countyName: "沾益区"
          }, {
            countyCode: "530323",
            countyName: "师宗县"
          }, {
            countyCode: "530321",
            countyName: "马龙区"
          }, {
            countyCode: "530322",
            countyName: "陆良县"
          }, {
            countyCode: "530381",
            countyName: "宣威市"
          }]
        }, {
          cityCode: "533400",
          cityName: "迪庆藏族自治州",
          county: [{
            countyCode: "533421",
            countyName: "香格里拉市"
          }, {
            countyCode: "533422",
            countyName: "德钦县"
          }, {
            countyCode: "533423",
            countyName: "维西傈僳族自治县"
          }]
        }, {
          cityCode: "530600",
          cityName: "昭通市",
          county: [{
            countyCode: "530629",
            countyName: "威信县"
          }, {
            countyCode: "530624",
            countyName: "大关县"
          }, {
            countyCode: "530630",
            countyName: "水富县"
          }, {
            countyCode: "530626",
            countyName: "绥江县"
          }, {
            countyCode: "530628",
            countyName: "彝良县"
          }, {
            countyCode: "530623",
            countyName: "盐津县"
          }, {
            countyCode: "530602",
            countyName: "昭阳区"
          }, {
            countyCode: "530621",
            countyName: "鲁甸县"
          }, {
            countyCode: "530627",
            countyName: "镇雄县"
          }, {
            countyCode: "530625",
            countyName: "永善县"
          }, {
            countyCode: "530622",
            countyName: "巧家县"
          }]
        }, {
          cityCode: "533300",
          cityName: "怒江傈僳族自治州",
          county: [{
            countyCode: "533323",
            countyName: "福贡县"
          }, {
            countyCode: "533324",
            countyName: "贡山独龙族怒族自治县"
          }, {
            countyCode: "533321",
            countyName: "泸水市"
          }, {
            countyCode: "533325",
            countyName: "兰坪白族普米族自治县"
          }]
        }, {
          cityCode: "530700",
          cityName: "丽江市",
          county: [{
            countyCode: "530724",
            countyName: "宁蒗彝族自治县"
          }, {
            countyCode: "530722",
            countyName: "永胜县"
          }, {
            countyCode: "530702",
            countyName: "古城区"
          }, {
            countyCode: "530721",
            countyName: "玉龙纳西族自治县"
          }, {
            countyCode: "530723",
            countyName: "华坪县"
          }]
        }, {
          cityCode: "530800",
          cityName: "普洱市",
          county: [{
            countyCode: "530822",
            countyName: "墨江哈尼族自治县"
          }, {
            countyCode: "530823",
            countyName: "景东彝族自治县"
          }, {
            countyCode: "530827",
            countyName: "孟连傣族拉祜族佤族自治县"
          }, {
            countyCode: "530825",
            countyName: "镇沅彝族哈尼族拉祜族自治县"
          }, {
            countyCode: "530828",
            countyName: "澜沧拉祜族自治县"
          }, {
            countyCode: "530829",
            countyName: "西盟佤族自治县"
          }, {
            countyCode: "530821",
            countyName: "宁洱哈尼族彝族自治县"
          }, {
            countyCode: "530802",
            countyName: "思茅区"
          }, {
            countyCode: "530826",
            countyName: "江城哈尼族彝族自治县"
          }, {
            countyCode: "530824",
            countyName: "景谷傣族彝族自治县"
          }]
        }, {
          cityCode: "532500",
          cityName: "红河哈尼族彝族自治州",
          county: [{
            countyCode: "532525",
            countyName: "石屏县"
          }, {
            countyCode: "532530",
            countyName: "金平苗族瑶族傣族自治县"
          }, {
            countyCode: "532503",
            countyName: "蒙自市"
          }, {
            countyCode: "532528",
            countyName: "元阳县"
          }, {
            countyCode: "532527",
            countyName: "泸西县"
          }, {
            countyCode: "532502",
            countyName: "开远市"
          }, {
            countyCode: "532524",
            countyName: "建水县"
          }, {
            countyCode: "532532",
            countyName: "河口瑶族自治县"
          }, {
            countyCode: "532529",
            countyName: "红河县"
          }, {
            countyCode: "532531",
            countyName: "绿春县"
          }, {
            countyCode: "532501",
            countyName: "个旧市"
          }, {
            countyCode: "532523",
            countyName: "屏边苗族自治县"
          }, {
            countyCode: "532526",
            countyName: "弥勒市"
          }]
        }, {
          cityCode: "530500",
          cityName: "保山市",
          county: [{
            countyCode: "530523",
            countyName: "龙陵县"
          }, {
            countyCode: "530522",
            countyName: "腾冲市"
          }, {
            countyCode: "530521",
            countyName: "施甸县"
          }, {
            countyCode: "530502",
            countyName: "隆阳区"
          }, {
            countyCode: "530524",
            countyName: "昌宁县"
          }]
        }]
      }, {
        provinceCode: "540000",
        provinceName: "西藏自治区",
        city: [{
          cityCode: "542100",
          cityName: "昌都市",
          county: [{
            countyCode: "542122",
            countyName: "江达县"
          }, {
            countyCode: "542129",
            countyName: "芒康县"
          }, {
            countyCode: "542128",
            countyName: "左贡县"
          }, {
            countyCode: "542126",
            countyName: "察雅县"
          }, {
            countyCode: "542132",
            countyName: "洛隆县"
          }, {
            countyCode: "542121",
            countyName: "卡若区"
          }, {
            countyCode: "542125",
            countyName: "丁青县"
          }, {
            countyCode: "542133",
            countyName: "边坝县"
          }, {
            countyCode: "542123",
            countyName: "贡觉县"
          }, {
            countyCode: "542127",
            countyName: "八宿县"
          }, {
            countyCode: "542124",
            countyName: "类乌齐县"
          }]
        }, {
          cityCode: "542200",
          cityName: "山南市",
          county: [{
            countyCode: "542229",
            countyName: "加查县"
          }, {
            countyCode: "542225",
            countyName: "琼结县"
          }, {
            countyCode: "542232",
            countyName: "错那县"
          }, {
            countyCode: "542221",
            countyName: "乃东区"
          }, {
            countyCode: "542224",
            countyName: "桑日县"
          }, {
            countyCode: "542222",
            countyName: "扎囊县"
          }, {
            countyCode: "542227",
            countyName: "措美县"
          }, {
            countyCode: "542223",
            countyName: "贡嘎县"
          }, {
            countyCode: "542228",
            countyName: "洛扎县"
          }, {
            countyCode: "542226",
            countyName: "曲松县"
          }, {
            countyCode: "542233",
            countyName: "浪卡子县"
          }, {
            countyCode: "542231",
            countyName: "隆子县"
          }]
        }, {
          cityCode: "542400",
          cityName: "那曲市",
          county: [{
            countyCode: "542426",
            countyName: "申扎县"
          }, {
            countyCode: "542423",
            countyName: "比如县"
          }, {
            countyCode: "542430",
            countyName: "尼玛县"
          }, {
            countyCode: "542421",
            countyName: "色尼区"
          }, {
            countyCode: "542422",
            countyName: "嘉黎县"
          }, {
            countyCode: "542424",
            countyName: "聂荣县"
          }, {
            countyCode: "542427",
            countyName: "索县"
          }, {
            countyCode: "542425",
            countyName: "安多县"
          }, {
            countyCode: "542428",
            countyName: "班戈县"
          }, {
            countyCode: "542429",
            countyName: "巴青县"
          }]
        }, {
          cityCode: "542600",
          cityName: "林芝市",
          county: [{
            countyCode: "542623",
            countyName: "米林县"
          }, {
            countyCode: "542626",
            countyName: "察隅县"
          }, {
            countyCode: "542627",
            countyName: "朗县"
          }, {
            countyCode: "542622",
            countyName: "工布江达县"
          }, {
            countyCode: "542625",
            countyName: "波密县"
          }, {
            countyCode: "542624",
            countyName: "墨脱县"
          }, {
            countyCode: "542621",
            countyName: "巴宜区"
          }]
        }, {
          cityCode: "540100",
          cityName: "拉萨市",
          county: [{
            countyCode: "540121",
            countyName: "林周县"
          }, {
            countyCode: "540124",
            countyName: "曲水县"
          }, {
            countyCode: "540126",
            countyName: "达孜区"
          }, {
            countyCode: "540125",
            countyName: "堆龙德庆区"
          }, {
            countyCode: "540122",
            countyName: "当雄县"
          }, {
            countyCode: "540127",
            countyName: "墨竹工卡县"
          }, {
            countyCode: "540123",
            countyName: "尼木县"
          }, {
            countyCode: "540102",
            countyName: "城关区"
          }]
        }, {
          cityCode: "542300",
          cityName: "日喀则市",
          county: [{
            countyCode: "542335",
            countyName: "吉隆县"
          }, {
            countyCode: "542323",
            countyName: "江孜县"
          }, {
            countyCode: "542331",
            countyName: "康马县"
          }, {
            countyCode: "542322",
            countyName: "南木林县"
          }, {
            countyCode: "542338",
            countyName: "岗巴县"
          }, {
            countyCode: "542336",
            countyName: "聂拉木县"
          }, {
            countyCode: "542328",
            countyName: "谢通门县"
          }, {
            countyCode: "542325",
            countyName: "萨迦县"
          }, {
            countyCode: "542329",
            countyName: "白朗县"
          }, {
            countyCode: "542326",
            countyName: "拉孜县"
          }, {
            countyCode: "542332",
            countyName: "定结县"
          }, {
            countyCode: "542327",
            countyName: "昂仁县"
          }, {
            countyCode: "542334",
            countyName: "亚东县"
          }, {
            countyCode: "542337",
            countyName: "萨嘎县"
          }, {
            countyCode: "542324",
            countyName: "定日县"
          }, {
            countyCode: "542333",
            countyName: "仲巴县"
          }, {
            countyCode: "542301",
            countyName: "桑珠孜区"
          }, {
            countyCode: "542330",
            countyName: "仁布县"
          }]
        }, {
          cityCode: "542500",
          cityName: "阿里地区",
          county: [{
            countyCode: "542523",
            countyName: "噶尔县"
          }, {
            countyCode: "542525",
            countyName: "革吉县"
          }, {
            countyCode: "542524",
            countyName: "日土县"
          }, {
            countyCode: "542527",
            countyName: "措勤县"
          }, {
            countyCode: "542521",
            countyName: "普兰县"
          }, {
            countyCode: "542526",
            countyName: "改则县"
          }, {
            countyCode: "542522",
            countyName: "札达县"
          }]
        }]
      }, {
        provinceCode: "610000",
        provinceName: "陕西省",
        city: [{
          cityCode: "610800",
          cityName: "榆林市",
          county: [{
            countyCode: "610831",
            countyName: "子洲县"
          }, {
            countyCode: "610825",
            countyName: "定边县"
          }, {
            countyCode: "610827",
            countyName: "米脂县"
          }, {
            countyCode: "610821",
            countyName: "神木市"
          }, {
            countyCode: "610829",
            countyName: "吴堡县"
          }, {
            countyCode: "610822",
            countyName: "府谷县"
          }, {
            countyCode: "610830",
            countyName: "清涧县"
          }, {
            countyCode: "610823",
            countyName: "横山区"
          }, {
            countyCode: "610824",
            countyName: "靖边县"
          }, {
            countyCode: "610826",
            countyName: "绥德县"
          }, {
            countyCode: "610802",
            countyName: "榆阳区"
          }, {
            countyCode: "610828",
            countyName: "佳县"
          }]
        }, {
          cityCode: "610200",
          cityName: "铜川市",
          county: [{
            countyCode: "610202",
            countyName: "王益区"
          }, {
            countyCode: "610203",
            countyName: "印台区"
          }, {
            countyCode: "610204",
            countyName: "耀州区"
          }, {
            countyCode: "610222",
            countyName: "宜君县"
          }]
        }, {
          cityCode: "611000",
          cityName: "商洛市",
          county: [{
            countyCode: "611022",
            countyName: "丹凤县"
          }, {
            countyCode: "611023",
            countyName: "商南县"
          }, {
            countyCode: "611026",
            countyName: "柞水县"
          }, {
            countyCode: "611025",
            countyName: "镇安县"
          }, {
            countyCode: "611024",
            countyName: "山阳县"
          }, {
            countyCode: "611021",
            countyName: "洛南县"
          }, {
            countyCode: "611002",
            countyName: "商州区"
          }]
        }, {
          cityCode: "610500",
          cityName: "渭南市",
          county: [{
            countyCode: "610582",
            countyName: "华阴市"
          }, {
            countyCode: "610524",
            countyName: "合阳县"
          }, {
            countyCode: "610521",
            countyName: "华州区"
          }, {
            countyCode: "610581",
            countyName: "韩城市"
          }, {
            countyCode: "610526",
            countyName: "蒲城县"
          }, {
            countyCode: "610527",
            countyName: "白水县"
          }, {
            countyCode: "610522",
            countyName: "潼关县"
          }, {
            countyCode: "610528",
            countyName: "富平县"
          }, {
            countyCode: "610523",
            countyName: "大荔县"
          }, {
            countyCode: "610502",
            countyName: "临渭区"
          }, {
            countyCode: "610525",
            countyName: "澄城县"
          }]
        }, {
          cityCode: "610300",
          cityName: "宝鸡市",
          county: [{
            countyCode: "610328",
            countyName: "千阳县"
          }, {
            countyCode: "610330",
            countyName: "凤县"
          }, {
            countyCode: "610329",
            countyName: "麟游县"
          }, {
            countyCode: "610323",
            countyName: "岐山县"
          }, {
            countyCode: "610302",
            countyName: "渭滨区"
          }, {
            countyCode: "610327",
            countyName: "陇县"
          }, {
            countyCode: "610322",
            countyName: "凤翔县"
          }, {
            countyCode: "610324",
            countyName: "扶风县"
          }, {
            countyCode: "610304",
            countyName: "陈仓区"
          }, {
            countyCode: "610303",
            countyName: "金台区"
          }, {
            countyCode: "610326",
            countyName: "眉县"
          }, {
            countyCode: "610331",
            countyName: "太白县"
          }]
        }, {
          cityCode: "610900",
          cityName: "安康市",
          county: [{
            countyCode: "610927",
            countyName: "镇坪县"
          }, {
            countyCode: "610923",
            countyName: "宁陕县"
          }, {
            countyCode: "610922",
            countyName: "石泉县"
          }, {
            countyCode: "610921",
            countyName: "汉阴县"
          }, {
            countyCode: "610925",
            countyName: "岚皋县"
          }, {
            countyCode: "610926",
            countyName: "平利县"
          }, {
            countyCode: "610928",
            countyName: "旬阳县"
          }, {
            countyCode: "610929",
            countyName: "白河县"
          }, {
            countyCode: "610902",
            countyName: "汉滨区"
          }, {
            countyCode: "610924",
            countyName: "紫阳县"
          }]
        }, {
          cityCode: "610700",
          cityName: "汉中市",
          county: [{
            countyCode: "610724",
            countyName: "西乡县"
          }, {
            countyCode: "610721",
            countyName: "南郑区"
          }, {
            countyCode: "610722",
            countyName: "城固县"
          }, {
            countyCode: "610727",
            countyName: "略阳县"
          }, {
            countyCode: "610728",
            countyName: "镇巴县"
          }, {
            countyCode: "610702",
            countyName: "汉台区"
          }, {
            countyCode: "610729",
            countyName: "留坝县"
          }, {
            countyCode: "610723",
            countyName: "洋县"
          }, {
            countyCode: "610730",
            countyName: "佛坪县"
          }, {
            countyCode: "610726",
            countyName: "宁强县"
          }, {
            countyCode: "610725",
            countyName: "勉县"
          }]
        }, {
          cityCode: "610600",
          cityName: "延安市",
          county: [{
            countyCode: "610628",
            countyName: "富县"
          }, {
            countyCode: "610631",
            countyName: "黄龙县"
          }, {
            countyCode: "610602",
            countyName: "宝塔区"
          }, {
            countyCode: "610630",
            countyName: "宜川县"
          }, {
            countyCode: "610624",
            countyName: "安塞区"
          }, {
            countyCode: "610629",
            countyName: "洛川县"
          }, {
            countyCode: "610621",
            countyName: "延长县"
          }, {
            countyCode: "610632",
            countyName: "黄陵县"
          }, {
            countyCode: "610626",
            countyName: "吴起县"
          }, {
            countyCode: "610623",
            countyName: "子长县"
          }, {
            countyCode: "610627",
            countyName: "甘泉县"
          }, {
            countyCode: "610625",
            countyName: "志丹县"
          }, {
            countyCode: "610622",
            countyName: "延川县"
          }]
        }, {
          cityCode: "610100",
          cityName: "西安市",
          county: [{
            countyCode: "610116",
            countyName: "长安区"
          }, {
            countyCode: "610112",
            countyName: "未央区"
          }, {
            countyCode: "610102",
            countyName: "新城区"
          }, {
            countyCode: "610114",
            countyName: "阎良区"
          }, {
            countyCode: "610111",
            countyName: "灞桥区"
          }, {
            countyCode: "610126",
            countyName: "高陵区"
          }, {
            countyCode: "610122",
            countyName: "蓝田县"
          }, {
            countyCode: "610103",
            countyName: "碑林区"
          }, {
            countyCode: "610115",
            countyName: "临潼区"
          }, {
            countyCode: "610113",
            countyName: "雁塔区"
          }, {
            countyCode: "610124",
            countyName: "周至县"
          }, {
            countyCode: "610104",
            countyName: "莲湖区"
          }, {
            countyCode: "610125",
            countyName: "鄠邑区"
          }]
        }, {
          cityCode: "610400",
          cityName: "咸阳市",
          county: [{
            countyCode: "610430",
            countyName: "淳化县"
          }, {
            countyCode: "610423",
            countyName: "泾阳县"
          }, {
            countyCode: "610481",
            countyName: "兴平市"
          }, {
            countyCode: "610422",
            countyName: "三原县"
          }, {
            countyCode: "610424",
            countyName: "乾县"
          }, {
            countyCode: "610426",
            countyName: "永寿县"
          }, {
            countyCode: "610427",
            countyName: "彬州市"
          }, {
            countyCode: "610402",
            countyName: "秦都区"
          }, {
            countyCode: "610404",
            countyName: "渭城区"
          }, {
            countyCode: "610403",
            countyName: "杨陵区"
          }, {
            countyCode: "610431",
            countyName: "武功县"
          }, {
            countyCode: "610428",
            countyName: "长武县"
          }, {
            countyCode: "610425",
            countyName: "礼泉县"
          }, {
            countyCode: "610429",
            countyName: "旬邑县"
          }]
        }]
      }, {
        provinceCode: "620000",
        provinceName: "甘肃省",
        city: [{
          cityCode: "620500",
          cityName: "天水市",
          county: [{
            countyCode: "620524",
            countyName: "武山县"
          }, {
            countyCode: "620502",
            countyName: "秦州区"
          }, {
            countyCode: "620521",
            countyName: "清水县"
          }, {
            countyCode: "620523",
            countyName: "甘谷县"
          }, {
            countyCode: "620522",
            countyName: "秦安县"
          }, {
            countyCode: "620503",
            countyName: "麦积区"
          }, {
            countyCode: "620525",
            countyName: "张家川回族自治县"
          }]
        }, {
          cityCode: "620300",
          cityName: "金昌市",
          county: [{
            countyCode: "620302",
            countyName: "金川区"
          }, {
            countyCode: "620321",
            countyName: "永昌县"
          }]
        }, {
          cityCode: "620600",
          cityName: "武威市",
          county: [{
            countyCode: "620602",
            countyName: "凉州区"
          }, {
            countyCode: "620623",
            countyName: "天祝藏族自治县"
          }, {
            countyCode: "620622",
            countyName: "古浪县"
          }, {
            countyCode: "620621",
            countyName: "民勤县"
          }]
        }, {
          cityCode: "620700",
          cityName: "张掖市",
          county: [{
            countyCode: "620702",
            countyName: "甘州区"
          }, {
            countyCode: "620724",
            countyName: "高台县"
          }, {
            countyCode: "620725",
            countyName: "山丹县"
          }, {
            countyCode: "620723",
            countyName: "临泽县"
          }, {
            countyCode: "620722",
            countyName: "民乐县"
          }, {
            countyCode: "620721",
            countyName: "肃南裕固族自治县"
          }]
        }, {
          cityCode: "621200",
          cityName: "陇南市",
          county: [{
            countyCode: "621225",
            countyName: "西和县"
          }, {
            countyCode: "621223",
            countyName: "宕昌县"
          }, {
            countyCode: "621227",
            countyName: "徽县"
          }, {
            countyCode: "621224",
            countyName: "康县"
          }, {
            countyCode: "621221",
            countyName: "成县"
          }, {
            countyCode: "621228",
            countyName: "两当县"
          }, {
            countyCode: "621226",
            countyName: "礼县"
          }, {
            countyCode: "621222",
            countyName: "文县"
          }, {
            countyCode: "621202",
            countyName: "武都区"
          }]
        }, {
          cityCode: "620100",
          cityName: "兰州市",
          county: [{
            countyCode: "620121",
            countyName: "永登县"
          }, {
            countyCode: "620111",
            countyName: "红古区"
          }, {
            countyCode: "620103",
            countyName: "七里河区"
          }, {
            countyCode: "620122",
            countyName: "皋兰县"
          }, {
            countyCode: "620104",
            countyName: "西固区"
          }, {
            countyCode: "620102",
            countyName: "城关区"
          }, {
            countyCode: "620105",
            countyName: "安宁区"
          }, {
            countyCode: "620123",
            countyName: "榆中县"
          }]
        }, {
          cityCode: "621000",
          cityName: "庆阳市",
          county: [{
            countyCode: "621025",
            countyName: "正宁县"
          }, {
            countyCode: "621026",
            countyName: "宁县"
          }, {
            countyCode: "621027",
            countyName: "镇原县"
          }, {
            countyCode: "621023",
            countyName: "华池县"
          }, {
            countyCode: "621002",
            countyName: "西峰区"
          }, {
            countyCode: "621024",
            countyName: "合水县"
          }, {
            countyCode: "621022",
            countyName: "环县"
          }, {
            countyCode: "621021",
            countyName: "庆城县"
          }]
        }, {
          cityCode: "620200",
          cityName: "嘉峪关市",
          county: [{
            countyCode: "620200-1",
            countyName: "嘉峪关市"
          }]
        }, {
          cityCode: "620800",
          cityName: "平凉市",
          county: [{
            countyCode: "620826",
            countyName: "静宁县"
          }, {
            countyCode: "620822",
            countyName: "灵台县"
          }, {
            countyCode: "620823",
            countyName: "崇信县"
          }, {
            countyCode: "620825",
            countyName: "庄浪县"
          }, {
            countyCode: "620824",
            countyName: "华亭县"
          }, {
            countyCode: "620821",
            countyName: "泾川县"
          }, {
            countyCode: "620802",
            countyName: "崆峒区"
          }]
        }, {
          cityCode: "623000",
          cityName: "甘南藏族自治州",
          county: [{
            countyCode: "623024",
            countyName: "迭部县"
          }, {
            countyCode: "623026",
            countyName: "碌曲县"
          }, {
            countyCode: "623022",
            countyName: "卓尼县"
          }, {
            countyCode: "623021",
            countyName: "临潭县"
          }, {
            countyCode: "623025",
            countyName: "玛曲县"
          }, {
            countyCode: "623001",
            countyName: "合作市"
          }, {
            countyCode: "623027",
            countyName: "夏河县"
          }, {
            countyCode: "623023",
            countyName: "舟曲县"
          }]
        }, {
          cityCode: "620400",
          cityName: "白银市",
          county: [{
            countyCode: "620422",
            countyName: "会宁县"
          }, {
            countyCode: "620403",
            countyName: "平川区"
          }, {
            countyCode: "620423",
            countyName: "景泰县"
          }, {
            countyCode: "620421",
            countyName: "靖远县"
          }, {
            countyCode: "620402",
            countyName: "白银区"
          }]
        }, {
          cityCode: "620900",
          cityName: "酒泉市",
          county: [{
            countyCode: "620921",
            countyName: "金塔县"
          }, {
            countyCode: "620924",
            countyName: "阿克塞哈萨克族自治县"
          }, {
            countyCode: "620923",
            countyName: "肃北蒙古族自治县"
          }, {
            countyCode: "620922",
            countyName: "瓜州县"
          }, {
            countyCode: "620981",
            countyName: "玉门市"
          }, {
            countyCode: "620902",
            countyName: "肃州区"
          }, {
            countyCode: "620982",
            countyName: "敦煌市"
          }]
        }, {
          cityCode: "621100",
          cityName: "定西市",
          county: [{
            countyCode: "621122",
            countyName: "陇西县"
          }, {
            countyCode: "621123",
            countyName: "渭源县"
          }, {
            countyCode: "621125",
            countyName: "漳县"
          }, {
            countyCode: "621124",
            countyName: "临洮县"
          }, {
            countyCode: "621121",
            countyName: "通渭县"
          }, {
            countyCode: "621126",
            countyName: "岷县"
          }, {
            countyCode: "621102",
            countyName: "安定区"
          }]
        }, {
          cityCode: "622900",
          cityName: "临夏回族自治州",
          county: [{
            countyCode: "622921",
            countyName: "临夏县"
          }, {
            countyCode: "622925",
            countyName: "和政县"
          }, {
            countyCode: "622924",
            countyName: "广河县"
          }, {
            countyCode: "622901",
            countyName: "临夏市"
          }, {
            countyCode: "622926",
            countyName: "东乡族自治县"
          }, {
            countyCode: "622923",
            countyName: "永靖县"
          }, {
            countyCode: "622927",
            countyName: "积石山保安族东乡族撒拉族自治县"
          }, {
            countyCode: "622922",
            countyName: "康乐县"
          }]
        }]
      }, {
        provinceCode: "630000",
        provinceName: "青海省",
        city: [{
          cityCode: "632200",
          cityName: "海北藏族自治州",
          county: [{
            countyCode: "632224",
            countyName: "刚察县"
          }, {
            countyCode: "632222",
            countyName: "祁连县"
          }, {
            countyCode: "632223",
            countyName: "海晏县"
          }, {
            countyCode: "632221",
            countyName: "门源回族自治县"
          }]
        }, {
          cityCode: "632500",
          cityName: "海南藏族自治州",
          county: [{
            countyCode: "632522",
            countyName: "同德县"
          }, {
            countyCode: "632525",
            countyName: "贵南县"
          }, {
            countyCode: "632524",
            countyName: "兴海县"
          }, {
            countyCode: "632523",
            countyName: "贵德县"
          }, {
            countyCode: "632521",
            countyName: "共和县"
          }]
        }, {
          cityCode: "630100",
          cityName: "西宁市",
          county: [{
            countyCode: "630102",
            countyName: "城东区"
          }, {
            countyCode: "630122",
            countyName: "湟中县"
          }, {
            countyCode: "630105",
            countyName: "城北区"
          }, {
            countyCode: "630121",
            countyName: "大通回族土族自治县"
          }, {
            countyCode: "630103",
            countyName: "城中区"
          }, {
            countyCode: "630104",
            countyName: "城西区"
          }, {
            countyCode: "630123",
            countyName: "湟源县"
          }]
        }, {
          cityCode: "632700",
          cityName: "玉树藏族自治州",
          county: [{
            countyCode: "632726",
            countyName: "曲麻莱县"
          }, {
            countyCode: "632721",
            countyName: "玉树市"
          }, {
            countyCode: "632723",
            countyName: "称多县"
          }, {
            countyCode: "632722",
            countyName: "杂多县"
          }, {
            countyCode: "632725",
            countyName: "囊谦县"
          }, {
            countyCode: "632724",
            countyName: "治多县"
          }]
        }, {
          cityCode: "632800",
          cityName: "海西蒙古族藏族自治州",
          county: [{
            countyCode: "632801",
            countyName: "格尔木市"
          }, {
            countyCode: "632823",
            countyName: "天峻县"
          }, {
            countyCode: "632802",
            countyName: "德令哈市"
          }, {
            countyCode: "632822",
            countyName: "都兰县"
          }, {
            countyCode: "632821",
            countyName: "乌兰县"
          }, {
            countyCode: "632803",
            countyName: "茫崖市"
          }]
        }, {
          cityCode: "632100",
          cityName: "海东市",
          county: [{
            countyCode: "632128",
            countyName: "循化撒拉族自治县"
          }, {
            countyCode: "632126",
            countyName: "互助土族自治县"
          }, {
            countyCode: "632127",
            countyName: "化隆回族自治县"
          }, {
            countyCode: "632122",
            countyName: "民和回族土族自治县"
          }, {
            countyCode: "632121",
            countyName: "平安区"
          }, {
            countyCode: "632123",
            countyName: "乐都区"
          }]
        }, {
          cityCode: "632300",
          cityName: "黄南藏族自治州",
          county: [{
            countyCode: "632322",
            countyName: "尖扎县"
          }, {
            countyCode: "632323",
            countyName: "泽库县"
          }, {
            countyCode: "632324",
            countyName: "河南蒙古族自治县"
          }, {
            countyCode: "632321",
            countyName: "同仁县"
          }]
        }, {
          cityCode: "632600",
          cityName: "果洛藏族自治州",
          county: [{
            countyCode: "632625",
            countyName: "久治县"
          }, {
            countyCode: "632623",
            countyName: "甘德县"
          }, {
            countyCode: "632622",
            countyName: "班玛县"
          }, {
            countyCode: "632626",
            countyName: "玛多县"
          }, {
            countyCode: "632624",
            countyName: "达日县"
          }, {
            countyCode: "632621",
            countyName: "玛沁县"
          }]
        }]
      }, {
        provinceCode: "640000",
        provinceName: "宁夏回族自治区",
        city: [{
          cityCode: "640200",
          cityName: "石嘴山市",
          county: [{
            countyCode: "640205",
            countyName: "惠农区"
          }, {
            countyCode: "640202",
            countyName: "大武口区"
          }, {
            countyCode: "640221",
            countyName: "平罗县"
          }]
        }, {
          cityCode: "640300",
          cityName: "吴忠市",
          county: [{
            countyCode: "640323",
            countyName: "盐池县"
          }, {
            countyCode: "640381",
            countyName: "青铜峡市"
          }, {
            countyCode: "640302",
            countyName: "利通区"
          }, {
            countyCode: "640303",
            countyName: "红寺堡区"
          }, {
            countyCode: "640324",
            countyName: "同心县"
          }]
        }, {
          cityCode: "640500",
          cityName: "中卫市",
          county: [{
            countyCode: "640522",
            countyName: "海原县"
          }, {
            countyCode: "640502",
            countyName: "沙坡头区"
          }, {
            countyCode: "640521",
            countyName: "中宁县"
          }]
        }, {
          cityCode: "640400",
          cityName: "固原市",
          county: [{
            countyCode: "640402",
            countyName: "原州区"
          }, {
            countyCode: "640423",
            countyName: "隆德县"
          }, {
            countyCode: "640424",
            countyName: "泾源县"
          }, {
            countyCode: "640422",
            countyName: "西吉县"
          }, {
            countyCode: "640425",
            countyName: "彭阳县"
          }]
        }, {
          cityCode: "640100",
          cityName: "银川市",
          county: [{
            countyCode: "640106",
            countyName: "金凤区"
          }, {
            countyCode: "640105",
            countyName: "西夏区"
          }, {
            countyCode: "640122",
            countyName: "贺兰县"
          }, {
            countyCode: "640104",
            countyName: "兴庆区"
          }, {
            countyCode: "640181",
            countyName: "灵武市"
          }, {
            countyCode: "640121",
            countyName: "永宁县"
          }]
        }]
      }, {
        provinceCode: "650000",
        provinceName: "新疆维吾尔自治区",
        city: [{
          cityCode: "650200",
          cityName: "克拉玛依市",
          county: [{
            countyCode: "650203",
            countyName: "克拉玛依区"
          }, {
            countyCode: "650205",
            countyName: "乌尔禾区"
          }, {
            countyCode: "650202",
            countyName: "独山子区"
          }, {
            countyCode: "650204",
            countyName: "白碱滩区"
          }]
        }, {
          cityCode: "652800",
          cityName: "巴音郭楞蒙古自治州",
          county: [{
            countyCode: "652829",
            countyName: "博湖县"
          }, {
            countyCode: "652824",
            countyName: "若羌县"
          }, {
            countyCode: "652826",
            countyName: "焉耆回族自治县"
          }, {
            countyCode: "652823",
            countyName: "尉犁县"
          }, {
            countyCode: "652822",
            countyName: "轮台县"
          }, {
            countyCode: "652825",
            countyName: "且末县"
          }, {
            countyCode: "652801",
            countyName: "库尔勒市"
          }, {
            countyCode: "652827",
            countyName: "和静县"
          }, {
            countyCode: "652828",
            countyName: "和硕县"
          }]
        }, {
          cityCode: "654200",
          cityName: "塔城地区",
          county: [{
            countyCode: "654223",
            countyName: "沙湾县"
          }, {
            countyCode: "654201",
            countyName: "塔城市"
          }, {
            countyCode: "654226",
            countyName: "和布克赛尔蒙古自治县"
          }, {
            countyCode: "654202",
            countyName: "乌苏市"
          }, {
            countyCode: "654224",
            countyName: "托里县"
          }, {
            countyCode: "654221",
            countyName: "额敏县"
          }, {
            countyCode: "654225",
            countyName: "裕民县"
          }]
        }, {
          cityCode: "652200",
          cityName: "哈密市",
          county: [{
            countyCode: "652222",
            countyName: "巴里坤哈萨克自治县"
          }, {
            countyCode: "652201",
            countyName: "伊州区"
          }, {
            countyCode: "652223",
            countyName: "伊吾县"
          }]
        }, {
          cityCode: "654000",
          cityName: "伊犁哈萨克自治州",
          county: [{
            countyCode: "654027",
            countyName: "特克斯县"
          }, {
            countyCode: "654024",
            countyName: "巩留县"
          }, {
            countyCode: "654022",
            countyName: "察布查尔锡伯自治县"
          }, {
            countyCode: "654004",
            countyName: "霍尔果斯市"
          }, {
            countyCode: "654023",
            countyName: "霍城县"
          }, {
            countyCode: "654028",
            countyName: "尼勒克县"
          }, {
            countyCode: "654003",
            countyName: "奎屯市"
          }, {
            countyCode: "654021",
            countyName: "伊宁县"
          }, {
            countyCode: "654025",
            countyName: "新源县"
          }, {
            countyCode: "654002",
            countyName: "伊宁市"
          }, {
            countyCode: "654026",
            countyName: "昭苏县"
          }]
        }, {
          cityCode: "654300",
          cityName: "阿勒泰地区",
          county: [{
            countyCode: "654325",
            countyName: "青河县"
          }, {
            countyCode: "654326",
            countyName: "吉木乃县"
          }, {
            countyCode: "654321",
            countyName: "布尔津县"
          }, {
            countyCode: "654323",
            countyName: "福海县"
          }, {
            countyCode: "654301",
            countyName: "阿勒泰市"
          }, {
            countyCode: "654322",
            countyName: "富蕴县"
          }, {
            countyCode: "654324",
            countyName: "哈巴河县"
          }]
        }, {
          cityCode: "652100",
          cityName: "吐鲁番市",
          county: [{
            countyCode: "652122",
            countyName: "鄯善县"
          }, {
            countyCode: "652101",
            countyName: "高昌区"
          }, {
            countyCode: "652123",
            countyName: "托克逊县"
          }]
        }, {
          cityCode: "650100",
          cityName: "乌鲁木齐市",
          county: [{
            countyCode: "650121",
            countyName: "乌鲁木齐县"
          }, {
            countyCode: "650109",
            countyName: "米东区"
          }, {
            countyCode: "650103",
            countyName: "沙依巴克区"
          }, {
            countyCode: "650105",
            countyName: "水磨沟区"
          }, {
            countyCode: "650107",
            countyName: "达坂城区"
          }, {
            countyCode: "650104",
            countyName: "新市区"
          }, {
            countyCode: "650102",
            countyName: "天山区"
          }, {
            countyCode: "650106",
            countyName: "头屯河区"
          }]
        }, {
          cityCode: "659002",
          cityName: "阿拉尔市",
          county: [{
            countyCode: "659002-1",
            countyName: "阿拉尔市"
          }]
        }, {
          cityCode: "653200",
          cityName: "和田地区",
          county: [{
            countyCode: "653222",
            countyName: "墨玉县"
          }, {
            countyCode: "653226",
            countyName: "于田县"
          }, {
            countyCode: "653223",
            countyName: "皮山县"
          }, {
            countyCode: "653221",
            countyName: "和田县"
          }, {
            countyCode: "653224",
            countyName: "洛浦县"
          }, {
            countyCode: "653225",
            countyName: "策勒县"
          }, {
            countyCode: "653227",
            countyName: "民丰县"
          }, {
            countyCode: "653201",
            countyName: "和田市"
          }]
        }, {
          cityCode: "659003",
          cityName: "图木舒克市",
          county: [{
            countyCode: "659003-1",
            countyName: "图木舒克市"
          }]
        }, {
          cityCode: "695005",
          cityName: "北屯市",
          county: [{
            countyCode: "695005-1",
            countyName: "北屯市"
          }]
        }, {
          cityCode: "652300",
          cityName: "昌吉回族自治州",
          county: [{
            countyCode: "652302",
            countyName: "阜康市"
          }, {
            countyCode: "652324",
            countyName: "玛纳斯县"
          }, {
            countyCode: "652325",
            countyName: "奇台县"
          }, {
            countyCode: "652323",
            countyName: "呼图壁县"
          }, {
            countyCode: "652301",
            countyName: "昌吉市"
          }, {
            countyCode: "652327",
            countyName: "吉木萨尔县"
          }, {
            countyCode: "652328",
            countyName: "木垒哈萨克自治县"
          }, {
            countyCode: "652303",
            countyName: "准东开发区"
          }]
        }, {
          cityCode: "653100",
          cityName: "喀什地区",
          county: [{
            countyCode: "653128",
            countyName: "岳普湖县"
          }, {
            countyCode: "653129",
            countyName: "伽师县"
          }, {
            countyCode: "653126",
            countyName: "叶城县"
          }, {
            countyCode: "653122",
            countyName: "疏勒县"
          }, {
            countyCode: "653124",
            countyName: "泽普县"
          }, {
            countyCode: "653121",
            countyName: "疏附县"
          }, {
            countyCode: "653131",
            countyName: "塔什库尔干塔吉克自治县"
          }, {
            countyCode: "653130",
            countyName: "巴楚县"
          }, {
            countyCode: "653123",
            countyName: "英吉沙县"
          }, {
            countyCode: "653127",
            countyName: "麦盖提县"
          }, {
            countyCode: "653125",
            countyName: "莎车县"
          }, {
            countyCode: "653101",
            countyName: "喀什市"
          }]
        }, {
          cityCode: "659001",
          cityName: "石河子市",
          county: [{
            countyCode: "659001-1",
            countyName: "石河子市"
          }]
        }, {
          cityCode: "695006",
          cityName: "铁门关市",
          county: [{
            countyCode: "695006-1",
            countyName: "铁门关市"
          }]
        }, {
          cityCode: "652900",
          cityName: "阿克苏地区",
          county: [{
            countyCode: "652901",
            countyName: "阿克苏市"
          }, {
            countyCode: "652922",
            countyName: "温宿县"
          }, {
            countyCode: "652928",
            countyName: "阿瓦提县"
          }, {
            countyCode: "652929",
            countyName: "柯坪县"
          }, {
            countyCode: "652925",
            countyName: "新和县"
          }, {
            countyCode: "652924",
            countyName: "沙雅县"
          }, {
            countyCode: "652927",
            countyName: "乌什县"
          }, {
            countyCode: "652923",
            countyName: "库车县"
          }, {
            countyCode: "652926",
            countyName: "拜城县"
          }]
        }, {
          cityCode: "653000",
          cityName: "克孜勒苏柯尔克孜自治州",
          county: [{
            countyCode: "653023",
            countyName: "阿合奇县"
          }, {
            countyCode: "653022",
            countyName: "阿克陶县"
          }, {
            countyCode: "653001",
            countyName: "阿图什市"
          }, {
            countyCode: "653024",
            countyName: "乌恰县"
          }]
        }, {
          cityCode: "659004",
          cityName: "五家渠市",
          county: [{
            countyCode: "659004-1",
            countyName: "五家渠市"
          }]
        }, {
          cityCode: "652700",
          cityName: "博尔塔拉蒙古自治州",
          county: [{
            countyCode: "652701",
            countyName: "博乐市"
          }, {
            countyCode: "652723",
            countyName: "温泉县"
          }, {
            countyCode: "652722",
            countyName: "精河县"
          }]
        }, {
          cityCode: "695007",
          cityName: "双河市",
          county: [{
            countyCode: "695007-1",
            countyName: "双河市"
          }]
        }]
      }, {
        provinceCode: "330000",
        provinceName: "浙江省",
        city: [{
          cityCode: "330900",
          cityName: "舟山市",
          county: [{
            countyCode: "330922",
            countyName: "嵊泗县"
          }, {
            countyCode: "330903",
            countyName: "普陀区"
          }, {
            countyCode: "330902",
            countyName: "定海区"
          }, {
            countyCode: "330921",
            countyName: "岱山县"
          }]
        }, {
          cityCode: "330800",
          cityName: "衢州市",
          county: [{
            countyCode: "330824",
            countyName: "开化县"
          }, {
            countyCode: "330803",
            countyName: "衢江区"
          }, {
            countyCode: "330881",
            countyName: "江山市"
          }, {
            countyCode: "330802",
            countyName: "柯城区"
          }, {
            countyCode: "330822",
            countyName: "常山县"
          }, {
            countyCode: "330825",
            countyName: "龙游县"
          }]
        }, {
          cityCode: "330700",
          cityName: "金华市",
          county: [{
            countyCode: "330782",
            countyName: "义乌市"
          }, {
            countyCode: "330784",
            countyName: "永康市"
          }, {
            countyCode: "330727",
            countyName: "磐安县"
          }, {
            countyCode: "330702",
            countyName: "婺城区"
          }, {
            countyCode: "330726",
            countyName: "浦江县"
          }, {
            countyCode: "330783",
            countyName: "东阳市"
          }, {
            countyCode: "330781",
            countyName: "兰溪市"
          }, {
            countyCode: "330723",
            countyName: "武义县"
          }, {
            countyCode: "330703",
            countyName: "金东区"
          }]
        }, {
          cityCode: "330300",
          cityName: "温州市",
          county: [{
            countyCode: "330302",
            countyName: "鹿城区"
          }, {
            countyCode: "330322",
            countyName: "洞头区"
          }, {
            countyCode: "330381",
            countyName: "瑞安市"
          }, {
            countyCode: "330329",
            countyName: "泰顺县"
          }, {
            countyCode: "330324",
            countyName: "永嘉县"
          }, {
            countyCode: "330304",
            countyName: "瓯海区"
          }, {
            countyCode: "330327",
            countyName: "苍南县"
          }, {
            countyCode: "330328",
            countyName: "文成县"
          }, {
            countyCode: "330326",
            countyName: "平阳县"
          }, {
            countyCode: "330382",
            countyName: "乐清市"
          }, {
            countyCode: "330303",
            countyName: "龙湾区"
          }]
        }, {
          cityCode: "330200",
          cityName: "宁波市",
          county: [{
            countyCode: "330204",
            countyName: "江东区"
          }, {
            countyCode: "330225",
            countyName: "象山县"
          }, {
            countyCode: "330212",
            countyName: "鄞州区"
          }, {
            countyCode: "330226",
            countyName: "宁海县"
          }, {
            countyCode: "330283",
            countyName: "奉化区"
          }, {
            countyCode: "330282",
            countyName: "慈溪市"
          }, {
            countyCode: "330281",
            countyName: "余姚市"
          }, {
            countyCode: "330211",
            countyName: "镇海区"
          }, {
            countyCode: "330205",
            countyName: "江北区"
          }, {
            countyCode: "330206",
            countyName: "北仑区"
          }, {
            countyCode: "330203",
            countyName: "海曙区"
          }]
        }, {
          cityCode: "330100",
          cityName: "杭州市",
          county: [{
            countyCode: "330110",
            countyName: "余杭区"
          }, {
            countyCode: "330106",
            countyName: "西湖区"
          }, {
            countyCode: "330109",
            countyName: "萧山区"
          }, {
            countyCode: "330185",
            countyName: "临安区"
          }, {
            countyCode: "330122",
            countyName: "桐庐县"
          }, {
            countyCode: "330103",
            countyName: "下城区"
          }, {
            countyCode: "330182",
            countyName: "建德市"
          }, {
            countyCode: "330102",
            countyName: "上城区"
          }, {
            countyCode: "330127",
            countyName: "淳安县"
          }, {
            countyCode: "330105",
            countyName: "拱墅区"
          }, {
            countyCode: "330104",
            countyName: "江干区"
          }, {
            countyCode: "330108",
            countyName: "滨江区"
          }, {
            countyCode: "330183",
            countyName: "富阳区"
          }]
        }, {
          cityCode: "330400",
          cityName: "嘉兴市",
          county: [{
            countyCode: "330482",
            countyName: "平湖市"
          }, {
            countyCode: "330402",
            countyName: "南湖区"
          }, {
            countyCode: "330481",
            countyName: "海宁市"
          }, {
            countyCode: "330421",
            countyName: "嘉善县"
          }, {
            countyCode: "330424",
            countyName: "海盐县"
          }, {
            countyCode: "330411",
            countyName: "秀洲区"
          }, {
            countyCode: "330483",
            countyName: "桐乡市"
          }]
        }, {
          cityCode: "330600",
          cityName: "绍兴市",
          county: [{
            countyCode: "330681",
            countyName: "诸暨市"
          }, {
            countyCode: "330602",
            countyName: "越城区"
          }, {
            countyCode: "330682",
            countyName: "上虞区"
          }, {
            countyCode: "330683",
            countyName: "嵊州市"
          }, {
            countyCode: "330624",
            countyName: "新昌县"
          }, {
            countyCode: "330621",
            countyName: "柯桥区"
          }]
        }, {
          cityCode: "331100",
          cityName: "丽水市",
          county: [{
            countyCode: "331125",
            countyName: "云和县"
          }, {
            countyCode: "331121",
            countyName: "青田县"
          }, {
            countyCode: "331126",
            countyName: "庆元县"
          }, {
            countyCode: "331124",
            countyName: "松阳县"
          }, {
            countyCode: "331123",
            countyName: "遂昌县"
          }, {
            countyCode: "331122",
            countyName: "缙云县"
          }, {
            countyCode: "331127",
            countyName: "景宁畲族自治县"
          }, {
            countyCode: "331102",
            countyName: "莲都区"
          }, {
            countyCode: "331181",
            countyName: "龙泉市"
          }]
        }, {
          cityCode: "330500",
          cityName: "湖州市",
          county: [{
            countyCode: "330522",
            countyName: "长兴县"
          }, {
            countyCode: "330503",
            countyName: "南浔区"
          }, {
            countyCode: "330523",
            countyName: "安吉县"
          }, {
            countyCode: "330502",
            countyName: "吴兴区"
          }, {
            countyCode: "330521",
            countyName: "德清县"
          }]
        }, {
          cityCode: "331000",
          cityName: "台州市",
          county: [{
            countyCode: "331024",
            countyName: "仙居县"
          }, {
            countyCode: "331021",
            countyName: "玉环市"
          }, {
            countyCode: "331082",
            countyName: "临海市"
          }, {
            countyCode: "331023",
            countyName: "天台县"
          }, {
            countyCode: "331003",
            countyName: "黄岩区"
          }, {
            countyCode: "331004",
            countyName: "路桥区"
          }, {
            countyCode: "331022",
            countyName: "三门县"
          }, {
            countyCode: "331002",
            countyName: "椒江区"
          }, {
            countyCode: "331081",
            countyName: "温岭市"
          }]
        }]
      }, {
        provinceCode: "320000",
        provinceName: "江苏省",
        city: [{
          cityCode: "320200",
          cityName: "无锡市",
          county: [{
            countyCode: "320282",
            countyName: "宜兴市"
          }, {
            countyCode: "320205",
            countyName: "锡山区"
          }, {
            countyCode: "320211",
            countyName: "滨湖区"
          }, {
            countyCode: "320281",
            countyName: "江阴市"
          }, {
            countyCode: "320206",
            countyName: "惠山区"
          }, {
            countyCode: "320207",
            countyName: "梁溪区"
          }, {
            countyCode: "320214",
            countyName: "新吴区"
          }]
        }, {
          cityCode: "320400",
          cityName: "常州市",
          county: [{
            countyCode: "320412",
            countyName: "武进区"
          }, {
            countyCode: "320405",
            countyName: "戚墅堰区"
          }, {
            countyCode: "320481",
            countyName: "溧阳市"
          }, {
            countyCode: "320402",
            countyName: "天宁区"
          }, {
            countyCode: "320411",
            countyName: "新北区"
          }, {
            countyCode: "320404",
            countyName: "钟楼区"
          }, {
            countyCode: "320482",
            countyName: "金坛区"
          }]
        }, {
          cityCode: "320500",
          cityName: "苏州市",
          county: [{
            countyCode: "320509",
            countyName: "吴江区"
          }, {
            countyCode: "320506",
            countyName: "吴中区"
          }, {
            countyCode: "320582",
            countyName: "张家港市"
          }, {
            countyCode: "320508",
            countyName: "姑苏区"
          }, {
            countyCode: "320571",
            countyName: "苏州工业园区"
          }, {
            countyCode: "320583",
            countyName: "昆山市"
          }, {
            countyCode: "320581",
            countyName: "常熟市"
          }, {
            countyCode: "320505",
            countyName: "虎丘区"
          }, {
            countyCode: "320507",
            countyName: "相城区"
          }, {
            countyCode: "320585",
            countyName: "太仓市"
          }]
        }, {
          cityCode: "320800",
          cityName: "淮安市",
          county: [{
            countyCode: "320811",
            countyName: "清浦区"
          }, {
            countyCode: "320829",
            countyName: "洪泽区"
          }, {
            countyCode: "320802",
            countyName: "清江浦区"
          }, {
            countyCode: "320803",
            countyName: "淮安区"
          }, {
            countyCode: "320831",
            countyName: "金湖县"
          }, {
            countyCode: "320804",
            countyName: "淮阴区"
          }, {
            countyCode: "320830",
            countyName: "盱眙县"
          }, {
            countyCode: "320826",
            countyName: "涟水县"
          }]
        }, {
          cityCode: "320300",
          cityName: "徐州市",
          county: [{
            countyCode: "320381",
            countyName: "新沂市"
          }, {
            countyCode: "320324",
            countyName: "睢宁县"
          }, {
            countyCode: "320311",
            countyName: "泉山区"
          }, {
            countyCode: "320302",
            countyName: "鼓楼区"
          }, {
            countyCode: "320305",
            countyName: "贾汪区"
          }, {
            countyCode: "320303",
            countyName: "云龙区"
          }, {
            countyCode: "320312",
            countyName: "铜山区"
          }, {
            countyCode: "320321",
            countyName: "丰县"
          }, {
            countyCode: "320322",
            countyName: "沛县"
          }, {
            countyCode: "320382",
            countyName: "邳州市"
          }]
        }, {
          cityCode: "321200",
          cityName: "泰州市",
          county: [{
            countyCode: "321203",
            countyName: "高港区"
          }, {
            countyCode: "321202",
            countyName: "海陵区"
          }, {
            countyCode: "321283",
            countyName: "泰兴市"
          }, {
            countyCode: "321284",
            countyName: "姜堰区"
          }, {
            countyCode: "321282",
            countyName: "靖江市"
          }, {
            countyCode: "321281",
            countyName: "兴化市"
          }]
        }, {
          cityCode: "320700",
          cityName: "连云港市",
          county: [{
            countyCode: "320723",
            countyName: "灌云县"
          }, {
            countyCode: "320721",
            countyName: "赣榆区"
          }, {
            countyCode: "320705",
            countyName: "新浦区"
          }, {
            countyCode: "320722",
            countyName: "东海县"
          }, {
            countyCode: "320706",
            countyName: "海州区"
          }, {
            countyCode: "320703",
            countyName: "连云区"
          }, {
            countyCode: "320724",
            countyName: "灌南县"
          }]
        }, {
          cityCode: "321100",
          cityName: "镇江市",
          county: [{
            countyCode: "321112",
            countyName: "丹徒区"
          }, {
            countyCode: "321102",
            countyName: "京口区"
          }, {
            countyCode: "321182",
            countyName: "扬中市"
          }, {
            countyCode: "321181",
            countyName: "丹阳市"
          }, {
            countyCode: "321183",
            countyName: "句容市"
          }, {
            countyCode: "321111",
            countyName: "润州区"
          }]
        }, {
          cityCode: "320600",
          cityName: "南通市",
          county: [{
            countyCode: "320602",
            countyName: "崇川区"
          }, {
            countyCode: "320684",
            countyName: "海门市"
          }, {
            countyCode: "320681",
            countyName: "启东市"
          }, {
            countyCode: "320612",
            countyName: "通州区"
          }, {
            countyCode: "320621",
            countyName: "海安市"
          }, {
            countyCode: "320623",
            countyName: "如东县"
          }, {
            countyCode: "320611",
            countyName: "港闸区"
          }, {
            countyCode: "320682",
            countyName: "如皋市"
          }]
        }, {
          cityCode: "320900",
          cityName: "盐城市",
          county: [{
            countyCode: "320922",
            countyName: "滨海县"
          }, {
            countyCode: "320981",
            countyName: "东台市"
          }, {
            countyCode: "320925",
            countyName: "建湖县"
          }, {
            countyCode: "320903",
            countyName: "盐都区"
          }, {
            countyCode: "320921",
            countyName: "响水县"
          }, {
            countyCode: "320924",
            countyName: "射阳县"
          }, {
            countyCode: "320902",
            countyName: "亭湖区"
          }, {
            countyCode: "320923",
            countyName: "阜宁县"
          }, {
            countyCode: "320982",
            countyName: "大丰区"
          }]
        }, {
          cityCode: "320100",
          cityName: "南京市",
          county: [{
            countyCode: "320106",
            countyName: "鼓楼区"
          }, {
            countyCode: "320115",
            countyName: "江宁区"
          }, {
            countyCode: "320111",
            countyName: "浦口区"
          }, {
            countyCode: "320116",
            countyName: "六合区"
          }, {
            countyCode: "320104",
            countyName: "秦淮区"
          }, {
            countyCode: "320124",
            countyName: "溧水区"
          }, {
            countyCode: "320125",
            countyName: "高淳区"
          }, {
            countyCode: "320113",
            countyName: "栖霞区"
          }, {
            countyCode: "320107",
            countyName: "下关区"
          }, {
            countyCode: "320102",
            countyName: "玄武区"
          }, {
            countyCode: "320105",
            countyName: "建邺区"
          }, {
            countyCode: "320114",
            countyName: "雨花台区"
          }, {
            countyCode: "320103",
            countyName: "白下区"
          }]
        }, {
          cityCode: "321000",
          cityName: "扬州市",
          county: [{
            countyCode: "321084",
            countyName: "高邮市"
          }, {
            countyCode: "321023",
            countyName: "宝应县"
          }, {
            countyCode: "321012",
            countyName: "江都区"
          }, {
            countyCode: "321003",
            countyName: "邗江区"
          }, {
            countyCode: "321081",
            countyName: "仪征市"
          }, {
            countyCode: "321002",
            countyName: "广陵区"
          }]
        }, {
          cityCode: "321300",
          cityName: "宿迁市",
          county: [{
            countyCode: "321323",
            countyName: "泗阳县"
          }, {
            countyCode: "321302",
            countyName: "宿城区"
          }, {
            countyCode: "321311",
            countyName: "宿豫区"
          }, {
            countyCode: "321324",
            countyName: "泗洪县"
          }, {
            countyCode: "321322",
            countyName: "沭阳县"
          }]
        }]
      }, {
        provinceCode: "440000",
        provinceName: "广东省",
        city: [{
          cityCode: "445100",
          cityName: "潮州市",
          county: [{
            countyCode: "445123",
            countyName: "潮安县"
          }, {
            countyCode: "445122",
            countyName: "饶平县"
          }, {
            countyCode: "445121",
            countyName: "潮安区"
          }, {
            countyCode: "445102",
            countyName: "湘桥区"
          }]
        }, {
          cityCode: "441800",
          cityName: "清远市",
          county: [{
            countyCode: "441802",
            countyName: "清城区"
          }, {
            countyCode: "441825",
            countyName: "连山壮族瑶族自治县"
          }, {
            countyCode: "441821",
            countyName: "佛冈县"
          }, {
            countyCode: "441882",
            countyName: "连州市"
          }, {
            countyCode: "441823",
            countyName: "阳山县"
          }, {
            countyCode: "441826",
            countyName: "连南瑶族自治县"
          }, {
            countyCode: "441827",
            countyName: "清新区"
          }, {
            countyCode: "441881",
            countyName: "英德市"
          }]
        }, {
          cityCode: "441300",
          cityName: "惠州市",
          county: [{
            countyCode: "441303",
            countyName: "惠阳区"
          }, {
            countyCode: "441322",
            countyName: "博罗县"
          }, {
            countyCode: "441323",
            countyName: "惠东县"
          }, {
            countyCode: "441324",
            countyName: "龙门县"
          }, {
            countyCode: "441302",
            countyName: "惠城区"
          }]
        }, {
          cityCode: "445200",
          cityName: "揭阳市",
          county: [{
            countyCode: "445221",
            countyName: "揭东区"
          }, {
            countyCode: "445224",
            countyName: "惠来县"
          }, {
            countyCode: "445222",
            countyName: "揭西县"
          }, {
            countyCode: "445281",
            countyName: "普宁市"
          }, {
            countyCode: "445202",
            countyName: "榕城区"
          }]
        }, {
          cityCode: "440300",
          cityName: "深圳市",
          county: [{
            countyCode: "440303",
            countyName: "罗湖区"
          }, {
            countyCode: "440306",
            countyName: "宝安区"
          }, {
            countyCode: "440305",
            countyName: "南山区"
          }, {
            countyCode: "440307",
            countyName: "龙岗区"
          }, {
            countyCode: "440311",
            countyName: "光明区"
          }, {
            countyCode: "440309",
            countyName: "龙华区"
          }, {
            countyCode: "440308",
            countyName: "盐田区"
          }, {
            countyCode: "440304",
            countyName: "福田区"
          }, {
            countyCode: "440312",
            countyName: "坪山区"
          }, {
            countyCode: "440313",
            countyName: "大鹏新区"
          }]
        }, {
          cityCode: "441900",
          cityName: "东莞市",
          county: [{
            countyCode: "441900-1",
            countyName: "东莞市"
          }]
        }, {
          cityCode: "441400",
          cityName: "梅州市",
          county: [{
            countyCode: "441422",
            countyName: "大埔县"
          }, {
            countyCode: "441423",
            countyName: "丰顺县"
          }, {
            countyCode: "441426",
            countyName: "平远县"
          }, {
            countyCode: "441481",
            countyName: "兴宁市"
          }, {
            countyCode: "441427",
            countyName: "蕉岭县"
          }, {
            countyCode: "441421",
            countyName: "梅县区"
          }, {
            countyCode: "441424",
            countyName: "五华县"
          }, {
            countyCode: "441402",
            countyName: "梅江区"
          }]
        }, {
          cityCode: "440500-1",
          cityName: "汕头市",
          county: [{
            countyCode: "440515",
            countyName: "澄海区"
          }, {
            countyCode: "440511",
            countyName: "金平区"
          }, {
            countyCode: "440523",
            countyName: "南澳县"
          }, {
            countyCode: "440513",
            countyName: "潮阳区"
          }, {
            countyCode: "440514",
            countyName: "潮南区"
          }, {
            countyCode: "440507",
            countyName: "龙湖区"
          }, {
            countyCode: "440512",
            countyName: "濠江区"
          }]
        }, {
          cityCode: "441600",
          cityName: "河源市",
          county: [{
            countyCode: "441602",
            countyName: "源城区"
          }, {
            countyCode: "441621",
            countyName: "紫金县"
          }, {
            countyCode: "441624",
            countyName: "和平县"
          }, {
            countyCode: "441622",
            countyName: "龙川县"
          }, {
            countyCode: "441625",
            countyName: "东源县"
          }, {
            countyCode: "441623",
            countyName: "连平县"
          }]
        }, {
          cityCode: "445300",
          cityName: "云浮市",
          county: [{
            countyCode: "445322",
            countyName: "郁南县"
          }, {
            countyCode: "445381",
            countyName: "罗定市"
          }, {
            countyCode: "445302",
            countyName: "云城区"
          }, {
            countyCode: "445321",
            countyName: "新兴县"
          }, {
            countyCode: "445323",
            countyName: "云安区"
          }]
        }, {
          cityCode: "440400",
          cityName: "珠海市",
          county: [{
            countyCode: "440404",
            countyName: "金湾区"
          }, {
            countyCode: "440403",
            countyName: "斗门区"
          }, {
            countyCode: "440402",
            countyName: "香洲区"
          }]
        }, {
          cityCode: "440700",
          cityName: "江门市",
          county: [{
            countyCode: "440785",
            countyName: "恩平市"
          }, {
            countyCode: "440704",
            countyName: "江海区"
          }, {
            countyCode: "440705",
            countyName: "新会区"
          }, {
            countyCode: "440784",
            countyName: "鹤山市"
          }, {
            countyCode: "440703",
            countyName: "蓬江区"
          }, {
            countyCode: "440783",
            countyName: "开平市"
          }, {
            countyCode: "440781",
            countyName: "台山市"
          }]
        }, {
          cityCode: "441500",
          cityName: "汕尾市",
          county: [{
            countyCode: "441523",
            countyName: "陆河县"
          }, {
            countyCode: "441502",
            countyName: "城区"
          }, {
            countyCode: "441581",
            countyName: "陆丰市"
          }, {
            countyCode: "441521",
            countyName: "海丰县"
          }]
        }, {
          cityCode: "441200",
          cityName: "肇庆市",
          county: [{
            countyCode: "441203",
            countyName: "鼎湖区"
          }, {
            countyCode: "441224",
            countyName: "怀集县"
          }, {
            countyCode: "441283",
            countyName: "高要区"
          }, {
            countyCode: "441284",
            countyName: "四会市"
          }, {
            countyCode: "441202",
            countyName: "端州区"
          }, {
            countyCode: "441225",
            countyName: "封开县"
          }, {
            countyCode: "441226",
            countyName: "德庆县"
          }, {
            countyCode: "441223",
            countyName: "广宁县"
          }]
        }, {
          cityCode: "440200",
          cityName: "韶关市",
          county: [{
            countyCode: "440222",
            countyName: "始兴县"
          }, {
            countyCode: "440281",
            countyName: "乐昌市"
          }, {
            countyCode: "440203",
            countyName: "武江区"
          }, {
            countyCode: "440233",
            countyName: "新丰县"
          }, {
            countyCode: "440224",
            countyName: "仁化县"
          }, {
            countyCode: "440232",
            countyName: "乳源瑶族自治县"
          }, {
            countyCode: "440229",
            countyName: "翁源县"
          }, {
            countyCode: "440282",
            countyName: "南雄市"
          }, {
            countyCode: "440205",
            countyName: "曲江区"
          }, {
            countyCode: "440204",
            countyName: "浈江区"
          }]
        }, {
          cityCode: "440600",
          cityName: "佛山市",
          county: [{
            countyCode: "440606",
            countyName: "顺德区"
          }, {
            countyCode: "440604",
            countyName: "禅城区"
          }, {
            countyCode: "440607",
            countyName: "三水区"
          }, {
            countyCode: "440608",
            countyName: "高明区"
          }, {
            countyCode: "440605",
            countyName: "南海区"
          }]
        }, {
          cityCode: "440100",
          cityName: "广州市",
          county: [{
            countyCode: "440114",
            countyName: "花都区"
          }, {
            countyCode: "440111",
            countyName: "白云区"
          }, {
            countyCode: "440115",
            countyName: "南沙区"
          }, {
            countyCode: "440113",
            countyName: "番禺区"
          }, {
            countyCode: "440183",
            countyName: "增城区"
          }, {
            countyCode: "440112",
            countyName: "黄埔区"
          }, {
            countyCode: "440106",
            countyName: "天河区"
          }, {
            countyCode: "440184",
            countyName: "从化区"
          }, {
            countyCode: "440105",
            countyName: "海珠区"
          }, {
            countyCode: "440103",
            countyName: "荔湾区"
          }, {
            countyCode: "440104",
            countyName: "越秀区"
          }]
        }, {
          cityCode: "442000",
          cityName: "中山市",
          county: [{
            countyCode: "442000-1",
            countyName: "中山市"
          }]
        }, {
          cityCode: "440800",
          cityName: "湛江市",
          county: [{
            countyCode: "440881",
            countyName: "廉江市"
          }, {
            countyCode: "440804",
            countyName: "坡头区"
          }, {
            countyCode: "440882",
            countyName: "雷州市"
          }, {
            countyCode: "440823",
            countyName: "遂溪县"
          }, {
            countyCode: "440803",
            countyName: "霞山区"
          }, {
            countyCode: "440825",
            countyName: "徐闻县"
          }, {
            countyCode: "440802",
            countyName: "赤坎区"
          }, {
            countyCode: "440811",
            countyName: "麻章区"
          }, {
            countyCode: "440883",
            countyName: "吴川市"
          }]
        }, {
          cityCode: "441700",
          cityName: "阳江市",
          county: [{
            countyCode: "441781",
            countyName: "阳春市"
          }, {
            countyCode: "441702",
            countyName: "江城区"
          }, {
            countyCode: "441721",
            countyName: "阳西县"
          }, {
            countyCode: "441723",
            countyName: "阳东区"
          }]
        }, {
          cityCode: "440900",
          cityName: "茂名市",
          county: [{
            countyCode: "440902",
            countyName: "茂南区"
          }, {
            countyCode: "440923",
            countyName: "电白区"
          }, {
            countyCode: "440982",
            countyName: "化州市"
          }, {
            countyCode: "440903",
            countyName: "茂港区 "
          }, {
            countyCode: "440981",
            countyName: "高州市"
          }, {
            countyCode: "440983",
            countyName: "信宜市"
          }]
        }]
      }, {
        provinceCode: "810000",
        provinceName: "香港特别行政区",
        city: [{
          cityCode: "810000-1",
          cityName: "香港",
          county: [{
            countyCode: "810400",
            countyName: "离岛"
          }, {
            countyCode: "810100",
            countyName: "香港岛"
          }, {
            countyCode: "810300",
            countyName: "新界"
          }, {
            countyCode: "810200",
            countyName: "九龙"
          }]
        }]
      }]
    },
    d551: function (e, t, n) {
      var o = n("3b2d").default,
        c = n("e6db");
      e.exports = function (e) {
        var t = c(e, "string");
        return "symbol" == o(t) ? t : t + ""
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    dc03: function (e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0;
      var o = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z0-9_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
        c = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
        a = /([a-zA-Z0-9_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

      function r(e) {
        for (var t = {}, n = e.split(","), o = 0; o < n.length; o += 1) t[n[o]] = !0;
        return t
      }
      var u = r("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"),
        i = r("address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"),
        s = r("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),
        y = r("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),
        d = r("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");
      t.default = function (e, t) {
        var n, r, l, f = e,
          m = [];

        function p(e, n) {
          var o;
          if (n)
            for (n = n.toLowerCase(), o = m.length - 1; o >= 0 && m[o] !== n; o -= 1);
          else o = 0;
          if (o >= 0) {
            for (var c = m.length - 1; c >= o; c -= 1) t.end && t.end(m[c]);
            m.length = o
          }
        }

        function h(e, n, o, c) {
          if (n = n.toLowerCase(), i[n])
            for (; m.last() && s[m.last()];) p(0, m.last());
          if (y[n] && m.last() === n && p(0, n), (c = u[n] || !!c) || m.push(n), t.start) {
            var r = [];
            o.replace(a, (function (e, t) {
              var n = arguments[2] || arguments[3] || arguments[4] || (d[t] ? t : "");
              r.push({
                name: t,
                value: n,
                escaped: n.replace(/(^|[^\\])"/g, '$1\\"')
              })
            })), t.start && t.start(n, r, c)
          }
        }
        for (m.last = function () {
            return m[m.length - 1]
          }; e;) {
          if (r = !0, 0 === e.indexOf("</") ? (l = e.match(c), l && (e = e.substring(l[0].length), l[0].replace(c, p), r = !1)) : 0 === e.indexOf("<") && (l = e.match(o), l && (e = e.substring(l[0].length), l[0].replace(o, h), r = !1)), r) {
            n = e.indexOf("<");
            for (var C = ""; 0 === n;) C += "<", n = (e = e.substring(1)).indexOf("<");
            C += n < 0 ? e : e.substring(0, n), e = n < 0 ? "" : e.substring(n), t.chars && t.chars(C)
          }
          if (e === f) throw new Error("Parse Error: ".concat(e));
          f = e
        }
        p()
      }
    },
    dd3e: function (e, t) {
      e.exports = function () {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    df3c: function (e, t, n) {
      (function (e, o) {
        var c = n("47a9");
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.createApp = wt, t.createComponent = Et, t.createPage = jt, t.createPlugin = Dt, t.createSubpackageApp = $t, t.default = void 0;
        var a, r = c(n("34cf")),
          u = c(n("7ca3")),
          i = c(n("931d")),
          s = c(n("af34")),
          y = c(n("3b2d")),
          d = n("d3b4"),
          l = c(n("3240"));

        function f(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            t && (o = o.filter((function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), n.push.apply(n, o)
          }
          return n
        }

        function m(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? f(Object(n), !0).forEach((function (t) {
              (0, u.default)(e, t, n[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : f(Object(n)).forEach((function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }))
          }
          return e
        }
        var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          h = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

        function C() {
          var t, n = e.getStorageSync("uni_id_token") || "",
            o = n.split(".");
          if (!n || 3 !== o.length) return {
            uid: null,
            role: [],
            permission: [],
            tokenExpired: 0
          };
          try {
            t = JSON.parse(function (e) {
              return decodeURIComponent(a(e).split("").map((function (e) {
                return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
              })).join(""))
            }(o[1]))
          } catch (e) {
            throw new Error("获取当前用户信息出错，详细错误信息为：" + e.message)
          }
          return t.tokenExpired = 1e3 * t.exp, delete t.exp, delete t.iat, t
        }
        a = "function" != typeof atob ? function (e) {
          if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !h.test(e)) throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
          var t;
          e += "==".slice(2 - (3 & e.length));
          for (var n, o, c = "", a = 0; a < e.length;) t = p.indexOf(e.charAt(a++)) << 18 | p.indexOf(e.charAt(a++)) << 12 | (n = p.indexOf(e.charAt(a++))) << 6 | (o = p.indexOf(e.charAt(a++))), c += 64 === n ? String.fromCharCode(t >> 16 & 255) : 64 === o ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);
          return c
        } : atob;
        var g = Object.prototype.toString,
          v = Object.prototype.hasOwnProperty;

        function N(e) {
          return "function" == typeof e
        }

        function b(e) {
          return "string" == typeof e
        }

        function _(e) {
          return "[object Object]" === g.call(e)
        }

        function x(e, t) {
          return v.call(e, t)
        }

        function w() {}

        function k(e) {
          var t = Object.create(null);
          return function (n) {
            return t[n] || (t[n] = e(n))
          }
        }
        var O = /-(\w)/g,
          S = k((function (e) {
            return e.replace(O, (function (e, t) {
              return t ? t.toUpperCase() : ""
            }))
          }));

        function P(e) {
          var t = {};
          return _(e) && Object.keys(e).sort().forEach((function (n) {
            t[n] = e[n]
          })), Object.keys(t) ? t : e
        }
        var A = ["invoke", "success", "fail", "complete", "returnValue"],
          T = {},
          I = {};

        function j(e, t) {
          Object.keys(t).forEach((function (n) {
            -1 !== A.indexOf(n) && N(t[n]) && (e[n] = function (e, t) {
              var n = t ? e ? e.concat(t) : Array.isArray(t) ? t : [t] : e;
              return n ? function (e) {
                for (var t = [], n = 0; n < e.length; n++) - 1 === t.indexOf(e[n]) && t.push(e[n]);
                return t
              }(n) : n
            }(e[n], t[n]))
          }))
        }

        function E(e, t) {
          e && t && Object.keys(t).forEach((function (n) {
            -1 !== A.indexOf(n) && N(t[n]) && function (e, t) {
              var n = e.indexOf(t); - 1 !== n && e.splice(n, 1)
            }(e[n], t[n])
          }))
        }

        function $(e, t) {
          return function (n) {
            return e(n, t) || n
          }
        }

        function D(e) {
          return !!e && ("object" === (0, y.default)(e) || "function" == typeof e) && "function" == typeof e.then
        }

        function L(e, t, n) {
          for (var o = !1, c = 0; c < e.length; c++) {
            var a = e[c];
            if (o) o = Promise.resolve($(a, n));
            else {
              var r = a(t, n);
              if (D(r) && (o = Promise.resolve(r)), !1 === r) return {
                then: function () {}
              }
            }
          }
          return o || {
            then: function (e) {
              return e(t)
            }
          }
        }

        function M(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return ["success", "fail", "complete"].forEach((function (n) {
            if (Array.isArray(e[n])) {
              var o = t[n];
              t[n] = function (c) {
                L(e[n], c, t).then((function (e) {
                  return N(o) && o(e) || e
                }))
              }
            }
          })), t
        }

        function U(e, t) {
          var n = [];
          Array.isArray(T.returnValue) && n.push.apply(n, (0, s.default)(T.returnValue));
          var o = I[e];
          return o && Array.isArray(o.returnValue) && n.push.apply(n, (0, s.default)(o.returnValue)), n.forEach((function (e) {
            t = e(t) || t
          })), t
        }

        function R(e) {
          var t = Object.create(null);
          Object.keys(T).forEach((function (e) {
            "returnValue" !== e && (t[e] = T[e].slice())
          }));
          var n = I[e];
          return n && Object.keys(n).forEach((function (e) {
            "returnValue" !== e && (t[e] = (t[e] || []).concat(n[e]))
          })), t
        }

        function F(e, t, n) {
          for (var o = arguments.length, c = new Array(o > 3 ? o - 3 : 0), a = 3; a < o; a++) c[a - 3] = arguments[a];
          var r = R(e);
          if (r && Object.keys(r).length) {
            if (Array.isArray(r.invoke)) {
              var u = L(r.invoke, n);
              return u.then((function (n) {
                return t.apply(void 0, [M(R(e), n)].concat(c))
              }))
            }
            return t.apply(void 0, [M(r, n)].concat(c))
          }
          return t.apply(void 0, [n].concat(c))
        }
        var q = {
            returnValue: function (e) {
              return D(e) ? new Promise((function (t, n) {
                e.then((function (e) {
                  e ? e[0] ? n(e[0]) : t(e[1]) : t(e)
                }))
              })) : e
            }
          },
          B = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|rpx2px|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/,
          V = /^create|Manager$/,
          H = ["createBLEConnection"],
          z = ["createBLEConnection", "createPushMessage"],
          K = /^on|^off/;

        function W(e) {
          return V.test(e) && -1 === H.indexOf(e)
        }

        function J(e) {
          return B.test(e) && -1 === z.indexOf(e)
        }

        function G(e) {
          return e.then((function (e) {
            return [null, e]
          })).catch((function (e) {
            return [e]
          }))
        }

        function Q(e, t) {
          return function (e) {
            return !(W(e) || J(e) || function (e) {
              return K.test(e) && "onPush" !== e
            }(e))
          }(e) && N(t) ? function () {
            for (var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = arguments.length, c = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) c[a - 1] = arguments[a];
            return N(n.success) || N(n.fail) || N(n.complete) ? U(e, F.apply(void 0, [e, t, n].concat(c))) : U(e, G(new Promise((function (o, a) {
              F.apply(void 0, [e, t, Object.assign({}, n, {
                success: o,
                fail: a
              })].concat(c))
            }))))
          } : t
        }
        Promise.prototype.finally || (Promise.prototype.finally = function (e) {
          var t = this.constructor;
          return this.then((function (n) {
            return t.resolve(e()).then((function () {
              return n
            }))
          }), (function (n) {
            return t.resolve(e()).then((function () {
              throw n
            }))
          }))
        });
        var Y = !1,
          Z = 0,
          X = 0;

        function ee(t, n) {
          if (0 === Z && function () {
              var t = Object.assign({}, e.getWindowInfo(), {
                  platform: e.getDeviceInfo().platform
                }),
                n = t.windowWidth,
                o = t.pixelRatio,
                c = t.platform;
              Z = n, X = o, Y = "ios" === c
            }(), 0 === (t = Number(t))) return 0;
          var o = t / 750 * (n || Z);
          return o < 0 && (o = -o), 0 === (o = Math.floor(o + 1e-4)) && (o = 1 !== X && Y ? .5 : 1), t < 0 ? -o : o
        }
        var te, ne = {};
        te = ae(e.getAppBaseInfo().language) || "en",
          function () {
            if ("undefined" != typeof __uniConfig && __uniConfig.locales && Object.keys(__uniConfig.locales).length) {
              var e = Object.keys(__uniConfig.locales);
              e.length && e.forEach((function (e) {
                var t = ne[e],
                  n = __uniConfig.locales[e];
                t ? Object.assign(t, n) : ne[e] = n
              }))
            }
          }();
        var oe = (0, d.initVueI18n)(te, {}),
          ce = oe.t;

        function ae(e, t) {
          if (e) return e = e.trim().replace(/_/g, "-"), t && t[e] ? e : "chinese" === (e = e.toLowerCase()) ? "zh-Hans" : 0 === e.indexOf("zh") ? e.indexOf("-hans") > -1 ? "zh-Hans" : e.indexOf("-hant") > -1 || function (e, t) {
            return !!["-tw", "-hk", "-mo", "-cht"].find((function (t) {
              return -1 !== e.indexOf(t)
            }))
          }(e) ? "zh-Hant" : "zh-Hans" : function (e, t) {
            return ["en", "fr", "es"].find((function (t) {
              return 0 === e.indexOf(t)
            }))
          }(e) || void 0
        }

        function re() {
          if (N(getApp)) {
            var t = getApp({
              allowDefault: !0
            });
            if (t && t.$vm) return t.$vm.$locale
          }
          return ae(e.getAppBaseInfo().language) || "en"
        }
        oe.mixin = {
          beforeCreate: function () {
            var e = this,
              t = oe.i18n.watchLocale((function () {
                e.$forceUpdate()
              }));
            this.$once("hook:beforeDestroy", (function () {
              t()
            }))
          },
          methods: {
            $$t: function (e, t) {
              return ce(e, t)
            }
          }
        }, oe.setLocale, oe.getLocale;
        var ue = [];
        void 0 !== o && (o.getLocale = re);
        var ie, se = {
            promiseInterceptor: q
          },
          ye = Object.freeze({
            __proto__: null,
            upx2px: ee,
            rpx2px: ee,
            getLocale: re,
            setLocale: function (e) {
              var t = !!N(getApp) && getApp();
              return !!t && (t.$vm.$locale !== e && (t.$vm.$locale = e, ue.forEach((function (t) {
                return t({
                  locale: e
                })
              })), !0))
            },
            onLocaleChange: function (e) {
              -1 === ue.indexOf(e) && ue.push(e)
            },
            addInterceptor: function (e, t) {
              "string" == typeof e && _(t) ? j(I[e] || (I[e] = {}), t) : _(e) && j(T, e)
            },
            removeInterceptor: function (e, t) {
              "string" == typeof e ? _(t) ? E(I[e], t) : delete I[e] : _(e) && E(T, e)
            },
            interceptors: se
          });

        function de(t) {
          (ie = ie || e.getStorageSync("__DC_STAT_UUID")) || (ie = Date.now() + "" + Math.floor(1e7 * Math.random()), e.setStorage({
            key: "__DC_STAT_UUID",
            data: ie
          })), t.deviceId = ie
        }

        function le(e) {
          if (e.safeArea) {
            var t = e.safeArea;
            e.safeAreaInsets = {
              top: t.top,
              left: t.left,
              right: e.windowWidth - t.right,
              bottom: e.screenHeight - t.bottom
            }
          }
        }

        function fe(e, t) {
          for (var n = e.deviceType || "phone", o = {
              ipad: "pad",
              windows: "pc",
              mac: "pc"
            }, c = Object.keys(o), a = t.toLocaleLowerCase(), r = 0; r < c.length; r++) {
            var u = c[r];
            if (-1 !== a.indexOf(u)) {
              n = o[u];
              break
            }
          }
          return n
        }

        function me(e) {
          var t = e;
          return t && (t = e.toLocaleLowerCase()), t
        }

        function pe(e) {
          return re ? re() : e
        }

        function he(e) {
          var t = e.hostName || "WeChat";
          return e.environment ? t = e.environment : e.host && e.host.env && (t = e.host.env), t
        }
        var Ce = {
            returnValue: function (e) {
              de(e), le(e),
                function (e) {
                  var t, n = e.brand,
                    o = void 0 === n ? "" : n,
                    c = e.model,
                    a = void 0 === c ? "" : c,
                    r = e.system,
                    u = void 0 === r ? "" : r,
                    i = e.language,
                    s = void 0 === i ? "" : i,
                    y = e.theme,
                    d = e.version,
                    l = (e.platform, e.fontSizeSetting),
                    f = e.SDKVersion,
                    m = e.pixelRatio,
                    p = e.deviceOrientation,
                    h = "";
                  h = u.split(" ")[0] || "", t = u.split(" ")[1] || "";
                  var C = d,
                    g = fe(e, a),
                    v = me(o),
                    N = he(e),
                    b = p,
                    _ = m,
                    x = f,
                    w = s.replace(/_/g, "-"),
                    k = {
                      appId: "__UNI__C60B75C",
                      appName: "consult-visitor-front",
                      appVersion: "1.0.0",
                      appVersionCode: "100",
                      appLanguage: pe(w),
                      uniCompileVersion: "4.44",
                      uniCompilerVersion: "4.44",
                      uniRuntimeVersion: "4.44",
                      uniPlatform: "mp-weixin",
                      deviceBrand: v,
                      deviceModel: a,
                      deviceType: g,
                      devicePixelRatio: _,
                      deviceOrientation: b,
                      osName: h.toLocaleLowerCase(),
                      osVersion: t,
                      hostTheme: y,
                      hostVersion: C,
                      hostLanguage: w,
                      hostName: N,
                      hostSDKVersion: x,
                      hostFontSizeSetting: l,
                      windowTop: 0,
                      windowBottom: 0,
                      osLanguage: void 0,
                      osTheme: void 0,
                      ua: void 0,
                      hostPackageName: void 0,
                      browserName: void 0,
                      browserVersion: void 0,
                      isUniAppX: !1
                    };
                  Object.assign(e, k, {})
                }(e)
            }
          },
          ge = {
            redirectTo: {
              name: function (e) {
                return "back" === e.exists && e.delta ? "navigateBack" : "redirectTo"
              },
              args: function (e) {
                if ("back" === e.exists && e.url) {
                  var t = function (e) {
                    for (var t = getCurrentPages(), n = t.length; n--;) {
                      var o = t[n];
                      if (o.$page && o.$page.fullPath === e) return n
                    }
                    return -1
                  }(e.url);
                  if (-1 !== t) {
                    var n = getCurrentPages().length - 1 - t;
                    n > 0 && (e.delta = n)
                  }
                }
              }
            },
            previewImage: {
              args: function (e) {
                var t = parseInt(e.current);
                if (!isNaN(t)) {
                  var n = e.urls;
                  if (Array.isArray(n)) {
                    var o = n.length;
                    if (o) return t < 0 ? t = 0 : t >= o && (t = o - 1), t > 0 ? (e.current = n[t], e.urls = n.filter((function (e, o) {
                      return !(o < t) || e !== n[t]
                    }))) : e.current = n[0], {
                      indicator: !1,
                      loop: !1
                    }
                  }
                }
              }
            },
            getSystemInfo: Ce,
            getSystemInfoSync: Ce,
            showActionSheet: {
              args: function (e) {
                "object" === (0, y.default)(e) && (e.alertText = e.title)
              }
            },
            getAppBaseInfo: {
              returnValue: function (e) {
                var t = e,
                  n = t.version,
                  o = t.language,
                  c = t.SDKVersion,
                  a = t.theme,
                  r = he(e),
                  u = o.replace("_", "-");
                e = P(Object.assign(e, {
                  appId: "__UNI__C60B75C",
                  appName: "consult-visitor-front",
                  appVersion: "1.0.0",
                  appVersionCode: "100",
                  appLanguage: pe(u),
                  hostVersion: n,
                  hostLanguage: u,
                  hostName: r,
                  hostSDKVersion: c,
                  hostTheme: a,
                  isUniAppX: !1,
                  uniPlatform: "mp-weixin",
                  uniCompileVersion: "4.44",
                  uniCompilerVersion: "4.44",
                  uniRuntimeVersion: "4.44"
                }))
              }
            },
            getDeviceInfo: {
              returnValue: function (e) {
                var t = e,
                  n = t.brand,
                  o = t.model,
                  c = fe(e, o),
                  a = me(n);
                de(e), e = P(Object.assign(e, {
                  deviceType: c,
                  deviceBrand: a,
                  deviceModel: o
                }))
              }
            },
            getWindowInfo: {
              returnValue: function (e) {
                le(e), e = P(Object.assign(e, {
                  windowTop: 0,
                  windowBottom: 0
                }))
              }
            },
            getAppAuthorizeSetting: {
              returnValue: function (e) {
                var t = e.locationReducedAccuracy;
                e.locationAccuracy = "unsupported", !0 === t ? e.locationAccuracy = "reduced" : !1 === t && (e.locationAccuracy = "full")
              }
            },
            compressImage: {
              args: function (e) {
                e.compressedHeight && !e.compressHeight && (e.compressHeight = e.compressedHeight), e.compressedWidth && !e.compressWidth && (e.compressWidth = e.compressedWidth)
              }
            }
          },
          ve = ["success", "fail", "cancel", "complete"];

        function Ne(e, t, n) {
          return function (o) {
            return t(_e(e, o, n))
          }
        }

        function be(e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            c = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
          if (_(t)) {
            var a = !0 === c ? t : {};
            for (var r in N(n) && (n = n(t, a) || {}), t)
              if (x(n, r)) {
                var u = n[r];
                N(u) && (u = u(t[r], t, a)), u ? b(u) ? a[u] = t[r] : _(u) && (a[u.name ? u.name : r] = u.value) : console.warn("The '".concat(e, "' method of platform '微信小程序' does not support option '").concat(r, "'"))
              } else -1 !== ve.indexOf(r) ? N(t[r]) && (a[r] = Ne(e, t[r], o)) : c || (a[r] = t[r]);
            return a
          }
          return N(t) && (t = Ne(e, t, o)), t
        }

        function _e(e, t, n) {
          var o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
          return N(ge.returnValue) && (t = ge.returnValue(e, t)), be(e, t, n, {}, o)
        }

        function xe(t, n) {
          if (x(ge, t)) {
            var o = ge[t];
            return o ? function (n, c) {
              var a = o;
              N(o) && (a = o(n));
              var r = [n = be(t, n, a.args, a.returnValue)];
              void 0 !== c && r.push(c), N(a.name) ? t = a.name(n) : b(a.name) && (t = a.name);
              var u = e[t].apply(e, r);
              return J(t) ? _e(t, u, a.returnValue, W(t)) : u
            } : function () {
              console.error("Platform '微信小程序' does not support '".concat(t, "'."))
            }
          }
          return n
        }
        var we = Object.create(null);
        ["onTabBarMidButtonTap", "subscribePush", "unsubscribePush", "onPush", "offPush", "share"].forEach((function (e) {
          we[e] = function (e) {
            return function (t) {
              var n = t.fail,
                o = t.complete,
                c = {
                  errMsg: "".concat(e, ":fail method '").concat(e, "' not supported")
                };
              N(n) && n(c), N(o) && o(c)
            }
          }(e)
        }));
        var ke = {
            oauth: ["weixin"],
            share: ["weixin"],
            payment: ["wxpay"],
            push: ["weixin"]
          },
          Oe = Object.freeze({
            __proto__: null,
            getProvider: function (e) {
              var t = e.service,
                n = e.success,
                o = e.fail,
                c = e.complete,
                a = !1;
              ke[t] ? (a = {
                errMsg: "getProvider:ok",
                service: t,
                provider: ke[t]
              }, N(n) && n(a)) : (a = {
                errMsg: "getProvider:fail service not found"
              }, N(o) && o(a)), N(c) && c(a)
            }
          }),
          Se = function () {
            var e;
            return function () {
              return e || (e = new l.default), e
            }
          }();

        function Pe(e, t, n) {
          return e[t].apply(e, n)
        }
        var Ae, Te, Ie, je = Object.freeze({
          __proto__: null,
          $on: function () {
            return Pe(Se(), "$on", Array.prototype.slice.call(arguments))
          },
          $off: function () {
            return Pe(Se(), "$off", Array.prototype.slice.call(arguments))
          },
          $once: function () {
            return Pe(Se(), "$once", Array.prototype.slice.call(arguments))
          },
          $emit: function () {
            return Pe(Se(), "$emit", Array.prototype.slice.call(arguments))
          }
        });

        function Ee(e) {
          return function () {
            try {
              return e.apply(e, arguments)
            } catch (e) {
              console.error(e)
            }
          }
        }

        function $e(e) {
          try {
            return JSON.parse(e)
          } catch (e) {}
          return e
        }
        var De = [];

        function Le(e, t) {
          De.forEach((function (n) {
            n(e, t)
          })), De.length = 0
        }
        var Me = [],
          Ue = e.getAppBaseInfo && e.getAppBaseInfo();
        Ue || (Ue = e.getSystemInfoSync());
        var Re = Ue ? Ue.host : null,
          Fe = Re && "SAAASDK" === Re.env ? e.miniapp.shareVideoMessage : e.shareVideoMessage,
          qe = Object.freeze({
            __proto__: null,
            shareVideoMessage: Fe,
            getPushClientId: function (e) {
              _(e) || (e = {});
              var t = function (e) {
                  var t = {};
                  for (var n in e) {
                    var o = e[n];
                    N(o) && (t[n] = Ee(o), delete e[n])
                  }
                  return t
                }(e),
                n = t.success,
                o = t.fail,
                c = t.complete,
                a = N(n),
                r = N(o),
                u = N(c);
              Promise.resolve().then((function () {
                void 0 === Ie && (Ie = !1, Ae = "", Te = "uniPush is not enabled"), De.push((function (e, t) {
                  var i;
                  e ? (i = {
                    errMsg: "getPushClientId:ok",
                    cid: e
                  }, a && n(i)) : (i = {
                    errMsg: "getPushClientId:fail" + (t ? " " + t : "")
                  }, r && o(i)), u && c(i)
                })), void 0 !== Ae && Le(Ae, Te)
              }))
            },
            onPushMessage: function (e) {
              -1 === Me.indexOf(e) && Me.push(e)
            },
            offPushMessage: function (e) {
              if (e) {
                var t = Me.indexOf(e);
                t > -1 && Me.splice(t, 1)
              } else Me.length = 0
            },
            invokePushCallback: function (e) {
              if ("enabled" === e.type) Ie = !0;
              else if ("clientId" === e.type) Ae = e.cid, Te = e.errMsg, Le(Ae, e.errMsg);
              else if ("pushMsg" === e.type)
                for (var t = {
                    type: "receive",
                    data: $e(e.message)
                  }, n = 0; n < Me.length; n++) {
                  if ((0, Me[n])(t), t.stopped) break
                } else "click" === e.type && Me.forEach((function (t) {
                  t({
                    type: "click",
                    data: $e(e.message)
                  })
                }))
            }
          }),
          Be = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];

        function Ve(e) {
          return Behavior(e)
        }

        function He() {
          return !!this.route
        }

        function ze(e) {
          this.triggerEvent("__l", e)
        }

        function Ke(e) {
          var t = e.$scope,
            n = {};
          Object.defineProperty(e, "$refs", {
            get: function () {
              var e = {};
              return function e(t, n, o) {
                  (t.selectAllComponents(n) || []).forEach((function (t) {
                    var c = t.dataset.ref;
                    o[c] = t.$vm || Ge(t), "scoped" === t.dataset.vueGeneric && t.selectAllComponents(".scoped-ref").forEach((function (t) {
                      e(t, n, o)
                    }))
                  }))
                }(t, ".vue-ref", e), (t.selectAllComponents(".vue-ref-in-for") || []).forEach((function (t) {
                  var n = t.dataset.ref;
                  e[n] || (e[n] = []), e[n].push(t.$vm || Ge(t))
                })),
                function (e, t) {
                  var n = (0, i.default)(Set, (0, s.default)(Object.keys(e)));
                  return Object.keys(t).forEach((function (o) {
                    var c = e[o],
                      a = t[o];
                    Array.isArray(c) && Array.isArray(a) && c.length === a.length && a.every((function (e) {
                      return c.includes(e)
                    })) || (e[o] = a, n.delete(o))
                  })), n.forEach((function (t) {
                    delete e[t]
                  })), e
                }(n, e)
            }
          })
        }

        function We(e) {
          var t, n = e.detail || e.value,
            o = n.vuePid,
            c = n.vueOptions;
          o && (t = function e(t, n) {
            for (var o, c = t.$children, a = c.length - 1; a >= 0; a--) {
              var r = c[a];
              if (r.$scope._$vueId === n) return r
            }
            for (var u = c.length - 1; u >= 0; u--)
              if (o = e(c[u], n)) return o
          }(this.$vm, o)), t || (t = this.$vm), c.parent = t
        }

        function Je(e) {
          return Object.defineProperty(e, "__v_isMPComponent", {
            configurable: !0,
            enumerable: !1,
            value: !0
          }), e
        }

        function Ge(e) {
          return function (e) {
            return null !== e && "object" === (0, y.default)(e)
          }(e) && Object.isExtensible(e) && Object.defineProperty(e, "__ob__", {
            configurable: !0,
            enumerable: !1,
            value: (0, u.default)({}, "__v_skip", !0)
          }), e
        }
        var Qe = /_(.*)_worklet_factory_/,
          Ye = Page,
          Ze = Component,
          Xe = /:/g,
          et = k((function (e) {
            return S(e.replace(Xe, "-"))
          }));

        function tt(e) {
          var t = e.triggerEvent,
            n = function (e) {
              for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), c = 1; c < n; c++) o[c - 1] = arguments[c];
              if (this.$vm || this.dataset && this.dataset.comType) e = et(e);
              else {
                var a = et(e);
                a !== e && t.apply(this, [a].concat(o))
              }
              return t.apply(this, [e].concat(o))
            };
          try {
            e.triggerEvent = n
          } catch (t) {
            e._triggerEvent = n
          }
        }

        function nt(e, t, n) {
          var o = t[e];
          t[e] = function () {
            if (Je(this), tt(this), o) {
              for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
              return o.apply(this, t)
            }
          }
        }

        function ot(e, t, n) {
          t.forEach((function (t) {
            (function e(t, n) {
              if (!n) return !0;
              if (l.default.options && Array.isArray(l.default.options[t])) return !0;
              if (N(n = n.default || n)) return !!N(n.extendOptions[t]) || !!(n.super && n.super.options && Array.isArray(n.super.options[t]));
              if (N(n[t]) || Array.isArray(n[t])) return !0;
              var o = n.mixins;
              return Array.isArray(o) ? !!o.find((function (n) {
                return e(t, n)
              })) : void 0
            })(t, n) && (e[t] = function (e) {
              return this.$vm && this.$vm.__call_hook(t, e)
            })
          }))
        }

        function ct(e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
          at(t).forEach((function (t) {
            return rt(e, t, n)
          }))
        }

        function at(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
          return e && Object.keys(e).forEach((function (n) {
            0 === n.indexOf("on") && N(e[n]) && t.push(n)
          })), t
        }

        function rt(e, t, n) {
          -1 !== n.indexOf(t) || x(e, t) || (e[t] = function (e) {
            return this.$vm && this.$vm.__call_hook(t, e)
          })
        }

        function ut(e, t) {
          var n;
          return [n = N(t = t.default || t) ? t : e.extend(t), t = n.options]
        }

        function it(e, t) {
          if (Array.isArray(t) && t.length) {
            var n = Object.create(null);
            t.forEach((function (e) {
              n[e] = !0
            })), e.$scopedSlots = e.$slots = n
          }
        }

        function st(e, t) {
          var n = (e = (e || "").split(",")).length;
          1 === n ? t._$vueId = e[0] : 2 === n && (t._$vueId = e[0], t._$vuePid = e[1])
        }

        function yt(e, t) {
          var n = e.data || {},
            o = e.methods || {};
          if ("function" == typeof n) try {
            n = n.call(t)
          } catch (e) {
            Object({
              NODE_ENV: "production",
              VUE_APP_DARK_MODE: "false",
              VUE_APP_NAME: "consult-visitor-front",
              VUE_APP_PLATFORM: "mp-weixin",
              BASE_URL: "/"
            }).VUE_APP_DEBUG && console.warn("根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。", n)
          } else try {
            n = JSON.parse(JSON.stringify(n))
          } catch (e) {}
          return _(n) || (n = {}), Object.keys(o).forEach((function (e) {
            -1 !== t.__lifecycle_hooks__.indexOf(e) || x(n, e) || (n[e] = o[e])
          })), n
        }
        Ye.__$wrappered || (Ye.__$wrappered = !0, Page = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return nt("onLoad", e), Ye(e)
        }, Page.after = Ye.after, Component = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return nt("created", e), Ze(e)
        });
        var dt = [String, Number, Boolean, Object, Array, null];

        function lt(e) {
          return function (t, n) {
            this.$vm && (this.$vm[e] = t)
          }
        }

        function ft(e, t) {
          var n = e.behaviors,
            o = e.extends,
            c = e.mixins,
            a = e.props;
          a || (e.props = a = []);
          var r = [];
          return Array.isArray(n) && n.forEach((function (e) {
            r.push(e.replace("uni://", "wx".concat("://"))), "uni://form-field" === e && (Array.isArray(a) ? (a.push("name"), a.push("value")) : (a.name = {
              type: String,
              default: ""
            }, a.value = {
              type: [String, Number, Boolean, Array, Object, Date],
              default: ""
            }))
          })), _(o) && o.props && r.push(t({
            properties: pt(o.props, !0)
          })), Array.isArray(c) && c.forEach((function (e) {
            _(e) && e.props && r.push(t({
              properties: pt(e.props, !0)
            }))
          })), r
        }

        function mt(e, t, n, o) {
          return Array.isArray(t) && 1 === t.length ? t[0] : t
        }

        function pt(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = arguments.length > 3 ? arguments[3] : void 0,
            o = {};
          return t || (o.vueId = {
            type: String,
            value: ""
          }, n.virtualHost && (o.virtualHostStyle = {
            type: null,
            value: ""
          }, o.virtualHostClass = {
            type: null,
            value: ""
          }), o.scopedSlotsCompiler = {
            type: String,
            value: ""
          }, o.vueSlots = {
            type: null,
            value: [],
            observer: function (e, t) {
              var n = Object.create(null);
              e.forEach((function (e) {
                n[e] = !0
              })), this.setData({
                $slots: n
              })
            }
          }), Array.isArray(e) ? e.forEach((function (e) {
            o[e] = {
              type: null,
              observer: lt(e)
            }
          })) : _(e) && Object.keys(e).forEach((function (t) {
            var n = e[t];
            if (_(n)) {
              var c = n.default;
              N(c) && (c = c()), n.type = mt(0, n.type), o[t] = {
                type: -1 !== dt.indexOf(n.type) ? n.type : null,
                value: c,
                observer: lt(t)
              }
            } else {
              var a = mt(0, n);
              o[t] = {
                type: -1 !== dt.indexOf(a) ? a : null,
                observer: lt(t)
              }
            }
          })), o
        }

        function ht(e, t, n, o) {
          var c = {};
          return Array.isArray(t) && t.length && t.forEach((function (t, a) {
            "string" == typeof t ? t ? "$event" === t ? c["$" + a] = n : "arguments" === t ? c["$" + a] = n.detail && n.detail.__args__ || o : 0 === t.indexOf("$event.") ? c["$" + a] = e.__get_value(t.replace("$event.", ""), n) : c["$" + a] = e.__get_value(t) : c["$" + a] = e : c["$" + a] = function (e, t) {
              var n = e;
              return t.forEach((function (t) {
                var o = t[0],
                  c = t[2];
                if (o || void 0 !== c) {
                  var a, r = t[1],
                    u = t[3];
                  Number.isInteger(o) ? a = o : o ? "string" == typeof o && o && (a = 0 === o.indexOf("#s#") ? o.substr(3) : e.__get_value(o, n)) : a = n, Number.isInteger(a) ? n = c : r ? Array.isArray(a) ? n = a.find((function (t) {
                    return e.__get_value(r, t) === c
                  })) : _(a) ? n = Object.keys(a).find((function (t) {
                    return e.__get_value(r, a[t]) === c
                  })) : console.error("v-for 暂不支持循环数据：", a) : n = a[c], u && (n = e.__get_value(u, n))
                }
              })), n
            }(e, t)
          })), c
        }

        function Ct(e) {
          for (var t = {}, n = 1; n < e.length; n++) {
            var o = e[n];
            t[o[0]] = o[1]
          }
          return t
        }

        function gt(e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
            o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [],
            c = arguments.length > 4 ? arguments[4] : void 0,
            a = arguments.length > 5 ? arguments[5] : void 0,
            r = !1,
            u = _(t.detail) && t.detail.__args__ || [t.detail];
          if (c && (r = t.currentTarget && t.currentTarget.dataset && "wx" === t.currentTarget.dataset.comType, !n.length)) return r ? [t] : u;
          var i = ht(e, o, t, u),
            s = [];
          return n.forEach((function (e) {
            "$event" === e ? "__set_model" !== a || c ? c && !r ? s.push(u[0]) : s.push(t) : s.push(t.target.value) : Array.isArray(e) && "o" === e[0] ? s.push(Ct(e)) : "string" == typeof e && x(i, e) ? s.push(i[e]) : s.push(e)
          })), s
        }

        function vt(e) {
          var t = this,
            n = ((e = function (e) {
              try {
                e.mp = JSON.parse(JSON.stringify(e))
              } catch (e) {}
              return e.stopPropagation = w, e.preventDefault = w, e.target = e.target || {}, x(e, "detail") || (e.detail = {}), x(e, "markerId") && (e.detail = "object" === (0, y.default)(e.detail) ? e.detail : {}, e.detail.markerId = e.markerId), _(e.detail) && (e.target = Object.assign({}, e.target, e.detail)), e
            }(e)).currentTarget || e.target).dataset;
          if (!n) return console.warn("事件信息不存在");
          var o = n.eventOpts || n["event-opts"];
          if (!o) return console.warn("事件信息不存在");
          var c = e.type,
            a = [];
          return o.forEach((function (n) {
            var o = n[0],
              r = n[1],
              u = "^" === o.charAt(0),
              i = "~" === (o = u ? o.slice(1) : o).charAt(0);
            o = i ? o.slice(1) : o, r && function (e, t) {
              return e === t || "regionchange" === t && ("begin" === e || "end" === e)
            }(c, o) && r.forEach((function (n) {
              var o = n[0];
              if (o) {
                var c = t.$vm;
                if (c.$options.generic && (c = function (e) {
                    for (var t = e.$parent; t && t.$parent && (t.$options.generic || t.$parent.$options.generic || t.$scope._$vuePid);) t = t.$parent;
                    return t && t.$parent
                  }(c) || c), "$emit" === o) return void c.$emit.apply(c, gt(t.$vm, e, n[1], n[2], u, o));
                var r = c[o];
                if (!N(r)) {
                  var s = "page" === t.$vm.mpType ? "Page" : "Component",
                    y = t.route || t.is;
                  throw new Error("".concat(s, ' "').concat(y, '" does not have a method "').concat(o, '"'))
                }
                if (i) {
                  if (r.once) return;
                  r.once = !0
                }
                var d = gt(t.$vm, e, n[1], n[2], u, o);
                d = Array.isArray(d) ? d : [], /=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(r.toString()) && (d = d.concat([, , , , , , , , , , e])), a.push(r.apply(c, d))
              }
            }))
          })), "input" === c && 1 === a.length && void 0 !== a[0] ? a[0] : void 0
        }
        var Nt = {},
          bt = ["onShow", "onHide", "onError", "onPageNotFound", "onThemeChange", "onUnhandledRejection"];

        function _t(t, n) {
          var o = n.mocks,
            c = n.initRefs;
          (function () {
            l.default.prototype.getOpenerEventChannel = function () {
              return this.$scope.getOpenerEventChannel()
            };
            var e = l.default.prototype.__call_hook;
            l.default.prototype.__call_hook = function (t, n) {
              return "onLoad" === t && n && n.__id__ && (this.__eventChannel__ = function (e) {
                var t = Nt[e];
                return delete Nt[e], t
              }(n.__id__), delete n.__id__), e.call(this, t, n)
            }
          })(),
          function () {
            var e = {},
              t = {};

            function n(e) {
              var t = this.$options.propsData.vueId;
              t && e(t.split(",")[0])
            }
            l.default.prototype.$hasSSP = function (n) {
              var o = e[n];
              return o || (t[n] = this, this.$on("hook:destroyed", (function () {
                delete t[n]
              }))), o
            }, l.default.prototype.$getSSP = function (t, n, o) {
              var c = e[t];
              if (c) {
                var a = c[n] || [];
                return o ? a : a[0]
              }
            }, l.default.prototype.$setSSP = function (t, o) {
              var c = 0;
              return n.call(this, (function (n) {
                var a = e[n],
                  r = a[t] = a[t] || [];
                r.push(o), c = r.length - 1
              })), c
            }, l.default.prototype.$initSSP = function () {
              n.call(this, (function (t) {
                e[t] = {}
              }))
            }, l.default.prototype.$callSSP = function () {
              n.call(this, (function (e) {
                t[e] && t[e].$forceUpdate()
              }))
            }, l.default.mixin({
              destroyed: function () {
                var n = this.$options.propsData,
                  o = n && n.vueId;
                o && (delete e[o], delete t[o])
              }
            })
          }(), t.$options.store && (l.default.prototype.$store = t.$options.store),
            function (e) {
              e.prototype.uniIDHasRole = function (e) {
                return C().role.indexOf(e) > -1
              }, e.prototype.uniIDHasPermission = function (e) {
                var t = C().permission;
                return this.uniIDHasRole("admin") || t.indexOf(e) > -1
              }, e.prototype.uniIDTokenValid = function () {
                return C().tokenExpired > Date.now()
              }
            }(l.default), l.default.prototype.mpHost = "mp-weixin", l.default.mixin({
              beforeCreate: function () {
                if (this.$options.mpType) {
                  if (this.mpType = this.$options.mpType, this.$mp = (0, u.default)({
                      data: {}
                    }, this.mpType, this.$options.mpInstance), this.$scope = this.$options.mpInstance, delete this.$options.mpType, delete this.$options.mpInstance, "page" === this.mpType && "function" == typeof getApp) {
                    var e = getApp();
                    e.$vm && e.$vm.$i18n && (this._i18n = e.$vm.$i18n)
                  }
                  "app" !== this.mpType && (c(this), function (e, t) {
                    var n = e.$mp[e.mpType];
                    t.forEach((function (t) {
                      x(n, t) && (e[t] = n[t])
                    }))
                  }(this, o))
                }
              }
            });
          var a = {
            onLaunch: function (n) {
              this.$vm || (e.canIUse && !e.canIUse("nextTick") && console.error("当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上"), this.$vm = t, this.$vm.$mp = {
                app: this
              }, this.$vm.$scope = this, this.$vm.globalData = this.globalData, this.$vm._isMounted = !0, this.$vm.__call_hook("mounted", n), this.$vm.__call_hook("onLaunch", n))
            }
          };
          a.globalData = t.$options.globalData || {};
          var r = t.$options.methods;
          return r && Object.keys(r).forEach((function (e) {
              a[e] = r[e]
            })),
            function (e, t, n) {
              var o = e.observable({
                  locale: n || oe.getLocale()
                }),
                c = [];
              t.$watchLocale = function (e) {
                c.push(e)
              }, Object.defineProperty(t, "$locale", {
                get: function () {
                  return o.locale
                },
                set: function (e) {
                  o.locale = e, c.forEach((function (t) {
                    return t(e)
                  }))
                }
              })
            }(l.default, t, ae(e.getAppBaseInfo().language) || "en"), ot(a, bt), ct(a, t.$options), a
        }

        function xt(e) {
          return _t(e, {
            mocks: Be,
            initRefs: Ke
          })
        }

        function wt(e) {
          return App(xt(e)), e
        }
        var kt = /[!'()*]/g,
          Ot = function (e) {
            return "%" + e.charCodeAt(0).toString(16)
          },
          St = /%2C/g,
          Pt = function (e) {
            return encodeURIComponent(e).replace(kt, Ot).replace(St, ",")
          };

        function At(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Pt,
            n = e ? Object.keys(e).map((function (n) {
              var o = e[n];
              if (void 0 === o) return "";
              if (null === o) return t(n);
              if (Array.isArray(o)) {
                var c = [];
                return o.forEach((function (e) {
                  void 0 !== e && (null === e ? c.push(t(n)) : c.push(t(n) + "=" + t(e)))
                })), c.join("&")
              }
              return t(n) + "=" + t(o)
            })).filter((function (e) {
              return e.length > 0
            })).join("&") : null;
          return n ? "?".concat(n) : ""
        }

        function Tt(e, t) {
          return function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = t.isPage,
              o = t.initRelation,
              c = arguments.length > 2 ? arguments[2] : void 0,
              a = ut(l.default, e),
              u = (0, r.default)(a, 2),
              i = u[0],
              s = u[1],
              y = m({
                multipleSlots: !0,
                addGlobalClass: !0
              }, s.options || {});
            s["mp-weixin"] && s["mp-weixin"].options && Object.assign(y, s["mp-weixin"].options);
            var d = {
              options: y,
              data: yt(s, l.default.prototype),
              behaviors: ft(s, Ve),
              properties: pt(s.props, !1, s.__file, y),
              lifetimes: {
                attached: function () {
                  var e = this.properties,
                    t = {
                      mpType: n.call(this) ? "page" : "component",
                      mpInstance: this,
                      propsData: e
                    };
                  st(e.vueId, this), o.call(this, {
                    vuePid: this._$vuePid,
                    vueOptions: t
                  }), this.$vm = new i(t), it(this.$vm, e.vueSlots), this.$vm.$mount()
                },
                ready: function () {
                  this.$vm && (this.$vm._isMounted = !0, this.$vm.__call_hook("mounted"), this.$vm.__call_hook("onReady"))
                },
                detached: function () {
                  this.$vm && this.$vm.$destroy()
                }
              },
              pageLifetimes: {
                show: function (e) {
                  this.$vm && this.$vm.__call_hook("onPageShow", e)
                },
                hide: function () {
                  this.$vm && this.$vm.__call_hook("onPageHide")
                },
                resize: function (e) {
                  this.$vm && this.$vm.__call_hook("onPageResize", e)
                }
              },
              methods: {
                __l: We,
                __e: vt
              }
            };
            return s.externalClasses && (d.externalClasses = s.externalClasses), Array.isArray(s.wxsCallMethods) && s.wxsCallMethods.forEach((function (e) {
              d.methods[e] = function (t) {
                return this.$vm[e](t)
              }
            })), c ? [d, s, i] : n ? d : [d, i]
          }(e, {
            isPage: He,
            initRelation: ze
          }, t)
        }
        var It = ["onShow", "onHide", "onUnload"];

        function jt(e) {
          return Component(function (e) {
            return function (e) {
              var t = Tt(e, !0),
                n = (0, r.default)(t, 2),
                o = n[0],
                c = n[1];
              return ot(o.methods, It, c), o.methods.onLoad = function (e) {
                  this.options = e;
                  var t = Object.assign({}, e);
                  delete t.__id__, this.$page = {
                    fullPath: "/" + (this.route || this.is) + At(t)
                  }, this.$vm.$mp.query = e, this.$vm.__call_hook("onLoad", e)
                }, ct(o.methods, e, ["onReady"]),
                function (e, t) {
                  t && Object.keys(t).forEach((function (n) {
                    var o = n.match(Qe);
                    if (o) {
                      var c = o[1];
                      e[n] = t[n], e[c] = t[c]
                    }
                  }))
                }(o.methods, c.methods), o
            }(e)
          }(e))
        }

        function Et(e) {
          return Component(Tt(e))
        }

        function $t(t) {
          var n = xt(t),
            o = getApp({
              allowDefault: !0
            });
          t.$scope = o;
          var c = o.globalData;
          if (c && Object.keys(n.globalData).forEach((function (e) {
              x(c, e) || (c[e] = n.globalData[e])
            })), Object.keys(n).forEach((function (e) {
              x(o, e) || (o[e] = n[e])
            })), N(n.onShow) && e.onAppShow && e.onAppShow((function () {
              for (var e = arguments.length, n = new Array(e), o = 0; o < e; o++) n[o] = arguments[o];
              t.__call_hook("onShow", n)
            })), N(n.onHide) && e.onAppHide && e.onAppHide((function () {
              for (var e = arguments.length, n = new Array(e), o = 0; o < e; o++) n[o] = arguments[o];
              t.__call_hook("onHide", n)
            })), N(n.onLaunch)) {
            var a = e.getLaunchOptionsSync && e.getLaunchOptionsSync();
            t.__call_hook("onLaunch", a)
          }
          return t
        }

        function Dt(t) {
          var n = xt(t);
          if (N(n.onShow) && e.onAppShow && e.onAppShow((function () {
              for (var e = arguments.length, n = new Array(e), o = 0; o < e; o++) n[o] = arguments[o];
              t.__call_hook("onShow", n)
            })), N(n.onHide) && e.onAppHide && e.onAppHide((function () {
              for (var e = arguments.length, n = new Array(e), o = 0; o < e; o++) n[o] = arguments[o];
              t.__call_hook("onHide", n)
            })), N(n.onLaunch)) {
            var o = e.getLaunchOptionsSync && e.getLaunchOptionsSync();
            t.__call_hook("onLaunch", o)
          }
          return t
        }
        It.push.apply(It, ["onPullDownRefresh", "onReachBottom", "onAddToFavorites", "onShareTimeline", "onShareAppMessage", "onPageScroll", "onResize", "onTabItemTap"]), ["vibrate", "preloadPage", "unPreloadPage", "loadSubPackage"].forEach((function (e) {
          ge[e] = !1
        })), [].forEach((function (t) {
          var n = ge[t] && ge[t].name ? ge[t].name : t;
          e.canIUse(n) || (ge[t] = !1)
        }));
        var Lt = {};
        "undefined" != typeof Proxy ? Lt = new Proxy({}, {
          get: function (t, n) {
            return x(t, n) ? t[n] : ye[n] ? ye[n] : qe[n] ? Q(n, qe[n]) : Oe[n] ? Q(n, Oe[n]) : we[n] ? Q(n, we[n]) : je[n] ? je[n] : Q(n, xe(n, e[n]))
          },
          set: function (e, t, n) {
            return e[t] = n, !0
          }
        }) : (Object.keys(ye).forEach((function (e) {
          Lt[e] = ye[e]
        })), Object.keys(we).forEach((function (e) {
          Lt[e] = Q(e, we[e])
        })), Object.keys(Oe).forEach((function (e) {
          Lt[e] = Q(e, Oe[e])
        })), Object.keys(je).forEach((function (e) {
          Lt[e] = je[e]
        })), Object.keys(qe).forEach((function (e) {
          Lt[e] = Q(e, qe[e])
        })), Object.keys(e).forEach((function (t) {
          (x(e, t) || x(ge, t)) && (Lt[t] = Q(t, xe(t, e[t])))
        }))), e.createApp = wt, e.createPage = jt, e.createComponent = Et, e.createSubpackageApp = $t, e.createPlugin = Dt;
        var Mt = Lt;
        t.default = Mt
      }).call(this, n("3223").default, n("0ee4"))
    },
    e05e: function (e, t, n) {
      var o = n("47a9"),
        c = n("3b2d");
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getContact = t.createQrcode = void 0;
      var a = o(n("7eb4")),
        r = o(n("3b2d")),
        u = o(n("ee10")),
        i = o(n("8138")),
        s = n("9816"),
        y = function (e, t) {
          if (e && e.__esModule) return e;
          if (null === e || "object" !== c(e) && "function" != typeof e) return {
            default: e
          };
          var n = function (e) {
            if ("function" != typeof WeakMap) return null;
            var t = new WeakMap,
              n = new WeakMap;
            return function (e) {
              return e ? n : t
            }(e)
          }(t);
          if (n && n.has(e)) return n.get(e);
          var o = {},
            a = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var r in e)
            if ("default" !== r && Object.prototype.hasOwnProperty.call(e, r)) {
              var u = a ? Object.getOwnPropertyDescriptor(e, r) : null;
              u && (u.get || u.set) ? Object.defineProperty(o, r, u) : o[r] = e[r]
            } return o.default = e, n && n.set(e, o), o
        }(n("5bd7"));
      var d = function () {
        var e = (0, u.default)(a.default.mark((function e() {
          var t, n;
          return a.default.wrap((function (e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, (0, i.default)({
                  url: "/global/settings",
                  method: "get"
                });
              case 2:
                if (t = e.sent, 1 != (n = t.data.data.concatSysAgentSettings).showAtMp || !n.qrCodeImageUrl) {
                  e.next = 6;
                  break
                }
                return e.abrupt("return", n.qrCodeImageUrl);
              case 6:
                return e.abrupt("return", null);
              case 7:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function () {
          return e.apply(this, arguments)
        }
      }();
      t.getContact = d;
      var l = function () {
        var e = (0, u.default)(a.default.mark((function e(t) {
          var n, o, c, u, d;
          return a.default.wrap((function (e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return n = t.scene, o = t.page, c = "object" === (0, r.default)(n) ? Object.keys(n).reduce((function (e, t) {
                  return e.push("".concat(t, "=").concat(n[t])), e
                }), []).join("&") : n, u = y.isProduction ? "release" : "trial", e.next = 5, (0, i.default)({
                  url: "/wx/user/".concat(s.appid, "/getWxQrCode?scene=").concat(encodeURIComponent(c), "&page=").concat(o, "&envVersion=").concat(u, "&width=10"),
                  method: "get"
                });
              case 5:
                return d = e.sent, e.abrupt("return", "data:image/png;base64,".concat(d.data.data.wxaCode));
              case 7:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function (t) {
          return e.apply(this, arguments)
        }
      }();
      t.createQrcode = l
    },
    e2c2: function (e, t) {
      e.exports = "/static/img/icon-background.png"
    },
    e3b2: function (e, t, n) {},
    e542: function (e, t) {
      e.exports = "https://localhost/api/file/image/身心健康@3x.png"
    },
    e5e6: function (e, t, n) {},
    e6db: function (e, t, n) {
      var o = n("3b2d").default;
      e.exports = function (e, t) {
        if ("object" != o(e) || !e) return e;
        var n = e[Symbol.toPrimitive];
        if (void 0 !== n) {
          var c = n.call(e, t || "default");
          if ("object" != o(c)) return c;
          throw new TypeError("@@toPrimitive must return a primitive value.")
        }
        return ("string" === t ? String : Number)(e)
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    e875: function (e, t) {
      e.exports = "https://localhost/api/file/image/pyq@3x.png"
    },
    e956: function (e, t, n) {
      var o = n("47a9");
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0;
      var c = o(n("7ca3"));

      function a(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          t && (o = o.filter((function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
          }))), n.push.apply(n, o)
        }
        return n
      }

      function r(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2 ? a(Object(n), !0).forEach((function (t) {
            (0, c.default)(e, t, n[t])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : a(Object(n)).forEach((function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
          }))
        }
        return e
      }
      var u = [{
          value: 4,
          name: "个体咨询",
          minute: 50
        }, {
          value: 3,
          name: "青少年父母咨询",
          minute: 50
        }, {
          value: 5,
          name: "伴侣咨询",
          minute: 50
        }, {
          value: 0,
          name: "网络咨询",
          minute: 50
        }, {
          value: 1,
          name: "低价咨询",
          minute: 50
        }, {
          value: 2,
          name: "地面咨询",
          minute: 50
        }],
        i = u.reduce((function (e, t) {
          return e[t.value] = t.name, e
        }), {}),
        s = {
          parseText: function (e) {
            return i[e]
          },
          optionalTypes: function (e) {
            var t = e.map((function (e) {
              return e.consultType
            }));
            return u.filter((function (e) {
              return t.includes(e.value)
            })).map((function (t) {
              return r(r({}, e.find((function (e) {
                return e.consultType === t.value
              }))), t)
            }))
          },
          findType: function (e) {
            return u.find((function (t) {
              return t.value === e
            }))
          }
        };
      t.default = s
    },
    ea38: function (e, t) {
      e.exports = "https://localhost/api/file/image/导航@3x.png"
    },
    ecbe: function (e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0;
      t.default = {
        strDiscode: function (e) {
          return e = function (e) {
            return e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/&OElig;/g, "?")).replace(/&oelig;/g, "?")).replace(/&Scaron;/g, "?")).replace(/&scaron;/g, "?")).replace(/&Yuml;/g, "?")).replace(/&fnof;/g, "?")).replace(/&circ;/g, "?")).replace(/&tilde;/g, "?")).replace(/&ensp;/g, "")).replace(/&emsp;/g, "")).replace(/&thinsp;/g, "")).replace(/&zwnj;/g, "")).replace(/&zwj;/g, "")).replace(/&lrm;/g, "")).replace(/&rlm;/g, "")).replace(/&ndash;/g, "–")).replace(/&mdash;/g, "—")).replace(/&lsquo;/g, "‘")).replace(/&rsquo;/g, "’")).replace(/&sbquo;/g, "?")).replace(/&ldquo;/g, "“")).replace(/&rdquo;/g, "”")).replace(/&bdquo;/g, "?")).replace(/&dagger;/g, "?")).replace(/&Dagger;/g, "?")).replace(/&bull;/g, "?")).replace(/&hellip;/g, "…")).replace(/&permil;/g, "‰")).replace(/&prime;/g, "′")).replace(/&Prime;/g, "″")).replace(/&lsaquo;/g, "?")).replace(/&rsaquo;/g, "?")).replace(/&oline;/g, "￣")).replace(/&euro;/g, "�")).replace(/&trade;/g, "?")).replace(/&larr;/g, "←")).replace(/&uarr;/g, "↑")).replace(/&rarr;/g, "→")).replace(/&darr;/g, "↓")).replace(/&harr;/g, "?")).replace(/&crarr;/g, "?")).replace(/&lceil;/g, "?")).replace(/&rceil;/g, "?")).replace(/&lfloor;/g, "?")).replace(/&rfloor;/g, "?")).replace(/&loz;/g, "?")).replace(/&spades;/g, "?")).replace(/&clubs;/g, "?")).replace(/&hearts;/g, "?")).replace(/&diams;/g, "?")).replace(/&#39;/g, "'")
          }(e = function (e) {
            return e = (e = (e = (e = (e = (e = (e = (e = e.replace(/&nbsp;/g, " ")).replace(/&ensp;/g, "?")).replace(/&emsp;/g, "　")).replace(/&quot;/g, "'")).replace(/&amp;/g, "&")).replace(/&lt;/g, "<")).replace(/&gt;/g, ">")).replace(/&#8226;/g, "?")
          }(e = function (e) {
            return e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/&Alpha;/g, "Α")).replace(/&Beta;/g, "Β")).replace(/&Gamma;/g, "Γ")).replace(/&Delta;/g, "Δ")).replace(/&Epsilon;/g, "Ε")).replace(/&Zeta;/g, "Ζ")).replace(/&Eta;/g, "Η")).replace(/&Theta;/g, "Θ")).replace(/&Iota;/g, "Ι")).replace(/&Kappa;/g, "Κ")).replace(/&Lambda;/g, "Λ")).replace(/&Mu;/g, "Μ")).replace(/&Nu;/g, "Ν")).replace(/&Xi;/g, "Ν")).replace(/&Omicron;/g, "Ο")).replace(/&Pi;/g, "Π")).replace(/&Rho;/g, "Ρ")).replace(/&Sigma;/g, "Σ")).replace(/&Tau;/g, "Τ")).replace(/&Upsilon;/g, "Υ")).replace(/&Phi;/g, "Φ")).replace(/&Chi;/g, "Χ")).replace(/&Psi;/g, "Ψ")).replace(/&Omega;/g, "Ω")).replace(/&alpha;/g, "α")).replace(/&beta;/g, "β")).replace(/&gamma;/g, "γ")).replace(/&delta;/g, "δ")).replace(/&epsilon;/g, "ε")).replace(/&zeta;/g, "ζ")).replace(/&eta;/g, "η")).replace(/&theta;/g, "θ")).replace(/&iota;/g, "ι")).replace(/&kappa;/g, "κ")).replace(/&lambda;/g, "λ")).replace(/&mu;/g, "μ")).replace(/&nu;/g, "ν")).replace(/&xi;/g, "ξ")).replace(/&omicron;/g, "ο")).replace(/&pi;/g, "π")).replace(/&rho;/g, "ρ")).replace(/&sigmaf;/g, "?")).replace(/&sigma;/g, "σ")).replace(/&tau;/g, "τ")).replace(/&upsilon;/g, "υ")).replace(/&phi;/g, "φ")).replace(/&chi;/g, "χ")).replace(/&psi;/g, "ψ")).replace(/&omega;/g, "ω")).replace(/&thetasym;/g, "?")).replace(/&upsih;/g, "?")).replace(/&piv;/g, "?")).replace(/&middot;/g, "·")
          }(e = function (e) {
            return e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/&forall;/g, "?")).replace(/&part;/g, "?")).replace(/&exist;/g, "?")).replace(/&empty;/g, "?")).replace(/&nabla;/g, "?")).replace(/&isin;/g, "∈")).replace(/&notin;/g, "?")).replace(/&ni;/g, "?")).replace(/&prod;/g, "∏")).replace(/&sum;/g, "∑")).replace(/&minus;/g, "?")).replace(/&lowast;/g, "?")).replace(/&radic;/g, "√")).replace(/&prop;/g, "∝")).replace(/&infin;/g, "∞")).replace(/&ang;/g, "∠")).replace(/&and;/g, "∧")).replace(/&or;/g, "∨")).replace(/&cap;/g, "∩")).replace(/&cup;/g, "∪")).replace(/&int;/g, "∫")).replace(/&there4;/g, "∴")).replace(/&sim;/g, "～")).replace(/&cong;/g, "?")).replace(/&asymp;/g, "≈")).replace(/&ne;/g, "≠")).replace(/&le;/g, "≤")).replace(/&ge;/g, "≥")).replace(/&sub;/g, "?")).replace(/&sup;/g, "?")).replace(/&nsub;/g, "?")).replace(/&sube;/g, "?")).replace(/&supe;/g, "?")).replace(/&oplus;/g, "⊕")).replace(/&otimes;/g, "?")).replace(/&perp;/g, "⊥")).replace(/&sdot;/g, "?")
          }(e))))
        },
        urlToHttpUrl: function (e, t) {
          return /^\/\//.test(e) ? "https:".concat(e) : /^\//.test(e) ? "https://".concat(t).concat(e) : e
        }
      }
    },
    ed45: function (e, t) {
      e.exports = function (e) {
        if (Array.isArray(e)) return e
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    ee10: function (e, t) {
      function n(e, t, n, o, c, a, r) {
        try {
          var u = e[a](r),
            i = u.value
        } catch (e) {
          return void n(e)
        }
        u.done ? t(i) : Promise.resolve(i).then(o, c)
      }
      e.exports = function (e) {
        return function () {
          var t = this,
            o = arguments;
          return new Promise((function (c, a) {
            var r = e.apply(t, o);

            function u(e) {
              n(r, c, a, u, i, "next", e)
            }

            function i(e) {
              n(r, c, a, u, i, "throw", e)
            }
            u(void 0)
          }))
        }
      }, e.exports.__esModule = !0, e.exports.default = e.exports
    },
    ee6b: function (e, t, n) {
      var o = n("e5e6");
      n.n(o).a
    },
    f379: function (e, t) {
      e.exports = "https://localhost/api/file/image/咨询顾问@3x.png"
    },
    f8f0: function (e, t, n) {
      var o = n("47a9");
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getOrderPrice = void 0;
      var c = o(n("7eb4")),
        a = o(n("ee10")),
        r = o(n("8138")),
        u = function () {
          var e = (0, a.default)(c.default.mark((function e(t, n) {
            var o;
            return c.default.wrap((function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, (0, r.default)({
                    url: "/pay/getPrice",
                    method: "post",
                    data: {
                      orderId: t,
                      couponDetailId: n
                    }
                  });
                case 2:
                  return o = e.sent, e.abrupt("return", o.data.data.price);
                case 4:
                case "end":
                  return e.stop()
              }
            }), e)
          })));
          return function (t, n) {
            return e.apply(this, arguments)
          }
        }();
      t.getOrderPrice = u
    },
    f9bc: function (e, t) {
      e.exports = "https://localhost/api/file/image/wx_gf@3x.png"
    },
    fd42: function (e, t, n) {
      var o = n("47a9"),
        c = o(n("3240")),
        a = o(n("c4a0"));
      c.default.use(a.default)
    },
    fd51: function (e, t, n) {
      var o = n("2a06");
      n.n(o).a
    },
    ff2d: function (e, t) {
      e.exports = "https://localhost/api/file/image/logo.png"
    }
  }
]);