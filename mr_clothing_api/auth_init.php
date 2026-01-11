<?php
// auth_init.php
require_once 'db.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * CORS for React dev server (http://localhost:5177).
 * Change the origin if your React app runs on a different port.
 */
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ['http://localhost:5173', 'http://localhost:5177', 'http://127.0.0.1:5177'])) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
}

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Helper: send JSON response and exit
function json_response($data, int $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}
