<template>
  <div id="tours-page" class="page-layout">
    <ButtonBack :dark="true" @click="goBack" />

    <!-- Region Filter Bar: Stable Sticky Container -->
    <div v-show="showRegionFilter" class="sticky-bar-wrapper">
      <div class="sticky-bar">
        <div class="region-filter-bar">
          <button 
            v-for="region in regions" 
            :key="region.code"
            class="region-btn"
            :class="{ active: currentRegion === region.code }"
            @click="setRegion(region.code)"
          >
            {{ region.name }}
          </button>
        </div>
      </div>
    </div>

    <div class="tours-container">

      <main class="frame">
        <div class="header-section">
          <h1 class="title">Explore Tours</h1>
          <p class="subtitle">Discover the beauty of Taiwan through our curated tours.</p>
          
          <div v-if="userStyles.length > 0" class="tag-container">
            <span v-for="style in userStyles" :key="style" class="style-tag">
              # {{ getStyleLabel(style) }}
            </span>
          </div>
        </div>

        <div id="tour-list" class="tour-grid">
        <!-- Tour Item: Title -> Desc -> Spots Flow -->
        <div 
          v-for="tour in filteredTours" 
          :key="tour.id" 
          class="tour-block"
        >

          <div class="tour-header">
            <h2 class="tour-title">{{ tour.title }}</h2>
            <!-- 🎯 Heart Button for Selection (Unified with WishCard) -->
            <button 
              class="heart-btn" 
              :class="{ 'active': isSelected(tour.id) }"
              @click="toggleTour(tour.id)"
              aria-label="Add to favorites"
            >
                <svg v-show="!isSelected(tour.id)" width="32" height="32" viewBox="0 0 16 14" aria-hidden="true" class="icon-outline">
                <g>
                    <rect x="8.70996" y="1.45158" width="1.45166" height="1.45166" />
                    <rect x="10.1616" y="0.000137329" width="1.45166" height="1.45166" />
                    <rect x="11.6133" y="0.000137329" width="1.45166" height="1.45166" />
                    <rect x="13.0649" y="0.000137329" width="1.45166" height="1.45166" />
                    <rect x="7.2583" y="2.90349" width="1.45166" height="1.45166" />
                    <rect x="5.80664" y="1.45158" width="1.45166" height="1.45166" />
                    <rect x="4.3551" y="0.000137329" width="1.45166" height="1.45166" />
                    <rect x="2.90344" y="0.000137329" width="1.45166" height="1.45166" />
                    <rect x="1.45178" y="0.000137329" width="1.45166" height="1.45166" />
                    <rect x="14.5166" y="1.45158" width="1.45166" height="1.45166" />
                    <rect x="14.5166" y="2.90349" width="1.45166" height="1.45166" />
                    <rect x="14.5166" y="4.35493" width="1.45166" height="1.45166" />
                    <rect x="13.0649" y="5.80638" width="1.45166" height="1.45166" />
                    <rect x="11.6133" y="7.25829" width="1.45166" height="1.45166" />
                    <rect x="10.1616" y="8.71021" width="1.45166" height="1.45166" />
                    <rect x="8.70996" y="10.1617" width="1.45166" height="1.45166" />
                    <rect x="0.00012207" y="1.45158" width="1.45166" height="1.45166" />
                    <rect x="0.00012207" y="2.90349" width="1.45166" height="1.45166" />
                    <rect x="0.00012207" y="4.35493" width="1.45166" height="1.45166" />
                    <rect x="2.90344" y="7.25829" width="1.45166" height="1.45166" />
                    <rect x="1.45178" y="5.80638" width="1.45166" height="1.45166" />
                    <rect x="4.3551" y="8.71021" width="1.45166" height="1.45166" />
                    <rect x="5.80664" y="10.1617" width="1.45166" height="1.45166" />
                    <rect x="7.2583" y="11.6136" width="1.45166" height="1.45166" />
                </g>
                </svg>
                <svg v-show="isSelected(tour.id)" width="32" height="32" viewBox="0 0 20 16" aria-hidden="true" class="icon-filled">
                <g>
                    <rect x="10.6667" y="1.77771" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="12.4446" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="14.2222" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="16" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="8.88892" y="3.55566" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="7.11108" y="1.77771" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="5.3335" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="3.55566" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="1.77783" y="0.000133514" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="1.77783" y="1.77797" width="5.33325" height="5.33301" fill="#D18FA1"/>
                    <rect x="12.4446" y="1.77797" width="5.33325" height="5.33301" fill="#D18FA1"/>
                    <rect x="7.11108" y="3.55526" width="5.33325" height="8.88916" fill="#D18FA1"/>
                    <rect x="17.7778" y="1.77771" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="17.7778" y="3.55566" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="17.7778" y="5.33338" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="16" y="7.11109" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="14.2222" y="8.8888" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="12.4446" y="10.6668" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="10.6667" y="12.4445" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect y="1.77771" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect y="3.55566" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect y="5.33338" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="3.55542" y="8.88881" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="5.33325" y="8.88881" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="5.33325" y="7.11097" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="12.4443" y="7.11097" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="12.4443" y="8.88875" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="14.2224" y="7.11097" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="1.77783" y="7.11097" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="3.55542" y="7.11097" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="5.3335" y="10.6668" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="7.11108" y="12.4445" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="8.88892" y="14.2223" width="1.77778" height="1.77778" fill="#D18FA1"/>
                    <rect x="8.88892" y="12.4445" width="1.77778" height="1.77778" fill="#D18FA1"/>
                </g>
                </svg>
            </button>
          </div>
          <p class="tour-desc">{{ tour.description }}</p>

          <!-- Horizontal Scrollable Spots -->
          <div class="tour-flow">
            <template v-for="(code, index) in tour.pointCodes" :key="code">
              <!-- Spot Card -->
              <div class="spot-card" :style="{ borderColor: getEraColor(code) }">
                <div class="spot-img-wrapper">
                  <img 
                    :src="getImgSrc(code)" 
                    class="spot-img"
                    @error="handleSpotImageError($event, code)"
                  >
                </div>
                <!-- 🎯 Added Spot Info Wrapper -->
                <div class="spot-info">
                  <div class="spot-name">
                    {{ getPointInfo(code).Name_EN }}
                    <span class="ch-name">CH: {{ getPointInfo(code).Name_CH }}</span>
                  </div>
                  <span class="spot-details">{{ getPointInfo(code).Details }}</span>
                </div>
              </div>

              <!-- Arrow (Not after last item) -->
              <div v-if="index < tour.pointCodes.length - 1" class="flow-arrow">
                ➜
              </div>
            </template>
          </div>
        </div>
        </div>
      </main>

      <!-- Navigation Controls -->
      
      <ButtonNext 
        text="Next! Time for food!" 
        type="next" 
        @click="goToNext" 
      />

    </div>

    <!-- Floating Scroll Buttons -->
    <div class="scroll-controls">
      <button class="scroll-btn" @click="scrollToTop" title="Go to Top">⬆</button>
      <button class="scroll-btn" @click="scrollToBottom" title="Go to Bottom">⬇</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const config = useRuntimeConfig()
