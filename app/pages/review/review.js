// 评价页面
const { reviewApi } = require('../../utils/api');

Page({
  data: {
    orderId: null,
    orderInfo: null,
    rating: 0,
    content: '',
    images: [],
    isAnonymous: false,
    submitting: false,
    ratingTexts: ['非常差', '较差', '一般', '满意', '非常满意'],
    canSubmit: false,
    statusBarHeight: 0,
    navbarHeight: 0
  },

  onLoad(options) {
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight,
      navbarHeight: systemInfo.statusBarHeight + 44
    });

    if (options.orderId) {
      this.setData({ orderId: options.orderId });
      this.loadOrderInfo(options.orderId);
    }
    // 如果传入了订单信息
    if (options.orderInfo) {
      try {
        const orderInfo = JSON.parse(decodeURIComponent(options.orderInfo));
        this.setData({ orderInfo });
      } catch (e) {
        console.error('解析订单信息失败', e);
      }
    }
  },

  // 加载订单信息
  async loadOrderInfo(orderId) {
    // 这里可以调用获取订单详情的接口
    // 暂时使用本地存储的订单信息
    const orderInfo = wx.getStorageSync('currentOrderForReview');
    if (orderInfo) {
      this.setData({ orderInfo });
    }
  },

  // 设置评分
  setRating(e) {
    const rating = e.currentTarget.dataset.rating;
    this.setData({ rating });
    this.checkCanSubmit();
  },

  // 输入评价内容
  onContentInput(e) {
    this.setData({ content: e.detail.value });
  },

  // 检查是否可以提交
  checkCanSubmit() {
    const { rating } = this.data;
    this.setData({ canSubmit: rating > 0 });
  },

  // 选择图片
  chooseImage() {
    const { images } = this.data;
    const remainCount = 3 - images.length;
    
    wx.chooseImage({
      count: remainCount,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 实际项目中需要上传图片到服务器
        // 这里暂时使用本地路径
        const newImages = [...images, ...res.tempFilePaths];
        this.setData({ images: newImages });
      }
    });
  },

  // 移除图片
  removeImage(e) {
    const index = e.currentTarget.dataset.index;
    const { images } = this.data;
    images.splice(index, 1);
    this.setData({ images });
  },

  // 切换匿名状态
  toggleAnonymous() {
    this.setData({ isAnonymous: !this.data.isAnonymous });
  },

  // 提交评价
  async submitReview() {
    const { orderId, rating, content, images, isAnonymous, submitting } = this.data;

    if (submitting) return;
    if (rating <= 0) {
      wx.showToast({ title: '请选择评分', icon: 'none' });
      return;
    }

    this.setData({ submitting: true });

    try {
      await reviewApi.submit({
        orderId: orderId,
        rating: rating,
        content: content,
        images: images,
        isAnonymous: isAnonymous ? 1 : 0
      });

      wx.showToast({ title: '评价成功', icon: 'success' });

      // 返回上一页
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    } catch (error) {
      console.error('提交评价失败', error);
      wx.showToast({ title: error.message || '提交失败', icon: 'none' });
    } finally {
      this.setData({ submitting: false });
    }
  },

  // 返回
  goBack() {
    wx.navigateBack();
  }
});

