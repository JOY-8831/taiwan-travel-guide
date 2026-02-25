<template>
  <button
    v-if="show"
    id="backBtn"
    :class="['back-btn', { 'is-dark': dark }]"
    aria-label="Go back"
    @click="goBack"
  >
    &lt; Back
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps<{
  dark?: boolean
}>()

const router = useRouter()
const route = useRoute()

const show = computed(() => route.path !== '/')

const goBack = () => {
  router.back()
}
</script>

<style scoped>

.back-btn {
  position: fixed;
  top: 18px;
  left: 18px;
  z-index: 9999;
  background: transparent;
  color: var(--vanilla);
  border: none;
  cursor: pointer;
  font-size: clamp(20px, 5vw, 24px);

}

.back-btn:hover {
  color: white;
}

.back-btn.is-dark {
  color: var(--dark_blue);
}

.back-btn.is-dark:hover {
  color: var(--pink);
}
</style>