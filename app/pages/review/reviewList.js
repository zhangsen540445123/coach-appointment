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
      const list = res.data?.list || [];
      // 格式化时间
      const newList = list.map(item => ({
        ...item,
        createdAtStr: this.formatTime(item.createdAt)
      }));

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

  // 格式化时间
  formatTime(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;

    // 今天
    if (diff < 24 * 60 * 60 * 1000 && date.getDate() === now.getDate()) {
      return '今天';
    }
    // 昨天
    if (diff < 48 * 60 * 60 * 1000) {
      const yesterday = new Date(now - 24 * 60 * 60 * 1000);
      if (date.getDate() === yesterday.getDate()) {
        return '昨天';
      }
    }
    // 一周内
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      return Math.floor(diff / (24 * 60 * 60 * 1000)) + '天前';
    }
    // 其他
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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

