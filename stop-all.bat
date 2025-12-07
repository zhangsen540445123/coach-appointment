@echo off

echo ========================================
echo    Coach Appointment System - Stop
echo ========================================
echo.

cd /d %~dp0

echo Stopping Docker services...
docker-compose down

echo.
echo All services stopped!
pause

