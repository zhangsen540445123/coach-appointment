@echo off
echo ========================================
echo Python Environment Check
echo ========================================
echo [1/3] Checking Python installation...
if not exist "D:\Programs\Python\Python313\python.exe" (
    echo Error: Python executable not found at D:\Programs\Python\Python313\python.exe
    pause
    exit /b 1
)
"D:\Programs\Python\Python313\python.exe" --version
if %ERRORLEVEL% NEQ 0 (
    echo Error: Failed to execute Python. Please check your installation.
    pause
    exit /b 1
)
echo [2/3] Checking requests library...
"D:\Programs\Python\Python313\python.exe" -c "import requests" >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo requests library not found. Installing...
    "D:\Programs\Python\Python313\python.exe" -m pip install requests
)
echo [3/3] All checks passed!
echo You can now run: download_images.bat
pause
