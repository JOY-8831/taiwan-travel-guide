<template>
  <div id="start" class="page active" @click="enterGame">
    
    <div class="video-background">
      <video autoplay muted loop playsinline>
        <source src="/images/start_video.mp4" type="video/mp4">
      </video>
    </div>

    <div class="build-your-taiwan">
      <p>. . . . . . . . . . . . . .</p>
      <p>Build Your <br> Taiwan Journey</p>
      <p>. . . . . . . . . . . . . .</p>
    </div>

    <p>Touch to start</p>

  </div>
</template>

<script setup lang="ts">
// 💡 Nuxt 最佳實踐：移除手動導入 useRouter 和 useHead
// const router = useRouter() 和 useHead() 會被自動導入

const router = useRouter()

const enterGame = () => {
  // 使用 router.push 導航
  router.push('/menu')
}

// 設定頁面 Meta 資料 (SEO)
useHead({
  title: 'Build Your Taiwan - Start',
  meta: [
    { name: 'description', content: 'A quiz game to build your perfect Taiwan itinerary' }
  ]
})
</script>


<style scoped>
/* ========= Start Page =========== */
#start.active {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
}

#start {
  height: 100%;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

.video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.video-background video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.build-your-taiwan { 
  margin: 0;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 0.02em var(--vanilla);
  font-size: clamp(48px, 12vw, 80px); 
  letter-spacing: 0.02em;
  line-height: 0.9;
  font-family: "Jersey 15", Helvetica, Arial, sans-serif;
}

#start p {
  font-size: clamp(1.6rem, 5vw, 2.2rem);
  font-family: "Jersey 15", Helvetica, Arial, sans-serif;
}

</style>