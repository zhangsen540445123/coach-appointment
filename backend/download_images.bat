@echo off
echo ========================================
echo Image Resource Downloader
echo ========================================
echo [1/3] Checking Python installation...
if not exist "D:\Programs\Python\Python313\python.exe" (
    echo Error: Python executable not found at D:\Programs\Python\Python313\python.exe
    pause
    exit /b 1
)
echo [2/3] Checking for requests library...
"D:\Programs\Python\Python313\python.exe" -c "import requests" >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing required Python packages...
    "D:\Programs\Python\Python313\python.exe" -m pip install requests
)
echo [3/3] Starting image extraction and download...
"D:\Programs\Python\Python313\python.exe" extract_images.py
if %ERRORLEVEL% NEQ 0 (
    echo Error: Image extraction failed
    pause
    exit /b 1
)
echo ========================================
echo Image download completed!
echo Images saved to: src\main\resources\static\images
echo URL list saved to: image_urls.json
echo ========================================
pause
