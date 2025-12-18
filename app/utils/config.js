/**
 * 小程序全局配置文件
 * 统一管理 API 基础 URL 和其他环境配置
 * 
 * 使用方法：
 * const config = require('./config');
 * console.log(config.baseUrl);
 */

// ============================================================
// 环境配置
// ============================================================

/**
 * 环境类型枚举
 */
const ENV_TYPE = {
  DEVELOPMENT: 'development',   // 开发环境
  TESTING: 'testing',           // 测试环境
  PRODUCTION: 'production'      // 生产环境
};

/**
 * 当前运行环境
 * 
 * 说明：
 * - development: 本地开发环境，使用 localhost
 * - testing: 测试环境，使用测试服务器
 * - production: 生产环境，使用正式服务器
 * 
 * 【重要】发布前请修改此值为 'production'
 */
const CURRENT_ENV = ENV_TYPE.DEVELOPMENT;

// ============================================================
// 环境配置表
// ============================================================

const ENV_CONFIG = {
  // 开发环境配置
  [ENV_TYPE.DEVELOPMENT]: {
    baseUrl: 'https://localhost',           // API 基础 URL（通过 Nginx 网关）
    apiPath: '/api',                         // API 路径前缀
    imageBaseUrl: 'https://localhost/api/file/image',  // 图片资源基础 URL
    appId: 'wxd3578c75e67172b3',            // 微信小程序 AppID
    debug: true                              // 是否开启调试模式
  },
  
  // 测试环境配置
  [ENV_TYPE.TESTING]: {
    baseUrl: 'https://test.your-domain.com', // 测试服务器地址
    apiPath: '/api',
    imageBaseUrl: 'https://test.your-domain.com/api/file/image',
    appId: 'wxd3578c75e67172b3',
    debug: true
  },
  
  // 生产环境配置
  [ENV_TYPE.PRODUCTION]: {
    baseUrl: 'https://your-domain.com',      // 正式服务器地址
    apiPath: '/api',
    imageBaseUrl: 'https://your-domain.com/api/file/image',
    appId: 'wxd3578c75e67172b3',
    debug: false
  }
};

// ============================================================
// 导出配置
// ============================================================

// 获取当前环境配置
const currentConfig = ENV_CONFIG[CURRENT_ENV];

/**
 * 完整 API 基础 URL（包含 API 路径前缀）
 * 例如：https://localhost/api
 */
const BASE_URL = currentConfig.baseUrl + currentConfig.apiPath;

/**
 * 配置对象
 */
const config = {
  // 环境信息
  env: CURRENT_ENV,
  isProduction: CURRENT_ENV === ENV_TYPE.PRODUCTION,
  isDevelopment: CURRENT_ENV === ENV_TYPE.DEVELOPMENT,
  isTesting: CURRENT_ENV === ENV_TYPE.TESTING,
  debug: currentConfig.debug,
  
  // URL 配置
  baseUrl: currentConfig.baseUrl,           // 服务器基础 URL（不含 API 路径）
  apiBaseUrl: BASE_URL,                      // API 基础 URL（含 /api 路径）
  imageBaseUrl: currentConfig.imageBaseUrl,  // 图片资源基础 URL
  
  // 微信配置
  appId: currentConfig.appId,
  
  // 兼容旧版命名（保持向后兼容）
  BASE_URL: BASE_URL,
  APPID: currentConfig.appId,
  
  // 环境类型枚举（供外部使用）
  ENV_TYPE: ENV_TYPE,
  
  /**
   * 获取完整的图片 URL
   * @param {string} imageName - 图片文件名
   * @returns {string} 完整的图片 URL
   */
  getImageUrl(imageName) {
    if (!imageName) return '';
    // 如果已经是完整 URL，直接返回
    if (imageName.startsWith('http://') || imageName.startsWith('https://')) {
      return imageName;
    }
    return currentConfig.imageBaseUrl + '/' + imageName;
  },
  
  /**
   * 获取完整的 API URL
   * @param {string} path - API 路径（不含 /api 前缀）
   * @returns {string} 完整的 API URL
   */
  getApiUrl(path) {
    if (!path) return BASE_URL;
    const cleanPath = path.startsWith('/') ? path : '/' + path;
    return BASE_URL + cleanPath;
  }
};

module.exports = config;

