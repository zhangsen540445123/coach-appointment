@echo off
REM UMXinli Backend Docker Compose Up Script
REM This script starts the entire application stack using Docker Compose

setlocal enabledelayedexpansion

echo.
echo ========================================
echo UMXinli Backend Docker Compose Up
echo ========================================
echo.

REM Check if Docker is installed
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Docker is not installed or not in PATH
    echo Please install Docker Desktop
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
where docker-compose >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Docker Compose is not installed or not in PATH
    echo Please install Docker Compose
    pause
    exit /b 1
)

echo [1/2] Building Docker image...
call docker-compose build
if %ERRORLEVEL% NEQ 0 (
    echo Error: Docker build failed
    pause
    exit /b 1
)

echo.
echo [2/2] Starting services...
call docker-compose up -d
if %ERRORLEVEL% NEQ 0 (
    echo Error: Docker Compose up failed
    pause
    exit /b 1
)

echo.
echo [*] All services started successfully!
echo [*] Backend API: https://localhost/api
echo [*] MySQL: localhost:3306
echo [*] Database: umxinli_db
echo [*] MySQL User: root / root
echo.
echo View logs:
echo   docker-compose logs -f backend
echo   docker-compose logs -f mysql
echo.
echo Stop services:
echo   docker-compose down
echo.
pause
