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
      
      <section class="social-links">
        <p>📸 Follow Joy's "Sketch Journeys" on IG <a href="https://www.instagram.com/joyishere.meetup" target="_blank">@joyishere.meetup</a> and <a href="https://halfgeographer.wordpress.com/" target="_blank">website</a></p>
        <p>🎨 Find more designs by Kathleen on <a href="https://kathleen-design.framer.website/" target="_blank">kathleen-design.framer.website</a></p>
      </section>

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
  background-color: #171717; /* Dark Grey (BG) */
  min-height: 100vh;
  color: #F3D5BA; /* Vanila */
  font-family: 'Jersey 15', sans-serif;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  overflow-x: hidden;
}

.header-section {
  padding: 0 24px;
  text-align: center;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  font-family: 'Jersey 15', sans-serif;
  font-size: 3rem;
  line-height: 1.1;
  margin: 0;
  font-weight: normal;
}

.subtitle {
  font-size: 1.4rem;
  line-height: 1.2;
  letter-spacing: 0.02em;
  color: #D6D6D6; /* Light Grey */
  margin: 0;
}

.video-container {
  width: calc(100% - 48px);
  aspect-ratio: 16 / 9;
  max-width: 650px;
  margin: 0 auto;
  border: 8px solid #001D62; /* Dark Blue border */
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}

.social-links {
  text-align: center;
  margin: 10px auto;
  font-family: 'Jersey 15', sans-serif;
  font-size: 1.4rem;
  color: #F3D5BA;
  line-height: 1.4;
  padding: 0 24px;
}

.social-links p {
  margin: 8px 0;
}

.social-links a {
  color: #D18FA1; /* Pink */
  text-decoration: underline;
}

.social-links a:hover {
  color: #5C8AA7; /* Modern Blue */
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 5px;
  padding: 0 24px;
}
</style>
