/**
 * 登录管理模块 - 统一管理微信小程序登录状态
 * 参考 template/goal-manage-miniprogram/utils/loginManager.js 实现
 *
 * 注意：本模块与现有系统 (vendor.js 中的 counselor_info) 保持兼容
 */

// 后端 API 基础地址（根据实际部署环境修改）
// const BASE_URL = 'http://localhost:8080'; // HTTP 开发环境（已弃用）
const BASE_URL = 'https://localhost'; // HTTPS 开发环境（通过 Nginx 网关）
// const BASE_URL = 'https://your-domain.com'; // 生产环境

// 微信小程序 AppID（从后端配置获取）
const APPID = 'wxd3578c75e67172b3';

/**
 * 检查用户登录状态
 * 兼容现有系统的 counselor_info 存储格式
 * @returns {Object} 登录状态信息
 */
function checkLoginStatus() {
    try {
        // 首先检查现有系统的 counselor_info（优先）
        const counselorInfo = wx.getStorageSync('counselor_info');
        if (counselorInfo && counselorInfo.userId) {
            return {
                isLoggedIn: true,
                openid: counselorInfo.openId || null,
                userId: counselorInfo.userId,
                userInfo: {
                    nickName: counselorInfo.nickName,
                    avatarUrl: counselorInfo.headUrl,
                    phone: counselorInfo.mobile
                },
                token: counselorInfo.authorization || null
            };
        }

        // 备用：检查新的存储格式
        const openid = wx.getStorageSync('openid');
        const userInfo = wx.getStorageSync('userInfo');
        const token = wx.getStorageSync('token');

        const isLoggedIn = !!(openid && token);

        return {
            isLoggedIn: isLoggedIn,
            openid: openid || null,
            userInfo: userInfo || null,
            token: token || null
        };
    } catch (e) {
        console.error('检查登录状态失败:', e);
        return {
            isLoggedIn: false,
            openid: null,
            userInfo: null,
            token: null
        };
    }
}

/**
 * 简单检查是否已登录（与现有系统 useLogin.isLogined 兼容）
 * @returns {boolean} 是否已登录
 */
function isLoggedIn() {
    try {
        const counselorInfo = wx.getStorageSync('counselor_info');
        return !!(counselorInfo && counselorInfo.userId);
    } catch (e) {
        return false;
    }
}

/**
 * 微信登录 - 获取 openid
 * @returns {Promise<Object>} 登录结果
 */
async function wxLogin() {
    return new Promise((resolve, reject) => {
        wx.login({
            success: async(loginRes) => {
                if (loginRes.code) {
                    try {
                        // 调用后端接口换取 openid
                        const result = await callApi(`/wx/user/${APPID}/login`, 'GET', { code: loginRes.code });

                        if (result && result.data) {
                            const loginData = result.data;

                            // 保存登录信息到本地存储
                            wx.setStorageSync('openid', loginData.openId);
                            wx.setStorageSync('userId', loginData.userId);
                            wx.setStorageSync('token', loginData.authorization);

                            if (loginData.nickName) {
                                wx.setStorageSync('userInfo', {
                                    nickName: loginData.nickName,
                                    avatarUrl: loginData.headUrl,
                                    phone: loginData.mobile
                                });
                            }

                            resolve({
                                success: true,
                                openid: loginData.openId,
                                userId: loginData.userId,
                                token: loginData.authorization,
                                userInfo: {
                                    nickName: loginData.nickName,
                                    avatarUrl: loginData.headUrl,
                                    phone: loginData.mobile
                                }
                            });
                        } else {
                            reject(new Error('登录响应数据异常'));
                        }
                    } catch (error) {
                        console.error('后端登录接口调用失败:', error);
                        reject(error);
                    }
                } else {
                    reject(new Error('获取微信登录凭证失败'));
                }
            },
            fail: (error) => {
                console.error('wx.login 失败:', error);
                reject(error);
            }
        });
    });
}

