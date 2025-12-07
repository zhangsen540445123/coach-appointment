var app = getApp();

Page({
  data: {
    qrCodeUrl: ''
  },

  onLoad() {
    this.loadQrCode();
  },

  loadQrCode() {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/global/settings',
      method: 'GET',
      success: function(res) {
        if (res.data.code === 200 && res.data.data) {
          that.setData({
            qrCodeUrl: res.data.data.customerServiceQrCode || app.globalData.baseUrl + '/file/image/default_qrcode.png'
          });
        }
      },
      fail: function() {
        that.setData({
          qrCodeUrl: app.globalData.baseUrl + '/file/image/default_qrcode.png'
        });
      }
    });
  }
});
