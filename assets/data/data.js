// 📍 1. 所有景點資料 (wishes)
export const wishes = [
  // --- 台灣核心體驗 (Category: E) ---
  {
    Code: "P-E---1",
    Name_EN: "Night Market Culture",
    Name_CH: "夜市文化",
    City: "Taiwan",
    Details: "Vibrant hubs of street food, shopping, and games. Examples: Ningxia (Taipei), Liuhe (Kaohsiung), Fengjia (Taichung).",
    Special: "Foodie Paradise",
    Era: "Modern",
    Year: "1950s",
    Lat: 25.0573,
    Lng: 121.5167
  },
  {
    Code: "P-E---2",
    Name_EN: "Temple & Spiritual Heritage",
    Name_CH: "廟宇文化",
    City: "Taiwan",
    Details: "Architectural treasures reflecting a blend of Taoist, Buddhist, and folk beliefs. Examples: Longshan Temple, Fo Guang Shan.",
    Special: "Cultural Heart",
    Era: "Qing",
    Year: "1700s",
    Lat: 25.0368,
    Lng: 121.5000
  },
  {
    Code: "P-E---3",
    Name_EN: "National Parks & Hiking",
    Name_CH: "國家公園與步道",
    City: "Taiwan",
    Details: "From coastal cliffs to alpine forests. Examples: Taroko Gorge, Yangmingshan, Alishan Forest Railway.",
    Special: "Nature Lovers",
    Era: "Modern",
    Year: "1980s",
    Lat: 24.1347,
    Lng: 121.3825
  },
  {
    Code: "P-E---4",
    Name_EN: "Indigenous Cultural Heritage",
    Name_CH: "原住民文化",
    City: "Taiwan",
    Details: "Rich traditions and crafts from Taiwan's original communities. Examples: Smangus (Atayal), Wulai.",
    Special: "Ethno-tourism",
    Era: "Indigenous",
    Year: "Pre-17th C.",
    Lat: 24.5780,
    Lng: 121.3653
  },

  // --- 城市與購物 (Category: C) ---
  { Code: "P-C-a-N-1", Name_EN: "Zhongshan Shopping District", Name_CH: "中山區商店街/市集", City: "Taipei", Details: "A stylish area filled with designer boutiques, indie brands, and cozy cafés.", Special: "", Era: "Modern", Year: "1990s", Lat: 25.0526, Lng: 121.5204 },
  { Code: "P-C-a-N-2", Name_EN: "Ximending", Name_CH: "西門町", City: "Taipei", Details: "Taipei’s youth fashion hub from Japanese period, packed with trendy shops and vibrant nightlife.", Special: "Nighttime: neon city life", Era: "Japanese", Year: "1896", Lat: 25.0426, Lng: 121.5075 },
  { Code: "P-C-a-N-3", Name_EN: "Taipei 101", Name_CH: "台北101", City: "Taipei", Details: "Iconic landmark hosting luxury brands and a world-class shopping experience.", Special: "", Era: "Modern", Year: "2004", Lat: 25.0340, Lng: 121.5645 },
  { Code: "P-C-a-SE-1", Name_EN: "Dream Mall", Name_CH: "夢時代購物中心", City: "Kaohsiung", Details: "The largest shopping mall in southern Taiwan with a rooftop Ferris wheel.", Special: "", Era: "Modern", Year: "2007", Lat: 22.5950, Lng: 120.3069 },
  { Code: "P-C-a-SE-2", Name_EN: "Hanshin Arena", Name_CH: "漢神巨蛋購物廣場", City: "Kaohsiung", Details: "A trendy shopping complex offering fashion and entertainment.", Special: "", Era: "Modern", Year: "2008", Lat: 22.6698, Lng: 120.3023 },
  { Code: "P-C-a-SE-3", Name_EN: "Hayashi Department Store", Name_CH: "林百貨", City: "Tainan", Details: "Restored historic store blending Japanese-era architecture with modern shops.", Special: "", Era: "Japanese", Year: "1932", Lat: 22.9918, Lng: 120.2025 },
  { Code: "P-C-b-N-1", Name_EN: "Huashan 1914 Creative Park", Name_CH: "華山1914文創園區", City: "Taipei", Details: "Former sake distillery turned into an art and design hub.", Special: "Weekends: Creative market", Era: "Japanese", Year: "1914", Lat: 25.0444, Lng: 121.5294 },
  { Code: "P-C-b-N-2", Name_EN: "Songshan Cultural Park", Name_CH: "松山文創園區", City: "Taipei", Details: "A renovated tobacco factory that’s now a hotspot for design markets.", Special: "Weekends: Creative market", Era: "Japanese", Year: "1937", Lat: 25.0438, Lng: 121.5606 },
  { Code: "P-C-b-N-3", Name_EN: "Treasure Hill", Name_CH: "寶藏巖", City: "Taipei", Details: "A historic hillside settlement turned into an artist village.", Special: "", Era: "Modern", Year: "1960s", Lat: 25.0105, Lng: 121.5331 },
  { Code: "P-C-b-N-4", Name_EN: "Tea Promotion Center", Name_CH: "鐵觀音包種茶研發中心", City: "Taipei", Details: "Learn about the special Oolong tea cultivation in this region and don't forget to try the tea cuisines nearby.", Special: "Spring Harvest Season", Era: "Modern", Year: "1985", Lat: 24.9680, Lng: 121.5872 },
  { Code: "P-C-b-N-5", Name_EN: "Beitou Library", Name_CH: "北投圖書館", City: "Taipei", Details: "A famous eco-friendly wooden library.", Special: "", Era: "Modern", Year: "2006", Lat: 25.1364, Lng: 121.5064 },
  { Code: "P-C-b-N-6", Name_EN: "Taipei Main Station Underground", Name_CH: "台北車站地下街", City: "Taipei", Details: "A massive underground shopping complex.", Special: "", Era: "Modern", Year: "2000", Lat: 25.0474, Lng: 121.5149 },
  { Code: "P-C-b-N-7", Name_EN: "Yongkang Commercial District", Name_CH: "永康街", City: "Taipei", Details: "Famous for mango ice, scallion pancake, other local snacks and shops.", Special: "", Era: "Modern", Year: "1960s", Lat: 25.0335, Lng: 121.5284 },
  { Code: "P-C-b-N-8", Name_EN: "Dadaocheng (Dihua Street)", Name_CH: "大稻埕", City: "Taipei", Details: "A historic merchant district where old-world charm meets modern creativity. Explore traditional herbal shops, Baroque architecture, and vibrant sunset views at the wharf.", Era: "Qing", Year: "1851", Lat: 25.0666, Lng: 121.5099 },
  { Code: "P-C-b-SE-1", Name_EN: "Pier-2 Art Center", Name_CH: "駁二藝術特區", City: "Kaohsiung", Details: "A vibrant arts district by the harbor with murals and creative markets.", Special: "", Era: "Modern", Year: "1973", Lat: 22.6199, Lng: 120.2817 },
  { Code: "P-C-b-SE-2", Name_EN: "Blueprint Cultural Park", Name_CH: "藍晒圖文創園區", City: "Tainan", Details: "Famous for its blueprint wall art and indie shops.", Special: "", Era: "Modern", Year: "2015", Lat: 22.9869, Lng: 120.1984 },
  { Code: "P-C-b-SE-4", Name_EN: "Taitung Railway Art Village", Name_CH: "鐵道藝術村", City: "Taitung", Details: "A creative hub transforming old railway buildings into art studios, shops, and performance spaces.", Special: "", Era: "Modern", Year: "2001", Lat: 22.9869, Lng: 121.1434 },

  { Code: "P-C-d-N-1", Name_EN: "Shilin Night Market", Name_CH: "士林夜市", City: "Taipei", Details: "Taipei’s largest night market, famous for street food and games.", Special: "", Era: "Japanese", Year: "1913", Lat: 25.0866, Lng: 121.5254 },
  { Code: "P-C-d-N-2", Name_EN: "Raohe Night Market", Name_CH: "饒河街夜市", City: "Taipei", Details: "Lively market known for pepper buns and traditional vibes.", Special: "", Era: "Modern", Year: "1987", Lat: 25.0507, Lng: 121.5775 },
  { Code: "P-C-d-SE-1", Name_EN: "Liuhe Night Market", Name_CH: "六合夜市", City: "Kaohsiung", Details: "Iconic market offering fresh seafood and bubble tea.", Special: "", Era: "Modern", Year: "1950s", Lat: 22.6321, Lng: 120.2992 },

  // --- 歷史與文化 (Category: M) ---
  // --- 歷史與文化 (Category: M) ---
  // P-M-a: Landmarks & Heritage
  { Code: "P-M-a-N-2", Name_EN: "Chiang Kai-shek Memorial Hall", Name_CH: "中正紀念堂", City: "Taipei", Details: "The name origined from the 1st president of ROC. This building was to memorize him.", Special: "Hourly guard complex", Era: "Modern", Year: "1980", Lat: 25.0344, Lng: 121.5217 },
  { Code: "P-M-a-N-3", Name_EN: "Longshan Temple", Name_CH: "龍山寺", City: "Taipei", Details: "One of Taiwan’s oldest temples, housing hundred of statues of Buddhist, Taoist, and Confucian deities.", Special: "", Era: "Qing", Year: "1738", Lat: 25.0368, Lng: 121.5000 },
  { Code: "P-M-a-N-4", Name_EN: "Fort San Domingo", Name_CH: "紅毛城", City: "Taipei", Details: "Spanish-built fortress with sweeping views of the Tamsui River.", Special: "Sunset views", Era: "Discovery", Year: "1629", Lat: 25.1753, Lng: 121.4332 },
  { Code: "P-M-a-N-5", Name_EN: "Baimiweng Fort", Name_CH: "白米甕砲臺", City: "Keelung", Details: "Baimiweng Fort is a historic coastal fort in Keelung built during the Japanese era for harbor defense.", Special: "", Era: "Japanese", Year: "1900", Lat: 25.1556, Lng: 121.7431 },
  { Code: "P-M-a-N-6", Name_EN: "Hsing Tian Kong", Name_CH: "行天宮", City: "Taipei", Details: "Popular temple known for its spiritual guidance and fortune-telling.", Special: "", Era: "Modern", Year: "1967", Lat: 25.0597, Lng: 121.5333 },
  { Code: "P-M-a-N-7", Name_EN: "Shilin Official Residence", Name_CH: "士林官邸", City: "Taipei", Details: "Former home of Chiang Kai-shek, surrounded by beautiful gardens.", Special: "Flower shows", Era: "Modern", Year: "1950", Lat: 25.0933, Lng: 121.5294 },
  { Code: "P-M-a-N-8", Name_EN: "Bopiliao Historical Block", Name_CH: "剝皮寮歷史街區", City: "Taipei", Details: "Well-preserved Qing-era street offering a glimpse into old Taipei.", Special: "", Era: "Qing", Year: "1800s", Lat: 25.0355, Lng: 121.5011 },
  { Code: "P-M-a-N-9", Name_EN: "Zhinan Temple", Name_CH: "指南宮", City: "Taipei", Details: "Famed Taoist temple on Maokong Mountain with stunning city views.", Special: "", Era: "Qing", Year: "1882", Lat: 24.9781, Lng: 121.5791 },
  { Code: "P-M-a-N-10", Name_EN: "Sun Yat-sen Memorial Hall", Name_CH: "國父紀念館", City: "Taipei", Details: "Memorial hall dedicated to the founder of the ROC.", Special: "", Era: "Modern", Year: "1972", Lat: 25.0373, Lng: 121.5560 },
  { Code: "P-M-a-N-11", Name_EN: "Presidential Office Building", Name_CH: "總統府", City: "Taipei", Details: "The historic seat of government, blending Baroque and modern styles.", Special: "", Era: "Japanese", Year: "1919", Lat: 25.0400, Lng: 121.5119 },
  { Code: "P-M-a-SE-1", Name_EN: "Fort Zeelandia", Name_CH: "安平古堡 (熱蘭遮城)", City: "Tainan", Details: "Former Dutch fortress marking Taiwan’s early modern history.", Special: "", Era: "Discovery", Year: "1624", Lat: 23.0017, Lng: 120.1609 },
  { Code: "P-M-a-SE-2", Name_EN: "Chihkan Tower", Name_CH: "赤崁樓", City: "Tainan", Details: "Historic landmark and architectural gem from the Dutch and Qing eras.", Special: "", Era: "Discovery", Year: "1653", Lat: 22.9903, Lng: 120.2042 },
  { Code: "P-M-a-SE-3", Name_EN: "Tainan Confucius Temple", Name_CH: "台南孔廟", City: "Tainan", Details: "The first Confucius temple in Taiwan built in 1665, symbolizing academic tradition.", Special: "", Era: "Qing", Year: "1665", Lat: 22.9902, Lng: 120.2046 },
  { Code: "P-M-a-SE-4", Name_EN: "Lotus Pond (Lianchihtan)", Name_CH: "蓮池潭/龍虎塔", City: "Kaohsiung", Details: "It's said that entering at the dragon's mouth and exiting from the tiger's mouth will enjoy good luck.", Special: "Sunset views", Era: "Modern", Year: "1976", Lat: 22.6851, Lng: 120.2974 },
  { Code: "P-M-a-SE-5", Name_EN: "British Consulate at Takao", Name_CH: "打狗英國領事館", City: "Kaohsiung", Details: "Colonial-style building with panoramic harbor views.", Special: "Sunset views", Era: "Qing", Year: "1879", Lat: 22.6189, Lng: 120.2669 },
  { Code: "P-M-a-SE-6", Name_EN: "Taitung Tianhou Temple", Name_CH: "台東天后宮", City: "Taitung", Details: "A Qing-dynasty temple dedicated to goddess Mazu, who provided spring water to relieve the army.", Special: "", Era: "Qing", Year: "1889", Lat: 22.7572, Lng: 121.1550 },

  // P-M-b: Museums & Art
  { Code: "P-M-b-N-1", Name_EN: "National Palace Museum", Name_CH: "國立故宮博物院", City: "Taipei", Details: "A world-class museum that hosts an collection of treasures kept by Emperors ruling from the Forbidden City.", Special: "", Era: "Modern", Year: "1965", Lat: 25.1012, Lng: 121.5425 },
  { Code: "P-M-b-N-2", Name_EN: "National Taiwan Museum", Name_CH: "國立台灣博物館", City: "Taipei", Details: "Taiwan's oldest museum, featuring nature, anthropology, and history.", Special: "", Era: "Japanese", Year: "1908", Lat: 25.0428, Lng: 121.5150 },
  { Code: "P-M-b-N-3", Name_EN: "Beitou Hot Spring Museum", Name_CH: "北投溫泉博物館", City: "Taipei", Details: "This museum is housed in public hot spring bath built during the Japanese colonial era.", Special: "", Era: "Japanese", Year: "1913", Lat: 25.1366, Lng: 121.5064 },
  { Code: "P-M-b-N-4", Name_EN: "Taipei Fine Arts Museum", Name_CH: "台北市立美術館", City: "Taipei", Details: "Showcasing contemporary Taiwanese art in a modern space.", Special: "", Era: "Modern", Year: "1983", Lat: 25.0722, Lng: 121.5247 },
  { Code: "P-M-b-N-5", Name_EN: "MoCA Taipei", Name_CH: "台北當代藝術館", City: "Taipei", Details: "Exhibiting experimental and contemporary art in a historic building.", Special: "", Era: "Modern", Year: "2001", Lat: 25.0490, Lng: 121.5186 },
  { Code: "P-M-b-N-6", Name_EN: "JUT Art Museum", Name_CH: "忠泰美術館", City: "Taipei", Details: "Focused on cities, architecture, and contemporary design.", Special: "", Era: "Modern", Year: "2016", Lat: 25.0440, Lng: 121.5360 },
  { Code: "P-M-b-SE-1", Name_EN: "Chimei Museum", Name_CH: "奇美博物館", City: "Tainan", Details: "European-style museum famed for art and instruments.", Special: "", Era: "Modern", Year: "1992", Lat: 22.9346, Lng: 120.2259 },
  { Code: "P-M-b-SE-2", Name_EN: "Kaohsiung Museum of Fine Arts", Name_CH: "高雄市立美術館", City: "Kaohsiung", Details: "The primary art venue in southern Taiwan, set within a lush park.", Special: "", Era: "Modern", Year: "1994", Lat: 22.6583, Lng: 120.2858 },
  { Code: "P-M-b-SE-3", Name_EN: "AnPing Tree House", Name_CH: "安平樹屋", City: "Tainan", Details: "It is originally served as the warehouse of Tait& Co. Merchant House. Now it is covered with banyan roots.", Special: "", Era: "Modern", Year: "1994", Lat: 22.6583, Lng: 120.2858 },
  { Code: "P-M-b-SE-4", Name_EN: "Ciaotou Sugar Factory", Name_CH: "橋頭糖廠", City: "Kaohsiung", Details: "Japanese built this refinery to make taiwan the most advanced sugar producer in the South-east Asia in 1901. The whole factory is open to public.", Special: "", Era: "Japanese", Year: "1901", Lat: 22.7531, Lng: 120.3147 },

  // --- 自然美景 (Category: N) ---
  { Code: "P-N-a-N-1", Name_EN: "Elephant Mountain (Xiangshan)", Name_CH: "象山", City: "Taipei", Details: "Offers the most famous panoramic view of Taipei 101 and the city.", Special: "Sunset views", Era: "Modern", Year: "1990s", Lat: 25.0277, Lng: 121.5721 },
  { Code: "P-N-a-N-2", Name_EN: "Yangmingshan National Park", Name_CH: "陽明山國家公園", City: "Taipei", Details: "Known forvolcanic landscapes, hot springs, and seasonal flowers.", Special: "Bathing in nature", Era: "Japanese", Year: "1937", Lat: 25.1775, Lng: 121.5475 },
  { Code: "P-N-a-N-3", Name_EN: "Mount Teapot (Teapot Mountain)", Name_CH: "茶壺山", City: "Taipei", Details: "A unique Peak offering breathtaking views of the northern coastline.", Special: "", Era: "Modern", Year: "1990s", Lat: 25.1064, Lng: 121.8657 },
  { Code: "P-N-a-N-4", Name_EN: "Camphor Tree & Camphor Lake Trail", Name_CH: "樟樹樟湖步道", City: "Taipei", Details: "One can easily finish the route in an hour. Following the trail, you’ll see an old-time farmers’ village with all the facilities.", Special: "", Era: "Modern", Year: "2000s", Lat: 24.9690, Lng: 121.5882 },
  { Code: "P-N-a-N-6", Name_EN: "Wufengqi Waterfalls", Name_CH: "五峰旗瀑布", City: "Yilan", Details: "If you like the mountains more, you can reach this lush forest from the coast in half hour. It is a three-tiered waterfall.", Special: "", Era: "Modern", Year: "1961", Lat: 24.8327, Lng: 121.7454 },
  { Code: "P-N-a-N-7", Name_EN: "Xian Dong Yan (Fairy Cave)", Name_CH: "仙洞巖", City: "Keelung", Details: "A natural sea-eroded cave. Inside, you'll find a temple built during the Qing Dynasty. Free entry.", Special: "", Era: "Modern", Year: "2016", Lat: 25.0440, Lng: 121.5360 },
  { Code: "P-N-a-SE-1", Name_EN: "Shoushan (Monkey Mountain)", Name_CH: "壽山", City: "Kaohsiung", Details: "Home to wild macaques and limestone caves with harbor views. The hotspring here is different from ", Special: "", Era: "Japanese", Year: "1923", Lat: 22.6386, Lng: 120.2650 },
  { Code: "P-N-a-SE-3", Name_EN: "Alishan Forest Recreation Area", Name_CH: "阿里山", City: "Chiayi", Details: "Famous for sunrises, giant cypress trees, and the forest railway.", Special: "Morning: sunrise views", Era: "Japanese", Year: "1912", Lat: 23.5097, Lng: 120.8037 },
  { Code: "P-N-b-N-2", Name_EN: "Wushi Harbor", Name_CH: "烏石港", City: "Yilan", Details: "A popular spot for surfing and whale watching. Don't forget the fresh seafood that cooked in Taiwanese way!", Special: "", Era: "Qing", Year: "1826", Lat: 24.8678, Lng: 121.8377 },
  { Code: "P-N-b-N-3", Name_EN: "Yehliu Geopark", Name_CH: "野柳地質公園", City: "New Taipei", Details: "Explore dramatic rock formations and coastal views shaped by the sea and wind. The landmark is the Queen's Head.", Special: "", Era: "Modern", Year: "1964", Lat: 25.2053, Lng: 121.6899 },

  // --- 休閒體驗 (Category: R) ---
  { Code: "P-R-a-N-1", Name_EN: "Beitou Hot spring", Name_CH: "北投溫泉", City: "Taipei", Details: "Relaxing thermal baths in a historic Japanese-era spa town.", Special: "", Era: "Japanese", Year: "1896", Lat: 25.1367, Lng: 121.5000 },
  { Code: "P-R-a-N-2", Name_EN: "Jiufen Old Street", Name_CH: "九份老街", City: "New Taipei", Details: "Originally a gold rush town, now it is renowned for its red lanterns, nostalgic atmosphere, and panoramic ocean views.", Special: "Red lanterns at night", Era: "Japanese", Year: "1890s", Lat: 25.1096, Lng: 121.8442 },
  { Code: "P-R-a-N-3", Name_EN: "Pingxi Old Street", Name_CH: "平溪老街", City: "Taipei", Details: "Historical town famous for sky lanterns with wishes and the narrow street with train going through it.", Special: "Sky Lantern Festival", Era: "Japanese", Year: "1920s", Lat: 24.9583, Lng: 121.7583 },
  { Code: "P-R-a-N-4", Name_EN: "ChiaoHsi Hot spring", Name_CH: "礁溪溫泉", City: "Yilan", Details: "Jiaoxi Hot Spring is crystal-clear, odorless, yet contains a considerable amount of minerals like Potassium hydrogen carbonate. Find a hotel or hot spring park to enjoy it!", Special: "", Era: "Modern", Year: "2005", Lat: 24.8317, Lng: 121.7642 },
  { Code: "P-R-a-N-5", Name_EN: "Beitou Thermal Valley (Hell Valley)", Name_CH: "地熱谷", City: "Taipei", Details: "A surreal natural hot spring with steaming sulfurous waters.", Special: "", Era: "Japanese", Year: "1910s", Lat: 25.1375, Lng: 121.5111 },
  { Code: "P-R-a-N-7", Name_EN: "Maokong Gondola", Name_CH: "貓空纜車", City: "Taipei", Details: "Scenic cable car ride overlooking tea plantations and the city skyline.", Special: "", Era: "Modern", Year: "2007", Lat: 24.9690, Lng: 121.5882 },
  { Code: "P-R-a-N-8", Name_EN: "Herb Alley", Name_CH: "青草巷", City: "Taipei", Details: "A narrow lane in Wanhua filled with aromatic herbal shops and traditional brews.", Special: "", Era: "Qing", Year: "1800s", Lat: 25.0367, Lng: 121.4983 },
  { Code: "P-R-b-N-9", Name_EN: "Taipei Expo Farmers Market", Name_CH: "圓山農夫市集", City: "Taipei", Details: "Vibrant weekend market at Expo Park offering specialty produce from across Taiwan.", Special: "", Era: "Modern", Year: "2010", Lat: 25.0722, Lng: 121.5229 },
  { Code: "P-R-b-N-10", Name_EN: "Beitou Public Hot Spring", Name_CH: "北投湯屋", City: "Taipei", Details: "Affordable and authentic public open-air thermal baths.", Special: "", Era: "Japanese", Year: "1910s", Lat: 25.1363, Lng: 121.5063 },
  { Code: "P-R-a-SE-1", Name_EN: "Sicao Green Tunnel", Name_CH: "四草綠色隧道", City: "Tainan", Details: "You can have a boat ride through a mangrove forest with a Taiwan-style conical hat to avoid sunburn.", Special: "", Era: "Discovery", Year: "1600s", Lat: 23.0079, Lng: 120.1417 },
  { Code: "P-R-a-SE-2", Name_EN: "Yuan Sen Botanical Garden", Name_CH: "原生應用植物園", City: "Taitung", Details: "Not just an educational garden showcasing Taiwan’s medicinal plants, but also offer hot pots with various rare herbs.", Special: "", Era: "Modern", Year: "2005", Lat: 22.7238, Lng: 121.0504 },
  { Code: "P-R-a-SE-3", Name_EN: "Taitung Flowing Lake", Name_CH: "台東活水湖", City: "Taitung", Details: "Located in Taitung Forest Park, ideal for swimming, canoeing, birdwatching and relaxing your body and mind.", Special: "", Era: "Modern", Year: "2000s", Lat: 22.7672, Lng: 121.1579 }
];

