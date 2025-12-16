// 评价列表页面
const { reviewApi } = require('../../utils/api');

Page({
  data: {
    counselorId: null,
    reviewList: [],
    stats: null,
    page: 1,
    pageSize: 10,
    hasMore: true,
    loading: false
  },

  onLoad(options) {
    if (options.counselorId) {
      this.setData({ counselorId: options.counselorId });
      this.loadStats();
      this.loadReviews();
    }
  },

  // 加载评价统计
  async loadStats() {
    const { counselorId } = this.data;
    try {
      const res = await reviewApi.getCounselorStats(counselorId);
      this.setData({ stats: res.data });
    } catch (error) {
      console.error('加载评价统计失败', error);
    }
  },

  // 加载评价列表
  async loadReviews() {
    const { counselorId, page, pageSize, reviewList, loading, hasMore } = this.data;
    
    if (loading || !hasMore) return;
    
    this.setData({ loading: true });

    try {
      const res = await reviewApi.getCounselorReviews(counselorId, page, pageSize);
      const newList = res.data?.list || [];
      
      this.setData({
        reviewList: page === 1 ? newList : [...reviewList, ...newList],
        hasMore: newList.length >= pageSize,
        page: page + 1
      });
    } catch (error) {
      console.error('加载评价列表失败', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({ page: 1, hasMore: true, reviewList: [] });
    this.loadStats();
    this.loadReviews().then(() => {
      wx.stopPullDownRefresh();
    });
  },

  // 上拉加载更多
  onReachBottom() {
    this.loadReviews();
  },

  // 预览图片
  previewImage(e) {
    const { url, urls } = e.currentTarget.dataset;
    wx.previewImage({
      current: url,
      urls: urls
    });
  }
});