const baseURL = config.app.baseURL

import { wishes, tours } from '../assets/data/data.js' 

interface Wish {
  Code: string;
  Name_CH: string;
  Name_EN: string;
  City: string;
  Details: string;
  Special: string;
  Era: string;
}

interface Tour {
  id: string;
  title: string;
  description: string;
  pointCodes: string[];
  coverImage: string;
}

const router = useRouter()
const userStyles = ref<string[]>([])
const selectedTours = ref<string[]>([])
const regionFilter = ref<'N' | 'SE'>('N')

// 🎯 Data for currentRegion / regions
const regions = [
  { name: '🏙️ North', code: 'N' as const },
  { name: '🌺 South-East', code: 'SE' as const }
]

const currentRegion = computed({
  get: () => regionFilter.value,
  set: (val: 'N' | 'SE') => { regionFilter.value = val }
})

const setRegion = (code: 'N' | 'SE') => {
  regionFilter.value = code
}

const showRegionFilter = ref(true)

const styleLabels: Record<string, string> = {
  'C': 'City',
  'N': 'Nature',
  'M': 'Museum',
  'R': 'Relaxation'
}

onMounted(() => {
  // Load User Styles
  const savedStyles = localStorage.getItem('userTravelStyles') || ''; 
  if (savedStyles) {
    try {
      userStyles.value = JSON.parse(savedStyles);
    } catch {
      userStyles.value = [];
    }
  }

  // Load Selected Tours
  const savedTours = localStorage.getItem('selectedTours');
  if (savedTours) {
    try {
      selectedTours.value = JSON.parse(savedTours);
    } catch {
      selectedTours.value = [];
    }
  }
});

