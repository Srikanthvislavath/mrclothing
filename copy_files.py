import shutil
import os

source_dir = r"C:\Users\ANUSHA\OneDrive\Desktop\MR_Clothing\mr_clothing_api"
dest_dir = r"C:\xampp\htdocs\mr_clothing_api"

# Create destination directory if it doesn't exist
if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)
    print(f"Created directory: {dest_dir}")

# Copy all .php files
copied_count = 0
for filename in os.listdir(source_dir):
    if filename.endswith(('.php', '.sql', '.txt', '.md')):
        source_file = os.path.join(source_dir, filename)
        dest_file = os.path.join(dest_dir, filename)
        try:
            shutil.copy2(source_file, dest_file)
            print(f"✓ Copied: {filename}")
            copied_count += 1
        except Exception as e:
            print(f"✗ Failed to copy {filename}: {e}")

print(f"\nTotal files copied: {copied_count}")

# Verify
print("\nFiles in destination:")
for filename in os.listdir(dest_dir):
    print(f"  - {filename}")

print("\nDone! Test the API at: http://localhost/mr_clothing_api/api_me.php")
