var loginManager = require('../../utils/loginManager');

Page({
    data: {
        content: '',
        charCount: 0,
        globalData: null,
        submitting: false
    },

    onLoad(options) {
        console.log("=== feedback page onLoad ===");
        var that = this;
        try {
            // 从本地存储获取用户信息
            var counselorInfo = wx.getStorageSync('counselor_info');
            console.log("获取用户信息:", counselorInfo);
            if (counselorInfo) {
                // 如果是字符串，尝试解析
                if (typeof counselorInfo === 'string') {
                    counselorInfo = JSON.parse(counselorInfo);
                }
                that.setData({ globalData: counselorInfo });
            }
        } catch (e) {
            console.error('获取用户信息失败', e);
        }
    },

    onInput(e) {
        const content = e.detail.value;
        this.setData({
            content: content,
            charCount: content.length
        });
    },

    onSubmit() {
        var that = this;

        if (this.data.content.trim().length === 0) {
            wx.showToast({
                title: '反馈内容不能为空',
                icon: 'none'
            });
            return;
        }

        if (!this.data.globalData || !this.data.globalData.userId) {
            wx.showToast({
                title: '请先登录',
                icon: 'none'
            });
            setTimeout(() => {
                wx.navigateTo({
                    url: '/pages/login/login'
                });
            }, 1500);
            return;
        }

        if (this.data.submitting) {
            return;
        }

        this.setData({ submitting: true });
        console.log("提交反馈，userId:", this.data.globalData.userId);

        // 使用原生 wx.request
        wx.request({
            url: loginManager.BASE_URL + '/visitor/feedback/submit',
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                'Authorization': that.data.globalData.authorization || ''
            },
            data: {
                userId: that.data.globalData.userId,
                userName: that.data.globalData.nickName || '',
                content: that.data.content
            },
            success: function(res) {
                console.log("提交反馈响应:", res);
                that.setData({ submitting: false });
                if (res.data.code === 200) {
                    wx.showToast({
                        title: '提交成功',
                        icon: 'success'
                    });
                    setTimeout(() => {
                        wx.navigateBack();
                    }, 1500);
                } else {
                    wx.showToast({
                        title: res.data.msg || '提交失败',
                        icon: 'none'
                    });
                }
            },
            fail: function(err) {
                console.error("提交反馈失败:", err);
                that.setData({ submitting: false });
                wx.showToast({
                    title: '网络错误，请稍后重试',
                    icon: 'none'
                });
            }
        });
    }
});