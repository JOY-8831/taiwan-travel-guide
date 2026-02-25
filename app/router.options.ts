import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0, behavior: 'auto' } // Use 'auto' for instant jump on navigation
        }
    }
}
