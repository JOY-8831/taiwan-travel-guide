<template>
  <div id="tours-page" class="page-layout">
    <ButtonBack @click="goBack" />

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
          <p class="subtitle">Note: While this route covers many must-see spots in the same area, visiting more than 4 in one day can feel rushed. We recommend reading the descriptions and picking your favorites to create a trip that fits your pace</p>
          
          <div v-if="userStyles.length > 0" class="tag-row">
            <span v-for="style in userStyles" :key="style" class="tag" :style="{ borderColor: getStyleColor(style), color: getStyleColor(style) }">
              <span class="hash">#</span> {{ getStyleLabel(style) }}
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
            <button 
              class="add-list-btn" 
              :class="{ selected: isSelected(tour.id) }"
              @click="toggleTour(tour.id)"
            >
              <span>{{ isSelected(tour.id) ? 'In your list' : 'Add to list' }}</span>
              <!-- Small Heart Icon -->
              <svg width="14" height="12" viewBox="0 0 16 14" fill="none" class="heart-icon-small">
                <path d="M8 14L6.85 12.85C2.75 9.15 0 6.65 0 3.6C0 1.6 1.6 0 3.6 0C4.75 0 5.85 0.55 6.55 1.4C7.25 0.55 8.35 0 9.5 0C11.5 0 13.1 1.6 13.1 3.6C13.1 6.65 10.35 9.15 6.25 12.85L8 14Z" :fill="isSelected(tour.id) ? '#D18FA1' : 'none'" :stroke="isSelected(tour.id) ? '#D18FA1' : '#C3DFF1'" stroke-width="2"/>
              </svg>
            </button>
          </div>
          <p class="tour-desc">{{ tour.description }}</p>

          <!-- Horizontal Scrollable Spots -->
          <div class="tour-flow">
            <template v-for="(code, index) in tour.pointCodes" :key="code">
              <!-- Spot Card -->
              <div class="spot-card" :style="{ borderColor: getEraColor(code) }">
                <div class="spot-img-container">
                  <img 
                    :src="getImgSrc(code)" 
                    class="spot-img"
                    @error="handleSpotImageError($event, code)"
                  >
                </div>
                <div class="spot-details-brief">
                  <h3 class="spot-name-small">
                    {{ getPointInfo(code).Name_EN }}
                    <span class="spot-ch-small">{{ getPointInfo(code).Name_CH }}</span>
                  </h3>
                  <p class="spot-brief-small">{{ getPointInfo(code).Details }}</p>
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
  { name: 'North', code: 'N' as const },
  { name: 'South-East', code: 'SE' as const }
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
    selectedTours.value = [...selectedTours.value, id];
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
    'Modern': '#5C8AA7',
    'Japanese': '#CC9665',
    'Qing': '#D18FA1',
    'Discovery': '#8EB16E',
    'Indigenous': '#8EB16E'
  };
  return eraColors[(spot as Wish).Era] ?? '#5C8AA7';
};

const getStyleColor = (style: string) => {
  const colors: Record<string, string> = {
    'C': '#5C8AA7',
    'N': '#8EB16E',
    'M': '#D18FA1',
    'R': '#CC9665'
  }
  return colors[style] || '#5C8AA7'
}

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
  background-color: #171717; /* Dark Grey (BG) */
  min-height: 100vh;
  color: #F3D5BA; /* Vanila */
  font-family: 'Jersey 15', sans-serif;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  overflow-x: hidden;
}

.tours-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.frame {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  background-color: #171717;
  padding: 0;
}

.header-section {
  padding: 0 24px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
}

.title {
  font-family: 'Jersey 15', sans-serif;
  font-size: 3rem;
  line-height: 1.1;
  margin: 0;
  font-weight: normal;
}

.subtitle {
  font-size: 1.4rem;
  line-height: 1.2;
  letter-spacing: 0.02em;
  color: #D6D6D6; /* Light Grey */
  margin: 0;
}

/* Tag Styles */
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.tag {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  gap: 4px;
  border-radius: 36px;
  border: 2px solid;
  font-size: 16px;
}

.hash {
  opacity: 0.8;
}

/* Region Filter Bar */
.sticky-bar-wrapper {
  position: sticky;
  top: 0;
  z-index: 2000;
  background-color: #171717;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 24px 24px 16px; /* Increased from 0 to 24px top */
  box-sizing: border-box;
}

.sticky-bar {
  width: 100%;
  max-width: 900px;
}

.region-filter-bar {
  display: flex;
  background: #001D62;
  border-bottom: 4px solid #001D62;
}

.region-btn {
  flex: 1;
  padding: 8px 16px;
  border: 4px solid #001D62;
  background: #001D62;
  color: #F3D5BA;
  font-family: 'Jersey 15';
  font-size: 1.2rem;
  cursor: pointer;
  text-align: center;
}

.region-btn.active {
  background: #F3D5BA;
  color: #001D62;
}

.tour-grid {
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
}

.tour-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 2px dashed #444;
  padding-bottom: 24px;
}

.tour-block:last-child {
  border-bottom: none;
}

.tour-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.tour-title {
  font-size: 2rem;
  line-height: 1.1;
  margin: 0;
  font-weight: normal;
}

/* New Add to List Button Style (User Requested) */
.add-list-btn {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  gap: 8px;
  /* margin: 0 auto; */ /* Centering removed to allow justify-between to work */
  width: auto; /* Changed to auto to fit content and padding */
  min-width: 108.97px;
  height: 32px;
  background: none;
  border: 2px solid #C3DFF1;
  color: #C3DFF1;
  font-family: 'Jersey 15';
  font-size: 16px;
  cursor: pointer;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.add-list-btn.selected {
  border-color: #D18FA1;
  color: #D18FA1;
}

.add-list-btn.selected svg path {
  fill: #D18FA1;
  stroke: #D18FA1;
}

.tour-desc {
  font-size: 1.2rem;
  line-height: 1.3;
  color: #D6D6D6;
  margin: 0 0 16px 0;
}

.tour-flow {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 14px;
  scrollbar-width: thin;
  scrollbar-color: #656669 transparent;
  align-items: stretch;
}

.tour-flow::-webkit-scrollbar {
  height: 8px;
}
.tour-flow::-webkit-scrollbar-thumb {
  background: #656669;
  border-radius: 6px;
}

.spot-card {
  flex: 0 0 200px;
  background: #C3DFF1;
  border: 4px solid;
  padding: 4px;
  display: flex;
  flex-direction: column;
}

.spot-img-container {
  width: 100%;
  height: 120px;
  overflow: hidden;
}

.spot-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spot-details-brief {
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #001D62;
}

.spot-name-small {
  font-size: 1.1rem;
  line-height: 1;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.spot-ch-small {
  font-size: 0.9rem;
  line-height: 1;
}

.spot-brief-small {
  font-size: 1rem;
  line-height: 1.2;
  color: #656669;
  margin: 0;
  overflow: visible;
}

.flow-arrow {
  flex: 0 0 auto;
  align-self: center;
  color: #656669;
  font-size: 1.2rem;
  margin: 0 4px;
}

.scroll-controls {
  position: fixed;
  bottom: 100px;
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
  background: #001D62;
  color: #F3D5BA;
  border: 2px solid #F3D5BA;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.scroll-btn:hover {
  transform: scale(1.1);
}
</style>
