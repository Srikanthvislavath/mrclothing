# MR Clothing - Deployment Guide

## Frontend Deployment (Vercel)

1. **Push to GitHub:**
   - Create a new repository on GitHub
   - Push the `mr-clothing-react` folder

2. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Set root directory to `mr-clothing-react`
   - Deploy

## Backend Deployment (PHP Hosting)

### Option 1: Free Hosting (InfinityFree)
1. Sign up at https://infinityfree.net
2. Create a new account
3. Upload `mr_clothing_api` folder via FTP
4. Import `schema.sql` to MySQL database
5. Update `db.php` with hosting credentials

### Option 2: Paid Hosting (cPanel)
1. Upload `mr_clothing_api` to `public_html/api`
2. Create MySQL database via cPanel
3. Import `schema.sql`
4. Update `db.php` and `api_razorpay_order.php` with credentials

## Configuration After Deployment

1. **Update API Base URL** in `src/api.js`:
   ```javascript
   const API_BASE = "https://your-domain.com/api";
   ```

2. **Update CORS** in `auth_init.php`:
   ```php
   if (in_array($origin, ['https://your-frontend.vercel.app'])) {
   ```

3. **Add Razorpay Keys** in `api_razorpay_order.php`
4. **Update Razorpay Dashboard** with production URL
