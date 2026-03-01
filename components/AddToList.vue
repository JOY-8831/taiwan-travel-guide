<template>
  <button 
    class="add-to-list-btn" 
    :class="{ 'active': active }"
    @click.stop="$emit('toggle')"
  >
    {{ active ? 'In your list' : 'Add to list' }}
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
.add-to-list-btn {
  background: var(--dark_blue);
  color: var(--vanilla);
  border: 4px solid var(--dark_blue);
  font-family: 'Jersey 15', sans-serif;
  font-size: 1.1rem;
  padding: 4px 16px;
  cursor: pointer;
  transition: background 0.3s, border-color 0.3s, color 0.3s; /* Narrowed transition */
  border-radius: 20px;
  line-height: 1;
  white-space: nowrap;
  min-width: 140px; /* 🎯 Stablize width to prevent "jumping" */
  text-align: center;
  user-select: none; /* 🎯 Prevent text selection on rapid clicks */
}

.add-to-list-btn:hover {
  background: var(--pink);
  border-color: var(--pink);
  color: white;
}

.add-to-list-btn.active {
  background: var(--pink);
  border-color: var(--dark_blue);
  color: white;
}

.add-to-list-btn.active:hover {
  background: var(--dark_blue);
  border-color: var(--dark_blue);
  color: var(--vanilla);
}
</style>
