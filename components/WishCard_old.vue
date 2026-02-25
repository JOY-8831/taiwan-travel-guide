<template>
  <article class="option_wish" :data-id="item.Code">
    <details>
      <summary class="option_row">
        <span class="row-icon" aria-hidden="true">
          <img src="/images/expand_arrow.svg" alt="">
        </span>
        <div class="card_topic">
          {{ displayName }}
          <template v-if="item.City">（{{ item.City }}）</template>
        </div>
        <button
          class="heart-btn"
          type="button"
          :aria-pressed="isFav ? 'true' : 'false'"
          :aria-label="isFav ? 'Remove from favorites' : 'Add to favorites'"
          @click.stop.prevent="toggleFavorite"
        >
        <svg v-show="!isFav" width="32" height="32" viewBox="0 0 16 14" aria-hidden="true" class="icon-outline">
          <g>
            <rect x="8.70996" y="1.45158" width="1.45166" height="1.45166" />
            <rect x="10.1616" y="0.000137329" width="1.45166" height="1.45166" />
            <rect x="11.6133" y="0.000137329" width="1.45166" height="1.45166" />
            <rect x="13.0649" y="0.000137329" width="1.45166" height="1.45166" />
            <rect x="7.2583" y="2.90349" width="1.45166" height="1.45166" />
            <rect x="5.80664" y="1.45158" width="1.45166" height="1.45166" />
            <rect x="4.3551" y="0.000137329" width="1.45166" height="1.45166" />
            <rect x="2.90344" y="0.000137329" width="1.45166" height="1.45166" />
            <rect x="1.45178" y="0.000137329" width="1.45166" height="1.45166" />
            <rect x="14.5166" y="1.45158" width="1.45166" height="1.45166" />
            <rect x="14.5166" y="2.90349" width="1.45166" height="1.45166" />
            <rect x="14.5166" y="4.35493" width="1.45166" height="1.45166" />
            <rect x="13.0649" y="5.80638" width="1.45166" height="1.45166" />
            <rect x="11.6133" y="7.25829" width="1.45166" height="1.45166" />
            <rect x="10.1616" y="8.71021" width="1.45166" height="1.45166" />
            <rect x="8.70996" y="10.1617" width="1.45166" height="1.45166" />
            <rect x="0.00012207" y="1.45158" width="1.45166" height="1.45166" />
            <rect x="0.00012207" y="2.90349" width="1.45166" height="1.45166" />
            <rect x="0.00012207" y="4.35493" width="1.45166" height="1.45166" />
            <rect x="2.90344" y="7.25829" width="1.45166" height="1.45166" />
            <rect x="1.45178" y="5.80638" width="1.45166" height="1.45166" />
            <rect x="4.3551" y="8.71021" width="1.45166" height="1.45166" />
            <rect x="5.80664" y="10.1617" width="1.45166" height="1.45166" />
            <rect x="7.2583" y="11.6136" width="1.45166" height="1.45166" />
          </g>
        </svg>
          
        <svg v-show="isFav" width="32" height="32" viewBox="0 0 20 16" aria-hidden="true" class="icon-filled">
          <g>
            <rect x="10.6667" y="1.77771" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="12.4446" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="14.2222" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="16" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="8.88892" y="3.55566" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="7.11108" y="1.77771" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="5.3335" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="3.55566" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="1.77783" y="0.000133514" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="1.77783" y="1.77797" width="5.33325" height="5.33301" fill="#D18FA1"/>
            <rect x="12.4446" y="1.77797" width="5.33325" height="5.33301" fill="#D18FA1"/>
            <rect x="7.11108" y="3.55526" width="5.33325" height="8.88916" fill="#D18FA1"/>
            <rect x="17.7778" y="1.77771" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="17.7778" y="3.55566" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="17.7778" y="5.33338" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="16" y="7.11109" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="14.2222" y="8.8888" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="12.4446" y="10.6668" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="10.6667" y="12.4445" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect y="1.77771" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect y="3.55566" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect y="5.33338" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="3.55542" y="8.88881" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="5.33325" y="8.88881" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="5.33325" y="7.11097" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="12.4443" y="7.11097" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="12.4443" y="8.88875" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="14.2224" y="7.11097" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="1.77783" y="7.11097" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="3.55542" y="7.11097" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="5.3335" y="10.6668" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="7.11108" y="12.4445" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="8.88892" y="14.2223" width="1.77778" height="1.77778" fill="#D18FA1"/>
            <rect x="8.88892" y="12.4445" width="1.77778" height="1.77778" fill="#D18FA1"/>
          </g>
        </svg>
      </button>
      </summary>
      <div class="option-details">
        <img 
          :src="imageSrc" 
          :alt="displayName"
          @error="handleImageError"
        >
        <div class="option-details-content">
          <p>{{ formattedDetails.description }}</p>
          <ul v-if="formattedDetails.listItems.length > 0">
            <li v-for="(line, index) in formattedDetails.listItems" :key="index">
              {{ line }}
            </li>
          </ul>
        </div>
      </div>
    </details>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue' 
