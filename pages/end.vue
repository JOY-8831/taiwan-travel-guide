<template>
  <div id="end-page" class="page-layout">
    <ButtonBack @click="router.push('/result')" />

    <main class="frame">
      <header class="header-section">
        <h1 class="title">🎬 Words from the Web Creators</h1>
        <p class="subtitle">Do you need a personal tour guide?</p>
      </header>

      <div class="video-container">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/I453nllWJQY"
          title="Taiwan Tourism Video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>

      <div class="button-container">
        <ButtonNext
          text="Continue to Contact"
          type="next"
          @click="router.push('/email')"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>
#end-page {
  background-color: #f9f7f2;
}

.header-section {
  text-align: center; /* Override global left */
  margin-bottom: 20px;
}

.video-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  max-width: 650px; /* 🎯 Slightly smaller to fit on one screen */
  margin: 0 auto;
  border: 4px solid var(--dark_blue);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 10px 10px 0px rgba(0,0,0,0.1);
}


</style>
