var loginManager = require('../../utils/loginManager');

Page({
    data: {
        qrCodeUrl: '',
        loading: true
    },

    onLoad() {
        console.log("=== contact page onLoad ===");
        this.loadQrCode();
    },

    loadQrCode() {
        var that = this;
        console.log("开始加载客服二维码");

        // 使用原生 wx.request
        wx.request({
            url: loginManager.BASE_URL + '/api/global/settings',
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log("获取客服二维码响应:", res);
                if (res.data.code === 200 && res.data.data) {
                    var qrCode = res.data.data.customerServiceQrCode;
                    console.log("客服二维码URL:", qrCode);
                    that.setData({
                        qrCodeUrl: qrCode || 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20211115/351753974260_.pic_hd.jpg',
                        loading: false
                    });
                } else {
                    console.error("获取客服二维码失败:", res.data.msg);
                    that.setData({
                        qrCodeUrl: 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20211115/351753974260_.pic_hd.jpg',
                        loading: false
                    });
                }
            },
            fail: function(err) {
                console.error("获取客服二维码网络错误:", err);
                that.setData({
                    qrCodeUrl: 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20211115/351753974260_.pic_hd.jpg',
                    loading: false
                });
                wx.showToast({
                    title: '加载失败，显示默认二维码',
                    icon: 'none'
                });
            }
        });
    },

    // 长按保存图片
    onLongPress() {
        var that = this;
        wx.showModal({
            title: '提示',
            content: '是否保存图片到相册？',
            success: function(res) {
                if (res.confirm) {
                    wx.downloadFile({
                        url: that.data.qrCodeUrl,
                        success: function(downloadRes) {
                            if (downloadRes.statusCode === 200) {
                                wx.saveImageToPhotosAlbum({
                                    filePath: downloadRes.tempFilePath,
                                    success: function() {
                                        wx.showToast({
                                            title: '保存成功',
                                            icon: 'success'
                                        });
                                    },
                                    fail: function() {
                                        wx.showToast({
                                            title: '保存失败',
                                            icon: 'none'
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }
});