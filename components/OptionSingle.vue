<template>
  <button class="option-btn" @click="$emit('select')">
    {{ text }} 
  </button>
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>()

// 🎯 關鍵修正：定義 select 事件，讓父元件可以監聽
defineEmits<{
  select: [] 
}>()
</script>