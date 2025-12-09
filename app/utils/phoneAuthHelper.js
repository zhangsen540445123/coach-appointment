/**
 * 手机号授权登录辅助模块
 * 用于处理微信小程序手机号授权的各种情况
 */

/**
 * 检测是否是模拟器环境的错误
 * @param {Object} detail - getPhoneNumber 事件的 detail 对象
 * @returns {boolean} 是否是模拟器错误
 */
function isSimulatorError(detail) {
  if (!detail || !detail.errMsg) return false;
  const errMsg = detail.errMsg.toLowerCase();
  return errMsg.includes('-10000') || 
         errMsg.includes('simulator') ||
         errMsg.includes('系统错误');
}

/**
 * 获取用户友好的错误提示信息
 * @param {Object} detail - getPhoneNumber 事件的 detail 对象
 * @returns {Object} 错误信息对象 { title, content }
 */
function getErrorMessage(detail) {
  if (!detail || !detail.errMsg) {
    return {
      title: '授权失败',
      content: '获取手机号失败，请重试'
    };
  }

  const errMsg = detail.errMsg;

  // 模拟器环境错误
  if (isSimulatorError(detail)) {
    return {
      title: '提示',
      content: '手机号授权功能在模拟器中不可用，请使用"真机调试"或"预览"功能在手机上测试'
    };
  }

  // 用户拒绝授权
  if (errMsg.includes('deny') || errMsg.includes('refuse')) {
    return {
      title: '授权取消',
      content: '绑定手机号能够提供更加方便的服务，请重新授权'
    };
  }

  // 用户取消操作
  if (errMsg.includes('cancel')) {
    return {
      title: '授权取消',
      content: '您取消了手机号授权，请重新操作'
    };
  }

  // 其他错误
  return {
    title: '授权失败',
    content: '获取手机号失败: ' + errMsg
  };
}

/**
 * 处理 getPhoneNumber 事件结果
 * @param {Object} e - getPhoneNumber 事件对象
 * @param {Function} onSuccess - 授权成功回调，参数为 detail
 * @param {Function} onFail - 授权失败回调，参数为 errorInfo
 */
function handlePhoneAuth(e, onSuccess, onFail) {
  const detail = e.detail || {};
  
  console.log('[phoneAuthHelper] getPhoneNumber result:', detail);
  
  if (detail.errMsg === 'getPhoneNumber:ok') {
    console.log('[phoneAuthHelper] Authorization success');
    if (typeof onSuccess === 'function') {
      onSuccess(detail);
    }
  } else {
    const errorInfo = getErrorMessage(detail);
    console.log('[phoneAuthHelper] Authorization failed:', errorInfo);
    
    // 显示错误提示
    wx.showModal({
      title: errorInfo.title,
      content: errorInfo.content,
      showCancel: false,
      confirmText: '我知道了'
    });
    
    if (typeof onFail === 'function') {
      onFail(errorInfo);
    }
  }
}

/**
 * 检测当前是否在微信开发者工具中运行
 * @returns {boolean} 是否在开发者工具中
 */
function isDevTool() {
  try {
    const systemInfo = wx.getSystemInfoSync();
    return systemInfo.platform === 'devtools';
  } catch (e) {
    return false;
  }
}

/**
 * 在点击按钮前检查环境并给出提示
 * @returns {boolean} 是否可以继续操作
 */
function checkEnvironmentBeforeAuth() {
  if (isDevTool()) {
    wx.showModal({
      title: '开发环境提示',
      content: '您正在微信开发者工具中运行，手机号授权功能可能不可用。建议使用"真机调试"或"预览"功能测试。',
      confirmText: '继续',
      cancelText: '取消',
      success: function(res) {
        // 用户选择继续或取消
      }
    });
    return false;
  }
  return true;
}

module.exports = {
  isSimulatorError,
  getErrorMessage,
  handlePhoneAuth,
  isDevTool,
  checkEnvironmentBeforeAuth
};

