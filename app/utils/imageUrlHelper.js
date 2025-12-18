/**
 * 图片 URL 助手模块
 * 用于动态替换硬编码的图片 URL
 */

const config = require('./config');

// 硬编码的旧图片基础 URL
const OLD_IMAGE_BASE_URL = 'https://localhost/api/file/image';

/**
 * 转换图片 URL
 * 将硬编码的 localhost URL 替换为配置中的地址
 * @param {string} url - 原始图片 URL
 * @returns {string} 转换后的 URL
 */
function convertImageUrl(url) {
  if (!url || typeof url !== 'string') {
    return url;
  }
  
  // 如果是旧的硬编码 URL，替换为新的配置地址
  if (url.startsWith(OLD_IMAGE_BASE_URL)) {
    return url.replace(OLD_IMAGE_BASE_URL, config.imageBaseUrl);
  }
  
  // 如果是以 https://localhost 开头的其他 URL
  if (url.startsWith('https://localhost')) {
    return url.replace('https://localhost', config.baseUrl);
  }
  
  return url;
}

/**
 * 批量转换图片 URL 数组
 * @param {Array<string>} urls - URL 数组
 * @returns {Array<string>} 转换后的 URL 数组
 */
function convertImageUrls(urls) {
  if (!Array.isArray(urls)) {
    return urls;
  }
  return urls.map(convertImageUrl);
}

/**
 * 在对象中递归查找并转换图片 URL
 * @param {Object} obj - 要处理的对象
 * @param {Array<string>} imageFields - 图片字段名列表
 * @returns {Object} 处理后的对象
 */
function convertObjectImageUrls(obj, imageFields) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  
  const defaultImageFields = [
    'image', 'imageUrl', 'headUrl', 'avatarUrl', 'coverUrl', 
    'backgroundUrl', 'logo', 'icon', 'poster', 'thumbnail',
    'src', 'url', 'imgUrl', 'picUrl', 'photoUrl'
  ];
  
  const fieldsToCheck = imageFields || defaultImageFields;
  
  const result = Array.isArray(obj) ? [...obj] : { ...obj };
  
  for (const key in result) {
    if (result.hasOwnProperty(key)) {
      const value = result[key];
      
      if (typeof value === 'string' && fieldsToCheck.includes(key)) {
        result[key] = convertImageUrl(value);
      } else if (typeof value === 'object' && value !== null) {
        result[key] = convertObjectImageUrls(value, fieldsToCheck);
      }
    }
  }
  
  return result;
}

/**
 * 获取完整的图片 URL
 * @param {string} imageName - 图片文件名
 * @returns {string} 完整的图片 URL
 */
function getImageUrl(imageName) {
  return config.getImageUrl(imageName);
}

module.exports = {
  convertImageUrl,
  convertImageUrls,
  convertObjectImageUrls,
  getImageUrl,
  OLD_IMAGE_BASE_URL,
  imageBaseUrl: config.imageBaseUrl
};

