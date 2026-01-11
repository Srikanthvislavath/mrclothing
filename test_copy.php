<?php
$source_dir = "C:\\Users\\ANUSHA\\OneDrive\\Desktop\\MR_Clothing\\mr_clothing_api";
$dest_dir = "C:\\xampp\\htdocs\\mr_clothing_api";

// Create destination directory if it doesn't exist
if (!is_dir($dest_dir)) {
    mkdir($dest_dir, 0755, true);
    echo "Created directory: $dest_dir<br>";
}

$files = scandir($source_dir);
foreach ($files as $file) {
    if ($file !== '.' && $file !== '..') {
        $source_file = $source_dir . '\\' . $file;
        $dest_file = $dest_dir . '\\' . $file;
        
        if (is_file($source_file)) {
            if (copy($source_file, $dest_file)) {
                echo "✓ Copied: $file<br>";
            } else {
                echo "✗ Failed to copy: $file<br>";
            }
        }
    }
}

echo "<br>Verification - Files in destination:<br>";
$verify_files = scandir($dest_dir);
foreach ($verify_files as $file) {
    if ($file !== '.' && $file !== '..') {
        echo "- $file<br>";
    }
}
?>
