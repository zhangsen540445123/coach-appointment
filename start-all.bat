@echo off

echo ========================================
echo    Coach Appointment System - Start
echo ========================================
echo.

cd /d %~dp0

echo [1/2] Checking Docker...
docker info >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not running!
    pause
    exit /b 1
)
echo Docker OK

echo.
echo [2/2] Starting Docker services...
docker-compose up -d

echo.
echo ========================================
echo    Services Started!
echo ========================================
echo.
echo    MySQL:        localhost:3306
echo    Backend API:  http://localhost:8080
echo    Admin Web:    http://localhost:3000
echo    Nginx:        http://localhost:80
echo.
echo    View logs:    docker-compose logs -f
echo    Stop:         run stop-all.bat
echo ========================================
pause

