@echo off
echo Starting frontend packaging process...

REM Check if we're in the correct directory
if not exist "Dockerfile" (
    echo Error: Dockerfile not found in frontend directory!
    echo Current directory: %CD%
    pause
    exit /b 1
)

echo Building Docker image...
docker build -f Dockerfile -t zhangsen0819/goal-manage-admin-frontend:latest .

REM Check if build was successful
if %ERRORLEVEL% neq 0 (
    echo Error: Docker build failed!
    pause
    exit /b 1
)

echo Docker build completed successfully!
pause