// Select/Deselect Tour
const toggleTour = (id: string) => {
  if (selectedTours.value.includes(id)) {
    selectedTours.value = selectedTours.value.filter(t => t !== id);
  } else {
    selectedTours.value.push(id);
  }
  localStorage.setItem('selectedTours', JSON.stringify(selectedTours.value));
}

const isSelected = (id: string) => selectedTours.value.includes(id);

// 3. 篩選邏輯 (加入嚴格檢查)
const filteredTours = computed(() => {
  const allTours = (tours || []) as Tour[];

  // Region filter: tour IDs start with 'N-' or 'SE-'
  const regionFiltered = allTours.filter((tour: Tour) => tour.id.startsWith(regionFilter.value + '-'));

  if (userStyles.value.length === 0) return regionFiltered;

  return regionFiltered.filter((tour: Tour) => {
    if (!tour.pointCodes) return false;

    // 先過濾掉 undefined 的 code
    const validCodes = tour.pointCodes.filter((c): c is string => !!c);

    return validCodes.some((code: string) => {
      const parts = code.split('-');
      
      // 確保 parts[1] 存在且賦值給一個變數
      const category = parts[1];
      
      // 透過三元運算子或 if 判斷來收窄型別
      return typeof category === 'string' ? userStyles.value.includes(category) : false;
    });
  });
});

// 4. 輔助函數 (加入嚴格檢查)
const getPointInfo = (code: string | undefined): Partial<Wish> => {
  if (!code) {
    return { Name_CH: '未知景點', Name_EN: 'Unknown Spot' };
  }

  const allWishes = (wishes || []) as Wish[];
  const found = allWishes.find((w: Wish) => w.Code === code);
  
  return found || { Name_CH: '找不到景點', Name_EN: 'Spot Not Found' };
};


const getEraColor = (code: string): string => {
  const spot = getPointInfo(code);
  const eraColors: Record<string, string> = {
    'Modern':     '#001D62', // Dark blue
    'Japanese':   '#B85A2A', // Terracotta orange
    'Qing':       '#8B2323', // Deep red
    'Discovery':  '#1A6B6B', // Teal (Dutch/Spanish colonial)
    'Indigenous': '#4A7A2A', // Earthy green
  };
  return eraColors[(spot as Wish).Era] ?? '#001D62';
};

const getStyleLabel = (style: string): string => {
  const labels: Record<string, string> = {
    'C': 'City',
    'N': 'Nature',
    'M': 'Museum',
    'R': 'Relaxation'
  }
  return labels[style] || style
}

const spotImageExtensions = ref<Record<string, string>>({})

const getImgSrc = (code: string) => {
  const ext = spotImageExtensions.value[code] || '.jpg'
  return `${baseURL}images/${code}${ext}`
}

const handleSpotImageError = (event: Event, code: string) => {
  const target = event.target as HTMLImageElement
  const currentExt = spotImageExtensions.value[code] || '.jpg'
  
  if (currentExt === '.jpg') {
    spotImageExtensions.value[code] = '.png'
  } else if (currentExt === '.png') {
    target.src = `${baseURL}images/fallback.jpg`
    spotImageExtensions.value[code] = 'fallback'
  }
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target) {
    target.src = `${baseURL}images/fallback.jpg`;
  }
};

const goBack = () => {
  router.push('/travel-style')
}

const goToNext = () => {
  router.push('/must-eat')
}

const resetAndStartOver = () => {
  localStorage.removeItem('userTravelStyles')
  localStorage.removeItem('selectedTours')
  router.push('/')
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Fallback for some browsers/mobile
  document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
}

const scrollToBottom = () => {
  const height = Math.max(
    document.body.scrollHeight, 
    document.documentElement.scrollHeight
  );
  window.scrollTo({ top: height, behavior: 'smooth' });
  // Fallback
  document.documentElement.scrollTo({ top: height, behavior: 'smooth' });
}
</script>

<style scoped>
#tours-page.page-layout {
  align-items: flex-start !important; 
  padding-top: 60px;
  padding-bottom: 120px;
  height: auto !important;
  min-height: 100vh;
  background-color: #f9f7f2; /* 🎯 Original beige-ish background */
}

.tours-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 🎯 Content centered like original */
  width: 100%;
}

.frame {
  max-width: 900px; 
  margin: 0 auto;
  width: 100%;
  position: relative; 
}

