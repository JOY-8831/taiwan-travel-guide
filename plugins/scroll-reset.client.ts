export default defineNuxtPlugin(() => {
    const router = useRouter();
    router.afterEach((to, from) => {
        if (to.path !== from.path) {
            window.scrollTo({ top: 0, behavior: 'instant' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
    });
});
