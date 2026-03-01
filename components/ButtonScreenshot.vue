<template>
  <button 
    class="btn-screenshot" 
    :disabled="isCapturing"
    @click="captureScreenshot"
  >
    <span v-if="!isCapturing">📸 Save the result</span>
    <span v-else>⏳ Capturing...</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  targetId: string
}>()

const isCapturing = ref(false)

const captureScreenshot = async () => {
  if (isCapturing.value) return
  isCapturing.value = true

  try {
    // Dynamically import html2canvas for better performance
    const html2canvas = (await import('html2canvas')).default
    const element = document.getElementById(props.targetId)
    
    if (!element) {
      console.error(`Element with id ${props.targetId} not found`)
      return
    }

    // Capture the element
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2, // Higher quality
      backgroundColor: '#f9f7f2', // Match page background
      logging: false,
    })

    // Convert to image and download
    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = image
    link.download = `taiwan-journey-${new Date().getTime()}.png`
    link.click()
  } catch (error) {
    console.error('Screenshot failed:', error)
    alert('Failed to capture screenshot. Please try again.')
  } finally {
    isCapturing.value = false
  }
}
</script>

<style scoped>
.btn-screenshot {
  background: white;
  color: var(--dark_blue);
  border: 4px solid var(--dark_blue);
  font-family: 'Jersey 15', sans-serif;
  font-size: 1.1rem;
  padding: 8px 24px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  height: 54px; /* Match ButtonNext height if possible */
}

.btn-screenshot:hover:not(:disabled) {
  background: var(--vanilla);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.btn-screenshot:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
