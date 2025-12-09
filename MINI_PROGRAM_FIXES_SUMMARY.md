# 小程序个人中心模块修复总结

## 修复日期
2025-12-09

## 最新修复（第三轮）

### ✅ 问题 6：contact.js 和 feedback.js 使用错误的 API 调用方式
**问题描述**：
- 错误信息：`TypeError: util.irequestdata is not a function`
- 原因：`contact.js` 和 `feedback.js` 使用传统的 `Page()` 语法，不能直接 `require` vendor.js 中的函数
- `irequestdata` 是在 webpack 编译后的模块中导出的，传统页面无法访问

**修复内容**：
1. **修改 `contact.js`**：
   - 移除 `require('../../common/vendor.js')`
   - 使用原生 `wx.request` 替代 `util.irequestdata`
   - 添加完整的 URL：`http://localhost:8080/api/global/settings`
   - 添加长按保存图片功能

2. **修改 `feedback.js`**：
   - 移除 `require('../../common/vendor.js')`
   - 使用原生 `wx.request` 替代 `util.irequestdata`
   - 使用 `wx.getStorageSync` 替代 `storeUtil.storeGet`
   - 添加完整的 URL：`http://localhost:8080/api/visitor/feedback/submit`
   - 添加 Authorization header

**文件修改**：
- `app/pages/contact/contact.js` (完全重写，1-88 行)
- `app/pages/feedback/feedback.js` (完全重写，1-108 行)

---

## 第二轮修复的问题

### ✅ 问题 4：visitorInfo.js 模块加载错误
**问题描述**：
- 错误信息：`Error: module 'pages/user/visitorInfo.js' is not defined`
- 原因：文件中的模块 ID `4496` 缺少引号，导致 webpack 模块加载失败

**修复内容**：
- 用户已删除该文件（该文件不需要）

---

### ✅ 问题 5：我的收藏页面数据展示不正确
**问题描述**：
- 页面能加载，但字段显示不正确
- 后端返回的数据字段与前端组件期望的字段格式不匹配

**问题分析**：
1. **后端 API 返回的数据结构**：
   ```json
   {
     "code": 200,
     "data": {
       "list": [{
         "counselorId": "...",
         "name": "...",
         "headUrlSquare": "...",
         "qualifications": "[\"国家二级心理咨询\"]",  // JSON 字符串
         "directions": "[{\"name\": \"身心健康\", ...}]",  // JSON 字符串
         "consult": "[{\"consultType\": 4, ...}]",  // JSON 字符串
         "experienceDate": "2019-02-01",  // 字符串字段
         "experienceTime": "1500小时"  // 字符串字段
       }]
     }
   }
   ```

2. **前端组件期望的数据格式**：
   ```javascript
   {
     counselorId: "...",
     name: "...",
     headUrlSquare: "...",
     qualifications: ["国家二级心理咨询"],  // 数组
     directions: ["身心健康", "人际关系"],  // 字符串数组
     consult: [{consultType: 4, ...}],  // 对象数组
     experience: {  // 对象
       date: "2019-02-01",
       time: "1500小时"
     }
   }
   ```

**修复内容**：
1. **修改 `userFocus.js`**：
   - 在 `getStarList` 方法中添加数据处理逻辑
   - 将 JSON 字符串字段解析为对象/数组
   - 将 `experienceDate` 和 `experienceTime` 转换为 `experience` 对象
   - 提取擅长领域名称数组
   - 添加详细的调试日志

2. **修改 `userFocus.wxml`**：
   - 添加空状态显示（当收藏列表为空时）
   - 显示友好的提示信息

3. **修改 `userFocus.wxss`**：
   - 添加空状态样式

**文件修改**：
- `app/pages/user/userFocus.js` (第 65-126 行)
- `app/pages/user/userFocus.wxml` (第 1-17 行)
- `app/pages/user/userFocus.wxss` (第 1-29 行)

---

## 第一轮修复的问题

### ✅ 问题 1：页面路由注册缺失
**问题描述**：
- "给我们反馈" (`pages/feedback/feedback`) 和 "联系客服" (`pages/contact/contact`) 两个页面未在 `app.json` 中注册
- 导致点击这两个入口时无法跳转，页面显示 404 或白屏

**修复内容**：
- 在 `app/app.json` 的 `pages` 数组中添加了两个页面路径：
  ```json
  "pages/feedback/feedback",
  "pages/contact/contact"
  ```

**文件修改**：
- `app/app.json` (第 105-133 行)

---

### ✅ 问题 2："联系客服"功能未正确调用后端 API
**问题描述**：
- `pages/contact/contact.js` 使用了错误的 API 调用方式
- 使用 `app.globalData.baseUrl` 而不是统一的 `irequestdata` 函数
- 缺少错误处理和加载状态

