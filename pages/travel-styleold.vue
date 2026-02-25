<template>
  <div id="travel-style" class="page-layout">
    <ButtonBack />

    <main class="frame">
      <QuestionBox
        title="🎒 Choose your travel style!"
        description="You've just landed in a brand-new destination. Select your travelling styles (Multi-select)."
        note=""
      />
      
      <section class="options">
        <OptionMulti
          v-for="option in options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
          :selected="selectedInterests.has(option.value)"
          @toggle="toggleInterest(option.value)"
        />

        <ButtonNext
          :text="canContinue ? 'Continue' : `Select ${1 - selectedInterests.size} more`"
          type="next"
          :disabled="!canContinue"
          @click="handleContinue" 
        /> 
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const options = [
  { label: 'City explorer', value: 'C' },
  { label: 'Nature adventurer', value: 'N' },
  { label: 'Museums enthusiast', value: 'M' },
  { label: 'Relaxation stroller', value: 'R' }
]

const selectedInterests = ref(new Set<string>())

// 1. 頁面載入時，先去 localStorage 看看有沒有選過的紀錄
onMounted(() => {
  // 1. 強制清空，確保起始點是 0
  selectedInterests.value.clear();

  const saved = localStorage.getItem('userTravelStyles');
  
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      
      if (Array.isArray(parsed)) {
        // 🎯 核心修正：只允許有效的代號進來，過濾掉任何空值、null 或長度不對的垃圾
        const validOptions = ['C', 'N', 'M', 'R'];
        const cleanData = parsed.filter(item => validOptions.includes(item));

        if (cleanData.length > 0) {
          selectedInterests.value = new Set(cleanData);
          console.log("✅ 成功載入有效資料:", cleanData);
        } else {
          console.log("⚠️ 發現無效資料，已自動清空");
          localStorage.removeItem('userTravelStyles');
        }
      }
    } catch {
      localStorage.removeItem('userTravelStyles');
    }
  }
   
  console.log("當前 Set 大小:", selectedInterests.value.size);
});

const canContinue = computed(() => {
  return selectedInterests.value.size > 0;
});

const toggleInterest = (value: string) => {
  console.log("當前 Set 大小:", selectedInterests.value.size); // 👈 看這裡
  if (selectedInterests.value.has(value)) {
    selectedInterests.value.delete(value);
  } else {
    selectedInterests.value.add(value);
  }
  
  // 🎯 關鍵動作：重新賦值一個新的 Set，強制觸發 Vue 的反應機制
  selectedInterests.value = new Set(selectedInterests.value);
}
const handleContinue = () => {
  // 🎯 這是最重要的防線：如果 size 是 0，這整個函式什麼都不做
  if (selectedInterests.value.size === 0) {
    console.warn("尚未選擇任何風格！");
    return;
  }

  const selectedArray = Array.from(selectedInterests.value);
  
  // 檢查是否真的抓到了有效的代號，防止裡面只有空字串
  if (selectedArray.length > 0 && selectedArray[0] !== "") {
    localStorage.setItem('userTravelStyles', JSON.stringify(selectedArray));
    navigateTo('/points');
  }
};
</script>

<style scoped>
/* 頁面基礎佈局 */
.page-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: var(--vanilla); /* 根據你的變數設定背景 */
}

.frame {
  width: 100%;
  max-width: 500px; /* 限制寬度讓手機與電腦版都好看 */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

/* 確保 ButtonNext 能夠在容器中正確對齊 */
:deep(.ok_btn) {
  margin-top: 20px;
  align-self: center; /* 讓 OK 按鈕水平置中 */
}
</style>