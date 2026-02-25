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
  padding: 20px 10px;
}

.timeline-item {
  display: flex;
  gap: 20px;
  margin-bottom: 30px; /* Increased margin for larger cards */
}

/* 左側樣式 */
.timeline-left {
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* 時間靠右對齊中心線 */
  flex-shrink: 0;
}

.era-time {
  font-family: "Jersey 15", sans-serif;
  font-size: 1.4rem; /* 字體加大 */
  color: var(--pink); /* 改成粉橘色 (Pink) */
  text-align: right;
  line-height: 1.2;
  margin-top: 15px; /* 對齊右邊框框的頂部 */
}

.timeline-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20px;
  margin-right: -10px; /* 讓線條靠近內容 */
  flex-grow: 1;
  margin-top: 5px;
}

.dot {
  width: 14px;
  height: 14px;
  background: var(--pink);
  border: 2px solid var(--dark_blue);
  margin: 5px 0;
  border-radius: 50%; /* 圓點 */
}

.arrow-down {
  color: var(--vanilla); /* Vanilla */
  font-size: 12px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  /* 畫出一條垂直虛線 */
  border-left: 2px dashed var(--vanilla); /* Vanilla */
  margin-left: 6px; /* 微調對齊圓點中心 */
  padding-bottom: 20px;
}

/* 右側樣式 */
.timeline-right {
  flex: 1;
  background: white;
  border: 2px solid var(--dark_blue);
  padding: 20px;
  box-shadow: 6px 6px 0px var(--dark_blue);
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* 加入過渡效果 */
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Hover 效果：滑鼠移入時放大 */
.timeline-item:hover .timeline-right {
  transform: scale(1.02);
  box-shadow: 8px 8px 0px var(--dark_blue);
  z-index: 10;
}

.era-title {
  margin: 0;
  font-size: 1.5rem; /* Increased title size */
  color: var(--dark_blue);
}

.era-desc {
  margin: 0;
  font-size: 1.2rem; /* 加大內文字體 */
  line-height: 1.4;
  color: #333;
}

/* 裝飾：讓標題看起來更像一個對話框或卡片 */
.timeline-right::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 20px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 12px solid var(--dark_blue);
}

/* Era image wrapper (Permanent) */
.era-image-wrapper {
  width: 100%;
  height: 250px; /* Large fixed height */
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

</style>