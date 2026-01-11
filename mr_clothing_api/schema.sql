-- MR CLOTHING Database Schema
-- Create database
CREATE DATABASE IF NOT EXISTS mr_clothing CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mr_clothing;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(10),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    mobile VARCHAR(15) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    razorpay_order_id VARCHAR(100),
    razorpay_payment_id VARCHAR(100),
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order items table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    product_id INT NOT NULL,
    size VARCHAR(10),
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Create indexes
CREATE INDEX idx_user_mobile ON users(mobile);
CREATE INDEX idx_order_user ON orders(user_id);
CREATE INDEX idx_order_razorpay ON orders(razorpay_payment_id);
