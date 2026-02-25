<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-wrapper">
    <BackButton />
    <slot />
    <footer>
      <p>© 2025 Build Your Taiwan Journey | Created with ❤️ for travelers</p>
    </footer>
  </div>
</template>

<style>
.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>