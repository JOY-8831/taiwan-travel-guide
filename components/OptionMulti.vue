<template>
  <button 
    class="option-multi-btn" 
    :class="{ 'is-selected': selected }"
    @click="$emit('toggle', value)"
  >
    <span class="btn-content">
      <span class="btn-prefix">{{ selected ? '●' : 'o' }}</span>
      <span class="btn-text">{{ label }}</span>
    </span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string
  selected: boolean
}>()

defineEmits<{
  toggle: [value: string]
}>()
</script>

<style scoped>
.option-multi-btn {
  /* 基礎重置 */
  appearance: none;
  display: block;
  width: 100%;
  margin-bottom: 6px;
  cursor: pointer;
  
  /* 🎯 關鍵：確保 padding 不會撐破框框 */
  box-sizing: border-box;
  
  /* 樣式設計 */
  padding: 10px 16px;
  border: 4px solid var(--dark_blue);
  background: var(--light_blue);
  color: var(--dark_blue);
  
  /* 字體 */
  font-family: "Jersey 15", Helvetica, Arial, sans-serif;
  font-size: clamp(18px, 4vw, 22px);
  text-align: left;
  transition: all 0.2s ease;
}

/* 🎯 Flex 佈局確保文字垂直居中且不跑版 */
.btn-content {
  display: flex;
  align-items: center;
  gap: 12px; /* 符號與文字的間距 */
}

.btn-prefix {
  flex-shrink: 0;
  font-family: monospace; /* 讓 o 和 ● 的寬度一致，對齊更整齊 */
  font-weight: bold;
}

.btn-text {
  flex-grow: 1;
  line-height: 1.2;
}

/* 🖱️ 滑鼠懸停效果 */
.option-multi-btn:hover {
  background: #e0f2fe; /* 稍微變深一點的藍 */
}

/* ✨ 選中後的樣式 (粉紅色) */
.option-multi-btn.is-selected {
  background: var(--pink);
  border-color: var(--dark_blue);
  /* 如果想要選中時文字稍微變色也可以加在這裡 */
}

/* 點擊時的縮放感 */
.option-multi-btn:active {
  transform: scale(0.98);
}
</style>