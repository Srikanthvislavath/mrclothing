<?php
// db.php
$host     = "localhost";
$user     = "root";          // change if needed
$password = "";              // change if needed
$dbname   = "mr_clothing";   // your DB name

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    die("Database connection failed: " . $conn->connect_error);
}
