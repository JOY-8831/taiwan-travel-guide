<!-- pages/must-see2_1.vue -->
<template>
  <div id="must_see" class="page-layout">
    <ButtonBack />
    <ClientOnly>
      <OnboardingGuide 
        v-if="showGuide" 
        :steps="onboardingSteps"
        @complete="handleGuideComplete" 
      />

      <main class="frame" :class="{ 'is-locked': showGuide }">
        <QuestionBox
          title="Places you must go in Taiwan!"
          description="Here are 4 must-visit places in Taiwan. Simply search them on Google Maps to find the nearest locations. We’ve also highlighted some of the most famous ones for you"
          note="✦ Click the cards to view details ✦"      
        />
        
        <section id="see_list">
          <div class="wishcard-grid">
            <WishCard
              v-for="(item, index) in mustSeeList"
              :id="index === 0 ? 'first-wish-card' : undefined"
              :key="item.Code"
              :item="item"
              :show-c-h="false"
            />
          </div>
        </section>
        
        <ButtonNext
          text="Let's get more specific >"
          type="next"
          @click="navigateTo('/travel-style')"
        />
      </main>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue' 
import { useFavorites } from '~/composables/useFavorites' 

const { getMustSeeList, loadData } = useFavorites()

const showGuide = ref(false)

const onboardingSteps = [
  { text: "Wish cards can be expanded to see more details.", target: "#first-wish-card", position: 'center' as const },
  { text: "Click the heart button to save your favorites for later!", target: "#first-wish-card .heart-btn", position: 'bottom' as const }
]

// 篩選 P-E 開頭的 4 個核心體驗點位
const mustSeeList = computed(() => {
    // 加上安全檢查，確保 getMustSeeList.value 存在
    const list = getMustSeeList.value || []
    return list.filter(item => item.Code && item.Code.startsWith("P-E-"))
})

onMounted(async () => {
    await loadData() 
    showGuide.value = true
})

const handleGuideComplete = () => {
    showGuide.value = false
    // We can keep setting it, but it's no longer used for preventing showing
    localStorage.setItem('onboarding_must_see_done', 'true')
}
</script>


<style scoped>
.is-locked {
  pointer-events: none; /* Disable all clicks while guide is active */
  user-select: none;
}
</style>