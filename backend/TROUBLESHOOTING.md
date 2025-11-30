# 图片下载脚本故障排除指南

## 快速诊断

### 第一步：检查 Python 环境

```bash
cd backend
check_python.bat
```

这个脚本会检查：
- ✓ Python 是否已安装
- ✓ Python 版本是否正确
- ✓ requests 库是否已安装

## 常见问题和解决方案

### 问题 1：Python 不是内部或外部命令

**症状：**
```
'python' 不是内部或外部命令，也不是可运行的程序或批处理文件。
```

**原因：**
- Python 未安装
- Python 未添加到系统 PATH

**解决方案：**

1. **检查 Python 是否已安装**
   ```bash
   python --version
   ```

2. **如果未安装，下载并安装 Python**
   - 访问 https://www.python.org/downloads/
   - 下载 Python 3.8+ 版本
   - **重要**：安装时勾选 "Add Python to PATH"

3. **重启命令行窗口**
   - 关闭当前命令行
   - 重新打开命令行
   - 再次运行脚本

### 问题 2：requests 库未找到

**症状：**
```
ModuleNotFoundError: No module named 'requests'
```

**原因：**
- requests 库未安装

**解决方案：**

```bash
# 自动安装（脚本会自动做）
python -m pip install requests

# 或手动安装
pip install requests
```

### 问题 3：批处理文件编码错误

**症状：**
```
'€鏈夊浘鐗?URL锛屼笅杞藉埌鏈湴' 不是内部或外部命令
```

**原因：**
- 批处理文件编码不是 ANSI/ASCII

**解决方案：**

已修复 `download_images.bat`，如果仍有问题：

1. 用 Notepad++ 打开 `download_images.bat`
2. 菜单 → Encoding → Encode in ANSI
3. 保存文件
4. 重新运行脚本

### 问题 4：网络连接错误

**症状：**
```
Error: [Errno 11001] getaddrinfo failed
ConnectionError: Failed to establish a new connection
```

**原因：**
- 网络连接不稳定
- 原始 URL 无法访问

**解决方案：**

1. **检查网络连接**
   ```bash
   ping www.baidu.com
   ```

2. **检查原始 URL 是否有效**
   - 在浏览器中打开 URL
   - 确认图片是否可以访问

3. **重试下载**
   ```bash
   python extract_images.py
   ```

### 问题 5：磁盘空间不足

**症状：**
```
Error: [Errno 28] No space left on device
```

**原因：**
- 磁盘空间不足

**解决方案：**

1. 清理磁盘空间
2. 删除 `src/main/resources/static/images/` 目录
3. 重新运行脚本

### 问题 6：权限不足

**症状：**
```
Error: [Errno 13] Permission denied
```

**原因：**
- 没有写入权限

**解决方案：**

1. **以管理员身份运行命令行**
   - 右键点击 cmd.exe
   - 选择 "以管理员身份运行"

2. **检查文件夹权限**
   - 右键点击 `backend` 文件夹
   - 选择 "属性" → "安全"
   - 确保当前用户有写入权限

### 问题 7：脚本无法找到图片 URL

**症状：**
```
Found 0 unique image URLs
```

**原因：**
- 前端代码中没有图片 URL
- 图片 URL 格式不符合预期

**解决方案：**

1. **检查前端代码**
   - 打开 `app/common/vendor.js`
   - 搜索 `.png` 或 `.jpg`
   - 确认是否存在图片 URL

2. **手动检查 URL 格式**
   - URL 必须以 `http://` 或 `https://` 开头
   - URL 必须以 `.png`, `.jpg` 等扩展名结尾

3. **修改脚本**
   - 编辑 `extract_images.py`
   - 调整 URL 匹配规则

### 问题 8：某些图片下载失败

**症状：**
```
[10/50] ⬇ Downloading: image.png... ✗ Error: 404 Client Error
```

**原因：**
- 原始 URL 已失效
- 服务器返回错误

**解决方案：**

1. **检查 URL 是否有效**
   - 在浏览器中打开 URL
   - 确认图片是否存在

2. **重试下载**
   - 某些服务器可能暂时不可用
   - 稍后重新运行脚本

3. **手动下载**
   - 使用浏览器或 curl 手动下载
   - 保存到 `src/main/resources/static/images/`

## 调试技巧

### 1. 查看详细输出

修改 `extract_images.py`，添加调试信息：

```python
# 在 extract_urls_from_file 函数中添加
print(f"Processing: {file_path}")
print(f"Found URLs: {urls}")
```

### 2. 单个文件测试

```bash
python -c "
import extract_images
urls = extract_images.extract_urls_from_file('app/common/vendor.js')
print(f'Found {len(urls)} URLs')
for url in urls:
    print(url)
"
```

### 3. 查看日志

脚本会输出详细的日志信息，记录每个步骤。

## 性能优化

### 1. 并行下载

如果下载速度慢，可以修改 `extract_images.py` 使用多线程：

```python
from concurrent.futures import ThreadPoolExecutor

with ThreadPoolExecutor(max_workers=5) as executor:
    executor.map(download_image, urls)
```

### 2. 断点续传

如果下载中断，重新运行脚本会自动跳过已下载的文件。

## 获取帮助

### 1. 查看脚本输出

- 脚本会输出详细的错误信息
- 记录每个步骤的状态

### 2. 查看日志文件

- 后端启动后，查看 `logs/application.log`

### 3. 查看相关文档

- [IMAGE_SETUP_GUIDE.md](IMAGE_SETUP_GUIDE.md) - 设置指南
- [IMAGE_MANAGEMENT.md](IMAGE_MANAGEMENT.md) - 管理指南
- [BATCH_FILE_FIX.md](BATCH_FILE_FIX.md) - 批处理文件修复

## 快速参考

| 问题 | 命令 |
|------|------|
| 检查 Python | `python --version` |
| 安装 requests | `pip install requests` |
| 运行诊断 | `check_python.bat` |
| 下载图片 | `download_images.bat` |
| 查看 URL 列表 | `type image_urls.json` |

## 重置和重新开始

如果一切都不工作，尝试重新开始：

```bash
# 1. 删除已下载的图片
rmdir /s /q src\main\resources\static\images

# 2. 删除 URL 列表
del image_urls.json

# 3. 重新下载
download_images.bat
```

---

**最后更新**：2025-11-27

**版本**：1.0.0
