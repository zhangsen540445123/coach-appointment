/**
 * 活动预约辅助函数
 */

const { studioApi, payApi } = require('./api');
const loginManager = require('./loginManager');

/**
 * 处理活动预约
 * @param {Object} studioDetails - 活动详情
 * @param {Object} bookingStatus - 当前预约状态
 * @param {Function} onSuccess - 成功回调
 * @param {Function} onError - 失败回调
 */
function handleStudioBooking(studioDetails, bookingStatus, onSuccess, onError) {
  console.log('处理活动预约:', studioDetails, bookingStatus);

  // 检查登录状态
  if (!loginManager.isLogined()) {
    wx.showToast({
      title: '请先登录',
      icon: 'none'
    });
    if (onError) onError(new Error('未登录'));
    return;
  }

  // 检查手机号绑定
  const phone = wx.getStorageSync('phone');
  if (!phone) {
    wx.showModal({
      title: '提示',
      content: '预约活动需要绑定手机号，是否前往绑定？',
      success: (res) => {
        if (res.confirm) {
          // 跳转到手机号绑定页面
          wx.navigateTo({
            url: '/pages/login/phoneAuth'
          });
        }
      }
    });
    if (onError) onError(new Error('未绑定手机号'));
    return;
  }

  // 如果已预约且已支付，提示用户
  if (bookingStatus && bookingStatus.status === 1) {
    wx.showToast({
      title: '您已预约该活动',
      icon: 'none'
    });
    return;
  }

  // 如果待支付，跳转支付
  if (bookingStatus && bookingStatus.status === 0) {
    handlePayment(bookingStatus.id, onSuccess, onError);
    return;
  }

  // 发起新预约
  wx.showLoading({ title: '预约中...' });
  
  studioApi.bookStudio(studioDetails.id)
    .then(res => {
      wx.hideLoading();
      console.log('预约响应:', res);
      
      if (res.code === 200) {
        const data = res.data;
        
        // 免费活动，直接预约成功
        if (data.isFree || studioDetails.price === 0) {
          wx.showToast({
            title: '预约成功',
            icon: 'success'
          });
          if (onSuccess) onSuccess(data);
        } 
        // 收费活动，需要支付
        else if (data.payParams) {
          handlePayment(data.bookingId, onSuccess, onError, data.payParams);
        }
      } else {
        wx.showToast({
          title: res.msg || '预约失败',
          icon: 'none'
        });
        if (onError) onError(new Error(res.msg));
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.error('预约失败:', err);
      wx.showToast({
        title: err.message || '预约失败',
        icon: 'none'
      });
      if (onError) onError(err);
    });
}

/**
 * 处理支付
 * @param {Number} bookingId - 预约ID
 * @param {Function} onSuccess - 成功回调
 * @param {Function} onError - 失败回调
 * @param {Object} payParams - 支付参数（可选，如果没有则重新获取）
 */
function handlePayment(bookingId, onSuccess, onError, payParams) {
  console.log('处理支付:', bookingId, payParams);

  const doPayment = (params) => {
    wx.requestPayment({
      timeStamp: params.timeStamp,
      nonceStr: params.nonceStr,
      package: params.packageValue,
      signType: params.signType,
      paySign: params.paySign,
      success: (res) => {
        console.log('支付成功:', res);
        wx.showToast({
          title: '支付成功',
          icon: 'success'
        });
        if (onSuccess) onSuccess({ bookingId, paid: true });
      },
      fail: (err) => {
        console.error('支付失败:', err);
        wx.showToast({
          title: '支付失败',
          icon: 'none'
        });
        if (onError) onError(err);
      }
    });
  };

  if (payParams) {
    doPayment(payParams);
  } else {
    // 重新获取支付参数
    wx.showLoading({ title: '加载中...' });
    studioApi.payBooking(bookingId)
      .then(res => {
        wx.hideLoading();
        if (res.code === 200 && res.data) {
          doPayment(res.data);
        } else {
          wx.showToast({
            title: res.msg || '获取支付参数失败',
            icon: 'none'
          });
          if (onError) onError(new Error(res.msg));
        }
      })
      .catch(err => {
        wx.hideLoading();
        console.error('获取支付参数失败:', err);
        wx.showToast({
          title: '获取支付参数失败',
          icon: 'none'
        });
        if (onError) onError(err);
      });
  }
}

module.exports = {
  handleStudioBooking,
  handlePayment
};

