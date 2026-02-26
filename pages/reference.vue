<script setup lang="ts">
const router = useRouter()

const historicalSources = [
  { name: '國家圖書館 (NCL-Taiwan)', url: 'https://tme.ncl.edu.tw/tw/%E8%87%BA%E7%81%A3%E8%80%81%E7%85%A7%E7%89%87%E5%9C%96%E9%9B%86/%E5%BD%B1%E9%A5%97/%E5%BA%B6%E6%B0%91%E7%94%9F%E6%B4%BB/2790-%E6%B3%B0%E9%9B%85%E6%97%8F%E5%A9%A6%E5%A5%B3' },
  { name: '國立臺灣歷史博物館', url: 'https://collections.nmth.gov.tw/CollectionContent.aspx?a=132&rno=2002.006.0008' },
  { name: '自由時報', url: 'https://news.ltn.com.tw/news/world/breakingnews/3407721' }
]

const spotReferences = [
  { name: 'Pingxi Old Street (平溪老街)', credit: 'Photo by Friend: 劉青雲' },
  { name: 'Beitou Library (北投圖書館)', credit: 'Photo by Friend: 楊凱恩' },
  { name: 'Yehliu (野柳)', url: 'https://newtaipei.travel/en/attractions/detail/111495' },
  { name: 'Baimiweng Fort', url: 'https://klgreat.klgreat.klcg.gov.tw/en/History_Content.aspx?n=8166&s=8889' },
  { name: 'Xian Dong Yan (Fairy Cave)', url: 'https://travel.klcg.gov.tw/en/TourContent.aspx?n=8508&s=740' },
  { name: 'Jiufen Old Street (九份老街)', url: 'https://www.travel.taipei/en/attraction/details/642' },
  { name: 'Beitou Library (北投圖書館)', url: 'https://www.travel.taipei/en/attraction/details/454' },
  { name: 'Yuanshan Market (圓山市集)', url: 'https://www.travel.taipei/en/news/details/17021' },
  { name: 'National Palace Museum (故宮)', url: 'https://www.travel.taipei/en/attraction/details/441' },
  { name: 'Taipei Fine Arts Museum (北美)', url: 'https://www.tfam.museum/Common/editor.aspx?id=78&ddlLang=en-us' },
  { name: 'Shilin Night Market (士林夜市)', url: 'https://www.travel.taipei/en/attraction/details/1692' },
  { name: 'Zhongshan District (中山區)', url: 'https://taiwanderers.com/zhongshan-taipei-things-to-do/' },
  { name: 'Dadaocheng (大稻埕)', url: 'https://www.travel.taipei/en/attraction/details/1686' },
  { name: 'Chiang Kai-shek Memorial Hall (中正紀念堂)', url: 'https://www.travel.taipei/zh-tw/attraction/details/23' },
  { name: 'National Taiwan Museum (國立台灣博物館)', url: 'https://www.ntm.gov.tw/' },
  { name: 'Presidential Office Building (總統府)', url: 'https://english.president.gov.tw/Page/45' },
  { name: 'Ximending (西門町)', url: 'https://www.foreignersintaiwan.com/blog/ximending' },
  { name: 'Longshan Temple', url: 'https://www.travel.taipei/en/attraction/details/487' },
  { name: 'Herb Alley (青草巷)', credit: 'Photo by 網友' },
  { name: 'Bopiliao Historical Block (剝皮寮)', url: 'https://www.bopiliao.taipei/en' },
  { name: 'National Sun Yat-sen Memorial Hall (國父紀念館)', url: 'https://museums.moc.gov.tw/EN/MusData/Detail?museumsId=01cb6413-a591-4613-802b-5e3d898250cd' },
  { name: 'Yongkang Street (永康街)', url: 'https://www.travel.taipei/en/media/audio-guide/details/231' },
  { name: 'Baozhong Tea (包種茶)', url: 'https://www.travel.taipei/zh-tw/attraction/details/245' },
  { name: 'Camphor Tree Trail (樟樹步道)', url: 'https://www.travel.taipei/en/pictorial/article/18243' },
  { name: 'Wushi Harbor (烏石港)', url: 'https://www.necoast-nsa.gov.tw/Attraction-Content.aspx?a=278&l=2' },
  { name: 'Wufengqi Waterfall (五峰旗瀑布)', url: 'https://taiwantrailsandtales.com/2023/09/13/wufengqi-waterfalls-and-our-lady-of-wufengqi-church/' },
  { name: 'Jiaoxi Hot Spring (礁溪溫泉)', url: 'https://jiaoxi-tourism.tw/index.php/en/attraction/all-in-one-map-2/item/1324-view06' },
  { name: 'Chihkan Tower (赤崁樓)', url: 'https://www.twtainan.net/en/attractions/detail/5849' },
  { name: 'Sicao Green Tunnel (四草隧道)', url: 'https://www.swcoast-nsa.gov.tw/en/attraction/details/506' },
  { name: 'Blueprint Culture & Creative Park (藍晒圖)', url: 'https://www.twtainan.net/en/attractions/detail/4442' },
  { name: 'Lotus Pond (蓮池潭)', url: 'https://khh.travel/en/attractions/detail/491/' },
  { name: 'Ciaotou Sugar Refinery (橋頭糖廠)', url: 'https://www.taisugar.com.tw/english/Attractions_detail.aspx?n=11997&s=327&p=318' },
  { name: 'Anping Tree House (安平樹屋)', url: 'https://www.twtainan.net/en/attractions/detail/4486' },
  { name: 'Flowing Lake (活水湖)', url: 'https://tour.taitung.gov.tw/en/attraction/details/707' },
  { name: 'Tiantian Temple (天后宮)', url: 'https://tour.taitung.gov.tw/en/attraction/details/585' },
  { name: 'Yuan-Sen Applied Botanical Garden (原生植物園)', url: 'https://ttyuansen.com/%E6%B1%86%E7%87%99%E9%8D%8B' },
  { name: 'Tiehua Music Village (鐵花村 鐵道)', url: 'https://tour.taitung.gov.tw/en/attraction/details/1411' }
]

