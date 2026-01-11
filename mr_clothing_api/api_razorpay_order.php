<?php
require_once 'auth_init.php';
require_once 'db.php';

header('Content-Type: application/json');

// Razorpay credentials - Add your own
// Test key: rzp_test_1DP5ibqBrmK5KX
// Temporarily using test key for demo. Replace with your actual credentials.
define('RAZORPAY_KEY_ID', 'rzp_test_1DP5ibqBrmK5KX');
define('RAZORPAY_KEY_SECRET', 'test_secret_key');

if (!isset($_SESSION['user_id'])) {
    json_response(['success' => false, 'message' => 'Please login to continue'], 401);
}

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data || !isset($data['amount']) || !isset($data['items'])) {
    json_response(['success' => false, 'message' => 'Invalid request'], 400);
}

$amount = (int) $data['amount'] * 100; // Convert to paise
$user_id = $_SESSION['user_id'];
$order_reference = 'MR_' . time() . '_' . $user_id;

// Create Razorpay order
$razorpay_order = [
    'amount'   => $amount,
    'currency' => 'INR',
    'receipt'  => $order_reference,
    'notes'    => [
        'user_id' => $user_id,
        'items'   => json_encode($data['items'])
    ]
];

$ch = curl_init('https://api.razorpay.com/v1/orders');
curl_setopt($ch, CURLOPT_USERPWD, RAZORPAY_KEY_ID . ':' . RAZORPAY_KEY_SECRET);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($razorpay_order));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($status_code === 200) {
    $response_data = json_decode($response, true);
    json_response([
        'success' => true,
        'razorpay_order_id' => $response_data['id'],
        'amount' => $data['amount'],
        'key_id' => RAZORPAY_KEY_ID
    ]);
} else {
    json_response(['success' => false, 'message' => 'Failed to create order'], 500);
}
