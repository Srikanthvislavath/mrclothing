<?php
require_once 'auth_init.php';

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data) {
    json_response(['success' => false, 'message' => 'Invalid JSON'], 400);
}

$mobile   = trim($data['mobile']   ?? '');
$password = $data['password']      ?? '';

if ($mobile === '' || $password === '') {
    json_response([
        'success' => false,
        'message' => 'Mobile and password required'
    ], 400);
}

$stmt = $conn->prepare(
    "SELECT id, first_name, last_name, email, mobile, password_hash
     FROM users WHERE mobile = ?"
);
$stmt->bind_param("s", $mobile);
$stmt->execute();
$stmt->bind_result($id, $first_name, $last_name, $email, $db_mobile, $password_hash);

if ($stmt->fetch()) {
    if (password_verify($password, $password_hash)) {
        $_SESSION['user_id']   = $id;
        $_SESSION['user_name'] = $first_name;

        json_response([
            'success' => true,
            'user' => [
                'id'         => $id,
                'first_name' => $first_name,
                'last_name'  => $last_name,
                'email'      => $email,
                'mobile'     => $db_mobile
            ]
        ]);
    } else {
        json_response([
            'success' => false,
            'message' => 'Incorrect password'
        ], 401);
    }
} else {
    json_response([
        'success' => false,
        'message' => 'Account not found. Please register.'
    ], 404);
}

$stmt->close();
