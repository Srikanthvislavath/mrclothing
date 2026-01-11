$source = "C:\Users\ANUSHA\OneDrive\Desktop\MR_Clothing\mr_clothing_api"
$destination = "C:\xampp\htdocs\mr_clothing_api"

# Create destination if it doesn't exist
if (-not (Test-Path $destination)) {
    New-Item -ItemType Directory -Path $destination -Force
    Write-Host "Created directory: $destination"
}

# Copy all files
Get-ChildItem -Path $source -File | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $destination -Force
    Write-Host "Copied: $($_.Name)"
}

Write-Host "All files copied successfully!"
Write-Host "Verifying..."
Get-ChildItem -Path $destination | Select-Object Name
