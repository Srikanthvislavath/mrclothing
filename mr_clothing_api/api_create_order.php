<?php
require_once 'auth_init.php';

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data || !isset($data['amount'])) {
    json_response(['success' => false, 'message' => 'Amount missing'], 400);
}

$amount  = (int) $data['amount'];
$orderId = 'MR_DEMO_' . time();

json_response([
    'success'  => true,
    'order_id' => $orderId,
    'amount'   => $amount,
    'currency' => 'INR'
]);
