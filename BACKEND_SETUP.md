# MR CLOTHING - Quick Start Backend

## Issue: "Failed to fetch" Error

This happens because the PHP backend API is not running.

## Solution Options:

### Option 1: Using XAMPP (Recommended)
1. Install XAMPP from https://www.apachefriends.org/
2. Start XAMPP Control Panel
3. Click "Start" for Apache and MySQL
4. Copy `mr_clothing_api` folder to `C:\xampp\htdocs\`
5. Open phpMyAdmin: http://localhost/phpmyadmin
6. Create database `mr_clothing` and import schema.sql

### Option 2: Using Built-in PHP Server (Quick Test)
Run this command in PowerShell:
```powershell
cd "C:\Users\ANUSHA\OneDrive\Desktop\MR_Clothing\mr_clothing_api"
php -S localhost:80
```

Note: This won't work with MySQL. You still need XAMPP/WAMP for database.

### Option 3: Update API URL to use PHP Built-in Server on Port 8000
If you don't have XAMPP:

1. Start PHP server:
```powershell
cd "C:\Users\ANUSHA\OneDrive\Desktop\MR_Clothing\mr_clothing_api"
php -S localhost:8000
```

2. Update React API URL in `mr-clothing-react/src/api.js`:
Change:
```javascript
const API_BASE = "http://localhost/mr_clothing_api";
```
To:
```javascript
const API_BASE = "http://localhost:8000";
```

3. Setup MySQL database separately or use SQLite

## Verify Backend is Running:

Open browser and visit:
- http://localhost/mr_clothing_api/api_me.php (XAMPP)
- http://localhost:8000/api_me.php (PHP built-in)

Should return:
```json
{"logged_in":false}
```

## Current Status:

❌ PHP Server: Not Running
✅ React App: Running on http://localhost:5174/
❌ Database: Not Connected

## Next Steps:

1. Install and start XAMPP
2. Import database schema
3. Test API endpoint
4. Try registration again
