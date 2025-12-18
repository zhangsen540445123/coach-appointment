# 重新构建后端
Write-Host "=== 开始构建后端 ===" -ForegroundColor Green

# 1. 进入后端目录并构建
Set-Location backend
Write-Host "正在编译 Java 项目..." -ForegroundColor Yellow
mvn clean package -DskipTests

if ($LASTEXITCODE -ne 0) {
    Write-Host "Maven 构建失败！" -ForegroundColor Red
    exit 1
}

# 2. 返回根目录
Set-Location ..

# 3. 构建 Docker 镜像
Write-Host "正在构建 Docker 镜像..." -ForegroundColor Yellow
docker build -t zhangsen0819/coach-appointment-backend:latest ./backend

if ($LASTEXITCODE -ne 0) {
    Write-Host "Docker 镜像构建失败！" -ForegroundColor Red
    exit 1
}

# 4. 重启后端容器
Write-Host "正在重启后端容器..." -ForegroundColor Yellow
docker-compose up -d coach-appointment-backend

Write-Host "=== 后端重新部署完成 ===" -ForegroundColor Green
Write-Host "等待服务启动..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# 5. 检查容器状态
docker ps | Select-String "coach-appointment-backend"

Write-Host "`n请访问 http://localhost:3000 查看效果" -ForegroundColor Cyan

