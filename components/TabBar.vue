<template>
  <div class="tabs-bar">
    <div class="region-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="tab-btn"
        :class="{ active: modelValue === tab.value }"
        @click="$emit('update:modelValue', tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tabs: Array<{ label: string; value: string }>
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style>

/* ========= Tabs =========== */
.tabs-bar {
  align-self: stretch;
  background: var(--dark_blue);
  border-radius: 8px;
  margin: 10px 0 10px;
}

.region-tabs {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 0;
}

.tab-btn {
  appearance: none;
  background: transparent;
  border: 0;
  color: var(--vanilla);
  cursor: pointer;
  font-size: clamp(20px, 5vw, 26px);
  line-height: 1.2;
  padding: 16px 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color .15s ease;
  font-family: "Jersey 15", Helvetica, Arial, sans-serif;
}

.tab-btn:hover {
  background: color-mix(in oklab, var(--vanilla) 12%, transparent);
}

.tab-btn.active {
  background: var(--vanilla);
  color: var(--dark_blue);
  border: 4px solid var(--dark_blue);
}

.region-list { 
  display: none; 
}

.region-list.active { 
  display: block; 
}
</style>