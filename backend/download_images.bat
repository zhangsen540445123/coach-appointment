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
