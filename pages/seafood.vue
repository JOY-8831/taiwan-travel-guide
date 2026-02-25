<template>
  <div id="seafood" class="page-layout">
    <ButtonBack />
    <main class="frame">
      <QuestionBox
        title="🐟 Fresh from the Ocean"
        description="Being an island, Taiwan offers incredibly fresh seafood. Whether grilled at a night market or served in a hot soup."
        note="✦ Click the cards for details ✦"
      />
      
      <section class="eat_list">
        <div class="wishcard-grid">
          <WishCard
            v-for="item in seafoodList"
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

const seafoodList = computed(() => {
  const list = getMustEatList.value || []
  return list.filter(item => item.Code && item.Code.startsWith("F-S-"))
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
    const currentIndex = dietOrder.indexOf('S')
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
