<template>
  <section class="frame-border panel">
    <header class="panel-header">
      <h1 v-if="focusable" tabindex="-1">{{ title }}</h1>
      <h1 v-else>{{ title }}</h1>
    </header>
    <div class="panel-body">
      <p>{{ description }}</p>
      
      <template v-if="note">
        <p class="lightnote">{{ note }}</p>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  // 🎯 修正：加上 ? 變成可選，TypeScript 就不會報錯了
  note?: string 
  focusable?: boolean
}>()
</script>