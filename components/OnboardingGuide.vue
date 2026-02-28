<template>
  <ClientOnly>
    <div class="onboarding-container" @click.stop>
      <!-- Background Overlay with Cut-out -->
      <div 
        class="onboarding-overlay" 
        :style="overlayStyle"
      ></div>

      <!-- Instruction Box -->
      <div 
        ref="boxRef"
        class="guide-box" 
        :style="boxStyle"
      >
        <div class="guide-content">
          <p class="guide-text">{{ currentStepText }}</p>
        </div>
        
        <div class="guide-footer">
          <button class="custom-got-it" @click="nextStep">Got it!</button>
        </div>
        
        <!-- Arrow pointing to target -->
        <div class="guide-arrow" :class="arrowClass" :style="arrowStyle"></div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

const props = defineProps<{
  steps: { text: string; target: string; position?: 'top' | 'bottom' | 'left' | 'right' | 'center' }[]
}>()

const emit = defineEmits<{
  complete: []
}>()

const currentIndex = ref(0)
const targetRect = ref<DOMRect | null>(null)
const boxRef = ref<HTMLElement | null>(null)

const currentStepText = computed(() => props.steps?.[currentIndex.value]?.text || '')

const updatePosition = () => {
  const step = props.steps?.[currentIndex.value]
  if (!step) return

  const el = document.querySelector(step.target)
  if (el) {
    const rect = el.getBoundingClientRect()
    // 🎯 Only set if rect has non-zero size/position to avoid top-left glitch
    if (rect.width > 0 || rect.height > 0) {
      targetRect.value = rect
    } else {
      // Retry in a bit if zero (maybe rendering hasn't finished)
      setTimeout(updatePosition, 100)
    }
  } else {
    targetRect.value = null
    // Retry finding element if not found yet (async data loading)
    setTimeout(updatePosition, 200)
  }
}

const nextStep = () => {
  if (currentIndex.value < props.steps.length - 1) {
    currentIndex.value++
    // Position will update via watch
  } else {
    emit('complete')
  }
}

onMounted(() => {
  updatePosition()
  window.addEventListener('resize', updatePosition)
  window.addEventListener('scroll', updatePosition)
})

onUnmounted(() => {
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition)
})

watch(currentIndex, () => {
  nextTick(updatePosition)
})

const overlayStyle = computed(() => {
  if (!targetRect.value) return { backgroundColor: 'rgba(0,0,0,0.7)' }
  
  const { top, left, width, height } = targetRect.value
  const centerX = left + width/2
  const centerY = top + height/2
  const radius = Math.max(width, height) / 1.5
  
  return {
    backgroundColor: 'transparent',
    backgroundImage: `radial-gradient(circle at ${centerX}px ${centerY}px, transparent ${radius}px, rgba(0,0,0,0.7) ${radius + 5}px)`
  }
})

const boxStyle = computed(() => {
  const step = props.steps?.[currentIndex.value]
  const pos = step?.position || 'bottom'

  if (!targetRect.value || pos === 'center') {
    return {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      position: 'fixed' as const
    }
  }
  
  const { top, left, width, height } = targetRect.value
  
  let bTop = 0
  let bLeft = 0
  let transform = ''
  
  if (pos === 'bottom') {
    bTop = top + height + 20
    bLeft = left + width/2
    transform = 'translateX(-50%)'
  } else if (pos === 'top') {
    bTop = top - 180 // Simple estimate, can be refined
    bLeft = left + width/2
    transform = 'translateX(-50%)'
  } else if (pos === 'right') {
    bTop = top + height/2
    bLeft = left + width + 20
    transform = 'translateY(-50%)'
  } else if (pos === 'left') {
    bTop = top + height/2
    bLeft = left - 280
    transform = 'translateY(-50%)'
  }
  
  // Basic bounds checking for left/right
  if (pos === 'top' || pos === 'bottom') {
    bLeft = Math.max(140, Math.min(window.innerWidth - 140, bLeft))
  }

  return {
    top: `${bTop}px`,
    left: `${bLeft}px`,
    transform,
    position: 'fixed' as const
  }
})

const arrowClass = computed(() => props.steps[currentIndex.value]?.position || 'bottom')

const arrowStyle = computed(() => {
  const pos = props.steps[currentIndex.value]?.position || 'bottom'
  if (!targetRect.value || !boxRef.value || pos === 'center') return { display: 'none' }
  
  const { top, left, width, height } = targetRect.value
  
  if (pos === 'top' || pos === 'bottom') {
    const bLeft = parseInt(boxStyle.value.left || '0')
    const offset = (left + width/2) - bLeft
    return {
      left: `calc(50% + ${offset}px)`, // Adjust based on transition
      display: 'block'
    }
  } else if (pos === 'right') {
    return {
      left: '-14px',
      top: '50%',
      transform: 'translateY(-50%) rotate(90deg)',
      display: 'block'
    }
  } else if (pos === 'left') {
    return {
      right: '-14px',
      top: '50%',
      transform: 'translateY(-50%) rotate(-90deg)',
      display: 'block'
    }
  }
  
  return { display: 'none' }
})
</script>

<style scoped>
.onboarding-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  pointer-events: auto;
}

.onboarding-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background-image 0.3s ease;
}

.guide-box {
  background: var(--vanilla);
  border: 4px solid var(--dark_blue);
  width: 260px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  animation: pop-in 0.3s ease-out;
  z-index: 10001;
}

.guide-text {
  font-family: 'Jersey 15', sans-serif;
  font-size: 1.3rem;
  color: var(--dark_blue);
  line-height: 1.3;
  text-align: left;
  margin: 0;
}

.guide-footer {
  display: flex;
  justify-content: flex-start;
}

.custom-got-it {
  background: var(--dark_blue);
  color: var(--vanilla);
  border: 4px solid var(--dark_blue);
  font-family: 'Jersey 15', sans-serif;
  font-size: 1.1rem;
  padding: 4px 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.custom-got-it:hover {
  background: var(--pink);
  color: white;
}

.guide-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}

.guide-arrow.bottom {
  top: -14px;
  border-bottom: 10px solid var(--dark_blue);
}

.guide-arrow.top {
  bottom: -14px;
  border-top: 10px solid var(--dark_blue);
}

@keyframes pop-in {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
