# MR CLOTHING - Complete Integration Setup Guide

## 🚀 Quick Start

### 1. Database Setup
```bash
# Open MySQL and run:
mysql -u root
source C:\Users\ANUSHA\OneDrive\Desktop\MR_Clothing\mr_clothing_api\schema.sql
```

Or manually create tables using the schema.sql file.

---

## 🔐 Login Integration (Already Configured)

### Features:
✅ User registration with password hashing
✅ Secure login with session management
✅ User authentication check
✅ Logout functionality
✅ Pre-filled checkout with user data

### Login Flow:
1. User signs up on `/register` page
2. Password is securely hashed using `password_hash()`
3. User logs in with mobile + password
4. Session created automatically
5. Auth context stores user data
6. Checkout page requires login

### Test Credentials (Create one first):
- Go to http://localhost:5173/register
- Create test account
- Login and proceed to checkout

---

## 💳 Payment Integration (Razorpay)

### Setup Steps:

#### Step 1: Get Razorpay Credentials
1. Sign up at https://razorpay.com
2. Go to Dashboard → Settings → API Keys
3. Copy:
   - Key ID (starts with `rzp_`)
   - Key Secret

#### Step 2: Update API Files
Edit `mr_clothing_api/api_razorpay_order.php` and `mr_clothing_api/api_verify_payment.php`:

Replace:
```php
define('RAZORPAY_KEY_ID', 'rzp_test_YOUR_KEY_ID');
define('RAZORPAY_KEY_SECRET', 'YOUR_KEY_SECRET');
```

With your actual credentials.

#### Step 3: Payment Flow
1. User fills checkout form
2. Clicks "PROCEED TO PAYMENT"
3. Razorpay checkout opens
4. User completes payment
5. Payment verified on backend
6. Order saved to database
7. Confirmation shown to user

---

## 📱 API Endpoints

### Authentication
```
POST /api_register.php
- Body: {title, first_name, last_name, email, mobile, password}
- Response: {success, user}

POST /api_login.php
- Body: {mobile, password}
- Response: {success, user}

GET /api_me.php
- Response: {logged_in, user}

POST /api_logout.php
- Response: {success}
```

### Payment
```
POST /api_razorpay_order.php
- Body: {amount, items}
- Response: {success, razorpay_order_id, amount, key_id}

POST /api_verify_payment.php
- Body: {razorpay_order_id, razorpay_payment_id, razorpay_signature}
- Response: {success, order_id, amount}
```

---

## 🧪 Testing

### Test Account:
1. Register: Mobile `9876543210`, Password `test@123`
2. Login with same credentials
3. Add products to cart
4. Go to checkout
5. Fill delivery address
6. Click "PROCEED TO PAYMENT"

### Test Payment (Razorpay Sandbox):
- Use Test Card: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3 digits

### Success Response:
```json
{
  "success": true,
  "order_id": "ORD_1673456789",
  "amount": 2999
}
```

---

## 🔒 Security Features

✅ Password hashing with PHP's password_hash()
✅ Session-based authentication
✅ Razorpay signature verification
✅ HTTPS recommended for production
✅ CORS headers in place
✅ SQL prepared statements to prevent injection

---

## 📦 Features Implemented

### Login Integration:
- ✅ User registration
- ✅ Secure login
- ✅ Session management
- ✅ User context in React
- ✅ Protected checkout (requires login)
- ✅ User data pre-fill in forms
- ✅ Logout functionality

### Payment Integration:
- ✅ Razorpay order creation
- ✅ Dynamic checkout modal
- ✅ Payment verification
- ✅ Order persistence to database
- ✅ Order success tracking
- ✅ Error handling

---

## 🐛 Troubleshooting

### Issue: "Payment Gateway not responding"
**Solution:** 
- Verify Razorpay credentials are correct
- Check internet connection
- Ensure API keys are from same environment (test/prod)

### Issue: "User not found"
**Solution:**
- Ensure user is registered first
- Check mobile number format
- Verify database connection

### Issue: "Session not persisting"
**Solution:**
- Ensure cookies are enabled
- Check auth_init.php is included in all APIs
- Verify localhost/mr_clothing_api path is correct

---

## 📞 Support URLs

- Razorpay Docs: https://razorpay.com/docs/
- Test Cards: https://razorpay.com/docs/payments/payments/test-mode/
- PHP Sessions: https://www.php.net/manual/en/function.session-start.php

---

## ✨ Next Steps (Optional Enhancements)

1. Add SMS OTP verification
2. Implement email notifications
3. Add order tracking page
4. Implement product reviews
5. Add wishlists
6. Multiple payment methods
7. Email receipts
8. Admin dashboard

---

Created: January 11, 2026
Version: 1.0 (Full Integration)
