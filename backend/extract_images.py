#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Image Resource Extractor and Downloader
Extract all image URLs from frontend code and download to local
"""

import os
import re
import json
import requests
from pathlib import Path
from urllib.parse import urlparse
from typing import Set, List

# Configuration
APP_DIR = r"d:\pp\只管去做\教练\app"
BACKEND_DIR = r"d:\pp\只管去做\教练\backend"
IMAGES_DIR = os.path.join(BACKEND_DIR, "src", "main", "resources", "static", "images")
URLS_FILE = os.path.join(BACKEND_DIR, "image_urls.json")

# Image extensions
IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp', '.ico'}

def extract_urls_from_file(file_path: str) -> Set[str]:
    """Extract all image URLs from a single file"""
    urls = set()
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            
            # Match URL pattern
            url_pattern = r'https?://[^\s"\' <> ]+(?:\.png|\.jpg|\.jpeg|\.gif|\.webp|\.svg|\.bmp|\.ico)'
            matches = re.findall(url_pattern, content, re.IGNORECASE)
            urls.update(matches)
            
            # Match exports pattern
            export_pattern = r'exports\s*=\s*["\']([^"\']+\.(?:png|jpg|jpeg|gif|webp|svg|bmp|ico))["\']'
            matches = re.findall(export_pattern, content, re.IGNORECASE)
            for match in matches:
                if match.startswith('http'):
                    urls.add(match)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    
    return urls

def extract_all_urls(app_dir: str) -> Set[str]:
    """Extract all image URLs from all JS files"""
    all_urls = set()
    
    print(f"Scanning directory: {app_dir}")
    
    for root, dirs, files in os.walk(app_dir):
        for file in files:
            if file.endswith('.js'):
                file_path = os.path.join(root, file)
                urls = extract_urls_from_file(file_path)
                if urls:
                    print(f"Found {len(urls)} URLs in {file}")
                    all_urls.update(urls)
    
    return all_urls

def download_image(url: str, save_dir: str) -> bool:
    """Download a single image"""
    try:
        # Parse URL to get filename
        parsed_url = urlparse(url)
        filename = os.path.basename(parsed_url.path)
        
        if not filename:
            filename = f"image_{hash(url) % 10000}.png"
        
        # Create full path
        file_path = os.path.join(save_dir, filename)
        
        # Skip if file already exists
        if os.path.exists(file_path):
            print(f"[OK] Already exists: {filename}")
            return True
        
        # Download file
        print(f"[DOWNLOAD] {filename}...", end=" ")
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        # Save file
        with open(file_path, 'wb') as f:
            f.write(response.content)
        
        print(f"[OK] ({len(response.content)} bytes)")
        return True
        
    except Exception as e:
        print(f"[ERROR] {e}")
        return False

def download_all_images(urls: Set[str], save_dir: str) -> dict:
    """Download all images"""
    # Create save directory
    os.makedirs(save_dir, exist_ok=True)
    
    stats = {
        'total': len(urls),
        'success': 0,
        'failed': 0,
        'urls': list(urls)
    }
    
    print(f"\nDownloading {len(urls)} images to {save_dir}...")
    print("-" * 80)
    
    for i, url in enumerate(urls, 1):
        print(f"[{i}/{len(urls)}] ", end="")
        if download_image(url, save_dir):
            stats['success'] += 1
        else:
            stats['failed'] += 1
    
    print("-" * 80)
    print(f"\nDownload Summary:")
    print(f"  Total: {stats['total']}")
    print(f"  Success: {stats['success']}")
    print(f"  Failed: {stats['failed']}")
    
    return stats

def save_urls_to_json(urls: Set[str], output_file: str):
    """Save URL list to JSON file"""
    data = {
        'total': len(urls),
        'urls': sorted(list(urls))
    }
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"\nURL list saved to: {output_file}")

def main():
    """Main function"""
    print("[DEBUG] Script starting...")
    try:
        print("=" * 80)
        print("Image Resource Extractor and Downloader")
        print("=" * 80)
        
        # Extract all URLs
        print("\n[Step 1] Extracting image URLs from frontend code...")
        urls = extract_all_urls(APP_DIR)
        
        if not urls:
            print("No image URLs found!")
            return
        
        print(f"\nFound {len(urls)} unique image URLs:")
        for url in sorted(urls):
            print(f"  - {url}")
        
        # Save URL list
        print(f"\n[Step 2] Saving URL list...")
        save_urls_to_json(urls, URLS_FILE)
        
        # Download all images
        print(f"\n[Step 3] Downloading images...")
        stats = download_all_images(urls, IMAGES_DIR)
        
        print("\n" + "=" * 80)
        print("[OK] Done!")
        print("=" * 80)
        return stats
    except Exception as e:
        print(f"[FATAL ERROR] An unexpected error occurred in main: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    print("[DEBUG] __name__ == '__main__'")
    main()
