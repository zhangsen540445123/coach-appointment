/**
 * 授权登录拦截器模块
 * 用于实现页面访问权限控制
 */

/**
 * 需要登录授权的页面路径列表
 */
const AUTH_REQUIRED_PAGES = [
  '/pages/user/user',           // 个人中心
  '/pages/myAppointments/myAppointments', // 我的预约
  '/pages/user/infoEdit',       // 个人信息编辑
  '/pages/user/coupon',         // 优惠券
  '/pages/user/userFocus',      // 我的关注
  '/pages/userList/preOrderList', // 预约列表
  '/pages/userList/accountMassage', // 账户信息
];

/**
 * 不需要登录的页面路径列表（可直接访问）
 */
const PUBLIC_PAGES = [
  '/pages/consult/consult',     // 预约咨询（首页）
  '/pages/consult/counselor',   // 咨询师详情
  '/pages/login/login',         // 登录页
  '/pages/contact/contact',     // 联系我们
  '/pages/userList/aboutUm',    // 关于我们
  '/pages/userList/consultGuide', // 咨询指南
];

/**
 * 检查用户是否已登录
 * @returns {boolean} 是否已登录
 */
function isLoggedIn() {
  try {
    const counselorInfo = wx.getStorageSync('counselor_info');
    return !!(counselorInfo && counselorInfo.userId);
  } catch (e) {
    console.error('检查登录状态失败:', e);
    return false;
  }
}

/**
 * 获取当前用户信息
 * @returns {Object|null} 用户信息
 */
function getUserInfo() {
  try {
    return wx.getStorageSync('counselor_info') || null;
  } catch (e) {
    console.error('获取用户信息失败:', e);
    return null;
  }
}

/**
 * 检查页面是否需要授权登录
 * @param {string} pagePath - 页面路径
 * @returns {boolean} 是否需要授权
 */
function requiresAuth(pagePath) {
  // 移除查询参数
  const cleanPath = pagePath.split('?')[0];
  return AUTH_REQUIRED_PAGES.some(path => cleanPath.includes(path) || cleanPath === path);
}

/**
 * 检查页面是否为公开页面
 * @param {string} pagePath - 页面路径
 * @returns {boolean} 是否为公开页面
 */
function isPublicPage(pagePath) {
  const cleanPath = pagePath.split('?')[0];
  return PUBLIC_PAGES.some(path => cleanPath.includes(path) || cleanPath === path);
}

/**
 * 页面授权检查 - 在页面 onShow 中调用
 * @param {Object} pageInstance - 页面实例 (this)
 * @param {Object} options - 配置选项
 * @param {Function} options.onAuthRequired - 需要授权时的回调
 * @param {Function} options.onAuthSuccess - 已授权时的回调
 * @returns {boolean} 是否已授权
 */
function checkAuth(pageInstance, options = {}) {
  const logged = isLoggedIn();
  
  if (!logged) {
    console.log('用户未登录，需要授权');
    if (options.onAuthRequired && typeof options.onAuthRequired === 'function') {
      options.onAuthRequired();
    }
    return false;
  }
  
  console.log('用户已登录');
  if (options.onAuthSuccess && typeof options.onAuthSuccess === 'function') {
    options.onAuthSuccess();
  }
  return true;
}

/**
 * 打开登录弹窗
 * @param {Object} pageInstance - 页面实例
 */
function openLoginPanel(pageInstance) {
  if (pageInstance.$refs && pageInstance.$refs.pageContainer) {
    pageInstance.$refs.pageContainer.openLoginPanel();
  } else {
    // 如果没有 PageContainer 组件，跳转到登录页
    wx.navigateTo({
      url: '/pages/login/login'
    });
  }
}

/**
 * 跳转到登录页
 * @param {string} returnUrl - 登录后返回的页面路径
 */
function navigateToLogin(returnUrl) {
  const url = returnUrl ? `/pages/login/login?returnUrl=${encodeURIComponent(returnUrl)}` : '/pages/login/login';
  wx.navigateTo({
    url: url,
    fail: () => {
      // 如果 navigateTo 失败，尝试 redirectTo
      wx.redirectTo({ url: url });
    }
  });
}

/**
 * 授权守卫 - 用于在页面生命周期中检查授权
 * @param {Object} pageInstance - 页面实例
 * @param {boolean} showLoginPanel - 是否显示登录弹窗
 * @returns {boolean} 是否已授权
 */
function guard(pageInstance, showLoginPanel = true) {
  if (!isLoggedIn()) {
    if (showLoginPanel) {
      openLoginPanel(pageInstance);
    }
    return false;
  }
  return true;
}

module.exports = {
  AUTH_REQUIRED_PAGES,
  PUBLIC_PAGES,
  isLoggedIn,
  getUserInfo,
  requiresAuth,
  isPublicPage,
  checkAuth,
  openLoginPanel,
  navigateToLogin,
  guard
};

