@echo off
REM Copy MR Clothing API files to XAMPP
echo Copying API files to XAMPP...

if not exist "C:\xampp\htdocs\mr_clothing_api" mkdir "C:\xampp\htdocs\mr_clothing_api"

xcopy "C:\Users\ANUSHA\OneDrive\Desktop\MR_Clothing\mr_clothing_api\*" "C:\xampp\htdocs\mr_clothing_api\" /Y /E

echo.
echo Files copied successfully!
echo.
echo Test the API by opening these URLs in your browser:
echo http://localhost/mr_clothing_api/test_api.php
echo http://localhost/mr_clothing_api/api_me.php
echo.
pause
