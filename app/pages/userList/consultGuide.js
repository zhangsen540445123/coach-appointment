// pages/userList/consultGuide.js
// 咨询指南页面 - 使用内联配置避免模块依赖问题
var app = getApp();

Page({
  data: {
    activeTab: 0,
    guideList: [],
    loading: false
  },

  onLoad: function (options) {
    this.loadGuideList();
  },

  switchTab: function (e) {
    var tab = parseInt(e.currentTarget.dataset.tab);
    if (tab !== this.data.activeTab) {
      this.setData({
        activeTab: tab,
        guideList: []
      });
      this.loadGuideList();
    }
  },

  loadGuideList: function () {
    var that = this;
    that.setData({ loading: true });

    // 使用 app.globalData.baseUrl 获取 API 地址
    var baseUrl = (app && app.globalData && app.globalData.baseUrl) || 'https://localhost/api';

    wx.request({
      url: baseUrl + '/orderConsult/getConsultGuide?category=' + that.data.activeTab,
      method: 'GET',
      success: function (res) {
        console.log('咨询指南响应:', res.data);
        if (res.data && res.data.code === 200) {
          var list = (res.data.data || []).map(function (item) {
            return {
              id: item.id,
              title: item.title,
              content: item.content,
              expanded: false
            };
          });
          that.setData({
            guideList: list,
            loading: false
          });
        } else {
          that.setData({ loading: false });
          wx.showToast({
            title: (res.data && res.data.msg) || '加载失败',
            icon: 'none'
          });
        }
      },
      fail: function (err) {
        console.error('请求失败:', err);
        that.setData({ loading: false });
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        });
      }
    });
  },

  toggleItem: function (e) {
    var index = e.currentTarget.dataset.index;
    var key = 'guideList[' + index + '].expanded';
    var newValue = !this.data.guideList[index].expanded;
    this.setData({
      [key]: newValue
    });
  },

  onPullDownRefresh: function () {
    this.loadGuideList();
    wx.stopPullDownRefresh();
  },

  onShareAppMessage: function () {
    return {
      title: '咨询指南',
      path: '/pages/userList/consultGuide'
    };
  }
});