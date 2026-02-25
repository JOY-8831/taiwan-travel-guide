<template>
    <article class="wish-card" v-bind="$attrs" @click="openModal">
        <h3 class="card-topic">
            {{ nameEN }}
            <span v-if="nameCH && showCH" class="ch-name">CH: {{ nameCH }}</span>
        </h3>
        <button
        class="heart-btn"
        type="button"
        :aria-pressed="isFav ? 'true' : 'false'"
        :aria-label="isFav ? 'Remove from favorites' : 'Add to favorites'"
        @click.stop.prevent="toggleFavorite(item)"
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
        <div class="card-image-wrapper">
            <img
            :src="imageSrc"
            :alt="nameEN"
            class="card-image"
            loading="lazy"
            @error="handleImageError"
            >
        </div>
    </article>

<div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
        <div class="modal-header">
            <h2 class="modal-title">
                {{ nameEN }}
                <span v-if="nameCH && showCH" class="ch-name">CH: {{ nameCH }}</span>
            </h2>
            <template v-if="item.City && !item.Code.startsWith('P-') && !item.Code.startsWith('F-')">
                <span class="modal-city">({{ item.City }})</span>
            </template>
           <button
            class="heart-btn"
            type="button"
            :aria-pressed="isFav ? 'true' : 'false'"
            :aria-label="isFav ? 'Remove from favorites' : 'Add to favorites'"
            @click.stop.prevent="toggleFavorite(item)"
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
        </div>

        <div class="modal-body">
            <div class="modal-image-wrapper">
                <img
                    :src="imageSrc"
                    :alt="nameEN"
                    class="modal-image"
                    @error="handleImageError"
                >
            </div>

            <div class="modal-source-info">
                <p class="source-label">Image source:</p>
                <p class="source-name">交通部觀光署</p>
            </div>

            <div class="modal-details">
                <div class="modal-description">
                    <p v-if="structuredDetails.preface.length > 0">{{ structuredDetails.preface }}</p>
                    <p class="example-label">{{ structuredDetails.exampleTag }}</p>
                    <ul>
                        <li v-for="(item, index) in structuredDetails.listItems" :key="index">
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>

            <ButtonOk
            text="ok!"
            type="ok"
            @click=closeModal()
        />
        </div>
    </div>
</div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFavorites } from '~/composables/useFavorites'

const props = withDefaults(defineProps<{
    item: {
        Code: string;
        Name_EN?: string;
        Name_CH?: string;
        City?: string;
        Details?: string;
        Img_source?: string;
    };
    showCH?: boolean;
}>(), {
    showCH: true
})

const { isFavorite, toggleFavorite } = useFavorites()

// --- 圖片載入狀態與邏輯 ---
const defaultImage = ref('/images/fallback.jpg')
// 追蹤當前嘗試的副檔名，初始為 .jpg
const currentImageExt = ref('.jpg')
// 🎯 根據 item.Code 和當前副檔名計算圖片路徑
const imageSrc = computed(() => {
    const code = props.item.Code;
    // 第一次總是嘗試 currentImageExt (預設是 .jpg)
    const path = `/images/${code}${currentImageExt.value}`;
    // console.log(`[WishCard DEBUG] Generated Image Path: ${path}`);
    return path;
})

// 🎯 修正 handleImageError 函數，實現嘗試邏輯
const handleImageError = (event: Event) => {
    const target = event.target as HTMLImageElement

    if (currentImageExt.value === '.jpg') {
        // 第一次失敗：從 .jpg 切換到 .png，並強制重新載入圖片
        currentImageExt.value = '.png'
        console.warn(`Image failed with .jpg for ${props.item.Code}. Retrying with .png.`);

    } else if (currentImageExt.value === '.png') {
        // 第二次失敗 (png也失敗)：切換到預設圖片，並防止再次觸發錯誤
        target.src = defaultImage.value
        currentImageExt.value = '' // 清空以防止無限循環
        console.error(`Image failed with .png for ${props.item.Code}. Using default placeholder.`);
    }
}

// --- 資訊顯示與計算 ---
const isFav = computed(() => isFavorite(props.item.Code))
const nameEN = computed(() => {
    return (props.item.Name_EN || props.item.Code).replace('(Taiwan)', '').trim()
})
const nameCH = computed(() => props.item.Name_CH)

// 🎯 模態框狀態
const showModal = ref(false)

