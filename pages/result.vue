<template>
  <div id="result-page" class="page-layout">
    <ButtonBack @click="router.push('/must-eat')" />

    <main id="result-content" class="frame">
      <header class="header-section">
        <h1 class="title">🎉 Your Taiwan Journey</h1>
        <p class="subtitle">Here’s a summary of everything you’ve picked for your trip!</p>
      </header>

      <!-- Selected Tours Section -->
      <section v-if="selectedToursData.length > 0" class="result-section">
        <h2 class="section-title">🗺️ Selected Tours</h2>
        <div class="tour-list">
          <div v-for="tour in selectedToursData" :key="tour.id" class="tour-item">
            <h3 class="tour-name">{{ tour.title }}</h3>
            <p class="tour-desc">{{ tour.description }}</p>
            
            <!-- Spots Listing for each tour -->
            <div class="tour-spots">
              <span class="spots-label">Included spots:</span>
              <ul class="spots-list">
                <li v-for="code in tour.pointCodes" :key="code" class="spot-item-mini">
                  {{ getPointInfo(code).Name_EN }}
                  <span class="ch-name">(CH: {{ getPointInfo(code).Name_CH }})</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Favorite Spots Section -->
      <section v-if="favoriteSpots.length > 0" class="result-section">
        <h2 class="section-title">📍 Favorite Spots</h2>
        <div class="wishcard-grid">
          <WishCard
            v-for="item in favoriteSpots"
            :key="item.Code"
            :item="item"
          />
        </div>
      </section>

      <!-- Favorite Food Section -->
      <section v-if="favoriteFood.length > 0" class="result-section">
        <h2 class="section-title">🍲 Must-Eat Food</h2>
        <div class="wishcard-grid">
          <WishCard
            v-for="item in favoriteFood"
            :key="item.Code"
            :item="item"
          />
        </div>
      </section>

      <div v-if="isEmpty" class="no-results">
        <p>You haven't picked anything yet! Go back and explore more.</p>
      </div>

      <div class="button-container">
        <ButtonScreenshot targetId="result-content" />
        <ButtonNext
          text="Next: Watch a Video!"
          type="next"
          @click="router.push('/end')"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFavorites } from '~/composables/useFavorites'
import { tours } from '~/assets/data/data.js'
import ButtonScreenshot from '~/components/ButtonScreenshot.vue'

const router = useRouter()
const { getMustSeeList, getMustEatList, loadData, favoriteIds } = useFavorites()

const selectedToursData = ref<any[]>([])

onMounted(async () => {
  await loadData()
  
  // Load Selected Tours
  const savedTours = localStorage.getItem('selectedTours')
  if (savedTours) {
    try {
      const ids = JSON.parse(savedTours) as string[]
      selectedToursData.value = tours.filter(t => ids.includes(t.id))
    } catch (e) {
      console.error("Error parsing selected tours", e)
    }
  }
})

const favoriteSpots = computed(() => {
  return getMustSeeList.value.filter(item => favoriteIds.value.includes(item.Code))
})

const favoriteFood = computed(() => {
  return getMustEatList.value.filter(item => favoriteIds.value.includes(item.Code))
})

const getPointInfo = (code: string) => {
  const allWishes = [...getMustSeeList.value, ...getMustEatList.value];
  const found = allWishes.find(w => w.Code === code);
  return found || { Name_EN: 'Unknown Spot', Name_CH: '未知' };
}

const isEmpty = computed(() => {
  return selectedToursData.value.length === 0 && 
         favoriteSpots.value.length === 0 && 
         favoriteFood.value.length === 0
})
</script>

<style scoped>
#result-page {
  background-color: #171717; /* Dark Grey (BG) */
  min-height: 100vh;
  color: #F3D5BA; /* Vanila */
  font-family: 'Jersey 15', sans-serif;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  overflow-x: hidden;
}

.result-section {
  padding: 0 24px;
}

.section-title {
  font-family: 'Jersey 15', sans-serif;
  font-size: 2rem;
  line-height: 1.1;
  font-weight: normal;
  color: #F3D5BA;
}

.header-section {
  padding: 0 24px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
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

.tour-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.tour-item {
  background: #C3DFF1; /* Light Blue for contrast */
  padding: 20px;
  border-radius: 12px;
  border: 4px solid var(--dark_blue);
  box-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: #001D62; /* Dark Blue text on Light Blue card */
}

.tour-name {
  font-family: 'Jersey 15', sans-serif;
  font-size: 1.8rem;
  line-height: 1;
  margin: 0;
  font-weight: normal;
}

.tour-desc {
  font-size: 1.1rem;
  line-height: 1.3;
  color: #001D62;
  margin: 0;
}

.tour-spots {
  padding-top: 12px;
  border-top: 2px dashed rgba(0, 29, 98, 0.2);
}

.spots-label {
  font-weight: bold;
  font-size: 1rem;
  color: #D18FA1; /* Pink */
  display: block;
  margin-bottom: 8px;
}

.spots-list {
  list-style: disc;
  padding-left: 20px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.spot-item-mini {
  font-size: 1rem;
  color: #001D62;
}

.spot-item-mini .ch-name {
  font-size: 0.9rem;
  opacity: 0.7;
}

.wishcard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.no-results {
  text-align: center;
  padding: 40px 24px;
  color: #D6D6D6;
  font-size: 1.4rem;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 48px;
  padding: 0 24px;
  flex-wrap: wrap;
}

@media print {
  .button-container {
    display: none;
  }
}
</style>
