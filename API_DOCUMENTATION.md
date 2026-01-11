# MR CLOTHING - Complete API Documentation

## 🔧 Setup Instructions

### Prerequisites:
- PHP 7.4+
- MySQL 5.7+
- Node.js 16+
- Razorpay Account (https://razorpay.com)

### Database Setup:
```bash
# 1. Create database
mysql -u root -p
source mr_clothing_api/schema.sql

# 2. Or manually:
CREATE DATABASE mr_clothing;
USE mr_clothing;
# Then copy contents of schema.sql
```

### Backend Configuration (mr_clothing_api/db.php):
```php
$host     = "localhost";
$user     = "root";
$password = "";              // Your MySQL password
$dbname   = "mr_clothing";
```

### Frontend Configuration (mr-clothing-react/src/api.js):
Already configured to connect to `http://localhost/mr_clothing_api`

---

## 🔐 Authentication Endpoints

### 1. Register User
**Endpoint:** `POST /api_register.php`

**Request Body:**
```json
{
  "title": "Mr",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "password": "secure_password_123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "mobile": "9876543210"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Mobile already registered"
}
```

---

### 2. Login User
**Endpoint:** `POST /api_login.php`

**Request Body:**
```json
{
  "mobile": "9876543210",
  "password": "secure_password_123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "mobile": "9876543210"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Incorrect password"
}
```

---

### 3. Get Current User
**Endpoint:** `GET /api_me.php`

**Response (Logged In):**
```json
{
  "logged_in": true,
  "user": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "mobile": "9876543210"
  }
}
```

**Response (Not Logged In):**
```json
{
  "logged_in": false
}
```

---

### 4. Logout User
**Endpoint:** `POST /api_logout.php`

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 💳 Payment Endpoints

### 1. Create Razorpay Order
**Endpoint:** `POST /api_razorpay_order.php`

**Authentication:** Required (User must be logged in)

**Request Body:**
```json
{
  "amount": 2999,
  "items": [
    {
      "id": 1,
      "qty": 2,
      "size": "M"
    },
    {
      "id": 3,
      "qty": 1,
      "size": "L"
    }
  ]
}
```

**Response (Success):**
```json
{
  "success": true,
  "razorpay_order_id": "order_123abc456",
  "amount": 2999,
  "key_id": "rzp_test_YOUR_KEY_ID"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Failed to create order"
}
```

---

### 2. Verify Razorpay Payment
**Endpoint:** `POST /api_verify_payment.php`

**Authentication:** Required (User must be logged in)

**Request Body:**
```json
{
  "razorpay_order_id": "order_123abc456",
  "razorpay_payment_id": "pay_123abc456",
  "razorpay_signature": "signature_hash_value"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Payment successful",
  "order_id": "ORD_1673456789",
  "amount": 2999
}
```

**Response (Error - Invalid Signature):**
```json
{
  "success": false,
  "message": "Invalid signature"
}
```

---

## 🧪 Testing Flow

### Complete Checkout Flow:

```
1. REGISTER
   POST /api_register.php
   ├─ Create user account
   └─ Auto-login user

2. LOGIN
   POST /api_login.php
   ├─ Verify credentials
   └─ Create session

3. ADD TO CART
   (Frontend - Local Storage)
   ├─ Add items
   └─ Calculate totals

4. CHECKOUT
   POST /api_razorpay_order.php
   ├─ User must be logged in
   ├─ Create Razorpay order
   └─ Return order details + key

5. PAYMENT
   (Razorpay Checkout Modal)
   ├─ User enters payment details
   ├─ Payment processed
   └─ Return payment data

6. VERIFY PAYMENT
   POST /api_verify_payment.php
   ├─ Verify signature
   ├─ Fetch payment from Razorpay
   ├─ Save order to database
   └─ Return confirmation

7. SUCCESS
   ├─ Clear cart
   └─ Redirect to home
```

---

## 🔒 Security Details

### Password Security:
```php
// Registration: Passwords are hashed
password_hash($password, PASSWORD_DEFAULT)

// Login: Password is verified
password_verify($password, $password_hash)
```

### Session Management:
```php
// Session started in auth_init.php
session_start();

// User ID stored in session
$_SESSION['user_id'] = $user_id;

// Credentials validated in all protected endpoints
if (!isset($_SESSION['user_id'])) {
    // Reject request
}
```

### Razorpay Signature Verification:
```php
// Prevent man-in-the-middle attacks
$expected_signature = hash_hmac('sha256', $payload, KEY_SECRET);
if ($expected_signature !== $received_signature) {
    // Reject payment
}
```

---

## 📊 Database Schema

### Users Table:
```sql
id (INT) - Primary key
title (VARCHAR) - Mr/Ms/Mrs
first_name (VARCHAR) - User first name
last_name (VARCHAR) - User last name
email (VARCHAR) - User email (UNIQUE)
mobile (VARCHAR) - Mobile number (UNIQUE)
password_hash (VARCHAR) - Hashed password
created_at (TIMESTAMP) - Account creation time
```

### Orders Table:
```sql
id (INT) - Primary key
order_id (VARCHAR) - Unique order reference
user_id (INT) - Foreign key to users
razorpay_order_id (VARCHAR) - Razorpay order ID
razorpay_payment_id (VARCHAR) - Razorpay payment ID
amount (DECIMAL) - Order amount
status (ENUM) - pending/completed/failed/cancelled
created_at (TIMESTAMP) - Order time
```

---

## 🛠️ Troubleshooting

### 1. "Could not read package.json"
**Solution:** Ensure npm commands run from `mr-clothing-react` folder
```bash
cd C:\Users\ANUSHA\OneDrive\Desktop\MR_Clothing\mr-clothing-react
npm install
npm run dev
```

### 2. "Database connection failed"
**Solution:** Check credentials in `mr_clothing_api/db.php`
```php
$host = "localhost";
$user = "root";
$password = "";  // Your MySQL password
$dbname = "mr_clothing";
```

### 3. "Razorpay order creation failed"
**Solution:** Update API credentials in Razorpay endpoint
```php
define('RAZORPAY_KEY_ID', 'YOUR_ACTUAL_KEY_ID');
define('RAZORPAY_KEY_SECRET', 'YOUR_ACTUAL_SECRET');
```

### 4. "CORS error - blocked by policy"
**Solution:** Ensure React app runs on `http://localhost:5173`
- Update origin in `auth_init.php` if different port

### 5. "Payment verification failed"
**Solution:** Check:
- Razorpay signature is correct
- Payment ID exists in Razorpay
- Test mode vs Production mode consistency

---

## 📱 Frontend Integration

### React API Calls:

```javascript
// Register
import { apiPost } from './api';
await apiPost('/api_register.php', {
  title: 'Mr',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  mobile: '9876543210',
  password: 'password123'
});

// Login
await apiPost('/api_login.php', {
  mobile: '9876543210',
  password: 'password123'
});

// Payment
import { createRazorpayOrder, openRazorpayCheckout, verifyRazorpayPayment } from './api';

const order = await createRazorpayOrder(amount, items);
const paymentResponse = await openRazorpayCheckout(order, email, name);
await verifyRazorpayPayment(paymentResponse);
```

---

## ✅ Checklist for Go-Live

- [ ] Database created with all tables
- [ ] Razorpay account created and credentials added
- [ ] db.php updated with correct credentials
- [ ] API files have Razorpay keys
- [ ] React app connects to correct API URL
- [ ] Test user registration
- [ ] Test user login
- [ ] Test payment with test card
- [ ] Verify order saved to database
- [ ] HTTPS configured (for production)

---

**Created:** January 11, 2026  
**Version:** 1.0 - Full Integration Complete
