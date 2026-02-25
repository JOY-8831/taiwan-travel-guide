<template>
  <button
    :class="buttonClass"
    :disabled="disabled"
    :aria-pressed="ariaPressed"
    @click="handleClick"
  >
    <span class="btn-row">
      
      <span class="btn-text">
        <template v-if="prefix">{{ prefix }} </template>
        {{ text }}
      </span>

      <span v-if="showArrow" class="btn-icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 6l6 6-6 6" 
            stroke="currentColor" 
            stroke-width="2"
            stroke-linecap="round" 
            stroke-linejoin="round" 
          />
        </svg>
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string
  type?: 'option' | 'primary' | 'ok' | 'toggle'
  disabled?: boolean
  selected?: boolean
  showArrow?: boolean
  prefix?: string
}>()

const emit = defineEmits<{
  click: []
}>()

const buttonClass = computed(() => {
  const classes = []
  
  switch (props.type) {
    case 'ok':
      classes.push('ok_btn')
      break
    case 'toggle':
      classes.push('option-btn', 'is-toggle')
      break
    case 'primary':
      classes.push('option-btn', 'primary')
      break
    default:
      classes.push('option-btn')
  }
  
  return classes
})

const ariaPressed = computed(() => {
  if (props.type === 'toggle') {
    return props.selected ? 'true' : 'false'
  }
  return undefined
})


const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<style>
/* ========= OK Button =========== */
.ok_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 4px solid var(--pink);
  background: var(--dark_blue);
  padding: 16px 20px;
  color: var(--vanilla);
  font-size: clamp(18px, 4vw, 22px);
  cursor: pointer;
  font-family: "Jersey 15", Helvetica, Arial, sans-serif;
}

.ok_btn:hover {
  opacity: 0.9;
}
</style>