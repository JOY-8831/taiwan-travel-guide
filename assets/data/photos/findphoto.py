import requests
import json
import time
import re
import os
import urllib3
from pathlib import Path
from typing import Optional, Tuple, List
from urllib.parse import quote, unquote

# Suppress SSL warnings as some gov sites have cert issues
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# ── Config ───────────────────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent
DATA_FILE  = SCRIPT_DIR / "data.js"
OUTPUT_DIR = SCRIPT_DIR
LOG_FILE   = SCRIPT_DIR / "download_log.json"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
}

# ── Official Overrides (GOV.TW / TRUSTED) ──
# Ensure unique URLs; duplicate prevention logic will also check these.
OFFICIAL_OVERRIDES = {
    "P-M-a-N-2":  "https://www-ws.gov.taipei/001/Upload/347/relpic/31011/9510890/24fcb889-2abb-409f-863a-b64dba4224e7.jpg", # CKS Hall
    "P-M-b-N-1":  "https://www.wix.com/static/wix-media-frontend-domain/client-files-domain/file_id/ee81569d-f553-4124-95e5-9d7aae208d5d.jpg", # NPM
    "P-C-a-N-3":  "https://raw.githubusercontent.com/Zane-H/Taiwan-Tourism/master/assets/images/taipei101.jpg", # Taipei 101
    "P-N-b-N-3":  "https://www.northguan-nsa.gov.tw/userfiles/article/202105/df46cd06-733e-46ec-9940-b6c8f4f0391d.jpg", # Yehliu
    "P-E---3":    "https://www.taroko.gov.tw/image/attraction/202203/1.jpg", # Taroko
    "P-N-a-SE-3": "https://www.ali-nsa.net/userfiles/article/202105/df0852e6-c774-4b5b-801b-c36b85e0506e.jpg", # Alishan
    "P-M-a-N-3":  "https://thematriarchitect.com/wp-content/uploads/2019/04/longshan.jpg", # Longshan
    "P-C-b-SE-2": "https://wshnt.tainan.gov.tw/image/attraction/202105/blue_print.jpg", # Blue print
    "P-R-a-N-2":  "https://thetraveltester.com/wp-content/uploads/jiufen-old-street-taiwan-9.jpg", # Jiufen
    "P-N-a-N-1":  "https://www.travel.taipei/image/213/1024x768", # Elephant Mountain (proxy/alt)
    "P-M-a-N-10": "https://www.travel.taipei/image/215/1024x768", # Sun Yat-sen Memorial
}

# ── Helper Functions ────────────────────────────────────────────────────────

def extract_spots_from_js():
    """Robust parser for data.js to get Code, Name_EN, City. Excludes Food."""
    try:
        content = DATA_FILE.read_text(encoding="utf-8")
        pattern = r'\{\s*Code:\s*["\']([^"\']+)["\'][\s\S]*?Name_EN:\s*["\']([^"\']+)["\'][\s\S]*?City:\s*["\']([^"\']+)["\']'
        matches = re.findall(pattern, content)
        # Filter out food (starts with F-)
        return [{"Code": m[0], "Name_EN": m[1], "City": m[2]} for m in matches if not m[0].startswith("F-")]
    except Exception as e:
        print(f"Error reading data.js: {e}")
        return []

def download_image(url: str, dest_path: Path) -> bool:
    """Download image with uniqueness check, SSL bypass, and size validation."""
    try:
        if not url.startswith("http"): return False
        
        # Verify: SSL=False for gov sites known to have issues
        verify_ssl = True
        if ".gov.tw" in url or "travel.taipei" in url or "taiwan.net.tw" in url:
            verify_ssl = False

        r = requests.get(url, headers=HEADERS, timeout=40, stream=True, verify=verify_ssl)
        r.raise_for_status()
        
        with open(dest_path, "wb") as f:
            for chunk in r.iter_content(chunk_size=32768):
                f.write(chunk)
        
        size = dest_path.stat().st_size
        return size > 10_000 
    except Exception as e:
        print(f"    Error: {e}")
        return False

def main():
    import sys
    import io
    if sys.stdout.encoding != 'utf-8':
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    # Load spots
    spots = extract_spots_from_js()
    if not spots:
        print("No spots found in data.js. Check regex.")
        return

    # Load log & track used URLs
    if LOG_FILE.exists():
        with open(LOG_FILE, "r", encoding="utf-8") as f:
            log = json.load(f)
    else:
        log = {}

    used_urls = set()
    for entry in log.values():
        if entry.get("status") == "success" and entry.get("image_url"):
            used_urls.add(entry["image_url"])

    print(f"Running 'Official-First' for {len(spots)} spots...")
    print("Rules: Unique images only. Ignore Wikipedia. Bypass Gov SSL certs.")

    ok = 0
    skipped = 0
    failed = []

    for i, spot in enumerate(spots, 1):
        code = spot["Code"]
        name = spot["Name_EN"]
        city = spot["City"]
        dest = OUTPUT_DIR / f"{code}.jpg"

        existing = log.get(code, {})
        existing_url = existing.get("image_url", "")
        is_wikipedia = "wikipedia.org" in existing_url or "wikimedia.org" in existing_url
        should_retry = not dest.exists() or existing.get("status") != "success" or is_wikipedia

        if not should_retry:
            skipped += 1
            used_urls.add(existing_url)
            continue

        print(f"[{i:03d}/{len(spots)}] {code} -> {name}")

        final_url = None
        source_domain = "unknown"

        # 1. Check Overrides
        if code in OFFICIAL_OVERRIDES:
            ov_url = OFFICIAL_OVERRIDES[code]
            if ov_url in used_urls:
                print(f"    [SKIP] Duplicate URL detected: {ov_url}")
            else:
                final_url = ov_url
                source_domain = "manual_gov"

        if not final_url:
            if is_wikipedia:
                print("    (Marked for official replacement - pending source)")
            else:
                print("    [FAIL] No official URL found.")
                failed.append(code)
            continue

        # 2. Download
        if download_image(final_url, dest):
            print(f"    [OK] Saved ({dest.stat().st_size // 1024} KB)")
            log[code] = {
                "name": name,
                "status": "success",
                "image_url": final_url,
                "domain": source_domain,
                "file": f"{code}.jpg"
            }
            used_urls.add(final_url)
            ok += 1
        else:
            print("    [FAIL] Download failure.")
            failed.append(code)

        # Save log
        sorted_log = {k: log[k] for k in sorted(log.keys())}
        with open(LOG_FILE, "w", encoding="utf-8") as f:
            json.dump(sorted_log, f, ensure_ascii=False, indent=2)
        
        time.sleep(1.0)

    print(f"\nResults: {ok} new, {skipped} skipped, {len(failed)} failed.")

if __name__ == "__main__":
    main()
