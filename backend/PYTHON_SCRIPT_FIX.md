# Python 脚本编码修复说明

## 问题描述

运行 `download_images.bat` 时出现以下错误：

```
[*] Starting image extraction and download...
Error: Image extraction failed
```

## 原因分析

Python 脚本中包含中文注释和中文字符串，导致编码问题。Windows 默认的 Python 编码可能无法正确处理这些字符。

## 解决方案

已修复 `extract_images.py` 文件：
- ✅ 改用英文注释
- ✅ 改用英文字符串
- ✅ 保留 UTF-8 编码声明
- ✅ 简化输出信息

## 修复内容

### 1. 文件头
```python
# 修复前
"""
图片资源提取和下载脚本
从前端代码中提取所有图片 URL，下载到本地
"""

# 修复后
"""
Image Resource Extractor and Downloader
Extract all image URLs from frontend code and download to local
"""
```

### 2. 配置注释
```python
# 修复前
# 配置
# 图片扩展名

# 修复后
# Configuration
# Image extensions
```

### 3. 函数注释
```python
# 修复前
def extract_urls_from_file(file_path: str) -> Set[str]:
    """从单个文件中提取所有 URL"""

# 修复后
def extract_urls_from_file(file_path: str) -> Set[str]:
    """Extract all image URLs from a single file"""
```

### 4. 输出信息
```python
# 修复前
print(f"✓ Already exists: {filename}")
print(f"⬇ Downloading: {filename}...", end=" ")
print(f"✗ Error: {e}")

# 修复后
print(f"[OK] Already exists: {filename}")
print(f"[DOWNLOAD] {filename}...", end=" ")
print(f"[ERROR] {e}")
```

## 现在可以运行

```bash
cd backend
download_images.bat
```

## 预防措施

### 1. Python 脚本编码规则

- ✅ 使用 UTF-8 编码声明：`# -*- coding: utf-8 -*-`
- ✅ 使用英文注释和字符串
- ✅ 避免在代码中使用中文
- ✅ 如需中文，使用 Unicode 转义序列

### 2. 在 VS Code 中设置

1. 打开 Python 文件
2. 右下角点击编码选择
3. 选择 "UTF-8"
4. 保存文件

### 3. 在 PyCharm 中设置

1. File → Settings → Editor → File Encodings
2. 设置 IDE Encoding 为 UTF-8
3. 设置 Project Encoding 为 UTF-8
4. 设置 Default encoding for properties files 为 UTF-8

## 测试

运行以下命令测试是否正常：

```bash
cd backend
python extract_images.py
```

应该看到以下输出：

```
================================================================================
Image Resource Extractor and Downloader
================================================================================

[Step 1] Extracting image URLs from frontend code...
Scanning directory: d:\pp\只管去做\教练\app
Found 15 URLs in vendor.js
...

Found 50 unique image URLs:
  - https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/home/01_jq@3x.png
  - ...

[Step 2] Saving URL list...
URL list saved to: image_urls.json

[Step 3] Downloading images...
Downloading 50 images to src\main\resources\static\images...
[1/50] [DOWNLOAD] 01_jq@3x.png... [OK] (12345 bytes)
...

================================================================================
[OK] Done!
================================================================================
```

## 相关文件

- `extract_images.py` - 已修复的提取脚本
- `download_images.bat` - 下载脚本
- `BATCH_FILE_FIX.md` - 批处理文件修复说明

## 常见问题

### Q: 脚本仍然出错怎么办？

A: 
1. 检查 Python 版本：`python --version`
2. 检查 requests 库：`pip install requests`
3. 查看详细错误信息
4. 运行 `check_python.bat` 诊断

### Q: 如何查看详细错误信息？

A: 直接运行 Python 脚本而不是通过批处理文件：

```bash
cd backend
python extract_images.py
```

### Q: 如何修改脚本中的路径？

A: 编辑 `extract_images.py` 中的配置部分：

```python
# Configuration
APP_DIR = r"d:\pp\只管去做\教练\app"
BACKEND_DIR = r"d:\pp\只管去做\教练\backend"
```

## 总结

已修复 Python 脚本的编码问题，改用英文注释和字符串，确保在 Windows 环境下正常运行。

---

**修复日期**：2025-11-27

**版本**：1.0.1

**状态**：✅ 已修复
