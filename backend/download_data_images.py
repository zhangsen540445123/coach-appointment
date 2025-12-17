#!/usr/bin/env python3
"""
下载 data.sql 中引用的远程图片到本地
"""
import os
import requests
import hashlib

IMAGES_DIR = os.path.join(os.path.dirname(__file__), 'src', 'main', 'resources', 'static', 'images')

# data.sql 中需要下载的远程图片
REMOTE_IMAGES = {
    # 客服二维码
    'qrcode_customer_service.jpg': 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20211115/351753974260_.pic_hd.jpg',
    # 教练孙竹头像
    'counselor_sunzhu.jpg': 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20250515/bca0a3f0e2164b5bb3a149a76cf00fb8.jpg',
    'counselor_sunzhu_square.jpg': 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20250515/b28a276d29294949a677bc043ca8f261.jpg',
    # 教练苗壮头像
    'counselor_miaozhuang.jpg': 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20250715/9f209e44c1d84008beac4cd35d29175b.jpg',
    'counselor_miaozhuang_square.jpg': 'https://umxinli.oss-cn-shanghai.aliyuncs.com/resource/20250715/13c3e3b01e8f4265935fc9ad705a0cd9.jpg',
}

def download_image(url, save_path):
    """下载图片"""
    try:
        print(f"Downloading: {url}")
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=30)
        if response.status_code == 200:
            with open(save_path, 'wb') as f:
                f.write(response.content)
            print(f"  -> Saved: {save_path}")
            return True
        else:
            print(f"  -> Failed: HTTP {response.status_code}")
            return False
    except Exception as e:
        print(f"  -> Error: {e}")
        return False

def main():
    os.makedirs(IMAGES_DIR, exist_ok=True)
    
    success = 0
    failed = 0
    skipped = 0
    
    for filename, url in REMOTE_IMAGES.items():
        save_path = os.path.join(IMAGES_DIR, filename)
        if os.path.exists(save_path):
            print(f"Already exists: {filename}")
            skipped += 1
        elif download_image(url, save_path):
            success += 1
        else:
            failed += 1
    
    print(f"\nCompleted! Success: {success}, Failed: {failed}, Skipped: {skipped}")
    
    # 输出 SQL 更新语句
    print("\n=== SQL UPDATE statements ===")
    print("-- Update global_settings qrCode")
    print("UPDATE global_settings SET value = '{\"qrCodeImageUrl\":\"/api/file/image/qrcode_customer_service.jpg\",\"showAtMp\":\"1\"}' WHERE key_name = 'concat_sys_agent_settings';")
    print("")
    print("-- Update counselor head_url (需要根据实际部署地址调整)")
    print("-- 建议在后台管理系统中上传新图片并更新教练信息")

if __name__ == '__main__':
    main()

