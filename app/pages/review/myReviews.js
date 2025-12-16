// 我的评价页面
const { reviewApi } = require('../../utils/api');

Page({
  data: {
    reviewList: [],
    page: 1,
    pageSize: 10,
    hasMore: true,
    loading: false
  },

  onLoad() {
    this.loadMyReviews();
  },

  // 加载我的评价列表
  async loadMyReviews() {
    const { page, pageSize, reviewList, loading, hasMore } = this.data;

    if (loading || !hasMore) return;

    this.setData({ loading: true });

    try {
      const res = await reviewApi.getMyReviews(page, pageSize);

      if (res.code === 200) {
        const newList = res.data?.list || res.data || [];
        this.setData({
          reviewList: page === 1 ? newList : [...reviewList, ...newList],
          hasMore: newList.length >= pageSize,
          page: page + 1
        });
      }
    } catch (error) {
      console.error('加载评价列表失败', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({ page: 1, hasMore: true, reviewList: [] });
    this.loadMyReviews().then(() => {
      wx.stopPullDownRefresh();
    });
  },

  // 上拉加载更多
  onReachBottom() {
    this.loadMyReviews();
  },

  // 预览图片
  previewImage(e) {
    const { url, urls } = e.currentTarget.dataset;
    wx.previewImage({
      current: url,
      urls: urls
    });
  },

  // 删除评价
  deleteReview(e) {
    const { id } = e.currentTarget.dataset;

    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条评价吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            const result = await reviewApi.deleteReview(id);

            if (result.code === 200) {
              wx.showToast({ title: '删除成功', icon: 'success' });
              // 刷新列表
              this.setData({ page: 1, hasMore: true, reviewList: [] });
              this.loadMyReviews();
            } else {
              wx.showToast({ title: result.message || '删除失败', icon: 'none' });
            }
          } catch (error) {
            console.error('删除评价失败', error);
            wx.showToast({ title: '删除失败', icon: 'none' });
          }
        }
      }
    });
  }
});

