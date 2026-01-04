// pages/userList/userFeedback.js
var app = getApp();
var config = require('../../utils/config');

Page({
  data: {
    content: '',
    globalData: null
  },

  onLoad(options) {
    var that = this;
    try {
      var counselorInfo = wx.getStorageSync('counselor_info');
      if (counselorInfo) {
        that.setData({ globalData: counselorInfo });
      }
    } catch (e) {
      console.log('获取用户信息失败', e);
    }
  },

  onInput(e) {
    this.setData({ content: e.detail.value });
  },

  submitFeedback() {
    var that = this;
    if (!that.data.content || that.data.content.trim() === '') {
      wx.showToast({ title: '请输入反馈内容', icon: 'none' });
      return;
    }

    if (!that.data.globalData || !that.data.globalData.userId) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }

    wx.request({
      url: app.globalData.baseUrl + '/visitor/feedback/submit',
      method: 'POST',
      header: { 'content-type': 'application/json' },
      data: {
        userId: that.data.globalData.userId,
        userName: that.data.globalData.nickName || '',
        content: that.data.content
      },
      success: function (res) {
        if (res.data.code === 200) {
          wx.showToast({ title: '提交成功', icon: 'success' });
          setTimeout(function () {
            wx.navigateBack();
          }, 1500);
        } else {
          wx.showToast({ title: res.data.msg || '提交失败', icon: 'none' });
        }
      },
      fail: function () {
        wx.showToast({ title: '网络错误', icon: 'none' });
      }
    });
  }
})