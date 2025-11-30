@echo off
REM UMXinli Backend Docker Compose Down Script
REM This script stops and removes the application stack

setlocal enabledelayedexpansion

echo.
echo ========================================
echo UMXinli Backend Docker Compose Down
echo ========================================
echo.

REM Check if Docker Compose is installed
where docker-compose >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Docker Compose is not installed or not in PATH
    pause
    exit /b 1
)

echo [*] Stopping services...
call docker-compose down

echo.
echo [*] Services stopped successfully!
echo.
pause
