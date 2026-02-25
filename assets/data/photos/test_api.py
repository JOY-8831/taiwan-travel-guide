import requests
import json

HEADERS = { "accept": "application/json" }
URL = "https://www.travel.taipei/open-api/en/Attractions/All"

try:
    print(f"Fetching from {URL}...")
    r = requests.get(URL, headers=HEADERS, timeout=20)
    r.raise_for_status()
    data = r.json()
    
    # Just show the first one to see structure
    if data.get("data"):
        first = data["data"][0]
        print("\nStructure of first attraction:")
        print(json.dumps(first, indent=2, ensure_ascii=False))
        
        print("\nAll attractions names found in this page:")
        for attr in data["data"]:
            print(f"- {attr.get('name')}")
    else:
        print("No data found in response.")
        print(data)

except Exception as e:
    print(f"Error: {e}")
