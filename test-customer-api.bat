@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

REM 客户信息 API 测试脚本 (Windows 版本)
REM 用于快速测试后端 API 是否正常工作

echo =========================================
echo 客户信息 API 测试脚本
echo =========================================
echo.

REM 配置
set API_BASE_URL=http://localhost:8080/api
set ADMIN_USERNAME=admin
set ADMIN_PASSWORD=adminadmin

echo 步骤 1: 管理员登录...
curl -s -X POST "%API_BASE_URL%/admin/auth/login" ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"%ADMIN_USERNAME%\",\"password\":\"%ADMIN_PASSWORD%\"}" ^
  -o login_response.json

type login_response.json
echo.
echo.

REM 手动提取 token (需要用户复制)
echo 请从上面的响应中复制 token 值
echo 格式: "token":"xxxxxx"
echo.
set /p TOKEN="请粘贴 token (不包含引号): "

if "%TOKEN%"=="" (
  echo ❌ Token 为空，测试终止
  del login_response.json
  exit /b 1
)

echo.
echo ✅ Token 已设置
echo.

echo 步骤 2: 测试字典数据 API...
curl -s -X GET "%API_BASE_URL%/admin/dict/data" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -o dict_response.json

type dict_response.json
echo.
echo.

echo 步骤 3: 测试客户列表 API...
curl -s -X POST "%API_BASE_URL%/admin/customer/list" ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -d "{\"page\":1,\"pageSize\":10,\"keyword\":\"\"}" ^
  -o customer_response.json

type customer_response.json
echo.
echo.

echo =========================================
echo 测试完成
echo =========================================
echo.
echo 响应文件已保存:
echo   - login_response.json
echo   - dict_response.json
echo   - customer_response.json
echo.
echo 如果看到 "code": 200 和数据,说明 API 工作正常
echo 如果看到错误,请检查:
echo   1. 后端服务是否已启动 (端口 8080)
echo   2. 数据库是否已初始化
echo   3. 数据库连接配置是否正确
echo.

pause

