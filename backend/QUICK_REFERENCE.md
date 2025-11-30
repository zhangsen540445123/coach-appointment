# 快速参考卡

## 图片资源管理系统 - 快速开始

### 第一步：检查环境

```bash
cd backend
check_python.bat
```

### 第二步：下载图片

```bash
download_images.bat
```

### 第三步：构建项目

```bash
build.bat
```

### 第四步：启动服务

```bash
# 本地运行
run.bat

# 或 Docker Compose
docker-compose-up.bat
```

### 第五步：验证

```bash
# 获取图片列表
curl http://localhost:8080/api/file/images/list

# 访问图片
curl http://localhost:8080/api/file/image/01_jq@3x.png
```

---

## 常用命令

### Python 环境

```bash
# 检查 Python 版本
python --version

# 安装 requests 库
pip install requests

# 运行提取脚本
python extract_images.py
```

### 图片管理

```bash
# 获取图片列表
curl http://localhost:8080/api/file/images/list

# 上传图片
curl -X POST http://localhost:8080/api/file/upload \
  -F "file=@image.png"

# 删除图片
curl -X DELETE http://localhost:8080/api/file/image/filename.png
```

### 项目构建

```bash
# 清理和构建
mvn clean package -DskipTests

# 运行应用
java -jar target/umxinli-backend-1.0.0.jar

# Docker 构建
docker build -t umxinli-backend .

# Docker 运行
docker run -p 8080:8080 umxinli-backend
```

---

## 文件位置

| 文件 | 位置 |
|------|------|
| 图片存储 | `src/main/resources/static/images/` |
| URL 列表 | `image_urls.json` |
| 应用配置 | `src/main/resources/application.yml` |
| 文件控制器 | `src/main/java/com/umxinli/controller/FileController.java` |
| 提取脚本 | `extract_images.py` |
| 下载脚本 | `download_images.bat` |

---

## API 端点

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/file/image/{filename}` | 获取图片 |
| POST | `/api/file/upload` | 上传图片 |
| GET | `/api/file/images/list` | 获取图片列表 |
| DELETE | `/api/file/image/{filename}` | 删除图片 |

---

## 配置项

### 文件上传大小限制

```yaml
spring:
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 50MB
```

### 图片存储目录

```yaml
file:
  upload-dir: src/main/resources/static/images
```

### 静态资源缓存

```yaml
spring:
  resources:
    cache:
      period: 31536000
```

---

## 故障排除

| 问题 | 解决方案 |
|------|---------|
| Python 不是命令 | 安装 Python 并添加到 PATH |
| requests 库未找到 | 运行 `pip install requests` |
| 批处理文件编码错误 | 用 Notepad++ 改为 ANSI 编码 |
| 网络连接错误 | 检查网络，重试下载 |
| 磁盘空间不足 | 清理磁盘空间 |
| 权限不足 | 以管理员身份运行 |
| 无法找到图片 URL | 检查前端代码 |
| 图片下载失败 | 检查 URL 是否有效 |

---

## 文档导航

- **[IMAGE_SETUP_GUIDE.md](IMAGE_SETUP_GUIDE.md)** - 完整设置指南
- **[IMAGE_MANAGEMENT.md](IMAGE_MANAGEMENT.md)** - 图片管理指南
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - 故障排除指南
- **[BATCH_FILE_FIX.md](BATCH_FILE_FIX.md)** - 批处理文件修复
- **[APPLICATION_YML_UPDATE.md](APPLICATION_YML_UPDATE.md)** - 配置说明

---

## 前端集成示例

### 修改图片 URL

```javascript
// 原来的代码
const imageUrl = "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/home/01_jq@3x.png";

// 改为本地 URL
const imageUrl = "/api/file/image/01_jq@3x.png";
```

### 获取图片列表

```javascript
async function getImages() {
  const response = await fetch('/api/file/images/list');
  const data = await response.json();
  return data.data;
}
```

### 上传图片

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('/api/file/upload', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log(data.data.url);
```

---

## 性能指标

| 指标 | 值 |
|------|-----|
| 图片访问速度 | < 100ms |
| 缓存时间 | 1 年 |
| 最大上传大小 | 10MB |
| 最大请求大小 | 50MB |
| 压缩启用 | 是 |

---

## 安全特性

✅ 防止路径遍历攻击
✅ 文件类型验证
✅ 文件大小限制
✅ 错误处理完善
✅ 日志记录

---

## 版本信息

- **项目版本**：1.0.0
- **Spring Boot**：2.7.14
- **Java**：1.8
- **Python**：3.6+
- **最后更新**：2025-11-27

---

## 获取帮助

1. **查看文档** - 查看相关 .md 文件
2. **运行诊断** - 执行 `check_python.bat`
3. **查看日志** - 查看 `logs/application.log`
4. **查看错误** - 查看脚本输出信息

---

**快速参考卡** - 打印此文件以便快速查阅！