import { useFavorites } from '~/composables/useFavorites'
import type { WishItem } from '~/composables/useFavorites' 

const props = defineProps<{
  item: WishItem
}>()

// 1. 取得核心工具函式
const { isFavorite, toggleFavorite: toggle } = useFavorites()
const imageSrc = ref(`/images/${props.item.Code}.jpg`)

const displayName = computed(() => {
  const en = props.item.Name_EN?.trim() || ''
  const ch = props.item.Name_CH?.trim() || ''
  if (en && ch) return `${en} / ${ch}`
  return en || ch || props.item.Code
})

const formattedDetails = computed(() => {
  const detailsContent = props.item.Details ?? ''
  const parts = detailsContent.split(/Examples:/i)
  const description = parts[0]!.trim()
  const listItems = parts[1]
    ? parts[1]
      .split('\n')
      .map((s: string) => s.trim())
      .filter(Boolean)
    : []
  return { description, listItems }
})

// 2. 🎯 在這裡定義 isFav (Computed Property)
const isFav = computed(() => {
    const code = props.item.Code // 假設 Code 存在
    if (!code) return false
    return isFavorite(code)
})

// 3. 處理點擊事件
const toggleFavorite = (event: Event) => {
    event.stopPropagation()
    event.preventDefault()
    toggle(props.item) // 將當前 item 傳給 Hook
}

// 4. 確保在模板中這樣使用它：
// :aria-pressed="isFav ? 'true' : 'false'"

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  if (target.src.endsWith('.jpg')) {
    target.src = `/images/${props.item.Code}.png`
  } else if (target.src.endsWith('.png')) {
    target.src = `/images/${props.item.Code}.jpeg`
  } else {
    target.src = '/images/fallback.jpg'
  }
}

</script>

<style scoped>
/* ========= Wish Cards =========== */
.section_title {
  margin: 16px 0 12px;
  color: var(--vanilla);
  padding: 8px 6px;
  font-size: clamp(1.3rem, 5vw, 1.6rem);
  line-height: 1.2;
  font-family: "Jersey 15", Helvetica, Arial, sans-serif;
}

.option_wish {
  border: 4px solid var(--dark_blue);
  background: var(--blue);
  margin: 12px 0;
  /* 🎯 修正1: 確保容器不會因為內容而意外撐大 */
  max-width: 100%; 
  box-sizing: border-box;
}

/* ========= Summary (點擊展開的那一列) =========== */
.option_wish summary {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 12px;
  /* 🎯 修正2: 加入 box-sizing 防止 padding 撐爆寬度 */
  box-sizing: border-box; 
  padding: 10px 14px;
  cursor: pointer;
  user-select: none;
  width: 100%; /* 確保佔滿容器 */
}

.option_wish summary::-webkit-details-marker { 
  display: none; 
}

/* ========= Row (行內佈局) =========== */
.option_row {
  display: flex;
  gap: 12px;
  align-items: center;
  /* 🎯 修正3: 這裡只要 flex: 1 即可，不要寫 width: 100%，會導致雙重寬度計算溢出 */
  flex: 1; 
  min-width: 0; /* 關鍵：允許 Flex 子元素收縮 */
  color: var(--vanilla);
}

.row-icon {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  transform-origin: center;
  transition: transform .18s ease;
  flex-shrink: 0; /* 禁止圖標縮小 */
}

details[open] .row-icon { 
  transform: rotate(180deg); 
}

.option-details {
  padding: 14px 16px 18px;
  background: var(--vanilla);
  color: var(--dark_blue);
  font-size: clamp(17px, 4vw, 19px);
  line-height: 1.6;
  font-family: "Jersey 15", Helvetica, Arial, sans-serif;
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.option-details img {
  width: 40%;
  max-width: 200px;
  height: auto;
  max-height: 250px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}


.option-details-content {
  flex: 1;
  min-width: 0;
}

.option-details p {
  margin: 0 0 12px 0;
}

.option-details ul {
  margin: 0;
  padding-left: 20px;
}

.option-details li {
  margin-bottom: 8px;
  line-height: 1.5;
}

/* ========= Heart Button =========== */
.heart-btn {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: var(--vanilla);
  flex-shrink: 0; /* 防止收縮 */
  margin-left: auto; /* 與文字保持間距 */
  display: flex;
  align-items: center;
}
.heart-btn svg {
  display: block;
  width: 32px;
  height: 32px;
}
.heart-btn svg rect {
  fill: currentColor;
  transition: fill 0.2s ease;
}

/* 實心狀態：按鈕顏色變為粉色 */
.heart-btn[aria-pressed="true"] {
  color: var(--pink);
}

.heart-btn:hover { 
  transform: scale(1.1); 
}

.heart-btn:active { 
  transform: scale(0.95s); 
}

</style>