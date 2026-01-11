<?php
require_once 'auth_init.php';

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data) {
    json_response(['success' => false, 'message' => 'Invalid JSON'], 400);
}

$title      = $data['title']      ?? 'Mr';
$first_name = trim($data['first_name'] ?? '');
$last_name  = trim($data['last_name']  ?? '');
$email      = trim($data['email']      ?? '');
$mobile     = trim($data['mobile']     ?? '');
$password   = $data['password']        ?? '';

$errors = [];
if ($first_name === '') $errors[] = "First name is required.";
if ($last_name === '')  $errors[] = "Last name is required.";
if ($mobile === '')     $errors[] = "Mobile number is required.";
if ($password === '')   $errors[] = "Password is required.";

if ($errors) {
    json_response(['success' => false, 'errors' => $errors], 400);
}

// Check mobile already exists
$stmt = $conn->prepare("SELECT id FROM users WHERE mobile = ?");
$stmt->bind_param("s", $mobile);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    $stmt->close();
    json_response([
        'success' => false,
        'message' => 'Mobile already registered. Please login.'
    ], 400);
}
$stmt->close();

// Check email already exists (if provided)
if ($email !== '') {
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        $stmt->close();
        json_response([
            'success' => false,
            'message' => 'Email already registered. Please login.'
        ], 400);
    }
    $stmt->close();
}

$password_hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare(
    "INSERT INTO users (title, first_name, last_name, email, mobile, password_hash)
     VALUES (?, ?, ?, ?, ?, ?)"
);
$stmt->bind_param("ssssss", $title, $first_name, $last_name, $email, $mobile, $password_hash);

if ($stmt->execute()) {
    $user_id = $stmt->insert_id;
    $_SESSION['user_id']   = $user_id;
    $_SESSION['user_name'] = $first_name;

    json_response([
        'success' => true,
        'user' => [
            'id'         => $user_id,
            'first_name' => $first_name,
            'last_name'  => $last_name,
            'email'      => $email,
            'mobile'     => $mobile
        ]
    ]);
} else {
    json_response([
        'success' => false,
        'message' => 'Error creating user'
    ], 500);
}

$stmt->close();
