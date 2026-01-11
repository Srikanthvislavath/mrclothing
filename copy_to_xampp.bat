@echo off
setlocal enabledelayedexpansion

set SOURCE=C:\Users\ANUSHA\OneDrive\Desktop\MR_Clothing\mr_clothing_api
set DEST=C:\xampp\htdocs\mr_clothing_api

if not exist "%DEST%" (
    mkdir "%DEST%"
    echo Created directory: %DEST%
)

echo Copying files...
for %%F in ("%SOURCE%\*.php") do (
    copy "%%F" "%DEST%\" /Y
    echo Copied: %%~nxF
)

echo.
echo Verifying files in destination:
dir "%DEST%\*.php"

echo.
echo Done! Test at: http://localhost/mr_clothing_api/api_me.php
pause
