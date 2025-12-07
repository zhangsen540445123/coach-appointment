# -*- coding: utf-8 -*-
"""
下载前端外部图片资源并保存到后端
"""
import os
import re
import urllib.request
import hashlib
import json
from urllib.parse import urlparse, unquote

# 图片保存目录
IMAGES_DIR = os.path.join(os.path.dirname(__file__), 'src', 'main', 'resources', 'static', 'images')
APP_DIR = os.path.join(os.path.dirname(__file__), '..', 'app')

# 外部图片URL列表 (从扫描结果中提取)
EXTERNAL_IMAGES = [
    "https://cdn1.dcloud.net.cn/517a5977516a63315179556c6433686859324668596d466a5a6a51355a6a686c4e474d78/img/shadow-grey.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/浣嶅浘.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/home/04_qsn@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/鐭╁舰_2.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/home/02_dj@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/鍜ㄨ椤鹃棶寮规@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/counselor/瀹跺涵鍥版壈@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/counselor/瀛︿笟鑱屽満@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/counselor/鎯呯华鍥版壈@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/棣栭〉-2@3x.jpg",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/鑳屾櫙钂欑増@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/home/zxs_tx@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/counselor/涓汉鎴愰暱@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/home/05_gzs@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/share/BG@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/counselor/鎬у績鐞咢3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/鍜ㄨ瀵勮bg@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/share/save@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/home/03_xx@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/鐢佃瘽@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/home/01_jq@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/瀹氫綅@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/鍜ㄨ缁忛獙_bg@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/counselor/浜插瓙鏁欒偛@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/counselor/濠氬Щ鎭嬬埍@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/counselor/浜洪檯鍏崇郴@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/counselor/韬績鍋ュ悍@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/share/pyq@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/瀵艰埅@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/home/鍜ㄨ椤鹃棶@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/share/wx_gf@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/home/logo.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/filter/03_绾夸笅@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/filter/01_鍙害@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/filter/04_闈掑皯骞碄3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/filter/02_浣庝环@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/studio/studio-poster-bg@3x.png",
    "https://umxinli.oss-cn-shanghai.aliyuncs.com/umxinli/mini/assets/瀵艰埅2.png",
]

def get_safe_filename(url):
    """从URL生成安全的文件名"""
    parsed = urlparse(url)
    path = unquote(parsed.path)
    filename = os.path.basename(path)
    # 使用MD5哈希确保文件名唯一且安全
    url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
    # 获取扩展名
    ext = os.path.splitext(filename)[1] or '.png'
    # 清理文件名中的特殊字符
    clean_name = re.sub(r'[^\w\-.]', '_', filename.replace('@', '_at_'))
    return f"{url_hash}_{clean_name}"

def download_image(url, save_path):
    """下载图片"""
    try:
        print(f"下载: {url}")
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=30) as response:
            with open(save_path, 'wb') as f:
                f.write(response.read())
        print(f"  -> 保存到: {save_path}")
        return True
    except Exception as e:
        print(f"  -> 失败: {e}")
        return False

def main():
    # 确保目录存在
    os.makedirs(IMAGES_DIR, exist_ok=True)
    
    # URL到本地文件名的映射
    url_mapping = {}
    
    success_count = 0
    fail_count = 0
    
    for url in EXTERNAL_IMAGES:
        filename = get_safe_filename(url)
        save_path = os.path.join(IMAGES_DIR, filename)
        
        if os.path.exists(save_path):
            print(f"已存在: {filename}")
            url_mapping[url] = filename
            success_count += 1
        elif download_image(url, save_path):
            url_mapping[url] = filename
            success_count += 1
        else:
            fail_count += 1
    
    # 保存映射关系
    mapping_file = os.path.join(os.path.dirname(__file__), 'image_url_mapping.json')
    with open(mapping_file, 'w', encoding='utf-8') as f:
        json.dump(url_mapping, f, ensure_ascii=False, indent=2)
    
    print(f"\n完成! 成功: {success_count}, 失败: {fail_count}")
    print(f"映射关系保存到: {mapping_file}")

if __name__ == '__main__':
    main()

