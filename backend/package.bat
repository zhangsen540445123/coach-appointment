@echo off
chcp 65001 >nul
REM ========================================
REM UMXinli 一键打包部署脚本
REM ========================================

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════╗
echo ║     UMXinli 心理咨询平台 - 一键打包     ║
echo ╚════════════════════════════════════════╝
echo.

REM 检查 Maven 是否安装
echo [1/5] 检查环境...
where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [错误] Maven 未安装或未添加到 PATH
    echo 请先安装 Maven: https://maven.apache.org/download.cgi
    pause
    exit /b 1
)
echo      √ Maven 已安装

where java >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [错误] Java 未安装或未添加到 PATH
    echo 请先安装 JDK 21+: https://adoptium.net/
    pause
    exit /b 1
)

REM 检查Java版本
for /f "tokens=3" %%i in ('java -version 2^>^&1 ^| findstr /i "version"') do set JAVA_VER=%%i
set JAVA_VER=%JAVA_VER:"=%
for /f "tokens=1 delims=." %%a in ("%JAVA_VER%") do set JAVA_MAJOR=%%a
if %JAVA_MAJOR% LSS 21 (
    echo [警告] 当前Java版本 %JAVA_VER%，建议使用 JDK 21+
)
echo      √ Java 已安装 (版本: %JAVA_VER%)

REM 清理旧构建
echo.
echo [2/5] 清理旧构建...
call mvn clean -q
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 清理失败
    pause
    exit /b 1
)
echo      √ 清理完成

REM 编译打包
echo.
echo [3/5] 编译打包中 (这可能需要几分钟)...
call mvn package -DskipTests -q
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 编译失败，请检查代码
    pause
    exit /b 1
)
echo      √ 编译完成

REM 创建发布目录
echo.
echo [4/5] 创建发布包...
set RELEASE_DIR=release
if exist "%RELEASE_DIR%" rmdir /s /q "%RELEASE_DIR%"
mkdir "%RELEASE_DIR%"

REM 复制JAR文件
copy "target\umxinli-backend-1.0.0.jar" "%RELEASE_DIR%\" >nul

REM 创建启动脚本
echo @echo off > "%RELEASE_DIR%\start.bat"
echo chcp 65001 ^>nul >> "%RELEASE_DIR%\start.bat"
echo echo. >> "%RELEASE_DIR%\start.bat"
echo echo ╔════════════════════════════════════════╗ >> "%RELEASE_DIR%\start.bat"
echo echo ║   UMXinli 心理咨询平台 - 启动服务      ║ >> "%RELEASE_DIR%\start.bat"
echo echo ╚════════════════════════════════════════╝ >> "%RELEASE_DIR%\start.bat"
echo echo. >> "%RELEASE_DIR%\start.bat"
echo echo [提示] 请确保 MySQL 服务已启动 >> "%RELEASE_DIR%\start.bat"
echo echo [提示] 数据库配置: localhost:3306, 用户名: root, 密码: root >> "%RELEASE_DIR%\start.bat"
echo echo [提示] 首次启动会自动创建数据库和表 >> "%RELEASE_DIR%\start.bat"
echo echo. >> "%RELEASE_DIR%\start.bat"
echo echo 正在启动服务... >> "%RELEASE_DIR%\start.bat"
echo echo 服务地址: http://localhost:8081/api >> "%RELEASE_DIR%\start.bat"
echo echo 按 Ctrl+C 停止服务 >> "%RELEASE_DIR%\start.bat"
echo echo. >> "%RELEASE_DIR%\start.bat"
echo java -Xms512m -Xmx1024m -jar umxinli-backend-1.0.0.jar >> "%RELEASE_DIR%\start.bat"
echo pause >> "%RELEASE_DIR%\start.bat"

echo      √ 发布包创建完成

REM 显示结果
echo.
echo [5/5] 打包完成!
echo.
echo ╔════════════════════════════════════════╗
echo ║              打包成功!                  ║
echo ╚════════════════════════════════════════╝
echo.
echo 发布目录: %cd%\%RELEASE_DIR%
echo.
echo 包含文件:
echo   - umxinli-backend-1.0.0.jar  (后端服务)
echo   - start.bat                   (启动脚本)
echo.
echo 部署说明:
echo   1. 将 release 文件夹复制到服务器
echo   2. 确保服务器已安装 JDK 21+ 和 MySQL 8.0
echo   3. 创建数据库: umxinli_db (或使用默认root/root)
echo   4. 双击 start.bat 启动服务
echo   5. 访问 http://服务器IP:8081/api
echo.

pause