**修复内容**：
1. **修改 `contact.js`**：
   - 使用 `util.irequestdata()` 统一调用 API
   - 添加详细的日志输出用于调试
   - 添加错误处理和默认二维码显示
   - 添加加载状态管理

2. **修改 `contact.wxml`**：
   - 添加加载状态显示
   - 添加 `show-menu-by-longpress` 属性支持长按保存图片
   - 优化条件渲染逻辑

3. **修改 `contact.wxss`**：
   - 添加加载状态样式

**后端 API**：
- 接口：`GET /api/global/settings`
- 返回数据包含 `customerServiceQrCode` 字段
- 后台管理系统可在"系统设置"页面修改客服二维码

**文件修改**：
- `app/pages/contact/contact.js` (完全重写)
- `app/pages/contact/contact.wxml` (第 1-14 行)
- `app/pages/contact/contact.wxss` (第 29-43 行)

---

### ✅ 问题 3："给我们反馈"功能未实现后端集成
**问题描述**：
- `pages/feedback/feedback.js` 只有前端代码，未调用后端 API
- 缺少用户登录状态检查
- 缺少提交状态管理

**修复内容**：
1. **修改 `feedback.js`**：
   - 添加用户登录状态检查
   - 使用 `util.irequestdata()` 调用后端 API
   - 添加提交状态管理（防止重复提交）
   - 添加详细的日志输出
   - 未登录时引导用户登录

**后端 API**：
- 接口：`POST /api/visitor/feedback/submit`
- 请求参数：
  ```json
  {
    "userId": 1,
    "userName": "用户昵称",
    "content": "反馈内容"
  }
  ```
- 后台管理系统可在"用户反馈"页面查看和处理反馈

**文件修改**：
- `app/pages/feedback/feedback.js` (完全重写，1-101 行)

---

## 后端支持

### 已有的后端接口

1. **全局设置接口**：
   - `GET /api/global/settings` - 获取全局设置（包括客服二维码）
   - `POST /api/admin/settings` - 保存设置（后台管理）

2. **用户反馈接口**：
   - `POST /api/visitor/feedback/submit` - 提交反馈
   - `GET /api/global/admin/feedback/list` - 获取反馈列表（后台管理）
   - `POST /api/global/admin/feedback/handle` - 处理反馈（后台管理）
   - `DELETE /api/global/admin/feedback/{id}` - 删除反馈（后台管理）

### 后台管理功能

1. **系统设置页面** (`admin-web/src/views/settings/Settings.vue`)：
   - 可以上传和修改客服二维码
   - 可以配置助理二维码和显示设置

2. **用户反馈页面** (`admin-web/src/views/feedback/Feedback.vue`)：
   - 查看所有用户反馈
   - 处理反馈（标记为已处理、添加回复）
   - 删除反馈

---

## 测试验证

### API 测试结果

✅ **全局设置接口测试**：
```bash
GET http://localhost:8080/api/global/settings
```
响应：
```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "concatSysAgentSettings": {
      "qrCodeImageUrl": "https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20211115/351753974260_.pic_hd.jpg",
      "showAtMp": "1"
    },
    "customerServiceQrCode": "https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20211115/351753974260_.pic_hd.jpg"
  }
}
```

---

## 使用说明

### 小程序端

1. **联系客服**：
   - 进入个人中心
   - 点击"联系客服"
   - 查看客服二维码
   - 长按图片可保存到相册

2. **给我们反馈**：
   - 进入个人中心
   - 点击"给我们反馈"
   - 输入反馈内容（最多 500 字）
   - 点击"提交"
   - 未登录会自动跳转到登录页面

### 后台管理端

1. **修改客服二维码**：
   - 登录后台管理系统
   - 进入"系统设置"页面
   - 上传新的客服二维码图片
   - 点击"保存设置"

2. **查看用户反馈**：
   - 登录后台管理系统
   - 进入"用户反馈"页面
   - 查看所有反馈列表
   - 可以标记为已处理、添加回复或删除

---

## 注意事项

1. **图片资源**：
   - 客服二维码默认使用 OSS 存储的图片
   - 建议上传清晰的二维码图片（推荐尺寸：500x500px）

2. **用户登录**：
   - 提交反馈需要用户登录
   - 未登录会自动引导到登录页面

3. **调试日志**：
   - 所有修改的文件都添加了详细的 console.log 输出
   - 可以在微信开发者工具的 Console 中查看调试信息

---

## 下一步建议

1. **测试小程序功能**：
   - 在微信开发者工具中重新编译小程序
   - 测试"联系客服"和"给我们反馈"功能
   - 检查 Console 日志确认 API 调用正常

2. **测试后台管理**：
   - 登录后台管理系统
   - 测试修改客服二维码
   - 测试查看和处理用户反馈

3. **优化建议**：
   - 可以考虑添加反馈类型分类（建议、投诉、咨询等）
   - 可以添加反馈图片上传功能
   - 可以添加反馈回复通知功能

