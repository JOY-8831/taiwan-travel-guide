<template>
    <article class="wish-card" v-bind="$attrs" @click="openModal">
        <h3 class="card-topic">
            {{ nameEN }}
            <span v-if="nameCH && showCH" class="ch-name">CH: {{ nameCH }}</span>
        </h3>
        <HeartButton
            :active="isFav"
            @toggle="toggleFavorite(item)"
        />
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
           <HeartButton
                :active="isFav"
                @toggle="toggleFavorite(item)"
            />
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
                <!-- <p class="source-label">Find the closest ones to me:</p> -->
                <a 
                    :href="googleMapsUrl" 
                    target="_blank" 
                    class="source-name"
                >
                    Find the nearby ones on Google Map
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="external-link-icon">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                </a>
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
            @click="closeModal()"
        />
        </div>
    </div>
</div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFavorites } from '~/composables/useFavorites'
import HeartButton from './HeartButton.vue'

const config = useRuntimeConfig()
const baseURL = config.app.baseURL

const props = withDefaults(defineProps<{
    item: {
        Code: string;
        Name_EN?: string;
        Name_CH?: string;
        City?: string;
        Details?: string;
        Img_source?: string;
        Lat?: number;
        Lng?: number;
    };
    showCH?: boolean;
}>(), {
    showCH: true
})

const { isFavorite, toggleFavorite } = useFavorites()

// --- Google Maps URL with Coordinate Bias ---
const googleMapsUrl = computed(() => {
    // 🎯 Use specific item coordinates if available, otherwise fallback to Taipei Main Station
    const lat = props.item.Lat || 25.0478
    const lng = props.item.Lng || 121.4
    
    // 🎯 Add City to query for better search results
    const query = `${nameEN.value}${props.item.City ? ', ' + props.item.City : ''}`
    
    // 🎯 Using @lat,lng,zoom to bias results to Taiwan and prevent global/US view
    // 🎯 Zoom 11z provides a broader view (approx 20km) per user request
    return `https://www.google.com.tw/maps/search/${encodeURIComponent(query)}/@${lat},${lng},11z`
})

// --- 圖片載入狀態與邏輯 ---
const defaultImage = ref(`${baseURL}images/fallback.jpg`)
// 追蹤當前嘗試的副檔名，初始為 .jpg
const currentImageExt = ref('.jpg')
// 🎯 根據 item.Code 和當前副檔名計算圖片路徑
const imageSrc = computed(() => {
    const code = props.item.Code;
    // 第一次總是嘗試 currentImageExt (預設是 .jpg)
    const path = `${baseURL}images/${code}${currentImageExt.value}`;
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
    font-size: 1.5rem; /* 🎯 Adjusted to 1.5rem per user request */
    font-weight: normal; /* 🎯 Not bold per user request */
    color: var(--vanilla);
    margin: 0 0 10px 0; /* 🎯 Added bottom margin for spacing to image */
    line-height: 1;
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
    font-size: 1.8rem; /* Increased to 1.8rem per user request */
    font-weight: normal; /* 🎯 Not bold per user request */
    color: var(--dark_blue);
    margin: 0;
    line-height: 1;
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
    padding: 10px 15px; /* 🎯 Adjusted padding per user request */
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
    border-radius: 0; /* 🎯 Removed rounded corners per user request */
    border: none; /* 🎯 Removed border per user request */
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
    font-size: 1.1rem; /* Matched to source-name */
    line-height: 1.4;
    letter-spacing: 0.02em;
    color: var(--blue); /* #5C8AA7 */
    font-weight: normal; /* Removed bold */
}

.source-name {
    /* Updated font to Jersey 15 per user request */
    font-family: 'Jersey 15', sans-serif;
    font-size: 1.1rem; /* Slightly larger for readability */
    line-height: 1.4;
    letter-spacing: 0.02em;
    text-decoration-line: underline;
    color: var(--blue);
    font-weight: normal; /* Removed bold */
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.external-link-icon {
    flex-shrink: 0;
    margin-top: -2px; /* Slight adjustment for alignment with Jersey 15 */
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
    line-height: 1; /* 🎯 Set to 1 per user request */
}

.modal-description p {
    margin: 0 0 5px 0; /* 讓段落之間有小間距 */
    line-height: 1.2; /* 🎯 Updated line-height per user request */
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
    line-height: 1;
    color: var(--dark_blue); /* 確保文字顏色正確 */
}
</style>
