/**
 * 活动详情页面辅助函数
 * 用于扩展编译后的活动详情页面功能
 */

const { studioApi } = require('../../utils/api');
const { handleStudioBooking } = require('../../utils/studioBooking');

/**
 * 初始化活动详情页面的预约功能
 * @param {Object} page - 页面实例
 * @param {Number} studioId - 活动ID
 */
function initBookingFeature(page, studioId) {
  console.log('初始化活动预约功能:', studioId);

  // 加载预约状态
  loadBookingStatus(page, studioId);

  // 添加预约处理方法
  page.handleBooking = function() {
    const details = page.data.details || {};
    const bookingStatus = page.data.bookingStatus;

    handleStudioBooking(
      details,
      bookingStatus,
      (result) => {
        console.log('预约成功:', result);
        // 刷新预约状态
        loadBookingStatus(page, studioId);
      },
      (err) => {
        console.error('预约失败:', err);
      }
    );
  };
}

/**
 * 加载预约状态
 * @param {Object} page - 页面实例
 * @param {Number} studioId - 活动ID
 */
function loadBookingStatus(page, studioId) {
  studioApi.getBookingStatus(studioId)
    .then(res => {
      console.log('预约状态:', res);
      if (res.code === 200) {
        page.setData({
          bookingStatus: res.data
        });
      }
    })
    .catch(err => {
      console.error('获取预约状态失败:', err);
      // 不显示错误提示，静默失败
    });
}

module.exports = {
  initBookingFeature,
  loadBookingStatus
};