// 🗺️ 2. 定義 11 條精選路線 (Tours)
export const tours = [
  {
    id: "N-1",
    title: "Northern Coast Exploration",
    description: "A coastal journey through geological wonders, mountain towns, and lantern culture.",
    pointCodes: ["P-N-b-N-3", "P-M-a-N-5", "P-N-a-N-7", "P-R-a-N-2", "P-R-a-N-3"],
    coverImage: "P-N-b-N-3"
  },
  {
    id: "N-2",
    title: "Beitou Hot Spring Walk",
    description: "Discover hot spring heritage and Japanese-era architecture.",
    pointCodes: ["P-C-b-N-5", "P-M-b-N-3", "P-R-a-N-5", "P-R-b-N-10"],
    coverImage: "P-M-b-N-3"
  },
  {
    id: "N-3",
    title: "Taipei Art & Imperial Heritage",
    description: "Experience the museums in Taipei through history and arts, and night markets.",
    pointCodes: ["P-R-b-N-9", "P-M-b-N-1", "P-M-b-N-4", "P-C-d-N-1"],
    coverImage: "P-M-b-N-1"
  },
  {
    id: "N-4",
    title: "Historical Trade Route",
    description: "Walk through commercial history, temples, and restored heritage streets.",
    pointCodes: ["P-M-a-N-6", "P-C-b-N-8", "P-C-a-N-1", "P-C-b-N-6",],
    coverImage: "P-C-a-N-1"
  },
  {
    id: "N-5",
    title: "Wanhua Spiritual Route",
    description: "Explore Taipei’s oldest district, temples, and medicine culture.",
    pointCodes: ["P-M-a-N-2", "P-M-b-N-2", "P-M-a-N-11", "P-C-a-N-2", "P-M-a-N-3", "P-R-a-N-8", "P-M-a-N-8", "P-C-b-N-3"],
    coverImage: "P-M-a-N-3"
  },
  {
    id: "N-6",
    title: "Taipei Skyline & Creative Route",
    description: "A modern Taipei journey featuring skyline views and creative parks.",
    pointCodes: ["P-N-a-N-1", "P-C-a-N-3", "P-M-a-N-10", "P-C-b-N-7", "P-C-b-N-1", "P-C-b-N-2"],
    coverImage: "P-C-a-N-3"
  },
  {
    id: "N-7",
    title: "Maokong Tea Mountain",
    description: "Ride the cable car to scenic tea plantations and mountain temples.",
    pointCodes: ["P-R-a-N-7", "P-C-b-N-4", "P-N-a-N-4", "P-M-a-N-9"],
    coverImage: "P-R-a-N-7"
  },
  {
    id: "N-8",
    title: "Yilan Coast & Waterfall Nature",
    description: "Enjoy surfing beaches, scenic waterfalls, and hot springs.",
    pointCodes: ["P-N-b-N-2", "P-N-a-N-6", "P-R-a-N-4"],
    coverImage: "P-N-a-N-6"
  },
  {
    id: "SE-1",
    title: "Tainan Ancient Capital",
    description: "Travel through Taiwan’s oldest city filled with colonial history.",
    pointCodes: ["P-M-a-SE-2", "P-M-a-SE-3", "P-M-a-SE-1", "P-M-b-SE-3", "P-R-a-SE-1", "P-C-b-SE-2"],
    coverImage: "P-M-a-SE-1"
  },
  {
    id: "SE-2",
    title: "Kaohsiung Harbor Art",
    description: "Explore the southern harbor city blending industry and art.",
    pointCodes: ["P-M-a-SE-4", "P-M-b-SE-4", "P-M-a-SE-5", "P-N-a-SE-1", "P-C-b-SE-1"],
    coverImage: "P-C-b-SE-1"
  },
  {
    id: "SE-3",
    title: "Taitung Nature & Indigenous Culture",
    description: "Experience eastern Taiwan’s pristine nature and traditions.",
    pointCodes: ["P-R-a-SE-3", "P-M-a-SE-6", "P-R-a-SE-2", "P-C-b-SE-4"],
    coverImage: "P-R-a-SE-3"
  },
];

