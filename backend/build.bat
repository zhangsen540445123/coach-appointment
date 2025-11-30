@echo off
REM UMXinli Backend Build Script
REM This script builds the Spring Boot application

setlocal enabledelayedexpansion

echo.
echo ========================================
echo UMXinli Backend Build Script
echo ========================================
echo.

REM Check if Maven is installed
where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Maven is not installed or not in PATH
    echo Please install Maven and add it to your system PATH
    pause
    exit /b 1
)

echo [1/3] Cleaning previous builds...
call mvn clean
if %ERRORLEVEL% NEQ 0 (
    echo Error: Maven clean failed
    pause
    exit /b 1
)

echo.
echo [2/3] Building project...
call mvn package -DskipTests
if %ERRORLEVEL% NEQ 0 (
    echo Error: Maven build failed
    pause
    exit /b 1
)

echo.
echo [3/3] Build completed successfully!
echo.
echo Generated JAR file: target\umxinli-backend-1.0.0.jar
echo.
pause
