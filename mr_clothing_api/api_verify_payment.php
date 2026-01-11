<?php
require_once 'auth_init.php';
require_once 'db.php';

header('Content-Type: application/json');

// Razorpay credentials
define('RAZORPAY_KEY_ID', 'rzp_test_YOUR_KEY_ID');
define('RAZORPAY_KEY_SECRET', 'YOUR_KEY_SECRET');

if (!isset($_SESSION['user_id'])) {
    json_response(['success' => false, 'message' => 'Not authenticated'], 401);
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data || !isset($data['razorpay_payment_id']) || !isset($data['razorpay_order_id'])) {
    json_response(['success' => false, 'message' => 'Missing payment data'], 400);
}

$razorpay_payment_id = $data['razorpay_payment_id'];
$razorpay_order_id = $data['razorpay_order_id'];
$razorpay_signature = $data['razorpay_signature'] ?? '';

// Verify signature
$signature_payload = $razorpay_order_id . '|' . $razorpay_payment_id;
$expected_signature = hash_hmac('sha256', $signature_payload, RAZORPAY_KEY_SECRET);

if ($expected_signature !== $razorpay_signature) {
    json_response(['success' => false, 'message' => 'Invalid signature'], 401);
}

// Fetch payment details from Razorpay
$ch = curl_init("https://api.razorpay.com/v1/payments/{$razorpay_payment_id}");
curl_setopt($ch, CURLOPT_USERPWD, RAZORPAY_KEY_ID . ':' . RAZORPAY_KEY_SECRET);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$payment_response = curl_exec($ch);
$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($status_code === 200) {
    $payment = json_decode($payment_response, true);
    
    if ($payment['status'] === 'captured' || $payment['status'] === 'authorized') {
        // Save order to database
        $user_id = $_SESSION['user_id'];
        $amount = $payment['amount'] / 100;
        $order_id = 'ORD_' . time();
        $status = 'completed';
        
        $stmt = $conn->prepare(
            "INSERT INTO orders (order_id, user_id, razorpay_order_id, razorpay_payment_id, amount, status, created_at) 
             VALUES (?, ?, ?, ?, ?, ?, NOW())"
        );
        $stmt->bind_param("sissds", $order_id, $user_id, $razorpay_order_id, $razorpay_payment_id, $amount, $status);
        
        if ($stmt->execute()) {
            json_response([
                'success' => true,
                'message' => 'Payment successful',
                'order_id' => $order_id,
                'amount' => $amount
            ]);
        } else {
            json_response(['success' => false, 'message' => 'Failed to save order'], 500);
        }
        $stmt->close();
    } else {
        json_response(['success' => false, 'message' => 'Payment not authorized'], 400);
    }
} else {
    json_response(['success' => false, 'message' => 'Payment verification failed'], 500);
}
