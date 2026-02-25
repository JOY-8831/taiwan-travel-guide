import requests
import json

# Official Taipei Travel Net API (Public)
# https://www.travel.taipei/open-api/swagger/zh-tw
url = "https://www.travel.taipei/open-api/zh-tw/Attractions/All?page=1"
headers = {
    "Accept": "application/json"
}

try:
    print(f"Testing Taipei API: {url}...")
    r = requests.get(url, headers=headers, timeout=30)
    r.raise_for_status()
    data = r.json()
    
    items = data.get("data", [])
    print(f"Found {len(items)} attractions on Page 1.")
    
    if items:
        first = items[0]
        print("\nStructure of first attraction:")
        print(f"Name: {first.get('name')}")
        images = first.get("images", [])
        if images:
            print(f"Image[0]: {images[0].get('src')}")
        else:
            print("No images found for this attraction.")

except Exception as e:
    print(f"Error: {e}")
