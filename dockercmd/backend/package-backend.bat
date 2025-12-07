@echo off
echo Starting backend packaging process...

REM Change to backend directory
REM Check if we're in the correct directory
if not exist "Dockerfile" (
    echo Error: Dockerfile not found in backend directory!
    echo Current directory: %CD%
    pause
    exit /b 1
)

echo Building with local Maven...
call mvn clean package -DskipTests -B

REM Check if Maven build was successful
if %ERRORLEVEL% neq 0 (
    echo Error: Maven build failed!
    pause
    exit /b 1
)

echo Checking for JAR file...
if not exist "target\*.jar" (
    echo Error: No JAR file found in target directory!
    pause
    exit /b 1
)

echo Building optimized Docker image...
docker build -f Dockerfile -t zhangsen0819/goal-manage-backend:latest .

REM Check if Docker build was successful
if %ERRORLEVEL% neq 0 (
    echo Error: Docker build failed!
    pause
    exit /b 1
)

echo Docker build completed successfully!
pause