<template>
  <div id="meat" class="page-layout">
    <ButtonBack />
    <main class="frame">
      <QuestionBox
        title="🥩 Meat Dishes You'll Love!"
        description="Here are some of the most popular meat-based dishes in Taiwan. From slow-braised pork rice to world-famous beef noodles."
        note="✦ Click the cards for details ✦"
      />
      
      <section class="eat_list">
        <div class="wishcard-grid">
          <WishCard
            v-for="item in meatList"
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

const meatList = computed(() => {
  const list = getMustEatList.value || []
  return list.filter(item => item.Code && item.Code.startsWith("F-C-"))
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
    const currentIndex = dietOrder.indexOf('C')
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