/**
 * 获取用户手机号
 * @param {Object} e - getPhoneNumber 事件对象
 * @returns {Promise<Object>} 手机号信息
 */
async function getPhoneNumber(e) {
    if (e.detail.errMsg !== 'getPhoneNumber:ok') {
        throw new Error('用户拒绝授权手机号');
    }

    const code = e.detail.code;
    if (!code) {
        throw new Error('获取手机号授权码失败');
    }

    const openid = wx.getStorageSync('openid');

    // 调用后端接口解密手机号
    const result = await callApi(`/wx/user/${APPID}/phone`, 'GET', {
        code: code,
        openid: openid // 传入 openid 以便后端自动更新用户手机号
    });

    if (result && result.data) {
        const phoneInfo = result.data;

        // 更新本地存储的用户信息
        const userInfo = wx.getStorageSync('userInfo') || {};
        userInfo.phone = phoneInfo.phoneNumber || phoneInfo.purePhoneNumber;
        wx.setStorageSync('userInfo', userInfo);

        return {
            success: true,
            phoneNumber: phoneInfo.phoneNumber,
            purePhoneNumber: phoneInfo.purePhoneNumber,
            countryCode: phoneInfo.countryCode
        };
    }

    throw new Error('解密手机号失败');
}

/**
 * 更新用户信息（头像、昵称）
 * @param {Object} userInfo - 用户信息 { nickName, avatarUrl }
 * @returns {Promise<Object>} 更新结果
 */
async function updateUserInfo(userInfo) {
    const openid = wx.getStorageSync('openid');

    if (!openid) {
        throw new Error('用户未登录');
    }

    const result = await callApi(`/wx/user/${APPID}/updateUserInfo`, 'POST', {
        openid: openid,
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl
    });

    if (result && result.data) {
        // 更新本地存储
        const storedUserInfo = wx.getStorageSync('userInfo') || {};
        storedUserInfo.nickName = userInfo.nickName;
        storedUserInfo.avatarUrl = userInfo.avatarUrl;
        wx.setStorageSync('userInfo', storedUserInfo);

        return {
            success: true,
            userInfo: storedUserInfo
        };
    }

    throw new Error('更新用户信息失败');
}

/**
 * 登出
 */
function logout() {
    try {
        wx.removeStorageSync('openid');
        wx.removeStorageSync('userId');
        wx.removeStorageSync('token');
        wx.removeStorageSync('userInfo');
        console.log('用户已登出');
    } catch (e) {
        console.error('登出失败:', e);
    }
}

/**
 * 封装 API 调用
 * @param {string} url - API 路径
 * @param {string} method - 请求方法
 * @param {Object} data - 请求数据
 * @returns {Promise<Object>} 响应数据
 */
function callApi(url, method = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        const token = wx.getStorageSync('token');
        const openid = wx.getStorageSync('openid');

        wx.request({
            url: BASE_URL + url,
            method: method,
            data: data,
            header: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                'X-User-Openid': openid || ''
            },
            success: (res) => {
                if (res.statusCode === 200) {
                    if (res.data && res.data.code === 200) {
                        resolve(res.data);
                    } else {
                        reject(new Error(res.data.msg || '请求失败'));
                    }
                } else {
                    reject(new Error(`HTTP错误: ${res.statusCode}`));
                }
            },
            fail: (error) => {
                console.error('API请求失败:', error);
                reject(error);
            }
        });
    });
}

/**
 * 获取默认用户信息
 * @returns {Object} 默认用户信息
 */
function getDefaultUserInfo() {
    return {
        nickName: '微信用户',
        avatarUrl: '/static/img/default-avatar.png',
        phone: ''
    };
}

module.exports = {
    checkLoginStatus,
    isLoggedIn,
    wxLogin,
    getPhoneNumber,
    updateUserInfo,
    logout,
    callApi,
    getDefaultUserInfo,
    BASE_URL,
    APPID
};