const openModal = () => {
    showModal.value = true
    // 鎖定 body 滾動 (可選，提供更好的 UX)
    document.body.style.overflow = 'hidden'
    // 重設圖片嘗試狀態，確保每次打開 modal 都從 .jpg 開始嘗試
    currentImageExt.value = '.jpg';
}

const closeModal = () => {
    showModal.value = false
    document.body.style.overflow = '' // 解鎖 body 滾動
}

// --- 🎯 結構化詳細資訊邏輯 (取代 v-html) ---
const structuredDetails = computed(() => {
    const details = props.item.Details;
    if (!details) {
        return { preface: '', exampleTag: '', listItems: [] };
    }

    const exampleRegex = /(Examples?:)/i;
    const match = details.match(exampleRegex);

    if (!match) {
        // 如果沒有找到 Examples:，將所有內容視為 preface
        return { preface: details, exampleTag: '', listItems: [] };
    }

    const [exampleTag] = match;
    const tagIndex = details.indexOf(exampleTag);

    const preface = details.substring(0, tagIndex).trim();
    const examplesRaw = details.substring(tagIndex + exampleTag.length).trim();

    // 處理舉例列表：使用句號和空格來分隔項目
    let listItems = examplesRaw
        .split(/[.]\s/)
        .map(item => item.trim())
        .filter(item => item.length > 0);


    if (listItems.length > 0) {
        // 確保列表項目有適當的結束標點
        listItems = listItems.map(item => {
            let finalItem = item;
            // 如果項目不以句號、問號或感嘆號結尾，則補上句號
            if (finalItem.length > 0 && !/[.?!]$/.test(finalItem)) {
                finalItem += '.';
            }
            return finalItem;
        });

        // 如果原始字串以句號結尾，且 listItems 的最後一項被 split 掉了句號，則補回
        if (examplesRaw.endsWith('.')) {
             const lastIndex = listItems.length - 1;
             const lastItem = listItems[lastIndex];
             // 再次檢查是否已經有句號，避免重複
             if (lastItem && !lastItem.endsWith('.')) {
                 listItems[lastIndex] += '.';
             }
        }
    }

    return {
        preface: preface,
        exampleTag: exampleTag,
        listItems: listItems
    };
});


</script>

<style scoped>
/* ================== 主卡片樣式 ================== */
.wish-card {
    position: relative;
    border: 4px solid var(--dark_blue);
    background: var(--blue); /* 🎯 Reverted to blue */
    padding: 12px; /* 🎯 Horizontal padding requested */
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
    transition: transform 0.15s ease-out;
    display: flex;
    flex-direction: column;
}

