@echo off
REM Check Python installation and dependencies

echo.
echo ========================================
echo Python Environment Check
echo ========================================
echo.

REM Check Python version
echo [1/3] Checking Python installation...
python --version
if %ERRORLEVEL% NEQ 0 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.6+ from https://www.python.org
    pause
    exit /b 1
)

echo.
echo [2/3] Checking requests library...
python -c "import requests; print('requests version:', requests.__version__)"
if %ERRORLEVEL% NEQ 0 (
    echo requests library not found. Installing...
    python -m pip install requests
)

echo.
echo [3/3] All checks passed!
echo.
echo You can now run: download_images.bat
echo.
pause
