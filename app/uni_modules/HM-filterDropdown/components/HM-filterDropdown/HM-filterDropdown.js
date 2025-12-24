(global.webpackJsonp = global.webpackJsonp || []).push([
    ["uni_modules/HM-filterDropdown/components/HM-filterDropdown/HM-filterDropdown"], {
        7917: function(e, t, n) {
            var u = n("47a9");
            Object.defineProperty(t, "__esModule", { value: !0 }), t.default = void 0;
            var i = u(n("3b2d")),
                s = u(n("af34")),
                r = {
                    name: "HM-filterDropdown",
                    data: function() {
                        return {
                            menuData: [],
                            subData: [],
                            menu: [],
                            showPage: -1,
                            pageState: [],
                            activeMenuArr: [],
                            shadowActiveMenuArr: [],
                            defaultActive: [],
                            triangleDeg: [],
                            isShowMask: !1,
                            maskVisibility: !1,
                            firstScrollInto: 0,
                            secondScrollInto: 0,
                            thirdScrollInto: 0,
                            componentTop: 0,
                            isReadNewSelect: !1
                        }
                    },
                    props: {
                        menuTop: { value: Number, default: !1 },
                        filterData: {
                            value: Array,
                            default: function() {
                                return []
                            }
                        },
                        defaultSelected: {
                            value: Array,
                            default: function() {
                                return []
                            }
                        },
                        updateMenuName: { value: Boolean, default: !0 },
                        dataFormat: { value: String, default: "Array" }
                    },
                    watch: {
                        filterData: {
                            handler: function(e) {
                                console.log("watch filterData"), this.menuData = JSON.parse(JSON.stringify(e)), this.initMenu()
                            },
                            immediate: !0,
                            deep: !0
                        },
                        defaultSelected: function(e) {
                            0 != e.length && (this.defaultActive = JSON.parse(JSON.stringify(e)), this.activeMenuArr = JSON.parse(JSON.stringify(e)) || [], this.shadowActiveMenuArr = JSON.parse(JSON.stringify(e)), this.updateMenuName && this.setMenuName())
                        }
                    },
                    methods: {
                        initMenu: function() {
                            console.log('initMenu 开始, menuData长度:', this.menuData.length);
                            // 清空数组，避免多次调用时累积
                            this.triangleDeg = [];
                            this.pageState = [];
                            for (var e, t = [], n = [], u = 0; u < this.menuData.length; u++) {
                                var i = this.menuData[u];
                                console.log('处理菜单项', u, ':', i.name, 'type:', i.type);
                                n.push({
                                    name: i.name || ("filter" == i.type ? "筛选" : i.submenu[0].name),
                                    type: i.type
                                }), t.push(this.processActive(i)), this.triangleDeg.push(0), this.pageState.push(!1), i = this.processSubMenu(i), this.menuData[u] = i
                            }
                            console.log('initMenu 完成, menu:', JSON.stringify(n));
                            console.log('initMenu 完成, pageState:', JSON.stringify(this.pageState));
                            console.log('initMenu 完成, subData长度:', this.menuData.length);
                            this.menu = n, t = this.defaultActive.length > 0 ? this.defaultActive : this.activeMenuArr.length > 0 ? this.activeMenuArr : t, this.defaultActive = [], (e = this.activeMenuArr).splice.apply(e, [0, this.activeMenuArr.length].concat((0, s.default)(JSON.parse(JSON.stringify(t))))), this.shadowActiveMenuArr = JSON.parse(JSON.stringify(t)), this.subData = this.menuData, this.updateMenuName && this.setMenuName();
                            // 强制更新视图
                            this.$forceUpdate && this.$forceUpdate();
                        },
                        setMenuName: function() {
                            for (var e = 0; e < this.activeMenuArr.length; e++) {
                                var t = this.activeMenuArr[e];
                                if ("hierarchy" == this.subData[e].type || "hierarchy-column" == this.subData[e].type)
                                    if ("number" == typeof t[0]) {
                                        var n = this.subData[e].submenu[t[0]];
                                        t.length > 1 && (n = n.submenu[t[1]] || n, t.length > 2 && (n = n.submenu[t[2]] || n)), this.menu[e].name = n.name
                                    } else this.menu[e].name = this.subData[e].name
                            }
                        },
                        showMoreSub: function(e) {
                            this.subData[this.showPage].submenu[this.activeMenuArr[this.showPage][0]].submenu[e].showAllSub = !0, this.$forceUpdate()
                        },
                        selectHierarchyMenu: function(e, t, n, u) {
                            var i;
                            null == n && null == u && this.shadowActiveMenuArr[e].length > 0 && this.shadowActiveMenuArr[e][0] == t && this.activeMenuArr.splice(e, 1, JSON.parse(JSON.stringify(this.shadowActiveMenuArr[e])));
                            var r = new Array(this.activeMenuArr[e].length).fill(null);
                            (i = this.activeMenuArr[e]).splice.apply(i, [0, this.activeMenuArr[e].length].concat((0, s.default)(r))), this.activeMenuArr[e].splice(0, 1, t);
                            var a = this.subData[e].submenu[t];
                            0 == a.submenu.length ? this.selectedMemu(e, t, n, u) : null != n && (this.activeMenuArr[e].splice(1, 1, n), 0 == (a = a.submenu[n]).submenu.length || "hierarchy" == this.menu[e].type && null == u ? this.selectedMemu(e, t, n, u) : null != u && (this.activeMenuArr[e].splice(2, 1, u), a = a.submenu[u], this.selectedMemu(e, t, n, u)))
                        },
                        selectedMemu: function(e, t, n, u) {
                            var i = this.subData[e].submenu[t].submenu[n];
                            this.updateMenuName && (this.menu[e].name = null != u && i.submenu[u].name || null != n && i.name || this.subData[e].submenu[t].name), this.shadowActiveMenuArr[e] = JSON.parse(JSON.stringify(this.activeMenuArr[e])), this.hideMenu(!0)
                        },
                        setFilterData: function(e) {
                            this.shadowActiveMenuArr = JSON.parse(JSON.stringify(this.activeMenuArr)), this.hideMenu(!0)
                        },
                        resetFilterData: function(e) {
                            for (var t = [], n = this.shadowActiveMenuArr[e].length; n > 0;) {
                                t.push([]);
                                for (var u = this.subData[e].submenu[n - 1].submenu, i = 0; i < u.length; i++) this.subData[e].submenu[n - 1].submenu[i].selected = !1;
                                n--
                            }
                            this.activeMenuArr[e] = JSON.parse(JSON.stringify(t)), this.$forceUpdate()
                        },
                        selectFilterLabel: function(e, t, n) {
                            var u = this.activeMenuArr[e][t].indexOf(n);
                            u > -1 ? (this.activeMenuArr[e][t].splice(u, 1), this.subData[e].submenu[t].submenu[n].selected = !1) : (this.activeMenuArr[e][t].push(n), this.subData[e].submenu[t].submenu[n].selected = !0), this.$forceUpdate()
                        },
                        selectRadioLabel: function(e, t, n) {
                            var u = this.activeMenuArr[e][t][0];
                            if (u == n) this.subData[e].submenu[t].submenu[u].selected = !1, this.activeMenuArr[e][t][0] = null;
                            else {
                                null != u && u < this.subData[e].submenu[t].submenu.length && (this.subData[e].submenu[t].submenu[u].selected = !1);
                                var i = this.subData[e].submenu[t].submenu[n];
                                i.selected = !0, this.activeMenuArr[e][t][0] = n, i.all ? (this.activeMenuArr[0][0] = [n], this.activeMenuArr[0][1] = []) : 0 === e && (0 === t ? (this.activeMenuArr[0][0] = [n], this.activeMenuArr[0][1] = []) : (this.activeMenuArr[0][0] = [], this.activeMenuArr[0][1] = [n]))
                            }
                            this.$forceUpdate()
                        },
                        togglePage: function(e) {
                            var t = this;
                            this.isToggleing || (this.isToggleing = !0, e == this.showPage ? this.hideMenu() : this.showMenu(e), setTimeout((function() {
                                t.isToggleing = !1
                            }), 150))
                        },
                        hideMenu: function(e) {
                            this.hideMenuLayer(!0), this.hideMaskLayer(), this.showPage = -1, e && this.confirm()
                        },
                        showMenu: function(e) {
                            this.showPage > -1 && this.hideMenuLayer(!1), this.showMenuLayer(e), this.showMaskLayer()
                        },
                        hideMaskLayer: function() {
                            var e = this;
                            this.isShowMask = !1, setTimeout((function() {
                                e.maskVisibility = !1
                            }), 0)
                        },
                        showMaskLayer: function() {
                            this.maskVisibility = !0, this.isShowMask = !0
                        },
                        hideMenuLayer: function(e) {
                            this.triangleDeg[this.showPage] = 0;
                            var t = this.showPage;
                            this.pageState.splice(t, 1, !1), this.firstScrollInto = null, this.secondScrollInto = null
                        },
                        showMenuLayer: function(e) {
                            console.log('showMenuLayer 调用, index:', e);
                            console.log('showMenuLayer 前 pageState:', JSON.stringify(this.pageState));
                            this.processPage(e), this.pageState.splice(e, 1, !0), this.showPage = e, this.triangleDeg[e] = 180;
                            console.log('showMenuLayer 后 pageState:', JSON.stringify(this.pageState));
                            console.log('showMenuLayer showPage:', this.showPage);
                        },
                        confirm: function() {
                            var e = this,
                                t = JSON.parse(JSON.stringify(this.shadowActiveMenuArr)),
                                n = JSON.parse(JSON.stringify(this.shadowActiveMenuArr));
                            t.forEach((function(u, s) {
                                if ("object" == (0, i.default)(u[0])) u.forEach((function(i, r) {
                                    null != i && (i.sort((function(e, t) {
                                        return e - t
                                    })), u[r] = i, i.forEach((function(u, i) {
                                        n[s][r][i] = null == u || u >= e.subData[s].submenu[r].submenu.length ? null : e.subData[s].submenu[r].submenu[u].value, "radio" == e.subData[s].type && null == n[s][r][i] && (n[s][r] = [], t[s][r] = [])
                                    })))
                                }));
                                else {
                                    var r = e.subData[s].submenu[u[0]];
                                    n[s][0] = r.value, n[s].length >= 2 && null != u[1] && (r.submenu.length > 0 ? (r = r.submenu[u[1]], n[s][1] = r.hasOwnProperty("value") ? r.value : null) : n[s][1] = null, n[s].length >= 3 && null != u[2] && (r.submenu.length > 0 ? (r = r.submenu[u[2]], n[s][2] = r.hasOwnProperty("value") ? r.value : null) : n[s][2] = null))
                                }
                                t[s] = u
                            })), this.$emit("confirm", { index: t, value: n })
                        },
                        reloadActiveMenuArr: function() {
                            console.log("123", this.menuData);
                            for (var e = 0; e < this.menuData.length; e++) {
                                var t = this.menuData[e],
                                    n = this.processActive(t);
                                t = this.processSubMenu(t), console.log("this.activeMenuArr[i].length", this.activeMenuArr[e].length), this.activeMenuArr[e].length != n.length && (this.menuData[e] = t, this.activeMenuArr.splice(e, 1, JSON.parse(JSON.stringify(n))), this.shadowActiveMenuArr.splice(e, 1, JSON.parse(JSON.stringify(n))))
                            }
                            this.subData = this.menuData, this.$forceUpdate()
                        },
                        processPage: function(e) {
                            var t = this;
                            if (this.reloadActiveMenuArr(), this.activeMenuArr.splice(e, 1, JSON.parse(JSON.stringify(this.shadowActiveMenuArr[e]))), "filter" == this.menu[e].type)
                                for (var n = this.shadowActiveMenuArr[e].length, u = 0; u < n; u++)
                                    for (var i = this.subData[e].submenu[u].submenu, s = 0; s < i.length; s++) this.shadowActiveMenuArr[e][u].indexOf(s) > -1 ? this.subData[e].submenu[u].submenu[s].selected = !0 : this.subData[e].submenu[u].submenu[s].selected = !1;
                            else if ("hierarchy" == this.menu[e].type) this.$nextTick((function() {
                                setTimeout((function() {
                                    t.firstScrollInto = parseInt(t.activeMenuArr[e][0]), t.secondScrollInto = parseInt(t.activeMenuArr[e][1])
                                }), 0)
                            }));
                            else if ("hierarchy-column" == this.menu[e].type) this.$nextTick((function() {
                                setTimeout((function() {
                                    t.firstScrollInto = parseInt(t.activeMenuArr[e][0]), t.secondScrollInto = parseInt(t.activeMenuArr[e][1]), t.thirdScrollInto = parseInt(t.activeMenuArr[e][2])
                                }), 0)
                            }));
                            else if ("radio" == this.menu[e].type)
                                for (var r = this.shadowActiveMenuArr[e].length, a = 0; a < r; a++)
                                    for (var h = this.subData[e].submenu[a].submenu, l = 0; l < h.length; l++) this.shadowActiveMenuArr[e][a].indexOf(l) > -1 ? this.subData[e].submenu[a].submenu[l].selected = !0 : this.subData[e].submenu[a].submenu[l].selected = !1
                        },
                        processActive: function(e) {
                            var t = [];
                            if (("hierarchy" == e.type || "hierarchy-column" == e.type) && e.hasOwnProperty("submenu") && e.submenu.length > 0)
                                for (var n = this.getMaxFloor(e.submenu); n > 0;) t.push(null), n--;
                            else if ("filter" == e.type)
                                for (var u = e.submenu.length; u > 0;) t.push([]), u--;
                            else if ("radio" == e.type)
                                for (var i = e.submenu.length; i > 0;) t.push([]), i--;
                            return t
                        },
                        processSubMenu: function(e) {
                            if (e.hasOwnProperty("submenu") && e.submenu.length > 0)
                                for (var t = 0; t < e.submenu.length; t++) e.submenu[t] = this.processSubMenu(e.submenu[t]);
                            else e.submenu = [];
                            return e
                        },
                        getMaxFloor: function(e) {
                            var t = 0;
                            return function e(n, u) {
                                n.forEach((function(n) {
                                    t = u > t ? u : t, n.hasOwnProperty("submenu") && n.submenu.length > 0 && e(n.submenu, u + 1)
                                }))
                            }(e, 1), t
                        },
                        discard: function() {}
                    }
                };
            t.default = r
        },
        "8ed15": function(e, t, n) {
            n.r(t);
            var u = n("7917"),
                i = n.n(u);
            for (var s in u)["default"].indexOf(s) < 0 && function(e) {
                n.d(t, e, (function() {
                    return u[e]
                }))
            }(s);
            t.default = i.a
        },
        9472: function(e, t, n) {
            n.d(t, "b", (function() {
                return u
            })), n.d(t, "c", (function() {
                return i
            })), n.d(t, "a", (function() {}));
            var u = function() {
                    var e = this;
                    console.log('渲染函数执行, subData长度:', e.subData ? e.subData.length : 0);
                    if (e.subData && e.subData.length > 0) {
                        console.log('渲染函数 subData[0]:', JSON.stringify({ name: e.subData[0].name, type: e.subData[0].type }));
                    }
                    var t = (e.$createElement, e._self._c, e.__map(e.subData, (function(t, n) {
                        var u = e.__get_orig(t),
                            i = ("hierarchy" == t.type || "hierarchy-column" == t.type) && t.submenu.length > 0;
                        console.log('渲染项', n, ': type=', t.type, ', g0=', i);
                        return {
                            $orig: u,
                            // 直接包含 type 和 submenu，避免通过 $orig 访问
                            itemType: t.type,
                            itemName: t.name,
                            itemSubmenu: t.submenu,
                            g0: i,
                            g1: i ? e.activeMenuArr[n].length : null,
                            g2: i ? e.activeMenuArr[n].length : null,
                            l2: i && "hierarchy" == t.type ? e.__map(t.submenu, (function(t, u) {
                                var i = e.__get_orig(t),
                                    s = e.activeMenuArr[n][0] == u && t.submenu.length > 0;
                                return {
                                    $orig: i,
                                    g3: s,
                                    l1: s ? e.__map(t.submenu, (function(n, u) {
                                        var i = e.__get_orig(n),
                                            s = n.submenu && t.submenu.length > 0 && n.submenu.length > 0;
                                        return {
                                            $orig: i,
                                            g4: s,
                                            l0: s ? e.__map(n.submenu, (function(t, u) {
                                                return {
                                                    $orig: e.__get_orig(t),
                                                    g5: 1 != n.showAllSub && 8 == u && n.submenu.length > 9
                                                }
                                            })) : null
                                        }
                                    })) : null
                                }
                            })) : null,
                            l3: i && "hierarchy" != t.type && "hierarchy-column" == t.type ? e.__map(t.submenu, (function(t, u) {
                                return { $orig: e.__get_orig(t), g6: e.activeMenuArr[n][0] == u && t.submenu.length > 0 }
                            })) : null,
                            l5: i && "hierarchy" != t.type && "hierarchy-column" == t.type ? e.__map(t.submenu, (function(t, u) {
                                return {
                                    $orig: e.__get_orig(t),
                                    l4: e.__map(t.submenu, (function(t, i) {
                                        return {
                                            $orig: e.__get_orig(t),
                                            g7: e.activeMenuArr[n][0] == u && e.activeMenuArr[n][1] == i && t.submenu.length > 0
                                        }
                                    }))
                                }
                            })) : null
                        }
                    })));
                    e.$mp.data = Object.assign({}, { $root: { l6: t } })
                },
                i = []
        },
        cb82: function(e, t, n) {
            n.r(t);
            var u = n("9472"),
                i = n("8ed15");
            for (var s in i)["default"].indexOf(s) < 0 && function(e) {
                n.d(t, e, (function() {
                    return i[e]
                }))
            }(s);
            n("75e3");
            var r = n("828b"),
                a = Object(r.a)(i.default, u.b, u.c, !1, null, null, null, !1, u.a, void 0);
            t.default = a.exports
        }
    }
]), (global.webpackJsonp = global.webpackJsonp || []).push(["uni_modules/HM-filterDropdown/components/HM-filterDropdown/HM-filterDropdown-create-component", {
        "uni_modules/HM-filterDropdown/components/HM-filterDropdown/HM-filterDropdown-create-component": function(e, t, n) {
            n("df3c").createComponent(n("cb82"))
        }
    },
    [
        ["uni_modules/HM-filterDropdown/components/HM-filterDropdown/HM-filterDropdown-create-component"]
    ]
]);