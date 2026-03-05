<template>
  <button 
    class="add-list-btn" 
    :class="{ selected: active }"
    type="button"
    @click.stop="$emit('toggle')"
  >
    <span class="btn-text">{{ active ? 'In your list' : 'Add to list' }}</span>
    <svg width="14" height="12" viewBox="0 0 16 14" fill="none" class="heart-icon-small">
      <path 
        d="M8 14L6.85 12.85C2.75 9.15 0 6.65 0 3.6C0 1.6 1.6 0 3.6 0C4.75 0 5.85 0.55 6.55 1.4C7.25 0.55 8.35 0 9.5 0C11.5 0 13.1 1.6 13.1 3.6C13.1 6.65 10.35 9.15 6.25 12.85L8 14Z" 
        :fill="active ? '#D18FA1' : 'none'" 
        :stroke="active ? '#D18FA1' : '#C3DFF1'" 
        stroke-width="2"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  active: boolean
}>()

defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<style scoped>
.add-list-btn {
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  gap: 8px;
  width: auto;
  min-width: 110px; /* Slightly adjusted for stability */
  height: 32px;
  background: transparent;
  border: 2px solid #C3DFF1;
  color: #C3DFF1;
  font-family: 'Jersey 15', sans-serif;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.02em;
  white-space: nowrap;
  outline: none;
  flex: none;
}

.add-list-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(195, 223, 241, 0.2);
}

.add-list-btn.selected {
  border-color: #D18FA1;
  color: #D18FA1;
}

.add-list-btn.selected:hover {
  box-shadow: 0 2px 8px rgba(209, 143, 161, 0.2);
}

.btn-text {
  line-height: 1;
}

.heart-icon-small {
  width: 14px;
  height: 12px;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.add-list-btn:active {
  transform: scale(0.95);
}

.add-list-btn.selected .heart-icon-small {
  transform: scale(1.1);
}
</style>
