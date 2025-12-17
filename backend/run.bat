@echo off
REM UMXinli Backend Run Script
REM This script runs the Spring Boot application

setlocal enabledelayedexpansion

echo.
echo ========================================
echo UMXinli Backend Run Script
echo ========================================
echo.

REM Check if JAR file exists
if not exist "target\umxinli-backend-1.0.0.jar" (
    echo Error: JAR file not found at target\umxinli-backend-1.0.0.jar
    echo Please run build.bat first
    pause
    exit /b 1
)

REM Check if Java is installed
where java >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Java is not installed or not in PATH
    echo Please install Java 8 or higher and add it to your system PATH
    pause
    exit /b 1
)

echo [*] Starting UMXinli Backend Service...
echo [*] Server will run on https://localhost/api
echo [*] Press Ctrl+C to stop the server
echo.

java -Xms512m -Xmx1024m -jar target\umxinli-backend-1.0.0.jar

pause
