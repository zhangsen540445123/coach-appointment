# 图片资源完整设置指南

## 概述

本指南提供了完整的步骤，将前端所有图片资源下载到后端，并通过 API 提供访问。

## 完整步骤

### 第一步：下载所有图片资源

#### 方式一：使用批处理脚本（推荐）

```bash
# 进入后端目录
cd backend

# 双击运行下载脚本
download_images.bat
```

#### 方式二：使用 Python 命令

```bash
cd backend
python extract_images.py
```

**脚本会：**
- 扫描 `app` 文件夹中的所有 JavaScript 文件
- 提取所有图片 URL（支持 .png, .jpg, .jpeg, .gif, .webp, .svg, .bmp, .ico）
- 下载图片到 `src/main/resources/static/images/`
- 保存 URL 列表到 `image_urls.json`

**输出示例：**

```
================================================================================
Image Resource Extractor and Downloader
================================================================================

[Step 1] Extracting image URLs from frontend code...
Scanning directory: d:\pp\只管去做\教练\app
Found 15 URLs in d:\pp\只管去做\教练\app\pages\filter\common\vendor.js
Found 8 URLs in d:\pp\只管去做\教练\app\pages\studio\common\vendor.js
...

Found 50 unique image URLs:
  - https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/home/01_jq@3x.png
  - https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/home/02_dj@3x.png
  - ...

[Step 2] Saving URL list...
URL list saved to: image_urls.json

[Step 3] Downloading images...
Downloading 50 images to src\main\resources\static\images...
[1/50] ⬇ Downloading: 01_jq@3x.png... ✓ (12345 bytes)
[2/50] ⬇ Downloading: 02_dj@3x.png... ✓ (23456 bytes)
...

Download Summary:
  Total: 50
  Success: 50
  Failed: 0

================================================================================
✓ Done!
================================================================================
```

### 第二步：构建后端项目

```bash
# 进入后端目录
cd backend

# 构建项目
build.bat
```

或使用 Maven 命令：

```bash
mvn clean package -DskipTests
```

### 第三步：启动后端服务

#### 方式一：本地运行

```bash
# 进入后端目录
cd backend

# 运行应用
run.bat
```

#### 方式二：Docker Compose（推荐）

```bash
# 进入后端目录
cd backend

# 启动所有服务
docker-compose-up.bat
```

### 第四步：验证图片访问

启动后端后，访问以下 URL 验证图片是否可以访问：

#### 获取图片列表

```bash
curl http://localhost:8080/api/file/images/list
```

**响应示例：**

```json
{
  "code": 200,
  "msg": "success",
  "data": [
    {
      "filename": "01_jq@3x.png",
      "url": "/api/file/image/01_jq@3x.png",
      "size": 12345,
      "lastModified": 1234567890000
    },
    {
      "filename": "02_dj@3x.png",
      "url": "/api/file/image/02_dj@3x.png",
      "size": 23456,
      "lastModified": 1234567891000
    }
  ]
}
```

#### 访问单个图片

在浏览器中打开：

```
http://localhost:8080/api/file/image/01_jq@3x.png
```

或使用 curl：

```bash
curl http://localhost:8080/api/file/image/01_jq@3x.png -o image.png
```

## 文件结构

下载完成后，项目结构如下：

```
backend/
├── src/main/resources/static/images/
│   ├── 01_jq@3x.png
│   ├── 02_dj@3x.png
│   ├── 03_xx@3x.png
│   ├── 04_青少年@3x.png
│   ├── 位图.png
│   ├── studio-poster-bg@3x.png
│   ├── 导航2.png
│   └── ... (其他图片)
├── extract_images.py                # 图片提取脚本
├── download_images.bat              # 下载脚本
├── image_urls.json                  # URL 列表
└── src/main/java/com/umxinli/controller/
    └── FileController.java          # 文件控制器
```

## API 接口

### 1. 获取图片

```
GET /api/file/image/{filename}
```

**示例：**

```bash
curl http://localhost:8080/api/file/image/01_jq@3x.png
```

### 2. 获取图片列表

```
GET /api/file/images/list
```

**示例：**

```bash
curl http://localhost:8080/api/file/images/list
```

### 3. 上传图片

```
POST /api/file/upload
Content-Type: multipart/form-data
```

**示例：**