const foodReferences = [
  { name: 'Ciao Kitchen (巧兒灶咖)', url: 'https://ciao.kitchen/gua-bao/' },
  { name: 'Fruit Love Life (果果愛)', url: 'https://fruitlovelife.com/post-f1131201/' },
  { name: 'Chang Beef Noodles (牛肉麵)', url: 'https://auntie.tw/chang-beef-noodles/' }
]

const goBack = () => {
  router.back()
}
</script>

<template>
  <div id="reference-page" class="page-layout">
    <div class="frame">
      <div class="header-section">
        <h1 class="title">References</h1>
        <p class="subtitle">Content and Image Sources used in this journal.</p>
      </div>

      <div class="reference-content">
        <section class="ref-section">
          <h2 class="section-title">Historical & Archival</h2>
          <ul class="ref-list">
            <li v-for="source in historicalSources" :key="source.name">
              <span class="source-name">{{ source.name }}</span>
              <a :href="source.url" target="_blank" class="source-link">Source Link</a>
            </li>
          </ul>
        </section>

        <section class="ref-section">
          <h2 class="section-title">Spots & Photography</h2>
          <ul class="ref-list">
            <li v-for="ref in spotReferences" :key="ref.name">
              <span class="source-name">{{ ref.name }}</span>
              <template v-if="ref.url">
                <a :href="ref.url" target="_blank" class="source-link">Attraction Info</a>
              </template>
              <template v-else-if="ref.credit">
                <span class="source-credit">{{ ref.credit }}</span>
              </template>
            </li>
          </ul>
        </section>

        <section class="ref-section">
          <h2 class="section-title">Food & Recipes</h2>
          <ul class="ref-list">
            <li v-for="ref in foodReferences" :key="ref.name">
              <span class="source-name">{{ ref.name }}</span>
              <a :href="ref.url" target="_blank" class="source-link">Original Source</a>
            </li>
          </ul>
        </section>
      </div>

      <div class="button-container">
        <button class="option-btn primary" @click="goBack">Back to Journey</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#reference-page.page-layout {
  background-color: var(--vanilla);
  min-height: 100vh;
  padding: 80px 20px;
}

.reference-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 20px;
}

.ref-section {
  display: flex;
  flex-direction: column;
}

.ref-list {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ref-list li {
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
  border-bottom: 1px dashed var(--pink);
}

.source-name {
  font-weight: bold;
  color: var(--dark_blue);
  font-size: 1.1rem;
}

.source-link {
  color: var(--blue);
  font-size: 0.9rem;
  text-decoration: none;
  word-break: break-all;
}

.source-link:hover {
  text-decoration: underline;
  color: var(--pink);
}

.source-credit {
  color: #666;
  font-style: italic;
  font-size: 0.95rem;
}

.button-container {
  margin-top: 60px;
}

@media (min-width: 600px) {
  .ref-list li {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .source-link {
    text-align: right;
    max-width: 50%;
  }
}
</style>
