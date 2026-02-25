<template>
  <div id="result-page" class="page-layout">
    <ButtonBack @click="router.push('/must-eat')" />

    <main class="frame">
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
  background-color: #f9f7f2;
}

.result-section {
  margin-bottom: 30px; /* 🎯 Reduced from 50px */
}

.tour-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tour-item {
  background: white;
  padding: 15px;
  border-radius: 12px;
  border: 2px solid var(--dark_blue);
  box-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tour-name {
  font-family: 'Jersey 15', sans-serif;
  font-size: 1.5rem;
  color: var(--dark_blue);
  margin: 0;
}

.tour-desc {
  color: #555;
  margin: 0;
  font-size: 1.1rem;
}

.tour-spots {
  margin-top: 5px;
  padding-top: 10px;
  border-top: 1px dashed #eee;
}

.spots-label {
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--pink);
  display: block;
  margin-bottom: 5px;
}

.spots-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 15px;
}

.spot-item-mini {
  font-size: 0.95rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;
}

.spot-item-mini .ch-name {
  font-size: 0.85rem;
  color: #999;
}

.no-results {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 12px;
  border: 2px dashed #ccc;
  color: #999;
}

</style>