// 🍜 3. 美食資料 (Foods)
export const foods = [
  // --- Core Experiences (Category: E) ---
  {
    Code: "F-E-1",
    Name_EN: "Traditional Breakfast",
    Name_CH: "傳統早餐",
    City: "Taiwan",
    Details: "A classic Taiwanese breakfast usually includes warm soy milk (豆漿) paired with crispy baked flatbread (燒餅) or a chewy egg crepe (蛋餅). It’s simple, comforting, and a must-try way to start the day like a local.",
    Special: ""
  },
  {
    Code: "F-E-2",
    Name_EN: "Bubble Milk Tea",
    Name_CH: "珍珠奶茶",
    City: "Taiwan",
    Details: "Most famous drink in Taiwan with milk tea and chewy tapioca pearls. Sweet, fun, and customizable, it’s a global icon that started on the island.",
    Special: ""
  },
  {
    Code: "F-E-3",
    Name_EN: "Stinky Tofu",
    Name_CH: "臭豆腐",
    City: "Taiwan",
    Details: "Taiwan’s most iconic street food — it smells bold but tastes surprisingly delicious, crispy outside and tender inside. Dare to try it, and you might just get hooked!",
    Special: ""
  },
  {
    Code: "F-E-4",
    Name_EN: "Tofu Pudding (Douhua)",
    Name_CH: "豆花",
    City: "Taiwan",
    Details: "Douhua is a silky tofu pudding served with sweet syrup and toppings like peanuts or tapioca. Light, refreshing, and comforting.",
    Special: ""
  },
  {
    Code: "F-E-5",
    Name_EN: "Shaved Ice",
    Name_CH: "挫冰",
    City: "Taiwan",
    Details: "A mountain of shaved ice topped with fruits, beans, or sweets. It’s Taiwan’s ultimate treat to cool down in the heat.",
    Special: ""
  },
  {
    Code: "F-E-6",
    Name_EN: "Taiwanese Stir-Fry (Rechao)",
    Name_CH: "熱炒",
    City: "Taiwan",
    Details: "The Night-Out Feast! A lively dining style where chefs whip up quick, flavorful dishes in blazing woks—perfect for sharing with friends over ice-cold Taiwan Beer.",
    Special: ""
  },
  {
    Code: "F-E-7",
    Name_EN: "Fruit / Juice",
    Name_CH: "水果/果汁",
    City: "Taiwan",
    Details: "Taiwan is a tropical paradise where farmers use advanced cultivation techniques to grow an incredible variety of fruits that you can't find in other countries, like mangoes, pineapples, guavas...",
    Special: ""
  },
  // --- City & Cuisine (Category: C) ---
  { Code: "F-C-1", Name_EN: "Beef Noodle Soup", Name_CH: "牛肉麵", City: "Taiwan", Details: "All Taiwanese grow up with this! Inspired by Sichuan flavors, Taiwanese chefs added soy-braised beef and local spices for a milder, sweeter taste.", Special: "" },
  { Code: "F-C-2", Name_EN: "Braised Pork Rice", Name_CH: "滷肉飯", City: "Taiwan", Details: "Pork belly is slow-braised with soy sauce, sugar, and spices for hours. Melt-in-your-mouth tender.", Special: "" },
  { Code: "F-C-4", Name_EN: "Gua Bao", Name_CH: "割包", City: "Taiwan", Details: "Traditional Hakka snack with fluffy steamed bun hugging braised pork belly, pickled veggies, and crushed peanuts.", Special: "" },
  { Code: "F-C-5", Name_EN: "Popcorn Chicken", Name_CH: "鹽酥雞", City: "Taiwan", Details: "The chicken is bite-sized, crispy, seasoned with basil, coated with sweet potato flour and deep-fried twice. You can also find other fried foods in this kind of vendor.", Special: "" },
  { Code: "F-C-6", Name_EN: "Three-Cup Chicken", Name_CH: "三杯雞", City: "Taiwan", Details: "Named after its “three cups” of seasoning—soy sauce, rice wine, and sesame oil.", Special: "" },
  { Code: "F-C-7", Name_EN: "Small and Big Sausage", Name_CH: "大腸包小腸", City: "Taiwan", Details: "A grilled Taiwanese pork sausage wrapped in sticky rice, a flavorful street food.", Special: "" },
  // --- Vegetarian (Category: V) ---
  { Code: "F-V-1", Name_EN: "Boiled Veggies", Name_CH: "燙青菜", City: "Taiwan", Details: "Seasonal vegetables blanched and served with soy sauce and garlic oil. Simple, fresh, and healthy.", Special: "" },
  { Code: "F-V-2", Name_EN: "Scallion Pancake", Name_CH: "蔥油餅", City: "Taiwan", Details: "I am not lying: The scallion in Taiwan is much flavorful than the ones in other countries! Made in this way, the pancake is flaky, crispy, and perfect with egg or cheese.", Special: "" },
  { Code: "F-V-3", Name_EN: "Sweet Potato Balls", Name_CH: "地瓜球", City: "Taiwan", Details: "Made from mashed sweet potato mixed with tapioca starch for that bouncy texture.", Special: "" },
  { Code: "F-V-4", Name_EN: "Veg Braised Pork Rice", Name_CH: "素滷肉飯", City: "Taiwan", Details: "Uses soy protein or mushrooms braised in soy sauce for a meaty texture.", Special: "" },
  { Code: "F-V-5", Name_EN: "Buddha’s Delight", Name_CH: "羅漢齋", City: "Taiwan", Details: "A Buddhist temple dish, cooked without onion or garlic because they are prohibited in Buddha vegetarian. It is a colorful mix of veggies and tofu.", Special: "" },
  { Code: "F-V-6", Name_EN: "Cold Noodles w/ Sesame", Name_CH: "麻醬麵", City: "Taiwan", Details: "Wheat noodles tossed in sesame paste, soy sauce, and vinegar. Perfect for humid summer.", Special: "" },
  { Code: "F-V-7", Name_EN: "Three Cups Eggplant", Name_CH: "三杯茄子", City: "Taiwan", Details: "A classic Taiwanese dish featuring eggplant braised in soy sauce, rice wine, and sesame oil.", Special: "" },
  // --- Muslim / Halal (Category: M) ---
  { Code: "F-M-1", Name_EN: "Halal Beef Noodle", Name_CH: "清真牛肉麵", City: "Taipei", Details: "Using beef shank and spice-rich broth. Certified shops serve this iconic dish. You can also find a mosque in Taipei city and many Muslims in Taiwan.", Special: "" },
  { Code: "F-M-2", Name_EN: "Lamb Hot Pot", Name_CH: "羊肉爐", City: "Taiwan", Details: "Lamb simmered with Chinese herbs for hours, perfect for winter.", Special: "" },
  // --- Seafood (Category: S) ---
  { Code: "F-S-1", Name_EN: "Grilled Squid", Name_CH: "烤魷魚", City: "Taiwan", Details: "Smoky, tender, brushed with sweet soy glaze. You can find it in many night markets.", Special: "" },
  { Code: "F-S-2", Name_EN: "Clam Soup", Name_CH: "蛤蜊湯", City: "Taiwan", Details: "A simple, homestyle dish with only fresh clams in a ginger-infused broth.", Special: "" },
  { Code: "F-S-3", Name_EN: "Milkfish", Name_CH: "虱目魚", City: "Tainan", Details: "Tender yet firm flesh with a mild sweetness. A local staple, especially in Tainan, showing the developemnet of the aquaculture in Taiwan.", Special: "" },
  { Code: "F-S-4", Name_EN: "Oyster Omelette", Name_CH: "蚵仔煎", City: "Taiwan", Details: "A Fujianese dish transformed in Taiwan with sweet potato starch for extra chewiness.", Special: "" }
];