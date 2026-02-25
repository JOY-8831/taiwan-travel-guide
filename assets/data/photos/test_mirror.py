import requests
import json
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

URL = "https://media.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Accept": "application/json"
}

try:
    print(f"Testing access to {URL}...")
    r = requests.get(URL, headers=HEADERS, timeout=30, verify=False)
    r.raise_for_status()
    data = r.json()
    print("Success! Data loaded.")
    # Show one spot
    items = data.get("XML_Head", {}).get("Infos", {}).get("Info", [])
    if items:
        print(json.dumps(items[0], indent=2, ensure_ascii=False))
except Exception as e:
    print(f"Error: {e}")
