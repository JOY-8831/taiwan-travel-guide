<template>
  <div id="halalfood" class="page-layout">
    <ButtonBack />
    <main class="frame">
      <QuestionBox
        title="☪️ Halal-Certified Choices"
        description="Taiwan is becoming increasingly Muslim-friendly. Here are some excellent Halal-certified options for you to enjoy."
        note="✦ Click the cards for details ✦"
      />
      
      <section class="eat_list">
        <div class="wishcard-grid">
          <WishCard
            v-for="item in halalList"
            :key="item.Code"
            :item="item"
          />
        </div>
      </section>
      
      <div class="button-container">
        <ButtonNext
          :text="nextButtonText"
          type="next"
          @click="goNext"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFavorites } from '~/composables/useFavorites'

const router = useRouter()
const { getMustEatList, loadData } = useFavorites()

const halalList = computed(() => {
  const list = getMustEatList.value || []
  return list.filter(item => item.Code && item.Code.startsWith("F-M-"))
})

const getNextPage = (): string => {
  const saved = localStorage.getItem('userDietStyles')
  const dietOrder = ['C', 'V', 'S', 'M']
  const routeMap: Record<string, string> = {
    'C': '/meat',
    'V': '/veggie',
    'S': '/seafood',
    'M': '/halalfood'
  }

  if (saved) {
    const selected = JSON.parse(saved) as string[]
    const currentIndex = dietOrder.indexOf('M')
    for (let i = currentIndex + 1; i < dietOrder.length; i++) {
        const nextDiet = dietOrder[i];
        if (nextDiet && selected.includes(nextDiet)) {
            const nextRoute = routeMap[nextDiet];
            if (nextRoute) return nextRoute;
        }
    }
  }
  return '/result'
}

const nextButtonText = computed(() => {
    return getNextPage() === '/menu' ? 'Back to Menu' : 'Next Category >'
})

const goNext = () => {
  router.push(getNextPage())
}

onMounted(async () => {
  await loadData()
})
</script>

<style scoped>
</style>
