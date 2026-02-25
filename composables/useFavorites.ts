import { useState } from '#app' // Nuxt 3 的 useState 應從 #app 導入
import { onMounted, readonly, ref, computed } from 'vue'
import { wishes, foods } from '@/assets/data/data.js'

export interface WishItem {
  Code: string; // 用作唯一ID
  Name_EN?: string;
  Name_CH?: string;
  City?: string;
  Details?: string;
  Img_source?: string;
  Special?: string;
}

export const useFavorites = () => {
  // --- 狀態定義 (useState, ref) ---
  const favoriteIds = useState<string[]>('favorites', () => [])
  const favoriteTitles = useState<Record<string, string>>('favoriteTitles', () => ({}))
  const allMustSeeData = ref<WishItem[]>([])
  const allMustEatData = ref<WishItem[]>([])
  const isDataLoaded = ref(false)

  // --- 輔助函式 1: 取得顯示名稱 ---
  const getDisplayName = (item: WishItem): string => {
    const en = item.Name_EN?.trim() || ''
    const ch = item.Name_CH?.trim() || ''
    if (en && ch) return `${en} / ${ch}`
    return en || ch || item.Code
  }

  // --- 輔助函式 2: 本地儲存 ---
  const persist = () => {
    if (import.meta.client) {
      localStorage.setItem('favorites', JSON.stringify(favoriteIds.value))
      localStorage.setItem('favoriteTitles', JSON.stringify(favoriteTitles.value))
    }
  }

  // --- 核心功能 1: 檢查是否已收藏 ---
  const isFavorite = (id: string): boolean => {
    return favoriteIds.value.includes(id)
  }

  // --- 核心功能 2: 切換收藏狀態 (新增實現邏輯) ---
  const toggleFavorite = (item: WishItem) => {
    const id = item.Code
    const idx = favoriteIds.value.indexOf(id)

    if (idx === -1) {
      // 收藏：新增 ID 和標題
      favoriteIds.value.push(id)
      favoriteTitles.value[id] = getDisplayName(item)
    } else {
      // 取消收藏：移除 ID 並刪除標題
      favoriteIds.value.splice(idx, 1)
      const { [id]: _, ...rest } = favoriteTitles.value
      favoriteTitles.value = rest // 將新物件賦值回響應式狀態
    }
    persist() // 儲存到本地
  }

  // --- 核心功能 3: 新增 loadData 函式 ---
  const loadData = async () => {
    if (isDataLoaded.value) return;

    // 現在這裡可以找到 allMustSeeData
    allMustSeeData.value = wishes as WishItem[];
    allMustEatData.value = foods as WishItem[];
    isDataLoaded.value = true;
    console.log("Must See & Eat Data loaded from static file.");
  }

  // --- 生命週期: 載入 localStorage ---
  onMounted(() => {
    if (import.meta.client) {
      const stored = localStorage.getItem('favorites')
      const storedTitles = localStorage.getItem('favoriteTitles')
      if (stored) favoriteIds.value = JSON.parse(stored)
      if (storedTitles) favoriteTitles.value = JSON.parse(storedTitles)
    }
  })

  // --- Computed 屬性 ---
  const getMustSeeList = computed(() => {
    return allMustSeeData.value
  })

  const getMustEatList = computed(() => {
    return allMustEatData.value
  })

  // --- 最終回傳 (修正語法錯誤) ---
  return {
    favoriteIds: readonly(favoriteIds),
    favoriteTitles: readonly(favoriteTitles),
    isFavorite,
    toggleFavorite, // ✅ 修正：直接回傳函式變數名稱
    getMustSeeList,
    getMustEatList,
    loadData
  }
}