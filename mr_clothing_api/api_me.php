<?php
require_once 'auth_init.php';

if (!isset($_SESSION['user_id'])) {
    json_response([
        'logged_in' => false,
        'user'      => null
    ]);
}

$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("SELECT id, first_name, last_name, email, mobile FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($id, $first_name, $last_name, $email, $mobile);

if ($stmt->fetch()) {
    json_response([
        'logged_in' => true,
        'user' => [
            'id'         => $id,
            'first_name' => $first_name,
            'last_name'  => $last_name,
            'email'      => $email,
            'mobile'     => $mobile
        ]
    ]);
} else {
    json_response([
        'logged_in' => false,
        'user'      => null
    ]);
}

$stmt->close();
