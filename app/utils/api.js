/**
 * API 模块 - 封装后端接口调用
 * 参考 template/goal-manage-miniprogram/services/api.js 实现
 */

const loginManager = require('./loginManager');

/**
 * 封装微信小程序请求
 * @param {Object} options - 请求选项
 * @returns {Promise<Object>} 响应数据
 */
function request(options) {
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token');
    const openid = wx.getStorageSync('openid');
    
    const fullUrl = loginManager.BASE_URL + options.url;
    
    console.log('发起请求:', fullUrl, options.method, options.data);
    
    const requestHeaders = {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
      'X-User-Openid': openid || '',
      ...options.header
    };
    
    wx.request({
      url: fullUrl,
      method: options.method || 'GET',
      data: options.data || {},
      header: requestHeaders,
      timeout: options.timeout || 10000,
      success: (res) => {
        console.log('请求响应:', res);
        if (res.statusCode === 200) {
          if (res.data && res.data.code !== undefined) {
            if (res.data.code === 200) {
              resolve(res.data);
            } else {
              reject(new Error(res.data.msg || `业务错误: ${res.data.code}`));
            }
          } else {
            resolve(res.data);
          }
        } else {
          reject(new Error(`HTTP错误: ${res.statusCode}`));
        }
      },
      fail: (error) => {
        console.error('请求失败:', error);
        reject(error);
      }
    });
  });
}

/**
 * 用户相关 API
 */
const userApi = {
  // 微信登录
  login(code) {
    return request({
      url: `/wx/user/${loginManager.APPID}/login`,
      method: 'GET',
      data: { code: code }
    });
  },
  
  // 获取会话密钥
  getSessionKey(code) {
    return request({
      url: `/wx/user/${loginManager.APPID}/getSessionKey`,
      method: 'GET',
      data: { code: code }
    });
  },
  
  // 解密手机号
  decryptPhone(code, openid) {
    return request({
      url: `/wx/user/${loginManager.APPID}/phone`,
      method: 'GET',
      data: { code: code, openid: openid }
    });
  },
  
  // 通过手机号登录
  loginByPhone(code, mobile, mobileArea) {
    return request({
      url: `/wx/user/${loginManager.APPID}/loginByPhone`,
      method: 'GET',
      data: { code: code, mobile: mobile, mobileArea: mobileArea || '86' }
    });
  },
  
  // 更新用户信息
  updateUserInfo(openid, nickName, avatarUrl) {
    return request({
      url: `/wx/user/${loginManager.APPID}/updateUserInfo`,
      method: 'POST',
      data: { openid: openid, nickName: nickName, avatarUrl: avatarUrl }
    });
  },
  
  // 获取小程序二维码
  getWxQrCode(scene, page, envVersion, width) {
    return request({
      url: `/wx/user/${loginManager.APPID}/getWxQrCode`,
      method: 'GET',
      data: { scene: scene, page: page, envVersion: envVersion, width: width }
    });
  }
};

/**
 * 咨询师相关 API
 */
const counselorApi = {
  // 获取咨询师列表
  getList(params) {
    return request({
      url: '/counselor/list',
      method: 'GET',
      data: params
    });
  },
  
  // 获取咨询师详情
  getDetail(id) {
    return request({
      url: `/counselor/${id}`,
      method: 'GET'
    });
  }
};

/**
 * 预约相关 API
 */
const appointmentApi = {
  // 创建预约
  create(data) {
    return request({
      url: '/appointment',
      method: 'POST',
      data: data
    });
  },

  // 获取预约列表
  getList(params) {
    return request({
      url: '/appointment/list',
      method: 'GET',
      data: params
    });
  },

  // 获取预约详情
  getDetail(id) {
    return request({
      url: `/appointment/${id}`,
      method: 'GET'
    });
  },

  // 取消预约
  cancel(id) {
    return request({
      url: `/appointment/${id}/cancel`,
      method: 'PUT'
    });
  }
};

/**
 * 筛选配置 API
 */
const filterApi = {
  // 获取筛选配置（话题方向 + 排序选项）
  getConfig() {
    return request({
      url: '/filter/config',
      method: 'GET'
    });
  },

  // 获取话题方向列表
  getTopicDirections() {
    return request({
      url: '/filter/topicDirections',
      method: 'GET'
    });
  },

  // 获取排序选项列表
  getSortOptions() {
    return request({
      url: '/filter/sortOptions',
      method: 'GET'
    });
  }
};

/**
 * 支付相关 API
 */
const payApi = {
  // 获取价格信息
  getPrice(data) {
    return request({
      url: '/pay/getPrice',
      method: 'POST',
      data: data
    });
  },

  // 发起支付
  toPay(orderId, data) {
    return request({
      url: `/pay/toPay/${orderId}`,
      method: 'POST',
      data: data || {}
    });
  },

  // 批量支付
  toBatchPay(orderIds) {
    return request({
      url: '/pay/toBatchPay',
      method: 'POST',
      data: { orderIds: orderIds }
    });
  },

  // 查询支付状态
  queryStatus(orderId) {
    return request({
      url: `/pay/queryStatus/${orderId}`,
      method: 'GET'
    });
  },

  // 发起微信支付（调用微信支付API）
  requestWxPayment(payParams) {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        timeStamp: payParams.timeStamp,
        nonceStr: payParams.nonceStr,
        package: payParams.packageValue,
        signType: payParams.signType,
        paySign: payParams.paySign,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  }
};

/**
 * 订单评价相关 API
 */
const reviewApi = {
  // 提交评价
  submit(data) {
    return request({
      url: '/order/review/submit',
      method: 'POST',
      data: data
    });
  },

  // 获取订单的评价
  getByOrderId(orderId) {
    return request({
      url: `/order/review/${orderId}`,
      method: 'GET'
    });
  },

  // 检查订单是否已评价
  checkReviewed(orderId) {
    return request({
      url: `/order/review/check/${orderId}`,
      method: 'GET'
    });
  },

  // 获取教练的评价列表
  getCounselorReviews(counselorId, page, pageSize) {
    return request({
      url: `/order/review/counselor/${counselorId}`,
      method: 'GET',
      data: { page: page || 1, pageSize: pageSize || 10 }
    });
  },

  // 获取教练的评价统计
  getCounselorStats(counselorId) {
    return request({
      url: `/order/review/counselor/${counselorId}/stats`,
      method: 'GET'
    });
  },

  // 获取我的评价列表
  getMyReviews(page, pageSize) {
    return request({
      url: '/order/review/my',
      method: 'GET',
      data: { page: page || 1, pageSize: pageSize || 10 }
    });
  },

  // 删除我的评价
  deleteReview(id) {
    return request({
      url: `/order/review/${id}`,
      method: 'DELETE'
    });
  }
};

module.exports = {
  request,
  userApi,
  counselorApi,
  appointmentApi,
  payApi,
  filterApi,
  reviewApi
};

