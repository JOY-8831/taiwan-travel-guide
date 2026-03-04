<template>
  <div id="tours-new-page" class="page-layout-new">
    <main class="main-content frame">
      <div class="top-nav">
        <button class="back-link" @click="goBack">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="back-arrow">
            <path d="M10 12L6 8L10 4" stroke="#F3D5BA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Back</span>
        </button>
      </div>

      <!-- Sticky Region Tabs -->
      <!-- Sticky Region Tabs -->
      <div class="region-filter-bar sticky-tabs">
        <div class="tabs-container">
          <button 
            class="tab-btn" 
            :class="{ active: currentRegion === 'N' }"
            @click="setRegion('N')"
          >
            North
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: currentRegion === 'SE' }"
            @click="setRegion('SE')"
          >
            South/East
          </button>
        </div>
      </div>

      <!-- Header Section -->
      <div class="tours-container">
        <div class="header-section">
            <h1 class="title">Tours Recommended for you</h1>
            <p class="subtitle">
              Note: While this route covers many must-see spots in the same area, visiting more than 4 in one day can feel rushed. We recommend reading the descriptions and picking your favorites to create a trip that fits your pace.
            </p>
            
            <!-- Style Tags -->
            <div v-if="userStyles.length > 0" class="tag-row">
              <span v-for="style in userStyles" :key="style" class="tag" :style="{ borderColor: getStyleColor(style), color: getStyleColor(style) }">
                <span class="hash">#</span> {{ getStyleLabel(style) }}
              </span>
            </div>
          </div>

          <!-- Tour List -->
          <div class="tour-list">
            <div v-for="tour in filteredTours" :key="tour.id" class="tour-item">
              <div class="item-header">
                <h2 class="item-title">{{ tour.title }}</h2>
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
            <p class="item-desc">{{ tour.description }}</p>

            <!-- Spots Scrollbox -->
            <div class="spots-scrollbox">
              <template v-for="(code, idx) in tour.pointCodes" :key="code">
                <div class="spot-card" :style="{ borderColor: getEraColor(code) }">
                  <div class="spot-img-container">
                    <img :src="getImgSrc(code)" alt="Spot" class="spot-img" @error="handleSpotImageError($event, code)">
                  </div>
                  <div class="spot-details">
                    <h3 class="spot-name">
                      {{ getPointInfo(code).Name_EN }}
                      <span class="spot-ch">{{ getPointInfo(code).Name_CH }}</span>
                    </h3>
                    <p class="spot-brief">{{ getPointInfo(code).Details }}</p>
                  </div>
                </div>
                <!-- Added Arrow -->
                <div v-if="idx < tour.pointCodes.length - 1" class="flow-arrow">
                  ➜
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Navigation -->
    <ButtonNext 
      text="Next! Time for food!" 
      type="next" 
      @click="goToNext" 
    />
  
  </div>
  
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { wishes, tours } from '../assets/data/data.js'

const config = useRuntimeConfig()
const baseURL = config.app.baseURL
const router = useRouter()

const userStyles = ref<string[]>([])
const selectedTours = ref<string[]>([])
const currentRegion = ref<'N' | 'SE'>('N')

onMounted(() => {
  const savedStyles = localStorage.getItem('userTravelStyles')
  if (savedStyles) {
    try {
      userStyles.value = JSON.parse(savedStyles)
    } catch {
      userStyles.value = []
    }
  }

  const savedTours = localStorage.getItem('selectedTours')
  if (savedTours) {
    try {
      selectedTours.value = JSON.parse(savedTours)
    } catch {
      selectedTours.value = []
    }
  }
})

const filteredTours = computed(() => {
  const allTours = (tours || [])
  const regionFiltered = allTours.filter(t => t.id.startsWith(currentRegion.value + '-'))
  
  if (userStyles.value.length === 0) return regionFiltered

  return regionFiltered.filter(tour => {
    if (!tour.pointCodes) return false
    return tour.pointCodes.some(code => {
      const category = code?.split('-')[1]
      return category ? userStyles.value.includes(category) : false
    })
  })
})

const isSelected = (id: string) => selectedTours.value.includes(id)

const toggleTour = (id: string) => {
  if (isSelected(id)) {
    selectedTours.value = selectedTours.value.filter(t => t !== id)
  } else {
    selectedTours.value = [...selectedTours.value, id]
  }
  localStorage.setItem('selectedTours', JSON.stringify(selectedTours.value))
}

const getPointInfo = (code: string | undefined) => {
  if (!code) return { Name_EN: 'Unknown', Name_CH: '未知', Details: '', Era: 'Modern' }
  return wishes.find(w => w.Code === code) || { Name_EN: 'Unknown', Name_CH: '未知', Details: '', Era: 'Modern' }
}

