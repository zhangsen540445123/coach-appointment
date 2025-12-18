// ============ 全局配置 - 修改此处即可更换环境 ============
var __APP_CONFIG__ = {
    // 开发环境
    // baseUrl: "https://localhost/api",
    // imageBaseUrl: "https://localhost/api/file/image",

    // 生产环境 - 发布时取消注释下面两行，注释上面两行
    baseUrl: "https://localhost/api",
    imageBaseUrl: "https://localhost/api/file/image",

    appId: "wxd3578c75e67172b3"
};
// ========================================================
(global.webpackJsonp = global.webpackJsonp || []).push([
    ["pages/filter/common/vendor"], {
        2205: function(n, i) {
            n.exports = __APP_CONFIG__.imageBaseUrl  + "/03_线下@3x.png"
        },
        "395c": function(n, i, s) {},
        "6eb3": function(n, i) {
            n.exports = __APP_CONFIG__.imageBaseUrl + "/01_可约@3x.png"
        },
        "91c1": function(n, i) {
            n.exports = __APP_CONFIG__.imageBaseUrl + "/04_青少年@3x.png"
        },
        "946a": function(n, i) {
            n.exports = __APP_CONFIG__.imageBaseUrl + "/02_低价@3x.png"
        },
        fe31: function(n, i, s) {
            var t = s("395c");
            s.n(t).a
        }
    }
]);