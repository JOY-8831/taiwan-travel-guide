<template>
  <div class="page-layout">
    <ButtonBack />

    <Transition name="page-slide" mode="out-in">
      <main v-if="userStyles.length > 0" :key="currentStepIndex" class="frame">
        
        <div class="progress-bar">
          <span class="step-text">STYLE {{ currentStepIndex + 1 }} / {{ userStyles.length }}</span>
          <div class="progress-line">
            <div 
              class="fill" 
              :style="{ width: ((currentStepIndex + 1) / userStyles.length) * 100 + '%' }"/>
          </div>
        </div>

        <header class="page-header">
          <h1 class="pixel-title">📍 {{ currentCategoryName }}</h1>
          <p class="subtitle">Discovering spots that match your vibe.</p>
        </header>

        <section class="points-grid">
          <div 
            v-for="point in currentPoints" 
            :key="point.Code" 
            class="point-card"
            @click="selectedPoint = point" 
          >
            <div class="card-image-wrapper">
              <img 
                :src="`/images/${point.Code}.jpg`" 
                :alt="point.Name_EN" 
                class="card-img"
                @error="handleImageError"
              >
              <div class="card-overlay">
                <span class="view-more">VIEW DETAILS</span>
              </div>
            </div>
            <div class="card-info">
              <h3 class="point-name">{{ point.Name_EN }}</h3>
              <span class="city-tag">{{ point.City || 'Taiwan' }}</span>
            </div>
          </div>
        </section>

        <div class="nav-footer">
          <ButtonNext 
            :text="isLastStep ? 'Finish' : 'Next Style ›'" 
            type="next" 
            @click="handleNext" 
          />
        </div>
      </main>
    </Transition>

    <Transition name="fade">
      <div v-if="selectedPoint" class="modal-overlay" @click.self="selectedPoint = null">
        <div class="modal-content">
          <button class="close-btn" @click="selectedPoint = null">×</button>
          <img 
            :src="`/images/${selectedPoint.Code}.jpg`" 
            class="modal-img" 
            @error="handleImageError"
          >
          <div class="modal-body">
            <h2 class="modal-title">{{ selectedPoint.Name_EN }}</h2>
            <p class="modal-city">{{ selectedPoint.City }}</p>
            <div class="pixel-divider"/>
            <p class="modal-details">{{ selectedPoint.Details }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { wishes } from '~/assets/data/data.js'

// 1. 定義資料類型
interface Point {
  Code: string;
  Name_EN: string;
  Name_CH?: string;
  City: string;
  Details: string;
  Img_source: string;
}

// 2. 狀態定義
const userStyles = ref<string[]>([])
const currentStepIndex = ref(0)
const selectedPoint = ref<Point | null>(null)

// 3. 初始化載入資料
onMounted(() => {
  const saved = localStorage.getItem('userTravelStyles')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) {
        userStyles.value = parsed
      } else {
        navigateTo('/travel-style')
      }
    } catch {
      navigateTo('/travel-style')
    }
  } else {
    navigateTo('/travel-style')
  }
})

// 4. 計算屬性
const currentCategoryName = computed(() => {
  const code = userStyles.value[currentStepIndex.value];

  // 🎯 關鍵：如果 code 是 undefined，直接回傳預設值，不要去查表
  if (!code) return 'Taiwan';

  const nameMap: Record<string, string> = {
    'C': 'City Explorer',
    'N': 'Nature Adventurer',
    'M': 'Museums Enthusiast',
    'R': 'Relaxation Stroller'
  };

  return nameMap[code] || 'Taiwan';
});

const currentPoints = computed(() => {
  const target = userStyles.value[currentStepIndex.value]
  if (!target) return []

  // 🎯 嚴格篩選：只抓 P- 開頭且包含當前風格的資料
  return wishes.filter((item: Point) => {
    const segments = item.Code.split('-')
    const isPoint = segments[0] === 'P'
    const hasStyle = segments.slice(1).includes(target)
    return isPoint && hasStyle
  })
})

const isLastStep = computed(() => {
  return currentStepIndex.value >= userStyles.value.length - 1
})

// 5. 功能函式
const handleNext = () => {
  if (isLastStep.value) {
    localStorage.removeItem('userTravelStyles')
    navigateTo('/')
  } else {
    // 切換到下一個風格
    currentStepIndex.value++
    selectedPoint.value = null
    // 🎯 確保回到頁面頂部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// 🎯 處理圖片加載失敗 (JPG -> PNG -> Placeholder)
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  if (img.src.endsWith('.jpg')) {
    img.src = img.src.replace('.jpg', '.png')
  } else if (img.src.endsWith('.png')) {
    img.src = 'https://placehold.co/400x300?text=No+Image'
  }
}
</script>

<style scoped>
/* 基礎佈局 */
.page-layout {
  background-color: var(--vanilla);
  min-height: 100vh;
  padding: 20px;
}

.frame {
  max-width: 800px;
  margin: 0 auto;
}

/* 進度條樣式 */
.progress-bar {
  text-align: center;
  margin-bottom: 30px;
}
.step-text {
  font-family: "Jersey 15", sans-serif;
  color: var(--pink);
  font-size: 1.2rem;
}
.progress-line {
  height: 12px;
  background: white;
  border: 3px solid var(--dark_blue);
  margin-top: 8px;
  border-radius: 10px;
  overflow: hidden;
}
.fill {
  height: 100%;
  background: var(--pink);
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 標題樣式 */
.pixel-title {
  font-family: "Jersey 15", sans-serif;
  font-size: 2.8rem;
  color: var(--dark_blue);
  margin-bottom: 5px;
}

/* 網格佈局：Responsive Grid */
.points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

/* 卡片樣式 */
.point-card {
  background: white;
  border: 3px solid var(--dark_blue);
  box-shadow: 5px 5px 0px var(--dark_blue);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.point-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0px var(--dark_blue);
}

.card-image-wrapper {
  position: relative;
  height: 140px;
  background: #f0f0f0;
  border-bottom: 3px solid var(--dark_blue);
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.point-card:hover .card-overlay {
  opacity: 1;
}

.view-more {
  color: white;
  border: 2px solid white;
  padding: 4px 12px;
  font-family: "Jersey 15", sans-serif;
}

.card-info {
  padding: 12px;
}

.point-name {
  font-size: 1rem;
  margin: 0;
  color: var(--dark_blue);
  line-height: 1.2;
}

.city-tag {
  font-size: 0.8rem;
  color: #777;
  display: block;
  margin-top: 4px;
}

/* 彈窗樣式 */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.85);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-content {
  background: var(--vanilla);
  border: 4px solid var(--dark_blue);
  width: 100%;
  max-width: 480px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 10px; right: 10px;
  background: var(--pink);
  border: 3px solid var(--dark_blue);
  color: white;
  width: 35px; height: 35px;
  cursor: pointer;
  z-index: 10;
  font-size: 1.2rem;
}

.modal-img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-bottom: 4px solid var(--dark_blue);
  display: block;
}

.modal-body {
  padding: 25px;
}

.pixel-divider {
  height: 4px;
  background: var(--dark_blue);
  margin: 15px 0;
}

.modal-details {
  line-height: 1.6;
  white-space: pre-line;
  color: #333;
}

/* 分頁動畫 */
.page-slide-enter-active,
.page-slide-leave-active {
  transition: all 0.4s ease;
}
.page-slide-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.page-slide-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

/* 彈窗淡入動畫 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>