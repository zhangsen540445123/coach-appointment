# 批处理文件编码修复说明

## 问题描述

运行 `download_images.bat` 时出现以下错误：

```
'€鏈夊浘鐗?URL锛屼笅杞藉埌鏈湴' 不是内部或外部命令
'yedexpansion' 不是内部或外部命令
'Downloader' 不是内部或外部命令
```

## 原因分析

这是一个**文件编码问题**。批处理文件中包含中文注释，但文件编码不是 ANSI/ASCII，导致 Windows 命令行无法正确解析。

## 解决方案

已修复 `download_images.bat` 文件：
- ✅ 移除所有中文注释
- ✅ 改用英文注释
- ✅ 确保文件编码为 ANSI/ASCII

## 修复后的文件

```batch
@echo off
REM Image Resource Downloader
REM Extract and download all images from frontend code

setlocal enabledelayedexpansion

echo.
echo ========================================
echo Image Resource Downloader
echo ========================================
echo.

REM Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.6+ and add it to your system PATH
    pause
    exit /b 1
)

REM Check if requests library is installed
python -c "import requests" >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing required Python packages...
    python -m pip install requests
)

echo [*] Starting image extraction and download...
echo.

REM Run Python script
python extract_images.py

if %ERRORLEVEL% NEQ 0 (
    echo Error: Image extraction failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo [*] Image download completed!
echo [*] Images saved to: src\main\resources\static\images
echo [*] URL list saved to: image_urls.json
echo ========================================
echo.
pause
```

## 现在可以运行

```bash
cd backend
download_images.bat
```

## 预防措施

### 1. 批处理文件编码规则

- ✅ 使用 **ANSI** 或 **ASCII** 编码
- ❌ 不要使用 UTF-8（带 BOM）
- ❌ 不要使用 UTF-16

### 2. 在 VS Code 中设置

1. 打开批处理文件
2. 右下角点击编码选择
3. 选择 "ANSI" 或 "ASCII"
4. 保存文件

### 3. 在 Notepad++ 中设置

1. 打开批处理文件
2. 菜单 → Encoding → Encode in ANSI
3. 保存文件

## 其他批处理文件检查

以下文件也应该检查编码：

- `build.bat` - ✅ 已检查
- `run.bat` - ✅ 已检查
- `docker-build.bat` - ✅ 已检查
- `docker-compose-up.bat` - ✅ 已检查
- `docker-compose-down.bat` - ✅ 已检查

## 测试

运行以下命令测试是否正常：

```bash
cd backend
download_images.bat
```

应该看到以下输出：

```
========================================
Image Resource Downloader
========================================

[*] Starting image extraction and download...

[Step 1] Extracting image URLs from frontend code...
...
```

## 相关文档

- [IMAGE_SETUP_GUIDE.md](IMAGE_SETUP_GUIDE.md) - 设置指南
- [IMAGE_MANAGEMENT.md](IMAGE_MANAGEMENT.md) - 管理指南

---

**修复日期**：2025-11-27

**版本**：1.0.1

**状态**：✅ 已修复