```bash
curl -X POST http://localhost:8080/api/file/upload \
  -F "file=@/path/to/image.png"
```

**响应：**

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "filename": "1234567890_image.png",
    "url": "/api/file/image/1234567890_image.png",
    "size": 12345
  }
}
```

### 4. 删除图片

```
DELETE /api/file/image/{filename}
```

**示例：**

```bash
curl -X DELETE http://localhost:8080/api/file/image/01_jq@3x.png
```

## 在前端中使用

### 修改前端代码

将前端中的远程图片 URL 改为本地 URL：

**原来的代码：**

```javascript
const imageUrl = "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/home/01_jq@3x.png";
```

**修改后的代码：**

```javascript
const imageUrl = "/api/file/image/01_jq@3x.png";
```

### 动态获取图片列表

```javascript
// 获取所有可用的图片
async function getAvailableImages() {
  const response = await fetch('/api/file/images/list');
  const data = await response.json();
  
  if (data.code === 200) {
    return data.data;
  }
  
  return [];
}

// 使用示例
getAvailableImages().then(images => {
  images.forEach(image => {
    console.log(`${image.filename}: ${image.url}`);
  });
});
```

## 常见问题

### Q: 下载脚本运行失败怎么办？

A: 检查以下几点：
1. 确保已安装 Python 3.6+
2. 确保已安装 requests 库：`pip install requests`
3. 检查网络连接是否正常
4. 查看脚本的错误输出信息

### Q: 如何重新下载所有图片？

A: 
1. 删除 `src/main/resources/static/images/` 目录
2. 运行 `download_images.bat` 重新下载

### Q: 如何只下载特定的图片？

A: 编辑 `extract_images.py`，修改 `extract_all_urls()` 函数，添加过滤条件。

### Q: 图片访问返回 404 怎么办？

A: 
1. 确认图片文件是否存在于 `src/main/resources/static/images/`
2. 确认文件名是否正确
3. 重新启动后端服务
4. 查看后端日志

### Q: 如何修改图片存储目录？

A: 编辑 `src/main/resources/application.yml`：

```yaml
file:
  upload-dir: /path/to/your/images/directory
```

### Q: 如何限制上传文件大小？

A: 编辑 `src/main/resources/application.yml`：

```yaml
spring:
  servlet:
    multipart:
      max-file-size: 10MB      # 修改这里
      max-request-size: 50MB   # 修改这里
```

## 性能优化

### 1. 启用图片缓存

图片已配置 1 年缓存，浏览器会自动缓存。

### 2. 启用 Gzip 压缩

已在 `application.yml` 中启用，可以减少传输大小。

### 3. 使用 CDN

在生产环境中，可以将图片上传到 CDN（如阿里云 OSS）。

## 故障排除

### 问题 1：Python 脚本无法找到图片 URL

**症状**：运行脚本后显示 "No image URLs found!"

**解决方案**：
1. 检查前端代码是否包含图片 URL
2. 检查 URL 格式是否正确（必须以 http:// 或 https:// 开头）
3. 手动检查 `app/common/vendor.js` 中的 URL

### 问题 2：下载失败

**症状**：某些图片下载失败

**解决方案**：
1. 检查原始 URL 是否仍然有效
2. 检查网络连接
3. 尝试手动下载该 URL
4. 查看脚本的错误信息

### 问题 3：图片无法在前端显示

**症状**：前端访问图片返回 404 或 403

**解决方案**：
1. 确认后端服务是否正常运行
2. 确认图片文件是否存在
3. 检查浏览器控制台的错误信息
4. 查看后端日志

## 下一步

1. **集成到前端**：修改前端代码，使用本地图片 URL
2. **性能优化**：配置 CDN 或使用图片压缩
3. **安全加固**：添加身份验证和授权
4. **监控告警**：监控图片访问情况

## 相关文档

- [IMAGE_MANAGEMENT.md](IMAGE_MANAGEMENT.md) - 图片管理指南
- [APPLICATION_YML_UPDATE.md](APPLICATION_YML_UPDATE.md) - 配置文件更新说明
- [FileController.java](src/main/java/com/umxinli/controller/FileController.java) - 文件控制器源代码
- [README.md](README.md) - 项目说明

## 支持

如有问题，请查看相关文档或联系开发团队。

---

**最后更新**：2025-11-27

**版本**：1.0.0

**状态**：✅ 完成
