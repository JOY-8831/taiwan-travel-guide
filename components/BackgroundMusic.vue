<script setup lang="ts">
const isPlaying = ref(false)
const audioRef = ref<HTMLAudioElement | null>(null)

// Placeholder music URL (Royalty-free forest music)
const musicUrl = 'https://cdn.pixabay.com/audio/2022/03/10/audio_c89c8a94ee.mp3'
const trackName = 'Whispers of the Bamboo Grove'

const toggleMusic = () => {
  if (!audioRef.value) return
  
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play().catch(e => {
      console.warn("Autoplay blocked or audio error:", e)
    })
  }
  isPlaying.value = !isPlaying.value
}

onMounted(() => {
  // Try to play if previously playing or just as default
  // Note: Most browsers block autoplay without interaction
})
</script>

<template>
  <div class="music-player">
    <audio 
      ref="audioRef" 
      :src="musicUrl" 
      loop 
      preload="auto"
    ></audio>
    
    <button 
      class="music-toggle" 
      :class="{ playing: isPlaying }"
      @click="toggleMusic"
      title="Toggle Background Music"
    >
      <span v-if="isPlaying">🎵</span>
      <span v-else>🔇</span>
    </button>
  </div>
</template>

<style scoped>
.music-player {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

.music-toggle {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 3px solid var(--dark_blue);
  background: var(--vanilla);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 4px 4px 0px var(--dark_blue);
  transition: all 0.2s ease;
}

.music-toggle:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px var(--dark_blue);
}

.music-toggle:active {
  transform: translate(2px, 2px);
  box-shadow: 0px 0px 0px var(--dark_blue);
}

.music-toggle.playing {
  background: var(--pink);
}

@media (max-width: 600px) {
  .music-player {
    bottom: 15px;
    right: 15px;
  }
  
  .music-toggle {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
}
</style>
