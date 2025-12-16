// 评价列表组件
Component({
  properties: {
    // 评价列表
    list: {
      type: Array,
      value: []
    },
    // 评价统计
    stats: {
      type: Object,
      value: null
    },
    // 是否显示统计信息
    showStats: {
      type: Boolean,
      value: true
    },
    // 是否显示查看更多
    showMore: {
      type: Boolean,
      value: false
    },
    // 教练ID（用于跳转到评价列表页）
    counselorId: {
      type: Number,
      value: null
    }
  },

  methods: {
    // 预览图片
    previewImage(e) {
      const { url, urls } = e.currentTarget.dataset;
      wx.previewImage({
        current: url,
        urls: urls
      });
    },

    // 查看更多
    onViewMore() {
      const { counselorId } = this.data;
      if (counselorId) {
        wx.navigateTo({
          url: `/pages/review/reviewList?counselorId=${counselorId}`
        });
      }
      this.triggerEvent('viewMore');
    }
  }
});

