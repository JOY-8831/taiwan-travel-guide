<template>
  <div id="about_taiwan" class="page-layout bg-start">
    <ButtonBack />

    <main class="frame">
      <QuestionBox
        title="📜 History of Taiwan"
        description="A brief journey through the timeline of Taiwan, from its indigenous roots to the modern democracy we know today."
      />

      <section class="timeline-container">
        <div 
          v-for="(era, index) in historyEras" 
          :key="index" 
          class="timeline-item"
        >
          <div class="timeline-left">
            <div class="era-time">{{ era.time }}</div>
            <div class="timeline-line">
              <div class="dot" />
              <div v-if="index !== historyEras.length - 1" class="arrow-down">▼</div>
            </div>
          </div>

          <div class="timeline-right">
            <h3 class="era-title">{{ era.title }}</h3>
            <p class="era-desc">{{ era.description }}</p>
            
            <!-- Era image (Permanently visible and larger) -->
             <div class="era-image-wrapper">
                <img :src="era.image ? `${baseURL}${era.image.startsWith('/') ? era.image.substring(1) : era.image}` : `${baseURL}images/fallback.jpg`" alt="Era Preview" />
             </div>
          </div>
        </div>
      </section>

      <!-- Removed global hover-image-container -->
      <section class="options">
        <OptionSingle
          text="› Back to Menu"
          @click="navigateTo('/menu')"
        />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const historyEras = [
  {
    time: "Pre-17th C.",
    title: "Indigenous Era",
    description: "The original inhabitants of Taiwan, with diverse Austronesian cultures and languages, living in harmony with nature for thousands of years.",
    image: "/images/indigenous.jpg" 
  },
  {
    time: "17th C.",
    title: "Age of Discovery",
    description: "From the 16th century onwards, Portuguese navigators called the island Formosa, which later became another name for Taiwan. Dutch and Spanish colonial powers established outposts in Taiwan for trade, marking the island's entry into the global maritime network.",
    image: "/images/discovery.jpg"
  },
  {
    time: "1662 - 1895",
    title: "Kingdom of Tungning & Qing Dynasty",
    description: "Koxinga (鄭成功) established the first Han Chinese regime, followed by over two centuries of Qing rule, seeing significant migration and agricultural development.",
    image: "/images/qing.jpg"
  },
  {
    time: "1895 - 1945",
    title: "Japanese Rule",
    description: "A period of modernization in infrastructure, education, and industry, which also left a lasting impact on Taiwan's urban landscape and culture.",
    image: "/images/japanese.jpg"
  },
  {
    time: "1945 - Now",
    title: "Post-War & Republic of China",
    description: "The transition from martial law to a vibrant democracy and global tech hub, shaping the multicultural and resilient society we see today.",
    image: "/images/modern.jpg"
  }
];

// No need for global hover state anymore

const config = useRuntimeConfig()
const baseURL = config.app.baseURL
</script>

<style scoped>
/* 覆蓋默認置中樣式，改成從上方開始貼齊 (為了解決 RWD 截斷問題) */
#about_taiwan.page-layout {
  padding-top: 60px;
  padding-bottom: 120px; /* 增加底部距離，避免被 footer 擋住 */
  height: auto !important; /* 允許內容撐開高度，不要固定 100vh */
  min-height: 100vh;
}



.timeline-container {
  padding: 20px 6px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
}

/* 左側樣式 (現在是頂部時間) */
.timeline-left {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  margin-bottom: 10px;
}

.era-time {
  font-family: "Jersey 15", sans-serif;
  font-size: 1.6rem;
  color: var(--vanilla);
  text-align: center;
  line-height: 1.2;
}

.timeline-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 5px;
}

.dot {
  width: 14px;
  height: 14px;
  background: var(--pink);
  border: 2px solid var(--dark_blue);
  border-radius: 50%;
}

.arrow-down {
  display: none; /* Hide arrow in new vertical flow */
}

/* 右側樣式 (主要內容區塊) */
.timeline-right {
  width: 100%;
  background: var(--vanilla);
  border: 2px solid var(--dark_blue);
  padding: 20px;
  box-shadow: 6px 6px 0px var(--dark_blue);
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: var(--dark_blue);
}

.era-title {
  margin: 0;
  font-size: 1.5rem;
  color: var(--dark_blue);
  text-align: center;
}

.era-desc {
  margin: 0;
  font-size: 1.2rem;
  line-height: 1;
  color: var(--dark_blue);
  text-align: center;
}

/* Era image wrapper (Consistent width and height) */
.era-image-wrapper {
  width: 100%;
  height: 250px;
  border-radius: 8px;
  overflow: hidden;
  border: 3px solid var(--dark_blue);
  background: #eee;
}

.era-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 600px) {
  #about_taiwan.page-layout {
    padding-top: 40px;
  }

  .timeline-container {
    padding: 10px 6px;
  }

  .era-time {
    font-size: 1.4rem;
  }

  .timeline-right {
    padding: 15px;
    box-shadow: 4px 4px 0px var(--dark_blue);
  }

  .era-title {
    font-size: 1.3rem;
  }

  .era-desc {
    font-size: 1.1rem;
  }

  .era-image-wrapper {
    height: 200px;
  }
}
</style>