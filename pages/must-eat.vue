<template>
  <div id="must_eat" class="page-layout">
  <ButtonBack />
    <main class="frame">
      <QuestionBox
        title="Foods you must try in Taiwan!"
        description="Here are 7 must-try foods in Taiwan. From breakfast to night markets, these are the flavors that define Taiwanese cuisine."
        note="✦ Click the cards to view details ✦"      
      />
      
      <section id="eat_list">
        <div class="wishcard-grid">
          <WishCard
            v-for="item in mustEatList"
            :key="item.Code"
            :item="item"
          />
        </div>
      </section>
      
      <div class="button-container">
        <ButtonNext
          text="Next! What do you eat?"
          type="next"
          @click="navigateTo('/diet')"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useFavorites } from '~/composables/useFavorites' 

const { getMustEatList, loadData } = useFavorites()

// Filter F-E items (Core Experiences for Food)
const mustEatList = computed(() => {
    const list = getMustEatList.value || []
    return list.filter(item => item.Code && item.Code.startsWith("F-E-"))
})

onMounted(async () => {
    await loadData() 
})
</script>

<style scoped>
/* Reuse styles from must-see.vue */



</style>