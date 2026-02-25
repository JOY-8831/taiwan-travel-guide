import requests
import json
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

URL = "https://gis.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
}

try:
    print(f"Testing access to {URL}...")
    r = requests.get(URL, headers=HEADERS, timeout=30, verify=False)
    r.raise_for_status()
    data = r.json()
    
    # Check structure
    infos = data.get("XML_Head", {}).get("Infos", {}).get("Info", [])
    print(f"Found {len(infos)} spots in the JSON.")
    
    if len(infos) > 0:
        first = infos[0]
        print("\nStructure of first spot:")
        # Show key fields: Name, Picdescribe1, Picture1, etc.
        keys = ["Name", "Zipcode", "Town", "Picture1", "Picdescribe1", "Picture2", "Picdescribe2"]
        summary = {k: first.get(k) for k in keys if k in first}
        print(json.dumps(summary, indent=2, ensure_ascii=False))

except Exception as e:
    print(f"Error: {e}")
