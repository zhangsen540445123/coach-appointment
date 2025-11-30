# 图片资源管理指南

## 概述

本指南说明如何从前端代码中提取图片资源、下载到本地，以及通过后端 API 提供访问。

## 快速开始

### 1. 下载所有图片资源

```bash
# 双击运行下载脚本
download_images.bat
```

或使用 Python 命令：

```bash
python extract_images.py
```

**脚本会自动：**
- 扫描前端代码中的所有 `.js` 文件
- 提取所有图片 URL（.png, .jpg, .jpeg, .gif, .webp, .svg, .bmp, .ico）
- 下载图片到 `src/main/resources/static/images/`
- 保存 URL 列表到 `image_urls.json`

### 2. 启动后端服务

```bash
# 构建项目
build.bat

# 运行应用
run.bat
```

或使用 Docker Compose：

```bash
docker-compose-up.bat
```

### 3. 访问图片

启动后端后，可以通过以下 URL 访问图片：

```
http://localhost:8080/api/file/image/{filename}
```

例如：

```
http://localhost:8080/api/file/image/01_可约@3x.png
http://localhost:8080/api/file/image/02_低价@3x.png
http://localhost:8080/api/file/image/03_线下@3x.png
```

## API 接口

### 1. 获取图片

**请求**

```
GET /api/file/image/{filename}
```

**参数**

| 参数 | 类型 | 说明 |
|------|------|------|
| filename | String | 图片文件名 |

**响应**

- 成功：返回图片文件内容
- 失败：返回 404 或 400 错误

**示例**

```bash
curl http://localhost:8080/api/file/image/01_可约@3x.png -o image.png
```

### 2. 上传图片

**请求**

```
POST /api/file/upload
Content-Type: multipart/form-data
```

**参数**

| 参数 | 类型 | 说明 |
|------|------|------|
| file | File | 图片文件（最大 10MB） |

**响应**

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

**示例**

```bash
curl -X POST http://localhost:8080/api/file/upload \
  -F "file=@/path/to/image.png"
```

### 3. 获取图片列表

**请求**

```
GET /api/file/images/list
```

**响应**

```json
{
  "code": 200,
  "msg": "success",
  "data": [
    {
      "filename": "01_可约@3x.png",
      "url": "/api/file/image/01_可约@3x.png",
      "size": 12345,
      "lastModified": 1234567890000
    },
    {
      "filename": "02_低价@3x.png",
      "url": "/api/file/image/02_低价@3x.png",
      "size": 23456,
      "lastModified": 1234567891000
    }
  ]
}
```

**示例**

```bash
curl http://localhost:8080/api/file/images/list
```

### 4. 删除图片

**请求**

```
DELETE /api/file/image/{filename}
```

**参数**

| 参数 | 类型 | 说明 |
|------|------|------|
| filename | String | 图片文件名 |

**响应**

```json
{
  "code": 200,
  "msg": "success"
}
```

**示例**

```bash
curl -X DELETE http://localhost:8080/api/file/image/01_可约@3x.png
```

## 文件结构

```
backend/
├── src/main/resources/static/
│   └── images/                      # 图片存储目录
│       ├── 01_可约@3x.png
│       ├── 02_低价@3x.png
│       ├── 03_线下@3x.png
│       ├── 04_青少年@3x.png
│       └── ...
├── extract_images.py                # 图片提取脚本
├── download_images.bat              # 下载脚本
└── image_urls.json                  # URL 列表
```

## 配置

### 修改图片存储目录

编辑 `src/main/resources/application.yml`：

```yaml
file:
  upload-dir: src/main/resources/static/images
```

### 修改最大上传文件大小

在 `application.yml` 中添加：

```yaml
spring:
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 50MB
```

## 前端集成

### 在前端代码中使用本地图片

将原来的远程 URL：

```javascript
// 原来的远程 URL
const imageUrl = "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/home/01_jq@3x.png";
```

改为本地 URL：

```javascript
// 改为本地 URL
const imageUrl = "/api/file/image/01_jq@3x.png";
```

### 动态获取图片列表

```javascript
// 获取所有图片列表
fetch('/api/file/images/list')
  .then(response => response.json())
  .then(data => {
    console.log('Available images:', data.data);
    // 使用图片列表
    data.data.forEach(image => {
      console.log(`${image.filename}: ${image.url}`);
    });
  });
```

### 上传图片

```javascript
// 上传图片
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('/api/file/upload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  if (data.code === 200) {
    console.log('Upload successful:', data.data.url);
  }
});
```

## 常见问题

### Q: 如何重新下载所有图片？

A: 删除 `src/main/resources/static/images/` 目录，然后运行 `download_images.bat`

### Q: 如何添加新的图片？

A: 使用上传接口：

```bash
curl -X POST http://localhost:8080/api/file/upload \
  -F "file=@/path/to/new_image.png"
```

### Q: 图片下载失败怎么办？

A: 检查以下几点：
1. 网络连接是否正常
2. 原始 URL 是否仍然有效
3. Python 和 requests 库是否已安装
4. 查看 `extract_images.py` 的输出信息

### Q: 如何在 Docker 中使用图片？

A: 图片已包含在 Docker 镜像中，访问方式相同：

```
http://localhost:8080/api/file/image/{filename}
```

### Q: 如何备份图片？

A: 备份 `src/main/resources/static/images/` 目录即可

## 性能优化

### 1. 启用图片缓存

在 `application.yml` 中配置：

```yaml
spring:
  resources:
    cache:
      period: 31536000
```

### 2. 启用 Gzip 压缩

```yaml
server:
  compression:
    enabled: true
    min-response-size: 1024
```

### 3. 使用 CDN

在生产环境中，可以将图片上传到 CDN（如阿里云 OSS），然后在应用中配置 CDN 地址。

## 安全建议

1. **验证文件类型**：只允许上传图片文件
2. **限制文件大小**：设置最大上传大小（默认 10MB）
3. **防止路径遍历**：验证文件名，防止 `../` 等攻击
4. **访问控制**：可以添加身份验证和授权
5. **病毒扫描**：在生产环境中考虑集成病毒扫描

## 故障排除

### 图片无法下载

**症状**：运行 `download_images.bat` 后没有下载任何图片

**解决方案**：
1. 检查网络连接
2. 检查 Python 是否正确安装
3. 查看脚本输出信息
4. 手动运行 `python extract_images.py` 查看详细错误

### 图片无法访问

**症状**：访问 `/api/file/image/{filename}` 返回 404

**解决方案**：
1. 确认图片文件是否存在于 `src/main/resources/static/images/`
2. 确认文件名是否正确
3. 检查后端服务是否正常运行
4. 查看后端日志

### 上传失败

**症状**：上传图片返回错误

**解决方案**：
1. 检查文件大小是否超过限制
2. 检查文件类型是否为图片
3. 检查磁盘空间是否充足
4. 查看后端日志获取详细错误信息

## 相关文档

- [README.md](README.md) - 项目说明
- [DEPLOYMENT.md](DEPLOYMENT.md) - 部署指南
- [FileController.java](src/main/java/com/umxinli/controller/FileController.java) - 文件控制器源代码

## 支持

如有问题，请查看日志或联系开发团队。

---

**最后更新**：2025-11-27

**版本**：1.0.0