.wish-card:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.card-image-wrapper {
    width: 100%;
    flex-grow: 1;
    aspect-ratio: 4 / 3;
    overflow: hidden;
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card-topic {
    font-family: 'Jersey 15', sans-serif;
    font-size: 1.5rem; /* 🎯 Reduced to avoid heart button collision */
    font-weight: normal; /* 🎯 Not bold per user request */
    color: var(--vanilla);
    margin: 0 0 10px 0; /* 🎯 Added bottom margin for spacing to image */
    line-height: 1.1;
    text-align: left; /* 🎯 Left aligned per user request */
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.card-details {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    color: #444;
    margin: 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 🎯 Truncate to 2 lines */
    -webkit-box-orient: vertical;
    line-clamp: 2;
    overflow: hidden;
}

.modal-title {
    font-family: 'Jersey 15', sans-serif;
    font-size: 2.5rem;
    font-weight: normal; /* 🎯 Not bold per user request */
    color: var(--dark_blue);
    margin: 0;
    line-height: 1.1;
    text-align: left; /* 🎯 Left aligned per user request */
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.ch-name {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: normal;
    opacity: 0.8; /* 🎯 Reverted to subtle transparency */
}

.modal-header .ch-name {
    color: var(--dark_blue);
    opacity: 0.7;
    font-size: 1.2rem;
}

/* ================== 愛心按鈕 (微調) ================== */
.heart-btn {
    color: var(--vanilla); /* 🎯 Reverted to vanilla */
    background-color: transparent;
    position: absolute; /* 固定在卡片右上角 */
    top: 6px;
    right: 6px;
    z-index: 10;
    border: none;
    padding: 4px;
    cursor: pointer;
    transition: all 0.2s;
}

/* 這是針對空心愛心 (icon-outline) 內的圖形元素 */
.icon-outline rect {
    fill: currentColor; /* 💡 關鍵: 強制使用父層 (button) 的 color 值 */
}

/* ================== 懸浮模態框樣式 (背景) ================== */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8); /* 半透明黑色背景 */
    z-index: 9000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

/* ================== 懸浮模態框樣式 (卡片本身) ================== */
.modal-content {
    background: var(--vanilla); /* 淺色背景 */
    border: 8px solid var(--dark_blue);
    flex-direction: column;
    max-width: 600px;
    width: 100%;
    max-height: 90vh; /* 限制高度在視窗內 */
    overflow: hidden; /* 🎯 Fix: Hide overflow on the main container, let body scroll if needed */
    position: relative;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
}


/* ======= 懸浮卡片標題 ======= */
.modal-header {
    background: var(--blue);
    color: var(--vanilla);
    padding: 15px 40px; /* 🎯 Unified horizontal padding */
    position: relative;
}

.modal-city {
    margin: 0 0 10px 0;
    font-size: 1.2rem;
}

/* ======= 懸浮卡片圖片與圖說 ======= */
.modal-body {
    background: var(--vanilla); 
    color: var(--dark_blue);
    flex-grow: 1;
    overflow-y: auto; 
    /* 🎯 模擬 Frame 73 的 Auto Layout */
    display: flex;
    flex-direction: column;
    font-size: 22;  /* 1.2rem; */
    line-height: 1.6;
    padding: 20px 40px; /* 🎯 Unified horizontal padding */
    gap: 8px; /* 🎯 模擬 Frame 73 的間距 */
}

/* ------------------- 圖片區塊 (模擬 Component 1) ------------------- */
.modal-image-wrapper {
    width: 100%;
    height: 300px; /* 🎯 Maintain improved height */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-radius: 12px; /* 🎯 Add rounded corners for a framed look */
    border: 2px solid var(--dark_blue); /* 🎯 Add subtle border to define the image */
}

.modal-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 🎯 Fill the wider container edge-to-edge */
}

/* ------------------- 圖片來源 (模擬 Frame 76) ------------------- */
.modal-source-info {
    /* 🎯 模擬 Frame 76 的 Flex row 佈局 */
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px; /* 🎯 模擬 Frame 76 的間距 */
    width: 100%; /* 確保佔滿寬度 */
    background: none; /* 移除藍色背景 */
    border: none;
    padding: 0; /* 🎯 Fix: Removed redundant padding as it is now on modal-body */
    margin-top: 4px;
}

.modal-source-info p {
    margin: 0;
}

.source-label {
    font-size: 14px; /* 🎯 Fix: Increase font size */
    line-height: 1.4;
    letter-spacing: 0.02em;
    color: var(--blue); /* #5C8AA7 */
}

.source-name {
    /* Ch-Context-S (jf-openhuninn-2.1, 10px, Blue, Underline) */
    font-family: 'jf-openhuninn-2.1';
    font-size: 14px; /* 🎯 Fix: Increase font size */
    line-height: 1.4;
    letter-spacing: 0.02em;
    text-decoration-line: underline;
    /* 這邊應該要改成url吧 */
    color: var(--blue); /* #5C8AA7 */
}

/* ------------------- 說明區塊 ------------------- */
.modal-details {
    flex-grow: 1;
    overflow: hidden; /* 防止內容溢出 */
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    font-size: 1.2rem; /* 調大細節文字，例如 20px */
    line-height: 1.6;  /* 增加行距，閱讀更舒服 */
}

.modal-description {
    overflow-y: auto;   /* 讓說明內容可以滾動 */
    flex-grow: 0; 
    letter-spacing: 0.02em;
    color: var(--dark_blue);
    padding-right: 5px; /* 防止滾動條擋住文字 */
}

.modal-description p {
    margin: 0 0 5px 0; /* 讓段落之間有小間距 */

}

.modal-description .example-label {
    margin-bottom: 0;
    font-weight: bold; /* 讓 Examples: 標籤更突出 */
}

.modal-description ul {
    /* 保持瀏覽器預設的 list-style-type: disc (圓點) */
    list-style-type: disc; 
    
    /* 調整左邊距，讓點點有空間顯示 */
    padding-left: 20px; 
    margin: 5px 0 10px 0;
}

.modal-description li {
    margin-bottom: 5px; 
    line-height: 1.4;
    color: var(--dark_blue); /* 確保文字顏色正確 */
}
</style>