const getEraColor = (code: string) => {
  const spot = getPointInfo(code)
  const eraColors: Record<string, string> = {
    'Modern': '#5C8AA7',
    'Japanese': '#CC9665',
    'Qing': '#D18FA1',
    'Discovery': '#8EB16E',
    'Indigenous': '#8EB16E'
  }
  return eraColors[spot.Era] || '#5C8AA7'
}

const getStyleColor = (style: string) => {
  const colors: Record<string, string> = {
    'C': '#5C8AA7',
    'N': '#8EB16E',
    'M': '#D18FA1',
    'R': '#CC9665'
  }
  return colors[style] || '#5C8AA7'
}

const getStyleLabel = (style: string) => {
  const labels: Record<string, string> = {
    'C': 'City',
    'N': 'Nature',
    'M': 'Museum',
    'R': 'Relaxation'
  }
  return labels[style] || style
}

const setRegion = (region: 'N' | 'SE') => {
  currentRegion.value = region
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
  } else {
    target.src = `${baseURL}images/fallback.jpg`
  }
}

const goBack = () => router.push('/travel-style')
const goToNext = () => router.push('/must-eat')
</script>

<style scoped>
.page-layout-new {
  background-color: #171717; /* Dark Grey (BG) */
  min-height: 100vh;
  color: #F3D5BA; /* Vanila */
  font-family: 'Jersey 15', sans-serif;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  overflow-x: hidden;
}

/* Frame layout matching original tours page */
.frame {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  background-color: #171717; /* Dark Grey (BG) */
  min-height: 100vh;
  color: #F3D5BA; /* Vanila */
  font-family: 'Jersey 15', sans-serif;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  overflow-x: hidden;
}

.main-content {
  width: 100%;
  margin: 0 auto;
}

.top-nav {
  padding: 0 24px;
  margin-bottom: 24px;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #F3D5BA;
  font-family: 'Jersey 15';
  font-size: 16px;
  cursor: pointer;
  padding: 8px 12px;
}

.region-filter-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #171717;
}

.sticky-tabs {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #171717;
  padding: 0 24px 16px;
}

.tabs-container {
  display: flex;
  background: #001D62; /* Dark Blue */
  border-bottom: 4px solid #001D62;
}

.tab-btn {
  flex: 1;
  padding: 8px 16px;
  border: 4px solid #001D62;
  background: #001D62;
  color: #F3D5BA;
  font-family: 'Jersey 15';
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}

.tab-btn.active {
  background: #F3D5BA;
  color: #001D62;
}

.header-section {
  padding: 0 24px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.main-title, .title {
  font-family: 'Jersey 15', sans-serif;
  font-size: 3rem;
  line-height: 1.1;
  margin: 0;
  font-weight: normal; /* 🎯 Non-bold per user request */
}

.main-note, .subtitle {
  font-size: 1.4rem;
  line-height: 1.2;
  letter-spacing: 0.02em;
  color: #D6D6D6; /* Light Grey */
  margin: 0;
}

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

.tour-list {
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.item-title {
  font-size: 2rem;
  line-height: 1.1;
  margin: 0;
  font-weight: normal; /* 🎯 Non-bold per user request */
}

.add-list-btn {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  gap: 8px;
  background: none;
  border: 2px solid #C3DFF1;
  color: #C3DFF1;
  font-family: 'Jersey 15';
  font-size: 16px;
  cursor: pointer;
}

.add-list-btn.selected {
  border-color: #D18FA1;
  color: #D18FA1;
}

.item-desc {
  font-size: 1.2rem;
  line-height: 1.3;
  color: #D6D6D6;
  margin: 0 0 16px 0;
}

.spots-scrollbox {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 14px;
  scrollbar-width: thin;
  scrollbar-color: #656669 transparent;
}

.spots-scrollbox::-webkit-scrollbar {
  height: 8px;
}
.spots-scrollbox::-webkit-scrollbar-thumb {
  background: #656669;
  border-radius: 6px;
}

.flow-arrow {
  flex: 0 0 auto;
  align-self: center;
  color: #656669;
  font-size: 1.2rem;
  margin: 0 4px;
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
  height: 156px;
  overflow: hidden;
}

.spot-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spot-details {
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #001D62;
}

.spot-name {
  font-size: 1.1rem;
  line-height: 1.2;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.spot-ch {
  font-size: 0.9rem;
  line-height: 1;
}

.spot-brief {
  font-size: 0.85rem;
  line-height: 1.3;
  color: #656669;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tours-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 🎯 Content centered like original */
  width: 100%;
}
</style>
