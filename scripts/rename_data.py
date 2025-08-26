#!/usr/bin/env python3
import os

# Paths to your directories
MARKDOWN_DIR = "../backend/data/markdown"
THUMBNAILS_DIR = "../backend/data/thumbnails"

def format_filename(filename: str) -> str:
    name, ext = os.path.splitext(filename)
    name = name.strip().lower().replace(" ", "_")
    ext = ext.lower()
    return f"{name}{ext}"

def rename_files_in_directory(directory: str):
    for filename in os.listdir(directory):
        old_path = os.path.join(directory, filename)
        if os.path.isfile(old_path):
            new_name = format_filename(filename)
            new_path = os.path.join(directory, new_name)
            if old_path != new_path:
                print(f"Renaming: {filename} → {new_name}")
                os.rename(old_path, new_path)

if __name__ == "__main__":
    print("Renaming markdown files...")
    rename_files_in_directory(MARKDOWN_DIR)
    print("Renaming thumbnail files...")
    rename_files_in_directory(THUMBNAILS_DIR)
    print("Done!")
