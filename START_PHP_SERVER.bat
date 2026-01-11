@echo off
echo Starting PHP Development Server for MR Clothing API...
echo.
echo Server will run on: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
cd /d "%~dp0mr_clothing_api"
php -S localhost:8000
pause
