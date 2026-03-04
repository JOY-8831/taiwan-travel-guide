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
      backgroundColor: '#171717', // Match new dark page background
      logging: false,
    })

    // Convert to Blob for better mobile support
    canvas.toBlob(async (blob) => {
      if (!blob) return
      
      const fileName = `taiwan-journey-${new Date().getTime()}.png`
      const file = new File([blob], fileName, { type: 'image/png' })

      // Try Web Share API (Mobile standard)
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'My Taiwan Journey',
            text: 'Check out my planned trip to Taiwan!'
          })
          return // Success via share
        } catch (err) {
          console.log('Share failed, falling back to download', err)
        }
      }

      // Fallback: Direct download
      const image = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = image
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(image)
    }, 'image/png')
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
