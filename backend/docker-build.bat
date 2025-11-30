@echo off
REM UMXinli Backend Docker Build Script
REM This script builds and runs the application in Docker

setlocal enabledelayedexpansion

echo.
echo ========================================
echo UMXinli Backend Docker Build Script
echo ========================================
echo.

REM Check if Docker is installed
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Docker is not installed or not in PATH
    echo Please install Docker Desktop and add it to your system PATH
    pause
    exit /b 1
)

REM Check if JAR file exists
if not exist "target\umxinli-backend-1.0.0.jar" (
    echo Error: JAR file not found
    echo Building project first...
    call build.bat
    if %ERRORLEVEL% NEQ 0 (
        echo Error: Build failed
        pause
        exit /b 1
    )
)

echo [1/3] Building Docker image...
call docker build -t umxinli-backend:1.0.0 .
if %ERRORLEVEL% NEQ 0 (
    echo Error: Docker build failed
    pause
    exit /b 1
)

echo.
echo [2/3] Stopping existing container (if any)...
call docker stop umxinli-backend 2>nul
call docker rm umxinli-backend 2>nul

echo.
echo [3/3] Running Docker container...
call docker run -d ^
    --name umxinli-backend ^
    -p 8080:8080 ^
    -e MYSQL_HOST=host.docker.internal ^
    -e MYSQL_PORT=3306 ^
    -e MYSQL_DB=umxinli_db ^
    -e MYSQL_USER=root ^
    -e MYSQL_PASSWORD=root ^
    umxinli-backend:1.0.0

echo.
echo [*] Docker container started successfully!
echo [*] Server will run on http://localhost:8080/api
echo [*] View logs: docker logs -f umxinli-backend
echo.
pause
