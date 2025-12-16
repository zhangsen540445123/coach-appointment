// 教练评价展示组件
const { reviewApi } = require('../../utils/api');

Component({
  properties: {
    counselorId: {
      type: Number,
      value: 0,
      observer: function(newVal) {
        if (newVal) {
          this.loadReviews();
          this.loadStats();
        }
      }
    }
  },

  data: {
    reviewList: [],
    avgRating: '5.0',
    totalCount: 0,
    loading: false
  },

  lifetimes: {
    attached: function() {
      if (this.properties.counselorId) {
        this.loadReviews();
        this.loadStats();
      }
    }
  },

  methods: {
    // 加载评价列表（只显示前3条）
    async loadReviews() {
      if (!this.properties.counselorId) return;
      
      this.setData({ loading: true });
      
      try {
        const res = await reviewApi.getCounselorReviews(this.properties.counselorId, 1, 3);
        
        if (res.code === 200) {
          const list = res.data?.list || res.data || [];
          // 格式化时间
          const formattedList = list.map(item => ({
            ...item,
            createdAtStr: this.formatTime(item.createdAt)
          }));
          this.setData({ reviewList: formattedList });
        }
      } catch (error) {
        console.error('加载评价失败', error);
      } finally {
        this.setData({ loading: false });
      }
    },

    // 加载评价统计
    async loadStats() {
      if (!this.properties.counselorId) return;
      
      try {
        const res = await reviewApi.getCounselorStats(this.properties.counselorId);
        
        if (res.code === 200 && res.data) {
          this.setData({
            avgRating: res.data.avgRating ? parseFloat(res.data.avgRating).toFixed(1) : '5.0',
            totalCount: res.data.totalCount || 0
          });
        }
      } catch (error) {
        console.error('加载评价统计失败', error);
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

    // 预览图片
    previewImage(e) {
      const { url, urls } = e.currentTarget.dataset;
      wx.previewImage({
        current: url,
        urls: urls
      });
    },

    // 查看全部评价
    viewAllReviews() {
      wx.navigateTo({
        url: `/pages/review/reviewList?counselorId=${this.properties.counselorId}`
      });
    }
  }
});

