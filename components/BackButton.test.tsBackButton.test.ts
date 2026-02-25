import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BackButton from './ButtonBack.vue'

// 核心：模擬 Nuxt/Vue Router 的 composables
// 確保當元件呼叫 useRouter() 和 useRoute() 時，返回的是我們控制的 Mock 函式

// 建立模擬的 useRoute 函式
const mockRoute = (path: string) => {
  return vi.fn(() => ({
    path: path,
    // 您可以根據需要模擬其他屬性，但這裡只需要 path
  }))
}

// 建立模擬的 useRouter 函式
const mockRouter = {
  back: vi.fn(), // 模擬 router.back()，以便我們可以檢查它是否被呼叫
}
const mockUseRouter = vi.fn(() => mockRouter)

// 使用 vitest.mock 替換模組
vi.mock('vue-router', async (importOriginal) => {
  // 由於 Nuxt 會暴露這些函式，我們需要模擬它們的來源
  const actual = await importOriginal()
  return {
    ...actual as any, // 保持其他未模擬的功能
    useRouter: mockUseRouter,
    useRoute: vi.fn(), // 將在每個測試案例中單獨設置
  }
})

describe('BackButton.vue', () => {

  // 在每次測試前重置 mock
  beforeEach(() => {
    vi.clearAllMocks()
  })
  
  // ----------------------------------------------------
  // 測試情境 1: 當前路徑不是首頁時 (e.g., /menu)
  // ----------------------------------------------------
  it('should render and be visible when not on the homepage', () => {
    // 設置 useRoute 返回 /menu
    vi.mocked(useRoute).mockReturnValue(mockRoute('/menu')())

    const wrapper = mount(BackButton)
    
    // 檢查按鈕是否存在於 DOM 中
    expect(wrapper.find('#backBtn').exists()).toBe(true)
    
    // 檢查按鈕的文本內容
    expect(wrapper.text()).toContain('< Back')
  })

  // ----------------------------------------------------
  // 測試情境 2: 當前路徑是首頁時 (/)
  // ----------------------------------------------------
  it('should not render when on the homepage (path is /)', () => {
    // 設置 useRoute 返回 /
    vi.mocked(useRoute).mockReturnValue(mockRoute('/')())

    const wrapper = mount(BackButton)
    
    // 檢查按鈕不存在於 DOM 中
    expect(wrapper.find('#backBtn').exists()).toBe(false)
    
    // 檢查整個元件的 HTML 是否為空
    expect(wrapper.html()).toBe('')
  })

  // ----------------------------------------------------
  // 測試情境 3: 點擊行為
  // ----------------------------------------------------
  it('should call router.back() when clicked', async () => {
    // 設置 useRoute 返回一個非首頁路徑，確保按鈕渲染
    vi.mocked(useRoute).mockReturnValue(mockRoute('/about')())
    
    const wrapper = mount(BackButton)
    
    // 檢查 router.back() 在點擊前沒有被呼叫
    expect(mockRouter.back).not.toHaveBeenCalled()
    
    // 模擬點擊按鈕
    await wrapper.find('#backBtn').trigger('click')
    
    // 檢查 router.back() 是否被呼叫
    expect(mockRouter.back).toHaveBeenCalledOnce()
  })
})