@echo off
echo Starting parallel packaging and push for all components...
echo This will open 2 separate terminals for:
echo 1. Backend packaging and push
echo 2. Admin frontend packaging and push
echo.

REM Get current directory
set "CURRENT_DIR=%CD%"

REM Check if required directories exist
if not exist "backend" (
    echo Error: backend directory not found!
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

if not exist "admin-web" (
    echo Error: admin-web directory not found!
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

if not exist "backend\package-push-backend.bat" (
    echo Error: backend\package-push-backend.bat not found!
    pause
    exit /b 1
)

if not exist "admin-web\package-push-ui.bat" (
    echo Error: admin-web\package-push-ui.bat not found!
    pause
    exit /b 1
)

echo All packaging scripts found. Starting parallel execution...
echo.

REM Start backend packaging in new terminal
echo Starting backend packaging and push...
start "Backend Packaging" cmd /c "cd /d "%CURRENT_DIR%\backend" && package-push-backend.bat"

REM Wait a moment before starting next terminal
timeout /t 2 /nobreak >nul

REM Start admin frontend packaging in new terminal
echo Starting admin frontend packaging and push...
start "Admin Frontend Packaging" cmd /c "cd /d "%CURRENT_DIR%\admin-web" && package-push-ui.bat"

echo.
echo All packaging processes have been started in separate terminals.
echo Please check each terminal window for progress and results.
echo.
pause