.header-section {
  text-align: left; 
  margin-bottom: 40px;
  padding-left: 10px;
}

.title {
  font-family: 'Jersey 15', sans-serif;
  font-size: 3rem;
  color: var(--dark_blue);
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.4rem;
  color: #666;
}

.tag-container {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 15px;
}

.style-tag {
  background: white;
  color: var(--pink);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  border: 4px solid var(--pink); /* 🎯 Pink frame wrapping them */
}

/* Region Filter Bar & Sticky Logic */
.sticky-bar-wrapper {
  position: -webkit-sticky; /* For Safari */
  position: sticky; 
  top: 0;
  z-index: 2000;
  background-color: #f9f7f2; 
  width: 100%;
  display: flex;
  justify-content: center;
}

.sticky-bar {
  padding: 15px 0 10px 0;
  margin-bottom: 24px;
  width: 100%;
  max-width: 900px; 
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05); 
}

.region-filter-bar {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 0;
}

.region-btn {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 10px;
  height: 40px;
  flex: 1;
  background: #F3D5BA;
  border: 4px solid #001D62;
  color: #001D62;
  font-family: 'Jersey 15', sans-serif;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  letter-spacing: 0.03em;
}

.region-btn:first-child {
  border-right: 2px solid #001D62;
}

.region-btn:last-child {
  border-left: 2px solid #001D62;
}

.region-btn.active {
  background: #001D62;
  color: #F3D5BA;
  font-weight: bold;
}

.tour-list {
  display: flex;
  flex-direction: column;
  gap: 50px; 
}

/* 🎯 Restored Original DASHED Styles from tours_old.vue */
.tour-block {
  display: flex;
  flex-direction: column;
  gap: 5px; 
  padding-bottom: 30px;
  border-bottom: 2px dashed #ddd; /* Separator between tours */
}

.tour-block:last-child {
  border-bottom: none;
}

.tour-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center; 
  gap: 8px;
  margin-bottom: 2px;
}

.tour-title {
  font-family: 'Jersey 15', sans-serif;
  font-size: 2rem;
  color: var(--dark_blue);
  margin: 0;
}

.heart-btn {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: var(--dark_blue); 
  transition: all 0.2s;
  line-height: 1;
}

.heart-btn .icon-outline rect {
    fill: #ccc; 
}

.heart-btn.active .icon-outline rect {
    fill: var(--pink); 
}

.heart-btn.active {
  color: var(--pink);
  transform: scale(1.1);
}

.tour-desc {
  color: #555;
  line-height: 1.3;
  font-size: 1.2rem;
  max-width: 700px;
  width: 100%; 
  margin-top: -2px; 
  margin-bottom: 8px; 
}

.tour-flow {
  display: flex;
  align-items: center;
  gap: 15px;
  overflow-x: auto; 
  padding: 10px 10px 15px 10px; 
  scrollbar-width: thin; 
  scrollbar-color: var(--pink) transparent;
}

.tour-flow::-webkit-scrollbar {
  height: 8px;
}
.tour-flow::-webkit-scrollbar-thumb {
  background-color: var(--pink);
  border-radius: 4px;
}
.tour-flow::-webkit-scrollbar-track {
  background: transparent;
}

.spot-card {
  flex: 0 0 auto; 
  width: 200px; 
  height: 280px; 
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: white;
  padding: 12px;
  border-radius: 12px;
  border: 2px solid var(--dark_blue);
  box-shadow: 4px 4px 0px rgba(0,0,0,0.1);
}

.spot-img-wrapper {
  width: 100%;
  height: 120px; 
  border-radius: 8px;
  overflow: hidden;
  background: #eee;
  flex-shrink: 0;
}

.spot-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spot-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1; 
}

.spot-name {
  font-size: 1.1rem; 
  font-weight: bold;
  color: #333;
  line-height: 1.3;
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
}

.ch-name {
  font-size: 0.9rem;
  font-weight: normal;
  color: #666;
}

.spot-details {
  font-size: 0.85rem;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
}

.flow-arrow {
  flex: 0 0 auto;
  color: #ddd; 
  font-size: 1.5rem;
  font-weight: bold;
}

.next-section {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.scroll-controls {
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 100;
}

.scroll-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--dark_blue);
  color: white;
  border: 2px solid var(--vanilla);
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  transition: transform 0.2s, background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-btn:hover {
  transform: translateY(-3px);
  background: var(--pink);
}
</style>
